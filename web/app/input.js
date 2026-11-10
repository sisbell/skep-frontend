// APP-INPUT — pointer, wheel and resize → view state and the pump (the
// structure record §3.2; foundations §2.4; D5 K-10, K-12). Layer 3.
// Engine-bound. Input never draws (FP-9): a handler changes view state, or
// asks for a read, and marks the frame dirty. State: the press held for the
// text under it (`held`), whether the drag it began is carrying the
// platform's selection to the pointer (`carrying`), and the wheel series'
// clock (`wheelAt`, `seriesFrom`).
// The press rule (foundations §2.4): a pointer's drag never pans. At the
// readable threshold and above it selects the text it crosses — the
// platform's selection on the mounted layer — and that selection is the
// page's (R11): as the drag ends, and whenever the platform's selection
// changes outside a drag, the span it covers is read through T-LAYER's
// mapping and handed to O-SELECTION, its focus point the end the act moved,
// which T-LAYER keeps clear of its document's head. The drag is T-LAYER's
// press, from the button going down on an article to its release, the
// platform's cancel or a context menu; this module reports its start and its
// end. Below the readable threshold every press is the canvas's, over bars or
// mounted text alike, so a drag there selects nothing and a click is the
// place's — keyed on the document's own em at the readable threshold
// (T-LAYER's `atReadingScale`), never on whether text is mounted. At the
// readable threshold and above a press acts on the text (FP-12), never
// dropped and never a move to the place: a press the canvas takes on a
// document's column there — the text under it not yet standing — is held, the
// frame marked dirty, until the frame after it has set that text, then acted
// on as a press on any standing article is (`afterFrame`): released, the text
// layer's click at the element under it; the button still down, the
// platform's drag from the press's point (T-LAYER's `caretAt`), its other end
// carried as the pointer moves (`extendTo`) and taken as the page's selection
// at the release. A camera move, the person's next press, chrome standing
// over it, or the text standing with none of it under the press drops it —
// released there unmoved, a click on the document's ground (below).
// Keys follow the person's last pointer act (FP-36, FP-20). A click in text
// the person may edit places the caret there (below), one caret standing at a
// time. Any other act on a document while a caret stands, live or kept, in
// another document — on its text, a link's symbol or the stretch it marks, the
// ⟡, a byline's label, a withheld run's gap, key or symbol, a sign in its
// column's edge, its corner, its held label, its ground (a gutter, a margin, a
// column's blank room), a tail from its words or its box — and a selection a
// drag or a double-click makes there, in text the person may edit or not,
// keeps the caret where it stood, owing the frame nothing,
// the act's target being what the view and the platform's selection stand on
// (`leftCaret`; T-LAYER's `leaveCaret`; FP-37), and stands the walk on what was
// acted on: the span clicked, the span a sign or a mark marks, the span the
// drag ended in, else the document's stop nearest the point (`nearestStop`).
// The same acts on the caret's own draft, its text and its corner apart,
// leave a live caret live and the walk on its span, so the next key types
// there (`followPointer`; N-WALK's `followCaret`); its corner, like the one
// line, takes keys only while it holds the focus. Where no caret stands they
// move the walk only as said below. Camera moves and departures — a LEAP, a
// teleport, a version move, the scene-offer, a step to an arrival's run, a
// continuation's mark — are their own.
// The camera pans by the wheel and two-finger scroll and by the camera key's
// drag (K-10: Mod held, wherever the pointer is — M-8: a drag begun on an
// article with the key held is the camera's, the pointer captured by the
// plane, and selects nothing); it zooms by the pinch (Ctrl+wheel, as a
// trackpad sends it) and by Mod+wheel (K-12). A wheel over the chrome — the
// overlay and the notice below it, the reading scene, the LEAP box, the
// mirror, the one line — is the chrome's own, scrolling what of it scrolls,
// and moves no camera. While a jump is in the air
// (FP-25) a wheel series — wheel events less than SERIES_MS apart — begun
// before the jump's camera left (N-GO's `airSince`) is dropped whole, so a
// trackpad's momentum never moves the camera the jump took; any other wheel
// or pinch event, and the camera key's drag as it moves, takes the camera
// over (N-GO's `takeOver`). A wheel schedules the walk's re-take, and the
// camera key's drag re-takes as it ends (N-WALK's `retakeFromView`); it takes
// down what stands on the one line until the next act, and leaves the line's
// layout as it stands (L-LINE's `panned`), where a click is the reader's act
// (L-LINE's `act`); either takes a hint down (O-HINT's `act`). Whether
// a key made an act is never read here: a pointer's act opens a card without
// the focus (D5 §4 rule 4), and only the empty click's last step, at a live
// caret, draws the ring (N-KEYS' `esc`).
// A click acts on what is under the pointer, keyed on legibility. On the
// plane (`clickPlane`): a tail — a link whose far document the plane draws
// nowhere — lists its links or opens the card of its one (O-ANATOMY's
// `fromTail`), at any scale, before any place under it acts; an outlined run
// of an arrival in several runs, below its document's reading scale, is a
// step to it (N-GO's `stepTo`; FP-21); a continuation's mark is two targets
// (P-RENDER's `residueAtScreen`): the band its newest member's label stands
// in, a teleport to that member — the version its box shows — and the rest
// of the mark, which opens its members' list (O-MARK-LIST), the pointer's
// shape over each its own while it hovers there (`aim`); below the readable
// threshold a document is a place wherever the pointer falls, bars or mounted text
// alike — a teleport to the version its box shows, which P-RENDER's hit
// test answers (FP-22); each LEAP a click makes is made where it fell, where
// the face of a failure known at the act, or its reaching, stands (N-GO);
// at the readable threshold and above, a press in a gutter or a margin of a
// document is on its ground; an account at far is a teleport to its region,
// on the board the page holds — where it holds none the click is an empty one
// (FP-35); an empty click — nothing under the point — is the pointer's Esc,
// one step of Esc's order a click (N-KEYS' `esc`): the LEAP box, a card or
// scene still reading (O-HOST's opening), the notice standing below the
// overlay, the overlay (O-HOST's `dismissInnermost`; FP-36), a jump reaching,
// the find, the selection, and last a live caret, kept with its span holding
// the walk and the ring drawn — never an arrival (FP-21). At the
// readable threshold and above the text takes the click (`clickText`): a
// symbol opens the anatomy card of the link's end it stands for, and a
// stretch links mark that of the first end marking it — each mark carries
// its ends by their links and their keys (LK's `endKey`; `endAt`), so of a
// link with two ends in one article the card is the clicked end's (B1-S5);
// the one symbol a withheld run's ends merge into opens its one end's card
// or lists its several (O-ANATOMY's `fromSymbol`; FP-30), a target of its
// own beside the run; the presence indicator's ⟡ asks to see the links; a
// byline's cut label opens whole, and the act again closes it (T-LAYER's
// `openLabel`; FP-34); the scene-offer opens the scene, a step on
// the trail (N-GO's `toScene`); a withheld run's key in its gap opens the
// run's whole wording's card (O-FACES's `withheldRun`), as Enter at the run
// does (D5 K-7); the rest of a withheld run's gap conjures C-39's face naming the
// owner the gap names (B1-S5, B1-S7), anchored at the gap and, once the text
// layer rebuilds or takes it down, at the run's own positions (`runOf`;
// O-HOST's anchor) — a press on the gap starts no selection, which the
// platform, selecting an item whole wherever a selection touches it (FP-24),
// would otherwise make of it at every click; a selection the platform made
// (a double-click's word) is the page's; a click on a block selects it whole
// (R11); and each of these three in text the person may not edit — the
// stretch's, the word's, the block's — moves the walk's focus to the span
// clicked, the ring out, a live caret left kept (D5 K-70, M-2; `walkOn`) —
// save in text the person may edit (T-LAYER's `editable`; D5 K-70),
// where a click on a block or on a marked stretch places the caret at the
// character clicked, as the platform's own collapse of its selection names it
// (T-LAYER's `caretFromPlatform`, `placeCaret`), the selection cleared and
// the walk standing on the span it is placed in, the ring out (N-WALK's
// `followCaret`), and a symbol's click still opens its card (K-7). On the
// corners: the read a corner offers where a newer version's arrival pinned
// its box takes that read, a version move (O-VERSIONS' `readFromCorner`; D5
// K-57); the version statement opens the document's members (the corner's
// act, the one Enter takes there — K-57), a draft's kept word opens its
// statement and closes it again (T-LAYER's `openStatement`; K-57, K-74), a
// compact corner's glyph opens the corner whole and a click on the corner
// opened closes it again (T-LAYER's `openCorner`; FP-26), as a click on the
// count a corner standing at its document's head folds its items into does;
// and a focus landing in a corner the view does not show whole moves the
// camera by the least pan that brings it in (P-CAM's `panInto`; FP-20), no
// flight running. On the signs in the columns' edges (T-LAYER's): a withheld
// origin's statement's mark, and a withheld run's key, open the run's card;
// C-67's pointer in the statement is a LEAP to the claim's home, the edition,
// landed in whole and made at the run (B1-S7 → S6) — it carries no passage,
// for an edition's bytes are fresh identity and no span of it resolves to the
// origin (PUB-3.2; RES-66), and lights no link, the claim being a record LK
// never draws; a transcluded run's key — alone, or heading its origin's
// statement — is the run's one gesture to its source, going there carrying
// the run it stands beside (foundations §2.3; P43) (`signAct`).
// Figures: a press that moves more than 4 px is a drag, not a click; a wheel
// series ends at SERIES_MS (220 ms, unmeasured) of quiet, and the re-take
// follows a wheel 220 ms after it; a pinch zooms by e^(-Δy·0.012), Mod+wheel
// by e^(-Δy·0.0022).
// Rules: FP-1, FP-2, FP-9, FP-12, FP-20, FP-21, FP-22, FP-24, FP-25, FP-26,
// FP-30, FP-34, FP-35, FP-36, FP-37.

import * as CAM from '../plane/camera.js';
import * as RENDER from '../plane/render.js';
import * as GO from '../nav/go.js';
import * as WALK from '../nav/walk.js';
import * as HOST from '../overlays/host.js';
import * as SEL from '../overlays/selection.js';
import * as LINKS from '../overlays/links-card.js';
import * as ANATOMY from '../overlays/anatomy-card.js';
import * as MARKLIST from '../overlays/mark-list.js';
import * as LINE from '../line/line.js';
import * as HINT from '../overlays/hint.js';
import * as LK from '../links/links.js';
import * as REC from '../model/records.js';
import * as FACES from '../overlays/faces.js';
import * as VERSIONS from '../overlays/versions.js';
import * as LAYER from '../text/layer.js';
import * as KEYS from '../nav/keys.js';
import { sameSpan } from '../text/span.js';
import { lodOf } from '../plane/lod.js';
import { accountAt } from '../plane/projection.js';
import { documentOf } from '../model/address.js';

/**
 * @typedef {Object} Held — a press the canvas took at the readable em on a document's column, held until the text under it stands (see the head)
 * @property {number} x where it was pressed, on screen
 * @property {number} y
 * @property {string} addr the document pressed on
 * @property {{x: number, y: number}} at where the pointer stands now
 * @property {number} moved how far the pointer has moved since, in px
 * @property {boolean} released the button was released
 * @property {{x: number, y: number, scale: number}} view the camera as it was pressed
 */

/** @type {Held | null} */
let held = null;
/** the drag a held press began goes on: the platform's selection carried to the pointer as it moves, until the release */
let carrying = false;
/** the pause that ends a wheel series, in ms: the re-take's own pause (unmeasured) */
export const SERIES_MS = 220;
/** when the last wheel event came, and when the series it belongs to began, by its event's clock (the platform's, as `performance.now()` reads it) */
let wheelAt = -Infinity, seriesFrom = -Infinity;

/**
 * A wheel event, by its time: true where it belongs to a series begun before
 * the latest jump's camera left (N-GO's `airSince`), so it does nothing (see
 * the head); a series begins at an event SERIES_MS or more after the last.
 * @param {number} t the event's time
 */
function dropped(t) {
  if (t - wheelAt >= SERIES_MS) seriesFrom = t;
  wheelAt = t;
  return seriesFrom < GO.airSince();
}

/**
 * Wire the pointer and the wheel.
 * @param {{plane: HTMLCanvasElement, layer: HTMLElement, corners: HTMLElement}} els
 */
export function attach(els) {
  /** @type {{px: number, py: number, moved: number, cameraKey: boolean} | null} */
  let drag = null;
  /** the camera key's drag (K-10): the plane takes the pointer wherever the press began */
  const cameraDrag = (/** @type {PointerEvent} */ e) => {
    drag = { px: e.clientX, py: e.clientY, moved: 0, cameraKey: true };
    els.plane.setPointerCapture(e.pointerId); els.plane.classList.add('dragging');
  };
  els.plane.addEventListener('pointerdown', (e) => {
    held = null;
    if (KEYS.MAC ? e.metaKey : e.ctrlKey) { cameraDrag(e); return; }
    // at the readable em a press on a document's column is the text's: held until the frame has set the text under it
    const addr = textAt(e.clientX, e.clientY);
    if (addr) { held = { x: e.clientX, y: e.clientY, addr, at: { x: e.clientX, y: e.clientY }, moved: 0, released: false, view: CAM.view() }; drag = null; CAM.markDirty(); return; }
    drag = { px: e.clientX, py: e.clientY, moved: 0, cameraKey: false };
  });
  els.plane.addEventListener('pointermove', (e) => {
    if (!drag) { aim(els.plane, e.clientX, e.clientY); return; }
    const dx = e.clientX - drag.px, dy = e.clientY - drag.py;
    drag.px = e.clientX; drag.py = e.clientY; drag.moved += Math.abs(dx) + Math.abs(dy);
    if (drag.cameraKey) { GO.takeOver(); CAM.panBy(dx, dy); CAM.markDirty(); }
  });
  els.plane.addEventListener('pointerup', (e) => {
    const d = drag; drag = null; els.plane.classList.remove('dragging');
    if (!d) return;
    if (d.cameraKey && d.moved > 4) { WALK.retakeFromView(); return; }
    if (d.moved <= 4) clickPlane(e.clientX, e.clientY);
  });
  els.plane.addEventListener('pointerleave', () => aim(els.plane, NaN, NaN));
  // the text layer's drag, T-LAYER's press: the platform selects while it stands; its selection becomes the page's as the
  // button is released — the press ended first, then the span read, with no frame between them, from the article the drag
  // was made in — and, while no press stands, whenever the platform's changes. A cancel or a context menu ends the press
  // and takes nothing
  let lastDown = { x: 0, y: 0 };
  els.layer.addEventListener('pointerdown', (e) => {
    held = null;
    // the camera key held: the drag is the camera's wherever the pointer is (K-10, M-8) — no press on the text, no selection, no focus moved
    if (KEYS.MAC ? e.metaKey : e.ctrlKey) { e.preventDefault(); cameraDrag(e); return; }
    lastDown = { x: e.clientX, y: e.clientY }; LAYER.press(true);
  });
  // a press on a withheld run's placeholder starts no selection: its click is its act's (see the head)
  els.layer.addEventListener('selectstart', (e) => { if (inPlaceholder(/** @type {Node | null} */ (e.target))) e.preventDefault(); });
  // a held press follows the pointer, and the drag it began carries the platform's selection's other end to it
  window.addEventListener('pointermove', (e) => {
    if (held) { held.moved += Math.abs(e.clientX - held.at.x) + Math.abs(e.clientY - held.at.y); held.at = { x: e.clientX, y: e.clientY }; }
    if (carrying) LAYER.extendTo(e.clientX, e.clientY);
  });
  window.addEventListener('pointerup', (e) => {
    if (held) { held.released = true; held.at = { x: e.clientX, y: e.clientY }; CAM.markDirty(); }
    carrying = false;
    if (!LAYER.pressing()) return;
    LAYER.press(false); takeSelection(true);
  });
  window.addEventListener('pointercancel', () => { held = null; carrying = false; LAYER.press(false); });
  window.addEventListener('contextmenu', () => { held = null; carrying = false; LAYER.press(false); });
  document.addEventListener('selectionchange', () => { if (!LAYER.pressing()) takeSelection(false); });
  // the layer: a click on a symbol, the ⟡, the scene-offer, a withheld run; a selection the platform made (a double-click's word); a click on a marked span or a block; one on none of them, its document's ground
  els.layer.addEventListener('click', (e) => {
    acted();
    // a drag's own click: the pointer moved, and the selection it made was taken as it ended
    if (Math.abs(e.clientX - lastDown.x) + Math.abs(e.clientY - lastDown.y) > 4) { e.stopPropagation(); return; }
    if (clickText(/** @type {HTMLElement} */ (e.target), worldOf(e.clientX, e.clientY))) e.stopPropagation();
  });
  // the corners: a click on the read it offers takes that read; one on the version statement takes the corner's act; one on a
  // compact corner's glyph, or on a head's count of the items it folds, opens it whole, and one on the corner opened closes
  // it again (FP-26); every one but the offered read, on another document's corner, and one on a held label, the act the
  // next key follows (see the head)
  els.corners.addEventListener('click', (e) => {
    const target = /** @type {HTMLElement} */ (e.target), at = worldOf(e.clientX, e.clientY);
    acted();
    // a sign in a column's edge: an origin's statement, a run's key
    const sign = /** @type {HTMLElement | null} */ (target.closest('.edge-sign'));
    if (sign) { e.stopPropagation(); signAct(sign, target); return; }
    const holder = /** @type {HTMLElement | null} */ (target.closest('[data-corner]')), addr = holder ? holder.dataset.corner || '' : '';
    // another document's corner, the offered read apart, is the act the next key follows; the caret's own draft's, like the
    // one line, takes keys only while it holds the focus, and moves no walk (`leftCaret` answers false there)
    if (holder && !target.closest('[data-read]') && leftCaret(addr)) walkOn(addr, nearestStop(addr, at));
    if (holder && target.closest('[data-read]')) { e.stopPropagation(); VERSIONS.readFromCorner(holder, SEL.selected(), false); }
    else if (holder && target.closest('.version')) { e.stopPropagation(); VERSIONS.fromCorner(holder, SEL.selected(), false); }
    else if (holder && target.closest('.kept-word[data-kept]')) { e.stopPropagation(); LAYER.openStatement(addr); }
    else if (holder && (target.closest('.glyph, [data-more]') || LAYER.cornerAt(addr)?.opened)) { e.stopPropagation(); LAYER.openCorner(addr); }
    const label = /** @type {HTMLElement | null} */ (holder ? null : target.closest('[data-held]'));
    if (label && label.dataset.held) followPointer(label.dataset.held, at);
  });
  // a focus landing in a corner the view does not show whole brings it in by the least pan, no flight running (FP-20)
  els.corners.addEventListener('focusin', (e) => {
    const holder = /** @type {HTMLElement | null} */ (/** @type {HTMLElement} */ (e.target).closest('[data-corner]'));
    if (!holder || CAM.flying()) return;
    const q = holder.getBoundingClientRect(), moved = CAM.panInto({ x: q.left, y: q.top, w: q.width, h: q.height }, CAM.visibleView(LINE.bottom()));
    if (moved.dx || moved.dy) CAM.markDirty();
  });
  window.addEventListener('wheel', (e) => {
    const t = /** @type {HTMLElement} */ (e.target);
    if (t.closest && t.closest('#overlay, #notice, #scene, #leap, #mirror, #line')) return;
    e.preventDefault();
    if (dropped(e.timeStamp)) return;
    GO.takeOver();
    LINE.panned();
    HINT.act();
    const wantZoom = e.ctrlKey || e.metaKey;
    if (wantZoom) CAM.zoomAt(Math.exp(-e.deltaY * (e.ctrlKey && !e.metaKey ? 0.012 : 0.0022)), e.clientX, e.clientY);
    else CAM.panBy(-e.deltaX, -e.deltaY);
    CAM.markDirty();
    scheduleRetake();
  }, { passive: false });
}

let retakeT = 0;
function scheduleRetake() { clearTimeout(retakeT); retakeT = window.setTimeout(() => WALK.retakeFromView(), 220); }

/** a click is the reader's next act (see the head): what stands on the one line until it, and a hint, taken down */
function acted() { LINE.act(); HINT.act(); }

/**
 * The pointer's shape over the plane where no drag stands (see the head):
 * `to-doc` over a continuation's mark's newest label, which goes to that
 * member, `to-list` over the rest of the mark, which opens its list, neither
 * anywhere else — the plane's own classes, which the style reads.
 * @param {{classList: {add: (c: string) => void, remove: (c: string) => void}}} plane
 * @param {number} px
 * @param {number} py
 */
function aim(plane, px, py) {
  const hit = RENDER.residueAtScreen(px, py), at = hit ? (hit.target === 'newest' ? 'to-doc' : 'to-list') : null;
  for (const c of ['to-doc', 'to-list']) { if (c === at) plane.classList.add(c); else plane.classList.remove(c); }
}

/** does a node — the element or the text a selection starts at — lie in a withheld run's placeholder? */
function inPlaceholder(/** @type {Node | null} */ n) {
  const el = !n ? null : n.nodeType === 1 ? /** @type {Element} */ (n) : n.parentElement;
  return !!el && !!el.closest('[data-withheld]');
}

/**
 * The run an element of an article names, as its own positions in the
 * article that holds it, which T-ARTICLE sets on the element: a placeholder's
 * withheld run, where C-39's face stands once the text layer rebuilds or
 * takes down the placeholder (O-HOST's anchor). Null where the element
 * stands in no article or names no run.
 * @param {HTMLElement} at
 * @returns {import('../text/span.js').Span | null}
 */
function runOf(at) {
  const art = /** @type {HTMLElement | null} */ (at.closest('article'));
  const addr = art ? art.dataset.addr || '' : '', pos = Number(at.dataset.pos), width = Number(at.dataset.width);
  return addr && pos > 0 && width > 0 ? { addr, pos, width } : null;
}

/**
 * The end of a link a mark in an article draws, as LK draws it at the
 * article's document now (`shown`): the one whose link and key (LK's
 * `endKey`) the mark carries, which T-ARTICLE sets on it — so a click opens
 * the card of the end clicked, a link's other end in the same text being
 * another mark. Undefined where the document draws no such end now.
 * @param {HTMLElement} mark a link's symbol, or a stretch of text its link marks
 * @param {string} link the link's address
 * @param {string} key the end's key
 * @returns {import('../links/links.js').Shown | undefined}
 */
function endAt(mark, link, key) {
  const art = /** @type {HTMLElement | null} */ (mark.closest('article'));
  return LK.shown(art ? art.dataset.addr || '' : '').find((s) => s.link.addr === link && s.key === key);
}

/**
 * A click on the text layer's text, at the element under it (see the head): a
 * symbol, the ⟡, the scene-offer, a withheld run's key, a withheld run;
 * a selection the platform made (a double-click's word); in text the person
 * may edit, the caret at the character clicked (K-70); a marked stretch; a
 * block, selected whole; else its document's ground. Each act on a
 * document's sign, mark or ground is the act the next key follows
 * (`followPointer`), the scene-offer's a departure. The text layer's own
 * clicks and a held press's release both act through it.
 * @param {HTMLElement} target
 * @param {{x: number, y: number}} at the world point the click fell on: what the stop nearest it is read from (`nearestStop`)
 * @returns {boolean} whether the text took the click
 */
function clickText(target, at) {
  const art = /** @type {HTMLElement | null} */ (target.closest('article')), doc = art ? art.dataset.addr || '' : '';
  let took = false;
  const sym = target.closest('.sym');
  if (sym) {
    took = true;
    const se = /** @type {HTMLElement} */ (sym);
    if (se.dataset.reveal) { followPointer(doc, at); LINKS.show(se.dataset.reveal); return true; }
    if (se.dataset.link) { const s = endAt(se, se.dataset.link, se.dataset.end || ''); followPointer(s ? s.near : doc, s ? s.pos : at); if (s) ANATOMY.open(s, se, false); return true; }
    if (se.dataset.links) {
      // a withheld run's symbol: the ends it stands for, as LK draws them now
      const keys = (se.dataset.ends || '').split(' ');
      const ends = se.dataset.links.split(' ').flatMap((l, i) => { const s = endAt(se, l, keys[i] || ''); return s ? [s] : []; });
      const gap = /** @type {HTMLElement | null} */ (se.closest('[data-withheld]')), run = gap ? runOf(gap) : null;
      const [one, two, ...more] = ends;
      followPointer(doc, run ? run.pos : one ? one.pos : at);
      if (one && two) ANATOMY.fromSymbol([one, two, ...more], se, false); else if (one) ANATOMY.open(one, se, false);
      return true;
    }
  }
  const offer = target.closest('.offer');
  if (offer) { const [a, b] = (/** @type {HTMLElement} */ (offer).dataset.scene || '').split('|'); if (a && b) void GO.toScene(a, b); return true; }
  // a byline's cut label opens whole on its act, and closes on it again (FP-34)
  const label = target.closest('.slot[data-cut]');
  if (label) { if (doc) { followPointer(doc, at); LAYER.openLabel(doc); } return true; }
  // a withheld run's key opens its whole wording's card, as Enter at the run does (D5 K-7)
  const key = target.closest('.wh-key');
  if (key) {
    const holder = /** @type {HTMLElement | null} */ (key.closest('[data-withheld]')), run = holder ? runOf(holder) : null;
    if (run) { followPointer(run.addr, run.pos); openRun(run); }
    return true;
  }
  const wh = target.closest('[data-withheld]');
  if (wh) { const w = /** @type {HTMLElement} */ (wh), run = runOf(w); followPointer(doc, run ? run.pos : at); FACES.c39(w.dataset.owner || '', REC.reader(), run ? { el: w, span: run } : w); return true; }
  // the platform selected text under the click (a double-click's word): the selection IS that span (R11), the walk on its span in text the person may not edit, and wherever the click left a caret in another document (K-70)
  const span = LAYER.spanOfSelection();
  if (span && !sameSpan(span, LAYER.placedSpan())) { const left = leftCaret(span.addr); SEL.select(span.addr, span.pos, span.width); if (left || !LAYER.editable(span.addr)) walkOn(span.addr, span.pos); return true; }
  // text the person may edit: the click places the caret at the character clicked, where the platform collapsed its selection (K-70) — a marked stretch takes it as any text does, the card its symbol's (K-7) — and the walk stands on its span, the ring out
  const own = /** @type {HTMLElement | null} */ (target.closest('.sp'));
  if (own && LAYER.editable(own.dataset.addr || '')) {
    const c = LAYER.caretFromPlatform();
    if (c && c.addr === own.dataset.addr) { SEL.clear(); LAYER.placeCaret(c.addr, c.pos); void WALK.followCaret(false); return true; }
  }
  // text that takes no caret: the walk on the span clicked (K-70) — a marked stretch's, which opens its end's card (K-7), or a block's, selected whole (R11) — a caret in another document left kept first
  const marked = target.closest('.lip');
  if (marked) { took = true; const m = /** @type {HTMLElement} */ (marked); const s = endAt(m, (m.dataset.links || '').split(' ')[0], (m.dataset.ends || '').split(' ')[0]); if (s) { leftCaret(s.near); walkOn(s.near, s.pos); ANATOMY.open(s, m, false); return true; } }
  const sp = target.closest('.sp');
  if (sp) { const s = /** @type {HTMLElement} */ (sp), addr = s.dataset.addr || '', pos = Number(s.dataset.pos); leftCaret(addr); SEL.select(addr, pos); walkOn(addr, pos); return true; }
  // none of them: the article's ground — a column's blank room
  if (!took && doc) followPointer(doc, at);
  return took;
}

/**
 * A withheld run's whole wording opened as its card (O-FACES's
 * `withheldRun`), the pointer's act, its pointer a LEAP to the edition its
 * claim names, made at the run (B1-S7 → S6); nothing where no withheld run
 * stands at the run's first position in the text shown.
 * @param {import('../text/span.js').Span} run the run, by its positions in the text shown
 */
function openRun(run) {
  const b = LAYER.blockByPos(run.addr, run.pos);
  if (b && b.kind === 'withheld') FACES.withheldRun(run.addr, b, (home, byKey) => GO.leapTo(home, { how: 'leap', byKey, site: { span: run } }));
}

/**
 * The act at a sign in a column's edge (see the head): C-67's pointer in a
 * withheld origin's statement is a LEAP to the claim's home, the edition,
 * landed in whole and made at the run it stands beside; the statement's mark
 * and a withheld run's key open the run's card (`openRun`); a transcluded
 * run's key, alone or heading its origin's statement, goes to its source
 * carrying the run it stands beside, its own positions in the text shown
 * (foundations §2.3; P43). Every other part of a sign is the act the next key
 * follows, at the run the sign stands beside (`followPointer`).
 * @param {HTMLElement} sign the sign's element (T-LAYER's), carrying its run
 * @param {HTMLElement} target what the click fell on
 */
function signAct(sign, target) {
  const d = sign.dataset, run = { addr: d.addr || '', pos: Number(d.pos), width: Number(d.width) };
  if (!run.addr || !(run.pos > 0)) return;
  const pointer = /** @type {HTMLElement | null} */ (target.closest('.clause[data-home]'));
  if (pointer) { if (pointer.dataset.home) void GO.leapTo(pointer.dataset.home, { how: 'leap', site: { span: run } }); return; }
  const source = /** @type {HTMLElement | null} */ (target.closest('.src-key[data-src]'));
  if (source) { if (source.dataset.src) GO.leapTo(source.dataset.src, { how: 'leap', carry: run, site: { span: run } }); return; }
  followPointer(run.addr, run.pos);
  if (target.closest('.wh-mark, .wh-key')) openRun(run);
}

/**
 * A click on text that places no caret moves the walk's focus to the span
 * holding the position clicked (D5 K-70): the ring out, the platform's focus
 * carried there only where the mirror held it, the span's levels as the model
 * holds them — a live caret left kept (N-WALK's `focusTo`); with no position,
 * to the document whole.
 * @param {string} addr
 * @param {number | null} pos
 */
function walkOn(addr, pos) { void WALK.focusTo(addr, pos, false, false, null, true); }

/**
 * A pointer's act on a document leaves the caret where one stands in another
 * document (see the head): kept where it stood, owing the frame nothing — the
 * act's own target is what the view and the platform's selection stand on
 * (T-LAYER's `leaveCaret`) — the caller then standing the walk on what was
 * acted on. A caret already kept stays as it is.
 * @param {string} addr the document acted on
 * @returns {boolean} whether a caret, live or kept, stood in another document: false where none stands, or it stands in `addr`
 */
function leftCaret(addr) {
  const c = LAYER.caret();
  if (!c || c.addr === addr) return false;
  LAYER.leaveCaret(false);
  return true;
}

/**
 * The next key follows a pointer's act on a document's sign, mark or ground —
 * anything of it but its text and its corner (see the head): where a caret
 * stands in another document it is kept (`leftCaret`) and the walk stood on
 * the position the act names, else on the document's stop nearest the point
 * (`nearestStop`); at the caret's own draft a live caret stands live, the walk
 * on its span (N-WALK's `followCaret`); nothing where no caret stands.
 * @param {string} addr the document acted on
 * @param {number | {x: number, y: number}} at the position of its text shown the act names, else the world point it fell on
 */
function followPointer(addr, at) {
  if (!addr) return;
  if (leftCaret(addr)) walkOn(addr, typeof at === 'number' ? at : nearestStop(addr, at));
  else if (LAYER.caret()) void WALK.followCaret(false);
}

/**
 * A document's stop of the walk nearest a world point (see the head): at its
 * reading scale the position its fold holds there, on the nearest line of the
 * nearest column (T-LAYER's `posAt`) — the walk stands on the span holding it
 * — else none, the walk standing on the document whole.
 * @param {string} addr
 * @param {{x: number, y: number}} p
 * @returns {number | null}
 */
function nearestStop(addr, p) { return LAYER.atReadingScale(addr) ? LAYER.posAt(addr, p.x, p.y) : null; }

/** a screen point as a world point, by the camera as it stands */
const worldOf = (/** @type {number} */ px, /** @type {number} */ py) => ({ x: CAM.wx(px), y: CAM.wy(py) });

/**
 * The document whose text a press at a screen point is on, at the readable
 * em and above: a document standing whole there — no continuation's mark
 * holding it — at that em, the point in one of its columns, where its text
 * stands or will; null anywhere else, a gutter among them.
 * @param {number} px
 * @param {number} py
 * @returns {string | null}
 */
function textAt(px, py) {
  if (RENDER.residueAtScreen(px, py)) return null;
  const doc = RENDER.docAtScreen(px, py);
  if (!doc || !LAYER.atReadingScale(doc)) return null;
  return LAYER.holdsText(doc, CAM.wx(px), CAM.wy(py)) ? doc : null;
}

/**
 * The press held at the readable em (see the head), after a frame: where the
 * text under it stands now — a standing article's, taking the pointer — it is
 * acted on as a press on that text is: released without moving, the text
 * layer's click at the element under it, the platform's selection collapsed
 * there first as the press would have set it; else the platform's drag from
 * the press's point to the pointer (`caretAt`, `extendTo`), taken as the
 * page's selection at the release, or carried on as the pointer moves until
 * it. A camera move drops it — the place it fell on has moved — and so does a
 * frame that has set the document's text with none of it under the press, a
 * release there without moving a click on its ground (`followPointer`), or
 * one with chrome standing over it; where the document's text has not
 * arrived, it waits.
 */
export function afterFrame() {
  const h = held;
  if (!h) return;
  const v = CAM.view();
  if (v.x !== h.view.x || v.y !== h.view.y || v.scale !== h.view.scale) { held = null; return; }
  const el = /** @type {HTMLElement | null} */ (document.elementFromPoint(h.x, h.y));
  const art = el ? el.closest('#domlayer article.dtext') : null;
  const at = worldOf(h.x, h.y);
  if (!el || !art) {
    const standing = LAYER.isMounted(h.addr);
    if (standing || (el && el.id !== 'plane')) held = null;
    // its text standing with none of it under the press and no chrome over it: a release without moving is on its ground
    if (standing && (!el || el.id === 'plane') && h.released && h.moved <= 4) { acted(); followPointer(h.addr, at); }
    return;
  }
  held = null;
  acted();
  if (h.released && h.moved <= 4) { LAYER.caretAt(h.x, h.y); clickText(el, at); return; }
  LAYER.press(true);
  if (!LAYER.caretAt(h.x, h.y)) { LAYER.press(false); return; }
  LAYER.extendTo(h.at.x, h.at.y);
  if (h.released) { LAYER.press(false); takeSelection(true); return; }
  carrying = true;
}

/**
 * The platform's selection, where it stands in a mounted article, becomes the
 * page's (R11): view state alone changes, its focus point the end the press
 * or the platform's own keys moved (T-LAYER's `keepClear`); one the page
 * already holds, or placed itself, is left as it is — so the page's own
 * placement is never taken as a new selection, whose card would end a card's
 * opening still reading (O-HOST's). A drag's selection is the act the next key
 * follows (see the head): where a caret stands in another document than the
 * one it was made in, the caret is kept first (`leftCaret`) and the walk
 * stood on the span the drag ended in, the platform's focus point.
 * @param {boolean} dragged the selection is a drag's, taken as its press ends; false where the platform's own keys made it
 */
function takeSelection(dragged) {
  const span = LAYER.spanOfSelection();
  if (!span || sameSpan(span, SEL.selected()) || sameSpan(span, LAYER.placedSpan())) return;
  const left = dragged && leftCaret(span.addr), ended = LAYER.selectionBackward() ? span.pos : span.pos + span.width - 1;
  SEL.select(span.addr, span.pos, span.width, 'focus');
  if (left) walkOn(span.addr, ended);
}

/** a click on the plane: a tail lists its links; an outlined run of an arrival in several, below its document's reading scale, is a step to it; a continuation's mark's newest label goes to that member, and the rest of the mark opens its list; a place goes; a document's ground at its reading scale is the act the next key follows; an account at far goes to its region, where a board is held; else the click is the pointer's Esc, one step of its order (N-KEYS' `esc`) */
function clickPlane(/** @type {number} */ px, /** @type {number} */ py) {
  acted();
  /** the point of the plane the click fell on: where a teleport it makes is made, and what the stop nearest it is read from */
  const world = worldOf(px, py), site = { world };
  const tail = RENDER.tailAtScreen(px, py);
  if (tail) {
    // a tail from a passage's line, or from a document's box — never a mark's, which is no document's
    if (tail.form === 'line' && tail.pos != null) followPointer(tail.at, tail.pos);
    else if (documentOf(tail.at)) followPointer(tail.at, world);
    ANATOMY.fromTail(tail, false);
    return;
  }
  // an outlined run stands only where its document is drawn whole, never inside a continuation's mark
  const piece = RENDER.arrivalAtScreen(px, py);
  if (piece && !LAYER.atReadingScale(piece.addr) && GO.stepTo(piece.run, false)) return;
  const lod = lodOf(CAM.cam.scale);
  const residue = RENDER.residueAtScreen(px, py);
  if (residue) { if (residue.target === 'newest') GO.leapTo(GO.shownIn(residue.newest), { how: 'click', site }); else void MARKLIST.open(residue.key, false); return; }
  const doc = RENDER.docAtScreen(px, py);
  if (doc) {
    if (!LAYER.atReadingScale(doc)) { GO.leapTo(doc, { how: 'click', site }); return; }
    // at reading scale a press on its text is held for the text (`afterFrame`); one in a gutter or a margin is on its ground
    followPointer(doc, world);
    return;
  }
  if ((lod.name === 'far' || lod.name === 'far~mid') && REC.board()) {
    const acct = accountAt(world.x, world.y, '1');
    if (acct) { GO.toAccount(acct); return; }
  }
  KEYS.esc(false, true);
}
