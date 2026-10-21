// N-FOCUS — THE ONE OWNER OF THE PLATFORM'S FOCUS (D5 §4 the focus model,
// completed by the focus record's rules 10–22; FP-20 "the focus has one
// owner"). Layer 2, beside N-WALK, a leaf: it imports nothing of the page.
// ENGINE-BOUND, with no DOM of its own — it moves the focus of elements their
// owners hand it. State: VIEW — whether a key made the last move of the focus
// (the ring's rule), the last input's kind, the opener stack (which region
// took the focus, and from which element) — THE ONE OWNER (FP-10).
// THE PAGE HAS ONE FOCUS, THE PLATFORM'S (`document.activeElement`; rule 10).
// The walk's POSITION is N-WALK's and persists while another region holds the
// focus — a chord from the one line or a card still acts on the focused span —
// but the ring is drawn only while the plane holds the focus and a key moved
// it. No `.focus()` stands outside this module: five entries, which every
// module calls and none bypasses —
//   land(el, {byKey})      an act moved the focus to an element: a landing's
//                          item, a walk key's, an arrow's next control (rule
//                          12). The focus goes there wherever the key was
//                          pressed — the mirror, the line, a card, the body —
//                          and `byKey` sets the ring's rule; left out, the rule
//                          stands as it was (a hand-off is no act).
//   open(region, {…})      a region took the focus from an element — an
//                          overlay, the LEAP box, the scene — remembered ONCE,
//                          on one stack: a replacement, a rebuild or a second
//                          opening of a standing region keeps the first opener
//                          (rules 11, 13, 16). `byKey` alone decides whether
//                          the region's `first` control takes the focus.
//   close(region)          the region ends. A focus standing on nothing, or
//                          still inside the region, returns to the opener where
//                          that takes it, else to the walk's element — never
//                          lost, never to the top (rule 4); one the person moved
//                          elsewhere while the region stood stays where they put
//                          it (#33's clause).
//   keep(region, keyOf, rebuild)  a control redraws itself from state while it
//                          holds the focus (FP-13): the focus returns, after the
//                          redraw, to the element bearing the same key — an
//                          act's `data-act`, a control's `data-run` — else to
//                          the region's first control; never the body (rule 11).
//   cover(el, on)          a region chrome stands over is `inert`: out of the
//                          order and of the accessibility tree (rules 17, 22).
// — and ONE reading of "a key made it", `byKey(event)`: a keyboard event, or a
// click the platform made from a key (`detail` 0). THE RING (D5 §4 rule 2, the
// platform's focus-visible rule): drawn while the plane's stop holds the focus
// and a key moved it there — a walk key, a key-made landing or re-take, a Tab
// into the plane; put out by a pointer's landing, a camera-made re-take, and
// whenever the focus leaves the plane (`ringShown`). THE STATUS REGION (D4):
// one standing `role="status"` region this module alone writes (`say`) —
// polite for the selection, a face and the line's transients, assertive for
// the session's death and halted writes; nothing for a camera move; a
// key-made landing is told by the focus move alone (rule 12), never repeated
// here. The LEAP box's own status region is the combobox's (N-LEAP).
// Rules: FP-1, FP-2, FP-7, FP-9, FP-10, FP-20.

/**
 * @typedef {Object} Entry — a region holding the focus, and where it took it from
 * @property {string} region `overlay`, `box`, `scene`
 * @property {Element} el the region's element: a focus inside it is the region's
 * @property {Element | null} opener the element the focus stood on as the region opened; null where it stood on nothing
 */

/** @type {Element | null} the plane's stop's region: the ARIA mirror (N-WALK's), registered as it attaches */
let planeEl = null;
/** @type {() => (Element | null)} the walk's element now — the mirror's current item, or the tree where it holds none */
let home = () => null;
/** @type {Element | null} the status region */
let liveEl = null;
/** a key made the last move of the focus the page made or saw (the ring's rule) */
let ringByKey = false;
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
 * The owners register what the controller needs, each as it attaches: the
 * walk its mirror (the plane's stop) and its element, the app the status
 * region. The window's own inputs are read once, for the kind of input a
 * focus the platform moved on its own was moved by.
 * @param {{plane?: Element, home?: () => (Element | null), live?: Element}} parts
 */
export function attach(parts) {
  if (parts.plane) {
    planeEl = parts.plane;
    if (typeof parts.plane.addEventListener === 'function') {
      // a focus the platform moved into the plane on its own — a Tab, a click on the panel — was moved by the last input
      parts.plane.addEventListener('focusin', () => { if (!moving) ringByKey = modality === 'key'; changed(); });
      parts.plane.addEventListener('focusout', () => { changed(); setTimeout(changed, 0); });
    }
  }
  if (parts.home) home = parts.home;
  if (parts.live) liveEl = parts.live;
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
/** is the ring drawn: the plane holds the focus and a key moved it there (rule 10; D5 §4 rule 2) — before a plane is registered, the key alone */
export const ringShown = () => ringByKey && (planeEl ? planeHolds() : true);
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
 * wherever the key was pressed; `byKey` is the ring's rule — a key's landing
 * draws it, a pointer's puts it out; left out, the rule stands (a hand-off).
 * A null element moves nothing and sets the rule alone (a camera-made re-take
 * that carries no focus puts the ring out).
 * @param {Element | null} el
 * @param {{byKey?: boolean}} [opts]
 * @returns {boolean} the focus stands on the element
 */
export function land(el, opts = {}) {
  if (opts.byKey !== undefined) ringByKey = opts.byKey;
  const on = el ? focusEl(el) : false;
  changed();
  return on;
}

/**
 * A region took the focus (rules 13, 16): its opener remembered once — a
 * region already standing keeps the first opener, so a replacement, a
 * rebuild or a scene over a scene returns where the first opening came from —
 * and its first control focused where a key made the act, never otherwise.
 * @param {string} region
 * @param {{el: Element, from?: Element | null, byKey?: boolean, first?: Element | null}} o `from` the element the act found the focus on, read by the caller before its markup replaced it (the focus now, where left out); `first` the control the focus goes to by a key
 */
export function open(region, o) {
  let e = stack.find((s) => s.region === region);
  if (!e) {
    const from = o.from === undefined ? active() : o.from;
    e = { region, el: o.el, opener: onNothing(from) ? null : from };
    stack.push(e);
  } else e.el = o.el;
  if (o.byKey && o.first) focusEl(o.first);
  changed();
}

/**
 * A region ends (rule 4; rule 16): the focus returns to the opener where that
 * still takes it — an item a rebuild replaced, a corner the walk has left, do
 * not — else to the walk's element; never lost, never to the top. The return
 * runs only where the focus stands on nothing, or still inside the region
 * (taken off it first); one the person moved out stays where they put it.
 * @param {string} region
 */
export function close(region) {
  let i = -1;
  for (let k = stack.length - 1; k >= 0; k--) if (stack[k].region === region) { i = k; break; }
  if (i < 0) return;
  const [e] = stack.splice(i, 1);
  const at = active();
  const inside = !onNothing(at) && !!at && e.el.contains(at);
  if (!onNothing(at) && !inside) { changed(); return; }
  if (inside && at) /** @type {HTMLElement} */ (at).blur();
  if (!(e.opener && e.opener.isConnected && focusEl(e.opener))) { const h = home(); if (h) focusEl(h); }
  changed();
}

/** the controls a region's rebuild may restore the focus to */
const CONTROLS = 'button, input, [tabindex]';
const usable = (/** @type {Element} */ e) => !(/** @type {HTMLButtonElement} */ (e)).disabled;

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
  const all = /** @type {Element[]} */ ([...region.querySelectorAll(CONTROLS)]).filter(usable);
  const same = key != null ? all.find((e) => keyOf(e) === key) || null : null;
  const first = all.find((e) => e.getAttribute('tabindex') !== '-1') || null;
  const to = same || first || (region.getAttribute('tabindex') === '0' ? region : null);
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

/**
 * The status region (D4): one standing region, written here alone — polite
 * for the selection, a face, the line's transients; assertive for the
 * session's death and halted writes. Nothing for a camera move; a landing is
 * told by the focus move.
 * @param {string} text
 * @param {boolean} [assertive]
 */
export function say(text, assertive = false) {
  if (!liveEl) return;
  liveEl.setAttribute('aria-live', assertive ? 'assertive' : 'polite');
  liveEl.textContent = text;
}

/** the tests' reset: the stack emptied, the ring's rule off, the registered parts kept */
export function _reset() { stack.length = 0; ringByKey = false; modality = 'key'; }
