// T-ARTICLE's test: the article from a record — the withheld block occupies
// its run with its width and never its text; the owner's link marked at its
// span; the selected span marks every block it touches and no other; the
// transcluded run's hairline and C-33's mark; the corner's version statement
// and a draft's chip (C-28), items of one stop that the article never holds
// (they stand beside it, outside the box that clips it); the record rule;
// headings as formatting.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { articleHTML, withheldBlockHTML, cornerHTML, headingLevel } from './article.js';
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
