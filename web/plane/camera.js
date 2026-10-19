// P-CAM — the camera (the structure record §3.2 "P-CAM"). Layer 2, pure
// view arithmetic beside the model (FP-11). PURE: the viewport size is an
// input set by the app on resize; `step(now)` takes the clock.
// State: VIEW — x, y, scale and the flight in progress. THE ONE OWNER
// (FP-10). Never serialized, never sent (FP-7: "the camera writes nothing";
// the gate's ledger proves it).
// Carries: the wireframe's §6 (`cam`, `sx`/`sy`/`wx`/`wy`, `homeView`,
// `viewForCell`, `setCam`, `clampCam`) and §11's `flyTo`/`stepAnim`/
// `viewForDoc`; S3's bounds (`minS` from the world, `maxS` 40) with the
// zoom-in bound widened per E18 (a): it never stops short of the reading
// scale of a place the projection draws (`setDeepest`).
// Rules: FP-1, FP-2, FP-7, FP-8, FP-9, FP-10, FP-11.

import { WORLD_W, WORLD_H, DOC_W, REP_FS, DEPTH_SOUND, G, LEAF } from './projection.js';

/**
 * @typedef {Object} View
 * @property {number} x world x at the viewport's centre
 * @property {number} y
 * @property {number} scale screen px per world unit
 */

/**
 * @typedef {Object} Flight
 * @property {number} t0
 * @property {number} ms
 * @property {View} from
 * @property {View} to
 * @property {boolean} arc
 * @property {number} outScale
 * @property {(() => void) | null} done
 */

/** @type {View & {anim: Flight | null}} */
export const cam = { x: WORLD_W / 2, y: WORLD_H / 2, scale: 1, anim: null };

/** the viewport, set on resize */
let VW = 1, VH = 1;
/** S3's constant bound; raised per E18 (a) by `setDeepest` */
let maxS = 40;

/** @param {number} vw @param {number} vh */
export function setViewport(vw, vh) { VW = Math.max(1, vw); VH = Math.max(1, vh); }
export function viewport() { return { VW, VH }; }

/** @param {number} wx @returns {number} */
export const sx = (wx) => (wx - cam.x) * cam.scale + VW / 2;
/** @param {number} wy @returns {number} */
export const sy = (wy) => (wy - cam.y) * cam.scale + VH / 2;
/** @param {number} px @returns {number} */
export const wx = (px) => (px - VW / 2) / cam.scale + cam.x;
/** @param {number} py @returns {number} */
export const wy = (py) => (py - VH / 2) / cam.scale + cam.y;

/**
 * E18 (a): the zoom-in bound reaches the reading scale of the deepest place
 * the projection draws — a document at continuation depth `depth` has an em
 * of REP_FS / 7^depth world units; reading scale is ~14 px per em.
 * @param {number} depth
 */
export function setDeepest(depth) {
  const d = Math.min(depth, DEPTH_SOUND);
  const fs = REP_FS / Math.pow(G[LEAF], d);
  maxS = Math.max(40, (30 / fs) * 1.2);
}
export function bounds() {
  return { minS: Math.min(VW / WORLD_W, VH / WORLD_H) * 0.5, maxS };
}

/** clamp the camera into the world's margin and the scale's bounds */
export function clamp() {
  const b = bounds();
  cam.scale = Math.max(b.minS, Math.min(b.maxS, cam.scale));
  const m = WORLD_W * 0.6;
  cam.x = Math.max(-m, Math.min(WORLD_W + m, cam.x));
  cam.y = Math.max(-m, Math.min(WORLD_H + m, cam.y));
}

/** @param {View} v set the view at once, ending any flight */
export function set(v) { cam.anim = null; cam.x = v.x; cam.y = v.y; cam.scale = v.scale; clamp(); }

/** the current view, copied */
export function view() { return { x: cam.x, y: cam.y, scale: cam.scale }; }

/**
 * The view that frames a cell (a board's or an account's) at the clamp —
 * HOME / WHOLE BOARD: "you can see everything" (law 13).
 * @param {{x:number,y:number,w:number,h:number}} c
 * @param {number} [fit]
 * @returns {View}
 */
export function viewForCell(c, fit = 0.92) {
  return { x: c.x + c.w / 2, y: c.y + c.h / 2, scale: Math.min(VW / c.w, VH / c.h) * fit };
}

/**
 * The view that reads a document: its em at `fsPx` screen px, centred on
 * the box, or on a fraction of its height (the span's place).
 * @param {{x:number,y:number,w:number,h:number}} box
 * @param {number} fs the document's em in world units
 * @param {number} [fsPx]
 * @param {number | null} [frac] 0–1 down the box, else the centre
 * @returns {View}
 */
export function viewForDoc(box, fs, fsPx = 12.5, frac = null) {
  const scale = fs > 0 ? fsPx / fs : 620 / DOC_W;
  const y = frac == null ? box.y + box.h / 2 : box.y + box.h * Math.max(0, Math.min(1, frac));
  return { x: box.x + box.w / 2, y, scale };
}

/**
 * A view framing several boxes.
 * @param {Array<{x:number,y:number,w:number,h:number}>} bs
 * @param {number} [fit]
 * @returns {View}
 */
export function viewForBoxes(bs, fit = 0.8) {
  const x0 = Math.min(...bs.map((b) => b.x)), y0 = Math.min(...bs.map((b) => b.y));
  const x1 = Math.max(...bs.map((b) => b.x + b.w)), y1 = Math.max(...bs.map((b) => b.y + b.h));
  return { x: (x0 + x1) / 2, y: (y0 + y1) / 2, scale: Math.min(VW / Math.max(1e-9, x1 - x0), VH / Math.max(1e-9, y1 - y0)) * fit };
}

const easeInOut = (/** @type {number} */ u) => (u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2);

/**
 * A flight to a view: a transform of the view (law 6), dipping out for far
 * targets (the wireframe's arc). Resolves when it lands.
 * @param {View} t
 * @param {number} [ms]
 * @param {number} [now]
 * @returns {Promise<void>}
 */
export function fly(t, ms = 620, now = performance.now()) {
  const from = view();
  const dist = Math.hypot(t.x - from.x, t.y - from.y);
  const minScale = Math.min(from.scale, t.scale);
  const outScale = minScale * Math.min(1, (VW * 0.7) / Math.max(1, dist * minScale));
  const arc = dist * minScale > VW * 1.5;
  return new Promise((res) => { cam.anim = { t0: now, ms, from, to: t, arc, outScale, done: res }; });
}

/**
 * Advance the flight. True while one is running.
 * @param {number} now
 * @returns {boolean}
 */
export function step(now) {
  if (!cam.anim) return false;
  const a = cam.anim, u = Math.min(1, (now - a.t0) / a.ms), e = easeInOut(u);
  cam.x = a.from.x + (a.to.x - a.from.x) * e;
  cam.y = a.from.y + (a.to.y - a.from.y) * e;
  const base = Math.exp(Math.log(a.from.scale) + (Math.log(a.to.scale) - Math.log(a.from.scale)) * e);
  if (a.arc) { const dip = Math.sin(Math.PI * e); cam.scale = Math.exp(Math.log(base) * (1 - dip) + Math.log(a.outScale) * dip); }
  else cam.scale = base;
  clamp();
  if (u >= 1) { const done = a.done; cam.anim = null; if (done) done(); }
  return true;
}

/** is a flight in progress? */
export const flying = () => cam.anim !== null;

/** pan by screen px (input never draws — FP-9; it moves view state) */
export function panBy(/** @type {number} */ dx, /** @type {number} */ dy) { cam.anim = null; cam.x -= dx / cam.scale; cam.y -= dy / cam.scale; clamp(); }

/** zoom by a factor about a screen point */
export function zoomAt(/** @type {number} */ factor, /** @type {number} */ px, /** @type {number} */ py) {
  cam.anim = null;
  const wxp = wx(px), wyp = wy(py);
  cam.scale *= factor; clamp();
  cam.x = wxp - (px - VW / 2) / cam.scale;
  cam.y = wyp - (py - VH / 2) / cam.scale;
  clamp();
}

/** the world box the viewport sees, padded in screen px */
export function viewportWorld(pad = 0) { return { x0: wx(-pad), y0: wy(-pad), x1: wx(VW + pad), y1: wy(VH + pad) }; }

/**
 * THE DIRTY MARK — view plumbing the loop reads (FP-9: a handler changes
 * view state and marks the frame dirty; it never draws). Any view owner
 * calls `markDirty()`; the app's loop takes it.
 */
let dirtyFlag = true;
export function markDirty() { dirtyFlag = true; }
export function takeDirty() { const d = dirtyFlag; dirtyFlag = false; return d; }
