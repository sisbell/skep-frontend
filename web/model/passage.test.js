// M-PASSAGE's test: skep's clipboard entry reads whole where every member is
// well formed — of this version, and of the first, which carries no version
// and no lengths — and is no entry where any member is missing, unknown or
// malformed; a paste's plan is the plain text for no entry, a malformed one
// and another board's, and the same material for this board's, each part
// told by its kind — bytes the board holds, the page's own name under this
// load where the board minted it, the rest new words — the plain text cut by
// the lengths, else by the widths, and plain text, traced, where they do not
// sum to it.
import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import * as P from './passage.js';
import * as REC from './records.js';

const ORIGIN = 'http://127.0.0.1:8644', D = '1.0.1.0.7', S = '1.0.1.0.3';
/** bytes the board holds, by identity */
const id = (/** @type {string} */ doc, /** @type {number} */ ordinal, /** @type {number} */ width) => ({ prefix: doc + '.0.1', ordinal, width });
/** the page's own name of bytes it made in a draft, under a load */
const page = (/** @type {string} */ doc, /** @type {number} */ ordinal, /** @type {number} */ width, load = REC.PAGE_LOAD) => ({ prefix: REC.pageSpace(doc), ordinal, width, load });
/** an entry as the page writes it of a draft's words: its naming, the version and the lengths */
const entry = (/** @type {Record<string, unknown>} */ more = {}) => ({ board: ORIGIN, doc: S, member: null, plain: false, pos: null, width: null, ids: [id(S, 4, 5)], version: P.VERSION, lengths: [5], ...more });
/** an entry as the clipboard carries it */
const carried = (/** @type {Record<string, unknown>} */ more = {}) => JSON.stringify(entry(more));

beforeEach(() => { REC._reset(); });

test('an entry reads whole where every member is well formed: this version with its lengths, or none where the parts do not cut its plain text; the first version, written before the version and the lengths were, with no lengths; a published member with its positions there; each kind of part — the board\'s bytes, the page\'s own name under a load, a gap', () => {
  assert.deepEqual(P.readEntry(carried()), entry(), 'this version, whole');
  assert.deepEqual(P.readEntry(carried({ lengths: null })), entry({ lengths: null }), 'its lengths none');
  const { version, lengths, ...first } = entry();
  void version; void lengths;
  assert.deepEqual(P.readEntry(JSON.stringify(first)), entry({ lengths: null }), 'the first version: read with no lengths');
  assert.deepEqual(P.readEntry(carried({ doc: '1.0.1.0.3', member: '1.0.1.0.3.2', plain: true, pos: 9, width: 5 })), entry({ doc: '1.0.1.0.3', member: '1.0.1.0.3.2', plain: true, pos: 9, width: 5 }), 'a published member, the span\'s positions in it');
  assert.deepEqual(P.readEntry(carried({ plain: true })), entry({ plain: true }), 'read at the plain address with no member named');
  const parts = [id(S, 4, 2), page(D, 1, 3), { gap: 'unread', width: 4 }, id('1.0.1.0.3.2', 7, 1)];
  assert.deepEqual(P.readEntry(carried({ ids: parts, lengths: [2, 3, 0, 1] }))?.ids, parts, 'each kind of part, a member\'s own I-space among them');
  assert.equal(P.TYPE, 'application/x-skep-passage', 'skep\'s own type');
  assert.deepEqual(P.entryOf({ board: ORIGIN, doc: S, member: null, plain: false, pos: null, width: null, ids: [id(S, 4, 5)] }, [5]), entry(), 'the entry a copy writes: its naming, this version, its lengths');
});

test('an entry is trusted for nothing: missing, unknown or malformed in any member, or past its bound, it is no entry', () => {
  const no = (/** @type {unknown} */ text, /** @type {string} */ what) => assert.equal(P.readEntry(text), null, what);
  no(undefined, 'no text'); no('', 'empty'); no('{', 'not JSON'); no('[]', 'an array'); no('null', 'null'); no('5', 'a number');
  no(JSON.stringify(entry()) + ' '.repeat(P.ENTRY_MAX), 'past its bound');
  no(carried({ more: 1 }), 'a member it does not know');
  const { board, ...noBoard } = entry();
  void board;
  no(JSON.stringify(noBoard), 'a member missing');
  for (const [k, v] of /** @type {Array<[string, unknown]>} */ ([['board', ''], ['board', 7], ['doc', '1.0.1'], ['doc', 'x'], ['doc', null], ['member', '1.0.1.0.4.2'], ['member', S], ['member', 7], ['plain', 'no'],
    ['pos', 3], ['width', 5], ['ids', []], ['ids', 'x'], ['version', 3], ['version', 1], ['lengths', [5, 1]], ['lengths', [-1]], ['lengths', [1.5]], ['lengths', '5']])) {
    no(carried({ [k]: v }), `${k} ${JSON.stringify(v)}`);
  }
  no(carried({ member: '1.0.1.0.3.2', pos: null, width: null }), 'a member named without its positions');
  no(carried({ member: '1.0.1.0.3.2', pos: 1, width: 4 }), 'its positions not spanning the parts');
  const { version, ...noVersion } = entry();
  void version;
  no(JSON.stringify(noVersion), 'lengths without the version they belong to');
  const { lengths, ...noLengths } = entry();
  void lengths;
  no(JSON.stringify(noLengths), 'the version without its lengths');
  for (const p of [{ ...id(S, 4, 5), more: 1 }, id(S, 0, 5), id(S, 4, 0), { prefix: S + '.0.2', ordinal: 1, width: 5 }, { prefix: S, ordinal: 1, width: 5 }, { prefix: 'x', ordinal: 1, width: 5 },
    { prefix: REC.pageSpace(D), ordinal: 1, width: 5 }, page(D, 1, 5, 'ABC'), page('1.0.1', 1, 5), { gap: 'withheld', width: 5 }, { gap: 'unread', width: 0 }, { gap: 'unread' }, null, 'x']) {
    no(carried({ ids: [p] }), `part ${JSON.stringify(p)}`);
  }
});

test('a paste\'s plan: the plain text where there is no entry, a malformed one or another board\'s — untraced — and where the page holds no board; the same material for this board\'s, its parts cut from the plain text by their lengths, each stretch the board holds by its identity, its words its stretch', () => {
  const plain = { arm: 'plain', traced: false, doc: null };
  assert.deepEqual(P.planOf('', 'words', ORIGIN), plain, 'no entry');
  assert.deepEqual(P.planOf('{', 'words', ORIGIN), plain, 'a malformed one');
  assert.deepEqual(P.planOf(carried(), 'words', 'http://elsewhere'), plain, 'another board\'s origin: plain text, as no paste from another board is offered');
  assert.deepEqual(P.planOf(carried(), 'words', null), plain, 'no board held');
  assert.deepEqual(P.planOf(carried(), 'words', ORIGIN), { arm: 'same', doc: S, pieces: [{ id: id(S, 4, 5), text: 'words' }] }, 'this board\'s: the same material');
  assert.deepEqual(P.planOf(carried({ ids: [id(S, 4, 2), id('1.0.1.0.9', 1, 1), id(S, 9, 3)], lengths: [2, 8, 3] }), 'ab[record]xyz', ORIGIN),
    { arm: 'same', doc: S, pieces: [{ id: id(S, 4, 2), text: 'ab' }, { id: id('1.0.1.0.9', 1, 1), text: '[record]' }, { id: id(S, 9, 3), text: 'xyz' }] }, 'cut by the lengths: an item one position, its stand-in its stretch');
  assert.deepEqual(P.planOf(carried({ ids: [id(S, 4, 2)], lengths: [3] }), 'a\r\nb', ORIGIN), { arm: 'same', doc: S, pieces: [{ id: id(S, 4, 2), text: 'a\nb' }] }, 'the plain text\'s line endings set before it is cut, as a paste sets them');
  assert.equal(P.linesSet('a\r\nb\rc\nd'), 'a\nb\nc\nd', 'CR LF and CR alone a line feed');
});

test('a paste\'s plan, part by part: a gap and the page\'s own name under another load are new words; one under this load is the same material where the board minted its bytes — in part, each stretch by its name — and new words where it has not; new stretches side by side are one; and an entry naming no byte the board holds is plain text', () => {
  const other = 'f'.repeat(32);
  assert.deepEqual(P.planOf(carried({ ids: [id(S, 4, 2), { gap: 'unread', width: 9 }, page(D, 1, 3, other)], lengths: [2, 0, 3] }), 'abxyz', ORIGIN),
    { arm: 'same', doc: S, pieces: [{ id: id(S, 4, 2), text: 'ab' }, { id: null, text: 'xyz' }] }, 'a gap\'s stretch none, the other load\'s new words');
  assert.deepEqual(P.planOf(carried({ ids: [id(S, 4, 2), { gap: 'unread', width: 2 }, page(D, 1, 3, other)], lengths: [2, 2, 3] }), 'abcdxyz', ORIGIN),
    { arm: 'same', doc: S, pieces: [{ id: id(S, 4, 2), text: 'ab' }, { id: null, text: 'cdxyz' }] }, 'a gap\'s words and the other load\'s side by side: one stretch of new words');
  assert.deepEqual(P.planOf(carried({ ids: [page(D, 1, 3)], lengths: [3] }), 'xyz', ORIGIN), { arm: 'plain', traced: false, doc: null }, 'this load\'s words not yet minted: new words, and nothing else — the plain text');
  REC.mint(D, 1, 2, D + '.0.1.40', 9);
  assert.deepEqual(P.planOf(carried({ ids: [page(D, 1, 3)], lengths: [3] }), 'xyz', ORIGIN), { arm: 'same', doc: S, pieces: [{ id: id(D, 40, 2), text: 'xy' }, { id: null, text: 'z' }] },
    'minted by the time the paste is placed: those bytes by the addresses the board minted them at, the rest new words');
  assert.deepEqual(P.planOf(carried({ ids: [page(D, 1, 3, other)], lengths: [3] }), 'xyz', ORIGIN), { arm: 'plain', traced: false, doc: null }, 'the same ordinals under another load: new words, never this page\'s bytes');
  assert.deepEqual(P.planOf(carried({ ids: [page(D, 1, 3, other)], lengths: [4] }), 'xyz', ORIGIN), { arm: 'plain', traced: false, doc: null }, 'and its lengths not cutting the plain text: untraced, nothing of the board\'s named');
  assert.deepEqual(P.planOf(carried({ ids: [page(D, 1, 3)], lengths: [4] }), 'xyzw', ORIGIN), { arm: 'plain', traced: true, doc: S }, 'a page name\'s stretch not its width: plain text, traced');
});

test('the plain text is cut by the lengths, else by the widths of an entry that carries none — and only where they sum to its byte length, never inside a character: else the paste is plain text, traced where a stretch the board holds was named', () => {
  assert.deepEqual(P.planOf(carried({ lengths: [4] }), 'words', ORIGIN), { arm: 'plain', traced: true, doc: S }, 'lengths that do not sum to the plain text');
  assert.deepEqual(P.planOf(carried({ ids: [page(D, 1, 5, 'f'.repeat(32))], lengths: [4] }), 'words', ORIGIN), { arm: 'plain', traced: false, doc: null }, 'nothing the board holds named: untraced');
  const { version, lengths, ...first } = entry();
  void version; void lengths;
  assert.deepEqual(P.planOf(JSON.stringify(first), 'words', ORIGIN), { arm: 'same', doc: S, pieces: [{ id: id(S, 4, 5), text: 'words' }] }, 'the first version, cut by its parts\' widths where they sum');
  assert.deepEqual(P.planOf(JSON.stringify(first), 'word', ORIGIN), { arm: 'plain', traced: true, doc: S }, 'and plain text where they do not');
  assert.deepEqual(P.planOf(carried({ lengths: null }), 'words', ORIGIN), { arm: 'same', doc: S, pieces: [{ id: id(S, 4, 5), text: 'words' }] }, 'lengths none: by the widths');
  assert.deepEqual(P.planOf(carried({ ids: [id(S, 4, 1), id(S, 8, 1)], lengths: [1, 1] }), 'é', ORIGIN), { arm: 'plain', traced: true, doc: S }, 'a cut inside a character');
  assert.deepEqual(P.cutBytes('aé😀b', [1, 2, 4, 1]), ['a', 'é', '😀', 'b'], 'cut at each character, its bytes counted as the page counts them');
  assert.deepEqual([P.cutBytes('aé', [2, 1]), P.cutBytes('ab', [1])], [null, null], 'inside a character, or short of the text');
});
