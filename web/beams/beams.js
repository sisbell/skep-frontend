// BM — the beams over the mounted articles' text (the structure record
// §3.2; S-6 (a)). Layer 2. ENGINE-BOUND: its own canvas. State: the last
// frame's bundles (`built`) and the labels it set at their ends
// (`labelsSet`), view state alone.
// It decides nothing of which links show, nor how each is marked: each
// frame it lays out LK's `beams` of every mounted document (`build`) and
// draws them whole (`draw`; FP-8). Each end of a beam is drawn in the mark
// LK gives the link at the document that end touches — the drawn end's
// `mark` at its near end, its `farMark` at its far end — whichever document
// drew it (FP-30): its hue, its value and its weight, a link lit at an
// arrival heavier (FP-21), dashed for another's (`inkOf`). Where the two
// ends' marks differ, the stroke changes colour once, at the first point
// along it as far from the far document's box as from the near one's — on
// the open ground between the two, inside neither (`changeAt`) — one stroke
// of one width with no dot or break at the change (`strokeIn`); a stub keeps
// its near end's colour to the border.
// Both ends stand where the link's bytes stand now, never where its slot
// stores them. A beam leaves the text at its span's own line, from the
// right edge of the part of the block holding that line, past the sign the
// column's edge holds level with it (`leaveAt`, `pastSigns`; foundations
// §2.1, §3.1; S1 Q1) — of the stretches LK's `runs` name, the line nearest
// the far end — and P-RENDER's tails leave a passage by the same rule. Its
// far end is where LK's `farRuns` place the far passage in the far
// document's current text (A-53): that document mounted, at the left edge
// of the block holding the far stretch nearest the start, level with that
// stretch's line; a whole-work end, and one that floats (LK's `floats`), at
// the far article's first block, where its follow lands (foundations §2.3);
// a far end not laid out — its document unmounted, or nothing placing it —
// at its document's box's centre. Where the far end stands in the visible
// view, the viewport below the one line, the beam ends there, mounted or
// not; outside it the beam is a stub, its stroke cut at the view's border
// on the true bearing (P-CAM's `edgeStub`, the cut P-RENDER's mid
// connections share) with a triangle and the bundle's label at the cut
// (foundations §2.1; S1 Q3); `beamTo` reads both from that one test. A link
// met from both its ends, or twice inside one document, is one beam,
// counted once, the first met kept (`endsOf`, `bundlesOf`; P44): its ends
// told apart by the document each is drawn at — a far end's the version
// its far box shows — and the span the link stores for it; one stored end
// drawn at two documents, the one that minted its bytes and one whose text
// transcludes them, is a beam from each.
// The beams are bundled by the document they leave and their far document,
// one bundle a destination (§2.1), each bundle marked at each end with what
// its beams' marks share there (LK's `mergedMark`): neutral only where its
// links take different colours at that end, a single link's never. Its
// label (`labelText`) is the far document's address, whole, in the
// identifier's face, its far end's words as its tail names them (LK's
// `farFaced`) cut on a word to WORDS_CH characters, the document's words in
// the reading face — the frame's labels whose words read alike once cut cut
// again to show where they differ (`bundleLabels`) — its count where it holds
// two beams or more, and, where
// every beam it holds says one state of what its far end's text holds
// (BM-HELD's `farSays`), those words, so the stub says it before anyone
// follows it; it is set above the end, or below it where above would reach
// past the visible view's top, and nowhere it would not stand whole inside
// that view (`labelPlace`). Figures: at most twenty beams a bundle are
// stroked; their alpha is 24 over the beams built, held between 0.25 and
// 0.85, times each mark's value; a stroke is 1.6 px times its mark's weight;
// labels are set at LABEL_PX, each run in its face (`labelRuns`; P-LABEL's
// `drawRun`), the client's figures tabular; a far end's words 32 characters
// at the most.
// The geometry it lays beams out from (`pageGeometry`) is T-LAYER's rects
// of the mounted articles — `spanRects`, else `lineBoxes` where a line
// stands in no part — the camera's projection of the boxes and the visible
// view below L-LINE, handed in so the rule is tested apart from the page.
// Rules: FP-1, FP-2, FP-8, FP-10, FP-21, FP-30.

import * as LK from '../links/links.js';
import * as LAYER from '../text/layer.js';
import * as LINE from '../line/line.js';
import { sx, sy, viewport, visibleView, edgeStub, stubTriangle } from '../plane/camera.js';
import { docBox } from '../plane/projection.js';
import { COL } from '../plane/register.js';
import { drawRun, runWidth, face, inFace, plain, runsOf, cutWords, apartTexts, LEAD_WORDS } from '../plane/labels.js';
import { doc, blockAt } from '../model/records.js';
import { CLIENT_CLOSE } from '../strings.js';
import { farSays } from './held.js';

/** @typedef {import('../links/links.js').Shown} Shown */
/** @typedef {import('../plane/register.js').Mark} Mark */
/** @typedef {{x: number, y: number, w: number, h: number}} Rect a screen rect */
/** @typedef {{x: number, y: number}} Point a screen point */
/** @typedef {[Point, Point, Point, Point]} Cubic a stroke's curve: its start, its two control points, its end */

/**
 * @typedef {Object} Ink — how a stretch of a stroke is drawn: a link's mark there, as a stroke takes it (`inkOf`)
 * @property {string} hue
 * @property {number[]} dash the canvas's dash pattern; none for a solid stroke
 */

/**
 * @typedef {Object} Beam — one shown link, drawn from where its end stands
 * @property {Shown} s the link as LK shows it at the document the beam leaves (`s.near`): the mark it takes there (`s.mark`), and the mark the document its far end touches gives it (`s.farMark`)
 * @property {Rect} line the line of the near end's stretches the beam leaves at
 * @property {Point} from where it leaves: the right edge of the block holding that line's stretch, level with the line's middle
 * @property {Point} to its far end: the left edge of the block holding the far stretch, level with that stretch's line nearest `from` — the far article's first block for a whole-work end or one that floats; where nothing is laid out there, the far document's box's centre
 * @property {boolean} stub the far end is off screen, `to` outside the visible view (foundations §2.1): the stroke is cut at the view's border, and the cut carries the triangle on the true bearing
 * @property {Point} end where the stroke ends: at `to`, or, for a stub, at the cut on the bearing to `to` (P-CAM's `edgeStub`)
 * @property {number | null} change where along its stroke (`strokeOf(from, end)`) its colour changes from its near end's mark to its far end's (`changeAt`); null where it changes nowhere: a stub, its near end's colour to the border, or two ends marked alike
 */

/**
 * @template B
 * @typedef {{near: string, far: string, members: B[], marks: {near: Mark, far: Mark}}} Bundle the beams one document sends to one far document (§2.1: one bundle per destination), each once, in the order met, and what their marks share at each end (`mergedMark`): neutral at an end where its links take different colours there, and only there (`bundlesOf`)
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
 * @property {(addr: string, pos: number) => Rect[]} block the boxes of the block holding a position in a mounted article, one for each column that holds a part of it; none where it is not laid out
 * @property {(addr: string) => (Rect | null)} first the box of a mounted article's first block: the anchor of a whole-work end, and of one that floats
 * @property {(addr: string, pos: number) => Rect[]} signs the signs its column's edge holds beside the block holding a position in a mounted article — its others' count, a withheld run's mark — where they stand; none elsewhere
 * @property {(addr: string) => boolean} mounted
 * @property {(addr: string) => Rect} box a document's box: a far end not laid out stands at its centre, and a beam's colour changes on the ground between two of them (`changeAt`)
 * @property {Rect} view the visible view (P-CAM's `visibleView`)
 */

/** the bundles' labels' size, in px */
const LABEL_PX = 10;

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

/** @typedef {{line: Rect, block: Rect, signs: Rect[]}} Anchor a line of an end's stretch, with the box of the part of the block holding that stretch that holds the line, and the signs its column's edge holds beside the block */

/** the anchor whose line is nearest a point */
function pickLine(/** @type {Anchor[]} */ anchors, /** @type {Point} */ p) {
  let best = anchors[0], bd = Infinity;
  for (const a of anchors) { const r = a.line, dd = (r.x + r.w / 2 - p.x) ** 2 + (r.y + r.h / 2 - p.y) ** 2; if (dd < bd) { bd = dd; best = a; } }
  return best;
}
/**
 * Where a drawn end leaves its document's mounted text (see the head): the
 * right edge of the part of the block holding the line it leaves at, level
 * with the line's middle, past the sign its column's edge holds there
 * (`pastSigns`) — toward a point, the line of its stretches nearest it (a
 * beam's, toward its far end); toward none, the last line of its last
 * stretch, where its symbol stands (a tail's, which has no far end on the
 * plane). Null where none of its stretches has a line laid out.
 * @param {Geometry} g
 * @param {string} addr the document it is drawn at
 * @param {Array<{pos: number, width: number}>} runs the stretches it stands in (LK's `runs`)
 * @param {Point | null} [toward]
 * @returns {{line: Rect, from: Point} | null}
 */
export function leaveAt(g, addr, runs, toward = null) {
  const near = anchorsOf(g, addr, runs);
  if (!near.length) return null;
  const a = toward ? pickLine(near, toward) : near[near.length - 1];
  return { line: a.line, from: { x: pastSigns(a), y: a.line.y + a.line.h / 2 } };
}
/**
 * Where a stroke leaving a line of a block starts across (foundations §3.1):
 * the right edge of the part of the block holding the line, else, where a
 * sign its column's edge holds stands level with the line, as far past that
 * sign as the sign stands past the text, so no stroke crosses a count or a
 * withheld run's mark.
 * @param {Anchor} a
 * @returns {number}
 */
export function pastSigns(a) {
  const right = a.block.x + a.block.w, m = a.line.y + a.line.h / 2;
  let x = right;
  for (const s of a.signs) if (s.x >= right - 0.5 && s.y - 0.5 <= m && m <= s.y + s.h + 0.5) x = Math.max(x, s.x + s.w + (s.x - right));
  return x;
}
/** the lines of the stretches of a document's text, each with the part of the block holding its stretch that holds the line (`partOf`) and the signs beside that block; none where they are not laid out */
function anchorsOf(/** @type {Geometry} */ g, /** @type {string} */ addr, /** @type {Array<{pos: number, width: number}>} */ runs) {
  return runs.flatMap((r) => {
    const parts = g.block(addr, r.pos);
    if (!parts.length) return [];
    const signs = g.signs(addr, r.pos);
    return g.lines(addr, r.pos, r.width).map((line) => ({ line, block: partOf(parts, line), signs }));
  });
}
/** the part of a block holding a line: the box whose height holds the line's middle and whose width meets the line, half a px either way; the first where none does */
function partOf(/** @type {Rect[]} */ parts, /** @type {Rect} */ line) {
  const m = line.y + line.h / 2;
  return parts.find((p) => p.y - 0.5 <= m && m <= p.y + p.h + 0.5 && p.x - 0.5 <= line.x + line.w && line.x <= p.x + p.w + 0.5) || parts[0];
}
/** does a rect hold a point, its edges included? */
const holds = (/** @type {Rect} */ r, /** @type {Point} */ p) => p.x >= r.x && p.x <= r.x + r.w && p.y >= r.y && p.y <= r.y + r.h;
/** does a rect hold another whole? */
const holdsWhole = (/** @type {Rect} */ r, /** @type {Rect} */ q) => q.x >= r.x && q.y >= r.y && q.x + q.w <= r.x + r.w && q.y + q.h <= r.y + r.h;
/**
 * Where a bundle's label is set beside its end: 14 px toward the view's
 * middle, its baseline 6 px above the end — or, where that would reach past the
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
/** the middle of a rect */
const mid = (/** @type {Rect} */ r) => ({ x: r.x + r.w / 2, y: r.y + r.h / 2 });

/**
 * A link's mark as a stroke takes it (see the head): its hue, dashed for
 * another's (B1-S4) — at each end of a beam, and of a reading scene's line
 * between its panes (SC). Its value and its weight are
 * the link's own, alike at every mark of it, and set on the stroke whole.
 * @param {Mark} m
 * @returns {Ink}
 */
export const inkOf = (m) => ({ hue: m.hue, dash: m.linker === 'others' ? [5, 4] : [] });
/** do two inks draw a stroke alike? */
const alike = (/** @type {Ink} */ a, /** @type {Ink} */ b) => a.hue === b.hue && a.dash.join() === b.dash.join();

/**
 * A beam's stroke from where it leaves to where it ends: leaving level and
 * arriving level, its two control points level with its two
 * ends at the middle of the run across — so the point at the half of its
 * parameter stands at that middle, midway between its two ends.
 * @param {Point} from
 * @param {Point} end
 * @returns {Cubic}
 */
export function strokeOf(from, end) {
  const mx = (from.x + end.x) / 2;
  return [from, { x: mx, y: from.y }, { x: mx, y: end.y }, end];
}

/**
 * The point at `t` along a stroke's curve: its start at 0, its end at 1.
 * @param {Cubic} c
 * @param {number} t
 * @returns {Point}
 */
export function pointOn([p0, p1, p2, p3], t) {
  const u = 1 - t, a = u * u * u, b = 3 * u * u * t, c = 3 * u * t * t, d = t * t * t;
  return { x: a * p0.x + b * p1.x + c * p2.x + d * p3.x, y: a * p0.y + b * p1.y + c * p2.y + d * p3.y };
}

/**
 * A stroke's curve cut at `t` into the stretch before it and the stretch after
 * (de Casteljau's construction): the two together exactly the one curve, the
 * first ending and the second starting at its point at `t`.
 * @param {Cubic} c
 * @param {number} t
 * @returns {[Cubic, Cubic]}
 */
export function cutAt([p0, p1, p2, p3], t) {
  const at = (/** @type {Point} */ p, /** @type {Point} */ q) => ({ x: p.x + (q.x - p.x) * t, y: p.y + (q.y - p.y) * t });
  const a = at(p0, p1), b = at(p1, p2), c = at(p2, p3), ab = at(a, b), bc = at(b, c), m = at(ab, bc);
  return [[p0, a, ab, m], [m, bc, c, p3]];
}

/** a point's distance from a rect: none inside it, its edges included */
const away = (/** @type {Rect} */ r, /** @type {Point} */ p) => Math.hypot(Math.max(r.x - p.x, 0, p.x - r.x - r.w), Math.max(r.y - p.y, 0, p.y - r.y - r.h));
/** the points along a stroke `changeAt` reads before it closes in on the change between two of them */
const CHANGE_SAMPLES = 64;
/** the halvings that close in on it, past which the point stands still at any size the plane draws */
const CHANGE_HALVINGS = 40;

/**
 * Where along a stroke joining two documents its colour changes (FP-30): the
 * parameter of the first point along it as far from the far document's box as
 * from the near one's — on the open ground between the two, inside neither,
 * for two documents that mark a link apart lie in two accounts' cells, each
 * box inside its own cell's margin (P-PROJ's `docBox`), and never meet. Null
 * where no point along it stands so: a stroke that starts no nearer its near
 * document than its far one, or never comes as near its far one.
 * @param {Cubic} c
 * @param {Rect} near the near document's box
 * @param {Rect} far the far document's box
 * @returns {number | null}
 */
export function changeAt(c, near, far) {
  /** has the stroke reached the far document's ground at `t`: as near its box as the near one's, or nearer? */
  const reached = (/** @type {number} */ t) => { const p = pointOn(c, t); return away(far, p) <= away(near, p); };
  if (reached(0)) return null;
  for (let i = 1; i <= CHANGE_SAMPLES; i++) {
    if (!reached(i / CHANGE_SAMPLES)) continue;
    let lo = (i - 1) / CHANGE_SAMPLES, hi = i / CHANGE_SAMPLES;
    for (let k = 0; k < CHANGE_HALVINGS; k++) { const t = (lo + hi) / 2; if (reached(t)) hi = t; else lo = t; }
    return hi;
  }
  return null;
}

/**
 * Stroke a curve in its near end's ink, or, cut where its colour changes
 * (`t`; `cutAt`), the stretch before in the near ink and the stretch after in
 * the far — one stroke of one width, with no dot or break at the change:
 * each stretch butt-capped at the one point,
 * so the two meet there and never overlap, which at a stroke's alpha would
 * set a dot, and each drawn from that point, so a dashed one begins in ink
 * where the other ends. Inks alike, or no change, it is stroked whole in the
 * near ink, its dash begun at its start. Its width and alpha are the
 * caller's, set on the context: a beam's (`draw`) and a reading scene's line
 * between its panes (SC).
 * @param {CanvasRenderingContext2D} c2d
 * @param {Cubic} c
 * @param {Ink} near
 * @param {Ink} far
 * @param {number | null} t
 */
export function strokeIn(c2d, c, near, far, t) {
  c2d.lineCap = 'butt';
  if (t == null || alike(near, far)) { stretch(c2d, c, near); return; }
  const [before, after] = cutAt(c, t);
  stretch(c2d, [before[3], before[2], before[1], before[0]], near);
  stretch(c2d, after, far);
}
/** stroke one stretch of a curve in one ink, its dash begun at the stretch's start */
function stretch(/** @type {CanvasRenderingContext2D} */ c2d, /** @type {Cubic} */ [p0, p1, p2, p3], /** @type {Ink} */ ink) {
  c2d.strokeStyle = ink.hue; c2d.setLineDash(ink.dash);
  c2d.beginPath(); c2d.moveTo(p0.x, p0.y); c2d.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y); c2d.stroke();
  c2d.setLineDash([]);
}

/**
 * Where a beam's far end anchors in its mounted far article: the lines of
 * every stretch `project` places the far passage in (LK's `farRuns`), each
 * with its block; the far article's first block for a whole-work end and for
 * one that floats, where its follow lands; null where nothing places it —
 * its projection not read, or refused — so it stands at the far document's
 * box's centre, never at the position the link stores.
 * @param {Shown} s
 * @param {Geometry} g
 * @returns {Anchor[] | null}
 */
function farAnchors(s, g) {
  if (s.farWhole || LK.floats(s)) { const b = g.first(s.farAt); return b ? [{ line: b, block: b, signs: [] }] : []; }
  return s.farRuns ? anchorsOf(g, s.farAt, s.farRuns) : null;
}

/**
 * A beam from `from` to its far end `to`, by where `to` stands (foundations
 * §2.1): inside the visible view, its stroke ends at `to`, mounted or not;
 * outside it, the beam is a
 * stub, its stroke cut at the view's border on the bearing to `to` (P-CAM's
 * `edgeStub`). Every beam `beamOf` lays out is made here, so its stub and
 * where its stroke ends — and its bundle's label with it — are read from the
 * one test against the one view. A stub keeps its near end's colour to the
 * border; a beam ending in view whose two ends' marks differ changes colour
 * once, between its two documents' boxes (`changeAt`).
 * @param {Shown} s
 * @param {Rect} line
 * @param {Point} from
 * @param {Point} to
 * @param {Geometry} g
 * @returns {Beam}
 */
function beamTo(s, line, from, to, g) {
  const stub = !holds(g.view, to), end = stub ? edgeStub(from, to, g.view) : to;
  const change = stub || alike(inkOf(s.mark), inkOf(s.farMark)) ? null : changeAt(strokeOf(from, end), g.box(s.near), g.box(s.farAt));
  return { s, line, from, to, stub, end, change };
}

/**
 * A shown link's beam, by the head's rule; null where its far end names no
 * document, or where none of the stretches its near end stands in has a line
 * laid out in its mounted article.
 * @param {Shown} s
 * @param {Geometry} g
 * @returns {Beam | null}
 */
export function beamOf(s, g) {
  if (!s.far) return null;
  const far = g.mounted(s.farAt) ? farAnchors(s, g) : null;
  if (far && far.length) {
    const left = leaveAt(g, s.near, s.runs, mid(far[0].line));
    if (!left) return null;
    const there = pickLine(far, left.from);
    return beamTo(s, left.line, left.from, { x: there.block.x, y: there.line.y + there.line.h / 2 }, g);
  }
  const c = mid(g.box(s.farAt));
  const left = leaveAt(g, s.near, s.runs, c);
  return left && beamTo(s, left.line, left.from, c, g);
}

/** a beam's identity: its link and its two ends, unordered, each the document it stands at — the near end the one drawing it, the far end the version its far box shows, which the far end is placed in (LK's `farAt`) — with the key of the span the link stores for it (LK's `endKey`): the same beam whichever end it is drawn from, whichever version a box shows, wherever either end stands now, and a beam from each document one stored end is drawn at */
function endsOf(/** @type {Shown} */ s) {
  const there = s.farEnd ? `${s.farAt || s.far} ${LK.endKey(s.farEnd)}` : '';
  return s.link.addr + ' ' + [`${s.near} ${LK.endKey(s.nearEnd)}`, there].sort().join(' | ');
}

/**
 * The beams in their bundles, in the order met: one bundle per document the
 * beams leave and far document they reach (§2.1), and each beam once — a
 * link met from both its ends, or from both inside one document, is one
 * beam between the same two ends (`endsOf`: each end's document and stored
 * span), counted once, the first met kept as it was met, for each end's mark
 * is its own document's whichever end drew it (LK's `mark` and `farMark`;
 * FP-30); a link whose
 * endset holds two spans in one document keeps a beam from each, and so does
 * one stored end drawn at two documents, the one that minted its bytes and
 * one transcluding them. Each bundle is marked at each end with what its
 * beams' marks share there (LK's `mergedMark`; P44): neutral where its links
 * take different colours at that end, a single link's mark its own.
 * @template {{s: Shown}} B
 * @param {B[]} beams
 * @returns {Bundle<B>[]}
 */
export function bundlesOf(beams) {
  /** @type {Map<string, B>} each beam's first meeting, by its identity */
  const once = new Map();
  for (const bm of beams) { const ends = endsOf(bm.s); if (!once.has(ends)) once.set(ends, bm); }
  /** @type {Map<string, {near: string, far: string, members: [B, ...B[]]}>} */
  const out = new Map();
  for (const first of once.values()) {
    const key = first.s.near + '>' + first.s.far;
    const b = out.get(key);
    if (b) b.members.push(first);
    else out.set(key, { near: first.s.near, far: first.s.far, members: [first] });
  }
  return [...out.values()].map((b) => ({ ...b, marks: { near: shared(b.members, (s) => s.mark), far: shared(b.members, (s) => s.farMark) } }));
}

/** what a bundle's beams' marks share at one of its ends (LK's `mergedMark`) */
function shared(/** @type {[{s: Shown}, ...Array<{s: Shown}>]} */ members, /** @type {(s: Shown) => Mark} */ at) {
  const [first, ...rest] = members;
  return LK.mergedMark([at(first.s), ...rest.map((m) => at(m.s))]);
}

/**
 * A bundle's label (§2.1): its far document's address, whole, then its far
 * end's words as its tail would name them (LK's `farFaced`: its first line,
 * or the client's words in its place, bracketed) cut on a word to WORDS_CH
 * characters (P-LABEL's `cutWords`), its count where it holds two beams or
 * more — and, where every beam it holds says the same of what its far end's
 * text holds (BM-HELD's `farSays`), those words: "its passage is not in ⟨D⟩'s current
 * text" where every one floats, BM-HELD's line where every one's text holds
 * only part of it, or all of it in pieces, or the board would not tell
 * (FP-21), the stub saying so before anyone follows it (foundations §2.3;
 * P44: what its members share, so a bundle holding a beam that floats
 * beside one that lands says neither). A far document the board will say
 * nothing of is drawn nowhere, so no beam reaches it: its tail names it.
 * @param {Bundle<{s: Shown}>} b
 * @returns {string}
 */
export function labelText(b) { return labelRuns(b).map((r) => r.text).join(''); }

/** the characters of a far end's words a bundle's label sets at the most, cut on a word */
export const WORDS_CH = 32;

/**
 * A bundle's far end's words, whole and as its label sets them (see
 * `labelText`): each stretch marked in its face (P-LABEL's `inFace`), cut on
 * a word to WORDS_CH characters, LEAD_WORDS of them kept at the least; none
 * set where they hold none or not even that many fit.
 * @param {Bundle<{s: Shown}>} b
 * @returns {{full: string, shown: string | null, close: string, fits: (s: string) => boolean}}
 */
function farOf(b) {
  const runs = LK.farFaced(b.members[0].s), last = runs[runs.length - 1];
  const full = runs.map((r) => (r.face === 'client' ? r.text : inFace(r.face, r.text))).join('');
  const close = last && last.face === 'client' && last.text === CLIENT_CLOSE ? CLIENT_CLOSE : '';
  const fits = (/** @type {string} */ s) => [...plain(s)].length <= WORDS_CH;
  return { full, close, fits, shown: !full ? null : fits(full) ? full : cutWords(full, fits, close, LEAD_WORDS) };
}

/**
 * A bundle's label (`labelText`) as runs in their faces (P-REG's FACE): the
 * far document's address the identifier's, its words in theirs — the
 * document's words the reading face's — the rest the client's.
 * @param {Bundle<{s: Shown}>} b
 * @param {string | null} [words] its far end's words as set, where the frame's labels set them apart (`bundleLabels`); absent, its own cut (`farOf`)
 * @returns {import('../plane/labels.js').Run[]}
 */
export function labelRuns(b, words = farOf(b).shown) {
  const says = b.members.map((m) => farSays(m.s));
  const rest = (b.members.length > 1 ? ` · ${b.members.length}` : '') + (says[0] && says.every((w) => w === says[0]) ? ' · ' + says[0] : '');
  /** @type {import('../plane/labels.js').Run[]} */
  const out = [{ text: b.far, face: 'ident' }];
  if (words) out.push({ text: ' · ', face: 'client' }, ...runsOf(words, 'client'));
  if (rest) out.push({ text: rest, face: 'client' });
  return out;
}

/**
 * The frame's bundles' labels (`labelRuns`), their far ends' words that read
 * alike once cut cut again to show where they differ (P-LABEL's
 * `apartTexts`), each within WORDS_CH characters.
 * @param {Array<Bundle<{s: Shown}>>} bs
 * @returns {import('../plane/labels.js').Run[][]} in their order
 */
export function bundleLabels(bs) {
  const far = bs.map(farOf);
  const cut = far.map((f, i) => ({ f, i })).filter(({ f }) => f.shown && f.shown !== f.full);
  const now = apartTexts(cut.map(({ f }) => ({ shown: /** @type {string} */ (f.shown), full: f.full, close: f.close, fits: f.fits })));
  /** @type {Array<string | null>} */
  const words = far.map((f) => f.shown);
  cut.forEach(({ i }, k) => { words[i] = now[k]; });
  return bs.map((b, i) => labelRuns(b, words[i]));
}

/** the visible view now: the viewport below the one line */
const seenNow = () => visibleView(LINE.bottom());

/** a block's boxes from the boxes of its lines: one for each column they stand in, their union */
function byColumn(/** @type {Rect[]} */ lines) {
  /** @type {Map<number, Rect>} */
  const out = new Map();
  for (const r of lines) {
    const b = out.get(r.x);
    out.set(r.x, b ? { x: b.x, y: Math.min(b.y, r.y), w: Math.max(b.w, r.w), h: Math.max(b.y + b.h, r.y + r.h) - Math.min(b.y, r.y) } : { ...r });
  }
  return [...out.values()];
}

/** the page's geometry: T-LAYER's rects of the mounted articles — a line standing in no part where its fold sets it — the camera's projection of the boxes, the visible view; P-RENDER's tails leave the text through it too (`leaveAt`) */
export function pageGeometry(/** @type {Rect} */ seen = seenNow()) {
  /** the boxes of the block keyed by its first position in a mounted article: one for each of its parts standing, a column's each; where none stands, one for each column its lines are set in */
  const parts = (/** @type {string} */ addr, /** @type {number} */ pos) => {
    const rs = LAYER.spanRects(addr, pos) || [];
    if (rs.length) return rs;
    const b = blockAt(addr, pos);
    return b ? byColumn(LAYER.lineBoxes(addr, b.pos, b.width) || []) : [];
  };
  /** @type {Geometry} */
  const g = {
    lines: (addr, pos, width) => { const rs = (LAYER.spanRects(addr, pos, width) || []).filter((r) => r.w > 0 && r.h > 0); return rs.length ? rs : LAYER.lineBoxes(addr, pos, width) || []; },
    block: (addr, pos) => { const b = blockAt(addr, pos); return b ? parts(addr, b.pos) : []; },
    first: (addr) => parts(addr, (doc(addr).blocks[0] || { pos: 1 }).pos)[0] || null,
    signs: (addr, pos) => { const b = blockAt(addr, pos); return b ? LAYER.signRects(addr, b.pos) : []; },
    mounted: LAYER.isMounted,
    box: (addr) => { const b = docBox(addr), x = sx(b.x), y = sy(b.y); return { x, y, w: sx(b.x + b.w) - x, h: sy(b.y + b.h) - y }; },
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

/** draw the bundles — each beam's two ends in their own documents' marks, its stub's triangle in its near end's — and each one's label at its first member's end where it stands whole in the visible view — redrawn whole every frame (FP-8) */
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
  const labels = bundleLabels(set);
  for (const [k, b] of set.entries()) {
    for (const bm of b.members.slice(0, 20)) {
      const { mark, farMark } = bm.s;
      ctx.globalAlpha = alpha * mark.value; ctx.lineWidth = 1.6 * mark.weight;
      strokeIn(ctx, strokeOf(bm.from, bm.end), inkOf(mark), inkOf(farMark), bm.change);
      if (bm.stub) {
        const [p, q, r] = stubTriangle(bm.end, bm.to);
        ctx.fillStyle = mark.hue; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.lineTo(r.x, r.y); ctx.closePath(); ctx.fill();
      }
    }
    // the bundle's label at its end
    const first = b.members[0];
    const runs = labels[k], text = runs.map((r) => r.text).join('');
    ctx.globalAlpha = 1; ctx.fillStyle = COL.text;
    // its width run by run, and the tallest of its faces above and below its baseline
    let w = 0, ascent = 0, descent = 0;
    for (const r of runs) {
      w += runWidth(ctx, r, LABEL_PX, 'normal');
      ctx.font = face(LABEL_PX, 'normal', r.face);
      const m = ctx.measureText(r.text);
      ascent = Math.max(ascent, m.fontBoundingBoxAscent || 0); descent = Math.max(descent, m.fontBoundingBoxDescent || 0);
    }
    const at = labelPlace(first.end, { w, ascent, descent }, seen);
    if (!at) continue;
    let x = at.rect.x;
    for (const r of runs) x += drawRun(ctx, r, x, at.y, LABEL_PX, 'normal');
    labelsSet.push({ near: b.near, far: b.far, text, stub: first.stub, rect: at.rect });
  }
  ctx.globalAlpha = 1;
}

/** the beam endpoints, each with the line it leaves at, its near document and its span's position, for the gate */
export function anchors() {
  return built.flatMap((b) => b.members).map((bm) => ({ link: bm.s.link.addr, near: bm.s.near, pos: bm.s.pos, x: bm.from.x, y: bm.from.y, rect: bm.line, stub: bm.stub, far: bm.s.far }));
}
/** the labels the last frame set, one per bundle whose label stands whole in the visible view, for the gate */
export const labels = () => labelsSet.slice();
/** the built set's size: the beams its bundles hold */
export const count = () => built.reduce((n, b) => n + b.members.length, 0);
