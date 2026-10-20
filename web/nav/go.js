// N-GO — a TELEPORT (the structure record §3.2 "N-GO"; S-7 (a)). Layer 2.
// ENGINE-BOUND only through O-HOST; its arithmetic pure. State: none — it
// orchestrates the owners: dismiss the overlay and the scene, fly the camera
// (P-CAM), push the trail (N-TRAIL) with the departed view re-taken, move the
// focus to the landing (N-WALK), re-project the passage carried; `follow`
// reports the link followed to LK's visited set (S-32 (a)) and lands at the
// span the slot projects to NOW (A-53 — the document consulted before the
// link); HOME (the acting account's region), WHOLE BOARD (the board at the
// clamp) and an account's region push too (D5-F3; foundations §2.2: LEAP,
// the keyboard's Enter and a click on a place are teleports, whatever they
// reach); the launch frame is HOME, set without a flight and pushed as the
// trail's first entry (W-01), so Back after the first teleport returns to
// it; Back, Forward and a trail jump move the cursor and re-take the
// departed view. Each act makes ONE trail move, its own push or cursor move:
// the scene standing over the plane is ended first, "a teleport dismissing
// the scene first" (§2.5), and its end moves no entry (SC).
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

/** the chrome a navigation act clears first: the standing overlay, and the scene, whose end moves no trail entry — so the act's own trail move is its one */
function dismissChrome() { HOST.dismiss(); SCENE.close(); }

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
  dismissChrome();
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
  if (REC.doc(far).refused === 'unregistered') { FACES.unregistered(far, anchor); CAM.markDirty(); return; }
  const proj = await PUMP.projectEnd(l.addr, /** @type {1 | 2} */ (slot), far);
  if (proj === 'refused') {
    const r = PUMP.refusalsMet().slice(-1)[0];
    FACES.showRefusal(anchor, r ? r.refusal : { kind: 'shell', name: 'unknown' }, far);
    CAM.markDirty();
    return;
  }
  if (!proj) { FACES.floating(l, far, anchor); CAM.markDirty(); return; }
  await leapTo(far, { pos: proj.ordinal, how: 'follow', link: l.addr });
}

/** HOME's place and view: the acting account's region at mid scale; a guest's the board's extent (R92 rider (c)) */
function homeFrame() {
  const s = REC.session(), b = REC.board();
  if (s && s.account) return { addr: s.account, view: CAM.viewForCell(accountCell(s.account), 0.85) };
  const node = b ? nodeOf(b.origin) : '1';
  return { addr: node, view: CAM.viewForCell(boardCell(node), 0.92) };
}

/** HOME — the acting account's region at mid scale; a guest's the board's extent (R92 rider (c)) */
export async function home() {
  const departed = CAM.view();
  dismissChrome();
  const h = homeFrame();
  TRAIL.push({ addr: h.addr, pos: null, view: h.view, link: null, label: 'HOME' }, departed);
  WALK.focusTo(h.addr, null);
  CAM.markDirty();
  await CAM.fly(h.view, 700);
  CAM.markDirty();
}

/**
 * The launch frame — HOME, foundations §2.2's last arm and the one this page
 * builds — set without a flight, and the trail's first entry (W-01), so the
 * first teleport re-takes its view as it departs and Back returns to it.
 */
export async function launch() {
  const h = homeFrame();
  CAM.set(h.view);
  TRAIL.push({ addr: h.addr, pos: null, view: h.view, link: null, label: 'HOME' }, null);
  await WALK.focusTo(h.addr, null);
  CAM.markDirty();
}

/** WHOLE BOARD — the board the camera is over, at the clamp (law 13) */
export async function wholeBoard() {
  const departed = CAM.view();
  dismissChrome();
  const node = boardNode();
  const target = CAM.viewForCell(boardCell(node), 0.92);
  TRAIL.push({ addr: node, pos: null, view: target, link: null, label: 'WHOLE BOARD' }, departed);
  WALK.focusTo(node, null);
  CAM.markDirty();
  await CAM.fly(target, 700);
  CAM.markDirty();
}

/**
 * An account's region at mid scale — a teleport whatever reaches it: a LEAP
 * to the account's address or its level, Enter on it, a click on it at far
 * (foundations §2.2).
 * @param {string} acct
 */
export async function toAccount(acct) {
  const departed = CAM.view();
  dismissChrome();
  const target = CAM.viewForCell(accountCell(acct), 0.85);
  TRAIL.push({ addr: acct, pos: null, view: target, link: null, label: null }, departed);
  WALK.focusTo(acct, null);
  CAM.markDirty();
  await CAM.fly(target, 400);
  CAM.markDirty();
}

/** the node of the board the page opened on — every clean notebook is node 1 */
export function boardNode() { return '1'; }
function nodeOf(/** @type {string} */ _origin) { return '1'; }

/** Back: the cursor one entry back, landing on the view left */
export async function back() {
  const e = TRAIL.back(CAM.view());
  if (!e) return false;
  dismissChrome();
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
  dismissChrome();
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
  dismissChrome();
  WALK.focusTo(e.addr, e.pos);
  CAM.markDirty();
  await CAM.fly(e.view, 500);
  CAM.markDirty();
  return true;
}
