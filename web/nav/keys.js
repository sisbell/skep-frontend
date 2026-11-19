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
// board answers; a jump that never lands drops the keys it held. While an
// undo or a redo reads the text its step stands in, every key but Esc is
// held so, the navigation acts too, and made once its outcome is known —
// dropped where Esc sets it aside (`undoChord`). A key made
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
// edition of the session's account C-45 naming the document, the staging act
// beneath it standing inert (`STAGING`; FP-41), at a document of
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
// (`writingElsewhere`; W-WRITE's `lastWritten`) — in a reading scene, where
// the key's site is the pane it is pressed at, the shortest way back: the
// focus moved into the editor pane holding that caret, onto its span; else
// the scene's close, where the entry it opened over holds the caret; else a
// LEAP from the scene's entry (`backTo`; SC's `toCaret`, N-GO's `closesTo`).
// Mod+R and F5 are taken and nothing reloaded (K-94), and the platform's own
// chords — copy, paste, cut, select all, print, close, quit, minimize, hide,
// preferences — are never taken save where a site's line answers a paste or a
// cut at its keydown (K-93) — at a caret that writes Mod+V and Mod+X, and at
// the walk's span of an edition of the person's own Mod+V, are answered
// before any wait and left standing, so the platform fires the paste or the
// cut event the page acts on (below) — save select-all where the page selects a
// document whole
// (`wholeAt`, `selectWhole`; K-93; B3-S8) — at the page's live caret in a
// draft, at the span a kept caret stands in, the caret returned, and at the
// walk's span of an edition, which takes no caret: the whole of the text
// shown one selection with its acts' row at it, a caret live at its end and
// the run of typing open there ended (D6 BM-31) — and save Mod+C outside a field where the platform holds no
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
// THE PASTE AND THE CUT EVENTS (`pasteEvent`, `cutEvent`; D5 K-93; B3-S5 (ii),
// (iv); D6 BM-31, BM-52), each handed in by APP with where the focus is, a
// key's or a menu's alike, and answered by the same tests the keydown reads
// (`whereNow`, `unwritableSays`, `keptSpan`, `bareDraftSpan`, `siteSays`), so
// one that arrives with no keydown is guarded here. Off the plane — a field,
// a control, the line, a corner — each is the platform's, untouched; in a
// reading scene, at a pane's text each is answered as on the plane, by the
// pane's caret, its kept caret's span or its own line (`paneSays`), and
// anywhere else in the scene it is the platform's. At a live caret in a draft that can be written, and at the span
// a kept caret stands in, the caret returned first: a paste is made by the
// event's plain text and skep's own entry, each read as the event is
// dispatched, at the caret as one step of its own, in the place of a
// selection drawn in the caret's text (`selectedAtCaret`; T-LAYER's
// `caretPaste`) — the same words by identity, else the plain text as new
// bytes — the walk then on the caret's span; one whose source is read by
// identity first holds every key until it is placed or told (`reading`); a
// paste told — words not matching the passage its entry names, placed as new
// bytes, or nothing placed, its source refused or not read, at the act or by
// the board after it (W-WRITE's `onUnplaced`) — raises its face where it was
// made (O-DELETION's `pasted`, O-FACES' `pasteWords`); the clipboard holding no
// text, or more than one paste places, answered by its own line, nothing
// placed; a cut writes the clipboard as a copy of that selection does and
// takes its bytes out as one step of its own, the selection ended (T-LAYER's
// `caretCut`) — with nothing selected there the copy's nothing-selected line,
// the clipboard left as it is, and where the clipboard could not take the
// selection whole a line saying so, nothing removed. Where the draft cannot
// be written the reason's line answers both, and at a span of a draft holding
// no caret the draft's line in their own words; a paste at the walk's span in
// text the person may not edit is answered by its document's line, nothing
// placed and nothing sent — at an edition of the person's own C-45 with its
// staging act and, between them, C-241's statement naming the draft skep's
// own entry says its words were read in, where that entry is this board's
// and the draft is the person's own and held (`draftCopied`; B3-S5) — a cut
// there left to the platform. While a jump is in the air a paste is held with
// the keys, its two flavors read as the event is dispatched, and made at the
// landing in their order (`hold`, `replay`); a cut, which writes the clipboard only
// inside its event, is prevented and dropped. No clipboard is read but an
// event's own.
// THE CARET (D5 K-51, K-70, K-71, K-72, K-76, K-77; D6 BM-1, BM-52, BM-54,
// BM-70, BM-75): in text the person may edit (T-LAYER's `editable`) Enter at
// the walk's focused span places the caret at the span's start, or returns
// the draft's kept caret standing in that span, the page's own or the one the
// draft keeps since a caret was set in another (`activateFocus`; T-LAYER's
// `caretToSpan`, `caretIn`; B3-S1 P59); while a live caret stands on the
// plane in text the person may edit at the camera's scale the focus is at it
// (`Ctx.where` `caret`,
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
// nothing removed (K-93); at the span the draft's
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
// (FP-36; O-HOST's), the overlay, an undo reading the text its step stands
// in — set aside by a key's Esc alone, its line taken down — a jump
// reaching, the find — its current
// match left selected with the focus on it (N-FIND's `close`; FP-20) — in the
// scene the selection standing in the text of the pane the focus is at, then
// a live caret in an editor pane, the text left and the caret kept there
// (`paneEsc`; K-77), then the scene — its close a Back from its entry (N-GO's
// `closeScene`), which re-takes an editor pane's caret — the
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
// nothing under it takes one: at a live caret in an editor pane every caret
// key is the plane's (`caretKey`); at a pane's text where none is live the
// pane's moves move its span focus (SC's `key`), Enter at an editor pane's
// span places the caret (SC's `enterSpan`; K-70), and a printable key at the
// span its kept caret stands in returns it and types there; a pane's corner
// is routed as a corner, by its pane's test (`cornerKey`); and every key the
// scene swallows is answered by the line of the pane it is pressed at
// (`paneSays`) — at the scene's acts by their own (`actsSays`), never by
// silence — Space by K-9's own line. Whether a key made an act is the
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
// camera move put the walk in — in a reading scene, the draft whose caret,
// live or kept, an editor pane of the scene holds (`undoTarget`; T-LAYER's
// `caretPane`), its face and its follow the pane's: W-MACHINE takes the newest step
// back, or puts the step undone last back, at once; the caret then stands
// where the step began, live, the walk on its span and its mark brought into
// view; and what it did is said in the status region alone, never drawn —
// "taken out — …" then "put back — …" by the first words of each. Where the
// step's line awaits an act of the person's at its face, the press shows that
// face — a moved document's standing at its corner, opened whole there where
// it stands compact and its words said — and takes none of its acts. A step
// whose text the page does not hold — a long draft held in part, on the
// plane or in an editor pane — moves nothing while that text is read
// (W-MACHINE's `reach`): a line at the act's site says the chord is reading
// where the change was made, with the running mark, placed and heard as a
// jump's reading face is, and goes as the read answers, the press then
// decided as over held text; keys pressed meanwhile wait behind it and are
// made after it in order, Esc sets it aside, and a pointer's or the
// camera's act is kept, the step then taken where it stands and said
// (`pointed`). Where the read fails the step stays next, and the line says
// why at every press in its cause's words — the board not answering, said at
// once with no read where the board already does not answer, else the
// refusal's own (O-FACES' `notUndone`; FP-34, FP-41). Where
// the draft cannot be written the
// reason's line answers it (`unwritableSays`). On an empty stack the undo is
// answered by the empty stack's line; with no such draft, by the document's
// line where the walk stands on an edition of the person's own or on
// another's document (`siteSays`) — in a reading scene by the line of the
// pane it is made at — else by the no-caret line, ending with
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
// has taken (`keysTaken`), the save chord's latest answer (`saving`), the
// latest paste or cut made (`clipping`), and the undo or redo reading the
// text its step stands in — set aside, or kept by a pointer's or the
// camera's act (`undoing`).
// Rules: FP-1, FP-2, FP-9, FP-10, FP-11, FP-13, FP-14, FP-20, FP-21, FP-24,
// FP-25, FP-27, FP-34, FP-35, FP-36, FP-38, FP-39, FP-40, FP-41.

import * as GO from './go.js';
import * as WALK from './walk.js';
import * as LEAP from './leap.js';
import * as FIND from './find.js';
import * as FOCUS from './focus.js';
import * as REC from '../model/records.js';
import * as PASSAGE from '../model/passage.js';
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
import { byteLength } from '../util.js';
import { t, tRuns, joinRuns, sentence, sentences, megabytes } from '../strings.js';

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
 * @property {'plane' | 'caret' | 'line' | 'box' | 'overlay' | 'landing' | 'corner' | 'scene' | 'scene-acts' | 'field'} where `caret` the plane, or a reading scene's editor pane, while a live caret stands in its text (T-LAYER's `caret`, `caretPane`; set here, `whereNow`), `scene` a reading scene's pane or its corner, `scene-acts` its bar's buttons, `landing` a landing's line's acts (O-LAND)
 * @property {boolean} byKey a key made the act (the focus owner's one reading, `FOCUS.byKey`)
 * @property {boolean} [landed] the key is made at a jump's landing, held while the jump was in the air — or once an undo reading the text its step stands in is decided, held behind it (`replay`): Esc passes over the chrome a field the reader types in stands in (`esc`), and a key pressed at a corner is dropped (`cornerKey`)
 * @property {'a' | 'b'} [pane] the reading scene's pane whose text the key was pressed at — never its corner (SC's `textPane`; set here, `whereNow`): its span focus the key's site, and its own line the one a key it swallows raises
 */

/** @typedef {() => (boolean | Promise<boolean>)} Act a key's act, made: true where the page took the key */

/**
 * @typedef {Object} Pressed — what a line raised by an event is told of it (`hinted`): a key's, or a clipboard event's
 * @property {boolean} [repeat] the key is an auto-repeat
 * @property {EventTarget | null} target the element the event was aimed at
 */

/**
 * @typedef {Object} Clip — a paste or a cut event as the page reads it: the platform's, or one the gate's door makes
 * @property {{getData(format: string): string, setData(format: string, data: string): void} | null} clipboardData the event's own clipboard: read and written only while the event is dispatched
 * @property {() => void} preventDefault
 * @property {EventTarget | null} target
 */

/**
 * @typedef {Object} Held — a key a jump in the air held for its landing (see the head), or a paste held as a key is
 * @property {KeyboardEvent | null} e the key; null for a paste
 * @property {{text: string, entry: string, at: Pressed} | null} [paste] a paste's plain text and skep's own entry, each read as its event was dispatched, and what its line is told of the event (`pasteEvent`)
 * @property {Ctx} ctx where the focus was as it was pressed, and whether a key made it
 * @property {Promise<boolean>} jump the landing it waits for (N-GO's `aground`), after a paste's read or an undo's outcome where one was out as it was pressed (`Undoing.decided`): true where it came, false where the jump never landed or Esc set the undo aside
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
/** @type {Promise<void>} the latest paste or cut made at the caret, settled once the walk stands on the caret's span (`clipped`) */
let clipping = Promise.resolve();
/** @type {Promise<unknown> | null} a paste whose source is being read by identity (T-LAYER's `caretPaste`), settled once it is placed or told: keys wait for it as for a jump in the air (`waiting`) */
let reading = null;

/**
 * @typedef {Object} Undoing — an undo or a redo reading the text its step stands in (`undoChord`; see the head)
 * @property {string} addr the draft
 * @property {boolean} aside Esc set it aside (`setAside`): its read's answer changes nothing, and the keys held behind it are dropped
 * @property {boolean} kept a pointer's or the camera's act was made while it read (`pointed`): the step is taken where it stands, said, and nothing else moved
 * @property {Promise<boolean>} decided the press's outcome known: true once its step is taken, answered at its face or not taken — what the keys held behind it wait on (`hold`); false where it was set aside
 * @property {(known: boolean) => void} settle `decided` settled; once, any later call doing nothing
 */

/** @type {Undoing | null} the undo or redo reading the text its step stands in, until the chord's act ends; null where none reads */
let undoing = null;
/** does an undo or a redo reading the text its step stands in hold the keys behind it: one reads, and Esc has not set it aside */
const undoWaits = () => !!undoing && !undoing.aside;
/** the latest paste or cut made at the caret, settled once the walk stands on the caret's span and any line its draft owes the edit is said (`pasteAt`, `cutEvent`): what the gate and the tests wait on */
export const clipped = () => clipping;
/** the keys that are a modifier going down: none of them a key typed */
const MODIFIER_KEYS = ['Shift', 'Meta', 'Control', 'Alt', 'AltGraph', 'CapsLock'];
/** reset what the save chord holds (tests): Mod+S not yet answered whole, no key taken, no answer owed, no paste or cut being made, no undo reading */
export function _reset() { saveAnswered = false; keysTaken = 0; saving = Promise.resolve(); clipping = Promise.resolve(); reading = null; undoing = null; }

/** the keys held for a landing, the one whose act is being made there, and an undo or a redo reading the text its step stands in (the gate's settle signal) */
export const holding = () => held.length + (making ? 1 : 0) + (undoing ? 1 : 0);

/** does a key the page acts on wait now: a jump is in the air, a paste's source is being read (`reading`), an undo or a redo reads the text its step stands in (`undoWaits`), or held keys wait for their landing or are being made there (`hold`) */
const waiting = () => GO.inAir() || reading !== null || undoWaits() || held.length > 0 || replaying;

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
  if (SCENE.isOpen()) return inScene(ctx);
  if (ctx.where !== 'plane') return ctx;
  const c = LAYER.caret(), f = WALK.current();
  if (!c || !c.live) return ctx;
  if (f && f.addr !== c.addr) { LAYER.leaveCaret('walk'); return ctx; }
  if (!LAYER.editable(c.addr)) { WALK.holdCaret('camera'); return ctx; }
  return { ...ctx, where: 'caret' };
}

/**
 * Where a key in a reading scene stands (see the head): at a pane's text —
 * the pane, never its corner — that pane (`Ctx.pane`; SC's `textPane`), and
 * the caret's where the page's live caret stands in that pane, its draft's
 * editor (T-LAYER's `caretPane`); a live caret the key finds outside the
 * editor pane holding it — at another pane's text — left kept where it stood,
 * as the walk standing outside a caret's document leaves it (D5 M-2).
 * Everywhere else in the scene — a pane's corner, the scene's acts — as the
 * app read it.
 * @param {Ctx} ctx
 * @returns {Ctx}
 */
function inScene(ctx) {
  if (ctx.where !== 'scene' && ctx.where !== 'caret') return ctx;
  const side = SCENE.textPane();
  /** @type {Ctx} */
  const at = { ...ctx, where: 'scene' };
  delete at.pane;
  if (!side) return at;
  const c = LAYER.caret(), holds = LAYER.caretPane();
  if (!c || !c.live) return { ...at, pane: side };
  if (holds && holds.focused) return { ...at, where: 'caret', pane: side };
  LAYER.leaveCaret('walk');
  return { ...at, pane: side };
}

/**
 * The walk's focused span where it is a span of a draft the person may edit
 * and the focus is the plane's — a caret standing in it then kept, a live one
 * making the focus the caret's (`whereNow`); in a reading scene, the span
 * focus of the editor pane whose text the key is at, a live caret standing
 * there apart (SC's `siteOf`); null anywhere else: another's text, a past
 * state, the held version, a live caret standing, a pane's corner.
 * @param {Ctx} ctx
 * @returns {{addr: string, pos: number} | null}
 */
function draftSpan(ctx) {
  if (SCENE.isOpen()) {
    const p = ctx.where === 'scene' && ctx.pane ? SCENE.siteOf(ctx.pane) : null;
    return p && p.kind === 'editor' && p.focus != null ? { addr: p.names, pos: p.focus } : null;
  }
  if (ctx.where !== 'plane') return null;
  const f = WALK.current();
  return f && f.kind === 'block' && f.pos != null && LAYER.editable(f.addr) ? { addr: f.addr, pos: f.pos } : null;
}

/** the walk's focused span of a draft the person may edit holding no caret of that draft's (`draftSpan`; T-LAYER's `caretInSpan`) — the site of the swallow's draft form (K-72, K-93); null anywhere else, and where the draft's kept caret stands in it (`keptSpan`) */
function bareDraftSpan(/** @type {Ctx} */ ctx) {
  const s = draftSpan(ctx);
  return s && !LAYER.caretInSpan(s.addr, s.pos) ? s : null;
}

/** the walk's focused span of a draft the person may edit holding that draft's kept caret — the page's own, or the one the draft keeps (`draftSpan`; T-LAYER's `caretInSpan`) — the span whose keys return it (K-70, K-77; B3-S1 P59; `typeAt`, `extendAtKept`); null anywhere else */
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
 * The document select-all selects whole (see the head; D5 K-93; B3-S8): the
 * draft the page's live caret stands in; the draft whose own kept caret
 * stands in the walk's span (`keptSpan`), the caret then returned; the
 * edition whose span the walk stands on, which takes no caret — the one test
 * saying published of the version the walk stands in (T-LAYER's `isDraft`;
 * FP-39); in a reading scene, the editor pane's live caret's draft and the
 * draft whose kept caret stands at the editor pane's span focus, and a past
 * state's pane, read only (SC's `selectAll`; B3-S8). Null anywhere
 * else — a span of a draft holding no caret, another's draft, a document
 * below its reading scale, a field, a control, the scene's other panes, its
 * corners and its acts — where select-all stays the platform's.
 * @param {Ctx} ctx
 * @returns {{addr: string, kept: boolean, pane?: 'a' | 'b'} | null} the document, whether its kept caret is returned first, and the pane it is selected in, in a reading scene
 */
function wholeAt(ctx) {
  const c = LAYER.caret();
  if (SCENE.isOpen()) {
    const kept = keptSpan(ctx), p = ctx.pane ? SCENE.siteOf(ctx.pane) : null;
    if (!p) return null;
    if (ctx.where === 'caret' && c) return { addr: c.addr, kept: false, pane: p.side };
    if (kept) return { addr: kept.addr, kept: true, pane: p.side };
    return p.kind === 'past' ? { addr: p.names, kept: false, pane: p.side } : null;
  }
  if (ctx.where === 'caret') return c ? { addr: c.addr, kept: false } : null;
  const kept = keptSpan(ctx);
  if (kept) return { addr: kept.addr, kept: true };
  const s = readOnlySpan(ctx);
  return s && LAYER.isDraft(s.addr) === false ? { addr: s.addr, kept: false } : null;
}

/**
 * Select-all made (`wholeAt`; D5 K-93; B3-S8): the whole of the text the page
 * shows of the document one selection, its acts' row at it (O-SELECTION's
 * `select`) — at a caret, the caret live at the selection's end with the
 * platform's selection standing (T-LAYER's `placeCaret`), which ends the run
 * of typing open there (D6 BM-31), and the walk following it; at an edition,
 * the walk where it stood. A document holding no text selects nothing.
 * @param {Ctx} ctx
 */
async function selectWhole(ctx) {
  const at = wholeAt(ctx);
  if (!at) return;
  if (at.kept) LAYER.returnCaret(false, at.addr);
  // in a reading scene's pane, the pane's text whole its platform's selection there (SC's `selectAll`)
  if (at.pane) { SCENE.selectAll(at.pane); SCENE.followCaret(); return; }
  const d = LAYER.shownOf(at.addr), c = LAYER.caret();
  if (d.from < 0) return;
  const end = Math.max(d.to, (d.extent ?? 0) + 1);
  if (end <= 1) return;
  if (c && c.live && c.addr === at.addr) LAYER.placeCaret(at.addr, end, true);
  SEL.select(at.addr, 1, end - 1, 'end');
  if (c && c.live && c.addr === at.addr) await follow();
}

/**
 * @typedef {{kind: 'edition', doc: string} | {kind: 'others', owner: string}} Site — the site a printable key or a paste at the walk's span in text the person may not edit is answered at (`readOnlySite`): an edition of the session's account, by its document; a document of another account, by its owner
 */

/**
 * The site the walk's span in text the person may not edit (`readOnlySpan`)
 * answers a printable key or a paste at (see the head; D5 K-72, K-93): a
 * document of the session's account the one test says is published, asked
 * of the version the walk stands in as its corner asks it (T-LAYER's
 * `isDraft`; FP-39), by the document; a document of another account by its
 * owner (M-REC's `ownerAccount`). Null where no session names an account,
 * where that test does not say published of a document of the session's
 * account, and where the owner the line would name is the session's own
 * account.
 * @param {Ctx} ctx
 * @returns {Site | null}
 */
function readOnlySite(ctx) {
  const s = readOnlySpan(ctx), account = REC.session()?.account, doc = s && documentOf(s.addr);
  if (!s || !account || !doc) return null;
  if (accountOf(doc) === account) return LAYER.isDraft(s.addr) === false ? { kind: 'edition', doc } : null;
  const owner = REC.ownerAccount(REC.doc(REC.has(doc) ? doc : s.addr));
  return owner && owner !== account ? { kind: 'others', owner } : null;
}

/** the act C-45 offers beneath it at an edition of the person's own — the staging act (D5 K-72; B3-S5, B3-S10) — standing inert, its reason said at every press (O-HINT's `offeredAct`; FP-41) */
const STAGING = /** @type {import('../overlays/hint.js').Offered} */ (Object.freeze({ id: 'B3.write-next', reason: 'L.write-next.inert' }));

/**
 * A printable key, the undo chord or a paste at the walk's span in text the
 * person may not edit answered by its document's line, its hint at the
 * focus, nothing placed and nothing sent (see the head; D5 K-72, K-93;
 * foundations §2.7; `readOnlySite`): at an edition of the session's account
 * C-45 naming the document, its staging act beneath it, inert (`STAGING`) —
 * and, for a paste, between them C-241's statement where skep's own entry
 * names a draft of the person's own as where its words were read
 * (`draftCopied`; B3-S5); at a document of another account B3-S13's line
 * naming its owner. Nothing is answered, and K-9's line is the caller's,
 * where `readOnlySite` names no site. In a reading scene the key's pane
 * answers by its own line, never K-9's (`paneSays`).
 * @param {Pressed} e the key, or a paste event
 * @param {Ctx} ctx
 * @param {SiteSaying} [o]
 * @returns {boolean} whether a line answered the key
 */
function siteSays(e, ctx, o = {}) {
  if (SCENE.isOpen()) return paneSays(e, ctx, o);
  const site = readOnlySite(ctx), writing = o.writing ?? null, ending = o.ending ?? null;
  if (!site) return false;
  if (site.kind === 'others') { HINT.show('B3.row.others-document', { owner: site.owner }, { ...hinted(e, ctx), writing, ending }); return true; }
  const from = o.entry != null ? draftCopied(o.entry) : null;
  HINT.show('C-45', { D: site.doc }, { ...hinted(e, ctx), writing, ending, offered: STAGING, beneath: from ? { id: 'B3.quote.published-target', values: { label: from } } : null });
  return true;
}

/**
 * @typedef {Object} SiteSaying — what a site's line is told of the press it answers (`siteSays`, `paneSays`)
 * @property {import('../overlays/hint.js').Writing | null} [writing] where the person was writing, which the line ends with (`writingElsewhere`)
 * @property {import('../overlays/hint.js').Ending | null} [ending] the sentence the line ends on while it stands whole (O-HINT's `show`): the undo chord's (`undoNone`)
 * @property {string} [entry] skep's own entry, as a paste's event carried it — a paste's alone
 * @property {'key' | 'paste' | 'undo'} [as] the press: a printable key, a paste, the undo chord — a paste where `entry` is handed in, else a key, where none is named
 */

/**
 * A key, a paste or the undo chord at a reading scene's pane answered by the
 * pane's own line, never K-9's (see the head; FP-40; B3-S13), the pane the key's text
 * stands at, else the one whose corner it was pressed at (SC's `siteOf`,
 * `paneHolding`): at a past state's pane C-337 (`B3.history.read-only`); at
 * the held version the reason its selection keys, else the span at its span
 * focus (SC's `heldReasonAt`; B3-S2); at an editor pane's span holding no
 * caret the draft's own line — "Enter places a caret here", the paste's form
 * for a paste (K-93), the no-caret line for the undo chord (K-75); at an
 * edition of the person's own C-45 naming it, the staging act beneath it,
 * inert (`STAGING`), and for a paste C-241's statement where skep's own entry
 * names a draft of the person's own (`draftCopied`); at a draft of the
 * person's own no pane edits, the reason's line where it cannot be written
 * now, else its own line; at another's document B3-S13's line naming its
 * owner. Each the hint beside the element the key was pressed at, ending with
 * where the person was writing and on the sentence handed in. False where the
 * key stands at no pane.
 * @param {Pressed} e the key, or a paste event
 * @param {Ctx} ctx
 * @param {SiteSaying} [o]
 * @returns {boolean} whether a line answered the key
 */
function paneSays(e, ctx, o = {}) {
  const t0 = /** @type {Element | null} */ (e.target), side = ctx.pane ?? (t0 ? SCENE.paneHolding(t0) : null), p = side ? SCENE.siteOf(side) : null;
  if (!p) return false;
  const shown = { ...hinted(e, ctx), writing: o.writing ?? null, ending: o.ending ?? null }, as = o.as ?? (o.entry != null ? 'paste' : 'key');
  /** the line of a draft's span holding no caret, in the press's own words */
  const bare = () => HINT.show(as === 'undo' ? 'B3.undo.none' : as === 'paste' ? 'B3.caret.enter.paste' : 'B3.caret.enter', as === 'undo' ? null : actKey(), shown);
  if (p.kind === 'past') { HINT.show('B3.history.read-only', null, shown); return true; }
  if (p.kind === 'held') { HINT.show(SCENE.heldReasonAt(p.side) ?? 'B3.held-version.not-current', null, shown); return true; }
  if (p.kind === 'editor') { bare(); return true; }
  const account = REC.session()?.account, doc = documentOf(p.names) || p.names;
  if (account && accountOf(doc) === account) {
    if (LAYER.isDraft(p.d) === false) {
      const from = o.entry != null ? draftCopied(o.entry) : null;
      HINT.show('C-45', { D: doc }, { ...shown, offered: STAGING, beneath: from ? { id: 'B3.quote.published-target', values: { label: from } } : null });
      return true;
    }
    if (!unwritableSays(doc, e, ctx)) bare();
    return true;
  }
  HINT.show('B3.row.others-document', { owner: REC.ownerAccount(p.d) || accountOf(doc) || '' }, shown);
  return true;
}

/**
 * The draft of the person's own a paste's words were copied in, named as the
 * status region names a box (see the head; B3-S5; T-LAYER's `boxName`): the
 * document skep's own entry says its words were read in (M-PASSAGE's
 * `readEntry`, `Naming.doc`) — never the documents its parts' bytes were
 * minted in — where the entry is this board's, that document is of the
 * session's account, the page holds its record, and the one test says it is
 * a draft (T-LAYER's `isDraft`; FP-39). Null where the entry is absent,
 * malformed or another board's, where it names any other document, and
 * where the page holds no record of the draft: none is made to name it.
 * @param {string} entry skep's own entry, as the paste's event carried it: '' where it carried none
 * @returns {import('../strings.js').Run[] | null} the draft's name, as stretches in their faces
 */
function draftCopied(entry) {
  const e = PASSAGE.readEntry(entry), b = REC.board(), account = REC.session()?.account;
  if (!e || !b || e.board !== b.origin || !account || accountOf(e.doc) !== account || !REC.has(e.doc) || LAYER.isDraft(e.doc) !== true) return null;
  return LAYER.boxName(e.doc).runs;
}

/**
 * Dispatch a key: true where the page took it (the caller then prevents the
 * default). A branch that waits before it answers prevents the default
 * itself, before the wait — the platform runs the default as soon as the
 * listeners return, not when the answer arrives. Nothing is dispatched
 * during an IME composition. The navigation acts are made at once; every
 * other key the page would act on while a jump is in the air — or while the
 * keys it held are being made — waits for its landing (`hold`; see the head),
 * save the line's ← and →, which move among its acts. While an undo or a
 * redo reads the text its step stands in, every key waits behind it, the
 * navigation acts too, save Esc where no jump in the air or paste's read
 * holds it: made at once, its order setting that undo aside (`undoChord`,
 * `esc`). Every key but a walk
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
  // a paste at the walk's span of another's document (K-72, K-93): its document's line at the keydown, its hint, nothing placed — at an edition of the person's own the keydown is left standing, so the platform's paste event follows and is answered there by what its clipboard names (`pasteAt`)
  if (mod && !e.shiftKey && chord === 'Mod+V' && readOnlySite(ctx)?.kind === 'others' && siteSays(e, ctx)) return true;
  // a copy outside a field where the platform holds no selection (K-92): the page's line, its default prevented, or the selection it draws placed under the copy
  if (mod && !e.shiftKey && !e.altKey && chord === 'Mod+C' && copyAsDrawn(e, ctx)) return true;
  // the rest of the platform's own, never taken (K-92, K-93): Mod+H among them on macOS alone, the trail's list elsewhere (K-41) — save select-all where the page selects a document whole (`wholeAt`)
  if (mod && !e.shiftKey && ['C', 'V', 'X', 'A', 'P', 'W', 'Q', 'M', 'H', ','].includes(chord.slice(4)) && chord !== trailChord() && !(chord === 'Mod+A' && wholeAt(ctx))) return false;
  if (ctx.where === 'field') {
    if (chord === 'Esc') { esc(); return true; }
    // find's chords, which no field takes as its own: the find opened beside the field, which keeps the caret (FP-20), or stepped
    if (REC.board() && (chord === 'Mod+F' || findDir(chord))) return findAct(e, findDir(chord), ctx)();
    return false; // a field takes its keys
  }
  // the navigation acts: made at once, a jump in the air abandoned (FP-25) — held, as every other key is, behind an undo reading the text its step stands in
  const nav = navAct(chord, ctx.byKey);
  if (nav) { if (undoWaits()) { e.preventDefault(); hold(e, ctx); return true; } return nav(); }
  const run = route(e, chord, ctx);
  if (!run) return false;
  // Esc sets an undo reading the text its step stands in aside at once, where no jump in the air or paste's read holds it too
  const sets = chord === 'Esc' && undoWaits() && !GO.inAir() && reading === null;
  if (waiting() && !sets && !(ctx.where === 'line' && (chord === '←' || chord === '→'))) { e.preventDefault(); hold(e, ctx); return true; }
  return run();
}

/**
 * The navigation acts — Back and Forward (K-20, K-21), the trail (K-40),
 * WHOLE BOARD and HOME (K-13, K-14) — unmade: made at once, a jump in the
 * air abandoned (FP-25), save behind an undo reading the text its step
 * stands in (`dispatch`, `replay`). Null for any other chord.
 * @param {string} chord
 * @param {boolean} byKey
 * @returns {Act | null}
 */
function navAct(chord, byKey) {
  if (chord === 'Mod+[') return () => { GO.back(byKey); return true; };
  if (chord === 'Mod+]') return () => { GO.forward(byKey); return true; };
  if (/^Mod\+[1-9]$/.test(chord)) return () => { GO.toTrailEntry(Number(chord.slice(4)), byKey); return true; };
  if (chord === 'Mod+0') return () => { GO.wholeBoard(byKey); return true; };
  if (chord === 'Mod+Shift+H') return () => { GO.home(byKey); return true; };
  return null;
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
  if (chord === 'Mod+S') return () => { saveChord(ctx, e.target); return true; }; // K-74: the chord writes nothing; the corner's kept state answers it
  // undo and redo (K-75): from the plane, the scene and every control but a field
  const undoes = undoAct(chord);
  if (undoes) return async () => { e.preventDefault(); await undoChord(e, ctx, undoes === 'redo'); return true; };
  // find (K-91): live from the plane, the scene, the line, a corner and every control on them alike, the browser's own find never run
  const fd = findDir(chord);
  if ((chord === 'Mod+F' || fd) && REC.board()) return findAct(e, fd, ctx);
  // the scene covers the plane: its keys alone, nothing under it takes one
  if (SCENE.isOpen()) return sceneKey(e, chord, ctx);
  // select-all (K-93; B3-S8): the document whole, where the page's caret or an edition's span is the site
  if (chord === 'Mod+A' && wholeAt(ctx)) return async () => { e.preventDefault(); await selectWhole(ctx); return true; };
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
  const kept = chord === 'Shift+←' || chord === 'Shift+→' ? keptSpan(ctx) : null;
  if (kept) return async () => { await extendAtKept(e, arrowStep(e), kept.addr); return true; };
  if ((chord === 'Shift+←' || chord === 'Shift+→') && bareDraftSpan(ctx)) return async () => { e.preventDefault(); SEL.extendFromSpan(arrowStep(e)); await WALK.followCaret(); return true; };
  if ((chord === 'Shift+←' || chord === 'Shift+→') && readOnlySpan(ctx)) return () => { e.preventDefault(); SEL.extendFromFocus(arrowStep(e)); return true; };
  if (chord === 'Mod+Shift+P') return () => { LINE.stripAct(); return true; };
  if (chord === 'Mod+R' || e.key === 'F5') return () => true; // K-94: the plane is live; nothing reloads
  // the caret's keys (see the head): at a live caret, before the walk's
  if (ctx.where === 'caret') { const act = caretKey(e, chord, ctx); if (act) return act; }
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
 * walk then stands on the span the caret is in (N-WALK's `followCaret`) — in
 * a reading scene's editor pane, that pane's span focus (`follow`) — the act
 * ending once it does, so the next key, a held one too (`replay`), acts
 * there; a line a key raises stands beside the focus it was pressed at,
 * the pane's in a scene (`hinted`). Each is taken even where the caret cannot
 * move that way. Null for any other key, which acts as on the plane. The
 * platform's default is prevented first: an arrow would scroll the mirror or
 * the pane, Home and End the page, Tab would move the focus, Backspace would
 * go back.
 * @param {KeyboardEvent} e
 * @param {string} chord
 * @param {Ctx} ctx
 * @returns {Act | null}
 */
function caretKey(e, chord, ctx) {
  /** @type {Record<string, CaretStep>} */
  const moves = { '←': arrowStep(e), '→': arrowStep(e), '↑': 'up', '↓': 'down', Home: 'home', End: 'end' };
  /** the key's change made at the caret, the walk following it */
  const at = (/** @type {() => boolean} */ change) => async () => { e.preventDefault(); change(); await follow(); return true; };
  /** a key that puts text in or takes it out: answered by the reason's line where the caret's draft cannot be written, else made, the moved verdict's line after its first */
  const edit = (/** @type {() => boolean} */ change) => async () => {
    e.preventDefault();
    const c = LAYER.caret();
    if (c && unwritableSays(c.addr, e, ctx)) return true;
    change();
    await follow();
    if (c) movedSays(c.addr, e, ctx);
    return true;
  };
  if (chord in moves) return at(() => stepCaret(moves[chord]));
  const shifted = chord.startsWith('Shift+') ? chord.slice(6) : '';
  if (shifted in moves) return at(() => extend(moves[shifted]));
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
 * @param {Pressed} e the key, or a paste or a cut event
 * @param {Ctx} [ctx]
 * @returns {boolean} whether a line answered the key
 */
function unwritableSays(addr, e, ctx = { where: 'plane', byKey: true }) {
  const why = WRITE.unwritable(addr), b = REC.board();
  if (!why) return false;
  HINT.show(CARET_LINE[why.why], { board: b ? t('L.mirror.board.name', { node: '1', origin: b.origin }) : '' }, hinted(e, ctx));
  return true;
}

/** the first key typed in a draft since a moved verdict came to stand on it — or the first paste or cut made there — followed by the verdict's line at the focus the key was made at, once per verdict (D6 BM-18; W-WRITE's `takeMovedKey`) */
function movedSays(/** @type {string} */ addr, /** @type {Pressed} */ e, /** @type {Ctx} */ ctx = { where: 'plane', byKey: true }) {
  if (WRITE.takeMovedKey(addr)) HINT.show('B3.moved.first-key', null, hinted(e, ctx));
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
 * — at the span the draft's kept caret stands in (`keptSpan`), the caret
 * returned and the key typed at it as at a live caret, replacing a selection
 * drawn in its text (K-70; BM-52; `editAtCaret`), the walk then standing on
 * the span the caret is in (N-WALK's `followCaret`), the platform's default
 * prevented before it waits; at a span holding no caret (`bareDraftSpan`), the draft's
 * own line naming the key that places a caret there, Enter drawn for this
 * platform (`B3.caret.enter`), its hint (K-72; K-9); at the walk's
 * span of an edition of the session's account or of another's document,
 * every key but Space, its document's line (`siteSays`; K-72); anywhere
 * else, and for Space, swallowed with the K-9 line (`swallow`). In a reading
 * scene the same at a pane's text where no caret is live — its span focus the
 * site, an editor pane's kept caret's span returning the caret and typing,
 * any other span answered by its pane's own line (`paneSays`) — every line
 * ending with where the person was writing, the site the pane (`keySite`);
 * a key at no pane answered by the scene's acts' line (`actsSays`), never
 * K-9's, Space alone keeping K-9's own line.
 * @param {KeyboardEvent} e
 * @param {Ctx} ctx
 * @returns {Promise<void>}
 */
async function typeAt(e, ctx) {
  // a draft the session's ending left standing with its unkept words (D6 BM-24): no caret is placed in it, and a key at it is answered by the ending's caret line
  const site = keySite(ctx), draft = SCENE.isOpen() ? draftSpan(ctx)?.addr ?? null : site, ended = draft ? WRITE.unwritable(draft) : null;
  if (e.key !== ' ' && draft && ended && ended.why === 'death' && WRITE.unkept(draft) && unwritableSays(draft, e, ctx)) return;
  const kept = e.key !== ' ' ? keptSpan(ctx) : null;
  if (kept && unwritableSays(kept.addr, e, ctx)) { e.preventDefault(); return; }
  if (kept) { e.preventDefault(); LAYER.returnCaret(false, kept.addr); editAtCaret(e.key); await follow(); movedSays(kept.addr, e, ctx); return; }
  const writing = writingElsewhere(site);
  if (e.key !== ' ' && bareDraftSpan(ctx)) { HINT.show('B3.caret.enter', actKey(), { ...hinted(e, ctx), writing }); return; }
  if (e.key !== ' ' && siteSays(e, ctx, { writing })) return;
  // in a reading scene no key is answered by K-9's line: one at no pane, the scene's own, by its acts' line
  if (e.key !== ' ' && SCENE.isOpen()) { actsSays(e, ctx); return; }
  swallow(e, ctx, writing);
}

/** the document the walk stands in — its element the document, or a span or a link in it — the site a printable key on the plane was pressed at (`writingElsewhere`); null off any document */
function walkSite() {
  const f = WALK.current();
  return f && (f.kind === 'document' || f.kind === 'block' || f.kind === 'link') ? f.addr : null;
}

/**
 * The site a key was pressed at, as the line it raises is ended against where
 * the person was writing (`writingElsewhere`): on the plane the document the
 * walk stands in (`walkSite`); in a reading scene the pane — at its text, or
 * at its corner — its draft's address where it is that draft's editor, else
 * the pane itself, a past state or the held version of a draft being a site
 * other than that draft (SC's `siteOf`, `paneHolding`); null at the scene's
 * acts and off any document.
 * @param {Ctx} ctx
 * @param {EventTarget | null} [target] the element the key was pressed at, which names a pane's corner's pane
 * @returns {string | null}
 */
function keySite(ctx, target = null) {
  if (!SCENE.isOpen()) return walkSite();
  const side = ctx.pane ?? (target ? SCENE.paneHolding(/** @type {Element} */ (target)) : null), p = side ? SCENE.siteOf(side) : null;
  return p ? (p.kind === 'editor' ? p.names : 'pane ' + p.side) : null;
}

/**
 * Where the person was writing, which the line a swallowed printable key
 * raises ends with (see the head; B3.undo.last-writing): the draft last
 * written in the page's session (W-WRITE's `lastWritten`), where that draft's
 * caret stands kept — the page's own, or the one the draft keeps (T-LAYER's
 * `caretIn`) — and the key was pressed at a site other than that draft (`keySite`:
 * a past state or the held version of the draft among them) — named as the
 * status region names its box (T-LAYER's `boxName`), its label the shortest
 * way back to the kept caret (`backTo`). Null anywhere else.
 * @param {string | null} site the site the key was pressed at (`keySite`); null where it was pressed at none
 * @returns {import('../overlays/hint.js').Writing | null}
 */
function writingElsewhere(site) {
  const w = WRITE.lastWritten(), c = w ? LAYER.caretIn(w) : null;
  if (!w || !c || c.live || site === w) return null;
  const name = LAYER.boxName(w);
  return { label: name.name, named: name.runs, act: (byKey) => backTo(w, byKey) };
}

/**
 * The shortest way back to a draft's kept caret (the ending's act; FP-40):
 * within a reading scene whose editor pane holds the
 * draft, the focus in that pane on the caret's span, so the next printable
 * key returns the caret and types there (SC's `toCaret`); else, in a scene
 * opened over an entry holding that caret, the scene's close — Back onto that
 * entry, the caret restored there (N-GO's `closesTo`, `closeScene`); else a
 * LEAP to the span the kept caret stands in, the caret's own position named
 * (N-GO's `leapTo`) — from a scene's entry, which stands behind it so Back
 * reopens the scene — so the next printable key there types at it (`typeAt`).
 * @param {string} w the draft
 * @param {boolean} byKey a key made the act
 */
function backTo(w, byKey) {
  if (SCENE.isOpen() && SCENE.toCaret(w)) return;
  if (GO.closesTo(w)) { GO.closeScene(byKey); return; }
  const at = LAYER.caretSpan(w);
  void GO.leapTo(w, { pos: at ? at.pos : null, how: byKey ? 'key' : 'click', byKey });
}

/**
 * Shift with ← or → at the span a draft's kept caret stands in (see the
 * head; K-70, K-77; B3-S1): the caret returned where it stood and a
 * selection extended from it a step — a word with Option on macOS (`arrowStep`) — as at a live
 * caret, never from the span's edge (O-SELECTION's `extendFromCaret`) — where
 * the caret cannot move that way,
 * the caret live and the selection standing as it stood, its highlight with
 * it (T-LAYER's `returnCaret`) — the walk then standing on the span the caret
 * is in (N-WALK's `followCaret`). The platform's default is prevented first,
 * before the walk's move is waited on: the selection the key makes is the
 * page's to place.
 * @param {KeyboardEvent} e
 * @param {ArrowStep} dir
 * @param {string} addr the draft whose kept caret is returned (`keptSpan`)
 * @returns {Promise<void>}
 */
async function extendAtKept(e, dir, addr) {
  e.preventDefault();
  LAYER.returnCaret(true, addr);
  extend(dir);
  await follow();
}

/** Shift with a step at a live caret (K-71): a selection extended from it — the page's on the plane (O-SELECTION's `extendFromCaret`), the platform's in the text of the reading scene's editor pane the caret stands in (SC's `extendFromCaret`) */
const extend = (/** @type {CaretStep} */ dir) => (LAYER.caretPane() ? SCENE.extendFromCaret(dir) : SEL.extendFromCaret(dir));

/** the walk follows a live caret (N-WALK's `followCaret`) — on the plane; in a reading scene the span focus of the editor pane the caret stands in (SC's `followCaret`) */
async function follow() {
  if (LAYER.caretPane()) SCENE.followCaret();
  else await WALK.followCaret();
}

/**
 * Mod+S (see the head; K-74; BM-3): the chord writes nothing itself. The
 * open burst of the draft the caret stands in — else the walk's document — is
 * committed first (W-WRITE's `commit`), and the answer given once it lands
 * (`landed`), from the kept state it leaves (`saveAnswer`): at once where no
 * burst of the draft is open or awaits its ack (`inFlight`), and not at all
 * where a key was taken before it (`keysTaken`). In a reading scene the
 * draft is the one the caret stands in where an editor pane holds it, else
 * the editor pane's whose text or corner the chord was made at, its corner
 * the pane's (SC's `siteOf`); nothing at any other pane, at the scene's acts,
 * or where the chord is made at no document.
 * @param {Ctx} ctx
 * @param {EventTarget | null} target the element the chord was made at
 */
function saveChord(ctx, target) {
  const c = LAYER.caret(), f = WALK.current();
  const addr = SCENE.isOpen() ? sceneDraft(ctx, target) : c ? c.addr : f && (f.kind === 'document' || f.kind === 'block' || f.kind === 'link') ? f.addr : null;
  if (!addr) return;
  if (!WRITE.inFlight(addr)) { saveAnswer(addr); return; }
  const pressed = keysTaken;
  WRITE.commit(addr);
  saving = WRITE.landed(addr).then(() => { if (keysTaken === pressed) saveAnswer(addr); });
}

/**
 * The draft a chord made in a reading scene acts on (`saveChord`): the page's
 * caret's, where an editor pane holds it (T-LAYER's `caretPane`); else the
 * draft of the editor pane whose text or corner the chord was made at (SC's
 * `siteOf`, `paneHolding`); null anywhere else.
 * @param {Ctx} ctx
 * @param {EventTarget | null} target
 * @returns {string | null}
 */
function sceneDraft(ctx, target) {
  const c = LAYER.caret();
  if (c && LAYER.caretPane()) return c.addr;
  const side = ctx.pane ?? (target ? SCENE.paneHolding(/** @type {Element} */ (target)) : null), p = side ? SCENE.siteOf(side) : null;
  return p && p.kind === 'editor' ? p.names : null;
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
 * reading scale (T-LAYER's `editable`, `inView`). In a reading scene, the
 * draft the caret stands in, live or kept, where an editor pane of the scene
 * holds it — the pane its text in view, whatever the camera's scale (T-LAYER's
 * `caretPane`). Null where neither stands.
 * @returns {string | null}
 */
function undoTarget() {
  const c = LAYER.caret();
  if (SCENE.isOpen()) return c && LAYER.caretPane() ? c.addr : null;
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
 * redo with nothing to put back is taken and says nothing. A step whose text
 * the page does not hold — a long draft held in part — moves nothing while
 * its text is read (W-MACHINE's `reach`): its line stands at the act's site,
 * "undoing — reading where that change was made" with the running mark,
 * placed and heard as a jump's reading face is (`undoSite`; O-FACES'
 * `undoReading`; FP-25), and goes as the read answers, the press then decided
 * as over held text. Meanwhile every key waits behind it and is made after
 * it in order (`hold`), Esc sets it aside — the keys behind it dropped, its
 * answer changing nothing (`setAside`) — and a pointer's or the camera's act
 * is kept (`pointed`): the step is then taken where it stands and said, the
 * caret, the selection, the walk and the view left as that act left them.
 * Where its read fails the step stays next, and the line says why at the
 * act's site, at every press — "not undone — ⟨board⟩ is not answering" and
 * that it is still next, at once with no read where the board already does
 * not answer (M-REC's `daemon`), else the refusal's own words (O-FACES'
 * `notUndone`; FP-34, FP-41); a redo's lines its own. In a reading scene the
 * press acts in the editor pane, which reads the same way, the scene
 * standing: the caret placed live where the step began in that pane, its
 * span focus following it (`follow`), and a face or a line standing at the
 * pane's corner's kept word (SC's `keptWordOf`).
 * @param {KeyboardEvent} e
 * @param {Ctx} ctx
 * @param {boolean} redo
 * @returns {Promise<void>}
 */
async function undoChord(e, ctx, redo) {
  const addr = undoTarget();
  if (!addr) { if (!redo) undoNone(e, ctx); return; }
  if (unwritableSays(addr, e, ctx)) return;
  const press = () => (redo ? MACHINE.redo(addr) : MACHINE.undo(addr));
  let out = press();
  /** @type {Undoing | null} the press's own read, where it reads */
  let mine = null;
  try {
    if (out.how === 'away') {
      if (REC.daemon() === 'unreachable') { FACES.notUndone(addr, undoSite(addr), null, redo); return; }
      const u = mine = undoing = begun(addr);
      FACES.undoReading(addr, undoSite(addr), redo);
      // its line stands until the outcome is known: the press met a step the page holds, or the read failed
      for (;;) {
        const r = await MACHINE.reach(addr, redo);
        if (u.aside) return;
        if (r.refused || WRITE.unwritable(addr)) {
          FACES.endUndoReading(addr);
          if (r.refused) FACES.notUndone(addr, undoSite(addr), r.refused, redo); else unwritableSays(addr, e, ctx);
          return;
        }
        out = press();
        if (out.how !== 'away') break;
      }
      FACES.endUndoReading(addr);
    }
    if (out.how === 'face') {
      const scene = SCENE.isOpen(), corner = scene ? null : LAYER.cornerOf(addr), word = scene ? SCENE.keptWordOf(addr) : corner ? /** @type {HTMLElement | null} */ (corner.querySelector('.kept-word')) : null;
      if (!FACES.unkept(addr, word, false)) FACES.answerAtFace(addr);
      return;
    }
    if (out.how === 'empty') { if (!redo) HINT.show('B3.undo.empty', null, { ...hinted(e, ctx), ending: UNDO_CONSTANT }); return; }
    // a pointer's or the camera's act made while the step's text was read is kept: the step taken where it stands, and said
    if (!(mine && mine.kept)) {
      if (SEL.selected()) SEL.clear();
      if (out.at != null) { LAYER.placeCaret(addr, out.at); await follow(); }
    }
    undoSaid(addr, out, redo);
  } finally {
    if (mine) {
      if (!mine.aside) FACES.endUndoReading(addr);
      mine.settle(!mine.aside);
      if (undoing === mine) undoing = null;
    }
  }
}

/**
 * An undo or a redo begun reading the text its step stands in (`Undoing`):
 * neither set aside nor kept, its outcome not yet known.
 * @param {string} addr the draft
 * @returns {Undoing}
 */
function begun(addr) {
  /** @type {(known: boolean) => void} */
  let settle = () => {};
  /** @type {Promise<boolean>} */
  const decided = new Promise((r) => { settle = r; });
  return { addr, aside: false, kept: false, decided, settle };
}

/**
 * Where the undo chord's lines stand — its act's site (FP-25): on the plane
 * beneath the character the draft's caret stands before, the draft the
 * anchor's sign, so the one line carries the line's words while the draft is
 * out of the visible view (O-HOST's `aside`); in a reading scene at the kept
 * word of the corner of the editor pane holding the draft (SC's
 * `keptWordOf`), where a face the chord answers stands, else beneath that
 * pane's text (T-LAYER's `caretPane`), else at the viewport's corner.
 * @param {string} addr the draft
 * @returns {import('../overlays/host.js').Anchor | null}
 */
function undoSite(addr) {
  if (SCENE.isOpen()) { const word = SCENE.keptWordOf(addr), pane = LAYER.caretPane(); return word ? { el: word } : pane ? { el: pane.article } : null; }
  const c = LAYER.caretSpan(addr);
  return { span: { addr, pos: c ? c.pos : 1, width: 1 }, sign: addr };
}

/**
 * A pointer's or the camera's act made (APP-INPUT's: every press, every
 * wheel): an undo or a redo reading the text its step stands in is kept —
 * its step taken where it stands once its read answers, and said, nothing
 * moved for it (`undoChord`). Nothing where none reads.
 */
export function pointed() { if (undoing && !undoing.aside) undoing.kept = true; }

/**
 * Esc at an undo or a redo reading the text its step stands in (`esc`): set
 * aside — its line taken down where it still stands (O-FACES'
 * `endUndoReading`), the keys held behind it dropped, its read's answer
 * changing nothing. False where none reads, or it stands aside already.
 * @returns {boolean}
 */
function setAside() {
  const u = undoing;
  if (!u || u.aside) return false;
  u.aside = true;
  FACES.endUndoReading(u.addr);
  u.settle(false);
  return true;
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
  const writing = writingElsewhere(SCENE.isOpen() ? keySite(ctx, e.target) : null);
  if (siteSays(e, ctx, { writing, ending: UNDO_CONSTANT, as: 'undo' })) return;
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
 * lands. A paste is held the same way, by its text (`pasteEvent`). A key an
 * undo or a redo reading the text its step stands in finds waits for its
 * outcome the same way, a navigation act among them (`navAct`), and is
 * dropped where Esc sets it aside (`Undoing.decided`).
 * @param {KeyboardEvent | null} e the key; null for a paste
 * @param {Ctx} ctx
 * @param {Held['paste']} [paste] the paste held in a key's place
 */
function hold(e, ctx, paste = null) {
  const out = reading, u = undoing && !undoing.aside ? undoing.decided : null;
  /** @type {Promise<boolean>} */
  const jump = u ? u.then((known) => (known ? GO.aground() : false)) : out ? out.then(() => GO.aground()) : GO.aground();
  held.push({ e, paste, ctx, jump });
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
      const at = whereNow({ ...k.ctx, landed: true }), pasted = k.paste;
      // a paste held with the keys is made where the focus is at the landing, the walk on its caret's span before the next is read
      const run = pasted ? async () => { pasteAt(pasted.text, pasted.entry, pasted.at, at); await clipping; return true; } : k.e ? navAct(chordOf(k.e), at.byKey) ?? route(k.e, chordOf(k.e), at) : null;
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
 * Select-all at a pane's text selects its text whole where the page selects
 * it there (`wholeAt`). A pane's corner is routed as a corner, never as its
 * pane (`cornerKey`): Enter and Space its act's, as the platform activates
 * it, else the platform's, ← and → along the line of its acts where it holds
 * any, and a printable key but Space answered by its pane's line — at an
 * editor pane's corner the way back to the text (`cornerSays`), at any
 * other's that pane's own (`paneSays`). At a live caret in an editor pane its
 * keys are the plane's caret's (`caretKey`), the paging keys moving the caret
 * with its pane (SC's `pageCaret`). Elsewhere ← closes the scene so (K-63).
 * On the scene's acts every other key is the button's own — Enter and Space
 * press it — and a printable key but Space is answered by the acts' own line
 * (`actsSays`). At a pane's text where no caret is live, the pane's moves
 * move its span focus or the pane (SC's `key`; K-60), Enter at an editor
 * pane's span places the caret there (SC's `enterSpan`; K-70), Shift with ←
 * or → at the span its kept caret stands in returns it and extends a
 * selection from it (`extendAtKept`), and a printable key is typed at the kept
 * caret's span, else answered by the pane's own line (`typeAt`), Space by K-9's.
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
  // select-all (K-93; B3-S8): an editor pane's text whole at its caret, a past state's read only
  if (chord === 'Mod+A') return wholeAt(ctx) ? async () => { e.preventDefault(); await selectWhole(ctx); return true; } : null;
  // a pane's corner: a corner's keys, never its pane's
  if (ctx.where === 'scene' && !ctx.pane) { const act = cornerKey(e, chord, ctx, true); if (act !== undefined) return act; }
  // the caret's keys at a live caret in an editor pane: the plane's, the paging keys moving it with its pane
  if (ctx.where === 'caret') {
    if (chord === 'PageDown' || chord === 'PageUp') return () => { e.preventDefault(); SCENE.pageCaret(chord === 'PageDown' ? 1 : -1); return true; };
    const act = caretKey(e, chord, ctx);
    if (act) return act;
  }
  if (chord === '←' && ctx.where !== 'caret') return () => { GO.closeScene(ctx.byKey); return true; };
  if (ctx.where === 'scene-acts') return printable(e) && e.key !== ' ' ? () => { actsSays(e, ctx); return true; } : null; // the button's own keys
  const side = ctx.pane;
  if (side && ctx.where === 'scene') {
    // the pane's own moves where no caret is live (K-60), the span focus with them
    if (PANE_MOVES.has(chord)) return () => { e.preventDefault(); SCENE.key(chord, side); return true; };
    if (chord === 'Enter' && draftSpan(ctx)) return () => { SCENE.enterSpan(side); return true; };
    const kept = chord === 'Shift+←' || chord === 'Shift+→' ? keptSpan(ctx) : null;
    if (kept) return async () => { await extendAtKept(e, arrowStep(e), kept.addr); return true; };
  }
  if (printable(e)) return async () => { await typeAt(e, ctx); return true; };
  return null;
}

/** a reading scene's pane's own moves where no caret is live (D5 K-60; SC's `key`) */
const PANE_MOVES = new Set(['↓', '↑', 'PageDown', 'PageUp', 'Home', 'End']);

/**
 * A printable key but Space at the scene's acts — the bar's buttons, a
 * stroke's, the stop, the list of a draft's past states (`Ctx.where`
 * `scene-acts`): answered, never by silence, by the acts' own line naming the
 * keys they take — Enter takes the act, Tab goes on to the panes — its hint
 * beside the act, ending with where the person was writing (`writingElsewhere`).
 * @param {KeyboardEvent} e
 * @param {Ctx} ctx
 */
function actsSays(e, ctx) {
  HINT.show('L.scene.acts.key', { 'act key': drawChord('Enter'), 'tab key': drawChord('Tab') }, { ...hinted(e, ctx), writing: writingElsewhere(null) });
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
 * @param {Pressed} e the key, or a copy, a paste or a cut event
 * @param {Ctx} ctx
 * @param {EventTarget | null} [target] the element it was pressed at: the event's target where none is given
 * @returns {{repeat: boolean, at: Element | null}}
 */
function hinted(e, ctx, target = e.target) {
  const at = /** @type {Element | null} */ (ctx.where === 'plane' || (ctx.where === 'caret' && !ctx.pane) ? null : target);
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
 * A paste event at the page (see the head; D5 K-93; B3-S5), a key's or a
 * menu's: off the plane — and in a reading scene off a pane's text, at its
 * corners and its acts — left to the platform, untouched. On the plane, and
 * at a pane's text, its plain text and skep's own entry (M-PASSAGE's
 * `TYPE`) are read from the event's own clipboard while it is dispatched,
 * before anything waits, and the paste is made where the focus is
 * (`pasteAt`) — at an editor pane's caret as at the plane's, and at any
 * other pane answered by its own line (`paneSays`) — held with the keys,
 * both flavors with it, while a jump is in the air or a paste's source is
 * being read, the platform's paste prevented (`hold`). No other clipboard is
 * read.
 * @param {Clip} e
 * @param {Ctx} ctx where the focus is, as the app read it
 * @returns {boolean} whether the page took the paste, the platform's prevented; false where it is left to the platform
 */
export function pasteEvent(e, ctx) {
  if (ctx.where !== (SCENE.isOpen() ? 'scene' : 'plane')) return false;
  ctx = whereNow(ctx);
  if (SCENE.isOpen() && !ctx.pane) return false;
  const text = e.clipboardData ? e.clipboardData.getData('text/plain') : '', entry = e.clipboardData ? e.clipboardData.getData(PASSAGE.TYPE) : '', at = { target: e.target };
  if (waiting()) { e.preventDefault(); hold(null, ctx, { text, entry, at }); return true; }
  const took = pasteAt(text, entry, at, ctx);
  if (took) e.preventDefault();
  return took;
}

/**
 * A paste made where the focus is (`pasteEvent`; D5 K-93; D6 BM-52; B3-S5):
 * at a live caret, and at the span a kept caret stands in — the caret
 * returned first — made by its two flavors at the caret as one step of its
 * own, a selection drawn in the caret's text replaced (T-LAYER's
 * `caretPaste`): its plain text as new bytes, or the same words by their
 * identity; then the selection ended (O-SELECTION's `clear`), the walk on the
 * caret's span and the moved verdict's line said where the draft owes it
 * (`clipping`). A paste whose source is read by identity first holds every
 * key until it is placed or told (`reading`). Where it is told — words that
 * do not match the passage its entry names, placed as new bytes; nothing
 * placed, the source refused or not read — its face stands where it was made
 * (`told`). The clipboard holding no text, or more than one paste places, is
 * answered by its own line at the focus, nothing placed; a draft that cannot
 * be written by its reason's line, no caret returned. At a span of a draft
 * holding no caret the draft's line names the key that places one; at the
 * walk's span in text the person may not edit, its document's line, nothing
 * placed and nothing sent — at an edition of the person's own C-45 with its
 * staging act, and C-241's statement where skep's own entry names a draft of
 * the person's own (`siteSays`, `draftCopied`; B3-S5).
 * @param {string} text the clipboard's plain text, as its event carried it
 * @param {string} entry skep's own entry, as its event carried it: '' where it carried none
 * @param {Pressed} e what its line is told of the event
 * @param {Ctx} ctx where the focus is now (`whereNow`)
 * @returns {boolean} whether the page answered the paste; false where no site of the page's takes it
 */
function pasteAt(text, entry, e, ctx) {
  const live = ctx.where === 'caret' ? LAYER.caret() : null, kept = live ? null : keptSpan(ctx), addr = live ? live.addr : kept ? kept.addr : null;
  if (addr) {
    if (unwritableSays(addr, e, ctx)) return true;
    if (kept) LAYER.returnCaret(false, kept.addr);
    const over = selectedAtCaret(), out = LAYER.caretPaste(text, over, entry);
    /** what the paste did, answered: the walk following what it placed, its face where it is told, its line where nothing was placed for its size or its emptiness */
    const answer = (/** @type {import('../text/layer.js').Pasted | false} */ r) => {
      const told = r && typeof r === 'object' ? r : null;
      if (r === 'placed' || r === 'same' || (told && told.told === 'differs')) { if (over) SEL.clear(); clipping = followed(addr, e, ctx); }
      if (told) DELETION.pasted(addr, told.site, FACES.pasteWords(told.name, told.doc));
      else if (r === 'none') HINT.show('L.paste.none', null, hinted(e, ctx));
      else if (r === 'large') HINT.show('L.paste.large', { size: megabytes(byteLength(LAYER.pasteText(text))), limit: megabytes(WRITE.PASTE_MAX_BYTES) }, hinted(e, ctx));
    };
    if (!(out instanceof Promise)) { answer(out); return true; }
    const settled = out.then(answer).finally(() => { if (reading === settled) reading = null; });
    reading = settled;
    // the door waits for the paste to be placed or told, then for the walk to follow what it placed
    /** @type {Promise<void>} */
    const chained = settled.then(() => (clipping === chained ? undefined : clipping));
    clipping = chained;
    return true;
  }
  if (bareDraftSpan(ctx)) { HINT.show('B3.caret.enter.paste', actKey(), hinted(e, ctx)); return true; }
  return siteSays(e, ctx, { entry });
}

/**
 * A paste of the same words the board refused for its source after the act
 * (W-WRITE's `onUnplaced`; B3-S5; the paste survey's W3): nothing placed —
 * the machine took its words back out — and its face standing where the
 * paste was made (O-DELETION's `pasted`), in the words the source's refusal
 * takes (O-FACES's `pasteWords`).
 * @param {string} addr the draft
 * @param {import('../write/write.js').Unplaced} why
 */
function unplaced(addr, why) {
  if (why.site) DELETION.pasted(addr, why.site, FACES.pasteWords(why.name, why.origin));
}
WRITE.onUnplaced(unplaced);

/** a paste or a cut made at the caret, followed: the walk stood on the span the caret is in (N-WALK's `followCaret`) — an editor pane's span focus in a reading scene (`follow`) — then the moved verdict's line where the draft owes its first edit one, beside the focus it was made at (`movedSays`) */
async function followed(/** @type {string} */ addr, /** @type {Pressed} */ e, /** @type {Ctx} */ ctx) {
  await follow();
  movedSays(addr, e, ctx);
}

/**
 * A cut event at the page (see the head; D5 K-93; B3-S5 (iv); D6 BM-52), a
 * key's or a menu's: off the plane, or under the scene, left to the
 * platform, untouched. At a live caret, and at the span a kept caret stands
 * in — the caret returned first — the selection drawn in the caret's text is
 * cut: the clipboard written as a copy of it writes it, its bytes taken out
 * as one step of its own (T-LAYER's `caretCut`), the selection ended
 * (O-SELECTION's `clear`) and the walk then on the caret's span (`clipping`).
 * With nothing selected there, the clipboard is left as it is and the copy's
 * nothing-selected line is the hint; where the clipboard could not take the
 * selection whole, a line says so and nothing is removed; a draft that
 * cannot be written is answered by its reason's line, no caret returned. At
 * a span of a draft holding no caret the draft's line answers it. While a
 * jump is in the air the cut is prevented and dropped: it writes the
 * clipboard only inside its event. Anywhere else on the plane it is the
 * platform's. In a reading scene, at an editor pane's text as on the plane —
 * its caret's, its kept caret's span's, its other spans' — and anywhere else
 * in the scene the platform's.
 * @param {Clip} e
 * @param {Ctx} ctx where the focus is, as the app read it
 * @returns {boolean} whether the page took the cut, the platform's prevented; false where it is left to the platform
 */
export function cutEvent(e, ctx) {
  if (ctx.where !== (SCENE.isOpen() ? 'scene' : 'plane')) return false;
  ctx = whereNow(ctx);
  if (waiting()) { e.preventDefault(); return true; }
  const live = ctx.where === 'caret' ? LAYER.caret() : null, kept = live ? null : keptSpan(ctx), addr = live ? live.addr : kept ? kept.addr : null;
  if (!addr && !bareDraftSpan(ctx)) return false;
  e.preventDefault();
  if (!addr) { HINT.show('B3.caret.cut', actKey(), hinted(e, ctx)); return true; }
  if (unwritableSays(addr, e, ctx)) return true;
  if (kept) LAYER.returnCaret(false, kept.addr);
  const over = selectedAtCaret(), b = REC.board();
  if (!over) { HINT.show('L.copy.nothing', null, hinted(e, ctx)); return true; }
  if (LAYER.caretCut(e, over, b ? b.origin : '') === 'cut') { SEL.clear(); clipping = followed(addr, e, ctx); }
  else HINT.show('L.cut.uncopied', null, hinted(e, ctx));
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
 * it — its own toolbar, each line of a corner one, never across lines (T-LAYER's
 * `setStops`, `lineActs`) — staying at its ends. On the plane a printable key but Space at
 * a corner of a draft the person may edit is answered by the way back to its
 * text (`cornerSays`); at a reading scene's pane's corner, by the pane's test
 * and never the address the corner names (SC's `siteOf`): at an editor
 * pane's the way back to its text, at any other's that pane's own line
 * (`paneSays`). A key made at a landing with a corner its context is
 * dropped: no act of a corner is made there (FP-25).
 * @param {KeyboardEvent} e
 * @param {string} chord
 * @param {Ctx} ctx
 * @param {boolean} [pane] the corner is a reading scene's pane's: its pane answers a printable key there
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
    const acts = on ? LAYER.lineActs(on) : [], i = on ? acts.indexOf(on) : -1;
    if (i < 0) return undefined;
    const to = acts[Math.max(0, Math.min(acts.length - 1, i + (chord === '→' ? 1 : -1)))];
    return () => { e.preventDefault(); if (to !== on) FOCUS.land(to); return true; };
  }
  const addr = corner.dataset.corner || '';
  // a reading scene's pane's corner: its pane's test, never its address's — a past state's corner names the draft's address too
  if (pane) {
    const side = printable(e) ? SCENE.paneHolding(corner) : null, p = side ? SCENE.siteOf(side) : null;
    if (!p) return undefined;
    if (p.kind === 'editor') return () => { cornerSays(e, ctx, p.names); return true; };
    return () => { paneSays(e, { ...ctx, pane: p.side }, { writing: writingElsewhere(keySite(ctx, corner)) }); return true; };
  }
  if (printable(e) && LAYER.editable(addr)) return () => { cornerSays(e, ctx, addr); return true; };
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
  const c = LAYER.caret(), pane = LAYER.caretPane();
  // in a reading scene's editor pane, the platform's selection standing in the pane's text
  if (pane) { const p = LAYER.selectionIn(pane.article); return p && c && p.span.addr === c.addr ? p.span : null; }
  const s = SEL.selected();
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
 * reaching face among them, whose dismissal abandons the jump, and the undo
 * chord's reading line, which a key's Esc takes down by setting its undo
 * aside (`setAside`) — then an undo reading whose line another overlay took
 * the place of, set aside, a key's Esc alone, then a jump
 * reaching whose face another overlay took the place of (FP-25; N-GO's
 * `abandon`), the find — its current match left selected, the focus on it
 * (N-FIND's `close`; FP-20) — in the scene the selection standing in the
 * text of the pane the focus is at, then a live caret standing in an editor
 * pane — the text left, the caret kept and its span the pane's focus
 * (`paneEsc`; K-77, K-61) — then the scene — its close a Back from its entry
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
  // an undo reading the text its step stands in, its line the innermost thing: a key's Esc sets it aside, the pointer's leaves it reading
  const u = undoing;
  if (!pointer && u && !u.aside && FACES.undoReadingInnermost(u.addr)) { setAside(); return; }
  if (HOST.current() && !(landed && HOST.typing() && !HOST.notice())) { HOST.dismissInnermost(); return; }
  if (!pointer && setAside()) return;
  if (GO.abandon()) return;
  if (FIND.isOpen() && !landed) { void FIND.close(); return; }
  if (SCENE.isOpen()) { if (!paneEsc()) GO.closeScene(!pointer); return; }
  if (SEL.selected()) { SEL.clear(); return; }
  if (WALK.leaveText() || pointer) return;
  GO.endArrival();
}

/**
 * Esc's steps inside a reading scene before its close (see `esc`; D5 K-77,
 * K-61, K-63): the selection standing in the text of the pane the focus is at
 * ended (SC's `unselect`); else a live caret standing in an editor pane left
 * — kept where it stood, its burst committed, its span the pane's focus, so
 * Tab then moves on round the ring (T-LAYER's `leaveCaret`; SC's
 * `followCaret`). False where neither stands: the scene closes.
 * @returns {boolean} a step was taken
 */
function paneEsc() {
  const side = SCENE.textPane(), c = LAYER.caret();
  if (side && SCENE.unselect(side)) return true;
  if (!c || !c.live || !LAYER.caretPane()) return false;
  LAYER.leaveCaret('esc');
  SCENE.followCaret();
  return true;
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
