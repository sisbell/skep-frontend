// P-LABEL — the plane's labels, set in one pass (the structure record §3.2;
// P-RENDER's labels, their placement kept pure so it is tested apart from
// the canvas). Layer 1, pure: the canvas's own measure is an input, and the
// canvas a run is measured and drawn on is handed to the two helpers that do
// it (`runWidth`, `drawRun`), P-RENDER's and BM's alike. State: none.
// Each label is drawn only where its place holds it (foundations §2.1;
// F-9): a label is set at its rule's size and never below P-REG's
// LABEL_MIN_PX, and
// one its place cannot hold at that size is left out — never cut through an
// address or a count, which a cut turns into another document or another
// number; a first line alone is cut, to its place's width, on a whole word,
// ending in its ellipsis and keeping after it the bracket its words close with
// (`cutWords`), and set only where LEAD_WORDS of its words fit so or the whole
// of a shorter one (F-9). P-RENDER hands the pass every label once every place's
// shapes are drawn, in the order the places were drawn — the board, the
// clusters, the account frames, the continuations' marks, the documents —
// then each mid connection's count, and the pass sets each one only where,
// wrapped at its spaces to its place's width by the canvas's measure, it lies
// whole inside its place and inside the visible view — the viewport below
// the one line, which stands opaque over the plane, so a label under it
// would be hidden, or cut through at its edge — and meets no other place's
// shape (a cluster's mark, a box, a continuation's mark) and no label set
// before it. Through a crossfade a place drawn the weaker — an alpha below a
// half — sets no label and blocks none, as the click takes the stronger
// (P-LOD's `residueDepth`).
// The contents line (FP-26): a document's label is one row (`Contents`) —
// its first line from where its words stand, cut on a word to the room before
// its address, and its address at a fixed size at the row's end, so words
// arriving beside it never move it; the address is the label's head, set
// whole or the label left out whole, and where no first line is known or too
// few of its words fit, the address stands alone at that end. Its other parts
// stand beneath the row. A label's addresses drop their region's prefix only
// where that region is named in view (`Label.region`): its own label set
// before it in the pass, or the one line naming it; elsewhere each part names
// them whole (`Part.whole`). First lines that read alike once cut are cut
// again to show where they differ (`apart`): the first word, an ellipsis, then
// the words from the first that differs, in the width the cut was set at.
// The hold (FP-26): a label naming a place the one line does not name is
// handed its place's shape on screen (`Hold`), and where its first line
// would stand above P-REG's HOLD gap below the line it stands held there
// instead (`holdTop`, the corner's hold too, so the two stand level): at the
// top-left of its place's visible part, on one line of its type across that
// part, on its place's ground (`heldLine`) — its head, an address or a
// count, whole or no label at all; a badge kept whole beside it or dropped;
// a first line cut on a word to the room the two leave, or dropped; a
// contents line its first line from the line's start and its address at the
// line's end, a badge just before it (`heldContents`); never wrapped — the
// room across its line read from its place's
// shape at the line's foot (`across`), the narrowest row it meets, so it
// never leaves its place. Its place's foot rising pushes it up under the
// line, a held label standing while its bottom is in view; a held label
// meeting one set before it — the held label of the region holding its place
// — stands just below it. A label with no hold — the board's, a place the
// line names, a count — keeps the rule above.
// The faces (P-REG's FACE): each part is set in its face — the client's
// where it names none, an address its own the identifier's, a first line the
// reading face's — and a part's words may carry a stretch in another face
// (`inFace`): an address inside the client's words, a first line before the
// client's mark after it. The pass measures and sets a part run by run
// (`runsOf`), each run in its face; a cut falls only between words, so never
// inside an address, and a part wrapped at its spaces keeps each word's runs.
// An address is never greyed: P-RENDER sets every run in the identifier's face
// in the title's ink. The client's figures
// are tabular: the canvas sets each in a cell as wide as the face's widest
// figure (`figuresOf`), as the page's style sets them.
// A connection's count (foundations §2.1's register; P44) names a pair of
// places and no shape, so every place's shape blocks it; it stands on its
// stroke where its room meets none of them (`onStroke`): the clear stretch
// nearest the stroke's middle, between its two ends and inside the visible
// view. A tail's label names its tail, and every place's shape blocks it,
// its own document's among them, so it never stands over a column; its room
// runs from the tail's end rightward to the first shape its lines would
// meet, else to the visible view's edge (`roomRight`), and the tail's stroke
// is held short of any other place's shape the same way.
// Figures: a line box 1.2 em; the stronger side of a crossfade at alpha 0.5
// and above; a meeting more than half a px each way; a first line set where
// two of its words fit (LEAD_WORDS).
// Rules: FP-1, FP-2, FP-8, FP-10, FP-26.

import { LABEL_MIN_PX, HOLD, FACE } from './register.js';

/** @typedef {{x: number, y: number, w: number, h: number}} Rect a screen rect */
/** @typedef {{x: number, y: number}} Point a screen point */
/** @typedef {import('./register.js').Face} Face */

/** a label's line box, in its size's em */
export const LINE_BOX = 1.2;
/** the alpha at and above which a place drawn through a crossfade is the stronger */
export const STRONGER = 0.5;
/** the whole words a first line's cut keeps at the least, else the first line is left out — the whole of a shorter one set where it fits (see the head) */
export const LEAD_WORDS = 2;
const ELLIPSIS = '…';

/** the marks opening a stretch of a part's words set in a face of its own, and the one closing it (see the head): private-use characters, which no label's words hold */
const OPEN = Object.freeze({ reading: '\uE002', ident: '\uE001' });
const CLOSE = '\uE000';
/** is a character one of the faces' marks */
const isMark = (/** @type {string} */ c) => c === OPEN.reading || c === OPEN.ident || c === CLOSE;

/**
 * A stretch of a part's words set in a face of its own (see the head): an
 * address or a fingerprint in the identifier's, a document's words in the
 * reading face's; nothing where the words are empty.
 * @param {'reading' | 'ident'} f
 * @param {string} text
 */
export const inFace = (f, text) => (text ? OPEN[f] + text + CLOSE : '');

/** a part's words without their faces' marks: what a person reads */
export const plain = (/** @type {string} */ text) => [...text].filter((c) => !isMark(c)).join('');

/**
 * @typedef {Object} Run — a stretch of a label's words in one face
 * @property {string} text
 * @property {Face} face
 */

/**
 * A part's words as runs of one face each (see the head): each marked
 * stretch in the face its mark names — one opened and never closed running
 * to the words' end — and the rest in `base`, the part's own.
 * @param {string} text
 * @param {Face} base
 * @returns {Run[]}
 */
export function runsOf(text, base) {
  /** @type {Run[]} */
  const out = [];
  /** @type {Face} */
  let f = base;
  let at = '';
  const flush = () => { if (at) out.push({ text: at, face: f }); at = ''; };
  for (const c of text) {
    if (c === OPEN.ident || c === OPEN.reading) { flush(); f = c === OPEN.ident ? 'ident' : 'reading'; }
    else if (c === CLOSE) { flush(); f = base; }
    else at += c;
  }
  flush();
  return out;
}

/** the figures, which the client's face sets tabular (see the head) */
const FIGURE = /[0-9]+/g;

/**
 * A run of the client's words as the canvas sets it with tabular figures
 * (see the head): its stretches of figures apart from the rest, in order;
 * each figure stands in a cell as wide as the face's widest.
 * @param {string} text
 * @returns {Array<{text: string, figures: boolean}>}
 */
export function figuresOf(text) {
  /** @type {Array<{text: string, figures: boolean}>} */
  const out = [];
  let at = 0;
  for (const m of text.matchAll(FIGURE)) {
    const i = /** @type {number} */ (m.index);
    if (i > at) out.push({ text: text.slice(at, i), figures: false });
    out.push({ text: m[0], figures: true });
    at = i + m[0].length;
  }
  if (at < text.length) out.push({ text: text.slice(at), figures: false });
  return out;
}

/** the font a label's run is set in, at a size, a weight and its face (P-REG's FACE): the canvas's, and the held label's over a mounted article (T-LAYER's), so the pass's measure and the text set agree */
export const face = (/** @type {number} */ px, weight = 'normal', /** @type {Face} */ f = 'client') => `${weight === 'normal' ? '' : weight + ' '}${px}px ${FACE[f]}`;

/** the client's widest figure on a canvas at a size and weight: the cell each of its figures stands in (see the head) */
export function figureCell(/** @type {CanvasRenderingContext2D} */ c, /** @type {number} */ px, /** @type {string} */ weight) {
  c.font = face(px, weight, 'client');
  return Math.max(...'0123456789'.split('').map((d) => c.measureText(d).width));
}

/**
 * A run's width on a canvas at a size and weight in its face (see the head):
 * the client's figures each in a cell as wide as its widest (`figureCell`).
 * @param {CanvasRenderingContext2D} c
 * @param {Run} run
 * @param {number} px
 * @param {string} weight
 * @returns {number}
 */
export function runWidth(c, run, px, weight) {
  if (run.face !== 'client') { c.font = face(px, weight, run.face); return c.measureText(run.text).width; }
  const cell = figureCell(c, px, weight);
  c.font = face(px, weight, 'client');
  return figuresOf(run.text).reduce((n, x) => n + (x.figures ? x.text.length * cell : c.measureText(x.text).width), 0);
}

/**
 * A run drawn on a canvas at a size and weight in its face, its left edge at
 * `x` on the line the context's baseline names at `y` — the client's figures
 * each centred in its cell, as it is measured (`runWidth`).
 * @param {CanvasRenderingContext2D} c
 * @param {Run} run
 * @param {number} x
 * @param {number} y
 * @param {number} px
 * @param {string} weight
 * @returns {number} its width
 */
export function drawRun(c, run, x, y, px, weight) {
  const align = c.textAlign;
  c.textAlign = 'left';
  let at = x;
  if (run.face !== 'client') { c.font = face(px, weight, run.face); c.fillText(run.text, x, y); at += c.measureText(run.text).width; }
  else {
    const cell = figureCell(c, px, weight);
    c.font = face(px, weight, 'client');
    for (const s of figuresOf(run.text)) {
      if (!s.figures) { c.fillText(s.text, at, y); at += c.measureText(s.text).width; continue; }
      for (const d of s.text) { c.fillText(d, at + (cell - c.measureText(d).width) / 2, y); at += cell; }
    }
  }
  c.textAlign = align;
  return at - x;
}

/**
 * The size a label is set at: its rule's size on the half-px grid, never
 * below the floor.
 * @param {number} px the size its rule asks for
 */
export const sizeOf = (px) => Math.max(LABEL_MIN_PX, Math.round(px * 2) / 2);
/** the height of a label's line whose rule asks for `px` */
export const lineHeight = (/** @type {number} */ px) => sizeOf(px) * LINE_BOX;

/**
 * @typedef {'one' | 'wrap' | 'cut' | 'fill'} Fit how a part meets its place's width:
 * 'one' — one line, never cut (an address, a frame's label);
 * 'wrap' — wrapped at its spaces, never cut (a count, a statement);
 * 'cut' — one line, cut on a word to the width ending in its ellipsis, LEAD_WORDS of its words kept at the least or the whole of a shorter one, else none (a first line: `cutWords`);
 * 'fill' — its whole words wrapped at its spaces down to its place's bottom, the last line kept — and the line before a word wider than the place — cut on a word ending in the ellipsis (a first line given room for several)
 */

/**
 * @typedef {Object} Part — a stretch of a label in one size and ink
 * @property {string} text its white space collapsed as it is set, a stretch of it in another face marked (`inFace`); an empty part sets nothing and is no part; where it names an address in its region, that address past the region's prefix
 * @property {string} [whole] its words with every address in them whole, set in place of `text` where its label's region is not named in view (`Label.region`); absent, `text` wherever it stands
 * @property {string} [close] what its words close with — the bracket around the client's words in a first line's place — which a cut keeps after its ellipsis (`cutWords`); absent, nothing
 * @property {number} px the size its rule asks for; set at `sizeOf(px)`
 * @property {string} ink
 * @property {Fit} fit
 * @property {string} [weight] its face's weight; the regular where absent
 * @property {Face} [face] the face its words are set in, but a stretch marked in another; the client's where absent
 */

/**
 * @typedef {Object} Contents — a document's contents line (see the head), set on its label's first row, which stands at the label's `y`, its parts beneath it
 * @property {Part | null} lead its first line, from `from`, cut on a word to the room before `to` and its address; null where none is known
 * @property {number} px the size its first line is set at, known or not: its row is one line box of it or of its address, the larger, so the address stands where it stood whatever arrives beside it
 * @property {Part} address the label's head, never cut: its right edge at `end`, the row's end; set whole or the label left out whole
 * @property {number} from where the lead's first word starts, on screen
 * @property {number} to where the lead's room ends, on screen
 * @property {number} end the row's end, on screen
 */

/** @typedef {'board' | 'cluster' | 'frame' | 'mark' | 'newest' | 'member' | 'doc' | 'connection' | 'tail' | 'pip'} LabelKind the place a label names; 'mark' a continuation's mark's count, 'newest' its newest member's label and 'member' the name and place of the member the walk's ring stands on, each under the mark's name; 'connection' a mid connection's count; 'tail' a tail's far end in words, or its count; 'pip' a trail pip's number, which P-RENDER draws over the labels with the trail and the pass never sets */

/**
 * @typedef {Object} Label — a label a drawing function hands the pass
 * @property {LabelKind} kind
 * @property {string} place the place it names: a board, an account, a continuation's `account:k`, a document; a connection's two places, `a|b` in sorted order (`pairOf`); a tail's site (P-RENDER's `DrawnTail.key`)
 * @property {Rect} within the room its place gives it, on screen
 * @property {number} x its lines' left edge; their centre where `align` is 'center'
 * @property {number} y its first line's top
 * @property {'left' | 'center'} align
 * @property {number} alpha the alpha its place is drawn at
 * @property {string | null} plate the ink of its place's ground, laid across its room behind each line over what the place draws beneath it; null for none
 * @property {Part[]} parts in order down from its first line, each set below the one before; a part left out takes every part after it out with it, so the first, its head, set or the label left out whole — a contents label's, beneath its row, at `x`
 * @property {Hold | null} hold where it stands held below the one line once its first line would rise above the hold (see the head); null for a label never held — the board's, a place the line names, a label naming no place
 * @property {Contents | null} [contents] its first row a document's contents line (see the head); absent or null for every other label
 * @property {string | null} [region] the region whose label, set before it in the pass or named by the one line, lets its addresses drop the region's prefix (see the head); absent or null where they stand as its parts give them
 */

/**
 * @typedef {Object} Hold — the place a label holds in below the one line (see the head)
 * @property {Rect[]} rects its place's shape on screen: rects sharing their left edge, each row as wide as the one above it or narrower — a document's outline, a mark, a cell
 * @property {number} pad how far inside them a held label stands, in px: a document's half gutter
 * @property {string | null} plate the ink of its place's ground, laid across its held line; null for none
 */

/**
 * @typedef {Object} Shape — a place's drawn shape, which no other place's label may meet
 * @property {string} place
 * @property {Rect} rect
 * @property {number} alpha
 */

/**
 * @typedef {Object} SetLine — one line the pass set
 * @property {string} text its words, as a person reads them
 * @property {Run[]} runs its words run by run, each in its face, as they are set
 * @property {number} px the size it is set at
 * @property {string} ink
 * @property {string} weight
 * @property {Rect} rect the room it takes: its measured width, one line box tall
 */

/**
 * @typedef {Object} SetLabel — a label the pass set: the lines of the parts it set
 * @property {LabelKind} kind
 * @property {string} place
 * @property {Rect} within its room; a held label's, its held line across its place's visible part
 * @property {number} alpha
 * @property {string | null} plate
 * @property {SetLine[]} lines a held label's, the parts it set on its one line, left to right
 * @property {boolean} held it stands held below the one line (see the head)
 */

/**
 * @typedef {'faint' | 'width' | 'height' | 'view' | 'meets' | 'after'} Reason why a part was left out:
 * its place drawn the weaker through a crossfade; a word, or a line never cut, wider than its place — held, a part its one line has no room for; its lines past its place's bottom — held, below the labels it stands under; reaching past the visible view — under the one line, or past the viewport — held, wholly under the line; meeting another place's shape or a label set before it; a part before it left out
 */

/**
 * @typedef {Object} LeftOut — a part the pass left out, and the rule that left it out
 * @property {LabelKind} kind
 * @property {string} place
 * @property {string} text
 * @property {Reason} reason
 */

/** @typedef {(text: string, px: number, weight: string, face: Face) => number} Measure a run's width set at a size and weight in a face, in px — the client's figures each in a cell as wide as the face's widest (`figuresOf`) */

/**
 * A part's words' width, run by run (`runsOf`), each run in its face.
 * @param {Measure} measure
 * @param {string} text
 * @param {number} px
 * @param {string} weight
 * @param {Face} base the part's face
 */
const wideOf = (measure, text, px, weight, base) => runsOf(text, base).reduce((w, r) => w + measure(r.text, px, weight, r.face), 0);

/** do two rects overlap by more than half a px each way? */
const meets = (/** @type {Rect} */ a, /** @type {Rect} */ b) =>
  Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x) > 0.5 && Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y) > 0.5;

/**
 * Which way `r` reaches past `room`, half a px either way.
 * @param {Rect} r
 * @param {Rect} room
 * @returns {'width' | 'height' | null} null where it lies inside
 */
function past(r, room) {
  if (r.x < room.x - 0.5 || r.x + r.w > room.x + room.w + 0.5) return 'width';
  if (r.y < room.y - 0.5 || r.y + r.h > room.y + room.h + 0.5) return 'height';
  return null;
}

/** does a word of a first line hold a letter or a figure — a word a cut counts, and may end on; a separator ("·", "—") is none */
const isWord = (/** @type {string} */ w) => /[\p{L}\p{N}]/u.test(plain(w));

/**
 * A first line cut on a word (see the head; F-9): the longest start of its
 * whole words that fits with its ellipsis after it, a separator ending that
 * start dropped and `close` — the bracket its words close with — kept after
 * the ellipsis; never ending inside a word, so never inside an address, which
 * a cut turns into another; null where fewer than `least` of its words fit so.
 * The words whole are the caller's to try first: no start here holds them all.
 * @param {string} text its words, a stretch of them in another face marked (`inFace`)
 * @param {(s: string) => boolean} fits
 * @param {string} [close]
 * @param {number} [least] the words a start keeps at the least
 * @returns {string | null}
 */
export function cutWords(text, fits, close = '', least = 1) {
  const words = wordsOf(text.trim().replace(/\s+/g, ' '));
  /** each start's words: the first n, a separator ending them dropped, and how many of them are words a cut counts */
  const start = (/** @type {number} */ n) => {
    let k = n;
    while (k > 0 && !isWord(words[k - 1])) k--;
    return { k, counted: words.slice(0, k).filter(isWord).length };
  };
  const at = (/** @type {number} */ k) => words.slice(0, k).join(' ') + ELLIPSIS + close;
  // the more words a start keeps the wider it is set, so the longest that fits is found by halving
  let lo = 0, hi = words.length - 1;
  while (lo < hi) { const mid = (lo + hi + 1) >> 1; const s = start(mid); if (s.k && fits(at(s.k))) lo = mid; else hi = mid - 1; }
  const best = start(lo);
  return best.k && best.counted >= least && fits(at(best.k)) ? at(best.k) : null;
}

/** a part's words at their spaces, each word keeping its runs' faces (see the head) */
function wordsOf(/** @type {string} */ text) {
  /** @type {string[]} */
  const out = [];
  // the mark of the stretch the walk stands in, '' in the part's own face; the word's, as its last character was set
  let open = '', inWord = '', word = '';
  for (const c of text) {
    if (c === OPEN.ident || c === OPEN.reading) { open = c; continue; }
    if (c === CLOSE) { open = ''; continue; }
    if (c === ' ') { if (word) out.push(word + (inWord ? CLOSE : '')); word = ''; inWord = ''; continue; }
    if (open !== inWord) { word += (inWord ? CLOSE : '') + open; inWord = open; }
    word += c;
  }
  if (word) out.push(word + (inWord ? CLOSE : ''));
  return out;
}

/** words set at their spaces, each line holding as many as fit */
function wrapWords(/** @type {string[]} */ words, /** @type {(s: string) => boolean} */ fits) {
  /** @type {string[]} */
  const out = [];
  let line = '';
  for (const w of words) {
    if (line && fits(line + ' ' + w)) line += ' ' + w;
    else { if (line) out.push(line); line = w; }
  }
  if (line) out.push(line);
  return out;
}

/**
 * A part's lines at its place's width, or null where its fit refuses the width.
 * @param {Part} p
 * @param {number} rows the lines its place's room holds from the part's first down
 * @param {(s: string) => boolean} fits
 * @returns {string[] | null}
 */
function linesOf(p, rows, fits) {
  const text = p.text.trim().replace(/\s+/g, ' '), close = p.close || '';
  if (p.fit === 'one') return fits(text) ? [text] : null;
  if (p.fit === 'cut') { const c = fits(text) ? text : cutWords(text, fits, close, LEAD_WORDS); return c ? [c] : null; }
  const words = wordsOf(text);
  if (p.fit === 'wrap') return words.every(fits) ? wrapWords(words, fits) : null;
  // a first line given room for several: its whole words, up to the first wider than the place, wrapped
  const over = words.findIndex((w) => !fits(w)), shown = over < 0 ? words : words.slice(0, over);
  const lines = wrapWords(shown, fits);
  if (over < 0 && lines.length <= rows) return lines;
  /** @type {string[]} */
  const kept = lines.slice(0, rows);
  // the last line kept ends in the ellipsis, cut on a word to fit beside it; a line too short for even its first word with it goes, the line before taking it
  while (kept.length) {
    const last = kept[kept.length - 1], ended = last + ELLIPSIS + close;
    const cut = fits(ended) ? ended : cutWords(last, fits, close);
    if (cut) { kept[kept.length - 1] = cut; return kept; }
    kept.pop();
  }
  return null;
}

/**
 * Where a sign held below the one line stands (see the head): at its own
 * place's top `at` while that stands at `top` or below; else at `top`, never
 * so low that it runs past `foot` — its place's foot rising pushes it up
 * under the line — and never above `at`, where its place is shorter than it.
 * T-LAYER's corner holds by it too, so a label and a corner held stand level.
 * @param {number} at its place's top for it, on screen: where it stands unheld
 * @param {number} top the height it holds below: the one line's bottom and P-REG's HOLD gap
 * @param {number} foot the foot it never runs past
 * @param {number} h its height
 * @returns {number}
 */
export function holdTop(at, top, foot, h) { return Math.max(at, Math.min(Math.max(at, top), foot - h)); }

/**
 * The room across a held line (see the head) in a place drawn as rects
 * sharing their left edge, each row as wide as the one above it or narrower:
 * from that edge to the right edge of the rects holding the line's foot —
 * the narrowest the line meets — `pad` inside either; null where none holds it.
 * @param {Rect[]} rects
 * @param {number} y the line's top
 * @param {number} h its height
 * @param {number} pad
 * @returns {{x: number, w: number} | null}
 */
export function across(rects, y, h, pad) {
  const foot = y + h - 0.5, at = rects.filter((r) => r.y <= foot && foot < r.y + r.h);
  if (!at.length) return null;
  const left = Math.min(...at.map((r) => r.x)), right = Math.max(...at.map((r) => r.x + r.w));
  return { x: left + pad, w: right - left - 2 * pad };
}

/**
 * @typedef {Object} HeldPart — a part a held label sets on its one line
 * @property {Part} part
 * @property {string} text what it sets, as a person reads it: its own words, or a first line cut, ending in its ellipsis
 * @property {Run[]} runs what it sets, run by run, each in its face
 * @property {number} px the size it is set at
 * @property {string} weight
 * @property {number} x its left edge, in px from the line's start
 * @property {number} w its width
 */

/** a part as a held line sets it: its words, its white space collapsed, at its size, weight and face */
const heldPart = (/** @type {Part} */ p) => ({ p, text: p.text.trim().replace(/\s+/g, ' '), px: sizeOf(p.px), weight: p.weight || 'normal', face: p.face || /** @type {Face} */ ('client') });
/** @typedef {ReturnType<typeof heldPart>} Held a part as a held line sets it */

/**
 * A first line on a held line (see the head): its words whole where the room
 * holds them, else cut on a word (`cutWords`), LEAD_WORDS kept at the least;
 * null where neither fits.
 * @param {Held} x
 * @param {number} room
 * @param {Measure} measure
 */
function heldFirst(x, room, measure) {
  const fits = (/** @type {string} */ s) => wideOf(measure, s, x.px, x.weight, x.face) <= room + 1e-6;
  return room <= 0 ? null : fits(x.text) ? x.text : cutWords(x.text, fits, x.p.close || '', LEAD_WORDS);
}

/** the held line's parts as set: each at its left edge, its words as a person reads them and run by run, at its width */
function setHeld(/** @type {Array<{x: Held, s: string, at: number}>} */ kept, /** @type {Measure} */ measure) {
  return kept.map(({ x, s, at }) => ({ part: x.p, text: plain(s), runs: runsOf(s, x.face), px: x.px, weight: x.weight, x: at, w: wideOf(measure, s, x.px, x.weight, x.face) }));
}

/**
 * A label's held form (see the head): its parts on one line `width` px wide,
 * in their order, each at its size, a space at its size before each after the
 * first — its head whole, else none; each later part never cut (a badge, a
 * count) kept whole where it fits beside the head and the others kept, else
 * dropped; each first line cut on a word to the room those leave, else
 * dropped.
 * @param {Part[]} parts
 * @param {number} width
 * @param {Measure} measure
 * @returns {HeldPart[] | null} null where the head does not fit whole
 */
export function heldLine(parts, width, measure) {
  const ps = parts.map(heldPart).filter((x) => plain(x.text));
  if (!ps.length) return null;
  const wide = (/** @type {Held} */ x, /** @type {string} */ s) => wideOf(measure, s, x.px, x.weight, x.face);
  const gap = (/** @type {Held} */ x) => wide(x, ' ');
  let used = wide(ps[0], ps[0].text);
  if (used > width + 1e-6) return null;
  /** @type {Map<Held, string>} what each part kept sets */
  const kept = new Map([[ps[0], ps[0].text]]);
  for (const x of ps.slice(1)) {
    if (x.p.fit === 'cut' || x.p.fit === 'fill') continue;
    const need = gap(x) + wide(x, x.text);
    if (used + need <= width + 1e-6) { kept.set(x, x.text); used += need; }
  }
  for (const x of ps.slice(1)) {
    if (x.p.fit !== 'cut' && x.p.fit !== 'fill') continue;
    const s = heldFirst(x, width - used - gap(x), measure);
    if (s) { kept.set(x, s); used += gap(x) + wide(x, s); }
  }
  let at = 0;
  return setHeld(ps.filter((x) => kept.has(x)).map((x, i) => {
    const s = /** @type {string} */ (kept.get(x));
    if (i) at += gap(x);
    const out = { x, s, at };
    at += wide(x, s);
    return out;
  }), measure);
}

/**
 * A contents line's held form (see the head): on one line `width` px wide,
 * its address at the line's end, whole, else no line; each part after it — a
 * badge — whole just before the address, a space at its size apart, where it
 * fits beside those kept, else dropped; its lead from the line's start, cut on
 * a word to the room those leave a space short of them, else dropped.
 * @param {{lead: Part | null, address: Part}} c
 * @param {Part[]} parts
 * @param {number} width
 * @param {Measure} measure
 * @returns {HeldPart[] | null} left to right; null where the address does not fit whole
 */
export function heldContents(c, parts, width, measure) {
  const a = heldPart(c.address);
  const wide = (/** @type {Held} */ x, /** @type {string} */ s) => wideOf(measure, s, x.px, x.weight, x.face);
  const gap = (/** @type {Held} */ x) => wide(x, ' ');
  const aw = wide(a, a.text);
  if (!plain(a.text) || aw > width + 1e-6) return null;
  /** @type {Array<{x: Held, s: string, at: number}>} */
  const tail = [{ x: a, s: a.text, at: width - aw }];
  let left = width - aw;
  for (const x of parts.map(heldPart).filter((y) => plain(y.text)).reverse()) {
    const w = wide(x, x.text), need = w + gap(x);
    if (need > left + 1e-6) continue;
    left -= need;
    tail.unshift({ x, s: x.text, at: left });
  }
  const l = c.lead ? heldPart(c.lead) : null;
  const s = l && plain(l.text) ? heldFirst(l, left - gap(l), measure) : null;
  return setHeld(l && s ? [{ x: l, s, at: 0 }, ...tail] : tail, measure);
}

/**
 * A label's parts as its region's naming sets them (see the head): each
 * part's words as given where its region is named in view — or it names no
 * region — else each with every address whole (`Part.whole`).
 * @param {Label} l
 * @param {boolean} named its region is named in view
 * @returns {Label}
 */
function inRegion(l, named) {
  if (!l.region || named) return l;
  const whole = (/** @type {Part} */ p) => (p.whole != null ? { ...p, text: p.whole } : p);
  return { ...l, parts: l.parts.map(whole), contents: l.contents ? { ...l.contents, address: whole(l.contents.address) } : null };
}

/**
 * @typedef {Object} Cut — a first line the pass cut, as it set it: what `apart` cuts again
 * @property {SetLine} line
 * @property {string} full its words whole, a stretch of them in another face marked
 * @property {Face} base its part's face
 * @property {string} close what its words close with (`Part.close`)
 */

/**
 * The pass: each label set in order where its place holds it, or held below
 * the one line (see the head), the parts it could not set left out with the
 * rule that left each out; then the first lines it cut that read alike cut
 * again to show where they differ (`apart`).
 * @param {Label[]} labels in the order their places were drawn
 * @param {Shape[]} shapes every place's shape the frame drew
 * @param {Rect} view the visible view (P-CAM's `visibleView`): the viewport below the one line
 * @param {Measure} measure
 * @param {ReadonlySet<string>} [named] the places the one line names (L-LINE's `named`): a label's region among them is named in view
 * @returns {{set: SetLabel[], out: LeftOut[]}}
 */
export function setLabels(labels, shapes, view, measure, named = new Set()) {
  /** @type {SetLabel[]} */
  const set = [];
  /** @type {LeftOut[]} */
  const out = [];
  /** @type {Rect[]} the lines set so far — a held label's, its line across its place */
  const taken = [];
  /** @type {Cut[]} the first lines cut so far */
  const cuts = [];
  const strong = shapes.filter((s) => s.alpha >= STRONGER);
  const top = view.y + HOLD.gap;
  /** does a rect meet another place's shape drawn the stronger, or a line set before it */
  const blocked = (/** @type {Rect} */ r, /** @type {string} */ place) => strong.some((s) => s.place !== place && meets(r, s.rect)) || taken.some((q) => meets(r, q));
  /** the rule a line set at a rect breaks: past its place's room, past the visible view, or meeting what it may not; null where none */
  const breaks = (/** @type {Rect} */ r, /** @type {Label} */ l) => past(r, l.within) || (past(r, view) ? 'view' : blocked(r, l.place) ? 'meets' : null);
  /** each part named left out, the first for the rule that left it out and every one after it with it */
  const leave = (/** @type {Label} */ l, /** @type {Part[]} */ ps, /** @type {Reason | null} */ why) => ps.forEach((p, j) => out.push({ kind: l.kind, place: l.place, text: plain(p.text), reason: j || !why ? 'after' : why }));
  for (const raw of labels) {
    const l = inRegion(raw, !!raw.region && (named.has(raw.region) || set.some((s) => (s.kind === 'frame' || s.kind === 'cluster') && s.place === raw.region)));
    const parts = l.parts.filter((p) => plain(p.text).trim());
    const c = l.contents && plain(l.contents.address.text).trim() ? l.contents : null;
    if (l.hold && (c || parts.length) && l.y < top - 1e-6) {
      const r = held(l, l.hold, parts, c);
      if (r.label) { set.push(r.label); taken.push(r.label.within); }
      out.push(...r.out);
      continue;
    }
    /** @type {SetLine[]} */
    const lines = [];
    let y = l.y;
    if (c) {
      const row = contentsRow(l, c);
      if (!row.lines.length) { out.push(...row.out); leave(l, parts, null); continue; }
      out.push(...row.out);
      lines.push(...row.lines);
      for (const m of row.lines) taken.push(m.rect);
      y = row.foot;
    }
    const st = stack(l, parts, y);
    lines.push(...st.lines);
    if (lines.length) {
      set.push({ kind: l.kind, place: l.place, within: l.within, alpha: l.alpha, plate: l.plate, lines, held: false });
      for (const m of st.lines) taken.push(m.rect);
    }
    leave(l, parts.slice(st.i), st.why);
  }
  apart(cuts, measure);
  return { set, out };

  /**
   * A label's parts stacked down from `y` (see the head): each wrapped to its
   * place's width by its fit, set where it lies whole inside its place and the
   * visible view and meets nothing it may not; the first it cannot set, and
   * every one after it, left.
   * @param {Label} l
   * @param {Part[]} parts
   * @param {number} y
   * @returns {{lines: SetLine[], i: number, why: Reason | null}} the lines set, the first part left, and the rule that left it
   */
  function stack(l, parts, y) {
    /** @type {SetLine[]} */
    const lines = [];
    /** @type {Reason | null} */
    let why = l.alpha < STRONGER ? 'faint' : null;
    let i = 0;
    for (; i < parts.length && !why; i++) {
      const p = parts[i];
      const px = sizeOf(p.px), weight = p.weight || 'normal', lh = px * LINE_BOX, base = p.face || 'client';
      const width = l.align === 'center' ? 2 * Math.min(l.x - l.within.x, l.within.x + l.within.w - l.x) : l.within.x + l.within.w - l.x;
      const fits = (/** @type {string} */ s) => wideOf(measure, s, px, weight, base) <= width + 1e-6;
      const rows = Math.floor((l.within.y + l.within.h - y) / lh + 1e-6);
      const texts = rows < 1 ? null : linesOf(p, rows, fits);
      if (rows < 1) why = 'height';
      else if (!texts) why = 'width';
      else if (texts.length > rows) why = 'height';
      if (!texts || why) break;
      const mine = texts.map((s, k) => {
        const w = wideOf(measure, s, px, weight, base);
        return { text: plain(s), runs: runsOf(s, base), px, ink: p.ink, weight, rect: { x: l.align === 'center' ? l.x - w / 2 : l.x, y: y + k * lh, w, h: lh } };
      });
      for (const m of mine) why = why || breaks(m.rect, l);
      if (why) break;
      lines.push(...mine);
      const full = p.text.trim().replace(/\s+/g, ' ');
      if (p.fit === 'cut' && texts[0] !== full) cuts.push({ line: mine[0], full, base, close: p.close || '' });
      y += texts.length * lh;
    }
    return { lines, i, why };
  }

  /**
   * A contents line set on its label's first row (see the head): its address,
   * the head, at the row's end, whole, else the whole label left out by the
   * rule that left it; its lead from where its words stand, cut on a word to
   * the room before the row's room ends and a space short of its address, set
   * where it lies inside its place and the visible view and meets nothing it
   * may not, else named left out. The row is one line box of the larger of
   * its first line's size and its address's, known or not, each centred on it.
   * @param {Label} l
   * @param {Contents} c
   * @returns {{lines: SetLine[], out: LeftOut[], foot: number}} its lines set, lead first; its parts left out; the row's foot
   */
  function contentsRow(l, c) {
    const a = c.address, apx = sizeOf(a.px), aweight = a.weight || 'normal', abase = a.face || 'client', atext = a.text.trim().replace(/\s+/g, ' ');
    const lead = c.lead && plain(c.lead.text).trim() ? c.lead : null;
    const lpx = lead ? sizeOf(lead.px) : apx, lh = Math.max(apx, sizeOf(c.px), lpx) * LINE_BOX;
    const aw = wideOf(measure, atext, apx, aweight, abase);
    const arect = { x: c.end - aw, y: l.y + (lh - apx * LINE_BOX) / 2, w: aw, h: apx * LINE_BOX };
    const why = l.alpha < STRONGER ? 'faint' : breaks(arect, l);
    /** @type {LeftOut[]} */
    const left = [];
    if (why) {
      left.push({ kind: l.kind, place: l.place, text: plain(atext), reason: why });
      if (lead) left.push({ kind: l.kind, place: l.place, text: plain(lead.text), reason: 'after' });
      return { lines: [], out: left, foot: l.y + lh };
    }
    /** @type {SetLine} */
    const address = { text: plain(atext), runs: runsOf(atext, abase), px: apx, ink: a.ink, weight: aweight, rect: arect };
    if (!lead) return { lines: [address], out: left, foot: l.y + lh };
    const lweight = lead.weight || 'normal', lbase = lead.face || 'client', full = lead.text.trim().replace(/\s+/g, ' ');
    const wide = (/** @type {string} */ s) => wideOf(measure, s, lpx, lweight, lbase);
    const room = Math.min(c.to, arect.x - wide(' ')) - c.from;
    const fits = (/** @type {string} */ s) => wide(s) <= room + 1e-6;
    const s = room <= 0 ? null : fits(full) ? full : cutWords(full, fits, lead.close || '', LEAD_WORDS);
    /** @type {Reason | null} */
    let lwhy = s ? null : 'width';
    const rect = { x: c.from, y: l.y + (lh - lpx * LINE_BOX) / 2, w: s ? wide(s) : 0, h: lpx * LINE_BOX };
    if (s) lwhy = breaks(rect, l);
    if (!s || lwhy) {
      left.push({ kind: l.kind, place: l.place, text: plain(lead.text), reason: /** @type {Reason} */ (lwhy) });
      return { lines: [address], out: left, foot: l.y + lh };
    }
    /** @type {SetLine} */
    const first = { text: plain(s), runs: runsOf(s, lbase), px: lpx, ink: lead.ink, weight: lweight, rect };
    if (s !== full) cuts.push({ line: first, full, base: lbase, close: lead.close || '' });
    return { lines: [first, address], out: left, foot: l.y + lh };
  }

  /**
   * A label held below the one line (see the head): its line `holdTop` places
   * — one line box of its largest part — moved below each line set before it
   * that it would meet, across its place at the line's foot (`across`) inside
   * the visible view, its parts set on it (`heldLine`; a contents line's,
   * `heldContents`); left out where its place is drawn the weaker, it has no
   * room above its place's foot below those lines, its head does not fit, it
   * stands wholly under the one line, or it meets another place's shape; each
   * part its line drops left out for its width.
   * @param {Label} l
   * @param {Hold} hold
   * @param {Part[]} parts its parts with words
   * @param {Contents | null} c its contents line, where it has one
   * @returns {{label: SetLabel | null, out: LeftOut[]}}
   */
  function held(l, hold, parts, c) {
    const all = c ? [...(c.lead && plain(c.lead.text).trim() ? [c.lead] : []), c.address, ...parts] : parts;
    const lh = Math.max(c ? lineHeight(c.px) : 0, ...all.map((p) => lineHeight(p.px))), foot = Math.max(...hold.rects.map((r) => r.y + r.h)) - hold.pad;
    let y = holdTop(l.y, top, foot, lh), x0 = 0, x1 = 0;
    /** @type {Reason | null} */
    let why = l.alpha < STRONGER ? 'faint' : null;
    while (!why) {
      const a = across(hold.rects, y, lh, hold.pad);
      if (!a || y + lh > foot + 0.5) { why = 'height'; break; }
      x0 = Math.max(a.x, view.x); x1 = Math.min(a.x + a.w, view.x + view.w);
      const band = { x: x0, y, w: x1 - x0, h: lh }, over = taken.filter((r) => meets(band, r));
      if (!over.length) break;
      y = Math.max(...over.map((r) => r.y + r.h));
    }
    const line = why ? null : c ? heldContents(c, parts, x1 - x0, measure) : heldLine(parts, x1 - x0, measure);
    if (!why && !line) why = 'width';
    if (!why && y + lh <= view.y + 0.5) why = 'view';
    /** @type {SetLine[]} */
    const lines = (line || []).map((m) => ({ text: m.text, runs: m.runs, px: m.px, ink: m.part.ink, weight: m.weight, rect: { x: x0 + m.x, y, w: m.w, h: lh } }));
    if (!why && lines.some((m) => strong.some((s) => s.place !== l.place && meets(m.rect, s.rect)))) why = 'meets';
    const order = c ? [c.address, ...(c.lead && plain(c.lead.text).trim() ? [c.lead] : []), ...parts] : all;
    if (why || !line) return { label: null, out: order.map((p, j) => ({ kind: l.kind, place: l.place, text: plain(p.text), reason: j ? 'after' : /** @type {Reason} */ (why) })) };
    const dropped = order.filter((p) => !line.some((m) => m.part === p)).map((p) => ({ kind: l.kind, place: l.place, text: plain(p.text), reason: /** @type {Reason} */ ('width') }));
    line.forEach((m, k) => {
      if (m.part.fit !== 'cut') return;
      const full = m.part.text.trim().replace(/\s+/g, ' ');
      if (m.text !== plain(full)) cuts.push({ line: lines[k], full, base: m.part.face || 'client', close: m.part.close || '' });
    });
    return { label: { kind: l.kind, place: l.place, within: { x: x0, y, w: x1 - x0, h: lh }, alpha: l.alpha, plate: hold.plate, lines, held: true }, out: dropped };
  }
}

/**
 * First lines that read alike once cut, cut again to show where they differ
 * (see the head): of the texts given, each whose words as shown read as
 * another's while its words whole do not is set as its first word, an
 * ellipsis, then its words from the first where it differs from any of those,
 * cut on a word ending in its ellipsis and its close — the longest such that
 * fits; left as shown where none fits, or where they differ before its second
 * word.
 * @param {Array<{shown: string, full: string, fits: (s: string) => boolean, close: string}>} texts each as shown, whole, the room it may take, what its words close with
 * @returns {string[]} each as it is set now, in their order
 */
export function apartTexts(texts) {
  const now = texts.map((e) => e.shown);
  /** @type {Map<string, number[]>} */
  const alike = new Map();
  texts.forEach((e, i) => { const k = plain(e.shown); const g = alike.get(k); if (g) g.push(i); else alike.set(k, [i]); });
  for (const group of alike.values()) {
    if (group.length < 2) continue;
    const words = group.map((i) => wordsOf(texts[i].full));
    group.forEach((i, k) => {
      const mine = words[k], e = texts[i];
      let first = Infinity;
      group.forEach((j, m) => {
        if (plain(texts[j].full) === plain(e.full)) return;
        let d = 0;
        while (d < mine.length && d < words[m].length && plain(mine[d]) === plain(words[m][d])) d++;
        first = Math.min(first, d);
      });
      if (!(first >= 2 && first < mine.length)) return;
      for (let n = mine.length - first; n >= 1; n--) {
        const end = first + n === mine.length;
        const s = `${mine[0]} ${ELLIPSIS} ${mine.slice(first, first + n).join(' ')}${end ? '' : ELLIPSIS + e.close}`;
        if (e.fits(s)) { now[i] = s; return; }
      }
    });
  }
  return now;
}

/**
 * The pass's first lines cut that read alike cut again to show where they
 * differ (`apartTexts`), each in the width it was set at, so it meets nothing
 * it did not: its words, its runs and its width set again in place.
 * @param {Cut[]} cuts
 * @param {Measure} measure
 */
function apart(cuts, measure) {
  if (cuts.length < 2) return;
  const wide = (/** @type {Cut} */ c, /** @type {string} */ s) => wideOf(measure, s, c.line.px, c.line.weight, c.base);
  const now = apartTexts(cuts.map((c) => ({ shown: c.line.text, full: c.full, close: c.close, fits: (s) => wide(c, s) <= c.line.rect.w + 1e-6 })));
  cuts.forEach((c, i) => {
    if (now[i] === c.line.text) return;
    c.line.text = plain(now[i]); c.line.runs = runsOf(now[i], c.base); c.line.rect.w = wide(c, now[i]);
  });
}

/**
 * The room right of a point along a band `h` px tall — a tail's stroke, and
 * its label past the stroke's end (see the head): from `at` to the left edge
 * of the first shape drawn the stronger the band meets past it, more than
 * half a px each way, as the pass judges a meeting; none where such a shape
 * already holds `at`; else to the visible view's right edge. The shapes of
 * the place `skip` names are left out: a tail's stroke leaves its own
 * document's outline from inside it, at the edge of a column.
 * @param {Point} at the band's left end, at its top
 * @param {number} h
 * @param {Shape[]} shapes every place's shape the frame drew
 * @param {Rect} seen the visible view
 * @param {string | null} [skip]
 * @returns {number} its width in px, 0 where it has none
 */
export function roomRight(at, h, shapes, seen, skip = null) {
  let right = seen.x + seen.w;
  for (const s of shapes) {
    if (s.alpha < STRONGER || s.place === skip) continue;
    const r = s.rect;
    if (Math.min(at.y + h, r.y + r.h) - Math.max(at.y, r.y) <= 0.5 || r.x + r.w - at.x <= 0.5) continue;
    right = Math.min(right, Math.max(at.x, r.x));
  }
  return Math.max(0, right - at.x);
}

/**
 * A connection's two places as one name, whichever end it was met from: the
 * `place` its count is set under, the pair in sorted order as LK keys it.
 * @param {string} a
 * @param {string} b
 */
export const pairOf = (a, b) => [a, b].sort().join('|');

/**
 * Where a connection's count stands on its stroke (see the head): the middle
 * of the stretch nearest the stroke's own middle along which a room of
 * `room`, centred on the stroke, lies wholly between the lines square to the
 * stroke through its two ends, inside the visible view, and meets no shape
 * drawn the stronger — so the pass sets it there; where no stretch is clear,
 * the stroke's middle, where the pass judges it by its rules as every label.
 * @param {Point} p the stroke's start: the centre of the place it leaves
 * @param {Point} q its end: the centre of the place it reaches, or a stub's triangle's base
 * @param {{w: number, h: number}} room the count's room, its plate
 * @param {Shape[]} shapes every place's shape the frame drew
 * @param {Rect} seen the visible view
 * @returns {Point} the room's centre
 */
export function onStroke(p, q, room, shapes, seen) {
  const dx = q.x - p.x, dy = q.y - p.y, len2 = dx * dx + dy * dy;
  const hw = room.w / 2, hh = room.h / 2;
  const at = (/** @type {number} */ t) => ({ x: p.x + dx * t, y: p.y + dy * t });
  if (!len2) return at(0);
  /** the stretch of the stroke, [t0, t1] of 0–1, along which the room's centre lies inside `r`; null where none */
  const across = (/** @type {Rect} */ r) => {
    let t0 = 0, t1 = 1;
    for (const [d, lo, hi] of [[dx, r.x - p.x, r.x + r.w - p.x], [dy, r.y - p.y, r.y + r.h - p.y]]) {
      if (!d) { if (lo > 0 || hi < 0) return null; continue; }
      t0 = Math.max(t0, Math.min(lo / d, hi / d)); t1 = Math.min(t1, Math.max(lo / d, hi / d));
    }
    return t0 <= t1 ? [t0, t1] : null;
  };
  const open = (/** @type {Array<[number, number]>} */ xs) => xs.filter(([a, b]) => b > a);
  // how far the room reaches along the stroke from its centre, in the stroke's lengths
  const reach = (Math.abs(dx) * hw + Math.abs(dy) * hh) / len2;
  const view = across({ x: seen.x + hw, y: seen.y + hh, w: seen.w - 2 * hw, h: seen.h - 2 * hh });
  /** @type {Array<[number, number]>} */
  let clear = view ? open([[Math.max(view[0], reach), Math.min(view[1], 1 - reach)]]) : [];
  for (const s of shapes) {
    if (s.alpha < STRONGER) continue;
    const c = across({ x: s.rect.x - hw, y: s.rect.y - hh, w: s.rect.w + 2 * hw, h: s.rect.h + 2 * hh });
    if (c) clear = open(clear.flatMap(([a, b]) => /** @type {Array<[number, number]>} */ ([[a, Math.min(b, c[0])], [Math.max(a, c[1]), b]])));
  }
  const off = (/** @type {[number, number]} */ [a, b]) => (a > 0.5 ? a - 0.5 : b < 0.5 ? 0.5 - b : 0);
  const best = clear.reduce((m, x) => (off(x) < off(m) ? x : m), clear[0]);
  return best ? at((best[0] + best[1]) / 2) : at(0.5);
}
