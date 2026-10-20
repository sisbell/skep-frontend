// P-RENDER — the canvas (the structure record §3.2 "P-RENDER"). Layer 2.
// ENGINE-BOUND. State: none of the model's or the view's — the canvas and
// the per-frame `stats` alone (FP-8: repainted whole on a dirty frame;
// nothing drawn on the canvas is updated in place).
// The board's region with its label and, at the floor, the residue
// statement; at FAR the accounts as clusters with their counts — documents
// (exact, or a lower bound "≥ n" where the index runs from a floor), links
// held here (LK's fold; HOLLOW while any document's links are unread —
// "arriving"), the landmarks ◆; at MID the account frames ("nothing here
// yet" where empty — law 13), the documents as extents (the box, the
// edition/draft edge, the address label and its first line — a DRAFT
// convention — the badge from LK's `countDoc`, the members' marks on the
// strip), THE RESIDUE for documents past the sound depth (one cell: the
// count, the newest's label), the mid connections from LK's `connections`;
// the trail's pips numbered newest-first with their path; the focus ring;
// the arrival mark; text yielded where T-LAYER mounted it; for the unmounted,
// the bars — P-LAY's layout of the article's own lines (T-ARTICLE's plan, made
// through T-LAYER from the view it mounts with), each bar where its line's
// glyphs will stand and none past the article's clip, so the handoff swaps
// bars for text in place (law 8; S1 Q7). The loop runs T-LAYER's frame BEFORE
// this draw, so what is mounted is settled when a document's label and bars
// are drawn or yielded; `stats` names both sets, and the loop holds them
// against the mounted set at the frame's end. The system account's rows are
// never drawn (the record §1.8; this lane's cut). The chip is at the
// document's corner (T-ARTICLE), never here. Carries: the wireframe's §10
// whole and §21's `drawAccountFrames`.
// Rules: FP-1, FP-2, FP-8, FP-10 (reads through exports).

import * as REC from '../model/records.js';
import * as LK from '../links/links.js';
import * as TRAIL from '../nav/trail.js';
import * as WALK from '../nav/walk.js';
import * as LAYER from '../text/layer.js';
import * as GO from '../nav/go.js';
import { cam, sx, sy, wx, wy, viewport, viewportWorld } from './camera.js';
import { lodOf, LOD_TXT_LO } from './lod.js';
import { docBox, accountCell, boardCell, intersects, residueCell, accountAt, DEPTH_SOUND } from './projection.js';
import { metricsFor, layoutOf, bars, CHAR_W } from './layout.js';
import { COL, EDGE, HUE } from './register.js';
import { t } from '../strings.js';

/** @typedef {import('../model/records.js').Doc} Doc */

/** @type {HTMLCanvasElement | null} */
let cv = null;
/** @type {CanvasRenderingContext2D | null} */
let ctx = null;
let DPR = 1;
/** the last frame's figures; `drawn` the documents whose label or bars it drew, `yielded` the ones it left to T-LAYER's mount */
export const stats = { linksDrawn: 0, linesDrawn: 0, clusters: 0, docsDrawn: 0, residues: 0, drawn: /** @type {string[]} */ ([]), yielded: /** @type {string[]} */ ([]) };

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
const mono = (/** @type {number} */ px) => `${px}px ui-monospace, Menlo, monospace`;
const plural = (/** @type {number} */ n, /** @type {string} */ one, /** @type {string} */ many) => (n === 1 ? t(one) : t(many, { n }));

/** the board's region: an outline with its label, the claimant; at the floor the residue statement */
function drawBoard() {
  if (!ctx) return;
  const { VW, VH } = viewport();
  const b = REC.board(), h = REC.health();
  const c = boardCell('1');
  const X = sx(c.x), Y = sy(c.y), W = c.w * cam.scale, H = c.h * cam.scale;
  if (X + W < 0 || X > VW || Y + H < 0 || Y > VH) return;
  ctx.strokeStyle = COL.boardEdge; ctx.lineWidth = 1; ctx.setLineDash([6, 6]); ctx.strokeRect(X + 2, Y + 2, W - 4, H - 4); ctx.setLineDash([]);
  if (W > 160) {
    ctx.fillStyle = COL.title; ctx.font = mono(Math.max(10, Math.min(13, W * 0.03)));
    const claimant = h && h.auth && h.auth.claimant ? h.auth.claimant : '—';
    ctx.fillText(t('L.board-label', { node: '1', origin: b ? b.origin : '', venue: t('F.venue.notebook'), claimant }), X + 8, Y + 14);
    const floor = REC.floor();
    if (floor != null && !REC.countsExact()) { ctx.fillStyle = COL.greek; ctx.font = mono(10); ctx.fillText(t('F.board-residue', { floor }), X + 8, Y + 28); }
  }
}

/** the accounts as clusters (FAR) */
function drawClusters(/** @type {number} */ alpha) {
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
    ctx.fillStyle = COL.cluster; rrect(ctx, X + W * 0.06, Y + H * 0.06, W * 0.88, H * 0.88, Math.min(14, W * 0.1)); ctx.fill();
    ctx.strokeStyle = COL.clusterEdge; ctx.lineWidth = 1; ctx.stroke();
    const rad = count.documents ? Math.min(W, H) * 0.3 * (0.4 + 0.6 * dens) : 6;
    if (count.documents) {
      ctx.fillStyle = links.arriving ? COL.hollow : `rgba(127,178,255,${0.05 + 0.32 * dens})`;
      ctx.beginPath(); ctx.arc(X + W / 2, Y + H / 2, rad, 0, 6.284); ctx.fill();
      if (links.arriving) { ctx.strokeStyle = 'rgba(127,178,255,0.5)'; ctx.setLineDash([3, 3]); ctx.stroke(); ctx.setLineDash([]); }
      if (links.n) { ctx.strokeStyle = `rgba(127,178,255,${Math.min(0.5, 0.06 + links.n / (count.documents * 10))})`; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(X + W / 2, Y + H / 2, rad * 1.35, 0, 6.284); ctx.stroke(); }
    }
    if (W > 40) {
      ctx.fillStyle = COL.title; ctx.font = mono(Math.max(9, Math.min(15, W * 0.09))); ctx.textAlign = 'center';
      ctx.fillText(a.account, X + W / 2, Y + H / 2 - rad - 6);
      ctx.fillStyle = COL.text; ctx.font = mono(Math.max(9, Math.min(12, W * 0.075)));
      const docsWord = (count.exact ? '' : t('L.lower-bound', { n: '' }).trim() + ' ') + count.documents + ' ' + t('F.count.documents');
      const linksWord = (links.arriving ? t('L.arriving') + ' · ' : '') + links.n + ' ' + t('F.count.links');
      ctx.fillText(`${docsWord} · ${linksWord}`, X + W / 2, Y + H / 2 + rad + 13);
      const land = REC.landmarks().filter((p) => p.account === a.account).length;
      if (land) { ctx.fillStyle = COL.land; ctx.fillText('◆'.repeat(Math.min(4, land)), X + W / 2, Y + H / 2 + rad + 26); }
      if (!count.documents) { ctx.fillStyle = COL.greek; ctx.fillText(t('B1.empty_subspace'), X + W / 2, Y + H / 2 + rad + 26); }
      ctx.textAlign = 'left';
    }
  }
  ctx.globalAlpha = 1;
  return n;
}

/** the account frames at mid and nearer: the region exists because the address does; an empty one says so */
function drawAccountFrames() {
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
    if (W > 120) {
      const count = REC.countOf(acct), links = LK.countAccount(acct);
      ctx.fillStyle = COL.greek; ctx.font = mono(Math.max(10, Math.min(13, W * 0.025)));
      ctx.fillText(`${acct} · ${count.exact ? '' : '≥ '}${plural(count.documents, 'F.label.documents.1', 'F.label.documents')} · ${links.arriving ? t('L.arriving') + ' ' : ''}${plural(links.n, 'F.label.links.1', 'F.label.links')}`, X + 8, Y + H - 10);
      if (!count.documents) { ctx.fillStyle = COL.text; ctx.font = mono(14); ctx.textAlign = 'center'; ctx.fillText(t('B1.empty_subspace'), X + W / 2, Y + H / 2); ctx.textAlign = 'left'; }
    }
  }
}

/** the account cell under the view's centre (the empty agent space is drawn by this) */
export function accountUnderView() { return accountAt(cam.x, cam.y, '1'); }

/**
 * A document's bars: P-LAY's layout of its article's own lines, from the
 * plan T-LAYER makes with the view it mounts the article with — made again
 * when the document's record or run moves, when the model does (a link's
 * value arriving, an origin's kind), or when the article's view state does
 * (T-LAYER's revision).
 * @param {Doc} d
 * @returns {LaidOut}
 */
function laidOut(d) {
  const key = `${d.rev}:${d.from}:${d.to}:${REC.rev()}:${LAYER.revision()}`;
  const c = layouts.get(d.addr);
  if (c && c.key === key) return c;
  const m = metricsFor(d.extent || 1, docBox(d.addr));
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

/** the documents as extents; the residue cells; the mid connections */
function drawDocs(/** @type {import('./lod.js').Lod} */ lod, /** @type {number} */ alpha) {
  if (!ctx) return 0;
  const { VW, VH } = viewport();
  const v = viewportWorld(80);
  /** @type {Doc[]} */
  const vis = [];
  /** @type {Map<string, {cell: import('./projection.js').Cell, docs: Doc[]}>} */
  const residues = new Map();
  const seen = new Set();
  for (const p of REC.places()) { if (p.system) continue; const b = docBox(p.doc); if (!intersects(b, v)) continue; const d = REC.doc(p.doc); seen.add(p.doc); if (b.residue) { const key = p.account; const r = residues.get(key) || { cell: residueCell(p.account), docs: [] }; r.docs.push(d); residues.set(key, r); } else vis.push(d); }
  for (const d of REC.docs()) { if (seen.has(d.addr) || d.system) continue; if ((d.from >= 0 || d.meta) && intersects(docBox(d.addr), v) && !docBox(d.addr).residue) { vis.push(d); seen.add(d.addr); } }
  ctx.globalAlpha = alpha;
  // the mid connections behind, from LK (the seam)
  let drawn = 0;
  if (lod.docPx > 6) {
    ctx.lineWidth = Math.min(1.6, 0.4 + lod.docPx / 300);
    for (const c of LK.connections(vis.map((d) => d.addr))) {
      const a = docBox(c.a), b = docBox(c.b);
      const ax = sx(a.x + a.w / 2), ay = sy(a.y + a.h / 2), bx = sx(b.x + b.w / 2), by = sy(b.y + b.h / 2);
      if ((ax < -400 && bx < -400) || (ax > VW + 400 && bx > VW + 400) || (ay < -400 && by < -400) || (ay > VH + 400 && by > VH + 400)) continue;
      ctx.globalAlpha = alpha * 0.3 * c.mark.value; ctx.strokeStyle = c.mark.hue;
      ctx.setLineDash(Array.isArray(c.mark.form) ? c.mark.form : []);
      ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke(); ctx.setLineDash([]); drawn++;
    }
    ctx.globalAlpha = alpha;
  }
  stats.linksDrawn = drawn;
  const focus = WALK.current();
  for (const d of vis) {
    const box = docBox(d.addr);
    const X = sx(box.x), Y = sy(box.y), W = box.w * cam.scale, H = box.h * cam.scale;
    const isDraft = d.kind === 'draft' || (d.meta ? !d.meta.published : false);
    const landmark = /\.0\.1$/.test(d.addr);
    ctx.fillStyle = d.refused === 'withheld' ? COL.withheld : COL.doc; rrect(ctx, X, Y, W, H, Math.min(6, W * 0.05)); ctx.fill();
    ctx.strokeStyle = landmark ? COL.land : isDraft ? COL.draftEdge : COL.docEdge;
    ctx.lineWidth = landmark ? EDGE.landmark : isDraft ? EDGE.draft : EDGE.edition;
    if (isDraft) ctx.setLineDash([3, 3]); ctx.stroke(); ctx.setLineDash([]);
    if (W < 26) continue;
    const m = metricsFor(d.extent || 1, box);
    const fsPx = m.fs * cam.scale;
    const mountedHere = LAYER.isMounted(d.addr);
    if (mountedHere) stats.yielded.push(d.addr);
    else if (W > 40 || (fsPx >= 3 && d.from >= 0 && d.refused !== 'withheld')) stats.drawn.push(d.addr);
    if (W > 40 && !mountedHere) {
      // the label: the ADDRESS past its region's prefix; the first line a DRAFT convention (F-9); the badge from LK
      ctx.fillStyle = COL.title;
      const tf = Math.max(7, Math.min(W * 0.085, fsPx * 1.25));
      ctx.font = `600 ${tf}px ui-monospace, Menlo, monospace`;
      const shortAddr = d.account ? d.addr.slice(d.account.length + 1) : d.addr;
      ctx.fillText(shortAddr, X + W * 0.06, Y + H * 0.05 + tf);
      if (W > 90) {
        ctx.fillStyle = COL.greek; ctx.font = mono(tf * 0.72);
        const maxc = Math.floor((W * 0.9) / (tf * 0.72 * CHAR_W));
        const sub = d.refused === 'withheld' ? t('B1.withheld-box', { owner: d.account || '' }) : `${(d.label || '').replace(/^#+\s*/, '')}${isDraft ? ' · ' + t('F.label.draft') : ''}`;
        ctx.fillText(sub.length > maxc ? sub.slice(0, Math.max(0, maxc - 1)) + '…' : sub, X + W * 0.06, Y + H * 0.05 + tf * 2.1);
        const c = LK.countDoc(d.addr);
        if (W > 110 && (c.n || c.arriving)) ctx.fillText(c.arriving ? `${c.n ? c.n + ' · ' : ''}${t('L.arriving')}` : plural(c.n, 'F.label.links.1', 'F.label.links'), X + W * 0.06, Y + H * 0.05 + tf * 3.1);
      }
      // the history strip along the top edge: the members as marks
      if (d.members && d.members > 1 && W > 60) { ctx.fillStyle = COL.land; for (let k = 0; k < d.members; k++) ctx.fillRect(X + W * 0.06 + k * 6, Y + 2, 4, 2); }
    }
    if (d.refused === 'withheld') { if (W > 60) { ctx.strokeStyle = COL.greek; ctx.setLineDash([2, 4]); ctx.strokeRect(X + W * 0.1, Y + H * 0.3, W * 0.8, H * 0.5); ctx.setLineDash([]); } continue; }
    if (landmark && W > 26) { ctx.fillStyle = COL.land; const s = Math.max(4, Math.min(11, W * 0.03)); ctx.beginPath(); ctx.moveTo(X + W / 2, Y - s * 1.6); ctx.lineTo(X + W / 2 + s, Y - s * 0.3); ctx.lineTo(X + W / 2, Y + s); ctx.lineTo(X + W / 2 - s, Y - s * 0.3); ctx.closePath(); ctx.fill(); }
    if (fsPx < 3 || mountedHere || d.from < 0) continue;
    // the bars: the article's own lines, each where its glyphs will stand (the canvas never draws readable glyphs — the layer mounts below the glyph band)
    const B = laidOut(d).bars;
    const below = wy(VH + fsPx) - box.y;
    for (let i = firstBar(B, wy(-fsPx) - box.y); i < B.length && B[i].y < below; i++) {
      const b = B[i];
      ctx.fillStyle = COL.greek; ctx.globalAlpha = alpha * (b.withheld ? 0.25 : fsPx >= LOD_TXT_LO ? 0.7 : 0.55);
      ctx.fillRect(sx(box.x + b.x), sy(box.y + b.y), b.w * cam.scale, Math.max(1, b.h * cam.scale));
      stats.linesDrawn++;
    }
    ctx.globalAlpha = alpha;
  }
  // the residues: one cell per account past the sound depth — the count and the newest's label, a teleport
  stats.residues = 0;
  for (const [acct, r] of residues) {
    const c = r.cell;
    const X = sx(c.x), Y = sy(c.y), W = c.w * cam.scale, H = c.h * cam.scale;
    if (W < 6) continue;
    stats.residues++;
    ctx.fillStyle = COL.residue; rrect(ctx, X, Y, W, H, Math.min(6, W * 0.05)); ctx.fill();
    ctx.strokeStyle = COL.clusterEdge; ctx.setLineDash([2, 3]); ctx.stroke(); ctx.setLineDash([]);
    if (W > 60) {
      const newest = r.docs[r.docs.length - 1];
      ctx.fillStyle = COL.title; ctx.font = mono(Math.max(8, Math.min(12, W * 0.07)));
      ctx.fillText(t('F.residue.newest', { n: r.docs.length, label: (newest.label || newest.addr).slice(0, 24) }), X + 6, Y + 14);
      ctx.fillStyle = COL.greek; ctx.font = mono(9); ctx.fillText(acct + ' · ' + t('L.arriving').replace(/.*/, `depth ${DEPTH_SOUND}+`), X + 6, Y + 26);
    }
  }
  ctx.globalAlpha = 1;
  void focus;
  return vis.length;
}

/** the trail's pips, numbered newest-first, joined by the path */
function drawTrail() {
  const c = ctx; if (!c) return;
  const rows = TRAIL.numbered();
  if (!rows.length) return;
  const pts = TRAIL.all().map((e) => ({ x: sx(e.view.x), y: sy(e.view.y) }));
  c.save(); c.setLineDash([4, 5]); c.strokeStyle = COL.trailPath; c.lineWidth = 1.2;
  if (pts.length > 1) { c.beginPath(); pts.forEach((p, i) => (i ? c.lineTo(p.x, p.y) : c.moveTo(p.x, p.y))); c.stroke(); }
  c.setLineDash([]);
  for (const r of rows) {
    const e = r.entry;
    const X = sx(e.view.x), Y = sy(e.view.y);
    c.fillStyle = COL.trail; c.globalAlpha = r.n <= 9 ? 1 : 0.5;
    c.beginPath(); c.arc(X, Y, r.n <= 9 ? 5 : 3, 0, 6.284); c.fill();
    if (r.current) { c.strokeStyle = COL.trail; c.lineWidth = 1.5; c.beginPath(); c.arc(X, Y, 8, 0, 6.284); c.stroke(); }
    if (r.n <= 9) { c.fillStyle = COL.bg; c.font = mono(8); c.textAlign = 'center'; c.fillText(String(r.n), X, Y + 3); c.textAlign = 'left'; }
  }
  c.globalAlpha = 1; c.restore();
}

/** the focus ring at the walk's element once a key has moved it */
function drawFocus() {
  if (!ctx || !WALK.ringShown()) return;
  const f = WALK.current(); if (!f) return;
  let b = null;
  if (f.kind === 'document' || f.kind === 'block' || f.kind === 'link') b = docBox(f.addr);
  else if (f.kind === 'account') b = accountCell(f.addr);
  else if (f.kind === 'board') b = boardCell(f.addr);
  if (!b) return;
  const X = sx(b.x), Y = sy(b.y), W = b.w * cam.scale, H = b.h * cam.scale;
  ctx.strokeStyle = COL.focus; ctx.lineWidth = 2.5; rrect(ctx, X - 3, Y - 3, W + 6, H + 6, Math.min(8, W * 0.06)); ctx.stroke();
}

/** the arrival mark: the landing's span outlined, the followed link heavier (foundations §3.2) */
function drawArrival() {
  if (!ctx) return;
  const a = GO.arrivalMark(); if (!a) return;
  const b = REC.blockAt(a.addr, a.pos);
  const rs = b ? LAYER.spanRects(a.addr, b.pos) : null;
  if (!rs) return;
  ctx.strokeStyle = HUE.you; ctx.lineWidth = 2; ctx.setLineDash([]);
  for (const r of rs) ctx.strokeRect(r.x - 2, r.y - 2, r.w + 4, r.h + 4);
}

/**
 * Draw the frame: a function of model and view state (FP-8).
 * @returns {import('./lod.js').Lod}
 */
export function draw() {
  const lod = lodOf(cam.scale);
  if (!ctx || !cv) return lod;
  const { VW, VH } = viewport();
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  ctx.fillStyle = COL.bg; ctx.fillRect(0, 0, VW, VH);
  ctx.textBaseline = 'alphabetic';
  stats.linesDrawn = 0; stats.clusters = 0; stats.docsDrawn = 0; stats.drawn = []; stats.yielded = [];
  drawBoard();
  if (lod.name === 'far') stats.clusters = drawClusters(1);
  else if (lod.name === 'far~mid') { stats.clusters = drawClusters(1 - lod.fade); drawAccountFrames(); stats.docsDrawn = drawDocs(lod, lod.fade); }
  else { drawAccountFrames(); stats.docsDrawn = drawDocs(lod, 1); }
  drawTrail(); drawFocus(); drawArrival();
  return lod;
}

/** the document under a screen point (a hit test; draws nothing) */
export function docAtScreen(/** @type {number} */ px, /** @type {number} */ py) {
  const wxp = wx(px), wyp = wy(py);
  for (const p of REC.places()) { if (p.system) continue; const b = docBox(p.doc); if (b.residue) continue; if (wxp >= b.x && wxp <= b.x + b.w && wyp >= b.y && wyp <= b.y + b.h) return p.doc; }
  return null;
}
/** the residue cell under a screen point: its account */
export function residueAtScreen(/** @type {number} */ px, /** @type {number} */ py) {
  const wxp = wx(px), wyp = wy(py);
  for (const a of REC.accounts()) { if (a.system) continue; const c = residueCell(a.account); if (wxp >= c.x && wxp <= c.x + c.w && wyp >= c.y && wyp <= c.y + c.h) return a.account; }
  return null;
}
