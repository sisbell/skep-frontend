// W-MACHINE — the page's half of D6's burst machine: the open burst and the
// held words (D6 BM-1 … BM-30, BM-56 … BM-62, BM-78; D5 K-73). In W-WRITE's
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
// written now, by each cause (`blocks`).
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
// Rules: FP-1, FP-2, FP-9, FP-10, FP-11, FP-14, FP-23, FP-28, FP-29, FP-38.

import * as PORT from '../bridge/port.js';
import * as REC from '../model/records.js';
import * as PUMP from '../model/pump.js';
import * as F from '../model/frames.js';
import * as WRITE from './write.js';
import * as BURSTS from './bursts.js';

/** @typedef {import('./bursts.js').Composed} Composed */
/** @typedef {import('../bridge/shapes').CloseFrame} CloseFrame */
/** @typedef {import('./write.js').Leaving} Leaving */
/** @typedef {import('./write.js').Cause} Cause */
/** @typedef {import('../model/frames.js').HeldLine} HeldLine */
/** @typedef {import('../model/frames.js').HeldState} HeldState */
/** @typedef {import('../bridge/shapes').Refusal} Refusal */

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
 * @property {Map<number, {left: number, at: number}>} open each burst not yet acked whole: how many of its frames no ack names, and the latest position one was acked at
 * @property {Map<number, {k: number, pages: Composed['pages'], id: string, since: number}>} lines the held lines this window's frames became, by the shell's ordinal: the burst each is of, the page's ordinals its insert carries, the `id` its frame carried, and how many reads of the held lines had gone out as it was answered
 * @property {string | null} cause the cause the shell last answered a hold of it by (`held`'s `cause`); null before any
 * @property {HeldState | null} told what the `held` event last told of it, until the lines are read again; null where they were
 * @property {string | null} verdict the moved verdict standing on it, by the line and the two states it names; null where none stands
 * @property {boolean} left a change of the page's class left words of it unsent: nothing more of it is dialed
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

/** what W-WRITE is handed (`handIn`) */
const MACHINE = Object.freeze({ typed, commit, leaving });

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
  if (!d && s) { d = { addr, session: s.session, principal: s.principal, timer: null, bursts: 0, out: null, due: false, reading: false, typed: null, open: new Map(), lines: new Map(), cause: null, told: null, verdict: null, left: false }; drafts.set(addr, d); }
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
 * @param {string} addr
 */
function typed(addr) {
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
 * @param {Draft} d
 * @returns {{frames: Composed[], asOf: number} | {waits: import('./bursts.js').Waits}}
 */
function composed(d) {
  const addr = d.addr, stale = WRITE.staleOf(addr);
  if (!REC.has(addr)) return { waits: 'unread' };
  const doc = stale ? stale.doc : WRITE.baseOf(addr), asOf = typedState(d, doc);
  if (asOf == null) return { waits: 'unread' };
  const out = BURSTS.compose({ doc, edits: stale ? stale.edits : WRITE.edits(addr), from: stale ? stale.from : WRITE.unsent(addr), asOf, ids: (page, width) => REC.pageIds(addr, page, width), load: REC.PAGE_LOAD, seq: seq + 1, piece: pieceOf(d) });
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
    else if (out.waits === 'unread') { arm(d); return; }
    REC.setTyping(addr, false);
    settle(d);
    return;
  }
  REC.setTyping(addr, false);
  const k = ++d.bursts;
  WRITE.markSent(addr, k);
  if (!out.frames.length) { WRITE.markAcked(addr, k, out.asOf); settle(d); return; }
  seq += out.frames.length;
  REC.setWriting(addr, true);
  d.open.set(k, { left: out.frames.length, at: out.asOf });
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
 * and the hold's cause; anything else is a refusal the page keeps. The
 * frames after it are dialed in order whatever it was; the burst is finished
 * at the last. Nothing where the machine let the draft go meanwhile
 * (`takeOut`).
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
  } else if (held) { d.lines.set(held.held, { k: o.k, pages: f.pages, id: f.frame.id, since: reads }); d.cause = held.cause; o.held = true; } else o.refusal = o.refusal || ('refused' in out ? out.refused : { kind: 'shell', name: 'malformed_answer' });
  o.next++;
  if (o.next < o.frames.length) { dial(d, o); return; }
  d.out = null;
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
const awaitsAct = (/** @type {HeldLine} */ r) => !!r.refusal && !['arrangement_moved', 'head_unreadable', 'session_died'].includes(r.refusal.name);
/** is a held line held moved (BM-13)? */
const isMoved = (/** @type {HeldLine} */ r) => r.cause === 'moved' || (!!r.refusal && r.refusal.name === 'arrangement_moved');

/**
 * The held lines read (`held(session)`) and set, draft by draft (see the
 * head; `setLines`): left as they stand where the read is refused or no
 * list — its `store_halted` refusal the board's reason (BM-30) — and where
 * the session is no longer the page's.
 * @param {string} session
 * @returns {Promise<HeldLine[] | null>} the lines, or null where none were set
 */
async function readHeld(session) {
  const issued = ++reads;
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
    WRITE.setHeld(addr, lines);
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
    if (how === 'class') commit(d.addr, true);
    else if (open(d.addr)) commit(d.addr);
  }
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
    const carry = (/** @type {Composed} */ f) => { frames.push({ frame: typedAt(d, f), anchors: f.anchors }); };
    if (d.out && d.out.next < d.out.frames.length) {
      after.push(d.out.frames[d.out.next].frame.id);
      for (const f of d.out.frames.slice(d.out.next + 1)) carry(f);
      d.out.next = d.out.frames.length;
    }
    if (!open(d.addr) || d.left) continue;
    const out = composed(d);
    if ('waits' in out) continue;
    WRITE.markSent(d.addr, ++d.bursts);
    seq += out.frames.length;
    for (const f of out.frames) carry(f);
  }
  PORT.closeAtUnload({ session: s.session, ...(after.length ? { after } : {}), ...(frames.length ? { frames } : {}) });
  return true;
}

/** reset the machine (tests): taken out, every draft and the frames' count forgotten */
export function _reset() { takeOut(); seq = 0; reads = 0; }
