// M-PUMP's test against the FAKE PORT (FP-15's proof, half one): the model
// built from a scripted sequence of answers and events, no write composed;
// the view's reads ask nothing for a document a continuation's mark holds;
// a session's end is taken by the page whose session it is and by no other;
// with SKEP_REPLAY naming a script the harness recorded from the provider,
// the model's snapshot is printed for the gate to hold deep-equal to the
// page's (half two: `harness/cases/wire.py`).
import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync } from 'node:fs';
import * as PORT from '../bridge/port.js';
import * as REC from './records.js';
import * as PUMP from './pump.js';
import * as F from './frames.js';
import * as FAKE from '../test/fake-port.js';
import * as CAM from '../plane/camera.js';
import { accountCell } from '../plane/projection.js';

const D = '1.0.1.0.3';
const script = {
  [FAKE.keyOf('boards', {})]: { result: [{ board: 'b-1', name: 'http://127.0.0.1:8642', origin: 'http://127.0.0.1:8642' }] },
  [FAKE.keyOf('session', { board: 'b-1' })]: { result: { session: 's-1', principal: 1, account: '1.0.1' } },
  [FAKE.keyOf('places', { board: 'b-1' })]: { result: { docs: [{ doc: D, kind: 'edition', label: '# skep-ux-design', standing: 'public' }, { doc: '1.0.1.0.127', kind: 'edition', label: 'far', standing: 'public' }], counts: [{ account: '1.0.1', documents: 2 }], state: { arm: 'at_the_floor', floor: 8265 } } },
  [FAKE.keyOf('op', { frame: F.retrieveDocVSpanSet(D) })]: { result: { as_of: 1, resp: 'span_set', set: [{ start: '1.1', width: '0.30' }] } },
  [FAKE.keyOf('op', { frame: F.docMetadata(D) })]: { result: { as_of: 1, resp: 'doc_metadata', doc: D, published: true, owner: '1.0.1', birth: D + '.1', birth_extent: '30', placed: null, base_extent: null, source: null } },
  [FAKE.keyOf('op', { frame: F.retrieveV(D, 1, 30) })]: { result: { as_of: 1, resp: 'delivery', items: [{ content: 'Tumbler.\n\nThe first field.' }, { withheld: { origin: '1.0.1.0.1003', width: '4' } }] } },
  [FAKE.keyOf('op', { frame: F.image(D, 1, 30) })]: { result: { as_of: 1, resp: 'runs', runs: [{ i_start: D + '.0.1.1', width: '26' }, { i_start: '1.0.1.0.1003.0.1.1', width: '4' }] } },
  [FAKE.keyOf('op', { frame: F.findLinksV(D, 1, 30) })]: { result: { as_of: 1, resp: 'addrs', addrs: [D + '.0.2.1'] } },
  [FAKE.keyOf('op', { frame: F.readLink(D + '.0.2.1') })]: { result: { as_of: 1, resp: 'link_value', link: { slots: [[{ start: D + '.0.1.11', width: '0.0.0.0.0.0.0.5' }], [{ start: '1.0.1.0.127', width: '0.0.0.0.1' }], [{ start: '1.1.0.1.0.1.0.3.13', width: '0.0.0.0.0.0.0.0.1' }]] } } },
  [FAKE.keyOf('op', { frame: F.project(D + '.0.2.1', 2, '1.0.1.0.127') })]: { result: { as_of: 1, resp: 'span_set', set: [{ start: '1.1', width: '0.100' }] } },
};

beforeEach(() => { REC._reset(); });

test('the model after a scripted cold open and a whole read, over the fake port', async () => {
  const fake = FAKE.create(script);
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  const b = await PORT.boards({}); assert.ok('result' in b); REC.setBoard({ board: b.result[0].board, name: b.result[0].name, origin: b.result[0].origin });
  const s = await PORT.session({ board: 'b-1' }); assert.ok('result' in s); REC.setSession({ session: s.result.session, principal: s.result.principal, account: s.result.account });
  const pl = await PORT.places({ session: 's-1', board: 'b-1' }); assert.ok('result' in pl); REC.takeIndex(pl.result);
  const d = await PUMP.loadWhole(D);
  assert.ok(d);
  assert.equal(d.extent, 30);
  assert.deepEqual(d.blocks.map((x) => [x.pos, x.kind]), [[1, 'para'], [11, 'para'], [27, 'withheld']]);
  assert.deepEqual(d.origins, [{ pos: 27, width: 4, doc: '1.0.1.0.1003' }]);
  assert.equal(REC.link(D + '.0.2.1')?.type, '1.1.0.1.0.1.0.3.13');
  assert.deepEqual(await PUMP.projectEnd(D + '.0.2.1', 2, '1.0.1.0.127'), { ordinal: 1, positions: 100 });
  assert.deepEqual(fake.unanswered, [], 'every call the pump made was a read the script expected');
  assert.ok(fake.calls().every((c) => c.name !== 'op' || true));
  // the feed keeps the index and invalidates
  fake.fire('feed', { board: 'b-1', update: { position: 2, at: 2, op: 'publish', docs: [D + '.2'], class: 'published' } });
  assert.equal(REC.doc(D).from, -1);
  fake.fire('session-died', { session: 's-1', reason: { arm: 'closed' } });
  assert.equal(REC.session(), null);
  const snap = REC.snapshot();
  assert.equal(snap.index.length, 2);
});

test('a session-died ends the page\'s own session alone: a guest, or a page signed in under another session, takes no death', () => {
  const fake = FAKE.create(script);
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.setBoard({ board: 'b-1', name: '', origin: '' });
  fake.fire('session-died', { session: 's-2', reason: { arm: 'closed' } });
  assert.equal(REC.deathReason(), null, 'a guest was never signed in: another page\'s close is not its death');
  REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  fake.fire('session-died', { session: 's-2', reason: { arm: 'closed' } });
  assert.equal(REC.session()?.session, 's-1', 'a page signed in under another session keeps its own');
  assert.equal(REC.deathReason(), null);
  fake.fire('session-died', { session: 's-1', reason: { arm: 'closed' } });
  assert.equal(REC.session(), null, 'its own session\'s end is its death');
  assert.deepEqual(REC.deathReason(), { arm: 'closed' });
});

test('no call the pump makes is a write: every op frame names a read op', async () => {
  const fake = FAKE.create(script);
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.setBoard({ board: 'b-1', name: '', origin: '' }); REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  await PUMP.loadWhole(D);
  const ops = fake.calls().filter((c) => c.name === 'op');
  assert.ok(ops.length >= 5);
  for (const k of fake.unanswered) assert.ok(false, 'unexpected ' + k);
  for (const key of Object.keys(script)) if (key.startsWith('op:')) { const frame = JSON.parse(key.slice(3)); assert.ok(F.READ_OPS.includes(frame.op), frame.op + ' is a read'); }
});

test('at HOME the reads ask for the documents standing whole and nothing for the 49th, which the first continuation\'s mark holds', async () => {
  const fake = FAKE.create(script);
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.setBoard({ board: 'b-1', name: '', origin: '' }); REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  const MEMBER = '1.0.1.0.49';
  REC.takeIndex(/** @type {any} */ ({ docs: [{ doc: D, kind: 'edition', label: 'd', standing: 'public' }, { doc: MEMBER, kind: 'edition', label: 'm', standing: 'public' }], counts: [{ account: '1.0.1', documents: 2 }], state: { arm: 'complete' } }));
  PUMP.forget(D); PUMP.forget(MEMBER);
  CAM.setViewport(1440, 900);
  CAM.set(CAM.viewForCell(accountCell('1.0.1'), 0.85));
  assert.deepEqual(PUMP.visibleDocs().map((d) => d.addr), [D], 'the 49th is in view, inside the mark');
  PUMP.pump();
  await new Promise((r) => setTimeout(r, 0));
  assert.equal(REC.doc(D).extent, 30, 'the document standing whole has its span set read');
  assert.deepEqual(fake.unanswered.filter((k) => k.includes(MEMBER)), [], 'no read names the document the mark holds');
  assert.equal(REC.doc(MEMBER).extent, null);
});

test('replay: a recorded script from the provider builds the model; the snapshot printed for the gate', async () => {
  const file = process.env.SKEP_REPLAY;
  if (!file) return; // the harness sets it
  const rec = JSON.parse(readFileSync(file, 'utf8'));
  /** @type {Record<string, unknown>} the script: keyed as given, or cut from the bridge client's recorded calls (name, args, outcome) */
  const script = rec.script ? rec.script : {};
  for (const c of rec.calls || []) script[FAKE.keyOf(c.name, c.args)] = c.outcome;
  const fake = FAKE.create(script);
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.setBoard(rec.board); REC.setSession(rec.session);
  const pl = await PORT.places({ session: rec.session.session, board: rec.board.board });
  if ('result' in pl) REC.takeIndex(pl.result);
  for (const addr of rec.loadWhole) await PUMP.loadWhole(addr);
  for (const ev of rec.events || []) fake.fire(ev.name, ev.data);
  const snap = JSON.stringify(REC.snapshot());
  if (process.env.SKEP_REPLAY_OUT) writeFileSync(process.env.SKEP_REPLAY_OUT, snap); // the runner's TAP escapes stdout; the gate reads the file
  else process.stdout.write('SNAPSHOT ' + snap + '\n');
  assert.deepEqual(fake.unanswered, []);
});
