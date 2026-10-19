// M-REC's test: the index from `places`, blocks tiling their bytes, the feed
// keeping the index and invalidating, the system account held and marked.
import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import * as REC from './records.js';

beforeEach(() => REC._reset());

const PLACES = {
  docs: [
    { doc: '1.0.1.0.3', kind: 'edition', label: '# skep-ux-design', standing: 'public' },
    { doc: '1.0.1.0.4', kind: 'edition', label: '## The artifact chain', standing: 'public' },
    { doc: '1.0.1.0.2', kind: 'draft', label: 'staging', standing: 'yours_to_read' },
    { doc: '1.0.2.0.1', kind: 'edition', label: null, standing: 'public' },
    { doc: '1.1.0.1.0.2', kind: 'edition', label: null, standing: 'public' },
  ],
  counts: [{ account: '1.0.1', documents: 3 }, { account: '1.0.2', documents: 1 }, { account: '1.1.0.1', documents: 1 }],
  state: { arm: 'at_the_floor', floor: 8265 },
};

test('the index is built from places: rows, counts, the state and its floor', () => {
  REC.takeIndex(/** @type {any} */ (PLACES));
  assert.equal(REC.places().length, 5);
  assert.deepEqual(REC.countOf('1.0.1'), { documents: 3, exact: false });
  assert.equal(REC.floor(), 8265);
  assert.deepEqual(REC.landmarks().map((p) => p.doc), ['1.0.2.0.1']);
  assert.equal(REC.doc('1.0.1.0.2').kind, 'draft');
});

test('the system account\'s rows are held and marked, never a landmark', () => {
  REC.takeIndex(/** @type {any} */ (PLACES));
  const h = REC.place('1.1.0.1.0.2');
  assert.ok(h && h.system);
  assert.ok(REC.accounts().find((a) => a.account === '1.1.0.1')?.system);
  assert.ok(!REC.landmarks().some((p) => p.system));
});

test('a delivery becomes blocks that tile the run in bytes; adjacent runs merge', () => {
  REC.takeSpanSet('1.0.1.0.3', [{ subspace: 1, ordinal: 1, positions: 30 }]);
  REC.takeDelivery('1.0.1.0.3', [{ pos: 1, width: 10, kind: 'content', text: 'Tumbler.\n\n', ref: null, origin: null }]);
  REC.takeDelivery('1.0.1.0.3', [{ pos: 11, width: 7, kind: 'content', text: 'é node', ref: null, origin: null }, { pos: 18, width: 3, kind: 'withheld', text: '', ref: null, origin: '1.0.1.0.2' }]);
  const d = REC.doc('1.0.1.0.3');
  assert.equal(d.runs.length, 2, 'the two content runs merged, the withheld apart');
  assert.deepEqual(d.blocks.map((b) => [b.pos, b.width, b.kind]), [[1, 10, 'para'], [11, 7, 'para'], [18, 3, 'withheld']]);
  assert.equal(d.blocks[0].text, 'Tumbler.');
  assert.equal(d.blocks[1].text, 'é node');
  assert.equal(REC.blockAt('1.0.1.0.3', 13)?.pos, 11);
  assert.equal(REC.textBetween('1.0.1.0.3', 1, 8), 'Tumbler');
  assert.equal(REC.textBetween('1.0.1.0.3', 11, 13), 'é', 'a two-byte character cut at byte positions');
  assert.equal(d.from, 1); assert.equal(d.to, 21);
});

test('the origins from an image mark the transcluded runs', () => {
  REC.takeDelivery('1.0.1.0.3', [{ pos: 1, width: 10, kind: 'content', text: 'abcdefghij', ref: null, origin: null }]);
  REC.takeOrigins('1.0.1.0.3', 1, [{ iStart: '1.0.1.0.3.0.1.1', width: 4 }, { iStart: '1.0.1.0.1003.0.1.1', width: 6 }]);
  assert.deepEqual(REC.doc('1.0.1.0.3').origins, [{ pos: 5, width: 6, doc: '1.0.1.0.1003' }]);
});

test('links: the raw set per document, each read once', () => {
  REC.takeLinks('1.0.1.0.3', ['1.0.1.0.3.0.2.1', '1.0.1.0.1.0.2.1']);
  assert.deepEqual(REC.unreadLinks('1.0.1.0.3').sort(), ['1.0.1.0.1.0.2.1', '1.0.1.0.3.0.2.1']);
  REC.takeLink({ addr: '1.0.1.0.3.0.2.1', from: [], to: [], type: '1.1.0.1.0.1.0.3.13' });
  assert.equal(REC.linksTouching('1.0.1.0.3').length, 1);
  assert.equal(REC.link('1.0.1.0.3.0.2.1')?.home, '1.0.1.0.3');
  assert.equal(REC.link('1.0.1.0.3.0.2.1')?.owner, '1.0.1');
});

test('a feed row names a document: the place is kept, what was held is dropped; a system row is marked', () => {
  REC.takeIndex(/** @type {any} */ (PLACES));
  REC.takeDelivery('1.0.1.0.3', [{ pos: 1, width: 5, kind: 'content', text: 'hello', ref: null, origin: null }]);
  REC.applyFeedUpdate(/** @type {any} */ ({ position: 12323, at: 12323, op: 'publish', docs: ['1.0.1.0.3.3'], class: 'published' }));
  assert.equal(REC.doc('1.0.1.0.3').from, -1, 'the trunk invalidated');
  REC.applyFeedUpdate(/** @type {any} */ ({ position: 12324, at: 12324, op: 'create_new_document', docs: ['1.0.1.0.1013'], class: 'drafts', session: 's-1' }));
  assert.equal(REC.place('1.0.1.0.1013')?.kind, 'draft');
  assert.equal(REC.countOf('1.0.1').documents, 4);
  REC.applyFeedUpdate(/** @type {any} */ ({ position: 12325, at: 12325, op: 'publish', docs: ['1.1.0.1.0.2.9'], class: 'published', key: 'system' }));
  assert.ok(REC.place('1.1.0.1.0.2')?.system);
  assert.equal(REC.feedRows().length, 3);
});

test('a session is a reference, never a token; the death signal drops it', () => {
  REC.setSession({ session: 's-abc', principal: 1, account: '1.0.1' });
  assert.equal(REC.session()?.account, '1.0.1');
  REC.sessionDied({ arm: 'closed' });
  assert.equal(REC.session(), null);
  assert.equal(REC.deathReason()?.arm, 'closed');
});
