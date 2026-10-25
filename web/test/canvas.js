// A recording context — a stand-in for a canvas's 2D context under
// `web/test/`, never imported by the page, for the pure tests of the modules
// that stroke the page's curves (BM's beams, SC's lines between the panes)
// and draw the plane's frame (P-RENDER): it keeps each stroke as it was made
// — its stroke style, its dash, its cap, its width, where its path began, the
// cubic it drew from there and where its last straight segment ended — each
// fill's style, each rect it filled with its style,
// and each string set on it with its fill style, and
// draws nothing; a string is measured at 0.6 em a character of the size its
// font names, whatever face it names. Its cap starts
// round, as a context another drawer left so would, so a stroke that holds to
// a cap sets it.

/**
 * @typedef {Object} Stroke — one stroke as it was made
 * @property {string} hue its stroke style
 * @property {number[]} dash its dash pattern
 * @property {string} cap its line cap
 * @property {number} width its line width
 * @property {{x: number, y: number}} start where its path began
 * @property {Array<{x: number, y: number}>} curve the cubic's two control points and its end, where its path drew one; none where it drew none
 * @property {{x: number, y: number} | null} line where its last straight segment ended, where its path drew one; null where it drew none
 */

/** a recording context, and the strokes, fills, filled rects and strings it keeps */
export function recorder() {
  /** @type {Stroke[]} */
  const strokes = [];
  /** @type {string[]} */
  const fills = [];
  /** @type {string[]} every string set on it, in order */
  const texts = [];
  /** @type {Array<{text: string, ink: string}>} every string set on it with the fill style it was set in, in order */
  const inked = [];
  /** @type {Array<{x: number, y: number, w: number, h: number, fill: string}>} every rect it filled, with the style it was filled in, in order */
  const rects = [];
  /** @type {number[]} */
  let dash = [];
  let start = { x: NaN, y: NaN };
  /** @type {Array<{x: number, y: number}>} */
  let curve = [];
  /** @type {{x: number, y: number} | null} */
  let line = null;
  const none = () => {};
  const ctx = {
    strokeStyle: '', fillStyle: '', lineCap: 'round', lineWidth: 1, globalAlpha: 1, font: '10px monospace', textAlign: 'left', textBaseline: 'alphabetic',
    setLineDash: (/** @type {number[]} */ d) => { dash = [...d]; },
    beginPath: () => { start = { x: NaN, y: NaN }; curve = []; line = null; },
    moveTo: (/** @type {number} */ x, /** @type {number} */ y) => { start = { x, y }; },
    bezierCurveTo: (/** @type {number} */ x1, /** @type {number} */ y1, /** @type {number} */ x2, /** @type {number} */ y2, /** @type {number} */ x, /** @type {number} */ y) => { curve = [{ x: x1, y: y1 }, { x: x2, y: y2 }, { x, y }]; },
    lineTo: (/** @type {number} */ x, /** @type {number} */ y) => { line = { x, y }; },
    closePath: none, save: none, restore: none, translate: none, rotate: none,
    setTransform: none, strokeRect: none, arc: none, arcTo: none,
    fillRect: (/** @type {number} */ x, /** @type {number} */ y, /** @type {number} */ w, /** @type {number} */ h) => { rects.push({ x, y, w, h, fill: ctx.fillStyle }); },
    stroke: () => { strokes.push({ hue: ctx.strokeStyle, dash, cap: ctx.lineCap, width: ctx.lineWidth, start, curve, line }); },
    fill: () => { fills.push(ctx.fillStyle); },
    fillText: (/** @type {string} */ s) => { texts.push(s); inked.push({ text: s, ink: ctx.fillStyle }); },
    measureText: (/** @type {string} */ s) => ({ width: [...s].length * 0.6 * Number((/([\d.]+)px/.exec(ctx.font) || [0, 10])[1]) }),
  };
  return { ctx: /** @type {CanvasRenderingContext2D} */ (/** @type {unknown} */ (ctx)), strokes, fills, texts, inked, rects };
}
