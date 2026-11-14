// W-MACHINE's test over the fake port, the pause's timer mocked: one test a
// row of D6's table. The open burst — an edit opens it and dials nothing
// (BM-1); the pause and punctuation commit it as composed frames (BM-2); an
// ack mints and says "kept" (BM-6); a late ack changes nothing (BM-7). The
// held words — `held(session)` read at the open, at a regain and as the event
// stream reopens, and each draft's lines set (BM-29); the shell's `held`
// answer and each state of the `held` event saying the word with its cause and
// reading the lines again (BM-8, BM-25); a held line from an earlier launch
// applied over the text in order and never twice, one that cannot apply held
// apart; a landing minting, and one with no position re-read in one step; each
// face act one `resolve` and a re-read (BM-10, BM-16, BM-17, BM-27); a foreign
// row waiting for the commit and the edits carried through it (BM-56, BM-57);
// each read-only-whole reason set and lifted and the draining store sending
// the waiting change (BM-20, BM-30, BM-58, BM-60); each page-kept refusal an
// island, composed past and discarded on the page (BM-19); the device's
// refusal (BM-21); a burst beside held, unminted words naming them by a piece;
// and a session's ending keeping a draft that holds unkept words. Then the
// rebase, the window's own feed row, the page hidden and changing class, and
// the page unloading: one close of its session carrying what is undialed
// behind the frames whose answers are not in, a byte beside a word out named
// by its piece. Undo and redo (BM-31 … BM-34, BM-45, BM-46, BM-73, BM-81,
// BM-11, BM-12): a step is a run of typing, whatever bursts carried it; an
// undo drops what no burst carried, sends the inverse of what one did — after
// the ack where it is out — drops the run's held lines by one `resolve`, owes
// the drop where the landing cannot be read, is answered at a face where the
// person's act comes first, is declined where its source is withheld, and
// goes inside the one close; a redo reinstates kept bytes and re-types
// unminted ones under their own ordinals; and an inverse is never composed as
// it was typed. What the margin marks (J5, D8): nothing at a line merely held;
// a run refused or handed over, and a refusal kept, refused over its own
// bytes; a moved document's lines, a line the device refused, and under the
// death every word the board has not kept, held; and a line another window
// sent held until it lands.
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
/** a row of `held(session)` as the shell lists a held line of a draft: its ordinal, its frame, and what else the row carries */
const ROW = (/** @type {number} */ held, /** @type {string} */ doc, /** @type {Record<string, any>} */ frame = { op: 'insert', doc }, /** @type {Record<string, any>} */ more = {}) => ({ held, doc, base: 7, frame, cause: 'unreachable', sent: false, time: held, ...more });
/** a draft's kept state while a line of it is held, by the cause's token */
const YET = (/** @type {string} */ token, /** @type {string | null} */ arm = null) => ({ word: 'not yet kept', reason: null, cause: { token, arm } });
/** a draft's kept state where the board has not kept its words and no resend follows, by the cause's token */
const NOT = (/** @type {string} */ token, /** @type {string | null} */ arm = null) => ({ word: 'not kept', reason: null, cause: { token, arm } });
/** the `held` event as the shell fires it for the page's board and session */
const EVENT = (/** @type {string} */ doc, /** @type {string} */ state, /** @type {number} */ held, /** @type {Record<string, any>} */ more = {}) => ({ board: 'b-1', session: REC.session()?.session, doc, held, state, ...more });

/** every microtask and every answer the fake port owes run: the pause's timer is mocked, `setImmediate` is not */
const flush = async () => { for (let i = 0; i < 6; i++) await new Promise((r) => setImmediate(r)); };

/**
 * @typedef {Object} Board — the fake port as these tests drive it
 * @property {ReturnType<typeof FAKE.create>} fake
 * @property {Array<{session: string, frame: Record<string, any>, anchors: unknown}>} ops every `op` the page dialed, in order, as its arguments
 * @property {string[]} names every call the page made, by name, in order
 * @property {Array<{session: string, held: number, act: string}>} resolves every `resolve` the page sent, in order, as its arguments
 */

/**
 * The page booted over a fake port whose every write frame is answered by
 * `answer` — an outcome, or a promise of one for an answer the test gives
 * later — and whose `held(session)` answers `rows()`; the session opened, the
 * machine handed in.
 * @param {(frame: Record<string, any>, n: number) => unknown} answer what the board answers the `n`-th frame dialed, counted from 1
 * @param {() => unknown} [rows] what `held(session)` lists, or the outcome it answers whole
 * @param {(args: Record<string, any>) => unknown} [resolved] what `resolve` answers an act
 * @returns {Board}
 */
function boot(answer, rows = () => [], resolved = () => ({ result: {} })) {
  let n = 0;
  const script = new Proxy({}, {
    get: (_t, key) => (String(key).startsWith('op:') ? answer(JSON.parse(String(key).slice(3)), ++n) : String(key).startsWith('held:') ? held(rows()) : String(key).startsWith('resolve:') ? resolved(JSON.parse(String(key).slice(8))) : undefined),
  });
  /** what `held(session)` answers: the rows, or the outcome a test hands in whole */
  const held = (/** @type {any} */ x) => (Array.isArray(x) ? { result: x } : x);
  const fake = FAKE.create(script);
  /** @type {Board['ops']} */
  const ops = [];
  /** @type {string[]} */
  const names = [];
  /** @type {Array<{session: string, held: number, act: string}>} */
  const resolves = [];
  const call = fake.call;
  fake.call = (name, args) => { names.push(name); if (name === 'op') ops.push(/** @type {Board['ops'][number]} */ (args)); if (name === 'resolve') resolves.push(/** @type {any} */ (args)); return call(name, args); };
  PORT.boot(fake);
  REC.setBoard({ board: 'b-1', name: '', origin: '' });
  REC.setSession(/** @type {any} */ (S));
  MACHINE.handIn();
  return { fake, ops, names, resolves };
}

/** a draft's record as a read at position 7 delivers it: its text, its extent and its image, its own bytes in order */
function read(/** @type {string} */ addr, /** @type {string} */ text, asOf = 7, first = 1) {
  const n = byteLength(text);
  REC.takeSpanSet(addr, [{ subspace: 1, ordinal: 1, positions: n }]);
  REC.takeDelivery(addr, [{ pos: 1, width: n, kind: 'content', text, ref: null, origin: null }], asOf, { from: 1, runs: [{ iStart: own(addr, first), width: n }] });
}

/** the text the page shows of a draft: its record with its edits applied, each byte the page made named as the model names it */
function shown(/** @type {string} */ addr) {
  const d = applyEdits(WRITE.baseOf(addr), WRITE.edits(addr), (page, width) => REC.pageIds(addr, page, width)).doc;
  return d.from < 0 ? '' : REC.textOf(d.runs, d.from, d.to);
}

/** an answer the test gives later: the promise the fake port waits on, and what settles it */
function later() {
  /** @type {(out: unknown) => void} */
  let give = () => {};
  const out = new Promise((r) => { give = r; });
  return { out, give };
}

/** keys typed at a caret standing at `pos` of a draft: each character one edit, made as a key typing at the caret (W-WRITE's `Typed`) */
function type(/** @type {string} */ addr, /** @type {number} */ pos, /** @type {string} */ text) {
  let p = pos;
  for (const ch of [...text]) { WRITE.addEdit(addr, { pos: p, width: 0, text: ch }, { at: p }); p += byteLength(ch); }
}
/** Backspace at a caret standing at `pos` of a draft: the byte before it taken out, a key typing at the caret */
const backspace = (/** @type {string} */ addr, /** @type {number} */ pos) => WRITE.addEdit(addr, { pos: pos - 1, width: 1, text: '' }, { at: pos });
/** a draft's stacks as they stand: each step's kind, whether its run is open, and how many acts it holds */
const stacks = (/** @type {string} */ addr) => ({ undo: WRITE.undoOf(addr).map((x) => [x.kind, x.open, x.acts.length]), redo: WRITE.redoOf(addr).map((x) => [x.kind, x.open, x.acts.length]) });
/** a board's refusal of a frame, by its name */
const refusal = (/** @type {string} */ name, /** @type {Record<string, unknown>} */ site = {}) => ({ kind: 'refused', name, status: 200, code: name, detail: null, op: 'insert', site, body: null });

beforeEach(() => { MACHINE._reset(); REC._reset(); WRITE._reset(); });

test('BM-1: an edit opens the draft\'s burst and dials nothing; with no machine handed in, or under a session that may not write, nothing opens', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const { ops, names } = boot(() => ACK(20));
  read(D, 'abc');
  WRITE.addEdit(D, { pos: 4, width: 0, text: 'd' });
  await flush();
  assert.deepEqual([WRITE.inFlight(D), ops, names, WRITE.keptOf(D), shown(D)], [true, [], ['held'], null, 'abcd'], 'the burst open, the character placed, nothing dialed — the held lines alone read, as the session opened — and no word said');
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

test('B3-S1 THE START: the mint is one `create_new_document` into the acting account, born private, under the page\'s session, and the typed line is the minted draft\'s first burst — one `insert` at its first position, typed at the mint\'s position, sent at once and kept', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const { ops } = boot((frame) => (frame.op === 'create_new_document' ? MINTED(E, 30) : MINTED(own(E, 1), 31)));
  const out = await MACHINE.start('A first line');
  await flush();
  assert.deepEqual(out, { addr: E, at: 30 }, 'the draft the board minted, and the position its mint was acked at');
  assert.deepEqual(ops.map((o) => o.frame), [
    { op: 'create_new_document', account: '1.0.1', published: false, id: id(1) },
    { op: 'insert', doc: E, at: at(1), values: ['A first line'], as_of: 30, id: id(2) },
  ], 'the mint, then the first line as one insert typed at the state the mint left');
  assert.deepEqual([ops[0].session, ops[1].session, ops[1].anchors], ['s-1', 's-1', { before: null, after: null }], 'both under the page\'s session, the insert anchored at the empty document\'s two edges');
  assert.deepEqual([REC.place(E)?.kind, REC.place(E)?.standing, REC.doc(E).extent, REC.doc(E).extentAt], ['draft', 'yours_to_read', 0, 30], 'the model lists the minted draft at the ack, holding no content as of the mint');
  assert.deepEqual([WRITE.keptOf(E), WRITE.inFlight(E), shown(E), MACHINE.typedOf(E)], [{ word: 'kept', reason: null }, false, 'A first line', 31], 'the burst acked: the draft kept, the line shown, the typed state raised');
  assert.deepEqual(stacks(E).undo, [['put-back', false, 1]], 'the first line is one step of the draft\'s undo stack, no run of typing a later key joins');
});

test('B3-S1 THE START: a mint the board refuses types nothing — no burst, no edit and no document; a session that may not write, a guest and a page with no machine dial nothing and are answered by the refusal\'s name; and a mint of no characters sends no burst', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const { ops } = boot((frame) => (frame.op === 'create_new_document' ? { refused: refusal('mint_home_public') } : ACK(31)));
  const out = await MACHINE.start('A first line');
  await flush();
  assert.equal('refused' in out && out.refused.name, 'mint_home_public', 'the board\'s own refusal is handed up');
  assert.deepEqual([ops.map((o) => o.frame.op), WRITE.flying(), REC.docs().length, REC.places().length], [['create_new_document'], [], 0, 0], 'the mint alone was dialed: no burst follows, and the model holds no document');
  REC.setSession(/** @type {any} */ ({ ...S, writes: false }));
  const keyless = await MACHINE.start('x');
  REC.setSession(null);
  const guest = await MACHINE.start('x');
  REC.setSession(/** @type {any} */ (S));
  MACHINE.takeOut();
  const none = await MACHINE.start('x');
  assert.deepEqual(['refused' in keyless && keyless.refused, 'refused' in guest && guest.refused, 'refused' in none && none.refused, ops.length],
    [{ kind: 'shell', name: 'write_in_bare_session' }, { kind: 'shell', name: 'no_session' }, { kind: 'shell', name: 'no_session' }, 1], 'each answered by its name, nothing more dialed');
  const again = boot((frame) => (frame.op === 'create_new_document' ? MINTED(E, 40) : ACK(41)));
  const empty = await MACHINE.start('');
  await flush();
  assert.deepEqual([empty, again.ops.map((o) => o.frame.op), WRITE.edits(E).length], [{ addr: E, at: 40 }, ['create_new_document'], 0], 'no characters: the draft is minted and nothing is typed into it');
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

test('BM-8: the shell\'s `held` answer says "not yet kept" with the hold\'s cause, keeps the edits, reads the held lines and sets them before those waiting are told, and sends the next burst through `op` the same way — one typed beside the held word naming it by a piece; the `held` event\'s landed lines then mint their bytes and, the last held line landed, say "kept"', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  /** @type {unknown[]} */
  let rows = [];
  const { fake, ops, names } = boot((frame, n) => HELD(n, n === 1 ? 'unreachable' : 'behind'), () => rows);
  read(D, 'abc def');
  WRITE.addEdit(D, { pos: 8, width: 0, text: '!' });
  rows = [ROW(1, D, ops[0].frame, { anchors: { before: own(D, 7), after: null } }), ROW(9, E, { op: 'insert', doc: E }, { cause: 'behind' })];
  /** @type {Array<[number, string | undefined]>} what each one waiting on the flight found as it was told: the draft's held lines, and its word */
  const found = [];
  void WRITE.landed(D).then(() => found.push([WRITE.heldOf(D).length, WRITE.keptOf(D)?.word]));
  await flush();
  assert.deepEqual([names, found], [['held', 'op', 'held'], [[1, 'not yet kept']]], '`held(session)` read after the answer; the one waiting told once the draft\'s own lines are set and the word said');
  assert.deepEqual([WRITE.keptOf(D), WRITE.inFlight(D), WRITE.heldOf(D).map((r) => r.held), WRITE.edits(D).map((e) => [e.sent, e.at ?? null]), shown(D), REC.mintedOf(D), REC.writing(D), WRITE.reopened(D)],
    [YET('unreachable'), false, [1], [[1, null]], 'abc def!', [], true, []], 'the word with its cause; the edit stays, sent and not acked, its byte the page\'s own, the line this window sent applied nowhere twice; the model told the draft holds words the board has not acked');
  WRITE.addEdit(D, { pos: 1, width: 0, text: 'x' });
  assert.equal(WRITE.inFlight(D), true, 'typing goes on: the next burst opens');
  t.mock.timers.tick(MACHINE.PAUSE_MS);
  rows = [...rows, ROW(2, D, ops[1].frame, { cause: 'behind' })];
  await flush();
  assert.deepEqual([ops.length, ops[1].frame, ops[1].anchors, 'after' in ops[1]], [2, { op: 'insert', doc: D, at: at(1), values: ['x'], as_of: 7, id: id(2) }, { before: null, after: own(D, 1) }, false],
    'sent through `op` the same way, typed at the unraised state, no member added: the shell holds it behind');
  assert.deepEqual([WRITE.keptOf(D)?.word, WRITE.heldOf(D).map((r) => r.held), WRITE.inFlight(D)], ['not yet kept', [1, 2], false]);
  WRITE.addEdit(D, { pos: 10, width: 0, text: '?' });
  rows = [...rows, ROW(3, D, { op: 'insert', doc: D }, { cause: 'behind' })];
  await flush();
  assert.deepEqual([ops.length, ops[2].frame, ops[2].anchors], [3, { op: 'insert', doc: D, at: at(10), values: ['?'], as_of: 7, id: id(3) }, { before: { burst: id(1), offset: 0 }, after: null }],
    'typed beside the held word: sent behind it, the unminted neighbour named by the piece of the insert that carried it — never the document\'s edge, never another byte');
  rows = [rows[1], rows[3]];
  fake.fire('held', EVENT(D, 'holding', 1, { cause: 'behind', landed: [{ held: 1, burst: id(1), at: 30, addr: own(D, 60) }, { held: 2, burst: id(2), at: 31, addr: own(D, 61) }] }));
  assert.deepEqual(REC.mintedOf(D).map((m) => [m.page, m.ordinal, m.at]), [[1, 60, 30], [2, 61, 31]], 'the landed lines\' bytes minted from the addresses the event names');
  assert.deepEqual(WRITE.edits(D).map((e) => [e.sent, e.at ?? null]), [[1, 30], [2, 31], [3, null]], 'each burst acked at the position the board took its line at; the third held still');
  await flush();
  assert.deepEqual([WRITE.heldOf(D).map((r) => r.held), WRITE.keptOf(D)?.word, REC.writing(D), MACHINE.typedOf(D)], [[3], 'not yet kept', true, 31], 'the draft\'s held lines read again: the third alone, the word standing');
  rows = [rows[0]];
  fake.fire('held', EVENT(D, 'kept', 0, { landed: [{ held: 3, burst: id(3), at: 32, addr: own(D, 62) }] }));
  await flush();
  assert.deepEqual([WRITE.heldOf(D), WRITE.keptOf(D), REC.writing(D), WRITE.inFlight(D)], [[], { word: 'kept', reason: null }, false, false], '`kept` with none held: the word "kept", the model told the draft holds no word the board has not acked');
});

test('BM-8: once every held line of a draft has landed and nothing is open, the word is "kept" and the model is told the draft holds no dialed word the board has not acked; a line another window\'s event names, or one of another board, moves nothing', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  /** @type {unknown[]} */
  let rows = [ROW(4, D)];
  const { fake } = boot(() => HELD(4), () => rows);
  read(D, 'abc');
  WRITE.addEdit(D, { pos: 4, width: 0, text: 'd' });
  t.mock.timers.tick(MACHINE.PAUSE_MS);
  await flush();
  assert.deepEqual([WRITE.keptOf(D)?.word, REC.writing(D)], ['not yet kept', true]);
  fake.fire('held', { board: 'b-2', session: 's-1', doc: D, held: 0, state: 'kept', landed: [{ held: 4, at: 30, addr: own(D, 60) }] });
  fake.fire('held', { board: 'b-1', session: 's-9', doc: D, held: 0, state: 'kept', landed: [{ held: 4, at: 30, addr: own(D, 60) }] });
  fake.fire('held', { board: 'b-1', session: 's-1', doc: D, held: 1, state: 'sending', landed: [{ held: 5, at: 30, addr: own(D, 60) }] });
  await flush();
  assert.deepEqual([WRITE.keptOf(D)?.word, REC.mintedOf(D), REC.writing(D)], ['not yet kept', [], true], 'another board\'s event, another session\'s, and a line that is not this window\'s: the hold stands');
  rows = [];
  fake.fire('held', { board: 'b-1', session: 's-1', doc: D, held: 0, state: 'kept', landed: [{ held: 4, burst: id(1), at: 30, addr: own(D, 60) }] });
  await flush();
  assert.deepEqual([WRITE.keptOf(D), WRITE.heldOf(D), REC.writing(D), MACHINE.typedOf(D), WRITE.inFlight(D)], [{ word: 'kept', reason: null }, [], false, 30, false]);
});

test('BM-19: a refusal the page keeps makes the run an island — "not kept", its words standing in the text shown, read as no dialed word the board may yet take — and typing goes on, the next burst composed past it; the discard is the page\'s own, sending nothing; another draft goes on', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const { ops, resolves } = boot((frame, n) => (n === 1 ? REFUSED : MINTED(own(frame.doc, 40 + n), 19 + n)));
  read(D, 'abc');
  read(E, 'abc');
  WRITE.addEdit(D, { pos: 4, width: 0, text: 'd' });
  let told = false;
  void WRITE.landed(D).then(() => { told = true; });
  t.mock.timers.tick(MACHINE.PAUSE_MS);
  await flush();
  assert.deepEqual([WRITE.keptOf(D), WRITE.inFlight(D), told, WRITE.edits(D).map((e) => [e.sent, e.at ?? null, e.island ?? null]), shown(D), REC.writing(D), WRITE.islandsOf(D), WRITE.islandWords(D, 1)],
    [NOT('island'), false, true, [[1, null, 1]], 'abcd', false, [{ id: 1, name: 'malformed_args', kind: 'shell' }], 'd']);
  WRITE.addEdit(D, { pos: 1, width: 0, text: 'x.' });
  await flush();
  assert.deepEqual([ops.length, ops[1].frame, ops[1].anchors, WRITE.keptOf(D)?.word, shown(D)], [2, { op: 'insert', doc: D, at: at(1), values: ['x.'], as_of: 7, id: id(2) }, { before: null, after: own(D, 1) }, 'not kept', 'x.abcd'],
    'typed after it: the burst goes, composed against the board\'s text, the island\'s word left out; the island stands, so the word does');
  WRITE.addEdit(D, { pos: 7, width: 0, text: 'y.' });
  await flush();
  assert.deepEqual([ops[2].frame.at, ops[2].frame.values, ops[2].anchors], [at(6), ['y.'], { before: own(D, 3), after: null }], 'typed past the island: its position less the island\'s width, its anchor the board\'s byte before the island, never the island\'s');
  MACHINE.discardIsland(D, 1);
  await flush();
  assert.deepEqual([shown(D), WRITE.islandsOf(D), WRITE.keptOf(D), ops.length, resolves], ['x.abcy.', [], { word: 'kept', reason: null }, 3, []], 'discarded: the island\'s word leaves the text shown, the rest standing where it stood, and nothing is sent — no `op`, no `resolve`');
  WRITE.addEdit(E, { pos: 1, width: 0, text: 'y' });
  t.mock.timers.tick(MACHINE.PAUSE_MS);
  await flush();
  assert.deepEqual([ops.length, ops[3].frame.doc, WRITE.keptOf(E)?.word], [4, E, 'kept'], 'another draft\'s burst goes and is kept');
});

test('a frame refused or held does not stop the frames after it: each is dialed in order, typed at the unraised state, and the burst is not acked', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const { ops } = boot((frame, n) => (n === 1 ? HELD(1) : HELD(2, 'behind')), () => [ROW(1, D, { op: 'delete', doc: D }), ROW(2, D, { op: 'insert', doc: D }, { cause: 'behind' })]);
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

test('the page hidden commits every open burst as a pause would, its answer taken; the page unloading posts one close of the page\'s session to outlive it — its `frames` every frame not dialed, draft by draft in order, its `after` each dialed frame whose answer is not in — and posts it once', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const first = later();
  const { fake, ops } = boot((frame, n) => (n === 2 ? first.out : MINTED(own(frame.doc, 40 + n), 19 + n)));
  read(D, 'abc');
  read(E, 'abcdef');
  WRITE.addEdit(D, { pos: 4, width: 0, text: 'd' });
  assert.equal(WRITE.leaving('hidden'), false, 'hidden: no close posted');
  assert.deepEqual(ops.map((o) => o.frame.values), [['d']], 'hidden: the open burst dialed at once, no pause');
  await flush();
  assert.deepEqual([WRITE.keptOf(D), WRITE.inFlight(D)], [{ word: 'kept', reason: null }, false], 'and its ack taken while the page lives');
  WRITE.addEdit(E, { pos: 3, width: 2, text: 'XY' });
  t.mock.timers.tick(MACHINE.PAUSE_MS);
  await flush();
  assert.deepEqual(ops.slice(1).map((o) => o.frame.op), ['delete'], 'a burst of two frames out, its delete unanswered');
  WRITE.addEdit(D, { pos: 1, width: 0, text: 'x' });
  assert.equal(WRITE.leaving('unload'), true, 'unloading: the machine posted the page\'s close');
  assert.deepEqual(fake.unloaded, [{ close: { session: 's-1', after: [id(2)], frames: [
    { frame: { op: 'insert', doc: D, at: at(1), values: ['x'], as_of: 20, id: id(4) }, anchors: { before: null, after: own(D, 1) } },
    { frame: { op: 'insert', doc: E, at: at(3), values: ['XY'], as_of: 7, id: id(3) }, anchors: { before: own(E, 2), after: own(E, 5) } },
  ] } }], 'one close: the open burst of the one draft and the undialed frame of the other\'s burst out, in order, behind the delete whose answer is not in');
  assert.equal(ops.length, 2, 'nothing dialed the ordinary way as the page goes');
  assert.deepEqual([WRITE.leaving('unload'), fake.unloaded.length], [true, 1], 'posted once: a second unload posts no second close of the session');
});

test('at the unload a byte typed beside a word of the burst out, whose answer is not in, is named by the piece of the insert that carried it, and the close carries it behind that burst', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const { fake, ops } = boot(() => later().out);
  read(D, 'abc');
  WRITE.addEdit(D, { pos: 4, width: 0, text: 'd' });
  t.mock.timers.tick(MACHINE.PAUSE_MS);
  await flush();
  assert.deepEqual(ops.map((o) => o.frame.id), [id(1)], 'the burst out, its answer not in');
  WRITE.addEdit(D, { pos: 5, width: 0, text: 'e' });
  assert.equal(WRITE.leaving('unload'), true);
  assert.deepEqual(fake.unloaded, [{ close: { session: 's-1', after: [id(1)], frames: [
    { frame: { op: 'insert', doc: D, at: at(5), values: ['e'], as_of: 7, id: id(2) }, anchors: { before: { burst: id(1), offset: 0 }, after: null } },
  ] } }], 'the word typed after the unanswered one: its neighbour named by the piece of the insert out, never left unsent');
  assert.equal(ops.length, 1, 'nothing dialed the ordinary way as the page goes');
});

test('the unload\'s close is the bare close of the session the page holds where nothing of it is undialed: a burst gone out under a session the page no longer holds rides in it neither as a frame nor in its `after`; with no session standing nothing is posted, and with the machine taken out W-WRITE says it posted none', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const { fake, ops } = boot(() => later().out);
  read(D, 'abcdef');
  WRITE.addEdit(D, { pos: 3, width: 2, text: 'XY' });
  t.mock.timers.tick(MACHINE.PAUSE_MS);
  await flush();
  assert.deepEqual(ops.map((o) => [o.session, o.frame.op]), [['s-1', 'delete']], 'a burst of two frames out under s-1, its delete unanswered');
  REC.setSession(/** @type {any} */ ({ ...S, session: 's-2' }));
  await flush();
  assert.equal(WRITE.leaving('unload'), true);
  assert.deepEqual(fake.unloaded, [{ close: { session: 's-2' } }], 'the close of the page\'s session alone: what s-1 typed is not carried under s-2');
  REC.setSession(null);
  assert.deepEqual([WRITE.leaving('unload'), fake.unloaded.length], [false, 1], 'no session standing: nothing posted, and the machine says so');
  REC.setSession(/** @type {any} */ ({ ...S, session: 's-3' }));
  MACHINE.takeOut();
  assert.deepEqual([WRITE.leaving('unload'), fake.unloaded.length], [false, 1], 'no machine: none posted, the page\'s close its caller\'s');
});

test('a change of the page\'s class dials what is unsent under the session that typed it, before that session goes, and keeps the words: the edits stand, their minted bytes with them, and an unsent word the dial could not carry survives, never sent under another session', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  /** @type {unknown[]} */
  let rows = [];
  const { ops } = boot((frame, n) => (frame.doc === E ? later().out : MINTED(own(D, 40 + n), 19 + n)), () => rows);
  read(D, 'abc');
  read(E, 'abc');
  WRITE.addEdit(D, { pos: 4, width: 0, text: 'd.' });
  await flush();
  assert.equal(WRITE.keptOf(D)?.word, 'kept');
  WRITE.addEdit(E, { pos: 4, width: 0, text: 'e.' });
  await flush();
  assert.deepEqual(ops.slice(1).map((o) => [o.frame.doc, o.frame.values]), [[E, ['e.']]], 'a burst of the other draft out, its answer not in');
  WRITE.addEdit(D, { pos: 1, width: 0, text: 'x' });
  WRITE.addEdit(E, { pos: 6, width: 0, text: 'f' });
  let told = 0;
  void WRITE.landed(D).then(() => { told++; });
  REC.sessionDied({ arm: 'closed' });
  assert.deepEqual(ops.slice(2).map((o) => [o.session, o.frame.doc, o.frame.values]), [['s-1', D, ['x']]], 'the open burst dialed under the session that typed it, as the class changes; the one behind a burst still out cannot go');
  await flush();
  assert.deepEqual([WRITE.edits(D).map((e) => [e.text, e.at ?? null]), REC.mintedOf(D).map((m) => [m.page, m.ordinal]), told], [[['d.', 20], ['x', 22]], [[1, 41], [3, 43]], 1],
    'the edits stand, the last acked as its answer comes, the bytes they made named by the addresses the board gave them, and the one waiting on the flight told');
  assert.deepEqual([WRITE.edits(E).map((e) => [e.text, e.sent ?? null, e.at ?? null]), WRITE.lastWritten()], [[['e.', 1, null], ['f', 2, null]], null],
    'the unsent word survives the change, marked sent by a burst no ack will name; the draft last written let go with the class');
  REC.setSession(/** @type {any} */ ({ ...S, session: 's-2' }));
  read(E, 'abc', 30);
  WRITE.addEdit(E, { pos: 1, width: 0, text: 'y.' });
  t.mock.timers.tick(MACHINE.PAUSE_MS * 4);
  await flush();
  assert.deepEqual([ops.length, WRITE.inFlight(E), WRITE.edits(E).map((e) => e.text)], [3, false, ['e.', 'f', 'y.']], 'under the next session nothing of that draft is dialed: words a change of class left are never sent after it');
  read(D, 'xabcd.', 30);
  WRITE.addEdit(D, { pos: 1, width: 0, text: 'z.' });
  await flush();
  assert.deepEqual([ops.length, ops[3].session, ops[3].frame.values, WRITE.keptOf(D)?.word], [4, 's-2', ['z.'], 'kept'], 'a draft whose every word was acked goes on under the next session');
  void rows;
});

// ---- the held words (D6 BM-8 … BM-30, BM-58 … BM-62, BM-78) --------------------------------------------------------

test('BM-29: `held(session)` is read at the session\'s open and at each session the page comes to hold after it, and each draft\'s lines are set in resend order — a draft never typed in reading "not yet kept" with its head line\'s cause; a refusal of the read leaves the lines as they stood', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  /** @type {unknown} */
  let rows = [ROW(2, D, { op: 'insert', doc: D, at: at(4), values: ['!'], as_of: 7, id: 'page:old.1' }, { cause: 'stopped' }), ROW(5, E, { op: 'insert', doc: E, at: at(1), values: ['e'], as_of: 7, id: 'page:old.2' }), ROW(7, D, { op: 'insert', doc: D, at: at(5), values: ['?'], as_of: 7, id: 'page:old.3' }, { cause: 'behind' })];
  read(D, 'abc'); read(E, 'abc');
  const { names } = boot(() => ACK(20), () => rows);
  assert.deepEqual(names, ['held'], 'read as the machine is handed a session');
  await flush();
  assert.deepEqual([WRITE.heldOf(D).map((r) => r.held), WRITE.heldOf(E).map((r) => r.held), WRITE.keptOf(D), WRITE.keptOf(E), REC.writing(D)], [[2, 7], [5], YET('stopped'), YET('unreachable'), true],
    'each draft\'s lines in the list\'s order, its word "not yet kept" with the cause of the line at its head; the model told a line of it is held');
  rows = { refused: { kind: 'shell', name: 'busy' } };
  REC.setSession(/** @type {any} */ ({ ...S, session: 's-2' }));
  await flush();
  assert.deepEqual([names, WRITE.heldOf(D).map((r) => r.held), WRITE.keptOf(D)?.word], [['held', 'held'], [2, 7], 'not yet kept'], 'read again at the session regained; refused, the lines stand as they stood');
  rows = [ROW(7, D, { op: 'insert', doc: D, at: at(5), values: ['?'], as_of: 7, id: 'page:old.3' })];
  REC.setSession(/** @type {any} */ ({ ...S, session: 's-3' }));
  await flush();
  assert.deepEqual([names.length, WRITE.heldOf(D).map((r) => r.held), WRITE.heldOf(E), WRITE.keptOf(D)?.cause], [3, [7], [], { token: 'unreachable', arm: null }], 'tried again at the next open: the lines as that read lists them');
});

test('BM-8, BM-25, BM-78: each state of the `held` event says the word with its cause at once and reads the lines again — holding and sending "not yet kept", refused "not kept" with the refusal, moved "not yet kept" keeping its hands, marked `again` where they are — and `kept` with none held says "kept"; the death\'s hold reads its own cause, never the board\'s silence', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  /** @type {unknown[]} */
  let rows = [];
  const { fake, names } = boot(() => ACK(20), () => rows);
  read(D, 'abc');
  await flush();
  const before = names.length;
  rows = [ROW(1, D)];
  fake.fire('held', EVENT(D, 'holding', 1, { cause: 'unreachable' }));
  assert.deepEqual(WRITE.keptOf(D), YET('unreachable'), 'said at the event, before the lines are read');
  await flush();
  assert.deepEqual([names.slice(before), WRITE.heldOf(D).map((r) => r.held)], [['held'], [1]], 'and the lines read again, once, and set');
  fake.fire('held', EVENT(D, 'sending', 1, { cause: 'unreachable' }));
  await flush();
  assert.deepEqual([WRITE.keptOf(D), names.slice(before).length], [YET('unreachable'), 2], 'sending: the word stands, the lines read again');
  rows = [ROW(1, D, { op: 'insert', doc: D }, { cause: 'session_died', refusal: { kind: 'shell', name: 'session_died', reason: { arm: 'restart' } } })];
  fake.fire('held', EVENT(D, 'holding', 1, { cause: 'session_died' }));
  await flush();
  assert.deepEqual(WRITE.keptOf(D), YET('session_died', 'restart'), 'the death at a first dial: its own cause and its arm, never `unreachable`');
  rows = [ROW(1, D, { op: 'insert', doc: D }, { cause: 'out_of_bounds', sent: true, refusal: { kind: 'refused', name: 'out_of_bounds', status: 200, code: 'out_of_bounds', detail: null, op: 'insert', site: {}, body: null } })];
  fake.fire('held', EVENT(D, 'refused', 1, { cause: 'out_of_bounds' }));
  assert.deepEqual(WRITE.keptOf(D), NOT('out_of_bounds'), 'refused: "not kept" with the refusal, at the event');
  await flush();
  assert.deepEqual(WRITE.keptOf(D), NOT('out_of_bounds'));
  const moved = { kind: 'refused', name: 'arrangement_moved', status: 200, code: 'arrangement_moved', detail: null, op: 'insert', site: { as_of: 7, current: 9 }, body: null };
  rows = [ROW(1, D, { op: 'insert', doc: D }, { cause: 'moved', refusal: moved }), ROW(2, D, { op: 'insert', doc: D }, { cause: 'moved' })];
  fake.fire('held', EVENT(D, 'moved', 2, { cause: 'arrangement_moved', hands: [{ key: 'other', fingerprint: 'fp-2', label: 'desk' }], again: true, sendable: false }));
  await flush();
  assert.deepEqual([WRITE.keptOf(D), WRITE.heldOf(D)[0].hands, WRITE.heldOf(D)[0].again, WRITE.heldOf(D)[1].hands], [YET('moved'), [{ key: 'other', fingerprint: 'fp-2', label: 'desk' }], true, null],
    'moved: "not yet kept"; the hands the event told kept on the moved line the list names none for, marked `again`');
  rows = [];
  fake.fire('held', EVENT(D, 'kept', 0));
  await flush();
  assert.deepEqual([WRITE.keptOf(D), WRITE.heldOf(D), REC.writing(D)], [{ word: 'kept', reason: null }, [], false], '`kept` with none held: "kept", the lines cleared');
});

test('BM-29: at a reopen the held lines this window did not send are applied over the draft\'s text in `k` order, before its own edits — an insert\'s words where they were typed, a removal\'s gone — each held by the page\'s own name; a line this window sent stands in its edits and is never applied twice; a line that cannot be applied is held apart with every line after it; and a moved document\'s hands read "not read yet" until the read answers', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  /** @type {unknown[]} */
  let rows = [
    ROW(1, D, { op: 'insert', doc: D, at: at(4), values: [' held'], as_of: 7, id: 'page:old.1' }, { anchors: { before: own(D, 3), after: own(D, 4) } }),
    ROW(2, D, { op: 'delete', doc: D, p: at(10), width: '3', as_of: 7, id: 'page:old.2' }, { cause: 'behind', anchors: { before: { burst: 'page:old.1', offset: 4 }, after: own(D, 7), span: [{ start: own(D, 4), width: '3' }] } }),
  ];
  read(D, 'abcdefghi');
  const { ops } = boot((frame, n) => HELD(10 + n, 'behind'), () => rows);
  await flush();
  assert.deepEqual([shown(D), WRITE.reopened(D).map((l) => l.row.held), WRITE.unapplied(D), WRITE.keptOf(D)], ['abc heldghi', [1, 2], [], YET('unreachable')], 'the held insert and the held removal applied in order: the text the person left');
  const name = WRITE.nameOf(D, 1);
  assert.deepEqual([name?.width, REC.identityIn(WRITE.baseOf(D).image, 4, 5)], [5, [{ prefix: REC.pageSpace(D), ordinal: name?.page, width: 5 }]], 'the held words named by the page\'s own ordinals, as its own typing is');
  WRITE.addEdit(D, { pos: 9, width: 0, text: '!' });
  rows = [...rows, ROW(11, D, ops[0].frame, { cause: 'behind', anchors: ops[0].anchors })];
  await flush();
  assert.deepEqual([ops[0].frame.at, ops[0].anchors, shown(D), WRITE.reopened(D).map((l) => l.row.held), WRITE.heldOf(D).map((r) => r.held)], [at(9), { before: { burst: 'page:old.1', offset: 4 }, after: own(D, 7) }, 'abc held!ghi', [1, 2], [1, 2, 11]],
    'typed after the held words: sent behind them, its neighbour named by the piece of the earlier launch\'s insert; this window\'s line is set among the draft\'s lines and applied once, in its edits');
  rows = [...rows, ROW(12, D, { op: 'delete', doc: D, p: at(400), width: '2', as_of: 7, id: 'x' }, { cause: 'behind' }), ROW(13, D, { op: 'insert', doc: D, at: at(1), values: ['z'], as_of: 7, id: 'y' }, { cause: 'behind' })];
  REC.setSession(/** @type {any} */ ({ ...S, session: 's-2' }));
  await flush();
  assert.deepEqual([shown(D), WRITE.unapplied(D).map((r) => r.held)], ['abc held!ghi', [12, 13]], 'a line the text cannot take stops the apply: it and the line after it held apart, the text as it stood');
  const moved = { kind: 'refused', name: 'arrangement_moved', status: 200, code: 'arrangement_moved', detail: null, op: 'insert', site: { as_of: 7, current: 9 }, body: null };
  rows = [ROW(1, D, /** @type {any} */ (rows[0]).frame, { cause: 'moved', refusal: moved, hands: [{ key: 'unread' }] })];
  REC.setSession(/** @type {any} */ ({ ...S, session: 's-3' }));
  await flush();
  assert.deepEqual([WRITE.heldOf(D)[0].hands, WRITE.keptOf(D)], [[{ key: 'unread', fingerprint: null, label: null }], YET('moved')], 'a moved document at the reopen: its hands not read yet');
  rows = [{ .../** @type {any} */ (rows[0]), hands: [{ key: 'own', fingerprint: 'fp-1' }] }];
  REC.setSession(/** @type {any} */ ({ ...S, session: 's-4' }));
  await flush();
  assert.deepEqual(WRITE.heldOf(D)[0].hands, [{ key: 'own', fingerprint: 'fp-1', label: null }], 'named once the session\'s read answers');
});

test('BM-25, BM-29: a held line\'s landing with its address mints its bytes — a line of an earlier launch\'s as this window\'s — and its words stand until a read holds them; one that left the list with no position told is read again and set in one step, its bytes minted from the read, the text shown byte for byte the same', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  /** @type {unknown[]} */
  let rows = [ROW(1, D, { op: 'insert', doc: D, at: at(4), values: ['XY'], as_of: 7, id: 'page:old.1' }), ROW(2, D, { op: 'insert', doc: D, at: at(6), values: ['Z'], as_of: 7, id: 'page:old.2' }, { cause: 'behind' })];
  read(D, 'abcdef');
  const { fake } = boot(() => ACK(20), () => rows);
  await flush();
  const before = shown(D), n1 = WRITE.nameOf(D, 1), n2 = WRITE.nameOf(D, 2);
  assert.equal(before, 'abcXYZdef');
  rows = [rows[1]];
  fake.fire('held', EVENT(D, 'sending', 1, { landed: [{ held: 1, burst: 'page:old.1', at: 30, addr: own(D, 60) }] }));
  await flush();
  assert.deepEqual([REC.mintedOf(D).map((m) => [m.page, m.width, m.ordinal, m.at]), shown(D), WRITE.reopened(D).map((l) => [l.row.held, l.at]), MACHINE.typedOf(D)], [[[n1?.page, 2, 60, 30]], before, [[1, 30], [2, null]], 30],
    'landed with its address: minted from it, applied still, the text shown the same');
  REC.setAgain(D, { text: { runs: [{ pos: 1, width: 8, kind: 'content', text: 'abcXYdef', ref: null, origin: null }], asOf: 30 }, image: { from: 1, runs: [{ iStart: own(D, 1), width: 3 }, { iStart: own(D, 60), width: 2 }, { iStart: own(D, 4), width: 3 }] }, spans: [{ subspace: 1, ordinal: 1, positions: 8 }] });
  assert.deepEqual([shown(D), WRITE.reopened(D).map((l) => l.row.held)], [before, [2]], 'the read that holds it: the line leaves as the text is set, the text shown the same');
  rows = [];
  fake.fire('held', EVENT(D, 'kept', 0));
  await flush();
  assert.deepEqual([WRITE.reopened(D).map((l) => [l.row.held, l.at]), shown(D), WRITE.keptOf(D)?.word, REC.pageIds(D, /** @type {number} */ (n2?.page), 1)[0].prefix], [[[2, 0]], before, 'kept', REC.pageSpace(D)],
    'gone from the list with no landing told: kept, applied until the read, its byte the page\'s own still');
  REC.setAgain(D, { text: { runs: [{ pos: 1, width: 9, kind: 'content', text: 'abcXYZdef', ref: null, origin: null }], asOf: 33 }, image: { from: 1, runs: [{ iStart: own(D, 1), width: 3 }, { iStart: own(D, 60), width: 2 }, { iStart: own(D, 70), width: 1 }, { iStart: own(D, 4), width: 3 }] }, spans: [{ subspace: 1, ordinal: 1, positions: 9 }] });
  assert.deepEqual([shown(D), WRITE.reopened(D), REC.pageIds(D, /** @type {number} */ (n2?.page), 1)], [before, [], [{ prefix: D + '.0.1', ordinal: 70, width: 1 }]], 'set from the read in one step: the text shown the same, the byte named by the address the read gives it');
});

test('BM-10, BM-16, BM-17, BM-27: each act at a held line sends exactly one `resolve` with the line\'s ordinal and its act, then reads the lines again — a refused run\'s discard dropping its words and sending afresh what was held behind it; a moved document\'s discard, from its first moved line, dropping every later line with it and naming the lines that may have landed; a hand-over\'s discard answering kept, dropped, or unread with nothing dropped', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  /** @type {unknown[]} */
  let rows = [];
  /** @type {unknown} */
  let answer = { result: {} };
  const { ops, names, resolves } = boot((frame, n) => (n <= 2 ? HELD(n, n === 1 ? 'out_of_bounds' : 'behind') : MINTED(own(D, 80), 40)), () => rows, () => answer);
  read(D, 'abc');
  const refusal = (/** @type {string} */ name) => ({ kind: 'refused', name, status: 200, code: name, detail: null, op: 'insert', site: {}, body: null });
  WRITE.addEdit(D, { pos: 4, width: 0, text: 'd.' });
  rows = [ROW(1, D, ops[0].frame, { cause: 'out_of_bounds', sent: true, refusal: refusal('out_of_bounds') })];
  await flush();
  WRITE.addEdit(D, { pos: 1, width: 0, text: 'x.' });
  rows = [rows[0], ROW(2, D, ops[1].frame, { cause: 'behind' })];
  await flush();
  assert.deepEqual([WRITE.keptOf(D), shown(D), ops.length], [NOT('out_of_bounds'), 'x.abcd.', 2], 'a refused run, a burst held behind it');
  let at0 = names.length;
  assert.deepEqual([await MACHINE.send(D, 1), resolves, names.slice(at0)], [{ sent: true, refused: null }, [{ session: 's-1', held: 1, act: 'send' }], ['resolve', 'held']], '"send again": one `resolve(send)` of the line, then the lines read again');
  at0 = names.length; rows = [];
  const dropped = await MACHINE.drop(D, 1);
  await flush();
  assert.deepEqual([dropped, resolves.slice(1), names.slice(at0, at0 + 2)], [{ dropped: true, kept: false, mayHaveLanded: [], unread: null, refused: null }, [{ session: 's-1', held: 1, act: 'drop' }], ['resolve', 'held']], '"discard this change": one `resolve(drop)` of the run\'s line, then the lines read again');
  assert.deepEqual([shown(D), ops.length, ops[2].frame.values, ops[2].frame.at, WRITE.keptOf(D)?.word], ['x.abc', 3, ['x.'], at(1), 'kept'], 'the run\'s words leave the text shown; the burst the shell dropped behind it is composed afresh by the page and sent');
  // a moved document: the discard from its first moved line takes every later line
  const moved = { ...refusal('arrangement_moved'), site: { as_of: 7, current: 9 } };
  rows = [ROW(4, E, { op: 'insert', doc: E, at: at(1), values: ['m'], as_of: 7, id: 'o.1' }, { cause: 'moved', sent: true, refusal: moved, sendable: false }), ROW(5, E, { op: 'insert', doc: E, at: at(2), values: ['n'], as_of: 7, id: 'o.2' }, { cause: 'moved' })];
  read(E, 'abc');
  REC.setSession(/** @type {any} */ ({ ...S, session: 's-2' }));
  await flush();
  assert.deepEqual([shown(E), WRITE.keptOf(E)], ['mnabc', YET('moved')]);
  answer = { result: { may_have_landed: [4] } }; rows = [];
  const gone = await MACHINE.drop(E, 4);
  assert.deepEqual([gone, resolves[resolves.length - 1], shown(E), WRITE.heldOf(E), WRITE.keptOf(E)?.word], [{ dropped: true, kept: false, mayHaveLanded: [4], unread: null, refused: null }, { session: 's-2', held: 4, act: 'drop' }, 'abc', [], 'kept'],
    'the first moved line dropped with every later line: the held text gone from the text shown, the line that may have landed named');
  // the hand-over: the discard reads for the line's landing first
  const lost = { kind: 'shell', name: 'answers_lost', last: 'unreachable', elapsed_ms: 120480 };
  const handed = [ROW(6, E, { op: 'insert', doc: E, at: at(1), values: ['h'], as_of: 7, id: 'o.3' }, { cause: 'answers_lost', sent: true, refusal: lost })];
  rows = handed;
  REC.setSession(/** @type {any} */ ({ ...S, session: 's-3' }));
  await flush();
  assert.deepEqual([shown(E), WRITE.keptOf(E)], ['habc', NOT('answers_lost')]);
  answer = { refused: { kind: 'shell', name: 'landing_unread', held: 6, why: 'unanswered' } };
  assert.deepEqual([await MACHINE.drop(E, 6), shown(E), WRITE.heldOf(E).map((r) => r.held)], [{ dropped: false, kept: false, mayHaveLanded: [], unread: 'unanswered', refused: 'landing_unread' }, 'habc', [6]], 'the read unanswered: nothing dropped, the line and its words standing');
  answer = { result: { kept: true } }; rows = [];
  assert.deepEqual([await MACHINE.drop(E, 6), shown(E), WRITE.keptOf(E)?.word], [{ dropped: false, kept: true, mayHaveLanded: [], unread: null, refused: null }, 'habc', 'kept'], 'a landing found: the line kept, its words standing, the word "kept"');
  rows = handed; REC.setSession(/** @type {any} */ ({ ...S, session: 's-4' })); await flush();
  answer = { result: {} }; rows = [];
  assert.deepEqual([(await MACHINE.drop(E, 6)).dropped, shown(E)], [true, 'abc'], 'none found: the line dropped, its words gone');
  assert.deepEqual(resolves.slice(-3).map((r) => [r.held, r.act]), [[6, 'drop'], [6, 'drop'], [6, 'drop']], 'each press one `resolve`');
});

test('BM-20, BM-30, BM-58, BM-60: each reason a board\'s drafts cannot be written for is set and lifted by the machine, and nothing is added or sent while one stands — a session that may not write, another window at the open and at the event\'s edges, the held file\'s halt at the read; at the held store\'s bound the refused burst waits as an island, and the machine sends it again itself as the store drains', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  /** @type {unknown} */
  let rows = [];
  let full = true;
  const { fake, ops } = boot((frame, n) => (full ? { refused: { kind: 'shell', name: 'held_full' } } : MINTED(own(D, 50 + n), 20 + n)), () => rows);
  read(D, 'abc');
  await flush();
  assert.equal(WRITE.unwritable(D), null, 'a signed session with the store its own: writable');
  REC.setSession(/** @type {any} */ ({ ...S, session: 's-2', writes: false }));
  assert.deepEqual(WRITE.unwritable(D), { why: 'keyless', detail: null }, 'the session may not write');
  WRITE.addEdit(D, { pos: 1, width: 0, text: 'x' });
  assert.deepEqual([WRITE.edits(D), ops], [[], []], 'no edit is added and nothing sent while it stands');
  REC.setSession(/** @type {any} */ ({ ...S, session: 's-3', another_window: true }));
  assert.deepEqual(WRITE.unwritable(D), { why: 'another_window', detail: null }, 'another shell holds the held store as the session opens');
  fake.fire('another-window', { board: 'b-1', another_window: false });
  assert.equal(WRITE.unwritable(D), null, 'lifted at the event\'s edge');
  fake.fire('another-window', { board: 'b-1', another_window: true });
  assert.equal(WRITE.unwritable(D)?.why, 'another_window', 'and set again at the next');
  fake.fire('another-window', { board: 'b-1', another_window: false });
  rows = { refused: { kind: 'shell', name: 'store_halted', why: 'damaged' } };
  REC.setSession(/** @type {any} */ ({ ...S, session: 's-4' }));
  await flush();
  assert.deepEqual(WRITE.unwritable(D), { why: 'store_halted', detail: 'damaged' }, 'the held file halts the board, as the lines\' read is refused');
  rows = [ROW(1, E), ROW(2, E, { op: 'insert', doc: E }, { cause: 'behind' })];
  REC.setSession(/** @type {any} */ ({ ...S, session: 's-5' }));
  await flush();
  assert.equal(WRITE.unwritable(D), null, 'lifted as the read answers');
  WRITE.addEdit(D, { pos: 4, width: 0, text: 'd.' });
  await flush();
  assert.deepEqual([WRITE.unwritable(D), WRITE.keptOf(D), WRITE.islandsOf(D).map((i) => i.name), shown(D), ops.length], [{ why: 'held_full', detail: null }, NOT('held_full'), ['held_full'], 'abcd.', 1], 'the held store\'s bound: the refused burst waits, its words standing, the board\'s drafts read-only');
  WRITE.addEdit(D, { pos: 1, width: 0, text: 'y.' });
  await flush();
  assert.deepEqual([WRITE.edits(D).length, ops.length], [1, 1], 'nothing typed, nothing sent while the bound stands');
  full = false; rows = [ROW(2, E, { op: 'insert', doc: E }, { cause: 'behind' })];
  fake.fire('held', EVENT(E, 'sending', 1, { landed: [{ held: 1, at: 30 }] }));
  await flush();
  assert.deepEqual([ops.length, ops[1].frame.values, WRITE.unwritable(D), WRITE.islandsOf(D), WRITE.keptOf(D), shown(D)], [2, ['d.'], null, [], { word: 'kept', reason: null }, 'abcd.'], 'the store drains: the machine sends the waiting change itself, in its turn; acked, the island and the reason are gone');
});

test('BM-21: the device\'s refusal of a held line keeps the run\'s words and reads "not kept" with the device\'s cause, each class as the row carries it; later bursts are sent as usual; and the event after the shell\'s retry lifts it', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  /** @type {unknown[]} */
  let rows = [];
  const { fake, ops } = boot((frame, n) => ({ result: { resp: 'held', held: n, cause: n === 1 ? 'unreachable' : 'behind', unwritable: 'No space left on device (os error 28)', unwritable_class: 'full' } }), () => rows);
  read(D, 'abc');
  WRITE.addEdit(D, { pos: 4, width: 0, text: 'd.' });
  for (const cls of ['full', 'read_only', 'other']) {
    rows = [ROW(1, D, ops[0].frame, { unwritable: 'refused by the device', unwritable_class: cls })];
    fake.fire('held', EVENT(D, 'holding', 1, { cause: 'unreachable', unwritable: 'refused by the device', unwritable_class: cls }));
    await flush();
    assert.deepEqual([WRITE.keptOf(D), WRITE.heldOf(D)[0].unwritableClass, shown(D)], [NOT('unwritable'), cls, 'abcd.'], `the class \`${cls}\`: the run's words kept, "not kept" by the device's refusal`);
  }
  WRITE.addEdit(D, { pos: 1, width: 0, text: 'x.' });
  rows = [...rows, ROW(2, D, ops[1].frame, { cause: 'behind', unwritable: 'refused by the device', unwritable_class: 'other' })];
  await flush();
  assert.deepEqual([ops.length, ops[1].frame.values], [2, ['x.']], 'a later burst is sent as usual: the shell holds it behind');
  rows = rows.map((r) => { const { unwritable, unwritable_class: cls, ...rest } = /** @type {any} */ (r); void unwritable; void cls; return rest; });
  fake.fire('held', EVENT(D, 'holding', 2, { cause: 'unreachable' }));
  await flush();
  assert.deepEqual([WRITE.keptOf(D), WRITE.heldOf(D).map((r) => r.unwritable)], [YET('unreachable'), [null, null]], 'the retry wrote the lines: the event lifts it, the hold standing');
});

test('#448: a session\'s ending keeps a draft holding words the board has not kept — its record as read, its edits, its held lines and its word, "not kept" by the ending, the board\'s drafts read-only — and covers a draft holding none, as every document it can no longer read', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  /** @type {unknown[]} */
  let rows = [];
  const { ops } = boot((frame) => (frame.doc === D ? HELD(1) : MINTED(own(E, 50), 21)), () => rows);
  REC.takeIndex(/** @type {any} */ ({ docs: [{ doc: D, kind: 'draft', label: 'abc', standing: 'yours_to_read' }, { doc: E, kind: 'draft', label: 'abc', standing: 'yours_to_read' }], counts: [{ account: '1.0.1', documents: 2 }], state: { arm: 'complete' } }));
  read(D, 'abc'); read(E, 'abc');
  WRITE.addEdit(D, { pos: 4, width: 0, text: 'd.' });
  rows = [ROW(1, D, ops[0].frame)];
  WRITE.addEdit(E, { pos: 4, width: 0, text: 'e.' });
  await flush();
  assert.deepEqual([WRITE.keptOf(D)?.word, WRITE.keptOf(E)?.word], ['not yet kept', 'kept']);
  REC.sessionDied({ arm: 'retired', fingerprint: 'fp-1', own: false }, [D, E]);
  await flush();
  assert.deepEqual([REC.covered(D), REC.doc(D).refused, REC.doc(D).from, REC.doc(D).kind, shown(D), WRITE.heldOf(D).map((r) => r.held), WRITE.keptOf(D), WRITE.unwritable(D)],
    [false, null, 1, 'draft', 'abcd.', [1], { word: 'not kept', reason: null, cause: { token: 'death', arm: 'retired' } }, { why: 'death', detail: 'retired' }],
    'the draft holding a held line: not covered, its delivered text, its edit and its line standing, its word "not kept" by the ending, and nothing more written there');
  assert.deepEqual([REC.covered(E), REC.doc(E).refused, REC.doc(E).from, WRITE.keptOf(E), WRITE.heldOf(E)], [true, 'withheld', -1, null, []], 'the draft holding none: covered as a guest meets it, as today');
  WRITE.addEdit(D, { pos: 1, width: 0, text: 'x' });
  assert.equal(shown(D), 'abcd.', 'read-only: a key adds nothing');
});

test('BM-25, BM-29: a line the shell kept while the event stream stood dropped, its `held` event never carried, is read as kept once the stream reopens — the held lines read again, the line gone from them landed, the word "kept" and the model told the draft holds no dialed word the board has not acked; with the machine out, or no session standing, a reopen reads nothing', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  /** @type {unknown[]} */
  let rows = [];
  const { fake, ops, names } = boot(() => HELD(1), () => rows);
  read(D, 'abc');
  WRITE.addEdit(D, { pos: 4, width: 0, text: 'd.' });
  rows = [ROW(1, D, ops[0].frame)];
  await flush();
  assert.deepEqual([WRITE.keptOf(D), WRITE.heldOf(D).map((r) => r.held), REC.writing(D)], [YET('unreachable'), [1], true], 'held: "not yet kept", the model told the draft holds dialed words the board has not acked');
  const before = names.length;
  fake.drop();
  rows = [];
  await flush();
  assert.deepEqual([names.slice(before), WRITE.keptOf(D)?.word], [[], 'not yet kept'], 'the stream dropped, the line kept meanwhile: nothing read, nothing said');
  fake.reopen();
  await flush();
  assert.deepEqual([names.slice(before), WRITE.heldOf(D), WRITE.keptOf(D), REC.writing(D), WRITE.inFlight(D)], [['held'], [], { word: 'kept', reason: null }, false, false], 'reopened: the held lines read again, the line gone from them landed and the word "kept"');
  const seen = names.length;
  MACHINE.takeOut();
  fake.drop(); fake.reopen();
  MACHINE.handIn();
  const opened = names.length;
  REC.setSession(null);
  fake.drop(); fake.reopen();
  await flush();
  assert.deepEqual([names.slice(seen, opened), names.slice(opened)], [['held'], []], 'the machine out: the reopen reads nothing, the hand-in its own read; no session standing: nothing read');
});

// the last test of the file: it starts the pump, which reads for every test after it
// ---- undo and redo (D6 BM-31 … BM-34, BM-45, BM-46, BM-81, BM-11, BM-12) -------------------------------------------------------

test('BM-31: a step is a run of typing — a pause, punctuation, a commit, an ack and the save chord\'s commit end none; the caret\'s move by another act (a click, an arrow, Esc, a selection: W-WRITE\'s `endRun`) ends it, and so does an act that is a step of its own; a write no person made is no step', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const { ops } = boot((frame, n) => (frame.op === 'insert' ? MINTED(own(D, 100 * n), 19 + n) : ACK(19 + n)));
  read(D, 'abc');
  type(D, 4, 'de');
  assert.deepEqual(stacks(D), { undo: [['typing', true, 2]], redo: [] }, 'two keys at one caret: one step, its run open');
  t.mock.timers.tick(MACHINE.PAUSE_MS);
  await flush();
  assert.deepEqual([ops.length, WRITE.keptOf(D)?.word], [1, 'kept'], 'the pause committed the burst and its ack landed');
  type(D, 6, 'f.');
  await flush();
  WRITE.commit(D);
  type(D, 8, 'g');
  assert.deepEqual([ops.length, stacks(D).undo], [2, [['typing', true, 5]]], 'a pause, a commit, an ack, punctuation and the save chord\'s commit: the same run still, one step of five keys across three bursts');
  WRITE.endRun(D);
  assert.deepEqual(stacks(D).undo, [['typing', false, 5]], 'the caret moved by another act: the run ended');
  type(D, 9, 'h');
  assert.deepEqual(stacks(D).undo, [['typing', false, 5], ['typing', true, 1]], 'the next key begins a new step');
  WRITE.addEdits(D, [{ pos: 1, width: 1, text: '' }]);
  type(D, 9, 'i');
  assert.deepEqual(stacks(D).undo, [['typing', false, 5], ['typing', false, 1], ['put-back', false, 1], ['typing', true, 1]], 'an act that is a step of its own ends the run before it and is no part of the one after');
  // another hand's write, as a read delivers it: a byte set before the draft's first — no step of anyone's stack
  const before = stacks(D);
  REC.takeSpanSet(D, [{ subspace: 1, ordinal: 1, positions: 4 }]);
  REC.takeDelivery(D, [{ pos: 1, width: 4, kind: 'content', text: 'Zabc', ref: null, origin: null }], 40, { from: 1, runs: [{ iStart: own(D, 900), width: 1 }, { iStart: own(D, 1), width: 3 }] });
  assert.deepEqual([stacks(D), shown(D).startsWith('Z')], [before, true], 'a write no person made at this page changes the text and adds no step');
});

test('BM-1, BM-2: an undo of a run no burst has carried drops it on the page — its edits leave the draft\'s, nothing is sent, no deletion face is raised and the text is as before the run; the redo brings the words back under their own page identity, unsent, sent at the next commit; and a new step empties the redo stack', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const { ops } = boot((frame, n) => MINTED(own(D, 100 * n), 19 + n));
  read(D, 'abc');
  type(D, 4, 'xyz');
  const pages = WRITE.edits(D).map((e) => e.page);
  assert.deepEqual([MACHINE.undo(D), shown(D), WRITE.edits(D), stacks(D), WRITE.removalsOf(D)], [{ how: 'done', at: 4, out: 'xyz', back: '' }, 'abc', [], { undo: [], redo: [['typing', false, 3]] }, []],
    'the run taken back whole at the press: its edits gone from the draft\'s, the caret where it began, the step on the redo stack, no removal faced');
  t.mock.timers.tick(MACHINE.PAUSE_MS * 3);
  await flush();
  assert.deepEqual([ops, WRITE.inFlight(D)], [[], false], 'nothing sent, at the press or at any pause after it, and no burst open');
  assert.deepEqual(MACHINE.undo(D), { how: 'empty', at: null, out: '', back: '' }, 'the stack empty: the press answers so');
  assert.deepEqual([MACHINE.redo(D), shown(D), WRITE.edits(D).map((e) => [e.page, e.text, e.sent ?? null]), stacks(D)], [{ how: 'done', at: 7, out: '', back: 'xyz' }, 'abcxyz', [[pages[0], 'xyz', null]], { undo: [['typing', false, 3]], redo: [] }],
    'the redo: the words back under the ordinals they had, unsent, the caret after them, the step on the undo stack closed');
  assert.deepEqual(ops, [], 'the redo is no commit point');
  t.mock.timers.tick(MACHINE.PAUSE_MS);
  assert.deepEqual(ops.map((o) => [o.frame.op, o.frame.values]), [['insert', ['xyz']]], 'and they are sent at the next commit like any typing');
  await flush();
  assert.equal(REC.pageIds(D, /** @type {number} */ (pages[0]), 3)[0].prefix, `${D}.0.1`, 'their ack minting the same bytes');
  MACHINE.undo(D);
  assert.equal(stacks(D).redo.length, 1);
  type(D, 4, 'q');
  assert.deepEqual(stacks(D), { undo: [['typing', true, 1]], redo: [] }, 'a new step empties the redo stack');
});

test('BM-80, BM-32, BM-34: a key over a selection begins a run; an undo of a run split across an acked burst and the open burst drops the open part on the page and sends one `delete` of the acked bytes and one `reinstate` of what the run removed, by identity — one step; the redo reinstates the words\' own bytes and inserts none', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const { ops } = boot((frame, n) => (frame.op === 'insert' ? MINTED(own(D, 100 * n), 19 + n) : ACK(19 + n)));
  read(D, 'abcdef');
  type(D, 7, 'g');
  WRITE.endRun(D);
  WRITE.addEdit(D, { pos: 3, width: 2, text: 'X' }, { at: 5 });
  type(D, 4, 'Y');
  assert.deepEqual(stacks(D).undo, [['typing', false, 1], ['typing', true, 2]], 'the key over the selection began a run, which the next key joined');
  t.mock.timers.tick(MACHINE.PAUSE_MS);
  await flush(); await flush();
  assert.deepEqual([ops.map((o) => o.frame.op), shown(D)], [['delete', 'insert', 'insert'], 'abXYefg'], 'the burst acked: the selection\'s delete and the two keys\' insert, then the earlier run\'s');
  type(D, 5, 'Z');
  const sent = ops.length;
  assert.deepEqual([MACHINE.undo(D), shown(D), stacks(D)], [{ how: 'done', at: 5, out: 'XYZ', back: 'cd' }, 'abcdefg', { undo: [['typing', false, 1]], redo: [['typing', false, 3]] }],
    'one press takes the whole run back: the unsent key dropped, the acked words out, the selection\'s words back, the caret where the run began');
  assert.equal(ops.length, sent, 'the chord is no commit point');
  t.mock.timers.tick(MACHINE.PAUSE_MS);
  await flush(); await flush();
  assert.deepEqual(ops.slice(sent).map((o) => [o.frame, o.anchors]), [
    [{ op: 'delete', doc: D, p: at(3), width: '2', as_of: 22, id: id(4) }, { before: own(D, 2), after: own(D, 5), span: [{ start: own(D, 200), width: '2' }] }],
    [{ op: 'reinstate', doc: D, at: at(3), runs: [{ i_start: own(D, 3), origin: D, width: '2' }], as_of: 23, id: id(5) }, { before: own(D, 2), after: own(D, 5) }],
  ], 'one `delete` of the bytes the board minted for the run, one `reinstate` of the bytes it removed, by their own I-runs: no `insert`, and nothing of the key no burst carried');
  const before = ops.length;
  assert.deepEqual([MACHINE.redo(D), shown(D)], [{ how: 'done', at: 6, out: 'cd', back: 'XYZ' }, 'abXYZefg'], 'the redo puts the run back exactly as it was, the key no burst had carried with it, the caret after its words');
  t.mock.timers.tick(MACHINE.PAUSE_MS);
  await flush(); await flush(); await flush();
  assert.deepEqual(ops.slice(before).map((o) => [o.frame.op, o.frame.runs ?? o.frame.values ?? o.frame.width]), [['delete', '2'], ['reinstate', [{ i_start: own(D, 200), origin: D, width: '2' }]], ['insert', ['Z']]],
    'the redo: what the run removed removed again; the words the board holds back by a `reinstate` of their own bytes, never an insert of new ones; and the key never minted sent as the typing it is');
});

test('BM-32: what an undo takes back is the run\'s net change — a word typed and backspaced inside the run is nothing to take back, a run of Backspace over kept text is put back as one stretch, and a step with nothing left to take back leaves the stack unsaid', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const { ops } = boot((frame, n) => (frame.op === 'insert' ? MINTED(own(D, 100 * n), 19 + n) : ACK(19 + n)));
  read(D, 'abcdef');
  type(D, 7, 'gh');
  WRITE.endRun(D);
  // a run: two Backspaces over kept text, a word typed, one of its letters backspaced
  backspace(D, 5); backspace(D, 4);
  type(D, 3, 'XY');
  backspace(D, 5);
  assert.deepEqual([shown(D), WRITE.undoOf(D)[1].took.map((x) => REC.textOf(x.took.runs, 1, 3))], ['abXefgh', ['cd']], 'the two Backspaces are one stretch the step removed; the letter it typed and took out is none of it');
  t.mock.timers.tick(MACHINE.PAUSE_MS);
  await flush(); await flush();
  const sent = ops.length;
  assert.deepEqual([MACHINE.undo(D), shown(D)], [{ how: 'done', at: 5, out: 'X', back: 'cd' }, 'abcdefgh'], 'the net change taken back: the letter that stands out, the two bytes back in their order, the caret where the run began');
  t.mock.timers.tick(MACHINE.PAUSE_MS);
  await flush(); await flush();
  assert.deepEqual(ops.slice(sent).map((o) => [o.frame.op, o.frame.width ?? o.frame.runs]), [['delete', '1'], ['reinstate', [{ i_start: own(D, 3), origin: D, width: '2' }]]], 'one `delete` of the one letter the board holds, one `reinstate` of the stretch');
  // a run that nets to nothing
  WRITE.endRun(D);
  type(D, 9, 'q'); backspace(D, 10);
  assert.deepEqual([stacks(D).undo.length, MACHINE.undo(D).out, shown(D), stacks(D).undo], [2, 'gh', 'abcdef', []], 'a step with nothing left to take back leaves the stack unsaid: the press goes on to the step before it');
});

test('BM-42: where the page holds a long draft in part and none of the text a kept step stands in, an undo changes nothing — the step never taken for one with nothing left, the stack as it stood — and answers where the step began, so its place is read first; held again, the step is taken back', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const { ops } = boot((frame, n) => MINTED(own(D, 100 * n), 19 + n));
  /** a stretch of the draft as a read delivers it — the draft twenty-two positions long — each run of it by its first address */
  const window = (/** @type {number} */ pos, /** @type {string} */ text, /** @type {Array<[number, number]>} */ stretches, asOf = 30) => {
    REC.takeSpanSet(D, [{ subspace: 1, ordinal: 1, positions: 22 }]);
    REC.takeDelivery(D, [{ pos, width: byteLength(text), kind: 'content', text, ref: null, origin: null }], asOf, { from: pos, runs: stretches.map(([first, width]) => ({ iStart: own(D, first), width })) });
  };
  REC.takeSpanSet(D, [{ subspace: 1, ordinal: 1, positions: 20 }]);
  REC.takeDelivery(D, [{ pos: 1, width: 6, kind: 'content', text: 'abcdef', ref: null, origin: null }], 7, { from: 1, runs: [{ iStart: own(D, 1), width: 6 }] });
  type(D, 3, 'XY');
  WRITE.endRun(D);
  t.mock.timers.tick(MACHINE.PAUSE_MS);
  await flush(); await flush();
  window(1, 'abXYcdef', [[1, 2], [100, 2], [3, 4]]);
  assert.deepEqual([ops.length, WRITE.edits(D), stacks(D).undo], [1, [], [['typing', false, 2]]], 'a run typed in the stretch held, kept, and read back: no edit of it on the page');
  // the view moves on: the text the run stands in leaves the model, another stretch of the draft held
  REC.invalidate(D);
  window(14, 'lmnopq', [[12, 6]]);
  assert.deepEqual([MACHINE.undo(D), stacks(D), WRITE.edits(D)], [{ how: 'away', at: 3, out: '', back: '' }, { undo: [['typing', false, 2]], redo: [] }, []],
    'none of the step\'s text is held: nothing changed, the step still on the stack — never taken for one with nothing left — and the answer says where it began');
  window(1, 'abXYcdef', [[1, 2], [100, 2], [3, 4]]);
  assert.deepEqual([MACHINE.undo(D).how, shown(D).slice(0, 6), stacks(D)], ['done', 'abcdef', { undo: [], redo: [['typing', false, 2]] }], 'its text held again: the step taken back');
});

test('BM-34: an undo of a run whose burst is in flight takes it back on the page at once and sends its inverse only after the ack, which mints the bytes the `delete` names; a refusal answered after the press is dropped with the words, no island kept and no face raised (BM-45)', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const first = later(), third = later();
  const { ops } = boot((frame, n) => (n === 1 ? first.out : n === 3 ? third.out : frame.op === 'insert' ? MINTED(own(D, 100 * n), 19 + n) : ACK(19 + n)));
  read(D, 'abc');
  type(D, 4, 'xy');
  t.mock.timers.tick(MACHINE.PAUSE_MS);
  await flush();
  assert.equal(ops.length, 1, 'the burst out, its answer not in');
  assert.deepEqual([MACHINE.undo(D), shown(D), WRITE.removalsOf(D).map((r) => r.words)], [{ how: 'done', at: 4, out: 'xy', back: '' }, 'abc', ['xy']], 'taken back at the press, and the deletion face decided there: a dial carried the words');
  t.mock.timers.tick(MACHINE.PAUSE_MS * 3);
  await flush();
  assert.equal(ops.length, 1, 'nothing more dialed while the answer is out, however many pauses pass');
  first.give(MINTED(own(D, 50), 20));
  await flush(); await flush();
  assert.deepEqual(ops.slice(1).map((o) => [o.frame, o.anchors]), [[{ op: 'delete', doc: D, p: at(4), width: '2', as_of: 20, id: id(2) }, { before: own(D, 3), after: null, span: [{ start: own(D, 50), width: '2' }] }]],
    'acked: the inverse goes, a `delete` of the bytes the ack minted');
  await flush();
  assert.deepEqual([shown(D), WRITE.keptOf(D)?.word, WRITE.removalsOf(D).length], ['abc', 'kept', 1], 'and the removal is faced once: not again as its `delete` is composed');
  // a refusal answered after the press
  WRITE.endRun(D);
  type(D, 4, 'q');
  t.mock.timers.tick(MACHINE.PAUSE_MS);
  await flush();
  MACHINE.undo(D);
  third.give(REFUSED);
  await flush(); await flush();
  t.mock.timers.tick(MACHINE.PAUSE_MS);
  await flush();
  assert.deepEqual([shown(D), WRITE.islandsOf(D), WRITE.keptOf(D)?.word, WRITE.edits(D).filter((e) => e.at == null), ops.length], ['abc', [], 'kept', [], 3],
    'the refusal dropped with the words the person had taken back: no island, the corner "kept", nothing left to send and nothing sent');
});

test('BM-81: an undo of a run whose lines the shell holds sends ONE `resolve(drop)`, of the run\'s oldest held line, then reads the held lines again — an earlier run\'s line never dropped, no inverse composed for words the board never had; a line marked `sent` that the read finds landed is kept and its inverse sent; and where the read cannot run the drop stays owed, the corner "not yet kept" by the line\'s cause, tried again at the next read of the held lines', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  /** @type {unknown[]} */
  let rows = [];
  /** @type {unknown} */
  let answer = { result: {} };
  const { fake, ops, names, resolves } = boot((frame, n) => (n <= 3 ? HELD(n, n === 1 ? 'unreachable' : 'behind') : frame.op === 'insert' ? MINTED(own(D, 100 * n), 19 + n) : ACK(19 + n)), () => rows, () => answer);
  read(D, 'abc');
  type(D, 4, 'x.');
  rows = [ROW(1, D, ops[0].frame, { sent: true })];
  await flush();
  WRITE.endRun(D);
  type(D, 6, 'y.');
  rows = [rows[0], ROW(2, D, ops[1].frame, { cause: 'behind' })];
  await flush();
  type(D, 8, 'z.');
  rows = [rows[0], rows[1], ROW(3, D, ops[2].frame, { cause: 'behind' })];
  await flush();
  assert.deepEqual([shown(D), WRITE.heldOf(D).map((r) => r.held), stacks(D).undo], ['abcx.y.z.', [1, 2, 3], [['typing', false, 2], ['typing', true, 4]]], 'an earlier run with one held line, then a run of two bursts, each held behind it');
  let at0 = names.length;
  rows = [rows[0]];
  assert.deepEqual([MACHINE.undo(D), shown(D)], [{ how: 'done', at: 6, out: 'y.z.', back: '' }, 'abcx.'], 'the run taken back whole on the page at the press');
  await flush(); await flush();
  assert.deepEqual([resolves, names.slice(at0), WRITE.heldOf(D).map((r) => r.held), shown(D), ops.length, WRITE.keptOf(D)], [[{ session: 's-1', held: 2, act: 'drop' }], ['resolve', 'held'], [1], 'abcx.', 3, YET('unreachable')],
    'ONE `resolve(drop)`, of the run\'s oldest held line, then the lines read again: the earlier run\'s line stands, and no inverse was composed');
  t.mock.timers.tick(MACHINE.PAUSE_MS * 2);
  await flush();
  assert.deepEqual([ops.length, WRITE.removalsOf(D)], [3, []], 'nothing sent after it, and no deletion face: no dial of those lines left this device');
  // the earlier run: its line marked `sent`, the shell's read finding it landed — kept, it leaves the shell's list
  answer = { result: { kept: true } };
  at0 = names.length;
  rows = [];
  assert.deepEqual([MACHINE.undo(D).out, shown(D), WRITE.removalsOf(D).map((r) => r.words)], ['x.', 'abc', ['x.']], 'the earlier run taken back: its line was dialed, so the removal is faced at the press');
  await flush(); await flush();
  assert.deepEqual([resolves.slice(1), WRITE.edits(D).filter((e) => e.sent === 1).map((e) => e.at != null), ops.length], [[{ session: 's-1', held: 1, act: 'drop' }], [true, true], 3],
    'the read found the line landed: one `resolve(drop)`, nothing dropped — the line kept, its burst acked — and asked no second time');
  // the next read holds the words the landing placed, at the addresses the board minted them at: the inverse then names them
  REC.takeSpanSet(D, [{ subspace: 1, ordinal: 1, positions: 5 }]);
  REC.takeDelivery(D, [{ pos: 1, width: 5, kind: 'content', text: 'abcx.', ref: null, origin: null }], 30, { from: 1, runs: [{ iStart: own(D, 1), width: 3 }, { iStart: own(D, 70), width: 2 }] });
  t.mock.timers.tick(MACHINE.PAUSE_MS);
  await flush(); await flush();
  assert.deepEqual(ops.slice(3).map((o) => [o.frame.op, o.anchors]), [['delete', { before: own(D, 3), after: null, span: [{ start: own(D, 70), width: '2' }] }]],
    'and its inverse is sent as a kept part\'s is: a `delete` of the bytes the board holds');
  await flush();
  assert.deepEqual([shown(D), WRITE.keptOf(D)?.word], ['abc', 'kept']);
});

test('BM-32, BM-33: once a read holds a run\'s change, its edits gone from the page\'s, the undo still takes back what the run placed and puts back what it removed, by the step\'s own record of their identity — a `delete` and a `reinstate` — and the redo after the next read reinstates the run\'s words by their own bytes, never an insert of new ones', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const { ops } = boot((frame, n) => (frame.op === 'insert' ? MINTED(own(D, 100 * n), 19 + n) : ACK(19 + n)));
  /** the draft as a read delivers it: its text, and the address of each stretch of it */
  const deliver = (/** @type {string} */ text, /** @type {number} */ asOf, /** @type {Array<[number, number]>} */ stretches) => {
    REC.takeSpanSet(D, [{ subspace: 1, ordinal: 1, positions: byteLength(text) }]);
    REC.takeDelivery(D, [{ pos: 1, width: byteLength(text), kind: 'content', text, ref: null, origin: null }], asOf, { from: 1, runs: stretches.map(([first, width]) => ({ iStart: own(D, first), width })) });
  };
  deliver('abcdef', 7, [[1, 6]]);
  WRITE.addEdit(D, { pos: 3, width: 2, text: 'X' }, { at: 5 });
  type(D, 4, 'Y');
  t.mock.timers.tick(MACHINE.PAUSE_MS);
  await flush(); await flush();
  deliver('abXYef', 21, [[1, 2], [200, 2], [5, 2]]);
  assert.deepEqual([WRITE.edits(D), shown(D)], [[], 'abXYef'], 'the read holds the run: no edit of it is left on the page');
  assert.deepEqual([MACHINE.undo(D), shown(D)], [{ how: 'done', at: 5, out: 'XY', back: 'cd' }, 'abcdef'], 'undone from the step\'s own record: its words out, the bytes it removed back');
  t.mock.timers.tick(MACHINE.PAUSE_MS);
  await flush(); await flush();
  assert.deepEqual(ops.slice(2).map((o) => [o.frame.op, o.frame.runs ?? o.anchors.span]), [['delete', [{ start: own(D, 200), width: '2' }]], ['reinstate', [{ i_start: own(D, 3), origin: D, width: '2' }]]],
    'a `delete` of the bytes the board minted and a `reinstate` of the bytes the run removed, by their own I-runs');
  deliver('abcdef', 23, [[1, 6]]);
  assert.deepEqual(WRITE.edits(D).filter((e) => !e.based), [], 'and that inverse read back too');
  assert.deepEqual([MACHINE.redo(D), shown(D)], [{ how: 'done', at: 5, out: 'cd', back: 'XY' }, 'abXYef'], 'the redo, with no edit of the run or of its undo on the page');
  t.mock.timers.tick(MACHINE.PAUSE_MS);
  await flush(); await flush();
  assert.deepEqual(ops.slice(4).map((o) => [o.frame.op, o.frame.runs ?? o.anchors.span]), [['delete', [{ start: own(D, 3), width: '2' }]], ['reinstate', [{ i_start: own(D, 200), origin: D, width: '2' }]]],
    'what the run removed removed again, and its words back by a `reinstate` of the bytes the board minted for them: no `insert`');
});

test('BM-81: a held line marked `sent` while the board is not answering — the drop refused `landing_unread` — leaves the run taken back on the page, the drop owed: nothing is composed of it, the corner keeps "not yet kept" by the line\'s cause, the drop is asked again at the line\'s next `held` event, and the page\'s close leaves its inverse out', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  /** @type {unknown[]} */
  let rows = [];
  /** @type {unknown} */
  let answer = { refused: { kind: 'shell', name: 'landing_unread', held: 1, why: 'unanswered' } };
  const { fake, ops, resolves } = boot(() => HELD(1, 'unreachable'), () => rows, () => answer);
  read(D, 'abc');
  type(D, 4, 'x.');
  rows = [ROW(1, D, ops[0].frame, { sent: true })];
  await flush();
  assert.deepEqual([MACHINE.undo(D).out, shown(D)], ['x.', 'abc'], 'taken back on the page at the press, whatever the shell answers');
  await flush(); await flush();
  assert.deepEqual([resolves.length, WRITE.heldOf(D).map((r) => r.held), WRITE.keptOf(D), shown(D)], [1, [1], YET('unreachable'), 'abc'], 'the drop refused: the line stands held, the corner "not yet kept" by its cause, the text as the person left it');
  type(D, 4, 'q');
  t.mock.timers.tick(MACHINE.PAUSE_MS * 3);
  await flush();
  assert.deepEqual([ops.length, resolves.length, WRITE.inFlight(D)], [1, 1, false], 'while the drop is owed nothing of the draft is dialed — no inverse held behind words the board never had — and the drop is not asked again unbidden; those waiting on the burst are told');
  assert.equal(WRITE.leaving('unload'), true);
  assert.deepEqual(fake.unloaded.map((u) => (u.close.frames || []).map((f) => [/** @type {any} */ (f.frame).op, /** @type {any} */ (f.frame).values, f.anchors])), [[['insert', ['q'], { before: own(D, 3), after: { burst: id(1), offset: 0 } }]]],
    'the close carries the key typed since, placed beside the held words, and nothing of the inverse: the line stays in the shell\'s store');
  MACHINE._reset(); REC._reset(); WRITE._reset();
});

test('BM-81: a drop owed is asked again at the line\'s next `held` event, and settles as any: dropped, the words\' edits leave and the corner reads "kept"', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  /** @type {unknown[]} */
  let rows = [];
  /** @type {unknown} */
  let answer = { refused: { kind: 'shell', name: 'landing_unread', held: 1, why: 'unanswered' } };
  const { fake, ops, resolves } = boot(() => HELD(1, 'unreachable'), () => rows, () => answer);
  read(D, 'abc');
  type(D, 4, 'x.');
  rows = [ROW(1, D, ops[0].frame, { sent: true })];
  await flush();
  MACHINE.undo(D);
  await flush(); await flush();
  assert.deepEqual(resolves.map((r) => [r.held, r.act]), [[1, 'drop']]);
  answer = { result: {} };
  fake.fire('held', EVENT(D, 'holding', 1, { cause: 'unreachable' }));
  rows = [];
  await flush(); await flush(); await flush();
  assert.deepEqual([resolves.map((r) => [r.held, r.act]), WRITE.heldOf(D), shown(D), WRITE.keptOf(D)?.word, WRITE.edits(D).filter((e) => e.at == null), ops.length], [[[1, 'drop'], [1, 'drop']], [], 'abc', 'kept', [], 1],
    'the line\'s next `held` event asks the drop again; dropped, the line and the words\' edits are gone, the corner "kept", nothing sent');
});

test('BM-45: an undo at a run whose line awaits an act of the person\'s — a refused run, the hand-over, a refusal the page keeps, a moved document — composes nothing and is answered at the face; discarded there, the step has nothing left and leaves the stack', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  /** @type {unknown[]} */
  let rows = [];
  const { ops, resolves } = boot((frame, n) => (n === 1 ? HELD(1, 'out_of_bounds') : n === 2 ? REFUSED : n === 3 ? HELD(3, 'moved') : n === 4 ? HELD(4, 'answers_lost') : MINTED(own(frame.doc, 100 * n), 19 + n)), () => rows);
  const untouched = (/** @type {string} */ addr, /** @type {string} */ text) => { const edits = WRITE.edits(addr).length, n = ops.length, r = resolves.length; const out = MACHINE.undo(addr); return [out, shown(addr), WRITE.edits(addr).length === edits, ops.length === n, resolves.length === r, stacks(addr).undo.length]; };
  const FACE = { how: 'face', at: null, out: '', back: '' };
  read(D, 'abc');
  type(D, 4, 'x.');
  rows = [ROW(1, D, ops[0].frame, { cause: 'out_of_bounds', sent: true, refusal: refusal('out_of_bounds') })];
  await flush();
  assert.deepEqual(untouched(D, 'abcx.'), [FACE, 'abcx.', true, true, true, 1], 'a refused run: nothing composed, nothing dropped, the words and the step standing — the press answered at the face');
  read(E, 'abc');
  type(E, 4, 'y.');
  await flush();
  assert.deepEqual([WRITE.islandsOf(E).length, untouched(E, 'abcy.')], [1, [FACE, 'abcy.', true, true, true, 1]], 'a refusal the page keeps: the same');
  const F2 = '1.0.1.0.7', G = '1.0.1.0.9';
  read(F2, 'abc');
  type(F2, 4, 'm.');
  rows = [rows[0], ROW(3, F2, ops[2].frame, { cause: 'moved', sent: true, refusal: { ...refusal('arrangement_moved'), site: { as_of: 7, current: 9 } }, sendable: false })];
  await flush();
  assert.deepEqual(untouched(F2, 'abcm.'), [FACE, 'abcm.', true, true, true, 1], 'a moved document: the same');
  read(G, 'abc');
  type(G, 4, 'h.');
  rows = [...rows, ROW(4, G, ops[3].frame, { cause: 'answers_lost', sent: true, refusal: { kind: 'shell', name: 'answers_lost', last: 'unreachable', elapsed_ms: 120480 } })];
  await flush();
  assert.deepEqual(untouched(G, 'abch.'), [FACE, 'abch.', true, true, true, 1], 'the hand-over: the same');
  // the discard is the face's act: taken there, the step has nothing left to take back
  rows = rows.slice(1);
  assert.equal((await MACHINE.drop(D, 1)).dropped, true);
  assert.deepEqual([shown(D), MACHINE.undo(D), stacks(D)], ['abc', { how: 'empty', at: null, out: '', back: '' }, { undo: [], redo: [] }], 'discarded at its face, the run is gone: the next press finds nothing of it, and the step leaves the stack unsaid');
});

test('BM-45: a held answer that arrives after the press, for a burst of an undone run, is dropped as the undo\'s own act — one `resolve(drop)` — and no face is raised, whatever verdict its line carries; the burst held behind it is composed afresh by the page', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  /** @type {unknown[]} */
  let rows = [];
  const first = later();
  // the shell's list holds the line until the drop takes it
  const { ops, resolves } = boot((frame, n) => (n === 1 ? first.out : MINTED(own(D, 100 * n), 19 + n)), () => rows, () => { rows = []; return { result: {} }; });
  read(D, 'abc');
  type(D, 4, 'x.');
  await flush();
  assert.deepEqual([MACHINE.undo(D).out, shown(D)], ['x.', 'abc'], 'undone while its burst is out');
  type(D, 1, 'q');
  rows = [ROW(1, D, ops[0].frame, { cause: 'out_of_bounds', sent: true, refusal: refusal('out_of_bounds') })];
  first.give(HELD(1, 'out_of_bounds'));
  await flush(); await flush(); await flush();
  assert.deepEqual([resolves, WRITE.heldOf(D), shown(D), WRITE.islandsOf(D)], [[{ session: 's-1', held: 1, act: 'drop' }], [], 'qabc', []], 'held — a refused run — after the press: dropped by the page itself, its words gone, no island');
  t.mock.timers.tick(MACHINE.PAUSE_MS);
  await flush(); await flush();
  assert.deepEqual([ops.slice(1).map((o) => [o.frame.op, o.frame.values, o.frame.at]), WRITE.keptOf(D)?.word], [[['insert', ['q'], at(1)]], 'kept'], 'what was typed since is composed afresh and sent, nothing of the undone run with it; the corner "kept", never "not kept"');
});

test('BM-46: an undo of an earlier, kept step while the document\'s lines are held still composes its inverse, which the shell holds behind them — a hold never makes the chord inert', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  /** @type {unknown[]} */
  let rows = [];
  const { ops, resolves } = boot((frame, n) => (n === 1 ? MINTED(own(D, 50), 20) : HELD(n, n === 2 ? 'unreachable' : 'behind')), () => rows);
  read(D, 'abc');
  type(D, 4, 'x.');
  await flush();
  assert.equal(WRITE.keptOf(D)?.word, 'kept', 'a kept step');
  WRITE.endRun(D);
  type(D, 1, 'y.');
  rows = [ROW(2, D, ops[1].frame)];
  await flush();
  assert.deepEqual([shown(D), WRITE.heldOf(D).map((r) => r.held)], ['y.abcx.', [2]], 'then a run whose line is held');
  // the held run is discarded at its line by the undo; then the earlier, kept one
  rows = [];
  MACHINE.undo(D);
  await flush(); await flush();
  type(D, 1, 'z.');
  rows = [ROW(3, D, ops[2].frame)];
  await flush();
  WRITE.endRun(D);
  const stack = WRITE.undoOf(D);
  WRITE.setStacks(D, [stack[0]], []);
  assert.deepEqual([MACHINE.undo(D).out, shown(D)], ['x.', 'z.abc'], 'the earlier, kept step undone while a line is held');
  t.mock.timers.tick(MACHINE.PAUSE_MS);
  rows = [rows[0], ROW(4, D, ops[3] ? ops[3].frame : {}, { cause: 'behind' })];
  await flush(); await flush();
  assert.deepEqual([ops.slice(3).map((o) => [o.frame.op, o.anchors]), resolves.map((r) => r.held), WRITE.heldOf(D).map((r) => r.held)], [[['delete', { before: own(D, 3), after: null, span: [{ start: own(D, 50), width: '2' }] }]], [2], [3, 4]],
    'its inverse composed and dialed, held behind the line that stands: no line cancelled for it');
});

test('BM-11, BM-12: an undo\'s `reinstate` the board refuses `withheld` is declined — its held line dropped by the page, no refused run standing; the words gone from the text again, nothing written of them; those watching told the origin; and the step leaves the stack at this first reach, no redo meeting it', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  /** @type {unknown[]} */
  let rows = [];
  /** @type {Array<[string, string]>} */
  const told = [];
  WRITE.onDeclined((addr, origin) => { told.push([addr, origin]); });
  const O = '1.0.2.0.5';
  // the shell's list holds a line until a drop takes it
  const { ops, resolves } = boot((frame, n) => (frame.op === 'reinstate' ? (n === 3 ? { refused: refusal('withheld', { addr: O }) } : HELD(9, 'withheld')) : frame.op === 'insert' ? MINTED(own(D, 100 * n), 19 + n) : ACK(19 + n)), () => rows, () => { rows = []; return { result: {} }; });
  read(D, 'abcdef');
  type(D, 7, 'g');
  WRITE.endRun(D);
  backspace(D, 5); backspace(D, 4);
  t.mock.timers.tick(MACHINE.PAUSE_MS);
  await flush(); await flush();
  assert.deepEqual([ops.map((o) => o.frame.op), shown(D)], [['delete', 'insert'], 'abefg'], 'a removal of kept text, kept');
  assert.deepEqual([MACHINE.undo(D), shown(D)], [{ how: 'done', at: 5, out: '', back: 'cd' }, 'abcdefg'], 'the undo puts the words back at the press');
  t.mock.timers.tick(MACHINE.PAUSE_MS);
  await flush(); await flush();
  assert.deepEqual([ops.slice(2).map((o) => o.frame.op), shown(D), WRITE.islandsOf(D), WRITE.keptOf(D)?.word, told.slice(-1), stacks(D)], [['reinstate'], 'abefg', [], 'kept', [[D, O]], { undo: [['typing', false, 1]], redo: [] }],
    'refused `withheld`: the words gone again, no island and no refused run, the corner "kept", the origin told, and the step off both stacks — the next press goes on to the one before');
  assert.deepEqual(MACHINE.redo(D), { how: 'empty', at: null, out: '', back: '' }, 'no redo meets it');
  // held `withheld`: the page drops the line itself
  const E2 = '1.0.1.0.11';
  read(E2, 'abcdef');
  backspace(E2, 5);
  t.mock.timers.tick(MACHINE.PAUSE_MS);
  await flush(); await flush();
  MACHINE.undo(E2);
  t.mock.timers.tick(MACHINE.PAUSE_MS);
  rows = [ROW(9, E2, { op: 'reinstate', doc: E2 }, { cause: 'withheld', sent: true, refusal: refusal('withheld', { addr: O }) })];
  await flush(); await flush(); await flush(); await flush();
  assert.deepEqual([resolves, WRITE.heldOf(E2), shown(E2), told.slice(-1), WRITE.keptOf(E2)?.word, stacks(E2)], [[{ session: 's-1', held: 9, act: 'drop' }], [], 'abcef', [[E2, O]], 'kept', { undo: [], redo: [] }],
    'held `withheld`: one `resolve(drop)` of the line, nothing held behind it, the words gone again, the origin told, the step off the stack');
});

test('BM-73: an undo pending at the page\'s close goes inside the one close — its `frames` after the burst out\'s, a `delete` of that burst\'s words its follower, each piece naming the insert it follows; a `reinstate` beside those words names them by a piece and follows nothing', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const { fake, ops } = boot((frame, n) => (n >= 3 ? later().out : frame.op === 'insert' ? MINTED(own(frame.doc, 100 * n), 19 + n) : ACK(19 + n)));
  read(D, 'abcdef');
  type(D, 4, 'x');
  t.mock.timers.tick(MACHINE.PAUSE_MS);
  await flush();
  WRITE.endRun(D);
  // a run: a key over the selection "ef", then one more key — its burst's delete acked, its insert out
  WRITE.addEdit(D, { pos: 6, width: 2, text: 'X' }, { at: 8 });
  type(D, 7, 'Y');
  t.mock.timers.tick(MACHINE.PAUSE_MS);
  await flush(); await flush();
  assert.deepEqual([ops.map((o) => o.frame.op), shown(D)], [['insert', 'delete', 'insert'], 'abcxdXY'], 'the run\'s delete acked, its insert out, the answer not in');
  assert.deepEqual([MACHINE.undo(D).out, shown(D)], ['XY', 'abcxdef'], 'undone in that interval');
  assert.equal(WRITE.leaving('unload'), true);
  assert.deepEqual(fake.unloaded, [{ close: { session: 's-1', after: [id(3)], frames: [
    { frame: { op: 'delete', doc: D, p: at(6), width: '2', as_of: 21, id: id(4) }, anchors: { before: own(D, 4), after: null, span: [{ burst: id(3), offset: 0, width: 2 }] }, after: id(3) },
    { frame: { op: 'reinstate', doc: D, at: at(6), runs: [{ i_start: own(D, 5), origin: D, width: '2' }], as_of: 21, id: id(5) }, anchors: { before: own(D, 4), after: null } },
  ] } }], 'one close: behind the insert whose answer is not in, the `delete` of its words as its follower — its span a piece of that insert — then the `reinstate` of what the run removed');
  assert.equal(ops.length, 3, 'nothing dialed the ordinary way as the page goes');
});

test('BM-73: at the close a `reinstate` set beside words of the burst out names them by the piece of the insert that carried them; a `delete` whose words two unanswered inserts carried is no follower of either and goes without a span', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const { fake, ops } = boot((frame, n) => (n >= 2 ? later().out : ACK(19 + n)));
  read(D, 'abc');
  type(D, 4, 'p');
  WRITE.endRun(D);
  // a second run in the same burst: Backspace over the kept byte before the first run's word
  backspace(D, 4);
  t.mock.timers.tick(MACHINE.PAUSE_MS);
  await flush(); await flush();
  assert.deepEqual([ops.map((o) => o.frame.op), shown(D)], [['delete', 'insert'], 'abp'], 'one burst: the delete acked, the insert out');
  assert.deepEqual([MACHINE.undo(D), shown(D)], [{ how: 'done', at: 4, out: '', back: 'c' }, 'abcp'], 'the newer run undone: the byte back beside the word whose insert is out');
  assert.equal(WRITE.leaving('unload'), true);
  assert.deepEqual(fake.unloaded.map((u) => [u.close.after, u.close.frames]), [[[id(2)], [{ frame: { op: 'reinstate', doc: D, at: at(3), runs: [{ i_start: own(D, 3), origin: D, width: '1' }], as_of: 20, id: id(3) }, anchors: { before: own(D, 2), after: { burst: id(2), offset: 0 } } }]]],
    'the `reinstate` names the word beside it by the piece of the insert out, and carries no `after`: the row admits none on it');
  MACHINE._reset(); REC._reset(); WRITE._reset();
  // two inserts of one burst, the first out and the second undialed; then a removal across both and the byte between
  const b = boot(() => later().out);
  read(E, 'abc');
  type(E, 1, 'x');
  WRITE.endRun(E);
  type(E, 4, 'y');
  t.mock.timers.tick(MACHINE.PAUSE_MS);
  await flush();
  assert.deepEqual([b.ops.map((o) => o.frame.id), shown(E)], [[id(1)], 'xabycd'.replace('d', '')], 'a burst of two inserts, the first out');
  WRITE.endRun(E);
  WRITE.addEdit(E, { pos: 1, width: 4, text: '' }, { at: 5 });
  assert.equal(WRITE.leaving('unload'), true);
  const carried = b.fake.unloaded[0].close.frames || [];
  assert.deepEqual(carried.map((f) => [/** @type {any} */ (f.frame).op, f.anchors, f.after ?? null]), [['insert', { before: own(E, 2), after: own(E, 3) }, null], ['delete', { before: null, after: own(E, 3) }, null]],
    'a `delete` over words of two unanswered inserts follows neither: it goes as it did, without a span, and names no `after` the row would refuse');
});

/** what the margin marks of a draft (`marksOf`): each mark's kind, the words of the text shown it stands beside, and the positions there its removal points stand at */
function marked(/** @type {string} */ addr) {
  const d = applyEdits(WRITE.baseOf(addr), WRITE.edits(addr), (page, width) => REC.pageIds(addr, page, width)).doc;
  const point = (/** @type {{before: import('../model/records.js').ISpan[], after: import('../model/records.js').ISpan[]}} */ p) => {
    const b = p.before.length ? REC.placedIn(d.image, p.before) : [], a = p.after.length ? REC.placedIn(d.image, p.after) : [];
    return b.length ? b[b.length - 1].pos + b[b.length - 1].width : a.length ? a[0].pos : null;
  };
  return MACHINE.marksOf(addr).map((m) => [m.kind, REC.placedIn(d.image, m.ids).map((s) => REC.textOf(d.runs, s.pos, s.pos + s.width)).join(''), m.points.map(point)]);
}

test('J5: a line merely held marks nothing — the burst the shell holds while the board is not answering, and the words typed behind it', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  /** @type {unknown[]} */
  let rows = [];
  const { ops } = boot((frame, n) => HELD(n, n === 1 ? 'unreachable' : 'behind'), () => rows);
  read(D, 'abc');
  type(D, 4, 'x.');
  rows = [ROW(1, D, ops[0].frame)];
  await flush();
  type(D, 1, 'y.');
  rows = [rows[0], ROW(2, D, ops[1].frame, { cause: 'behind' })];
  await flush();
  assert.deepEqual([WRITE.keptOf(D), WRITE.heldOf(D).map((r) => r.held), marked(D)], [YET('unreachable'), [1, 2], []], 'two lines held, "not yet kept": no mark');
});

test('BM-10, BM-26: a run the board refused, and one the shell handed over, are refused over their own bytes alone — the lines held behind them unmarked; a removal the board refused at the point it removed', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  /** @type {unknown[]} */
  let rows = [];
  const { ops } = boot((frame, n) => HELD(n, n === 1 ? 'out_of_bounds' : 'behind'), () => rows);
  read(D, 'abc');
  type(D, 4, 'x.');
  rows = [ROW(1, D, ops[0].frame, { cause: 'out_of_bounds', sent: true, refusal: refusal('out_of_bounds') })];
  await flush();
  type(D, 1, 'y.');
  rows = [rows[0], ROW(2, D, ops[1].frame, { cause: 'behind' })];
  await flush();
  assert.deepEqual([WRITE.keptOf(D)?.word, marked(D)], ['not kept', [['refused', 'x.', []]]], 'the refused run its own bytes, the words behind it bare');
  rows = [{ .../** @type {any} */ (rows[0]), cause: 'answers_lost', refusal: { kind: 'shell', name: 'answers_lost', last: 'unreachable', elapsed_ms: 125000 } }, rows[1]];
  REC.setSession(/** @type {any} */ ({ ...S, session: 's-2' }));
  await flush();
  assert.deepEqual(marked(D), [['refused', 'x.', []]], 'handed over: refused the same');
  read(E, 'abcdef');
  backspace(E, 4);
  t.mock.timers.tick(MACHINE.PAUSE_MS);
  rows = [...rows, ROW(3, E, ops[2].frame, { cause: 'out_of_bounds', sent: true, refusal: refusal('out_of_bounds') })];
  await flush();
  assert.deepEqual([ops[2].frame.op, marked(E)], ['delete', [['refused', '', [3]]]], 'a refused removal: no bytes, its point where the removed byte stood');
});

test('D8, BM-13: while a moved document\'s verdict stands, every held line of it is held — the moved line\'s words and those held behind it', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  /** @type {unknown[]} */
  let rows = [];
  const { ops } = boot((frame, n) => HELD(n, n === 1 ? 'moved' : 'behind'), () => rows);
  read(D, 'abc');
  type(D, 4, 'm.');
  rows = [ROW(1, D, ops[0].frame, { cause: 'moved', sent: true, refusal: { ...refusal('arrangement_moved'), site: { as_of: 7, current: 9 } }, sendable: false })];
  await flush();
  type(D, 1, 'n.');
  rows = [rows[0], ROW(2, D, ops[1].frame, { cause: 'behind' })];
  await flush();
  assert.deepEqual([WRITE.keptOf(D), marked(D)], [YET('moved'), [['held', 'm.', []], ['held', 'n.', []]]], 'held moved: both lines held');
});

test('BM-19, BM-21: a refusal the page keeps is refused over its own bytes; a line the device refused to keep is held while its face stands, and bare once the retry keeps it', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  /** @type {unknown[]} */
  let rows = [];
  const { fake, ops } = boot((frame, n) => (frame.doc === E ? REFUSED : { result: { resp: 'held', held: n, cause: 'unreachable', unwritable: 'refused by the device', unwritable_class: 'full' } }), () => rows);
  read(D, 'abc');
  read(E, 'abc');
  type(E, 4, 'i.');
  await flush();
  assert.deepEqual([WRITE.islandsOf(E).length, marked(E)], [1, [['refused', 'i.', []]]], 'an island: refused');
  type(D, 4, 'd.');
  rows = [ROW(2, D, ops[1].frame, { unwritable: 'refused by the device', unwritable_class: 'full' })];
  fake.fire('held', EVENT(D, 'holding', 1, { cause: 'unreachable', unwritable: 'refused by the device', unwritable_class: 'full' }));
  await flush();
  assert.deepEqual([WRITE.keptOf(D), marked(D)], [NOT('unwritable'), [['held', 'd.', []]]], 'the device\'s refusal: held');
  rows = [ROW(2, D, ops[1].frame)];
  fake.fire('held', EVENT(D, 'holding', 1, { cause: 'unreachable' }));
  await flush();
  assert.deepEqual([WRITE.keptOf(D), marked(D)], [YET('unreachable'), []], 'the retry kept it: held, and bare');
});

test('BM-29: a held line this window did not send is held from the reopen until it lands — an insert beside its words, a removal at its point, a piece of an earlier insert read through that insert\'s own words — and one awaiting the person\'s act is refused', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  /** @type {unknown[]} */
  let rows = [
    ROW(1, D, { op: 'insert', doc: D, at: at(4), values: [' held'], as_of: 7, id: 'page:old.1' }, { anchors: { before: own(D, 3), after: own(D, 4) } }),
    ROW(2, D, { op: 'delete', doc: D, p: at(10), width: '3', as_of: 7, id: 'page:old.2' }, { cause: 'behind', anchors: { before: { burst: 'page:old.1', offset: 4 }, after: own(D, 7), span: [{ start: own(D, 4), width: '3' }] } }),
  ];
  read(D, 'abcdefghi');
  const { fake } = boot(() => ACK(20), () => rows);
  await flush();
  assert.deepEqual([shown(D), marked(D)], ['abc heldghi', [['held', ' held', []], ['held', '', [9]]]], 'at the reopen: the insert beside its words, the removal at its point, after the insert\'s fifth byte');
  rows = [rows[1]];
  fake.fire('held', EVENT(D, 'sending', 1, { landed: [{ held: 1, burst: 'page:old.1', at: 30, addr: null }] }));
  await flush();
  assert.deepEqual([shown(D), WRITE.reopened(D).map((l) => [l.row.held, l.at]), marked(D)], ['abc heldghi', [[1, 30], [2, null]], [['held', '', [9]]]], 'the insert landed: its mark lifts, its words standing until a read; the removal\'s point read by the byte after it');
  rows = [ROW(3, D, { op: 'insert', doc: D, at: at(1), values: ['z'], as_of: 7, id: 'page:old.3' }, { cause: 'out_of_bounds', sent: true, refusal: refusal('out_of_bounds') })];
  REC.setSession(/** @type {any} */ ({ ...S, session: 's-2' }));
  await flush();
  assert.deepEqual(marked(D), [['refused', 'z', []]], 'a line of another window\'s the board refused: refused');
});

test('D8, BM-24: under the death every word of a draft the board has not kept is held — its held lines\' and the words no listed line carries; a draft holding none marks nothing', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  /** @type {unknown[]} */
  let rows = [];
  const { ops } = boot((frame, n) => HELD(n), () => rows);
  REC.takeIndex(/** @type {any} */ ({ docs: [{ doc: D, kind: 'draft', label: 'abc', standing: 'yours_to_read' }], counts: [{ account: '1.0.1', documents: 1 }], state: { arm: 'complete' } }));
  read(D, 'abc');
  type(D, 4, 'd.');
  rows = [ROW(1, D, ops[0].frame)];
  await flush();
  type(D, 1, 'q');
  assert.deepEqual([MACHINE.deathFaced(D), marked(D)], [false, []], 'before the ending: one line held, a word open — nothing marked');
  REC.sessionDied({ arm: 'retired', fingerprint: 'fp-1', own: false }, [D]);
  await flush();
  assert.deepEqual([MACHINE.deathFaced(D), shown(D), marked(D)], [true, 'qabcd.', [['held', 'd.', []], ['held', 'q', []]]], 'after it: the held line\'s words and the word no listed line carries, held');
  assert.deepEqual(MACHINE.marksOf(E), [], 'a draft the page holds no record of: none');
});

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

test('BM-56, BM-57: another writer\'s row naming a draft whose burst stands open sets nothing until the burst\'s commit; the draft is then read again and set in one step, the open edit placed again by the bytes either side of it, a place held by its bytes\' identity standing on them still, and the burst composed against the new text, typed at the state that read was answered at', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  // the board the fake port stands in for: another writer puts "NEW " at the draft's head while the person types
  let text = 'abc def', position = 7;
  /** @type {number[]} */
  let ordinals = [1, 2, 3, 4, 5, 6, 7];
  const { fake, ops } = boot((frame) => {
    switch (frame.op) {
      case 'insert': {
        const pos = Number(frame.at.ordinal), words = frame.values.join('');
        text = text.slice(0, pos - 1) + words + text.slice(pos - 1);
        ordinals = [...ordinals.slice(0, pos - 1), ...[...words].map((_c, i) => 90 + i), ...ordinals.slice(pos - 1)];
        return MINTED(own(E, 90), ++position + 12);
      }
      case 'retrieve_doc_v_span_set': return { result: { as_of: position + 12, resp: 'span_set', set: [{ start: '1.1', width: '0.' + text.length }] } };
      case 'doc_metadata': return frame.doc === E ? { result: { as_of: position + 12, resp: 'doc_metadata', doc: E, published: false, owner: '1.0.1' } } : { refused: { kind: 'refused', name: 'doc_not_registered', code: 'doc_not_registered' } };
      case 'retrieve_v': return { result: { as_of: position + 12, resp: 'delivery', items: [{ content: text }] } };
      case 'image': return { result: { as_of: position + 12, resp: 'runs', runs: ordinals.map((o) => ({ i_start: own(E, o), width: '1' })) } };
      case 'find_links_v': return { result: { as_of: position + 12, resp: 'addrs', addrs: [] } };
      default: return undefined;
    }
  });
  PUMP.start({ onDirty: () => {} });
  REC.takeAccountKey('1.0.1', { label: 'dev-notebook', fingerprint: 'e4272902a11439e5' });
  REC.takeIndex(/** @type {any} */ ({ docs: [{ doc: E, kind: 'draft', label: null, standing: 'yours_to_read' }], counts: [{ account: '1.0.1', documents: 1 }], state: { arm: 'complete' } }));
  const box = docBox(E), e = estimate(7, box), c = e.columns[0];
  CAM.setViewport(1440, 900); CAM.reach(e.fs); CAM.set(CAM.viewAt({ x: box.x + c.x + c.w / 2, y: box.y + c.y + c.h / 2 }, e.fs));
  const settle = async () => { for (let i = 0; i < 40 && !PUMP.settled(); i++) await flush(); };
  await settle();
  assert.deepEqual([REC.textBetween(E, 1, 8), REC.doc(E).readAt], ['abc def', 19], 'the draft read in view');
  WRITE.addEdit(E, { pos: 4, width: 0, text: 'X' });
  /** the place of "def", held by its bytes' identity as a caret or a selection holds its place */
  const held = REC.identityIn(applyEdits(WRITE.baseOf(E), WRITE.edits(E), (page, width) => REC.pageIds(E, page, width)).doc.image, 6, 3);
  text = 'NEW abc def'; ordinals = [201, 202, 203, 204, 1, 2, 3, 4, 5, 6, 7]; position = 9;
  fake.fire('feed', { board: 'b-1', update: { position: 21, at: 21, op: 'insert', docs: [E], class: 'drafts', session: 's-1' } });
  await flush(); await settle();
  assert.deepEqual([REC.textBetween(E, 1, 8), shown(E), ops.filter((o) => o.frame.op === 'insert').length, PUMP.owesRead(E)], ['abc def', 'abcX def', 0, true], 'while the burst stands open the row sets nothing: the text as it stood, the read owed');
  t.mock.timers.tick(MACHINE.PAUSE_MS);
  await flush(); await settle(); await flush();
  const sent = ops.filter((o) => o.frame.op === 'insert');
  assert.deepEqual([REC.textBetween(E, 1, 13), shown(E), sent.length, sent[0].frame.at, sent[0].frame.as_of, sent[0].anchors], ['NEW abcX def', 'NEW abcX def', 1, at(8), 21, { before: own(E, 3), after: own(E, 4) }],
    'at the commit: the draft read again and set, the edit placed again after the byte it followed, the burst composed against the new text and typed at the state the read was answered at');
  const now = applyEdits(WRITE.baseOf(E), WRITE.edits(E), (page, width) => REC.pageIds(E, page, width)).doc;
  assert.deepEqual(REC.placedIn(now.image, held), [{ pos: 10, width: 3 }], 'the place held by identity stands on its bytes, four positions on');
});

test('a draft the window writes in is kept as the view\'s wherever the plane places it: out of the camera\'s sight, its ack\'s read still sets it in one step — its text standing, the edit the read holds gone, the text shown the same — and its own feed row drops nothing', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const G = '1.0.1.0.9';
  let text = 'abc', position = 7;
  /** @type {number[]} */
  let ordinals = [1, 2, 3];
  const { fake, ops } = boot((frame) => {
    switch (frame.op) {
      case 'insert': {
        const pos = Number(frame.at.ordinal), words = frame.values.join('');
        text = text.slice(0, pos - 1) + words + text.slice(pos - 1);
        ordinals = [...ordinals.slice(0, pos - 1), ...[...words].map((_c, i) => 70 + i), ...ordinals.slice(pos - 1)];
        return MINTED(own(G, 70), ++position + 12);
      }
      case 'retrieve_doc_v_span_set': return { result: { as_of: position + 12, resp: 'span_set', set: [{ start: '1.1', width: '0.' + text.length }] } };
      case 'doc_metadata': return frame.doc === G ? { result: { as_of: position + 12, resp: 'doc_metadata', doc: G, published: false, owner: '1.0.1' } } : { refused: { kind: 'refused', name: 'doc_not_registered', code: 'doc_not_registered' } };
      case 'retrieve_v': return { result: { as_of: position + 12, resp: 'delivery', items: [{ content: text }] } };
      case 'image': return { result: { as_of: position + 12, resp: 'runs', runs: ordinals.map((o) => ({ i_start: own(G, o), width: '1' })) } };
      case 'find_links_v': return { result: { as_of: position + 12, resp: 'addrs', addrs: [] } };
      default: return undefined;
    }
  });
  PUMP.start({ onDirty: () => {} });
  // the camera drawn back to the far band, where the view reads no document: none is kept as shown
  CAM.setViewport(1440, 900); CAM.set({ x: 5, y: 5, scale: 1e-6 });
  read(G, 'abc');
  assert.equal(PUMP.settled(), true, 'at the far band the view asks nothing of the draft');
  WRITE.addEdit(G, { pos: 4, width: 0, text: 'd.' });
  for (let i = 0; i < 6; i++) await flush();
  assert.deepEqual([ops.filter((o) => o.frame.op === 'insert').length, REC.textBetween(G, 1, 6), WRITE.edits(G), shown(G), WRITE.keptOf(G)?.word], [1, 'abcd.', [], 'abcd.', 'kept'], 'acked: the draft read again and set, the edit the read holds gone, the text shown the same');
  fake.fire('feed', { board: 'b-1', update: { position: 20, at: 20, op: 'insert', docs: [G], class: 'drafts', session: 's-1' } });
  for (let i = 0; i < 6; i++) await flush();
  assert.deepEqual([REC.doc(G).from, REC.textBetween(G, 1, 6)], [1, 'abcd.'], 'its own row, the camera still away: nothing of it dropped');
});

test('BM-32, BM-34: an undo\'s inverse is composed against the text shown, by identity, and never as it was typed — where a line of the undone run leaves the shell\'s list with no landing and the next read holds none of its words, the inverse takes nothing back, and the keys typed after it are sent as they stand', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  // the board the fake port stands in for: the draft's text and the address of each of its bytes, moved by each delete it acks
  let text = 'abc\n\nsecond line', position = 7, hold = true;
  let ordinals = [...text].map((_c, i) => i + 1);
  /** @type {unknown[]} */
  let rows = [];
  const { fake, ops } = boot((frame) => {
    switch (frame.op) {
      case 'insert': if (hold) { hold = false; return HELD(1); } return MINTED(own(D, 500), ++position + 12);
      case 'delete': {
        const p = Number(frame.p.ordinal), w = Number(frame.width);
        text = text.slice(0, p - 1) + text.slice(p - 1 + w);
        ordinals = [...ordinals.slice(0, p - 1), ...ordinals.slice(p - 1 + w)];
        return ACK(++position + 12);
      }
      case 'retrieve_doc_v_span_set': return { result: { as_of: position + 12, resp: 'span_set', set: [{ start: '1.1', width: '0.' + text.length }] } };
      case 'doc_metadata': return frame.doc === D ? { result: { as_of: position + 12, resp: 'doc_metadata', doc: D, published: false, owner: '1.0.1' } } : { refused: { kind: 'refused', name: 'doc_not_registered', code: 'doc_not_registered' } };
      case 'retrieve_v': return { result: { as_of: position + 12, resp: 'delivery', items: [{ content: text }] } };
      case 'image': return { result: { as_of: position + 12, resp: 'runs', runs: ordinals.map((o) => ({ i_start: own(D, o), width: '1' })) } };
      case 'find_links_v': return { result: { as_of: position + 12, resp: 'addrs', addrs: [] } };
      default: return undefined;
    }
  }, () => rows, () => ({ refused: { kind: 'shell', name: 'landing_unread', held: 1, why: 'unanswered' } }));
  PUMP.start({ onDirty: () => {} });
  REC.takeAccountKey('1.0.1', { label: 'dev-notebook', fingerprint: 'e4272902a11439e5' });
  REC.takeIndex(/** @type {any} */ ({ docs: [{ doc: D, kind: 'draft', label: null, standing: 'yours_to_read' }], counts: [{ account: '1.0.1', documents: 1 }], state: { arm: 'complete' } }));
  const box = docBox(D), e = estimate(3, box), c = e.columns[0];
  CAM.setViewport(1440, 900); CAM.reach(e.fs); CAM.set(CAM.viewAt({ x: box.x + c.x + c.w / 2, y: box.y + c.y + c.h / 2 }, e.fs));
  const settle = async () => { for (let i = 0; i < 40 && !PUMP.settled(); i++) await flush(); };
  const writes = () => ops.filter((o) => ['insert', 'delete', 'reinstate'].includes(o.frame.op)).map((o) => [o.frame.op, o.frame.p ?? o.frame.at, o.frame.width ?? o.frame.values]);
  await settle();
  WRITE.addEdit(D, { pos: 4, width: 0, text: ' Unread.' }, { at: 4 });
  rows = [ROW(1, D, { op: 'insert', doc: D }, { sent: true })];
  await flush(); await settle();
  assert.deepEqual([shown(D), WRITE.keptOf(D)], ['abc Unread.\n\nsecond line', YET('unreachable')], 'a run whose line the shell holds, marked `sent`');
  MACHINE.undo(D);
  await flush(); await flush(); await settle();
  assert.equal(shown(D), 'abc\n\nsecond line', 'undone: the drop owed');
  // the line leaves the list with no landing told — another hand dropped it — and the draft is read again: its words are nowhere
  rows = [];
  fake.fire('held', EVENT(D, 'holding', 1, { cause: 'unreachable' }));
  await flush(); await flush(); await settle();
  WRITE.endRun(D);
  WRITE.addEdit(D, { pos: 3, width: 1, text: '' }, { at: 4 });
  t.mock.timers.tick(MACHINE.PAUSE_MS * 2);
  await flush(); await settle();
  assert.deepEqual([writes().slice(1), text, shown(D)], [[['delete', at(3), '1']], 'ab\n\nsecond line', 'ab\n\nsecond line'],
    'the inverse takes nothing back, its words on no board: the one `delete` sent is the key typed since, and no byte the board kept is lost');
});
