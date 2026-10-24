// A RECORDING CONTEXT — a stand-in for a canvas's 2D context under
// `web/test/`, never imported by the page, for the pure tests of the modules
// that stroke the page's curves (BM's beams, SC's lines between the panes):
// it keeps each stroke as it was made — its stroke style, its dash, its cap,
// where its path began and the cubic it drew from there — and each fill's
// style, and draws nothing. Its cap starts round, as a context another
// drawer left so would, so a stroke that holds to a cap sets it.

/**
 * @typedef {Object} Stroke — one stroke as it was made
 * @property {string} hue its stroke style
 * @property {number[]} dash its dash pattern
 * @property {string} cap its line cap
 * @property {{x: number, y: number}} start where its path began
 * @property {Array<{x: number, y: number}>} curve the cubic's two control points and its end, where its path drew one; none where it drew none
 */

/** a recording context, and the strokes and fills it keeps */
export function recorder() {
  /** @type {Stroke[]} */
  const strokes = [];
  /** @type {string[]} */
  const fills = [];
  /** @type {number[]} */
  let dash = [];
  let start = { x: NaN, y: NaN };
  /** @type {Array<{x: number, y: number}>} */
  let curve = [];
  const ctx = {
    strokeStyle: '', fillStyle: '', lineCap: 'round', lineWidth: 1, globalAlpha: 1,
    setLineDash: (/** @type {number[]} */ d) => { dash = [...d]; },
    beginPath: () => { start = { x: NaN, y: NaN }; curve = []; },
    moveTo: (/** @type {number} */ x, /** @type {number} */ y) => { start = { x, y }; },
    bezierCurveTo: (/** @type {number} */ x1, /** @type {number} */ y1, /** @type {number} */ x2, /** @type {number} */ y2, /** @type {number} */ x, /** @type {number} */ y) => { curve = [{ x: x1, y: y1 }, { x: x2, y: y2 }, { x, y }]; },
    lineTo: () => {}, closePath: () => {}, save: () => {}, restore: () => {}, translate: () => {}, rotate: () => {},
    stroke: () => { strokes.push({ hue: ctx.strokeStyle, dash, cap: ctx.lineCap, start, curve }); },
    fill: () => { fills.push(ctx.fillStyle); },
  };
  return { ctx: /** @type {CanvasRenderingContext2D} */ (/** @type {unknown} */ (ctx)), strokes, fills };
}
