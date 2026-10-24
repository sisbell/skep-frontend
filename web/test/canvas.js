// A RECORDING CONTEXT — a stand-in for a canvas's 2D context under
// `web/test/`, never imported by the page, for the pure tests of the modules
// that stroke the page's curves (BM's beams, SC's lines between the panes)
// and draw the plane's frame (P-RENDER): it keeps each stroke as it was made
// — its stroke style, its dash, its cap, where its path began and the cubic
// it drew from there — each fill's style, and each string set on it, and
// draws nothing; a string is measured at 0.6 em a character of the size its
// font names, the monospace face the page sets its labels in. Its cap starts
// round, as a context another drawer left so would, so a stroke that holds to
// a cap sets it.

/**
 * @typedef {Object} Stroke — one stroke as it was made
 * @property {string} hue its stroke style
 * @property {number[]} dash its dash pattern
 * @property {string} cap its line cap
 * @property {{x: number, y: number}} start where its path began
 * @property {Array<{x: number, y: number}>} curve the cubic's two control points and its end, where its path drew one; none where it drew none
 */

/** a recording context, and the strokes, fills and strings it keeps */
export function recorder() {
  /** @type {Stroke[]} */
  const strokes = [];
  /** @type {string[]} */
  const fills = [];
  /** @type {string[]} every string set on it, in order */
  const texts = [];
  /** @type {number[]} */
  let dash = [];
  let start = { x: NaN, y: NaN };
  /** @type {Array<{x: number, y: number}>} */
  let curve = [];
  const none = () => {};
  const ctx = {
    strokeStyle: '', fillStyle: '', lineCap: 'round', lineWidth: 1, globalAlpha: 1, font: '10px monospace', textAlign: 'left', textBaseline: 'alphabetic',
    setLineDash: (/** @type {number[]} */ d) => { dash = [...d]; },
    beginPath: () => { start = { x: NaN, y: NaN }; curve = []; },
    moveTo: (/** @type {number} */ x, /** @type {number} */ y) => { start = { x, y }; },
    bezierCurveTo: (/** @type {number} */ x1, /** @type {number} */ y1, /** @type {number} */ x2, /** @type {number} */ y2, /** @type {number} */ x, /** @type {number} */ y) => { curve = [{ x: x1, y: y1 }, { x: x2, y: y2 }, { x, y }]; },
    lineTo: none, closePath: none, save: none, restore: none, translate: none, rotate: none,
    setTransform: none, fillRect: none, strokeRect: none, arc: none, arcTo: none,
    stroke: () => { strokes.push({ hue: ctx.strokeStyle, dash, cap: ctx.lineCap, start, curve }); },
    fill: () => { fills.push(ctx.fillStyle); },
    fillText: (/** @type {string} */ s) => { texts.push(s); },
    measureText: (/** @type {string} */ s) => ({ width: [...s].length * 0.6 * Number((/([\d.]+)px/.exec(ctx.font) || [0, 10])[1]) }),
  };
  return { ctx: /** @type {CanvasRenderingContext2D} */ (/** @type {unknown} */ (ctx)), strokes, fills, texts };
}
