// SC — THE READING SCENE (the structure record §3.2 "SC"; B1-S9; foundations
// §2.5; law 12: chrome). Layer 2. ENGINE-BOUND. State: VIEW — the pair, the
// two ends it sets level, the bands' and lines' ends as measured in the panes,
// the panes' scrolls, and the element it was opened from (the one owner).
// Two documents at reading scale side by side over the plane, each pane
// scrolling on its own (R3); the places unmoved, nothing written; the dialog
// named as it attaches by ST's `L.scene-label`. It sets the two ends LEVEL,
// "so position carries the match and the beam confirms it" (§2.5): the
// passage the opener holds — a link's span, a selection, the
// versions list's held passage, provenance's span — at its first stretch of
// shared identity, and its counterpart in the other document, or the far end
// a link names (`levels`); each pane's matched line brought to one height, and
// each article given a pane's height of room below its end so a passage near
// the end can be brought there too; a re-level act (K-62) restores that.
// Between the panes LINKS are drawn as LINES from the set LK gives (the seam
// at the link-beam source — hue the linker's, dashed for another's) and
// SHARED IDENTITY as BANDS from `compare`'s pairs, each run of contiguous
// pairs one band (`merged`; no link); each leaves its pane at its passage's
// first line — measured, through T-LAYER's byte-span mapping over the pane's
// article, when the scene is set level or its panes change size, and moved
// with each pane's scroll — and one whose end has left its pane is clipped at
// the pane's edge with the stub's triangle. Whatever ends it — zoom-out, Esc,
// ←, the bar's ×, or a navigation act (a teleport, Back, Forward, a trail
// jump), which ends it first, "a teleport dismissing the scene first" (§2.5)
// — leaves the plane as it was and the trail as it found it (`close`): the
// scene never moves the camera, so an entry pushed for the plane as it was
// would hold the view of the entry it departs, a Back from it moving nothing,
// and its push would drop the entries ahead of the cursor. §2.5 pairs that
// push with the scene recorded as the departure — its pair and both panes'
// positions — so Back restores it; N-TRAIL's entry holds an address and a
// view and no scene, and whether Back restores a scene is the design's open
// question. THE FOCUS (D5 §4 rules 5 and 8; K-61, K-63; the focus record's
// rule 17; FP-20): opened, the scene puts the focus in the far end's pane and
// takes the plane it stands over out of the page's order and the
// accessibility tree, each region by its owner (N-WALK's tree, T-LAYER's
// corners: `cover`), so the one ring runs the line → pane, pane, the bar's
// acts → the standing overlay → the line, in the place of the plane's stop
// and its corner, and reaches nothing the scene covers; the one line is
// never covered, and the LEAP box stands over the scene. Whatever ends it
// puts the plane back first and hands the focus back through N-FOCUS, the
// focus's owner, which takes a focus the scene held off it and returns one
// standing on nothing to the element the scene was opened from — read as it
// opens, once the overlay it dismisses has returned the focus that overlay
// held, and kept by the controller's one memory where a scene opens over a
// standing one — or to the walk's element where that no longer takes it; a
// navigation act's landing then carries it on (rule 8), and a focus the
// person moved out of the scene stays where it is. EACH PANE IS A NAMED
// REGION (SC9): named by its own document's address, the head of the article
// it holds, and ↓ and ↑ in it move by BLOCK — the next block's top brought to
// the pane's top (K-60; D1's first stage) — PageDown and PageUp by most of a
// pane, Home and End to its ends. The panes BORROW the one reconciler's mount
// (FP-12: `T-LAYER.sceneArticle` makes the HTML, `T-LAYER.rangeIn` finds a
// passage in it; the scene keeps no DOM text of its own). Each pane carries
// its own document's corner (ux-T2: "each pane its own"; `T-LAYER.sceneCorner`
// makes its items) on its OUTER side — pane A's left, pane B's right — held
// to the top of the pane's scroll, so the bands and lines leave the inner
// edges clear of it (foundations §3.1). THE PANES ARE READ, NOT ACTED ON
// (B1-S9: "read both…; scroll each"): nothing in a pane takes a pointer — its
// blocks, hairlines, symbols and presence ⟡ and its corner's version
// statement carry none of the plane's click cues and are no controls
// (T-ARTICLE's scene-mode variant) — and the keys a pane takes move that
// pane alone (`key`), N-KEYS handing none to what the scene covers. The
// scene's ACTS are its bar's buttons — re-level (K-62, its chord drawn for
// the platform, rule 19) and the dismissal — each pressed by a click anywhere
// on it, by Enter or by Space. A roving stop inside a pane and what a click
// or a key at a mark would act on — a beam followed into the other pane
// (B1-S9), each pane's own selection (§2.5, PROPOSED; #94) — are D1's second
// stage, after each pane has its selection. Companionate scrolling over the
// bands is UNTESTED (S27) and not built. Carries: the wireframe's §19 whole
// (its beams over `compare`'s pairs instead of the hand data's windows).
// Rules: FP-1, FP-2, FP-10, FP-12, FP-13, FP-20.

import * as PUMP from '../model/pump.js';
import * as REC from '../model/records.js';
import * as F from '../model/frames.js';
import * as LAYER from '../text/layer.js';
import * as LK from '../links/links.js';
import * as HOST from '../overlays/host.js';
import * as WALK from '../nav/walk.js';
import * as FOCUS from '../nav/focus.js';
import { drawChord } from '../nav/keys.js';
import { SAMENESS } from '../plane/register.js';
import { markDirty } from '../plane/camera.js';
import { t } from '../strings.js';
import { esc } from '../util.js';

/** @typedef {import('../model/frames.js').ComparePair} ComparePair */

/**
 * @typedef {Object} Level — the two ends the scene sets level, a position in each pane's document; null where that pane stands at its top
 * @property {number | null} a
 * @property {number | null} b
 */

/**
 * @typedef {Object} Held — what an opener holds as it opens the scene
 * @property {number | null} [posA] the first position of the passage held in the first document
 * @property {number | null} [widthA] its positions; absent or null, the position alone
 * @property {number | null} [posB] the position in the second document the opener names — a link's far end — where it names one
 */

/**
 * @typedef {Object} End — one end of a band or a line: its passage, and where the passage's first line stands in its pane's scrolled content
 * @property {number} pos the passage's first position
 * @property {number} width its positions
 * @property {number} y the first line's middle, px below the pane's content top
 */

/**
 * @typedef {Object} Tie — a band or a line between the panes, its ends measured
 * @property {'band' | 'link'} kind a run of shared identity, or a link drawn at one pane's document whose far end lies in the other's
 * @property {string | null} link the link's address, for a line
 * @property {End} a its end in pane A
 * @property {End} b its end in pane B
 */

/**
 * @typedef {Object} Drawn — a tie as the last draw drew it, its ends on screen
 * @property {'band' | 'link'} kind
 * @property {string | null} link
 * @property {{pos: number, width: number, x: number, y: number, clipped: boolean}} a
 * @property {{pos: number, width: number, x: number, y: number, clipped: boolean}} b
 */

/** how far below the panes' tops the two ends are set level (px), where both can stand there */
const LEVEL_AT = 40;
/** the bands drawn at most */
const MAX_BANDS = 400;

/** @type {{a: string, b: string, pairs: ComparePair[], level: Level, ties: Array<Tie & {hue: string, value: number, dashed: boolean}>, size: string} | null} */
let scene = null;
/** @type {{root: HTMLElement, bar: HTMLElement, paneA: HTMLElement, paneB: HTMLElement, canvas: HTMLCanvasElement} | null} */
let els = null;
/** @type {Drawn[]} what the last draw drew */
let drawnTies = [];

/** the plane the scene stands over out of the page's order while it stands (true), and back as it ends (false) — each region by its owner (D5 §4 rule 5) */
function coverPlane(/** @type {boolean} */ on) { WALK.cover(on); LAYER.cover(on); }

/**
 * A pane named as a region by its own document's address — the head of the
 * article it holds (SC9; the focus record's D5: a caption of its own).
 * @param {HTMLElement} pane
 * @param {string} id the id the head's address takes, for the reference
 */
function namePane(pane, id) {
  pane.setAttribute('role', 'region');
  const addr = /** @type {HTMLElement | null} */ (pane.querySelector('.hd .addr'));
  if (addr) { addr.id = id; pane.setAttribute('aria-labelledby', id); }
}

/** @param {{root: HTMLElement, bar: HTMLElement, paneA: HTMLElement, paneB: HTMLElement, canvas: HTMLCanvasElement}} e */
export function attach(e) {
  els = e;
  e.root.setAttribute('aria-label', t('L.scene-label'));
  for (const p of [e.paneA, e.paneB]) p.addEventListener('scroll', () => draw());
  // a click on an act is its button's wherever on the button it lands — the re-level's chord mark among them
  e.bar.addEventListener('click', (ev) => { const tg = /** @type {HTMLElement} */ (ev.target); if (tg.closest('[data-x]')) close(); else if (tg.closest('[data-relevel]')) relevel(); });
}
export const isOpen = () => scene !== null;
export const pair = () => (scene ? { a: scene.a, b: scene.b } : null);
/** the scene's runs of shared identity and the two ends it sets level, read-only (the gate reads them) */
export const pairs = () => (scene ? { pairs: scene.pairs.map((p) => ({ ...p })), level: { ...scene.level } } : null);
/** the bands and lines the last draw drew, their ends on screen (the gate holds each to its passage's line) */
export const ties = () => drawnTies.map((d) => ({ ...d, a: { ...d.a }, b: { ...d.b } }));

/**
 * `compare`'s pairs with each run of contiguous pairs — adjoining in both
 * documents — one pair, in the first document's order (§2.5: one band per
 * shared run).
 * @param {ComparePair[]} raw
 * @returns {ComparePair[]}
 */
export function merged(raw) {
  /** @type {ComparePair[]} */
  const out = [];
  for (const p of [...raw].sort((x, y) => x.u1 - y.u1 || x.u2 - y.u2)) {
    const last = out[out.length - 1];
    if (last && last.d1 === p.d1 && last.d2 === p.d2 && last.u1 + last.width === p.u1 && last.u2 + last.width === p.u2) last.width += p.width;
    else out.push({ ...p });
  }
  return out;
}

/**
 * The two ends the scene sets level (§2.5: "position carries the match"):
 * where the opener names a position in the second document — a link's far
 * end — the held position and that one; else the first stretch of shared
 * identity inside the passage held, its first position in the first document
 * and its counterpart in the second, the second at its top where the held
 * passage shares none; with nothing held, the first pair's two ends.
 * @param {ComparePair[]} runs `compare`'s pairs, `u1` in the first document
 * @param {Held} [held]
 * @returns {Level}
 */
export function levels(runs, held = {}) {
  const posA = held.posA ?? null;
  if (held.posB != null) return { a: posA, b: held.posB };
  const sorted = [...runs].sort((x, y) => x.u1 - y.u1);
  if (posA == null) return sorted.length ? { a: sorted[0].u1, b: sorted[0].u2 } : { a: null, b: null };
  const end = posA + Math.max(1, held.widthA ?? 1);
  const p = sorted.find((q) => q.u1 < end && posA < q.u1 + q.width);
  if (!p) return { a: posA, b: null };
  const a = Math.max(posA, p.u1);
  return { a, b: p.u2 + (a - p.u1) };
}

/**
 * Open the scene on two documents, the passage held set level with its
 * counterpart (`levels`); the focus in the far end's pane, the plane under
 * the scene out of the page's order (see the head).
 * @param {string} a
 * @param {string} b
 * @param {Held} [held]
 */
export async function open(a, b, held = {}) {
  if (!els) return;
  HOST.dismiss();
  // where the act found the focus — read after the dismissal, which hands back a focus the overlay held, and before the
  // reads, in which the person may move it; a scene opened over one standing keeps that one's (the controller's one memory)
  const from = document.activeElement;
  const [da, db] = await Promise.all([PUMP.loadWhole(a), PUMP.loadWhole(b)]);
  if (!da || !db) return;
  const cmp = await PUMP.read(F.compare([{ doc: a, spans: [{ ordinal: 1, positions: Math.max(1, da.extent || 1) }] }], [{ doc: b, spans: [{ ordinal: 1, positions: Math.max(1, db.extent || 1) }] }]));
  /** @type {ComparePair[]} */
  let runs = [];
  if ('refused' in cmp) { const r = cmp.refused; els.bar.dataset.face = r.name; }
  else runs = merged(F.decodeCompare(cmp.answer));
  scene = { a, b, pairs: runs, level: levels(runs, held), ties: [], size: '' };
  coverPlane(true);
  els.root.classList.add('on');
  els.bar.innerHTML = `<b>${esc(a)}</b> │ <b>${esc(b)}</b> <span class="dim">${esc(t('F.scene.sameness'))} · ${esc(t('F.scene.link'))}</span>` +
    (els.bar.dataset.face ? ` <span class="face-text">${esc(t(els.bar.dataset.face === 'too_many_pairs' ? 'B1.too_many_pairs' : els.bar.dataset.face === 'too_many_blocks' ? 'B1.too_many_blocks' : 'L.refused', { name: els.bar.dataset.face }))}</span>` : '') +
    ` <button data-relevel="1">${esc(t('F.scene.relevel'))} <kbd>${esc(drawChord('Mod+R'))}</kbd></button><button class="x" data-x="1">× ${esc(t('F.scene.dismiss'))}</button>`;
  const corner = (/** @type {string} */ addr, /** @type {import('../model/records.js').Doc} */ d) => `<div class="corner" data-corner="${esc(addr)}">${LAYER.sceneCorner(d)}</div>`;
  els.paneA.innerHTML = corner(a, da) + `<article class="dtext scene" data-addr="${esc(a)}">${LAYER.sceneArticle(da)}</article>`;
  els.paneB.innerHTML = `<article class="dtext scene" data-addr="${esc(b)}">${LAYER.sceneArticle(db)}</article>` + corner(b, db);
  namePane(els.paneA, 'sceneA-name'); namePane(els.paneB, 'sceneB-name');
  els.paneA.setAttribute('tabindex', '0'); els.paneB.setAttribute('tabindex', '0');
  relevel();
  FOCUS.open('scene', { el: els.root, from, byKey: true, first: els.paneB });
  markDirty();
}

/** the article a pane holds */
const articleIn = (/** @type {HTMLElement} */ pane) => /** @type {HTMLElement | null} */ (pane.querySelector('article.dtext'));

/**
 * Where a passage's first line stands in a pane, in px below the pane's
 * content top: the first client rect of the platform range over the passage
 * (T-LAYER's mapping, the article's chrome skipped); null where the passage
 * lies in none of the pane's delivered blocks.
 * @param {HTMLElement} pane
 * @param {string} addr the pane's document
 * @param {number} pos
 * @param {number} width
 * @returns {{top: number, y: number} | null} the line's top, and its middle
 */
function lineIn(pane, addr, pos, width) {
  const art = articleIn(pane);
  const range = art ? LAYER.rangeIn(art, REC.doc(addr), { addr, pos, width: Math.max(1, width) }) : null;
  const r = range ? [...range.getClientRects()].find((q) => q.width > 0 && q.height > 0) : null;
  if (!r) return null;
  const origin = pane.getBoundingClientRect().top + pane.clientTop - pane.scrollTop;
  return { top: r.top - origin, y: r.top + r.height / 2 - origin };
}

/** the positions of the block holding a position in a document, from that position to the block's end; one where no block holds it */
function restOfBlock(/** @type {string} */ addr, /** @type {number} */ pos) {
  const b = REC.blockAt(addr, pos);
  return b ? b.pos + b.width - pos : 1;
}

/** each pane's article given a pane's height of room below its end, so any of its lines can be scrolled to the pane's top */
function roomBelow(/** @type {NonNullable<typeof els>} */ E) {
  for (const pane of [E.paneA, E.paneB]) { const art = articleIn(pane); if (art) art.style.paddingBottom = pane.clientHeight + 'px'; }
}

/** the panes' sizes, the measure the ties' ends were taken at */
const sizeOf = (/** @type {NonNullable<typeof els>} */ E) => `${E.paneA.clientWidth}x${E.paneA.clientHeight}|${E.paneB.clientWidth}x${E.paneB.clientHeight}`;

/**
 * Measure the ties: each run of shared identity and each link between the
 * two documents, its ends at their passages' first lines in the panes'
 * content; a tie an end of which lies in no delivered block is left out.
 */
function measure() {
  const S = scene, E = els;
  if (!S || !E) return;
  /** @type {NonNullable<typeof scene>['ties']} */
  const out = [];
  for (const p of S.pairs.slice(0, MAX_BANDS)) {
    const la = lineIn(E.paneA, S.a, p.u1, p.width), lb = lineIn(E.paneB, S.b, p.u2, p.width);
    if (la && lb) out.push({ kind: 'band', link: null, a: { pos: p.u1, width: p.width, y: la.y }, b: { pos: p.u2, width: p.width, y: lb.y }, hue: SAMENESS.boundary, value: 0.7, dashed: false });
  }
  // the link lines between the panes — the set LK gives (the seam)
  for (const [nearAddr, farAddr, nearPane, farPane] of /** @type {const} */ ([[S.a, S.b, E.paneA, E.paneB], [S.b, S.a, E.paneB, E.paneA]])) {
    for (const s of LK.shown(nearAddr).filter((x) => x.far === farAddr)) {
      const farPos = s.farEnd && !s.farEnd.whole && s.farEnd.ordinal != null ? s.farEnd.ordinal : (REC.doc(farAddr).blocks[0] || { pos: 1 }).pos;
      const farWidth = s.farEnd && !s.farEnd.whole && s.farEnd.positions ? s.farEnd.positions : restOfBlock(farAddr, farPos);
      const ln = lineIn(nearPane, nearAddr, s.pos, s.width), lf = lineIn(farPane, farAddr, farPos, farWidth);
      if (!ln || !lf) continue;
      const near = { pos: s.pos, width: s.width, y: ln.y }, far = { pos: farPos, width: farWidth, y: lf.y };
      out.push({ kind: 'link', link: s.link.addr, a: nearPane === E.paneA ? near : far, b: nearPane === E.paneA ? far : near, hue: s.mark.hue, value: s.mark.value, dashed: s.linker === 'others' });
    }
  }
  S.ties = out;
  S.size = sizeOf(E);
}

/** set the two ends level: each pane's matched line at one height; the bands' and lines' ends measured anew */
export function relevel() {
  const S = scene, E = els;
  if (!S || !E) return;
  roomBelow(E);
  const la = S.level.a != null ? lineIn(E.paneA, S.a, S.level.a, restOfBlock(S.a, S.level.a)) : null;
  const lb = S.level.b != null ? lineIn(E.paneB, S.b, S.level.b, restOfBlock(S.b, S.level.b)) : null;
  // a pane scrolls a line up its pane, never below where it stands unscrolled: the two meet at LEVEL_AT, or higher where one stands above it
  const at = Math.min(LEVEL_AT, la ? la.top : Infinity, lb ? lb.top : Infinity);
  E.paneA.scrollTop = la ? la.top - at : 0;
  E.paneB.scrollTop = lb ? lb.top - at : 0;
  measure();
  draw();
}

/** draw the bands and the lines on the scene's canvas, each end where its passage's line stands at the panes' scrolls now */
export function draw() {
  const S = scene, E = els;
  if (!S || !E) return;
  if (sizeOf(E) !== S.size) { roomBelow(E); measure(); }
  const cv = E.canvas, ctx = cv.getContext('2d'); if (!ctx) return;
  const c = cv.getBoundingClientRect();
  const DPR = Math.min(2, window.devicePixelRatio || 1);
  cv.width = Math.round(c.width * DPR); cv.height = Math.round(c.height * DPR);
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0); ctx.clearRect(0, 0, c.width, c.height);
  /** a pane on the canvas: its inner edges, its visible content's top and bottom, its content's top */
  const frame = (/** @type {HTMLElement} */ pane) => {
    const r = pane.getBoundingClientRect(), top = r.top + pane.clientTop - c.top;
    return { x0: r.left - c.left, x1: r.right - c.left, top, bottom: top + pane.clientHeight, origin: top - pane.scrollTop };
  };
  /** an end on the canvas: at its line, or at the pane's edge where its line has left the pane */
  const at = (/** @type {ReturnType<typeof frame>} */ f, /** @type {End} */ e) => {
    const y = f.origin + e.y;
    return { y: Math.max(f.top, Math.min(f.bottom, y)), clipped: y < f.top || y > f.bottom, above: y < f.top };
  };
  const fa = frame(E.paneA), fb = frame(E.paneB);
  /** @type {Drawn[]} */
  const out = [];
  for (const tie of S.ties) {
    const ea = at(fa, tie.a), eb = at(fb, tie.b);
    const x0 = fa.x1, x1 = fb.x0, mx = (x0 + x1) / 2;
    ctx.strokeStyle = tie.hue; ctx.globalAlpha = tie.value; ctx.lineWidth = tie.kind === 'band' ? 6 : 1.6; ctx.setLineDash(tie.dashed ? [5, 4] : []);
    ctx.beginPath(); ctx.moveTo(x0, ea.y); ctx.bezierCurveTo(mx, ea.y, mx, eb.y, x1, eb.y); ctx.stroke(); ctx.setLineDash([]);
    if (ea.clipped) stub(ctx, x0 + 6, ea.y, ea.above ? -1 : 1); if (eb.clipped) stub(ctx, x1 - 6, eb.y, eb.above ? -1 : 1);
    out.push({ kind: tie.kind, link: tie.link, a: { pos: tie.a.pos, width: tie.a.width, x: x0 + c.left, y: ea.y + c.top, clipped: ea.clipped }, b: { pos: tie.b.pos, width: tie.b.width, x: x1 + c.left, y: eb.y + c.top, clipped: eb.clipped } });
  }
  ctx.globalAlpha = 1;
  drawnTies = out;
}

function stub(/** @type {CanvasRenderingContext2D} */ ctx, /** @type {number} */ x, /** @type {number} */ y, /** @type {number} */ dir) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(dir < 0 ? -Math.PI / 2 : Math.PI / 2);
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-8, -4); ctx.lineTo(-8, 4); ctx.closePath(); ctx.fillStyle = ctx.strokeStyle; ctx.fill(); ctx.restore();
}

/**
 * End the scene, whatever ends it — Esc, zoom-out, ←, the bar's ×, or a
 * navigation act, which ends it first (§2.5): the plane as it was, and the
 * trail untouched, a navigation act's own push or cursor move the one trail
 * move it makes (see the head). The plane is put back in the page's order
 * before the focus returns, for the element the scene was opened from — the
 * walk's item, a corner — takes no focus while the scene covers it; the
 * focus's owner takes a focus the scene held off it and returns it.
 */
export function close() {
  if (!scene || !els) return;
  scene = null;
  drawnTies = [];
  coverPlane(false);
  els.root.classList.remove('on'); els.paneA.innerHTML = ''; els.paneB.innerHTML = ''; delete els.bar.dataset.face;
  FOCUS.close('scene');
  markDirty();
}

/**
 * The top of the block next below (dir 1) or above (dir −1) a pane's scroll,
 * in px of the pane's content — the first block whose top lies past the
 * scroll by more than a pixel; the pane's end past the last block, its top
 * before the first. Null where the pane holds no article.
 * @param {HTMLElement} pane
 * @param {1 | -1} dir
 * @returns {number | null}
 */
function blockTop(pane, dir) {
  const art = articleIn(pane); if (!art) return null;
  const origin = pane.getBoundingClientRect().top + pane.clientTop - pane.scrollTop;
  const tops = [...art.querySelectorAll('.run > .sp, .run > .withheld')].map((e) => e.getBoundingClientRect().top - origin);
  const at = pane.scrollTop;
  const next = dir > 0 ? tops.find((y) => y > at + 1) : tops.slice().reverse().find((y) => y < at - 1);
  if (next == null) return dir > 0 ? pane.scrollHeight : 0;
  return Math.max(0, Math.round(next));
}

/** the scene's own keys (K-60): ↓/↑ by block within the focused pane — the next block's top brought to the pane's top — PageDown/PageUp by most of the pane, Home/End to its ends */
export function key(/** @type {string} */ k) {
  if (!scene || !els) return false;
  const pane = document.activeElement && els.paneB.contains(document.activeElement) ? els.paneB : els.paneA;
  const step = pane.clientHeight * 0.8;
  if (k === 'PageDown') pane.scrollTop += step; else if (k === 'PageUp') pane.scrollTop -= step;
  else if (k === '↓' || k === '↑') { const top = blockTop(pane, k === '↓' ? 1 : -1); if (top == null) return false; pane.scrollTop = top; }
  else if (k === 'Home') pane.scrollTop = 0; else if (k === 'End') pane.scrollTop = pane.scrollHeight;
  else return false;
  draw(); return true;
}
