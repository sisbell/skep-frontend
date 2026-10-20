// SC — THE READING SCENE (the structure record §3.2 "SC"; B1-S9; foundations
// §2.5; law 12: chrome). Layer 2. ENGINE-BOUND. State: VIEW — the pair and
// the panes' scrolls (the one owner).
// Two documents at reading scale side by side over the plane, each pane
// scrolling on its own (R3); the places unmoved, nothing written; opened
// from a link or a correspondence it sets the two ends LEVEL, a re-level
// act (K-62) restoring that; between the panes LINKS are drawn as LINES from
// the set LK gives (the seam at the link-beam source — hue the linker's,
// dashed for another's) and SHARED IDENTITY as BANDS from `compare`'s pairs
// (no link), a line or band whose end has left its pane clipped at the
// pane's edge with the stub's triangle. Its own end — zoom-out, Esc, ←, the
// bar's × — pushes the plane as it was onto the trail (§2.5; the entry it
// departs holds the camera's view, not the pair and the panes' positions
// §2.5 asks it to hold, which is the design's open question); a navigation
// act — a teleport, Back, Forward, a trail jump — dismisses it first and
// pushes nothing, the act's own trail move the one it makes (`dismiss`). The
// panes BORROW the one reconciler's mount (FP-12: `T-LAYER.sceneArticle`
// makes the HTML; the scene keeps no DOM text of its own). Each pane carries
// its own document's corner (ux-T2: "each pane its own"; `T-LAYER.sceneCorner`
// makes its items) on its OUTER side — pane A's left, pane B's right — held
// to the top of the pane's scroll, so the bands and lines leave the inner
// edges clear of it (foundations §3.1); it is shown, not acted on, as nothing
// in a pane takes a pointer. Companionate scrolling over the bands is
// UNTESTED (S27) and not built. Carries: the wireframe's §19 whole (its
// beams over `compare`'s pairs instead of the hand data's windows).
// Rules: FP-1, FP-2, FP-10, FP-12, FP-13.

import * as PUMP from '../model/pump.js';
import * as REC from '../model/records.js';
import * as F from '../model/frames.js';
import * as LAYER from '../text/layer.js';
import * as LK from '../links/links.js';
import * as HOST from '../overlays/host.js';
import * as TRAIL from '../nav/trail.js';
import { SAMENESS } from '../plane/register.js';
import { markDirty, view as camView } from '../plane/camera.js';
import { t } from '../strings.js';
import { esc } from '../util.js';

/** @typedef {import('../model/frames.js').ComparePair} ComparePair */

/** @type {{a: string, b: string, pairs: ComparePair[], levelA: number | null, levelB: number | null} | null} */
let scene = null;
/** @type {{root: HTMLElement, bar: HTMLElement, paneA: HTMLElement, paneB: HTMLElement, canvas: HTMLCanvasElement} | null} */
let els = null;

/** @param {{root: HTMLElement, bar: HTMLElement, paneA: HTMLElement, paneB: HTMLElement, canvas: HTMLCanvasElement}} e */
export function attach(e) {
  els = e;
  for (const p of [e.paneA, e.paneB]) p.addEventListener('scroll', () => draw());
  e.bar.addEventListener('click', (ev) => { const tg = /** @type {HTMLElement} */ (ev.target); if (tg.dataset.x) close(); else if (tg.dataset.relevel) relevel(); });
}
export const isOpen = () => scene !== null;
export const pair = () => (scene ? { a: scene.a, b: scene.b } : null);

/**
 * Open the scene on two documents, the two ends level where positions are
 * given.
 * @param {string} a
 * @param {string} b
 * @param {{posA?: number | null, posB?: number | null}} [opts]
 */
export async function open(a, b, opts = {}) {
  if (!els) return;
  HOST.dismiss();
  const [da, db] = await Promise.all([PUMP.loadWhole(a), PUMP.loadWhole(b)]);
  if (!da || !db) return;
  const cmp = await PUMP.read(F.compare([{ doc: a, spans: [{ ordinal: 1, positions: Math.max(1, da.extent || 1) }] }], [{ doc: b, spans: [{ ordinal: 1, positions: Math.max(1, db.extent || 1) }] }]));
  /** @type {ComparePair[]} */
  let pairs = [];
  if ('refused' in cmp) { const r = cmp.refused; els.bar.dataset.face = r.name; }
  else pairs = F.decodeCompare(cmp.answer);
  scene = { a, b, pairs, levelA: opts.posA ?? (pairs[0] ? pairs[0].u1 : null), levelB: opts.posB ?? (pairs[0] ? pairs[0].u2 : null) };
  els.root.classList.add('on');
  els.bar.innerHTML = `<b>${esc(a)}</b> │ <b>${esc(b)}</b> <span class="dim">${esc(t('F.scene.sameness'))} · ${esc(t('F.scene.link'))}</span>` +
    (els.bar.dataset.face ? ` <span class="face-text draft">${esc(t(els.bar.dataset.face === 'too_many_pairs' ? 'B1.too_many_pairs' : els.bar.dataset.face === 'too_many_blocks' ? 'B1.too_many_blocks' : 'L.refused', { name: els.bar.dataset.face }))}</span>` : '') +
    ` <button data-relevel="1">${esc(t('F.scene.relevel'))} <kbd>⌘R</kbd></button><span class="x" data-x="1" role="button" tabindex="0">× ${esc(t('F.scene.dismiss'))}</span>`;
  const corner = (/** @type {string} */ addr, /** @type {import('../model/records.js').Doc} */ d) => `<div class="corner" data-corner="${esc(addr)}">${LAYER.sceneCorner(d)}</div>`;
  els.paneA.innerHTML = corner(a, da) + `<article class="dtext scene" data-addr="${esc(a)}">${LAYER.sceneArticle(da)}</article>`;
  els.paneB.innerHTML = `<article class="dtext scene" data-addr="${esc(b)}">${LAYER.sceneArticle(db)}</article>` + corner(b, db);
  els.paneA.setAttribute('tabindex', '0'); els.paneB.setAttribute('tabindex', '0');
  relevel();
  const first = els.paneB.querySelector('.sp'); if (first) /** @type {HTMLElement} */ (first).setAttribute('tabindex', '0');
  els.paneB.focus({ preventScroll: true });
  markDirty();
}

/** the element of the block holding a position in a pane */
function blockEl(/** @type {HTMLElement} */ pane, /** @type {string} */ addr, /** @type {number} */ pos) {
  const d = REC.doc(addr);
  const b = d.blocks.find((x) => pos >= x.pos && pos < x.pos + x.width);
  return b ? /** @type {HTMLElement | null} */ (pane.querySelector(`.sp[data-pos="${b.pos}"]`)) : null;
}

/** set the two ends level: the matched passages at one height */
export function relevel() {
  if (!scene || !els) return;
  const ea = scene.levelA != null ? blockEl(els.paneA, scene.a, scene.levelA) : null;
  const eb = scene.levelB != null ? blockEl(els.paneB, scene.b, scene.levelB) : null;
  if (ea) els.paneA.scrollTop = ea.offsetTop - 40;
  if (eb) els.paneB.scrollTop = eb.offsetTop - 40; else if (ea) els.paneB.scrollTop = 0;
  draw();
}

/** draw the bands and the lines on the scene's canvas */
export function draw() {
  const S = scene, E = els;
  if (!S || !E) return;
  const cv = E.canvas, ctx = cv.getContext('2d'); if (!ctx) return;
  const c = cv.getBoundingClientRect();
  const DPR = Math.min(2, window.devicePixelRatio || 1);
  cv.width = Math.round(c.width * DPR); cv.height = Math.round(c.height * DPR);
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0); ctx.clearRect(0, 0, c.width, c.height);
  const rectOf = (/** @type {HTMLElement} */ pane, /** @type {string} */ addr, /** @type {number} */ pos) => {
    const el = blockEl(pane, addr, pos); if (!el) return null;
    const r = el.getBoundingClientRect(), pr = pane.getBoundingClientRect();
    const clipped = r.bottom < pr.top || r.top > pr.bottom;
    const y = Math.max(pr.top, Math.min(pr.bottom, r.top + r.height / 2)) - c.top;
    return { x0: pr.left - c.left, x1: pr.right - c.left, y, clipped, above: r.bottom < pr.top };
  };
  /** @type {string[]} */
  const bandsDrawn = [];
  // the identity bands (compare's pairs), contiguous pairs merged
  for (const p of S.pairs.slice(0, 400)) {
    const ra = rectOf(E.paneA, S.a, p.u1), rb = rectOf(E.paneB, S.b, p.u2);
    if (!ra || !rb) continue;
    const key = ra.y + ':' + rb.y; if (bandsDrawn.includes(key)) continue; bandsDrawn.push(key);
    const x0 = ra.x1, x1 = rb.x0, mx = (x0 + x1) / 2;
    ctx.strokeStyle = SAMENESS.boundary; ctx.globalAlpha = 0.7; ctx.lineWidth = 6;
    ctx.beginPath(); ctx.moveTo(x0, ra.y); ctx.bezierCurveTo(mx, ra.y, mx, rb.y, x1, rb.y); ctx.stroke();
    if (ra.clipped) stub(ctx, x0 + 6, ra.y, ra.above ? -1 : 1); if (rb.clipped) stub(ctx, x1 - 6, rb.y, rb.above ? -1 : 1);
  }
  ctx.globalAlpha = 1;
  // the link lines between the panes — the set LK gives (the seam)
  const lines = [...LK.shown(S.a).filter((s) => s.far === S.b).map((s) => ({ s, nearPane: E.paneA, nearAddr: S.a, farPane: E.paneB, farAddr: S.b })),
    ...LK.shown(S.b).filter((s) => s.far === S.a).map((s) => ({ s, nearPane: E.paneB, nearAddr: S.b, farPane: E.paneA, farAddr: S.a }))];
  for (const { s, nearPane, nearAddr, farPane, farAddr } of lines) {
    const rn = rectOf(nearPane, nearAddr, s.pos);
    const farPos = s.farEnd && !s.farEnd.whole && s.farEnd.ordinal != null ? s.farEnd.ordinal : (REC.doc(farAddr).blocks[0] || { pos: 1 }).pos;
    const rf = rectOf(farPane, farAddr, farPos);
    if (!rn || !rf) continue;
    const left = nearPane === E.paneA ? rn : rf, right = nearPane === E.paneA ? rf : rn;
    const x0 = left.x1, x1 = right.x0, mx = (x0 + x1) / 2;
    ctx.strokeStyle = s.mark.hue; ctx.globalAlpha = s.mark.value; ctx.lineWidth = 1.6; ctx.setLineDash(s.linker === 'others' ? [5, 4] : []);
    ctx.beginPath(); ctx.moveTo(x0, left.y); ctx.bezierCurveTo(mx, left.y, mx, right.y, x1, right.y); ctx.stroke(); ctx.setLineDash([]);
    if (left.clipped) stub(ctx, x0 + 6, left.y, left.above ? -1 : 1); if (right.clipped) stub(ctx, x1 - 6, right.y, right.above ? -1 : 1);
  }
  ctx.globalAlpha = 1;
}

function stub(/** @type {CanvasRenderingContext2D} */ ctx, /** @type {number} */ x, /** @type {number} */ y, /** @type {number} */ dir) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(dir < 0 ? -Math.PI / 2 : Math.PI / 2);
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-8, -4); ctx.lineTo(-8, 4); ctx.closePath(); ctx.fillStyle = ctx.strokeStyle; ctx.fill(); ctx.restore();
}

/** the scene's own end — Esc, zoom-out, ←, the bar's ×: the plane as it was, pushed onto the trail after it (§2.5) */
export function close() {
  const s = end();
  if (s) TRAIL.push({ addr: s.a, pos: s.levelA, view: camView(), link: null, label: `${s.a} │ ${s.b}` }, camView());
}

/**
 * A navigation act ends the scene — a teleport, Back, Forward or a trail
 * jump, "a teleport dismissing the scene first" (§2.5): the plane as it was,
 * and nothing pushed, the act's own push or cursor move the one trail move it
 * makes, which re-takes the view it leaves (N-TRAIL).
 */
export function dismiss() { end(); }

/** take the scene down, the plane as it was: the pair that stood, or null where none did */
function end() {
  if (!scene || !els) return null;
  const s = scene;
  scene = null;
  els.root.classList.remove('on'); els.paneA.innerHTML = ''; els.paneB.innerHTML = ''; delete els.bar.dataset.face;
  markDirty();
  return s;
}

/** the scene's own keys (K-60): ↓/↑ by block within the focused pane */
export function key(/** @type {string} */ k) {
  if (!scene || !els) return false;
  const pane = document.activeElement && els.paneB.contains(document.activeElement) ? els.paneB : els.paneA;
  const step = pane.clientHeight * 0.8;
  if (k === 'PageDown') pane.scrollTop += step; else if (k === 'PageUp') pane.scrollTop -= step;
  else if (k === '↓') pane.scrollTop += 48; else if (k === '↑') pane.scrollTop -= 48;
  else if (k === 'Home') pane.scrollTop = 0; else if (k === 'End') pane.scrollTop = pane.scrollHeight;
  else return false;
  draw(); return true;
}
