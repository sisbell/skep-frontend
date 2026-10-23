// N-GO — a TELEPORT (the structure record §3.2 "N-GO"; S-7 (a)). Layer 2.
// ENGINE-BOUND only through O-HOST; its arithmetic pure. State: VIEW — the
// arrival's two marks, what a landing says of the passage it carried or
// followed (`landing`), the light a one-step move along the trail made, the
// version each document's box shows, and the count of the navigation acts
// made — THE ONE OWNER of them (FP-10).
// THE BOX'S VERSION (issue #154's design decision: "One box per document …
// The box shows one version"): every version of a document shares its box
// (P-PROJ's `docBox`), and the box shows ONE of them — its plain address,
// the trunk head, or a version pinned there (`shownIn`) — which T-LAYER
// mounts, P-RENDER draws, N-WALK walks, the one line names, LK places a far
// end in and M-PUMP reads, each through the reader the app hands it. Only an
// act aimed at the box changes it (`pinTo`): a version move, or arriving by
// an address — a LEAP's landing at the address it names, a follow's at the
// address its link names, a cursor move's at its entry's — never a pan, a
// zoom, the scene, HOME, WHOLE BOARD, or a click on a place, which goes to
// what the box shows; and a newer version's ARRIVAL never changes what a box
// shows (`arrived`): one read at its plain address keeps the member being
// read, pinned there, its text never swapped under the reader (foundations
// §3.2), the trail's entry re-taking that version as it is departed
// (N-TRAIL's `retakePlace`). The choice lasts for the session and is never
// written (FP-7). A VERSION MOVE NEVER FLIES (`toVersion`): the camera stays
// and only the text is replaced — the reader's held passage, the selection
// or the first passage in view, matched into the version moved to by
// `compare` (`heldIn`) and keeping its screen line there (T-LAYER's
// `holdAcross`, P-CAM's re-anchor; FP-8), whatever of it survives marked by
// THE FOUR STATES' rule below; where that version lacks it, the nearest
// passage the two share keeps the line instead (SC's `nearest`), else the
// version's head, the box saying the passage is not in this version; a
// selection standing in the version left ends with its text; each move a
// trail entry, recording the passage carried, and Back restoring the earlier
// version and its view. The moves between versions are the versions list's
// read acts and a landing's line's version offer; a LEAP to a version's
// address arrives by that address, as any LEAP does. It
// orchestrates the owners: end a card or scene
// still reading as the act is made, which then opens nothing (O-HOST's
// opening), and dismiss the overlay and the scene — a follow at its landing,
// its reading face taking the place and the end of the overlay it was
// pressed from as it is made, every other act as it is made — fly the
// camera (P-CAM), push the trail (N-TRAIL) with the departed view re-taken,
// move the focus to the landing (N-WALK) — the ring drawn at it where a key
// made the act, which only the act's caller knows, so each teleport takes
// `byKey` from it (D5 §4 rules 2 and 8) — re-project the
// passage carried: a LEAP that moves from a passage to another arrangement of
// the same material — a transcluded run's source, a document holding it —
// carries it, as a version move does (foundations §2.3's carry rule;
// P43), and once the landing's text is read, and never before, `compare`s it
// against that text whole — in parts where the board refuses the read for
// its size (M-PUMP's `compareParts`) — lands at its `counterpart` there (SC's
// rule, the scene's own) and marks every stretch of it that text holds
// (`counterparts`: "what of it the landing's text holds marked there") as an
// arrival by follow marks its span; where the text holds none of it, it
// lands at THE DOCUMENT'S HEAD (`headOf`: its first block) with the dead
// end's face, "its passage is not in ⟨D⟩'s current text" — at a member "…
// not in version ⟨k⟩" — a version move at the nearest passage the two
// versions share (see above). `follow` reports the link followed to LK's visited
// set (S-32 (a)) and lands at the span the slot projects to NOW (A-53 — the
// document consulted before the link) — placed through the far text's image,
// read in parts, where the board refuses the projection for its size: every
// run the far document's text holds it in, a passage a later edit cut in two
// among them, the landing at the first in the text, whose first position and
// positions its trail entry carries — with THE ARRIVAL's two marks
// (foundations §3.2: "the span the link names marked, and the link followed
// lit"; §2.1's register: "an outline around its span with the followed link
// drawn heavier"): every run of that span outlined (`arrivalMark`) and the
// link lit (`litLinks`, which LK reads to draw each heavier). A FLOATING END,
// one the slot projects to nothing in the far document's text (A-37's
// "spans, possibly empty"), lands at that document's head with the dead
// end's face, the link lit and nothing outlined, for the text holds none of
// the span (foundations §2.3: "follow lands at the document's head with that
// face … never a landing that reads as the passage gone"); a projection
// refused for what it says of the far document — withheld, or nothing the
// board will say of it — faces in the landing's place (see below). THE FOUR
// STATES (issue #153's design decision: "an outline alone means 'all of it,
// here, in one piece'; silence means 'nothing was carried'"): every landing
// that carried or followed a passage reads what the text landed in holds of
// it by BM-HELD's one rule — a carry's stretches in the passage's own
// positions, a follow's runs by the identity of their bytes against the span
// the slot stores — ALL of it in one piece, the outline alone; PART, or ALL
// IN PIECES, the outline kept and A LINE beside it (`landing`, O-LAND's line,
// BM-HELD's words) naming the passage by what it was to the reader — "what
// you selected", "the text you were reading", a link's "its passage" — and
// the text, with the places it stands in, and where the text shows withheld
// text that the rest may be under it, offering the scene with where the
// passage came from where that text holds it whole, and at a published
// landing the latest member holding it whole once its reads find it — a
// version move, landing in place; NONE,
// the dead end's face, as above; and COULDN'T TELL, where no answer told — a
// read refused even in parts, by any name that says nothing of the document,
// or a text the page could not read — the landing made unmarked at the
// place as asked (a follow's, the far document's head, or its first run
// where its bytes could not be read), its line saying it could not tell and
// why, keyed on the refusal, and offering "try again" where a retry may tell,
// which reads again and lands from the answer, re-settling its entry, with
// no trail move of its own. The line leaves with the outline at the next act;
// the walk's element, where the focus lands, takes the line as its
// description, and the dead end's words where the text holds none of it
// (`described`, N-WALK's), so the mirror says all four; and the dead end's
// face at its landing is told there, never by the status region as well.
// THE STEP'S LIGHT (issue #152's design decision):
// the entry a follow or a carrying LEAP departs records the step (N-TRAIL's
// `Step`) — the link followed, the end it was made at and its far end; the
// passage carried — each passage by identity, the permanent addresses of its
// bytes as the act is made (M-REC's `identityOf`; a link's stored spans),
// never its positions; and every ONE-STEP MOVE along the trail — Back,
// Forward, a jump to the adjacent entry, by any control — lights the step it
// crosses at the end it lands on, with the arrival's own marks and lifetime:
// Back where the step began — the link followed, lit, or the passage
// carried, outlined — with no off-screen indicator, for it was in view as the
// step was taken, the walk returned to it where the view Back lands at shows
// it at its document's reading scale, and the mirror marking it for
// assistive technology while it stands (`backLight`); Forward what the step
// marked on arrival — the passage carried, outlined in the text landed in,
// or the far end followed, outlined, its link lit; a jump across two entries
// or more nothing. Back relights no arrival, carried or followed, and no
// notice's link: one move, one mark. A light's passage is placed in its text
// again at every read (`arrivalMark`; M-REC's `placedIdentity`), whatever
// part of it the text still holds lit, and none where it holds none, with no
// face. Every act puts both marks out as it is made (`nextAct`; §3.2: "both
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
// destination, never a point it was passing (foundations §2.3), and the
// version the departed entry's box shows (`departure`). Each act
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
// projection refused for saying either — that face as the entry's NOTICE, the entry standing at the view
// the jump left from; a dead end's face is the notice beside the head it
// landed on. The notice is shown, and the link it came from lit, only where
// no act was made after the jump: a read that ends after the reader left its
// entry moves nothing — no camera, no walk, no face — and writes its own entry
// alone. So at any board speed a jump then Back returns to where the jump was
// made — after a quick notice clearing it — and a second Back goes one entry
// further. Back, Forward or a jump reaching an entry lands at once at what it
// holds — at its view, the walk where Back returns it, else on its place:
// where its read brought no place the place the notice names (the link's
// bytes a follow was made at, else the walk's element as the LEAP was made),
// never the place the jump named; on that place's span only where the view
// reads its document at its reading scale, else on the document whole, so a
// view re-taken below it leaves the walk the grain the view gives (T-LAYER's
// one test; issue #140) — and shows its notice again; reaching an entry
// still reading, it shows that entry's reading face and lands once the read
// answers, where no act was made meanwhile. A
// carried passage's `compare` is one more read its LEAP's claim waits on, the
// claim settled at the landing that read placed.
// Carries: the wireframe's §11 (`leapTo`, `goHome`), §18 `followLink`.
// Rules: FP-1, FP-2, FP-7, FP-9 (marks dirty, never draws), FP-10, FP-21,
// FP-22 (owns the version each box shows).

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
import * as HELD from '../beams/held.js';
import * as SEL from '../overlays/selection.js';
import { accountCell, boardCell } from '../plane/projection.js';
import { documentOf, memberOf, versionAddress, kindOf, isTrunkMember } from '../model/address.js';

/** @typedef {import('../links/links.js').Shown} Shown */
/** @typedef {import('../model/records.js').Link} Link */
/** @typedef {import('../model/records.js').Doc} Doc */
/** @typedef {import('./trail.js').Entry} Entry */
/** @typedef {import('./trail.js').Notice} Notice */
/** @typedef {import('./trail.js').Site} Site */
/** @typedef {import('./trail.js').View} View */
/** @typedef {import('./trail.js').Step} Step */
/** @typedef {import('./walk.js').End} End */
/** @typedef {import('./walk.js').Located} Located */
/** @typedef {import('./walk.js').Described} Described */
/** @typedef {import('../model/records.js').ISpan} ISpan */
/** @typedef {import('../text/span.js').Span} Span */
/** @typedef {import('../beams/held.js').Said} Said */
/** @typedef {import('../beams/held.js').Held} Held */
/** @typedef {import('../bridge/shapes').Refusal} Refusal */

/** @typedef {{pos: number, width: number}} Run one run of a marked span in the text landed in: its first position and its positions */

/**
 * @typedef {Object} Carry — a passage a LEAP carries (foundations §2.3's carry rule; P43): a span of the text it is carried from, and what it was to the reader, which the landing's line names it by (issue #153's design decision)
 * @property {string} addr the document it is carried from
 * @property {number} pos its first position there
 * @property {number} width its positions
 * @property {boolean} [selected] it is the reader's selection — "what you selected"; else "the text you were reading"
 */

/**
 * @typedef {Object} Landing — what a landing says of the passage it carried or followed (issue #153's design decision: "Mark what's held and say the rest in a line"), until the next act
 * @property {string} addr the document landed in
 * @property {number} pos where it stands: the first held piece of the passage, or the landing point — the place as asked, or the document's head
 * @property {Said | null} said its line: the text holds part of the passage, all of it in pieces, or no answer told; null where it holds all of it in one piece, which the outline alone says, or none of it
 * @property {boolean} floating the text holds none of the passage: the dead end's face says so
 * @property {{a: string, b: string, held: import('../scene/scene.js').Held} | null} beside the line's offer to read the passage side by side with where it came from, where that text holds it whole
 * @property {number | null} version the line's offer at a published landing: the latest member holding the passage whole, once its reads find one; null until then, or where none does
 */

/**
 * @typedef {Object} Arrival — the arrival mark: the span a follow, or a LEAP carrying a passage, landed on — or the passage a one-step move's light outlines, as its text holds it now — outlined until the next act
 * @property {string} addr the document landed in, or the one the light stands in
 * @property {number} pos the landing's position: the first position of the run it stands at; where `runs` is null, the position whose block the mark stands on
 * @property {Run[] | null} runs every run of the span, in the text's order, the one at `pos` among them, each outlined — a far end's projection, or what of a carried passage the text holds; null where the link names the far document whole, the mark then on the block holding `pos` — the far article's first, where the beams and the scene anchor such an end
 * @property {string | null} link the link followed; null where the landing re-projected a carried passage, or the light outlines one
 */

/** @typedef {{addr: string, spans: ISpan[] | null}} Passage a passage by identity in the document it is drawn in: its bytes' permanent addresses; null where it names the document whole, drawn at the block at its head */

/**
 * @typedef {Object} Placing — a version move's landing a landing's line has read already (its version offer; see `toVersion`): the passage held whole in the version moved to
 * @property {number} from the position in the version the box shows whose line keeps its screen line
 * @property {number} to the position in the version moved to that takes that line
 * @property {Run[]} runs every run of the passage in the version moved to, each outlined
 * @property {ISpan[]} spans the passage by identity, which the entry departed records
 * @property {string | null} link the link the landing lights: a follow's offer's
 */

/**
 * @typedef {Object} Light — what a one-step move along the trail lights (see the head; issue #152's design decision): the step it crossed, at the end it landed on, with the arrival's own marks until the next act
 * @property {boolean} back Back's — where the step began, the walk returned to it and the mirror marking it (`backLight`); false for Forward's — what the step marked on arrival
 * @property {string | null} link the link it lights: the one the step followed; null for a carry
 * @property {(End & {addr: string}) | null} end the link's end Back lights it at — the one the follow was made at, in its document; null for every other light
 * @property {Passage | null} passage the passage it outlines, placed in its text at every read (`arrivalMark`): the passage carried, at either end; the far end followed, Forward's; null where it outlines none
 */

/** @type {Arrival | null} the arrival a landing marked, as its reads placed it */
let arrival = null;
/** @type {Light | null} the light a one-step move made */
let light = null;
/** @type {string[]} the links lit: the one a landing followed, or the one a one-step move's light lights */
let lit = [];
/** @type {Landing | null} what the landing says of its passage */
let landed = null;
/** @type {((byKey: boolean) => Promise<void>) | null} the landing's read made again — its line's "try again", where a retry may tell */
let retry = null;
/** @type {((byKey: boolean) => void) | null} the version move the line's version offer makes */
let versionOffer = null;
/** @type {Map<string, string>} each box's version where one is pinned, by its document: a box absent shows its plain address, the trunk head (see the head) */
const pins = new Map();

/** the box an address stands in: its document's, which every version of it shares */
const boxOf = (/** @type {string} */ addr) => documentOf(addr) || addr;

/**
 * The version a document's box shows (see the head): the version pinned
 * there, else its plain address — the trunk head. What T-LAYER mounts in the
 * box, P-RENDER draws there, N-WALK walks, LK places a far end in and M-PUMP
 * reads, through the reader the app hands each.
 * @param {string} addr a document address, its plain address or any version of it
 * @returns {string}
 */
export const shownIn = (addr) => { const box = boxOf(addr); return pins.get(box) ?? box; };

/**
 * A box takes the version an act aimed at it arrives at (see the head): a
 * version address pins it there; the plain address unpins it, to the trunk
 * head. An address that names no document changes nothing.
 * @param {string} addr
 */
function pinTo(addr) {
  if (kindOf(addr) !== 'document') return;
  const box = boxOf(addr);
  if (addr === box) pins.delete(box); else pins.set(box, addr);
  CAM.markDirty();
}

/**
 * A departure (see the head): the view the camera is bound for (P-CAM's
 * `destination`), and the departed entry's place re-taken where the box it
 * names shows another version as it is left — a newer version's arrival
 * pinned it on the member being read (`arrived`; N-TRAIL's `retakePlace`).
 * Every navigation act departs through it.
 * @returns {View}
 */
function departure() {
  const e = TRAIL.current();
  if (e && kindOf(e.addr) === 'document' && shownIn(e.addr) !== e.addr) TRAIL.retakePlace(shownIn(e.addr));
  return CAM.destination();
}

/**
 * A passage as its text holds it now (issue #152's design decision:
 * "Re-project the passage when drawing"): every stretch of it the
 * document's held text places (M-REC's `placedIdentity`), in the text's
 * order, the mark at the first; a far end naming its document whole at the
 * block at the document's head; null where the text holds none of it, or
 * the page none of the text — no mark, and no face.
 * @param {Passage} p
 * @param {string | null} link
 * @returns {Arrival | null}
 */
function placedMark(p, link) {
  if (!p.spans) { const d = REC.has(p.addr) ? REC.doc(p.addr) : null; return d && d.blocks.length ? { addr: p.addr, pos: headOf(d), runs: null, link } : null; }
  const runs = REC.placedIdentity(p.addr, p.spans);
  return runs.length ? { addr: p.addr, pos: runs[0].pos, runs, link } : null;
}

/** the arrival mark until the next act: a landing's, as its reads placed it; else a one-step move's light, its passage placed in its text as it is read (`placedMark`); null where neither stands */
export const arrivalMark = () => arrival || (light && light.passage ? placedMark(light.passage, light.link) : null);
/** the links lit until the next act — drawn heavier by LK, which reads them through the reader the app wires (foundations §2.1's register); none where none is */
export const litLinks = () => lit;

/**
 * Where Back's light stands now (issue #152's design decision: "While lit,
 * it is exposed to assistive technology"), for the mirror (N-WALK's reader,
 * the app's to hand in): the stretches of the passage carried its text holds
 * now, or the link's end the follow was made at; null where Back lit nothing
 * its text still holds, and for every other light.
 * @returns {Located | null}
 */
export function backLight() {
  if (!light || !light.back) return null;
  if (light.end) return { addr: light.end.addr, runs: [], end: { link: light.end.link, key: light.end.key } };
  const m = light.passage && placedMark(light.passage, null);
  return m && m.runs ? { addr: m.addr, runs: m.runs, end: null } : null;
}

/** the navigation acts made, each counted as it is made: a landing lands only where no act was made after its own */
let made = 0;

/**
 * The next act, made: the arrival's two marks put out — the span outlined
 * and the links lit (foundations §3.2: "both gone at the next act"), a
 * one-step move's light with them, and the landing's line, which leaves with
 * the outline (issue #153's design decision) — a card
 * or scene still reading ended, what stands staying for the act to dismiss
 * (O-HOST's opening), and the act counted. Every navigation act begins with
 * it, so none counts itself and leaves the last act's marks standing, and no
 * chrome asked at the place an act leaves opens while the act reads; a
 * camera move calls nothing here (§3.2: "a pan or a zoom none").
 * @returns {number} the act's count
 */
function nextAct() { arrival = null; light = null; lit = []; landed = null; retry = null; versionOffer = null; HOST.endOpening(); return ++made; }

/** what the landing says of the passage it carried or followed, until the next act (see the head); null where nothing landed so */
export const landing = () => landed;
/** the landing's line in words (BM-HELD's `lineOf`), for O-LAND's line; null where it has none */
export const landingLine = () => (landed && landed.said ? HELD.lineOf(landed.said) : null);
/** the acts the landing's line offers now: "try again" where a retry may tell; the version offer once its reads found one */
export const landingOffers = () => ({ again: !!retry, version: !!versionOffer });

/**
 * What the landing says, for the mirror's description of the item it stands
 * on (N-WALK's `described`; issue #153's design decision: "the line as its
 * description, so the screen-reader mirror says all four states"): its
 * line's words, or the dead end's where the text holds none of the passage;
 * null where the text holds all of it in one piece — the outline alone says
 * that — and where nothing landed so.
 * @returns {Described | null}
 */
export function described() {
  if (!landed) return null;
  const words = landed.said ? HELD.lineOf(landed.said) : landed.floating ? FACES.floatingWords(landed.addr).text : null;
  return words ? { addr: landed.addr, pos: landed.pos, words } : null;
}

/**
 * One of the landing's line's acts (O-LAND's buttons): `beside`, the reading
 * scene with where the passage came from, the passage held there set level
 * with its counterpart here (SC); `version`, the version move to the latest
 * member holding the passage whole; `again`, the landing's read made again.
 * Each acts only while the landing's line stands.
 * @param {'beside' | 'version' | 'again'} which
 * @param {boolean} [byKey] a key made the act
 */
export function landingAct(which, byKey = false) {
  if (!landed) return;
  if (which === 'beside' && landed.beside) { const b = landed.beside; void SCENE.open(b.a, b.b, b.held); }
  else if (which === 'version' && versionOffer) versionOffer(byKey);
  else if (which === 'again' && retry) void retry(byKey);
}

/** the chrome a navigation act clears — every act as it is made, a follow as it lands: the standing overlay, a card or scene still reading (one asked while the follow read), which then opens nothing (O-HOST's opening), and the scene, whose end moves no trail entry — so the act's own trail move is its one */
function dismissChrome() { HOST.dismiss(); SCENE.close(); }

/**
 * An entry's notice shown (O-FACES): its jump's reading face while its read
 * is out, else the face the read brought — the fifth cell, the
 * document-level withheld face, a refusal's by its name, the dead end's —
 * each at its site; the dead end's at the landing that met it told by that
 * landing's description, where the focus lands, never by the status region
 * as well (`told`; issue #153).
 * @param {Notice} n
 * @param {boolean} [told] the landing that met it says its words (`described`)
 */
function showNotice(n, told = false) {
  if (n.face === 'reading') FACES.reading(n.addr, n.site);
  else if (n.face === 'unregistered') FACES.unregistered(n.addr, n.site);
  else if (n.face === 'withheld') FACES.withheld(n.addr, n.site);
  else if (n.face === 'refused' && n.refusal) FACES.showRefusal(n.site, n.refusal, n.addr);
  else if (n.face === 'floating') FACES.floating(n.addr, n.site, n.offer, told);
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
 * The landing: the walk moved to the place — to the span holding its
 * position only where its view reads the document at its reading scale,
 * else to the document whole (see the head), to the link's end it names
 * where it names one — the ring drawn at it where a key made the act, and
 * the camera flown to its view. A LEAP and a follow land at reading size; a
 * cursor move lands at the view its entry was left at.
 * @param {{addr: string, pos: number | null, view: View, end?: End | null}} at
 * @param {boolean | undefined} byKey
 * @param {number} ms
 * @returns {Promise<boolean>} the flight landed; false where a later act's flight, a pan or a zoom cut it short (P-CAM's `fly`)
 */
async function land(at, byKey, ms) {
  WALK.focusTo(at.addr, at.pos != null && LAYER.atReadingScale(at.addr, at.view.scale) ? at.pos : null, byKey, true, at.end ?? null);
  CAM.markDirty();
  const landed = await CAM.fly(at.view, ms);
  CAM.markDirty();
  return landed;
}

/**
 * What a text holds of a passage (BM-HELD's rule; issue #153's design
 * decision): the passage `compare`d against the text whole, in parts where
 * the board refuses the read for its size (M-PUMP's `compareParts`), every
 * stretch of it the text holds (SC's `counterparts`) — the one rule a
 * carried passage's landing, its line's version offer and the versions
 * list's rows read; none where the text holds no position; the refusal met
 * where no answer told.
 * @param {Span} c the passage
 * @param {string} into the document whose text it is sought in
 * @param {number} extent that text's positions
 * @returns {Promise<{held: Held, counterparts: Array<{a: number, b: number, width: number}>} | {refused: Refusal}>}
 */
export async function heldIn(c, into, extent) {
  const w = Math.max(1, c.width);
  if (extent <= 0) return { held: HELD.heldOf([], w), counterparts: [] };
  const out = await PUMP.compareParts({ doc: c.addr, pos: c.pos, width: w }, { doc: into, pos: 1, width: extent });
  if ('refused' in out) return out;
  const counterparts = SCENE.counterparts(out.pairs, c.pos, w);
  return { held: HELD.heldOf(counterparts.map((h) => ({ at: h.a - c.pos, width: h.width })), w), counterparts };
}

/**
 * Where a carried passage stands in the text a LEAP landed in, read at the
 * landing and never before it (P43): what that text holds of it (`heldIn`),
 * every stretch in the text's own positions and order, the landing at the
 * first of them in the passage's own order — its `counterpart`; `none` where
 * the text holds no position of it; the refusal met where no answer told —
 * the board refused the read, even in parts, or the page could not read the
 * text (`met`, its whole read's; null where that met none).
 * @param {Span} c the passage carried
 * @param {Doc} d the document landed in, read whole
 * @param {Refusal | null} met the refusal the text's whole read met
 * @returns {Promise<{held: Held, at: number, pos: number, runs: Run[]} | 'none' | {refused: Refusal | null}>} `at` the passage's own position its counterpart `pos` holds
 */
async function reproject(c, d, met) {
  if (d.extent == null) return { refused: met };
  const out = await heldIn(c, d.addr, d.extent);
  if ('refused' in out) return out;
  if (!out.counterparts.length) return 'none';
  return { held: out.held, at: out.counterparts[0].a, pos: out.counterparts[0].b, runs: inTextOrder(out.counterparts.map((h) => ({ pos: h.b, width: h.width }))) };
}

/** does a document's held text show withheld text — a run withheld from the reader, under which the rest of a passage may stand (issue #153)? */
const showsWithheld = (/** @type {Doc} */ d) => d.blocks.some((b) => b.kind === 'withheld');
/** the dead end's face as an entry's notice, beside the head a landing stands at (foundations §2.3): offering the versions list where a follow met it */
const floatingNotice = (/** @type {string} */ addr, /** @type {number} */ head, /** @type {boolean} */ offer) => /** @type {Notice} */ ({ face: 'floating', addr, refusal: null, site: { span: { addr, pos: head } }, at: null, offer });

/**
 * A carried passage's landing, from what its reads placed (`reproject`; see
 * the head): at its counterpart, every stretch marked, the line where the
 * text holds part of it or all of it in pieces; at the document's head where
 * it holds none, the dead end's face its notice; at the place the LEAP named,
 * unmarked, with the couldn't-tell line, where no answer told.
 * @param {Carry} c
 * @param {Doc} d the document landed in
 * @param {Awaited<ReturnType<typeof reproject>>} held
 * @param {number | null} asked the position the LEAP named
 * @returns {{pos: number | null, at: number | null, runs: Run[] | null, said: Said | null, none: boolean}} `at` the passage's own position the landing holds, where it holds any
 */
function carriedLanding(c, d, held, asked) {
  const subject = c.selected ? 'selected' : 'reading';
  if (held === 'none') return { pos: headOf(d), at: null, runs: null, said: null, none: true };
  if ('held' in held) return { pos: held.pos, at: held.at, runs: held.runs, said: HELD.saidOf(held.held, subject, d.addr, showsWithheld(d)), none: false };
  return { pos: asked, at: null, runs: null, said: HELD.unknownOf(held.refused, subject, d.addr), none: false };
}

/** where a document's held text holds a passage named by identity whole, in one stretch (M-REC's `placedIdentity`); null where it does not */
function wholeAt(/** @type {string} */ addr, /** @type {ISpan[]} */ spans, /** @type {number} */ width) {
  const p = REC.placedIdentity(addr, spans);
  return p.length === 1 && p[0].width >= width ? p[0] : null;
}

/**
 * The line's offer at a published landing (issue #153's design decision: "at
 * a published landing, the latest version holding it whole"): the landing's
 * document's members, newest first — its chain probed where its count is not
 * held — each asked what its text holds of the passage (`holds`), never the
 * text landed in — its own member, or at the bare address its latest — the
 * first that holds all of it in one piece offered where no act was made
 * meanwhile; the reads stop there, and at the next act. The offer is a
 * version move (`toVersion`): the member shares the box landed in.
 * @param {number} act the landing's act
 * @param {string} addr the document landed in
 * @param {(member: string) => Promise<((byKey: boolean) => void) | null>} holds the version move to a member whose text holds all of the passage in one piece; null where it does not
 */
async function offerVersion(act, addr, holds) {
  const trunk = documentOf(addr) || addr, d = REC.doc(trunk), place = REC.place(trunk);
  if (!(d.meta ? d.meta.published : !!place && place.kind === 'edition')) return;
  let n = d.members;
  if (n == null) { const p = await PUMP.probeChain(trunk, () => act === made); if (!p) return; n = p.n; }
  const own = memberOf(addr) ?? n;
  for (let k = n; k >= 1; k--) {
    if (act !== made) return;
    if (k === own) continue;
    const go = await holds(versionAddress(trunk, k));
    if (!go) continue;
    if (act === made && landed) { landed = { ...landed, version: k }; versionOffer = go; CAM.markDirty(); }
    return;
  }
}

/**
 * The bytes of each run of a text by identity, in the text's order: through
 * the document's held image where it covers the run (M-REC's `identityOf`),
 * else as an `image` read of the run answers them, kept nowhere, in parts
 * where the board refuses it for its size (M-PUMP's `imageParts`); the
 * refusal met where a run's bytes could not be read.
 * @param {string} addr
 * @param {Run[]} runs
 * @returns {Promise<{ids: ISpan[][]} | {refused: Refusal}>}
 */
async function idsOf(addr, runs) {
  /** @type {ISpan[][]} */
  const ids = [];
  for (const r of runs) {
    const held = REC.identityOf(addr, r.pos, r.width);
    if (held.length) { ids.push(held); continue; }
    const out = await PUMP.imageParts(addr, r.pos, r.width);
    if ('refused' in out) return out;
    ids.push(out.runs.map(REC.iSpanOf));
  }
  return { ids };
}

/** the far end a follow takes by identity: its slot's stored spans (M-REC's `identityOfEnd`) — what the entry it departs records, and what its projection places */
const slotSpans = (/** @type {Shown} */ s) => (s.farSlot === 2 ? s.link.to : s.link.from).flatMap((e) => { const i = REC.identityOfEnd(e); return i ? [i] : []; });
/** does a document's held image cover its whole text? */
const imageCovers = (/** @type {Doc} */ d) => !!d.imageFor && d.extent != null && d.imageFor[0] <= 1 && d.imageFor[1] >= d.extent + 1;
/** does a projection's refusal say something of the far document — withheld from the reader, or nothing the board will say of the address — so a follow faces it in the landing's place, there being no text to land in? Every other refusal says nothing of it, and the follow lands, its line saying it could not tell (issue #153) */
const ofDocument = (/** @type {Refusal} */ r) => r.kind === 'refused' && (r.name === 'withheld' || r.name === 'doc_not_registered');

/**
 * What a follow's landing places and says (see the head): its far end's
 * passage where the slot projects into the far document's text now — placed
 * by its bytes' identity through that text's image, read in parts, where the
 * board refuses the projection for its size (M-PUMP's `imageParts`) — every
 * run marked, and the line where that text holds part of it or all of it in
 * pieces, the runs' bytes read by identity against the span the slot stores
 * (`farEnd`; BM-HELD's `piecesOf`) — or, where they cannot be read, a
 * projection of fewer positions than the passage still a part; no run where
 * it floats; the couldn't-tell line, nothing marked, where no answer told —
 * a projection refused by a name that says nothing of the document, or
 * bytes the board would not read — at the runs where they are known.
 * @param {Shown} s
 * @param {{runs: Run[]} | {refused: Refusal}} proj the projection the follow read
 * @returns {Promise<{runs: Run[] | null, marked: boolean, said: Said | null}>}
 */
async function followed(s, proj) {
  const far = s.far;
  let runs = 'runs' in proj ? proj.runs : null;
  /** @type {Refusal | null} */
  let met = 'refused' in proj ? proj.refused : null;
  if (met && PUMP.sized(met)) {
    // a text of more runs than `project` answers over: its image read in parts, the slot's bytes placed through it
    const d = REC.doc(far);
    if (d.extent != null && !imageCovers(d)) { const parts = await PUMP.imageParts(far, 1, d.extent); if ('runs' in parts) REC.takeImage(far, 1, parts.runs); else met = parts.refused; }
    if (imageCovers(REC.doc(far))) { runs = REC.placedIdentity(far, slotSpans(s)); met = null; REC.takeProjection(s.link.addr, s.farSlot, far, runs); }
  }
  if (met || !runs) return { runs: null, marked: false, said: HELD.unknownOf(met, 'followed', far) };
  if (!runs.length) return { runs, marked: false, said: null };
  const passage = !s.farWhole && s.farEnd ? REC.identityOfEnd(s.farEnd) : null;
  if (!passage) return { runs, marked: true, said: null };
  const withheld = showsWithheld(REC.doc(far));
  const ids = await idsOf(far, runs);
  if ('ids' in ids) { const { pieces, places } = HELD.piecesOf(passage, ids.ids); return { runs, marked: true, said: HELD.saidOf(HELD.heldOf(pieces, passage.width, places), 'followed', far, withheld) }; }
  if (runs.reduce((n, r) => n + r.width, 0) < passage.width) return { runs, marked: true, said: HELD.saidOf({ holds: 'part', places: runs.length }, 'followed', far, withheld) };
  return { runs, marked: false, said: HELD.unknownOf(ids.refused, 'followed', far) };
}

/**
 * A carried passage's landing's line and offers (see the head): what it
 * says; the scene with the text it came from, where that text holds the
 * passage whole; at a published landing, the latest member holding it
 * whole, sought once it has landed (`offerVersion`) — a version move whose
 * landing keeps the line of the passage's first held piece here at its
 * counterpart there; and "try again", its read made again (`again`; a LEAP's
 * by `againCarried`), where a retry may tell.
 * @param {number} act the landing's act
 * @param {Carry} c
 * @param {ISpan[]} carried the passage by identity, as the act was made
 * @param {Doc} d the document landed in
 * @param {{pos: number | null, at: number | null, said: Said | null, none: boolean}} placed
 * @param {Entry | null} entry the landing's trail entry
 * @param {string | null} link the link the landing names
 * @param {(byKey: boolean) => Promise<void>} [again] the landing's read made again; a LEAP's by default
 */
function sayCarried(act, c, carried, d, placed, entry, link, again = (byKey) => againCarried(c, carried, d.addr, entry, link, placed.pos, byKey)) {
  const addr = d.addr, said = placed.said, pos = placed.pos ?? headOf(d), w = Math.max(1, c.width);
  const offers = !!said && said.state !== 'unknown';
  const source = offers && c.addr !== addr ? (carried.length ? wholeAt(c.addr, carried, c.width) : { pos: c.pos, width: c.width }) : null;
  landed = { addr, pos, said, floating: placed.none, beside: source ? { a: c.addr, b: addr, held: { posA: source.pos, widthA: source.width, posB: null } } : null, version: null };
  retry = said && said.again ? again : null;
  versionOffer = null;
  const at = placed.at;
  if (offers && at != null) void offerVersion(act, addr, async (member) => {
    const e = await PUMP.extentOf(member);
    const h = 'extent' in e ? await heldIn(c, member, e.extent) : null;
    const whole = h && 'held' in h && h.held.holds === 'all' ? h.counterparts.find((p) => p.a <= c.pos && p.a + p.width >= c.pos + w) : null;
    if (!whole) return null;
    /** @type {Placing} the landing's line here kept at the counterpart of the passage's position it holds, the passage outlined whole there */
    const there = { from: pos, to: whole.b + (at - whole.a), runs: [{ pos: whole.b + (c.pos - whole.a), width: w }], spans: carried, link: null };
    return (byKey) => { void toVersion(member, { placed: there, byKey, site: { span: { addr, pos } } }); };
  });
}

/**
 * A carried passage's landing made again — its line's "try again" (see the
 * head): the text read whole where the page does not hold it, then what it
 * holds of the passage (`reproject`), the landing's entry settled with what
 * that placed, and, where no act was made meanwhile, the landing made from it
 * as the LEAP made it — its marks, its line, the walk and the camera — with
 * no trail move of its own.
 * @param {Carry} c
 * @param {ISpan[]} carried
 * @param {string} addr the document landed in
 * @param {Entry | null} entry
 * @param {string | null} link
 * @param {number | null} asked the position the LEAP named
 * @param {boolean} byKey a key pressed "try again"
 */
async function againCarried(c, carried, addr, entry, link, asked, byKey) {
  const act = made;
  let d = REC.doc(addr), met = null;
  if (d.extent == null || d.from < 0) { const w = await PUMP.wholeOf(addr); met = w.refused; d = REC.doc(addr); }
  const placed = carriedLanding(c, d, await reproject(c, d, met), asked);
  const v = viewFor(addr, placed.pos);
  const notice = placed.none ? floatingNotice(addr, headOf(d), false) : null;
  if (entry) TRAIL.settle(entry, { view: v, pos: placed.pos, width: widthAt(placed.runs, placed.pos), notice });
  if (act !== made) return;
  pinTo(addr);
  arrival = link || placed.runs ? { addr, pos: placed.pos ?? 1, runs: placed.runs, link } : null;
  sayCarried(act, c, carried, d, placed, entry, link);
  const flight = land({ addr, pos: placed.pos, view: v }, byKey, 620);
  if (notice) showNotice(notice, true);
  await flight;
}

/**
 * A follow's landing made from what its reads placed (`followed`; see the
 * head): its entry settled at the span — its first run in the text — or the
 * head, the dead end's face its notice where the far end floats; then, where
 * no act was made after `act`, the chrome dismissed (save where its line's
 * "try again" made it again), the arrival outlined where it marks its runs,
 * the link lit, the landing's line and offers said (`sayFollowed`), and the
 * walk and the camera moved there.
 * @param {number} act
 * @param {Shown} s
 * @param {Entry | null} entry
 * @param {Awaited<ReturnType<typeof followed>>} placed
 * @param {boolean} byKey
 * @param {boolean} [again] made again by the line's "try again", the chrome left standing
 */
async function landFollowed(act, s, entry, placed, byKey, again = false) {
  const far = s.far, l = s.link;
  const runs = placed.runs && placed.runs.length ? placed.runs : null;
  const pos = runs ? runs[0].pos : headOf(REC.doc(far)), marked = runs && placed.marked && !s.farWhole ? runs : null;
  const v = viewFor(far, pos);
  /** @type {Notice | null} a floating end: the dead end's face beside the head landed on, offering the versions list */
  const notice = placed.runs && !placed.runs.length ? floatingNotice(far, pos, true) : null;
  if (entry) TRAIL.settle(entry, { view: v, pos, width: widthAt(marked, pos), notice });
  if (act !== made) return;
  if (!again) dismissChrome();
  pinTo(far);
  arrival = runs && placed.marked ? { addr: far, pos, runs: marked, link: l.addr } : null;
  lit = [l.addr];
  sayFollowed(act, s, entry, placed, pos);
  const flight = land({ addr: far, pos, view: v }, byKey, 620);
  if (notice) showNotice(notice, true);
  await flight;
}

/**
 * A follow's landing's line and offers (see the head): what it says; the
 * scene with the document the follow was made from, where that text holds
 * the far end's passage whole; at a published far document, the latest
 * member holding it whole — its slot projected into each member and its runs'
 * bytes read, kept nowhere (M-PUMP's `projectedIn`) — offered as a version
 * move landing there as a follow does, the far end outlined and its link
 * lit, the line of its first run here kept at its first run there; and "try
 * again", the projection read again and the landing made from it, where a
 * retry may tell.
 * @param {number} act the landing's act
 * @param {Shown} s
 * @param {Entry | null} entry
 * @param {Awaited<ReturnType<typeof followed>>} placed
 * @param {number} pos where the landing stands
 */
function sayFollowed(act, s, entry, placed, pos) {
  const far = s.far, l = s.link, said = placed.said;
  const passage = !s.farWhole && s.farEnd ? REC.identityOfEnd(s.farEnd) : null;
  const offers = !!said && said.state !== 'unknown' && !!passage;
  const source = offers && passage && s.near !== far ? wholeAt(s.near, [passage], passage.width) : null;
  const first = placed.runs && placed.runs.length ? placed.runs[0].pos : null;
  landed = { addr: far, pos, said, floating: !!placed.runs && !placed.runs.length, beside: source ? { a: s.near, b: far, held: { posA: source.pos, widthA: source.width, posB: first } } : null, version: null };
  retry = said && said.again ? async (byKey) => {
    const at = made;
    const proj = await PUMP.projectEnd(l.addr, s.farSlot, far);
    if (REC.doc(far).extent == null || REC.doc(far).from < 0) await PUMP.loadWhole(far);
    await landFollowed(at, s, entry, await followed(s, proj), byKey, true);
  } : null;
  versionOffer = null;
  if (offers && passage) void offerVersion(act, far, async (member) => {
    const p = await PUMP.projectedIn(l.addr, s.farSlot, member);
    if (!('runs' in p) || !p.runs.length) return null;
    const ids = await idsOf(member, p.runs);
    if (!('ids' in ids)) return null;
    const { pieces, places } = HELD.piecesOf(passage, ids.ids);
    if (HELD.heldOf(pieces, passage.width, places).holds !== 'all') return null;
    /** @type {Placing} */
    const there = { from: pos, to: p.runs[0].pos, runs: p.runs, spans: [passage], link: l.addr };
    return (byKey) => { void toVersion(member, { placed: there, byKey, site: { span: { addr: far, pos } } }); };
  });
}

/**
 * LEAP to a place: the next act — the overlays close and the trail gains the
 * entry as it is made; the focus moves to the landing, the ring drawn at it
 * where a key made the act, and the camera flies; a landing that names the
 * link it followed outlines every run of the span it landed on and lights
 * that link — it names no end the link was followed from, so the entry it
 * departs records no step (the gate's door, its one caller). A document
 * whose text the page does not hold is read whole
 * first, its entry a claim while it reads and its reading face standing at
 * `site`; one the board answers for with nothing settles the entry with the
 * fifth cell as its notice, at the view the LEAP left from, the walk's
 * element as it was made its place. A carried passage is re-projected into
 * the text read (`reproject`, the claim waiting on it too, its reading face
 * standing): the landing is its counterpart there, and every stretch of it
 * the text holds is marked, the line saying where that is only part of it,
 * or all of it in pieces; where the text holds none of it, the document's
 * head, faced as a floating end is, the face the entry's notice; where no
 * answer told, the place as asked, unmarked, the line saying it could not
 * tell (`sayCarried`; issue #153). The entry it departs records the
 * carry (see the head), the passage by the permanent addresses of its bytes
 * as the held image names them as the act is made — none where the image
 * does not cover it, and then no step. Where an act was made while it read,
 * it lands nowhere and faces nothing: its read fills its entry alone.
 * @param {string} addr a document address
 * @param {{pos?: number | null, runs?: Run[] | null, how?: 'click' | 'key' | 'leap' | 'follow', link?: string | null, carry?: Carry | null, site?: Site | null, push?: boolean, ms?: number, byKey?: boolean}} [opts] `runs` every run of the span landed on, `pos` the first position of one of them, where the landing names a span; `carry` the passage a move to another arrangement of the same material carries (foundations §2.3's carry rule; P43), which places the landing in the place of `pos`; `site` where the act was made — a run's bytes, a card's span, a point of the plane — where the reading face stands while the LEAP reads and the face its read brings stands, null (the LEAP box) at the viewport's corner; `how` the act, for the flight's length alone — a click on a place flies in 420 ms, every other act in 620 ms; `byKey` a key made the act
 * @returns {Promise<import('../model/records.js').Doc | null>} the document landed in; null where it faced in the place of a landing, an act made while it read took its place, or its flight was cut short before it landed
 */
export async function leapTo(addr, opts = {}) {
  const act = nextAct();
  const departed = departure();
  const from = walkPlace();
  dismissChrome();
  let pos = opts.pos ?? null, runs = pos != null && opts.runs ? inTextOrder(opts.runs) : null;
  const link = opts.link ?? null, site = opts.site ?? null;
  const c = opts.carry ?? null, carried = c ? REC.identityOf(c.addr, c.pos, Math.max(1, c.width)) : [];
  /** @type {Step | null} the carry, as the entry it departs records it: the passage by identity, from the document it was carried from to this one */
  const step = c && carried.length ? { kind: 'carry', from: c.addr, to: addr, spans: carried } : null;
  let d = REC.doc(addr);
  const unread = d.extent == null || d.from < 0;
  /** @type {Notice | null} the LEAP's reading notice, where its landing waits on a read — the text unread, or the carried passage's `compare` */
  const waiting = unread || c ? { face: 'reading', addr, refusal: null, site, at: from, offer: false } : null;
  const entry = opts.push === false ? null : TRAIL.push({ addr, pos, width: widthAt(runs, pos), view: viewFor(addr, pos), label: labelOf(addr), notice: waiting }, departed, true, step);
  if (waiting) showNotice(waiting);
  /** @type {Refusal | null} the refusal the text's whole read met, which a carried passage's line says it could not tell by */
  let met = null;
  if (unread) { const w = await PUMP.wholeOf(addr); met = w.refused; d = REC.doc(addr); }
  if (d.refused === 'unregistered') {
    /** @type {Notice} */
    const notice = { face: 'unregistered', addr, refusal: null, site, at: from, offer: false };
    if (entry) TRAIL.settle(entry, { view: departed, notice });
    if (act === made) { lit = link ? [link] : []; showNotice(notice); }
    return null;
  }
  const placed = c ? carriedLanding(c, d, await reproject(c, d, met), pos) : null;
  if (placed) { pos = placed.pos; runs = placed.runs; }
  const v = viewFor(addr, pos);
  /** @type {Notice | null} a carried passage the text holds none of: the dead end's face beside the head landed on, offering no act */
  const notice = placed && placed.none ? floatingNotice(addr, headOf(d), false) : null;
  if (entry) TRAIL.settle(entry, { view: v, pos, width: widthAt(runs, pos), notice });
  if (act !== made) return null;
  FACES.endReading();
  pinTo(addr);
  if (link || (placed && placed.runs)) arrival = { addr, pos: pos ?? 1, runs, link };
  lit = link ? [link] : [];
  if (c && placed) sayCarried(act, c, carried, d, placed, entry, link);
  const flight = land({ addr, pos, view: v }, opts.byKey, opts.ms ?? (opts.how === 'click' ? 420 : 620));
  if (notice) showNotice(notice, true);
  return (await flight) ? d : null;
}

/**
 * Where a version move stands its landing, from its reads (see the head):
 * what the version moved to holds of the passage held (`reproject`) — its
 * first held stretch's line kept at its counterpart there, every stretch
 * outlined, the line where it holds part of it or all of it in pieces; where
 * it holds none of it, the passage's line taken by the counterpart of the
 * position the two versions share nearest the passage (SC's `nearest`, over
 * `compare` of the two whole, in parts where the board refuses it for its
 * size), else by the version's head where they share none, the dead end's
 * face; where no answer told, the head, unmarked, with the couldn't-tell line.
 * @param {Carry} c the passage held, in the version the box shows
 * @param {string} was the version the box shows
 * @param {Doc} d the version moved to, read whole
 * @param {Refusal | null} met the refusal its whole read met
 * @returns {Promise<{from: number, pos: number, at: number | null, runs: Run[] | null, said: Said | null, none: boolean}>} `from` the position in `was` whose line keeps its screen line; `pos` the one in `d` that takes it
 */
async function swapped(c, was, d, met) {
  const subject = c.selected ? 'selected' : 'reading', head = headOf(d);
  const held = await reproject(c, d, met);
  if (held === 'none') {
    const e = REC.doc(was).extent;
    const out = e && d.extent ? await PUMP.compareParts({ doc: was, pos: 1, width: e }, { doc: d.addr, pos: 1, width: d.extent }) : null;
    const near = out && 'pairs' in out ? SCENE.nearest(out.pairs, c.pos) : null;
    return { from: c.pos, pos: near ? near.b : head, at: null, runs: null, said: null, none: true };
  }
  if ('held' in held) return { from: held.at, pos: held.pos, at: held.at, runs: held.runs, said: HELD.saidOf(held.held, subject, d.addr, showsWithheld(d)), none: false };
  return { from: c.pos, pos: head, at: null, runs: null, said: HELD.unknownOf(held.refused, subject, d.addr), none: false };
}

/**
 * A version move's landing, in place (see the head): a selection standing in
 * the version left ended with its text (O-SELECTION's), the box's article
 * set again as the version moved to with the line `from` stood on taken by
 * `pos`'s (T-LAYER's `holdAcross`) — the camera where it stands — the box
 * taking that version, the passage outlined where the version holds it and
 * the link lit, and the walk moved to the landing, the ring drawn at it where
 * a key made the act.
 * @param {string} was the version the box showed
 * @param {Doc} d the version moved to
 * @param {{from: number, pos: number, runs: Run[] | null}} placed
 * @param {string | null} link
 * @param {boolean | undefined} byKey
 */
async function landInPlace(was, d, placed, link, byKey) {
  const addr = d.addr, sel = SEL.selected();
  if (sel && sel.addr === was && was !== addr) SEL.clear();
  LAYER.holdAcross(was, addr, { from: placed.from, to: placed.pos });
  pinTo(addr);
  arrival = placed.runs || link ? { addr, pos: placed.pos, runs: placed.runs, link } : null;
  lit = link ? [link] : [];
  CAM.markDirty();
  await WALK.focusTo(addr, LAYER.atReadingScale(addr, CAM.destination().scale) ? placed.pos : null, byKey, true);
}

/**
 * A VERSION MOVE (see the head; issue #154's design decision: "Version
 * moves land in place"): the next act — the overlays close and the trail
 * gains the entry as it is made, a claim while its reads are out, recording
 * the passage carried by identity, its reading face standing at `site` — to
 * another version of the box the reader stands in: `addr` read whole where
 * the page does not hold its text, then where its text holds the passage
 * held (`swapped`) — or where a landing's line already read it (`placed`) —
 * and, where no act was made meanwhile, the landing made IN PLACE
 * (`landInPlace`): the camera stays, the box's text replaced, the passage's
 * line kept, its four states said as a carried passage's are — the line, its
 * offers, its "try again" landing in place again — the dead end's face where
 * the version holds none of the passage, the entry's notice. A version the
 * board says nothing of is faced as a LEAP faces it. Where an act was made
 * while it read, it lands nowhere: its read fills its entry alone, at the
 * view it was made from.
 * @param {string} addr the version moved to: a version address, or the plain address, the trunk head
 * @param {{carry?: Carry | null, placed?: Placing | null, site?: Site | null, byKey?: boolean}} [opts] `carry` the reader's held passage, in the version the box shows — the selection, else the first passage in view (O-VERSIONS); `placed` the landing a landing's line has read already (its version offer); `site` where the act was made, its reading face's place; `byKey` a key made the act
 * @returns {Promise<Doc | null>} the version landed in; null where it faced in the place of a landing, or an act made while it read took its place
 */
export async function toVersion(addr, opts = {}) {
  const act = nextAct();
  const departed = departure();
  const from = walkPlace();
  dismissChrome();
  const was = shownIn(addr), site = opts.site ?? null, given = opts.placed ?? null;
  const c = opts.carry && opts.carry.addr === was ? opts.carry : null;
  const spans = given ? given.spans : c ? REC.identityOf(c.addr, c.pos, Math.max(1, c.width)) : [];
  /** @type {Step | null} the move, as the entry it departs records it: the passage carried by identity, from the version left to this one */
  const step = spans.length ? { kind: 'carry', from: was, to: addr, spans } : null;
  /** @type {Notice} */
  const waiting = { face: 'reading', addr, refusal: null, site, at: from, offer: false };
  const entry = TRAIL.push({ addr, pos: null, width: null, view: departed, label: labelOf(addr), notice: waiting }, departed, true, step);
  showNotice(waiting);
  let d = REC.doc(addr), met = null;
  if (d.extent == null || d.from < 0) { const w = await PUMP.wholeOf(addr); met = w.refused; d = REC.doc(addr); }
  if (d.refused === 'unregistered') {
    /** @type {Notice} */
    const notice = { face: 'unregistered', addr, refusal: null, site, at: from, offer: false };
    TRAIL.settle(entry, { view: departed, notice });
    if (act === made) showNotice(notice);
    return null;
  }
  const head = { from: headOf(REC.doc(was)), pos: headOf(d), at: null, runs: null, said: null, none: false };
  const placed = given ? { from: given.from, pos: given.to, at: null, runs: inTextOrder(given.runs), said: null, none: false } : c ? await swapped(c, was, d, met) : head;
  const notice = placed.none ? floatingNotice(addr, placed.pos, false) : null;
  TRAIL.settle(entry, { view: departed, pos: placed.pos, width: widthAt(placed.runs, placed.pos), notice });
  if (act !== made) return null;
  FACES.endReading();
  if (c && !given) sayCarried(act, c, spans, d, placed, entry, null, (byKey) => againVersion(c, spans, was, addr, entry, byKey));
  const landing = landInPlace(was, d, placed, given ? given.link : null, opts.byKey);
  if (notice) showNotice(notice, true);
  await landing;
  return d;
}

/**
 * A version move's landing made again — its line's "try again" (see the
 * head): the version read whole where the page does not hold its text, then
 * what it holds of the passage (`swapped`), the move's entry settled with
 * what that placed, and, where no act was made meanwhile, the landing made
 * from it in place — the line the landing stands on taken by the one the
 * answer places it on — with no trail move of its own.
 * @param {Carry} c
 * @param {ISpan[]} spans
 * @param {string} was the version the move left
 * @param {string} addr the version moved to
 * @param {Entry} entry
 * @param {boolean} byKey a key pressed "try again"
 */
async function againVersion(c, spans, was, addr, entry, byKey) {
  const act = made, stood = landed ? landed.pos : headOf(REC.doc(addr));
  let d = REC.doc(addr), met = null;
  if (d.extent == null || d.from < 0) { const w = await PUMP.wholeOf(addr); met = w.refused; d = REC.doc(addr); }
  const placed = await swapped(c, was, d, met);
  const notice = placed.none ? floatingNotice(addr, placed.pos, false) : null;
  TRAIL.settle(entry, { view: CAM.destination(), pos: placed.pos, width: widthAt(placed.runs, placed.pos), notice });
  if (act !== made) return;
  sayCarried(act, c, spans, d, placed, entry, null, (k) => againVersion(c, spans, was, addr, entry, k));
  const landing = landInPlace(addr, d, { ...placed, from: stood }, null, byKey);
  if (notice) showNotice(notice, true);
  await landing;
}

/**
 * A NEWER VERSION'S ARRIVAL (see the head; foundations §3.2: "a published
 * document read at its bare address keeps the member being read … never the
 * text swapped under the reader"): a feed row publishing `D.(k+1)`, the
 * trunk's next member and so its head, where `D`'s box shows its plain
 * address and the page holds the text it shows — `D.k`'s — pins the box on
 * `D.k`, its article set again as that member with the passage being read
 * kept in place (T-LAYER's `holdAcross`), the walk standing there with it,
 * and the box's version then named by the one line and the corner. Nothing
 * where no member held the text before it (k = 0), where the box shows a
 * pinned version already, or where the page holds none of the text. M-PUMP
 * hands it each such row before the row drops what the page held of `D`.
 * @param {string} member the member the row publishes
 */
export function arrived(member) {
  const doc = documentOf(member), k = memberOf(member);
  if (!doc || k == null || k < 2 || !isTrunkMember(member) || pins.has(doc) || !REC.has(doc) || REC.doc(doc).from < 0) return;
  const read = versionAddress(doc, k - 1);
  LAYER.holdAcross(doc, read);
  pinTo(read);
  const f = WALK.current();
  if (f && boxOf(f.addr) === doc) void WALK.focusTo(read, f.pos, false, false);
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
 * link lit, its line saying where the far text holds only part of the
 * passage, or all of it in pieces (`followed`, `landFollowed`; issue #153). A
 * floating end, one the slot projects to nothing in the far
 * document's text, settles the claim at that document's head and lands there,
 * the link lit and nothing outlined, with the dead end's face standing at the
 * head landed on, the entry's notice (foundations §2.3). A projection the
 * board refuses by a name that says nothing of the far document lands there
 * too, unmarked, the link lit, its line saying it could not tell why — the
 * projection's own refusal, whatever other read met one meanwhile — and one
 * refused for its size is placed through the far text's image read in parts.
 * A dead reference, a far document the board withholds from the reader — no
 * slot projected into it, a read the board refuses with the document, the
 * projection refused for either — is faced in
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
 * nothing and lights nothing: its read fills its entry alone. The entry it
 * departs records the follow (see the head): the link, the end it was made
 * at, and the far end by identity — its slot's stored spans.
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
  const departed = departure();
  /** @type {Notice} the follow's reading notice: at the link's bytes, the walk's place there where its read brings no place */
  const waiting = { face: 'reading', addr: far, refusal: null, site, at: { addr: s.near, pos: s.pos }, offer: false };
  /** @type {Step} the follow, as the entry it departs records it */
  const step = { kind: 'follow', link: l.addr, near: s.near, key: s.key, far, spans: s.farWhole ? null : slotSpans(s) };
  const entry = TRAIL.push({ addr: far, pos: null, width: null, view: viewFor(far, null), label: labelOf(far), notice: waiting }, departed, true, step);
  showNotice(waiting);
  /** the follow's read brought a face in the landing's place: its entry settled holding it, at the view the follow left from; the face shown and the link lit where no act was made after it */
  const faced = (/** @type {Notice} */ notice) => { TRAIL.settle(entry, { view: departed, notice }); if (act === made) { lit = [l.addr]; showNotice(notice); } };
  const fd = REC.doc(far);
  if (fd.refused !== 'unregistered' && fd.extent == null) await PUMP.loadWhole(far);
  if (REC.doc(far).refused === 'unregistered') { faced({ ...waiting, face: 'unregistered' }); return; }
  if (REC.doc(far).refused === 'withheld') { faced({ ...waiting, face: 'withheld' }); return; }
  const proj = await PUMP.projectEnd(l.addr, s.farSlot, far);
  if ('refused' in proj && ofDocument(proj.refused)) { faced({ ...waiting, face: 'refused', refusal: proj.refused }); return; }
  const d = REC.doc(far);
  if (d.extent == null || d.from < 0) await PUMP.loadWhole(far);
  if (REC.doc(far).refused === 'unregistered') { faced({ ...waiting, face: 'unregistered' }); return; }
  if (REC.doc(far).refused === 'withheld') { faced({ ...waiting, face: 'withheld' }); return; }
  await landFollowed(act, s, entry, await followed(s, proj), byKey);
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
  const departed = departure();
  dismissChrome();
  const h = homeFrame();
  TRAIL.push({ addr: h.addr, pos: null, width: null, view: h.view, label: 'HOME', notice: null }, departed);
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
  TRAIL.push({ addr: h.addr, pos: null, width: null, view: h.view, label: 'HOME', notice: null }, null);
  await WALK.focusTo(h.addr, null);
  CAM.markDirty();
}

/**
 * WHOLE BOARD — the board the camera is over, at the clamp (law 13)
 * @param {boolean} [byKey] a key made the act
 */
export async function wholeBoard(byKey = false) {
  nextAct();
  const departed = departure();
  dismissChrome();
  const node = boardNode();
  const target = CAM.viewForCell(boardCell(node), 0.92);
  TRAIL.push({ addr: node, pos: null, width: null, view: target, label: 'WHOLE BOARD', notice: null }, departed);
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
  const departed = departure();
  dismissChrome();
  const target = CAM.viewForCell(accountCell(acct), 0.85);
  TRAIL.push({ addr: acct, pos: null, width: null, view: target, label: null, notice: null }, departed);
  await land({ addr: acct, pos: null, view: target }, byKey, 400);
}

/** the node of the board the page opened on — every clean notebook is node 1 */
export function boardNode() { return '1'; }
function nodeOf(/** @type {string} */ _origin) { return '1'; }

/**
 * The light a cursor move makes, from the entry it left to the one it
 * reached (see the head): one entry back, Back's — where the step the entry
 * reached records began; one entry ahead, Forward's — what the step the
 * entry left records marked on arrival; none for a move across two entries
 * or more, nor across an entry that records no step.
 * @param {Entry | null} left the entry the move left
 * @param {Entry} e the entry it reached
 * @param {number} by the entries it moved, newer counted ahead
 * @returns {Light | null}
 */
function lightOf(left, e, by) {
  const step = by === -1 ? e.step : by === 1 && left ? left.step : null;
  if (!step) return null;
  const back = by === -1;
  if (step.kind === 'carry') return { back, link: null, end: null, passage: { addr: back ? step.from : step.to, spans: step.spans } };
  return { back, link: step.link, end: back ? { addr: step.near, link: step.link, key: step.key } : null, passage: back ? null : { addr: step.far, spans: step.spans } };
}

/**
 * Where Back returns the walk (issue #152's design decision: "Where it is in
 * view, keyboard focus returns to it"): the link's end the follow was made
 * at — its item, where its first stretch stands now — or the first stretch of
 * the passage carried its text holds now, where that stretch's line stands in
 * the visible view of the view Back lands at and its document stands at its
 * reading scale there (T-LAYER's `lineInView` and one test); null where it
 * does not, the walk landing on the entry's place.
 * @param {Light} l
 * @param {View} view the view Back lands at
 * @returns {{addr: string, pos: number, end: End | null} | null}
 */
function returnTo(l, view) {
  const e = l.end, s = e ? LK.shown(e.addr).find((x) => x.link.addr === e.link && x.key === e.key) : null;
  const m = !e && l.passage ? placedMark(l.passage, null) : null;
  const at = e && s ? { addr: e.addr, pos: s.pos, end: { link: e.link, key: e.key } } : m ? { addr: m.addr, pos: m.pos, end: null } : null;
  return at && LAYER.atReadingScale(at.addr, view.scale) && LAYER.lineInView(at.addr, at.pos, view) ? at : null;
}

/**
 * A cursor move's landing — Back, Forward, a jump — at what the entry the
 * move reached holds (issue #136's design decision): at its view, the walk
 * where Back's light returns it (`returnTo`), else on its place — where its
 * read brought no place, the place its notice names, never the place its
 * jump named — and its notice shown again; the move's light lit (`lightOf`),
 * with nothing of the entry's own: no arrival, no notice's link. An entry
 * still reading shows its reading face at once and lands once its read is
 * answered; nowhere, and lit nowhere, where an act was made after the move.
 * @param {Entry} e the entry the move reached
 * @param {number} act the move's count
 * @param {boolean} byKey a key made the move
 * @param {Light | null} l the move's light
 */
async function landAtCursor(e, act, byKey, l) {
  const answer = TRAIL.pending(e);
  if (answer) { if (e.notice) showNotice(e.notice); await answer; }
  const at = TRAIL.current();
  if (act !== made || !at) return;
  FACES.endReading();
  const n = at.notice;
  if (!(n && n.at)) pinTo(at.addr);
  light = l; lit = l && l.link ? [l.link] : [];
  const back = l && l.back ? returnTo(l, at.view) : null;
  const flight = land(back ? { ...back, view: at.view } : n && n.at ? { addr: n.at.addr, pos: n.at.pos, view: at.view } : at, byKey, 500);
  if (n) showNotice(n);
  await flight;
}

/**
 * A cursor move: the cursor moved by the trail's own move, landing on the
 * view left, the move's light lit where it crosses one step (`lightOf`).
 * @param {(departed: View) => (Entry | null)} move N-TRAIL's move
 * @param {boolean} byKey a key made the act
 * @returns {Promise<boolean>} the cursor moved
 */
async function moveCursor(move, byKey) {
  const left = TRAIL.current(), from = TRAIL.cursorIndex();
  const e = move(departure());
  if (!e) return false;
  const act = nextAct();
  dismissChrome();
  await landAtCursor(e, act, byKey, lightOf(left, e, TRAIL.cursorIndex() - from));
  return true;
}

/**
 * Back: the cursor one entry back, lighting where the step it crossed
 * began — the link the follow from that entry took, or the passage the LEAP
 * from it carried — whether or not the entry it leaves still reads, for the
 * reader stood where the step began (see the head).
 * @param {boolean} [byKey] a key made the act
 */
export function back(byKey = false) { return moveCursor(TRAIL.back, byKey); }
/**
 * Forward: the cursor one entry ahead, lighting what the step it crossed
 * marked on arrival (see the head).
 * @param {boolean} [byKey] a key made the act
 */
export function forward(byKey = false) { return moveCursor(TRAIL.forward, byKey); }
/**
 * A trail jump to entry n (newest-first) — a cursor move, lighting as Back
 * does where it reaches the entry behind and as Forward does where it
 * reaches the one ahead, and nothing across two entries or more.
 * @param {number} n
 * @param {boolean} [byKey] a key made the act
 */
export function toTrailEntry(n, byKey = false) { return moveCursor((departed) => TRAIL.jump(n, departed), byKey); }
