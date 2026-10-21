// N-GO — a TELEPORT (the structure record §3.2 "N-GO"; S-7 (a)). Layer 2.
// ENGINE-BOUND only through O-HOST; its arithmetic pure. State: VIEW — the
// arrival's two marks and the count of the navigation acts made — THE ONE
// OWNER of them (FP-10). It orchestrates the owners: end a card or scene
// still reading as the act is made, which then opens nothing (O-HOST's
// opening), and dismiss the overlay and the scene — a follow at its landing,
// for a follow that lands nowhere is faced at its site, every other act as
// it is made — fly the camera (P-CAM), push the trail (N-TRAIL) with the
// departed view re-taken, move the focus to the landing (N-WALK) — the ring
// drawn at it where a key made the act, which only the act's caller knows, so
// each teleport takes `byKey` from it (D5 §4 rules 2 and 8) — re-project the
// passage carried: a LEAP that moves from a passage to another arrangement of
// the same material — a transcluded run's source, a document holding it, a
// member from the versions list — carries it (foundations §2.3's carry rule;
// P43), and once the landing's text is read, and never before, `compare`s it
// against that text whole, lands at its `counterpart` there (SC's rule, the
// scene's own) and marks every stretch of it that text holds
// (`counterparts`: "what of it the landing's text holds marked there") as an
// arrival by follow marks its span; where the text holds none of it, it
// lands at THE DOCUMENT'S HEAD (`headOf`: its first block) with the dead
// end's face, "its passage is not in ⟨D⟩'s current text" — at a member "…
// not in version ⟨k⟩" — and where the board declines the read it lands as a
// LEAP lands, unmarked. `follow` reports the link followed to LK's visited
// set (S-32 (a)) and lands at the span the slot projects to NOW (A-53 — the
// document consulted before the link): every run the far document's text
// holds it in, a passage a later edit cut in two among them, the landing at
// the first in the text, whose first position and positions its trail entry
// carries — with THE ARRIVAL's two marks (foundations §3.2: "the span the
// link names marked, and the link followed lit"; §2.1's register: "an
// outline around its span with the followed link drawn heavier"): every run
// of that span outlined (`arrivalMark`) and the link lit (`litLink`, which LK
// reads to draw it heavier). A FLOATING END, one the slot projects to nothing
// in the far document's text (A-37's "spans, possibly empty"), lands at that
// document's head with the dead end's face, the link lit and nothing
// outlined, for the text holds none of the span (foundations §2.3: "follow
// lands at the document's head with that face … never a landing that reads
// as the passage gone"). The follow's entry holds the link, and Back
// from that entry lights it at the entry Back lands on, the follow's
// departure — the link alone, no span outlined (§2.2: "an entry a follow
// departed holds the link followed too, which Back lights there"); Back
// from an entry no follow reached, a carried landing's among them, lights
// nothing, and so do Forward and a jump. Every act puts both marks out as it
// is made (`nextAct`; §3.2: "both gone at the next act — a pan or a zoom
// none (§3.1)"); a camera move makes no act here and leaves them lit.
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
// act lands: each act counts itself as it is made, the arrival's marks put
// out with the count (`nextAct`) — Back, Forward and a jump where they move
// the cursor, a follow even where it faces at once — and a landing that
// waited on a read lands only where no act was made after its own. A LEAP
// and a follow push their entry as N-TRAIL's claim, its landing placed by
// what they read first — a LEAP the whole of a document whose text the page
// does not hold; a follow its far document, its end's projection and its
// text — and settle it with that landing, at once where nothing is read, or
// withdraw it where the reads ended in a face in the landing's place — a
// document the board answers for with nothing, a follow's far document it
// withholds from the reader, a refusal; a dead end's face stands at its
// landing — the face shown only where no act was made after it; Back,
// Forward or a jump reaching a claim lands once it is answered — on the
// entry before it where it was withdrawn. A carried passage's `compare` is
// one more read its LEAP's claim waits on, the claim settled at the landing
// that read placed.
// Carries: the wireframe's §11 (`leapTo`, `goHome`), §18 `followLink`.
// Rules: FP-1, FP-2, FP-7, FP-9 (marks dirty, never draws), FP-10.

import * as CAM from '../plane/camera.js';
import * as TRAIL from './trail.js';
import * as WALK from './walk.js';
import * as PUMP from '../model/pump.js';
import * as REC from '../model/records.js';
import * as F from '../model/frames.js';
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
/** @typedef {import('../text/span.js').Span} Span */

/** @typedef {{pos: number, width: number}} Run one run of a marked span in the text landed in: its first position and its positions */

/**
 * @typedef {Object} Arrival — the arrival mark: the span a follow, or a LEAP carrying a passage, landed on, outlined until the next act
 * @property {string} addr the document landed in
 * @property {number} pos the landing's position: the first position of the run it stands at; where `runs` is null, the position whose block the mark stands on
 * @property {Run[] | null} runs every run of the span, in the text's order, the one at `pos` among them, each outlined — a far end's projection, or what of a carried passage the text holds; null where the link names the far document whole, the mark then on the block holding `pos` — the far article's first, where the beams and the scene anchor such an end
 * @property {string | null} link the link followed; null where the landing re-projected a carried passage
 */

/** @type {Arrival | null} */
let arrival = null;
/** @type {string | null} the link lit: the one a landing followed, or the one Back came back along */
let lit = null;
export const arrivalMark = () => arrival;
/** the link lit until the next act — drawn heavier by LK, which reads it through the reader the app wires (foundations §2.1's register); null where none is */
export const litLink = () => lit;

/** the navigation acts made, each counted as it is made: a landing lands only where no act was made after its own */
let made = 0;

/**
 * The next act, made: the arrival's two marks put out — the span outlined
 * and the link lit (foundations §3.2: "both gone at the next act") — a card
 * or scene still reading ended, what stands staying for the act to dismiss
 * (O-HOST's opening), and the act counted. Every navigation act begins with
 * it, so none counts itself and leaves the last act's marks standing, and no
 * chrome asked at the place an act leaves opens while the act reads; a
 * camera move calls nothing here (§3.2: "a pan or a zoom none").
 * @returns {number} the act's count
 */
function nextAct() { arrival = null; lit = null; HOST.endOpening(); return ++made; }

/** the chrome a navigation act clears — every act as it is made, a follow as it lands: the standing overlay, a card or scene still reading (one asked while the follow read), which then opens nothing (O-HOST's opening), and the scene, whose end moves no trail entry — so the act's own trail move is its one */
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

/** runs in the text's order, by their first positions: the wire names no order for a span set, and `compare`'s stretches stand in the carried passage's order */
const inTextOrder = (/** @type {Run[]} */ runs) => [...runs].sort((x, y) => x.pos - y.pos);
/** the positions of the run a landing stands at — the one its position begins — which its trail entry carries; null where it names no run there */
const widthAt = (/** @type {Run[] | null} */ runs, /** @type {number | null} */ pos) => { const r = runs && runs.find((x) => x.pos === pos); return r ? r.width : null; };
/** a document's head, where a dead end lands — a floating end's follow, a carried passage its text holds none of (foundations §2.3): its first block's first position, else its first position */
const headOf = (/** @type {import('../model/records.js').Doc} */ d) => (d.blocks[0] || { pos: 1 }).pos;

/**
 * The landing: the walk moved to the place, the ring drawn at it where a key
 * made the act, and the camera flown to its view.
 * @param {{addr: string, pos: number | null, view: View}} at
 * @param {boolean | undefined} byKey
 * @param {number} ms
 * @returns {Promise<boolean>} the flight landed; false where a later act's flight, a pan or a zoom cut it short (P-CAM's `fly`)
 */
async function land(at, byKey, ms) {
  WALK.focusTo(at.addr, at.pos, byKey);
  CAM.markDirty();
  const landed = await CAM.fly(at.view, ms);
  CAM.markDirty();
  return landed;
}

/**
 * Where a carried passage stands in the text a LEAP landed in, read at the
 * landing and never before it (P43): `compare`d against that text whole,
 * every stretch of it the text holds (`counterparts`), in the text's own
 * positions and order, the landing at the first of them in the passage's
 * own order — its `counterpart`; `none` where the text holds none of it;
 * null where nothing was learned — the board declined the read, or the page
 * holds no extent of the text.
 * @param {Span} c the passage carried
 * @param {import('../model/records.js').Doc} d the document landed in, read whole
 * @returns {Promise<{pos: number, runs: Run[]} | 'none' | null>}
 */
async function reproject(c, d) {
  if (d.extent == null) return null;
  if (d.extent === 0) return 'none';
  const out = await PUMP.read(F.compare([{ doc: c.addr, spans: [{ ordinal: c.pos, positions: Math.max(1, c.width) }] }], [{ doc: d.addr, spans: [{ ordinal: 1, positions: d.extent }] }]));
  if ('refused' in out) return null;
  const held = SCENE.counterparts(F.decodeCompare(out.answer), c.pos, c.width);
  return held.length ? { pos: held[0].b, runs: inTextOrder(held.map((h) => ({ pos: h.b, width: h.width }))) } : 'none';
}

/**
 * LEAP to a place: the next act — the overlays close and the trail gains the
 * entry as it is made; the focus moves to the landing, the ring drawn at it
 * where a key made the act, and the camera flies; a landing that names the
 * link it followed outlines every run of the span it landed on and lights
 * that link. A document whose text the page does not hold is read whole
 * first, its entry a claim while it reads; one the board answers for with
 * nothing faces the fifth cell and leaves the trail as it found it. A
 * carried passage is re-projected into the text read (`reproject`, the claim
 * waiting on it too): the landing is its counterpart there, and every
 * stretch of it the text holds is marked; where the text holds none of it,
 * the document's head, faced as a floating end is; where nothing was
 * learned, the place as asked. Where an act was made while it read, it lands
 * nowhere and faces nothing.
 * @param {string} addr a document address
 * @param {{pos?: number | null, runs?: Run[] | null, how?: 'click' | 'key' | 'leap' | 'follow', link?: string | null, carry?: Span | null, push?: boolean, ms?: number, byKey?: boolean}} [opts] `runs` every run of the span landed on, `pos` the first position of one of them, where the landing names a span; `carry` the passage a move to another arrangement of the same material carries (foundations §2.3's carry rule; P43), which places the landing in the place of `pos`; `how` the act, for the flight's length alone — a click on a place flies in 420 ms, every other act in 620 ms; `byKey` a key made the act
 * @returns {Promise<import('../model/records.js').Doc | null>} the document landed in; null where it faced in the place of a landing, an act made while it read took its place, or its flight was cut short before it landed
 */
export async function leapTo(addr, opts = {}) {
  const act = nextAct();
  const departed = CAM.destination();
  dismissChrome();
  let pos = opts.pos ?? null, runs = pos != null && opts.runs ? inTextOrder(opts.runs) : null;
  const link = opts.link ?? null;
  const entry = opts.push === false ? null : TRAIL.push({ addr, pos, width: widthAt(runs, pos), view: viewFor(addr, pos), link, label: labelOf(addr) }, departed, true);
  let d = REC.doc(addr);
  if (d.extent == null || d.from < 0) { const loaded = await PUMP.loadWhole(addr); if (!loaded) d = REC.doc(addr); }
  if (d.refused === 'unregistered') {
    if (entry) TRAIL.withdraw(entry);
    if (act === made) { FACES.unregistered(addr); CAM.markDirty(); }
    return null;
  }
  const held = opts.carry ? await reproject(opts.carry, d) : null;
  if (held === 'none') { pos = headOf(d); runs = null; }
  else if (held) { pos = held.pos; runs = held.runs; }
  const v = viewFor(addr, pos);
  if (entry) TRAIL.settle(entry, { view: v, pos, width: widthAt(runs, pos) });
  if (act !== made) return null;
  if (link || (held && held !== 'none')) arrival = { addr, pos: pos ?? 1, runs, link };
  lit = link;
  const flight = land({ addr, pos, view: v }, opts.byKey, opts.ms ?? (opts.how === 'click' ? 420 : 620));
  if (held === 'none') { FACES.floating(addr, { span: { addr, pos: pos ?? 1 } }, false); CAM.markDirty(); }
  return (await flight) ? d : null;
}

/**
 * FOLLOW: the far end of a drawn link — an act made as it is pressed, the
 * last act's arrival put out and a card or scene still reading ended even
 * where the link names no far document and it faces at once, the overlay it
 * was pressed from standing until its landing or its face takes that
 * overlay's place; reported to LK's visited set, its entry a claim on the
 * trail as it is made; the far document consulted, the slot projected into
 * it NOW, its text read where the page holds none; the claim settled at that
 * span and the landing made there — at its first run in the text, where the
 * text holds it in several — the arrival outlined on it — on every run's
 * positions where the link names a passage, at its first position where it
 * names the document whole — and the link lit. A floating end, one the slot
 * projects to nothing in the far document's text, settles the claim at that
 * document's head and lands there, the link lit and nothing outlined, with
 * the dead end's face standing at the head landed on (foundations §2.3). A
 * dead reference, a far document the board withholds from the reader — no
 * slot projected into it, a read the board refuses with the document — or a
 * refusal is faced in the landing's place, the claim withdrawn (B1-S8). Where
 * an act was made while it read, it lands nowhere and faces nothing.
 * @param {Shown} s the link as drawn at its near document
 * @param {{x: number, y: number} | HTMLElement | null} [anchor] where a follow that lands nowhere is faced — a dead reference, a far document withheld, a refusal, a link naming no far document
 * @param {boolean} [byKey] a key made the follow
 */
export async function follow(s, anchor = null, byKey = false) {
  const act = nextAct();
  const l = s.link;
  const far = s.far;
  if (!far) { FACES.invalidFollow(anchor); return; }
  LK.follow(l);
  const entry = TRAIL.push({ addr: far, pos: null, width: null, view: viewFor(far, null), link: l.addr, label: labelOf(far) }, CAM.destination(), true);
  /** the follow ended in a face in the landing's place: its claim withdrawn, the face shown where no act was made after it */
  const faced = (/** @type {() => void} */ face) => { TRAIL.withdraw(entry); if (act === made) { face(); CAM.markDirty(); } };
  const slot = s.end === 'from' ? 2 : 1;
  const fd = REC.doc(far);
  if (fd.refused !== 'unregistered' && fd.extent == null) await PUMP.loadWhole(far);
  if (REC.doc(far).refused === 'unregistered') { faced(() => FACES.unregistered(far, anchor)); return; }
  if (REC.doc(far).refused === 'withheld') { faced(() => FACES.withheld(far, anchor)); return; }
  const proj = await PUMP.projectEnd(l.addr, /** @type {1 | 2} */ (slot), far);
  if (proj === 'refused') {
    const r = PUMP.refusalsMet().slice(-1)[0];
    faced(() => FACES.showRefusal(anchor, r ? r.refusal : { kind: 'shell', name: 'unknown' }, far));
    return;
  }
  const d = REC.doc(far);
  if (d.extent == null || d.from < 0) await PUMP.loadWhole(far);
  if (REC.doc(far).refused === 'unregistered') { faced(() => FACES.unregistered(far)); return; }
  if (REC.doc(far).refused === 'withheld') { faced(() => FACES.withheld(far, anchor)); return; }
  const runs = proj ? inTextOrder(proj.map((p) => ({ pos: p.ordinal, width: p.positions }))) : null;
  const pos = runs ? runs[0].pos : headOf(REC.doc(far)), marked = runs && !s.farWhole ? runs : null;
  const v = viewFor(far, pos);
  TRAIL.settle(entry, { view: v, pos, width: widthAt(marked, pos) });
  if (act !== made) return;
  dismissChrome();
  if (runs) arrival = { addr: far, pos, runs: marked, link: l.addr };
  lit = l.addr;
  const flight = land({ addr: far, pos, view: v }, byKey, 620);
  if (!runs) { FACES.floating(far, { span: { addr: far, pos } }); CAM.markDirty(); }
  await flight;
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
  nextAct();
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
  nextAct();
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
  nextAct();
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
 * @param {string | null} link the link the landing lights — Back's (`back`); null for Forward and a jump
 */
async function landAtCursor(e, act, byKey, link) {
  const answer = TRAIL.pending(e);
  if (answer) await answer;
  const at = TRAIL.current();
  if (act !== made || !at) return;
  lit = link;
  await land(at, byKey, 500);
}

/**
 * Back: the cursor one entry back, landing on the view left. The entry it
 * leaves holds the link a follow took to reach it, and the entry Back lands
 * on is that follow's departure, where Back lights the link — the link
 * alone, no span outlined (foundations §2.2: "an entry a follow departed
 * holds the link followed too, which Back lights there"; §3.2). Where that
 * entry still stands as a claim, its follow reading, the reader never stood
 * there and Back lights nothing.
 * @param {boolean} [byKey] a key made the act
 */
export async function back(byKey = false) {
  const left = TRAIL.current();
  const link = left && !TRAIL.pending(left) ? left.link : null;
  const e = TRAIL.back(CAM.destination());
  if (!e) return false;
  const act = nextAct();
  dismissChrome();
  await landAtCursor(e, act, byKey, link);
  return true;
}
/**
 * Forward
 * @param {boolean} [byKey] a key made the act
 */
export async function forward(byKey = false) {
  const e = TRAIL.forward(CAM.destination());
  if (!e) return false;
  const act = nextAct();
  dismissChrome();
  await landAtCursor(e, act, byKey, null);
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
  const act = nextAct();
  dismissChrome();
  await landAtCursor(e, act, byKey, null);
  return true;
}
