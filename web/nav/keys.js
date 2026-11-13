// N-KEYS — D5's key table as a dispatch (the structure record §3.2; D5
// §1.1–§1.8, §1.11, §4; foundations §2.7). Layer 2. The table (`TABLE`) is
// pure; the dispatch acts on the owners it names, the one layer-2 module
// that imports across the layer (S-7 (a)). State (FP-10): the keys a jump in
// the air holds for its landing, in the order they were pressed, and whether
// they are being made; the hint a refused press raises is O-HINT's.
// The dispatch (`dispatch`; FP-25): the navigation acts — Mod+[ and Mod+]
// (K-20, K-21), Mod+1…9 (K-40), Mod+0 and Mod+Shift+H (K-13, K-14) — are
// made at once, a jump in the air abandoned (N-GO); every other key the page
// would act on while N-GO's jump is in the air, or while held keys are being
// made, is held (`hold`), its platform default prevented as it is pressed,
// and made at the jump's landing (`replay`) in the order pressed, with the
// context it was pressed in, marked as made there, its act read again where
// the focus is then (`route`), so a key means the same however slowly the
// board answers; a jump that never lands drops the keys it held. A key made
// at the landing takes nothing from a field the reader types in (FP-20): a
// surface it opens stands beside the field, which keeps the caret (N-FOCUS's
// `open`), and Esc passes over the chrome the field stands in (`esc`); one
// whose context is a corner is dropped, no act of a corner made at a landing
// (`cornerKey`). The keys a control takes as its own stay its own: a field's,
// the line's ← and → among its acts, an overlay's and a landing's line's
// buttons, a corner's acts' Enter and Space.
// No plane command rides a printable key (§2.7): every command is a chord
// (Mod = ⌘ on macOS, Ctrl elsewhere; D5 §0) or a navigation key with the
// platform's meaning. A printable key (`printable`; D5 §0) — on macOS the
// characters Option types among them, a key with ⌘ or Ctrl held never one —
// on the plane is swallowed, never dispatched, its hint at the focus the line
// its site keys (O-HINT's `show`): in text the person may edit the caret's
// (below); at the walk's span, at its reading scale, in text the person may
// not edit, every key but Space answered by its document's line, and a paste
// there by the same line, nothing placed (`siteSays`; D5 K-72, K-93) — at an
// edition of the session's account C-45 naming the document, at a document of
// another account B3-S13's line naming its owner; at the corner of a draft the
// person may edit, every key but Space answered by B3-S13's line naming the
// way back to the draft's text by its chord, Shift+Tab (`B3.caret.back`),
// nothing placed (`cornerSays`; D5 K-72; D6 BM-52), and at any other corner
// of the plane every key the platform's; Space at a corner the act's it stands on,
// else the platform's (`cornerKey`), Space wherever else it is swallowed, and every other key at
// every other site, K-9's line (`swallow`).
// Each of those lines a printable key raises — the corner's and the scene's
// swallow among them — ends with where the person was writing, "you were
// last writing in ⟨label⟩", a sentence after the line's (O-HINT's), where the
// key was pressed outside the draft last written in the page's session and
// that draft's caret stands kept: its label one act back to the kept caret
// (`writingElsewhere`; W-WRITE's `lastWritten`).
// Mod+R and F5 are taken and nothing reloaded (K-94), and the platform's own
// chords — copy, paste, cut, select all, print, close, quit, minimize, hide,
// preferences — are never taken save where a site's line answers a paste or a
// cut (K-93), and save Mod+C outside a field where the platform holds no
// selection with extent (K-92; `copyAsDrawn`): there the selection the page
// draws is placed under the copy again, which then runs as the platform's;
// with nothing selected, the copy is prevented at its keydown, the clipboard
// left as it is, and the line is its hint at the focus, said in the status
// region — whole at the first such copy in the page's session, its first
// clause after — the act that selects there the sentence it ends on while it
// stands whole: Enter's where Enter selects the walk's span (`enterSelects`),
// Shift+↓'s at any other span at its reading scale, none anywhere else, its
// key drawn for this platform (`selectsHere`). A copy event T-LAYER
// takes nothing from — the Edit menu's, the context menu's — is answered the
// same way (APP's). No key is dispatched while an input method's composition
// is open (the IME guard).
// THE CARET (D5 K-51, K-70, K-71, K-72, K-76, K-77; D6 BM-1, BM-52, BM-54,
// BM-70, BM-75): in text the person may edit (T-LAYER's `editable`) Enter at
// the walk's focused span places the caret at the span's start, or returns
// the kept one standing in that span (`activateFocus`; T-LAYER's
// `caretToSpan`); while a live caret stands on the plane in text the person
// may edit at the camera's scale the focus is at it (`Ctx.where` `caret`,
// read as a key is pressed and again as a held key is made, `whereNow`) — a
// live caret in text that scale does not read, its span then holding the
// walk (N-WALK's `holdCaret`), or one the walk stands outside of in another
// document, left kept as the key finds it (D5 M-2), every other move of the
// walk leaving it as the move is made (N-WALK's), and a pointer's act on
// another document, or a selection put there, as the act is made
// (APP-INPUT's, O-SELECTION's) —
// and its keys reach it before the walk's and K-8's (`caretKey`): the arrows
// move it a character or a line — ← and → a word with Option held on macOS
// (`arrowStep`; K-71) — Home and End to the start or the end of its line
// (D5 M-13), and with Shift move it and extend a selection from it
// (O-SELECTION's `extendFromCaret`; D5 §1.6); Backspace and Delete take a
// character out, Enter and Shift+Enter put a new line in, Tab a tab
// character, a printable key its character — each a change of the text
// shown alone, an edit handed to W-WRITE (T-LAYER; FP-9, FP-14) — and the
// walk then stands on the block of the text shown the caret is in (N-WALK's
// `followCaret`; B3-S13), so the slot chords act on that block. A selection the screen
// draws in the caret's own text, reaching into no other document's text
// (O-SELECTION's `reachesPast`; FP-40), is the caret's (`selectedAtCaret`):
// it ends with any of those
// keys but Shift's, its card with it: each that puts text in or takes it out
// replaces the selection, the key's text — none for Backspace and Delete —
// standing in its bytes' place, the caret after it (`editAtCaret`; T-LAYER's
// `caretReplace`), and an arrow without Shift puts the caret at the
// selection's start for ← and at its end for →, and steps it a line from
// where it stands for ↑ and ↓, Home and End to the start or the end of the
// caret's line (`stepCaret`). At a live caret Mod+Enter follows from such a
// selection alone: where none is drawn there it selects
// nothing, follows nothing and leaves the caret where it stands, the caret's
// follow line its hint (`followAtCaret`; B3-S13); every other key acts as on
// the plane. Where the caret's draft cannot be written now (W-WRITE's
// `unwritable`; D6 BM-20, BM-24, BM-30, BM-58, BM-60) a key that would put
// text in or take it out, a paste and a cut add no edit: the key is answered
// at the caret by the reason's own line, its hint, said in the status region
// (`unwritableSays`), while the arrows still move the caret and a selection
// is still made and copied. The first key typed in a draft after a moved
// verdict came to stand on it is followed by that verdict's line, once
// (`movedSays`; BM-18). At a span of such a draft where no caret stands a printable key
// but Space is answered by the draft's own line, naming Enter as the key that
// places a caret there (`B3.caret.enter`; K-72, K-9), and a paste or a cut
// there by that line in their own words, each its hint, nothing placed and
// nothing removed (K-93); at the span a
// kept caret stands in (`keptSpan`), a printable key returns it and types at
// it as at a live caret (`typeAt`), and Shift with ← or → returns it and
// extends a selection from it as at a live caret, never from the span's edge
// (`extendAtKept`; K-70, K-77), the walk following the caret. Every hint stands
// beside the focus the key was pressed at — the walk's element, or the
// control or the pane the key found the focus on — and an auto-repeat is the
// press it repeats (O-HINT's `show`). Mod+S writes nothing itself (K-74; D6
// BM-3): it asks W-WRITE to commit the open burst of the draft the caret
// stands in — else the walk's document — waits for it to land, and answers
// from the kept state then, at once where no burst of the draft is open or
// awaits its ack; a key taken before the answer drops it. Where the draft has
// a kept state, the answer is the state's statement at the corner, whole at
// the first press in a session, and the corner's own word after it, the
// statement whole on the word's act (`saveChord`, `saveAnswer`; P41;
// T-LAYER's `openStatement`), said in the status region (FP-36) — under a
// hold while the board is not answering the one statement the table holds
// for that silence (T-LAYER's `keptSaid`); elsewhere the chord is taken and
// does nothing.
// Esc closes the innermost thing, in one order (`esc`; §4 rule 7; D7): the
// box, a card or scene still reading, the notice standing below the overlay
// (FP-36; O-HOST's), the overlay, a jump reaching, the find — its current
// match left selected with the focus on it (N-FIND's `close`; FP-20) — the
// scene — its close a Back from its entry (N-GO's `closeScene`) — the
// selection, then a live caret — the text left to the walk at the caret's
// span, the caret KEPT there (K-77; BM-4), which Enter, a printable key or
// Shift with ← or → at that span returns, the span holding the walk through
// the camera's moves until the person's next walk move or landing (N-WALK's
// `leaveText`) — and after them all the arrival (FP-21; N-GO's
// `endArrival`); made at a landing, it passes over the box, over the find
// and over an overlay whose own field holds the caret, the notice below that
// overlay still closing first (FP-20). An empty click on the plane takes the
// same order one step a click, the pointer's, its last step the live caret's
// (APP-INPUT's). Mod+L alone opens the LEAP box (K-30),
// whose Mod+Shift+Enter is its own "open beside" and never reaches the
// dispatch (K-101; N-LEAP's `beside`),
// the trail's list by its platform's history chord — Mod+Y on macOS, Ctrl+H
// elsewhere (K-41; `trailChord`) — Mod+= and Mod+- zoom the camera by 1.25
// about the view's centre and re-take the focus (K-11), Mod+Shift+P shows the
// one line's strip (K-23), and the selection's slot chords (K-45 … K-52,
// K-100) and K-8's select-by-span act from the plane and from a standing
// overlay alike. The chords of the slots that send a name for characters —
// annotate's, quote's and "link to…"'s, Mod+K (K-45, K-46, K-100) — take
// effect once the board holds the words, and under a hold stand inert with
// the row rule's reason (O-SELECTION's `send`); what then opens gives the
// slot's reason (P47): at the
// slot of the acts card drawn at the span in focus — the selection, else the
// walk's focused span, nothing selected (O-SELECTION's `inertChord`) — else,
// and over the scene, as its hint (`inertSaid`); at a selection in the moved
// scene's held version, the reason that selection keys answers them and a
// printable key but Space alike, as its hint (`heldSaid`; D6 BM-14).
// Every other slot's chord (K-47 … K-52) makes its slot's act on what is in
// focus (O-SELECTION's `act`) — save Mod+Enter at a live caret (above) — and
// where nothing in focus is what the slot acts on gives the slot's reason,
// "select a passage first", as its hint (`selectFirst`; D5 §1.6; P47). Find
// (K-91; `findAct`) acts from the plane, the scene, a field and every control
// on them alike, the browser's own find never run: Mod+F opens the page's
// find at the document the focus is in, off any document its hint saying
// where words are found (N-FIND's `open`); Mod+G and
// Mod+Shift+G — F3 and Shift+F3 too elsewhere than macOS — step its matches
// where it stands (N-FIND's `step`), else the next and the previous run of an
// arrival in several runs (N-GO's `step`; FP-21) while such an arrival
// stands or a jump is in the air that may land one, else open the find as
// Mod+F does. Where the focus is (`Ctx.where`) decides the rest: in a field
// every key but Esc and find's chords is the field's own; on the line ← and
// → move among its acts and every other key is the
// act's own (K-22); at a corner (K-57; `cornerKey`) its acts are buttons the
// platform activates once a press — Enter at its press, Space and Shift+Space
// at its release, each act its click's (APP-INPUT's) — an auto-repeat, and a
// press made while a key waits, taken so the platform activates nothing; a
// corner holding no act is its one stop, the page taking neither Enter nor
// Space at its container, which acts on nothing; ← and → move the focus along the line of acts holding it,
// K-22's form, staying at its ends (T-LAYER's `setStops`); at a draft the
// person may edit a printable key but Space is answered by the way back to
// its text (`cornerSays`, above); its other keys are the platform's; in an
// overlay and at a landing's line
// every key is the control's own; on the plane the walk's keys (K-1 … K-5) move
// the walk, Enter activates the focus (K-7) — at a continuation's mark's stop
// it opens the mark's list — and the paging keys page the camera (K-6);
// while the scene stands its keys alone are read (`sceneKey`; D5 M-4), and
// nothing under it takes one. Whether a key made an act is the
// focus owner's one reading, handed in by the app with each key (`Ctx.byKey`;
// FP-20), so a re-take a key made puts the platform's focus on the element it
// lands on wherever the key was pressed (rules 10, 12), and a surface a key
// opens takes the focus. Every key but a walk key or K-8 made at the plane,
// and a modifier going down, hides the walk's panel as it is pressed
// (N-WALK's `hidePanel`; D5 §4 rule 2). →
// at a document below its reading scale (N-WALK's `collapsed`) takes Enter's
// act, a teleport to its reading scale pushed on the trail (foundations
// §2.2); at its reading scale → enters its spans (K-3). The paging key
// continues at the next column's top where the view shows the foot of the
// column it reads (T-LAYER's `pageTarget`; FP-12), and pages the view by 0.9
// of its height everywhere else. Off a live caret, Shift with ← and → is
// dispatched at the span a kept caret stands in (`extendAtKept`), at any
// other span of a draft the person may edit, where the caret is placed live
// at the moving end of the selection standing in the draft, else at the
// span's edge, and the selection extended from it as at a live caret, the
// walk following the caret (`bareDraftSpan`; O-SELECTION's `extendFromSpan`;
// K-70; FP-40), and at the
// walk's focused span in text the person may not edit at its reading scale,
// where it moves the selection's moving end a step, else selects one from the
// span's edge (`readOnlySpan`; O-SELECTION's `extendFromFocus`; K-70), each a
// word with Option held on macOS and a character otherwise (`arrowStep`):
// anywhere else — a document below its reading scale, off a span — it is the
// platform's own (K-71), and APP-INPUT reads what it does back into the
// page's selection. Where no board is held (FP-35) the
// walk's keys at the plane (K-1 … K-5, K-7), K-8, the selection's slot chords
// (K-45 … K-52, K-100), the strip (K-23) and find's chords (K-91) each answer
// with O-FACES' no-board face, as HOME and
// WHOLE BOARD do through N-GO; the paging keys and the zoom chords stay the
// camera's.
// UNDO AND REDO (D5 K-75; D6 BM-31 … BM-34, BM-42, BM-45; `undoChord`): Mod+Z
// undoes, Mod+Shift+Z redoes, and Ctrl+Y redoes too elsewhere than macOS
// (`undoAct`), from the plane, the scene, a corner, the line and every
// control but a field, whose own they stay. The chord acts on the draft whose
// text holds the caret, else the draft whose caret the person last held while
// that draft stands in view at its reading scale, never on a document a
// camera move put the walk in (`undoTarget`): W-MACHINE takes the newest step
// back, or puts the step undone last back, at once; the caret then stands
// where the step began, live, the walk on its span and its mark brought into
// view; and what it did is said in the status region alone, never drawn —
// "taken out — …" then "put back — …" by the first words of each. Where the
// step's line awaits an act of the person's at its face, the press shows that
// face — a moved document's standing at its corner, opened whole there where
// it stands compact and its words said — and takes none of its acts. Where
// the draft cannot be written the
// reason's line answers it (`unwritableSays`). On an empty stack the undo is
// answered by the empty stack's line; with no such draft, by the document's
// line where the walk stands on an edition of the person's own or on
// another's document (`siteSays`), else by the no-caret line, ending with
// where the person was last writing; each of the three ending on B3-S3's
// constant sentence while it stands whole, and each its hint at the focus. An
// undo the board declines — its source withheld — is said in the one line,
// ending with what the chord again undoes (`declined`; D6 BM-11, BM-12).
// What an undo or a redo says names the person's words as they stand, kept
// as written when they are rendered for the ear (ST's `heard`; style S22).
// A chord is drawn as this platform's menus draw it (`drawChord`; style S21,
// K16) — every key a hint's line names a token of its string filled so — and
// exposed by the control it acts through as its keys (`keyShortcut`; patterns
// K3), its spoken words S22's for the drawn chord.
// State (FP-10), beside the held keys: whether Mod+S has been
// answered whole this session (`saveAnswered`), how many keys the dispatch
// has taken (`keysTaken`), and the save chord's latest answer (`saving`).
// Rules: FP-1, FP-2, FP-9, FP-10, FP-11, FP-13, FP-14, FP-20, FP-21, FP-24,
// FP-25, FP-27, FP-35, FP-36, FP-38, FP-39, FP-40, FP-41.

import * as GO from './go.js';
import * as WALK from './walk.js';
import * as LEAP from './leap.js';
import * as FIND from './find.js';
import * as FOCUS from './focus.js';
import * as REC from '../model/records.js';
import * as WRITE from '../write/write.js';
import * as MACHINE from '../write/machine.js';
import * as HOST from '../overlays/host.js';
import * as FACES from '../overlays/faces.js';
import * as SEL from '../overlays/selection.js';
import * as SCENE from '../scene/scene.js';
import * as LINE from '../line/line.js';
import * as TRAILLIST from '../overlays/trail-list.js';
import * as MARKLIST from '../overlays/mark-list.js';
import * as ANATOMY from '../overlays/anatomy-card.js';
import * as HINT from '../overlays/hint.js';
import * as DELETION from '../overlays/deletion.js';
import * as CAM from '../plane/camera.js';
import * as LAYER from '../text/layer.js';
import { keptWord, keptStatement } from '../text/article.js';
import { accountOf, documentOf } from '../model/address.js';
import { t, tRuns, joinRuns, sentence, sentences } from '../strings.js';

/** @typedef {import('../overlays/selection.js').InertSlot} InertSlot */
/** @typedef {import('../overlays/selection.js').LiveSlot} LiveSlot */
/** @typedef {import('../text/layer.js').CaretStep} CaretStep */
/** @typedef {import('../text/layer.js').ArrowStep} ArrowStep */

/** the platform's primary command modifier: ⌘ on macOS, Ctrl elsewhere (D5 §0) */
export let MAC = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform || '');
/** the platform read as macOS, or as any other (tests): what `MAC` answers from then */
export function _platform(/** @type {boolean} */ mac) { MAC = mac; }

/**
 * @typedef {Object} Row — one row of D5's key table
 * @property {string} id K-n
 * @property {string} chord the key as D5 writes it (`Mod+L`, `↓`, `Enter`)
 * @property {string} act the act's name
 * @property {'plane' | 'line' | 'box' | 'trail' | 'selection' | 'cards' | 'corner' | 'scene' | 'caret' | 'platform'} surface `caret` a key at a live caret in text the person may edit
 */

/** the table: every chord the page binds, by D5's row — K-9's swallow, K-72's printable keys at a caret, at a draft's span and at its corner, K-10's quasimode and K-12's pinch are APP-INPUT's and the dispatch's own; `Alt+` is Option on macOS, the only platform the page takes it on (`arrowStep`); K-41's Mod+Y is macOS's and its Mod+H every other platform's, where Mod+Y is K-75's redo (`trailChord`, `undoAct`) */
export const TABLE = Object.freeze(/** @type {Row[]} */ ([
  { id: 'K-1', chord: '↓', act: 'walk.down', surface: 'plane' },
  { id: 'K-2', chord: '↑', act: 'walk.up', surface: 'plane' },
  { id: 'K-3', chord: '→', act: 'walk.in', surface: 'plane' },
  { id: 'K-4', chord: '←', act: 'walk.out', surface: 'plane' },
  { id: 'K-5', chord: 'Home', act: 'walk.first', surface: 'plane' },
  { id: 'K-5', chord: 'End', act: 'walk.last', surface: 'plane' },
  { id: 'K-6', chord: 'PageDown', act: 'camera.pageDown', surface: 'plane' },
  { id: 'K-6', chord: 'PageUp', act: 'camera.pageUp', surface: 'plane' },
  { id: 'K-7', chord: 'Enter', act: 'walk.act', surface: 'plane' },
  { id: 'K-8', chord: 'Shift+↓', act: 'select.span', surface: 'plane' },
  { id: 'K-8', chord: 'Shift+↑', act: 'select.span', surface: 'plane' },
  { id: 'K-11', chord: 'Mod+=', act: 'camera.zoomIn', surface: 'plane' },
  { id: 'K-11', chord: 'Mod+-', act: 'camera.zoomOut', surface: 'plane' },
  { id: 'K-13', chord: 'Mod+0', act: 'go.wholeBoard', surface: 'plane' },
  { id: 'K-14', chord: 'Mod+Shift+H', act: 'go.home', surface: 'plane' },
  { id: 'K-20', chord: 'Mod+[', act: 'go.back', surface: 'line' },
  { id: 'K-21', chord: 'Mod+]', act: 'go.forward', surface: 'line' },
  { id: 'K-23', chord: 'Mod+Shift+P', act: 'line.strip', surface: 'line' },
  { id: 'K-30', chord: 'Mod+L', act: 'leap.open', surface: 'box' },
  { id: 'K-34', chord: 'Esc', act: 'esc', surface: 'box' },
  { id: 'K-101', chord: 'Mod+Shift+Enter', act: 'leap.beside', surface: 'box' },
  { id: 'K-40', chord: 'Mod+1…9', act: 'trail.jump', surface: 'trail' },
  { id: 'K-41', chord: 'Mod+Y', act: 'trail.list', surface: 'trail' },
  { id: 'K-41', chord: 'Mod+H', act: 'trail.list', surface: 'trail' },
  { id: 'K-45', chord: 'Mod+Shift+A', act: 'selection.annotate', surface: 'selection' },
  { id: 'K-46', chord: 'Mod+Shift+C', act: 'selection.quote', surface: 'selection' },
  { id: 'K-47', chord: 'Mod+Shift+O', act: 'selection.wrote', surface: 'selection' },
  { id: 'K-48', chord: 'Mod+Shift+R', act: 'selection.uses', surface: 'selection' },
  { id: 'K-49', chord: 'Mod+Shift+L', act: 'selection.links', surface: 'selection' },
  { id: 'K-51', chord: 'Mod+Enter', act: 'selection.follow', surface: 'selection' },
  { id: 'K-51', chord: 'Mod+Enter', act: 'caret.follow', surface: 'caret' },
  { id: 'K-52', chord: 'Mod+Shift+Enter', act: 'selection.scene', surface: 'selection' },
  { id: 'K-100', chord: 'Mod+K', act: 'selection.linkto', surface: 'selection' },
  { id: 'K-55', chord: 'Enter', act: 'cards.open', surface: 'cards' },
  { id: 'K-57', chord: 'Enter', act: 'corner.act', surface: 'corner' },
  { id: 'K-57', chord: '→', act: 'corner.next', surface: 'corner' },
  { id: 'K-57', chord: '←', act: 'corner.previous', surface: 'corner' },
  { id: 'K-70', chord: 'Enter', act: 'caret.place', surface: 'plane' },
  { id: 'K-70', chord: 'Shift+←', act: 'select.extendLeft', surface: 'plane' },
  { id: 'K-70', chord: 'Shift+→', act: 'select.extendRight', surface: 'plane' },
  { id: 'K-70', chord: 'Alt+Shift+←', act: 'select.extendWordLeft', surface: 'plane' },
  { id: 'K-70', chord: 'Alt+Shift+→', act: 'select.extendWordRight', surface: 'plane' },
  { id: 'K-70', chord: 'Shift+←', act: 'caret.placeExtendLeft', surface: 'plane' },
  { id: 'K-70', chord: 'Shift+→', act: 'caret.placeExtendRight', surface: 'plane' },
  { id: 'K-70', chord: 'Alt+Shift+←', act: 'caret.placeExtendWordLeft', surface: 'plane' },
  { id: 'K-70', chord: 'Alt+Shift+→', act: 'caret.placeExtendWordRight', surface: 'plane' },
  { id: 'K-71', chord: '←', act: 'caret.left', surface: 'caret' },
  { id: 'K-71', chord: '→', act: 'caret.right', surface: 'caret' },
  { id: 'K-71', chord: '↑', act: 'caret.up', surface: 'caret' },
  { id: 'K-71', chord: '↓', act: 'caret.down', surface: 'caret' },
  { id: 'K-71', chord: 'Shift+←', act: 'caret.extendLeft', surface: 'caret' },
  { id: 'K-71', chord: 'Shift+→', act: 'caret.extendRight', surface: 'caret' },
  { id: 'K-71', chord: 'Shift+↑', act: 'caret.extendUp', surface: 'caret' },
  { id: 'K-71', chord: 'Shift+↓', act: 'caret.extendDown', surface: 'caret' },
  { id: 'K-71', chord: 'Home', act: 'caret.lineStart', surface: 'caret' },
  { id: 'K-71', chord: 'End', act: 'caret.lineEnd', surface: 'caret' },
  { id: 'K-71', chord: 'Shift+Home', act: 'caret.extendLineStart', surface: 'caret' },
  { id: 'K-71', chord: 'Shift+End', act: 'caret.extendLineEnd', surface: 'caret' },
  { id: 'K-71', chord: 'Alt+←', act: 'caret.wordLeft', surface: 'caret' },
  { id: 'K-71', chord: 'Alt+→', act: 'caret.wordRight', surface: 'caret' },
  { id: 'K-71', chord: 'Alt+Shift+←', act: 'caret.extendWordLeft', surface: 'caret' },
  { id: 'K-71', chord: 'Alt+Shift+→', act: 'caret.extendWordRight', surface: 'caret' },
  { id: 'K-72', chord: 'Backspace', act: 'caret.erase', surface: 'caret' },
  { id: 'K-72', chord: 'Delete', act: 'caret.erase', surface: 'caret' },
  { id: 'K-74', chord: 'Mod+S', act: 'save.answer', surface: 'plane' },
  { id: 'K-75', chord: 'Mod+Z', act: 'undo', surface: 'plane' },
  { id: 'K-75', chord: 'Mod+Shift+Z', act: 'redo', surface: 'plane' },
  { id: 'K-75', chord: 'Mod+Y', act: 'redo', surface: 'plane' },
  { id: 'K-76', chord: 'Tab', act: 'caret.tab', surface: 'caret' },
  { id: 'K-76', chord: 'Enter', act: 'caret.newline', surface: 'caret' },
  { id: 'K-76', chord: 'Shift+Enter', act: 'caret.newline', surface: 'caret' },
  { id: 'K-77', chord: 'Esc', act: 'caret.leave', surface: 'caret' },
  { id: 'K-77', chord: 'Shift+←', act: 'caret.returnExtendLeft', surface: 'plane' },
  { id: 'K-77', chord: 'Shift+→', act: 'caret.returnExtendRight', surface: 'plane' },
  { id: 'K-77', chord: 'Alt+Shift+←', act: 'caret.returnExtendWordLeft', surface: 'plane' },
  { id: 'K-77', chord: 'Alt+Shift+→', act: 'caret.returnExtendWordRight', surface: 'plane' },
  { id: 'K-91', chord: 'Mod+F', act: 'find.open', surface: 'plane' },
  { id: 'K-91', chord: 'Mod+G', act: 'find.next', surface: 'plane' },
  { id: 'K-91', chord: 'Mod+Shift+G', act: 'find.previous', surface: 'plane' },
  { id: 'K-91', chord: 'F3', act: 'find.next', surface: 'plane' },
  { id: 'K-91', chord: 'Shift+F3', act: 'find.previous', surface: 'plane' },
  { id: 'K-91', chord: 'Mod+G', act: 'arrival.next', surface: 'plane' },
  { id: 'K-91', chord: 'Mod+Shift+G', act: 'arrival.previous', surface: 'plane' },
  { id: 'K-62', chord: 'Mod+R', act: 'scene.relevel', surface: 'scene' },
  { id: 'K-63', chord: 'Esc', act: 'esc', surface: 'scene' },
  { id: 'K-64', chord: 'Mod+=', act: 'scene.swallowZoomIn', surface: 'scene' },
  { id: 'K-92', chord: 'Mod+C', act: 'platform.copy', surface: 'platform' },
  { id: 'K-92', chord: 'Mod+C', act: 'copy.nothing', surface: 'plane' },
  { id: 'K-92', chord: 'Mod+P', act: 'platform.print', surface: 'platform' },
  { id: 'K-94', chord: 'Mod+R', act: 'nothing', surface: 'platform' },
]));

/** the selection's slot chords (K-45 … K-52, K-100): the TABLE's selection rows */
const SLOT_CHORDS = new Set(TABLE.filter((r) => r.surface === 'selection').map((r) => r.chord));
/** the inert slots' chords (K-45, K-46, K-100), each with the slot it activates (O-SELECTION's `inertChord`) */
const INERT_CHORDS = /** @type {Map<string, InertSlot>} */ (new Map([['Mod+Shift+A', 'annotate'], ['Mod+Shift+C', 'quote'], ['Mod+K', 'linkto']]));
/** every other slot's chord (K-47 … K-52), each with the slot whose act it makes (O-SELECTION's `act`) */
const LIVE_CHORDS = /** @type {Map<string, LiveSlot>} */ (new Map([['Mod+Shift+O', 'wrote'], ['Mod+Shift+R', 'uses'], ['Mod+Shift+L', 'links'], ['Mod+Enter', 'follow'], ['Mod+Shift+Enter', 'scene']]));
/** the walk's keys at the plane (K-1 … K-5, K-7) */
const WALK_KEYS = new Set(['↓', '↑', '→', '←', 'Home', 'End', 'Enter']);
/** the keys that make no act of their own as they go down: a modifier held for a chord */
const MODIFIERS = new Set(['Shift', 'Meta', 'Control', 'Alt', 'AltGraph']);
/** does a key at the focus keep the walk's panel standing: a walk key or K-8 made at the plane, or a modifier going down (N-WALK's `hidePanel`) */
const keepsPanel = (/** @type {KeyboardEvent} */ e, /** @type {string} */ chord, /** @type {Ctx} */ ctx) => MODIFIERS.has(e.key) || (ctx.where === 'plane' && (WALK_KEYS.has(chord) || chord === 'Shift+↓' || chord === 'Shift+↑'));
/** a find chord's move (K-91): 1 the next, -1 the previous — Mod+G and Mod+Shift+G, and F3 and Shift+F3 elsewhere than macOS — 0 for any other chord */
const findDir = (/** @type {string} */ chord) => (chord === 'Mod+G' || (!MAC && chord === 'F3') ? 1 : chord === 'Mod+Shift+G' || (!MAC && chord === 'Shift+F3') ? -1 : 0);

/** the trail's list's chord (K-41), the platform's history chord: Mod+Y on macOS; Ctrl+H elsewhere, where Ctrl+Y redoes (K-75) */
export const trailChord = () => (MAC ? 'Mod+Y' : 'Mod+H');
/** the act an undo chord makes (K-75): Mod+Z undoes; Mod+Shift+Z redoes, and Ctrl+Y too elsewhere than macOS; null for any other chord */
export const undoAct = (/** @type {string} */ chord) => (chord === 'Mod+Z' ? 'undo' : chord === 'Mod+Shift+Z' || (!MAC && chord === 'Mod+Y') ? 'redo' : null);

/** the chord a KeyboardEvent spells, in D5's notation — `Mod+Shift+L`, `↓`, `Enter`, or the printable key itself; Option on macOS spells nothing (D5 §0), so a key means what it means without it, the word step reading Option itself (`arrowStep`) */
export function chordOf(/** @type {KeyboardEvent} */ e) {
  const mod = MAC ? e.metaKey : e.ctrlKey;
  const parts = [];
  if (mod) parts.push('Mod');
  if (e.shiftKey) parts.push('Shift');
  if (e.altKey && !MAC) parts.push('Alt');
  let k = e.key;
  const map = { ArrowDown: '↓', ArrowUp: '↑', ArrowRight: '→', ArrowLeft: '←', Escape: 'Esc', ' ': 'Space' };
  if (k in map) k = map[/** @type {keyof typeof map} */ (k)];
  if (k.length === 1 && /[a-z]/i.test(k)) k = k.toUpperCase();
  if (k === '+') k = '=';
  parts.push(k);
  return parts.join('+');
}

/**
 * Is the key printable — one that types a character in a field (D5 §0)? It
 * spells one character, and on macOS neither ⌘ nor Ctrl is held, the
 * characters Option types among them (⌥G is ©); elsewhere neither Ctrl nor
 * Alt is held.
 */
export const printable = (/** @type {KeyboardEvent} */ e) => e.key.length === 1 && (MAC ? !e.metaKey && !e.ctrlKey : !e.ctrlKey && !e.altKey);

/** the step ← or → makes where the page makes it (K-70, K-71, K-77): a word with Option held on macOS, else a character */
function arrowStep(/** @type {KeyboardEvent} */ e) {
  const left = e.key === 'ArrowLeft';
  return /** @type {ArrowStep} */ (MAC && e.altKey ? (left ? 'wordLeft' : 'wordRight') : left ? 'left' : 'right');
}

/** a chord in D5's notation (D5 §0): the modifiers it holds, each followed by "+", then its key */
const CHORD_PARTS = /^((?:(?:Mod|Ctrl|Alt|Shift)\+)*)(.+)$/;
/** each modifier as macOS draws it, in the order its menus draw them (style K16): Control, Option, Shift, Command */
const MAC_MODIFIERS = /** @type {const} */ ([['Ctrl', '⌃'], ['Alt', '⌥'], ['Shift', '⇧'], ['Mod', '⌘']]);
/** a named key drawn as its words on every platform (style K10) */
const NAMED_KEYS = /** @type {Record<string, string>} */ ({ PageDown: 'Page Down', PageUp: 'Page Up' });

/**
 * How one chord, in D5's notation, is drawn for this platform (style S21,
 * K16): on macOS its modifier glyphs in the order ⌃ ⌥ ⇧ ⌘, each drawn once
 * wherever it stands in the chord, then its key with nothing between — Enter
 * "↩" in a chord and "Return" alone; elsewhere "Ctrl" (D5's Mod or Ctrl),
 * "Alt" and "Shift", then its key, joined by "+", Enter "Enter". Page Down
 * and Page Up are their words on both (K10); every other key — Esc, Tab,
 * Space, Home, End, an arrow, a letter, a digit, a sign — as D5 writes it. A
 * line naming two chords draws each by its own call.
 * @param {string} chord one chord in D5's notation: `Mod+Shift+O`, `Shift+↓`, `Enter`
 * @returns {string}
 */
export function drawChord(chord) {
  const m = CHORD_PARTS.exec(chord), held = new Set(m ? m[1].split('+').filter(Boolean) : []), key = m ? m[2] : chord;
  if (MAC) {
    const glyphs = MAC_MODIFIERS.filter(([k]) => held.has(k)).map(([, g]) => g).join('');
    return glyphs + (key === 'Enter' ? (glyphs ? '↩' : 'Return') : NAMED_KEYS[key] ?? key);
  }
  const words = [held.has('Mod') || held.has('Ctrl') ? 'Ctrl' : '', held.has('Alt') ? 'Alt' : '', held.has('Shift') ? 'Shift' : ''].filter(Boolean);
  return [...words, NAMED_KEYS[key] ?? key].join('+');
}

/** a key in D5's notation as `aria-keyshortcuts` names it (UI Events' key values) */
const SHORTCUT_KEYS = /** @type {Record<string, string>} */ ({ Esc: 'Escape', '↓': 'ArrowDown', '↑': 'ArrowUp', '←': 'ArrowLeft', '→': 'ArrowRight' });

/**
 * A chord as the control it acts through exposes it (`aria-keyshortcuts`;
 * style S21, patterns K3): its parts in D5's order joined by "+", Mod the
 * platform's — Meta on macOS, Control elsewhere — and each key by its UI
 * Events name.
 * @param {string} chord in D5's notation
 */
export const keyShortcut = (chord) => chord.split('+').map((p) => (p === 'Mod' ? (MAC ? 'Meta' : 'Control') : SHORTCUT_KEYS[p] || p)).join('+');

/**
 * @typedef {Object} Ctx — where the focus is, and whether a key made the act
 * @property {'plane' | 'caret' | 'line' | 'box' | 'overlay' | 'landing' | 'corner' | 'scene' | 'scene-acts' | 'field'} where `caret` the plane while a live caret stands in text the person may edit (T-LAYER's `caret`; set here, `whereNow`), `scene` a reading scene's pane, `scene-acts` its bar's buttons, `landing` a landing's line's acts (O-LAND)
 * @property {boolean} byKey a key made the act (the focus owner's one reading, `FOCUS.byKey`)
 * @property {boolean} [landed] the key is made at a jump's landing, held while the jump was in the air (`replay`): Esc passes over the chrome a field the reader types in stands in (`esc`), and a key pressed at a corner is dropped (`cornerKey`)
 */

/** @typedef {() => (boolean | Promise<boolean>)} Act a key's act, made: true where the page took the key */

/**
 * @typedef {Object} Held — a key a jump in the air held for its landing (see the head)
 * @property {KeyboardEvent} e
 * @property {Ctx} ctx where the focus was as it was pressed, and whether a key made it
 * @property {Promise<boolean>} jump the landing it waits for (N-GO's `aground`): true where the jump landed, false where it never did
 */

/** @type {Held[]} the keys held, in the order they were pressed */
const held = [];
/** the held keys are being made at a landing, or wait for it: a key pressed meanwhile waits behind them */
let replaying = false;
/** a held key's act is being made now */
let making = false;

/** Mod+S has been answered whole this session: after it the corner's own word answers (K-74; P41) */
let saveAnswered = false;
/** how many keys the dispatch has taken, a modifier going down apart (`dispatch`): the save chord's answer is given only where none followed its press */
let keysTaken = 0;
/** @type {Promise<void>} the save chord's latest answer, settled once it is given or dropped (`saveChord`) */
let saving = Promise.resolve();
/** the save chord's latest answer, settled once it is given or dropped (`saveChord`): what the gate and the tests wait on */
export const saved = () => saving;
/** the keys that are a modifier going down: none of them a key typed */
const MODIFIER_KEYS = ['Shift', 'Meta', 'Control', 'Alt', 'AltGraph', 'CapsLock'];
/** reset what the save chord holds (tests): Mod+S not yet answered whole, no key taken, no answer owed */
export function _reset() { saveAnswered = false; keysTaken = 0; saving = Promise.resolve(); }

/** the keys held for a landing, and the one whose act is being made there (the gate's settle signal) */
export const holding = () => held.length + (making ? 1 : 0);

/** does a key the page acts on wait now: a jump is in the air, or held keys wait for their landing or are being made there (`hold`) */
const waiting = () => GO.inAir() || held.length > 0 || replaying;

/**
 * Where the focus is, read now (see the head): the plane while a live caret
 * stands in text the person may edit is the caret; everywhere else as the
 * app read it. A live caret whose text the person may not edit at the
 * camera's scale (T-LAYER's `editable`) — a zoom past its reading scale
 * before the re-take that follows it — is left to the walk as the key finds
 * it, kept where it stood, its span holding the walk (D5 M-2, K-77; N-WALK's
 * `holdCaret`); one the walk stands outside of, in another document, is left
 * kept, nothing held; and the key acts as on the plane.
 * @param {Ctx} ctx
 * @returns {Ctx}
 */
function whereNow(ctx) {
  if (ctx.where !== 'plane' || SCENE.isOpen()) return ctx;
  const c = LAYER.caret(), f = WALK.current();
  if (!c || !c.live) return ctx;
  if (f && f.addr !== c.addr) { LAYER.leaveCaret('walk'); return ctx; }
  if (!LAYER.editable(c.addr)) { WALK.holdCaret('camera'); return ctx; }
  return { ...ctx, where: 'caret' };
}

/**
 * The walk's focused span where it is a span of a draft the person may edit
 * and the focus is the plane's — a caret standing in it then kept, a live one
 * making the focus the caret's (`whereNow`); null anywhere else: another's
 * text, a live caret standing, the scene over the plane.
 * @param {Ctx} ctx
 * @returns {{addr: string, pos: number} | null}
 */
function draftSpan(ctx) {
  if (ctx.where !== 'plane' || SCENE.isOpen()) return null;
  const f = WALK.current();
  return f && f.kind === 'block' && f.pos != null && LAYER.editable(f.addr) ? { addr: f.addr, pos: f.pos } : null;
}

/** the walk's focused span of a draft the person may edit holding no caret (`draftSpan`) — the site of the swallow's draft form (K-72, K-93); null anywhere else, and where the kept caret stands in it (`keptSpan`) */
function bareDraftSpan(/** @type {Ctx} */ ctx) {
  const s = draftSpan(ctx);
  return s && !LAYER.caretInSpan(s.addr, s.pos) ? s : null;
}

/** the walk's focused span of a draft the person may edit holding the kept caret (`draftSpan`) — the span whose keys return it (K-70, K-77; `typeAt`, `extendAtKept`); null anywhere else */
function keptSpan(/** @type {Ctx} */ ctx) {
  const s = draftSpan(ctx);
  return s && LAYER.caretInSpan(s.addr, s.pos) ? s : null;
}

/**
 * The walk's focused span where the focus is the plane's and its text is one
 * the person may not edit, at its reading scale — the site Shift with ← or →
 * extends a selection from the focus's edge (K-70; O-SELECTION's
 * `extendFromFocus`), and a printable key or a paste is answered by its
 * document's line (`siteSays`); null anywhere else: a draft the person may
 * edit, a document below its reading scale, off a span, the scene over the
 * plane.
 * @param {Ctx} ctx
 * @returns {{addr: string, pos: number} | null}
 */
function readOnlySpan(ctx) {
  if (ctx.where !== 'plane' || SCENE.isOpen()) return null;
  const f = WALK.current();
  return f && f.kind === 'block' && f.pos != null && LAYER.atReadingScale(f.addr) && !LAYER.editable(f.addr) ? { addr: f.addr, pos: f.pos } : null;
}

/**
 * A printable key or a paste at the walk's span in text the person may not
 * edit (`readOnlySpan`) answered by its document's line, its hint at the
 * focus, nothing placed (see the head; D5 K-72, K-93; foundations §2.7): at
 * a document of the session's account the one test says is published, asked
 * of the version the walk stands in as its corner asks it (T-LAYER's
 * `isDraft`; FP-39), C-45 naming the document; at a document of another
 * account B3-S13's line naming its owner (M-REC's `ownerAccount`). Nothing
 * is answered, and K-9's line is the caller's, where no session names an
 * account, where that test does not say published of a document of the
 * session's account, and where the owner the line would name is the
 * session's own account.
 * @param {KeyboardEvent} e
 * @param {Ctx} ctx
 * @param {import('../overlays/hint.js').Writing | null} [writing] where the person was writing, which a printable key's line ends with (`writingElsewhere`); null for a paste
 * @param {import('../overlays/hint.js').Ending | null} [ending] the sentence the line ends on while it stands whole (O-HINT's `show`): the undo chord's (`undoNone`)
 * @returns {boolean} whether a line answered the key
 */
function siteSays(e, ctx, writing = null, ending = null) {
  const s = readOnlySpan(ctx), account = REC.session()?.account, doc = s && documentOf(s.addr);
  if (!s || !account || !doc) return false;
  if (accountOf(doc) === account) {
    if (LAYER.isDraft(s.addr) !== false) return false;
    HINT.show('C-45', { D: doc }, { ...hinted(e, ctx), writing, ending });
    return true;
  }
  const owner = REC.ownerAccount(REC.doc(REC.has(doc) ? doc : s.addr));
  if (!owner || owner === account) return false;
  HINT.show('B3.row.others-document', { owner }, { ...hinted(e, ctx), writing, ending });
  return true;
}

/**
 * Dispatch a key: true where the page took it (the caller then prevents the
 * default). A branch that waits before it answers prevents the default
 * itself, before the wait — the platform runs the default as soon as the
 * listeners return, not when the answer arrives. Nothing is dispatched
 * during an IME composition. The navigation acts are made at once; every
 * other key the page would act on while a jump is in the air — or while the
 * keys it held are being made — waits for its landing (`hold`; see the head),
 * save the line's ← and →, which move among its acts. Every key but a walk
 * key or K-8 at the plane, and a modifier going down, hides the walk's panel
 * as it is pressed (N-WALK's `hidePanel`; see the head).
 * @param {KeyboardEvent} e
 * @param {Ctx} ctx
 * @returns {Promise<boolean>}
 */
export async function dispatch(e, ctx) {
  if (e.isComposing || e.key === 'Process' || e.keyCode === 229) return false;
  if (!MODIFIER_KEYS.includes(e.key)) keysTaken++;
  const chord = chordOf(e);
  const mod = MAC ? e.metaKey : e.ctrlKey;
  ctx = whereNow(ctx);
  if (!keepsPanel(e, chord, ctx)) WALK.hidePanel();
  // a paste or a cut at a live caret in a draft that cannot be written now (D6 BM-58 … BM-60): the reason's own line, nothing placed and nothing removed
  if (mod && !e.shiftKey && (chord === 'Mod+V' || chord === 'Mod+X') && ctx.where === 'caret') { const c = LAYER.caret(); if (c && unwritableSays(c.addr, e, ctx)) return true; }
  // a paste or a cut at a span of a draft the person may edit holding no caret (K-93, K-72): the draft's line in their own words, its hint, nothing placed and nothing removed
  if (mod && !e.shiftKey && (chord === 'Mod+V' || chord === 'Mod+X') && bareDraftSpan(ctx)) { HINT.show(chord === 'Mod+V' ? 'B3.caret.enter.paste' : 'B3.caret.cut', actKey(), hinted(e, ctx)); return true; }
  // a paste at the walk's span of an edition of the person's own or of another's document (K-72, K-93): its document's line, its hint, nothing placed
  if (mod && !e.shiftKey && chord === 'Mod+V' && siteSays(e, ctx)) return true;
  // a copy outside a field where the platform holds no selection (K-92): the page's line, its default prevented, or the selection it draws placed under the copy
  if (mod && !e.shiftKey && !e.altKey && chord === 'Mod+C' && copyAsDrawn(e, ctx)) return true;
  // the rest of the platform's own, never taken (K-92, K-93): Mod+H among them on macOS alone, the trail's list elsewhere (K-41)
  if (mod && !e.shiftKey && ['C', 'V', 'X', 'A', 'P', 'W', 'Q', 'M', 'H', ','].includes(chord.slice(4)) && chord !== trailChord()) return false;
  if (ctx.where === 'field') {
    if (chord === 'Esc') { esc(); return true; }
    // find's chords, which no field takes as its own: the find opened beside the field, which keeps the caret (FP-20), or stepped
    if (REC.board() && (chord === 'Mod+F' || findDir(chord))) return findAct(e, findDir(chord), ctx)();
    return false; // a field takes its keys
  }
  const byKey = ctx.byKey;
  // the navigation acts — Back / Forward (K-20, K-21), the trail (K-40), WHOLE BOARD / HOME (K-13, K-14): made at once, a jump in the air abandoned (FP-25)
  if (chord === 'Mod+[') { GO.back(byKey); return true; }
  if (chord === 'Mod+]') { GO.forward(byKey); return true; }
  if (/^Mod\+[1-9]$/.test(chord)) { GO.toTrailEntry(Number(chord.slice(4)), byKey); return true; }
  if (chord === 'Mod+0') { GO.wholeBoard(byKey); return true; }
  if (chord === 'Mod+Shift+H') { GO.home(byKey); return true; }
  const run = route(e, chord, ctx);
  if (!run) return false;
  if (waiting() && !(ctx.where === 'line' && (chord === '←' || chord === '→'))) { e.preventDefault(); hold(e, ctx); return true; }
  return run();
}

/**
 * The act a key past the navigation acts makes where the focus is now,
 * unmade: null where the page takes no such key there. Read again for a held
 * key as it is made, so it acts where the focus is at the landing.
 * @param {KeyboardEvent} e
 * @param {string} chord
 * @param {Ctx} ctx
 * @returns {Act | null}
 */
function route(e, chord, ctx) {
  const byKey = ctx.byKey;
  // Esc: the innermost thing, one order
  if (chord === 'Esc') return () => { esc(!!ctx.landed); return true; };
  // the LEAP box
  if (chord === 'Mod+L') return () => { LEAP.open(); return true; };
  // the trail's list (K-41), by the platform's history chord
  if (chord === trailChord()) return () => { TRAILLIST.open(byKey); return true; };
  if (chord === 'Mod+S') return () => { saveChord(); return true; }; // K-74: the chord writes nothing; the corner's kept state answers it
  // undo and redo (K-75): from the plane, the scene and every control but a field
  const undoes = undoAct(chord);
  if (undoes) return async () => { e.preventDefault(); await undoChord(e, ctx, undoes === 'redo'); return true; };
  // find (K-91): live from the plane, the scene, the line, a corner and every control on them alike, the browser's own find never run
  const fd = findDir(chord);
  if ((chord === 'Mod+F' || fd) && REC.board()) return findAct(e, fd, ctx);
  // the scene covers the plane: its keys alone, nothing under it takes one
  if (SCENE.isOpen()) return sceneKey(e, chord, ctx);
  // zoom (K-11)
  if (chord === 'Mod+=') return () => { zoomAboutFocus(1.25, byKey); return true; };
  if (chord === 'Mod+-') return () => { zoomAboutFocus(1 / 1.25, byKey); return true; };
  // no board held (see the head): the selection's chords, K-8, the strip and find's chords answer why, as the walk's keys do below
  const lacking = REC.board() ? null : () => { FACES.noBoard(null); return true; };
  if (lacking && (SLOT_CHORDS.has(chord) || chord === 'Shift+↓' || chord === 'Shift+↑' || chord === 'Mod+Shift+P' || chord === 'Mod+F' || fd)) return lacking;
  // the selection's slot chords (K-45 … K-52, K-100) and K-8's select-by-span — live from the plane and from a standing overlay alike; the selection's acts take no focus (rule 15), and the next K-8 press extends the selection from the walk's element
  const inert = INERT_CHORDS.get(chord);
  if (inert) return () => { if (!SEL.inertChord(inert)) inertSaid(inert, e, ctx); return true; };
  const live = LIVE_CHORDS.get(chord);
  // Mod+Enter at a live caret follows from a selection drawn in the caret's own text alone, else gives the caret's follow line (K-51; `followAtCaret`)
  if (live) return () => { if (live === 'follow' && ctx.where === 'caret' && !selectedAtCaret()) followAtCaret(e, ctx); else if (!SEL.act(live, byKey)) selectFirst(e, ctx); return true; };
  // K-8 off a live caret: at one, Shift with the arrows is the caret's (K-71; `caretKey`)
  if (chord === 'Shift+↓' && ctx.where !== 'caret') return () => { SEL.selectFocused('down'); return true; };
  if (chord === 'Shift+↑' && ctx.where !== 'caret') return () => { SEL.selectFocused('up'); return true; };
  // Shift with ← or → at the span a kept caret stands in: the caret returned and a selection extended from it (K-70, K-77); at
  // any other span of a draft the person may edit, the caret placed live where the step extends from and the selection
  // extended from it, the walk following the caret (K-70; FP-40); at the walk's span in text the person may not edit, a
  // selection extended from the focus's edge (K-70) — each the platform's own extension prevented; anywhere else off a live
  // caret, the platform's
  if ((chord === 'Shift+←' || chord === 'Shift+→') && keptSpan(ctx)) return async () => { await extendAtKept(e, arrowStep(e)); return true; };
  if ((chord === 'Shift+←' || chord === 'Shift+→') && bareDraftSpan(ctx)) return async () => { e.preventDefault(); SEL.extendFromSpan(arrowStep(e)); await WALK.followCaret(); return true; };
  if ((chord === 'Shift+←' || chord === 'Shift+→') && readOnlySpan(ctx)) return () => { e.preventDefault(); SEL.extendFromFocus(arrowStep(e)); return true; };
  if (chord === 'Mod+Shift+P') return () => { LINE.stripAct(); return true; };
  if (chord === 'Mod+R' || e.key === 'F5') return () => true; // K-94: the plane is live; nothing reloads
  // the caret's keys (see the head): at a live caret, before the walk's
  if (ctx.where === 'caret') { const act = caretKey(e, chord); if (act) return act; }
  // the corner (K-57): its acts the platform's buttons, ← and → along a line of them, a printable key but Space at a corner
  // of a draft the person may edit answered by the way back to its text (`cornerKey`); its other keys are the platform's
  if (ctx.where === 'corner') { const act = cornerKey(e, chord, ctx); return act === undefined ? null : act; }
  // the line is one stop (K-22): ← and → move among its acts; every other key is the act's own
  if (ctx.where === 'line') return chord === '←' || chord === '→' ? () => { e.preventDefault(); return LINE.step(chord === '→' ? 1 : -1); } : null;
  if (ctx.where === 'overlay' || ctx.where === 'landing') return null; // the overlay's own keys, and a landing's line's: Enter and Space press its act
  if (lacking && WALK_KEYS.has(chord)) return lacking;
  // the walk (K-1 … K-8): each key waits on the camera's flight, and the platform runs a key's default — a scroll of
  // the scroller the focus stands in, the mirror — as soon as the listeners return; so the default is prevented first
  if (chord === '↓') return async () => { e.preventDefault(); await WALK.key('down'); return true; };
  if (chord === '↑') return async () => { e.preventDefault(); await WALK.key('up'); return true; };
  if (chord === '→') return async () => { e.preventDefault(); if (WALK.collapsed()) await activateFocus(byKey); else await WALK.key('in'); return true; };
  if (chord === '←') return async () => { e.preventDefault(); await WALK.key('out'); return true; };
  if (chord === 'Home') return async () => { e.preventDefault(); await WALK.key('first'); return true; };
  if (chord === 'End') return async () => { e.preventDefault(); await WALK.key('last'); return true; };
  if (chord === 'PageDown' || chord === 'PageUp') return () => { page(chord === 'PageDown' ? 1 : -1); CAM.markDirty(); WALK.retakeFromView(byKey); return true; };
  if (chord === 'Enter') return async () => { await activateFocus(byKey); return true; };
  // a printable key on the plane: typed at the kept caret standing in the focused span as at a live caret, answered by the draft's line at a span of a draft the person may edit holding none, by its document's line at a span of an edition of the person's own or of another's document, else swallowed with the K-9 line (`typeAt`)
  if (printable(e)) return async () => { await typeAt(e, ctx); return true; };
  return null;
}

/**
 * A find chord's act (K-91; see the head): a move — Mod+G, Mod+Shift+G, F3,
 * Shift+F3 — steps the find's matches where a find stands (N-FIND's `step`),
 * else an arrival's runs where one in several stands or a jump in the air may
 * land one, outside the scene (N-GO's `step`; FP-21); Mod+F, and a move
 * where neither steps, opens the find at the document the focus is in — the
 * one a corner the focus stands on names (N-FIND's `open`). The platform's
 * default is prevented first: the browser's own find never runs.
 * @param {KeyboardEvent} e
 * @param {1 | -1 | 0} dir the chord's move; 0 for Mod+F
 * @param {Ctx} ctx
 * @returns {Act}
 */
function findAct(e, dir, ctx) {
  if (dir && FIND.isOpen()) return () => { e.preventDefault(); FIND.step(dir, ctx.byKey); return true; };
  if (dir && !SCENE.isOpen() && (GO.steps() || GO.inAir())) return () => { e.preventDefault(); GO.step(dir, ctx.byKey); return true; };
  const corner = ctx.where === 'corner' && e.target ? /** @type {HTMLElement | null} */ (/** @type {HTMLElement} */ (e.target).closest('[data-corner]')) : null;
  return () => { e.preventDefault(); FIND.open(corner ? corner.dataset.corner || null : null, ctx.byKey, hinted(e, ctx)); return true; };
}

/**
 * A key at a live caret (see the head; K-71, K-72, K-76): the arrows move it a
 * character or a line — ← and → a word with Option on macOS (`arrowStep`) —
 * Home and End to its line's start or its end, each
 * ending a selection drawn in the caret's own text (`stepCaret`), and with
 * Shift move it and extend a selection from it (O-SELECTION's
 * `extendFromCaret`); Backspace and Delete take a character out, Enter and
 * Shift+Enter put a new line in, Tab a tab character, a printable key its
 * character, each replacing a selection drawn in the caret's own text
 * (`editAtCaret`) — each a change of the text shown alone (T-LAYER) — and the
 * walk then stands on the span the caret is in (N-WALK's `followCaret`), the
 * act ending once it does, so the next key, a held one too (`replay`), acts
 * there. Each is taken even where the caret cannot move that way. Null for
 * any other key, which acts as on the plane. The platform's default is
 * prevented first: an arrow would scroll the mirror, Home and End the page,
 * Tab would move the focus, Backspace would go back.
 * @param {KeyboardEvent} e
 * @param {string} chord
 * @returns {Act | null}
 */
function caretKey(e, chord) {
  /** @type {Record<string, CaretStep>} */
  const moves = { '←': arrowStep(e), '→': arrowStep(e), '↑': 'up', '↓': 'down', Home: 'home', End: 'end' };
  /** the key's change made at the caret, the walk following it */
  const at = (/** @type {() => boolean} */ change) => async () => { e.preventDefault(); change(); await WALK.followCaret(); return true; };
  /** a key that puts text in or takes it out: answered by the reason's line where the caret's draft cannot be written, else made, the moved verdict's line after its first */
  const edit = (/** @type {() => boolean} */ change) => async () => {
    e.preventDefault();
    const c = LAYER.caret();
    if (c && unwritableSays(c.addr, e)) return true;
    change();
    await WALK.followCaret();
    if (c) movedSays(c.addr, e);
    return true;
  };
  if (chord in moves) return at(() => stepCaret(moves[chord]));
  const shifted = chord.startsWith('Shift+') ? chord.slice(6) : '';
  if (shifted in moves) return at(() => SEL.extendFromCaret(moves[shifted]));
  if (chord === 'Backspace') return edit(() => editAtCaret('', -1));
  if (chord === 'Delete') return edit(() => editAtCaret('', 1));
  if (chord === 'Enter' || chord === 'Shift+Enter') return edit(() => editAtCaret('\n'));
  if (chord === 'Tab') return edit(() => editAtCaret('\t'));
  if (printable(e)) return edit(() => editAtCaret(e.key));
  return null;
}

/** the line each reason a board's drafts cannot be written for is answered by at a caret (W-WRITE's `Unwritable`; B3-S2, B3-S13) */
const CARET_LINE = /** @type {Record<import('../write/write.js').Unwritable['why'], string>} */ ({
  keyless: 'B3.keyless', another_window: 'B3.another_window', store_halted: 'B3.store_halted.caret', held_full: 'B3.held_full.caret', death: 'B3.death.caret',
});

/**
 * A key that would write in a draft that cannot be written now, answered
 * (see the head; W-WRITE's `unwritable`): the reason's own line, its hint at
 * the focus the key was pressed at, said in the status region; nothing where
 * the draft can be written.
 * @param {string} addr the draft
 * @param {KeyboardEvent} e
 * @param {Ctx} [ctx]
 * @returns {boolean} whether a line answered the key
 */
function unwritableSays(addr, e, ctx = { where: 'plane', byKey: true }) {
  const why = WRITE.unwritable(addr), b = REC.board();
  if (!why) return false;
  HINT.show(CARET_LINE[why.why], { board: b ? t('L.mirror.board.name', { node: '1', origin: b.origin }) : '' }, hinted(e, ctx));
  return true;
}

/** the first key typed in a draft since a moved verdict came to stand on it, followed by the verdict's line at the focus, once per verdict (D6 BM-18; W-WRITE's `takeMovedKey`) */
function movedSays(/** @type {string} */ addr, /** @type {KeyboardEvent} */ e) {
  if (WRITE.takeMovedKey(addr)) HINT.show('B3.moved.first-key', null, hinted(e, { where: 'plane', byKey: true }));
}

/**
 * An arrow, Home or End without Shift at the live caret (see the head; K-71):
 * where a selection is drawn in the caret's own text (`selectedAtCaret`), the
 * selection ends, its card with it (O-SELECTION's `clear`), and ← puts the
 * caret at the selection's start, → at its end, ↑ and ↓ a line, and a word
 * step a word, from the caret, Home and End at the start or the end of the
 * caret's line; where none is, the caret steps that way (T-LAYER's
 * `caretMove`).
 * @param {CaretStep} dir
 * @returns {boolean} whether the caret or the selection changed
 */
function stepCaret(dir) {
  const s = selectedAtCaret();
  if (!s) return LAYER.caretMove(dir);
  SEL.clear();
  if (dir === 'left' || dir === 'right') LAYER.placeCaret(s.addr, dir === 'left' ? s.pos : s.pos + s.width);
  else LAYER.caretMove(dir);
  return true;
}

/**
 * A key's text at the live caret (see the head; K-70, K-72, K-76; BM-70,
 * BM-75): where a selection is drawn in the caret's own text
 * (`selectedAtCaret`), its bytes replaced by the text — none for Backspace
 * and Delete — the caret after it (T-LAYER's `caretReplace`); else, and where
 * T-LAYER refuses the selection as not whole in the text shown, the text put
 * in at the caret (`caretType`), or, for Backspace and Delete, the character
 * on the side `erase` names taken out (`caretErase`). A selection drawn there
 * ends with the key either way, its card with it (O-SELECTION's `clear`).
 * @param {string} text the key's text: its character, a new line, a tab; '' for Backspace and Delete
 * @param {-1 | 1} [erase] Backspace (−1) or Delete (1): the side a character is taken out on where no selection is replaced
 * @returns {boolean} whether the text shown changed
 */
function editAtCaret(text, erase) {
  const s = selectedAtCaret();
  const replaced = !!s && LAYER.caretReplace(s, text);
  if (s) SEL.clear();
  if (replaced) return true;
  return erase ? LAYER.caretErase(erase) : LAYER.caretType(text);
}

/**
 * A printable key on the plane where no live caret stands (see the head): at
 * the walk's focused span of a draft the person may edit, every key but Space
 * — at the span the kept caret stands in (`keptSpan`), the caret returned and
 * the key typed at it as at a live caret, replacing a selection drawn in its
 * text (K-70; BM-52; `editAtCaret`), the walk then standing on the span the
 * caret is in (N-WALK's `followCaret`), the platform's default prevented
 * before it waits; at a span holding no caret (`bareDraftSpan`), the draft's
 * own line naming the key that places a caret there, Enter drawn for this
 * platform (`B3.caret.enter`), its hint (K-72; K-9); at the walk's
 * span of an edition of the session's account or of another's document,
 * every key but Space, its document's line (`siteSays`; K-72); anywhere
 * else, and for Space, swallowed with the K-9 line (`swallow`).
 * @param {KeyboardEvent} e
 * @param {Ctx} ctx
 * @returns {Promise<void>}
 */
async function typeAt(e, ctx) {
  // a draft the session's ending left standing with its unkept words (D6 BM-24): no caret is placed in it, and a key at it is answered by the ending's caret line
  const site = walkSite(), ended = site ? WRITE.unwritable(site) : null;
  if (e.key !== ' ' && site && ended && ended.why === 'death' && WRITE.unkept(site) && unwritableSays(site, e, ctx)) return;
  const kept = e.key !== ' ' ? keptSpan(ctx) : null;
  if (kept && unwritableSays(kept.addr, e, ctx)) { e.preventDefault(); return; }
  if (kept) { e.preventDefault(); LAYER.returnCaret(); editAtCaret(e.key); await WALK.followCaret(); movedSays(kept.addr, e); return; }
  const writing = writingElsewhere(walkSite());
  if (e.key !== ' ' && bareDraftSpan(ctx)) { HINT.show('B3.caret.enter', actKey(), { ...hinted(e, ctx), writing }); return; }
  if (e.key !== ' ' && siteSays(e, ctx, writing)) return;
  swallow(e, ctx, writing);
}

/** the document the walk stands in — its element the document, or a span or a link in it — the site a printable key on the plane was pressed at (`writingElsewhere`); null off any document */
function walkSite() {
  const f = WALK.current();
  return f && (f.kind === 'document' || f.kind === 'block' || f.kind === 'link') ? f.addr : null;
}

/**
 * Where the person was writing, which the line a swallowed printable key
 * raises ends with (see the head; B3.undo.last-writing): the draft last
 * written in the page's session (W-WRITE's `lastWritten`), where its caret
 * stands kept and the key was pressed outside that draft — named as the
 * status region names its box (T-LAYER's `boxName`), its label a LEAP to the
 * span the kept caret stands in as the label's act is made, the caret's own
 * position named (N-GO's `leapTo`), so the next printable key there types at
 * it (`typeAt`). Null anywhere else.
 * @param {string | null} site the document the key was pressed at; null where it was pressed at none
 * @returns {import('../overlays/hint.js').Writing | null}
 */
function writingElsewhere(site) {
  const w = WRITE.lastWritten(), c = LAYER.caret();
  if (!w || !c || c.live || c.addr !== w || site === w) return null;
  const name = LAYER.boxName(w);
  return {
    label: name.name, named: name.runs,
    act: (byKey) => { const at = LAYER.caretSpan(); void GO.leapTo(w, { pos: at && at.addr === w ? at.pos : null, how: byKey ? 'key' : 'click', byKey }); },
  };
}

/**
 * Shift with ← or → at the span a kept caret stands in (see the head; K-70,
 * K-77; B3-S1): the caret returned where it stood and a selection extended
 * from it a step — a word with Option on macOS (`arrowStep`) — as at a live
 * caret, never from the span's edge (O-SELECTION's `extendFromCaret`) — where
 * the caret cannot move that way,
 * the caret live and the selection standing as it stood, its highlight with
 * it (T-LAYER's `returnCaret`) — the walk then standing on the span the caret
 * is in (N-WALK's `followCaret`). The platform's default is prevented first,
 * before the walk's move is waited on: the selection the key makes is the
 * page's to place.
 * @param {KeyboardEvent} e
 * @param {ArrowStep} dir
 * @returns {Promise<void>}
 */
async function extendAtKept(e, dir) {
  e.preventDefault();
  LAYER.returnCaret(true);
  SEL.extendFromCaret(dir);
  await WALK.followCaret();
}

/**
 * Mod+S (see the head; K-74; BM-3): the chord writes nothing itself. The
 * open burst of the draft the caret stands in — else the walk's document — is
 * committed first (W-WRITE's `commit`), and the answer given once it lands
 * (`landed`), from the kept state it leaves (`saveAnswer`): at once where no
 * burst of the draft is open or awaits its ack (`inFlight`), and not at all
 * where a key was taken before it (`keysTaken`). Nothing where the scene
 * covers the plane, or the chord is made at no document.
 */
function saveChord() {
  if (SCENE.isOpen()) return;
  const c = LAYER.caret(), f = WALK.current();
  const addr = c ? c.addr : f && (f.kind === 'document' || f.kind === 'block' || f.kind === 'link') ? f.addr : null;
  if (!addr) return;
  if (!WRITE.inFlight(addr)) { saveAnswer(addr); return; }
  const pressed = keysTaken;
  WRITE.commit(addr);
  saving = WRITE.landed(addr).then(() => { if (keysTaken === pressed) saveAnswer(addr); });
}

/**
 * The save chord's answer (K-74; BM-3): where the draft has a kept state
 * (W-WRITE's `keptOf`), the state's statement is opened whole at its corner at
 * the first press in a session, as the chord's answer (T-LAYER's
 * `openStatement`); after it the corner's own word answers, the statement
 * whole on the word's act (P41). Either answer is said in the status region
 * (FP-36), the statement as T-LAYER says it by the board's silence and the
 * venue (`keptSaid`; BM-78). Nothing where no such state stands.
 * @param {string} addr
 */
function saveAnswer(addr) {
  const k = WRITE.keptOf(addr);
  if (!k) return;
  if (saveAnswered) { FOCUS.say(keptWord(k).text); return; }
  saveAnswered = true;
  LAYER.openStatement(addr, true, 'save');
  FOCUS.say(keptStatement(k, LAYER.keptSaid(addr, 'save')).text);
}

/** the sentence each of the undo chord's lines ends on while it stands whole (B3-S3; D6 BM-42) */
const UNDO_CONSTANT = /** @type {import('../overlays/hint.js').Ending} */ (Object.freeze({ id: 'B3.undo.constant' }));

/**
 * The draft the undo chord acts on (see the head; D5 K-75): the one whose
 * text holds the caret; where none does, the draft whose caret the person
 * last held this session — the kept caret's — while it stands in view at its
 * reading scale (T-LAYER's `editable`, `inView`). Null where neither stands,
 * and while the scene covers the plane.
 * @returns {string | null}
 */
function undoTarget() {
  if (SCENE.isOpen()) return null;
  const c = LAYER.caret();
  return c && LAYER.editable(c.addr) && (c.live || LAYER.inView(c.addr)) ? c.addr : null;
}

/**
 * Mod+Z, and the redo chords (see the head; D5 K-75; D6 BM-31 … BM-34,
 * BM-42, BM-45): the newest step of the target draft's stack taken back, or
 * the step undone last put back (W-MACHINE's `undo`, `redo`) — the caret then
 * live where the step began, the selection ended, the walk on the caret's
 * span and its mark brought into view by the frame, and what the step did
 * said in the status region alone (`undoSaid`). A step whose line awaits an
 * act of the person's at its face shows that face, no act of it taken, the
 * focus where it stood — a moved document's standing at its corner, opened
 * whole there where it stands compact and its words said (O-FACES'
 * `answerAtFace`). A draft that cannot be written now is answered by its
 * reason's line; an empty undo stack by its own; no target by `undoNone`. A
 * redo with nothing to put back is taken and says nothing. A step standing
 * in text the page does not hold — a long draft held in part — is reached
 * first by a LEAP to where it began (N-GO's `leapTo`), then taken; where its
 * text is still not held nothing is changed.
 * @param {KeyboardEvent} e
 * @param {Ctx} ctx
 * @param {boolean} redo
 * @returns {Promise<void>}
 */
async function undoChord(e, ctx, redo) {
  const addr = undoTarget();
  if (!addr) { if (!redo) undoNone(e, ctx); return; }
  if (unwritableSays(addr, e, ctx)) return;
  let out = redo ? MACHINE.redo(addr) : MACHINE.undo(addr);
  // the step stands in text the page does not hold of a long draft: its place read first, by a LEAP to where it began, then the press made
  if (out.how === 'away' && out.at != null) { await GO.leapTo(addr, { pos: out.at, how: 'key', byKey: ctx.byKey }); out = redo ? MACHINE.redo(addr) : MACHINE.undo(addr); }
  if (out.how === 'away') return;
  if (out.how === 'face') { const corner = LAYER.cornerOf(addr); if (!FACES.unkept(addr, corner ? /** @type {HTMLElement | null} */ (corner.querySelector('.kept-word')) : null, false)) FACES.answerAtFace(addr); return; }
  if (out.how === 'empty') { if (!redo) HINT.show('B3.undo.empty', null, { ...hinted(e, ctx), ending: UNDO_CONSTANT }); return; }
  if (SEL.selected()) SEL.clear();
  if (out.at != null) { LAYER.placeCaret(addr, out.at); await WALK.followCaret(); }
  undoSaid(addr, out, redo);
}

/**
 * What an undo or a redo did, said in the status region and never drawn
 * (B3-S3; D6 BM-32, BM-33): "taken out — …" by the first words it took out,
 * then "put back — …" by the first words it returned — a redo's the other way
 * about, the words it puts back first — and after them the deletion face
 * the press raised whole, where it raised one (O-DELETION's `take`); the
 * person's words kept as they stand (ST's `heard`).
 * @param {string} addr the draft
 * @param {import('../write/machine.js').Undone} out
 * @param {boolean} redo
 */
function undoSaid(addr, out, redo) {
  /** a run's first words in what an undo or a redo says of it, the person's own as they stand */
  const words = (/** @type {string} */ id, /** @type {string} */ first) => tRuns(id, { 'first words': first }, { 'first words': 'reading' });
  const taken = out.out ? words('B3.undo.said.taken-out', LAYER.firstWordsOf(out.out)) : [];
  const put = out.back ? words('B3.undo.said.put-back', LAYER.firstWordsOf(out.back)) : [];
  const said = joinRuns(' ', [...(redo ? [put, taken] : [taken, put]), DELETION.take(addr)]);
  if (said.length) FOCUS.say(said, false, true);
}

/**
 * The undo chord where no draft is its target (see the head; B3-S3; D6
 * BM-42): at the walk's span of an edition of the person's own, or of
 * another's document, that document's line (`siteSays`); anywhere else the
 * no-caret line, ending with where the person was last writing where a kept
 * caret stands in the draft last written this session (`writingElsewhere`).
 * Each ends on the constant sentence while it stands whole, and is the hint
 * at the focus.
 * @param {KeyboardEvent} e
 * @param {Ctx} ctx
 */
function undoNone(e, ctx) {
  const writing = writingElsewhere(null);
  if (siteSays(e, ctx, writing, UNDO_CONSTANT)) return;
  HINT.show('B3.undo.none', null, { ...hinted(e, ctx), writing, ending: UNDO_CONSTANT });
}

/**
 * An undo the board declined (W-WRITE's `onDeclined`; B3-S3; D6 BM-11,
 * BM-12): the source of the passage withheld from the person now — said in
 * the one line, naming the origin — then what the undo chord again undoes,
 * each a sentence (ST's `sentence`, `sentences`).
 * @param {string} addr the draft
 * @param {string} origin the document the words came from
 */
function declined(addr, origin) {
  void addr;
  LINE.transient(sentences(sentence('B3.undo.withheld', { origin }), sentence('B3.undo.again', { 'undo chord': drawChord('Mod+Z') })), 'B3.undo.withheld');
}
WRITE.onDeclined(declined);

/**
 * A key a jump in the air finds is held for its landing (see the head; FP-25):
 * made there, in the order pressed, with the context it was pressed in, marked
 * as made there (`Ctx.landed`), each read where the focus is then (`route`);
 * dropped, with every other key held for the same jump, where the jump never
 * lands.
 * @param {KeyboardEvent} e
 * @param {Ctx} ctx
 */
function hold(e, ctx) {
  held.push({ e, ctx, jump: GO.aground() });
  if (!replaying) void replay();
}

/** the held keys made, each once the landing it waits for answers, one after another: a key's act ends before the next is read */
async function replay() {
  replaying = true;
  try {
    while (held.length) {
      const k = held[0];
      if (!(await k.jump)) { while (held.length && held[0].jump === k.jump) held.shift(); continue; }
      held.shift();
      const run = route(k.e, chordOf(k.e), whereNow({ ...k.ctx, landed: true }));
      if (!run) continue;
      making = true;
      try { await run(); } finally { making = false; }
    }
  } finally {
    replaying = false;
  }
}

/**
 * A key while the reading scene stands (D5 M-4; K-60 … K-64). The scene
 * covers the plane, and nothing it covers takes a key: the walk, the
 * selection and the corner stand under it as they were. Wherever the focus
 * is, Mod+R re-levels (K-62), Mod+= is swallowed (K-64), Mod+- closes the
 * scene (K-63) — a Back from its entry (N-GO's `closeScene`) — and
 * Mod+Shift+P shows the one line's strip (K-23); the
 * selection's slot chords are taken, so the browser's own meanings never run
 * (Mod+Shift+R would reload), as F5 is (K-94): at a selection standing in the
 * moved scene's held version while the focus stands in it, an inert slot's
 * chord gives the reason that selection keys as its hint (`heldSaid`; SC's
 * `heldVersionReason`; D6 BM-14); anywhere else in the scene, which holds
 * nothing for the slots to act on, an inert slot's chord gives its slot's
 * reason as its hint (`inertSaid`); every other slot's chord does nothing. On
 * the one line or a standing overlay every other key is that control's own.
 * At a pane's corner its keys are a corner's (`cornerKey`): Enter and Space
 * its act's, as the platform activates it, else the platform's, and ← and →
 * along the line of its acts where it holds any, Space never swallowed there.
 * Elsewhere ← closes the scene so (K-63); a pane's own keys moved that pane
 * before the dispatch (SC's `key`, K-60), and → and Enter elsewhere in a
 * pane, and Shift with the arrows, are the platform's; on the scene's acts
 * every other key is the button's own — Enter and Space press it; a printable
 * key anywhere else is swallowed — at a selection in the held version, every
 * one but Space answered by that selection's reason, as the slots that send
 * are (`heldSaid`), else the K-9 line its hint.
 * @param {KeyboardEvent} e
 * @param {string} chord
 * @param {Ctx} ctx
 * @returns {Act | null} the key's act; null where the page takes no such key there
 */
function sceneKey(e, chord, ctx) {
  if (chord === 'Mod+R') return () => { SCENE.relevel(); return true; };
  if (chord === 'Mod+=') return () => true; // swallowed: nothing is nearer than the scene's reading scale
  if (chord === 'Mod+-') return () => { GO.closeScene(ctx.byKey); return true; };
  const inert = INERT_CHORDS.get(chord);
  if (inert) return () => { if (!heldSaid(e, ctx)) inertSaid(inert, e, ctx); return true; };
  if (SLOT_CHORDS.has(chord) || e.key === 'F5') return () => true;
  if (chord === 'Mod+Shift+P') return () => { LINE.stripAct(); return true; };
  if (ctx.where === 'overlay' || ctx.where === 'line') return null; // the overlay's or the line's own keys
  if (ctx.where === 'scene') { const act = cornerKey(e, chord, ctx, true); if (act !== undefined) return act; }
  if (chord === '←') return () => { GO.closeScene(ctx.byKey); return true; };
  if (ctx.where === 'scene-acts') return null; // the button's own keys
  if (printable(e)) return () => { if (e.key === ' ' || !heldSaid(e, ctx)) swallow(e, ctx, writingElsewhere(ctx.where === 'scene' ? SCENE.paneRead()?.names ?? null : null)); return true; };
  return null;
}

/**
 * A key at a selection standing in the moved scene's held version while the
 * focus stands in it — a chord of a slot that sends, a printable key but
 * Space (`sceneKey`; D6 BM-14; B3-S2): the reason that selection keys, its
 * hint at the pane until the next act, said in the status region at every
 * press (SC's `heldVersionReason`; FP-41); false, nothing raised, where no
 * such selection stands.
 * @param {KeyboardEvent} e
 * @param {Ctx} ctx
 * @returns {boolean}
 */
function heldSaid(e, ctx) {
  const why = SCENE.heldVersionReason();
  if (why) HINT.show(why, null, hinted(e, ctx));
  return !!why;
}

/**
 * What a hint a key raises is told of the key (O-HINT's `show`): whether it
 * is an auto-repeat, and the element it was pressed at where the walk's
 * focus is not it — a control, a corner, the line, a reading scene's pane.
 * @param {{repeat?: boolean, target: EventTarget | null}} e the key, or a copy event
 * @param {Ctx} ctx
 * @param {EventTarget | null} [target] the element it was pressed at: the event's target where none is given
 * @returns {{repeat: boolean, at: Element | null}}
 */
function hinted(e, ctx, target = e.target) {
  const at = /** @type {Element | null} */ (ctx.where === 'plane' || ctx.where === 'caret' ? null : target);
  return { repeat: !!e.repeat, at: at && typeof at.getBoundingClientRect === 'function' ? at : null };
}

/** the token a line naming Enter as the key that acts at the walk's span — places a caret, selects — is filled with: Enter drawn for this platform (`B3.caret.enter`, `L.copy.nothing.enter`) */
const actKey = () => ({ 'act key': drawChord('Enter') });

/**
 * A copy outside a field where the platform holds no selection with extent
 * (see the head; D5 K-92; FP-24, FP-27): the selection the page draws placed
 * under the copy again (T-LAYER's `placeSelection`), which then runs as the
 * platform's; with nothing selected, the platform's copy prevented, the
 * clipboard left as it is, and the line its hint at the focus, said in the
 * status region, the act that selects there the sentence it ends on while it
 * stands whole (`selectsHere`; O-HINT's `ending`).
 * @param {{preventDefault(): void, repeat?: boolean, target: EventTarget | null}} e Mod+C's keydown, or a copy event T-LAYER took nothing from
 * @param {Ctx} ctx where the focus is
 * @param {EventTarget | null} [at] the element the focus is on: the event's target where none is given
 * @returns {boolean} whether the page answered the copy; false where it runs as the platform's
 */
export function copyAsDrawn(e, ctx, at = e.target) {
  if (ctx.where === 'field' || LAYER.platformSelects()) return false;
  const drawn = SEL.selected();
  if (drawn) { LAYER.placeSelection(drawn); return false; }
  e.preventDefault();
  HINT.show('L.copy.nothing', null, { ...hinted(e, ctx, at), ending: selectsHere(ctx) });
  return true;
}

/**
 * The sentence the copy line ends on (D5 K-92), its key drawn for this
 * platform: Enter's act where Enter selects the walk's span (`enterSelects`),
 * Shift+↓'s at any other span at its reading scale; null where the focus is
 * anywhere else — a document, an account, the board, a link's symbol, a mark,
 * a corner, the one line, an overlay's control, the scene, a live caret.
 * @param {Ctx} ctx
 * @returns {import('../overlays/hint.js').Ending | null}
 */
function selectsHere(ctx) {
  const f = WALK.current(), c = LAYER.caret();
  if (ctx.where !== 'plane' || SCENE.isOpen() || (c && c.live) || !f || f.kind !== 'block' || f.pos == null || !LAYER.atReadingScale(f.addr)) return null;
  return enterSelects(f) ? { id: 'L.copy.nothing.enter', values: actKey() } : { id: 'L.copy.nothing.shift', values: { 'select chord': drawChord('Shift+↓') } };
}

/**
 * Does Enter at the walk's element select it (K-7, D8; `activateFocus`): a
 * span that is no withheld run, in text the person may not edit.
 * @param {import('./walk.js').Node} f
 * @returns {boolean}
 */
function enterSelects(f) {
  if (f.kind !== 'block' || f.pos == null) return false;
  const b = LAYER.blockByPos(f.addr, f.pos);
  return !(b && b.kind === 'withheld') && !LAYER.editable(f.addr);
}

/** a printable key no field takes: swallowed, the K-9 line its hint at the focus until the next act, ending with where the person was writing where `writing` names it (foundations §2.7; `writingElsewhere`) */
function swallow(/** @type {KeyboardEvent} */ e, /** @type {Ctx} */ ctx, /** @type {import('../overlays/hint.js').Writing | null} */ writing = null) {
  if (e.key === ' ') HINT.show('F.swallow.space', { 'space key': drawChord('Space'), 'paging key': drawChord('PageDown') }, { ...hinted(e, ctx), writing });
  else HINT.show('F.swallow', { 'LEAP chord': drawChord('Mod+L') }, { ...hinted(e, ctx), writing });
}

/**
 * A key at a corner — the plane's, or a reading scene's pane's (see the head;
 * D5 K-57; FP-20): Enter and Space, with Shift or without, at one of its acts
 * are the platform's, which activates the act once a press, its click the
 * act's (APP-INPUT's, SC's) — save an auto-repeat, and a press made while a
 * key waits (`waiting`), each taken so the platform activates nothing, the
 * one held dropped at its landing; at a corner holding no act the page takes
 * neither, its container acting on nothing. ← and → move the focus along the line of acts holding
 * it — the corner's toolbar, or at its document's head the row's (T-LAYER's
 * `setStops`) — staying at its ends. On the plane a printable key but Space at
 * a corner of a draft the person may edit is answered by the way back to its
 * text (`cornerSays`). A key made at a landing with a corner its context is
 * dropped: no act of a corner is made there (FP-25).
 * @param {KeyboardEvent} e
 * @param {string} chord
 * @param {Ctx} ctx
 * @param {boolean} [pane] the corner is a reading scene's pane's: a printable key there is the scene's
 * @returns {Act | null | undefined} the key's act; null where the platform takes it; undefined where the corner takes no such key — the focus at no corner, ← or → off a line of acts, a printable key the corner does not answer — and the site holding the corner answers it
 */
function cornerKey(e, chord, ctx, pane = false) {
  const target = /** @type {HTMLElement | null} */ (e.target);
  const corner = target && typeof target.closest === 'function' ? /** @type {HTMLElement | null} */ (target.closest('[data-corner]')) : null;
  if (!target || !corner) return undefined;
  if (ctx.landed) return null;
  const on = /** @type {HTMLElement | null} */ (target.closest('button'));
  if (e.key === 'Enter' || e.key === ' ') return on && (e.repeat || waiting()) ? () => { e.preventDefault(); return true; } : null;
  if (chord === '←' || chord === '→') {
    const bar = on ? /** @type {HTMLElement} */ (on.closest('[role="toolbar"]') || corner) : null;
    const acts = bar ? /** @type {HTMLElement[]} */ ([...bar.querySelectorAll('button')]) : [], i = on ? acts.indexOf(on) : -1;
    if (i < 0) return undefined;
    const to = acts[Math.max(0, Math.min(acts.length - 1, i + (chord === '→' ? 1 : -1)))];
    return () => { e.preventDefault(); if (to !== on) FOCUS.land(to); return true; };
  }
  const addr = corner.dataset.corner || '';
  if (!pane && printable(e) && LAYER.editable(addr)) return () => { cornerSays(e, ctx, addr); return true; };
  return undefined;
}

/**
 * A printable key but Space at a control of the corner of a draft the person
 * may edit (see the head; B3-S13; D5 K-72; D6 BM-52): its line naming the way
 * back to the draft's text by its chord, Shift+Tab drawn for this platform
 * (`B3.caret.back`), its hint at the control until the next act, ending with
 * where the person was writing where they last wrote in another draft
 * (`writingElsewhere`); nothing placed, and a caret standing where it stood.
 * @param {KeyboardEvent} e
 * @param {Ctx} ctx
 * @param {string} addr the corner's document
 */
function cornerSays(e, ctx, addr) {
  HINT.show('B3.caret.back', { 'back chord': drawChord('Shift+Tab') }, { ...hinted(e, ctx), writing: writingElsewhere(addr) });
}

/** an inert slot's chord where no acts card gives its reason — no span in focus, or the scene over the plane with no selection in the held version (`heldSaid`): the slot's reason its hint at the focus until the next act (P47) */
function inertSaid(/** @type {InertSlot} */ slot, /** @type {KeyboardEvent} */ e, /** @type {Ctx} */ ctx) {
  HINT.show(SEL.reasonOf(slot), null, hinted(e, ctx));
}

/** a slot's chord where nothing in focus is what the slot acts on (O-SELECTION's `act`): its reason, "select a passage first", its hint at the focus until the next act (D5 §1.6; P47) */
function selectFirst(/** @type {KeyboardEvent} */ e, /** @type {Ctx} */ ctx) {
  HINT.show('D5.select-first', null, hinted(e, ctx));
}

/** the selection the screen draws in the text the live caret stands in — what a key's text at the caret replaces, what an arrow at it ends and what Mod+Enter at it follows from (D5 K-51, K-71, K-72; see the head); null where none is drawn there, whatever an earlier act did and wherever else a selection stands, and where it reaches into another document's text (O-SELECTION's `reachesPast`; FP-40) */
function selectedAtCaret() {
  const s = SEL.selected(), c = LAYER.caret();
  return s && c && s.addr === c.addr && !SEL.reachesPast() ? s : null;
}

/** Mod+Enter at a live caret with no selection drawn in its text (`selectedAtCaret`; D5 K-51; B3-S13): nothing selected, nothing followed, the caret where it stands — the caret's follow line its hint at the focus until the next act */
function followAtCaret(/** @type {KeyboardEvent} */ e, /** @type {Ctx} */ ctx) {
  HINT.show('B3.row.follow.inert', null, hinted(e, ctx));
}

/**
 * Esc's one order (§4 rule 7; D7): the most recently opened thing closes —
 * the box, the card or scene still reading (O-HOST's opening, ended alone:
 * the overlay standing under it stands), the notice standing below the
 * overlay, then the overlay (O-HOST's `dismissInnermost`; FP-36) — a jump's
 * reaching face among them, whose dismissal abandons the jump — then a jump
 * reaching whose face another overlay took the place of (FP-25; N-GO's
 * `abandon`), the find — its current match left selected, the focus on it
 * (N-FIND's `close`; FP-20) — the scene — its close a Back from its entry
 * (N-GO's `closeScene`), which brings back the selection the place it opened
 * over kept — then the selection, then a live caret — the text left to the walk at
 * the caret's span, the caret kept there and its span holding the walk
 * through the camera's moves (K-77; N-WALK's `leaveText`) — then the arrival
 * — its outline, its labels and its line (FP-21; N-GO's `endArrival`); on the
 * bare plane nothing. Made at a
 * jump's landing, it ends no chrome a field the reader types in stands in
 * (FP-20): it passes over the box, the find, and an overlay whose own field
 * holds the caret (O-HOST's `typing`) — the notice below that overlay closing first
 * all the same — and closes the next thing in the order. An empty click on
 * the plane is the pointer's Esc (APP-INPUT's): one thing closed in the same
 * order at each click, the find's close and the scene's made as the
 * pointer's, and the live caret's the last — the caret kept, its span holding
 * the walk with the ring drawn and the panel hidden — so no click ends an
 * arrival (FP-21).
 * @param {boolean} [landed] a key held while a jump was in the air made it at the landing (`Ctx.landed`)
 * @param {boolean} [pointer] an empty click on the plane made it, not a key
 */
export function esc(landed = false, pointer = false) {
  if (LEAP.isOpen() && !landed) { LEAP.close(); return; }
  if (HOST.pending()) { HOST.endOpening(); return; }
  if (HOST.current() && !(landed && HOST.typing() && !HOST.notice())) { HOST.dismissInnermost(); return; }
  if (GO.abandon()) return;
  if (FIND.isOpen() && !landed) { void FIND.close(); return; }
  if (SCENE.isOpen()) { GO.closeScene(!pointer); return; }
  if (SEL.selected()) { SEL.clear(); return; }
  if (WALK.leaveText() || pointer) return;
  GO.endArrival();
}

/**
 * Enter activates the focus (K-7): a place goes — the board, an account or a
 * document, each a teleport pushed on the trail, a document's made at the
 * document, where the face of a failure known at the act stands (N-GO) — a
 * continuation's mark opens its members' list, which takes the focus on its
 * newest row (O-MARK-LIST); a withheld
 * run opens its whole wording's card (§2.1; O-FACES's `withheldRun`), which
 * takes the focus as a key opened it — on C-67's pointer where it offers one,
 * a LEAP to the edition its claim names made at the run, else on its head; in
 * text the person may edit the span takes the caret — placed at its start,
 * or the kept one standing in it returned — the selection cleared (K-70;
 * BM-52; T-LAYER's `caretToSpan`); any other span is selected whole (D8;
 * `enterSelects`), a
 * link's symbol opens its card, which takes the focus as a key opened it
 * (K-55). → at a document below its reading scale takes this act too (K-3;
 * see the head).
 * @param {boolean} byKey
 */
async function activateFocus(byKey) {
  const f = WALK.current();
  if (!f) { await WALK.enter(); return; }
  if (f.kind === 'account') { await GO.toAccount(f.addr, byKey); return; }
  if (f.kind === 'board') { await GO.wholeBoard(byKey); return; }
  if (f.kind === 'mark') { await MARKLIST.open(f.addr, byKey); return; }
  if (f.kind === 'document') { await GO.leapTo(f.addr, { how: 'key', byKey, site: { span: { addr: f.addr, pos: 1 } } }); return; }
  if (f.kind === 'block' && f.pos != null) {
    const b = LAYER.blockByPos(f.addr, f.pos);
    if (b && b.kind === 'withheld') FACES.withheldRun(f.addr, b, (home, byKey) => GO.leapTo(home, { how: 'leap', byKey, site: { span: { addr: f.addr, pos: b.pos, width: b.width } } }), byKey);
    else if (enterSelects(f)) SEL.select(f.addr, f.pos);
    else { SEL.clear(); LAYER.caretToSpan(f.addr, f.pos); }
    return;
  }
  if (f.kind === 'link' && f.link) ANATOMY.open(f.link, null, byKey);
}

/** Enter's act on the walk's element (K-7; `activateFocus`), a key's: what an activation reaching a mirror item makes there, once the walk stands on it (N-WALK's `activate`) */
export const activate = () => activateFocus(true);

/**
 * A paging key (K-6): at reading scale, the view's centre over a column whose
 * foot the view already shows (PageDown) or whose top it shows (PageUp), the
 * next column's top — or the previous one's — brought to the top of the view,
 * centred across it, at once (T-LAYER's `pageTarget`; FP-12); anywhere else
 * the view paged by 0.9 of its height.
 * @param {1 | -1} dir
 */
function page(dir) {
  const to = LAYER.pageTarget(dir);
  if (to) { CAM.set(to); return; }
  const { VH } = CAM.viewport();
  CAM.panBy(0, dir > 0 ? -VH * 0.9 : VH * 0.9);
}

/** a zoom chord (K-11): the camera stepped about the view's centre, the focus re-taken at the new grain and taken there (rule 10), the re-take aiming nothing (N-WALK's) */
function zoomAboutFocus(/** @type {number} */ factor, /** @type {boolean} */ byKey) {
  const { VW, VH } = CAM.viewport();
  CAM.zoomAt(factor, VW / 2, VH / 2);
  CAM.markDirty();
  WALK.retakeFromView(byKey);
}
