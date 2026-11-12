// W-BURSTS's test: a burst composes to the write frames `docs/wire.md`
// §Arrangement spells — an `insert`, a `delete`, a `reinstate` — each with
// its typed state, its `id` and the anchors read from the record's image;
// the frames make the net change of the burst's edits, in an order whose
// positions hold; a burst beside held, unminted words names them by a piece
// of the insert that carried them, a removal of such words carrying no span;
// a refusal the page keeps is left out of what later bursts are composed
// against; an insertion inside a link's span splits it, the span's own bytes
// its anchors; and a burst anchored on a byte no piece names, or one the
// record does not name, composes to none and says why.
import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import * as BURSTS from './bursts.js';
import * as WRITE from './write.js';
import * as REC from '../model/records.js';
import { applyEdits, applyHeld } from '../model/derive.js';
import { canon } from '../test/fake-port.js';
import { byteLength } from '../util.js';

// the wire's own request examples, byte-exact as docs/wire.md §Arrangement carries them (keys sorted)
const EXAMPLES = {
  insert: '{"as_of":7,"at":{"ordinal":"1","subspace":"1"},"doc":"1.0.1.0.1","op":"insert","values":["hello, wire"]}',
  delete: '{"as_of":7,"doc":"1.0.1.0.1","op":"delete","p":{"ordinal":"3","subspace":"1"},"width":"2"}',
  reinstate: '{"as_of":7,"at":{"ordinal":"3","subspace":"1"},"doc":"1.0.1.0.2","op":"reinstate","runs":[{"i_start":"1.0.1.0.2.0.1.4","origin":"1.0.1.0.2","width":"5"}]}',
};

const D = '1.0.1.0.1', E = '1.0.1.0.2';
/** the page's load the frames' ids carry here */
const LOAD = '9f';
/** the permanent address of a draft's `n`-th own byte */
const own = (/** @type {string} */ addr, /** @type {number} */ n) => `${addr}.0.1.${n}`;

beforeEach(() => { REC._reset(); WRITE._reset(); });

/**
 * A draft's record as a read at position 7 delivers it: its text, its extent
 * and its image — its own bytes in order where no runs are given.
 * @param {string} addr
 * @param {string} text
 * @param {Array<{iStart: string, width: number}>} [runs] the image's runs, in the text's order
 */
function read(addr, text, runs = [{ iStart: own(addr, 1), width: byteLength(text) }]) {
  const n = byteLength(text);
  REC.takeSpanSet(addr, [{ subspace: 1, ordinal: 1, positions: n }]);
  REC.takeDelivery(addr, n ? [{ pos: 1, width: n, kind: 'content', text, ref: null, origin: null }] : [], 7, { from: 1, runs: n ? runs : [] });
  return REC.doc(addr);
}

/** a burst of a draft composed: its edits from the `from`-th on, typed against position 7, its frames numbered from `seq` */
const compose = (/** @type {string} */ addr, from = 0, seq = 1) => BURSTS.compose({ doc: REC.doc(addr), edits: WRITE.edits(addr), from, asOf: 7, ids: (page, width) => REC.pageIds(addr, page, width), load: LOAD, seq });
/** the frames of an answer; fails where the burst composed to none */
const framesOf = (/** @type {ReturnType<typeof compose>} */ out) => { assert.ok('frames' in out, `composed: ${JSON.stringify(out)}`); return out.frames; };
/** a frame as the wire's example spells it: its `id` apart */
const bare = (/** @type {{id?: string}} */ frame) => { const { id, ...rest } = frame; void id; return canon(rest); };
/** the text a draft's record and its edits make: what the frames must make of the record's text */
const typed = (/** @type {string} */ addr) => { const d = applyEdits(REC.doc(addr), WRITE.edits(addr)).doc; return d.from < 0 ? '' : REC.textOf(d.runs, d.from, d.to); };
/** the text the frames make of a draft's record, applied in order as the board applies them (M-DERIVE's `applyHeld`) */
function made(/** @type {string} */ addr, /** @type {BURSTS.Composed[]} */ frames) {
  const rows = frames.map((f, i) => ({ held: i + 1, doc: addr, base: 7, frame: f.frame, anchors: null, cause: 'behind', sent: false, time: 0, refusal: null, sendable: null, unwritable: null, unwritableClass: null }));
  const out = applyHeld(REC.doc(addr), rows, (a) => (REC.has(a) ? REC.doc(a) : null));
  assert.equal(out.stopped, null, `every frame applies: ${JSON.stringify(out.stopped)}`);
  return out.doc.from < 0 ? '' : REC.textOf(out.doc.runs, out.doc.from, out.doc.to);
}

test('typing at the draft\'s start is one `insert` at that position as the wire spells it, its values the typed text, its typed state the one given, its anchors null before and the first unit after, and the page\'s ordinals its bytes carry beside it', () => {
  read(D, 'abc');
  for (const [i, ch] of [...'hello, wire'].entries()) WRITE.addEdit(D, { pos: 1 + i, width: 0, text: ch });
  const frames = framesOf(compose(D));
  assert.equal(frames.length, 1, 'eleven keys at one place: one frame');
  assert.equal(bare(frames[0].frame), EXAMPLES.insert);
  assert.deepEqual([frames[0].anchors, frames[0].pages, frames[0].frame.id], [{ before: null, after: own(D, 1) }, [{ page: 1, width: 11 }], 'page:9f.1']);
  assert.equal(made(D, frames), typed(D), 'the frame makes the typed text');
});

test('typing inside the draft is one `insert` between the units either side, and typing at its end one after its last unit, null after', () => {
  read(D, 'abcdef');
  WRITE.addEdit(D, { pos: 4, width: 0, text: 'X' });
  WRITE.addEdit(D, { pos: 5, width: 0, text: 'Y' });
  const inside = framesOf(compose(D));
  assert.deepEqual(inside.map((f) => [f.frame, f.anchors, f.pages]), [[{ op: 'insert', doc: D, at: { ordinal: '4', subspace: '1' }, values: ['XY'], as_of: 7, id: 'page:9f.1' }, { before: own(D, 3), after: own(D, 4) }, [{ page: 1, width: 2 }]]]);
  assert.equal(made(D, inside), 'abcXYdef');
  WRITE.addEdit(D, { pos: 9, width: 0, text: '!' });
  const end = framesOf(compose(D, 2, 2));
  assert.deepEqual(end.map((f) => [f.frame, f.anchors, f.pages]), [[{ op: 'insert', doc: D, at: { ordinal: '9', subspace: '1' }, values: ['!'], as_of: 7, id: 'page:9f.2' }, { before: own(D, 6), after: null }, [{ page: 3, width: 1 }]]],
    'the burst after it: its position in the text as the earlier burst left it, the last unit before it, the document\'s edge after');
});

test('typing in an empty draft is one `insert` at its first position, null at both edges', () => {
  read(D, '');
  WRITE.addEdit(D, { pos: 1, width: 0, text: 'hello, wire' });
  const frames = framesOf(compose(D));
  assert.equal(bare(frames[0].frame), EXAMPLES.insert);
  assert.deepEqual([frames.length, frames[0].anchors], [1, { before: null, after: null }]);
});

test('a removal of bytes the record holds is one `delete` of that span as the wire spells it, its anchors the units either side and its span the I-runs between', () => {
  read(D, 'abcdef');
  WRITE.addEdit(D, { pos: 4, width: 1, text: '' });
  WRITE.addEdit(D, { pos: 3, width: 1, text: '' });
  const frames = framesOf(compose(D));
  assert.equal(frames.length, 1, 'two Backspaces at one place: one frame');
  assert.equal(bare(frames[0].frame), EXAMPLES.delete);
  assert.deepEqual([frames[0].anchors, frames[0].pages], [{ before: own(D, 2), after: own(D, 5), span: [{ start: own(D, 3), width: '2' }] }, []]);
  assert.equal(made(D, frames), 'abef');
});

test('a removal\'s span is the image\'s runs between its anchors, in the text\'s order — each stretch by the I-space that minted it — and a removal through the draft\'s end has null after', () => {
  const far = '1.0.1.0.9';
  read(D, 'abcdefgh', [{ iStart: own(D, 1), width: 3 }, { iStart: own(far, 40), width: 2 }, { iStart: own(D, 4), width: 3 }]);
  WRITE.addEdit(D, { pos: 3, width: 6, text: '' });
  const [del] = framesOf(compose(D));
  assert.deepEqual([del.frame, del.anchors], [{ op: 'delete', doc: D, p: { ordinal: '3', subspace: '1' }, width: '6', as_of: 7, id: 'page:9f.1' },
    { before: own(D, 2), after: null, span: [{ start: own(D, 3), width: '1' }, { start: own(far, 40), width: '2' }, { start: own(D, 4), width: '3' }] }]);
});

test('a replacement is the `delete` of the bytes taken out, then the `insert` at the same place, both between the same two units', () => {
  read(D, 'abcdef');
  WRITE.addEdit(D, { pos: 3, width: 2, text: 'XYZ' });
  const frames = framesOf(compose(D));
  assert.deepEqual(frames.map((f) => f.frame.op), ['delete', 'insert'], 'the delete first');
  assert.equal(bare(frames[0].frame), EXAMPLES.delete);
  assert.deepEqual(frames[1].frame, { op: 'insert', doc: D, at: { ordinal: '3', subspace: '1' }, values: ['XYZ'], as_of: 7, id: 'page:9f.2' });
  assert.deepEqual([frames[0].anchors, frames[1].anchors], [{ before: own(D, 2), after: own(D, 5), span: [{ start: own(D, 3), width: '2' }] }, { before: own(D, 2), after: own(D, 5) }]);
  assert.equal(made(D, frames), 'abXYZef');
});

test('a put-back of bytes an earlier burst took out is one `reinstate` of their I-runs as the wire spells it, never an `insert` of new bytes', () => {
  read(E, 'abcdefgh', [{ iStart: own(E, 1), width: 2 }, { iStart: own(E, 4), width: 6 }]);
  WRITE.addEdit(E, { pos: 3, width: 5, text: '' });
  WRITE.addEdits(E, [{ pos: 3, width: 0, text: '', back: { of: 0, from: 0, width: 5 } }]);
  const frames = framesOf(compose(E, 1));
  assert.equal(frames.length, 1);
  assert.equal(bare(frames[0].frame), EXAMPLES.reinstate);
  assert.deepEqual([frames[0].anchors, frames[0].pages], [{ before: own(E, 2), after: own(E, 9) }, []], 'placed between the units either side of where it stands, no ordinal of the page\'s made');
  assert.ok(!frames.some((f) => f.frame.op === 'insert'), 'no new bytes');
});

test('a put-back inside the burst that took the bytes out sends nothing, and one that lands beside typed words is placed before them, each anchor a unit the board holds', () => {
  read(E, 'abcdefgh');
  WRITE.addEdit(E, { pos: 3, width: 3, text: '' });
  WRITE.addEdits(E, [{ pos: 3, width: 0, text: '', back: { of: 0, from: 0, width: 3 } }]);
  assert.deepEqual(compose(E), { frames: [] }, 'taken out and put back in one burst: the same text');
  WRITE.addEdit(E, { pos: 3, width: 3, text: '' });
  const removed = WRITE.edits(E).length;
  WRITE.addEdit(E, { pos: 3, width: 0, text: 'new ' });
  WRITE.addEdits(E, [{ pos: 7, width: 0, text: '', back: { of: removed - 1, from: 0, width: 3 } }]);
  const frames = framesOf(compose(E, removed));
  assert.deepEqual(frames.map((f) => [f.frame.op, f.anchors]), [['reinstate', { before: own(E, 2), after: own(E, 6) }], ['insert', { before: own(E, 2), after: own(E, 3) }]],
    'the bytes the board holds first; the page\'s own then between the unit before and the first of them');
  assert.deepEqual(frames.map((f) => /** @type {{at: unknown}} */ (f.frame).at), [{ ordinal: '3', subspace: '1' }, { ordinal: '3', subspace: '1' }]);
});

test('two places in one burst are two groups in the text\'s order, each frame\'s positions those of the text as it stands after the frames before it', () => {
  read(D, 'abcdefgh');
  WRITE.addEdit(D, { pos: 7, width: 1, text: 'Q' });
  WRITE.addEdit(D, { pos: 2, width: 0, text: 'XY' });
  const frames = framesOf(compose(D));
  assert.deepEqual(frames.map((f) => f.frame), [
    { op: 'insert', doc: D, at: { ordinal: '2', subspace: '1' }, values: ['XY'], as_of: 7, id: 'page:9f.1' },
    { op: 'delete', doc: D, p: { ordinal: '9', subspace: '1' }, width: '1', as_of: 7, id: 'page:9f.2' },
    { op: 'insert', doc: D, at: { ordinal: '9', subspace: '1' }, values: ['Q'], as_of: 7, id: 'page:9f.3' },
  ], 'the earlier place first, though it was typed second; the later place\'s positions past the two bytes it gained');
  assert.deepEqual(frames.map((f) => f.anchors), [{ before: own(D, 1), after: own(D, 2) }, { before: own(D, 6), after: own(D, 8), span: [{ start: own(D, 7), width: '1' }] }, { before: own(D, 6), after: own(D, 8) }]);
  assert.deepEqual(frames.map((f) => f.pages), [[{ page: 2, width: 2 }], [], [{ page: 1, width: 1 }]], 'each insert names the ordinals its own bytes carry');
  assert.equal(made(D, frames), typed(D), 'applied in order, the frames make the typed text');
});

test('characters typed and taken out inside one burst send nothing, and a burst that changes nothing composes to no frame', () => {
  read(D, 'abc');
  WRITE.addEdit(D, { pos: 2, width: 0, text: 'xyz' });
  WRITE.addEdit(D, { pos: 4, width: 1, text: '' });
  WRITE.addEdit(D, { pos: 2, width: 2, text: '' });
  assert.deepEqual(compose(D), { frames: [] });
  WRITE.addEdit(D, { pos: 2, width: 0, text: 'wx' });
  WRITE.addEdit(D, { pos: 3, width: 1, text: '' });
  assert.deepEqual(framesOf(compose(D, 3)).map((f) => [/** @type {{values: unknown}} */ (f.frame).values, f.pages]), [[['w'], [{ page: 4, width: 1 }]]], 'only what stands after the burst is sent, by the ordinal it took');
  assert.deepEqual(compose(D, WRITE.edits(D).length), { frames: [] }, 'no edit since the last burst: nothing');
});

test('a multi-byte character is counted in bytes: the frames\' positions, the delete\'s width and the ordinals an insert carries', () => {
  read(D, 'aéz');
  WRITE.addEdit(D, { pos: 4, width: 0, text: 'ñ→' });
  WRITE.addEdit(D, { pos: 2, width: 2, text: '' });
  const frames = framesOf(compose(D));
  assert.deepEqual(frames.map((f) => [f.frame, f.pages]), [
    [{ op: 'delete', doc: D, p: { ordinal: '2', subspace: '1' }, width: '2', as_of: 7, id: 'page:9f.1' }, []],
    [{ op: 'insert', doc: D, at: { ordinal: '2', subspace: '1' }, values: ['ñ→'], as_of: 7, id: 'page:9f.2' }, [{ page: 1, width: 5 }]],
  ], '"é" two positions, "ñ→" five');
  assert.equal(made(D, frames), 'añ→z');
});

test('a frame\'s `id` is the page\'s load and a counter behind the page\'s own lead: unique from frame to frame and load to load, and never opening `shell:`, the prefix the shell\'s resends take', () => {
  assert.equal(BURSTS.frameId('9f', 3), 'page:9f.3');
  const ids = [BURSTS.frameId('9f', 1), BURSTS.frameId('9f', 2), BURSTS.frameId('a0', 1), BURSTS.frameId('shell:', 1), BURSTS.frameId('', 1)];
  assert.equal(new Set(ids).size, ids.length, 'no two alike');
  for (const id of ids) assert.ok(!id.startsWith('shell:'), id);
  read(D, 'abc');
  WRITE.addEdit(D, { pos: 2, width: 1, text: 'X' });
  assert.deepEqual(framesOf(compose(D, 0, 41)).map((f) => f.frame.id), ['page:9f.41', 'page:9f.42'], 'each frame of a burst its own, counted from the number given');
});

test('a burst whose anchor or span is a byte the page made that the board has not minted composes to no frame and says so; once the board has minted it, the same burst composes, the byte named by its address', () => {
  read(D, 'abc');
  WRITE.addEdit(D, { pos: 2, width: 0, text: 'XY' });
  WRITE.addEdit(D, { pos: 4, width: 0, text: 'Z' });
  assert.deepEqual(compose(D, 1), { waits: 'unminted' }, 'typed beside words an earlier burst carried and no ack has named');
  WRITE.addEdit(D, { pos: 2, width: 1, text: '' });
  assert.deepEqual(compose(D, 1), { waits: 'unminted' }, 'and a removal of one of them');
  WRITE.addEdit(D, { pos: 5, width: 0, text: '!' });
  assert.ok('frames' in compose(D, 3), 'a burst of the last edit alone, between two units the board holds: composed');
  assert.deepEqual(compose(D, 1), { waits: 'unminted' }, 'one place of a burst waits: no frame of the burst is answered, the place that could go among them');
  REC.mint(D, 1, 2, own(D, 40), 9);
  assert.deepEqual(framesOf(compose(D, 1)).map((f) => [f.frame.op, f.anchors]), [
    ['delete', { before: own(D, 1), after: own(D, 41), span: [{ start: own(D, 40), width: '1' }] }],
    ['insert', { before: own(D, 41), after: own(D, 2) }],
    ['insert', { before: own(D, 2), after: own(D, 3) }],
  ], 'minted: the removed byte and the byte before the typed word each by the address the board gave it');
});

test('a burst the record at hand cannot place composes to no frame: its image names no unit beside the edit, its extent is unknown past the text held, or its text is gone', () => {
  const n = 6;
  REC.takeSpanSet(D, [{ subspace: 1, ordinal: 1, positions: 20 }]);
  REC.takeDelivery(D, [{ pos: 1, width: n, kind: 'content', text: 'abcdef', ref: null, origin: null }], 7, { from: 1, runs: [{ iStart: own(D, 1), width: n }] });
  WRITE.addEdit(D, { pos: 7, width: 0, text: 'x' });
  assert.deepEqual(compose(D), { waits: 'unread' }, 'typed at the end of the text held, more of the document unread: the unit after is not named');
  WRITE.clearEdits(D);
  WRITE.addEdit(D, { pos: 3, width: 0, text: 'x' });
  assert.ok('frames' in compose(D), 'inside what the image names: composed');
  REC.invalidate(D);
  assert.deepEqual(compose(D), { waits: 'unread' }, 'the record\'s text dropped: nothing to compose against');
});

// ---- beside held, unminted words; islands; the mark split (D6 BM-2, BM-8, BM-19) ---------------------------------------

/** a burst composed with the pieces a caller names the page's unminted bytes by: each page ordinal `piece` knows, by the `id` of the insert that carried it and its offset there */
const composeWith = (/** @type {string} */ addr, /** @type {number} */ from, /** @type {Record<number, {burst: string, offset: number}>} */ pieces, seq = 9) =>
  BURSTS.compose({ doc: REC.doc(addr), edits: WRITE.edits(addr), from, asOf: 7, ids: (page, width) => REC.pageIds(addr, page, width), load: LOAD, seq, piece: (page) => pieces[page] || null });

test('BM-8: a burst beside held, unminted words names its neighbour by a piece — the insert that carried the byte, by its `id`, and the byte\'s offset in it — never the document\'s edge and never another byte: typing on at the same place, a burst between two held lines, and a removal of a held word, which carries its two edges and no span', () => {
  read(D, 'abcdef');
  WRITE.addEdit(D, { pos: 4, width: 0, text: 'XY' });   // held: the insert `h-1`, pages 1 and 2
  WRITE.markSent(D, 1);
  WRITE.addEdit(D, { pos: 9, width: 0, text: 'Z' });    // held: the insert `h-2`, page 3, at the document's end
  WRITE.markSent(D, 2);
  const pieces = { 1: { burst: 'h-1', offset: 0 }, 2: { burst: 'h-1', offset: 1 }, 3: { burst: 'h-2', offset: 0 } };
  WRITE.addEdit(D, { pos: 6, width: 0, text: 'more' });
  const on = framesOf(composeWith(D, 2, pieces));
  assert.deepEqual(on.map((f) => [f.frame.op, /** @type {any} */ (f.frame).at, f.anchors]), [['insert', { ordinal: '6', subspace: '1' }, { before: { burst: 'h-1', offset: 1 }, after: own(D, 4) }]],
    'typing on after the held words: its neighbour before the last byte of the held insert, by its piece; after, the board\'s own byte');
  WRITE.markSent(D, 3);
  WRITE.addEdit(D, { pos: 5, width: 0, text: '-' });
  const between = framesOf(composeWith(D, 3, pieces));
  assert.deepEqual(between[0].anchors, { before: { burst: 'h-1', offset: 0 }, after: { burst: 'h-1', offset: 1 } }, 'typed inside the held word: both edges pieces of it');
  WRITE.markSent(D, 4);
  WRITE.addEdit(D, { pos: 15, width: 0, text: '!' });   // "abcX-YmoredefZ|", page 9
  assert.deepEqual(framesOf(composeWith(D, 4, pieces))[0].anchors, { before: { burst: 'h-2', offset: 0 }, after: null }, 'typed after the second held line, at the document\'s end: the held byte before it, the edge after');
  WRITE.markSent(D, 5);
  WRITE.addEdit(D, { pos: 14, width: 1, text: '' });   // the held "Z" taken out, between the board's "f" and the held "!"
  const gone = framesOf(composeWith(D, 5, { ...pieces, 9: { burst: 'h-5', offset: 0 } }));
  assert.deepEqual(gone.map((f) => [f.frame.op, /** @type {any} */ (f.frame).p, /** @type {any} */ (f.frame).width, f.anchors]), [['delete', { ordinal: '14', subspace: '1' }, '1', { before: own(D, 6), after: { burst: 'h-5', offset: 0 } }]],
    'a held word removed: a delete of its positions, its edges named — the held byte after it by its piece — and no span, the board holding no address for its bytes');
  WRITE.addEdit(D, { pos: 5, width: 0, text: '?' });
  assert.deepEqual(BURSTS.compose({ doc: REC.doc(D), edits: WRITE.edits(D), from: 6, asOf: 7, ids: (page, width) => REC.pageIds(D, page, width), load: LOAD, seq: 20 }), { waits: 'unminted' }, 'with no piece to name the unminted neighbour by, the burst composes to none');
});

test('BM-19: a refusal the page keeps is left out of what later bursts are composed against — a burst typed past an island\'s words takes positions less their width and never anchors on them, one past an island that removed words counts them back in — and the frames make the board\'s text the text shown without the islands', () => {
  read(D, 'abcdef');
  WRITE.addEdit(D, { pos: 3, width: 0, text: 'XYZ' });     // an island: three bytes the board never took
  WRITE.markSent(D, 1);
  WRITE.markIsland(D, 1, { kind: 'shell', name: 'frame_too_large' });
  WRITE.addEdit(D, { pos: 8, width: 0, text: '+' });        // after "e", past the island
  const past = framesOf(compose(D, WRITE.unsent(D)));
  assert.deepEqual(past.map((f) => [f.frame.op, /** @type {any} */ (f.frame).at, /** @type {any} */ (f.frame).values, f.anchors]), [['insert', { ordinal: '5', subspace: '1' }, ['+'], { before: own(D, 4), after: own(D, 5) }]],
    'past the island: at its board position, the island\'s width taken off, its anchors the board\'s bytes');
  WRITE.addEdit(D, { pos: 6, width: 0, text: '*' });        // right after the island's last byte
  assert.deepEqual(framesOf(compose(D, 2)).map((f) => [/** @type {any} */ (f.frame).at, f.anchors]), [[{ ordinal: '3', subspace: '1' }, { before: own(D, 2), after: own(D, 3) }]],
    'beside the island: placed between the board\'s bytes either side of it, never on the island\'s own');
  assert.equal(made(D, framesOf(compose(D, 1))), 'ab*cd+ef', 'the frames make the text shown less the island');
  assert.equal(typed(D), 'abXYZ*cd+ef', 'while the text shown keeps the island\'s words');
  read(E, 'abcdef');
  WRITE.addEdit(E, { pos: 2, width: 3, text: '' });         // an island that removed "bcd": the board never took the delete
  WRITE.markSent(E, 1);
  WRITE.markIsland(E, 1, { kind: 'shell', name: 'malformed_args' });
  WRITE.addEdit(E, { pos: 3, width: 0, text: '+' });        // after "e" in the text shown, "ae|f"
  assert.deepEqual(framesOf(compose(E, 1)).map((f) => [/** @type {any} */ (f.frame).at, f.anchors]), [[{ ordinal: '6', subspace: '1' }, { before: own(E, 5), after: own(E, 6) }]], 'past a removal island: the words it removed counted back in');
  assert.equal(WRITE.boardEdits(E).edits.length, 1, 'the board\'s edits: the island left out');
});

test('BM-2: an insertion inside a link\'s span splits the mark there — one insert, its anchors the span\'s own bytes either side, the span\'s bytes untouched — so the span stands in the text shown in two stretches, the typed words between them', () => {
  read(D, 'abcdefgh');
  /** the link's end: the bytes of "cdef", by identity */
  const span = [{ prefix: D + '.0.1', ordinal: 3, width: 4 }];
  WRITE.addEdit(D, { pos: 5, width: 0, text: 'NEW' });
  const frames = framesOf(compose(D));
  assert.deepEqual(frames.map((f) => [f.frame.op, f.anchors]), [['insert', { before: own(D, 4), after: own(D, 5) }]], 'one insert between two bytes of the span: nothing removed, nothing put back, no byte of the span renamed');
  const shown = applyEdits(REC.doc(D), WRITE.edits(D), (page, width) => REC.pageIds(D, page, width)).doc;
  assert.deepEqual(REC.placedIn(shown.image, span), [{ pos: 3, width: 2 }, { pos: 8, width: 2 }], 'the mark split at the insertion: two stretches, the new words between them and outside both');
});

