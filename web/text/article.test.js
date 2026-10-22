// T-ARTICLE's test: the article from a record — the withheld block occupies
// its run with its width and never its text, its entitlement arm the one
// rule's for the reader (C-39's face reads it too): a signed-in principal's
// owner-grant default, whatever key signed the session; a guest whose device
// holds a key for this board C-36's key-present default, never told that no
// key on this device opens an account (a mutant that decides on the session
// alone turns red); a guest with none R56's key-absent default, naming the
// owner. C-67's clause beneath the arm decided over the origin's whole
// admitted-claim set (PUB-5.124, RES-164): nothing in its place where no
// claim stands, or where the lookup, a claim's link or its home is not read
// (a mutant that keeps the pointer unconditional turns red); the pointer
// where any admitted claim's FROM holds bytes outside the origin — a
// delegate's among them — even listed after one that quotes (a mutant that
// decides by the first claim turns red); the QUOTING sibling where every
// admitted claim's FROM holds the origin's bytes or none, naming the
// lowest-addressed claimant; a claim homed in a draft or a doc 1, another
// account's, or typed outside the edition class never counted (a mutant with
// no admission test turns red); the owner's link marked at its
// span, and a stretch several links mark in the one mark they merge into —
// neutral in the hue where their linkers differ, lighter only where every one
// was followed (a mutant that takes the first link's mark turns red); the
// selected span marks every block it touches and no other, and the
// focus its own block, by the one rule T-LAYER marks a standing article by; the
// transcluded run's hairline and C-33's mark, once per run however marks and
// symbols cut it (a mutant that sets them at every stretch turns red), each
// hairline carrying the whole run's positions, in every block the run
// crosses (a mutant that carries the block's part alone turns red); the
// corner's version statement and a draft's chip (C-28), items of one stop
// that the article never holds (they stand beside it, outside the box that
// clips it); the record rule; headings as formatting. Each symbol AT ITS
// SPAN, in the HTML and the plan alike: right after the last word its span
// touches — never at the paragraph's end past the words after it (a mutant
// that sets them there turns red), never inside a word, after a hyphen where
// the line may break there — once, in the last paragraph a span crossing two
// touches; after a run's chrome where the word runs into its hairline with no
// break between them; an end standing in two stretches marked in both, the
// text between them not, its one symbol after its last stretch (a mutant
// that marks or stands it by the first stretch alone turns red); each mark
// carrying the ends it draws — a symbol its link and its end's key, a
// stretch the links and the keys of the ends marking it, in one order — so a
// link's two ends in one paragraph are two marks a click tells apart (a
// mutant that writes the link alone turns red); a symbol
// whose far end floats titled with "its passage is not in ⟨D⟩'s current
// text" (a mutant that leaves the title its type alone turns red). The plan
// the canvas's bars are laid out from: the head's three lines, a fourth where
// links touch the document; a block's
// pieces with its hairline's label, C-33's mark and its symbols at its size;
// a heading's margins standing it nearer the block it heads; the same blocks,
// in the same order, as the HTML. The scene-mode variant, a reading scene's
// pane's article: no scene-offer and no row for one in the plan, and no mark
// a control — the plane's offer, symbols and presence ⟡ are (a mutant that
// offers the scene in a pane, or keeps a symbol's button there, turns red).
// Each withheld run names its own origin's owner, whoever owns the document
// windowing it — in its head, its arm and the owner it carries for C-39's
// face (a mutant that names the article's owner, or one owner for every run,
// turns red).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { articleHTML, articlePlan, withheldBlockHTML, entitlementArm, editionClause, placeholderOf, cornerHTML, headingLevel, blockMarks } from './article.js';
import { MEASURE } from '../plane/layout.js';
import { HUE, NEUTRAL_HUE, VISITED_ALPHA } from '../plane/register.js';
import { mergedMark } from '../links/links.js';
import { t } from '../strings.js';
import { esc } from '../util.js';
import { accountOf, homeOf, resolveSpan } from '../model/address.js';

/** @typedef {import('../model/records.js').Reader} Reader */
/** the readers the arm is decided for: signed in, with a key bound at this board and with none; a guest with a key here; a guest with none */
const SIGNED = /** @type {Reader} */ ({ account: '1.0.1', keyPresent: true }), BARE = /** @type {Reader} */ ({ account: '1.0.1', keyPresent: false });
const KEYED = /** @type {Reader} */ ({ account: null, keyPresent: true }), KEYLESS = /** @type {Reader} */ ({ account: null, keyPresent: false });

/** @returns {import('./article.js').ArticleView} */
const view = (/** @type {Partial<import('./article.js').ArticleView>} */ o = {}) => ({
  selected: null, focus: null, marks: [], mergedMark, symbols: [], floats: () => false, countAt: () => ({ n: 0, social: false }), wholeLinks: 0,
  reader: SIGNED, localTrust: true, notebook: true, scene: false, originKinds: new Map(), originOwner: (a) => accountOf(a) || '', clauseOf: () => null,
  deviceLabel: 'dev-notebook', ownerFingerprint: 'e4272902a11439e5', ...o,
});
/** @returns {import('../model/records.js').Doc} */
const doc = (/** @type {Partial<import('../model/records.js').Doc>} */ o = {}) => ({
  addr: '1.0.1.0.3', account: '1.0.1', kind: 'edition', label: 'x', standing: 'public', system: false, extent: 100, linkPositions: 0,
  meta: { doc: '1.0.1.0.3', published: true, owner: '1.0.1', birth: '1.0.1.0.3.1', birthExtent: 50, placed: null, baseExtent: null, source: null, asOf: 1 },
  runs: [], from: 1, to: 101, blocks: [], image: [], origins: [], imageFor: null, links: new Set(), linksRead: true, members: 2, whole: 100, rev: 0, refused: null, ...o,
});

test('a withheld block occupies its positions and shows its width, never its text', () => {
  const html = withheldBlockHTML({ pos: 1467, width: 240, kind: 'withheld', text: '', origin: '1.0.1.0.1003' }, doc(), view());
  assert.ok(html.includes('data-withheld="1"') && html.includes('data-width="240"'));
  assert.ok(html.includes('240 positions') && html.includes('origin 1.0.1.0.1003'));
  assert.ok(!html.includes('class="clause"') && !html.includes(t('C-67.pointer')), 'no clause its origin\'s edition claims decide: nothing renders in its place');
  assert.ok(html.includes(t('C-36.owner-grant.arm')), 'the acting person with no grant meets the owner-grant arm');
  const run = /** @type {import('../model/records.js').Block} */ ({ pos: 1, width: 3, kind: 'withheld', text: '', origin: '1.0.1.0.2' });
  const keyless = withheldBlockHTML(run, doc(), view({ reader: KEYLESS }));
  assert.ok(keyless.includes('no key on this device'), 'a guest with no key meets R56\'s key-absent arm');
  const keyed = withheldBlockHTML(run, doc(), view({ reader: KEYED }));
  assert.ok(keyed.includes(esc(t('C-36.guest.key'))) && !keyed.includes('no key on this device'), 'a guest whose device holds a key for this board meets C-36\'s key-present arm, and is never told it holds none');
});

test('the entitlement arm is one rule, by the reader, and the placeholder carries what it answers', () => {
  const ownerGrant = { id: 'C-36.owner-grant.arm', text: t('C-36.owner-grant.arm') };
  assert.deepEqual(entitlementArm(SIGNED, '1.0.2'), ownerGrant, 'a signed-in principal with no grant: the owner-grant default');
  assert.deepEqual(entitlementArm(BARE, '1.0.2'), ownerGrant, 'whatever key signed the session, or none');
  assert.deepEqual(entitlementArm(KEYED, '1.0.2'), { id: 'C-36.guest.key', text: t('C-36.guest.key') }, 'a guest whose device holds a key for this board: C-36\'s key-present default — sign in, then ask');
  assert.deepEqual(entitlementArm(KEYLESS, '1.0.2'), { id: 'R56.key-absent', text: t('R56.key-absent', { owner: '1.0.2' }) }, 'a guest with no key: R56\'s key-absent default, naming the owner');
  const run = /** @type {import('../model/records.js').Block} */ ({ pos: 1, width: 3, kind: 'withheld', text: '', origin: '1.0.1.0.2' });
  for (const reader of [SIGNED, BARE, KEYED, KEYLESS]) {
    const html = withheldBlockHTML(run, doc(), view({ reader }));
    assert.ok(html.includes(`<span class="arm">${esc(entitlementArm(reader, '1.0.1').text)}</span>`), `the placeholder's arm is the rule's for ${JSON.stringify(reader)}`);
  }
});

// ---- C-67's clause, decided over the origin's admitted claims ---------------------------------------------------------

const ORIGIN = '1.0.1.0.1003', OWNER = '1.0.1', R20 = '1.1.0.1.0.1.0.3.14';
/** a span of a document's own bytes, as a link's slot reads it */
const bytesOf = (/** @type {string} */ doc, /** @type {number} */ ord, /** @type {number} */ w) => resolveSpan({ start: `${doc}.0.1.${ord}`, width: '0.0.0.0.0.0.0.' + w });
/**
 * An edition claim at `addr` as the page holds its two reads: typed R20, homed where its address says, its home
 * published and owned by the home's account, its FROM twenty of the home's own bytes — each unless `o` says otherwise.
 * @param {string} addr
 * @param {{type?: string | null, from?: import('../model/address.js').EndRef[], published?: boolean | null, claimant?: string, link?: null}} [o]
 * @returns {import('./article.js').ClaimSeen}
 */
const claim = (addr, o = {}) => {
  const home = homeOf(addr) || addr;
  return {
    claim: addr, home, link: o.link === null ? null : { type: o.type === undefined ? R20 : o.type, from: o.from ?? [bytesOf(home, 1, 20)] },
    published: o.published === undefined ? true : o.published, claimant: o.claimant ?? (accountOf(home) || ''),
  };
};
const POINTER = { id: 'C-67.pointer', text: t('C-67.pointer') };
const quoting = (/** @type {string} */ claimant) => ({ id: 'C-67.quoting', text: t('C-67.quoting', { claimant }) });

test('C-67\'s clause is the empty place where the origin carries no edition claim, or where its lookup is unread or refused (RES-85)', () => {
  assert.equal(editionClause(ORIGIN, OWNER, []), null, 'no claim on the origin: nothing in the clause\'s place');
  assert.equal(editionClause(ORIGIN, OWNER, null), null, 'the lookup unread or refused: nothing');
});

test('the pointer where an admitted claim\'s edition holds bytes the reader can reach; the QUOTING sibling where its FROM holds the origin\'s, or none (PUB-5.124)', () => {
  const ed = '1.0.1.0.9.0.2.1';
  assert.deepEqual(editionClause(ORIGIN, OWNER, [claim(ed)]), POINTER, 'the owner\'s edition over its own fresh bytes');
  assert.deepEqual(editionClause(ORIGIN, OWNER, [claim(ed, { type: R20 + '.2' })]), POINTER, 'a descriptive subtype of the edition class');
  assert.deepEqual(editionClause(ORIGIN, OWNER, [claim(ed, { from: [bytesOf(ORIGIN, 1, 240)] })]), quoting(OWNER), 'a window-composed edition quoting the draft: its FROM the origin\'s own bytes');
  assert.deepEqual(editionClause(ORIGIN, OWNER, [claim(ed, { from: [bytesOf('1.0.1.0.9', 1, 5), bytesOf(ORIGIN, 1, 240)] })]), quoting(OWNER), 'the mixed shape: one fresh run beside the windowed one, the cycle one run wide');
  assert.deepEqual(editionClause(ORIGIN, OWNER, [claim(ed, { from: [] })]), quoting(OWNER), 'a claim whose FROM is empty');
  assert.deepEqual(editionClause(ORIGIN, OWNER, [claim('1.0.1.1.0.4.0.2.1')]), POINTER, 'a delegate\'s published edition: admitted by address containment');
});

test('the three answers are decided over the whole admitted set, never per claim: the pointer where any passes, QUOTING naming the lowest-addressed claimant only where every one quotes (RES-152, RES-164)', () => {
  const windowed = [bytesOf(ORIGIN, 1, 240)];
  const delegates = claim('1.0.1.1.0.4.0.2.1', { from: windowed }), owners = claim('1.0.1.0.11.0.2.1', { from: windowed });
  assert.deepEqual(editionClause(ORIGIN, OWNER, [delegates, claim('1.0.1.0.9.0.2.1')]), POINTER, 'a delegate\'s quoting fork claim listed before the owner\'s edition: the pointer, never the first claim\'s QUOTING');
  assert.deepEqual(editionClause(ORIGIN, OWNER, [delegates, owners]), quoting(OWNER), 'every one quoting: QUOTING naming 1.0.1, the lowest-addressed claimant, never the first listed');
});

test('a claim failing admission — its home a draft or its claimant\'s own doc 1, its owner neither the origin\'s nor a delegate of it, its type outside the edition class — displays nowhere (PUB-5.99, PUB-5.100)', () => {
  /** @type {Array<[string, import('./article.js').ClaimSeen]>} */
  const failing = [
    ['its home a draft', claim('1.0.1.0.9.0.2.1', { published: false })],
    ['its home the claimant\'s own doc 1', claim('1.0.1.0.1.0.2.5')],
    ['its home a member of the claimant\'s doc 1', claim('1.0.1.0.1.2.0.2.1')],
    ['its home another account\'s', claim('1.0.2.0.5.0.2.1')],
    ['a citation, never an edition claim', claim('1.0.1.0.9.0.2.1', { type: '1.1.0.1.0.1.0.3.13' })],
    ['an untyped link', claim('1.0.1.0.9.0.2.1', { type: null })],
  ];
  for (const [why, c] of failing) assert.equal(editionClause(ORIGIN, OWNER, [c]), null, `${why}: not admitted, the empty place`);
  assert.deepEqual(editionClause(ORIGIN, OWNER, [...failing.map(([, c]) => c), claim('1.0.1.0.11.0.2.1', { from: [] })]), quoting(OWNER), 'beside one admitted claim that quotes: QUOTING, the claims failing admission never counted');
});

test('a claim whose link or whose home the page has not read leaves the clause the empty place, unless an admitted claim known already passes', () => {
  const unread = claim('1.0.1.0.9.0.2.1', { link: null }), homeless = claim('1.0.1.0.10.0.2.1', { published: null });
  assert.equal(editionClause(ORIGIN, OWNER, [unread]), null, 'its link unread');
  assert.equal(editionClause(ORIGIN, OWNER, [homeless]), null, 'its home unread');
  assert.equal(editionClause(ORIGIN, OWNER, [claim('1.0.1.0.11.0.2.1', { from: [] }), unread]), null, 'a quoting claim beside an unread one: never QUOTING on reads not made');
  assert.deepEqual(editionClause(ORIGIN, OWNER, [unread, homeless, claim('1.0.1.0.12.0.2.1')]), POINTER, 'an admitted claim known to pass: the pointer, whatever the others turn out to be');
});

test('the placeholder\'s clause is the one its origin\'s claims decide; where they decide none, the arm\'s own copy stands alone', () => {
  const run = /** @type {import('../model/records.js').Block} */ ({ pos: 1, width: 3, kind: 'withheld', text: '', origin: ORIGIN });
  /** @type {Record<string, import('./article.js').ClaimSeen[]>} */
  const held = { [ORIGIN]: [claim('1.0.1.0.11.0.2.1', { from: [] })] };
  const clauseOf = (/** @type {string} */ o) => editionClause(o, OWNER, held[o] ?? null);
  assert.deepEqual(placeholderOf(run, SIGNED, (a) => accountOf(a) || '', clauseOf).clause, quoting(OWNER));
  const html = withheldBlockHTML(run, doc(), view({ clauseOf }));
  assert.ok(html.includes(`<span class="arm">${esc(t('C-36.owner-grant.arm'))}</span><span class="clause">${esc(t('C-67.quoting', { claimant: OWNER }))}</span>`), html);
  held[ORIGIN] = [];
  const empty = withheldBlockHTML(run, doc(), view({ clauseOf }));
  assert.ok(empty.includes(`<span class="arm">${esc(t('C-36.owner-grant.arm'))}</span></span>`) && !empty.includes('class="clause"'), `no claim: the arm's own copy alone, nothing in the clause's place: ${empty}`);
});

test('the owner\'s link is marked in place at its span and nowhere else', () => {
  const d = doc({ blocks: [{ pos: 1, width: 20, kind: 'para', text: 'abcdefghijklmnopqrst', origin: null }] });
  const mark = /** @type {any} */ ({ link: { addr: 'L' }, end: 'from', pos: 5, width: 4, runs: [{ pos: 5, width: 4 }], mark: { hue: '#7fb2ff', linker: 'you', form: [], value: 1, own: true }, linker: 'you', far: '1.0.1.0.4', farEnd: null, farWhole: true });
  const html = articleHTML(d, view({ marks: [mark] }), '1.0.1');
  assert.ok(/<span class="seg lip depth1"[^>]*>efgh<\/span>/.test(html), html);
  assert.ok(html.includes('1 link touches this document'));
});

test('a stretch several links mark takes the one mark they merge into: neutral in the hue where their linkers differ, lighter only where every one was followed', () => {
  const d = doc({ blocks: [{ pos: 1, width: 20, kind: 'para', text: 'abcdefghijklmnopqrst', origin: null }] });
  const at = (/** @type {number} */ pos, /** @type {number} */ width, /** @type {import('../plane/register.js').Mark} */ mark) => /** @type {any} */ ({ link: { addr: 'L' + pos }, end: 'from', pos, width, runs: [{ pos, width }], mark, linker: mark.linker, far: '1.0.1.0.4', farEnd: null, farWhole: true });
  const yours = at(5, 6, { hue: HUE.you, linker: 'you', form: [], value: VISITED_ALPHA, own: true });
  const owners = at(8, 6, { hue: HUE.owner, linker: 'owner', form: [], value: 1, own: true });
  const html = articleHTML(d, view({ marks: [yours, owners] }), '1.0.1');
  const lip = (/** @type {string} */ text) => (html.match(new RegExp(`<span class="(seg lip[^"]*)" style="([^"]*)"[^>]*>${text}</span>`)) || []).slice(1);
  assert.deepEqual(lip('efg'), ['seg lip depth1 visited', `--mark-hue:${HUE.you};--mark-value:${VISITED_ALPHA}`], 'the person\'s followed link alone: their hue, lighter');
  assert.deepEqual(lip('hij'), ['seg lip depth2', `--mark-hue:${NEUTRAL_HUE};--mark-value:1`], 'both: neutral, and full where one is not followed — never the first link\'s mark');
  assert.deepEqual(lip('klm'), ['seg lip depth1', `--mark-hue:${HUE.owner};--mark-value:1`], 'the owner\'s link alone: the owner\'s hue');
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

test('a block\'s marks are one rule, the article\'s and a standing article\'s alike: the selection where it touches, the focus at its block', () => {
  const blocks = [{ pos: 1, width: 10, kind: /** @type {const} */ ('para'), text: 'aaaaaaaa', origin: null }, { pos: 11, width: 10, kind: /** @type {const} */ ('para'), text: 'bbbbbbbb', origin: null }, { pos: 21, width: 10, kind: /** @type {const} */ ('para'), text: 'cccccccc', origin: null }];
  const d = doc({ blocks });
  const across = { addr: d.addr, pos: 8, width: 6 }, at = { addr: d.addr, pos: 21 };
  assert.deepEqual(blocks.map((b) => blockMarks(d.addr, b, across, at)), [{ sel: true, lit: false }, { sel: true, lit: false }, { sel: false, lit: true }], 'the span across two blocks marks both; the focus its own block alone');
  assert.deepEqual(blocks.map((b) => blockMarks(d.addr, b, { addr: '1.0.1.0.4', pos: 8, width: 6 }, { addr: '1.0.1.0.4', pos: 21 })), blocks.map(() => ({ sel: false, lit: false })), 'a selection and a focus in another document mark nothing here');
  assert.deepEqual(blocks.map((b) => blockMarks(d.addr, b, null, null)), blocks.map(() => ({ sel: false, lit: false })));
  const html = articleHTML(d, view({ selected: across, focus: at }), '1.0.1');
  const classes = blocks.map((b) => ((html.match(new RegExp(`class="([^"]*)" data-addr="${d.addr.replace(/\./g, '\\.')}" data-pos="${b.pos}"`)) || [])[1] || '').split(' '));
  assert.deepEqual(classes.map((c) => ({ sel: c.includes('sel'), lit: c.includes('lit') })), blocks.map((b) => blockMarks(d.addr, b, across, at)), 'the article is made with the marks the rule names, block by block');
});

test('a transcluded run from a draft carries the hairline and C-33\'s mark in a published document', () => {
  const d = doc({ blocks: [{ pos: 1, width: 12, kind: 'para', text: 'abcdefghijkl', origin: null }], origins: [{ pos: 5, width: 4, doc: '1.0.1.0.1003' }] });
  const html = articleHTML(d, view({ originKinds: new Map([['1.0.1.0.1003', 'draft']]) }), '1.0.1');
  assert.ok(html.includes('class="hairline whole"') && html.includes('≡ 1.0.1.0.1003'));
  assert.ok(html.includes(t('C-33')));
  assert.ok(html.includes('this document windows 1.0.1.0.1003'), 'the scene-offer at a windowing document');
});

test('each hairline of a run carries the run\'s own positions in the document windowing it, the passage its gesture to the source carries', () => {
  const blocks = [{ pos: 1, width: 12, kind: /** @type {const} */ ('para'), text: 'abcdefghijkl', origin: null }, { pos: 13, width: 12, kind: /** @type {const} */ ('para'), text: 'mnopqrstuvwx', origin: null }];
  const html = articleHTML(doc({ blocks, origins: [{ pos: 9, width: 10, doc: '1.0.1.0.1003' }] }), view(), '1.0.1');
  const hairlines = [...html.matchAll(/<span class="hairline (\w+)" data-src="([^"]*)" data-pos="(\d+)" data-width="(\d+)"/g)].map((m) => [m[1], m[2], Number(m[3]), Number(m[4])]);
  assert.deepEqual(hairlines, [['whole', '1.0.1.0.1003', 9, 10], ['compact', '1.0.1.0.1003', 9, 10]], `the run, in each block it crosses: ${html}`);
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

/** a link marked at a span of the first edition, as LK hands it in, its end's key the span's */
const shown = (/** @type {number} */ pos, /** @type {number} */ width) => /** @type {any} */ ({ link: { addr: 'L' + pos, type: null }, end: 'from', key: `${pos}+${width}`, pos, width, runs: [{ pos, width }], mark: { hue: '#7fb2ff', linker: 'you', form: [], value: 1, own: true }, linker: 'you', far: '1.0.1.0.4', farEnd: null, farWhole: true });

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
  const d = doc({ blocks: [{ pos: 1, width: 13, kind: 'para', text: '# abcdefgh ij', origin: null }], origins: [{ pos: 5, width: 4, doc: '1.0.1.0.1003' }] });
  const v = view({ originKinds: new Map([['1.0.1.0.1003', 'draft']]), marks: [shown(9, 2)], symbols: [shown(9, 2)], countAt: () => ({ n: 3, social: false }) });
  const r = /** @type {import('../plane/layout.js').Row} */ (articlePlan(d, v, '1.0.1').find((x) => x.pos === 1));
  const k = MEASURE.h2;
  assert.equal(r.size, k, 'the heading\'s box at its own size: its lines its size\'s line boxes');
  const label = r.pieces.find((p) => p.text === '≡ 1.0.1.0.1003');
  assert.ok(label && label.size === MEASURE.label * k && label.lead > 0, 'the hairline\'s label whole, at its size, led by the sameness boundary');
  const mark = r.pieces.find((p) => p.text === t('C-33'));
  assert.ok(mark && mark.box && mark.size === MEASURE.mark * k, 'C-33\'s mark: an inline-block');
  const sym = r.pieces.findIndex((p) => p.text === '⟡' && p.box);
  assert.equal(r.pieces.filter((p) => p.text === '⟡' && p.box).length, 1, 'one symbol');
  assert.deepEqual([r.pieces[sym - 1].text, r.pieces[sym + 1].text], ['gh', ' ij'], 'the symbol at its span: after its last word, before the word after it');
  assert.equal(r.pieces.filter((p) => !p.box && p.text !== '≡ 1.0.1.0.1003').map((p) => p.text).join(''), '# abcdefgh ij', 'the document\'s own characters, every one');
  assert.equal(r.float && r.float.text, t('F.others-count', { n: 3 }), 'the others\' count floats at its end');
});

/** a paragraph's pieces in the plan, a symbol as ⟡ and C-33's mark as its id, every other piece its text */
const piecesOf = (/** @type {import('../model/records.js').Doc} */ d, /** @type {import('./article.js').ArticleView} */ v, /** @type {number} */ pos) =>
  /** @type {import('../plane/layout.js').Row} */ (articlePlan(d, v, '1.0.1').find((x) => x.pos === pos)).pieces.map((p) => (p.box && p.text === t('C-33') ? 'C-33' : p.text));
/** the links' symbols in the HTML, in order (the head's presence ⟡ is no link's) */
const symsIn = (/** @type {string} */ html) => html.match(/<span class="sym [^"]*" data-link="[^"]*"/g) || [];

test('a symbol stands right after the last word its span touches, never at the paragraph\'s end past the words after it', () => {
  const d = doc({ blocks: [{ pos: 1, width: 13, kind: 'para', text: 'one two three', origin: null }] });
  const v = view({ marks: [shown(5, 3)], symbols: [shown(5, 3)] });
  assert.deepEqual(piecesOf(d, v, 1), ['one ', 'two', '⟡', ' three']);
  const html = articleHTML(d, v, '1.0.1');
  assert.equal(symsIn(html).length, 1);
  assert.ok(/>two<\/span><span class="sym [^"]*"[^>]*>⟡<\/span> three<\/p>/.test(html), html);
});

test('a span ending inside a word takes its symbol at the word\'s end — after a hyphen where the line may break there — never inside the word', () => {
  const d = doc({ blocks: [{ pos: 1, width: 13, kind: 'para', text: 'one two three', origin: null }] });
  const v = view({ marks: [shown(5, 2)], symbols: [shown(5, 2)] });
  assert.deepEqual(piecesOf(d, v, 1), ['one ', 'tw', 'o', '⟡', ' three'], 'the word "two" kept whole');
  assert.ok(/>tw<\/span>o<span class="sym [^"]*"[^>]*>⟡<\/span> three/.test(articleHTML(d, v, '1.0.1')));
  const path = doc({ blocks: [{ pos: 1, width: 26, kind: 'para', text: 'see frontend-annotation.md', origin: null }] });
  assert.deepEqual(piecesOf(path, view({ symbols: [shown(5, 5)] }), 1), ['see frontend-', '⟡', 'annotation.md'], '"front": the word runs to the hyphen, where P-LAY breaks the line');
});

test('a span across two paragraphs takes one symbol, in the last paragraph it touches', () => {
  const d = doc({ blocks: [{ pos: 1, width: 12, kind: 'para', text: 'alpha beta', origin: null }, { pos: 13, width: 11, kind: 'para', text: 'gamma delta', origin: null }] });
  const v = view({ symbols: [shown(7, 8)] });
  assert.deepEqual([piecesOf(d, v, 1), piecesOf(d, v, 13)], [['alpha beta'], ['gamma', '⟡', ' delta']]);
  const html = articleHTML(d, v, '1.0.1');
  assert.equal(symsIn(html).length, 1);
  assert.ok(/data-pos="13"[^>]*>gamma<span class="sym/.test(html), html);
});

test('where its span\'s last word runs into a run\'s hairline, the symbol stands after the run\'s chrome; where the line may break before the hairline, before it', () => {
  const X = '1.0.1.0.1003';
  // the run opens at the space after "two": the label's ≡ joins "two" in the line, so the symbol stands after the chrome, before the space
  const d = doc({ blocks: [{ pos: 1, width: 13, kind: 'para', text: 'one two three', origin: null }], origins: [{ pos: 8, width: 6, doc: X }] });
  const draft = view({ originKinds: new Map([[X, 'draft']]), symbols: [shown(5, 3)] });
  assert.deepEqual(piecesOf(d, draft, 1), ['one two', '≡ ' + X, 'C-33', '⟡', ' three']);
  assert.ok(/<span class="pubmark" data-mark="C-33">[^<]*<\/span><span class="sym [^"]*"[^>]*>⟡<\/span> three<\/span>/.test(articleHTML(d, draft, '1.0.1')), 'inside the run\'s stretch, after its chrome');
  assert.deepEqual(piecesOf(d, view({ originKinds: new Map([[X, 'edition']]), symbols: [shown(5, 3)] }), 1), ['one two', '≡ ' + X, '⟡', ' three']);
  // after an em dash the line may break before the hairline: the symbol stands before the run's chrome
  const dash = doc({ blocks: [{ pos: 1, width: 15, kind: 'para', text: 'one—two three', origin: null }], origins: [{ pos: 7, width: 3, doc: X }] });
  assert.deepEqual(piecesOf(dash, view({ symbols: [shown(1, 6)] }), 1), ['one—', '⟡', '≡ ' + X, 'two', ' three']);
});

test('a run cut by a mark and a symbol carries its boundary, its hairline and C-33\'s mark once, at its first stretch', () => {
  const X = '1.0.1.0.1003';
  const d = doc({ blocks: [{ pos: 1, width: 12, kind: 'para', text: 'abcdefghijkl', origin: null }], origins: [{ pos: 5, width: 4, doc: X }] });
  const v = view({ originKinds: new Map([[X, 'draft']]), marks: [shown(6, 2)] });
  const html = articleHTML(d, v, '1.0.1');
  assert.equal((html.match(/class="hairline /g) || []).length, 1, html);
  assert.equal((html.match(/data-mark="C-33"/g) || []).length, 1);
  assert.equal((html.match(/class="seg[^"]*same opens"/g) || []).length, 1, 'the boundary at its first stretch alone');
  assert.equal((html.match(/class="seg[^"]*same[^"]*"/g) || []).length, 3, 'its ground under each of its three stretches');
  assert.deepEqual(piecesOf(d, v, 1), ['abcd', '≡ ' + X, 'C-33', 'e', 'fg', 'h', 'ijkl']);
  const words = doc({ blocks: [{ pos: 1, width: 11, kind: 'para', text: 'ab cd ef gh', origin: null }], origins: [{ pos: 4, width: 5, doc: X }] });
  assert.deepEqual(piecesOf(words, view({ symbols: [shown(4, 2)] }), 1), ['ab ', '≡ ' + X, 'cd', '⟡', ' ef', ' gh'], 'a symbol standing inside the run cuts it and repeats none of its chrome');
});

test('an end standing in two stretches is marked in both, the text between them not, and takes one symbol, after the last word of its last stretch', () => {
  const d = doc({ blocks: [{ pos: 1, width: 18, kind: 'para', text: 'one two three four', origin: null }] });
  const cut = { ...shown(5, 3), runs: [{ pos: 5, width: 3 }, { pos: 15, width: 4 }] };
  const v = view({ marks: [cut], symbols: [cut] });
  assert.deepEqual(piecesOf(d, v, 1), ['one ', 'two', ' three ', 'four', '⟡'], 'its symbol after "four", never after "two"');
  const html = articleHTML(d, v, '1.0.1');
  assert.deepEqual(html.match(/<span class="seg lip[^"]*"[^>]*>[^<]*<\/span>/g)?.map((x) => x.replace(/<[^>]*>/g, '')), ['two', 'four'], 'marked in both stretches alone');
  assert.equal(symsIn(html).length, 1);
});

test('each mark carries the ends it draws: a symbol its link and its end\'s key, a stretch the links and the keys of the ends marking it, in one order — a link\'s two ends in one paragraph two marks a click tells apart', () => {
  const d = doc({ blocks: [{ pos: 1, width: 18, kind: 'para', text: 'one two three four', origin: null }] });
  // one link's two ends, at "two" and at "four", and another link's end over "three four"
  const L = { addr: 'L', type: null };
  const two = { ...shown(5, 3), link: L }, four = { ...shown(15, 4), link: L }, other = shown(9, 10);
  const html = articleHTML(d, view({ marks: [two, four, other], symbols: [two, four] }), '1.0.1');
  const syms = [...html.matchAll(/<span class="sym [^"]*" data-link="([^"]*)" data-end="([^"]*)"/g)].map((m) => m.slice(1));
  assert.deepEqual(syms, [['L', two.key], ['L', four.key]], `each symbol its own end's: ${html}`);
  const lips = [...html.matchAll(/<span class="seg lip[^"]*" style="[^"]*" data-links="([^"]*)" data-ends="([^"]*)">([^<]*)<\/span>/g)].map((m) => m.slice(1));
  assert.deepEqual(lips, [['L', two.key, 'two'], ['L9', other.key, 'three '], ['L L9', `${four.key} ${other.key}`, 'four']], 'each stretch the ends marking it, their keys in the order it names their links');
});

test('a symbol whose far end floats is titled with its type and "its passage is not in ⟨D⟩\'s current text"; one whose far end stands somewhere, with its type alone', () => {
  const d = doc({ blocks: [{ pos: 1, width: 13, kind: 'para', text: 'one two three', origin: null }] });
  const s = { ...shown(5, 3), link: { addr: 'L5', type: '1.1.0.1.0.1.0.3.13' }, far: '1.0.1.0.127' };
  const title = (/** @type {boolean} */ floats) => (articleHTML(d, view({ symbols: [s], floats: () => floats }), '1.0.1').match(/<span class="sym [^"]*" data-link="L5"[^>]* title="([^"]*)"/) || [])[1];
  assert.equal(title(true), esc('1.1.0.1.0.1.0.3.13 · ' + t('F.floating', { D: '1.0.1.0.127' })), 'said at the symbol, before anyone follows it');
  assert.equal(title(false), '1.1.0.1.0.1.0.3.13');
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

test('the scene-mode variant, a pane\'s article: no scene-offer and no row for one, and no mark a control — on the plane the offer, the symbols and the presence ⟡ are', () => {
  const d = doc({ blocks: [{ pos: 1, width: 12, kind: 'para', text: 'abcdefghijkl', origin: null }], origins: [{ pos: 5, width: 4, doc: '1.0.1.0.1003' }] });
  const links = { marks: [shown(9, 2)], symbols: [shown(9, 2)] };
  const plane = view(links), pane = view({ ...links, scene: true });
  const onPlane = articleHTML(d, plane, '1.0.1'), inPane = articleHTML(d, pane, '1.0.1');
  assert.ok(onPlane.includes('class="offer"') && articlePlan(d, plane, '1.0.1').some((r) => r.kind === 'chrome'), 'on the plane: the offer at the windowing document, and its row in the plan');
  assert.ok(!inPane.includes('class="offer"') && !articlePlan(d, pane, '1.0.1').some((r) => r.kind === 'chrome'), 'in a pane: no offer, and no row for one');
  assert.ok(/<span class="sym [^"]*" data-link="L9"[^>]* role="button" tabindex="-1"/.test(onPlane) && /data-reveal="[^"]*" role="button" tabindex="-1"/.test(onPlane), 'on the plane: the link\'s symbol and the presence ⟡ are buttons a click acts on');
  assert.ok(symsIn(inPane).length === 1 && inPane.includes('data-reveal="1.0.1.0.3"'), 'in a pane: the link\'s symbol and the presence ⟡ stand');
  assert.ok(!/ role=| tabindex=/.test(inPane), 'and nothing in the pane\'s article is a control or a stop');
});

/** a withheld run's placeholder in an article's HTML, by its first position: the owner it carries, its head and its arm as the reader meets them; null where none stands there */
const placeholderAt = (/** @type {string} */ html, /** @type {number} */ pos) => {
  const m = new RegExp(`<span class="withheld" data-pos="${pos}"([^>]*)><span class="wh-head">([^<]*)</span><span class="arm">([^<]*)</span>`).exec(html);
  return m ? { owner: (/ data-owner="([^"]*)"/.exec(m[1]) || [])[1] ?? null, head: m[2], arm: m[3] } : null;
};

test('each withheld run names its own origin\'s owner — in its head, its arm and the owner it carries — whoever owns the document windowing it', () => {
  const d = doc({ blocks: [
    { pos: 1, width: 10, kind: 'para', text: 'Tumbler.', origin: null },
    { pos: 11, width: 240, kind: 'withheld', text: '', origin: '1.0.2.0.2' },
    { pos: 251, width: 10, kind: 'para', text: 'Between.', origin: null },
    { pos: 261, width: 4, kind: 'withheld', text: '', origin: '1.0.1.0.1003' },
  ] });
  const runs = [{ pos: 11, width: 240, origin: '1.0.2.0.2', owner: '1.0.2' }, { pos: 261, width: 4, origin: '1.0.1.0.1003', owner: '1.0.1' }];
  for (const reader of [SIGNED, KEYED, KEYLESS]) {
    const html = articleHTML(d, view({ reader }), '1.0.1');
    for (const r of runs) {
      assert.deepEqual(placeholderAt(html, r.pos), {
        owner: r.owner,
        head: esc(t('B1.withheld-run', { owner: r.owner, account: r.owner, width: r.width, origin: r.origin })),
        arm: esc(entitlementArm(reader, r.owner).text),
      }, `${JSON.stringify(reader)}: the run from ${r.origin} names ${r.owner}, in ${d.addr}, which 1.0.1 owns`);
    }
  }
});
