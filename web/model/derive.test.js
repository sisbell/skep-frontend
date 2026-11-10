// M-DERIVE's test: a document's record with its held lines applied — each of
// the five kinds at the positions its frame names, in `k` order, each row in
// the text as it stands after the rows before it, the runs, the blocks and the
// image moving together and the derivation named; a row that cannot be
// applied exactly stopping the apply at that row, named with why; the record
// handed in never changed; the page-local edits a caret makes applied by the
// same kernel, every byte of the typed text named by identity — the delivered
// text's by its permanent address, an edit's by the identity handed in for it
// — and by where it came from, a put-back placing removed bytes again as they
// were, its transcluded runs read by the stored record's one rule; a span of
// the typed text split into what the delivered text holds and
// what the edits made, and a stretch of the delivered text found in it;
// a past state's record from an `/op-at` delivery; and the character
// boundaries and the word stops about a position, the stops macOS's own (FP-6,
// FP-7, FP-14).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { applyHeld, applyEdits, sourceRuns, fromBase, recordAt, boundaries, wordStop } from './derive.js';
import { deriveBlocks, textOf, identityIn, placedIn, pageSpace, transcludedRuns } from './records.js';
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

test('the page\'s own edits ride the same kernel: each its positions in the text as it stands after the edits before it, an edit outside the text stopping the apply named by its index; the record names where every byte came from', () => {
  const d = docOf(D, TEXT), was = picture(d);
  /** @type {import('./records.js').Edit[]} */
  const edits = [{ pos: 7, width: 0, text: 'new ', page: 1 }, { pos: 1, width: 6, text: '' }, { pos: 12, width: 5, text: 'gamma', page: 5 }];
  const out = applyEdits(d, edits);
  assert.equal(text(out.doc), 'new beta.\n\ngamma delta.\n', 'inserted, the head removed, five positions replaced');
  assert.deepEqual([out.applied, out.stopped, out.doc.derived?.from, out.doc.derived?.edits], [3, null, D, 3]);
  assert.deepEqual(out.doc.derived?.source, [{ pos: 1, width: 4, prefix: 'page', ordinal: 1 }, { pos: 5, width: 7, prefix: 'base', ordinal: 7 }, { pos: 12, width: 5, prefix: 'page', ordinal: 5 }, { pos: 17, width: 8, prefix: 'base', ordinal: 19 }], 'every byte by where it came from: the delivered text\'s position, or the page\'s ordinal for a byte an edit made');
  assert.equal(picture(d), was, 'the record handed in unchanged');
  const stopped = applyEdits(d, [{ pos: 1, width: 0, text: 'a' }, { pos: 99, width: 0, text: 'b' }]);
  assert.deepEqual([stopped.applied, stopped.stopped, text(stopped.doc)], [1, { index: 1, why: 'outside' }, 'a' + TEXT]);
});

test('every byte of the typed text has an identity that holds through insertion, deletion and moves: a delivered byte its permanent address, a byte an edit made the identity handed in for it — the page\'s own space where none is — found again wherever the edits since moved it', () => {
  const d = docOf(D, TEXT), own = pageSpace(D);
  /** @type {import('./records.js').Edit[]} */
  const typed = [{ pos: 7, width: 0, text: 'new ', page: 1 }];
  const one = applyEdits(d, typed).doc;
  assert.deepEqual(identityIn(one.image, 5, 8), [{ prefix: D + '.0.1', ordinal: 5, width: 2 }, { prefix: own, ordinal: 1, width: 4 }, { prefix: D + '.0.1', ordinal: 7, width: 2 }], 'a span across typed words is named whole: the delivered bytes either side, the page\'s own between');
  const word = identityIn(one.image, 7, 3);
  assert.deepEqual(word, [{ prefix: own, ordinal: 1, width: 3 }], '"new", by the page\'s identity');
  // an insertion before it, a deletion around it — the byte before it and the byte after it — and the whole typed word still found by its identity
  const moved = applyEdits(d, [...typed, { pos: 1, width: 0, text: 'ab', page: 5 }, { pos: 8, width: 1, text: '' }, { pos: 11, width: 1, text: '' }]).doc;
  assert.equal(text(moved), 'abAlphanewbeta.\n\nGamma delta.\n');
  assert.deepEqual(placedIn(moved.image, word), [{ pos: 8, width: 3 }], 'two positions on for the insertion, one back for the deletion before it: the same bytes');
  assert.deepEqual(placedIn(moved.image, [{ prefix: own, ordinal: 4, width: 1 }]), [], 'the typed byte the deletion took stands nowhere');
  // minted: the caller hands the board's addresses in for the page's ordinals, and the same bytes are named by them
  const minted = applyEdits(d, typed, (page, width) => [{ prefix: D + '.0.1', ordinal: 100 + page, width }]).doc;
  assert.deepEqual(identityIn(minted.image, 7, 4), [{ prefix: D + '.0.1', ordinal: 101, width: 4 }], 'after its ack a typed byte is named by its I-address');
  assert.deepEqual(minted.derived?.source, one.derived?.source, 'and where it came from stands: the page made it');
});

test('the transcluded runs of the typed text are read by the stored record\'s one rule: one origin\'s image runs meeting one run, a byte the page made inside it parting it in two (issue #304; FP-38)', () => {
  const quoted = { ...docOf(D, TEXT), origins: [{ pos: 1, width: 12, doc: S }] };
  // "Alpha beta.⏎" is S's, in two image runs that meet in the text though S's addresses jump between them
  quoted.image = [{ pos: 1, width: 6, prefix: S + '.0.1', ordinal: 1 }, { pos: 7, width: 6, prefix: S + '.0.1', ordinal: 40 }, { pos: 13, width: 14, prefix: D + '.0.1', ordinal: 13 }];
  const derived = applyEdits(quoted, []).doc, typed = applyEdits(quoted, [{ pos: 4, width: 0, text: 'x', page: 1 }]).doc;
  assert.deepEqual([derived.origins, typed.origins], [transcludedRuns(D, derived.image), transcludedRuns(D, typed.image)], 'the stored record\'s one rule, read over the typed text\'s image');
  assert.deepEqual(derived.origins, [{ pos: 1, width: 12, doc: S }], 'the two image runs one run');
  assert.deepEqual(typed.origins, [{ pos: 1, width: 3, doc: S }, { pos: 5, width: 9, doc: S }], 'a byte typed inside it: two runs either side of the page\'s own byte');
});

test('a put-back places the bytes an earlier edit removed again as they were — their text, their identity and where they came from — all of them or a stretch of them, and one of bytes no edit removed stops the apply', () => {
  const d = docOf(D, TEXT), base = applyEdits(d, []).doc;
  /** @type {import('./records.js').Edit[]} */
  const cut = [{ pos: 1, width: 6, text: '' }];
  const out = applyEdits(d, cut);
  assert.deepEqual([text(out.doc), out.removed], ['beta.\n\nGamma delta.\n', [[{ prefix: D + '.0.1', ordinal: 1, width: 6 }]]], 'what the edit removed, by identity');
  const back = applyEdits(d, [...cut, { pos: 1, width: 0, text: '', back: { of: 0, from: 0, width: 6 } }]).doc;
  assert.deepEqual([text(back), back.image, back.derived?.source], [TEXT, base.image, base.derived?.source], 'put back whole: the text, its image and its source as before the removal');
  const part = applyEdits(d, [...cut, { pos: 1, width: 0, text: '', back: { of: 0, from: 2, width: 3 } }]).doc;
  assert.deepEqual([text(part), identityIn(part.image, 1, 3)], ['phabeta.\n\nGamma delta.\n', [{ prefix: D + '.0.1', ordinal: 3, width: 3 }]], 'a stretch of them: the same bytes');
  // a typed word removed and put back keeps the page's identity for it
  const typed = applyEdits(d, [{ pos: 1, width: 0, text: 'xy', page: 1 }, { pos: 1, width: 2, text: '' }, { pos: 1, width: 0, text: '', back: { of: 1, from: 0, width: 2 } }]).doc;
  assert.deepEqual([text(typed), identityIn(typed.image, 1, 2), sourceRuns(typed, 1, 2)], ['xy' + TEXT, [{ prefix: pageSpace(D), ordinal: 1, width: 2 }], [{ pos: 1, width: 2, base: null, page: 1 }]]);
  const none = applyEdits(d, [{ pos: 1, width: 0, text: '', back: { of: 0, from: 0, width: 2 } }]);
  assert.deepEqual([none.applied, none.stopped], [0, { index: 0, why: 'source' }], 'no edit removed them: stopped, named by its index');
});

test('a span of the typed text splits into runs in the text\'s order: delivered bytes keep their positions there and new bytes name none, a run moved by the edits before it, never read by the span\'s two ends', () => {
  const d = docOf(D, TEXT);
  const over = (/** @type {import('./records.js').Edit[]} */ edits) => applyEdits(d, edits).doc;
  const insert = over([{ pos: 7, width: 0, text: 'new ', page: 1 }]);
  assert.deepEqual(sourceRuns(d, 3, 5), [{ pos: 3, width: 5, base: 3, page: null }], 'no edits: the span itself');
  assert.deepEqual(sourceRuns(insert, 3, 2), [{ pos: 3, width: 2, base: 3, page: null }], 'before the insert: where it stood');
  assert.deepEqual(sourceRuns(insert, 12, 3), [{ pos: 12, width: 3, base: 8, page: null }], 'after the insert: moved back by the bytes added');
  assert.deepEqual(sourceRuns(insert, 8, 2), [{ pos: 8, width: 2, base: null, page: 2 }], 'inside the insert: new, and no position of the delivered text');
  assert.deepEqual(sourceRuns(insert, 1, 20), [{ pos: 1, width: 6, base: 1, page: null }, { pos: 7, width: 4, base: null, page: 1 }, { pos: 11, width: 10, base: 7, page: null }], 'across it: the bytes either side and the new bytes between');
  assert.deepEqual(sourceRuns(over([{ pos: 5, width: 2, text: 'xyz', page: 1 }]), 4, 5), [{ pos: 4, width: 1, base: 4, page: null }, { pos: 5, width: 3, base: null, page: 1 }, { pos: 8, width: 1, base: 7, page: null }], 'a replacement: the new bytes alone are new, the bytes it took out named by no run');
  assert.deepEqual(sourceRuns(over([{ pos: 5, width: 3, text: '' }]), 3, 5), [{ pos: 3, width: 2, base: 3, page: null }, { pos: 5, width: 3, base: 8, page: null }], 'a removal inside the span keeps it two runs: the two ends would take in the bytes removed');
  assert.deepEqual(sourceRuns(over([{ pos: 3, width: 0, text: 'é', page: 1 }]), 3, 3), [{ pos: 3, width: 2, base: null, page: 1 }, { pos: 5, width: 1, base: 3, page: null }], 'bytes, not characters');
  assert.deepEqual(sourceRuns(insert, 3, 0), [], 'no width: no run');
});

test('runs join only where they continue each other in both texts, a typed word erased again leaving no seam; and a stretch of the delivered text is found in the typed text wherever the edits left it standing', () => {
  const d = docOf(D, TEXT);
  const over = (/** @type {import('./records.js').Edit[]} */ edits) => applyEdits(d, edits).doc;
  assert.deepEqual(sourceRuns(over([{ pos: 1, width: 0, text: 'a', page: 1 }, { pos: 2, width: 0, text: 'b', page: 2 }]), 1, 4), [{ pos: 1, width: 2, base: null, page: 1 }, { pos: 3, width: 2, base: 1, page: null }], 'two keys typed side by side: one new run');
  assert.deepEqual(sourceRuns(over([{ pos: 5, width: 0, text: 'ab', page: 1 }, { pos: 5, width: 2, text: '' }]), 3, 5), [{ pos: 3, width: 5, base: 3, page: null }], 'typed and erased: the delivered bytes one run again');
  const edited = over([{ pos: 7, width: 0, text: 'new ', page: 1 }, { pos: 1, width: 6, text: '' }, { pos: 12, width: 5, text: 'gamma', page: 5 }, { pos: 3, width: 1, text: 'XY', page: 10 }]);
  const runs = sourceRuns(edited, 1, 25);
  assert.equal(runs.reduce((n, r) => n + r.width, 0), 25, 'the runs cover the span');
  assert.ok(runs.every((r, i) => i === 0 || r.pos === runs[i - 1].pos + runs[i - 1].width), 'in order, without a gap');
  for (const r of runs) if (r.base != null) assert.deepEqual(fromBase(edited, r.base, r.width), [{ pos: r.pos, width: r.width }], `the run at ${r.pos} is the delivered stretch at ${r.base}, found back where it stands`);
  assert.ok(runs.some((r) => r.base == null) && runs.some((r) => r.base != null));
  assert.deepEqual(fromBase(d, 3, 5), [{ pos: 3, width: 5 }], 'a record no edit derived: the stretch itself');
  assert.deepEqual(fromBase(over([{ pos: 9, width: 0, text: '--', page: 1 }]), 7, 5), [{ pos: 7, width: 2 }, { pos: 11, width: 3 }], 'cut where words were typed inside it: two stretches');
  assert.deepEqual(fromBase(over([{ pos: 1, width: 6, text: '' }]), 2, 3), [], 'removed whole: none');
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

/** a content run of `text` from `pos` */
const contentRun = (/** @type {number} */ pos, /** @type {string} */ text) => /** @type {import('./frames.js').Run} */ ({ pos, width: byteLength(text), kind: 'content', text, ref: null, origin: null });
/** every stop a word step reaches from `pos`, in the order it reaches them */
const stops = (/** @type {import('./frames.js').Run[]} */ runs, /** @type {number} */ pos, /** @type {-1 | 1} */ dir) => {
  const out = [];
  for (let p = wordStop(runs, pos, dir); p != null; p = wordStop(runs, p, dir)) { assert.ok(out.length < 64 && p !== pos, `the step from ${pos} moves on, at ${p}`); out.push(p); pos = p; }
  return out;
};

test('a word step stops where macOS\'s own does: → at the end of the first word ending after the position, ← at the start of the last word beginning before it, white space, punctuation and lines holding no word passed over, the text\'s end where no word lies that way, and no stop past it (K-71)', () => {
  const lines = [contentRun(1, 'First line.\n\nSecond line here.\n')];
  assert.deepEqual(stops(lines, 3, 1), [6, 11, 20, 25, 30, 32], 'mid-word to its end, over the blank line, past the last word to the text\'s end');
  assert.deepEqual(stops(lines, 31, -1), [26, 21, 14, 7, 1]);
  assert.deepEqual([wordStop(lines, 32, 1), wordStop(lines, 1, -1)], [null, null], 'nothing that way at either end');
  const mixed = 'Hello, world. Next (one) two-three don\'t 3.14 foo_bar "quoted"  x';
  assert.deepEqual(stops([contentRun(1, mixed)], 1, 1), [6, 13, 19, 24, 29, 35, 41, 46, 54, 62, 66], 'punctuation passed over, an apostrophe, a decimal point and an underscore inside a word');
  assert.deepEqual(stops([contentRun(1, mixed)], 66, -1), [65, 56, 47, 42, 36, 30, 26, 21, 15, 8, 1]);
  const dashes = [contentRun(1, '"Hi" -- ok...\n---\n***end')];
  assert.deepEqual(stops(dashes, 1, 1), [4, 11, 25], 'a line of dashes holds no word');
  assert.deepEqual(stops(dashes, 25, -1), [22, 9, 2, 1], 'the text\'s start where no word lies that way');
  assert.deepEqual(stops([contentRun(1, 'abc   \n   \ndef  ')], 4, 1), [15, 17], 'a line of spaces passed over, the spaces after the last word to the text\'s end');
});

test('a word step reads the text by bytes across the runs that touch: a word split between two runs is one word, a multi-byte word and an astral character counted in bytes, an item one word whole, and no step crossing a gap in the text held (K-71)', () => {
  assert.deepEqual(stops([contentRun(1, 'Sec'), contentRun(4, 'ond word')], 1, 1), [7, 12], 'split between two runs');
  assert.deepEqual(stops([contentRun(1, 'café olé\n')], 1, 1), [6, 11, 12], 'é is two bytes');
  assert.deepEqual(stops([contentRun(1, 'café olé\n')], 12, -1), [7, 1]);
  assert.deepEqual(stops([contentRun(1, '😀 wörd')], 1, 1), [11], 'the emoji\'s four bytes passed over, ö two');
  const item = [contentRun(1, 'ab '), /** @type {import('./frames.js').Run} */ ({ pos: 4, width: 1, kind: 'atom', text: 'x', ref: null, origin: null }), contentRun(5, ' cd')];
  assert.deepEqual(stops(item, 1, 1), [3, 5, 8], 'the atom one word');
  assert.deepEqual(stops(item, 8, -1), [6, 4, 1]);
  const gap = [contentRun(1, 'alpha beta  '), contentRun(100, 'gamma')];
  assert.deepEqual(stops(gap, 8, 1), [11, 13], 'the spaces after the last word to the held stretch\'s end, nothing past the gap');
  assert.deepEqual(stops(gap, 103, -1), [100], 'the held stretch\'s start, nothing before the gap');
  assert.equal(wordStop(gap, 50, 1), null, 'a position in the gap holds nothing');
});

test('a word step extending a selection stops at its anchor rather than crossing it, and leaves it again on the next step, as macOS\'s does; one that reaches the anchor or starts there is unchanged (K-71)', () => {
  const runs = [contentRun(1, 'First line.')];
  assert.equal(wordStop(runs, 6, -1, 3), 3, '← from the end of "First" holds at the anchor inside it');
  assert.equal(wordStop(runs, 3, 1, 5), 5, '→ past the anchor holds there');
  assert.equal(wordStop(runs, 3, 1, 6), 6, 'a stop at the anchor is the anchor');
  assert.equal(wordStop(runs, 3, 1, 3), 6, 'from the anchor the step goes on');
  assert.equal(wordStop(runs, 3, -1, 3), 1);
  assert.equal(wordStop(runs, 3, 1), 6, 'no anchor: the word\'s end');
});
