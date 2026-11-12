// W-BURSTS — the composer of a burst's write frames (D6 BM-2; B3-S1's
// composers). In W-WRITE's layer (FP-11), pure: no state, no DOM; it imports
// the model and the leaf `util.js` alone, and sends nothing — W-MACHINE dials
// what it answers. Given a draft's record as read, the draft's edits and
// where the burst begins among them, `compose` answers the frames that make
// the board's text the text the edits make, as `docs/wire.md` §Arrangement
// spells each: the burst's NET change, read by the bytes' identity through
// M-DERIVE's `applyEdits` — the text as it stood before the burst beside the
// text after it — so characters typed and taken out inside the burst send
// nothing. Each place the two texts differ at, between two bytes both hold,
// is one group, the groups in the text's order and each frame's positions
// those of the text as it stands after the frames before it: a `delete` of
// the bytes the place lost, first; then a `reinstate` of each stretch placed
// there whose bytes the board holds — a put-back's, by their I-runs, never
// an `insert` of new bytes; then an `insert` of each stretch of bytes the
// page made, its `values` their text. Every frame carries the typed state it
// is given as `as_of`, an `id` of the page's own (`frameId`) and, beside it,
// its anchors: the I-addresses of the units on either side of the span it
// edits, read from the image, null at the document's edge, and for a
// `delete` the I-runs of the span between. The order within a group keeps
// every anchor a byte the board holds. An insert names the page's ordinals
// its bytes carry (`Composed.pages`), which the board's `ack_addr` mints.
// Where a frame's span or an anchor is a byte the page made that the board
// has not minted, or one the record's image does not name, no frame of the
// burst is answered and the answer says which (`Waits`).
// Rules: FP-1, FP-2, FP-10, FP-11, FP-14, FP-16 (this module's test pins
// every frame to the wire document's examples), FP-38.

import { applyEdits } from '../model/derive.js';
import { isPage, textOf } from '../model/records.js';
import { documentOf } from '../model/address.js';

/** @typedef {import('../model/records.js').Doc} Doc */
/** @typedef {import('../model/records.js').Edit} Edit */
/** @typedef {import('../model/records.js').ISpan} ISpan */
/** @typedef {import('../model/records.js').ImageRun} ImageRun */
/** @typedef {import('../bridge/shapes').Anchors} Anchors */

/** @typedef {{ordinal: string, subspace: string}} VPos — a content V-position as the wire spells it */

/**
 * @typedef {Object} InsertFrame — `insert` (wire.md §Arrangement): `values` placed at `at`
 * @property {'insert'} op
 * @property {string} doc
 * @property {VPos} at
 * @property {string[]} values
 * @property {number} as_of
 * @property {string} id
 */
/**
 * @typedef {Object} DeleteFrame — `delete` (wire.md §Arrangement): `width` positions removed from `p`
 * @property {'delete'} op
 * @property {string} doc
 * @property {VPos} p
 * @property {string} width
 * @property {number} as_of
 * @property {string} id
 */
/**
 * @typedef {Object} ReinstateFrame — `reinstate` (wire.md §Arrangement): `runs` placed by identity at `at`
 * @property {'reinstate'} op
 * @property {string} doc
 * @property {VPos} at
 * @property {Array<{i_start: string, origin: string, width: string}>} runs
 * @property {number} as_of
 * @property {string} id
 */
/** @typedef {InsertFrame | DeleteFrame | ReinstateFrame} Frame — a write frame the composer answers */

/**
 * @typedef {Object} Composed — one frame of a burst, with what rides beside it on the `op` row
 * @property {Frame} frame
 * @property {Anchors} anchors the identities the frame's edit is placed by
 * @property {Array<{page: number, width: number}>} pages for an insert, each run of the page's ordinals its values carry, in order (M-REC's `Edit.page`): what its `ack_addr` mints; none for any other frame
 */

/**
 * @typedef {'unminted' | 'unread'} Waits — why a burst composes to no frame: `unminted` a span it removes, or a unit an anchor
 * names, is a byte the page made that the board has not minted; `unread` the record at hand does not hold the text the
 * edits were made in, or its image does not name a byte the burst removes, places by identity or anchors on
 */

/**
 * @typedef {Object} Asked — what `compose` is given
 * @property {Doc} doc the draft's record as read (M-REC's): its runs, its image, its extent
 * @property {readonly Edit[]} edits the draft's edits, in the order made (W-WRITE's `edits`)
 * @property {number} from the first edit of the burst, an index into `edits`: the edits before it went out in earlier bursts
 * @property {number} asOf the typed state: the position of the read the record's text came from, raised by the page's own acks on the draft
 * @property {(page: number, width: number) => ISpan[]} ids the identity of bytes the page made, in order (M-REC's `pageIds`): a byte the board minted by its permanent address, any other in the page's space of the draft
 * @property {string} load the page's load (M-REC's `PAGE_LOAD`), which every frame's `id` carries
 * @property {number} seq the number the burst's first frame takes in its `id`, each frame after it the next
 */

/** the lead every frame `id` of the page's opens with: never the prefix the shell's resends take, `shell:` */
const ID_LEAD = 'page:';

/**
 * The `id` of the page's `n`-th frame (wire.md §Correlation and idempotency):
 * the page's load and a counter behind a lead of the page's own, so it is
 * unique across the page's loads and never opens `shell:`, whatever the load
 * is — the name a held line's `landed` entry and an anchor's piece know the
 * frame by.
 * @param {string} load the page's load
 * @param {number} n
 * @returns {string}
 */
export const frameId = (load, n) => `${ID_LEAD}${load}.${n}`;

/** a burst that composes to no frame */
class Wait extends Error {
  /** @param {Waits} why */
  constructor(why) { super(why); this.why = why; }
}

/** a content V-position as the wire spells it */
const vpos = (/** @type {number} */ ordinal) => /** @type {VPos} */ ({ ordinal: String(ordinal), subspace: '1' });

/** an image's runs over a span of its text, cut to it, in the text's order; null where the image leaves a position of it unnamed */
function over(/** @type {ImageRun[]} */ image, /** @type {number} */ pos, /** @type {number} */ width) {
  const end = pos + width;
  /** @type {ImageRun[]} */
  const out = [];
  let at = pos;
  for (const r of image) {
    if (r.pos + r.width <= at) continue;
    if (r.pos > at || at >= end) break;
    const hi = Math.min(end, r.pos + r.width);
    out.push({ pos: at, width: hi - at, prefix: r.prefix, ordinal: r.ordinal + (at - r.pos) });
    at = hi;
  }
  return at >= end ? out : null;
}

/** runs of an image joined where each continues the one before it in the text and in the I-space it names */
function joined(/** @type {ImageRun[]} */ runs) {
  /** @type {ImageRun[]} */
  const out = [];
  for (const r of runs) {
    const last = out[out.length - 1];
    if (last && last.prefix === r.prefix && last.pos + last.width === r.pos && last.ordinal + last.width === r.ordinal) last.width += r.width;
    else out.push({ ...r });
  }
  return out;
}

/**
 * A span of a text by the board's identity: its image's runs, joined; a
 * `Wait` where the image names not every byte of it, or names one in the
 * page's own space.
 * @param {Doc} d
 * @param {number} pos
 * @param {number} width
 * @returns {ImageRun[]}
 */
function minted(d, pos, width) {
  const runs = over(d.image, pos, width);
  if (!runs) throw new Wait('unread');
  if (runs.some((r) => isPage(r.prefix))) throw new Wait('unminted');
  return joined(runs);
}

/**
 * The unit at a position of a text as an anchor names it: its I-address;
 * null at the document's edge — before its first position, or past its last.
 * A `Wait` where the page made it and the board has not minted it, or the
 * record does not name it.
 * @param {Doc} d
 * @param {number} pos
 * @returns {string | null}
 */
function unit(d, pos) {
  if (pos < 1 || (d.extent != null && pos > d.extent)) return null;
  const [r] = minted(d, pos, 1);
  return `${r.prefix}.${r.ordinal}`;
}

/**
 * @typedef {Object} Place — one place the text before a burst and the text after it differ at, between two bytes both hold
 * @property {number} lost the first position, in the text before, of the bytes the place lost
 * @property {number} lostWidth how many it lost; 0 where it lost none
 * @property {number} at where what the place gained begins, in the text after
 * @property {number} gained how many bytes it gained; 0 where it gained none
 */

/**
 * The places two texts differ at (see the head), in the text's order: the
 * text after read byte by byte against the text before, by where each byte
 * came from (M-DERIVE's `Derivation.source`) — a byte both hold, in the
 * order the text before holds it, is kept; every stretch between two kept
 * bytes, or at an edge, that lost or gained a byte is a place.
 * @param {Doc} before
 * @param {Doc} after
 * @returns {Place[]}
 */
function places(before, after) {
  const was = before.derived && before.derived.source ? before.derived.source : [], is = after.derived && after.derived.source ? after.derived.source : [];
  const from = before.from >= 0 ? before.from : 1, to = before.from >= 0 ? before.to : 1;
  const end = after.from >= 0 ? after.to : 1;
  /** @type {Place[]} */
  const out = [];
  /** the next position of the text before not yet passed, and the next of the text after not yet placed */
  let q = from, p = after.from >= 0 ? after.from : 1;
  /** a place closed: the text before lost [q, a) and the text after gained [p, b) */
  const close = (/** @type {number} */ a, /** @type {number} */ b) => { if (a > q || b > p) out.push({ lost: q, lostWidth: a - q, at: p, gained: b - p }); };
  for (const s of is) {
    const lo = Math.max(s.pos, after.from >= 0 ? after.from : 1), hi = Math.min(s.pos + s.width, end);
    if (lo >= hi) continue;
    // each stretch of the run the text before holds too, in the run's own order
    const held = was.filter((w) => w.prefix === s.prefix && w.ordinal < s.ordinal + (hi - s.pos) && s.ordinal + (lo - s.pos) < w.ordinal + w.width)
      .map((w) => { const o0 = Math.max(w.ordinal, s.ordinal + (lo - s.pos)), o1 = Math.min(w.ordinal + w.width, s.ordinal + (hi - s.pos)); return { was: w.pos + (o0 - w.ordinal), is: s.pos + (o0 - s.ordinal), width: o1 - o0 }; })
      .sort((x, y) => x.is - y.is);
    for (const k of held) {
      // only what the text before holds at or past what is passed, and inside the text held, is kept: a byte moved back is lost there and gained here
      const cut = Math.max(0, q - k.was, from - k.was), width = Math.min(k.width, to - k.was) - cut;
      if (width < 1 || k.was + cut < q) continue;
      close(k.was + cut, k.is + cut);
      q = k.was + cut + width; p = k.is + cut + width;
    }
  }
  close(to, end);
  return out;
}

/**
 * The frames that make the board's text the text a burst's edits make (see
 * the head), each with its anchors, in the order they are to be sent; no
 * frame where the burst changes nothing; or why the burst composes to none
 * (`Waits`).
 * @param {Asked} a
 * @returns {{frames: Composed[]} | {waits: Waits}}
 */
export function compose(a) {
  const { doc, edits, asOf, ids } = a, addr = doc.addr;
  const b = applyEdits(doc, edits.slice(0, a.from), ids), c = applyEdits(doc, edits, ids);
  if (b.stopped || c.stopped) return { waits: 'unread' };
  const before = b.doc, after = c.doc;
  /** @type {Composed[]} */
  const frames = [];
  let n = a.seq;
  const id = () => frameId(a.load, n++);
  try {
    for (const pl of places(before, after)) {
      const left = unit(before, pl.lost - 1), right = unit(before, pl.lost + pl.lostWidth);
      if (pl.lostWidth > 0) {
        const span = minted(before, pl.lost, pl.lostWidth).map((r) => ({ start: `${r.prefix}.${r.ordinal}`, width: String(r.width) }));
        frames.push({ frame: { op: 'delete', doc: addr, p: vpos(pl.at), width: String(pl.lostWidth), as_of: asOf, id: id() }, anchors: { before: left, after: right, span }, pages: [] });
      }
      if (pl.gained < 1) continue;
      // what the place gained, cut where its bytes pass between the page's own and the board's
      const named = over(after.image, pl.at, pl.gained);
      if (!named) throw new Wait('unread');
      /** @type {Array<{made: boolean, at: number, runs: ImageRun[]}>} */
      const chunks = [];
      for (const r of named) {
        const made = isPage(r.prefix), last = chunks[chunks.length - 1];
        if (last && last.made === made) last.runs.push(r); else chunks.push({ made, at: r.pos, runs: [r] });
      }
      const widthOf = (/** @type {{runs: ImageRun[]}} */ ch) => ch.runs.reduce((w, r) => w + r.width, 0);
      const iAt = (/** @type {ImageRun} */ r, /** @type {number} */ off) => `${r.prefix}.${r.ordinal + off}`;
      // the stretches the board holds first, in the text's order, each after the one before it; then the page's own between them
      let placed = 0;
      /** @type {string | null} */
      let prev = left;
      for (const ch of chunks) {
        if (ch.made) continue;
        const runs = joined(ch.runs), end = runs[runs.length - 1];
        frames.push({
          frame: { op: 'reinstate', doc: addr, at: vpos(pl.at + placed), runs: runs.map((r) => ({ i_start: iAt(r, 0), origin: documentOf(r.prefix) || r.prefix, width: String(r.width) })), as_of: asOf, id: id() },
          anchors: { before: prev, after: right }, pages: [],
        });
        placed += widthOf(ch); prev = iAt(end, end.width - 1);
      }
      for (const [i, ch] of chunks.entries()) {
        if (!ch.made) continue;
        const text = textOf(after.runs, ch.at, ch.at + widthOf(ch)), was = chunks[i - 1], next = chunks[i + 1];
        const tail = was ? was.runs[was.runs.length - 1] : null;
        frames.push({
          frame: { op: 'insert', doc: addr, at: vpos(ch.at), values: [text], as_of: asOf, id: id() },
          anchors: { before: tail ? iAt(tail, tail.width - 1) : left, after: next ? iAt(next.runs[0], 0) : right },
          pages: joined(ch.runs).map((r) => ({ page: r.ordinal, width: r.width })),
        });
      }
    }
  } catch (e) { if (e instanceof Wait) return { waits: e.why }; throw e; }
  return { frames };
}
