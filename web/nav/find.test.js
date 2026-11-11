// N-FIND's test against the fake port, on stand-ins of its box's elements
// whose focus lands where the platform's would: a match is found anywhere in
// a content run, case ignored, by its bytes, and never across an item;
// Mod+F at a document opens the find there, its field taking the focus, and
// reads the rest of the text once, each part searched as it lands — "so far"
// until every part is in — and never again per keystroke; a move takes the
// camera to the match, outlined alone as the arrival, the first pushing one
// trail entry its later moves share, so Back returns to where find opened;
// Esc leaves the match selected, the walk and the focus on it and the camera
// still — in a draft holding typed text, the match selected where it was
// found in the text shown and the walk on its span in the model's text; in
// a text holding typed words every move's walk and trail entry standing in
// the model's text and its outline in the text shown; a
// miss names the document and the version searched and the withheld
// text it did not search; a part the board will not give is said, with why;
// each answer is said once; off any document the one line says where words
// are found; Mod+G steps the find where it stands, and opens it where nothing
// steps; a move to another place ends it and a return reopens it as left; and
// a change of the page's class drops what it measured, its text typed kept;
// in a draft holding typed words it searches the text shown, a match in the
// typed words held by the page's identity of its bytes
// (B2-S5; D5 K-91; issue #222's design decision; FP-6, FP-20, FP-21, FP-25,
// FP-29, FP-36).
import { test, before, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import * as PORT from '../bridge/port.js';
import * as REC from '../model/records.js';
import * as WRITE from '../write/write.js';
import * as PUMP from '../model/pump.js';
import * as F from '../model/frames.js';
import * as FAKE from '../test/fake-port.js';
import * as CAM from '../plane/camera.js';
import * as LAYER from '../text/layer.js';
import * as HOST from '../overlays/host.js';
import * as SEL from '../overlays/selection.js';
import * as TRAIL from './trail.js';
import * as WALK from './walk.js';
import * as KEYS from './keys.js';
import * as GO from './go.js';
import * as FOCUS from './focus.js';
import * as FIND from './find.js';
import { t } from '../strings.js';
import { whyOf } from '../beams/held.js';

/** the platform's document: its focus — the body where it stands on nothing */
const body = { id: 'the body' };
globalThis.document = /** @type {any} */ ({ body, activeElement: body });
globalThis.HTMLElement = /** @type {any} */ (class {});
globalThis.window = /** @type {any} */ ({ addEventListener() {}, getSelection: () => null });

/**
 * A stand-in element: its listeners kept by type, its focus landing it the
 * platform's, an input's selection read back.
 * @param {string} id
 * @param {{field?: boolean}} [o]
 */
function element(id, o = {}) {
  /** @type {Record<string, Array<(ev: any) => void>>} */
  const on = {};
  const e = {
    id, value: '', innerHTML: '', textContent: '', isConnected: true, style: { transform: '' }, offsetWidth: 0, offsetHeight: 0, selected: /** @type {[number, number] | null} */ (null), attrs: /** @type {Record<string, string>} */ ({}),
    classList: { set: new Set(), add(/** @type {string} */ c) { this.set.add(c); }, remove(/** @type {string} */ c) { this.set.delete(c); } },
    addEventListener(/** @type {string} */ type, /** @type {(ev: any) => void} */ fn) { (on[type] ||= []).push(fn); },
    fire(/** @type {string} */ type, /** @type {any} */ ev = {}) { for (const fn of on[type] || []) fn(ev); },
    setAttribute(/** @type {string} */ k, /** @type {string} */ v) { e.attrs[k] = v; },
    getAttribute(/** @type {string} */ k) { return e.attrs[k] ?? null; },
    removeAttribute(/** @type {string} */ k) { delete e.attrs[k]; },
    focus() { globalThis.document.activeElement = /** @type {any} */ (e); },
    blur() { if (globalThis.document.activeElement === /** @type {any} */ (e)) globalThis.document.activeElement = /** @type {any} */ (body); },
    select() { e.selected = [0, e.value.length]; },
    /** @type {(x: unknown) => boolean} */ contains: (x) => x === e,
    matches: (/** @type {string} */ sel) => !!o.field && sel.split(',').map((s) => s.trim()).includes('input'),
    querySelectorAll: () => [],
  };
  return e;
}

/** the find's box and its parts; the walk's element; the status region, keeping what it was told */
const input = element('the find\'s field', { field: true }), count = element('the count'), prev = element('previous'), next = element('next'), note = element('the note');
const box = element('the find\'s box');
box.contains = (x) => [box, input, count, prev, next, note].includes(/** @type {any} */ (x));
const walkEl = element('the walk\'s element');
/** @type {string[]} */
const said = [];
const live = { setAttribute() {}, set textContent(/** @type {string} */ v) { said.push(v); }, get textContent() { return said[said.length - 1] ?? ''; } };

const D = '1.0.1.0.3', E = '1.0.1.0.4', W = '1.0.1.0.5';
/** D's text: three "tumbler"s, the third past what the page holds as find opens, one "é" before it */
const HEAD = 'Tumbler. An address names a place.\n\nThe tumbler is read from its first field.\n\n';
const REST = 'Café notes.\n\nA last TUMBLER stands here.\n';
const TEXT = HEAD + REST;
const bytes = (/** @type {string} */ s) => new TextEncoder().encode(s).length;
const N = bytes(TEXT), HELD = bytes(HEAD);
/** E's text: its first half held, the rest refused by a name that says nothing of it */
const E_HEAD = 'A note on a tumbler.\n\n', E_REST = 'And a tumbler again.\n', E_N = bytes(E_HEAD + E_REST), E_HELD = bytes(E_HEAD);
/** W's text: a withheld run between two content runs, "tum" before it and "bler" after it */
const W_A = 'Before the gap, tum', W_B = 'bler after it.\n', W_GAP = 40, W_N = bytes(W_A) + W_GAP + bytes(W_B);

/** the reads each document answers: its extent, its metadata, and the part of its text find reads past what is held */
const meta = (/** @type {string} */ doc, /** @type {boolean} */ published) => ({ [FAKE.keyOf('op', { frame: F.docMetadata(doc) })]: { result: { as_of: 1, resp: 'doc_metadata', doc, published, owner: '1.0.1', birth: null, birth_extent: null, placed: null, base_extent: null, source: null } } });
const spanSet = (/** @type {string} */ doc, /** @type {number} */ n) => ({ [FAKE.keyOf('op', { frame: F.retrieveDocVSpanSet(doc) })]: { result: { as_of: 1, resp: 'span_set', set: [{ start: '1.1', width: '0.' + n }] } } });
const REST_READ = F.retrieveV(D, HELD + 1, N - HELD), E_REST_READ = F.retrieveV(E, E_HELD + 1, E_N - E_HELD);
const script = {
  ...spanSet(D, N), ...meta(D, true), ...spanSet(E, E_N), ...meta(E, false), ...spanSet(W, W_N), ...meta(W, true),
  [FAKE.keyOf('op', { frame: REST_READ })]: { result: { as_of: 2, resp: 'delivery', items: [{ content: REST }] } },
  [FAKE.keyOf('op', { frame: E_REST_READ })]: { refused: { kind: 'refused', name: 'bad_region', code: 'bad_region' } },
};

/** @type {ReturnType<typeof FAKE.create>} */
let fake;
/** a key as the platform delivers it */
const keyOf = (/** @type {string} */ key, /** @type {{metaKey?: boolean, ctrlKey?: boolean, shiftKey?: boolean}} */ mods = {}) => /** @type {any} */ ({ type: 'keydown', key, keyCode: 0, isComposing: false, metaKey: false, ctrlKey: false, shiftKey: false, altKey: false, target: walkEl, preventDefault() {}, stopPropagation() {}, ...mods });
/** the platform's command modifier (D5 §0) */
const MOD = KEYS.MAC ? { metaKey: true } : { ctrlKey: true };
const PLANE = /** @type {const} */ ({ where: 'plane', byKey: true });
/** text typed into the find's field, as the platform hands it */
const type = (/** @type {string} */ s) => { input.value = s; input.fire('input'); };
/** a key pressed in the find's field */
const inField = (/** @type {string} */ key, /** @type {{shiftKey?: boolean, metaKey?: boolean, ctrlKey?: boolean}} */ mods = {}) => box.fire('keydown', { ...keyOf(key, mods), target: input });
/** every read and flight let land */
async function settle() { for (let i = 0; i < 80; i++) { await new Promise((r) => setTimeout(r, 0)); if (CAM.flying()) CAM.step(Infinity); } FIND.refresh(); }
/** the text reads the board was asked for a document, each [first position, positions] */
const textReads = (/** @type {string} */ doc) => fake.asked.filter((k) => k.includes('"op":"retrieve_v"') && k.includes(`"doc":"${doc}"`)).map((k) => { const sp = JSON.parse(k.slice(3)).specs[0].span; return [Number(sp.start.split('.').pop()), Number(sp.width.split('.').pop())]; });
/** two views the same, within a flight's last step's rounding */
const same = (/** @type {{x: number, y: number, scale: number}} */ a, /** @type {{x: number, y: number, scale: number}} */ b) => [a.x - b.x, a.y - b.y, a.scale - b.scale].every((d, i) => Math.abs(d) <= 1e-9 * Math.max(1, Math.abs([b.x, b.y, b.scale][i])));

before(async () => {
  REC._reset(); WRITE._reset(); TRAIL._reset();
  const hostEl = { className: '', innerHTML: '', style: {}, setAttribute() {}, removeAttribute() {}, addEventListener() {}, querySelector: () => null, querySelectorAll: () => [], getBoundingClientRect: () => ({ left: 0, top: 0, width: 0, height: 0 }), contains: () => false };
  HOST.attach(/** @type {any} */ (hostEl), /** @type {any} */ ({ ...hostEl, style: {} }));
  fake = FAKE.create(script);
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {}, shown: GO.shownIn, finding: FIND.searched });
  WALK.readers({ located: () => GO.backLight(), described: () => GO.described(), shown: GO.shownIn });
  LAYER.readers({ shown: GO.shownIn, atop: FIND.atop });
  FIND.attach(/** @type {any} */ ({ box, input, count, prev, next, note }));
  FOCUS.attach({ home: () => /** @type {any} */ (walkEl), live: /** @type {any} */ (live) });
  REC.setBoard({ board: 'b-1', name: '', origin: '' }); REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  REC.takeIndex(/** @type {any} */ ({ docs: [D, E, W].map((doc) => ({ doc, kind: doc === E ? 'draft' : 'edition', label: null, standing: 'public' })), counts: [{ account: '1.0.1', documents: 3 }], state: { arm: 'complete' } }));
  CAM.setViewport(1440, 900);
  await GO.launch();
});

beforeEach(async () => {
  if (FIND.isOpen()) await FIND.close();
  for (const [doc, n, runs] of /** @type {Array<[string, number, import('../model/frames.js').Run[]]>} */ ([
    [D, N, [{ pos: 1, width: HELD, kind: 'content', text: HEAD, ref: null, origin: null }]],
    [E, E_N, [{ pos: 1, width: E_HELD, kind: 'content', text: E_HEAD, ref: null, origin: null }]],
    [W, W_N, [{ pos: 1, width: bytes(W_A), kind: 'content', text: W_A, ref: null, origin: null }, { pos: 1 + bytes(W_A), width: W_GAP, kind: 'withheld', text: '', ref: null, origin: '1.0.2.0.1' }, { pos: 1 + bytes(W_A) + W_GAP, width: bytes(W_B), kind: 'content', text: W_B, ref: null, origin: null }]],
  ])) {
    REC.invalidate(doc);
    REC.takeSpanSet(doc, [{ subspace: 1, ordinal: 1, positions: n }]);
    REC.takeDelivery(doc, runs, 1);
  }
  SEL.clear(); GO.endArrival(); input.value = ''; said.length = 0;
});

/** stand at a document's first span at its reading size, the walk's element holding the focus */
async function standAt(/** @type {string} */ doc) {
  const done = GO.leapTo(doc, { pos: 1, how: 'leap', byKey: true });
  for (let i = 0; i < 80; i++) { await new Promise((r) => setTimeout(r, 0)); if (CAM.flying()) CAM.step(Infinity); }
  await done;
  walkEl.focus();
}

test('a match is the typed text anywhere in a content run, case ignored, placed by its bytes; none joins text across a withheld run or an atom, and matches in a run do not overlap', () => {
  /** @type {import('../model/frames.js').Run[]} */
  const runs = [
    { pos: 1, width: bytes('Café TUMBLER, tumbler.'), kind: 'content', text: 'Café TUMBLER, tumbler.', ref: null, origin: null },
    { pos: 1 + bytes('Café TUMBLER, tumbler.'), width: 7, kind: 'withheld', text: '', ref: null, origin: '1.0.2.0.1' },
    { pos: 8 + bytes('Café TUMBLER, tumbler.'), width: 1, kind: 'atom', text: '{"type":"tumbler"}', ref: null, origin: null },
    { pos: 9 + bytes('Café TUMBLER, tumbler.'), width: 4, kind: 'content', text: 'aaaa', ref: null, origin: null },
  ];
  assert.deepEqual(FIND.matchesIn(runs, 'tumbler'), [{ pos: 7, width: 7 }, { pos: 16, width: 7 }], 'both cases; "é" two bytes, so the first stands at its byte 7');
  assert.deepEqual(FIND.matchesIn(runs, 'é t'), [{ pos: 4, width: 4 }], 'a match\'s width is its bytes');
  assert.deepEqual(FIND.matchesIn(runs, '.aa'), [], 'no match across the withheld run and the atom, whose words are no text of the document');
  const after = 9 + bytes('Café TUMBLER, tumbler.');
  assert.deepEqual(FIND.matchesIn(runs, 'aa'), [{ pos: after, width: 2 }, { pos: after + 2, width: 2 }], 'matches do not overlap');
  assert.deepEqual(FIND.matchesIn(runs, ''), [], 'nothing typed matches nothing');
});

test('Mod+F at a document opens the find there, its field taking the focus — the browser\'s find never runs — and reads the rest of the text once, searching each part as it lands; typing reads nothing again (FP-6; B2-S5\'s one read at open)', async () => {
  await standAt(D);
  const before = textReads(D).length;
  assert.equal(await KEYS.dispatch(keyOf('f', MOD), PLANE), true, 'taken');
  assert.deepEqual([FIND.isOpen(), FIND.stands()?.addr, globalThis.document.activeElement === /** @type {any} */ (input)], [true, D, true], 'open at D, its field holding the focus');
  await settle();
  assert.deepEqual(textReads(D).slice(before), [[HELD + 1, N - HELD]], 'one read of what the page lacked');
  assert.equal(REC.textBetween(D, 1, N + 1), TEXT, 'the model holds what the find read');
  type('t'); type('tu'); type('tumbler');
  await settle();
  assert.deepEqual(textReads(D).length, before + 1, 'no read per keystroke');
  const s = FIND.stands();
  assert.deepEqual(s && s.matches, [{ pos: 1, width: 7 }, { pos: 1 + bytes('Tumbler. An address names a place.\n\nThe '), width: 7 }, { pos: HELD + 1 + bytes('Café notes.\n\nA last '), width: 7 }], 'every match in the whole text, the one past what was held among them');
  assert.equal(s && s.count, t('B2.find.count', { k: 1, n: 3 }), 'every part in: "1 of 3"');
});

test('while a part is out the count is a bound — "≥ ⟨n⟩ so far" with the parts line — and once it lands, "⟨k⟩ of ⟨n⟩"; the status region says each answer once', async () => {
  await standAt(D);
  const release = fake.hold('op', { frame: REST_READ });
  await KEYS.dispatch(keyOf('f', MOD), PLANE);
  type('tumbler');
  await new Promise((r) => setTimeout(r, 0));
  FIND.refresh();
  const out = FIND.stands();
  assert.deepEqual(out && [out.reading, out.count, out.clauses], [true, t('B2.find.so-far', { n: 2 }), [t('B2.find.reading')]], 'two in hand, the rest still out');
  release();
  await settle();
  const s = FIND.stands();
  assert.deepEqual(s && [s.reading, s.count, s.clauses], [false, t('B2.find.count', { k: 1, n: 3 }), []]);
  const answers = said.filter((w) => w.startsWith('≥') || /^\d+ of \d+/.test(w));
  assert.deepEqual(answers, [[t('B2.find.so-far', { n: 2 }), t('B2.find.reading')].join(' · '), t('B2.find.count', { k: 1, n: 3 })], 'each answer said once, as its words changed');
});

test('each move takes the camera to the match at the reading size, outlined alone as the arrival with the walk on its span; the first pushes one trail entry and the moves after it share it, wrapping, so Back returns to where find opened (FP-21, FP-25)', async () => {
  await standAt(D);
  const at = TRAIL.length(), opened = TRAIL.current();
  await KEYS.dispatch(keyOf('f', MOD), PLANE);
  await settle();
  type('tumbler');
  await settle();
  const m = FIND.stands()?.matches ?? [];
  assert.deepEqual([TRAIL.length(), GO.arrivalMark()], [at + 1, { addr: D, pos: m[0].pos, runs: [m[0]], link: null }], 'typing\'s move: one entry pushed, the match outlined');
  inField('Enter');
  await settle();
  assert.deepEqual([TRAIL.length(), GO.arrivalMark()?.runs, FIND.stands()?.count], [at + 1, [m[1]], t('B2.find.count', { k: 2, n: 3 })], 'Enter: the next, no entry pushed, the outline moved');
  assert.ok(same(CAM.view(), GO.viewFor(D, m[1].pos)), 'the camera at the match\'s view at the reading size');
  assert.deepEqual(WALK.current() && [WALK.current()?.kind, WALK.current()?.addr], ['block', D], 'the walk on its span');
  inField('Enter'); await settle(); inField('Enter'); await settle();
  assert.deepEqual([FIND.stands()?.current, TRAIL.length()], [0, at + 1], 'past the last, round to the first; still one entry');
  inField('Enter', { shiftKey: true }); await settle();
  assert.equal(FIND.stands()?.current, 2, 'Shift+Enter: the previous, round to the last');
  GO.back(true); await settle();
  assert.equal(TRAIL.current(), opened, 'Back: where find opened');
  assert.equal(FIND.isOpen(), true, 'a move that stays in its document keeps the find');
});

test('Esc closes the find with its match selected, the walk and the focus on it and the camera still; with no match standing, the focus goes back as any region\'s close returns it (FP-20)', async () => {
  await standAt(D);
  await KEYS.dispatch(keyOf('f', MOD), PLANE);
  await settle();
  type('tumbler'); await settle();
  inField('Enter'); await settle();
  const m = FIND.stands()?.matches[1], view = CAM.view();
  walkEl.blur(); input.focus();
  inField('Escape');
  await settle();
  assert.equal(FIND.isOpen(), false);
  assert.deepEqual(SEL.selected(), { addr: D, pos: m?.pos, width: m?.width }, 'the match selected');
  assert.ok(same(CAM.view(), view), 'the camera still');
  assert.deepEqual([WALK.current()?.addr, globalThis.document.activeElement === /** @type {any} */ (walkEl)], [D, true], 'the focus on the walk\'s element, at the match');
  assert.ok(GO.arrivalMark(), 'the outline stands until the Esc after the selection (FP-21)');
  await KEYS.dispatch(keyOf('f', MOD), PLANE);
  type('zzz'); await settle();
  inField('Escape'); await settle();
  assert.deepEqual([FIND.isOpen(), globalThis.document.activeElement === /** @type {any} */ (walkEl)], [false, true], 'no match: the focus returned to where find was opened from');
});

test('Esc in a draft holding text typed before the match leaves the match selected where the find found it, in the text shown, and the walk on its span in the model\'s text (FP-20, FP-24; issue #491)', async () => {
  const typed = 'Typed first. ', at = bytes(typed + 'A note on a ') + 1;
  WRITE.addEdit(E, { pos: 1, width: 0, text: typed });
  try {
    await standAt(E);
    await KEYS.dispatch(keyOf('f', MOD), PLANE);
    await settle();
    type('tumbler'); await settle();
    assert.deepEqual(FIND.stands()?.matches, [{ pos: at, width: 7 }], 'found in the text shown, past the words typed');
    inField('Escape'); await settle();
    const s = SEL.selected(), d = LAYER.shownOf(E);
    assert.deepEqual([s, s && REC.textOf(d.runs, s.pos, s.pos + s.width)], [{ addr: E, pos: at, width: 7 }, 'tumbler'], 'the match selected where it was found: "tumbler" in the text shown');
    assert.deepEqual([WALK.current()?.kind, WALK.current()?.addr, WALK.current()?.pos], ['block', E, 1], 'the walk on the span holding it in the model\'s text');
  } finally { WRITE.clearEdits(E); }
});

/** D's text held whole, its image its own bytes, as a read of it leaves it */
function heldWhole() {
  REC.takeDelivery(D, [{ pos: HELD + 1, width: N - HELD, kind: 'content', text: REST, ref: null, origin: null }], 1);
  REC.takeImage(D, 1, [{ iStart: D + '.0.1.1', width: N }]);
}

test('in a text holding typed words a move takes the walk and its trail entry to the match where the text shown holds it and outlines it there; Mod+G writes the next match\'s position on that entry; and Back, more typed while away, outlines it where its bytes stand now (FP-21, FP-25; issue #515)', async () => {
  const typed = 'Forty bytes typed before the first word.';
  assert.equal(bytes(typed), 40);
  heldWhole();
  WRITE.addEdit(D, { pos: 1, width: 0, text: typed });
  try {
    await standAt(D);
    await KEYS.dispatch(keyOf('f', MOD), PLANE);
    await settle();
    type('tumbler'); await settle();
    const [first, second] = FIND.stands()?.matches ?? [], entry = TRAIL.current(), board = second.pos - 40, block = /** @type {NonNullable<ReturnType<typeof LAYER.blockAt>>} */ (LAYER.blockAt(D, second.pos));
    assert.deepEqual(GO.arrivalMark(), { addr: D, pos: 41, runs: [{ pos: 41, width: 7 }], link: null }, 'the first match outlined where the text shown holds it');
    assert.deepEqual([first.pos, WALK.current()?.kind, WALK.current()?.addr, WALK.current()?.pos, WALK.landedAt(), entry?.pos, entry?.width], [41, 'block', D, 1, 41, 41, 7], 'the walk on the block of the text shown holding the match, at the match, and the entry on it');
    await KEYS.dispatch(keyOf('g', MOD), { where: 'field', byKey: true });
    await settle();
    assert.deepEqual([TRAIL.current() === entry, entry?.pos, entry?.width, WALK.current()?.pos, WALK.landedAt(), GO.arrivalMark()?.runs], [true, second.pos, 7, block.pos, second.pos, [{ pos: second.pos, width: 7 }]], 'Mod+G: the walk and the one entry on the next match, where the text shown holds it, outlined there');
    assert.ok(same(CAM.view(), GO.viewFor(D, second.pos)), 'the camera at the view that reads the match where the text shown holds it');
    WRITE.addEdit(D, { pos: 1, width: 0, text: 'cd' });
    assert.deepEqual(GO.arrivalMark()?.runs, [{ pos: second.pos + 2, width: 7 }], 'words typed above it: the outline stays on the match');
    await standAt(E);
    assert.deepEqual(entry?.kept?.arrival?.held, [{ prefix: D + '.0.1', ordinal: board, width: 7 }], 'the entry keeps the match\'s own bytes');
    WRITE.addEdit(D, { pos: 1, width: 0, text: 'ab' });
    GO.back(true); await settle();
    assert.deepEqual([TRAIL.current() === entry, GO.arrivalMark()?.runs], [true, [{ pos: second.pos + 4, width: 7 }]], 'Back: outlined where its bytes stand now, past the words typed meanwhile');
  } finally { WRITE.clearEdits(D); }
});

test('find searches the text shown, typed words among them: a match in words the page made is outlined where they stand, the walk on the typed line and the entry at the match, held by the page\'s own identity of its bytes, and Back, more typed above it while away, lands on the typed words again (FP-21; issue #515)', async () => {
  heldWhole();
  WRITE.addEdit(D, { pos: 1, width: 0, text: 'a tumbler typed here.\n\n' });
  try {
    await standAt(D);
    await KEYS.dispatch(keyOf('f', MOD), PLANE);
    await settle();
    type('tumbler typed'); await settle();
    const entry = TRAIL.current();
    assert.deepEqual([FIND.stands()?.matches, GO.arrivalMark()], [[{ pos: 3, width: 13 }], { addr: D, pos: 3, runs: [{ pos: 3, width: 13 }], link: null }], 'found and outlined in the typed words');
    assert.deepEqual([WALK.current()?.addr, WALK.current()?.pos, WALK.landedAt(), entry?.pos, entry?.width], [D, 1, 3, 3, 13], 'the walk on the typed line, at the match, and the entry at the match');
    await standAt(E);
    assert.deepEqual(entry?.kept?.arrival?.held, [{ prefix: REC.pageSpace(D), ordinal: /** @type {number} */ (WRITE.edits(D)[0].page) + 2, width: 13 }], 'its bytes named by the page\'s own identity: the page made them');
    WRITE.addEdit(D, { pos: 1, width: 0, text: 'More typed above.\n\n' });
    GO.back(true); await settle();
    assert.deepEqual([TRAIL.current() === entry, GO.arrivalMark()?.runs, WALK.current()?.pos, REC.textOf(LAYER.shownOf(D).runs, 22, 35)], [true, [{ pos: 22, width: 13 }], 20, 'tumbler typed'], 'Back: outlined on the typed words where they stand now, nineteen positions on, the walk on their line');
  } finally { WRITE.clearEdits(D); }
});

test('a match across bytes an edit took out stands in the text shown as the move makes it, its bytes named, and a return reads it again from them, each stretch outlined where the text shown holds it (FP-21; issue #515)', async () => {
  heldWhole();
  WRITE.addEdit(D, { pos: 3, width: 2, text: '' });
  try {
    await standAt(D);
    await KEYS.dispatch(keyOf('f', MOD), PLANE);
    await settle();
    type('tuler'); await settle();
    const entry = TRAIL.current();
    assert.deepEqual([GO.arrivalMark()?.runs, entry?.pos], [[{ pos: 1, width: 5 }], 1], 'outlined whole in the text shown, the walk at its first byte');
    await standAt(E);
    assert.deepEqual(entry?.kept?.arrival?.held, [{ prefix: D + '.0.1', ordinal: 1, width: 2 }, { prefix: D + '.0.1', ordinal: 5, width: 3 }], 'its bytes named on either side of the bytes taken out');
    GO.back(true); await settle();
    assert.deepEqual(GO.arrivalMark()?.runs, [{ pos: 1, width: 5 }], 'read again from its bytes in the text shown, where they stand together: one run, as the move outlined it');
  } finally { WRITE.clearEdits(D); }
});

test('Esc at a match in words typed after the text\'s last span leaves the walk on the block of the text shown holding them, never the first (FP-20; issue #515)', async () => {
  heldWhole();
  await standAt(D);
  await KEYS.dispatch(keyOf('f', MOD), PLANE);
  await settle();
  WRITE.addEdit(D, { pos: N + 1, width: 0, text: 'one more word typed' });
  try {
    type('one more'); await settle();
    const m = FIND.stands()?.matches, typed = /** @type {import('../model/records.js').Block} */ (LAYER.blockAt(D, N + 1));
    assert.deepEqual([m, typed.text], [[{ pos: N + 1, width: 8 }], 'one more word typed'], 'found past the model\'s text, in the typed words, a block of the text shown');
    inField('Escape'); await settle();
    assert.deepEqual([SEL.selected(), WALK.current()?.kind, WALK.current()?.addr, WALK.current()?.pos], [{ addr: D, pos: N + 1, width: 8 }, 'block', D, typed.pos], 'the match selected in the text shown, the walk on the typed line holding it');
  } finally { WRITE.clearEdits(D); }
});

test('a miss names the document and the version searched, and says the withheld text it did not search; the withheld run holds no match, nor joins its neighbours\' text', async () => {
  await standAt(W);
  await KEYS.dispatch(keyOf('f', MOD), PLANE);
  await settle();
  type('tumbler'); await settle();
  const s = FIND.stands(), name = LAYER.placeName(REC.doc(W), W);
  assert.deepEqual(s && [s.matches, s.count, s.clauses], [[], '', [t('L.find.none', { where: t('L.held.current', { D: name }) }), t('L.find.withheld')]], `the miss: ${s && s.clauses.join(' · ')}`);
  assert.ok(s && s.clauses[0].includes(W), 'naming the document by its address');
});

test('a part the board will not give: the find searches what it holds and says it searched only part of it, and why — its count no bound, nothing more coming', async () => {
  await standAt(E);
  await KEYS.dispatch(keyOf('f', MOD), PLANE);
  await settle();
  type('tumbler'); await settle();
  const s = FIND.stands();
  assert.deepEqual(s && [s.matches.length, s.refused?.name, s.count, s.clauses], [1, 'bad_region', t('B2.find.count', { k: 1, n: 1 }), [t('L.find.part', { reason: t(whyOf({ kind: 'refused', name: 'bad_region' })) })]]);
});

test('off any document Mod+F opens nothing and the one line says where words are found; Mod+G opens the find where nothing steps, and steps it where it stands (K-91)', async () => {
  await WALK.focusTo('1.0.1', null);
  assert.equal(await KEYS.dispatch(keyOf('f', MOD), PLANE), true, 'taken: the browser\'s find never runs');
  assert.deepEqual([FIND.isOpen(), said.at(-1)], [false, t('L.find.off', { 'find chord': KEYS.drawChord('Mod+F') })]);
  await standAt(D);
  assert.equal(await KEYS.dispatch(keyOf('g', MOD), PLANE), true);
  assert.equal(FIND.isOpen(), true, 'no arrival in several runs: Mod+G opens the find');
  await settle();
  type('tumbler'); await settle();
  assert.equal(await KEYS.dispatch(keyOf('g', MOD), { where: 'field', byKey: true }), true);
  await settle();
  assert.equal(FIND.stands()?.current, 1, 'standing, Mod+G steps it — from a field too');
});

test('a move to another place ends the find, its text typed kept for the entry it stood at; a return to that entry reopens it there with its matches, the focus left where the return put it (FP-36)', async () => {
  await standAt(D);
  await KEYS.dispatch(keyOf('f', MOD), PLANE);
  await settle();
  type('tumbler'); await settle();
  const found = FIND.stands()?.matches.length;
  await standAt(E);
  FIND.refresh();
  assert.equal(FIND.isOpen(), false, 'the LEAP to another document ended it');
  GO.back(true); await settle();
  const s = FIND.stands();
  assert.deepEqual(s && [s.addr, s.query, s.matches.length], [D, 'tumbler', found], 'Back to its entry: reopened there, its text typed and its matches as they stood');
  assert.notEqual(globalThis.document.activeElement, /** @type {any} */ (input), 'reopened without the focus');
});

test('a change of the page\'s class keeps the text typed and drops everything the find measured, searching again what the new class reads (FP-29)', async () => {
  await standAt(D);
  await KEYS.dispatch(keyOf('f', MOD), PLANE);
  await settle();
  type('tumbler'); await settle();
  FIND.classChanged();
  const s = FIND.stands();
  assert.deepEqual(s && [s.query, s.matches, s.current, s.refused], ['tumbler', [], -1, null], 'its matches and its current one dropped, its text typed kept');
  FIND.refresh();
  assert.equal(FIND.stands()?.matches.length, 3, 'searched again over the text the page holds now');
});
