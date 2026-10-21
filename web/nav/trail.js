// N-TRAIL — the address stack with its cursor (the structure record §3.2
// "N-TRAIL"; foundations §2.2). Layer 2. PURE. State: VIEW — the entries, the
// cursor and the claims standing unanswered — THE ONE OWNER (FP-10):
// client-side, never written (law 1).
// An entry is an address and a view (S3 Q7's tuple), its view RE-TAKEN
// whenever the entry is departed, so Back lands on the passage left; an
// entry a follow departed holds the link followed. The launch frame is the
// first entry (W-01); after it an entry is pushed by a fresh TELEPORT —
// LEAP, follow, a click on a place, Enter, HOME, WHOLE BOARD, an account's
// region — one push per act, made as the act is made, never by panning or
// zooming, and never by a reading scene's end, which leaves the camera where
// it found it (SC). Back, Forward and a jump move the cursor and discard
// nothing, and a jump never pushes. A fresh teleport made with the cursor
// behind the newest entry drops the entries ahead of it before it pushes (a
// browser's history rule, stated).
// THE CLAIM: a teleport whose landing waits on a read pushes its entry as a
// claim, so the trail holds every act's move in the order the acts were
// made, whatever order the reads answer in. A claim's view is its landing's
// as the records held at the push place it, and is never re-taken while the
// claim stands — the camera never landed there; its read answers it, either
// SETTLED (`settle`: the view, the position and the positions the read
// placed; what its push dropped stays dropped) or, where the read ended in a
// face, WITHDRAWN (`withdraw`: taken out, a cursor on it or past it stepping
// back one, and, where it is still the newest entry, the entries its push
// dropped put back — never a withdrawn claim among them). A cursor move that
// reaches a claim lands once it is answered (`pending`).
// Carries: the wireframe's §11 `pushTrail` (its de-duplication by address
// and its cap of twelve DROPPED: the stack is the record of teleports).
// Rules: FP-1, FP-2, FP-7, FP-10.

/** @typedef {{x: number, y: number, scale: number}} View */

/**
 * @typedef {Object} Entry
 * @property {string} addr the place teleported to
 * @property {number | null} pos the position landed on, where one was
 * @property {number | null} width the positions landed on from `pos`, where the landing named a span: a follow's projected far end, the span the arrival mark outlines
 * @property {View} view the view at the entry — the landing's, re-taken at departure
 * @property {string | null} link the link followed to reach it, where one was
 * @property {string | null} label the place's label at the push
 */

/**
 * @typedef {Object} Claim — an entry pushed as its teleport was made, its landing waiting on a read
 * @property {Entry[]} dropped the entries its push dropped ahead of the cursor
 * @property {Promise<void>} answered settled once the claim is settled or withdrawn
 * @property {() => void} wake settles `answered`
 */

/** @type {Entry[]} */
let entries = [];
/** the cursor: the index of the entry the camera is at, or -1 */
let cursor = -1;
/** @type {Map<Entry, Claim>} the claims standing unanswered */
const claims = new Map();

/** the cursor's entry re-takes the view it is departed at — a claim's never: the camera never landed there */
function retake(/** @type {View | null} */ departedView) {
  if (cursor >= 0 && departedView && !claims.has(entries[cursor])) entries[cursor].view = { ...departedView };
}

/**
 * Push a fresh teleport's entry: the departed entry's view re-taken first,
 * the entries ahead of the cursor dropped.
 * @param {Entry} e
 * @param {View | null} departedView the view the camera was bound for as the teleport left
 * @param {boolean} [claim] the landing waits on a read: the entry stands as a claim until `settle` or `withdraw` answers it
 * @returns {Entry} the entry as the trail holds it
 */
export function push(e, departedView, claim = false) {
  retake(departedView);
  const dropped = entries.slice(cursor + 1);
  entries = entries.slice(0, cursor + 1);
  const held = { ...e, view: { ...e.view } };
  entries.push(held);
  cursor = entries.length - 1;
  if (claim) {
    /** @type {() => void} */
    let wake = () => {};
    /** @type {Promise<void>} */
    const answered = new Promise((r) => { wake = () => r(); });
    claims.set(held, { dropped, answered, wake });
  }
  return held;
}

/** the claim at an entry answered: no longer standing, and every cursor move waiting on it woken */
function answer(/** @type {Entry} */ e) {
  const c = claims.get(e);
  if (!c) return;
  claims.delete(e);
  c.wake();
}

/**
 * A claim answered with its landing: the view, and the position and the
 * positions where the read placed them, set on the entry; what its push
 * dropped stays dropped.
 * @param {Entry} e
 * @param {{view: View, pos?: number | null, width?: number | null}} landing
 */
export function settle(e, landing) {
  e.view = { ...landing.view };
  if (landing.pos !== undefined) e.pos = landing.pos;
  if (landing.width !== undefined) e.width = landing.width;
  answer(e);
}

/**
 * A claim answered with a face: the entry taken out — a cursor on it or past
 * it stepping back one, so a cursor on it stands on the entry before it —
 * and, where it was the newest entry, the entries its push dropped put back
 * after it; taken out of the entries any other claim's push dropped, so no
 * withdrawal puts it back.
 * @param {Entry} e
 */
export function withdraw(e) {
  const c = claims.get(e);
  const i = entries.indexOf(e);
  if (i >= 0) {
    entries.splice(i, 1);
    if (cursor >= i) cursor--;
    if (c && i === entries.length) entries.push(...c.dropped);
  }
  for (const other of claims.values()) { const k = other.dropped.indexOf(e); if (k >= 0) other.dropped.splice(k, 1); }
  answer(e);
}

/**
 * What a cursor move that reached an entry waits on before it lands.
 * @param {Entry} e
 * @returns {Promise<void> | null} settled once the claim standing at the entry is answered; null where none stands there
 */
export function pending(e) { const c = claims.get(e); return c ? c.answered : null; }

/** @returns {Entry | null} the entry behind the cursor, moving to it; null at the oldest */
export function back(/** @type {View | null} */ departedView) {
  if (cursor <= 0) return null;
  retake(departedView);
  cursor--;
  return entries[cursor];
}
/** @returns {Entry | null} */
export function forward(/** @type {View | null} */ departedView) {
  if (cursor < 0 || cursor >= entries.length - 1) return null;
  retake(departedView);
  cursor++;
  return entries[cursor];
}
/**
 * Jump to entry n, newest-first (1 = the newest) — a cursor move, never a push.
 * @param {number} n
 * @param {View | null} departedView
 * @returns {Entry | null}
 */
export function jump(n, departedView) {
  const i = entries.length - n;
  if (i < 0 || i >= entries.length) return null;
  retake(departedView);
  cursor = i;
  return entries[cursor];
}
/** the entries, oldest first */
export const all = () => entries.slice();
/** the entries newest-first with their numbers (1 = the newest), as the pips and the list show them */
export function numbered() { return entries.slice().reverse().map((e, i) => ({ n: i + 1, entry: e, current: entries.length - 1 - i === cursor })); }
export const cursorIndex = () => cursor;
export const canBack = () => cursor > 0;
export const canForward = () => cursor >= 0 && cursor < entries.length - 1;
export const current = () => (cursor >= 0 ? entries[cursor] : null);
export const length = () => entries.length;
/** reset (a board change; tests): every move waiting on a claim woken, to find the trail empty */
export function _reset() {
  entries = []; cursor = -1;
  for (const c of claims.values()) c.wake();
  claims.clear();
}
