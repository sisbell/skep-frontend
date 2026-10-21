// N-GO — a TELEPORT (the structure record §3.2 "N-GO"; S-7 (a)). Layer 2.
// ENGINE-BOUND only through O-HOST; its arithmetic pure. State: VIEW — the
// arrival mark and the count of the navigation acts made — THE ONE OWNER of
// both (FP-10). It orchestrates the owners: dismiss the overlay and the
// scene, fly the camera (P-CAM), push the trail (N-TRAIL) with the departed
// view re-taken, move the focus to the landing (N-WALK) — the ring drawn at
// it where a key made the act, which only the act's caller knows, so each
// teleport takes `byKey` from it (D5 §4 rules 2 and 8) — re-project the
// passage carried; `follow` reports the link followed to LK's visited set
// (S-32 (a)) and lands at the span the slot projects to NOW (A-53 — the
// document consulted before the link), the arrival mark on that span — its
// first position and its positions, carried on the landing's trail entry, so
// Back lights it again (foundations §3.2: "the span the link names marked");
// HOME (the acting account's region), WHOLE BOARD (the board at the clamp)
// and an account's region push too (D5-F3; foundations §2.2: LEAP, the
// keyboard's Enter and a click on a place are teleports, whatever they
// reach); the launch frame is HOME, set without a flight and pushed as the
// trail's first entry (W-01), so Back after the first teleport returns to
// it; Back, Forward and a trail jump move the cursor and re-take the departed
// view. A departure re-takes where the camera is bound (P-CAM's
// `destination`), so one made during a flight re-takes the flight's
// destination, never a point it was passing (foundations §2.3). Each act
// makes ONE trail move, its own push or cursor move: the scene standing over
// the plane is ended first, "a teleport dismissing the scene first" (§2.5),
// and its end moves no entry (SC).
// THE ORDER OF ACTS: every act makes its trail move as it is made, so the
// trail holds the moves in the order the acts were made, and only the latest
// act lands: each act counts itself as it is made — Back, Forward and a jump
// where they move the cursor — and a landing that waited on a read lands
// only where no act was made after its own. A LEAP and a follow push their
// entry as N-TRAIL's claim, its landing placed by what they read first — a
// LEAP the whole of a document whose text the page does not hold; a follow
// its far document, its end's projection and its text — and settle it with
// that landing, at once where nothing is read, or withdraw it where the
// reads ended in a face, the face shown only where no act was made after
// it; Back, Forward or a jump reaching a claim lands once it is answered —
// on the entry before it where it was withdrawn.
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
import * as LAYER from '../text/layer.js';
import { docBox, accountCell, boardCell } from '../plane/projection.js';

/** @typedef {import('../links/links.js').Shown} Shown */
/** @typedef {import('../model/records.js').Link} Link */
/** @typedef {import('./trail.js').Entry} Entry */
/** @typedef {import('./trail.js').View} View */

/**
 * @typedef {Object} Arrival — the arrival mark: the span a follow landed on, lit until the next act
 * @property {string} addr the document landed in
 * @property {number} pos the span's first position
 * @property {number | null} width its positions; null where the link names the far document whole, the mark then on the block holding `pos` — the far article's first, where the beams and the scene anchor such an end
 * @property {string} link the link followed
 */

/** @type {Arrival | null} */
let arrival = null;
export const arrivalMark = () => arrival;
export function clearArrival() { arrival = null; }

/** the navigation acts made, each counted as it is made: a landing lands only where no act was made after its own */
let made = 0;

/** the chrome a navigation act clears first: the standing overlay, and the scene, whose end moves no trail entry — so the act's own trail move is its one */
function dismissChrome() { HOST.dismiss(); SCENE.close(); }

/**
 * The view that reads a document at a position: its face (T-LAYER's) at
 * reading size.
 * @param {string} addr
 * @param {number | null} pos
 */
export function viewFor(addr, pos) {
  const d = REC.doc(addr);
  const frac = pos != null && d.extent ? 0.12 + 0.8 * ((pos - 1) / d.extent) : null;
  return CAM.viewForDoc(docBox(addr), LAYER.metricsOf(d).fs, 12.5, frac);
}

/** the label a place's entry carries: the index's, else the record's */
function labelOf(/** @type {string} */ addr) { const p = REC.place(addr); return p ? p.label : REC.doc(addr).label; }

/**
 * The landing: the walk moved to the place, the ring drawn at it where a key
 * made the act, and the camera flown to its view.
 * @param {{addr: string, pos: number | null, view: View}} at
 * @param {boolean | undefined} byKey
 * @param {number} ms
 */
async function land(at, byKey, ms) {
  WALK.focusTo(at.addr, at.pos, byKey);
  CAM.markDirty();
  await CAM.fly(at.view, ms);
  CAM.markDirty();
}

/**
 * LEAP to a place: the next act — the overlays close and the trail gains the
 * entry as it is made; the focus moves to the landing, the ring drawn at it
 * where a key made the act, and the camera flies; a landing that names the
 * link it followed lights the arrival mark on the span it landed on. A
 * document whose text the page does not hold is read whole first, its entry
 * a claim while it reads; one the board answers for with nothing faces the
 * fifth cell and leaves the trail as it found it. Where an act was made
 * while it read, it lands nowhere and faces nothing.
 * @param {string} addr a document address
 * @param {{pos?: number | null, width?: number | null, how?: 'click' | 'key' | 'leap' | 'follow', link?: string | null, push?: boolean, ms?: number, byKey?: boolean}} [opts] `width` the positions landed on from `pos`, where the landing names a span; `how` the act, for the flight's length alone — a click on a place flies in 420 ms, every other act in 620 ms; `byKey` a key made the act
 * @returns {Promise<import('../model/records.js').Doc | null>} the document landed in; null where it faced, or an act made while it read took its place
 */
export async function leapTo(addr, opts = {}) {
  const act = ++made;
  const departed = CAM.destination();
  dismissChrome();
  arrival = null;
  const pos = opts.pos ?? null;
  const width = pos != null ? opts.width ?? null : null;
  const link = opts.link ?? null;
  const entry = opts.push === false ? null : TRAIL.push({ addr, pos, width, view: viewFor(addr, pos), link, label: labelOf(addr) }, departed, true);
  let d = REC.doc(addr);
  if (d.extent == null || d.from < 0) { const loaded = await PUMP.loadWhole(addr); if (!loaded) d = REC.doc(addr); }
  if (d.refused === 'unregistered') {
    if (entry) TRAIL.withdraw(entry);
    if (act === made) { FACES.unregistered(addr); CAM.markDirty(); }
    return null;
  }
  const v = viewFor(addr, pos);
  if (entry) TRAIL.settle(entry, { view: v });
  if (act !== made) return null;
  if (link) arrival = { addr, pos: pos ?? 1, width, link };
  await land({ addr, pos, view: v }, opts.byKey, opts.ms ?? (opts.how === 'click' ? 420 : 620));
  return d;
}

/**
 * FOLLOW: the far end of a drawn link — reported to LK's visited set, its
 * entry a claim on the trail as it is made; the far document consulted, the
 * slot projected into it NOW, its text read where the page holds none; the
 * claim settled at that span and the landing made there, the arrival marked
 * on it — on its positions where the link names a passage, at its first
 * position where it names the document whole; a dead reference, a refusal or
 * a floating end faced at the symbol, the claim withdrawn. Where an act was
 * made while it read, it lands nowhere and faces nothing.
 * @param {Shown} s the link as drawn at its near document
 * @param {{x: number, y: number} | HTMLElement | null} [anchor] where a face stands
 * @param {boolean} [byKey] a key made the follow
 */
export async function follow(s, anchor = null, byKey = false) {
  const l = s.link;
  const far = s.far;
  if (!far) { FACES.invalidFollow(anchor); return; }
  LK.follow(l);
  const act = ++made;
  const entry = TRAIL.push({ addr: far, pos: null, width: null, view: viewFor(far, null), link: l.addr, label: labelOf(far) }, CAM.destination(), true);
  /** the follow ended in a face: its claim withdrawn, the face shown where no act was made after it */
  const faced = (/** @type {() => void} */ face) => { TRAIL.withdraw(entry); if (act === made) { face(); CAM.markDirty(); } };
  const slot = s.end === 'from' ? 2 : 1;
  const fd = REC.doc(far);
  if (fd.refused !== 'unregistered' && fd.extent == null) await PUMP.loadWhole(far);
  if (REC.doc(far).refused === 'unregistered') { faced(() => FACES.unregistered(far, anchor)); return; }
  const proj = await PUMP.projectEnd(l.addr, /** @type {1 | 2} */ (slot), far);
  if (proj === 'refused') {
    const r = PUMP.refusalsMet().slice(-1)[0];
    faced(() => FACES.showRefusal(anchor, r ? r.refusal : { kind: 'shell', name: 'unknown' }, far));
    return;
  }
  if (!proj) { faced(() => FACES.floating(l, far, anchor)); return; }
  const d = REC.doc(far);
  if (d.extent == null || d.from < 0) await PUMP.loadWhole(far);
  if (REC.doc(far).refused === 'unregistered') { faced(() => FACES.unregistered(far)); return; }
  const pos = proj.ordinal, width = s.farWhole ? null : proj.positions;
  const v = viewFor(far, pos);
  TRAIL.settle(entry, { view: v, pos, width });
  if (act !== made) return;
  dismissChrome();
  arrival = { addr: far, pos, width, link: l.addr };
  await land({ addr: far, pos, view: v }, byKey, 620);
}

/** HOME's place and view: the acting account's region at mid scale; a guest's the board's extent (R92 rider (c)) */
function homeFrame() {
  const s = REC.session(), b = REC.board();
  if (s && s.account) return { addr: s.account, view: CAM.viewForCell(accountCell(s.account), 0.85) };
  const node = b ? nodeOf(b.origin) : '1';
  return { addr: node, view: CAM.viewForCell(boardCell(node), 0.92) };
}

/**
 * HOME — the acting account's region at mid scale; a guest's the board's extent (R92 rider (c))
 * @param {boolean} [byKey] a key made the act
 */
export async function home(byKey = false) {
  made++;
  const departed = CAM.destination();
  dismissChrome();
  const h = homeFrame();
  TRAIL.push({ addr: h.addr, pos: null, width: null, view: h.view, link: null, label: 'HOME' }, departed);
  await land({ addr: h.addr, pos: null, view: h.view }, byKey, 700);
}

/**
 * The launch frame — HOME, foundations §2.2's last arm and the one this page
 * builds — set without a flight, and the trail's first entry (W-01), so the
 * first teleport re-takes its view as it departs and Back returns to it. The
 * landing puts the platform's focus on the walk's element with the ring out
 * (the focus record's rule 21), so the first Tab moves on from it and a
 * screen reader lands on the place the launch names.
 */
export async function launch() {
  const h = homeFrame();
  CAM.set(h.view);
  TRAIL.push({ addr: h.addr, pos: null, width: null, view: h.view, link: null, label: 'HOME' }, null);
  await WALK.focusTo(h.addr, null);
  CAM.markDirty();
}

/**
 * WHOLE BOARD — the board the camera is over, at the clamp (law 13)
 * @param {boolean} [byKey] a key made the act
 */
export async function wholeBoard(byKey = false) {
  made++;
  const departed = CAM.destination();
  dismissChrome();
  const node = boardNode();
  const target = CAM.viewForCell(boardCell(node), 0.92);
  TRAIL.push({ addr: node, pos: null, width: null, view: target, link: null, label: 'WHOLE BOARD' }, departed);
  await land({ addr: node, pos: null, view: target }, byKey, 700);
}

/**
 * An account's region at mid scale — a teleport whatever reaches it: a LEAP
 * to the account's address or its level, Enter on it, a click on it at far
 * (foundations §2.2).
 * @param {string} acct
 * @param {boolean} [byKey] a key made the act
 */
export async function toAccount(acct, byKey = false) {
  made++;
  const departed = CAM.destination();
  dismissChrome();
  const target = CAM.viewForCell(accountCell(acct), 0.85);
  TRAIL.push({ addr: acct, pos: null, width: null, view: target, link: null, label: null }, departed);
  await land({ addr: acct, pos: null, view: target }, byKey, 400);
}

/** the node of the board the page opened on — every clean notebook is node 1 */
export function boardNode() { return '1'; }
function nodeOf(/** @type {string} */ _origin) { return '1'; }

/**
 * A cursor move's landing — Back, Forward, a jump: once a claim standing at
 * the entry the move reached is answered, at the cursor's entry — the one
 * before it where it was withdrawn; nowhere where an act was made after the
 * move.
 * @param {Entry} e the entry the move reached
 * @param {number} act the move's count
 * @param {boolean} byKey a key made the move
 * @param {boolean} lights the landing lights the arrival mark its entry carries (Back's)
 */
async function landAtCursor(e, act, byKey, lights) {
  const answer = TRAIL.pending(e);
  if (answer) await answer;
  const at = TRAIL.current();
  if (act !== made || !at) return;
  if (lights) arrival = at.link ? { addr: at.addr, pos: at.pos ?? 1, width: at.width, link: at.link } : null;
  await land(at, byKey, 500);
}

/**
 * Back: the cursor one entry back, landing on the view left
 * @param {boolean} [byKey] a key made the act
 */
export async function back(byKey = false) {
  const e = TRAIL.back(CAM.destination());
  if (!e) return false;
  const act = ++made;
  dismissChrome();
  arrival = null;
  await landAtCursor(e, act, byKey, true);
  return true;
}
/**
 * Forward
 * @param {boolean} [byKey] a key made the act
 */
export async function forward(byKey = false) {
  const e = TRAIL.forward(CAM.destination());
  if (!e) return false;
  const act = ++made;
  dismissChrome();
  await landAtCursor(e, act, byKey, false);
  return true;
}
/**
 * A trail jump to entry n (newest-first) — a cursor move
 * @param {number} n
 * @param {boolean} [byKey] a key made the act
 */
export async function toTrailEntry(n, byKey = false) {
  const e = TRAIL.jump(n, CAM.destination());
  if (!e) return false;
  const act = ++made;
  dismissChrome();
  await landAtCursor(e, act, byKey, false);
  return true;
}
