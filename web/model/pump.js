// M-PUMP — view-driven, span-shaped fetching (the structure record §3.2
// "M-PUMP"; W §8 carried and grown: the frames are the wire's, the index
// from `places` and the feed, `loadWhole` kept). Layer 1, port-bound.
// ENGINE-BOUND (the port). State: the in-flight set (model-side plumbing).
// NO WRITE PATH: `writes.js` is the editor's lane's (S-33 (b)); nothing here
// hands a write frame to `op` (S-35 (a); class 5 proves it).
// The needs, from the viewport and the LOD (FP-11: the plane's pure camera
// arithmetic beside the model): at mid scale and nearer, for the documents
// in view — the extent (`retrieve_doc_v_span_set`), the metadata
// (`doc_metadata`), the links touching them (`find_links_v`, then each new
// link's type ONCE by `read_link` — E17 (a)), and, where legible, the span
// window of text (`retrieve_v`) with its V→I image (`image`) for the
// transcluded runs; the chain's members probed where a document is read.
// The reads go through `op(session, frame)` — the claimant's class — or the
// guest form where no session stands; a followed far board's reads would
// take the guest form over its origin (no such board is seeded).
// The feed's rows → M-REC's index and invalidation; `index`, `mode`,
// `daemon` and `session-died` → M-REC's state.
// Rules: FP-1, FP-2, FP-6, FP-9 (fetches, never draws), FP-11.

import * as PORT from '../bridge/port.js';
import * as REC from './records.js';
import * as F from './frames.js';
import { cam, viewportWorld } from '../plane/camera.js';
import { lodOf, LOD_TXT_LO } from '../plane/lod.js';
import { docBox, intersects } from '../plane/projection.js';
import { metricsFor } from '../plane/layout.js';
import { versionAddress } from './address.js';

/** @typedef {import('./records.js').Doc} Doc */
/** @typedef {import('../bridge/shapes').Refusal} Refusal */

const MAX_INFLIGHT = 6;
/** the daemon's class-scan pool is two permits (wire.md §Link discovery reads); `find_links_v` meets it at this pin (a finding, reported): at most two in flight */
const MAX_SCANS = 2;
/** positions per fetched block — the span window rounds to it */
const SPAN_BLOCK = 2048;
/** the most positions a whole read fetches at once (the staging draft holds six million; the rest comes by the viewport's windows) */
export const WHOLE_CAP = 262144;
/** the em (px) at which a document's text is fetched — below S1's mount em, so the text is there when the layer mounts */
const FETCH_EM = 5;
/** at most this many members probed (`D.2`, `D.3`, …) */
const MEMBER_PROBE_CAP = 8;
/** a retry-class refusal (`scan_busy`) is reissued after this pause — "reissued at once", paced */
const RETRY_MS = 120;

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
let dirty = () => {};
let started = false;

/**
 * Start the pump: subscribe the model to the port's events.
 * @param {{onDirty: () => void}} opts
 */
export function start(opts) {
  dirty = opts.onDirty;
  started = true;
  PORT.on('feed', (d) => { const ev = /** @type {import('../bridge/shapes').FeedEvent} */ (d); if (ev && ev.update) { REC.applyFeedUpdate(ev.update); for (const named of ev.update.docs || []) asked.forEach((k) => { if (k.includes(named)) asked.delete(k); }); dirty(); } });
  PORT.on('index', (d) => { const ev = /** @type {import('../bridge/shapes').IndexEvent} */ (d); if (ev && ev.state) REC.setIndexState(ev.state); dirty(); });
  PORT.on('mode', (d) => { const ev = /** @type {import('../bridge/shapes').ModeEvent} */ (d); if (ev) REC.setMode(ev); dirty(); });
  PORT.on('daemon', (d) => { const ev = /** @type {import('../bridge/shapes').DaemonEvent} */ (d); if (ev) REC.setDaemon(ev.state); dirty(); });
  PORT.on('session-died', (d) => { const ev = /** @type {import('../bridge/shapes').SessionDiedEvent} */ (d); const s = REC.session(); if (ev && (!s || s.session === ev.session)) REC.sessionDied(ev.reason); dirty(); });
}

/** the refusals the reads met */
export const refusalsMet = () => refusals.slice();
export function onRefusal(/** @type {(r: {frame: string, refusal: Refusal, addr: string}) => void} */ fn) { refusalWatchers.push(fn); }

/**
 * One read through the port: the session form where a session stands, the
 * guest form where none does.
 * @param {object} frame
 * @returns {Promise<{answer: unknown} | {refused: Refusal}>}
 */
export async function read(frame) {
  const s = REC.session(), b = REC.board();
  const args = s ? { session: s.session, frame } : { guest: /** @type {const} */ (true), board: b ? b.board : undefined, frame };
  const out = await PORT.op(args);
  if ('refused' in out) return { refused: out.refused };
  return { answer: out.result };
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
 * The documents in view: every indexed, held or focused document whose box
 * meets the viewport (the system account's rows left out).
 * @param {number} [pad]
 * @returns {Doc[]}
 */
export function visibleDocs(pad = 80) {
  const v = viewportWorld(pad);
  /** @type {Doc[]} */
  const out = [];
  const seen = new Set();
  for (const p of REC.places()) {
    if (p.system) continue;
    if (intersects(docBox(p.doc), v)) { out.push(REC.doc(p.doc)); seen.add(p.doc); }
  }
  for (const d of REC.docs()) {
    if (seen.has(d.addr) || d.system) continue;
    if ((d.from >= 0 || d.meta || d.extent != null) && intersects(docBox(d.addr), v)) out.push(d);
  }
  return out;
}

/**
 * The span window a document's visible band needs: the positions whose
 * estimated place lies in the viewport, rounded to SPAN_BLOCK.
 * @param {Doc} d
 * @returns {[number, number] | null} [first position, one past the last]
 */
export function spanWindow(d) {
  const extent = d.extent || 0; if (!extent) return null;
  const box = docBox(d.addr);
  const m = metricsFor(extent, box);
  const y0 = box.y + m.y0, textH = m.textH;
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
 * The reads the view needs now, issued within the budget. Returns the count
 * of needs still missing — the gate's settle signal with `inflight()`.
 * @returns {number}
 */
export function pump() {
  if (!started) return 0;
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
    if (box.residue) continue; // the residue's members are read when one is the focus (loadWhole)
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
    // the class-scan pool: reissue a `scan_busy` (a retry-class refusal) a few times
    for (let attempt = 0; attempt < 6; attempt++) {
      const out = await read(F.findLinksV(addr, 1, extent));
      if (!('refused' in out)) { REC.takeLinks(addr, F.decodeAddrs(out.answer)); break; }
      refusals.push({ frame: 'find_links_v', refusal: out.refused, addr });
      if (out.refused.name !== 'scan_busy') break;
      await new Promise((r) => setTimeout(r, RETRY_MS));
    }
  }
  for (const la of REC.unreadLinks(addr)) {
    const out = await read(F.readLink(la));
    if (!('refused' in out)) { const v = F.decodeLinkValue(la, out.answer); if (v) REC.takeLink(v); }
  }
  dirty();
  return d;
}

/**
 * Where a link's slot projects NOW into a document (A-53): the V-span, or
 * null where the end has left the text; `invalid` where no such slot.
 * @param {string} linkAddr
 * @param {1 | 2} slot
 * @param {string} doc
 * @returns {Promise<{ordinal: number, positions: number} | null | 'refused'>}
 */
export async function projectEnd(linkAddr, slot, doc) {
  const out = await read(F.project(linkAddr, slot, doc));
  if ('refused' in out) { refusals.push({ frame: 'project', refusal: out.refused, addr: doc }); return 'refused'; }
  const set = F.decodeSpanSet(out.answer).filter((s) => s.subspace === 1);
  return set.length ? { ordinal: set[0].ordinal, positions: set[0].positions } : null;
}

/** the number of reads in flight (the gate's settle signal) */
export const inflightCount = () => inflight.size;
/** settled: nothing missing and nothing in flight */
export const settled = () => inflight.size === 0 && pump() === 0;
/** drop the asked set for a document (tests, invalidation) */
export function forget(/** @type {string} */ addr) { for (const k of [...asked]) if (k.includes(addr)) asked.delete(k); for (const k of [...retryAt.keys()]) if (k.includes(addr)) retryAt.delete(k); }
/** the needs pending a retry (the gate reads it) */
export const retriesPending = () => retryAt.size;
