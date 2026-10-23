// O-VERSIONS' test against the FAKE PORT: each member's row marks whether it
// holds the passage held by `compare` over the member's own extent, one span
// read per member — a member longer than its document, holding the passage
// past the document's length, holds it whole, which `compare` over the
// document's length answers with nothing (a mutant that compares over the
// document's extent marks it as holding none of the passage and turns red);
// each row marked by the rule a landing reads (issue #153) — part where the
// member holds as many positions as the passage and not all of it (a mutant
// that sums the pairs' widths marks it whole and turns red), all of it in
// pieces with its places, couldn't tell by the refusal met where the board
// did not answer (a mutant that leaves the strip blank turns red);
// and each member's read act is a version move carrying the passage held
// (issue #154), landing in place — no flight, the camera where it stood, the
// box taking the member (a mutant that LEAPs flies and turns red) — the
// landing marked at its counterpart in the member (a mutant that hands the
// member the document's position unprojected marks nothing and turns red);
// a list opened at the version its box shows holds the passage in that
// version, comparing and carrying it from there (a mutant that holds it in
// the trunk asks a compare no script answers and turns red); and a list
// whose probe of the chain meets a member the board did not answer records no
// count, so the list opened again once the board answers probes the chain to
// its end (a mutant that ends the chain at that member records a count cut
// short and turns red). The list stands at the act's site: opened by a
// floating end's face, where the face stood, the head landed on — never at
// the viewport's corner (a mutant whose face hands the list no place turns
// red); opened by the corner's act at its version statement, at the
// statement, the document's box beside it — its top-left, the side the corner
// stands on — where it stands once T-LAYER rewrites the corner or takes it
// down (a mutant that anchors it at the statement alone turns red). The
// overlay host stands on a stand-in element, the platform's document a
// stand-in beside it, so the rows are read from what the host wrote.
import { test, before } from 'node:test';
import assert from 'node:assert/strict';
import * as PORT from '../bridge/port.js';
import * as REC from '../model/records.js';
import * as PUMP from '../model/pump.js';
import * as F from '../model/frames.js';
import * as FAKE from '../test/fake-port.js';
import * as CAM from '../plane/camera.js';
import * as GO from '../nav/go.js';
import { docBox } from '../plane/projection.js';
import * as HOST from './host.js';
import * as FACES from './faces.js';
import * as VERSIONS from './versions.js';
import { t } from '../strings.js';
import { esc } from '../util.js';

const T = '1.0.1.0.43', T1 = T + '.1', T2 = T + '.2';
// the edition and its first member: two paragraphs; its second member: a prologue set before them, which stands the second paragraph 24 positions later
const TEXT = 'First.\n\nSecond paragraph.', PROLOGUE = 'Prologue added before.\n\n', TEXT2 = PROLOGUE + TEXT;
/** the second paragraph, the passage held: its first position and its positions, in the edition */
const HELD = { pos: TEXT.indexOf('Second') + 1, width: 'Second paragraph.'.length };

/** the reads of a document of `trunk`'s chain read whole: its extent, its metadata, its text, its image, its links (none) */
const reads = (/** @type {string} */ doc, /** @type {string} */ text, trunk = T) => ({
  [FAKE.keyOf('op', { frame: F.retrieveDocVSpanSet(doc) })]: { result: { as_of: 1, resp: 'span_set', set: [{ start: '1.1', width: '0.' + text.length }] } },
  [FAKE.keyOf('op', { frame: F.docMetadata(doc) })]: { result: { as_of: 1, resp: 'doc_metadata', doc, published: true, owner: '1.0.1', birth: trunk + '.1', birth_extent: String(TEXT.length), placed: null, base_extent: null, source: null } },
  [FAKE.keyOf('op', { frame: F.retrieveV(doc, 1, text.length) })]: { result: { as_of: 1, resp: 'delivery', items: [{ content: text }] } },
  [FAKE.keyOf('op', { frame: F.image(doc, 1, text.length) })]: { result: { as_of: 1, resp: 'runs', runs: [{ i_start: trunk + '.0.1.1', width: String(text.length) }] } },
  [FAKE.keyOf('op', { frame: F.findLinksV(doc, 1, text.length) })]: { result: { as_of: 1, resp: 'addrs', addrs: [] } },
});
/** `compare`'s answer for a passage held in `doc` (the held passage of T unless named) against a member's positions 1 to `extent`: the pairs given */
const compared = (/** @type {string} */ member, /** @type {number} */ extent, /** @type {Array<[number, number, number]>} */ pairs, doc = T, held = HELD) => ({
  [FAKE.keyOf('op', { frame: F.compare([{ doc, spans: [{ ordinal: held.pos, positions: held.width }] }], [{ doc: member, spans: [{ ordinal: 1, positions: extent }] }]) })]:
    { result: { as_of: 1, resp: 'compare', pairs: pairs.map(([u1, u2, width]) => ({ d1: doc, d2: member, u1: { ordinal: String(u1), subspace: '1' }, u2: { ordinal: String(u2), subspace: '1' }, width: String(width) })) } },
});
// another edition, U, of two members, each its text whole; the passage held where the list is opened on no position: its first block, whole
const U = '1.0.1.0.44', U1 = U + '.1', U2 = U + '.2';
const FIRST = { pos: 1, width: 'First.\n\n'.length };
// another edition, V, of four members, the passage held its second paragraph: the first holding it whole; the second its first nine
// positions and its first eight again — as many positions as the passage, never all of it; the third all of it in two pieces, its last
// nine positions first; the fourth's extent the board does not answer
const V = '1.0.1.0.45', V1 = V + '.1', V2 = V + '.2', V3 = V + '.3', V4 = V + '.4';
const script = {
  ...reads(T, TEXT), ...reads(T1, TEXT), ...reads(T2, TEXT2),
  ...compared(T1, TEXT.length, [[HELD.pos, HELD.pos, HELD.width]]),
  ...compared(T2, TEXT2.length, [[HELD.pos, HELD.pos + PROLOGUE.length, HELD.width]]),
  // the second member's first positions, as long as the edition: its prologue and its first paragraph, none of the passage
  ...compared(T2, TEXT.length, []),
  ...reads(U, TEXT, U), ...reads(U1, TEXT, U), ...reads(U2, TEXT, U),
  ...compared(U1, TEXT.length, [[1, 1, FIRST.width]], U, FIRST), ...compared(U2, TEXT.length, [[1, 1, FIRST.width]], U, FIRST),
  [FAKE.keyOf('op', { frame: F.docMetadata(U + '.3') })]: { refused: { kind: 'refused', name: 'doc_not_registered', code: 'doc_not_registered' } },
  ...reads(V, TEXT, V), ...reads(V1, TEXT, V), ...reads(V2, TEXT, V), ...reads(V3, TEXT, V),
  ...compared(V1, TEXT.length, [[HELD.pos, HELD.pos, HELD.width]], V),
  ...compared(V2, TEXT.length, [[HELD.pos, 1, 9], [HELD.pos, 12, 8]], V),
  ...compared(V3, TEXT.length, [[HELD.pos + 8, 1, HELD.width - 8], [HELD.pos, 15, 8]], V),
  [FAKE.keyOf('op', { frame: F.retrieveDocVSpanSet(V4) })]: { refused: { kind: 'unreachable', name: 'unreachable', text: 'the board is not answering' } },
};
/** the board out while U's chain is first probed: its second member's metadata not answered until the outage ends */
let outage = true;
const U2_META = script[FAKE.keyOf('op', { frame: F.docMetadata(U2) })];
Object.defineProperty(script, FAKE.keyOf('op', { frame: F.docMetadata(U2) }), {
  enumerable: true,
  get: () => (outage ? { refused: { kind: 'unreachable', name: 'unreachable', text: 'the board is not answering' } } : U2_META),
});

/** @type {ReturnType<typeof FAKE.create>} */
let fake;
/** the overlay host's stand-in element: what the host writes into it is what a person meets */
const hostEl = { className: '', innerHTML: '', style: {}, setAttribute() {}, removeAttribute() {}, addEventListener() {}, querySelector: () => null, querySelectorAll: () => [], getBoundingClientRect: () => ({ left: 0, top: 0, width: 0, height: 0 }), contains: () => false };
/** the list's rows: each member's number and what its strip marks */
const rows = () => [...hostEl.innerHTML.matchAll(/data-run="read(\d+)"[^>]*>[^<]*<\/button> <span class="strip" data-holds="([a-z]*)"/g)].map((m) => [Number(m[1]), m[2]]);

before(async () => {
  REC._reset();
  globalThis.document = /** @type {any} */ ({ activeElement: null, body: null });
  globalThis.HTMLElement = /** @type {any} */ (class {});
  HOST.attach(/** @type {any} */ (hostEl));
  fake = FAKE.create(script);
  PORT.boot(fake);
  REC.setBoard({ board: 'b-1', name: '', origin: '' }); REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  REC.takeIndex(/** @type {any} */ ({ docs: [{ doc: T, kind: 'edition', label: 't', standing: 'public' }], counts: [{ account: '1.0.1', documents: 1 }], state: { arm: 'complete' } }));
  CAM.setViewport(1440, 900);
  await PUMP.loadWhole(T);
  REC.takeMembers(T, 2);
});

test('each member\'s row marks the passage held by `compare` over the member\'s own extent: a member longer than its document holds it whole past the document\'s length', async () => {
  await VERSIONS.open(T, HELD.pos, null);
  assert.deepEqual(rows(), [[1, 'whole'], [2, 'whole']], hostEl.innerHTML);
  assert.deepEqual(fake.unanswered, []);
});

test('each row reads its member by the rule a landing reads (issue #153): whole, in one piece; part, though it holds as many positions as the passage; all of it in pieces, its places named; couldn\'t tell, by the refusal met, where the board did not answer — never a strip left blank', async () => {
  await PUMP.loadWhole(V);
  REC.takeMembers(V, 4);
  await VERSIONS.open(V, HELD.pos, null);
  assert.deepEqual(rows(), [[1, 'whole'], [2, 'part'], [3, 'pieces'], [4, 'unknown']], hostEl.innerHTML);
  const strips = [...hostEl.innerHTML.matchAll(/<span class="strip" data-holds="[a-z]*">([^<]*)<\/span>/g)].map((m) => m[1]);
  assert.deepEqual(strips, [t('F.versions.whole'), t('F.versions.part'), t('L.versions.pieces', { n: 2 }), t('L.versions.unknown', { reason: t('F.daemon.unreachable') })].map(esc), 'each in its words');
  HOST.dismiss();
  assert.deepEqual(fake.unanswered, []);
});

test('a member\'s read act is a version move carrying the passage held (issue #154): it lands in place, never flying, the box taking the member and the landing marked at the passage\'s counterpart there, never at the edition\'s position', async () => {
  await VERSIONS.open(T, HELD.pos, null);
  const o = HOST.currentState();
  const read = o && o.acts ? o.acts['read2'] : null;
  assert.ok(read, 'the second member\'s row offers its read act');
  const at = CAM.view();
  let flew = false;
  read(/** @type {any} */ (hostEl), false);
  for (let i = 0; i < 200 && !GO.arrivalMark(); i++) { await new Promise((r) => setTimeout(r, 0)); flew = flew || CAM.flying(); if (CAM.flying()) CAM.step(Infinity); }
  assert.deepEqual(GO.arrivalMark(), { addr: T2, pos: HELD.pos + PROLOGUE.length, runs: [{ pos: HELD.pos + PROLOGUE.length, width: HELD.width }], link: null });
  const v = CAM.view();
  assert.ok(!flew && v.x === at.x && v.y === at.y && v.scale === at.scale, 'no flight: the camera where it stood');
  assert.equal(GO.shownIn(T), T2, 'the box takes the member');
  assert.deepEqual(fake.unanswered, []);
});

test('the list opened at the version its box shows holds the passage in that version (issue #154): its rows compare the passage from it, and its read acts carry it from it — never the trunk\'s positions', async () => {
  /** the second paragraph as the second member sets it: the passage held, read in that member */
  const HELD2 = { pos: HELD.pos + PROLOGUE.length, width: HELD.width };
  Object.assign(script, compared(T1, TEXT.length, [[HELD2.pos, HELD.pos, HELD.width]], T2, HELD2), compared(T2, TEXT2.length, [[HELD2.pos, HELD2.pos, HELD.width]], T2, HELD2));
  await run(GO.leapTo(T2));
  assert.equal(GO.shownIn(T), T2, 'a LEAP to the member: its box shows it');
  await VERSIONS.open(T2, HELD2.pos, null);
  assert.deepEqual(rows(), [[1, 'whole'], [2, 'whole']], hostEl.innerHTML);
  assert.ok(hostEl.innerHTML.includes(esc(t('F.version-of', { k: 2, n: 2 }))), 'version 2 of 2: the list opened at the member');
  const read = HOST.currentState()?.acts?.read1;
  assert.ok(read, 'the first member\'s row offers its read act');
  read(/** @type {any} */ (hostEl), false);
  for (let i = 0; i < 200 && GO.arrivalMark()?.addr !== T1; i++) await new Promise((r) => setTimeout(r, 0));
  assert.deepEqual([GO.arrivalMark(), GO.shownIn(T)], [{ addr: T1, pos: HELD.pos, runs: [{ pos: HELD.pos, width: HELD.width }], link: null }, T1], 'carried from the member: its counterpart in the first');
  assert.deepEqual(fake.unanswered, []);
});

test('a list whose probe of the chain the board did not answer records no count, so the list opened again once it answers probes the chain to its end', async () => {
  await VERSIONS.open(U, null, null);
  assert.equal(REC.doc(U).members, null, 'U.2 not answered: no count recorded, never a chain cut short at its birth');
  outage = false;
  await VERSIONS.open(U, null, null);
  assert.equal(REC.doc(U).members, 2, 'probed again: U.2 answers, U.3 is not registered');
  assert.deepEqual(rows(), [[1, 'whole'], [2, 'whole']], hostEl.innerHTML);
  assert.deepEqual(fake.unanswered, []);
});

/** an act run to its end, its flight stepped to its last frame */
async function run(/** @type {Promise<unknown>} */ act) {
  let done = false;
  void act.then(() => { done = true; });
  for (let i = 0; i < 200 && !done; i++) { await new Promise((r) => setTimeout(r, 0)); if (CAM.flying()) CAM.step(Infinity); }
  assert.ok(done, 'the act ran to its end');
}

/** an act's list read to its end: the host's opening pending no more */
async function opened() {
  for (let i = 0; i < 200 && HOST.pending(); i++) await new Promise((r) => setTimeout(r, 0));
  assert.equal(HOST.pending(), false, 'the list\'s reads answered');
}

test('opened from a floating end\'s face, the list stands where the face stood — the head landed on — never at the viewport\'s corner', async () => {
  /** the head a follow of a floating end landed on in U, as N-GO hands it to the face */
  const head = { span: { addr: U, pos: 1 } };
  FACES.floating(U, head);
  const face = HOST.currentState();
  assert.deepEqual([face?.id, face?.anchor], ['face:floating', head], 'the face at the head');
  const act = face && face.acts ? face.acts['a0'] : null;
  assert.ok(act, 'the face offers its act');
  act(/** @type {any} */ (hostEl), false);
  await opened();
  assert.deepEqual([HOST.currentState()?.id, HOST.currentState()?.anchor], ['versions:' + U, head], 'the list in the face\'s place, at the head');
  HOST.dismiss();
  assert.deepEqual(fake.unanswered, []);
});

test('opened by the corner\'s act at its version statement, the list stands at it, the document\'s box beside it — its top-left, the side the corner stands on — where it stands once the corner is rewritten or taken down', async () => {
  /** the statement in the corner's element, out of the page once the corner is rewritten */
  const statement = { isConnected: false };
  /** the corner's element: its document named, its version statement in it */
  const corner = { dataset: { corner: T }, querySelector: (/** @type {string} */ s) => (s === '.version' ? statement : null) };
  assert.equal(VERSIONS.fromCorner(/** @type {any} */ (corner), { addr: T, ...HELD }), true, 'the corner has the act');
  await opened();
  const b = docBox(T);
  assert.deepEqual([HOST.currentState()?.id, HOST.currentState()?.anchor], ['versions:' + T, { el: statement, world: { x: b.x, y: b.y } }]);
  HOST.dismiss();
  assert.deepEqual(fake.unanswered, []);
});
