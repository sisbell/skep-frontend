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
// delete, copy, reinstate, rearrange — and applies it in the text as it
// stands after the rows before it: where the row's anchors name bytes that
// text places, beside them (`anchored`), else at the positions the frame
// names; the runs, the blocks and the V→I image move together, so a passage
// keeps its identity through an edit above it, and inserted bytes stand
// placed by the identity the caller names them by (`Named`), their source
// with it, or, where it names none, by no identity. A row it cannot apply
// exactly stops the apply at that row: a
// position outside the text held, a span not whole in the runs, a copy or a
// reinstate whose material no record at hand holds, a rearrange whose cuts
// are not three or four in order, a frame of another kind — the answer names
// the row and why (`Applied`). `applyEdits` rides the same kernel for the
// page-local edits a draft's caret makes (K-72) — positions and text alone,
// never a frame — and names every byte of the text it answers twice over:
// its image places each by identity — a byte the delivered text holds by the
// permanent address the document's image gives it, a byte an edit made by the
// identity the caller spells for it (M-REC's `pageIds`: the page's own until
// the board mints it, its permanent address after) — and its source
// (`Derivation.source`) by where it came from, a position of the delivered
// text or the page's ordinal for it. An edit that puts back what an earlier
// edit removed (`Edit.back`) places those same bytes again, their identity
// and their source with them. An edit whose change the record's text holds
// already (`Edit.based`) is applied to nothing: it stands for the put-back
// that names it, which places what it took as the edit keeps it
// (`Edit.took`), bytes the record's text holds nowhere and no source names.
// A record `applyHeld` derived with its inserts named is applied over as any
// record is, its sources standing. `placedAgain` places a draft's edits again
// in another text — or in the same, some of them left out — by the identity
// of the bytes each touches and of those either side, and says which it
// could not place exactly. `madeBy` reads what each edit did as it was
// applied — what it removed, what it placed, and the byte either side of its
// change — by identity, deriving no record, and `stretchIn` a stretch of a
// record as a put-back places it.
// `sourceRuns` splits a span of that text into
// what the delivered text holds and what the edits made — the one reading of
// a span the board is asked about, so no question reaches the board by a
// position of the typed text — and `fromBase` finds a stretch of the
// delivered text in it. `boundaries` and `wordStop` read a text's characters
// and its words about a position, for the steps a caret and a selection's end
// make (K-70, K-71, K-77). The texts' positions are bytes (wire.md §Value
// encodings).
// Rules: FP-1, FP-2, FP-6, FP-7, FP-14.

import { deriveBlocks, placedIn, identityIn, pageSpace, transcludedRuns } from './records.js';
import { parseVSpan, documentOf, accountOf } from './address.js';
import { byteLength, byteOffsets, sliceBytes } from '../util.js';

/** @typedef {import('./records.js').Doc} Doc */
/** @typedef {import('./records.js').ImageRun} ImageRun */
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
 * @typedef {Object} Text — a text as the kernel edits it: its runs in position order, its image placing them by identity, where each byte came from, and how far its extent moved
 * @property {Run[]} runs
 * @property {ImageRun[]} image
 * @property {ImageRun[]} source every byte by where it came from (`Derivation.source`), as the image places it by identity: `BASE` and its position in the text the kernel started from, or `PAGE` and the page's ordinal for a byte an edit made; none where the caller tracks none
 * @property {number} delta the positions added, less the positions removed
 */

/** the source of a byte the text the kernel started from holds: its ordinal that text's position (`Text.source`) */
export const BASE = 'base';
/** the source of a byte an edit made: its ordinal the page's own for it (`Text.source`; M-REC's `Edit.page`) */
export const PAGE = 'page';

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
 * @param {ImageRun[]} [src] where the placed runs came from (`Text.source`), each at its position from 1; none where the caller tracks none
 * @returns {Text}
 */
function placeAt(t, pos, placed, ids, src = []) {
  const e = extentOf(t.runs);
  if (e ? pos < e.from || pos > e.to : pos !== 1) throw new Stop('outside');
  const width = placed.reduce((n, r) => n + r.width, 0);
  if (!width) return t;
  const runs = shifted(cutAt(t.runs, pos), pos, width), image = shiftedImage(cutImage(t.image, pos), pos, width), source = shiftedImage(cutImage(t.source, pos), pos, width);
  for (const r of placed) runs.push({ ...r, pos: pos + r.pos - 1 });
  for (const r of ids) image.push({ ...r, pos: pos + r.pos - 1 });
  for (const r of src) source.push({ ...r, pos: pos + r.pos - 1 });
  return { runs: merged(runs), image: image.sort((a, b) => a.pos - b.pos), source: source.sort((a, b) => a.pos - b.pos), delta: t.delta + width };
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
  const outside = (/** @type {ImageRun[]} */ image) => cutImage(cutImage(image, pos), end).filter((r) => r.pos + r.width <= pos || r.pos >= end);
  return { runs: merged(shifted(runs, end, -width)), image: shiftedImage(outside(t.image), end, -width), source: shiftedImage(outside(t.source), end, -width), delta: t.delta - width };
}

/** an image's runs over a span, each at its position from 1, cut to the span */
const imageOver = (/** @type {ImageRun[]} */ image, /** @type {number} */ pos, /** @type {number} */ width) =>
  cutImage(cutImage(image, pos), pos + width).filter((r) => r.pos >= pos && r.pos + r.width <= pos + width).map((r) => ({ ...r, pos: r.pos - pos + 1 }));

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
 * A stretch of a record's text as a put-back places it (M-REC's `Took`): its
 * runs and their identity, each at its position from 1; null where the record
 * does not hold the stretch whole.
 * @param {Doc} doc
 * @param {number} pos
 * @param {number} width
 * @returns {import('./records.js').Took | null}
 */
export const stretchIn = (doc, pos, width) => (width > 0 ? stretchOf(doc.runs, doc.image, pos, width) : null);

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

/** @typedef {(held: number, width: number) => ISpan[]} Named — the identity a caller names a held line's inserted bytes by (`applyHeld`): for the line of ordinal `held`, its `width` bytes in order — the page's own names for them (W-WRITE's), in the page's space of the draft */

/**
 * One frame applied to a text (see the head), by the value of its `op`.
 * @param {Text} t
 * @param {Record<string, unknown>} frame
 * @param {Sources} sources
 * @param {((width: number) => ISpan[]) | null} [named] the identity of an insert's bytes, in order, where the caller names them; they are then sourced as bytes the page made
 * @returns {Text}
 */
function applyFrame(t, frame, sources, named = null) {
  switch (frame.op) {
    case 'insert': {
      const runs = valueRuns(frame.values), width = runs.reduce((n, r) => n + r.width, 0);
      /** @type {ImageRun[]} */
      const ids = [], src = [];
      let at = 1;
      for (const x of named && width ? named(width) : []) {
        ids.push({ pos: at, width: x.width, prefix: x.prefix, ordinal: x.ordinal });
        if (x.prefix === pageSpaceOf(frame)) src.push({ pos: at, width: x.width, prefix: PAGE, ordinal: x.ordinal });
        at += x.width;
      }
      return placeAt(t, position(frame.at), runs, ids, src);
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
      const source = cutImage(cutImage(t.source, c0), cN).filter((r) => r.pos + r.width <= c0 || r.pos >= cN);
      let pos = c0;
      for (const [s, from] of /** @type {Array<[{runs: Run[], ids: ImageRun[]}, number]>} */ ([[b, cuts[cuts.length - 2]], [mu, cuts[1]], [a, c0]])) {
        const width = s.runs.reduce((n, r) => n + r.width, 0);
        for (const r of s.runs) runs.push({ ...r, pos: pos + r.pos - 1 });
        for (const r of s.ids) image.push({ ...r, pos: pos + r.pos - 1 });
        for (const r of imageOver(t.source, from, width)) source.push({ ...r, pos: pos + r.pos - 1 });
        pos += width;
      }
      return { runs: merged(runs), image: image.sort((x, y) => x.pos - y.pos), source: source.sort((x, y) => x.pos - y.pos), delta: t.delta };
    }
    default:
      return stop('frame');
  }
}

/**
 * A derived record over a text (see the head): the document's record with
 * the text's runs, the blocks derived from them, its image and the
 * transcluded runs it shows (M-REC's `transcludedRuns`), its extent and window
 * moved by the text's delta, and the derivation named. The record handed in
 * is read and never changed.
 * @param {Doc} doc
 * @param {Text} t
 * @param {Derivation} derived
 * @returns {Doc}
 */
function recordOver(doc, t, derived) {
  const e = extentOf(t.runs);
  return {
    ...doc,
    runs: t.runs, blocks: deriveBlocks(t.runs), image: t.image, origins: transcludedRuns(doc.addr, t.image),
    from: e ? e.from : -1, to: e ? e.to : -1,
    extent: doc.extent == null ? null : Math.max(0, doc.extent + t.delta), whole: doc.whole == null ? null : Math.max(0, doc.whole + t.delta),
    imageFor: doc.imageFor ? [doc.imageFor[0], doc.imageFor[1] + t.delta] : null,
    links: new Set(doc.links),
    derived,
  };
}

/** a document's text as the kernel takes it: its runs and its image copied, nothing moved yet, no byte's source tracked */
const textOfDoc = (/** @type {Doc} */ doc) => /** @type {Text} */ ({ runs: doc.runs.map(copyRun), image: doc.image.map((r) => ({ ...r })), source: [], delta: 0 });

/**
 * A document's record with its held lines applied (see the head; BM-14,
 * BM-29): each row's frame, in the order given — `k` order, as `held(session)`
 * lists them (M-FRAMES's `decodeHeldRows`) — applied at the positions it
 * names in the text as it stands after the rows before it, by the value of
 * its `op`. The first row that cannot be applied exactly stops the apply:
 * the record answered holds the rows before it, and `stopped` names it and
 * why. The record handed in is never changed.
 * @param {Doc} doc the document's record, its runs in position order
 * @param {readonly HeldLine[]} rows the held lines, in `k` order
 * @param {Sources} [sources] the records at hand a copy or a reinstate may take its material from; none where left out
 * @param {Named | null} [named] the identity each line's inserted bytes are named by; where one is handed in the record answered names every byte's source (`Derivation.source`), so the page's edits apply over it (`applyEdits`); none, and no source, where left out
 * @returns {Applied}
 */
export function applyHeld(doc, rows, sources = () => null, named = null) {
  let t = named ? /** @type {Text} */ ({ ...textOfDoc(doc), source: baseSource(doc) }) : textOfDoc(doc);
  /** @type {number[]} */
  const applied = [];
  /** @type {Applied['stopped']} */
  let stopped = null;
  for (const row of rows) {
    try { t = applyFrame(t, anchored(t, row), sources, named ? (width) => named(row.held, width) : null); applied.push(row.held); } catch (e) { if (e instanceof Stop) { stopped = { row, why: e.why }; break; } throw e; }
  }
  return { doc: recordOver(doc, named ? { ...t, image: joined(t.image) } : t, { from: doc.addr, rows: applied, edits: 0, at: null, ...(named ? { source: joined(t.source) } : {}) }), applied: applied.length, stopped };
}

/** the page's space of the draft a frame names (M-REC's `pageSpace`): the space a held insert's bytes are sourced as the page's own in; '' where the frame names no draft */
const pageSpaceOf = (/** @type {Record<string, unknown>} */ frame) => (typeof frame.doc === 'string' ? pageSpace(frame.doc) : '');

/** every position a delivered text may hold as its own source (`Text.source`), the ones the page holds no run of among them: its extent, its window and its image's reach */
function baseSource(/** @type {Doc} */ doc) {
  const reach = Math.max(doc.to, doc.extent != null ? doc.extent + 1 : 0, doc.imageFor ? doc.imageFor[1] : 0, 1);
  return /** @type {ImageRun[]} */ (reach > 1 ? [{ pos: 1, width: reach - 1, prefix: BASE, ordinal: 1 }] : []);
}

/** where the one byte an anchor's edge names by its address stands in a text; null where the edge names none so, or the text places it nowhere, or twice */
function edgeAt(/** @type {Text} */ t, /** @type {unknown} */ edge) {
  if (typeof edge !== 'string' || edge.lastIndexOf('.') < 1) return null;
  const at = placedIn(t.image, [{ ...iPlace(edge), width: 1 }]);
  return at.length === 1 && at[0].width === 1 ? at[0].pos : null;
}

/**
 * A held line's frame as it is applied to a text (see the head): where its
 * anchors name bytes the text places, the frame at those bytes — a placement
 * after the unit before it, else before the unit after it; a delete at its
 * span where the text holds it whole in one stretch, else between its two
 * units — and the frame as it stands where they name none the text places.
 * @param {Text} t
 * @param {HeldLine} row
 * @returns {Record<string, unknown>}
 */
function anchored(t, row) {
  const f = row.frame, a = row.anchors;
  if (!a) return f;
  const before = edgeAt(t, a.before), after = edgeAt(t, a.after);
  const at = (/** @type {number} */ pos) => ({ ordinal: String(pos), subspace: '1' });
  if (f.op === 'insert' || f.op === 'copy' || f.op === 'reinstate') return before != null ? { ...f, at: at(before + 1) } : after != null ? { ...f, at: at(after) } : f;
  if (f.op !== 'delete') return f;
  const spans = (a.span || []).map((r) => ({ ...iPlace(r.start), width: Number(r.width) }));
  const stands = spans.length && spans.every((x) => Number.isSafeInteger(x.width) && x.width > 0) ? placedIn(t.image, spans) : [];
  const width = spans.reduce((n, x) => n + x.width, 0);
  if (stands.length === 1 && stands[0].width === width) return { ...f, p: at(stands[0].pos), width: String(width) };
  return before != null ? { ...f, p: at(before + 1) } : f;
}

/**
 * A document's record with the page's own edits applied (see the head;
 * K-72): each edit, in order, in the text as it stands after the edits before
 * it — its `width` positions at `pos` replaced by its text, the bytes it makes
 * named by `ids` from its `page` ordinal on, or, for a put-back (`Edit.back`),
 * the bytes an earlier edit removed placed again at `pos` as they were, their
 * identity and their source with them — the same kernel the held lines ride.
 * An edit the record's text holds the change of already (`Edit.based`)
 * changes nothing, and what it took is what it keeps (`Edit.took`), placed
 * by the put-back that names it with no source. An edit outside the text
 * held, or a put-back of bytes no earlier edit removed, stops the apply as a
 * row does, named by its index among the edits. The record handed in is
 * never changed.
 * @param {Doc} doc
 * @param {readonly Edit[]} edits
 * @param {(page: number, width: number) => ISpan[]} [ids] the identity of `width` bytes the page made from its ordinal `page` on, in order (M-REC's `pageIds`); the page's own space of the document where left out
 * @returns {{doc: Doc, applied: number, stopped: {index: number, why: Why} | null, removed: Array<ISpan[] | null>, took: Array<import('./records.js').Took | null>}} `removed` what each edit applied took out of the text, by its index, as bytes by identity in the text's order — none of them where the image named none; null for an edit that removed nothing; `took` the same bytes as the runs removed and their identity, each at its position from 1: what a put-back of them places
 */
export function applyEdits(doc, edits, ids = (page, width) => [{ prefix: pageSpace(doc.addr), ordinal: page, width }]) {
  const c = chainOver(doc, ids);
  let applied = 0;
  /** @type {{index: number, why: Why} | null} */
  let stopped = null;
  for (const [i, e] of edits.entries()) {
    try { c.apply(e); applied++; } catch (x) { if (x instanceof Stop) { stopped = { index: i, why: x.why }; break; } throw x; }
  }
  const t = c.text(), removed = c.removed;
  return {
    doc: recordOver(doc, { ...t, image: joined(t.image) }, { from: doc.addr, rows: doc.derived ? doc.derived.rows : [], edits: applied, at: null, source: joined(t.source) }), applied, stopped,
    removed: removed.map((r) => (r ? r.ids.map((x) => ({ prefix: x.prefix, ordinal: x.ordinal, width: x.width })) : null)),
    took: removed.map((r) => (r ? { runs: r.runs.map(copyRun), ids: r.ids.map((x) => ({ ...x })) } : null)),
  };
}

/**
 * @typedef {Object} Made — what one edit did as it was applied, by the bytes' identity (`madeBy`)
 * @property {import('./records.js').Took | null} took what it removed — its runs and their identity, each at its position from 1; null where it removed nothing
 * @property {ISpan[]} placed the bytes it placed, in the text's order: those it made as `ids` names them, a put-back's as they were; none where it placed none
 * @property {ISpan[]} before the byte that stood just before what it changed; none at the text's first position, or where the image names none there
 * @property {ISpan[]} after the byte that stood just after it; none at the text's end, or where the image names none there
 */

/**
 * What each of a draft's edits from `from` on did as it was applied (see the
 * head), by identity: the edits applied in order by `applyEdits`' kernel,
 * and each of them read in the text as it stood right after it — what it
 * removed, what it placed, and the byte either side of its change. An edit
 * the apply stops at, and every edit after it, did nothing. The record handed
 * in is never changed, and no record is derived.
 * @param {Doc} doc
 * @param {readonly Edit[]} edits
 * @param {number} from the first edit answered for, an index into `edits`
 * @param {(page: number, width: number) => ISpan[]} [ids] the identity of bytes the page made (see `applyEdits`)
 * @returns {Made[]} one for each edit from `from` on, in order
 */
export function madeBy(doc, edits, from, ids = (page, width) => [{ prefix: pageSpace(doc.addr), ordinal: page, width }]) {
  const c = chainOver(doc, ids);
  /** @type {Made[]} */
  const out = [];
  let read = true;
  for (const [i, e] of edits.entries()) {
    if (read) try { c.apply(e); } catch (x) { if (!(x instanceof Stop)) throw x; read = false; }
    if (i < from) continue;
    if (!read) { out.push({ took: null, placed: [], before: [], after: [] }); continue; }
    const t = c.text(), was = c.removed[i], grew = e.based ? 0 : e.back ? e.back.width : byteLength(e.text);
    out.push({
      took: was && !e.based ? { runs: was.runs.map(copyRun), ids: was.ids.map((x) => ({ ...x })) } : null,
      placed: grew ? identityIn(t.image, e.pos, grew) : [],
      before: e.pos > 1 ? identityIn(t.image, e.pos - 1, 1) : [],
      after: identityIn(t.image, e.pos + grew, 1),
    });
  }
  return out;
}

/**
 * @typedef {Object} Chain — a text a draft's edits are applied to one at a time (`chainOver`)
 * @property {() => Text} text the text as it stands after the edits applied so far
 * @property {Array<{runs: Run[], ids: ImageRun[], src: ImageRun[]} | null>} removed what each edit applied removed, by its index among them: what a put-back places again
 * @property {(e: Edit) => void} apply one edit applied (see `applyEdits`), the next index taken; a `Stop` where it cannot be, its index taken all the same
 */

/**
 * A record's text as a chain of edits is applied to it (`applyEdits`,
 * `placedAgain`): every byte of it named by its source — as the record's own
 * derivation names it, where `applyHeld` derived it with its inserts named,
 * else a position of the text itself.
 * @param {Doc} doc
 * @param {(page: number, width: number) => ISpan[]} ids
 * @returns {Chain}
 */
function chainOver(doc, ids) {
  let t = /** @type {Text} */ ({ ...textOfDoc(doc), source: doc.derived && doc.derived.source ? doc.derived.source.map((r) => ({ ...r })) : baseSource(doc) });
  /** @type {Chain['removed']} */
  const removed = [];
  return {
    text: () => t,
    removed,
    apply(e) {
      const i = removed.length;
      removed[i] = null;
      if (e.based) {
        // what it took, each byte the page made named as the caller names it now: by the address the board minted it at since
        if (e.took) removed[i] = { runs: e.took.runs.map(copyRun), ids: e.took.ids.flatMap((r) => (r.prefix === pageSpace(doc.addr) ? renamed(r, ids(r.ordinal, r.width)) : [{ ...r }])), src: [] };
        return;
      }
      if (e.width > 0) {
        const s = stretchOf(t.runs, t.image, e.pos, e.width);
        if (!s) throw new Stop('outside');
        removed[i] = { ...s, src: imageOver(t.source, e.pos, e.width) };
        t = removeAt(t, e.pos, e.width);
      }
      if (e.back) {
        const was = removed[e.back.of], part = was ? stretchOf(was.runs, was.ids, e.back.from + 1, e.back.width) : null;
        if (!was || !part) throw new Stop('source');
        t = placeAt(t, e.pos, part.runs, part.ids, imageOver(was.src, e.back.from + 1, e.back.width));
      } else if (e.text) {
        const width = byteLength(e.text);
        /** @type {ImageRun[]} */
        const named = [];
        let at = 1;
        if (e.page != null) for (const x of ids(e.page, width)) { named.push({ pos: at, width: x.width, prefix: x.prefix, ordinal: x.ordinal }); at += x.width; }
        t = placeAt(t, e.pos, [{ pos: 1, width, kind: 'content', text: e.text, ref: null, origin: null }], named, [{ pos: 1, width, prefix: PAGE, ordinal: e.page ?? 0 }]);
      }
    },
  };
}

/**
 * @typedef {Object} PlacedAgain — what `placedAgain` answers
 * @property {Edit[]} edits the edits kept, in order, each at its place in the text they are placed in
 * @property {Map<number, number>} index where each edit kept stands among them, by its index among the edits handed in
 * @property {number[]} adrift the edits among them not placed exactly, by their index there: a byte either side of one, or a byte it removed, stands nowhere in that text, or the two sides no longer meet
 */

/**
 * A draft's edits placed again (see the head; D6 BM-56; FP-38): each edit
 * `keep` keeps, in order, set in the text of `now` as it stands after the
 * edits placed before it, by the identity of the bytes it touches and of
 * those either side as the text of `was` named them where it was made —
 * what it removed taken out wherever those bytes stand, a stretch at a time;
 * what it placed set where they stood, else after the byte that stood before
 * it, else before the one after it, else at the text's edge it stood at, else
 * at its own position held inside the text. An edit is placed EXACTLY where
 * the bytes it removed stand whole in one stretch and the bytes either side
 * of it stand either side of it still; the rest are named (`adrift`). A
 * put-back of bytes an edit left out removed is left out with it: those bytes
 * stand where they stood. An edit the record's text holds the change of
 * (`Edit.based`) is kept as it is. Neither record is changed.
 * @param {Doc} was the record the edits were made over
 * @param {Doc} now the record they are placed in: the same, where some are only left out
 * @param {readonly Edit[]} edits
 * @param {(e: Edit, i: number) => boolean} [keep] the edits kept; all where left out
 * @param {(page: number, width: number) => ISpan[]} [ids] the identity of bytes the page made (see `applyEdits`)
 * @param {(e: Edit, i: number) => Edit} [as] each edit kept as it is kept: one answered `based` is kept as answered, placed nowhere
 * @returns {PlacedAgain}
 */
export function placedAgain(was, now, edits, keep = () => true, ids = (page, width) => [{ prefix: pageSpace(was.addr), ordinal: page, width }], as = (e) => e) {
  const a = chainOver(was, ids), b = chainOver(now, ids);
  /** @type {Edit[]} */
  const out = [];
  /** @type {Map<number, number>} */
  const index = new Map();
  /** @type {number[]} */
  const adrift = [];
  /** the old chain still stands: an edit of it stopped, the edits after it keep their own positions */
  let read = true;
  const put = (/** @type {Edit} */ e) => { try { b.apply(e); } catch (x) { if (!(x instanceof Stop)) throw x; } out.push(e); };
  for (const [i, e] of edits.entries()) {
    const ta = a.text();
    // the document's own edges, never a window's: its first position, and one past its last as the edits so far left it
    const by = !read || e.based ? null : {
      before: e.pos > 1 ? identityIn(ta.image, e.pos - 1, 1) : [], after: identityIn(ta.image, e.pos + e.width, 1), span: e.width > 0 ? identityIn(ta.image, e.pos, e.width) : [],
      first: e.pos <= 1, last: was.extent != null && e.pos + e.width > was.extent + ta.delta,
    };
    if (read) try { a.apply(e); } catch (x) { if (!(x instanceof Stop)) throw x; read = false; }
    if (!keep(e, i) || (e.back && !index.has(e.back.of))) continue;
    const k = as(e, i);
    const back = k.back ? { ...k.back, of: /** @type {number} */ (index.get(k.back.of)) } : k.back;
    if (!by || k.based) { index.set(i, out.length); put({ ...k, back }); continue; }
    const tb = b.text(), eb = extentOf(tb.runs);
    /** the first position of the text placed in, and one past its last */
    const start = 1, close = now.extent != null ? now.extent + tb.delta + 1 : eb ? eb.to : 1;
    const one = (/** @type {ISpan[]} */ x) => { const at = x.length ? placedIn(tb.image, x) : []; return at.length === 1 && at[0].width === 1 ? at[0].pos : null; };
    const before = one(by.before), after = one(by.after);
    const stands = by.span.length ? placedIn(tb.image, by.span) : [];
    const whole = e.width > 0 && stands.length === 1 && stands[0].width === e.width;
    // where it stands: at what it removed, else after the byte before it, else before the one after it, else at the edge it stood at
    const end = whole ? stands[0].pos + e.width : stands.length ? stands[stands.length - 1].pos + stands[stands.length - 1].width : null;
    const pos = stands.length ? stands[0].pos : before != null ? before + 1 : after != null ? after : by.first ? start : by.last ? close : null;
    const left = by.first ? (stands.length ? stands[0].pos : pos) === start : before != null && before + 1 === (stands.length ? stands[0].pos : pos);
    const right = by.last ? (end ?? pos) === close : after != null && after === (end ?? pos);
    const exact = pos != null && (e.width > 0 ? whole : true) && left && right;
    const at = pos ?? (eb ? Math.min(Math.max(e.pos, eb.from), eb.to) : 1);
    // what it removed, the stretches after the first taken out first, so each stands where it is named
    for (const st of stands.slice(1).reverse()) put({ ...k, pos: st.pos, width: st.width, text: '', page: null, back: null });
    index.set(i, out.length);
    if (!exact) adrift.push(out.length);
    put({ ...k, pos: at, width: stands.length ? stands[0].width : 0, back });
  }
  return { edits: out, index, adrift };
}

/** a run of bytes the page made, placed as it stands, named by the identity given for them, in order */
function renamed(/** @type {ImageRun} */ r, /** @type {ISpan[]} */ ids) {
  /** @type {ImageRun[]} */
  const out = [];
  let at = r.pos;
  for (const x of ids) { out.push({ pos: at, width: x.width, prefix: x.prefix, ordinal: x.ordinal }); at += x.width; }
  return out;
}

/** an image's runs, or a source's, joined where each continues the one before it in the text and in what it names */
function joined(/** @type {ImageRun[]} */ source) {
  /** @type {ImageRun[]} */
  const out = [];
  for (const r of source) {
    const last = out[out.length - 1];
    if (last && last.prefix === r.prefix && last.pos + last.width === r.pos && last.ordinal + last.width === r.ordinal) last.width += r.width;
    else out.push({ ...r });
  }
  return out;
}

/**
 * @typedef {Object} SpanRun — one stretch of a span of the typed text (`sourceRuns`)
 * @property {number} pos its first position in the typed text
 * @property {number} width its positions
 * @property {number | null} base its first position in the delivered text, where that text holds its bytes; null where an edit made them
 * @property {number | null} page the page's ordinal for its first byte, where an edit made its bytes (M-REC's `Edit.page`); null where the delivered text holds them
 */

/**
 * A span of the text a record shows split into runs by where its bytes came
 * from (see the head), in the text's order: each stretch the delivered text
 * holds at its position there, each stretch an edit made by the page's ordinal
 * for it. Two neighbours are one run only where they continue each other in
 * both texts, so bytes removed between two stretches leave them two runs and
 * the span is never read by its two ends. A record no edit derived answers the
 * span itself, at its own positions.
 * @param {Doc} d the record shown: one `applyEdits` derived, or the delivered text's own
 * @param {number} pos the span's first position in it
 * @param {number} width its positions; none where it is not above zero
 * @returns {SpanRun[]}
 */
export function sourceRuns(d, pos, width) {
  if (width < 1) return [];
  const source = d.derived ? d.derived.source : null;
  if (!source) return [{ pos, width, base: pos, page: null }];
  const end = pos + width;
  /** @type {SpanRun[]} */
  const out = [];
  for (const r of source) {
    const lo = Math.max(pos, r.pos), hi = Math.min(end, r.pos + r.width);
    if (lo >= hi) continue;
    const from = r.ordinal + (lo - r.pos);
    out.push({ pos: lo, width: hi - lo, base: r.prefix === BASE ? from : null, page: r.prefix === PAGE ? from : null });
  }
  return out;
}

/**
 * Where a stretch of the delivered text stands in the text a record shows
 * (see the head): every stretch of it the edits left standing, in the shown
 * text's order — moved where an edit above it moved it, cut where one typed
 * inside it, none where they removed it all. A record no edit derived answers
 * the stretch itself.
 * @param {Doc} d the record shown
 * @param {number} pos the stretch's first position in the delivered text
 * @param {number} width its positions
 * @returns {Array<{pos: number, width: number}>}
 */
export function fromBase(d, pos, width) {
  const source = d.derived ? d.derived.source : null;
  if (!source) return width > 0 ? [{ pos, width }] : [];
  const end = pos + width;
  /** @type {Array<{pos: number, width: number}>} */
  const out = [];
  for (const r of source) {
    if (r.prefix !== BASE) continue;
    const lo = Math.max(pos, r.ordinal), hi = Math.min(end, r.ordinal + r.width);
    if (lo >= hi) continue;
    const at = r.pos + (lo - r.ordinal), last = out[out.length - 1];
    if (last && last.pos + last.width === at) last.width += hi - lo; else out.push({ pos: at, width: hi - lo });
  }
  return out.sort((x, y) => x.pos - y.pos);
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
  const t = /** @type {Text} */ ({ runs: merged(runs), image: [], source: [], delta: 0 });
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

/** the word boundaries `wordStop` steps by: the runtime's own, for the reader's locale */
const WORDS = new Intl.Segmenter(undefined, { granularity: 'word' });

/** the words of a run, in order, each its first position and one past its last: a content run's word-like segments, any other run one word whole */
function wordsOf(/** @type {Run} */ r) {
  if (r.kind !== 'content') return [[r.pos, r.pos + r.width]];
  /** @type {number[][]} */
  const out = [];
  let at = r.pos;
  for (const s of WORDS.segment(r.text)) {
    const end = at + byteLength(s.segment);
    if (s.isWordLike) out.push([at, end]);
    at = end;
  }
  return out;
}

/**
 * The position a word step from a position reaches (K-70, K-71, K-77; D6
 * BM-70), at macOS's own stops: → the end of the first word ending after
 * `pos`, ← the start of the last word beginning before it, across the runs
 * that touch, white space and punctuation passed over and an item counted as
 * one word; where no word lies that way, the end of those runs on that side,
 * so the step never crosses a gap in the text held. A step extending a
 * selection stops at its anchor rather than crossing it, as macOS's does.
 * Null where the text holds nothing that way.
 * @param {Run[]} runs
 * @param {number} pos
 * @param {-1 | 1} dir
 * @param {number | null} [anchor] the anchor of the selection the step extends; null for a step that extends none
 * @returns {number | null}
 */
export function wordStop(runs, pos, dir, anchor = null) {
  const all = merged(runs);
  const at = all.findIndex((r) => (dir > 0 ? r.pos <= pos && pos < r.pos + r.width : r.pos < pos && pos <= r.pos + r.width));
  if (at < 0) return null;
  let lo = at, hi = at;
  while (lo > 0 && all[lo - 1].pos + all[lo - 1].width === all[lo].pos) lo--;
  while (hi < all.length - 1 && all[hi].pos + all[hi].width === all[hi + 1].pos) hi++;
  const words = all.slice(lo, hi + 1).flatMap(wordsOf);
  const stop = dir > 0 ? words.find((w) => w[1] > pos)?.[1] ?? all[hi].pos + all[hi].width : words.filter((w) => w[0] < pos).pop()?.[0] ?? all[lo].pos;
  return anchor != null && (pos - anchor) * (stop - anchor) < 0 ? anchor : stop;
}
