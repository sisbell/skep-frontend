// N-GO — the teleport (the structure record §3.2; S-7 (a)). Layer 2,
// engine-bound only through O-HOST, its arithmetic pure. State (FP-10): the
// arrival mark and the links lit (the arrival's two marks), what a landing
// says of the passage it carried or followed and the run it stands at
// (`landing`), its line's retry and its version offer, the light a one-step
// move along the trail made, the trail entry the arrival stands at, the
// version each document's box shows (`pins`), the count of the navigation
// acts made, the jump in the air, when its camera left and whether the
// reader took it over, and the jump reaching. View state, never written
// (FP-7).
// The box's version (FP-22): every version of a document shares its box, and
// the box shows one of them — the version pinned there, else its plain
// address, the trunk head (`shownIn`) — which every surface reads through
// the reader the app hands it. Only an act aimed at the box changes it
// (`pinTo`): a version move, or arriving by an address — a LEAP's landing at
// the address it names, a follow's at the address its link names, a cursor
// move's at its entry's — never a pan, a zoom, the scene, HOME, WHOLE BOARD
// or a click on a place; and a newer version's arrival changes no box
// (`arrived`): a box read at its plain address is pinned on the member being
// read, its text standing (foundations §3.2), the entry re-taking that
// version as it is departed (N-TRAIL's `retakePlace`). A version move never
// flies (`toVersion`): the camera stays and the text alone is replaced, the
// passage held — the selection, else the first passage in view — found in
// the version moved to by `compare` (`heldIn`, `swapped`) and keeping its
// screen line there (T-LAYER's `holdAcross`; FP-8), what survives of it
// marked by the four states below; where that version lacks it, the nearest
// passage the two share keeps the line (SC's `nearest`), else the version's
// head, with the dead end's face; a selection standing in the version left
// ends with its text; each move takes a trail entry recording the passage
// carried, and Back restores the version left at its view.
// Every navigation act (`nextAct`) first ends a card or scene still reading
// (O-HOST's `endOpening`), gives a jump reaching back and abandons the jump
// in the air, and counts itself: only the latest act lands, and a landing
// that waited on a read goes on only where no act was made after its own.
// Each act makes one trail move, its own push or cursor move, and departs
// through `departure`: the departed entry re-takes where the camera is bound
// (P-CAM's `destination`) — so a departure made during a flight re-takes the
// flight's destination, never a point it was passing (foundations §2.3) —
// with what that view reads (T-LAYER's `readAt`), where the walk stands in
// the document it reads — or, where the view reads none, the document it
// stands on whole, standing in that view (`stoodIn`) — the version the
// entry's box shows, and a reading scene standing over it as the reader
// leaves it (SC's `asLeft`).
// As its camera leaves, an act ends the chrome of the place it leaves
// (`dismissChrome`; FP-25): the arrival, kept by value in the entry left for
// a return (`leaveHere`; N-TRAIL's `keep`), the standing overlay — save one
// whose field holds the caret, which stands through the jump (FP-20; O-HOST's
// `typing`) — and the scene, which its departure has recorded. The camera is
// flown (P-CAM's `fly`) and the walk moved to the landing (N-WALK's `focusTo`), the
// ring drawn there where a key made the act, which only the caller knows, so
// every act takes `byKey` from it (D5 §4 rules 2 and 8); a LEAP and a follow
// land at the reading size, framing the passage's column (`viewFor`).
// The arrival's two marks: every run of the span landed on outlined
// (`arrivalMark`) and the link followed lit (`litLinks`), which LK draws
// heavier (foundations §2.1). A follow (`follow`) reports the link to LK's
// visited set as its camera leaves (S-32 (a)) and lands at the span the slot
// projects to in the far document's current text (A-53) — placed through the
// far text's image, read in parts, where the board refuses the projection
// for its size — every run the text holds it in, each cut where its bytes
// break the passage's order (BM-HELD's `stretchesOf`), the landing at piece
// 1 (BM-HELD's `Pieces.order`) or at the first run in the text where the
// passage stands in one run or its bytes could not be read. A floating end,
// one the slot projects to nothing (A-37), lands at the far document's head
// with the dead end's face, the link lit and nothing outlined (foundations
// §2.3), the face's act, at a published far document, the version move to
// the latest member holding the passage whole once its reads find one
// (`offerVersion`). A carry (`leapTo` with `carry`; foundations §2.3; P43): a
// LEAP from a passage to another arrangement of the same material carries it
// and, once the landing's text is read and never before, `compare`s it
// against that text whole — in parts where the board refuses the read for
// its size (M-PUMP's `compareParts`) — lands at its counterpart (SC's
// `counterparts`) and marks every stretch the text holds; where it holds
// none, the document's head (`headOf`) with the dead end's face.
// The four states (FP-21): every landing that carried or followed a passage
// reads what the text landed in holds of it by BM-HELD's one rule — all of
// it in one piece, the outline alone; part, or all in pieces, the outline
// and a line beside it (`landing`, `landingLine`; BM-HELD's words), in one
// run the line naming the passage by what it was to the reader, in several
// runs every run labelled (BM-HELD's `piecesIn`, `labelOf`) and the line the
// label of the run the landing stands at, the line offering the scene with
// where the passage came from where that text holds it whole and, at a
// published landing, the latest member holding it whole once its reads find
// one (`offerVersion`), a version move; none, the dead end's face — a
// followed passage's offering that version move in the line's place;
// couldn't tell — a read refused by a name that says nothing of the
// document, or a text the page could not read — the landing unmarked at the
// place as asked, its line saying it could not tell and why, keyed on the
// refusal, and offering "try again" where a retry may tell, which reads again
// and lands from the answer with no trail move (`againCarried`,
// `againVersion`). The walk's element takes the line, or the dead end's or
// the withheld document's words, as its description, and every item holding
// another run that run's label (`described`), so the mirror says all four; a
// face told by the landing's description is never said by the status region
// too.
// The step (FP-21): where the passage stands in several runs, Mod+G and
// Mod+Shift+G (N-KEYS), the line's "next piece" and "previous piece" and a
// press on an outlined run (APP-INPUT) take the landing to the next run in
// the passage's order, or the one before it, wrapping (BM-HELD's `stepFrom`):
// the camera to the view that reads it at the reading size, the walk on its
// span with the platform's focus there, its label the line's, and no trail
// move and no act counted (`step`, `stepTo`).
// The step's light: the entry a follow or a carrying LEAP departs records the
// step (N-TRAIL's `Step`) — the link followed, the end it was made at and its
// far end, or the passage carried — each passage by identity, the permanent
// addresses of its bytes as the act is made (M-REC's `identityOf`), never its
// positions. A one-step move along the trail — Back, Forward, a jump to the
// adjacent entry — lights the step it crosses at the end it lands on
// (`lightOf`), with the arrival's own marks and lifetime: Back where the step
// began — the link followed, lit, or the passage carried, outlined — the walk
// returned to it where the view Back lands at shows it at its document's
// reading scale (`returnTo`) and the mirror marking it while it stands
// (`backLight`), a link's end LK draws at a withheld run outlining the whole
// run, the walk on the run's item (`runMark`); Forward what the step marked
// on arrival; a jump across two entries or more nothing. One move lights one
// link, the one it crossed. A light's passage is placed in its text again at
// every read (`placedMark`; M-REC's `placedIdentity`), whatever part the text
// still holds, none where it holds none, with no face.
// The arrival's life (FP-21, FP-25): the arrival — its outline, its labels,
// its line and its offers, the light, the link lit — stands until the camera
// leaves the place for another landing, as a jump flies, a cursor move leaves
// or a version move lands in place, or until Esc ends it once nothing nearer
// stands (`endArrival`); an act that never leaves keeps it whole, a follow
// known to fail at the act lighting its own link; a camera move makes no act
// here. A cursor move restores the arrival the entry it reaches keeps
// (`landAtCursor`): its outline and its labels as the reader left them, the
// run it stood at, the link lit the one the move crossed, and none of its
// offers that read.
// A text set again under the reader (FP-21's landing rule; FP-36): an
// arrival keeps its runs' bytes by identity as they were outlined
// (`withBytes`), and where its document's text is set again since — the
// reads a feed row naming it made, a refresh's — it is placed again by them
// (`placedAgain`), the landing re-checked once the page holds that text and
// its image whole (`recheck`, on each dirty frame): all of it standing, the
// outline moves there; part, the line says so; none, the dead end's face at
// the landing's place. The passage being read gone from the text its
// document is set again as (T-LAYER's `keepPlace`) lands in place in the
// none state (`vanished`): its line kept by position, the dead end's face
// there, and at a published document the latest member holding the passage
// whole offered (`holdingWhole`). Where a surface of the reader's stands,
// neither face takes its place: the words are said in the status region
// alone.
// The reading scene is a step on the trail (`toScene`; FP-25): its opening
// pushes one entry at the act, the entries ahead of the cursor dropped, its
// address the document opened beside the reader's, holding the pair it opens
// on and the passage held (N-TRAIL's `Opened`), the entry it departs
// recording the step it is opened from — a link's end, or a passage by
// identity (`sceneStep`; N-TRAIL's `SceneStep`). It reaches as a jump only a
// read can place does: the camera still while SC's reads are out, Esc, Back
// and every later act abandoning it, its entry given back, a refusal its
// reads met faced at the act's site, the entry given back too; the chrome of
// the place it leaves ends only as it shows (SC's `leaving`). It stands
// exactly while the cursor stands on its entry: its own end — Esc, the bar's
// ×, zoom-out, ← — is Back (`closeScene`), as Mod+[ in it is, lighting the
// step it was opened from where Back lands (`lightOf`), and each close is
// counted (`closed`), which the one line says. A cursor move back onto its
// entry — Forward after a close, Back after a teleport out, a jump — reopens
// it as the reader left it (`sceneAt`; SC's `reopen`): the camera to the
// view under it and the walk re-taken there without the platform's focus,
// which the scene takes; a reopen the board refused is faced at the
// viewport's corner, the entry standing. A scene's entry changes no box's
// version, and its place is never re-taken (FP-22).
// HOME (the acting account's region), WHOLE BOARD (the board at the clamp)
// and an account's region push too (foundations §2.2), and so does a walk's
// moment unfolded where the camera stands away from the view its walk showed
// it over, which it flies back to, the walk re-taken there without the
// platform's focus (`toView`). The launch frame is HOME, set without a flight
// and pushed as the trail's first entry (W-01). Where no board is held
// (FP-35) the launch names no place — no entry is pushed — and a LEAP, HOME,
// WHOLE BOARD and an account's region never leave: each act counted as it is
// made, its answer O-FACES' no-board face at its site, no entry, no flight,
// no read; a moment unfolded flies the camera alone.
// The jump (FP-25): a jump flies at once wherever the plane can place its
// destination (`placeable`: every address of the board the page opened,
// before any read; another board's once a read brought what draws it) and no
// failure is known (`known`): it takes its trail entry at the act — as
// N-TRAIL's claim where its landing waits on a read, filled in by what it
// reads (`settle`) — ends the chrome of the place it leaves, moves the walk
// to the place it left for and flies there (`leave`), and is in the air
// (`inAir`) until it lands. No landing ends chrome: a card shown while the
// jump is in the air stands over its landing, and one asked then opens
// there. Its reads run beside the flight: where they answer first, the
// camera goes on from where it is to the passage they placed (`goOn`); where
// the reader takes the camera over first (`takeOver`; APP-INPUT's), the jump
// lands where the camera is and its read, answering, only marks its passage
// where it falls, the entry keeping the view the reader leaves it at. While
// a jump is in the air every key but a navigation act waits for its landing
// (N-KEYS; `aground` answers it: true as the jump lands, false where it ends
// without landing), and a wheel series begun before its camera left is
// dropped (APP-INPUT; `airSince`). A jump says it is reading where the camera
// is (O-FACES' `reading`), at the place it left for. A failure its reads
// learn in the air is faced where the camera went (`failed`), the camera
// staying, the walk re-taken there, the entry holding the face as its notice;
// a follow to a far document the board withholds lands at the document
// whole, the face of its own withheld words at its place as the notice, the
// link lit and nothing outlined, told by the landing's description
// (`landWithheld`), its claims read first (O-FACES' `prepare`); a withheld
// document's face stands where it is shown whatever the camera does, no sign
// hiding it, so its acts are reached by Tab with the face standing. A failure
// known at the act — the board answered for the document with nothing; a
// follow's far end projected into such a document, or into one withheld
// whose text the page holds or held (O-FACES' `accessChanged`); for a jump
// that must read, the board marked unreachable — never leaves: no flight, no
// entry, no read, the link not counted as followed, its face at the act's
// site in the place of what stands there (`showNotice`), the chrome kept. A
// jump where only a read can place the destination reaches (`reachFor`): its
// entry taken at the act, the camera still, its reaching face at the act's
// site (O-FACES' `reaching`); Esc, Back and every later act abandon it, its
// entry given back (`giveUp`; N-TRAIL's `giveBack`); its read refused, it
// faces at the site and gives its entry back; answered, the camera leaves as
// above.
// A cursor move (`moveCursor`; `back`, `forward`, `toTrailEntry`) flies at
// once for what the entry holds — its view, placed again where the document
// it read was set since (`returning`; T-LAYER's `keptAt`), that text read
// first beside the flight where the page holds none of it (`placeRead`) —
// the walk where Back's light returns it, else on the run the restored
// landing stood at, else where it stood as the reader left the entry, else
// on its place (`walkOf`), on a span only where the view reads its document
// at its reading scale, and shows the entry's notice again; reaching an
// entry still reading, it shows that entry's reading face and goes on once
// the read answers, where no act was made and the reader took nothing over.
// The cover (FP-29): a trail entry holds no document's words — HOME and WHOLE
// BOARD push their act's name, the strings table's, a reading scene's entry
// is named by its act's and its two documents' addresses (`scenePair`), and
// every other entry's words are read from the model as they are shown
// (`wordsOf`, and as markup in their faces, `wordsHTML`: the words its box's
// first line says, nothing while nothing has answered). A change of the
// page's class (`classChanged`) puts the arrival out, nothing the dead class
// measured surviving, and drops what the entries kept (N-TRAIL's); a cursor
// move reaching an entry whose document is covered (M-REC's `covered`) lands
// on the covered box framed whole, its withheld face standing there, whose
// sign-in act is the way back — a cover still owed its read at the page's
// class (M-REC's `owed`) read first (`coverOf`, `coverRead`, `showCover`).
// Figures: a click's flight 420 ms, every other LEAP's and a follow's 620,
// HOME's and WHOLE BOARD's 700, an account's and a moment's view's 400, a
// cursor move's 500, a step's 420; a second leg SECOND_LEG_MS (unmeasured).
// Rules: FP-1, FP-2, FP-7, FP-9, FP-10, FP-20, FP-21, FP-22, FP-25, FP-29,
// FP-35, FP-36.

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
import * as FOCUS from './focus.js';
import { accountCell, boardCell } from '../plane/projection.js';
import { documentOf, memberOf, versionAddress, kindOf, isTrunkMember, boardOf } from '../model/address.js';
import { t } from '../strings.js';
import { esc } from '../util.js';

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
/** @typedef {import('../beams/held.js').Pieces} Pieces */
/** @typedef {import('../beams/held.js').Stretch} Stretch */
/** @typedef {import('./trail.js').Kept} Kept */
/** @typedef {import('./trail.js').Departure} Departure */
/** @typedef {import('./trail.js').Stood} Stood */
/** @typedef {import('../bridge/shapes').Refusal} Refusal */

/** @typedef {{pos: number, width: number}} Run one run of a marked span in the text landed in: its first position and its positions */

/**
 * @typedef {Object} Destination — where a jump's camera and walk go (`land`)
 * @property {string} addr the place the walk moves to
 * @property {number | null} pos the position in it the walk stands on, where its view reads it at its reading scale
 * @property {View} view the view the camera flies to
 * @property {End | null} [end] the link's end the walk stands on there
 * @property {boolean} [take] the platform's focus goes to the walk's element — save where named false: a walk's moment unfolded holds it (`toView`)
 */

/**
 * @typedef {Object} Carry — a passage a LEAP carries (foundations §2.3; P43): a span of the text it is carried from, and what it was to the reader, which the landing's line names it by
 * @property {string} addr the document it is carried from
 * @property {number} pos its first position there
 * @property {number} width its positions
 * @property {boolean} [selected] it is the reader's selection — "what you selected"; else "the text you were reading"
 */

/**
 * @typedef {Object} Landing — what a landing says of the passage it carried or followed, while its arrival stands (see the head)
 * @property {string} addr the document landed in
 * @property {number} pos where it stands: the run it stands at — piece 1 as it lands, the one a step took it to after — or the landing point: the place as asked, or the document's head
 * @property {Said | null} said what the text holds of the passage: part of it, all of it in pieces, or no answer told — the line itself where the passage stands in one run; null where it holds all of it in one piece, which the outline alone says, or none of it
 * @property {Pieces | null} pieces where the passage stands in several runs, each one's label (BM-HELD's `piecesIn`), the line the label of the run it stands at; null where it stands in one, or where the bytes of its runs could not be read
 * @property {number} current the run it stands at, an index into `pieces.runs`; 0 where no pieces stand
 * @property {boolean} floating the text holds none of the passage: the dead end's face says so
 * @property {boolean} withheld the document landed at is withheld from the reader: the face of its own withheld words says so (`landWithheld`)
 * @property {{a: string, b: string, held: import('../scene/scene.js').Held} | null} beside the line's offer to read the passage side by side with where it came from, where that text holds it whole
 * @property {number | null} version the version offer at a published landing — the line's, or the dead end's face's where a followed passage floats: the latest member holding the passage whole, once its reads find one; null until then, or where none does
 */

/**
 * @typedef {Object} Arrival — the arrival mark: the span a follow, or a LEAP carrying a passage, landed on — or the passage a one-step move's light outlines, as its text holds it now — outlined while it stands (see the head)
 * @property {string} addr the document landed in, or the one the light stands in
 * @property {number} pos the landing's position: the first position of the run it stands at; where `runs` is null, the position whose block the mark stands on
 * @property {Run[] | null} runs every run of the span, in the text's order, the one at `pos` among them, each outlined — a far end's projection, or what of a carried passage the text holds, each cut where its bytes break the passage's order, the landing's labelled runs (`Landing.pieces`) where it stands in several; null where the link names the far document whole, the mark then on the block holding `pos` — the far article's first, where the beams and the scene anchor such an end
 * @property {string | null} link the link followed; null where the landing re-projected a carried passage, or the light outlines one
 * @property {{ids: ISpan[], at: number}} [held] its runs' bytes by identity as they were outlined, and its document's drops then (M-REC's `dropsOf`): what it is placed again by where that document's text is set since (`placedAgain`, `recheck`); absent where the held image did not cover its runs
 */

/** @typedef {{addr: string, spans: ISpan[] | null}} Passage a passage by identity in the document it is drawn in: its bytes' permanent addresses; null where it names the document whole, drawn at the block at its head */

/**
 * @typedef {Object} Placing — a version move's landing a landing's version offer has read already (see `toVersion`): the passage held whole in the version moved to
 * @property {number} from the position in the version the box shows whose line keeps its screen line
 * @property {number} to the position in the version moved to that takes that line
 * @property {Run[]} runs every run of the passage in the version moved to, each outlined
 * @property {ISpan[]} spans the passage by identity, which the entry departed records
 * @property {string | null} link the link the landing lights: a follow's offer's
 */

/**
 * @typedef {Object} Light — what a one-step move along the trail lights (see the head): the step it crossed, at the end it landed on, with the arrival's own marks and life
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
/** @type {((byKey: boolean) => void) | null} the version move the landing's version offer makes — its line's act, or the dead end's face's */
let versionOffer = null;
/** @type {Entry | null} the trail entry the arrival stands at: the place the reader stands at, which keeps it as they leave (`leaveHere`); null where the place took none */
let here = null;
/** @type {Map<string, string>} each box's version where one is pinned, by its document: a box absent shows its plain address, the trunk head (see the head) */
const pins = new Map();

/**
 * @typedef {Object} Air — a jump in the air (see the head; FP-25): from the act its camera leaves at until it lands, the reader takes the camera over, its read fails, or a later act overtakes it
 * @property {number} act the jump's act
 * @property {Entry | null} entry its trail entry; null where it pushed none
 * @property {Promise<boolean>} landed settled once: true as it lands, false where it ends without landing
 * @property {(landed: boolean) => void} end settles `landed`
 */

/**
 * @typedef {Object} Reach — a jump reaching, or a reading scene opening (see the head): the camera still until a read places its destination, or the scene shows
 * @property {number} act the jump's act
 * @property {string} addr the place it names
 * @property {Entry | null} entry its trail entry, given back where it is abandoned
 */

/** @type {Air | null} the jump in the air */
let air = null;
/** when the latest jump's camera left, by the platform's clock (`performance.now()`) */
let leftAt = -Infinity;
/** the act of the jump in the air the reader took the camera over at: its read, answering, only marks its passage */
let takenAt = 0;
/** @type {WeakSet<Entry>} the entries the reader took the camera over at: a read answering there writes them no view */
const takenOver = new WeakSet();
/** @type {Reach | null} the jump reaching, or the reading scene opening (`toScene`) */
let reach = null;
/** the reading scenes closed — a cursor move one entry back from the entry a scene was opened as while it stands — each counted as it is made */
let closes = 0;
/** a second leg's length, in ms, where the first has landed (unmeasured) */
const SECOND_LEG_MS = 300;

/** the box an address stands in: its document's, which every version of it shares */
const boxOf = (/** @type {string} */ addr) => documentOf(addr) || addr;

/**
 * The version a document's box shows (see the head; FP-22): the version
 * pinned there, else its plain address — the trunk head. Every surface reads
 * it through the reader the app hands it.
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
 * A departure (see the head): what the departed entry re-takes — the view
 * the camera is bound for (P-CAM's `destination`), what it reads, where the
 * walk stands and a reading scene standing over it (`leavingNow`) — and the
 * entry's place re-taken where the box it names shows another version as it
 * is left — a newer version's arrival pinned it on the member being read
 * (`arrived`; N-TRAIL's `retakePlace`). Every navigation act departs through
 * it.
 * @returns {Departure}
 */
function departure() {
  const e = TRAIL.current();
  if (e && kindOf(e.addr) === 'document' && shownIn(e.addr) !== e.addr) TRAIL.retakePlace(shownIn(e.addr));
  return leavingNow();
}

/**
 * What the entry the reader stands at re-takes as they leave it now (see the
 * head): the view the camera is bound for, what it reads and where the walk
 * stands in it (`leaving`), and the reading scene standing over it as they
 * leave it (SC's `asLeft`), which an entry a scene was opened as records.
 * @returns {Departure}
 */
function leavingNow() { return { ...leaving(CAM.destination()), scene: SCENE.asLeft() }; }

/**
 * What an entry left at a view re-takes (see the head; N-TRAIL's
 * `Departure`): the view, the passage it reads (T-LAYER's `readAt`) and where
 * the walk stands (`stoodIn`).
 * @param {View} view
 * @returns {Departure}
 */
function leaving(view) {
  const reading = LAYER.readAt(view);
  return { view, reading, stood: stoodIn(view, reading) };
}

/**
 * Where the walk stands as the reader leaves an entry (see the head): in the
 * document the view left reads (T-LAYER's `readAt`) — on it whole, on a span
 * or on a link's end in it — its position there, the one a landing named in
 * its span, else the span's or the link's own, none on the document whole;
 * that position's byte by identity (M-REC's `identityOf`); and the link's end
 * it stands on. Where the view reads no document, the document the walk
 * stands on whole, where that document stands in the view (T-LAYER's
 * `inView`). Null where the walk stands on no document; outside the document
 * the view reads, or out of the view where it reads none — a jump in the air
 * has not yet brought it to the place its camera left for; or on a span or a
 * link's end where the view reads none.
 * @param {View} view the view left
 * @param {import('../text/layer.js').Reading | null} r what it reads
 * @returns {Stood | null}
 */
function stoodIn(view, r) {
  const f = WALK.current();
  if (!f || (f.kind !== 'document' && f.kind !== 'block' && f.kind !== 'link')) return null;
  if (!r) return f.kind === 'document' && LAYER.inView(f.addr, view) ? { addr: f.addr, pos: null, ids: [], end: null } : null;
  if (boxOf(f.addr) !== boxOf(r.addr)) return null;
  const pos = f.kind === 'document' ? null : WALK.landedAt() ?? f.pos;
  return { addr: f.addr, pos, ids: pos != null ? REC.identityOf(f.addr, pos, 1) : [], end: f.kind === 'link' && f.link ? { link: f.link.link.addr, key: f.link.key } : null };
}

/** a view as an entry's landing writes it (N-TRAIL's `settle`): with the passage it reads (T-LAYER's `readAt`) */
const seen = (/** @type {View} */ view) => ({ view, reading: LAYER.readAt(view) });

/**
 * A passage as its text holds it now: every stretch of it the
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

/**
 * Back's light at a link's end LK draws at a withheld run (see the head):
 * the run outlined whole, the mark at its start, its link the one lit; null
 * where LK draws the end on text, where Back lights its link alone, or draws
 * it nowhere now.
 * @param {End & {addr: string}} end the end the follow was made at, in its document
 * @param {string | null} link
 * @returns {Arrival | null}
 */
function runMark(end, link) {
  const s = LK.shown(end.addr).find((x) => x.link.addr === end.link && x.key === end.key);
  return s && s.run ? { addr: end.addr, pos: s.run.pos, runs: [{ pos: s.run.pos, width: s.run.width }], link } : null;
}

/** the arrival mark while it stands, with its runs' bytes (`Arrival.held`): a landing's, as its reads placed it, or the one a return restored — placed again by those bytes where its document's text was set since (`placedAgain`); else a one-step move's light, its passage placed in its text as it is read (`placedMark`), or Back's at a link's end drawn at a withheld run, the run (`runMark`); null where neither stands */
const markHeld = () => (arrival ? placedAgain(arrival) : light && light.passage ? placedMark(light.passage, light.link) : light && light.end ? runMark(light.end, light.link) : null);

/** the arrival mark while it stands (see the head; `markHeld`), as the surfaces that draw and name it read it: its document, its position, its runs and its link */
export const arrivalMark = () => { const m = markHeld(); if (!m || !m.held) return m; const { held: _, ...mark } = m; return mark; };

/**
 * An arrival with its runs' bytes by identity as its document's held image
 * places them now (`Arrival.held`), so it is placed again by them where that
 * text is set again; as it is where it outlines no runs, or the image does
 * not cover every run.
 * @param {Arrival | null} a
 * @returns {Arrival | null}
 */
function withBytes(a) {
  if (!a || !a.runs) return a;
  const ids = a.runs.map((r) => REC.identityOf(a.addr, r.pos, r.width));
  return ids.every((x) => x.length) ? { ...a, held: { ids: ids.flat(), at: REC.dropsOf(a.addr) } } : a;
}

/**
 * An arrival placed again where its document's text was set since its runs
 * were outlined (see the head; FP-21): every stretch of their bytes that text
 * holds now (M-REC's `placedIdentity`), the mark at the first; none where it
 * holds none, or the page holds none of the text; as it stands where the text
 * was not set since.
 * @param {Arrival} a
 * @returns {Arrival | null}
 */
function placedAgain(a) {
  if (!a.held || REC.dropsOf(a.addr) === a.held.at) return a;
  const runs = REC.has(a.addr) && REC.doc(a.addr).from >= 0 ? REC.placedIdentity(a.addr, a.held.ids) : [];
  return runs.length ? { ...a, pos: runs[0].pos, runs } : null;
}

/**
 * The landing rule at an arrival whose document's text was set again since
 * its runs were outlined (FP-21, FP-36), once the page holds that text and
 * its image whole: its runs placed again by their bytes (`placedAgain`) —
 * all of them standing, the outline moves there; part, the outline on what
 * stands and the landing's line saying only part of its passage is in that
 * text; none, nothing outlined and the dead end's face at the landing's
 * place, said in the status region — its runs' labels dropped, which name
 * its runs no longer, and where less than all of it stands its offers with
 * them, which were made for what it held. Where a surface of the reader's stands (O-HOST's) the
 * face takes nothing's place, its words said in the status region alone
 * (FP-36). Made on each dirty frame (APP), once for each setting of the text.
 */
export function recheck() {
  const a = arrival;
  if (!a || !a.held || REC.dropsOf(a.addr) === a.held.at) return;
  const d = REC.has(a.addr) ? REC.doc(a.addr) : null;
  if (!d || d.from < 0 || !imageCovers(d)) return;
  const runs = REC.placedIdentity(a.addr, a.held.ids);
  const width = a.held.ids.reduce((n, x) => n + x.width, 0), stands = runs.reduce((n, r) => n + r.width, 0);
  arrival = runs.length ? { ...a, pos: runs[0].pos, runs, held: { ids: a.held.ids, at: REC.dropsOf(a.addr) } } : null;
  const prior = landed && boxOf(landed.addr) === boxOf(a.addr) ? landed : null;
  const subject = prior && prior.said ? prior.said.subject : a.link ? 'followed' : 'reading';
  const holds = !runs.length ? 'none' : stands < width ? 'part' : runs.length > 1 ? 'pieces' : 'all';
  const said = HELD.saidOf({ holds, places: runs.length }, subject, a.addr, showsWithheld(d));
  if (prior || said || !runs.length) {
    const whole = holds === 'all' || holds === 'pieces';
    landed = { addr: a.addr, pos: runs.length ? runs[0].pos : prior ? prior.pos : a.pos, said, pieces: null, current: 0, floating: !runs.length, withheld: false, beside: prior && whole ? prior.beside : null, version: prior && whole ? prior.version : null };
    if (!whole) versionOffer = null;
  }
  if (!runs.length) {
    if (HOST.hasCurrent()) FOCUS.say(FACES.floatingWords(a.addr).text);
    else FACES.floating(a.addr, siteAt(a.addr, landed ? landed.pos : a.pos), null, false);
  }
  CAM.markDirty();
}

/**
 * The passage being read gone from the text its document is set again as
 * (FP-21's landing rule; T-LAYER's `keepPlace`), its line kept by position:
 * a landing in place in the none state — no camera move, no trail entry —
 * the arrival put out, the dead end's face standing at the line kept, said in
 * the status region, and at a published document the latest member holding
 * the passage whole offered once its reads find one (`offerVersion`,
 * `holdingWhole`). Where the arrival stands in that document its own
 * re-check says what the text holds of its passage (`recheck`); where a
 * surface of the reader's stands (O-HOST's), the face takes nothing's place,
 * its words said in the status region alone (FP-36). Nothing while a jump is
 * in the air or reaching: the reader is leaving.
 * @param {string} addr the document set again
 * @param {number} pos the position whose line keeps the passage's place
 * @param {ISpan[]} ids the passage by identity
 */
export function vanished(addr, pos, ids) {
  if (air || reach) return;
  const a = arrivalMark();
  if (a && boxOf(a.addr) === boxOf(addr)) return;
  if (HOST.hasCurrent()) { FOCUS.say(FACES.floatingWords(addr).text); return; }
  putOut();
  landed = { addr, pos, said: null, pieces: null, current: 0, floating: true, withheld: false, beside: null, version: null };
  FACES.floating(addr, siteAt(addr, pos), null, false);
  void offerVersion(made, addr, holdingWhole(addr, pos, ids));
}

/**
 * The version move a vanished passage's offer makes to a member whose text
 * holds it whole (`offerVersion`'s `holds`): the member's image read whole,
 * in parts where the board refuses it for its size (M-PUMP's `imageParts`),
 * the passage placed through it by identity (M-REC's `placedIn`) in one
 * stretch of all its positions — the move landing in place, the line kept at
 * that stretch; null where the member's text holds less.
 * @param {string} addr the document the passage was read in
 * @param {number} pos the position whose line keeps its place there
 * @param {ISpan[]} ids the passage by identity
 * @returns {(member: string) => Promise<((byKey: boolean) => void) | null>}
 */
function holdingWhole(addr, pos, ids) {
  const width = ids.reduce((n, x) => n + x.width, 0);
  return async (member) => {
    const e = await PUMP.extentOf(member);
    if (!('extent' in e) || e.extent < 1) return null;
    const im = await PUMP.imageParts(member, 1, e.extent);
    if (!('runs' in im)) return null;
    let at = 1;
    const image = im.runs.map((r) => { const run = { pos: at, ...REC.iSpanOf(r) }; at += r.width; return run; });
    const [whole, more] = REC.placedIn(image, ids);
    if (!whole || more || whole.width < width) return null;
    /** @type {Placing} */
    const there = { from: pos, to: whole.pos, runs: [whole], spans: ids, link: null };
    return (byKey) => { void toVersion(member, { placed: there, byKey, site: siteAt(addr, pos) }); };
  };
}
/** the links lit while the arrival stands — drawn heavier by LK, which reads them through the reader the app wires (foundations §2.1's register); none where none is */
export const litLinks = () => lit;

/**
 * Where Back's light stands now, for the mirror (N-WALK's reader,
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
 * The next act, made: a card or scene still reading ended, what stands
 * staying for the act to dismiss (O-HOST's opening), a jump reaching given
 * back and a jump in the air abandoned, never landed (FP-25), and the act
 * counted. Every navigation act begins with
 * it, so no chrome asked at the place an act leaves opens while the act
 * reads; the arrival stands until the act's camera leaves the place
 * (`dismissChrome`), so an act that never leaves keeps it (see the head); a
 * camera move calls nothing here (§3.2).
 * @returns {number} the act's count
 */
function nextAct() {
  HOST.endOpening();
  giveUp();
  if (air) endAir(air.act, false);
  return ++made;
}

/** the arrival put out: its outline, the light a one-step move made, the links lit, its line and its offers */
function putOut() { arrival = null; light = null; lit = []; landed = null; retry = null; versionOffer = null; CAM.markDirty(); }

/**
 * The reader leaves the place they stand at (see the head; FP-25): the
 * arrival standing there — its outline as it stands, a light's
 * among them, and what its landing said, its runs' labels and the run it
 * stands at — kept in that place's trail entry by value for a return to it
 * (N-TRAIL's `keep`), then put out with the links lit and its offers. The
 * entry left keeps nothing where nothing stood.
 */
function leaveHere() {
  const mark = markHeld();
  if (here) TRAIL.keep(here, mark || landed ? { arrival: mark, landed } : null);
  putOut();
}

/**
 * Esc ends the arrival (FP-21; N-KEYS' one order, once nothing nearer
 * stands): its outline, its labels, its line, the light and
 * the link lit — the place's entry keeping none of it as the reader leaves.
 * @returns {boolean} an arrival stood
 */
export function endArrival() {
  if (!arrivalMark() && !landed && !lit.length) return false;
  putOut();
  return true;
}

/**
 * A change of the page's class (see the head; FP-21, FP-23), told by the app
 * as M-PUMP tells it: the arrival put out — its outline, its labels, its line, its
 * offers, the light and the links lit — the place's entry keeping none of
 * it, and every entry's notice and kept arrival dropped (N-TRAIL's
 * `classChanged`), so nothing the class the page left measured is drawn,
 * described or restored.
 */
export function classChanged() {
  putOut();
  TRAIL.classChanged();
}

/** is a jump in the air (see the head; FP-25)? */
export const inAir = () => air !== null;
/** when the latest jump's camera left, by the platform's clock (`performance.now()`): a wheel series begun before it is dropped whole (APP-INPUT) */
export const airSince = () => leftAt;
/** the landing of the jump in the air (see the head): true as it lands, false where it ends without landing; true at once where none is in the air — what the keys it holds wait on (N-KEYS) */
export const aground = () => (air ? air.landed : Promise.resolve(true));
/** is a jump reaching for a place only its read can place, or a reading scene opening (see the head)? */
export const isReaching = () => reach !== null;
/** the reading scenes closed so far (see the head): what the one line says after a close reads (L-LINE's reader, the app's to hand in) */
export const closed = () => closes;

/**
 * The reader takes the camera over (FP-25; APP-INPUT's): the jump in the air
 * lands where the camera is, never
 * landing on its passage, so the keys it held are dropped; its read,
 * answering, only marks its passage, and its entry keeps the view the reader
 * leaves it at. Nothing where no jump is in the air.
 */
export function takeOver() {
  const a = air;
  if (!a) return;
  takenAt = a.act;
  if (a.entry) takenOver.add(a.entry);
  endAir(a.act, false);
}

/** a jump's camera leaves (see the head): it is in the air from now */
function takeOff(/** @type {number} */ act, /** @type {Entry | null} */ entry) {
  /** @type {(landed: boolean) => void} */
  let end = () => {};
  /** @type {Promise<boolean>} */
  const landing = new Promise((r) => { end = r; });
  leftAt = performance.now();
  air = { act, entry, landed: landing, end };
}

/** the jump in the air of an act ends: landed, or not — its held keys made there, or dropped (N-KEYS) */
function endAir(/** @type {number} */ act, /** @type {boolean} */ ok) {
  const a = air;
  if (!a || a.act !== act) return;
  air = null;
  a.end(ok);
}

/**
 * A jump reaching abandoned (see the head) — by Esc, its face's dismissal,
 * by Back, or by any later act: its entry given back (N-TRAIL's `giveBack`),
 * its face ended where it still stands; a reading scene opening so, its
 * opening ended by the act (O-HOST's). Nothing where none reaches.
 */
function giveUp() {
  const r = reach;
  if (!r) return;
  reach = null;
  if (r.entry) TRAIL.giveBack(r.entry);
  if (HOST.currentIs('reaching:' + r.addr)) HOST.dismiss();
}

/**
 * Esc abandons a jump reaching (FP-25) once nothing nearer stands — an
 * overlay shown over its face since (N-KEYS' one
 * order): its entry given back.
 * @returns {boolean} a jump was reaching
 */
export function abandon() {
  if (!reach) return false;
  giveUp();
  return true;
}

/** what the landing says of the passage it carried or followed, while its arrival stands (see the head); null where nothing landed so */
export const landing = () => landed;
/**
 * The landing's line in words, for O-LAND's line: where the passage stands in
 * several runs, the label of the run it stands at (BM-HELD's `labelOf`), which
 * says how much of the passage the runs hold; else its line (BM-HELD's
 * `lineOf`), counting no runs (FP-21); null where it has none.
 * @returns {string | null}
 */
export function landingLine() {
  if (!landed) return null;
  if (landed.pieces) return HELD.labelOf(landed.pieces, landed.current, true);
  return landed.said ? HELD.lineOf(landed.said, false) : null;
}
/** the acts the landing offers now, on its line: the step, where the passage stands in several runs; "try again" where a retry may tell; the version offer once its reads found one — the dead end's face's where the passage floats */
export const landingOffers = () => ({ steps: !!landed && !!landed.pieces, again: !!retry, version: !!versionOffer });

/**
 * What the landing says, for the mirror's descriptions of the items it
 * stands on (N-WALK's `described`; FP-21): its line's words — the label of
 * the run it stands at, where
 * the passage stands in several — or the dead end's where the text holds none
 * of the passage, or a withheld document's own words whole where a follow
 * landed at one (O-FACES' `withheldText`), and every run's own label; null
 * where the text holds all of it in one piece — the outline alone says that —
 * and where nothing landed so.
 * @returns {Described | null}
 */
export function described() {
  if (!landed) return null;
  const words = landingLine() ?? (landed.floating ? FACES.floatingWords(landed.addr).text : landed.withheld ? FACES.withheldText(landed.addr) : null);
  if (!words) return null;
  const p = landed.pieces;
  const runs = p ? p.runs.map((r, i) => ({ pos: r.pos, width: r.width, words: HELD.labelOf(p, i) })) : [];
  return { addr: landed.addr, pos: landed.pos, words, runs };
}

/**
 * One of the landing's line's acts (O-LAND's buttons): `beside`, the reading
 * scene with where the passage came from (`toScene`), the passage held there
 * set level with its counterpart here (SC), the document it came from the
 * one opened beside; `version`, the version move to the latest member holding
 * the passage whole; `again`, the landing's read made again; `next` and
 * `previous`, the step (`step`). Each acts only while the landing's line
 * stands.
 * @param {'beside' | 'version' | 'again' | 'next' | 'previous'} which
 * @param {boolean} [byKey] a key made the act
 */
export function landingAct(which, byKey = false) {
  if (!landed) return;
  if (which === 'beside' && landed.beside) { const b = landed.beside; void toScene(b.a, b.b, b.held, { beside: 'a', site: { span: { addr: landed.addr, pos: landed.pos } } }); }
  else if (which === 'version' && versionOffer) versionOffer(byKey);
  else if (which === 'again' && retry) void retry(byKey);
  else if (which === 'next' || which === 'previous') step(which === 'next' ? 1 : -1, byKey);
}

/** does a step stand (see the head): the landing's passage stands in several runs */
export const steps = () => !!landed && !!landed.pieces;

/**
 * The step (see the head): the landing taken to the next run of its passage
 * in the passage's order, or the one before it, wrapping (BM-HELD's
 * `stepFrom`) — `stepTo`'s; nothing where no step stands.
 * @param {1 | -1} dir
 * @param {boolean} [byKey] a key made the step
 * @returns {boolean} a step was made
 */
export function step(dir, byKey = false) {
  const l = landed;
  if (!l || !l.pieces) return false;
  return stepTo(HELD.stepFrom(l.pieces, l.current, dir), byKey);
}

/**
 * A step to one run of the landing's passage (see the head) — the next or
 * the previous one, or an outlined run pressed below reading scale
 * (APP-INPUT): the landing standing there, its line the run's label, the
 * camera flown to the view that reads it at the reading size, its column
 * framed (`viewFor`), and the walk on the span holding it, the platform's
 * focus there with the ring drawn where a key made the step (N-WALK's
 * `focusTo`; FP-20) — no trail move, no act counted, the arrival standing.
 * Nothing where no step stands, or the run is none of its runs.
 * @param {number} i the run, an index into the landing's runs (`Landing.pieces`; the arrival's `runs`)
 * @param {boolean} [byKey] a key made the step
 * @returns {boolean} a step was made
 */
export function stepTo(i, byKey = false) {
  const l = landed, r = l && l.pieces ? l.pieces.runs[i] : null;
  if (!l || !r) return false;
  landed = { ...l, pos: r.pos, current: i };
  if (arrival && arrival.addr === l.addr) arrival = { ...arrival, pos: r.pos };
  void WALK.focusTo(l.addr, r.pos, byKey, true);
  void CAM.fly(viewFor(l.addr, r.pos), 420);
  CAM.markDirty();
  return true;
}

/**
 * The chrome a navigation act clears as its camera leaves the place it
 * stands at (FP-25) — at the act, save where only a read can place the
 * destination: the arrival, kept in the entry it stood at (`leaveHere`), the
 * entry the act moves to the one the landing's arrival stands at from now;
 * the standing overlay — save one whose field holds the caret, an answer the
 * reader is typing, which stands through the jump (FP-20; O-HOST's `typing`)
 * — and a card or scene still reading, which
 * then opens nothing (O-HOST's opening); and the scene, which the act's
 * departure recorded in its entry and whose end moves no trail entry of its
 * own — so the act's own trail move is its one.
 * @param {Entry | null} to the entry the act moves to; null where it takes none
 */
function dismissChrome(to) { leaveHere(); here = to; if (HOST.typing()) HOST.endOpening(); else HOST.dismiss(); SCENE.close(); }

/**
 * An entry's notice shown (O-FACES): its jump's reading face while its read
 * is out, else the face the read brought — the fifth cell, the
 * document-level withheld face, a refusal's by its name, the dead end's —
 * each at its site; the dead end's at the landing that met it, and a
 * withheld document's at the place a follow landed at, told by that
 * landing's description, where the focus lands, never by the status region
 * as well (`told`). The dead end's face offers the landing's version offer
 * where one stands (`floatOffer`); a withheld document's offers C-67's
 * pointer as a LEAP from its site (`pointTo`), and one known at the act
 * carries the act's caption.
 * @param {Notice} n
 * @param {boolean} [told] the landing that met it says its words (`described`)
 * @param {string | null} [caption] the act's caption, where the face answers it at its site
 */
function showNotice(n, told = false, caption = null) {
  const asked = { caption, follow: pointTo(n.site), told };
  if (n.face === 'reading') FACES.reading(n.addr, n.site);
  else if (n.face === 'unregistered') FACES.unregistered(n.addr, n.site);
  else if (n.face === 'withheld') FACES.withheld(n.addr, n.site, asked);
  else if (n.face === 'refused' && n.refusal) FACES.showRefusal(n.site, n.refusal, n.addr, asked);
  else if (n.face === 'floating') FACES.floating(n.addr, n.site, floatOffer(n.addr), told);
  CAM.markDirty();
}

/** the version offer the dead end's face at a document carries (see the head): the floating landing's there, once its reads found it (`offerVersion`); null where none stands */
const floatOffer = (/** @type {string} */ addr) => (landed && landed.floating && landed.addr === addr && landed.version != null && versionOffer ? { k: landed.version, go: versionOffer } : null);

/** C-67's pointer's act at a withheld document's face: the LEAP to the edition its claim names, made where the face stands */
const pointTo = (/** @type {Site | null} */ site) => (/** @type {string} */ home, /** @type {boolean} */ byKey) => { void leapTo(home, { how: 'leap', byKey, site }); };

/** where a jump's face stands at the place its camera left for (see the head): the document at the position the jump named, else its head, the document its sign */
const siteAt = (/** @type {string} */ addr, /** @type {number | null} */ pos) => /** @type {Site} */ ({ span: { addr, pos: pos ?? 1 }, sign: addr });
/** where a withheld document's face stands at its place (see the head): its head, no sign hiding it as the camera moves */
const placeAt = (/** @type {string} */ addr) => /** @type {Site} */ ({ span: { addr, pos: headOf(REC.doc(addr)) } });
/** a site as a withheld document's face stands at it: no sign (see the head) */
const unsigned = (/** @type {Site} */ site) => { const { sign: _, ...rest } = site; return /** @type {Site} */ (rest); };
/** an act's site as a jump's face stands at it: a span's document its sign, out of the visible view of which the one line carries the face (O-HOST's `sign`); a site naming no span as it is */
const signed = (/** @type {Site | null} */ site) => (site && site.span ? { ...site, sign: site.span.addr } : site);

/** the board's answer where it is marked unreachable, by the one refusal shape: a jump that must read faces it at the act (see the head) */
const UNREACHABLE = /** @type {Refusal} */ ({ kind: 'unreachable', name: 'unreachable', text: '' });

/**
 * A failure known at the act (see the head; FP-25): the board answered for
 * the document with nothing; for a follow, the far end's projection into
 * such a document, or a far document withheld from the reader — known so, or
 * by the far end's projection — whose text the page holds or held under the
 * class it left (O-FACES' `accessChanged`), any other withheld far document
 * being a place the follow lands at;
 * for a jump that must read, the board is marked unreachable — as a notice's
 * face, its site the caller's to give; null where none is known.
 * @param {string} addr the place the jump names
 * @param {boolean} reads the jump must read before it lands
 * @param {{link: string, slot: 1 | 2} | null} [end] a follow's far end
 * @returns {Notice | null}
 */
function known(addr, reads, end = null) {
  const d = REC.has(addr) ? REC.doc(addr) : null;
  const p = end ? REC.projection(end.link, end.slot, addr) : undefined;
  /** @type {Notice['face'] | null} */
  const face = (d && d.refused === 'unregistered') || p === 'unregistered' ? 'unregistered'
    : end && ((d && d.refused === 'withheld') || p === 'withheld') && FACES.accessChanged(addr) ? 'withheld'
      : reads && REC.daemon() === 'unreachable' ? 'refused' : null;
  return face ? { face, addr, refusal: face === 'refused' ? UNREACHABLE : null, site: null } : null;
}

/**
 * Can the plane place a document before any read of it (see the head)? On
 * the board the page opened every address has its place; on another board,
 * only once a read brought what draws it — its text, its metadata, or its
 * withheld box (P-RENDER's `drawsDoc`).
 * @param {string} addr
 */
function placeable(addr) {
  if (boardOf(addr) === boardNode()) return true;
  const d = REC.doc(addr);
  return d.from >= 0 || !!d.meta || d.refused === 'withheld';
}

/**
 * A jump reaching (see the head; FP-25): its reaching face at the act's site
 * in the place
 * of what stands there, the camera still, its read made. Where the jump was
 * abandoned meanwhile, nothing; where its read answered, the camera may
 * leave; where the board refused it, the refusal faced at the site — the
 * fifth cell, the withheld face, a refusal's by its name — and the entry
 * given back.
 * @param {number} act
 * @param {string} addr
 * @param {Entry | null} entry
 * @param {Site | null} site the act's site
 * @returns {Promise<{refused: Refusal | null} | null>} the read answered, with the refusal its text met; null where the jump ended without its camera leaving
 */
async function reachFor(act, addr, entry, site) {
  const at = signed(site);
  reach = { act, addr, entry };
  FACES.reaching(addr, at, () => { if (reach && reach.act === act) giveUp(); });
  const w = await PUMP.wholeOf(addr);
  if (!reach || reach.act !== act) return null;
  reach = null;
  if (placeable(addr) || !w.refused) return { refused: w.refused };
  if (entry) TRAIL.giveBack(entry);
  FACES.showRefusal(at, w.refused, addr);
  return null;
}

/**
 * The camera leaves for a place (see the head): the jump in the air from
 * now, the walk on the place and the flight begun (`land`).
 * @param {number} act
 * @param {Entry | null} entry
 * @param {Destination} at
 * @param {boolean | undefined} byKey
 * @param {number} ms
 * @returns {Promise<boolean>} the flight landed
 */
function leave(act, entry, at, byKey, ms) {
  takeOff(act, entry);
  return land(at, byKey, ms);
}

/**
 * A jump goes on to the place its reads placed (see the head): the walk on
 * the place, and the camera from where it is to the view placed — the first
 * leg cut short where it is still in the air, never flown back — or, where
 * the camera is bound for that view already, on with the first leg; the jump
 * in the air ends as the camera lands, or as anything else ends its flight.
 * @param {number} act
 * @param {Promise<boolean>} first the first leg's flight
 * @param {Destination} at
 * @param {boolean | undefined} byKey
 * @param {number} ms the first leg's length: a second leg flown while the first is in the air takes it again
 * @returns {Promise<boolean>} the camera landed
 */
async function goOn(act, first, at, byKey, ms) {
  const d = CAM.destination();
  let ok;
  if (d.x === at.view.x && d.y === at.view.y && d.scale === at.view.scale) { focusOn(at, byKey); ok = await first; }
  else ok = await land(at, byKey, CAM.flying() ? ms : SECOND_LEG_MS);
  endAir(act, ok);
  return ok;
}

/**
 * A failure a jump's reads learned in the air (see the head) — a document
 * the board answers for with nothing,
 * a follow's far end projected into one: its entry holding the face as its
 * notice where the camera went; then, where no act was made since, the face
 * shown there, the walk re-taken on the place — save where the reader took
 * the camera over — so the mirror names what the read learned, the ring as
 * the act left it, and the jump ended, never landed.
 * @param {number} act
 * @param {Entry | null} entry
 * @param {Notice} n
 * @param {boolean | undefined} byKey a key made the act
 * @returns {boolean} no act was made since: the face shows
 */
function failed(act, entry, n, byKey) {
  if (entry) TRAIL.settle(entry, { notice: n });
  if (act !== made) return false;
  showNotice(n);
  if (takenAt !== act) void WALK.focusTo(n.addr, null, !!byKey, false);
  endAir(act, false);
  return true;
}

/**
 * The view that reads a document at a position: its size (T-LAYER's fold) at
 * the landing's em — the reading size, smaller only where even a column of
 * one character is wider than the view (P-CAM's `landingPx`) — on the line
 * holding the position, framing its column with both its margins — the
 * corner on its left, the edge on its right (T-LAYER's `frameOf`; FP-26) —
 * the first column where none is named.
 * @param {string} addr
 * @param {number | null} pos
 */
export function viewFor(addr, pos) {
  return CAM.viewAt(LAYER.frameOf(addr, pos), LAYER.foldOf(REC.doc(addr)).fs, CAM.landingPx());
}

/**
 * An entry's words as the trail list and the LEAP box show it (see the head):
 * its act's name where HOME or WHOLE BOARD pushed it, or a reading scene's
 * opening did — "read side by side", its documents named by their addresses
 * beside it (`scenePair`); at a document, the words its box's label leads
 * with now (T-LAYER's `firstLine`) — its first
 * line by the one rule, the client's words in its place bracketed, "[withheld
 * · ⟨owner⟩]" where a read answered `withheld`, nothing where nothing has
 * answered — read from the model as it is shown, never kept in the entry;
 * nothing for any other place.
 * @param {Entry} e
 * @returns {string}
 */
export function wordsOf(e) {
  if (e.label != null) return e.label;
  if (e.scene) return t('B1.side-by-side');
  return kindOf(e.addr) === 'document' && REC.has(e.addr) ? LAYER.firstLine(REC.doc(e.addr)) : '';
}

/**
 * An entry's words as markup (`wordsOf`), each in its face (P-REG's FACE):
 * an act's name the client's; a document's first line its words in the
 * reading face, an address the client's words name the identifier's
 * (T-LAYER's `firstLineHTML`).
 * @param {Entry} e
 * @returns {string}
 */
export function wordsHTML(e) {
  if (e.label != null) return esc(e.label);
  if (e.scene) return esc(t('B1.side-by-side'));
  return kindOf(e.addr) === 'document' && REC.has(e.addr) ? LAYER.firstLineHTML(REC.doc(e.addr)) : '';
}

/**
 * The documents an entry a reading scene was opened as names, in its panes'
 * order (see the head): those its panes showed as the reader last left it,
 * else those it opened on — the addresses the trail's list names it by, and
 * the documents a change of the page's class reads again (the app's); null
 * for every other entry.
 * @param {Entry} e
 * @returns {[string, string] | null}
 */
export function scenePair(e) {
  const o = e.scene;
  if (!o) return null;
  return o.left ? [o.left.panes.a.shows, o.left.panes.b.shows] : [o.a, o.b];
}

/**
 * Runs in the text's order, by their first positions: `compare`'s stretches
 * stand in the carried passage's order, and a caller's runs in the order it
 * names them (a projection's come in the text's order from M-PUMP).
 * @template {Run} R
 * @param {R[]} runs
 * @returns {R[]}
 */
const inTextOrder = (runs) => [...runs].sort((x, y) => x.pos - y.pos);
/** the positions of the run a landing stands at — the one its position begins — which its trail entry carries; null where it names no run there */
const widthAt = (/** @type {Run[] | null} */ runs, /** @type {number | null} */ pos) => { const r = runs && runs.find((x) => x.pos === pos); return r ? r.width : null; };
/** a document's head, where a dead end lands — a floating end's follow, a carried passage its text holds none of (foundations §2.3): its first block's first position, else its first position */
const headOf = (/** @type {import('../model/records.js').Doc} */ d) => (d.blocks[0] || { pos: 1 }).pos;

/**
 * The walk moved to a landing's place — to the span holding its position
 * only where its view reads the document at its reading scale, else to the
 * document whole (see the head), to the link's end it names where it names
 * one — the platform's focus with it, save where the place says it stays
 * where it is, and the ring drawn at it where a key made the act.
 * @param {Destination} at
 * @param {boolean | undefined} byKey
 */
function focusOn(at, byKey) {
  void WALK.focusTo(at.addr, at.pos != null && LAYER.atReadingScale(at.addr, at.view.scale) ? at.pos : null, byKey, at.take ?? true, at.end ?? null);
  CAM.markDirty();
}

/**
 * The landing: the walk moved to the place (`focusOn`), and the camera flown
 * to its view. A LEAP and a follow land at reading size; a cursor move lands
 * at the view its entry was left at.
 * @param {Destination} at
 * @param {boolean | undefined} byKey
 * @param {number} ms
 * @returns {Promise<boolean>} the flight landed; false where a later act's flight, a pan or a zoom cut it short (P-CAM's `fly`)
 */
async function land(at, byKey, ms) {
  focusOn(at, byKey);
  const landed = await CAM.fly(at.view, ms);
  CAM.markDirty();
  return landed;
}

/**
 * What a text holds of a passage (BM-HELD's rule; FP-21): the passage
 * `compare`d against the text whole, in parts where
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
 * every stretch in the text's own positions and order, labelled where they
 * are two or more (BM-HELD's `piecesIn`), the landing at piece 1 — the first
 * of them in the step's order, the passage's own — and in one stretch at its
 * `counterpart`; `none` where the text holds no position of it; the refusal
 * met where no answer told — the board refused the read, even in parts, or
 * the page could not read the text (`met`, its whole read's; null where that
 * met none).
 * @param {Span} c the passage carried
 * @param {Doc} d the document landed in, read whole
 * @param {Refusal | null} met the refusal the text's whole read met
 * @returns {Promise<{held: Held, at: number, pos: number, runs: Run[], pieces: Pieces | null} | 'none' | {refused: Refusal | null}>} `at` the passage's own position the run landed at, `pos`, holds
 */
async function reproject(c, d, met) {
  if (d.extent == null) return { refused: met };
  const out = await heldIn(c, d.addr, d.extent);
  if ('refused' in out) return out;
  if (!out.counterparts.length) return 'none';
  const stretches = inTextOrder(out.counterparts.map((h) => ({ pos: h.b, width: h.width, at: h.a - c.pos })));
  const pieces = HELD.piecesIn(stretches, Math.max(1, c.width), showsWithheld(d));
  const first = pieces ? pieces.runs[pieces.order[0]] : { pos: out.counterparts[0].b, at: out.counterparts[0].a - c.pos };
  return { held: out.held, at: c.pos + first.at, pos: first.pos, runs: stretches.map((s) => ({ pos: s.pos, width: s.width })), pieces };
}

/** does a document's held text show withheld text — a run withheld from the reader, under which the rest of a passage may stand? */
const showsWithheld = (/** @type {Doc} */ d) => d.blocks.some((b) => b.kind === 'withheld');
/** the dead end's face as an entry's notice, beside the head a landing stands at (foundations §2.3) */
const floatingNotice = (/** @type {string} */ addr, /** @type {number} */ head) => /** @type {Notice} */ ({ face: 'floating', addr, refusal: null, site: siteAt(addr, head) });

/**
 * A carried passage's landing, from what its reads placed (`reproject`; see
 * the head): at piece 1, every stretch marked, each labelled where they are
 * two or more, what the text holds where that is part of it or all of it in
 * pieces; at the document's head where it holds none, the dead end's face its
 * notice; at the place the LEAP named, unmarked, with the couldn't-tell line,
 * where no answer told.
 * @param {Carry} c
 * @param {Doc} d the document landed in
 * @param {Awaited<ReturnType<typeof reproject>>} held
 * @param {number | null} asked the position the LEAP named
 * @returns {{pos: number | null, at: number | null, runs: Run[] | null, said: Said | null, pieces: Pieces | null, none: boolean}} `at` the passage's own position the landing holds, where it holds any
 */
function carriedLanding(c, d, held, asked) {
  const subject = c.selected ? 'selected' : 'reading';
  if (held === 'none') return { pos: headOf(d), at: null, runs: null, said: null, pieces: null, none: true };
  if ('held' in held) return { pos: held.pos, at: held.at, runs: held.runs, said: HELD.saidOf(held.held, subject, d.addr, showsWithheld(d)), pieces: held.pieces, none: false };
  return { pos: asked, at: null, runs: null, said: HELD.unknownOf(held.refused, subject, d.addr), pieces: null, none: false };
}

/** where a document's held text holds a passage named by identity whole, in one stretch (M-REC's `placedIdentity`); null where it does not */
function wholeAt(/** @type {string} */ addr, /** @type {ISpan[]} */ spans, /** @type {number} */ width) {
  const p = REC.placedIdentity(addr, spans);
  return p.length === 1 && p[0].width >= width ? p[0] : null;
}

/**
 * The version offer at a published landing (FP-21) — its line's, or, where a
 * followed passage floats, the dead end's face's: the landing's document's
 * members, newest first — its chain read to its end (M-PUMP's `probeChain`)
 * — each asked what its text holds of the passage (`holds`), never the text
 * landed in — its own member, or at the bare address its latest — the first
 * that holds all of it in one piece offered where no act was made meanwhile,
 * the dead end's face standing at the landing drawn again with its act
 * (O-FACES' `offered`); the reads stop there, and at the next act. Nothing
 * is offered where the board did not end the chain: the latest that holds it
 * names the chain whole. The offer is a version move (`toVersion`): the
 * member shares the box landed in.
 * @param {number} act the landing's act
 * @param {string} addr the document landed in
 * @param {(member: string) => Promise<((byKey: boolean) => void) | null>} holds the version move to a member whose text holds all of the passage in one piece; null where it does not
 */
async function offerVersion(act, addr, holds) {
  const trunk = documentOf(addr) || addr, d = REC.doc(trunk), place = REC.place(trunk);
  if (!(d.meta ? d.meta.published : !!place && place.kind === 'edition')) return;
  const chain = await PUMP.probeChain(trunk, () => act === made);
  if (!chain || !chain.ended) return;
  const n = chain.n;
  const own = memberOf(addr) ?? n;
  for (let k = n; k >= 1; k--) {
    if (act !== made) return;
    if (k === own) continue;
    const go = await holds(versionAddress(trunk, k));
    if (!go) continue;
    if (act === made && landed) {
      landed = { ...landed, version: k }; versionOffer = go; CAM.markDirty();
      if (landed.floating) FACES.offered(addr, { k, go });
    }
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
/** does a projection's refusal say something of the far document — withheld from the reader, a place the follow lands at with its own withheld words (`landWithheld`), or nothing the board will say of the address, faced in the landing's place, there being nothing to land at? Every other refusal says nothing of it, and the follow lands, its line saying it could not tell */
const ofDocument = (/** @type {Refusal} */ r) => r.kind === 'refused' && (r.name === 'withheld' || r.name === 'doc_not_registered');

/**
 * A passage's runs labelled, read by identity (see the head; BM-HELD's
 * `stretchesOf`, `piecesIn`): each run of the text cut where its bytes break
 * the passage's order, what those stretches hold of it, and their labels
 * where they are two or more — the runs as the text holds them where none of
 * their bytes is the passage's.
 * @param {ISpan} passage
 * @param {Run[]} runs
 * @param {ISpan[][]} ids each run's bytes by identity
 * @param {boolean} withheld the text shows withheld text
 * @returns {{runs: Run[], held: Held, pieces: Pieces | null}}
 */
function runsOf(passage, runs, ids, withheld) {
  const cut = HELD.stretchesOf(passage, runs, ids);
  const held = HELD.heldOf(cut.map((x) => ({ at: x.at, width: x.width })), passage.width, cut.length);
  return { runs: cut.length ? cut.map((x) => ({ pos: x.pos, width: x.width })) : runs, held, pieces: HELD.piecesIn(cut, passage.width, withheld) };
}

/** where a landing in runs stands: piece 1, the first in the step's order, where its runs are labelled; else its first run in the text */
const firstOf = (/** @type {Run[]} */ runs, /** @type {Pieces | null} */ pieces) => (pieces ? pieces.runs[pieces.order[0]].pos : runs[0].pos);

/**
 * What a follow's landing places and says (see the head): its far end's
 * passage where the slot projects into the far document's text now — placed
 * by its bytes' identity through that text's image, read in parts, where the
 * board refuses the projection for its size (M-PUMP's `imageParts`) — every
 * run marked, cut where its bytes break the passage's order and labelled
 * where they are two or more, and what that text holds of it where that is
 * part of it or all of it in pieces, the runs' bytes read by identity against
 * the span the slot stores (`farEnd`; `runsOf`) — or, where they cannot be
 * read, a projection of fewer positions than the passage still a part, its
 * runs unlabelled; no run where it floats; the couldn't-tell line, nothing
 * marked, where no answer told — a projection refused by a name that says
 * nothing of the document, or bytes the board would not read — at the runs
 * where they are known.
 * @param {Shown} s
 * @param {{runs: Run[]} | {refused: Refusal}} proj the projection the follow read
 * @returns {Promise<{runs: Run[] | null, marked: boolean, said: Said | null, pieces: Pieces | null}>}
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
  if (met || !runs) return { runs: null, marked: false, said: HELD.unknownOf(met, 'followed', far), pieces: null };
  if (!runs.length) return { runs, marked: false, said: null, pieces: null };
  const passage = !s.farWhole && s.farEnd ? REC.identityOfEnd(s.farEnd) : null;
  if (!passage) return { runs, marked: true, said: null, pieces: null };
  const withheld = showsWithheld(REC.doc(far));
  const ids = await idsOf(far, runs);
  if ('ids' in ids) { const out = runsOf(passage, runs, ids.ids, withheld); return { runs: out.runs, marked: true, said: HELD.saidOf(out.held, 'followed', far, withheld), pieces: out.pieces }; }
  if (runs.reduce((n, r) => n + r.width, 0) < passage.width) return { runs, marked: true, said: HELD.saidOf({ holds: 'part', places: runs.length }, 'followed', far, withheld), pieces: null };
  return { runs, marked: false, said: HELD.unknownOf(ids.refused, 'followed', far), pieces: null };
}

/**
 * A carried passage's landing's line and offers (see the head): what it
 * says, its runs' labels where they are two or more, the landing at piece 1;
 * the scene with the text it came from, where that text holds the
 * passage whole; at a published landing, the latest member holding it
 * whole, sought once it has landed (`offerVersion`) — a version move whose
 * landing keeps the line of the passage's first held piece here at its
 * counterpart there; and "try again", its read made again (`again`; a LEAP's
 * by `againCarried`), where a retry may tell.
 * @param {number} act the landing's act
 * @param {Carry} c
 * @param {ISpan[]} carried the passage by identity, as the act was made
 * @param {Doc} d the document landed in
 * @param {{pos: number | null, at: number | null, said: Said | null, pieces: Pieces | null, none: boolean}} placed
 * @param {Entry | null} entry the landing's trail entry
 * @param {string | null} link the link the landing names
 * @param {(byKey: boolean) => Promise<void>} [again] the landing's read made again; a LEAP's by default
 */
function sayCarried(act, c, carried, d, placed, entry, link, again = (byKey) => againCarried(c, carried, d.addr, entry, link, placed.pos, byKey)) {
  const addr = d.addr, said = placed.said, pos = placed.pos ?? headOf(d), w = Math.max(1, c.width);
  const offers = !!said && said.state !== 'unknown';
  const source = offers && c.addr !== addr ? (carried.length ? wholeAt(c.addr, carried, c.width) : { pos: c.pos, width: c.width }) : null;
  const pieces = placed.pieces;
  landed = { addr, pos, said, pieces, current: pieces ? pieces.order[0] : 0, floating: placed.none, withheld: false, beside: source ? { a: c.addr, b: addr, held: { posA: source.pos, widthA: source.width, posB: null } } : null, version: null };
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
  const notice = placed.none ? floatingNotice(addr, headOf(d)) : null;
  if (entry) TRAIL.settle(entry, { ...seen(v), pos: placed.pos, width: widthAt(placed.runs, placed.pos), notice });
  if (act !== made) return;
  pinTo(addr);
  arrival = withBytes(link || placed.runs ? { addr, pos: placed.pos ?? 1, runs: placed.runs, link } : null);
  sayCarried(act, c, carried, d, placed, entry, link);
  const flight = land({ addr, pos: placed.pos, view: v }, byKey, 620);
  if (notice) showNotice(notice, true);
  await flight;
}

/**
 * A follow's landing made from what its reads placed (`followed`; see the
 * head): its entry settled at the span — piece 1, where its runs are
 * labelled, else its first run in the text — or the
 * head, the dead end's face its notice where the far end floats, its view
 * left as the reader left it where they took the camera over there; then,
 * where no act was made after `act`, the reading face ended, the arrival
 * outlined where it marks its runs, the link lit, the landing's line and
 * offers said (`sayFollowed`), and — save where the reader took the camera
 * over while the follow was in the air, which only marks — the walk and the
 * camera moved on there from its first leg (`goOn`), or there anew where its
 * line's "try again" made it again.
 * @param {number} act
 * @param {Shown} s
 * @param {Entry | null} entry
 * @param {Awaited<ReturnType<typeof followed>>} placed
 * @param {boolean} byKey
 * @param {Promise<boolean> | null} [first] the follow's first leg, in the air; null where its line's "try again" made it again
 */
async function landFollowed(act, s, entry, placed, byKey, first = null) {
  const far = s.far, l = s.link;
  const runs = placed.runs && placed.runs.length ? placed.runs : null;
  const pos = runs ? firstOf(runs, placed.pieces) : headOf(REC.doc(far)), marked = runs && placed.marked && !s.farWhole ? runs : null;
  const v = viewFor(far, pos);
  /** @type {Notice | null} a floating end: the dead end's face beside the head landed on */
  const notice = placed.runs && !placed.runs.length ? floatingNotice(far, pos) : null;
  if (entry) TRAIL.settle(entry, { ...(takenOver.has(entry) ? {} : seen(v)), pos, width: widthAt(marked, pos), notice });
  if (act !== made) return;
  FACES.endReading();
  pinTo(far);
  arrival = withBytes(runs && placed.marked ? { addr: far, pos, runs: marked, link: l.addr } : null);
  lit = [l.addr];
  sayFollowed(act, s, entry, placed, pos);
  if (first && takenAt === act) { if (notice) showNotice(notice); return; }
  const at = { addr: far, pos, view: v };
  const flight = first ? goOn(act, first, at, byKey, 620) : land(at, byKey, 620);
  if (notice) showNotice(notice, true);
  await flight;
}

/**
 * A follow's landing at a far document withheld from the reader (see the
 * head), its reads having learned it in the air:
 * the claims its face decides C-67's pointer from read first (O-FACES'
 * `prepare`); its entry settled at the document whole — its view left as the
 * reader left it where they took the camera over there — with the face of
 * its own withheld words at its place as the notice; then, where no act was
 * made after `act`, the reading face ended, the box taking the address the
 * link names, the link lit and nothing outlined, the landing saying the
 * document is withheld (`described`), and — save where the reader took the
 * camera over while the follow was in the air, which only shows the face —
 * the walk and the camera moved on to the document from the first leg
 * (`goOn`), the face told there by the landing's description.
 * @param {number} act
 * @param {Shown} s
 * @param {Entry | null} entry
 * @param {boolean} byKey
 * @param {Promise<boolean>} first the follow's first leg, in the air
 */
async function landWithheld(act, s, entry, byKey, first) {
  const far = s.far;
  await FACES.prepare(far);
  const v = viewFor(far, null);
  /** @type {Notice} the document's own withheld words at its place */
  const notice = { face: 'withheld', addr: far, refusal: null, site: placeAt(far) };
  if (entry) TRAIL.settle(entry, { ...(takenOver.has(entry) ? {} : seen(v)), pos: null, width: null, notice });
  if (act !== made) return;
  FACES.endReading();
  pinTo(far);
  arrival = null;
  lit = [s.link.addr];
  landed = { addr: far, pos: headOf(REC.doc(far)), said: null, pieces: null, current: 0, floating: false, withheld: true, beside: null, version: null };
  retry = null; versionOffer = null;
  if (takenAt === act) { showNotice(notice); return; }
  const flight = goOn(act, first, { addr: far, pos: null, view: v }, byKey, 620);
  showNotice(notice, true);
  await flight;
}

/**
 * A follow's landing's line and offers (see the head): what it says, its
 * runs' labels where they are two or more, the landing at piece 1; the
 * scene with the document the follow was made from, where that text holds
 * the far end's passage whole, set level with the run landed at; at a
 * published far document whose text holds part of the passage, all of it in
 * pieces, or none of it — the dead end's face offering it then — the latest
 * member holding it whole, its slot projected into each member and its runs'
 * bytes read, kept nowhere (M-PUMP's `projectedIn`), offered as a version
 * move landing there as a follow does, the far end outlined and its link
 * lit, the line of the run it stands at here, or of the head, kept at its
 * first run there; and "try again", the projection read again and the
 * landing made from it, where a retry may tell.
 * @param {number} act the landing's act
 * @param {Shown} s
 * @param {Entry | null} entry
 * @param {Awaited<ReturnType<typeof followed>>} placed
 * @param {number} pos where the landing stands
 */
function sayFollowed(act, s, entry, placed, pos) {
  const far = s.far, l = s.link, said = placed.said, pieces = placed.pieces;
  const passage = !s.farWhole && s.farEnd ? REC.identityOfEnd(s.farEnd) : null;
  const floating = !!placed.runs && !placed.runs.length;
  const offers = !!said && said.state !== 'unknown' && !!passage;
  const source = offers && passage && s.near !== far ? wholeAt(s.near, [passage], passage.width) : null;
  landed = { addr: far, pos, said, pieces, current: pieces ? pieces.order[0] : 0, floating, withheld: false, beside: source ? { a: s.near, b: far, held: { posA: source.pos, widthA: source.width, posB: pos } } : null, version: null };
  retry = said && said.again ? async (byKey) => {
    const at = made;
    const proj = await PUMP.projectEnd(l.addr, s.farSlot, far);
    if (REC.doc(far).extent == null || REC.doc(far).from < 0) await PUMP.loadWhole(far);
    await landFollowed(at, s, entry, await followed(s, proj), byKey);
  } : null;
  versionOffer = null;
  if ((offers || floating) && passage) void offerVersion(act, far, async (member) => {
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
 * LEAP to a place: the next act — the trail gains the entry as it is made,
 * and the camera leaves at once (see the head): the chrome of the place it
 * leaves ended, the walk on the place it left for, the ring drawn at it where
 * a key made the act, the camera flying there, its reads beside the flight.
 * A landing that names the link it followed outlines every run of the span it
 * landed on and lights that link — it names no end the link was followed
 * from, so the entry it departs records no step (the gate's door, its one
 * caller) — and one naming the passage those runs hold, by identity, outlines
 * them, its bytes read against it as a follow's are (`namedRuns`): each run
 * cut where they break the passage's order, labelled where they are two or
 * more, the landing at piece 1. A document whose text the page does not hold is read whole as the
 * camera flies, its entry a claim while it reads and its reading face
 * standing at the place the camera left for; the camera goes on to the place
 * the read placed; one the board answers for with nothing settles the entry
 * with the fifth cell as its notice where the camera went, faced there. A
 * carried passage is re-projected into the text read (`reproject`, the claim
 * waiting on it too, its reading face standing): the landing is piece 1 there,
 * its counterpart where it stands in one stretch, and every stretch of it
 * the text holds is marked, each labelled where they are two or more, the
 * line saying where that is only part of it, or all of it in pieces; where
 * the text holds none of it, the document's head, faced as a floating end is,
 * the face the entry's notice; where no answer told, the place as asked,
 * unmarked, the line saying it could not tell (`sayCarried`). The
 * entry it departs records the carry (see the head), the passage by the
 * permanent addresses of its bytes as the held image names them as the act
 * is made — none where the image does not cover it, and then no step. A LEAP
 * whose failure is known at the act never leaves, its face at `site`, the
 * arrival standing — the door's link lit; one to
 * an address on a board the plane does not draw reaches for it first
 * (`reachFor`); where no board is held, none leaves, the no-board face at
 * `site` (see the head). Where the reader took the camera over while it was
 * in the air its reads only mark; where an act was made while it read, it
 * goes on nowhere and faces nothing: its read fills its entry alone.
 * @param {string} addr a document address
 * @param {{pos?: number | null, runs?: Run[] | null, how?: 'click' | 'key' | 'leap' | 'follow', link?: string | null, passage?: ISpan | null, carry?: Carry | null, site?: Site | null, push?: boolean, ms?: number, byKey?: boolean}} [opts] `runs` every run of the span landed on, `pos` the first position of one of them, where the landing names a span; `passage` the passage those runs hold, by identity, which labels them (the door's); `carry` the passage a move to another arrangement of the same material carries (foundations §2.3's carry rule; P43), which places the landing in the place of `pos`; `site` where the act was made — a run's bytes, a card's span, a point of the plane — where the face of a failure known at the act stands, and a reaching face, null (the LEAP box) at the viewport's corner; `how` the act, for the flight's length alone — a click on a place flies in 420 ms, every other act in 620 ms; `byKey` a key made the act
 * @returns {Promise<import('../model/records.js').Doc | null>} the document landed in; null where it never left, faced in the place of a landing, an act made while it read took its place, the reader took the camera over, or its flight was cut short before it landed
 */
export async function leapTo(addr, opts = {}) {
  const act = nextAct();
  if (!REC.board()) { FACES.noBoard(opts.site ?? null); return null; }
  let pos = opts.pos ?? null, runs = pos != null && opts.runs ? inTextOrder(opts.runs) : null;
  const link = opts.link ?? null, site = opts.site ?? null, ms = opts.ms ?? (opts.how === 'click' ? 420 : 620);
  const c = opts.carry ?? null, passage = runs ? opts.passage ?? null : null;
  let d = REC.doc(addr);
  let unread = d.extent == null || d.from < 0;
  const fails = known(addr, unread || !!c);
  if (fails) { if (link) lit = [link]; showNotice({ ...fails, site: signed(site) }); return null; }
  /** the door's runs, read against the passage it names where the page holds the text: labelled, the landing at piece 1 */
  let named = passage && runs && !unread ? namedRuns(addr, runs, passage) : null;
  if (named && runs) { runs = named.runs; pos = firstOf(runs, named.pieces); }
  const carried = c ? REC.identityOf(c.addr, c.pos, Math.max(1, c.width)) : [];
  /** @type {Step | null} the carry, as the entry it departs records it: the passage by identity, from the document it was carried from to this one */
  const step = c && carried.length ? { kind: 'carry', from: c.addr, to: addr, spans: carried } : null;
  /** @type {Notice | null} the LEAP's reading notice, where its landing waits on a read — the text unread, or the carried passage's `compare` — at the place its camera leaves for */
  const waiting = unread || c ? { face: 'reading', addr, refusal: null, site: siteAt(addr, pos) } : null;
  const entry = opts.push === false ? null : TRAIL.push({ addr, pos, width: widthAt(runs, pos), view: viewFor(addr, pos), label: null, notice: waiting }, departure(), !!waiting, step);
  /** @type {Refusal | null} the refusal the text's whole read met, which a carried passage's line says it could not tell by */
  let met = null;
  if (unread && !placeable(addr)) {
    const read = await reachFor(act, addr, entry, site);
    if (!read) return null;
    met = read.refused; d = REC.doc(addr); unread = false;
    if (entry) TRAIL.leaveFrom(entry, leavingNow());
  }
  dismissChrome(entry);
  const v0 = viewFor(addr, pos);
  if (!unread && !c) {
    // nothing to read: the landing as the act is made
    if (entry) TRAIL.settle(entry, { ...seen(v0), pos, width: widthAt(runs, pos), notice: null });
    pinTo(addr);
    if (link || named) arrival = withBytes({ addr, pos: pos ?? 1, runs, link });
    lit = link ? [link] : [];
    if (named && pos != null) sayNamed(addr, pos, named);
    const ok = await leave(act, entry, { addr, pos, view: v0 }, opts.byKey, ms);
    endAir(act, ok);
    return ok ? d : null;
  }
  const first = leave(act, entry, { addr, pos, view: v0 }, opts.byKey, ms);
  if (waiting) showNotice(waiting);
  if (unread) { const w = await PUMP.wholeOf(addr); met = w.refused; d = REC.doc(addr); }
  if (d.refused === 'unregistered') {
    if (failed(act, entry, { face: 'unregistered', addr, refusal: null, site: siteAt(addr, pos) }, opts.byKey)) lit = link ? [link] : [];
    return null;
  }
  if (passage && runs && !named) { named = namedRuns(addr, runs, passage); runs = named.runs; pos = firstOf(runs, named.pieces); }
  const placed = c ? carriedLanding(c, d, await reproject(c, d, met), pos) : null;
  if (placed) { pos = placed.pos; runs = placed.runs; }
  const v = viewFor(addr, pos);
  /** @type {Notice | null} a carried passage the text holds none of: the dead end's face beside the head landed on, offering no act */
  const notice = placed && placed.none ? floatingNotice(addr, headOf(d)) : null;
  if (entry) TRAIL.settle(entry, { ...(takenOver.has(entry) ? {} : seen(v)), pos, width: widthAt(runs, pos), notice });
  if (act !== made) return null;
  FACES.endReading();
  pinTo(addr);
  if (link || named || (placed && placed.runs)) arrival = withBytes({ addr, pos: pos ?? 1, runs, link });
  lit = link ? [link] : [];
  if (c && placed) sayCarried(act, c, carried, d, placed, entry, link);
  else if (named && pos != null) sayNamed(addr, pos, named);
  if (takenAt === act) { if (notice) showNotice(notice); return null; }
  const flight = goOn(act, first, { addr, pos, view: v }, opts.byKey, ms);
  if (notice) showNotice(notice, true);
  return (await flight) ? d : null;
}

/**
 * The door's runs read against the passage it names (see `leapTo`): each
 * run's bytes by identity through the text's held image, as a follow's are
 * (`runsOf`) — cut where they break the passage's order and labelled where
 * they are two or more; the runs as named, unlabelled, where the image does
 * not cover them.
 * @param {string} addr
 * @param {Run[]} runs
 * @param {ISpan} passage
 * @returns {{runs: Run[], held: Held | null, pieces: Pieces | null}}
 */
function namedRuns(addr, runs, passage) {
  const ids = runs.map((r) => REC.identityOf(addr, r.pos, r.width));
  return ids.every((x) => x.length) ? runsOf(passage, runs, ids, showsWithheld(REC.doc(addr))) : { runs, held: null, pieces: null };
}

/**
 * What the door's landing says of the passage it names (see `leapTo`): as a
 * follow's — its runs' labels where they are two or more, the landing at
 * piece 1, and what the text holds of it where that is part of it or all of
 * it in pieces — offering nothing.
 * @param {string} addr
 * @param {number} pos where the landing stands
 * @param {{held: Held | null, pieces: Pieces | null}} named
 */
function sayNamed(addr, pos, named) {
  const said = named.held ? HELD.saidOf(named.held, 'followed', addr, showsWithheld(REC.doc(addr))) : null;
  if (!said && !named.pieces) return;
  landed = { addr, pos, said, pieces: named.pieces, current: named.pieces ? named.pieces.order[0] : 0, floating: false, withheld: false, beside: null, version: null };
}

/**
 * Where a version move stands its landing, from its reads (see the head):
 * what the version moved to holds of the passage held (`reproject`) — the
 * line of piece 1 kept at its counterpart there, every stretch outlined and
 * labelled where they are two or more, what it holds where that is part of it
 * or all of it in pieces; where
 * it holds none of it, the passage's line taken by the counterpart of the
 * position the two versions share nearest the passage (SC's `nearest`, over
 * `compare` of the two whole, in parts where the board refuses it for its
 * size), else by the version's head where they share none, the dead end's
 * face; where no answer told, the head, unmarked, with the couldn't-tell line.
 * @param {Carry} c the passage held, in the version the box shows
 * @param {string} was the version the box shows
 * @param {Doc} d the version moved to, read whole
 * @param {Refusal | null} met the refusal its whole read met
 * @returns {Promise<{from: number, pos: number, at: number | null, runs: Run[] | null, said: Said | null, pieces: Pieces | null, none: boolean}>} `from` the position in `was` whose line keeps its screen line; `pos` the one in `d` that takes it
 */
async function swapped(c, was, d, met) {
  const subject = c.selected ? 'selected' : 'reading', head = headOf(d);
  const held = await reproject(c, d, met);
  if (held === 'none') {
    const e = REC.doc(was).extent;
    const out = e && d.extent ? await PUMP.compareParts({ doc: was, pos: 1, width: e }, { doc: d.addr, pos: 1, width: d.extent }) : null;
    const near = out && 'pairs' in out ? SCENE.nearest(out.pairs, c.pos) : null;
    return { from: c.pos, pos: near ? near.b : head, at: null, runs: null, said: null, pieces: null, none: true };
  }
  if ('held' in held) return { from: held.at, pos: held.pos, at: held.at, runs: held.runs, said: HELD.saidOf(held.held, subject, d.addr, showsWithheld(d)), pieces: held.pieces, none: false };
  return { from: c.pos, pos: head, at: null, runs: null, said: HELD.unknownOf(held.refused, subject, d.addr), pieces: null, none: false };
}

/**
 * A version move's landing, in place (see the head): a selection standing in
 * the version left ended with its text (O-SELECTION's), the box's article
 * set again as the version moved to with the line `from` stood on taken by
 * `pos`'s (T-LAYER's `holdAcross`) — the camera where it stands — the box
 * taking that version, the passage outlined where the version holds it and
 * the link lit, and the walk moved to the landing, the ring drawn at it where
 * a key made the act — the platform's focus carried there only where the
 * mirror held it, where the reader took the camera over while the move read
 * (`take` false).
 * @param {string} was the version the box showed
 * @param {Doc} d the version moved to
 * @param {{from: number, pos: number, runs: Run[] | null}} placed
 * @param {string | null} link
 * @param {boolean | undefined} byKey
 * @param {boolean} [take] the landing takes the platform's focus wherever it stood
 */
async function landInPlace(was, d, placed, link, byKey, take = true) {
  const addr = d.addr, sel = SEL.selected();
  if (sel && sel.addr === was && was !== addr) SEL.clear();
  LAYER.holdAcross(was, addr, { from: placed.from, to: placed.pos });
  pinTo(addr);
  arrival = withBytes(placed.runs || link ? { addr, pos: placed.pos, runs: placed.runs, link } : null);
  lit = link ? [link] : [];
  CAM.markDirty();
  await WALK.focusTo(addr, LAYER.atReadingScale(addr, CAM.destination().scale) ? placed.pos : null, byKey, take);
}

/**
 * A version move (see the head; FP-22): the next act — the overlays close
 * and the trail
 * gains the entry as it is made, a claim while its reads are out, recording
 * the passage carried by identity, its reading face standing at `site` — to
 * another version of the box the reader stands in: `addr` read whole where
 * the page does not hold its text, then where its text holds the passage
 * held (`swapped`) — or where a landing's line already read it (`placed`) —
 * and, where no act was made meanwhile, the landing made in place
 * (`landInPlace`): the camera stays, the box's text replaced, the passage's
 * line kept, its four states said as a carried passage's are — the line, its
 * offers, its "try again" landing in place again — the dead end's face where
 * the version holds none of the passage, the entry's notice. A version the
 * board says nothing of is faced as a LEAP faces it, in place. The camera
 * being at its destination already, the move is in the air from the act to
 * its landing in place (see the head): keys wait for it, and where the reader
 * takes the camera over meanwhile the landing leaves the platform's focus
 * where it stands. Where an act was made while it read, it lands nowhere: its
 * read fills its entry alone, at the view it was made from.
 * @param {string} addr the version moved to: a version address, or the plain address, the trunk head
 * @param {{carry?: Carry | null, placed?: Placing | null, site?: Site | null, byKey?: boolean}} [opts] `carry` the reader's held passage, in the version the box shows — the selection, else the first passage in view (O-VERSIONS); `placed` the landing a landing's version offer has read already; `site` where the act was made, its reading face's place; `byKey` a key made the act
 * @returns {Promise<Doc | null>} the version landed in; null where it faced in the place of a landing, or an act made while it read took its place
 */
export async function toVersion(addr, opts = {}) {
  const act = nextAct();
  const departed = departure();
  const was = shownIn(addr), site = signed(opts.site ?? null), given = opts.placed ?? null;
  const c = opts.carry && opts.carry.addr === was ? opts.carry : null;
  const spans = given ? given.spans : c ? REC.identityOf(c.addr, c.pos, Math.max(1, c.width)) : [];
  /** @type {Step | null} the move, as the entry it departs records it: the passage carried by identity, from the version left to this one */
  const step = spans.length ? { kind: 'carry', from: was, to: addr, spans } : null;
  /** @type {Notice} */
  const waiting = { face: 'reading', addr, refusal: null, site };
  const entry = TRAIL.push({ addr, pos: null, width: null, view: departed.view, label: null, notice: waiting }, departed, true, step);
  dismissChrome(entry);
  takeOff(act, entry);
  showNotice(waiting);
  let d = REC.doc(addr), met = null;
  if (d.extent == null || d.from < 0) { const w = await PUMP.wholeOf(addr); met = w.refused; d = REC.doc(addr); }
  if (d.refused === 'unregistered') {
    /** @type {Notice} */
    const notice = { face: 'unregistered', addr, refusal: null, site };
    TRAIL.settle(entry, { notice });
    if (act === made) showNotice(notice);
    endAir(act, false);
    return null;
  }
  const head = { from: headOf(REC.doc(was)), pos: headOf(d), at: null, runs: null, said: null, pieces: null, none: false };
  const placed = given ? { from: given.from, pos: given.to, at: null, runs: inTextOrder(given.runs), said: null, pieces: null, none: false } : c ? await swapped(c, was, d, met) : head;
  const notice = placed.none ? floatingNotice(addr, placed.pos) : null;
  TRAIL.settle(entry, { ...(takenOver.has(entry) ? {} : { view: departed.view, reading: departed.reading }), pos: placed.pos, width: widthAt(placed.runs, placed.pos), notice });
  if (act !== made) return null;
  FACES.endReading();
  if (c && !given) sayCarried(act, c, spans, d, placed, entry, null, (byKey) => againVersion(c, spans, was, addr, entry, byKey));
  const landing = landInPlace(was, d, placed, given ? given.link : null, opts.byKey, takenAt !== act);
  if (notice) showNotice(notice, true);
  await landing;
  endAir(act, true);
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
  const notice = placed.none ? floatingNotice(addr, placed.pos) : null;
  TRAIL.settle(entry, { ...seen(CAM.destination()), pos: placed.pos, width: widthAt(placed.runs, placed.pos), notice });
  if (act !== made) return;
  sayCarried(act, c, spans, d, placed, entry, null, (k) => againVersion(c, spans, was, addr, entry, k));
  const landing = landInPlace(addr, d, { ...placed, from: stood }, null, byKey);
  if (notice) showNotice(notice, true);
  await landing;
}

/**
 * A newer version's arrival (see the head; foundations §3.2; FP-22): a feed
 * row publishing `D.(k+1)`, the
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
 * Follow: the far end of a drawn link — an act made as it is pressed, the
 * card or scene still reading ended even
 * where the link names no far document and it faces at once; its entry a
 * claim on the trail as it is made, and its camera leaving at once for the
 * far document (see the head) — reported to LK's visited set as it leaves,
 * the chrome of the place it leaves ended, the walk on the far document, its
 * reading face standing there (O-FACES' `reading`); the far document
 * consulted, the slot projected into its current text, its text read where the page
 * holds none; the claim settled at that span and the camera going on there
 * — to piece 1, where the text holds it in several runs — the
 * arrival outlined on it — on every run's positions where the link names a
 * passage, each run labelled where they are two or more, at its first
 * position where it names the document whole — and the
 * link lit, its line saying where the far text holds only part of the
 * passage, or all of it in pieces (`followed`, `landFollowed`). A
 * floating end, one the slot projects to nothing in the far
 * document's text, settles the claim at that document's head and lands there,
 * the link lit and nothing outlined, with the dead end's face standing at the
 * head landed on, the entry's notice (foundations §2.3). A projection the
 * board refuses by a name that says nothing of the far document lands there
 * too, unmarked, the link lit, its line saying it could not tell why — the
 * projection's own refusal, whatever other read met one meanwhile — and one
 * refused for its size is placed through the far text's image read in parts.
 * A far document the board withholds from the reader — a read of it refused
 * `withheld`, or the projection refused for it — learned in the air lands at
 * that document whole, its own withheld words standing at its place as the
 * claim's notice, the link lit and nothing outlined (`landWithheld`). A dead
 * reference — no slot projected into it, a read the board
 * refuses with the document, the projection refused for it — learned in the
 * air is faced where the camera went (`failed`), the claim settled with that
 * face as its notice there, and the link lit (B1-S8). One known at the act —
 * a withheld far document among them only where its text is on screen
 * (`known`), its face captioned by the follow — and a link naming no far
 * document never leave (see the head): no entry, no read, the arrival
 * standing, the link not counted as followed, and lit where it names a far
 * document, its face at the act's site (foundations
 * §3.1, F-G3): the link's own bytes in its near document — the link the
 * anatomy card offering the follow is conjured at, inside the selection the
 * follow slot acts on — following them as the camera moves, in the place of
 * the overlay it was pressed from, the chrome under it standing. The control
 * the follow was pressed on, the anatomy card's follow or a "which" list's
 * row, is never its site. A far document on a board the plane does not draw
 * is reached for first (`reachFor`). Where the reader took the camera over
 * while it was in the air its reads only mark; where an act was made while it
 * read, it goes on nowhere, faces nothing and lights nothing: its read fills
 * its entry alone. The entry it departs records the follow (see the head):
 * the link, the end it was made at, and the far end by identity — its slot's
 * stored spans.
 * @param {Shown} s the link as drawn at its near document
 * @param {boolean} [byKey] a key made the follow
 */
export async function follow(s, byKey = false) {
  const act = nextAct();
  const l = s.link;
  const far = s.far;
  /** @type {Site} where the follow is made — the link's own bytes: a face known at the act, and a reaching face, stand there */
  const site = { span: { addr: s.near, pos: s.pos, width: s.width }, sign: s.near };
  if (!far) { FACES.invalidFollow(site); return; }
  const fails = known(far, true, { link: l.addr, slot: s.farSlot });
  if (fails) {
    lit = [l.addr];
    if (fails.face === 'withheld') showNotice({ ...fails, site: unsigned(site) }, false, `${t('B1.follow')} · ${far}`);
    else showNotice({ ...fails, site });
    return;
  }
  /** @type {Notice} the follow's reading notice: at the far document, where its camera leaves for */
  const waiting = { face: 'reading', addr: far, refusal: null, site: siteAt(far, null) };
  /** @type {Step} the follow, as the entry it departs records it */
  const step = { kind: 'follow', link: l.addr, near: s.near, key: s.key, far, spans: s.farWhole ? null : slotSpans(s) };
  const entry = TRAIL.push({ addr: far, pos: null, width: null, view: viewFor(far, null), label: null, notice: waiting }, departure(), true, step);
  if (!placeable(far)) {
    if (!(await reachFor(act, far, entry, site))) return;
    TRAIL.leaveFrom(entry, leavingNow());
  }
  dismissChrome(entry);
  LK.follow(l);
  const first = leave(act, entry, { addr: far, pos: null, view: viewFor(far, null) }, byKey, 620);
  showNotice(waiting);
  /** the follow's read brought a failure, learned in the air: faced where the camera went, the link lit where no act was made after it */
  const faced = (/** @type {Notice} */ notice) => { if (failed(act, entry, notice, byKey)) lit = [l.addr]; };
  const fd = REC.doc(far);
  if (fd.refused !== 'unregistered' && fd.extent == null) await PUMP.loadWhole(far);
  if (REC.doc(far).refused === 'unregistered') { faced({ ...waiting, face: 'unregistered' }); return; }
  if (REC.doc(far).refused === 'withheld') { await landWithheld(act, s, entry, byKey, first); return; }
  const proj = await PUMP.projectEnd(l.addr, s.farSlot, far);
  if ('refused' in proj && ofDocument(proj.refused)) {
    if (proj.refused.name === 'withheld') await landWithheld(act, s, entry, byKey, first);
    else faced({ ...waiting, face: 'refused', refusal: proj.refused });
    return;
  }
  const d = REC.doc(far);
  if (d.extent == null || d.from < 0) await PUMP.loadWhole(far);
  if (REC.doc(far).refused === 'unregistered') { faced({ ...waiting, face: 'unregistered' }); return; }
  if (REC.doc(far).refused === 'withheld') { await landWithheld(act, s, entry, byKey, first); return; }
  await landFollowed(act, s, entry, await followed(s, proj), byKey, first);
}

/**
 * The step a reading scene is opened from, as the entry it departs records it
 * (see the head; N-TRAIL's `SceneStep`): a link's end, at the document the
 * link is drawn at; or a passage, by the permanent addresses of its bytes as
 * the held image names them as the act is made — none where the image does
 * not cover it, and none where the scene is opened from neither.
 * @param {{shown: Shown} | {passage: Span} | null} from
 * @returns {Step | null}
 */
function sceneStep(from) {
  if (!from) return null;
  if ('shown' in from) return { kind: 'scene', near: from.shown.near, link: from.shown.link.addr, key: from.shown.key, spans: null };
  const p = from.passage, spans = REC.identityOf(p.addr, p.pos, Math.max(1, p.width));
  return spans.length ? { kind: 'scene', near: p.addr, link: null, key: null, spans } : null;
}

/**
 * A reading scene opened beside the place the reader stands at (see the
 * head; FP-25): the next act, its entry pushed as the act is made — the
 * departure from the cursor's entry re-taken there with the step the scene is
 * opened from, the entries ahead dropped — reaching while SC's reads are out,
 * the camera still; as the scene shows, the chrome of the place it leaves
 * ended (`dismissChrome`), the entry the one the reader stands at from now.
 * Where a later act took its place or its opening ended, its entry is given
 * back; where its reads were refused, given back too, the refusal faced at
 * the act's site. Where no board is held, the act answered where it was made
 * (FP-35).
 * @param {string} a the document its first pane opens on: the reader's, save at a landing's line, the source of the passage landed
 * @param {string} b the one its second pane opens on
 * @param {import('../scene/scene.js').Held} [held] the passage the opener holds, which the scene sets level
 * @param {{beside?: 'a' | 'b', from?: {shown: Shown} | {passage: Span} | null, site?: Site | null}} [opts] `beside` the pane holding the document opened beside the reader's, the entry's address — the second where none is named; `from` the link's end or the passage the scene is opened from, which Back lights (`sceneStep`); `site` where the act was made. The scene takes the focus however the act was made (SC's)
 * @returns {Promise<boolean>} the scene shows
 */
export async function toScene(a, b, held = {}, opts = {}) {
  const act = nextAct();
  if (!REC.board()) { FACES.noBoard(opts.site ?? null); return false; }
  const departed = departure(), addr = opts.beside === 'a' ? a : b;
  const entry = TRAIL.push({ addr, pos: null, width: null, view: departed.view, label: null, notice: null, scene: { a, b, held, left: null } }, departed, false, sceneStep(opts.from ?? null));
  reach = { act, addr, entry };
  const out = await SCENE.open(a, b, held, { leaving: () => { reach = null; dismissChrome(entry); } });
  if (out.shown) return true;
  if (!reach || reach.act !== act) return false;
  reach = null;
  TRAIL.giveBack(entry);
  if (out.refused) FACES.showRefusal(signed(opts.site ?? null), out.refused, addr);
  return false;
}

/**
 * The reading scene's own end (see the head) — Esc, the bar's ×, zoom-out, ←
 * (N-KEYS', SC's): Back, from the entry the scene was opened as; where the
 * cursor stands on no such entry, or on none behind it, the scene ended where
 * it stands with no trail move.
 * @param {boolean} [byKey] a key made the act
 */
export function closeScene(byKey = false) {
  const e = TRAIL.current();
  if (SCENE.isOpen() && e && e.scene && TRAIL.canBack()) { void back(byKey); return; }
  SCENE.close();
  CAM.markDirty();
}

/** HOME's place and view: the acting account's region at mid scale; a guest's the board's extent (R92 rider (c)) */
function homeFrame() {
  const s = REC.session(), b = REC.board();
  if (s && s.account) return { addr: s.account, view: CAM.viewForCell(accountCell(s.account), 0.85) };
  const node = b ? nodeOf(b.origin) : '1';
  return { addr: node, view: CAM.viewForCell(boardCell(node), 0.92) };
}

/**
 * HOME — the acting account's region at mid scale; a guest's the board's
 * extent (R92 rider (c)); where no board is held, the act answered where it
 * was made, why and what still works (see the head)
 * @param {boolean} [byKey] a key made the act
 */
export async function home(byKey = false) {
  const act = nextAct();
  if (!REC.board()) { FACES.noBoard(null); return; }
  const departed = departure();
  const h = homeFrame();
  const entry = TRAIL.push({ addr: h.addr, pos: null, width: null, view: h.view, label: t('F.level.home'), notice: null }, departed);
  dismissChrome(entry);
  endAir(act, await leave(act, entry, { addr: h.addr, pos: null, view: h.view }, byKey, 700));
}

/**
 * The launch frame — HOME (foundations §2.2) — set without a flight, and the
 * trail's first entry (W-01), so the
 * first teleport re-takes its view as it departs and Back returns to it. The
 * landing puts the platform's focus on the walk's element with the ring out
 * (the focus record's rule 21), so the first Tab moves on from it and a
 * screen reader lands on the place the launch names. Where no board is held
 * it names none (see the head): no entry is pushed, and the walk's root,
 * saying why, takes the focus.
 */
export async function launch() {
  const h = homeFrame();
  CAM.set(h.view);
  if (REC.board()) here = TRAIL.push({ addr: h.addr, pos: null, width: null, view: h.view, label: t('F.level.home'), notice: null }, null);
  await WALK.focusTo(h.addr, null);
  CAM.markDirty();
}

/**
 * WHOLE BOARD — the board the camera is over, at the clamp (law 13); where
 * no board is held, the act answered where it was made (see the head)
 * @param {boolean} [byKey] a key made the act
 */
export async function wholeBoard(byKey = false) {
  const act = nextAct();
  if (!REC.board()) { FACES.noBoard(null); return; }
  const departed = departure();
  const node = boardNode();
  const target = CAM.viewForCell(boardCell(node), 0.92);
  const entry = TRAIL.push({ addr: node, pos: null, width: null, view: target, label: t('L.whole-board'), notice: null }, departed);
  dismissChrome(entry);
  endAir(act, await leave(act, entry, { addr: node, pos: null, view: target }, byKey, 700));
}

/**
 * An account's region at mid scale — a teleport whatever reaches it: a LEAP
 * to the account's address or its level, Enter on it, a click on it at far
 * (foundations §2.2); where no board is held, the act answered where it was
 * made (see the head).
 * @param {string} acct
 * @param {boolean} [byKey] a key made the act
 */
export async function toAccount(acct, byKey = false) {
  const act = nextAct();
  if (!REC.board()) { FACES.noBoard(null); return; }
  const departed = departure();
  const target = CAM.viewForCell(accountCell(acct), 0.85);
  const entry = TRAIL.push({ addr: acct, pos: null, width: null, view: target, label: null, notice: null }, departed);
  dismissChrome(entry);
  endAir(act, await leave(act, entry, { addr: acct, pos: null, view: target }, byKey, 400));
}

/** does the camera stand at a view: its centre within half a pixel of the view's, its scale the view's */
const atView = (/** @type {View} */ v) => { const d = CAM.destination(); return Math.abs(d.x - v.x) * d.scale < 0.5 && Math.abs(d.y - v.y) * d.scale < 0.5 && Math.abs(d.scale / v.scale - 1) < 1e-3; };

/**
 * A walk's moment unfolded over the view its walk showed it over (O-FACES'
 * `unfold`; FP-36): the act counted as it is made — a card or scene
 * still reading ended, a jump in the air abandoned, so no read it left
 * answers over the face — and, where the camera is bound elsewhere, a
 * teleport there as an account's is: its trail entry taken at the act, the
 * chrome of the place it leaves ended, the walk re-taken on the place and the
 * camera flown to the view, the platform's focus left where the moment's face
 * puts it. Where no board is held the camera alone is flown back: the view
 * stands on no place an entry or the walk could name (see the head).
 * @param {{addr: string, view: View}} at the place the walk's trail entry named and the view the camera was bound for
 * @param {boolean} [byKey] a key made the act
 */
export async function toView(at, byKey = false) {
  const act = nextAct();
  if (atView(at.view)) return;
  if (!REC.board()) { await CAM.fly(at.view, 400); CAM.markDirty(); return; }
  const departed = departure();
  const entry = TRAIL.push({ addr: at.addr, pos: null, width: null, view: at.view, label: null, notice: null }, departed);
  dismissChrome(entry);
  endAir(act, await leave(act, entry, { addr: at.addr, pos: null, view: at.view, take: false }, byKey, 400));
}

/** the node of the board the page opened on — every clean notebook is node 1 */
export function boardNode() { return '1'; }
function nodeOf(/** @type {string} */ _origin) { return '1'; }

/**
 * The light a cursor move makes, from the entry it left to the one it
 * reached (see the head): one entry back, Back's — where the step the entry
 * reached records began, a reading scene's the link's end or the passage it
 * was opened from; one entry ahead, Forward's — what the step the entry left
 * records marked on arrival, a reading scene's nothing, the scene reopening
 * there; none for a move across two entries or more, nor across an entry
 * that records no step.
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
  if (step.kind === 'scene') {
    if (!back) return null;
    if (step.link && step.key) return { back, link: step.link, end: { addr: step.near, link: step.link, key: step.key }, passage: null };
    return step.spans ? { back, link: null, end: null, passage: { addr: step.near, spans: step.spans } } : null;
  }
  return { back, link: step.link, end: back ? { addr: step.near, link: step.link, key: step.key } : null, passage: back ? null : { addr: step.far, spans: step.spans } };
}

/**
 * Where Back returns the walk: the link's end the follow was made
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
 * move reached holds (FP-25): the arrival the entry keeps restored as the
 * reader left it (see the head; FP-21) — its outline, what its landing
 * said, its runs' labels and the run it stood at, and none of its offers that
 * read — the camera leaving at once for its view, placed again where the
 * document it read was set since (`returning`), the walk where Back's light
 * returns it (`returnTo`), else on the run the restored landing stood at,
 * else where it stood as the reader left the entry, placed again likewise,
 * else on its place, and its notice shown again — a failure's where the
 * camera went, the dead end's told by the restored landing's description
 * where it describes it; the move's light lit (`lightOf`), and no link of the
 * entry's own: the one the move crossed alone. Where the page holds none of
 * the text the entry's view read or its walk stood in — a feed row dropped it
 * while the reader was away — the camera leaves for the view the entry was
 * left at and goes on once that text's read answers (`placeRead`). An entry
 * still reading shows its reading face at the place the camera left for, and
 * once its read is answered the move goes on to what it brought — the place
 * it placed, or the face it met, faced there as a failure learned in the air
 * is — save where an act was made after the move, which ends it there, and
 * where the reader took the camera over meanwhile, which shows what it
 * brought and moves nothing. An entry whose document is covered lands on the
 * covered box framed whole, its withheld face standing there (see the head;
 * `coverOf`), the read that tells it made first beside the flight where the
 * page holds nothing yet of a document the class it left could read
 * (`coverRead`). An entry a reading scene was opened as reopens the scene
 * (`sceneAt`).
 * @param {Entry} e the entry the move reached
 * @param {number} act the move's count
 * @param {boolean} byKey a key made the move
 * @param {Light | null} l the move's light
 */
async function landAtCursor(e, act, byKey, l) {
  if (e.scene) { await sceneAt(e, act, byKey); return; }
  const answer = TRAIL.pending(e);
  arrival = e.kept ? e.kept.arrival : null; landed = e.kept ? e.kept.landed : null;
  light = l; lit = l && l.link ? [l.link] : [];
  if (!answer) pinTo(e.addr);
  const cover = answer ? null : coverOf(e);
  const at = answer || cover ? null : returning(e), view = at ? at.view : e.view;
  const back = l && l.back ? returnTo(l, view) : null;
  const first = leave(act, e, cover === 'covered' ? coveredAt(e.addr) : back ? { ...back, view } : { ...walkOf(e, at), view }, byKey, 500);
  if (e.notice) showNotice(e.notice, !!landed && (landed.floating || landed.withheld) && landed.addr === e.notice.addr);
  if (cover === 'covered') showCover(e.addr);
  if (!answer) {
    if (cover === 'unread') await coverRead(act, e, first, byKey);
    else if (!cover && !at) await placeRead(act, e, first, byKey);
    else endAir(act, await first);
    return;
  }
  await answer;
  if (act !== made) return;
  FACES.endReading();
  const n = e.notice;
  if (n && n.face !== 'floating' && n.face !== 'withheld') { failed(act, null, n, byKey); return; }
  pinTo(e.addr);
  if (takenAt === act) { if (n) showNotice(n); return; }
  const then = returning(e);
  const flight = goOn(act, first, { ...walkOf(e, then), view: then ? then.view : e.view }, byKey, 500);
  if (n) showNotice(n);
  await flight;
}

/**
 * A cursor move reaching the entry a reading scene was opened as (see the
 * head): nothing marked or lit, no box's version changed (FP-22); the camera
 * leaving at once for the view under the scene, placed again where the
 * document it read was set since (`returning`), the walk re-taken where it
 * stood without the platform's focus; and the scene reopened as the reader
 * left it beside the flight (SC's `reopen`), which takes the focus — save
 * where an act was made after the move, which ends it there; a refusal its
 * reads met faced at the viewport's corner, the entry standing.
 * @param {Entry} e the entry the move reached
 * @param {number} act the move's count
 * @param {boolean} byKey a key made the move
 */
async function sceneAt(e, act, byKey) {
  const o = /** @type {import('./trail.js').Opened} */ (e.scene);
  arrival = null; landed = null; light = null; lit = [];
  const at = returning(e), view = at ? at.view : e.view;
  const first = leave(act, e, { ...walkOf(e, at), view, take: false }, byKey, 500);
  const out = await SCENE.reopen(o);
  if (act !== made) return;
  if (!out.shown && out.refused) FACES.showRefusal(null, out.refused, e.addr);
  endAir(act, await first);
}

/** @typedef {{addr: string, pos: number | null, end: End | null}} WalkTo where a cursor move puts the walk: a place, the position in it, and the link's end there */

/**
 * Where a cursor move reaching an entry lands (see `landAtCursor`): the
 * view the entry was left at, placed again where the document that view read
 * was set since — a measure that moved, a text an edit or a feed row
 * changed, another version its box shows — so the passage the reader left
 * keeps its place and its size on screen, and the view itself where it stands
 * where it stood (T-LAYER's `keptAt`); and where the walk stood as the reader
 * left it, placed again likewise (`stoodAgain`). Null where the page holds
 * none of the text either names: a read brings it first (`placeRead`).
 * @param {Entry} e
 * @returns {{view: View, walk: WalkTo | null} | null}
 */
function returning(e) {
  const view = e.reading ? LAYER.keptAt(e.view, e.reading) : e.view;
  const walk = e.stood ? stoodAgain(e.stood) : null;
  return view && (walk || !e.stood) ? { view, walk } : null;
}

/**
 * Where the walk stood as the reader left an entry (`Stood`), in the text its
 * box shows now: its byte where that text's held image places it (M-REC's
 * `placedIdentity`), else its position, at the link's end it stood on; the
 * document whole where it stood on it so; null where the page holds none of
 * that text.
 * @param {Stood} s
 * @returns {WalkTo | null}
 */
function stoodAgain(s) {
  const addr = shownIn(s.addr);
  if (s.pos == null) return { addr, pos: null, end: null };
  const d = REC.has(addr) ? REC.doc(addr) : null;
  if (!d || d.from < 0) return null;
  const at = s.ids.length ? REC.placedIdentity(addr, s.ids) : [];
  return { addr, pos: at.length ? at[0].pos : s.pos, end: s.end };
}

/**
 * Where a cursor move puts the walk, Back's light apart (`returnTo`): on the
 * run the restored landing stood at, else where it stood as the reader left
 * the entry, placed again (`returning`), else on the entry's place.
 * @param {Entry} e
 * @param {{walk: WalkTo | null} | null} at
 * @returns {WalkTo}
 */
function walkOf(e, at) {
  if (landed && landed.addr === shownIn(e.addr)) return { addr: e.addr, pos: landed.pos, end: null };
  return at && at.walk ? at.walk : { addr: e.addr, pos: e.pos, end: null };
}

/**
 * A cursor move reaching an entry whose view read, or whose walk stood in, a
 * document the page holds none of the text of now (see `landAtCursor`): its
 * read made beside the flight to the view the entry was left at, as a LEAP to
 * an unread document makes it; once it answers, where no act was made and
 * the reader took nothing over meanwhile, the camera going on to that view
 * placed again and the walk to where it stood (`returning`); else the move
 * landing where its flight lands.
 * @param {number} act the move's count
 * @param {Entry} e the entry the move reached
 * @param {Promise<boolean>} first the move's flight
 * @param {boolean} byKey a key made the move
 */
async function placeRead(act, e, first, byKey) {
  for (const addr of new Set([e.reading, e.stood].flatMap((x) => (x ? [shownIn(x.addr)] : [])))) {
    const d = REC.has(addr) ? REC.doc(addr) : null;
    if (!d || d.from < 0) await PUMP.wholeOf(addr);
  }
  if (act !== made || takenAt === act) return;
  const at = returning(e);
  if (!at) { endAir(act, await first); return; }
  await goOn(act, first, { ...walkOf(e, at), view: at.view }, byKey, 500);
}

/**
 * Where a cursor move reaching an entry meets a cover (see the head): the
 * entry's document covered — held `withheld` of a document the class the
 * page left could read (M-REC's `covered`), its read at the page's class
 * answered — or one a read must tell first ('unread'): a cover the change of
 * class made whose read is still owed (M-REC's `owed`), which that read
 * confirms or lifts, or one the class it left could read that the page holds
 * nothing of yet; null for every other entry, and for one holding a notice,
 * which shows its own face.
 * @param {Entry} e
 * @returns {'covered' | 'unread' | null}
 */
function coverOf(e) {
  if (e.notice || kindOf(e.addr) !== 'document') return null;
  if (REC.owed(e.addr)) return 'unread';
  if (REC.covered(e.addr)) return 'covered';
  const d = REC.has(e.addr) ? REC.doc(e.addr) : null;
  return REC.couldRead(e.addr) && (!d || (d.extent == null && !d.refused)) ? 'unread' : null;
}

/** a covered document's landing (see the head): its box framed whole at the reading size — the entry's view frames columns the cover does not draw — the walk on the document */
const coveredAt = (/** @type {string} */ addr) => ({ addr, pos: null, view: viewFor(addr, null) });
/** a covered document's face at its box's head (see the head): the document-level withheld face, its sign-in act the way back (O-FACES' `withheld`), standing there whatever the camera does */
function showCover(/** @type {string} */ addr) { const site = placeAt(addr); FACES.withheld(addr, site, { follow: pointTo(site) }); CAM.markDirty(); }

/**
 * A cursor move reaching an entry whose document a read must tell first —
 * a cover still owed its read, or one the class the page left could read and
 * the page holds nothing of yet (see the head; `coverOf`): its read made
 * beside the flight, as a LEAP to an unread document makes it; where it
 * answers the document covered and no act was made meanwhile, the camera
 * going on to the covered box framed whole, its face standing there — the
 * face alone where the reader took the camera over — else the move landing
 * where its flight lands.
 * @param {number} act the move's count
 * @param {Entry} e the entry the move reached
 * @param {Promise<boolean>} first the move's flight
 * @param {boolean} byKey a key made the move
 */
async function coverRead(act, e, first, byKey) {
  await PUMP.wholeOf(e.addr);
  if (act !== made) return;
  if (!REC.covered(e.addr)) { endAir(act, await first); return; }
  if (takenAt === act) { showCover(e.addr); return; }
  const flight = goOn(act, first, coveredAt(e.addr), byKey, 500);
  showCover(e.addr);
  await flight;
}

/**
 * A cursor move: the cursor moved by the trail's own move, landing on the
 * view left, the move's light lit where it crosses one step (`lightOf`). A
 * jump reaching gives its entry back before the move reads the trail, and
 * Back abandons it and does nothing more: the camera never left the entry it
 * was made from (see the head). A move one entry back from the entry a
 * reading scene was opened as, the scene standing, is its close, counted
 * (`closed`).
 * @param {(departed: Departure) => (Entry | null)} move N-TRAIL's move
 * @param {boolean} byKey a key made the act
 * @param {boolean} [abandons] the move is Back, which abandons a jump reaching
 * @returns {Promise<boolean>} the cursor moved, or the jump reaching was abandoned
 */
async function moveCursor(move, byKey, abandons = false) {
  if (reach) { giveUp(); if (abandons) { nextAct(); return true; } }
  const left = TRAIL.current(), from = TRAIL.cursorIndex(), standing = SCENE.isOpen() && !!left && !!left.scene;
  const e = move(departure());
  if (!e) return false;
  const act = nextAct();
  if (standing && TRAIL.cursorIndex() === from - 1) closes++;
  dismissChrome(e);
  await landAtCursor(e, act, byKey, lightOf(left, e, TRAIL.cursorIndex() - from));
  return true;
}

/**
 * Back: the cursor one entry back, lighting where the step it crossed
 * began — the link the follow from that entry took, or the passage the LEAP
 * from it carried — whether or not the entry it leaves still reads, for the
 * reader stood where the step began (see the head); a jump reaching
 * abandoned in its place.
 * @param {boolean} [byKey] a key made the act
 */
export function back(byKey = false) { return moveCursor(TRAIL.back, byKey, true); }
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
