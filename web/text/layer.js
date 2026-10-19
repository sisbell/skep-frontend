// T-LAYER — THE ONE RECONCILER (the structure record §3.2 "T-LAYER"; FP-12:
// one reconciler, two targets — the plane's text layer and the reading
// scene's panes; the scene BORROWS this mount). Layer 2. ENGINE-BOUND.
// State: VIEW — the mounted set with each record's layout scale and revision
// — THE ONE OWNER (FP-10). Mount an article when a document crosses S1's
// mount threshold (em 6.5, BELOW the canvas's readable 8, so bars become
// text and no character positions disagree — S1 Q7), unmount when it
// leaves or falls below 5.5 or its run or revision changed, the cap 8; laid
// out ONCE at 16 px and placed by transform from the same camera arithmetic
// (registration 0 px — S1). The marks and symbols are placed from LK's
// `shown` and `symbols`; the selection from O-SELECTION and the focus from
// N-WALK are handed to T-ARTICLE as values. The press rule's text half
// (§2.4): the layer takes pointer events at reading scale; a drag selects
// text and never pans. The copy event carries the passage's board and
// address beside the text (§2.4) in a flavor only a skep client reads.
// Carries: the wireframe's §16 `mount`/`unmount`/`place`/`S1.frame`; S1's
// `mount`, `place`, `S1.frame`; `driftSample` and `overlapCheck` become
// gate hooks (`web/gate/hooks.js` reads `mounted`).
// Rules: FP-1, FP-2, FP-8, FP-10, FP-12.

import * as REC from '../model/records.js';
import * as LK from '../links/links.js';
import { cam, sx, sy } from '../plane/camera.js';
import { MOUNT_EM, UNMOUNT_EM, MAX_MOUNTED } from '../plane/lod.js';
import { docBox, intersects } from '../plane/projection.js';
import { metricsFor } from '../plane/layout.js';
import { articleHTML } from './article.js';
import { fingerprintCue } from '../util.js';

/** @typedef {import('../model/records.js').Doc} Doc */
/** @typedef {import('../model/records.js').Block} Block */
/** @typedef {import('./article.js').ArticleView} ArticleView */

/**
 * @typedef {Object} Mounted
 * @property {HTMLElement} el
 * @property {Doc} d
 * @property {number} lay the layout scale: layout px per world unit
 * @property {number} runFrom
 * @property {number} runTo
 * @property {number} rev the document's revision at mount
 * @property {number} grev the view revision at mount
 * @property {number} fs the document's em in world units
 * @property {'plane' | 'scene'} target
 * @property {Array<{pos: number, top: number, left: number}>} [blockTops] each block's offset in the one 16 px layout (the gate's span registration)
 */

/** the fixed layout size (S1) */
export const LAY_FS = 16;

/** @type {Map<string, Mounted>} */
const mounted = new Map();
/** @type {Array<{addr: string, ms: number, blocks: number, emPx: number}>} the mount costs (a forced layout inside the measurement — S1) */
const mountLog = [];
/** the mount log, for the gate's figures */
export const mounts = () => mountLog.slice();
/** @type {HTMLElement | null} */
let layer = null;
/** the view revision: the selection, the reveal, the focus, the lenses — a bump remounts */
let grev = 0;
/** the readers of view state, set by the app (FP-10: read through the owners' exports) */
/** @type {() => ({addr: string, pos: number} | null)} */
let readSelection = () => null;
/** @type {() => ({addr: string, pos: number} | null)} */
let readFocus = () => null;

/** @param {HTMLElement} el the layer's element */
export function attach(el) { layer = el; }
/** the owners of the selection and the focus hand their readers in once */
export function readers(/** @type {() => ({addr: string, pos: number} | null)} */ sel, /** @type {() => ({addr: string, pos: number} | null)} */ foc) { readSelection = sel; readFocus = foc; }
/** bump the view revision: every mounted article is rebuilt on the next frame */
export function bump() { grev++; }
export const revision = () => grev;
/** the mounted set, read-only */
export const mountedSet = () => mounted;
/** @param {string} addr */
export const isMounted = (addr) => mounted.has(addr);

/** the article's view state, from the owners' readers and LK */
export function viewFor(/** @type {Doc} */ d, scene = false) {
  const s = REC.session();
  const h = REC.health();
  const device = REC.device();
  const ownerRow = REC.ownerOf(d.account || '');
  const isOwnerYou = !!(s && s.account && d.account === s.account);
  /** @type {Map<string, 'edition' | 'draft' | 'unknown'>} */
  const originKinds = new Map();
  for (const o of d.origins) { const od = REC.doc(o.doc); const p = REC.place(o.doc); originKinds.set(o.doc, p ? p.kind : od.meta ? (od.meta.published ? 'edition' : 'draft') : od.kind); }
  /** @type {ArticleView} */
  const v = {
    selected: readSelection(), focus: readFocus(),
    marks: LK.shown(d.addr), symbols: LK.symbols(d.addr), countAt: (b) => LK.countAt(d.addr, b),
    wholeLinks: LK.wholeLinks(d.addr).length,
    sessionAccount: s ? s.account : null,
    localTrust: !!(h && h.auth && h.auth.local_trust),
    notebook: true,
    scene, originKinds,
    deviceLabel: isOwnerYou && device ? device.label : null,
    ownerFingerprint: isOwnerYou && device ? device.fingerprint : null,
    keyPresent: isOwnerYou && !!device,
  };
  void ownerRow; void fingerprintCue;
  return v;
}

/**
 * Mount a document's article over its box — laid out once at LAY_FS.
 * @param {Doc} d
 * @returns {Mounted | null}
 */
function mount(d) {
  if (!layer || mounted.has(d.addr) || d.from < 0) return null;
  const t0 = performance.now();
  const box = docBox(d.addr);
  const m = metricsFor(d.extent || 1, box);
  const lay = LAY_FS / m.fs;
  const el = document.createElement('article');
  el.className = 'dtext';
  el.dataset.addr = d.addr;
  el.style.width = m.tw * lay + 'px';
  el.style.paddingLeft = m.x0 * lay + 'px';
  el.style.paddingTop = (box.h * (0.05 / 0.86)) * lay + 'px';
  el.style.height = (box.h - box.h * (0.05 / 0.86)) * lay + 'px';
  el.style.fontSize = LAY_FS + 'px';
  el.style.lineHeight = m.lineH * lay + 'px';
  el.setAttribute('aria-hidden', 'true'); // the ARIA mirror is the one accessible rendering (S1 Q7)
  el.innerHTML = articleHTML(d, viewFor(d), ownerAccount(d));
  layer.appendChild(el);
  const art = el.getBoundingClientRect(); // force layout: the cost must be real (S1); the article stands untransformed until placed
  // each block's place in the one layout (16 px), fractional (offsetTop rounds): the gate holds every later frame to it, scaled — a reflow would move a line
  const blockTops = [.../** @type {NodeListOf<HTMLElement>} */ (el.querySelectorAll('.sp'))].map((e) => { const r = e.getBoundingClientRect(); return { pos: Number(e.dataset.pos), top: r.top - art.top, left: r.left - art.left }; });
  /** @type {Mounted} */
  const rec = { el, d, lay, runFrom: d.from, runTo: d.to, rev: d.rev, grev, fs: m.fs, target: 'plane', blockTops };
  mounted.set(d.addr, rec);
  place(rec);
  mountLog.push({ addr: d.addr, ms: performance.now() - t0, blocks: d.blocks.length, emPx: m.fs * cam.scale });
  if (mountLog.length > 500) mountLog.shift();
  return rec;
}

/** the owner account of a document: by `effective_owner` where read, else its account */
export function ownerAccount(/** @type {Doc} */ d) {
  const row = d.account ? REC.ownerOf(d.account) : undefined;
  return (row && row.prefix) || (d.meta && d.meta.owner) || d.account || '';
}

/** @param {string} addr */
function unmount(addr) {
  const rec = mounted.get(addr); if (!rec) return;
  rec.el.remove(); mounted.delete(addr);
}

/** position a mounted article over its box — transform only, never reflow */
function place(/** @type {Mounted} */ rec) {
  const box = docBox(rec.d.addr);
  const s = cam.scale / rec.lay;
  rec.el.style.transform = `translate(${sx(box.x)}px, ${sy(box.y)}px) scale(${s})`;
}

/**
 * The per-frame policy, run at the end of each draw: unmount what left or
 * fell below the threshold or went stale, mount what crossed it (the cap),
 * place everything.
 * @param {(addr: string) => boolean} [focusedResidue] whether a residue document is the focus (the one of its cell that mounts)
 */
export function frame(focusedResidue = () => false) {
  if (!layer) return;
  const v = { x0: 0, y0: 0, x1: 0, y1: 0 };
  const pad = 40;
  const VW = layer.clientWidth || window.innerWidth, VH = layer.clientHeight || window.innerHeight;
  v.x0 = (-pad - VW / 2) / cam.scale + cam.x; v.x1 = (VW + pad - VW / 2) / cam.scale + cam.x;
  v.y0 = (-pad - VH / 2) / cam.scale + cam.y; v.y1 = (VH + pad - VH / 2) / cam.scale + cam.y;
  /** @type {Array<{d: Doc, em: number}>} */
  const want = [];
  for (const d of REC.docs()) {
    if (d.from < 0 || d.system) continue;
    const box = docBox(d.addr);
    if (!intersects(box, v)) continue;
    if (box.residue && !focusedResidue(d.addr)) continue;
    const em = metricsFor(d.extent || 1, box).fs * cam.scale;
    if (em >= MOUNT_EM) want.push({ d, em });
  }
  want.sort((a, b) => b.em - a.em);
  const keep = new Set(want.slice(0, MAX_MOUNTED).map((w) => w.d.addr));
  for (const [addr, rec] of [...mounted]) {
    const box = docBox(addr);
    const em = rec.fs * cam.scale;
    if (!intersects(box, v) || em < UNMOUNT_EM || (box.residue && !focusedResidue(addr))) { unmount(addr); continue; }
    if (rec.d.from !== rec.runFrom || rec.d.to !== rec.runTo || rec.rev !== rec.d.rev || rec.grev !== grev) unmount(addr);
  }
  for (const w of want.slice(0, MAX_MOUNTED)) if (!mounted.has(w.d.addr)) mount(w.d);
  for (const rec of mounted.values()) if (keep.has(rec.d.addr) || true) place(rec);
}

/**
 * The client rects of a block's element in a mounted article (the beams'
 * anchors, the overlays' span anchors) — per-line rects (S1 Q1).
 * @param {string} addr
 * @param {number} pos the block's first position
 * @returns {Array<{x: number, y: number, w: number, h: number}> | null}
 */
export function spanRects(addr, pos) {
  const rec = mounted.get(addr); if (!rec) return null;
  const sp = rec.el.querySelector(`.sp[data-pos="${pos}"]`);
  if (!sp) return null;
  const rs = [...sp.getClientRects()].map((r) => ({ x: r.left, y: r.top, w: r.width, h: r.height }));
  return rs.length ? rs : null;
}

/** the rect of a symbol element for a link in a mounted article */
export function symbolRect(/** @type {string} */ addr, /** @type {string} */ linkAddr) {
  const rec = mounted.get(addr); if (!rec) return null;
  const el = rec.el.querySelector(`.sym[data-link="${linkAddr}"]`);
  if (!el) return null;
  const r = el.getBoundingClientRect();
  return { x: r.left, y: r.top, w: r.width, h: r.height };
}

/**
 * The scene borrows the mount (FP-12's second target): an article's HTML for
 * a pane, laid out by the pane's own CSS, never transformed. The scene owns
 * the pane's element; this is the one place the HTML is made.
 * @param {Doc} d
 * @returns {string}
 */
export function sceneArticle(d) { return articleHTML(d, viewFor(d, true), ownerAccount(d)); }

/** the text of a mounted article (the gate's rendered case) */
export function mountedText(/** @type {string} */ addr) {
  const rec = mounted.get(addr); if (!rec) return null;
  const run = rec.el.querySelector('.run');
  return run ? run.textContent : rec.el.textContent;
}

/** every mounted address */
export const mountedAddrs = () => [...mounted.keys()];

/** unmount everything (a board change) */
export function clear() { for (const a of [...mounted.keys()]) unmount(a); }

/**
 * The copy event's addition (§2.4): the passage's board and address beside
 * the plain text, in a flavor only a skep client reads; the plain text alone
 * everywhere else.
 * @param {ClipboardEvent} e
 * @param {string} board the board's origin
 */
export function onCopy(e, board) {
  const sel = window.getSelection();
  if (!sel || sel.isCollapsed || !e.clipboardData) return;
  const node = sel.anchorNode && (sel.anchorNode.nodeType === 1 ? /** @type {Element} */ (sel.anchorNode) : sel.anchorNode.parentElement);
  const sp = node ? node.closest('.sp') : null;
  if (!sp) return;
  const text = sel.toString();
  e.clipboardData.setData('text/plain', text);
  e.clipboardData.setData('application/x-skep-passage', JSON.stringify({ board, addr: sp.getAttribute('data-addr'), pos: Number(sp.getAttribute('data-pos')) }));
  e.preventDefault();
}
