// L-LINE's test against the fake port: the address display names the level
// the camera's scale reads — the board at far, the account under the camera
// at mid, nearer the walk's document by the version its box shows and the
// position the landing named, or the account or board the walk stands on —
// a position only at the document's own reading scale, its words standing
// empty and as wide below it and its strip standing bare, the document's
// field followed by its label —
// its first line, cut on a word to the room past its fields — the segment
// named by its fields, that label whole and the document's state, the
// address part one width throughout, the strip
// marking the view's window while the walk keeps its document off-centre at
// its reading scale and outlining an arrival's runs at every scale, the
// strip the strip's act, and the LEAP box opening on the address shown;
// the layout — the least step whose rows hold the parts, the line giving way
// in steps as its rows narrow, the acts first and whole, the position to its
// strip, rows broken between parts, the address folded into the fold mark,
// whose act opens the box at the account it folds — held as the address, a
// position and the daemon change, a segment arriving standing in its place in
// the line's order where its row has room, else beneath the line until the
// next act;
// the acting-as segment through a re-opened restart, a restart reconnecting
// and one refused, a death of an arm the page holds no words for, the
// keyless and the signed session's words with the device label's slot and
// its causes, the guest line with the board's origin, its sign-in among the
// line's acts bearing its id, and where no board is held why in the guest line's place — with no
// adapter beneath the port why none stands, a page URL's `port` naming no
// port in its own words — and "go to an address" alone; a jump's face out of
// view and a walk's folded moment as segments; a reading scene's close said
// after it until the next act, whole once a session and as forward ›'s label
// after; the places the line names; the strip's window over a typed draft
// in the model's text, a text held in part keeping the window its estimates name;
// a kept document's clause in a segment of its own beside the address that
// names it, and the board's wherever it names no kept document; what the
// status region says of a kept place, by its name as the mirror finds it —
// once as its clause appears and once as its reads set it, changed or
// unchanged, still as last read where a read fails, nothing where it is let
// go unset, one message for documents a row names together and none for a
// change of class's own cause; and the cover — no
// position at a refused document, the transient taken down and the class
// change said once with what it covered (FP-13, FP-20, FP-21, FP-22, FP-23,
// FP-25, FP-26, FP-28, FP-29, FP-33, FP-34, FP-35, FP-36).
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
import { t, tHTML, addressedHTML, lastRead } from '../strings.js';
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
  const account = { text: '1 › 1.0.1', place: '1 › 1.0.1', label: [], slot: 0, addr: '1.0.1', doc: null, pos: null, member: null, whole: false, strip: false, window: null };
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
    assert.deepEqual(LINE.addressDisplay(), { text: `${place} › ${t('F.position', { p: 15 })}`, place, label: [{ text: 'Tumbler.', face: 'reading' }], slot, addr: D, doc: D, pos: 15, member: null, whole: false, strip: true, window: null }, `${band}: board › account › document › position, the document's first line its label`);
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
    assert.deepEqual(LINE.addressDisplay(), { text: `${place} › ${t('F.position', { p: 15 })}`, place, label: [{ text: 'Tumbler.', face: 'reading' }], slot, addr: D2, doc: D2, pos: 15, member: 2, whole: false, strip: true, window: null }, 'board › account › the version\'s address › position, the member pinned, its own first line its label');
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

test('a document below its own reading scale is named with its strip standing bare, whatever the band — a continuation document at near, a depth-0 document set a step smaller at mid~near — its position\'s words standing empty and as wide, the strip marking no position, carrying no position\'s title and no act; at its own reading scale the position is named in that slot and marked on the strip (issues #140, #236)', async () => {
  /** the line rendered into a stand-in element, and its position's slot read back from the markup: its width, its words, whether its strip shows, whether the strip is the act's, its title, and whether it marks a position */
  const host = { innerHTML: '', setAttribute() {}, addEventListener() {}, querySelectorAll: () => [] };
  LINE.attach(/** @type {any} */ (host), { open() {}, back() {}, forward() {}, trailList() {}, signIn() {} });
  const slotShown = () => {
    LINE.render(true);
    const m = /<(span|button) class="slot"([^>]*)><b class="pos" style="width:(\d+)ch">([^<]*)<\/b><span class="strip( none)?"[^>]*>(<span class="strip-mark"[^>]*><\/span>)?<\/span><\/\1><span class="marker/.exec(host.innerHTML);
    return m && { width: Number(m[3]), words: m[4], strip: !m[5], act: m[2].includes('data-act="strip"'), title: (/title="([^"]*)"/.exec(m[2]) || [])[1] ?? null, mark: !!m[6] };
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
    assert.deepEqual(LINE.addressDisplay(), { text: place, place, label, slot, addr: doc, doc, pos: null, member: null, whole: false, strip: true, window: null }, `${doc} at ${band}: the document and its strip, no position`);
    assert.equal(LINE.currentAddress(), doc, `${doc} at ${band}: the box holds the document, no position`);
    assert.deepEqual(slotShown(), { width: slot, words: '', strip: true, act: false, title: null, mark: false }, `${doc} at ${band}: the position's words stand empty, as wide, its strip standing bare beside them, no position marked or titled`);
    // at its own reading scale, the walk where it stood: the position the landing named, in the same slot
    over(doc, 12.5 / fsOf(doc));
    const words = ` › ${t('F.position', { p: 15 })}`;
    assert.deepEqual(LINE.addressDisplay(), { text: place + words, place, label, slot, addr: doc, doc, pos: 15, member: null, whole: false, strip: true, window: null }, `${doc} at its reading scale: the position named`);
    assert.deepEqual(slotShown(), { width: slot, words, strip: true, act: true, title: t('F.position', { p: 15 }), mark: true }, `${doc} at its reading scale: the position and its strip in the slot, as wide, the position marked on the strip`);
  }
});

test('at reading scale the document\'s field is followed by its label — its box\'s lead, as its label on the plane sets it — whole where the room the segment\'s one width leaves past its fields holds it, else cut on a word, its fields never; and the segment is named by its fields in their order, the label whole after the document\'s field, the position and the document\'s state (issue #23)', async () => {
  const host = { innerHTML: '', setAttribute() {}, addEventListener() {}, querySelectorAll: () => [] };
  LINE.attach(/** @type {any} */ (host), { open() {}, back() {}, forward() {}, trailList() {}, signIn() {} });
  await PUMP.loadWhole(LONG);
  /** the segment as the line renders it: its label's words, its fields' markup kept, and its accessible name */
  const segment = () => {
    LINE.render(true);
    const m = /<button class="seg address"[^>]*aria-label="([^"]*)"[^>]*><b>([^<]*)<\/b><span class="label"><span class="lead-in"><\/span>(.*?)<\/span><\/button><(?:span|button) class="slot"[^>]*><b class="pos"[^>]*>([^<]*)<\/b>/.exec(host.innerHTML);
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
  const board = { text: '1 · ' + t('B1.clamp'), place: '1 · ' + t('B1.clamp'), label: [], slot: 0, addr: '1', doc: null, pos: null, member: null, whole: true, strip: false, window: null };
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
  const named = (/** @type {string} */ text, /** @type {string} */ addr) => ({ text, place: text, label: [], slot: 0, addr, doc: null, pos: null, member: null, whole: false, strip: false, window: null });
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

test('the address segment is one width at every scale and focus: where no document is named its position\'s slot, its strip and its marker stand empty, their room kept, and below a named document\'s own reading scale its position\'s words stand empty beside its bare strip, so nothing after it on the line moves (issues #141, #236)', async () => {
  const host = { innerHTML: '', setAttribute() {}, addEventListener() {}, querySelectorAll: () => [] };
  LINE.attach(/** @type {any} */ (host), { open() {}, back() {}, forward() {}, trailList() {}, signIn() {} });
  await PUMP.loadWhole(C1);
  /** the segment as the line renders it: its width in characters, and its slot, strip, the strip's position mark and marker */
  const shown = () => {
    LINE.render(true);
    const w = /<span class="address-part" style="--words:(\d+)">/.exec(host.innerHTML);
    const m = /<(span|button) class="slot"[^>]*><b class="pos" style="width:(\d+)ch">([^<]*)<\/b><span class="strip( none)?"[^>]*>(<span class="strip-mark"[^>]*><\/span>)?<\/span><\/\1><span class="marker( lit)?( none)?"/.exec(host.innerHTML);
    return { width: w ? Number(w[1]) : null, slot: m && { words: m[3], strip: !m[4], mark: !!m[5], marker: !m[7] } };
  };
  const empty = { words: '', strip: false, mark: false, marker: false };
  const whole = CAM.viewForCell(boardCell('1'), 0.92);
  /** @type {Array<[string, () => Promise<unknown>, {words: string, strip: boolean, mark: boolean, marker: boolean}]>} each state, how it is reached, the slot shown there */
  const states = [
    ['the whole board', async () => { CAM.set(whole); await WALK.focusTo('1', null); }, empty],
    ['mid, the account under the camera', async () => { over(D, MID); await WALK.focusTo(D, null); }, empty],
    ['near, the walk on an account', async () => { over(D, NEAR); await WALK.focusTo('1.0.2', null); }, empty],
    ['near, a document below its own reading scale: its marker and its bare strip, its position\'s words empty', async () => { over(C1, NEAR); await WALK.focusTo(C1, null); }, { ...empty, strip: true, marker: true }],
    ['near, a position named', async () => { over(D, NEAR); await WALK.focusTo(D, 15); }, { words: ` › ${t('F.position', { p: 15 })}`, strip: true, mark: true, marker: true }],
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

test('while the walk keeps its document in view off the view\'s centre, the strip marks the view\'s window over it, open at whichever end the view has run past; below the document\'s own reading scale, kept so, the strip stands bare, marking neither the window nor a position (issues #141, #236)', async () => {
  const host = { innerHTML: '', setAttribute() {}, addEventListener() {}, querySelectorAll: () => [] };
  LINE.attach(/** @type {any} */ (host), { open() {}, back() {}, forward() {}, trailList() {}, signIn() {} });
  await PUMP.loadWhole(LONG);
  /** the strip's mark as the line renders it */
  const mark = () => { LINE.render(true); return (/<button class="slot" data-act="strip"[^>]*><b class="pos"[^>]*>[^<]*<\/b><span class="strip">(<span class="strip-[^"]*"[^>]*>)<\/span><\/span><\/button>/.exec(host.innerHTML) || [])[1]; };
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
  // a continuation document at near, below its own reading scale, the view's centre past its last line as the first edition's above
  await PUMP.loadWhole(C1);
  const below = LAYER.shapeOf(C1), em = LAYER.foldOf(REC.doc(C1)).fs;
  await WALK.focusTo(C1, null);
  CAM.set({ x: below.x + below.w / 2, y: below.y + below.h + 10 * em, scale: NEAR });
  await WALK.retakeFromView(true);
  assert.ok(lodOf(CAM.cam.scale).name === 'near' && !LAYER.atReadingScale(C1), `${C1} at near, below its own reading scale`);
  assert.ok(WALK.current()?.addr === C1 && WALK.kept() && LAYER.windowIn(C1), `${C1} kept, the visible view holding a window over it`);
  const a = LINE.addressDisplay();
  assert.deepEqual([a.doc, a.pos, a.strip, a.window], [C1, null, true, null], `${C1}: named, its strip standing, no position and no window`);
  LINE.render(true);
  assert.ok(host.innerHTML.includes('<span class="strip"></span>'), `${C1}: the strip bare, neither the window nor a position marked on it — ${host.innerHTML}`);
});

test('the strip over a text holding typed words follows the text shown: its window, the walk\'s position and its length all that text\'s; a text held in part keeps the window its estimates name, never cut back to what is held (FP-26; issue #515)', async () => {
  const host = { innerHTML: '', setAttribute() {}, addEventListener() {}, querySelectorAll: () => [] };
  LINE.attach(/** @type {any} */ (host), { open() {}, back() {}, forward() {}, trailList() {}, signIn() {} });
  await PUMP.loadWhole(LONG);
  const typed = 'A paragraph typed above the reader.\n\n', k = typed.length;
  /** the view above the document's first line, its first row's tops in view, the walk kept on its first span */
  const keptAbove = async () => {
    const f = LAYER.foldOf(REC.doc(LONG)), s = LAYER.shapeOf(LONG);
    await WALK.focusTo(LONG, 1, false, true, null, true);
    CAM.set({ x: LAYER.centreOf(LONG, null).x, y: s.y - 10 * f.fs, scale: 12.5 / f.fs });
    await WALK.retakeFromView(true);
    assert.ok(WALK.kept() && LINE.addressDisplay().doc === LONG, 'the walk kept on the document, off the view\'s centre');
  };
  REC.addEdit(LONG, { pos: 1, width: 0, text: typed });
  try {
    await keptAbove();
    const a = LINE.addressDisplay(), w = /** @type {import('../plane/layout.js').Window} */ (LAYER.windowIn(LONG));
    assert.ok(w.to > k, 'the view shows the delivered text past the typed words');
    assert.deepEqual([a.window, a.pos], [w, 1], 'its window the text shown\'s, the typed words in it, beside the walk\'s position there');
    // the strip's length is the text shown's: the window's far end stands along it at its place in that text
    LINE.render();
    const extent = /** @type {number} */ (LAYER.shownOf(LONG).extent), width = ((w.to - 1) / extent * 100).toFixed(1) + '%';
    assert.equal(extent, /** @type {number} */ (REC.doc(LONG).extent) + k, 'the text shown: the model\'s and the typed words');
    assert.ok(host.innerHTML.includes(`<span class="strip-window open-start" style="left:0.0%;width:${width}"></span>`), `the window drawn along the text shown's length, ${width} of it: ${(host.innerHTML.match(/<span class="strip-window[^>]*>/) || [''])[0]}`);
  } finally { REC.clearEdits(LONG); }
  // a position's place along the strip is its place in the text shown: on the short document D, a long line typed at its start
  // moves its last span most of the way along, where the model's own length would put it past the strip's end
  const many = 'A long line typed at the start of a short document. '.repeat(4) + '\n\n', last = /** @type {import('../model/records.js').Block} */ ([...REC.doc(D).blocks].reverse().find((b) => b.kind === 'para' && b.text.trim()));
  REC.addEdit(D, { pos: 1, width: 0, text: many });
  try {
    await WALK.focusTo(D, last.pos + many.length, false, true, null, true);
    const c = LAYER.centreOf(D, last.pos + many.length);
    CAM.set({ x: c.x, y: c.y, scale: 12.5 / LAYER.foldOf(REC.doc(D)).fs });
    LINE.render();
    const extent = /** @type {number} */ (LAYER.shownOf(D).extent), left = ((last.pos + many.length - 1) / extent * 100).toFixed(1) + '%';
    assert.ok(last.pos + many.length - 1 > /** @type {number} */ (REC.doc(D).extent), 'the position lies past the model\'s own length');
    assert.ok(host.innerHTML.includes(`<span class="strip-mark" style="left:${left}"></span>`), `the mark at its place along the text shown's length, ${left}: ${(host.innerHTML.match(/<span class="strip-mark[^>]*>/) || [''])[0]}`);
  } finally { REC.clearEdits(D); }
  // held in part: its first ten paragraphs, the rest of its columns estimated from its extent
  const held = LONG_TEXT.split('\n\n').slice(0, 10).join('\n\n') + '\n\n', extent = LONG_TEXT.length;
  REC.invalidate(LONG);
  REC.takeSpanSet(LONG, [{ subspace: 1, ordinal: 1, positions: extent }]);
  REC.takeDelivery(LONG, [{ pos: 1, width: held.length, kind: 'content', text: held, ref: null, origin: null }]);
  try {
    await keptAbove();
    const a = LINE.addressDisplay(), w = /** @type {import('../plane/layout.js').Window} */ (LAYER.windowIn(LONG));
    assert.ok(w.to > REC.doc(LONG).to - 1, `the window names a position estimated past what is held: ${w.to}, ${REC.doc(LONG).to}`);
    assert.deepEqual(a.window, w, 'as it stands, no position cut back to the held text');
  } finally { REC.invalidate(LONG); await PUMP.loadWhole(LONG); }
  assert.deepEqual(fake.unanswered, []);
});

test('where an arrival in several runs stands in the document named, the strip outlines each run as an extent along it, from its first position to its last, the one the landing stands at filled — at the document\'s reading scale and on its bare strip below it; an arrival in another document draws none there (issues #158: "Draw the runs on the address line\'s position strip as outlined extents", #236)', async () => {
  const host = { innerHTML: '', setAttribute() {}, addEventListener() {}, querySelectorAll: () => [] };
  /** @type {import('./line.js').Pieces | null} the arrival's runs, as N-GO's landing hands them in */
  let pieces = null;
  LINE.attach(/** @type {any} */ (host), { open() {}, back() {}, forward() {}, trailList() {}, signIn() {}, pieces: () => pieces });
  await WALK.focusTo(D, 15);
  CAM.set({ ...LAYER.centreOf(D, 15), scale: 12.5 / LAYER.foldOf(REC.doc(D)).fs });
  /** the strip's runs as the line renders them: whether each is the one the landing stands at, its left and its width in % */
  const runs = () => { LINE.render(true); return [...host.innerHTML.matchAll(/<span class="strip-run( current)?" style="left:([\d.]+)%;width:([\d.]+)%"><\/span>/g)].map((m) => [!!m[1], m[2], m[3]]); };
  /** a run's left and width along a document's strip, in % */
  const at = (/** @type {string} */ doc, /** @type {number} */ pos, /** @type {number} */ width) => {
    const extent = /** @type {number} */ (REC.doc(doc).extent), along = (/** @type {number} */ p) => Math.max(0, Math.min(1, (p - 1) / extent));
    return [(along(pos) * 100).toFixed(1), ((along(pos + width) - along(pos)) * 100).toFixed(1)];
  };
  assert.deepEqual(runs(), [], 'no arrival: no runs drawn');
  pieces = { addr: D, runs: [{ pos: 3, width: 4 }, { pos: 15, width: 5 }], current: 1 };
  assert.deepEqual(runs(), [[false, ...at(D, 3, 4)], [true, ...at(D, 15, 5)]], 'each run an extent along the strip, the landing\'s filled');
  assert.ok(/<span class="strip-run[^"]*"[^>]*><\/span><span class="strip-mark"/.test(host.innerHTML), 'the position marked over them');
  pieces = { ...pieces, addr: '1.0.1.0.127' };
  assert.deepEqual(runs(), [], 'an arrival in another document: none in this one\'s strip');
  // a continuation document at near, below its own reading scale
  await PUMP.loadWhole(C1);
  await WALK.focusTo(C1, null);
  over(C1, NEAR);
  assert.ok(!LAYER.atReadingScale(C1), `${C1} below its own reading scale`);
  pieces = { addr: C1, runs: [{ pos: 3, width: 4 }, { pos: 15, width: 5 }], current: 0 };
  assert.deepEqual(runs(), [[true, ...at(C1, 3, 4)], [false, ...at(C1, 15, 5)]], 'below its reading scale: each run an extent along the strip, the landing\'s filled');
  assert.ok(/<span class="strip"><span class="strip-run current"[^>]*><\/span><span class="strip-run"[^>]*><\/span><\/span>/.test(host.innerHTML), `on the bare strip, no position marked over them: ${host.innerHTML}`);
});

test('a restart the shell re-opened leaves the acting-as segment as it stood: no signed-out words, no sign-in (client.md §4b.2)', () => {
  const was = LINE.actingSegment();
  assert.equal(was.state, 2, 'acting as, through the signed session');
  fake.fire('session-died', { session: 's-1', reason: { arm: 'restart', reopened: true, session: 's-9' } });
  assert.deepEqual(LINE.actingSegment(), was, 'the same words and state under the re-opened session');
  assert.ok(!LINE.actingSegment().forms.join('').includes('data-act="signin"'), 'no sign-in offered');
});

test('the sign-in act stands among the line\'s acts, after Back, Forward and the trail, for a guest and for the death arm, bearing its id as Back does: the session\'s face standing at it finds it again as the line is rebuilt (O-HOST\'s anchor; issue #310\'s design decision: "The line\'s acts — Back, Forward, and a guest\'s \'sign in\' … — stand first")', () => {
  const was = REC.session();
  const host = { innerHTML: '', setAttribute() {}, addEventListener() {}, querySelectorAll: () => [], contains: () => false };
  LINE.attach(/** @type {any} */ (host), { open() {}, back() {}, forward() {}, trailList() {}, signIn() {} });
  /** the line's acts as it renders them, and the sign-in acts anywhere in it */
  const line = () => { LINE.render(true); return { acts: (/<span class="acts">(.*?)<\/span>/.exec(host.innerHTML) || [])[1] || '', signIn: host.innerHTML.match(/<button[^>]*data-act="signin"[^>]*>/g) || [] }; };
  try {
    assert.deepEqual([LINE.actingSegment().signIn, line().signIn], [false, []], 'a signed session: no sign-in');
    REC.setSession(null);
    const guest = LINE.actingSegment(), asGuest = line();
    REC.sessionDied({ arm: 'closed' });
    const dead = LINE.actingSegment(), asDead = line();
    assert.deepEqual([guest.state, dead.state], [1, 5], 'a guest\'s line, then the death arm');
    for (const [s, l] of /** @type {Array<[typeof guest, typeof asGuest]>} */ ([[guest, asGuest], [dead, asDead]])) {
      assert.ok(s.signIn && !s.forms.join('').includes('data-act="signin"'), `state ${s.state}: sign-in offered, none in the acting-as segment's words`);
      assert.deepEqual(l.signIn, ['<button id="line-signin" data-act="signin">'], `state ${s.state}: one sign-in act, bearing its id`);
      assert.ok(l.acts.endsWith(`<button id="line-signin" data-act="signin">${esc(t('F.sign-in'))}</button>`) && l.acts.includes('data-act="trail"'), `state ${s.state}: among the acts, after the trail: ${l.acts}`);
    }
  } finally { REC.setSession(was); }
});

test('the guest line names the board `boards()` found — its origin between the guest line and the venue — and its sign-in (foundations §3.1; §3.3 state 1, "the board and venue shown")', () => {
  const was = { board: REC.board(), session: REC.session() };
  /** the segment's words as the line shows them, its tags taken out */
  const shown = (/** @type {string} */ html) => html.replace(/<[^>]*>/g, '');
  try {
    REC.setSession(null);
    REC.takeBoards({ result: [{ board: 'b-1', name: 'http://127.0.0.1:9000', origin: 'http://127.0.0.1:9000' }] });
    const found = LINE.actingSegment();
    assert.deepEqual([found.state, shown(found.forms[0]), found.signIn], [1, `${t('B1.guest-line')} · http://127.0.0.1:9000 · ${t('F.venue.notebook')}`, true], 'a board found: its origin between the guest line and the venue, its sign-in among the line\'s acts');
  } finally {
    REC.setBoard(was.board); REC.setSession(was.session);
  }
});

test('where `boards()` found no board the line names none — no guest line, venue, origin, claimant or sign-in — but says why in the guest line\'s place, none of §3.3\'s states: at an empty list `F.unclaimed`, an inert act whose press raises the hint beside it saying beginning a notebook isn\'t built yet, the line holding no segment for it; at a list refused, its words, with "try again" beside them where a retry may tell — the board not answering — and none where it may not — the provider\'s own refusal (issue #215\'s design decision; FP-35)', () => {
  const was = { board: REC.board(), session: REC.session() };
  /** the segment's words as the line shows them, its tags taken out */
  const shown = (/** @type {string} */ html) => html.replace(/<[^>]*>/g, '');
  /** @type {{click: ((ev: any) => void) | null}} the line's click listener, as it attaches */
  const on = { click: null };
  let again = 0, acted = 0;
  /** @type {Array<[string, any]>} the hints the line's acts raised, each its string and the element it stands beside */
  const hinted = [];
  const host = { innerHTML: '', setAttribute() {}, addEventListener(/** @type {string} */ type, /** @type {(ev: any) => void} */ fn) { if (type === 'click') on.click = fn; }, querySelectorAll: () => [], contains: () => false };
  FOCUS.attach({ live: /** @type {any} */ (live) });
  LINE.attach(/** @type {any} */ (host), { open() {}, back() {}, forward() {}, trailList() {}, signIn() {}, again: () => { again++; }, hint: (id, at) => { hinted.push([id, at]); }, acted: () => { acted++; } });
  /** a pointer's press on the line's act named */
  const press = (/** @type {string} */ act) => on.click?.({ type: 'click', detail: 1, target: { closest: () => ({ dataset: { act } }) }, stopPropagation() {} });
  try {
    REC.setSession(null);
    REC.takeBoards({ result: [] });
    const empty = LINE.actingSegment();
    assert.deepEqual([empty.state, empty.words, empty.alarm], [0, t('F.unclaimed'), false], 'the list empty: why, none of the seven states, nothing said assertively');
    assert.deepEqual(empty.forms, [`<button id="line-unclaimed" data-act="unclaimed" class="inert" data-string="F.unclaimed">${esc(t('F.unclaimed'))}</button>`], 'the doors\' act, inert, standing alone in the guest line\'s place, its one form');
    LINE.render(true);
    for (const word of [t('B1.guest-line'), t('F.venue.notebook'), t('F.sign-in'), 'data-act="signin"', 'acting as']) assert.ok(!host.innerHTML.includes(word), `the line names no ${word}: ${host.innerHTML}`);
    press('unclaimed');
    assert.deepEqual([acted, hinted.map(([id, at]) => [id, at?.dataset?.act])], [1, [['L.no-notebook-yet', 'unclaimed']]], 'its press is the next act of a hint standing, then raises the hint saying beginning a notebook isn\'t built yet beside the act pressed (O-HINT\'s)');
    assert.ok(!host.innerHTML.includes('seg transient') && !host.innerHTML.includes(esc(t('L.no-notebook-yet'))), `the line holds no segment for it: ${host.innerHTML}`);
    LINE.act();
    REC.takeBoards({ refused: { kind: 'unreachable', name: 'unreachable', text: 'refused' } });
    const unreached = LINE.actingSegment();
    assert.deepEqual([unreached.state, unreached.forms.length, shown(unreached.forms[0])], [0, 1, `${t('L.boards-unread')} ${t('B1.try-again')}`], 'the board not answering: its words, and "try again", its one form');
    assert.ok(unreached.forms[0].startsWith(`<span data-string="L.boards-unread">${esc(t('L.boards-unread'))}</span> <button id="line-again" data-act="again">`), unreached.forms[0]);
    LINE.render(true);
    press('again');
    assert.deepEqual([again, acted, hinted.length], [1, 2, 1], 'its press reads the list again — the act the app hands in — the next act of a hint standing, raising none');
    REC.takeBoards({ refused: { kind: 'shell', name: 'provider_403', status: 403, text: 'not admitted' } });
    const refused = LINE.actingSegment();
    assert.deepEqual([refused.state, shown(refused.forms[0]), refused.forms[0].includes('data-act')], [0, t('L.boards-unread'), false], 'the provider\'s own refusal: its words, and no retry offered where none may tell');
  } finally {
    LINE.act(); REC.setBoard(was.board); REC.setSession(was.session);
  }
});

test('with no adapter beneath the port the acting-as segment says why none stands as the one entry says it — "port must be a number from 1 to 65535" where the page URL\'s `port` names no port, else no shell and no provider — naming no board, venue, origin or sign-in, none of §3.3\'s states (S-36 (b); FP-35)', async () => {
  const was = { board: REC.board(), session: REC.session() };
  try {
    REC.setSession(null);
    /** the segment where the port answers its own refusal, the list's answer taken as the boot takes it */
    const unreached = async (/** @type {boolean} */ badPort) => { PORT.boot(null, { badPort }); REC.takeBoards(await PORT.boards({})); return LINE.actingSegment(); };
    const bad = await unreached(true);
    assert.deepEqual(bad, { forms: [`<span data-string="L.bad-port">${esc(t('L.bad-port'))}</span>`], name: null, shape: 'L.bad-port', state: 0, words: t('L.bad-port'), alarm: false, signIn: false }, 'the port named no port: its words alone, one form, none of the seven, nothing said assertively');
    const none = await unreached(false);
    assert.deepEqual(none, { forms: [`<span data-string="L.no-adapter">${esc(t('L.no-adapter'))}</span>`], name: null, shape: 'L.no-adapter', state: 0, words: t('L.no-adapter'), alarm: false, signIn: false }, 'no shell and no provider: its words alone, one form');
  } finally {
    // the shared fake's calls given back, its events reaching the port through the subscription the first boot made
    PORT.boot({ ...fake, subscribe() {}, onStream() {} });
    REC.setBoard(was.board); REC.setSession(was.session);
  }
});

test('where no board is held the address display reads "go to an address" alone at every scale — at far, at mid over an account\'s cell, near over the document the walk stands on — naming no board, account or document, so the LEAP box opens empty and no place\'s label is held as named; the segment its one width, its slot, strip and marker empty (issue #215\'s design decision: "The address display shows only \'go to an address\'"; FP-35)', async () => {
  const was = REC.board(), go = t('L.go-to-address');
  const host = { innerHTML: '', setAttribute() {}, addEventListener() {}, querySelectorAll: () => [], contains: () => false };
  LINE.attach(/** @type {any} */ (host), { open() {}, back() {}, forward() {}, trailList() {}, signIn() {} });
  /** the segment as the line renders it: its width in characters and its markup */
  const segment = () => { LINE.render(true); return { width: Number((/--words:(\d+)/.exec(host.innerHTML) || [])[1]), html: (/<span class="address-part"[^]*?<span class="marker[^"]*"[^>]*>[^<]*<\/span><\/span>/.exec(host.innerHTML) || [''])[0] }; };
  try {
    await WALK.focusTo(D, 15);
    over(D, 14 / STANDARD_FS);
    const held = segment();
    REC.takeBoards({ result: [] });
    /** @type {Array<[string, () => void]>} each scale, and where the camera stands at it */
    const scales = [['far', () => CAM.set(CAM.viewForCell(boardCell('1'), 0.92))], ['mid, over an account\'s cell', () => over(D, MID)], ['near, over the document the walk stands on', () => over(D, 14 / STANDARD_FS)]];
    for (const [where, stand] of scales) {
      stand();
      assert.deepEqual(LINE.addressDisplay(), { text: go, place: go, label: [], slot: 0, addr: '', doc: null, pos: null, member: null, whole: false, strip: false, window: null }, `${where}: "go to an address" alone`);
      assert.equal(LINE.currentAddress(), '', `${where}: the LEAP box opens empty`);
      assert.deepEqual(LINE.named(), { board: '', account: null, doc: null }, `${where}: no place named`);
      const s = segment();
      assert.equal(s.width, held.width, `${where}: the segment as wide as with a board`);
      assert.ok(s.html.includes(`<b>${esc(go)}</b><span class="label"><span class="lead-in"></span></span></button><span class="slot"><b class="pos" style="width:0ch"></b><span class="strip none" aria-hidden="true"></span></span><span class="marker none"`), `${where}: its words alone, label, slot, strip and marker empty: ${s.html}`);
    }
  } finally { REC.setBoard(was); }
});

test('the session\'s own `writes` decides the acting-as segment: the keyless session reads state 3\'s words over any key store, a session that writes reads state 2 with the label of the key it is opened with — each naming no origin, the board the person\'s own notebook (foundations §3.1, §3.3 state 2: "THE LOOPBACK ORIGIN … DROPPED"; E16 (a′); issue #445\'s design decision: "Your own notebook\'s segment shows no origin")', () => {
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
      const seg = LINE.actingSegment(), html = seg.forms.join('');
      assert.deepEqual([seg.state, seg.words, seg.forms.length, seg.name], [3, t('F.keyless-session', { account: '1.0.1' }), 1, null], `the keyless session over ${holds}: state 3's words, kept whole in its one form`);
      assert.equal(seg.words, 'reading as 1.0.1 with no key — local trust; writing needs your key · on your LOCAL notebook', `over ${holds}: foundations §3.1's words, no origin after the venue`);
      assert.deepEqual([html.includes('data-string="F.keyless-session"'), html.includes('F.acting-as'), html.includes('key present on this device'), html.includes('data-act="signin"'), html.includes(O)], [true, false, false, false, false], `over ${holds}: no acting-as, no key claimed, no sign-in, no origin`);
    }
    /** @type {Array<[ReturnType<typeof key>[], string, string]>} each key store, the label of the key the session is opened with, and what the store holds */
    const signed = [[[elsewhere, here], 'dev-notebook', 'the key bound here for its principal, after one bound at another board'], [[elsewhere], 'other-board', 'the store\'s one key, bound at another board alone']];
    for (const [store, label, holds] of signed) {
      REC.takeKeyStore(store, O);
      REC.setSession({ session: 's-3', principal: 1, account: '1.0.1', writes: true });
      const seg = LINE.actingSegment();
      assert.deepEqual([seg.state, seg.words], [2, t('F.acting-as', { account: '1.0.1', N: 1, 'device label': label })], `a session that writes over ${holds}: state 2, naming ${label}`);
      assert.equal(seg.words, `acting as 1.0.1 (principal 1) on your LOCAL notebook · ${label} · key present on this device`, `over ${holds}: foundations §3.3 state 2's words, no origin`);
      assert.ok(seg.forms[0].includes(`<span class="slot" data-slot="label" role="img" aria-label="${esc(t('L.slot.named', { role: t('L.slot.device-label'), shows: label }))}">${esc(label)}</span>`), `over ${holds}: the device label's slot, named by its role and its label`);
      assert.ok(!seg.forms.join('').includes(O), `over ${holds}: no form names the origin`);
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
      assert.deepEqual([seg.state, seg.words], [2, t('F.acting-as', { account: '1.0.1', N: 1, 'device label': t(id) })], `${holds}: state 2, its slot saying "${t(id)}"`);
      assert.ok(seg.forms[0].includes(`<span class="slot" data-slot="label" data-string="${id}" role="img" aria-label="${esc(t('L.slot.named', { role: t('L.slot.device-label'), shows: t(id) }))}">${esc(t(id))}</span>`), `${holds}: the slot carries its cause's string and its name: ${seg.forms[0]}`);
      const said = [...seg.forms, seg.words, seg.name ? t(seg.name.id, seg.name.values) : ''];
      assert.ok(!said.some((x) => /⟨[^⟩]*⟩/.test(x)), `${holds}: no ⟨token⟩ in any form, its words or the act's name`);
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

test('a reading scene\'s close is said after it until the next act (issue #50\'s design decision: "After a close, the one line says \'side by side closed — forward › reopens it\' until the next act. It shows in full once a session, and after that as forward ›\'s label"): the first close of the page\'s session whole, a transient segment said through the status region; each after it as forward ›\'s title and accessible name, its visible words unchanged, nothing said; each gone at the next act — a press of one of the line\'s own acts among them, which is made; and whole again after a change of the page\'s class', () => {
  /** the closes N-GO has counted, as the reader the app hands in answers them */
  let closes = 0, forwarded = 0;
  /** @type {{click: ((ev: any) => void) | null}} the line's click listener, as it attaches */
  const on = { click: null };
  const el = { innerHTML: '', setAttribute() {}, addEventListener(/** @type {string} */ type, /** @type {(ev: any) => void} */ fn) { if (type === 'click') on.click = fn; }, querySelectorAll: () => [], contains: () => false };
  FOCUS.attach({ live: /** @type {any} */ (live) });
  LINE.attach(/** @type {any} */ (el), { open() {}, back() {}, forward() { forwarded++; }, trailList() {}, signIn() {}, closed: () => closes });
  const words = t('L.scene.closed'), seg = `<span class="seg transient" data-string="L.scene.closed">${addressedHTML(words)}</span>`;
  const forward = (/** @type {boolean} */ says) => `<button data-act="forward" disabled${says ? ` title="${esc(words)}" aria-label="${esc(words)}"` : ''}>${esc(t('F.forward'))}</button>`;
  LINE.render(true);
  assert.ok(!el.innerHTML.includes('L.scene.closed') && el.innerHTML.includes(forward(false)), 'no close: nothing said');
  live.textContent = '';
  closes = 1; LINE.render();
  assert.ok(el.innerHTML.includes(seg) && el.innerHTML.includes(forward(false)), `the first close of the session: whole, in a segment of its own: ${el.innerHTML}`);
  assert.equal(live.textContent, words, 'said through the status region');
  LINE.act();
  assert.ok(!el.innerHTML.includes('L.scene.closed'), 'the next act takes it down');
  live.textContent = '';
  closes = 2; LINE.render();
  assert.ok(el.innerHTML.includes(forward(true)) && !el.innerHTML.includes(seg), `the next close: forward ›'s label, its visible words unchanged: ${el.innerHTML}`);
  assert.equal(live.textContent, '', 'nothing said');
  on.click?.({ type: 'click', detail: 1, target: { closest: () => ({ dataset: { act: 'forward' } }) }, stopPropagation() {} });
  assert.deepEqual([el.innerHTML.includes(forward(false)), forwarded], [true, 1], 'a press on forward › is the next act: the label taken down, the act made');
  closes = 3; LINE.render();
  assert.ok(el.innerHTML.includes(forward(true)), 'a close after it: the label again');
  LINE.classChanged();
  assert.ok(el.innerHTML.includes(forward(false)), 'a change of the page\'s class takes the label down');
  closes = 4; LINE.render();
  assert.ok(el.innerHTML.includes(seg) && el.innerHTML.includes(forward(false)), 'the first close of the new session: whole again');
  LINE.act();
});

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
  // the page's place on its board's feed, and nothing written there while the session was out
  REC.reachFeed(3);
  script[FAKE.keyOf('changes', { session: 's-11', since: 3 })] = { result: { entries: [], next: 3, head: 3 } };
  const call = fake.hold('session', { board: 'b-1' });
  fake.fire('session-died', { session: s.session, reason: { arm: 'restart', reopened: false } });
  assert.deepEqual(LINE.actingSegment(), was, 'within the first second: as it stood');
  ctx.mock.timers.tick(PUMP.RECONNECTING_MS);
  const back = LINE.actingSegment();
  assert.deepEqual([back.state, back.words, back.alarm], [2, t('L.reconnecting', { account: '1.0.1' }), false], 'past it: reconnecting, the session\'s state kept');
  assert.deepEqual([back.forms.length, back.name], [1, null], 'reconnecting keeps its words: one form, no act');
  assert.ok(back.forms[0].includes('data-string="L.reconnecting"') && !back.forms[0].includes('C-137') && !back.forms[0].includes('data-act="signin"'), back.forms[0]);
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
    assert.ok(seg.forms[0].startsWith(`<span class="field"><span data-string="L.reconnect-refused">${tHTML('L.reconnect-refused', { account: '1.0.1' }, { account: 'id' })}</span> ·</span> <span class="field"><span data-string="B1.guest-line">`) && seg.forms[0].includes('data-string="L.session-refused"') && seg.signIn, `boot's guest segment for the refusal after the words, the account in the identifier's face, its sign-in among the line's acts: ${seg.forms[0]}`);
    assert.ok(seg.forms.every((f) => f.includes(`<span data-string="L.reconnect-refused">`) && f.includes('data-string="L.session-refused"')), 'the lead and the refusal keep their words in every form');
    assert.ok(!seg.forms.join('').includes('C-137'), 'never the signed-out words');
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
      assert.deepEqual([seg.state, seg.words, seg.alarm, seg.forms.length, seg.name], [5, guest, true, 1, null], `the ${reason.arm} arm: the death, in the guest line's words whole in the head's place, said assertively`);
      assert.ok(seg.forms[0].startsWith('<span class="field"><span data-string="B1.guest-line">') && seg.signIn && !seg.forms[0].includes('C-137'), `the ${reason.arm} arm, its sign-in among the line's acts: ${seg.forms[0]}`);
    }
    REC.setSession(was);
    REC.sessionDied({ arm: 'closed' });
    const closed = LINE.actingSegment();
    assert.ok(closed.forms.length === 1 && closed.forms[0].startsWith('<span data-string="C-137.signed-out">'), 'the page\'s own close: "signed out", the ending\'s head kept whole (FP-32)');
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
  assert.deepEqual([a.doc, a.pos, a.strip, a.window], [W, null, false, null], 'the document named, no position, no strip and no window');
  LINE.render(true);
  assert.ok(host.innerHTML.includes('<span class="strip none" aria-hidden="true"></span>') && !host.innerHTML.includes('strip-mark'), `no strip and no mark on it: ${host.innerHTML}`);
  await WALK.focusTo(D, 15);
  over(D, 14 / STANDARD_FS);
  LINE.stripAct();
  assert.ok(host.innerHTML.includes('seg transient') && host.innerHTML.includes(esc(REC.textBetween(D, 15, 75))), 'the strip\'s act: the passage\'s words in the transient');
  LINE.classChanged();
  assert.ok(!host.innerHTML.includes('seg transient'), `the change takes the transient down: ${host.innerHTML}`);
});

/**
 * Each form's width as these tests count it, `LINE.fit`'s measure: the address part at the characters its step reserves,
 * 7 px each, with the strip's room and the marker's; every other form 6 px a character of its words, each button in it
 * 12 px more.
 * @param {string[]} forms
 */
const counted = (forms) => forms.map((f) => {
  const reserved = /--words:(\d+)/.exec(f);
  if (reserved) return Number(reserved[1]) * 7 + 76 + 14;
  return f.replace(/<[^>]*>/g, '').replace(/&[a-z0-9#]+;/g, 'x').length * 6 + (f.match(/<button/g) || []).length * 12;
});
/** the separator between two parts of a row */
const SEP = '<span class="sep">│</span>';
/** a part's key, from its markup as the line renders it */
const keyOf = (/** @type {string} */ html) => (html.startsWith('<span class="acts">') ? 'acts' : html.startsWith('<span class="address-part"') ? 'address' : (/class="seg (\w+)/.exec(html) || [])[1] || '?');
/** markup's words as a person reads them: its tags taken out, its characters unescaped */
const plain = (/** @type {string} */ html) => html.replace(/<[^>]*>/g, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&');
/** the line's rows as it renders them, each its parts' markup, and what stands beneath them */
const laidOut = (/** @type {string} */ html) => {
  const [rows, beneath = ''] = html.split('<div class="beneath">');
  return { rows: [...rows.matchAll(/<div class="row">(.*?)<\/div>/g)].map((m) => m[1].split(SEP)), beneath };
};
/** a stand-in for the line's element that keeps its click listener, and the line attached to it */
function clicked(/** @type {Partial<import('./line.js').Acts>} */ more = {}) {
  /** @type {{click: ((ev: any) => void) | null}} */
  const on = { click: null };
  const host = { innerHTML: '', setAttribute() {}, addEventListener(/** @type {string} */ type, /** @type {(ev: any) => void} */ fn) { if (type === 'click') on.click = fn; }, querySelectorAll: () => [], contains: () => false };
  LINE.attach(/** @type {any} */ (host), { open() {}, back() {}, forward() {}, trailList() {}, signIn() {}, ...more });
  /** a press on the line's act named, by a pointer or by a key */
  const press = (/** @type {string} */ act, detail = 1) => on.click?.({ type: 'click', detail, target: { closest: () => ({ dataset: { act } }) }, stopPropagation() {} });
  return { host, press };
}

test('the line\'s layout is the least step whose rows hold its parts at their widths: one row at steps 0 and 1, the acting-as segment whole; one row at step 2, the segment in the first of its compact forms that holds it — its fields giving way in turn, then its short form; else its short form on rows broken between parts, and the address part folded where it is wider than a row (issue #445\'s design decision)', () => {
  /** @type {Record<string, number[]>} each part's width at steps 0 to 4 */
  const w = { acts: [200, 200, 200, 200, 200], address: [400, 280, 280, 280, 240], walk: [180, 180, 180, 180, 180] };
  /** the acting-as segment's width in each of its forms: whole, its principal number gone, its device label gone, short */
  const acting = [500, 420, 340, 150];
  const at = (/** @type {string} */ k, /** @type {0 | 1 | 2 | 3 | 4} */ step, /** @type {number} */ form) => (k === 'acting' ? acting[form] : w[k][step]);
  const keys = ['acts', 'address', 'acting', 'walk'];
  assert.deepEqual(LINE.layoutOf(keys, at, 10, 1310, 4), { step: 0, form: 0, rows: [keys] }, 'every part whole in one row: 200 + 400 + 500 + 180 and three gaps');
  assert.deepEqual(LINE.layoutOf(keys, at, 10, 1300, 4), { step: 1, form: 0, rows: [keys] }, 'ten short: the position its strip alone, the segment whole');
  assert.deepEqual(LINE.layoutOf(keys, at, 10, 1189, 4), { step: 2, form: 1, rows: [keys] }, 'short of the segment whole: its principal number gone');
  assert.deepEqual(LINE.layoutOf(keys, at, 10, 1109, 4), { step: 2, form: 2, rows: [keys] }, 'short of that: its device label gone too');
  assert.deepEqual(LINE.layoutOf(keys, at, 10, 1029, 4), { step: 2, form: 3, rows: [keys] }, 'short of that: its short form');
  assert.deepEqual(LINE.layoutOf(keys, at, 10, 839, 4), { step: 3, form: 3, rows: [['acts', 'address', 'acting'], ['walk']] }, 'further rows, broken between parts, the segment short');
  assert.deepEqual(LINE.layoutOf(keys, at, 10, 300, 4), { step: 3, form: 3, rows: [['acts'], ['address'], ['acting'], ['walk']] }, 'a part a row');
  assert.deepEqual(LINE.layoutOf(keys, at, 10, 279, 4), { step: 4, form: 3, rows: [['acts'], ['address'], ['acting'], ['walk']] }, 'the address part wider than a row: folded');
  // a segment with no compact form — an exception's words — is whole at every step
  const whole = (/** @type {string} */ k, /** @type {0 | 1 | 2 | 3 | 4} */ step) => (k === 'acting' ? 500 : w[k][step]);
  assert.deepEqual(LINE.layoutOf(keys, whole, 10, 1189), { step: 3, form: 0, rows: [['acts', 'address', 'acting'], ['walk']] }, 'one form: no step 2 to take, further rows, the segment whole');
});

test('short of room the line gives way in steps, each keeping the ones before it — the acts first and whole, a guest\'s sign-in among them; then the position its strip alone, still marked; then the acting-as segment\'s fields giving way whole in turn — the principal number, a board only read\'s origin and venue, the device label — then its short form, every form short of the whole one act named and titled by the whole form\'s words, the key\'s glyph hidden from the accessibility tree; then further rows broken only between parts, the segment short, each within its row or a part wider than a row alone on its own; then the address folded, its account in the fold mark\'s place, its board\'s field, its document\'s field, its strip and its marker whole (issues #310, #445\'s design decisions)', async () => {
  const was = REC.session(), { host } = clicked();
  over(D, NEAR);
  await WALK.focusTo(D, 15);
  /** @type {Array<[string, Array<[number, number, number]>]>} who the line acts as, and the rows it is laid out on, each with the step and the acting-as segment's form it reaches there */
  const cases = [
    ['a signed session', [[1300, 0, 0], [1200, 1, 0], [1060, 2, 1], [1000, 2, 2], [800, 2, 3], [600, 3, 3], [280, 4, 3]]],
    ['a guest', [[900, 0, 0], [800, 1, 0], [700, 2, 1], [600, 2, 2], [500, 3, 2], [280, 4, 2]]],
  ];
  try {
    for (const [who, rooms] of cases) {
      if (who === 'a guest') REC.setSession(null);
      const acting = LINE.actingSegment(), name = acting.name ? t(acting.name.id, acting.name.values) : '';
      const label = acting.name ? String(acting.name.values['device label'] ?? '') : '';
      /** each form's words, as the forms run: whole, then each turn given way, then short */
      const words = who === 'a guest'
        ? [`${t('B1.guest-line')} · ${t('F.venue.notebook')}`, t('B1.guest-line'), t('L.guest-line.short')]
        : [`acting as 1.0.1 (principal 1) on your LOCAL notebook · ${label} · key present on this device`, `acting as 1.0.1 on your LOCAL notebook · ${label} · key present on this device`, 'acting as 1.0.1 on your LOCAL notebook · key present on this device', 'as 1.0.1 · LOCAL notebook · '];
      assert.deepEqual([acting.forms.map(plain), name], [words, words[0]], `${who}: its forms' words, the act's name its whole form's`);
      for (const [room, step, form] of rooms) {
        LINE.fit({ room, measure: counted });
        LINE.render(true);
        const { rows, beneath } = laidOut(host.innerHTML), parts = rows.flat(), where = `${who}, a row ${room} px wide`;
        assert.deepEqual([LINE.held()?.step, LINE.held()?.form], [step, form], `${where}: step ${step}, the acting-as segment's form ${form}`);
        assert.deepEqual(rows.map((r) => r.map(keyOf)), LINE.held()?.rows, `${where}: its rows as the layout holds them`);
        assert.equal(beneath, '', `${where}: nothing beneath the line`);
        const [acts, address] = [parts[0], parts.find((p) => keyOf(p) === 'address') || ''];
        assert.ok(keyOf(acts) === 'acts' && ['back', 'forward', 'trail'].every((a) => acts.includes(`data-act="${a}"`)) && acts.includes('data-act="signin"') === (who === 'a guest'), `${where}: the acts first and whole${who === 'a guest' ? ', sign-in among them' : ''}: ${acts}`);
        assert.equal(address.includes('class="pos"'), step < 1, `${where}: the position's words ${step < 1 ? 'stand' : 'gone'}`);
        assert.ok(/<button class="slot" data-act="strip"[^>]*><(b class="pos"[^>]*>[^<]*<\/b><)?span class="strip"><span class="strip-mark"/.test(address), `${where}: the strip whole and marked, the strip's act: ${address}`);
        const part = parts.find((p) => keyOf(p) === 'acting') || '';
        assert.equal(part, form ? `<button class="seg acting" data-act="acting" data-state="${acting.state}" title="${esc(name)}" aria-label="${esc(name)}">${acting.forms[form]}</button>` : `<span class="seg acting" data-state="${acting.state}">${acting.forms[0]}</span>`,
          `${where}: the acting-as segment ${form ? 'compact, its act named by its whole form' : 'whole, no act'}`);
        assert.equal(plain(part), words[form], `${where}: its words in the form held`);
        const glyphs = part.match(/<svg[^>]*>/g) || [];
        assert.deepEqual(glyphs.map((g) => [/class="key( alone)?"/.test(g), g.includes('aria-hidden="true"'), g.includes('class="key alone"')]), who === 'a guest' ? [] : [[true, true, form === 3]],
          `${where}: ${who === 'a guest' ? 'no key\'s glyph' : `the key's glyph drawn, hidden from the accessibility tree${form === 3 ? ', alone' : ', before its words'}`}`);
        for (const row of rows) assert.ok(row.length === 1 || counted(row).reduce((a, b) => a + b, 0) + counted([SEP])[0] * (row.length - 1) <= room, `${where}: a row within its room, or one part alone: ${row.map(keyOf)}`);
        const folded = /<b class="board" data-act="address" aria-hidden="true">1 › <\/b><button class="fold" data-act="fold" title="([^"]*)" aria-label="[^"]*">⋮<\/button><button class="seg address" data-act="address"[^>]*><b> › 1\.0\.1\.0\.3<\/b>/.exec(address);
        assert.equal(!!folded, step === 4, `${where}: ${step === 4 ? 'folded — the board\'s field, the mark in the account\'s place, the document\'s field' : 'unfolded'}: ${address}`);
        if (folded) assert.equal(folded[1], t('L.fold.name', { levels: '1.0.1' }), `${where}: the mark named by the levels it folds`);
        assert.ok(/<span class="marker" data-act="address" aria-hidden="true" title="">○<\/span><\/span>$/.test(address), `${where}: the marker whole, last in the address part`);
      }
    }
  } finally { REC.setSession(was); clicked(); }
});

test('the layout holds until the window changes, the reader acts, or the acting-as segment\'s fields or the daemon\'s form change state: the camera\'s scale changing what the address names and a position ticking move no part, and a walk\'s moment arriving with no room on its row opens beneath the line until the next act places it in a row; the board stopping and running, a halt standing and lifting, the session keyless and the session ended each set it again at once, the segment in the form it has now, nothing beneath (issues #310, #445\'s design decisions: "The layout is also set again when one of these fields changes state")', async () => {
  const daemon = REC.daemon(), health = REC.health(), mode = REC.mode(), was = /** @type {import('../bridge/shapes').SessionOpened} */ (REC.session());
  /** @type {Array<{key: string, words: string}>} what O-FACES' `folded` answers */
  let walks = [];
  const { host } = clicked({ walks: () => walks });
  over(D, NEAR);
  await WALK.focusTo(D, 15);
  /** the rows as rendered, each its parts' keys, and whether anything stands beneath */
  const shown = () => { LINE.render(); const l = laidOut(host.innerHTML); return { rows: l.rows.map((r) => r.map(keyOf)), beneath: l.beneath }; };
  try {
    LINE.fit({ room: 400, measure: counted });
    const held = LINE.held();
    assert.deepEqual(held, { step: 3, form: 3, rows: [['acts'], ['address'], ['acting']] }, 'a part a row, the acting-as segment short');
    over(D, MID);
    assert.deepEqual([shown(), LINE.held()], [{ rows: held?.rows, beneath: '' }, held], 'at mid, the account named: the layout as it stood');
    over(D, NEAR);
    await WALK.focusTo(D, 11);
    assert.deepEqual([shown(), LINE.held()], [{ rows: held?.rows, beneath: '' }, held], 'another position: the layout as it stood');
    walks = [{ key: 'claim|b-1', words: t('L.walk.waits', { walk: 'claim', step: 'name this device' }) }];
    const arrived = shown();
    assert.deepEqual([arrived.rows, LINE.held()], [held?.rows, held], 'a walk\'s moment folded: the rows as they stood');
    assert.ok(arrived.beneath.startsWith('<button class="seg walk"'), `its segment beneath the line: ${host.innerHTML}`);
    LINE.act();
    assert.deepEqual(shown(), { rows: [['acts'], ['address'], ['acting'], ['walk']], beneath: '' }, 'the next act: the walk\'s segment placed in a row of its own');
    walks = [];
    LINE.act();
    /** @type {Array<[string, () => void, {step: number, form: number, rows: string[][]}]>} each change of state, how it is made, and the layout set again at once */
    const changes = [
      ['the board stopped', () => REC.setDaemon('stopped'), { step: 3, form: 3, rows: [['acts'], ['address'], ['acting'], ['daemon']] }],
      ['the board running again', () => REC.setDaemon('running'), { step: 3, form: 3, rows: [['acts'], ['address'], ['acting']] }],
      ['a halt standing', () => REC.setHealth({ ...health, writes: { halted: true } }, mode), { step: 3, form: 3, rows: [['acts'], ['address'], ['acting'], ['daemon']] }],
      ['the halt lifting', () => REC.setHealth({ ...health, writes: { halted: false } }, mode), { step: 3, form: 3, rows: [['acts'], ['address'], ['acting']] }],
      ['the session keyless', () => REC.setSession({ ...was, writes: false }), { step: 3, form: 0, rows: [['acts'], ['address'], ['acting']] }],
      ['the session ended', () => { REC.setSession(was); REC.sessionDied({ arm: 'closed' }); }, { step: 3, form: 0, rows: [['acts'], ['address', 'acting']] }],
    ];
    for (const [change, make, layout] of changes) {
      make();
      const now = shown();
      assert.deepEqual([LINE.held(), now], [layout, { rows: layout.rows, beneath: '' }], `${change}: the layout set again at once, nothing beneath the line`);
    }
  } finally { REC.setDaemon(daemon); REC.setHealth(health, mode); REC.setSession(was); clicked(); }
});

test('a part arriving between settings stands in its place in the line\'s order — a walk\'s folded moment right after the acting-as segment, in that segment\'s row, ahead of the daemon\'s row — where that row\'s room holds it, no row moved (issue #310\'s design decision: "A statement that arrives with no room opens beneath the line")', async () => {
  const daemon = REC.daemon();
  /** @type {Array<{key: string, words: string}>} what O-FACES' `folded` answers */
  let walks = [];
  const { host } = clicked({ walks: () => walks });
  over(D, NEAR);
  await WALK.focusTo(D, 15);
  try {
    REC.setDaemon('stopped');
    LINE.fit({ room: 1000, measure: counted });
    assert.deepEqual(LINE.held(), { step: 3, form: 3, rows: [['acts', 'address', 'acting'], ['daemon']] }, 'the daemon\'s form on a row of its own, the acting-as segment short');
    walks = [{ key: 'claim|b-1', words: t('L.walk.waits', { walk: 'claim', step: 'name this device' }) }];
    LINE.render();
    const l = laidOut(host.innerHTML);
    assert.deepEqual([l.rows.map((r) => r.map(keyOf)), l.beneath, LINE.held()?.rows], [[['acts', 'address', 'acting', 'walk'], ['daemon']], '', [['acts', 'address', 'acting'], ['daemon']]], 'the walk\'s segment after the acting-as segment, in its row; the layout as it stood');
  } finally { REC.setDaemon(daemon); clicked(); }
});

test('short of its whole form the acting-as segment is its act: a press — a pointer\'s, or a key\'s after the next act the key itself made — opens its whole form in its place, still the act its focus is kept on by, in its row where that holds it, else beneath the line; a press while it stands opens it again, never folding it; the next act or a pan takes it down (issue #445\'s design decision: "The whole short segment is one act that opens the full form"; FP-26)', async () => {
  const { host, press } = clicked();
  over(D, NEAR);
  await WALK.focusTo(D, 15);
  try {
    const acting = LINE.actingSegment(), name = acting.name ? t(acting.name.id, acting.name.values) : '';
    const act = (/** @type {number} */ form) => `<button class="seg acting" data-act="acting" data-state="2" title="${esc(name)}" aria-label="${esc(name)}">${acting.forms[form]}</button>`;
    /** the acting-as segment as the line renders it: in a row, or beneath the line */
    const seen = () => { const l = laidOut(host.innerHTML); return { row: l.rows.flat().find((p) => keyOf(p) === 'acting') || null, beneath: l.beneath.replace(/<\/div>$/, '') }; };
    LINE.fit({ room: 800, measure: counted });
    assert.deepEqual(LINE.held(), { step: 2, form: 3, rows: [['acts', 'address', 'acting']] }, 'one row, the segment short');
    assert.deepEqual(seen(), { row: act(3), beneath: '' }, 'its short form, its act');
    press('acting');
    assert.deepEqual(seen(), { row: null, beneath: act(0) }, 'pressed: its whole form, still its act, beneath the line, its row holding no room for it');
    press('acting');
    assert.deepEqual(seen(), { row: null, beneath: act(0) }, 'pressed again: open still');
    LINE.act();
    assert.deepEqual(seen(), { row: act(3), beneath: '' }, 'the next act: its short form again');
    // the app's keydown makes the next act before the key's click reaches the act
    LINE.act(); press('acting', 0);
    assert.deepEqual(seen(), { row: null, beneath: act(0) }, 'Enter: open');
    LINE.panned();
    assert.deepEqual(seen(), { row: act(3), beneath: '' }, 'a pan: its short form again');
    LINE.fit({ room: 600, measure: counted });
    assert.deepEqual(LINE.held(), { step: 3, form: 3, rows: [['acts', 'address'], ['acting']] }, 'a row of its own, the segment short');
    press('acting');
    assert.deepEqual(seen(), { row: act(0), beneath: '' }, 'pressed: its whole form in its place, its own row holding it');
    LINE.act();
  } finally { clicked(); }
});

test('a guest\'s segment gives way as a board only read — its origin and its venue together — then its guest line takes its class word, a refused reconnect\'s lead and the session\'s refusal keeping their words in every form, the act named by its fields whole; where a death this page holds no words for stands the guest line in its head\'s place, it keeps its words whole (issue #445\'s design decision: "A board you only read: its class word … Exceptions keep their words … an ended session\'s head (FP-32)")', () => {
  const was = { board: REC.board(), session: REC.session() }, O = 'http://127.0.0.1:9000';
  /** the segment's forms as a person reads them, and its act's name */
  const read = (/** @type {import('./line.js').Acting} */ a) => [a.state, a.forms.map(plain), a.name ? t(a.name.id, a.name.values) : null];
  try {
    REC.setSession(null);
    REC.takeBoards({ result: [{ board: 'b-1', name: O, origin: O }] });
    const whole = `${t('B1.guest-line')} · ${O} · ${t('F.venue.notebook')}`;
    assert.deepEqual(read(LINE.actingSegment()), [1, [whole, t('B1.guest-line'), t('L.guest-line.short')], whole], 'a guest: the origin and the venue go together, then "guest"; the act named whole');
    REC.setSession(was.session);
    REC.sessionLost({ kind: 'shell', name: 'no_key' });
    const lead = t('L.reconnect-refused', { account: '1.0.1' }), why = t('L.session-refused', { name: 'no_key' });
    assert.deepEqual(read(LINE.actingSegment()), [3, [`${lead} · ${whole} ${why}`, `${lead} · ${t('B1.guest-line')} ${why}`, `${lead} · ${t('L.guest-line.short')} · ${why}`], `${lead} · ${whole} ${why}`],
      'a restart\'s reconnect refused no_key: the lead and the refusal whole in every form, the guest\'s fields giving way between them');
    REC.setSession(was.session); REC.setSessionRefused(null);
    REC.sessionDied({ arm: 'seeded', account: '1.0.1.1', as_of: 9, writer: 'fp-2' });
    assert.deepEqual(read(LINE.actingSegment()), [5, [whole], null], 'a death of an arm with no words here: the guest line whole in the head\'s place, one form, no act');
  } finally { REC.setBoard(was.board); REC.setSession(was.session); REC.setSessionRefused(null); }
});

test('the strip is the strip\'s act, a native button named by the position: a press on it quotes the position and the passage\'s first words, and opens no LEAP box; at step 1, the position its strip alone, its readout opens on it, beneath the line where the last row has no room for it (issue #310\'s design decision: "its readout opens on the strip\'s act"; K-23)', async () => {
  let opened = 0;
  const { host, press } = clicked({ open() { opened++; } });
  // D read whole again, where a test before this one dropped what it held
  await PUMP.loadWhole(D);
  over(D, NEAR);
  await WALK.focusTo(D, 15);
  try {
    LINE.render(true);
    assert.ok(host.innerHTML.includes(`<button class="slot" data-act="strip" title="${t('F.position', { p: 15 })}" aria-label="${t('F.position', { p: 15 })}">`), `a native button, named and titled by the position: ${host.innerHTML}`);
    press('strip');
    const readout = `${t('F.position', { p: 15 })} · ${REC.textBetween(D, 15, 75)}`;
    assert.deepEqual([opened, host.innerHTML.includes(`<span class="seg transient" data-string="strip">${addressedHTML(readout)}</span>`)], [0, true], 'its readout in the transient segment, no LEAP box');
    LINE.act();
    LINE.fit({ room: 1200, measure: counted });
    assert.equal(LINE.held()?.step, 1, 'the position its strip alone');
    LINE.render(true);
    assert.ok(!host.innerHTML.includes('class="pos"') && host.innerHTML.includes('<button class="slot" data-act="strip"'), 'no position\'s words: the strip and its act alone');
    press('strip');
    assert.ok(laidOut(host.innerHTML).beneath.includes(`<span class="seg transient" data-string="strip">${addressedHTML(readout)}</span>`), `the readout on the strip's act, beneath the line: ${host.innerHTML}`);
    press('address');
    assert.deepEqual([opened, host.innerHTML.includes('seg transient')], [1, false], 'the address segment\'s act opens the LEAP box, the next act taking the readout down');
  } finally { clicked(); }
});

test('the fold mark\'s act opens the LEAP box at the account it folds, the address segment\'s at the address named, the board\'s field beside the mark and the version marker bearing the address segment\'s act, both hidden from the accessibility tree, whose name for the segment says the version (issue #310\'s design decision: "The mark opens the address box at those levels")', async () => {
  /** @type {Array<string | undefined>} the addresses the LEAP box was opened at: none where the line names it */
  const at = [];
  const { host, press } = clicked({ open(byKey, a) { at.push(a); } });
  over(D, NEAR);
  await WALK.focusTo(D, 15);
  try {
    LINE.fit({ room: 280, measure: counted });
    LINE.render(true);
    assert.ok(LINE.held()?.step === 4 && host.innerHTML.includes('<b class="board" data-act="address" aria-hidden="true">1 › </b><button class="fold" data-act="fold"'), `folded, the board's field bearing the address segment's act: ${host.innerHTML}`);
    assert.ok(/<span class="marker" data-act="address" aria-hidden="true" title="">○<\/span><\/span>/.test(host.innerHTML), `the version marker bearing the address segment's act, hidden: ${host.innerHTML}`);
    press('fold');
    press('address');
    assert.deepEqual(at, ['1.0.1', undefined], 'the fold mark: the account it folds; the address segment: the address named');
  } finally { clicked(); }
});

/** the board not answering a read: the shell's dial, or the dev provider's fetch, failed */
const UNREACHABLE = { refused: { kind: 'unreachable', name: 'unreachable', text: 'the board is not answering' } };
/** a status region's stand-in that keeps every message said through it, in order (`said`), and how the last was said (`live`) */
function region() {
  /** @type {string[]} */
  const said = [];
  const r = { said, live: '', setAttribute(/** @type {string} */ k, /** @type {string} */ v) { if (k === 'aria-live') r.live = v; } };
  Object.defineProperty(r, 'textContent', { get: () => said[said.length - 1] ?? '', set: (/** @type {string} */ v) => { said.push(v); } });
  return r;
}
/** the line attached to a stand-in element, speaking through a status region that keeps every message (`region`): the element and that region */
function speaking() {
  const host = { innerHTML: '', setAttribute() {}, addEventListener() {}, querySelectorAll: () => [], contains: () => false };
  const live = region();
  FOCUS.attach({ live: /** @type {any} */ (live) });
  LINE.attach(/** @type {any} */ (host), { open() {}, back() {}, forward() {}, trailList() {}, signIn() {} });
  return { host, said: live.said, live };
}
/** a published feed row of an insert at `position` naming the documents `docs` */
const inserting = (/** @type {number} */ position, /** @type {string[]} */ docs) => ({ board: 'b-1', update: { position, at: position, op: 'insert', docs, class: 'published' } });
/** every answer the fake port gives and every step a promise makes taken, while `holds` reads true, at most fifty turns */
async function turns(/** @type {() => boolean} */ holds) { for (let i = 0; i < 50 && holds(); i++) await new Promise((r) => setImmediate(r)); }

// placed last: the death empties the model every test above reads
test('a kept document the line names carries its clause in a segment of its own right after the address segment — an edition\'s "links as last read" at the page\'s clock as the row that left it behind came — and none while the line names no document; the status region says it once as it appears, by its name as the mirror finds it — its first line\'s words, then its address — and once as its read sets it, current and unchanged where the board answered its text as it stood (issues #345, #367, #369)', async (ctx) => {
  // D read whole again, its links among it, where a test before this one dropped what it held
  const unasked = fake.unanswered.length;
  await PUMP.loadWhole(D);
  assert.ok(REC.doc(D).linksRead, 'D\'s links read');
  ctx.mock.timers.enable({ apis: ['setTimeout'] });
  const { host, said, live } = speaking();
  over(D, 14 / STANDARD_FS);
  await WALK.focusTo(D, 15);
  LINE.render(true);
  const from = said.length, name = LAYER.boxName(D).name;
  assert.equal(name, `"Tumbler." ${D}`, 'its name: its first line as the mirror quotes it, then its address');
  const text = fake.hold('op', { frame: F.retrieveV(D, 1, 30) });
  const t0 = Date.now();
  fake.fire('feed', inserting(40, [D]));
  const t1 = Date.now();
  LINE.render();
  assert.ok(!host.innerHTML.includes('seg kept') && said.length === from, 'within the second: no clause, nothing said');
  ctx.mock.timers.tick(PUMP.KEPT_MS);
  const since = /** @type {number} */ (PUMP.kept(D)?.since);
  assert.ok(since >= t0 && since <= t1, 'kept from the row\'s arrival');
  const clause = t('L.kept.links', { when: lastRead(since) });
  LINE.render();
  const seg = `<span class="sep">│</span><span class="seg kept" data-string="L.kept.links">${esc(clause)}</span>`;
  assert.ok(host.innerHTML.includes(`○</span></span>${seg}<span class="sep">│</span><span class="seg acting"`), `beside the address part, before the acting-as segment: ${host.innerHTML}`);
  assert.deepEqual([said.slice(from), live.live], [[t('L.kept.said', { name, clause })], 'polite'], 'said politely as it appears');
  LINE.render(true);
  over(D, MID);
  LINE.render();
  assert.ok(!host.innerHTML.includes('seg kept') && said.length === from + 1, 'said once; the line naming the account: no clause in it, nothing said, the document still kept');
  over(D, 14 / STANDARD_FS);
  text();
  await turns(() => !!PUMP.kept(D));
  LINE.render();
  assert.deepEqual([PUMP.kept(D), host.innerHTML.includes('seg kept'), said.slice(from + 1)], [null, false, [t('L.kept.unchanged', { name })]], 'set: the clause lifted, said once — current, unchanged');
  assert.deepEqual(fake.unanswered.slice(unasked), []);
});

test('a kept document whose read the board does not answer once its clause is said is said still as last read with the failure\'s words, once; its read made again at the daemon\'s running sets it, current and unchanged (issue #369\'s design decision: "A failed read: \'still as last read\', with the failure\'s words")', async (ctx) => {
  const unasked = fake.unanswered.length, key = FAKE.keyOf('op', { frame: F.retrieveV(D, 1, 30) }), answer = script[key];
  await PUMP.loadWhole(D);
  ctx.mock.timers.enable({ apis: ['setTimeout'] });
  const { said } = speaking();
  over(D, 14 / STANDARD_FS);
  await WALK.focusTo(D, 15);
  LINE.render(true);
  const from = said.length, name = LAYER.boxName(D).name;
  const text = fake.hold('op', { frame: F.retrieveV(D, 1, 30) });
  try {
    fake.fire('feed', inserting(41, [D]));
    ctx.mock.timers.tick(PUMP.KEPT_MS);
    LINE.render();
    assert.deepEqual(said.slice(from), [t('L.kept.said', { name, clause: t('L.kept.links', { when: lastRead(/** @type {number} */ (PUMP.kept(D)?.since)) }) })], 'its clause said as it appears');
    script[key] = UNREACHABLE;
    text();
    await turns(() => !PUMP.kept(D)?.met);
    LINE.render();
    LINE.render(true);
    assert.deepEqual(said.slice(from + 1), [t('L.kept.still', { name, reason: t('F.daemon.unreachable') })], 'its text not answered: still as last read, with the failure\'s words, once');
    script[key] = answer;
    fake.fire('daemon', { board: 'b-1', state: 'running' });
    await turns(() => !!PUMP.kept(D));
    LINE.render();
    assert.deepEqual([PUMP.kept(D), said.slice(from + 2)], [null, [t('L.kept.unchanged', { name })]], 'read again at running and set: current, unchanged');
  } finally { script[key] = answer; }
  assert.deepEqual(fake.unanswered.slice(unasked), []);
});

test('documents a row names together are said in one message as their clauses appear — the one nearest the focus, the walk\'s, named and the rest counted, "as last read ⟨when⟩" for them all — and in one as their reads set them, the nearest by what it says and the rest counted by outcome, a document set with other words current and changed (issue #369\'s design decision: "One message per cause. When several documents change together, count them by outcome and name the one nearest the focus")', async (ctx) => {
  const unasked = fake.unanswered.length, textL = F.retrieveV(LONG, 1, LONG_TEXT.length), key = FAKE.keyOf('op', { frame: textL }), answer = script[key];
  await PUMP.loadWhole(D); await PUMP.loadWhole(LONG);
  ctx.mock.timers.enable({ apis: ['setTimeout'] });
  const { said } = speaking();
  await WALK.focusTo(D, 15);
  CAM.set(CAM.viewForCell(accountCell('1.0.1'), 0.85));
  const shown = PUMP.visibleDocs().map((d) => d.addr);
  assert.ok(shown.includes(D) && shown.includes(LONG), `HOME shows both: ${shown}`);
  LINE.render(true);
  // LONG's words other than they stood, over the same extent
  script[key] = { result: { as_of: 2, resp: 'delivery', items: [{ content: LONG_TEXT.replace('Item 1 of', 'Item A of') }] } };
  const holdD = fake.hold('op', { frame: F.retrieveV(D, 1, 30) }), holdL = fake.hold('op', { frame: textL });
  try {
    const from = said.length, named = LAYER.boxName(D).name;
    fake.fire('feed', inserting(42, [D, LONG]));
    ctx.mock.timers.tick(PUMP.KEPT_MS);
    LINE.render();
    const since = /** @type {number} */ (PUMP.kept(D)?.since);
    assert.equal(PUMP.kept(LONG)?.since, since, 'one cause: both kept from the row');
    assert.deepEqual(said.slice(from), [t('L.kept.said', { name: t('L.kept.and-more', { name: named, n: 1 }), clause: t('L.kept.text', { when: lastRead(since) }) })], 'one message as they appear: the walk\'s document named, the other counted');
    holdD();
    await turns(() => !!PUMP.kept(D));
    LINE.render();
    assert.deepEqual([PUMP.kept(D), said.slice(from + 1)], [null, []], 'the walk\'s document set, the other still read: nothing said yet');
    holdL();
    await turns(() => !!PUMP.kept(LONG));
    LINE.render();
    assert.deepEqual(said.slice(from + 1), [`${t('L.kept.unchanged', { name: named })}; ${t('L.kept.changed', { name: t('L.kept.more', { n: 1 }) })}`], 'one message as their reads set them: the walk\'s document current and unchanged, the other counted current and changed');
  } finally { script[key] = answer; }
  assert.deepEqual(fake.unanswered.slice(unasked), []);
});

test('a kept document let go before its reads set it — the view gone from it, a row voiding the read out — is said nothing of as it goes: its clause was said, and nothing set it (issue #369)', async (ctx) => {
  const unasked = fake.unanswered.length;
  await PUMP.loadWhole(D);
  ctx.mock.timers.enable({ apis: ['setTimeout'] });
  const { said } = speaking();
  over(D, 14 / STANDARD_FS);
  await WALK.focusTo(D, 15);
  LINE.render(true);
  const from = said.length, text = fake.hold('op', { frame: F.retrieveV(D, 1, 30) });
  fake.fire('feed', inserting(43, [D]));
  ctx.mock.timers.tick(PUMP.KEPT_MS);
  LINE.render();
  assert.equal(said.length, from + 1, 'its clause said as it appears');
  // the view gone from it, fifty boxes to its left: a second row naming it drops it, voiding the read out
  const b = docBox(D);
  CAM.set({ x: b.x - 50 * b.w, y: b.y + b.h / 2, scale: MID });
  assert.ok(!PUMP.visibleDocs().some((d) => d.addr === D), 'the view shows it no more');
  fake.fire('feed', inserting(44, [D]));
  text();
  await turns(() => !!PUMP.kept(D));
  LINE.render();
  assert.deepEqual([PUMP.kept(D), PUMP.liftOf('doc', D), said.slice(from + 1)], [null, null, []], 'let go unset: nothing set it, nothing said');
  await PUMP.loadWhole(D);
  assert.deepEqual(fake.unanswered.slice(unasked), []);
});

test('while the board lags past a second the line carries its clause in the kept segment wherever it names no kept document — nearer naming a document not kept, at mid naming an account, at far naming the board — said politely once as it appears, the board by its mirror item\'s name, and once as the catch-up\'s rows are taken, current and unchanged where the catch-up read none (issues #367, #369)', async (ctx) => {
  const from = Math.max(REC.feedAt() ?? 0, 60), unasked = fake.unanswered.length, session = /** @type {{session: string}} */ (REC.session()).session;
  REC.reachFeed(from);
  script[FAKE.keyOf('changes', { session, since: from })] = { result: { entries: [], next: from, head: from } };
  ctx.mock.timers.enable({ apis: ['setTimeout'] });
  const { host, said, live } = speaking();
  over(D, 14 / STANDARD_FS);
  await WALK.focusTo(D, 15);
  LINE.render(true);
  const told = said.length, name = t('L.mirror.board.name', { node: '1', origin: '' });
  fake.drop();
  LINE.render();
  assert.ok(!host.innerHTML.includes('seg kept') && said.length === told, 'within the second: no clause, nothing said');
  ctx.mock.timers.tick(PUMP.KEPT_MS);
  const clause = t('L.kept.text', { when: lastRead(/** @type {number} */ (PUMP.boardKept()?.since)) });
  const seg = `<span class="sep">│</span><span class="seg kept" data-string="L.kept.text">${esc(clause)}</span>`;
  /** @type {Array<[string, () => void]>} */
  const scales = [['nearer, a document not kept', () => over(D, 14 / STANDARD_FS)], ['mid, an account', () => over(D, MID)], ['far, the board', () => CAM.set(CAM.viewForCell(boardCell('1'), 0.92))]];
  for (const [where, at] of scales) {
    at();
    LINE.render();
    assert.ok(host.innerHTML.includes(`○</span></span>${seg}<span class="sep">│</span><span class="seg acting"`), `${where}: the board's clause beside the address part — ${host.innerHTML}`);
  }
  assert.deepEqual([said.slice(told), live.live], [[t('L.kept.said', { name, clause })], 'polite'], 'said politely once as it appears, the board by its mirror item\'s name');
  fake.reopen();
  await turns(() => !!PUMP.boardKept());
  LINE.render();
  assert.deepEqual([PUMP.boardKept(), host.innerHTML.includes('seg kept'), said.slice(told + 1)], [null, false, [t('L.kept.unchanged', { name })]], 'the catch-up\'s rows taken, none read: the clause lifted, said once — current, unchanged');
  assert.deepEqual(fake.unanswered.slice(unasked), []);
});

test('a change of the page\'s class is said once, as the reads it asked answer: the ending\'s words, then the documents it covered — never the ending alone first, and nothing while they read; a document the view stood on, read again at the new class past a second, is said nothing of as its clause appears or lifts, the change\'s own message speaking for its cause (issues #177, #369: "One status message says the session ended and what is covered")', async () => {
  const DR = '1.0.1.0.6', flush = () => new Promise((r) => setTimeout(r, 0));
  const host = { innerHTML: '', setAttribute() {}, addEventListener() {}, querySelectorAll: () => [] };
  FOCUS.attach({ live: /** @type {any} */ (live) });
  LINE.attach(/** @type {any} */ (host), { open() {}, back() {}, forward() {}, trailList() {}, signIn() {} });
  // the one line told of the change as the app tells it, with the change's stamp
  PUMP.start({ onDirty: () => {}, onDrop: (x) => { if (!x.addrs) LINE.classChanged(x.at); } });
  const was = REC.session();
  await PUMP.loadWhole(D);
  // a draft the session read, in view at HOME beside the edition; the guest's listing the edition alone, the draft withheld from the guest
  REC.takeSpanSet(DR, [{ subspace: 1, ordinal: 1, positions: 12 }]);
  script[FAKE.keyOf('op', { frame: F.retrieveDocVSpanSet(DR) })] = { refused: { kind: 'refused', name: 'withheld', code: 'withheld' } };
  script[FAKE.keyOf('places', { board: 'b-1' })] = { result: { docs: [{ doc: D, kind: 'edition', label: 'd', standing: 'public' }], counts: [{ account: '1.0.1', documents: 1 }], state: { arm: 'complete' } } };
  CAM.set(CAM.viewForCell(accountCell('1.0.1'), 0.85));
  LINE.render(true);
  live.textContent = '';
  const listing = fake.hold('places', { board: 'b-1' }), text = fake.hold('op', { frame: F.retrieveV(D, 1, 30) });
  try {
    fake.fire('session-died', { session: /** @type {{session: string}} */ (was).session, reason: { arm: 'closed' } });
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
    await new Promise((r) => setTimeout(r, PUMP.KEPT_MS + 20));
    LINE.render();
    assert.deepEqual([!!LAYER.keptIn(D), live.textContent], [true, ''], 'the edition read again at the guest\'s class past a second: its clause stands, nothing said of it');
    text();
    for (let i = 0; i < 20 && PUMP.kept(D); i++) await flush();
    LINE.render();
    assert.deepEqual([PUMP.kept(D), live.textContent], [null, ''], 'set: nothing said of it either');
  } finally { text(); REC.setSession(was); }
});
