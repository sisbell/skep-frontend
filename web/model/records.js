// M-REC — THE MODEL (the structure record §3.2 "M-REC"; FP-6: what the
// viewport asked for and nothing more). Layer 1. PURE: runnable under Node
// against a fake port. State: MODEL — THE ONE OWNER (FP-10) of the held
// records: documents (their index row, their extent, their delivered runs
// and the blocks derived from them, their metadata, their V→I image as read
// and the transclusion origins it shows, the raw set of links touching them),
// links as delivered with the type learned once (E17 (a)), where a link's
// slot sits in a document's current text as `project` answered it, the
// board, the session REFERENCE (a name, never a token), health and the
// derived mode, the daemon's state, the key store's label and whether it
// holds a key bound at this board (R56's "key present"); THE CLIENT INDEX
// built from `places` (skep #463 — the documents per account, their labels,
// kinds and standing; the counts per account; the index's state and floor),
// each answer replacing the index whole, and kept by the feed's rows — never
// from `/changes`, never by enumerating documents. THE CLASS: every record
// read here was read at the page's class, and the page's own session's death
// (`sessionDied`) drops every one — the index, each document's delivered state
// and its row, the links and where their slots project, the owners and key
// sets, the drafts rows held — so what stands after
// it is what a guest's page holds before it reads (foundations §2.1: the
// index "masked at the reader's class"; client.md §4e.3); M-PUMP reads it
// all again at guest class. It knows nothing of pixels, zoom, selection or
// lenses: "the links touching an address" is the RAW set as delivered —
// which of them show, and how, is LK's (the seam).
// A LINK'S SLOT NAMES BYTES, NEVER A PLACE: a V-spec slot is recorded as the
// permanent I-spans of the bytes it named (wire.md §Links, `make_link`), so
// where a drawn end's stored span stands in its document's text now is read
// through that document's V→I image as held (`placed`) — a passage an edit
// moved stands where the image puts it, one cut in two stands in two runs,
// one the text no longer holds stands nowhere — and where a link's far end
// stands in its far document's current text is `project`'s answer
// (`takeProjection`, A-53), held until that document's delivered state is
// dropped.
// THE `H` DOCUMENT (the record §1.8, OPEN): the system account's rows are
// HELD here and marked `system`; the plane does not draw them (this lane's
// cut, reported).
// Carries: the wireframe's §5 (`state.docs`, `clientDoc`,
// `invalidateClient`), §8's `takeDelivery`/`mergeLinks`, §3's landmarks (now
// the index's). Rules: FP-1, FP-2, FP-6, FP-7, FP-10, FP-14 (no token held).

import { accountOf, documentOf, cmpAddr, elementOf, memberOf, isUnder } from './address.js';
import { byteOffsets } from '../util.js';

/** @typedef {import('./frames.js').Run} Run */
/** @typedef {import('./frames.js').DocMeta} DocMeta */
/** @typedef {import('./frames.js').LinkValue} LinkValue */
/** @typedef {import('./address.js').EndRef} EndRef */
/** @typedef {import('../bridge/shapes').Place} ShapePlace */
/** @typedef {import('../bridge/shapes').PlacesAnswer} PlacesAnswer */
/** @typedef {import('../bridge/shapes').IndexState} IndexState */
/** @typedef {import('../bridge/shapes').FeedUpdate} FeedUpdate */
/** @typedef {import('../bridge/shapes').Health} Health */
/** @typedef {import('../bridge/shapes').Mode} Mode */
/** @typedef {import('../bridge/shapes').DeathReason} DeathReason */
/** @typedef {import('../bridge/shapes').Standing} Standing */

/** the system account whose head document `H` the daemon writes (wire.md §The other endpoints: `1.1.0.1.0.2`) */
export const SYSTEM_ACCOUNT = '1.1.0.1';

/**
 * @typedef {Object} Place — one row of the client index
 * @property {string} doc
 * @property {'edition' | 'draft'} kind
 * @property {string | null} label the first line of its content, the index's
 * @property {Standing} standing
 * @property {string} account
 * @property {boolean} system a row of the system account — held, not drawn
 */

/**
 * @typedef {Object} Block — a paragraph of delivered text, the span grain the walk and the mirror use (the selection is a byte span, which a click takes as the whole block)
 * @property {number} pos the first V-position (1-based) — the block's stable key
 * @property {number} width positions (bytes), the separator after it included
 * @property {'para' | 'withheld' | 'atom' | 'ref' | 'hex'} kind
 * @property {string} text the paragraph's text (the separator trimmed), the atom's JSON, or ''
 * @property {string | null} origin a withheld run's origin document
 */

/**
 * @typedef {Object} Origin — a run of this document whose bytes have another origin (a transcluded run)
 * @property {number} pos
 * @property {number} width
 * @property {string} doc the origin document
 */

/**
 * @typedef {Object} ImageRun — one run of a document's V→I image, placed at its positions: `width` consecutive permanent addresses from `ordinal` in the I-space `prefix` names (wire.md §Value encodings, `runs`), sitting at the positions [pos, pos + width) of the document's text
 * @property {number} pos the run's first position in the document's text
 * @property {number} width
 * @property {string} prefix the run's first permanent address without its last field — the I-space it lies in: `1.0.1.0.3.0.1` for the document's own content, `1.0.1.0.3.2.0.1` for content minted under its second member's chain, another document's for a transcluded run
 * @property {number} ordinal the last field of its first permanent address
 */

/** @typedef {{pos: number, width: number}} Stretch a stretch of a document's text a stored span stands in: its first position and its positions */

/**
 * @typedef {Object} Doc
 * @property {string} addr
 * @property {string | null} account
 * @property {'edition' | 'draft' | 'unknown'} kind
 * @property {string | null} label
 * @property {Standing | null} standing
 * @property {boolean} system
 * @property {number | null} extent the content subspace's positions, from the span set
 * @property {number | null} linkPositions the link subspace's positions
 * @property {DocMeta | null} meta
 * @property {Run[]} runs the delivered runs, merged, in position order
 * @property {number} from the first delivered position, or -1
 * @property {number} to one past the last delivered position
 * @property {Block[]} blocks
 * @property {ImageRun[]} image the V→I image as read, in position order: the permanent address of every position it covers
 * @property {Origin[]} origins the image's runs whose origin is another document — the transcluded runs
 * @property {[number, number] | null} imageFor the window the image was read for
 * @property {Set<string>} links the addresses of the links touching this document, as `find_links_v` delivered them
 * @property {boolean} linksRead
 * @property {number | null} members the chain's member count where probed, else null
 * @property {number | null} whole the content extent the whole document holds, where the span set said
 * @property {number} rev bumped on every change to this document
 * @property {'unregistered' | 'withheld' | null} refused what a read of this document answered, where one refused
 */

/**
 * @typedef {Object} Link — as delivered; raw (which show and how is LK's)
 * @property {string} addr
 * @property {string} home the document the link resides in
 * @property {string | null} owner the home's account
 * @property {string | null} type the type slot's address
 * @property {EndRef[]} from
 * @property {EndRef[]} to
 */

/**
 * @typedef {Object} OwnerRow
 * @property {string | null} prefix
 * @property {number | null} principal
 */

/**
 * @typedef {Object} Reader — who reads, as the entitlement arm at a withheld document or run is decided for them (PUB-5.97's key-split defaults, in PUB-5.121's order; R56)
 * @property {string | null} account the acting account, or null (a guest)
 * @property {boolean} keyPresent the device's key store holds a key bound at this board's origin: PUB-5.97's "an enrolled key for this board present"
 */

const state = {
  /** @type {{board: string, name: string, origin: string} | null} */
  board: null,
  /** @type {{session: string, principal: number, account: string | null} | null} */
  session: null,
  /** @type {DeathReason | null} */
  sessionDied: null,
  /** @type {{kind: string, name: string} | null} the refusal `session()` met, where it did */
  sessionRefused: null,
  /** @type {unknown} the `/health` document verbatim */
  health: null,
  /** @type {Mode | null} */
  mode: null,
  /** @type {{label: string | null, fingerprint: string} | null} the key store's device key, from `fingerprint` */
  device: null,
  /** does the key store hold a key bound at this board's origin, from `fingerprint` (`takeKeyStore`) */
  keyPresent: false,
  /** @type {'running' | 'stopped' | 'unreachable' | null} */
  daemon: null,
  /** @type {boolean} */
  daemonChanged: false,
  /** @type {Map<string, Place>} */
  index: new Map(),
  /** @type {Map<string, number>} documents per account, from `places` */
  counts: new Map(),
  /** @type {IndexState | null} */
  indexState: null,
  /** @type {Map<string, Doc>} */
  docs: new Map(),
  /** @type {Map<string, Link>} */
  links: new Map(),
  /** @type {Map<string, Map<string, Stretch[] | 'refused'>>} `project`'s answers, by the document projected into, then by `⟨link⟩ ⟨slot⟩` */
  projections: new Map(),
  /** @type {Map<string, OwnerRow>} */
  owners: new Map(),
  /** @type {Map<string, {enrolled: Array<{fingerprint: string, anchor: boolean}>, retired: Array<{fingerprint: string}>}>} */
  keySets: new Map(),
  /** @type {Array<{position: number, op: string | null, docs: string[], cls: string}>} the feed's rows as they arrived (the newest last) */
  feed: [],
  rev: 0,
  /** @type {Array<() => void>} */
  watchers: [],
};

function bump() { state.rev++; for (const w of state.watchers) w(); }

/** subscribe to any change (the app marks its frame dirty) */
export function watch(/** @type {() => void} */ fn) { state.watchers.push(fn); }
/** the model's revision counter */
export const rev = () => state.rev;

// ---- the board, the session, health, the daemon ------------------------------

/** @param {{board: string, name: string, origin: string} | null} b */
export function setBoard(b) { state.board = b; bump(); }
export const board = () => state.board;
/** @param {{session: string, principal: number, account: string | null} | null} s */
export function setSession(s) { state.session = s; state.sessionDied = null; bump(); }
export const session = () => state.session;
/** @param {{kind: string, name: string} | null} r */
export function setSessionRefused(r) { state.sessionRefused = r; bump(); }
export const sessionRefused = () => state.sessionRefused;
/**
 * The death signal: the line drops "acting as" at once, and every read held
 * at the session's class goes with the session — the index (its rows, counts
 * and state), each document's delivered state and the index's row on it, the
 * links and where their slots project, the owners and key sets, and the
 * feed's drafts rows — so no frame after it draws, lists or counts what the
 * session could read and a guest cannot. M-PUMP reads the index again in the
 * guest form, and the view asks the rest.
 * @param {DeathReason} reason
 */
export function sessionDied(reason) {
  state.sessionDied = reason; state.session = null;
  state.index.clear(); state.counts.clear(); state.indexState = null;
  for (const d of state.docs.values()) { drop(d); unlist(d); }
  state.links.clear(); state.projections.clear(); state.owners.clear(); state.keySets.clear();
  state.feed = state.feed.filter((r) => r.cls !== 'drafts');
  bump();
}
export const deathReason = () => state.sessionDied;
/** @param {unknown} h @param {Mode | null} mode */
export function setHealth(h, mode) { state.health = h; state.mode = mode; bump(); }
export const health = () => /** @type {{auth?: {claimant?: string | null, local_trust?: boolean}, log_position?: number, writes?: {halted?: boolean}} | null} */ (state.health);
export const mode = () => state.mode;
/** @param {{mode: Mode, claimant: string | null, local_trust: boolean}} ev */
export function setMode(ev) {
  state.mode = ev.mode;
  const h = /** @type {{auth?: Record<string, unknown>} | null} */ (state.health);
  if (h && h.auth) { h.auth.claimant = ev.claimant; h.auth.local_trust = ev.local_trust; }
  bump();
}
/** @param {'running' | 'stopped' | 'unreachable'} s */
export function setDaemon(s) { state.daemonChanged = state.daemon !== null && state.daemon !== s; state.daemon = s; bump(); }
export const daemon = () => state.daemon;
/** @param {{label: string | null, fingerprint: string} | null} d */
export function setDevice(d) { state.device = d; bump(); }
export const device = () => state.device;
/**
 * The key store as `fingerprint` answers it, read for this board: whether
 * some key is bound at its origin — each binding reads `⟨origin⟩ principal
 * ⟨N⟩ account ⟨A⟩`, so the origin is the binding's whole first field and
 * never a prefix of it (`…:8642` is not `…:86420`'s). A session's death
 * leaves it standing: the store is the device's, not the session's.
 * @param {Array<{bindings: string[]}>} rows the store's keys, each with its bindings
 * @param {string} origin this board's origin, as `boards` answers it
 */
export function takeKeyStore(rows, origin) {
  state.keyPresent = rows.some((r) => r.bindings.some((b) => b.startsWith(origin + ' principal ')));
  bump();
}
/** does the device's key store hold a key bound at this board (R56's "key present")? */
export const keyPresent = () => state.keyPresent;
/**
 * Who reads now — the acting account, or a guest's null, and whether a key
 * for this board is present: the one value every entitlement arm is decided
 * from (T-ARTICLE's `entitlementArm`).
 * @returns {Reader}
 */
export const reader = () => ({ account: state.session ? state.session.account : null, keyPresent: state.keyPresent });

// ---- the index -----------------------------------------------------------------

/**
 * Build the index from `places` (skep #463): every document of the board's
 * document index at the call's class, in address order; the counts per
 * account; the index's state. The answer replaces the index whole: a record
 * the index listed before and this answer does not keeps none of its row.
 * @param {PlacesAnswer} answer
 */
export function takeIndex(answer) {
  const listed = [...state.index.keys()];
  state.index.clear(); state.counts.clear();
  for (const p of answer.docs) putPlace(p);
  for (const addr of listed) { const d = state.docs.get(addr); if (d && !state.index.has(addr)) unlist(d); }
  for (const c of answer.counts) state.counts.set(c.account, c.documents);
  state.indexState = answer.state;
  bump();
}

/** a record no index row stands on: none of a row's kind, label or standing — its kind its metadata's, where read (as `takeMetadata` sets it) */
function unlist(/** @type {Doc} */ d) {
  d.kind = d.meta && !memberOf(d.addr) ? (d.meta.published ? 'edition' : 'draft') : 'unknown';
  d.label = null; d.standing = null; d.rev++;
}

/** @param {ShapePlace} p */
function putPlace(p) {
  const account = accountOf(p.doc) || '';
  const system = isUnder(SYSTEM_ACCOUNT, p.doc);
  /** @type {Place} */
  const row = { doc: p.doc, kind: p.kind, label: p.label, standing: p.standing, account, system };
  state.index.set(p.doc, row);
  const d = doc(p.doc);
  d.kind = p.kind; d.label = p.label; d.standing = p.standing; d.system = system;
}

/** @param {IndexState} s */
export function setIndexState(s) { state.indexState = s; bump(); }
export const indexState = () => state.indexState;
/** the reclaim floor the index counts from, where its state names one */
export function floor() {
  const s = /** @type {{arm: string, floor?: unknown} | null} */ (state.indexState);
  return s && typeof s.floor === 'number' ? s.floor : null;
}
/** are the index's counts exact (an index run unbroken from the board's first position), or lower bounds? */
export const countsExact = () => !!state.indexState && state.indexState.arm === 'complete';
/** @param {string} addr @returns {Place | undefined} */
export const place = (addr) => state.index.get(addr);
/** every indexed place, in address order */
export function places() { return [...state.index.values()].sort((a, b) => cmpAddr(a.doc, b.doc)); }
/** the indexed documents of one account */
export function placesOf(/** @type {string} */ account) { return places().filter((p) => p.account === account); }
/** the accounts the index names (counts and rows), in address order — the system account among them, marked */
export function accounts() {
  const set = new Set([...state.counts.keys(), ...[...state.index.values()].map((p) => p.account)]);
  return [...set].filter(Boolean).sort(cmpAddr).map((a) => ({ account: a, system: isUnder(SYSTEM_ACCOUNT, a) }));
}
/** documents per account, with whether the count is exact or a lower bound */
export function countOf(/** @type {string} */ account) {
  const n = state.counts.get(account) ?? placesOf(account).length;
  return { documents: n, exact: countsExact() };
}
/** the landmarks: every account's document 1 the index holds */
export function landmarks() { return places().filter((p) => /\.0\.1$/.test(p.doc) && !p.system); }

// ---- documents -----------------------------------------------------------------

/**
 * The document record for an address — made on first ask, an empty record
 * until the reads deliver (FP-6).
 * @param {string} addr a document address (a member's address answers its own record, under its member address)
 * @returns {Doc}
 */
export function doc(addr) {
  let d = state.docs.get(addr);
  if (!d) {
    const p = state.index.get(addr);
    d = {
      addr, account: accountOf(addr), kind: p ? p.kind : 'unknown', label: p ? p.label : null, standing: p ? p.standing : null,
      system: isUnder(SYSTEM_ACCOUNT, addr), extent: null, linkPositions: null, meta: null, runs: [], from: -1, to: -1, blocks: [],
      image: [], origins: [], imageFor: null, links: new Set(), linksRead: false, members: null, whole: null, rev: 0, refused: null,
    };
    state.docs.set(addr, d);
  }
  return d;
}
/** @param {string} addr */
export const has = (addr) => state.docs.has(addr);
/** every held document */
export const docs = () => [...state.docs.values()];

/** the span set: the content extent (subspace 1) and the link positions (subspace 2) */
export function takeSpanSet(/** @type {string} */ addr, /** @type {Array<{subspace: number, ordinal: number, positions: number}>} */ set) {
  const d = doc(addr);
  const c = set.find((s) => s.subspace === 1), l = set.find((s) => s.subspace === 2);
  d.extent = c ? c.positions : 0; d.whole = d.extent; d.linkPositions = l ? l.positions : 0;
  d.rev++; bump();
}

/** @param {string} addr @param {DocMeta} meta */
export function takeMetadata(addr, meta) {
  const d = doc(addr);
  d.meta = meta;
  if (!state.index.has(addr) && !memberOf(addr)) d.kind = meta.published ? 'edition' : 'draft';
  d.rev++; bump();
}

/** a read of this document refused: `doc_not_registered` or `withheld` */
export function takeRefused(/** @type {string} */ addr, /** @type {'unregistered' | 'withheld'} */ what) {
  const d = doc(addr); d.refused = what; d.rev++; bump();
}

/**
 * A delivery merged into the document's runs: adjacent content runs join,
 * the blocks are re-derived, the window [from, to) widened. The document is
 * given new runs and new blocks, and the ones it held are left as they were,
 * as `invalidate` leaves them: an article made from them keeps them.
 * @param {string} addr
 * @param {Run[]} runs
 */
export function takeDelivery(addr, runs) {
  const d = doc(addr);
  if (!runs.length) { d.rev++; bump(); return; }
  /** @type {Run[]} */
  const all = d.runs.filter((r) => !runs.some((n) => overlaps(r, n)));
  all.push(...runs);
  all.sort((a, b) => a.pos - b.pos);
  /** @type {Run[]} */
  const merged = [];
  for (const r of all) {
    const last = merged[merged.length - 1];
    if (last && last.kind === 'content' && r.kind === 'content' && last.pos + last.width === r.pos) { last.text += r.text; last.width += r.width; }
    else merged.push({ ...r });
  }
  d.runs = merged;
  d.from = merged[0].pos;
  d.to = merged[merged.length - 1].pos + merged[merged.length - 1].width;
  d.blocks = deriveBlocks(merged);
  d.refused = null;
  d.rev++; bump();
}

/** @param {Run} a @param {Run} b */
const overlaps = (a, b) => a.pos < b.pos + b.width && b.pos < a.pos + a.width;

/**
 * The blocks of a document's runs: a content run splits at paragraph
 * boundaries (a blank line), each block tiling its positions in bytes; a
 * withheld, atom, ref or hex run is a block of its own.
 * @param {Run[]} runs
 * @returns {Block[]}
 */
export function deriveBlocks(runs) {
  /** @type {Block[]} */
  const out = [];
  for (const r of runs) {
    if (r.kind !== 'content') { out.push({ pos: r.pos, width: r.width, kind: r.kind === 'withheld' ? 'withheld' : r.kind === 'ref' ? 'ref' : r.kind === 'hex' ? 'hex' : 'atom', text: r.text, origin: r.origin }); continue; }
    const offs = byteOffsets(r.text);
    const re = /\n[ \t]*\n+/g;
    let cut = 0;
    let m;
    while ((m = re.exec(r.text))) {
      const end = m.index + m[0].length;
      const text = r.text.slice(cut, m.index);
      out.push({ pos: r.pos + offs[cut], width: offs[end] - offs[cut], kind: 'para', text, origin: null });
      cut = end;
    }
    if (cut < r.text.length) out.push({ pos: r.pos + offs[cut], width: offs[r.text.length] - offs[cut], kind: 'para', text: r.text.slice(cut), origin: null });
  }
  return out;
}

/**
 * The block of a set of blocks holding a position: a document's as the model
 * holds them (`blockAt`), or the ones an article was made from.
 * @param {Block[]} blocks
 * @param {number} pos
 * @returns {Block | null}
 */
export const blockIn = (blocks, pos) => blocks.find((b) => pos >= b.pos && pos < b.pos + b.width) || null;
/** the block holding a position, where delivered */
export function blockAt(/** @type {string} */ addr, /** @type {number} */ pos) {
  const d = state.docs.get(addr);
  return d ? blockIn(d.blocks, pos) : null;
}
/** the block keyed by its first position */
export function blockByPos(/** @type {string} */ addr, /** @type {number} */ pos) {
  const d = state.docs.get(addr); if (!d) return null;
  return d.blocks.find((b) => b.pos === pos) || null;
}
/**
 * The text of a set of delivered runs between two positions (bytes): the
 * characters whose first byte lies in [p0, p1), a run that is not content (a
 * withheld run, an atom, a reference, hex) adding none. A document's runs as
 * the model holds them (`textBetween`), or the ones an article was made from.
 * @param {Run[]} runs
 * @param {number} p0
 * @param {number} p1
 * @returns {string}
 */
export function textOf(runs, p0, p1) {
  let out = '';
  for (const r of runs) {
    if (r.kind !== 'content' || r.pos >= p1 || r.pos + r.width <= p0) continue;
    const offs = byteOffsets(r.text);
    let i0 = 0; while (i0 < r.text.length && r.pos + offs[i0] < p0) i0++;
    let i1 = i0; while (i1 < r.text.length && r.pos + offs[i1] < p1) i1++;
    out += r.text.slice(i0, i1);
  }
  return out;
}
/** the text of a document's delivered content between two positions (bytes), for a passage's first words */
export function textBetween(/** @type {string} */ addr, /** @type {number} */ p0, /** @type {number} */ p1) {
  const d = state.docs.get(addr);
  return d ? textOf(d.runs, p0, p1) : '';
}

/** a permanent address cut at its last field: the I-space it lies in, and its ordinal there */
function iPlace(/** @type {string} */ start) {
  const cut = start.lastIndexOf('.');
  return { prefix: start.slice(0, cut), ordinal: Number(start.slice(cut + 1)) };
}

/**
 * The V→I image's runs over a window, kept whole — each placed at its
 * positions, the permanent addresses `placed` reads a link's stored span
 * back to the text through — and the runs whose origin is another document,
 * the transcluded runs, marked as origins.
 * @param {string} addr
 * @param {number} fromPos the window's first position
 * @param {Array<{iStart: string, width: number}>} runs
 */
export function takeImage(addr, fromPos, runs) {
  const d = doc(addr);
  /** @type {ImageRun[]} */
  const image = [];
  /** @type {Origin[]} */
  const out = [];
  let pos = fromPos;
  for (const r of runs) {
    image.push({ pos, width: r.width, ...iPlace(r.iStart) });
    const el = elementOf(r.iStart);
    const origin = el ? el.doc : documentOf(r.iStart);
    if (origin && origin !== addr && documentOf(origin) !== documentOf(addr)) out.push({ pos, width: r.width, doc: origin });
    pos += r.width;
  }
  const outside = (/** @type {{pos: number, width: number}} */ o) => o.pos + o.width <= fromPos || o.pos >= pos;
  d.image = d.image.filter(outside).concat(image).sort((a, b) => a.pos - b.pos);
  d.origins = d.origins.filter(outside).concat(out).sort((a, b) => a.pos - b.pos);
  d.imageFor = [fromPos, pos];
  d.rev++; bump();
}

/**
 * Where a link's stored span stands in a document's held text now: the
 * positions of the held V→I image whose permanent addresses the span names
 * (the span's I-space, from its ordinal for its positions), in the text's
 * order, stretches adjoining in the text joined — a passage an edit moved
 * where the image puts it, one cut in two as two stretches, one transcluded
 * twice at both places. None where the image held places none of it: no
 * image read, the span outside the window it was read for, or the text no
 * longer holding it. A span naming a document or an account whole stands at
 * no position.
 * @param {string} addr
 * @param {EndRef} e
 * @returns {Stretch[]}
 */
export function placed(addr, e) {
  const d = state.docs.get(addr);
  if (!d || e.whole || e.ordinal == null) return [];
  const { prefix, ordinal } = iPlace(e.start), end = ordinal + (e.positions || 1);
  /** @type {Stretch[]} */
  const out = [];
  for (const r of d.image) {
    if (r.prefix !== prefix) continue;
    const lo = Math.max(ordinal, r.ordinal), hi = Math.min(end, r.ordinal + r.width);
    if (lo < hi) out.push({ pos: r.pos + (lo - r.ordinal), width: hi - lo });
  }
  out.sort((a, b) => a.pos - b.pos);
  /** @type {Stretch[]} */
  const joined = [];
  for (const s of out) { const last = joined[joined.length - 1]; if (last && last.pos + last.width === s.pos) last.width += s.width; else joined.push(s); }
  return joined;
}

/** the members probed: the chain holds n members (`D.1 … D.n`) */
export function takeMembers(/** @type {string} */ addr, /** @type {number} */ n) { const d = doc(addr); d.members = n; d.rev++; bump(); }

/** drop a document's delivered state (a feed row named it; the viewport asks again), and where every link's slot projects into it, whether or not the page holds its record */
export function invalidate(/** @type {string} */ addr) {
  const d = state.docs.get(addr);
  const projected = unproject(addr);
  if (d) drop(d);
  if (d || projected) bump();
}

/** a document's delivered state dropped — everything its reads brought; the record stands, its runs and blocks given new empty ones as a delivery gives new ones */
function drop(/** @type {Doc} */ d) {
  d.runs = []; d.blocks = []; d.from = -1; d.to = -1; d.extent = null; d.whole = null; d.linkPositions = null; d.meta = null; d.image = []; d.origins = []; d.imageFor = null;
  d.links.clear(); d.linksRead = false; d.members = null; d.refused = null; d.rev++;
}

// ---- links ---------------------------------------------------------------------

/** `find_links_v`'s answer for a document: the raw set of addresses */
export function takeLinks(/** @type {string} */ addr, /** @type {string[]} */ addrs) {
  const d = doc(addr);
  for (const a of addrs) d.links.add(a);
  d.linksRead = true; d.rev++; bump();
}
/** `read_link`'s answer: the link's slots, its type learned once */
export function takeLink(/** @type {LinkValue} */ v) {
  const home = documentOf(v.addr) || v.addr;
  state.links.set(v.addr, { addr: v.addr, home, owner: accountOf(home), type: v.type, from: v.from, to: v.to });
  bump();
}
/** @param {string} addr */
export const link = (addr) => state.links.get(addr);
/** the links touching a document, RAW, as delivered and read (unread addresses omitted) */
export function linksTouching(/** @type {string} */ addr) {
  const d = state.docs.get(addr); if (!d) return /** @type {Link[]} */ ([]);
  /** @type {Link[]} */
  const out = [];
  for (const a of d.links) { const l = state.links.get(a); if (l) out.push(l); }
  return out;
}
/** the link addresses a document names that are not yet read */
export function unreadLinks(/** @type {string} */ addr) {
  const d = state.docs.get(addr); if (!d) return /** @type {string[]} */ ([]);
  return [...d.links].filter((a) => !state.links.has(a));
}
/** every link held */
export const links = () => [...state.links.values()];

/** every held document whose links include one of these gains a revision: what its article sets from where they project is made again */
function relink(/** @type {Set<string>} */ named) {
  for (const d of state.docs.values()) for (const a of d.links) if (named.has(a)) { d.rev++; break; }
}

/**
 * `project`'s answer (A-53): where a link's slot sits in a document's current
 * text now — every stretch, in the text's order; none where the end has left
 * that text (a floating end); 'refused' where the board declined the read.
 * Held until the document's delivered state is dropped (`invalidate`, the
 * session's death).
 * @param {string} link
 * @param {1 | 2} slot
 * @param {string} addr the document projected into
 * @param {Stretch[] | 'refused'} runs
 */
export function takeProjection(link, slot, addr, runs) {
  let m = state.projections.get(addr);
  if (!m) { m = new Map(); state.projections.set(addr, m); }
  m.set(link + ' ' + slot, runs === 'refused' ? runs : [...runs].sort((a, b) => a.pos - b.pos));
  relink(new Set([link]));
  bump();
}
/**
 * The held projection of a link's slot into a document: its stretches in the
 * text's order, none for a floating end, 'refused', or undefined where none
 * is held.
 * @param {string} link
 * @param {1 | 2} slot
 * @param {string} addr
 * @returns {Stretch[] | 'refused' | undefined}
 */
export const projection = (link, slot, addr) => state.projections.get(addr)?.get(link + ' ' + slot);
/** where every link's slot projects into a document dropped; whether any was held */
function unproject(/** @type {string} */ addr) {
  const m = state.projections.get(addr); if (!m) return false;
  state.projections.delete(addr);
  relink(new Set([...m.keys()].map((k) => k.split(' ')[0])));
  return true;
}

// ---- owners, key sets ----------------------------------------------------------

export function takeOwner(/** @type {string} */ addr, /** @type {OwnerRow} */ row) { state.owners.set(addr, row); bump(); }
export const ownerOf = (/** @type {string} */ addr) => state.owners.get(addr);
export function takeKeySet(/** @type {string} */ account, /** @type {{enrolled: Array<{fingerprint: string, anchor: boolean}>, retired: Array<{fingerprint: string}>}} */ ks) { state.keySets.set(account, ks); bump(); }
export const keySetOf = (/** @type {string} */ account) => state.keySets.get(account);

// ---- the feed ------------------------------------------------------------------

/**
 * A `feed` update as the shell crate defines it (S-24 (b)): the `/changes`
 * row verbatim plus `position` and `class`. The index is kept here: a mint
 * adds its place; a write to a document drops what the viewport held of it;
 * a `system` row is held and marked, never drawn.
 * @param {FeedUpdate} u
 */
export function applyFeedUpdate(u) {
  const docsNamed = Array.isArray(u.docs) ? u.docs : [];
  state.feed.push({ position: u.position, op: u.op, docs: docsNamed, cls: u.class });
  if (state.feed.length > 2000) state.feed.shift();
  for (const named of docsNamed) {
    const trunk = documentOf(named) || named;
    const existing = state.index.get(trunk);
    if (u.op === 'create_new_document' || u.op === 'fork' || u.op === 'version' || u.op === 'publish' || !existing) {
      const kind = u.op === 'publish' ? 'edition' : u.class === 'drafts' ? 'draft' : existing ? existing.kind : 'edition';
      const label = existing ? existing.label : null;
      putPlace({ doc: trunk, kind, label, standing: u.class === 'drafts' ? 'yours_to_read' : 'public' });
      const acct = accountOf(trunk);
      if (acct && !existing) state.counts.set(acct, (state.counts.get(acct) || 0) + 1);
    }
    if (u.key === 'system') { const p = state.index.get(trunk); if (p) p.system = true; const d = doc(trunk); d.system = true; }
    invalidate(trunk);
    if (named !== trunk) invalidate(named);
  }
  if (u.op === 'make_link' && u.link) { const home = documentOf(u.link); if (home) invalidate(home); }
  if (u.op === 'delegate' && u.new_prefix) { if (!state.counts.has(u.new_prefix)) state.counts.set(u.new_prefix, 0); }
  bump();
}
/** the feed rows held (the newest last) */
export const feedRows = () => state.feed.slice();

/** reset everything (tests) */
export function _reset() {
  state.board = null; state.session = null; state.sessionDied = null; state.sessionRefused = null; state.health = null; state.mode = null;
  state.device = null; state.keyPresent = false; state.daemon = null; state.index.clear(); state.counts.clear(); state.indexState = null; state.docs.clear();
  state.links.clear(); state.projections.clear(); state.owners.clear(); state.keySets.clear(); state.feed = []; state.rev = 0;
}

/** a deep, serializable picture of the model for the gate and the fake-port test */
export function snapshot() {
  return {
    board: state.board, session: state.session ? { principal: state.session.principal, account: state.session.account } : null,
    mode: state.mode, daemon: state.daemon, indexState: state.indexState,
    index: places().map((p) => [p.doc, p.kind, p.label, p.system]),
    counts: [...state.counts.entries()].sort(),
    docs: docs().filter((d) => d.from >= 0 || d.extent != null || d.meta).map((d) => ({ addr: d.addr, extent: d.extent, from: d.from, to: d.to, blocks: d.blocks.length, links: [...d.links].sort(), members: d.members, origins: d.origins })).sort((a, b) => cmpAddr(a.addr, b.addr)),
    links: links().map((l) => ({ addr: l.addr, home: l.home, type: l.type, from: l.from.map((e) => e.start), to: l.to.map((e) => e.start) })).sort((a, b) => cmpAddr(a.addr, b.addr)),
  };
}
