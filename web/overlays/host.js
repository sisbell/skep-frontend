// O-HOST — one act-overlay at a time (the structure record §3.2 "O-HOST";
// foundations §3.1: every control is chrome an ACT conjures and its end
// dismisses — an HTML layer positioned over the plane at the act's site,
// following its place as the camera moves, gone with Esc, the next act or
// its own completion; never a fixed region). Layer 2. ENGINE-BOUND.
// State: VIEW — the current overlay, and the opening still reading with the
// count of the acts made on the chrome (the one owner). THE OPENING: chrome
// that opens on its reads — the reading scene, the versions list, the
// provenance cards, the anatomy card — opens through `opening`, one rule for
// all of them: as its reads begin it is the chrome's next act, and its answer
// shows only where no act was made on the chrome while it read — an overlay
// shown (`show`, whatever conjures it: an act's card or its rebuild by its own
// act, a face, a walk's moment), a dismissal (`dismiss`), the next opening, or
// the end of the opening alone, what stands staying (`endOpening`: Esc's
// innermost thing, N-KEYS'; an empty click's, APP-INPUT's; the LEAP box
// opened, N-LEAP's; a navigation act as it is made, N-GO's, before its
// landing dismisses what stands) — so chrome asked for at a place the person
// has left never opens over the next one, nor over chrome made after it was
// asked, and Esc closes what the person sees, never an opening they cannot.
// Until it shows or ends it is `pending`; its reads may ask whether it
// `stands`, so one that has ended asks no more. An opening begins in the act
// that asks for it, nothing awaited first: the page imports every module it
// acts through as it loads, the app alone loading its gate's by `import()`
// (S-22 (a)), for an act made while a module loaded would end no opening, and
// the chrome would open over the place that act reached. THE FOCUS is N-FOCUS's
// (FP-20; D5 §4 rule 4): an overlay takes the focus only where a KEY made
// the act that opened it — `takeFocus` is that act's `byKey` and nothing
// else decides it — and takes it on its FIRST ACT, never the dismiss (rule
// 13): a card's first act, a list's current row where one is current (the
// versions list's member; `first` names it), else its first row, a moment's
// first control. The dismiss is a native button placed after the content,
// reached by Tab and pressed by Enter or Space (rule 14), its title drawn
// for the platform (rule 19). An overlay REBUILT by its own act (`show` with
// the same id — a lens, the switch, show more) keeps the focus on the control
// bearing the same `data-run` (rule 11); one REPLACING another whose control
// held the focus takes it on its first act, and a FACE replacing it never
// takes it — the focus returns to the replaced overlay's opener with the face
// standing (rule 11). The opener is the controller's one memory: the element
// the focus stood on as the first overlay of a chain opened, read before the
// markup written here removes a control of this host that held it; the
// dismissal hands the focus back through the controller — to that element,
// or to the walk's element where it no longer takes the focus (rule 16).
// THE DIALOG'S NAME (D5): each overlay's own caption — its `.label`, a face's
// own words — by `aria-labelledby`; a string per kind from ST where no
// caption stands. A face a key or the system raised is heard through the one
// status region without the focus moving (D4; K-58) — save one whose words
// the landing that met it says where the focus lands (`told`: the dead end's
// face at its landing, N-WALK's description; issue #153), which is heard
// there once.
// Each act is told whether a key ran it by the controller's one reading:
// Enter on its control, taken here before the platform's click, or the click
// the platform makes from a key (Space on a button), which carries no click
// count — a pointer's carries its count.
// A pan or a zoom is never "the next act": the overlay follows its anchor —
// the element the act was made at while it stands in the page, or while an
// element bearing its id does (the same control, redrawn from state by its
// owner, FP-13); else the place named beside it, a span's bytes or a world
// point, which still stands once T-LAYER has rebuilt or taken down the
// article the element stood in, or rewritten its corner. An overlay stands
// at the viewport's corner only where its anchor names nothing that stands
// (`place`).
// Carries: the wireframe's §18 `overlay` object, `anchorOfSpan`.
// Rules: FP-1, FP-2, FP-9, FP-10 (its own DOM alone), FP-13, FP-20.

import { sx, sy, viewport, markDirty } from '../plane/camera.js';
import * as LAYER from '../text/layer.js';
import * as FOCUS from '../nav/focus.js';
import { drawChord } from '../nav/keys.js';
import { docBox } from '../plane/projection.js';
import { t } from '../strings.js';
import { esc } from '../util.js';

/**
 * @typedef {Object} Anchor — where an overlay stands: at its element while that stands (`standing`), else at its span, else at its world point, else at its screen point (`place`)
 * @property {HTMLElement} [el] the element the act was made at: the overlay stands beneath it while it is in the page, or while an element bearing its id is
 * @property {{addr: string, pos: number, width?: number}} [span] a span of a document — a block by its first position, or the bytes named by a width: beneath its first line in the mounted article, else at the document's box
 * @property {{x: number, y: number}} [world] a world point (follows the camera)
 * @property {{x: number, y: number}} [screen] a screen point
 */

/** @typedef {(el: HTMLElement, byKey: boolean) => void} Act an overlay's act, run on the element that bears its `data-run`; `byKey` a key ran it */

/**
 * @typedef {Object} Overlay
 * @property {'card' | 'face' | 'list' | 'moment'} kind
 * @property {Anchor | null} anchor
 * @property {string} html
 * @property {Record<string, Act>} [acts] handlers by `data-run` name
 * @property {(replaced: boolean) => void} [onDismiss] its end: `replaced` where the next act's overlay took its place, so what stands behind it (the selection) stands on; false where it was dismissed
 * @property {boolean} [takeFocus] a key made the act that opened it (the act's `byKey`): the focus goes to its first act
 * @property {string} [first] a selector for the control the focus goes to first where it is not the first in order — a list's current row
 * @property {boolean} [told] a face whose words the landing that met it says where the focus lands (N-WALK's description; issue #153): the status region does not repeat them
 * @property {string} [id] a name the gate reads
 */

/** @type {HTMLElement | null} */
let el = null;
/** @type {Overlay | null} */
let current = null;
/** the acts made on the chrome, each counted as it is made: an overlay shown, an opening begun, a dismissal, an opening ended alone */
let made = 0;
/** the act of the opening whose reads are out, nothing yet shown for it; 0 where none reads */
let reading = 0;

/** the key a control of the overlay bears: its `data-run`, or `x` for the dismiss */
const keyOf = (/** @type {Element} */ e) => /** @type {HTMLElement} */ (e).dataset.run || (/** @type {HTMLElement} */ (e).dataset.x ? 'x' : null);
/** the controls the focus may go to first: the acts, the native controls, never the dismiss */
const FIRST = '[data-run], button:not([data-x]), input, [tabindex="0"]';

/** @param {HTMLElement} e */
export function attach(e) {
  el = e;
  el.addEventListener('click', (ev) => {
    const target = /** @type {HTMLElement} */ (ev.target);
    if (target.closest('[data-x]')) { dismiss(); ev.stopPropagation(); return; }
    const b = target.closest('[data-run]');
    if (b && current && current.acts) { ev.stopPropagation(); const f = current.acts[/** @type {HTMLElement} */ (b).dataset.run || '']; if (f) f(/** @type {HTMLElement} */ (b), FOCUS.byKey(ev)); return; }
    ev.stopPropagation();
  });
  el.addEventListener('keydown', (ev) => {
    if (ev.key === 'Enter' && current && current.acts) {
      const b = /** @type {HTMLElement} */ (ev.target).closest('[data-run]');
      if (b) { ev.preventDefault(); ev.stopPropagation(); const f = current.acts[/** @type {HTMLElement} */ (b).dataset.run || '']; if (f) f(/** @type {HTMLElement} */ (b), FOCUS.byKey(ev)); }
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

/** the dismiss: a native button after the content, its chord drawn for the platform (rules 13, 14, 19) */
const dismissButton = () => `<button class="x" data-x="1" title="${esc(t('L.dismiss', { chord: drawChord('Esc') }))}">×</button>`;

/**
 * The dialog's name (D5): its own caption where one stands — the `.label`,
 * a face's words — else ST's string for its kind.
 * @param {HTMLElement} host
 * @param {Overlay} o
 */
function name(host, o) {
  const caption = /** @type {HTMLElement | null} */ (host.querySelector('.label')) || (o.kind === 'face' ? /** @type {HTMLElement | null} */ (host.querySelector('.face-text')) : null);
  if (caption) { caption.id = 'overlay-name'; host.setAttribute('aria-labelledby', 'overlay-name'); host.removeAttribute('aria-label'); }
  else { host.removeAttribute('aria-labelledby'); host.setAttribute('aria-label', t('L.dialog.' + o.kind)); }
}

/** the control an overlay's focus goes to first: the one it names, else its first act in order — never the dismiss */
export function firstControl(/** @type {HTMLElement} */ host, /** @type {string | undefined} */ first) {
  return /** @type {HTMLElement | null} */ ((first && host.querySelector(first)) || host.querySelector(FIRST));
}

/** a face's words, for the status region: its text, its arm, its clause, its note */
const faceWords = (/** @type {HTMLElement} */ host) => [...host.querySelectorAll('.face-text, .arm, .clause, .note')].map((e) => e.textContent || '').join(' ');

/**
 * Show an overlay — the chrome's next act, so an opening still reading ends
 * and its answer never covers this overlay (an opening's own answer reaches
 * here only where it stands); a replacement is not a dismissal of what stands
 * behind it (the reveal, the selection); the same id is a rebuild.
 * @param {Overlay} o
 */
export function show(o) {
  made++; reading = 0;
  if (!el) return;
  const host = el;
  const from = document.activeElement; // where the act found the focus — read first, for the markup written below removes a control of this host that held it
  const held = !!from && from !== document.body && host.contains(from);
  const rebuild = !!current && current.id === o.id;
  const replacing = !!current && !rebuild;
  if (replacing) { /* the previous overlay's end runs, told so */ const prev = /** @type {Overlay} */ (current); current = null; if (prev.onDismiss) prev.onDismiss(true); }
  current = o;
  const write = () => {
    host.className = 'on ' + o.kind;
    host.setAttribute('data-id', o.id || o.kind);
    host.innerHTML = o.html + dismissButton();
    name(host, o);
  };
  if (rebuild) {
    const kept = FOCUS.keep(host, keyOf, write);
    if (!kept && o.takeFocus) FOCUS.open('overlay', { el: host, from, byKey: true, first: firstControl(host, o.first) });
  } else {
    write();
    if (replacing && held && o.kind === 'face') { FOCUS.close('overlay'); FOCUS.open('overlay', { el: host, byKey: false }); }
    else FOCUS.open('overlay', { el: host, from, byKey: !!o.takeFocus || (replacing && held), first: firstControl(host, o.first) });
  }
  place();
  if (o.kind === 'face' && !o.takeFocus && !o.told) FOCUS.say(faceWords(host));
  markDirty();
}

/**
 * The element an anchor names, as the page stands now: the element itself
 * while it is in the page; else the one bearing its id — the same control,
 * redrawn from state by its owner (FP-13); else none, the article or the
 * corner it stood in rebuilt or taken down.
 * @param {HTMLElement | undefined} e
 * @returns {HTMLElement | null}
 */
function standing(e) {
  if (!e) return null;
  if (e.isConnected) return e;
  return e.id ? document.getElementById(e.id) : null;
}

/**
 * Place the overlay at its anchor — per frame, clamped into the viewport:
 * beneath the element it was conjured at while that stands (`standing`);
 * else beneath its span's first line in the mounted article, or at the
 * document's box where none is mounted; else at its world point, else at its
 * screen point; else, its anchor naming nothing that stands, at the
 * viewport's corner.
 */
export function place() {
  if (!el || !current) return;
  const { VW, VH } = viewport();
  const a = current.anchor;
  let x = 20, y = 60;
  const at = a ? standing(a.el) : null;
  if (at) { const r = at.getBoundingClientRect(); x = r.left; y = r.bottom + 4; }
  else if (a && a.span) {
    const rs = LAYER.spanRects(a.span.addr, a.span.pos, a.span.width ?? null);
    if (rs) { x = rs[0].x; y = rs[0].y + rs[0].h + 4; }
    else { const b = docBox(a.span.addr); x = sx(b.x + b.w); y = sy(b.y); }
  } else if (a && a.world) { x = sx(a.world.x); y = sy(a.world.y); }
  else if (a && a.screen) { x = a.screen.x; y = a.screen.y; }
  const r = el.getBoundingClientRect();
  x = Math.max(6, Math.min(VW - r.width - 6, x)); y = Math.max(34, Math.min(VH - r.height - 6, y));
  el.style.left = x + 'px'; el.style.top = y + 'px';
}

/** dismiss the current overlay — the chrome's next act, so an opening still reading ends with it; its end runs; the focus returns through the controller, to the chain's opener or the walk's element */
export function dismiss() {
  made++; reading = 0;
  if (!el || !current) return;
  const o = current;
  current = null;
  el.className = ''; el.innerHTML = ''; el.removeAttribute('data-id'); el.removeAttribute('aria-labelledby'); el.removeAttribute('aria-label');
  if (o.onDismiss) o.onDismiss(false);
  FOCUS.close('overlay');
  markDirty();
}

/**
 * Chrome that opens on its reads (see the head): the opening is the chrome's
 * next act, so one still reading ends; `reads` runs with `stands`, which
 * reads false once another act is made on the chrome, so reads that consult
 * it between them ask no more; its answer — null where it gives up — is
 * handed to `show` where the opening still stands, and nothing shows where
 * it does not. Pending from its first read to its show or its end.
 * @template T
 * @param {(stands: () => boolean) => Promise<T | null>} reads
 * @param {(answer: T) => void} show
 * @returns {Promise<void>} settled once the answer is shown, or nothing will be
 */
export async function opening(reads, show) {
  const act = ++made;
  reading = act;
  const stands = () => act === made;
  try {
    const answer = await reads(stands);
    if (answer != null && stands()) show(answer);
  } finally {
    if (reading === act) reading = 0;
  }
}

/** is an opening still reading — chrome asked for, nothing yet shown for it? */
export const pending = () => reading !== 0;

/** the opening still reading ends, what stands staying — Esc's and an empty click's innermost thing, the LEAP box opened, a navigation act as it is made: its answer shows nothing */
export function endOpening() {
  if (!reading) return;
  made++; reading = 0;
}

/** the overlay's text (the gate's text case) */
export const text = () => (el && current ? el.textContent || '' : '');
/** the overlay's element */
export const element = () => el;
