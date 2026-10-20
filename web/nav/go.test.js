// N-GO's test against the FAKE PORT: a follow lands on the span its link's
// far end projects to NOW and lights the arrival mark on that span — its
// first position and its positions, never the position alone (a mutant that
// drops the projection's width turns red); a LEAP puts it out, and Back to
// the follow's entry lights it again on the same span (a mutant that
// re-lights it from the entry's position alone turns red); a link naming the
// far document whole lights it at the document's first position, no width.
import { test, before } from 'node:test';
import assert from 'node:assert/strict';
import * as PORT from '../bridge/port.js';
import * as REC from '../model/records.js';
import * as PUMP from '../model/pump.js';
import * as F from '../model/frames.js';
import * as FAKE from '../test/fake-port.js';
import * as CAM from '../plane/camera.js';
import * as LK from '../links/links.js';
import * as TRAIL from './trail.js';
import * as GO from './go.js';

const D = '1.0.1.0.3', FAR = '1.0.1.0.127', CITE = '1.1.0.1.0.1.0.3.13';
const NEAR_TEXT = 'Tumbler.\n\nThe first field.', FAR_TEXT = 'The far edition.\n\nIts cited passage stands here.';
const NEAR_EXTENT = NEAR_TEXT.length, FAR_EXTENT = FAR_TEXT.length;
const span = (/** @type {string} */ doc, /** @type {number} */ ord, /** @type {number} */ w) => ({ start: `${doc}.0.1.${ord}`, width: '0.0.0.0.0.0.0.' + w, doc, account: '1.0.1', whole: false, subspace: 1, ordinal: ord, positions: w });
const whole = (/** @type {string} */ doc) => ({ start: doc, width: '0.0.0.0.1', doc, account: '1.0.1', whole: true, subspace: null, ordinal: null, positions: null });
// the person's citations from the first edition: one of a passage of FAR, one of FAR whole
const PASSAGE = D + '.0.2.1', WHOLE = D + '.0.2.2';

/** the reads of a document read whole: its extent, its metadata, its text, its image, its links */
const reads = (/** @type {string} */ doc, /** @type {string} */ text, /** @type {string[]} */ links) => ({
  [FAKE.keyOf('op', { frame: F.retrieveDocVSpanSet(doc) })]: { result: { as_of: 1, resp: 'span_set', set: [{ start: '1.1', width: '0.' + text.length }] } },
  [FAKE.keyOf('op', { frame: F.docMetadata(doc) })]: { result: { as_of: 1, resp: 'doc_metadata', doc, published: true, owner: '1.0.1', birth: doc + '.1', birth_extent: String(text.length), placed: null, base_extent: null, source: null } },
  [FAKE.keyOf('op', { frame: F.retrieveV(doc, 1, text.length) })]: { result: { as_of: 1, resp: 'delivery', items: [{ content: text }] } },
  [FAKE.keyOf('op', { frame: F.image(doc, 1, text.length) })]: { result: { as_of: 1, resp: 'runs', runs: [{ i_start: doc + '.0.1.1', width: String(text.length) }] } },
  [FAKE.keyOf('op', { frame: F.findLinksV(doc, 1, text.length) })]: { result: { as_of: 1, resp: 'addrs', addrs: links } },
});
const script = {
  ...reads(D, NEAR_TEXT, [PASSAGE, WHOLE]),
  ...reads(FAR, FAR_TEXT, []),
  // where each citation's far end projects into FAR now: the passage at 20, five positions; FAR whole, all of it
  [FAKE.keyOf('op', { frame: F.project(PASSAGE, 2, FAR) })]: { result: { as_of: 1, resp: 'span_set', set: [{ start: '1.20', width: '0.5' }] } },
  [FAKE.keyOf('op', { frame: F.project(WHOLE, 2, FAR) })]: { result: { as_of: 1, resp: 'span_set', set: [{ start: '1.1', width: '0.' + FAR_EXTENT }] } },
};

/** @type {ReturnType<typeof FAKE.create>} */
let fake;

/** an act run to its end: the flight it starts stepped to its last frame */
async function run(/** @type {Promise<unknown>} */ act) {
  let done = false;
  act.then(() => { done = true; });
  for (let i = 0; i < 200 && !done; i++) { await new Promise((r) => setTimeout(r, 0)); if (CAM.flying()) CAM.step(Infinity); }
  assert.ok(done, 'the act ran to its end');
}
/** a citation as LK draws it at the first edition */
const drawn = (/** @type {string} */ link) => /** @type {import('../links/links.js').Shown} */ (LK.shown(D).find((s) => s.link.addr === link));

before(async () => {
  REC._reset(); LK._reset(); TRAIL._reset();
  fake = FAKE.create(script);
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.setBoard({ board: 'b-1', name: '', origin: '' }); REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  REC.takeIndex(/** @type {any} */ ({ docs: [{ doc: D, kind: 'edition', label: 'd', standing: 'public' }, { doc: FAR, kind: 'edition', label: 'far', standing: 'public' }], counts: [{ account: '1.0.1', documents: 2 }], state: { arm: 'complete' } }));
  CAM.setViewport(1440, 900);
  REC.takeLink({ addr: PASSAGE, from: [span(D, 11, 5)], to: [span(FAR, 20, 5)], type: CITE });
  REC.takeLink({ addr: WHOLE, from: [span(D, 17, 5)], to: [whole(FAR)], type: CITE });
  await PUMP.loadWhole(D);
  assert.deepEqual(LK.shown(D).map((s) => [s.link.addr, s.farWhole]), [[PASSAGE, false], [WHOLE, true]]);
  await GO.launch();
});

test('a follow lights the arrival mark on the span its link\'s far end projects to: its first position and its positions', async () => {
  await run(GO.follow(drawn(PASSAGE)));
  assert.deepEqual(GO.arrivalMark(), { addr: FAR, pos: 20, width: 5, link: PASSAGE });
  const e = TRAIL.current();
  assert.deepEqual(e && [e.addr, e.pos, e.width, e.link], [FAR, 20, 5, PASSAGE], 'the landing\'s entry carries the span');
  assert.deepEqual(fake.unanswered, []);
});

test('a LEAP puts the arrival out; Back to the follow\'s entry lights it again on the same span', async () => {
  await run(GO.leapTo(D));
  assert.equal(GO.arrivalMark(), null);
  await run(GO.back());
  assert.deepEqual(GO.arrivalMark(), { addr: FAR, pos: 20, width: 5, link: PASSAGE });
  assert.deepEqual(fake.unanswered, []);
});

test('a link naming the far document whole lights the arrival at the document\'s first position, no width', async () => {
  await run(GO.follow(drawn(WHOLE)));
  assert.deepEqual(GO.arrivalMark(), { addr: FAR, pos: 1, width: null, link: WHOLE });
  assert.deepEqual(fake.unanswered, []);
});
