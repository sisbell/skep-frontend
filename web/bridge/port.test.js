// B-PORT's test over the fake port (FP-15): the port's calls are the rows of
// the generated `Bridge`, in its order, the `merge` family's four among them
// beside the rows it held before; the `publication` and `merge` families go
// out under their dotted names and `changes` under its own, each answer
// handed up as it came and a lost session's refusal told to the session
// watchers; and a `publication` event reaches its own subscribers and
// every-event ones.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import * as PORT from './port.js';
import * as FAKE from '../test/fake-port.js';

const DRAFT = '1.0.1.0.1013';

/** the rows of the generated `Bridge`, in the order the declarations write them */
function bridgeRows() {
  const shapes = readFileSync(new URL('./shapes.d.ts', import.meta.url), 'utf8');
  const from = shapes.slice(shapes.indexOf('export interface Bridge {'));
  return [...from.slice(0, from.indexOf('\n}')).matchAll(/^ {2}'?([\w.]+)'?\(args/gm)].map((m) => m[1]);
}

/** the price of a panel no row is switched on in */
const PRICE = { lists: [0, 0, 0, 0, 0], body: 0, values: 0, reads: 0, bytes: 0, over: [] };
const COUNT = { l: 0, n: 0, r: 0, e: 0, claim: false, read_with: [], supersede: [] };

/** the calls the port held before the `merge` family, in the generated `Bridge`'s order */
const HELD = [
  'boards', 'session', 'close', 'keygen', 'fingerprint', 'claim', 'enroll', 'bind', 'recover', 'rotate', 'retire', 'handoff', 'accept', 'health', 'probe', 'op',
  'publication.open', 'publication.count', 'publication.confirm', 'publication.cancel',
  'upload', 'fetch', 'restore', 'search', 'places', 'held', 'resolve', 'changes',
];
/** the `merge` family's rows, in the generated `Bridge`'s order */
const MERGE = ['merge.compose', 'merge.land', 'merge.undo', 'merge.withdraw'];

test('the calls are the generated Bridge\'s rows in its order, the two answers to a moment apart', () => {
  const rows = bridgeRows();
  assert.ok(rows.includes('answer') && rows.includes('cancel'), 'the moment\'s two answers are rows of the declarations');
  assert.deepEqual(PORT.CALLS, rows.filter((n) => n !== 'answer' && n !== 'cancel'));
});

test('the publication family goes out under its dotted names, each answer handed up as it came, the moment\'s cancel apart', async () => {
  const open = { session: 's-1', draft: DRAFT, doc: '1.0.1.0.1', base: '1.0.1.0.1.1', also: ['1.0.1.0.1014'] }, switched = { session: 's-1', switches: { on: [] } }, confirm = { session: 's-1', switches: { on: [] }, answers: {} }, stop = { session: 's-1' };
  const panel = { result: { rows: [], formatting: { marks: [], cut: 0, removals: [] }, read_with: {}, count: COUNT, price: PRICE, windows: [], inherited: [{ draft: '1.0.1.0.1014', passages: 1 }], left_behind: [] } };
  const counted = { result: { count: COUNT, price: PRICE } };
  const acknowledged = { result: { outcome: 'acknowledged', member: DRAFT + '.1', edition: null, claim: false, supersede: [], at: 12, via: 'answer' } };
  const cancelled = { result: {} }, declined = { result: {} };
  const fake = FAKE.create({
    [FAKE.keyOf('publication.open', open)]: panel,
    [FAKE.keyOf('publication.count', switched)]: counted,
    [FAKE.keyOf('publication.confirm', confirm)]: acknowledged,
    [FAKE.keyOf('publication.cancel', stop)]: cancelled,
    [FAKE.keyOf('cancel', { id: 'm-1' })]: declined,
  });
  PORT.boot(fake);
  assert.equal(await PORT.publication.open(open), panel);
  assert.equal(await PORT.publication.count(switched), counted);
  assert.equal(await PORT.publication.confirm(confirm), acknowledged);
  assert.equal(await PORT.publication.cancel(stop), cancelled);
  assert.equal(await PORT.cancel({ id: 'm-1' }), declined);
  assert.deepEqual(fake.calls().map((c) => c.name), ['publication.open', 'publication.count', 'publication.confirm', 'publication.cancel', 'cancel']);
  assert.deepEqual(fake.unanswered, [], 'each went out with the arguments it was given');
});

test('a publication row refused as from a session the shell does not hold is told to the session watchers, the refusal handed up unchanged', async () => {
  const switched = { session: 's-2', switches: { on: [] } };
  const refusal = { kind: 'shell', name: 'session_ended' };
  const fake = FAKE.create({ [FAKE.keyOf('publication.count', switched)]: { refused: refusal } });
  PORT.boot(fake);
  /** @type {import('./port.js').SessionNotice[]} */
  const told = [];
  PORT.onSession((n) => told.push(n));
  const out = await PORT.publication.count(switched);
  assert.deepEqual(told, [{ lost: 's-2', refusal }]);
  assert.ok('refused' in out && out.refused === refusal);
});

test('CALLS holds the merge family\'s four rows after the publication family\'s, and beside them exactly the twenty-eight it held (issue #395)', () => {
  assert.equal(HELD.length, 28);
  assert.equal(PORT.CALLS.length, 32);
  const after = HELD.indexOf('publication.cancel') + 1;
  assert.deepEqual(PORT.CALLS, [...HELD.slice(0, after), ...MERGE, ...HELD.slice(after)], 'the rows it held, none dropped and none added, the four after `publication.cancel` in the Bridge\'s order');
  assert.deepEqual(Object.keys(PORT.merge), ['compose', 'land', 'undo', 'withdraw']);
  assert.ok(Object.isFrozen(PORT.merge), 'frozen as `publication` is');
});

test('the merge family goes out under its dotted names, each answer handed up as it came (issue #395)', async () => {
  const TRUNK = '1.0.1.0.1', DAUGHTER = '1.0.1.0.1.1.1';
  const compose = { session: 's-1', doc: TRUNK, alternative: DAUGHTER, into: DRAFT }, land = { session: 's-1', resolutions: { '1': 'keep_both' } }, undo = { session: 's-1' }, withdraw = { session: 's-1', draft: DRAFT };
  const report = { result: { outcome: 'landed', doc: TRUNK, head: TRUNK + '.2', base: TRUNK + '.1', side: DAUGHTER, form: 'daughter', sides: [{ at: TRUNK + '.2', role: 'head', position: null }, { at: DAUGHTER, role: 'alternative', position: null }], runs: [], gaps: [], counts: { a: 1, b: 1, m: 2 }, cap: 4096, over_cap: false, record: null, as_of: 15, into: DRAFT, position: 14, fresh: false, head_moved: null, record_link: null } };
  const landed = { result: { outcome: 'landed', member: TRUNK + '.3', at: 16, via: 'answer', claim: true, supersede: [DAUGHTER], daughter: false, record: null, claims: [], retries: 0 } };
  const undone = { result: { draft: DRAFT, position: 17, record: null, restored: { base: TRUNK + '.1', extent: 5 } } };
  const withdrawn = { result: { draft: DRAFT, position: 18, record: null } };
  const fake = FAKE.create({
    [FAKE.keyOf('merge.compose', compose)]: report,
    [FAKE.keyOf('merge.land', land)]: landed,
    [FAKE.keyOf('merge.undo', undo)]: undone,
    [FAKE.keyOf('merge.withdraw', withdraw)]: withdrawn,
  });
  PORT.boot(fake);
  assert.equal(await PORT.merge.compose(compose), report);
  assert.equal(await PORT.merge.land(land), landed);
  assert.equal(await PORT.merge.undo(undo), undone);
  assert.equal(await PORT.merge.withdraw(withdraw), withdrawn);
  assert.deepEqual(fake.calls().map((c) => c.name), MERGE);
  assert.deepEqual(fake.unanswered, [], 'each went out with the arguments it was given');
});

test('a merge row refused as from a session the shell does not hold is told to the session watchers, the refusal handed up unchanged', async () => {
  const undo = { session: 's-3' };
  const refusal = { kind: 'shell', name: 'session_died', reason: { arm: 'restart' } };
  const fake = FAKE.create({ [FAKE.keyOf('merge.undo', undo)]: { refused: refusal } });
  PORT.boot(fake);
  /** @type {import('./port.js').SessionNotice[]} */
  const told = [];
  PORT.onSession((n) => told.push(n));
  const out = await PORT.merge.undo(undo);
  assert.deepEqual(told, [{ lost: 's-3', refusal }]);
  assert.ok('refused' in out && out.refused === refusal);
});

test('changes goes out under its own name, its answer handed up as it came', async () => {
  const args = { session: 's-1', since: 12, limit: 50 };
  const page = { result: { entries: [], next: 13, head: 13 } };
  const fake = FAKE.create({ [FAKE.keyOf('changes', args)]: page });
  PORT.boot(fake);
  assert.equal(await PORT.changes(args), page);
  assert.deepEqual(fake.calls().map((c) => c.name), ['changes']);
});

test('a publication event reaches its own subscribers and every-event subscribers', () => {
  const fake = FAKE.create({});
  PORT.boot(fake);
  /** @type {unknown[]} */
  const heard = [];
  /** @type {unknown[]} */
  const all = [];
  PORT.on('publication', (d) => heard.push(d));
  PORT.on('*', (e) => all.push(e));
  const sent = { board: 'b-1', session: 's-1', draft: DRAFT, state: 'sent' };
  const held = { board: 'b-1', session: 's-1', doc: DRAFT, held: 1, state: 'holding', cause: 'unreachable' };
  fake.fire('publication', sent);
  fake.fire('held', held);
  assert.deepEqual(heard, [sent]);
  assert.deepEqual(all, [{ name: 'publication', data: sent }, { name: 'held', data: held }]);
});
