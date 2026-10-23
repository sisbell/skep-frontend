// APP-INPUT — pointer, wheel, resize → view state + the pump (the structure
// record §3.2 "APP"; foundations §2.4's press rule; D5 K-10, K-12). Layer 3.
// ENGINE-BOUND. INPUT NEVER DRAWS (FP-9): a handler changes view state, or
// asks for a read, and marks the frame dirty.
// The press rule (§2.4, RE-CUT from the wireframe's drag-to-pan): a pointer's
// DRAG NEVER PANS — at the readable threshold and above it selects the text
// it crosses (the platform's selection on the mounted layer), and THAT
// SELECTION IS THE PAGE'S (R11's one continuous gesture): as the drag ends,
// and whenever the platform's selection changes outside a drag, the span it
// covers is read through T-LAYER's mapping and handed to O-SELECTION — a
// change of view state, never a draw. The drag is T-LAYER's press: it stands
// from the button going down on an article to the button's release, the
// platform's cancel, or a context menu (which takes the release on some
// platforms); this module reports its start and its end, and T-LAYER holds
// the drag's article through it. Below the readable threshold every press is
// the canvas's, over bars or mounted text alike — T-LAYER gives an article
// the pointer at reading scale alone — so a drag there is a drag off text and
// selects nothing, and a click is the place's: keyed on legibility — the
// document's own em at the readable threshold, T-LAYER's one test
// (`atReadingScale`), which the one line's position and the walk's span grain
// read too (issue #140's design decision) — never on whether text is
// mounted. AT THE READABLE THRESHOLD AND ABOVE A PRESS ACTS ON
// THE TEXT (issue #122's design decision), never dropped and never a move to
// the place: a press the canvas takes on a document's column there — the text
// under it not yet standing, the view moved or the text arrived since the
// last frame — is HELD, the frame marked dirty, until the frame after it has
// set that text (T-LAYER stands every line in view of a readable document in
// the frame it gets there), then acted on the text under it as a press on any
// standing article is (`afterFrame`): released, the text layer's click at the
// element under it; the button still down, the platform's drag from the
// press's point (T-LAYER's `caretAt`), its other end carried as the pointer
// moves (`extendTo`) and taken as the page's selection at the release. A
// camera move, the person's next press, or the text standing and none of it
// under the press drops it; a press in a gutter acts on nothing, as one beside
// any article does. The camera pans by the WHEEL and
// two-finger scroll, by the keys, and by the held camera key's drag (K-10:
// hold Mod — wherever the pointer is, M-8: a drag begun on an article with
// the key held is the camera's, the pointer captured by the plane, and
// selects nothing); it zooms by the PINCH (Ctrl+wheel as a trackpad sends it)
// and by Mod+wheel (K-12). Whether a key made an act is never read here: a
// pointer's act opens a card without the focus (D5 §4 rule 4; the focus
// record's rule 16). A CLICK acts on what is under the pointer, keyed on
// legibility: a TAIL — a link whose far document the plane draws nowhere,
// leaving its near end with its far end named (P-RENDER's; issue #132's
// design decision) — lists its links, or opens the card of its one
// (O-ANATOMY's `fromTail`), at any scale, before any place under it acts;
// a continuation's mark is a teleport to its newest member
// (foundations §2.1); below the readable threshold a document is a place
// wherever the pointer falls, bars or mounted text alike — a teleport (a
// trail push) to the version its box shows (N-GO's `shownIn`; issue #154's
// design decision: a click on a place is no act on its box's version, which
// it keeps); each LEAP a click makes is made where it fell — the point of
// the plane, a run's own positions — where its reading face stands while it
// reads (N-GO); at the readable threshold and above its text takes the click:
// a symbol opens the anatomy card of the link's end it stands for, and a
// stretch links mark that of the first end marking it — each mark carries
// its ends by their links and their keys (LK's `endKey`; `endAt`), so of a
// link with two ends in one article the card is the clicked end's (B1-S5);
// the presence indicator's ⟡ asks to see the links;
// a run's hairline label goes to its source carrying the run, marked where
// the source's current text holds it (foundations §2.3's carry rule; P43);
// the scene-offer opens the scene;
// C-67's pointer beneath a withheld run's arm is a LEAP to the edition its
// claim names, the claim's home, landed in whole (B1-S7 → S6): it carries no
// passage, for an edition's bytes are fresh identity and no span of it
// resolves to the origin (PUB-3.2; RES-66), so a carried run would be found
// nowhere there and faced as a dead end where the edition stands; and it
// lights no link, the claim being a record LK never draws;
// the rest of a withheld run's placeholder conjures C-39's face, naming
// the owner the placeholder names (B1-S5, B1-S7), at the placeholder and,
// once the text layer rebuilds or takes it down, at the run's own positions
// (`runOf`; O-HOST's anchor); the version statement at a document's
// corner opens its members (the corner's act, the one Enter takes there —
// K-57); a click on a block selects it whole (R11); a click on an account at
// far is a teleport to its region (a trail push); an empty click ends a card
// or scene still reading (O-HOST's opening, ended alone: the overlay
// standing under it stands), else dismisses the overlay, else clears the
// selection.
// Carries: the wireframe's §11 (the pointer and wheel handlers) and §16's
// layer click handling, re-cut.
// Rules: FP-1, FP-2, FP-9.

import * as CAM from '../plane/camera.js';
import * as RENDER from '../plane/render.js';
import * as GO from '../nav/go.js';
import * as WALK from '../nav/walk.js';
import * as HOST from '../overlays/host.js';
import * as SEL from '../overlays/selection.js';
import * as LINKS from '../overlays/links-card.js';
import * as ANATOMY from '../overlays/anatomy-card.js';
import * as LINE from '../line/line.js';
import * as LK from '../links/links.js';
import * as SCENE from '../scene/scene.js';
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
    if (!drag) return;
    const dx = e.clientX - drag.px, dy = e.clientY - drag.py;
    drag.px = e.clientX; drag.py = e.clientY; drag.moved += Math.abs(dx) + Math.abs(dy);
    if (drag.cameraKey) { CAM.panBy(dx, dy); CAM.markDirty(); }
  });
  els.plane.addEventListener('pointerup', (e) => {
    const d = drag; drag = null; els.plane.classList.remove('dragging');
    if (!d) return;
    if (d.cameraKey && d.moved > 4) { WALK.retakeFromView(); return; }
    if (d.moved <= 4) clickPlane(e.clientX, e.clientY);
  });
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
  // the corners: a click on the version statement takes the corner's act
  els.corners.addEventListener('click', (e) => {
    const target = /** @type {HTMLElement} */ (e.target);
    LINE.act();
    const corner = /** @type {HTMLElement | null} */ (target.closest('.version') ? target.closest('[data-corner]') : null);
    if (corner) { e.stopPropagation(); VERSIONS.fromCorner(corner, SEL.selected(), false); }
  });
  window.addEventListener('wheel', (e) => {
    const t = /** @type {HTMLElement} */ (e.target);
    if (t.closest && t.closest('#overlay, #scene, #leap, #mirror, #line')) return;
    e.preventDefault();
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
 * The run an element of an article names, as its own positions in the
 * article that holds it, which T-ARTICLE sets on the element: a hairline's
 * transcluded run, the passage its gesture to the source carries
 * (foundations §2.1; §2.3's carry rule); a placeholder's withheld run, where
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
  }
  const hair = target.closest('.hairline');
  if (hair) { const h = /** @type {HTMLElement} */ (hair), run = runOf(h); if (h.dataset.src) GO.leapTo(h.dataset.src, { how: 'leap', carry: run, site: run ? { span: run } : null }); return true; }
  const offer = target.closest('.offer');
  if (offer) { const [a, b] = (/** @type {HTMLElement} */ (offer).dataset.scene || '').split('|'); if (a && b) SCENE.open(a, b); return true; }
  const pointer = target.closest('.clause[data-home]');
  if (pointer) {
    const p = /** @type {HTMLElement} */ (pointer), home = p.dataset.home, holder = /** @type {HTMLElement | null} */ (p.closest('[data-withheld]')), run = holder ? runOf(holder) : null;
    if (home) GO.leapTo(home, { how: 'leap', site: run ? { span: run } : null });
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

/** a click on the plane: a tail lists its links; a continuation's mark goes to its newest member; a place goes; an account at far goes to its region; else a card or scene still reading ends, the overlay standing under it standing, or else the overlay dismisses */
function clickPlane(/** @type {number} */ px, /** @type {number} */ py) {
  LINE.act();
  const tail = RENDER.tailAtScreen(px, py);
  if (tail) { ANATOMY.fromTail(tail, false); return; }
  const lod = lodOf(CAM.cam.scale);
  const residue = RENDER.residueAtScreen(px, py);
  /** the point of the plane the click fell on: where a teleport it makes is made */
  const site = { world: { x: CAM.wx(px), y: CAM.wy(py) } };
  if (residue) { GO.leapTo(GO.shownIn(residue.newest), { how: 'click', site }); return; }
  const doc = RENDER.docAtScreen(px, py);
  if (doc) {
    if (!LAYER.atReadingScale(doc)) { GO.leapTo(doc, { how: 'click', site }); return; }
    return; // at reading scale a press on its text is held for the text (`afterFrame`); one in a gutter acts on nothing
  }
  if (lod.name === 'far' || lod.name === 'far~mid') {
    const acct = accountAt(CAM.wx(px), CAM.wy(py), '1');
    if (acct) { GO.toAccount(acct); return; }
  }
  if (HOST.pending()) HOST.endOpening();
  else if (HOST.hasCurrent()) HOST.dismiss();
  else if (SEL.selected()) SEL.clear();
}
