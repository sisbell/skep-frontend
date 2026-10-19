// N-GO — a TELEPORT (the structure record §3.2 "N-GO"; S-7 (a)). Layer 2.
// ENGINE-BOUND only through O-HOST; its arithmetic pure. State: none — it
// orchestrates the owners: close the overlays and the scene, fly the camera
// (P-CAM), push the trail (N-TRAIL) with the departed view re-taken, move the
// focus to the landing (N-WALK), re-project the passage carried; `follow`
// reports the link followed to LK's visited set (S-32 (a)) and lands at the
// span the slot projects to NOW (A-53 — the document consulted before the
// link); HOME (the acting account's region) and WHOLE BOARD (the board at the
// clamp) push too (D5-F3); Back, Forward and a trail jump move the cursor
// and re-take the departed view.
// Carries: the wireframe's §11 (`leapTo`, `goHome`), §18 `followLink`.
// Rules: FP-1, FP-2, FP-7, FP-9 (marks dirty, never draws), FP-10.

import * as CAM from '../plane/camera.js';
import * as TRAIL from './trail.js';
import * as WALK from './walk.js';
import * as PUMP from '../model/pump.js';
import * as REC from '../model/records.js';
import * as HOST from '../overlays/host.js';
import * as LK from '../links/links.js';
import * as SCENE from '../scene/scene.js';
import * as FACES from '../overlays/faces.js';
import { docBox, accountCell, boardCell } from '../plane/projection.js';
import { metricsFor } from '../plane/layout.js';

/** @typedef {import('../links/links.js').Shown} Shown */
/** @typedef {import('../model/records.js').Link} Link */

/** the arrival mark: the span the follow landed on, lit until the next act */
/** @type {{addr: string, pos: number, link: string | null} | null} */
let arrival = null;
export const arrivalMark = () => arrival;
export function clearArrival() { arrival = null; }

/**
 * The view that reads a document at a position.
 * @param {string} addr
 * @param {number | null} pos
 */
export function viewFor(addr, pos) {
  const d = REC.doc(addr);
  const box = docBox(addr);
  const m = metricsFor(d.extent || 1, box);
  const frac = pos != null && d.extent ? 0.12 + 0.8 * ((pos - 1) / d.extent) : null;
  return CAM.viewForDoc(box, m.fs, 12.5, frac);
}

/**
 * LEAP to a place: the next act — the overlays close, the camera flies, the
 * trail gains the entry, the focus moves to the landing.
 * @param {string} addr a document address
 * @param {{pos?: number | null, how?: string, link?: string | null, push?: boolean, ms?: number}} [opts]
 * @returns {Promise<import('../model/records.js').Doc | null>}
 */
export async function leapTo(addr, opts = {}) {
  const departed = CAM.view();
  HOST.dismiss();
  if (SCENE.isOpen()) SCENE.close();
  arrival = null;
  let d = REC.doc(addr);
  if (d.extent == null || d.from < 0) { const loaded = await PUMP.loadWhole(addr); if (!loaded) d = REC.doc(addr); }
  if (d.refused === 'unregistered') { FACES.unregistered(addr); CAM.markDirty(); return null; }
  const pos = opts.pos ?? null;
  const v = viewFor(addr, pos);
  if (opts.push !== false) {
    const p = REC.place(addr);
    TRAIL.push({ addr, pos, view: v, link: opts.link ?? null, label: p ? p.label : d.label }, departed);
  }
  WALK.focusTo(addr, pos);
  if (opts.link) arrival = { addr, pos: pos ?? 1, link: opts.link };
  CAM.markDirty();
  await CAM.fly(v, opts.ms ?? (opts.how === 'click' ? 420 : 620));
  CAM.markDirty();
  return d;
}

/**
 * FOLLOW: the far end of a drawn link — reported to LK's visited set; the
 * far document consulted, the slot projected into it NOW; the landing at
 * that span, the arrival marked; a dead reference faced at the symbol.
 * @param {Shown} s the link as drawn at its near document
 * @param {{x: number, y: number} | HTMLElement | null} [anchor] where a face stands
 */
export async function follow(s, anchor = null) {
  const l = s.link;
  const far = s.far;
  if (!far) { FACES.invalidFollow(anchor); return; }
  LK.follow(l);
  const slot = s.end === 'from' ? 2 : 1;
  const fd = REC.doc(far);
  if (fd.refused !== 'unregistered' && fd.extent == null) await PUMP.loadWhole(far);
  if (REC.doc(far).refused === 'unregistered') { FACES.deadReference(l, far, anchor); CAM.markDirty(); return; }
  const proj = await PUMP.projectEnd(l.addr, /** @type {1 | 2} */ (slot), far);
  if (proj === 'refused') {
    const r = PUMP.refusalsMet().slice(-1)[0];
    if (r && r.refusal.name === 'doc_not_registered') FACES.deadReference(l, far, anchor);
    else FACES.showRefusal(anchor, r ? r.refusal : { kind: 'shell', name: 'unknown' }, far);
    CAM.markDirty();
    return;
  }
  if (!proj) { FACES.floating(l, far, anchor); CAM.markDirty(); return; }
  await leapTo(far, { pos: proj.ordinal, how: 'follow', link: l.addr });
}

/** HOME — the acting account's region at mid scale; a guest's the board's extent (R92 rider (c)) */
export async function home() {
  const s = REC.session(), b = REC.board();
  const departed = CAM.view();
  HOST.dismiss(); if (SCENE.isOpen()) SCENE.close();
  const node = b ? nodeOf(b.origin) : '1';
  const target = s && s.account ? CAM.viewForCell(accountCell(s.account), 0.85) : CAM.viewForCell(boardCell(node), 0.92);
  TRAIL.push({ addr: s && s.account ? s.account : node, pos: null, view: target, link: null, label: 'HOME' }, departed);
  WALK.focusTo(s && s.account ? s.account : node, null);
  CAM.markDirty();
  await CAM.fly(target, 700);
  CAM.markDirty();
}

/** WHOLE BOARD — the board the camera is over, at the clamp (law 13) */
export async function wholeBoard() {
  const departed = CAM.view();
  HOST.dismiss(); if (SCENE.isOpen()) SCENE.close();
  const node = boardNode();
  const target = CAM.viewForCell(boardCell(node), 0.92);
  TRAIL.push({ addr: node, pos: null, view: target, link: null, label: 'WHOLE BOARD' }, departed);
  WALK.focusTo(node, null);
  CAM.markDirty();
  await CAM.fly(target, 700);
  CAM.markDirty();
}

/** the node of the board the page opened on — every clean notebook is node 1 */
export function boardNode() { return '1'; }
function nodeOf(/** @type {string} */ _origin) { return '1'; }

/** Back: the cursor one entry back, landing on the view left */
export async function back() {
  const e = TRAIL.back(CAM.view());
  if (!e) return false;
  HOST.dismiss(); if (SCENE.isOpen()) SCENE.close();
  WALK.focusTo(e.addr, e.pos);
  arrival = e.link ? { addr: e.addr, pos: e.pos ?? 1, link: e.link } : null;
  CAM.markDirty();
  await CAM.fly(e.view, 500);
  CAM.markDirty();
  return true;
}
/** Forward */
export async function forward() {
  const e = TRAIL.forward(CAM.view());
  if (!e) return false;
  HOST.dismiss(); if (SCENE.isOpen()) SCENE.close();
  WALK.focusTo(e.addr, e.pos);
  CAM.markDirty();
  await CAM.fly(e.view, 500);
  CAM.markDirty();
  return true;
}
/** a trail jump to entry n (newest-first) — a cursor move */
export async function toTrailEntry(/** @type {number} */ n) {
  const e = TRAIL.jump(n, CAM.view());
  if (!e) return false;
  HOST.dismiss(); if (SCENE.isOpen()) SCENE.close();
  WALK.focusTo(e.addr, e.pos);
  CAM.markDirty();
  await CAM.fly(e.view, 500);
  CAM.markDirty();
  return true;
}

/** a flight to a cell (an account's region, by the walk) — a camera act, no push */
export async function flyToCell(/** @type {{x:number,y:number,w:number,h:number}} */ c, fit = 0.85, ms = 400) {
  CAM.markDirty();
  await CAM.fly(CAM.viewForCell(c, fit), ms);
  CAM.markDirty();
}
