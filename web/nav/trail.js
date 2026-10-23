// N-TRAIL — the address stack with its cursor (the structure record §3.2
// "N-TRAIL"; foundations §2.2). Layer 2. PURE. State: VIEW — the entries, the
// cursor and the claims standing unanswered — THE ONE OWNER (FP-10):
// client-side, never written (law 1).
// An entry is an address and a view (S3 Q7's tuple), its view RE-TAKEN
// whenever the entry is departed, so Back lands on the passage left, and THE
// STEP THAT LEFT IT for the entry after it (issue #152's design decision),
// written as a push departs it: the link followed for a follow, the passage
// carried for a carrying LEAP — by identity, the permanent addresses of its
// bytes, never its positions — and none for any other move, nor for a claim
// departed, where the camera never stood. A one-step move across an entry's
// step lights it at the end it lands on (N-GO's `back` and `forward`); a
// cursor move writes none. The launch frame is the first entry (W-01);
// after it an entry is pushed by a fresh TELEPORT — LEAP, follow, a click on
// a place, Enter, HOME, WHOLE BOARD, an account's region — one push per act,
// made as the act is made, never by panning or zooming, and never by a
// reading scene's end, which leaves the camera where it found it (SC). Back,
// Forward and a jump move the cursor and discard nothing, and a jump never
// pushes. A fresh teleport made with the cursor behind the newest entry
// writes its step on the cursor's entry in the place of the one it held and
// drops the entries ahead of it before it pushes (a browser's history rule,
// stated).
// THE CLAIM: a teleport whose landing waits on a read pushes its entry as a
// claim as it is made, numbered then and never handed back (issue #136's
// design decision), so the trail holds every act's move in the order the
// acts were made, whatever order the reads answer in, and Back, Forward and
// a jump act at once on the trail as it stands: at any board speed a jump
// then Back returns to where the jump left from, a second Back goes one
// entry further, and each entry's number is the one its key takes. A claim's
// view is its landing's as the records held at the push place it, and is
// never re-taken while the claim stands — the camera never landed there; it
// holds its jump's reading notice. Its read answers it (`settle`) with what
// the read brought — a place: the view, the position and the positions the
// read placed; or a NOTICE: the face the entry shows on every return to it,
// at the view the jump left from where the read brought no place to read —
// and what its push dropped stays dropped, as any push's does. A cursor move
// that reaches a claim lands once it is answered (`pending`).
// Carries: the wireframe's §11 `pushTrail` (its de-duplication by address
// and its cap of twelve DROPPED: the stack is the record of teleports).
// Rules: FP-1, FP-2, FP-7, FP-10.

/** @typedef {{x: number, y: number, scale: number}} View */
/** @typedef {import('../model/records.js').ISpan} ISpan */

/**
 * @typedef {Object} FollowStep — a follow, as the entry it left records it
 * @property {'follow'} kind
 * @property {string} link the link followed: lit by Back where the follow was made, and by Forward with the span it landed on
 * @property {string} near the document holding the link's end the follow was made at
 * @property {string} key that end's key (LK's `endKey`): Back returns the focus to its item there
 * @property {string} far the document followed into
 * @property {ISpan[] | null} spans the far end by identity — its slot's stored spans — which Forward outlines wherever the far document's text holds them; null where the end names the far document whole, Forward marking the block at its head
 */

/**
 * @typedef {Object} CarryStep — a LEAP carrying a passage, as the entry it left records it
 * @property {'carry'} kind
 * @property {string} from the document the passage was carried from: Back outlines it there
 * @property {string} to the document the LEAP was made to: Forward outlines it there
 * @property {ISpan[]} spans the passage by identity (M-REC's `identityOf`), never empty: a passage the page cannot name so is carried by a LEAP that records no step
 */

/** @typedef {FollowStep | CarryStep} Step the step that left an entry for the one after it (issue #152's design decision): a follow, or a LEAP carrying a passage — any other move leaves none */

/**
 * @typedef {Object} Site — where a notice stands, as data: O-HOST's anchor without an element, so an entry is read by value
 * @property {{addr: string, pos: number, width?: number}} [span] a span of a document — a block by its first position, or the bytes a width names
 * @property {{x: number, y: number}} [world] a world point
 */

/**
 * @typedef {Object} Notice — the face an entry shows, as data (issue #136's design decision): where its jump was made while its read is out, then on every return to the entry once its read brought it
 * @property {'reading' | 'unregistered' | 'withheld' | 'refused' | 'floating'} face `reading` while the jump's read is out; then what the read brought — where it brought no place to read, the fifth cell (`unregistered`), the document-level withheld face or a refusal's face by its name; beside the head it landed on, the dead end's (`floating`)
 * @property {string} addr the document the face names
 * @property {import('../bridge/shapes').Refusal | null} refusal the refusal a `refused` face names; null for every other face
 * @property {Site | null} site where the face stands: where the jump was made — a follow's link's own bytes, the site a LEAP's act names — or the head a floating end landed on; null where an address was typed, at the viewport's corner
 * @property {{addr: string, pos: number | null} | null} at where the walk stands at the entry where the read brings no place: the link's bytes a follow was made at, else the walk's element as the jump was made — never the place the jump named; null where the entry's own `addr` and `pos` name the place it stands at
 * @property {boolean} offer the face offers its act: a floating end's versions list
 */

/**
 * @typedef {Object} Entry
 * @property {string} addr the place teleported to — the place a jump named, whatever its read brought
 * @property {number | null} pos the position landed on, where one was
 * @property {number | null} width the positions of the run landed on from `pos`, where the landing named a span: the first run in the text of a follow's projected far end, or a carried passage's counterpart — one of the runs its landing outlined
 * @property {View} view the view at the entry — the landing's, re-taken at departure; the view the jump left from, where its read brought no place
 * @property {Step | null} step the step that left it for the entry after it, written as a push departed it; none while nothing has, and none where the push took no step this module records
 * @property {string | null} label the place's label at the push
 * @property {Notice | null} notice the face the entry shows: its jump's reading face while the read is out, then the face the read brought; null where it shows none
 */

/**
 * @typedef {Object} Claim — an entry pushed as its teleport was made, its landing waiting on a read
 * @property {Promise<void>} answered settled once the claim is settled
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
 * Push a fresh teleport's entry: the departed entry's view re-taken first
 * and the step leaving it written on it, in the place of any it held — none
 * where it stands as a claim, the camera never having landed there — and the
 * entries ahead of the cursor dropped.
 * @param {Omit<Entry, 'step'>} e
 * @param {View | null} departedView the view the camera was bound for as the teleport left
 * @param {boolean} [claim] the landing waits on a read: the entry stands as a claim until `settle` answers it
 * @param {Step | null} [step] the step the teleport takes from the departed entry: a follow's, a carrying LEAP's; none for any other move
 * @returns {Entry} the entry as the trail holds it
 */
export function push(e, departedView, claim = false, step = null) {
  retake(departedView);
  if (cursor >= 0) entries[cursor].step = claims.has(entries[cursor]) ? null : step;
  entries = entries.slice(0, cursor + 1);
  /** @type {Entry} */
  const held = { ...e, view: { ...e.view }, step: null };
  entries.push(held);
  cursor = entries.length - 1;
  if (claim) {
    /** @type {() => void} */
    let wake = () => {};
    /** @type {Promise<void>} */
    const answered = new Promise((r) => { wake = () => r(); });
    claims.set(held, { answered, wake });
  }
  return held;
}

/**
 * A claim answered with what its read brought (issue #136's design
 * decision): a place — its view, and the position and the positions where
 * the read placed them — or a notice, the face the entry shows on every
 * return to it, at the view the jump left from where the read brought no
 * place; the reading notice the claim held is taken off either way. The
 * entry keeps its place and its number, and what its push dropped stays
 * dropped; every cursor move waiting on it is woken.
 * @param {Entry} e
 * @param {{view: View, pos?: number | null, width?: number | null, notice?: Notice | null}} landing
 */
export function settle(e, landing) {
  e.view = { ...landing.view };
  if (landing.pos !== undefined) e.pos = landing.pos;
  if (landing.width !== undefined) e.width = landing.width;
  e.notice = landing.notice ?? null;
  const c = claims.get(e);
  if (!c) return;
  claims.delete(e);
  c.wake();
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
