// T-SPAN — the selection's arithmetic over a block (the structure record
// §3.2 "T-LAYER"'s span half; foundations §2.4: a drag at reading scale
// SELECTS the text it crosses, R11's one continuous gesture; §3.1: the
// selection IS the span). Layer 2. PURE: no DOM, no state.
// A span is a byte range of one document, `{addr, pos, width}` in
// V-positions — one byte each (wire.md §Value encodings) — never a character
// range: the platform's selection speaks in characters of a block's text,
// and these functions carry a character boundary to its byte position and
// back through the block's own byte-offset table, so a multi-byte character
// never shifts a position. The chrome inside a block's element — the
// sameness hairline's label, C-33's mark, a link's symbol, the signs in its
// column's edge — is never a byte of the document; the one selector here names it
// for the layer's walk and the copy. K-8's extension (D5 §1.1: the first
// press selects the focused span, each further one extends by a span) is
// arithmetic over the document's blocks.
// Rules: FP-1, FP-2, FP-7 (the selection is view state), FP-8.

import { byteOffsets } from '../util.js';

/** @typedef {import('../model/records.js').Block} Block */

/**
 * @typedef {Object} Span — a byte range of one document: the selection's grain (R11)
 * @property {string} addr the document
 * @property {number} pos the first V-position
 * @property {number} width positions (bytes)
 */

/** the chrome inside a block's element, never the document's bytes: the hairline label, C-33's mark, the symbols, the signs in its column's edge — the others' count, a withheld run's mark */
export const CHROME = '.hairline, .pubmark, .sym, .edge';

/**
 * The byte position of a character boundary of a block's text: the block's
 * first position plus the byte offset where character `charIndex` begins
 * (the text's end one past its last character; the index clamped to the text).
 * @param {Block} block
 * @param {number} charIndex
 * @returns {number}
 */
export function posOfChar(block, charIndex) {
  const offs = byteOffsets(block.text);
  const i = Math.max(0, Math.min(block.text.length, charIndex));
  return block.pos + offs[i];
}

/**
 * The character boundary of a block's text at a byte position: the index of
 * the first character whose first byte lies at or past the position, so a
 * position inside a character resolves past that character, as `sliceBytes`
 * cuts; a position past the text's end answers its end.
 * @param {Block} block
 * @param {number} pos
 * @returns {number}
 */
export function charOfPos(block, pos) {
  const offs = byteOffsets(block.text);
  const delta = pos - block.pos;
  let i = 0;
  while (i < block.text.length && offs[i] < delta) i++;
  return i;
}

/**
 * The whole of a block as a span.
 * @param {string} addr
 * @param {Block} block
 * @returns {Span}
 */
export const spanOfBlock = (addr, block) => ({ addr, pos: block.pos, width: Math.max(1, block.width) });

/** do two spans name the same bytes of the same document? */
export const sameSpan = (/** @type {Span | null | undefined} */ a, /** @type {Span | null | undefined} */ b) =>
  !!a && !!b && a.addr === b.addr && a.pos === b.pos && a.width === b.width;

/** does a block hold any position of a span? */
export const touches = (/** @type {{pos: number, width: number}} */ block, /** @type {{pos: number, width: number}} */ span) =>
  span.pos < block.pos + block.width && block.pos < span.pos + span.width;

/**
 * K-8's extension: the span widened by one block in the direction pressed —
 * downward to the end of the block holding its end where the end lies inside
 * one, else to the end of the next block; upward to the start of the block
 * holding its start, else to the start of the previous block. The span
 * itself where no block lies that way.
 * @param {Block[]} blocks the document's blocks in position order
 * @param {Span} span
 * @param {'down' | 'up'} dir
 * @returns {Span}
 */
export function extended(blocks, span, dir) {
  const end = span.pos + span.width;
  if (dir === 'down') {
    const inside = blocks.find((b) => b.pos < end && end < b.pos + b.width);
    const next = inside || blocks.find((b) => b.pos >= end);
    return next ? { addr: span.addr, pos: span.pos, width: next.pos + next.width - span.pos } : span;
  }
  const inside = blocks.find((b) => b.pos < span.pos && span.pos < b.pos + b.width);
  /** @type {Block | null} */
  let prev = null;
  if (!inside) for (const b of blocks) if (b.pos + b.width <= span.pos) prev = b;
  const to = inside || prev;
  return to ? { addr: span.addr, pos: to.pos, width: end - to.pos } : span;
}
