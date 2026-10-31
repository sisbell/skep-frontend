// O-HOST — one act-overlay at a time (the structure record §3.2; foundations
// §3.1): an HTML layer positioned over the plane at the act's site, following
// its place as the camera moves, gone with Esc, the next act or its own
// completion, never a fixed region. Layer 2. ENGINE-BOUND. State (FP-10):
// the current overlay, and the opening still reading with the count of the
// acts made on the chrome.
// The opening: chrome that opens on its reads — the reading scene, the
// versions list, the provenance cards, the anatomy card, a face stating a
// withheld origin whose clause's reads are out (O-FACES; FP-33) — opens
// through `opening`, one rule for all of them: as its reads begin it is the
// chrome's next act, and its answer shows only where no act was made on the
// chrome while it read — an overlay shown (`show`, whatever conjures it), a
// dismissal (`dismiss`), the next opening, or the end of the opening alone,
// what stands staying (`endOpening`: Esc's innermost thing, an empty click's,
// the LEAP box opened, a navigation act as it is made) — so chrome asked for
// at a place the person has left never opens over the next one, nor over
// chrome made after it was asked, and Esc closes what the person sees, never
// an opening they cannot. An overlay's own completion is no act on the chrome
// (`complete`): a jump's reading face taken down as its read answers ends no
// opening asked while it stood, whose answer then shows where the camera is
// (FP-25). Nor is an overlay drawn again in its place by the module that
// showed it, from what its reads found since (`redraw`): the dead end's face
// taking its version offer (O-FACES') ends no opening, and what it changed is
// its owner's to say. Until it shows or ends it is `pending`; its reads may
// ask whether it `stands`, so one that has ended asks no more. An opening
// begins in the act that asks for it, nothing awaited first: the page
// imports every module it acts through as it loads, the app alone loading
// its gate's by `import()` (S-22 (a)), for an act made while a module loaded
// would end no opening, and the chrome would open over the place that act
// reached.
// The focus is N-FOCUS's (FP-20; D5 §4 rule 4): an overlay takes the focus
// only where a key made the act that opened it — `takeFocus` is that act's
// `byKey` and nothing else decides it — and takes it on its first act, never
// the dismiss (rule 13): a card's first act, a list's current row where one
// is current (`first` names it), else its first row; a walk's moment, which
// takes it whatever made it stand (K-80), its first control as it arrives and
// its first words as it is unfolded (O-FACES'). The dismiss is a native
// button placed after the content, reached by Tab and pressed by Enter or
// Space (rule 14), its title drawn for the platform (rule 19). An overlay
// rebuilt — by its own act (`show` with the same id), or by its owner
// (`redraw`) — keeps the focus on the control bearing the same `data-run`
// (rule 11); one replacing another whose control held the focus takes it on
// its first act, and a face replacing it never takes it — the focus returns
// to the replaced overlay's opener with the face standing (rule 11). The
// opener is the controller's one memory: the element the focus stood on as
// the first overlay of a chain opened, read before the markup written here
// removes a control of this host that held it; the dismissal hands the focus
// back through the controller — to that element, or to the walk's element
// where it no longer takes the focus (rule 16). An overlay's end
// (`onDismiss`) runs while the element still holds what it wrote — a
// dismissal's before the element is emptied, a replacement's before the next
// is written — so an end that reads it reads it there: a walk's moment folds
// with the text typed in its field (O-FACES'). A field holding the caret
// (FP-20): while the overlay's own field holds the platform's focus — a
// moment's answer being typed (`typing`) — no face takes its place: a face
// shown then is said through the status region, a told one too, for no focus
// moves to tell it, and the overlay stands with its text and its caret, as
// N-GO's departure leaves it standing.
// The dialog's name (D5): each overlay's own caption — its `.label`, a face's
// own words — by `aria-labelledby`; a string per kind from ST where no
// caption stands. A face that answers an act, captioned by the act's own
// words (O-FACES' `caption`), is named by that caption and described by its
// words (`aria-describedby`), so it is met as the act's answer. A face a key
// or the system raised is heard through the one status region without the
// focus moving (D4; K-58), its caption before its words — save one whose
// words the landing that met it says where the focus lands (`told`; N-WALK's
// description), which is heard there once.
// Each act is told whether a key ran it by the controller's one reading:
// Enter on its control, taken here before the platform's click, or the click
// the platform makes from a key (Space on a button), which carries no click
// count — a pointer's carries its count.
// A pan or a zoom is never the next act: the overlay follows its anchor —
// the element the act was made at while it stands in the page, or while an
// element bearing its id does (the same control, redrawn from state by its
// owner, FP-13); else the place named beside it, a span's bytes or a world
// point, which still stands once T-LAYER has rebuilt or taken down the
// article the element stood in, or rewritten its corner. An overlay stands
// at the viewport's corner only where its anchor names nothing that stands
// (`place`). A jump's face — its reading, its reaching, the failure it met —
// shows where the camera is (FP-25): its anchor names the document it stands
// at (`sign`), and while that document's region is out of the visible view
// (T-LAYER's `inView`) the face is hidden on the plane and the one line
// carries its words in its place (`aside`, read through the reader the app
// hands L-LINE); it is said through the status region as it is shown,
// wherever it stands.
// A change of the page's class (FP-23, FP-29): what the host wrote was made
// from what the class the page left could read, so the change takes it down
// at once (`classChanged`) — the opening still reading ended, its answer
// showing nothing, and the standing overlay dismissed, the focus returning
// through the controller — save a jump's reading or reaching face, whose
// read the new class answers, and a moment's face, which is the shell's.
// Rules: FP-1, FP-2, FP-9, FP-10, FP-13, FP-20, FP-25, FP-29, FP-36.

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
 * @property {string} [sign] the document a jump's face stands at (FP-25): hidden on the plane while that document is out of the visible view, the one line carrying its words (`aside`)
 */

/** @typedef {(el: HTMLElement, byKey: boolean) => void} Act an overlay's act, run on the element that bears its `data-run`; `byKey` a key ran it */

/**
 * @typedef {Object} Overlay
 * @property {'card' | 'face' | 'list' | 'moment'} kind
 * @property {Anchor | null} anchor
 * @property {string} html
 * @property {Record<string, Act>} [acts] handlers by `data-run` name
 * @property {(replaced: boolean) => void} [onDismiss] its end, run while the element still holds what it wrote: `replaced` where the next act's overlay took its place, so what stands behind it (the selection) stands on; false where it was dismissed
 * @property {boolean} [takeFocus] a key made the act that opened it (the act's `byKey`): the focus goes to its first act
 * @property {string} [first] a selector for the control the focus goes to first where it is not the first in order — a list's current row
 * @property {boolean} [told] a face whose words the landing that met it says where the focus lands (N-WALK's description): the status region does not repeat them
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
 * a face's words — else ST's string for its kind; a face named by the
 * caption of the act it answers is described by its words, each part of
 * them in their order (see the head).
 * @param {HTMLElement} host
 * @param {Overlay} o
 */
function name(host, o) {
  const label = /** @type {HTMLElement | null} */ (host.querySelector('.label'));
  const caption = label || (o.kind === 'face' ? /** @type {HTMLElement | null} */ (host.querySelector('.face-text')) : null);
  if (caption) { caption.id = 'overlay-name'; host.setAttribute('aria-labelledby', 'overlay-name'); host.removeAttribute('aria-label'); }
  else { host.removeAttribute('aria-labelledby'); host.setAttribute('aria-label', t('L.dialog.' + o.kind)); }
  const said = label && o.kind === 'face' ? /** @type {HTMLElement[]} */ ([...host.querySelectorAll(SAID)]).filter((e) => e !== label) : [];
  said.forEach((e, i) => { e.id = 'overlay-said-' + i; });
  if (said.length) host.setAttribute('aria-describedby', said.map((e) => e.id).join(' '));
  else host.removeAttribute('aria-describedby');
}

/** the control an overlay's focus goes to first: the one it names, else its first act in order — never the dismiss */
export function firstControl(/** @type {HTMLElement} */ host, /** @type {string | undefined} */ first) {
  return /** @type {HTMLElement | null} */ ((first && host.querySelector(first)) || host.querySelector(FIRST));
}

/** the parts of a face's words, in their order: the caption of the act it answers, the address it names, its text, its arm, its clause, its note */
const SAID = '.label, .face-addr, .face-text, .arm, .clause, .note';
/** a face's words, for the status region: its parts' (`SAID`), the caption of the act it answers first */
const faceWords = (/** @type {ParentNode} */ host) => [...host.querySelectorAll(SAID)].map((e) => e.textContent || '').join(' ');

/** a face's words read from its markup, written into nothing the page shows: what the status region says of a face held back (see the head) */
function wordsOf(/** @type {string} */ html) {
  if (typeof document.createElement !== 'function') return '';
  const scratch = document.createElement('template');
  scratch.innerHTML = html;
  return faceWords(scratch.content);
}

/** an overlay written into the host's element: its kind, the name the gate reads, its markup with the dismiss after it, and the dialog's name */
function writeInto(/** @type {HTMLElement} */ host, /** @type {Overlay} */ o) {
  host.className = 'on ' + o.kind;
  host.setAttribute('data-id', o.id || o.kind);
  host.innerHTML = o.html + dismissButton();
  name(host, o);
}

/**
 * Does the standing overlay hold the caret (see the head; FP-20): the
 * platform's focus in a field of its own — an answer the reader is typing
 * (N-FOCUS's `isField`)?
 */
export function typing() {
  const a = document.activeElement;
  return !!el && !!current && !!a && el.contains(a) && FOCUS.isField(a);
}

/**
 * Show an overlay — the chrome's next act, so an opening still reading ends
 * and its answer never covers this overlay (an opening's own answer reaches
 * here only where it stands); a replacement is not a dismissal of what stands
 * behind it (the reveal, the selection); the same id is a rebuild. A face
 * shown while the standing overlay holds the caret takes nothing's place: its
 * words are said through the status region, and the overlay stands with its
 * text and its caret (see the head).
 * @param {Overlay} o
 */
export function show(o) {
  made++; reading = 0;
  if (!el) return;
  if (o.kind === 'face' && typing()) { const words = wordsOf(o.html); if (words) FOCUS.say(words); return; }
  const host = el;
  const from = document.activeElement; // where the act found the focus — read first, for the markup written below removes a control of this host that held it
  const held = !!from && from !== document.body && host.contains(from);
  const rebuild = !!current && current.id === o.id;
  const replacing = !!current && !rebuild;
  if (replacing) { /* the previous overlay's end runs, told so */ const prev = /** @type {Overlay} */ (current); current = null; if (prev.onDismiss) prev.onDismiss(true); }
  current = o;
  const write = () => writeInto(host, o);
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
 * The standing overlay drawn again in its place by the module that showed
 * it, from what its reads found since (see the head): no act on the chrome,
 * so an opening still reading shows its answer; a rebuild, the focus kept on
 * the control bearing the same key; nothing said, its owner saying what it
 * changed. Nothing where another overlay stands, or none — one the reader
 * dismissed, or an act took the place of, stays gone.
 * @param {Overlay} o the overlay, under the id it stands as
 * @returns {boolean} it stood, and stands drawn again
 */
export function redraw(o) {
  if (!el || !current || current.id !== o.id) return false;
  const host = el;
  current = o;
  FOCUS.keep(host, keyOf, () => writeInto(host, o));
  place();
  markDirty();
  return true;
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

/** is the overlay a jump's face whose document stands out of the visible view (see the head)? */
const away = (/** @type {Overlay | null} */ o) => !!o && !!o.anchor && !!o.anchor.sign && !LAYER.inView(o.anchor.sign);

/**
 * Place the overlay at its anchor — per frame, clamped into the viewport:
 * beneath the element it was conjured at while that stands (`standing`);
 * else beneath its span's first line in the mounted article, or at the
 * document's box where none is mounted; else at its world point, else at its
 * screen point; else, its anchor naming nothing that stands, at the
 * viewport's corner. A jump's face whose document stands out of the visible
 * view is hidden there, the one line carrying its words (`aside`).
 */
export function place() {
  if (!el || !current) return;
  const { VW, VH } = viewport();
  const a = current.anchor;
  el.style.visibility = away(current) ? 'hidden' : '';
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
  takeDown();
}

/**
 * The overlay standing ends by its own completion — a jump's reading face,
 * its read answered (O-FACES' `endReading`): taken down as a dismissal takes
 * it, but no act on the chrome, so an opening asked while it stood still
 * shows its answer (see the head). Nothing where another overlay stands.
 * @param {string} id the overlay that completed
 */
export function complete(id) {
  if (current && current.id === id) takeDown();
}

/** the current overlay taken down: its end run while its element still holds what it wrote — a walk's moment folds with the text typed in its field (O-FACES') — then its element emptied and the focus returned through the controller */
function takeDown() {
  if (!el || !current) return;
  const o = current;
  current = null;
  if (o.onDismiss) o.onDismiss(false);
  el.className = ''; el.innerHTML = ''; el.style.visibility = ''; el.removeAttribute('data-id'); el.removeAttribute('aria-labelledby'); el.removeAttribute('aria-label'); el.removeAttribute('aria-describedby');
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

/** does an overlay stand through a change of the page's class (see the head): a jump's reading or reaching face, or a moment's */
const outlasts = (/** @type {Overlay} */ o) => o.kind === 'moment' || /^(reading|reaching):/.test(o.id || '');

/**
 * A change of the page's class (see the head), told by the app as M-PUMP
 * tells it: the opening still reading ended, and the
 * standing overlay dismissed — its end run, the focus returned through the
 * controller — save one that stands through it (`outlasts`).
 */
export function classChanged() {
  endOpening();
  if (current && !outlasts(current)) dismiss();
}

/** the opening still reading ends, what stands staying — Esc's and an empty click's innermost thing, the LEAP box opened, a navigation act as it is made: its answer shows nothing */
export function endOpening() {
  if (!reading) return;
  made++; reading = 0;
}

/**
 * A jump's face standing out of the visible view (see the head; FP-25): the
 * id of the string its words are, and its words as the status region said
 * them, which the one line carries in its place; null where none stands so.
 * @returns {{id: string, text: string} | null}
 */
export function aside() {
  if (!el || !away(current)) return null;
  const words = /** @type {HTMLElement | null} */ (el.querySelector('.face-text'));
  return { id: words ? words.dataset.string || '' : '', text: faceWords(el) };
}

/** the overlay's text (the gate's text case) */
export const text = () => (el && current ? el.textContent || '' : '');
/** the overlay's element */
export const element = () => el;
