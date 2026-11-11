// T-ARTICLE's test: the article made from a record — a withheld run's gap as
// tall as its bars, no face in it: its ends' symbol and its origin's key
// where its first line holds the key as measured in the identifier's face,
// never counted, a control on the plane and a line in a pane, its ground
// alone while its clause is read, and no sign of it in the article's edge;
// the one rule of the signs the edges stand for the runs in view, withheld
// and transcluded — each origin's statement once, kept beside its run by the
// run's identity, a key no gap holds, a count — and the statements
// themselves, headed by the key: a withheld origin's keeping the pointer
// alone of the clause and the kept clause, a transcluded origin's its
// gesture to its source and C-33's words where its holder says its run
// carries them; the one list of an article's runs, and the one rule for the
// sources a span's words lead to; an item
// not rendered — one of a kind the page does not know among them, as a
// delivery hands it — a gap of its positions, its words in it or in the
// edge; every address the article sets in the identifier's face, a record's
// keys at the run's size; the entitlement arm by the reader; C-67's clause
// decided over the origin's whole admitted-claim set, undecided while a read
// it is decided from is out; links marked at their spans in the one mark
// they merge into; the selection's and the focus's marks by the one rule; a
// transcluded run one run across the typed lines its own newlines break, its
// ground on every stretch and on each empty line between its characters,
// named on the typed line that line follows and setting no line, a hairline
// at each of its two ends and no word of it in a line; each symbol at its
// span, after its last word, titled with
// what its far end holds; each mark carrying the ends it draws; a typed
// line's others' count in the column's edge, setting no line; a document's
// state said once, at
// its corner, the head stating none in any state, a refused document's among
// them; every corner's first slot its document's kind, one width whatever it
// shows, an empty box while it is being read and none at a refused document,
// the item the mirror leads with, an edition's version statement after it and
// its state — its venue's clause and R20's teaching — after that, whole and
// compact, on a notebook and a realm board, in the corner and in the mirror's
// words alike; the corner's items, whole and compact, one by one with their words,
// their widths and whether they yield to a head's narrow row, outside the
// article, a pane's with its read act and its lacking line, the plane's with
// the read an arrival offers as a control, a kept clause after them on a line
// of its own, neither the latest version nor the chain's count while the
// board lags, its state one rule the words the ARIA mirror voices are made
// by; the record rule; a typed line set as typed in the body's type, a
// heading's marks its own characters, on its indent where it opens a typed
// line, the empty lines typed after it whole line boxes below it and no other
// room between blocks; the plan the bars are laid out from, the same blocks
// as the HTML; the scene-mode variant with no offer and no control; each
// withheld run carrying its own origin's key and owner; the item rule and the
// copy's plain text with its stand-ins; the ends drawn at a withheld run as
// one symbol with its count, the plan unmoved; a symbol lit where every link
// it stands for is lit; and the byline's slots, never a placeholder, each box
// its face's width, cut on a word's end by its width as set and whole on
// their act; and the first-line rule, the client's words in a first line's
// place bracketed (FP-12, FP-21, FP-22, FP-23, FP-24, FP-26, FP-30, FP-31,
// FP-33, FP-34, FP-38).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { articleHTML, articlePlan, withheldBlockHTML, entitlementArm, editionClause, placeholderOf, gapHolds, edgeSignsFor, edgeStatementHTML, edgeKeyHTML, sourceStatementHTML, originRunsOf, textIn, sourcesIn, cornerHTML, cornerItems, cornerLead, cornerWords, keptHTML, keptStatement, statementHTML, blockMarks, symbolLit, itemOf, recordContents, copyText, cutTo, firstLineOf, LABEL_CH, CUE_CH, CLAUSE_READING } from './article.js';
import { MEASURE, MEASURE_CPL, LINE_H, CHAR_W, layoutOf } from '../plane/layout.js';
import { HUE, NEUTRAL_HUE, VISITED_ALPHA } from '../plane/register.js';
import { mergedMark } from '../links/links.js';
import { t, tHTML, bracketed, CLIENT_CLOSE } from '../strings.js';
import { esc, byteLength } from '../util.js';
import { accountOf, homeOf, resolveSpan } from '../model/address.js';
import { deriveBlocks, textOf } from '../model/records.js';
import { decodeDelivery } from '../model/frames.js';

/** @typedef {import('../model/records.js').Reader} Reader */
/** the readers the arm is decided for: signed in, with a key bound at this board and with none; a guest with a key here; a guest with none */
const SIGNED = /** @type {Reader} */ ({ account: '1.0.1', keyPresent: true }), BARE = /** @type {Reader} */ ({ account: '1.0.1', keyPresent: false });
const KEYED = /** @type {Reader} */ ({ account: null, keyPresent: true }), KEYLESS = /** @type {Reader} */ ({ account: null, keyPresent: false });

/** the byline's facts of 1.0.1, the owner of the documents the tests read, as the page holds them read */
const OWN_FACTS = /** @type {import('../model/records.js').AccountFacts} */ ({ label: 'dev-notebook', fingerprint: 'e4272902a11439e5' + '0'.repeat(48) });

/** a measure of every character one advance of the reading face, whatever its face: T-LAYER's where the platform sets no words */
const advances = (/** @type {string} */ s) => [...s].length * CHAR_W;
/** @returns {import('./article.js').ArticleView} a view of a published document, as the tests' `doc` is by default, save where `o` says otherwise */
const view = (/** @type {Partial<import('./article.js').ArticleView>} */ o = {}) => ({
  selected: null, focus: null, marks: [], mergedMark, symbols: [], says: () => '', countAt: () => ({ n: 0, social: false }), wholeLinks: 0,
  reader: SIGNED, localTrust: true, notebook: true, kind: 'published', scene: false, originOwner: (a) => accountOf(a) || '', clauseOf: () => null,
  keyOf: (a) => (a === '1.0.1' ? OWN_FACTS : undefined), measure: advances, ...o,
});
/** a view of a draft (`view`) */
const draftView = (/** @type {Partial<import('./article.js').ArticleView>} */ o = {}) => view({ kind: 'draft', ...o });
/** an edition's state on a notebook as its corner sets it after its kind and its version statement: its venue's clause, then the state's own words (`L.corner.venue`) */
const venued = (/** @type {string} */ id, /** @type {Record<string, string | number>} */ vals = {}) => t('L.corner.venue', { venue: t('F.published.notebook'), state: t(id, vals) });
/** the kind slot's width, in em: the widest of the words it shows, at the advance */
const KIND_EM = Math.max(...['F.kind.draft', 'F.published', 'L.slot.unread'].map((id) => advances(t(id))));
/** the kind slot as the corner sets it, showing a kind's words */
const kindSlot = (/** @type {'draft' | 'published' | 'unread'} */ kind) => {
  const id = kind === 'draft' ? 'F.kind.draft' : kind === 'published' ? 'F.published' : 'L.slot.unread';
  return `<span class="kind" data-kind="${kind}" data-string="${id}" style="width:${KIND_EM}em">${esc(t(id))}</span>`;
};
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
/**
 * A withheld run's gap as the HTML sets it, read apart from the page's code: its attributes, its height in the body's
 * em and its last line's width, its ends' symbol, its key — its words and whether it is a control — and whether any
 * other sign stands in it or in its column's edge
 * @param {string} html
 * @param {number} [pos]
 */
const gapAt = (html, pos = 1) => {
  const m = new RegExp(`<span class="withheld" data-pos="${pos}"([^>]*)>(.*?)</span>(?=<span class="withheld"|<p|<h|</div>|$)`).exec(html);
  if (!m) return null;
  const at = (/** @type {string} */ k) => (new RegExp(` ${k}="([^"]*)"`).exec(m[1]) || [])[1] ?? null;
  const key = /^(?:<span class="sym at-run [^"]*"[^>]*>[^<]*<\/span>)?<span class="wh-key id" data-key="([^"]*)"([^>]*)>([^<]*)<\/span>$/.exec(m[2]);
  const style = at('style') || '';
  return {
    owner: at('data-owner'), origin: at('data-origin'), holds: at('data-holds'), width: Number(at('data-width')), height: Number((/height:([\d.]+)em/.exec(style) || [])[1]), last: Number((/--wh-last:(\d+)/.exec(style) || [])[1]),
    key: key ? { origin: key[1], text: key[3], control: key[2].includes('role="button"') && key[2].includes('tabindex="-1"') } : null,
    other: /class="(?:edge|wh-mark|wh-head|arm|clause|others|wh-kept)\b/.test(m[2]),
  };
};

test('a withheld run is a gap as tall as its bars — its last line its remainder — never its text and no face: its origin\'s key, the origin\'s address in the identifier\'s face, in its first line where that holds it, else nothing, and no sign of it in the gap or the article\'s edge, whatever the reader\'s arm (issue #288\'s design decision: "withheldBlockHTML sets no face in any gap. Every run shows its gap and its key"; issue #151)', () => {
  const owner = '1.0.1', origin = '1.0.1.0.1003';
  for (const reader of [SIGNED, KEYED, KEYLESS]) {
    const wide = /** @type {NonNullable<ReturnType<typeof gapAt>>} */ (gapAt(withheldBlockHTML(runOf(WIDE), view({ reader }))));
    assert.deepEqual({ ...wide, height: Math.round(wide.height / LINE_H * 1e9) / 1e9 }, { owner, origin, holds: 'key', width: WIDE, height: 12, last: MEASURE_CPL, key: { origin, text: origin, control: true }, other: false }, `${JSON.stringify(reader)}, twelve full lines: its key alone, a control, no face`);
  }
  const run = /** @type {NonNullable<ReturnType<typeof gapAt>>} */ (gapAt(withheldBlockHTML(runOf(240), view({ reader: KEYLESS }))));
  assert.deepEqual([run.holds, run.key?.text, run.other, run.last], ['key', origin, false, 240 - 3 * MEASURE_CPL], '240 positions: its key, nothing else');
  assert.ok(Math.abs(run.height - 4 * LINE_H) < 1e-9, `as tall as its four bars: ${run.height} em`);
  // twelve positions hold the twelve characters of the key at the advance; eleven do not, and the gap holds its ground alone
  const twelve = /** @type {NonNullable<ReturnType<typeof gapAt>>} */ (gapAt(withheldBlockHTML(runOf(12), view())));
  const eleven = /** @type {NonNullable<ReturnType<typeof gapAt>>} */ (gapAt(withheldBlockHTML(runOf(11), view())));
  assert.deepEqual([twelve.holds, twelve.key?.text], ['key', origin], 'twelve positions: the key');
  assert.deepEqual([eleven.holds, eleven.key, eleven.other], ['edge', null, false], 'eleven: nothing in the gap, its key standing in the column\'s edge on the screen-sized layer (T-LAYER)');
  // in a reading scene's pane, where nothing is acted on, the key is a line
  assert.equal((gapAt(withheldBlockHTML(runOf(WIDE), view({ scene: true }))) || { key: null }).key?.control, false, 'in a pane the key is a line');
  const html = withheldBlockHTML(runOf(WIDE), view({ clauseOf: () => ({ id: 'C-67.pointer', text: t('C-67.pointer'), claim: 'c', home: 'h' }) }));
  assert.ok(!html.includes('class="clause"') && !html.includes(t('C-67.pointer')) && !html.includes(t('C-36.owner-grant.arm')), 'no clause and no arm in the gap, whatever the claims decide');
});

test('what a gap holds is read from its key as the platform sets it in the identifier\'s face, never counted: twelve positions hold "1.0.1.0.1003" at the advance and not in a face that sets it wider (issue #16)', () => {
  const p = placeholderOf(runOf(12), SIGNED, (a) => accountOf(a) || '', () => null), ident = (/** @type {string} */ x, /** @type {import('../plane/register.js').Face} */ f) => [...x].length * CHAR_W * (f === 'ident' ? 1.44 : 1);
  assert.deepEqual([gapHolds(p, 12, MEASURE_CPL, advances), gapHolds(p, 12, MEASURE_CPL, ident)], ['key', 'edge'], 'at the advance the key; set wider, the edge');
  assert.deepEqual([gapHolds(p, 240, 10, advances), gapHolds(p, 240, 12, advances)], ['edge', 'key'], 'the gap\'s first line read at the measure: ten characters a line hold no twelve-character key, twelve do');
});

test('the signs the columns\' edges stand for the withheld runs in view are one rule: each origin\'s statement once, beside the run it stood beside while that run is in view, held by its identity and never its position, else beside the origin\'s first run in view; a key too wide for its gap where the statement stands beside another run; an others\' count; nothing for a run whose clause is not decided (issue #288\'s design decision: "It sits beside that origin\'s first run in view in reading order and moves only when that run leaves"; FP-38)', () => {
  const O = '1.0.1.0.1003', P = '1.0.2.0.7', none = { n: 0, social: false };
  /** a withheld run in view: the run, its identity, what its gap holds, its count */
  const run = (/** @type {number} */ pos, origin = O, /** @type {import('./article.js').GapHolds} */ holds = 'key', count = none) => ({ run: { pos, width: 20, origin, withheld: true }, id: `${origin} ${origin}.0.1.${pos}`, holds, count });
  const a = run(1), b = run(100, O, 'edge', { n: 3, social: false }), c = run(200, P), reading = run(300, '1.0.3.0.1', 'reading');
  const signs = (/** @type {ReturnType<typeof edgeSignsFor>} */ r) => r.signs.map((x) => [x.kind, x.run.run.pos]);
  const first = edgeSignsFor([a, b, c, reading], new Map());
  assert.deepEqual(signs(first), [['statement', 1], ['key', 100], ['count', 100], ['statement', 200]], 'each origin\'s statement at its first run in view; the second run of O its key, which its gap does not hold, and its count; nothing for the run whose clause is read');
  assert.deepEqual([...first.beside], [[O, a.id], [P, c.id]], 'the run each statement stands beside, by identity');
  // a pan: the first run of O left the view, the statement moves to the run now first; then O's first run comes back into view
  const moved = edgeSignsFor([b, c], first.beside);
  assert.deepEqual(signs(moved), [['statement', 100], ['count', 100], ['statement', 200]], 'its run left: beside the next, which no longer needs its key in the edge');
  assert.deepEqual(signs(edgeSignsFor([a, b, c], moved.beside)), [['statement', 100], ['count', 100], ['statement', 200]], 'a run earlier in reading order coming back into view moves no statement — it stands beside the run it stood beside while that run is in view — and that run\'s gap holds its key');
  assert.deepEqual(signs(edgeSignsFor([run(1, O, 'edge'), b, c], moved.beside)), [['statement', 100], ['key', 1], ['count', 100], ['statement', 200]], 'one whose gap does not hold its key: its key in the edge');
  // the same run at another position — words typed above it moved it — is the same run
  assert.deepEqual(signs(edgeSignsFor([{ ...b, run: { ...b.run, pos: 140 } }, run(160)], moved.beside)), [['statement', 140], ['count', 140]], 'held by its identity, never its position: the run words typed above it moved keeps the statement, a run of O first at the old place takes none');
});

test('a transcluded run the reader reads takes the same one rule: its origin stated once beside its first run in view and held there by its identity, every other run of it in view its key alone — no gap holds one — and no count, its typed lines carrying their own; beside a withheld origin\'s, each origin its own statement (issue #304\'s design decision: "Each origin, once per document in view")', () => {
  const X = '1.0.1.0.1003', W = '1.0.2.0.7', none = { n: 0, social: false };
  /** a transcluded run in view, its key in the edge */
  const taken = (/** @type {number} */ pos) => ({ run: { pos, width: 30, origin: X, withheld: false }, id: `${X} ${X}.0.1.${pos}`, holds: /** @type {const} */ ('edge'), count: none });
  const gap = { run: { pos: 400, width: 20, origin: W, withheld: true }, id: `${W} ${W}.0.1.1`, holds: /** @type {const} */ ('key'), count: { n: 2, social: false } };
  const one = taken(10), two = taken(200), three = taken(600);
  const signs = (/** @type {ReturnType<typeof edgeSignsFor>} */ r) => r.signs.map((x) => [x.kind, x.run.run.pos, x.run.run.origin]);
  const first = edgeSignsFor([one, two, gap, three], new Map());
  assert.deepEqual(signs(first), [['statement', 10, X], ['key', 200, X], ['key', 600, X], ['statement', 400, W], ['count', 400, W]], 'X stated once at its first run, its other two runs their keys; W\'s statement and its count');
  const scrolled = edgeSignsFor([two, three], first.beside);
  assert.deepEqual(signs(scrolled), [['statement', 200, X], ['key', 600, X]], 'its first run gone: the statement beside the next, which needs no key of its own');
  assert.deepEqual(signs(edgeSignsFor([one, two, three], scrolled.beside)), [['statement', 200, X], ['key', 10, X], ['key', 600, X]], 'the run coming back stands its key: the statement moves only when the run it stands beside leaves');
});

test('a withheld origin\'s statement in its column\'s edge is its face compact, headed by its key: the origin\'s address with the mark that opens the whole wording, C-67\'s pointer where an admitted claim\'s edition holds bytes the reader can reach — a control on the plane, a line in a pane — never the QUOTING sibling or the unread place, the kept clause while the claims stand held, and nothing while the clause is not decided (issue #288\'s design decision: "In the edge it is always compact, keeps an admitted edition claim\'s pointer")', () => {
  const run = runOf(240), mark = `<span class="wh-mark" role="button" tabindex="-1">${tHTML('L.withheld.mark', { origin: ORIGIN }, { origin: 'id' })}</span>`;
  const at = (/** @type {import('./article.js').Decided} */ clause) => placeholderOf(run, KEYLESS, (a) => accountOf(a) || '', () => clause);
  const pointer = { id: /** @type {const} */ ('C-67.pointer'), text: t('C-67.pointer'), claim: '1.0.1.0.9.0.2.1', home: '1.0.1.0.9' };
  assert.equal(edgeStatementHTML(at(null), null, false), mark, 'no claim: the key and its mark alone');
  assert.equal(edgeStatementHTML(at(pointer), null, false), mark + `<span class="clause" data-claim="${pointer.claim}" data-home="${pointer.home}" role="button" tabindex="-1">${esc(t('C-67.pointer'))}</span>`, 'the pointer a control carrying its claim and its home');
  assert.equal(edgeStatementHTML(at(pointer), null, true), `<span class="wh-mark">${tHTML('L.withheld.mark', { origin: ORIGIN }, { origin: 'id' })}</span><span class="clause">${esc(t('C-67.pointer'))}</span>`, 'in a pane the mark and the pointer lines');
  assert.equal(edgeStatementHTML(at({ id: 'C-67.quoting', text: t('C-67.quoting', { claimant: OWNER }), claimant: OWNER }), null, false), mark, 'the QUOTING sibling is the card\'s alone');
  assert.equal(edgeStatementHTML(at({ id: 'L.clause.unread', text: t('L.clause.unread') }), null, false), mark, 'so is the unread place');
  const kept = { id: 'L.kept.links', text: t('L.kept.links', { when: '09:05' }) };
  assert.equal(edgeStatementHTML(at(null), kept, false), mark + keptHTML(kept), 'the kept clause after it while the claims stand held');
  assert.equal(edgeStatementHTML(at(CLAUSE_READING), kept, false), '', 'nothing while the clause is not decided');
  assert.ok(t('L.withheld.mark', { origin: ORIGIN }).startsWith(ORIGIN) && !t('L.withheld.mark', { origin: ORIGIN }).includes(OWNER + ' '), 'headed by the key, never the owner');
});

test('a kept clause stands as the corner\'s last item, its own words whole, the same in either form; none where nothing is kept (issue #345)', () => {
  const k = { id: 'L.kept.text', text: t('L.kept.text', { when: '09:05' }) };
  assert.equal(keptHTML(k), `<span class="kept" data-string="L.kept.text">${esc('as last read 09:05')}</span>`);
  assert.equal(keptHTML({ id: 'L.kept.links', text: '<b>' }), '<span class="kept" data-string="L.kept.links">&lt;b&gt;</span>', 'escaped');
  assert.equal(keptHTML(null), '');
});

test('the entitlement arm is one rule, by the reader, and the placeholder every surface of a withheld run reads carries what it answers for the owner of the run\'s origin', () => {
  const ownerGrant = { id: 'C-36.owner-grant.arm', text: t('C-36.owner-grant.arm') };
  assert.deepEqual(entitlementArm(SIGNED, '1.0.2'), ownerGrant, 'a signed-in principal with no grant: the owner-grant default');
  assert.deepEqual(entitlementArm(BARE, '1.0.2'), ownerGrant, 'whatever key signed the session, or none');
  assert.deepEqual(entitlementArm(KEYED, '1.0.2'), { id: 'C-36.guest.key', text: t('C-36.guest.key') }, 'a guest whose device holds a key for this board: C-36\'s key-present default — sign in, then ask');
  assert.deepEqual(entitlementArm(KEYLESS, '1.0.2'), { id: 'R56.key-absent', text: t('R56.key-absent', { owner: '1.0.2' }) }, 'a guest with no key: R56\'s key-absent default, naming the owner');
  for (const reader of [SIGNED, BARE, KEYED, KEYLESS]) {
    const p = placeholderOf(runOf(WIDE), reader, (a) => accountOf(a) || '', () => null);
    assert.deepEqual([p.origin, p.owner, p.arm], ['1.0.1.0.1003', '1.0.1', entitlementArm(reader, '1.0.1')], `the placeholder's arm is the rule's for ${JSON.stringify(reader)} and the run's origin's owner`);
  }
  const keyed = placeholderOf(runOf(WIDE), KEYED, (a) => accountOf(a) || '', () => null);
  assert.ok(keyed.arm.text === t('C-36.guest.key') && !keyed.arm.text.includes('no key on this device'), 'a guest whose device holds a key for this board meets C-36\'s key-present arm, and is never told it holds none');
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

test('C-67\'s clause is the empty place where the origin carries no edition claim, or where the board refused the lookup as withheld from the reader; undecided while the lookup has not answered; "edition claims not read" where the lookup failed any other way (RES-85; issue #186\'s design decision: "If the board refuses the read for documents withheld from the reader, no face carries the clause. Otherwise, a face whose read failed says \'edition claims not read\'"; issue #272\'s: "Its words appear only when all their reads answer")', () => {
  assert.equal(editionClause(ORIGIN, OWNER, []), null, 'no claim on the origin: nothing in the clause\'s place');
  assert.equal(editionClause(ORIGIN, OWNER, null), CLAUSE_READING, 'the lookup not answered: not decided, so no face stands with a part missing');
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

test('a claim whose link or whose home the page has not read leaves the clause undecided, an admitted claim known to pass beside it among them: the pointer never follows one claim only to follow another as the rest answer (issue #272\'s design decision: "Its words appear only when all their reads answer")', () => {
  const linkless = claim('1.0.1.0.9.0.2.1', { link: null }), homeless = claim('1.0.1.0.10.0.2.1', { published: null });
  assert.equal(editionClause(ORIGIN, OWNER, [linkless]), CLAUSE_READING, 'its link not read yet');
  assert.equal(editionClause(ORIGIN, OWNER, [homeless]), CLAUSE_READING, 'its home not read yet');
  assert.equal(editionClause(ORIGIN, OWNER, [claim('1.0.1.0.11.0.2.1', { from: [] }), linkless]), CLAUSE_READING, 'a quoting claim beside one not read yet: never QUOTING on reads not made');
  assert.equal(editionClause(ORIGIN, OWNER, [linkless, homeless, claim('1.0.1.0.12.0.2.1')]), CLAUSE_READING, 'an admitted claim known to pass beside two not read yet: undecided, for the owner\'s lower-addressed claim may be among them');
  assert.deepEqual(editionClause(ORIGIN, OWNER, [claim('1.0.1.0.12.0.2.1')]), pointer('1.0.1.0.12.0.2.1'), 'every read answered: the pointer');
});

test('a claim whose admission waits on a read that failed — its link\'s, or its home\'s metadata — leaves "edition claims not read" where no admitted claim known passes and none waits on a read still out; never QUOTING, nor a blank, over it (issue #186\'s design decision: "A blank there would read as \'no claim\'")', () => {
  const linkFailed = claim('1.0.1.0.9.0.2.1', { link: null, failed: true }), homeFailed = claim('1.0.1.0.10.0.2.1', { published: null, failed: true });
  assert.deepEqual(editionClause(ORIGIN, OWNER, [linkFailed]), unread(), 'its link\'s read failed');
  assert.deepEqual(editionClause(ORIGIN, OWNER, [homeFailed]), unread(), 'its home\'s metadata read failed');
  assert.deepEqual(editionClause(ORIGIN, OWNER, [claim('1.0.1.0.11.0.2.1', { from: [] }), linkFailed]), unread(), 'beside a claim that quotes: never QUOTING on a read that failed');
  assert.deepEqual(editionClause(ORIGIN, OWNER, [claim('1.0.2.0.5.0.2.1'), homeFailed]), unread(), 'beside a claim admitted nowhere');
  assert.equal(editionClause(ORIGIN, OWNER, [linkFailed, claim('1.0.1.0.12.0.2.1', { link: null })]), CLAUSE_READING, 'beside a claim whose read is still out: undecided until it answers');
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

test('the pointer the origin\'s claims decide stands in its statement — on the plane a control carrying the claim it follows and that claim\'s home, in a pane a line — the QUOTING sibling and the unread place in it nowhere (issue #288\'s design decision: "keeps an admitted edition claim\'s pointer")', () => {
  const run = runOf(WIDE), own = '1.0.1.0.9.0.2.1';
  const passes = editionClause(ORIGIN, OWNER, [claim('1.0.1.1.0.4.0.2.1'), claim(own)]), quotes = editionClause(ORIGIN, OWNER, [claim(own, { from: [] })]);
  /** the statement's pointer, as T-ARTICLE sets it: its attributes and its words; none where it holds none */
  const pointerIn = (/** @type {import('./article.js').Decided} */ c, /** @type {boolean} */ scene) => (new RegExp(`<span class="clause"([^>]*)>${INNER}</span>`).exec(edgeStatementHTML(placeholderOf(run, SIGNED, (a) => accountOf(a) || '', () => c), null, scene)) || []).slice(1);
  assert.deepEqual(pointerIn(passes, false), [` data-claim="${own}" data-home="1.0.1.0.9" role="button" tabindex="-1"`, esc(t('C-67.pointer'))], 'on the plane: a button carrying the owner\'s claim and its home, the edition');
  assert.deepEqual(pointerIn(passes, true), ['', esc(t('C-67.pointer'))], 'in a pane: a line, nothing in a pane acting on a mark (SC)');
  for (const scene of [false, true]) assert.deepEqual([pointerIn(quotes, scene), pointerIn(editionClause(ORIGIN, OWNER, 'unread'), scene)], [[], []], `${scene ? 'in a pane' : 'on the plane'}: the QUOTING sibling and "edition claims not read" stand in the card alone`);
});

test('the placeholder\'s clause is the one its origin\'s claims decide, read by the statement and the card alike', () => {
  const run = runOf(WIDE);
  /** @type {Record<string, import('./article.js').ClaimSeen[]>} */
  const held = { [ORIGIN]: [claim('1.0.1.0.11.0.2.1', { from: [] })] };
  const clauseOf = (/** @type {string} */ o) => editionClause(o, OWNER, held[o] ?? null);
  assert.deepEqual(placeholderOf(run, SIGNED, (a) => accountOf(a) || '', clauseOf).clause, quoting(OWNER));
  held[ORIGIN] = [];
  assert.equal(placeholderOf(run, SIGNED, (a) => accountOf(a) || '', clauseOf).clause, null, 'no claim: nothing in the clause\'s place');
  delete held[ORIGIN];
  assert.equal(placeholderOf(run, SIGNED, (a) => accountOf(a) || '', clauseOf).clause, CLAUSE_READING, 'its lookup not answered: not decided');
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

/** a typed text's blocks as the model derives them from one delivered run */
const typedBlocks = (/** @type {string} */ text) => deriveBlocks([{ pos: 1, width: byteLength(text), kind: 'content', text, ref: null, origin: null }]);
/** each transcluded stretch of an article as `[its classes past "seg", its origin, its text]`, in the text's order */
const sameIn = (/** @type {string} */ html) => [...html.matchAll(/<span class="seg ([^"]*same[^"]*)"[^>]*data-origin="([^"]*)">([^<]*)<\/span>/g)].map((m) => [m[1], m[2], m[3]]);

test('a transcluded run is one run across the typed lines its own newlines break: its ground under every stretch of it, a hairline at its start and one at its end alone, and no word of it in any line — no label, no C-33 — so the plan holds the document\'s own characters alone (issue #304\'s design decision: "segmentsOf joins the run: hairlines at its two ends, texture on every line")', () => {
  const X = '1.0.1.0.1003';
  // "beta⏎", "gamma delta⏎" and "epsilon " are X's: both newlines its own, one run of three typed lines
  const d = doc({ blocks: typedBlocks('alpha beta\ngamma delta\nepsilon zeta'), origins: [{ pos: 7, width: 25, doc: X }] });
  const html = articleHTML(d, view({ reader: KEYLESS }), '1.0.1');
  assert.deepEqual(sameIn(html), [['same opens', X, 'beta'], ['same', X, 'gamma delta'], ['same closes', X, 'epsilon ']], `its ground on every line, its hairlines at its two ends: ${html}`);
  assert.ok(!html.includes('hairline') && !html.includes('pubmark') && !html.includes(t('C-33')) && !html.includes(t('L.origin-mark')), 'no label and no C-33 set in any line');
  assert.deepEqual(articlePlan(d, view(), '1.0.1').filter((r) => r.pos != null).map((r) => r.pieces.map((p) => [p.text, p.own])), [[['alpha ', true], ['beta', true]], [['gamma delta', true]], [['epsilon ', true], ['zeta', true]]], 'every piece the document\'s own characters: the hairlines take no room');
  for (const scene of [false, true]) assert.deepEqual(sameIn(articleHTML(d, view({ scene }), '1.0.1')).map(([c]) => c), ['same opens', 'same', 'same closes'], `${scene ? 'in a pane' : 'on the plane'}: the same one run`);
});

test('a newline of the document\'s own between two runs of one origin ends the first and opens the second, each with its hairlines; two origins meeting stand a hairline either side of where the origin changes (issue #304\'s design decision: "A native break ends it")', () => {
  const X = '1.0.1.0.1003', Y = '1.0.2.0.7';
  const parted = doc({ blocks: typedBlocks('alpha beta\ngamma delta'), origins: [{ pos: 7, width: 4, doc: X }, { pos: 12, width: 5, doc: X }] });
  assert.deepEqual(sameIn(articleHTML(parted, view(), '1.0.1')), [['same opens closes', X, 'beta'], ['same opens closes', X, 'gamma']], 'the document\'s own newline between them: two runs, each opening and closing');
  const meeting = doc({ blocks: typedBlocks('alpha beta gamma'), origins: [{ pos: 1, width: 6, doc: X }, { pos: 7, width: 4, doc: Y }] });
  assert.deepEqual(sameIn(articleHTML(meeting, view(), '1.0.1')), [['same opens closes', X, 'alpha '], ['same opens closes', Y, 'beta']], 'X closing where Y opens');
});

/** each typed line's block of an article as `[its first position, the run its empty lines' ground names]`, in the text's order */
const blankNamed = (/** @type {string} */ html) => [...html.matchAll(/<p class="sp blk-para[^"]*" data-addr="[^"]*" data-pos="(\d+)" data-width="\d+"(?: style="--blank:\d+")?(?: data-blank-origin="([^"]*)")?>/g)].map((m) => [Number(m[1]), m[2] ?? null]);

test('a transcluded run\'s ground stands on the empty lines its own newlines type between its characters: the typed line they follow names the run — a line of characters, or the newlines after an item — on the plane and in a pane; never where the run\'s characters stand on one side of them alone, nor where the block follows positions not held and the run begins at its next character; and no line moves for it (issue #549)', () => {
  const X = '1.0.1.0.1003', Y = '1.0.2.0.7';
  // "beta⏎⏎gamma" is X's and "epsilon" Y's: the empty line after "alpha beta" lies between X's characters, the one after "gamma delta" between X's last and Y's first
  const d = doc({ blocks: typedBlocks('alpha beta\n\ngamma delta\n\nepsilon'), origins: [{ pos: 7, width: 11, doc: X }, { pos: 26, width: 7, doc: Y }] });
  for (const scene of [false, true]) assert.deepEqual(blankNamed(articleHTML(d, view({ scene }), '1.0.1')), [[1, X], [13, null], [26, null]], `${scene ? 'in a pane' : 'on the plane'}: the empty line inside X named on the line it follows; the one after X and before Y named by neither`);
  const ending = doc({ blocks: d.blocks, origins: [{ pos: 7, width: 6, doc: X }] }), opening = doc({ blocks: d.blocks, origins: [{ pos: 12, width: 6, doc: X }] });
  assert.deepEqual([blankNamed(articleHTML(ending, view(), '1.0.1'))[0], blankNamed(articleHTML(opening, view(), '1.0.1'))[0]], [[1, null], [1, null]], 'X ending in the empty line, and X opening in it: its characters on one side of it alone, so no ground there');
  const content = (/** @type {number} */ pos, /** @type {string} */ text) => /** @type {import('../model/frames.js').Run} */ ({ pos, width: byteLength(text), kind: 'content', text, ref: null, origin: null });
  const item = [content(1, 'a\n'), { pos: 3, width: 1, kind: /** @type {const} */ ('atom'), text: '{}', ref: null, origin: null }, content(4, '\n\nb')];
  assert.deepEqual(blankNamed(articleHTML(doc({ runs: item, blocks: deriveBlocks(item), origins: [{ pos: 1, width: 6, doc: X }] }), view(), '1.0.1')), [[1, null], [4, X], [6, null]], 'the newlines after an item inside X: the empty line past the one ending the item\'s line names X');
  // "a" at 1, positions 2–9 not held, then "⏎b": the newline at 10 an empty line, X holding "b" alone
  const apart = [content(1, 'a'), content(10, '\nb')];
  assert.deepEqual(blankNamed(articleHTML(doc({ runs: apart, blocks: deriveBlocks(apart), origins: [{ pos: 11, width: 1, doc: X }] }), view(), '1.0.1')), [[1, null], [10, null], [11, null]], 'the empty line is the block\'s last position, before X begins: named by none');
  const lines = (/** @type {import('../model/records.js').Doc} */ x) => layoutOf(articlePlan(x, view(), '1.0.1')).lines.filter((l) => l.kind !== 'chrome');
  assert.deepEqual(lines(d), lines({ ...d, origins: [] }), 'the same lines as the text with no run, the scene-offers after them apart: the ground sets none');
});

test('the runs of other documents\' material an article states are one list: each withheld run by its block and each transcluded run touching no withheld run, in the text\'s order; the stretch the typed lines\' characters hold of a span, its newlines and items apart', () => {
  const X = '1.0.1.0.1003', W = '1.0.2.0.7';
  const blocks = [...typedBlocks('alpha beta\n'), { pos: 12, width: 20, kind: /** @type {const} */ ('withheld'), text: '', origin: W }, { pos: 32, width: 6, kind: /** @type {const} */ ('para'), text: 'gamma', origin: null }];
  // the image places W's own bytes over its withheld run: that origin is the withheld run's, never a second run
  const runs = originRunsOf({ blocks, origins: [{ pos: 7, width: 5, doc: X }, { pos: 12, width: 20, doc: W }, { pos: 32, width: 3, doc: X }] });
  assert.deepEqual(runs, [{ pos: 7, width: 5, origin: X, withheld: false }, { pos: 12, width: 20, origin: W, withheld: true }, { pos: 32, width: 3, origin: X, withheld: false }]);
  assert.deepEqual([textIn(blocks, { pos: 7, width: 5 }), textIn(blocks, { pos: 11, width: 25 }), textIn(blocks, { pos: 12, width: 20 })], [{ from: 7, to: 11 }, { from: 32, to: 36 }, null], 'its own characters: a newline, a withheld run apart, none in a gap');
});

test('the sources a span\'s words lead to are one rule: each origin among the runs of other documents\' material the span meets, once, in reading order, with the span\'s positions each of its runs holds — a withheld run\'s whole, an item inside a run its own — and none for the document\'s own words and newlines, nor for a transcluded run the span meets at its newlines alone, of which the page draws nothing there (D5 K-51)', () => {
  const X = '1.0.1.0.1003', Y = '1.0.2.0.7';
  // "Second line here." X's, the newline after it the document's own; "third" and "fourth" X's, parted by the document's own newline
  const blocks = typedBlocks('First line.\n\nSecond line here.\nthird\nfourth');
  assert.deepEqual(blocks.map((b) => [b.pos, b.width, b.text]), [[1, 13, 'First line.'], [14, 18, 'Second line here.'], [32, 6, 'third'], [38, 6, 'fourth']]);
  const d = { blocks, origins: [{ pos: 14, width: 17, doc: X }, { pos: 32, width: 5, doc: X }, { pos: 38, width: 6, doc: X }] };
  const of = (/** @type {string} */ origin, /** @type {Array<[number, number]>} */ parts, withheld = false) => ({ origin, withheld, parts: parts.map(([pos, width]) => ({ pos, width })) });
  assert.deepEqual(sourcesIn(d, { pos: 14, width: 18 }), [of(X, [[14, 17]])], 'the line whole: its run\'s positions, its own newline adding none');
  assert.deepEqual(sourcesIn(d, { pos: 21, width: 4 }), [of(X, [[21, 4]])], 'a stretch inside the run');
  assert.deepEqual(sourcesIn(d, { pos: 10, width: 8 }), [of(X, [[14, 4]])], 'reaching the document\'s own words: the run\'s share alone');
  assert.deepEqual(sourcesIn(d, { pos: 14, width: 30 }), [of(X, [[14, 17], [32, 5], [38, 6]])], 'three runs of X the document\'s own newlines part: X once, each run\'s positions a part, none of the newlines');
  assert.deepEqual(sourcesIn({ blocks, origins: [{ pos: 14, width: 17, doc: X }, { pos: 32, width: 12, doc: X }] }, { pos: 32, width: 12 }), [of(X, [[32, 12]])], 'X\'s own newline between them: one run, one part');
  assert.deepEqual(sourcesIn({ blocks, origins: [{ pos: 14, width: 7, doc: Y }, { pos: 21, width: 10, doc: X }, { pos: 32, width: 5, doc: Y }] }, { pos: 18, width: 18 }), [of(Y, [[18, 3], [32, 4]]), of(X, [[21, 10]])], 'two origins: each once, in reading order by the first run of it the span meets');
  assert.deepEqual([sourcesIn(d, { pos: 31, width: 1 }), sourcesIn(d, { pos: 1, width: 13 })], [[], []], 'a newline alone, and the document\'s own line: none');
  // X's run opening at the newline that ends "Second line here.", then "third" and its newline
  const opening = { blocks, origins: [{ pos: 31, width: 7, doc: X }] };
  assert.deepEqual(sourcesIn(opening, { pos: 14, width: 18 }), [], 'the line before the run whole: the run met at its own newline alone, no source');
  assert.deepEqual(sourcesIn(opening, { pos: 14, width: 19 }), [of(X, [[31, 2]])], 'reaching the run\'s first character: its source, its share from its newline on');
  // "beta⏎⏎gamma" X's: the newline at 11 ends "alpha beta", the one at 12 an empty line between X's characters, its ground X's
  const across = { blocks: typedBlocks('alpha beta\n\ngamma delta'), origins: [{ pos: 7, width: 11, doc: X }] };
  assert.deepEqual([sourcesIn(across, { pos: 12, width: 1 }), sourcesIn(across, { pos: 11, width: 1 })], [[of(X, [[12, 1]])], []], 'the empty line between the run\'s characters, which the page grounds as the run\'s: its source; the newline ending a line alone: none');
  const content = (/** @type {number} */ pos, /** @type {string} */ text) => /** @type {import('../model/frames.js').Run} */ ({ pos, width: byteLength(text), kind: 'content', text, ref: null, origin: null });
  const items = deriveBlocks([content(1, 'Before.\n'), { pos: 9, width: 1, kind: 'atom', text: '{}', ref: null, origin: null }, content(10, ' after')]);
  assert.deepEqual(sourcesIn({ blocks: items, origins: [{ pos: 9, width: 7, doc: X }] }, { pos: 9, width: 3 }), [of(X, [[9, 3]])], 'an item inside the run, its position its own');
  const gap = [{ pos: 1, width: 13, kind: /** @type {const} */ ('para'), text: 'First line.', origin: null }, { pos: 14, width: 17, kind: /** @type {const} */ ('withheld'), text: '', origin: X }];
  assert.deepEqual(sourcesIn({ blocks: gap, origins: [{ pos: 14, width: 17, doc: X }] }, { pos: 10, width: 6 }), [of(X, [[14, 17]], true)], 'a run withheld from the reader, whatever the image places over it: withheld, the run whole');
});

test('a transcluded origin\'s statement in its column\'s edge is headed by its key — the origin\'s mark and its address, the run\'s gesture to its source, a control carrying the source on the plane, a line in a pane — then C-33\'s words where its holder says its run carries them; a run\'s key alone is the same key; the scene-offer stays at a windowing document (issue #304; foundations §2.1)', () => {
  const X = '1.0.1.0.1003';
  const key = `<span class="src-key" data-src="${X}" role="button" tabindex="-1">${esc(t('L.origin-mark'))} ${idOf(X)}</span>`;
  const c33 = `<span class="c33" data-string="C-33">${esc(t('C-33'))}</span>`;
  assert.equal(sourceStatementHTML(X, true, false), key + c33, 'on the plane: the key a control, C-33\'s words after it');
  assert.equal(sourceStatementHTML(X, false, false), key, 'no C-33 where the run carries none');
  assert.equal(sourceStatementHTML(X, true, true), `<span class="src-key">${esc(t('L.origin-mark'))} ${idOf(X)}</span>${c33}`, 'in a pane: lines');
  assert.equal(edgeKeyHTML({ pos: 9, width: 4, origin: X, withheld: false }, false), key, 'a run\'s key alone');
  assert.equal(edgeKeyHTML({ pos: 9, width: 4, origin: X, withheld: true }, false), `<span class="wh-key id" role="button" tabindex="-1">${X}</span>`, 'a withheld run\'s key its address alone');
  const html = articleHTML(doc({ blocks: [{ pos: 1, width: 12, kind: 'para', text: 'abcdefghijkl', origin: null }], origins: [{ pos: 5, width: 4, doc: X }] }), view(), '1.0.1');
  assert.ok(html.includes(`this document windows ${idOf(X)}`), 'the scene-offer at a windowing document, its address the identifier\'s');
});

test('the corner: its kind first, then version k of n, then R20\'s teaching keyed by venue — the two items that never yield read first, on a notebook and on a realm board, at the bare address and at a pin, whole and compact; a draft\'s chip C-28 (foundations §3.1; C-346)', () => {
  /** the version statement as the corner sets it, carrying the count it is of */
  const of = (/** @type {number} */ k, /** @type {number} */ n) => `<button type="button" class="version" data-members="${n}" tabindex="-1">${esc(t('F.version-of', { k, n }))}</button>`;
  const c = cornerHTML(doc(), view());
  assert.ok(c.startsWith(kindSlot('published') + of(2, 2) + `<span class="st">${esc(venued('F.corner.latest'))}</span>`), `"published" in its slot, then "version 2 of 2", then the venue's clause and R20's teaching: ${c}`);
  assert.ok(c.includes('moves to each new one'));
  assert.ok(c.includes(t('F.published.notebook')));
  const realm = cornerHTML(doc(), view({ notebook: false }));
  assert.ok(realm.startsWith(kindSlot('published') + of(2, 2) + `<span class="st">${esc(t('F.corner.latest'))}</span>`) && !realm.includes(esc(t('F.published.notebook'))), `a board that is no notebook: "version 2 of 2", then R20's teaching, no venue's clause — ${realm}`);
  const pinned = cornerHTML(doc({ addr: '1.0.1.0.3.1', members: null }), view({ members: 3 }));
  assert.ok(pinned.startsWith(kindSlot('published') + of(1, 3) + `<span class="st">${esc(venued('F.corner.pinned', { k: 1 }))}</span>`), `at a pin: "version 1 of 3", then its own version's state — ${pinned}`);
  const compact = cornerHTML(doc(), view(), true);
  assert.ok(compact.startsWith(kindSlot('published') + of(2, 2) + `<button type="button" class="st glyph" data-whole aria-expanded="false" aria-label="${esc(venued('F.corner.latest'))}" tabindex="-1">${esc(t('L.corner.bare'))}</button>`), `compact: the count where it stands whole, then the state's marker named by its words, the act that opens the corner whole — ${compact}`);
  const draft = cornerHTML(doc({ kind: 'draft', meta: null }), draftView({ localTrust: true }));
  assert.ok(draft.startsWith(kindSlot('draft')), `"draft" in its slot, where an edition's says "published": ${draft}`);
  assert.ok(draft.includes(t('C-28.flag-on')) && !draft.includes(t('C-28') + '<'), 'flag-on never renders "Readable by you alone"');
  const off = cornerHTML(doc({ kind: 'draft', meta: null }), draftView({ localTrust: false }));
  assert.ok(off.includes('Readable by you alone'));
  assert.ok([c, draft, off].every((h) => !h.includes('tabindex="0"')) && (c.match(/<button /g) || []).length === 1 && ![draft, off].some((h) => h.includes('<button')),
    'the version statement the edition\'s one act, a button out of the Tab order as made — its holder stands the corner\'s stops (K-57) — and a draft\'s corner, no kept state set, holding none');
});

test('every corner\'s first slot is its document\'s kind, the one item it leads with, in a box the widest of its words wide whatever it shows: "draft" where an edition\'s says "published", in either form, its words never folded into a head\'s count; an empty box named as being read while no read has told it, the corner saying nothing past it; "not read" where its metadata\'s read failed; a refused document\'s corner its own words alone, no slot (issue #423\'s design decision: "every corner\'s first slot is the kind"; FP-34)', () => {
  const draft = doc({ kind: 'draft', meta: null });
  for (const compact of [false, true]) {
    assert.ok(cornerHTML(doc(), view(), compact).startsWith(kindSlot('published')), `${compact ? 'compact' : 'whole'}: an edition's "published"`);
    assert.ok(cornerHTML(draft, draftView(), compact).startsWith(kindSlot('draft')), `${compact ? 'compact' : 'whole'}: a draft's "draft", never a glyph`);
  }
  const reading = cornerHTML(doc({ kind: 'unknown', meta: null }), view({ kind: 'reading', wholeLinks: 2 }));
  assert.equal(reading, `<span class="kind pending" data-kind="reading" role="img" aria-label="${esc(t('L.slot.reading'))}" style="width:${KIND_EM}em"></span><span class="whole-links">${esc(t('F.whole-links', { n: 2 }))}</span>`, `being read: the empty box, named so, and nothing of its state — ${reading}`);
  const unread = cornerHTML(doc({ kind: 'unknown', meta: null }), view({ kind: 'unread' }));
  assert.equal(unread, kindSlot('unread'), 'its metadata\'s read failed: why it cannot be told, in the slot');
  const slotted = (/** @type {import('./article.js').ArticleView['kind']} */ kind) => cornerItems(doc({ kind: 'unknown', meta: null }), view({ kind }), true)[0];
  assert.deepEqual(['draft', 'published', 'reading', 'unread'].map((k) => { const i = slotted(/** @type {any} */ (k)); return [i.cls, i.em, i.yields]; }), Array(4).fill(['kind', KIND_EM, false]), 'one width whatever it shows, never yielding');
  assert.ok(KIND_EM >= advances(t('F.published')) && KIND_EM >= advances(t('F.kind.draft')) && KIND_EM >= advances(t('L.slot.unread')), 'the widest of its words');
  for (const refused of [doc({ refused: 'withheld', meta: null }), doc({ refused: 'unregistered', meta: null })]) {
    assert.ok(!cornerHTML(refused, view()).includes('class="kind'), `${refused.refused}: no slot — its own words`);
  }
});

test('a draft\'s corner carries its kept state in a slot of fixed width — the longest of the three words\' as the view measures them — the word and its string named on it, a disclosure button saying whether its statement stands open, its words alone where the view asks no act, an empty box of that width hidden from assistive technology while no state is set, before the chip in either form; the word\'s act opens the statement whole on a line of its own, the save chord\'s line at "kept" and "nothing to save —" before the word and its reason at the other two; the corner carries no "past states" act while the strings table holds no reason for an inert one; an edition\'s corner is unchanged (B3-S1, B3-S2; D5 K-57, K-74; FP-34)', () => {
  const draft = doc({ kind: 'draft', meta: null });
  /** @type {Array<[import('../write/write.js').KeptState['word'], string]>} */
  const WORDS = [['kept', 'B3.kept'], ['not yet kept', 'B3.not-yet-kept'], ['not kept', 'B3.not-kept']];
  const em = Math.max(...WORDS.map(([, id]) => advances(t(id))));
  assert.ok(em === advances(t('B3.not-yet-kept')) && em > advances(t('B3.kept')), 'the slot the longest word\'s, wider than the shortest');
  const kind = kindSlot('draft');
  const empty = cornerHTML(draft, draftView());
  assert.ok(empty.startsWith(`${kind}<span class="kept-line"><span class="kept-word pending" aria-hidden="true" style="width:${em}em"></span></span><span class="chip"`), `no state set: after the kind, an empty box of the slot's width before the chip — ${empty}`);
  for (const [word, id] of WORDS) {
    const whole = cornerHTML(draft, draftView({ kept: { word, reason: null } })), compact = cornerHTML(draft, draftView({ kept: { word, reason: null } }), true);
    const slot = `<span class="kept-line"><button type="button" class="kept-word" data-kept="${word}" data-string="${id}" style="width:${em}em" aria-expanded="false" tabindex="-1">${esc(t(id))}</button></span>`;
    assert.ok(whole.startsWith(kind + slot) && whole.indexOf('<span class="chip"') === kind.length + slot.length, `${word}: the kind, the word in its slot, the chip after it — ${whole}`);
    assert.ok(compact.startsWith(kind + slot) && compact.includes('class="chip glyph"'), `${word}: compact, the word keeps its words beside the glyph — ${compact}`);
    assert.ok(!whole.includes('kept-statement') && !compact.includes('kept-statement'), `${word}: the statement closed`);
    const words = cornerHTML(draft, draftView({ kept: { word, reason: null }, acts: false }));
    assert.ok(words.includes(`<span class="kept-line"><span class="kept-word" data-string="${id}" style="width:${em}em">${esc(t(id))}</span></span>`) && !words.includes('<button'), `${word}: its words alone where the view asks no act — ${words}`);
  }
  const kept = cornerHTML(draft, draftView({ kept: { word: 'kept', reason: null }, keptOpen: true }));
  assert.ok(kept.includes(`</span><span class="kept-statement" data-string="B3.save.kept">${esc(t('B3.save.kept'))}</span><span class="chip"`) && kept.includes('aria-expanded="true"'), `kept: the save chord's line whole, on a line of its own after the word, the word saying its statement stands open — ${kept}`);
  const reason = 'the board is not answering';
  const held = cornerHTML(draft, draftView({ kept: { word: 'not yet kept', reason }, keptOpen: true }));
  assert.ok(held.includes(`<span class="kept-statement" data-string="B3.save.before">${esc(`${t('B3.save.before')} ${t('L.kept.failed', { clause: t('B3.not-yet-kept'), reason })}`)}</span>`), `not yet kept: "nothing to save —" before the word, the reason on the act — ${held}`);
  const refused = cornerHTML(draft, draftView({ kept: { word: 'not kept', reason: null }, keptOpen: true }));
  assert.ok(refused.includes(`<span class="kept-statement" data-string="B3.save.before">${esc(`${t('B3.save.before')} ${t('B3.not-kept')}`)}</span>`), 'not kept with no reason: "nothing to save —" before the word alone');
  assert.deepEqual([keptStatement({ word: 'kept', reason: 'ignored' }), keptStatement({ word: 'not kept', reason: 'r' })], [{ id: 'B3.save.kept', text: t('B3.save.kept') }, { id: 'B3.save.before', text: `${t('B3.save.before')} ${t('L.kept.failed', { clause: t('B3.not-kept'), reason: 'r' })}` }], 'the statement by the word: at "kept" its own line whatever reason stands; at the others the word and the reason');
  for (const h of [empty, kept, held, refused]) assert.ok(!h.includes(t('B3.past-states')) && !h.includes('tabindex="0"') && (h.match(/<button /g) || []).length === (h === empty ? 0 : 1), 'no "past states" act: the strings table holds its words and no reason for an inert one; the kept word, where a state is set, the one act, out of the Tab order as made (K-57)');
  assert.ok(!cornerHTML(doc(), view({ kept: { word: 'kept', reason: null }, keptOpen: true })).includes('kept-'), 'an edition\'s corner carries no kept slot, whatever state is handed in');
});

test('the corner\'s items one by one, in their one order: each its markup — the corner\'s, joined — its words and its width as the view measures them, the kind and a kept word their slots\'; the offered read alone yields, the kind, its version statement, the state, the kept word, the chip and the whole-document count never do; a draft\'s statement left out of its slot where its holder opens it beneath a head (issue #436; foundations §3.1; FP-26)', () => {
  const edition = doc(), v = view({ members: 3, read: 4, wholeLinks: 2 });
  const items = cornerItems(edition, v, true);
  assert.equal(items.map((i) => i.html).join(''), cornerHTML(edition, v, true), 'the corner\'s markup, item by item');
  assert.deepEqual(items.map((i) => [i.cls, i.yields]), [['kind', false], ['version', false], ['st', false], ['read', true], ['whole-links', false]], 'the kind, its version statement, the state, the read offered — which alone yields — and the whole-document count');
  assert.deepEqual(items.map((i) => i.em), [KIND_EM, advances(t('F.version-of', { k: 3, n: 3 })), advances(t('L.corner.bare')), advances(t('F.versions.read', { k: 4 })), advances(t('F.whole-links', { n: 2 }))], 'each its words\' width, the kind its slot\'s, the state\'s glyph compact');
  assert.equal(items[0].words, t('F.published'), 'the kind\'s words');
  const draft = doc({ kind: 'draft', meta: null }), kept = draftView({ kept: { word: 'kept', reason: null }, keptOpen: true });
  const d = cornerItems(draft, kept, true, false);
  assert.deepEqual(d.map((i) => [i.cls, i.yields]), [['kind', false], ['kept', false], ['chip', false]], 'a draft: its kind, its kept word, then its chip, none yielding');
  assert.ok(d[1].em === Math.max(...['B3.kept', 'B3.not-yet-kept', 'B3.not-kept'].map((id) => advances(t(id)))) && d[1].words === t('B3.kept'), 'the kept word\'s width its slot\'s, its words the word');
  assert.ok(!d[1].html.includes('kept-statement') && cornerItems(draft, kept, true)[1].html.endsWith(statementHTML({ word: 'kept', reason: null })), 'its statement left out where its holder opens it beneath, else after its slot');
});

test('the corner at a pinned version names it — its own number of the count its box\'s document holds — and offers the versions list there too; its own record holding no count, it takes the box\'s (issue #154)', () => {
  const member = doc({ addr: '1.0.1.0.3.1', members: null });
  const c = cornerHTML(member, view({ members: 3 }));
  assert.ok(c.includes(t('F.version-of', { k: 1, n: 3 })) && c.includes('class="version"'), `version 1 of 3, the list's act: ${c}`);
  assert.ok(c.includes(esc(venued('F.corner.pinned', { k: 1 }))), 'the pinned version\'s state');
  assert.ok(!cornerHTML(member, view()).includes('class="version"'), 'no count handed in, none of its own: no statement');
});

test('a reading scene\'s pane\'s corner, handed its act and the version its act found lacking the passage, offers "read version ⟨n⟩" — its one act, a button — and says the passage is not in that version, its version statement words alone; the plane\'s corner handed the read a newer version\'s arrival offers carries it as a button after the version statement\'s, in either form, each out of the Tab order as made; a corner handed neither offers neither (issues #160, #240; D5 K-57)', () => {
  const member = doc({ addr: '1.0.1.0.3.2', members: null });
  const pane = cornerHTML(member, view({ scene: true, members: 3, read: 3, lacks: 2 }));
  const act = `<button type="button" class="read" data-read="3" tabindex="-1">${esc(t('F.versions.read', { k: 3 }))}</button>`;
  assert.ok(pane.includes(act), `the act, naming the version it reads: ${pane}`);
  assert.ok(pane.includes(`<span class="lacks">${esc(t('F.floating.member', { k: 2 }))}</span>`), 'the version said to lack the passage');
  assert.ok(pane.indexOf(t('F.version-of', { k: 2, n: 3 })) < pane.indexOf('class="lacks"') && pane.indexOf('class="lacks"') < pane.indexOf('class="read"'), 'in the corner\'s one order: the version statement, what it lacks, then the act');
  assert.ok((pane.match(/<button /g) || []).length === 1 && pane.includes(`<span class="version" data-members="3">`) && !pane.includes('tabindex="0"'), 'in a pane the read its corner\'s one act, the version statement words alone (SC)');
  const offered = cornerHTML(member, view({ members: 3, read: 3 })), compact = cornerHTML(member, view({ members: 3, read: 3 }), true);
  assert.ok(offered.includes(act) && offered.indexOf(t('F.version-of', { k: 2, n: 3 })) < offered.indexOf(act), `the plane's: the read offered after the version statement, a control never in the Tab order — ${offered}`);
  assert.ok(compact.includes(act), `compact as whole: the offer stands in either form (FP-26) — ${compact}`);
  const plane = cornerHTML(member, view({ members: 3 }));
  assert.ok(!plane.includes('data-read') && !plane.includes('class="lacks"') && !plane.includes('tabindex="0"') && (plane.match(/<button /g) || []).length === 1, 'handed neither: neither, the version statement its one act, out of the Tab order as made — its holder stands the corner\'s stops (K-57)');
  assert.ok(!cornerHTML(member, view({ members: 3, read: 3, acts: false })).includes('<button'), 'where the view asks no act: words alone');
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

test('the plan\'s head is the article\'s: two lines — its address and its byline — a third where links touch the document', () => {
  const d = doc({ blocks: [{ pos: 1, width: 20, kind: 'para', text: 'abcdefghijklmnopqrst', origin: null }] });
  const bare = articlePlan(d, view(), '1.0.1').filter((r) => r.kind === 'head');
  assert.deepEqual(bare.map((r) => r.pieces.map((p) => p.text).join('')), ['1.0.1.0.3', '1.0.1 · '], 'the byline: its owner, then the box its slots take, no characters of its own');
  assert.deepEqual([bare[1].pieces[1].box, bare[1].pieces[1].lead], [true, LABEL_CH * advances('0') * MEASURE.head], 'the slots one inline-block, which no line breaks inside, as wide as the one slot the reader\'s own byline takes, measured in its face, whatever it shows (FP-34)');
  assert.deepEqual(bare.map((r) => r.pieces[0].size), [1, MEASURE.head], 'the address at the body\'s size, the byline at the head\'s');
  const marked = articlePlan(d, view({ marks: [shown(5, 4)] }), '1.0.1').filter((r) => r.kind === 'head');
  assert.equal(marked.length, 3);
  assert.equal(marked[2].pieces[0].box, true, 'the presence line opens with its ⟡, an inline-block');
  assert.ok(marked[2].pieces.map((p) => p.text).join('').endsWith(t('B1.presence.1')));
});

test('a block\'s plan carries its symbols at its own size and its own characters, a transcluded run in it adding no piece and no room (issue #304)', () => {
  const d = doc({ blocks: [{ pos: 1, width: 13, kind: 'para', text: '# abcdefgh ij', origin: null }], origins: [{ pos: 5, width: 4, doc: '1.0.1.0.1003' }] });
  const v = view({ marks: [shown(9, 2)], symbols: [shown(9, 2)], countAt: () => ({ n: 3, social: false }) });
  const r = /** @type {import('../plane/layout.js').Row} */ (articlePlan(d, v, '1.0.1').find((x) => x.pos === 1));
  const k = 1;
  assert.equal(r.size, k, 'the typed line\'s box at the body\'s size, its "#" among its own characters');
  const sym = r.pieces.findIndex((p) => p.text === '⟡' && p.box);
  assert.equal(r.pieces.filter((p) => p.text === '⟡' && p.box).length, 1, 'one symbol');
  assert.deepEqual([r.pieces[sym - 1].text, r.pieces[sym + 1].text], ['gh', ' ij'], 'the symbol at its span: after its last word, before the word after it');
  assert.ok(r.pieces.every((p) => p.box ? p.text === '⟡' : p.own && p.lead === 0 && p.trail === 0), 'every other piece the document\'s own characters, with no room about it');
  assert.equal(r.pieces.filter((p) => !p.box).map((p) => p.text).join(''), '# abcdefgh ij', 'the document\'s own characters, every one');
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

test('the corner compact: a usual state its glyph, named whole by its words, the act that opens the corner whole, saying whether it stands opened — opened, its words the act that compacts it again — a number and an exception keeping theirs; words alone where the view asks no act (FP-26; issue #151)', () => {
  const latest = cornerHTML(doc(), view(), true), pinned = cornerHTML(doc({ addr: '1.0.1.0.3.1' }), view({ members: 3 }), true);
  const words = (/** @type {string} */ html) => (/<button type="button" class="st glyph" data-whole aria-expanded="false" aria-label="([^"]*)" tabindex="-1">([^<]*)<\/button>/.exec(html) || []).slice(1);
  assert.deepEqual(words(latest), [esc(venued('F.corner.latest')), esc(t('L.corner.bare'))], 'the bare address: its version marker unlit, named by its state\'s words');
  assert.deepEqual(words(pinned), [esc(venued('F.corner.pinned', { k: 1 })), esc(t('L.corner.pinned'))], 'a pinned version: its marker lit');
  assert.ok(latest.includes(`<button type="button" class="version" data-members="2" tabindex="-1">${esc(t('F.version-of', { k: 2, n: 2 }))}</button>`) && pinned.includes(esc(t('F.version-of', { k: 1, n: 3 }))), '"version ⟨k⟩ of ⟨n⟩" keeps its words');
  assert.ok(latest.startsWith(kindSlot('published')) && pinned.startsWith(kindSlot('published')), 'the kind keeps its words');
  const draft = cornerHTML(doc({ kind: 'draft', meta: null }), draftView(), true);
  assert.ok(draft.includes(`<button type="button" class="chip glyph" data-chip="1" data-whole aria-expanded="false" aria-label="${esc(t('C-28.flag-on'))}" tabindex="-1">${esc(t('L.corner.draft'))}</button>`), `a draft's chip its glyph, named by C-28's words: ${draft}`);
  const opened = cornerHTML(doc(), view({ opened: true }), true), whole = cornerHTML(doc(), view({ opened: true }));
  assert.ok(opened.includes(`aria-label="${esc(venued('F.corner.latest'))}"`) && opened.includes('aria-expanded="true"'), `opened whole on its act, the glyph says the corner stands opened — ${opened}`);
  assert.ok(whole.includes(`<button type="button" class="st" data-whole aria-expanded="true" tabindex="-1">${esc(venued('F.corner.latest'))}</button>`), `the corner opened whole: its state's words the act that compacts it again — ${whole}`);
  const plain = cornerHTML(doc(), view({ acts: false }), true);
  assert.ok(plain.includes(`<span class="st glyph" role="img" aria-label="${esc(venued('F.corner.latest'))}">${esc(t('L.corner.bare'))}</span>`) && !plain.includes('<button'), `where the view asks no act: the glyph named by its words, no act — ${plain}`);
  const counted = cornerHTML(doc(), view({ wholeLinks: 4 }), true), withheld = cornerHTML(doc({ refused: 'withheld' }), view(), true);
  assert.ok(counted.includes(esc(t('F.whole-links', { n: 4 }))) && withheld.includes(tHTML('F.corner.withheld', { owner: '1.0.1' }, { owner: 'id' })) && !withheld.includes('glyph'), 'the whole-document count and a withheld document\'s state keep their words, its owner in the identifier\'s face');
  assert.ok(!cornerHTML(doc(), view()).includes('glyph'), 'whole: no glyph');
});

test('while the board lags the corner names neither the latest version nor the chain\'s count: the bare address\'s state its kind, the version statement "version ⟨k⟩", standing for the versions list\'s act, then its venue\'s clause alone — compact, its marker unlit, named so; a pinned version\'s state keeps its words (issue #367\'s design decision: "corners drop \'the latest\' and \'of ⟨n⟩\'")', () => {
  const lagging = view({ lags: true });
  const latest = cornerHTML(doc(), lagging), compact = cornerHTML(doc(), lagging, true), pinned = cornerHTML(doc({ addr: '1.0.1.0.3.1' }), view({ members: 3, lags: true }));
  const version = (/** @type {number} */ k) => `<button type="button" class="version" tabindex="-1">${esc(t('L.version', { k }))}</button>`;
  assert.ok(latest.startsWith(`${kindSlot('published')}${version(2)}<span class="st">${esc(t('F.published.notebook'))}</span>`) && !latest.includes(esc(t('F.corner.latest'))), `the bare address: its kind, "version 2", then its venue's clause alone, never the latest — ${latest}`);
  assert.ok(compact.includes(`<button type="button" class="st glyph" data-whole aria-expanded="false" aria-label="${esc(t('F.published.notebook'))}" tabindex="-1">${esc(t('L.corner.bare'))}</button>`), `compact: its marker unlit, named by its venue's clause alone — ${compact}`);
  assert.ok(latest.includes(version(2)) && !latest.includes(esc(t('F.version-of', { k: 2, n: 2 }))), `"version ⟨k⟩", never of the count — ${latest}`);
  assert.ok(pinned.includes(esc(venued('F.corner.pinned', { k: 1 }))) && pinned.includes(version(1)), `a pinned version: its state\'s words, its statement "version ⟨k⟩" — ${pinned}`);
  assert.ok(cornerHTML(doc(), view({ lags: false })).includes(esc(t('F.version-of', { k: 2, n: 2 }))), 'no lag: "version ⟨k⟩ of ⟨n⟩"');
});

test('a document\'s state is said once, at its corner: in every version state — at the bare address, an older pin, a pin on the newest version, a document with no versions, a reading scene\'s pane — the head states none and its plan sets no line for one, the corner names its kind, the version shown and the chain\'s count, and the words the ARIA mirror voices are the corner\'s state whole, its kind leading (issue #239\'s design decision: "State is said once per document, at its corner"; issue #423\'s: "the slot\'s word leads the item")', () => {
  const blocks = [{ pos: 1, width: 20, kind: /** @type {const} */ ('para'), text: 'abcdefghijklmnopqrst', origin: null }];
  const meta = /** @type {NonNullable<import('../model/records.js').Doc['meta']>} */ (doc().meta);
  /** @type {Array<[string, import('../model/records.js').Doc, import('./article.js').ArticleView, string[]]>} each state, its document and view, and its corner's state's words after its kind, in their order */
  const states = [
    ['the bare address', doc({ blocks }), view({ members: 2 }), [t('F.version-of', { k: 2, n: 2 }), venued('F.corner.latest')]],
    ['an older pin', doc({ addr: '1.0.1.0.3.1', blocks, members: null }), view({ members: 2 }), [t('F.version-of', { k: 1, n: 2 }), venued('F.corner.pinned', { k: 1 })]],
    ['a pin on the newest version', doc({ addr: '1.0.1.0.3.2', blocks, members: null }), view({ members: 2 }), [t('F.version-of', { k: 2, n: 2 }), venued('F.corner.pinned', { k: 2 })]],
    ['a document with no versions', doc({ blocks, meta: { ...meta, birth: null } }), view({ members: null }), [venued('F.corner.no-versions')]],
    ['a reading scene\'s pane', doc({ addr: '1.0.1.0.3.1', blocks, members: null }), view({ scene: true, members: 3, read: 3, lacks: 1 }), [t('F.version-of', { k: 1, n: 3 }), venued('F.corner.pinned', { k: 1 })]],
  ];
  for (const [what, d, v, state] of states) {
    const head = (/^<div class="hd">(.*?)<\/div>/.exec(articleHTML(d, v, '1.0.1')) || [])[1] ?? '';
    assert.ok(head.startsWith(`<span class="addr id">${d.addr}</span><span class="by">`) && !head.includes('class="st"') && !/published|version/.test(head), `${what}: the head its address, then its byline, no state — ${head}`);
    assert.deepEqual(articlePlan(d, v, '1.0.1').filter((r) => r.kind === 'head').map((r) => r.pieces.map((p) => p.text).join('')), [d.addr, '1.0.1 · '], `${what}: the plan's head its address and its byline alone`);
    const corner = cornerHTML(d, v), at = state.map((words) => corner.indexOf(esc(words)));
    assert.ok(corner.startsWith(kindSlot('published')) && at.every((i, k) => i > 0 && (k === 0 || i > at[k - 1])), `${what}: the corner names its kind, then ${JSON.stringify(state)} in that order — ${corner}`);
    assert.deepEqual([cornerLead(d, v), cornerWords(d, v)], [t('F.published'), state.join(', ')], `${what}: the mirror's words the corner's, its kind leading, then its state whole`);
  }
});

test('a document a read refused states nothing in its head either, on the plane and in a pane — its article its head alone, its address and its byline — its state its corner\'s whole in either form, before any version\'s, no act on a version beside it: withheld, its withheld box\'s words, its owner in the identifier\'s face, the cover a pane shows; one the board says nothing of, the words for that; the words the ARIA mirror voices the corner\'s (issue #239\'s design decision: "Remove the head\'s state line in every state")', () => {
  /** @type {Array<[string, import('../model/records.js').Doc, string, string]>} each refusal, its document — listed as an edition — and its corner's words, as words and as markup */
  const refusals = [
    ['withheld', doc({ refused: 'withheld', meta: null }), t('F.corner.withheld', { owner: '1.0.1' }), tHTML('F.corner.withheld', { owner: '1.0.1' }, { owner: 'id' })],
    ['nothing the board will say of it', doc({ refused: 'unregistered', meta: null }), t('L.far.unregistered'), esc(t('L.far.unregistered'))],
  ];
  for (const [what, d, words, html] of refusals) for (const scene of [false, true]) {
    const where = `${what}, ${scene ? 'in a pane' : 'on the plane'}`, v = view({ scene, members: 2, read: 3, lacks: 1 });
    const article = articleHTML(d, v, '1.0.1');
    assert.ok(article.startsWith(`<div class="hd"><span class="addr id">${d.addr}</span><span class="by">`) && article.endsWith('</div>') && !article.includes('class="st"') && !article.includes(html), `${where}: its head alone, its address then its byline, no state — ${article}`);
    assert.deepEqual(articlePlan(d, v, '1.0.1').map((r) => r.pieces.map((p) => p.text).join('')), [d.addr, '1.0.1 · '], `${where}: the plan its address and its byline alone`);
    assert.deepEqual([cornerHTML(d, v), cornerHTML(d, v, true)], [`<span class="st">${html}</span>`, `<span class="st">${html}</span>`], `${where}: its corner its state alone, whole in either form — never a kind, "published", a version or a version's act`);
    assert.deepEqual([cornerLead(d, v), cornerWords(d, v)], [words, ''], `${where}: the mirror's words the corner's, its own words leading where no kind can be read, nothing after them`);
  }
});

test('the corner\'s state and the words the mirror voices are one rule: its first item leading — a withheld document\'s owner the one owner rule\'s, never its sub-account; a draft\'s kind, then its kept word where one is set, then its chip; while the board lags "version ⟨k⟩" and its venue\'s clause; a pane\'s act and lacking line no part of its state (R94)', () => {
  const blocks = [{ pos: 1, width: 20, kind: /** @type {const} */ ('para'), text: 'abcdefghijklmnopqrst', origin: null }];
  const sub = doc({ addr: '1.0.2.1.0.2', account: '1.0.2.1', refused: 'withheld', meta: null }), seat = view({ originOwner: (a) => (a === sub.addr ? '1.0.2' : accountOf(a) || '') });
  assert.deepEqual([cornerLead(sub, seat), cornerWords(sub, seat)], [t('F.corner.withheld', { owner: '1.0.2' }), ''], 'withheld: its box\'s words leading, the seat above the sub-account');
  assert.ok(cornerHTML(sub, seat).includes(tHTML('F.corner.withheld', { owner: '1.0.2' }, { owner: 'id' })) && !cornerHTML(sub, seat).includes('1.0.2.1'), 'its corner names the same owner, in the identifier\'s face');
  const draft = doc({ kind: 'draft', meta: null, blocks });
  assert.deepEqual([cornerLead(draft, draftView()), cornerWords(draft, draftView())], [t('F.kind.draft'), t('C-28.flag-on')], 'a draft with no kept state: its kind, then its chip');
  assert.equal(cornerWords(draft, draftView({ kept: { word: 'not yet kept', reason: null }, localTrust: false })), [t('B3.not-yet-kept'), t('C-28')].join(', '), 'its kept word, then its chip');
  assert.equal(cornerWords(doc({ addr: '1.0.1.0.3.1', members: null }), view({ members: 3, lags: true })), [t('L.version', { k: 1 }), venued('F.corner.pinned', { k: 1 })].join(', '), 'lagging at a pin: its own version, never of the count');
  assert.equal(cornerWords(doc(), view({ members: 2, lags: true })), [t('L.version', { k: 2 }), t('F.published.notebook')].join(', '), 'lagging at the bare address: its venue\'s clause alone');
  assert.equal(cornerWords(doc({ addr: '1.0.1.0.3.2', members: null }), view({ scene: true, members: 3, read: 3, lacks: 2 })), [t('F.version-of', { k: 2, n: 3 }), venued('F.corner.pinned', { k: 2 })].join(', '), 'a pane: its act and its lacking line said by the corner, no part of its state');
  assert.equal(cornerWords(doc({ addr: '1.0.1.0.3.2', members: null }), view({ members: null })), venued('F.corner.pinned', { k: 2 }), 'no count known: its version alone, no statement of the count');
  assert.deepEqual(['reading', 'unread'].map((kind) => [cornerLead(doc({ kind: 'unknown', meta: null }), view({ kind: /** @type {any} */ (kind) })), cornerWords(doc({ kind: 'unknown', meta: null }), view({ kind: /** @type {any} */ (kind) }))]), [[t('L.slot.reading'), ''], [t('L.slot.unread'), '']], 'its kind being read, or not read: the slot\'s words leading, nothing after them');
});

/** a paragraph's pieces in the plan, each its text, a symbol's its ⟡ */
const piecesOf = (/** @type {import('../model/records.js').Doc} */ d, /** @type {import('./article.js').ArticleView} */ v, /** @type {number} */ pos) =>
  /** @type {import('../plane/layout.js').Row} */ (articlePlan(d, v, '1.0.1').find((x) => x.pos === pos)).pieces.map((p) => p.text);
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

test('a symbol stands after its span\'s last word whatever run opens beside it — before the space a run opens at, before the word after an em dash where the line may break — the run\'s hairlines taking no room in the line (issue #304)', () => {
  const X = '1.0.1.0.1003';
  // the run opens at the space after "two": nothing of the run stands in the line, so the symbol stands after "two", outside the run
  const d = doc({ blocks: [{ pos: 1, width: 13, kind: 'para', text: 'one two three', origin: null }], origins: [{ pos: 8, width: 6, doc: X }] });
  const v = view({ symbols: [shown(5, 3)] });
  assert.deepEqual(piecesOf(d, v, 1), ['one two', '⟡', ' three']);
  assert.ok(/one two<span class="sym [^"]*"[^>]*>⟡<\/span><span class="seg same opens closes" data-origin="1\.0\.1\.0\.1003"> three<\/span><\/p>/.test(articleHTML(d, v, '1.0.1')), 'before the run\'s stretch, the run opening after it');
  const dash = doc({ blocks: [{ pos: 1, width: 15, kind: 'para', text: 'one—two three', origin: null }], origins: [{ pos: 7, width: 3, doc: X }] });
  assert.deepEqual(piecesOf(dash, view({ symbols: [shown(1, 6)] }), 1), ['one—', '⟡', 'two', ' three']);
});

test('a run cut by a mark and a symbol opens once and closes once, its ground under each of its stretches, and the cuts add no piece of its own (issue #304)', () => {
  const X = '1.0.1.0.1003';
  const d = doc({ blocks: [{ pos: 1, width: 12, kind: 'para', text: 'abcdefghijkl', origin: null }], origins: [{ pos: 5, width: 4, doc: X }] });
  const v = view({ marks: [shown(6, 2)] });
  const html = articleHTML(d, v, '1.0.1');
  assert.deepEqual(sameIn(html.replace(/ lip depth\d|style="[^"]*" |data-links="[^"]*" |data-ends="[^"]*" /g, '')).map(([c, , text]) => [c, text]), [['same opens', 'e'], ['same', 'fg'], ['same closes', 'h']], `the boundary at its first stretch, the closing at its last: ${html}`);
  assert.deepEqual(piecesOf(d, v, 1), ['abcd', 'e', 'fg', 'h', 'ijkl']);
  const words = doc({ blocks: [{ pos: 1, width: 11, kind: 'para', text: 'ab cd ef gh', origin: null }], origins: [{ pos: 4, width: 5, doc: X }] });
  assert.deepEqual(piecesOf(words, view({ symbols: [shown(4, 2)] }), 1), ['ab ', 'cd', '⟡', ' ef', ' gh'], 'a symbol standing inside the run cuts it');
  assert.deepEqual(sameIn(articleHTML(words, view({ symbols: [shown(4, 2)] }), '1.0.1')).map(([c, , text]) => [c, text]), [['same opens', 'cd'], ['same closes', ' ef']], 'opening before the symbol, closing after it');
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
  assert.deepEqual(head, [1, MEASURE.head], 'the head\'s address at the body\'s size, its byline at the head\'s');
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
  assert.equal(articlePlan(doc({ refused: 'withheld' }), view(), '1.0.1').length, 2, 'a refused document is its head alone: its address and its byline');
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
const bylineRow = (/** @type {import('../model/records.js').Doc} */ d, /** @type {import('./article.js').ArticleView} */ v) => JSON.stringify(articlePlan(d, v, d.account || '').filter((r) => r.kind === 'head')[1]);
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

test('each withheld run carries its own origin\'s key and its origin\'s owner, whoever owns the document windowing it; the placeholder its card and its statement are made from names that owner (R56; B1-S7)', () => {
  const d = doc({ blocks: [
    { pos: 1, width: 10, kind: 'para', text: 'Tumbler.', origin: null },
    { pos: 11, width: WIDE, kind: 'withheld', text: '', origin: '1.0.2.0.2' },
    { pos: 11 + WIDE, width: 10, kind: 'para', text: 'Between.', origin: null },
    { pos: 21 + WIDE, width: 240, kind: 'withheld', text: '', origin: '1.0.1.0.1003' },
    { pos: 261 + WIDE, width: 10, kind: 'para', text: 'After.', origin: null },
    { pos: 271 + WIDE, width: 4, kind: 'withheld', text: '', origin: '1.0.2.0.2' },
  ] });
  const runs = [{ pos: 11, width: WIDE, origin: '1.0.2.0.2', owner: '1.0.2', holds: 'key' }, { pos: 21 + WIDE, width: 240, origin: '1.0.1.0.1003', owner: '1.0.1', holds: 'key' }, { pos: 271 + WIDE, width: 4, origin: '1.0.2.0.2', owner: '1.0.2', holds: 'edge' }];
  for (const reader of [SIGNED, KEYED, KEYLESS]) {
    const html = articleHTML(d, view({ reader }), '1.0.1');
    for (const r of runs) {
      const g = /** @type {NonNullable<ReturnType<typeof gapAt>>} */ (gapAt(html, r.pos)), what = `${JSON.stringify(reader)}: the run from ${r.origin}, in ${d.addr}, which 1.0.1 owns`;
      assert.deepEqual([g.owner, g.origin, g.holds, g.key ? g.key.text : null], [r.owner, r.origin, r.holds, r.holds === 'key' ? r.origin : null], `${what}: carries ${r.owner} and its own key, where its gap holds it`);
      const p = placeholderOf(/** @type {import('../model/records.js').Block} */ (d.blocks.find((b) => b.pos === r.pos)), reader, (a) => accountOf(a) || '', () => null);
      assert.deepEqual([p.head, p.arm], [t('B1.withheld-run', { owner: r.owner, account: r.owner, width: r.width, origin: r.origin }), entitlementArm(reader, r.owner)], `${what}: its card's head and arm name ${r.owner}`);
    }
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

test('every address the article sets stands in the identifier\'s face, inside a sentence as well: the head\'s address, the byline\'s owner, another\'s home record (issue #16)', () => {
  const head = articleHTML(doc({ blocks: [{ pos: 1, width: 8, kind: 'para', text: 'Tumbler.', origin: null }] }), view(), '1.0.1');
  assert.ok(head.startsWith(`<div class="hd"><span class="addr id">1.0.1.0.3</span>`) && head.includes(`<span class="by">${idOf('1.0.1')} · `), 'the head\'s address and the byline\'s owner');
  assert.ok(head.includes('<p class="sp blk-para indent" data-addr="1.0.1.0.3" data-pos="1" data-width="8">Tumbler.</p>'), 'the document\'s own words carry no face of the client\'s');
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

test('an item of a kind the page does not know, as a delivery hands it, stands at its own place as an item this client cannot show: a gap of its width with its words, its plan row and its bar the gap\'s, the text after it at its own positions, and a copy\'s stand-in in its place, never the two texts joined (wire.md §Value encodings)', () => {
  const D = '1.0.1.0.3';
  const runs = decodeDelivery({ as_of: 9, items: [{ content: 'Before.\n' }, { later: { origin: '1.0.1.0.2', width: '3' } }, { content: 'After.' }], resp: 'delivery' }, 1);
  const blocks = deriveBlocks(runs), d = doc({ runs, blocks, extent: 17, to: 18, whole: 17 });
  assert.deepEqual(blocks.map((b) => [b.pos, b.width, b.kind, itemOf(b)]), [[1, 8, 'para', null], [9, 3, 'unknown', 'unshown'], [12, 6, 'para', null]], 'its block an item this client cannot show, between the two texts');
  const html = articleHTML(d, view(), '1.0.1');
  const gap = new RegExp(`<span class="sp blk-unknown gap" data-addr="${D}" data-pos="9" data-width="3" style="height:([\\d.]+)em;--wh-last:3"><span class="unshown edge"[^>]*>([^<]*)</span></span>`).exec(html);
  assert.ok(gap && Math.abs(Number(gap[1]) - LINE_H) < 1e-9 && gap[2] === esc(t('F.not-rendered', { width: 3 })), `one line three advances long, its words in the edge: ${html}`);
  assert.ok(html.includes(`<p class="sp blk-para" data-addr="${D}" data-pos="12" data-width="6">After.</p>`), `the text after it at its own positions, on the item's line: ${html}`);
  const plan = articlePlan(d, view(), '1.0.1');
  assert.deepEqual(plan.filter((r) => r.pos != null).map((r) => [r.pos, r.kind, r.width]), [[1, 'text', 0], [9, 'gap', 3], [12, 'text', 0]], 'its row the gap\'s, carrying its width');
  assert.deepEqual(layoutOf(plan).lines.filter((l) => l.pos === 9).map((l) => [l.w, l.at]), [[3, 9]], 'its bar a line of its three positions');
  assert.equal(copyText({ addr: D, runs, blocks, image: [] }, { addr: D, pos: 1, width: 17 }, (a) => accountOf(a) || ''), `Before.\n${standIn.unshown(3)}After.`, 'its stand-in in its place, its length its own');
});

test('the ends drawn at a withheld run stand as ONE symbol at the start of its gap\'s first line, before its key — every end\'s key on it, its count where it stands for two or more — at every stage of the reveal, no stretch of the gap marked, no others\' count in the article; the plan unmoved (issue #202)', () => {
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
  assert.ok(/^<span class="sym at-run [^>]*>⟡2<\/span><span class="wh-key id" /.test(gap), `first in the gap's first line, before its key: ${gap}`);
  assert.ok(!/class="[^"]*\blip\b/.test(gap) && !gap.includes('depth') && !gap.includes('class="others'), 'no stretch of the gap marked, and no count in it: it still reads as empty, the count on the screen-sized layer (T-LAYER)');
  // one end alone: no count after its ⟡
  assert.ok(articleHTML(d, view({ reader: KEYLESS, marks: [a] }), '1.0.1').includes('data-links="R1" data-ends="k1" style="--mark-hue:' + HUE.you + ';--mark-value:1;--sym-chars:1" role="button" tabindex="-1" title="">⟡</span>'), 'one end: its ⟡ alone');
  // the plan: the gap's row and every block's the same, the ends drawn at the run or not
  const rows = (/** @type {import('./article.js').ArticleView} */ w) => JSON.stringify(articlePlan(d, w, '1.0.1').filter((r) => r.kind !== 'head'));
  assert.equal(rows(v), rows(view({ reader: KEYLESS, marks: [inText] })), 'no row moved: the gap stands on its bars');
  // what the gap holds is measured with the symbol first in its first line: the key goes to the edge, the symbol stands (FP-26)
  const p = placeholderOf(runOf(14), SIGNED, (x) => accountOf(x) || '', () => null);
  assert.deepEqual([gapHolds(p, 14, MEASURE_CPL, advances), gapHolds(p, 14, MEASURE_CPL, advances, 2)], ['key', 'edge'], 'fourteen positions hold the key alone; with the symbol before it, the key stands in the edge');
  const fourteen = withheldBlockHTML(runOf(14), view(), { ends: [a, b] });
  assert.ok(fourteen.includes('data-holds="edge"') && fourteen.endsWith('>⟡2</span></span>'), `the symbol stands alone in the gap: ${fourteen}`);
});

test('while a read its clause waits on is out, a withheld run\'s gap stands on its bars holding its ground alone — the symbol its ends merge into first in it, no key — its key standing with its origin\'s statement once the clause is decided; the plan the same in either state (issue #272\'s design decision: "a first read shows the gap, then the face with its clause")', () => {
  const O = '1.0.1.0.1003', run = runOf(240, 11), RUN = { pos: 11, width: 240, origin: O };
  const d = doc({ blocks: [{ pos: 1, width: 10, kind: 'para', text: 'Tumbler.', origin: null }, run] });
  const end = { ...shown(11, 240), link: { addr: 'R1', type: null }, key: 'k1', run: RUN, runs: [{ pos: 11, width: 240 }], mark: { hue: HUE.you, linker: 'you', form: [], value: 1, own: true } };
  const at = { ends: [end] };
  const as = (/** @type {() => import('./article.js').Decided} */ clauseOf) => view({ reader: KEYLESS, clauseOf, marks: [end], countAt: (b) => ({ n: b.kind === 'withheld' ? 2 : 0, social: false }) });
  const reading = withheldBlockHTML(run, as(() => CLAUSE_READING), at), decided = withheldBlockHTML(run, as(() => null), at);
  assert.ok(/^<span class="withheld" [^>]*data-holds="reading"[^>]*><span class="sym at-run [^"]*"[^>]*>⟡<\/span><\/span>$/.test(reading), `its ground and its one symbol, nothing else: ${reading}`);
  assert.equal(gapHolds(placeholderOf(run, KEYLESS, (a) => accountOf(a) || '', () => CLAUSE_READING), 240, MEASURE_CPL, advances, 1), 'reading');
  assert.ok(decided.includes('data-holds="key"') && decided.includes(`<span class="wh-key id" data-key="${O}"`), `decided: its key in the gap: ${decided}`);
  const height = (/** @type {string} */ html) => (/^<span class="withheld" [^>]* style="([^"]*)"/.exec(html) || [])[1];
  assert.equal(height(reading), height(decided), 'the gap as tall as its bars in either state, its last line its remainder');
  const plan = (/** @type {() => import('./article.js').Decided} */ clauseOf) => JSON.stringify(articlePlan(d, as(clauseOf), '1.0.1'));
  assert.equal(plan(() => CLAUSE_READING), plan(() => null), 'the plan the same: the key arriving moves no line');
  assert.ok(articleHTML(d, as(() => CLAUSE_READING), '1.0.1').includes('data-holds="reading"'), 'the article draws the gap so');
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
