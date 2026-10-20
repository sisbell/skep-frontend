// O-HOST — one act-overlay at a time (the structure record §3.2 "O-HOST";
// foundations §3.1: every control is chrome an ACT conjures and its end
// dismisses — an HTML layer positioned over the plane at the act's site,
// following its place as the camera moves, gone with Esc, the next act or
// its own completion; never a fixed region). Layer 2. ENGINE-BOUND.
// State: VIEW — the current overlay (the one owner). The focus hand-off (D5
// §4 rule 4): an overlay a KEY opened takes focus on its first control; one
// the system raises (a face) never takes it. The return is the element the
// focus stood on as the last overlay that took it opened, read before
// anything here moves it — a control of the overlay it replaced or rebuilt,
// where the act was taken there, which the rewrite removes. A replacement or
// rebuild that takes no focus keeps it, for its rewrite drops the focus the
// markup it overwrites held; and the dismissal, whichever overlay it closes,
// hands a focus left on nothing back through N-WALK, the focus's owner: to
// that element, or to the walk's element where that no longer takes the
// focus.
// Each act is told whether a key ran it, so an act that teleports draws the
// ring at its landing (D5 §4 rule 2): Enter on its control, taken here before
// the platform's click, or the click the platform makes from a key (Space on
// a button), which carries no click count — a pointer's carries its count.
// A pan or a zoom is never "the next act": the overlay follows its anchor.
// Carries: the wireframe's §18 `overlay` object, `anchorOfSpan`.
// Rules: FP-1, FP-2, FP-9, FP-10 (its own DOM alone), FP-13.

import { sx, sy, viewport, markDirty } from '../plane/camera.js';
import * as LAYER from '../text/layer.js';
import * as WALK from '../nav/walk.js';
import { docBox } from '../plane/projection.js';

/**
 * @typedef {Object} Anchor — where an overlay stands
 * @property {{x: number, y: number}} [world] a world point (follows the camera)
 * @property {HTMLElement} [el] an element (follows it while connected)
 * @property {{x: number, y: number}} [screen] a screen point
 * @property {{addr: string, pos: number, width?: number}} [span] a span of a mounted article — a block by its first position, or the bytes named by a width (its first line's rect)
 */

/** @typedef {(el: HTMLElement, byKey: boolean) => void} Act an overlay's act, run on the element that bears its `data-run`; `byKey` a key ran it */

/**
 * @typedef {Object} Overlay
 * @property {'card' | 'face' | 'list' | 'moment'} kind
 * @property {Anchor | null} anchor
 * @property {string} html
 * @property {Record<string, Act>} [acts] handlers by `data-run` name
 * @property {(replaced: boolean) => void} [onDismiss] its end: `replaced` where the next act's overlay took its place, so what stands behind it (the selection) stands on; false where it was dismissed
 * @property {boolean} [takeFocus] opened by a keyboard act: focus its first control
 * @property {string} [id] a name the gate reads
 */

/** @type {HTMLElement | null} */
let el = null;
/** @type {Overlay | null} */
let current = null;
/** @type {Element | null} the element the focus returns to as the overlays end: where it stood as the last overlay that took it opened */
let returnTo = null;

/** @param {HTMLElement} e */
export function attach(e) {
  el = e;
  el.addEventListener('click', (ev) => {
    const target = /** @type {HTMLElement} */ (ev.target);
    if (target.dataset.x) { dismiss(); ev.stopPropagation(); return; }
    const b = target.closest('[data-run]');
    if (b && current && current.acts) { ev.stopPropagation(); const f = current.acts[/** @type {HTMLElement} */ (b).dataset.run || '']; if (f) f(/** @type {HTMLElement} */ (b), ev.detail === 0); return; }
    ev.stopPropagation();
  });
  el.addEventListener('keydown', (ev) => {
    if (ev.key === 'Enter' && current && current.acts) {
      const b = /** @type {HTMLElement} */ (ev.target).closest('[data-run]');
      if (b) { ev.preventDefault(); ev.stopPropagation(); const f = current.acts[/** @type {HTMLElement} */ (b).dataset.run || '']; if (f) f(/** @type {HTMLElement} */ (b), true); }
    }
  });
}

/** the current overlay, read-only */
export const currentOverlay = () => current;
/** alias the keys module reads */
export const currentKind = () => (current ? current.kind : null);
export function currentIs(/** @type {string} */ id) { return !!current && current.id === id; }
export const hasCurrent = () => current !== null;
/** @returns {Overlay | null} */
export function currentState() { return current; }
export { currentState as current };

/**
 * Show an overlay — a replacement is not a dismissal of what stands behind
 * it (the reveal, the selection).
 * @param {Overlay} o
 */
export function show(o) {
  if (!el) return;
  const from = document.activeElement; // where the act found the focus — read first, for the markup written below removes a control of this host that held it
  if (current && current !== o && current.id !== o.id) { /* a replacement: the previous overlay's end runs, told so */ const prev = current; current = null; if (prev.onDismiss) prev.onDismiss(true); }
  current = o;
  el.className = 'on ' + o.kind;
  el.setAttribute('data-id', o.id || o.kind);
  el.innerHTML = `<span class="x" data-x="1" title="dismiss (Esc)" role="button" tabindex="0">×</span>` + o.html;
  place();
  if (o.takeFocus) {
    returnTo = from;
    const first = /** @type {HTMLElement | null} */ (el.querySelector('[data-run], button, input, [tabindex="0"]'));
    if (first) first.focus({ preventScroll: true });
  }
  markDirty();
}

/** place the overlay at its anchor — per frame, clamped into the viewport */
export function place() {
  if (!el || !current) return;
  const { VW, VH } = viewport();
  const a = current.anchor;
  let x = 20, y = 60;
  if (a) {
    if (a.span) {
      const rs = LAYER.spanRects(a.span.addr, a.span.pos, a.span.width ?? null);
      if (rs) { x = rs[0].x; y = rs[0].y + rs[0].h + 4; }
      else { const b = docBox(a.span.addr); x = sx(b.x + b.w); y = sy(b.y); }
    } else if (a.world) { x = sx(a.world.x); y = sy(a.world.y); }
    else if (a.el && a.el.isConnected) { const r = a.el.getBoundingClientRect(); x = r.left; y = r.bottom + 4; }
    else if (a.screen) { x = a.screen.x; y = a.screen.y; }
  }
  const r = el.getBoundingClientRect();
  x = Math.max(6, Math.min(VW - r.width - 6, x)); y = Math.max(34, Math.min(VH - r.height - 6, y));
  el.style.left = x + 'px'; el.style.top = y + 'px';
}

/** dismiss the current overlay; its end runs; the focus returns, where an overlay of the chain took it */
export function dismiss() {
  if (!el || !current) return;
  const o = current;
  current = null;
  el.className = ''; el.innerHTML = ''; el.removeAttribute('data-id');
  if (o.onDismiss) o.onDismiss(false);
  const to = returnTo;
  returnTo = null;
  WALK.returnFocus(to);
  markDirty();
}

/** the overlay's text (the gate's text case) */
export const text = () => (el && current ? el.textContent || '' : '');
/** the overlay's element */
export const element = () => el;
