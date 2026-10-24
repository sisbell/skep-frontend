// N-TRAIL — the address stack with its cursor (the structure record §3.2
// "N-TRAIL"; foundations §2.2). Layer 2. PURE. State: VIEW — the entries, the
// cursor and the claims standing unanswered — THE ONE OWNER (FP-10):
// client-side, never written (law 1).
// An entry is an address and a view (S3 Q7's tuple), its view RE-TAKEN
// whenever the entry is departed, so Back lands on the passage left — its
// place re-taken with it where the box it names shows another version as it
// is departed, a newer version's arrival having pinned the box on the member
// being read (`retakePlace`; N-GO's `arrived`), so Back restores the version
// read there (issue #154's design decision: "Back restores the earlier
// version and its view") — and THE
// STEP THAT LEFT IT for the entry after it (issue #152's design decision),
// written as a push departs it: the link followed for a follow, the passage
// carried for a carrying LEAP or a version move — by identity, the permanent
// addresses of its bytes, never its positions — and none for any other move.
// A one-step move across an entry's step lights it at the end it lands on
// (N-GO's `back` and `forward`); a cursor move writes none. THE ARRIVAL KEPT
// (FP-25: "Leaving a place ends its chrome and keeps that chrome and the view
// in the place's entry"; FP-21: "a return restores outlines and labels as
// left"): the arrival standing at an entry as the reader leaves it — its
// outline, what its landing said, its runs' labels and the run it stood at —
// written on the entry by value (`keep`, N-GO's), which a return to it
// restores. The launch frame
// is the first entry (W-01); after it an entry is pushed by a fresh TELEPORT —
// LEAP, follow, a click on a place, Enter, HOME, WHOLE BOARD, an account's
// region, a walk's moment unfolded over a view the camera stands away from
// (N-GO's `toView`) — or by a version move, which lands in place (N-GO's
// `toVersion`), one push per act, made as the act is made (FP-25), never by
// panning or zooming, and never by a reading scene's end, which leaves the
// camera where it found it (SC). Back, Forward and a jump move the cursor and
// discard nothing, and a jump never pushes. A fresh teleport made with the
// cursor behind the newest entry writes its step on the cursor's entry in the
// place of the one it held and drops the entries ahead of it before it pushes
// (a browser's history rule, stated).
// THE CLAIM: a teleport whose landing waits on a read pushes its entry as a
// claim as it is made, numbered then and never handed back once its camera
// leaves (issue #136's design decision; FP-25), so the trail holds every
// act's move in the order the acts were made, whatever order the reads
// answer in, and Back, Forward and a jump act at once on the trail as it
// stands: at any board speed a jump then Back returns to where the jump left
// from, a second Back goes one entry further, and each entry's number is the
// one its key takes. A claim's view is its landing's as the records held at
// the push place it, the place its camera left for, so a departure re-takes
// it and a push from it writes its step as any entry's; it holds its jump's
// reading notice. Its read answers it (`settle`) with what the read brought —
// a place: the view, the position and the positions the read placed, the
// view left out where the reader took the camera over at the entry, which
// keeps the view they left it at; or a NOTICE: the face the entry shows on
// every return to it, the entry standing where the camera went — and what
// its push dropped stays dropped, as any push's does. A cursor move that
// reaches a claim goes on once it is answered (`pending`). A jump that ends
// without its camera leaving — one only a read could place, abandoned or
// refused — gives its entry back (`giveBack`): its push undone, the entries
// it dropped and the step it wrote standing again (FP-25).
// AN ENTRY HOLDS NO DOCUMENT'S WORDS (issue #177's design decision: "View
// state holds addresses, positions and layout, never copies of text"; FP-29):
// its address, its positions, its view and its step — the step's passage by
// identity — and an act's name where HOME or WHOLE BOARD pushed it; whoever
// shows an entry reads what its document says from the model as it shows it
// (N-GO's `wordsOf`). A change of the page's class keeps every entry, its
// number and its address, and drops what the class it left read there: its
// notice, save a claim's still reading, and the arrival it kept
// (`classChanged`).
// Carries: the wireframe's §11 `pushTrail` (its de-duplication by address
// and its cap of twelve DROPPED: the stack is the record of teleports).
// Rules: FP-1, FP-2, FP-7, FP-10, FP-21, FP-25, FP-29.

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
 * @typedef {Object} Kept — the arrival as the reader left an entry (see the head): N-GO's, by value
 * @property {import('./go.js').Arrival | null} arrival its outline, where its runs stood as the reader left
 * @property {import('./go.js').Landing | null} landed what its landing said, its runs' labels and the run it stood at among them
 */

/**
 * @typedef {Object} Site — where a notice stands, as data: O-HOST's anchor without an element, so an entry is read by value
 * @property {{addr: string, pos: number, width?: number}} [span] a span of a document — a block by its first position, or the bytes a width names
 * @property {{x: number, y: number}} [world] a world point
 * @property {string} [sign] the document a jump's face stands at (FP-25): out of the visible view, the one line carries its words in its place
 */

/**
 * @typedef {Object} Notice — the face an entry shows, as data (issue #136's design decision; FP-25): where the camera went while its jump's read is out, then on every return to the entry once its read brought it
 * @property {'reading' | 'unregistered' | 'withheld' | 'refused' | 'floating'} face `reading` while the jump's read is out; then what the read brought — where it brought no place to read, the fifth cell (`unregistered`) or a refusal's face by its name; at the place of a withheld document a follow landed at, its own withheld words (`withheld`; issue #179); beside the head it landed on, the dead end's (`floating`)
 * @property {string} addr the document the face names
 * @property {import('../bridge/shapes').Refusal | null} refusal the refusal a `refused` face names; null for every other face
 * @property {Site | null} site where the face stands: the place the camera went — the document the jump named, at the position it named, else its head — or the head a floating end landed on
 * @property {boolean} offer the face offers its act: a floating end's versions list
 */

/**
 * @typedef {Object} Entry
 * @property {string} addr the place teleported to — the place a jump named, whatever its read brought; at a document, the version its box showed as the entry was last departed (`retakePlace`)
 * @property {number | null} pos the position landed on, where one was
 * @property {number | null} width the positions of the run landed on from `pos`, where the landing named a span: the first run in the text of a follow's projected far end, or a carried passage's counterpart — one of the runs its landing outlined
 * @property {View} view the view at the entry — the landing's, re-taken at departure; where the camera went, where its read brought no place
 * @property {Step | null} step the step that left it for the entry after it, written as a push departed it; none while nothing has, and none where the push took no step this module records
 * @property {string | null} label the act's name where HOME or WHOLE BOARD pushed the entry, the strings table's; null for every other entry, whose document's words are read from the model as it is shown (see the head)
 * @property {Notice | null} notice the face the entry shows: its jump's reading face while the read is out, then the face the read brought; null where it shows none
 * @property {Kept | null} kept the arrival as the reader last left the entry, which a return to it restores (see the head); null where none stood
 */

/**
 * @typedef {Object} Claim — an entry pushed as its teleport was made, its landing waiting on a read
 * @property {Promise<void>} answered settled once the claim is settled
 * @property {() => void} wake settles `answered`
 */

/**
 * @typedef {Object} Pushed — what the last push changed, which a jump whose camera never left undoes as it gives its entry back (`giveBack`)
 * @property {Entry} entry the entry pushed
 * @property {Step | null} step the step the entry it departed held before the push wrote its own
 * @property {Entry[]} dropped the entries ahead of the cursor the push dropped
 */

/** @type {Entry[]} */
let entries = [];
/** the cursor: the index of the entry the camera is at, or -1 */
let cursor = -1;
/** @type {Map<Entry, Claim>} the claims standing unanswered */
const claims = new Map();
/** @type {Pushed | null} the last push, until the next */
let last = null;

/** the cursor's entry re-takes the view it is departed at: a claim's too, the place its camera left for */
function retake(/** @type {View | null} */ departedView) {
  if (cursor >= 0 && departedView) entries[cursor].view = { ...departedView };
}

/**
 * The cursor's entry's place re-taken as it is departed (see the head): the
 * version its box shows then, where that is another than the one the entry
 * names — a claim's never, which keeps the address its jump named while its
 * read is out. N-GO calls it before every move that departs the entry.
 * @param {string} addr the version the box shows
 */
export function retakePlace(addr) {
  if (cursor >= 0 && !claims.has(entries[cursor])) entries[cursor].addr = addr;
}

/**
 * Push a fresh teleport's entry: the departed entry's view re-taken first
 * and the step leaving it written on it, in the place of any it held, and the
 * entries ahead of the cursor dropped.
 * @param {Omit<Entry, 'step' | 'kept'>} e
 * @param {View | null} departedView the view the camera was bound for as the teleport left
 * @param {boolean} [claim] the landing waits on a read: the entry stands as a claim until `settle` answers it
 * @param {Step | null} [step] the step the teleport takes from the departed entry: a follow's, a carrying LEAP's; none for any other move
 * @returns {Entry} the entry as the trail holds it
 */
export function push(e, departedView, claim = false, step = null) {
  retake(departedView);
  /** @type {Entry} */
  const held = { ...e, view: { ...e.view }, step: null, kept: null };
  last = { entry: held, step: cursor >= 0 ? entries[cursor].step : null, dropped: entries.slice(cursor + 1) };
  if (cursor >= 0) entries[cursor].step = step;
  entries = entries.slice(0, cursor + 1);
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
 * decision; FP-25): a place — its view, where the reader did not take the
 * camera over at the entry, and the position and the positions where the
 * read placed them — or a notice, the face the entry shows on every return
 * to it, the entry standing where the camera went; the reading notice the
 * claim held is taken off either way. The entry keeps its place and its
 * number, and what its push dropped stays dropped; every cursor move waiting
 * on it is woken.
 * @param {Entry} e
 * @param {{view?: View, pos?: number | null, width?: number | null, notice?: Notice | null}} landing `view` left out, the entry keeps the view it stands at
 */
export function settle(e, landing) {
  if (landing.view) e.view = { ...landing.view };
  if (landing.pos !== undefined) e.pos = landing.pos;
  if (landing.width !== undefined) e.width = landing.width;
  e.notice = landing.notice ?? null;
  const c = claims.get(e);
  if (!c) return;
  claims.delete(e);
  c.wake();
}

/**
 * The arrival as the reader leaves an entry, written on it by value (see the
 * head; N-GO's departure), in the place of any it held: what a return to it
 * restores. Null where none stood there.
 * @param {Entry} e
 * @param {Kept | null} kept
 */
export function keep(e, kept) { e.kept = kept; }

/**
 * A change of the page's class (see the head; FP-23): every entry keeps its
 * place, its number, its address, its positions, its view and its step, and
 * drops the notice the class it left met there — save a claim's, its read
 * still out, which the new class answers — and the arrival it kept.
 */
export function classChanged() {
  for (const e of entries) { e.kept = null; if (!claims.has(e)) e.notice = null; }
}

/**
 * What a cursor move that reached an entry waits on before it goes on to
 * what the entry's read brought.
 * @param {Entry} e
 * @returns {Promise<void> | null} settled once the claim standing at the entry is answered; null where none stands there
 */
export function pending(e) { const c = claims.get(e); return c ? c.answered : null; }

/**
 * A jump whose camera leaves only once a read placed its destination, after
 * its entry was pushed (FP-25): the entry it was made from re-takes the view
 * the camera leaves it at.
 * @param {Entry} e the jump's entry, the cursor's
 * @param {View} view
 */
export function leaveFrom(e, view) {
  const i = entries.indexOf(e);
  if (i > 0 && i === cursor) entries[i - 1].view = { ...view };
}

/**
 * A jump that ends without its camera leaving gives its entry back (FP-25):
 * its push undone — the entry gone, any move waiting on it woken, the cursor
 * on the entry it was made from, that entry's step as the push found it, and
 * the entries the push dropped standing again. Only the last push, while it
 * is the newest entry, is given back.
 * @param {Entry} e
 * @returns {boolean} the entry was given back
 */
export function giveBack(e) {
  const p = last;
  if (!p || p.entry !== e || entries[entries.length - 1] !== e) return false;
  last = null;
  entries.pop();
  const c = claims.get(e);
  if (c) { claims.delete(e); c.wake(); }
  if (entries.length) entries[entries.length - 1].step = p.step;
  cursor = entries.length - 1;
  entries.push(...p.dropped);
  return true;
}

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
  entries = []; cursor = -1; last = null;
  for (const c of claims.values()) c.wake();
  claims.clear();
}
