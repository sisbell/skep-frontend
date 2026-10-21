// O-VERSIONS' test against the FAKE PORT: each member's row marks whether it
// holds the passage held by `compare` over the member's own extent, one span
// read per member — a member longer than its document, holding the passage
// past the document's length, holds it whole, which `compare` over the
// document's length answers with nothing (a mutant that compares over the
// document's extent marks it as holding none of the passage and turns red);
// and each member's read act LEAPs carrying the passage held, the landing
// marked at its counterpart in the member (a mutant that hands the member the
// document's position unprojected marks nothing and turns red); and a list
// whose probe of the chain meets a member the board did not answer records no
// count, so the list opened again once the board answers probes the chain to
// its end (a mutant that ends the chain at that member records a count cut
// short and turns red). The overlay host stands on a stand-in element, the
// platform's document a stand-in beside it, so the rows are read from what the
// host wrote.
import { test, before } from 'node:test';
import assert from 'node:assert/strict';
import * as PORT from '../bridge/port.js';
import * as REC from '../model/records.js';
import * as PUMP from '../model/pump.js';
import * as F from '../model/frames.js';
import * as FAKE from '../test/fake-port.js';
import * as CAM from '../plane/camera.js';
import * as GO from '../nav/go.js';
import * as HOST from './host.js';
import * as VERSIONS from './versions.js';

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
const script = {
  ...reads(T, TEXT), ...reads(T1, TEXT), ...reads(T2, TEXT2),
  ...compared(T1, TEXT.length, [[HELD.pos, HELD.pos, HELD.width]]),
  ...compared(T2, TEXT2.length, [[HELD.pos, HELD.pos + PROLOGUE.length, HELD.width]]),
  // the second member's first positions, as long as the edition: its prologue and its first paragraph, none of the passage
  ...compared(T2, TEXT.length, []),
  ...reads(U, TEXT, U), ...reads(U1, TEXT, U), ...reads(U2, TEXT, U),
  ...compared(U1, TEXT.length, [[1, 1, FIRST.width]], U, FIRST), ...compared(U2, TEXT.length, [[1, 1, FIRST.width]], U, FIRST),
  [FAKE.keyOf('op', { frame: F.docMetadata(U + '.3') })]: { refused: { kind: 'refused', name: 'doc_not_registered', code: 'doc_not_registered' } },
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

test('a member\'s read act LEAPs carrying the passage held: the landing marked at its counterpart in the member, never at the edition\'s position', async () => {
  await VERSIONS.open(T, HELD.pos, null);
  const o = HOST.currentState();
  const read = o && o.acts ? o.acts['read2'] : null;
  assert.ok(read, 'the second member\'s row offers its read act');
  read(/** @type {any} */ (hostEl), false);
  for (let i = 0; i < 200 && (!GO.arrivalMark() || CAM.flying()); i++) { await new Promise((r) => setTimeout(r, 0)); if (CAM.flying()) CAM.step(Infinity); }
  assert.deepEqual(GO.arrivalMark(), { addr: T2, pos: HELD.pos + PROLOGUE.length, runs: [{ pos: HELD.pos + PROLOGUE.length, width: HELD.width }], link: null });
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
