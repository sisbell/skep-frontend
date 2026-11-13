// W-MACHINE — the page's half of D6's burst machine: the open burst, the
// held words, and undo and redo (D6 BM-1 … BM-34, BM-45, BM-46, BM-51,
// BM-56 … BM-62, BM-73, BM-78, BM-81; D5 K-73, K-75). In W-WRITE's
// layer (FP-11): it draws nothing, and imports the bridge, the model, W-WRITE
// and W-BURSTS alone. It is the one module that sends a write through B-PORT
// (FP-11, FP-14) — `op`'s write frames, the unload's `close` that carries the
// frames the page had not dialed, and `resolve` — and it is handed in to
// W-WRITE (`handIn`), which tells it of each act's edits and asks its
// commits; with none handed in the page sends nothing.
// State (FP-10), per draft that was typed in or holds a line (`Draft`): the
// session its bursts go out under and that session's principal; the pause's
// timer; how many bursts of it went out; the burst out and awaiting its
// answer; whether a commit was asked meanwhile; the typed state as its own
// acks raised it; the bursts not yet acked whole; the held lines of it this
// window's frames became, by the shell's ordinal, each with the `id` its
// frame carried; the cause the shell last answered a hold by, what the `held`
// event last told of it, the moved verdict standing on it; and whether a
// change of the page's class left words of it unsent. Beside them the count
// the frames' ids are drawn from, the session last seen, the session whose
// close the page's unload posted, and why the board's drafts cannot be
// written now, by each cause (`blocks`); the count the steps' ids are drawn
// from, and the draft whose newest step is a run of typing still open; and,
// per draft, the bursts an undo took back whose answer is not in or whose
// line the shell holds, those a redo put back meanwhile, the acts an undo's
// inverse was added as, and whether a drop of an undo's is out or owed.
// OPEN (BM-1): the first edit after the last commit opens the draft's burst
// (W-WRITE's `setFlight`), and the model is told the draft is being typed in
// (M-REC's `setTyping`); nothing is dialed. THE COMMIT (BM-2, BM-3, BM-4):
// PAUSE_MS after the last edit, at once after an edit that types
// punctuation, and wherever W-WRITE asks — the save chord, an act that sends
// a name for characters, a departure from the text — the open burst is
// composed against the record its edits apply over (W-WRITE's `baseOf`) and
// its typed state (W-BURSTS's `compose`), every island left out and every
// unminted neighbour named by the piece of the insert that carried it
// (`pieceOf`; BM-8), and its frames dialed through the port's `op`, one after
// another, each once the one before it is answered and each typed at the
// state the acks so far raised. Where a row named the draft while the burst
// stood open, the draft is read again first and set in one step (M-PUMP's
// `readOwed`; BM-56), its edits placed again by W-WRITE; where the text set
// does not place the burst, it is composed as it was typed, against the
// record it was typed over, and the shell's shift places it or holds it
// moved (W-WRITE's `staleOf`; BM-57). One burst of a draft awaits its answer
// at a time; keys typed meanwhile are the next burst.
// THE ANSWER: an `ack` raises the typed state to its `at` (BM-6), and an
// insert's `ack_addr` is told to the model for each run of the page's
// ordinals it carried (M-REC's `mint`); while it is awaited nothing changes
// (BM-7). The shell's `held` answer (BM-8) keeps the line by its ordinal and
// the hold's cause; the held lines are read (`readHeld`) before the flight
// ends, and every later burst is dialed the same way. A refusal is one the
// page keeps (BM-19): the burst's edits are an island (W-WRITE's
// `markIsland`), typing goes on past it, and where the refusal says why the
// board's drafts cannot be written — the held store's bound (BM-20), another
// window (BM-60), a session that may not write (BM-58), the held file's halt
// (BM-30) — that reason stands for the board (W-WRITE's `setUnwritable`).
// THE HELD LINES (BM-25, BM-29, BM-78): `held(session)` is read at every
// session the page comes to hold on its board (`sessionMoved`), at every
// `held` event of that session, and as the event stream stands open again
// after a drop, the events it missed never sent (`streamReopened`); each
// draft's lines are set in resend order (W-WRITE's `setHeld`): those this
// window did not send applied over its text (W-WRITE's `setReopened`), a line
// gone from the list landed. A line the event names kept (`landed`) is a frame
// acked at its position, its insert's bytes minted from its address; one with
// no position, or no address, leaves its edits to the next read, which mints
// them (W-WRITE's rebase). The kept word and its cause follow the lines
// (`say`): "not kept" where a line awaits the person's act, an island stands,
// the device refused a line, or the session ended; "not yet kept" while a line
// is held, moved among them; else "kept". The read's `store_halted` refusal
// stands for the board; any other leaves the lines as they stood.
// THE PERSON's ACTS (BM-10, BM-16, BM-17, BM-27): `drop` and `send` each
// send one `resolve` and read the lines again; a drop takes the line and
// every later line of its document, their edits leaving the text shown — the
// bursts behind a refused run made unsent and composed afresh — and answers
// what `resolve` answered: kept, dropped, the lines that may have landed, or
// the landing unread. An island's discard and its sending again are the
// page's own (`discardIsland`, `sendIsland`). A change waiting on the held
// store's bound is sent again by the machine as a `held` event or a shorter
// list says the store drained (`drain`; BM-20).
// The model is told while the page holds dialed words of a draft the board
// has not acked, or a line of it is held (M-REC's `setWriting`), and of each
// ack (M-PUMP's `wrote`), so the draft is read again as feedback and
// W-WRITE's rebase drops what the read holds. Once the last frame is acked
// and no edit is open the flight ends. A burst the record cannot place yet is
// tried again each pause.
// LEAVING (BM-28; FP-29): the page hidden commits every open burst. The page
// unloading posts the one close of the page's session by the port's
// keepalive post (`unload`): its `frames` every frame of that session's
// drafts the page had not dialed, in order — each burst out's frames after
// the one awaiting its answer, then the open burst's, a byte beside a word
// of the burst out named by the piece of the insert that carried it — and
// its `after` each frame dialed whose answer is not in, which the shell
// waits for before it sends the first; its answer is unread, and no second
// close of that session is posted. A change of the page's class dials what
// is unsent under the session that typed it and marks what could not go as
// sent and never acked, so no edit is ever dialed under another principal's
// session.
// THE STACKS (BM-31): each act of a draft's edits is recorded as it is told
// (`record`): a key typing at the caret joins the run of typing open at the
// draft, or begins one; any other act is a step of its own. A run ends where
// W-WRITE says the caret moved by another act (`ended`) and at every step of
// its own, an undo and a redo among them — never at a pause, punctuation, a
// commit, an ack, a hold or the save chord. A step holds what it placed and
// what it removed by the bytes' identity, so no burst's boundary decides what
// an undo takes; the stacks are W-WRITE's, set here alone.
// UNDO (`undo`; BM-1, BM-2, BM-32, BM-34, BM-45, BM-46, BM-81): the newest
// step taken back at the press, its net change, part by part. What no burst
// carried leaves the draft's edits. What a dial carried is taken back by
// edits the open burst composes as any — a removal of what it placed, a
// put-back of what it removed (W-WRITE's `restore`) — sent at that burst's
// commit, which waits for the burst out as every commit does; the chord is no
// commit point. A burst of the step unanswered at the press is the undo's:
// acked, its inverse goes; refused, its words leave with it and no island is
// kept (`forget`); held, its line is dropped by ONE `resolve(drop)` of the
// step's oldest held line, the lines read again (`settleUndone`) — kept by the
// shell's landing read, its inverse is sent; refused as unread, the drop is
// owed, the draft's commits held back, and it is asked again at the next read
// of the held lines that is not its own. A step whose line awaits an act of
// the person's is answered at its face and composes nothing. An undo's
// `reinstate` refused `withheld` is declined (`declined`; BM-11, BM-12): its
// line dropped, its put-back gone, the step off the stack, those watching
// told. An inverse is composed where the text shown places it, never as it
// was typed. REDO (`redo`; BM-33): the step put back as it was — bytes the
// board holds by a put-back of their own, bytes no board minted as the page's
// own again under the ordinals they had. THE DELETION FACE's RECORD (BM-34,
// BM-51): a removal is told to W-WRITE as a burst's `delete` is composed, and
// at an undo, at its press, for the words a dial carried (`removed`). AT THE
// CLOSE (BM-73) the open burst is composed with a `delete` of the burst
// out's words as that burst's follower, and an inverse whose drop is owed is
// left out (`composed`, `settled`).
// THE HELD LINES' STATES, one test each: a line awaiting the person's act
// (`awaitsAct`), one held moved (`isMoved`), and the death's face standing
// over a draft (`deathFaced`; BM-24). WHAT THE MARGIN MARKS (`marksOf`;
// B3-S2; BM-10, BM-19, BM-26, BM-29; the editor design's J5, the layout
// page's round-2 close D8): the refused mark at each line awaiting the
// person's act and at each refusal the page keeps; the held mark at each line
// this window did not send while it is held, and, while a face asks the
// person about held words — a moved document's, the device's refusal of a
// line, the death's — at those words; a line merely held marks nothing. Each
// line this window sent is marked over its burst's own bytes, each it did not
// over its frame's.
// Rules: FP-1, FP-2, FP-9, FP-10, FP-11, FP-14, FP-23, FP-28, FP-29, FP-38.

import * as PORT from '../bridge/port.js';
import * as REC from '../model/records.js';
import * as PUMP from '../model/pump.js';
import * as F from '../model/frames.js';
import { applyEdits, madeBy, placedAgain, stretchIn } from '../model/derive.js';
import { documentOf } from '../model/address.js';
import { sliceBytes } from '../util.js';
import * as WRITE from './write.js';
import * as BURSTS from './bursts.js';

/** @typedef {import('./bursts.js').Composed} Composed */
/** @typedef {import('../bridge/shapes').CloseFrame} CloseFrame */
/** @typedef {import('./write.js').Leaving} Leaving */
/** @typedef {import('./write.js').Cause} Cause */
/** @typedef {import('../model/frames.js').HeldLine} HeldLine */
/** @typedef {import('../model/frames.js').HeldState} HeldState */
/** @typedef {import('../bridge/shapes').Refusal} Refusal */
/** @typedef {import('../model/records.js').Edit} Edit */
/** @typedef {import('../model/records.js').ISpan} ISpan */
/** @typedef {import('../model/records.js').ImageRun} ImageRun */
/** @typedef {import('../model/records.js').Took} Took */
/** @typedef {import('../model/records.js').Doc} Doc */
/** @typedef {import('./write.js').Step} Step */
/** @typedef {import('./write.js').Taken} Taken */
/** @typedef {import('./write.js').Typed} Typed */

/** the pause after the last edit that commits the open burst (D6 BM-2), in ms */
export const PAUSE_MS = 500;

/**
 * @typedef {Object} Out — a burst out, its frames dialed one after another
 * @property {number} k the burst, by the draft's count
 * @property {Composed[]} frames
 * @property {number} next the frame dialed and awaiting its answer; the frames after it are undialed
 * @property {number[]} acks the positions its frames were acked at, so far
 * @property {boolean} held a frame of it was answered `held`
 * @property {Refusal | null} refusal the refusal a frame of it met; null where none was refused
 */

/**
 * @typedef {Object} Draft — what the machine holds of a draft that was typed in, or holds a line
 * @property {string} addr
 * @property {string} session the session its bursts go out under: the one that typed them, or the one the same principal came to hold since
 * @property {number} principal that session's principal
 * @property {ReturnType<typeof setTimeout> | null} timer the pause's, while it runs
 * @property {number} bursts how many bursts of it went out
 * @property {Out | null} out the burst out; null where none awaits its answer
 * @property {boolean} due a commit was asked while a burst was out, or while the draft was read again for one: the next burst goes as that ends
 * @property {boolean} reading the draft is being read again before its burst is composed (BM-56)
 * @property {number | null} typed the typed state as the draft's own acks raised it; null before any
 * @property {Map<number, {left: number, at: number, n: number}>} open each burst not yet acked whole: how many of its frames no ack names, the latest position one was acked at, and how many frames it went out as
 * @property {Map<number, {k: number, pages: Composed['pages'], id: string, since: number}>} lines the held lines this window's frames became, by the shell's ordinal: the burst each is of, the page's ordinals its insert carries, the `id` its frame carried, and how many reads of the held lines had gone out as it was answered
 * @property {string | null} cause the cause the shell last answered a hold of it by (`held`'s `cause`); null before any
 * @property {HeldState | null} told what the `held` event last told of it, until the lines are read again; null where they were
 * @property {string | null} verdict the moved verdict standing on it, by the line and the two states it names; null where none stands
 * @property {boolean} left a change of the page's class left words of it unsent: nothing more of it is dialed
 * @property {Map<number, number>} undone the bursts of it an undo took back whose answer is not in or whose line the shell holds, each with the step it carried (`undo`): an answer of one that is no ack, and a line of one, is dropped as the undo's own act
 * @property {Set<number>} redone those of them a redo put back while a drop of the undo's was out: dropped, their words are unsent again
 * @property {Map<number, number>} inverse the acts an undo's inverse was added as (M-REC's `Edit.step`), each with the step undone
 * @property {boolean} dropping a `resolve(drop)` of an undo's is out
 * @property {boolean} unread the undo's last drop was refused: it is owed, and tried again at the next read of the held lines that is not its own
 */

/** @typedef {{dropped: boolean, kept: boolean, mayHaveLanded: number[], unread: import('../model/frames.js').LandingUnread['why'] | null, refused: string | null}} Dropped — what a drop did (`drop`): the lines dropped, or the line found landed and kept; the dropped lines that may have landed; why the read for its landing could not tell, nothing dropped; the name of any other refusal */

/** @type {Map<string, Draft>} the drafts typed in or holding a line, by address */
const drafts = new Map();
/** how many frames the page has composed: the next frame's `id` is drawn from it (W-BURSTS's `frameId`) */
let seq = 0;
/** the machine is handed in (`handIn`): the events are taken */
let handed = false;
/** the machine listens for the port's events and the model's changes: subscribed once, however often it is handed in */
let listening = false;
/** @type {string | null} the session the page held as the machine last looked (`sessionMoved`) */
let seen = null;
/** @type {string | null} the session whose close the page's unload posted (`unload`): its close goes once */
let closedAtUnload = null;
/** how many reads of the held lines have gone out (`readHeld`): a line answered `held` after a read went out is not in that read's list */
let reads = 0;
/** why the board's drafts cannot be written now, by each cause (`blocked`): the session ended with no re-open, and its arm; the session may not write; another shell holds the held store; the held file halts, and why; the held store's bound is met, and how many lines it held then */
const blocks = { death: /** @type {string | null | false} */ (false), keyless: false, window: false, halted: /** @type {string | null | false} */ (false), full: /** @type {number | false} */ (false) };

/** how many steps the machine has made (`record`): the next step's `id` is drawn from it */
let steps = 0;
/** @type {string | null} the draft whose newest step is a run of typing no act has ended (`record`, `ended`): one caret types at a time */
let running = null;

/** what W-WRITE is handed (`handIn`) */
const MACHINE = Object.freeze({ typed, ended, commit, leaving });

/**
 * The machine handed in to W-WRITE (see the head), listening from then on
 * for the `held` and `another-window` events, for the event stream's reopen
 * and for the session the page holds: typing is composed, sent, acked and
 * rebased, and the held lines are read.
 */
export function handIn() {
  handed = true;
  WRITE.machine(MACHINE);
  if (!listening) {
    listening = true;
    PORT.on('held', (data) => { if (handed) onHeld(data); });
    PORT.on('another-window', (data) => { if (handed) onWindow(data); });
    PORT.onStream((n) => { if (handed && n === 'reopened') streamReopened(); });
    REC.watch(() => { if (handed) sessionMoved(); });
  }
  sessionMoved();
}

/** the machine taken out of W-WRITE: nothing more is dialed, every pause ended, every draft it held let go and every reason it stood for the board lifted */
export function takeOut() {
  handed = false;
  WRITE.machine(null);
  for (const d of drafts.values()) { if (d.timer) clearTimeout(d.timer); REC.setTyping(d.addr, false); }
  drafts.clear();
  seen = null;
  closedAtUnload = null;
  running = null;
  const b = REC.board();
  blocks.death = false; blocks.keyless = false; blocks.window = false; blocks.halted = false; blocks.full = false;
  if (b) WRITE.setUnwritable(b.board, null);
}

/** the typed state the machine holds of a draft: the position its own acks raised it to; null where no ack has (the gate's and the tests' reading) */
export const typedOf = (/** @type {string} */ addr) => drafts.get(addr)?.typed ?? null;

/** does the page's session stand as the one a draft's bursts go out under? */
const current = (/** @type {Draft} */ d) => { const s = REC.session(); return !!s && s.session === d.session; };

/** does a draft hold an edit no burst has carried out? */
const open = (/** @type {string} */ addr) => WRITE.unsent(addr) < WRITE.edits(addr).length;

/** the machine's record of a draft, made under the page's session where it holds none yet; null where it holds none and no session stands */
function draftOf(/** @type {string} */ addr) {
  let d = drafts.get(addr);
  const s = REC.session();
  if (!d && s) { d = { addr, session: s.session, principal: s.principal, timer: null, bursts: 0, out: null, due: false, reading: false, typed: null, open: new Map(), lines: new Map(), cause: null, told: null, verdict: null, left: false, undone: new Map(), redone: new Set(), inverse: new Map(), dropping: false, unread: false }; drafts.set(addr, d); }
  return d ?? null;
}

// ---- the session, and why the board cannot be written ----------------------------

/**
 * The reason standing for the page's board set from the causes held (see the
 * head; W-WRITE's `setUnwritable`), the first that holds: the session ended
 * with no re-open, the session may not write, another shell holds the held
 * store, the held file halts, the held store's bound is met; none where none
 * holds.
 */
function blocked() {
  const b = REC.board();
  if (!b) return;
  WRITE.setUnwritable(b.board, blocks.death !== false ? { why: 'death', detail: blocks.death } : blocks.keyless ? { why: 'keyless' } : blocks.window ? { why: 'another_window' }
    : blocks.halted !== false ? { why: 'store_halted', detail: blocks.halted } : blocks.full !== false ? { why: 'held_full' } : null);
}

/**
 * The session the page holds moved (see the head; BM-29, BM-58, BM-60): one
 * come to stand — at the page's boot, at a regain, at the shell's own
 * re-open — is read for what it may write, each draft the same principal
 * typed in goes out under it from now, and its held lines are read
 * (`readHeld`); one ended with no session in its place leaves the board's
 * drafts read-only, each draft's word said again.
 */
function sessionMoved() {
  const s = REC.session(), ref = s ? s.session : null;
  if (ref === seen) return;
  seen = ref;
  if (!s) {
    const death = REC.deathReason();
    blocks.death = [...drafts.values()].some((d) => WRITE.unkept(d.addr)) ? (death ? death.arm : null) : false;
    blocked();
    for (const d of drafts.values()) if (WRITE.unkept(d.addr)) say(d);
    return;
  }
  blocks.death = false; blocks.keyless = !s.writes; blocks.window = !!s.another_window;
  blocked();
  for (const d of drafts.values()) if (d.principal === s.principal && !d.out) d.session = s.session;
  void readHeld(s.session);
}

/**
 * The event stream open again after a drop (B-PORT's `onStream`; BM-25,
 * BM-29): the held lines of the page's session read (`readHeld`), so a line
 * of this window's that a `held` event the dropped stream never carried said
 * kept lands by its absence from the list (`setLines`). Nothing where no
 * session stands.
 */
function streamReopened() {
  const s = REC.session();
  if (s) void readHeld(s.session);
}

/** the `another-window` event (BM-60): the edge of another shell's hold on the board's held store, the reason set or lifted */
function onWindow(/** @type {unknown} */ data) {
  const ev = F.decodeAnotherWindow(data), b = REC.board();
  if (!ev || !b || ev.board !== b.board) return;
  blocks.window = ev.anotherWindow;
  blocked();
}

// ---- the open burst and its commit ------------------------------------------------

/** the pause begun again: the open burst commits PAUSE_MS from now */
function arm(/** @type {Draft} */ d) {
  if (d.timer) clearTimeout(d.timer);
  d.timer = setTimeout(() => { d.timer = null; commit(d.addr); }, PAUSE_MS);
}

/**
 * An act's edits were added to a draft (W-WRITE's `addEdits`; BM-1): its
 * burst opens, and commits at its pause, or at once where the act's last
 * edit types punctuation (BM-2). Nothing is dialed here. Nothing opens under
 * a session that may not write, at a draft a change of class left words of
 * unsent, at one another principal's session typed words of that the board
 * has not acked, or where the act's edits are an island's alone.
 * The act is recorded first as a step of the draft's undo stack (`record`).
 * @param {string} addr
 * @param {Typed | null} [how] the act is a key typing at the caret (W-WRITE's `Typed`); null for an act that is a step of its own
 */
function typed(addr, how = null) {
  record(addr, how);
  const s = REC.session();
  if (!s || !s.writes) return;
  const d = draftOf(addr);
  if (!d) return;
  if (d.session !== s.session) {
    if (d.out || (d.principal !== s.principal && WRITE.unacked(addr))) return;
    d.session = s.session; d.principal = s.principal;
    if (!WRITE.unacked(addr)) d.left = false;
  }
  if (d.left || !open(addr)) return;
  WRITE.setFlight(addr, true);
  REC.setTyping(addr, true);
  const list = WRITE.edits(addr), last = list[list.length - 1];
  if (last && /\p{P}$/u.test(last.text)) commit(addr); else arm(d);
}

/** the typed state a draft's next frame is typed at: the position a record's text was read at — a draft of no content's, the position its extent was read at — raised by its own acks; null where neither is known */
function typedState(/** @type {Draft} */ d, /** @type {import('../model/records.js').Doc | null} */ doc = REC.has(d.addr) ? REC.doc(d.addr) : null) {
  const read = !doc ? null : doc.readAt ?? (doc.extent === 0 ? doc.extentAt ?? null : null);
  return d.typed == null ? read : read == null ? d.typed : Math.max(read, d.typed);
}

/**
 * The piece naming a byte of a draft the page made that the board has not
 * minted (W-BURSTS's `Asked.piece`; BM-8): the insert that carried it — a
 * line of this window's the shell holds; an insert of the burst out, whose
 * answer the unload's close waits for or which it carries first (`unload`);
 * or a held line this window did not send — by the `id` its frame carried,
 * and the byte's offset among its words; null where no such insert carries
 * it.
 * @param {Draft} d
 * @returns {(page: number) => (import('../bridge/shapes').AnchorPiece | null)}
 */
const pieceOf = (d) => (page) => {
  for (const l of [...d.lines.values(), ...(d.out ? d.out.frames.map((f) => ({ id: f.frame.id, pages: f.pages })) : [])]) {
    let before = 0;
    for (const p of l.pages) { if (page >= p.page && page < p.page + p.width) return { burst: l.id, offset: before + (page - p.page) }; before += p.width; }
  }
  for (const r of WRITE.reopened(d.addr)) {
    const n = WRITE.nameOf(d.addr, r.row.held), id = r.row.frame.id;
    if (n && typeof id === 'string' && page >= n.page && page < n.page + n.width) return { burst: id, offset: page - n.page };
  }
  return null;
};

/**
 * A draft's open burst composed (W-BURSTS's `compose`) against the record
 * its edits apply over, its edits and its typed state — or, where the text
 * set under it does not place it, as it was typed (W-WRITE's `staleOf`;
 * BM-57): the frames, or why none.
 * An undo's inverse the text set does not place is never composed as it was
 * typed: it is composed where the text shown places it, by identity, and
 * takes back nothing where that text holds none of its words (BM-32, BM-34).
 * At the page's close (`closing`) a delete of words of the burst out is
 * composed as that burst's follower (W-BURSTS's `Asked.follows`), and an
 * undo's inverse of words whose held line it has not settled is left out
 * (`settled`).
 * @param {Draft} d
 * @param {boolean} [closing] the burst is composed for the page's close (`unload`)
 * @returns {{frames: Composed[], asOf: number} | {waits: import('./bursts.js').Waits}}
 */
function composed(d, closing = false) {
  const addr = d.addr, typedAs = WRITE.staleOf(addr);
  // an undo's inverse is composed against the text shown, by identity, and never as it was typed: one the text set no longer places has nothing left on the board to take back
  if (typedAs && typedAs.edits.slice(typedAs.from).some((e) => e.step != null && d.inverse.has(e.step))) { WRITE.clearStale(addr); tidy(addr); }
  const stale = WRITE.staleOf(addr);
  if (!REC.has(addr)) return { waits: 'unread' };
  const doc = stale ? stale.doc : WRITE.baseOf(addr), asOf = typedState(d, doc);
  if (asOf == null) return { waits: 'unread' };
  const owed = closing && !stale && holdsBack(d) ? settled(d, doc) : null;
  const edits = owed ? owed.edits : stale ? stale.edits : WRITE.edits(addr), from = owed ? owed.from : stale ? stale.from : WRITE.unsent(addr);
  /** a delete may follow a frame of the burst out: the one awaiting its answer, or one the close carries before it */
  const follows = (/** @type {string} */ burst) => !!d.out && d.out.frames.some((f) => f.frame.id === burst);
  const out = BURSTS.compose({ doc, edits, from, asOf, ids: (page, width) => REC.pageIds(addr, page, width), load: REC.PAGE_LOAD, seq: seq + 1, piece: pieceOf(d), ...(closing ? { follows } : {}) });
  if ('waits' in out) return out;
  WRITE.clearStale(addr);
  return { frames: out.frames, asOf };
}

/**
 * The open burst of a draft committed now (see the head; BM-2): composed and
 * its first frame dialed. Where a burst of the draft is out, or the draft is
 * being read again for one, the commit is owed to that. Where a row named the
 * draft while the burst stood open, the draft is read again first (BM-56).
 * Where the record cannot place the burst yet, it is tried again at the next
 * pause; where it composes to no frame for a byte no piece names, it stays
 * open and unsent and the flight ends; where it changes nothing, its edits
 * are acked at the typed state. Nothing is dialed for a draft a change of
 * class left, or whose session is not the one the page holds — save at a
 * change of the page's class (`last`), which dials under the session that
 * typed and marks what cannot go as sent and never acked.
 * @param {string} addr
 * @param {boolean} [last] the commit a change of the page's class makes
 */
function commit(addr, last = false) {
  const d = drafts.get(addr);
  if (!d) return;
  if (d.timer) { clearTimeout(d.timer); d.timer = null; }
  if (d.out || d.reading) { if (last) leave(d); else d.due = true; return; }
  // an undo's drop of a held line is out, or owed: nothing of the draft is dialed until it settles, and those waiting are told
  if (!last && holdsBack(d)) { d.due = true; REC.setTyping(addr, false); settle(d); return; }
  d.due = false;
  if (!open(addr)) { REC.setTyping(addr, false); settle(d); return; }
  if (d.left || (!last && !current(d))) { if (last) leave(d); REC.setTyping(addr, false); settle(d); return; }
  if (!last && PUMP.owesRead(addr)) {
    // the row that waited for the typing: the draft read again and set in one step, then the burst composed against it
    d.reading = true;
    REC.setTyping(addr, false);
    void PUMP.readOwed(addr).then(() => { d.reading = false; if (drafts.get(addr) === d) commit(addr); });
    return;
  }
  const out = composed(d);
  if ('waits' in out) {
    if (last) leave(d);
    // an undo's inverse of words whose address the next read names waits for that read, as a burst the record cannot place does
    else if (out.waits === 'unread' || WRITE.edits(addr).some((e) => e.sent == null && e.step != null && d.inverse.has(e.step))) { arm(d); return; }
    REC.setTyping(addr, false);
    settle(d);
    return;
  }
  // an undo's inverse of words the board kept at no address told waits for the read that names them, as a burst the record cannot place waits
  if (!last && awaitsNames(d, out.frames)) { arm(d); return; }
  REC.setTyping(addr, false);
  const k = ++d.bursts;
  WRITE.markSent(addr, k);
  if (!out.frames.length) { WRITE.markAcked(addr, k, out.asOf); settle(d); return; }
  seq += out.frames.length;
  REC.setWriting(addr, true);
  for (const f of out.frames) if (f.lost) removed(addr, f.lost);
  d.open.set(k, { left: out.frames.length, at: out.asOf, n: out.frames.length });
  d.out = { k, frames: out.frames, next: 0, acks: [], held: false, refusal: null };
  dial(d, d.out);
}

/** what a draft holds unsent marked sent by a burst no ack will name, and the draft left: a change of the page's class left it, and no other session sends it. Nothing where it holds nothing unsent */
function leave(/** @type {Draft} */ d) {
  REC.setTyping(d.addr, false);
  if (!open(d.addr)) return;
  WRITE.markSent(d.addr, ++d.bursts);
  d.left = true;
}

/** a frame as it is dialed: typed at the state the draft's acks have raised so far */
const typedAt = (/** @type {Draft} */ d, /** @type {Composed} */ f) => ({ ...f.frame, as_of: Math.max(f.frame.as_of, d.typed ?? 0) });

/** the frame a burst out is at dialed through the port's `op`, under the session that typed it, its anchors beside it */
function dial(/** @type {Draft} */ d, /** @type {Out} */ o) {
  const f = o.frames[o.next];
  void PORT.op({ session: d.session, frame: typedAt(d, f), anchors: f.anchors }).then((out) => answered(d, o, f, out));
}

/** a permanent address `n` positions past another, in the same I-space */
function past(/** @type {string} */ start, /** @type {number} */ n) {
  const cut = start.lastIndexOf('.');
  return `${start.slice(0, cut)}.${Number(start.slice(cut + 1)) + n}`;
}

/** the bytes an insert carried minted (M-REC's `mint`): each run of the page's ordinals in its values takes the addresses from `start`, advanced by the bytes before the run */
function mint(/** @type {string} */ addr, /** @type {Composed['pages']} */ pages, /** @type {string} */ start, /** @type {number} */ at) {
  let before = 0;
  for (const p of pages) { REC.mint(addr, p.page, p.width, past(start, before), at); before += p.width; }
}

/** a frame of a burst acked at a position: the burst is acked whole once no frame of it is left (W-WRITE's `markAcked`) */
function frameAcked(/** @type {Draft} */ d, /** @type {number} */ k, /** @type {number} */ at) {
  const b = d.open.get(k);
  if (!b) return;
  b.left--; b.at = Math.max(b.at, at);
  if (b.left > 0) return;
  d.open.delete(k);
  d.undone.delete(k); d.redone.delete(k);
  WRITE.markAcked(d.addr, k, b.at);
}

/**
 * The model told of a draft's acks (see the head): the positions, so the
 * rows at them are read as feedback, and — once the page holds no dialed
 * word of the draft the board has not acked and no line of it is held — that
 * it holds none, so the draft is read again (M-PUMP's `wrote`).
 * @param {Draft} d
 * @param {number[]} ats
 */
function acked(d, ats) {
  if (!WRITE.unacked(d.addr) && !WRITE.heldOf(d.addr).length) REC.setWriting(d.addr, false);
  if (ats.length || !REC.writing(d.addr)) PUMP.wrote(d.addr, ats);
}

/**
 * A frame's answer (see the head): an ack raises the typed state and mints
 * an insert's bytes; the shell's `held` answer keeps the line by its ordinal
 * and the hold's cause; anything else is a refusal the page keeps — save an
 * undo's `reinstate` refused `withheld`, which is declined (`declined`), and
 * a refusal of a burst an undo took back, whose words leave with it and
 * which no island keeps (`forget`). The frames after it are dialed in order
 * whatever it was; the burst is finished at the last. Nothing where the
 * machine let the draft go meanwhile (`takeOut`).
 * @param {Draft} d
 * @param {Out} o
 * @param {Composed} f
 * @param {import('../bridge/shapes').Outcome<unknown>} out
 */
function answered(d, o, f, out) {
  if (drafts.get(d.addr) !== d || d.out !== o) return;
  const res = 'result' in out ? out.result : null;
  const ack = res == null ? null : F.decodeAckAddr(res) || F.decodeAck(res), held = res == null || ack ? null : F.decodeHeld(res);
  if (ack) {
    d.typed = Math.max(d.typed ?? 0, ack.at);
    if ('addr' in ack) mint(d.addr, f.pages, ack.addr, ack.at);
    o.acks.push(ack.at);
    frameAcked(d, o.k, ack.at);
  } else if (held) { d.lines.set(held.held, { k: o.k, pages: f.pages, id: f.frame.id, since: reads }); d.cause = held.cause; o.held = true; } else {
    const r = 'refused' in out ? out.refused : /** @type {Refusal} */ ({ kind: 'shell', name: 'malformed_answer' });
    // an undo's `reinstate` the board refuses `withheld` is declined (BM-11): no refused run stands of it
    if (f.frame.op === 'reinstate' && r.name === 'withheld' && inverseOf(d, o.k) != null) declined(d, o.k, 1, r); else o.refusal = o.refusal || r;
  }
  o.next++;
  if (o.next < o.frames.length) { dial(d, o); return; }
  d.out = null;
  // an answer after the press for a burst an undo took back (BM-45): a refusal is dropped with the words, no island and no face
  if (o.refusal && d.undone.has(o.k)) { forget(d, o.k); o.refusal = null; }
  if (o.refusal) refused(d, o.k, o.refusal);
  acked(d, o.acks);
  if (o.held) void readHeld(d.session).then(() => after(d, true)); else after(d, !!o.refusal);
}

/**
 * A burst refused (see the head; BM-19, BM-20, BM-30, BM-58, BM-60): its
 * edits are an island, and where the refusal says why the board's drafts
 * cannot be written, that reason stands for the board — the held store's
 * bound with how many lines it held then, so its draining is read.
 * @param {Draft} d
 * @param {number} k the burst
 * @param {Refusal} r
 */
function refused(d, k, r) {
  d.open.delete(k);
  WRITE.markIsland(d.addr, k, { kind: r.kind, name: r.name });
  if (r.name === 'held_full') blocks.full = heldCount();
  else if (r.name === 'another_window') blocks.window = true;
  else if (r.name === 'write_in_bare_session') blocks.keyless = true;
  else if (r.name === 'store_halted') blocks.halted = typeof (/** @type {{why?: unknown}} */ (r)).why === 'string' ? /** @type {{why: string}} */ (/** @type {unknown} */ (r)).why : null;
  else return;
  blocked();
}

/** how many lines the board holds for the session's principal, as last listed */
const heldCount = () => WRITE.heldDocs().reduce((n, a) => n + WRITE.heldOf(a).length, 0);

// ---- the held lines ---------------------------------------------------------------

/** does a held line await the person's act — a run the board refused, or one the shell handed over (BM-10, BM-26): a verdict that is not a move's, an unreadable head's or a death's */
export const awaitsAct = (/** @type {HeldLine} */ r) => !!r.refusal && !['arrangement_moved', 'head_unreadable', 'session_died'].includes(r.refusal.name);
/** is a held line held moved (BM-13)? */
export const isMoved = (/** @type {HeldLine} */ r) => r.cause === 'moved' || (!!r.refusal && r.refusal.name === 'arrangement_moved');

/**
 * Does the death's face stand over a draft (see the head; BM-24): the
 * session ended with no re-open while the draft holds words the board has not
 * kept (W-WRITE's `unkept`), the death stands as its board's reason, or a
 * session that may not write stands over its held lines.
 * @param {string} addr
 * @returns {boolean}
 */
export function deathFaced(addr) {
  const s = REC.session(), block = WRITE.unwritable(addr);
  return (!s && WRITE.unkept(addr)) || (!!block && block.why === 'death') || (!!s && !s.writes && WRITE.heldOf(addr).length > 0);
}

/**
 * The held lines read (`held(session)`) and set, draft by draft (see the
 * head; `setLines`): left as they stand where the read is refused or no
 * list — its `store_halted` refusal the board's reason (BM-30) — and where
 * the session is no longer the page's.
 * A read that is not an undo's own (`own`) lets each drop an undo owes be
 * tried again as its lines are set (`settleUndone`).
 * @param {string} session
 * @param {boolean} [own] the read follows an undo's own drop
 * @returns {Promise<HeldLine[] | null>} the lines, or null where none were set
 */
async function readHeld(session, own = false) {
  const issued = ++reads;
  if (!own) for (const d of drafts.values()) d.unread = false;
  const out = await PORT.held({ session });
  const s = REC.session();
  if (!handed || !s || s.session !== session) return null;
  if ('refused' in out) {
    if (out.refused.name === 'store_halted') { const why = /** @type {{why?: unknown}} */ (out.refused).why; blocks.halted = typeof why === 'string' ? why : null; blocked(); }
    return null;
  }
  const rows = F.decodeHeldRows(out.result);
  if (!rows) return null;
  if (blocks.halted !== false) { blocks.halted = false; blocked(); }
  setLines(rows, issued);
  if (blocks.full !== false && rows.length < blocks.full) drain();
  return rows;
}

/**
 * Every draft's held lines set from a list (see the head; BM-25, BM-29): for
 * each draft the list names, and each that held a line or was told of one
 * before, its lines in resend order (W-WRITE's `setHeld`), those this window
 * did not send applied over its text (W-WRITE's `setReopened`), each line of
 * this window's the list no longer names landed (`landed`) — one answered
 * `held` only after the list's read went out apart, which that list cannot
 * name — the hands the event told kept on a moved line that names none, the
 * moved verdict noted (W-WRITE's `setMoved`), the model told a line is held
 * (M-REC's `setWriting`), and its word said.
 * @param {HeldLine[]} rows
 * @param {number} issued the read the list answers, by the count of reads gone out
 */
function setLines(rows, issued) {
  /** @type {Map<string, HeldLine[]>} */
  const by = new Map();
  for (const r of rows) by.set(r.doc, [...(by.get(r.doc) || []), r]);
  const held = [...drafts.values()].filter((d) => d.lines.size || d.told).map((d) => d.addr);
  for (const addr of new Set([...by.keys(), ...WRITE.heldDocs(), ...held])) {
    const list = by.get(addr) || [], d = list.length ? draftOf(addr) : drafts.get(addr);
    if (!d) continue;
    const told = d.told;
    d.told = null;
    const first = list.find(isMoved);
    const lines = first && !first.hands && told && told.hands.length ? list.map((r) => (r === first ? { ...r, hands: told.hands, again: told.again } : r)) : list;
    // a line of a burst an undo took back is the undo's to drop: it reads as a line held, whatever verdict it carries, and no face answers it (BM-45, BM-81)
    WRITE.setHeld(addr, lines.map((r) => { const l = d.lines.get(r.held); return l && d.undone.has(l.k) && r.refusal ? { ...r, refusal: null } : r; }));
    WRITE.setReopened(addr, lines.filter((r) => !d.lines.has(r.held)));
    if (!lines.length && !d.lines.size && !WRITE.reopened(addr).length && !told && !WRITE.keptOf(addr)) continue;
    /** @type {number[]} */
    const ats = [];
    for (const [held, l] of [...d.lines]) if (l.since < issued && !lines.some((r) => r.held === held)) landed(d, { held, burst: null, at: null, addr: null }, ats);
    const site = first && first.refusal && 'site' in first.refusal ? /** @type {{site?: {as_of?: number, current?: number}}} */ (first.refusal).site : null;
    const verdict = first ? `${first.held}:${site ? `${site.as_of}:${site.current}` : ''}` : null;
    if (verdict !== d.verdict) { d.verdict = verdict; WRITE.setMoved(addr, !!verdict); }
    if (lines.length) REC.setWriting(addr, true);
    acked(d, ats);
    if (!d.out && !d.reading) say(d);
    void settleUndone(d);
  }
}

/**
 * A held line that left the store kept (see the head; BM-25, BM-29): one of
 * this window's is a frame acked at the position the board took it at, its
 * insert's bytes minted from the address told — at no position where none
 * was told, its edits then leaving at the next read; one this window did not
 * send is applied until a read at or past its landing sets the text
 * (W-WRITE's `landReopened`), its bytes minted the same way.
 * @param {Draft} d
 * @param {import('../model/frames.js').LandedLine} l
 * @param {number[]} ats the positions lines landed at, added to
 */
function landed(d, l, ats) {
  const line = d.lines.get(l.held);
  if (line) {
    d.lines.delete(l.held);
    if (l.addr && l.at != null) mint(d.addr, line.pages, l.addr, l.at);
    if (l.at != null) { d.typed = Math.max(d.typed ?? 0, l.at); ats.push(l.at); }
    frameAcked(d, line.k, l.at ?? 0);
    return;
  }
  const n = WRITE.nameOf(d.addr, l.held);
  if (!WRITE.reopened(d.addr).some((r) => r.row.held === l.held)) return;
  if (n && l.addr && l.at != null) REC.mint(d.addr, n.page, n.width, l.addr, l.at);
  if (l.at != null) { d.typed = Math.max(d.typed ?? 0, l.at); ats.push(l.at); }
  WRITE.landReopened(d.addr, l.held, l.at ?? 0);
}

/**
 * A draft's burst answered, or lines of it kept (see the head): its kept
 * word said (`say`), and the flight ended where a hold or a refusal answered
 * or nothing is left open; what was typed meanwhile is the next burst,
 * committed at once where a commit was owed, else at its pause. Nothing
 * where the machine let the draft go meanwhile (`takeOut`).
 * @param {Draft} d
 * @param {boolean} ends a hold or a refusal answered, or held lines were kept: the flight ends whatever is open
 */
function after(d, ends) {
  if (drafts.get(d.addr) !== d) return;
  const more = open(d.addr) && !d.left && current(d) && !WRITE.unwritable(d.addr);
  say(d);
  if (ends || !more) WRITE.setFlight(d.addr, false);
  if (!more) return;
  WRITE.setFlight(d.addr, true);
  REC.setTyping(d.addr, true);
  if (d.due) commit(d.addr); else if (!d.timer) arm(d);
}

/** the death's arm a held line's verdict names, where it is held under the death's own token (BM-23); null where it names none */
const armOf = (/** @type {HeldLine} */ r) => { const reason = r.refusal ? /** @type {{reason?: {arm?: unknown}}} */ (r.refusal).reason : null; return reason && typeof reason.arm === 'string' ? reason.arm : null; };

/**
 * A draft's kept word and its cause, as its state gives them (see the head;
 * B3-S2; BM-8, BM-10, BM-13, BM-19 … BM-24): "not kept" where no session
 * stands and the draft holds words the board has not kept, where a held line
 * awaits the person's act, where the page keeps a refusal of it, where the
 * device refused a line of it, or where a change of class left words of it;
 * "not yet kept" while a line of it is held — a moved one's cause the move,
 * else the head line's — else "kept"; what the `held` event last told of its
 * lines standing for them until they are read again. An open burst and one
 * out change no word.
 * @param {Draft} d
 */
function say(d) {
  const addr = d.addr, rows = WRITE.heldOf(addr), islands = WRITE.islandsOf(addr), told = d.told;
  const not = (/** @type {Cause} */ cause) => WRITE.setKept(addr, { word: 'not kept', reason: null, cause });
  const yet = (/** @type {Cause} */ cause) => WRITE.setKept(addr, { word: 'not yet kept', reason: null, cause });
  /** @returns {{kept: false, cause: Cause} | {kept: null, cause: Cause} | null} what the held lines say: a line awaiting the person's act, a line held, or none */
  const lines = () => {
    if (told) {
      if (told.state === 'refused') return { kept: false, cause: { token: told.cause || 'refused' } };
      if (told.state === 'moved') return { kept: null, cause: { token: 'moved' } };
      return told.held > 0 ? { kept: null, cause: { token: told.cause || d.cause || 'behind' } } : null;
    }
    const act = rows.find(awaitsAct), moved = rows.find(isMoved);
    if (act && act.refusal) return { kept: false, cause: { token: act.refusal.name } };
    if (moved) return { kept: null, cause: { token: 'moved' } };
    if (rows.length) return { kept: null, cause: { token: rows[0].cause, arm: rows[0].cause === 'session_died' ? armOf(rows[0]) : null } };
    return d.lines.size ? { kept: null, cause: { token: d.cause || 'behind' } } : null;
  };
  const held = lines(), device = told ? told.unwritable != null : rows.some((r) => r.unwritable != null);
  if (!REC.session() && WRITE.unkept(addr)) { const death = REC.deathReason(); not({ token: 'death', arm: death ? death.arm : null }); return; }
  if (held && held.kept === false) { not(held.cause); return; }
  if (islands.length) { not({ token: islands[0].name === 'held_full' ? 'held_full' : 'island' }); return; }
  if (device) { not({ token: 'unwritable' }); return; }
  if (d.left) { not({ token: 'left' }); return; }
  if (held) { yet(held.cause); return; }
  WRITE.setKept(addr, { word: 'kept', reason: null });
}

/** a draft's kept word said (`say`) and its flight ended, those waiting told (W-WRITE's `setFlight`) */
function settle(/** @type {Draft} */ d) {
  say(d);
  WRITE.setFlight(d.addr, false);
}

/**
 * The `held` event for the page's board and session (see the head; BM-8,
 * BM-25, BM-78): each line it says kept is landed (`landed`); what it tells
 * of the document — its state, its cause, the hands that moved it — is kept
 * and its word said from it until the lines are read again, which they are
 * at once (`readHeld`); and where a line was kept the flight ends and what
 * stayed open beside it is committed. A change waiting on the held store's
 * bound is tried again (`drain`).
 * @param {unknown} data
 */
function onHeld(data) {
  const ev = F.decodeHeldEvent(data), b = REC.board(), s = REC.session();
  if (!ev || !b || ev.board !== b.board || !s || ev.session !== s.session) return;
  const d = draftOf(ev.doc);
  if (!d) return;
  /** @type {number[]} */
  const ats = [];
  for (const l of ev.landed) landed(d, l, ats);
  if (ats.length) acked(d, ats);
  d.told = ev;
  if (!d.out && !d.reading) say(d);
  if (blocks.full !== false && (ev.state === 'kept' || ev.landed.length)) drain();
  void readHeld(s.session).then(() => {
    // a burst out settles the rest as it is answered; a draft the machine let go settles nothing
    if (d.out || d.reading || drafts.get(d.addr) !== d) return;
    if (!ats.length) { say(d); return; }
    if (open(d.addr) && !d.left && current(d)) d.due = true;
    after(d, true);
  });
}

/**
 * The held store drained (see the head; BM-20): the bound's reason lifted,
 * and each change waiting on it sent again by the machine itself, in the
 * drafts' order — its island unmarked (W-WRITE's `reopenIsland`), its burst
 * open again and committed; one the bound still refuses stands again.
 */
function drain() {
  blocks.full = false;
  blocked();
  for (const d of drafts.values()) for (const i of WRITE.islandsOf(d.addr)) if (i.name === 'held_full') sendIsland(d.addr, i.id);
}

// ---- the person's acts ------------------------------------------------------------

/**
 * "discard" at a held line (see the head; BM-10, BM-16, BM-27): one
 * `resolve` of the line with `drop`, then the lines read again. Dropped, the
 * line and every later line of its document leave: their words leave the
 * text shown — the bursts behind a refused run or a hand-over made unsent
 * and composed afresh — and the answer names the lines that may have landed.
 * Kept, the read found the line landed: nothing is dropped. Refused
 * `landing_unread`, nothing is dropped and the answer says why.
 * @param {string} addr the draft
 * @param {number} held the line's ordinal
 * @returns {Promise<Dropped>}
 */
export async function drop(addr, held) {
  const s = REC.session();
  /** @type {Dropped} */
  const none = { dropped: false, kept: false, mayHaveLanded: [], unread: null, refused: null };
  if (!handed || !s) return { ...none, refused: 'no_session' };
  const rows = WRITE.heldOf(addr), row = rows.find((r) => r.held === held);
  const out = await PORT.resolve({ session: s.session, held, act: 'drop' });
  if ('refused' in out) {
    const unread = F.decodeLandingUnread(out.refused);
    await readHeld(s.session);
    return { ...none, unread: unread ? unread.why : null, refused: out.refused.name };
  }
  const res = F.decodeResolved(out.result);
  if (res && res.kept) { await readHeld(s.session); return { ...none, kept: true }; }
  const d = drafts.get(addr);
  const gone = rows.filter((r) => r.held >= held).map((r) => r.held);
  WRITE.dropReopened(addr, gone);
  if (d) {
    const first = d.lines.get(held), bursts = new Set(gone.flatMap((h) => { const l = d.lines.get(h); return l ? [l.k] : []; }));
    // the bursts behind a run the person discards are the page's to compose afresh; a moved or a holding line's go with it
    const afresh = !!row && awaitsAct(row);
    const lost = afresh ? new Set(first ? [first.k] : []) : bursts;
    for (const h of gone) d.lines.delete(h);
    for (const k of bursts) d.open.delete(k);
    WRITE.dropEdits(addr, (e) => e.sent != null && lost.has(e.sent));
    if (afresh) WRITE.unsend(addr, (e) => e.sent != null && bursts.has(e.sent));
  }
  await readHeld(s.session);
  if (d && drafts.get(addr) === d) {
    acked(d, []);
    if (open(addr) && !d.left && current(d) && !d.out) { WRITE.setFlight(addr, true); commit(addr); } else if (!d.out) settle(d);
  }
  return { ...none, dropped: true, mayHaveLanded: (res && res.mayHaveLanded) || [] };
}

/**
 * "send again" at a held line (see the head; BM-10, BM-17, BM-26): one
 * `resolve` of the line with `send`, then the lines read again.
 * @param {string} addr the draft
 * @param {number} held the line's ordinal
 * @returns {Promise<{sent: boolean, refused: string | null}>} whether the shell took the act, and the refusal's name where it did not
 */
export async function send(addr, held) {
  void addr;
  const s = REC.session();
  if (!handed || !s) return { sent: false, refused: 'no_session' };
  const out = await PORT.resolve({ session: s.session, held, act: 'send' });
  await readHeld(s.session);
  return 'refused' in out ? { sent: false, refused: out.refused.name } : { sent: true, refused: null };
}

/**
 * The words of a held line (BM-10; C-321): one of this window's, the words
 * its burst carried as they stand in the text shown (W-WRITE's `burstWords`);
 * one this window did not send, the words its frame inserts.
 * @param {string} addr the draft
 * @param {number} held the line's ordinal
 * @returns {string}
 */
export function wordsOf(addr, held) {
  const d = drafts.get(addr), line = d ? d.lines.get(held) : undefined;
  if (line) return WRITE.burstWords(addr, line.k);
  const row = WRITE.heldOf(addr).find((r) => r.held === held), values = row && Array.isArray(row.frame.values) ? row.frame.values : [];
  return values.filter((v) => typeof v === 'string').join('');
}

/**
 * An island discarded (see the head; BM-19): the page's own act — its edits
 * leave the text shown, a removal's words returning, nothing sent — and the
 * draft's word said again.
 * @param {string} addr
 * @param {number} id the island
 */
export function discardIsland(addr, id) {
  WRITE.discardIsland(addr, id);
  const d = drafts.get(addr);
  if (!d) return;
  acked(d, []);
  if (!d.out && !d.reading) { if (open(addr) && !d.left && current(d)) { WRITE.setFlight(addr, true); arm(d); } say(d); }
}

/**
 * An island's change sent again (see the head; BM-20): its edits an open
 * burst again (W-WRITE's `reopenIsland`), committed at once. Nothing where
 * the draft is not the machine's, or the board's drafts cannot be written.
 * @param {string} addr
 * @param {number} id the island
 */
export function sendIsland(addr, id) {
  const d = drafts.get(addr);
  if (!handed || !d || WRITE.unwritable(addr)) return;
  WRITE.reopenIsland(addr, id);
  if (!open(addr)) { say(d); return; }
  WRITE.setFlight(addr, true);
  REC.setTyping(addr, true);
  commit(addr);
}

// ---- what the margin marks --------------------------------------------------------

/**
 * @typedef {Object} Mark — words of a draft the board has not kept that the margin marks (`marksOf`)
 * @property {'held' | 'refused'} kind `refused` where an act of the person's comes first; `held` where words are held at a reopen, or a face asks the person about held words
 * @property {ISpan[]} ids the bytes it stands beside, by identity, as the text the page shows names them
 * @property {Array<{before: ISpan[], after: ISpan[]}>} points where it removed bytes and placed none, each by the byte either side of the removal point
 */

/**
 * What the margin marks of a draft (see the head; B3-S2): a mark for each
 * held line it marks, in the lines' order — one for a burst of this window's
 * however many lines it became — then one for each refusal the page keeps,
 * then, under the death, one for the words no listed line or refusal carries
 * that the board has not acked. A line awaiting the person's act
 * (`awaitsAct`) and a refusal kept are refused; a line this window did not
 * send while it is
 * held (W-WRITE's `reopened`), every held line of a moved document or under
 * the death (`deathFaced`), and each line the device refused (BM-21) are
 * held; any other line is unmarked (J5). This window's line stands beside its
 * burst's bytes and the points where its edits removed bytes and placed none
 * (M-DERIVE's `madeBy`); another's beside its frame's — an insert's by the
 * page's names for them (W-WRITE's `nameOf`), a reinstate's by its runs, a
 * removal at the point its anchors name (`edgeIds`). None where nothing is
 * marked, or the model holds no record of the draft.
 * @param {string} addr
 * @returns {Mark[]}
 */
export function marksOf(addr) {
  if (!REC.has(addr)) return [];
  const rows = WRITE.heldOf(addr), islands = WRITE.islandsOf(addr), death = deathFaced(addr);
  if (!rows.length && !islands.length && !death) return [];
  const d = drafts.get(addr), list = WRITE.edits(addr);
  const still = new Set(WRITE.reopened(addr).filter((l) => l.at == null).map((l) => l.row.held));
  const asks = death || rows.some(isMoved);
  /** @type {(r: HeldLine) => Mark['kind'] | null} */
  const kindOf = (r) => (awaitsAct(r) ? 'refused' : still.has(r.held) || asks || r.unwritable != null ? 'held' : null);
  /** @type {import('../model/derive.js').Made[] | null} */
  let made = null;
  /** a mark over what the edits `which` names did as each was applied: the bytes it placed, else the point where it removed some */
  const ofEdits = (/** @type {Mark['kind']} */ kind, /** @type {(e: Edit) => boolean} */ which) => {
    if (!made) made = madeBy(WRITE.baseOf(addr), list, 0, idsOf(addr));
    /** @type {Mark} */
    const m = { kind, ids: [], points: [] };
    list.forEach((e, i) => {
      const x = made ? made[i] : null;
      if (!x || !which(e)) return;
      if (x.placed.length) m.ids.push(...x.placed); else if (x.took) m.points.push({ before: x.before, after: x.after });
    });
    return m.ids.length || m.points.length ? m : null;
  };
  /** @type {Mark[]} */
  const out = [];
  /** @type {Map<number, Mark['kind']>} this window's bursts a line of which is marked, each by its line's kind: refused where any of its lines is */
  const bursts = new Map();
  /** @type {Array<{kind: Mark['kind'], row: HeldLine | null, k: number | null}>} */
  const marked = [];
  for (const r of rows) {
    const kind = kindOf(r), l = d ? d.lines.get(r.held) : undefined;
    if (!kind) continue;
    if (!l) { marked.push({ kind, row: r, k: null }); continue; }
    if (!bursts.has(l.k)) marked.push({ kind, row: null, k: l.k });
    if (bursts.get(l.k) !== 'refused') bursts.set(l.k, kind);
  }
  for (const x of marked) {
    const m = x.k != null ? ofEdits(/** @type {Mark['kind']} */ (bursts.get(x.k)), (e) => e.sent === x.k && e.island == null) : x.row ? frameMark(addr, x.kind, x.row, rows, d) : null;
    if (m) out.push(m);
  }
  for (const i of islands) { const m = ofEdits('refused', (e) => e.island === i.id); if (m) out.push(m); }
  if (death) { const m = ofEdits('held', (e) => e.at == null && !e.based && e.island == null && !(e.sent != null && bursts.has(e.sent))); if (m) out.push(m); }
  return out;
}

/**
 * The mark of a held line this window did not send (`marksOf`), over what its
 * frame does: an insert beside the bytes the page names it by (W-WRITE's
 * `nameOf`), a reinstate beside the bytes its runs name, a removal at the
 * point its anchors name (`edgeIds`); null where none of it can be named.
 * @param {string} addr
 * @param {Mark['kind']} kind
 * @param {HeldLine} r
 * @param {readonly HeldLine[]} rows the draft's held lines, an anchor's piece read among them
 * @param {Draft | undefined} d what the machine holds of the draft
 * @returns {Mark | null}
 */
function frameMark(addr, kind, r, rows, d) {
  const f = r.frame;
  if (f.op === 'insert') { const n = WRITE.nameOf(addr, r.held); return n ? { kind, ids: REC.pageIds(addr, n.page, n.width), points: [] } : null; }
  if (f.op === 'reinstate' && Array.isArray(f.runs)) {
    const ids = f.runs.flatMap((x) => { const w = Number(x && x.width); return x && typeof x.i_start === 'string' && w > 0 ? named(x.i_start, w) : []; });
    return ids.length ? { kind, ids, points: [] } : null;
  }
  if (f.op === 'delete' && r.anchors) {
    const before = edgeIds(addr, r.anchors.before, rows, d), after = edgeIds(addr, r.anchors.after, rows, d);
    return before.length || after.length ? { kind, ids: [], points: [{ before, after }] } : null;
  }
  return null;
}

/** the bytes from a permanent address, by identity; none where it names no ordinal */
const named = (/** @type {string} */ start, /** @type {number} */ width) => { const s = REC.iSpanOf({ iStart: start, width }); return s.prefix && Number.isSafeInteger(s.ordinal) && s.ordinal > 0 ? [s] : []; };

/**
 * The byte an anchor's edge names (M-FRAMES's `HeldAnchors`), by identity as
 * the text shown names it: an I-address; a piece of an insert's words — by
 * the page's name for that byte, the insert a held line's (W-WRITE's
 * `nameOf`) or a burst of this window's (`Draft.lines`); none where the page
 * names no such byte.
 * @param {string} addr
 * @param {string | import('../model/frames.js').AnchorPiece | null} edge
 * @param {readonly HeldLine[]} rows
 * @param {Draft | undefined} d
 * @returns {ISpan[]}
 */
function edgeIds(addr, edge, rows, d) {
  if (typeof edge === 'string') return named(edge, 1);
  if (!edge) return [];
  const row = rows.find((r) => r.frame.op === 'insert' && r.frame.id === edge.burst), n = row ? WRITE.nameOf(addr, row.held) : null;
  if (n) return edge.offset < n.width ? REC.pageIds(addr, n.page + edge.offset, 1) : [];
  const l = d ? [...d.lines.values()].find((x) => x.id === edge.burst) : undefined;
  let at = edge.offset;
  for (const p of l ? l.pages : []) { if (at < p.width) return REC.pageIds(addr, p.page + at, 1); at -= p.width; }
  return [];
}

// ---- undo and redo ----------------------------------------------------------------

/**
 * @typedef {Object} Undone — what an undo or a redo did at its press (`undo`, `redo`)
 * @property {'done' | 'empty' | 'face' | 'away'} how `done` a step taken back, or put back; `empty` the stack holds no step; `face` the step's line awaits an act of the person's at its face, and nothing was composed (BM-45); `away` the page holds none of the text the step stands in — a long draft held in part — and nothing was changed: its place is to be read first (BM-42)
 * @property {number | null} at where the caret stands after it, a position of the text shown — at `away`, where the step began, as it was then; null where nothing was done
 * @property {string} out the words it took out of the text; '' where it took none
 * @property {string} back the words it put back; '' where it put none back
 */

/** the identity of bytes the page made in a draft, as the model names them now (M-REC's `pageIds`) */
const idsOf = (/** @type {string} */ addr) => (/** @type {number} */ page, /** @type {number} */ width) => REC.pageIds(addr, page, width);
/** the text the page shows of a draft: the record its edits apply over with them applied */
const shownOf = (/** @type {string} */ addr) => applyEdits(WRITE.baseOf(addr), WRITE.edits(addr), idsOf(addr)).doc;
/** how many bytes a set of identity names */
const widthOf = (/** @type {readonly {width: number}[]} */ ids) => ids.reduce((n, x) => n + x.width, 0);
/** how many bytes a stretch a put-back places holds */
const tookWidth = (/** @type {Took} */ t) => widthOf(t.runs);
/** the words of a stretch a put-back places */
const wordsOf_ = (/** @type {Took} */ t) => REC.textOf(t.runs, 1, 1 + tookWidth(t));
/** how many of some bytes an image places */
const standing = (/** @type {ImageRun[]} */ image, /** @type {readonly ISpan[]} */ ids) => (ids.length ? widthOf(REC.placedIn(image, [...ids])) : 0);
/** where the one byte some identity names stands in an image; null where it names none, or the image places it nowhere or at two places */
const one = (/** @type {ImageRun[]} */ image, /** @type {readonly ISpan[]} */ id) => { const at = id.length ? REC.placedIn(image, [...id]) : []; return at.length === 1 && at[0].width === 1 ? at[0].pos : null; };
/** bytes by identity as an image of their own, each run at its position from 1 */
const imageOf = (/** @type {readonly ISpan[]} */ ids) => { let at = 1; return ids.map((x) => { const r = { pos: at, width: x.width, prefix: x.prefix, ordinal: x.ordinal }; at += x.width; return r; }); };
/** do two identities name the same one byte? */
const sameByte = (/** @type {readonly ISpan[]} */ a, /** @type {readonly ISpan[]} */ b) => a.length === 1 && b.length === 1 && a[0].width === 1 && b[0].width === 1 && REC.placedIn(imageOf(a), [...b]).length === 1;
/** a stretch a put-back places cut to `width` of its bytes from its `from`-th, counted from 0; null where it does not hold them */
const cutTook = (/** @type {Took} */ t, /** @type {number} */ from, /** @type {number} */ width) => stretchIn(/** @type {Doc} */ (/** @type {unknown} */ ({ runs: t.runs, image: t.ids })), from + 1, width);
/** two stretches a put-back places, one after the other, as one */
const joinTook = (/** @type {Took} */ a, /** @type {Took} */ b) => { const w = tookWidth(a); return { runs: [...a.runs, ...b.runs.map((r) => ({ ...r, pos: r.pos + w }))], ids: [...a.ids, ...b.ids.map((r) => ({ ...r, pos: r.pos + w }))] }; };

/**
 * What an edit removed that its step had not placed itself (BM-32: the
 * run's net change), each stretch with the byte either side of it: the
 * bytes the step placed (`own`) left out, the stretches around them each a
 * removal of its own.
 * @param {import('../model/derive.js').Made} m what the edit did
 * @param {readonly ISpan[]} own the bytes its step placed before it
 * @returns {Taken[]}
 */
function takenOf(m, own) {
  const took = /** @type {Took} */ (m.took), width = tookWidth(took);
  /** @type {Taken[]} */
  const out = [];
  let at = 1;
  /** the stretch [lo, hi) of what it removed, by its own positions from 1 */
  const part = (/** @type {number} */ lo, /** @type {number} */ hi) => {
    const cut = hi > lo ? cutTook(took, lo - 1, hi - lo) : null;
    if (cut) out.push({ took: cut, before: lo > 1 ? REC.identityIn(took.ids, lo - 1, 1) : m.before, after: hi <= width ? REC.identityIn(took.ids, hi, 1) : m.after });
  };
  for (const s of own.length ? REC.placedIn(took.ids, [...own]) : []) { part(at, s.pos); at = s.pos + s.width; }
  part(at, width + 1);
  return out;
}

/**
 * A removal added to those a step holds: joined to the last where it stood
 * right before what that one took — Backspace after Backspace — or right
 * after it — Delete after Delete — so a run of erasing is one stretch, put
 * back whole.
 * @param {readonly Taken[]} list
 * @param {Taken} t
 * @returns {Taken[]}
 */
function withTaken(list, t) {
  const last = list[list.length - 1], w = tookWidth(t.took);
  if (last && sameByte(last.before, REC.identityIn(t.took.ids, w, 1))) return [...list.slice(0, -1), { took: joinTook(t.took, last.took), before: t.before, after: last.after }];
  if (last && sameByte(last.after, REC.identityIn(t.took.ids, 1, 1))) return [...list.slice(0, -1), { took: joinTook(last.took, t.took), before: last.before, after: t.after }];
  return [...list, t];
}

/**
 * The newest act of a draft's edits recorded as a step of its undo stack
 * (see the head; BM-31): a key typing at the caret joins the run of typing
 * open at the draft, or begins one; any other act is a step of its own, and
 * ends the run. The step holds what the act placed and what it removed that
 * the step had not placed, by identity, and a run where its caret stood as it
 * began. A new step empties the redo stack. Nothing where the model holds no
 * record of the draft.
 * @param {string} addr
 * @param {Typed | null} how the act is a key typing at the caret; null for an act that is a step of its own
 */
function record(addr, how) {
  if (!REC.has(addr)) return;
  const list = WRITE.edits(addr), act = WRITE.lastAct(addr), from = list.findIndex((e) => e.step === act);
  if (from < 0) return;
  if (running && running !== addr) ended(running);
  const base = WRITE.baseOf(addr), ids = idsOf(addr);
  const undone = WRITE.undoOf(addr), top = undone[undone.length - 1];
  const joins = !!how && !!top && top.open;
  /** where the caret stood before the act, by the byte either side of it */
  const began = () => {
    if (!how) return { before: [], after: [], pos: 0 };
    const was = applyEdits(base, list.slice(0, from), ids).doc;
    return { before: how.at > 1 ? REC.identityIn(was.image, how.at - 1, 1) : [], after: REC.identityIn(was.image, how.at, 1), pos: how.at };
  };
  /** @type {Step} */
  const step = joins ? { ...top, acts: [...top.acts, act], placed: [...top.placed], took: [...top.took] }
    : { id: ++steps, kind: how ? 'typing' : 'put-back', open: !!how, acts: [act], placed: [], took: [], began: began(), stood: null, removal: null };
  for (const m of madeBy(base, list, from, ids)) {
    if (m.took) for (const t of takenOf(m, step.placed)) step.took = withTaken(step.took, t);
    step.placed.push(...m.placed);
  }
  running = step.open ? addr : null;
  WRITE.setStacks(addr, joins ? [...undone.slice(0, -1), step] : [...undone.map((x) => (x.open ? { ...x, open: false } : x)), step], []);
}

/**
 * The run of typing open at a draft ended (W-WRITE's `endRun`; BM-31): the
 * next key that types begins a new step. Every draft's, where none is named.
 * @param {string | null} [addr]
 */
function ended(addr = null) {
  const at = running;
  if (!at || (addr && addr !== at)) return;
  running = null;
  const stack = WRITE.undoOf(at);
  if (stack.some((x) => x.open)) WRITE.setStacks(at, stack.map((x) => (x.open ? { ...x, open: false } : x)), WRITE.redoOf(at));
}

/** does the page hold a draft's text whole: its image names every position of its extent */
const holdsWhole = (/** @type {string} */ addr) => { const b = WRITE.baseOf(addr); return b.extent != null && (b.extent === 0 || REC.identityIn(b.image, 1, b.extent).length > 0); };

/** does a text place anything of a step — a byte it placed or removed, or one that stood beside its changes or its caret: whether the page holds the text the step stands in, where it holds a draft in part */
const inReach = (/** @type {ImageRun[]} */ image, /** @type {Step} */ step) => standing(image, step.placed) > 0 || one(image, step.began.before) != null || one(image, step.began.after) != null
  || step.took.some((t) => standing(image, t.took.ids) > 0 || one(image, t.before) != null || one(image, t.after) != null)
  || (step.stood ?? []).some((t) => one(image, t.before) != null || one(image, t.after) != null);

/** has a step nothing left to take back: none of what it placed stands in a text, and all it removed does */
const spent = (/** @type {ImageRun[]} */ image, /** @type {Step} */ step) => !standing(image, step.placed) && step.took.every((t) => standing(image, t.took.ids) >= widthOf(t.took.ids));

/**
 * Bytes taken out of the text a draft shows, wherever they stand (BM-34):
 * one removal for each stretch of them, the last in the text first, added as
 * one act (W-WRITE's `restore`).
 * @param {string} addr
 * @param {readonly ISpan[]} ids the bytes, by identity
 * @returns {number} the act; 0 where none of them stands
 */
function takenOut(addr, ids) {
  const at = ids.length ? REC.placedIn(shownOf(addr).image, [...ids]) : [];
  return WRITE.restore(addr, [...at].reverse().map((s) => ({ pos: s.pos, width: s.width, text: '' })));
}

/**
 * The edits that place a stretch of bytes again at a position of the text a
 * draft shows (BM-32, BM-33), run by run of their identity: by a put-back
 * naming the last of the draft's edits that removed them, where one stands;
 * else, for bytes the board minted, by a put-back naming a removal added
 * with them, kept only for it; else — bytes the page made that no board
 * minted — as the page's own words again, under the ordinals they had.
 * @param {string} addr
 * @param {Took} took the bytes: their runs and their identity
 * @param {number} pos where the first of them goes
 * @returns {Edit[]} in order, as W-WRITE's `restore` takes them
 */
function placing(addr, took, pos) {
  const list = WRITE.edits(addr), made = madeBy(WRITE.baseOf(addr), list, 0, idsOf(addr));
  /** what an edit of the list removed, as a put-back naming it places it */
  const removedBy = (/** @type {number} */ i) => (list[i].based ? list[i].took ?? null : made[i].took);
  /** @type {Edit[]} */
  const out = [];
  let at = pos, off = 0, n = list.length;
  for (const q of took.ids.flatMap((r) => (REC.isPage(r.prefix) ? REC.pageIds(addr, r.ordinal, r.width) : [{ prefix: r.prefix, ordinal: r.ordinal, width: r.width }]))) {
    /** @type {{of: number, from: number} | null} */
    let found = null;
    for (let i = list.length - 1; i >= 0 && !found; i--) {
      const was = removedBy(i), where = was ? REC.placedIn(was.ids, [q]) : [];
      if (where.length === 1 && where[0].width === q.width) found = { of: i, from: where[0].pos - 1 };
    }
    const cut = cutTook(took, off, q.width);
    if (found) { out.push({ pos: at, width: 0, text: '', back: { of: found.of, from: found.from, width: q.width } }); n++; }
    else if (!REC.isPage(q.prefix) && cut) { out.push({ pos: at, width: 0, text: '', based: true, took: cut }, { pos: at, width: 0, text: '', back: { of: n, from: 0, width: q.width } }); n += 2; }
    else if (cut) { out.push({ pos: at, width: 0, text: sliceBytes(wordsOf_(took), off, off + q.width), page: q.ordinal }); n++; }
    at += q.width; off += q.width;
  }
  return out;
}

/**
 * A stretch of bytes put back in the text a draft shows, where that text
 * does not hold them (BM-32, BM-33): each missing stretch of it placed after
 * the byte that stood before it, else before the one that stood after it,
 * else at `fallback`, the last first so each lands beside one already back
 * (`placing`).
 * @param {string} addr
 * @param {Taken} t the bytes, and the byte either side of them
 * @param {number} fallback a position of the text shown, where neither side stands
 * @returns {number[]} the acts they were added as
 */
function putBack(addr, t, fallback) {
  const width = tookWidth(t.took);
  /** @type {number[]} */
  const acts = [];
  for (const m of [...missingIn(shownOf(addr).image, t.took)].reverse()) {
    const cut = cutTook(t.took, m.from, m.width);
    if (!cut) continue;
    const doc = shownOf(addr);
    const before = m.from > 0 ? REC.identityIn(t.took.ids, m.from, 1) : t.before, after = m.from + m.width < width ? REC.identityIn(t.took.ids, m.from + m.width + 1, 1) : t.after;
    const b = one(doc.image, before), a = b == null ? one(doc.image, after) : null;
    const pos = b != null ? b + 1 : a != null ? a : doc.from < 0 ? 1 : Math.max(doc.from, Math.min(fallback, doc.to));
    const act = WRITE.restore(addr, placing(addr, cut, pos));
    if (act) acts.push(act);
  }
  return acts;
}

/**
 * The stretches of some bytes an image does not place, by the bytes' own
 * order: each from its first byte, counted from 0, neighbours joined; none
 * where it places them all. A stretch the bytes' own identity names none of
 * is no stretch of them.
 * @param {ImageRun[]} image
 * @param {Took} took the bytes: their runs and their identity
 * @returns {Array<{from: number, width: number}>}
 */
function missingIn(image, took) {
  // the stretches of them the image places, by their own positions from 1
  const held = took.ids.flatMap((q) => REC.placedIn(image, [q]).flatMap((s) => REC.placedIn([q], REC.identityIn(image, s.pos, s.width)))).sort((a, b) => a.pos - b.pos);
  /** @type {Array<{from: number, width: number}>} */
  const out = [];
  for (const q of took.ids) {
    let lo = q.pos;
    const gap = (/** @type {number} */ hi) => { if (hi > lo) { const last = out[out.length - 1]; if (last && last.from + last.width === lo - 1) last.width += hi - lo; else out.push({ from: lo - 1, width: hi - lo }); } };
    for (const s of held) { if (s.pos + s.width <= q.pos || s.pos >= q.pos + q.width) continue; gap(Math.max(q.pos, s.pos)); lo = Math.min(q.pos + q.width, s.pos + s.width); }
    gap(q.pos + q.width);
  }
  return out;
}

/** the words of some bytes an image does not place (`missingIn`), in the bytes' own order: what a put-back of them returns to the text */
const missingWords = (/** @type {ImageRun[]} */ image, /** @type {Took} */ took) => missingIn(image, took).map((m) => sliceBytes(wordsOf_(took), m.from, m.from + m.width)).join('');

/** where a run's caret stood as it began, in a text: after the byte that stood before it, else before the one after it, else at the position it had, held inside the text */
function caretIn(/** @type {Doc} */ doc, /** @type {Step['began']} */ began) {
  const b = one(doc.image, began.before);
  if (b != null) return b + 1;
  const a = one(doc.image, began.after);
  return a != null ? a : doc.from < 0 ? 1 : Math.max(doc.from, Math.min(began.pos || doc.from, doc.to));
}

/** the stretches of one list of them that another does not cover */
function less(/** @type {Array<{pos: number, width: number}>} */ from, /** @type {Array<{pos: number, width: number}>} */ cover) {
  /** @type {Array<{pos: number, width: number}>} */
  const out = [];
  for (const s of from) {
    let lo = s.pos;
    for (const c of cover) { if (c.pos + c.width <= lo || c.pos >= s.pos + s.width) continue; if (c.pos > lo) out.push({ pos: lo, width: c.pos - lo }); lo = Math.max(lo, c.pos + c.width); }
    if (lo < s.pos + s.width) out.push({ pos: lo, width: s.pos + s.width - lo });
  }
  return out;
}

/**
 * A removal of kept text the deletion face stands at (W-WRITE's
 * `addRemoval`; BM-34, BM-51): added where none standing holds its bytes
 * already — an undo's, decided at its press, is not added again as its
 * `delete` is composed.
 * @param {string} addr
 * @param {{words: string, ids: ISpan[], before: ISpan[], after: ISpan[]}} r
 * @returns {number | null} the removal's id; null where one standing holds its bytes, or it holds none
 */
function removed(addr, r) {
  if (!r.ids.length || WRITE.removalsOf(addr).some((x) => standing(imageOf(x.ids), r.ids) >= widthOf(r.ids))) return null;
  return WRITE.addRemoval(addr, r).id;
}

/** the removals a draft's deletion face stands at whose words the text shown holds again, let go (W-WRITE's `dropRemovals`) */
function sweep(/** @type {string} */ addr) {
  if (!WRITE.removalsOf(addr).length || !REC.has(addr)) return;
  const image = shownOf(addr).image;
  WRITE.dropRemovals(addr, (r) => standing(image, r.ids) >= widthOf(r.ids));
}

/** the edits an undo's or a redo's dropping left changing nothing, let go */
const tidy = (/** @type {string} */ addr) => { WRITE.dropEdits(addr, (e) => !e.based && e.sent == null && e.width === 0 && !e.text && !e.back); };

/**
 * A draft's open burst as an undo or a redo leaves it: open, its pause begun
 * again — the chord is no commit point (BM-2; D5 K-73) — or, where nothing
 * of it is unsent, ended, its word said.
 * @param {Draft | null} d
 */
function reopened(d) {
  if (!d || drafts.get(d.addr) !== d) return;
  if (open(d.addr) && !d.left && current(d) && !WRITE.unwritable(d.addr)) { WRITE.setFlight(d.addr, true); REC.setTyping(d.addr, true); arm(d); return; }
  if (d.timer) { clearTimeout(d.timer); d.timer = null; }
  if (!d.out && !d.reading) { REC.setTyping(d.addr, false); settle(d); }
}

/**
 * The undo chord at a draft (D5 K-75; BM-1, BM-2, BM-31, BM-32, BM-34, BM-45,
 * BM-46, BM-81): the newest step taken back whole, at once — the words it
 * placed leave the text shown, the words it removed come back, its net
 * change alone — part by part by where each part stands. What no burst
 * carried leaves the draft's edits and nothing is sent of it. What a dial
 * has carried — acked, out, or a line held — is taken back by edits the open
 * burst then composes as any (W-BURSTS's `compose`): a removal of what it
 * placed, a put-back of what it removed, sent at the burst's own commit,
 * once the burst out is answered. A burst of the step whose answer is not
 * in, or whose line the shell holds, is the undo's from then (`settleUndone`,
 * `answered`). A step whose line awaits an act of the person's at its face —
 * a refused run, the hand-over, a refusal the page keeps, a moved document —
 * composes nothing and is answered so. A step with nothing left to take
 * back leaves the stack unsaid, and the press goes on to the one before.
 * Where the page holds a draft in part and none of the text the step stands
 * in, nothing is changed and the answer says where the step began.
 * The words the step placed that a dial carried are a removal the deletion
 * face stands at, decided here (BM-34).
 * @param {string} addr the draft
 * @returns {Undone}
 */
export function undo(addr) {
  /** @type {Undone} */
  const none = { how: 'empty', at: null, out: '', back: '' };
  if (!handed || !REC.has(addr)) return none;
  ended();
  const stack = [...WRITE.undoOf(addr)], redone = [...WRITE.redoOf(addr)], doc = shownOf(addr), whole = holdsWhole(addr);
  while (stack.length && (whole || inReach(doc.image, stack[stack.length - 1])) && spent(doc.image, stack[stack.length - 1])) stack.pop();
  const step = stack[stack.length - 1];
  if (!step) { WRITE.setStacks(addr, stack, redone); return none; }
  if (!whole && !inReach(doc.image, step)) { WRITE.setStacks(addr, stack, redone); return { ...none, how: 'away', at: step.began.pos || null }; }
  const d = draftOf(addr), list = WRITE.edits(addr), rows = WRITE.heldOf(addr);
  const mine = (/** @type {Edit} */ e) => e.step != null && !e.based && step.acts.includes(e.step);
  /** the held lines of a burst, by their rows */
  const linesOf = (/** @type {number} */ k) => (d ? [...d.lines].filter(([, l]) => l.k === k).map(([h]) => rows.find((r) => r.held === h) ?? null) : []);
  /** the bursts of the step no ack names */
  const unacked = [...new Set(list.flatMap((e) => (mine(e) && e.sent != null && e.at == null && e.island == null ? [e.sent] : [])))];
  if (list.some((e) => mine(e) && e.island != null) || unacked.some((k) => linesOf(k).some((r) => !!r && (awaitsAct(r) || isMoved(r))))) { WRITE.setStacks(addr, stack, redone); return { ...none, how: 'face' }; }
  // what the step placed that stands, as it stands, and the part of it no dial has carried
  const made = madeBy(WRITE.baseOf(addr), list, 0, idsOf(addr));
  const undialed = (/** @type {Edit} */ e) => e.sent == null || (e.at == null && !(d && d.out && d.out.k === e.sent) && linesOf(e.sent).length > 0 && linesOf(e.sent).every((r) => !r || !r.sent));
  const quiet = list.flatMap((e, i) => (mine(e) && undialed(e) ? made[i].placed : []));
  const stands = REC.placedIn(doc.image, step.placed);
  /** @type {Taken[]} */
  const stood = stands.flatMap((s) => { const took = stretchIn(doc, s.pos, s.width); return took ? [{ took, before: s.pos > 1 ? REC.identityIn(doc.image, s.pos - 1, 1) : [], after: REC.identityIn(doc.image, s.pos + s.width, 1) }] : []; });
  const carried = less(stands, quiet.length ? REC.placedIn(doc.image, quiet) : []);
  const at0 = carried.length ? stands.findIndex((s) => carried[0].pos >= s.pos && carried[0].pos < s.pos + s.width) : -1;
  const face = at0 < 0 ? null : { words: carried.map((s) => REC.textOf(doc.runs, s.pos, s.pos + s.width)).join(''), ids: carried.flatMap((s) => REC.identityIn(doc.image, s.pos, s.width)), before: stood[at0] ? stood[at0].before : [], after: stood[at0] ? stood[at0].after : [] };
  // the words that come back: what the step removed that the text does not hold
  const back = step.took.map((x) => missingWords(doc.image, x.took)).join('');
  // never sent: dropped on the page
  if (list.some((e) => mine(e) && e.sent == null)) WRITE.dropEdits(addr, (e) => mine(e) && e.sent == null);
  // what a dial has carried: its inverse, composed as any edit is
  const acts = [takenOut(addr, step.placed)];
  for (const t of [...step.took].reverse()) acts.push(...putBack(addr, t, step.began.pos));
  tidy(addr);
  const removal = face ? removed(addr, face) : null;
  sweep(addr);
  stack.pop();
  WRITE.setStacks(addr, stack, [...redone, { ...step, open: false, stood, removal }]);
  if (d) {
    for (const a of acts) if (a) d.inverse.set(a, step.id);
    for (const k of unacked) d.undone.set(k, step.id);
    // the rows of the step's lines read as lines held from now, whatever verdict comes
    if (unacked.length) WRITE.setHeld(addr, rows.map((r) => { const l = d.lines.get(r.held); return l && d.undone.has(l.k) && r.refusal ? { ...r, refusal: null } : r; }));
  }
  reopened(d);
  if (d) void settleUndone(d);
  return { how: 'done', at: step.kind === 'typing' ? caretIn(shownOf(addr), step.began) : stood.length ? Math.min(stands[0].pos, Math.max(1, shownOf(addr).to)) : null, out: stood.map((x) => wordsOf_(x.took)).join(''), back };
}

/**
 * The redo chord at a draft (D5 K-75; BM-33): the step undone last put back
 * as it was — what it removed removed again, and the words it placed placed
 * again where they stood: words the board holds by a put-back of their own
 * bytes, never new ones; words no board minted as the page's own again,
 * under the ordinals they had, unsent and sent at the next commit. A burst of
 * the step an undo held as its own is the draft's again. The step returns to
 * the undo stack closed: typing after it begins a new run.
 * @param {string} addr the draft
 * @returns {Undone}
 */
export function redo(addr) {
  /** @type {Undone} */
  const none = { how: 'empty', at: null, out: '', back: '' };
  if (!handed || !REC.has(addr)) return none;
  ended();
  const redone = [...WRITE.redoOf(addr)], step = redone.pop();
  if (!step) return none;
  if (!holdsWhole(addr) && !inReach(shownOf(addr).image, step)) return { ...none, how: 'away', at: step.began.pos || null };
  const d = draftOf(addr);
  let out = '';
  for (const t of step.took) {
    const doc = shownOf(addr);
    out += REC.placedIn(doc.image, t.took.ids).map((s) => REC.textOf(doc.runs, s.pos, s.pos + s.width)).join('');
    takenOut(addr, t.took.ids);
  }
  const before = shownOf(addr).image, back = (step.stood ?? []).map((x) => missingWords(before, x.took)).join('');
  for (const s of step.stood ?? []) putBack(addr, s, step.began.pos);
  tidy(addr);
  if (step.removal != null) WRITE.dropRemovals(addr, (r) => r.id === step.removal);
  sweep(addr);
  WRITE.setStacks(addr, [...WRITE.undoOf(addr), { ...step, open: false, stood: null, removal: null }], redone);
  if (d) {
    // the bursts the undo held as its own are the draft's again: one whose drop is out is unsent again where it is dropped
    let freed = false;
    for (const [k, id] of [...d.undone]) if (id === step.id) { if (d.dropping) d.redone.add(k); else { d.undone.delete(k); freed = true; } }
    if (freed && current(d)) void readHeld(d.session);
  }
  reopened(d);
  const now = shownOf(addr), placed = REC.placedIn(now.image, step.placed), last = placed[placed.length - 1];
  return { how: 'done', at: last ? last.pos + last.width : caretIn(now, step.began), out, back };
}

/** the step an undo's inverse a burst carries is of (`Draft.inverse`); null where the burst carries none */
function inverseOf(/** @type {Draft} */ d, /** @type {number} */ k) {
  if (!d.inverse.size) return null;
  for (const e of WRITE.edits(d.addr)) if (e.sent === k && e.step != null && d.inverse.has(e.step)) return d.inverse.get(e.step) ?? null;
  return null;
}

/**
 * Does an undo's inverse wait for a read to name words it takes back (BM-81):
 * the burst carries an edit of an undo's, and a `delete` of it takes out
 * bytes the page made that no address names and no insert the shell holds
 * or the page sent carries — a line the shell kept with no address told
 * (`landed`). The `delete` composed once a read names them carries their
 * I-runs, which the shell shifts it by.
 * @param {Draft} d
 * @param {Composed[]} frames the burst as composed
 * @returns {boolean}
 */
function awaitsNames(d, frames) {
  if (!d.inverse.size || !WRITE.edits(d.addr).some((e) => e.sent == null && e.step != null && d.inverse.has(e.step))) return false;
  const piece = pieceOf(d);
  return frames.some((f) => !!f.lost && f.lost.ids.some((x) => REC.isPage(x.prefix) && Array.from({ length: x.width }, (_, i) => x.ordinal + i).some((page) => !piece(page))));
}

/** does an undo hold a draft's commits back: a drop of its own is out, or a line of a burst it took back stands, its drop owed (BM-81) */
const holdsBack = (/** @type {Draft} */ d) => d.dropping || (d.undone.size > 0 && [...d.lines.values()].some((l) => d.undone.has(l.k)));

/**
 * A draft's edits as the page's close composes them while an undo's drop is
 * owed (see the head; BM-81): the edits that take back words of a burst the
 * undo holds, whose line stands, left out — the line stays in the shell's
 * store, and no inverse is held behind words the board never had — and the
 * rest placed again by identity (M-DERIVE's `placedAgain`).
 * @param {Draft} d
 * @param {Doc} doc the record the edits apply over
 * @returns {{edits: readonly Edit[], from: number}}
 */
function settled(d, doc) {
  const list = WRITE.edits(d.addr), ids = idsOf(d.addr), made = madeBy(doc, list, 0, ids);
  const held = new Set([...d.lines.values()].filter((l) => d.undone.has(l.k)).map((l) => l.k));
  const theirs = (/** @type {Edit} */ e) => e.sent != null && held.has(e.sent);
  const placed = list.flatMap((e, i) => (theirs(e) ? made[i].placed : []));
  const inverse = (/** @type {Edit} */ e, /** @type {number} */ i) => e.sent == null && ((!!made[i].took && standing(made[i].took.ids, placed) >= tookWidth(made[i].took)) || (!!e.back && !!list[e.back.of] && theirs(list[e.back.of])));
  const edits = placedAgain(doc, doc, list, (e, i) => !inverse(e, i), ids).edits, from = edits.findIndex((e) => e.sent == null);
  return { edits, from: from < 0 ? edits.length : from };
}

/**
 * A burst an undo took back that the board refused (BM-45): its words leave
 * the draft's edits — the edits that took them back healing by identity —
 * and no island keeps it, so no face is raised for words the person has
 * already taken back.
 * @param {Draft} d
 * @param {number} k the burst
 */
function forget(d, k) {
  d.open.delete(k);
  d.undone.delete(k);
  if (d.redone.delete(k)) WRITE.unsend(d.addr, (e) => e.sent === k); else WRITE.dropEdits(d.addr, (e) => e.sent === k);
  tidy(d.addr);
}

/**
 * An undo's `reinstate` the board will not take, its source withheld from
 * the person now (BM-11, BM-12): the put-backs its burst carried leave the
 * draft's edits, the words gone from the text shown again; the frames that
 * carried them count as answered; the step leaves the stack at this first
 * reach, no redo meeting it; and those watching are told the origin (W-WRITE's
 * `decline`).
 * @param {Draft} d
 * @param {number} k the burst that carried the put-back
 * @param {number} frames how many of its frames were declined
 * @param {unknown} refusal the refusal, where one was answered: its site names the origin
 */
function declined(d, k, frames, refusal) {
  const addr = d.addr, list = WRITE.edits(addr), step = inverseOf(d, k);
  const backs = list.flatMap((e, i) => (e.sent === k && e.back && e.step != null && d.inverse.has(e.step) ? [i] : []));
  // the origin the words came from: the refusal's site, else the document their bytes are of
  const site = refusal && typeof refusal === 'object' ? /** @type {{site?: {addr?: unknown}, body?: {site?: {addr?: unknown}}}} */ (refusal) : null;
  const named = site && site.body && site.body.site && typeof site.body.site.addr === 'string' ? site.body.site.addr : site && site.site && typeof site.site.addr === 'string' ? site.site.addr : null;
  const made = named ? null : madeBy(WRITE.baseOf(addr), list, 0, idsOf(addr));
  const first = made && backs.length ? made[backs[0]].placed[0] : null;
  const origin = named || (first && !REC.isPage(first.prefix) ? documentOf(first.prefix) : null) || addr;
  const carriers = new Set(backs.map((i) => /** @type {NonNullable<Edit['back']>} */ (list[i].back).of).filter((i) => list[i] && list[i].based));
  WRITE.dropEdits(addr, (e, i) => backs.includes(i) || carriers.has(i));
  const b = d.open.get(k);
  if (b) { b.left -= frames; if (b.left <= 0) { d.open.delete(k); WRITE.markAcked(addr, k, b.at); } }
  if (step != null) WRITE.setStacks(addr, WRITE.undoOf(addr), WRITE.redoOf(addr).filter((x) => x.id !== step));
  sweep(addr);
  WRITE.decline(addr, origin);
}

/**
 * The held lines an undo holds as its own dropped (BM-45, BM-81, BM-11): the
 * lines of a burst it took back, and a line of its inverse the board holds
 * `withheld`. ONE `resolve` with `drop`, of the oldest of them — the shell
 * drops it and every later line of its document — then the lines read again.
 * Dropped, each burst that lost a line: one the undo took back leaves the
 * draft's edits, the edits that took it back healing by identity — its words
 * unsent again where a redo put them back meanwhile; a withheld inverse is
 * declined (`declined`); any other is unsent, composed afresh by the page.
 * Kept — the shell's read found the line landed — nothing is dropped: the
 * line is landed there, its bytes named by the next read, its inverse then
 * sent as a kept part's is, and the drop goes on to the next line. Refused — the read for
 * its landing could not run — nothing is dropped and the drop stays owed
 * (`Draft.unread`): the draft's commits are held back, its word "not yet
 * kept" by the line's cause, and the drop is tried again at the next read of
 * the held lines that is not its own. Nothing while one is out, or where the
 * page's session is not the draft's or may not write.
 * @param {Draft} d
 * @returns {Promise<void>}
 */
async function settleUndone(d) {
  const addr = d.addr, s = REC.session();
  if (!handed || d.dropping || d.unread || drafts.get(addr) !== d || !s || s.session !== d.session || !s.writes) return;
  const rows = WRITE.heldOf(addr);
  /** is a line a withheld inverse's: its row says so, and its burst carries an undo's put-back */
  const withheld = (/** @type {number} */ h, /** @type {number} */ k) => { const r = rows.find((x) => x.held === h); return !!r && (r.cause === 'withheld' || (!!r.refusal && r.refusal.name === 'withheld')) && inverseOf(d, k) != null; };
  const mine = [...d.lines].filter(([h, l]) => d.undone.has(l.k) || withheld(h, l.k)).map(([h]) => h).sort((a, b) => a - b);
  if (!mine.length) return;
  const held = mine[0], row = rows.find((r) => r.held === held) ?? null;
  d.dropping = true;
  const out = await PORT.resolve({ session: s.session, held, act: 'drop' });
  if (!handed || drafts.get(addr) !== d) return;
  if ('refused' in out) {
    await readHeld(s.session, true);
    d.dropping = false; d.unread = true;
    resume(d);
    return;
  }
  const res = F.decodeResolved(out.result);
  if (!(res && res.kept)) {
    const gone = [...d.lines.keys()].filter((h) => h >= held);
    WRITE.dropReopened(addr, rows.filter((r) => r.held >= held).map((r) => r.held));
    /** @type {Map<number, number>} each burst that lost a line, with how many */
    const lost = new Map();
    for (const h of gone) { const l = d.lines.get(h); if (l) lost.set(l.k, (lost.get(l.k) ?? 0) + 1); }
    const declining = new Map([...lost].filter(([k]) => !d.undone.has(k) && gone.some((h) => { const l = d.lines.get(h); return !!l && l.k === k && withheld(h, k); })));
    for (const h of gone) d.lines.delete(h);
    for (const [k, n] of lost) {
      if (d.undone.has(k)) forget(d, k);
      else if (declining.has(k)) declined(d, k, n, row && row.refusal);
      else { d.open.delete(k); WRITE.unsend(addr, (e) => e.sent === k); }
    }
    sweep(addr);
  } else {
    // the shell's read found the line landed: it is kept, at a position and an address the next read names
    /** @type {number[]} */
    const ats = [];
    landed(d, { held, burst: null, at: null, addr: null }, ats);
  }
  await readHeld(s.session, true);
  d.dropping = false;
  if (drafts.get(addr) !== d) return;
  acked(d, []);
  resume(d);
  void settleUndone(d);
}

/** a draft's open burst committed as an undo's drop settles, where one is open and may go; else its word said and its flight ended */
function resume(/** @type {Draft} */ d) {
  if (d.out || d.reading) return;
  if (open(d.addr) && !d.left && current(d) && !WRITE.unwritable(d.addr)) { WRITE.setFlight(d.addr, true); REC.setTyping(d.addr, true); commit(d.addr); } else settle(d);
}

// ---- leaving ----------------------------------------------------------------------

/**
 * Every draft's unsent words committed as the page leaves them (W-WRITE's
 * `leaving`; BM-28): hidden, each open burst committed as a pause commits
 * it; at a change of the page's class, each dialed under the session that
 * typed it, what cannot go marked sent and never acked (`commit`); unloading,
 * what is undialed carried by the page's close (`unload`).
 * @param {Leaving} how
 * @returns {boolean} whether the page's close stands posted: at `unload` alone
 */
function leaving(how) {
  if (how === 'unload') return unload();
  for (const d of [...drafts.values()]) {
    if (how === 'class') { commit(d.addr, true); d.undone.clear(); d.redone.clear(); d.inverse.clear(); }
    else if (open(d.addr)) commit(d.addr);
  }
  if (how === 'class') running = null;
  return false;
}

/**
 * The page's close posted as the page unloads (see the head; BM-28): one
 * `close` of the page's session by the port's keepalive post
 * (`closeAtUnload`), its `frames` every frame of that session's drafts the
 * page had not dialed, draft by draft in order — the frames of the burst out
 * after the one awaiting its answer, then the open burst's where it
 * composes — each typed at the state the acks raised, and its `after` the
 * `id` of each frame dialed whose answer is not in; no answer is read. Every
 * pause ends. A draft whose bursts go out under another session carries
 * nothing, and an open burst that composes to no frame is not sent. Nothing
 * where no session stands; a session whose close is posted is closed no
 * second time.
 * @returns {boolean} whether the close of the page's session stands posted
 */
function unload() {
  for (const d of drafts.values()) if (d.timer) { clearTimeout(d.timer); d.timer = null; }
  const s = REC.session();
  if (!s) return false;
  if (closedAtUnload === s.session) return true;
  closedAtUnload = s.session;
  /** @type {string[]} */
  const after = [];
  /** @type {CloseFrame[]} */
  const frames = [];
  for (const d of drafts.values()) {
    if (d.session !== s.session) continue;
    const carry = (/** @type {Composed} */ f) => { frames.push({ frame: typedAt(d, f), anchors: f.anchors, ...(f.after ? { after: f.after } : {}) }); };
    if (d.out && d.out.next < d.out.frames.length) {
      after.push(d.out.frames[d.out.next].frame.id);
      for (const f of d.out.frames.slice(d.out.next + 1)) carry(f);
      d.out.next = d.out.frames.length;
    }
    if (!open(d.addr) || d.left) continue;
    const out = composed(d, true);
    if ('waits' in out) continue;
    WRITE.markSent(d.addr, ++d.bursts);
    seq += out.frames.length;
    for (const f of out.frames) carry(f);
  }
  PORT.closeAtUnload({ session: s.session, ...(after.length ? { after } : {}), ...(frames.length ? { frames } : {}) });
  return true;
}

/** reset the machine (tests): taken out, every draft and the frames' and the steps' counts forgotten */
export function _reset() { takeOut(); seq = 0; reads = 0; steps = 0; }
