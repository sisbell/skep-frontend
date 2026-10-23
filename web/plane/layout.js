// P-LAY — the article's lines and the columns they fold into, in world units
// (the structure record §3.2 "P-LAY"). Layer 2, pure. The bars the canvas
// draws for a document below reading scale stand where its article's glyphs
// stand once T-LAYER mounts it, so the handoff swaps bars for text and no line
// moves (law 8; foundations §2.4: "no character positions disagree", S1 Q7).
// The bars are a layout of the article's own lines, never a guess at them:
// T-ARTICLE's plan of the article — the head's lines, then each block's text
// at its size with the inline pieces it carries — is wrapped here the way the
// article's CSS wraps it: a column of exactly MEASURE_CPL characters of the
// article's monospace face (the style sets it in `ch`, `--measure`); a unit
// placed on a line where its characters fit, the space after it hanging past
// the column; a line broken at a space, after a hyphen, a dash, an ellipsis or
// a question mark inside a word (never before closing or infix punctuation),
// and on either side of an inline-block, which is set whole; every line box
// its block's line height at the block's own size (`lineBox`: the article's
// one unitless line height, `LINE_H`, which each element applies to its own em
// — the article's chrome is held inside it); the margins around each block at
// the block's own size, a heading's nearer the block below it than the block
// above, adjoining margins collapsing to the larger; a float at a block's end
// beside its last line where it fits, else on a line of its own, as tall as
// its own line box. Each line carries where a column may break before it, by
// its row's keep (`Row.keep`), and where in the document's bytes it starts.
// THE FOLD (issue #15's design decision): every document is set at one line
// length, MEASURE_CPL characters, and one line height, in equal columns of
// COLUMN_LINES body line boxes (`columnsOf`) — a column filled to its depth
// from its first line's top, the margin above a column's head dropped; a
// heading kept with the first two lines after it; no paragraph line alone at a
// column's head or foot (a paragraph of three lines or fewer moves whole); the
// head, a record, a withheld face, a reference, an item not rendered and the
// chrome never split; a kept unit deeper than a column broken at a line
// anyway, so no text is dropped. The columns stand inside the document's room
// (P-PROJ's box) left to right, then row by row, a GUTTER apart (`fold`); a
// document shorter than one column is one column of its own length. Each
// column is padded by half a gutter, so neighbouring padded columns meet and
// their union has one edge, the document's (`outline`). THE STEPS: every
// document is set at its room's standard size (`standardFs`, the largest em at
// which the room holds STANDARD_GRID columns) until its columns fill the room;
// only then is the whole document set smaller, at the first step that holds
// its columns, each step at least doubling the room's capacity (`stepAt`), so
// a growing draft re-sets rarely. Length reads as a count of columns.
// Positions map to places and back (`placeOf`, `posAt`), a view reads as the
// positions it shows and the ends it has run past (`windowIn`), the paging key
// continues at the next column's top (`pageTarget`), and a document re-set in
// view hands the place its passage stands at now to the camera (`holdOf`).
// A document whose text has not arrived is its estimated columns, every line
// full (`estimate`): never more columns than its text sets, so its size is
// never smaller than the one its text is set at; one whose extent is unread is
// its first column slot (`slot`).
// The measurements the article and this layout share are declared once here —
// `MEASURE`, `BORDER` and the fold's measure and gutter set as custom
// properties at boot (`cssMeasures`), `LAY_FS` and `LINE_H` set on the article
// by T-LAYER — so neither side can drift from the other. A withheld run is
// bars of its true width (F2.1-i); its face at reading scale stands taller,
// and the column holds the face as T-LAYER measures it.
// Characters outside the monospace face (an ideograph, a fallback symbol)
// are counted as one character each; the face sets them wider, and T-LAYER's
// measure of the lines as rendered takes the place of these where they part.
// Carries: the wireframe's §9 (`layoutOf`, the monospace metrics), its input
// re-cut from the paragraphs to the article's plan.
// Rules: FP-1, FP-2, FP-8, FP-10 (no state but a cache of a pure function).

import { DOC_W, DOC_H } from './projection.js';
import { byteLength } from '../util.js';

/**
 * @typedef {Object} Piece — a stretch of a row's inline content in one style
 * @property {string} text the characters it sets (white space collapses as the CSS collapses it)
 * @property {number} size its font size in the body's em
 * @property {number} lead the room before its first character, in the body's em: a margin, a padding, a border
 * @property {number} trail the room after its last character, in the body's em
 * @property {boolean} box an inline-block: one unbreakable unit, a line free to break on either side of it
 * @property {boolean} own its characters are the document's own, its row's block's text in order; chrome (a hairline's label, C-33's mark, a symbol, a count) is not
 */

/**
 * @typedef {'lines' | 'whole' | 'heading' | 'joined'} Keep how a column may break at a row:
 * 'lines' — between its lines, two at least on either side (a paragraph; its own float never parted from its last line);
 * 'whole' — never among its lines;
 * 'heading' — never among its lines, nor before the first two lines after it;
 * 'joined' — never among its lines, nor between it and the row before it (a record's keys, the head's lines after its first)
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
 * @property {Keep} keep where a column may break at it
 */

/**
 * @typedef {Object} Line — one line box of the article
 * @property {number} top its top, in the body's em below the article's first line's top
 * @property {number} h its height, in the body's em: its row's line box, or a float's own where the float stands on a line of its own
 * @property {number} w the width its content takes, in characters of the body's face
 * @property {number} size the largest font size on it, in the body's em
 * @property {Row['kind']} kind the kind of the row it belongs to
 * @property {number | null} pos the block it belongs to, by its first position; null in the head and the chrome
 * @property {number} nth its index among its block's lines (the head's and the chrome's among their row's)
 * @property {boolean} brk a column may break before it (`Row.keep`)
 * @property {number | null} at the document's position its first own character stands at — a record's and a withheld run's lines their block's, a withheld run's bars each a line of its positions on — null in the head and the chrome
 * @property {number} [gap] the positions before its block the article does not hold (T-LAYER marks them): a column breaks before it, those positions estimated in columns of their own
 */

/**
 * @typedef {Object} Layout
 * @property {Line[]} lines in order, top to bottom
 * @property {Map<number, {first: number, n: number}>} blocks each block's first line and its count of lines, by its first position
 */

/** @typedef {{w: number, h: number}} Room a document's room: its box (P-PROJ's `docBox`), in world units */
/** @typedef {{x: number, y: number, w: number, h: number}} Rect a rect in world units, relative to the room's top-left */

/**
 * @typedef {Object} Column — one column of a fold, in world units relative to its room's top-left
 * @property {number} x its text's left edge
 * @property {number} y its text's top
 * @property {number} w its text's width: the measure
 * @property {number} h its depth: COLUMN_LINES line boxes, the last column its own length
 * @property {number} first its first line, an index into the fold's lines
 * @property {number} n its count of lines
 * @property {number} top its first line's top in the article's flow, in the body's em: each of its lines stands `(line.top - top) × fs` below `y`
 * @property {boolean} estimated it holds no line: positions the document does not hold yet, estimated
 */

/**
 * @typedef {Object} Fold — a document folded into its room's columns
 * @property {number} fs the body's em in world units: the size its step sets
 * @property {number} step its step: 0 the standard size
 * @property {number} across columns per row
 * @property {Room} room
 * @property {Line[]} lines the article's lines, in the flow's order
 * @property {Column[]} columns in reading order: left to right, then row by row
 * @property {Unheld[]} unheld the stretches of positions it holds no line for, estimated
 */

/**
 * @typedef {Object} Unheld — a stretch of positions a fold holds no line for, estimated: a body line for each MEASURE_CPL of them, from a column's depth on
 * @property {number} from its first position
 * @property {number} to one past its last; Infinity for the positions after the last line held
 * @property {number} column the column it begins in
 * @property {number} depth the depth below that column's text top it begins at, in world units
 * @property {number} last the last column it stands in
 */

/**
 * @typedef {Object} Step — one of the sizes a room sets documents at
 * @property {number} k 0 the standard size; each step after it at least doubles the capacity
 * @property {number} fs the body's em in world units
 * @property {number} across columns per row at that size
 * @property {number} capacity the columns the room holds at that size
 */

/**
 * @typedef {Object} Bar — a bar the canvas draws where a line's glyphs stand, in world units relative to the room
 * @property {number} x
 * @property {number} y
 * @property {number} w
 * @property {number} h
 * @property {boolean} withheld
 * @property {number} line the line it stands for, an index into the fold's lines: no bar is drawn for a line that stands as text
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

/** THE MEASURE: every document's line, the plane's and a reading scene's pane's alike, in characters of its face (the design's 60–66) */
export const MEASURE_CPL = 66;
/** a column's depth, in the body's line boxes */
export const COLUMN_LINES = 36;
/** the gutter between two columns, in the body's em: each column is padded by half of it */
export const GUTTER = 2;
/** the columns a room holds at the standard size: across, then down */
export const STANDARD_GRID = Object.freeze(/** @type {[number, number]} */ ([3, 4]));
/** a column's text width, in the body's em */
export const COLUMN_W = MEASURE_CPL * CHAR_W;
/** a column's depth, in the body's em */
export const COLUMN_H = COLUMN_LINES * LINE_H;
/** the pitch of the column slots, across and down, in the body's em: a column and a gutter */
const PITCH_W = COLUMN_W + GUTTER, PITCH_H = COLUMN_H + GUTTER;
/** the slack a fit is judged with, in the body's em: a twentieth of a 1/64 px at the layout size */
const EPS = 1e-3 / LAY_FS;

/** the size a markdown heading of a level is set at, in the body's em */
export const headingSize = (/** @type {number} */ level) => (level === 1 ? MEASURE.h2 : level === 2 ? MEASURE.h3 : 1);

/** a border's width in the body's em */
export const borderEm = (/** @type {number} */ px) => px / LAY_FS;

/**
 * The custom properties the article's CSS reads, one per shared value: the
 * fold's measure as a bare count, which the style multiplies by `1ch`.
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
    '--measure': String(MEASURE_CPL), '--gutter': em(GUTTER),
  };
}

// ---- the steps --------------------------------------------------------------------------------------------------

/** the slots a room holds across and down at a size */
function slotsAt(/** @type {Room} */ room, /** @type {number} */ fs) {
  return { across: Math.max(1, Math.floor(room.w / (fs * PITCH_W) + 1e-9)), down: Math.max(1, Math.floor(room.h / (fs * PITCH_H) + 1e-9)) };
}

/**
 * A room's standard size: the largest em, in world units, at which the room
 * holds STANDARD_GRID columns — the size every document is set at until its
 * columns fill the room.
 * @param {Room} room
 * @returns {number}
 */
export function standardFs(room) {
  const [a, d] = STANDARD_GRID;
  return Math.min(room.w / (a * PITCH_W), room.h / (d * PITCH_H));
}

/** the standard size of a depth-0 document's room (P-PROJ's box): the plane's standard type, a place's representative em */
export const STANDARD_FS = standardFs({ w: DOC_W, h: DOC_H });

/** @type {Map<string, Step>} the steps worked out, by room and step: a cache of a pure function */
const steps = new Map();

/**
 * A room's step k: 0 the standard size; each step after it the largest size
 * at which the room holds at least STANDARD_GRID's count times 2^k columns, so
 * each at least doubles the capacity of the one before it.
 * @param {Room} room
 * @param {number} k
 * @returns {Step}
 */
export function stepAt(room, k) {
  const key = `${room.w}x${room.h}:${k}`;
  let s = steps.get(key);
  if (s) return s;
  let fs;
  if (k <= 0) fs = standardFs(room);
  else {
    const need = STANDARD_GRID[0] * STANDARD_GRID[1] * 2 ** k;
    fs = 0;
    // the width's bound falls as the columns across grow: none past the first under the best found improves on it
    for (let a = 1; room.w / (a * PITCH_W) > fs; a++) fs = Math.max(fs, Math.min(room.w / (a * PITCH_W), room.h / (Math.ceil(need / a) * PITCH_H)));
  }
  const at = slotsAt(room, fs);
  s = { k: Math.max(0, k), fs, across: at.across, capacity: at.across * at.down };
  if (steps.size > 4096) steps.clear();
  steps.set(key, s);
  return s;
}

/**
 * The step a document of `n` columns is set at: the first, from `from` on,
 * whose capacity holds them.
 * @param {Room} room
 * @param {number} n
 * @param {number} [from] the smallest step to set it at
 * @returns {Step}
 */
export function stepFor(room, n, from = 0) {
  let k = Math.max(0, from), s = stepAt(room, k);
  while (s.capacity < n) s = stepAt(room, ++k);
  return s;
}

// ---- the lines --------------------------------------------------------------------------------------------------

/** collapsible white space (CSS Text §4.1): the space, the tab, a segment break — a line breaks at it */
export const isSpace = (/** @type {number} */ c) => c === 32 || c === 9 || c === 10 || c === 13;
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
 * @typedef {Object} Wrapped — one line of a row as `wrap` sets it
 * @property {number} w the width its content takes, in characters of the body's face
 * @property {number} size the largest font size on it
 * @property {number} h its line box
 * @property {number} bytes the bytes of the row's own characters before its first unit
 * @property {boolean} float it holds the row's float alone
 */

/**
 * A row's lines: its pieces wrapped in a column of `cpl` characters, every
 * width in characters of the body's face; each line as tall as the row's line
 * box, a float on a line of its own as tall as its own; each line naming the
 * bytes of the row's own characters before its first unit, where in the
 * block's text it starts.
 * @param {Row} row
 * @param {number} cpl
 * @returns {Wrapped[]}
 */
export function wrap(row, cpl) {
  const cap = cpl + 1e-6;
  const lh = lineBox(row.size);
  /** @type {Wrapped[]} */
  const out = [];
  // the line being filled: the width of its content, its largest size, whether it holds a unit, the own bytes before it
  let used = 0, size = 0, has = false, lineBytes = 0;
  // the unit being gathered — no break inside it — the own bytes before it, and the collapsed space before it, counted only beside a unit on its line
  let unitW = 0, unitSize = 0, unit = false, unitBytes = 0, hang = 0;
  // the row's own bytes gathered so far
  let bytes = 0;
  // the last two characters gathered: a space is 32, the row's start -1, an inline-block -2
  let prev = -1, before = -1;
  const begin = () => { if (!unit) { unit = true; unitBytes = bytes; } };
  const place = () => {
    if (!unit) return;
    if (has && used + hang + unitW > cap) { out.push({ w: used, size, h: lh, bytes: lineBytes, float: false }); used = unitW; size = unitSize; lineBytes = unitBytes; }
    else { if (!has) lineBytes = unitBytes; used += hang + unitW; size = Math.max(size, unitSize); has = true; }
    unitW = 0; unitSize = 0; unit = false; hang = 0;
  };
  for (const p of row.pieces) {
    if (p.box) {
      place();
      begin();
      unitW = (p.lead + p.trail) / CHAR_W + [...p.text].length * p.size; unitSize = p.size;
      if (p.own) bytes += byteLength(p.text);
      place();
      prev = before = -2;
      continue;
    }
    if (p.lead) { begin(); unitW += p.lead / CHAR_W; }
    for (const ch of p.text) {
      const c = /** @type {number} */ (ch.codePointAt(0));
      if (isSpace(c)) {
        if (p.own) bytes += 1;
        if (prev === 32 || (!has && !unit)) continue; // collapsed into the space before it, or leading the row
        place();
        hang = p.size; prev = before = 32;
        continue;
      }
      if (prev > 0 && prev !== 32 && breakBetween(prev, c, before < 0 || before === 32)) place();
      begin();
      unitW += p.size; unitSize = Math.max(unitSize, p.size); before = prev; prev = c;
      if (p.own) bytes += byteLength(ch);
    }
    if (p.trail) { begin(); unitW += p.trail / CHAR_W; }
  }
  place();
  if (has) out.push({ w: used, size, h: lh, bytes: lineBytes, float: false });
  if (row.float) {
    const fw = (row.float.lead + row.float.trail) / CHAR_W + [...row.float.text].length * row.float.size;
    if (!has || used + hang + fw > cap) out.push({ w: 0, size: row.float.size, h: lineBox(row.float.size), bytes, float: true });
  }
  return out;
}

/**
 * The article's lines: its rows wrapped at the measure and stacked from its
 * first line's top, each line box as tall as `wrap` gives it, the margins
 * between rows collapsing to the larger; a withheld run's rows its bars, one
 * line per `cpl` positions; each line marked where a column may break before
 * it, by the keep of its row and of the heading before it (`Row.keep`), and
 * where in the document's bytes it starts.
 * @param {Row[]} rows the article's plan (T-ARTICLE's `articlePlan`)
 * @param {number} [cpl] the column, in characters of the body's face
 * @returns {Layout}
 */
export function layoutOf(rows, cpl = MEASURE_CPL) {
  /** @type {Line[]} */
  const lines = [];
  /** @type {Map<number, {first: number, n: number}>} */
  const blocks = new Map();
  // the margin pending above the next row: the rows' adjoining margins collapse to the larger (an empty row's with them)
  let y = 0, margin = 0;
  /** @type {number | null} */
  let pos = null;
  // the lines still owed to the heading before them: no column breaks before them
  let owed = 0;
  for (const r of rows) {
    if (r.pos != null) { pos = r.pos; blocks.set(pos, { first: lines.length, n: 0 }); }
    else if (r.kind === 'head' || r.kind === 'chrome') pos = null;
    /** @type {Wrapped[]} */
    const set = r.kind === 'withheld'
      ? Array.from({ length: Math.max(1, Math.ceil(r.width / cpl)) }, (_, i) => ({ w: Math.max(1, Math.min(cpl, r.width - i * cpl)), size: r.size, h: lineBox(r.size), bytes: i * cpl, float: false }))
      : wrap(r, cpl);
    margin = Math.max(margin, r.before);
    if (!set.length) { margin = Math.max(margin, r.after); continue; }
    y += margin;
    const b = pos != null ? blocks.get(pos) : undefined;
    const nth0 = b ? b.n : 0, text = set.filter((l) => !l.float).length;
    set.forEach((l, i) => {
      let brk = i === 0 ? lines.length > 0 && r.keep !== 'joined' : r.keep === 'lines' && !l.float && i >= 2 && text - i >= 2;
      if (owed > 0) { brk = false; owed--; }
      lines.push({ top: y, h: l.h, w: l.w, size: l.size, kind: r.kind, pos, nth: nth0 + i, brk, at: r.pos != null ? r.pos + l.bytes : r.kind === 'text' && pos != null ? pos : null });
      y += l.h;
    });
    if (r.keep === 'heading') owed = 2;
    if (b) b.n += set.length;
    margin = r.after;
  }
  return { lines, blocks };
}

/** a layout's height below its first line's top, in the body's em: its last line's bottom, 0 where it has no line */
export function heightOf(/** @type {Layout} */ L) { const l = L.lines[L.lines.length - 1]; return l ? l.top + l.h : 0; }

// ---- the fold ---------------------------------------------------------------------------------------------------

/**
 * The article's lines broken into columns of COLUMN_LINES body line boxes:
 * each filled from its first line's top to its depth — the margin above it
 * dropped — and broken before the first line that does not fit, or, where no
 * column may break there, before the latest line one may (`Line.brk`); a
 * column whose lines no break parts deeper than its depth is broken at the
 * line that does not fit, so no text is dropped; and broken before a line
 * whose block follows positions not held (`Line.gap`).
 * @param {Line[]} lines
 * @returns {Array<{first: number, n: number, top: number, h: number}>} in flow order; `h` the depth its lines take, in the body's em
 */
export function columnsOf(lines) {
  /** @type {Array<{first: number, n: number, top: number, h: number}>} */
  const out = [];
  for (let start = 0; start < lines.length;) {
    const top = lines[start].top;
    let end = start + 1;
    while (end < lines.length && !lines[end].gap && lines[end].top + lines[end].h - top <= COLUMN_H + EPS) end++;
    if (end < lines.length && !lines[end].gap) {
      let j = end;
      while (j > start && !lines[j].brk) j--;
      if (j > start) end = j;
    }
    const last = lines[end - 1];
    out.push({ first: start, n: end - start, top, h: last.top + last.h - top });
    start = end;
  }
  return out;
}

/** the positions a full column of estimated lines holds */
const PER_COLUMN = COLUMN_LINES * MEASURE_CPL;

/**
 * The document folded into its room (see the head): its lines' columns, each
 * stretch of positions it does not hold estimated (`Fold.unheld`) — those
 * before a block (`Line.gap`) in columns of their own, those after its last
 * line held filling that line's column first — a body line for each
 * MEASURE_CPL of them; set at the first step from `step` on that holds every
 * column, placed left to right, then row by row, a gutter apart, each but the
 * last COLUMN_LINES body line boxes deep and the last its own length.
 * @param {Line[]} lines the article's lines, as T-LAYER measures them, else as `layoutOf` predicts them
 * @param {Room} room
 * @param {{step?: number, after?: number, heldTo?: number, lead?: number}} [opts] `step` the smallest step to set it at; `after` the positions after the last line held, the first of them `heldTo`; `lead` the depth, in the body's em, they begin at where no line is held
 * @returns {Fold}
 */
export function fold(lines, room, opts = {}) {
  /** @type {Array<{first: number, n: number, top: number, h: number, estimated: boolean}>} */
  const cols = [];
  /** @type {Array<{from: number, to: number, column: number, depth: number, last: number}>} depths in the body's em */
  const spans = [];
  for (const c of columnsOf(lines)) {
    const l = lines[c.first], g = l.gap || 0;
    if (g > 0 && l.at != null) {
      const n = Math.max(1, Math.ceil(g / PER_COLUMN));
      spans.push({ from: l.at - g, to: l.at, column: cols.length, depth: 0, last: cols.length + n - 1 });
      for (let k = 0; k < n; k++) cols.push({ first: c.first, n: 0, top: 0, h: COLUMN_H, estimated: true });
    }
    cols.push({ ...c, estimated: false });
  }
  let rest = Math.ceil(Math.max(0, opts.after || 0) / MEASURE_CPL) * LINE_H;
  if (rest > 0) {
    const fit = (/** @type {number} */ depth) => Math.min(rest, Math.max(0, Math.floor((COLUMN_H - depth + EPS) / LINE_H)) * LINE_H);
    const last = cols[cols.length - 1];
    if (last) { spans.push({ from: opts.heldTo ?? 1, to: Infinity, column: cols.length - 1, depth: last.h, last: Infinity }); const f = fit(last.h); last.h += f; rest -= f; }
    else { const lead = opts.lead || 0, f = fit(lead); spans.push({ from: opts.heldTo ?? 1, to: Infinity, column: 0, depth: lead, last: Infinity }); cols.push({ first: 0, n: 0, top: 0, h: lead + f, estimated: true }); rest -= f; }
    for (; rest > EPS; rest -= COLUMN_H) cols.push({ first: lines.length, n: 0, top: 0, h: Math.min(COLUMN_H, rest), estimated: true });
  }
  if (!cols.length) cols.push({ first: 0, n: 0, top: 0, h: LINE_H, estimated: true });
  const s = stepFor(room, cols.length, opts.step || 0);
  const columns = cols.map((c, i) => ({
    x: ((i % s.across) * PITCH_W + GUTTER / 2) * s.fs, y: (Math.floor(i / s.across) * PITCH_H + GUTTER / 2) * s.fs,
    w: COLUMN_W * s.fs, h: (i < cols.length - 1 ? COLUMN_H : c.h) * s.fs, first: c.first, n: c.n, top: c.top, estimated: c.estimated,
  }));
  const unheld = spans.map((u) => ({ from: u.from, to: u.to, column: u.column, depth: u.depth * s.fs, last: Math.min(u.last, columns.length - 1) }));
  return { fs: s.fs, step: s.k, across: s.across, room: { w: room.w, h: room.h }, lines, columns, unheld };
}

/** the head's lines every article opens with: its address, its state line and its byline, in the body's em */
const HEAD_H = lineBox(1) + 2 * lineBox(MEASURE.head);

/**
 * A document whose text has not arrived, folded: its head's lines and a body
 * line for each MEASURE_CPL of its positions after them, every line full —
 * never more columns than its text sets, so its size is never smaller than
 * the one its text is set at (M-PUMP's fetch em reads it). Its columns hold
 * no line; its positions stand in them from the head's foot on (`placeOf`).
 * @param {number} extent the content's positions
 * @param {Room} room
 * @returns {Fold}
 */
export function estimate(extent, room) { return fold([], room, { after: Math.max(1, extent), heldTo: 1, lead: HEAD_H }); }

/**
 * The positions an estimated column holds (`estimate`), the first column's
 * after the head's lines: what M-PUMP reads for the columns in view.
 * @param {number} column
 * @returns {[number, number]} [first position, one past the last]
 */
export function estimatedSpan(column) {
  const first = Math.max(0, COLUMN_LINES - Math.ceil(HEAD_H / LINE_H - 1e-9)) * MEASURE_CPL;
  return column <= 0 ? [1, 1 + first] : [1 + first + (column - 1) * PER_COLUMN, 1 + first + column * PER_COLUMN];
}

/**
 * A document whose extent is unread, folded: its first column slot, at the
 * standard size, a column deep.
 * @param {Room} room
 * @returns {Fold}
 */
export function slot(room) { return fold([], room, { after: PER_COLUMN, heldTo: 1 }); }

/** a column padded by half a gutter on either side: its slot's share of the outline, which meets its neighbours' */
export function padded(/** @type {Fold} */ f, /** @type {Column} */ c) {
  const g = (GUTTER / 2) * f.fs;
  return { x: c.x - g, y: c.y - g, w: c.w + 2 * g, h: c.h + 2 * g };
}

/**
 * The outline's rects: disjoint, their union the fold's padded columns — each
 * row's run of full columns one rect, the last column, where shorter, one of
 * its own.
 * @param {Fold} f
 * @returns {Rect[]}
 */
export function outlineRects(f) {
  /** @type {Rect[]} */
  const out = [];
  const n = f.columns.length;
  for (let i = 0; i < n; i += f.across) {
    const row = f.columns.slice(i, i + f.across).map((c) => padded(f, c));
    const last = row[row.length - 1];
    const short = i + row.length === n && last.h < row[0].h - EPS;
    const full = short ? row.slice(0, -1) : row;
    if (full.length) out.push({ x: full[0].x, y: full[0].y, w: full[full.length - 1].x + full[full.length - 1].w - full[0].x, h: full[0].h });
    if (short) out.push(last);
  }
  return out;
}

/**
 * The document's one edge (issue #15: no frame or rule around a column): the
 * polygon around its padded columns, clockwise from its top-left, in world
 * units relative to the room — the rows share their left edge, each as wide
 * as the one above it or narrower, the last column, where shorter, a step.
 * @param {Fold} f
 * @returns {Array<{x: number, y: number}>} its corners
 */
export function outline(f) {
  /** @type {Array<{top: number, bottom: number, x: number}>} the right edge, going down */
  const right = [];
  const n = f.columns.length;
  for (let i = 0; i < n; i += f.across) {
    const row = f.columns.slice(i, i + f.across).map((c) => padded(f, c));
    const last = row[row.length - 1], full = row[0];
    if (i + row.length === n && last.h < full.h - EPS) {
      right.push({ top: last.y, bottom: last.y + last.h, x: last.x + last.w });
      if (row.length > 1) { const prev = row[row.length - 2]; right.push({ top: last.y + last.h, bottom: full.y + full.h, x: prev.x + prev.w }); }
    } else right.push({ top: full.y, bottom: full.y + full.h, x: last.x + last.w });
  }
  const left = padded(f, f.columns[0]).x;
  const pts = [{ x: left, y: right[0].top }];
  for (const s of right) pts.push({ x: s.x, y: s.top }, { x: s.x, y: s.bottom });
  pts.push({ x: left, y: right[right.length - 1].bottom });
  const same = (/** @type {number} */ a, /** @type {number} */ b) => Math.abs(a - b) < 1e-9 * Math.max(1, Math.abs(a), Math.abs(b));
  const dedup = pts.filter((p, i) => i === 0 || !(same(p.x, pts[i - 1].x) && same(p.y, pts[i - 1].y)));
  // a corner stands where the edge turns: a point between two on one line is no corner
  return dedup.filter((p, i) => {
    const a = dedup[(i + dedup.length - 1) % dedup.length], b = dedup[(i + 1) % dedup.length];
    return !((same(a.x, p.x) && same(b.x, p.x)) || (same(a.y, p.y) && same(b.y, p.y)));
  });
}

/**
 * The outline's bounds, in world units relative to the room.
 * @param {Fold} f
 * @returns {Rect}
 */
export function boundsOf(f) {
  const rs = outlineRects(f);
  const x0 = Math.min(...rs.map((r) => r.x)), y0 = Math.min(...rs.map((r) => r.y));
  return { x: x0, y: y0, w: Math.max(...rs.map((r) => r.x + r.w)) - x0, h: Math.max(...rs.map((r) => r.y + r.h)) - y0 };
}

/**
 * The outline's first row, where a document's label and history strip stand:
 * its padded columns across the row, as deep as its first.
 * @param {Fold} f
 * @returns {Rect}
 */
export function firstRow(f) {
  const row = f.columns.slice(0, f.across).map((c) => padded(f, c));
  return { x: row[0].x, y: row[0].y, w: row[row.length - 1].x + row[row.length - 1].w - row[0].x, h: row[0].h };
}

/**
 * The bars the canvas draws for a fold, column by column: one per line of the
 * document's blocks (the head and the chrome are not the document's lines),
 * across the width its content takes, at the height its glyphs stand inside
 * its line box, in the column that holds the line, naming the line; none in a
 * column that holds no line.
 * @param {Fold} f
 * @returns {Bar[][]} by column, each column's top to bottom
 */
export function bars(f) {
  return f.columns.map((c) => {
    /** @type {Bar[]} */
    const out = [];
    for (let i = c.first; i < c.first + c.n; i++) {
      const l = f.lines[i];
      if (l.kind === 'head' || l.kind === 'chrome' || l.w <= 0) continue;
      out.push({ x: c.x, y: c.y + (l.top - c.top + l.h / 2 - 0.2 * l.size) * f.fs, w: l.w * CHAR_W * f.fs, h: 0.5 * l.size * f.fs, withheld: l.kind === 'withheld', line: i });
    }
    return out;
  });
}

/** the column of a fold that holds a line, by its index; -1 where none does */
export const columnOfLine = (/** @type {Fold} */ f, /** @type {number} */ i) => f.columns.findIndex((c) => i >= c.first && i < c.first + c.n);

/**
 * Where a position stands in a fold, in world units relative to the room: in
 * a stretch it holds no line for (`Fold.unheld`), its estimated line, a body
 * line for each MEASURE_CPL of the positions from the stretch's first, from
 * the stretch's column on; else the line holding it — the last line standing
 * at or before it — in its column; a position before every line, at the
 * first column's top.
 * @param {Fold} f
 * @param {number} pos
 * @returns {{column: number, line: number | null, x: number, y: number, w: number, h: number}} `line` the index of the line, null where it stands in no line held
 */
export function placeOf(f, pos) {
  const lh = LINE_H * f.fs, deep = COLUMN_H * f.fs;
  const u = f.unheld.find((x) => pos >= x.from && pos < x.to);
  if (u) {
    let i = u.column, depth = u.depth, k = Math.floor((pos - u.from) / MEASURE_CPL);
    for (;;) {
      const c = f.columns[i], fit = Math.max(1, Math.floor((deep - depth) / lh + 1e-6));
      if (k < fit || i >= u.last || i >= f.columns.length - 1) {
        const lines = Math.max(1, Math.floor((c.h - depth) / lh + 1e-6));
        return { column: i, line: null, x: c.x, y: c.y + depth + Math.min(k, lines - 1) * lh, w: c.w, h: lh };
      }
      k -= fit; i++; depth = 0;
    }
  }
  let at = -1;
  for (let i = 0; i < f.lines.length; i++) { const a = f.lines[i].at; if (a != null && a <= pos) at = i; }
  if (at < 0) { const c = f.columns[0]; return { column: 0, line: null, x: c.x, y: c.y, w: c.w, h: lh }; }
  const ci = Math.max(0, columnOfLine(f, at)), c = f.columns[ci], l = f.lines[at];
  return { column: ci, line: at, x: c.x, y: c.y + (l.top - c.top) * f.fs, w: c.w, h: l.h * f.fs };
}

/**
 * The column under a point of a fold, in world units relative to the room:
 * the one whose padded slot holds it, else the nearest.
 * @param {Fold} f
 * @param {number} x
 * @param {number} y
 * @returns {number} its index
 */
export function columnAt(f, x, y) {
  let best = 0, bd = Infinity;
  f.columns.forEach((c, i) => {
    const p = padded(f, c);
    const dx = Math.max(p.x - x, 0, x - (p.x + p.w)), dy = Math.max(p.y - y, 0, y - (p.y + p.h));
    const d = dx * dx + dy * dy;
    if (d < bd) { bd = d; best = i; }
  });
  return best;
}

/**
 * The position under a point of a fold, in world units relative to the room:
 * the line of the column under it (`columnAt`) whose box holds its height,
 * else that column's nearest line — its first position, or, for a line of the
 * head or the chrome, which names none, the first a line after it names, else
 * one before it; null where the column holds no line naming one.
 * @param {Fold} f
 * @param {number} x
 * @param {number} y
 * @returns {number | null}
 */
export function posAt(f, x, y) {
  const c = f.columns[columnAt(f, x, y)];
  if (!c.n) return null;
  let best = c.first, bd = Infinity;
  for (let i = c.first; i < c.first + c.n; i++) {
    const l = f.lines[i], t = c.y + (l.top - c.top) * f.fs, b = t + l.h * f.fs;
    const d = y < t ? t - y : y > b ? y - b : 0;
    if (d < bd) { bd = d; best = i; }
  }
  for (let i = best; i < c.first + c.n; i++) { const a = f.lines[i].at; if (a != null) return a; }
  for (let i = best - 1; i >= c.first; i--) { const a = f.lines[i].at; if (a != null) return a; }
  return null;
}

/**
 * @typedef {Object} Window — the positions a view shows of a fold, and the ends of it the view has run past
 * @property {number} from the position the first line in view opens at
 * @property {number} to the position the last line in view opens at
 * @property {boolean} start the view reaches the fold's first line's top: it has run past the document's start
 * @property {boolean} end the view reaches its last column's foot: it has run past the document's end
 */

/**
 * The view's window over a fold (issue #141's design decision: the one line's
 * strip marks it over a document the walk keeps in view): in each column the
 * view meets, the lines whose boxes meet it — a line held by the position it
 * opens at, a line of a stretch the fold holds no line for estimated as
 * `placeOf` places those positions, a body line for each MEASURE_CPL of them —
 * the first position and the last of them; and whether the view reaches the
 * first column's top and the last column's foot.
 * @param {Fold} f
 * @param {{x0: number, y0: number, x1: number, y1: number}} view in world units relative to the room
 * @returns {Window | null} null where the view meets no line naming a position
 */
export function windowIn(f, view) {
  const lh = LINE_H * f.fs, deep = COLUMN_H * f.fs, last = f.columns.length - 1;
  let from = Infinity, to = -Infinity;
  const take = (/** @type {number} */ p) => { from = Math.min(from, p); to = Math.max(to, p); };
  const across = (/** @type {Column} */ c) => c.x <= view.x1 && c.x + c.w >= view.x0;
  /** the estimated lines a column holds from a depth below its text top: as many as a column's depth holds, the last column the rest of its own */
  const fit = (/** @type {Column} */ c, /** @type {number} */ depth, /** @type {boolean} */ final) => Math.max(1, Math.floor(((final ? c.h : deep) - depth) / lh + 1e-6));
  f.columns.forEach((c, ci) => {
    if (!across(c) || c.y > view.y1 || c.y + c.h < view.y0) return;
    for (let i = c.first; i < c.first + c.n; i++) {
      const l = f.lines[i], top = c.y + (l.top - c.top) * f.fs;
      if (top > view.y1) break;
      if (l.at != null && top + l.h * f.fs >= view.y0) take(l.at);
    }
    for (const u of f.unheld) {
      if (ci < u.column || ci > u.last) continue;
      // the stretch's lines in the columns before this one, then this column's from the depth they begin at
      let k = 0, depth = u.depth;
      for (let j = u.column; j < ci; j++) { k += fit(f.columns[j], depth, false); depth = 0; }
      const n = fit(c, depth, ci >= u.last || ci >= last);
      const a = Math.max(0, Math.floor((view.y0 - c.y - depth) / lh)), b = Math.min(n - 1, Math.floor((view.y1 - c.y - depth) / lh));
      if (a > b || u.from + (k + a) * MEASURE_CPL >= u.to) continue;
      take(u.from + (k + a) * MEASURE_CPL);
      take(Math.min(u.from + (k + b) * MEASURE_CPL, u.to - 1));
    }
  });
  if (from > to) return null;
  const c0 = f.columns[0], cz = f.columns[last], foot = cz.y + cz.h;
  return { from, to, start: across(c0) && c0.y >= view.y0 && c0.y <= view.y1, end: across(cz) && foot >= view.y0 && foot <= view.y1 };
}

/**
 * Where the paging key continues at reading scale (issue #15's design
 * decision: "the paging keys continue at the next column's top"): with the
 * view's centre over a column whose foot the view already shows (PageDown),
 * or whose top it already shows (PageUp), the next column's top, or the
 * previous one's, brought to the top of the view, centred across; none where
 * the column runs past the view that way — the paging pages within it — and
 * none past the first or last column.
 * @param {Fold} f
 * @param {{x0: number, y0: number, x1: number, y1: number}} view the visible view, in world units relative to the room
 * @param {1 | -1} dir 1 PageDown, -1 PageUp
 * @returns {{column: number, x: number, top: number} | null} the column, its centre across, and the height to stand at the view's top: half a gutter above its text
 */
export function pageTarget(f, view, dir) {
  const i = columnAt(f, (view.x0 + view.x1) / 2, (view.y0 + view.y1) / 2), c = f.columns[i];
  const slack = 0.5 * LINE_H * f.fs;
  if (dir > 0 ? c.y + c.h > view.y1 + slack : c.y < view.y0 - slack) return null;
  const to = f.columns[i + dir];
  if (!to) return null;
  return { column: i + dir, x: to.x + to.w / 2, top: to.y - (GUTTER / 2) * f.fs };
}

/**
 * Where a passage read in one fold of a document stands in another (issue
 * #15: "the passage in view keeps its place and size on screen"): the point
 * `p` of the first, in world units relative to the room, read as a position
 * and as its offset from the line holding it (`posAt`, `placeOf`); that offset
 * from that position's line in the second, at the second's size; and the
 * factor the camera's scale takes for the text to keep its size on screen.
 * Where the second fold is another version's (issue #154's design decision:
 * a version move keeps the held passage's screen line), `pair` names the
 * position of the first whose line the point is read from and the position
 * of the second whose line takes it — their positions being two texts'.
 * @param {Fold} a the fold the passage was read in
 * @param {Fold} b the fold it is set in now
 * @param {{x: number, y: number}} p
 * @param {{from: number, to: number} | null} [pair] the position of `a` the point is read from and the position of `b` that takes it; null where the point's own position does, in both
 * @returns {{pos: number, to: {x: number, y: number}, k: number} | null} null where the point names no position
 */
export function holdOf(a, b, p, pair = null) {
  const pos = pair ? pair.from : posAt(a, p.x, p.y);
  if (pos == null) return null;
  const from = placeOf(a, pos), to = placeOf(b, pair ? pair.to : pos), s = b.fs / a.fs;
  return { pos, to: { x: to.x + (p.x - from.x) * s, y: to.y + (p.y - from.y) * s }, k: a.fs / b.fs };
}

/** the box fractions the layout shares with the text layer */
export const BOX = { DOC_W, DOC_H };
