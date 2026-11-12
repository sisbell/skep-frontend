// W-MACHINE's test over the fake port, the pause's timer mocked: one test a
// row of D6's table — an edit opens a burst and dials nothing (BM-1); the
// pause and punctuation commit it as composed frames with their anchors,
// typed at the typed state (BM-2); a second burst waits for the first's
// answer; an ack mints, raises the typed state, ends the flight and says
// "kept" (BM-6); a late ack changes nothing (BM-7); the shell's `held` answer
// says "not yet kept", keeps the edits, reads the held lines before the
// flight ends and sends the next burst behind (BM-8), and the `held` event's
// landed line says "kept"; a refusal says "not kept" and sends nothing more;
// the rebase drops exactly the edits a read covers, the text shown the same
// before and after; the window's own feed row is read as feedback and said
// nowhere as news; and the page hidden, unloading and changing its class
// each commit what is unsent, an unsent word surviving the change.
import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import * as PORT from '../bridge/port.js';
import * as FAKE from '../test/fake-port.js';
import * as REC from '../model/records.js';
import * as PUMP from '../model/pump.js';
import * as CAM from '../plane/camera.js';
import { docBox } from '../plane/projection.js';
import { estimate } from '../plane/layout.js';
import * as WRITE from './write.js';
import * as MACHINE from './machine.js';
import { frameId } from './bursts.js';
import { applyEdits } from '../model/derive.js';
import { byteLength } from '../util.js';

const D = '1.0.1.0.2', E = '1.0.1.0.5';
/** the session the page types under */
const S = { session: 's-1', principal: 1, account: '1.0.1', writes: true, fingerprint: null };
/** the permanent address of a draft's `n`-th own byte */
const own = (/** @type {string} */ addr, /** @type {number} */ n) => `${addr}.0.1.${n}`;
/** the `id` of the page's `n`-th frame since the machine was reset */
const id = (/** @type {number} */ n) => frameId(REC.PAGE_LOAD, n);
/** a content V-position as the wire spells it */
const at = (/** @type {number} */ n) => ({ ordinal: String(n), subspace: '1' });
/** the board's answers to a write */
const ACK = (/** @type {number} */ position) => ({ result: { at: position, resp: 'ack' } });
const MINTED = (/** @type {string} */ addr, /** @type {number} */ position) => ({ result: { addr, at: position, resp: 'ack_addr' } });
const HELD = (/** @type {number} */ held, cause = 'unreachable') => ({ result: { resp: 'held', held, cause } });
const REFUSED = { refused: { kind: 'shell', name: 'malformed_args', what: 'frame.values' } };

/** every microtask and every answer the fake port owes run: the pause's timer is mocked, `setImmediate` is not */
const flush = async () => { for (let i = 0; i < 6; i++) await new Promise((r) => setImmediate(r)); };

/**
 * @typedef {Object} Board — the fake port as these tests drive it
 * @property {ReturnType<typeof FAKE.create>} fake
 * @property {Array<{session: string, frame: Record<string, any>, anchors: unknown}>} ops every `op` the page dialed, in order, as its arguments
 * @property {string[]} names every call the page made, by name, in order
 */

/**
 * The page booted over a fake port whose every write frame is answered by
 * `answer` — an outcome, or a promise of one for an answer the test gives
 * later — and whose `held(session)` answers `rows()`; the session opened, the
 * machine handed in.
 * @param {(frame: Record<string, any>, n: number) => unknown} answer what the board answers the `n`-th frame dialed, counted from 1
 * @param {() => unknown[]} [rows] what `held(session)` lists
 * @returns {Board}
 */
function boot(answer, rows = () => []) {
  let n = 0;
  const script = new Proxy({}, {
    get: (_t, key) => (String(key).startsWith('op:') ? answer(JSON.parse(String(key).slice(3)), ++n) : String(key).startsWith('held:') ? { result: rows() } : undefined),
  });
  const fake = FAKE.create(script);
  /** @type {Board['ops']} */
  const ops = [];
  /** @type {string[]} */
  const names = [];
  const call = fake.call;
  fake.call = (name, args) => { names.push(name); if (name === 'op') ops.push(/** @type {Board['ops'][number]} */ (args)); return call(name, args); };
  PORT.boot(fake);
  REC.setBoard({ board: 'b-1', name: '', origin: '' });
  REC.setSession(/** @type {any} */ (S));
  MACHINE.handIn();
  return { fake, ops, names };
}

/** a draft's record as a read at position 7 delivers it: its text, its extent and its image, its own bytes in order */
function read(/** @type {string} */ addr, /** @type {string} */ text, asOf = 7, first = 1) {
  const n = byteLength(text);
  REC.takeSpanSet(addr, [{ subspace: 1, ordinal: 1, positions: n }]);
  REC.takeDelivery(addr, [{ pos: 1, width: n, kind: 'content', text, ref: null, origin: null }], asOf, { from: 1, runs: [{ iStart: own(addr, first), width: n }] });
}

/** the text the page shows of a draft: its record with its edits applied, each byte the page made named as the model names it */
function shown(/** @type {string} */ addr) {
  const d = applyEdits(REC.doc(addr), WRITE.edits(addr), (page, width) => REC.pageIds(addr, page, width)).doc;
  return d.from < 0 ? '' : REC.textOf(d.runs, d.from, d.to);
}

/** an answer the test gives later: the promise the fake port waits on, and what settles it */
function later() {
  /** @type {(out: unknown) => void} */
  let give = () => {};
  const out = new Promise((r) => { give = r; });
  return { out, give };
}

beforeEach(() => { MACHINE._reset(); REC._reset(); WRITE._reset(); });

test('BM-1: an edit opens the draft\'s burst and dials nothing; with no machine handed in, or under a session that may not write, nothing opens', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const { ops, names } = boot(() => ACK(20));
  read(D, 'abc');
  WRITE.addEdit(D, { pos: 4, width: 0, text: 'd' });
  await flush();
  assert.deepEqual([WRITE.inFlight(D), ops, names, WRITE.keptOf(D), shown(D)], [true, [], [], null, 'abcd'], 'the burst open, the character placed, nothing dialed and no word said');
  t.mock.timers.tick(MACHINE.PAUSE_MS - 1);
  await flush();
  assert.deepEqual(ops, [], 'nothing dialed inside the pause');
  REC.setSession(/** @type {any} */ ({ ...S, writes: false }));
  read(E, 'abc');
  WRITE.addEdit(E, { pos: 1, width: 0, text: 'x' });
  assert.equal(WRITE.inFlight(E), false, 'a session that may not write: no burst opens');
  MACHINE.takeOut();
  REC.setSession(/** @type {any} */ (S));
  WRITE.addEdit(E, { pos: 1, width: 0, text: 'y' });
  t.mock.timers.tick(MACHINE.PAUSE_MS * 4);
  await flush();
  assert.deepEqual([WRITE.inFlight(E), ops], [false, []], 'no machine handed in: typing stays page-local');
});

test('BM-2: the pause sends the open burst as its composed frames through `op`, under the session that typed, each with its anchors and typed at the typed state; punctuation sends at once; and a burst of two frames dials the second once the first is acked, typed at the state that ack raised', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const { ops } = boot((frame, n) => (frame.op === 'insert' ? MINTED(own(D, 100 * n), 19 + n) : ACK(19 + n)));
  read(D, 'abcdef');
  for (const [i, ch] of [...'XY'].entries()) WRITE.addEdit(D, { pos: 4 + i, width: 0, text: ch });
  t.mock.timers.tick(MACHINE.PAUSE_MS - 1);
  assert.deepEqual(ops, [], 'the pause not over');
  WRITE.addEdit(D, { pos: 6, width: 0, text: 'Z' });
  t.mock.timers.tick(MACHINE.PAUSE_MS - 1);
  assert.deepEqual(ops, [], 'a key inside the pause begins it again');
  t.mock.timers.tick(1);
  assert.deepEqual(ops, [{ session: 's-1', frame: { op: 'insert', doc: D, at: at(4), values: ['XYZ'], as_of: 7, id: id(1) }, anchors: { before: own(D, 3), after: own(D, 4) } }],
    'the pause over: one `op`, the composed insert typed at the read\'s position, its anchors beside it');
  await flush();
  assert.equal(MACHINE.typedOf(D), 20, 'the ack raised the typed state');
  WRITE.addEdit(D, { pos: 10, width: 0, text: '.' });
  assert.deepEqual(ops[1], { session: 's-1', frame: { op: 'insert', doc: D, at: at(10), values: ['.'], as_of: 20, id: id(2) }, anchors: { before: own(D, 6), after: null } }, 'punctuation: sent at once, no pause, typed at the state the ack raised');
  await flush();
  WRITE.addEdit(D, { pos: 1, width: 2, text: 'Q' });
  t.mock.timers.tick(MACHINE.PAUSE_MS);
  assert.deepEqual(ops.slice(2).map((o) => o.frame), [{ op: 'delete', doc: D, p: at(1), width: '2', as_of: 21, id: id(3) }], 'a replacement: its delete dialed first, alone');
  await flush();
  assert.deepEqual(ops.slice(3).map((o) => [o.frame, o.anchors]), [[{ op: 'insert', doc: D, at: at(1), values: ['Q'], as_of: 22, id: id(4) }, { before: null, after: own(D, 3) }]],
    'the insert once the delete is acked, typed at the state that ack raised');
  await flush();
  assert.deepEqual([MACHINE.typedOf(D), WRITE.inFlight(D), shown(D)], [23, false, 'QcXYZdef.']);
});

test('a second burst of a draft waits for the first\'s answer: keys typed meanwhile join the next burst, sent as the first is acked where its pause is over, else at its pause', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const first = later();
  const { ops } = boot((frame, n) => (n === 1 ? first.out : MINTED(own(D, 100 * n), 19 + n)));
  read(D, 'abc');
  WRITE.addEdit(D, { pos: 4, width: 0, text: 'd' });
  t.mock.timers.tick(MACHINE.PAUSE_MS);
  await flush();
  assert.equal(ops.length, 1, 'the first burst out');
  WRITE.addEdit(D, { pos: 1, width: 0, text: 'x' });
  WRITE.addEdit(D, { pos: 2, width: 0, text: '.' });
  t.mock.timers.tick(MACHINE.PAUSE_MS * 3);
  await flush();
  assert.deepEqual([ops.length, WRITE.inFlight(D)], [1, true], 'its answer not in: nothing more dialed — not at punctuation, not at the pause');
  first.give(MINTED(own(D, 50), 20));
  await flush();
  assert.deepEqual(ops.slice(1).map((o) => [o.frame.values, o.frame.as_of, o.anchors]), [[['x.'], 20, { before: null, after: own(D, 1) }]], 'acked: the keys typed meanwhile go as one burst, at once, typed at the state the ack raised');
  await flush();
  assert.deepEqual([WRITE.inFlight(D), WRITE.keptOf(D)], [false, { word: 'kept', reason: null }]);
});

test('BM-6: an ack tells the model the addresses an insert minted, for each run of the page\'s ordinals it carried, raises the typed state, ends the flight — those waiting told — and says "kept"', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const { ops } = boot(() => MINTED(own(D, 40), 20));
  read(D, 'abc');
  WRITE.addEdit(D, { pos: 2, width: 0, text: 'Zx' });
  WRITE.addEdit(D, { pos: 3, width: 1, text: '' });
  WRITE.addEdit(D, { pos: 2, width: 0, text: 'YZ' });
  WRITE.addEdit(D, { pos: 4, width: 1, text: '' });
  let told = false;
  void WRITE.landed(D).then(() => { told = true; });
  t.mock.timers.tick(MACHINE.PAUSE_MS);
  assert.deepEqual(ops.map((o) => o.frame.values), [['YZ']], 'one insert: of the four bytes the page made, the two that stand');
  assert.deepEqual([told, REC.mintedOf(D), WRITE.keptOf(D)], [false, [], null], 'the answer not in: nothing told, nothing minted, no word');
  await flush();
  assert.deepEqual(REC.mintedOf(D).map((m) => [m.page, m.width, m.ordinal, m.at]), [[3, 2, 40, 20]], 'the ordinals the insert carried, at the address the ack named and the position it was acked at');
  assert.deepEqual([REC.pageIds(D, 3, 2), REC.pageIds(D, 1, 2)], [[{ prefix: D + '.0.1', ordinal: 40, width: 2 }], [{ prefix: REC.pageSpace(D), ordinal: 1, width: 2 }]], 'each byte the insert carried by its address; the bytes typed and taken out before it went by the page\'s own');
  assert.deepEqual([MACHINE.typedOf(D), WRITE.inFlight(D), told, WRITE.keptOf(D)], [20, false, true, { word: 'kept', reason: null }]);
  assert.deepEqual(WRITE.edits(D).map((e) => [e.sent, e.at]), [[1, 20], [1, 20], [1, 20], [1, 20]], 'each edit the burst carried acked at the ack\'s position');
});

test('BM-6: an insert whose values carry two runs of the page\'s ordinals mints each from the ack\'s address advanced by the bytes before it', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  boot(() => MINTED(own(D, 40), 20));
  read(D, 'abc');
  WRITE.addEdit(D, { pos: 2, width: 0, text: 'cd' });
  WRITE.addEdit(D, { pos: 2, width: 0, text: 'éb' });
  t.mock.timers.tick(MACHINE.PAUSE_MS);
  await flush();
  assert.deepEqual(REC.mintedOf(D).map((m) => [m.page, m.width, m.ordinal]), [[1, 2, 43], [3, 3, 40]], '"éb" the insert\'s first three bytes, "cd" the two after them');
});

test('BM-7: while the answer is late nothing changes and nothing is said, however long: the burst out, the flight standing, no word, no edit acked', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const { ops } = boot(() => later().out);
  read(D, 'abc');
  WRITE.addEdit(D, { pos: 4, width: 0, text: 'd' });
  let told = false;
  void WRITE.landed(D).then(() => { told = true; });
  t.mock.timers.tick(MACHINE.PAUSE_MS);
  await flush();
  const before = [ops.length, WRITE.inFlight(D), WRITE.keptOf(D), told, WRITE.edits(D).map((e) => [e.sent, e.at ?? null]), shown(D), WRITE.heldOf(D)];
  assert.deepEqual(before, [1, true, null, false, [[1, null]], 'abcd', []]);
  t.mock.timers.tick(10 * 60 * 1000);
  await flush();
  assert.deepEqual([ops.length, WRITE.inFlight(D), WRITE.keptOf(D), told, WRITE.edits(D).map((e) => [e.sent, e.at ?? null]), shown(D), WRITE.heldOf(D)], before, 'ten minutes on: as it stood, nothing sent again');
});

test('BM-8: the shell\'s `held` answer says "not yet kept" with no reason, keeps the edits, reads the held lines and sets them before those waiting are told, and sends the next burst through `op` the same way; the `held` event\'s landed line then mints its bytes and says "kept"', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  /** @type {unknown[]} */
  let rows = [];
  const { fake, ops, names } = boot((frame, n) => HELD(n, n === 1 ? 'unreachable' : 'behind'), () => rows);
  read(D, 'abc def');
  WRITE.addEdit(D, { pos: 8, width: 0, text: '!' });
  rows = [{ held: 1, doc: D, base: 7, frame: { op: 'insert', doc: D }, anchors: { before: own(D, 7), after: null }, cause: 'unreachable', sent: false, time: 1 }, { held: 9, doc: E, base: 7, frame: { op: 'insert', doc: E }, cause: 'behind', sent: false, time: 2 }];
  /** @type {Array<[number, string | undefined]>} what each one waiting on the flight found as it was told: the draft's held lines, and its word */
  const found = [];
  void WRITE.landed(D).then(() => found.push([WRITE.heldOf(D).length, WRITE.keptOf(D)?.word]));
  await flush();
  assert.deepEqual([names, found], [['op', 'held'], [[1, 'not yet kept']]], '`held(session)` read after the answer; the one waiting told once the draft\'s own lines are set and the word said');
  assert.deepEqual([WRITE.keptOf(D), WRITE.inFlight(D), WRITE.heldOf(D).map((r) => r.held), WRITE.edits(D).map((e) => [e.sent, e.at ?? null]), shown(D), REC.mintedOf(D), REC.writing(D)],
    [{ word: 'not yet kept', reason: null }, false, [1], [[1, null]], 'abc def!', [], true], 'the edit stays, sent and not acked, its byte the page\'s own; the model told the draft holds words the board has not acked');
  WRITE.addEdit(D, { pos: 1, width: 0, text: 'x' });
  assert.equal(WRITE.inFlight(D), true, 'typing goes on: the next burst opens');
  rows = [...rows, { held: 2, doc: D, base: 7, frame: { op: 'insert', doc: D }, anchors: { before: null, after: own(D, 1) }, cause: 'behind', sent: false, time: 3 }];
  t.mock.timers.tick(MACHINE.PAUSE_MS);
  await flush();
  assert.deepEqual([ops.length, ops[1].frame, ops[1].anchors, 'after' in ops[1]], [2, { op: 'insert', doc: D, at: at(1), values: ['x'], as_of: 7, id: id(2) }, { before: null, after: own(D, 1) }, false],
    'sent through `op` the same way, typed at the unraised state, no member added: the shell holds it behind');
  assert.deepEqual([WRITE.keptOf(D)?.word, WRITE.heldOf(D).map((r) => r.held), WRITE.inFlight(D)], ['not yet kept', [1, 2], false]);
  WRITE.addEdit(D, { pos: 10, width: 0, text: '?' });
  t.mock.timers.tick(MACHINE.PAUSE_MS);
  await flush();
  assert.deepEqual([ops.length, WRITE.inFlight(D), WRITE.unsent(D), WRITE.keptOf(D)?.word], [2, false, 2, 'not yet kept'], 'typed beside the held word: no frame of it goes, the burst open and unsent, the flight ended, the word standing');
  rows = [rows[1]];
  fake.fire('held', { board: 'b-1', session: 's-1', doc: D, held: 0, state: 'kept', landed: [{ held: 1, burst: id(1), at: 30, addr: own(D, 60) }, { held: 2, burst: id(2), at: 31, addr: own(D, 61) }] });
  assert.deepEqual(REC.mintedOf(D).map((m) => [m.page, m.ordinal, m.at]), [[1, 60, 30], [2, 61, 31]], 'the landed lines\' bytes minted from the addresses the event names');
  assert.deepEqual(WRITE.edits(D).slice(0, 2).map((e) => [e.sent, e.at]), [[1, 30], [2, 31]], 'each burst acked at the position the board took its line at');
  await flush();
  assert.deepEqual([ops.length, ops[2].frame, ops[2].anchors], [3, { op: 'insert', doc: D, at: at(10), values: ['?'], as_of: 31, id: id(3) }, { before: own(D, 60), after: null }], 'the burst that waited goes at once, the held word beside it named by its address');
  await flush();
  assert.deepEqual([WRITE.heldOf(D), REC.writing(D)], [[], true], 'the draft\'s held lines read again: none; its third burst held in its turn');
});

test('BM-8: once every held line of a draft has landed and nothing is open, the word is "kept" and the model is told the draft holds no dialed word the board has not acked; a line another window\'s event names, or one of another board, moves nothing', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  /** @type {unknown[]} */
  let rows = [{ held: 4, doc: D, base: 7, frame: { op: 'insert', doc: D }, cause: 'unreachable', sent: false, time: 1 }];
  const { fake } = boot(() => HELD(4), () => rows);
  read(D, 'abc');
  WRITE.addEdit(D, { pos: 4, width: 0, text: 'd' });
  t.mock.timers.tick(MACHINE.PAUSE_MS);
  await flush();
  assert.deepEqual([WRITE.keptOf(D)?.word, REC.writing(D)], ['not yet kept', true]);
  fake.fire('held', { board: 'b-2', session: 's-1', doc: D, held: 0, state: 'kept', landed: [{ held: 4, at: 30, addr: own(D, 60) }] });
  fake.fire('held', { board: 'b-1', session: 's-1', doc: D, held: 1, state: 'sending', landed: [{ held: 5, at: 30, addr: own(D, 60) }] });
  await flush();
  assert.deepEqual([WRITE.keptOf(D)?.word, REC.mintedOf(D), REC.writing(D)], ['not yet kept', [], true], 'another board\'s event, and a line that is not this window\'s: the hold stands');
  rows = [];
  fake.fire('held', { board: 'b-1', session: 's-1', doc: D, held: 0, state: 'kept', landed: [{ held: 4, burst: id(1), at: 30, addr: own(D, 60) }] });
  await flush();
  assert.deepEqual([WRITE.keptOf(D), WRITE.heldOf(D), REC.writing(D), MACHINE.typedOf(D), WRITE.inFlight(D)], [{ word: 'kept', reason: null }, [], false, 30, false]);
});

test('a refusal says "not kept" with no reason: the edits stay, nothing is sent again, and nothing more of the draft is dialed; another draft goes on', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const { ops } = boot((frame) => (frame.doc === D ? REFUSED : MINTED(own(E, 40), 20)));
  read(D, 'abc');
  read(E, 'abc');
  WRITE.addEdit(D, { pos: 4, width: 0, text: 'd' });
  let told = false;
  void WRITE.landed(D).then(() => { told = true; });
  t.mock.timers.tick(MACHINE.PAUSE_MS);
  await flush();
  assert.deepEqual([WRITE.keptOf(D), WRITE.inFlight(D), told, WRITE.edits(D).map((e) => [e.sent, e.at ?? null]), shown(D), REC.writing(D)], [{ word: 'not kept', reason: null }, false, true, [[1, null]], 'abcd', true]);
  WRITE.addEdit(D, { pos: 1, width: 0, text: 'x.' });
  t.mock.timers.tick(MACHINE.PAUSE_MS * 4);
  await flush();
  assert.deepEqual([ops.length, WRITE.inFlight(D), WRITE.keptOf(D)?.word, shown(D)], [1, false, 'not kept', 'x.abcd'], 'typed after it, punctuation among it: no burst opens, nothing dialed, the words standing on the page');
  WRITE.addEdit(E, { pos: 1, width: 0, text: 'y' });
  t.mock.timers.tick(MACHINE.PAUSE_MS);
  await flush();
  assert.deepEqual([ops.length, ops[1].frame.doc, WRITE.keptOf(E)?.word], [2, E, 'kept'], 'another draft\'s burst goes and is kept');
});

test('a frame refused or held does not stop the frames after it: each is dialed in order, typed at the unraised state, and the burst is not acked', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const { ops } = boot((frame, n) => (n === 1 ? HELD(1) : HELD(2, 'behind')), () => []);
  read(D, 'abcdef');
  WRITE.addEdit(D, { pos: 3, width: 2, text: 'XY' });
  t.mock.timers.tick(MACHINE.PAUSE_MS);
  await flush();
  assert.deepEqual(ops.map((o) => [o.frame.op, o.frame.as_of]), [['delete', 7], ['insert', 7]], 'the delete held: the insert dialed all the same, at the state no ack raised');
  assert.deepEqual([WRITE.keptOf(D)?.word, WRITE.edits(D).map((e) => e.at ?? null)], ['not yet kept', [null]]);
});

test('a burst that changes nothing dials nothing: its edits are acked at the typed state and the word is "kept"', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const { ops } = boot(() => ACK(20));
  read(D, 'abc');
  WRITE.addEdit(D, { pos: 2, width: 0, text: 'x' });
  WRITE.addEdit(D, { pos: 2, width: 1, text: '' });
  t.mock.timers.tick(MACHINE.PAUSE_MS);
  await flush();
  assert.deepEqual([ops, WRITE.inFlight(D), WRITE.keptOf(D), WRITE.edits(D).map((e) => [e.sent, e.at]), REC.writing(D)], [[], false, { word: 'kept', reason: null }, [[1, 7], [1, 7]], false]);
});

test('a burst the record cannot place yet is not dialed and stays in flight: tried again each pause, it goes once the record names the unit beside it', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const { ops } = boot(() => MINTED(own(D, 40), 20));
  REC.takeSpanSet(D, [{ subspace: 1, ordinal: 1, positions: 9 }]);
  REC.takeDelivery(D, [{ pos: 1, width: 3, kind: 'content', text: 'abc', ref: null, origin: null }], 7, { from: 1, runs: [{ iStart: own(D, 1), width: 3 }] });
  WRITE.addEdit(D, { pos: 4, width: 0, text: 'x' });
  t.mock.timers.tick(MACHINE.PAUSE_MS * 3);
  await flush();
  assert.deepEqual([ops, WRITE.inFlight(D), WRITE.keptOf(D), WRITE.unsent(D)], [[], true, null, 0], 'the unit after the edit unread: nothing dialed, no word, the flight standing');
  REC.takeDelivery(D, [{ pos: 4, width: 6, kind: 'content', text: 'defghi', ref: null, origin: null }], 7, { from: 4, runs: [{ iStart: own(D, 4), width: 6 }] });
  t.mock.timers.tick(MACHINE.PAUSE_MS);
  await flush();
  assert.deepEqual([ops.map((o) => o.anchors), WRITE.inFlight(D), WRITE.keptOf(D)?.word], [[{ before: own(D, 3), after: own(D, 4) }], false, 'kept']);
});

test('a draft of no content, which no text is read of, has its first burst typed at the position its extent was read at, null at both edges; with no position read of it the burst waits', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const { ops } = boot((frame) => MINTED(own(frame.doc, 1), 20));
  REC.takeSpanSet(D, [{ subspace: 1, ordinal: 1, positions: 0 }], 12);
  WRITE.addEdit(D, { pos: 1, width: 0, text: 'First words.' });
  assert.deepEqual(ops, [{ session: 's-1', frame: { op: 'insert', doc: D, at: at(1), values: ['First words.'], as_of: 12, id: id(1) }, anchors: { before: null, after: null } }]);
  await flush();
  assert.deepEqual([WRITE.keptOf(D)?.word, MACHINE.typedOf(D)], ['kept', 20]);
  REC.takeSpanSet(E, [{ subspace: 1, ordinal: 1, positions: 0 }]);
  WRITE.addEdit(E, { pos: 1, width: 0, text: 'More.' });
  t.mock.timers.tick(MACHINE.PAUSE_MS);
  await flush();
  assert.deepEqual([ops.length, WRITE.inFlight(E)], [1, true], 'its extent read at no position the answer said: no typed state, nothing dialed');
});

test('the machine taken out while a burst is out dials nothing more and says nothing: the answer that comes then moves no word, no mark and no flight', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const first = later();
  const { ops } = boot((frame, n) => (n === 1 ? first.out : MINTED(own(D, 50), 21)));
  read(D, 'abcdef');
  WRITE.addEdit(D, { pos: 3, width: 2, text: 'XY' });
  t.mock.timers.tick(MACHINE.PAUSE_MS);
  await flush();
  assert.deepEqual(ops.map((o) => o.frame.op), ['delete'], 'the burst\'s first frame out');
  MACHINE.takeOut();
  first.give(ACK(20));
  await flush();
  assert.deepEqual([ops.length, WRITE.keptOf(D), WRITE.edits(D).map((e) => [e.sent, e.at ?? null]), REC.mintedOf(D)], [1, null, [[1, null]], []], 'its answer after the machine is out: the next frame not dialed, no word said, nothing acked or minted');
});

test('the rebase drops exactly the edits a read covers — those acked at or before the position it was answered at — in the step that sets the record, the text shown the same before and after; an edit acked later, and one still open, stay', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  boot((frame, n) => MINTED(own(D, 40 + 10 * n), 19 + n));
  read(D, 'abc');
  WRITE.addEdit(D, { pos: 4, width: 0, text: 'd.' });
  await flush();
  WRITE.addEdit(D, { pos: 1, width: 0, text: 'x.' });
  await flush();
  WRITE.addEdit(D, { pos: 3, width: 0, text: 'open' });
  assert.deepEqual(WRITE.edits(D).map((e) => [e.text, e.sent ?? null, e.at ?? null]), [['d.', 1, 20], ['x.', 2, 21], ['open', null, null]]);
  const before = shown(D), rev = WRITE.editRev(D);
  assert.equal(before, 'x.openabcd.');
  // a read answered at 20: the board's text holds the first burst's change and not the second's
  REC.setAgain(D, { text: { runs: [{ pos: 1, width: 5, kind: 'content', text: 'abcd.', ref: null, origin: null }], asOf: 20 }, image: { from: 1, runs: [{ iStart: own(D, 1), width: 3 }, { iStart: own(D, 50), width: 2 }] }, spans: [{ subspace: 1, ordinal: 1, positions: 5 }] });
  assert.deepEqual(WRITE.edits(D).map((e) => [e.pos, e.text, e.sent ?? null, e.at ?? null]), [[1, 'x.', 2, 21], [3, 'open', null, null]], 'the edit the read covers gone; the one acked past it and the open one as they stood');
  assert.deepEqual([shown(D), WRITE.editRev(D) > rev], [before, true], 'the text shown byte for byte the same, the change counted so it is derived again');
  REC.setAgain(D, { text: { runs: [{ pos: 1, width: 7, kind: 'content', text: 'x.abcd.', ref: null, origin: null }], asOf: 25 }, image: { from: 1, runs: [{ iStart: own(D, 60), width: 2 }, { iStart: own(D, 1), width: 3 }, { iStart: own(D, 50), width: 2 }] }, spans: [{ subspace: 1, ordinal: 1, positions: 7 }] });
  assert.deepEqual([WRITE.edits(D).map((e) => [e.pos, e.text]), shown(D)], [[[3, 'open']], before], 'a read past the second ack: the open edit alone stays, the text shown the same');
  REC.setAgain(D, { text: { runs: [{ pos: 1, width: 7, kind: 'content', text: 'x.abcd.', ref: null, origin: null }], asOf: null }, image: { from: 1, runs: [{ iStart: own(D, 60), width: 2 }, { iStart: own(D, 1), width: 3 }, { iStart: own(D, 50), width: 2 }] } });
  assert.equal(WRITE.edits(D).length, 1, 'a read that says no position drops nothing');
});

test('the rebase keeps an edit a put-back still standing names, applied to nothing, until that put-back is acked — the put-back naming it by its place in the list as rebased, the text shown the same — then drops both', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const first = later();
  const { ops } = boot((frame, n) => (n === 3 ? first.out : frame.op === 'insert' ? MINTED(own(D, 40 + 10 * n), 19 + n) : ACK(19 + n)));
  read(D, 'abcdef');
  WRITE.addEdit(D, { pos: 1, width: 0, text: 'x.' });
  await flush();
  WRITE.addEdit(D, { pos: 5, width: 2, text: '' });
  t.mock.timers.tick(MACHINE.PAUSE_MS);
  await flush();
  assert.deepEqual([shown(D), WRITE.edits(D).map((e) => e.at)], ['x.abef', [20, 21]]);
  WRITE.addEdits(D, [{ pos: 5, width: 0, text: '', back: { of: 1, from: 0, width: 2 } }]);
  t.mock.timers.tick(MACHINE.PAUSE_MS);
  await flush();
  assert.deepEqual(ops[2].frame, { op: 'reinstate', doc: D, at: at(5), runs: [{ i_start: own(D, 3), origin: D, width: '2' }], as_of: 21, id: id(3) }, 'the put-back out as a reinstate, its answer not in');
  const before = shown(D);
  assert.equal(before, 'x.abcdef');
  // a read answered at 21, both acked bursts in it: the typed words kept, "cd" taken out
  const text = { runs: [{ pos: 1, width: 6, kind: /** @type {const} */ ('content'), text: 'x.abef', ref: null, origin: null }], asOf: 21 };
  const image = { from: 1, runs: [{ iStart: own(D, 50), width: 2 }, { iStart: own(D, 1), width: 2 }, { iStart: own(D, 5), width: 2 }] };
  REC.setAgain(D, { text, image, spans: [{ subspace: 1, ordinal: 1, positions: 6 }] });
  assert.deepEqual(WRITE.edits(D).map((e) => [e.pos, e.width, e.based ?? false, e.back, e.at ?? null]), [[5, 2, true, null, 21], [5, 0, false, { of: 0, from: 0, width: 2 }, null]],
    'the insert the read covers gone; the removal the put-back names stays, applied to nothing, and the put-back names it at its new place');
  assert.equal(shown(D), before, 'the text shown the same');
  first.give(ACK(22));
  await flush();
  REC.setAgain(D, { text: { runs: [{ pos: 1, width: 8, kind: 'content', text: 'x.abcdef', ref: null, origin: null }], asOf: 22 }, image: { from: 1, runs: [{ iStart: own(D, 50), width: 2 }, { iStart: own(D, 1), width: 6 }] }, spans: [{ subspace: 1, ordinal: 1, positions: 8 }] });
  assert.deepEqual([WRITE.edits(D), shown(D)], [[], before], 'the put-back acked and read: both gone, the text shown the same');
});

test('the page hidden commits every open burst as a pause would, its answer taken; the page unloading posts what is undialed by the keepalive `op`, in order, before the close', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const first = later();
  const { fake, ops } = boot((frame, n) => (n === 2 ? first.out : MINTED(own(frame.doc, 40 + n), 19 + n)));
  read(D, 'abc');
  read(E, 'abcdef');
  WRITE.addEdit(D, { pos: 4, width: 0, text: 'd' });
  WRITE.leaving('hidden');
  assert.deepEqual(ops.map((o) => o.frame.values), [['d']], 'hidden: the open burst dialed at once, no pause');
  await flush();
  assert.deepEqual([WRITE.keptOf(D), WRITE.inFlight(D)], [{ word: 'kept', reason: null }, false], 'and its ack taken while the page lives');
  WRITE.addEdit(E, { pos: 3, width: 2, text: 'XY' });
  t.mock.timers.tick(MACHINE.PAUSE_MS);
  await flush();
  assert.deepEqual(ops.slice(1).map((o) => o.frame.op), ['delete'], 'a burst of two frames out, its delete unanswered');
  WRITE.addEdit(D, { pos: 1, width: 0, text: 'x' });
  WRITE.leaving('unload');
  PORT.closeAtUnload('s-1');
  assert.deepEqual(fake.unloaded, [
    { op: { session: 's-1', frame: { op: 'insert', doc: D, at: at(1), values: ['x'], as_of: 20, id: id(4) }, anchors: { before: null, after: own(D, 1) } } },
    { op: { session: 's-1', frame: { op: 'insert', doc: E, at: at(3), values: ['XY'], as_of: 7, id: id(3) }, anchors: { before: own(E, 2), after: own(E, 5) } } },
    { close: 's-1' },
  ], 'the open burst of the one draft and the undialed frame of the other\'s burst out, each by the keepalive `op`, before the close');
  assert.equal(ops.length, 2, 'nothing dialed the ordinary way as the page goes');
  WRITE.leaving('unload');
  assert.equal(fake.unloaded.length, 3, 'posted once: a second unload finds nothing undialed');
});

test('a change of the page\'s class dials what is unsent under the session that typed it, before that session goes, and keeps the words: the edits stand, their minted bytes with them, and an unsent word the dial could not carry survives, never sent under another session', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const { ops } = boot((frame, n) => (frame.doc === E ? HELD(n) : MINTED(own(D, 40 + n), 19 + n)), () => []);
  read(D, 'abc');
  read(E, 'abc');
  WRITE.addEdit(D, { pos: 4, width: 0, text: 'd.' });
  WRITE.addEdit(E, { pos: 4, width: 0, text: 'e.' });
  await flush();
  assert.deepEqual([WRITE.keptOf(D)?.word, WRITE.keptOf(E)?.word], ['kept', 'not yet kept']);
  WRITE.addEdit(D, { pos: 1, width: 0, text: 'x' });
  WRITE.addEdit(E, { pos: 6, width: 0, text: 'f' });
  let told = 0;
  void WRITE.landed(D).then(() => { told++; });
  REC.sessionDied({ arm: 'closed' });
  assert.deepEqual(ops.slice(2).map((o) => [o.session, o.frame.doc, o.frame.values]), [['s-1', D, ['x']]], 'the open burst dialed under the session that typed it, as the class changes; the one beside a held word cannot go');
  await flush();
  assert.deepEqual([WRITE.edits(D).map((e) => [e.text, e.at ?? null]), REC.mintedOf(D).map((m) => [m.page, m.ordinal]), told], [[['d.', 20], ['x', 22]], [[1, 41], [3, 43]], 1],
    'the edits stand, the last acked as its answer comes, the bytes they made named by the addresses the board gave them, and the one waiting on the flight told');
  assert.deepEqual([WRITE.edits(E).map((e) => [e.text, e.sent ?? null, e.at ?? null]), WRITE.heldOf(E), WRITE.lastWritten()], [[['e.', 1, null], ['f', 2, null]], [], null],
    'the unsent word survives the change, marked sent by a burst no ack will name; the held lines and the draft last written let go with the class');
  REC.setSession(/** @type {any} */ ({ ...S, session: 's-2' }));
  read(E, 'abc', 30);
  WRITE.addEdit(E, { pos: 1, width: 0, text: 'y.' });
  t.mock.timers.tick(MACHINE.PAUSE_MS * 4);
  await flush();
  assert.deepEqual([ops.length, WRITE.inFlight(E), WRITE.edits(E).map((e) => e.text)], [3, false, ['e.', 'f', 'y.']], 'under the next session nothing of that draft is dialed: words another session typed are never sent under it');
  read(D, 'xabcd.', 30);
  WRITE.addEdit(D, { pos: 1, width: 0, text: 'z.' });
  await flush();
  assert.deepEqual([ops.length, ops[3].session, ops[3].frame.values, WRITE.keptOf(D)?.word], [4, 's-2', ['z.'], 'kept'], 'a draft whose every word was acked goes on under the next session');
});

// the last test of the file: it starts the pump, which reads for every test after it
test('the window\'s own feed row is not news: the ack tells the model its position and the draft is read again as that act\'s feedback — the edits the read holds dropped as it sets the text, the text shown the same, no clause saying it is as last read and no word of how it was set — while another writer\'s row is news', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  // the board the fake port stands in for: the draft's text and the address of each of its bytes, moved by each insert it acks
  let text = 'abc', position = 7;
  /** @type {number[]} */
  let ordinals = [1, 2, 3];
  const runs = () => ordinals.map((o) => ({ i_start: own(D, o), width: '1' }));
  const { fake, ops } = boot((frame) => {
    switch (frame.op) {
      case 'insert': {
        const pos = Number(frame.at.ordinal), words = frame.values.join(''), first = 40 + ordinals.length;
        text = text.slice(0, pos - 1) + words + text.slice(pos - 1);
        ordinals = [...ordinals.slice(0, pos - 1), ...[...words].map((_c, i) => first + i), ...ordinals.slice(pos - 1)];
        return MINTED(own(D, first), ++position + 12);
      }
      case 'retrieve_doc_v_span_set': return { result: { as_of: position + 12, resp: 'span_set', set: [{ start: '1.1', width: '0.' + text.length }] } };
      case 'doc_metadata': return frame.doc === D ? { result: { as_of: position + 12, resp: 'doc_metadata', doc: D, published: false, owner: '1.0.1' } } : { refused: { kind: 'refused', name: 'doc_not_registered', code: 'doc_not_registered' } };
      case 'retrieve_v': return { result: { as_of: position + 12, resp: 'delivery', items: [{ content: text }] } };
      case 'image': return { result: { as_of: position + 12, resp: 'runs', runs: runs() } };
      case 'find_links_v': return { result: { as_of: position + 12, resp: 'addrs', addrs: [] } };
      default: return undefined;
    }
  });
  // the draft in view at its reading size, read by the view as any document in view
  PUMP.start({ onDirty: () => {} });
  REC.takeAccountKey('1.0.1', { label: 'dev-notebook', fingerprint: 'e4272902a11439e5' });
  REC.takeIndex(/** @type {any} */ ({ docs: [{ doc: D, kind: 'draft', label: null, standing: 'yours_to_read' }], counts: [{ account: '1.0.1', documents: 1 }], state: { arm: 'complete' } }));
  const box = docBox(D), e = estimate(3, box), c = e.columns[0];
  CAM.setViewport(1440, 900); CAM.reach(e.fs); CAM.set(CAM.viewAt({ x: box.x + c.x + c.w / 2, y: box.y + c.y + c.h / 2 }, e.fs));
  /** the view's reads asked and answered until nothing is missing */
  const settle = async () => { for (let i = 0; i < 40 && !PUMP.settled(); i++) await flush(); };
  await settle();
  assert.deepEqual([REC.textBetween(D, 1, 4), REC.doc(D).readAt], ['abc', 19], 'the draft read in view');
  /** @type {Array<number | null>} the position each setting of the draft's text was answered at */
  const set = [];
  REC.onText((addr, asOf) => { if (addr === D) set.push(asOf); });
  WRITE.addEdit(D, { pos: 4, width: 0, text: 'd.' });
  assert.deepEqual([ops.filter((o) => o.frame.op === 'insert').length, shown(D)], [1, 'abcd.']);
  await flush();
  await settle();
  assert.deepEqual([set, WRITE.edits(D), shown(D), REC.textBetween(D, 1, 6), WRITE.keptOf(D)?.word], [[20], [], 'abcd.', 'abcd.', 'kept'], 'the ack told: the draft read again at the ack\'s position, the edit it holds dropped as the text is set, the text shown the same');
  assert.deepEqual([PUMP.kept(D), PUMP.liftOf('doc', D)], [null, null], 'said nowhere: no clause, and no word of how it was set');
  // the ack's own row, as the feed brings it after: read again as feedback, however long its read is out
  const release = fake.hold('op', { frame: { op: 'retrieve_v', specs: [{ doc: D, span: { start: '1.1', width: '0.5' } }] } });
  fake.fire('feed', { board: 'b-1', update: { position: 20, at: 20, op: 'insert', docs: [D], class: 'drafts', session: 's-1' } });
  await flush();
  t.mock.timers.tick(PUMP.KEPT_MS + 1);
  assert.deepEqual([PUMP.kept(D), PUMP.keptAll().docs], [null, []], 'its read out past the second: no clause says the draft is as last read');
  // another writer's row on the draft: news
  fake.fire('feed', { board: 'b-1', update: { position: 21, at: 21, op: 'insert', docs: [D], class: 'drafts', session: 's-1' } });
  await flush();
  t.mock.timers.tick(PUMP.KEPT_MS + 1);
  assert.deepEqual(PUMP.keptAll().docs, [D], 'a row at a position that is no ack of this window\'s: kept once its second has passed');
  release();
  await settle();
  assert.deepEqual([PUMP.kept(D), PUMP.liftOf('doc', D)?.outcome, shown(D)], [null, 'unchanged', 'abcd.'], 'and said as it is set: the news row\'s read, not the ack\'s');
});
