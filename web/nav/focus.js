// N-FOCUS — the one owner of the platform's focus (FP-20; D5 §4; the focus
// record's rules 10–22). Layer 2: it imports nothing of the page but ST's
// table (`heard`), and keeps no DOM of its own, moving the focus of elements
// their owners hand it.
// State (FP-10): the last input's kind, the opener stack — which region took
// the focus, from which element, and the region each waits on to take it
// next — and the words the status region waits to say on the next frame
// (`saying`).
// The page has one focus, the platform's (`document.activeElement`; rule 10),
// and no `.focus()` call stands outside this module: five entries, which
// every module calls and none bypasses —
//   land(el)               an act moved the focus to an element (rule 12),
//                          wherever the key was pressed. A field the reader
//                          types in keeps the focus and its caret through it,
//                          and the regions holding the field forget their
//                          openers.
//   open(region, {…})      a region took the focus from an element,
//                          remembered once on one stack: a second opening of
//                          a standing region keeps the first opener (rules
//                          11, 13, 16). `byKey` decides whether the region's
//                          `first` control takes the focus — save where a
//                          field the reader types in outside the region holds
//                          the caret: the region then stands without it, said
//                          by its own name, and each region holding the field
//                          waits on it (FP-20, FP-36). An opening no key made
//                          is waited on by none.
//   close(region, {…})     the region ends: a focus standing on nothing, or
//                          still inside the region, goes to the first control
//                          of the region it waits on, as that control stands
//                          then, else returns to the opener where that takes
//                          it, else to the walk's element, else to the first
//                          control of the innermost region still standing — a
//                          scene the walk stands under — never lost, never to
//                          the top (rule 4); one the person moved elsewhere
//                          stays where they put it. `toWalk` passes over the
//                          opener: the act that closes it left the reader at
//                          the walk's element (an in-document find's Esc on
//                          its match, N-FIND).
//   keep(region, keyOf, rebuild)  a control redrawn from state while it holds
//                          the focus (FP-13): the focus returns, after the
//                          redraw, to the element bearing the same key, else
//                          to the region's first control, never the body
//                          (rule 11).
//   cover(el, on)          a region chrome stands over is `inert`: out of the
//                          order and of the accessibility tree (rules 17, 22).
// — and one reading of "a key made it", `byKey(event)`: a keyboard event, or
// a click the platform made from a key (`detail` 0); and one of "a field the
// reader types in", `isField(el)`: an input or a textarea. The ring
// (`ringShown`; D5 §4 rule 2): drawn while the plane's stop holds the focus
// and the walk stands where an act of the person's put it — N-WALK's
// reading, registered as `aimed`, which neither a key's reading nor a
// click's count decides — and out whenever the focus leaves the plane; a
// focus the platform moves into the plane after a key (Tab, Shift+Tab) is the
// person's act, told to N-WALK (`entered`), and one it moves there after a
// pointer tells nothing. The status region (D4): one standing `role="status"`
// region this module alone writes (`say`), every word rendered for the ear by
// S22's table, the person's own words, a document's name and an address kept
// as they stand, polite unless the caller asks assertive, and words it holds
// already said again on the next frame where the caller asks; a region's own
// name, rendered for the ear where it was set, said as it stands; a key-made
// landing is told by the focus move alone (rule 12), never repeated here.
// N-WALK registers the plane's stop, the walk's
// element and the walk's two readings of the ring, the app the status region
// (`attach`).
// Rules: FP-1, FP-2, FP-7, FP-9, FP-10, FP-20, FP-36.

import { heard, asHeard } from '../strings.js';

/**
 * @typedef {Object} Entry — a region holding the focus, and where it took it from
 * @property {string} region `overlay`, `box`, `find`, `scene`
 * @property {Element} el the region's element: a focus inside it is the region's
 * @property {Element | null} opener the element the focus stood on as the region opened; null where it stood on nothing, or where a move passed over a field the region holds (`land`)
 * @property {Element | null} first the control its opening named first: where the focus goes as a region waiting on it closes (`waiting`), and where a region closing over it returns the focus when neither that region's opener nor the walk's element takes it (`close`)
 * @property {Entry | null} waiting the region a key opened while a field this region holds kept the caret (`open`), standing: this region's close gives it the focus first; null where none was, or it has closed
 */

/** @type {Element | null} the plane's stop's region: the ARIA mirror (N-WALK's), registered as it attaches */
let planeEl = null;
/** @type {() => (Element | null)} the walk's element now — the mirror's current item, or the tree where it holds none */
let home = () => null;
/** @type {Element | null} the status region */
let liveEl = null;
/** @type {() => boolean} does the walk stand where an act of the person's put it (N-WALK's): what the ring is drawn by; false until the walk registers it */
let aimed = () => false;
/** @type {() => void} the person's own act put the focus on the plane's stop — a Tab — told to the walk (N-WALK's) */
let entered = () => {};
/** @type {'key' | 'pointer'} the last input the page saw: what a focus the platform moved on its own (a Tab, a click) was moved by */
let modality = 'key';
/** this module is moving the focus now: the plane's focus events read nothing from it */
let moving = false;
/** @type {Entry[]} the opener stack */
const stack = [];
/** @type {Array<() => void>} */
const watchers = [];
let wired = false;

/** the platform's focus, or null outside a page */
const active = () => (typeof document === 'undefined' ? null : document.activeElement);
/** does the focus stand on nothing — the body, or no element? */
const onNothing = (/** @type {Element | null} */ e) => !e || (typeof document !== 'undefined' && e === document.body);

/**
 * One reading of a field the reader types in (FP-20): an input or a
 * textarea — the address box, a moment's answer — whose caret no move the
 * page makes takes (`land`, `open`).
 * @param {Element | null} e
 */
export const isField = (e) => !!e && typeof e.matches === 'function' && e.matches('input, textarea');

/**
 * The owners register what the controller needs, each as it attaches: the
 * walk its mirror (the plane's stop), its element and its two readings of the
 * ring — whether it stands where an act put it (`aimed`), and the act that
 * puts the focus on the plane's stop told to it (`entered`) — the app the
 * status region. The window's own inputs are read once, for the kind of input
 * a focus the platform moved on its own was moved by.
 * @param {{plane?: Element, home?: () => (Element | null), live?: Element, aimed?: () => boolean, entered?: () => void}} parts
 */
export function attach(parts) {
  if (parts.plane) {
    planeEl = parts.plane;
    if (typeof parts.plane.addEventListener === 'function') {
      // a focus the platform moved into the plane on its own after a key — a Tab — is the person's act on the walk's element
      parts.plane.addEventListener('focusin', () => { if (!moving && modality === 'key') entered(); changed(); });
      parts.plane.addEventListener('focusout', () => { changed(); setTimeout(changed, 0); });
    }
  }
  if (parts.home) home = parts.home;
  if (parts.live) liveEl = parts.live;
  if (parts.aimed) aimed = parts.aimed;
  if (parts.entered) entered = parts.entered;
  if (!wired && typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
    wired = true;
    window.addEventListener('keydown', () => { modality = 'key'; }, true);
    window.addEventListener('pointerdown', () => { modality = 'pointer'; }, true);
  }
}

/** what the controller tells its watchers of: the ring's rule may have changed (the walk redraws the plane) */
export function onChange(/** @type {() => void} */ fn) { watchers.push(fn); }
function changed() { for (const w of watchers) w(); }

/** does the plane's stop hold the focus? */
export function planeHolds() { const a = active(); return !!planeEl && !!a && planeEl.contains(a); }
/** is the ring drawn: the plane holds the focus and the walk stands where an act of the person's put it (rule 10; D5 §4 rule 2; `aimed`) — before a plane is registered, the walk's reading alone */
export const ringShown = () => (planeEl ? planeHolds() : true) && aimed();
/** the regions holding the focus, oldest first (the gate and the tests read it) */
export const standing = () => stack.map((e) => e.region);

/** move the platform's focus to an element; true where it landed there (an element that cannot be focused, or one the platform refuses — inert, hidden, disabled — takes none) */
function focusEl(/** @type {Element} */ el) {
  const h = /** @type {HTMLElement} */ (el);
  if (typeof h.focus !== 'function') return false;
  moving = true;
  try { h.focus({ preventScroll: true }); } finally { moving = false; }
  return active() === el;
}

/**
 * One reading of "a key made it": a keyboard event, or the click the platform
 * makes from a key — Enter or Space on a button — which carries no click
 * count; a pointer's click carries its count.
 * @param {{type: string, detail?: number}} e
 */
export function byKey(e) {
  if (e.type === 'keydown' || e.type === 'keyup' || e.type === 'keypress') return true;
  if (e.type === 'click') return e.detail === 0;
  return false;
}

/**
 * An act moved the focus to an element (rule 12): the focus goes there
 * wherever the key was pressed. A focus standing in a field the reader types
 * in stays there, its caret and its text with it (see the head): the move
 * takes nothing from it, and every region holding the field forgets its
 * opener, so the field's close gives the focus to the region it waits on,
 * else to the walk's element — where the move put the walk (`close`).
 * @param {Element | null} el
 * @returns {boolean} the focus stands on the element
 */
export function land(el) {
  const at = active();
  if (el && at && at !== el && isField(at)) {
    for (const s of stack) if (s.el.contains(at)) s.opener = null;
    changed();
    return false;
  }
  const on = el ? focusEl(el) : false;
  changed();
  return on;
}

/**
 * A region took the focus (rules 13, 16): its opener remembered once — a
 * region already standing keeps the first opener, so a replacement, a
 * rebuild or a scene over a scene returns where the first opening came from —
 * and its first control focused where a key made the act, never otherwise.
 * Where a field the reader types in outside the region holds the caret, a
 * key's opening takes none of it (FP-20): the region stands without the
 * focus, said through the status region by its own name as it stands (FP-36), and every
 * region holding the field waits on it where it names a first control, so
 * the field's close gives the focus there (`close`). An opening no key made —
 * a face taking the region's place — is waited on by none.
 * @param {string} region
 * @param {{el: Element, from?: Element | null, byKey?: boolean, first?: Element | null}} o `from` the element the act found the focus on, read by the caller before its markup replaced it (the focus now, where left out); `first` the control the focus goes to by a key, kept for a region closing over this one (`close`)
 */
export function open(region, o) {
  let e = stack.find((s) => s.region === region);
  if (!e) {
    const from = o.from === undefined ? active() : o.from;
    e = { region, el: o.el, opener: onNothing(from) ? null : from, first: o.first ?? null, waiting: null };
    stack.push(e);
  } else { e.el = o.el; if (o.first !== undefined) e.first = o.first; }
  const at = active();
  if (!o.byKey) for (const s of stack) { if (s.waiting === e) s.waiting = null; }
  else if (at && isField(at) && !o.el.contains(at)) {
    if (o.first) for (const s of stack) { if (s.el.contains(at)) s.waiting = e; }
    const name = nameOf(o.el);
    if (name) say(asHeard(name));
  } else if (o.first) focusEl(o.first);
  changed();
}

/** a region's own name, as its element carries it: its `aria-label`, else the words of the elements its `aria-labelledby` names */
function nameOf(/** @type {Element} */ el) {
  const label = el.getAttribute('aria-label');
  if (label) return label;
  const ids = el.getAttribute('aria-labelledby');
  if (!ids || typeof document === 'undefined' || typeof document.getElementById !== 'function') return '';
  return ids.split(/\s+/).map((id) => { const n = document.getElementById(id); return n ? n.textContent || '' : ''; }).join(' ').trim();
}

/**
 * A region ends (rule 4; rule 16): the focus goes to the region it waits on,
 * on its first control as it stands then — the one its opening named, else
 * its first in the order, a redraw having replaced that one (`firstOf`) —
 * else returns to the opener where that still takes it — an item a rebuild
 * replaced, a corner the walk has left, do not — else to the walk's element,
 * else, where a region still standing covers the walk (a scene, its plane
 * inert), to the first control the innermost such region's opening named;
 * never lost, never to the top. The return runs only where the focus stands
 * on nothing, or still inside the region (taken off it first); one the person
 * moved out stays where they put it. A region waiting on this one waits on
 * none from now. Where the act that closes it left the reader at the walk's
 * element (`toWalk`: a find's Esc on its match), the focus goes there in the
 * place of the opener.
 * @param {string} region
 * @param {{toWalk?: boolean}} [o]
 */
export function close(region, o = {}) {
  let i = -1;
  for (let k = stack.length - 1; k >= 0; k--) if (stack[k].region === region) { i = k; break; }
  if (i < 0) return;
  const [e] = stack.splice(i, 1);
  for (const s of stack) { if (s.waiting === e) s.waiting = null; }
  const at = active();
  const inside = !onNothing(at) && !!at && e.el.contains(at);
  if (!onNothing(at) && !inside) { changed(); return; }
  if (inside && at) /** @type {HTMLElement} */ (at).blur();
  const w = e.waiting, next = w ? (w.first && w.first.isConnected ? w.first : firstOf(w.el)) : null;
  const opener = o.toWalk ? null : e.opener;
  if (!(next && focusEl(next)) && !(opener && opener.isConnected && focusEl(opener))) {
    const h = home();
    if (!(h && focusEl(h))) for (let k = stack.length - 1; k >= 0; k--) { const f = stack[k].first; if (f && f.isConnected && focusEl(f)) break; }
  }
  changed();
}

/** the controls a region's rebuild may restore the focus to */
const CONTROLS = 'button, input, [tabindex]';
const usable = (/** @type {Element} */ e) => !(/** @type {HTMLButtonElement} */ (e)).disabled;
/** a region's controls the focus may be put on, in the order: none disabled */
const controlsIn = (/** @type {Element} */ region) => /** @type {Element[]} */ ([...region.querySelectorAll(CONTROLS)]).filter(usable);
/** a region's first control: the first of its controls in the page's order, else the region itself where it is a stop of its own */
const firstOf = (/** @type {Element} */ region, all = controlsIn(region)) => all.find((e) => e.getAttribute('tabindex') !== '-1') || (region.getAttribute('tabindex') === '0' ? region : null);

/**
 * A control redraws itself from state while it holds the focus (FP-13; rule
 * 11): the focus returns, after the redraw, to the element bearing the same
 * key, else to the region's first control, never the body. A region that
 * held no focus is redrawn and nothing moves. The ring's rule stands: a
 * rebuild is no act.
 * @param {Element} region
 * @param {(el: Element) => (string | null)} keyOf the key an element bears — an act's `data-act`, a control's `data-run`
 * @param {() => void} rebuild the redraw
 * @returns {Element | null} the element the focus was put back on
 */
export function keep(region, keyOf, rebuild) {
  const at = active();
  const held = !onNothing(at) && !!at && region.contains(at);
  const key = held && at ? keyOf(at) : null;
  rebuild();
  if (!held) return null;
  const all = controlsIn(region);
  const same = key != null ? all.find((e) => keyOf(e) === key) || null : null;
  const to = same || firstOf(region, all);
  if (to) focusEl(to);
  return to;
}

/**
 * A region chrome stands over is `inert` while it does (rules 17, 22): out of
 * the page's order and of the accessibility tree, and back as the chrome ends.
 * @param {Element} el
 * @param {boolean} on
 */
export function cover(el, on) { /** @type {HTMLElement} */ (el).inert = on; }

/** a function run on the next frame — the platform's next paint, else the next task where nothing paints (the node tests) — by its handle */
const nextFrame = (/** @type {() => void} */ f) => (typeof requestAnimationFrame === 'function' ? requestAnimationFrame(f) : Number(setTimeout(f, 0)));
/** a function `nextFrame` holds, let go unrun */
const cancelFrame = (/** @type {number} */ h) => (typeof cancelAnimationFrame === 'function' ? cancelAnimationFrame(h) : clearTimeout(h));
/** the status region's words waiting for the next frame (`say`, asked again): its handle, 0 where none waits */
let saying = 0;

/**
 * The status region (D4) written: one standing region this module alone
 * writes, the words rendered for the ear by S22's table (ST's `heard`), polite
 * unless the caller asks assertive. Words that hold the person's own words, a
 * document's name or its words are handed as stretches in their faces, which
 * the table leaves alone. Nothing is said for a camera move, and a landing is
 * told by the focus move alone. Asked `again`, words the region holds already
 * are said again: the region emptied now and written on the next frame, so
 * the platform meets a change; any write before that frame takes its place.
 * @param {import('../strings.js').Words} words
 * @param {boolean} [assertive]
 * @param {boolean} [again] the words are said again where the region holds them already (O-HINT's every press)
 */
export function say(words, assertive = false, again = false) {
  if (!liveEl) return;
  const live = liveEl, text = heard(words);
  if (saying) { cancelFrame(saying); saying = 0; }
  live.setAttribute('aria-live', assertive ? 'assertive' : 'polite');
  if (again && live.textContent === text) {
    live.textContent = '';
    saying = nextFrame(() => { saying = 0; live.textContent = text; });
    return;
  }
  live.textContent = text;
}

/** the tests' reset: the stack emptied, the last input a key's, no words waiting, the registered parts kept */
export function _reset() { stack.length = 0; modality = 'key'; if (saying) { cancelFrame(saying); saying = 0; } }
