// BM — span-anchored beams over true text geometry (the structure record
// §3.2 "BM"; S-6 (a) a module beside the text layer). Layer 2. ENGINE-BOUND
// (its own canvas). State: VIEW — the last frame's bundles and the labels it
// set at their ends.
// It decides nothing of which links: it draws `LK.beams(addr)` for every
// mounted document at stage 3 with each link's `markOf` — its hue, its value,
// and its weight, the link lit at an arrival stroked heavier (foundations
// §2.1's register: "the followed link drawn heavier"). Each beam leaves the
// text at its span's own line, from the place's edge (foundations §2.1; S1
// Q1): it starts at the right edge of the block holding its span, level with
// the middle of the line-rect of the span's own bytes nearest the far end
// (`spanRects` with the span's width — its rects line by line, so at a wrap
// the line nearest the far end). The far end mounted, the beam ends at the far
// block's left edge, level with the far span's own line nearest the start — a
// whole-work end at the far article's first block; unmounted or off screen →
// THE EDGE STUB: the beam clipped at the visible view's border — the viewport
// below the one line, the cut P-CAM's `edgeStub` that P-RENDER's mid
// connections share — with a triangle on the true bearing and the far
// document's label at the stub (S1 Q3, load-bearing); off screen is outside
// that view. A link met from both its ends, or twice inside one document, is
// one beam (`bundlesOf`). The beams are bundled by the document they leave and
// their far document — one bundle per destination, its far document's label
// and its count at its end (§2.1), above the end, or below it where above
// would reach past the visible view's top (`labelPlace`) — each member stroked
// from its own line, the alpha thinned as the beams drawn grow (S1 Q4:
// opacity alone fails near ten co-located beams). Not built, the design's to
// settle (issue #9): the bundle's one stroke and where it leaves the edge, the
// route to a far end on the far side of the text, the saturation past which
// the bundles are counted and the card's list chooses the beams drawn, and
// what stands where stubs bound for different documents land so near that
// their labels meet.
// Carries: the wireframe's §17 (`drawBeams`, `pickRect`; its `edgeStub`
// P-CAM's, the cut both stubs share), S1's `buildBeams` canvas arm (the SVG
// arm DROPPED — S1's verdict).
// Rules: FP-1, FP-2, FP-8 (redrawn whole), FP-10 (reads LK, T-LAYER and
// L-LINE through their exports).

import * as LK from '../links/links.js';
import * as LAYER from '../text/layer.js';
import * as LINE from '../line/line.js';
import { sx, sy, viewport, visibleView, edgeStub, stubTriangle } from '../plane/camera.js';
import { docBox } from '../plane/projection.js';
import { COL } from '../plane/register.js';
import { doc, blockAt, place } from '../model/records.js';

/** @typedef {import('../links/links.js').Shown} Shown */
/** @typedef {{x: number, y: number, w: number, h: number}} Rect a screen rect */
/** @typedef {{x: number, y: number}} Point a screen point */

/**
 * @typedef {Object} Beam — one shown link, drawn from its span
 * @property {Shown} s the link as LK shows it at the document the beam leaves (`s.near`)
 * @property {Rect} line the near span's line the beam leaves at
 * @property {Point} from where it leaves: the near block's right edge, level with that line's middle
 * @property {Point} to where it ends — the far block's left edge, level with the far span's line nearest `from` — or, where `aimed`, the far document's centre
 * @property {boolean} aimed the far end is not laid out: the stroke runs toward `to` and is cut at the visible view's border
 * @property {boolean} stub the far end is unmounted, or its centre stands outside the visible view: the cut carries the triangle on the true bearing
 */

/**
 * @template B
 * @typedef {{near: string, far: string, members: B[]}} Bundle the beams one document sends to one far document (§2.1: one bundle per destination), in the order met
 */

/**
 * @typedef {Object} BeamLabel — a bundle's label as the last frame set it
 * @property {string} near
 * @property {string} far
 * @property {string} text
 * @property {boolean} stub its bundle ends in a stub
 * @property {Rect} rect the room it takes on screen: its width by the canvas's measure, its face's ascent above its baseline and descent below
 */

/**
 * @typedef {Object} Geometry — what `beamOf` lays a beam out from, on screen: the mounted articles' rects (T-LAYER's) and the documents' boxes, read through their owners' exports and handed in, so the rule is tested apart from the page
 * @property {(addr: string, pos: number, width: number) => Rect[]} lines the line rects of a span's own bytes in a mounted article; none where they are not laid out
 * @property {(addr: string, pos: number) => (Rect | null)} block the box of the block holding a position in a mounted article
 * @property {(addr: string) => (Rect | null)} first the box of a mounted article's first block: a whole-work end's anchor
 * @property {(addr: string) => boolean} mounted
 * @property {(addr: string) => Point} centre the centre of a document's box
 * @property {Rect} view the visible view (P-CAM's `visibleView`)
 */

/** the bundles' labels' face */
const LABEL_FACE = '10px ui-monospace, Menlo, monospace';

/** @type {HTMLCanvasElement | null} */
let canvas = null;
/** @type {CanvasRenderingContext2D | null} */
let ctx = null;
let DPR = 1;
/** @type {Bundle<Beam>[]} */
let built = [];
/** @type {BeamLabel[]} */
let labelsSet = [];

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
function pickRect(/** @type {Rect[]} */ rects, /** @type {number} */ tx, /** @type {number} */ ty) {
  let best = rects[0], bd = Infinity;
  for (const r of rects) { const dd = (r.x + r.w / 2 - tx) ** 2 + (r.y + r.h / 2 - ty) ** 2; if (dd < bd) { bd = dd; best = r; } }
  return best;
}
/**
 * Where a bundle's label is set beside its end: toward the view's middle,
 * its baseline 6 px above the end — or, where that would reach past the
 * visible view's top (a stub on the top border, the one line over it), its
 * top 6 px below the end.
 * @param {Point} end
 * @param {{w: number, ascent: number, descent: number}} m the label's measure
 * @param {Rect} seen the visible view
 * @returns {{x: number, y: number, align: 'left' | 'right', rect: Rect}} its baseline's start and the room it takes
 */
export function labelPlace(end, m, seen) {
  const right = end.x > seen.x + seen.w / 2, x = end.x + (right ? -14 : 14);
  const y = end.y - 6 - m.ascent < seen.y ? end.y + 6 + m.ascent : end.y - 6;
  return { x, y, align: right ? 'right' : 'left', rect: { x: right ? x - m.w : x, y: y - m.ascent, w: m.w, h: m.ascent + m.descent } };
}
/** the box holding every rect of a block (a block is laid out as one box, so one rect) */
function boundsOf(/** @type {Rect[]} */ rs) {
  const x0 = Math.min(...rs.map((r) => r.x)), y0 = Math.min(...rs.map((r) => r.y));
  return { x: x0, y: y0, w: Math.max(...rs.map((r) => r.x + r.w)) - x0, h: Math.max(...rs.map((r) => r.y + r.h)) - y0 };
}
/** the middle of a rect */
const mid = (/** @type {Rect} */ r) => ({ x: r.x + r.w / 2, y: r.y + r.h / 2 });

/**
 * A shown link's beam, by the head's rule; null where its near span has no
 * line laid out in its mounted article.
 * @param {Shown} s
 * @param {Geometry} g
 * @returns {Beam | null}
 */
export function beamOf(s, g) {
  const lines = g.lines(s.near, s.pos, s.width), block = g.block(s.near, s.pos);
  if (!lines.length || !block || !s.far) return null;
  /** the near span's line nearest a point, and the edge's point level with it */
  const leave = (/** @type {Point} */ toward) => { const line = pickRect(lines, toward.x, toward.y); return { line, from: { x: block.x + block.w, y: line.y + line.h / 2 } }; };
  const fe = s.farEnd;
  if (g.mounted(s.far)) {
    const at = fe && !fe.whole && fe.ordinal != null ? fe.ordinal : null;
    const farBlock = at != null ? g.block(s.far, at) : g.first(s.far);
    const farLines = !farBlock ? [] : at != null ? g.lines(s.far, at, (fe && fe.positions) || 1) : [farBlock];
    if (farBlock && farLines.length) {
      const { line, from } = leave(mid(farLines[0]));
      const there = pickRect(farLines, from.x, from.y);
      return { s, line, from, to: { x: farBlock.x, y: there.y + there.h / 2 }, aimed: false, stub: false };
    }
  }
  const c = g.centre(s.far);
  const { line, from } = leave(c);
  const v = g.view;
  return { s, line, from, to: c, aimed: true, stub: c.x < v.x || c.x > v.x + v.w || c.y < v.y || c.y > v.y + v.h || !g.mounted(s.far) };
}

/** a beam's identity: its link and its two ends, unordered — the same beam whichever end it is drawn from */
function endsOf(/** @type {Shown} */ s) {
  const fe = s.farEnd;
  const there = fe && !fe.whole && fe.ordinal != null ? `${s.far}@${fe.ordinal}+${fe.positions || 1}` : `${s.far}@whole`;
  return s.link.addr + ' ' + [`${s.near}@${s.pos}+${s.width}`, there].sort().join(' ');
}

/**
 * The beams in their bundles, in the order met: one bundle per document the
 * beams leave and far document they reach (§2.1: one bundle per
 * destination), and each beam once — a link met from both its ends, or from
 * both inside one document, is one beam between the same two ends, the
 * first met; a link whose endset holds two spans in one document keeps a
 * beam from each.
 * @template {{s: Shown}} B
 * @param {B[]} beams
 * @returns {Bundle<B>[]}
 */
export function bundlesOf(beams) {
  /** @type {Set<string>} */
  const seen = new Set();
  /** @type {Map<string, Bundle<B>>} */
  const out = new Map();
  for (const bm of beams) {
    const once = endsOf(bm.s);
    if (seen.has(once)) continue;
    seen.add(once);
    const key = bm.s.near + '>' + bm.s.far;
    const b = out.get(key);
    if (b) b.members.push(bm);
    else out.set(key, { near: bm.s.near, far: bm.s.far, members: [bm] });
  }
  return [...out.values()];
}

/** the visible view now: the viewport below the one line */
const seenNow = () => visibleView(LINE.bottom());

/** the page's geometry: T-LAYER's rects of the mounted articles, the camera's projection of the boxes, the visible view */
function pageGeometry(/** @type {Rect} */ seen) {
  /** the box of the block keyed by its first position in a mounted article */
  const box = (/** @type {string} */ addr, /** @type {number} */ pos) => { const rs = LAYER.spanRects(addr, pos); return rs ? boundsOf(rs) : null; };
  /** @type {Geometry} */
  const g = {
    lines: (addr, pos, width) => (LAYER.spanRects(addr, pos, width) || []).filter((r) => r.w > 0 && r.h > 0),
    block: (addr, pos) => { const b = blockAt(addr, pos); return b ? box(addr, b.pos) : null; },
    first: (addr) => box(addr, (doc(addr).blocks[0] || { pos: 1 }).pos),
    mounted: LAYER.isMounted,
    centre: (addr) => { const b = docBox(addr); return { x: sx(b.x + b.w / 2), y: sy(b.y + b.h / 2) }; },
    view: seen,
  };
  return g;
}

/** build the frame's bundles from LK, for every mounted document, against the visible view */
export function build(seen = seenNow()) {
  const g = pageGeometry(seen);
  /** @type {Beam[]} */
  const met = [];
  for (const addr of LAYER.mountedAddrs()) for (const s of LK.beams(addr)) { const bm = beamOf(s, g); if (bm) met.push(bm); }
  built = bundlesOf(met);
  return built;
}

/** draw the bundles, and each one's label at its first member's end — redrawn whole every frame (FP-8) */
export function draw() {
  labelsSet = [];
  if (!ctx || !canvas) return;
  const { VW, VH } = viewport();
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  ctx.clearRect(0, 0, VW, VH);
  const seen = seenNow();
  const set = build(seen);
  const n = count();
  if (!n) return;
  const alpha = Math.max(0.25, Math.min(0.85, 24 / n));
  /** where a beam's stroke ends: at its far end, or cut at the visible view's border on the way to it */
  const endOf = (/** @type {Beam} */ bm) => (bm.aimed ? edgeStub(bm.from, bm.to, seen) : bm.to);
  for (const b of set) {
    for (const bm of b.members.slice(0, 20)) {
      const hue = bm.s.mark.hue;
      ctx.strokeStyle = hue; ctx.globalAlpha = alpha * bm.s.mark.value; ctx.lineWidth = 1.6 * bm.s.mark.weight;
      ctx.setLineDash(bm.s.linker === 'others' ? [5, 4] : []);
      const { x: x0, y: y0 } = bm.from, end = endOf(bm), { x: x1, y: y1 } = end;
      const mx = (x0 + x1) / 2;
      ctx.beginPath(); ctx.moveTo(x0, y0); ctx.bezierCurveTo(mx, y0, mx, y1, x1, y1); ctx.stroke(); ctx.setLineDash([]);
      if (bm.stub) {
        const [p, q, r] = stubTriangle(end, bm.to);
        ctx.fillStyle = hue; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.lineTo(r.x, r.y); ctx.closePath(); ctx.fill();
      }
    }
    // the bundle's label at its end: the far document's label (its address past the region's prefix) and its count
    const first = b.members[0];
    const p = place(b.far);
    const text = b.far + (p && p.label ? ' · ' + p.label.slice(0, 32) : '') + (b.members.length > 1 ? ` · ${b.members.length}` : '') + (doc(b.far).refused === 'unregistered' ? ' · ?' : '');
    ctx.globalAlpha = 1; ctx.fillStyle = COL.text; ctx.font = LABEL_FACE;
    const m = ctx.measureText(text);
    const at = labelPlace(endOf(first), { w: m.width, ascent: m.fontBoundingBoxAscent, descent: m.fontBoundingBoxDescent }, seen);
    ctx.textAlign = at.align;
    ctx.fillText(text, at.x, at.y);
    labelsSet.push({ near: b.near, far: b.far, text, stub: first.stub, rect: at.rect });
    ctx.textAlign = 'left';
  }
  ctx.globalAlpha = 1;
}

/** the beam endpoints, each with the line it leaves at, its near document and its span's position (the gate's layout case holds each endpoint to its span's own line, at the article's edge) */
export function anchors() {
  return built.flatMap((b) => b.members).map((bm) => ({ link: bm.s.link.addr, near: bm.s.near, pos: bm.s.pos, x: bm.from.x, y: bm.from.y, rect: bm.line, stub: bm.stub, far: bm.s.far }));
}
/** the labels the last frame set, one per bundle (the gate's layout case holds the stubs to theirs) */
export const labels = () => labelsSet.slice();
/** the built set's size: the beams its bundles hold */
export const count = () => built.reduce((n, b) => n + b.members.length, 0);
