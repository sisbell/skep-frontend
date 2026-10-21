// L-LINE's test against the FAKE PORT: the address display names the level
// the camera's scale reads (foundations §2.2) — at far scale the board, the
// whole board in view at its clamp; at mid the account under the camera
// (B1-S2: "THE ONE LINE reads `1.5 › 1.5.0.1`"), never the document the walk
// stands on and never a position, though the walk keeps the span a landing
// named until the re-take stands it on the document, and the account the
// camera's, not the walk's; at reading scale the document and the position the
// landing named — a mutant that names the walk's document at mid turns red, and
// so does one that drops the document form at mid~near. The LEAP box's prefill
// is the address the display names (K-30: "the box open holding the current
// address"; the box is the line's stop, opened), so the box never opens on an
// address the line does not show — a mutant whose prefill keeps a rule of its
// own (the walk's document at mid, the account the arithmetic finds at the
// whole board's centre) turns red. A restart the shell re-opened leaves the
// acting-as segment as it stood (client.md §4b.2: "no death chrome") — a
// mutant that takes the restart for a death turns red.
import { test, before } from 'node:test';
import assert from 'node:assert/strict';
import * as PORT from '../bridge/port.js';
import * as REC from '../model/records.js';
import * as PUMP from '../model/pump.js';
import * as F from '../model/frames.js';
import * as FAKE from '../test/fake-port.js';
import * as CAM from '../plane/camera.js';
import { docBox, accountCell, boardCell, DOC_W, REP_FS } from '../plane/projection.js';
import { lodOf } from '../plane/lod.js';
import { t } from '../strings.js';
import * as WALK from '../nav/walk.js';
import * as LINE from './line.js';

const D = '1.0.1.0.3';
// D's reads, read whole: three spans — 1 "Tumbler.\n\n" (10), 11 "The first field." (16), 27 a withheld run (4)
const script = {
  [FAKE.keyOf('op', { frame: F.retrieveDocVSpanSet(D) })]: { result: { as_of: 1, resp: 'span_set', set: [{ start: '1.1', width: '0.30' }] } },
  [FAKE.keyOf('op', { frame: F.docMetadata(D) })]: { result: { as_of: 1, resp: 'doc_metadata', doc: D, published: true, owner: '1.0.1', birth: D + '.1', birth_extent: '30', placed: null, base_extent: null, source: null } },
  [FAKE.keyOf('op', { frame: F.retrieveV(D, 1, 30) })]: { result: { as_of: 1, resp: 'delivery', items: [{ content: 'Tumbler.\n\nThe first field.' }, { withheld: { origin: '1.0.1.0.1003', width: '4' } }] } },
  [FAKE.keyOf('op', { frame: F.image(D, 1, 30) })]: { result: { as_of: 1, resp: 'runs', runs: [{ i_start: D + '.0.1.1', width: '26' }, { i_start: '1.0.1.0.1003.0.1.1', width: '4' }] } },
  [FAKE.keyOf('op', { frame: F.findLinksV(D, 1, 30) })]: { result: { as_of: 1, resp: 'addrs', addrs: [] } },
};

/** @type {ReturnType<typeof FAKE.create>} */
let fake;

/** mid: a depth-0 document's box 120 px across, its type far below the readable threshold */
const MID = 120 / DOC_W;
/** the camera over a document's centre at a scale */
const over = (/** @type {string} */ doc, /** @type {number} */ scale) => { const b = docBox(doc); CAM.set({ x: b.x + b.w / 2, y: b.y + b.h / 2, scale }); };

before(async () => {
  REC._reset();
  fake = FAKE.create(script);
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.setBoard({ board: 'b-1', name: '', origin: '' }); REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  REC.takeIndex(/** @type {any} */ ({ docs: [{ doc: D, kind: 'edition', label: 'd', standing: 'public' }], counts: [{ account: '1.0.1', documents: 1 }], state: { arm: 'complete' } }));
  CAM.setViewport(1440, 900);
  await PUMP.loadWhole(D);
  assert.deepEqual(REC.doc(D).blocks.map((b) => b.pos), [1, 11, 27]);
  assert.deepEqual(fake.unanswered, []);
});

test('at mid the line names the account under the camera, never the walk\'s document or a position, and the box opens holding it (foundations §2.2; B1-S2)', async () => {
  await WALK.focusTo(D, 15);
  over(D, MID);
  assert.equal(lodOf(CAM.cam.scale).name, 'mid');
  const account = { text: '1 › 1.0.1', addr: '1.0.1', doc: null, pos: null, member: null, whole: false };
  assert.deepEqual(LINE.addressDisplay(), account, 'the walk still on the span the landing named: the line names the account, no document and no position');
  assert.equal(LINE.currentAddress(), '1.0.1', 'the LEAP box opens holding the address the line shows');
  // the re-take at mid's grain stands the walk on the document itself
  await WALK.retakeFromView(true);
  assert.deepEqual([WALK.current()?.kind, WALK.current()?.addr], ['document', D]);
  assert.deepEqual(LINE.addressDisplay(), account, 'the walk on the document: still the account');
  assert.equal(LINE.currentAddress(), '1.0.1');
  // the camera over the next account's region, the walk left on D: the account named is the camera's
  const c = accountCell('1.0.2');
  CAM.set({ x: c.x + c.w / 2, y: c.y + c.h / 2, scale: MID });
  assert.deepEqual(LINE.addressDisplay(), { ...account, text: '1 › 1.0.2', addr: '1.0.2' }, 'the account under the camera, not the walk\'s');
  assert.equal(LINE.currentAddress(), '1.0.2');
});

test('at reading scale the line names the document and the position the landing named, and the box opens holding the document', async () => {
  for (const [band, scale] of /** @type {Array<[string, number]>} */ ([['mid~near', 9.5 / REP_FS], ['near', 14 / REP_FS]])) {
    over(D, scale);
    assert.equal(lodOf(CAM.cam.scale).name, band);
    await WALK.focusTo(D, 15);
    assert.deepEqual(LINE.addressDisplay(), { text: `1 › 1.0.1 › ${D} › ${t('F.position', { p: 15 })}`, addr: D, doc: D, pos: 15, member: null, whole: false }, `${band}: board › account › document › position`);
    assert.equal(LINE.currentAddress(), D, `${band}: the box holds the document`);
  }
});

test('at far scale the line names the board, the whole board in view at its clamp, and the box opens holding the board', async () => {
  const whole = CAM.viewForCell(boardCell('1'), 0.92);
  CAM.set(whole);
  assert.equal(lodOf(CAM.cam.scale).name, 'far~mid', 'WHOLE BOARD on this viewport');
  const board = { text: '1 · ' + t('B1.clamp'), addr: '1', doc: null, pos: null, member: null, whole: true };
  // the walk on the board, as WHOLE BOARD lands it
  await WALK.focusTo('1', null);
  assert.deepEqual(LINE.addressDisplay(), board);
  assert.equal(LINE.currentAddress(), '1', 'the box holds the board, never the account the arithmetic finds at the board\'s centre');
  // the walk left on a span, as a zoom out leaves it until the re-take
  await WALK.focusTo(D, 15);
  assert.deepEqual(LINE.addressDisplay(), board);
  assert.equal(LINE.currentAddress(), '1', 'the box holds the board, never the walk\'s document');
  CAM.set({ ...whole, scale: whole.scale / 4 });
  assert.equal(lodOf(CAM.cam.scale).name, 'far');
  assert.equal(LINE.currentAddress(), '1');
});

test('a restart the shell re-opened leaves the acting-as segment as it stood: no signed-out words, no sign-in (client.md §4b.2)', () => {
  const was = LINE.actingSegment();
  assert.equal(was.state, 2, 'acting as, through the signed session');
  fake.fire('session-died', { session: 's-1', reason: { arm: 'restart', reopened: true, session: 's-9' } });
  assert.deepEqual(LINE.actingSegment(), was, 'the same words and state under the re-opened session');
  assert.ok(!LINE.actingSegment().html.includes('data-act="signin"'), 'no sign-in offered');
});
