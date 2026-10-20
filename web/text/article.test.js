// T-ARTICLE's test: the article from a record — the withheld block occupies
// its run with its width and never its text; the owner's link marked at its
// span; the selected span marks every block it touches and no other; the
// transcluded run's hairline and C-33's mark; the corner's version statement
// and a draft's chip (C-28), items of one stop that the article never holds
// (they stand beside it, outside the box that clips it); the record rule;
// headings as formatting. The plan the canvas's bars are laid out from: the
// head's three lines, a fourth where links touch the document; a block's
// pieces with its hairline's label, C-33's mark and its symbols at its size;
// a heading's margins standing it nearer the block it heads; the same blocks,
// in the same order, as the HTML.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { articleHTML, articlePlan, withheldBlockHTML, cornerHTML, headingLevel } from './article.js';
import { MEASURE } from '../plane/layout.js';
import { t } from '../strings.js';

/** @returns {import('./article.js').ArticleView} */
const view = (/** @type {Partial<import('./article.js').ArticleView>} */ o = {}) => ({
  selected: null, focus: null, marks: [], symbols: [], countAt: () => ({ n: 0, social: false }), wholeLinks: 0,
  sessionAccount: '1.0.1', localTrust: true, notebook: true, scene: false, originKinds: new Map(), deviceLabel: 'dev-notebook', ownerFingerprint: 'e4272902a11439e5', keyPresent: true, ...o,
});
/** @returns {import('../model/records.js').Doc} */
const doc = (/** @type {Partial<import('../model/records.js').Doc>} */ o = {}) => ({
  addr: '1.0.1.0.3', account: '1.0.1', kind: 'edition', label: 'x', standing: 'public', system: false, extent: 100, linkPositions: 0,
  meta: { doc: '1.0.1.0.3', published: true, owner: '1.0.1', birth: '1.0.1.0.3.1', birthExtent: 50, placed: null, baseExtent: null, source: null, asOf: 1 },
  runs: [], from: 1, to: 101, blocks: [], origins: [], originsFor: null, links: new Set(), linksRead: true, members: 2, whole: 100, rev: 0, refused: null, ...o,
});

test('a withheld block occupies its positions and shows its width, never its text', () => {
  const html = withheldBlockHTML({ pos: 1467, width: 240, kind: 'withheld', text: '', origin: '1.0.1.0.1003' }, doc(), view(), '1.0.1');
  assert.ok(html.includes('data-withheld="1"') && html.includes('data-width="240"'));
  assert.ok(html.includes('240 positions') && html.includes('origin 1.0.1.0.1003'));
  assert.ok(html.includes(t('C-67.pointer')));
  assert.ok(html.includes(t('C-36.owner-grant.arm')), 'the acting person with no grant meets the owner-grant arm');
  const guest = withheldBlockHTML({ pos: 1, width: 3, kind: 'withheld', text: '', origin: '1.0.1.0.2' }, doc(), view({ sessionAccount: null }), '1.0.1');
  assert.ok(guest.includes('no key on this device'), 'a guest meets R56\'s key-absent arm');
});

test('the owner\'s link is marked in place at its span and nowhere else', () => {
  const d = doc({ blocks: [{ pos: 1, width: 20, kind: 'para', text: 'abcdefghijklmnopqrst', origin: null }] });
  const mark = /** @type {any} */ ({ link: { addr: 'L' }, end: 'from', pos: 5, width: 4, mark: { hue: '#7fb2ff', linker: 'you', form: [], value: 1, own: true }, linker: 'you', far: '1.0.1.0.4', farEnd: null, farWhole: true });
  const html = articleHTML(d, view({ marks: [mark] }), '1.0.1');
  assert.ok(/<span class="seg lip depth1"[^>]*>efgh<\/span>/.test(html), html);
  assert.ok(html.includes('1 link touches this document'));
});

test('the selected span marks every block it touches and no other', () => {
  const blocks = [{ pos: 1, width: 10, kind: /** @type {const} */ ('para'), text: 'aaaaaaaa', origin: null }, { pos: 11, width: 10, kind: /** @type {const} */ ('para'), text: 'bbbbbbbb', origin: null }, { pos: 21, width: 10, kind: /** @type {const} */ ('para'), text: 'cccccccc', origin: null }];
  const d = doc({ blocks });
  const inside = articleHTML(d, view({ selected: { addr: d.addr, pos: 14, width: 3 } }), '1.0.1');
  assert.ok(inside.includes('class="sp blk-para sel" data-addr="1.0.1.0.3" data-pos="11"'), 'the block holding the span is marked');
  assert.ok(!inside.includes('sel" data-addr="1.0.1.0.3" data-pos="1"') && !inside.includes('sel" data-addr="1.0.1.0.3" data-pos="21"'), 'no other block is');
  const across = articleHTML(d, view({ selected: { addr: d.addr, pos: 8, width: 6 } }), '1.0.1');
  assert.ok(across.includes('sel" data-addr="1.0.1.0.3" data-pos="1"') && across.includes('sel" data-addr="1.0.1.0.3" data-pos="11"') && !across.includes('sel" data-addr="1.0.1.0.3" data-pos="21"'), 'a span across two blocks marks both');
  const elsewhere = articleHTML(d, view({ selected: { addr: '1.0.1.0.4', pos: 14, width: 3 } }), '1.0.1');
  assert.ok(!elsewhere.includes(' sel"'), 'a span in another document marks nothing here');
});

test('a transcluded run from a draft carries the hairline and C-33\'s mark in a published document', () => {
  const d = doc({ blocks: [{ pos: 1, width: 12, kind: 'para', text: 'abcdefghijkl', origin: null }], origins: [{ pos: 5, width: 4, doc: '1.0.1.0.1003' }] });
  const html = articleHTML(d, view({ originKinds: new Map([['1.0.1.0.1003', 'draft']]) }), '1.0.1');
  assert.ok(html.includes('class="hairline whole"') && html.includes('≡ 1.0.1.0.1003'));
  assert.ok(html.includes(t('C-33')));
  assert.ok(html.includes('this document windows 1.0.1.0.1003'), 'the scene-offer at a windowing document');
});

test('the corner: version k of n with R20\'s teaching keyed by venue; a draft\'s chip C-28', () => {
  const c = cornerHTML(doc(), view());
  assert.ok(c.includes(t('F.version-of', { k: 2, n: 2 })));
  assert.ok(c.includes('moves to each new one'));
  assert.ok(c.includes(t('F.published.notebook')));
  const draft = cornerHTML(doc({ kind: 'draft', meta: null }), view({ localTrust: true }));
  assert.ok(draft.includes(t('C-28.flag-on')) && !draft.includes(t('C-28') + '<'), 'flag-on never renders "Readable by you alone"');
  const off = cornerHTML(doc({ kind: 'draft', meta: null }), view({ localTrust: false }));
  assert.ok(off.includes('Readable by you alone'));
  assert.ok(![c, draft, off].some((h) => h.includes('tabindex')), 'no item takes a focus of its own: the corner is one stop (K-57)');
});

test('the article holds no corner: its items stand beside it, outside the box that clips the article', () => {
  const html = articleHTML(doc({ blocks: [{ pos: 1, width: 10, kind: 'para', text: 'aaaaaaaa', origin: null }] }), view({ wholeLinks: 2 }), '1.0.1');
  assert.ok(!html.includes('data-corner') && !html.includes('class="corner"'), html);
  assert.ok(!html.includes(t('F.version-of', { k: 2, n: 2 })) && !html.includes(t('F.whole-links', { n: 2 })), 'nor any of its items');
  const draft = articleHTML(doc({ kind: 'draft', meta: null, blocks: [{ pos: 1, width: 10, kind: 'para', text: 'aaaaaaaa', origin: null }] }), view(), '1.0.1');
  assert.ok(!draft.includes(t('C-28.flag-on')) && !draft.includes(t('C-28')), 'a draft\'s chip is its corner\'s, never its article\'s');
});

test('a record atom renders as the record it is; a heading as formatting', () => {
  const d = doc({ addr: '1.0.1.0.1', blocks: [{ pos: 1, width: 1, kind: 'atom', text: JSON.stringify({ type: 'skep-enroll', keys: [{ label: 'dev-notebook', anchor: false }] }), origin: null }] });
  const html = articleHTML(d, view(), '1.0.1');
  assert.ok(html.includes(t('F.home-record.yours')) && html.includes('dev-notebook'));
  assert.equal(headingLevel('## The artifact chain'), 2);
  const h = articleHTML(doc({ blocks: [{ pos: 1, width: 10, kind: 'para', text: '## Title', origin: null }] }), view(), '1.0.1');
  assert.ok(h.includes('<h3 class="sp blk-para"'));
});

/** a link marked at a span of the first edition, as LK hands it in */
const shown = (/** @type {number} */ pos, /** @type {number} */ width) => /** @type {any} */ ({ link: { addr: 'L' + pos, type: null }, end: 'from', pos, width, mark: { hue: '#7fb2ff', linker: 'you', form: [], value: 1, own: true }, linker: 'you', far: '1.0.1.0.4', farEnd: null, farWhole: true });

test('the plan\'s head is the article\'s: three lines, a fourth where links touch the document', () => {
  const d = doc({ blocks: [{ pos: 1, width: 20, kind: 'para', text: 'abcdefghijklmnopqrst', origin: null }] });
  const bare = articlePlan(d, view(), '1.0.1').filter((r) => r.kind === 'head');
  assert.deepEqual(bare.map((r) => r.pieces.map((p) => p.text).join('')), ['1.0.1.0.3', t('B1.state-line'), '1.0.1 · dev-notebook · e427 2902 a114 39e5']);
  assert.deepEqual(bare.map((r) => r.pieces[0].size), [1, MEASURE.head, MEASURE.head], 'the address at the body\'s size, the state line and the byline at the head\'s');
  const marked = articlePlan(d, view({ marks: [shown(5, 4)] }), '1.0.1').filter((r) => r.kind === 'head');
  assert.equal(marked.length, 4);
  assert.equal(marked[3].pieces[0].box, true, 'the presence line opens with its ⟡, an inline-block');
  assert.ok(marked[3].pieces.map((p) => p.text).join('').endsWith(t('B1.presence.1')));
});

test('a block\'s plan carries its hairline\'s label, C-33\'s mark and its symbols, at its own size', () => {
  const d = doc({ blocks: [{ pos: 1, width: 12, kind: 'para', text: '# abcdefghij', origin: null }], origins: [{ pos: 5, width: 4, doc: '1.0.1.0.1003' }] });
  const v = view({ originKinds: new Map([['1.0.1.0.1003', 'draft']]), marks: [shown(9, 2)], symbols: [shown(9, 2)], countAt: () => ({ n: 3, social: false }) });
  const r = /** @type {import('../plane/layout.js').Row} */ (articlePlan(d, v, '1.0.1').find((x) => x.pos === 1));
  const k = MEASURE.h2;
  assert.equal(r.size, k, 'the heading\'s box at its own size: its lines its size\'s line boxes');
  const label = r.pieces.find((p) => p.text === '≡ 1.0.1.0.1003');
  assert.ok(label && label.size === MEASURE.label * k && label.lead > 0, 'the hairline\'s label whole, at its size, led by the sameness boundary');
  const mark = r.pieces.find((p) => p.text === t('C-33'));
  assert.ok(mark && mark.box && mark.size === MEASURE.mark * k, 'C-33\'s mark: an inline-block');
  assert.equal(r.pieces.filter((p) => p.text === '⟡' && p.box).length, 1, 'the symbol at its span');
  assert.equal(r.pieces.filter((p) => !p.box && p.text !== '≡ 1.0.1.0.1003').map((p) => p.text).join(''), '# abcdefghij', 'the document\'s own characters, every one');
  assert.equal(r.float && r.float.text, t('F.others-count', { n: 3 }), 'the others\' count floats at its end');
});

test('a heading\'s plan stands it nearer the block it heads: its room above at its own size, the smaller room below; a paragraph\'s gap after it alone', () => {
  const d = doc({ blocks: [{ pos: 1, width: 10, kind: 'para', text: 'aaaaaaaa', origin: null }, { pos: 11, width: 10, kind: 'para', text: '## Part', origin: null }, { pos: 21, width: 10, kind: 'para', text: 'bbbbbbbb', origin: null }] });
  const plan = articlePlan(d, view(), '1.0.1');
  const at = (/** @type {number} */ pos) => /** @type {import('../plane/layout.js').Row} */ (plan.find((x) => x.pos === pos));
  const k = MEASURE.h3;
  assert.deepEqual([at(11).size, at(11).before, at(11).after], [k, MEASURE.headingBefore * k, MEASURE.headingAfter * k], 'the heading: its size, its room above, its room below');
  assert.ok(at(11).before > at(11).after && at(11).before > MEASURE.gap, 'more room above it than below it, and more than a paragraph\'s gap');
  assert.deepEqual([at(1).size, at(1).before, at(1).after], [1, 0, MEASURE.gap], 'a paragraph: the body\'s size, its gap after it alone');
  const head = plan.filter((r) => r.kind === 'head').map((r) => r.size);
  assert.deepEqual(head, [1, MEASURE.head, MEASURE.head], 'the head\'s address at the body\'s size, its state line and byline at the head\'s');
});

test('the plan and the HTML decide the same blocks, in the same order', () => {
  const d = doc({
    blocks: [
      { pos: 1, width: 1, kind: 'atom', text: JSON.stringify({ type: 'skep-enroll', keys: [{ label: 'dev-notebook', anchor: false }] }), origin: null },
      { pos: 2, width: 10, kind: 'para', text: '## Title', origin: null },
      { pos: 12, width: 240, kind: 'withheld', text: '', origin: '1.0.1.0.1003' },
      { pos: 252, width: 1, kind: 'ref', text: '', origin: null },
      { pos: 253, width: 4, kind: 'hex', text: 'abcd', origin: null },
      { pos: 257, width: 10, kind: 'para', text: 'aaaa bbbb', origin: null },
    ],
    origins: [{ pos: 257, width: 4, doc: '1.0.1.0.1003' }],
  });
  const html = articleHTML(d, view(), '1.0.1');
  const inHTML = [...html.matchAll(/<(?:p|h\d|span) class="(?:sp[^"]*|withheld)"[^>]*?data-pos="(\d+)"/g)].map((m) => Number(m[1]));
  const plan = articlePlan(d, view(), '1.0.1');
  assert.deepEqual(plan.filter((r) => r.pos != null).map((r) => r.pos), inHTML);
  assert.deepEqual(inHTML, [1, 2, 12, 252, 253, 257]);
  const at = plan.findIndex((r) => r.pos === 1);
  assert.deepEqual(plan.slice(at, at + 2).map((r) => [r.pos, r.pieces[0].text]), [[1, t('F.home-record.yours')], [null, 'dev-notebook · device']], 'a record\'s words, then its keys on a row of their own');
  assert.equal((plan.find((r) => r.kind === 'withheld') || { width: 0 }).width, 240, 'a withheld run carries its width');
  assert.equal(plan.filter((r) => r.kind === 'chrome').length, 1, 'the scene-offer: the page\'s chrome after the blocks');
  assert.equal(articlePlan(doc({ refused: 'withheld' }), view(), '1.0.1').length, 3, 'a refused document is its head alone');
});
