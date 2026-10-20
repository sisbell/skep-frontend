// N-WALK's test against the FAKE PORT: a landing keeps the position it named
// inside the span it focuses — the one line's position — while a walk key's
// move names none, so stepping back onto the landing's span reads the span's
// own first position; a position no span holds is never kept.
import { test, before } from 'node:test';
import assert from 'node:assert/strict';
import * as PORT from '../bridge/port.js';
import * as REC from '../model/records.js';
import * as PUMP from '../model/pump.js';
import * as F from '../model/frames.js';
import * as FAKE from '../test/fake-port.js';
import * as CAM from '../plane/camera.js';
import * as WALK from './walk.js';

const D = '1.0.1.0.3';
// three spans: 1 "Tumbler.\n\n" (10), 11 "The first field." (16), 27 a withheld run (4)
const script = {
  [FAKE.keyOf('op', { frame: F.retrieveDocVSpanSet(D) })]: { result: { as_of: 1, resp: 'span_set', set: [{ start: '1.1', width: '0.30' }] } },
  [FAKE.keyOf('op', { frame: F.docMetadata(D) })]: { result: { as_of: 1, resp: 'doc_metadata', doc: D, published: true, owner: '1.0.1', birth: D + '.1', birth_extent: '30', placed: null, base_extent: null, source: null } },
  [FAKE.keyOf('op', { frame: F.retrieveV(D, 1, 30) })]: { result: { as_of: 1, resp: 'delivery', items: [{ content: 'Tumbler.\n\nThe first field.' }, { withheld: { origin: '1.0.1.0.1003', width: '4' } }] } },
  [FAKE.keyOf('op', { frame: F.image(D, 1, 30) })]: { result: { as_of: 1, resp: 'runs', runs: [{ i_start: D + '.0.1.1', width: '26' }, { i_start: '1.0.1.0.1003.0.1.1', width: '4' }] } },
  [FAKE.keyOf('op', { frame: F.findLinksV(D, 1, 30) })]: { result: { as_of: 1, resp: 'addrs', addrs: [] } },
};

/** a walk move run to its end: the flight it starts stepped to its last frame */
async function run(/** @type {Promise<unknown>} */ move) {
  let done = false;
  move.then(() => { done = true; });
  for (let i = 0; i < 100 && !done; i++) { await new Promise((r) => setTimeout(r, 0)); if (CAM.flying()) CAM.step(Infinity); }
  assert.ok(done, 'the move ran to its end');
}

before(async () => {
  REC._reset();
  const fake = FAKE.create(script);
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.setBoard({ board: 'b-1', name: '', origin: '' }); REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  REC.takeIndex(/** @type {any} */ ({ docs: [{ doc: D, kind: 'edition', label: 'd', standing: 'public' }], counts: [{ account: '1.0.1', documents: 1 }], state: { arm: 'complete' } }));
  CAM.setViewport(1440, 900);
  await PUMP.loadWhole(D);
  assert.deepEqual(REC.doc(D).blocks.map((b) => b.pos), [1, 11, 27]);
  assert.deepEqual(fake.unanswered, []);
});

test('a landing focuses the span holding its position and keeps the position it named', async () => {
  await WALK.focusTo(D, 15);
  assert.equal(WALK.current()?.pos, 11, 'the focus is the span holding position 15');
  assert.equal(WALK.landedAt(), 15);
});

test('a walk key names no position, and stepping back onto the landing\'s span reads the span\'s own first', async () => {
  await WALK.focusTo(D, 15);
  await run(WALK.key('down'));
  assert.equal(WALK.current()?.pos, 27);
  assert.equal(WALK.landedAt(), null);
  await run(WALK.key('up'));
  assert.equal(WALK.current()?.pos, 11);
  assert.equal(WALK.landedAt(), null);
});

test('a position no span holds is never kept: the focus falls to the first span with its own position', async () => {
  await WALK.focusTo(D, 99);
  assert.equal(WALK.current()?.pos, 1);
  assert.equal(WALK.landedAt(), null);
});

test('a landing on the document itself names no position', async () => {
  await WALK.focusTo(D, 15);
  await WALK.focusTo(D, null);
  assert.equal(WALK.current()?.kind, 'document');
  assert.equal(WALK.landedAt(), null);
});
