// M-DERIVE's test: a document's record with its held lines applied — each of
// the five kinds at the positions its frame names, in `k` order, each row in
// the text as it stands after the rows before it, the runs, the blocks and the
// image moving together and the derivation named; a row that cannot be
// applied exactly stopping the apply at that row, named with why; the record
// handed in never changed; the page-local edits a caret makes applied by the
// same kernel and a position carried across them both ways; a span of the
// typed text split into what the delivered text holds and what the edits made;
// a past state's record from an `/op-at` delivery; and the character
// boundaries about a position (FP-6, FP-7, FP-14).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { applyHeld, applyEdits, toShown, toBase, spanRuns, recordAt, boundaries } from './derive.js';
import { deriveBlocks, textOf } from './records.js';
import { vSpan } from './address.js';
import { byteLength } from '../util.js';

const D = '1.0.1.0.2', S = '1.0.1.0.9';
const TEXT = 'Alpha beta.\n\nGamma delta.\n', SOURCE = 'Source words here.';

/** a document's record over one content run of `text`, its image its own bytes */
const docOf = (/** @type {string} */ addr, /** @type {string} */ text) => {
  const n = byteLength(text);
  /** @type {import('./frames.js').Run[]} */
  const runs = [{ pos: 1, width: n, kind: 'content', text, ref: null, origin: null }];
  /** @type {import('./records.js').Doc} */
  const d = {
    addr, account: '1.0.1', kind: 'draft', label: null, standing: null, system: false, extent: n, linkPositions: 0, meta: null,
    runs, from: 1, to: n + 1, readAt: 3, blocks: deriveBlocks(runs), image: [{ pos: 1, width: n, prefix: addr + '.0.1', ordinal: 1 }], origins: [], imageFor: [1, n + 1],
    links: new Set(['1.0.1.0.2.0.2.1']), linksRead: true, members: null, ended: false, whole: n, rev: 4, refused: null,
  };
  return d;
};
/** a content position as a frame spells it */
const at = (/** @type {number} */ ordinal) => ({ ordinal: String(ordinal), subspace: '1' });
/** a held line of D carrying a frame, at ordinal `held` */
const row = (/** @type {number} */ held, /** @type {Record<string, unknown>} */ frame, base = 7) => /** @type {import('./frames.js').HeldLine} */ ({ held, doc: D, base, frame: /** @type {{op: string} & Record<string, unknown>} */ (frame), anchors: null, cause: 'unreachable', sent: false, time: 1, refusal: null });
/** a record's text whole */
const text = (/** @type {import('./records.js').Doc} */ d) => textOf(d.runs, d.from, d.to);
/** what the kernel may change of a record, by value */
const picture = (/** @type {import('./records.js').Doc} */ d) => JSON.stringify({ runs: d.runs, blocks: d.blocks, image: d.image, origins: d.origins, from: d.from, to: d.to, extent: d.extent, whole: d.whole, imageFor: d.imageFor, links: [...d.links], derived: d.derived ?? null });

test('an insert places its values at the position its frame names: the text, the blocks and the image move together, inserted bytes placed by no identity, and the answer is a new record marked derived, the record handed in unchanged', () => {
  const d = docOf(D, TEXT), was = picture(d);
  const out = applyHeld(d, [row(1, { op: 'insert', at: at(7), values: ['new '] })]);
  assert.equal(text(out.doc), 'Alpha new beta.\n\nGamma delta.\n');
  assert.deepEqual([out.applied, out.stopped], [1, null]);
  assert.deepEqual(out.doc.blocks.map((b) => [b.pos, b.width, b.text]), [[1, 17, 'Alpha new beta.'], [18, 13, 'Gamma delta.']], 'the blocks derived from the text as it stands');
  assert.deepEqual(out.doc.image, [{ pos: 1, width: 6, prefix: D + '.0.1', ordinal: 1 }, { pos: 11, width: 20, prefix: D + '.0.1', ordinal: 7 }], 'the image cut at the insert and moved past it: the inserted bytes have no identity');
  assert.deepEqual([out.doc.from, out.doc.to, out.doc.extent, out.doc.whole, out.doc.imageFor], [1, 31, 30, 30, [1, 31]], 'the window and the extent moved by the bytes added');
  assert.deepEqual(out.doc.derived, { from: D, rows: [1], edits: 0, at: null }, 'marked derived: what it was derived from and the rows applied');
  assert.ok(out.doc !== d && out.doc.runs !== d.runs && out.doc.links !== d.links, 'a new record');
  assert.equal(picture(d), was, 'the record handed in is never changed');
  const atoms = applyHeld(d, [row(1, { op: 'insert', at: at(1), values: [{ atom: 'x' }, { hex: 'c328' }, 'ab'] })]).doc;
  assert.deepEqual(atoms.runs.map((r) => [r.pos, r.width, r.kind]), [[1, 1, 'atom'], [2, 2, 'hex'], [4, 28, 'content']], 'an atom one position, hex two characters a position, a string its bytes, joined with the content after it');
});

test('a delete takes its positions out, a copy places a source\'s material by identity, a reinstate the material an identity names from the record itself or the origin at hand, and a rearrange exchanges its first and last stretches', () => {
  const d = docOf(D, TEXT), src = docOf(S, SOURCE);
  const sources = (/** @type {string} */ a) => (a === S ? src : null);
  assert.equal(text(applyHeld(d, [row(1, { op: 'delete', p: at(1), width: '6' })]).doc), 'beta.\n\nGamma delta.\n', 'delete: six positions from 1');
  const copied = applyHeld(d, [row(1, { op: 'copy', at: at(1), specs: [{ source: S, span: vSpan(1, 5) }] })], sources).doc;
  assert.equal(text(copied), 'SourcAlpha beta.\n\nGamma delta.\n', 'copy: the source\'s first five bytes placed at 1');
  assert.deepEqual([copied.image[0], copied.origins], [{ pos: 1, width: 5, prefix: S + '.0.1', ordinal: 1 }, [{ pos: 1, width: 5, doc: S }]], 'their identity the source\'s, a transcluded run');
  const put = applyHeld(d, [row(1, { op: 'reinstate', at: at(14), runs: [{ i_start: D + '.0.1.7', origin: D, width: '4' }] })]).doc;
  assert.equal(text(put), 'Alpha beta.\n\nbetaGamma delta.\n', 'reinstate: the four bytes identity 7 names — "beta" — placed at 14');
  assert.deepEqual(put.image.map((r) => [r.pos, r.width, r.ordinal]), [[1, 13, 1], [14, 4, 7], [18, 13, 14]], 'the material keeps its identity, placed twice');
  const other = applyHeld(d, [row(1, { op: 'reinstate', at: at(1), runs: [{ i_start: S + '.0.1.8', width: '5' }] })], sources).doc;
  assert.equal(text(other), 'wordsAlpha beta.\n\nGamma delta.\n', 'reinstate from an origin at hand: its bytes 8–12');
  assert.equal(text(applyHeld(d, [row(1, { op: 'rearrange', cuts: [at(1), at(7), at(14)] })]).doc), 'beta.\n\nAlpha Gamma delta.\n', 'rearrange with three cuts: [1, 7) and [7, 14) exchanged');
  assert.equal(text(applyHeld(d, [row(1, { op: 'rearrange', cuts: [at(1), at(7), at(14), at(20)] })]).doc), 'Gamma beta.\n\nAlpha delta.\n', 'four cuts: the outer stretches exchanged about the middle one, which stays between them');
});

test('the rows apply in `k` order, each at the positions its frame names in the text as it stands after the rows before it', () => {
  const d = docOf(D, TEXT);
  const out = applyHeld(d, [row(1, { op: 'insert', at: at(1), values: ['X'] }), row(2, { op: 'delete', p: at(1), width: '1' }), row(3, { op: 'insert', at: at(27), values: ['End.'] })]);
  assert.equal(text(out.doc), TEXT.slice(0, 26) + 'End.' + TEXT.slice(26), 'the X placed, then taken out at the position it then held, then a tail at the end');
  assert.deepEqual([out.applied, out.doc.derived], [3, { from: D, rows: [1, 2, 3], edits: 0, at: null }]);
  assert.deepEqual(out.doc.image, d.image, 'inserted and removed again: the image as it was');
});

test('a row that cannot be applied exactly stops the apply at that row and is named with why; the rows before it stand applied', () => {
  const d = docOf(D, TEXT);
  const past = row(2, { op: 'delete', p: at(20), width: '40' });
  const out = applyHeld(d, [row(1, { op: 'insert', at: at(1), values: ['X'] }), past, row(3, { op: 'insert', at: at(1), values: ['Y'] })]);
  assert.deepEqual([out.applied, out.stopped, text(out.doc), out.doc.derived && out.doc.derived.rows], [1, { row: past, why: 'outside' }, 'X' + TEXT, [1]], 'a span not whole in the text: the row named, the rows after it not applied');
  const whys = (/** @type {Record<string, unknown>} */ frame) => applyHeld(d, [row(1, frame)]).stopped?.why;
  assert.equal(whys({ op: 'delete', p: at(1), width: '27' }), 'outside', 'a width past the text');
  assert.equal(whys({ op: 'insert', at: at(28), values: ['x'] }), 'outside', 'an insert past the end; at the end itself it is placed');
  assert.equal(applyHeld(d, [row(1, { op: 'insert', at: at(27), values: ['x'] })]).stopped, null);
  assert.equal(whys({ op: 'insert', at: { ordinal: '1', subspace: '2' }, values: ['x'] }), 'subspace', 'a position in a subspace that is not the content\'s');
  assert.equal(whys({ op: 'copy', at: at(1), specs: [{ source: S, span: vSpan(1, 5) }] }), 'source', 'a copy whose source no record at hand holds');
  assert.equal(whys({ op: 'reinstate', at: at(1), runs: [{ i_start: D + '.0.1.20', width: '20' }] }), 'source', 'a reinstate whose material no image at hand holds whole');
  assert.equal(whys({ op: 'rearrange', cuts: [at(1), at(7)] }), 'cuts', 'two cuts');
  assert.equal(whys({ op: 'rearrange', cuts: [at(7), at(1), at(14)] }), 'cuts', 'cuts out of order');
  assert.equal(whys({ op: 'make_link', from: [], to: [] }), 'frame', 'a frame of a kind this module does not apply');
  assert.equal(whys({ op: 'insert', at: at(1), values: 'x' }), 'frame', 'malformed');
});

test('the page\'s own edits ride the same kernel: each its positions in the text as it stands after the edits before it, an edit outside the text stopping the apply named by its index; a position is carried into the typed text and back', () => {
  const d = docOf(D, TEXT), was = picture(d);
  /** @type {import('./records.js').Edit[]} */
  const edits = [{ pos: 7, width: 0, text: 'new ' }, { pos: 1, width: 6, text: '' }, { pos: 12, width: 5, text: 'gamma' }];
  const out = applyEdits(d, edits);
  assert.equal(text(out.doc), 'new beta.\n\ngamma delta.\n', 'inserted, the head removed, five positions replaced');
  assert.deepEqual([out.applied, out.stopped, out.doc.derived], [3, null, { from: D, rows: [], edits: 3, at: null }]);
  assert.equal(picture(d), was, 'the record handed in unchanged');
  const stopped = applyEdits(d, [{ pos: 1, width: 0, text: 'a' }, { pos: 99, width: 0, text: 'b' }]);
  assert.deepEqual([stopped.applied, stopped.stopped, text(stopped.doc)], [1, { index: 1, why: 'outside' }, 'a' + TEXT]);
  const one = [edits[0]];
  assert.deepEqual([toShown(one, 3), toShown(one, 7), toShown(one, 20)], [3, 11, 24], 'a position before the insert stands; at it and after it moves by the bytes added');
  assert.deepEqual([toBase(one, 3), toBase(one, 11), toBase(one, 9), toBase(one, 24)], [3, 7, 7, 20], 'carried back: one inside the inserted bytes stands at the edit\'s place');
  const cut = [edits[1]];
  assert.deepEqual([toShown(cut, 1), toShown(cut, 4), toShown(cut, 7), toBase(cut, 1), toBase(cut, 5)], [1, 1, 1, 7, 11], 'across a removal: a position inside it stands at the cut, one after it moves up; carried back, the cut\'s place is the position after the bytes removed');
  for (const p of [1, 5, 7, 9, 14, 16, 19, 27]) assert.equal(toBase(edits, toShown(edits, p)), p < 7 ? 7 : p >= 14 && p < 19 ? 14 : p, `${p}: carried there and back — a position inside a removed stretch lands after it, one inside a replaced stretch at its start`);
});

test('a span of the typed text splits into runs in the text\'s order: delivered bytes keep their positions there and new bytes name none, a run moved by the edits before it, never read by the span\'s two ends', () => {
  /** @type {import('./records.js').Edit[]} */
  const insert = [{ pos: 7, width: 0, text: 'new ' }];
  assert.deepEqual(spanRuns([], 3, 5), [{ pos: 3, width: 5, base: 3 }], 'no edits: the span itself');
  assert.deepEqual(spanRuns(insert, 3, 2), [{ pos: 3, width: 2, base: 3 }], 'before the insert: where it stood');
  assert.deepEqual(spanRuns(insert, 12, 3), [{ pos: 12, width: 3, base: 8 }], 'after the insert: moved back by the bytes added');
  assert.deepEqual(spanRuns(insert, 8, 2), [{ pos: 8, width: 2, base: null }], 'inside the insert: new, and no position of the delivered text');
  assert.deepEqual(spanRuns(insert, 1, 20), [{ pos: 1, width: 6, base: 1 }, { pos: 7, width: 4, base: null }, { pos: 11, width: 10, base: 7 }], 'across it: the bytes either side and the new bytes between');
  assert.deepEqual(spanRuns([{ pos: 5, width: 2, text: 'xyz' }], 4, 5), [{ pos: 4, width: 1, base: 4 }, { pos: 5, width: 3, base: null }, { pos: 8, width: 1, base: 7 }], 'a replacement: the new bytes alone are new, the bytes it took out named by no run');
  assert.deepEqual(spanRuns([{ pos: 5, width: 3, text: '' }], 3, 5), [{ pos: 3, width: 2, base: 3 }, { pos: 5, width: 3, base: 8 }], 'a removal inside the span keeps it two runs: the two ends would take in the bytes removed');
  assert.deepEqual(spanRuns([{ pos: 3, width: 0, text: 'é' }], 3, 3), [{ pos: 3, width: 2, base: null }, { pos: 5, width: 1, base: 3 }], 'bytes, not characters');
  assert.deepEqual(spanRuns(insert, 3, 0), [], 'no width: no run');
});

test('runs join only where they continue each other in both texts, and each delivered run stands at `toBase` of its first position, a typed word erased again leaving no seam', () => {
  /** @type {import('./records.js').Edit[]} */
  const typed = [{ pos: 1, width: 0, text: 'a' }, { pos: 2, width: 0, text: 'b' }];
  assert.deepEqual(spanRuns(typed, 1, 4), [{ pos: 1, width: 2, base: null }, { pos: 3, width: 2, base: 1 }], 'two keys typed side by side: one new run');
  assert.deepEqual(spanRuns([{ pos: 5, width: 0, text: 'ab' }, { pos: 5, width: 2, text: '' }], 3, 5), [{ pos: 3, width: 5, base: 3 }], 'typed and erased: the delivered bytes one run again');
  /** @type {import('./records.js').Edit[]} */
  const edits = [{ pos: 7, width: 0, text: 'new ' }, { pos: 1, width: 6, text: '' }, { pos: 12, width: 5, text: 'gamma' }, { pos: 3, width: 1, text: 'XY' }];
  const runs = spanRuns(edits, 1, 24);
  assert.equal(runs.reduce((n, r) => n + r.width, 0), 24, 'the runs cover the span');
  assert.ok(runs.every((r, i) => i === 0 || r.pos === runs[i - 1].pos + runs[i - 1].width), 'in order, without a gap');
  for (const r of runs) if (r.base != null) assert.equal(r.base, toBase(edits, r.pos), `the run at ${r.pos} stands where the position is carried back`);
  assert.ok(runs.some((r) => r.base == null) && runs.some((r) => r.base != null));
});

test('a past state\'s record is derived from an `/op-at` delivery: the document\'s, at the board position read, its blocks derived, no image and no links read', () => {
  const runs = /** @type {import('./frames.js').Run[]} */ ([{ pos: 1, width: 6, kind: 'content', text: 'Older ', ref: null, origin: null }, { pos: 7, width: 5, kind: 'content', text: 'text.', ref: null, origin: null }]);
  const d = recordAt(D, runs, 42);
  assert.deepEqual([d.addr, d.account, d.kind, d.from, d.to, d.extent, text(d), d.image, [...d.links], d.linksRead], [D, '1.0.1', 'draft', 1, 12, 11, 'Older text.', [], [], false]);
  assert.deepEqual([d.blocks.map((b) => [b.pos, b.width, b.text]), d.derived], [[[1, 11, 'Older text.']], { from: D, rows: [], edits: 0, at: 42 }], 'one block of the joined runs; derived from the document at the position read');
});

test('the character boundaries about a position: the byte before it and the byte after it in the content run holding it, a multi-byte character whole, an item whole, none on a side the text holds no character on', () => {
  const runs = /** @type {import('./frames.js').Run[]} */ ([{ pos: 1, width: 4, kind: 'content', text: 'aé b', ref: null, origin: null }, { pos: 5, width: 1, kind: 'atom', text: 'x', ref: null, origin: null }, { pos: 6, width: 1, kind: 'content', text: 'c', ref: null, origin: null }]);
  assert.deepEqual(boundaries(runs, 2), { before: 1, after: 4 }, 'é is two bytes');
  assert.deepEqual(boundaries(runs, 4), { before: 2, after: 5 });
  assert.deepEqual(boundaries(runs, 1), { before: null, after: 2 }, 'nothing before the first position');
  assert.deepEqual(boundaries(runs, 5), { before: 4, after: 6 }, 'the atom is one position whole');
  assert.deepEqual(boundaries(runs, 7), { before: 6, after: null }, 'nothing after the end');
});
