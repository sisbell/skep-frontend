// W-MACHINE — the page's half of D6's burst machine, up to the open burst
// (D6 BM-1 … BM-8, BM-28; D5 K-73). In W-WRITE's layer (FP-11): it draws
// nothing, and imports the bridge, the model, W-WRITE and W-BURSTS alone. It
// is the one module that sends a write through B-PORT (FP-11, FP-14), and it
// is handed in to W-WRITE (`handIn`), which tells it of each act's edits and
// asks its commits; with none handed in the page sends nothing.
// State (FP-10), per draft that was typed in (`Draft`): the session its
// bursts go out under, the one that typed them; the pause's timer; how many
// bursts of it went out; the burst out and awaiting its answer; whether a
// commit was asked meanwhile; the typed state as its own acks raised it; the
// bursts not yet acked whole; the held lines of it this window's bursts
// became, by the shell's ordinal; and whether nothing more of it is sent.
// Beside them the count the frames' ids are drawn from.
// OPEN (BM-1): the first edit after the last commit opens the draft's burst
// (W-WRITE's `setFlight`); nothing is dialed. THE COMMIT (BM-2, BM-3, BM-4):
// PAUSE_MS after the last edit, at once after an edit that types
// punctuation, and wherever W-WRITE asks — the save chord, an act that sends
// a name for characters, a departure from the text — the open burst is
// composed against the draft's record and its typed state (W-BURSTS's
// `compose`) and its frames dialed through the port's `op`, one after
// another, each once the one before it is answered and each typed at the
// state the acks so far raised. One burst of a draft awaits its answer at a
// time; keys typed meanwhile are the next burst. THE ANSWER: an `ack` raises
// the typed state to its `at` (BM-6), and an insert's `ack_addr` is told to
// the model for each run of the page's ordinals it carried (M-REC's `mint`);
// while it is awaited nothing changes (BM-7). The shell's `held` answer
// (BM-8) keeps the line by its ordinal: the kept word is "not yet kept", the
// held lines are read (`held(session)`) and set (W-WRITE's `setHeld`) before
// the flight ends, and every later burst is dialed the same way. A refusal
// leaves the kept word "not kept" and the draft stopped: its edits stay and
// nothing more of it is dialed. A burst is acked once every frame of it is
// (W-WRITE's `markAcked`); a line the `held` event names kept (`landed`) is a
// frame acked at its position, its insert's bytes minted from its address.
// The model is told while the page holds dialed words of a draft the board
// has not acked (M-REC's `setWriting`) and of each ack (M-PUMP's `wrote`), so
// the draft is read again as feedback and W-WRITE's rebase drops what the
// read holds. Once the last frame is acked and no edit is open the flight
// ends and the kept word is "kept". A burst W-BURSTS composes to no frame
// for an unminted byte stays open and unsent, the flight ended; one the
// record cannot place yet is tried again each pause.
// LEAVING (BM-28; FP-29): the page hidden commits every open burst; the page
// unloading posts what is undialed by the port's keepalive `op`, in order,
// its answers unread; a change of the page's class dials what is unsent
// under the session that typed it and marks what could not go as sent and
// never acked, so no edit is ever dialed under another session.
// Rules: FP-1, FP-2, FP-9, FP-10, FP-11, FP-14, FP-23, FP-28, FP-29, FP-38.

import * as PORT from '../bridge/port.js';
import * as REC from '../model/records.js';
import * as PUMP from '../model/pump.js';
import * as F from '../model/frames.js';
import * as WRITE from './write.js';
import * as BURSTS from './bursts.js';

/** @typedef {import('./bursts.js').Composed} Composed */
/** @typedef {import('./write.js').Leaving} Leaving */

/** the pause after the last edit that commits the open burst (D6 BM-2), in ms */
export const PAUSE_MS = 500;

/**
 * @typedef {Object} Out — a burst out, its frames dialed one after another
 * @property {number} k the burst, by the draft's count
 * @property {Composed[]} frames
 * @property {number} next the frame dialed and awaiting its answer; the frames after it are undialed
 * @property {number[]} acks the positions its frames were acked at, so far
 * @property {boolean} held a frame of it was answered `held`
 * @property {boolean} refused a frame of it was refused
 */

/**
 * @typedef {Object} Draft — what the machine holds of a draft that was typed in
 * @property {string} addr
 * @property {string} session the session its bursts go out under: the one that typed them
 * @property {ReturnType<typeof setTimeout> | null} timer the pause's, while it runs
 * @property {number} bursts how many bursts of it went out
 * @property {Out | null} out the burst out; null where none awaits its answer
 * @property {boolean} due a commit was asked while a burst was out: the next burst goes as that one is answered
 * @property {number | null} typed the typed state as the draft's own acks raised it; null before any
 * @property {Map<number, {left: number, at: number}>} open each burst not yet acked whole: how many of its frames no ack names, and the latest position one was acked at
 * @property {Map<number, {k: number, pages: Composed['pages']}>} lines the held lines this window's frames became, by the shell's ordinal: the burst each is of, and the page's ordinals its insert carries
 * @property {'refused' | 'left' | null} stopped nothing more of it is dialed: a frame of it was refused, or a change of the page's class left words of it unsent
 */

/** @type {Map<string, Draft>} the drafts typed in, by address */
const drafts = new Map();
/** how many frames the page has composed: the next frame's `id` is drawn from it (W-BURSTS's `frameId`) */
let seq = 0;
/** the machine is handed in (`handIn`): a `held` event is taken */
let handed = false;
/** the machine listens for the `held` event: subscribed once, however often it is handed in */
let listening = false;

/** what W-WRITE is handed (`handIn`) */
const MACHINE = Object.freeze({ typed, commit, leaving });

/**
 * The machine handed in to W-WRITE (see the head), listening for the `held`
 * event from then on: typing is composed, sent, acked and rebased.
 */
export function handIn() {
  handed = true;
  WRITE.machine(MACHINE);
  if (listening) return;
  listening = true;
  PORT.on('held', (data) => { if (handed) onHeld(data); });
}

/** the machine taken out of W-WRITE: nothing more is dialed, every pause ended and every draft it held let go */
export function takeOut() {
  handed = false;
  WRITE.machine(null);
  for (const d of drafts.values()) if (d.timer) clearTimeout(d.timer);
  drafts.clear();
}

/** the typed state the machine holds of a draft: the position its own acks raised it to; null where no ack has (the gate's and the tests' reading) */
export const typedOf = (/** @type {string} */ addr) => drafts.get(addr)?.typed ?? null;

/** does the page's session stand as the one a draft's bursts go out under? */
const current = (/** @type {Draft} */ d) => { const s = REC.session(); return !!s && s.session === d.session; };

/** does a draft hold an edit no burst has carried out? */
const open = (/** @type {string} */ addr) => WRITE.unsent(addr) < WRITE.edits(addr).length;

/** the pause begun again: the open burst commits PAUSE_MS from now */
function arm(/** @type {Draft} */ d) {
  if (d.timer) clearTimeout(d.timer);
  d.timer = setTimeout(() => { d.timer = null; commit(d.addr); }, PAUSE_MS);
}

/**
 * An act's edits were added to a draft (W-WRITE's `addEdits`; BM-1): its
 * burst opens, and commits at its pause, or at once where the act's last
 * edit types punctuation (BM-2). Nothing is dialed here. Nothing opens under
 * a session that may not write, at a draft nothing more of is sent, or at
 * one another session typed words of that the board has not acked.
 * @param {string} addr
 */
function typed(addr) {
  const s = REC.session();
  if (!s || !s.writes) return;
  let d = drafts.get(addr);
  if (!d) { d = { addr, session: s.session, timer: null, bursts: 0, out: null, due: false, typed: null, open: new Map(), lines: new Map(), stopped: null }; drafts.set(addr, d); }
  else if (d.session !== s.session) {
    if (d.out || WRITE.unacked(addr)) return;
    d.session = s.session; d.stopped = null;
  }
  if (d.stopped) return;
  WRITE.setFlight(addr, true);
  const list = WRITE.edits(addr), last = list[list.length - 1];
  if (last && /\p{P}$/u.test(last.text)) commit(addr); else arm(d);
}

/** the typed state a draft's next frame is typed at: the position its record's text was read at — a draft of no content's, the position its extent was read at — raised by its own acks; null where neither is known */
function typedState(/** @type {Draft} */ d) {
  const doc = REC.has(d.addr) ? REC.doc(d.addr) : null;
  const read = !doc ? null : doc.readAt ?? (doc.extent === 0 ? doc.extentAt ?? null : null);
  return d.typed == null ? read : read == null ? d.typed : Math.max(read, d.typed);
}

/**
 * A draft's open burst composed (W-BURSTS's `compose`) against its record,
 * its edits and its typed state: the frames, or why none.
 * @param {Draft} d
 * @returns {{frames: Composed[], asOf: number} | {waits: import('./bursts.js').Waits}}
 */
function composed(d) {
  const addr = d.addr, asOf = typedState(d);
  if (!REC.has(addr) || asOf == null) return { waits: 'unread' };
  const out = BURSTS.compose({ doc: REC.doc(addr), edits: WRITE.edits(addr), from: WRITE.unsent(addr), asOf, ids: (page, width) => REC.pageIds(addr, page, width), load: REC.PAGE_LOAD, seq: seq + 1 });
  return 'waits' in out ? out : { frames: out.frames, asOf };
}

/**
 * The open burst of a draft committed now (see the head; BM-2): composed and
 * its first frame dialed. Where a burst of the draft is out, the commit is
 * owed to its answer. Where the burst composes to no frame for a byte the
 * board has not minted, it stays open and unsent and the flight ends; where
 * the record cannot place it yet, it is tried again at the next pause; where
 * it changes nothing, its edits are acked at the typed state. Nothing is
 * dialed for a draft that is stopped, or whose session is not the one the
 * page holds — save at a change of the page's class (`last`), which dials
 * under the session that typed and marks what cannot go as sent and never
 * acked.
 * @param {string} addr
 * @param {boolean} [last] the commit a change of the page's class makes
 */
function commit(addr, last = false) {
  const d = drafts.get(addr);
  if (!d) return;
  if (d.timer) { clearTimeout(d.timer); d.timer = null; }
  if (d.out) { if (last) leave(d); else d.due = true; return; }
  d.due = false;
  if (!open(addr)) { settle(d); return; }
  if (d.stopped || (!last && !current(d))) { if (last) leave(d); settle(d); return; }
  const out = composed(d);
  if ('waits' in out) {
    if (last) leave(d);
    else if (out.waits === 'unread') { arm(d); return; }
    settle(d);
    return;
  }
  const k = ++d.bursts;
  WRITE.markSent(addr, k);
  if (!out.frames.length) { WRITE.markAcked(addr, k, out.asOf); settle(d); return; }
  seq += out.frames.length;
  REC.setWriting(addr, true);
  d.open.set(k, { left: out.frames.length, at: out.asOf });
  d.out = { k, frames: out.frames, next: 0, acks: [], held: false, refused: false };
  dial(d, d.out);
}

/** what a draft holds unsent marked sent by a burst no ack will name, and the draft stopped: a change of the page's class left it, and no other session sends it. Nothing where it holds nothing unsent */
function leave(/** @type {Draft} */ d) {
  if (!open(d.addr)) return;
  WRITE.markSent(d.addr, ++d.bursts);
  d.stopped = d.stopped || 'left';
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
 * word of the draft the board has not acked — that it holds none, so the
 * draft is read again (M-PUMP's `wrote`).
 * @param {Draft} d
 * @param {number[]} ats
 */
function acked(d, ats) {
  if (!WRITE.unacked(d.addr)) REC.setWriting(d.addr, false);
  if (ats.length || !REC.writing(d.addr)) PUMP.wrote(d.addr, ats);
}

/**
 * A frame's answer (see the head): an ack raises the typed state and mints
 * an insert's bytes; the shell's `held` answer keeps the line by its ordinal;
 * anything else is a refusal. The frames after it are dialed in order
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
  } else if (held) { d.lines.set(held.held, { k: o.k, pages: f.pages }); o.held = true; } else o.refused = true;
  o.next++;
  if (o.next < o.frames.length) { dial(d, o); return; }
  d.out = null;
  if (o.refused) d.stopped = d.stopped || 'refused';
  acked(d, o.acks);
  if (o.held) void heldLines(d).then(() => after(d, true)); else after(d, o.refused);
}

/** a draft's held lines read (`held(session)`) and set (W-WRITE's `setHeld`), so what waits on the flight finds them; left as they stand where the read is refused or no list */
async function heldLines(/** @type {Draft} */ d) {
  const out = await PORT.held({ session: d.session });
  const rows = 'result' in out ? F.decodeHeldRows(out.result) : null;
  if (rows) WRITE.setHeld(d.addr, rows.filter((r) => r.doc === d.addr));
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
  const more = open(d.addr) && !d.stopped && current(d);
  say(d);
  if (ends || !more) WRITE.setFlight(d.addr, false);
  if (!more) return;
  WRITE.setFlight(d.addr, true);
  if (d.due) commit(d.addr); else if (!d.timer) arm(d);
}

/**
 * A draft's kept word, as its state gives it (B3-S2; Q2 (c)), its reason
 * none: "not kept" where it is stopped, "not yet kept" while a line of it is
 * held, else "kept" — an open burst and one out change no word.
 * @param {Draft} d
 */
function say(d) {
  WRITE.setKept(d.addr, { word: d.stopped ? 'not kept' : d.lines.size ? 'not yet kept' : 'kept', reason: null });
}

/** a draft's kept word said (`say`) and its flight ended, those waiting told (W-WRITE's `setFlight`) */
function settle(/** @type {Draft} */ d) {
  say(d);
  WRITE.setFlight(d.addr, false);
}

/**
 * The `held` event (BM-8; Q2 (c)): each line it says kept that is one of
 * this window's (`Draft.lines`, by the shell's ordinal) is a frame acked at
 * the position the board took it at, its insert's bytes minted from the
 * address the event names; the draft's held lines are read again, the kept
 * word follows, and where a line was kept the flight ends and what stayed
 * open beside it is committed. A line kept with no position stays unacked.
 * @param {unknown} data
 */
function onHeld(data) {
  const ev = F.decodeHeldEvent(data), b = REC.board(), d = ev ? drafts.get(ev.doc) : undefined;
  if (!ev || !b || ev.board !== b.board || !d) return;
  /** @type {number[]} */
  const ats = [];
  for (const l of ev.landed) {
    const line = d.lines.get(l.held);
    if (!line || l.at == null) continue;
    d.lines.delete(l.held);
    if (l.addr) mint(d.addr, line.pages, l.addr, l.at);
    d.typed = Math.max(d.typed ?? 0, l.at);
    ats.push(l.at);
    frameAcked(d, line.k, l.at);
  }
  if (ats.length) acked(d, ats);
  void heldLines(d).then(() => {
    // a burst out settles the rest as it is answered; a draft the machine let go settles nothing
    if (d.out || drafts.get(d.addr) !== d) return;
    if (!ats.length) { say(d); return; }
    if (open(d.addr) && !d.stopped && current(d)) d.due = true;
    after(d, true);
  });
}

/**
 * Every draft's unsent words committed as the page leaves them (W-WRITE's
 * `leaving`; BM-28): hidden, each open burst committed as a pause commits
 * it; at a change of the page's class, each dialed under the session that
 * typed it, what cannot go marked sent and never acked (`commit`); unloading,
 * what is undialed posted by the port's keepalive `op` (`unload`).
 * @param {Leaving} how
 */
function leaving(how) {
  for (const d of [...drafts.values()]) {
    if (how === 'unload') unload(d);
    else if (how === 'class') commit(d.addr, true);
    else if (open(d.addr)) commit(d.addr);
  }
}

/**
 * A draft's undialed words posted as the page unloads (BM-28): the frames of
 * the burst out that were not dialed, then the open burst's where it
 * composes, each by the port's keepalive `op` in order, typed at the state
 * the acks raised; no answer is read. A burst that composes to none is not
 * sent.
 * @param {Draft} d
 */
function unload(d) {
  if (d.timer) { clearTimeout(d.timer); d.timer = null; }
  const post = (/** @type {Composed} */ f) => PORT.opAtUnload({ session: d.session, frame: typedAt(d, f), anchors: f.anchors });
  if (d.out) { for (const f of d.out.frames.slice(d.out.next + 1)) post(f); d.out.next = d.out.frames.length; }
  if (!open(d.addr) || d.stopped || !current(d)) return;
  const out = composed(d);
  if ('waits' in out) return;
  WRITE.markSent(d.addr, ++d.bursts);
  seq += out.frames.length;
  for (const f of out.frames) post(f);
}

/** reset the machine (tests): taken out, every draft and the frames' count forgotten */
export function _reset() { takeOut(); seq = 0; }
