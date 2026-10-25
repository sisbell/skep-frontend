// M-REC's test: the index built from `places` and kept by the feed, each
// listing replacing the last whole with the rows taken meanwhile laid over
// it; deliveries into blocks that tile their bytes, each typed line one, runs
// and blocks replaced whole and never edited in place; a link's stored span placed through the
// held V→I image, and an end held by the trunk its address lies under or by
// the text that places it; a stretch named by identity and placed back
// through any image; projections, edition claims and failed reads held until
// their drops, every drop counted; a bare row's mark, a newer member taking a
// trunk's text, a refresh's drop and a shown document set again in one step;
// the key store, the session's key and the byline's facts; the death
// dropping every read held at the session's class, and the cover it leaves.
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

test('a listing takes the feed rows taken while it was read laid over it, by the rules of a row taken after it, and keeps an index state taken meanwhile; with nothing taken meanwhile it is the listing exactly', () => {
  REC.setIndexState({ arm: 'complete' });
  const rows = [
    { position: 12324, at: 12324, op: 'create_new_document', docs: ['1.0.1.0.1013'], class: 'drafts', session: 's-1' },
    { position: 12325, at: 12325, op: 'publish', docs: ['1.0.1.0.2.1'], class: 'published' },
    { position: 12326, at: 12326, op: 'delegate', docs: null, class: 'published', new_prefix: '1.0.3' },
  ];
  REC.takeIndex(/** @type {any} */ (PLACES), /** @type {any} */ ({ rows, state: true }));
  assert.deepEqual(REC.placesOf('1.0.1').map((p) => [p.doc, p.kind]), [['1.0.1.0.2', 'edition'], ['1.0.1.0.3', 'edition'], ['1.0.1.0.4', 'edition'], ['1.0.1.0.1013', 'draft']], 'the draft minted meanwhile listed; the listed draft published meanwhile an edition');
  assert.equal(REC.countOf('1.0.1').documents, 4, 'the mint counted over the listing\'s three; the publish of a listed draft not counted again');
  assert.deepEqual(REC.accounts().map((a) => a.account), ['1.0.1', '1.0.2', '1.0.3', '1.1.0.1'], 'the account delegated meanwhile listed, holding no document yet');
  assert.equal(REC.indexState()?.arm, 'complete', 'the state taken meanwhile kept: the listing\'s may be older');
  REC.takeIndex(/** @type {any} */ (PLACES));
  assert.deepEqual(REC.places().map((p) => [p.doc, p.kind, p.label]), [
    ['1.0.1.0.2', 'draft', 'staging'], ['1.0.1.0.3', 'edition', '# skep-ux-design'], ['1.0.1.0.4', 'edition', '## The artifact chain'], ['1.0.2.0.1', 'edition', null], ['1.1.0.1.0.2', 'edition', null],
  ], 'nothing meanwhile: the listing\'s rows exactly');
  assert.deepEqual([rowOf('1.0.1.0.1013'), REC.countOf('1.0.1').documents, REC.accounts().map((a) => a.account), REC.indexState()], [['unknown', null, null], 3, ['1.0.1', '1.0.2', '1.1.0.1'], PLACES.state], 'its counts, its accounts and its state; the draft no listing names keeps none of its row');
});

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
    assert.deepEqual([d.from, d.runs, d.blocks, d.extent, d.whole, d.linkPositions, d.meta, d.image, d.origins, d.imageFor, [...d.links], d.linksRead, d.members, d.ended, d.refused], [-1, [], [], null, null, null, null, [], [], null, [], false, null, false, null], d.addr + '\'s delivered state');
    assert.deepEqual(rowOf(d.addr), ['unknown', null, null], d.addr + '\'s row');
  }
  assert.deepEqual([REC.links(), REC.projection('1.0.1.0.2.0.2.1', 2, '1.0.1.0.4'), REC.ownerOf('1.0.1.1'), REC.keySetOf('1.0.1')], [[], undefined, undefined, undefined], 'the links and where they project, the owners and the key sets');
  assert.deepEqual(REC.feedRows().map((r) => r.cls), ['published'], 'the published row held, the drafts row dropped');
  assert.equal(REC.textOf(taken, 1, 13), 'draft words.', 'the runs a reader took before the death read as they stood');
});

test('a document is covered where the class the page left could read it — its text, metadata or extent held, or its index listing it — and a read at the new class answers it `withheld`: never one the page never read, nor one withheld before the change; each is a box the model knows, none read at the new class before its answer (issue #177)', () => {
  const READ = '1.0.1.0.2', LISTED = '1.0.1.0.4', HELD = '1.0.2.0.7', NEVER = '1.0.3.0.9';
  REC.takeIndex(/** @type {any} */ (PLACES));
  REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  REC.takeSpanSet(READ, [{ subspace: 1, ordinal: 1, positions: 12 }]);
  REC.takeRefused(HELD, 'withheld');
  assert.deepEqual([REC.couldRead(READ), REC.coveredDocs()], [false, []], 'before any change of class: nothing could be read before, nothing covered');
  REC.sessionDied({ arm: 'closed' });
  assert.deepEqual([READ, LISTED, HELD, NEVER].map(REC.couldRead), [true, true, false, false], 'the class it left could read the draft it read and the edition its index listed; neither the document withheld from it nor one it never met');
  assert.equal(REC.known().includes(READ), false, 'dropped, the draft is no box the model knows until a read answers for it');
  for (const a of [READ, LISTED, HELD, NEVER]) REC.takeRefused(a, 'withheld');
  assert.deepEqual([READ, LISTED, HELD, NEVER].map(REC.covered), [true, true, false, false], 'each a read at the new class withholds: covered where the class it left could read it');
  assert.deepEqual(REC.coveredDocs(), [READ, LISTED]);
  assert.ok([READ, LISTED, HELD, NEVER].every((a) => REC.known().includes(a)), 'each withheld one a box the model knows: existence and owner');
  REC.setSession({ session: 's-2', principal: 1, account: '1.0.1' });
  REC.sessionDied({ arm: 'closed' });
  assert.deepEqual([REC.couldRead(READ), REC.coveredDocs()], [false, []], 'a later change: what was withheld from the class it leaves is no longer its to cover');
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

test('a content run splits at every newline: each typed line that holds a character one block — a line of spaces among them — its width through its newline and the empty lines typed after it; the newlines before its first typed line one block of no text; the blocks tiling the run', () => {
  const run = (/** @type {number} */ pos, /** @type {string} */ text) => ({ pos, width: new TextEncoder().encode(text).length, kind: /** @type {const} */ ('content'), text, ref: null, origin: null });
  const typed = REC.deriveBlocks([run(1, '## Title\nline one\n   \n\nnext')]);
  assert.deepEqual(typed.map((b) => [b.pos, b.text, b.width]), [[1, '## Title', 9], [10, 'line one', 9], [19, '   ', 5], [24, 'next', 4]], 'a heading\'s marks its own characters, each typed line its block, the empty line in the width of the line of spaces before it');
  const lead = REC.deriveBlocks([run(7, '\n\nabc\né\n')]);
  assert.deepEqual(lead.map((b) => [b.pos, b.text, b.width]), [[7, '', 2], [9, 'abc', 4], [13, 'é', 3]], 'the newlines leading the run one block of no text; a typed line\'s bytes, a two-byte character among them');
  for (const blocks of [typed, lead]) for (let i = 1; i < blocks.length; i++) assert.equal(blocks[i].pos, blocks[i - 1].pos + blocks[i - 1].width, 'the blocks tile the run');
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

test('a stretch of a held text is named by identity — the permanent addresses of its bytes, each image run it crosses cut to it — and none unless the held image covers all of it; placed back where those bytes stand now, in any text, whatever part of them it still holds (issue #152)', () => {
  const D = '1.0.1.0.3', OWN = D + '.0.1', S = '1.0.2.0.9';
  // D's own first ten bytes, six of S's from its 3rd, then D's own 11th to 20th: the image read for positions 1 to 26
  REC.takeImage(D, 1, [{ iStart: OWN + '.1', width: 10 }, { iStart: S + '.0.1.3', width: 6 }, { iStart: OWN + '.11', width: 10 }]);
  const passage = REC.identityOf(D, 8, 12);
  assert.deepEqual(passage, [{ prefix: OWN, ordinal: 8, width: 3 }, { prefix: S + '.0.1', ordinal: 3, width: 6 }, { prefix: OWN, ordinal: 11, width: 3 }], 'D\'s own 8th to 10th, S\'s 3rd to 8th, D\'s own 11th to 13th — never the positions 8 to 19');
  assert.deepEqual(REC.placedIdentity(D, passage), [{ pos: 8, width: 12 }], 'placed back where it was read: one stretch');
  assert.deepEqual([REC.identityOf(D, 20, 10), REC.identityOf('1.0.1.0.4', 1, 3)], [[], []], 'past the window the image was read for, or no image held: no identity, never a part of one');
  // D as a later edit leaves it: four bytes minted under its second member's chain first, S's six bytes gone
  REC.takeImage(D, 1, [{ iStart: D + '.2.0.1.1', width: 4 }, { iStart: OWN + '.1', width: 10 }, { iStart: OWN + '.11', width: 10 }]);
  assert.deepEqual(REC.placedIdentity(D, passage), [{ pos: 12, width: 6 }], 'moved four on, S\'s bytes no longer held: the part the text still holds, its own two stretches now adjoining as one');
  REC.takeImage(S, 1, [{ iStart: S + '.0.1.1', width: 20 }]);
  assert.deepEqual(REC.placedIdentity(S, passage), [{ pos: 3, width: 6 }], 'in S, its own bytes where S holds them');
  assert.deepEqual([REC.identityOfEnd(stored(OWN, 5, 3)), REC.identityOfEnd(resolveSpan({ start: D, width: '0.0.0.0.1' }))], [{ prefix: OWN, ordinal: 5, width: 3 }, null], 'a link\'s stored span is its bytes\' identity; a span naming a document whole names none');
});

test('a stretch is named by identity through an image held apart from the model — the one an article was made from — and placed back through another, the model\'s now or none: what a reader\'s place is carried by from the text a pane or an article shows into the text it is set again as (issue #160)', () => {
  const D = '1.0.1.0.3', OWN = D + '.0.1';
  REC.takeImage(D, 1, [{ iStart: OWN + '.1', width: 20 }]);
  const kept = REC.doc(D).image;
  // the model takes D again as an edit leaves it: five bytes minted after its old twenty set before them
  REC.takeImage(D, 1, [{ iStart: OWN + '.21', width: 5 }, { iStart: OWN + '.1', width: 20 }]);
  const now = REC.doc(D).image;
  assert.notEqual(kept, now, 'the model replaced its image whole: the one kept is the article\'s own still');
  const ids = REC.identityIn(kept, 8, 3);
  assert.deepEqual(ids, [{ prefix: OWN, ordinal: 8, width: 3 }], 'positions 8 to 10 of the text as it was, by the image kept');
  assert.deepEqual([REC.identityOf(D, 8, 3), REC.identityIn(now, 8, 3)], [[{ prefix: OWN, ordinal: 3, width: 3 }], [{ prefix: OWN, ordinal: 3, width: 3 }]], 'the model\'s now names other bytes there');
  assert.deepEqual([REC.placedIn(now, ids), REC.placedIdentity(D, ids)], [[{ pos: 13, width: 3 }], [{ pos: 13, width: 3 }]], 'the same bytes, five positions on in the text set again');
  assert.deepEqual([REC.placedIn([], ids), REC.identityIn([], 1, 3), REC.identityIn(kept, 19, 5)], [[], [], []], 'no image, or one short of the stretch: nothing named, nothing placed');
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
  REC.takeProjection(D + '.0.2.2', 2, '1.0.1.0.9', { refused: 'not_a_link' });
  assert.deepEqual([REC.projection(L, 1, D), REC.projection(D + '.0.2.2', 2, '1.0.1.0.9'), REC.projection(L, 1, FAR)], [[], { refused: 'not_a_link' }, undefined], 'a floating end held as none, a refusal by its name, one never asked as nothing');
  rev = REC.doc(D).rev;
  REC.applyFeedUpdate(/** @type {any} */ ({ position: 12330, at: 12330, op: 'publish', docs: [FAR + '.2'], class: 'published' }));
  assert.equal(REC.projection(L, 2, FAR), undefined, 'a feed row naming the far document drops where the slot projects into it');
  assert.ok(REC.doc(D).rev > rev, 'and the document holding the link is made again');
  REC.sessionDied({ arm: 'closed' });
  assert.equal(REC.projection(D + '.0.2.2', 2, '1.0.1.0.9'), undefined, 'the death drops the rest');
});

test('the edition claims on an origin are held until a feed row that may change them, or the death, drops them all, the drop counted; each document windowing the origin is made again as they, a listed claim\'s link or its home\'s metadata arrive and go, and no other', () => {
  const W = '1.0.1.0.3', O = '1.0.1.0.1003', C = '1.0.1.0.9.0.2.1', H = '1.0.1.0.9', PLAIN = '1.0.1.0.5';
  REC.takeDelivery(W, [{ pos: 1, width: 10, kind: 'content', text: 'Tumbler.\n\n', ref: null, origin: null }, { pos: 11, width: 4, kind: 'withheld', text: '', ref: null, origin: O }]);
  REC.takeDelivery(PLAIN, [{ pos: 1, width: 5, kind: 'content', text: 'plain', ref: null, origin: null }]);
  assert.deepEqual([REC.withheldOrigins(W), REC.withheldOrigins(PLAIN)], [[O], []]);
  const made = (/** @type {() => void} */ act) => { const at = [REC.doc(W).rev, REC.doc(PLAIN).rev]; act(); return [REC.doc(W).rev - at[0], REC.doc(PLAIN).rev - at[1]]; };
  assert.deepEqual(made(() => REC.takeEditionClaims(O, [C])), [1, 0], 'the lookup lands: the document windowing the origin made again, no other');
  assert.deepEqual(REC.editionClaimsOf(O), [C]);
  assert.deepEqual(made(() => REC.takeLink({ addr: C, from: [], to: [], type: '1.1.0.1.0.1.0.3.14' })), [1, 0], 'the listed claim\'s link lands');
  assert.deepEqual(made(() => REC.takeLink({ addr: H + '.0.2.7', from: [], to: [], type: null })), [0, 0], 'a link no lookup lists: nothing made again');
  assert.deepEqual(made(() => REC.takeMetadata(H, { doc: H, published: true, owner: '1.0.1', birth: H + '.1', birthExtent: 5, placed: null, baseExtent: null, source: null, asOf: 1 })), [1, 0], 'the claim\'s home\'s metadata lands');
  assert.deepEqual(made(() => REC.invalidate(H)), [1, 0], 'the home dropped: the clause decided again from less');
  assert.deepEqual(made(() => REC.takeRefused(H, 'withheld')), [1, 0], 'a read of the home refused');
  const drops = REC.claimDrops();
  REC.applyFeedUpdate(/** @type {any} */ ({ position: 12330, at: 12330, op: 'insert', docs: [PLAIN], class: 'published' }));
  assert.deepEqual([REC.editionClaimsOf(O), REC.claimDrops()], [[C], drops], 'a row that writes no link and publishes nothing leaves them held');
  assert.deepEqual(made(() => REC.applyFeedUpdate(/** @type {any} */ ({ position: 12331, at: 12331, op: 'make_link', docs: ['1.0.2.0.5'], class: 'published', link: '1.0.2.0.5.0.2.1' }))), [1, 0], 'a link written anywhere: the windowing document made again');
  assert.deepEqual([REC.editionClaimsOf(O), REC.claimDrops()], [undefined, drops + 1], 'every claim held dropped, the drop counted');
  assert.deepEqual(made(() => REC.takeEditionClaims(O, 'withheld')), [1, 0], 'a lookup refused as withheld from the reader: the windowing document made again');
  assert.equal(REC.editionClaimsOf(O), 'withheld', 'held as withheld');
  REC.takeEditionClaims(O, 'unread');
  assert.equal(REC.editionClaimsOf(O), 'unread', 'a lookup that failed any other way is held unread');
  REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  REC.sessionDied({ arm: 'closed' });
  assert.deepEqual([REC.editionClaimsOf(O), REC.claimDrops()], [undefined, drops + 2], 'the death drops them with every read at the session\'s class, and is counted');
});

test('a failed read of a listed claim\'s link or its home\'s metadata is held — through a drop of the claims — until a read of it answers, what the page held of it is dropped, or the death; each document windowing an origin whose claim it decides is made again as it lands and as it goes, and no other (issue #186)', () => {
  const W = '1.0.1.0.3', O = '1.0.1.0.1003', C = '1.0.1.0.9.0.2.1', H = '1.0.1.0.9', PLAIN = '1.0.1.0.5';
  REC.takeDelivery(W, [{ pos: 1, width: 10, kind: 'content', text: 'Tumbler.\n\n', ref: null, origin: null }, { pos: 11, width: 4, kind: 'withheld', text: '', ref: null, origin: O }]);
  REC.takeDelivery(PLAIN, [{ pos: 1, width: 5, kind: 'content', text: 'plain', ref: null, origin: null }]);
  REC.takeEditionClaims(O, [C]);
  const made = (/** @type {() => void} */ act) => { const at = [REC.doc(W).rev, REC.doc(PLAIN).rev]; act(); return [REC.doc(W).rev - at[0], REC.doc(PLAIN).rev - at[1]]; };
  assert.deepEqual(made(() => REC.takeFailedRead(C)), [1, 0], 'the claim\'s link\'s read failed: the windowing document made again, no other');
  assert.deepEqual(made(() => REC.takeFailedRead(H)), [1, 0], 'its home\'s metadata read failed');
  assert.deepEqual([REC.readFailed(C), REC.readFailed(H), REC.readFailed(O)], [true, true, false], 'each held, and nothing else');
  REC.applyFeedUpdate(/** @type {any} */ ({ position: 12330, at: 12330, op: 'make_link', docs: ['1.0.2.0.5'], class: 'published', link: '1.0.2.0.5.0.2.1' }));
  assert.deepEqual([REC.editionClaimsOf(O), REC.readFailed(C), REC.readFailed(H)], [undefined, true, true], 'the claims dropped, the failed reads of the link and the home held: facts of those reads');
  REC.takeEditionClaims(O, [C]);
  assert.deepEqual(made(() => REC.takeLink({ addr: C, from: [], to: [], type: '1.1.0.1.0.1.0.3.14' })), [1, 0], 'the link read again and answered');
  assert.equal(REC.readFailed(C), false, 'its failed read answered');
  assert.deepEqual(made(() => REC.invalidate(H)), [1, 0], 'the home dropped by a feed row, to be read again');
  assert.equal(REC.readFailed(H), false, 'its failed read dropped with it');
  REC.takeFailedRead(H);
  REC.takeMetadata(H, { doc: H, published: true, owner: '1.0.1', birth: H + '.1', birthExtent: 5, placed: null, baseExtent: null, source: null, asOf: 1 });
  assert.equal(REC.readFailed(H), false, 'the home\'s metadata answered');
  REC.takeFailedRead(H);
  REC.takeRefused(H, 'withheld');
  assert.equal(REC.readFailed(H), false, 'a refusal that says something of the home answers it too');
  REC.takeFailedRead(C);
  REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  REC.sessionDied({ arm: 'closed' });
  assert.equal(REC.readFailed(C), false, 'the death drops it with every read at the session\'s class');
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

test('a bare row — its docs null, lost testimony — drops the home of the link it names and the home\'s trunk whatever its op, and answers what it dropped, a null op dropping the edition claims; one naming no link drops nothing, the claims included, and marks the board (issue #212)', () => {
  const D = '1.0.1.0.2', M = D + '.2', W = '1.0.1.0.3', O = '1.0.1.0.1003', C = '1.0.1.0.9.0.2.1';
  for (const addr of [D, M, W]) REC.takeDelivery(addr, [{ pos: 1, width: 5, kind: 'content', text: 'hello', ref: null, origin: null }]);
  REC.takeEditionClaims(O, [C]);
  // a plain make_link, an emit or an assert_sup, served bare: the one link the journal says it deposited, its op unnamed (wire.md §The change feed)
  const dropped = REC.applyFeedUpdate(/** @type {any} */ ({ position: 12330, at: 12330, op: null, docs: null, key: null, time: null, link: M + '.0.2.3', class: 'published' }));
  assert.deepEqual([REC.doc(D).from, REC.doc(M).from, REC.doc(W).from], [-1, -1, 1], 'the member the link is homed at and its trunk dropped, no other document');
  assert.deepEqual(dropped, [D, M], 'answered, the trunk then the member: what the view asks again');
  assert.equal(REC.editionClaimsOf(O), undefined, 'its op unnamed, it may be any link write: the edition claims dropped');
  REC.takeEditionClaims(O, [C]);
  assert.equal(REC.bare(), false, 'a row naming a link marks nothing');
  // a write the journal decides nothing of: every term null
  const undecided = REC.applyFeedUpdate(/** @type {any} */ ({ position: 12331, at: 12331, op: null, docs: null, key: null, time: null, link: null, new_prefix: null, new_id: null, placed: null, base_extent: null, class: 'published' }));
  assert.deepEqual([undecided, REC.doc(W).from], [[], 1], 'naming no document and no link: nothing dropped, nothing answered');
  assert.deepEqual([REC.editionClaimsOf(O), REC.bare()], [[C], true], 'not even the edition claims: it marks the board, whose refresh gives each what a row naming it would');
  const recorded = REC.applyFeedUpdate(/** @type {any} */ ({ position: 12332, at: 12332, op: 'make_link', docs: [W], class: 'published', link: W + '.0.2.4' }));
  assert.deepEqual([recorded, REC.doc(W).from], [[W], -1], 'a recorded make_link names its home in its docs and by its link: dropped, and answered once');
});

test('a row naming no document and no link marks the board whatever its op — a nullify, a version or a publish by its op alone, a delegation, an op unnamed — dropping nothing, its delegation\'s account still listed; a recorded row naming no document marks nothing; a refresh takes the mark once, and a change of class drops it (issue #212)', () => {
  const D = '1.0.1.0.3';
  REC.takeIndex(/** @type {any} */ (PLACES));
  REC.takeDelivery(D, [{ pos: 1, width: 5, kind: 'content', text: 'hello', ref: null, origin: null }]);
  REC.applyFeedUpdate(/** @type {any} */ ({ position: 1, at: 1, op: 'delegate', docs: [], class: 'published', new_prefix: '1.0.3', new_id: 3 }));
  assert.equal(REC.bare(), false, 'a recorded delegation touches no document, its `docs` empty: no bare row');
  for (const [i, op] of /** @type {Array<string | null>} */ (['nullify', 'version', 'publish', 'delegate', null]).entries()) {
    const drops = REC.dropsOf(D);
    const out = REC.applyFeedUpdate(/** @type {any} */ ({ position: 2 + i, at: 2 + i, op, docs: null, class: 'published', ...(op === 'delegate' ? { new_prefix: '1.0.4', new_id: 4 } : {}) }));
    assert.deepEqual([out, REC.doc(D).from, REC.dropsOf(D), REC.bare()], [[], 1, drops, true], `a bare ${op ?? 'unnamed'} row: nothing dropped, the board marked`);
    assert.deepEqual([REC.unmarkBare(), REC.unmarkBare(), REC.bare()], [true, false, false], 'the mark taken once');
  }
  assert.ok(REC.accounts().some((a) => a.account === '1.0.4'), 'a bare delegation\'s account listed, as its row says');
  REC.applyFeedUpdate(/** @type {any} */ ({ position: 9, at: 9, op: null, docs: null, class: 'published' }));
  REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  REC.sessionDied({ arm: 'closed' });
  assert.equal(REC.bare(), false, 'a change of class drops the mark: its reads at the new class make the page whole');
});

test('a delivery keeps the position it was answered at — the text\'s, for a widening read asks the whole window again — and a drop forgets it (issue #212)', () => {
  const D = '1.0.1.0.3';
  REC.takeDelivery(D, [{ pos: 1, width: 5, kind: 'content', text: 'hello', ref: null, origin: null }], 7);
  assert.equal(REC.doc(D).readAt, 7);
  REC.takeDelivery(D, [{ pos: 1, width: 11, kind: 'content', text: 'hello world', ref: null, origin: null }], 9);
  assert.equal(REC.doc(D).readAt, 9, 'the last delivery\'s');
  REC.invalidate(D);
  assert.equal(REC.doc(D).readAt, null, 'dropped with the text');
});

test('a newer member\'s arrival hands the trunk\'s text to the member it is — its runs, blocks, image and window as they stood, the position it was read at, its extent where the member holds none — the trunk keeping none of it, its drop counted; nothing where the member holds text of its own (issue #212)', () => {
  const D = '1.0.1.0.3', M = D + '.1';
  REC.takeSpanSet(D, [{ subspace: 1, ordinal: 1, positions: 11 }]);
  REC.takeDelivery(D, [{ pos: 1, width: 11, kind: 'content', text: 'hello world', ref: null, origin: null }], 5);
  REC.takeImage(D, 1, [{ iStart: D + '.0.1.1', width: 11 }]);
  const t = REC.doc(D), runs = t.runs, blocks = t.blocks, image = t.image, drops = REC.dropsOf(D);
  assert.equal(REC.takeAsMember(D, M), true);
  const m = REC.doc(M);
  assert.deepEqual([m.runs === runs, m.blocks === blocks, m.image === image, m.from, m.to, m.readAt, m.imageFor, m.extent], [true, true, true, 1, 12, 5, [1, 12], 11], 'the member holds the trunk\'s text, image and extent as they stood');
  assert.deepEqual([t.from, t.runs, t.blocks, t.image, t.readAt, t.imageFor, REC.dropsOf(D)], [-1, [], [], [], null, null, drops + 1], 'the trunk none of it, its drop counted');
  REC.takeDelivery(D, [{ pos: 1, width: 3, kind: 'content', text: 'new', ref: null, origin: null }], 8);
  assert.equal(REC.takeAsMember(D, M), false, 'the member holds text of its own: nothing handed');
  assert.deepEqual([REC.textBetween(M, 1, 12), REC.textBetween(D, 1, 4)], ['hello world', 'new']);
});

test('a refresh\'s drop keeps the documents shown and what they read through — their links\' values and where those project, the edition claims on their withheld runs\' origins and the claims\' homes, their owners\' byline causes — and drops the rest as a row naming each would, each drop counted; the index, its counts and the feed\'s rows stand (issue #212)', () => {
  const A = '1.0.1.0.3', B = '1.0.2.0.5', FAR = '1.0.1.0.127', O = '1.0.1.0.1003', O2 = '1.0.2.0.9', H = '1.0.1.0.30', C = H + '.0.2.1';
  const L1 = A + '.0.2.1', L2 = B + '.0.2.1';
  const meta = (/** @type {string} */ doc, /** @type {string} */ owner) => ({ doc, published: true, owner, birth: doc + '.1', birthExtent: 5, placed: null, baseExtent: null, source: null, at: 3, asOf: 9 });
  REC.takeIndex(/** @type {any} */ (PLACES));
  REC.applyFeedUpdate(/** @type {any} */ ({ position: 1, at: 1, op: 'insert', docs: ['1.0.1.0.4'], class: 'published' }));
  REC.takeDelivery(A, [{ pos: 1, width: 5, kind: 'content', text: 'hello', ref: null, origin: null }, { pos: 6, width: 4, kind: 'withheld', text: '', ref: null, origin: O }]);
  REC.takeDelivery(B, [{ pos: 1, width: 5, kind: 'content', text: 'world', ref: null, origin: null }, { pos: 6, width: 4, kind: 'withheld', text: '', ref: null, origin: O2 }]);
  REC.takeLinks(A, [L1]); REC.takeLinks(B, [L2]);
  for (const addr of [L1, L2]) REC.takeLink({ addr, from: [], to: [], type: null });
  REC.takeProjection(L1, 2, FAR, [{ pos: 3, width: 2 }]); REC.takeProjection(L2, 1, A, [{ pos: 1, width: 2 }]);
  REC.takeEditionClaims(O, [C]); REC.takeEditionClaims(O2, []);
  REC.takeLink({ addr: C, from: [], to: [], type: '1.1.0.1.0.1.0.3.14' });
  REC.takeMetadata(H, meta(H, '1.0.1')); REC.takeMetadata(FAR, meta(FAR, '1.0.1'));
  REC.takeAccountKey('1.0.1', { cause: 'unsigned' }); REC.takeAccountKey('1.0.2', { cause: 'unsigned' }); REC.takeAccountKey('1.0.9', { label: 'k', fingerprint: 'ab' });
  const [claims, keys, a, b, rev] = [REC.claimDrops(), REC.keyDrops(), REC.dropsOf(A), REC.dropsOf(B), REC.doc(A).rev];
  assert.deepEqual(REC.projectionsOf(new Set([L1])), [{ link: L1, slot: 2, addr: FAR }], 'the projections held of a link\'s slots: what a refresh asks again');
  const dropped = REC.takeRefresh(new Set([A]));
  assert.deepEqual([REC.textBetween(A, 1, 6), [...REC.doc(A).links], REC.dropsOf(A), REC.doc(A).rev], ['hello', [L1], a, rev], 'the document shown stands as held, its drop not counted: its setting again counts it');
  assert.deepEqual([REC.doc(B).from, REC.dropsOf(B), dropped.includes(B), dropped.includes(FAR), REC.doc(FAR).meta], [-1, b + 1, true, true, null], 'one not shown dropped and counted, a far document as any other');
  assert.deepEqual([REC.link(L1)?.addr, REC.link(C)?.addr, REC.link(L2)], [L1, C, undefined], 'the values of its links and of the claims on its origins kept; another\'s dropped');
  assert.deepEqual([REC.projection(L1, 2, FAR), REC.projection(L2, 1, A)], [[{ pos: 3, width: 2 }], undefined], 'where its links project kept, into a document dropped too; another link\'s gone');
  assert.deepEqual([REC.editionClaimsOf(O), REC.editionClaimsOf(O2), REC.claimDrops(), REC.doc(H).meta?.published], [[C], undefined, claims + 1, true], 'the claims on its origins and their homes kept; others dropped, the drop counted');
  assert.deepEqual([REC.accountKey('1.0.1'), REC.accountKey('1.0.2'), REC.accountKey('1.0.9'), REC.keyDrops()], [{ cause: 'unsigned' }, undefined, { label: 'k', fingerprint: 'ab' }, keys + 1], 'its owner\'s cause kept, another\'s dropped and counted, a value kept');
  assert.deepEqual([REC.places().length, REC.countOf('1.0.1').documents, REC.feedRows().length], [5, 3, 1], 'the index, its counts and the feed\'s rows stand');
});

test('a shown document set again from a refresh\'s reads in one step: each part they carried replacing what it held — its text and image whole over the window read, never merged, given new arrays — each part they did not carry standing, one revision, the drop counted; refused, dropped whole holding the refusal (issue #212)', () => {
  const D = '1.0.1.0.3', L1 = D + '.0.2.1', L2 = D + '.0.2.2';
  REC.takeSpanSet(D, [{ subspace: 1, ordinal: 1, positions: 15 }]);
  REC.takeMetadata(D, { doc: D, published: false, owner: '1.0.1', birth: null, birthExtent: null, placed: null, baseExtent: null, source: null, at: 2, asOf: 5 });
  REC.takeDelivery(D, [{ pos: 1, width: 10, kind: 'content', text: 'old words.', ref: null, origin: null }, { pos: 11, width: 5, kind: 'withheld', text: '', ref: null, origin: '1.0.1.0.1003' }], 5);
  REC.takeImage(D, 1, [{ iStart: D + '.0.1.1', width: 10 }, { iStart: '1.0.1.0.1003.0.1.1', width: 5 }]);
  REC.takeLinks(D, [L1]); REC.takeLink({ addr: L1, from: [], to: [], type: null });
  const d = REC.doc(D), runs = d.runs, rev = d.rev, drops = REC.dropsOf(D), meta = d.meta;
  REC.setAgain(D, {
    spans: [{ subspace: 1, ordinal: 1, positions: 8 }], links: [L2], values: [{ addr: L2, from: [], to: [], type: null }],
    text: { runs: [{ pos: 1, width: 8, kind: 'content', text: 'new one.', ref: null, origin: null }], asOf: 9 },
    image: { from: 1, runs: [{ iStart: D + '.0.1.16', width: 8 }] },
  });
  assert.deepEqual([REC.textBetween(D, 1, 16), d.runs.length, d.blocks.length, d.from, d.to, d.readAt, d.extent], ['new one.', 1, 1, 1, 9, 9, 8], 'its text replaced whole: nothing of the old past the new text\'s end');
  assert.deepEqual([d.image.map((r) => [r.pos, r.width, r.ordinal]), d.imageFor, d.origins], [[[1, 8, 16]], [1, 9], []], 'its image replaced whole');
  assert.deepEqual([[...d.links], REC.link(L2)?.addr, d.meta === meta], [[L2], L2, true], 'its links the fresh ones, their values read; its metadata, not carried, standing');
  assert.deepEqual([d.rev, REC.dropsOf(D), REC.textOf(runs, 1, 11)], [rev + 1, drops + 1, 'old words.'], 'one revision, the drop counted, and the runs an article was made from as they were');
  REC.setAgain(D, { refused: 'withheld' });
  assert.deepEqual([d.refused, d.from, d.extent, d.meta, [...d.links]], ['withheld', -1, null, null, []], 'refused: dropped whole, the refusal held');
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

test('the feed\'s rows keep their commit times and name the members of a trunk\'s own chain: the highest member a held row names — a publish\'s, a write homed at one — never a daughter\'s, nor another trunk\'s; the newest time a row carries (issue #184)', () => {
  const D = '1.0.1.0.3';
  assert.deepEqual([REC.feedMember(D), REC.feedTime()], [null, null], 'no row held');
  REC.applyFeedUpdate(/** @type {any} */ ({ position: 1, at: 1, op: 'publish', docs: [D + '.2'], class: 'published', time: 1792683856000 }));
  REC.applyFeedUpdate(/** @type {any} */ ({ position: 2, at: 2, op: 'version', docs: [D + '.4.1'], class: 'published', time: 1792683857000 }));
  REC.applyFeedUpdate(/** @type {any} */ ({ position: 3, at: 3, op: 'publish', docs: ['1.0.1.0.4.7'], class: 'published', time: null }));
  REC.applyFeedUpdate(/** @type {any} */ ({ position: 4, at: 4, op: 'make_link', docs: [D + '.3'], class: 'published', link: D + '.3.0.2.1' }));
  assert.deepEqual([REC.feedMember(D), REC.feedMember('1.0.1.0.4'), REC.feedTime()], [3, 7, 1792683857000], 'D.3, the home of a link, past D.2; D.4.1 a daughter of D.4, no member of D\'s own chain; the second row\'s time, the newest carried');
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

test('the session\'s key on this device is the one bound here for its principal — else, under a session that writes, the store\'s one key — and, under a session that writes, why none can be named: two keys bound, or none; none for a guest or for the bare session no key is bound for (FP-34)', () => {
  const O = 'http://127.0.0.1:8642';
  /** a key of the store as `fingerprint` answers it, bound where its bindings say */
  const key = (/** @type {string} */ fingerprint, /** @type {string} */ label, /** @type {string[]} */ bindings) => ({ fingerprint, label, bindings, unbound: !bindings.length, payload: null });
  const here = key('e4272902a11439e5', 'dev-notebook', [`${O} principal 1 account 1.0.1`]);
  const elsewhere = key('9a0c33f1b2d4e6a8', 'other-board', ['http://127.0.0.1:9000 principal 1 account 1.0.1']);
  const signed = { session: 's-1', principal: 1, account: '1.0.1', writes: true };
  const untold = { cause: 'key-untold' };
  REC.takeKeyStore([here], O);
  assert.equal(REC.device(), null, '(a) a guest: no key is the session\'s, though one is bound here');
  REC.setSession(signed);
  REC.takeKeyStore([key('7c41d0e2a9b83f56', 'longer-origin', ['http://127.0.0.1:86420 principal 1 account 1.0.1']), key('3e8f62b1c0d4a975', 'longer-principal', [`${O} principal 12 account 1.0.12`])], O);
  assert.deepEqual(REC.device(), untold, '(b) bound at an origin whose text begins with this one\'s, and here for principal 12: neither is principal 1\'s here, and two keys stand — the key is not named');
  REC.takeKeyStore([elsewhere, here], O);
  assert.deepEqual(REC.device(), { label: 'dev-notebook', fingerprint: 'e4272902a11439e5' }, '(c) the key bound here for the principal, never the store\'s first');
  REC.takeKeyStore([here, key('5b1d77e0c9f2a3b4', 'second-device', [`${O} principal 1 account 1.0.1`])], O);
  assert.deepEqual(REC.device(), untold, '(d) two keys bound here for the principal: the shell signs with the newest binding, which the store\'s answer does not order across keys — the key is not named, never the first');
  REC.takeKeyStore([elsewhere], O);
  assert.deepEqual(REC.device(), { label: 'other-board', fingerprint: '9a0c33f1b2d4e6a8' }, '(e) no key bound here, a session that writes: the store\'s one key, which the shell signs with');
  REC.takeKeyStore([], O);
  assert.deepEqual(REC.device(), untold, '(f) an empty store under a session that writes: no key can be named');
  REC.setSession({ ...signed, writes: false });
  REC.takeKeyStore([elsewhere], O);
  assert.equal(REC.device(), null, '(g) the bare session over the same store: no key opened it, and none is bound here for its principal — no slot to fill');
  REC.takeKeyStore([here], O);
  REC.setSession(signed);
  REC.sessionDied({ arm: 'closed' });
  assert.deepEqual([REC.device(), REC.keyPresent()], [null, true], 'the death: no session, so no key is its; the device\'s store stands');
});

test('a key store the page did not read is held unread: under a session that writes the device\'s key says so, the bare session and a guest name none, and no key is present (FP-34)', () => {
  const O = 'http://127.0.0.1:8642';
  REC.setSession({ session: 's-1', principal: 1, account: '1.0.1', writes: true });
  assert.deepEqual(REC.device(), { cause: 'store-unread' }, 'nothing read yet: the store is unread');
  REC.takeKeyStore([{ fingerprint: 'e4272902a11439e5', label: 'dev-notebook', bindings: [`${O} principal 1 account 1.0.1`], unbound: false, payload: null }], O);
  assert.deepEqual(REC.device(), { label: 'dev-notebook', fingerprint: 'e4272902a11439e5' }, 'read: the key bound here');
  REC.takeKeyStore(null, O);
  assert.deepEqual([REC.device(), REC.keyPresent()], [{ cause: 'store-unread' }, false], 'the `fingerprint` call refused: the store held unread, never the store read before it, and no key present');
  REC.setSession({ session: 's-2', principal: 1, account: '1.0.1', writes: false });
  assert.equal(REC.device(), null, 'the bare session: no slot to fill');
  REC.setSession(null);
  assert.equal(REC.device(), null, 'a guest: none');
});

test('a document\'s owner is its account\'s `effective_owner` row where read, else its metadata\'s owner, else its account', () => {
  const D = '1.0.1.1.0.4';
  REC.takeSpanSet(D, [{ subspace: 1, ordinal: 1, positions: 4 }]);
  assert.equal(REC.ownerAccount(REC.doc(D)), '1.0.1.1', 'its account');
  REC.takeMetadata(D, { doc: D, published: true, owner: '1.0.1.1', birth: D + '.1', birthExtent: 4, placed: null, baseExtent: null, source: null, asOf: 1 });
  assert.equal(REC.ownerAccount(REC.doc(D)), '1.0.1.1', 'its metadata\'s owner');
  REC.takeOwner('1.0.1.1', /** @type {any} */ ({ prefix: '1.0.1' }));
  assert.equal(REC.ownerAccount(REC.doc(D)), '1.0.1', 'the account\'s effective owner, the seat above it');
});

test('a record atom\'s value is read where its type is one the record rule renders, and nothing else is', () => {
  const enroll = JSON.stringify({ type: 'skep-enroll', keys: [{ alg: 'mldsa65-ed25519', key: 'ab', label: 'paper', anchor: true }, null, { alg: 'mldsa65-ed25519', key: 'cd', label: 'dev', anchor: false }] });
  assert.deepEqual(REC.recordValue({ kind: 'atom', text: enroll }), { type: 'skep-enroll', keys: [{ alg: 'mldsa65-ed25519', key: 'ab', label: 'paper', anchor: true }, { alg: 'mldsa65-ed25519', key: 'cd', label: 'dev', anchor: false }], position: '', chain: '' }, 'the genesis record, its keys in its own order, a key that is no object dropped');
  assert.deepEqual(REC.recordValue({ kind: 'atom', text: JSON.stringify({ type: 'skep-head', position: 7, chain: 'ab' }) }), { type: 'skep-head', keys: [], position: 7, chain: 'ab' }, 'the head record');
  for (const [what, item] of /** @type {Array<[string, {kind: string, text: string}]>} */ ([['another type', { kind: 'atom', text: JSON.stringify({ type: 'skep-retire' }) }], ['no value', { kind: 'atom', text: 'not json' }], ['text', { kind: 'content', text: enroll }]])) {
    assert.equal(REC.recordValue(item), null, `${what}: none`);
  }
});

test('an account\'s byline facts are held as read: every held document it owns made again, no other; a cause dropped at a feed row touching a doc 1 and at a change of class, each drop counted, and a value kept through both (FP-34; AUTH-2.127)', () => {
  const MINE = '1.0.1.0.3', OTHER = '1.0.2.0.5';
  REC.setSession({ session: 's-1', principal: 1, account: '1.0.1', writes: true });
  for (const d of [MINE, OTHER]) REC.takeSpanSet(d, [{ subspace: 1, ordinal: 1, positions: 4 }]);
  const revs = () => [REC.doc(MINE).rev, REC.doc(OTHER).rev];
  const [r0, o0] = revs();
  assert.equal(REC.accountKey('1.0.1'), undefined, 'nothing read: undefined');
  REC.takeAccountKey('1.0.1', { label: 'dev-notebook', fingerprint: 'e4272902a11439e5' });
  REC.takeAccountKey('1.0.2', { cause: 'unsigned' });
  assert.deepEqual([REC.accountKey('1.0.1'), REC.accountKey('1.0.2')], [{ label: 'dev-notebook', fingerprint: 'e4272902a11439e5' }, { cause: 'unsigned' }]);
  assert.deepEqual(revs(), [r0 + 1, o0 + 1], 'each read makes again the documents its account owns, once');
  const n0 = REC.keyDrops();
  REC.applyFeedUpdate(/** @type {any} */ ({ position: 1, at: 1, op: 'insert', docs: ['1.0.1.0.7'], class: 'published' }));
  assert.deepEqual([REC.keyDrops(), REC.accountKey('1.0.2')], [n0, { cause: 'unsigned' }], 'a row touching no doc 1: nothing dropped, nothing counted');
  REC.applyFeedUpdate(/** @type {any} */ ({ position: 2, at: 2, op: 'make_link', docs: ['1.0.2.0.1'], class: 'published', link: '1.0.2.0.1.0.2.1' }));
  assert.deepEqual([REC.keyDrops(), REC.accountKey('1.0.2'), REC.accountKey('1.0.1')], [n0 + 1, undefined, { label: 'dev-notebook', fingerprint: 'e4272902a11439e5' }], 'a link made in a doc 1: the cause dropped and the drop counted, the value kept');
  assert.equal(REC.doc(OTHER).rev, o0 + 2, 'the document whose owner\'s cause dropped is made again, so the view asks its facts again');
  REC.takeAccountKey('1.0.2', { cause: 'not-recorded' });
  REC.applyFeedUpdate(/** @type {any} */ ({ position: 3, at: 3, op: null, docs: null, class: 'published', link: '1.0.3.0.1.0.2.4' }));
  assert.deepEqual([REC.keyDrops(), REC.accountKey('1.0.2')], [n0 + 2, undefined], 'a bare row whose link is homed in another account\'s doc 1: every cause held dropped');
  REC.takeAccountKey('1.0.2', { cause: 'withheld', owner: '1.0.2' });
  REC.sessionDied({ arm: 'closed' });
  assert.deepEqual([REC.keyDrops(), REC.accountKey('1.0.2'), REC.accountKey('1.0.1')], [n0 + 3, undefined, { label: 'dev-notebook', fingerprint: 'e4272902a11439e5' }], 'a change of class: the cause dropped, counted, the value kept — a value never changes');
});

test('a session is a reference, never a token; the death signal drops it', () => {
  REC.setSession({ session: 's-abc', principal: 1, account: '1.0.1' });
  assert.equal(REC.session()?.account, '1.0.1');
  REC.sessionDied({ arm: 'closed' });
  assert.equal(REC.session(), null);
  assert.equal(REC.deathReason()?.arm, 'closed');
});
