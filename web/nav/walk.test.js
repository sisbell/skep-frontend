// N-WALK's test against the fake port: a landing keeps the position it named
// inside the span it focuses while a walk key names none and a position no
// span holds is never kept; the ring is drawn where an act put the walk,
// whatever made it, and a re-take draws it only where it lands back on that
// element; the walk's panel shows after a walk key's move alone, hidden at
// every other act and once the focus stands outside the plane, placed over
// the walk's element's box hidden and clear of it shown; an activation
// reaching a mirror item stands the walk there as an act and makes Enter's
// act; a block of white space alone is no
// element of the walk; a landing the index does not list stands on its own
// node among the listed siblings; the mirror is one Tab stop, named from ST
// with each level's group, a withheld run's item its own part — its kind,
// length and origin — naming its origin's one description, which every run
// of it names, made from the run's placeholder once its clause is read, and
// every item a transcluded draft's run touches in a published document
// naming that origin's one description, C-33's words, each document's kind
// there read by the one test — an origin's its metadata's word whatever the
// index lists it as, a version's its box's listing where its metadata is
// unread —
// each block that holds no text by its kind, a document led by its corner's
// first item — its kind, being read where nothing told it, a withheld box's
// words where no kind can be read — and a link's far end as its tail does, what its text holds of
// its passage said whole — described, where the
// board will say nothing of it, by its one state's whole form — its descriptions and
// Back's light written at the rebuild and marked again in place, and its
// inert mark kept through a rebuild; a move whose reads a later move overtook
// sets nothing and flies nowhere; in a document folded into columns the
// camera follows the walk to a span's line in its column and to the outline
// framed no nearer than reading size, in the fold a resize in the air sets
// the document in, and a step made below a document's
// reading scale frames it short of that scale; the grain below a document is
// the document's own and the re-take's order holds at every band, the element
// under a view's centre read at any view the one the re-take takes where it
// keeps nothing, never a line of white space alone; in a draft holding typed
// text the re-take, → and a step's flight read each span where the typing
// carried it, a line typed after the last span standing on the last; → steps in
// to the child drawn under the centre of the view the camera is bound for,
// else to the first; the re-take and → find every box the plane draws under
// the centre, one the index does not list among them; a
// continuation the plane draws as one mark is one stop before its members,
// named by its count, the camera flown to the mark for each of them, and a
// re-take over it takes the mark or keeps a member, never the member under
// the centre, and a landing at its name stands on its account where the scale
// draws no mark; each box is
// walked as the version it shows; the page's own death takes the mirror down
// where the view stood on nothing, the walk staying on a covered draft, and a
// change of class keeps the walk on the span its document kept, a draft's
// run there named as the withheld run it is now; a withheld run's ends stand a level
// below its item, counted and marked as the symbols are; a document's item
// voicing its corner's state whole, its kind leading, the version its box
// shows and its chain's count, marked in place as the chain is counted again;
// the kind of the document the walk stands in said once in the status region
// where it fills under the focus; a kept
// document's item carrying the clause its corner or the one line shows, and
// the board's while it lags, each marked in place as it appears and as it
// lifts; and
// where no board is held the root says why and the re-take
// stands on it alone; and in a draft holding typed text the walk and the
// mirror follow the text shown — a typed line a stop, a deleted one none, a
// stop holding its place by its bytes, nothing moved at an ack, the mirror
// reading the typed words and saying a hold from the held lines alone
// (FP-8, FP-20, FP-21, FP-22, FP-23, FP-24, FP-29, FP-33, FP-34, FP-35, FP-36,
// FP-39).
import { test, before } from 'node:test';
import assert from 'node:assert/strict';
import * as PORT from '../bridge/port.js';
import * as REC from '../model/records.js';
import * as WRITE from '../write/write.js';
import * as PUMP from '../model/pump.js';
import * as F from '../model/frames.js';
import * as FAKE from '../test/fake-port.js';
import * as CAM from '../plane/camera.js';
import * as LAYER from '../text/layer.js';
import { withheldBlockHTML, entitlementArm, articleHTML, copyText, CLAUSE_READING } from '../text/article.js';
import { accountCell, boardCell, boardLabelCell, docBox, clearLeftOf, continuationCell, DOC_W } from '../plane/projection.js';
import { lodOf, residueDepth, markScale, LOD_TXT_LO } from '../plane/lod.js';
import { placeOf, STANDARD_FS, EDGE } from '../plane/layout.js';
import { CORNER, cornerWidth } from '../plane/register.js';
import { STRINGS, t, tHTML, markCount, lastRead } from '../strings.js';
import { esc, byteLength } from '../util.js';
import { homeOf, resolveSpan, unitSpan } from '../model/address.js';
import * as WALK from './walk.js';
import * as FOCUS from './focus.js';
import * as LK from '../links/links.js';
import { farShort } from '../beams/held.js';

const D = '1.0.1.0.3';
/** a second document: a separator alone, then a span, a block of one space, a span — two elements of the walk among four blocks */
const E = '1.0.1.0.5';
const E_TEXT = '\n\nSecond.\n\n \n\nThird.';
/** the reads of a document read whole: its extent, its metadata, its text, its image, its links (none) */
const reads = (/** @type {string} */ doc, /** @type {Array<Record<string, unknown>>} */ items, /** @type {number} */ extent, /** @type {Array<Record<string, string>>} */ runs) => ({
  [FAKE.keyOf('op', { frame: F.retrieveDocVSpanSet(doc) })]: { result: { as_of: 1, resp: 'span_set', set: [{ start: '1.1', width: '0.' + extent }] } },
  [FAKE.keyOf('op', { frame: F.docMetadata(doc) })]: { result: { as_of: 1, resp: 'doc_metadata', doc, published: true, owner: '1.0.1', birth: doc + '.1', birth_extent: String(extent), placed: null, base_extent: null, source: null } },
  [FAKE.keyOf('op', { frame: F.retrieveV(doc, 1, extent) })]: { result: { as_of: 1, resp: 'delivery', items } },
  [FAKE.keyOf('op', { frame: F.image(doc, 1, extent) })]: { result: { as_of: 1, resp: 'runs', runs } },
  [FAKE.keyOf('op', { frame: F.findLinksV(doc, 1, extent) })]: { result: { as_of: 1, resp: 'addrs', addrs: [] } },
});
/** a third document, held in part as the viewport's read leaves it — its extent and its first paragraph — the rest of its text read on the walk's ask */
const G = '1.0.1.0.7';
const G_TEXT = 'First.\n\nSecond.\n\nThird.';
/** the account's 49th document, its first continuation's first: its room a seventh of a depth-0 document's across, its type with it */
const C1 = '1.0.1.0.49';
const C1_TEXT = 'Tumbler.\n\nThe first field.';
/** a document longer than a column: a hundred and twenty paragraphs of a line each, folded into its room's columns */
const H = '1.0.1.0.40';
const H_TEXT = Array.from({ length: 120 }, (_, i) => `Paragraph ${i + 1} of an edition longer than one column.`).join('\n\n');
/** a document windowing two runs of one origin withheld from the reader, at 11 and 27, a paragraph between them */
const R2 = '1.0.1.0.41', R2_ORIGIN = '1.0.2.0.8';
/** a published document windowing a draft the reader reads: one run of it across two typed lines at 11 — the newline between them the draft's own — and a second at 44, a paragraph of the document's own between them */
const T2 = '1.0.1.0.42', T2_ORIGIN = '1.0.1.0.1007', T2_TEXT = 'Tumbler.\n\nquoted one\nquoted two\n\nBetween.\n\nquoted three';
// D: three spans: 1 "Tumbler.\n\n" (10), 11 "The first field." (16), 27 a withheld run (4)
const script = {
  ...reads(D, [{ content: 'Tumbler.\n\nThe first field.' }, { withheld: { origin: '1.0.1.0.1003', width: '4' } }], 30, [{ i_start: D + '.0.1.1', width: '26' }, { i_start: '1.0.1.0.1003.0.1.1', width: '4' }]),
  ...reads(E, [{ content: E_TEXT }], E_TEXT.length, [{ i_start: E + '.0.1.1', width: String(E_TEXT.length) }]),
  ...reads(G, [{ content: G_TEXT }], G_TEXT.length, [{ i_start: G + '.0.1.1', width: String(G_TEXT.length) }]),
  ...reads(H, [{ content: H_TEXT }], H_TEXT.length, [{ i_start: H + '.0.1.1', width: String(H_TEXT.length) }]),
  ...reads(C1, [{ content: C1_TEXT }], C1_TEXT.length, [{ i_start: C1 + '.0.1.1', width: String(C1_TEXT.length) }]),
  // the edition claims on D's withheld run's origin: none
  [FAKE.keyOf('op', { frame: F.editionClaimsAt('1.0.1.0.1003') })]: { result: { as_of: 1, resp: 'addrs', addrs: [] } },
  // R2: two runs of one withheld origin, a paragraph between them
  ...reads(R2, [{ content: 'Tumbler.\n\n' }, { withheld: { origin: R2_ORIGIN, width: '6' } }, { content: 'Between.\n\n' }, { withheld: { origin: R2_ORIGIN, width: '6' } }], 32,
    [{ i_start: R2 + '.0.1.1', width: '10' }, { i_start: R2_ORIGIN + '.0.1.1', width: '6' }, { i_start: R2 + '.0.1.11', width: '10' }, { i_start: R2_ORIGIN + '.0.1.7', width: '6' }]),
  [FAKE.keyOf('op', { frame: F.editionClaimsAt(R2_ORIGIN) })]: { result: { as_of: 1, resp: 'addrs', addrs: [] } },
  // T2: the draft's bytes at 11 to 31 and 44 to 55, the document's own about them
  ...reads(T2, [{ content: T2_TEXT }], T2_TEXT.length,
    [{ i_start: T2 + '.0.1.1', width: '10' }, { i_start: T2_ORIGIN + '.0.1.1', width: '21' }, { i_start: T2 + '.0.1.11', width: '12' }, { i_start: T2_ORIGIN + '.0.1.50', width: '12' }]),
};

/** @type {ReturnType<typeof FAKE.create>} */
let fake;

/** G as the viewport's read leaves it: its extent and its first paragraph, the rest unread */
function partly() {
  REC.invalidate(G);
  REC.takeSpanSet(G, F.decodeSpanSet({ resp: 'span_set', set: [{ start: '1.1', width: '0.' + G_TEXT.length }] }));
  REC.takeDelivery(G, F.decodeDelivery({ resp: 'delivery', items: [{ content: 'First.\n\n' }] }, 1));
}
/** the walk's element: its kind, its place, its position */
const walkAt = () => { const f = WALK.current(); return f && [f.kind, f.addr, f.pos]; };
/** an edition's state on a notebook as its corner sets it after its kind and its version statement: its venue's clause, then the state's own words (T-ARTICLE's `L.corner.venue`) */
const venued = (/** @type {string} */ id, /** @type {Record<string, number>} */ vals = {}) => t('L.corner.venue', { venue: t('F.published.notebook'), state: t(id, vals) });

/** a walk move run to its end: the flight it starts stepped to its last frame */
async function run(/** @type {Promise<unknown>} */ move) {
  let done = false;
  move.then(() => { done = true; });
  for (let i = 0; i < 100 && !done; i++) { await new Promise((r) => setTimeout(r, 0)); if (CAM.flying()) CAM.step(Infinity); }
  assert.ok(done, 'the move ran to its end');
}

before(async () => {
  REC._reset(); WRITE._reset();
  fake = FAKE.create(script);
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.setBoard({ board: 'b-1', name: '', origin: '' }); REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  REC.takeIndex(/** @type {any} */ ({ docs: [{ doc: D, kind: 'edition', label: 'd', standing: 'public' }, { doc: E, kind: 'edition', label: 'e', standing: 'public' }], counts: [{ account: '1.0.1', documents: 2 }], state: { arm: 'complete' } }));
  CAM.setViewport(1440, 900);
  await PUMP.loadWhole(D);
  await PUMP.loadWhole(E);
  assert.deepEqual(REC.doc(D).blocks.map((b) => b.pos), [1, 11, 27]);
  assert.deepEqual(REC.doc(E).blocks.map((b) => [b.pos, b.text]), [[1, ''], [3, 'Second.'], [12, ' '], [15, 'Third.']], 'E holds two blocks of white space among its spans');
  assert.deepEqual(fake.unanswered, []);
});

test('a landing focuses the span holding its position and keeps the position it named', async () => {
  await WALK.focusTo(D, 15);
  assert.equal(WALK.current()?.pos, 11, 'the focus is the span holding position 15');
  assert.equal(WALK.landedAt(), 15);
});

test('a walk key names no position, and stepping back onto the landing\'s span reads the span\'s own first', async () => {
  await WALK.focusTo(D, 15);
  await run(WALK.key('down'));
  assert.equal(WALK.current()?.pos, 27);
  assert.equal(WALK.landedAt(), null);
  await run(WALK.key('up'));
  assert.equal(WALK.current()?.pos, 11);
  assert.equal(WALK.landedAt(), null);
});

test('a position no span holds is never kept: the focus falls to the first span with its own position', async () => {
  await WALK.focusTo(D, 99);
  assert.equal(WALK.current()?.pos, 1);
  assert.equal(WALK.landedAt(), null);
});

test('a landing on the document itself names no position', async () => {
  await WALK.focusTo(D, 15);
  await WALK.focusTo(D, null);
  assert.equal(WALK.current()?.kind, 'document');
  assert.equal(WALK.landedAt(), null);
});

test('a block of white space alone is no element of the walk; a landing inside one stands on the element before it (rule 20)', async () => {
  await WALK.focusTo(E, 4);
  assert.deepEqual(WALK.siblingsNow().map((n) => n.pos), [3, 15], 'the walk holds the two spans; the separator and the space are no elements');
  assert.equal(WALK.current()?.pos, 3);
  await WALK.focusTo(E, 13);
  assert.equal(WALK.current()?.pos, 3, 'a landing in the block of one space stands on the span before it');
  assert.equal(WALK.landedAt(), null, 'and keeps no position: the span does not hold it');
  await WALK.focusTo(E, 1);
  assert.equal(WALK.current()?.pos, 3, 'a landing in the leading separator, with no element before it, stands on the first span');
  await run(WALK.key('down'));
  assert.equal(WALK.current()?.pos, 15, '↓ steps over the space to the next span');
});

test('a landing the index does not list stands on its own node among the listed siblings, in address order (rule 12)', async () => {
  await WALK.focusTo('1.0.1.0.4', null);
  assert.deepEqual(WALK.siblingsNow().map((n) => n.addr), [D, '1.0.1.0.4', E], 'the document placed between the two the index lists');
  assert.deepEqual([WALK.current()?.kind, WALK.current()?.addr], ['document', '1.0.1.0.4'], 'the focus on its own node, never a listed sibling');
  await WALK.focusTo('1.0.9.0.1', null);
  assert.deepEqual([WALK.current()?.kind, WALK.current()?.addr], ['document', '1.0.9.0.1']);
  assert.deepEqual(WALK.siblingsNow().map((n) => n.addr), ['1.0.9.0.1'], 'an account the index lists nothing for: the document its own level\'s one node');
  await run(WALK.key('out'));
  assert.deepEqual([WALK.current()?.kind, WALK.current()?.addr], ['account', '1.0.9'], '← walks out to the account, itself placed among the listed accounts');
  assert.deepEqual(WALK.siblingsNow().map((n) => n.addr), ['1.0.1', '1.0.9']);
});

test('the ring is drawn where an act put the walk, whatever made it, and nowhere a re-take alone put it: a key\'s re-take onto another element draws none, one back onto the element the act put the walk on draws it there again, and the launch\'s rest draws none (issue #559\'s design decision)', async () => {
  await WALK.focusTo(D, 15);
  assert.equal(WALK.ringShown(), true, 'a landing: the ring drawn there');
  // the camera over the account's region at the whole board's scale, the focus on the span: the re-take moves it to the account
  const cell = accountCell('1.0.1');
  CAM.set({ x: cell.x + cell.w / 2, y: cell.y + cell.h / 2, scale: CAM.viewForCell(boardCell('1'), 0.92).scale });
  assert.equal(lodOf(CAM.cam.scale).name, 'far~mid', 'the scale\'s grain is the account');
  await WALK.retakeFromView(true);
  assert.deepEqual([WALK.current()?.kind, WALK.current()?.addr, WALK.ringShown()], ['account', '1.0.1', false], 'a key\'s camera move re-takes the focus on the account: no ring, no act having put the walk there');
  // back over the span's line at D's reading scale: the re-take brings the walk back to the span the landing put it on
  CAM.set(CAM.viewAt(LAYER.centreOf(D, 11), LAYER.foldOf(REC.doc(D)).fs, 12.5));
  await WALK.retakeFromView();
  assert.deepEqual([walkAt(), WALK.ringShown()], [['block', D, 11], true], 'a re-take back onto the span the landing put the walk on: the ring there again');
  await WALK.restAt('1.0.1');
  assert.deepEqual([walkAt(), WALK.ringShown()], [['account', '1.0.1', null], false], 'the launch\'s rest: no act put the walk there, no ring');
  await run(WALK.key('in'));
  assert.equal(WALK.ringShown(), true, 'a walk key\'s move from it: the ring drawn');
});

test('a landing whose read a later move overtook sets nothing when the read answers: the walk stands where the later move put it', async () => {
  partly();
  const release = fake.hold('op', { frame: F.retrieveV(G, 1, G_TEXT.length) });
  const first = WALK.focusTo(G, 10);
  await WALK.focusTo(D, 15);
  release();
  await first;
  assert.equal(REC.doc(G).to, G_TEXT.length + 1, 'G\'s text was read whole');
  assert.deepEqual(walkAt(), ['block', D, 11], 'the walk on the span the later landing named');
  assert.equal(WALK.landedAt(), 15, 'and its position');
  assert.deepEqual(fake.unanswered, []);
});

test('→ whose read a later walk key overtook enters nothing when the read answers', async () => {
  partly();
  await WALK.focusTo(G, null);
  assert.deepEqual(WALK.siblingsNow().map((n) => n.addr), [D, E, G]);
  // the camera at G's reading scale, where → enters its spans and reads them first
  CAM.set(CAM.viewAt(LAYER.centreOf(G, null), LAYER.foldOf(REC.doc(G)).fs, 12.5));
  const text = FAKE.keyOf('op', { frame: F.retrieveV(G, 1, G_TEXT.length) }), from = fake.asked.length;
  const release = fake.hold('op', { frame: F.retrieveV(G, 1, G_TEXT.length) });
  const entering = WALK.key('in');
  await run(WALK.key('up'));
  assert.ok(fake.asked.slice(from).includes(text), '→ asked for G\'s text before ↑ overtook it');
  release();
  await run(entering);
  assert.deepEqual(walkAt(), ['document', E, null], 'the walk where ↑ put it, not inside G');
  assert.deepEqual(WALK.siblingsNow().map((n) => n.addr), [D, E, G]);
  await run(WALK.key('out'));
  assert.deepEqual(walkAt(), ['account', '1.0.1', null], '← walks out to the account: the levels above stand as ↑ left them');
  assert.deepEqual(fake.unanswered, []);
});

test('a walk key whose flight waits on a read flies the camera nowhere once a later move overtook it', async () => {
  partly();
  await WALK.focusTo(G, null);
  await run(WALK.key('up'));
  REC.invalidate(G);
  const release = fake.hold('op', { frame: F.retrieveDocVSpanSet(G) });
  const stepping = WALK.key('down');
  assert.deepEqual(walkAt(), ['document', G, null], '↓ moved the walk onto G, its extent read before the camera follows');
  await WALK.focusTo(D, 15);
  const at = CAM.view();
  release();
  await run(stepping);
  assert.deepEqual(walkAt(), ['block', D, 11]);
  assert.deepEqual(CAM.view(), at, 'the camera where the later landing left it');
  assert.deepEqual(fake.unanswered, []);
});

test('a walk key whose flight a later walk key cut short ends: the walk on the span the later key reached', async () => {
  await WALK.focusTo(D, 1);
  const first = WALK.key('down');
  const cut = CAM.cam.anim;
  assert.ok(cut, '↓ flies the camera to the span below');
  const second = WALK.key('down');
  assert.ok(CAM.cam.anim && CAM.cam.anim !== cut, 'a second ↓ flies on, cutting the first one\'s flight short');
  await run(second);
  await run(first);
  assert.deepEqual(walkAt(), ['block', D, 27]);
});

/** the index listing the documents given, all of account 1.0.1 */
const index = (/** @type {string[]} */ docs) => REC.takeIndex(/** @type {any} */ ({ docs: docs.map((doc) => ({ doc, kind: 'edition', label: doc, standing: 'public' })), counts: [{ account: '1.0.1', documents: docs.length }], state: { arm: 'complete' } }));

test('nearer than mid the walk takes a span only inside a document at its own reading scale: over a continuation document at the near band a re-take stands it on the document whole, collapsed, and → there enters nothing; at the document\'s own reading scale the re-take takes the span under the view\'s centre (issue #140)', async () => {
  await PUMP.loadWhole(C1);
  index([D, E, C1]);
  try {
    const fs = LAYER.foldOf(REC.doc(C1)).fs, at = LAYER.centreOf(C1, 15);
    // the near band over the line holding position 15: the band's standard em 14 px, C1's own a seventh of it, where a click teleports
    CAM.set({ ...at, scale: 14 / STANDARD_FS });
    assert.equal(lodOf(CAM.cam.scale).name, 'near');
    assert.ok(fs * CAM.cam.scale < LOD_TXT_LO, `C1's own em ${fs * CAM.cam.scale} px, below the readable threshold`);
    await WALK.focusTo(D, 15);
    await WALK.retakeFromView(true);
    assert.deepEqual(walkAt(), ['document', C1, null], 'the re-take stands the walk on the document whole, as at mid');
    assert.equal(WALK.collapsed(), true, 'collapsed: its spans are Enter\'s act\'s');
    const view = CAM.view();
    await run(WALK.key('in'));
    assert.deepEqual(walkAt(), ['document', C1, null], '→ enters nothing');
    assert.deepEqual(CAM.view(), view, 'and flies the camera nowhere');
    // C1's own reading scale, over the same line: the re-take takes the span there
    CAM.set(CAM.viewAt(at, fs, 12.5));
    await WALK.retakeFromView(true);
    assert.deepEqual(walkAt(), ['block', C1, 11], 'the span under the view\'s centre');
    await run(WALK.key('out'));
    assert.deepEqual([...(walkAt() || []), WALK.collapsed()], ['document', C1, null, false], '← to its document at its reading scale: not collapsed');
  } finally {
    index([D, E]);
  }
});

test('a walk step onto a document from below its reading scale frames it just short of that scale, one stop, collapsed, however near its outline would frame it; from its reading scale a step frames it no nearer than the reading size (issue #55)', async () => {
  const fs = LAYER.foldOf(REC.doc(D)).fs, reading = CAM.landingPx();
  /** the em, in px, at which the camera reads a document where it stands */
  const em = (/** @type {string} */ addr) => CAM.view().scale * LAYER.foldOf(REC.doc(addr)).fs;
  assert.equal(LAYER.foldOf(REC.doc(E)).fs, fs, 'D and E are set at one size');
  assert.ok([D, E].every((a) => CAM.viewForCell(LAYER.shapeOf(a), 0.9).scale * fs >= reading), 'each, framed whole, would read past the reading size');
  CAM.set(CAM.viewForCell(accountCell('1.0.1'), 0.85));
  await WALK.focusTo('1.0.1', null);
  assert.equal(LAYER.atReadingScale(D), false, 'over the account\'s region D stands below its reading scale');
  await run(WALK.key('in'));
  const s = LAYER.shapeOf(D), v = CAM.view();
  assert.deepEqual([walkAt(), WALK.collapsed()], [['document', D, null], true], '→ at the account: D one stop, collapsed');
  assert.ok(em(D) < LOD_TXT_LO && em(D) > LOD_TXT_LO * 0.999, `D framed just short of its reading scale: em ${em(D)}`);
  assert.ok(Math.abs(v.x - (s.x + s.w / 2)) <= 1e-9 * Math.abs(v.x) && Math.abs(v.y - (s.y + s.h / 2)) <= 1e-9 * Math.abs(v.y), 'its outline centred');
  await run(WALK.key('down'));
  assert.deepEqual([walkAt(), WALK.collapsed()], [['document', E, null], true], '↓ to E: one stop, collapsed');
  assert.ok(em(E) < LOD_TXT_LO && em(E) > LOD_TXT_LO * 0.999, `E framed just short of its reading scale: em ${em(E)}`);
  CAM.set(CAM.viewAt(LAYER.centreOf(D, null), fs));
  await WALK.focusTo(D, null);
  await run(WALK.key('down'));
  assert.deepEqual([walkAt(), WALK.collapsed()], [['document', E, null], false], 'from D at its reading size, ↓ to E: expanded');
  assert.ok(Math.abs(em(E) - reading) < 1e-6, `E at the reading size, ${reading} px an em: ${em(E)}`);
});

test('the mirror\'s item at a withheld run says the run\'s own part — its kind, its document, its length and its origin, which need no read — and its origin\'s one description is made from the run\'s placeholder: the owner of its origin, the entitlement arm for the reader and C-67\'s clause where the origin\'s edition claims decide one, none while their reads are out (R56; R94; PUB-5.124; issue #288\'s design decision: "The mirror gives each origin one description, and every run points to it")', () => {
  // a document of 1.0.2's windowing a run of 1.0.1.1's: an unallocated sub-account, whose owner is the seat above it
  const W = '1.0.2.0.5', O = '1.0.1.1.0.2', owner = '1.0.1';
  REC.takeOwner('1.0.1.1', { prefix: owner, principal: 900 });
  const text = 'Tumbler.\n\n', n = byteLength(text);
  REC.takeSpanSet(W, [{ subspace: 1, ordinal: 1, positions: n + 240 }]);
  REC.takeDelivery(W, [{ pos: 1, width: n, kind: 'content', text, ref: null, origin: null }, { pos: n + 1, width: 240, kind: 'withheld', text: '', ref: null, origin: O }]);
  const d = REC.doc(W), run = d.blocks[1], node = { kind: /** @type {const} */ ('block'), addr: W, pos: run.pos, link: null };
  assert.deepEqual([run.kind, run.origin], ['withheld', O]);
  // two edition claims of the owner's, each homed in a published edition of theirs: one over its own fresh bytes, one quoting the draft
  const R20 = '1.1.0.1.0.1.0.3.14', OWN = '1.0.1.0.9.0.2.1', QUOTES = '1.0.1.0.11.0.2.1';
  for (const [c, from] of /** @type {Array<[string, string]>} */ ([[OWN, '1.0.1.0.9.0.1.1'], [QUOTES, O + '.0.1.1']])) {
    REC.takeLink({ addr: c, from: [resolveSpan({ start: from, width: '0.0.0.0.0.0.0.20' })], to: [resolveSpan(unitSpan(O))], type: R20 });
    const home = /** @type {string} */ (homeOf(c));
    REC.takeMetadata(home, { doc: home, published: true, owner, birth: home + '.1', birthExtent: 20, placed: null, baseExtent: null, source: null, asOf: 1 });
  }
  /** @type {Array<[string, () => void, string | null]>} each state of the origin's claims the page holds, and the words of the clause it decides — `CLAUSE_READING` while their reads are out */
  const states = [
    ['no claim read', () => REC.claimsChanged(O, false), CLAUSE_READING],
    ['no claim on the origin', () => REC.takeEditionClaims(O, []), null],
    ['the owner\'s edition over its own bytes', () => REC.takeEditionClaims(O, [QUOTES, OWN]), t('C-67.pointer')],
    ['an edition quoting the draft alone', () => REC.takeEditionClaims(O, [QUOTES]), t('C-67.quoting', { claimant: owner })],
  ];
  const signedIn = REC.session();
  // the device's key store as `fingerprint` answers it: a key bound at this board, or none
  const ORIGIN = 'http://127.0.0.1:8642', BOUND = [{ bindings: [ORIGIN + ' principal 1 account 1.0.1'] }];
  /** @type {Array<[typeof signedIn, Array<{bindings: string[]}>, string]>} each reader, the device's keys, and the arm the rule gives them */
  const readers = [[signedIn, BOUND, 'C-36.owner-grant.arm'], [null, BOUND, 'C-36.guest.key'], [null, [], 'R56.key-absent']];
  try {
    for (const [reader, keys, id] of readers) {
      REC.setSession(reader); REC.takeKeyStore(keys, ORIGIN);
      const who = reader ? reader.account : keys.length ? 'a guest with a key for this board' : 'a guest with no key';
      const rule = entitlementArm({ account: reader ? reader.account : null, keyPresent: keys.length > 0 }, owner), arm = rule.text;
      assert.equal(rule.id, id, `${who}: the rule's arm is ${id}`);
      for (const [state, hold, clause] of states) {
        hold();
        assert.equal(WALK.nameOf(node, 1, 2), t('L.mirror.withheld', { kind: t('L.item.withheld'), document: W, length: t('L.item.positions', { n: 240 }), origin: O }) + ' ' + t('L.mirror.item', { i: 2, n: 2 }),
          `${who}, ${state}: the run's own part, in any state of its claims`);
        const html = withheldBlockHTML(run, LAYER.viewFor(d));
        if (clause === CLAUSE_READING) {
          assert.equal(WALK.originWords(node), null, `${who}, ${state}: no description before the reads it waits on answer`);
          assert.ok(html.includes(' data-holds="reading"') && !html.includes('wh-key'), `${who}, ${state}: the plane's gap its ground alone: ${html}`);
          continue;
        }
        assert.deepEqual(WALK.originWords(node), { origin: O, words: t('L.mirror.withheld.origin', { owner, arm, clause: clause ? t('L.mirror.clause', { clause }) : '' }) },
          `${who}, ${state}: its origin's description names ${owner}, the owner of the run's origin — never ${W}'s account, nor ${O}'s — the arm for that owner and this reader, and the clause the claims decide, a sentence of its own or nothing in its place`);
        assert.ok(html.includes(` data-owner="${owner}"`) && html.includes(`data-key="${O}"`), `${who}, ${state}: the plane's gap carries the same owner, and the run's key: ${html}`);
      }
    }
  } finally {
    REC.setSession(signedIn); REC.takeKeyStore([], ORIGIN);
  }
});

test('the mirror announces every block that holds no text by its kind, in the words a copy\'s stand-in names it by — a record with the words and keys the plane shows of it, a reference, hex and an atom of no record\'s value as an item this client cannot show with its length — and never reads its raw value aloud (issue #161; R94)', () => {
  // a home document of 1.0.2's: its key record, a link position's reference, four bytes of hex, a retirement record, which
  // the record rule renders as no record
  const H = '1.0.2.0.1';
  const record = JSON.stringify({ type: 'skep-enroll', keys: [{ alg: 'mldsa65-ed25519', key: 'ab'.repeat(16), anchor: true, label: 'paper' }, { alg: 'mldsa65-ed25519', key: 'cd'.repeat(16), anchor: false, label: 'notebook' }] });
  const retire = JSON.stringify({ type: 'skep-retire', fingerprints: ['ef'.repeat(32)] });
  REC.takeSpanSet(H, [{ subspace: 1, ordinal: 1, positions: 7 }]);
  REC.takeDelivery(H, [
    { pos: 1, width: 1, kind: 'atom', text: record, ref: null, origin: null },
    { pos: 2, width: 1, kind: 'ref', text: '', ref: H + '.0.2.1', origin: null },
    { pos: 3, width: 4, kind: 'hex', text: 'deadbeef', ref: null, origin: null },
    { pos: 7, width: 1, kind: 'atom', text: retire, ref: null, origin: null },
  ]);
  const d = REC.doc(H), made = { addr: H, runs: d.runs, blocks: d.blocks, image: d.image };
  // what the plane shows of the record: its words and its keys line, read from the article T-ARTICLE makes
  const html = articleHTML(d, LAYER.viewFor(d), REC.ownerAccount(d));
  const shows = (/** @type {string} */ cls) => ((new RegExp(`<span class="${cls}">((?:[^<]|<span class="id">[^<]*</span>)*)</span>`).exec(html) || [])[1] || '').replace(/<[^>]*>/g, '').replace(/&amp;/g, '&');
  const plane = [shows('rec-words'), shows('derived')];
  assert.ok(plane.every(Boolean), `the plane shows the record's words and keys: ${html}`);
  /** @type {Array<[number, string, string]>} each block: its first position, its kind's words, what the plane shows after them */
  const want = [
    [1, t('L.item.record'), t('L.mirror.shows', { shown: plane.join(' · ') })],
    [2, t('L.item.reference'), ''],
    [3, t('L.item.unshown'), t('L.mirror.shows', { shown: t('L.item.positions', { n: 4 }) })],
    [7, t('L.item.unshown'), t('L.mirror.shows', { shown: t('L.item.positions.1') })],
  ];
  for (const [pos, kind, shown] of want) {
    const item = WALK.nameOf({ kind: 'block', addr: H, pos, link: null }, 0, 4);
    assert.equal(item, t('L.mirror.no-text', { kind, p: pos, extent: 7, document: H, same: '', shown }) + ' ' + t('L.mirror.item', { i: 1, n: 4 }), `the item at ${pos}: its kind, where it stands, what the plane shows`);
    assert.ok(!/[{}]|skep-enroll|skep-retire|abab|cdcd|efef|deadbeef/.test(item), `the item at ${pos} reads no raw value aloud: ${item}`);
    const b = /** @type {import('../model/records.js').Block} */ (d.blocks.find((x) => x.pos === pos));
    assert.ok(copyText(made, { addr: H, pos, width: b.width }, (a) => a).startsWith('[' + kind), `a copy's stand-in at ${pos} names the kind the mirror announces, "${kind}"`);
  }
});

test('the mirror names a document no read or listing has told the kind of by its kind\'s slot being read, leading, and no state; one the board said nothing about led by a far end\'s words for it — never "published": the item a jump\'s walk stands on before its read answers, and after it learns the board says nothing; its metadata read, led by its kind (FP-25, FP-34; issue #137; issue #423\'s design decision: "the slot\'s word leads the item")', () => {
  // an address in an account the index lists nothing for, never read
  const U = '1.0.7.0.4';
  const unread = WALK.nameOf({ kind: 'document', addr: U, pos: null, link: null }, 0, 1);
  assert.equal(unread, t('L.mirror.document', { kind: t('L.slot.reading'), document: U, label: '', state: '', extent: '' }) + ' ' + t('L.mirror.item', { i: 1, n: 1 }), 'nothing told of it: its kind being read, no state');
  assert.ok(!unread.includes(t('F.published')) && !unread.includes(t('F.kind.draft')), `never "published", nor "draft": ${unread}`);
  REC.takeRefused(U, 'unregistered');
  const gone = WALK.nameOf({ kind: 'document', addr: U, pos: null, link: null }, 0, 1);
  assert.ok(gone.startsWith(`${t('L.far.unregistered')} document ${U},`) && !gone.includes(t('F.published')), `the board said nothing about it: led by a far end's words for it: ${gone}`);
  REC.invalidate(U);
  REC.takeMetadata(U, { doc: U, published: false, owner: '1.0.7', birth: null, birthExtent: null, placed: null, baseExtent: null, source: null, asOf: 1 });
  assert.ok(WALK.nameOf({ kind: 'document', addr: U, pos: null, link: null }, 0, 1).startsWith(`${t('F.kind.draft')} document ${U},`), 'its metadata read: led by its kind, "draft"');
  REC.invalidate(U);
});

test('the mirror names a document a read answered `withheld` by its withheld box\'s words — its owner by the one owner rule — and never "published" (B1-S2)', () => {
  // a draft in 1.0.2's sub-account 1.0.2.1, withheld from the reader: its owner the seat above the sub-account
  const X = '1.0.2.1.0.2', owner = '1.0.2';
  REC.takeOwner('1.0.2.1', { prefix: owner, principal: 901 });
  REC.takeRefused(X, 'withheld');
  const box = t('F.corner.withheld', { owner });
  assert.equal(LAYER.withheldBox(REC.doc(X)), box, 'the box names the seat that owns the document, never its sub-account');
  const item = WALK.nameOf({ kind: 'document', addr: X, pos: null, link: null }, 0, 1);
  assert.ok(item.startsWith(`${box} document ${X},`), `the item says what the box says, leading where no kind can be read: ${item}`);
  assert.ok(!item.includes(t('F.published')), `and never that the document is published: ${item}`);
});

/** the ids of the mirror's items at tabindex 0, read from the markup the rebuild wrote */
const itemStops = (/** @type {string} */ html) => [...html.matchAll(/<li\b[^>]*>/g)].filter((m) => / tabindex="0"/.test(m[0])).map((m) => (/ id="([^"]*)"/.exec(m[0]) || [])[1]);

// placed last: it attaches a mirror, which every test above runs without
test('the plane is one Tab stop: the current item while it stands, the tree out of the order — a landing the index does not list included', async () => {
  const platform = globalThis.document;
  globalThis.document = /** @type {any} */ ({ activeElement: null }); // the platform's focus on none of the mirror
  const mirror = { innerHTML: '', tabIndex: 0, contains: () => false, setAttribute() {}, classList: { toggle() {} } };
  WALK.attach(/** @type {any} */ (mirror));
  try {
    await WALK.focusTo(D, 15);
    assert.deepEqual(itemStops(mirror.innerHTML), ['walk-' + WALK.mirrorIndex()], 'the current item alone of the items is in the order');
    assert.equal(mirror.tabIndex, -1, 'the tree is out of the order while its current item stands');
    // a document in an account the index lists nothing for: its own node is the level's one item, and the stop
    await WALK.focusTo('1.0.9.0.1', null);
    assert.equal(WALK.mirrorSize(), 1);
    assert.deepEqual(itemStops(mirror.innerHTML), ['walk-0']);
    assert.equal(mirror.tabIndex, -1, 'the item is the stop, the tree out of the order');
    assert.ok(mirror.innerHTML.includes('1.0.9.0.1'), 'the mirror names the place landed on');
  } finally {
    globalThis.document = platform;
  }
});

test('the mirror\'s item shows what it says, each address in the identifier\'s face and a span\'s words in the reading face — its words its accessible name, unchanged (issue #16)', async () => {
  const platform = globalThis.document;
  globalThis.document = /** @type {any} */ ({ activeElement: null });
  const mirror = { innerHTML: '', tabIndex: 0, contains: () => false, setAttribute() {}, classList: { toggle() {} } };
  WALK.attach(/** @type {any} */ (mirror));
  try {
    await WALK.focusTo(D, 15);
    const i = WALK.mirrorIndex(), li = (new RegExp(`<li[^>]*id="walk-${i}"[^>]*>(.*?)</li>`).exec(mirror.innerHTML) || [])[1] || '';
    const b = /** @type {import('../model/records.js').Block} */ (REC.doc(D).blocks.find((x) => x.pos === WALK.current()?.pos));
    assert.ok(li.includes(`<span class="id">${D}</span>`) && li.includes(`<span class="reading">${esc(b.text)}</span>`), `the document's address the identifier's, the span's words the reading face's: ${li}`);
    assert.equal(li.replace(/<[^>]*>/g, '').replace(/&quot;/g, '"').replace(/&amp;/g, '&'), WALK.mirrorItem(i), 'its words the item\'s accessible name');
  } finally {
    globalThis.document = platform;
  }
});

// placed last with the tests around it: it attaches a mirror of its own
test('the tree is named from ST as the walk attaches it, and each level\'s group by its own level', async () => {
  const platform = globalThis.document;
  globalThis.document = /** @type {any} */ ({ activeElement: null });
  /** @type {Record<string, string>} the attributes the walk set on the tree */
  const attrs = {};
  const mirror = { innerHTML: '', tabIndex: 0, contains: () => false, setAttribute: (/** @type {string} */ k, /** @type {string} */ v) => { attrs[k] = v; }, classList: { toggle() {} } };
  /** the group's name, read from the markup the rebuild wrote */
  const group = () => (/<ul role="group" aria-label="([^"]*)">/.exec(mirror.innerHTML) || [])[1];
  try {
    WALK.attach(/** @type {any} */ (mirror));
    assert.equal(attrs['aria-label'], t('L.mirror-label'), 'the tree, named as it is attached');
    await WALK.focusTo(D, 15);
    assert.equal(group(), t('L.mirror-level', { n: 4 }), 'a span\'s group: board › account › document › span');
    assert.ok(mirror.innerHTML.includes(t('L.mirror.item', { i: 2, n: 3 })), 'each item named from ST: its place in the set');
    await WALK.focusTo(D, null);
    assert.equal(group(), t('L.mirror-level', { n: 3 }), 'a document\'s group');
  } finally {
    globalThis.document = platform;
  }
});

// placed last with the tests around it: it attaches a mirror of its own
test('while chrome covers the plane the tree is inert, through the rebuild, until the plane is uncovered', async () => {
  const platform = globalThis.document;
  globalThis.document = /** @type {any} */ ({ activeElement: null });
  const mirror = { innerHTML: '', tabIndex: 0, inert: false, contains: () => false, setAttribute() {}, classList: { toggle() {} } };
  try {
    WALK.attach(/** @type {any} */ (mirror));
    WALK.cover(true);
    await WALK.focusTo(D, 15);
    assert.ok(mirror.innerHTML.includes('role="treeitem"'), 'the landing rebuilt the tree');
    assert.equal(mirror.inert, true, 'the rebuild keeps the tree out of the order while the plane is covered');
    WALK.cover(false);
    assert.equal(mirror.inert, false, 'uncovered: the tree back in the order');
  } finally {
    globalThis.document = platform;
  }
});

// placed last with the tests around it: it attaches a mirror of its own
test('each document\'s item in the mirror says whether it is expanded — at its own reading scale — or collapsed, read at the view the camera is bound for, and is marked again in place as the camera takes it across its threshold, nothing rebuilt (issue #140)', async () => {
  const platform = globalThis.document;
  globalThis.document = /** @type {any} */ ({ activeElement: null });
  /** @type {Array<{attrs: Record<string, string>, dataset: {addr?: string, i?: string}, getAttribute: (k: string) => string | null, setAttribute: (k: string, v: string) => void}>} the items the last rebuild wrote, as elements, each marked in place */
  let items = [];
  let rebuilds = 0;
  const mirror = {
    tabIndex: 0, contains: () => false, setAttribute() {}, classList: { toggle() {} },
    get innerHTML() { return ''; },
    set innerHTML(/** @type {string} */ html) {
      rebuilds++;
      items = [...html.matchAll(/<li\b[^>]*>/g)].map((m) => {
        /** @type {Record<string, string>} */
        const attrs = Object.fromEntries([...m[0].matchAll(/ ([\w-]+)="([^"]*)"/g)].map((a) => [a[1], a[2]]));
        return { attrs, dataset: { addr: attrs['data-addr'], i: attrs['data-i'] }, getAttribute: (k) => attrs[k] ?? null, setAttribute: (k, v) => { attrs[k] = v; } };
      });
    },
    querySelectorAll: (/** @type {string} */ sel) => (sel === 'li[aria-expanded]' ? items.filter((i) => 'aria-expanded' in i.attrs) : []),
  };
  /** each of D's, E's and C1's items' `aria-expanded`, by its address — the account lists every box the plane draws (M-REC's `known`), the documents the tests above read among them */
  const expanded = () => Object.fromEntries(items.filter((i) => [D, E, C1].includes(i.attrs['data-addr'] || '')).map((i) => [i.attrs['data-addr'], i.getAttribute('aria-expanded')]));
  await PUMP.loadWhole(C1);
  index([D, E, C1]);
  try {
    WALK.attach(/** @type {any} */ (mirror));
    const fs = LAYER.foldOf(REC.doc(C1)).fs, reading = CAM.viewAt(LAYER.centreOf(C1, null), fs, 12.5);
    // the near band over D: D and E at their reading scale, C1 a seventh of their size and below its own
    const b = docBox(D);
    CAM.set({ x: b.x + b.w / 2, y: b.y + b.h / 2, scale: 14 / STANDARD_FS });
    await WALK.focusTo(C1, null);
    assert.deepEqual(expanded(), { [D]: 'true', [E]: 'true', [C1]: 'false' }, 'the rebuild: each document by its own em');
    assert.equal(WALK.collapsed(), true);
    // the camera at C1's own reading scale: its item marked expanded in place, no rebuild
    const was = rebuilds;
    CAM.set(reading);
    WALK.markExpanded();
    assert.deepEqual(expanded(), { [D]: 'true', [E]: 'true', [C1]: 'true' }, 'C1 at its reading scale: expanded');
    assert.equal(WALK.collapsed(), false);
    // a flight bound for the whole board, not yet flown: each read where the camera is bound, collapsed
    const flight = CAM.fly(CAM.viewForCell(boardCell('1'), 0.92), 300);
    WALK.markExpanded();
    assert.deepEqual(expanded(), { [D]: 'false', [E]: 'false', [C1]: 'false' }, 'bound for the whole board: every document collapsed');
    assert.equal(WALK.collapsed(), true, 'a key made during the flight acts where it lands');
    // and back at the near band, the flight cut short
    CAM.set({ x: b.x + b.w / 2, y: b.y + b.h / 2, scale: 14 / STANDARD_FS });
    assert.equal(await flight, false);
    WALK.markExpanded();
    assert.deepEqual(expanded(), { [D]: 'true', [E]: 'true', [C1]: 'false' });
    assert.equal(rebuilds, was, 'every mark made in place, nothing rebuilt');
  } finally {
    globalThis.document = platform;
    index([D, E]);
  }
});

test('the mirror\'s item at a link whose far end floats says "its passage is not in ⟨D⟩\'s current text", as its symbol and its stub do; one whose far end stands somewhere says nothing of it', () => {
  const L = D + '.0.2.1', FAR = '1.0.1.0.127';
  const span = (/** @type {string} */ doc, /** @type {number} */ ord, /** @type {number} */ w) => ({ start: `${doc}.0.1.${ord}`, width: '0.0.0.0.0.0.0.' + w, doc, account: '1.0.1', whole: false, subspace: 1, ordinal: ord, positions: w });
  REC.takeLinks(D, [L]);
  REC.takeLink({ addr: L, from: [span(D, 11, 3)], to: [span(FAR, 8, 4)], type: '1.1.0.1.0.1.0.3.13' });
  const item = () => { const s = LK.shown(D).find((x) => x.link.addr === L); return s ? WALK.nameOf({ kind: 'link', addr: D, pos: s.pos, link: s }, 0, 1) : ''; };
  const floating = t('L.mirror.floating', { sentence: t('F.floating', { D: FAR }) });
  REC.takeProjection(L, 2, FAR, []);
  assert.ok(item().includes(floating), item());
  // FAR's text as an edit left it: other bytes, then the passage's four from FAR's 20
  REC.takeImage(FAR, 1, [{ iStart: '1.0.1.0.99.0.1.1', width: 19 }, { iStart: FAR + '.0.1.8', width: 4 }, { iStart: '1.0.1.0.99.0.1.20', width: 20 }]);
  try {
    REC.takeProjection(L, 2, FAR, [{ pos: 20, width: 2 }]);
    const part = t('L.held.part', { subject: t('L.held.followed'), where: t('L.held.current', { D: FAR }) });
    assert.ok(item().includes(t('L.mirror.floating', { sentence: part })), `two of its four bytes there: the line, as its symbol and its stub say it (issue #153): ${item()}`);
    REC.takeProjection(L, 2, FAR, [{ pos: 20, width: 4 }]);
    assert.ok(item() !== '' && !item().includes(t('F.floating', { D: FAR })) && !item().includes(part), item());
  } finally { REC.invalidate(FAR); }
});

test('the mirror\'s item at a link whose far end\'s text holds part of its passage in two runs, that text showing withheld text, says the line whole — the rest maybe under the withheld text — counting no runs, its words opening on the short form its symbol and its stub say (issue #242\'s design decision: "Stubs and symbols show the start of the card\'s and mirror\'s full phrase")', () => {
  const L = D + '.0.2.1', FAR = '1.0.1.0.127';
  const span = (/** @type {string} */ doc, /** @type {number} */ ord, /** @type {number} */ w) => ({ start: `${doc}.0.1.${ord}`, width: '0.0.0.0.0.0.0.' + w, doc, account: '1.0.1', whole: false, subspace: 1, ordinal: ord, positions: w });
  REC.takeLinks(D, [L]);
  REC.takeLink({ addr: L, from: [span(D, 11, 3)], to: [span(FAR, 8, 4)], type: '1.1.0.1.0.1.0.3.13' });
  // FAR's text: twenty positions holding the passage's first two bytes at 3 and its last at 12, other bytes about them, then ten withheld from the reader
  REC.takeDelivery(FAR, [{ pos: 1, width: 20, kind: 'content', text: 'The far text, twenty', ref: null, origin: null }, { pos: 21, width: 10, kind: 'withheld', text: '', ref: null, origin: '1.0.2.0.6' }]);
  REC.takeImage(FAR, 1, [{ iStart: FAR + '.0.1.100', width: 2 }, { iStart: FAR + '.0.1.8', width: 2 }, { iStart: FAR + '.0.1.102', width: 7 }, { iStart: FAR + '.0.1.11', width: 1 }, { iStart: FAR + '.0.1.109', width: 18 }]);
  try {
    REC.takeProjection(L, 2, FAR, [{ pos: 3, width: 2 }, { pos: 12, width: 1 }]);
    const s = /** @type {import('../links/links.js').Shown} */ (LK.shown(D).find((x) => x.link.addr === L));
    const item = WALK.nameOf({ kind: 'link', addr: D, pos: s.pos, link: s }, 0, 1);
    const part = t('L.held.part', { subject: t('L.held.followed'), where: t('L.held.current', { D: FAR }) });
    assert.ok(item.includes(t('L.mirror.floating', { sentence: part + t('L.held.withheld') })), `the line whole, nothing between its two clauses: ${item}`);
    assert.ok(farShort(s) === part && item.includes(t('L.mirror.floating', { sentence: farShort(s) })), `its words open on the symbol's and the stub's: ${item}`);
    assert.ok(!/places/.test(item), `no count of the runs holding it: ${item}`);
  } finally { REC.invalidate(FAR); }
});

test('the mirror\'s item at a link names its far end as its tail and its card do: its address alone while nothing is answered of its document, then the words the board\'s answer gives (issue #132)', () => {
  const L = D + '.0.2.2', GHOST = '1.0.1.0.1049578', THEIRS = '1.0.2.0.99';
  const span = (/** @type {string} */ doc, /** @type {number} */ ord, /** @type {number} */ w) => ({ start: `${doc}.0.1.${ord}`, width: '0.0.0.0.0.0.0.' + w, doc, account: doc.split('.').slice(0, 3).join('.'), whole: false, subspace: 1, ordinal: ord, positions: w });
  REC.takeLinks(D, [L]);
  REC.takeLink({ addr: L, from: [span(D, 12, 3)], to: [span(GHOST, 1, 4)], type: '1.1.0.1.0.1.0.3.13' });
  const item = () => { const s = LK.shown(D).find((x) => x.link.addr === L); return s ? WALK.nameOf({ kind: 'link', addr: D, pos: s.pos, link: s }, 0, 1) : ''; };
  assert.equal(item(), t('L.mirror.link', { link: L, type: '1.1.0.1.0.1.0.3.13', direction: t('F.card.to'), far: GHOST, floating: '' }) + ' ' + t('L.mirror.item', { i: 1, n: 1 }), 'nothing answered: the address alone');
  REC.takeProjection(L, 2, GHOST, 'unregistered');
  assert.ok(item().includes(`${t('F.card.to')} ${GHOST} · ${t('L.client-words', { words: t('L.far.empty') })}`), `the board saying nothing of an address of the reader's own account the complete index lists nothing at, the client's words bracketed: ${item()}`);
  REC.takeLink({ addr: L, from: [span(D, 12, 3)], to: [span(THEIRS, 1, 4)], type: '1.1.0.1.0.1.0.3.13' });
  REC.takeProjection(L, 2, THEIRS, 'unregistered');
  assert.ok(item().includes(`${t('F.card.to')} ${THEIRS} · ${t('L.client-words', { words: t('L.far.unknown') })}`), `another account's: ${item()}`);
  REC.invalidate(THEIRS); REC.invalidate(GHOST);
});

// placed last with the tests around it: it attaches a mirror of its own
test('the items Back\'s light stands on carry aria-current="location" — each span holding a stretch of the passage carried, or the link\'s end the follow was made at — written at the rebuild and marked again in place, on those items alone, until the light goes out; a landing naming a link\'s end stands the walk on its item (issue #152)', async () => {
  const platform = globalThis.document;
  globalThis.document = /** @type {any} */ ({ activeElement: null });
  /** @typedef {{attrs: Record<string, string>, dataset: {i?: string}, getAttribute: (k: string) => string | null, setAttribute: (k: string, v: string) => void, removeAttribute: (k: string) => void}} Item */
  /** @type {Item[]} the items the last rebuild wrote, as elements, each marked in place */
  let items = [];
  let rebuilds = 0;
  const mirror = {
    tabIndex: 0, contains: () => false, setAttribute() {}, classList: { toggle() {} },
    get innerHTML() { return ''; },
    set innerHTML(/** @type {string} */ html) {
      rebuilds++;
      items = [...html.matchAll(/<li\b[^>]*>/g)].map((m) => {
        /** @type {Record<string, string>} */
        const attrs = Object.fromEntries([...m[0].matchAll(/ ([\w-]+)="([^"]*)"/g)].map((a) => [a[1], a[2]]));
        return { attrs, dataset: { i: attrs['data-i'] }, getAttribute: (k) => attrs[k] ?? null, setAttribute: (k, v) => { attrs[k] = v; }, removeAttribute: (k) => { delete attrs[k]; } };
      });
    },
    querySelectorAll: (/** @type {string} */ sel) => (sel === 'li[role="treeitem"]' ? items : []),
  };
  /** the elements the items marked stand for: each one's kind and place */
  const marked = () => items.filter((i) => i.attrs['aria-current'] === 'location').map((i) => { const n = WALK.siblingsNow()[Number(i.attrs['data-i'])]; return [n.kind, n.pos]; });
  // a citation of the person's from D's "first", its far end another document whole
  const L = D + '.0.2.9', span = (/** @type {string} */ doc, /** @type {number} */ ord, /** @type {number} */ w) => ({ start: `${doc}.0.1.${ord}`, width: '0.0.0.0.0.0.0.' + w, doc, account: '1.0.1', whole: false, subspace: 1, ordinal: ord, positions: w });
  REC.takeLinks(D, [L]);
  REC.takeLink({ addr: L, from: [span(D, 15, 5)], to: [{ start: '1.0.1.0.127', width: '0.0.0.0.1', doc: '1.0.1.0.127', account: '1.0.1', whole: true, subspace: null, ordinal: null, positions: null }], type: '1.1.0.1.0.1.0.3.13' });
  const key = /** @type {import('../links/links.js').Shown} */ (LK.shown(D).find((x) => x.link.addr === L)).key;
  /** @type {import('./walk.js').Located | null} where Back's light stands, as N-GO answers it */
  let at = { addr: D, runs: [{ pos: 13, width: 3 }], end: null };
  try {
    WALK.attach(/** @type {any} */ (mirror));
    WALK.readers({ located: () => at });
    await WALK.focusTo(D, 13);
    assert.deepEqual(marked(), [['block', 11]], 'the rebuild: the span holding the passage\'s stretch, alone');
    const was = rebuilds;
    at = null;
    WALK.markLocated();
    assert.deepEqual(marked(), [], 'the light out: taken off in place');
    at = { addr: D, runs: [], end: { link: L, key } };
    WALK.markLocated();
    assert.deepEqual(marked(), [['link', 15]], 'the link\'s end the follow was made at: its item alone');
    at = { addr: D, runs: [{ pos: 5, width: 24 }], end: null };
    WALK.markLocated();
    assert.deepEqual(marked(), [['block', 1], ['block', 11], ['block', 27]], 'a passage across three spans: each span holding a stretch of it, and no link');
    at = { addr: E, runs: [{ pos: 1, width: 30 }], end: null };
    WALK.markLocated();
    assert.deepEqual(marked(), [], 'a light standing in another document marks no item here');
    assert.equal(rebuilds, was, 'every mark made in place, nothing rebuilt');
    at = null;
    await WALK.focusTo(D, 15, true, { link: L, key });
    assert.deepEqual(walkAt(), ['link', D, 15], 'a landing naming the link\'s end: the walk on its item');
    await WALK.focusTo(D, 15, true, { link: L, key: key + '-another' });
    assert.deepEqual(walkAt(), ['block', D, 11], 'an end its document\'s elements do not list: the span holding the position');
  } finally {
    globalThis.document = platform;
    WALK.readers({ located: () => null });
  }
});

// placed with the test above: it attaches a mirror of its own
test('the item a landing stands on takes its line as its description — aria-describedby naming the mirror\'s hidden description, which holds the line\'s words — written at the rebuild and marked again in place, on that item alone, until the landing says nothing (issue #153)', async () => {
  const platform = globalThis.document;
  globalThis.document = /** @type {any} */ ({ activeElement: null });
  /** @typedef {{attrs: Record<string, string>, dataset: {i?: string}, getAttribute: (k: string) => string | null, setAttribute: (k: string, v: string) => void, removeAttribute: (k: string) => void}} Item */
  /** @type {Item[]} the items the last rebuild wrote, as elements, each marked in place */
  let items = [];
  /** @type {{textContent: string} | null} the mirror's hidden description as the last rebuild wrote it */
  let words = null;
  let rebuilds = 0;
  const mirror = {
    tabIndex: 0, contains: () => false, setAttribute() {}, classList: { toggle() {} },
    get innerHTML() { return ''; },
    set innerHTML(/** @type {string} */ html) {
      rebuilds++;
      items = [...html.matchAll(/<li\b[^>]*>/g)].map((m) => {
        /** @type {Record<string, string>} */
        const attrs = Object.fromEntries([...m[0].matchAll(/ ([\w-]+)="([^"]*)"/g)].map((a) => [a[1], a[2]]));
        return { attrs, dataset: { i: attrs['data-i'] }, getAttribute: (k) => attrs[k] ?? null, setAttribute: (k, v) => { attrs[k] = v; }, removeAttribute: (k) => { delete attrs[k]; } };
      });
      const d = html.match(/<div id="walk-landing" hidden>([^<]*)<\/div>/);
      words = d ? { textContent: d[1] } : null;
    },
    querySelectorAll: (/** @type {string} */ sel) => (sel === 'li[role="treeitem"]' ? items : []),
    querySelector: (/** @type {string} */ sel) => (sel === '#walk-landing' ? words : null),
  };
  /** the elements the description stands on: each one's kind and place */
  const described = () => items.filter((i) => i.attrs['aria-describedby'] === 'walk-landing').map((i) => { const n = WALK.siblingsNow()[Number(i.attrs['data-i'])]; return [n.kind, n.pos]; });
  /** @type {import('./walk.js').Described | null} what the landing says, as N-GO answers it */
  let said = { addr: D, pos: 13, words: 'only part of the text you were reading is in version 3', runs: [] };
  try {
    WALK.attach(/** @type {any} */ (mirror));
    WALK.readers({ described: () => said });
    await WALK.focusTo(D, 13);
    assert.deepEqual([described(), words?.textContent], [[['block', 11]], said.words], 'the rebuild: the span holding the landing\'s position, alone, its description the line');
    const was = rebuilds;
    said = { ...said, words: 'all of the text you were reading is in version 3' };
    WALK.markDescribed();
    assert.deepEqual([described(), words?.textContent], [[['block', 11]], said.words], 'its words changed in place');
    said = null;
    WALK.markDescribed();
    assert.deepEqual([described(), words?.textContent], [[], ''], 'the landing says nothing: no description, its words emptied');
    said = { addr: E, pos: 1, words: 'its passage is not in version 2', runs: [] };
    WALK.markDescribed();
    assert.deepEqual(described(), [], 'a landing in another document describes no item here');
    assert.equal(rebuilds, was, 'every mark made in place, nothing rebuilt');
    said = { addr: D, pos: 13, words: 'its passage is not in version 2', runs: [] };
    await WALK.focusTo(D, null);
    assert.deepEqual(described(), [['document', null]], 'the walk on the document whole: the document\'s item described');
  } finally {
    globalThis.document = platform;
    WALK.readers({});
  }
});

// placed with the test above: it attaches a mirror of its own
test('a landing that crossed into its document from another says that document\'s kind first in the item\'s one announcement — a hidden description of its own, named before the line\'s, written at the rebuild and marked again in place — and its kind alone where the line says nothing; never on the document\'s own item, whose name leads with it (issue #423\'s design decision: "a landing into another document says that document\'s kind first in its one announcement")', async () => {
  const platform = globalThis.document;
  globalThis.document = /** @type {any} */ ({ activeElement: null });
  /** @type {Array<{attrs: Record<string, string>, dataset: {i?: string}, getAttribute: (k: string) => string | null, setAttribute: (k: string, v: string) => void, removeAttribute: (k: string) => void}>} */
  let items = [];
  /** @type {Map<string, {textContent: string}>} the hidden descriptions the last rebuild wrote, by id */
  let hidden = new Map();
  let rebuilds = 0;
  const mirror = {
    tabIndex: 0, contains: () => false, setAttribute() {}, classList: { toggle() {} },
    get innerHTML() { return ''; },
    set innerHTML(/** @type {string} */ html) {
      rebuilds++;
      items = [...html.matchAll(/<li\b[^>]*>/g)].map((m) => {
        /** @type {Record<string, string>} */
        const attrs = Object.fromEntries([...m[0].matchAll(/ ([\w-]+)="([^"]*)"/g)].map((a) => [a[1], a[2]]));
        return { attrs, dataset: { i: attrs['data-i'] }, getAttribute: (k) => attrs[k] ?? null, setAttribute: (k, v) => { attrs[k] = v; }, removeAttribute: (k) => { delete attrs[k]; } };
      });
      hidden = new Map([...html.matchAll(/<div id="([\w-]+)" hidden>([^<]*)<\/div>/g)].map((m) => [m[1], { textContent: m[2] }]));
    },
    querySelectorAll: (/** @type {string} */ sel) => (sel === 'li[role="treeitem"]' ? items : []),
    querySelector: (/** @type {string} */ sel) => hidden.get(sel.slice(1)) || null,
  };
  /** each item described: its kind and place, and the words of every description it names, in order */
  const described = () => items.filter((i) => i.attrs['aria-describedby']).map((i) => { const n = WALK.siblingsNow()[Number(i.attrs['data-i'])]; return [n.kind, n.pos, i.attrs['aria-describedby'].split(' ').filter((id) => !id.startsWith('walk-origin-')).map((id) => hidden.get(id)?.textContent)]; }).filter(([, , w]) => w.length);
  const line = 'only part of the text you were reading is in version 3', kind = t('F.kind.draft');
  /** @type {import('./walk.js').Described | null} what the landing says, as N-GO answers it */
  let said = { addr: D, pos: 13, words: line, kind, runs: [] };
  try {
    WALK.attach(/** @type {any} */ (mirror));
    WALK.readers({ described: () => said });
    await WALK.focusTo(D, 13);
    assert.deepEqual(described(), [['block', 11, [kind, line]]], 'the rebuild: the span holding the landing\'s position, its kind first, then the line');
    const was = rebuilds;
    said = { ...said, words: '' };
    WALK.markDescribed();
    assert.deepEqual(described(), [['block', 11, [kind]]], 'the line saying nothing: its kind alone, marked in place');
    said = { ...said, words: line, kind: null };
    WALK.markDescribed();
    assert.deepEqual(described(), [['block', 11, [line]]], 'a landing in the box it left: the line alone');
    assert.equal(rebuilds, was, 'every mark made in place, nothing rebuilt');
    said = { addr: D, pos: 13, words: line, kind, runs: [] };
    await WALK.focusTo(D, null);
    assert.deepEqual(described(), [['document', null, [line]]], 'the walk on the document whole: its item described by the line alone, its name leading with its kind');
  } finally {
    globalThis.document = platform;
    WALK.readers({});
  }
});

// placed with the tests above: it attaches a mirror of its own
test('where the landing\'s passage stands in several runs every other span holding one is described by that run\'s label, a hidden description of its own, and a step moves the landing\'s description from one to the next in place (issue #158: "Each run\'s accessible item carries its label")', async () => {
  const platform = globalThis.document;
  globalThis.document = /** @type {any} */ ({ activeElement: null });
  /** @typedef {{attrs: Record<string, string>, dataset: {i?: string}, getAttribute: (k: string) => string | null, setAttribute: (k: string, v: string) => void, removeAttribute: (k: string) => void}} Item */
  /** @type {Item[]} */
  let items = [];
  /** @type {Map<string, {textContent: string}>} the hidden descriptions the last rebuild wrote, by id */
  let hidden = new Map();
  let rebuilds = 0;
  const mirror = {
    tabIndex: 0, contains: () => false, setAttribute() {}, classList: { toggle() {} },
    get innerHTML() { return ''; },
    set innerHTML(/** @type {string} */ html) {
      rebuilds++;
      items = [...html.matchAll(/<li\b[^>]*>/g)].map((m) => {
        /** @type {Record<string, string>} */
        const attrs = Object.fromEntries([...m[0].matchAll(/ ([\w-]+)="([^"]*)"/g)].map((a) => [a[1], a[2]]));
        return { attrs, dataset: { i: attrs['data-i'] }, getAttribute: (k) => attrs[k] ?? null, setAttribute: (k, v) => { attrs[k] = v; }, removeAttribute: (k) => { delete attrs[k]; } };
      });
      hidden = new Map([...html.matchAll(/<div id="([\w-]+)" hidden>([^<]*)<\/div>/g)].map((m) => [m[1], { textContent: m[2] }]));
    },
    querySelectorAll: (/** @type {string} */ sel) => (sel === 'li[role="treeitem"]' ? items : []),
    querySelector: (/** @type {string} */ sel) => hidden.get(sel.slice(1)) || null,
  };
  /** each item described: its span's first position, and the words of every description it names */
  const described = () => items.filter((i) => i.attrs['aria-describedby']).map((i) => [WALK.siblingsNow()[Number(i.attrs['data-i'])].pos, i.attrs['aria-describedby'].split(' ').map((id) => hidden.get(id)?.textContent)]);
  const runs = [{ pos: 13, width: 3, words: 'piece 1 of 2' }, { pos: 28, width: 2, words: 'piece 2 of 2' }];
  /** @type {import('./walk.js').Described | null} what the landing says, as N-GO answers it */
  let said = { addr: D, pos: 13, words: 'piece 1 of 2 · all of the passage', runs };
  try {
    WALK.attach(/** @type {any} */ (mirror));
    WALK.readers({ described: () => said });
    await WALK.focusTo(D, 13);
    // the span at 27 a withheld run: described by its origin's one description too, after the landing's words
    const origin = /** @type {{words: string}} */ (WALK.originWords({ kind: 'block', addr: D, pos: 27, link: null })).words;
    assert.deepEqual(described(), [[11, ['piece 1 of 2 · all of the passage']], [27, ['piece 2 of 2', origin]]], 'the landing\'s item its line, the other run\'s span its label');
    const was = rebuilds;
    said = { ...said, pos: 28, words: 'piece 2 of 2 · all of the passage' };
    WALK.markDescribed();
    assert.deepEqual(described(), [[11, ['piece 1 of 2']], [27, ['piece 2 of 2 · all of the passage', origin]]], 'a step: the landing\'s description moved to the run stepped to, the one left its own label');
    said = null;
    WALK.markDescribed();
    assert.deepEqual(described(), [[27, [origin]]], 'the arrival ended: the landing describes nothing, the withheld run its origin still');
    assert.equal(rebuilds, was, 'every mark made in place, nothing rebuilt');
  } finally {
    globalThis.document = platform;
    WALK.readers({});
  }
});

// placed with the tests above: it attaches a mirror of its own
test('two runs of one withheld origin in a document name one description, written once in the mirror, and the run\'s item itself never repeats it (issue #288\'s design decision: "The mirror gives each origin one description, and every run points to it")', async () => {
  const platform = globalThis.document;
  globalThis.document = /** @type {any} */ ({ activeElement: null });
  /** @type {Array<{attrs: Record<string, string>, html: string}>} */
  let items = [];
  /** @type {Array<[string, string]>} the hidden descriptions the last rebuild wrote, in order, each its id and its words */
  let hidden = [];
  const mirror = {
    tabIndex: 0, contains: () => false, setAttribute() {}, classList: { toggle() {} },
    get innerHTML() { return ''; },
    set innerHTML(/** @type {string} */ html) {
      items = [...html.matchAll(/<li\b([^>]*)>(.*?)<\/li>/g)].map((m) => ({ attrs: Object.fromEntries([...m[1].matchAll(/ ([\w-]+)="([^"]*)"/g)].map((a) => [a[1], a[2]])), html: m[2] }));
      hidden = [...html.matchAll(/<div id="([\w-]+)" hidden>([^<]*)<\/div>/g)].map((m) => [m[1], m[2]]);
    },
    querySelectorAll: () => [], querySelector: () => null,
  };
  try {
    await PUMP.loadWhole(R2);
    const runs = REC.doc(R2).blocks.filter((b) => b.kind === 'withheld').map((b) => b.pos);
    assert.deepEqual(runs, [11, 27], 'two runs of one origin, a paragraph between them');
    WALK.attach(/** @type {any} */ (mirror));
    await WALK.focusTo(R2, 11);
    const words = /** @type {{origin: string, words: string}} */ (WALK.originWords({ kind: 'block', addr: R2, pos: 11, link: null }));
    const ids = hidden.filter(([, w]) => w === esc(words.words)).map(([id]) => id);
    assert.equal(ids.length, 1, `one description of ${R2_ORIGIN}: ${JSON.stringify(hidden)}`);
    const at = (/** @type {number} */ pos) => items.find((i) => i.attrs['data-pos'] === String(pos));
    for (const pos of runs) {
      const item = at(pos);
      assert.ok(item && (item.attrs['aria-describedby'] || '').split(' ').includes(ids[0]), `the run at ${pos} names it: ${JSON.stringify(item && item.attrs)}`);
      assert.ok(item && !item.html.includes(esc(t('C-36.owner-grant.arm'))), `the run at ${pos} says its own part alone`);
    }
  } finally {
    globalThis.document = platform;
  }
});

// placed with the tests above: it attaches a mirror of its own
test('a link\'s item whose far end the board will say nothing of is named by the short form of the far end\'s one state and described by its whole form — the words a follow of it is faced with — a hidden description of its own written at the rebuild and marked again in place as the state changes; an item whose far end the board said nothing of is described by nothing (issue #224\'s design decision: "In the mirror, the short form is the item\'s name and the whole form its description")', async () => {
  const platform = globalThis.document;
  globalThis.document = /** @type {any} */ ({ activeElement: null });
  /** @typedef {{attrs: Record<string, string>, dataset: {i?: string}, getAttribute: (k: string) => string | null, setAttribute: (k: string, v: string) => void, removeAttribute: (k: string) => void}} Item */
  /** @type {Item[]} */
  let items = [];
  /** @type {Map<string, {textContent: string}>} the hidden descriptions the last rebuild wrote, by id */
  let hidden = new Map();
  let rebuilds = 0;
  const mirror = {
    tabIndex: 0, contains: () => false, setAttribute() {}, classList: { toggle() {} },
    get innerHTML() { return ''; },
    set innerHTML(/** @type {string} */ html) {
      rebuilds++;
      items = [...html.matchAll(/<li\b[^>]*>/g)].map((m) => {
        /** @type {Record<string, string>} */
        const attrs = Object.fromEntries([...m[0].matchAll(/ ([\w-]+)="([^"]*)"/g)].map((a) => [a[1], a[2]]));
        return { attrs, dataset: { i: attrs['data-i'] }, getAttribute: (k) => attrs[k] ?? null, setAttribute: (k, v) => { attrs[k] = v; }, removeAttribute: (k) => { delete attrs[k]; } };
      });
      hidden = new Map([...html.matchAll(/<div id="([\w-]+)" hidden>([^<]*)<\/div>/g)].map((m) => [m[1], { textContent: m[2] }]));
    },
    querySelectorAll: (/** @type {string} */ sel) => (sel === 'li[role="treeitem"]' ? items : []),
    querySelector: (/** @type {string} */ sel) => hidden.get(sel.slice(1)) || null,
  };
  // the person's citation from D's "first" of a passage of an address in their own account, never minted
  const L = D + '.0.2.13', GHOST = '1.0.1.0.1049578', TYPE = '1.1.0.1.0.1.0.3.13';
  const span = (/** @type {string} */ doc, /** @type {number} */ ord, /** @type {number} */ w) => ({ start: `${doc}.0.1.${ord}`, width: '0.0.0.0.0.0.0.' + w, doc, account: '1.0.1', whole: false, subspace: 1, ordinal: ord, positions: w });
  REC.takeLinks(D, [L]);
  REC.takeLink({ addr: L, from: [span(D, 15, 5)], to: [span(GHOST, 1, 4)], type: TYPE });
  const end = () => /** @type {import('../links/links.js').Shown} */ (LK.shown(D).find((x) => x.link.addr === L));
  /** the link's item as the last rebuild wrote it: the words of every description it names */
  const describedAs = () => {
    const li = items.find((i) => WALK.siblingsNow()[Number(i.attrs['data-i'])]?.link?.link.addr === L);
    const by = li && li.attrs['aria-describedby'];
    return by ? by.split(' ').map((id) => hidden.get(id)?.textContent) : [];
  };
  /** what a follow of the far end is faced with, as the hidden description holds it */
  const wholeOf = () => esc(LK.emptyAt(GHOST).whole.map((p) => p.text).join(' '));
  try {
    WALK.attach(/** @type {any} */ (mirror));
    await WALK.focusTo(D, 15, true, { link: L, key: end().key });
    assert.deepEqual([WALK.current()?.kind, describedAs()], ['link', []], 'nothing answered of its far document: no description');
    REC.takeProjection(L, 2, GHOST, 'unregistered');
    await WALK.focusTo(D, 15, true, { link: L, key: end().key });
    const name = WALK.mirrorItem(WALK.mirrorIndex()) || '';
    assert.ok(name.includes(`${GHOST} · ${t('L.client-words', { words: t('L.far.empty') })}`), `its name the short form: ${name}`);
    assert.deepEqual(describedAs(), [wholeOf()], 'its description the whole form');
    assert.ok(wholeOf().startsWith(esc(t('L.far.empty'))) && wholeOf().includes(esc(t('L.far.empty.order'))), wholeOf());
    const was = rebuilds;
    REC.setIndexState({ arm: 'at_the_floor', floor: 9 });
    WALK.markDescribed();
    assert.deepEqual(describedAs(), [esc(LK.emptyAt(GHOST).whole.map((p) => p.text).join(' '))], 'the index from a floor: the description marked in place, the weaker state\'s');
    assert.ok(describedAs()[0]?.startsWith(esc(t('L.far.unknown'))), `${describedAs()}`);
    assert.equal(rebuilds, was, 'marked in place, nothing rebuilt');
  } finally {
    REC.setIndexState({ arm: 'complete' });
    REC.invalidate(GHOST);
    globalThis.document = platform;
    WALK.readers({});
  }
});

// placed last: it lists a document no test above meets, and lists the index back as it found it
test('in a document folded into columns the camera follows the walk to a span\'s line in its own column at reading size, the column framed with its margins, and to the document\'s outline framed no nearer than reading size; a re-take at reading scale takes the span in the column under the view\'s centre (issue #15)', async () => {
  /** two views the same, within a flight's last step's rounding */
  const near = (/** @type {{x: number, y: number, scale: number}} */ a, /** @type {{x: number, y: number, scale: number}} */ b, /** @type {string} */ what) =>
    assert.ok([a.x - b.x, a.y - b.y, a.scale - b.scale].every((d, i) => Math.abs(d) <= 1e-9 * Math.max(1, Math.abs([b.x, b.y, b.scale][i]))), `${what}: ${JSON.stringify(a)}, not ${JSON.stringify(b)}`);
  await PUMP.loadWhole(H);
  index([D, E, H]);
  try {
    const d = REC.doc(H), f = LAYER.foldOf(d), box = docBox(H);
    const columnOf = (/** @type {number} */ pos) => placeOf(f, pos).column;
    assert.ok(f.across > 2 && f.columns.length > f.across + 1, `H folds into ${f.columns.length} columns, ${f.across} across: a second row, its second column off the room's left`);
    // the span heading the second row's first column, below the middle of the room's width, and the span before it at the foot of the first row's last
    const i = d.blocks.findIndex((b) => columnOf(b.pos) === f.across), at = d.blocks[i], c = f.columns[f.across];
    assert.ok(i > 0 && columnOf(d.blocks[i - 1].pos) === f.across - 1 && c.x + c.w < box.w / 2);
    await WALK.focusTo(H, d.blocks[i - 1].pos);
    await run(WALK.key('down'));
    assert.deepEqual(walkAt(), ['block', H, at.pos], '↓ steps onto the span heading the next column');
    const line = placeOf(f, at.pos);
    // the column the first of its row: the strip beside it holds the corner whole and its gap, its edge EDGE em on its right
    const read = CAM.READING_PX;
    near(CAM.view(), { x: box.x + c.x + c.w / 2 + (EDGE * read - (cornerWidth(false) + CORNER.gap)) / 2 / (read / f.fs), y: box.y + line.y + line.h / 2, scale: read / f.fs }, 'the camera on its line, its column framed with its corner and its edge, at the reading size');
    await run(WALK.key('out'));
    assert.deepEqual(walkAt(), ['document', H, null]);
    const s = LAYER.shapeOf(H), framed = CAM.viewForCell(s, 0.9);
    assert.ok(s.h < box.h * 0.75 && framed.scale < read / f.fs, 'its outline two rows of its room\'s, framed below reading size');
    near(CAM.view(), framed, '← to the document: its outline framed, never its room');
    // a document of one short column, framed whole, would be read far past reading size: ← from its span, at its reading size
    CAM.set(CAM.viewAt(LAYER.centreOf(D, 11), LAYER.foldOf(REC.doc(D)).fs));
    await WALK.focusTo(D, 11);
    await run(WALK.key('out'));
    near(CAM.view(), { ...CAM.viewForCell(LAYER.shapeOf(D), 0.9), scale: read / LAYER.foldOf(REC.doc(D)).fs }, '← to a document of one short column: its outline at the reading size, no nearer');
    // the camera over a span part way down the second row's second column, at reading scale
    const c2 = f.columns[f.across + 1], later = d.blocks.find((b) => columnOf(b.pos) === f.across + 1 && placeOf(f, b.pos).y > c2.y + c2.h / 3);
    assert.ok(later, 'a span a third of the way down the column');
    CAM.set(CAM.viewAt(LAYER.centreOf(H, later.pos), f.fs, 12.5));
    await WALK.retakeFromView(true);
    assert.deepEqual(walkAt(), ['block', H, later.pos], 'the re-take: the span under the view\'s centre, in its column');
  } finally {
    index([D, E]);
  }
});

test('the camera follows the walk through a resize in the air (FP-8): ↓ onto a span of H, the window narrowed half way there, lands on that span\'s line in the fold the narrow view holds, its column framed; ← to H whole, the window widened half way there, lands on its outline framed in the fold the wide view holds', async () => {
  /** two views the same, within a flight's rounding */
  const near = (/** @type {{x: number, y: number, scale: number}} */ a, /** @type {{x: number, y: number, scale: number}} */ b) => [a.x - b.x, a.y - b.y, a.scale - b.scale].every((d, i) => Math.abs(d) <= 1e-9 * Math.max(1, Math.abs([b.x, b.y, b.scale][i])));
  /** a walk move's flight stepped as the frames step it — half way, the window set `w` px wide between two frames, three quarters — then run to its landing */
  const across = async (/** @type {Promise<unknown>} */ move, /** @type {number} */ w) => {
    const f = CAM.cam.anim;
    assert.ok(f, 'the move flies');
    CAM.step(f.t0 + f.ms / 2);
    CAM.setViewport(w, 900);
    CAM.step(f.t0 + f.ms * 3 / 4);
    await run(move);
  };
  /** the view a span of H frames, its column with its margins, at the landing's em */
  const spanView = (/** @type {number} */ pos) => { const at = LAYER.frameOf(H, pos); return CAM.viewAt(at, at.fs); };
  await PUMP.loadWhole(H);
  index([D, E, H]);
  try {
    const b = REC.doc(H).blocks[40];
    CAM.set(spanView(b.pos));
    await WALK.focusTo(H, b.pos);
    const down = WALK.key('down'), next = /** @type {number} */ (WALK.current()?.pos), wide = spanView(next);
    await across(down, 400);
    assert.ok(!near(wide, spanView(next)), 'the narrow view folds H again: the span\'s line framed elsewhere');
    assert.deepEqual(walkAt(), ['block', H, next]);
    assert.ok(near(CAM.view(), spanView(next)), `↓: the camera on the span's line in the fold the narrow view holds: ${JSON.stringify(CAM.view())}`);
    await across(WALK.key('out'), 1440);
    const v = CAM.viewForCell(LAYER.shapeOf(H), 0.9), framed = { ...v, scale: Math.min(v.scale, CAM.landingPx() / LAYER.foldOf(REC.doc(H)).fs) };
    assert.deepEqual(walkAt(), ['document', H, null]);
    assert.ok(near(CAM.view(), framed), `←: the camera on H's outline framed in the fold the wide view holds: ${JSON.stringify(CAM.view())}`);
  } finally {
    CAM.setViewport(1440, 900);
    index([D, E]);
  }
});

/** the camera at a scale over a world point */
const at = (/** @type {{x: number, y: number}} */ p, /** @type {number} */ scale) => CAM.set({ x: p.x, y: p.y, scale });
/** a rect's centre */
const middle = (/** @type {{x: number, y: number, w: number, h: number}} */ r) => ({ x: r.x + r.w / 2, y: r.y + r.h / 2 });

test('a camera move that ends over no document\'s region re-takes the place holding the view\'s centre — the account, else the board — at the near band and at far scale, past the board\'s edge too (issue #141)', async () => {
  const near = 14 / STANDARD_FS, whole = CAM.viewForCell(boardCell('1'), 0.92).scale, label = boardLabelCell('1'), board = boardCell('1');
  /** @type {Array<[string, {x: number, y: number}, number, boolean, Array<string | number | null>]>} each place, the point the camera stands over, its scale, whether the walk's document stands in view there, the walk's element after the re-take */
  const places = [
    ['the cell of a document the index does not list, at the near band', middle(docBox('1.0.1.0.30')), near, false, ['account', '1.0.1', null]],
    ['the board\'s label cell, at the near band', middle(label), near, false, ['board', '1', null]],
    ['the board\'s label cell, at the whole board\'s scale, where the grain stops at the account and no document is kept', middle(label), whole, true, ['board', '1', null]],
    ['past the board\'s left edge, at the near band', { x: board.x - 2000, y: board.y + board.h / 2 }, near, false, ['board', '1', null]],
  ];
  for (const [where, p, scale, seen, after] of places) {
    await WALK.focusTo(D, 15);
    at(p, scale);
    assert.equal(LAYER.inView(D), seen, `${where}: the walk's document ${seen ? 'in' : 'out of'} view`);
    await WALK.retakeFromView(true);
    assert.deepEqual(walkAt(), after, where);
  }
});

test('a document\'s region holds its corner\'s strip: a re-take over the strip takes the document; one over its room\'s empty depths, its text out of view, takes the account (issue #141)', async () => {
  const f = LAYER.foldOf(REC.doc(D)), s = LAYER.shapeOf(D), strip = clearLeftOf(D);
  await WALK.focusTo(E, 3);
  // the middle of D's corner's strip, beside its outline, at D's reading scale
  at({ x: s.x - strip / 2, y: s.y + s.h / 2 }, 12.5 / f.fs);
  await WALK.retakeFromView(true);
  assert.deepEqual(walkAt()?.slice(0, 2), ['block', D], 'the strip is D\'s: a span of D, the nearest the centre');
  // D's room's centre at the near band: D's one short column far above the view, the walk on E, out of view too
  await WALK.focusTo(E, 3);
  at(middle(docBox(D)), 14 / STANDARD_FS);
  assert.ok(!LAYER.inView(D) && !LAYER.inView(E), 'neither document in view');
  await WALK.retakeFromView(true);
  assert.deepEqual(walkAt(), ['account', '1.0.1', null], 'the account: never D, whose text is out of view');
});

test('where the plane draws a continuation as one mark, the account\'s level holds one stop for the mark before its members, each a stop still in record order, the mark\'s named by its count\'s words; stepping onto it and among its members flies the camera to the mark, never framing a member, and reads none (issue #42\'s design decision: "every member stays a stop, in record order, after one stop for the mark itself")', async () => {
  index(Array.from({ length: 60 }, (_, i) => '1.0.1.0.' + (i + 1)));
  try {
    CAM.set(CAM.viewForCell(accountCell('1.0.1'), 0.85));
    await WALK.focusTo('1.0.1:1', null);
    const sibs = WALK.siblingsNow();
    assert.deepEqual([walkAt(), sibs.length, sibs.findIndex((n) => n.kind === 'mark')], [['mark', '1.0.1:1', null], 61, 48], 'the mark\'s stop, after the oldest 48, before its twelve');
    assert.deepEqual(sibs.slice(49).map((n) => [n.kind, n.addr]), Array.from({ length: 12 }, (_, i) => ['document', '1.0.1.0.' + (49 + i)]), 'its members after it, in record order');
    assert.ok(WALK.nameOf(sibs[48], 48, sibs.length).startsWith(markCount(12, true) + ' '), `named by its count: ${WALK.nameOf(sibs[48], 48, sibs.length)}`);
    const asked = fake.asked.length, c = continuationCell('1.0.1', 1), toMark = { x: c.x + c.w / 2, y: c.y + c.h / 2, scale: markScale(1, CAM.cam.scale) };
    for (const step of [1, 2]) {
      await run(WALK.key('down'));
      assert.deepEqual(walkAt(), ['document', '1.0.1.0.' + (48 + step), null], `↓ ${step}: the member`);
      const v = CAM.view();
      assert.ok(Math.abs(v.x - toMark.x) < 1e-6 && Math.abs(v.y - toMark.y) < 1e-6 && Math.abs(v.scale / toMark.scale - 1) < 1e-9, `↓ ${step}: the camera on the mark at a scale drawing it, never the member framed: ${JSON.stringify(v)}`);
      assert.deepEqual(residueDepth(v.scale), { k: 1, fade: 0, held: 1 }, `↓ ${step}: the member inside the mark drawn there`);
    }
    assert.equal(fake.asked.length, asked, 'no member read');
  } finally {
    index([D, E]);
  }
});

test('a re-take over a continuation\'s mark keeps a focus already on one of its members — a span in one taken to the member whole — and else takes the mark, never the member under the view\'s centre (issue #42\'s design decision, changing #141 there)', async () => {
  await PUMP.loadWhole(C1);
  index(Array.from({ length: 60 }, (_, i) => '1.0.1.0.' + (i + 1)));
  try {
    const home = CAM.viewForCell(accountCell('1.0.1'), 0.85), over = (/** @type {string} */ doc) => at(middle(docBox(doc)), home.scale);
    await WALK.focusTo(D, 15);
    over('1.0.1.0.52');
    await WALK.retakeFromView(true);
    assert.deepEqual(walkAt(), ['mark', '1.0.1:1', null], 'the walk on another document: the mark, never the member under the centre');
    await WALK.focusTo('1.0.1.0.55', null);
    over('1.0.1.0.52');
    await WALK.retakeFromView(true);
    assert.deepEqual(walkAt(), ['document', '1.0.1.0.55', null], 'on a member: kept');
    await WALK.focusTo(C1, 11);
    assert.deepEqual(walkAt(), ['block', C1, 11]);
    over('1.0.1.0.52');
    await WALK.retakeFromView(true);
    assert.deepEqual(walkAt(), ['document', C1, null], 'on a span of a member: the member whole');
  } finally {
    index([D, E]);
  }
});

test('a landing at a continuation\'s mark stands on its stop where the plane draws the mark at the scale the camera is bound for, and on the mark\'s account where it draws none: at far scale, which draws clusters and no mark', async () => {
  index(Array.from({ length: 60 }, (_, i) => '1.0.1.0.' + (i + 1)));
  try {
    CAM.set(CAM.viewForCell(accountCell('1.0.1'), 0.85));
    await WALK.focusTo('1.0.1:1', null);
    assert.deepEqual(walkAt(), ['mark', '1.0.1:1', null], 'at HOME\'s scale: the mark\'s stop');
    at(middle(continuationCell('1.0.1', 1)), CAM.viewForCell(boardCell('1'), 0.92).scale / 4);
    assert.equal(lodOf(CAM.cam.scale).name, 'far');
    await WALK.focusTo('1.0.1:1', null);
    assert.deepEqual(walkAt(), ['account', '1.0.1', null], 'at far scale: the mark\'s account');
    await run(WALK.key('out'));
    assert.deepEqual(walkAt(), ['board', '1', null], '← walks out of it to the board');
  } finally {
    index([D, E]);
  }
});

test('→ steps in to the child drawn under the centre of the view the camera is bound for — at the board the account whose cell holds it, at an account the continuation\'s mark whose cell holds it, else the document whose region holds it, at a document the span its fold holds there — and else to the first child in record order: over a cell no listed document stands in, at far scale, which draws no document, and off the document\'s region (D5 K-3)', async () => {
  const home = CAM.viewForCell(accountCell('1.0.1'), 0.85);
  /** → made with the walk on a place and the camera over a point at a scale: the walk's element after it */
  const stepIn = async (/** @type {string} */ place, /** @type {{x: number, y: number}} */ p, /** @type {number} */ scale) => {
    await WALK.focusTo(place, null);
    at(p, scale);
    await run(WALK.key('in'));
    return walkAt();
  };
  await PUMP.loadWhole(H);
  try {
    // the board, two accounts listed: the centre over the second's cell
    REC.takeIndex(/** @type {any} */ ({ docs: [D, E].map((doc) => ({ doc, kind: 'edition', label: doc, standing: 'public' })), counts: [{ account: '1.0.1', documents: 2 }, { account: '1.0.2', documents: 0 }], state: { arm: 'complete' } }));
    const second = CAM.viewForCell(accountCell('1.0.2'), 0.85);
    assert.deepEqual(await stepIn('1', second, second.scale), ['account', '1.0.2', null], 'at the board: the account whose cell holds the centre');
    // the account at HOME's scale
    index([D, E, H]);
    assert.deepEqual(await stepIn('1.0.1', middle(LAYER.shapeOf(E)), home.scale), ['document', E, null], 'at the account: the document whose region holds the centre, never its first');
    assert.deepEqual(await stepIn('1.0.1', middle(docBox('1.0.1.0.30')), home.scale), ['document', D, null], 'over a cell no listed document stands in: the first');
    await WALK.focusTo('1.0.1', null);
    at(middle(LAYER.shapeOf(E)), CAM.viewForCell(boardCell('1'), 0.92).scale / 4);
    assert.equal(lodOf(CAM.cam.scale).name, 'far');
    await run(WALK.key('in'));
    assert.deepEqual(walkAt(), ['document', D, null], 'at far scale, which draws clusters and no document, over E\'s region: the first');
    // a flight bound for E's region, not yet stepped, from over a cell no listed document stands in: read where it is bound
    await WALK.focusTo('1.0.1', null);
    at(middle(docBox('1.0.1.0.30')), home.scale);
    void CAM.fly({ ...middle(LAYER.shapeOf(E)), scale: home.scale }, 300);
    await run(WALK.key('in'));
    assert.deepEqual(walkAt(), ['document', E, null], 'a flight bound for E\'s region: E');
    // a document at its reading scale: H, folded into columns, the walk on it whole
    const d = REC.doc(H), f = LAYER.foldOf(d), reading = 12.5 / f.fs, c = f.columns[1];
    const later = d.blocks.find((b) => placeOf(f, b.pos).column === 1 && placeOf(f, b.pos).y > c.y + c.h / 3);
    assert.ok(later && later.pos > 1, 'a span a third of the way down H\'s second column');
    assert.deepEqual(await stepIn(H, LAYER.centreOf(H, later.pos), reading), ['block', H, later.pos], 'at a document: the span under the centre, in its column');
    const s = LAYER.shapeOf(H), r = LAYER.regionOf(H), off = { x: s.x + s.w / 2, y: s.y + s.h + 10 * f.fs };
    assert.ok(off.y > r.y + r.h && (LAYER.posAt(H, off.x, off.y) ?? 0) > later.pos, 'ten ems below H\'s outline, off its region, the fold\'s nearest line holding a late position');
    assert.deepEqual(await stepIn(H, off, reading), ['block', H, 1], 'the centre off the document\'s region: its first span');
    // a continuation the plane draws as one mark: the centre over its cell
    index(Array.from({ length: 60 }, (_, i) => '1.0.1.0.' + (i + 1)));
    assert.deepEqual(await stepIn('1.0.1', middle(continuationCell('1.0.1', 1)), markScale(1, home.scale)), ['mark', '1.0.1:1', null], 'at the account: the mark\'s stop, never its first document');
  } finally {
    index([D, E]);
  }
});

// placed last: it lists a document no test above meets, and lists the index back as it found it
test('the walk keeps the document it stands in while that document\'s region meets the visible view: past its last line, its last row in view, the walk stays on its span at its reading scale, and stands on the document whole at mid; out of view, the account takes it (issue #141)', async () => {
  await PUMP.loadWhole(H);
  index([D, E, H]);
  try {
    const d = REC.doc(H), f = LAYER.foldOf(d), s = LAYER.shapeOf(H), reading = 12.5 / f.fs;
    const later = d.blocks[Math.floor(d.blocks.length / 2)];
    at(LAYER.centreOf(H, later.pos), reading);
    await WALK.retakeFromView(true);
    assert.deepEqual(walkAt(), ['block', H, later.pos], 'the span under the view\'s centre');
    assert.equal(WALK.kept(), false, 'the centre over its region: not kept');
    // the view's centre ten lines' ems below the outline's foot, inside its room, the last row's foot in view
    const below = { x: s.x + s.w / 2, y: s.y + s.h + 10 * f.fs };
    at(below, reading);
    const r = LAYER.regionOf(H);
    assert.ok(below.y > r.y + r.h && below.y < docBox(H).y + docBox(H).h && LAYER.inView(H), 'the centre in its room, off its region; the document in view');
    await WALK.retakeFromView(true);
    assert.deepEqual(walkAt(), ['block', H, later.pos], 'kept: the span the walk stood on, the reader past its last line');
    assert.equal(WALK.kept(), true, 'kept, its region in view off the centre');
    // mid, over the same point: below its reading scale a span is no stop of the walk's
    at(below, 120 / DOC_W);
    assert.equal(lodOf(CAM.cam.scale).name, 'mid');
    await WALK.retakeFromView(true);
    assert.deepEqual(walkAt(), ['document', H, null], 'kept whole at mid');
    // the near band over a cell the index lists nothing in, far from H: the account
    at(middle(docBox('1.0.1.0.30')), 14 / STANDARD_FS);
    await WALK.retakeFromView(true);
    assert.deepEqual(walkAt(), ['account', '1.0.1', null], 'H out of view: the account holding the centre');
    assert.equal(WALK.kept(), false, 'an account is never kept');
  } finally {
    index([D, E]);
  }
});

test('the re-take and → find a box the plane draws that the index does not list under the view\'s centre, as a listed one: its span at its reading scale, the walk following the reader through its text; the document whole at mid, never a listed neighbour kept; → at its account entering it, never the first (issue #233)', async () => {
  await PUMP.loadWhole(G);
  assert.ok(!REC.place(G) && REC.known().includes(G), 'G a box the plane draws, its text held, the index listing D and E alone');
  const d = REC.doc(G), reading = 12.5 / LAYER.foldOf(d).fs, [first, , third] = d.blocks;
  // G's reading scale over its third paragraph, D far out of view: the span there, never the account
  await WALK.focusTo(D, 15);
  at(LAYER.centreOf(G, third.pos), reading);
  assert.equal(LAYER.inView(D), false, 'D out of view');
  await WALK.retakeFromView(true);
  assert.deepEqual(walkAt(), ['block', G, third.pos], 'the span under the view\'s centre');
  // the walk on G's first paragraph, the reader over its third: the walk follows the reader
  await WALK.focusTo(G, first.pos);
  await WALK.retakeFromView(true);
  assert.deepEqual(walkAt(), ['block', G, third.pos], 'the walk on the span under the view\'s centre, never left on the one it landed on');
  // mid over G's outline, the walk on D, in view there
  await WALK.focusTo(D, 15);
  at(middle(LAYER.shapeOf(G)), 120 / DOC_W);
  assert.deepEqual([lodOf(CAM.cam.scale).name, LAYER.inView(D)], ['mid', true], 'mid, D in view');
  await WALK.retakeFromView(true);
  assert.deepEqual(walkAt(), ['document', G, null], 'G whole, never D kept');
  // → at the account, HOME's scale over G's outline
  await WALK.focusTo('1.0.1', null);
  at(middle(LAYER.shapeOf(G)), CAM.viewForCell(accountCell('1.0.1'), 0.85).scale);
  await run(WALK.key('in'));
  assert.deepEqual(walkAt(), ['document', G, null], '→ enters G, the document whose region holds the centre');
});

test('the element under a view\'s centre, read at a view the camera does not stand at, is the one the re-take takes there where neither of its rules keeps the walk: a continuation\'s mark, a span at its document\'s reading scale, a document whole at mid, an account, the board (issue #237)', async () => {
  await PUMP.loadWhole(H);
  const home = CAM.viewForCell(accountCell('1.0.1'), 0.85), d = REC.doc(H), f = LAYER.foldOf(d), later = d.blocks[Math.floor(d.blocks.length / 2)], near = 14 / STANDARD_FS;
  /** @type {Array<[string, string[], {x: number, y: number, scale: number}, Array<string | number | null>]>} each place: what the index lists, the view, the element there */
  const places = [
    ['a continuation\'s mark', Array.from({ length: 60 }, (_, i) => '1.0.1.0.' + (i + 1)), { ...middle(continuationCell('1.0.1', 1)), scale: markScale(1, home.scale) }, ['mark', '1.0.1:1', null]],
    ['a span at its document\'s reading scale', [D, E, H], { ...LAYER.centreOf(H, later.pos), scale: 12.5 / f.fs }, ['block', H, later.pos]],
    ['a document whole at mid', [D, E, H], { ...middle(LAYER.shapeOf(H)), scale: 120 / DOC_W }, ['document', H, null]],
    ['an account', [D, E], { ...middle(docBox('1.0.1.0.30')), scale: near }, ['account', '1.0.1', null]],
    ['the board', [D, E], { ...middle(boardLabelCell('1')), scale: near }, ['board', '1', null]],
  ];
  try {
    for (const [what, docs, view, element] of places) {
      index(docs);
      // the walk on D, which no mark holds and which stands out of each view: neither rule keeps it
      await WALK.focusTo(D, 15);
      CAM.set(CAM.viewForCell(boardCell('1'), 0.92));
      const u = WALK.elementUnder(view);
      assert.deepEqual([u.kind, u.addr, u.pos], element, `${what}: under the view's centre, the camera elsewhere`);
      at(view, view.scale);
      assert.equal(LAYER.inView(D), false, `${what}: D out of view`);
      await WALK.retakeFromView(true);
      assert.deepEqual(walkAt(), element, `${what}: the re-take there takes it`);
    }
  } finally {
    index([D, E]);
  }
});

/** a draft of the session's account, three typed lines each a span of the walk: Alpha at 1, Bravo at 14, Charlie at 27 */
const T = '1.0.1.0.15';
const T_TEXT = 'Alpha line.\n\nBravo line.\n\nCharlie line.';

test('in a draft holding typed text the walk follows the text shown: its stops are that text\'s blocks at their positions there, a typed line among them — the re-take and → stand on the block the text shown sets under the view\'s centre, ↓ from the line above a typed line lands on the typed line, and a step flies to the line the text shown sets its span on (issues #501, #526)', async () => {
  Object.assign(script, reads(T, [{ content: T_TEXT }], T_TEXT.length, [{ i_start: T + '.0.1.1', width: String(T_TEXT.length) }]), {
    [FAKE.keyOf('op', { frame: F.docMetadata(T) })]: { result: { as_of: 1, resp: 'doc_metadata', doc: T, published: false, owner: '1.0.1', birth: null, birth_extent: null, placed: null, base_extent: null, source: null } },
  });
  /** the view a walk's flight frames a position of the text shown at */
  const framing = (/** @type {number} */ pos) => { const f = LAYER.frameOf(T, pos); return CAM.viewAt(f, f.fs); };
  /** two views the same, within a flight's rounding */
  const near = (/** @type {{x: number, y: number, scale: number}} */ a, /** @type {{x: number, y: number, scale: number}} */ b) => [a.x - b.x, a.y - b.y, a.scale - b.scale].every((d, i) => Math.abs(d) <= 1e-9 * Math.max(1, Math.abs([b.x, b.y, b.scale][i])));
  await PUMP.loadWhole(T);
  try {
    assert.deepEqual(REC.doc(T).blocks.map((b) => b.pos), [1, 14, 27]);
    // a line typed between Alpha and Bravo: a stop of its own, each span after it thirteen positions on
    WRITE.addEdit(T, { pos: 14, width: 0, text: 'Typed line.\n\n' });
    assert.deepEqual(LAYER.shownOf(T).blocks.map((b) => [b.pos, b.text]), [[1, 'Alpha line.'], [14, 'Typed line.'], [27, 'Bravo line.'], [40, 'Charlie line.']]);
    const kids = await WALK.childrenOf({ kind: 'document', addr: T, pos: null, link: null });
    assert.deepEqual(kids.map((n) => [n.kind, n.pos]), [['block', 1], ['block', 14], ['block', 27], ['block', 40]], 'the walk lists the blocks of the text shown, the typed line a stop among them');
    await WALK.focusTo(T, 1);
    CAM.set(framing(1));
    await run(WALK.key('down'));
    assert.deepEqual(walkAt(), ['block', T, 14], '↓ from Alpha lands on the typed line');
    assert.ok(near(CAM.view(), framing(14)), 'the camera on the typed line');
    assert.ok(/** @type {string} */ (WALK.mirrorItem(WALK.mirrorIndex())).includes('Typed line.'), 'and the mirror\'s item reads the typed words: ' + WALK.mirrorItem(WALK.mirrorIndex()));
    await run(WALK.key('down'));
    assert.deepEqual(walkAt(), ['block', T, 27], '↓ again: Bravo, where the text shown holds it');
    assert.ok(near(CAM.view(), framing(27)), `the camera on Bravo's line, 27 in the text shown — ${JSON.stringify(CAM.view())}`);
    // the view's centre on Bravo's line
    await WALK.focusTo(D, 15);
    at(LAYER.centreOf(T, 27), 12.5 / LAYER.foldOf(REC.doc(T)).fs);
    assert.equal(LAYER.posAt(T, CAM.cam.x, CAM.cam.y), 27, 'the fold answers the text shown\'s position');
    await WALK.retakeFromView(true);
    assert.deepEqual(walkAt(), ['block', T, 27], 'the re-take: Bravo');
    await WALK.focusTo(T, null);
    await run(WALK.key('in'));
    assert.deepEqual(walkAt(), ['block', T, 27], '→: Bravo, the block under the view\'s centre');
    // a line typed after Charlie, the last span: a stop of its own too
    WRITE.addEdit(T, { pos: 53, width: 0, text: '\n\nDelta typed.' });
    assert.deepEqual(LAYER.shownOf(T).blocks.map((b) => b.pos), [1, 14, 27, 40, 55], 'Delta shown at 55');
    at(LAYER.centreOf(T, 55), 12.5 / LAYER.foldOf(REC.doc(T)).fs);
    await WALK.retakeFromView(true);
    assert.deepEqual(walkAt(), ['block', T, 55], 'over Delta: the typed line itself');
    assert.deepEqual(fake.unanswered, []);
  } finally {
    WRITE.clearEdits(T);
    REC.invalidate(T);
  }
});

test('a stop holds its place by its bytes through the person\'s edits: typing above it leaves it on the same words; one whose line is partly deleted stays on it; one whose line is deleted whole goes to the element after the removal point, else the one before; a deleted line is no stop; and nothing in the walk moves at an ack (issue #526; D5 §4 rule 4)', async () => {
  Object.assign(script, reads(T, [{ content: T_TEXT }], T_TEXT.length, [{ i_start: T + '.0.1.1', width: String(T_TEXT.length) }]), {
    [FAKE.keyOf('op', { frame: F.docMetadata(T) })]: { result: { as_of: 1, resp: 'doc_metadata', doc: T, published: false, owner: '1.0.1', birth: null, birth_extent: null, placed: null, base_extent: null, source: null } },
  });
  await PUMP.loadWhole(T);
  let told = 0;
  WALK.onFocus(() => { told++; });
  /** the words of the block the walk stands on, in the text shown */
  const words = () => { const f = WALK.current(), b = f && f.pos != null ? LAYER.blockByPos(T, f.pos) : null; return b ? b.text : null; };
  try {
    await WALK.focusTo(T, 14);
    assert.deepEqual([walkAt(), words()], [['block', T, 14], 'Bravo line.']);
    // typing above the focused stop: the same words, wherever they stand now
    WRITE.addEdit(T, { pos: 1, width: 0, text: 'New first line.\n\n' });
    assert.deepEqual([walkAt(), words(), WALK.siblingsNow().map((n) => n.pos)], [['block', T, 31], 'Bravo line.', [1, 18, 31, 44]], 'typed above it: the focus on the same words, seventeen positions on, the typed line listed');
    // its line partly deleted — its first word: it stays on what remains
    WRITE.addEdit(T, { pos: 31, width: 6, text: '' });
    assert.deepEqual([walkAt(), words()], [['block', T, 31], 'line.'], 'partly deleted: it stays on the line');
    // an ack names the typed words' addresses: nothing in the walk moves
    const was = told;
    REC.mint(T, /** @type {number} */ (WRITE.edits(T)[0].page), 17, T + '.0.1.500', 9);
    assert.deepEqual([walkAt(), words(), told], [['block', T, 31], 'line.', was], 'at the ack: the same element, its watchers told nothing');
    // its line deleted whole: no stop is left there, and the focus goes to the element after the removal point
    WRITE.addEdit(T, { pos: 31, width: 7, text: '' });
    assert.deepEqual([LAYER.shownOf(T).blocks.map((b) => b.text), WALK.siblingsNow().map((n) => n.pos)], [['New first line.', 'Alpha line.', 'Charlie line.'], [1, 18, 31]], 'the deleted line is no block of the text shown and no stop');
    assert.deepEqual([walkAt(), words()], [['block', T, 31], 'Charlie line.'], 'the focus on the element after the point its bytes were removed at');
    // the last line deleted whole: none stands after it, so the one before
    WRITE.addEdit(T, { pos: 29, width: 15, text: '' });
    assert.deepEqual([walkAt(), words()], [['block', T, 18], 'Alpha line.'], 'no element after: the one before; a stop is never lost');
  } finally {
    WRITE.clearEdits(T);
    REC.invalidate(T);
  }
});

test('the element under a view\'s centre over a typed line of white space alone is the span before it — the line no element of the walk — and the re-take that stands there moves the walk nothing at the next (rule 20)', async () => {
  let told = 0;
  WALK.onFocus(() => { told++; });
  const view = { ...LAYER.centreOf(E, 12), scale: 12.5 / LAYER.foldOf(REC.doc(E)).fs };
  assert.equal(LAYER.posAt(E, view.x, view.y), 12, 'the view\'s centre on E\'s line of one space');
  const u = WALK.elementUnder(view);
  assert.deepEqual([u.kind, u.addr, u.pos], ['block', E, 3], 'the span before it, never the line of one space');
  await WALK.focusTo(D, 15);
  at(view, view.scale);
  await WALK.retakeFromView(true);
  assert.deepEqual(walkAt(), ['block', E, 3], 'the re-take stands on it');
  const was = told;
  await WALK.retakeFromView(true);
  assert.deepEqual([walkAt(), told], [['block', E, 3], was], 'the next re-take there stands the walk nowhere again: its watchers told nothing');
});

test('the walk takes each box as the version it shows (issues #154, #23): an account\'s documents list the version its box shows, named by that version\'s own first line, a landing at the document stands on that version\'s span, and a re-take over its box stands there', async () => {
  const D2 = D + '.2', TEXT2 = 'Tumbler.\n\nThe second version.';
  Object.assign(script, reads(D2, [{ content: TEXT2 }], TEXT2.length, [{ i_start: D2 + '.0.1.1', width: String(TEXT2.length) }]));
  await PUMP.loadWhole(D2);
  WALK.readers({ shown: (a) => (a === D || a === D2 ? D2 : a) });
  try {
    const kids = await WALK.childrenOf({ kind: 'account', addr: '1.0.1', pos: null, link: null });
    assert.deepEqual(kids.map((n) => n.addr).filter((a) => [D, D2, E].includes(a)), [D2, E], 'the account lists the version D\'s box shows, in D\'s place, never D');
    const named = WALK.nameOf(kids[0], 0, kids.length);
    assert.ok(named.startsWith(t('L.mirror.document', { kind: t('F.published'), document: D2, label: '"Tumbler."', state: venued('F.corner.pinned', { k: 2 }), extent: t('L.mirror.positions', { n: TEXT2.length }) })), 'the mirror names the version by its kind, its own first line, as its box\'s label names it, and its state as its corner states it: ' + named);
    await WALK.focusTo(D, 12);
    assert.deepEqual([walkAt(), WALK.siblingsNow().map((n) => n.pos)], [['block', D2, 11], [1, 11]], 'a landing at D stands on the version\'s span, its siblings the version\'s');
    await WALK.focusTo(E, 3);
    at(LAYER.centreOf(D2, 11), 12.5 / LAYER.foldOf(REC.doc(D2)).fs);
    await WALK.retakeFromView();
    assert.deepEqual(walkAt(), ['block', D2, 11], 'a re-take over the box stands on the version it shows');
  } finally { WALK.readers({}); }
  assert.deepEqual(fake.unanswered, []);
});

// attaches a mirror of its own, as the tests around it do
test('the mirror reads the person\'s own typing, and says of words the board does not hold only what the plane draws: nothing for words in flight, and while the draft holds a line the board has not kept an item holding words it has not minted is described "held on this device" — read from the held lines alone, never from the text\'s difference from the model\'s (issue #526; B3-S2)', async () => {
  Object.assign(script, reads(T, [{ content: T_TEXT }], T_TEXT.length, [{ i_start: T + '.0.1.1', width: String(T_TEXT.length) }]), {
    [FAKE.keyOf('op', { frame: F.docMetadata(T) })]: { result: { as_of: 1, resp: 'doc_metadata', doc: T, published: false, owner: '1.0.1', birth: null, birth_extent: null, placed: null, base_extent: null, source: null } },
  });
  await PUMP.loadWhole(T);
  const mirror = { innerHTML: '', tabIndex: 0, contains: () => false, setAttribute() {}, classList: { toggle() {} } };
  WALK.attach(/** @type {any} */ (mirror));
  /** the item of the mirror at a position of the text shown: its markup */
  const itemAt = (/** @type {number} */ pos) => (mirror.innerHTML.match(new RegExp(`<li [^>]*data-pos="${pos}"[^>]*>.*?</li>`)) || [''])[0];
  const held = 'aria-describedby="walk-held"';
  try {
    WRITE.addEdit(T, { pos: 14, width: 0, text: 'Typed line.\n\n' });
    await WALK.focusTo(T, 14);
    assert.ok(itemAt(14).includes('Typed line.') && mirror.innerHTML.includes(`<div id="walk-held" hidden>${t('L.held.device')}</div>`), 'the typed line is an item, read with its words');
    assert.ok(!mirror.innerHTML.includes(held), 'typed and unsent, no line held: no item says anything of it');
    WRITE.setFlight(T, true);
    WALK.render();
    assert.ok(!mirror.innerHTML.includes(held), 'in flight: nothing more');
    WRITE.setFlight(T, false);
    WRITE.setHeld(T, /** @type {import('../model/frames.js').HeldLine[]} */ (F.decodeHeldRows([{ held: 1, doc: T, base: 5, frame: { op: 'insert', at: { ordinal: '14', subspace: '1' }, values: ['Typed line.\n\n'] }, cause: 'unreachable', sent: false, time: 1 }])));
    WALK.render();
    assert.ok(itemAt(14).includes(held), 'under a hold: the typed line\'s item is described "held on this device"');
    assert.ok(!itemAt(1).includes(held) && !itemAt(27).includes(held), 'and no item of words the board holds is');
    REC.mint(T, /** @type {number} */ (WRITE.edits(T)[0].page), 13, T + '.0.1.500', 9);
    WALK.render();
    assert.ok(!mirror.innerHTML.includes(held), 'minted: on the board, described so no more');
  } finally {
    WRITE.setHeld(T, []); WRITE.clearEdits(T); REC.invalidate(T);
    WALK.attach(/** @type {any} */ ({ innerHTML: '', tabIndex: 0, contains: () => false, setAttribute() {}, classList: { toggle() {} } }));
  }
});

// placed last: the death empties the model every test above reads
// attaches a mirror of its own, as the tests around it do
test('in a draft holding typed text a link\'s stop of the walk stands at its first drawn byte in the text shown, where the end is drawn and the span a slot reads meets it', async () => {
  await PUMP.loadWhole(T);
  const L = T + '.0.2.9';
  REC.takeLinks(T, [L]);
  REC.takeLink({ addr: L, from: [{ start: T + '.0.1.14', width: '0.0.0.0.0.0.0.5', doc: T, account: '1.0.1', whole: false, subspace: 1, ordinal: 14, positions: 5 }], to: [{ start: D, width: '0.0.0.0.1', doc: D, account: '1.0.1', whole: true, subspace: null, ordinal: null, positions: null }], type: '1.1.0.1.0.1.0.3.13' });
  LK.readers({ text: (a) => (REC.has(a) ? LAYER.shownOf(a) : null) });
  try {
    WRITE.addEdit(T, { pos: 1, width: 0, text: 'Typed line.\n\n' });
    const stop = (await WALK.childrenOf({ kind: 'document', addr: T, pos: null, link: null })).find((n) => n.kind === 'link');
    assert.deepEqual([stop?.pos, stop?.link?.pos, stop?.link?.width], [27, 27, 5], 'the walk\'s stop at the end\'s first drawn byte, thirteen positions on where the text shown holds it');
    assert.deepEqual(LK.shownAt(T, { pos: 27, width: 5 }).map((s) => s.link.addr), [L], 'the span a slot reads meets it where the text shown holds it');
    // the stop holds its place by the end's bytes: more typed above it, it stands on the same link, where it is drawn now
    await WALK.focusTo(T, 27, true, { link: L, key: /** @type {import('../links/links.js').Shown} */ (stop?.link).key });
    assert.deepEqual([WALK.current()?.kind, WALK.current()?.pos], ['link', 27]);
    WRITE.addEdit(T, { pos: 1, width: 0, text: 'ab' });
    assert.deepEqual([WALK.current()?.kind, WALK.current()?.pos, WALK.current()?.link?.link.addr], ['link', 29, L], 'typed above it: the walk on the link\'s stop still, two positions on');
  } finally { WRITE.clearEdits(T); LK.readers({}); }
});

test('the count, the article\'s symbols and the mirror name the same ends, two lying inside a withheld run among them (issue #202: "Add a test that the count, the symbols and the mirror agree for an end inside a withheld run"): the presence words count three; the text\'s end is its own symbol and the run\'s two one symbol at the run carrying both; the document\'s links the text\'s end alone, the run\'s item counting its two and holding them a level below, → entering them and ← back; Back\'s light at one marks the run\'s item', async () => {
  const W = '1.0.2.0.6', O = '1.0.1.0.1003', CITE = '1.1.0.1.0.1.0.3.13', text = 'Tumbler.\n\n', n = byteLength(text), RUN = n + 1;
  const span = (/** @type {string} */ doc, /** @type {number} */ ord, /** @type {number} */ w) => resolveSpan({ start: `${doc}.0.1.${ord}`, width: '0.0.0.0.0.0.0.' + w });
  const far = resolveSpan(unitSpan('1.0.1.0.127'));
  // W, held whole: its first paragraph, then eight of O's bytes withheld from the reader; W's owner's three links, one on its own words and two on O's
  REC.takeSpanSet(W, [{ subspace: 1, ordinal: 1, positions: n + 8 }]);
  REC.takeMetadata(W, { doc: W, published: true, owner: '1.0.2', birth: W + '.1', birthExtent: n + 8, placed: null, baseExtent: null, source: null, asOf: 1 });
  REC.takeDelivery(W, [{ pos: 1, width: n, kind: 'content', text, ref: null, origin: null }, { pos: RUN, width: 8, kind: 'withheld', text: '', ref: null, origin: O }]);
  REC.takeImage(W, 1, [{ iStart: W + '.0.1.1', width: n }, { iStart: O + '.0.1.1', width: 8 }]);
  const [T, A, B] = [W + '.0.2.1', W + '.0.2.2', W + '.0.2.3'];
  REC.takeLinks(W, [T, A, B]);
  REC.takeLink({ addr: T, from: [span(W, 2, 3)], to: [far], type: CITE });
  REC.takeLink({ addr: A, from: [span(O, 2, 2)], to: [far], type: CITE });
  REC.takeLink({ addr: B, from: [span(O, 5, 2)], to: [far], type: CITE });
  const platform = globalThis.document;
  globalThis.document = /** @type {any} */ ({ activeElement: null });
  /** @type {Array<{attrs: Record<string, string>, dataset: {addr?: string, i?: string}, getAttribute: (k: string) => string | null, setAttribute: (k: string, v: string) => void}>} the items the last rebuild wrote, as elements */
  let items = [];
  let html = '';
  const mirror = {
    tabIndex: 0, contains: () => false, setAttribute() {}, classList: { toggle() {} },
    get innerHTML() { return html; },
    set innerHTML(/** @type {string} */ v) {
      html = v;
      items = [...v.matchAll(/<li\b[^>]*>/g)].map((m) => {
        /** @type {Record<string, string>} */
        const attrs = Object.fromEntries([...m[0].matchAll(/ ([\w-]+)="([^"]*)"/g)].map((a) => [a[1], a[2]]));
        return { attrs, dataset: { addr: attrs['data-addr'], i: attrs['data-i'] }, getAttribute: (k) => attrs[k] ?? null, setAttribute: (k, x) => { attrs[k] = x; } };
      });
    },
    querySelectorAll: (/** @type {string} */ sel) => (sel === 'li[aria-expanded]' ? items.filter((i) => 'aria-expanded' in i.attrs) : []),
  };
  const view = CAM.view();
  try {
    LK.reveal(W, 2);
    const ends = LK.shown(W), key = (/** @type {string} */ l) => /** @type {import('../links/links.js').Shown} */ (ends.find((s) => s.link.addr === l)).key;
    assert.deepEqual(ends.map((s) => [s.link.addr, s.pos, s.run ? s.run.pos : null]), [[T, 2, null], [A, RUN, RUN], [B, RUN, RUN]], 'LK draws the text\'s end on its words and the run\'s two at its start');
    // the count and the symbols, from the article the plane makes
    const d = REC.doc(W), html = articleHTML(d, LAYER.viewFor(d), REC.ownerAccount(d));
    assert.ok(html.includes(esc(t('B1.presence', { n: 3 }))), 'the presence words: three links');
    const inText = [...html.matchAll(/<span class="sym [^"]*" data-link="([^"]*)" data-end="([^"]*)"/g)].map((m) => [m[1], m[2]]);
    const atRun = [...html.matchAll(/<span class="sym at-run [^"]*" data-links="([^"]*)" data-ends="([^"]*)"[^>]*>([^<]*)<\/span>/g)].map((m) => [m[1], m[2], m[3]]);
    assert.deepEqual([inText, atRun], [[[T, key(T)]], [[`${A} ${B}`, `${key(A)} ${key(B)}`, '⟡2']]], `the text's end its own symbol; the run's two one symbol carrying both: ${html}`);
    // the mirror: the document's links the text's end alone; the run's item its two, a level below
    const kids = await WALK.childrenOf({ kind: 'document', addr: W, pos: null, link: null });
    assert.deepEqual(kids.map((x) => [x.kind, x.pos, x.link ? x.link.link.addr : null]), [['block', 1, null], ['block', RUN, null], ['link', 2, T]], 'the document\'s elements: its two blocks and the text\'s end');
    const runNode = /** @type {import('./walk.js').Node} */ (kids[1]);
    assert.deepEqual((await WALK.childrenOf(runNode)).map((x) => [x.kind, x.link ? x.link.link.addr : null, x.link ? x.link.key : null]), [['link', A, key(A)], ['link', B, key(B)]], 'the run\'s item\'s children: the two ends drawn at it, exactly');
    assert.ok(WALK.nameOf(runNode, 1, 3).includes(t('L.mirror.run-links', { links: t('F.label.links', { n: 2 }) })), `the run's item says two links end in it: ${WALK.nameOf(runNode, 1, 3)}`);
    WALK.attach(/** @type {any} */ (mirror));
    await WALK.focusTo(W, RUN);
    assert.deepEqual(walkAt(), ['block', W, RUN]);
    assert.ok(/id="walk-1"[^>]*aria-level="4"[^>]*aria-expanded="true"/.test(mirror.innerHTML), `the run's item, expanded: ${mirror.innerHTML}`);
    // the camera at the whole board, W far below its reading scale: the documents' items are marked again in place, never the run's
    CAM.set(CAM.viewForCell(boardCell('1'), 0.92));
    WALK.markExpanded();
    assert.equal(items.find((i) => i.attrs.id === 'walk-1')?.getAttribute('aria-expanded'), 'true', 'no camera move collapses the run\'s item: → still enters its links');
    CAM.set(view);
    await run(WALK.key('in'));
    assert.deepEqual([walkAt(), WALK.siblingsNow().map((x) => x.link && x.link.link.addr)], [['link', W, RUN], [A, B]], '→ enters its links');
    assert.ok(/aria-level="5"/.test(mirror.innerHTML) && !/aria-level="4"/.test(mirror.innerHTML), 'a level below the run\'s');
    await run(WALK.key('out'));
    assert.deepEqual(walkAt(), ['block', W, RUN], '← back to the run\'s item');
    // Back to a follow made at one of them: the walk on the run's item, which the light marks
    WALK.readers({ located: () => ({ addr: W, runs: [], end: { link: A, key: key(A) } }) });
    await WALK.focusTo(W, RUN, true, { link: A, key: key(A) });
    assert.deepEqual(walkAt(), ['block', W, RUN], 'Back naming the end: the run\'s item');
    assert.ok(/id="walk-1"[^>]*aria-current="location"/.test(mirror.innerHTML) && (mirror.innerHTML.match(/aria-current/g) || []).length === 1, `the light marks the run's item alone: ${mirror.innerHTML}`);
  } finally {
    globalThis.document = platform;
    CAM.set(view);
    WALK.readers({ located: () => null });
    LK.hide(W);
    REC.invalidate(W);
  }
});

/** @typedef {{attrs: Record<string, string>, dataset: Record<string, string>, innerHTML: string}} Item */

/**
 * A mirror that records what the walk writes in it: the items its last rebuild wrote, each an element whose words are
 * written again in place, and how many rebuilds it took
 */
function recordingMirror() {
  /** @type {Item[]} */
  let items = [];
  let rebuilds = 0;
  const mirror = {
    tabIndex: 0, contains: () => false, setAttribute() {}, classList: { toggle() {} },
    get innerHTML() { return ''; },
    set innerHTML(/** @type {string} */ html) {
      rebuilds++;
      items = [...html.matchAll(/<li\b([^>]*)>(.*?)<\/li>/g)].map((m) => {
        /** @type {Record<string, string>} */
        const attrs = Object.fromEntries([...m[1].matchAll(/ ([\w-]+)="([^"]*)"/g)].map((a) => [a[1], a[2]]));
        return { attrs, dataset: { i: attrs['data-i'], kept: attrs['data-kept'], state: attrs['data-state'] }, innerHTML: m[2] };
      });
    },
    querySelectorAll: (/** @type {string} */ sel) => (sel === 'li[role="treeitem"]' ? items : []),
  };
  /** the words the item for `addr` holds as the mirror holds them */
  const item = (/** @type {string} */ addr) => items.find((i) => i.attrs['data-addr'] === addr)?.innerHTML ?? '';
  return { mirror, item, rebuilds: () => rebuilds };
}

test('a kept document\'s mirror item carries the clause its corner or the one line shows — an edition\'s "links as last read" at the page\'s clock as the row that left it behind came — as a sentence of its own after its words, and the item is written again in place as it lifts, nothing rebuilt (issues #345, #367)', async (ctx) => {
  const unasked = fake.unanswered.length;
  await PUMP.loadWhole(D);
  const platform = globalThis.document;
  globalThis.document = /** @type {any} */ ({ activeElement: null });
  const { mirror, item: itemOf, rebuilds: rebuilt } = recordingMirror();
  /** D's item's words as the mirror holds them */
  const item = () => itemOf(D);
  /** D's text read again, held until the test answers it */
  let text = () => {};
  try {
    // at mid, the walk's grain the document whole, D shown
    const b = docBox(D);
    CAM.set({ x: b.x + b.w / 2, y: b.y + b.h / 2, scale: 120 / DOC_W });
    WALK.attach(/** @type {any} */ (mirror));
    await WALK.focusTo(D, null);
    assert.ok(item() && !item().includes(t('L.kept.links', { when: '' }).trim()), `not kept: no clause — ${item()}`);
    ctx.mock.timers.enable({ apis: ['setTimeout'] });
    text = fake.hold('op', { frame: F.retrieveV(D, 1, 30) });
    const t0 = Date.now();
    fake.fire('feed', { board: 'b-1', update: { position: 40, at: 40, op: 'insert', docs: [D], class: 'published' } });
    const t1 = Date.now();
    ctx.mock.timers.tick(PUMP.KEPT_MS);
    const since = /** @type {number} */ (PUMP.kept(D)?.since);
    assert.ok(since >= t0 && since <= t1, 'kept from the row\'s arrival');
    const clause = t('L.mirror.clause', { clause: t('L.kept.links', { when: lastRead(since) }) });
    const was = rebuilt();
    WALK.markKept();
    const at = WALK.siblingsNow().findIndex((n) => n.addr === D), named = WALK.mirrorItem(at) || '';
    assert.ok(item().includes(esc(clause)) && named.includes(clause + ' ' + t('L.mirror.item', { i: at + 1, n: WALK.siblingsNow().length })), `its clause a sentence after its words, before its place in the level: ${named}`);
    assert.ok(named.startsWith(t('L.mirror.document', { kind: t('F.published'), document: D, label: '"Tumbler."', state: venued('F.corner.latest'), extent: t('L.mirror.positions', { n: 30 }) })), named);
    assert.equal(rebuilt(), was, 'written in place, nothing rebuilt');
    text();
    for (let i = 0; i < 50 && PUMP.kept(D); i++) await new Promise((r) => setImmediate(r));
    WALK.markKept();
    assert.ok(!item().includes(esc(clause)) && rebuilt() === was, 'set: the clause gone from the item in place');
    assert.deepEqual(fake.unanswered.slice(unasked), []);
  } finally { text(); globalThis.document = platform; }
});

test('a document\'s mirror item voices its corner\'s state whole, its kind leading — at the bare address, an older pin, a pin on the newest version, a document with no versions — the version its box shows and the count of its chain next, before its venue\'s clause and R20\'s teaching, and is written again in place as a newer version\'s arrival counts the chain again, nothing rebuilt (issue #239\'s design decision: "The ARIA mirror\'s item for a document voices the corner\'s state, whole"; foundations §3.1)', async () => {
  const D1 = D + '.1', D2 = D + '.2', N = '1.0.1.0.9', TEXT2 = 'Tumbler.\n\nThe second version.', unasked = fake.unanswered.length;
  Object.assign(script, reads(D2, [{ content: TEXT2 }], TEXT2.length, [{ i_start: D2 + '.0.1.1', width: String(TEXT2.length) }]));
  await PUMP.loadWhole(D2);
  // D's first member read, its chain counted to its end at two; N published with no member yet
  REC.takeMetadata(D1, { doc: D, published: true, owner: '1.0.1', birth: D1, birthExtent: 30, placed: null, baseExtent: null, source: null, asOf: 1 });
  REC.takeMetadata(N, { doc: N, published: true, owner: '1.0.1', birth: null, birthExtent: null, placed: null, baseExtent: null, source: null, asOf: 1 });
  REC.takeMembers(D, 2);
  /** the corner's state after its kind at version `k` of a chain `n` members long, its words whole: its version statement, then its state */
  const pinned = (/** @type {number} */ k, /** @type {number} */ n) => [t('F.version-of', { k, n }), venued('F.corner.pinned', { k })].join(', ');
  /** a document's item as the mirror names it, led by its kind, its state the words given */
  const itemSays = (/** @type {string} */ addr, /** @type {string} */ state) => {
    const d = REC.doc(addr);
    return t('L.mirror.document', { kind: t('F.published'), document: addr, label: LAYER.mirrorLabel(d).map((r) => r.text).join(''), state, extent: d.extent != null ? t('L.mirror.positions', { n: d.extent }) : '' });
  };
  /** @type {Array<[string, string, string]>} each version state, the version its box shows, and its corner's state's words after its kind */
  const states = [
    ['the bare address', D, [t('F.version-of', { k: 2, n: 2 }), venued('F.corner.latest')].join(', ')],
    ['an older pin', D1, pinned(1, 2)],
    ['a pin on the newest version', D2, pinned(2, 2)],
    ['a document with no versions', N, venued('F.corner.no-versions')],
  ];
  for (const [what, addr, state] of states) {
    const named = WALK.nameOf({ kind: 'document', addr, pos: null, link: null }, 0, 1);
    assert.ok(named.startsWith(itemSays(addr, state)), `${what}: led by its kind, then its corner's state whole — ${named}`);
    assert.ok(!named.includes(t('F.published') + ',') && !named.includes(t('F.published') + '.'), `${what}: its kind once, leading, never a state of its own — ${named}`);
  }
  const platform = globalThis.document;
  globalThis.document = /** @type {any} */ ({ activeElement: null });
  const { mirror, item, rebuilds } = recordingMirror();
  // D's box pinned on its second member, the walk on it at mid
  WALK.readers({ shown: (a) => (a === D || a === D2 ? D2 : a) });
  try {
    const b = docBox(D);
    CAM.set({ x: b.x + b.w / 2, y: b.y + b.h / 2, scale: 120 / DOC_W });
    WALK.attach(/** @type {any} */ (mirror));
    await WALK.focusTo(D2, null);
    assert.ok(item(D2).includes(esc(pinned(2, 2))), `version 2 of 2: ${item(D2)}`);
    const was = rebuilds();
    REC.takeMembers(D, 3);
    WALK.markKept();
    assert.ok(item(D2).includes(esc(pinned(2, 3))) && !item(D2).includes(esc(pinned(2, 2))), `a newer version arrived, the chain counted again: version 2 of 3 — ${item(D2)}`);
    assert.equal(rebuilds(), was, 'written in place, nothing rebuilt');
    WALK.markKept();
    assert.equal(rebuilds(), was, 'nothing moved: nothing written');
    assert.deepEqual(fake.unanswered.slice(unasked), []);
  } finally { WALK.readers({}); globalThis.document = platform; }
});

test('while the board lags past a second its mirror item carries the clause the one line shows, as a sentence of its own after its words, written in place as it appears and as it lifts with the catch-up\'s rows, nothing rebuilt (issue #367\'s design decision: "The clause stands in every view, in that place\'s mirror item")', async (ctx) => {
  const from = Math.max(REC.feedAt() ?? 0, 60), unasked = fake.unanswered.length, session = /** @type {{session: string}} */ (REC.session()).session;
  REC.reachFeed(from);
  script[FAKE.keyOf('changes', { session, since: from })] = { result: { entries: [], next: from, head: from } };
  const platform = globalThis.document;
  globalThis.document = /** @type {any} */ ({ activeElement: null });
  const { mirror, item, rebuilds } = recordingMirror();
  try {
    // at mid, the walk on the board
    const b = docBox(D);
    CAM.set({ x: b.x + b.w / 2, y: b.y + b.h / 2, scale: 120 / DOC_W });
    WALK.attach(/** @type {any} */ (mirror));
    await WALK.focusTo('1', null);
    assert.equal(WALK.current()?.kind, 'board', 'the walk on the board');
    const words = item('1'), at = ' ' + t('L.mirror.item', { i: 1, n: 1 });
    assert.ok(words.endsWith(esc(at)), `its words, then its place in the level: ${words}`);
    ctx.mock.timers.enable({ apis: ['setTimeout'] });
    fake.drop();
    WALK.markKept();
    assert.equal(item('1'), words, 'within the second: its words alone');
    ctx.mock.timers.tick(PUMP.KEPT_MS);
    const clause = t('L.mirror.clause', { clause: t('L.kept.text', { when: lastRead(/** @type {number} */ (PUMP.boardKept()?.since)) }) });
    const was = rebuilds();
    WALK.markKept();
    assert.equal(WALK.mirrorItem(0), WALK.nameOf({ kind: 'board', addr: '1', pos: null, link: null }, 0, 1));
    assert.ok((WALK.mirrorItem(0) || '').endsWith(clause + at), `its clause a sentence after its words, before its place in the level: ${WALK.mirrorItem(0)}`);
    assert.ok(item('1').includes(esc(clause)) && rebuilds() === was, 'written in place, nothing rebuilt');
    fake.reopen();
    for (let i = 0; i < 20 && PUMP.boardKept(); i++) await new Promise((r) => setImmediate(r));
    WALK.markKept();
    assert.deepEqual([PUMP.boardKept(), item('1'), rebuilds()], [null, words, was], 'the catch-up\'s rows taken: the clause gone from the item in place');
    assert.deepEqual(fake.unanswered.slice(unasked), []);
  } finally { globalThis.document = platform; }
});

/**
 * A mirror laid out as the panel lays it out: its items one under another below the panel's top, each a row of ROW_PX
 * until its words are written again in place, which then take GROWN_ROWS rows; its window `clientHeight` px tall, its
 * scroll its `scrollTop`
 */
function laidOutMirror(/** @type {number} */ clientHeight) {
  const ROW_PX = 20, GROWN_ROWS = 3, TOP = 500;
  /** @typedef {{attrs: Record<string, string>, dataset: Record<string, string>, rows: number, innerHTML: string, getBoundingClientRect: () => {top: number, height: number}}} Laid */
  /** @type {Laid[]} */
  let items = [];
  const mirror = {
    tabIndex: 0, contains: () => false, setAttribute() {}, classList: { toggle() {} }, clientTop: 0, clientHeight, scrollTop: 0,
    getBoundingClientRect: () => ({ top: TOP, height: clientHeight }),
    get innerHTML() { return ''; },
    set innerHTML(/** @type {string} */ html) { items = [...html.matchAll(/<li\b([^>]*)>(.*?)<\/li>/g)].map((m) => laid(m[1], m[2])); },
    querySelectorAll: (/** @type {string} */ sel) => (sel === 'li[role="treeitem"]' ? items : []),
  };
  /** an item as the rebuild writes it, standing below every item before it */
  function laid(/** @type {string} */ attrsHTML, /** @type {string} */ words) {
    /** @type {Record<string, string>} */
    const attrs = Object.fromEntries([...attrsHTML.matchAll(/ ([\w-]+)="([^"]*)"/g)].map((a) => [a[1], a[2]]));
    let html = words;
    /** @type {Laid} */
    const it = {
      attrs, dataset: { i: attrs['data-i'], kept: attrs['data-kept'], state: attrs['data-state'] }, rows: 1,
      get innerHTML() { return html; },
      set innerHTML(/** @type {string} */ w) { html = w; it.rows = GROWN_ROWS; },
      getBoundingClientRect: () => {
        let top = TOP - mirror.scrollTop;
        for (const x of items) { if (x === it) break; top += x.rows * ROW_PX; }
        return { top, height: it.rows * ROW_PX };
      },
    };
    return it;
  }
  /** the item for `addr`, where in the panel's window it stands: its top and bottom edges from the window's top */
  const at = (/** @type {string} */ addr) => {
    const it = items.find((x) => x.attrs['data-addr'] === addr), r = it ? it.getBoundingClientRect() : null;
    return r && { top: r.top - TOP, bottom: r.top - TOP + r.height };
  };
  return { mirror, at };
}

test('words written again in place keep the current item a row the panel shows where the panel\'s window held it whole — an item above it taller, or its own — and leave the panel\'s scroll where the reader\'s scroll left the current item outside the window (D5 §4 rule 8; FP-20)', async () => {
  const platform = globalThis.document;
  globalThis.document = /** @type {any} */ ({ activeElement: null });
  const { mirror, at } = laidOutMirror(40);
  const kept = [D, E].map((a) => ({ addr: a, members: REC.doc(a).members, ended: REC.doc(a).ended }));
  /** a newer version of a document counted: its item's state changed, so written again in place */
  const counted = (/** @type {string} */ addr) => REC.takeMembers(addr, (REC.doc(addr).members || 1) + 1);
  try {
    // at mid, the walk on E, D's item above it, both inside the window
    const b = docBox(D);
    CAM.set({ x: b.x + b.w / 2, y: b.y + b.h / 2, scale: 120 / DOC_W });
    WALK.attach(/** @type {any} */ (mirror));
    await WALK.focusTo(E, null);
    assert.deepEqual([WALK.current()?.addr, at(D), at(E)], [E, { top: 0, bottom: 20 }, { top: 20, bottom: 40 }], 'E current, whole in the window below D');
    counted(D);
    WALK.markKept();
    assert.deepEqual([at(D)?.bottom, at(E), mirror.scrollTop], [20, { top: 20, bottom: 40 }, 40], 'D written again three rows tall: the panel scrolled by what it grew, E whole in the window still');
    counted(E);
    WALK.markKept();
    assert.deepEqual([at(E), mirror.scrollTop], [{ top: -20, bottom: 40 }, 80], 'E\'s own words written again: its bottom brought inside the window, the least scroll');
    mirror.scrollTop = 0;
    counted(D);
    WALK.markKept();
    assert.deepEqual([at(E)?.top, mirror.scrollTop], [60, 0], 'the reader\'s scroll left E outside the window: D written again, the scroll stands');
  } finally {
    for (const k of kept) REC.takeMembers(k.addr, /** @type {number} */ (k.members), k.ended);
    globalThis.document = platform;
  }
});

test('the page\'s own death takes the mirror down at once where the view stood on nothing — no item quoting what the dead session read, the draft it could read listed as its cover, the editions read as published listed still — and takes the walk again on the span it stood on once its document is read at the guest\'s class (FP-23; issues #160, #350)', async () => {
  const platform = globalThis.document;
  globalThis.document = /** @type {any} */ ({ activeElement: null });
  const mirror = { innerHTML: '', tabIndex: 0, contains: () => false, setAttribute() {}, classList: { toggle() {} } };
  // the session's index: the two editions, and a draft of the account's no read has answered for
  const DRAFT = '1.0.1.0.21';
  REC.takeIndex(/** @type {any} */ ({ docs: [{ doc: D, kind: 'edition', label: 'd', standing: 'public' }, { doc: E, kind: 'edition', label: 'e', standing: 'public' }, { doc: DRAFT, kind: 'draft', label: 'the draft', standing: 'yours_to_read' }], counts: [{ account: '1.0.1', documents: 3 }], state: { arm: 'complete' } }));
  try {
    WALK.attach(/** @type {any} */ (mirror));
    await WALK.focusTo(D, 15);
    assert.ok(mirror.innerHTML.includes('The first field.') && mirror.innerHTML.includes(`data-addr="${E}"`) === false, 'the mirror quotes the span the session read');
    await WALK.focusTo(D, null);
    assert.ok(mirror.innerHTML.includes(`data-addr="${E}"`) && mirror.innerHTML.includes(`data-addr="${DRAFT}"`), 'the account\'s level lists E and the draft, which the session\'s index lists');
    await WALK.focusTo(D, 15);
    // the guest's read of D held, so nothing it brings stands yet; the death keeps nothing the view stood on, as M-PUMP's end hands it none here, then tells the walk
    const release = fake.hold('op', { frame: F.retrieveDocVSpanSet(D) });
    REC.sessionDied({ arm: 'closed' });
    const taken = WALK.dropped({ row: null, addrs: null, at: Date.now() });
    for (let i = 0; i < 5; i++) await new Promise((r) => setImmediate(r));
    assert.ok(!mirror.innerHTML.includes('The first field.'), `at once: no item quotes what the dead session read: ${mirror.innerHTML}`);
    assert.deepEqual(walkAt(), ['document', D, null], 'the walk on its document whole');
    const box = t('F.corner.withheld', { owner: '1.0.1' }), at = WALK.siblingsNow().findIndex((n) => n.addr === DRAFT), item = at < 0 ? '' : WALK.mirrorItem(at) || '';
    assert.ok(item.includes(box) && !item.includes('the draft') && mirror.innerHTML.includes(`data-addr="${E}"`),
      `the mirror lists the draft the dead session could read as its cover — in its withheld box's words, none of its first line — and the edition still: ${item}`);
    release();
    await taken;
    assert.deepEqual(walkAt(), ['block', D, 11], 'its document read at the guest\'s class: the walk on the span holding the position it stood at');
    assert.ok(mirror.innerHTML.includes('The first field.'), 'the mirror quotes what the guest reads there');
    assert.deepEqual(fake.unanswered, []);
  } finally {
    globalThis.document = platform;
    REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  }
});

// placed after the death above: the guest's page, the session it held ended
test('the walk on a draft the session read stays on it once the guest\'s read answers it withheld — never on nothing — named in its withheld box\'s words, and the account\'s level lists it among the boxes the plane draws, its cover (issue #177: "The walk stays put on that withheld form, never on nothing")', async () => {
  const platform = globalThis.document;
  globalThis.document = /** @type {any} */ ({ activeElement: null });
  const mirror = { innerHTML: '', tabIndex: 0, contains: () => false, setAttribute() {}, classList: { toggle() {} } };
  const DR = '1.0.1.0.13', TEXT = 'The draft\'s own words.\n\nAnd more.';
  // DR's reads under the session; the guest's read of its extent refused, withheld
  Object.assign(script, reads(DR, [{ content: TEXT }], TEXT.length, [{ i_start: DR + '.0.1.1', width: String(TEXT.length) }]));
  try {
    WALK.attach(/** @type {any} */ (mirror));
    REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
    REC.invalidate(DR);
    await PUMP.loadWhole(DR);
    await WALK.focusTo(DR, 1);
    assert.ok(mirror.innerHTML.includes('The draft'), 'the walk on the draft\'s span, the mirror quoting it');
    script[FAKE.keyOf('op', { frame: F.retrieveDocVSpanSet(DR) })] = { refused: { kind: 'refused', name: 'withheld', code: 'withheld' } };
    REC.sessionDied({ arm: 'closed' });
    await WALK.dropped({ row: null, addrs: null, at: Date.now() });
    const box = t('F.corner.withheld', { owner: '1.0.1' });
    assert.deepEqual([walkAt(), REC.covered(DR)], [['document', DR, null], true], 'the walk on the covered draft, whole: never on nothing');
    assert.ok(!mirror.innerHTML.includes('The draft') && (WALK.mirrorItem(WALK.mirrorIndex()) || '').includes(box), `named in its withheld box's words, none of its text: ${WALK.mirrorItem(WALK.mirrorIndex())}`);
    const kids = await WALK.childrenOf({ kind: 'account', addr: '1.0.1', pos: null, link: null });
    assert.ok(kids.some((n) => n.addr === DR), 'the account\'s level lists the covered draft, as the plane draws its box');
  } finally {
    globalThis.document = platform;
    REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  }
});

test('a change of the page\'s class keeps the walk on the span it stood on where its document kept its text: at once, from the model the change left — the run of a draft\'s bytes there named as the withheld run it is now, none of its words quoted — and again there once its document is read at the new class (issue #274\'s design decision: "Nothing is taken down to wait"; "runs from drafts go to covers")', async () => {
  const platform = globalThis.document;
  globalThis.document = /** @type {any} */ ({ activeElement: null });
  const mirror = { innerHTML: '', tabIndex: 0, contains: () => false, setAttribute() {}, classList: { toggle() {} } };
  // K, an edition windowing a run of the draft DF's bytes, its image placing them in DF's I-space
  const K = '1.0.1.0.9', DF = '1.0.1.0.12', HEAD = 'Kept.\n\n', RUN = 'Draft words here.', TAIL = '\n\nEnd.', TEXT = HEAD + RUN + TAIL, AT = HEAD.length + 1;
  Object.assign(script, reads(K, [{ content: TEXT }], TEXT.length, [{ i_start: K + '.0.1.1', width: String(HEAD.length) }, { i_start: DF + '.0.1.1', width: String(RUN.length) }, { i_start: `${K}.0.1.${AT}`, width: String(TAIL.length) }]), {
    [FAKE.keyOf('op', { frame: F.editionClaimsAt(DF) })]: { result: { as_of: 1, resp: 'addrs', addrs: [] } },
  });
  try {
    WALK.attach(/** @type {any} */ (mirror));
    REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
    REC.invalidate(K);
    await PUMP.loadWhole(K);
    await WALK.focusTo(K, AT + 3);
    assert.ok(walkAt()?.[2] === AT && mirror.innerHTML.includes(RUN), 'the walk on the span of the draft\'s bytes, the mirror quoting them');
    REC.sessionDied({ arm: 'closed' }, [K]);
    const taken = WALK.dropped({ row: null, addrs: null, at: Date.now() });
    for (let i = 0; i < 5; i++) await new Promise((r) => setImmediate(r));
    assert.deepEqual(walkAt(), ['block', K, AT], 'at once: the walk on the span it stood on, never its document whole');
    assert.ok(!mirror.innerHTML.includes(RUN) && mirror.innerHTML.includes('Kept.'), `no item quotes the draft's bytes, the edition's own quoted still: ${mirror.innerHTML}`);
    assert.ok((WALK.mirrorItem(WALK.mirrorIndex()) || '').startsWith(t('L.item.withheld')), `the walk's item names the withheld run it is now: ${WALK.mirrorItem(WALK.mirrorIndex())}`);
    await taken;
    assert.deepEqual(walkAt(), ['block', K, AT], 'its document read at the new class: the walk on that span still');
    assert.deepEqual(fake.unanswered, []);
  } finally {
    globalThis.document = platform;
    REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
    REC.invalidate(K);
  }
});

test('where no board is held the walk\'s root names none: it says why, in the words the reader the app hands in gives — the one line\'s — and a camera move\'s re-take stands on it alone, never on the account the grid finds under the view\'s centre, at far scale and near (issue #215\'s design decision: "The mirror\'s board sentence says what the line says"; FP-35)', async () => {
  const was = { board: REC.board(), session: REC.session() };
  /** @type {{id: string, text: string} | null} what O-FACES' `noBoardWords` answers, the reader the app hands in */
  let why = { id: 'F.unclaimed', text: t('F.unclaimed') };
  WALK.readers({ noBoard: () => why });
  try {
    REC.setSession(null);
    REC.takeBoards({ result: [] });
    await WALK.focusTo('1', null);
    const item = t('L.mirror.item', { i: 1, n: 1 });
    assert.equal(WALK.mirrorItem(0), `${t('F.unclaimed')} ${item}`, 'the list empty: the root says why, never "board 1"');
    why = { id: 'L.boards-unread', text: t('L.boards-unread') };
    assert.equal(WALK.mirrorItem(0), `${t('L.boards-unread')} ${item}`, 'the list refused: its words');
    // the view's centre over a cell of 1.0.1's the index lists nothing in: the grid would find the account there
    const cell = docBox('1.0.1.0.30'), centre = { x: cell.x + cell.w / 2, y: cell.y + cell.h / 2 };
    /** @type {Array<[string, number]>} */
    const scales = [['far', CAM.viewForCell(boardCell('1'), 0.92).scale / 4], ['near', 14 / STANDARD_FS]];
    for (const [band, scale] of scales) {
      await WALK.focusTo('1', null);
      CAM.set({ ...centre, scale });
      await WALK.retakeFromView(true);
      assert.deepEqual(walkAt(), ['board', '1', null], `${band}: the re-take stands on the root, naming no account`);
    }
    REC.setBoard(was.board);
    CAM.set({ ...centre, scale: CAM.viewForCell(boardCell('1'), 0.92).scale / 4 });
    await WALK.retakeFromView(true);
    assert.deepEqual(walkAt(), ['account', '1.0.1', null], 'with the board held, the same re-take names the account the grid finds there');
  } finally {
    WALK.readers({});
    REC.setBoard(was.board); REC.setSession(was.session);
  }
});

// placed last: it holds a document of the account the continuation's tests count, and attaches a mirror of its own
test('a transcluded origin carrying C-33\'s words has one description in the mirror — those words — which every item its runs touch names, across the typed lines one run crosses and its other run alike, and an item of the document\'s own names none; an origin read as an edition carries none, its kind its metadata\'s word whatever the index lists it as, and a version whose metadata is unread carries them where its box is listed an edition (issue #304\'s design decision: "The mirror gives each origin one description, and every run points to it"; FP-39)', async () => {
  const platform = globalThis.document;
  globalThis.document = /** @type {any} */ ({ activeElement: null });
  /** @type {Array<{attrs: Record<string, string>, html: string}>} */
  let items = [];
  /** @type {Array<[string, string]>} the hidden descriptions the last rebuild wrote, in order, each its id and its words */
  let hidden = [];
  const mirror = {
    tabIndex: 0, contains: () => false, setAttribute() {}, classList: { toggle() {} },
    get innerHTML() { return ''; },
    set innerHTML(/** @type {string} */ html) {
      items = [...html.matchAll(/<li\b([^>]*)>(.*?)<\/li>/g)].map((m) => ({ attrs: Object.fromEntries([...m[1].matchAll(/ ([\w-]+)="([^"]*)"/g)].map((a) => [a[1], a[2]])), html: m[2] }));
      hidden = [...html.matchAll(/<div id="([\w-]+)" hidden>([^<]*)<\/div>/g)].map((m) => [m[1], m[2]]);
    },
    querySelectorAll: () => [], querySelector: () => null,
  };
  /** the draft's metadata as a read answers it: a draft, or its edition */
  const meta = (/** @type {boolean} */ published) => ({ doc: T2_ORIGIN, published, owner: '1.0.1', birth: published ? T2_ORIGIN + '.1' : null, birthExtent: published ? 33 : null, placed: null, baseExtent: null, source: null, asOf: 1 });
  /** the index listing D, E and T2 as editions and the draft's origin as a kind */
  const listing = (/** @type {'draft' | 'edition'} */ kind) => REC.takeIndex(/** @type {any} */ ({ docs: [...[D, E, T2].map((doc) => ({ doc, kind: 'edition', label: doc, standing: 'public' })), { doc: T2_ORIGIN, kind, label: T2_ORIGIN, standing: kind === 'draft' ? 'yours_to_read' : 'public' }], counts: [{ account: '1.0.1', documents: 4 }], state: { arm: 'complete' } }));
  /** the item at a document's second typed line of the draft's */
  const second = (/** @type {string} */ addr) => /** @type {import('./walk.js').Node} */ ({ kind: 'block', addr, pos: 22, link: null });
  /** T2's second version, which nothing has read the metadata of */
  const T2V = T2 + '.2';
  try {
    REC.takeMetadata(T2_ORIGIN, meta(false));
    await PUMP.loadWhole(T2);
    assert.deepEqual(REC.doc(T2).origins, [{ pos: 11, width: 21, doc: T2_ORIGIN }, { pos: 44, width: 12, doc: T2_ORIGIN }], 'two runs of the draft, the first across two typed lines');
    WALK.attach(/** @type {any} */ (mirror));
    await WALK.focusTo(T2, 11);
    const ids = hidden.filter(([, w]) => w === esc(t('C-33'))).map(([id]) => id);
    assert.equal(ids.length, 1, `one description of ${T2_ORIGIN}, C-33's words: ${JSON.stringify(hidden)}`);
    const names = (/** @type {number} */ pos) => { const item = items.find((i) => i.attrs['data-pos'] === String(pos)); return !!item && (item.attrs['aria-describedby'] || '').split(' ').includes(ids[0]); };
    assert.deepEqual([1, 11, 22, 34, 44].map(names), [false, true, true, false, true], 'each item the draft\'s runs touch names it; the document\'s own items do not');
    assert.deepEqual(WALK.originWords({ kind: 'block', addr: T2, pos: 22, link: null }), { origin: T2_ORIGIN, words: t('C-33') });
    REC.takeMetadata(T2_ORIGIN, meta(true));
    assert.equal(WALK.originWords({ kind: 'block', addr: T2, pos: 22, link: null }), null, 'the draft read as published: no C-33, no description');
    // the index listing the origin as the other kind than its metadata's
    listing('draft');
    assert.deepEqual([LAYER.kindOf(REC.doc(T2_ORIGIN)), WALK.originWords(second(T2))], ['published', null], 'listed a draft, its metadata read published: none still, as the origin\'s own corner says "published"');
    listing('edition');
    REC.takeMetadata(T2_ORIGIN, meta(false));
    assert.deepEqual([LAYER.kindOf(REC.doc(T2_ORIGIN)), WALK.originWords(second(T2))], ['draft', { origin: T2_ORIGIN, words: t('C-33') }], 'listed an edition, its metadata read a draft: C-33\'s words, as the origin\'s own corner says "draft"');
    // T2's second version: its text and its image held, its metadata unread, its box listed an edition
    REC.takeSpanSet(T2V, [{ subspace: 1, ordinal: 1, positions: T2_TEXT.length }]);
    REC.takeDelivery(T2V, [{ pos: 1, width: T2_TEXT.length, kind: 'content', text: T2_TEXT, ref: null, origin: null }]);
    REC.takeImage(T2V, 1, [{ iStart: T2 + '.0.1.1', width: 10 }, { iStart: T2_ORIGIN + '.0.1.1', width: 21 }, { iStart: T2 + '.0.1.11', width: 12 }, { iStart: T2_ORIGIN + '.0.1.50', width: 12 }]);
    assert.deepEqual([REC.doc(T2V).meta, REC.doc(T2V).kind, LAYER.kindOf(REC.doc(T2V)), WALK.originWords(second(T2V))], [null, 'unknown', 'published', { origin: T2_ORIGIN, words: t('C-33') }],
      'its metadata unread and its record telling no kind: C-33\'s words, as its corner says "published" by its box\'s listing');
  } finally {
    REC.invalidate(T2V);
    index([D, E]);
    globalThis.document = platform;
  }
});

// placed last: it attaches a mirror and a status region of its own
test('the kind of the document the walk stands in is said once in the status region where its corner\'s slot fills while the platform\'s focus is in it — its metadata read with the focus on the walk\'s item — and nothing is said where the focus stands elsewhere, nor by a move of the walk (issue #423\'s design decision: "If it fills while the focus is in that document, the status region says so once"; FP-36)', async () => {
  const platform = globalThis.document;
  /** @type {string[]} what the status region was told, in order */
  const said = [];
  FOCUS.attach({ live: /** @type {any} */ ({ setAttribute() {}, get textContent() { return said[said.length - 1] ?? ''; }, set textContent(/** @type {string} */ v) { said.push(v); } }) });
  const page = { activeElement: /** @type {unknown} */ (null) }, item = { id: 'the walk\'s item' };
  globalThis.document = /** @type {any} */ (page);
  WALK.attach(/** @type {any} */ ({ innerHTML: '', tabIndex: 0, contains: (/** @type {unknown} */ x) => x === item, setAttribute() {}, classList: { toggle() {} }, querySelectorAll: () => [] }));
  // two documents of an account the index lists nothing for, never read: their kinds being read
  const U = '1.0.7.0.6', V = '1.0.7.0.8';
  const meta = (/** @type {string} */ doc, /** @type {boolean} */ published) => ({ doc, published, owner: '1.0.7', birth: published ? doc + '.1' : null, birthExtent: null, placed: null, baseExtent: null, source: null, asOf: 1 });
  try {
    await WALK.focusTo(U, null);
    page.activeElement = item;
    WALK.markKept();
    assert.deepEqual([LAYER.kindOf(REC.doc(U)), said], ['reading', []], 'its kind being read: nothing said');
    REC.takeMetadata(U, meta(U, false));
    WALK.markKept();
    WALK.markKept();
    assert.deepEqual(said, [t('F.kind.draft')], 'its slot filled under the focus: "draft", said once');
    await WALK.focusTo(V, null);
    page.activeElement = null;
    WALK.markKept();
    REC.takeMetadata(V, meta(V, true));
    WALK.markKept();
    assert.deepEqual(said, [t('F.kind.draft')], 'filled while the focus stands elsewhere: nothing said');
    await WALK.focusTo(U, null);
    page.activeElement = item;
    WALK.markKept();
    assert.deepEqual(said, [t('F.kind.draft')], 'a move of the walk onto a document whose kind is told: nothing said — its item\'s name leads with it');
  } finally {
    REC.invalidate(U); REC.invalidate(V);
    globalThis.document = platform;
  }
});

// placed last: it attaches a mirror whose items take the focus as the platform's would, which no test after it should meet
test('the walk\'s panel shows after a walk key\'s move while the plane holds the focus, and hides at a landing, at `hidePanel`, once the focus stands on an element outside the plane and at a re-take that moves the walk; a Tab into the plane then draws the ring and shows no panel; hidden, the mirror stands over the box it is placed at, and shown, whole inside the window below the one line and clear of that box, standing where it stood while the camera flies; an activation reaching an item stands the walk on it, the ring drawn and no panel, and makes Enter\'s act there once a click (issue #559\'s design decision)', async () => {
  const platform = globalThis.document;
  const body = { id: 'the body' };
  /** @type {{activeElement: unknown, body: unknown}} */
  const doc = { activeElement: body, body };
  globalThis.document = /** @type {any} */ (doc);
  /** @typedef {{id: string, dataset: {i: string}, focus: () => void, getBoundingClientRect: () => {top: number, height: number}, closest: () => unknown}} Item */
  /** @type {Map<string, Item>} the mirror's items as the platform holds them: each takes the focus, each a row of the panel */
  const items = new Map();
  const itemAt = (/** @type {string} */ id) => {
    let e = items.get(id);
    if (!e) { const it = /** @type {Item} */ ({ id, dataset: { i: id.slice(5) }, focus() { doc.activeElement = it; }, getBoundingClientRect: () => ({ top: 0, height: 20 }), closest: () => it }); items.set(id, it); e = it; }
    return e;
  };
  /** @type {Map<string, (e?: unknown) => void>} the mirror's listeners, by event */
  const heard = new Map();
  /** @type {Set<string>} */
  const classes = new Set();
  /** @type {Record<string, string>} */
  const style = {};
  const mirror = {
    innerHTML: '', tabIndex: 0, style, clientTop: 0, clientHeight: 300, scrollTop: 0, getBoundingClientRect: () => ({ top: 0, height: 300 }),
    contains: (/** @type {unknown} */ x) => x === mirror || [...items.values()].includes(/** @type {any} */ (x)), setAttribute() {},
    classList: { toggle: (/** @type {string} */ c, /** @type {boolean} */ on) => { if (on) classes.add(c); else classes.delete(c); } },
    querySelector: (/** @type {string} */ sel) => (sel.startsWith('#walk-') ? itemAt(sel.slice(1)) : null),
    addEventListener: (/** @type {string} */ type, /** @type {(e?: unknown) => void} */ fn) => { heard.set(type, fn); },
  };
  let enters = 0;
  WALK.readers({ enter: () => { enters++; } });
  /** the ring, the panel, and the panel's mark on the mirror */
  const seen = () => [WALK.ringShown(), WALK.panelShown(), classes.has('shown')];
  try {
    WALK.attach(/** @type {any} */ (mirror));
    await PUMP.loadWhole(D);
    CAM.set(CAM.viewAt(LAYER.centreOf(D, 1), LAYER.foldOf(REC.doc(D)).fs, 12.5));
    await WALK.focusTo(D, 1);
    assert.deepEqual([walkAt(), ...seen()], [['block', D, 1], true, false, false], 'a landing on D\'s first span: the ring drawn, the panel hidden');
    WALK.place({ x: 100, y: 200, w: 300, h: 40 }, 30, true);
    assert.deepEqual([style.left, style.top, style.width, style.height], ['100px', '200px', '300px', '40px'], 'hidden: the mirror over the walk\'s element\'s box, its current item filling it');
    WALK.place(null, 30, true);
    assert.equal(style.left, '-10000px', 'hidden, no box: off screen');
    await run(WALK.key('down'));
    assert.deepEqual(seen(), [true, true, true], 'a walk key\'s move: the ring drawn and the panel shown');
    const { VH } = CAM.viewport();
    WALK.place({ x: 600, y: 100, w: 300, h: 40 }, 30, true);
    assert.deepEqual([style.left, style.bottom, style.top], ['8px', '8px', 'auto'], 'shown, the bottom left clear of the box: the panel there');
    WALK.place({ x: 100, y: VH - 200, w: 300, h: 40 }, 30, true);
    assert.deepEqual([style.top, style.maxHeight, style.bottom], ['38px', `${VH - 200 - 8 - 38}px`, 'auto'], 'the box in the bottom left: the panel in the larger room, above it, below the one line, its height capped to that room');
    WALK.place({ x: 100, y: 100, w: 300, h: 40 }, 30, false);
    assert.equal(style.top, '38px', 'the camera flying: the shown panel stands where it stood');
    WALK.hidePanel();
    assert.deepEqual(seen(), [true, false, false], '`hidePanel`: the panel hidden, the ring standing');
    await run(WALK.key('down'));
    const line = { id: 'the line\'s act' };
    doc.activeElement = line; heard.get('focusout')?.();
    assert.deepEqual([WALK.ringShown(), WALK.panelShown()], [false, false], 'the focus on an element outside the plane: neither');
    doc.activeElement = itemAt('walk-' + WALK.mirrorIndex()); heard.get('focusin')?.();
    assert.deepEqual(seen(), [true, false, false], 'a Tab back into the plane: the ring drawn, no panel');
    await run(WALK.key('up'));
    assert.deepEqual(seen(), [true, true, true], 'a walk key\'s move again: the panel shown');
    const cell = accountCell('1.0.1');
    CAM.set({ x: cell.x + cell.w / 2, y: cell.y + cell.h / 2, scale: CAM.viewForCell(boardCell('1'), 0.92).scale });
    await WALK.retakeFromView(true);
    assert.deepEqual([walkAt(), ...seen()], [['account', '1.0.1', null], false, false, false], 'a key\'s re-take moving the walk to the account: the panel hidden and no ring');
    await WALK.focusTo(D, 1);
    assert.deepEqual([walkAt(), WALK.mirrorIndex()], [['block', D, 1], 0], 'the walk on D\'s first span');
    heard.get('click')?.({ target: itemAt('walk-1') });
    for (let i = 0; i < 100 && !enters; i++) { await new Promise((r) => setTimeout(r, 0)); if (CAM.flying()) CAM.step(Infinity); }
    assert.deepEqual([walkAt(), enters, ...seen()], [['block', D, 11], 1, true, false, false], 'a click reaching the second item: the walk on its span, Enter\'s act made there once, the ring drawn, no panel');
    heard.get('click')?.({ target: itemAt('walk-1') });
    for (let i = 0; i < 20 && enters < 2; i++) await new Promise((r) => setTimeout(r, 0));
    assert.deepEqual([walkAt(), enters], [['block', D, 11], 2], 'a click reaching the walk\'s own item: Enter\'s act made there again, the walk where it stands');
  } finally {
    WALK.readers({});
    globalThis.document = platform;
  }
});

test('Esc at a live caret, and a walk key at one, ask the draft\'s open burst committed as the text is left; a zoom past its reading scale leaves the caret kept and commits nothing — that burst commits at its own pause (D5 K-73, K-77; D6 BM-4, BM-5)', async () => {
  const W = '1.0.1.0.44', text = 'First line.\n\nSecond line here.\n', n = byteLength(text);
  REC.takeSpanSet(W, [{ subspace: 1, ordinal: 1, positions: n }]);
  REC.takeMetadata(W, /** @type {any} */ (F.decodeDocMetadata({ as_of: 1, resp: 'doc_metadata', doc: W, published: false, owner: '1.0.1' })));
  REC.takeDelivery(W, [{ pos: 1, width: n, kind: 'content', text, ref: null, origin: null }], 1, { from: 1, runs: [{ iStart: W + '.0.1.1', width: n }] });
  const f = LAYER.foldOf(REC.doc(W)), box = docBox(W), c = f.columns[0];
  const reading = { x: box.x + c.x + c.w / 2, y: box.y + c.y + c.h / 2, scale: 12 / f.fs };
  CAM.set(reading);
  /** @type {string[]} */
  const committed = [];
  WRITE.machine({ commit: (addr) => committed.push(addr), typed() {}, ended() {}, leaving() {} });
  try {
    assert.equal(LAYER.editable(W), true, 'a draft of the session\'s account at its reading scale');
    await WALK.focusTo(W, 1, true, null, true);
    LAYER.placeCaret(W, 1);
    WRITE.setFlight(W, true);
    assert.equal(WALK.leaveText(), true);
    assert.deepEqual([committed, LAYER.caret()?.live], [[W], false], 'Esc: the open burst asked committed, the caret kept');
    LAYER.returnCaret();
    CAM.set({ ...reading, scale: reading.scale / 6 });
    assert.equal(LAYER.editable(W), false, 'past its reading scale');
    await WALK.retakeFromView();
    assert.deepEqual([committed, LAYER.caret()?.live, WRITE.inFlight(W)], [[W], false, true], 'a zoom-out: the caret kept, nothing committed, the burst still open');
    CAM.set(reading);
    LAYER.returnCaret();
    await run(WALK.key('down'));
    assert.deepEqual([committed, LAYER.caret()?.live], [[W, W], false], 'a walk key off the caret: committed as the text is left');
  } finally { WRITE.machine(null); WRITE.setFlight(W, false); LAYER.dropCaret(); REC.invalidate(W); }
});
