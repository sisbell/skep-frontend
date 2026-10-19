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
// text and never pans. THE SELECTION IS A BYTE SPAN (R11; foundations §3.1)
// and the platform's selection is its one mark (§2.1): this module carries
// the platform's range to the span it covers — each block's own text nodes
// walked, the chrome inside a block skipped, a character boundary carried to
// its byte position by T-SPAN — and the span back to a range, which it
// places over the mounted article when the selection is made and again
// after a remount, since a remount rebuilds the element and the platform's
// range dies with the old one. The copy event carries the passage's board
// and address beside the plain text and never in it (§2.4), in a flavor
// only a skep client reads; the plain text is the document's own bytes over
// the span, no label of the page among them.
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
import { posOfChar, charOfPos, sameSpan, CHROME } from './span.js';
import { fingerprintCue } from '../util.js';

/** @typedef {import('../model/records.js').Doc} Doc */
/** @typedef {import('../model/records.js').Block} Block */
/** @typedef {import('./article.js').ArticleView} ArticleView */
/** @typedef {import('./span.js').Span} Span */

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
/** @type {() => (Span | null)} */
let readSelection = () => null;
/** @type {() => ({addr: string, pos: number} | null)} */
let readFocus = () => null;

/** @param {HTMLElement} el the layer's element */
export function attach(el) { layer = el; }
/** the owners of the selection (a span) and the focus (a block) hand their readers in once */
export function readers(/** @type {() => (Span | null)} */ sel, /** @type {() => ({addr: string, pos: number} | null)} */ foc) { readSelection = sel; readFocus = foc; }
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
 * place everything; where the article holding the selection was mounted
 * this frame, place the platform's range over the span again.
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
  /** @type {string[]} the articles mounted this frame */
  const fresh = [];
  for (const w of want.slice(0, MAX_MOUNTED)) if (!mounted.has(w.d.addr) && mount(w.d)) fresh.push(w.d.addr);
  for (const rec of mounted.values()) if (keep.has(rec.d.addr) || true) place(rec);
  const sel = readSelection();
  if (sel && fresh.includes(sel.addr)) placeSelection(sel);
}

/**
 * The client rects of a span in a mounted article — per-line rects (S1 Q1):
 * without a width, the block keyed by its first position (the beams'
 * anchors); with one, the bytes named (an overlay at the selection).
 * @param {string} addr
 * @param {number} pos the block's first position, or the span's
 * @param {number | null} [width] the span's positions
 * @returns {Array<{x: number, y: number, w: number, h: number}> | null}
 */
export function spanRects(addr, pos, width = null) {
  const rec = mounted.get(addr); if (!rec) return null;
  if (width != null) {
    const r = rangeOf({ addr, pos, width });
    const rs = r ? [...r.getClientRects()].map((q) => ({ x: q.left, y: q.top, w: q.width, h: q.height })) : [];
    return rs.length ? rs : null;
  }
  const sp = rec.el.querySelector(`.sp[data-pos="${pos}"]`);
  if (!sp) return null;
  const rs = [...sp.getClientRects()].map((r) => ({ x: r.left, y: r.top, w: r.width, h: r.height }));
  return rs.length ? rs : null;
}

// ---- the platform's selection ↔ a span ------------------------------------------

/** the elements of an article's blocks in position order, a withheld run's face among them */
function blockEls(/** @type {Mounted} */ rec) { return /** @type {HTMLElement[]} */ ([...rec.el.querySelectorAll('.run > .sp, .run > .withheld')]); }

/** the text nodes that carry a block's own characters, in order — the chrome inside it skipped */
function textNodes(/** @type {HTMLElement} */ el) {
  /** @type {Text[]} */
  const out = [];
  const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  for (let n = w.nextNode(); n; n = w.nextNode()) { const p = n.parentElement; if (p && p.closest(CHROME)) continue; out.push(/** @type {Text} */ (n)); }
  return out;
}

/** the element a node is or sits in */
const elementOf = (/** @type {Node} */ n) => (n.nodeType === Node.ELEMENT_NODE ? /** @type {Element} */ (n) : n.parentElement);

/**
 * The byte position a boundary point of a range names in a block: the
 * character boundary the point falls at among the block's own text nodes,
 * carried to its byte position; a point outside the block, or in a block
 * that is not text (a withheld run, a record, a reference, hex), names the
 * block's edge on the side asked.
 * @param {Block} b
 * @param {HTMLElement} el
 * @param {Node} node
 * @param {number} offset
 * @param {'start' | 'end'} side
 */
function posOfPoint(b, el, node, offset, side) {
  if (b.kind !== 'para' || !el.contains(node)) return side === 'start' ? b.pos : b.pos + b.width;
  let count = 0;
  for (const tn of textNodes(el)) {
    const r = document.createRange(); r.selectNodeContents(tn);
    const c = r.comparePoint(node, offset);
    if (c < 0) return posOfChar(b, count);
    if (c === 0) return posOfChar(b, count + (node === tn ? offset : 0));
    count += tn.length;
  }
  return posOfChar(b, count);
}

/**
 * The span a platform range covers in a mounted article: the article the
 * range starts in (else ends in), the first and last of its blocks the range
 * touches, each end carried to its byte position; null where the range is
 * collapsed, lies outside the plane's mounted articles, or touches no block.
 * @param {Range} range
 * @returns {Span | null}
 */
export function spanOfRange(range) {
  if (range.collapsed) return null;
  const at = (/** @type {Node} */ n) => { const e = elementOf(n); return e ? /** @type {HTMLElement | null} */ (e.closest('article.dtext')) : null; };
  const art = at(range.startContainer) || at(range.endContainer);
  const addr = art ? art.dataset.addr || '' : '';
  const rec = addr ? mounted.get(addr) : undefined;
  if (!art || !rec || rec.el !== art) return null;
  const hit = blockEls(rec)
    .map((el) => ({ el, b: rec.d.blocks.find((x) => x.pos === Number(el.dataset.pos)) || null }))
    .filter((x) => x.b && range.intersectsNode(x.el));
  if (!hit.length) return null;
  const first = hit[0], last = hit[hit.length - 1];
  const p0 = posOfPoint(/** @type {Block} */ (first.b), first.el, range.startContainer, range.startOffset, 'start');
  const p1 = posOfPoint(/** @type {Block} */ (last.b), last.el, range.endContainer, range.endOffset, 'end');
  return p1 > p0 ? { addr, pos: p0, width: p1 - p0 } : null;
}

/** the platform's selection as a span of a mounted article, or null where none stands there */
export function spanOfSelection() {
  const s = window.getSelection();
  if (!s || s.rangeCount === 0 || s.isCollapsed) return null;
  return spanOfRange(s.getRangeAt(0));
}

/**
 * The boundary point of a block's element at a byte position: the text
 * node and offset of the character boundary there; a block that is not
 * text answers its edges.
 * @param {Block} b
 * @param {HTMLElement} el
 * @param {number} pos
 * @param {'start' | 'end'} side
 * @returns {{node: Node, offset: number}}
 */
function pointOfPos(b, el, pos, side) {
  if (b.kind !== 'para') return side === 'start' ? { node: el, offset: 0 } : { node: el, offset: el.childNodes.length };
  let ci = charOfPos(b, pos);
  const nodes = textNodes(el);
  for (const tn of nodes) { if (ci < tn.length || (side === 'end' && ci === tn.length)) return { node: tn, offset: ci }; ci -= tn.length; }
  const last = nodes[nodes.length - 1];
  return last ? { node: last, offset: last.length } : { node: el, offset: side === 'start' ? 0 : el.childNodes.length };
}

/**
 * The platform range over a span of a mounted article, or null where the
 * article is not mounted or the span lies in none of its delivered blocks.
 * @param {Span} span
 * @returns {Range | null}
 */
export function rangeOf(span) {
  const rec = mounted.get(span.addr); if (!rec) return null;
  const els = blockEls(rec);
  const elOf = (/** @type {Block} */ b) => els.find((e) => Number(e.dataset.pos) === b.pos) || null;
  const end = span.pos + span.width;
  const blocks = rec.d.blocks;
  const b0 = blocks.find((b) => span.pos >= b.pos && span.pos < b.pos + b.width) || blocks.find((b) => b.pos >= span.pos) || null;
  const b1 = [...blocks].reverse().find((b) => end > b.pos && end <= b.pos + b.width) || [...blocks].reverse().find((b) => b.pos + b.width <= end) || null;
  const e0 = b0 ? elOf(b0) : null, e1 = b1 ? elOf(b1) : null;
  if (!b0 || !b1 || !e0 || !e1 || b1.pos < b0.pos) return null;
  const s = pointOfPos(b0, e0, span.pos, 'start'), t = pointOfPos(b1, e1, end, 'end');
  const r = document.createRange(); r.setStart(s.node, s.offset); r.setEnd(t.node, t.offset);
  return r.collapsed ? null : r;
}

/** @type {Span | null} the span the platform's selection was last placed over, as its range reads back */
let placed = null;

/**
 * Place the platform's selection over a span — the one range this layer
 * sets: when the selection is made, and after a remount of the article
 * that holds it. A platform selection that already covers the span is left
 * as it stands; one outside the layer is never touched; null clears a
 * selection that lies in the layer.
 * @param {Span | null} span
 */
export function placeSelection(span) {
  const s = window.getSelection(); if (!s) return;
  const standing = s.rangeCount ? s.getRangeAt(0) : null;
  if (!span) { placed = null; if (standing && layer && layer.contains(standing.commonAncestorContainer)) s.removeAllRanges(); return; }
  const have = standing && !standing.collapsed ? spanOfRange(standing) : null;
  if (have && sameSpan(have, span)) { placed = have; return; }
  const r = rangeOf(span); if (!r) return;
  s.removeAllRanges(); s.addRange(r);
  placed = spanOfRange(r);
}

/**
 * The span the platform's selection was last placed over, as that range
 * reads back — a block placed whole reads back as its text, its separator
 * not among the characters — so the input tells a selection the page made
 * from one the person made and never takes the page's own back as a new
 * one; null where none stands.
 */
export const placedSpan = () => placed;

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
 * the plain text and never in it, in a flavor only a skep client reads —
 * the span the platform's selection covers, as `{board, addr, pos, width}`.
 * The plain text is the document's own bytes over that span, so a paste
 * anywhere else carries the passage alone and no label of the page (a
 * hairline's, a mark's, a symbol's, a count's). A selection outside the
 * layer leaves the event to the platform.
 * @param {{clipboardData: {setData(format: string, data: string): void} | null, preventDefault(): void}} e the clipboard event (the gate's door hands a stub)
 * @param {string} board the board's origin
 * @returns {Span | null} the span copied
 */
export function onCopy(e, board) {
  const span = spanOfSelection();
  if (!span || !e.clipboardData) return null;
  e.clipboardData.setData('text/plain', REC.textBetween(span.addr, span.pos, span.pos + span.width));
  e.clipboardData.setData('application/x-skep-passage', JSON.stringify({ board, addr: span.addr, pos: span.pos, width: span.width }));
  e.preventDefault();
  return span;
}
