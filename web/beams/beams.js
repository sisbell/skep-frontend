// BM — span-anchored beams over true text geometry (the structure record
// §3.2 "BM"; S-6 (a) a module beside the text layer). Layer 2. ENGINE-BOUND
// (its own canvas). State: VIEW — the last frame's bundles and the labels it
// set at their ends.
// It decides nothing of which links, nor how each is marked: it draws
// `LK.beams(addr)` for every mounted document at stage 3, each beam with the
// mark LK gives it — the link's `markOf` at the document met, or, for a link
// met from both its ends, the one `mergedMark` makes of the two — its hue,
// its value, and its weight, the link lit at an arrival stroked heavier
// (foundations §2.1's register: "the followed link drawn heavier"), dashed
// for another's. Both its ends stand where the link's bytes stand NOW, never
// where its slot stores them (the slot names the bytes' permanent I-spans):
// each beam leaves the text at its span's own line, from the place's edge
// (foundations §2.1; S1 Q1): it starts at the right edge of the block
// holding the stretch it leaves from, level with the middle of the line-rect
// nearest the far end of every stretch LK says its end stands in (LK's
// `runs`; `spanRects` with each stretch's width — its rects line by line, so
// at a wrap the line nearest the far end). Its far end is where `project`
// says the far passage sits in the far document's current text (LK's
// `farRuns`; A-53: "the beam lands at the passage's current place
// (version-proof)"): that document mounted and laid out, the beam ends at
// the left edge of the block holding the far stretch nearest the start,
// level with that stretch's own line nearest it — a whole-work end, and a
// far end that FLOATS (LK's `floats`: that text holds none of it), at the far
// article's first block, where its follow lands (foundations §2.3); a far
// end nothing places — its projection not read, or refused — is aimed at its
// document's box as an end not laid out is, never at the stored position;
// unmounted or off screen → THE EDGE STUB: the beam clipped at the visible
// view's border — the viewport below the one line, the cut P-CAM's
// `edgeStub` that P-RENDER's mid connections share — with a triangle on the
// true bearing and the far document's label at the stub (S1 Q3,
// load-bearing). Off screen is outside that view, the end laid out or not: a
// mounted article's line stands wherever its box reaches, under the one line
// or past the viewport (T-LAYER mounts every article whose box meets the
// viewport, padded), and a far end not laid out stands at its document's
// box's centre. A link met from both its ends, or twice inside one document,
// is one beam — its two ends told apart by the spans the link stores,
// wherever they stand now — marked with what its meetings' marks share
// whichever document mounted first (`bundlesOf`; P44: "never a stack, never
// accumulated tint"). The beams are bundled by the document they leave and
// their far document — one bundle per destination, its far document's label
// and its count at its end (§2.1), and, where every beam it holds floats,
// "its passage is not in ⟨D⟩'s current text", the stub saying so before
// anyone follows it (foundations §2.3; `labelText`) — above the end, or
// below it where above
// would reach past the visible view's top, and none where it would not stand
// whole inside that view (`labelPlace`: a beam cut at its start, under the
// one line or past the viewport, sets no label there) — each member stroked
// from its own line, the alpha thinned as the beams drawn grow (S1 Q4:
// opacity alone fails near ten co-located beams). Not built, the design's to
// settle (issue #9): the bundle's one stroke and where it leaves the edge, the
// route to a far end on the far side of the text, the saturation past which
// the bundles are counted and the card's list chooses the beams drawn, and
// what stands where stubs bound for different documents land so near that
// their labels meet.
// Carries: the wireframe's §17 (`drawBeams`, `pickRect` — here `pickLine`,
// over every stretch an end stands in; its `edgeStub` P-CAM's, the cut both
// stubs share), S1's `buildBeams` canvas arm (the SVG arm DROPPED — S1's
// verdict).
// Rules: FP-1, FP-2, FP-8 (redrawn whole), FP-10 (reads LK, T-LAYER and
// L-LINE through their exports).

import * as LK from '../links/links.js';
import * as LAYER from '../text/layer.js';
import * as LINE from '../line/line.js';
import { sx, sy, viewport, visibleView, edgeStub, stubTriangle } from '../plane/camera.js';
import { docBox } from '../plane/projection.js';
import { COL } from '../plane/register.js';
import { doc, blockAt, place } from '../model/records.js';
import { t } from '../strings.js';

/** @typedef {import('../links/links.js').Shown} Shown */
/** @typedef {import('../plane/register.js').Mark} Mark */
/** @typedef {{x: number, y: number, w: number, h: number}} Rect a screen rect */
/** @typedef {{x: number, y: number}} Point a screen point */

/**
 * @typedef {Object} Beam — one shown link, drawn from where its end stands
 * @property {Shown} s the link as LK shows it at the document the beam leaves (`s.near`)
 * @property {Rect} line the line of the near end's stretches the beam leaves at
 * @property {Point} from where it leaves: the right edge of the block holding that line's stretch, level with the line's middle
 * @property {Point} to its far end: the left edge of the block holding the far stretch, level with that stretch's line nearest `from` — the far article's first block for a whole-work end or one that floats; where nothing is laid out there, the far document's centre
 * @property {boolean} aimed the stroke runs toward `to` and is cut at the visible view's border: the far end is not laid out, or it stands outside the visible view
 * @property {boolean} stub the far end is off screen — unmounted, or `to` outside the visible view: the cut carries the triangle on the true bearing
 */

/**
 * @template B
 * @typedef {{near: string, far: string, members: Array<B & {mark: Mark}>}} Bundle the beams one document sends to one far document (§2.1: one bundle per destination), in the order met, each with the mark it is drawn in: what its meetings' marks share (`bundlesOf`)
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
 * @property {(addr: string) => (Rect | null)} first the box of a mounted article's first block: the anchor of a whole-work end, and of one that floats
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

/** @typedef {{line: Rect, block: Rect}} Anchor a line of an end's stretch, with the box of the block holding that stretch */

/** the anchor whose line is nearest a point */
function pickLine(/** @type {Anchor[]} */ anchors, /** @type {Point} */ p) {
  let best = anchors[0], bd = Infinity;
  for (const a of anchors) { const r = a.line, dd = (r.x + r.w / 2 - p.x) ** 2 + (r.y + r.h / 2 - p.y) ** 2; if (dd < bd) { bd = dd; best = a; } }
  return best;
}
/** the lines of the stretches of a document's text, each with the block holding its stretch; none where they are not laid out */
function anchorsOf(/** @type {Geometry} */ g, /** @type {string} */ addr, /** @type {Array<{pos: number, width: number}>} */ runs) {
  return runs.flatMap((r) => { const block = g.block(addr, r.pos); return block ? g.lines(addr, r.pos, r.width).map((line) => ({ line, block })) : []; });
}
/** does a rect hold a point, its edges included? */
const holds = (/** @type {Rect} */ r, /** @type {Point} */ p) => p.x >= r.x && p.x <= r.x + r.w && p.y >= r.y && p.y <= r.y + r.h;
/** does a rect hold another whole? */
const holdsWhole = (/** @type {Rect} */ r, /** @type {Rect} */ q) => q.x >= r.x && q.y >= r.y && q.x + q.w <= r.x + r.w && q.y + q.h <= r.y + r.h;
/**
 * Where a bundle's label is set beside its end: toward the view's middle,
 * its baseline 6 px above the end — or, where that would reach past the
 * visible view's top (a stub on the top border, the one line over it), its
 * top 6 px below the end. Null where even so it would not stand whole inside
 * the visible view — an end cut at its beam's start, under the one line or
 * past the viewport — where the line would hide the label, or cut it through
 * at the line's edge, or no one would see it.
 * @param {Point} end
 * @param {{w: number, ascent: number, descent: number}} m the label's measure
 * @param {Rect} seen the visible view
 * @returns {{x: number, y: number, align: 'left' | 'right', rect: Rect} | null} its baseline's start and the room it takes
 */
export function labelPlace(end, m, seen) {
  const right = end.x > seen.x + seen.w / 2, x = end.x + (right ? -14 : 14);
  const y = end.y - 6 - m.ascent < seen.y ? end.y + 6 + m.ascent : end.y - 6;
  const rect = { x: right ? x - m.w : x, y: y - m.ascent, w: m.w, h: m.ascent + m.descent };
  return holdsWhole(seen, rect) ? { x, y, align: right ? 'right' : 'left', rect } : null;
}
/** the box holding every rect of a block (a block is laid out as one box, so one rect) */
function boundsOf(/** @type {Rect[]} */ rs) {
  const x0 = Math.min(...rs.map((r) => r.x)), y0 = Math.min(...rs.map((r) => r.y));
  return { x: x0, y: y0, w: Math.max(...rs.map((r) => r.x + r.w)) - x0, h: Math.max(...rs.map((r) => r.y + r.h)) - y0 };
}
/** the middle of a rect */
const mid = (/** @type {Rect} */ r) => ({ x: r.x + r.w / 2, y: r.y + r.h / 2 });

/**
 * Where a beam's far end anchors in its mounted far article: the lines of
 * every stretch `project` places the far passage in (LK's `farRuns`), each
 * with its block; the far article's first block for a whole-work end and for
 * one that floats, where its follow lands; null where nothing places it —
 * its projection not read, or refused — so it is aimed at the far
 * document's box, never at the position the link stores.
 * @param {Shown} s
 * @param {Geometry} g
 * @returns {Anchor[] | null}
 */
function farAnchors(s, g) {
  if (s.farWhole || LK.floats(s)) { const b = g.first(s.far); return b ? [{ line: b, block: b }] : []; }
  return s.farRuns ? anchorsOf(g, s.far, s.farRuns) : null;
}

/**
 * A shown link's beam, by the head's rule; null where none of the stretches
 * its near end stands in has a line laid out in its mounted article.
 * @param {Shown} s
 * @param {Geometry} g
 * @returns {Beam | null}
 */
export function beamOf(s, g) {
  const near = anchorsOf(g, s.near, s.runs);
  if (!near.length || !s.far) return null;
  /** the near end's line nearest a point, and the edge's point level with it */
  const leave = (/** @type {Point} */ toward) => { const a = pickLine(near, toward); return { line: a.line, from: { x: a.block.x + a.block.w, y: a.line.y + a.line.h / 2 } }; };
  const far = g.mounted(s.far) ? farAnchors(s, g) : null;
  if (far && far.length) {
    const { line, from } = leave(mid(far[0].line));
    const there = pickLine(far, from);
    const to = { x: there.block.x, y: there.line.y + there.line.h / 2 }, off = !holds(g.view, to);
    return { s, line, from, to, aimed: off, stub: off };
  }
  const c = g.centre(s.far);
  const { line, from } = leave(c);
  return { s, line, from, to: c, aimed: true, stub: !holds(g.view, c) || !g.mounted(s.far) };
}

/** a beam's identity: its link and its two ends as the link stores them, unordered — the same beam whichever end it is drawn from, wherever either end stands now */
function endsOf(/** @type {Shown} */ s) {
  const fe = s.farEnd;
  const there = fe ? (fe.whole ? `${fe.start}@whole` : `${fe.start}+${fe.width}`) : '';
  return s.link.addr + ' ' + [`${s.nearEnd.start}+${s.nearEnd.width}`, there].sort().join(' ');
}

/**
 * The beams in their bundles, in the order met: one bundle per document the
 * beams leave and far document they reach (§2.1: one bundle per
 * destination), and each beam once — a link met from both its ends, or from
 * both inside one document, is one beam between the same two ends, the
 * first met, marked with what every meeting's mark shares (LK's
 * `mergedMark`; P44): a link LK marks alike at both its documents keeps that
 * mark, and one that is the owner's at one and another's at the other is
 * drawn in the neutral hue, undashed, whichever is met first; a link whose
 * endset holds two spans in one document keeps a beam from each.
 * @template {{s: Shown}} B
 * @param {B[]} beams
 * @returns {Bundle<B>[]}
 */
export function bundlesOf(beams) {
  /** @type {Map<string, {first: B, marks: [Mark, ...Mark[]]}>} each beam's first meeting and every meeting's mark, by its identity */
  const once = new Map();
  for (const bm of beams) {
    const ends = endsOf(bm.s), m = once.get(ends);
    if (m) m.marks.push(bm.s.mark);
    else once.set(ends, { first: bm, marks: [bm.s.mark] });
  }
  /** @type {Map<string, Bundle<B>>} */
  const out = new Map();
  for (const { first, marks } of once.values()) {
    const member = { ...first, mark: LK.mergedMark(marks) };
    const key = first.s.near + '>' + first.s.far;
    const b = out.get(key);
    if (b) b.members.push(member);
    else out.set(key, { near: first.s.near, far: first.s.far, members: [member] });
  }
  return [...out.values()];
}

/**
 * A bundle's label (§2.1): its far document's address, its label from the
 * index cut to 32 characters, its count where it holds two beams or more, "?"
 * where the board will say nothing about that address — and, where every
 * beam it holds ends at a passage the far document's current text no longer
 * holds, "its passage is not in ⟨D⟩'s current text", the stub saying so
 * before anyone follows it (foundations §2.3; P44: what its members share,
 * so a bundle holding a beam that floats beside one that lands says neither).
 * @param {Bundle<{s: Shown}>} b
 * @returns {string}
 */
export function labelText(b) {
  const p = place(b.far);
  return b.far + (p && p.label ? ' · ' + p.label.slice(0, 32) : '') + (b.members.length > 1 ? ` · ${b.members.length}` : '') +
    (doc(b.far).refused === 'unregistered' ? ' · ?' : '') + (b.members.every((m) => LK.floats(m.s)) ? ' · ' + t('F.floating', { D: b.far }) : '');
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

/** draw the bundles, and each one's label at its first member's end where it stands whole in the visible view — redrawn whole every frame (FP-8) */
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
      const { hue, value, weight, linker } = bm.mark;
      ctx.strokeStyle = hue; ctx.globalAlpha = alpha * value; ctx.lineWidth = 1.6 * weight;
      ctx.setLineDash(linker === 'others' ? [5, 4] : []);
      const { x: x0, y: y0 } = bm.from, end = endOf(bm), { x: x1, y: y1 } = end;
      const mx = (x0 + x1) / 2;
      ctx.beginPath(); ctx.moveTo(x0, y0); ctx.bezierCurveTo(mx, y0, mx, y1, x1, y1); ctx.stroke(); ctx.setLineDash([]);
      if (bm.stub) {
        const [p, q, r] = stubTriangle(end, bm.to);
        ctx.fillStyle = hue; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.lineTo(r.x, r.y); ctx.closePath(); ctx.fill();
      }
    }
    // the bundle's label at its end
    const first = b.members[0];
    const text = labelText(b);
    ctx.globalAlpha = 1; ctx.fillStyle = COL.text; ctx.font = LABEL_FACE;
    const m = ctx.measureText(text);
    const at = labelPlace(endOf(first), { w: m.width, ascent: m.fontBoundingBoxAscent, descent: m.fontBoundingBoxDescent }, seen);
    if (!at) continue;
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
/** the labels the last frame set, one per bundle whose label stands whole in the visible view (the gate's layout case holds the stubs to theirs) */
export const labels = () => labelsSet.slice();
/** the built set's size: the beams its bundles hold */
export const count = () => built.reduce((n, b) => n + b.members.length, 0);
