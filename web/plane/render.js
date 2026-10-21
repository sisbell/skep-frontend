// P-RENDER — the canvas (the structure record §3.2 "P-RENDER"). Layer 2.
// ENGINE-BOUND. State: none of the model's or the view's — the canvas and
// the per-frame `stats` alone (FP-8: repainted whole on a dirty frame;
// nothing drawn on the canvas is updated in place).
// The board's region with its label and, at the floor, the residue
// statement, both in the cell of its user grid no account takes; at FAR the
// accounts as clusters with their counts — documents (exact, or a lower
// bound "≥ n" where the index runs from a floor), links held here (LK's
// fold; HOLLOW while any document's links are unread — "arriving"), the
// landmarks ◆ — the address above the density mark and each count on lines
// of its own beneath it (foundations §2.1: each count at a fixed place on
// its mark); at MID the account frames ("nothing here yet" where empty — law
// 13), the documents as extents (the box, the edition/draft edge, the
// address label — its fields past its account's prefix, led by their
// separator as the address display spells them (foundations §3.1) — and its
// first line — a DRAFT convention — the badge from LK's `countDoc`, the
// members' marks on the strip; a document a read answered `withheld`,
// whether the index lists it or not, as the withheld box — its owner and the
// word, no badge, B1-S2), each account's CONTINUATION whose documents
// the scale draws too small to stand whole as ONE MARK (foundations §2.1;
// P44; P-LOD's `residueDepth`, crossfading with the boxes it holds through
// the far band): law 13's count of what it holds — "≥ n" where the index
// runs from a floor — and its newest member's label as a box draws it, its
// act a teleport to that member, its members drawn as boxes only as the band
// fades them in; the mid connections from LK's `connections`, each end at
// the box that draws a document or the mark that holds it — a far end the
// frame does not draw at the box or the mark that would, and none where the
// plane draws its document nowhere — a line between two places standing in
// the visible view (the viewport below the one line, a place's centre inside
// it), and from the place standing there toward one out of it THE EDGE STUB:
// its stroke cut at the view's border on the true bearing, the cut P-CAM's
// `edgeStub` that BM's beams share (foundations §2.1: "one whose far end is
// out of view ending at the view's edge as §2.5's stub does"); two places
// both out of view joined only where the frame draws both; a connection
// holding more than one link carrying its COUNT, the bare numeral, on its
// stroke where the stroke runs clear of every place — before a stub's
// triangle — over a plate of the plane's ground, so the line passes behind
// its number (foundations §2.1's register: "one connection drawn per
// document pair with its count"; P44 forbids a merged mark that hides it;
// P-LABEL's `onStroke`); THE LABELS —
// every string the canvas sets but the trail's pip numbers — handed to
// P-LABEL's one pass once every place's shapes are drawn, and set over them
// at no less than P-REG's LABEL_MIN_PX, each only where its place holds it
// whole inside the visible view — the one line stands opaque over the strip
// above it, where a label would be hidden, or cut through at the line's edge
// — meeting no other place's shape and no label set before it (F-9;
// foundations §2.1), a document's on a plate of its box's ground over the
// bars beneath; then the stubs' triangles, over the places and their labels
// as the pips are, for the stubs' strokes run behind the boxes, which at mid
// scale stand along most of the view's border and would hide a triangle drawn
// with its stroke; then the trail's pips numbered newest-first, each number at
// the label floor, and no path between them (foundations §2.2 renders the
// entries as pips: at reading scale a pip stands in the text column, where a
// path would run between the glyphs of the article mounted over the canvas);
// the focus ring; the arrival mark, every run of the span a follow, or a
// LEAP carrying a passage, landed on outlined line by line over the mounted
// article; text yielded where T-LAYER mounted it;
// for the unmounted, the bars — P-LAY's layout of the article's own lines
// (T-ARTICLE's plan, made through T-LAYER from the view it mounts with) at the
// face T-LAYER fits the article to (`metricsOf`), each bar where its line's
// glyphs will stand and every one inside the box, so the handoff swaps bars
// for text in place (law 8; S1 Q7). The loop runs
// T-LAYER's frame BEFORE this draw, so what is mounted is settled when a
// document's label and bars are drawn or yielded; `stats` names both sets,
// and the loop holds them against the mounted set at the frame's end; it
// names the marks, the connections — each with its count and the numeral the
// pass set on it, each stub with the place it is bound for, its cut and its
// triangle — and the labels drawn too, the labels' parts left out with the
// rule that left each out, the box the focus ring outlined and the arrival
// mark's rects, for the gate. The hit tests read the
// draw's own rule: a click meets a document's box only where the box stands
// whole, and a continuation's mark wherever the mark holds its documents.
// The system account's rows are never drawn (the record §1.8; this lane's
// cut). The chip is at the document's corner (T-ARTICLE), never here.
// Carries: the wireframe's §10 whole and §21's `drawAccountFrames`.
// Rules: FP-1, FP-2, FP-8, FP-10 (reads through exports).

import * as REC from '../model/records.js';
import * as LK from '../links/links.js';
import * as TRAIL from '../nav/trail.js';
import * as WALK from '../nav/walk.js';
import * as LAYER from '../text/layer.js';
import * as GO from '../nav/go.js';
import * as LINE from '../line/line.js';
import { cam, sx, sy, wx, wy, viewport, viewportWorld, visibleView, edgeStub, stubTriangle } from './camera.js';
import { lodOf, residueDepth, LOD_TXT_LO } from './lod.js';
import { docBox, accountCell, boardCell, boardLabelCell, intersects, continuationCell, withinContinuation, accountAt } from './projection.js';
import { layoutOf, bars } from './layout.js';
import { setLabels, sizeOf, lineHeight, onStroke, pairOf, LINE_BOX } from './labels.js';
import { COL, EDGE, HUE, LABEL_MIN_PX } from './register.js';
import { documentOf, accountOf, cmpAddr } from '../model/address.js';
import * as FOCUS from '../nav/focus.js';
import { t } from '../strings.js';

/** @typedef {import('../model/records.js').Doc} Doc */
/** @typedef {import('./projection.js').Cell} Cell */
/** @typedef {import('./labels.js').Part} Part */
/** @typedef {import('./camera.js').Point} Point a screen point */
/** @typedef {{x: number, y: number, w: number, h: number}} Rect a screen rect */

/**
 * @typedef {Object} ResidueMark — a continuation drawn as one mark (foundations §2.1; P44)
 * @property {string} key the place it draws its documents at, for the connections: `account:k`
 * @property {string} account
 * @property {number} k the continuation: its cell holds the account's documents at continuation depth k and deeper
 * @property {number} n law 13's count of what it holds
 * @property {boolean} exact the count is exact, the index complete; else a lower bound, drawn so
 * @property {string} newest its newest member, the highest-numbered — the teleport's landing
 * @property {string[]} members the documents it holds, in address order
 * @property {number} alpha the alpha it is drawn at: below 1 through the far bands
 * @property {string[]} lines the lines the label pass set on it, top to bottom; none where it left the mark's label out
 * @property {Rect} rect its screen rect
 */

/**
 * @typedef {Object} Pass — one frame's labels and shapes, handed to P-LABEL once every place is drawn
 * @property {import('./labels.js').Label[]} labels in the order their places were drawn
 * @property {import('./labels.js').Shape[]} shapes every place's shape the frame drew
 */

/**
 * @typedef {Object} Stub — a mid connection's end at the visible view's border, bound for the place out of it (foundations §2.1, §2.5)
 * @property {string} toward the place out of view it is bound for
 * @property {Point} from the centre of the place in view its stroke leaves
 * @property {Point} cut where its stroke ends, P-REG's STUB.inset px inside the border on the bearing: its triangle's tip
 * @property {[Point, Point, Point]} triangle the tip, then its base's two corners
 * @property {string} hue
 * @property {number} alpha the alpha its triangle is drawn at: the documents' band's, by its links' value
 */

/**
 * @typedef {Object} DrawnConnection — a mid connection the frame drew
 * @property {string} a the place one end stands at: a document, or a mark's `key`
 * @property {string} b the place the other end stands at
 * @property {number} count the links it holds, each once
 * @property {Stub | null} stub where one place stands in the visible view and the other out of it; null for a line
 * @property {string | null} label the count the label pass set on its stroke; null where it set none — a connection holding one link, or one whose count the pass left out (`stats.labelsLeftOut` names why)
 */

/** @type {HTMLCanvasElement | null} */
let cv = null;
/** @type {CanvasRenderingContext2D | null} */
let ctx = null;
let DPR = 1;
/**
 * The last frame's figures; `drawn` the documents whose label the label pass
 * set or whose bars the frame drew, `yielded` the ones it left to T-LAYER's
 * mount, `residueMarks` the continuations drawn as marks, `connections` the
 * mid connections drawn, each between two places, a stub where one of them
 * stands out of view, the count set on its stroke where the pass set one,
 * `labels` the labels set — the connections' counts and the trail's pip
 * numbers among them — `labelsLeftOut` the parts the pass left out, each with
 * the rule that left it out, `ring` the focused element's box on screen the
 * focus ring outlined, null where it drew none, and `arrival` the rects the
 * arrival mark outlined.
 */
export const stats = {
  linksDrawn: 0, linesDrawn: 0, clusters: 0, docsDrawn: 0,
  residueMarks: /** @type {ResidueMark[]} */ ([]),
  connections: /** @type {DrawnConnection[]} */ ([]),
  drawn: /** @type {string[]} */ ([]), yielded: /** @type {string[]} */ ([]),
  labels: /** @type {import('./labels.js').SetLabel[]} */ ([]),
  labelsLeftOut: /** @type {import('./labels.js').LeftOut[]} */ ([]),
  ring: /** @type {Rect | null} */ (null),
  arrival: /** @type {Rect[]} */ ([]),
};

/**
 * @typedef {Object} LaidOut — a document's bars as the canvas lays them out
 * @property {string} key what it was made from: the document's revision and run, the model's revision, T-LAYER's
 * @property {import('./layout.js').Metrics} m
 * @property {import('./layout.js').Layout} layout
 * @property {import('./layout.js').Bar[]} bars
 */
/** @type {Map<string, LaidOut>} */
const layouts = new Map();

/** @param {HTMLCanvasElement} c */
export function attach(c) { cv = c; ctx = c.getContext('2d', { alpha: false }); }
export function resize() {
  if (!cv) return;
  const { VW, VH } = viewport();
  DPR = Math.min(2, window.devicePixelRatio || 1);
  cv.width = Math.round(VW * DPR); cv.height = Math.round(VH * DPR);
}

function rrect(/** @type {CanvasRenderingContext2D} */ c, /** @type {number} */ x, /** @type {number} */ y, /** @type {number} */ w, /** @type {number} */ h, /** @type {number} */ r) {
  c.beginPath(); const rr = Math.max(0, Math.min(r, w / 2, h / 2));
  c.moveTo(x + rr, y); c.arcTo(x + w, y, x + w, y + h, rr); c.arcTo(x + w, y + h, x, y + h, rr); c.arcTo(x, y + h, x, y, rr); c.arcTo(x, y, x + w, y, rr); c.closePath();
}
/** the canvas's face at a size and weight */
const face = (/** @type {number} */ px, weight = 'normal') => `${weight === 'normal' ? '' : weight + ' '}${px}px ui-monospace, Menlo, monospace`;
const plural = (/** @type {number} */ n, /** @type {string} */ one, /** @type {string} */ many) => (n === 1 ? t(one) : t(many, { n }));

/** @type {Map<string, number>} the widths the canvas measured, by weight, size and string */
const widths = new Map();
/**
 * A string's width set at a size and weight, by the canvas's own measure —
 * the label pass's measure.
 * @param {string} text
 * @param {number} px
 * @param {string} weight
 * @returns {number}
 */
function measure(text, px, weight) {
  const key = `${weight}|${px}|${text}`;
  let w = widths.get(key);
  if (w === undefined) {
    if (!ctx) return Infinity;
    if (widths.size >= 20000) widths.clear();
    ctx.font = face(px, weight);
    w = ctx.measureText(text).width;
    widths.set(key, w);
  }
  return w;
}

/** the board's region: an outline; its label and, at the floor, the residue statement, in the cell of its user grid no account takes */
function drawBoard(/** @type {Pass} */ pass) {
  if (!ctx) return;
  const { VW, VH } = viewport();
  const b = REC.board(), h = REC.health();
  const c = boardCell('1');
  const X = sx(c.x), Y = sy(c.y), W = c.w * cam.scale, H = c.h * cam.scale;
  if (X + W < 0 || X > VW || Y + H < 0 || Y > VH) return;
  ctx.strokeStyle = COL.boardEdge; ctx.lineWidth = 1; ctx.setLineDash([6, 6]); ctx.strokeRect(X + 2, Y + 2, W - 4, H - 4); ctx.setLineDash([]);
  const room = boardLabelCell('1');
  const RX = sx(room.x) + 8, RY = sy(room.y) + 6;
  const claimant = h && h.auth && h.auth.claimant ? h.auth.claimant : '—';
  /** @type {Part[]} */
  const parts = [{ text: t('L.board-label', { node: '1', origin: b ? b.origin : '', venue: t('F.venue.notebook'), claimant }), px: Math.max(10, Math.min(13, W * 0.03)), ink: COL.title, fit: 'wrap' }];
  const floor = REC.floor();
  if (floor != null && !REC.countsExact()) parts.push({ text: t('F.board-residue', { floor }), px: 10, ink: COL.greek, fit: 'wrap' });
  pass.labels.push({ kind: 'board', place: '1', within: { x: RX, y: RY, w: room.w * cam.scale - 16, h: room.h * cam.scale - 12 }, x: RX, y: RY, align: 'left', alpha: 1, plate: null, parts });
}

/** the accounts as clusters (FAR): the mark, the density, and the labels at their places on the mark */
function drawClusters(/** @type {number} */ alpha, /** @type {Pass} */ pass) {
  if (!ctx) return 0;
  ctx.globalAlpha = alpha;
  let n = 0;
  const v = viewportWorld(120);
  for (const a of REC.accounts()) {
    if (a.system) continue;
    const b = accountCell(a.account);
    if (!intersects(b, v)) continue;
    n++;
    const X = sx(b.x), Y = sy(b.y), W = b.w * cam.scale, H = b.h * cam.scale;
    const count = REC.countOf(a.account);
    const links = LK.countAccount(a.account);
    const dens = Math.min(1, count.documents / 48);
    const mark = { x: X + W * 0.06, y: Y + H * 0.06, w: W * 0.88, h: H * 0.88 };
    ctx.fillStyle = COL.cluster; rrect(ctx, mark.x, mark.y, mark.w, mark.h, Math.min(14, W * 0.1)); ctx.fill();
    ctx.strokeStyle = COL.clusterEdge; ctx.lineWidth = 1; ctx.stroke();
    pass.shapes.push({ place: a.account, rect: mark, alpha });
    const cx = X + W / 2, cy = Y + H / 2;
    const rad = count.documents ? Math.min(W, H) * 0.3 * (0.4 + 0.6 * dens) : 0;
    if (count.documents) {
      ctx.fillStyle = links.arriving ? COL.hollow : `rgba(127,178,255,${0.05 + 0.32 * dens})`;
      ctx.beginPath(); ctx.arc(cx, cy, rad, 0, 6.284); ctx.fill();
      if (links.arriving) { ctx.strokeStyle = 'rgba(127,178,255,0.5)'; ctx.setLineDash([3, 3]); ctx.stroke(); ctx.setLineDash([]); }
      if (links.n) { ctx.strokeStyle = `rgba(127,178,255,${Math.min(0.5, 0.06 + links.n / (count.documents * 10))})`; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(cx, cy, rad * 1.35, 0, 6.284); ctx.stroke(); }
    }
    // the address above the density disc; beneath it each count on lines of its own, then the landmarks or law 13's empty statement — the link ring, the cluster's own mark, passing behind them
    const outer = rad + 1;
    const ax = Math.min(15, W * 0.09), cpx = Math.min(12, W * 0.075);
    pass.labels.push({ kind: 'cluster', place: a.account, within: { x: mark.x + 3, y: mark.y, w: mark.w - 6, h: cy - outer - mark.y }, x: cx, y: cy - outer - lineHeight(ax), align: 'center', alpha, plate: null,
      parts: [{ text: a.account, px: ax, ink: COL.title, fit: 'one' }] });
    /** @type {Part[]} */
    const counts = [
      { text: `${count.exact ? count.documents : t('L.lower-bound', { n: count.documents })} ${t('F.count.documents')}`, px: cpx, ink: COL.text, fit: 'wrap' },
      { text: `${links.arriving ? t('L.arriving') + ' · ' : ''}${links.n} ${t('F.count.links')}`, px: cpx, ink: COL.text, fit: 'wrap' },
    ];
    const land = REC.landmarks().filter((p) => p.account === a.account).length;
    if (land) counts.push({ text: '◆'.repeat(Math.min(4, land)), px: cpx, ink: COL.land, fit: 'one' });
    if (!count.documents) counts.push({ text: t('B1.empty_subspace'), px: cpx, ink: COL.greek, fit: 'wrap' });
    pass.labels.push({ kind: 'cluster', place: a.account, within: { x: mark.x + 3, y: cy + outer, w: mark.w - 6, h: mark.y + mark.h - cy - outer }, x: cx, y: cy + outer, align: 'center', alpha, plate: null, parts: counts });
  }
  ctx.globalAlpha = 1;
  return n;
}

/** the account frames at mid and nearer: the region exists because the address does; its label at its foot, and an empty one says so */
function drawAccountFrames(/** @type {number} */ alpha, /** @type {Pass} */ pass) {
  if (!ctx) return;
  const v = viewportWorld(120);
  const frames = new Set(REC.accounts().filter((a) => !a.system).map((a) => a.account));
  const under = (/** @type {string | null} */ x) => x && frames.add(x);
  under(accountUnderView());
  for (const acct of frames) {
    const b = accountCell(acct);
    if (!intersects(b, v)) continue;
    const X = sx(b.x), Y = sy(b.y), W = b.w * cam.scale, H = b.h * cam.scale;
    ctx.strokeStyle = COL.clusterEdge; ctx.lineWidth = 1; ctx.setLineDash([3, 5]); ctx.strokeRect(X + 1, Y + 1, W - 2, H - 2); ctx.setLineDash([]);
    const count = REC.countOf(acct), links = LK.countAccount(acct);
    const docs = plural(count.documents, 'F.label.documents.1', 'F.label.documents');
    const px = Math.max(10, Math.min(13, W * 0.025));
    const within = { x: X + 8, y: Y + 4, w: W - 16, h: H - 8 };
    pass.labels.push({ kind: 'frame', place: acct, within, x: X + 8, y: Y + H - 4 - lineHeight(px), align: 'left', alpha, plate: null,
      parts: [{ text: `${acct} · ${count.exact ? docs : t('L.lower-bound', { n: docs })} · ${links.arriving ? t('L.arriving') + ' ' : ''}${plural(links.n, 'F.label.links.1', 'F.label.links')}`, px, ink: COL.greek, fit: 'one' }] });
    if (!count.documents) pass.labels.push({ kind: 'frame', place: acct, within, x: X + W / 2, y: Y + H / 2 - lineHeight(14) / 2, align: 'center', alpha, plate: null, parts: [{ text: t('B1.empty_subspace'), px: 14, ink: COL.text, fit: 'wrap' }] });
  }
}

/** the account cell under the view's centre (the empty agent space is drawn by this) */
export function accountUnderView() { return accountAt(cam.x, cam.y, '1'); }

/**
 * A document's bars: P-LAY's layout of its article's own lines, from the
 * plan T-LAYER makes with the view it mounts the article with, at the face
 * T-LAYER fits it to — made again when the document's record or run moves,
 * when the model does (a link's value arriving, an origin's kind), or when
 * the article's view state does (T-LAYER's revision).
 * @param {Doc} d
 * @returns {LaidOut}
 */
function laidOut(d) {
  const key = `${d.rev}:${d.from}:${d.to}:${REC.rev()}:${LAYER.revision()}`;
  const c = layouts.get(d.addr);
  if (c && c.key === key) return c;
  const m = LAYER.metricsOf(d);
  const layout = layoutOf(LAYER.planOf(d), m);
  const out = { key, m, layout, bars: bars(layout, m) };
  layouts.set(d.addr, out);
  return out;
}

/** a document's bars as the canvas lays them out now, or null where its text has not arrived (the gate's handoff check reads them) */
export function layoutFor(/** @type {string} */ addr) { const d = REC.doc(addr); return d.from < 0 ? null : laidOut(d); }

/** the first of a document's bars whose bottom lies below a world height in its box (its bars run top to bottom) */
function firstBar(/** @type {import('./layout.js').Bar[]} */ B, /** @type {number} */ y) {
  let lo = 0, hi = B.length;
  while (lo < hi) { const mid = (lo + hi) >> 1; if (B[mid].y + B[mid].h < y) lo = mid + 1; else hi = mid; }
  return lo;
}

/**
 * Every document the plane may draw: the index's places, and the documents
 * the model holds that the index does not list — their text or their
 * metadata delivered, or a read of them answered `withheld`: existence and
 * owner, never bytes (B1-S2), drawn as the withheld box where it stands
 * whole and counted in its continuation's mark where one holds it (the
 * index at guest class lists no draft; a LEAP to one learns it exists) —
 * the system account's rows left out.
 * @returns {Doc[]}
 */
function drawable() {
  /** @type {Doc[]} */
  const out = [];
  const seen = new Set();
  for (const p of REC.places()) { if (p.system) continue; out.push(REC.doc(p.doc)); seen.add(p.doc); }
  for (const d of REC.docs()) if (!seen.has(d.addr) && !d.system && (d.from >= 0 || d.meta || d.refused === 'withheld')) out.push(d);
  return out;
}

/**
 * Each account's continuation k: the documents it holds among `docs`, in
 * address order — its newest last — a version member counted as its document.
 * @param {Doc[]} docs
 * @param {number} k
 * @returns {Map<string, string[]>} by account
 */
function membersAt(docs, k) {
  /** @type {Map<string, Set<string>>} */
  const by = new Map();
  for (const d of docs) {
    if (!d.account || !withinContinuation(d.addr, k)) continue;
    let s = by.get(d.account);
    if (!s) by.set(d.account, (s = new Set()));
    s.add(documentOf(d.addr) || d.addr);
  }
  return new Map([...by].map(([a, s]) => [a, [...s].sort(cmpAddr)]));
}

/** a box's label: the document's address past its region's prefix, led by the separator after the prefix — ".0.9", as the address display spells a field past a prefix (F-9; foundations §3.1) */
const shortAddr = (/** @type {Doc} */ d) => (d.account ? d.addr.slice(d.account.length) : d.addr);
/** a draft, by the index's kind or by its metadata where read */
const isDraft = (/** @type {Doc} */ d) => d.kind === 'draft' || (d.meta ? !d.meta.published : false);
/** a box's first line: the withheld statement, or the document's first line with its draft mark (a DRAFT convention, F-9) */
const firstLine = (/** @type {Doc} */ d) => (d.refused === 'withheld' ? t('B1.withheld-box', { owner: d.account || '' }) : `${(d.label || '').replace(/^#+\s*/, '')}${isDraft(d) ? ' · ' + t('F.label.draft') : ''}`);

/**
 * A continuation's mark: its cell, and its label — law 13's count of what it
 * holds and its newest member's label as a box draws it, the address past
 * the region's prefix with the first line beneath, as many lines as the mark
 * has room for (the label pass sets it, the lines it set read back into
 * `lines`).
 * @param {{key: string, account: string, k: number, members: string[], cell: Cell, alpha: number}} m
 * @param {Pass} pass
 * @returns {ResidueMark}
 */
function drawMark(m, pass) {
  const c = /** @type {CanvasRenderingContext2D} */ (ctx);
  const X = sx(m.cell.x), Y = sy(m.cell.y), W = m.cell.w * cam.scale, H = m.cell.h * cam.scale;
  const n = m.members.length, exact = REC.countsExact();
  const newest = REC.doc(m.members[n - 1]);
  c.globalAlpha = m.alpha;
  c.fillStyle = COL.residue; rrect(c, X, Y, W, H, Math.min(6, W * 0.05)); c.fill();
  c.strokeStyle = COL.clusterEdge; c.lineWidth = 1; c.setLineDash([2, 3]); c.stroke(); c.setLineDash([]);
  const rect = { x: X, y: Y, w: W, h: H }, pad = 6, f = Math.min(12, W * 0.07);
  pass.shapes.push({ place: m.key, rect, alpha: m.alpha });
  pass.labels.push({ kind: 'mark', place: m.key, within: { x: X + pad, y: Y + pad, w: W - 2 * pad, h: H - 2 * pad }, x: X + pad, y: Y + pad, align: 'left', alpha: m.alpha, plate: null,
    parts: [
      { text: t('F.residue.newest', { n: exact ? n : t('L.lower-bound', { n }), label: shortAddr(newest) }), px: f, ink: COL.title, fit: 'wrap' },
      { text: firstLine(newest), px: f, ink: COL.greek, fit: 'fill' },
    ] });
  return { key: m.key, account: m.account, k: m.k, n, exact, newest: newest.addr, members: m.members, alpha: m.alpha, lines: [], rect };
}

/** the documents as extents; the continuations too small to stand whole as marks; the mid connections, against the visible view `seen` */
function drawDocs(/** @type {import('./lod.js').Lod} */ lod, /** @type {number} */ alpha, /** @type {Pass} */ pass, /** @type {Rect} */ seen) {
  if (!ctx) return 0;
  const { VW, VH } = viewport();
  const v = viewportWorld(80);
  const cont = residueDepth(cam.scale);
  const all = drawable();
  // the documents drawn whole: those shallower than the continuation k, and through the band the depth-k ones fading in
  /** @type {Array<{d: Doc, alpha: number}>} */
  const vis = [];
  for (const d of all) {
    if (!intersects(docBox(d.addr), v)) continue;
    if (!withinContinuation(d.addr, cont.k)) vis.push({ d, alpha });
    else if (cont.fade > 0 && !withinContinuation(d.addr, cont.k + 1)) vis.push({ d, alpha: alpha * cont.fade });
  }
  // the continuations drawn as marks: k's, and through the band k + 1's fading in as k's fades out
  /** @type {Array<{key: string, account: string, k: number, members: string[], cell: Cell, alpha: number}>} */
  const marks = [];
  const drawnK = cont.fade > 0 ? [[cont.k, alpha * (1 - cont.fade)], [cont.k + 1, alpha * cont.fade]] : [[cont.k, alpha]];
  for (const [k, a] of drawnK) {
    for (const [account, members] of membersAt(all, k)) {
      const cell = continuationCell(account, k);
      if (intersects(cell, v)) marks.push({ key: account + ':' + k, account, k, members, cell, alpha: a });
    }
  }
  // the mid connections behind, from LK (the seam): a document stands at its box, or at the mark of the continuation that holds it — the
  // mark drawn here, or out of view the one that would hold it; a document the plane draws nowhere stands at no place
  /** @type {Map<string, string>} the place of each document a mark drawn here holds */
  const heldAt = new Map();
  for (const m of marks) if (m.k === cont.held) for (const a of m.members) heldAt.set(a, m.key);
  const placeable = new Set(all.map((d) => documentOf(d.addr) || d.addr));
  /** @type {Map<string, Cell>} each place met, by its key: a document's box, a mark's cell */
  const cells = new Map();
  const placeOf = (/** @type {string} */ addr) => {
    const doc = documentOf(addr) || addr, account = accountOf(doc);
    if (!placeable.has(doc)) return null;
    const key = account && withinContinuation(doc, cont.held) ? account + ':' + cont.held : doc;
    if (!cells.has(key)) cells.set(key, key === doc ? docBox(doc) : continuationCell(/** @type {string} */ (account), cont.held));
    return key;
  };
  /** the places this frame draws: the boxes standing whole, the marks holding their documents */
  const drawnAt = new Set([...vis.map((x) => placeOf(x.d.addr)), ...heldAt.values()]);
  const centreOf = (/** @type {string} */ key) => { const c = /** @type {Cell} */ (cells.get(key)); return { x: sx(c.x + c.w / 2), y: sy(c.y + c.h / 2) }; };
  const inView = (/** @type {Point} */ p) => p.x >= seen.x && p.x <= seen.x + seen.w && p.y >= seen.y && p.y <= seen.y + seen.h;
  /** @type {Array<{place: string, count: number, p: Point, q: Point}>} each connection holding more than one link, and the stroke its count stands on: to the far place's centre, or to the stub's triangle's base */
  const counted = [];
  let drawn = 0;
  if (lod.docPx > 6) {
    ctx.lineWidth = Math.min(1.6, 0.4 + lod.docPx / 300);
    for (const c of LK.connections([...new Set([...vis.map((x) => x.d.addr), ...heldAt.keys()])], placeOf)) {
      const A = centreOf(c.a), B = centreOf(c.b), inA = inView(A), inB = inView(B);
      // both out of view: a line only between two places the frame draws, unless both lie far past one side
      if (!inA && !inB && (!drawnAt.has(c.a) || !drawnAt.has(c.b) || (A.x < -400 && B.x < -400) || (A.x > VW + 400 && B.x > VW + 400) || (A.y < -400 && B.y < -400) || (A.y > VH + 400 && B.y > VH + 400))) continue;
      /** @type {Stub | null} */
      let stub = null;
      if (inA !== inB) {
        const [from, to, toward] = inA ? [A, B, c.b] : [B, A, c.a];
        const cut = edgeStub(from, to, seen);
        stub = { toward, from, cut, triangle: stubTriangle(cut, to), hue: c.mark.hue, alpha: alpha * c.mark.value };
      }
      const [p, q] = stub ? [stub.from, stub.cut] : [A, B];
      ctx.globalAlpha = alpha * 0.3 * c.mark.value; ctx.strokeStyle = c.mark.hue;
      ctx.setLineDash(Array.isArray(c.mark.form) ? c.mark.form : []);
      ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke(); ctx.setLineDash([]); drawn++;
      stats.connections.push({ a: c.a, b: c.b, count: c.count, stub, label: null });
      if (c.count > 1) counted.push({ place: pairOf(c.a, c.b), count: c.count, p, q: stub ? { x: (stub.triangle[1].x + stub.triangle[2].x) / 2, y: (stub.triangle[1].y + stub.triangle[2].y) / 2 } : q });
    }
  }
  stats.linksDrawn = drawn;
  // the marks, then the boxes beside them: one mark per continuation, never a stack of its members (P44)
  stats.residueMarks = marks.map((m) => drawMark(m, pass));
  for (const { d, alpha: a } of vis) {
    ctx.globalAlpha = a;
    const box = docBox(d.addr);
    const X = sx(box.x), Y = sy(box.y), W = box.w * cam.scale, H = box.h * cam.scale;
    const draft = isDraft(d);
    const landmark = /\.0\.1$/.test(d.addr);
    const ground = d.refused === 'withheld' ? COL.withheld : COL.doc;
    ctx.fillStyle = ground; rrect(ctx, X, Y, W, H, Math.min(6, W * 0.05)); ctx.fill();
    ctx.strokeStyle = landmark ? COL.land : draft ? COL.draftEdge : COL.docEdge;
    ctx.lineWidth = landmark ? EDGE.landmark : draft ? EDGE.draft : EDGE.edition;
    if (draft) ctx.setLineDash([3, 3]); ctx.stroke(); ctx.setLineDash([]);
    pass.shapes.push({ place: d.addr, rect: { x: X, y: Y, w: W, h: H }, alpha: a });
    if (W < 26) continue;
    const fsPx = LAYER.metricsOf(d).fs * cam.scale;
    const mountedHere = LAYER.isMounted(d.addr);
    if (mountedHere) stats.yielded.push(d.addr);
    if (W > 40 && !mountedHere) {
      // the label: the ADDRESS past its region's prefix; the first line a DRAFT convention (F-9); the badge from LK, none at a withheld box, whose links no read brings — set by the label pass on the box's ground
      const tf = Math.min(W * 0.085, fsPx * 1.25), sub = tf * 0.72;
      /** @type {Part[]} */
      const parts = [{ text: shortAddr(d), px: tf, ink: COL.title, weight: '600', fit: 'one' }];
      if (W > 90) {
        parts.push({ text: firstLine(d), px: sub, ink: COL.greek, fit: 'cut' });
        const c = LK.countDoc(d.addr);
        if (W > 110 && d.refused !== 'withheld' && (c.n || c.arriving)) parts.push({ text: c.arriving ? `${c.n ? c.n + ' · ' : ''}${t('L.arriving')}` : plural(c.n, 'F.label.links.1', 'F.label.links'), px: sub, ink: COL.greek, fit: 'wrap' });
      }
      pass.labels.push({ kind: 'doc', place: d.addr, within: { x: X + W * 0.06, y: Y + H * 0.05, w: W * 0.88, h: H * 0.9 }, x: X + W * 0.06, y: Y + H * 0.05, align: 'left', alpha: a, plate: ground, parts });
      // the history strip along the top edge: the members as marks
      if (d.members && d.members > 1 && W > 60) { ctx.fillStyle = COL.land; for (let k = 0; k < d.members; k++) ctx.fillRect(X + W * 0.06 + k * 6, Y + 2, 4, 2); }
    }
    if (d.refused === 'withheld') { if (W > 60) { ctx.strokeStyle = COL.greek; ctx.setLineDash([2, 4]); ctx.strokeRect(X + W * 0.1, Y + H * 0.3, W * 0.8, H * 0.5); ctx.setLineDash([]); } continue; }
    if (landmark && W > 26) { ctx.fillStyle = COL.land; const s = Math.max(4, Math.min(11, W * 0.03)); ctx.beginPath(); ctx.moveTo(X + W / 2, Y - s * 1.6); ctx.lineTo(X + W / 2 + s, Y - s * 0.3); ctx.lineTo(X + W / 2, Y + s); ctx.lineTo(X + W / 2 - s, Y - s * 0.3); ctx.closePath(); ctx.fill(); }
    if (fsPx < 3 || mountedHere || d.from < 0) continue;
    // the bars: the article's own lines, each where its glyphs will stand (the canvas never draws readable glyphs — the layer mounts below the glyph band)
    const B = laidOut(d).bars;
    const below = wy(VH + fsPx) - box.y;
    let set = 0;
    for (let i = firstBar(B, wy(-fsPx) - box.y); i < B.length && B[i].y < below; i++) {
      const b = B[i];
      ctx.fillStyle = COL.greek; ctx.globalAlpha = a * (b.withheld ? 0.25 : fsPx >= LOD_TXT_LO ? 0.7 : 0.55);
      ctx.fillRect(sx(box.x + b.x), sy(box.y + b.y), b.w * cam.scale, Math.max(1, b.h * cam.scale));
      stats.linesDrawn++; set++;
    }
    if (set) stats.drawn.push(d.addr);
  }
  // each connection's count, once every place's shape is drawn: on its stroke where its room meets none of them (P-LABEL's `onStroke`), the
  // room the numeral's own line, which the pass holds clear, and its plate, the plane's ground the line passes behind
  const cpx = sizeOf(LABEL_MIN_PX), lh = lineHeight(LABEL_MIN_PX);
  for (const k of counted) {
    const text = String(k.count), w = measure(text, cpx, 'normal');
    const at = onStroke(k.p, k.q, { w, h: lh }, pass.shapes, seen);
    const x0 = Math.max(at.x - w / 2, seen.x), y0 = Math.max(at.y - lh / 2, seen.y);
    const within = { x: x0, y: y0, w: Math.max(0, Math.min(at.x + w / 2, seen.x + seen.w) - x0), h: Math.max(0, Math.min(at.y + lh / 2, seen.y + seen.h) - y0) };
    pass.labels.push({ kind: 'connection', place: k.place, within, x: at.x, y: at.y - lh / 2, align: 'center', alpha, plate: COL.bg, parts: [{ text, px: LABEL_MIN_PX, ink: COL.text, fit: 'one' }] });
  }
  ctx.globalAlpha = 1;
  return vis.length;
}

/**
 * The labels' one pass (P-LABEL): every label the places handed over, set
 * over their shapes inside the visible view, each line on the plate its
 * place asks for, laid across the label's room; `stats` takes the labels set
 * and the parts left out — a part reaching under the one line or past the
 * viewport left out by the pass's 'view' with every part after it, so a
 * label whose head reaches there is left out whole — each mark the lines set
 * on it, each connection the count set on it, and `drawn` each document
 * whose label was set.
 * @param {Pass} pass
 * @param {Rect} seen the visible view (P-CAM's `visibleView`): the viewport below the one line
 */
function drawLabels(pass, seen) {
  const c = ctx; if (!c) return;
  const { set, out } = setLabels(pass.labels, pass.shapes, seen, measure);
  c.textAlign = 'left'; c.textBaseline = 'middle';
  for (const l of set) {
    c.globalAlpha = l.alpha;
    for (const line of l.lines) {
      const r = line.rect;
      if (l.plate) { c.fillStyle = l.plate; c.fillRect(l.within.x, r.y, l.within.w, r.h); }
      c.font = face(line.px, line.weight); c.fillStyle = line.ink;
      c.fillText(line.text, r.x, r.y + r.h / 2);
    }
  }
  c.globalAlpha = 1; c.textBaseline = 'alphabetic';
  stats.labels = set; stats.labelsLeftOut = out;
  for (const mk of stats.residueMarks) { const l = set.find((x) => x.kind === 'mark' && x.place === mk.key); mk.lines = l ? l.lines.map((x) => x.text) : []; }
  const counts = new Map(set.filter((l) => l.kind === 'connection').map((l) => [l.place, l.lines[0].text]));
  for (const cn of stats.connections) cn.label = counts.get(pairOf(cn.a, cn.b)) ?? null;
  const drawn = new Set(stats.drawn);
  for (const l of set) if (l.kind === 'doc' && !drawn.has(l.place)) stats.drawn.push(l.place);
}

/**
 * The mid connections' stubs' triangles, each at its cut in its
 * connection's hue and value, over the places and their labels (see the
 * head).
 */
function drawStubs() {
  const c = ctx; if (!c) return;
  for (const { stub } of stats.connections) {
    if (!stub) continue;
    const [p, q, r] = stub.triangle;
    c.globalAlpha = stub.alpha; c.fillStyle = stub.hue;
    c.beginPath(); c.moveTo(p.x, p.y); c.lineTo(q.x, q.y); c.lineTo(r.x, r.y); c.closePath(); c.fill();
  }
  c.globalAlpha = 1;
}

/** the trail's pips, numbered newest-first at the label floor, no path joining them (see the head) */
function drawTrail() {
  const c = ctx; if (!c) return;
  const rows = TRAIL.numbered();
  if (!rows.length) return;
  c.save();
  // a pip holds its number at the floor: its radius three quarters of the number's size
  const px = sizeOf(8), r9 = Math.ceil(px * 0.75), lh = px * LINE_BOX;
  c.textAlign = 'left'; c.textBaseline = 'middle'; c.font = face(px);
  for (const r of rows) {
    const e = r.entry;
    const X = sx(e.view.x), Y = sy(e.view.y);
    c.fillStyle = COL.trail; c.globalAlpha = r.n <= 9 ? 1 : 0.5;
    c.beginPath(); c.arc(X, Y, r.n <= 9 ? r9 : 3, 0, 6.284); c.fill();
    if (r.current) { c.strokeStyle = COL.trail; c.lineWidth = 1.5; c.beginPath(); c.arc(X, Y, r9 + 3, 0, 6.284); c.stroke(); }
    if (r.n > 9) continue;
    const text = String(r.n), w = measure(text, px, 'normal');
    c.font = face(px); c.fillStyle = COL.bg; c.fillText(text, X - w / 2, Y);
    stats.labels.push({ kind: 'pip', place: e.addr, within: { x: X - r9, y: Y - r9, w: 2 * r9, h: 2 * r9 }, alpha: 1, plate: null, lines: [{ text, px, ink: COL.bg, weight: 'normal', rect: { x: X - w / 2, y: Y - lh / 2, w, h: lh } }] });
  }
  c.globalAlpha = 1; c.restore();
}

/**
 * The focus ring at the walk's element while the plane holds the focus and
 * a key moved it (N-FOCUS's rule; D5 §4 rule 2) — its document's box for a
 * document or a link; a span whose article stands is marked by its lit block
 * instead, the ring's reading-scale form (D3), so the canvas circles no
 * document whose text is laid out. `stats.ring` is the box it outlined.
 */
function drawFocus() {
  if (!ctx || !FOCUS.ringShown()) return;
  const f = WALK.current(); if (!f) return;
  if (f.kind === 'block' && LAYER.isMounted(f.addr)) return;
  let b = null;
  if (f.kind === 'document' || f.kind === 'block' || f.kind === 'link') b = docBox(f.addr);
  else if (f.kind === 'account') b = accountCell(f.addr);
  else if (f.kind === 'board') b = boardCell(f.addr);
  if (!b) return;
  const X = sx(b.x), Y = sy(b.y), W = b.w * cam.scale, H = b.h * cam.scale;
  ctx.strokeStyle = COL.focus; ctx.lineWidth = 2.5; rrect(ctx, X - 3, Y - 3, W + 6, H + 6, Math.min(8, W * 0.06)); ctx.stroke();
  stats.ring = { x: X, y: Y, w: W, h: H };
}

/**
 * The arrival mark (foundations §2.1: "an outline around its span"; §3.2):
 * the span the landing named outlined line by line, each line-rect of its own
 * bytes in the mounted article, in every run the landing's text holds it in
 * and nothing between them; where the link names the document whole, the
 * block holding the landing's position. The arrival's other mark, the link
 * followed drawn heavier, is BM's, by the weight LK's `markOf` gives it.
 */
function drawArrival() {
  if (!ctx) return;
  const a = GO.arrivalMark(); if (!a) return;
  const b = a.runs ? null : REC.blockAt(a.addr, a.pos);
  const rs = a.runs ? a.runs.flatMap((r) => LAYER.spanRects(a.addr, r.pos, r.width) || []) : b ? LAYER.spanRects(a.addr, b.pos) : null;
  const lines = (rs || []).filter((r) => r.w > 0 && r.h > 0);
  ctx.strokeStyle = HUE.you; ctx.lineWidth = 2; ctx.setLineDash([]);
  for (const r of lines) ctx.strokeRect(r.x - 2, r.y - 2, r.w + 4, r.h + 4);
  stats.arrival = lines;
}

/**
 * Draw the frame: a function of model and view state (FP-8) — the places,
 * then their labels, then the stubs' triangles, the trail, the focus ring and
 * the arrival mark; the connections and the labels against one visible view,
 * read once for the frame.
 * @returns {import('./lod.js').Lod}
 */
export function draw() {
  const lod = lodOf(cam.scale);
  if (!ctx || !cv) return lod;
  const { VW, VH } = viewport();
  const seen = visibleView(LINE.bottom());
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  ctx.fillStyle = COL.bg; ctx.fillRect(0, 0, VW, VH);
  ctx.textBaseline = 'alphabetic';
  stats.linksDrawn = 0; stats.linesDrawn = 0; stats.clusters = 0; stats.docsDrawn = 0; stats.residueMarks = []; stats.connections = []; stats.drawn = []; stats.yielded = []; stats.labels = []; stats.labelsLeftOut = []; stats.ring = null; stats.arrival = [];
  /** @type {Pass} */
  const pass = { labels: [], shapes: [] };
  drawBoard(pass);
  if (lod.name === 'far') stats.clusters = drawClusters(1, pass);
  else if (lod.name === 'far~mid') { stats.clusters = drawClusters(1 - lod.fade, pass); drawAccountFrames(lod.fade, pass); stats.docsDrawn = drawDocs(lod, lod.fade, pass, seen); }
  else { drawAccountFrames(1, pass); stats.docsDrawn = drawDocs(lod, 1, pass, seen); }
  drawLabels(pass, seen);
  drawStubs(); drawTrail(); drawFocus(); drawArrival();
  return lod;
}

/** the document under a screen point where its box stands whole — one a continuation's mark holds is the mark's (a hit test; draws nothing) */
export function docAtScreen(/** @type {number} */ px, /** @type {number} */ py) {
  const { held } = residueDepth(cam.scale);
  const wxp = wx(px), wyp = wy(py);
  for (const p of REC.places()) { if (p.system || withinContinuation(p.doc, held)) continue; const b = docBox(p.doc); if (wxp >= b.x && wxp <= b.x + b.w && wyp >= b.y && wyp <= b.y + b.h) return p.doc; }
  return null;
}

/**
 * The continuation mark under a screen point, wherever the documents are drawn
 * (the far scale draws clusters): its account, its continuation and its
 * newest member, the teleport's landing (foundations §2.1); null where no
 * mark holds the point.
 * @param {number} px
 * @param {number} py
 * @returns {{account: string, k: number, newest: string} | null}
 */
export function residueAtScreen(px, py) {
  if (lodOf(cam.scale).name === 'far') return null;
  const { held } = residueDepth(cam.scale);
  const wxp = wx(px), wyp = wy(py);
  for (const [account, members] of membersAt(drawable(), held)) {
    const c = continuationCell(account, held);
    if (wxp >= c.x && wxp <= c.x + c.w && wyp >= c.y && wyp <= c.y + c.h) return { account, k: held, newest: members[members.length - 1] };
  }
  return null;
}
