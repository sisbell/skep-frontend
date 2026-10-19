// APP-INPUT — pointer, wheel, resize → view state + the pump (the structure
// record §3.2 "APP"; foundations §2.4's press rule; D5 K-10, K-12). Layer 3.
// ENGINE-BOUND. INPUT NEVER DRAWS (FP-9): a handler changes view state, or
// asks for a read, and marks the frame dirty.
// The press rule (§2.4, RE-CUT from the wireframe's drag-to-pan): a pointer's
// DRAG NEVER PANS — at the readable threshold and above it selects the text
// it crosses (the platform's selection on the mounted layer); the camera
// pans by the WHEEL and two-finger scroll, by the keys, and by the held
// camera key's drag (K-10: hold Mod); it zooms by the PINCH (Ctrl+wheel as a
// trackpad sends it) and by Mod+wheel (K-12). A CLICK acts on what is under
// the pointer, keyed on legibility: below the readable threshold a document
// is a place wherever the pointer falls — a teleport (a trail push); a
// symbol opens its card; the presence indicator's ⟡ asks to see the links;
// a run's hairline label goes to its source; the scene-offer opens the
// scene; at the readable threshold and above a click on a block is the
// selection (R11); a click on an account at far flies to it; an empty click
// dismisses the overlay. Carries: the wireframe's §11 (the pointer and
// wheel handlers) and §16's layer click handling, re-cut.
// Rules: FP-1, FP-2, FP-9.

import * as CAM from '../plane/camera.js';
import * as RENDER from '../plane/render.js';
import * as GO from '../nav/go.js';
import * as WALK from '../nav/walk.js';
import * as HOST from '../overlays/host.js';
import * as SEL from '../overlays/selection.js';
import * as LINKS from '../overlays/links-card.js';
import * as LEAP from '../nav/leap.js';
import * as LINE from '../line/line.js';
import * as LK from '../links/links.js';
import * as SCENE from '../scene/scene.js';
import * as REC from '../model/records.js';
import * as FACES from '../overlays/faces.js';
import { lodOf, LOD_TXT_LO } from '../plane/lod.js';
import { accountAt, accountCell, docBox } from '../plane/projection.js';
import { metricsFor } from '../plane/layout.js';
import { MAC } from '../nav/keys.js';

/**
 * Wire the pointer and the wheel.
 * @param {{plane: HTMLCanvasElement, layer: HTMLElement}} els
 */
export function attach(els) {
  /** @type {{px: number, py: number, moved: number, cameraKey: boolean} | null} */
  let drag = null;
  els.plane.addEventListener('pointerdown', (e) => {
    drag = { px: e.clientX, py: e.clientY, moved: 0, cameraKey: MAC ? e.metaKey : e.ctrlKey };
    if (drag.cameraKey) { els.plane.setPointerCapture(e.pointerId); els.plane.classList.add('dragging'); }
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
  // the layer: a click on a block, a symbol, the ⟡, a hairline, the scene-offer, the corner
  els.layer.addEventListener('click', (e) => {
    const target = /** @type {HTMLElement} */ (e.target);
    LINE.act();
    const sym = target.closest('.sym');
    if (sym) {
      e.stopPropagation();
      const se = /** @type {HTMLElement} */ (sym);
      if (se.dataset.reveal) { LINKS.show(se.dataset.reveal); return; }
      if (se.dataset.link) { const art = se.closest('article'); const addr = art ? /** @type {HTMLElement} */ (art).dataset.addr || '' : ''; const s = LK.shown(addr).find((x) => x.link.addr === se.dataset.link); if (s) import('../overlays/anatomy-card.js').then((A) => A.open(s, se)); return; }
    }
    const hair = target.closest('.hairline');
    if (hair) { e.stopPropagation(); const src = /** @type {HTMLElement} */ (hair).dataset.src; if (src) GO.leapTo(src, { how: 'leap' }); return; }
    const offer = target.closest('.offer');
    if (offer) { e.stopPropagation(); const [a, b] = (/** @type {HTMLElement} */ (offer).dataset.scene || '').split('|'); if (a && b) SCENE.open(a, b); return; }
    const marked = target.closest('.lip');
    if (marked) { e.stopPropagation(); const art = marked.closest('article'); const addr = art ? /** @type {HTMLElement} */ (art).dataset.addr || '' : ''; const first = (/** @type {HTMLElement} */ (marked).dataset.links || '').split(' ')[0]; const s = LK.shown(addr).find((x) => x.link.addr === first); if (s) { import('../overlays/anatomy-card.js').then((A) => A.open(s, /** @type {HTMLElement} */ (marked))); return; } }
    const version = target.closest('.version');
    if (version) { e.stopPropagation(); const corner = version.closest('.corner'); const addr = corner ? /** @type {HTMLElement} */ (corner).dataset.corner || '' : ''; import('../overlays/versions.js').then((V) => V.open(addr, SEL.selected()?.pos ?? null, /** @type {HTMLElement} */ (version))); return; }
    const wh = target.closest('[data-withheld]');
    if (wh) { e.stopPropagation(); const w = /** @type {HTMLElement} */ (wh); const origin = w.dataset.origin || ''; FACES.c39(REC.doc(origin).account || REC.doc(origin).meta?.owner || '⟨owner⟩', w); return; }
    const sp = target.closest('.sp');
    if (sp) {
      e.stopPropagation();
      const s = /** @type {HTMLElement} */ (sp);
      const selText = window.getSelection();
      if (selText && !selText.isCollapsed && selText.toString().length > 1) return; // a drag selected text: the platform's selection stands
      SEL.select(s.dataset.addr || '', Number(s.dataset.pos));
    }
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

/** a click on the plane: a place goes; an account at far flies; else the overlay dismisses */
function clickPlane(/** @type {number} */ px, /** @type {number} */ py) {
  LINE.act();
  const lod = lodOf(CAM.cam.scale);
  const doc = RENDER.docAtScreen(px, py);
  if (doc) {
    const box = docBox(doc);
    const em = metricsFor(REC.doc(doc).extent || 1, box).fs * CAM.cam.scale;
    if (em < LOD_TXT_LO) { GO.leapTo(doc, { how: 'click' }); return; }
    return; // at reading scale the layer's elements take the click
  }
  const residue = RENDER.residueAtScreen(px, py);
  if (residue) { LEAP.open(residue + '.0.'); return; }
  if (lod.name === 'far' || lod.name === 'far~mid') {
    const acct = accountAt(CAM.wx(px), CAM.wy(py), '1');
    if (acct) { GO.flyToCell(accountCell(acct)).then(() => WALK.focusTo(acct, null)); return; }
  }
  if (HOST.hasCurrent()) HOST.dismiss();
  else if (SEL.selected()) SEL.clear();
}
