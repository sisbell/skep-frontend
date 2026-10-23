// N-GO — a TELEPORT (the structure record §3.2 "N-GO"; S-7 (a)). Layer 2.
// ENGINE-BOUND only through O-HOST; its arithmetic pure. State: VIEW — the
// arrival's two marks and the count of the navigation acts made — THE ONE
// OWNER of them (FP-10). It orchestrates the owners: end a card or scene
// still reading as the act is made, which then opens nothing (O-HOST's
// opening), and dismiss the overlay and the scene — a follow at its landing,
// its reading face taking the place and the end of the overlay it was
// pressed from as it is made, every other act as it is made — fly the
// camera (P-CAM), push the trail (N-TRAIL) with the departed view re-taken,
// move the focus to the landing (N-WALK) — the ring drawn at it where a key
// made the act, which only the act's caller knows, so each teleport takes
// `byKey` from it (D5 §4 rules 2 and 8) — re-project the
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
// of that span outlined (`arrivalMark`) and the link lit (`litLinks`, which
// LK reads to draw each heavier). A FLOATING END, one the slot projects to
// nothing in the far document's text (A-37's "spans, possibly empty"), lands
// at that document's head with the dead end's face, the link lit and nothing
// outlined, for the text holds none of the span (foundations §2.3: "follow
// lands at the document's head with that face … never a landing that reads
// as the passage gone"). The follow's entry holds the link, and Back
// from that entry lights it at the entry Back lands on, the follow's
// departure — the link alone, no span outlined (§2.2: "an entry a follow
// departed holds the link followed too, which Back lights there"); Back
// from an entry no follow reached, a carried landing's among them, lights
// nothing of its own, and Forward and a jump light nothing of the entry they
// leave. Every act puts both marks out as it is made (`nextAct`; §3.2: "both
// gone at the next act — a pan or a zoom none (§3.1)"); a camera move makes
// no act here and leaves them lit.
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
// THE ORDER OF ACTS (issue #136's design decision: every jump keeps its
// trail entry, whatever its read brings, and no trail act waits on a read):
// every act makes its trail move as it is made, so the trail holds the moves
// in the order the acts were made, and only the latest act lands: each act
// counts itself as it is made, the arrival's marks put out with the count
// (`nextAct`) — Back, Forward and a jump where they move the cursor, a follow
// even where it faces at once — and a landing that waited on a read lands
// only where no act was made after its own. A LEAP and a follow push their
// entry as N-TRAIL's claim, numbered as the jump is made and never handed
// back, its landing placed by what they read first — a LEAP the whole of a
// document whose text the page does not hold; a follow its far document, its
// end's projection and its text — and while that read is out the jump says
// so at once, where it was made: its READING face (O-FACES' `reading`) — a
// follow's at the link's own bytes, a LEAP's at the site its act names, the
// LEAP box's at the viewport's corner — gone with the next act, so the reader
// sees Back leave it. The read fills the entry with what it brought (N-TRAIL's
// `settle`): a place, its landing — at once where nothing is read — or, where
// it ended in a face in the landing's place — a document the board answers
// for with nothing, a follow's far document it withholds from the reader, a
// refusal — that face as the entry's NOTICE, the entry standing at the view
// the jump left from; a dead end's face is the notice beside the head it
// landed on. The notice is shown, and the link it came from lit, only where
// no act was made after the jump: a read that ends after the reader left its
// entry moves nothing — no camera, no walk, no face — and writes its own entry
// alone. So at any board speed a jump then Back returns to where the jump was
// made — after a quick notice clearing it — and a second Back goes one entry
// further. Back, Forward or a jump reaching an entry lands at once at what it
// holds — at its view, the walk on its place: where its read brought no place
// the place the notice names (the link's bytes a follow was made at, else the
// walk's element as the LEAP was made), never the place the jump named — and
// shows its notice again, the link it came from lit beside the one Back came
// back along; reaching an entry still reading, it shows that entry's reading
// face and lands once the read answers, where no act was made meanwhile. A
// carried passage's `compare` is one more read its LEAP's claim waits on, the
// claim settled at the landing that read placed.
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
import { accountCell, boardCell } from '../plane/projection.js';

/** @typedef {import('../links/links.js').Shown} Shown */
/** @typedef {import('../model/records.js').Link} Link */
/** @typedef {import('./trail.js').Entry} Entry */
/** @typedef {import('./trail.js').Notice} Notice */
/** @typedef {import('./trail.js').Site} Site */
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
/** @type {string[]} the links lit, each once: the one a landing followed, the one Back came back along, the one the notice at the entry landed on came from */
let lit = [];
export const arrivalMark = () => arrival;
/** the links lit until the next act — drawn heavier by LK, which reads them through the reader the app wires (foundations §2.1's register); none where none is */
export const litLinks = () => lit;

/** the navigation acts made, each counted as it is made: a landing lands only where no act was made after its own */
let made = 0;

/**
 * The next act, made: the arrival's two marks put out — the span outlined
 * and the links lit (foundations §3.2: "both gone at the next act") — a card
 * or scene still reading ended, what stands staying for the act to dismiss
 * (O-HOST's opening), and the act counted. Every navigation act begins with
 * it, so none counts itself and leaves the last act's marks standing, and no
 * chrome asked at the place an act leaves opens while the act reads; a
 * camera move calls nothing here (§3.2: "a pan or a zoom none").
 * @returns {number} the act's count
 */
function nextAct() { arrival = null; lit = []; HOST.endOpening(); return ++made; }

/** the chrome a navigation act clears — every act as it is made, a follow as it lands: the standing overlay, a card or scene still reading (one asked while the follow read), which then opens nothing (O-HOST's opening), and the scene, whose end moves no trail entry — so the act's own trail move is its one */
function dismissChrome() { HOST.dismiss(); SCENE.close(); }

/** the links a landing lights, each once */
function lights(/** @type {Array<string | null>} */ links) {
  /** @type {string[]} */
  const out = [];
  for (const l of links) if (l && !out.includes(l)) out.push(l);
  return out;
}

/**
 * An entry's notice shown (O-FACES): its jump's reading face while its read
 * is out, else the face the read brought — the fifth cell, the
 * document-level withheld face, a refusal's by its name, the dead end's —
 * each at its site.
 * @param {Notice} n
 */
function showNotice(n) {
  if (n.face === 'reading') FACES.reading(n.addr, n.site);
  else if (n.face === 'unregistered') FACES.unregistered(n.addr, n.site);
  else if (n.face === 'withheld') FACES.withheld(n.addr, n.site);
  else if (n.face === 'refused' && n.refusal) FACES.showRefusal(n.site, n.refusal, n.addr);
  else if (n.face === 'floating') FACES.floating(n.addr, n.site, n.offer);
  CAM.markDirty();
}

/** the walk's element as a jump is made: where the walk stands at the jump's entry where its read brings no place — the board where the walk stands on nothing */
function walkPlace() { const f = WALK.current(); return f ? { addr: f.addr, pos: f.pos } : { addr: boardNode(), pos: null }; }

/**
 * The view that reads a document at a position: its size (T-LAYER's fold) at
 * reading size, centred on the line holding the position in its column — the
 * first column's centre where none is named (T-LAYER's `centreOf`).
 * @param {string} addr
 * @param {number | null} pos
 */
export function viewFor(addr, pos) {
  return CAM.viewAt(LAYER.centreOf(addr, pos), LAYER.foldOf(REC.doc(addr)).fs, 12.5);
}

/** the label a place's entry carries: the index's, else the record's */
function labelOf(/** @type {string} */ addr) { const p = REC.place(addr); return p ? p.label : REC.doc(addr).label; }

/** runs in the text's order, by their first positions: `compare`'s stretches stand in the carried passage's order, and a caller's runs in the order it names them (a projection's come in the text's order from M-PUMP) */
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
 * first, its entry a claim while it reads and its reading face standing at
 * `site`; one the board answers for with nothing settles the entry with the
 * fifth cell as its notice, at the view the LEAP left from, the walk's
 * element as it was made its place. A carried passage is re-projected into
 * the text read (`reproject`, the claim waiting on it too, its reading face
 * standing): the landing is its counterpart there, and every stretch of it
 * the text holds is marked; where the text holds none of it, the document's
 * head, faced as a floating end is, the face the entry's notice; where
 * nothing was learned, the place as asked. Where an act was made while it
 * read, it lands nowhere and faces nothing: its read fills its entry alone.
 * @param {string} addr a document address
 * @param {{pos?: number | null, runs?: Run[] | null, how?: 'click' | 'key' | 'leap' | 'follow', link?: string | null, carry?: Span | null, site?: Site | null, push?: boolean, ms?: number, byKey?: boolean}} [opts] `runs` every run of the span landed on, `pos` the first position of one of them, where the landing names a span; `carry` the passage a move to another arrangement of the same material carries (foundations §2.3's carry rule; P43), which places the landing in the place of `pos`; `site` where the act was made — a run's bytes, a card's span, a point of the plane — where the reading face stands while the LEAP reads and the face its read brings stands, null (the LEAP box) at the viewport's corner; `how` the act, for the flight's length alone — a click on a place flies in 420 ms, every other act in 620 ms; `byKey` a key made the act
 * @returns {Promise<import('../model/records.js').Doc | null>} the document landed in; null where it faced in the place of a landing, an act made while it read took its place, or its flight was cut short before it landed
 */
export async function leapTo(addr, opts = {}) {
  const act = nextAct();
  const departed = CAM.destination();
  const from = walkPlace();
  dismissChrome();
  let pos = opts.pos ?? null, runs = pos != null && opts.runs ? inTextOrder(opts.runs) : null;
  const link = opts.link ?? null, site = opts.site ?? null;
  let d = REC.doc(addr);
  const unread = d.extent == null || d.from < 0;
  /** @type {Notice | null} the LEAP's reading notice, where its landing waits on a read — the text unread, or the carried passage's `compare` */
  const waiting = unread || opts.carry ? { face: 'reading', addr, refusal: null, site, at: from, offer: false } : null;
  const entry = opts.push === false ? null : TRAIL.push({ addr, pos, width: widthAt(runs, pos), view: viewFor(addr, pos), link, label: labelOf(addr), notice: waiting }, departed, true);
  if (waiting) showNotice(waiting);
  if (unread) { const loaded = await PUMP.loadWhole(addr); if (!loaded) d = REC.doc(addr); }
  if (d.refused === 'unregistered') {
    /** @type {Notice} */
    const notice = { face: 'unregistered', addr, refusal: null, site, at: from, offer: false };
    if (entry) TRAIL.settle(entry, { view: departed, notice });
    if (act === made) { lit = lights([link]); showNotice(notice); }
    return null;
  }
  const held = opts.carry ? await reproject(opts.carry, d) : null;
  const head = headOf(d);
  if (held === 'none') { pos = head; runs = null; }
  else if (held) { pos = held.pos; runs = held.runs; }
  const v = viewFor(addr, pos);
  /** @type {Notice | null} a carried passage the text holds none of: the dead end's face beside the head landed on, offering no act */
  const notice = held === 'none' ? { face: 'floating', addr, refusal: null, site: { span: { addr, pos: head } }, at: null, offer: false } : null;
  if (entry) TRAIL.settle(entry, { view: v, pos, width: widthAt(runs, pos), notice });
  if (act !== made) return null;
  FACES.endReading();
  if (link || (held && held !== 'none')) arrival = { addr, pos: pos ?? 1, runs, link };
  lit = lights([link]);
  const flight = land({ addr, pos, view: v }, opts.byKey, opts.ms ?? (opts.how === 'click' ? 420 : 620));
  if (notice) showNotice(notice);
  return (await flight) ? d : null;
}

/**
 * FOLLOW: the far end of a drawn link — an act made as it is pressed, the
 * last act's arrival put out and a card or scene still reading ended even
 * where the link names no far document and it faces at once; reported to
 * LK's visited set, its entry a claim on the trail as it is made, its
 * reading face standing at the link's own bytes in the place of the overlay
 * it was pressed from, with that overlay's end (O-FACES' `reading`); the far
 * document consulted, the slot projected into it NOW, its text read where the
 * page holds none; the claim settled at that span and the landing made there
 * — at its first run in the text, where the text holds it in several — the
 * arrival outlined on it — on every run's positions where the link names a
 * passage, at its first position where it names the document whole — and the
 * link lit. A floating end, one the slot projects to nothing in the far
 * document's text, settles the claim at that document's head and lands there,
 * the link lit and nothing outlined, with the dead end's face standing at the
 * head landed on, the entry's notice (foundations §2.3). A dead reference, a
 * far document the board withholds from the reader — no slot projected into
 * it, a read the board refuses with the document — or the refusal the
 * projection itself met, whatever other read met one meanwhile, is faced in
 * the landing's place: the claim settled with that face as its notice, at
 * the view the follow left from, the link's bytes the walk's place there, and
 * the link lit (B1-S8); a link naming no far document is faced at once. Each
 * such face stands at the act's site (foundations §3.1, F-G3): the link's own
 * bytes in its near document — the link the anatomy card offering the follow
 * is conjured at, inside the selection the follow slot acts on — and follows
 * them as the camera moves. The control the follow was pressed on, the
 * anatomy card's follow or a "which" list's row, is never its site: it stands
 * in the overlay the reading face takes the place of, and is gone as that
 * face shows. Where an act was made while it read, it lands nowhere, faces
 * nothing and lights nothing: its read fills its entry alone.
 * @param {Shown} s the link as drawn at its near document
 * @param {boolean} [byKey] a key made the follow
 */
export async function follow(s, byKey = false) {
  const act = nextAct();
  const l = s.link;
  const far = s.far;
  /** @type {Site} where the follow is made — the link's own bytes: its reading face, and a face in its landing's place, stand there */
  const site = { span: { addr: s.near, pos: s.pos, width: s.width } };
  if (!far) { FACES.invalidFollow(site); return; }
  LK.follow(l);
  const departed = CAM.destination();
  /** @type {Notice} the follow's reading notice: at the link's bytes, the walk's place there where its read brings no place */
  const waiting = { face: 'reading', addr: far, refusal: null, site, at: { addr: s.near, pos: s.pos }, offer: false };
  const entry = TRAIL.push({ addr: far, pos: null, width: null, view: viewFor(far, null), link: l.addr, label: labelOf(far), notice: waiting }, departed, true);
  showNotice(waiting);
  /** the follow's read brought a face in the landing's place: its entry settled holding it, at the view the follow left from; the face shown and the link lit where no act was made after it */
  const faced = (/** @type {Notice} */ notice) => { TRAIL.settle(entry, { view: departed, notice }); if (act === made) { lit = [l.addr]; showNotice(notice); } };
  const fd = REC.doc(far);
  if (fd.refused !== 'unregistered' && fd.extent == null) await PUMP.loadWhole(far);
  if (REC.doc(far).refused === 'unregistered') { faced({ ...waiting, face: 'unregistered' }); return; }
  if (REC.doc(far).refused === 'withheld') { faced({ ...waiting, face: 'withheld' }); return; }
  const proj = await PUMP.projectEnd(l.addr, s.farSlot, far);
  if ('refused' in proj) { faced({ ...waiting, face: 'refused', refusal: proj.refused }); return; }
  const d = REC.doc(far);
  if (d.extent == null || d.from < 0) await PUMP.loadWhole(far);
  if (REC.doc(far).refused === 'unregistered') { faced({ ...waiting, face: 'unregistered' }); return; }
  if (REC.doc(far).refused === 'withheld') { faced({ ...waiting, face: 'withheld' }); return; }
  const runs = proj.runs.length ? proj.runs : null;
  const pos = runs ? runs[0].pos : headOf(REC.doc(far)), marked = runs && !s.farWhole ? runs : null;
  const v = viewFor(far, pos);
  /** @type {Notice | null} a floating end: the dead end's face beside the head landed on, offering the versions list */
  const notice = runs ? null : { face: 'floating', addr: far, refusal: null, site: { span: { addr: far, pos } }, at: null, offer: true };
  TRAIL.settle(entry, { view: v, pos, width: widthAt(marked, pos), notice });
  if (act !== made) return;
  dismissChrome();
  if (runs) arrival = { addr: far, pos, runs: marked, link: l.addr };
  lit = [l.addr];
  const flight = land({ addr: far, pos, view: v }, byKey, 620);
  if (notice) showNotice(notice);
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
  TRAIL.push({ addr: h.addr, pos: null, width: null, view: h.view, link: null, label: 'HOME', notice: null }, departed);
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
  TRAIL.push({ addr: h.addr, pos: null, width: null, view: h.view, link: null, label: 'HOME', notice: null }, null);
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
  TRAIL.push({ addr: node, pos: null, width: null, view: target, link: null, label: 'WHOLE BOARD', notice: null }, departed);
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
  TRAIL.push({ addr: acct, pos: null, width: null, view: target, link: null, label: null, notice: null }, departed);
  await land({ addr: acct, pos: null, view: target }, byKey, 400);
}

/** the node of the board the page opened on — every clean notebook is node 1 */
export function boardNode() { return '1'; }
function nodeOf(/** @type {string} */ _origin) { return '1'; }

/**
 * A cursor move's landing — Back, Forward, a jump — at what the entry the
 * move reached holds (issue #136's design decision): at its view, the walk
 * on its place — where its read brought no place, the place its notice names,
 * never the place its jump named — its notice shown again and the link its
 * notice came from lit beside the one the move lights. An entry still
 * reading shows its reading face at once and lands once its read is
 * answered; nowhere where an act was made after the move.
 * @param {Entry} e the entry the move reached
 * @param {number} act the move's count
 * @param {boolean} byKey a key made the move
 * @param {string | null} link the link the landing lights — Back's (`back`); null for Forward and a jump
 */
async function landAtCursor(e, act, byKey, link) {
  const answer = TRAIL.pending(e);
  if (answer) { if (e.notice) showNotice(e.notice); await answer; }
  const at = TRAIL.current();
  if (act !== made || !at) return;
  FACES.endReading();
  const n = at.notice;
  lit = lights([link, n ? at.link : null]);
  const flight = land(n && n.at ? { addr: n.at.addr, pos: n.at.pos, view: at.view } : at, byKey, 500);
  if (n) showNotice(n);
  await flight;
}

/**
 * Back: the cursor one entry back, landing on the view left. The entry it
 * leaves holds the link a follow took to reach it, and the entry Back lands
 * on is that follow's departure, where Back lights the link — the link
 * alone, no span outlined (foundations §2.2: "an entry a follow departed
 * holds the link followed too, which Back lights there"; §3.2). Where that
 * entry still stands as a claim, its follow reading, the reader never stood
 * there and Back lights nothing of it.
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
