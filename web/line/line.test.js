// L-LINE's test against the fake port: the address display names the level
// the camera's scale reads — the board at far, the account under the camera
// at mid, nearer the walk's document by the version its box shows and the
// position the landing named, or the account or board the walk stands on —
// a position only at the document's own reading scale, its slot standing
// empty and as wide below it, the document's field followed by its label —
// its first line, cut on a word to the room past its fields — the segment
// named by its fields, that label whole and the document's state, the
// segment one width throughout, the strip
// marking the view's window while the walk keeps its document off-centre and
// outlining an arrival's runs, and the LEAP box opening on the address shown;
// the acting-as segment through a re-opened restart, a restart reconnecting
// and one refused, a death of an arm the page holds no words for, the
// keyless and the signed session's words with the device label's slot and
// its causes, the guest line with the board's origin and its sign-in act's
// id, and where no board is held why in the guest line's place and "go to an
// address" alone; a jump's face out of view and a walk's folded moment as
// segments; the places the line names; and the cover — no position at a
// refused document, the transient taken down and the class change said once
// with what it covered (FP-13, FP-20, FP-21, FP-22, FP-25, FP-26, FP-28,
// FP-29, FP-34, FP-35).
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
import { t, tHTML, addressedHTML } from '../strings.js';
import { esc } from '../util.js';
import * as WALK from '../nav/walk.js';
import * as FOCUS from '../nav/focus.js';
import * as LINE from './line.js';

const D = '1.0.1.0.3';
/** the account's 49th document, its first continuation's first: its room a seventh of a depth-0 document's across */
const C1 = '1.0.1.0.49';
const C1_TEXT = 'Tumbler.\n\nThe first field.';
/** a depth-0 document of more columns than its room holds at the standard size: set a step smaller than its neighbours */
const LONG = '1.0.1.0.40';
const LONG_TEXT = Array.from({ length: 340 }, (_, i) => `Item ${i + 1} of an edition longer than its room's twelve columns.`).join('\n\n');
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
  const account = { text: '1 › 1.0.1', place: '1 › 1.0.1', label: [], slot: 0, addr: '1.0.1', doc: null, pos: null, member: null, whole: false, window: null };
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
    assert.deepEqual(LINE.addressDisplay(), { text: `${place} › ${t('F.position', { p: 15 })}`, place, label: [{ text: 'Tumbler.', face: 'reading' }], slot, addr: D, doc: D, pos: 15, member: null, whole: false, window: null }, `${band}: board › account › document › position, the document's first line its label`);
    assert.equal(LINE.currentAddress(), D, `${band}: the box holds the document`);
  }
});

test('at reading scale the line names the version the box shows: a pinned version\'s address whole, its marker lit, and its own position; the strip\'s act quotes the version\'s own words (issue #154; foundations §3.2: "its version address with ○ lit")', async () => {
  const D2 = D + '.2', TEXT2 = 'Tumbler.\n\nThe second version holds this.';
  Object.assign(script, reads(D2, TEXT2));
  await PUMP.loadWhole(D2);
  WALK.readers({ shown: (a) => (a === D || a === D2 ? D2 : a) });
  const platform = { document: globalThis.document };
  try {
    over(D, 14 / STANDARD_FS);
    await WALK.focusTo(D, 15);
    const place = `1 › 1.0.1 › ${D2}`, slot = ` › ${t('F.position', { p: 99 })}`.length;
    assert.deepEqual(LINE.addressDisplay(), { text: `${place} › ${t('F.position', { p: 15 })}`, place, label: [{ text: 'Tumbler.', face: 'reading' }], slot, addr: D2, doc: D2, pos: 15, member: 2, whole: false, window: null }, 'board › account › the version\'s address › position, the member pinned, its own first line its label');
    assert.equal(LINE.currentAddress(), D2, 'the box opens holding the version');
    const host = /** @type {any} */ ({ innerHTML: '', textContent: '', setAttribute() {}, addEventListener() {}, querySelectorAll: () => [], contains: () => false });
    globalThis.document = /** @type {any} */ ({ activeElement: null, body: null });
    LINE.attach(host, { open() {}, back() {}, forward() {}, trailList() {}, signIn() {} });
    LINE.render(true);
    assert.ok(/class="marker lit"[^>]*>●</.test(host.innerHTML), `the marker lit: ${host.innerHTML}`);
    LINE.stripAct();
    LINE.render(true);
    assert.ok(host.innerHTML.includes('version holds this.'), `the strip's act quotes the version's own words, never the trunk's: ${host.innerHTML}`);
    LINE.act();
  } finally { WALK.readers({}); globalThis.document = platform.document; }
  assert.deepEqual(fake.unanswered, []);
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
    const label = [{ text: (doc === C1 ? C1_TEXT : LONG_TEXT).split('\n')[0], face: 'reading' }];
    assert.deepEqual(LINE.addressDisplay(), { text: place, place, label, slot, addr: doc, doc, pos: null, member: null, whole: false, window: null }, `${doc} at ${band}: the document alone, no position`);
    assert.equal(LINE.currentAddress(), doc, `${doc} at ${band}: the box holds the document, no position`);
    assert.deepEqual(slotShown(), { width: slot, words: '', strip: false }, `${doc} at ${band}: the position's slot stands empty, as wide, its strip's room kept and nothing drawn in it`);
    // at its own reading scale, the walk where it stood: the position the landing named, in the same slot
    over(doc, 12.5 / fsOf(doc));
    const words = ` › ${t('F.position', { p: 15 })}`;
    assert.deepEqual(LINE.addressDisplay(), { text: place + words, place, label, slot, addr: doc, doc, pos: 15, member: null, whole: false, window: null }, `${doc} at its reading scale: the position named`);
    assert.deepEqual(slotShown(), { width: slot, words, strip: true }, `${doc} at its reading scale: the position and its strip in the slot, as wide`);
  }
});

test('at reading scale the document\'s field is followed by its label — its box\'s lead, as its label on the plane sets it — whole where the room the segment\'s one width leaves past its fields holds it, else cut on a word, its fields never; and the segment is named by its fields in their order, the label whole after the document\'s field, the position and the document\'s state (issue #23)', async () => {
  const host = { innerHTML: '', setAttribute() {}, addEventListener() {}, querySelectorAll: () => [] };
  LINE.attach(/** @type {any} */ (host), { open() {}, back() {}, forward() {}, trailList() {}, signIn() {} });
  await PUMP.loadWhole(LONG);
  /** the segment as the line renders it: its label's words, its fields' markup kept, and its accessible name */
  const segment = () => {
    LINE.render(true);
    const m = /<button class="seg address"[^>]*aria-label="([^"]*)"[^>]*><b>([^<]*)<\/b><span class="label"><span class="lead-in"><\/span>(.*?)<\/span><span class="slot"><b class="pos"[^>]*>([^<]*)<\/b>/.exec(host.innerHTML);
    return m && { name: m[1].replace(/&amp;/g, '&').replace(/&#39;/g, "'"), place: m[2], label: m[3].replace(/<[^>]*>/g, ''), labelHTML: m[3], pos: m[4] };
  };
  for (const [doc, text, shown] of /** @type {Array<[string, string, string]>} */ ([[D, 'Tumbler.', 'Tumbler.'], [LONG, LONG_TEXT.split('\n')[0], 'Item 1…']])) {
    await WALK.focusTo(doc, 15);
    CAM.set({ ...LAYER.centreOf(doc, 15), scale: 12.5 / LAYER.foldOf(REC.doc(doc)).fs });
    const a = LINE.addressDisplay(), seg = /** @type {NonNullable<ReturnType<typeof segment>>} */ (segment());
    assert.deepEqual(a.label, [{ text, face: 'reading' }], `${doc}: its label its first line, the reading face's`);
    assert.deepEqual([seg.place, seg.label, seg.pos], [a.place, shown, ` › ${t('F.position', { p: 15 })}`], `${doc}: its fields whole, its label ${shown === text ? 'whole' : 'cut on a word'} between them`);
    assert.ok(seg.labelHTML.includes('<span class="reading">'), `${doc}: the label in the reading face: ${seg.labelHTML}`);
    assert.equal(seg.name, `${a.place} ${text} › ${t('F.position', { p: 15 })}, ${t('F.published')}`, `${doc}: named by its fields, its label whole, its position and its state`);
  }
});

test('at far scale the line names the board, the whole board in view at its clamp, and the box opens holding the board', async () => {
  const whole = CAM.viewForCell(boardCell('1'), 0.92);
  CAM.set(whole);
  assert.equal(lodOf(CAM.cam.scale).name, 'far~mid', 'WHOLE BOARD on this viewport');
  const board = { text: '1 · ' + t('B1.clamp'), place: '1 · ' + t('B1.clamp'), label: [], slot: 0, addr: '1', doc: null, pos: null, member: null, whole: true, window: null };
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
  const named = (/** @type {string} */ text, /** @type {string} */ addr) => ({ text, place: text, label: [], slot: 0, addr, doc: null, pos: null, member: null, whole: false, window: null });
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

test('the places the line names are those its address display names: the board alone at far, the account under the camera at mid, nearer the walk\'s document by its box — a pinned version by the box every version shares — or the account the walk stands on (issue #169: "Named once")', async () => {
  CAM.set(CAM.viewForCell(boardCell('1'), 0.92));
  await WALK.focusTo(D, 15);
  assert.deepEqual(LINE.named(), { board: '1', account: null, doc: null }, 'far: the board alone');
  over(D, MID);
  assert.deepEqual(LINE.named(), { board: '1', account: '1.0.1', doc: null }, 'mid: the account under the camera, never the walk\'s document');
  over(D, NEAR);
  assert.deepEqual(LINE.named(), { board: '1', account: '1.0.1', doc: D }, 'near: the walk\'s document');
  const D2 = D + '.2';
  Object.assign(script, reads(D2, 'Tumbler.\n\nThe second version holds this.'));
  await PUMP.loadWhole(D2);
  WALK.readers({ shown: (a) => (a === D || a === D2 ? D2 : a) });
  try {
    await WALK.focusTo(D, 15);
    assert.deepEqual([LINE.addressDisplay().doc, LINE.named()], [D2, { board: '1', account: '1.0.1', doc: D }], 'the box showing its version: the line names the version, the box named by the address it shares');
  } finally { WALK.readers({}); }
  await WALK.focusTo('1.0.2', null);
  assert.deepEqual(LINE.named(), { board: '1', account: '1.0.2', doc: null }, 'near, the walk on an account: that account');
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
    ['above the long edition\'s first line, its first column\'s top in view', LONG, 1, (s, fs) => ({ x: LAYER.centreOf(LONG, null).x, y: s.y - 10 * fs }), { start: true, end: false }],
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

test('where an arrival in several runs stands in the document named, the strip outlines each run as an extent along it, from its first position to its last, the one the landing stands at filled; an arrival in another document draws none there (issue #158: "Draw the runs on the address line\'s position strip as outlined extents")', async () => {
  const host = { innerHTML: '', setAttribute() {}, addEventListener() {}, querySelectorAll: () => [] };
  /** @type {import('./line.js').Pieces | null} the arrival's runs, as N-GO's landing hands them in */
  let pieces = null;
  LINE.attach(/** @type {any} */ (host), { open() {}, back() {}, forward() {}, trailList() {}, signIn() {}, pieces: () => pieces });
  await WALK.focusTo(D, 15);
  CAM.set({ ...LAYER.centreOf(D, 15), scale: 12.5 / LAYER.foldOf(REC.doc(D)).fs });
  /** the strip's runs as the line renders them: whether each is the one the landing stands at, its left and its width in % */
  const runs = () => { LINE.render(true); return [...host.innerHTML.matchAll(/<span class="strip-run( current)?" style="left:([\d.]+)%;width:([\d.]+)%"><\/span>/g)].map((m) => [!!m[1], m[2], m[3]]); };
  assert.deepEqual(runs(), [], 'no arrival: no runs drawn');
  pieces = { addr: D, runs: [{ pos: 3, width: 4 }, { pos: 15, width: 5 }], current: 1 };
  const extent = /** @type {number} */ (REC.doc(D).extent), along = (/** @type {number} */ p) => Math.max(0, Math.min(1, (p - 1) / extent));
  const at = (/** @type {number} */ pos, /** @type {number} */ width) => [(along(pos) * 100).toFixed(1), ((along(pos + width) - along(pos)) * 100).toFixed(1)];
  assert.deepEqual(runs(), [[false, ...at(3, 4)], [true, ...at(15, 5)]], 'each run an extent along the strip, the landing\'s filled');
  assert.ok(/<span class="strip-run[^"]*"[^>]*><\/span><span class="strip-mark"/.test(host.innerHTML), 'the position marked over them');
  pieces = { ...pieces, addr: '1.0.1.0.127' };
  assert.deepEqual(runs(), [], 'an arrival in another document: none in this one\'s strip');
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

test('the guest line names the board `boards()` found — its origin between the guest line and the venue — and its sign-in (foundations §3.1; §3.3 state 1, "the board and venue shown")', () => {
  const was = { board: REC.board(), session: REC.session() };
  /** the segment's words as the line shows them, its tags taken out */
  const shown = (/** @type {string} */ html) => html.replace(/<[^>]*>/g, '');
  try {
    REC.setSession(null);
    REC.takeBoards({ result: [{ board: 'b-1', name: 'http://127.0.0.1:9000', origin: 'http://127.0.0.1:9000' }] });
    const found = LINE.actingSegment();
    assert.deepEqual([found.state, shown(found.html)], [1, `${t('B1.guest-line')} · http://127.0.0.1:9000 · ${t('F.venue.notebook')} ${t('F.sign-in')}`], 'a board found: its origin between the guest line and the venue');
  } finally {
    REC.setBoard(was.board); REC.setSession(was.session);
  }
});

test('where `boards()` found no board the line names none — no guest line, venue, origin, claimant or sign-in — but says why in the guest line\'s place, none of §3.3\'s states: at an empty list `F.unclaimed`, an inert act whose press says beginning a notebook isn\'t built yet; at a list refused, its words, with "try again" beside them where a retry may tell — the board not answering — and none where it may not — the provider\'s own refusal (issue #215\'s design decision; FP-35)', () => {
  const was = { board: REC.board(), session: REC.session() };
  /** the segment's words as the line shows them, its tags taken out */
  const shown = (/** @type {string} */ html) => html.replace(/<[^>]*>/g, '');
  /** @type {{click: ((ev: any) => void) | null}} the line's click listener, as it attaches */
  const on = { click: null };
  let again = 0;
  const host = { innerHTML: '', setAttribute() {}, addEventListener(/** @type {string} */ type, /** @type {(ev: any) => void} */ fn) { if (type === 'click') on.click = fn; }, querySelectorAll: () => [], contains: () => false };
  FOCUS.attach({ live: /** @type {any} */ (live) });
  LINE.attach(/** @type {any} */ (host), { open() {}, back() {}, forward() {}, trailList() {}, signIn() {}, again: () => { again++; } });
  /** a pointer's press on the line's act named */
  const press = (/** @type {string} */ act) => on.click?.({ type: 'click', detail: 1, target: { closest: () => ({ dataset: { act } }) }, stopPropagation() {} });
  try {
    REC.setSession(null);
    REC.takeBoards({ result: [] });
    const empty = LINE.actingSegment();
    assert.deepEqual([empty.state, empty.words, empty.alarm], [0, t('F.unclaimed'), false], 'the list empty: why, none of the seven states, nothing said assertively');
    assert.equal(empty.html, `<button id="line-unclaimed" data-act="unclaimed" class="inert" data-string="F.unclaimed">${esc(t('F.unclaimed'))}</button>`, 'the doors\' act, inert, standing alone in the guest line\'s place');
    LINE.render(true);
    for (const word of [t('B1.guest-line'), t('F.venue.notebook'), t('F.sign-in'), 'data-act="signin"', 'acting as']) assert.ok(!host.innerHTML.includes(word), `the line names no ${word}: ${host.innerHTML}`);
    live.textContent = '';
    press('unclaimed');
    assert.ok(host.innerHTML.includes(`<span class="seg transient" data-string="L.no-notebook-yet">${esc(t('L.no-notebook-yet'))}</span>`), `its press says beginning a notebook isn't built yet, in the line: ${host.innerHTML}`);
    assert.equal(live.textContent, t('L.no-notebook-yet'), 'and through the status region');
    LINE.act();
    REC.takeBoards({ refused: { kind: 'unreachable', name: 'unreachable', text: 'refused' } });
    const unreached = LINE.actingSegment();
    assert.deepEqual([unreached.state, shown(unreached.html)], [0, `${t('L.boards-unread')} ${t('B1.try-again')}`], 'the board not answering: its words, and "try again"');
    assert.ok(unreached.html.startsWith(`<span data-string="L.boards-unread">${esc(t('L.boards-unread'))}</span> <button id="line-again" data-act="again">`), unreached.html);
    LINE.render(true);
    press('again');
    assert.equal(again, 1, 'its press reads the list again: the act the app hands in');
    REC.takeBoards({ refused: { kind: 'shell', name: 'provider_403', status: 403, text: 'not admitted' } });
    const refused = LINE.actingSegment();
    assert.deepEqual([refused.state, shown(refused.html), refused.html.includes('data-act')], [0, t('L.boards-unread'), false], 'the provider\'s own refusal: its words, and no retry offered where none may tell');
  } finally {
    LINE.act(); REC.setBoard(was.board); REC.setSession(was.session);
  }
});

test('where no board is held the address display reads "go to an address" alone at every scale — at far, at mid over an account\'s cell, near over the document the walk stands on — naming no board, account or document, so the LEAP box opens empty and no place\'s label is held as named; the segment its one width, its slot, strip and marker empty (issue #215\'s design decision: "The address display shows only \'go to an address\'"; FP-35)', async () => {
  const was = REC.board(), go = t('L.go-to-address');
  const host = { innerHTML: '', setAttribute() {}, addEventListener() {}, querySelectorAll: () => [], contains: () => false };
  LINE.attach(/** @type {any} */ (host), { open() {}, back() {}, forward() {}, trailList() {}, signIn() {} });
  /** the segment as the line renders it: its width in characters and its markup */
  const segment = () => { LINE.render(true); return { width: Number((/--words:(\d+)/.exec(host.innerHTML) || [])[1]), html: (/<button class="seg address"[^]*?<\/button>/.exec(host.innerHTML) || [''])[0] }; };
  try {
    await WALK.focusTo(D, 15);
    over(D, 14 / STANDARD_FS);
    const held = segment();
    REC.takeBoards({ result: [] });
    /** @type {Array<[string, () => void]>} each scale, and where the camera stands at it */
    const scales = [['far', () => CAM.set(CAM.viewForCell(boardCell('1'), 0.92))], ['mid, over an account\'s cell', () => over(D, MID)], ['near, over the document the walk stands on', () => over(D, 14 / STANDARD_FS)]];
    for (const [where, stand] of scales) {
      stand();
      assert.deepEqual(LINE.addressDisplay(), { text: go, place: go, label: [], slot: 0, addr: '', doc: null, pos: null, member: null, whole: false, window: null }, `${where}: "go to an address" alone`);
      assert.equal(LINE.currentAddress(), '', `${where}: the LEAP box opens empty`);
      assert.deepEqual(LINE.named(), { board: '', account: null, doc: null }, `${where}: no place named`);
      const s = segment();
      assert.equal(s.width, held.width, `${where}: the segment as wide as with a board`);
      assert.ok(s.html.includes(`<b>${esc(go)}</b><span class="label"><span class="lead-in"></span></span><span class="slot"><b class="pos" style="width:0ch"></b><span class="strip none" aria-hidden="true"></span></span><span class="marker none"`), `${where}: its words alone, label, slot, strip and marker empty: ${s.html}`);
    }
  } finally { REC.setBoard(was); }
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
      assert.ok(seg.html.includes(`<span class="slot" data-slot="label" role="img" aria-label="${esc(t('L.slot.named', { role: t('L.slot.device-label'), shows: label }))}">${esc(label)}</span>`), `over ${holds}: the device label's slot, named by its role and its label`);
    }
  } finally {
    REC.takeKeyStore([], O); REC.setBoard(was.board); REC.setSession(was.session);
  }
});

test('the one line\'s device label never shows its template placeholder: where the key the session was opened with cannot be named, its slot says why — two keys bound here for the principal, an empty store, a store the page could not read, a key with no label — each in its own words, named by its role and them (FP-34; issue #208)', () => {
  const was = { board: REC.board(), session: REC.session() };
  const O = 'http://127.0.0.1:8642';
  /** a key of the store as `fingerprint` answers it, bound here for principal 1 */
  const key = (/** @type {string} */ fingerprint, /** @type {string} */ label) => ({ fingerprint, label, bindings: [`${O} principal 1 account 1.0.1`], unbound: false, payload: null });
  try {
    REC.setBoard({ board: 'b-1', name: '', origin: O });
    REC.setSession({ session: 's-3', principal: 1, account: '1.0.1', writes: true });
    /** @type {Array<[string, ReturnType<typeof key>[] | null, string]>} each store, and the string its slot says */
    const stores = [
      ['two keys bound here for the principal', [key('e4272902a11439e5', 'dev-notebook'), key('5b1d77e0c9f2a3b4', 'second-device')], 'L.slot.key-untold'],
      ['an empty store', [], 'L.slot.key-untold'],
      ['a store the page could not read', null, 'L.slot.store-unread'],
      ['a key with no label', [key('e4272902a11439e5', '')], 'L.slot.unlabelled'],
    ];
    for (const [holds, store, id] of stores) {
      REC.takeKeyStore(store, O);
      const seg = LINE.actingSegment();
      assert.deepEqual([seg.state, seg.words], [2, t('F.acting-as', { account: '1.0.1', N: 1, 'device label': t(id), origin: O })], `${holds}: state 2, its slot saying "${t(id)}"`);
      assert.ok(seg.html.includes(`<span class="slot" data-slot="label" data-string="${id}" role="img" aria-label="${esc(t('L.slot.named', { role: t('L.slot.device-label'), shows: t(id) }))}">${esc(t(id))}</span>`), `${holds}: the slot carries its cause's string and its name: ${seg.html}`);
      assert.ok(!/⟨[^⟩]*⟩/.test(seg.html) && !/⟨[^⟩]*⟩/.test(seg.words), `${holds}: no ⟨token⟩ in the line`);
    }
  } finally {
    REC.takeKeyStore([], O); REC.setBoard(was.board); REC.setSession(was.session);
  }
});

test('a jump\'s face standing out of the visible view is carried by the line in a segment of its own — its string\'s id and its words — exactly while the reader the app hands in names one (FP-25: "in the one line when out of view")', () => {
  /** @type {{id: string, text: string} | null} what O-HOST's `aside` answers */
  let aside = null;
  const el = { innerHTML: '', setAttribute() {}, addEventListener() {}, querySelectorAll: () => [], contains: () => false };
  LINE.attach(/** @type {any} */ (el), { open() {}, back() {}, forward() {}, trailList() {}, signIn() {}, aside: () => aside });
  LINE.render(true);
  assert.ok(!el.innerHTML.includes('seg aside'), 'none out of view: no segment');
  aside = { id: 'L.reading', text: t('L.reading', { address: D }) };
  LINE.render();
  assert.ok(el.innerHTML.includes(`<span class="seg aside" data-string="L.reading">${addressedHTML(aside.text)}</span>`) && el.innerHTML.includes(`<span class="id">${D}</span>`), `the face's words in a segment of their own, the address in the identifier's face: ${el.innerHTML}`);
  aside = null;
  LINE.render();
  assert.ok(!el.innerHTML.includes('seg aside'), 'back in view: the segment gone');
});

test('each walk\'s folded moment stands as a segment of the one line after the acting-as segment — the walk, its step and "waits on you" — exactly while the reader the app hands in names it, a native button of the line\'s stop whose act is the walk\'s unfold, told whether a key made it (issue #182: "folds the moment into one segment of the top line")', () => {
  /** @type {Array<{key: string, words: string}>} what O-FACES' `folded` answers */
  let walks = [];
  /** @type {Array<[string, boolean]>} the unfolds the segment's act asked for: the walk, and whether a key made the act */
  const unfolded = [];
  /** @type {{click: ((ev: any) => void) | null}} the line's click listener, as it attaches */
  const on = { click: null };
  const el = { innerHTML: '', setAttribute() {}, addEventListener(/** @type {string} */ type, /** @type {(ev: any) => void} */ fn) { if (type === 'click') on.click = fn; }, querySelectorAll: () => [], contains: () => false };
  LINE.attach(/** @type {any} */ (el), { open() {}, back() {}, forward() {}, trailList() {}, signIn() {}, walks: () => walks, walk: (key, byKey) => { unfolded.push([key, byKey]); } });
  LINE.render(true);
  assert.ok(!el.innerHTML.includes('seg walk'), 'nothing folded: no segment');
  const words = t('L.walk.waits', { walk: 'claim', step: 'name this device' });
  walks = [{ key: 'claim|b-1', words }];
  LINE.render();
  const seg = `<button class="seg walk" data-act="walk:claim|b-1" data-string="L.walk.waits">${esc(words)}</button>`;
  assert.ok(el.innerHTML.includes(seg), `the walk's words in a segment of their own: ${el.innerHTML}`);
  assert.ok(el.innerHTML.indexOf(seg) > el.innerHTML.indexOf('seg acting'), 'after the acting-as segment');
  const pressed = { dataset: { act: 'walk:claim|b-1' } };
  for (const detail of [1, 0]) on.click?.({ type: 'click', detail, target: { closest: () => pressed }, stopPropagation() {} });
  assert.deepEqual(unfolded, [['claim|b-1', false], ['claim|b-1', true]], 'a press on it unfolds its walk\'s moment: a pointer\'s, then a key\'s');
  walks = [];
  LINE.render();
  assert.ok(!el.innerHTML.includes('seg walk'), 'unfolded, or ended: the segment gone');
});

/** the one status region's stand-in: what the line says through it, and how */
const live = { textContent: '', live: '', setAttribute(/** @type {string} */ k, /** @type {string} */ v) { if (k === 'aria-live') live.live = v; } };

test('a restart that re-opened none leaves the acting-as segment as it stood for the first second, then reads "reconnecting as ⟨account⟩ after a restart" in its place, the session\'s state kept, and stands as it stood again once the session is back as the same account — never the signed-out words, nothing said (issue #175)', async (ctx) => {
  ctx.mock.timers.enable({ apis: ['setTimeout'] });
  const flush = () => new Promise((r) => setImmediate(r));
  const host = { innerHTML: '', setAttribute() {}, addEventListener() {}, querySelectorAll: () => [] };
  FOCUS.attach({ live: /** @type {any} */ (live) });
  LINE.attach(/** @type {any} */ (host), { open() {}, back() {}, forward() {}, trailList() {}, signIn() {} });
  const was = LINE.actingSegment(), s = /** @type {import('../bridge/shapes').SessionOpened} */ (REC.session());
  assert.equal(was.state, 2, 'acting as, through the signed session');
  LINE.render(true);
  live.textContent = '';
  script[FAKE.keyOf('session', { board: 'b-1' })] = { result: { ...s, session: 's-11' } };
  const call = fake.hold('session', { board: 'b-1' });
  fake.fire('session-died', { session: s.session, reason: { arm: 'restart', reopened: false } });
  assert.deepEqual(LINE.actingSegment(), was, 'within the first second: as it stood');
  ctx.mock.timers.tick(PUMP.RECONNECTING_MS);
  const back = LINE.actingSegment();
  assert.deepEqual([back.state, back.words, back.alarm], [2, t('L.reconnecting', { account: '1.0.1' }), false], 'past it: reconnecting, the session\'s state kept');
  assert.ok(back.html.includes('data-string="L.reconnecting"') && !back.html.includes('C-137') && !back.html.includes('data-act="signin"'), back.html);
  LINE.render();
  assert.equal(live.textContent, '', 'nothing said while it reconnects');
  call();
  await flush();
  assert.deepEqual([LINE.actingSegment(), REC.session()?.session], [was, 's-11'], 'back as the same account: the segment as it stood, under the session got back');
  LINE.render();
  assert.equal(live.textContent, '', 'nothing said as it returns');
});

test('a restart whose call again is refused leaves the page in the guest state boot shows for that refusal — no_key\'s keyless cell, state 3 — led by "could not reconnect as ⟨account⟩ after a restart" and said assertively once; never the signed-out words (issue #175)', async () => {
  const flush = () => new Promise((r) => setImmediate(r));
  const host = { innerHTML: '', setAttribute() {}, addEventListener() {}, querySelectorAll: () => [] };
  FOCUS.attach({ live: /** @type {any} */ (live) });
  LINE.attach(/** @type {any} */ (host), { open() {}, back() {}, forward() {}, trailList() {}, signIn() {} });
  const was = /** @type {import('../bridge/shapes').SessionOpened} */ (REC.session());
  LINE.render(true);
  live.textContent = '';
  script[FAKE.keyOf('session', { board: 'b-1' })] = { refused: { kind: 'shell', name: 'no_key' } };
  try {
    fake.fire('session-died', { session: was.session, reason: { arm: 'restart', reopened: false, refused: 'no_key' } });
    await flush();
    const seg = LINE.actingSegment(), lead = t('L.reconnect-refused', { account: '1.0.1' });
    assert.deepEqual([REC.session(), seg.state, seg.words, seg.alarm], [null, 3, lead, true], 'a guest, in the keyless cell boot shows for no_key, led by the words');
    assert.ok(seg.html.startsWith(`<span data-string="L.reconnect-refused">${tHTML('L.reconnect-refused', { account: '1.0.1' }, { account: 'id' })}</span> · <span data-string="B1.guest-line">`) && seg.html.includes('data-string="L.session-refused"') && seg.html.includes('data-act="signin"'), `boot's guest segment for the refusal, its sign-in among it, after the words, the account in the identifier's face: ${seg.html}`);
    assert.ok(!seg.html.includes('C-137'), 'never the signed-out words');
    LINE.render();
    assert.deepEqual([live.textContent, live.live], [lead, 'assertive'], 'said assertively as it arrives');
    live.textContent = '';
    LINE.render(true);
    assert.equal(live.textContent, '', 'said once');
  } finally { REC.setSession(was); REC.setSessionRefused(null); }
});

test('a death of an arm whose words this page does not hold — seeded, blocked, unreachable — reads the guest line in the death arm\'s place, its sign-in among it, said assertively; "signed out" the page\'s own close\'s alone (issue #175: "\'signed out\' stays on the sign-out path alone")', () => {
  const was = REC.session(), guest = t('B1.guest-line');
  try {
    for (const reason of [{ arm: 'seeded', account: '1.0.1.1', as_of: 9, writer: 'fp-2' }, { arm: 'blocked', record: '1.0.1.0.7', ground: null }, { arm: 'unreachable', text: 'refused' }]) {
      REC.setSession(was);
      REC.sessionDied(/** @type {import('../bridge/shapes').DeathReason} */ (reason));
      const seg = LINE.actingSegment();
      assert.deepEqual([seg.state, seg.words, seg.alarm], [5, guest, true], `the ${reason.arm} arm: the death, in the guest line's words, said assertively`);
      assert.ok(seg.html.startsWith('<span data-string="B1.guest-line">') && seg.html.includes('data-act="signin"') && !seg.html.includes('C-137'), `the ${reason.arm} arm: ${seg.html}`);
    }
    REC.setSession(was);
    REC.sessionDied({ arm: 'closed' });
    assert.ok(LINE.actingSegment().html.startsWith('<span data-string="C-137.signed-out">'), 'the page\'s own close: "signed out"');
  } finally { REC.setSession(was); }
});

test('at a document a read refused — a covered draft among them — the line names no position, no strip and no window at its reading scale, and a change of the page\'s class takes down the transient the strip\'s act left, which quotes the text it was made at (issue #177: "no length, ticks or window")', async () => {
  const W = '1.0.1.0.8';
  const host = { innerHTML: '', setAttribute() {}, addEventListener() {}, querySelectorAll: () => [] };
  FOCUS.attach({ live: /** @type {any} */ (live) });
  LINE.attach(/** @type {any} */ (host), { open() {}, back() {}, forward() {}, trailList() {}, signIn() {} });
  REC.takeRefused(W, 'withheld');
  await WALK.focusTo(W, null);
  CAM.set(CAM.viewAt(LAYER.centreOf(W, null), LAYER.foldOf(REC.doc(W)).fs, 14));
  assert.ok(LAYER.atReadingScale(W) && lodOf(CAM.cam.scale).name === 'near', 'its box at its own reading scale, near');
  const a = LINE.addressDisplay();
  assert.deepEqual([a.doc, a.pos, a.window], [W, null, null], 'the document named, no position and no window');
  LINE.render(true);
  assert.ok(host.innerHTML.includes('<span class="strip none" aria-hidden="true"></span>') && !host.innerHTML.includes('strip-mark'), `no strip and no mark on it: ${host.innerHTML}`);
  await WALK.focusTo(D, 15);
  over(D, 14 / STANDARD_FS);
  LINE.stripAct();
  assert.ok(host.innerHTML.includes('seg transient') && host.innerHTML.includes(esc(REC.textBetween(D, 15, 75))), 'the strip\'s act: the passage\'s words in the transient');
  LINE.classChanged();
  assert.ok(!host.innerHTML.includes('seg transient'), `the change takes the transient down: ${host.innerHTML}`);
});

// placed last: the death empties the model every test above reads
test('a change of the page\'s class is said once, as the reads it asked answer: the ending\'s words, then the documents it covered — never the ending alone first, and nothing while they read (issue #177: "One status message says the session ended and what is covered")', async () => {
  const DR = '1.0.1.0.6', flush = () => new Promise((r) => setTimeout(r, 0));
  const host = { innerHTML: '', setAttribute() {}, addEventListener() {}, querySelectorAll: () => [] };
  FOCUS.attach({ live: /** @type {any} */ (live) });
  LINE.attach(/** @type {any} */ (host), { open() {}, back() {}, forward() {}, trailList() {}, signIn() {} });
  const was = REC.session();
  // a draft the session read, in view at HOME beside the edition; the guest's listing the edition alone, the draft withheld from the guest
  REC.takeSpanSet(DR, [{ subspace: 1, ordinal: 1, positions: 12 }]);
  script[FAKE.keyOf('op', { frame: F.retrieveDocVSpanSet(DR) })] = { refused: { kind: 'refused', name: 'withheld', code: 'withheld' } };
  script[FAKE.keyOf('places', { board: 'b-1' })] = { result: { docs: [{ doc: D, kind: 'edition', label: 'd', standing: 'public' }], counts: [{ account: '1.0.1', documents: 1 }], state: { arm: 'complete' } } };
  CAM.set(CAM.viewForCell(accountCell('1.0.1'), 0.85));
  LINE.render(true);
  live.textContent = '';
  const listing = fake.hold('places', { board: 'b-1' });
  try {
    fake.fire('session-died', { session: /** @type {{session: string}} */ (was).session, reason: { arm: 'closed' } });
    LINE.classChanged();
    LINE.render();
    assert.deepEqual([live.textContent, PUMP.rereading()], ['', true], 'nothing said while the index is read again: the ending is never said alone first');
    listing();
    await flush();
    for (let i = 0; i < 10 && PUMP.rereading(); i++) { PUMP.pump(); await flush(); }
    assert.deepEqual([PUMP.rereading(), REC.covered(DR)], [false, true], 'the places the view stood on read again: the draft withheld from the guest, covered');
    LINE.render();
    assert.deepEqual([live.textContent, live.live], [t('L.covered', { ending: t('C-137.signed-out'), documents: DR }), 'assertive'], 'said once the reads answer: the ending, then what it covered');
    live.textContent = '';
    LINE.render(true);
    assert.equal(live.textContent, '', 'said once');
  } finally { REC.setSession(was); }
});
