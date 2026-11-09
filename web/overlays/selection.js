// O-SELECTION — the selection and its acts in fixed slots (the structure
// record §3.2; foundations §3.1; D5 §1.6). Layer 2. ENGINE-BOUND. State
// (FP-10): the selection; T-LAYER reads it through the reader handed in.
// The selection is the span (R11; foundations §3.1): a byte range of one
// document, `{addr, pos, width}` in V-positions, made in one continuous
// gesture — a drag over the mounted text at reading scale (§2.4), read back
// from the platform's own selection through T-LAYER's mapping as the drag
// ends and as it changes — or by a key: a click on a block and Enter at the
// focused span select the block whole; off a live caret, K-8's Shift+↓ /
// Shift+↑ select the focused span and then extend it by a span each press;
// at a live caret, Shift with each arrow, Home or End moves the caret a step
// and the selection runs from its anchor to the caret (`extendFromCaret`; D5
// K-71, §1.6), as Shift with ← or → does at the span a kept caret stands in
// once N-KEYS' returns the caret (K-70, K-77) — each press naming the end it
// moved, which T-LAYER keeps clear of its document's head. The platform's
// highlight is the selection's one mark (§2.1), and the selection the
// platform's own (foundations §2.1; D5 §2): a change of it rebuilds no
// article — T-LAYER marks the blocks it touches in place — so a selection the
// person made stands as they left it, its anchor where they set it, for the
// platform's own keys to extend where neither a live caret nor the kept
// caret's span takes them (D5 K-71); T-LAYER places it over a span
// the page selects and puts it back, its anchor at the same end, after a
// remount — never over a selection the person holds outside the plane's
// text, in a reading scene's pane or an overlay's text, which stands as they
// made it. The acts take the span exactly: "who wrote this?" and "who uses
// this?" ask over its bytes; "follow" and "read side by side" count only the
// links drawn at the span (LK's `shownAt`), inert where none, asking which
// only at two or more and naming the far document at one, the scene opened
// as a step on the trail from the link's end chosen (N-GO's `toScene`) beside
// the document LK names for it (`besideAt`) — where its far end names its
// document whole, that whole document, nothing of it set level with the
// selection (SC's `Held.wholeB`; FP-30) — every
// address the card and the list set in the identifier's face (P-REG's FACE). The slots, in this
// order and never moved: annotate · quote · who wrote this? · who uses this?
// · see the links · follow · read side by side · link to… — each showing its
// chord (D5-F8); annotate, quote and "link to…" are inert, each with its
// reason (`INERT_REASON`): an inert slot keeps its place and gives its reason
// when activated — pressed (`inertAct`), or by its chord, which draws the
// card at the span the slots act on with the reason given (`inertChord`) —
// at the slot and through the one status region (P47; the focus record's
// rule 14). Every other slot acts on the selection, else on the walk's
// focused span whole (D5 §1.6); off a span it acts only where the walk's
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
import * as LAYER from '../text/layer.js';
import * as LK from '../links/links.js';
import * as GO from '../nav/go.js';
import * as PROV from './provenance.js';
import * as LINKS from './links-card.js';
import * as WALK from '../nav/walk.js';
import * as FOCUS from '../nav/focus.js';
import { extended, sameSpan, spanOfBlock } from '../text/span.js';
import { t, typeName } from '../strings.js';
import { esc } from '../util.js';
import { markDirty } from '../plane/camera.js';
import { drawChord } from '../nav/keys.js';

/** @typedef {import('../text/span.js').Span} Span */
/** @typedef {import('../model/records.js').ISpan} ISpan */

/** @typedef {{kind: 'selection', at?: Left} | {kind: 'which', what: 'follow' | 'scene', at?: Left}} About what the acts card and the "which" list are about (O-HOST's): the selection, which a departure keeps by its bytes (`asLeft`); else the span a slot's act was made over, which the card or the list holds alone (`at`; see the head) */

/**
 * @typedef {Object} Left — a span by its bytes (see the head): the selection as the reader leaves its place (`asLeft`), or the span a card or a list holds (`About.at`)
 * @property {string} addr the document it stood in: the version its box showed
 * @property {number} pos its first position there
 * @property {number} width its positions
 * @property {ISpan[]} ids its bytes by identity (M-REC's `identityOf`), which a return places in the text then; none where the held image did not cover them
 */

/** @type {Span | null} */
let sel = null;

/** the selection, read-only (T-LAYER's reader): the one the screen draws, never a span a card or a list holds (see the head) */
export const selected = () => sel;

/** a span by its bytes as it stands now (`Left`) */
const bytesOf = (/** @type {Span} */ s) => ({ addr: s.addr, pos: s.pos, width: s.width, ids: REC.identityOf(s.addr, s.pos, s.width) });

/** the selection as the reader leaves its place (see the head): by its bytes' identity; null where none stands */
export const asLeft = () => (sel ? bytesOf(sel) : null);

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
  sel = span;
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

/** the block holding a position, whole; a position in no delivered block names one position */
function wholeBlock(/** @type {string} */ addr, /** @type {number} */ pos) {
  const b = REC.blockAt(addr, pos);
  return b ? spanOfBlock(addr, b) : { addr, pos, width: 1 };
}

/**
 * Select a span: the bytes named, or, with no width, the whole of the block
 * holding `pos` (a click, Enter at the focused span, the gate's door). The
 * platform's highlight is placed over it — where the platform's selection
 * already covers it, that one stands — the next frame marks the blocks it
 * touches in place, rebuilding no article, and its acts appear at it; the
 * end the act moved kept clear of its document's head (T-LAYER's
 * `keepClear`).
 * @param {string} addr
 * @param {number} pos the span's first position
 * @param {number | null} [width] positions; null selects the block at `pos` whole
 * @param {import('../text/layer.js').SelectionEnd | null} [moved] the end the act moved — K-8's extended end, the platform's focus point after a press; null for an act that moves none
 */
export function select(addr, pos, width = null, moved = null) {
  const span = width != null && width > 0 ? { addr, pos, width } : wholeBlock(addr, pos);
  sel = span;
  LAYER.placeSelection(span, moved);
  markDirty();
  render();
  FOCUS.say(`${span.addr} · ${t('F.position', { p: span.pos })}`);
}

/**
 * K-8 (Shift+↓ / Shift+↑): the first press selects the walk's focused span
 * whole; each further press extends the selection by a span in the
 * direction pressed, that end the one the press moved (`select`). The focus
 * stays on the walk's element (rule 15).
 * @param {'down' | 'up'} [dir]
 */
export function selectFocused(dir = 'down') {
  const f = WALK.current(), moved = dir === 'up' ? 'start' : 'end';
  if (!f || f.kind !== 'block' || f.pos == null) return;
  if (!sel || sel.addr !== f.addr) { select(f.addr, f.pos, null, moved); return; }
  const e = extended(REC.doc(sel.addr).blocks, sel, dir);
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
  if (!LAYER.caretMove(dir, true)) return false;
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

/** clear the selection: the platform's highlight, its acts and its marks with it */
export function clear() {
  if (!sel) return;
  sel = null;
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

/** the inert slots' reasons, by slot */
const INERT_REASON = /** @type {Record<InertSlot, string>} */ ({ annotate: 'L.seam.annotate', quote: 'L.seam.quote', linkto: 'L.seam.link-to' });

/** an inert slot's reason, by its string's id: the words the slot gives as it is activated (P47) */
export const reasonOf = (/** @type {InertSlot} */ slot) => INERT_REASON[slot];

/**
 * An inert slot activated (P47; rule 14): it keeps its place, marked inert,
 * and gives its reason — at the slot, in the card's reason line, and through
 * the status region.
 * @param {HTMLElement} el the slot's button
 * @param {string} id the reason's string
 */
function inertAct(el, id) {
  el.setAttribute('data-inert', '1');
  const card = el.closest('.selection-card');
  const line = card ? /** @type {HTMLElement | null} */ (card.querySelector('.reason')) : null;
  if (line) { line.textContent = t(id); line.dataset.string = id; line.hidden = false; }
  FOCUS.say(t(id));
}

/**
 * Rebuild the acts card (FP-13) at the selection, else at the span a slot's
 * act was made over, which the card holds (see the head; `About.at`), its
 * slots acting there; nothing where neither is given. The card takes no
 * focus (rule 15), save a card a return reopens on the control it was left
 * holding it on. A slot named `told` stands as `inertAct` leaves it: marked
 * inert, its reason in the card's reason line.
 * @param {string | null} [focus] that control's key (O-HOST's `keyOf`)
 * @param {InertSlot | null} [told] the inert slot whose reason the card gives
 * @param {Span | null} [at] the span a slot's act was made over (`actedOn`); none draws the card at the selection
 */
export function render(focus = null, told = null, at = null) {
  const span = at || sel;
  if (!span) return;
  const { addr, pos } = span, atSelection = sameSpan(span, sel);
  const drawn = LK.shownAt(addr, span);
  const n = drawn.length;
  // the far end the follow and the scene name: its address, in the identifier's face, or the count of several
  const farLabel = n === 1 && drawn[0].far ? ` <span class="id">${esc(drawn[0].far)}</span>` : n > 1 ? ` ${n}` : '';
  const buttons = SLOTS.map(([id, strId, chord]) => {
    const reason = id in INERT_REASON ? reasonOf(/** @type {InertSlot} */ (id)) : null;
    const inert = !!reason || ((id === 'follow' || id === 'scene') && n === 0);
    const label = esc(t(strId)) + ((id === 'follow' || id === 'scene') ? farLabel : '');
    return `<button data-run="${id}" class="${inert ? 'inert' : ''}" ${reason ? `title="${esc(t(reason))}"` : ''}${id === told ? ' data-inert="1"' : ''}>${label}${chord ? ` <kbd>${esc(drawChord(chord))}</kbd>` : ''}</button>`;
  }).join('');
  const said = told ? INERT_REASON[told] : null;
  const reasonLine = said ? `<div class="note reason" data-string="${esc(said)}">${esc(t(said))}</div>` : '<div class="note reason" hidden></div>';
  const html = `<div class="selection-card"><span class="label"><span class="id">${esc(addr)}</span> · ${esc(t('F.position', { p: pos }))}</span><div class="slots">${buttons}</div>${reasonLine}</div>`;
  HOST.show({
    kind: 'card', id: 'selection', anchor: { span }, html, takeFocus: focus != null, first: focus != null ? HOST.controlOf(focus) : undefined,
    about: atSelection ? { kind: 'selection' } : { kind: 'selection', at: bytesOf(span) },
    acts: {
      annotate: (el) => inertAct(el, INERT_REASON.annotate),
      quote: (el) => inertAct(el, INERT_REASON.quote),
      linkto: (el) => inertAct(el, INERT_REASON.linkto),
      wrote: (_el, byKey) => act('wrote', byKey, span), uses: (_el, byKey) => act('uses', byKey, span), links: (_el, byKey) => act('links', byKey, span), follow: (_el, byKey) => act('follow', byKey, span), scene: (_el, byKey) => act('scene', byKey, span),
    },
    onDismiss: (replaced) => { if (!replaced && atSelection && sameSpan(sel, span)) { sel = null; LAYER.placeSelection(null); markDirty(); } },
  });
}

/**
 * The span a slot acts on: the selection, else the walk's focused span whole
 * (D5 §1.6), which nothing selects — the card or the list the act opens holds
 * it (see the head); null where no span is in focus.
 * @returns {Span | null}
 */
function actedOn() {
  if (sel) return sel;
  const f = WALK.current();
  return f && f.kind === 'block' && f.pos != null ? wholeBlock(f.addr, f.pos) : null;
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
  const drawn = LK.shownAt(addr, span);
  if (drawn.length > 1) which_(drawn, which, span, byKey);
  else if (drawn.length === 1 && which === 'follow') GO.follow(drawn[0], byKey);
  else if (drawn.length === 1) sceneFrom(drawn[0], span);
  return true;
}

/**
 * The reading scene opened from a link's end beside the passage held at it
 * (K-52; N-GO's `toScene`): a step on the trail from that end, beside the
 * document LK names for it (`besideAt`), the passage set level with where the
 * far end stands there (`farPos`) — or, where the far end names its document
 * whole, with nothing of it (SC's `Held.wholeB`; FP-30). Nothing where the
 * far end names no document.
 * @param {import('../links/links.js').Shown} s the link's end drawn at the passage
 * @param {Span} span the passage held: the selection, or the end's own bytes
 */
function sceneFrom(s, span) {
  if (s.far) void GO.toScene(span.addr, LK.besideAt(s), { posA: span.pos, widthA: span.width, posB: LK.farPos(s), wholeB: s.farWhole }, { from: { shown: s }, site: { span } });
}

/**
 * An inert slot's chord (P47; D5 K-45, K-46, K-100): the card at the span
 * the slots act on (`actedOn`), selecting nothing, the slot standing as its
 * press leaves it — marked inert, its reason given in the card — and the
 * reason said through the status region; the card takes no focus (rule 15).
 * False where no span is in focus: nothing is shown, and the caller gives the
 * reason where the focus is.
 * @param {InertSlot} slot
 * @returns {boolean}
 */
export function inertChord(slot) {
  const span = actedOn();
  if (!span) return false;
  render(null, slot, span);
  FOCUS.say(t(INERT_REASON[slot]));
  return true;
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
