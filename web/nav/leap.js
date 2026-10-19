// N-LEAP — THE LEAP BOX (the structure record §3.2 "N-LEAP"; foundations
// §2.3; B1-S11; D5 §1.4). Layer 2. ENGINE-BOUND. State: VIEW — open or
// closed, the text, the rows, the selected row. A control that rebuilds
// itself from its state (FP-13). Opened by Mod+L / Mod+K or the address
// segment's act, holding the CURRENT ADDRESS, selected (the address bar's
// habit), and listing beneath it the address's levels — the whole board
// first, HOME where it differs, the account's region, the whole document —
// then the landmarks and the trail's entries, until a key is typed; typed
// text matches by N-MATCH over the model's index; Enter goes to the selected
// row (the first match unless ↓/↑ chose another); an address this client has
// no record of is asked of the board and faced where nothing answers (C-42's
// content, B1-S8); the index's state stands beside the answer while the
// index is not complete. The intake's URL arm and search (K-35) are the code
// lane's. Carries: the wireframe's §12. Rules: FP-1, FP-2, FP-9, FP-10,
// FP-13.

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
let sel = 0;
/** @type {() => string | null} the current address's reader (the line's) */
let currentAddress = () => null;
/** @type {Element | null} */
let returnTo = null;

/** @param {{box: HTMLElement, input: HTMLInputElement, rows: HTMLElement, note: HTMLElement}} e @param {() => string | null} cur */
export function attach(e, cur) {
  els = e; currentAddress = cur;
  e.input.addEventListener('input', () => { compute(e.input.value); render(); });
  e.input.addEventListener('keydown', (ev) => {
    if (ev.key === 'ArrowDown') { sel = Math.min(rows.length - 1, sel + 1); render(); ev.preventDefault(); }
    else if (ev.key === 'ArrowUp') { sel = Math.max(0, sel - 1); render(); ev.preventDefault(); }
    else if (ev.key === 'Enter') { go(sel); ev.preventDefault(); }
    else if (ev.key === 'Escape') { close(); ev.preventDefault(); }
    ev.stopPropagation();
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
function compute(/** @type {string} */ text) { rows = matches(text, ctx()); sel = 0; }

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
  openState = false; els.box.classList.remove('on'); els.input.blur();
  if (returnTo && /** @type {HTMLElement} */ (returnTo).focus) /** @type {HTMLElement} */ (returnTo).focus({ preventScroll: true });
  markDirty();
}

/** rebuild the rows and the index's state line (FP-13) */
export function render() {
  if (!els) return;
  const st = REC.indexState();
  const floor = REC.floor();
  const typed = els.input.value.trim();
  els.rows.innerHTML = rows.length
    ? rows.map((r, i) => `<div class="hit ${i === sel ? 'sel' : ''}" data-i="${i}" role="option" aria-selected="${i === sel}"><span class="a">${esc(r.addr)}</span><span>${esc(r.title)}</span><span class="a">${esc(r.sub)}${r.kind === 'landmark' ? ' ' + esc(t('F.landmark')) : ''}</span></div>`).join('')
    : typed ? `<div class="hit none draft" data-string="F.leap.none">${esc(t('F.leap.none'))}</div>` : '';
  const stateLine = st && st.arm !== 'complete' ? `<span class="draft" data-string="F.index.state">${esc(t('F.index.state', { arm: st.arm }))}</span>${floor != null ? ` · <span class="draft" data-string="F.leap.floor">${esc(t('F.leap.floor', { floor }))}</span>` : ''}${st.arm === 'building' || st.arm === 'widening' ? ` · <span class="draft" data-string="F.leap.arriving">${esc(t('F.leap.arriving'))}</span>` : ''}` : '';
  els.note.innerHTML = stateLine;
}

/** Enter: the row chosen goes (K-31); nothing typed and no row chosen → the current address in place */
export async function go(/** @type {number} */ i) {
  const r = rows[i]; if (!r) { close(); return; }
  close();
  if (r.kind === 'board') { await GO.wholeBoard(); return; }
  if (r.kind === 'home') { await GO.home(); return; }
  if (r.kind === 'share' || r.kind === 'url') return; // the share form's decoding and the intake are not this lane's
  if (r.kind === 'account') { await GO.flyToCell((await import('../plane/projection.js')).accountCell(r.addr)); await WALK.focusTo(r.addr, null); return; }
  if (r.kind === 'address') {
    const doc = documentOf(r.addr);
    if (doc) { await GO.leapTo(r.addr, { how: 'leap' }); return; }
    const acct = accountOf(r.addr);
    if (acct) { await GO.flyToCell((await import('../plane/projection.js')).accountCell(acct)); await WALK.focusTo(acct, null); return; }
    await GO.wholeBoard(); return;
  }
  await GO.leapTo(r.addr, { how: 'leap' });
}

/** the rows (the gate reads them) */
export const currentRows = () => rows.slice();
