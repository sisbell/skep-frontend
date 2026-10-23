// P-LABEL — the plane's labels, set in one pass (P-RENDER's labels, the
// structure record §3.2 "P-RENDER", their placement kept pure so that it is
// tested apart from the canvas). Layer 1, PURE: the canvas's own measure is
// an input. State: none.
// Each label is drawn only where its place holds it (foundations §2.1;
// F-9), and legibility, not frame cost, is what the scales buy (§2.1): a
// label is set at its rule's size and never below P-REG's LABEL_MIN_PX, and
// one its place cannot hold at that size is left out — never cut through an
// address or a count, which a cut turns into another document or another
// number; a first line alone is cut, to its place's width, ending in its
// ellipsis (F-9: "cut to the extent"). P-RENDER hands the pass every label
// once every place's shapes are drawn, in the order the places were drawn —
// the board, the clusters, the account frames, the continuations' marks, the
// documents — then each mid connection's count, and the pass sets each one
// only where, wrapped at its spaces to its place's width by the canvas's
// measure, it lies whole inside its place and inside the visible view — the
// viewport below the one line, which stands opaque over the plane, so a
// label under it would be hidden, or cut through at its edge — and meets no
// other place's shape (a cluster's mark, a box, a continuation's mark) and no
// label set before it. Through a crossfade a place drawn the weaker — an
// alpha below a half — sets no label and blocks none, as the click takes the
// stronger (P-LOD's `residueDepth`).
// A CONNECTION'S COUNT (foundations §2.1's register: "one connection drawn
// per document pair with its count"; P44, which forbids a merged mark that
// hides its count) names a pair of places and no shape, so every place's
// shape blocks it; it stands on its stroke where its room meets none of them
// (`onStroke`): the clear stretch nearest the stroke's middle, between its two
// ends and inside the visible view. A TAIL'S LABEL (issue #132's design
// decision: a link whose far document the plane draws nowhere leaves its near
// end by a short tail "ending in that label") names its tail, and every
// place's shape blocks it, its own document's among them, so it never stands
// over a column; its room runs from the tail's end rightward to the first
// shape its lines would meet, else to the visible view's edge (`roomRight`),
// and the tail's stroke is held short of any other place's shape the same way.
// Rules: FP-1, FP-2, FP-8, FP-10 (no state).

import { LABEL_MIN_PX } from './register.js';

/** @typedef {{x: number, y: number, w: number, h: number}} Rect a screen rect */
/** @typedef {{x: number, y: number}} Point a screen point */

/** a label's line box, in its size's em */
export const LINE_BOX = 1.2;
/** the alpha at and above which a place drawn through a crossfade is the stronger */
export const STRONGER = 0.5;
const ELLIPSIS = '…';

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
 * 'cut' — one line, cut to the width ending in its ellipsis (a first line);
 * 'fill' — wrapped at its spaces down to its place's bottom, a word wider than the place and the last line kept ending in the ellipsis (a first line given room for several)
 */

/**
 * @typedef {Object} Part — a stretch of a label in one size and ink
 * @property {string} text its white space collapsed as it is set; an empty part sets nothing and is no part
 * @property {number} px the size its rule asks for; set at `sizeOf(px)`
 * @property {string} ink
 * @property {Fit} fit
 * @property {string} [weight] its face's weight; the regular where absent
 */

/** @typedef {'board' | 'cluster' | 'frame' | 'mark' | 'doc' | 'connection' | 'tail' | 'pip'} LabelKind the place a label names; 'connection' a mid connection's count; 'tail' a tail's far end in words, or its count (issue #132); 'pip' a trail pip's number, which P-RENDER draws over the labels with the trail and the pass never sets */

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
 * @property {Part[]} parts in order down from its first line, each set below the one before; a part left out takes every part after it out with it, so the first, its head, set or the label left out whole
 */

/**
 * @typedef {Object} Shape — a place's drawn shape, which no other place's label may meet
 * @property {string} place
 * @property {Rect} rect
 * @property {number} alpha
 */

/**
 * @typedef {Object} SetLine — one line the pass set
 * @property {string} text
 * @property {number} px the size it is set at
 * @property {string} ink
 * @property {string} weight
 * @property {Rect} rect the room it takes: its measured width, one line box tall
 */

/**
 * @typedef {Object} SetLabel — a label the pass set: the lines of the parts it set
 * @property {LabelKind} kind
 * @property {string} place
 * @property {Rect} within
 * @property {number} alpha
 * @property {string | null} plate
 * @property {SetLine[]} lines
 */

/**
 * @typedef {'faint' | 'width' | 'height' | 'view' | 'meets' | 'after'} Reason why a part was left out:
 * its place drawn the weaker through a crossfade; a word, or a line never cut, wider than its place; its lines past its place's bottom; reaching past the visible view — under the one line, or past the viewport; meeting another place's shape or a label set before it; a part before it left out
 */

/**
 * @typedef {Object} LeftOut — a part the pass left out, and the rule that left it out
 * @property {LabelKind} kind
 * @property {string} place
 * @property {string} text
 * @property {Reason} reason
 */

/** @typedef {(text: string, px: number, weight: string) => number} Measure a string's width set at a size and weight, in px */

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

/**
 * The longest start of a text that fits with its ellipsis, or null where not
 * even its first character does.
 * @param {string} text
 * @param {(s: string) => boolean} fits
 */
function cutTo(text, fits) {
  const ch = [...text];
  const at = (/** @type {number} */ n) => ch.slice(0, n).join('').trimEnd() + ELLIPSIS;
  let lo = 0, hi = ch.length;
  while (lo < hi) { const mid = (lo + hi + 1) >> 1; if (fits(at(mid))) lo = mid; else hi = mid - 1; }
  return lo ? at(lo) : null;
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
  const text = p.text.trim().replace(/\s+/g, ' ');
  if (p.fit === 'one') return fits(text) ? [text] : null;
  if (p.fit === 'cut') { const c = fits(text) ? text : cutTo(text, fits); return c ? [c] : null; }
  const words = text.split(' ');
  if (p.fit === 'wrap') return words.every(fits) ? wrapWords(words, fits) : null;
  /** @type {string[]} */
  const fitted = [];
  for (const w of words) { const c = fits(w) ? w : cutTo(w, fits); if (!c) return null; fitted.push(c); }
  const lines = wrapWords(fitted, fits);
  if (lines.length <= rows) return lines;
  const kept = lines.slice(0, rows), last = kept[rows - 1];
  if (!last.endsWith(ELLIPSIS)) kept[rows - 1] = fits(last + ELLIPSIS) ? last + ELLIPSIS : cutTo(last, fits) || last;
  return kept;
}

/**
 * The pass: each label set in order where its place holds it (see the head),
 * the parts it could not set left out with the rule that left each out.
 * @param {Label[]} labels in the order their places were drawn
 * @param {Shape[]} shapes every place's shape the frame drew
 * @param {Rect} view the visible view (P-CAM's `visibleView`): the viewport below the one line
 * @param {Measure} measure
 * @returns {{set: SetLabel[], out: LeftOut[]}}
 */
export function setLabels(labels, shapes, view, measure) {
  /** @type {SetLabel[]} */
  const set = [];
  /** @type {LeftOut[]} */
  const out = [];
  /** @type {Rect[]} the lines set so far */
  const taken = [];
  const strong = shapes.filter((s) => s.alpha >= STRONGER);
  for (const l of labels) {
    const parts = l.parts.filter((p) => p.text.trim());
    /** @type {SetLine[]} */
    const lines = [];
    /** @type {Reason | null} */
    let why = l.alpha < STRONGER ? 'faint' : null;
    let y = l.y, i = 0;
    for (; i < parts.length && !why; i++) {
      const p = parts[i];
      const px = sizeOf(p.px), weight = p.weight || 'normal', lh = px * LINE_BOX;
      const width = l.align === 'center' ? 2 * Math.min(l.x - l.within.x, l.within.x + l.within.w - l.x) : l.within.x + l.within.w - l.x;
      const fits = (/** @type {string} */ s) => measure(s, px, weight) <= width + 1e-6;
      const rows = Math.floor((l.within.y + l.within.h - y) / lh + 1e-6);
      const texts = rows < 1 ? null : linesOf(p, rows, fits);
      if (rows < 1) why = 'height';
      else if (!texts) why = 'width';
      else if (texts.length > rows) why = 'height';
      if (!texts || why) break;
      const mine = texts.map((s, k) => {
        const w = measure(s, px, weight);
        return { text: s, px, ink: p.ink, weight, rect: { x: l.align === 'center' ? l.x - w / 2 : l.x, y: y + k * lh, w, h: lh } };
      });
      for (const m of mine) {
        why = why || past(m.rect, l.within) || (past(m.rect, view) ? 'view' : null);
        if (!why && (strong.some((s) => s.place !== l.place && meets(m.rect, s.rect)) || taken.some((r) => meets(m.rect, r)))) why = 'meets';
      }
      if (why) break;
      lines.push(...mine);
      y += texts.length * lh;
    }
    if (lines.length) {
      set.push({ kind: l.kind, place: l.place, within: l.within, alpha: l.alpha, plate: l.plate, lines });
      for (const m of lines) taken.push(m.rect);
    }
    parts.slice(i).forEach((p, j) => out.push({ kind: l.kind, place: l.place, text: p.text, reason: j || !why ? 'after' : why }));
  }
  return { set, out };
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
