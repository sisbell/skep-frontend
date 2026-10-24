// T-ARTICLE's test: the article from a record — the withheld run a gap as
// tall as its bars, its last line its remainder, never its text, holding its
// face whole where its full lines hold it, else its head, else its origin's
// owner, else the origin's mark, the face compact in its column's edge then —
// its owner and a mark that opens it whole, a control on the plane alone (a
// mutant that stands the face in every gap, or never, or leaves out the
// edge's mark, turns red) (issue #151's design decision); its entitlement arm
// the one rule's for the reader (C-39's face reads it too): a signed-in principal's
// owner-grant default, whatever key signed the session; a guest whose device
// holds a key for this board C-36's key-present default, never told that no
// key on this device opens an account (a mutant that decides on the session
// alone turns red); a guest with none R56's key-absent default, naming the
// owner. C-67's clause beneath the arm decided over the origin's whole
// admitted-claim set (PUB-5.124, RES-164): nothing in its place where no
// claim stands, where the lookup, a claim's link or its home is not read yet,
// or where the board refused the lookup as withheld from the reader (a mutant
// that keeps the pointer unconditional turns red); "edition claims not read"
// where the lookup failed any other way, or a listed claim's admission waits
// on a read that failed and no admitted claim passes nor waits on a read
// still out (issue #186: a mutant that leaves the place blank over a failed
// read, or says QUOTING over one, turns red), a line on the plane and in a
// pane alike; the pointer
// where any admitted claim's FROM holds bytes outside the origin — a
// delegate's among them — even listed after one that quotes (a mutant that
// decides by the first claim turns red), following the passing claim
// PUB-3.107's order picks — the origin owner's own first, though a delegate's
// is addressed lower; the lowest-addressed of the owner's as tumblers; the
// lowest-addressed passing claim where none of the owner's passes (a mutant
// that takes the lowest address alone, the first listed, or orders addresses
// as strings turns red) — on the plane a control carrying that claim and its
// home, in a pane a line (a mutant that carries no claim, or makes the pane's
// a control, turns red); the QUOTING sibling where every
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
// break between them; the others' count in its column's edge, the block's
// first child out of its text and no piece of its plan, so it sets no line (a
// mutant that floats it in the text turns red); the corner compact — its
// usual states glyphs named by their whole words, its numbers and its
// exceptions in their words (a mutant that compacts a number turns red);
// an end standing in two stretches marked in both, the
// text between them not, its one symbol after its last stretch (a mutant
// that marks or stands it by the first stretch alone turns red); each mark
// carrying the ends it draws — a symbol its link and its end's key, a
// stretch the links and the keys of the ends marking it, in one order — so a
// link's two ends in one paragraph are two marks a click tells apart (a
// mutant that writes the link alone turns red); a symbol
// whose far end floats titled with "its passage is not in ⟨D⟩'s current
// text", and one whose far end's text holds part of its passage with the
// line (issue #153; a mutant that leaves the title its type alone turns
// red). The plan
// the canvas's bars are laid out from: the head's three lines, a fourth where
// links touch the document; a block's
// pieces with its hairline's label, C-33's mark and its symbols at its size;
// a heading's margins standing it nearer the block it heads; the same blocks,
// in the same order, as the HTML. The scene-mode variant, a reading scene's
// pane's article: no scene-offer and no row for one in the plan, and no mark
// a control — the plane's offer, symbols and presence ⟡ are (a mutant that
// offers the scene in a pane, or keeps a symbol's button there, turns red).
// Each withheld run names its own origin's owner, whoever owns the document
// windowing it — in its head, its arm, its edge's mark and the owner it
// carries for C-39's face (a mutant that names the article's owner, or one
// owner for every run, turns red).
// The corner at a pinned version names it — its own number of the count its
// box's document holds — and offers the versions list there too; its record
// holding no count, it takes the box's (issue #154). A reading scene's pane's
// corner, handed them, carries its act reading another version in the pane's
// place and the line saying the version it reads lacks the passage that act
// carried, in the corner's one order; the plane's carries neither (issue #160:
// a mutant that draws either always, or never, turns red).
// THE ITEM RULE (issue #161): every block that holds no text is one kind — a
// record the record rule renders, a reference, a withheld run, else an item
// this client cannot show — and no paragraph is; a key record's own plain
// contents are its keys' labels and fingerprints in the record's order, each
// fingerprint built here apart from the page's (a mutant that hashes the hex
// as text, frames no length, or groups the hex turns red). THE COPY'S PLAIN
// TEXT is the span's items in order, a stand-in in each item's place — never
// empty (a mutant that copies the text alone turns red), never a word of what
// the plane draws; text is never joined across a withheld run, whose
// stand-in names its origin's owner, never the windowing document's (a mutant
// that names the document's owner turns red), and its length; items one
// after another of one kind and owner share one stand-in, their lengths
// summed, and of another owner, or with text between them, take one each (a
// mutant that never merges, or merges across owners, turns red); a span of
// text alone copies its own characters, as M-REC's `textOf` reads them.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { articleHTML, articlePlan, withheldBlockHTML, entitlementArm, editionClause, placeholderOf, gapHolds, cornerHTML, headingLevel, blockMarks, itemOf, recordContents, copyText } from './article.js';
import { MEASURE, MEASURE_CPL, LINE_H, layoutOf } from '../plane/layout.js';
import { HUE, NEUTRAL_HUE, VISITED_ALPHA } from '../plane/register.js';
import { mergedMark } from '../links/links.js';
import { t } from '../strings.js';
import { esc, byteLength } from '../util.js';
import { accountOf, homeOf, resolveSpan } from '../model/address.js';
import { deriveBlocks, textOf } from '../model/records.js';

/** @typedef {import('../model/records.js').Reader} Reader */
/** the readers the arm is decided for: signed in, with a key bound at this board and with none; a guest with a key here; a guest with none */
const SIGNED = /** @type {Reader} */ ({ account: '1.0.1', keyPresent: true }), BARE = /** @type {Reader} */ ({ account: '1.0.1', keyPresent: false });
const KEYED = /** @type {Reader} */ ({ account: null, keyPresent: true }), KEYLESS = /** @type {Reader} */ ({ account: null, keyPresent: false });

/** @returns {import('./article.js').ArticleView} */
const view = (/** @type {Partial<import('./article.js').ArticleView>} */ o = {}) => ({
  selected: null, focus: null, marks: [], mergedMark, symbols: [], says: () => '', countAt: () => ({ n: 0, social: false }), wholeLinks: 0,
  reader: SIGNED, localTrust: true, notebook: true, scene: false, originKinds: new Map(), originOwner: (a) => accountOf(a) || '', clauseOf: () => null,
  deviceLabel: 'dev-notebook', ownerFingerprint: 'e4272902a11439e5', ...o,
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
  const inner = (/** @type {string} */ cls) => (new RegExp(`<span class="${cls}"[^>]*>([^<]*)</span>`).exec(m[2]) || [])[1] ?? null;
  const mark = /<span class="wh-mark edge" data-mark="withheld"([^>]*?) style="[^"]*">([^<]*)<\/span>/.exec(m[2]);
  const style = at('style') || '';
  return {
    owner: at('data-owner'), holds: at('data-holds'), width: Number(at('data-width')), height: Number((/height:([\d.]+)em/.exec(style) || [])[1]), last: Number((/--wh-last:(\d+)/.exec(style) || [])[1]),
    head: inner('wh-head'), arm: inner('arm'), clause: inner('clause'), alone: inner('wh-owner'), origin: inner('wh-origin'),
    mark: mark ? { text: mark[2], control: mark[1].includes('role="button"') && mark[1].includes('tabindex="-1"') } : null,
  };
};

test('a withheld run is a gap as tall as its bars — its last line its remainder — never its text: its face whole where its full lines hold it, else its head, else its origin\'s owner, else the origin\'s mark, the face compact in its column\'s edge then (issue #151)', () => {
  const owner = '1.0.1', head = (/** @type {number} */ w) => esc(t('B1.withheld-run', { owner, account: owner, width: w, origin: '1.0.1.0.1003' }));
  const mark = { text: esc(t('L.withheld.mark', { owner })), control: true };
  // twelve full lines: the face whole, the head, the arm and nothing in the clause's place, no mark at the edge
  const wide = /** @type {NonNullable<ReturnType<typeof gapAt>>} */ (gapAt(withheldBlockHTML(runOf(WIDE), doc(), view({ reader: KEYLESS }))));
  assert.deepEqual({ ...wide, height: Math.round(wide.height / LINE_H * 1e9) / 1e9 }, { owner, holds: 'face', width: WIDE, height: 12, last: MEASURE_CPL, head: head(WIDE), arm: esc(t('R56.key-absent', { owner })), clause: null, alone: null, origin: null, mark: null }, 'twelve full lines: the face in place, R56\'s arm and all');
  // 240 positions — three full lines and 42 — under R56's arm: the head alone, the face compact at the edge
  const run = /** @type {NonNullable<ReturnType<typeof gapAt>>} */ (gapAt(withheldBlockHTML(runOf(240), doc(), view({ reader: KEYLESS }))));
  assert.deepEqual([run.holds, run.head, run.arm, run.mark, run.last], ['head', head(240), null, mark, 240 - 3 * MEASURE_CPL], '240 positions: the head in its gap, the face compact at the edge');
  assert.ok(Math.abs(run.height - 4 * LINE_H) < 1e-9, `as tall as its four bars: ${run.height} em`);
  // one full line: the head still; five positions: the owner's address alone; four: the origin's mark
  assert.equal((gapAt(withheldBlockHTML(runOf(MEASURE_CPL), doc(), view({ reader: KEYLESS }))) || {}).holds, 'head', 'one full line holds the head');
  const five = /** @type {NonNullable<ReturnType<typeof gapAt>>} */ (gapAt(withheldBlockHTML(runOf(5), doc(), view())));
  assert.deepEqual([five.holds, five.alone, five.mark], ['owner', owner, mark], 'five positions: its origin\'s owner, the face at the edge');
  const four = /** @type {NonNullable<ReturnType<typeof gapAt>>} */ (gapAt(withheldBlockHTML(runOf(4), doc(), view())));
  assert.deepEqual([four.holds, four.origin, four.mark], ['mark', esc(t('L.origin-mark')), mark], 'four: the origin\'s mark, the face at the edge');
  // in a reading scene's pane, where nothing is acted on, the edge's mark is no control
  assert.equal((gapAt(withheldBlockHTML(runOf(4), doc(), view({ scene: true }))) || { mark: null }).mark?.control, false, 'in a pane the mark is a line');
  // the rule over the face itself: the gap holds it where P-LAY's lines of it fit its full lines, at a narrower measure too
  const p = placeholderOf(runOf(240), SIGNED, (a) => accountOf(a) || '', () => null);
  const face = layoutOf([{ kind: 'text', pos: null, size: 1, pieces: [{ text: p.head, size: 1, lead: 0, trail: 0, box: false, own: false }], before: 0, after: 0, width: 0, keep: 'whole' },
    { kind: 'text', pos: null, size: MEASURE.face, pieces: [{ text: p.arm.text, size: MEASURE.face, lead: 0, trail: 0, box: false, own: false }], before: MEASURE.faceGap * MEASURE.face, after: 0, width: 0, keep: 'whole' }]).lines;
  const deep = face[face.length - 1].top + face[face.length - 1].h;
  assert.ok(deep <= 2 * LINE_H && deep > LINE_H, `the owner-grant face takes ${deep} em: more than one full line, within two`);
  assert.deepEqual([gapHolds(p, 2 * MEASURE_CPL, MEASURE_CPL), gapHolds(p, MEASURE_CPL + 65, MEASURE_CPL)], ['face', 'head'], 'two full lines hold it; one and a remainder do not');
  assert.equal(gapHolds(p, 3 * 30, 30), 'head', 'at a measure of thirty, where its head and its arm each take more lines, three full lines hold its head alone');
  const html = withheldBlockHTML(runOf(WIDE), doc(), view());
  assert.ok(!html.includes('class="clause"') && !html.includes(t('C-67.pointer')), 'no clause its origin\'s edition claims decide: nothing renders in its place');
});

test('the entitlement arm is one rule, by the reader, and the gap holding the face carries what it answers', () => {
  const ownerGrant = { id: 'C-36.owner-grant.arm', text: t('C-36.owner-grant.arm') };
  assert.deepEqual(entitlementArm(SIGNED, '1.0.2'), ownerGrant, 'a signed-in principal with no grant: the owner-grant default');
  assert.deepEqual(entitlementArm(BARE, '1.0.2'), ownerGrant, 'whatever key signed the session, or none');
  assert.deepEqual(entitlementArm(KEYED, '1.0.2'), { id: 'C-36.guest.key', text: t('C-36.guest.key') }, 'a guest whose device holds a key for this board: C-36\'s key-present default — sign in, then ask');
  assert.deepEqual(entitlementArm(KEYLESS, '1.0.2'), { id: 'R56.key-absent', text: t('R56.key-absent', { owner: '1.0.2' }) }, 'a guest with no key: R56\'s key-absent default, naming the owner');
  for (const reader of [SIGNED, BARE, KEYED, KEYLESS]) {
    const html = withheldBlockHTML(runOf(WIDE), doc(), view({ reader }));
    assert.ok(html.includes(`<span class="arm">${esc(entitlementArm(reader, '1.0.1').text)}</span>`), `the gap's arm is the rule's for ${JSON.stringify(reader)}`);
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
const quoting = (/** @type {string} */ claimant) => ({ id: 'C-67.quoting', text: t('C-67.quoting', { claimant }) });
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
  const clauseIn = (/** @type {import('./article.js').ArticleView} */ v) => (/<span class="arm">[^<]*<\/span><span class="clause"([^>]*)>([^<]*)<\/span><\/span>$/.exec(withheldBlockHTML(run, doc(), v)) || []).slice(1);
  assert.deepEqual(clauseIn(view({ clauseOf: passes })), [` data-claim="${own}" data-home="1.0.1.0.9" role="button" tabindex="-1"`, esc(t('C-67.pointer'))], 'on the plane: a button carrying the owner\'s claim and its home, the edition');
  assert.deepEqual(clauseIn(view({ clauseOf: passes, scene: true })), ['', esc(t('C-67.pointer'))], 'in a pane: a line, nothing in a pane acting on a mark (SC)');
  for (const scene of [false, true]) assert.deepEqual(clauseIn(view({ clauseOf: quotes, scene })), ['', esc(t('C-67.quoting', { claimant: OWNER }))], `${scene ? 'in a pane' : 'on the plane'}: the QUOTING sibling follows nothing`);
  for (const scene of [false, true]) assert.deepEqual(clauseIn(view({ clauseOf: () => editionClause(ORIGIN, OWNER, 'unread'), scene })), ['', esc(t('L.clause.unread'))], `${scene ? 'in a pane' : 'on the plane'}: "edition claims not read" follows nothing`);
});

test('the placeholder\'s clause is the one its origin\'s claims decide; where they decide none, the arm\'s own copy stands alone', () => {
  const run = runOf(WIDE);
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
  assert.ok(Math.abs(own(style1, '--edge-in') * size(MEASURE.h2) - 0.5) < 1e-9 && Math.abs(own(style2, '--edge-in') * size(1) - 0.5) < 1e-9, 'EDGE_GAP past the text, in the body\'s em, at a heading\'s size and the body\'s');
  assert.ok(Math.abs(own(style2, 'line-height') * size(1) - LINE_H) < 1e-9 && Math.abs(own(style1, 'line-height') * size(MEASURE.h2) - MEASURE.h2 * LINE_H) < 1e-9, 'its first line as tall as its block\'s first line');
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
  assert.ok(counted.includes(esc(t('F.whole-links', { n: 4 }))) && withheld.includes(esc(t('F.corner.withheld', { owner: '1.0.1' }))) && !withheld.includes('glyph'), 'the whole-document count and a withheld document\'s state keep their words');
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
      if (g.head != null) assert.equal(g.head, esc(t('B1.withheld-run', { owner: r.owner, account: r.owner, width: r.width, origin: r.origin })), `${what}: its head names ${r.owner}`);
      if (g.arm != null) assert.equal(g.arm, esc(entitlementArm(reader, r.owner).text), `${what}: its arm the one for ${r.owner}`);
      assert.ok(g.holds === 'face' ? g.mark === null && g.arm != null : g.mark?.text === esc(t('L.withheld.mark', { owner: r.owner })), `${what}: the face in its gap, else its edge's mark naming ${r.owner}`);
    }
    assert.equal((gapAt(html, 11) || {}).holds, 'face', 'twelve full lines hold every reader\'s face');
  }
});

// ---- the item rule and the copy's plain text (issue #161) ---------------------------------------------------------

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
