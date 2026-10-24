// N-LEAP — THE LEAP BOX (the structure record §3.2 "N-LEAP"; foundations
// §2.3; B1-S11; D5 §1.4). Layer 2. ENGINE-BOUND. State: VIEW — open or
// closed, the text, the rows, the selected row, whether ↓/↑ has carried the
// choice into the rows, whether it stands as opened — nothing typed in it, no
// row chosen. A control that rebuilds itself from its state
// (FP-13). Opened by Mod+L / Mod+K or the address segment's act, holding the
// CURRENT ADDRESS, selected (the address bar's habit), and listing beneath
// it the address's levels — the whole board first, HOME where it differs,
// the account's region, the whole document — then the landmarks and the
// trail's entries, until a key is typed, no row chosen: Enter on the box as
// opened lands in place — the current address — and pushes nothing, and a
// listed level is gone to once ↓, ↑ or the pointer has chosen it (foundations
// §2.3); typed text matches by N-MATCH over the model's index, its first
// match selected; Enter goes to the selected row (the first match unless ↓/↑
// chose another), a teleport and a trail entry whether it names a document,
// an account or the board, the ring drawn at its landing as a key's (a click
// on a row draws none); an address this client has no record of is asked
// of the board and faced where nothing answers (C-42's content, B1-S8); where
// typed text matches nothing the box says so, the index's state beside the
// answer while the index is not complete, and Enter goes nowhere: the box
// stands open over the text and its answer, the focus in its input, until the
// text is corrected or Esc closes it (K-31). While an input method's
// composition is open, Enter, Esc and the arrows are the IME's and act on
// nothing here (D5 §0). THE BOX IS THE ONE LINE'S STOP, OPENED (the focus
// record's rule 18; D5 §4 rule 4): its input takes the focus however it was
// opened, as a field a click lands in does, and its close hands the focus
// back through N-FOCUS, the focus's owner (K-34; FP-20): to the element it
// was opened from, or to the walk's element where that no longer takes the
// focus — as the mirror's item it was opened from no longer does once a
// camera move under the box has re-taken the walk's focus and rebuilt the
// mirror. A LANDING NEVER CLOSES THE BOX (#171's rule 2; FP-20): a jump's
// landing, a version move's, a key made at one leave its text, its caret and
// its focus as the reader left them (N-FOCUS's `land`), and its close then
// gives the focus to the landing, the walk's element; the box as opened takes
// the address the line names as that changes (`takeAddress`: "An address box
// with nothing typed in it takes the new address"), so it never holds a place
// the line does not show (K-30). The box is gone with the next act (M-1): a
// chord inside it acts as anywhere, the box closed first and the chord read at
// the focus the close returned; the field's own chords — select all, copy,
// paste, cut, undo, the caret's — stay the input's; a focus that leaves the
// box — Tab out of it (D2), a click elsewhere — closes it, and the focus
// stands where it went.
// Its layer stands above the reading scene's (#118), so Mod+L in the scene
// shows the box over it. Opened, the box is an act on the chrome: a card or
// scene still reading ends, what stands staying (O-HOST's opening), so no
// answer arriving while the box stands opens over it or takes its focus, and
// the box is Esc's innermost thing (N-KEYS'). The intake's URL arm and search
// (K-35) are the code lane's. ITS ROWS ARE THE MODEL'S (issue #177's design
// decision: "Everything drawn … comes from the model for what the reader can
// now read"; FP-29): each row's words read from the index and the model as the
// rows are computed — a trail entry's by N-GO's `wordsOf`, never a copy the
// entry keeps — and a change of the page's class computes the rows standing
// in the box again from the model at once (`classChanged`), and once more as
// the index the new class reads answers (`takeIndex`), its text, its caret and
// its focus left as they stand (FP-20). WHERE NO BOARD IS HELD (issue #215's
// design decision; FP-35) it lists no board's level, its status region says
// why — O-FACES' one entry — in the answer's place, and Enter, on a row or
// none, closes it onto O-FACES' no-board face: a LEAP needs a board, and the
// act is answered, never silent.
// ITS ACCESSIBLE FORM (R94; the WAI-ARIA combobox, list autocomplete with
// automatic selection): the input is the combobox, expanded while it lists
// rows, controlling the rows' listbox, the selected row `aria-selected`; the
// box names the two as it attaches, the input by ST's `L.leap-label` and the
// listbox by `L.leap-rows-label`. The platform's focus stays in the input;
// its active descendant names the selected row once ↓ or ↑ has carried the
// choice into the rows, and never on the box as opened or as typed, so what
// a reader meets first is the box itself — the current address that Mod+C
// copies and typing replaces (D5 K-30; §4 rule 4). The answer and the
// index's state are the box's own status region (D4: the combobox's, beside
// the page's one), written only when its words change: a live region speaks
// whatever is rewritten, so an arrow or a further keystroke repeats nothing.
// Carries: the wireframe's §12. Rules: FP-1, FP-2, FP-9, FP-10, FP-13, FP-20,
// FP-29, FP-35.

import * as REC from '../model/records.js';
import * as TRAIL from './trail.js';
import * as GO from './go.js';
import * as FOCUS from './focus.js';
import * as HOST from '../overlays/host.js';
import * as FACES from '../overlays/faces.js';
import { MAC } from './keys.js';
import { matches } from './match.js';
import { t } from '../strings.js';
import { esc } from '../util.js';
import { markDirty } from '../plane/camera.js';
import { documentOf, accountOf } from '../model/address.js';

/** @typedef {import('./match.js').Row} Row */

/** @type {{box: HTMLElement, input: HTMLInputElement, rows: HTMLElement, note: HTMLElement} | null} */
let els = null;
let openState = false;
/** @type {Row[]} */
let rows = [];
/** the selected row, or −1 where none is chosen — the box as opened, before ↓, ↑ or a keystroke */
let sel = -1;
/** ↓ or ↑ has carried the choice into the rows — set only where a row stands, so `sel` names one */
let inRows = false;
/** the box stands as opened: nothing typed in it, no row chosen — it holds the current address the line names (`takeAddress`) */
let asOpened = false;
/** the status region's markup as last written */
let noteHTML = '';
/** the rows stand computed over an index a change of the page's class dropped: computed again once the new class's index answers (`takeIndex`) */
let stale = false;
/** @type {() => string | null} the current address's reader (the line's) */
let currentAddress = () => null;

/** the field's own chords with the command modifier held: select all, copy, paste, cut, undo, the caret's moves — never the plane's */
const FIELD_CHORDS = new Set(['a', 'c', 'v', 'x', 'z', 'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End']);

/** the id of row i — the input's active descendant names it */
const rowId = (/** @type {number} */ i) => `leap-row-${i}`;

/** @param {{box: HTMLElement, input: HTMLInputElement, rows: HTMLElement, note: HTMLElement}} e @param {() => string | null} cur */
export function attach(e, cur) {
  els = e; currentAddress = cur;
  e.input.setAttribute('aria-label', t('L.leap-label'));
  e.rows.setAttribute('aria-label', t('L.leap-rows-label'));
  e.input.addEventListener('input', () => { asOpened = false; compute(e.input.value); render(); });
  e.input.addEventListener('keydown', (ev) => {
    if (ev.isComposing || ev.key === 'Process' || ev.keyCode === 229) { ev.stopPropagation(); return; } // the IME's until it commits (D5 §0)
    const mod = MAC ? ev.metaKey : ev.ctrlKey;
    // a chord acts as anywhere, the box closed first (M-1): it goes on to the plane's dispatch, which reads the focus the close returned
    if (mod && !FIELD_CHORDS.has(ev.key.length === 1 ? ev.key.toLowerCase() : ev.key)) { close(); return; }
    ev.stopPropagation(); // the box's keys are its own: the plane's dispatch never sees them
    if (ev.key === 'ArrowDown') { choose(1); ev.preventDefault(); }
    else if (ev.key === 'ArrowUp') { choose(-1); ev.preventDefault(); }
    else if (ev.key === 'Enter') { go(sel, true); ev.preventDefault(); }
    else if (ev.key === 'Escape') { close(); ev.preventDefault(); }
  });
  // a press on the rows chooses without moving the focus off the input (the combobox's form); a click on a row goes
  e.box.addEventListener('mousedown', (ev) => { if (ev.target !== e.input) ev.preventDefault(); });
  e.rows.addEventListener('click', (ev) => { const r = /** @type {HTMLElement} */ (ev.target).closest('[data-i]'); if (r) go(Number(/** @type {HTMLElement} */ (r).dataset.i), FOCUS.byKey(ev)); });
  // the focus leaving the box — Tab out of it (D2), a click elsewhere (M-1) — closes it once the focus has settled where it went
  e.box.addEventListener('focusout', (ev) => {
    if (!openState) return;
    const to = /** @type {Element | null} */ (ev.relatedTarget);
    if (to && e.box.contains(to)) return;
    setTimeout(() => { if (openState && !e.box.contains(document.activeElement)) close(); }, 0);
  });
}
export const isOpen = () => openState;

function ctx() {
  const s = REC.session();
  const cur = currentAddress();
  return {
    places: REC.places(), landmarks: REC.landmarks(),
    trail: TRAIL.numbered().map((r) => ({ n: r.n, addr: r.entry.addr, label: GO.wordsOf(r.entry) })),
    current: cur, board: REC.board() ? GO.boardNode() : null, home: s && s.account ? s.account : null,
    levelWords: { board: t('F.level.board'), home: t('F.level.home'), account: t('F.level.account'), document: t('F.level.document') },
  };
}
/** the rows for the text; typed text selects its first match, and nothing typed chooses no row (foundations §2.3) */
function compute(/** @type {string} */ text) { rows = matches(text, ctx()); sel = text.trim() ? 0 : -1; inRows = false; }

/** ↓ / ↑ (K-32): the choice moves one row and into the rows; nothing goes */
function choose(/** @type {1 | -1} */ step) {
  if (!rows.length) return;
  sel = Math.max(0, Math.min(rows.length - 1, sel + step));
  inRows = true; asOpened = false;
  render();
}

/** the input's combobox state, from the box's: expanded while it lists rows; the active descendant the selected row while the choice is in the rows */
function comboState() {
  if (!els) return;
  els.input.setAttribute('aria-expanded', String(openState && rows.length > 0));
  if (inRows) els.input.setAttribute('aria-activedescendant', rowId(sel));
  else els.input.removeAttribute('aria-activedescendant');
}

/** open the box holding the current address, selected (K-30) — a card or scene still reading ended first, what stands staying (O-HOST's opening); its input takes the focus, the opener remembered by the focus's owner */
export function open(prefill = currentAddress() || '') {
  if (!els) return;
  HOST.endOpening();
  const from = document.activeElement;
  openState = true; asOpened = true;
  els.box.classList.add('on');
  els.input.value = prefill;
  compute('');
  render();
  FOCUS.open('box', { el: els.box, from, byKey: true, first: els.input });
  els.input.select();
  markDirty();
}

/**
 * The box as opened takes the address the line names (see the head; #171's
 * rule 2: "An address box with nothing typed in it takes the new address"):
 * while nothing is typed in it and no row chosen, a landing, a version move
 * or a camera move that changes the current address puts that address in the
 * box, selected, its levels listed beneath it. The app's loop runs it beside
 * the line's rebuild; a box typed in, or with a row chosen, keeps its text.
 */
export function takeAddress() {
  if (!els || !openState || !asOpened) return;
  const addr = currentAddress() || '';
  if (els.input.value === addr) return;
  els.input.value = addr;
  compute('');
  render();
  els.input.select();
}
/** the rows standing in the box computed again from the model (see the head): over the text in it — the levels where it stands as opened — its text, its caret and its focus left as they stand (FP-20) */
function relist() {
  if (!els || !openState) return;
  compute(asOpened ? '' : els.input.value);
  render();
}

/**
 * A change of the page's class (see the head; FP-23), told by the app as
 * M-PUMP tells the drop of every record: the rows standing in the box
 * computed again from the model now (`relist`), so none names what the class
 * the page left could read, and once more as the index the new class reads
 * answers (`takeIndex`).
 */
export function classChanged() {
  if (!els || !openState) return;
  relist();
  stale = true;
}

/**
 * The box standing over a change of the page's class takes the index the new
 * class reads (see the head) once it answers — the index's state known again
 * (M-REC's `indexState`): its rows computed again over it (`relist`). The
 * app's loop runs it beside the line's rebuild; a box closed meanwhile takes
 * nothing.
 */
export function takeIndex() {
  if (!stale || (openState && REC.indexState() == null)) return;
  stale = false;
  relist();
}

/** close the box: the focus back through the focus's owner — to the opener, else the walk's element, the walk's element alone where a landing passed over the box; one that left the box already stays where it went */
export function close() {
  if (!els || !openState) return;
  openState = false; inRows = false; els.box.classList.remove('on');
  comboState();
  FOCUS.close('box');
  markDirty();
}

/** rebuild the rows, the input's combobox state and the status region — the answer, then the index's state; where no board is held, why in their place (FP-13, FP-35) */
export function render() {
  if (!els) return;
  const st = REC.indexState();
  const floor = REC.floor();
  const typed = els.input.value.trim();
  els.rows.innerHTML = rows.map((r, i) => `<div class="hit ${i === sel ? 'sel' : ''}" id="${rowId(i)}" data-i="${i}" role="option" aria-selected="${i === sel}"><span class="a">${esc(r.addr)}</span><span>${esc(r.title)}</span><span class="a">${esc(r.sub)}${r.kind === 'landmark' ? ' ' + esc(t('F.landmark')) : ''}</span></div>`).join('');
  comboState();
  const why = FACES.noBoardWords();
  const answer = why ? `<span data-string="${esc(why.id)}">${esc(why.text)}</span>` : !rows.length && typed ? `<span data-string="F.leap.none">${esc(t('F.leap.none'))}</span>` : '';
  const stateLine = st && st.arm !== 'complete' ? `<span data-string="F.index.state">${esc(t('F.index.state', { arm: st.arm }))}</span>${floor != null ? ` · <span data-string="F.leap.floor">${esc(t('F.leap.floor', { floor }))}</span>` : ''}${st.arm === 'building' || st.arm === 'widening' ? ` · <span data-string="F.leap.arriving">${esc(t('F.leap.arriving'))}</span>` : ''}` : '';
  const note = [answer, stateLine].filter(Boolean).join(' · ');
  if (note === noteHTML) return;
  noteHTML = note;
  els.note.innerHTML = note;
}

/**
 * Enter: the row chosen goes (K-31), each a teleport and a trail entry; with
 * no row chosen — the box as opened — the current address, in place: the box
 * closes, nothing moves and nothing is pushed; with no row listed — typed
 * text that matches nothing, since nothing typed lists the levels, the whole
 * board first — nowhere: the box stays open over the text and the answer
 * `render` wrote, the focus in its input, nothing moved and nothing pushed
 * (foundations §2.3). Where no board is held, whatever is chosen, the box
 * closes and the act is answered with why and what still works (O-FACES'
 * `noBoard`; FP-35).
 * @param {number} i the row chosen
 * @param {boolean} [byKey] Enter made the act, not a click on the row
 */
export async function go(i, byKey = false) {
  if (!REC.board()) { close(); FACES.noBoard(null); return; }
  if (!rows.length) return;
  const r = rows[i]; if (!r) { close(); return; }
  close();
  if (r.kind === 'board') { await GO.wholeBoard(byKey); return; }
  if (r.kind === 'home') { await GO.home(byKey); return; }
  if (r.kind === 'share' || r.kind === 'url') return; // the share form's decoding and the intake are not this lane's
  if (r.kind === 'account') { await GO.toAccount(r.addr, byKey); return; }
  if (r.kind === 'address') {
    const doc = documentOf(r.addr);
    if (doc) { await GO.leapTo(r.addr, { how: 'leap', byKey }); return; }
    const acct = accountOf(r.addr);
    if (acct) { await GO.toAccount(acct, byKey); return; }
    await GO.wholeBoard(byKey); return;
  }
  await GO.leapTo(r.addr, { how: 'leap', byKey });
}

/** the rows (the gate reads them) */
export const currentRows = () => rows.slice();
