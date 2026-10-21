// M-PUMP — view-driven, span-shaped fetching (the structure record §3.2
// "M-PUMP"; W §8 carried and grown: the frames are the wire's, the index
// from `places` and the feed, `loadWhole` kept). Layer 1, port-bound.
// ENGINE-BOUND (the port). State: the in-flight set (model-side plumbing).
// NO WRITE PATH: `writes.js` is the editor's lane's (S-33 (b)); nothing here
// hands a write frame to `op` (S-35 (a); class 5 proves it).
// The needs, from the viewport and the LOD (FP-11: the plane's pure camera
// arithmetic beside the model): at mid scale and nearer, for the documents
// in view that stand whole — a continuation drawn as one mark asks nothing
// for its members — the extent (`retrieve_doc_v_span_set`), the metadata
// (`doc_metadata`), the links touching them (`find_links_v`, then each new
// link's type ONCE by `read_link` — E17 (a)), and, where legible, the span
// window of text (`retrieve_v`) with its V→I image (`image`) for the
// transcluded runs; the chain's members probed where a document is read.
// Asked by an act rather than the view: the client index (`readIndex`:
// `places`, at boot and again at the page's own session's death — the view
// asking nothing while it is out), a whole document (`loadWhole`), where a
// link's end projects now (`projectEnd`), and a link's supersession
// lineage (`lineage`: `in_claims` and `out_claims`, A-56, A-57). A class
// scan read whole — `loadWhole`'s `find_links_v`, the lineage's two — is
// reissued on `scan_busy` (`readScan`): the daemon bounds each by the same
// two permits the view's scans take.
// The reads go through `op(session, frame)` — the claimant's class — or the
// guest form where no session stands; a followed far board's reads would
// take the guest form over its origin (no such board is seeded). EVERY READ
// AT THE PAGE'S CLASS (`atClass`): a read the page's class — its principal,
// or guest — changed under while it was out, its session's death taken
// meanwhile, is asked once more in the form the page takes now, so no answer
// to the dead session's class reaches the model after the death.
// The shell's bus carries every board's events and every session's to every
// page (client.md §4b.2); the page takes its own. A board event — `feed`,
// `index`, `mode`, `daemon` — is taken where it names the page's board, and
// none before the board is known: the boot's `health`, `probe` and `places`
// answer all it would set. The feed's rows → M-REC's index and
// invalidation; a `drafts` row only while the page holds a session — a
// guest's index lists no draft (search.md §4 (iii)), nor does the index of
// a page whose session was refused or ended. `index` → M-REC's state where
// it is the face the page reads ("a face receives the state of the pair it
// searches"): the guest face's, which names no session, for a page with no
// session or with a session of no account, for which no drafts index
// stands; a session's for every other page, never the guest face's. A
// signed-in page takes a drafts row or a face's state named under another
// session too: the shell reads a principal's drafts once, under whichever
// of its sessions it reaches first, and names the principal's face by its
// last-opened session, so a person's second tab would otherwise take
// neither (reported to skep: until every session is named, the page cannot
// tell its principal's other sessions from another principal's). `mode`
// and `daemon` → M-REC's state; `session-died` → M-REC's death where it
// names the page's own session: a page that holds no session (a guest) or
// holds another was never signed in under the one that ended. The death
// drops every read the model held at the session's class (M-REC's
// `sessionDied`); the needs answered under it are asked again, and the index
// is read again in the guest form, as the shell narrows its own at the death
// (client.md §4e.3: "at `session-died` in every arm but the shell's OWN
// RESTART"), so the page's index, its counts and what it draws are a
// guest's (foundations §2.1: "masked at the reader's class"). The shell's
// own restart, where the shell re-opened the session under a key it holds,
// is no death: the page goes on under the re-opened reference the reason
// names, with no face, holding what it read (client.md §4b.2; ps3-13 (b),
// cs6-6 reading (i)). A read can meet the end before the event does —
// `session_died`, carrying the event's reason, or `session_ended`, the
// shell's answer while it derives the end — and takes or awaits it, then is
// asked once more in the form the end left the page: under the re-opened
// session, or as a guest after a death.
// Rules: FP-1, FP-2, FP-6, FP-9 (fetches, never draws), FP-11.

import * as PORT from '../bridge/port.js';
import * as REC from './records.js';
import * as F from './frames.js';
import { cam, viewportWorld } from '../plane/camera.js';
import { lodOf, residueDepth, LOD_TXT_LO } from '../plane/lod.js';
import { docBox, intersects, withinContinuation } from '../plane/projection.js';
import { metricsFor } from '../plane/layout.js';
import { versionAddress } from './address.js';

/** @typedef {import('./records.js').Doc} Doc */
/** @typedef {import('./frames.js').Claim} Claim */
/** @typedef {import('../bridge/shapes').Refusal} Refusal */
/** @typedef {import('../bridge/shapes').PlacesAnswer} PlacesAnswer */
/** @typedef {import('../bridge/shapes').FeedEvent} FeedEvent */
/** @typedef {import('../bridge/shapes').FeedUpdate} FeedUpdate */
/** @typedef {import('../bridge/shapes').IndexEvent} IndexEvent */
/** @typedef {import('../bridge/shapes').ModeEvent} ModeEvent */
/** @typedef {import('../bridge/shapes').DaemonEvent} DaemonEvent */
/** @typedef {import('../bridge/shapes').SessionDiedEvent} SessionDiedEvent */
/** @typedef {import('../bridge/shapes').DeathReason} DeathReason */
/** @typedef {{feed: FeedEvent, index: IndexEvent, mode: ModeEvent, daemon: DaemonEvent}} BoardEvents — the events that name their board, by name */

/**
 * @typedef {Object} Lineage — a link's supersession lineage as read (B1-S5;
 * A-56, A-57, A-82): each side the claims the board answered, in its order,
 * or null where no `claims` answer came back — the read refused — so nothing
 * was learned of that side, which is never B1-S5's "none"
 * @property {Claim[] | null} supersededBy the claims whose `old` is the link: each one's `new` supersedes it
 * @property {Claim[] | null} supersedes the claims whose `new` is the link: each one's `old` it supersedes
 */

const MAX_INFLIGHT = 6;
/** the daemon's class-scan pool is two permits (wire.md §Link discovery reads); `find_links_v`, `in_claims` and `out_claims` meet it at this pin (a finding, reported): at most two of the view's in flight */
const MAX_SCANS = 2;
/** positions per fetched block — the span window rounds to it */
const SPAN_BLOCK = 2048;
/** the most positions a whole read fetches at once (the staging draft holds six million; the rest comes by the viewport's windows) */
export const WHOLE_CAP = 262144;
/** the em (px), by P-LAY's estimate, at which a document's text is fetched — below S1's mount em, and the estimate's face never smaller than the one T-LAYER fits the article to and mounts at, so the text is there when the layer mounts */
const FETCH_EM = 5;
/** at most this many members probed (`D.2`, `D.3`, …) */
const MEMBER_PROBE_CAP = 8;
/** a retry-class refusal (`scan_busy`) is reissued after this pause — "reissued at once", paced */
const RETRY_MS = 120;
/** a class scan read whole is asked at most this many times while the board answers `scan_busy` */
const SCAN_ATTEMPTS = 6;
/** a read refused `session_ended` awaits its session's end at most this long — a bound on the shell's derive and re-open, which take board reads (unmeasured) */
const END_WAIT_MS = 5000;

/** @type {Set<string>} */
const inflight = new Set();
/** @type {Set<string>} keys already asked and answered (a refusal included), not to be asked again until invalidated */
const asked = new Set();
/** @type {Map<string, number>} keys refused retry-class, with the time they may be asked again */
const retryAt = new Map();
let scansInFlight = 0;
/** @type {Array<{frame: string, refusal: Refusal, addr: string}>} the refusals met, for the faces and the gate */
const refusals = [];
/** @type {Array<(r: {frame: string, refusal: Refusal, addr: string}) => void>} */
const refusalWatchers = [];
/** @type {Set<() => void>} the reads awaiting the page's session's end, each woken as it is taken */
const awaitingEnd = new Set();
/** the page's session a read found ended with no end taken within END_WAIT_MS — its `session-died` never reached the page — so no read under it waits again */
let unended = /** @type {string | null} */ (null);
/** the client index's reads out (`readIndex`): while one is, the view asks nothing and `pump` counts it missing */
let indexing = 0;
let dirty = () => {};
let started = false;

/**
 * Start the pump: subscribe the model to the port's events, every board
 * event through `onBoard`.
 * @param {{onDirty: () => void}} opts
 */
export function start(opts) {
  dirty = opts.onDirty;
  started = true;
  onBoard('feed', (ev) => { if (ev.update && takesRow(ev.update)) { REC.applyFeedUpdate(ev.update); for (const named of ev.update.docs || []) asked.forEach((k) => { if (k.includes(named)) asked.delete(k); }); dirty(); } });
  onBoard('index', (ev) => { if (ev.state && ofFace(ev)) { REC.setIndexState(ev.state); dirty(); } });
  onBoard('mode', (ev) => { REC.setMode(ev); dirty(); });
  onBoard('daemon', (ev) => { REC.setDaemon(ev.state); dirty(); });
  PORT.on('session-died', (d) => { const ev = /** @type {SessionDiedEvent | null} */ (d); if (ev) takeEnd(ev.session, ev.reason); dirty(); });
}

/**
 * Subscribe to a board event, handed on where it names the page's board
 * alone; none before the board is known.
 * @template {keyof BoardEvents} K
 * @param {K} name
 * @param {(ev: BoardEvents[K]) => void} take
 */
function onBoard(name, take) {
  PORT.on(name, (d) => { const ev = /** @type {BoardEvents[K] | null} */ (d); const b = REC.board(); if (ev && b && ev.board === b.board) take(ev); });
}

/** does the page take a feed row: a published row always, a `drafts` row while it holds a session — under any session's name */
const takesRow = (/** @type {FeedUpdate} */ u) => u.class !== 'drafts' || REC.session() !== null;

/**
 * Is an `index` event the state of the face the page reads? The guest
 * face's names no session: a page reads it with no session, or with a
 * session of no account; every other page reads a session's face, under
 * any session's name.
 * @param {IndexEvent} ev
 * @returns {boolean}
 */
function ofFace(ev) {
  const s = REC.session();
  return s && s.account != null ? ev.session != null : ev.session == null;
}

/**
 * A session's end, met by `session-died` or by a read's `session_died`,
 * which carries the event's reason; taken where it names the page's own
 * session. The shell's own restart, where the shell re-opened the session
 * under a key it holds, is no death: the page goes on under the reference
 * the reason names, the principal and the account the same, with no face
 * (client.md §4b.2: "the page re-acquires a reference with no face";
 * ps3-13 (b), cs6-6 reading (i)). Every other end, a restart that re-opened
 * none among them, is M-REC's death: what the model read at the session's
 * class dropped, every need answered under it asked again, and the index read
 * again in the guest form (`readIndex`). The reads awaiting the end are
 * woken.
 * @param {string} ended the session the end names
 * @param {DeathReason} reason
 */
function takeEnd(ended, reason) {
  const s = REC.session();
  if (!s || s.session !== ended) return;
  const reopened = reason.arm === 'restart' && reason.reopened === true ? reason.session : null;
  if (typeof reopened === 'string') REC.setSession({ ...s, session: reopened });
  else { REC.sessionDied(reason); asked.clear(); retryAt.clear(); readIndex(); }
  for (const wake of [...awaitingEnd]) wake();
}

/**
 * The page's session's end, awaited: woken as `takeEnd` takes it, or after
 * END_WAIT_MS, the session marked `unended` where it still stands.
 * @param {string} sent
 * @returns {Promise<void>}
 */
function endTaken(sent) {
  return new Promise((resolve) => {
    const wake = () => { clearTimeout(timer); awaitingEnd.delete(wake); resolve(); };
    const timer = setTimeout(() => { if (REC.session()?.session === sent) unended = sent; wake(); }, END_WAIT_MS);
    awaitingEnd.add(wake);
  });
}

/** the refusals the reads met */
export const refusalsMet = () => refusals.slice();
export function onRefusal(/** @type {(r: {frame: string, refusal: Refusal, addr: string}) => void} */ fn) { refusalWatchers.push(fn); }

/**
 * One read through the port at the page's class (`atClass`): the session
 * form where a session stands, the guest form where none does.
 * @param {object} frame
 * @returns {Promise<{answer: unknown} | {refused: Refusal}>}
 */
export function read(frame) { return atClass((s) => ask(s, frame)); }

/**
 * One call at the page's class: made under the page's session, or in the
 * guest form where none stands (`call` composes the form from the session it
 * is handed). It is made once more, in the form the page takes then, where
 * the page's class — its principal, or guest — changed while it was out, so
 * no answer to a class the page has left is handed up: a death taken
 * meanwhile asks it again as a guest. It is made once more too where it met
 * the end of the session it went out under and the end left the page
 * another, the one the shell re-opened in its place — the class the same;
 * where the end left the page that same session (a `session_ended` no end
 * followed) the refusal is handed up. Once more at most.
 * @template {object} T
 * @param {(s: {session: string} | null) => Promise<T | {refused: Refusal}>} call
 * @returns {Promise<T | {refused: Refusal}>}
 */
async function atClass(call) {
  const s = REC.session();
  const out = await call(s);
  const r = 'refused' in out ? /** @type {{refused: Refusal}} */ (out).refused : null;
  const ended = !!s && !!r && (await metEnd(s.session, r));
  const now = REC.session();
  return classOf(now) !== classOf(s) || (ended && !!now && now.session !== s?.session) ? call(now) : out;
}

/** the class a page reads at: its session's principal; a guest's none */
const classOf = (/** @type {{principal: number} | null} */ s) => (s ? s.principal : null);

/**
 * The client index read at the page's class (skep #463): `places` under the
 * page's session, or in the guest form where none stands (`atClass`), the
 * answer M-REC's index whole (`takeIndex`); a refusal leaves the index as it
 * stands — empty at boot and at a death. While the read is out the view asks
 * nothing and `pump` counts it missing, so no document is asked for against
 * an index the answer is about to replace, and the gate's settle waits for
 * it.
 * @returns {Promise<{result: PlacesAnswer} | {refused: Refusal}>}
 */
export async function readIndex() {
  const b = REC.board(), board = b ? b.board : undefined;
  indexing++;
  try {
    const out = await atClass((s) => PORT.places(s ? { session: s.session, board } : { guest: true, board }));
    if ('result' in out) REC.takeIndex(out.result);
    return out;
  } finally { indexing--; dirty(); }
}

/**
 * One `op` under a session, or in the guest form where none is given.
 * @param {{session: string} | null} s
 * @param {object} frame
 * @returns {Promise<{answer: unknown} | {refused: Refusal}>}
 */
async function ask(s, frame) {
  const b = REC.board();
  const out = await PORT.op(s ? { session: s.session, frame } : { guest: /** @type {const} */ (true), board: b ? b.board : undefined, frame });
  return 'refused' in out ? { refused: out.refused } : { answer: out.result };
}

/**
 * Is a read's refusal the end of the session it went out under? The
 * shell's `session_died` carries the end's reason, taken at once;
 * `session_ended` carries none — the shell answers it from its table while
 * it derives the end, the event following — so the end is awaited, unless a
 * read under that session already waited for it in vain.
 * @param {string} sent the session the read went out under
 * @param {Refusal} r
 * @returns {Promise<boolean>}
 */
async function metEnd(sent, r) {
  if (r.kind !== 'shell') return false;
  if (r.name === 'session_died') {
    const reason = /** @type {{arm?: unknown} | null | undefined} */ (r.reason);
    if (reason && typeof reason.arm === 'string') takeEnd(sent, /** @type {DeathReason} */ (reason));
    return true;
  }
  if (r.name !== 'session_ended') return false;
  if (REC.session()?.session === sent && sent !== unended) await endTaken(sent);
  return true;
}

/**
 * A class scan read whole, for an act: a `scan_busy` — the board's two
 * permits taken — is reissued after a pause, up to SCAN_ATTEMPTS asks;
 * every refusal met is recorded.
 * @param {{op: string}} frame
 * @param {string} addr the document or link the read is about
 * @returns {Promise<{answer: unknown} | {refused: Refusal}>}
 */
async function readScan(frame, addr) {
  let out = await read(frame);
  for (let asks = 1; 'refused' in out; asks++) {
    refusals.push({ frame: frame.op, refusal: out.refused, addr });
    if (out.refused.name !== 'scan_busy' || asks >= SCAN_ATTEMPTS) break;
    await new Promise((r) => setTimeout(r, RETRY_MS));
    out = await read(frame);
  }
  return out;
}

/**
 * A need: a read keyed for the in-flight set, issued within the budget;
 * answered once; a retry-class refusal (`scan_busy`) reissued after a pause;
 * any other refusal recorded and not asked again until invalidated. Returns
 * whether the need is still MISSING — pending or not yet issued; a refused
 * need is not missing (nothing more will arrive for it).
 * @param {string} key
 * @param {object} frame
 * @param {(answer: unknown) => void} take
 * @param {string} addr
 * @param {(r: Refusal) => void} [onRefused]
 * @returns {boolean} missing
 */
function need(key, frame, take, addr, onRefused) {
  if (asked.has(key)) return false;
  if (inflight.has(key)) return true;
  const at = retryAt.get(key);
  if (at != null && performance.now() < at) return true;
  if (inflight.size >= MAX_INFLIGHT) return true;
  const isScan = /** @type {{op?: string}} */ (frame).op === 'find_links_v';
  if (isScan && scansInFlight >= MAX_SCANS) return true;
  inflight.add(key); if (isScan) scansInFlight++;
  read(frame).then((out) => {
    inflight.delete(key); if (isScan) scansInFlight--;
    if ('refused' in out) {
      const r = { frame: /** @type {{op?: string}} */ (frame).op || 'op', refusal: out.refused, addr };
      refusals.push(r); for (const w of refusalWatchers) w(r);
      if (out.refused.name === 'scan_busy' || out.refused.name === 'history_busy') { retryAt.set(key, performance.now() + RETRY_MS); }
      else { asked.add(key); if (onRefused) onRefused(out.refused); }
    } else { asked.add(key); retryAt.delete(key); take(out.answer); }
    dirty();
  });
  return true;
}

/** the name a refusal faces on */
const nameOf = (/** @type {Refusal} */ r) => r.name;

/**
 * The documents in view: every indexed or held document whose box meets the
 * viewport (the system account's rows left out) and stands shallower than
 * the continuation the scale draws as one mark (P-LOD's `residueDepth`). The
 * mark draws its members' count and its newest's label from the index, which
 * no read brings, and the band fades its depth-k boxes in below every size a
 * read serves; a member is read whole when it is the focus (`loadWhole`).
 * @param {number} [pad]
 * @returns {Doc[]}
 */
export function visibleDocs(pad = 80) {
  const v = viewportWorld(pad);
  const { k } = residueDepth(cam.scale);
  /** @type {Doc[]} */
  const out = [];
  const seen = new Set();
  for (const p of REC.places()) {
    if (p.system || withinContinuation(p.doc, k)) continue;
    if (intersects(docBox(p.doc), v)) { out.push(REC.doc(p.doc)); seen.add(p.doc); }
  }
  for (const d of REC.docs()) {
    if (seen.has(d.addr) || d.system || withinContinuation(d.addr, k)) continue;
    if ((d.from >= 0 || d.meta || d.extent != null) && intersects(docBox(d.addr), v)) out.push(d);
  }
  return out;
}

/**
 * The span window a document's visible band needs: the positions whose
 * estimated place lies in the viewport — the positions spread evenly down
 * the article, from its first line's top to its clip (P-LAY's) — rounded to
 * SPAN_BLOCK.
 * @param {Doc} d
 * @returns {[number, number] | null} [first position, one past the last]
 */
export function spanWindow(d) {
  const extent = d.extent || 0; if (!extent) return null;
  const box = docBox(d.addr);
  const m = metricsFor(extent, box);
  const y0 = box.y + m.y0, textH = m.y1 - m.y0;
  const v = viewportWorld(0);
  const f0 = Math.max(0, (v.y0 - y0) / textH), f1 = Math.min(1, (v.y1 - y0) / textH);
  if (f1 <= 0 || f0 >= 1) return null;
  const margin = 0.12;
  let from = Math.floor((f0 - margin) * extent), to = Math.ceil((f1 + margin) * extent);
  from = Math.max(1, Math.floor(from / SPAN_BLOCK) * SPAN_BLOCK + 1);
  to = Math.min(extent + 1, Math.ceil(to / SPAN_BLOCK) * SPAN_BLOCK + 1);
  if (to <= from) to = Math.min(extent + 1, from + SPAN_BLOCK);
  return [from, to];
}

/**
 * The reads the view needs now, issued within the budget — none while the
 * index is read (`readIndex`), which counts as a need missing. Returns the
 * count of needs still missing — the gate's settle signal with `inflight()`.
 * @returns {number}
 */
export function pump() {
  if (!started) return 0;
  if (indexing) return 1;
  const lod = lodOf(cam.scale);
  let missing = 0;
  if (lod.name === 'far') return 0;
  const vis = visibleDocs();
  // nearest the centre first
  const cx = cam.x, cy = cam.y;
  vis.sort((a, b) => { const ba = docBox(a.addr), bb = docBox(b.addr); return Math.hypot(ba.x + ba.w / 2 - cx, ba.y + ba.h / 2 - cy) - Math.hypot(bb.x + bb.w / 2 - cx, bb.y + bb.h / 2 - cy); });
  const budgetDocs = vis.slice(0, 60);
  for (const d of budgetDocs) {
    if (d.refused) continue;
    const box = docBox(d.addr);
    const docPx = box.w * cam.scale;
    if (d.extent == null) {
      if (need('s:' + d.addr, F.retrieveDocVSpanSet(d.addr), (a) => REC.takeSpanSet(d.addr, F.decodeSpanSet(a)), d.addr, (r) => refuseDoc(d, r))) missing++;
      continue;
    }
    if (!d.meta && docPx > 40) {
      if (need('m:' + d.addr, F.docMetadata(d.addr), (a) => { const m = F.decodeDocMetadata(a); if (m) REC.takeMetadata(d.addr, m); }, d.addr, (r) => refuseDoc(d, r))) missing++;
    }
    if (!d.linksRead && docPx > 18 && d.extent > 0) {
      if (need('l:' + d.addr, F.findLinksV(d.addr, 1, d.extent), (a) => REC.takeLinks(d.addr, F.decodeAddrs(a)), d.addr)) missing++;
    }
    for (const la of REC.unreadLinks(d.addr).slice(0, 12)) {
      if (need('k:' + la, F.readLink(la), (a) => { const v = F.decodeLinkValue(la, a); if (v) REC.takeLink(v); }, d.addr)) missing++;
    }
    const em = metricsFor(d.extent, box).fs * cam.scale;
    if (em >= FETCH_EM && d.extent > 0) {
      const w = spanWindow(d);
      if (w && !(d.from >= 0 && d.from <= w[0] && d.to >= w[1])) {
        const from = d.from < 0 ? w[0] : Math.min(d.from, w[0]);
        const to = d.to < 0 ? w[1] : Math.max(d.to, w[1]);
        if (need('r:' + d.addr + ':' + from + ':' + to, F.retrieveV(d.addr, from, to - from), (a) => REC.takeDelivery(d.addr, F.decodeDelivery(a, from)), d.addr, (r) => refuseDoc(d, r))) missing++;
      }
      if (d.from >= 0 && (!d.originsFor || d.originsFor[0] > d.from || d.originsFor[1] < d.to)) {
        if (need('i:' + d.addr + ':' + d.from + ':' + d.to, F.image(d.addr, d.from, d.to - d.from), (a) => REC.takeOrigins(d.addr, d.from, F.decodeRuns(a)), d.addr)) missing++;
      }
      if (em >= LOD_TXT_LO && d.members == null && d.meta && d.meta.published) { if (probeMembers(d)) missing++; }
    }
  }
  return missing;
}

/** a document's read refused: `doc_not_registered` or `withheld` — the model keeps the fact */
function refuseDoc(/** @type {Doc} */ d, /** @type {Refusal} */ r) {
  const n = nameOf(r);
  if (n === 'doc_not_registered') REC.takeRefused(d.addr, 'unregistered');
  else if (n === 'withheld') REC.takeRefused(d.addr, 'withheld');
}

/**
 * The chain's members: `D.1` is the birth; `D.k` answers until the first
 * `doc_not_registered` (capped). One probe at a time.
 * @param {Doc} d
 */
function probeMembers(d) {
  const key = 'v:' + d.addr;
  if (asked.has(key)) return false;
  if (inflight.has(key)) return true;
  inflight.add(key);
  (async () => {
    let n = d.meta && d.meta.birth ? 1 : 0;
    for (let k = 2; k <= MEMBER_PROBE_CAP && n >= 1; k++) {
      const out = await read(F.docMetadata(versionAddress(d.addr, k)));
      if ('refused' in out) break;
      n = k;
    }
    REC.takeMembers(d.addr, n);
    inflight.delete(key); asked.add(key); dirty();
  })();
  return true;
}

/**
 * Read a whole document now — the scene, the walk and a landing ask for all
 * of it: the extent, every position, the image, the links and their types.
 * @param {string} addr
 * @returns {Promise<Doc | null>}
 */
export async function loadWhole(addr) {
  const d = REC.doc(addr);
  if (d.extent == null) {
    const out = await read(F.retrieveDocVSpanSet(addr));
    if ('refused' in out) { refusals.push({ frame: 'retrieve_doc_v_span_set', refusal: out.refused, addr }); refuseDoc(d, out.refused); dirty(); return null; }
    REC.takeSpanSet(addr, F.decodeSpanSet(out.answer));
  }
  if (!d.meta) {
    const out = await read(F.docMetadata(addr));
    if (!('refused' in out)) { const m = F.decodeDocMetadata(out.answer); if (m) REC.takeMetadata(addr, m); }
  }
  const extent = d.extent || 0;
  const whole = Math.min(extent, WHOLE_CAP);
  if (whole > 0 && !(d.from === 1 && d.to >= whole + 1)) {
    const out = await read(F.retrieveV(addr, 1, whole));
    if ('refused' in out) { refusals.push({ frame: 'retrieve_v', refusal: out.refused, addr }); refuseDoc(d, out.refused); dirty(); return d; }
    REC.takeDelivery(addr, F.decodeDelivery(out.answer, 1));
    const im = await read(F.image(addr, 1, whole));
    if (!('refused' in im)) REC.takeOrigins(addr, 1, F.decodeRuns(im.answer));
  }
  if (!d.linksRead && extent > 0) {
    const out = await readScan(F.findLinksV(addr, 1, extent), addr);
    if (!('refused' in out)) REC.takeLinks(addr, F.decodeAddrs(out.answer));
  }
  for (const la of REC.unreadLinks(addr)) {
    const out = await read(F.readLink(la));
    if (!('refused' in out)) { const v = F.decodeLinkValue(la, out.answer); if (v) REC.takeLink(v); }
  }
  dirty();
  return d;
}

/**
 * Where a link's slot projects NOW into a document (A-53: "the spans"): every
 * V-span of the text's content the board answers, in the order it names them
 * — an end the document's text holds in several runs, a passage a later edit
 * cut in two among them, answered as several; null where the end has left
 * the text; `refused` where the board declines the read (`not_a_link` where
 * no such slot).
 * @param {string} linkAddr
 * @param {1 | 2} slot
 * @param {string} doc
 * @returns {Promise<Array<{ordinal: number, positions: number}> | null | 'refused'>}
 */
export async function projectEnd(linkAddr, slot, doc) {
  const out = await read(F.project(linkAddr, slot, doc));
  if ('refused' in out) { refusals.push({ frame: 'project', refusal: out.refused, addr: doc }); return 'refused'; }
  const set = F.decodeSpanSet(out.answer).filter((s) => s.subspace === 1).map((s) => ({ ordinal: s.ordinal, positions: s.positions }));
  return set.length ? set : null;
}

/**
 * A link's supersession lineage (B1-S5; A-56, A-57): `in_claims` — what
 * supersedes it — then `out_claims` — what it supersedes — under the AUDIT
 * view, so a retracted claim arrives marked `active: false` where the
 * active view would leave it out. The two are asked one after the other,
 * holding at most one of the board's two scan permits.
 * @param {string} linkAddr
 * @returns {Promise<Lineage>}
 */
export async function lineage(linkAddr) {
  const side = async (/** @type {{op: string}} */ frame) => {
    const out = await readScan(frame, linkAddr);
    return 'refused' in out ? null : F.decodeClaims(out.answer);
  };
  const supersededBy = await side(F.inClaims(linkAddr, 'audit'));
  const supersedes = await side(F.outClaims(linkAddr, 'audit'));
  return { supersededBy, supersedes };
}

/** the number of reads in flight (the gate's settle signal) */
export const inflightCount = () => inflight.size;
/** settled: nothing missing and nothing in flight */
export const settled = () => inflight.size === 0 && pump() === 0;
/** drop the asked set for a document (tests, invalidation) */
export function forget(/** @type {string} */ addr) { for (const k of [...asked]) if (k.includes(addr)) asked.delete(k); for (const k of [...retryAt.keys()]) if (k.includes(addr)) retryAt.delete(k); }
/** the needs pending a retry (the gate reads it) */
export const retriesPending = () => retryAt.size;
