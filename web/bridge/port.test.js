// B-PORT's test over the fake port (FP-15): the port's calls are the rows of
// the generated `Bridge`, in its order; the `publication` family goes out
// under its dotted names and `changes` under its own, each answer handed up
// as it came and a lost session's refusal told to the session watchers; and
// a `publication` event reaches its own subscribers and every-event ones.
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
const COUNT = { l: 0, n: 0, r: 0, e: 0, claim: false, read_with: [] };

test('the calls are the generated Bridge\'s rows in its order, the two answers to a moment apart', () => {
  const rows = bridgeRows();
  assert.ok(rows.includes('answer') && rows.includes('cancel'), 'the moment\'s two answers are rows of the declarations');
  assert.deepEqual(PORT.CALLS, rows.filter((n) => n !== 'answer' && n !== 'cancel'));
});

test('the publication family goes out under its dotted names, each answer handed up as it came, the moment\'s cancel apart', async () => {
  const open = { session: 's-1', draft: DRAFT, doc: '1.0.1.0.1', base: '1.0.1.0.1.1', also: ['1.0.1.0.1014'] }, switched = { session: 's-1', switches: { on: [] } }, confirm = { session: 's-1', switches: { on: [] }, answers: {} }, stop = { session: 's-1' };
  const panel = { result: { rows: [], formatting: { marks: [], cut: 0, removals: [] }, read_with: {}, count: COUNT, price: PRICE, windows: [], inherited: [{ draft: '1.0.1.0.1014', passages: 1 }] } };
  const counted = { result: { count: COUNT, price: PRICE } };
  const acknowledged = { result: { outcome: 'acknowledged', member: DRAFT + '.1', edition: null, claim: false, at: 12, via: 'answer' } };
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
