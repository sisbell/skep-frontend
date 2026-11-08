// L-LINE — the one line (the structure record §3.2; foundations §3.1, §3.3;
// S-9 (a)). Layer 2. Engine-bound. A control rebuilt from state (FP-13).
// State: the transient segment and its expiry (the next act), the act
// holding the line's one Tab stop (`stop`), the last render's words that are
// said once as they arrive, when the page's class last changed with its
// message not yet said (`changedAt`), the reading scenes' closes it last
// took, whether one was said whole in the page's session and whether
// forward ›'s label carries one (`closedSaid`), whether the acting-as
// segment's act opened its whole form (`actingOpen`), the canvas its words
// are measured by (`ruler`), the layout it holds (`layout`) with what its
// parts are measured by and the widths they were measured at (`measure`,
// `measuredAt`), and its bottom edge as last published (`published`).
// The line is the page's toolbar, named as it attaches (`L.the-line`), and
// one Tab stop (D5 §1.3, K-22; §4 rule 5): its acts hold a roving stop — the
// act last stood on, else the first that takes the focus — ← and → move
// among them (`step`), Enter and Space press the one stood on, each a native
// button (rule 14). Its parts, left to right: the acts — Back, Forward,
// the trail's list and, where the acting-as segment offers it, sign-in —
// each told whether a key made it by the focus owner's
// one reading (FP-20); the address display (R6; `addressDisplay`), naming
// the level the camera's scale reads (foundations §2.2): the board at far
// scale, with `B1.clamp` at WHOLE BOARD; the account under the camera at mid
// (B1-S2), whatever the walk stands on; nearer, the walk's own place — board
// › account › document, the document the walk stands in named by the version
// its box shows, its marker lit at a pinned version (FP-22; foundations
// §3.2) — or, where the walk stands on an account or the board, that place
// as mid scale names it, the document's fields blank; where no board is held
// `L.go-to-address` alone, at every scale (FP-35). Its exact fields come
// first, each followed by its label: the document's its box's lead, as its
// label on the plane sets it (T-LAYER's `leadRuns`), in the reading face, cut
// on a word to the room the address part leaves past its fields at the step
// the layout holds, each measured at the line's size (`labelHTML`,
// `lineWidth`), giving way word by word and never a field (the style's); the
// board and an account carry none, the page holding no name for either. Its accessible name is its fields in their
// order, the document's label whole after its field and the document's state
// in its short words (`addressName`). The places it names are
// the plane's running head (`named`; FP-26): the plane's labels and T-LAYER's
// held labels read them through the reader the app hands in, so none of them
// holds a label below the line. The address part — the address segment, the
// position's slot and the version marker — is one width at every scale and
// focus at the step the layout holds: the widest words it names there
// (`RESERVE`), then the strip's room and the marker's (the style's); where no
// document is named its position's slot, strip and marker stand empty, their
// room kept, so nothing after it on the line moves. The position's slot
// (`slot`): a position named only where the document holds text the reader
// may read — none at a document a read refused, a covered one among them
// (FP-29) — and stands at its own reading scale (T-LAYER's `atReadingScale`,
// the one test the press rule and the walk's grain read too), the one a
// landing named inside the focused span (N-WALK's `landedAt`), else the
// span's own first; below that scale the position's words stand empty, as
// wide as the document's widest position. The strip (`strip`) stands wherever
// the line names a document whose text the reader may read, at every scale it
// names it at (FP-26): where a position is named it marks the position, or,
// while the walk keeps its document in view with the view's centre off its
// region (N-WALK's `kept`), the view's window over it (T-LAYER's `windowIn`),
// open at whichever end the view has run past; below the document's reading
// scale it stands bare, marking neither; where an arrival in several runs
// stands in that document, each run is an outlined extent along it, the one
// the landing stands at filled (FP-21; N-GO's landing, through the reader the
// app hands in). Where a position is named the slot is the strip's act, a
// stop of the line's of its own (K-22, K-23; `stripAct`), named by the
// position: it quotes the position named and the passage's first words, a
// transient segment. The
// version marker beside it: ○ at the bare address, ● at a pinned member,
// bearing the segment's act and hidden from the accessibility tree, the
// segment's name saying the version. The
// segment is LEAP's box's act (a click, Enter or Mod+L; the chord drawn for
// the platform in its title, rule 19), which opens holding the address the
// display names (K-30; `currentAddress`), so the box never opens on a place
// the line does not show, and empty where no board is held. A kept document
// the display names — one M-PUMP holds as it stands past a second while it
// reads it again (FP-23) — carries its clause in a segment of its own right
// after the address part (T-LAYER's `keptIn`, so its corner carries none;
// FP-33), its words whole; where the display names no
// kept document, at every scale, the board lagging past a second carries its
// own there (T-LAYER's `boardKeptIn`), the board heading every place the
// display names.
// The acting-as segment (`actingSegment`), its state among foundations §3.3's
// seven: state 2 through the signed session, the one a write may go out
// under (`F.acting-as`, naming no origin: the board is the person's own
// notebook), its device label a slot (FP-34; `deviceSlot`) —
// the label of the key the session was opened with (M-REC's `device`), read
// with the session, else why it names none, never the template's token;
// state 3 through the keyless session for reading alone (`F.keyless-session`;
// §3.3 state 3, E16 (a′)) — the session's own `writes` deciding which, never
// a key bound at this board; state 1 where no session stands on the board
// the page holds (`B1.guest-line`, the board's origin and the venue; its one
// act sign-in, standing among the line's acts as the death arm's does, the
// session's refusal beside it, state 3 where the refusal
// was `no_key`); where no board is held, none of the seven: why, as O-FACES'
// one entry says it (`noBoardWords`; FP-35), in the guest line's place — at
// an empty list `F.unclaimed`, the doors' act, inert, saying beginning a
// notebook isn't built yet as it is pressed; at a list refused its words and,
// where a retry may tell, `B1.try-again`, the list read again (the app's
// act); the death arm where the session died (O-FACES's `deathWords`, the
// guest line's in their place for an arm this page holds none for, "signed
// out" the `closed` arm's alone) — never at a restart (client.md §4b.2): a
// session the shell re-opened M-PUMP takes in the ended one's place, and one
// it re-opened none of M-PUMP's acquire asks for again (FP-28) — past a
// second still out `L.reconnecting` in the segment's place, the session's
// state kept; back, the segment as it stood; refused, the guest state boot
// shows for that refusal, led by `L.reconnect-refused`. Its fields (`Field`;
// FP-26, FP-32): the signed session's account, principal number, venue,
// device label and the key's presence, its glyph (`KEY`) standing before its
// words; a guest's guest line, the board's origin and its venue, after a
// refused reconnect's lead and before the session's refusal. Its forms
// (`formsOf`), in the order the layout tries them: whole; then the fields
// giving way whole, each taking the separator before it — the principal
// number, then a board only read's origin and venue, then the device label;
// then the short form, the fields that stay shortened at once — the account
// to "as ⟨account⟩", the venue to its word, the key's presence to its glyph,
// the guest line to its class word. An exception keeps its words in every
// form — a refused reconnect's lead, the session's refusal, the keyless
// session, reconnecting, an ending's head (the guest line whole in its place
// where this page holds none), the board list's words — and a segment of
// exceptions alone has its whole form only. Short of its whole form the
// segment is its act (`actingHTML`), a native button inside the line's one
// stop, named and titled by its whole form's words, its press opening that
// form in its place until the next act (`untilAct`); the glyph is hidden from
// the accessibility tree. The daemon's segment
// (`daemonSegment`): silent while the board runs; its stopped, unreachable
// and halted-writes forms where it does not, their words whole (FP-26;
// foundations §3.1). A jump's face out of view
// (FP-25): the words of a jump's face whose document stands out of the
// visible view, in a segment of their own while the plane hides the face
// (O-HOST's `aside`, read through the reader the app hands in), said already
// through the status region as the face was shown. A walk's folded moment
// (FP-36, FP-20; `walkParts`): after the acting-as segment, one segment
// for each walk whose moment stands folded — its walk, its step and that it
// waits on the reader (O-FACES' `folded`), said through the status region as
// it folds — its act, inside the line's one stop, unfolding it (O-FACES'
// `unfold`). The transient
// segments (the swallow line K-9; the mode line C-31 where the pair flipped)
// stand until the next act (`act`) — a press of one of the line's own acts
// among them — or a change of the page's class, which takes one quoting what
// the class it left read down with it (`classChanged`). A reading scene's
// close (N-GO's `closed`, through the reader the app hands in) is said after
// it until the next act: the first in the page's session whole, a transient
// segment; each after it as forward ›'s label (`closedSaid`).
// The layout (FP-26, FP-20; `fit`, `setLayout`, `layoutOf`): the line cuts
// no part's words. Each part is measured at its reserved width — the acts
// with sign-in whether it stands or not, the address part at the widest
// words it names at the step, the acting-as segment in each of its forms,
// every other part at its words — the separator between two parts of a row
// counted, and past the document's label, which gives way first inside the
// address part's room, the line gives way in steps, each keeping the ones
// before it: 1, the position's words go, its strip standing alone, marked,
// its readout the strip's act; 2, the acting-as segment takes the first of
// its compact forms that holds the line in one row, its short form at the
// last; 3, further rows, broken only between parts, the acts first, the
// acting-as segment short, a part wider than a row on a row of its own — the
// acting-as segment and the daemon's form taking the row's room at the most,
// the segment broken between its fields and a field, or the daemon's form,
// between its words (the style's), every other part's words whole past the
// row's end; 4, where the address part is wider than a row, the levels
// between its board and its deepest fold into one mark (`L.fold`), whose act
// opens the LEAP box at those levels, the board's field, the deepest level's
// fields, the strip and the marker never folding. The layout — its step, the
// acting-as segment's form and its rows — is set again (`setLayout`) only as
// the app tells it the window changed or a face arrived (`fit`), at the
// launch, at the reader's act (`act`), and as the acting-as segment's fields
// or the daemon's form change state (`render`, `shapeOf`) — a session ended or
// keyless, a reconnect, a refusal, a halt standing or lifting, the board
// stopping — never at a pan or a zoom
// (`panned`), as a value ticks or as a statement arrives: a part that stands
// past the last setting stands in its place in the line's order, in the row
// of the part before it, where that row's room holds it, else beneath the
// line, as does one that has outgrown its row, until the next act sets the
// layout again. The line's bottom edge is published to the style
// (`--line-bottom`), which stands the LEAP box and the reading scene below it.
// The rebuild keeps the focus (rule 11; `render`): the line is rebuilt
// whenever its words change — every frame of a flight — and the act that held
// the focus has it back by its `data-act`, through the focus's owner, so a
// part that folds hands it to what carries it now; an
// overlay standing at Back (the trail's list) or at sign-in (the session's
// face) finds its act again by the act's id (O-HOST's anchor). What a screen
// reader is told (D4): a transient segment and the mode line politely; the
// session's death, a session a restart lost that the acquire could not get
// back, and halted writes assertively, once as they arrive — nothing while
// it reconnects nor as it returns — through the one status region; every
// kept place — a box, a reading scene's pane (SC's `keptPanes`, through the
// reader the app hands in), an origin's withheld text, the board — politely,
// one message for each cause, the stamp the places stand kept from
// (`keptSaid`; FP-36): each place by its name as the mirror finds it, a box
// and a pane naming one address one place; its clause as it appears, whether
// what it shows changed as its reads set it (M-PUMP's `liftOf`, SC's
// `paneLift`), still as last read with the failure's words where a read of it
// fails, and nothing where it is let go unset; several of one cause the one
// nearest the focus named — the pane holding the focus, another pane, the
// walk's place, then the box nearest the view's centre — and the rest
// counted, the lifts by outcome; a cause said once nothing of it is still
// within its second and, where it holds a lift, every place of it is set or
// failed, KEPT_MS after its first word at the most, the causes ready at one
// look said together; the cause a change of the page's class
// is said by the change's own message alone, and the change takes down what
// was heard and what was still to say; a change
// of the page's class is said once (FP-29), as the reads it asked answer
// (M-PUMP's `rereading`), UNREACHED_MS at the most after it: the ending's
// words, then the documents it covered (M-REC's `coveredDocs`), the first
// COVERED_NAMED by address and the rest counted — never the ending alone
// first. Every address the line sets stands in the identifier's face — the
// address segment's, the account its session words name, one in the words
// another module hands it (ST's `addressedHTML`) — and its other words in
// the interface face (P-REG's FACE). The chip is no segment (ux-T2: the document's corner).
// Rules: FP-1, FP-2, FP-10, FP-13, FP-20, FP-21, FP-22, FP-23, FP-25, FP-26,
// FP-28, FP-29, FP-32, FP-33, FP-34, FP-35, FP-36.

import * as REC from '../model/records.js';
import * as PUMP from '../model/pump.js';
import * as TRAIL from '../nav/trail.js';
import * as WALK from '../nav/walk.js';
import * as FOCUS from '../nav/focus.js';
import * as LAYER from '../text/layer.js';
import * as PORT from '../bridge/port.js';
import { deathWords, noBoardWords } from '../overlays/faces.js';
import { drawChord } from '../nav/keys.js';
import { cam, viewForCell } from '../plane/camera.js';
import { lodOf } from '../plane/lod.js';
import { boardCell, accountAt, docBox, G, LEAF, DEPTH_SOUND } from '../plane/projection.js';
import { memberOf, boardOf, accountOf, documentOf } from '../model/address.js';
import { inFace, runsOf, runWidth, cutWords, LEAD_WORDS } from '../plane/labels.js';
import { t, tHTML, addressedHTML, facedHTML, lastRead, CLIENT_CLOSE } from '../strings.js';
import { esc } from '../util.js';

/** @type {HTMLElement | null} */
let el = null;
/** @type {{html: string, id: string} | null} */
let transientSeg = null;
let lastHTML = '';
let lastMode = /** @type {string | null} */ (null);
let lastTrust = /** @type {boolean | null} */ (null);
/** the acting segment's assertive words at the last render, said once as they arrive (`Acting.alarm`); '' where none stood, null before the first render, whose words are no news */
let lastAlarm = /** @type {string | null} */ (null);
/** the daemon's halted writes at the last render, said once */
let lastHalted = false;
/** when the page's class last changed, its one message not yet said (`classChanged`); null where none waits */
let changedAt = /** @type {number | null} */ (null);
/** the documents the change's message names at the most, the rest counted */
const COVERED_NAMED = 5;
/** the act holding the line's one Tab stop (K-22), by its `data-act` */
let stop = 'back';
/** the reading scenes closed as the line last took them (`closedSaid`, `act`) */
let closesTaken = 0;
/** a close has been said whole in the page's session (`closedSaid`) */
let closedWhole = false;
/** forward ›'s label carries the close's words, until the next act (`closedSaid`) */
let forwardSays = false;
/** the acting-as segment's act opened its whole form, until the next act (`untilAct`) */
let actingOpen = false;
/** @typedef {0 | 1 | 2 | 3 | 4} Step how far the line has given way (see the head): 0 every part whole; 1 the position its strip alone; 2 the acting-as segment compact; 3 further rows; 4 the address folded */
/**
 * @typedef {Object} Layout — the line's layout as `setLayout` last set it, held until it sets it again
 * @property {Step} step
 * @property {number} form the acting-as segment's form held, by its place in `Acting.forms`
 * @property {string[][]} rows each row's parts, by key, in order
 * @property {number} room a row's width, px
 * @property {number} gap the separator's width between two parts of a row, px
 * @property {Record<string, number>} reserved the acts' and the address part's widths at the step, px: the room each is held at whatever it shows
 * @property {string} shape the acting-as segment's state and the strings its fields and the daemon's form read as it was set (`shapeOf`): where they change, it is set again
 */
/** @type {Layout | null} the layout `setLayout` last set; null before the first, the line one row of its parts whole */
let layout = null;
/** @typedef {(forms: string[]) => number[]} Measure each form's width on the line, px */
/** @type {Measure | null} what the line's forms are measured by, as `fit` last took it: the page's own layout (`measured`), else the one it was handed */
let measure = null;
/** @type {Map<string, number>} each form's width as last measured, by its markup; measured again as the faces change (`refaced`) */
const measuredAt = new Map();
/** the forms `measuredAt` holds at the most, every one measured again past it */
const MEASURED_MAX = 256;
/** the line's bottom edge as last published to the style (`publish`), px */
let published = NaN;
/**
 * @typedef {Object} KeptPlace — a place the status region speaks for while it stands kept (`keptSaid`)
 * @property {string} key the address it names — a box's the version it shows, a pane's its own — the board's own `1`, an origin's withheld text its words
 * @property {string} name what the status region calls it, as the mirror finds it
 * @property {string} clause its clause (T-LAYER's `KeptClause`)
 * @property {string} reason the failed read's words its clause ends with; '' where none
 * @property {number} since its cause: the page's clock at the row or drop that left it behind
 * @property {Array<[import('../model/pump.js').KeptKind, string]>} holds what M-PUMP holds it by, each its kind and its key, its lift read there (`liftOf`)
 * @property {boolean} pane a reading scene's pane holds it, its lift read there too (SC's `paneLift`)
 * @property {[number, number]} near how near the focus it stands, the least nearest: its tier, then its distance from the view's centre
 */
/** @typedef {'changed' | 'unchanged' | 'still'} Said what a place's lift says: whether what it shows changed as its reads set it, or still as last read where a read failed */
/** @typedef {{at: number, appear: KeptPlace[], lift: Array<{place: KeptPlace, said: Said}>}} Cause what one cause has to say, not yet said: when its first word came, by the platform's clock; the places whose clause appeared; the places whose reads set them or failed */
/** @type {Map<string, KeptPlace>} the kept places the status region spoke for as it last looked, by their keys (`keptSaid`) */
let keptHeard = new Map();
/** @type {Map<number, Cause>} what each cause has to say, not yet said, by its stamp (`keptSaid`) */
let causes = new Map();
/** @type {Set<number>} the stamps of the changes of the page's class, each a cause the change's own message speaks for (`classChanged`) */
const changes = new Set();
/**
 * @typedef {Object} Acts — the line's acts, and what it reads of the owners that import it, handed in once by the app (FP-10, FP-11)
 * @property {(byKey: boolean, at?: string) => void} open the address segment's act: the LEAP box, holding the address the line names — the fold mark's, holding the levels it folds (`at`)
 * @property {(byKey: boolean) => void} back
 * @property {(byKey: boolean) => void} forward
 * @property {(byKey: boolean) => void} trailList
 * @property {(el: HTMLElement) => void} signIn
 * @property {() => void} [again] the board list's "try again", where it was refused retry-class: the list read again (O-FACES' `tryBoardsAgain`)
 * @property {() => ({id: string, text: string} | null)} [aside] a jump's face standing out of the visible view: its string's id and its words (O-HOST's `aside`); null where none stands so
 * @property {() => (Pieces | null)} [pieces] the runs of an arrival in several, in the document landed in (N-GO's landing); null where none stands
 * @property {() => Array<{key: string, words: string}>} [walks] the walks' folded moments, each its walk and its segment's words (O-FACES' `folded`)
 * @property {(key: string, byKey: boolean) => void} [walk] a walk's segment's act: its moment unfolded (O-FACES' `unfold`)
 * @property {() => number} [closed] the reading scenes closed so far (N-GO's `closed`): a new one is said after the close (`closedSaid`)
 * @property {() => import('../scene/scene.js').PaneKept[]} [panes] the reading scene's panes standing kept (SC's `keptPanes`), which the status region speaks for (`keptSaid`)
 * @property {(addr: string) => ({since: number, outcome: import('../model/records.js').Outcome} | null)} [paneLift] how the setting the board's events asked set the pane naming an address (SC's `paneLift`)
 */

/** @typedef {{addr: string, runs: Array<{pos: number, width: number}>, current: number}} Pieces the runs of an arrival in several, the one the landing stands at by index */
/** @type {Acts | null} */
let acts = null;

/**
 * The line attached to its element, with its acts and readers: no layout held
 * until the first `fit`, the line one row of its parts whole.
 * @param {HTMLElement} e @param {Acts} a
 */
export function attach(e, a) {
  el = e; acts = a; layout = null; measure = null; measuredAt.clear();
  el.setAttribute('aria-label', t('L.the-line'));
  el.addEventListener('click', (ev) => {
    // an act's element — a button, or the board's field the fold leaves beside its mark, the address segment's act's
    const b = /** @type {HTMLElement} */ (ev.target).closest('[data-act]'); if (!b || !acts) return;
    const which = /** @type {HTMLElement} */ (b).dataset.act;
    const byKey = FOCUS.byKey(ev);
    // a press on one of the line's acts is the person's next act: what stood until it goes first
    act();
    if (which === 'back') acts.back(byKey); else if (which === 'forward') acts.forward(byKey); else if (which === 'address') acts.open(byKey); else if (which === 'trail') acts.trailList(byKey); else if (which === 'signin') acts.signIn(/** @type {HTMLElement} */ (b));
    else if (which === 'fold') acts.open(byKey, foldedAt(addressDisplay()));
    else if (which === 'strip') stripAct();
    else if (which === 'acting') { actingOpen = true; render(true); }
    else if (which === 'unclaimed') transient(t('L.no-notebook-yet'), 'L.no-notebook-yet');
    else if (which === 'again') { if (acts.again) acts.again(); }
    else if (which && which.startsWith(WALK_ACT) && acts.walk) acts.walk(which.slice(WALK_ACT.length), byKey);
    ev.stopPropagation();
  });
  // the stop follows the focus: the act a Tab or a press lands on is the one the ring returns to
  el.addEventListener('focusin', (ev) => {
    const b = /** @type {HTMLElement | null} */ (/** @type {HTMLElement} */ (ev.target).closest('button[data-act]'));
    if (b && b.dataset.act && b.dataset.act !== stop) { stop = b.dataset.act; roving(); }
  });
}

/** the line's acts that take the focus now, in order */
function actsNow() { return el ? /** @type {HTMLButtonElement[]} */ ([...el.querySelectorAll('button[data-act]')]).filter((b) => !b.disabled) : []; }

/** the one stop (K-22): the act stood on at tabindex 0, every other act out of the order */
function roving() {
  if (!el) return;
  const live = actsNow();
  if (!live.some((b) => b.dataset.act === stop)) stop = live[0] ? live[0].dataset.act || stop : stop;
  for (const b of /** @type {HTMLButtonElement[]} */ ([...el.querySelectorAll('button[data-act]')])) b.tabIndex = b.dataset.act === stop && !b.disabled ? 0 : -1;
}

/**
 * ← / → in the line (K-22): the stop moves to the act before or after the
 * one the focus stands on, which takes the focus through the focus's owner.
 * @param {1 | -1} dir
 * @returns {boolean} an act took the move
 */
export function step(dir) {
  const live = actsNow();
  if (!live.length) return false;
  const i = live.findIndex((b) => b === document.activeElement);
  const n = live[Math.max(0, Math.min(live.length - 1, (i < 0 ? 0 : i) + dir))];
  stop = n.dataset.act || stop; roving();
  FOCUS.land(n, { byKey: true });
  return true;
}

/** a transient segment until the person's next act, said through the one status region */
export function transient(/** @type {string} */ text, id = 'transient') { transientSeg = { html: addressedHTML(text), id }; FOCUS.say(text); render(true); }

/**
 * What stands until the next act taken down — the transient segment,
 * forward ›'s close label and the acting-as segment's whole form its act
 * opened — the closes made before it taken (`closedSaid`).
 * @returns {boolean} any of them stood
 */
function untilAct() {
  if (acts && acts.closed) closesTaken = acts.closed();
  const stood = !!transientSeg || forwardSays || actingOpen;
  transientSeg = null; forwardSays = false; actingOpen = false;
  return stood;
}

/** the reader's next act (see the head): what stands until it taken down, and the line laid out again (`fit`) */
export function act() { untilAct(); fit(); }

/** a pan or a zoom by the pointer (see the head): what stands until the next act taken down as at one, the layout held */
export function panned() { if (untilAct()) render(true); }

/** the separator between two parts of a row */
const SEP = '<span class="sep">│</span>';

/**
 * The line's layout for its parts (see the head): the least of the steps 0
 * and 1 whose parts stand in one row, the acting-as segment whole; else step
 * 2's one row, the segment in the first of its compact forms that holds it;
 * else step 3's rows, the segment in its short form — each part after the
 * last on its row where the row's room holds it, else first on a new one, a
 * part wider than a row on a row of its own — or step 4's where the address
 * part at step 3 is wider than a row.
 * @param {string[]} keys the parts standing, by key, in their order; the address part's `address`, the acting-as segment's `acting`
 * @param {(key: string, at: Step, form: number) => number} widthAt a part's width at a step, the acting-as segment's in a form, px
 * @param {number} gap the separator's width, px
 * @param {number} room a row's width, px
 * @param {number} [forms] the acting-as segment's forms (`Acting.forms`): its whole first, its short form last
 * @returns {{step: Step, form: number, rows: string[][]}}
 */
export function layoutOf(keys, widthAt, gap, room, forms = 1) {
  const short = Math.max(0, forms - 1);
  const across = (/** @type {Step} */ at, /** @type {number} */ form) => keys.reduce((w, k, i) => w + widthAt(k, at, form) + (i ? gap : 0), 0);
  for (const at of /** @type {Step[]} */ ([0, 1])) if (across(at, 0) <= room) return { step: at, form: 0, rows: [keys.slice()] };
  for (let form = Math.min(1, short); form <= short; form++) if (across(2, form) <= room) return { step: 2, form, rows: [keys.slice()] };
  /** @type {Step} */
  const at = keys.includes('address') && widthAt('address', 3, short) > room ? 4 : 3;
  /** @type {string[][]} */
  const rows = [];
  /** @type {string[]} */
  let row = [];
  let used = 0;
  for (const k of keys) {
    const w = widthAt(k, at, short);
    if (row.length && used + gap + w > room) { rows.push(row); row = []; used = 0; }
    used += (row.length ? gap : 0) + w; row.push(k);
  }
  if (row.length) rows.push(row);
  return { step: at, form: short, rows };
}

/** the room a row of the line's element holds, px: its width inside its padding; null where the platform lays it out nowhere */
function roomOf() {
  if (!el || typeof el.clientWidth !== 'number' || typeof getComputedStyle !== 'function') return null;
  const cs = getComputedStyle(el);
  return el.clientWidth - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0);
}

/**
 * Each form's width as the page lays it out (see the head): set in a row of
 * the line's own out of sight, each in a box of its own, its ids left off so
 * no act is found there, read, and taken down.
 * @type {Measure}
 */
function measured(forms) {
  if (!el || typeof document === 'undefined' || typeof document.createElement !== 'function') return forms.map(() => 0);
  const row = document.createElement('div');
  row.className = 'row measure';
  row.setAttribute('aria-hidden', 'true');
  row.innerHTML = forms.map((f) => `<span class="form">${f.replace(/ id="[^"]*"/g, '')}</span>`).join('');
  el.appendChild(row);
  const w = [...row.children].map((c) => c.getBoundingClientRect().width);
  row.remove();
  return w;
}

/**
 * Each form's width (see the head): as last measured, else measured now by
 * the measure `fit` last took — none measured where it took none.
 * @param {string[]} forms
 * @returns {number[]}
 */
function widths(forms) {
  if (measure && forms.some((f) => !measuredAt.has(f))) {
    if (measuredAt.size + forms.length > MEASURED_MAX) measuredAt.clear();
    const missing = [...new Set(forms.filter((f) => !measuredAt.has(f)))], w = measure(missing);
    missing.forEach((f, i) => measuredAt.set(f, w[i] || 0));
  }
  return forms.map((f) => measuredAt.get(f) ?? 0);
}

/**
 * The acting-as segment's state and the strings its fields and the daemon's
 * form read (see the head): the layout held is set again where they change —
 * a session ended or keyless, a reconnect, a refusal, a halt standing or
 * lifting, the board stopping — and never where a value in them ticks.
 * @param {Shown} s
 */
const shapeOf = (s) => `${s.acting.state} ${s.acting.shape}|${s.daemon.id}`;

/**
 * Set the line's layout (see the head): the parts standing measured at each
 * step at their reserved widths (`partsOf`'s `reserve`), the acting-as
 * segment in each of its forms, and the step and the form `layoutOf` finds
 * held, with the acts' and the address part's widths there and the strings
 * the layout was set on (`shapeOf`). Its forms are measured by the measure
 * `fit` took.
 * @param {Shown} s
 * @param {number} room a row's width, px
 */
function setLayout(s, room) {
  const steps = /** @type {Step[]} */ ([0, 1, 2, 3, 4]).map((k) => partsOf(s, k, true));
  const forms = s.acting.forms.map((_, f) => actingHTML(s.acting, f, false));
  const all = [SEP, ...steps.flat().map((p) => p.html), ...forms], w = widths(all), got = new Map(all.map((f, i) => [f, w[i]]));
  const widthAt = (/** @type {string} */ key, /** @type {Step} */ k, /** @type {number} */ form) => {
    if (key === 'acting') return got.get(forms[form]) || 0;
    const p = steps[k].find((x) => x.key === key);
    return p ? got.get(p.html) || 0 : 0;
  };
  const gap = got.get(SEP) || 0, next = layoutOf(steps[0].map((p) => p.key), widthAt, gap, room, forms.length);
  layout = { ...next, room, gap, reserved: { acts: widthAt('acts', next.step, next.form), address: widthAt('address', next.step, next.form) }, shape: shapeOf(s) };
}

/**
 * Set the line's layout again (see the head; `setLayout`), then rebuild the
 * line on it. The app's at a change of the window or a face's arrival and at
 * the launch; the line's own at the reader's act (`act`). A row's width is
 * the one handed in, else the line's element's, else the one the layout held
 * was set at; where there is none, the layout stands as it is.
 * @param {{room?: number, measure?: Measure}} [at] a row's width and what the forms are measured by: where none is handed in, the line's own element's and the page's layout (`measured`)
 */
export function fit(at = {}) {
  const room = at.room ?? roomOf() ?? (layout ? layout.room : null);
  if (at.measure) measure = at.measure;
  else if (!measure && room != null) measure = measured;
  if (el && measure && room != null && room > 0) setLayout(shown(), room);
  render();
}

/** the faces changed (the app's `refaced`): every form measured again, and the layout set again on the widths they take now */
export function refaced() { measuredAt.clear(); fit(); }

/** the layout the line holds (the gate's): its step, the acting-as segment's form and its rows; null before the first setting */
export const held = () => (layout ? { step: layout.step, form: layout.form, rows: layout.rows.map((r) => r.slice()) } : null);

/**
 * A reading scene's close said after it (see the head), where the scenes
 * closed (N-GO's `closed`) count one past those the line last took: the
 * first in the page's session whole, a transient segment said through the
 * status region; each after it as forward ›'s label — its title and its
 * accessible name, the visible label among its words; either until the next
 * act (`act`).
 */
function closedSaid() {
  const n = acts && acts.closed ? acts.closed() : 0;
  if (n <= closesTaken) return;
  closesTaken = n;
  if (closedWhole) { forwardSays = true; return; }
  closedWhole = true;
  const words = t('L.scene.closed');
  transientSeg = { html: addressedHTML(words), id: 'L.scene.closed' };
  FOCUS.say(words);
}

/**
 * A change of the page's class (see the head; FP-23, FP-29), told by the app
 * as M-PUMP tells it: the transient segment, forward ›'s close label and the
 * acting-as segment's whole form its act opened taken down — the strip's act
 * quotes the text it was made at, the act the session it was made in — a
 * scene's next close said whole again, the page's session being
 * a new one, the kept places heard and what was still to say of them taken
 * down unsaid, the change's own stamp a cause its one message speaks for
 * (`keptSaid`), and that message held until the reads it asked answer
 * (`render`).
 * @param {number | null} [at] the page's clock at the change (M-PUMP's `Dropped.at`)
 */
export function classChanged(at = null) {
  transientSeg = null; forwardSays = false; actingOpen = false; closedWhole = false; changedAt = performance.now();
  keptHeard = new Map(); causes = new Map();
  if (at != null) changes.add(at);
  render(true);
}

/**
 * The change's one message (see the head): the ending's words, then the
 * documents the change covered, the first COVERED_NAMED by address and the
 * rest counted — the ending's alone where it covered none.
 * @param {string} ending the acting-as segment's words for the ending
 * @returns {string}
 */
function endingSaid(ending) {
  const docs = REC.coveredDocs();
  if (!docs.length) return ending;
  const named = docs.slice(0, COVERED_NAMED).join(', ') + (docs.length > COVERED_NAMED ? ' ' + t('F.others-count', { n: docs.length - COVERED_NAMED }) : '');
  return t('L.covered', { ending, documents: named });
}

/** the tiers of nearness to the focus (`KeptPlace.near`), nearest first: the pane holding the focus, another pane — the scene standing over the plane — the box the walk stands in, the plane's other boxes, an origin's withheld text, the board */
const NEAR = /** @type {const} */ ({ focused: 0, pane: 1, walked: 2, box: 3, run: 4, board: 5 });

/** the nearer of two places to the focus (`KeptPlace.near`), as a sort compares them */
const nearer = (/** @type {KeptPlace} */ a, /** @type {KeptPlace} */ b) => a.near[0] - b.near[0] || a.near[1] - b.near[1];

/**
 * The places standing kept past their second as the status region speaks
 * for them (see the head), by their keys: each box M-PUMP holds so whose
 * clause stands (T-LAYER's `keptIn`), named by the version it shows
 * (`boxName`); each pane whose clause stands, one place with a box naming
 * the same address; each origin's withheld text whose edition claims stand so
 * (`claimsKeptIn`); and the board while it lags so, by the mirror's name for
 * it (`boardKeptIn`).
 * @param {import('../scene/scene.js').PaneKept[]} panes
 * @returns {Map<string, KeptPlace>}
 */
function keptPlaces(panes) {
  /** @type {Map<string, KeptPlace>} */
  const out = new Map();
  const all = PUMP.keptAll(), f = WALK.current(), walked = f ? documentOf(f.addr) || f.addr : null, b = REC.board();
  for (const addr of all.docs) {
    const box = documentOf(addr) || addr, k = LAYER.keptIn(box);
    if (!k) continue;
    const { addr: key, name } = LAYER.boxName(box), at = docBox(box);
    const near = /** @type {[number, number]} */ ([box === walked ? NEAR.walked : NEAR.box, Math.hypot(at.x + at.w / 2 - cam.x, at.y + at.h / 2 - cam.y)]);
    out.set(key, { key, name, clause: k.text, reason: k.reason, since: k.since, holds: [['doc', key], ['doc', box]], pane: false, near });
  }
  for (const p of panes) {
    if (!p.clause) continue;
    const near = /** @type {[number, number]} */ ([p.focus ? NEAR.focused : NEAR.pane, 0]), was = out.get(p.addr);
    if (was) { was.pane = true; if (near[0] < was.near[0]) was.near = near; continue; }
    out.set(p.addr, { key: p.addr, name: p.name, clause: p.clause.text, reason: p.clause.reason, since: p.since, holds: [], pane: true, near });
  }
  for (const origin of all.origins) {
    const k = LAYER.claimsKeptIn(origin), key = t('L.kept.run', { origin });
    if (k) out.set(key, { key, name: key, clause: k.text, reason: k.reason, since: k.since, holds: [['claims', origin]], pane: false, near: [NEAR.run, 0] });
  }
  const lag = all.board && b ? LAYER.boardKeptIn() : null;
  if (lag && b) out.set('1', { key: '1', name: t('L.mirror.board.name', { node: '1', origin: b.origin }), clause: lag.text, reason: lag.reason, since: lag.since, holds: [['board', '1']], pane: false, near: [NEAR.board, 0] });
  return out;
}

/**
 * What a place heard and gone says (see the head): changed where any of its
 * holds was set from the stamp it stood from with what it shows changed —
 * M-PUMP's (`liftOf`), a pane's (SC's `paneLift`) — unchanged where they were
 * set and none changed it; null where none set it, which says nothing.
 * @param {KeptPlace} h
 * @returns {'changed' | 'unchanged' | null}
 */
function liftSaid(h) {
  const set = [...h.holds.map(([kind, key]) => PUMP.liftOf(kind, key)), h.pane && acts && acts.paneLift ? acts.paneLift(h.key) : null].filter((l) => !!l && l.since === h.since);
  return set.some((l) => l && l.outcome === 'changed') ? 'changed' : set.length ? 'unchanged' : null;
}

/** a lift's words for a place: whether what it shows changed, or still as last read with the failure's words */
function liftWords(/** @type {Said} */ said, /** @type {string} */ name, /** @type {string} */ reason) {
  return said === 'still' ? t('L.kept.still', { name, reason }) : t(said === 'changed' ? 'L.kept.changed' : 'L.kept.unchanged', { name });
}

/**
 * One cause's message (see the head): its lifts first — the one nearest the
 * focus named by what it says, each other outcome after it counted — then
 * the places whose clause appeared and still stands, one named with its
 * clause, several the nearest named, the rest counted, and the cause's
 * "as last read" for them all; '' where nothing is left to say.
 * @param {number} since the cause's stamp
 * @param {Cause} c
 * @param {Map<string, KeptPlace>} now
 * @returns {string}
 */
function causeWords(since, c, now) {
  // each place once, by what it last said: one that left and came back within the cause counted once
  const lifts = [...new Map(c.lift.map((l) => [l.place.key, l])).values()].sort((x, y) => nearer(x.place, y.place));
  const lifted = new Set(lifts.map((l) => l.place.key));
  const appear = [...new Map(c.appear.map((p) => [p.key, p])).values()].filter((p) => !lifted.has(p.key) && now.get(p.key)?.since === since).sort(nearer);
  /** @type {string[]} */
  const parts = [];
  const [first, ...rest] = lifts;
  if (first) {
    parts.push(liftWords(first.said, first.place.name, first.place.reason));
    /** @type {Map<string, {said: Said, reason: string, n: number}>} the rest by what they say, a failure by its words too */
    const counted = new Map();
    for (const l of rest) {
      const by = l.said === 'still' ? 'still ' + l.place.reason : l.said, g = counted.get(by);
      if (g) g.n++; else counted.set(by, { said: l.said, reason: l.place.reason, n: 1 });
    }
    for (const g of counted.values()) parts.push(liftWords(g.said, t('L.kept.more', { n: g.n }), g.reason));
  }
  const [named] = appear;
  if (named && appear.length === 1) parts.push(t('L.kept.said', { name: named.name, clause: named.clause }));
  else if (named) {
    const clause = t('L.kept.text', { when: lastRead(since) });
    parts.push(t('L.kept.said', { name: t('L.kept.and-more', { name: named.name, n: appear.length - 1 }), clause: named.reason ? t('L.kept.failed', { clause, reason: named.reason }) : clause }));
  }
  return parts.join('; ');
}

/**
 * Is a cause to be said now (see the head): KEPT_MS after its first word;
 * else once no place of it is still within its second (M-PUMP's `keptSoon`,
 * a pane's setting within its own) and, where it holds a lift, no other
 * place of it still stands kept, read and not failed.
 * @param {number} since
 * @param {Cause} c
 * @param {Map<string, KeptPlace>} now
 * @param {Set<number>} soon
 * @param {number} at the platform's clock
 */
function causeReady(since, c, now, soon, at) {
  if (at - c.at >= PUMP.KEPT_MS) return true;
  if (soon.has(since)) return false;
  return !c.lift.length || ![...now.values()].some((p) => p.since === since && !p.reason && !c.lift.some((l) => l.place.key === p.key));
}

/**
 * What the status region says of the kept places (see the head; FP-36): the
 * places standing kept now (`keptPlaces`) set beside those heard as it last
 * looked — one gone, or standing from another stamp, a lift of its cause
 * where its reads set it (`liftSaid`); one new, or from another stamp, an
 * appearance of its cause; one whose failed read's words came or changed, a
 * lift saying still as last read — each word kept for its cause, none for a
 * change of the page's class's; then each cause ready (`causeReady`) said in
 * one message (`causeWords`), the causes ready at one look said together, so
 * none takes another's place in the one region.
 */
function keptSaid() {
  const panes = acts && acts.panes ? acts.panes() : [], now = keptPlaces(panes), soon = PUMP.keptSoon(), at = performance.now();
  for (const p of panes) if (!p.clause) soon.add(p.since);
  /** the cause a stamp is, made where none stands; null for a change of the page's class's, whose own message speaks for it */
  const causeOf = (/** @type {number} */ since) => {
    if (changes.has(since)) return null;
    const c = causes.get(since) || { at, appear: [], lift: [] };
    causes.set(since, c);
    return c;
  };
  for (const [key, h] of keptHeard) {
    const p = now.get(key);
    if (p && p.since === h.since) continue;
    const said = liftSaid(h);
    if (said) causeOf(h.since)?.lift.push({ place: h, said });
  }
  for (const [key, p] of now) {
    const h = keptHeard.get(key);
    if (!h || h.since !== p.since) causeOf(p.since)?.appear.push(p);
    else if (p.reason && p.reason !== h.reason) causeOf(p.since)?.lift.push({ place: p, said: 'still' });
  }
  keptHeard = now;
  /** @type {string[]} */
  const ready = [];
  for (const [since, c] of [...causes]) {
    if (!causeReady(since, c, now, soon, at)) continue;
    causes.delete(since);
    const words = causeWords(since, c, now);
    if (words) ready.push(words);
  }
  if (ready.length) FOCUS.say(ready.join('; '));
}

/**
 * @typedef {Object} AddressDisplay — what the address segment names at the camera's scale (foundations §2.2)
 * @property {string} text the segment's fields: the place, then the position where one is named
 * @property {string} place the place's words — the board, the account, or board › account › document — before the position's slot
 * @property {import('../text/article.js').Faced[]} label the label after the document's field: its box's lead as its label on the plane sets it (T-LAYER's `leadRuns`), whole; none where no document is named or no first line is known
 * @property {number} slot the position's words' room, in characters: as many as the document's widest position takes in its words, which stand empty below the document's reading scale; 0 where no document is named
 * @property {string} addr the address named — the board, the account under the camera at mid, nearer the account or the board the walk stands on, or the document the walk stands in (its member where one is pinned): the LEAP box's prefill; '' where no board is held
 * @property {string | null} doc the document named, nearer than mid
 * @property {number | null} pos the position named inside it, at the document's own reading scale alone
 * @property {number | null} member the version member pinned
 * @property {boolean} whole the whole board is in view, at WHOLE BOARD's clamp
 * @property {boolean} strip the position strip stands: the line names a document whose text the reader may read (FP-26), the strip bare below the document's reading scale; false where none is named or a read refused it (FP-29)
 * @property {import('../plane/layout.js').Window | null} window the view's window over the document named, the strip's mark where the walk keeps it in view off the view's centre (N-WALK's `kept`); null where it is not kept, no position is named, or no line in view names one
 */

/** the address the display names: the LEAP box's prefill, so the box opens holding what the line shows (K-30) */
export function currentAddress() { return addressDisplay().addr; }

/**
 * @typedef {Object} Named — the places the address display names (FP-26): the line is their running head, so none of them holds a label below it
 * @property {string} board the board named; '' where no board is held (FP-35)
 * @property {string | null} account the account named — under the camera at mid, the walk's own nearer — null where none is
 * @property {string | null} doc the document named nearer than mid, by its box: the address every version of it shares; null where none is
 */

/**
 * The places the address display names (`addressDisplay`; FP-26): its board,
 * the account it names and the
 * document it names, by its box — read by the plane's labels and T-LAYER's
 * held labels, through the reader the app hands in, so a place the line
 * names holds no label below it.
 * @returns {Named}
 */
export function named() {
  const a = addressDisplay(), doc = a.doc ? documentOf(a.doc) || a.doc : null;
  return { board: boardOf(a.addr), account: accountOf(a.addr), doc };
}

/** the position's words in its slot — ` › position ⟨p⟩` — and none where no position is named */
const positionWords = (/** @type {number | null} */ p) => (p != null ? ' › ' + t('F.position', { p }) : '');

/**
 * The widest document the address segment names (see the head): a
 * sub-account's document at the deepest continuation the projection places
 * soundly (P-PROJ's DEPTH_SOUND), a member pinned.
 */
const WIDEST_DOC = `1.0.${G[3] * G[3] - 2}.${G[4] * G[4] - 2}.0.${(G[LEAF] * G[LEAF] - 1) * (DEPTH_SOUND + 1)}.99`;
/** the widest place the address segment names, in characters of the line's identifier face: board › account › document */
const PLACE_CH = `1 › ${accountOf(WIDEST_DOC)} › ${WIDEST_DOC}`.length;
/** the widest words the address segment names, in characters of the line's identifier face: the widest place, then the position's words at a run of ten million positions */
const WORDS_CH = PLACE_CH + positionWords(9999999).length;
/** the fold mark's room, in characters of the line's identifier face */
const FOLD_CH = 2;
/** the widest place folded (see the head): the board, the fold mark in the account's place, the widest document */
const FOLDED_CH = '1 › '.length + FOLD_CH + ` › ${WIDEST_DOC}`.length;
/**
 * The address part's reserved characters at each step (see the head): the
 * widest words it names, without the position's from step 1 and with the
 * account folded at step 4. The style adds the strip's room and the marker's.
 * @type {Record<Step, number>}
 */
const RESERVE = { 0: WORDS_CH, 1: PLACE_CH, 2: PLACE_CH, 3: PLACE_CH, 4: FOLDED_CH };

/**
 * The address display: the level the camera's scale reads (foundations
 * §2.2) — at far scale the board; at mid the account under the camera
 * (B1-S2), whatever the walk stands on; nearer the walk's own place: the
 * document it stands in, its strip standing where no read refused it, and the
 * position only where that document stands at its own reading scale
 * (T-LAYER's `atReadingScale`), its words standing empty below it, the
 * strip's window where a position is named and the walk keeps the document in
 * view off the view's centre; or the account or the board it stands on, named
 * as at mid; the account under the camera where it stands nowhere.
 * Where no board is held, at every scale, "go to an address" alone, naming
 * no place (FP-35).
 * @returns {AddressDisplay}
 */
export function addressDisplay() {
  if (!REC.board()) { const text = t('L.go-to-address'); return { text, place: text, label: [], slot: 0, addr: '', doc: null, pos: null, member: null, whole: false, strip: false, window: null }; }
  const lod = lodOf(cam.scale);
  if (lod.name === 'far' || lod.name === 'far~mid') {
    const whole = cam.scale <= viewForCell(boardCell('1'), 0.92).scale * 1.02;
    const text = '1' + (whole ? ' · ' + t('B1.clamp') : '');
    return { text, place: text, label: [], slot: 0, addr: '1', doc: null, pos: null, member: null, whole, strip: false, window: null };
  }
  const f = WALK.current(), nearer = lod.name === 'near' || lod.name === 'mid~near';
  if (f && nearer && (f.kind === 'block' || f.kind === 'document' || f.kind === 'link')) {
    const place = `${boardOf(f.addr)} › ${accountOf(f.addr)} › ${f.addr}`;
    // a document a read refused — withheld, a covered one among them, or nothing the board will say of it — holds no text to stand a strip or name a position in
    const readable = !REC.doc(f.addr).refused;
    const pos = readable && LAYER.atReadingScale(f.addr) ? WALK.landedAt() ?? f.pos ?? 1 : null;
    const widest = Math.max(1, REC.doc(f.addr).extent || 0, pos || 0);
    const win = pos != null && WALK.kept() ? LAYER.windowIn(f.addr) : null;
    return { text: place + positionWords(pos), place, label: LAYER.leadRuns(REC.doc(f.addr)), slot: positionWords(widest).length, addr: f.addr, doc: f.addr, pos, member: memberOf(f.addr), whole: false, strip: readable, window: win };
  }
  // nearer than mid the account or the board the walk stands on; at mid, or where it stands nowhere, the account under the camera
  const acct = f && nearer && (f.kind === 'account' || f.kind === 'board') ? (f.kind === 'account' ? f.addr : null) : accountAt(cam.x, cam.y, '1');
  const text = acct ? `1 › ${acct}` : '1';
  return { text, place: text, label: [], slot: 0, addr: acct || '1', doc: null, pos: null, member: null, whole: false, strip: false, window: null };
}

/** the sign-in act, the guest's and the death arm's, among the line's acts: its id names it across the line's rebuilds, as Back's does, so the session's face standing at it finds it again (O-HOST's anchor) */
const SIGN_IN = `<button id="line-signin" data-act="signin">${esc(t('F.sign-in'))}</button>`;

/** a walk's segment's act, before the walk it unfolds: its `data-act`, by which the line's one stop and a rebuild find it again */
const WALK_ACT = 'walk:';

/** @typedef {{key: string, html: string}} Part one of the line's parts (see the head): its key, by which the layout places it, and its markup */

/** the walks' segments (see the head): one part for each walk's folded moment, keyed by its act, which unfolds it; its words whole */
function walkParts() {
  const folded = acts && acts.walks ? acts.walks() : [];
  return folded.map((w) => ({ key: WALK_ACT + w.key, html: `<button class="seg walk" data-act="${esc(WALK_ACT + w.key)}" data-string="L.walk.waits">${esc(w.words)}</button>` }));
}

/**
 * The line's acts (see the head): Back, Forward, the trail's list, and
 * sign-in where it stands.
 * @param {boolean} signIn
 */
function actsHTML(signIn) {
  return `<span class="acts"><button id="line-back" data-act="back" ${TRAIL.canBack() ? '' : 'disabled'}>${esc(t('F.back'))}</button><button data-act="forward" ${TRAIL.canForward() ? '' : 'disabled'}${forwardSays ? ` title="${esc(t('L.scene.closed'))}" aria-label="${esc(t('L.scene.closed'))}"` : ''}>${esc(t('F.forward'))}</button><button data-act="trail" title="${esc(drawChord('Mod+Y'))}">${esc(t('F.trail-list'))}</button>${signIn ? SIGN_IN : ''}</span>`;
}

/** the account a session's words name, set in the identifier's face (P-REG's FACE; ST's `tHTML`) */
const ACCOUNT = /** @type {const} */ ({ account: 'id' });

/** the key's presence drawn (see the head): a key in the text's colour — no character, so never an emoji or a padlock — hidden from the accessibility tree, which reads the words beside it or the act's name */
const KEY = '<svg class="key" viewBox="0 0 16 10" aria-hidden="true" focusable="false"><circle cx="4" cy="5" r="3"/><path d="M7 5h8M12 5v3M14.5 5v2"/></svg>';
/** the key's glyph alone, the short form's: no words after it */
const KEY_ALONE = KEY.replace('class="key"', 'class="key alone"');
/** the separator between two fields of the short form (see the head) */
const SHORT_SEP = ' · ';

/**
 * @typedef {Object} Field — a field of the acting-as segment (see the head)
 * @property {string} html its markup whole
 * @property {string} words its words whole
 * @property {string} sep the separator before it in the whole form; '' where it stands first
 * @property {0 | 1 | 2 | 3} rank the turn it gives way at: 1 the principal number, 2 a board only read's origin and venue, 3 the device label; 0 never
 * @property {string | null} short its markup in the short form; null where it keeps its words there
 */

/**
 * A field of the acting-as segment (`Field`).
 * @param {string} html
 * @param {string} words
 * @param {string} [sep]
 * @param {0 | 1 | 2 | 3} [rank]
 * @param {string | null} [short]
 * @returns {Field}
 */
function field(html, words, sep = '', rank = 0, short = null) { return { html, words, sep, rank, short }; }

/**
 * Fields as markup (see the head): each in a box holding its words and the
 * separator after it up to that separator's closing space, which stands
 * between the two boxes, where a line breaks — so the segment breaks between
 * fields, and a field wider than its row between its words (the style's); in
 * the short form each field's short markup where it has one, SHORT_SEP
 * between two.
 * @param {Field[]} fields
 * @param {boolean} short
 */
function boxed(fields, short) {
  return fields.map((f, i) => {
    const next = fields[i + 1], sep = !next ? '' : short ? SHORT_SEP : next.sep, keep = sep.trimEnd();
    return `<span class="field">${short && f.short != null ? f.short : f.html}${esc(keep)}</span>${sep.slice(keep.length)}`;
  }).join('');
}

/**
 * The acting-as segment's forms (see the head), in the order the layout
 * tries them: its fields whole; then, for each turn of the giving way, the
 * fields standing after it; then, where a field has a short form, the short
 * form, every field that gives way gone.
 * @param {Field[]} fields
 * @returns {string[]}
 */
function formsOf(fields) {
  const forms = [boxed(fields, false)];
  for (const turn of /** @type {const} */ ([1, 2, 3])) if (fields.some((f) => f.rank === turn)) forms.push(boxed(fields.filter((f) => !f.rank || f.rank > turn), false));
  if (fields.some((f) => f.short != null)) forms.push(boxed(fields.filter((f) => !f.rank), true));
  return forms;
}

/** the words of fields whole: each after the separator before it */
const wordsOf = (/** @type {Field[]} */ fields) => fields.map((f, i) => (i ? f.sep : '') + f.words).join('');

/**
 * The device label's slot (FP-34): the label of the key this device opened
 * the session with (M-REC's `device`) — the store read with the session, so
 * it is never an empty box — else why it names none, in that cause's words:
 * the key carries no label; the store was not read; the session does not
 * name its key among the several it may have been opened with. Named by its
 * role and what it shows.
 * @param {import('../model/records.js').DeviceKey | import('../model/records.js').DeviceCause | null} dev
 * @returns {{shows: string, html: string}}
 */
function deviceSlot(dev) {
  const cause = !dev || 'cause' in dev ? (dev && dev.cause === 'store-unread' ? 'L.slot.store-unread' : 'L.slot.key-untold') : dev.label ? '' : 'L.slot.unlabelled';
  const shows = cause ? t(cause) : dev && 'label' in dev && dev.label ? dev.label : '';
  return { shows, html: `<span class="slot" data-slot="label"${cause ? ` data-string="${cause}"` : ''} role="img" aria-label="${esc(t('L.slot.named', { role: t('L.slot.device-label'), shows }))}">${esc(shows)}</span>` };
}

/**
 * @typedef {Object} Acting — the acting-as segment (`actingSegment`)
 * @property {string[]} forms its forms' markup in the order the layout tries them (`formsOf`): its whole form first, its short form last; its whole form alone where it has no compact form
 * @property {{id: string, values: Record<string, string | number>} | null} name the string its whole form's words are and its tokens' values, the act's name where it has a compact form; null where it has none
 * @property {string} shape the strings its fields read: where they change, the layout is set again (`shapeOf`)
 * @property {number} state its state among foundations §3.3's seven; 0 for none of them — no adapter, no board held
 * @property {string} words its words, what the status region says where they are said
 * @property {boolean} alarm its words said assertively once as they arrive (D4): the session's death, and a session a restart lost that M-PUMP's acquire could not get back
 * @property {boolean} signIn its one act, sign-in, offered: it stands among the line's acts
 */

/**
 * A segment of exceptions alone (see the head): one form, a string's words
 * whole, a field at each of its separators.
 * @param {string} id the string
 * @param {string} words its words
 * @param {string} markup its markup
 * @param {{state: number, alarm: boolean, signIn: boolean}} as
 * @returns {Acting}
 */
function keptWhole(id, words, markup, as) {
  const w = words.split(' · '), h = markup.split(' · ');
  const fields = w.length === h.length ? w.map((x, i) => field(h[i], x, i ? ' · ' : '')) : [field(markup, words)];
  return { forms: [`<span data-string="${esc(id)}">${boxed(fields, false)}</span>`], name: null, shape: id, words, ...as };
}

/**
 * The signed session's fields (see the head): `F.acting-as` cut at its
 * separators and around its principal clause — the account, short "as
 * ⟨account⟩"; the principal number, giving way first; the venue, short its
 * word; the device label's slot, giving way third; the key's presence, its
 * glyph before its words, short the glyph alone — so the whole form's words
 * are the string's own; where the string will not cut so, its words whole as
 * one field.
 * @param {{account: string, N: number}} values the string's tokens but its device label, whose slot stands in its place
 * @param {{shows: string, html: string}} slot
 * @returns {Field[]}
 */
function signedFields(values, slot) {
  const words = t('F.acting-as', values), markup = tHTML('F.acting-as', values, ACCOUNT);
  /** the string's words or markup cut into its fields' own, in their order; null where it will not cut so */
  const cut = (/** @type {string} */ x) => {
    const [head, label, key, ...more] = x.split(' · '), m = /^(.*?) (\([^()]*\)) (.*)$/.exec(head);
    return m && label === '⟨device label⟩' && key != null && !more.length ? [m[1], m[2], m[3], key] : null;
  };
  const w = cut(words), h = cut(markup);
  if (!w || !h) return [field(markup.replace('⟨device label⟩', () => slot.html), words.replace('⟨device label⟩', () => slot.shows))];
  return [
    field(h[0], w[0], '', 0, `<span data-string="L.acting.as">${tHTML('L.acting.as', { account: values.account }, ACCOUNT)}</span>`),
    field(h[1], w[1], ' ', 1),
    field(h[2], w[2], ' ', 0, `<span data-string="F.venue.notebook">${esc(t('F.venue.notebook'))}</span>`),
    field(slot.html, slot.shows, ' · ', 3),
    field(KEY + h[3], w[3], ' · ', 0, KEY_ALONE),
  ];
}

/**
 * The signed session's segment (see the head): its fields (`signedFields`)
 * in each of their forms — every form but the short one the words of
 * `F.acting-as`, the short one's fields reading strings of their own — the
 * act's name the string's words whole, the device label's slot's among them.
 * @param {{account: string | null, principal: number}} s the session
 * @returns {Acting}
 */
function signedSegment(s) {
  const values = { account: s.account || '', N: s.principal }, slot = deviceSlot(REC.device()), fields = signedFields(values, slot), forms = formsOf(fields);
  return {
    forms: forms.map((f, i) => (i && i === forms.length - 1 ? f : `<span data-string="F.acting-as">${f}</span>`)),
    name: forms.length > 1 ? { id: 'F.acting-as', values: { ...values, 'device label': slot.shows } } : null,
    shape: 'F.acting-as', state: 2, words: wordsOf(fields), alarm: false, signIn: false,
  };
}

/**
 * A guest's segment (see the head): the reconnect's lead where a restart's
 * was refused, the guest line, the board's origin and its venue, the
 * session's refusal. Compact, the origin and the venue give way together — a
 * board only read — and the guest line shortens to its class word, the lead
 * and the refusal keeping their words, the act's name its fields whole
 * (`L.guest-line.name`); else its one form, its words whole.
 * @param {string} origin the board's origin, as `boards()` answered it
 * @param {string | null} lead the account a restart's refused reconnect was for; null where none was
 * @param {{name: string} | null} refused the session's refusal
 * @param {{state: number, alarm: boolean, compact: boolean}} as
 * @returns {Acting}
 */
function guestSegment(origin, lead, refused, as) {
  const rank = as.compact ? 2 : 0;
  const head = lead == null ? null : field(`<span data-string="L.reconnect-refused">${tHTML('L.reconnect-refused', { account: lead }, ACCOUNT)}</span>`, t('L.reconnect-refused', { account: lead }));
  const guest = field(`<span data-string="B1.guest-line">${esc(t('B1.guest-line'))}</span>`, t('B1.guest-line'), head ? ' · ' : '', 0, as.compact ? `<span data-string="L.guest-line.short">${esc(t('L.guest-line.short'))}</span>` : null);
  const board = origin ? field(esc(origin), origin, ' · ', rank) : null;
  const venue = field(`<span data-string="F.venue.notebook">${esc(t('F.venue.notebook'))}</span>`, t('F.venue.notebook'), ' · ', rank);
  const why = refused ? field(`<span class="dim" data-string="L.session-refused">${esc(t('L.session-refused', { name: refused.name }))}</span>`, t('L.session-refused', { name: refused.name }), ' ') : null;
  const fields = [head, guest, board, venue, why].filter((f) => f != null), forms = formsOf(fields);
  /** a field's words after its separator, as the act's name takes them; none where it does not stand */
  const said = (/** @type {Field | null} */ f) => (f ? f.sep + f.words : '');
  return {
    forms, name: forms.length > 1 ? { id: 'L.guest-line.name', values: { lead: said(head), guest: said(guest), origin: said(board), venue: said(venue), refused: said(why) } } : null,
    shape: [head ? 'L.reconnect-refused' : '', 'B1.guest-line', why ? 'L.session-refused' : ''].filter(Boolean).join(' '),
    state: as.state, words: head ? head.words : guest.words, alarm: as.alarm, signIn: true,
  };
}

/** the board list's "try again" (see the head): its id names it across the line's rebuilds, as sign-in's does */
const AGAIN = `<button id="line-again" data-act="again">${esc(t('B1.try-again'))}</button>`;

/**
 * The acting-as segment where no board is held (see the head; FP-35): why,
 * as O-FACES' one entry says it (`noBoardWords`), in the guest line's place,
 * naming no venue, origin, claimant or sign-in — with no adapter beneath the
 * port, why none stands, `L.bad-port` or `L.no-adapter`; at an empty list
 * `F.unclaimed`, the doors' act, inert in this build, saying so as it is
 * pressed; at a list refused its words, and "try again" beside them where a
 * retry may tell; nothing while the list has not answered. None of §3.3's
 * seven states.
 * @returns {Acting}
 */
function noBoardSegment() {
  const w = noBoardWords();
  if (!w) return { forms: [''], name: null, shape: '', state: 0, words: '', alarm: false, signIn: false };
  const html = w.doors ? `<button id="line-unclaimed" data-act="unclaimed" class="inert" data-string="${esc(w.id)}">${esc(w.text)}</button>`
    : `<span data-string="${esc(w.id)}">${esc(w.text)}</span>${w.again ? ' ' + AGAIN : ''}`;
  return { forms: [html], name: null, shape: w.id, state: 0, words: w.text, alarm: false, signIn: false };
}

/**
 * The acting-as segment (see the head): its forms, its words, and its state
 * among foundations §3.3's seven — while M-PUMP's acquire is out past a
 * second for a session a restart lost, "reconnecting as" in the session's
 * place, the session's state kept; where it was refused, the guest state boot
 * shows for that refusal, led by "could not reconnect as" (FP-28); a death's
 * words O-FACES's (`deathWords`), the guest line's in their place for an arm
 * it holds none for — the guest's and the death arm's one act, sign-in,
 * offered to stand among the line's acts. Where no adapter stands beneath the
 * port or no board is held, why (`noBoardSegment`), and none of the seven.
 * @returns {Acting}
 */
export function actingSegment() {
  const s = REC.session(), b = REC.board(), dead = REC.deathReason(), refused = REC.sessionRefused(), lost = REC.reconnect();
  if (!PORT.hasAdapter() || !b) return noBoardSegment();
  if (s && lost && !lost.refused) {
    const values = { account: lost.as || '' };
    return keptWhole('L.reconnecting', t('L.reconnecting', values), tHTML('L.reconnecting', values, ACCOUNT), { state: s.writes ? 2 : 3, alarm: false, signIn: false });
  }
  if (s && !s.writes) {
    const values = { account: s.account || '' };
    return keptWhole('F.keyless-session', t('F.keyless-session', values), tHTML('F.keyless-session', values, ACCOUNT), { state: 3, alarm: false, signIn: false });
  }
  if (s) return signedSegment(s);
  if (dead) {
    // C-137's words for the arm, an ending's head; an arm whose words this page does not hold reads as the guest the page now is, whole in the head's place
    const w = deathWords(dead);
    return w ? keptWhole(w.id, w.text, addressedHTML(w.text), { state: 5, alarm: true, signIn: true }) : guestSegment(b.origin, null, null, { state: 5, alarm: true, compact: false });
  }
  return guestSegment(b.origin, lost && lost.refused ? lost.as || '' : null, refused, { state: refused && refused.name === 'no_key' ? 3 : 1, alarm: !!(lost && lost.refused), compact: true });
}

/** the daemon's segment, by the string it reads (`id`): silent while the board runs */
function daemonSegment() {
  const d = REC.daemon(), h = REC.health();
  const halted = !!(h && h.writes && h.writes.halted);
  const id = halted ? 'F.daemon.notebook.halted' : d === 'stopped' ? 'F.daemon.notebook.stopped' : d === 'unreachable' ? 'F.daemon.unreachable' : '';
  return { id, html: id ? `<span class="warn" data-string="${id}">${esc(t(id))}</span>` : '', halted, words: halted ? t(id) : '' };
}

/** the mode line: the flag-on transition at the first render after the pair changes (C-31), said through the status region */
function modeLine() {
  const h = REC.health();
  const trust = h && h.auth ? !!h.auth.local_trust : null;
  const mode = REC.mode();
  if (lastTrust !== null && trust !== null && trust !== lastTrust && trust) { transientSeg = { html: esc(t('F.flip')) + ' ' + esc(t('F.flip.run')), id: 'F.flip' }; FOCUS.say(t('F.flip') + ' ' + t('F.flip.run')); }
  lastTrust = trust; lastMode = mode;
}

/** the line's type size, in px — the style's (`#line`): what the room the address segment leaves its label is counted at */
const LINE_PX = 11;

/** @type {CanvasRenderingContext2D | null | undefined} the context the line's words are measured by at its size, made at its first use; null where the platform gives none (the node tests) */
let ruler;
/**
 * A run's width on the line, in px (see the head): the canvas's at the
 * line's size in its face, a client figure in a cell as wide as its face's
 * widest (P-LABEL's `runWidth`); where the platform gives no canvas, T-LAYER's
 * measure of it scaled to the line's size.
 * @param {string} text
 * @param {import('../plane/register.js').Face} f
 */
function lineWidth(text, f) {
  if (ruler === undefined) {
    const c = typeof document !== 'undefined' && typeof document.createElement === 'function' ? document.createElement('canvas') : null;
    ruler = c && typeof c.getContext === 'function' ? c.getContext('2d') : null;
  }
  return ruler ? runWidth(ruler, { text, face: f }, LINE_PX, 'normal') : LAYER.widthOf(text, f) * LINE_PX;
}

/**
 * The address part's place at a step (see the head): its levels — the board,
 * the account, the document — and whether they fold, at step 4 where the
 * place names all three.
 * @param {AddressDisplay} a
 * @param {Step} at
 */
function placeAt(a, at) {
  const levels = a.place.split(' › ');
  return { levels, fold: at >= 4 && levels.length === 3 };
}

/** the levels the fold mark folds (see the head): the account between the place's board and its document */
const foldedAt = (/** @type {AddressDisplay} */ a) => accountOf(a.addr) || a.addr;

/**
 * The room the address part leaves the document's label past its fields at a
 * step (see the head), in px: the characters the step reserves (`RESERVE`) in
 * the identifier's face, less the place's as shown — every character of it,
 * and the fold mark's room, one width — the position's words in the client's
 * figures where they stand, and a space of the label's face either side of
 * it; the strip's and the marker's room the same in both.
 * @param {AddressDisplay} a
 * @param {Step} at
 */
function labelRoom(a, at) {
  const { levels, fold } = placeAt(a, at);
  const shown = fold ? `${levels[0]} › `.length + FOLD_CH + ` › ${levels[2]}`.length : [...a.place].length;
  return (RESERVE[at] - shown) * lineWidth('0', 'ident') - (at < 1 ? a.slot * lineWidth('0', 'client') : 0) - 2 * lineWidth(' ', 'reading');
}

/**
 * The document's label after its field (see the head): its box's lead,
 * whole where the room the part leaves past its fields holds it (`labelRoom`),
 * else cut on a word, LEAD_WORDS of it kept at the least (P-LABEL's
 * `cutWords`), else none — each stretch in its face (ST's `facedHTML`); the
 * style gives it the room left and lets it give way word by word, its first
 * word too, after the empty lead-in it opens with, which gives it a line, and
 * so the line's baseline, with no word in it. Its element stands, holding
 * only its lead-in, where no document is named.
 * @param {AddressDisplay} a
 * @param {Step} at
 */
function labelHTML(a, at) {
  const words = a.label.map((r) => (r.face === 'client' ? r.text : inFace(r.face, r.text))).join(''), last = a.label[a.label.length - 1];
  if (!words) return '<span class="label"><span class="lead-in"></span></span>';
  const room = labelRoom(a, at), fits = (/** @type {string} */ s) => runsOf(s, 'client').reduce((w, r) => w + lineWidth(r.text, r.face), 0) <= room + 1e-6;
  const shown = fits(words) ? words : cutWords(words, fits, last.face === 'client' && last.text === CLIENT_CLOSE ? CLIENT_CLOSE : '', LEAD_WORDS);
  return `<span class="label"><span class="lead-in"></span>${shown ? facedHTML(runsOf(shown, 'client')) : ''}</span>`;
}

/**
 * The address segment's accessible name's words (see the head;
 * `L.address.name`): its fields in their order, the document's label after
 * its field whole, the position, the version pinned, then the document's
 * state in its short words (T-LAYER's `stateWords`), each after its own
 * separator, none where it is empty.
 * @param {AddressDisplay} a
 * @returns {Record<string, string>}
 */
function addressName(a) {
  const label = a.label.map((r) => r.text).join(''), state = a.doc ? LAYER.stateWords(REC.doc(a.doc)) : '';
  return { place: a.place, label: label ? ' ' + label : '', position: positionWords(a.pos), version: a.member ? ', ' + t('L.version', { k: a.member }) : '', state: state ? ', ' + state : '' };
}

/**
 * The position's slot (see the head): the position's words at step 0, as
 * wide as the document's widest position, then its strip (`strip`) — the
 * words standing empty below the document's reading scale, and both where no
 * document is named, their room kept, so nothing after it on the line moves;
 * where a position is named, the strip's act, named and titled by the
 * position, its readout the act's at every step.
 * @param {AddressDisplay} a
 * @param {Step} at
 */
function slot(a, at) {
  const words = at < 1 ? `<b class="pos" style="width:${a.slot}ch">${esc(positionWords(a.pos))}</b>` : '';
  if (a.pos == null) return `<span class="slot">${words}${strip(a)}</span>`;
  return `<button class="slot" data-act="strip" title="${esc(t('F.position', { p: a.pos }))}" aria-label="${esc(t('F.position', { p: a.pos }))}">${words}${strip(a)}</button>`;
}

/**
 * The position strip (see the head): the document's length, carrying the
 * runs of an arrival in several standing in that document, each an outlined
 * extent from its first position to its last, the one the landing stands at
 * filled; where a position is named, that position marked on it — or, where
 * the walk keeps the document in view off the view's centre, the view's
 * window over it, open at whichever end the view has run past; bare of both
 * where none is named; its room alone, hidden, where it does not stand
 * (`AddressDisplay.strip`).
 * @param {AddressDisplay} a
 */
function strip(a) {
  if (!a.strip || !a.doc) return '<span class="strip none" aria-hidden="true"></span>';
  const extent = REC.doc(a.doc).extent || 0;
  /** a position's place along the strip, 0 to 1 */
  const along = (/** @type {number} */ p) => (extent ? Math.max(0, Math.min(1, (p - 1) / extent)) : 0);
  const pct = (/** @type {number} */ u) => (u * 100).toFixed(1) + '%';
  const p = acts && acts.pieces ? acts.pieces() : null;
  const runs = p && p.addr === a.doc ? p.runs.map((r, i) => `<span class="strip-run${i === p.current ? ' current' : ''}" style="left:${pct(along(r.pos))};width:${pct(along(r.pos + r.width) - along(r.pos))}"></span>`).join('') : '';
  if (a.pos == null) return `<span class="strip">${runs}</span>`;
  const w = a.window;
  let mark = `<span class="strip-mark" style="left:${pct(along(a.pos))}"></span>`;
  if (w) {
    const from = w.start ? 0 : along(w.from), to = w.end ? 1 : along(w.to);
    mark = `<span class="strip-window${w.start ? ' open-start' : ''}${w.end ? ' open-end' : ''}" style="left:${pct(from)};width:${pct(to - from)}"></span>`;
  }
  return `<span class="strip">${runs}${mark}</span>`;
}

/**
 * The address part at a step (see the head): the address segment — the LEAP
 * box's act, named by its fields whole and the version it shows — its
 * position's slot and its version marker, which bears the segment's act and
 * is hidden from the accessibility tree, at the width the step reserves
 * (`RESERVE`); at step 4, where its place names an account between its board
 * and its document, the board's field, borne the same way, the fold mark in
 * the account's place — its act opening the LEAP box at the account
 * (`foldedAt`) — then the segment from the document's field.
 * @param {AddressDisplay} a
 * @param {Step} at
 */
function addressPart(a, at) {
  const { levels, fold } = placeAt(a, at);
  const head = fold ? `<b class="board" data-act="address" aria-hidden="true">${esc(levels[0])} › </b><button class="fold" data-act="fold" title="${esc(t('L.fold.name', { levels: levels[1] }))}" aria-label="${esc(t('L.fold.name', { levels: levels[1] }))}">${esc(t('L.fold'))}</button>` : '';
  return `<span class="address-part" style="--words:${RESERVE[at]}">${head}<button class="seg address" data-act="address" title="${esc(drawChord('Mod+L'))}" aria-label="${esc(t('L.address.name', addressName(a)))}"><b>${esc(fold ? ` › ${levels[2]}` : a.place)}</b>${labelHTML(a, at)}</button>${slot(a, at)}<span class="marker${a.member ? ' lit' : ''}${a.doc ? '' : ' none'}" data-act="address" aria-hidden="true" title="${a.member ? esc(t('L.version', { k: a.member })) : ''}">${a.member ? '●' : '○'}</span></span>`;
}

/**
 * @typedef {Object} Shown — what the line shows, read once for a rebuild or a setting of its layout
 * @property {AddressDisplay} a
 * @property {Acting} acting
 * @property {{id: string, html: string, halted: boolean, words: string}} daemon
 * @property {{id: string, text: string} | null} aside a jump's face standing out of the visible view (O-HOST's `aside`)
 * @property {import('../text/layer.js').KeptClause | null} kept the document named's clause, else the board's: the board heads every place the display names
 */

/** what the line shows now (`Shown`) */
function shown() {
  const a = addressDisplay();
  return { a, acting: actingSegment(), daemon: daemonSegment(), aside: acts && acts.aside ? acts.aside() : null, kept: (a.doc ? LAYER.keptIn(a.doc) : null) || LAYER.boardKeptIn() };
}

/**
 * The acting-as segment in a form (see the head): its whole form as it
 * stands; any other — a compact one, or its whole one its act opened — its
 * act, a native button named and titled by its whole form's words; a form
 * past its last, its last.
 * @param {Acting} a
 * @param {number} form the form the layout holds (`Acting.forms`)
 * @param {boolean} open its act opened its whole form
 */
function actingHTML(a, form, open) {
  const at = open ? 0 : Math.min(form, a.forms.length - 1);
  if (!a.name || (at === 0 && !open)) return `<span class="seg acting" data-state="${a.state}">${a.forms[0]}</span>`;
  return `<button class="seg acting" data-act="acting" data-state="${a.state}" title="${esc(t(a.name.id, a.name.values))}" aria-label="${esc(t(a.name.id, a.name.values))}">${a.forms[at]}</button>`;
}

/**
 * The line's parts in their order at a step (see the head): the acts — with
 * sign-in where the acting-as segment offers it — the address part, a kept
 * clause, the acting-as segment in a form (`actingHTML`), each walk's folded
 * moment, the daemon's form, a jump's face out of view and the transient
 * segment — none but the acting-as segment with a compact form, so each other
 * is the same at every step but the address part. Where `reserve` asks the
 * room each is held at, the acts hold sign-in whether it stands or not, and
 * the address part is its room alone, as wide whatever it names.
 * @param {Shown} s
 * @param {Step} at
 * @param {boolean} [reserve]
 * @param {number} [form] the acting-as segment's form, its whole one where its act opened it
 * @returns {Part[]}
 */
function partsOf(s, at, reserve = false, form = 0) {
  /** @type {Part[]} */
  const parts = [{ key: 'acts', html: actsHTML(reserve || s.acting.signIn) }, { key: 'address', html: reserve ? `<span class="address-part" style="--words:${RESERVE[at]}"></span>` : addressPart(s.a, at) }];
  if (s.kept) parts.push({ key: 'kept', html: `<span class="seg kept" data-string="${esc(s.kept.id)}">${esc(s.kept.text)}</span>` });
  parts.push({ key: 'acting', html: actingHTML(s.acting, form, !reserve && actingOpen) }, ...walkParts());
  if (s.daemon.html) parts.push({ key: 'daemon', html: `<span class="seg daemon">${s.daemon.html}</span>` });
  if (s.aside) parts.push({ key: 'aside', html: `<span class="seg aside" data-string="${esc(s.aside.id)}">${addressedHTML(s.aside.text)}</span>` });
  if (transientSeg) parts.push({ key: 'transient', html: `<span class="seg transient" data-string="${esc(transientSeg.id)}">${transientSeg.html}</span>` });
  return parts;
}

/**
 * The parts placed on the layout held (see the head): each row its parts that
 * stand, in the layout's order — the acts and the address part at the widths
 * the layout holds them at — a part grown past what its row's room holds
 * beneath the line; then each part the layout did not place in its place in the
 * line's order, right after the part before it that a row holds, where that
 * row's room holds it, else beneath. A row whose parts are all gone goes with
 * them. With no layout held, one row of every part.
 * @param {Part[]} parts
 * @returns {{rows: Part[][], beneath: Part[]}}
 */
function placed(parts) {
  if (!layout) return { rows: [parts], beneath: [] };
  const L = layout, by = new Map(parts.map((p) => [p.key, p]));
  const width = (/** @type {Part} */ p) => L.reserved[p.key] ?? widths([p.html])[0];
  /** @type {Part[][]} */
  const rows = [];
  /** @type {number[]} each row's parts' widths and the gaps between them */
  const used = [];
  /** @type {Part[]} */
  const beneath = [];
  /** @type {Map<string, number>} the row each part stands in, by key; -1 beneath the line */
  const at = new Map();
  for (const keys of L.rows) {
    /** @type {Part[]} */
    const row = [];
    let across = 0;
    for (const k of keys) {
      const p = by.get(k);
      if (!p) continue;
      const next = across + (row.length ? L.gap : 0) + width(p);
      if (row.length && next > L.room + 0.5) { beneath.push(p); at.set(k, -1); continue; }
      row.push(p); across = next; at.set(k, rows.length);
    }
    if (row.length) { rows.push(row); used.push(across); }
  }
  parts.forEach((p, i) => {
    if (at.has(p.key)) return;
    const before = parts.slice(0, i).reverse().find((q) => (at.get(q.key) ?? -1) >= 0), r = before ? /** @type {number} */ (at.get(before.key)) : -1, w = width(p);
    if (before && used[r] + L.gap + w <= L.room + 0.5) { rows[r].splice(rows[r].indexOf(before) + 1, 0, p); used[r] += L.gap + w; at.set(p.key, r); }
    else { beneath.push(p); at.set(p.key, -1); }
  });
  return { rows, beneath };
}

/** the line's bottom edge published to the style as `--line-bottom` (see the head), where it moved */
function publish() {
  const root = typeof document !== 'undefined' && document.documentElement && document.documentElement.style ? document.documentElement : null;
  if (!el || !root || typeof el.getBoundingClientRect !== 'function') return;
  const b = Math.ceil(el.getBoundingClientRect().bottom);
  if (b === published) return;
  published = b;
  root.style.setProperty('--line-bottom', b + 'px');
}

/**
 * Rebuild the line from state on the layout held (`placed`), the layout set
 * again first where the acting-as segment's fields or the daemon's form
 * changed state (`shapeOf`) — the act's whole form taken down with the form
 * it opened; the focus kept on the act that held it (rule 11); the assertive
 * words said once as they arrive (D4); its bottom edge published (`publish`).
 */
export function render(force = false) {
  if (!el) return;
  modeLine();
  closedSaid();
  const s = shown(), { acting, daemon } = s;
  if (layout && shapeOf(s) !== layout.shape) { actingOpen = false; setLayout(s, roomOf() ?? layout.room); }
  if (changedAt != null) {
    // a change of the page's class: said once, its ending with what it covered, as the reads it asked answer — never the ending alone first
    if (!PUMP.rereading() || performance.now() - changedAt >= PUMP.UNREACHED_MS) { changedAt = null; if (acting.alarm) FOCUS.say(endingSaid(acting.words), true); }
  } else if (acting.alarm && lastAlarm !== null && acting.words !== lastAlarm) FOCUS.say(acting.words, true);
  if (daemon.halted && !lastHalted) FOCUS.say(daemon.words, true);
  lastAlarm = acting.alarm ? acting.words : ''; lastHalted = daemon.halted;
  keptSaid();
  const { rows, beneath } = placed(partsOf(s, layout ? layout.step : 0, false, layout ? layout.form : 0));
  const html = rows.map((row) => `<div class="row">${row.map((p) => p.html).join(SEP)}</div>`).join('')
    + (beneath.length ? `<div class="beneath">${beneath.map((p) => p.html).join('')}</div>` : '');
  if (force || html !== lastHTML) {
    lastHTML = html;
    const host = el;
    FOCUS.keep(host, (e) => /** @type {HTMLElement} */ (e).dataset.act || null, () => { host.innerHTML = html; roving(); });
  }
  publish();
}

/** the strip's act (K-23): the ordinal and the passage's first words beneath, the version's own, until the next act */
export function stripAct() {
  const a = addressDisplay();
  if (!a.doc || a.pos == null) return;
  const words = REC.textBetween(a.doc, a.pos, a.pos + 60);
  transient(`${t('F.position', { p: a.pos })} · ${words}`, 'strip');
}

/** the line's text (the gate's text case) */
export const text = () => (el ? el.textContent || '' : '');
/** the line's bottom edge on screen: the plane's labels and corners hold below it (T-LAYER reads it through the reader the app hands in) */
export const bottom = () => (el ? el.getBoundingClientRect().bottom : 0);
export const state = () => actingSegment().state;
export const modeSeen = () => lastMode;
