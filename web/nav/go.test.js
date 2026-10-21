// N-GO's test against the FAKE PORT: a follow lands on the span its link's
// far end projects to NOW, outlines that span — its first position and its
// positions, never the position alone (a mutant that drops the projection's
// width turns red) — and lights the link followed; a far end the far
// document's text holds in two runs apart, a passage a later edit cut in
// two, is outlined in both, in the text's order whatever order the board's
// set names them in, the landing at the first in the text (a mutant that
// keeps the projection's first member alone, or the set's order, turns red);
// a link naming the far document whole outlines the document's first
// position, no width. A follow of a floating end, one the far document's
// text holds none of, lands at that document's head — its entry settled
// there holding the link, the camera and the walk there — the link lit and
// nothing outlined, the dead end's face standing at the head with its act,
// and Back returns to it (a mutant that faces in place, outlines the head,
// lands at the end's stored position or stands the face at the act's site
// turns red); a Back made while its projection reads leaves its entry ahead
// at the head and shows no face (a mutant that faces after a later act
// turns red). Every act
// puts both marks out as it is made — a LEAP, HOME, WHOLE BOARD, an
// account's region, a jump, Forward, a LEAP that faces, and a follow that
// faces, at once or once its read answers (a mutant that drops the step from
// any one act turns red). Back lights the link a follow took to reach the
// entry it leaves, at the entry it lands on, the follow's departure, and
// outlines nothing; Back from an entry a LEAP reached lights nothing (a
// mutant that lights the link of the entry Back lands on turns red).
// Every teleport a key made draws the focus ring at its landing, and one the
// pointer made puts it out (a mutant that drops any one teleport's word of
// the key turns red; one that draws the ring at every landing turns red).
// THE ORDER OF ACTS, each with an answer held while acts are made: a Back or
// a jump made while a LEAP reads acts from the LEAP's entry, which stands
// ahead of the cursor at its landing, and the LEAP lands nowhere (a mutant
// that pushes after the read, or lands an act a later one overtook, turns
// red); a Back made while a follow reads leaves the follow's entry ahead at
// its span, the arrival out and nothing lit (a mutant that lights a link
// from an entry still standing as a claim turns red); every act made while a
// LEAP reads — a LEAP, a follow, HOME, WHOLE BOARD, an account's region —
// stands after the LEAP's entry and lands (a mutant that leaves any one
// uncounted turns red); a LEAP that faces leaves the entries ahead of the
// cursor standing (a mutant whose withdrawal forgets them turns red); Forward
// to a LEAP's entry while it reads lands at the landing the read placed (a
// mutant that lands without waiting turns red); a Back waiting on a claim
// puts both of the arrival's marks out as it is made and lands nowhere once
// Forward has been made (the ring as Forward left it); a follow that faces
// leaves the trail as it found it. A departure made
// during a flight re-takes the flight's destination, so Forward lands there —
// after a LEAP's flight and after a Back's (a mutant that re-takes the camera
// mid-flight turns red) — and the act whose flight it cut short ends, the
// LEAP answering no document landed in (a mutant that leaves a cut flight
// unsettled, or answers the LEAP's document whatever its flight answered,
// turns red).
// A LEAP lands at reading scale at any depth (E18 (a)): to a document minted
// a grid deeper than any the page booted with, and to a residue member whose
// many paragraphs set it at under a fifth of its place's em (a camera whose
// bound stops at the places' ems lands both below the mount's em and turns
// red).
// THE CARRY (foundations §2.3; P43): a LEAP carrying a passage `compare`s it
// against the text landed in once that text is read, lands at its
// counterpart there and lights the arrival on that span, no link named (a
// mutant that ignores the carry, or lights the carried position unprojected,
// turns red); a passage the text holds in two stretches, its second half
// standing first, is marked in both, in the text's order, the landing at the
// passage's start (a mutant that marks the first stretch alone, keeps the
// passage's order, or lands at the first in the text turns red); Back to it
// lands on that span and lights nothing; where the
// text holds none of it, it lands at the first block, unmarked, faced in the
// dead end's words — at a member in the member's — and offering no act (a
// mutant that lands where a plain LEAP does, or faces nothing, turns red); a
// Back made while the compare reads leaves the LEAP's entry ahead at the
// counterpart the read placed, the arrival out. A BACK MADE WHILE A CARD
// READS (O-HOST's opening): who wrote this?, who uses this?, the versions
// list — ended while it counts the members and while it reads a member's
// row — and the anatomy card each show nothing over the place Back landed
// once their reads answer (a mutant that opens any one of them without the
// host's opening turns its row red), the versions list asking nothing after
// its end (a mutant that drops any of its checks turns red); asked again
// with no act after it, each shows. THE ANATOMY CARD OPENS IN THE ACT THAT
// ASKS FOR IT — a links-card row, Enter at the link's element, a click on
// its symbol, a click on its marked span: a Back made at once ends it, and
// nothing shows over the place Back landed once its reads answer (a mutant
// that puts any one caller behind an `import()`, the opening begun only once
// the load answers, turns its row red); asked with no act after it, each
// shows; Esc made at once after a row ends the card still reading alone, the
// links card standing until the next Esc (the same mutant at the row turns
// it red). A FOLLOW MADE WHILE A CARD READS ends
// the card's opening as it is made, the follow's landing still to come: once
// the card's read answers nothing shows over the place the follow leaves,
// and the follow lands (a mutant whose act leaves the opening reading turns
// red). A FACE A NAVIGATION ACT SHOWS stands over a card asked at the place
// it leaves: asked while the act read — a follow of a dead reference, a LEAP
// the board answers for with nothing — the card's answer shows nothing over
// the face (a mutant whose show does not count itself turns red); asked
// before the act — a follow faced at once, one faced once its read answers —
// likewise, held by the act's end of the opening and by the face's show alike
// (a mutant that drops both turns red). The overlay host stands on a
// stand-in element, the platform's document a stand-in beside it, so a face
// a landing shows is read back from what the host wrote.
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
import * as HOST from '../overlays/host.js';
import * as PROV from '../overlays/provenance.js';
import * as VERSIONS from '../overlays/versions.js';
import * as ANATOMY from '../overlays/anatomy-card.js';
import * as LINKS from '../overlays/links-card.js';
import * as INPUT from '../app/input.js';
import { docBox, depthOfDoc, DEPTH_SOUND } from '../plane/projection.js';
import { t } from '../strings.js';
import { esc } from '../util.js';
import * as TRAIL from './trail.js';
import * as WALK from './walk.js';
import * as KEYS from './keys.js';
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
// a citation from the first edition whose far end names GONE: a dead reference
const DEAD = D + '.0.2.3';
/** the dead reference taken into the model, drawn at the first edition */
const takeDead = () => { REC.takeLinks(D, [DEAD]); REC.takeLink({ addr: DEAD, from: [span(D, 23, 3)], to: [span(GONE, 1, 3)], type: CITE }); };
// a citation from the first edition of a passage of FAR that a later edit to FAR cut in two: its far end projects to FAR's 3, four
// positions, and FAR's 20, five
const SPLIT = D + '.0.2.4';
/** the cut citation taken into the model, drawn at the first edition */
const takeSplit = () => { REC.takeLinks(D, [SPLIT]); REC.takeLink({ addr: SPLIT, from: [span(D, 1, 3)], to: [span(FAR, 3, 22)], type: CITE }); };
// a citation from the first edition of a passage FAR's current text no longer holds — a floating end: its far end, stored at FAR's 8,
// projects to nothing there
const FLOAT = D + '.0.2.5';
/** the floating citation taken into the model, drawn at the first edition */
const takeFloat = () => { REC.takeLinks(D, [FLOAT]); REC.takeLink({ addr: FLOAT, from: [span(D, 4, 3)], to: [span(FAR, 8, 4)], type: CITE }); };
/** FAR's head, where a dead end lands: its first paragraph's first position */
const FAR_HEAD = 1;
// FAR's second version member, a copy of its text; the passages LEAPs carry: one FAR holds at 20, five positions, one neither FAR nor
// its member holds, and one FAR holds in two stretches, its first half at FAR's 25 and its second at FAR's 2
const FAR2 = FAR + '.2';
const SHARED = { addr: D, pos: 11, width: 5 }, UNSHARED = { addr: D, pos: 1, width: 8 }, MOVED = { addr: D, pos: 1, width: 10 };
/** the `compare` a carried passage is re-projected by: the passage against the text landed in, whole */
const carried = (/** @type {{addr: string, pos: number, width: number}} */ c, /** @type {string} */ into, /** @type {number} */ extent) => F.compare([{ doc: c.addr, spans: [{ ordinal: c.pos, positions: c.width }] }], [{ doc: into, spans: [{ ordinal: 1, positions: extent }] }]);
// FAR's first member, a copy of its text like the second; the passage the versions list holds at FAR: its second paragraph, whole
const FAR1 = FAR + '.1';
const FAR_HELD = { pos: FAR_TEXT.indexOf('Its') + 1, width: 'Its cited passage stands here.'.length };
/** the `compare` the versions list marks a member's row by: the passage held against the member's own text, whole */
const heldIn = (/** @type {string} */ member) => F.compare([{ doc: FAR, spans: [{ ordinal: FAR_HELD.pos, positions: FAR_HELD.width }] }], [{ doc: member, spans: [{ ordinal: 1, positions: FAR_EXTENT }] }]);
/** a member holding the passage held where FAR does */
const holdsHeld = (/** @type {string} */ member) => ({ result: { as_of: 1, resp: 'compare', pairs: [{ d1: FAR, d2: member, u1: { ordinal: String(FAR_HELD.pos), subspace: '1' }, u2: { ordinal: String(FAR_HELD.pos), subspace: '1' }, width: String(FAR_HELD.width) }] } });
/** who uses the first edition's cited passage: the read the card asks */
const usesCited = F.findDocsContaining([{ doc: D, spans: [{ ordinal: 11, positions: 5 }] }]);

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
  // the cut citation's far end in two runs, the set naming the later first: the wire names no order for a span set
  [FAKE.keyOf('op', { frame: F.project(SPLIT, 2, FAR) })]: { result: { as_of: 1, resp: 'span_set', set: [{ start: '1.20', width: '0.5' }, { start: '1.3', width: '0.4' }] } },
  // the floating citation's far end in FAR's current text: no run
  [FAKE.keyOf('op', { frame: F.project(FLOAT, 2, FAR) })]: { result: { as_of: 1, resp: 'span_set', set: [] } },
  ...reads(FAR2, FAR_TEXT, []),
  // where the carried passages stand in FAR and its member: the shared one at FAR's 20, five positions; the other nowhere; the moved
  // one's first five positions at FAR's 25 and its last five at FAR's 2
  [FAKE.keyOf('op', { frame: carried(SHARED, FAR, FAR_EXTENT) })]: { result: { as_of: 1, resp: 'compare', pairs: [{ d1: D, d2: FAR, u1: { ordinal: '11', subspace: '1' }, u2: { ordinal: '20', subspace: '1' }, width: '5' }] } },
  [FAKE.keyOf('op', { frame: carried(MOVED, FAR, FAR_EXTENT) })]: { result: { as_of: 1, resp: 'compare', pairs: [{ d1: D, d2: FAR, u1: { ordinal: '1', subspace: '1' }, u2: { ordinal: '25', subspace: '1' }, width: '5' }, { d1: D, d2: FAR, u1: { ordinal: '6', subspace: '1' }, u2: { ordinal: '2', subspace: '1' }, width: '5' }] } },
  [FAKE.keyOf('op', { frame: carried(UNSHARED, FAR, FAR_EXTENT) })]: { result: { as_of: 1, resp: 'compare', pairs: [] } },
  [FAKE.keyOf('op', { frame: carried(UNSHARED, FAR2, FAR_EXTENT) })]: { result: { as_of: 1, resp: 'compare', pairs: [] } },
  // the cards' reads: who wrote the first edition's cited passage (FAR) and who uses it (FAR too), the citation's lineage (no
  // claims either way), and the versions list's: FAR's members counted — two, its third never registered — and each one's row
  [FAKE.keyOf('op', { frame: F.showOrigin(D, 11, 5) })]: { result: { as_of: 1, resp: 'addrs', addrs: [FAR] } },
  [FAKE.keyOf('op', { frame: usesCited })]: { result: { as_of: 1, resp: 'addrs', addrs: [D, FAR] } },
  [FAKE.keyOf('op', { frame: F.inClaims(PASSAGE, 'audit') })]: { result: { as_of: 1, resp: 'claims', claims: [] } },
  [FAKE.keyOf('op', { frame: F.outClaims(PASSAGE, 'audit') })]: { result: { as_of: 1, resp: 'claims', claims: [] } },
  [FAKE.keyOf('op', { frame: F.docMetadata(FAR + '.3') })]: { refused: { kind: 'refused', name: 'doc_not_registered', code: 'doc_not_registered' } },
  [FAKE.keyOf('op', { frame: F.retrieveDocVSpanSet(FAR1) })]: { result: { as_of: 1, resp: 'span_set', set: [{ start: '1.1', width: '0.' + FAR_EXTENT }] } },
  [FAKE.keyOf('op', { frame: heldIn(FAR1) })]: holdsHeld(FAR1),
  [FAKE.keyOf('op', { frame: heldIn(FAR2) })]: holdsHeld(FAR2),
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
/** the overlay host's stand-in element: what the host writes into it is what a person meets */
const hostEl = { className: '', innerHTML: '', style: {}, setAttribute() {}, removeAttribute() {}, addEventListener() {}, querySelector: () => null, querySelectorAll: () => [], getBoundingClientRect: () => ({ left: 0, top: 0, width: 0, height: 0 }), contains: () => false };
/** the face the host shows: its name and its words, and whether it offers an act; null where no face stands */
const faceShown = () => { const o = HOST.currentState(); return o && o.kind === 'face' ? { id: o.id, html: hostEl.innerHTML, acts: hostEl.innerHTML.includes('data-run') } : null; };

before(async () => {
  REC._reset(); LK._reset(); TRAIL._reset();
  globalThis.document = /** @type {any} */ ({ activeElement: null, body: null });
  globalThis.HTMLElement = /** @type {any} */ (class {});
  HOST.attach(/** @type {any} */ (hostEl));
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

/** the arrival's two marks: the span outlined and the link lit */
const marks = () => [GO.arrivalMark(), GO.litLink()];

test('a follow outlines the span its link\'s far end projects to — its first position and its positions — and lights the link followed', async () => {
  await run(GO.follow(drawn(PASSAGE)));
  assert.deepEqual(marks(), [{ addr: FAR, pos: 20, runs: [{ pos: 20, width: 5 }], link: PASSAGE }, PASSAGE]);
  const e = TRAIL.current();
  assert.deepEqual(e && [e.addr, e.pos, e.width, e.link], [FAR, 20, 5, PASSAGE], 'the landing\'s entry carries the span and the link');
  assert.deepEqual(fake.unanswered, []);
});

test('a follow of a far end the far document\'s text holds in two runs apart outlines both, in the text\'s order, and lands at the first in the text', async () => {
  takeSplit();
  await run(GO.follow(drawn(SPLIT)));
  assert.deepEqual(marks(), [{ addr: FAR, pos: 3, runs: [{ pos: 3, width: 4 }, { pos: 20, width: 5 }], link: SPLIT }, SPLIT], 'every run the projection names, the gap between them not marked');
  assert.ok(same(CAM.view(), GO.viewFor(FAR, 3)), 'the camera at the first run\'s view');
  assert.deepEqual([walkAt(), WALK.landedAt()], [['block', FAR, 1], 3], 'the walk on the paragraph holding the first run, at its position');
  const e = TRAIL.current();
  assert.deepEqual(e && [e.addr, e.pos, e.width, e.link], [FAR, 3, 4, SPLIT], 'the landing\'s entry at the run landed on');
  assert.deepEqual(fake.unanswered, []);
});

test('Back lights the link a follow took to reach the entry it leaves, at the follow\'s departure, outlining nothing; Back from an entry a LEAP reached lights nothing', async () => {
  await run(GO.leapTo(D));
  await run(GO.follow(drawn(PASSAGE)));
  await run(GO.leapTo(D));
  assert.deepEqual(marks(), [null, null], 'a LEAP naming no link puts both out');
  await run(GO.back());
  assert.equal(TRAIL.current()?.addr, FAR, 'Back to the follow\'s landing');
  assert.deepEqual(marks(), [null, null], 'the entry it left a LEAP reached: nothing lit, the follow\'s span not outlined again');
  await run(GO.back());
  assert.equal(TRAIL.current()?.addr, D, 'Back to the follow\'s departure');
  assert.deepEqual(marks(), [null, PASSAGE], 'the link followed lit there, no span outlined');
  assert.deepEqual(fake.unanswered, []);
});

test('a link naming the far document whole outlines the document\'s first position, no width, and lights the link', async () => {
  await run(GO.follow(drawn(WHOLE)));
  assert.deepEqual(marks(), [{ addr: FAR, pos: 1, runs: null, link: WHOLE }, WHOLE]);
  assert.deepEqual(fake.unanswered, []);
});

test('a follow of a far end the far document\'s text no longer holds lands at that document\'s head, faced there, the link lit and nothing outlined; Back returns to it', async () => {
  takeFloat();
  await run(GO.leapTo(D));
  const n = TRAIL.length();
  await run(GO.follow(drawn(FLOAT)));
  assert.equal(REC.doc(FAR).blocks[0].pos, FAR_HEAD, 'FAR\'s head: its first paragraph');
  assert.deepEqual(marks(), [null, FLOAT], 'the link followed lit; no span outlined, for the text holds none of it');
  assert.equal(TRAIL.length(), n + 1, 'the follow\'s entry settled, never withdrawn');
  const e = TRAIL.current();
  assert.deepEqual(e && [e.addr, e.pos, e.width, e.link], [FAR, FAR_HEAD, null, FLOAT], 'the landing\'s entry at the head, never the end\'s stored position, holding the link');
  assert.ok(same(CAM.view(), GO.viewFor(FAR, FAR_HEAD)), 'the camera at the head\'s view');
  assert.deepEqual(walkAt(), ['block', FAR, FAR_HEAD], 'the walk on the head');
  const f = faceShown();
  assert.ok(f && f.id === 'face:floating' && f.html.includes('data-string="F.floating"') && f.html.includes(esc(t('F.floating', { D: FAR }))), `the dead end's words: ${f && f.html}`);
  assert.equal(f && f.acts, true, 'offering its act');
  assert.deepEqual(HOST.currentState()?.anchor, { span: { addr: FAR, pos: FAR_HEAD } }, 'standing at the head landed on, never at the act\'s site');
  await run(GO.leapTo(D));
  assert.equal(faceShown(), null, 'the next act dismisses it');
  await run(GO.back());
  assert.deepEqual([walkAt(), marks()], [['block', FAR, FAR_HEAD], [null, null]], 'Back lands at the head, lighting nothing: no link reached the entry it left');
  await run(GO.back());
  assert.deepEqual(marks(), [null, FLOAT], 'Back to the follow\'s departure lights the link there');
  assert.deepEqual(fake.unanswered, []);
});

test('every act puts the arrival\'s two marks out as it is made: HOME, WHOLE BOARD, an account\'s region, a jump, a LEAP that faces, a follow that faces, Forward', async () => {
  takeDead();
  /** a follow landed: its span outlined and its link lit */
  const landed = async () => {
    await run(GO.leapTo(D));
    await run(GO.follow(drawn(PASSAGE)));
    assert.deepEqual(marks(), [{ addr: FAR, pos: 20, runs: [{ pos: 20, width: 5 }], link: PASSAGE }, PASSAGE], 'the follow lit both');
  };
  /** @type {Array<[string, () => Promise<unknown>]>} */
  const acts = [
    ['HOME', () => GO.home()],
    ['WHOLE BOARD', () => GO.wholeBoard()],
    ['an account\'s region', () => GO.toAccount('1.0.1')],
    ['a jump to the entry behind', () => GO.toTrailEntry(2)],
    ['a LEAP the board answers for with nothing', () => GO.leapTo(GONE)],
    ['a follow of a link naming no far document, faced at once', () => GO.follow({ ...drawn(PASSAGE), far: '' })],
    ['a follow of a dead reference, faced once its read answers', () => GO.follow(drawn(DEAD))],
  ];
  for (const [what, act] of acts) {
    await landed();
    await run(act());
    assert.deepEqual(marks(), [null, null], what);
  }
  await landed();
  await run(GO.back());
  assert.deepEqual(marks(), [null, PASSAGE], 'Back to the follow\'s departure lit its link');
  await run(GO.forward());
  assert.deepEqual(marks(), [null, null], 'Forward');
  await run(GO.back());
  await run(GO.leapTo(FAR, { how: 'leap', carry: SHARED, push: false }));
  assert.deepEqual(marks(), [{ addr: FAR, pos: 20, runs: [{ pos: 20, width: 5 }], link: null }, null], 'a carried LEAP that pushes nothing outlines its counterpart, the entry ahead of the cursor standing');
  await run(GO.forward());
  assert.deepEqual(marks(), [null, null], 'Forward from behind it');
  assert.deepEqual(fake.unanswered, []);
});

test('a LEAP carrying a passage lands at its counterpart in the text landed in and lights the arrival on it; Back to it lands there and lights nothing', async () => {
  await run(GO.leapTo(D));
  await run(GO.leapTo(FAR, { how: 'leap', carry: SHARED }));
  assert.deepEqual(GO.arrivalMark(), { addr: FAR, pos: 20, runs: [{ pos: 20, width: 5 }], link: null }, 'the counterpart\'s first position and its positions — never the carried 11');
  const e = TRAIL.current();
  assert.deepEqual(e && [e.addr, e.pos, e.width, e.link], [FAR, 20, 5, null], 'the landing\'s entry at the counterpart');
  assert.ok(same(CAM.view(), GO.viewFor(FAR, 20)), 'the camera at the counterpart\'s view');
  assert.deepEqual([walkAt(), WALK.landedAt()], [['block', FAR, 19], 20], 'the walk on the paragraph holding it, at its position');
  assert.equal(faceShown(), null, 'no face');
  await run(GO.leapTo(D));
  await run(GO.back());
  assert.equal(GO.arrivalMark(), null, 'Back lights nothing: no link was followed');
  assert.deepEqual([walkAt(), WALK.landedAt()], [['block', FAR, 19], 20], 'Back lands on the counterpart');
  assert.deepEqual(fake.unanswered, []);
});

test('a LEAP carrying a passage the text landed in holds in two stretches marks both, in the text\'s order, and lands where the passage begins', async () => {
  await run(GO.leapTo(D));
  await run(GO.leapTo(FAR, { how: 'leap', carry: MOVED }));
  assert.deepEqual(GO.arrivalMark(), { addr: FAR, pos: 25, runs: [{ pos: 2, width: 5 }, { pos: 25, width: 5 }], link: null }, 'every stretch of it the text holds, the landing at the counterpart of its first five positions');
  const e = TRAIL.current();
  assert.deepEqual(e && [e.addr, e.pos, e.width, e.link], [FAR, 25, 5, null], 'the landing\'s entry at the stretch landed on');
  assert.ok(same(CAM.view(), GO.viewFor(FAR, 25)), 'the camera at that stretch\'s view');
  assert.deepEqual([walkAt(), WALK.landedAt()], [['block', FAR, 19], 25], 'the walk on the paragraph holding it, at its position');
  assert.deepEqual(fake.unanswered, []);
});

test('a LEAP carrying a passage the text landed in holds none of lands at its first block, unmarked, faced as a floating end with no act', async () => {
  await run(GO.leapTo(D));
  await run(GO.leapTo(FAR, { how: 'leap', carry: UNSHARED }));
  assert.equal(GO.arrivalMark(), null, 'nothing marked');
  const e = TRAIL.current();
  assert.deepEqual(e && [e.addr, e.pos, e.width, e.link], [FAR, 1, null, null], 'the landing\'s entry at the first block');
  assert.ok(same(CAM.view(), GO.viewFor(FAR, 1)), 'the camera at the document\'s head');
  assert.deepEqual(walkAt(), ['block', FAR, 1]);
  const f = faceShown();
  assert.ok(f && f.id === 'face:floating' && f.html.includes('data-string="F.floating"') && f.html.includes(esc(t('F.floating', { D: FAR }))), `the dead end's words: ${f && f.html}`);
  assert.equal(f && f.acts, false, 'no act: the versions list holds no passage of another document');
  await run(GO.leapTo(D));
  assert.equal(faceShown(), null, 'the next act dismisses it');
  await run(GO.leapTo(FAR2, { how: 'leap', carry: UNSHARED }));
  const m = faceShown();
  assert.ok(m && m.html.includes('data-string="F.floating.member"') && m.html.includes(esc(t('F.floating.member', { k: 2 }))), `at a member, in the member's own words: ${m && m.html}`);
  assert.deepEqual(fake.unanswered, []);
});

test('a Back made while a carried passage\'s compare reads goes back from the LEAP\'s entry, which stands ahead at the counterpart the read placed, the arrival out', async () => {
  await run(GO.leapTo(D));
  const at = CAM.view(), n = TRAIL.length();
  const release = fake.hold('op', { frame: carried(SHARED, FAR, FAR_EXTENT) });
  const leap = GO.leapTo(FAR, { how: 'leap', carry: SHARED });
  await run(GO.back());
  release();
  await run(leap);
  const far = TRAIL.all()[n];
  assert.deepEqual(addrs().slice(n - 1), [D, FAR], 'the LEAP\'s entry after D\'s');
  assert.equal(TRAIL.cursorIndex(), n - 1, 'the cursor on D\'s');
  assert.deepEqual(far && [far.pos, far.width, far.link], [20, 5, null], 'at the counterpart the read placed');
  assert.ok(far && same(far.view, GO.viewFor(FAR, 20)), 'at that span\'s view');
  assert.equal(GO.arrivalMark(), null, 'the arrival out: the LEAP landed nowhere');
  assert.ok(same(CAM.view(), at), 'the camera at D');
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

test('a Back made while a follow reads goes back from the follow\'s entry, which stands ahead at the span its far end projects to, the arrival out and nothing lit', async () => {
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
  assert.deepEqual(marks(), [null, null], 'the arrival out, and the follow\'s link lit nowhere: the follow landed nowhere, so the reader never stood at its entry');
  assert.ok(same(CAM.view(), at), 'the camera at D');
  assert.deepEqual(walkAt(), ['document', D, null]);
  assert.deepEqual(fake.unanswered, []);
});

test('a Back made while a floating end\'s projection reads goes back from the follow\'s entry, which stands ahead at the far document\'s head; no face shows', async () => {
  takeFloat();
  await run(GO.leapTo(D));
  const at = CAM.view(), n = TRAIL.length();
  const release = fake.hold('op', { frame: F.project(FLOAT, 2, FAR) });
  const following = GO.follow(drawn(FLOAT));
  await run(GO.back());
  release();
  await run(following);
  const far = TRAIL.all()[n];
  assert.deepEqual(addrs().slice(n - 1), [D, FAR], 'the follow\'s entry after D\'s');
  assert.equal(TRAIL.cursorIndex(), n - 1, 'the cursor on D\'s');
  assert.deepEqual(far && [far.pos, far.width, far.link], [FAR_HEAD, null, FLOAT], 'at the head');
  assert.ok(far && same(far.view, GO.viewFor(FAR, FAR_HEAD)), 'at the head\'s view');
  assert.equal(faceShown(), null, 'no face over the place Back landed: the follow landed nowhere');
  assert.deepEqual(marks(), [null, null], 'nothing outlined and nothing lit');
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

test('a Back waiting on a LEAP\'s entry while it reads puts the arrival\'s marks out as it is made, and lands nowhere once Forward has been made: the ring as Forward left it', async () => {
  unread();
  await run(GO.leapTo(D));
  const release = fake.hold('op', { frame: F.retrieveDocVSpanSet(C) });
  const leap = GO.leapTo(C);
  await run(GO.follow(drawn(PASSAGE)));
  const landed = CAM.view(), walked = walkAt(), lit = GO.arrivalMark();
  const back = GO.back(true);
  assert.equal(TRAIL.current()?.addr, C, 'Back reached the LEAP\'s entry, still reading');
  const out = marks();
  await run(GO.forward());
  release();
  await run(leap);
  await run(back);
  assert.ok(lit && lit.link === PASSAGE, 'the follow lit the arrival');
  assert.deepEqual(out, [null, null], 'Back put both out as it was made: the reader has left the span');
  assert.deepEqual(addrs().slice(-3), [D, C, FAR]);
  assert.equal(TRAIL.current()?.addr, FAR);
  assert.ok(same(CAM.view(), landed), 'the camera at the follow\'s landing');
  assert.deepEqual(walkAt(), walked, 'the walk on the follow\'s span');
  assert.equal(WALK.ringShown(), false, 'Forward, a pointer\'s, put the ring out; the Back a key made drew none after it');
  assert.deepEqual(fake.unanswered, []);
});

test('a follow that faces leaves the trail as it found it: its entry, standing while it read, withdrawn', async () => {
  takeDead();
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

test('a Back made during a LEAP\'s flight re-takes the view the flight was bound for, and Forward lands there; the LEAP, its flight cut short, ends with no document landed in', async () => {
  await run(GO.leapTo(D));
  const leap = GO.leapTo(FAR);
  const flight = CAM.cam.anim;
  assert.ok(flight, 'the LEAP flies');
  const bound = { ...flight.to };
  CAM.step(flight.t0 + flight.ms / 2);
  assert.ok(!same(CAM.view(), bound), 'the camera mid-flight');
  await run(GO.back());
  await run(leap);
  assert.equal(await leap, null, 'the LEAP whose flight Back cut short landed in no document');
  const entry = TRAIL.all()[TRAIL.cursorIndex() + 1];
  assert.ok(entry && entry.addr === FAR && same(entry.view, bound), 'the LEAP\'s entry holds the view its flight was bound for, not the camera mid-flight');
  await run(GO.forward());
  assert.ok(same(CAM.view(), bound), 'Forward lands there');
});

test('a second Back made during the first one\'s flight leaves the first one\'s entry at its own view, and Forward lands there; the first Back, its flight cut short, ends', async () => {
  await run(GO.leapTo(D));
  await run(GO.leapTo(FAR));
  await run(GO.leapTo(D, { pos: 11 }));
  const own = { ...TRAIL.all()[TRAIL.cursorIndex() - 1].view };
  const first = GO.back();
  const flight = CAM.cam.anim;
  assert.ok(flight && same(flight.to, own), 'the first Back flies to FAR\'s entry');
  CAM.step(flight.t0 + flight.ms / 2);
  await run(GO.back());
  await run(first);
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

test('a Back made while a card reads: once its reads answer nothing shows over the place Back landed — who wrote this?, who uses this?, the versions list, the anatomy card; asked with no act after it, each shows', async () => {
  REC.invalidate(FAR); // read anew by the first LEAP to it, its members uncounted until the versions list counts them
  /** @type {Array<{what: string, id: string, at: string, held: object, asks?: object[], open: () => Promise<void>}>} each card: the id it shows as, the place it is asked at, the read held while Back is made, the reads it asks in all where it asks no more once ended */
  const cards = [
    { what: 'who wrote this?', id: 'provenance:wrote', at: D, held: F.showOrigin(D, 11, 5), open: () => PROV.wrote(D, 11, 5) },
    { what: 'who uses this?', id: 'provenance:uses', at: D, held: usesCited, open: () => PROV.uses(D, 11, 5) },
    { what: 'the versions list, while it counts the members', id: 'versions:' + FAR, at: FAR, held: F.docMetadata(FAR2), asks: [F.docMetadata(FAR2)], open: () => VERSIONS.open(FAR, FAR_HELD.pos, null) },
    { what: 'the versions list, while it reads a member\'s row', id: 'versions:' + FAR, at: FAR, held: F.retrieveDocVSpanSet(FAR1), asks: [F.retrieveDocVSpanSet(FAR1)], open: () => VERSIONS.open(FAR, FAR_HELD.pos, null) },
    { what: 'the anatomy card', id: 'anatomy:' + PASSAGE, at: D, held: F.inClaims(PASSAGE, 'audit'), open: () => ANATOMY.open(drawn(PASSAGE), null) },
  ];
  for (const { what, id, at, held, asks, open } of cards) {
    await run(GO.leapTo(at === D ? FAR : D));
    await run(GO.leapTo(at));
    const from = fake.asked.length;
    const release = fake.hold('op', { frame: held });
    const opening = open();
    await run(GO.back());
    assert.notEqual(TRAIL.current()?.addr, at, `${what}: Back left ${at}`);
    release();
    await opening;
    assert.equal(HOST.currentState(), null, `${what}: nothing shows over the place Back landed`);
    if (asks) assert.deepEqual(fake.asked.slice(from), asks.map((frame) => FAKE.keyOf('op', { frame })), `${what}: nothing asked after its end`);
    await open();
    assert.equal(HOST.currentState()?.id, id, `${what}: asked with no act after it, it shows`);
    HOST.dismiss();
  }
  assert.equal(REC.doc(FAR).members, 2, 'the members counted once, by the list that showed');
  assert.deepEqual(fake.unanswered, []);
});

test('the anatomy card opens in the act that asks for it — a links-card row, Enter at the link\'s element, a click on its symbol, a click on its marked span: a Back made at once ends it; asked with no act after it, it shows; Esc made at once after a row ends it alone, the links card standing', async () => {
  const platform = { document: globalThis.document, window: globalThis.window };
  /** @type {Map<string, (e: unknown) => void>} the text layer's listeners, by event */
  const layer = new Map();
  const listens = (/** @type {Map<string, (e: unknown) => void> | null} */ into) => ({ addEventListener: (/** @type {string} */ type, /** @type {(e: unknown) => void} */ fn) => { if (into) into.set(type, fn); } });
  globalThis.document = /** @type {any} */ ({ ...listens(null), activeElement: null, body: null });
  globalThis.window = /** @type {any} */ ({ ...listens(null), getSelection: () => null });
  try {
    INPUT.attach(/** @type {any} */ ({ plane: listens(null), layer: listens(layer), corners: listens(null) }));
    const click = /** @type {(e: unknown) => void} */ (layer.get('click'));
    /** the citation's element of the first edition's article a click lands on, by its class, bearing its data */
    const article = { dataset: { addr: D } };
    const at = (/** @type {string} */ cls, /** @type {Record<string, string>} */ dataset) => {
      const el = Object.assign(new globalThis.HTMLElement(), { dataset, isConnected: false });
      return Object.assign(el, { closest: (/** @type {string} */ sel) => (sel === cls ? el : sel === 'article' ? article : null) });
    };
    /** the links card at the first edition, and its row for the citation pressed as a click presses it */
    const row = () => {
      LINKS.show(D);
      const o = HOST.currentState(), i = LK.shown(D).findIndex((s) => s.link.addr === PASSAGE);
      const act = o && o.acts ? o.acts['row:' + i] : null;
      assert.ok(o && o.id === 'links:' + D && act, 'the links card lists the citation');
      return act(/** @type {any} */ (hostEl), false);
    };
    /** Enter as the platform delivers it at the plane */
    const enter = /** @type {any} */ ({ key: 'Enter', keyCode: 13, isComposing: false, metaKey: false, ctrlKey: false, shiftKey: false, altKey: false, preventDefault() {} });
    /** @type {Array<[string, () => unknown]>} each act that asks for the card at the first edition, the walk on the citation's element */
    const asks = [
      ['a links-card row', row],
      ['Enter at the link\'s element', () => KEYS.dispatch(enter, { where: 'plane', byKey: true })],
      ['a click on its symbol', () => click({ target: at('.sym', { link: PASSAGE }), clientX: 0, clientY: 0, stopPropagation() {} })],
      ['a click on its marked span', () => click({ target: at('.lip', { links: PASSAGE }), clientX: 0, clientY: 0, stopPropagation() {} })],
    ];
    const lineage = FAKE.keyOf('op', { frame: F.outClaims(PASSAGE, 'audit') });
    /** the card's reads answered: its lineage's last read asked since `from`, no opening reading, and a turn for that answer to land */
    const answered = async (/** @type {number} */ from) => {
      const asked = () => fake.asked.slice(from).includes(lineage);
      for (let i = 0; i < 200 && !(asked() && !HOST.pending()); i++) await new Promise((r) => setTimeout(r, 0));
      assert.ok(asked(), 'the card was asked: its lineage read');
      await new Promise((r) => setTimeout(r, 0));
    };
    for (const [what, ask] of asks) {
      for (const backAtOnce of [true, false]) {
        await run(GO.leapTo(FAR));
        await run(GO.leapTo(D));
        await run(WALK.key('in'));
        for (let i = 0; i < 12 && WALK.current()?.link?.link.addr !== PASSAGE; i++) await run(WALK.key('down'));
        assert.equal(WALK.current()?.link?.link.addr, PASSAGE, 'the walk on the citation\'s element');
        const from = fake.asked.length;
        const asking = ask();
        // made at once: no turn passes between the act and the Back, so an act that awaits anything before its opening begins finds it begun after Back
        if (backAtOnce) await run(GO.back());
        await answered(from);
        await asking;
        if (backAtOnce) {
          assert.equal(TRAIL.current()?.addr, FAR, `${what}: Back landed at the entry behind`);
          assert.equal(HOST.currentState(), null, `${what}: nothing shows over the place Back landed`);
        } else {
          assert.equal(HOST.currentState()?.id, 'anatomy:' + PASSAGE, `${what}: asked with no act after it, it shows`);
          HOST.dismiss();
        }
      }
    }
    await run(GO.leapTo(FAR));
    await run(GO.leapTo(D));
    const from = fake.asked.length;
    const asking = row();
    KEYS.esc();
    await answered(from);
    await asking;
    assert.equal(HOST.currentState()?.id, 'links:' + D, 'Esc made at once ended the card still reading, alone: the links card stands');
    KEYS.esc();
    assert.equal(HOST.currentState(), null, 'the next Esc dismisses the links card');
  } finally {
    globalThis.document = platform.document; globalThis.window = platform.window;
  }
  assert.deepEqual(fake.unanswered, []);
});

test('a follow made while a card reads ends its opening as it is made: once the card\'s read answers nothing shows over the place the follow leaves, and the follow lands', async () => {
  await run(GO.leapTo(D));
  const card = fake.hold('op', { frame: F.showOrigin(D, 11, 5) });
  const projection = fake.hold('op', { frame: F.project(PASSAGE, 2, FAR) });
  const asked = PROV.wrote(D, 11, 5);
  const following = GO.follow(drawn(PASSAGE));
  card();
  await asked;
  assert.equal(HOST.currentState(), null, 'the card asked before the follow shows nothing, its projection still reading');
  projection();
  await run(following);
  assert.deepEqual(marks(), [{ addr: FAR, pos: 20, runs: [{ pos: 20, width: 5 }], link: PASSAGE }, PASSAGE], 'the follow landed, its arrival lit');
  assert.equal(HOST.currentState(), null, 'nothing over the landing');
  assert.deepEqual(fake.unanswered, []);
});

test('a face a navigation act shows stands over a card asked at the place it leaves, whether the card was asked while the act read or before it', async () => {
  takeDead();
  /** @type {Array<{what: string, act: () => Promise<unknown>, face: string, held: object | null, during: boolean}>} each act that faces, the face it shows, the read it faces on, and whether the card is asked while that read is out */
  const rows = [
    { what: 'a follow of a dead reference, the card asked while it read', act: () => GO.follow(drawn(DEAD)), face: 'face:doc_not_registered', held: F.retrieveDocVSpanSet(GONE), during: true },
    { what: 'a LEAP the board answers for with nothing, the card asked while it read', act: () => GO.leapTo(GONE), face: 'face:doc_not_registered', held: F.retrieveDocVSpanSet(GONE), during: true },
    { what: 'a follow of a link naming no far document, faced at once, the card asked before it', act: () => GO.follow({ ...drawn(PASSAGE), far: '' }), face: 'face:invalid', held: null, during: false },
    { what: 'a follow of a dead reference, faced once its read answers, the card asked before it', act: () => GO.follow(drawn(DEAD)), face: 'face:doc_not_registered', held: F.retrieveDocVSpanSet(GONE), during: false },
  ];
  for (const { what, act, face, held, during } of rows) {
    await run(GO.leapTo(D));
    REC.invalidate(GONE); // the board asked anew whether it answers for the far document
    const card = fake.hold('op', { frame: F.showOrigin(D, 11, 5) });
    const read = held ? fake.hold('op', { frame: held }) : () => {};
    let asked = during ? null : PROV.wrote(D, 11, 5);
    const acting = act();
    if (during) asked = PROV.wrote(D, 11, 5);
    read();
    await run(acting);
    assert.equal(HOST.currentState()?.id, face, `${what}: its face`);
    card();
    await asked;
    assert.equal(HOST.currentState()?.id, face, `${what}: the card's answer shows nothing over the face`);
    HOST.dismiss();
  }
  assert.deepEqual(fake.unanswered, []);
});
