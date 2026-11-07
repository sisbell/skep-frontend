// M-DERIVE — a record the page derives (the structure record §3.2; B3-S2,
// B3-S7; D6 BM-14, BM-29). Layer 1 (the model), pure: no state, no DOM.
// A derived record is a document's record over a text the board does not
// serve as the record shows it: the kept text with the held lines applied in
// `k` order (`applyHeld`), the delivered text with the page's own edits
// applied (`applyEdits`), or a past state as an `/op-at` read delivered it
// (`recordAt`). Each answers a new `Doc` marked `derived` — what it was
// derived from and what was applied — and never writes into M-REC's
// documents, composes nothing for the bridge and sends nothing (FP-14).
// `applyHeld` switches on the VALUE of each row's frame's `op` — insert,
// delete, copy, reinstate, rearrange — and applies it at the positions the
// frame names, in the text as it stands after the rows before it; the
// runs, the blocks and the V→I image move together, so a passage keeps its
// identity through an edit above it and inserted bytes stand placed by no
// identity. A row it cannot apply exactly stops the apply at that row: a
// position outside the text held, a span not whole in the runs, a copy or a
// reinstate whose material no record at hand holds, a rearrange whose cuts
// are not three or four in order, a frame of another kind — the answer names
// the row and why (`Applied`). `applyEdits` rides the same kernel for the
// page-local edits a draft's caret makes (K-72) — positions and text alone,
// never a frame — and `toShown`/`toBase` carry a position across them, so a
// span the walk names in the delivered text is found in the typed text and
// back. The texts' positions are bytes (wire.md §Value encodings).
// Rules: FP-1, FP-2, FP-6, FP-7, FP-14.

import { deriveBlocks, placedIn } from './records.js';
import { parseVSpan, documentOf, accountOf } from './address.js';
import { byteLength, byteOffsets, sliceBytes } from '../util.js';

/** @typedef {import('./records.js').Doc} Doc */
/** @typedef {import('./records.js').ImageRun} ImageRun */
/** @typedef {import('./records.js').Origin} Origin */
/** @typedef {import('./records.js').ISpan} ISpan */
/** @typedef {import('./records.js').Edit} Edit */
/** @typedef {import('./records.js').Derivation} Derivation */
/** @typedef {import('./frames.js').Run} Run */
/** @typedef {import('./frames.js').HeldLine} HeldLine */

/**
 * @typedef {Object} Applied — what `applyHeld` or `applyEdits` answers
 * @property {Doc} doc the derived record: the rows or the edits applied, in order, up to the first that could not be
 * @property {number} applied how many were applied
 * @property {{row: HeldLine, why: Why} | null} stopped the first row that could not be applied exactly, and why; null where every row applied
 */

/**
 * @typedef {'outside' | 'subspace' | 'source' | 'cuts' | 'frame'} Why — why a row stopped the apply: a position outside the text held, or a span
 * not whole in it; a position in a subspace that is not the content's; a copy's or a reinstate's material held by no record at hand; a
 * rearrange whose cuts are not three or four in rising order; a frame of a kind this module does not apply, or malformed
 */

/** @typedef {(addr: string) => (Doc | null)} Sources — the records at hand a copy or a reinstate may take its material from, by document */

/**
 * @typedef {Object} Text — a text as the kernel edits it: its runs in position order, its image placing them by identity, and how far its extent moved
 * @property {Run[]} runs
 * @property {ImageRun[]} image
 * @property {number} delta the positions added, less the positions removed
 */

/** a row the apply stopped at */
class Stop extends Error {
  /** @param {Why} why */
  constructor(why) { super(why); this.why = why; }
}
/** @returns {never} */
const stop = (/** @type {Why} */ why) => { throw new Stop(why); };

/** a nat as the wire spells it — a decimal string or a number — read; malformed stops the row as a frame of no kind this module applies */
function nat(/** @type {unknown} */ v) {
  const n = typeof v === 'string' && /^[0-9]+$/.test(v) ? Number(v) : typeof v === 'number' && Number.isSafeInteger(v) ? v : NaN;
  return Number.isNaN(n) || n < 0 ? stop('frame') : n;
}

/** a content V-position as a frame spells it, `{ordinal, subspace}`: its ordinal; a subspace that is not the content's stops the row */
function position(/** @type {unknown} */ v) {
  if (!v || typeof v !== 'object') throw new Stop('frame');
  const p = /** @type {{ordinal?: unknown, subspace?: unknown}} */ (v);
  if (nat(p.subspace) !== 1) throw new Stop('subspace');
  const o = nat(p.ordinal);
  return o >= 1 ? o : stop('frame');
}

/** the positions a text holds: its first and one past its last; none where it holds no run */
function extentOf(/** @type {Run[]} */ runs) {
  return runs.length ? { from: runs[0].pos, to: runs[runs.length - 1].pos + runs[runs.length - 1].width } : null;
}

/** a copy of a run */
const copyRun = (/** @type {Run} */ r) => ({ ...r });

/** adjacent content runs joined, every other run as it stands, in position order */
function merged(/** @type {Run[]} */ runs) {
  /** @type {Run[]} */
  const out = [];
  for (const r of [...runs].sort((a, b) => a.pos - b.pos)) {
    const last = out[out.length - 1];
    if (last && last.kind === 'content' && r.kind === 'content' && last.pos + last.width === r.pos) { last.text += r.text; last.width += r.width; }
    else out.push(copyRun(r));
  }
  return out;
}

/**
 * The runs of a text cut at a position: the run holding it split there, a
 * content run's text cut at the byte, so the position opens a run; a position
 * that is no byte boundary of a character splits past that character, as
 * `sliceBytes` cuts.
 * @param {Run[]} runs
 * @param {number} pos
 * @returns {Run[]}
 */
function cutAt(runs, pos) {
  /** @type {Run[]} */
  const out = [];
  for (const r of runs) {
    if (r.pos < pos && pos < r.pos + r.width) {
      if (r.kind === 'content') {
        const head = sliceBytes(r.text, 0, pos - r.pos), tail = r.text.slice(head.length);
        const hw = byteLength(head);
        if (hw > 0) out.push({ ...r, width: hw, text: head });
        if (r.width - hw > 0) out.push({ ...r, pos: r.pos + hw, width: r.width - hw, text: tail });
      } else {
        out.push({ ...r, width: pos - r.pos }, { ...r, pos, width: r.pos + r.width - pos });
      }
    } else out.push(copyRun(r));
  }
  return out;
}

/** an image's runs cut at a position, as `cutAt` cuts the text's */
function cutImage(/** @type {ImageRun[]} */ image, /** @type {number} */ pos) {
  /** @type {ImageRun[]} */
  const out = [];
  for (const r of image) {
    if (r.pos < pos && pos < r.pos + r.width) out.push({ ...r, width: pos - r.pos }, { ...r, pos, ordinal: r.ordinal + (pos - r.pos), width: r.pos + r.width - pos });
    else out.push({ ...r });
  }
  return out;
}

/** every run of a set at or past a position moved by `by` positions */
const shifted = (/** @type {Run[]} */ runs, /** @type {number} */ from, /** @type {number} */ by) => runs.map((r) => (r.pos >= from ? { ...r, pos: r.pos + by } : copyRun(r)));
/** every image run at or past a position moved by `by` positions */
const shiftedImage = (/** @type {ImageRun[]} */ image, /** @type {number} */ from, /** @type {number} */ by) => image.map((r) => (r.pos >= from ? { ...r, pos: r.pos + by } : { ...r }));

/**
 * Runs placed into a text at a position: the text cut there, the runs set at
 * the position in their order and everything from the position on moved
 * past them, the image with it — the placed runs' identity (`ids`) placed
 * at their positions, inserted bytes with no identity placed by none. The
 * position must lie in the text held, its end included.
 * @param {Text} t
 * @param {number} pos
 * @param {Run[]} placed the runs to place, each at its own position from 1: their positions are taken from `pos`
 * @param {ImageRun[]} ids the identity of the placed runs, each at its position from 1
 * @returns {Text}
 */
function placeAt(t, pos, placed, ids) {
  const e = extentOf(t.runs);
  if (e ? pos < e.from || pos > e.to : pos !== 1) throw new Stop('outside');
  const width = placed.reduce((n, r) => n + r.width, 0);
  if (!width) return t;
  const runs = shifted(cutAt(t.runs, pos), pos, width), image = shiftedImage(cutImage(t.image, pos), pos, width);
  for (const r of placed) runs.push({ ...r, pos: pos + r.pos - 1 });
  for (const r of ids) image.push({ ...r, pos: pos + r.pos - 1 });
  return { runs: merged(runs), image: image.sort((a, b) => a.pos - b.pos), delta: t.delta + width };
}

/**
 * The positions [pos, pos + width) taken out of a text: each run clipped to
 * what stands outside them, the rest moved up, the image with it. The span
 * must lie whole in the text held.
 * @param {Text} t
 * @param {number} pos
 * @param {number} width
 * @returns {Text}
 */
function removeAt(t, pos, width) {
  const e = extentOf(t.runs);
  if (!e || pos < e.from || pos + width > e.to) throw new Stop('outside');
  if (!width) return t;
  const end = pos + width;
  const runs = cutAt(cutAt(t.runs, pos), end).filter((r) => r.pos + r.width <= pos || r.pos >= end);
  const image = cutImage(cutImage(t.image, pos), end).filter((r) => r.pos + r.width <= pos || r.pos >= end);
  return { runs: merged(shifted(runs, end, -width)), image: shiftedImage(image, end, -width), delta: t.delta - width };
}

/**
 * The runs of a text over a span, as runs of their own from position 1, and
 * their identity through an image, cut to the span; null where the text does
 * not hold the span whole.
 * @param {Run[]} runs
 * @param {ImageRun[]} image
 * @param {number} pos
 * @param {number} width
 * @returns {{runs: Run[], ids: ImageRun[]} | null}
 */
function stretchOf(runs, image, pos, width) {
  const e = extentOf(runs);
  if (!e || pos < e.from || pos + width > e.to) return null;
  const end = pos + width;
  const cut = cutAt(cutAt(runs, pos), end).filter((r) => r.pos >= pos && r.pos + r.width <= end).map((r) => ({ ...r, pos: r.pos - pos + 1 }));
  if (cut.reduce((n, r) => n + r.width, 0) !== width) return null;
  const ids = cutImage(cutImage(image, pos), end).filter((r) => r.pos >= pos && r.pos + r.width <= end).map((r) => ({ ...r, pos: r.pos - pos + 1 }));
  return { runs: cut, ids };
}

/**
 * An insert's values as runs (wire.md §Content values): a string a content
 * run of its bytes, an atom or an atom in hex one position, hex two
 * characters a position; any other value stops the row.
 * @param {unknown} values
 * @returns {Run[]}
 */
function valueRuns(values) {
  if (!Array.isArray(values)) throw new Stop('frame');
  /** @type {Run[]} */
  const out = [];
  let pos = 1;
  for (const v of values) {
    /** @type {Run} */
    let r;
    if (typeof v === 'string') r = { pos, width: byteLength(v), kind: 'content', text: v, ref: null, origin: null };
    else if (v && typeof v === 'object' && typeof (/** @type {{atom?: unknown}} */ (v)).atom === 'string') r = { pos, width: 1, kind: 'atom', text: /** @type {{atom: string}} */ (v).atom, ref: null, origin: null };
    else if (v && typeof v === 'object' && typeof (/** @type {{atom_hex?: unknown}} */ (v)).atom_hex === 'string') r = { pos, width: 1, kind: 'atom_hex', text: /** @type {{atom_hex: string}} */ (v).atom_hex, ref: null, origin: null };
    else if (v && typeof v === 'object' && typeof (/** @type {{hex?: unknown}} */ (v)).hex === 'string') { const h = /** @type {{hex: string}} */ (v).hex; r = { pos, width: h.length / 2, kind: 'hex', text: h, ref: null, origin: null }; }
    else return stop('frame');
    if (r.width > 0) out.push(r);
    pos += r.width;
  }
  return out;
}

/** an I-space's prefix and its ordinal from a permanent address (M-REC's `iPlace`) */
const iPlace = (/** @type {string} */ start) => { const cut = start.lastIndexOf('.'); return { prefix: start.slice(0, cut), ordinal: Number(start.slice(cut + 1)) }; };

/**
 * The material bytes named by identity hold now, from the records at hand: the
 * text whose image places them whole — `doc`'s own first, then the origin's
 * — as runs from position 1 with their identity; null where none does.
 * @param {ISpan} span
 * @param {Text} t the text being derived
 * @param {Doc | null} origin the origin's record, where one is at hand
 */
function material(span, t, origin) {
  for (const [runs, image] of /** @type {Array<[Run[], ImageRun[]]>} */ ([[t.runs, t.image], ...(origin ? [[origin.runs, origin.image]] : [])])) {
    const at = placedIn(image, [span]);
    if (at.length !== 1 || at[0].width !== span.width) continue;
    const s = stretchOf(runs, image, at[0].pos, at[0].width);
    if (s) return s;
  }
  return null;
}

/**
 * One frame applied to a text (see the head), by the value of its `op`.
 * @param {Text} t
 * @param {Record<string, unknown>} frame
 * @param {Sources} sources
 * @returns {Text}
 */
function applyFrame(t, frame, sources) {
  switch (frame.op) {
    case 'insert': {
      const runs = valueRuns(frame.values);
      return placeAt(t, position(frame.at), runs, []);
    }
    case 'delete':
      return removeAt(t, position(frame.p), nat(frame.width));
    case 'copy': {
      const at = position(frame.at);
      if (!Array.isArray(frame.specs) || !frame.specs.length) throw new Stop('frame');
      /** @type {Run[]} */
      const runs = [];
      /** @type {ImageRun[]} */
      const ids = [];
      let pos = 1;
      for (const raw of frame.specs) {
        const spec = /** @type {{source?: unknown, span?: unknown}} */ (raw && typeof raw === 'object' ? raw : stop('frame'));
        const source = typeof spec.source === 'string' ? spec.source : stop('frame');
        const v = spec.span && typeof spec.span === 'object' ? parseVSpan(/** @type {{start: string, width: string}} */ (spec.span)) : null;
        if (!v) throw new Stop('frame');
        if (v.subspace !== 1) throw new Stop('subspace');
        const src = sources(source);
        const s = src ? stretchOf(src.runs, src.image, v.ordinal, v.positions) : null;
        if (!s) throw new Stop('source');
        for (const r of s.runs) runs.push({ ...r, pos: pos + r.pos - 1 });
        for (const r of s.ids) ids.push({ ...r, pos: pos + r.pos - 1 });
        pos += v.positions;
      }
      return placeAt(t, at, runs, ids);
    }
    case 'reinstate': {
      const at = position(frame.at);
      if (!Array.isArray(frame.runs) || !frame.runs.length) throw new Stop('frame');
      /** @type {Run[]} */
      const runs = [];
      /** @type {ImageRun[]} */
      const ids = [];
      let pos = 1;
      for (const raw of frame.runs) {
        const r = /** @type {{i_start?: unknown, origin?: unknown, width?: unknown}} */ (raw && typeof raw === 'object' ? raw : stop('frame'));
        const start = typeof r.i_start === 'string' ? r.i_start : stop('frame'), width = nat(r.width);
        const origin = typeof r.origin === 'string' ? r.origin : documentOf(start);
        const m = material({ ...iPlace(start), width }, t, origin ? sources(origin) : null);
        if (!m) throw new Stop('source');
        for (const x of m.runs) runs.push({ ...x, pos: pos + x.pos - 1 });
        for (const x of m.ids) ids.push({ ...x, pos: pos + x.pos - 1 });
        pos += width;
      }
      return placeAt(t, at, runs, ids);
    }
    case 'rearrange': {
      if (!Array.isArray(frame.cuts) || (frame.cuts.length !== 3 && frame.cuts.length !== 4)) throw new Stop('cuts');
      /** @type {number[]} */
      const cuts = frame.cuts.map(position);
      if (cuts.some((c, i) => i > 0 && c <= cuts[i - 1])) throw new Stop('cuts');
      const e = extentOf(t.runs), c0 = cuts[0], cN = cuts[cuts.length - 1];
      if (!e || c0 < e.from || cN > e.to) throw new Stop('outside');
      // α = [c0, c1) and β = [cN-1, cN) exchange, μ = [c1, c2) between them where four cuts stand; outside [c0, cN) nothing moves
      const a = stretchOf(t.runs, t.image, c0, cuts[1] - c0), b = stretchOf(t.runs, t.image, cuts[cuts.length - 2], cN - cuts[cuts.length - 2]);
      const mu = cuts.length === 4 ? stretchOf(t.runs, t.image, cuts[1], cuts[2] - cuts[1]) : { runs: [], ids: [] };
      if (!a || !b || !mu) throw new Stop('outside');
      const runs = cutAt(cutAt(t.runs, c0), cN).filter((r) => r.pos + r.width <= c0 || r.pos >= cN);
      const image = cutImage(cutImage(t.image, c0), cN).filter((r) => r.pos + r.width <= c0 || r.pos >= cN);
      let pos = c0;
      for (const s of [b, mu, a]) {
        for (const r of s.runs) runs.push({ ...r, pos: pos + r.pos - 1 });
        for (const r of s.ids) image.push({ ...r, pos: pos + r.pos - 1 });
        pos += s.runs.reduce((n, r) => n + r.width, 0);
      }
      return { runs: merged(runs), image: image.sort((x, y) => x.pos - y.pos), delta: t.delta };
    }
    default:
      return stop('frame');
  }
}

/**
 * The origins of a derived image (M-REC's `Origin`): each image run whose
 * I-space is another document's, adjacent runs of one origin one.
 * @param {string} addr
 * @param {ImageRun[]} image
 * @returns {Origin[]}
 */
function originsOf(addr, image) {
  const own = documentOf(addr) || addr;
  /** @type {Origin[]} */
  const out = [];
  for (const r of image) {
    const doc = documentOf(r.prefix) || r.prefix;
    if (doc === own) continue;
    const last = out[out.length - 1];
    if (last && last.doc === doc && last.pos + last.width === r.pos) last.width += r.width;
    else out.push({ pos: r.pos, width: r.width, doc });
  }
  return out;
}

/**
 * A derived record over a text (see the head): the document's record with
 * the text's runs, the blocks derived from them, its image and origins, its
 * extent and window moved by the text's delta, and the derivation named. The
 * record handed in is read and never changed.
 * @param {Doc} doc
 * @param {Text} t
 * @param {Derivation} derived
 * @returns {Doc}
 */
function recordOver(doc, t, derived) {
  const e = extentOf(t.runs);
  return {
    ...doc,
    runs: t.runs, blocks: deriveBlocks(t.runs), image: t.image, origins: originsOf(doc.addr, t.image),
    from: e ? e.from : -1, to: e ? e.to : -1,
    extent: doc.extent == null ? null : Math.max(0, doc.extent + t.delta), whole: doc.whole == null ? null : Math.max(0, doc.whole + t.delta),
    imageFor: doc.imageFor ? [doc.imageFor[0], doc.imageFor[1] + t.delta] : null,
    links: new Set(doc.links),
    derived,
  };
}

/** a document's text as the kernel takes it: its runs and its image copied, nothing moved yet */
const textOfDoc = (/** @type {Doc} */ doc) => /** @type {Text} */ ({ runs: doc.runs.map(copyRun), image: doc.image.map((r) => ({ ...r })), delta: 0 });

/**
 * A document's record with its held lines applied (see the head; BM-14,
 * BM-29): each row's frame, in the order given — `k` order, as `held(session)`
 * lists them (M-FRAMES's `decodeHeldRows`) — applied at the positions it
 * names in the text as it stands after the rows before it, by the value of
 * its `op`. The first row that cannot be applied exactly stops the apply:
 * the record answered holds the rows before it, and `stopped` names it and
 * why. The record handed in is never changed.
 * @param {Doc} doc the document's record, its runs in position order
 * @param {HeldLine[]} rows the held lines, in `k` order
 * @param {Sources} [sources] the records at hand a copy or a reinstate may take its material from; none where left out
 * @returns {Applied}
 */
export function applyHeld(doc, rows, sources = () => null) {
  let t = textOfDoc(doc);
  /** @type {number[]} */
  const applied = [];
  /** @type {Applied['stopped']} */
  let stopped = null;
  for (const row of rows) {
    try { t = applyFrame(t, row.frame, sources); applied.push(row.held); } catch (e) { if (e instanceof Stop) { stopped = { row, why: e.why }; break; } throw e; }
  }
  return { doc: recordOver(doc, t, { from: doc.addr, rows: applied, edits: 0, at: null }), applied: applied.length, stopped };
}

/**
 * A document's record with the page's own edits applied (see the head;
 * K-72): each edit, in order, its `width` positions at `pos` replaced by its
 * text in the text as it stands after the edits before it — the same kernel
 * the held lines ride. An edit outside the text held stops the apply as a row
 * does, named by its index among the edits. The record handed in is never
 * changed.
 * @param {Doc} doc
 * @param {readonly Edit[]} edits
 * @returns {{doc: Doc, applied: number, stopped: {index: number, why: Why} | null}}
 */
export function applyEdits(doc, edits) {
  let t = textOfDoc(doc);
  let applied = 0;
  /** @type {{index: number, why: Why} | null} */
  let stopped = null;
  for (const [i, e] of edits.entries()) {
    try {
      if (e.width > 0) t = removeAt(t, e.pos, e.width);
      if (e.text) t = placeAt(t, e.pos, [{ pos: 1, width: byteLength(e.text), kind: 'content', text: e.text, ref: null, origin: null }], []);
      applied++;
    } catch (x) { if (x instanceof Stop) { stopped = { index: i, why: x.why }; break; } throw x; }
  }
  return { doc: recordOver(doc, t, { from: doc.addr, rows: [], edits: applied, at: null }), applied, stopped };
}

/**
 * A position of the delivered text carried into the typed text (see the
 * head): moved by each edit before it; one inside the positions an edit
 * removed stands at the edit's place.
 * @param {readonly Edit[]} edits
 * @param {number} pos
 * @returns {number}
 */
export function toShown(edits, pos) {
  let p = pos;
  for (const e of edits) {
    if (p >= e.pos + e.width) p += byteLength(e.text) - e.width;
    else if (p > e.pos) p = e.pos;
  }
  return p;
}

/**
 * A position of the typed text carried back into the delivered text (see
 * the head): the edits unwound from the last; one inside the bytes an edit
 * inserted stands at the edit's place.
 * @param {readonly Edit[]} edits
 * @param {number} pos
 * @returns {number}
 */
export function toBase(edits, pos) {
  let p = pos;
  for (let i = edits.length - 1; i >= 0; i--) {
    const e = edits[i], n = byteLength(e.text);
    if (p >= e.pos + n) p -= n - e.width;
    else if (p > e.pos) p = e.pos;
  }
  return p;
}

/**
 * A past state's record (see the head; B3-S7): the runs an `/op-at` read of
 * the document delivered (M-FRAMES's `opAt` around `retrieveV`,
 * `decodeDelivery`), as a derived record of the document at that board
 * position — its blocks derived, its extent the runs' positions, no image and
 * no links read; the document's account and kind from its address, a draft's.
 * @param {string} addr the document
 * @param {Run[]} runs the delivery, placed at its positions
 * @param {number} at the board position the state was read at
 * @returns {Doc}
 */
export function recordAt(addr, runs, at) {
  const t = /** @type {Text} */ ({ runs: merged(runs), image: [], delta: 0 });
  const e = extentOf(t.runs);
  /** @type {Doc} */
  const base = {
    addr, account: accountOf(addr), kind: 'draft', label: null, standing: null, system: false,
    extent: e ? e.to - 1 : 0, linkPositions: null, meta: null, runs: [], from: -1, to: -1, readAt: at, blocks: [],
    image: [], origins: [], imageFor: null, links: new Set(), linksRead: false, members: null, ended: false, whole: e ? e.to - 1 : 0, rev: 0, refused: null,
  };
  return recordOver(base, t, { from: addr, rows: [], edits: 0, at });
}

/**
 * The characters of a text about a position, for a caret's steps (K-71): the
 * byte boundary of the character before `pos` and of the one after it in the
 * content run holding it, an item whole; null on a side the text holds no
 * character on.
 * @param {Run[]} runs
 * @param {number} pos
 * @returns {{before: number | null, after: number | null}}
 */
export function boundaries(runs, pos) {
  /** @type {number | null} */
  let before = null;
  /** @type {number | null} */
  let after = null;
  for (const r of runs) {
    if (r.pos < pos && pos <= r.pos + r.width) {
      if (r.kind !== 'content') before = r.pos;
      else { const offs = byteOffsets(r.text), rel = pos - r.pos; let i = offs.length - 1; while (i > 0 && offs[i] >= rel) i--; before = r.pos + offs[i]; }
    }
    if (r.pos <= pos && pos < r.pos + r.width) {
      if (r.kind !== 'content') after = r.pos + r.width;
      else { const offs = byteOffsets(r.text), rel = pos - r.pos; let i = 0; while (i < offs.length - 1 && offs[i] <= rel) i++; after = r.pos + offs[i]; }
    }
  }
  return { before, after };
}
