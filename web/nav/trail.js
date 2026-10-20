// N-TRAIL — the address stack with its cursor (the structure record §3.2
// "N-TRAIL"; foundations §2.2). Layer 2. PURE. State: VIEW — THE ONE OWNER
// (FP-10): client-side, never written (law 1).
// An entry is an address and a view (S3 Q7's tuple), its view RE-TAKEN
// whenever the entry is departed, so Back lands on the passage left; an
// entry a follow departed holds the link followed. The launch frame is the
// first entry (W-01); after it an entry is pushed by a fresh TELEPORT —
// LEAP, follow, a click on a place, Enter, HOME, WHOLE BOARD, an account's
// region — one push per act, never by panning or zooming, and never by a
// reading scene's end, which leaves the camera where it found it (SC). Back,
// Forward and a jump move the cursor and discard nothing, and a jump never
// pushes. A fresh teleport made with the cursor behind the newest entry drops
// the entries ahead of it before it pushes (a browser's history rule, stated).
// Carries: the wireframe's §11 `pushTrail` (its de-duplication by address
// and its cap of twelve DROPPED: the stack is the record of teleports).
// Rules: FP-1, FP-2, FP-7, FP-10.

/**
 * @typedef {Object} Entry
 * @property {string} addr the place teleported to
 * @property {number | null} pos the position landed on, where one was
 * @property {{x: number, y: number, scale: number}} view the view at the entry — the landing's, re-taken at departure
 * @property {string | null} link the link followed to reach it, where one was
 * @property {string | null} label the place's label at the push
 */

/** @type {Entry[]} */
let entries = [];
/** the cursor: the index of the entry the camera is at, or -1 */
let cursor = -1;

/**
 * Push a fresh teleport's entry: the departed entry's view re-taken first,
 * the entries ahead of the cursor dropped.
 * @param {Entry} e
 * @param {{x: number, y: number, scale: number} | null} departedView the camera's view as the teleport left
 */
export function push(e, departedView) {
  if (cursor >= 0 && departedView) entries[cursor].view = { ...departedView };
  entries = entries.slice(0, cursor + 1);
  entries.push({ ...e, view: { ...e.view } });
  cursor = entries.length - 1;
}

/** @returns {Entry | null} the entry behind the cursor, moving to it; null at the oldest */
export function back(/** @type {{x: number, y: number, scale: number} | null} */ departedView) {
  if (cursor <= 0) return null;
  if (departedView) entries[cursor].view = { ...departedView };
  cursor--;
  return entries[cursor];
}
/** @returns {Entry | null} */
export function forward(/** @type {{x: number, y: number, scale: number} | null} */ departedView) {
  if (cursor < 0 || cursor >= entries.length - 1) return null;
  if (departedView) entries[cursor].view = { ...departedView };
  cursor++;
  return entries[cursor];
}
/**
 * Jump to entry n, newest-first (1 = the newest) — a cursor move, never a push.
 * @param {number} n
 * @param {{x: number, y: number, scale: number} | null} departedView
 * @returns {Entry | null}
 */
export function jump(n, departedView) {
  const i = entries.length - n;
  if (i < 0 || i >= entries.length) return null;
  if (cursor >= 0 && departedView) entries[cursor].view = { ...departedView };
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
/** reset (a board change; tests) */
export function _reset() { entries = []; cursor = -1; }
