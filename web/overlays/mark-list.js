// O-MARK-LIST — a continuation's mark's list (the structure record §3.2;
// foundations §2.1; P44). Layer 2. ENGINE-BOUND. State (FP-10): the list
// standing — the mark it lists and the pages it shows — alone.
// Opened at the mark (`open`) — by a press on the rest of the mark
// (APP-INPUT's) or by Enter at the mark's stop (N-KEYS') — the walk put on the
// mark's stop first (N-WALK's `focusTo`), so the mark's item is the list's
// opener and Esc returns the focus there (O-HOST's dismissal; N-FOCUS's
// `close`). Its rows are the mark's members as the plane counts them (P-PROJ's
// `membersAt`), newest first — the highest-numbered — PAGE a page, "show more"
// for the next and the end marked; each row the document's label as the plane
// draws it: the address of the version its box shows (N-GO's `shownIn`),
// whole, in the identifier's face, then its first line by the one rule
// (T-LAYER's `firstLineHTML`), read from the model as the page is built and
// never kept, so the list reads nothing of a row it does not show. A row's
// act, a press or Enter, is a LEAP to its document, its trail entry taken at
// the act (N-GO's `leapTo`), the list ending as the camera leaves; a failure
// known at the act faces at the mark. Its caption is the mark's count in what
// it counts (ST's `markCount`) and its account. Opened by a key it takes the
// focus on its newest row, its first; by a press, none (O-HOST's). The list
// leaves and returns with its place (FP-36): it shows naming what it is
// about (O-HOST's `about`) — the mark and the pages it shows — and a return
// reopens it from that (`reopen`), at the mark as the plane draws it then,
// taking the focus on the control it was left holding it on.
// Figures: twelve rows a page.
// Rules: FP-1, FP-2, FP-10, FP-13, FP-20, FP-25, FP-36.

import * as HOST from './host.js';
import * as WALK from '../nav/walk.js';
import * as GO from '../nav/go.js';
import * as REC from '../model/records.js';
import * as LAYER from '../text/layer.js';
import { continuationCell, membersAt, continuationOf } from '../plane/projection.js';
import { accountOf } from '../model/address.js';
import { t, markCount } from '../strings.js';
import { esc } from '../util.js';

const PAGE = 12;

/** @typedef {{kind: 'mark', key: string, page: number}} About what the list is about (see the head): the mark, by its name (P-PROJ's `markKey`), and the pages it showed */

/** @type {{key: string, page: number} | null} the list standing: the mark it lists, by its name, and the pages it shows */
let listing = null;

/** is the list standing for a mark, by its name */
export const isOpen = (/** @type {string} */ key) => !!listing && listing.key === key;

/** a mark's members as the plane counts them, newest first (see the head) */
const newestFirst = (/** @type {{account: string, k: number}} */ c) => [...(membersAt(REC.known().filter((doc) => accountOf(doc) === c.account), c.k).get(c.account) || [])].reverse();

/**
 * Open the list at a mark (see the head): the walk put on the mark's stop,
 * then the list shown, its newest row taking the focus where a key opened
 * it. An opening (O-HOST's): where another act was made on the chrome while
 * the walk moved, or the walk stands elsewhere once it has — the mark not
 * drawn at the scale the camera is bound for — nothing shows.
 * @param {string} key the mark's name (P-PROJ's `markKey`)
 * @param {boolean} [byKey] a key made the act
 * @returns {Promise<void>} settled once the list shows, or nothing will
 */
export function open(key, byKey = false) {
  return opened(key, 1, byKey, null, null);
}

/**
 * The list reopened on a return to its place (see the head; N-GO's): the
 * walk on the mark's stop, then the pages it showed, the focus on the
 * control it was left holding it on, else none — nothing where the mark is
 * not drawn at the scale the camera is bound for.
 * @param {{about: About, focus: string | null}} left
 * @returns {Promise<void>} settled once the list shows, or nothing will
 */
export function reopen(left) {
  return opened(left.about.key, left.about.page, false, left.focus, left);
}

/**
 * The list's opening (`open`, `reopen`): the walk put on the mark's stop,
 * then the list shown with its pages where the walk stands there.
 * @param {string} key
 * @param {number} page
 * @param {boolean} byKey
 * @param {string | null} focus
 * @param {import('./host.js').Left | null} left the list a return reopens, as the reader left it
 * @returns {Promise<void>}
 */
function opened(key, page, byKey, focus, left) {
  return HOST.opening(async (stands) => {
    if (!continuationOf(key)) return null;
    await WALK.focusTo(key, null, byKey, true);
    const f = WALK.current();
    return stands() && f && f.kind === 'mark' && f.addr === key ? key : null;
  }, () => { listing = { key, page }; render(byKey, focus); }, left);
}

/**
 * Rebuild the list from state (FP-13): its caption, its rows a page more at
 * each "show more", the end marked once every member is listed; the list
 * naming what it is about.
 * @param {boolean} [byKey] a key opened it: the focus goes to its newest row
 * @param {string | null} [focus] a reopened list's control the focus was left on (O-HOST's `keyOf`): it takes the focus there
 */
export function render(byKey = false, focus = null) {
  if (!listing) return;
  const { key, page } = listing, c = continuationOf(key);
  if (!c) return;
  const all = newestFirst(c), rows = all.slice(0, page * PAGE), more = all.length > rows.length;
  const cell = continuationCell(c.account, c.k), at = { x: cell.x + cell.w / 2, y: cell.y + cell.h / 2 };
  const html = `<span class="label">${esc(markCount(all.length, REC.countsExact()))} · <span class="id">${esc(c.account)}</span></span>` +
    `<ul class="rows">${rows.map((doc, i) => { const shown = GO.shownIn(doc); return `<li><button data-run="m${i}"><span class="id">${esc(shown)}</span> <span class="dim">${LAYER.firstLineHTML(REC.doc(shown))}</span></button></li>`; }).join('')}</ul>` +
    (more ? `<button data-run="more">${esc(t('B1.show-more'))}</button>` : rows.length ? `<span class="end">·</span>` : '');
  /** @type {Record<string, import('./host.js').Act>} */
  const acts = { more: () => { if (listing) listing.page++; render(); } };
  rows.forEach((doc, i) => { acts['m' + i] = (_el, byKey) => { void GO.leapTo(GO.shownIn(doc), { how: 'leap', byKey, site: { world: at } }); }; });
  HOST.show({
    kind: 'list', id: 'mark:' + key, anchor: { world: { x: cell.x + cell.w, y: cell.y } }, html, acts, takeFocus: byKey || focus != null, first: focus != null ? HOST.controlOf(focus) : undefined,
    about: { kind: 'mark', key, page },
    onDismiss: () => { if (listing && listing.key === key) listing = null; },
  });
}
