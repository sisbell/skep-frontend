// N-LEAP — the LEAP box (the structure record §3.2; foundations §2.3; B1-S11;
// D5 §1.4). Layer 2, engine-bound. State (FP-10): open or closed, the rows,
// the selected row, whether ↓/↑ has carried the choice into the rows,
// whether the box stands as opened — nothing typed in it, no row chosen —
// and the address the line named as it opened (`openedAt`), the status
// region's markup as last written, whether the rows stand over an
// index a change of class dropped, the list's room as the row chosen was
// last brought into view, the document in view the rows' acts were last
// drawn for (`drawnFor`), the hint a refused "open beside" raised
// (`refused`), and two readers the app hands in, the line's: the current
// address, and the document in view. A control that rebuilds itself from
// its state (FP-13).
// Opened (`open`), the box holds the current address, selected, and lists
// beneath it the address's levels, the landmarks and the trail's entries
// (N-MATCH's `levels`), no row chosen, until a key is typed: Enter on the box
// as opened lands in place — the box closes, nothing moves and nothing is
// pushed — and a listed row is gone to once ↓, ↑ or the pointer has chosen
// it; typed text matches by N-MATCH over the model's index, its first match
// selected, and Enter goes to the selected row (`go`): a teleport and a
// trail entry through N-GO by what the row names — HOME's level HOME, and
// every other row by what its address names (M-ADDR's `kindOf`), a trail
// entry's as any other: the board WHOLE BOARD, an account its region, a
// document or a place in one a LEAP — the ring drawn at its landing where a
// key made the act; a share form's or a URL's row closes the box and goes
// nowhere, the intake not being built; where typed text matches nothing the
// box says so, the index's state beside the answer while the index is not
// complete, and Enter goes nowhere, the box standing open over the text and
// its answer with the focus in its input until the text is corrected or Esc
// closes it (K-31). While an input method's composition is open, Enter, Esc
// and the arrows are the IME's and act on nothing here (D5 §0).
// "Open beside" (K-101; foundations §2.3): the document in view is the one
// the line names at its reading scale, as the version its box shows (the
// app's reader); while one is, each row whose address names another
// document, or a place in one (`besideOf`), offers beside its go its own
// act, a native button Tab reaches after the input, row by row (D5 §4 rule
// 5) — a row naming the board, HOME, an account, a share form or a URL, the
// document in view or another version of it, offers none. Mod+Shift+Enter in
// the input makes it for the row ↓ or ↑ chose, else the answer's first row;
// at a row's act, and by a click on it, for that act's row (`beside`). It
// closes the box and opens the reading scene through N-GO (`toScene`): its
// first pane what the page shows of the document in view (T-LAYER's
// `paneSource`; FP-38), its second the row's place, the selection standing in
// the document in view held and the step it is opened from, so Back lights it
// — nothing held where none stands there. Where the press finds no row whose
// act opens — the box as opened with no row chosen, an answer of none, a row
// offering none, no document at its reading scale — nothing opens: the box
// stands with its text, its caret and its focus, and the one-line hint says
// why beside the box (O-HINT's `show`), an auto-repeat answered by nothing.
// Every key the box takes but Tab, Shift and an auto-repeat, a change of its
// text and a click on its rows is the reader's next act, which takes a
// standing hint down (O-HINT's `act`); the box's close takes down the hint
// it raised. The rows' acts are drawn again as the document in view changes
// (`takeReading`), a focus standing on one kept on the act bearing the same
// key, else given to the input (N-FOCUS's `keep`). Where no board is held
// the act closes the box onto O-FACES' no-board face, as Enter does.
// The box is the one line's stop, opened (the focus record's rule 18; D5 §4
// rule 4): its input takes the focus however it was opened, and its close
// hands the focus back through N-FOCUS (K-34; FP-20) — to the element it
// was opened from where that takes it, else to the walk's element. A landing
// never closes the box (FP-20): a jump's landing, a version move's or a key
// made at one leaves its text, its caret and its focus as they stand — a
// surface such a key opens standing beside the box without the caret
// (N-FOCUS's `open`), and an opening of the box leaving it as it stands
// (`open`) — and its close then gives the focus to that surface where it
// stands, else to the walk's element; the box as opened takes the address
// the line names as that changes (`takeAddress`), so it never holds a place
// the line does not show (K-30) — opened by the line's fold mark at the
// levels it folds, it holds them until then. The box stands over the overlay and the
// notice below it, so nothing shown while the reader types in it covers its
// input or its rows (FP-36) — save the hint its own refused press raises,
// over the box's foot where the window leaves it no room beside the box
// (the style's). The row chosen stands in the view of the rows'
// list, the one part of the box that gives way to a short window (FP-26): as
// the rows are drawn, after the status region has taken its share of the box,
// the list moves by the least that shows that row, and again where its room
// moves while a row is chosen (`roomChanged`). A list with no row chosen
// stands at its top, and the reader's own wheel over the rows stands until
// the next list or choice. The box is gone with
// the next act (M-1): a chord inside it acts as anywhere, the box closed
// first and the chord read at the focus the close returned — at a row's act
// every chord but Mod+Shift+Enter; the field's own chords — select all,
// copy, paste, cut, undo, the caret's — stay the input's; a focus that
// leaves the box — Tab out of it (D2), a click elsewhere — closes it, and
// the focus stands where it went. Opened, the box
// is an act on the chrome: a card or scene still reading ends, what stands
// staying (O-HOST's `endOpening`), so no answer arriving while the box
// stands opens over it or takes its focus, and the box is Esc's innermost
// thing (N-KEYS').
// Its rows are the model's (FP-29): each row's words are read from the index
// and the model as the rows are computed — a trail entry's by N-GO's
// `wordsOf`, never a copy the entry keeps — each set in its face as the rows
// are drawn (`cellsOf`; P-REG's FACE): an address the identifier's, a
// document's words the reading face's, the rest the client's; and a change of the page's class
// computes the rows standing in the box again at once (`classChanged`) and
// once more as the index the new class reads answers (`takeIndex`), its
// text, its caret and its focus left as they stand (FP-20). Where no board
// is held (FP-35) it lists no board's level, its status region says why in
// the answer's place — O-FACES' words (`noBoardWords`) — and Enter, on a row
// or none, closes it onto O-FACES' no-board face: a LEAP needs a board, and
// the act is answered, never silent.
// Its accessible form (R94; the WAI-ARIA combobox with a grid popup, list
// autocomplete with automatic selection): the input is the combobox,
// expanded while it lists rows, controlling the rows' grid; each row a row of
// two cells — its go, the address, the title and the words the row names,
// and its "open beside", empty where it offers none — the selected row
// `aria-selected`, and each act named by its words and its row's address;
// each go named by its cells' words, a title as written and a landmark's
// glyph out of the name (patterns K1). The box names the input by ST's
// `L.leap-label` and the grid by `L.leap-rows-label` as it attaches, every
// name rendered for the ear by S22's table (ST's `heard`; style S22). The platform's focus stays in the
// input until Tab moves it to an act; its active descendant names the
// selected row's go once ↓ or ↑ has carried the choice into the rows, and
// never on the box as opened or as typed, so what
// a reader meets first is the box itself — the current address that Mod+C
// copies and typing replaces (D5 K-30; §4 rule 4). The answer and the
// index's state are the box's own status region (D4), written only when its
// words change, so an arrow or a further keystroke repeats nothing.
// Rules: FP-1, FP-2, FP-9, FP-10, FP-13, FP-20, FP-26, FP-29, FP-35, FP-36, FP-38.

import * as REC from '../model/records.js';
import * as TRAIL from './trail.js';
import * as GO from './go.js';
import * as FOCUS from './focus.js';
import * as HOST from '../overlays/host.js';
import * as FACES from '../overlays/faces.js';
import * as HINT from '../overlays/hint.js';
import * as SEL from '../overlays/selection.js';
import * as LAYER from '../text/layer.js';
import { MAC } from './keys.js';
import { matches } from './match.js';
import { t, heard, joinRuns } from '../strings.js';
import { esc } from '../util.js';
import { markDirty } from '../plane/camera.js';
import { documentOf, homeOf, kindOf } from '../model/address.js';

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
/** the box stands as opened: nothing typed in it, no row chosen — it holds the address it opened at until the line names another (`takeAddress`) */
let asOpened = false;
/** the address the line named as the box opened, or as it last took one (`takeAddress`) */
let openedAt = '';
/** the status region's markup as last written */
let noteHTML = '';
/** the rows stand computed over an index a change of the page's class dropped: computed again once the new class's index answers (`takeIndex`) */
let stale = false;
/** the list's room, as `roomOf` reads it, when the row chosen was last brought into view */
let listRoom = '';
/** the document in view the rows' acts were last drawn for; '' where none was (`takeReading`) */
let drawnFor = '';
/** the string of the hint the last refused "open beside" raised, which the box's close takes down while it stands; '' where none was */
let refused = '';
/** @type {() => string | null} the current address's reader (the line's) */
let currentAddress = () => null;
/** @type {() => string | null} the document in view's reader (the app's): the document the line names at its reading scale, as the version its box shows; null where none is */
let inView = () => null;

/** the field's own chords with the command modifier held: select all, copy, paste, cut, undo, the caret's moves — never the plane's */
const FIELD_CHORDS = new Set(['a', 'c', 'v', 'x', 'z', 'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End']);

/** the id of row i */
const rowId = (/** @type {number} */ i) => `leap-row-${i}`;
/** the id of row i's go — the input's active descendant names it */
const goId = (/** @type {number} */ i) => `leap-go-${i}`;
/** the id of row i's address, which names its act beside the act's words */
const addrId = (/** @type {number} */ i) => `leap-addr-${i}`;
/** the id of row i's "open beside" */
const besideId = (/** @type {number} */ i) => `leap-beside-${i}`;
/** the key a row's act bears, which a rebuild puts the focus back on (N-FOCUS's `keep`): the row's kind, its trail number and its address */
const keyOf = (/** @type {Row} */ r) => `${r.kind} ${r.n ?? ''} ${r.addr}`;

/** the room the list stands in: its width beside its height, for a row's height follows the width its cells wrap in */
const roomOf = (/** @type {HTMLElement} */ list) => `${list.clientWidth}×${list.clientHeight}`;

/** is the key a chord pressing "open beside" (K-101): Mod+Shift+Enter */
const besideChord = (/** @type {KeyboardEvent} */ ev) => (MAC ? ev.metaKey : ev.ctrlKey) && ev.shiftKey && ev.key === 'Enter';

/** a key the box takes, the reader's next act (see the head): a standing hint taken down — every key but Tab, Shift and an auto-repeat */
function acted(/** @type {KeyboardEvent} */ ev) {
  if (ev.key !== 'Tab' && ev.key !== 'Shift' && !ev.repeat) HINT.act();
}

/**
 * Attach the box's elements and the app's readers (see the head).
 * @param {{box: HTMLElement, input: HTMLInputElement, rows: HTMLElement, note: HTMLElement}} e
 * @param {() => string | null} cur the current address's reader
 * @param {() => string | null} [reading] the document in view's reader; none in view where left out
 */
export function attach(e, cur, reading = () => null) {
  els = e; currentAddress = cur; inView = reading;
  e.input.setAttribute('aria-label', heard(t('L.leap-label')));
  e.rows.setAttribute('aria-label', heard(t('L.leap-rows-label')));
  e.input.addEventListener('input', () => { HINT.act(); asOpened = false; compute(e.input.value); render(); });
  e.input.addEventListener('keydown', (ev) => {
    acted(ev);
    if (ev.isComposing || ev.key === 'Process' || ev.keyCode === 229) { ev.stopPropagation(); return; } // the IME's until it commits (D5 §0)
    const mod = MAC ? ev.metaKey : ev.ctrlKey;
    // "open beside" (K-101): the box's own, on the row ↓ or ↑ chose, else the answer's first
    if (besideChord(ev)) { ev.stopPropagation(); ev.preventDefault(); beside(sel, { repeat: ev.repeat }); return; }
    // a chord acts as anywhere, the box closed first (M-1): it goes on to the plane's dispatch, which reads the focus the close returned
    if (mod && !FIELD_CHORDS.has(ev.key.length === 1 ? ev.key.toLowerCase() : ev.key)) { close(); return; }
    ev.stopPropagation(); // the box's keys are its own: the plane's dispatch never sees them
    if (ev.key === 'ArrowDown') { choose(1); ev.preventDefault(); }
    else if (ev.key === 'ArrowUp') { choose(-1); ev.preventDefault(); }
    else if (ev.key === 'Enter') { go(sel, true); ev.preventDefault(); }
    else if (ev.key === 'Escape') { close(); ev.preventDefault(); }
  });
  // at a row's act Mod+Shift+Enter is its own; every other chord acts as anywhere, the box closed first (M-1)
  e.rows.addEventListener('keydown', (ev) => {
    const act = /** @type {HTMLElement | null} */ (/** @type {HTMLElement} */ (ev.target).closest('[data-beside]'));
    if (!act) return;
    if (besideChord(ev)) { acted(ev); ev.stopPropagation(); ev.preventDefault(); beside(Number(act.dataset.beside), { repeat: ev.repeat }); return; }
    if (MAC ? ev.metaKey : ev.ctrlKey) close();
  });
  // a press on the rows chooses without moving the focus off the input (the combobox's form); a click on a row's act opens it beside, on the rest of a row goes
  e.box.addEventListener('mousedown', (ev) => { if (ev.target !== e.input) ev.preventDefault(); });
  e.rows.addEventListener('click', (ev) => {
    HINT.act();
    const at = /** @type {HTMLElement} */ (ev.target);
    const act = /** @type {HTMLElement | null} */ (at.closest('[data-beside]'));
    if (act) { beside(Number(act.dataset.beside)); return; }
    const r = /** @type {HTMLElement | null} */ (at.closest('[data-i]'));
    if (r) go(Number(r.dataset.i), FOCUS.byKey(ev));
  });
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

/** the input's combobox state, from the box's: expanded while it lists rows; the active descendant the selected row's go while the choice is in the rows */
function comboState() {
  if (!els) return;
  els.input.setAttribute('aria-expanded', String(openState && rows.length > 0));
  if (inRows) els.input.setAttribute('aria-activedescendant', goId(sel));
  else els.input.removeAttribute('aria-activedescendant');
}

/**
 * Open the box holding the current address, selected (K-30) — or the
 * address an act hands in, the levels the line's fold mark folds — a card or
 * scene still reading ended first, what stands staying (O-HOST's opening);
 * its input takes the focus, the opener remembered by the focus's owner. A
 * box standing open with its input holding the caret stands as it is, its
 * text, its caret and its rows with it (FP-20).
 */
export function open(prefill = currentAddress() || '') {
  if (!els) return;
  if (openState && document.activeElement === els.input) return;
  HOST.endOpening();
  const from = document.activeElement;
  openState = true; asOpened = true; openedAt = currentAddress() || '';
  els.box.classList.add('on');
  els.input.value = prefill;
  compute('');
  render();
  FOCUS.open('box', { el: els.box, from, byKey: true, first: els.input });
  els.input.select();
  markDirty();
}

/**
 * The box as opened takes the address the line names (see the head; FP-20):
 * while nothing is typed in it and no row chosen, a landing, a version move
 * or a camera move that changes the current address from the one it opened
 * at, or last took, puts that address in the box, selected, its levels listed
 * beneath it — so a box opened at the levels the line's fold mark folds holds
 * them until the line names another place. The app's loop runs it beside the
 * line's rebuild; a box typed in, or with a row chosen, keeps its text.
 */
export function takeAddress() {
  if (!els || !openState || !asOpened) return;
  const addr = currentAddress() || '';
  if (addr === openedAt) return;
  openedAt = addr;
  if (els.input.value === addr) return;
  els.input.value = addr;
  compute('');
  render();
  els.input.select();
}

/**
 * The rows' acts drawn again where the document in view is another than the
 * one they were drawn for (see the head) — a landing, a version move, a zoom
 * to or from its reading scale — the rows, the text and the choice as they
 * stand. The app's loop runs it beside the line's rebuild; a closed box takes
 * nothing.
 */
export function takeReading() {
  if (els && openState && (inView() ?? '') !== drawnFor) render();
}

/** the rows standing in the box computed again from the model (see the head): over the text in it — the levels where it stands as opened — its text, its caret and its focus left as they stand (FP-20) */
function relist() {
  if (!els || !openState) return;
  compute(asOpened ? '' : els.input.value);
  render();
}

/**
 * A change of the page's class (see the head; FP-23), told by the app as
 * M-PUMP tells it: the rows standing in the box computed again from the
 * model now (`relist`), so none names a document only the class the page
 * left could read, and once more as the index the new class reads answers
 * (`takeIndex`).
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

/**
 * A row's three cells as markup, each word in its face (see the head): its
 * address the identifier's; its title an address where it names one, a
 * document's words where it is a document's label, a trail entry's number
 * then its address, else the client's words; its last cell its address and
 * the client's mark after it, or a trail entry's words (N-GO's `wordsHTML`).
 * @param {import('./match.js').Row} r
 * @returns {[string, string, string]}
 */
function cellsOf(r) {
  const id = (/** @type {string} */ a) => (a ? `<span class="id">${esc(a)}</span>` : '');
  const title = r.kind === 'address' || (r.addr && r.title === r.addr) ? id(r.title)
    : r.kind === 'label' || r.kind === 'landmark' ? `<span class="reading">${esc(r.title)}</span>`
    : r.kind === 'trail' && r.addr && r.title.endsWith(r.addr) ? esc(r.title.slice(0, -r.addr.length)) + id(r.addr)
    : esc(r.title);
  const entry = r.kind === 'trail' && r.n != null ? TRAIL.numbered().find((x) => x.n === r.n) : undefined;
  const sub = entry ? GO.wordsHTML(entry.entry) : r.addr && r.sub.startsWith(r.addr) ? id(r.addr) + esc(r.sub.slice(r.addr.length)) : esc(r.sub);
  return [id(r.addr), title, sub];
}

/**
 * A row's go as its name says it (`cellsOf`), as stretches in their faces —
 * its address, its title, its sub-line and, at a landmark, the landmark's
 * word — rendered for the ear where it is set (ST's `heard`): a document's
 * words kept as written, the landmark's glyph kept out (patterns K1).
 * @param {Row} r
 * @returns {import('../strings.js').Run[]}
 */
function cellRuns(r) {
  const id = (/** @type {string} */ a) => /** @type {import('../strings.js').Run[]} */ (a ? [{ text: a, face: 'ident' }] : []);
  const title = r.kind === 'address' || (r.addr && r.title === r.addr) ? id(r.title)
    : r.kind === 'label' || r.kind === 'landmark' ? [{ text: r.title, face: /** @type {const} */ ('reading') }]
    : r.kind === 'trail' && r.addr && r.title.endsWith(r.addr) ? [{ text: r.title.slice(0, -r.addr.length), face: /** @type {const} */ ('client') }, ...id(r.addr)]
    : [{ text: r.title, face: /** @type {const} */ ('client') }];
  const entry = r.kind === 'trail' && r.n != null ? TRAIL.numbered().find((x) => x.n === r.n) : undefined;
  const sub = entry ? GO.wordsRuns(entry.entry) : r.addr && r.sub.startsWith(r.addr) ? [...id(r.addr), { text: r.sub.slice(r.addr.length), face: /** @type {const} */ ('client') }] : [{ text: r.sub, face: /** @type {const} */ ('client') }];
  return joinRuns(' ', [id(r.addr), title, sub, r.kind === 'landmark' ? t('F.landmark') : '']);
}

/**
 * The place a row's "open beside" opens beside the document in view (see the
 * head): the document the row's address names — a version as itself, a place
 * in a document that document (M-ADDR's `homeOf`) — where it is another
 * document than the one in view. Null for a row naming no document — the
 * board, HOME, an account, a share form, a URL — and for one naming the
 * document in view or another version of it.
 * @param {Row} r
 * @param {string} at the document in view
 * @returns {string | null}
 */
function besideOf(r, at) {
  const to = r.addr ? homeOf(r.addr) : null;
  return to && documentOf(to) !== documentOf(at) ? to : null;
}

/**
 * A row as markup (see the head): a row of the grid, selected where it is the
 * row chosen; its go, holding its three cells (`cellsOf`), named by them
 * rendered for the ear (`cellRuns`), its address named for its act; then its
 * "open beside", holding the act where the row offers
 * one beside the document in view (`besideOf`) — its key the row's (`keyOf`),
 * its name its words and the row's address.
 * @param {Row} r
 * @param {number} i
 * @param {string | null} at the document in view; null where none is
 */
function rowHTML(r, i, at) {
  const [addr, title, sub] = cellsOf(r);
  const act = at && besideOf(r, at) ? `<button type="button" id="${besideId(i)}" data-beside="${i}" data-key="${esc(keyOf(r))}" aria-labelledby="${besideId(i)} ${addrId(i)}">${esc(t('F.open-beside'))}</button>` : '';
  return `<div class="hit${i === sel ? ' sel' : ''}" id="${rowId(i)}" data-i="${i}" role="row" aria-selected="${i === sel}">`
    + `<div class="go" id="${goId(i)}" role="gridcell" aria-label="${esc(heard(cellRuns(r)))}"><span class="a" id="${addrId(i)}">${addr}</span><span>${title}</span><span class="a">${sub}${r.kind === 'landmark' ? ' ' + esc(t('F.landmark')) : ''}</span></div>`
    + `<div class="beside" role="gridcell">${act}</div></div>`;
}

/** close the box: the hint its refused "open beside" raised taken down where it stands, and the focus back through the focus's owner — to the surface a key made at a landing opened beside it, where that stands, else to the opener where no landing passed over the box, else to the walk's element; one that left the box already stays where it went */
export function close() {
  if (!els || !openState) return;
  openState = false; inRows = false; els.box.classList.remove('on');
  comboState();
  if (refused && HINT.standing()?.id === refused) HINT.act();
  refused = '';
  FOCUS.close('box');
  markDirty();
}

/**
 * Bring the list to the row chosen (see the head): moved by the least that
 * shows that row, its top first where it is taller than the list's view. A
 * list with no row chosen goes to its top; a choice naming no row — typed
 * text that lists nothing — leaves the list as it stands.
 */
function reveal() {
  if (!els) return;
  const list = els.rows;
  listRoom = roomOf(list);
  if (sel < 0) { list.scrollTop = 0; return; }
  const row = list.children[sel];
  if (!row) return;
  const c = row.getBoundingClientRect(), from = list.getBoundingClientRect().top + list.clientTop;
  const up = c.top - from, down = c.bottom - (from + list.clientHeight);
  if (up < 0) list.scrollTop += up;
  else if (down > 0) list.scrollTop += Math.min(up, down);
}

/**
 * Bring the list back to the row chosen where its room has moved since the
 * row was last brought into view (see the head) — by the window's size or by
 * the one line's rows. The app's loop runs it beside the line's rebuild. With
 * no row chosen, or the room as it stood, the list stays where the reader's
 * wheel left it.
 */
export function roomChanged() {
  if (els && openState && sel >= 0 && roomOf(els.rows) !== listRoom) reveal();
}

/**
 * Rebuild the rows — each with its act where it offers one beside the
 * document in view, a focus standing on an act put back on the act bearing
 * the same key, else on the input (N-FOCUS's `keep`) — the input's combobox
 * state and the status region — the answer, then the index's state; where no
 * board is held, why in their place — then bring the list to the row chosen,
 * in the room the status region left it (FP-13, FP-20, FP-26, FP-35).
 */
export function render() {
  if (!els) return;
  const list = els.rows, at = inView();
  drawnFor = at ?? '';
  const html = rows.map((r, i) => rowHTML(r, i, at)).join('');
  const focused = document.activeElement;
  if (focused && focused !== els.input && list.contains(focused)) FOCUS.keep(els.box, (x) => x.getAttribute('data-key'), () => { list.innerHTML = html; });
  else list.innerHTML = html;
  comboState();
  const st = REC.indexState();
  const floor = REC.floor();
  const typed = els.input.value.trim();
  const why = FACES.noBoardWords();
  const answer = why ? `<span data-string="${esc(why.id)}">${esc(why.text)}</span>` : !rows.length && typed ? `<span data-string="F.leap.none">${esc(t('F.leap.none'))}</span>` : '';
  const stateLine = st && st.arm !== 'complete' ? `<span data-string="F.index.state">${esc(t('F.index.state', { arm: st.arm }))}</span>${floor != null ? ` · <span data-string="F.leap.floor">${esc(t('F.leap.floor', { floor }))}</span>` : ''}${st.arm === 'building' || st.arm === 'widening' ? ` · <span data-string="F.leap.arriving">${esc(t('F.leap.arriving'))}</span>` : ''}` : '';
  const note = [answer, stateLine].filter(Boolean).join(' · ');
  if (note !== noteHTML) { noteHTML = note; els.note.innerHTML = note; }
  reveal();
}

/**
 * Enter: the row chosen goes (K-31), each a teleport and a trail entry by
 * what the row names (see the head) — HOME's level HOME, every other row by
 * what its address names; with no row chosen — the box as opened — the
 * current address, in place: the box closes, nothing moves and nothing is
 * pushed; with no row listed — typed text that matches nothing, since nothing
 * typed lists the levels, the whole board first — nowhere: the box stays open
 * over the text and the answer `render` wrote, the focus in its input,
 * nothing moved and nothing pushed (foundations §2.3). Where no board is
 * held, whatever is chosen, the box closes and the act is answered with why
 * and what still works (O-FACES' `noBoard`; FP-35).
 * @param {number} i the row chosen
 * @param {boolean} [byKey] Enter made the act, not a click on the row
 */
export async function go(i, byKey = false) {
  if (!REC.board()) { close(); FACES.noBoard(null); return; }
  if (!rows.length) return;
  const r = rows[i]; if (!r) { close(); return; }
  close();
  if (r.kind === 'share' || r.kind === 'url') return; // the share form's decoding and the intake are not built: the row goes nowhere
  if (r.kind === 'home') { await GO.home(byKey); return; }
  const kind = kindOf(r.addr);
  if (kind === 'board') { await GO.wholeBoard(byKey); return; }
  if (kind === 'account') { await GO.toAccount(r.addr, byKey); return; }
  await GO.leapTo(r.addr, { how: 'leap', byKey });
}

/**
 * "Open beside" (K-101; see the head): the reading scene on the document in
 * view and the place row i names, the box closed first, the selection
 * standing in the document in view held and the step it is opened from; else,
 * nothing opening, the hint saying why beside the box, its text, its caret
 * and its focus standing. Where no board is held, the box closes onto the
 * no-board face (FP-35).
 * @param {number} i the row it acts on: the row chosen, else −1
 * @param {{repeat?: boolean}} [o] `repeat` the press is a key's auto-repeat, which a refusal answers with nothing
 */
export function beside(i, o = {}) {
  if (!els) return;
  if (!REC.board()) { close(); FACES.noBoard(null); return; }
  const r = rows[i], at = inView(), to = r && at ? besideOf(r, at) : null;
  if (!to || !at) {
    HINT.show(refused = !r ? 'L.leap.beside.choose' : !at ? 'L.leap.beside.reading' : 'L.leap.beside.other', null, { at: els.box, repeat: o.repeat });
    return;
  }
  close();
  const s = SEL.selected(), held = s && s.addr === at ? s : null;
  void GO.toScene(LAYER.paneSource(at), to, held ? { posA: held.pos, widthA: held.width, posB: null } : {}, { from: held ? { passage: { addr: held.addr, pos: held.pos, width: held.width } } : null, site: null });
}

/** the rows (the gate reads them) */
export const currentRows = () => rows.slice();
