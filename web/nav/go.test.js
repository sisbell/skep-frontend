// N-GO's test against the FAKE PORT: a follow lands on the span its link's
// far end projects to NOW and lights the arrival mark on that span — its
// first position and its positions, never the position alone (a mutant that
// drops the projection's width turns red); a LEAP puts it out, and Back to
// the follow's entry lights it again on the same span (a mutant that
// re-lights it from the entry's position alone turns red); a link naming the
// far document whole lights it at the document's first position, no width.
// Every teleport a key made draws the focus ring at its landing, and one the
// pointer made puts it out (a mutant that drops any one teleport's word of
// the key turns red; one that draws the ring at every landing turns red).
// THE ORDER OF ACTS, each with an answer held while acts are made: a Back or
// a jump made while a LEAP reads acts from the LEAP's entry, which stands
// ahead of the cursor at its landing, and the LEAP lands nowhere (a mutant
// that pushes after the read, or lands an act a later one overtook, turns
// red); a Back made while a follow reads leaves the follow's entry ahead at
// its span, the arrival out; every act made while a LEAP reads — a LEAP, a
// follow, HOME, WHOLE BOARD, an account's region — stands after the LEAP's
// entry and lands (a mutant that leaves any one uncounted turns red); a LEAP
// that faces leaves the entries ahead of the cursor standing (a mutant whose
// withdrawal forgets them turns red); Forward to a LEAP's entry while it
// reads lands at the landing the read placed (a mutant that lands without
// waiting turns red); a Back waiting on a claim puts the arrival out as it is
// made and lands nowhere once Forward has been made (the ring as Forward left
// it); a follow that faces leaves the trail as it found it. A departure made
// during a flight re-takes the flight's destination, so Forward lands there —
// after a LEAP's flight and after a Back's (a mutant that re-takes the camera
// mid-flight turns red).
// A LEAP lands at reading scale at any depth (E18 (a)): to a document minted
// a grid deeper than any the page booted with, and to a residue member whose
// many paragraphs set it at under a fifth of its place's em (a camera whose
// bound stops at the places' ems lands both below the mount's em and turns
// red).
import { test, before } from 'node:test';
import assert from 'node:assert/strict';
import * as PORT from '../bridge/port.js';
import * as REC from '../model/records.js';
import * as PUMP from '../model/pump.js';
import * as F from '../model/frames.js';
import * as FAKE from '../test/fake-port.js';
import * as CAM from '../plane/camera.js';
import * as LK from '../links/links.js';
import * as LAYER from '../text/layer.js';
import { docBox, depthOfDoc, DEPTH_SOUND } from '../plane/projection.js';
import * as TRAIL from './trail.js';
import * as WALK from './walk.js';
import * as GO from './go.js';

const D = '1.0.1.0.3', FAR = '1.0.1.0.127', CITE = '1.1.0.1.0.1.0.3.13';
const NEAR_TEXT = 'Tumbler.\n\nThe first field.', FAR_TEXT = 'The far edition.\n\nIts cited passage stands here.';
// C: a document whose text the page does not hold until a LEAP reads it whole; GONE: an address the board answers for with nothing
const C = '1.0.1.0.5', GONE = '1.0.1.0.9';
const C_TEXT = 'A third edition, longer than the first two.\n\nIts text is read whole on the LEAP\'s ask, and its face fitted to it.\n\nA last paragraph.';
// DEEP: the account's 145th document, in its third continuation, a grid deeper than FAR, the deepest the index lists; RES: a member of
// the residue past the sound depth, its two hundred one-line paragraphs setting it far smaller than its place's em
const DEEP = '1.0.1.0.145', RES = `1.0.1.0.${48 * (DEPTH_SOUND + 1) + 1}`;
const DEEP_TEXT = 'A note minted after the page booted.', RES_TEXT = Array.from({ length: 200 }, (_, i) => `Item ${i + 1}.`).join('\n\n');
const NEAR_EXTENT = NEAR_TEXT.length, FAR_EXTENT = FAR_TEXT.length;
const span = (/** @type {string} */ doc, /** @type {number} */ ord, /** @type {number} */ w) => ({ start: `${doc}.0.1.${ord}`, width: '0.0.0.0.0.0.0.' + w, doc, account: '1.0.1', whole: false, subspace: 1, ordinal: ord, positions: w });
const whole = (/** @type {string} */ doc) => ({ start: doc, width: '0.0.0.0.1', doc, account: '1.0.1', whole: true, subspace: null, ordinal: null, positions: null });
// the person's citations from the first edition: one of a passage of FAR, one of FAR whole
const PASSAGE = D + '.0.2.1', WHOLE = D + '.0.2.2';

/** the reads of a document read whole: its extent, its metadata, its text, its image, its links */
const reads = (/** @type {string} */ doc, /** @type {string} */ text, /** @type {string[]} */ links) => ({
  [FAKE.keyOf('op', { frame: F.retrieveDocVSpanSet(doc) })]: { result: { as_of: 1, resp: 'span_set', set: [{ start: '1.1', width: '0.' + text.length }] } },
  [FAKE.keyOf('op', { frame: F.docMetadata(doc) })]: { result: { as_of: 1, resp: 'doc_metadata', doc, published: true, owner: '1.0.1', birth: doc + '.1', birth_extent: String(text.length), placed: null, base_extent: null, source: null } },
  [FAKE.keyOf('op', { frame: F.retrieveV(doc, 1, text.length) })]: { result: { as_of: 1, resp: 'delivery', items: [{ content: text }] } },
  [FAKE.keyOf('op', { frame: F.image(doc, 1, text.length) })]: { result: { as_of: 1, resp: 'runs', runs: [{ i_start: doc + '.0.1.1', width: String(text.length) }] } },
  [FAKE.keyOf('op', { frame: F.findLinksV(doc, 1, text.length) })]: { result: { as_of: 1, resp: 'addrs', addrs: links } },
});
const script = {
  ...reads(D, NEAR_TEXT, [PASSAGE, WHOLE]),
  ...reads(FAR, FAR_TEXT, []),
  ...reads(C, C_TEXT, []),
  ...reads(DEEP, DEEP_TEXT, []),
  ...reads(RES, RES_TEXT, []),
  [FAKE.keyOf('op', { frame: F.retrieveDocVSpanSet(GONE) })]: { refused: { kind: 'refused', name: 'doc_not_registered', code: 'doc_not_registered' } },
  // where each citation's far end projects into FAR now: the passage at 20, five positions; FAR whole, all of it
  [FAKE.keyOf('op', { frame: F.project(PASSAGE, 2, FAR) })]: { result: { as_of: 1, resp: 'span_set', set: [{ start: '1.20', width: '0.5' }] } },
  [FAKE.keyOf('op', { frame: F.project(WHOLE, 2, FAR) })]: { result: { as_of: 1, resp: 'span_set', set: [{ start: '1.1', width: '0.' + FAR_EXTENT }] } },
};

/** @type {ReturnType<typeof FAKE.create>} */
let fake;

/** an act run to its end: the flight it starts stepped to its last frame */
async function run(/** @type {Promise<unknown>} */ act) {
  let done = false;
  act.then(() => { done = true; });
  for (let i = 0; i < 200 && !done; i++) { await new Promise((r) => setTimeout(r, 0)); if (CAM.flying()) CAM.step(Infinity); }
  assert.ok(done, 'the act ran to its end');
}
/** a citation as LK draws it at the first edition */
const drawn = (/** @type {string} */ link) => /** @type {import('../links/links.js').Shown} */ (LK.shown(D).find((s) => s.link.addr === link));
/** two views the same, within a flight's last step's rounding */
const same = (/** @type {{x: number, y: number, scale: number}} */ a, /** @type {{x: number, y: number, scale: number}} */ b) => [a.x - b.x, a.y - b.y, a.scale - b.scale].every((d, i) => Math.abs(d) <= 1e-9 * Math.max(1, Math.abs([b.x, b.y, b.scale][i])));
/** the walk's element: its kind, its place, its position */
const walkAt = () => { const f = WALK.current(); return f && [f.kind, f.addr, f.pos]; };
/** the trail's places, oldest first */
const addrs = () => TRAIL.all().map((e) => e.addr);
/** C as the page holds it before a LEAP reads it: no text */
const unread = () => REC.invalidate(C);

before(async () => {
  REC._reset(); LK._reset(); TRAIL._reset();
  fake = FAKE.create(script);
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.setBoard({ board: 'b-1', name: '', origin: '' }); REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  REC.takeIndex(/** @type {any} */ ({ docs: [{ doc: D, kind: 'edition', label: 'd', standing: 'public' }, { doc: FAR, kind: 'edition', label: 'far', standing: 'public' }], counts: [{ account: '1.0.1', documents: 2 }], state: { arm: 'complete' } }));
  CAM.setViewport(1440, 900);
  CAM.setDeepest(Math.max(...REC.places().map((p) => depthOfDoc(p.doc)))); // the bound the app's boot sets over the index
  REC.takeLink({ addr: PASSAGE, from: [span(D, 11, 5)], to: [span(FAR, 20, 5)], type: CITE });
  REC.takeLink({ addr: WHOLE, from: [span(D, 17, 5)], to: [whole(FAR)], type: CITE });
  await PUMP.loadWhole(D);
  assert.deepEqual(LK.shown(D).map((s) => [s.link.addr, s.farWhole]), [[PASSAGE, false], [WHOLE, true]]);
  await GO.launch();
});

test('a follow lights the arrival mark on the span its link\'s far end projects to: its first position and its positions', async () => {
  await run(GO.follow(drawn(PASSAGE)));
  assert.deepEqual(GO.arrivalMark(), { addr: FAR, pos: 20, width: 5, link: PASSAGE });
  const e = TRAIL.current();
  assert.deepEqual(e && [e.addr, e.pos, e.width, e.link], [FAR, 20, 5, PASSAGE], 'the landing\'s entry carries the span');
  assert.deepEqual(fake.unanswered, []);
});

test('a LEAP puts the arrival out; Back to the follow\'s entry lights it again on the same span', async () => {
  await run(GO.leapTo(D));
  assert.equal(GO.arrivalMark(), null);
  await run(GO.back());
  assert.deepEqual(GO.arrivalMark(), { addr: FAR, pos: 20, width: 5, link: PASSAGE });
  assert.deepEqual(fake.unanswered, []);
});

test('a link naming the far document whole lights the arrival at the document\'s first position, no width', async () => {
  await run(GO.follow(drawn(WHOLE)));
  assert.deepEqual(GO.arrivalMark(), { addr: FAR, pos: 1, width: null, link: WHOLE });
  assert.deepEqual(fake.unanswered, []);
});

test('a teleport a key made draws the focus ring at its landing; one the pointer made puts it out', async () => {
  /** the teleport run to its end, and whether the ring stands at its landing */
  const ring = async (/** @type {Promise<unknown>} */ act) => { await run(act); return WALK.ringShown(); };
  assert.equal(await ring(GO.leapTo(D, { how: 'key', byKey: true })), true, 'Enter on a document');
  assert.equal(await ring(GO.leapTo(FAR, { how: 'click' })), false, 'a click on a place');
  assert.equal(await ring(GO.back(true)), true, 'Mod+[');
  assert.equal(await ring(GO.forward()), false, 'a click on › forward');
  assert.equal(await ring(GO.follow(drawn(PASSAGE), null, true)), true, 'Mod+Enter');
  assert.equal(await ring(GO.wholeBoard(true)), true, 'Mod+0');
  assert.equal(await ring(GO.home(true)), true, 'Mod+Shift+H');
  assert.equal(await ring(GO.toAccount('1.0.1', true)), true, 'Enter on an account');
  assert.equal(await ring(GO.toTrailEntry(2, true)), true, 'Mod+2');
  assert.equal(TRAIL.current()?.label, 'HOME', 'Mod+2 moved the cursor to HOME\'s entry');
  assert.deepEqual(fake.unanswered, []);
});

test('a Back or a jump made while a LEAP reads acts from the LEAP\'s entry: the entries before it keep their views, the LEAP\'s stands ahead at its landing, and the LEAP lands nowhere', async () => {
  for (const [what, act] of /** @type {Array<[string, () => Promise<boolean>]>} */ ([['Back', () => GO.back()], ['a jump to the entry behind', () => GO.toTrailEntry(2)]])) {
    unread();
    await run(GO.leapTo(D));
    const at = CAM.view(), before = TRAIL.all().map((e) => ({ addr: e.addr, view: { ...e.view } }));
    const release = fake.hold('op', { frame: F.retrieveDocVSpanSet(C) });
    const leap = GO.leapTo(C);
    const claimed = TRAIL.current()?.addr;
    await run(act());
    release();
    await run(leap);
    const after = TRAIL.all();
    assert.equal(claimed, C, `${what}: the LEAP's entry stands as the LEAP is made`);
    assert.deepEqual(after.map((e) => e.addr), [...before.map((e) => e.addr), C], `${what}: the LEAP's entry after D's, nothing dropped`);
    assert.equal(TRAIL.cursorIndex(), before.length - 1, `${what}: the cursor on D's`);
    assert.ok(before.slice(0, -1).every((b, i) => same(after[i].view, b.view)), `${what}: the entries before D's keep their views`);
    assert.ok(same(after[before.length - 1].view, at), `${what}: D's at the view the LEAP departed`);
    assert.ok(same(after[before.length].view, GO.viewFor(C, null)), `${what}: the LEAP's at its landing`);
    assert.ok(same(CAM.view(), at), `${what}: the camera at D, where the act landed`);
    assert.deepEqual(walkAt(), ['document', D, null], `${what}: the walk on D`);
  }
  await run(GO.forward());
  assert.ok(same(CAM.view(), GO.viewFor(C, null)), 'Forward lands at the LEAP\'s landing');
  assert.deepEqual(walkAt(), ['document', C, null]);
  assert.deepEqual(fake.unanswered, []);
});

test('a Back made while a follow reads goes back from the follow\'s entry, which stands ahead at the span its far end projects to, the arrival out', async () => {
  await run(GO.leapTo(D));
  const at = CAM.view(), n = TRAIL.length();
  const release = fake.hold('op', { frame: F.project(PASSAGE, 2, FAR) });
  const following = GO.follow(drawn(PASSAGE));
  await run(GO.back());
  release();
  await run(following);
  const far = TRAIL.all()[n];
  assert.deepEqual(addrs().slice(n - 1), [D, FAR], 'the follow\'s entry after D\'s');
  assert.equal(TRAIL.cursorIndex(), n - 1, 'the cursor on D\'s');
  assert.deepEqual(far && [far.pos, far.width, far.link], [20, 5, PASSAGE], 'at the span its far end projects to');
  assert.ok(far && same(far.view, GO.viewFor(FAR, 20)), 'at that span\'s view');
  assert.equal(GO.arrivalMark(), null, 'the arrival out: the follow landed nowhere');
  assert.ok(same(CAM.view(), at), 'the camera at D');
  assert.deepEqual(walkAt(), ['document', D, null]);
  assert.deepEqual(fake.unanswered, []);
});

test('an act made while a LEAP reads stands after the LEAP\'s entry and lands; the LEAP whose read answers after it lands nowhere', async () => {
  /** @type {Array<[string, () => Promise<unknown>, string]>} each act, and the place its entry names */
  const acts = [
    ['a LEAP', () => GO.leapTo(FAR), FAR],
    ['a follow', () => GO.follow(drawn(PASSAGE)), FAR],
    ['HOME', () => GO.home(), '1.0.1'],
    ['WHOLE BOARD', () => GO.wholeBoard(), '1'],
    ['an account\'s region', () => GO.toAccount('1.0.1'), '1.0.1'],
  ];
  for (const [what, act, addr] of acts) {
    unread();
    await run(GO.leapTo(D));
    const n = TRAIL.length();
    const release = fake.hold('op', { frame: F.retrieveDocVSpanSet(C) });
    const leap = GO.leapTo(C);
    await run(act());
    const landed = CAM.view(), walked = walkAt();
    release();
    await run(leap);
    assert.deepEqual(addrs().slice(n - 1), [D, C, addr], `${what}: the trail holds the moves in the order they were made`);
    assert.equal(TRAIL.cursorIndex(), n + 1, `${what}: the cursor on its entry`);
    assert.ok(walked && walked[1] === addr && same(CAM.view(), landed), `${what}: the camera and the walk where it landed`);
    assert.deepEqual(walkAt(), walked, `${what}: the walk where it landed`);
  }
  assert.deepEqual(fake.unanswered, []);
});

test('a LEAP that faces leaves the trail as it found it: made with the cursor behind the newest entry, the entry ahead stands', async () => {
  await run(GO.leapTo(D));
  await run(GO.leapTo(FAR));
  await run(GO.back());
  const before = addrs(), cursor = TRAIL.cursorIndex();
  await run(GO.leapTo(GONE));
  assert.equal(REC.doc(GONE).refused, 'unregistered', 'the board answered for it with nothing');
  assert.deepEqual(addrs(), before, 'FAR\'s entry ahead of the cursor stands');
  assert.equal(TRAIL.cursorIndex(), cursor);
  assert.deepEqual(fake.unanswered, []);
});

test('Forward to a LEAP\'s entry while it reads lands once the read answers, at the landing the read placed', async () => {
  unread();
  await run(GO.leapTo(D));
  // a position in C's last paragraph: the unread record places it at the document's middle, the read far down it
  const last = C_TEXT.lastIndexOf('A last') + 1;
  const release = fake.hold('op', { frame: F.retrieveDocVSpanSet(C) });
  const leap = GO.leapTo(C, { pos: last });
  const placed = GO.viewFor(C, last);
  await run(GO.back());
  const forward = GO.forward();
  release();
  await run(leap);
  await run(forward);
  const landing = GO.viewFor(C, last);
  assert.ok(!same(placed, landing), 'the read moves the landing: the record unread places it elsewhere');
  assert.ok(same(CAM.view(), landing), 'Forward lands where the read placed it');
  assert.equal(TRAIL.current()?.addr, C);
  assert.deepEqual(walkAt(), ['block', C, last], 'the walk on the paragraph the LEAP named');
  assert.deepEqual(fake.unanswered, []);
});

test('a Back waiting on a LEAP\'s entry while it reads puts the arrival out as it is made, and lands nowhere once Forward has been made: the ring as Forward left it', async () => {
  unread();
  await run(GO.leapTo(D));
  const release = fake.hold('op', { frame: F.retrieveDocVSpanSet(C) });
  const leap = GO.leapTo(C);
  await run(GO.follow(drawn(PASSAGE)));
  const landed = CAM.view(), walked = walkAt(), lit = GO.arrivalMark();
  const back = GO.back(true);
  assert.equal(TRAIL.current()?.addr, C, 'Back reached the LEAP\'s entry, still reading');
  const out = GO.arrivalMark();
  await run(GO.forward());
  release();
  await run(leap);
  await run(back);
  assert.ok(lit && lit.link === PASSAGE, 'the follow lit the arrival');
  assert.equal(out, null, 'Back put it out as it was made: the reader has left the span');
  assert.deepEqual(addrs().slice(-3), [D, C, FAR]);
  assert.equal(TRAIL.current()?.addr, FAR);
  assert.ok(same(CAM.view(), landed), 'the camera at the follow\'s landing');
  assert.deepEqual(walkAt(), walked, 'the walk on the follow\'s span');
  assert.equal(WALK.ringShown(), false, 'Forward, a pointer\'s, put the ring out; the Back a key made drew none after it');
  assert.deepEqual(fake.unanswered, []);
});

test('a follow that faces leaves the trail as it found it: its entry, standing while it read, withdrawn', async () => {
  const DEAD = D + '.0.2.3';
  REC.takeLinks(D, [DEAD]);
  REC.takeLink({ addr: DEAD, from: [span(D, 23, 3)], to: [span(GONE, 1, 3)], type: CITE });
  await run(GO.leapTo(D));
  await run(GO.leapTo(FAR));
  await run(GO.back());
  const before = addrs(), cursor = TRAIL.cursorIndex();
  await run(GO.follow(drawn(DEAD)));
  assert.equal(REC.doc(GONE).refused, 'unregistered', 'a dead reference');
  assert.deepEqual(addrs(), before, 'FAR\'s entry ahead of the cursor stands');
  assert.equal(TRAIL.cursorIndex(), cursor);
  assert.deepEqual(fake.unanswered, []);
});

test('a Back made during a LEAP\'s flight re-takes the view the flight was bound for, and Forward lands there', async () => {
  await run(GO.leapTo(D));
  GO.leapTo(FAR); // its flight is replaced by Back's: never awaited
  const flight = CAM.cam.anim;
  assert.ok(flight, 'the LEAP flies');
  const bound = { ...flight.to };
  CAM.step(flight.t0 + flight.ms / 2);
  assert.ok(!same(CAM.view(), bound), 'the camera mid-flight');
  await run(GO.back());
  const entry = TRAIL.all()[TRAIL.cursorIndex() + 1];
  assert.ok(entry && entry.addr === FAR && same(entry.view, bound), 'the LEAP\'s entry holds the view its flight was bound for, not the camera mid-flight');
  await run(GO.forward());
  assert.ok(same(CAM.view(), bound), 'Forward lands there');
});

test('a second Back made during the first one\'s flight leaves the first one\'s entry at its own view, and Forward lands there', async () => {
  await run(GO.leapTo(D));
  await run(GO.leapTo(FAR));
  await run(GO.leapTo(D, { pos: 11 }));
  const own = { ...TRAIL.all()[TRAIL.cursorIndex() - 1].view };
  GO.back(); // its flight is replaced by the second Back's: never awaited
  const flight = CAM.cam.anim;
  assert.ok(flight && same(flight.to, own), 'the first Back flies to FAR\'s entry');
  CAM.step(flight.t0 + flight.ms / 2);
  await run(GO.back());
  assert.ok(same(TRAIL.all()[TRAIL.cursorIndex() + 1].view, own), 'FAR\'s entry keeps its own view');
  await run(GO.forward());
  assert.ok(same(CAM.view(), own), 'Forward lands at it');
});

/** the em, in px, at which the camera reads a document now: its face (T-LAYER's) at the camera's scale */
const emNow = (/** @type {string} */ addr) => CAM.view().scale * LAYER.metricsOf(REC.doc(addr)).fs;

test('a LEAP to a document minted a grid deeper than any the page booted with lands at its reading scale (E18 (a))', async () => {
  REC.applyFeedUpdate(/** @type {any} */ ({ position: 9001, at: 9001, op: 'create_new_document', docs: [DEEP], class: 'published' }));
  assert.equal(depthOfDoc(DEEP), depthOfDoc(FAR) + 1, 'a grid deeper than FAR, the deepest place the index listed at boot');
  await run(GO.leapTo(DEEP));
  assert.ok(Math.abs(emNow(DEEP) - 12.5) < 1e-6, `it reads at 12.5 px an em: ${emNow(DEEP)}`);
  assert.deepEqual(fake.unanswered, []);
});

test('a LEAP to a residue member its paragraphs set far smaller than its place\'s em lands at its reading scale (E18 (a))', async () => {
  CAM.setDeepest(depthOfDoc(RES)); // the bound the app's boot sets over an index listing it
  await run(GO.leapTo(RES));
  const box = docBox(RES), fs = LAYER.metricsOf(REC.doc(RES)).fs;
  assert.ok(box.residue && fs < box.fsRep / 5, `set at ${fs / box.fsRep} of its place's em`);
  assert.ok(Math.abs(emNow(RES) - 12.5) < 1e-6, `it reads at 12.5 px an em: ${emNow(RES)}`);
  assert.deepEqual(fake.unanswered, []);
});
