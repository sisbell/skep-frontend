// N-LEAP — THE LEAP BOX (the structure record §3.2 "N-LEAP"; foundations
// §2.3; B1-S11; D5 §1.4). Layer 2. ENGINE-BOUND. State: VIEW — open or
// closed, the text, the rows, the selected row, whether ↓/↑ has carried the
// choice into the rows. A control that rebuilds itself from its state
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
// answer while the index is not complete. While an input method's
// composition is open, Enter, Esc and the arrows are the IME's and act on
// nothing here (D5 §0). The box's close hands the focus back through
// N-WALK, the focus's owner (D5 §4 rule 4; K-34): to the element it was
// opened from, or to the walk's element where that no longer takes the focus
// — as the mirror's item it was opened from no longer does once a camera move
// under the box has re-taken the walk's focus and rebuilt the mirror. The
// intake's URL arm and search (K-35) are the code lane's.
// ITS ACCESSIBLE FORM (R94; the WAI-ARIA combobox, list autocomplete with
// automatic selection): the input is the combobox, expanded while it lists
// rows, controlling the rows' listbox, the selected row `aria-selected`. The
// platform's focus stays in the input; its active descendant names the
// selected row once ↓ or ↑ has carried the choice into the rows, and never
// on the box as opened or as typed, so what a reader meets first is the box
// itself — the current address that Mod+C copies and typing replaces (D5
// K-30; §4 rule 4). The answer and the index's state are the box's own
// status region, written only when its words change: a live region speaks
// whatever is rewritten, so an arrow or a further keystroke repeats nothing.
// Carries: the wireframe's §12. Rules: FP-1, FP-2, FP-9, FP-10, FP-13.

import * as REC from '../model/records.js';
import * as TRAIL from './trail.js';
import * as GO from './go.js';
import * as WALK from './walk.js';
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
/** the status region's markup as last written */
let noteHTML = '';
/** @type {() => string | null} the current address's reader (the line's) */
let currentAddress = () => null;
/** @type {Element | null} the element the box was opened from, where its close returns the focus */
let returnTo = null;

/** the id of row i — the input's active descendant names it */
const rowId = (/** @type {number} */ i) => `leap-row-${i}`;

/** @param {{box: HTMLElement, input: HTMLInputElement, rows: HTMLElement, note: HTMLElement}} e @param {() => string | null} cur */
export function attach(e, cur) {
  els = e; currentAddress = cur;
  e.input.addEventListener('input', () => { compute(e.input.value); render(); });
  e.input.addEventListener('keydown', (ev) => {
    ev.stopPropagation(); // the box's keys are its own: the plane's dispatch never sees them
    if (ev.isComposing || ev.key === 'Process' || ev.keyCode === 229) return; // the IME's until it commits (D5 §0)
    if (ev.key === 'ArrowDown') { choose(1); ev.preventDefault(); }
    else if (ev.key === 'ArrowUp') { choose(-1); ev.preventDefault(); }
    else if (ev.key === 'Enter') { go(sel, true); ev.preventDefault(); }
    else if (ev.key === 'Escape') { close(); ev.preventDefault(); }
  });
  e.rows.addEventListener('click', (ev) => { const r = /** @type {HTMLElement} */ (ev.target).closest('[data-i]'); if (r) go(Number(/** @type {HTMLElement} */ (r).dataset.i)); });
}
export const isOpen = () => openState;

function ctx() {
  const s = REC.session();
  const cur = currentAddress();
  return {
    places: REC.places(), landmarks: REC.landmarks(),
    trail: TRAIL.numbered().map((r) => ({ n: r.n, addr: r.entry.addr, label: r.entry.label })),
    current: cur, board: '1', home: s && s.account ? s.account : null,
    levelWords: { board: t('F.level.board'), home: t('F.level.home'), account: t('F.level.account'), document: t('F.level.document') },
  };
}
/** the rows for the text; typed text selects its first match, and nothing typed chooses no row (foundations §2.3) */
function compute(/** @type {string} */ text) { rows = matches(text, ctx()); sel = text.trim() ? 0 : -1; inRows = false; }

/** ↓ / ↑ (K-32): the choice moves one row and into the rows; nothing goes */
function choose(/** @type {1 | -1} */ step) {
  if (!rows.length) return;
  sel = Math.max(0, Math.min(rows.length - 1, sel + step));
  inRows = true;
  render();
}

/** the input's combobox state, from the box's: expanded while it lists rows; the active descendant the selected row while the choice is in the rows */
function comboState() {
  if (!els) return;
  els.input.setAttribute('aria-expanded', String(openState && rows.length > 0));
  if (inRows) els.input.setAttribute('aria-activedescendant', rowId(sel));
  else els.input.removeAttribute('aria-activedescendant');
}

/** open the box holding the current address, selected (K-30) */
export function open(prefill = currentAddress() || '') {
  if (!els) return;
  returnTo = document.activeElement;
  openState = true;
  els.box.classList.add('on');
  els.input.value = prefill;
  compute('');
  render();
  els.input.focus(); els.input.select();
  markDirty();
}
export function close() {
  if (!els || !openState) return;
  openState = false; inRows = false; els.box.classList.remove('on'); els.input.blur();
  comboState();
  WALK.returnFocus(returnTo);
  markDirty();
}

/** rebuild the rows, the input's combobox state and the status region — the answer, then the index's state (FP-13) */
export function render() {
  if (!els) return;
  const st = REC.indexState();
  const floor = REC.floor();
  const typed = els.input.value.trim();
  els.rows.innerHTML = rows.map((r, i) => `<div class="hit ${i === sel ? 'sel' : ''}" id="${rowId(i)}" data-i="${i}" role="option" aria-selected="${i === sel}"><span class="a">${esc(r.addr)}</span><span>${esc(r.title)}</span><span class="a">${esc(r.sub)}${r.kind === 'landmark' ? ' ' + esc(t('F.landmark')) : ''}</span></div>`).join('');
  comboState();
  const answer = !rows.length && typed ? `<span data-string="F.leap.none">${esc(t('F.leap.none'))}</span>` : '';
  const stateLine = st && st.arm !== 'complete' ? `<span data-string="F.index.state">${esc(t('F.index.state', { arm: st.arm }))}</span>${floor != null ? ` · <span data-string="F.leap.floor">${esc(t('F.leap.floor', { floor }))}</span>` : ''}${st.arm === 'building' || st.arm === 'widening' ? ` · <span data-string="F.leap.arriving">${esc(t('F.leap.arriving'))}</span>` : ''}` : '';
  const note = [answer, stateLine].filter(Boolean).join(' · ');
  if (note === noteHTML) return;
  noteHTML = note;
  els.note.innerHTML = note;
}

/**
 * Enter: the row chosen goes (K-31), each a teleport and a trail entry; with
 * no row chosen — the box as opened — the current address, in place: the box
 * closes, nothing moves and nothing is pushed (foundations §2.3).
 * @param {number} i the row chosen
 * @param {boolean} [byKey] Enter made the act, not a click on the row
 */
export async function go(i, byKey = false) {
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
