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
// mapping and handed to O-SELECTION. The drag is T-LAYER's press, from the
// button going down on an article to its release, the platform's cancel or a
// context menu; this module reports its start and its end. Below the
// readable threshold every press is the canvas's, over bars or mounted text
// alike, so a drag there selects nothing and a click is the place's — keyed
// on the document's own em at the readable threshold (T-LAYER's
// `atReadingScale`), never on whether text is mounted. At the readable
// threshold and above a press acts on the text (FP-12), never dropped and
// never a move to the place: a press the canvas takes on a document's column
// there — the text under it not yet standing — is held, the frame marked
// dirty, until the frame after it has set that text, then acted on as a
// press on any standing article is (`afterFrame`): released, the text
// layer's click at the element under it; the button still down, the
// platform's drag from the press's point (T-LAYER's `caretAt`), its other
// end carried as the pointer moves (`extendTo`) and taken as the page's
// selection at the release. A camera move, the person's next press, chrome
// standing over it, or the text standing with none of it under the press
// drops it; a press in a gutter acts on nothing.
// The camera pans by the wheel and two-finger scroll and by the camera key's
// drag (K-10: Mod held, wherever the pointer is — M-8: a drag begun on an
// article with the key held is the camera's, the pointer captured by the
// plane, and selects nothing); it zooms by the pinch (Ctrl+wheel, as a
// trackpad sends it) and by Mod+wheel (K-12). While a jump is in the air
// (FP-25) a wheel series — wheel events less than SERIES_MS apart — begun
// before the jump's camera left (N-GO's `airSince`) is dropped whole, so a
// trackpad's momentum never moves the camera the jump took; any other wheel
// or pinch event, and the camera key's drag as it moves, takes the camera
// over (N-GO's `takeOver`). A wheel schedules the walk's re-take, and the
// camera key's drag re-takes as it ends (N-WALK's `retakeFromView`). Whether
// a key made an act is never read here: a pointer's act opens a card without
// the focus (D5 §4 rule 4).
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
// an account at far is a teleport to its region, on the board the page
// holds — where it holds none the click is an empty one (FP-35); an empty
// click ends a card or scene still reading (O-HOST's opening), else
// dismisses the notice standing below the overlay, else the overlay
// (O-HOST's `dismissInnermost`; FP-36), else clears the selection. At the
// readable threshold and above the text takes the click (`clickText`): a
// symbol opens the anatomy card of the link's end it stands for, and a
// stretch links mark that of the first end marking it — each mark carries
// its ends by their links and their keys (LK's `endKey`; `endAt`), so of a
// link with two ends in one article the card is the clicked end's (B1-S5);
// the one symbol a withheld run's ends merge into opens its one end's card
// or lists its several (O-ANATOMY's `fromSymbol`; FP-30), a target of its
// own beside the run; the presence indicator's ⟡ asks to see the links; a
// byline's cut label opens whole, and the act again closes it (T-LAYER's
// `openLabel`; FP-34); a run's hairline label goes to its source carrying
// the run (foundations §2.3; P43); the scene-offer opens the scene, a step on
// the trail (N-GO's `toScene`); C-67's pointer
// beneath a withheld run's arm is a LEAP to the claim's home, the edition,
// landed in whole (B1-S7 → S6) — it carries no passage, for an edition's
// bytes are fresh identity and no span of it resolves to the origin
// (PUB-3.2; RES-66), and lights no link, the claim being a record LK never
// draws; a withheld run's face compact in its column's edge opens the run's
// face whole (O-FACES's `withheldRun`; FP-26), as Enter at the run does (D5
// K-7); the rest of a withheld run's gap conjures C-39's face naming the
// owner the gap names (B1-S5, B1-S7), anchored at the gap and, once the text
// layer rebuilds or takes it down, at the run's own positions (`runOf`;
// O-HOST's anchor) — a press on the gap starts no selection, which the
// platform, selecting an item whole wherever a selection touches it (FP-24),
// would otherwise make of it at every click; a selection the platform made
// (a double-click's word) is the page's; a click on a block selects it whole
// (R11). On the corners: the version statement opens the document's members
// (the corner's act, the one Enter takes there — K-57), a compact corner's
// glyph opens the corner whole and a click on the corner opened closes it
// again (T-LAYER's `openCorner`; FP-26).
// Figures: a press that moves more than 4 px is a drag, not a click; a wheel
// series ends at SERIES_MS (220 ms, unmeasured) of quiet, and the re-take
// follows a wheel 220 ms after it; a pinch zooms by e^(-Δy·0.012), Mod+wheel
// by e^(-Δy·0.0022).
// Rules: FP-1, FP-2, FP-9, FP-12, FP-21, FP-22, FP-24, FP-25, FP-26, FP-30,
// FP-34, FP-35.

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
import * as LK from '../links/links.js';
import * as REC from '../model/records.js';
import * as FACES from '../overlays/faces.js';
import * as VERSIONS from '../overlays/versions.js';
import * as LAYER from '../text/layer.js';
import { sameSpan } from '../text/span.js';
import { lodOf } from '../plane/lod.js';
import { accountAt } from '../plane/projection.js';
import { MAC } from '../nav/keys.js';

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
    if (MAC ? e.metaKey : e.ctrlKey) { cameraDrag(e); return; }
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
    if (MAC ? e.metaKey : e.ctrlKey) { e.preventDefault(); cameraDrag(e); return; }
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
    LAYER.press(false); takeSelection();
  });
  window.addEventListener('pointercancel', () => { held = null; carrying = false; LAYER.press(false); });
  window.addEventListener('contextmenu', () => { held = null; carrying = false; LAYER.press(false); });
  document.addEventListener('selectionchange', () => { if (!LAYER.pressing()) takeSelection(); });
  // the layer: a click on a symbol, the ⟡, a hairline, the scene-offer, a withheld run; a selection the platform made (a double-click's word); a click on a marked span or a block
  els.layer.addEventListener('click', (e) => {
    LINE.act();
    // a drag's own click: the pointer moved, and the selection it made was taken as it ended
    if (Math.abs(e.clientX - lastDown.x) + Math.abs(e.clientY - lastDown.y) > 4) { e.stopPropagation(); return; }
    if (clickText(/** @type {HTMLElement} */ (e.target))) e.stopPropagation();
  });
  // the corners: a click on the version statement takes the corner's act; one on a compact corner's glyph opens it whole, and one
  // on the corner opened closes it again (FP-26)
  els.corners.addEventListener('click', (e) => {
    const target = /** @type {HTMLElement} */ (e.target);
    LINE.act();
    const holder = /** @type {HTMLElement | null} */ (target.closest('[data-corner]')), addr = holder ? holder.dataset.corner || '' : '';
    if (holder && target.closest('.version')) { e.stopPropagation(); VERSIONS.fromCorner(holder, SEL.selected(), false); }
    else if (holder && (target.closest('.glyph') || LAYER.cornerAt(addr)?.opened)) { e.stopPropagation(); LAYER.openCorner(addr); }
  });
  window.addEventListener('wheel', (e) => {
    const t = /** @type {HTMLElement} */ (e.target);
    if (t.closest && t.closest('#overlay, #scene, #leap, #mirror, #line')) return;
    e.preventDefault();
    if (dropped(e.timeStamp)) return;
    GO.takeOver();
    LINE.act();
    const wantZoom = e.ctrlKey || e.metaKey;
    if (wantZoom) CAM.zoomAt(Math.exp(-e.deltaY * (e.ctrlKey && !e.metaKey ? 0.012 : 0.0022)), e.clientX, e.clientY);
    else CAM.panBy(-e.deltaX, -e.deltaY);
    CAM.markDirty();
    scheduleRetake();
  }, { passive: false });
}

let retakeT = 0;
function scheduleRetake() { clearTimeout(retakeT); retakeT = window.setTimeout(() => WALK.retakeFromView(), 220); }

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
 * article that holds it, which T-ARTICLE sets on the element: a hairline's
 * transcluded run, the passage its gesture to the source carries
 * (foundations §2.1, §2.3); a placeholder's withheld run, where
 * C-39's face stands once the text layer rebuilds or takes down the
 * placeholder (O-HOST's anchor). Null where the element stands in no article
 * or names no run.
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
 * symbol, the ⟡, a hairline, the scene-offer, C-67's pointer, a withheld run;
 * a selection the platform made (a double-click's word); a marked stretch; a
 * block, selected whole. The text layer's own clicks and a held press's
 * release both act through it.
 * @param {HTMLElement} target
 * @returns {boolean} whether the text took the click
 */
function clickText(target) {
  let took = false;
  const sym = target.closest('.sym');
  if (sym) {
    took = true;
    const se = /** @type {HTMLElement} */ (sym);
    if (se.dataset.reveal) { LINKS.show(se.dataset.reveal); return true; }
    if (se.dataset.link) { const s = endAt(se, se.dataset.link, se.dataset.end || ''); if (s) ANATOMY.open(s, se, false); return true; }
    if (se.dataset.links) {
      // a withheld run's symbol: the ends it stands for, as LK draws them now
      const keys = (se.dataset.ends || '').split(' ');
      const ends = se.dataset.links.split(' ').flatMap((l, i) => { const s = endAt(se, l, keys[i] || ''); return s ? [s] : []; });
      const [one, two, ...more] = ends;
      if (one && two) ANATOMY.fromSymbol([one, two, ...more], se, false); else if (one) ANATOMY.open(one, se, false);
      return true;
    }
  }
  const hair = target.closest('.hairline');
  if (hair) { const h = /** @type {HTMLElement} */ (hair), run = runOf(h); if (h.dataset.src) GO.leapTo(h.dataset.src, { how: 'leap', carry: run, site: run ? { span: run } : null }); return true; }
  const offer = target.closest('.offer');
  if (offer) { const [a, b] = (/** @type {HTMLElement} */ (offer).dataset.scene || '').split('|'); if (a && b) void GO.toScene(a, b); return true; }
  // a byline's cut label opens whole on its act, and closes on it again (FP-34)
  const label = target.closest('.slot[data-cut]');
  if (label) { const art = /** @type {HTMLElement | null} */ (label.closest('article')), addr = art ? art.dataset.addr || '' : ''; if (addr) LAYER.openLabel(addr); return true; }
  const pointer = target.closest('.clause[data-home]');
  if (pointer) {
    const p = /** @type {HTMLElement} */ (pointer), home = p.dataset.home, holder = /** @type {HTMLElement | null} */ (p.closest('[data-withheld]')), run = holder ? runOf(holder) : null;
    if (home) GO.leapTo(home, { how: 'leap', site: run ? { span: run } : null });
    return true;
  }
  // a withheld run's face compact in its column's edge opens it whole (FP-26), as Enter at the run does (D5 K-7)
  const mark = target.closest('.wh-mark');
  if (mark) {
    const holder = /** @type {HTMLElement | null} */ (mark.closest('[data-withheld]')), run = holder ? runOf(holder) : null, b = run ? REC.blockByPos(run.addr, run.pos) : null;
    if (run && b && b.kind === 'withheld') FACES.withheldRun(run.addr, b, (home, byKey) => GO.leapTo(home, { how: 'leap', byKey, site: { span: run } }));
    return true;
  }
  const wh = target.closest('[data-withheld]');
  if (wh) { const w = /** @type {HTMLElement} */ (wh), run = runOf(w); FACES.c39(w.dataset.owner || '', REC.reader(), run ? { el: w, span: run } : w); return true; }
  // the platform selected text under the click (a double-click's word): the selection IS that span (R11)
  const span = LAYER.spanOfSelection();
  if (span && !sameSpan(span, LAYER.placedSpan())) { SEL.select(span.addr, span.pos, span.width); return true; }
  const marked = target.closest('.lip');
  if (marked) { took = true; const m = /** @type {HTMLElement} */ (marked); const s = endAt(m, (m.dataset.links || '').split(' ')[0], (m.dataset.ends || '').split(' ')[0]); if (s) { ANATOMY.open(s, m, false); return true; } }
  const sp = target.closest('.sp');
  if (sp) { const s = /** @type {HTMLElement} */ (sp); SEL.select(s.dataset.addr || '', Number(s.dataset.pos)); return true; }
  return took;
}

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
 * frame that has set the document's text with none of it under the press, or
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
  if (!el || !art) { if (LAYER.isMounted(h.addr) || (el && el.id !== 'plane')) held = null; return; }
  held = null;
  LINE.act();
  if (h.released && h.moved <= 4) { LAYER.caretAt(h.x, h.y); clickText(el); return; }
  LAYER.press(true);
  if (!LAYER.caretAt(h.x, h.y)) { LAYER.press(false); return; }
  LAYER.extendTo(h.at.x, h.at.y);
  if (h.released) { LAYER.press(false); takeSelection(); return; }
  carrying = true;
}

/** the platform's selection, where it stands in a mounted article, becomes the page's (R11): view state alone changes; one the page already holds, or placed itself, is left as it is — so a slot's chord that selects the walk's block before it asks shows no card of the selection while its answer reads, which would end that answer's opening (O-HOST's) */
function takeSelection() {
  const span = LAYER.spanOfSelection();
  if (!span || sameSpan(span, SEL.selected()) || sameSpan(span, LAYER.placedSpan())) return;
  SEL.select(span.addr, span.pos, span.width);
}

/** a click on the plane: a tail lists its links; an outlined run of an arrival in several, below its document's reading scale, is a step to it; a continuation's mark's newest label goes to that member, and the rest of the mark opens its list; a place goes; an account at far goes to its region, where a board is held; else a card or scene still reading ends, the overlay standing under it standing, or else the notice below the overlay dismisses, else the overlay */
function clickPlane(/** @type {number} */ px, /** @type {number} */ py) {
  LINE.act();
  const tail = RENDER.tailAtScreen(px, py);
  if (tail) { ANATOMY.fromTail(tail, false); return; }
  // an outlined run stands only where its document is drawn whole, never inside a continuation's mark
  const piece = RENDER.arrivalAtScreen(px, py);
  if (piece && !LAYER.atReadingScale(piece.addr) && GO.stepTo(piece.run, false)) return;
  const lod = lodOf(CAM.cam.scale);
  const residue = RENDER.residueAtScreen(px, py);
  /** the point of the plane the click fell on: where a teleport it makes is made */
  const site = { world: { x: CAM.wx(px), y: CAM.wy(py) } };
  if (residue) { if (residue.target === 'newest') GO.leapTo(GO.shownIn(residue.newest), { how: 'click', site }); else void MARKLIST.open(residue.key, false); return; }
  const doc = RENDER.docAtScreen(px, py);
  if (doc) {
    if (!LAYER.atReadingScale(doc)) { GO.leapTo(doc, { how: 'click', site }); return; }
    return; // at reading scale a press on its text is held for the text (`afterFrame`); one in a gutter acts on nothing
  }
  if ((lod.name === 'far' || lod.name === 'far~mid') && REC.board()) {
    const acct = accountAt(CAM.wx(px), CAM.wy(py), '1');
    if (acct) { GO.toAccount(acct); return; }
  }
  if (HOST.pending()) HOST.endOpening();
  else if (HOST.hasCurrent()) HOST.dismissInnermost();
  else if (SEL.selected()) SEL.clear();
}
