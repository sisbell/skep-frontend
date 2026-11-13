// O-SELECTION — the selection and its acts in fixed slots (the structure
// record §3.2; foundations §3.1; D5 §1.6). Layer 2. ENGINE-BOUND. State
// (FP-10): the selection, how Shift with ← or → moves its ends (`ends`), its
// bytes as it was set, which the person's edits elsewhere carry it by
// (`stood`, `carry`), and the latest act of a slot that sends (`sending`);
// T-LAYER reads the selection through the reader handed in.
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
// selection made is said through the status region (D4). The card is
// dismissed with the selection it stands at; an act's card taking the acts'
// place is a replacement, not a dismissal, and the selection stands under it.
// The focus and the mirror stay at block grain (D5-F11).
// The selection is a surface of its place (FP-36): leaving the place ends
// it (N-GO's departure, `clear`), which keeps it by its bytes' identity
// (`asLeft`), its card and the "which" list by what they are about (O-HOST's
// `about`); the return puts it back over the bytes it holds in the text then
// (`restore`) — the card where it stood, the list over its targets counted
// again — each taking the focus on the control it was left holding it on. A
// card or a list holding a span stands on that span alone: a return, or its
// box's taking another version, reopens it over the bytes that text holds of
// it, nothing selected (`reopen`). A version move leaves no place: the
// selection stands beside it, and once its box shows another version N-GO's
// re-check carries it — its card or its list drawn again with it — over the
// bytes that version holds of it (`restore`), saying nothing where the move's
// own landing says it (N-GO's `surfacesAcross`; FP-22).
// Rules: FP-1, FP-2, FP-7, FP-9, FP-10, FP-13, FP-20, FP-21, FP-22, FP-34, FP-36,
// FP-37, FP-40, FP-41.

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
import { extended, sameSpan, spanOfBlock } from '../text/span.js';
import { sourcesIn } from '../text/article.js';
import { boundaries, wordStop } from '../model/derive.js';
import { t, tHTML, tRuns, typeName, facedHTML, withheldLine, heard } from '../strings.js';
import { esc, fill, byteLength } from '../util.js';
import { markDirty } from '../plane/camera.js';
import { drawChord, keyShortcut } from '../nav/keys.js';

/** @typedef {import('../text/span.js').Span} Span */
/** @typedef {import('../links/links.js').Shown} Shown */
/** @typedef {import('../text/article.js').Source} Source */
/** @typedef {import('../model/records.js').ISpan} ISpan */
/** @typedef {import('../text/layer.js').SelectionEnd} SelectionEnd */

/** @typedef {{kind: 'selection', at?: Left} | {kind: 'which', what: 'follow' | 'scene', at?: Left}} About what the acts card and the "which" list are about (O-HOST's): the selection, which a departure keeps by its bytes (`asLeft`); else the span a slot's act was made over, which the card or the list holds alone (`at`; see the head) */

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

/** @type {{ids: ISpan[], rev: number} | null} the selection's bytes by identity as it was set, and how many times its document's page-local edits had changed then (W-WRITE's `editRev`): what it is carried by where they moved (`carry`) */
let stood = null;

/** the selection set, and how its ends move: the one place either is written, its bytes read with it */
function hold(/** @type {Span | null} */ span, /** @type {Ends} */ how = AT_START) {
  sel = span; ends = how;
  stood = span ? { ids: LAYER.shownIdentity(span.addr, span.pos, span.width), rev: WRITE.editRev(span.addr) } : null;
}

/**
 * The selection carried through the person's edits (see the head): where the
 * page-local edits of its document moved since it was set, it stands over
 * the span its bytes hold in the text shown now — from their first stretch to
 * the end of their last — the platform's highlight placed there and its own
 * card drawn again with it; where none of its bytes stand, or they were not
 * named, as it is.
 */
function carry() {
  if (!sel || !stood || WRITE.editRev(sel.addr) === stood.rev) return;
  stood.rev = WRITE.editRev(sel.addr);
  const now = stood.ids.length ? LAYER.placedShown(sel.addr, stood.ids) : [];
  if (!now.length) return;
  const span = { addr: sel.addr, pos: now[0].pos, width: now[now.length - 1].pos + now[now.length - 1].width - now[0].pos };
  if (sameSpan(span, sel)) return;
  const own = HOST.currentIs('selection') && sameSpan(/** @type {{span?: Span} | null} */ (HOST.currentState()?.anchor)?.span, sel);
  sel = span;
  LAYER.placeSelection(span);
  markDirty();
  if (own) render();
}

/** the selection, read-only (T-LAYER's reader): the one the screen draws, never a span a card or a list holds (see the head), where its bytes stand in the text shown now (`carry`) */
export function selected() { carry(); return sel; }

/** does the selection standing reach past its document into another document's text (`Ends.across`): N-KEYS' reading, no key at a caret replacing it */
export const reachesPast = () => !!sel && ends.across;

/** a span by its bytes as the page shows them now (`Left`): every byte named, one the page made by the page's own identity until the board mints it */
const bytesOf = (/** @type {Span} */ s) => ({ addr: s.addr, pos: s.pos, width: s.width, ids: LAYER.shownIdentity(s.addr, s.pos, s.width) });

/** the selection as the reader leaves its place (see the head): by its bytes' identity; null where none stands */
export const asLeft = () => (selected() ? bytesOf(/** @type {Span} */ (sel)) : null);

/**
 * The selection put back over the span its bytes hold in the text now — on
 * the reader's return to its place, or carried to the version its box shows
 * after a version change (see the head; N-GO's) — the platform's highlight
 * with it, said through the status region as a selection made is, save
 * where `say` is false; its card where it stood over it, or its "which" list
 * over its targets counted again at it (`targetsAt`) — the list where they
 * are two or more, else the card — each taking the focus on the control it
 * was left holding it on.
 * @param {Span} span
 * @param {import('./host.js').Left | null} left the card or the list standing over it as the reader left it; null where none of the selection's stood
 * @param {boolean} [say] the status region says where it stands: false where the landing that carried it says it
 */
export function restore(span, left, say = true) {
  hold(span);
  LAYER.placeSelection(span);
  markDirty();
  const a = left ? left.about : null, focus = left ? left.focus : null;
  if (a && a.kind === 'which') { const tg = targetsAt(a.what, span); if (countOf(tg) > 1) which_(tg, a.what, span, false, focus); else render(); }
  else if (a && a.kind === 'selection') render(focus);
  if (say) FOCUS.say(`${span.addr} · ${t('F.position', { p: span.pos })}`);
}

/**
 * A card or a "which" list holding the span a slot's act was made over (see
 * the head; `About.at`), reopened over the span its bytes hold in the text
 * now — on the reader's return to its place, or once its box shows another
 * version (N-GO's) — nothing selected: the list over its targets counted
 * again there (`targetsAt`), where they are two or more, else the card; each
 * taking the focus on the control it was left holding it on.
 * @param {{about: About, focus: string | null}} left
 * @param {Span} span where its bytes stand now
 */
export function reopen(left, span) {
  const a = left.about;
  if (a.kind !== 'which') { render(left.focus, null, span); return; }
  const tg = targetsAt(a.what, span);
  if (countOf(tg) > 1) which_(tg, a.what, span, false, left.focus); else render(null, null, span);
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
 * @param {string} addr
 * @param {number} pos the span's first position
 * @param {number | null} [width] positions; null selects the block at `pos` whole
 * @param {SelectionEnd | null} [moved] the end the act moved — K-8's extended end, the platform's focus point after a press; null for an act that moves none
 */
export function select(addr, pos, width = null, moved = null) {
  const span = width != null && width > 0 ? { addr, pos, width } : wholeShown(addr, pos);
  const platform = moved === 'focus', part = platform ? LAYER.movingPart() : null;
  take(span, moved, { moves: moved === 'start' || (platform && LAYER.selectionBackward()) ? 'start' : 'end', platform, across: platform && !(part && part.whole) });
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
 * FP-40), a position of its text shown: the caret standing there, live or
 * kept — the other end of a selection ending at it (`anchorAt`) — else the
 * end of the selection standing there that no step moves (`Ends`); null
 * where neither stands in the draft, the Shift+click then a click.
 * @param {string} addr
 * @returns {number | null}
 */
export function anchorIn(addr) {
  const c = LAYER.caret();
  if (c && c.addr === addr) return anchorAt(c);
  return sel && sel.addr === addr ? (ends.moves === 'end' ? sel.pos : sel.pos + sel.width) : null;
}

/**
 * K-8 (Shift+↓ / Shift+↑): the first press selects the walk's focused span
 * whole — a block of the text shown (T-LAYER's `blockByPos`) — and
 * nothing where the text shown holds no block there; each further press extends
 * the selection by a span of the text shown in the direction pressed, that
 * end the one the press moved (`select`). The focus stays on the walk's
 * element (rule 15).
 * @param {'down' | 'up'} [dir]
 */
export function selectFocused(dir = 'down') {
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
  const f = WALK.current(), s = selected();
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
 * stays on the walk's element (rule 15).
 * @param {import('../text/layer.js').ArrowStep} dir
 * @returns {boolean} false where the walk stands on no span, or the text holds nothing that way: nothing changes
 */
export function extendFromFocus(dir) {
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
 * The position a step from `pos` reaches in a document's text shown: a
 * character that way, an item whole (M-DERIVE's `boundaries`), or a word, no
 * further than the anchor (M-DERIVE's `wordStop`); null where it holds
 * nothing that way.
 * @param {string} addr
 * @param {number} pos
 * @param {import('../text/layer.js').ArrowStep} dir
 * @param {number | null} anchor the anchor of the selection the step extends; null where it extends none
 * @returns {number | null}
 */
function stepFrom(addr, pos, dir, anchor) {
  const runs = LAYER.shownOf(addr).runs;
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

/** clear the selection: the platform's highlight, its acts and its marks with it */
export function clear() {
  if (!sel) return;
  hold(null);
  LAYER.placeSelection(null);
  if (HOST.currentIs('selection')) HOST.dismiss();
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
 * (`heldReason`), else its own. Follow and read side by side (`FarSlot`)
 * where the span's words lead nowhere (`targetsAt`): `NEW_WORDS` over a span
 * wholly of words the page made (T-LAYER's `madeHere`), else `NO_LINK`.
 * @param {string} slot
 * @param {Span} span
 * @param {number} [n] the slot's targets at the span, where the caller has counted them (`countOf`)
 * @returns {Reason | null}
 */
function reasonAt(slot, span, n) {
  if (slot in INERT_REASON) { const id = INERT_REASON[/** @type {InertSlot} */ (slot)]; return heldReason(span.addr) || { id, text: t(id) }; }
  if (slot !== 'follow' && slot !== 'scene') return null;
  if (n ?? countOf(targetsAt(slot, span))) return null;
  const id = LAYER.madeHere(span.addr, span.pos, span.width) ? NEW_WORDS : NO_LINK;
  return { id, text: t(id) };
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
 * read side by side, the links drawn there alone.
 * @param {FarSlot} slot
 * @param {Span} span
 * @returns {Targets}
 */
function targetsAt(slot, span) {
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
 * effect through `send`.
 * @param {string | null} [focus] that control's key (O-HOST's `keyOf`)
 * @param {InertSlot | FarSlot | null} [told] the inert slot whose reason the card gives
 * @param {Span | null} [at] the span a slot's act was made over (`actedOn`); none draws the card at the selection
 */
export function render(focus = null, told = null, at = null) {
  const span = at || sel;
  if (!span) return;
  const { addr, pos } = span, atSelection = sameSpan(span, sel);
  const follows = targetsAt('follow', span);
  /** @type {Record<FarSlot, Targets>} where follow and read side by side go from the span: the links drawn there, and for follow the sources after them */
  const far = { follow: follows, scene: { links: follows.links, sources: [] } };
  /** the targets a slot counts: a far slot's, none for any other */
  const counted = (/** @type {string} */ id) => (id === 'follow' || id === 'scene' ? countOf(far[id]) : undefined);
  const buttons = SLOTS.map(([id, strId, chord]) => {
    const reason = reasonAt(id, span, counted(id)), target = id === 'follow' || id === 'scene' ? far[id] : null;
    const label = esc(t(strId)) + (target ? targetLabel(target) : '');
    const why = reason ? ` title="${esc(reason.text)}" aria-description="${esc(heard(reason.runs || reason.text))}"` : '';
    return `<button data-run="${id}" class="${reason ? 'inert' : ''}" aria-label="${esc(heard(t(strId) + (target ? targetWords(target) : '')))}" aria-keyshortcuts="${esc(keyShortcut(chord))}"${why}${id === told ? ' data-inert="1"' : ''}>${label}${chord ? ` <kbd>${esc(drawChord(chord))}</kbd>` : ''}</button>`;
  }).join('');
  const said = told ? reasonAt(told, span, counted(told)) : null;
  const reasonLine = said ? `<div class="note reason" data-string="${esc(said.id)}">${esc(said.text)}</div>` : '<div class="note reason" hidden></div>';
  const html = `<div class="selection-card"><span class="label"><span class="id">${esc(addr)}</span> · ${esc(t('F.position', { p: pos }))}</span><div class="slots">${buttons}</div>${reasonLine}</div>`;
  HOST.show({
    kind: 'card', id: 'selection', anchor: { span }, html, takeFocus: focus != null, first: focus != null ? HOST.controlOf(focus) : undefined,
    about: atSelection ? { kind: 'selection' } : { kind: 'selection', at: bytesOf(span) },
    acts: {
      annotate: (el) => { void send('annotate', span, el); },
      quote: (el) => { void send('quote', span, el); },
      linkto: (el) => { void send('linkto', span, el); },
      wrote: (_el, byKey) => act('wrote', byKey, span), uses: (_el, byKey) => act('uses', byKey, span), links: (_el, byKey) => act('links', byKey, span),
      follow: (el, byKey) => { const r = reasonAt('follow', span); if (r) inertAct(el, r); else act('follow', byKey, span); }, scene: (el, byKey) => { const r = reasonAt('scene', span); if (r) inertAct(el, r); else act('scene', byKey, span); },
    },
    onDismiss: (replaced) => { if (!replaced && atSelection && sameSpan(sel, span)) { hold(null); LAYER.placeSelection(null); markDirty(); } },
  });
}

/**
 * The span a slot acts on: the selection, else the walk's focused span whole
 * (D5 §1.6) — a block of the text shown, at a live caret the one the caret is
 * in, the block T-LAYER draws lit — which nothing selects: the card or the
 * list the act opens holds it (see the head); null where no span is in focus.
 * @returns {Span | null}
 */
function actedOn() {
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
 * key made the act (rule 16).
 * @param {LiveSlot} which
 * @param {boolean} [byKey] a key made the act: the card takes the focus
 * @param {Span | null} [at] the span the card whose slot made the act stands at; none for a chord, which acts on the span in focus
 * @returns {boolean} false where nothing in focus is what the slot acts on — no span, no link's stop for follow and read side by side, and for "see the links" no document: nothing is shown, and the caller gives the reason where the focus is (D5 §1.6)
 */
export function act(which, byKey = false, at = null) {
  const span = at || actedOn();
  if (!span) {
    const f = WALK.current(), end = f && f.kind === 'link' ? f.link : null;
    if (which === 'links' && f && (f.kind === 'document' || end)) LINKS.show(f.addr, byKey);
    else if (which === 'follow' && end) GO.follow(end, byKey);
    else if (which === 'scene' && end) sceneFrom(end, { addr: end.near, pos: end.pos, width: end.width });
    else return false;
    return true;
  }
  const { addr, pos, width } = span;
  if (which === 'wrote') { PROV.wrote(addr, pos, width, byKey, sameSpan(span, sel)); return true; }
  if (which === 'uses') { PROV.uses(addr, pos, width, byKey, sameSpan(span, sel)); return true; }
  if (which === 'links') { LINKS.show(addr, byKey); return true; }
  const tg = targetsAt(which, span), n = countOf(tg), reason = reasonAt(which, span, n), [one] = tg.links;
  if (reason) { render(null, which, span); sayReason(reason); }
  else if (n > 1) which_(tg, which, span, byKey);
  else if (!one) toSource(span, tg.sources[0], byKey);
  else if (which === 'follow') GO.follow(one, byKey);
  else sceneFrom(one, span);
  return true;
}

/**
 * Follow to a source of the span's words (see the head; D5 K-51): a LEAP that
 * is follow's (N-GO's `leapTo`'s `source`) to the source, carrying its words
 * alone — `parts`, the span's positions its runs hold, joined (N-GO's
 * `Carry.parts`; foundations §2.3) — named as what the reader selected where
 * the span is the selection, else as the text they were reading, made at the
 * span, where the face of a failure known at the act stands.
 * @param {Span} span
 * @param {Source} src
 * @param {boolean} byKey a key made the act
 * @param {Array<{pos: number, width: number}>} [parts] the source's parts where its bytes stand as the act is made; its own where none are handed in
 */
function toSource(span, src, byKey, parts = src.parts) {
  const first = parts[0], last = parts[parts.length - 1];
  void GO.leapTo(src.origin, { how: 'leap', byKey, source: true, carry: { addr: span.addr, pos: first.pos, width: last.pos + last.width - first.pos, parts, selected: sameSpan(span, sel) }, site: { span } });
}

/**
 * The reading scene opened from a link's end beside the passage held at it
 * (K-52; N-GO's `toScene`): a step on the trail from that end, its first pane
 * on what the page shows of the passage's document (T-LAYER's `paneSource`),
 * beside the document LK names for it (`besideAt`), the passage set level with where the
 * far end stands there (`farPos`) — or, where the far end names its document
 * whole, with nothing of it (SC's `Held.wholeB`; FP-30). Nothing where the
 * far end names no document.
 * @param {import('../links/links.js').Shown} s the link's end drawn at the passage
 * @param {Span} span the passage held: the selection, or the end's own bytes
 */
function sceneFrom(s, span) {
  if (s.far) void GO.toScene(LAYER.paneSource(span.addr), LK.besideAt(s), { posA: span.pos, widthA: span.width, posB: LK.farPos(s), wholeB: s.farWhole }, { from: { shown: s }, site: { span } });
}

/**
 * The chord of a slot that sends a name for characters (D5 K-45, K-46,
 * K-100; P47): made on the span the slots act on (`actedOn`), selecting
 * nothing, through `send`. False where no span is in focus: nothing is shown,
 * and the caller gives the reason where the focus is.
 * @param {InertSlot} slot
 * @returns {boolean}
 */
export function inertChord(slot) {
  const span = actedOn();
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
 * return reopens it holding it on.
 * @param {Targets} tg
 * @param {'follow' | 'scene'} what
 * @param {Span} span the span the act was made over
 * @param {boolean} byKey
 * @param {string | null} [focus] the reopened list's control's key
 */
function which_(tg, what, span, byKey, focus = null) {
  /** a link's row's name as stretches: its type, its linker and its far document, the link's symbol kept out (patterns K1) */
  const linkRuns = (/** @type {Shown} */ s) => /** @type {import('../strings.js').Run[]} */ ([{ text: `${typeName(s.link.type)} · `, face: 'client' }, { text: s.link.owner || '', face: 'ident' }, { text: ' · ', face: 'client' }, ...LK.farLabelRuns(s)]);
  const links = tg.links.map((s, i) => `<li><button data-run="w${i}" style="--mark-hue:${s.mark.hue}" aria-label="${esc(heard(linkRuns(s)))}"><span class="sym-mark">⟡</span> ${esc(typeName(s.link.type))} · <span class="id">${esc(s.link.owner || '')}</span> · ${LK.farLabelHTML(s)}</button></li>`);
  const sources = tg.sources.map((src, i) => `<li><button data-run="s${i}" aria-label="${esc(heard(sourceRowRuns(span.addr, src)))}">${sourceRowHTML(span.addr, src)}</button></li>`);
  const html = `<span class="label">${esc(t(what === 'follow' ? 'B1.follow' : 'B1.side-by-side'))}</span><ul class="rows">${[...links, ...sources].join('')}</ul>`;
  /** @type {Record<string, import('./host.js').Act>} */
  const acts = {};
  tg.links.forEach((s, i) => { acts['w' + i] = (_el, byKey) => { if (what === 'follow') GO.follow(s, byKey); else sceneFrom(s, span); }; });
  tg.sources.forEach((src, i) => { const parts = heldParts(span.addr, src); acts['s' + i] = (_el, byKey) => toSource(span, src, byKey, parts()); });
  HOST.show({
    kind: 'list', id: 'which', anchor: { span }, html, acts, takeFocus: byKey || focus != null, first: focus != null ? HOST.controlOf(focus) : undefined,
    about: sameSpan(span, sel) ? { kind: 'which', what } : { kind: 'which', what, at: bytesOf(span) },
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
 * @returns {string} markup, each address in the identifier's face
 */
function sourceRowHTML(addr, src) {
  if (src.withheld) return facedHTML([{ text: src.origin, face: 'ident' }, { text: ' · ', face: 'client' }, ...withheldLine(LAYER.originOwner(src.origin))]);
  const [first] = src.parts, words = LAYER.firstWords(addr, first.pos, first.width) || t('F.position', { p: first.pos });
  return fill(esc(t('L.run.named')), { words: esc(words), answer: `${esc(t('L.origin-mark'))} <span class="id">${esc(src.origin)}</span>` });
}

/**
 * A source's row's words as stretches in their faces (`sourceRowHTML`): the
 * words of the span its runs hold the reading face's, kept as written in its
 * name (ST's `heard`); its origin's address the identifier's.
 * @param {string} addr the span's document
 * @param {Source} src
 * @returns {import('../strings.js').Run[]}
 */
function sourceRowRuns(addr, src) {
  if (src.withheld) return [{ text: src.origin, face: 'ident' }, { text: ' · ', face: 'client' }, ...withheldLine(LAYER.originOwner(src.origin))];
  const [first] = src.parts, words = LAYER.firstWords(addr, first.pos, first.width);
  return tRuns('L.run.named', { words: words ? [{ text: words, face: 'reading' }] : t('F.position', { p: first.pos }), answer: [{ text: `${t('L.origin-mark')} `, face: 'client' }, { text: src.origin, face: 'ident' }] });
}

/**
 * A source's parts held by their bytes for its row's act (see the head): as
 * they stood where the document's page-local edits have not changed since the
 * list opened (W-WRITE's `editRev`) — so bytes the text holds again elsewhere
 * never stretch a part — else placed, as the act is made, where those bytes
 * stand in the text shown, each from its first stretch to the end of its
 * last, as the selection is carried (`carry`), so the person's edits move
 * them with their words; a part as it stood where its bytes were not named or
 * none stands.
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
