// O-SELECTION — the selection and its acts in fixed slots (the structure
// record §3.2; foundations §3.1; D5 §1.6). Layer 2. ENGINE-BOUND. State
// (FP-10): the plane's selection, how Shift with ← or → moves its ends
// (`ends`), its bytes and the text it stands in, which it follows its words
// by as that text is set again (`stood`, `carry`), whether it is being
// followed (`following`), and the latest act of a slot that sends
// (`sending`); each reading scene's pane's selection (`paneSel`), the last
// pane the platform's focus stood in (`lastPane`), whether a press stands on
// a pane's text and on which (`pressed`), the pane a click on whose text was
// just released (`clicked`), the pane whose range is owed while a field
// holds the focus (`owed`), and what the page last drew the selections the
// platform does not hold from (`drawnKey`); T-LAYER reads the plane's
// selection through the reader handed in, and the scene's panes are read
// through the readers the app hands in (SC's: `readers`).
// Every selection belongs to one SITE (`Site`): a place showing one
// arrangement of a document's words — the plane, or a reading scene's pane,
// by its side, showing a document, a draft's past state or held text — and
// each site holds a selection of its own, in the positions of the text it
// shows, read by naming its site (`selected`, `backward`); a read naming none
// gets the focused site's (`focusedSite`): the plane where no scene stands;
// while one stands, the pane whose text, corner or list of past states holds
// the platform's focus, else the site the acts row or the "which" list
// holding the focus stands at (`rowSite`), else, while the focus stands at
// the scene's acts, the one line or another overlay, the last such pane —
// pane B until one has held it, where a scene puts the focus.
// The focused site's selection is the platform's live one; every other
// stands, the page drawing it as the platform draws an inactive selection
// (`drawPanes`, `selections`): a custom highlight over the ranges its own
// characters stand in, the chrome left out as the platform's selection
// leaves it (T-LAYER's `textRangesIn`; FP-24), else, where the platform has
// none, SC's boxes. As the focus moves the live one follows it, both ways
// (`focusIn`, `drawPanes`): the focused pane's selection placed in its
// article wherever the platform holds none, or holds one in another site —
// never over a selection the person holds outside the sites, an overlay's
// text or a field's, nor while a press stands on a pane's text or a field
// holds the focus (FP-20), owed until then — and, where the focused pane
// holds none, a range standing in the other pane's text taken off. The
// focused pane's selection is the platform's range: read first wherever it
// is read (`paneNow`) — with extent in its text it is that pane's selection,
// collapsed there it ends, standing anywhere else, or nowhere, the pane's
// stands, as no move of the focus or a selection made in another pane ends
// it. A drag or the platform's own keys in a pane's text make that pane's
// selection (`takePane`, APP-INPUT's): a press on a pane's text holds every
// take until its release (`pressPane`), which takes the pane's selection
// once, its blocks marked in place (T-LAYER's `markPaneSelection`) and where
// it stands said once — a release leaving the platform no selection with
// extent ending the pressed pane's, as a click there does, and the click on
// its text read again once the platform has settled it (`clickedIn`; FP-24)
// — never the plane's acts, its walk or its caret. SC
// sets a pane's selection by its own acts (`setPane`, `clear`), hands it each
// setting of its pane to follow (`followPane`, below), and as a pane closes or
// stands anew its selection ends with it (`endPanes`). A pane's selection has the acts of the plane's, on
// its own words: the focused site holds the one acts row (`render` at its
// site) — drawn at a take that says the selection and at the page's own act
// that selects there (`holdPane`, `select`, `setPane` as an act, K-8 and
// Shift with ← or → at a pane's span focus: `selectFocused`,
// `extendFromFocus`), moved to the pane the focus comes into where that pane
// holds a selection and nothing else stands, taken down, ending nothing,
// where it holds none or its selection ends (`focusIn`, `rowOff`), and never
// drawn by a reader's read; the focus on the row counts as the focus on its
// site (`focusedSite`), and its dismissal ends that site's selection, as the
// plane's card's does. A slot at a pane acts on the pane's selection, else on
// the span its span focus stands on, whole, in the pane's own record
// (`actedOn`), never the plane's text: its links are those the pane's
// article draws (LK's `shownAt` over the pane's marks), its sources read over
// its record, O-PROV asks over the pane's text — a past state's as of the
// position it stands at, the held version's words not on the board answered
// by the page — the links card lists the pane's marks, follow's faces stand
// at the pane, a carry names its bytes by identity through the pane's image
// (N-GO's `Carry.ids`), and read side by side opens the pane's record with
// the selection carried into it (FP-10, FP-41). The slots that send give
// their reason at a pane at once, the held version's where it holds one
// (`Readers.heldReason`). The rest of this head is the plane's selection.
// The selection is the span (R11; foundations §3.1): a byte range of one
// document, `{addr, pos, width}` in V-positions of the text the page shows of
// it (T-LAYER's `shownOf`) — a draft's with its page-local edits applied —
// whoever makes it, made in one continuous gesture — a drag over the mounted
// text at reading scale (§2.4), read back from the platform's own selection
// through T-LAYER's mapping as the drag ends and as it changes — or by a key:
// a click on a block and Enter at the focused span select the block of the
// text shown whole (`wholeShown`); off a live caret, K-8's Shift+↓ / Shift+↑
// select the walk's focused span whole, a block of the text shown (T-LAYER's
// `blockByPos`), and then extend it by a span of that text each press;
// at a live caret, Shift with each arrow, Home or End moves the caret a step
// and the selection runs from its anchor to the caret (`extendFromCaret`; D5
// K-71, §1.6), as Shift with ← or → does at the span a kept caret stands in
// once N-KEYS' returns the caret (K-70, K-77), and at any other span of a
// draft the person may edit once the caret is placed live where the step
// extends from: the moving end of the selection standing in the walk's
// document, else the span's edge, its start for → and the end of its text
// for ← (`extendFromSpan`; K-70; FP-40); at the walk's focused span in
// text the person may not edit, Shift with ← or → moves the selection's
// moving end a character or a word, its anchor standing — the selection
// standing in the walk's document, or one the platform made wherever it
// stands — else selects one character or word from that edge
// (`extendFromFocus`; D5 K-70) — each
// press naming the end it moved, which T-LAYER keeps clear of its document's
// head. A Shift+click in a draft the person may edit extends from the anchor
// standing there (`anchorIn`; APP-INPUT's). A selection put in another
// document than a live caret's — by the pointer, a key or the gate's door;
// one the platform made by the document its moving end lies in (T-LAYER's
// `movingPart`) — keeps the caret first, where it stood,
// owing the frame nothing (T-LAYER's `leaveCaret`), and stands the walk on
// the span its moving end is in, aimed at there (N-WALK's `focusTo`), so the
// next key acts at the selection and never types at the caret (`leaveFor`).
// One the platform made reaching past its document into another's text
// is so marked (`Ends.across`): no key at a caret replaces it (N-KEYS').
// The platform's
// highlight is the selection's one mark (§2.1), and the selection the
// platform's own (foundations §2.1; D5 §2): a change of it rebuilds no
// article — T-LAYER marks the blocks it touches in place — so a selection the
// person made stands as they left it, its anchor where they set it, for the
// platform's own keys to extend where neither a live caret, the kept caret's
// span nor the walk's span in text the person may not edit takes them (D5
// K-71); T-LAYER places it over a span
// the page selects and puts it back, its anchor at the same end, after a
// remount — never over a selection the person holds outside the plane's
// text, in a reading scene's pane or an overlay's text, which stands as they
// made it. The acts take the span exactly: "who wrote this?" and "who uses
// this?" ask over its bytes (O-PROV's; a span of the text shown, the board
// asked only about bytes it holds). "follow" and "read side by side" go where
// the span's words lead (`targetsAt`; D5 K-51, K-52): follow's targets are
// each link drawn at the span (LK's `shownAt`), then each source of the runs
// of other documents' material the span meets, once, in reading order
// (T-ARTICLE's `sourcesIn`) — a withheld run's among them, the document's own
// words adding none; read side by side's are the links drawn there alone. At
// one target the act goes there, the slot naming it before anything moves
// (`targetLabel`) — a link's far document, a source's origin, a withheld
// source's "withheld · ⟨owner⟩" — and at two or more it asks which
// (`which_`): the links' rows first, then a row per source naming the words
// of the span its runs hold and its origin as the column's edge names it
// (`sourceRowHTML`). Read side by side opens the scene as a step on the
// trail from the link's end chosen (N-GO's `toScene`) on what the page shows
// of the span's document (T-LAYER's `paneSource`), beside the document LK
// names for it (`besideAt`) — where its far end names its document whole,
// that whole document, nothing of it set level with the selection (SC's
// `Held.wholeB`; FP-30). Follow to a source is a LEAP that is follow's (N-GO's
// `leapTo`'s `source`) carrying that source's words alone — the span's
// positions its runs hold, joined (N-GO's `Carry.parts`; foundations §2.3) —
// named as what the reader selected where the span is the selection, made at
// the span (`toSource`); a source withheld from the reader it reaches at its
// own withheld words, as a follow's withheld far end is (N-GO's). Where a
// slot's words lead nowhere it is inert, kept focusable as an inert slot is
// and giving its reason as one does (P47; `reasonAt`) — over a span wholly of
// bytes the page made, that nothing links to new words (`NEW_WORDS`); over
// any other, that no link is drawn there (`NO_LINK`).
// Every address the card and the list set in the identifier's face (P-REG's
// FACE). The slots, in this
// order and never moved: annotate · quote · who wrote this? · who uses this?
// · see the links · follow · read side by side · link to… — each showing its
// chord (D5-F8), named by its words and its target's alone, exposing its
// chord as its keys (`aria-keyshortcuts`), an inert slot described by its
// reason — each rendered for the ear by S22's table (ST's `heard`; patterns
// K1, K3), a draft's name in a reason kept as written; each row of the
// "which" list named so by the words it draws, the link's symbol out of the
// name. Annotate, quote and "link to…" send a name for characters to
// the board, so each takes effect only once the board holds them (`send`;
// foundations §3.1's row rule): while a burst of the draft is in flight the
// act asks for its commit and waits for its ack, nothing shown and no focus
// moved; while the draft holds a line the board has not kept the slot stands
// inert with the row rule's reason, keyed on what ends the state
// (`heldReason`); and what then opens is the slot's own surface — its place in
// the acts card with its own reason (`INERT_REASON`), no lane having built
// one: an inert slot keeps its place and gives its reason when activated —
// pressed (`inertAct`), or by its chord, which draws the card at the span the
// slots act on with the reason given (`inertChord`) — at the slot and through
// the one status region, where it is said at every press (`sayReason`; P47;
// the focus record's rule 14). Every other slot
// reads, and answers at once, in flight and under a hold alike: it acts on the
// selection, else on the walk's focused span whole (D5 §1.6) — a block of the
// text shown, at a live caret the block the caret is in; off a span it acts only where the walk's
// element names what it acts on — follow and read side by side the link
// whose stop the walk stands on, at that end's own bytes (K-51, K-52; D5 §4
// rule 6), "see the links" the document the walk stands in, at its own stop
// or a link's in it (K-49) — and anywhere else it acts on nothing and tells
// its caller so (`act`), the caller giving the slot's reason where the focus
// is (D5 §1.6). Follow or read side by side made at a span where it is inert
// — pressed, or by its chord — gives its reason as an inert slot does: at
// the slot, in the card drawn at the span, and through the one status region
// (FP-34). The
// selection is the one the screen draws, and nothing else
// (FP-10): an act made at the walk's focused span selects nothing
// (`actedOn`); the surface it opens holds that span for as long as it stands
// — the acts card and the "which" list by its bytes (`About.at`), their slots
// and rows acting there, O-PROV's card as the span it asks over, never named
// the selection's — and no key reads it. The selection's acts never take the
// focus, however the selection was made (D5 §4 rule 4; rule 15): K-8 selects
// and extends from the walk's element and leaves the focus there; the card is
// reached by its chords or by Tab, and each act's card takes the focus as the
// act was made — a chord or Enter on the slot, never a click (rule 16). A
// selection made is said through the status region (D4). The acts card and
// the "which" list the selection's own — those holding no span of their own
// (`About.at`) — end with it at its site (`ownAt`); an act's card taking the acts'
// place is a replacement, not a dismissal, and the selection stands under it.
// The focus and the mirror stay at block grain (D5-F11).
// A text set again under a selection (Q2; FP-21, FP-36): wherever the text a
// site shows is set again under its selection, the selection meets it in one
// place (`followWords`): its bytes by identity placed in that text by FP-21's
// rule (`placing`) — where they stand in one piece, all of them or the part
// that stands (BM-HELD's `onePiece`), it moves there, kept whole or shrunk,
// its own card or "which" list drawn again over it; in pieces, none, or
// couldn't tell — its bytes not named over a text that moved, or the text's
// read refused — it ends in that frame, its own card and list with it, no
// act on the chrome; a text still being read is waited for, never ended. The
// status region says either change once (`changeWords`): a whole move where
// it stands, as a selection made is said; a shrunk one in FP-21's words; an
// end, that it ended and why — each naming the text the site shows, a pane's
// by its own words (`PaneAt.where`); a move that leaves it where it stood
// says nothing. The plane's follows the text shown of its document wherever
// that text is set again — the person's edits, a read again, a change of the
// page's class — while its box shows that text (`carry`); N-GO's re-check
// across a version and a version move's landing hand it the text the box
// shows then. A pane's follows each setting of its pane, SC handing it the
// selection as it stood (`followPane`); one taken down to its cover is kept
// by SC by its bytes for the read that sets it again. A change of the page's
// class takes the acts row down ending nothing (`classChanged`), so the
// selection follows as its text is read at the new class.
// The selection is a surface of its place (FP-36): leaving the place ends
// it (N-GO's departure, `clear`), which keeps it by its bytes' identity
// (`asLeft`), its card and the "which" list by what they are about (O-HOST's
// `about`); the return puts it back over the bytes it holds in the text then
// (`restore`) — the card where it stood, the list over its targets counted
// again — each taking the focus on the control it was left holding it on. A
// card or a list holding a span stands on that span alone: a return, or its
// box's taking another version, reopens it over the bytes that text holds of
// it, nothing selected (`reopen`). A version move leaves no place: the
// selection stands beside it, and once its box shows another version it
// follows its words into that version (above; N-GO's `surfacesAcross`; FP-22).
// Rules: FP-1, FP-2, FP-7, FP-9, FP-10, FP-12, FP-13, FP-20, FP-21, FP-22,
// FP-24, FP-34, FP-36, FP-37, FP-40, FP-41.

import * as HOST from './host.js';
import * as REC from '../model/records.js';
import * as WRITE from '../write/write.js';
import * as LAYER from '../text/layer.js';
import * as LK from '../links/links.js';
import * as GO from '../nav/go.js';
import * as PROV from './provenance.js';
import * as LINKS from './links-card.js';
import * as WALK from '../nav/walk.js';
import * as FOCUS from '../nav/focus.js';
import * as HELD from '../beams/held.js';
import { extended, sameSpan, spanOfBlock } from '../text/span.js';
import { sourcesIn } from '../text/article.js';
import { boundaries, wordStop } from '../model/derive.js';
import { t, tHTML, tRuns, typeName, facedHTML, withheldLine, heard, sentence, sentences, fields } from '../strings.js';
import { esc, fill, byteLength } from '../util.js';
import { markDirty } from '../plane/camera.js';
import { drawChord, keyShortcut } from '../nav/keys.js';

/** @typedef {import('../text/span.js').Span} Span */
/** @typedef {import('../links/links.js').Shown} Shown */
/** @typedef {import('../text/article.js').Source} Source */
/** @typedef {import('../model/records.js').ISpan} ISpan */
/** @typedef {import('../text/layer.js').SelectionEnd} SelectionEnd */

/** @typedef {{kind: 'selection', at?: Left, site?: Side} | {kind: 'which', what: 'follow' | 'scene', at?: Left, site?: Side}} About what the acts card and the "which" list are about (O-HOST's): the selection, which a departure keeps by its bytes (`asLeft`); else the span a slot's act was made over, which the card or the list holds alone (`at`; see the head); `site` the reading scene's pane it stands at, none on the plane — a pane's surfaces are the scene's, which N-GO keeps no place of */

/**
 * @typedef {Object} Left — a span by its bytes (see the head): the selection as the reader leaves its place (`asLeft`), or the span a card or a list holds (`About.at`)
 * @property {string} addr the document it stood in: the version its box showed
 * @property {number} pos its first position there
 * @property {number} width its positions
 * @property {ISpan[]} ids its bytes by identity (T-LAYER's `shownIdentity`), which a return places in the text then; none where the text shown holds no identity for them
 */

/**
 * @typedef {Object} Ends — how Shift with ← or → moves the selection's ends (`extendFromFocus`; D5 K-70), and how far the platform's range reaches
 * @property {'start' | 'end'} moves the end a press moves, the other the anchor: the end the act that made the selection moved — the platform's focus point where the platform made it — else its end, T-LAYER placing its anchor at its start
 * @property {boolean} platform the platform made the selection — a drag, or its own keys — and the presses since moved it: it extends where it stands, wherever the walk stands
 * @property {boolean} across the platform's range reaches past the selection's document into another document's text (T-LAYER's `movingPart`): no key at a caret replaces it (`reachesPast`)
 */

/** a selection anchored at its start, as T-LAYER places a span the page selects: a press moves its end */
const AT_START = /** @type {Ends} */ (Object.freeze({ moves: 'end', platform: false, across: false }));

/** the byte at a span's moving end: its first where its start moves, else its last — the one the walk stands on */
const movingByte = (/** @type {Span} */ span, /** @type {boolean} */ start) => (start ? span.pos : span.pos + Math.max(1, span.width) - 1);

/** @type {Span | null} */
let sel = null;
/** @type {Ends} how Shift with ← or → moves the selection's ends while it stands, set with it (`hold`) */
let ends = AT_START;

/** @typedef {import('../model/records.js').Doc} Doc */
/** @typedef {Pick<Doc, 'runs' | 'image' | 'blocks'>} Text a text as a site took it: its runs, its image and its blocks, each the array its record held — M-REC replaces a record's arrays and never edits them, so a text set again holds new ones */

/**
 * @typedef {Object} Stood — the plane's selection's words as they stand (`hold`, `carry`)
 * @property {ISpan[]} ids its bytes by identity in `text` (T-LAYER's `shownIdentity`); none where that text's image did not name them
 * @property {Text | null} text the text shown of its document it stands in, as it was taken; null where the model held no record of it
 * @property {{d: Doc, rev: number} | null} seen the record it last waited on as still being read (`placing`), at its revision then (M-REC's `Doc.rev`): looked at again only once it or its revision moved
 */

/** @type {Stood | null} */
let stood = null;

/** @type {boolean} the plane's selection is being followed into a text set again under it (`carry`): a read of it meanwhile follows nothing */
let following = false;

/** the selection set, and how its ends move: the one place either is written, its bytes and the text it stands in read with it */
function hold(/** @type {Span | null} */ span, /** @type {Ends} */ how = AT_START) {
  sel = span; ends = how;
  stood = span ? { ids: LAYER.shownIdentity(span.addr, span.pos, span.width), text: REC.has(span.addr) ? textIn(LAYER.shownOf(span.addr)) : null, seen: null } : null;
}

/** a record's text as a site took it (`Text`) */
const textIn = (/** @type {Text} */ d) => ({ runs: d.runs, image: d.image, blocks: d.blocks });
/** do two texts hold one text as the page took it: the same runs, image and blocks */
const sameText = (/** @type {Text} */ x, /** @type {Text} */ y) => x.runs === y.runs && x.image === y.image && x.blocks === y.blocks;
/** do two texts' runs stand in the same places, each of the same kind and words — the text unmoved, whatever its image names */
const sameRuns = (/** @type {Doc['runs']} */ a, /** @type {Doc['runs']} */ b) => a === b || (a.length === b.length && a.every((r, i) => r.pos === b[i].pos && r.width === b[i].width && r.kind === b[i].kind && r.text === b[i].text));
/** does a text show withheld text, under which the rest of a passage may stand */
const showsWithheld = (/** @type {Text} */ d) => d.blocks.some((b) => b.kind === 'withheld');

/**
 * The plane's selection following its words as the text shown of its
 * document is set again under it (see the head; Q2) — the person's edits, a
 * read again, a change of the page's class: where that text is other than
 * the one it stands in, or its read was refused, and its box shows that text
 * (N-GO's `shownIn`), its words placed there by FP-21's rule (`placing`) and
 * the selection moved or ended (`followWords`), said once through the status
 * region. A text still being read is waited for, looked at again once its
 * record moves; a move that would draw its own card or list again while a
 * card the reader asked for still reads, which that would end (O-HOST's
 * `pending`), waits for that card. Where its box shows another version,
 * N-GO's re-check follows it. A read of the selection while it is being
 * followed — a card's dismissal, a focus move — reads it as it stands, so it
 * is followed, and said, once (`following`).
 */
function carry() {
  if (following || !sel || !stood || !REC.has(sel.addr) || GO.shownIn(sel.addr) !== sel.addr) return;
  const now = LAYER.shownOf(sel.addr);
  if (!now.refused && stood.text && sameText(now, stood.text)) return;
  if (stood.seen && stood.seen.d === now && stood.seen.rev === now.rev) return;
  const f = placing(sel, stood.ids, stood.text, now);
  if (f.state === 'wait') { stood.seen = { d: now, rev: now.rev }; return; }
  if (f.state === 'one' && (f.pos !== sel.pos || f.width !== sel.width) && ownAt('plane') && HOST.pending()) return;
  following = true;
  try {
    const said = followWords('plane', f, { was: sel, text: now, addr: sel.addr, where: HELD.whereOf(sel.addr) });
    if (said) FOCUS.say(said);
  } finally { following = false; }
}

/**
 * @typedef {{state: 'wait'} | {state: 'one', pos: number, width: number, all: boolean} | {state: 'ended', why: 'pieces' | 'none' | 'unknown', met: import('../beams/held.js').Met | null}} Placing — where a selection's words stand in a text set again under it (`placing`): `wait` the text still being read; `one` all of them, or the part that stands, in one stretch of it — that stretch's first position and positions, and whether it holds every one; `ended` in pieces, none of them, or couldn't tell, with the refusal met where one was
 */

/**
 * Where a selection's words stand in a text set again under it, by FP-21's
 * rule (see the head; Q2): its bytes by identity placed in the text's image
 * as stretches, each cut where its bytes break the selection's order
 * (BM-HELD's `stretchesOf`), and one piece where a stretch holds every byte
 * any of them holds — all of them, else the part that stands (BM-HELD's
 * `onePiece`); else pieces, or none. Couldn't tell where the text's read was
 * refused, or its bytes were not named and the text moved; bytes not named
 * over a text whose runs stand unmoved stand where they stood. An empty text
 * holds none of them. The text still being read waits: none of it delivered,
 * or an image placing less than all of it where no stretch holds all of the
 * words — a read must bring the rest first.
 * @param {{pos: number, width: number}} span where the selection stood
 * @param {ISpan[]} ids its bytes by identity in the text it stood in, in its order; none where that text's image did not name them
 * @param {Text | null} was the text it stood in, where known
 * @param {Doc} now the record the site shows now
 * @returns {Placing}
 */
export function placing(span, ids, was, now) {
  if (now.refused) return { state: 'ended', why: 'unknown', met: { kind: 'refused', name: now.refused === 'unregistered' ? 'doc_not_registered' : now.refused } };
  if (now.extent === 0) return { state: 'ended', why: 'none', met: null };
  if (now.from < 0) return { state: 'wait' };
  if (!ids.length) return was && sameRuns(was.runs, now.runs) ? { state: 'one', pos: span.pos, width: span.width, all: true } : { state: 'ended', why: 'unknown', met: null };
  const width = ids.reduce((n, s) => n + s.width, 0);
  const st = HELD.stretchesOf(ids, now.image, now.image.map((r) => [{ prefix: r.prefix, ordinal: r.ordinal, width: r.width }]));
  const one = HELD.onePiece(st, width);
  if (one && one.all) return { state: 'one', pos: one.stretch.pos, width: one.stretch.width, all: true };
  if (!REC.imageCovers(now)) return { state: 'wait' };
  if (one) return { state: 'one', pos: one.stretch.pos, width: one.stretch.width, all: false };
  return { state: 'ended', why: st.length ? 'pieces' : 'none', met: null };
}

/**
 * @typedef {Object} Into — a text a selection is followed into (`followWords`)
 * @property {Span} was the selection as it stood
 * @property {Doc} text the record the site shows now
 * @property {string} addr the address the site's acts name there: the plane's span's, a pane's (T-LAYER's `Made.addr`)
 * @property {string} where the words naming that text (BM-HELD's `whereOf`; `PaneAt.where`)
 * @property {boolean} [back] at a pane, its anchor stood at its end: Shift with an arrow moves its start
 * @property {boolean} [named] the caller names the pane before these words — a step's landing, by its title — so a whole move's words name it no more
 */

/**
 * A site's selection set as its words came to stand in a text set again
 * under it — the one place a selection meets such a text (see the head; Q2):
 * in one piece, moved over that stretch, kept whole or shrunk, its anchor at
 * the same end and its bytes named anew there, the platform's range placed
 * there where its site holds it, and its own card or "which" list drawn
 * again over it where it moved (`drawOwn`) — save while a card the reader
 * asked for still reads, which that would end; in pieces, none, or couldn't
 * tell, ended in that frame with its own card and list, no act on the chrome
 * (`endFollowed`).
 * @param {Site} site
 * @param {Placing} f where its words stand (`placing`); `wait` changes nothing
 * @param {Into} into
 * @returns {string | null} what the status region is to say of it (`changeWords`), the caller's to say or to say with words of its own; none where it stands where it stood
 */
export function followWords(site, f, into) {
  if (f.state === 'wait') return null;
  if (f.state === 'ended') { endFollowed(site); return changeWords(f, into, null, site); }
  const span = { addr: into.addr, pos: f.pos, width: f.width }, left = ownLeft(site), moved = !sameSpan(span, into.was);
  if (site === 'plane') {
    hold(span, ends);
    if (moved) { LAYER.placeSelection(span); markDirty(); }
  } else {
    holdPane(site, span, into.back ? 'start' : 'end', 'page');
    if (site === focusedSite()) placePane(site);
  }
  if (moved && left && !HOST.pending()) drawOwn(left, span, site);
  return moved ? changeWords(f, into, span, site) : null;
}

/**
 * What the status region says of a selection followed (see the head): moved
 * whole, where it stands now, as a selection made is said (`tell`) — at a
 * pane, the text it shows named first (`Into.where`), save where the caller
 * names the pane itself (`Into.named`); kept shrunk, FP-21's line for a part,
 * the rest possibly under withheld text the text shows (BM-HELD's `lineOf`);
 * ended, that it ended, then why — its words in pieces, none of them, or
 * couldn't tell by the refusal met — each a sentence; the text named by
 * `Into.where`.
 * @param {Placing} f
 * @param {Into} into
 * @param {Span | null} now where it stands now, where it stands
 * @param {Site} site
 * @returns {string | null}
 */
function changeWords(f, into, now, site) {
  const where = into.where;
  if (f.state === 'one' && now) {
    if (f.all) return fields(site === 'plane' || into.named ? null : where, now.addr, t('F.position', { p: now.pos }));
    return HELD.lineOf({ .../** @type {HELD.Said} */ (HELD.saidOf({ holds: 'part' }, 'selected', into.addr, showsWithheld(into.text))), where });
  }
  if (f.state !== 'ended') return null;
  const why = f.why === 'pieces' ? sentence('L.selection.pieces', { where }) : f.why === 'none' ? sentence('L.selection.gone', { where }) : HELD.lineOf({ ...HELD.unknownOf(f.met, 'selected', into.addr), where });
  return sentences(sentence('L.selection.ended'), why);
}

/**
 * A site's selection ended as its words came to stand in pieces, none, or
 * untold (`followWords`): its own card or "which" list taken down first, no
 * act on the chrome — a card the reader asked for still reading reads on —
 * then the selection with its marks; at a pane the platform's range there
 * collapsed where it stood (`clear`'s).
 * @param {Site} site
 */
function endFollowed(site) {
  const own = ownAt(site);
  if (own) { moving = true; try { HOST.complete(own); } finally { moving = false; } }
  if (site !== 'plane') { clear(site); return; }
  if (!sel) return;
  hold(null);
  LAYER.placeSelection(null);
  markDirty();
}

/** the id of the selection's own card or "which" list standing at a site — the acts card or the list holding no span of its own (`About.at`), which ends with the selection there (see the head) — else null */
function ownAt(/** @type {Site} */ site) {
  const o = HOST.currentState(), a = o && !o.notice ? /** @type {About | undefined} */ (o.about) : undefined;
  return o && a && (a.kind === 'selection' || a.kind === 'which') && !a.at && (a.site ?? 'plane') === site ? o.id : null;
}

/** the selection's own card or "which" list standing at a site (`ownAt`) as it stands now — what it is about and the control the focus stands on in it (O-HOST's `asLeft`) — else null */
function ownLeft(/** @type {Site} */ site) {
  const left = ownAt(site) ? HOST.asLeft() : null;
  return left ? /** @type {{about: About, focus: string | null}} */ (left) : null;
}

/**
 * The selection's own card or "which" list drawn again over it where it
 * stands now (`restore`, `followWords`): the list over its targets counted
 * again there (`targetsAt`) where they are two or more, else the card, each
 * taking the focus on the control it was left holding it on.
 * @param {{about: About, focus: string | null}} left
 * @param {Span} span
 * @param {Site} site
 */
function drawOwn(left, span, site) {
  const a = left.about;
  if (a.kind !== 'which') { render(left.focus, null, null, site); return; }
  const tg = targetsAt(a.what, span, site);
  if (countOf(tg) > 1) which_(tg, a.what, span, false, left.focus, site); else render(null, null, null, site);
}

/**
 * A change of the page's class, told before O-HOST's (the app's; FP-29): the
 * acts row taken down wherever it stands, ending nothing, as a move of the
 * focus takes it (`rowOff`'s way), so O-HOST's dismissal of what stands ends
 * no selection — each follows its words as its text is read at the new class
 * (see the head; `carry`, `followPane`).
 */
export function classChanged() {
  if (!HOST.currentIs('selection')) return;
  moving = true;
  try { HOST.complete('selection'); } finally { moving = false; }
}

/** @typedef {'plane' | 'a' | 'b'} Site a place showing one arrangement of a document's words, which holds a selection of its own (see the head): the plane, or a reading scene's pane by its side */
/** @typedef {'a' | 'b'} Side a reading scene's pane, by its side */

/**
 * @typedef {Object} PaneSel — a reading scene's pane's selection (see the head)
 * @property {Span} span its bytes, in the positions the pane's article was made from, its address the one the pane's acts name (T-LAYER's `Made.addr`)
 * @property {'start' | 'end'} moves the end its focus point stands at: the end Shift with an arrow moves
 * @property {boolean} told where it stands was said through the status region, or the page's own act set it
 */

/**
 * @typedef {Object} PaneAt — a reading scene's pane as O-SELECTION reads it (SC's `PaneSite`)
 * @property {HTMLElement | null} article the article it shows: where its selection is read, placed and drawn; null where none stands yet
 * @property {'editor' | 'past' | 'held' | 'read'} kind what text it holds: its draft's editor, a past state of a draft, the held version, else a text it reads
 * @property {string} names the address its acts name, its positions measured against (T-LAYER's `Made.addr`)
 * @property {import('../model/records.js').Doc} d the record its text was made from: what its span focus walks and its acts read
 * @property {number | null} focus its span focus, the first position of the span it stands on; null where it stands on none
 * @property {Shown[]} marks the links its article draws, as it was set: the links a slot at it reads
 * @property {() => string} where the words naming the text it shows, as a line names a text (BM-HELD's `whereOf`), made as they are asked for: what a selection followed there is said in (`changeWords`)
 */

/**
 * @typedef {Object} Readers — what O-SELECTION reads of the reading scene, the app's to hand in (SC's)
 * @property {(side: Side) => (PaneAt | null)} pane a pane as it stands; null where no scene stands (SC's `siteOf`)
 * @property {() => Side | null} focused the pane whose text, corner or list of past states holds the platform's focus; null anywhere else (SC's `focusedPane`)
 * @property {(side: Side) => (string | null)} heldReason the reason a key at the held version gives, by its string's id (SC's `heldReasonAt`): what a slot that sends gives there; null where the pane holds none
 */

/** @type {Readers} */
const NO_READERS = { pane: () => null, focused: () => null, heldReason: () => null };
/** @type {Readers} */
let read = NO_READERS;

/**
 * The scene's readers handed in (the app's; see the head): what the panes
 * are read through, the readers not given reading no scene.
 * @param {Partial<Readers>} r
 */
export function readers(r) { read = { ...NO_READERS, ...r }; }

/** @type {Side[]} */
const SIDES = ['a', 'b'];
/** @type {Record<Side, PaneSel | null>} each reading scene's pane's selection, by its side; none where no scene stands */
const paneSel = { a: null, b: null };
/** @type {Side} the last pane the platform's focus stood in — its text, its corner or its list of past states: the focused site while the focus stands at the scene's acts, the one line or an overlay (`focusedSite`); pane B, where a scene puts the focus, until one has held it */
let lastPane = 'b';
/** @type {Side | null} the pane whose text a press stands on, from the button going down to its release, the platform's cancel or a context menu (APP-INPUT's `pressPane`): no selection is taken or placed meanwhile, its release taking the pane's selection once (`takePane`); null where none stands */
let pressed = null;
/** @type {Side | null} the pane whose selection the page set while a field held the focus, its range owed until the field lets go (`placePane`): the platform's range there is older than it, so no reader takes that range in its place (`fromPlatform`); null where none is owed */
let owed = null;
/** @type {Side | null} the pane a click on whose text was just released, its selection ended (`takePane`): until the platform's selection next changes or a press begins, a range the platform holds there is the one it empties as the button comes up, which no reader takes (`fromPlatform`, `clickedIn`); null where none is */
let clicked = null;
/** what the page last drew the selections the platform does not hold from (`drawPanes`), each pane's by its article and its span: drawn again only where it reads other */
let drawnKey = '';
/** the custom highlight the page draws the selections the platform does not hold with, as the style names it (`::highlight()`) */
export const INACTIVE = 'skep-inactive';
/** @type {WeakMap<HTMLElement, number>} each pane's article by a number of its own, for `drawnKey`: an article set again is drawn anew */
const articleIds = new WeakMap();
let articleSerial = 0;

/** a pane's article as the scene shows it now; null where no scene stands or the pane shows none */
const articleOf = (/** @type {Side} */ side) => { const p = read.pane(side); return p ? p.article : null; };
/** does a reading scene stand */
const sceneStands = () => !!read.pane('a');
/** does a field the reader types in hold the platform's focus (N-FOCUS's `isField`): no range is placed while it does (FP-20) */
const typing = () => typeof document !== 'undefined' && FOCUS.isField(document.activeElement);

/**
 * The site whose selection the platform's live one is (see the head; Q4):
 * the plane where no reading scene stands; while one stands, the pane whose
 * text, corner or list of past states holds the platform's focus — kept as
 * the last such pane — else, where the focus stands on the acts row or the
 * "which" list, the site it stands at (`rowSite`), else the last such pane.
 * @returns {Site}
 */
export function focusedSite() {
  if (!sceneStands()) return 'plane';
  const side = read.focused();
  if (side) { lastPane = side; return side; }
  const host = HOST.element(), at = typeof document !== 'undefined' ? document.activeElement : null, row = rowSite();
  if (row && host && at && host.contains(at)) { if (row !== 'plane') lastPane = row; return row; }
  return lastPane;
}

/** the site the acts row or the "which" list stands at, by its anchor's site — the plane's where it names none; null where neither stands */
function rowSite() {
  const o = HOST.currentIs('selection') || HOST.currentIs('which') ? HOST.currentState() : null, s = o && o.anchor ? o.anchor.span : null;
  return o ? (s && s.site) || 'plane' : null;
}

/** does the acts row stand at a pane — `side`, or any where none is named */
const rowAtPane = (/** @type {Side | null} */ side = null) => { const s = HOST.currentIs('selection') ? rowSite() : null; return !!s && s !== 'plane' && (!side || s === side); };

/** @type {boolean} the acts row is being taken down by a move of the focus, or as its selection ends (`rowOff`): its dismissal ends nothing */
let moving = false;

/**
 * The acts row at a pane taken down with nothing ended (see the head): no
 * act on the chrome (O-HOST's `complete`), its selection standing; nothing
 * where it stands at none, or at another than `side`.
 * @param {Side | null} [side] the pane whose row goes; any where none is named
 */
function rowOff(side = null) {
  if (!rowAtPane(side)) return;
  moving = true;
  try { HOST.complete('selection'); } finally { moving = false; }
}

/**
 * The acts row drawn at a pane's selection (see the head): at a take that
 * says it and at the page's own act that selects there, in the place of what
 * stands (`over`); as the focus comes into the pane, only where nothing but
 * the row stands and no card the reader asked for still reads (O-HOST's
 * `pending`), and never again over the same span. Nothing where the pane
 * holds no selection.
 * @param {Side} side
 * @param {boolean} over the person's act drew it: it takes the place of what stands
 */
function rowAt(side, over) {
  const e = paneSel[side];
  if (!e) return;
  if (!over) {
    if (HOST.pending() || (HOST.hasCurrent() && !HOST.currentIs('selection'))) return;
    const o = HOST.currentState(), s = o && o.anchor ? o.anchor.span : null;
    if (s && s.site === side && s.addr === e.span.addr && s.pos === e.span.pos && s.width === e.span.width) return;
  }
  render(null, null, null, side);
}

/**
 * A site's selection, read-only, by value: the plane's as it follows its
 * words in the text shown now (`carry`) — the one the screen draws, never a span a
 * card or a list holds (see the head); a pane's in its article's positions,
 * the focused pane's read from the platform's first (`paneNow`). Naming no
 * site reads the focused site's (`focusedSite`). Null where none stands.
 * @param {Site} [site]
 * @returns {Span | null}
 */
export function selected(site = focusedSite()) {
  if (site === 'plane') { carry(); return sel; }
  const e = paneNow(site);
  return e ? { ...e.span } : null;
}

/**
 * Does a site's selection run backward, its focus point before its anchor,
 * so the end Shift with an arrow moves is its start (`Ends.moves`,
 * `PaneSel.moves`)? Naming no site reads the focused site's; false where none
 * stands.
 * @param {Site} [site]
 * @returns {boolean}
 */
export function backward(site = focusedSite()) {
  if (site === 'plane') return !!sel && ends.moves === 'start';
  const e = paneNow(site);
  return !!e && e.moves === 'start';
}

/**
 * Every site's selection standing, by value, with whether the page draws it
 * — a pane's the platform does not hold (`drawPanes`) — rather than the
 * platform, or nothing, as the plane's under a scene.
 * @returns {Array<{site: Site, addr: string, pos: number, width: number, inactive: boolean}>}
 */
export function selections() {
  /** @type {Array<{site: Site, addr: string, pos: number, width: number, inactive: boolean}>} */
  const out = [];
  const p = selected('plane');
  if (p) out.push({ site: 'plane', addr: p.addr, pos: p.pos, width: p.width, inactive: false });
  for (const side of SIDES) {
    const e = paneNow(side);
    if (e) out.push({ site: side, addr: e.span.addr, pos: e.span.pos, width: e.span.width, inactive: !holds(side) });
  }
  return out;
}

/** does the platform draw the custom highlights the page draws a selection the platform does not hold with (see the head)? Where it does not, SC draws them as boxes */
export const drawsHighlights = () => typeof CSS !== 'undefined' && !!(/** @type {any} */ (CSS)).highlights && typeof (/** @type {any} */ (globalThis)).Highlight === 'function';

/**
 * A pane's selection now: the focused pane's read from the platform's first
 * (`fromPlatform`) — save while a press stands on a pane's text — every
 * other's as it stands.
 * @param {Side} side
 * @returns {PaneSel | null}
 */
function paneNow(side) {
  if (!pressed && sceneStands() && side === focusedSite()) fromPlatform(side, 'later');
  return paneSel[side];
}

/** does the platform's selection stand over a pane's selection, its live one: false where it stands elsewhere, or the pane holds none */
function holds(/** @type {Side} */ side) {
  const e = paneSel[side], art = articleOf(side), have = e && art ? LAYER.selectionIn(art) : null;
  return !!e && !!have && sameSpan(have.span, e.span);
}

/**
 * The platform's selection read where it stands in a pane's text (see the
 * head): with extent there, that pane's selection made of it (`holdPane`);
 * collapsed there, a caret alone, the pane's selection ended where that pane
 * is the focused site — a click in its text; anywhere else, nothing. A
 * reader's read leaves as it stands a pane whose range is owed (`owed`) — the
 * range there is older than its selection — or whose click's release just
 * ended it (`clicked`) — the range there is the one the platform empties; a
 * gesture's take is the person's and owes nothing after it. True where the
 * platform's selection stands in the pane's text.
 * @param {Side} side
 * @param {'say' | 'later'} how a gesture's take, said now; else a reader's, said by the take that follows
 * @returns {boolean}
 */
function fromPlatform(side, how) {
  const art = articleOf(side);
  if (!art) return false;
  if (clicked === side && how === 'later') return false;
  if (owed === side) { if (how === 'later') return false; owed = null; }
  const have = LAYER.selectionIn(art);
  if (have) { holdPane(side, have.span, have.backward ? 'start' : 'end', how); return true; }
  if (!LAYER.collapsedIn(art)) return false;
  if (side === focusedSite()) endPane(side);
  return true;
}

/**
 * A pane's selection set, its blocks marked in place (`markPane`): where it
 * already reads so, said where a gesture's take finds it unsaid — a reader
 * read it from the platform first — else nothing; a take that says it draws
 * its acts row (`rowAt`), a reader's read never.
 * @param {Side} side
 * @param {Span} span
 * @param {'start' | 'end'} moves
 * @param {'say' | 'later' | 'page'} how `say` a gesture's take, said now; `later` read from the platform as a reader asked, said by the take that follows; `page` the page's own act, which says what it says itself
 */
function holdPane(side, span, moves, how) {
  const e = paneSel[side];
  if (e && sameSpan(e.span, span) && e.moves === moves) { if (how === 'say' && !e.told) { e.told = true; tell(span); rowAt(side, true); } return; }
  paneSel[side] = { span: { addr: span.addr, pos: span.pos, width: span.width }, moves, told: how !== 'later' };
  markPane(side);
  markDirty();
  if (how === 'say') { tell(span); rowAt(side, true); }
}

/** a pane's selection ended, its blocks unmarked, its range owed no more, its acts row taken down where it stands there (`rowOff`) and its own "which" list with it (`ownAt`) */
function endPane(/** @type {Side} */ side) {
  if (owed === side) owed = null;
  if (!paneSel[side]) return;
  paneSel[side] = null;
  rowOff(side);
  if (ownAt(side) === 'which') HOST.complete('which');
  markPane(side);
  markDirty();
}

/** a pane's article marked for its selection (T-LAYER's `markPaneSelection`): its blocks the selection touches, by position */
function markPane(/** @type {Side} */ side) {
  const art = articleOf(side), e = paneSel[side];
  if (art) LAYER.markPaneSelection(art, e ? e.span : null);
}

/** where a selection made stands, said through the status region (D4) */
const tell = (/** @type {Span} */ span) => FOCUS.say(`${span.addr} · ${t('F.position', { p: span.pos })}`);

/**
 * A pane's selection placed as the platform's live one, in the pane's
 * article (T-LAYER's `placeSelection` with the pane): only where the
 * platform holds no selection with extent, or holds one in a site — never
 * over one the person holds over an overlay's text or a field's — and never
 * while a press stands on a pane's text, whose release takes the person's,
 * or a field holds the focus (FP-20), its range owed then until the field
 * lets go (`owed`), the next `drawPanes` placing it.
 * @param {Side} side
 */
function placePane(side) {
  const e = paneSel[side], art = articleOf(side);
  if (!e || !art || pressed) return;
  if (typing()) { owed = side; return; }
  if (LAYER.platformSelects() && !LAYER.siteOfSelection()) return;
  LAYER.placeSelection(e.span, null, { el: art, backward: e.moves === 'start' });
  if (owed === side) owed = null;
}

/**
 * A press on a reading scene's pane's text begun at a node of it, or, with
 * none, ended with nothing taken — the platform's cancel, a context menu
 * (APP-INPUT's; see the head): no selection is taken or placed while it
 * stands, its release taking the pressed pane's once (`takePane`).
 * @param {Node | null} at where the button went down; null ends the press
 */
export function pressPane(at) {
  pressed = at ? SIDES.find((side) => { const art = articleOf(side); return !!art && art.contains(at); }) ?? null : null;
  clicked = null;
}

/** does a press stand on a reading scene's pane's text (`pressPane`) */
export const pressingPane = () => pressed !== null;

/**
 * The platform's selection taken as a reading scene's pane's (APP-INPUT's;
 * see the head) — at the release of a press on a pane's text, the press
 * ended first, and as it changes while no press stands. A click's release —
 * the press a click, by APP-INPUT's reading — ends the pressed pane's
 * selection whatever the platform holds yet: a click never selects, and the
 * platform empties a selection clicked inside only as the button comes up,
 * so until its selection next changes no reader takes the range it holds
 * there (`clicked`; FP-24's one selection). Else: with extent in a pane's
 * text, that pane's selection made of it, its blocks marked and where it
 * stands said once; collapsed in the text of the pane whose selection is the
 * live one (`focusedSite`) — a click there — that selection ended, and so is
 * the pressed pane's where the release leaves the platform no selection with
 * extent at all; anywhere else nothing, so a selection made in the other pane
 * ends none here. Never the plane's acts, its walk or its caret.
 * @param {boolean} [click] the press released is a click: it moved the pointer no further than a click's, counted one click and held no Shift
 * @returns {boolean} the platform's selection stands in a pane's text, or a press there was released: none of it is the plane's
 */
export function takePane(click = false) {
  const was = pressed;
  pressed = null;
  if (!was) clicked = null;
  if (!sceneStands()) return false;
  if (was && click) { clicked = was; endPane(was); return true; }
  if (SIDES.some((side) => fromPlatform(side, 'say'))) return true;
  if (was && !LAYER.platformSelects()) { endPane(was); return true; }
  return !!was;
}

/**
 * A pane's selection as a click on its text, or a drag's release there, has
 * left it (SC's, at that click — the platform's selection settled by then,
 * which a click inside a selection empties only as the button comes up, after
 * the release's take): with extent in its text, that pane's selection made
 * of it; with none there — collapsed, or none at all — the pane's selection
 * ended, as the click ends it (FP-24's one selection). Read then as
 * `selected` reads it; nothing taken while a press stands, nor where a
 * click's release has decided it already (`clicked`).
 * @param {Side} side
 * @returns {Span | null}
 */
export function clickedIn(side) {
  const art = articleOf(side);
  if (art && !pressed && clicked !== side) {
    const have = LAYER.selectionIn(art);
    if (owed === side) owed = null;
    if (have) holdPane(side, have.span, have.backward ? 'start' : 'end', 'say'); else endPane(side);
  }
  return selected(side);
}

/**
 * A pane's selection set by the scene's own act (SC's: a return putting it
 * back, the selection a scene opens holding, a step at a pane's caret,
 * select-all): its blocks marked, and
 * placed as the platform's live one where that pane is the focused site
 * (`placePane`), nothing said; its acts row drawn where the person's act
 * selected it, and moved onto it where it stands at the pane (`rowAt`); null
 * ends it (`clear`). A setting of the pane follows it by `followPane`.
 * @param {Side} side
 * @param {Span | null} span in the positions of the article the pane shows now
 * @param {boolean} [back] its anchor stands at its end: Shift with an arrow moves its start
 * @param {boolean} [act] the person's act selected it — a step at a pane's caret, select-all — rather than a setting, a return or an opening carrying it
 */
export function setPane(side, span, back = false, act = false) {
  if (!span) { clear(side); return; }
  holdPane(side, span, back ? 'start' : 'end', 'page');
  if (side === focusedSite()) placePane(side);
  if (act || rowAtPane(side)) rowAt(side, act);
}

/**
 * @typedef {Object} Was — a pane's selection as it stood before a setting of its pane (SC's `setPanes`)
 * @property {Span} span where it stood, in the positions of the article the pane showed
 * @property {ISpan[]} ids its bytes by identity through that article's image; none where it did not name them
 * @property {boolean} backward its anchor stood at its end
 * @property {Text} text the text that article was made from
 */

/**
 * A reading scene's pane's selection followed into the text its pane was set
 * again with (see the head; Q2; SC's `setPanes`, after the step swapped the
 * article in): its words placed there by FP-21's rule (`placing`) and the
 * selection moved or ended there (`followWords`), the words the status region
 * is to say of it handed back for the setting to say in one message. A text
 * still being read is waited for: no selection standing on it, SC keeping
 * the selection by its bytes for the read that sets the pane again.
 * @param {Side} side
 * @param {Was} was
 * @param {boolean} [named] the setting's own words name the pane before these (`Into.named`)
 * @returns {{said: string | null, waits: boolean}} `waits` the selection is SC's to keep until then
 */
export function followPane(side, was, named = false) {
  const p = read.pane(side);
  if (!p) return { said: null, waits: false };
  const f = placing(was.span, was.ids, was.text, p.d);
  if (f.state === 'wait') { clear(side); return { said: null, waits: true }; }
  return { said: followWords(side, f, { was: was.span, text: p.d, addr: p.names, where: p.where(), back: was.backward, named }), waits: false };
}

/**
 * A site's selection placed as the platform's live one, under a copy the
 * platform holds no range for (N-KEYS' `copyAsDrawn`; FP-24): the plane's in
 * the mounted text (T-LAYER's `placeSelection`), a pane's in its article
 * (`placePane`). False where the site holds none: nothing placed.
 * @param {Site} site
 * @returns {boolean}
 */
export function placeLive(site) {
  const s = selected(site);
  if (!s) return false;
  if (site === 'plane') LAYER.placeSelection(s); else placePane(site);
  return true;
}

/**
 * The focus come into a pane — its text, its corner or its list of past
 * states (SC's): that pane the last the focus stood in (`focusedSite`), the
 * selections set right with it (`drawPanes`), and the acts row moved there
 * where the pane holds a selection and nothing else stands, else taken down
 * from the other pane, ending nothing (`rowAt`, `rowOff`).
 * @param {Side} side
 */
export function focusIn(side) {
  lastPane = side;
  drawPanes();
  if (paneSel[side]) rowAt(side, false); else rowOff(side === 'a' ? 'b' : 'a');
}

/**
 * The reading scene's selections set right with the platform's focus and
 * drawn (see the head; Q3, Q4) — SC's, each frame it draws and as the focus
 * comes into a pane: the focused pane's read from the platform's first
 * (`fromPlatform`); then, while no press stands on a pane's text and no
 * field holds the focus, that pane's placed as the live one where the
 * platform does not hold it (`placePane`), or, where it holds none, a range
 * standing in the other pane's text taken off (T-LAYER's `dropIn`); each
 * pane's blocks marked for its own (`markPane`); and every pane's selection
 * the platform does not hold drawn by the page as the platform draws an
 * inactive one — the custom highlight over the ranges its own characters
 * stand in (T-LAYER's `textRangesIn`), drawn anew only where what it is drawn
 * from changed (`drawnKey`); SC's boxes where the platform has none
 * (`drawsHighlights`). Where no scene stands, the drawing taken down.
 */
export function drawPanes() {
  if (!sceneStands()) { undraw(); return; }
  const site = focusedSite();
  if (site !== 'plane' && !pressed && !typing()) {
    fromPlatform(site, 'later');
    if (paneSel[site]) placePane(site);
    else for (const side of SIDES) { const art = articleOf(side); if (side !== site && art) LAYER.dropIn(art); }
  }
  for (const side of SIDES) markPane(side);
  const inactive = SIDES.filter((side) => !!paneSel[side] && !!articleOf(side) && !holds(side));
  const key = inactive.map((side) => { const e = /** @type {PaneSel} */ (paneSel[side]); return `${side}:${idOf(/** @type {HTMLElement} */ (articleOf(side)))}:${e.span.pos}+${e.span.width}`; }).join(' ');
  if (key === drawnKey) return;
  drawnKey = key;
  if (!drawsHighlights()) return;
  const ranges = inactive.flatMap((side) => LAYER.textRangesIn(/** @type {HTMLElement} */ (articleOf(side)), /** @type {PaneSel} */ (paneSel[side]).span));
  const reg = (/** @type {any} */ (CSS)).highlights;
  if (ranges.length) reg.set(INACTIVE, new (/** @type {any} */ (globalThis)).Highlight(...ranges)); else reg.delete(INACTIVE);
}

/** an article's number (`articleIds`) */
function idOf(/** @type {HTMLElement} */ el) {
  let id = articleIds.get(el);
  if (id == null) { id = ++articleSerial; articleIds.set(el, id); }
  return id;
}

/** the page's drawing of the selections the platform does not hold taken down */
function undraw() {
  drawnKey = '';
  if (drawsHighlights()) (/** @type {any} */ (CSS)).highlights.delete(INACTIVE);
}

/**
 * Every reading scene's pane's selection ended, with what the page drew of
 * them and an acts row standing at one (`rowOff`) — as a scene closes, and as
 * one stands anew over a standing one (SC's; see the head) — the last pane
 * the focus stood in pane B again, and no press standing.
 */
export function endPanes() {
  rowOff();
  paneSel.a = null; paneSel.b = null;
  lastPane = 'b';
  pressed = null;
  owed = null;
  clicked = null;
  undraw();
}

/** does the selection standing reach past its document into another document's text (`Ends.across`): N-KEYS' reading, no key at a caret replacing it */
export const reachesPast = () => !!sel && ends.across;

/**
 * A span of a site's text by its bytes as the page shows them now (`Left`):
 * on the plane through the text shown, every byte named, one the page made by
 * the page's own identity until the board mints it; at a pane through the
 * image its article was made from (M-REC's `identityIn`).
 * @param {Span} s
 * @param {Site} [site]
 * @returns {Left}
 */
function bytesOf(s, site = 'plane') {
  const p = site === 'plane' ? null : read.pane(site), made = p && p.article ? LAYER.madeOf(p.article) : null;
  const ids = site === 'plane' ? LAYER.shownIdentity(s.addr, s.pos, s.width) : REC.identityIn(made ? made.image : p ? p.d.image : [], s.pos, s.width);
  return { addr: s.addr, pos: s.pos, width: s.width, ids };
}

/**
 * A site's selection by its bytes' identity (see the head): the plane's as the
 * reader leaves its place, naming no site; a pane's as an act carries it into
 * the place it opens (N-GO's `toScene`, `history`). Null where none stands.
 * @param {Site} [site]
 * @returns {Left | null}
 */
export const asLeft = (site = 'plane') => { const s = selected(site); return s ? bytesOf(s, site) : null; };

/**
 * The selection put back over the span its bytes hold in the text now — on
 * the reader's return to its place (see the head; N-GO's) — the platform's
 * highlight with it, said through the status region as a selection made is,
 * save where `say` is false; its own card or "which" list where one stood
 * over it, drawn again there (`drawOwn`).
 * @param {Span} span
 * @param {import('./host.js').Left | null} left the card or the list standing over it as the reader left it; null where none of the selection's stood
 * @param {boolean} [say] the status region says where it stands: false where the landing that carried it says it
 */
export function restore(span, left, say = true) {
  hold(span);
  LAYER.placeSelection(span);
  markDirty();
  const a = left ? left.about : null;
  if (left && a && (a.kind === 'which' || a.kind === 'selection')) drawOwn(/** @type {{about: About, focus: string | null}} */ (left), span, 'plane');
  if (say) FOCUS.say(`${span.addr} · ${t('F.position', { p: span.pos })}`);
}

/**
 * A card or a "which" list holding the span a slot's act was made over (see
 * the head; `About.at`), reopened over the span its bytes hold in the text
 * now — on the reader's return to its place, or once its box shows another
 * version (N-GO's) — nothing selected: the list over its targets counted
 * again there (`targetsAt`), where they are two or more, else the card; each
 * taking the focus on the control it was left holding it on, at the site it
 * stood at — a reading scene's pane where it names one (`About.site`), as
 * N-GO's moves it with the person's edits at a draft's editor pane.
 * @param {{about: About, focus: string | null}} left
 * @param {Span} span where its bytes stand now
 */
export function reopen(left, span) {
  const a = left.about, site = a.site ?? 'plane';
  if (a.kind !== 'which') { render(left.focus, null, span, site); return; }
  const tg = targetsAt(a.what, span, site);
  if (countOf(tg) > 1) which_(tg, a.what, span, false, left.focus, site); else render(null, null, span, site);
}

/** the block of the text shown holding a position of it, whole (T-LAYER's `blockAt`) — the walk's focused span, which at a live caret is the block the caret is in: what a slot acts on (`actedOn`), a click and Enter select; a position in no block of it names one position */
function wholeShown(/** @type {string} */ addr, /** @type {number} */ pos) {
  const b = LAYER.blockAt(addr, pos);
  return b ? spanOfBlock(addr, b) : { addr, pos, width: 1 };
}

/**
 * Select a span of the text shown: the bytes named, or, with no width, the
 * whole of its block holding `pos` (`wholeShown`; a click, Enter at the
 * focused span, the gate's door). The platform's highlight is placed over
 * it — where the platform's selection
 * already covers it, that one stands — the next frame marks the blocks it
 * touches in place, rebuilding no article, and its acts appear at it; the
 * end the act moved kept clear of its document's head (T-LAYER's
 * `keepClear`), and the one Shift with ← or → moves next (`Ends`) — where the
 * platform made the selection, the end its focus point stands at (T-LAYER's
 * `selectionBackward`), and whether its range reaches past the article its
 * moving end stands in (T-LAYER's `movingPart`); where the act moved none,
 * its end.
 * A reading scene's pane's selection is selected in the text its article
 * shows — a block whole of the blocks it was made from — as a pane's take
 * makes one (`holdPane`): said, and placed as the live one where that pane
 * is the focused site, never the plane's acts, walk or caret.
 * @param {string} addr
 * @param {number} pos the span's first position
 * @param {number | null} [width] positions; null selects the block at `pos` whole
 * @param {SelectionEnd | null} [moved] the end the act moved — K-8's extended end, the platform's focus point after a press; null for an act that moves none
 * @param {Site} [site] the site whose selection it is: the plane's where none is named
 */
export function select(addr, pos, width = null, moved = null, site = 'plane') {
  if (site !== 'plane') { selectIn(site, addr, pos, width, moved); return; }
  const span = width != null && width > 0 ? { addr, pos, width } : wholeShown(addr, pos);
  const platform = moved === 'focus', part = platform ? LAYER.movingPart() : null;
  take(span, moved, { moves: moved === 'start' || (platform && LAYER.selectionBackward()) ? 'start' : 'end', platform, across: platform && !(part && part.whole) });
}

/**
 * A pane's selection selected (`select`): the bytes named, else the block of
 * the pane's article holding `pos` whole; nothing where the pane shows no
 * article made as `addr`.
 * @param {Side} side
 * @param {string} addr
 * @param {number} pos
 * @param {number | null} width
 * @param {SelectionEnd | null} moved
 */
function selectIn(side, addr, pos, width, moved) {
  const art = articleOf(side), made = art ? LAYER.madeOf(art) : null;
  if (!made || made.addr !== addr) return;
  const b = width != null && width > 0 ? null : made.blocks.find((x) => pos >= x.pos && pos < x.pos + x.width);
  const span = width != null && width > 0 ? { addr, pos, width } : b ? spanOfBlock(addr, b) : { addr, pos, width: 1 };
  holdPane(side, span, moved === 'start' ? 'start' : 'end', 'say');
  if (side === focusedSite()) placePane(side);
}

/**
 * The selection taken (`select`, `extendFromFocus`): a live caret in another
 * document kept first (`leaveFor`), then the selection set with how its ends
 * move (`hold`), the platform's highlight placed over it (T-LAYER's
 * `placeSelection`), its acts shown at it, and where it stands said through
 * the status region (D4).
 * @param {Span} span
 * @param {SelectionEnd | null} moved the end the act moved
 * @param {Ends} how
 */
function take(span, moved, how) {
  leaveFor(span, how);
  hold(span, how);
  LAYER.placeSelection(span, moved);
  markDirty();
  render();
  FOCUS.say(`${span.addr} · ${t('F.position', { p: span.pos })}`);
}

/**
 * A selection put in another document than a live caret's (see the head):
 * the caret kept where it stood, owing the frame nothing (T-LAYER's
 * `leaveCaret`), and the walk stood on the span of the text shown holding the
 * selection's moving end — its first byte where its start moves, else its
 * last — aimed at there, the platform's focus carried only where the mirror
 * held it (N-WALK's `focusTo`). Where the platform made the selection, the
 * document and the moving end are its focus point's (T-LAYER's
 * `movingPart`), so a range reaching into the caret's own draft from another
 * leaves the caret as FP-40 leaves it there. Nothing where no live caret
 * stands, or it stands in that document.
 * @param {Span} span
 * @param {Ends} how
 */
function leaveFor(span, how) {
  const c = LAYER.caret(), part = how.platform ? LAYER.movingPart() : null;
  const at = part ? part.span : span, start = part ? part.backward : how.moves === 'start';
  if (!c || !c.live || c.addr === at.addr) return;
  LAYER.leaveCaret('pointer', false);
  void WALK.focusTo(at.addr, movingByte(at, start), false, null, true);
}

/**
 * The anchor a Shift+click in a draft extends from (APP-INPUT's; K-70;
 * FP-40), a position of its text shown: the draft's caret standing there,
 * live or kept — the page's own, or the one the draft keeps (T-LAYER's
 * `caretIn`) — the other end of a selection ending at it (`anchorAt`) — else
 * the end of the selection standing there that no step moves (`Ends`); null
 * where neither stands in the draft, the Shift+click then a click.
 * @param {string} addr
 * @returns {number | null}
 */
export function anchorIn(addr) {
  const c = LAYER.caretIn(addr);
  if (c) return anchorAt(c);
  return sel && sel.addr === addr ? (ends.moves === 'end' ? sel.pos : sel.pos + sel.width) : null;
}

/**
 * K-8 (Shift+↓ / Shift+↑): the first press selects the walk's focused span
 * whole — a block of the text shown (T-LAYER's `blockByPos`) — and
 * nothing where the text shown holds no block there; each further press extends
 * the selection by a span of the text shown in the direction pressed, that
 * end the one the press moved (`select`). The focus stays on the walk's
 * element (rule 15). At a reading scene's pane the same, over the pane's own
 * record from its span focus, the selection the pane's (`selectFocusedIn`).
 * @param {'down' | 'up'} [dir]
 * @param {Site} [site] the plane's where none is named
 */
export function selectFocused(dir = 'down', site = 'plane') {
  if (site !== 'plane') { selectFocusedIn(site, dir); return; }
  const f = WALK.current(), moved = dir === 'up' ? 'start' : 'end';
  if (!f || f.kind !== 'block' || f.pos == null) return;
  if (!sel || sel.addr !== f.addr) {
    const b = LAYER.blockByPos(f.addr, f.pos);
    if (b) { const s = spanOfBlock(f.addr, b); select(s.addr, s.pos, s.width, moved); }
    return;
  }
  const e = extended(LAYER.shownOf(sel.addr).blocks, sel, dir);
  select(e.addr, e.pos, e.width, moved);
}

/**
 * K-8 at a reading scene's pane (`selectFocused`): the first press selects
 * the span its span focus stands on whole, a block of the pane's own record;
 * each further press extends the pane's selection by a span of that record in
 * the direction pressed — each the pane's selection, said, its acts row drawn
 * (`selectIn`). Nothing where the pane stands on no span.
 * @param {Side} side
 * @param {'down' | 'up'} dir
 */
function selectFocusedIn(side, dir) {
  const p = read.pane(side), moved = dir === 'up' ? 'start' : 'end';
  if (!p || !p.article) return;
  const e = paneNow(side);
  if (!e || e.span.addr !== p.names) {
    const b = p.focus != null ? p.d.blocks.find((x) => x.pos === p.focus) : null;
    if (b) { const s = spanOfBlock(p.names, b); select(s.addr, s.pos, s.width, moved, side); }
    return;
  }
  const x = extended(p.d.blocks, e.span, dir);
  select(x.addr, x.pos, x.width, moved, side);
}

/**
 * Shift with an arrow, Home or End at a live caret (D5 K-71, §1.6) — Shift
 * with ← or → at the kept caret's span once N-KEYS' returns it (K-70, K-77):
 * the caret moved a step that way (T-LAYER's `caretMove`) and the selection
 * made to run from its anchor to the caret, the end the caret stands at the
 * one the press moved (`select`), in the text shown, as the caret's positions
 * are; where the step brings the caret back to its anchor, no selection
 * stands (`clear`). The focus stays where it is (rule 15).
 * @param {import('../text/layer.js').CaretStep} dir
 * @returns {boolean} false where no live caret stands or it cannot move that way: nothing changes
 */
export function extendFromCaret(dir) {
  const c = LAYER.caret();
  if (!c || !c.live) return false;
  const anchor = anchorAt(c);
  if (!LAYER.caretMove(dir, anchor)) return false;
  const to = /** @type {import('../text/layer.js').Caret} */ (LAYER.caret()).pos;
  if (to === anchor) clear();
  else select(c.addr, Math.min(anchor, to), Math.abs(to - anchor), to < anchor ? 'start' : 'end');
  return true;
}

/** the anchor a selection extended from a caret runs from (`extendFromCaret`): the selection's other end where a selection in the caret's draft ends at the caret, else the caret's own position */
function anchorAt(/** @type {import('../text/layer.js').Caret} */ c) {
  if (!sel || sel.addr !== c.addr) return c.pos;
  if (sel.pos === c.pos) return sel.pos + sel.width;
  return sel.pos + sel.width === c.pos ? sel.pos : c.pos;
}

/**
 * Shift with ← or → at the walk's focused span of a draft the person may edit
 * where no caret stands in it (D5 K-70; FP-40): the caret placed live where
 * the step extends from — the moving end of the selection standing in the
 * walk's document (`Ends`), else the span's edge, its start for → and the end
 * of its text for ←, never the newline after it — that selection standing
 * (T-LAYER's `placeCaret`), then a step extended from it as at a live caret
 * (`extendFromCaret`), a selection in another document replaced. Where the
 * caret cannot step that way it stands live where it was placed, the
 * selection standing as it stood. The focus stays on the walk's element
 * (rule 15).
 * @param {import('../text/layer.js').ArrowStep} dir
 * @returns {boolean} false where the walk stands on no span the person may edit: nothing changes
 */
export function extendFromSpan(dir) {
  const f = WALK.current(), s = selected('plane');
  if (!f || f.kind !== 'block' || f.pos == null) return false;
  const here = s && s.addr === f.addr ? s : null, b = here ? null : LAYER.blockByPos(f.addr, f.pos);
  const from = here ? (ends.moves === 'end' ? here.pos + here.width : here.pos) : b ? edgeOf(b, dir) : null;
  if (from == null || !LAYER.placeCaret(f.addr, from, true)) return false;
  if (!extendFromCaret(dir) && !sel) LAYER.placeCaret(f.addr, from);
  return true;
}

/** the edge of a block a step with ← or → selects from where no selection stands (K-70): its start for →, the end of its text for ←, never the newline after it */
function edgeOf(/** @type {import('../model/records.js').Block} */ b, /** @type {import('../text/layer.js').ArrowStep} */ dir) {
  return dir === 'right' || dir === 'wordRight' ? b.pos : b.kind === 'para' ? b.pos + byteLength(b.text) : b.pos + b.width;
}

/**
 * Shift with ← or → at the walk's focused span in text the person may not
 * edit (D5 K-70, K-71): where the selection stands in the walk's document, or
 * the platform made it wherever it stands (`Ends`), its moving end is stepped
 * that way in the text shown (`stepFrom`), its anchor standing; else one step
 * is selected from the span's edge — its start for →, the end of its text for
 * ←, never the newline after it — a selection in another document replaced,
 * as K-8's first press replaces it (`selectFocused`). Where the step brings
 * the moving end back to the anchor, no selection stands (`clear`). The focus
 * stays on the walk's element (rule 15). At a reading scene's pane the same,
 * from its span focus over the pane's own record, the selection the pane's
 * (`extendFromFocusIn`).
 * @param {import('../text/layer.js').ArrowStep} dir
 * @param {Site} [site] the plane's where none is named
 * @returns {boolean} false where the walk stands on no span, or the text holds nothing that way: nothing changes
 */
export function extendFromFocus(dir, site = 'plane') {
  if (site !== 'plane') return extendFromFocusIn(site, dir);
  const f = WALK.current();
  if (!f || f.kind !== 'block' || f.pos == null) return false;
  if (sel && (sel.addr === f.addr || ends.platform)) {
    const { addr, pos, width } = sel, end = pos + width;
    const [anchor, moving] = ends.moves === 'end' ? [pos, end] : [end, pos];
    return runTo(addr, anchor, stepFrom(addr, moving, dir, anchor), ends.platform);
  }
  const b = LAYER.blockByPos(f.addr, f.pos);
  if (!b) return false;
  const edge = edgeOf(b, dir);
  return runTo(f.addr, edge, stepFrom(f.addr, edge, dir, null), false);
}

/**
 * Shift with ← or → at a reading scene's pane's span focus (`extendFromFocus`):
 * where the pane holds a selection its moving end is stepped that way in the
 * pane's own record, its anchor standing; else one step is selected from the
 * span's edge; each the pane's selection, said, its acts row drawn
 * (`selectIn`), none standing where the step brings the moving end back to
 * the anchor.
 * @param {Side} side
 * @param {import('../text/layer.js').ArrowStep} dir
 * @returns {boolean} false where the pane stands on no span, or its text holds nothing that way
 */
function extendFromFocusIn(side, dir) {
  const p = read.pane(side);
  if (!p || !p.article) return false;
  const e = paneNow(side), runs = p.d.runs;
  /** the pane's selection made to run from an anchor to where a step reached: none where the two meet */
  const runIn = (/** @type {number} */ anchor, /** @type {number | null} */ to) => {
    if (to == null) return false;
    if (to === anchor) { clear(side); return true; }
    select(p.names, Math.min(anchor, to), Math.abs(to - anchor), to < anchor ? 'start' : 'end', side);
    return true;
  };
  if (e && e.span.addr === p.names) {
    const { pos, width } = e.span, end = pos + width;
    const [anchor, moving] = e.moves === 'end' ? [pos, end] : [end, pos];
    return runIn(anchor, stepFrom(p.names, moving, dir, anchor, runs));
  }
  const b = p.focus != null ? p.d.blocks.find((x) => x.pos === p.focus) : null;
  if (!b) return false;
  const edge = edgeOf(b, dir);
  return runIn(edge, stepFrom(p.names, edge, dir, null, runs));
}

/**
 * The position a step from `pos` reaches in a document's text shown: a
 * character that way, an item whole (M-DERIVE's `boundaries`), or a word, no
 * further than the anchor (M-DERIVE's `wordStop`); null where it holds
 * nothing that way.
 * @param {string} addr
 * @param {number} pos
 * @param {import('../text/layer.js').ArrowStep} dir
 * @param {number | null} anchor the anchor of the selection the step extends; null where it extends none
 * @param {import('../model/records.js').Run[]} [runs] the text's runs: a reading scene's pane's own record's where given, else the text the page shows of the document
 * @returns {number | null}
 */
function stepFrom(addr, pos, dir, anchor, runs = LAYER.shownOf(addr).runs) {
  if (dir === 'wordLeft' || dir === 'wordRight') return wordStop(runs, pos, dir === 'wordLeft' ? -1 : 1, anchor);
  const b = boundaries(runs, pos);
  return dir === 'left' ? b.before : b.after;
}

/**
 * The selection made to run from an anchor to the position its moving end
 * stepped to (`extendFromFocus`), that end the one the press moved; none
 * where the two meet (`clear`).
 * @param {string} addr
 * @param {number} anchor
 * @param {number | null} to null where no step was made: nothing changes
 * @param {boolean} platform the platform made the selection the step extends (`Ends`)
 * @returns {boolean} whether the selection changed
 */
function runTo(addr, anchor, to, platform) {
  if (to == null) return false;
  if (to === anchor) { clear(); return true; }
  /** @type {'start' | 'end'} */
  const moved = to < anchor ? 'start' : 'end';
  take({ addr, pos: Math.min(anchor, to), width: Math.abs(to - anchor) }, moved, { moves: moved, platform, across: false });
  return true;
}

/**
 * Clear a site's selection: the plane's with the platform's highlight, its
 * own card or "which" list (`ownAt`) and its marks; a pane's with its marks,
 * its acts row and its own list (`endPane`), the platform's selection
 * standing over its text collapsed where it stood (T-LAYER's `unselectIn`).
 * @param {Site} [site] the plane's where none is named
 */
export function clear(site = 'plane') {
  if (site !== 'plane') { const art = articleOf(site); if (art) LAYER.unselectIn(art); endPane(site); return; }
  if (!sel) return;
  hold(null);
  LAYER.placeSelection(null);
  if (ownAt('plane')) HOST.dismiss();
  markDirty();
}

const SLOTS = /** @type {const} */ ([
  ['annotate', 'D5.annotate', 'Mod+Shift+A'],
  ['quote', 'D5.quote', 'Mod+Shift+C'],
  ['wrote', 'B1.who-wrote', 'Mod+Shift+O'],
  ['uses', 'B1.who-uses', 'Mod+Shift+R'],
  ['links', 'B1.see-links', 'Mod+Shift+L'],
  ['follow', 'B1.follow', 'Mod+Enter'],
  ['scene', 'B1.side-by-side', 'Mod+Shift+Enter'],
  ['linkto', 'D5.link-to', 'Mod+K'],
]);

/** @typedef {'annotate' | 'quote' | 'linkto'} InertSlot a slot inert with its reason (`INERT_REASON`) */
/** @typedef {'wrote' | 'uses' | 'links' | 'follow' | 'scene'} LiveSlot a slot that acts (`act`) */
/** @typedef {'follow' | 'scene'} FarSlot a slot that goes where the span's words lead (`targetsAt`): inert over a span they lead nowhere from, its reason `NEW_WORDS` where the span is wholly of words the page made, else `NO_LINK` */

/** the reasons the slots no lane has built yet give, by slot: what each gives where nothing stops it */
const INERT_REASON = /** @type {Record<InertSlot, string>} */ ({ annotate: 'L.seam.annotate', quote: 'L.seam.quote', linkto: 'L.seam.link-to' });
/** why follow and read side by side do nothing over a span wholly of words the page made that no link is drawn at: nothing can reach a byte the board has not minted, and once it has, the links made on it since are drawn */
const NEW_WORDS = 'L.new.no-link';
/** why follow and read side by side do nothing over any other span their words lead nowhere from (`targetsAt`): no link drawn there, and for follow no run of another document's material */
const NO_LINK = 'B3.row.no-link';

/** @typedef {{id: string, text: string, runs?: import('../strings.js').Run[]}} Reason a slot's reason: its string, its words as the slot gives them, and those words as stretches in their faces where they name a draft — its name kept as written in what is spoken */

/** an inert slot's own reason, by its string's id: the words the slot gives as it is activated where no hold stands (P47) */
export const reasonOf = (/** @type {InertSlot} */ slot) => INERT_REASON[slot];

/** the string each reason a board's drafts cannot be written for answers a slot that sends by (W-WRITE's `Unwritable`; B3-S13; P72): that surface's own line */
const SURFACE_REASON = /** @type {Record<import('../write/write.js').Unwritable['why'], (detail: string | null | undefined) => string>} */ ({
  keyless: () => 'B3.keyless', another_window: () => 'B3.another_window', held_full: () => 'B3.held_full.line', death: () => 'B3.death.caret',
  store_halted: (detail) => (detail === 'damaged' ? 'B3.store_halted.damaged' : 'B3.store_halted.newer'),
});

/**
 * The reason a slot that sends gives while its document's words cannot go to
 * the board (foundations §3.1; P47, P72; D6 BM-62): where the board's drafts
 * cannot be written at all, that surface's own line, first (W-WRITE's
 * `unwritable`); else the row rule's, keyed on what ends the state — where a
 * held line awaits the person's act or stands moved, or the page keeps a
 * refusal of the draft, an act of the person's comes first; else a resend
 * follows. Read from W-WRITE's record alone; null where the draft holds no
 * such word and its board can be written.
 * @param {string} addr
 * @returns {Reason | null}
 */
function heldReason(addr) {
  const block = WRITE.unwritable(addr), b = REC.board();
  if (block) { const id = SURFACE_REASON[block.why](block.detail); return { id, text: t(id, { board: b ? t('L.mirror.board.name', { node: '1', origin: b.origin }) : '' }) }; }
  const rows = WRITE.heldOf(addr), islands = WRITE.islandsOf(addr);
  if (!rows.length && !islands.length) return null;
  const acts = islands.length > 0 || rows.some((r) => r.cause === 'moved' || (!!r.refusal && !['head_unreadable', 'session_died'].includes(r.refusal.name)));
  const id = acts ? 'B3.row.held.resolve' : 'B3.row.held.resend', name = LAYER.boxName(addr);
  return { id, text: t(id, { label: name.name }), runs: tRuns(id, { label: name.runs }) };
}

/**
 * The reason a slot gives over a span; null where the slot acts. A slot that
 * sends a name for characters (`InertSlot`): under a hold the row rule's
 * (`heldReason`), else its own — at a reading scene's pane, the held
 * version's reason where the pane holds it (`Readers.heldReason`), the row
 * rule's at a draft's editor alone. Follow and read side by side (`FarSlot`)
 * where the span's words lead nowhere (`targetsAt`): `NEW_WORDS` over a span
 * wholly of words the page made (`madeAt`), else `NO_LINK`.
 * @param {string} slot
 * @param {Span} span
 * @param {number} [n] the slot's targets at the span, where the caller has counted them (`countOf`)
 * @param {Site} [site] the site the span is of: the plane's where none is named
 * @returns {Reason | null}
 */
function reasonAt(slot, span, n, site = 'plane') {
  const p = site === 'plane' ? null : read.pane(site);
  if (slot in INERT_REASON) {
    const id = INERT_REASON[/** @type {InertSlot} */ (slot)], own = { id, text: t(id) };
    if (!p) return heldReason(span.addr) || own;
    const held = p.kind === 'held' ? read.heldReason(/** @type {Side} */ (site)) : null;
    return held ? { id: held, text: t(held) } : p.kind === 'editor' ? heldReason(span.addr) || own : own;
  }
  if (slot !== 'follow' && slot !== 'scene') return null;
  if (n ?? countOf(targetsAt(slot, span, site))) return null;
  const id = madeAt(span, site) ? NEW_WORDS : NO_LINK;
  return { id, text: t(id) };
}

/**
 * Is every byte of a span one the page made (see the head): on the plane and
 * at a draft's editor, of the text shown (T-LAYER's `madeHere`); at the held
 * version, every byte its record's image names by the page's own identity
 * (M-REC's `isPage`); at any other pane none, its text the board's.
 * @param {Span} span
 * @param {Site} site
 * @returns {boolean}
 */
function madeAt(span, site) {
  const p = site === 'plane' ? null : read.pane(site);
  if (!p || p.kind === 'editor') return LAYER.madeHere(span.addr, span.pos, span.width);
  if (p.kind !== 'held') return false;
  const ids = REC.identityIn(p.d.image, span.pos, span.width);
  return ids.length > 0 && ids.every((i) => REC.isPage(i.prefix));
}

/**
 * @typedef {Object} Targets — the far places a slot that goes where a span's words lead goes to (`targetsAt`)
 * @property {Shown[]} links the links drawn at the span (LK's `shownAt`), in LK's order
 * @property {Source[]} sources follow's alone: each source of the runs of other documents' material the span meets, once, in reading order (T-ARTICLE's `sourcesIn`); none for read side by side
 */

/**
 * Where a slot's act at a span goes (see the head; D5 K-51, K-52): for
 * follow, each link drawn at the span, then each source of the runs of other
 * documents' material it meets, once, in reading order — a withheld run's
 * among them, read over the text the page shows of the span's document
 * (T-LAYER's `shownOf`), none where the model holds no record of it; for
 * read side by side, the links drawn there alone. At a reading scene's pane,
 * the links its article draws where they meet the span (LK's `shownAt` over
 * `PaneAt.marks`), the sources read over its own record; none where no scene
 * stands to hold it.
 * @param {FarSlot} slot
 * @param {Span} span
 * @param {Site} [site] the site the span is of: the plane's where none is named
 * @returns {Targets}
 */
function targetsAt(slot, span, site = 'plane') {
  if (site !== 'plane') {
    const p = read.pane(site);
    return p ? { links: LK.shownAt(span.addr, span, p.marks), sources: slot === 'follow' ? sourcesIn(p.d, span) : [] } : { links: [], sources: [] };
  }
  const sources = slot === 'follow' && REC.has(span.addr) ? sourcesIn(LAYER.shownOf(span.addr), span) : [];
  return { links: LK.shownAt(span.addr, span), sources };
}

/** how many far places a slot's targets are (`targetsAt`) */
const countOf = (/** @type {Targets} */ tg) => tg.links.length + tg.sources.length;

/**
 * What a slot going where the span's words lead names after its own words
 * (see the head): its one target — a link's far document, a source's origin,
 * a withheld source's "withheld · ⟨owner⟩", its owner by the one owner rule
 * (T-LAYER's `originOwner`); the count of several; nothing where it has
 * none, or its one link names no far document.
 * @param {Targets} tg
 * @returns {string} words, led by a space where it names anything
 */
function targetWords(tg) {
  const n = countOf(tg), [link] = tg.links, [src] = tg.sources;
  if (n > 1) return ` ${n}`;
  if (link) return link.far ? ` ${link.far}` : '';
  if (!src) return '';
  return ' ' + (src.withheld ? t('F.corner.withheld', { owner: LAYER.originOwner(src.origin) }) : src.origin);
}

/** `targetWords` as markup, each address in the identifier's face */
function targetLabel(/** @type {Targets} */ tg) {
  const n = countOf(tg), [link] = tg.links, [src] = tg.sources;
  if (n > 1) return ` ${n}`;
  if (link) return link.far ? ` <span class="id">${esc(link.far)}</span>` : '';
  if (!src) return '';
  return ' ' + (src.withheld ? tHTML('F.corner.withheld', { owner: LAYER.originOwner(src.origin) }, { owner: 'id' }) : `<span class="id">${esc(src.origin)}</span>`);
}

/** an inert slot's reason said through the status region, at every press (rule 14): said again where the region holds those words already — the reason a press gave a moment ago, here or at another passage */
const sayReason = (/** @type {Reason} */ reason) => FOCUS.say(reason.runs || reason.text, false, true);

/**
 * An inert slot activated (P47; rule 14): it keeps its place, marked inert,
 * and gives its reason — at the slot, in the card's reason line, and through
 * the status region (`sayReason`).
 * @param {HTMLElement} el the slot's button
 * @param {Reason} reason
 */
function inertAct(el, reason) {
  el.setAttribute('data-inert', '1');
  const card = el.closest('.selection-card');
  const line = card ? /** @type {HTMLElement | null} */ (card.querySelector('.reason')) : null;
  if (line) { line.textContent = reason.text; line.dataset.string = reason.id; line.hidden = false; }
  sayReason(reason);
}

/**
 * Rebuild the acts card (FP-13) at the selection, else at the span a slot's
 * act was made over, which the card holds (see the head; `About.at`), its
 * slots acting there; nothing where neither is given. The card takes no
 * focus (rule 15), save a card a return reopens on the control it was left
 * holding it on. A slot named `told` stands as `inertAct` leaves it: marked
 * inert, its reason in the card's reason line. A slot that gives a reason
 * over the span (`reasonAt`) keeps its place, inert and focusable, the
 * reason its title — follow and read side by side where the span's words
 * lead nowhere (`targetsAt`), each else naming its one target or the count
 * of several (`targetLabel`); a slot that sends a name for characters takes
 * effect through `send` — at a reading scene's pane it gives its reason at
 * once (`reasonAt`). At a pane the card is that pane's acts row: anchored in
 * the pane's article, naming the pane in what it is about (`About.site`), its
 * slots acting there, its dismissal ending the pane's selection where it
 * stands at it — never where the focus moved off the pane (`rowOff`).
 * @param {string | null} [focus] that control's key (O-HOST's `keyOf`)
 * @param {InertSlot | FarSlot | null} [told] the inert slot whose reason the card gives
 * @param {Span | null} [at] the span a slot's act was made over (`actedOn`); none draws the card at the site's selection
 * @param {Site} [site] the site the card stands at: the plane's where none is named
 */
export function render(focus = null, told = null, at = null, site = 'plane') {
  const own = site === 'plane' ? sel : paneSel[site] ? /** @type {PaneSel} */ (paneSel[site]).span : null;
  const span = at || own;
  if (!span) return;
  const { addr, pos } = span, atSelection = sameSpan(span, own), pane = site === 'plane' ? null : site;
  const follows = targetsAt('follow', span, site);
  /** @type {Record<FarSlot, Targets>} where follow and read side by side go from the span: the links drawn there, and for follow the sources after them */
  const far = { follow: follows, scene: { links: follows.links, sources: [] } };
  /** the targets a slot counts: a far slot's, none for any other */
  const counted = (/** @type {string} */ id) => (id === 'follow' || id === 'scene' ? countOf(far[id]) : undefined);
  const buttons = SLOTS.map(([id, strId, chord]) => {
    const reason = reasonAt(id, span, counted(id), site), target = id === 'follow' || id === 'scene' ? far[id] : null;
    const label = esc(t(strId)) + (target ? targetLabel(target) : '');
    const why = reason ? ` title="${esc(reason.text)}" aria-description="${esc(heard(reason.runs || reason.text))}"` : '';
    return `<button data-run="${id}" class="${reason ? 'inert' : ''}" aria-label="${esc(heard(t(strId) + (target ? targetWords(target) : '')))}" aria-keyshortcuts="${esc(keyShortcut(chord))}"${why}${id === told ? ' data-inert="1"' : ''}>${label}${chord ? ` <kbd>${esc(drawChord(chord))}</kbd>` : ''}</button>`;
  }).join('');
  const said = told ? reasonAt(told, span, counted(told), site) : null;
  const reasonLine = said ? `<div class="note reason" data-string="${esc(said.id)}">${esc(said.text)}</div>` : '<div class="note reason" hidden></div>';
  const html = `<div class="selection-card"><span class="label"><span class="id">${esc(addr)}</span> · ${esc(t('F.position', { p: pos }))}</span><div class="slots">${buttons}</div>${reasonLine}</div>`;
  /** an inert slot pressed: at a pane its reason at once, else through `send` */
  const sends = (/** @type {InertSlot} */ slot) => (/** @type {HTMLElement} */ el) => { if (pane) inertAct(el, /** @type {Reason} */ (reasonAt(slot, span, undefined, site))); else void send(slot, span, el); };
  HOST.show({
    kind: 'card', id: 'selection', anchor: { span: pane ? { ...span, site: pane } : span }, html, takeFocus: focus != null, first: focus != null ? HOST.controlOf(focus) : undefined,
    about: { kind: 'selection', ...(atSelection ? {} : { at: bytesOf(span, site) }), ...(pane ? { site: pane } : {}) },
    acts: {
      annotate: sends('annotate'), quote: sends('quote'), linkto: sends('linkto'),
      wrote: (_el, byKey) => act('wrote', byKey, span, site), uses: (_el, byKey) => act('uses', byKey, span, site), links: (_el, byKey) => act('links', byKey, span, site),
      follow: (el, byKey) => { const r = reasonAt('follow', span, undefined, site); if (r) inertAct(el, r); else act('follow', byKey, span, site); },
      scene: (el, byKey) => { const r = reasonAt('scene', span, undefined, site); if (r) inertAct(el, r); else act('scene', byKey, span, site); },
    },
    onDismiss: (replaced) => {
      if (replaced || moving || !atSelection) return;
      if (pane) { if (paneSel[pane] && sameSpan(/** @type {PaneSel} */ (paneSel[pane]).span, span)) clear(pane); return; }
      if (sameSpan(sel, span)) { hold(null); LAYER.placeSelection(null); markDirty(); }
    },
  });
}

/**
 * The span a slot acts on (see the head): on the plane the selection, else
 * the walk's focused span whole (D5 §1.6) — a block of the text shown, at a
 * live caret the one the caret is in, the block T-LAYER draws lit; at a
 * reading scene's pane its selection, else the span its span focus stands on
 * whole, a block of the pane's own record — which nothing selects: the card
 * or the list the act opens holds it; null where no span is in focus.
 * @param {Site} [site] the focused site's where none is named (`focusedSite`)
 * @returns {Span | null}
 */
function actedOn(site = focusedSite()) {
  if (site !== 'plane') {
    const e = paneNow(site), p = read.pane(site);
    if (e) return { ...e.span };
    const b = p && p.focus != null ? p.d.blocks.find((x) => x.pos === p.focus) : null;
    return p && b ? spanOfBlock(p.names, b) : null;
  }
  if (sel) return sel;
  const f = WALK.current();
  return f && f.kind === 'block' && f.pos != null ? wholeShown(f.addr, f.pos) : null;
}

/**
 * A slot's act (by chord or by its button), on the span the slots act on
 * (`actedOn`) — a slot of the card on the span the card stands at; off a
 * span, at a link's stop of the walk, follow and read side by side act on
 * that link at its end's own bytes (K-51, K-52; D5 §4 rule 6), and "see the
 * links" asks for the links at the document the walk stands in, at its own
 * stop or a link's in it (K-49). "who wrote this?" and "who uses this?" name
 * their span as the selection's bytes only where it is the selection. Follow
 * and read side by side go where the span's words lead (`targetsAt`): where
 * they lead nowhere they give their reason (`reasonAt`) — the card drawn at
 * the span, the slot marked and the reason in its line, said through the
 * status region; at one target follow goes there — a link followed, a source
 * reached (`toSource`) — and read side by side opens its link's scene; at
 * several they ask which (`which_`). The act's card takes the focus where a
 * key made the act (rule 16). At a reading scene's pane each acts in the
 * pane's own text (see the head; `actedOn`), O-PROV told the pane
 * (`provPane`), the links card its marks, follow its site, and nothing acts
 * off a span there.
 * @param {LiveSlot} which
 * @param {boolean} [byKey] a key made the act: the card takes the focus
 * @param {Span | null} [at] the span the card whose slot made the act stands at; none for a chord, which acts on the span in focus
 * @param {Site} [site] the site the act is made at: the focused site's where none is named (`focusedSite`)
 * @returns {boolean} false where nothing in focus is what the slot acts on — no span, no link's stop for follow and read side by side, and for "see the links" no document: nothing is shown, and the caller gives the reason where the focus is (D5 §1.6)
 */
export function act(which, byKey = false, at = null, site = focusedSite()) {
  const span = at || actedOn(site), pane = site === 'plane' ? null : site, p = pane ? read.pane(pane) : null;
  if (!span) {
    if (pane) return false;
    const f = WALK.current(), end = f && f.kind === 'link' ? f.link : null;
    if (which === 'links' && f && (f.kind === 'document' || end)) LINKS.show(f.addr, byKey);
    else if (which === 'follow' && end) GO.follow(end, byKey);
    else if (which === 'scene' && end) sceneFrom(end, { addr: end.near, pos: end.pos, width: end.width });
    else return false;
    return true;
  }
  const { addr, pos, width } = span, own = pane ? (paneSel[pane] ? /** @type {PaneSel} */ (paneSel[pane]).span : null) : sel, selected = sameSpan(span, own);
  if (which === 'wrote') { PROV.wrote(addr, pos, width, byKey, selected, provPane(pane)); return true; }
  if (which === 'uses') { PROV.uses(addr, pos, width, byKey, selected, provPane(pane)); return true; }
  if (which === 'links') { LINKS.show(addr, byKey, pane && p ? { site: pane, span, marks: p.marks, kind: p.kind, d: p.d } : null); return true; }
  const tg = targetsAt(which, span, site), n = countOf(tg), reason = reasonAt(which, span, n, site), [one] = tg.links;
  if (reason) { render(null, which, span, site); sayReason(reason); }
  else if (n > 1) which_(tg, which, span, byKey, null, site);
  else if (!one) toSource(span, tg.sources[0], byKey, undefined, site);
  else if (which === 'follow') GO.follow(one, byKey, endAt(one, span, pane));
  else sceneFrom(one, span, site);
  return true;
}

/**
 * Where a follow made at a reading scene's pane stands its faces (N-GO's
 * `follow` at a site): the link's own bytes in that pane's article, named as
 * the pane's acts name the span the act was made over (T-LAYER's
 * `Made.addr`); null on the plane, where the follow stands them itself.
 * @param {Shown} end the link's end drawn there
 * @param {Span} span the span the act was made over
 * @param {Side | null} pane
 * @returns {import('../nav/trail.js').Site | null}
 */
const endAt = (end, span, pane) => (pane ? { span: { addr: span.addr, pos: end.pos, width: end.width, site: pane } } : null);

/**
 * The pane O-PROV asks a card at (O-PROV's `Pane`): its side, what text it
 * holds and the record it shows; null on the plane, and where no scene
 * stands to hold it.
 * @param {Side | null} side
 * @returns {import('./provenance.js').Pane | null}
 */
function provPane(side) {
  const p = side ? read.pane(side) : null;
  return side && p ? { side, kind: p.kind, d: p.d } : null;
}

/**
 * Follow to a source of the span's words (see the head; D5 K-51): a LEAP that
 * is follow's (N-GO's `leapTo`'s `source`) to the source, carrying its words
 * alone — `parts`, the span's positions its runs hold, joined (N-GO's
 * `Carry.parts`; foundations §2.3) — named as what the reader selected where
 * the span is the selection, else as the text they were reading, made at the
 * span, where the face of a failure known at the act stands. From a reading
 * scene's pane the carry names its parts' bytes by identity through the
 * pane's image (N-GO's `Carry.ids`), its positions the pane's own, and the
 * face stands at the pane.
 * @param {Span} span
 * @param {Source} src
 * @param {boolean} byKey a key made the act
 * @param {Array<{pos: number, width: number}>} [parts] the source's parts where its bytes stand as the act is made; its own where none are handed in
 * @param {Site} [site] the site the span is of: the plane's where none is named
 */
function toSource(span, src, byKey, parts = src.parts, site = 'plane') {
  const first = parts[0], last = parts[parts.length - 1], pane = site === 'plane' ? null : site;
  const own = pane ? (paneSel[pane] ? /** @type {PaneSel} */ (paneSel[pane]).span : null) : sel;
  const ids = pane ? { ids: parts.map((x) => bytesOf({ addr: span.addr, pos: x.pos, width: x.width }, pane).ids) } : {};
  void GO.leapTo(src.origin, { how: 'leap', byKey, source: true, carry: { addr: span.addr, pos: first.pos, width: last.pos + last.width - first.pos, parts, selected: sameSpan(span, own), ...ids }, site: { span: pane ? { ...span, site: pane } : span } });
}

/**
 * The reading scene opened from a link's end beside the passage held at it
 * (K-52; N-GO's `toScene`): a step on the trail from that end, its first pane
 * on what the page shows of the passage's document (T-LAYER's `paneSource`),
 * beside the document LK names for it (`besideAt`), the passage set level with where the
 * far end stands there (`farPos`) — or, where the far end names its document
 * whole, with nothing of it (SC's `Held.wholeB`; FP-30). From a reading
 * scene's pane its first pane is the text that pane shows (`paneText`), the
 * passage held by its bytes through the pane's image (SC's `Held.ids`).
 * Nothing where the far end names no document.
 * @param {import('../links/links.js').Shown} s the link's end drawn at the passage
 * @param {Span} span the passage held: the selection, or the end's own bytes
 * @param {Site} [site] the site the passage is of: the plane's where none is named
 */
function sceneFrom(s, span, site = 'plane') {
  if (!s.far) return;
  const pane = site === 'plane' ? null : site, ids = pane ? { ids: bytesOf(span, pane).ids } : {};
  void GO.toScene(pane ? paneText(pane, span.addr) : LAYER.paneSource(span.addr), LK.besideAt(s), { posA: span.pos, widthA: span.width, posB: LK.farPos(s), wholeB: s.farWhole, ...ids }, { from: { shown: s }, site: { span: pane ? { ...span, site: pane } : span } });
}

/**
 * The text a reading scene opened from a pane opens its first pane on (SC's
 * `Source`): a record the page derived — a past state, the held version, a
 * draft's text with its page-local edits — as the pane shows it; else the
 * document the pane's acts name, read from the board.
 * @param {Side} side
 * @param {string} addr the address the pane's acts name
 * @returns {string | import('../model/records.js').Doc}
 */
function paneText(side, addr) {
  const p = read.pane(side);
  return p && p.d.derived ? p.d : addr;
}

/**
 * The chord of a slot that sends a name for characters (D5 K-45, K-46,
 * K-100; P47): made on the span the slots act on on the plane (`actedOn`),
 * selecting nothing, through `send`. False where no span is in focus: nothing
 * is shown, and the caller gives the reason where the focus is.
 * @param {InertSlot} slot
 * @returns {boolean}
 */
export function inertChord(slot) {
  const span = actedOn('plane');
  if (!span) return false;
  void send(slot, span);
  return true;
}

/** @type {Promise<void>} the latest act of a slot that sends, settled once it has taken effect or been given up (`send`) */
let sending = Promise.resolve();
/** the latest act of a slot that sends a name for characters, settled once it has taken effect (`send`): what the gate and the tests wait on */
export const sent = () => sending;

/**
 * An act that sends a name for characters, made at a slot or by its chord
 * (foundations §3.1's row rule; D5 K-73; P46): it names the characters as the
 * board holds them, so it takes effect only once the board holds them. While
 * a burst of the span's draft is open or awaits its ack (W-WRITE's `inFlight`)
 * it asks for the burst's commit and waits for it to land — no mark, no word
 * and no focus moved meanwhile — the span held by its bytes, so the keys typed
 * meanwhile move it with its words; then, and at once where nothing is in
 * flight, it takes effect on the span where its bytes stand: while the draft
 * holds a line the board has not kept the slot stands inert with the row
 * rule's reason (`heldReason`), else the slot's own surface opens — until its
 * lane builds one, its place in the acts card with the slot's own reason
 * (`INERT_REASON`). The reason is given at the slot pressed where its card
 * still stands, else in the card drawn at the span, and through the status
 * region; the card takes no focus (rule 15). Nothing where the span's bytes
 * are gone once the burst lands.
 * @param {InertSlot} slot
 * @param {Span} span the span the act was made over
 * @param {HTMLElement | null} [el] the slot's button, where it was pressed
 * @returns {Promise<void>} settled once the act has taken effect
 */
function send(slot, span, el = null) {
  sending = (async () => {
    let at = span;
    if (!heldReason(span.addr) && WRITE.inFlight(span.addr)) {
      const held = bytesOf(span);
      WRITE.commit(span.addr);
      await WRITE.landed(span.addr);
      const now = held.ids.length ? LAYER.placedShown(span.addr, held.ids) : [];
      if (held.ids.length && !now.length) return;
      if (now.length) at = { addr: span.addr, pos: now[0].pos, width: now[now.length - 1].pos + now[now.length - 1].width - now[0].pos };
    }
    const reason = /** @type {Reason} */ (reasonAt(slot, at));
    if (el && el.isConnected && sameSpan(at, span)) { inertAct(el, reason); return; }
    render(null, slot, at);
    sayReason(reason);
  })();
  return sending;
}

/**
 * The "which" list at two or more targets (`targetsAt`), at the span the act
 * was made over — the selection, else the span the list holds (see the head;
 * `About.at`), each row's scene opened from it: the links' rows first, each
 * choice by its type, its linker and its far document (foundations §2.3),
 * named as its tail and its mirror item name it, each address in the
 * identifier's face (LK's `farLabelHTML`); then follow's row per source, in
 * reading order (`sourceRowHTML`), its act the follow to that source with its
 * parts placed where their bytes stand as the act is made (`heldParts`); it
 * takes the focus on its first row where a key asked, and on the control a
 * return reopens it holding it on. At a reading scene's pane it stands in the
 * pane's article, its rows acting there (see the head), a source's parts as
 * the act found them, the pane's text moving under no edit of the person's
 * but an editor's.
 * @param {Targets} tg
 * @param {'follow' | 'scene'} what
 * @param {Span} span the span the act was made over
 * @param {boolean} byKey
 * @param {string | null} [focus] the reopened list's control's key
 * @param {Site} [site] the site the span is of: the plane's where none is named
 */
function which_(tg, what, span, byKey, focus = null, site = 'plane') {
  const pane = site === 'plane' ? null : site, p = pane ? read.pane(pane) : null, own = pane ? (paneSel[pane] ? /** @type {PaneSel} */ (paneSel[pane]).span : null) : sel;
  /** a link's row's name as stretches: its type, its linker and its far document, the link's symbol kept out (patterns K1) */
  const linkRuns = (/** @type {Shown} */ s) => /** @type {import('../strings.js').Run[]} */ ([{ text: `${typeName(s.link.type)} · `, face: 'client' }, { text: s.link.owner || '', face: 'ident' }, { text: ' · ', face: 'client' }, ...LK.farLabelRuns(s)]);
  const links = tg.links.map((s, i) => `<li><button data-run="w${i}" style="--mark-hue:${s.mark.hue}" aria-label="${esc(heard(linkRuns(s)))}"><span class="sym-mark">⟡</span> ${esc(typeName(s.link.type))} · <span class="id">${esc(s.link.owner || '')}</span> · ${LK.farLabelHTML(s)}</button></li>`);
  const sources = tg.sources.map((src, i) => `<li><button data-run="s${i}" aria-label="${esc(heard(sourceRowRuns(span.addr, src, p)))}">${sourceRowHTML(span.addr, src, p)}</button></li>`);
  const html = `<span class="label">${esc(t(what === 'follow' ? 'B1.follow' : 'B1.side-by-side'))}</span><ul class="rows">${[...links, ...sources].join('')}</ul>`;
  /** @type {Record<string, import('./host.js').Act>} */
  const acts = {};
  tg.links.forEach((s, i) => { acts['w' + i] = (_el, byKey) => { if (what === 'follow') GO.follow(s, byKey, endAt(s, span, pane)); else sceneFrom(s, span, site); }; });
  tg.sources.forEach((src, i) => { const parts = p && p.kind !== 'editor' ? () => src.parts : heldParts(span.addr, src); acts['s' + i] = (_el, byKey) => toSource(span, src, byKey, parts(), site); });
  HOST.show({
    kind: 'list', id: 'which', anchor: { span: pane ? { ...span, site: pane } : span }, html, acts, takeFocus: byKey || focus != null, first: focus != null ? HOST.controlOf(focus) : undefined,
    about: { kind: 'which', what, ...(sameSpan(span, own) ? {} : { at: bytesOf(span, site) }), ...(pane ? { site: pane } : {}) },
  });
}

/**
 * A source's row in the "which" list (see the head): the words of the span
 * its runs hold, by their first words (T-LAYER's `firstWords`) — its first
 * part's position where they hold none — then its origin as the column's
 * edge names it, its mark and its address, in one stretch of the selection
 * named by its words (`L.run.named`); a withheld source's origin's address,
 * then "withheld · ⟨owner⟩" in its words' place, as a link's row names a
 * withheld far end (LK's `farLabelHTML`; ST's `withheldLine`), its owner by
 * the one owner rule (T-LAYER's `originOwner`).
 * @param {string} addr the span's document
 * @param {Source} src
 * @param {PaneAt | null} [p] the reading scene's pane the span is of, whose own record its words are read from; none on the plane
 * @returns {string} markup, each address in the identifier's face
 */
function sourceRowHTML(addr, src, p = null) {
  if (src.withheld) return facedHTML([{ text: src.origin, face: 'ident' }, { text: ' · ', face: 'client' }, ...withheldLine(LAYER.originOwner(src.origin))]);
  const [first] = src.parts, words = wordsIn(addr, first, p) || t('F.position', { p: first.pos });
  return fill(esc(t('L.run.named')), { words: esc(words), answer: `${esc(t('L.origin-mark'))} <span class="id">${esc(src.origin)}</span>` });
}

/** the first words of a stretch of a site's text (T-LAYER's `firstWords`): a reading scene's pane's own record's where it is of one; '' where it holds none */
function wordsIn(/** @type {string} */ addr, /** @type {{pos: number, width: number}} */ at, /** @type {PaneAt | null} */ p) {
  return p ? LAYER.firstWordsOf(REC.textOf(p.d.runs, at.pos, at.pos + at.width)) : LAYER.firstWords(addr, at.pos, at.width);
}

/**
 * A source's row's words as stretches in their faces (`sourceRowHTML`): the
 * words of the span its runs hold the reading face's, kept as written in its
 * name (ST's `heard`); its origin's address the identifier's.
 * @param {string} addr the span's document
 * @param {Source} src
 * @param {PaneAt | null} [p] the reading scene's pane the span is of (`wordsIn`); none on the plane
 * @returns {import('../strings.js').Run[]}
 */
function sourceRowRuns(addr, src, p = null) {
  if (src.withheld) return [{ text: src.origin, face: 'ident' }, { text: ' · ', face: 'client' }, ...withheldLine(LAYER.originOwner(src.origin))];
  const [first] = src.parts, words = wordsIn(addr, first, p);
  return tRuns('L.run.named', { words: words ? [{ text: words, face: 'reading' }] : t('F.position', { p: first.pos }), answer: [{ text: `${t('L.origin-mark')} `, face: 'client' }, { text: src.origin, face: 'ident' }] });
}

/**
 * A source's parts held by their bytes for its row's act (see the head): as
 * they stood where the document's page-local edits have not changed since the
 * list opened (W-WRITE's `editRev`) — so bytes the text holds again elsewhere
 * never stretch a part — else placed, as the act is made, where those bytes
 * stand in the text shown, each from its first stretch to the end of its
 * last, so the person's edits move them with their words; a part as it
 * stood where its bytes were not named or none stands.
 * @param {string} addr the span's document
 * @param {Source} src
 * @returns {() => Array<{pos: number, width: number}>}
 */
function heldParts(addr, src) {
  const rev = WRITE.editRev(addr), ids = src.parts.map((p) => LAYER.shownIdentity(addr, p.pos, p.width));
  return () => (WRITE.editRev(addr) === rev ? src.parts : src.parts.map((p, i) => {
    const now = ids[i].length ? LAYER.placedShown(addr, ids[i]) : [], last = now[now.length - 1];
    return last ? { pos: now[0].pos, width: last.pos + last.width - now[0].pos } : p;
  }));
}
