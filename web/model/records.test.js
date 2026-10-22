// M-REC's test: the index from `places`, each answer replacing the one
// before it whole, blocks tiling their bytes, a document's blocks and runs
// replaced whole and never edited in place (T-LAYER maps an article's
// positions, and copies its bytes, through the blocks and runs it was made
// from), the feed keeping the index and invalidating, the system account
// held and marked, the death dropping every read held at the session's class.
// A link homed at a version member keeps the member as its home, its owner
// the member's account, and a link made there drops what was held of the
// member and of its trunk, whatever the row names (a mutant that reads the
// home as the trunk turns red).
// A link's stored span placed through the held V→I image, never at its
// stored ordinal: moved by an edit, cut in two, held twice, minted under a
// member's chain, no longer held, outside the window read (a mutant that
// places a span at its stored ordinal, compares the trunk alone, or keeps the
// first stretch turns red); an end held by the trunk its span's address lies
// under, read or not, and by any other document whose held text places it —
// a passage transcluded, a member's bytes (a mutant that holds by the span's
// address alone, or by the held text alone, turns red); `project`'s answers
// held in the text's order until the document projected into is dropped, and
// every document holding the link made again as they arrive and go (a mutant
// that bumps no revision leaves an article titled from a projection no longer
// held). The key store read for this board: a key present only where a
// binding names its origin as the binding's whole first field — never
// another origin whose text begins with this one's (a mutant that finds the
// origin anywhere in the binding turns red), never a key bound nowhere — and
// the reader the arms are decided for keeping it through a session's death.
// Every drop of an address counted — by `invalidate`, its record held or not
// and none made for it, and by a death, every address's — and no read taken
// moving the count (a mutant that counts no death turns red).
import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import * as REC from './records.js';
import { resolveSpan } from './address.js';

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

/** a record's copy of its index row */
const rowOf = (/** @type {string} */ addr) => { const d = REC.doc(addr); return [d.kind, d.label, d.standing]; };

test('an index replaces the one before it whole: a record the new one does not list keeps none of its row, its kind its metadata\'s where read', () => {
  REC.takeIndex(/** @type {any} */ (PLACES));
  REC.takeMetadata('1.0.1.0.4', { doc: '1.0.1.0.4', published: true, owner: '1.0.1', birth: null, birthExtent: null, placed: null, baseExtent: null, source: null, asOf: 1 });
  REC.takeIndex(/** @type {any} */ ({ docs: PLACES.docs.filter((p) => p.doc !== '1.0.1.0.2' && p.doc !== '1.0.1.0.4'), counts: [{ account: '1.0.1', documents: 1 }], state: { arm: 'complete' } }));
  assert.equal(REC.place('1.0.1.0.2'), undefined);
  assert.deepEqual(rowOf('1.0.1.0.2'), ['unknown', null, null], 'the draft the new index does not list: no kind, label or standing of the old row');
  assert.deepEqual(rowOf('1.0.1.0.4'), ['edition', null, null], 'its kind its metadata\'s where read');
  assert.deepEqual(rowOf('1.0.1.0.3'), ['edition', '# skep-ux-design', 'public'], 'a record the new index lists, its row');
});

test('the death drops every read held at the session\'s class — the index, each document\'s delivered state and row, the links and where they project, the owners and key sets, the drafts rows — and the runs a reader took stand as they were', () => {
  REC.takeIndex(/** @type {any} */ (PLACES));
  REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  REC.takeSpanSet('1.0.1.0.2', [{ subspace: 1, ordinal: 1, positions: 12 }, { subspace: 2, ordinal: 1, positions: 1 }]);
  REC.takeDelivery('1.0.1.0.2', [{ pos: 1, width: 12, kind: 'content', text: 'draft words.', ref: null, origin: null }]);
  REC.takeMetadata('1.0.1.0.2', { doc: '1.0.1.0.2', published: false, owner: '1.0.1', birth: null, birthExtent: null, placed: null, baseExtent: null, source: null, asOf: 1 });
  REC.takeImage('1.0.1.0.3', 1, [{ iStart: '1.0.1.0.2.0.1.1', width: 4 }]);
  REC.takeProjection('1.0.1.0.2.0.2.1', 2, '1.0.1.0.4', [{ pos: 3, width: 2 }]);
  REC.takeMembers('1.0.1.0.3', 2);
  REC.takeRefused('1.0.2.0.1', 'withheld');
  REC.takeLinks('1.0.1.0.3', ['1.0.1.0.2.0.2.1']);
  REC.takeLink({ addr: '1.0.1.0.2.0.2.1', from: [], to: [], type: null });
  REC.takeOwner('1.0.1.1', { prefix: '1.0.1', principal: 1 });
  REC.takeKeySet('1.0.1', { enrolled: [], retired: [] });
  REC.applyFeedUpdate(/** @type {any} */ ({ position: 12324, at: 12324, op: 'create_new_document', docs: ['1.0.1.0.1013'], class: 'drafts', session: 's-1' }));
  REC.applyFeedUpdate(/** @type {any} */ ({ position: 12325, at: 12325, op: 'publish', docs: ['1.0.1.0.4.2'], class: 'published' }));
  const taken = REC.doc('1.0.1.0.2').runs;
  REC.sessionDied({ arm: 'closed' });
  assert.deepEqual([REC.session(), REC.deathReason()], [null, { arm: 'closed' }]);
  assert.deepEqual([REC.places(), REC.accounts(), REC.indexState(), REC.countOf('1.0.1').documents], [[], [], null, 0], 'the index, its counts and its state');
  for (const d of REC.docs()) {
    assert.deepEqual([d.from, d.runs, d.blocks, d.extent, d.whole, d.linkPositions, d.meta, d.image, d.origins, d.imageFor, [...d.links], d.linksRead, d.members, d.refused], [-1, [], [], null, null, null, null, [], [], null, [], false, null, null], d.addr + '\'s delivered state');
    assert.deepEqual(rowOf(d.addr), ['unknown', null, null], d.addr + '\'s row');
  }
  assert.deepEqual([REC.links(), REC.projection('1.0.1.0.2.0.2.1', 2, '1.0.1.0.4'), REC.ownerOf('1.0.1.1'), REC.keySetOf('1.0.1')], [[], undefined, undefined, undefined], 'the links and where they project, the owners and the key sets');
  assert.deepEqual(REC.feedRows().map((r) => r.cls), ['published'], 'the published row held, the drafts row dropped');
  assert.equal(REC.textOf(taken, 1, 13), 'draft words.', 'the runs a reader took before the death read as they stood');
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

test('a document\'s blocks and runs are replaced whole, never edited in place: the ones a reader took stand as they were', () => {
  REC.takeDelivery('1.0.1.0.3', [{ pos: 1, width: 12, kind: 'content', text: 'alpha\n\nbeta ', ref: null, origin: null }]);
  const taken = REC.doc('1.0.1.0.3').blocks, runs = REC.doc('1.0.1.0.3').runs;
  const was = JSON.stringify([taken, runs]);
  REC.takeDelivery('1.0.1.0.3', [{ pos: 13, width: 5, kind: 'content', text: 'gamma', ref: null, origin: null }]);
  assert.notEqual(REC.doc('1.0.1.0.3').blocks, taken, 'a delivery makes the document new blocks');
  assert.notEqual(REC.doc('1.0.1.0.3').runs, runs, 'and new runs, the run it joins copied');
  assert.deepEqual(REC.doc('1.0.1.0.3').blocks.map((b) => b.text), ['alpha', 'beta gamma']);
  REC.invalidate('1.0.1.0.3');
  REC.takeDelivery('1.0.1.0.3', [{ pos: 5, width: 4, kind: 'content', text: 'a\n\nb', ref: null, origin: null }]);
  REC.applyFeedUpdate(/** @type {any} */ ({ position: 12323, at: 12323, op: 'publish', docs: ['1.0.1.0.3.3'], class: 'published' }));
  assert.equal(JSON.stringify([taken, runs]), was, 'the blocks and runs taken before the delivery, the invalidation, the second delivery and the feed row are as they were');
  assert.deepEqual([REC.textOf(runs, 1, 13), REC.blockIn(taken, 8)?.text], ['alpha\n\nbeta ', 'beta '], 'their text and their blocks read as they stood');
  assert.deepEqual([REC.textBetween('1.0.1.0.3', 1, 13), REC.blockAt('1.0.1.0.3', 8)], ['', null], 'the model\'s newest is another');
});

test('the origins from an image mark the transcluded runs', () => {
  REC.takeDelivery('1.0.1.0.3', [{ pos: 1, width: 10, kind: 'content', text: 'abcdefghij', ref: null, origin: null }]);
  REC.takeImage('1.0.1.0.3', 1, [{ iStart: '1.0.1.0.3.0.1.1', width: 4 }, { iStart: '1.0.1.0.1003.0.1.1', width: 6 }]);
  assert.deepEqual(REC.doc('1.0.1.0.3').origins, [{ pos: 5, width: 6, doc: '1.0.1.0.1003' }]);
});

/** a link's stored span in a document's I-space, as `read_link` spells it */
const stored = (/** @type {string} */ space, /** @type {number} */ ord, /** @type {number} */ w) => resolveSpan({ start: `${space}.${ord}`, width: space.split('.').map(() => '0').join('.') + '.' + w });

test('a link\'s stored span stands where the held image puts its bytes now — never at its stored ordinal: moved by an edit, cut in two, held twice, minted under a member\'s chain, no longer held', () => {
  const D = '1.0.1.0.3', OWN = D + '.0.1', MEMBER = D + '.2.0.1';
  // D's text as its second member arranges it: twenty bytes the member minted, D's own first thirty, a window of five bytes of
  // 1.0.1.0.7, D's own 31st to 40th, and its own 10th to 14th again, copied
  REC.takeImage(D, 1, [
    { iStart: MEMBER + '.1', width: 20 }, { iStart: OWN + '.1', width: 30 }, { iStart: '1.0.1.0.7.0.1.4', width: 5 },
    { iStart: OWN + '.31', width: 10 }, { iStart: OWN + '.10', width: 5 },
  ]);
  assert.deepEqual(REC.placed(D, stored(OWN, 5, 3)), [{ pos: 25, width: 3 }], 'stored at 5: moved past the member\'s twenty bytes');
  assert.deepEqual(REC.placed(D, stored(OWN, 28, 6)), [{ pos: 48, width: 3 }, { pos: 56, width: 3 }], 'cut in two by the window, the gap not held');
  assert.deepEqual(REC.placed(D, stored(OWN, 11, 2)), [{ pos: 31, width: 2 }, { pos: 67, width: 2 }], 'held twice: at both places, in the text\'s order');
  assert.deepEqual(REC.placed(D, stored(MEMBER, 3, 2)), [{ pos: 3, width: 2 }], 'minted under the member\'s chain: its own I-space, never the trunk\'s');
  assert.deepEqual(REC.placed(D, stored(OWN, 41, 4)), [], 'no longer in the text: nowhere');
  assert.deepEqual(REC.placed(D, resolveSpan({ start: D, width: '0.0.0.0.1' })), [], 'a document named whole: no position');
  assert.deepEqual(REC.placed('1.0.1.0.4', stored('1.0.1.0.4.0.1', 1, 2)), [], 'no image held: nowhere');
});

test('a document holds a link\'s end where it is the trunk the span\'s address lies under, its text read or not, or where its held text places it — a passage it transcludes, a member\'s bytes, shared with its trunk or minted under its chain; a span naming a document whole is no passage', () => {
  const D = '1.0.1.0.3', M = D + '.2', S = '1.0.2.0.9';
  const own = stored(D + '.0.1', 5, 3), theirs = stored(S + '.0.1', 2, 4);
  assert.deepEqual([REC.holdsEnd(D, own), REC.holdsEnd(D, stored(M + '.0.1', 1, 2)), REC.holdsEnd(D, theirs)], [true, true, false], 'no image read: by their address alone, D\'s own bytes and the bytes minted under its member\'s chain, another document\'s not');
  // D's own first ten bytes, then six of S's it transcludes
  REC.takeImage(D, 1, [{ iStart: D + '.0.1.1', width: 10 }, { iStart: S + '.0.1.1', width: 6 }]);
  assert.deepEqual([REC.holdsEnd(D, own), REC.holdsEnd(D, theirs), REC.holdsEnd(D, stored(S + '.0.1', 8, 2))], [true, true, false], 'the image read: the passage it transcludes held, bytes of S its text does not hold not');
  assert.equal(REC.holdsEnd(S, theirs), true, 'S holds its own, its text never read');
  // the second member: four bytes minted under its chain, then its trunk's first ten
  REC.takeImage(M, 1, [{ iStart: M + '.0.1.1', width: 4 }, { iStart: D + '.0.1.1', width: 10 }]);
  assert.deepEqual([REC.holdsEnd(M, own), REC.holdsEnd(M, stored(M + '.0.1', 1, 2)), REC.holdsEnd(M, theirs)], [true, true, false], 'the member: the bytes it shares with its trunk and the ones minted under its chain, never what its text does not hold');
  assert.equal(REC.holdsEnd(D, resolveSpan({ start: D, width: '0.0.0.0.1' })), false, 'a document named whole: no passage');
});

test('a stored span over image runs that adjoin in the text stands as one stretch; one outside the window the image was read for stands nowhere', () => {
  const D = '1.0.1.0.3', OWN = D + '.0.1';
  REC.takeImage(D, 101, [{ iStart: OWN + '.101', width: 10 }, { iStart: OWN + '.111', width: 10 }]);
  assert.deepEqual(REC.placed(D, stored(OWN, 108, 6)), [{ pos: 108, width: 6 }], 'across the two runs: one stretch');
  assert.deepEqual(REC.placed(D, stored(OWN, 50, 4)), [], 'outside the window read: not placed, whatever the text holds there');
});

test('where a link\'s slot projects is held in the text\'s order until the document projected into is dropped — its record held or not, by a feed row or the death — and every document holding the link is made again as it arrives and as it goes', () => {
  const D = '1.0.1.0.3', FAR = '1.0.1.0.127', L = D + '.0.2.1';
  REC.takeLinks(D, [L]);
  let rev = REC.doc(D).rev;
  REC.takeProjection(L, 2, FAR, [{ pos: 20, width: 5 }, { pos: 3, width: 4 }]);
  assert.deepEqual(REC.projection(L, 2, FAR), [{ pos: 3, width: 4 }, { pos: 20, width: 5 }], 'in the text\'s order, whatever order the answer named');
  assert.ok(REC.doc(D).rev > rev, 'the document holding the link is made again as the projection arrives');
  assert.equal(REC.has(FAR), false, 'no record of the far document needed');
  REC.takeProjection(L, 1, D, []);
  REC.takeProjection(D + '.0.2.2', 2, '1.0.1.0.9', 'refused');
  assert.deepEqual([REC.projection(L, 1, D), REC.projection(D + '.0.2.2', 2, '1.0.1.0.9'), REC.projection(L, 1, FAR)], [[], 'refused', undefined], 'a floating end held as none, a refusal as refused, one never asked as nothing');
  rev = REC.doc(D).rev;
  REC.applyFeedUpdate(/** @type {any} */ ({ position: 12330, at: 12330, op: 'publish', docs: [FAR + '.2'], class: 'published' }));
  assert.equal(REC.projection(L, 2, FAR), undefined, 'a feed row naming the far document drops where the slot projects into it');
  assert.ok(REC.doc(D).rev > rev, 'and the document holding the link is made again');
  REC.sessionDied({ arm: 'closed' });
  assert.equal(REC.projection(D + '.0.2.2', 2, '1.0.1.0.9'), undefined, 'the death drops the rest');
});

test('every drop of an address is counted — by invalidate, its record held or not and none made for it, and by a death, every address\'s — and no read taken moves the count', () => {
  const D = '1.0.1.0.3', FAR = '1.0.1.0.127', L = D + '.0.2.1';
  REC.takeIndex(/** @type {any} */ (PLACES));
  REC.takeSpanSet(D, [{ subspace: 1, ordinal: 1, positions: 5 }]);
  REC.takeMetadata(D, { doc: D, published: true, owner: '1.0.1', birth: D + '.1', birthExtent: 5, placed: null, baseExtent: null, source: null, asOf: 1 });
  REC.takeDelivery(D, [{ pos: 1, width: 5, kind: 'content', text: 'hello', ref: null, origin: null }]);
  REC.takeImage(D, 1, [{ iStart: D + '.0.1.1', width: 5 }]);
  REC.takeLinks(D, [L]);
  REC.takeLink({ addr: L, from: [], to: [], type: null });
  REC.takeProjection(L, 2, FAR, [{ pos: 3, width: 4 }]);
  REC.takeMembers(D, 2);
  assert.deepEqual([REC.dropsOf(D), REC.dropsOf(FAR)], [0, 0], 'the index, a delivery, its image, its links and a projection taken: nothing dropped');
  REC.invalidate(FAR);
  assert.deepEqual([REC.dropsOf(FAR), REC.has(FAR), REC.dropsOf(D)], [1, false, 0], 'an address whose record is not held: counted, no record made, no other address\'s count moved');
  REC.applyFeedUpdate(/** @type {any} */ ({ position: 12330, at: 12330, op: 'publish', docs: [D + '.2'], class: 'published' }));
  assert.deepEqual([REC.dropsOf(D), REC.dropsOf(D + '.2')], [1, 1], 'a feed row: the trunk and the member it names');
  REC.takeDelivery(D, [{ pos: 1, width: 5, kind: 'content', text: 'hello', ref: null, origin: null }]);
  REC.takeProjection(L, 2, FAR, [{ pos: 3, width: 4 }]);
  assert.deepEqual([REC.dropsOf(D), REC.dropsOf(FAR)], [1, 1], 'what is read again after a drop moves no count back');
  REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  REC.sessionDied({ arm: 'closed' });
  assert.deepEqual([REC.dropsOf(D), REC.dropsOf(FAR), REC.dropsOf('1.0.2.0.9')], [2, 2, 1], 'a death: every address once more, one never read among them');
});

test('links: the raw set per document, each read once', () => {
  REC.takeLinks('1.0.1.0.3', ['1.0.1.0.3.0.2.1', '1.0.1.0.1.0.2.1']);
  assert.deepEqual(REC.unreadLinks('1.0.1.0.3').sort(), ['1.0.1.0.1.0.2.1', '1.0.1.0.3.0.2.1']);
  REC.takeLink({ addr: '1.0.1.0.3.0.2.1', from: [], to: [], type: '1.1.0.1.0.1.0.3.13' });
  assert.equal(REC.linksTouching('1.0.1.0.3').length, 1);
  assert.equal(REC.link('1.0.1.0.3.0.2.1')?.home, '1.0.1.0.3');
  assert.equal(REC.link('1.0.1.0.3.0.2.1')?.owner, '1.0.1');
});

test('a link homed at a version member keeps the member as its home, never its trunk; a link made there drops what was held of the member and of its trunk', () => {
  const D = '1.0.1.0.2', M = D + '.2';
  REC.takeLink({ addr: M + '.0.2.1', from: [], to: [], type: null });
  REC.takeLink({ addr: D + '.0.2.1', from: [], to: [], type: null });
  assert.deepEqual([REC.link(M + '.0.2.1')?.home, REC.link(M + '.0.2.1')?.owner], [M, '1.0.1'], 'homed at the second member, its owner the member\'s account');
  assert.equal(REC.link(D + '.0.2.1')?.home, D, 'homed at the document');
  for (const addr of [D, M]) REC.takeDelivery(addr, [{ pos: 1, width: 5, kind: 'content', text: 'hello', ref: null, origin: null }]);
  REC.applyFeedUpdate(/** @type {any} */ ({ position: 12330, at: 12330, op: 'make_link', docs: null, class: 'published', link: M + '.0.2.2' }));
  assert.deepEqual([REC.doc(D).from, REC.doc(M).from], [-1, -1], 'the row naming neither: the member the new link is homed at and its trunk both dropped');
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

test('the key store is read for this board: a key is present only where a binding names its origin whole, and the reader keeps it through a session\'s death', () => {
  const O = 'http://127.0.0.1:8642';
  /** a key of the store as `fingerprint` answers it, bound where its bindings say */
  const key = (/** @type {string[]} */ bindings) => ({ fingerprint: 'e4272902a11439e5', label: 'dev-notebook', bindings, unbound: !bindings.length, payload: null });
  assert.deepEqual(REC.reader(), { account: null, keyPresent: false }, 'nothing read: a guest with no key');
  REC.takeKeyStore([key([]), key([`${O} principal 1 account 1.0.1`])], O);
  assert.deepEqual(REC.reader(), { account: null, keyPresent: true }, 'a guest whose device holds a key bound at this board');
  REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  assert.deepEqual(REC.reader(), { account: '1.0.1', keyPresent: true }, 'signed in');
  REC.sessionDied({ arm: 'closed' });
  assert.deepEqual(REC.reader(), { account: null, keyPresent: true }, 'the death ends the session and leaves the device\'s store standing');
  REC.takeKeyStore([key(['http://127.0.0.1:86420 principal 1 account 1.0.1'])], O);
  assert.equal(REC.keyPresent(), false, 'a binding at another origin whose text begins with this one\'s');
  REC.takeKeyStore([key(['http://127.0.0.1:9000 principal 1 account 1.0.1']), key([])], O);
  assert.equal(REC.keyPresent(), false, 'keys bound at another board, or nowhere');
  REC.takeKeyStore([], O);
  assert.equal(REC.keyPresent(), false, 'no key at all');
  REC.takeKeyStore([key(['http://127.0.0.1:9000 principal 2 account 1.0.2', `${O} principal 3 account 1.0.3`])], O);
  assert.equal(REC.keyPresent(), true, 'a key bound here among its other bindings, whatever its principal');
});

test('a session is a reference, never a token; the death signal drops it', () => {
  REC.setSession({ session: 's-abc', principal: 1, account: '1.0.1' });
  assert.equal(REC.session()?.account, '1.0.1');
  REC.sessionDied({ arm: 'closed' });
  assert.equal(REC.session(), null);
  assert.equal(REC.deathReason()?.arm, 'closed');
});
