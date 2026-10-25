// T-ARTICLE's test: the article made from a record — a withheld run's gap as
// tall as its bars, holding its face, its head, its owner or the origin's
// mark by what its full lines hold as its words are measured in their faces,
// never counted, the face compact in the column's edge otherwise and a
// control on the plane alone; an item not rendered a gap of its positions,
// its words in it or in the edge; every address the article sets in the
// identifier's face, a record's keys and a face's arm and clause at the
// run's size; the entitlement arm by the
// reader; C-67's clause decided over the origin's whole admitted-claim set,
// the pointer a control on the plane and a line in a pane; links marked at
// their spans in the one mark they merge into; the selection's and the
// focus's marks by the one rule; a run's hairline and C-33's mark once per
// run; each symbol at its span, after its last word and after a run's chrome,
// titled with what its far end holds; each mark carrying the ends it draws;
// the others' count in the column's edge, setting no line, and a withheld
// run's below its mark by the lines the mark's words take as measured; the corner's
// items, whole and compact, outside the article, a pane's with its read act
// and its lacking line; the record rule; a typed line set as typed in the
// body's type, a heading's marks its own characters, on its indent where it
// opens a typed line, the empty lines typed after it whole line boxes below
// it and no other room between blocks; the plan the bars are
// laid out from, the same blocks as the HTML; the scene-mode variant with no
// offer and no control; each withheld run naming its own origin's owner; the
// item rule and the copy's plain text with its stand-ins; the ends drawn at
// a withheld run as one symbol with its count, the plan unmoved; a symbol
// lit where every link it stands for is lit; and the byline's slots, never a
// placeholder, each box its face's width, cut on a word's end by its width
// as set and whole on their act; and the first-line rule, the client's words
// in a first line's place bracketed (FP-12, FP-21, FP-22, FP-23, FP-24,
// FP-26, FP-30, FP-33, FP-34).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { articleHTML, articlePlan, withheldBlockHTML, entitlementArm, editionClause, placeholderOf, gapHolds, cornerHTML, blockMarks, symbolLit, itemOf, recordContents, copyText, cutTo, firstLineOf, LABEL_CH, CUE_CH } from './article.js';
import { MEASURE, MEASURE_CPL, LINE_H, CHAR_W, layoutOf } from '../plane/layout.js';
import { HUE, NEUTRAL_HUE, VISITED_ALPHA } from '../plane/register.js';
import { mergedMark } from '../links/links.js';
import { t, tHTML, bracketed, CLIENT_CLOSE } from '../strings.js';
import { esc, byteLength } from '../util.js';
import { accountOf, homeOf, resolveSpan } from '../model/address.js';
import { deriveBlocks, textOf } from '../model/records.js';

/** @typedef {import('../model/records.js').Reader} Reader */
/** the readers the arm is decided for: signed in, with a key bound at this board and with none; a guest with a key here; a guest with none */
const SIGNED = /** @type {Reader} */ ({ account: '1.0.1', keyPresent: true }), BARE = /** @type {Reader} */ ({ account: '1.0.1', keyPresent: false });
const KEYED = /** @type {Reader} */ ({ account: null, keyPresent: true }), KEYLESS = /** @type {Reader} */ ({ account: null, keyPresent: false });

/** the byline's facts of 1.0.1, the owner of the documents the tests read, as the page holds them read */
const OWN_FACTS = /** @type {import('../model/records.js').AccountFacts} */ ({ label: 'dev-notebook', fingerprint: 'e4272902a11439e5' + '0'.repeat(48) });

/** a measure of every character one advance of the reading face, whatever its face: T-LAYER's where the platform sets no words */
const advances = (/** @type {string} */ s) => [...s].length * CHAR_W;
/** @returns {import('./article.js').ArticleView} */
const view = (/** @type {Partial<import('./article.js').ArticleView>} */ o = {}) => ({
  selected: null, focus: null, marks: [], mergedMark, symbols: [], says: () => '', countAt: () => ({ n: 0, social: false }), wholeLinks: 0,
  reader: SIGNED, localTrust: true, notebook: true, scene: false, originKinds: new Map(), originOwner: (a) => accountOf(a) || '', clauseOf: () => null,
  keyOf: (a) => (a === '1.0.1' ? OWN_FACTS : undefined), measure: advances, ...o,
});
/** @returns {import('../model/records.js').Doc} */
const doc = (/** @type {Partial<import('../model/records.js').Doc>} */ o = {}) => ({
  addr: '1.0.1.0.3', account: '1.0.1', kind: 'edition', label: 'x', standing: 'public', system: false, extent: 100, linkPositions: 0,
  meta: { doc: '1.0.1.0.3', published: true, owner: '1.0.1', birth: '1.0.1.0.3.1', birthExtent: 50, placed: null, baseExtent: null, source: null, asOf: 1 },
  runs: [], from: 1, to: 101, blocks: [], image: [], origins: [], imageFor: null, links: new Set(), linksRead: true, members: 2, whole: 100, rev: 0, refused: null, ...o,
});

/** a withheld run of `width` positions at `pos` from the draft 1.0.1.0.1003 */
const runOf = (/** @type {number} */ width, pos = 1) => /** @type {import('../model/records.js').Block} */ ({ pos, width, kind: 'withheld', text: '', origin: '1.0.1.0.1003' });
/** a run twelve full lines deep at the measure: every face a reader meets fits in it */
const WIDE = 12 * MEASURE_CPL;
/** the markup a sign holds: its words, an address in them in the identifier's span */
const INNER = '((?:[^<]|<span class="id">[^<]*</span>)*)';
/** an address in the identifier's face, as the article sets it */
const idOf = (/** @type {string} */ a) => `<span class="id">${esc(a)}</span>`;
/** B1-S7's head at a run, as the article sets it: its owner, its account and its origin in the identifier's face */
const headOf = (/** @type {string} */ owner, /** @type {number} */ width, origin = '1.0.1.0.1003') => tHTML('B1.withheld-run', { owner, account: owner, width, origin }, { owner: 'id', account: 'id', origin: 'id' });
/** a withheld run's mark in its column's edge, as the article sets it */
const markOf = (/** @type {string} */ owner) => tHTML('L.withheld.mark', { owner }, { owner: 'id' });
/**
 * A withheld run's gap as the HTML sets it, read apart from the page's code: its attributes, its height in the body's
 * em and its last line's width, what it holds — its head, its arm, its clause, its owner alone, the origin's mark — and
 * its edge's mark, with the attributes that make it a control
 * @param {string} html
 * @param {number} [pos]
 */
const gapAt = (html, pos = 1) => {
  const m = new RegExp(`<span class="withheld" data-pos="${pos}"([^>]*)>(.*?)</span>(?=<span class="withheld"|<p|<h|</div>|$)`).exec(html);
  if (!m) return null;
  const at = (/** @type {string} */ k) => (new RegExp(` ${k}="([^"]*)"`).exec(m[1]) || [])[1] ?? null;
  const inner = (/** @type {string} */ cls) => (new RegExp(`<span class="${cls}"[^>]*>${INNER}</span>`).exec(m[2]) || [])[1] ?? null;
  const mark = new RegExp(`<span class="wh-mark edge" data-mark="withheld"([^>]*?) style="[^"]*">${INNER}</span>`).exec(m[2]);
  const style = at('style') || '';
  return {
    owner: at('data-owner'), holds: at('data-holds'), width: Number(at('data-width')), height: Number((/height:([\d.]+)em/.exec(style) || [])[1]), last: Number((/--wh-last:(\d+)/.exec(style) || [])[1]),
    head: inner('wh-head'), arm: inner('arm'), clause: inner('clause'), alone: inner('wh-owner'), origin: inner('wh-origin'),
    mark: mark ? { text: mark[2], control: mark[1].includes('role="button"') && mark[1].includes('tabindex="-1"') } : null,
  };
};

test('a withheld run is a gap as tall as its bars — its last line its remainder — never its text: its face whole where its full lines hold it, else its head, else its origin\'s owner, else the origin\'s mark, the face compact in its column\'s edge then, every address in it the identifier\'s (issue #151; issue #16)', () => {
  const owner = '1.0.1', head = (/** @type {number} */ w) => headOf(owner, w);
  const mark = { text: markOf(owner), control: true };
  // twelve full lines: the face whole, the head, the arm and nothing in the clause's place, no mark at the edge
  const wide = /** @type {NonNullable<ReturnType<typeof gapAt>>} */ (gapAt(withheldBlockHTML(runOf(WIDE), doc(), view({ reader: KEYLESS }))));
  assert.deepEqual({ ...wide, height: Math.round(wide.height / LINE_H * 1e9) / 1e9 }, { owner, holds: 'face', width: WIDE, height: 12, last: MEASURE_CPL, head: head(WIDE), arm: tHTML('R56.key-absent', { owner }, { owner: 'id' }), clause: null, alone: null, origin: null, mark: null }, 'twelve full lines: the face in place, R56\'s arm and all');
  // 240 positions — three full lines and 42 — under R56's arm: the head alone, the face compact at the edge
  const run = /** @type {NonNullable<ReturnType<typeof gapAt>>} */ (gapAt(withheldBlockHTML(runOf(240), doc(), view({ reader: KEYLESS }))));
  assert.deepEqual([run.holds, run.head, run.arm, run.mark, run.last], ['head', head(240), null, mark, 240 - 3 * MEASURE_CPL], '240 positions: the head in its gap, the face compact at the edge');
  assert.ok(Math.abs(run.height - 4 * LINE_H) < 1e-9, `as tall as its four bars: ${run.height} em`);
  // one full line: the head still; five positions: the owner's address alone; four: the origin's mark
  assert.equal((gapAt(withheldBlockHTML(runOf(MEASURE_CPL), doc(), view({ reader: KEYLESS }))) || {}).holds, 'head', 'one full line holds the head');
  const five = /** @type {NonNullable<ReturnType<typeof gapAt>>} */ (gapAt(withheldBlockHTML(runOf(5), doc(), view())));
  assert.deepEqual([five.holds, five.alone, five.mark], ['owner', idOf(owner), mark], 'five positions: its origin\'s owner, the face at the edge');
  const four = /** @type {NonNullable<ReturnType<typeof gapAt>>} */ (gapAt(withheldBlockHTML(runOf(4), doc(), view())));
  assert.deepEqual([four.holds, four.origin, four.mark], ['mark', esc(t('L.origin-mark')), mark], 'four: the origin\'s mark, the face at the edge');
  // in a reading scene's pane, where nothing is acted on, the edge's mark is no control
  assert.equal((gapAt(withheldBlockHTML(runOf(4), doc(), view({ scene: true }))) || { mark: null }).mark?.control, false, 'in a pane the mark is a line');
  // the rule over the face itself: the gap holds it where its lines — the arm at the run's size — fit its full lines, at a narrower measure too
  const p = placeholderOf(runOf(240), SIGNED, (a) => accountOf(a) || '', () => null);
  const face = layoutOf([{ kind: 'text', pos: null, size: 1, pieces: [{ text: p.head, size: 1, lead: 0, trail: 0, box: false, own: false }], before: 0, after: 0, width: 0, keep: 'whole' },
    { kind: 'text', pos: null, size: 1, pieces: [{ text: p.arm.text, size: 1, lead: 0, trail: 0, box: false, own: false }], before: MEASURE.faceGap, after: 0, width: 0, keep: 'whole' }]).lines;
  const deep = face[face.length - 1].top + face[face.length - 1].h;
  assert.ok(deep <= 3 * LINE_H && deep > 2 * LINE_H, `the owner-grant face takes ${deep} em: more than two full lines, within three`);
  assert.deepEqual([gapHolds(p, 3 * MEASURE_CPL, MEASURE_CPL, advances), gapHolds(p, 2 * MEASURE_CPL + 65, MEASURE_CPL, advances)], ['face', 'head'], 'three full lines hold it; two and a remainder do not');
  assert.equal(gapHolds(p, 3 * 30, 30, advances), 'head', 'at a measure of thirty, where its head and its arm each take more lines, three full lines hold its head alone');
  const html = withheldBlockHTML(runOf(WIDE), doc(), view());
  assert.ok(!html.includes('class="clause"') && !html.includes(t('C-67.pointer')), 'no clause its origin\'s edition claims decide: nothing renders in its place');
});

test('what a gap holds is read from its words as the platform sets them in their faces, never counted: where the client\'s words set wider than the reading face\'s advance, three full lines hold the owner-grant face no longer, nor five positions the owner\'s address where the identifier\'s face sets it wider (issue #16)', () => {
  const p = placeholderOf(runOf(240), SIGNED, (a) => accountOf(a) || '', () => null);
  const wider = (/** @type {string} */ x, /** @type {import('../plane/register.js').Face} */ f) => [...x].length * CHAR_W * (f === 'reading' ? 1 : 1.3);
  assert.deepEqual([gapHolds(p, 3 * MEASURE_CPL, MEASURE_CPL, advances), gapHolds(p, 3 * MEASURE_CPL, MEASURE_CPL, wider)], ['face', 'head'], 'counted at the advance it fits; set wider, its head alone');
  const q = placeholderOf(runOf(5), SIGNED, (a) => accountOf(a) || '', () => null), ident = (/** @type {string} */ x, /** @type {import('../plane/register.js').Face} */ f) => [...x].length * CHAR_W * (f === 'ident' ? 1.44 : 1);
  assert.deepEqual([gapHolds(q, 5, MEASURE_CPL, advances), gapHolds(q, 5, MEASURE_CPL, ident)], ['owner', 'mark'], 'five positions hold "1.0.1" at the advance; in a face that sets it wider, the origin\'s mark');
});

test('a withheld run\'s count stands below its mark in its column\'s edge by the lines the mark\'s words take as their faces set them: one at the advance, two where the identifier\'s face sets its owner wide enough to wrap it (FP-26; issue #16)', () => {
  const wide = (/** @type {string} */ x, /** @type {import('../plane/register.js').Face} */ f) => [...x].length * CHAR_W * (f === 'reading' ? 1 : 3);
  const at = { ends: [], count: { n: 2, social: false } };
  /** the count's top below the run's first line, in the edge's lines */
  const below = (/** @type {import('./article.js').ArticleView} */ v) => {
    const html = withheldBlockHTML(runOf(240), doc(), v, at), m = /<span class="others edge" data-count="2" style="[^"]*;top:([\d.]+)em">/.exec(html);
    return m && html.includes('class="wh-mark edge"') ? Math.round(Number(m[1]) / (LINE_H / MEASURE.count) * 1e9) / 1e9 : null;
  };
  assert.deepEqual([below(view({ reader: KEYLESS })), below(view({ reader: KEYLESS, measure: wide }))], [1, 2], 'under R56\'s arm, which no three lines hold: the mark on one edge line at the advance, on two set wide, the count stacked below it each time');
});

test('the entitlement arm is one rule, by the reader, and the gap holding the face carries what it answers', () => {
  const ownerGrant = { id: 'C-36.owner-grant.arm', text: t('C-36.owner-grant.arm') };
  assert.deepEqual(entitlementArm(SIGNED, '1.0.2'), ownerGrant, 'a signed-in principal with no grant: the owner-grant default');
  assert.deepEqual(entitlementArm(BARE, '1.0.2'), ownerGrant, 'whatever key signed the session, or none');
  assert.deepEqual(entitlementArm(KEYED, '1.0.2'), { id: 'C-36.guest.key', text: t('C-36.guest.key') }, 'a guest whose device holds a key for this board: C-36\'s key-present default — sign in, then ask');
  assert.deepEqual(entitlementArm(KEYLESS, '1.0.2'), { id: 'R56.key-absent', text: t('R56.key-absent', { owner: '1.0.2' }) }, 'a guest with no key: R56\'s key-absent default, naming the owner');
  for (const reader of [SIGNED, BARE, KEYED, KEYLESS]) {
    const html = withheldBlockHTML(runOf(WIDE), doc(), view({ reader }));
    assert.ok(html.includes(`<span class="arm">${tHTML(entitlementArm(reader, '1.0.1').id, { owner: '1.0.1' }, { owner: 'id' })}</span>`), `the gap's arm is the rule's for ${JSON.stringify(reader)}, the owner it names in the identifier's face`);
  }
  const keyed = withheldBlockHTML(runOf(WIDE), doc(), view({ reader: KEYED }));
  assert.ok(keyed.includes(esc(t('C-36.guest.key'))) && !keyed.includes('no key on this device'), 'a guest whose device holds a key for this board meets C-36\'s key-present arm, and is never told it holds none');
});

// ---- C-67's clause, decided over the origin's admitted claims ---------------------------------------------------------

const ORIGIN = '1.0.1.0.1003', OWNER = '1.0.1', R20 = '1.1.0.1.0.1.0.3.14';
/** a span of a document's own bytes, as a link's slot reads it */
const bytesOf = (/** @type {string} */ doc, /** @type {number} */ ord, /** @type {number} */ w) => resolveSpan({ start: `${doc}.0.1.${ord}`, width: '0.0.0.0.0.0.0.' + w });
/**
 * An edition claim at `addr` as the page holds its two reads: typed R20, homed where its address says, its home
 * published and owned by the home's account, its FROM twenty of the home's own bytes, no read of it failed — each unless
 * `o` says otherwise.
 * @param {string} addr
 * @param {{type?: string | null, from?: import('../model/address.js').EndRef[], published?: boolean | null, claimant?: string, link?: null, failed?: boolean}} [o]
 * @returns {import('./article.js').ClaimSeen}
 */
const claim = (addr, o = {}) => {
  const home = homeOf(addr) || addr;
  return {
    claim: addr, home, link: o.link === null ? null : { type: o.type === undefined ? R20 : o.type, from: o.from ?? [bytesOf(home, 1, 20)] },
    published: o.published === undefined ? true : o.published, claimant: o.claimant ?? (accountOf(home) || ''), failed: o.failed ?? false,
  };
};
/** C-67's pointer following a claim, the LEAP to that claim's home its act */
const pointer = (/** @type {string} */ followed) => ({ id: 'C-67.pointer', text: t('C-67.pointer'), claim: followed, home: homeOf(followed) });
const quoting = (/** @type {string} */ claimant) => ({ id: 'C-67.quoting', text: t('C-67.quoting', { claimant }), claimant });
/** C-67's QUOTING sibling as the article sets it: its claimant in the identifier's face */
const quotingHTML = (/** @type {string} */ claimant) => tHTML('C-67.quoting', { claimant }, { claimant: 'id' });
/** C-67's unread place: a read the clause is decided from failed */
const unread = () => ({ id: 'L.clause.unread', text: t('L.clause.unread') });

test('C-67\'s clause is the empty place where the origin carries no edition claim, where its lookup has not answered, or where the board refused the lookup as withheld from the reader; "edition claims not read" where the lookup failed any other way (RES-85; issue #186\'s design decision: "If the board refuses the read for documents withheld from the reader, no face carries the clause. Otherwise, a face whose read failed says \'edition claims not read\'")', () => {
  assert.equal(editionClause(ORIGIN, OWNER, []), null, 'no claim on the origin: nothing in the clause\'s place');
  assert.equal(editionClause(ORIGIN, OWNER, null), null, 'the lookup not answered: nothing');
  assert.equal(editionClause(ORIGIN, OWNER, 'withheld'), null, 'the lookup refused as withheld from the reader: nothing');
  assert.deepEqual(editionClause(ORIGIN, OWNER, 'unread'), unread(), 'the lookup failed any other way: "edition claims not read", never a blank that reads as no claim');
});

test('the pointer where an admitted claim\'s edition holds bytes the reader can reach; the QUOTING sibling where its FROM holds the origin\'s, or none (PUB-5.124)', () => {
  const ed = '1.0.1.0.9.0.2.1';
  assert.deepEqual(editionClause(ORIGIN, OWNER, [claim(ed)]), pointer(ed), 'the owner\'s edition over its own fresh bytes');
  assert.deepEqual(editionClause(ORIGIN, OWNER, [claim(ed, { type: R20 + '.2' })]), pointer(ed), 'a descriptive subtype of the edition class');
  assert.deepEqual(editionClause(ORIGIN, OWNER, [claim(ed, { from: [bytesOf(ORIGIN, 1, 240)] })]), quoting(OWNER), 'a window-composed edition quoting the draft: its FROM the origin\'s own bytes');
  assert.deepEqual(editionClause(ORIGIN, OWNER, [claim(ed, { from: [bytesOf('1.0.1.0.9', 1, 5), bytesOf(ORIGIN, 1, 240)] })]), quoting(OWNER), 'the mixed shape: one fresh run beside the windowed one, the cycle one run wide');
  assert.deepEqual(editionClause(ORIGIN, OWNER, [claim(ed, { from: [] })]), quoting(OWNER), 'a claim whose FROM is empty');
  assert.deepEqual(editionClause(ORIGIN, OWNER, [claim('1.0.1.1.0.4.0.2.1')]), pointer('1.0.1.1.0.4.0.2.1'), 'a delegate\'s published edition: admitted by address containment');
});

test('the three answers are decided over the whole admitted set, never per claim: the pointer where any passes, QUOTING naming the lowest-addressed claimant only where every one quotes (RES-152, RES-164)', () => {
  const windowed = [bytesOf(ORIGIN, 1, 240)];
  const delegates = claim('1.0.1.1.0.4.0.2.1', { from: windowed }), owners = claim('1.0.1.0.11.0.2.1', { from: windowed });
  assert.deepEqual(editionClause(ORIGIN, OWNER, [delegates, claim('1.0.1.0.9.0.2.1')]), pointer('1.0.1.0.9.0.2.1'), 'a delegate\'s quoting fork claim listed before the owner\'s edition: the pointer, never the first claim\'s QUOTING');
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
  const linkless = claim('1.0.1.0.9.0.2.1', { link: null }), homeless = claim('1.0.1.0.10.0.2.1', { published: null });
  assert.equal(editionClause(ORIGIN, OWNER, [linkless]), null, 'its link not read yet');
  assert.equal(editionClause(ORIGIN, OWNER, [homeless]), null, 'its home not read yet');
  assert.equal(editionClause(ORIGIN, OWNER, [claim('1.0.1.0.11.0.2.1', { from: [] }), linkless]), null, 'a quoting claim beside one not read yet: never QUOTING on reads not made');
  assert.deepEqual(editionClause(ORIGIN, OWNER, [linkless, homeless, claim('1.0.1.0.12.0.2.1')]), pointer('1.0.1.0.12.0.2.1'), 'an admitted claim known to pass: the pointer, whatever the others turn out to be');
});

test('a claim whose admission waits on a read that failed — its link\'s, or its home\'s metadata — leaves "edition claims not read" where no admitted claim known passes and none waits on a read still out; never QUOTING, nor a blank, over it (issue #186\'s design decision: "A blank there would read as \'no claim\'")', () => {
  const linkFailed = claim('1.0.1.0.9.0.2.1', { link: null, failed: true }), homeFailed = claim('1.0.1.0.10.0.2.1', { published: null, failed: true });
  assert.deepEqual(editionClause(ORIGIN, OWNER, [linkFailed]), unread(), 'its link\'s read failed');
  assert.deepEqual(editionClause(ORIGIN, OWNER, [homeFailed]), unread(), 'its home\'s metadata read failed');
  assert.deepEqual(editionClause(ORIGIN, OWNER, [claim('1.0.1.0.11.0.2.1', { from: [] }), linkFailed]), unread(), 'beside a claim that quotes: never QUOTING on a read that failed');
  assert.deepEqual(editionClause(ORIGIN, OWNER, [claim('1.0.2.0.5.0.2.1'), homeFailed]), unread(), 'beside a claim admitted nowhere');
  assert.equal(editionClause(ORIGIN, OWNER, [linkFailed, claim('1.0.1.0.12.0.2.1', { link: null })]), null, 'beside a claim whose read is still out: the empty place until it answers');
  assert.deepEqual(editionClause(ORIGIN, OWNER, [linkFailed, homeFailed, claim('1.0.1.0.12.0.2.1')]), pointer('1.0.1.0.12.0.2.1'), 'an admitted claim known to pass: the pointer, whatever the failed reads would have said');
  assert.deepEqual(editionClause(ORIGIN, OWNER, [claim('1.0.1.0.9.0.2.1', { published: false, failed: true })]), null, 'a failed read of a claim the page knows admitted nowhere — its home refused — changes nothing');
});

test('the pointer follows the passing claim PUB-3.107\'s origin-keyed order picks: one whose home the origin\'s owner owns first, the lowest-addressed of several as tumblers, else the lowest-addressed passing claim (RES-152)', () => {
  // the owner's edition in a sub-account the seat above owns, beside a delegate's edition addressed below it
  const owners = claim('1.0.1.3.0.2.0.2.1', { claimant: OWNER }), delegates = claim('1.0.1.2.0.2.0.2.1');
  assert.equal(delegates.claimant, '1.0.1.2', 'the delegate\'s claim: its home\'s owner the delegate');
  assert.deepEqual(editionClause(ORIGIN, OWNER, [delegates, owners]), pointer(owners.claim), 'the owner\'s own claim first, though the delegate\'s is lower-addressed');
  // two of the owner's (RES-12's race), the higher listed first: 9 below 11 as tumblers, though "11" sorts first as a string
  const eleventh = claim('1.0.1.0.11.0.2.1'), ninth = claim('1.0.1.0.9.0.2.1');
  assert.deepEqual(editionClause(ORIGIN, OWNER, [eleventh, ninth]), pointer(ninth.claim), 'the lowest-addressed of the owner\'s, never the first listed nor the first as a string');
  assert.deepEqual(editionClause(ORIGIN, OWNER, [claim('1.0.1.0.9.0.2.10'), claim('1.0.1.0.9.0.2.2')]), pointer('1.0.1.0.9.0.2.2'), 'two in one home: the lower ordinal');
  // none of the owner's passes — theirs quotes — so the lowest-addressed passing claim, a delegate's
  const quotes = claim('1.0.1.0.11.0.2.1', { from: [bytesOf(ORIGIN, 1, 240)] });
  assert.deepEqual(editionClause(ORIGIN, OWNER, [quotes, claim('1.0.1.1.0.5.0.2.1'), claim('1.0.1.1.0.4.0.2.1')]), pointer('1.0.1.1.0.4.0.2.1'), 'the lowest-addressed passing claim, the owner\'s quoting one followed nowhere');
});

test('on the plane the pointer is a control carrying the claim it follows and that claim\'s home; in a pane it is a line, and the QUOTING sibling and the unread place are lines everywhere', () => {
  const run = runOf(WIDE);
  const own = '1.0.1.0.9.0.2.1';
  const passes = () => editionClause(ORIGIN, OWNER, [claim('1.0.1.1.0.4.0.2.1'), claim(own)]);
  const quotes = () => editionClause(ORIGIN, OWNER, [claim(own, { from: [] })]);
  /** the clause beneath the arm as the placeholder holds it: its attributes and its words */
  const clauseIn = (/** @type {import('./article.js').ArticleView} */ v) => (new RegExp(`<span class="arm">[^<]*</span><span class="clause"([^>]*)>${INNER}</span></span>$`).exec(withheldBlockHTML(run, doc(), v)) || []).slice(1);
  assert.deepEqual(clauseIn(view({ clauseOf: passes })), [` data-claim="${own}" data-home="1.0.1.0.9" role="button" tabindex="-1"`, esc(t('C-67.pointer'))], 'on the plane: a button carrying the owner\'s claim and its home, the edition');
  assert.deepEqual(clauseIn(view({ clauseOf: passes, scene: true })), ['', esc(t('C-67.pointer'))], 'in a pane: a line, nothing in a pane acting on a mark (SC)');
  for (const scene of [false, true]) assert.deepEqual(clauseIn(view({ clauseOf: quotes, scene })), ['', quotingHTML(OWNER)], `${scene ? 'in a pane' : 'on the plane'}: the QUOTING sibling follows nothing, its claimant in the identifier's face`);
  for (const scene of [false, true]) assert.deepEqual(clauseIn(view({ clauseOf: () => editionClause(ORIGIN, OWNER, 'unread'), scene })), ['', esc(t('L.clause.unread'))], `${scene ? 'in a pane' : 'on the plane'}: "edition claims not read" follows nothing`);
});

test('the placeholder\'s clause is the one its origin\'s claims decide; where they decide none, the arm\'s own copy stands alone', () => {
  const run = runOf(WIDE);
  /** @type {Record<string, import('./article.js').ClaimSeen[]>} */
  const held = { [ORIGIN]: [claim('1.0.1.0.11.0.2.1', { from: [] })] };
  const clauseOf = (/** @type {string} */ o) => editionClause(o, OWNER, held[o] ?? null);
  assert.deepEqual(placeholderOf(run, SIGNED, (a) => accountOf(a) || '', clauseOf).clause, quoting(OWNER));
  const html = withheldBlockHTML(run, doc(), view({ clauseOf }));
  assert.ok(html.includes(`<span class="arm">${esc(t('C-36.owner-grant.arm'))}</span><span class="clause">${quotingHTML(OWNER)}</span>`), html);
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
  assert.ok(inside.includes('class="sp blk-para indent sel" data-addr="1.0.1.0.3" data-pos="11"'), 'the block holding the span is marked');
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
  assert.ok(html.includes('class="hairline whole"') && html.includes(`≡ ${idOf('1.0.1.0.1003')}`), 'the hairline\'s origin in the identifier\'s face');
  assert.ok(html.includes(t('C-33')));
  assert.ok(html.includes(`this document windows ${idOf('1.0.1.0.1003')}`), 'the scene-offer at a windowing document, its address the identifier\'s');
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

test('the corner at a pinned version names it — its own number of the count its box\'s document holds — and offers the versions list there too; its own record holding no count, it takes the box\'s (issue #154)', () => {
  const member = doc({ addr: '1.0.1.0.3.1', members: null });
  const c = cornerHTML(member, view({ members: 3 }));
  assert.ok(c.includes(t('F.version-of', { k: 1, n: 3 })) && c.includes('class="version"'), `version 1 of 3, the list's act: ${c}`);
  assert.ok(c.includes(t('F.corner.pinned', { published: t('F.published.notebook'), k: 1 })), 'the pinned version\'s state');
  assert.ok(!cornerHTML(member, view()).includes('class="version"'), 'no count handed in, none of its own: no statement');
});

test('a reading scene\'s pane\'s corner, handed its act and the version its act found lacking the passage, offers "read version ⟨n⟩" and says the passage is not in that version; the plane\'s corner offers neither, and neither item is a stop of its own (issue #160)', () => {
  const member = doc({ addr: '1.0.1.0.3.2', members: null });
  const pane = cornerHTML(member, view({ members: 3, read: 3, lacks: 2 }));
  assert.ok(pane.includes(`<span class="read" data-read="3">${esc(t('F.versions.read', { k: 3 }))}</span>`), `the act, naming the version it reads: ${pane}`);
  assert.ok(pane.includes(`<span class="lacks">${esc(t('F.floating.member', { k: 2 }))}</span>`), 'the version said to lack the passage');
  assert.ok(pane.indexOf(t('F.version-of', { k: 2, n: 3 })) < pane.indexOf('class="lacks"') && pane.indexOf('class="lacks"') < pane.indexOf('class="read"'), 'in the corner\'s one order: the version statement, what it lacks, then the act');
  const plane = cornerHTML(member, view({ members: 3 }));
  assert.ok(!plane.includes('data-read') && !plane.includes('class="lacks"'), 'the plane\'s corner: neither');
  assert.ok(![pane, plane].some((h) => h.includes('tabindex')), 'no item takes a focus of its own: the corner is one stop (K-57)');
});

test('the article holds no corner: its items stand beside it, outside the box that clips the article', () => {
  const html = articleHTML(doc({ blocks: [{ pos: 1, width: 10, kind: 'para', text: 'aaaaaaaa', origin: null }] }), view({ wholeLinks: 2 }), '1.0.1');
  assert.ok(!html.includes('data-corner') && !html.includes('class="corner"'), html);
  assert.ok(!html.includes(t('F.version-of', { k: 2, n: 2 })) && !html.includes(t('F.whole-links', { n: 2 })), 'nor any of its items');
  const draft = articleHTML(doc({ kind: 'draft', meta: null, blocks: [{ pos: 1, width: 10, kind: 'para', text: 'aaaaaaaa', origin: null }] }), view(), '1.0.1');
  assert.ok(!draft.includes(t('C-28.flag-on')) && !draft.includes(t('C-28')), 'a draft\'s chip is its corner\'s, never its article\'s');
});

test('a record atom renders as the record it is; a typed line its bytes open with "#" is a typed line like any other — a `p` in the body\'s type, its marks its own characters — on the plane, in a pane and in the plan, never a heading (FP-12)', () => {
  const d = doc({ addr: '1.0.1.0.1', blocks: [{ pos: 1, width: 1, kind: 'atom', text: JSON.stringify({ type: 'skep-enroll', keys: [{ label: 'dev-notebook', anchor: false }] }), origin: null }] });
  const html = articleHTML(d, view(), '1.0.1');
  assert.ok(html.includes(t('F.home-record.yours')) && html.includes('dev-notebook'));
  const typed = doc({ blocks: [{ pos: 1, width: 10, kind: 'para', text: '## Title', origin: null }, { pos: 11, width: 6, kind: 'para', text: '# Part', origin: null }] });
  for (const scene of [false, true]) {
    const h = articleHTML(typed, view({ scene }), '1.0.1');
    assert.ok(!/<h\d/.test(h), `${scene ? 'in a pane' : 'on the plane'}: no heading element`);
    assert.ok(h.includes('<p class="sp blk-para indent" data-addr="1.0.1.0.3" data-pos="1" data-width="10" style="--blank:1">## Title</p>') && h.includes('<p class="sp blk-para indent" data-addr="1.0.1.0.3" data-pos="11" data-width="6"># Part</p>'), `${scene ? 'in a pane' : 'on the plane'}: each a typed line, its "#" its own: ${h}`);
  }
  const rows = articlePlan(typed, view(), '1.0.1').filter((r) => r.pos != null);
  assert.deepEqual(rows.map((r) => [r.size, r.before, r.keep, r.pre, r.pieces.map((x) => [x.text, x.size])]), [[1, 0, 'lines', true, [['## Title', 1]]], [1, 0, 'lines', true, [['# Part', 1]]]], 'in the plan at the body\'s size, with no room above it, broken between its lines as any typed line');
});

/** a link marked at a span of the first edition, as LK hands it in, its end's key the span's */
const shown = (/** @type {number} */ pos, /** @type {number} */ width) => /** @type {any} */ ({ link: { addr: 'L' + pos, type: null }, end: 'from', key: `${pos}+${width}`, pos, width, runs: [{ pos, width }], mark: { hue: '#7fb2ff', linker: 'you', form: [], value: 1, own: true }, linker: 'you', far: '1.0.1.0.4', farEnd: null, farWhole: true });

test('the plan\'s head is the article\'s: three lines, a fourth where links touch the document', () => {
  const d = doc({ blocks: [{ pos: 1, width: 20, kind: 'para', text: 'abcdefghijklmnopqrst', origin: null }] });
  const bare = articlePlan(d, view(), '1.0.1').filter((r) => r.kind === 'head');
  assert.deepEqual(bare.map((r) => r.pieces.map((p) => p.text).join('')), ['1.0.1.0.3', t('B1.state-line'), '1.0.1 · '], 'the byline: its owner, then the box its slots take, no characters of its own');
  assert.deepEqual([bare[2].pieces[1].box, bare[2].pieces[1].lead], [true, LABEL_CH * advances('0') * MEASURE.head], 'the slots one inline-block, which no line breaks inside, as wide as the one slot the reader\'s own byline takes, measured in its face, whatever it shows (FP-34)');
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
  const k = 1;
  assert.equal(r.size, k, 'the typed line\'s box at the body\'s size, its "#" among its own characters');
  const label = r.pieces.find((p) => p.text === '≡ 1.0.1.0.1003');
  assert.ok(label && label.size === MEASURE.label * k && label.lead > 0, 'the hairline\'s label whole, at its size, led by the sameness boundary');
  const mark = r.pieces.find((p) => p.text === t('C-33'));
  assert.ok(mark && mark.box && mark.size === MEASURE.mark * k, 'C-33\'s mark: an inline-block');
  const sym = r.pieces.findIndex((p) => p.text === '⟡' && p.box);
  assert.equal(r.pieces.filter((p) => p.text === '⟡' && p.box).length, 1, 'one symbol');
  assert.deepEqual([r.pieces[sym - 1].text, r.pieces[sym + 1].text], ['gh', ' ij'], 'the symbol at its span: after its last word, before the word after it');
  assert.equal(r.pieces.filter((p) => !p.box && p.text !== '≡ 1.0.1.0.1003').map((p) => p.text).join(''), '# abcdefgh ij', 'the document\'s own characters, every one');
  assert.ok(!r.pieces.some((p) => p.text.includes(t('F.others-count', { n: 3 }))) && !('float' in r), 'the others\' count no piece of the plan');
});

test('the others\' count stands in its column\'s edge — the block\'s first child, out of its text, beside its first line — and sets no line: the plan is the same with it and without it (issue #151; A-254)', () => {
  const d = doc({ blocks: [{ pos: 1, width: 13, kind: 'para', text: '# abcdefgh ij', origin: null }, { pos: 14, width: 9, kind: 'para', text: 'one two 3', origin: null }] });
  const counted = view({ countAt: (b) => ({ n: b.pos === 1 ? 3 : 12, social: false }) });
  assert.deepEqual(articlePlan(d, counted, '1.0.1'), articlePlan(d, view(), '1.0.1'), 'the counts set no line: the plan is the same');
  const html = articleHTML(d, counted, '1.0.1');
  const at = (/** @type {number} */ pos) => (new RegExp(`data-pos="${pos}" data-width="\\d+">(<span class="others edge" data-count="(\\d+)" style="([^"]*)">([^<]*)</span>)?`).exec(html) || []).slice(2);
  const [n1, style1, words1] = at(1), [n2, style2, words2] = at(14);
  assert.deepEqual([n1, words1, n2, words2], ['3', esc(t('F.others-count', { n: 3 })), '12', esc(t('F.others-count', { n: 12 }))], 'each block\'s count its first child');
  // its place in its own em, from P-LAY's body em: EDGE_GAP past the text, the rest of the edge wide, its first line the block's
  const own = (/** @type {string} */ style, /** @type {string} */ k) => Number((new RegExp(`${k}:([\\d.]+)`).exec(style) || [])[1]);
  const size = (/** @type {number} */ k) => MEASURE.count * k;
  assert.ok([style1, style2].every((st) => Math.abs(own(st, '--edge-in') * size(1) - 0.5) < 1e-9), 'EDGE_GAP past the text, in the body\'s em');
  assert.ok([style1, style2].every((st) => Math.abs(own(st, 'line-height') * size(1) - LINE_H) < 1e-9), 'its first line as tall as its block\'s first line');
});

test('the corner compact: a usual state its glyph, named whole by its words, a number and an exception keeping theirs (FP-26; issue #151)', () => {
  const latest = cornerHTML(doc(), view(), true), pinned = cornerHTML(doc({ addr: '1.0.1.0.3.1' }), view({ members: 3 }), true);
  const words = (/** @type {string} */ html) => (/<span class="st glyph" role="img" aria-label="([^"]*)">([^<]*)<\/span>/.exec(html) || []).slice(1);
  assert.deepEqual(words(latest), [esc(t('F.corner.latest', { published: t('F.published.notebook') })), esc(t('L.corner.bare'))], 'the bare address: its version marker unlit, named by its state\'s words');
  assert.deepEqual(words(pinned), [esc(t('F.corner.pinned', { published: t('F.published.notebook'), k: 1 })), esc(t('L.corner.pinned'))], 'a pinned version: its marker lit');
  assert.ok(latest.includes(`<span class="version" data-members="2">${esc(t('F.version-of', { k: 2, n: 2 }))}</span>`) && pinned.includes(esc(t('F.version-of', { k: 1, n: 3 }))), '"version ⟨k⟩ of ⟨n⟩" keeps its words');
  const draft = cornerHTML(doc({ kind: 'draft', meta: null }), view(), true);
  assert.ok(draft.includes(`<span class="chip glyph" data-chip="1" role="img" aria-label="${esc(t('C-28.flag-on'))}">${esc(t('L.corner.draft'))}</span>`), `a draft's chip its glyph, named by C-28's words: ${draft}`);
  const counted = cornerHTML(doc(), view({ wholeLinks: 4 }), true), withheld = cornerHTML(doc({ refused: 'withheld' }), view(), true);
  assert.ok(counted.includes(esc(t('F.whole-links', { n: 4 }))) && withheld.includes(tHTML('F.corner.withheld', { owner: '1.0.1' }, { owner: 'id' })) && !withheld.includes('glyph'), 'the whole-document count and a withheld document\'s state keep their words, its owner in the identifier\'s face');
  assert.ok(!cornerHTML(doc(), view()).includes('glyph'), 'whole: no glyph');
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

test('a symbol is titled with its type and what its far end\'s text holds of its passage — "its passage is not in ⟨D⟩\'s current text" where it floats, the line where it holds part of it (issue #153) — and with its type alone where that text holds all of it', () => {
  const d = doc({ blocks: [{ pos: 1, width: 13, kind: 'para', text: 'one two three', origin: null }] });
  const s = { ...shown(5, 3), link: { addr: 'L5', type: '1.1.0.1.0.1.0.3.13' }, far: '1.0.1.0.127' };
  const title = (/** @type {string} */ says) => (articleHTML(d, view({ symbols: [s], says: () => says }), '1.0.1').match(/<span class="sym [^"]*" data-link="L5"[^>]* title="([^"]*)"/) || [])[1];
  const floating = t('F.floating', { D: '1.0.1.0.127' }), part = t('L.held.part', { subject: t('L.held.followed'), where: t('L.held.current', { D: '1.0.1.0.127' }) });
  assert.equal(title(floating), esc('1.1.0.1.0.1.0.3.13 · ' + floating), 'said at the symbol, before anyone follows it');
  assert.equal(title(part), esc('1.1.0.1.0.1.0.3.13 · ' + part), 'a part held: the line at the symbol');
  assert.equal(title(''), '1.1.0.1.0.1.0.3.13');
});

test('a typed line is set at the body\'s size, kept as typed: on its indent where it opens a typed line — the document\'s first, one after a newline — and on none where it continues the line an item or positions not held began; the empty lines typed after it whole body line boxes below it, the newlines leading a run after an item less the one that ends the item\'s line; no other room between blocks, every line on the grid (FP-12)', () => {
  const content = (/** @type {number} */ pos, /** @type {string} */ text) => ({ pos, width: byteLength(text), kind: /** @type {const} */ ('content'), text, ref: null, origin: null });
  const runs = [content(1, 'aaaa\n\n  bbbb\ncccc\n\n\n'), { pos: 21, width: 5, kind: /** @type {const} */ ('withheld'), text: '', ref: null, origin: '1.0.1.0.1003' }, content(26, '\ndddd\n\neeee'),
    { pos: 37, width: 1, kind: /** @type {const} */ ('atom'), text: '{}', ref: null, origin: null }, content(38, 'gggg\n'), content(100, 'ffff')];
  const d = doc({ runs, blocks: deriveBlocks(runs), to: 104 });
  const plan = articlePlan(d, view(), '1.0.1').filter((r) => r.pos != null);
  const I = MEASURE.indent;
  assert.deepEqual(plan.map((r) => [r.pos, r.kind, r.size, r.before, r.after / LINE_H, r.indent, r.pre]), [
    [1, 'text', 1, 0, 1, I, true], [7, 'text', 1, 0, 0, I, true], [14, 'text', 1, 0, 2, I, true], [21, 'gap', 1, 0, 0, 0, false],
    [26, 'text', 1, 0, 0, 0, true], [27, 'text', 1, 0, 1, I, true], [33, 'text', 1, 0, 0, I, true], [37, 'gap', 1, 0, 0, 0, false],
    [38, 'text', 1, 0, 0, 0, true], [100, 'text', 1, 0, 0, 0, true],
  ], 'each block: its size, no room above it, the empty lines after it, its indent, its white space kept');
  const html = articleHTML(d, view(), '1.0.1');
  const blocks = [...html.matchAll(/<p class="([^"]*)" data-addr="[^"]*" data-pos="(\d+)" data-width="\d+"(?: style="--blank:(\d+)")?>/g)].map((m) => [Number(m[2]), m[1], Number(m[3] || 0)]);
  assert.deepEqual(blocks, [[1, 'sp blk-para indent', 1], [7, 'sp blk-para indent', 0], [14, 'sp blk-para indent', 2], [26, 'sp blk-para', 0], [27, 'sp blk-para indent', 1], [33, 'sp blk-para indent', 0], [38, 'sp blk-para', 0], [100, 'sp blk-para', 0]], 'the HTML decides each the same: its indent, and its empty lines its room below it');
  assert.ok(html.includes('>  bbbb</p>'), 'its leading spaces its own, kept');
  const lines = layoutOf(articlePlan(d, view(), '1.0.1')).lines.filter((l) => l.kind !== 'head'), top = lines[0].top;
  assert.ok(lines.every((l) => Math.abs((l.top - top) / LINE_H - Math.round((l.top - top) / LINE_H)) < 1e-9), 'every line a whole count of body line boxes below the first: the column\'s grid kept');
  const head = articlePlan(d, view(), '1.0.1').filter((r) => r.kind === 'head').map((r) => r.size);
  assert.deepEqual(head, [1, MEASURE.head, MEASURE.head], 'the head\'s address at the body\'s size, its state line and byline at the head\'s');
});

test('a carriage return typed in a line is kept as the character typed, never written where the parser reads it as a line\'s end', () => {
  const html = articleHTML(doc({ blocks: [{ pos: 1, width: 4, kind: 'para', text: 'a\rb\r', origin: null }] }), view(), '1.0.1');
  assert.ok(html.includes('>a&#13;b&#13;</p>') && !html.includes('\r'), html);
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
  assert.deepEqual(plan.slice(at, at + 2).map((r) => [r.pos, r.pieces[0].text, r.size]), [[1, t('F.home-record.yours'), 1], [null, 'dev-notebook · device', 1]], 'a record\'s words, then its keys on a row of their own, at the run\'s size');
  assert.deepEqual(plan.filter((r) => r.kind === 'gap').map((r) => [r.pos, r.width]), [[12, 240], [253, 4]], 'a withheld run and an item not rendered each a gap carrying its width');
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
  assert.ok(!/ role="(?!img")[^"]*"| tabindex=/.test(inPane), 'and nothing in the pane\'s article is a control or a stop: a byline\'s slots are named by their words alone');
});

// ---- the byline (FP-34) -----------------------------------------------------------------------------------------------

/** a byline's slots as the HTML sets them: its owner, in the identifier's face, then each slot's role, its classes, its width in em, the words it shows, its whole, its cause's string and its name */
const slotsIn = (/** @type {string} */ html) => {
  const box = /<span class="by"><span class="id">([^<]*)<\/span>([^<]*)<span class="(slots[^"]*)" style="width:([\d.]+)em">(.*?)<\/span><\/span><(?:span class="pres"|\/div)/.exec(html);
  if (!box) return null;
  const slots = [...box[5].matchAll(/<span class="(slot[^"]*)" data-slot="(\w+)"((?: data-string="[^"]*")?)((?: data-cut="1" title="[^"]*")?) role="img" aria-label="([^"]*)" style="width:([\d.]+)em">([^<]*)(?:<span class="whole">([^<]*)<\/span>)?<\/span>/g)].map((m) => ({
    cls: m[1], role: m[2], cause: (/data-string="([^"]*)"/.exec(m[3]) || [])[1] ?? null, title: (/title="([^"]*)"/.exec(m[4]) || [])[1] ?? null, name: m[5], em: Number(m[6]), shows: m[7], whole: m[8] ?? null,
  }));
  return { owner: box[1] + box[2], cls: box[3], em: Number(box[4]), slots };
};
/** a slot's accessible name, in the strings table's words */
const named = (/** @type {'label' | 'fingerprint'} */ role, /** @type {string} */ shows) => esc(t('L.slot.named', { role: t(role === 'label' ? 'L.slot.device-label' : 'L.slot.fingerprint'), shows }));
/** the byline row of an article's plan: its pieces' text */
const bylineRow = (/** @type {import('../model/records.js').Doc} */ d, /** @type {import('./article.js').ArticleView} */ v) => JSON.stringify(articlePlan(d, v, d.account || '').filter((r) => r.kind === 'head')[2]);
/** the device label's box and the fingerprint cue's, in em, as the view's measure sets their faces: LABEL_CH figures, and the cue's own characters */
const LABEL_EM = LABEL_CH * advances('0'), CUE_EM = advances('0000 0000 0000 0000');

test('a byline names its owner, in the identifier\'s face, then its slots: on another\'s, the device label and the fingerprint cue the owner\'s genesis entry holds, the cue in the identifier\'s face; on the reader\'s own, the label alone — each a box of its own width as its face is measured, named by its role and what it shows (FP-34; issue #208; issue #16)', () => {
  const OTHER = '1.0.2', d = doc({ addr: '1.0.2.0.5', account: OTHER, meta: null });
  const facts = /** @type {import('../model/records.js').AccountFacts} */ ({ label: 'agent-runner', fingerprint: '9a0c33f1b2d4e6a8' + '1'.repeat(48) });
  const other = slotsIn(articleHTML(d, view({ keyOf: (a) => (a === OTHER ? facts : undefined) }), OTHER));
  assert.equal(CUE_CH, 19);
  assert.deepEqual(other, {
    owner: OTHER + ' · ', cls: 'slots', em: LABEL_EM + CUE_EM + advances(' · '), slots: [
      { cls: 'slot', role: 'label', cause: null, title: null, name: named('label', 'agent-runner'), em: LABEL_EM, shows: 'agent-runner', whole: null },
      { cls: 'slot id', role: 'fingerprint', cause: null, title: null, name: named('fingerprint', '9a0c 33f1 b2d4 e6a8'), em: CUE_EM, shows: '9a0c 33f1 b2d4 e6a8', whole: null },
    ],
  }, 'another\'s byline: the label and the cue, each in its box');
  const own = slotsIn(articleHTML(doc(), view(), '1.0.1'));
  assert.deepEqual(own && [own.em, own.slots.map((s) => [s.role, s.shows, s.name])], [LABEL_EM, [['label', 'dev-notebook', named('label', 'dev-notebook')]]], 'the reader\'s own byline: its label alone, no cue (foundations §2.1)');
  const guest = slotsIn(articleHTML(doc(), view({ reader: KEYLESS }), '1.0.1'));
  assert.deepEqual(guest && guest.slots.map((s) => s.shows), ['dev-notebook', 'e427 2902 a114 39e5'], 'a guest meets the owner\'s label and cue');
  const faced = (/** @type {string} */ x, /** @type {import('../plane/register.js').Face} */ f) => [...x].length * (f === 'ident' ? 0.6 : 0.5);
  const sized = slotsIn(articleHTML(d, view({ keyOf: (a) => (a === OTHER ? facts : undefined), measure: faced }), OTHER));
  assert.deepEqual(sized && [sized.slots.map((x) => x.em), sized.em], [[LABEL_CH * 0.5, CUE_CH * 0.6], LABEL_CH * 0.5 + CUE_CH * 0.6 + 3 * 0.5], 'each box its own face\'s width: the label\'s figures in the client\'s, the cue in the identifier\'s, the separator in the client\'s');
});

test('a byline never shows a placeholder: while its facts are read its boxes stand empty, named as being read; where none can be named its cause says why, once where one cause empties both slots; a genesis entry with no label says so — and the plan\'s line is the same in every state (FP-34; issue #208: "A slot never shows its template placeholder")', () => {
  const OTHER = '1.0.2', d = doc({ addr: '1.0.2.0.5', account: OTHER, meta: null });
  /** @type {Array<[string, import('../model/records.js').AccountFacts | undefined, string[], string | null]>} each state, the facts handed in, what the slots show, and the cause's string */
  const states = [
    ['being read', undefined, ['', ''], null],
    ['read', { label: 'agent-runner', fingerprint: 'ab'.repeat(32) }, ['agent-runner', 'abab abab abab abab'], null],
    ['no label', { label: null, fingerprint: 'ab'.repeat(32) }, [t('L.slot.unlabelled'), 'abab abab abab abab'], 'L.slot.unlabelled'],
    ['unsigned', { cause: 'unsigned' }, [t('F.slot.unsigned'), ''], 'F.slot.unsigned'],
    ['by reference', { cause: 'by-reference' }, [t('L.slot.by-reference'), ''], 'L.slot.by-reference'],
    ['not recorded', { cause: 'not-recorded' }, [t('F.slot.not-recorded'), ''], 'F.slot.not-recorded'],
    ['withheld', { cause: 'withheld', owner: '1.0.9' }, [t('F.corner.withheld', { owner: '1.0.9' }), ''], 'F.corner.withheld'],
    ['unreachable', { cause: 'unreachable' }, [t('F.daemon.unreachable'), ''], 'F.daemon.unreachable'],
    ['not read', { cause: 'unread' }, [t('L.slot.unread'), ''], 'L.slot.unread'],
  ];
  const rows = new Set();
  for (const [state, facts, shows, cause] of states) {
    const v = view({ reader: KEYLESS, keyOf: (a) => (a === OTHER ? facts : undefined) });
    const html = articleHTML(d, v, OTHER), by = slotsIn(html);
    assert.ok(by, `${state}: the byline stands`);
    assert.ok(!/⟨[^⟩]*⟩/.test(html) && !/⟨[^⟩]*⟩/.test(bylineRow(d, v)), `${state}: no ⟨token⟩ in the article or its plan`);
    assert.deepEqual(by.slots.map((s) => s.shows), shows.map(esc), `${state}: the slots show ${JSON.stringify(shows)}`);
    assert.deepEqual(by.slots.map((s) => s.em), [LABEL_EM, CUE_EM], `${state}: each slot its own width`);
    assert.equal(by.slots[0].cause, cause, `${state}: the cause\'s string carried`);
    const once = !!facts && 'cause' in facts;
    assert.equal(by.cls, once ? 'slots once' : 'slots', `${state}: one cause said once`);
    const told = facts === undefined ? t('L.slot.reading') : shows[0];
    assert.equal(by.slots[0].name, named('label', told), `${state}: the label's slot named by its role and what it shows`);
    if (facts === undefined) assert.deepEqual(by.slots.map((s) => [s.cls, s.name]), [['slot pending', named('label', t('L.slot.reading'))], ['slot pending', named('fingerprint', t('L.slot.reading'))]], 'being read: empty boxes, named so');
    if (once) assert.equal(by.slots[1].name, named('fingerprint', shows[0]), `${state}: the empty slot beside the cause named by it too`);
    rows.add(bylineRow(d, v));
  }
  assert.equal(rows.size, 1, 'the plan\'s byline line the same in every state: what the slots show moves nothing beside them');
});

test('a device label its box does not hold is cut on a word\'s end with an ellipsis, by its width as its face sets it and never its count, carries itself whole for its act and its title, and is named whole (FP-26; FP-34; issue #208: "A label too long for the box is cut and shown whole on its act"; issue #16)', () => {
  assert.equal(cutTo('dev-notebook', LABEL_EM, advances), 'dev-notebook', 'a label the box holds: whole');
  assert.equal(cutTo('Shane’s MacBook Pro (work, 2024)', LABEL_EM, advances), 'Shane’s MacBook Pro…', 'cut before a space');
  assert.equal(cutTo('build-agent-ci-runner-internal', LABEL_EM, advances), 'build-agent-ci-runner-…', 'cut after a hyphen, where a line may break');
  assert.equal(cutTo('abcdefghijklmnopqrstuvwxyz0123', LABEL_EM, advances), 'abcdefghijklmnopqrstuvw…', 'one word longer than the box: as many of its characters as the box holds');
  for (const label of ['Shane’s MacBook Pro (work, 2024)', 'build-agent-ci-runner-internal', 'abcdefghijklmnopqrstuvwxyz0123']) assert.ok(advances(cutTo(label, LABEL_EM, advances)) <= LABEL_EM + 1e-9, `${label}: within the box`);
  const wide = (/** @type {string} */ x) => [...x].reduce((n, c) => n + (c === 'W' ? 2 : 1) * CHAR_W, 0);
  assert.deepEqual([cutTo('WWWW WWWW WWWW WWWW', LABEL_EM, advances), cutTo('WWWW WWWW WWWW WWWW', LABEL_EM, wide)], ['WWWW WWWW WWWW WWWW', 'WWWW WWWW…'], 'nineteen characters of a face whose letters set two advances wide: cut by their width, where a count would keep them whole');
  const long = 'Shane’s MacBook Pro (work, 2024)';
  const by = slotsIn(articleHTML(doc({ addr: '1.0.2.0.5', account: '1.0.2', meta: null }), view({ reader: KEYLESS, keyOf: () => ({ label: long, fingerprint: 'ab'.repeat(32) }) }), '1.0.2'));
  assert.deepEqual(by && { cls: by.slots[0].cls, shows: by.slots[0].shows, whole: by.slots[0].whole, title: by.slots[0].title, name: by.slots[0].name }, { cls: 'slot cut', shows: esc('Shane’s MacBook Pro…'), whole: esc(long), title: esc(long), name: named('label', long) }, 'cut in its box, whole beside it for its act, in its title and in its name');
});

test('each withheld run names its own origin\'s owner — in its head, its arm, its edge\'s mark and the owner it carries — whoever owns the document windowing it', () => {
  const d = doc({ blocks: [
    { pos: 1, width: 10, kind: 'para', text: 'Tumbler.', origin: null },
    { pos: 11, width: WIDE, kind: 'withheld', text: '', origin: '1.0.2.0.2' },
    { pos: 11 + WIDE, width: 10, kind: 'para', text: 'Between.', origin: null },
    { pos: 21 + WIDE, width: 240, kind: 'withheld', text: '', origin: '1.0.1.0.1003' },
    { pos: 261 + WIDE, width: 10, kind: 'para', text: 'After.', origin: null },
    { pos: 271 + WIDE, width: 4, kind: 'withheld', text: '', origin: '1.0.2.0.2' },
  ] });
  const runs = [{ pos: 11, width: WIDE, origin: '1.0.2.0.2', owner: '1.0.2' }, { pos: 21 + WIDE, width: 240, origin: '1.0.1.0.1003', owner: '1.0.1' }, { pos: 271 + WIDE, width: 4, origin: '1.0.2.0.2', owner: '1.0.2' }];
  for (const reader of [SIGNED, KEYED, KEYLESS]) {
    const html = articleHTML(d, view({ reader }), '1.0.1');
    for (const r of runs) {
      const g = /** @type {NonNullable<ReturnType<typeof gapAt>>} */ (gapAt(html, r.pos)), what = `${JSON.stringify(reader)}: the run from ${r.origin}, in ${d.addr}, which 1.0.1 owns`;
      assert.equal(g.owner, r.owner, `${what}: carries ${r.owner}`);
      if (g.head != null) assert.equal(g.head, headOf(r.owner, r.width, r.origin), `${what}: its head names ${r.owner}, in the identifier's face`);
      if (g.arm != null) assert.equal(g.arm, tHTML(entitlementArm(reader, r.owner).id, { owner: r.owner }, { owner: 'id' }), `${what}: its arm the one for ${r.owner}, in the identifier's face`);
      assert.ok(g.holds === 'face' ? g.mark === null && g.arm != null : g.mark?.text === markOf(r.owner), `${what}: the face in its gap, else its edge's mark naming ${r.owner}`);
    }
    assert.equal((gapAt(html, 11) || {}).holds, 'face', 'twelve full lines hold every reader\'s face');
  }
});

test('an item this client cannot show is a gap of its positions, each one advance: its row the gap\'s lines, its element as tall and its last line its remainder, its words in it where its full lines hold them, else in its column\'s edge level with its first line, its marks the block\'s (issue #16)', () => {
  const hex = (/** @type {number} */ pos, /** @type {number} */ width) => /** @type {import('../model/records.js').Block} */ ({ pos, width, kind: 'hex', text: 'ab'.repeat(width), origin: null });
  const atom = /** @type {import('../model/records.js').Block} */ ({ pos: 205, width: 1, kind: 'atom', text: '{"type":"skep-retire","fingerprints":[]}', origin: null });
  const d = doc({ blocks: [hex(1, 4), hex(5, 3 * MEASURE_CPL), { pos: 203, width: 2, kind: 'para', text: 'ok', origin: null }, atom] });
  const html = articleHTML(d, view({ selected: { addr: d.addr, pos: 6, width: 2 } }), '1.0.1');
  /** the gap of the block at a position: its classes, its height in line boxes, its last line, and its words in it or in its edge */
  const gap = (/** @type {number} */ pos) => {
    const m = new RegExp(`<span class="([^"]*) gap" data-addr="[^"]*" data-pos="${pos}" data-width="\\d+" style="height:([\\d.]+)em;--wh-last:(\\d+)">(<span class="unshown( edge)?"[^>]*>([^<]*)</span>)</span>`).exec(html);
    return m && { cls: m[1], lines: Math.round((Number(m[2]) / LINE_H) * 1e9) / 1e9, last: Number(m[3]), edge: !!m[5], words: m[6] };
  };
  assert.deepEqual(gap(1), { cls: 'sp blk-hex', lines: 1, last: 4, edge: true, words: esc(t('F.not-rendered', { width: 4 })) }, 'four positions: one line four advances long, its words in the edge');
  assert.deepEqual(gap(5), { cls: 'sp blk-hex sel', lines: 3, last: MEASURE_CPL, edge: false, words: esc(t('F.not-rendered', { width: 3 * MEASURE_CPL })) }, 'three full lines: its words in it; the selection touching it marks it');
  assert.deepEqual(gap(205), { cls: 'sp blk-atom', lines: 1, last: 1, edge: true, words: esc(t('F.not-rendered', { width: 1 })) }, 'an atom of no record\'s value: one position, its words in the edge');
  assert.ok(new RegExp(`<span class="unshown edge" style="${esc('--edge-in')}`).test(html), 'the edge\'s words placed as every sign there is');
  const plan = articlePlan(d, view(), '1.0.1');
  assert.deepEqual(plan.filter((r) => r.pos != null).map((r) => [r.pos, r.kind, r.width]), [[1, 'gap', 4], [5, 'gap', 3 * MEASURE_CPL], [203, 'text', 0], [205, 'gap', 1]], 'each item\'s row its gap, carrying its width');
  assert.deepEqual(layoutOf(plan).lines.filter((l) => l.pos === 5).map((l) => [l.w, l.at]), [[MEASURE_CPL, 5], [MEASURE_CPL, 5 + MEASURE_CPL], [MEASURE_CPL, 5 + 2 * MEASURE_CPL]], 'its bars a line of its positions each');
});

test('every address the article sets stands in the identifier\'s face, inside a sentence as well: the head\'s address, the byline\'s owner, a withheld document\'s state line, an unregistered one\'s address, another\'s home record (issue #16)', () => {
  const head = articleHTML(doc({ blocks: [{ pos: 1, width: 8, kind: 'para', text: 'Tumbler.', origin: null }] }), view(), '1.0.1');
  assert.ok(head.startsWith(`<div class="hd"><span class="addr id">1.0.1.0.3</span>`) && head.includes(`<span class="by">${idOf('1.0.1')} · `), 'the head\'s address and the byline\'s owner');
  assert.ok(head.includes('<p class="sp blk-para indent" data-addr="1.0.1.0.3" data-pos="1" data-width="8">Tumbler.</p>'), 'the document\'s own words carry no face of the client\'s');
  const st = (/** @type {Partial<import('../model/records.js').Doc>} */ o) => (/<span class="st">(.*?)<\/span><span class="by">/.exec(articleHTML(doc(o), view(), '1.0.1')) || [])[1];
  assert.equal(st({ refused: 'withheld' }), tHTML('F.corner.withheld', { owner: '1.0.1' }, { owner: 'id' }), 'a withheld document\'s state line');
  assert.equal(st({ refused: 'unregistered' }), tHTML('B1.doc_not_registered', { address: '1.0.1.0.3' }, { address: 'id' }), 'an unregistered address');
  assert.equal(st({}), esc(t('B1.state-line')), 'a state line naming no address: the client\'s words alone');
  const enroll = { pos: 1, width: 1, kind: /** @type {const} */ ('atom'), text: JSON.stringify({ type: 'skep-enroll', keys: [{ label: 'dev-notebook', anchor: false }] }), origin: null };
  const other = articleHTML(doc({ addr: '1.0.2.0.1', account: '1.0.2', blocks: [enroll] }), view(), '1.0.2');
  assert.ok(other.includes(`<span class="rec-words">${tHTML('F.home-record.other', { owner: '1.0.2' }, { owner: 'id' })}</span>`), 'another\'s home record names its owner in the identifier\'s face');
});

// ---- the item rule and the copy's plain text (FP-24) --------------------------------------------------------------

/** a key's fingerprint built here apart from the page's: SHA-256 over the tag, then each field's 4-byte big-endian length and its bytes (AUTH-1.8, AUTH-1.12) */
const fingerprintOf = (/** @type {string} */ alg, /** @type {string} */ keyHex) => {
  const be32 = (/** @type {number} */ n) => { const b = Buffer.alloc(4); b.writeUInt32BE(n); return b; };
  const a = Buffer.from(alg, 'utf8'), raw = Buffer.from(keyHex, 'hex');
  return createHash('sha256').update(Buffer.concat([Buffer.from('skep-key-v1', 'utf8'), be32(a.length), a, be32(raw.length), raw])).digest('hex');
};
/** a genesis record's value: each key `[label, key hex, anchor]`, a key whose label is null carrying none */
const enroll = (/** @type {Array<[string | null, string, boolean]>} */ keys) => JSON.stringify({ type: 'skep-enroll', keys: keys.map(([label, key, anchor]) => ({ alg: 'mldsa65-ed25519', key, anchor, ...(label ? { label } : {}) })) });
const KEY_A = '0a1b2c3d'.repeat(8), KEY_B = 'F0E1D2C3'.repeat(8);
/**
 * What a copy reads of a text made of items in order — each `[kind, text, width?, origin?]` placed after the one before
 * it — its blocks derived from its runs as the model derives them, and its image as given.
 * @param {string} addr
 * @param {Array<[import('../model/frames.js').Run['kind'], string, number?, string?]>} items
 * @param {import('../model/records.js').ImageRun[]} [image]
 */
const textMade = (addr, items, image = []) => {
  let pos = 1;
  /** @type {import('../model/frames.js').Run[]} */
  const runs = [];
  for (const [kind, text, width, origin] of items) {
    const w = width ?? (kind === 'content' ? byteLength(text) : 1);
    runs.push({ pos, width: w, kind, text, ref: null, origin: origin ?? null });
    pos += w;
  }
  return { addr, runs, blocks: deriveBlocks(runs), image };
};
/** the whole of a text as a span */
const whole = (/** @type {{addr: string, runs: Array<{pos: number, width: number}>}} */ m) => ({ addr: m.addr, pos: 1, width: m.runs.reduce((n, r) => n + r.width, 0) });
/** a stand-in in the strings table's words */
const standIn = {
  record: (/** @type {string[]} */ contents = []) => (contents.length ? t('L.copy.item.contents', { kind: t('L.item.record'), contents: contents.join(' · ') }) : t('L.copy.item', { kind: t('L.item.record') })),
  reference: () => t('L.copy.item', { kind: t('L.item.reference') }),
  withheld: (/** @type {string} */ owner, /** @type {number} */ n) => t('L.copy.item.owned', { kind: t('L.item.withheld'), owner, length: n === 1 ? t('L.item.positions.1') : t('L.item.positions', { n }) }),
  unshown: (/** @type {number} */ n) => t('L.copy.item.sized', { kind: t('L.item.unshown'), length: n === 1 ? t('L.item.positions.1') : t('L.item.positions', { n }) }),
};

test('the item rule names the kind of every block that holds no text — a record the record rule renders, a reference, a withheld run, else an item this client cannot show — and no paragraph', () => {
  const m = textMade('1.0.1.0.1', [
    ['content', 'Words.\n\n'], ['atom', enroll([['paper', KEY_A, true]])], ['atom', JSON.stringify({ type: 'skep-head', position: 7, chain: 'ab'.repeat(16) })],
    ['ref', ''], ['withheld', '', 240, '1.0.1.0.1003'], ['hex', 'abcd', 2], ['atom_hex', 'fffe'], ['atom', JSON.stringify({ type: 'skep-retire', fingerprints: [] })], ['atom', 'not a value'],
  ]);
  assert.deepEqual(m.blocks.map((b) => itemOf(b)), [null, 'record', 'record', 'reference', 'withheld', 'unshown', 'unshown', 'unshown', 'unshown']);
});

test('a key record\'s own plain contents are each key\'s label and its fingerprint, in the record\'s order — a key with no label its fingerprint alone, upper-case hex read as its bytes — and the head record\'s none', () => {
  const [b] = deriveBlocks([{ pos: 1, width: 1, kind: 'atom', text: enroll([['paper', KEY_A, true], [null, KEY_B, false]]), ref: null, origin: null }]);
  assert.deepEqual(recordContents(b), [t('L.copy.key', { label: 'paper', fingerprint: fingerprintOf('mldsa65-ed25519', KEY_A) }), fingerprintOf('mldsa65-ed25519', KEY_B)]);
  assert.match(recordContents(b)[1], /^[0-9a-f]{64}$/, 'the flat 64-lowercase-hex form the daemon emits (AUTH-1.9), never the grouped display');
  const [head] = deriveBlocks([{ pos: 1, width: 1, kind: 'atom', text: JSON.stringify({ type: 'skep-head', position: 3, chain: 'cd'.repeat(16) }), ref: null, origin: null }]);
  assert.deepEqual(recordContents(head), [], 'the head record adds nothing');
  const [bad] = deriveBlocks([{ pos: 1, width: 1, kind: 'atom', text: enroll([['paper', 'not hex', true]]), ref: null, origin: null }]);
  assert.deepEqual(recordContents(bad), ['paper'], 'a key whose value derives no fingerprint: its label alone');
});

test('a copy\'s plain text follows the span\'s items in order — its text as its text, each item that holds no text a stand-in in square brackets in its place naming its kind — never empty, and never what the plane draws of an item', () => {
  const doc = '1.0.1.0.1';
  const m = textMade(doc, [['content', 'Before — '], ['atom', enroll([['paper', KEY_A, true]])], ['content', ' between '], ['ref', ''], ['content', ' and '], ['hex', 'abcd', 2], ['content', ' after.']]);
  const owner = (/** @type {string} */ a) => accountOf(a) || '';
  const fp = fingerprintOf('mldsa65-ed25519', KEY_A);
  assert.equal(copyText(m, whole(m), owner), `Before — ${standIn.record([t('L.copy.key', { label: 'paper', fingerprint: fp })])} between ${standIn.reference()} and ${standIn.unshown(2)} after.`);
  for (const b of m.blocks.filter((x) => itemOf(x))) {
    const alone = copyText(m, { addr: doc, pos: b.pos, width: b.width }, owner);
    assert.ok(alone.length > 0 && alone.startsWith('[') && alone.endsWith(']'), `the ${itemOf(b)} alone: a stand-in, never an empty clipboard — ${alone}`);
  }
  const rendered = [t('F.home-record.yours'), t('F.home-record.other', { owner: '1.0.1' }), 'ANCHOR', t('F.not-rendered', { width: 2 }), '⟡'];
  assert.ok(!rendered.some((w) => copyText(m, whole(m), owner).includes(w)), 'no word of what the plane draws for whoever is looking is copied');
  const words = textMade(doc, [['content', 'Tumbler — ünïcode 🦊 text.\n\nThe second paragraph.']]);
  for (const [p0, p1] of [[1, 12], [3, 30], [5, words.runs[0].width + 1]]) {
    assert.equal(copyText(words, { addr: doc, pos: p0, width: p1 - p0 }, owner), textOf(words.runs, p0, p1), `a span of text alone, [${p0}, ${p1}): its own characters, as before`);
  }
});

test('a withheld run\'s stand-in names its origin\'s owner — never the owner of the document windowing it — and its length, and text is never joined across it', () => {
  const D = '1.0.2.0.5', O = '1.0.1.1.0.2';
  const m = textMade(D, [['content', 'Tumbler.'], ['withheld', '', 240, O], ['content', 'After.']]);
  // the one owner rule, as T-LAYER's `originOwner` answers it: the sub-account 1.0.1.1 owned by the seat above it
  const owner = (/** @type {string} */ a) => (accountOf(a) === '1.0.1.1' ? '1.0.1' : accountOf(a) || '');
  const copied = copyText(m, whole(m), owner);
  assert.equal(copied, `Tumbler.${standIn.withheld('1.0.1', 240)}After.`);
  assert.ok(!copied.includes('Tumbler.After.') && !copied.includes('1.0.2'), `the two texts stand apart, the run's owner its origin's: ${copied}`);
  assert.equal(copyText(m, { addr: D, pos: 9, width: 1 }, owner), standIn.withheld('1.0.1', 240), 'a span touching the run takes it whole');
});

test('items one after another of one kind and one owner share one stand-in, their lengths summed and their contents in order; of another owner, or with text between them, a stand-in each', () => {
  const D = '1.0.2.0.5';
  const owner = (/** @type {string} */ a) => accountOf(a) || '';
  // two runs withheld from origins of one owner, then one of another owner's
  const runs = textMade(D, [['withheld', '', 10, '1.0.1.0.1003'], ['withheld', '', 5, '1.0.1.0.1004'], ['withheld', '', 3, '1.0.3.0.2']]);
  assert.equal(copyText(runs, whole(runs), owner), standIn.withheld('1.0.1', 15) + standIn.withheld('1.0.3', 3));
  // hex and an atom of no record's value, one owner: one stand-in
  const unshown = textMade(D, [['hex', 'abcd', 2], ['atom', '{"type":"skep-retire","fingerprints":[]}']]);
  assert.equal(copyText(unshown, whole(unshown), owner), standIn.unshown(3));
  // two key records, their bytes in one I-space: one stand-in, the keys in order; the second transcluded from another
  // account's I-space, as the image the article was made from places it: a stand-in each
  const rec = (/** @type {Array<[string | null, string, boolean]>} */ k) => /** @type {[import('../model/frames.js').Run['kind'], string]} */ (['atom', enroll(k)]);
  const two = [rec([['paper', KEY_A, true]]), rec([['laptop', KEY_B, false]])];
  const keys = [t('L.copy.key', { label: 'paper', fingerprint: fingerprintOf('mldsa65-ed25519', KEY_A) }), t('L.copy.key', { label: 'laptop', fingerprint: fingerprintOf('mldsa65-ed25519', KEY_B) })];
  const own = textMade('1.0.2.0.1', two, [{ pos: 1, width: 2, prefix: '1.0.2.0.1.0.1', ordinal: 1 }]);
  assert.equal(copyText(own, whole(own), owner), standIn.record(keys));
  const apart = textMade('1.0.2.0.1', two, [{ pos: 1, width: 1, prefix: '1.0.2.0.1.0.1', ordinal: 1 }, { pos: 2, width: 1, prefix: '1.0.3.0.1.0.1', ordinal: 1 }]);
  assert.equal(copyText(apart, whole(apart), owner), standIn.record([keys[0]]) + standIn.record([keys[1]]));
  // text between two items of one kind and owner: a stand-in each, the text in its place
  const between = textMade(D, [['ref', ''], ['content', '\n\n'], ['ref', '']]);
  assert.equal(copyText(between, whole(between), owner), standIn.reference() + '\n\n' + standIn.reference());
});

test('the ends drawn at a withheld run stand as ONE symbol at the start of its gap\'s first line, before the notice\'s words — every end\'s key on it, its count where it stands for two or more — at every stage of the reveal, no stretch of the gap marked; another\'s counted in the column\'s edge, below the face\'s compact mark; the plan unmoved (issue #202)', () => {
  const O = '1.0.1.0.1003', RUN = { pos: 11, width: 240, origin: O };
  const d = doc({ blocks: [{ pos: 1, width: 10, kind: 'para', text: 'Tumbler.', origin: null }, runOf(240, 11)] });
  /** an end LK draws at the run (LK's `Shown.run`): its one stretch the run's whole extent */
  const atRun = (/** @type {string} */ link, /** @type {string} */ key, value = 1) => ({ ...shown(11, 240), link: { addr: link, type: null }, key, run: RUN, runs: [{ pos: 11, width: 240 }], mark: { hue: HUE.you, linker: 'you', form: [], value, own: true } });
  const inText = shown(1, 3), a = atRun('R1', 'k1'), b = atRun('R2', 'k2');
  const counted = (/** @type {import('../model/records.js').Block} */ x) => ({ n: x.kind === 'withheld' ? 1 : 0, social: false });
  const v = view({ reader: KEYLESS, marks: [inText, a, b], symbols: [], countAt: counted });
  const html = articleHTML(d, v, '1.0.1');
  const gap = /** @type {RegExpExecArray} */ (/<span class="withheld" data-pos="11"[^>]*>(.*)<\/span><\/div>$/.exec(html))[1];
  assert.ok(html.includes(esc(t('B1.presence', { n: 3 }))), 'the presence words count the three ends drawn: two at the run, one in the text');
  const syms = [...gap.matchAll(/<span class="sym at-run [^"]*" data-links="([^"]*)" data-ends="([^"]*)" style="([^"]*)" role="button" tabindex="-1" title="[^"]*">([^<]*)<\/span>/g)].map((m) => m.slice(1));
  assert.deepEqual(syms.map((m) => [m[0], m[1], m[3]]), [['R1 R2', 'k1 k2', '⟡2']], `one symbol at the run, carrying both ends and their count, a control on the plane, at stage 1: ${gap}`);
  assert.ok(syms[0][2].includes(`--mark-hue:${HUE.you}`) && syms[0][2].includes('--sym-chars:2'), 'in the mark its links merge into, its width its ⟡ and its count');
  assert.ok(new RegExp(`^<span class="wh-mark edge"[^>]*>${INNER}</span><span class="others edge"[^>]*>[^<]*</span><span class="wh-head"><span class="sym at-run `).test(gap), `first in the gap's first line, before the notice's words, after the edge's signs: ${gap}`);
  assert.ok(!/class="[^"]*\blip\b/.test(gap) && !gap.includes('depth'), 'no stretch of the gap marked: it still reads as empty');
  const count = /<span class="others edge" data-count="(\d+)" style="([^"]*)">([^<]*)<\/span>/.exec(gap);
  assert.deepEqual(count && [count[1], count[3]], ['1', esc(t('F.others-count', { n: 1 }))], 'another\'s end there counted in the edge');
  assert.ok(count && count[2].endsWith(`;top:${LINE_H / MEASURE.count}em`), `stacked one edge line below the face's compact mark: ${count && count[2]}`);
  // one end alone: no count after its ⟡
  assert.ok(articleHTML(d, view({ reader: KEYLESS, marks: [a] }), '1.0.1').includes('data-links="R1" data-ends="k1" style="--mark-hue:' + HUE.you + ';--mark-value:1;--sym-chars:1" role="button" tabindex="-1" title="">⟡</span>'), 'one end: its ⟡ alone');
  // the plan: the gap's row and every block's the same, the ends drawn at the run or not
  const rows = (/** @type {import('./article.js').ArticleView} */ w) => JSON.stringify(articlePlan(d, w, '1.0.1').filter((r) => r.kind !== 'head'));
  assert.equal(rows(v), rows(view({ reader: KEYLESS, marks: [inText] })), 'no row moved: the gap stands on its bars');
  // what the gap holds is measured with the symbol first in its first line: it steps the notice to a smaller form, never drops the symbol (FP-26)
  const p = placeholderOf(runOf(5), SIGNED, (x) => accountOf(x) || '', () => null);
  assert.deepEqual([gapHolds(p, 5, MEASURE_CPL, advances), gapHolds(p, 5, MEASURE_CPL, advances, 2)], ['owner', 'mark'], 'five positions hold the owner\'s address alone; with the symbol before it, the origin\'s mark');
  const five = withheldBlockHTML(runOf(5), d, view(), { ends: [a, b], count: { n: 0, social: false } });
  assert.ok(five.includes('data-holds="mark"') && five.includes('>⟡2</span>' + esc(t('L.origin-mark')) + '</span>'), `the symbol stands, before the origin's mark: ${five}`);
});

test('a symbol stands after the last of its stretches a paragraph holds — an end whose last stretch lies in an item that holds no text keeps its symbol in the text (issue #202)', () => {
  const d = doc({ blocks: [{ pos: 1, width: 13, kind: 'para', text: 'one two three', origin: null }, { pos: 14, width: 1, kind: 'atom', text: '{}', origin: null }] });
  const s = { ...shown(5, 3), runs: [{ pos: 5, width: 3 }, { pos: 14, width: 1 }] };
  assert.deepEqual(piecesOf(d, view({ marks: [s], symbols: [s] }), 1), ['one ', 'two', '⟡', ' three'], 'after "two", the last of its words a paragraph holds');
  assert.equal(symsIn(articleHTML(d, view({ marks: [s], symbols: [s] }), '1.0.1')).length, 1);
});

test('a symbol is lit where every link it stands for is lit — one rule, T-LAYER\'s in place — and the article is made with none lit, so an arrival sets no line (FP-30; issue #202)', () => {
  assert.deepEqual([symbolLit(['A'], ['A']), symbolLit(['A'], []), symbolLit(['A', 'B'], ['A']), symbolLit(['A', 'B'], ['B', 'A']), symbolLit([], ['A'])], [true, false, false, true, false], 'its one link lit; one of its two not; both; a symbol standing for none never');
  const d = doc({ blocks: [{ pos: 1, width: 13, kind: 'para', text: 'one two three', origin: null }, runOf(240, 14)] });
  const lit = { ...shown(5, 3), mark: { ...shown(5, 3).mark, weight: 2 } };
  const atRun = { ...lit, link: { addr: 'R', type: null }, key: 'k', run: { pos: 14, width: 240, origin: '1.0.1.0.1003' }, runs: [{ pos: 14, width: 240 }] };
  const html = articleHTML(d, view({ marks: [lit, atRun], symbols: [lit] }), '1.0.1');
  assert.ok(symsIn(html).length === 1 && html.includes('sym at-run') && !html.includes('heavier'), 'made with nothing lit, whatever the weight its links\' marks carry');
});

test('a document\'s first line is one rule: withheld, its box\'s words bracketed, its owner the identifier\'s; along its text from its first position — white space alone and items that are no record passed over, up to a position not held — a record\'s words by the record rule, bracketed, else its first typed line, as typed; else the index\'s first line at its bare address; none where none is known (issue #23)', () => {
  const para = (/** @type {number} */ pos, /** @type {string} */ text, width = text.length + 2) => /** @type {import('../model/records.js').Block} */ ({ pos, width, kind: 'para', text, origin: null });
  const at = (/** @type {Partial<import('../model/records.js').Doc>} */ o, label = /** @type {string | null} */ ('the index\'s line')) => firstLineOf(doc(o), { label, reader: SIGNED, owner: '1.0.2' });
  assert.deepEqual(at({ refused: 'withheld' }), bracketed([{ text: 'withheld · ', face: 'client' }, { text: '1.0.2', face: 'ident' }]), 'withheld: its box\'s words, bracketed');
  assert.deepEqual(bracketed([{ text: 'x', face: 'client' }]).map((r) => r.text).join(''), t('L.client-words', { words: 'x' }), 'the brackets the strings table\'s');
  assert.deepEqual(at({ blocks: [para(1, '   '), runOf(4, 6), para(10, '# Its first line')] }), [{ text: '# Its first line', face: 'reading' }], 'white space and a withheld run passed over: its first typed line, as typed');
  assert.deepEqual(at({ blocks: [para(1, ''), para(50, 'Past a gap')] }), [{ text: 'the index\'s line', face: 'reading' }], 'a position not held before any line: the index\'s first line');
  assert.deepEqual(at({ blocks: [] }, null), [], 'nothing held, nothing listed: none');
  const enroll = /** @type {import('../model/records.js').Block} */ ({ pos: 1, width: 1, kind: 'atom', text: JSON.stringify({ type: 'skep-enroll', keys: [{ label: 'dev', alg: 'ed25519', key: '00' }] }), origin: null });
  assert.deepEqual(at({ blocks: [enroll, para(2, 'After the record')] }).map((r) => r.text).join(''), t('L.client-words', { words: t('F.home-record.yours') }), 'opening with a record: the record rule\'s words, bracketed, never its raw value');
  const theirs = firstLineOf(doc({ account: '1.0.2', blocks: [enroll] }), { label: null, reader: SIGNED, owner: '1.0.2' });
  assert.deepEqual(theirs.filter((r) => r.face === 'ident').map((r) => r.text), ['1.0.2'], 'another\'s home record: the owner it names in the identifier\'s face');
  assert.equal(CLIENT_CLOSE, ']', 'what closes the client\'s words: the bracket a cut keeps');
});
