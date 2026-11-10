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
// once N-KEYS' returns the caret (K-70, K-77); at the walk's focused span in
// text the person may not edit, Shift with ← or → moves the selection's
// moving end a character or a word, its anchor standing — the selection
// standing in the walk's document, or one the platform made wherever it
// stands — else selects one character or word from the span's edge, its start
// for → and the end of its text for ← (`extendFromFocus`; D5 K-70) — each
// press naming the end it moved, which T-LAYER keeps clear of its document's
// head. A selection put in another document than a live caret's — by the
// pointer, a key or the gate's door — keeps the caret first, where it stood,
// owing the frame nothing (T-LAYER's `leaveCaret`), and stands the walk on
// the span its moving end is in, the ring out (N-WALK's `focusTo`), so the
// next key acts at the selection and never types at the caret (`leaveFor`).
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
// asked only about bytes it holds); "follow" and "read side by side" count only
// the links drawn at the span (LK's `shownAt`), inert where none — over a span
// wholly of bytes the page made that no link touches (`fresh`), inert with
// their reason, kept focusable as an inert slot is (`NEW_WORDS`) — asking which only at two or
// more and naming the far document at one, the scene opened as a step on the
// trail from the link's end chosen (N-GO's `toScene`) on what the page shows
// of the span's document (T-LAYER's `paneSource`), beside the document LK
// names for it (`besideAt`) — where its far end names its
// document whole, that whole document, nothing of it set level with the
// selection (SC's `Held.wholeB`; FP-30) — every
// address the card and the list set in the identifier's face (P-REG's FACE). The slots, in this
// order and never moved: annotate · quote · who wrote this? · who uses this?
// · see the links · follow · read side by side · link to… — each showing its
// chord (D5-F8). Annotate, quote and "link to…" send a name for characters to
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
// the one status region (P47; the focus record's rule 14). Every other slot
// reads, and answers at once, in flight and under a hold alike: it acts on the
// selection, else on the walk's focused span whole (D5 §1.6) — a block of the
// text shown, at a live caret the block the caret is in; off a span it acts only where the walk's
// element names what it acts on — follow and read side by side the link
// whose stop the walk stands on, at that end's own bytes (K-51, K-52; D5 §4
// rule 6), "see the links" the document the walk stands in, at its own stop
// or a link's in it (K-49) — and anywhere else it acts on nothing and tells
// its caller so (`act`), the caller giving the slot's reason where the focus
// is (D5 §1.6). The selection is the one the screen draws, and nothing else
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
// (`restore`) — the card where it stood, the list over the links counted
// again — each taking the focus on the control it was left holding it on. A
// card or a list holding a span stands on that span alone: a return, or its
// box's taking another version, reopens it over the bytes that text holds of
// it, nothing selected (`reopen`). A version move leaves no place: the
// selection stands beside it, and once its box shows another version N-GO's
// re-check carries it — its card or its list drawn again with it — over the
// bytes that version holds of it (`restore`), saying nothing where the move's
// own landing says it (N-GO's `surfacesAcross`; FP-22).
// Rules: FP-1, FP-2, FP-7, FP-9, FP-10, FP-13, FP-20, FP-22, FP-36, FP-37.

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
import { boundaries, wordStop } from '../model/derive.js';
import { t, typeName } from '../strings.js';
import { esc, byteLength } from '../util.js';
import { markDirty } from '../plane/camera.js';
import { drawChord } from '../nav/keys.js';

/** @typedef {import('../text/span.js').Span} Span */
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
 * @typedef {Object} Ends — how Shift with ← or → moves the selection's ends (`extendFromFocus`; D5 K-70)
 * @property {'start' | 'end'} moves the end a press moves, the other the anchor: the end the act that made the selection moved — the platform's focus point where the platform made it — else its end, T-LAYER placing its anchor at its start
 * @property {boolean} platform the platform made the selection — a drag, or its own keys — and the presses since moved it: it extends where it stands, wherever the walk stands
 */

/** a selection anchored at its start, as T-LAYER places a span the page selects: a press moves its end */
const AT_START = /** @type {Ends} */ (Object.freeze({ moves: 'end', platform: false }));

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
 * over the links counted again at it — the list where they are two or more,
 * else the card — each taking the focus on the control it was left holding
 * it on.
 * @param {Span} span
 * @param {import('./host.js').Left | null} left the card or the list standing over it as the reader left it; null where none of the selection's stood
 * @param {boolean} [say] the status region says where it stands: false where the landing that carried it says it
 */
export function restore(span, left, say = true) {
  hold(span);
  LAYER.placeSelection(span);
  markDirty();
  const a = left ? left.about : null, focus = left ? left.focus : null;
  if (a && a.kind === 'which') { const drawn = LK.shownAt(span.addr, span); if (drawn.length > 1) which_(drawn, a.what, span, false, focus); else render(); }
  else if (a && a.kind === 'selection') render(focus);
  if (say) FOCUS.say(`${span.addr} · ${t('F.position', { p: span.pos })}`);
}

/**
 * A card or a "which" list holding the span a slot's act was made over (see
 * the head; `About.at`), reopened over the span its bytes hold in the text
 * now — on the reader's return to its place, or once its box shows another
 * version (N-GO's) — nothing selected: the list over the links counted again
 * there, where they are two or more, else the card; each taking the focus on
 * the control it was left holding it on.
 * @param {{about: About, focus: string | null}} left
 * @param {Span} span where its bytes stand now
 */
export function reopen(left, span) {
  const a = left.about;
  if (a.kind !== 'which') { render(left.focus, null, span); return; }
  const drawn = LK.shownAt(span.addr, span);
  if (drawn.length > 1) which_(drawn, a.what, span, false, left.focus); else render(null, null, span);
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
 * `selectionBackward`); where the act moved none, its end.
 * @param {string} addr
 * @param {number} pos the span's first position
 * @param {number | null} [width] positions; null selects the block at `pos` whole
 * @param {SelectionEnd | null} [moved] the end the act moved — K-8's extended end, the platform's focus point after a press; null for an act that moves none
 */
export function select(addr, pos, width = null, moved = null) {
  const span = width != null && width > 0 ? { addr, pos, width } : wholeShown(addr, pos);
  const platform = moved === 'focus';
  take(span, moved, { moves: moved === 'start' || (platform && LAYER.selectionBackward()) ? 'start' : 'end', platform });
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
 * last — the ring out and the platform's focus carried only where the mirror
 * held it (N-WALK's `focusTo`). Nothing where no live caret stands, or it
 * stands in the selection's document.
 * @param {Span} span
 * @param {Ends} how
 */
function leaveFor(span, how) {
  const c = LAYER.caret();
  if (!c || !c.live || c.addr === span.addr) return;
  LAYER.leaveCaret(false);
  void WALK.focusTo(span.addr, how.moves === 'start' ? span.pos : span.pos + Math.max(1, span.width) - 1, false, false, null, true);
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
  const edge = dir === 'right' || dir === 'wordRight' ? b.pos : b.kind === 'para' ? b.pos + byteLength(b.text) : b.pos + b.width;
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
  take({ addr, pos: Math.min(anchor, to), width: Math.abs(to - anchor) }, moved, { moves: moved, platform });
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
/** @typedef {'follow' | 'scene'} FarSlot a slot that goes by a link's far end: inert over a span of new words no link touches (`fresh`), its reason `NEW_WORDS` */

/** the reasons the slots no lane has built yet give, by slot: what each gives where nothing stops it */
const INERT_REASON = /** @type {Record<InertSlot, string>} */ ({ annotate: 'L.seam.annotate', quote: 'L.seam.quote', linkto: 'L.seam.link-to' });
/** why follow and read side by side do nothing over a span of new words no link touches (`fresh`) */
const NEW_WORDS = 'L.new.no-link';

/** @typedef {{id: string, text: string}} Reason a slot's reason: its string, and its words as the slot gives them */

/** an inert slot's own reason, by its string's id: the words the slot gives as it is activated where no hold stands (P47) */
export const reasonOf = (/** @type {InertSlot} */ slot) => INERT_REASON[slot];

/**
 * The row rule's reason while a document holds a line the board has not kept
 * (foundations §3.1; P47), keyed on what ends the state: where a held line
 * stands refused, an act of the person's comes first; else a resend follows.
 * Read from the held lines alone (W-WRITE's `heldOf`); null where none is held.
 * @param {string} addr
 * @returns {Reason | null}
 */
function heldReason(addr) {
  const rows = WRITE.heldOf(addr);
  if (!rows.length) return null;
  const id = rows.some((r) => r.refusal) ? 'B3.row.held.resolve' : 'B3.row.held.resend';
  return { id, text: t(id, { label: LAYER.boxName(addr).name }) };
}

/**
 * The reason a slot gives over a span; null where the slot acts. A slot that
 * sends a name for characters (`InertSlot`): under a hold the row rule's
 * (`heldReason`), else its own; follow and read side by side: `NEW_WORDS`
 * over new words no link touches (`fresh`).
 * @param {string} slot
 * @param {Span} span
 * @returns {Reason | null}
 */
function reasonAt(slot, span) {
  if (slot in INERT_REASON) { const id = INERT_REASON[/** @type {InertSlot} */ (slot)]; return heldReason(span.addr) || { id, text: t(id) }; }
  return (slot === 'follow' || slot === 'scene') && fresh(span) ? { id: NEW_WORDS, text: t(NEW_WORDS) } : null;
}

/** is a span wholly of words the page made that no link is drawn on (T-LAYER's `madeHere`; LK's `shownAt`): nothing can reach a byte the board has not minted, and once it has, the links made on it since are drawn */
const fresh = (/** @type {Span} */ s) => LAYER.madeHere(s.addr, s.pos, s.width) && LK.shownAt(s.addr, s).length === 0;

/**
 * An inert slot activated (P47; rule 14): it keeps its place, marked inert,
 * and gives its reason — at the slot, in the card's reason line, and through
 * the status region.
 * @param {HTMLElement} el the slot's button
 * @param {Reason} reason
 */
function inertAct(el, reason) {
  el.setAttribute('data-inert', '1');
  const card = el.closest('.selection-card');
  const line = card ? /** @type {HTMLElement | null} */ (card.querySelector('.reason')) : null;
  if (line) { line.textContent = reason.text; line.dataset.string = reason.id; line.hidden = false; }
  FOCUS.say(reason.text);
}

/**
 * Rebuild the acts card (FP-13) at the selection, else at the span a slot's
 * act was made over, which the card holds (see the head; `About.at`), its
 * slots acting there; nothing where neither is given. The card takes no
 * focus (rule 15), save a card a return reopens on the control it was left
 * holding it on. A slot named `told` stands as `inertAct` leaves it: marked
 * inert, its reason in the card's reason line. Over new words no link touches
 * follow and read side by side keep their places, inert and focusable, their
 * reason saying so (`NEW_WORDS`); a slot that sends a name for characters
 * takes effect through `send`.
 * @param {string | null} [focus] that control's key (O-HOST's `keyOf`)
 * @param {InertSlot | FarSlot | null} [told] the inert slot whose reason the card gives
 * @param {Span | null} [at] the span a slot's act was made over (`actedOn`); none draws the card at the selection
 */
export function render(focus = null, told = null, at = null) {
  const span = at || sel;
  if (!span) return;
  const { addr, pos } = span, atSelection = sameSpan(span, sel);
  const drawn = LK.shownAt(addr, span);
  const n = drawn.length, unlinked = fresh(span);
  // the far end the follow and the scene name: its address, in the identifier's face, or the count of several
  const farLabel = n === 1 && drawn[0].far ? ` <span class="id">${esc(drawn[0].far)}</span>` : n > 1 ? ` ${n}` : '';
  const buttons = SLOTS.map(([id, strId, chord]) => {
    const reason = reasonAt(id, span);
    const inert = !!reason || ((id === 'follow' || id === 'scene') && n === 0);
    const label = esc(t(strId)) + ((id === 'follow' || id === 'scene') ? farLabel : '');
    return `<button data-run="${id}" class="${inert ? 'inert' : ''}" ${reason ? `title="${esc(reason.text)}"` : ''}${id === told ? ' data-inert="1"' : ''}>${label}${chord ? ` <kbd>${esc(drawChord(chord))}</kbd>` : ''}</button>`;
  }).join('');
  const said = told ? reasonAt(told, span) || (told in INERT_REASON ? null : { id: NEW_WORDS, text: t(NEW_WORDS) }) : null;
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
 * their span as the selection's bytes only where it is the selection. The
 * act's card takes the focus where a key made the act (rule 16).
 * @param {LiveSlot} which
 * @param {boolean} [byKey] a key made the act: the card takes the focus; a follow's landing draws the ring
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
  if (fresh(span)) { render(null, which, span); FOCUS.say(t(NEW_WORDS)); return true; }
  const drawn = LK.shownAt(addr, span);
  if (drawn.length > 1) which_(drawn, which, span, byKey);
  else if (drawn.length === 1 && which === 'follow') GO.follow(drawn[0], byKey);
  else if (drawn.length === 1) sceneFrom(drawn[0], span);
  return true;
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
    FOCUS.say(reason.text);
  })();
  return sending;
}

/**
 * The "which" list at two or more, at the span the act was made over — the
 * selection, else the span the list holds (see the head; `About.at`), each
 * row's scene opened from it: each choice by its type, its linker and its far
 * document (foundations §2.3), named as its tail and its mirror item name it,
 * each address in the identifier's face (LK's `farLabelHTML`); it takes the
 * focus on its first row where a key asked, and on the control a return
 * reopens it holding it on.
 * @param {import('../links/links.js').Shown[]} drawn
 * @param {'follow' | 'scene'} what
 * @param {Span} span the span the act was made over
 * @param {boolean} byKey
 * @param {string | null} [focus] the reopened list's control's key
 */
function which_(drawn, what, span, byKey, focus = null) {
  const html = `<span class="label">${esc(t(what === 'follow' ? 'B1.follow' : 'B1.side-by-side'))}</span><ul class="rows">${drawn.map((s, i) => `<li><button data-run="w${i}" style="--mark-hue:${s.mark.hue}"><span class="sym-mark">⟡</span> ${esc(typeName(s.link.type))} · <span class="id">${esc(s.link.owner || '')}</span> · ${LK.farLabelHTML(s)}</button></li>`).join('')}</ul>`;
  /** @type {Record<string, import('./host.js').Act>} */
  const acts = {};
  drawn.forEach((s, i) => { acts['w' + i] = (_el, byKey) => { if (what === 'follow') GO.follow(s, byKey); else sceneFrom(s, span); }; });
  HOST.show({
    kind: 'list', id: 'which', anchor: { span }, html, acts, takeFocus: byKey || focus != null, first: focus != null ? HOST.controlOf(focus) : undefined,
    about: sameSpan(span, sel) ? { kind: 'which', what } : { kind: 'which', what, at: bytesOf(span) },
  });
}
