// P-LAY — the article's lines in world units (the structure record §3.2
// "P-LAY"). Layer 2, pure. The bars the canvas draws for a document below
// reading scale stand where its article's glyphs stand once T-LAYER mounts
// it, so the handoff swaps bars for text and no line moves (law 8;
// foundations §2.4: "no character positions disagree", S1 Q7). The bars are
// a layout of the article's own lines, never a guess at them: T-ARTICLE's
// plan of the article — the head's lines, then each block's text at its size
// with the inline pieces it carries — is wrapped here the way the article's
// CSS wraps it: a column of exactly `cpl` characters of the article's
// monospace face (T-LAYER sets it in `ch`); a unit placed on a line where its
// characters fit, the space after it hanging past the column; a line broken
// at a space, after a hyphen, a dash, an ellipsis or a question mark inside a
// word (never before closing or infix punctuation), and on either side of an
// inline-block, which is set whole; every line box its block's line height at
// the block's own size (`lineBox`: the article's one unitless line height,
// `LINE_H`, which each element applies to its own em — the article's chrome is
// held inside it); the margins around each block at the block's own size, a
// heading's nearer the block below it than the block above, adjoining margins
// collapsing to the larger; a float at a block's end beside its last line
// where it fits, else on a line of its own, as tall as its own line box.
// The measurements the article and this layout share are declared once here —
// `MEASURE` and `BORDER` set as custom properties at boot (`cssMeasures`),
// `LAY_FS` and `LINE_H` set on the article by T-LAYER — so neither side can
// drift from the other. A withheld run is bars of its true width (F2.1-i);
// its face at reading scale stands taller, and which of the two its place
// keeps is the design's open question.
// Characters outside the monospace face (an ideograph, a fallback symbol)
// are counted as one character each; the face sets them wider.
// Carries: the wireframe's §9 (`metricsFor`, `layoutOf`, the monospace
// metrics), its input re-cut from the paragraphs to the article's plan.
// Rules: FP-1, FP-2, FP-8, FP-10 (no state).

import { DOC_W, DOC_H } from './projection.js';

/**
 * @typedef {Object} Metrics
 * @property {number} fs the body's em in world units
 * @property {number} cpl the article's column, in characters of its face
 * @property {number} lineH the body's line box in world units
 * @property {number} tw the width the column is fitted to (world units)
 * @property {number} x0 the column's left edge, relative to the box
 * @property {number} y0 the article's first line's top, relative to the box
 * @property {number} y1 the article's clip, relative to the box: the box's bottom
 */

/**
 * @typedef {Object} Piece — a stretch of a row's inline content in one style
 * @property {string} text the characters it sets (white space collapses as the CSS collapses it)
 * @property {number} size its font size in the body's em
 * @property {number} lead the room before its first character, in the body's em: a margin, a padding, a border
 * @property {number} trail the room after its last character, in the body's em
 * @property {boolean} box an inline-block: one unbreakable unit, a line free to break on either side of it
 */

/**
 * @typedef {Object} Row — a block box of the article, holding lines of inline content
 * @property {'head' | 'text' | 'withheld' | 'chrome'} kind the head's lines; a block of the document (its text, a record's words, a reference, an item not rendered); a withheld run; the page's chrome after the blocks
 * @property {number | null} pos the first position of the block the row opens; null on a row that opens none
 * @property {number} size the size its box is set at, in the body's em: each of its lines is that size's line box (`lineBox`)
 * @property {Piece[]} pieces
 * @property {Piece | null} float a float at the row's end, on its right (the others' count)
 * @property {number} before the margin above it, in the body's em
 * @property {number} after the margin below it, in the body's em
 * @property {number} width a withheld run's positions (its bars); 0 on every other row
 */

/**
 * @typedef {Object} Line — one line box of the article
 * @property {number} top its top, in the body's em below the article's first line's top
 * @property {number} h its height, in the body's em: its row's line box, or a float's own where the float stands on a line of its own
 * @property {number} w the width its content takes, in characters of the body's face
 * @property {number} size the largest font size on it, in the body's em
 * @property {Row['kind']} kind the kind of the row it belongs to
 * @property {number | null} pos the block it belongs to, by its first position; null in the head and the chrome
 */

/**
 * @typedef {Object} Layout
 * @property {Line[]} lines in order, top to bottom
 * @property {Map<number, {first: number, n: number}>} blocks each block's first line and its count of lines, by its first position
 */

/**
 * @typedef {Object} Bar — a bar the canvas draws where a line's glyphs stand, in world units relative to the box
 * @property {number} x
 * @property {number} y
 * @property {number} w
 * @property {number} h
 * @property {boolean} withheld
 */

/** the characters per em of the monospace face the layout assumes */
export const CHAR_W = 0.6;
/** the size the article is laid out at, in px (S1): T-LAYER's layout, where a border's px stands against the em */
export const LAY_FS = 16;
/**
 * The article's line height, a ratio of each element's own size: 1.35, cut
 * so that the body's line box at LAY_FS stands on the 1/64 px grid the
 * engines lay out on. T-LAYER sets it unitless on the article, so every
 * element spaces its lines in proportion to its own size (`lineBox`), and
 * the body's lines and the bars' keep one pitch however many lines down a
 * block stands.
 */
export const LINE_H = Math.round(1.35 * LAY_FS * 64) / 64 / LAY_FS;

/** the layout unit the engines place boxes on, in px: 1/64 */
const GRID = 64;

/**
 * The height of a line box whose strut is set at `size`, in the body's em:
 * `LINE_H` of that size, as the engine lays it out at LAY_FS — the font size
 * taken onto the 1/64 px grid, rounded, then the line height on it, floored.
 * The rule is Chrome's, measured on the gate's machine (Chrome 155: 0.8 em a
 * line box of 17.265625 px, 0.72 em 15.53125, 1.25 em 26.984375, 1.1 em
 * 23.734375); the layout case holds it to the line boxes the mounted article
 * stands on, and the shipping engine's are the owner's to look at (FP-19).
 * `lineBox(1)` is `LINE_H`.
 * @param {number} size
 * @returns {number}
 */
export function lineBox(size) {
  const font = Math.round(size * LAY_FS * GRID) / GRID;
  return Math.floor(font * LINE_H * GRID + 1e-7) / GRID / LAY_FS;
}

/**
 * The article's sizes and the room its chrome takes, each in the em of the
 * element it sizes — the values the CSS reads as custom properties.
 */
export const MEASURE = Object.freeze({
  /** the gap after each block */
  gap: 0.55,
  /** a heading's margins: the room above it and the room below it, so it stands nearer the block it heads */
  headingBefore: 1, headingAfter: 0.25,
  /** the head's state line, byline and presence line */
  head: 0.8,
  /** a heading: `#` is set as h2, `##` as h3; deeper ones at the body's size */
  h2: 1.25, h3: 1.1,
  /** a record's keys */
  derived: 0.85,
  /** the scene-offer and the gap on either side of it */
  offer: 0.8, offerGap: 0.6,
  /** the sameness hairline's label and the room after it */
  label: 0.7, labelGap: 0.3,
  /** C-33's mark: its size, its padding on either side, the room after it */
  mark: 0.72, markPad: 0.3, markGap: 0.3,
  /** a link's symbol: its size, its padding on either side, the room before it */
  sym: 0.75, symPad: 0.3, symGap: 0.3,
  /** the others' count and the room before it */
  count: 0.72, countGap: 0.5,
  /** the sameness boundary's padding */
  samePad: 0.25,
});

/** the borders, in px at LAY_FS: a mark's and a symbol's box, the sameness boundary */
export const BORDER = Object.freeze({ box: 1, same: 2 });

/** the size a markdown heading of a level is set at, in the body's em */
export const headingSize = (/** @type {number} */ level) => (level === 1 ? MEASURE.h2 : level === 2 ? MEASURE.h3 : 1);

/** a border's width in the body's em */
export const borderEm = (/** @type {number} */ px) => px / LAY_FS;

/**
 * The custom properties the article's CSS reads, one per shared value.
 * @returns {Record<string, string>}
 */
export function cssMeasures() {
  const em = (/** @type {number} */ v) => v + 'em', px = (/** @type {number} */ v) => v + 'px';
  const M = MEASURE;
  return {
    '--gap': em(M.gap), '--heading-before': em(M.headingBefore), '--heading-after': em(M.headingAfter),
    '--head': em(M.head), '--h2': em(M.h2), '--h3': em(M.h3), '--derived': em(M.derived),
    '--offer': em(M.offer), '--offer-gap': em(M.offerGap), '--label': em(M.label), '--label-gap': em(M.labelGap),
    '--mark': em(M.mark), '--mark-pad': em(M.markPad), '--mark-gap': em(M.markGap),
    '--sym': em(M.sym), '--sym-pad': em(M.symPad), '--sym-gap': em(M.symGap),
    '--count': em(M.count), '--count-gap': em(M.countGap), '--same-pad': em(M.samePad),
    '--border-box': px(BORDER.box), '--border-same': px(BORDER.same),
  };
}

/**
 * The document's own extent holds its own text (S3): the em from the
 * positions it holds, with a floor on characters per line so a short
 * document is not set in a giant face. The article starts at its box's top
 * padding and is clipped at its box's bottom.
 * @param {number} positions the content extent (bytes ≈ characters)
 * @param {{w:number, h:number}} box
 * @returns {Metrics}
 */
export function metricsFor(positions, box) {
  const chars = Math.max(1, positions);
  const tw = box.w * 0.88, th = box.h * 0.9;
  const fs = Math.min(Math.sqrt((th * tw) / (0.81 * chars)), tw / (CHAR_W * 52));
  const cpl = Math.max(8, Math.floor(tw / (CHAR_W * fs)));
  return { fs, cpl, lineH: fs * LINE_H, tw, x0: (box.w - tw) / 2, y0: box.h * (0.05 / 0.86), y1: box.h };
}

/** collapsible white space (CSS Text §4.1): the space, the tab, a segment break */
const isSpace = (/** @type {number} */ c) => c === 32 || c === 9 || c === 10 || c === 13;
const codes = (/** @type {string} */ s) => new Set([...s].map((c) => /** @type {number} */ (c.codePointAt(0))));
const HY = 0x2d, EN = 0x2013, EM = 0x2014, ELLIPSIS = 0x2026, QUESTION = 0x3f;
/** the characters a line may not start with after a hyphen-minus, an en dash or ellipsis, an em dash, a question mark */
const AFTER_HY = codes('–…?!.,:;)]}/“”‘’$'), AFTER_EN = codes('-–…?!.,:;)]}/|"\'“”‘’'), AFTER_EM = codes('-–—…?!.,:;)]}/|"\'“”‘’'), AFTER_Q = codes('–…?!.,:;)]}/\'“”‘’');
/** what may start a line after an en dash that begins a word */
const AFTER_EN_INITIAL = codes('0123456789—([{\\%+$');
/** an em dash may start a line after anything but these */
const BEFORE_EM = codes('—([{"\'“”‘’');
/** an opening bracket may start a line after closing or infix punctuation */
const OPENERS = codes('([{<'), CLOSERS = codes('-–—…?!.,:;)]}\\|*#&%+=>~"');
/** a symbol outside ASCII (an arrow, a middle dot, a check) may start a line after these */
const BEFORE_SYMBOL = codes('!}|/');
const isDigit = (/** @type {number} */ c) => c >= 0x30 && c <= 0x39;
const isSymbol = (/** @type {number} */ c) => c >= 0x80 && c !== 0x24 && !/[\p{L}\p{N}“”‘’«»]/u.test(String.fromCodePoint(c));

/**
 * May a line break between two characters with no space between them? The
 * engine's own pairs — Chrome's line breaker, read character pair by pair on
 * the gate's machine — reduced to the classes a document's text meets: after
 * a hyphen, a dash, an ellipsis or a question mark, before what may start a
 * line (a hyphen or an en dash that begins a word keeps a digit, and an en
 * dash a letter, with it); before an em dash; before an opening bracket after
 * closing or infix punctuation. Nowhere else: never after a slash, a bar, an
 * underscore, a period or a closing bracket before a letter. The shipping
 * engine's pairs are the owner's to look at (FP-19).
 * @param {number} a the character before the break
 * @param {number} b the character after it
 * @param {boolean} initial `a` begins a word (a space, the row's start or an inline-block before it)
 */
export function breakBetween(a, b, initial) {
  if (a === HY) return initial ? !AFTER_HY.has(b) && !isDigit(b) && b < 0x80 : !AFTER_HY.has(b);
  if (a === EN) return initial ? AFTER_EN_INITIAL.has(b) : !AFTER_EN.has(b);
  if (a === EM) return !AFTER_EM.has(b);
  if (a === ELLIPSIS) return !AFTER_EN.has(b);
  if (a === QUESTION) return !AFTER_Q.has(b);
  if (b === EM) return !BEFORE_EM.has(a);
  if (OPENERS.has(b)) return CLOSERS.has(a);
  return BEFORE_SYMBOL.has(a) && isSymbol(b);
}

/**
 * A row's lines: its pieces wrapped in a column of `cpl` characters, every
 * width in characters of the body's face; each line as tall as the row's line
 * box, a float on a line of its own as tall as its own.
 * @param {Row} row
 * @param {number} cpl
 * @returns {Array<{w: number, size: number, h: number}>}
 */
export function wrap(row, cpl) {
  const cap = cpl + 1e-6;
  const lh = lineBox(row.size);
  /** @type {Array<{w: number, size: number, h: number}>} */
  const out = [];
  // the line being filled: the width of its content, its largest size, whether it holds a unit
  let used = 0, size = 0, has = false;
  // the unit being gathered — no break inside it — and the collapsed space before it, counted only beside a unit on its line
  let unitW = 0, unitSize = 0, unit = false, hang = 0;
  // the last two characters gathered: a space is 32, the row's start -1, an inline-block -2
  let prev = -1, before = -1;
  const place = () => {
    if (!unit) return;
    if (has && used + hang + unitW > cap) { out.push({ w: used, size, h: lh }); used = unitW; size = unitSize; }
    else { used += hang + unitW; size = Math.max(size, unitSize); has = true; }
    unitW = 0; unitSize = 0; unit = false; hang = 0;
  };
  for (const p of row.pieces) {
    if (p.box) {
      place();
      unitW = (p.lead + p.trail) / CHAR_W + [...p.text].length * p.size; unitSize = p.size; unit = true;
      place();
      prev = before = -2;
      continue;
    }
    if (p.lead) { unitW += p.lead / CHAR_W; unit = true; }
    for (const ch of p.text) {
      const c = /** @type {number} */ (ch.codePointAt(0));
      if (isSpace(c)) {
        if (prev === 32 || (!has && !unit)) continue; // collapsed into the space before it, or leading the row
        place();
        hang = p.size; prev = before = 32;
        continue;
      }
      if (prev > 0 && prev !== 32 && breakBetween(prev, c, before < 0 || before === 32)) place();
      unitW += p.size; unitSize = Math.max(unitSize, p.size); unit = true; before = prev; prev = c;
    }
    if (p.trail) { unitW += p.trail / CHAR_W; unit = true; }
  }
  place();
  if (has) out.push({ w: used, size, h: lh });
  if (row.float) {
    const fw = (row.float.lead + row.float.trail) / CHAR_W + [...row.float.text].length * row.float.size;
    if (!has || used + hang + fw > cap) out.push({ w: 0, size: row.float.size, h: lineBox(row.float.size) });
  }
  return out;
}

/**
 * The article's lines: its rows wrapped and stacked from its first line's
 * top, each line box as tall as `wrap` gives it, the margins between rows
 * collapsing to the larger; a withheld run's rows its bars, one line per
 * `cpl` positions.
 * @param {Row[]} rows the article's plan (T-ARTICLE's `articlePlan`)
 * @param {Metrics} m
 * @returns {Layout}
 */
export function layoutOf(rows, m) {
  /** @type {Line[]} */
  const lines = [];
  /** @type {Map<number, {first: number, n: number}>} */
  const blocks = new Map();
  // the margin pending above the next row: the rows' adjoining margins collapse to the larger (an empty row's with them)
  let y = 0, margin = 0;
  /** @type {number | null} */
  let pos = null;
  for (const r of rows) {
    if (r.pos != null) { pos = r.pos; blocks.set(pos, { first: lines.length, n: 0 }); }
    else if (r.kind === 'head' || r.kind === 'chrome') pos = null;
    const set = r.kind === 'withheld'
      ? Array.from({ length: Math.max(1, Math.ceil(r.width / m.cpl)) }, (_, i) => ({ w: Math.max(1, Math.min(m.cpl, r.width - i * m.cpl)), size: r.size, h: lineBox(r.size) }))
      : wrap(r, m.cpl);
    margin = Math.max(margin, r.before);
    if (!set.length) { margin = Math.max(margin, r.after); continue; }
    y += margin;
    for (const l of set) { lines.push({ top: y, h: l.h, w: l.w, size: l.size, kind: r.kind, pos }); y += l.h; }
    const b = pos != null ? blocks.get(pos) : undefined;
    if (b) b.n += set.length;
    margin = r.after;
  }
  return { lines, blocks };
}

/**
 * The bars the canvas draws for a layout: one per line of the document's
 * blocks (the head and the chrome are not the document's lines), across the
 * width its content takes, at the height its glyphs stand inside its line
 * box; none past the article's clip, and the last one cut at it.
 * @param {Layout} L
 * @param {Metrics} m
 * @returns {Bar[]}
 */
export function bars(L, m) {
  /** @type {Bar[]} */
  const out = [];
  for (const l of L.lines) {
    if (l.kind === 'head' || l.kind === 'chrome' || l.w <= 0) continue;
    const y = m.y0 + (l.top + l.h / 2 - 0.2 * l.size) * m.fs;
    if (y >= m.y1) break;
    const h = Math.min(0.5 * l.size * m.fs, m.y1 - y);
    out.push({ x: m.x0, y, w: l.w * CHAR_W * m.fs, h, withheld: l.kind === 'withheld' });
  }
  return out;
}

/** the box fractions the layout shares with the text layer */
export const BOX = { DOC_W, DOC_H };
