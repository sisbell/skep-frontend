// L-LINE's test against the FAKE PORT: the address display names the level
// the camera's scale reads (foundations §2.2) — at far scale the board, the
// whole board in view at its clamp; at mid the account under the camera
// (B1-S2: "THE ONE LINE reads `1.5 › 1.5.0.1`"), never the document the walk
// stands on and never a position, though the walk keeps the span a landing
// named until the re-take stands it on the document, and the account the
// camera's, not the walk's; at reading scale the document and the position the
// landing named — a mutant that names the walk's document at mid turns red, and
// so does one that drops the document form at mid~near. THE POSITION IS THE
// DOCUMENT'S OWN TO NAME (issue #140's design decision): a document below its
// own reading scale — a continuation document at the near band, a depth-0
// document stepped down at mid~near — is named alone, no position, its
// position's slot standing empty and as wide, nothing after it moved; at its
// own reading scale the position is named in that slot — a mutant that names
// a position by the camera's band, drops the slot below the threshold, sizes
// it by the position shown, or draws the strip there turns red. Nearer than
// mid an account or the board the walk stands on is named as mid scale names
// it — the account a key's re-take over no document's region stood the walk
// on among them (issue #141's design decision) — never the account under the
// camera nor a document out of view: a mutant that names the camera's account
// there turns red. The address segment is ONE WIDTH at the whole board, at mid,
// on an account nearer, on a document below its reading scale and at a
// position, its slot, strip and marker standing empty where no document is
// named: a mutant that sizes the segment by its words, or drops the empty slot,
// turns red. While the walk keeps its document in view off the view's centre
// the strip marks the view's window over it — past the first edition's last
// line, open at both ends; above the long edition's first line, open at its
// start alone — and the position elsewhere: a mutant that marks the position
// there, or opens an end the view never ran past, turns red. The LEAP box's prefill
// is the address the display names (K-30: "the box open holding the current
// address"; the box is the line's stop, opened), so the box never opens on an
// address the line does not show — a mutant whose prefill keeps a rule of its
// own (the walk's document at mid, the account the arithmetic finds at the
// whole board's centre) turns red. A restart the shell re-opened leaves the
// acting-as segment as it stood (client.md §4b.2: "no death chrome") — a
// mutant that takes the restart for a death, or re-opens it as a session no
// write may go out under, turns red. The session's own `writes` decides the
// segment: the keyless session for reading alone reads foundations §3.3
// state 3's words, over an empty key store and over one holding a key bound
// here for its principal, with no key claimed and no sign-in; a session that
// writes reads state 2, naming the label of the key it is opened with — the
// key bound here for its principal, else the store's one key (M-REC's
// `device`) — so a mutant that reads every session as state 2, or decides by
// a key bound at this board, turns red. The sign-in act bears
// its id in the guest's line and in the death arm's, as Back does, so the
// session's face standing at it finds it again as the line is rebuilt
// (O-HOST's anchor) — a mutant that drops the id from either arm turns red.
// The guest line names the board's origin where `boards()` found a board, and
// no origin where it found none (foundations §3.3 state 1: "the board and
// venue shown") — a mutant that names an origin the page never found, or
// leaves the origin's slot empty between its separators, or drops the origin
// where a board stands, turns red.
import { test, before } from 'node:test';
import assert from 'node:assert/strict';
import * as PORT from '../bridge/port.js';
import * as REC from '../model/records.js';
import * as PUMP from '../model/pump.js';
import * as F from '../model/frames.js';
import * as FAKE from '../test/fake-port.js';
import * as CAM from '../plane/camera.js';
import * as LAYER from '../text/layer.js';
import { docBox, accountCell, boardCell, depthOfDoc, DOC_W } from '../plane/projection.js';
import { STANDARD_FS } from '../plane/layout.js';
import { lodOf, LOD_TXT_LO } from '../plane/lod.js';
import { t } from '../strings.js';
import * as WALK from '../nav/walk.js';
import * as LINE from './line.js';

const D = '1.0.1.0.3';
/** the account's 49th document, its first continuation's first: its room a seventh of a depth-0 document's across */
const C1 = '1.0.1.0.49';
const C1_TEXT = 'Tumbler.\n\nThe first field.';
/** a depth-0 document of more columns than its room holds at the standard size: set a step smaller than its neighbours */
const LONG = '1.0.1.0.40';
const LONG_TEXT = Array.from({ length: 300 }, (_, i) => `Item ${i + 1} of an edition longer than its room's twelve columns.`).join('\n\n');
/** the reads of a document read whole, all its text one run of its own: its extent, its metadata, its text, its image, its links (none) */
const reads = (/** @type {string} */ doc, /** @type {string} */ text) => ({
  [FAKE.keyOf('op', { frame: F.retrieveDocVSpanSet(doc) })]: { result: { as_of: 1, resp: 'span_set', set: [{ start: '1.1', width: '0.' + text.length }] } },
  [FAKE.keyOf('op', { frame: F.docMetadata(doc) })]: { result: { as_of: 1, resp: 'doc_metadata', doc, published: true, owner: '1.0.1', birth: doc + '.1', birth_extent: String(text.length), placed: null, base_extent: null, source: null } },
  [FAKE.keyOf('op', { frame: F.retrieveV(doc, 1, text.length) })]: { result: { as_of: 1, resp: 'delivery', items: [{ content: text }] } },
  [FAKE.keyOf('op', { frame: F.image(doc, 1, text.length) })]: { result: { as_of: 1, resp: 'runs', runs: [{ i_start: doc + '.0.1.1', width: String(text.length) }] } },
  [FAKE.keyOf('op', { frame: F.findLinksV(doc, 1, text.length) })]: { result: { as_of: 1, resp: 'addrs', addrs: [] } },
});
// D's reads, read whole: three spans — 1 "Tumbler.\n\n" (10), 11 "The first field." (16), 27 a withheld run (4)
const script = {
  [FAKE.keyOf('op', { frame: F.retrieveDocVSpanSet(D) })]: { result: { as_of: 1, resp: 'span_set', set: [{ start: '1.1', width: '0.30' }] } },
  [FAKE.keyOf('op', { frame: F.docMetadata(D) })]: { result: { as_of: 1, resp: 'doc_metadata', doc: D, published: true, owner: '1.0.1', birth: D + '.1', birth_extent: '30', placed: null, base_extent: null, source: null } },
  [FAKE.keyOf('op', { frame: F.retrieveV(D, 1, 30) })]: { result: { as_of: 1, resp: 'delivery', items: [{ content: 'Tumbler.\n\nThe first field.' }, { withheld: { origin: '1.0.1.0.1003', width: '4' } }] } },
  [FAKE.keyOf('op', { frame: F.image(D, 1, 30) })]: { result: { as_of: 1, resp: 'runs', runs: [{ i_start: D + '.0.1.1', width: '26' }, { i_start: '1.0.1.0.1003.0.1.1', width: '4' }] } },
  [FAKE.keyOf('op', { frame: F.findLinksV(D, 1, 30) })]: { result: { as_of: 1, resp: 'addrs', addrs: [] } },
  // the edition claims on the withheld run's origin: none
  [FAKE.keyOf('op', { frame: F.editionClaimsAt('1.0.1.0.1003') })]: { result: { as_of: 1, resp: 'addrs', addrs: [] } },
  ...reads(C1, C1_TEXT),
  ...reads(LONG, LONG_TEXT),
};

/** @type {ReturnType<typeof FAKE.create>} */
let fake;

/** mid: a depth-0 document's box 120 px across, its type far below the readable threshold */
const MID = 120 / DOC_W;
/** the camera over a document's centre at a scale */
const over = (/** @type {string} */ doc, /** @type {number} */ scale) => { const b = docBox(doc); CAM.set({ x: b.x + b.w / 2, y: b.y + b.h / 2, scale }); };

before(async () => {
  REC._reset();
  fake = FAKE.create(script);
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.setBoard({ board: 'b-1', name: '', origin: '' }); REC.setSession({ session: 's-1', principal: 1, account: '1.0.1', writes: true });
  REC.takeIndex(/** @type {any} */ ({ docs: [{ doc: D, kind: 'edition', label: 'd', standing: 'public' }], counts: [{ account: '1.0.1', documents: 1 }], state: { arm: 'complete' } }));
  CAM.setViewport(1440, 900);
  await PUMP.loadWhole(D);
  assert.deepEqual(REC.doc(D).blocks.map((b) => b.pos), [1, 11, 27]);
  assert.deepEqual(fake.unanswered, []);
});

test('at mid the line names the account under the camera, never the walk\'s document or a position, and the box opens holding it (foundations §2.2; B1-S2)', async () => {
  await WALK.focusTo(D, 15);
  over(D, MID);
  assert.equal(lodOf(CAM.cam.scale).name, 'mid');
  const account = { text: '1 › 1.0.1', place: '1 › 1.0.1', slot: 0, addr: '1.0.1', doc: null, pos: null, member: null, whole: false, window: null };
  assert.deepEqual(LINE.addressDisplay(), account, 'the walk still on the span the landing named: the line names the account, no document and no position');
  assert.equal(LINE.currentAddress(), '1.0.1', 'the LEAP box opens holding the address the line shows');
  // the re-take at mid's grain stands the walk on the document itself
  await WALK.retakeFromView(true);
  assert.deepEqual([WALK.current()?.kind, WALK.current()?.addr], ['document', D]);
  assert.deepEqual(LINE.addressDisplay(), account, 'the walk on the document: still the account');
  assert.equal(LINE.currentAddress(), '1.0.1');
  // the camera over the next account's region, the walk left on D: the account named is the camera's
  const c = accountCell('1.0.2');
  CAM.set({ x: c.x + c.w / 2, y: c.y + c.h / 2, scale: MID });
  assert.deepEqual(LINE.addressDisplay(), { ...account, text: '1 › 1.0.2', place: '1 › 1.0.2', addr: '1.0.2' }, 'the account under the camera, not the walk\'s');
  assert.equal(LINE.currentAddress(), '1.0.2');
});

test('at reading scale the line names the document and the position the landing named, and the box opens holding the document', async () => {
  for (const [band, scale] of /** @type {Array<[string, number]>} */ ([['mid~near', 9.5 / STANDARD_FS], ['near', 14 / STANDARD_FS]])) {
    over(D, scale);
    assert.equal(lodOf(CAM.cam.scale).name, band);
    await WALK.focusTo(D, 15);
    // D's extent, 30, takes two figures: the slot holds " › position ⟨two figures⟩"
    const place = `1 › 1.0.1 › ${D}`, slot = ` › ${t('F.position', { p: 99 })}`.length;
    assert.deepEqual(LINE.addressDisplay(), { text: `${place} › ${t('F.position', { p: 15 })}`, place, slot, addr: D, doc: D, pos: 15, member: null, whole: false, window: null }, `${band}: board › account › document › position`);
    assert.equal(LINE.currentAddress(), D, `${band}: the box holds the document`);
  }
});

test('a document below its own reading scale is named alone, whatever the band — a continuation document at near, a depth-0 document set a step smaller at mid~near — its position\'s slot standing empty and as wide; at its own reading scale the position is named in that slot (issue #140)', async () => {
  /** the line rendered into a stand-in element, and its position's slot read back from the markup: its width, its words, whether its strip shows */
  const host = { innerHTML: '', setAttribute() {}, addEventListener() {}, querySelectorAll: () => [] };
  LINE.attach(/** @type {any} */ (host), { open() {}, back() {}, forward() {}, trailList() {}, signIn() {} });
  const slotShown = () => {
    LINE.render(true);
    const m = /<b class="pos" style="width:(\d+)ch">([^<]*)<\/b><span class="strip( none)?"[^>]*>(?:<span class="strip-mark"[^>]*><\/span>)?<\/span><\/span><span class="marker/.exec(host.innerHTML);
    return m && { width: Number(m[1]), words: m[2], strip: !m[3] };
  };
  await PUMP.loadWhole(C1);
  await PUMP.loadWhole(LONG);
  const fsOf = (/** @type {string} */ doc) => LAYER.foldOf(REC.doc(doc)).fs;
  assert.ok(depthOfDoc(C1) === 1 && fsOf(C1) < STANDARD_FS / 6, `${C1} a continuation document, set at ${fsOf(C1) / STANDARD_FS} of the standard size`);
  assert.ok(depthOfDoc(LONG) === 0 && fsOf(LONG) < STANDARD_FS * 0.8, `${LONG} at depth 0, set a step smaller than its neighbours: ${fsOf(LONG) / STANDARD_FS} of the standard size`);
  /** @type {Array<[string, string, number, number]>} each document, the band the camera stands at over it, the scale, its extent */
  const cases = [[C1, 'near', 14 / STANDARD_FS, C1_TEXT.length], [LONG, 'mid~near', 9.5 / STANDARD_FS, LONG_TEXT.length]];
  for (const [doc, band, scale, extent] of cases) {
    over(doc, scale);
    assert.equal(lodOf(CAM.cam.scale).name, band);
    assert.ok(fsOf(doc) * CAM.cam.scale < LOD_TXT_LO, `${doc} at ${band}: its own em, ${fsOf(doc) * CAM.cam.scale} px, below the readable threshold, where a click teleports`);
    // the walk on the span a landing named, as a landing's cursor move or a zoom chord before its re-take leaves it
    await WALK.focusTo(doc, 15);
    assert.deepEqual([WALK.current()?.kind, WALK.landedAt()], ['block', 15]);
    // the slot as wide as the document's widest position: its extent's figures
    const place = `1 › 1.0.1 › ${doc}`, slot = ` › ${t('F.position', { p: '9'.repeat(String(extent).length) })}`.length;
    assert.deepEqual(LINE.addressDisplay(), { text: place, place, slot, addr: doc, doc, pos: null, member: null, whole: false, window: null }, `${doc} at ${band}: the document alone, no position`);
    assert.equal(LINE.currentAddress(), doc, `${doc} at ${band}: the box holds the document, no position`);
    assert.deepEqual(slotShown(), { width: slot, words: '', strip: false }, `${doc} at ${band}: the position's slot stands empty, as wide, its strip's room kept and nothing drawn in it`);
    // at its own reading scale, the walk where it stood: the position the landing named, in the same slot
    over(doc, 12.5 / fsOf(doc));
    const words = ` › ${t('F.position', { p: 15 })}`;
    assert.deepEqual(LINE.addressDisplay(), { text: place + words, place, slot, addr: doc, doc, pos: 15, member: null, whole: false, window: null }, `${doc} at its reading scale: the position named`);
    assert.deepEqual(slotShown(), { width: slot, words, strip: true }, `${doc} at its reading scale: the position and its strip in the slot, as wide`);
  }
});

test('at far scale the line names the board, the whole board in view at its clamp, and the box opens holding the board', async () => {
  const whole = CAM.viewForCell(boardCell('1'), 0.92);
  CAM.set(whole);
  assert.equal(lodOf(CAM.cam.scale).name, 'far~mid', 'WHOLE BOARD on this viewport');
  const board = { text: '1 · ' + t('B1.clamp'), place: '1 · ' + t('B1.clamp'), slot: 0, addr: '1', doc: null, pos: null, member: null, whole: true, window: null };
  // the walk on the board, as WHOLE BOARD lands it
  await WALK.focusTo('1', null);
  assert.deepEqual(LINE.addressDisplay(), board);
  assert.equal(LINE.currentAddress(), '1', 'the box holds the board, never the account the arithmetic finds at the board\'s centre');
  // the walk left on a span, as a zoom out leaves it until the re-take
  await WALK.focusTo(D, 15);
  assert.deepEqual(LINE.addressDisplay(), board);
  assert.equal(LINE.currentAddress(), '1', 'the box holds the board, never the walk\'s document');
  CAM.set({ ...whole, scale: whole.scale / 4 });
  assert.equal(lodOf(CAM.cam.scale).name, 'far');
  assert.equal(LINE.currentAddress(), '1');
});

/** the near band: a depth-0 document's standard em at 14 px */
const NEAR = 14 / STANDARD_FS;
/** the centre of the cell of a document the index does not list */
const unlisted = () => { const c = docBox('1.0.1.0.30'); return { x: c.x + c.w / 2, y: c.y + c.h / 2 }; };

test('nearer than mid the line names the account or the board the walk stands on as mid scale names it, the document\'s fields blank, and the box opens holding it — the account a re-take over no document stood it on among them (issue #141)', async () => {
  const named = (/** @type {string} */ text, /** @type {string} */ addr) => ({ text, place: text, slot: 0, addr, doc: null, pos: null, member: null, whole: false, window: null });
  over(D, NEAR);
  assert.equal(lodOf(CAM.cam.scale).name, 'near');
  await WALK.focusTo('1.0.2', null);
  assert.deepEqual(LINE.addressDisplay(), named('1 › 1.0.2', '1.0.2'), 'the account the walk stands on, never the one under the camera');
  assert.equal(LINE.currentAddress(), '1.0.2', 'the box holds the account the line names');
  await WALK.focusTo('1', null);
  assert.deepEqual(LINE.addressDisplay(), named('1', '1'), 'the board the walk stands on');
  assert.equal(LINE.currentAddress(), '1');
  // a key's camera move ending over a cell the index lists nothing in: the re-take stands the walk on the account holding the centre
  await WALK.focusTo(D, 15);
  CAM.set({ ...unlisted(), scale: NEAR });
  await WALK.retakeFromView(true);
  assert.deepEqual(LINE.addressDisplay(), named('1 › 1.0.1', '1.0.1'), 'the account the re-take stood the walk on: no document named, none out of view');
});

test('the address segment is one width at every scale and focus, and where no document is named its position\'s slot, its strip and its marker stand empty, their room kept, so nothing after it on the line moves (issue #141)', async () => {
  const host = { innerHTML: '', setAttribute() {}, addEventListener() {}, querySelectorAll: () => [] };
  LINE.attach(/** @type {any} */ (host), { open() {}, back() {}, forward() {}, trailList() {}, signIn() {} });
  await PUMP.loadWhole(C1);
  /** the segment as the line renders it: its width in characters, and its slot, strip and marker */
  const shown = () => {
    LINE.render(true);
    const w = /<button class="seg address" data-act="address" [^>]*style="--words:(\d+)">/.exec(host.innerHTML);
    const m = /<span class="slot"><b class="pos" style="width:(\d+)ch">([^<]*)<\/b><span class="strip( none)?"[^>]*>(?:<span class="strip-mark"[^>]*><\/span>)?<\/span><\/span><span class="marker( lit)?( none)?"/.exec(host.innerHTML);
    return { width: w ? Number(w[1]) : null, slot: m && { words: m[2], strip: !m[3], marker: !m[5] } };
  };
  const empty = { words: '', strip: false, marker: false };
  const whole = CAM.viewForCell(boardCell('1'), 0.92);
  /** @type {Array<[string, () => Promise<unknown>, {words: string, strip: boolean, marker: boolean}]>} each state, how it is reached, the slot shown there */
  const states = [
    ['the whole board', async () => { CAM.set(whole); await WALK.focusTo('1', null); }, empty],
    ['mid, the account under the camera', async () => { over(D, MID); await WALK.focusTo(D, null); }, empty],
    ['near, the walk on an account', async () => { over(D, NEAR); await WALK.focusTo('1.0.2', null); }, empty],
    ['near, a document below its own reading scale: its marker, its position\'s words and strip empty', async () => { over(C1, NEAR); await WALK.focusTo(C1, null); }, { ...empty, marker: true }],
    ['near, a position named', async () => { over(D, NEAR); await WALK.focusTo(D, 15); }, { words: ` › ${t('F.position', { p: 15 })}`, strip: true, marker: true }],
  ];
  /** @type {number | null} */
  let width = null;
  for (const [state, reach, slot] of states) {
    await reach();
    const s = shown();
    width ??= s.width;
    assert.ok(width && s.width === width, `${state}: the segment ${s.width} characters wide, as at the whole board, ${width}`);
    assert.deepEqual(s.slot, slot, `${state}: its slot, strip and marker`);
  }
  assert.ok(/** @type {number} */ (width) >= `1 › 1.0.1 › ${D} › ${t('F.position', { p: 9999999 })}`.length, 'as wide as a document\'s place and a position of seven figures');
});

test('while the walk keeps its document in view off the view\'s centre, the strip marks the view\'s window over it, open at whichever end the view has run past (issue #141)', async () => {
  const host = { innerHTML: '', setAttribute() {}, addEventListener() {}, querySelectorAll: () => [] };
  LINE.attach(/** @type {any} */ (host), { open() {}, back() {}, forward() {}, trailList() {}, signIn() {} });
  await PUMP.loadWhole(LONG);
  /** the strip's mark as the line renders it */
  const mark = () => { LINE.render(true); return (/<span class="strip" data-act="strip"[^>]*>(<span class="strip-[^"]*"[^>]*>)<\/span><\/span>/.exec(host.innerHTML) || [])[1]; };
  /** @type {Array<[string, string, number, (s: {x: number, y: number, w: number, h: number}, fs: number) => {x: number, y: number}, {start: boolean, end: boolean}]>} each document, the span the walk stands on, where the view's centre stands off its region, the ends run past */
  const cases = [
    ['past the first edition\'s last line, its one short column whole in view', D, 15, (s, fs) => ({ x: s.x + s.w / 2, y: s.y + s.h + 10 * fs }), { start: true, end: true }],
    ['above the long edition\'s first line, its first row\'s top in view', LONG, 1, (s, fs) => ({ x: s.x + s.w / 2, y: s.y - 10 * fs }), { start: true, end: false }],
  ];
  for (const [where, doc, pos, off, ends] of cases) {
    const fs = LAYER.foldOf(REC.doc(doc)).fs, s = LAYER.shapeOf(doc), reading = 12.5 / fs;
    await WALK.focusTo(doc, pos);
    CAM.set({ ...LAYER.centreOf(doc, pos), scale: reading });
    assert.equal(LINE.addressDisplay().window, null, `${where}: the view's centre over the document, no window`);
    assert.ok(mark()?.startsWith('<span class="strip-mark"'), `${where}: the strip marks the position`);
    CAM.set({ ...off(s, fs), scale: reading });
    await WALK.retakeFromView(true);
    const a = LINE.addressDisplay(), w = LAYER.windowIn(doc);
    assert.deepEqual([a.doc, a.pos], [doc, WALK.landedAt() ?? WALK.current()?.pos], `${where}: the walk kept on its span, its position named`);
    assert.ok(w && a.window && WALK.kept(), `${where}: kept, a window over it`);
    assert.deepEqual(a.window, w, `${where}: the window the visible view shows`);
    assert.deepEqual({ start: w.start, end: w.end }, ends, `${where}: the ends the view has run past`);
    const extent = /** @type {number} */ (REC.doc(doc).extent), along = (/** @type {number} */ p) => Math.max(0, Math.min(1, (p - 1) / extent));
    const from = w.start ? 0 : along(w.from), to = w.end ? 1 : along(w.to);
    const open = `${w.start ? ' open-start' : ''}${w.end ? ' open-end' : ''}`;
    assert.equal(mark(), `<span class="strip-window${open}" style="left:${(from * 100).toFixed(1)}%;width:${((to - from) * 100).toFixed(1)}%">`, `${where}: the strip marks the window, open at the ends run past`);
  }
});

test('a restart the shell re-opened leaves the acting-as segment as it stood: no signed-out words, no sign-in (client.md §4b.2)', () => {
  const was = LINE.actingSegment();
  assert.equal(was.state, 2, 'acting as, through the signed session');
  fake.fire('session-died', { session: 's-1', reason: { arm: 'restart', reopened: true, session: 's-9' } });
  assert.deepEqual(LINE.actingSegment(), was, 'the same words and state under the re-opened session');
  assert.ok(!LINE.actingSegment().html.includes('data-act="signin"'), 'no sign-in offered');
});

test('the sign-in act bears its id in the guest\'s line and in the death arm\'s, as Back does: the session\'s face standing at it finds it again as the line is rebuilt (O-HOST\'s anchor)', () => {
  const was = REC.session();
  REC.setSession(null);
  const guest = LINE.actingSegment();
  REC.sessionDied({ arm: 'closed' });
  const dead = LINE.actingSegment();
  REC.setSession(was);
  assert.deepEqual([guest.state, dead.state], [1, 5], 'a guest\'s line, then the death arm');
  for (const s of [guest, dead]) assert.equal((s.html.match(/<button[^>]*data-act="signin"[^>]*>/g) || []).join(), '<button id="line-signin" data-act="signin">', `state ${s.state}: one sign-in act, bearing its id`);
});

test('the guest line names the board\'s origin where `boards()` found a board, and no origin where it found none (foundations §3.1; §3.3 state 1, "the board and venue shown")', () => {
  const was = { board: REC.board(), session: REC.session() };
  /** the segment's words as the line shows them, its tags taken out */
  const shown = (/** @type {string} */ html) => html.replace(/<[^>]*>/g, '');
  try {
    REC.setSession(null);
    REC.setBoard(null);
    const none = LINE.actingSegment();
    assert.deepEqual([none.state, shown(none.html)], [1, `${t('B1.guest-line')} · ${t('F.venue.notebook')} ${t('F.sign-in')}`], 'no board found: the guest line and the venue, no origin and no empty slot for one');
    REC.setBoard({ board: 'b-1', name: '', origin: 'http://127.0.0.1:9000' });
    const found = LINE.actingSegment();
    assert.deepEqual([found.state, shown(found.html)], [1, `${t('B1.guest-line')} · http://127.0.0.1:9000 · ${t('F.venue.notebook')} ${t('F.sign-in')}`], 'a board found: its origin between the guest line and the venue');
  } finally {
    REC.setBoard(was.board); REC.setSession(was.session);
  }
});

test('the session\'s own `writes` decides the acting-as segment: the keyless session reads state 3\'s words over any key store, a session that writes reads state 2 with the label of the key it is opened with (foundations §3.1, §3.3; E16 (a′))', () => {
  const was = { board: REC.board(), session: REC.session() };
  const O = 'http://127.0.0.1:8642';
  /** a key of the store as `fingerprint` answers it */
  const key = (/** @type {string} */ fingerprint, /** @type {string} */ label, /** @type {string[]} */ bindings) => ({ fingerprint, label, bindings, unbound: !bindings.length, payload: null });
  const here = key('e4272902a11439e5', 'dev-notebook', [`${O} principal 1 account 1.0.1`]);
  const elsewhere = key('9a0c33f1b2d4e6a8', 'other-board', ['http://127.0.0.1:9000 principal 1 account 1.0.1']);
  try {
    REC.setBoard({ board: 'b-1', name: '', origin: O });
    /** @type {Array<[ReturnType<typeof key>[], string]>} each key store, and what it holds */
    const stores = [[[], 'an empty store'], [[here], 'a store holding a key bound here for the session\'s principal']];
    for (const [store, holds] of stores) {
      REC.takeKeyStore(store, O);
      REC.setSession({ session: 's-2', principal: 1, account: '1.0.1', writes: false });
      const seg = LINE.actingSegment();
      assert.deepEqual([seg.state, seg.words], [3, t('F.keyless-session', { account: '1.0.1', origin: O })], `the keyless session over ${holds}: state 3's words`);
      assert.deepEqual([seg.html.includes('data-string="F.keyless-session"'), seg.html.includes('F.acting-as'), seg.html.includes('key present on this device'), seg.html.includes('data-act="signin"')], [true, false, false, false], `over ${holds}: no acting-as, no key claimed, no sign-in`);
    }
    /** @type {Array<[ReturnType<typeof key>[], string, string]>} each key store, the label of the key the session is opened with, and what the store holds */
    const signed = [[[elsewhere, here], 'dev-notebook', 'the key bound here for its principal, after one bound at another board'], [[elsewhere], 'other-board', 'the store\'s one key, bound at another board alone']];
    for (const [store, label, holds] of signed) {
      REC.takeKeyStore(store, O);
      REC.setSession({ session: 's-3', principal: 1, account: '1.0.1', writes: true });
      const seg = LINE.actingSegment();
      assert.deepEqual([seg.state, seg.words], [2, t('F.acting-as', { account: '1.0.1', N: 1, 'device label': label, origin: O })], `a session that writes over ${holds}: state 2, naming ${label}`);
    }
  } finally {
    REC.takeKeyStore([], O); REC.setBoard(was.board); REC.setSession(was.session);
  }
});
