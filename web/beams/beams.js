// BM — span-anchored beams over true text geometry (the structure record
// §3.2 "BM"; S-6 (a) a module beside the text layer). Layer 2. ENGINE-BOUND
// (its own canvas). State: VIEW — the built set of the last frame.
// It decides nothing of which links: it draws `LK.beams(addr)` for every
// mounted document at stage 3 with each link's `markOf`, anchored to the
// mounted spans' `getClientRects()` (per-line rects, S1 Q1 — the line-rect
// nearest the far end at a wrap), bundled by far document, the far end
// mounted → a beam to its span; unmounted or off screen → THE EDGE STUB: the
// beam clipped at the viewport with a triangle on the true bearing and the
// far document's label at the stub (S1 Q3, load-bearing); the degradation
// past saturation (S1 Q4: opacity alone fails near ten; bundling by far
// document carries it).
// Carries: the wireframe's §17 (`drawBeams`, `edgeStub`, `pickRect`), S1's
// `buildBeams` canvas arm (the SVG arm DROPPED — S1's verdict).
// Rules: FP-1, FP-2, FP-8 (redrawn whole), FP-10 (reads LK and T-LAYER
// through their exports).

import * as LK from '../links/links.js';
import * as LAYER from '../text/layer.js';
import { cam, sx, sy, viewport } from '../plane/camera.js';
import { docBox } from '../plane/projection.js';
import { COL } from '../plane/register.js';
import { doc, blockAt, place } from '../model/records.js';

/** @typedef {import('../links/links.js').Shown} Shown */

/**
 * @typedef {Object} Beam
 * @property {Shown} s
 * @property {{x:number,y:number,w:number,h:number}} a the near anchor rect
 * @property {{x:number,y:number,w:number,h:number} | null} b the far anchor rect, where mounted
 * @property {{x:number,y:number} | null} target the far document's centre where not
 * @property {boolean} stub
 * @property {string} far
 */

/** @type {HTMLCanvasElement | null} */
let canvas = null;
/** @type {CanvasRenderingContext2D | null} */
let ctx = null;
let DPR = 1;
/** @type {Beam[]} */
let built = [];

/** @param {HTMLCanvasElement} el */
export function attach(el) { canvas = el; ctx = el.getContext('2d'); resize(); }
export function resize() {
  if (!canvas) return;
  const { VW, VH } = viewport();
  DPR = Math.min(2, window.devicePixelRatio || 1);
  canvas.width = Math.round(VW * DPR); canvas.height = Math.round(VH * DPR);
  canvas.style.width = VW + 'px'; canvas.style.height = VH + 'px';
}

/** the line-rect nearest a point */
function pickRect(/** @type {Array<{x:number,y:number,w:number,h:number}>} */ rects, /** @type {number} */ tx, /** @type {number} */ ty) {
  let best = rects[0], bd = Infinity;
  for (const r of rects) { const dd = (r.x + r.w / 2 - tx) ** 2 + (r.y + r.h / 2 - ty) ** 2; if (dd < bd) { bd = dd; best = r; } }
  return best;
}
/** clip the ray from (x0,y0) toward (tx,ty) to the viewport border */
export function edgeStub(/** @type {number} */ x0, /** @type {number} */ y0, /** @type {number} */ tx, /** @type {number} */ ty, /** @type {number} */ VW, /** @type {number} */ VH) {
  const dx = tx - x0, dy = ty - y0; let t = Infinity;
  if (dx > 0) t = Math.min(t, (VW - 8 - x0) / dx); else if (dx < 0) t = Math.min(t, (8 - x0) / dx);
  if (dy > 0) t = Math.min(t, (VH - 8 - y0) / dy); else if (dy < 0) t = Math.min(t, (8 - y0) / dy);
  if (!isFinite(t) || t < 0) t = 0;
  return [x0 + dx * t, y0 + dy * t];
}
function docCentre(/** @type {string} */ addr) { const b = docBox(addr); return { x: sx(b.x + b.w / 2), y: sy(b.y + b.h / 2) }; }

/** the anchor rects of the block holding a position in a mounted document */
function anchorRects(/** @type {string} */ addr, /** @type {number} */ pos) {
  const b = blockAt(addr, pos);
  return b ? LAYER.spanRects(addr, b.pos) : null;
}

/** build the set from LK for every mounted document */
export function build() {
  const { VW, VH } = viewport();
  /** @type {Beam[]} */
  const out = [];
  for (const addr of LAYER.mountedAddrs()) {
    for (const s of LK.beams(addr)) {
      const near = anchorRects(addr, s.pos);
      if (!near) continue;
      const far = s.far;
      const farEnd = s.farEnd;
      const farRects = far && farEnd && !farEnd.whole && farEnd.ordinal != null && LAYER.isMounted(far) ? anchorRects(far, farEnd.ordinal) : far && LAYER.isMounted(far) ? LAYER.spanRects(far, (doc(far).blocks[0] || { pos: 1 }).pos) : null;
      if (farRects && farRects.length) {
        const a = pickRect(near, farRects[0].x, farRects[0].y);
        const b = pickRect(farRects, a.x, a.y);
        out.push({ s, a, b, target: null, stub: false, far });
      } else if (far) {
        const c = docCentre(far);
        const a = pickRect(near, c.x, c.y);
        const off = c.x < 0 || c.x > VW || c.y < 0 || c.y > VH || !LAYER.isMounted(far);
        out.push({ s, a, b: null, target: c, stub: off, far });
      }
    }
  }
  built = out;
  return out;
}

/** draw the set — redrawn whole every frame (FP-8) */
export function draw() {
  if (!ctx || !canvas) return;
  const { VW, VH } = viewport();
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  ctx.clearRect(0, 0, VW, VH);
  const set = build();
  if (!set.length) return;
  // bundle by (near document, far document): one stroke per bundle, its count at the end
  /** @type {Map<string, Beam[]>} */
  const bundles = new Map();
  for (const bm of set) { const k = bm.s.link.home + '>' + bm.far; const arr = bundles.get(k) || []; arr.push(bm); bundles.set(k, arr); }
  const n = set.length;
  const alpha = Math.max(0.25, Math.min(0.85, 24 / Math.max(1, n)));
  for (const [, arr] of bundles) {
    for (const bm of arr.slice(0, 20)) {
      const hue = bm.s.mark.hue;
      ctx.strokeStyle = hue; ctx.globalAlpha = alpha * bm.s.mark.value; ctx.lineWidth = 1.6;
      ctx.setLineDash(bm.s.linker === 'others' ? [5, 4] : []);
      const x0 = bm.a.x + bm.a.w, y0 = bm.a.y + bm.a.h / 2;
      let x1, y1;
      if (bm.b) { x1 = bm.b.x; y1 = bm.b.y + bm.b.h / 2; }
      else if (bm.target) { [x1, y1] = edgeStub(x0, y0, bm.target.x, bm.target.y, VW, VH); }
      else continue;
      const mx = (x0 + x1) / 2;
      ctx.beginPath(); ctx.moveTo(x0, y0); ctx.bezierCurveTo(mx, y0, mx, y1, x1, y1); ctx.stroke(); ctx.setLineDash([]);
      if (bm.stub && bm.target) {
        const ang = Math.atan2(bm.target.y - y1, bm.target.x - x1);
        ctx.fillStyle = hue; ctx.save(); ctx.translate(x1, y1); ctx.rotate(ang);
        ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-10, -5); ctx.lineTo(-10, 5); ctx.closePath(); ctx.fill(); ctx.restore();
      }
    }
    // the bundle's label at its end: the far document's label (its address past the region's prefix) and its count
    const first = arr[0];
    const x0 = first.a.x + first.a.w, y0 = first.a.y + first.a.h / 2;
    let x1, y1;
    if (first.b) { x1 = first.b.x; y1 = first.b.y + first.b.h / 2; } else if (first.target) { [x1, y1] = edgeStub(x0, y0, first.target.x, first.target.y, VW, VH); } else continue;
    const p = place(first.far);
    const lbl = first.far + (p && p.label ? ' · ' + p.label.slice(0, 32) : '') + (arr.length > 1 ? ` · ${arr.length}` : '') + (doc(first.far).refused === 'unregistered' ? ' · ?' : '');
    ctx.globalAlpha = 1; ctx.fillStyle = COL.text; ctx.font = '10px ui-monospace, Menlo, monospace';
    ctx.textAlign = x1 > VW / 2 ? 'right' : 'left';
    ctx.fillText(lbl, x1 + (x1 > VW / 2 ? -14 : 14), y1 - 6);
    ctx.textAlign = 'left';
  }
  ctx.globalAlpha = 1;
}

/** the beam endpoints and their anchor rects (the gate's layout case: every endpoint inside its anchor) */
export function anchors() {
  return built.map((bm) => ({ link: bm.s.link.addr, x: bm.a.x + bm.a.w, y: bm.a.y + bm.a.h / 2, rect: bm.a, stub: bm.stub, far: bm.far }));
}
/** the built set's size */
export const count = () => built.length;
