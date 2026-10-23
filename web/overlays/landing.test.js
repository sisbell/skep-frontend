// O-LAND's test against the FAKE PORT, on a stand-in of the line's element
// (issue #153's design decision): a LEAP whose text holds only part of the
// passage carried stands the line — the landing's words, and its acts as the
// landing offers them, here the scene with the text it came from — written
// from N-GO's state (a mutant that writes the words alone, or no line,
// turns red); a press on an act is N-GO's; the next landing takes the line
// down with the outline, and where one of its acts held the focus the focus goes
// to the walk's element (a mutant that drops the hand-off leaves the focus
// on nothing and turns red); a landing that says nothing stands no line.
// A landing in several runs (issue #158's design decision): the line the
// label of the run it stands at, its acts the step's — "next piece",
// "previous piece", each showing its chord — before its offers; a press on
// one steps, and the line takes the label of the run stepped to (a mutant
// that leaves the step out, or writes the old words, turns red). The labels
// that would stack in one column's edge are one group, a group's room the
// most its labels take (a mutant grouping across columns, or by the first
// label's height alone, turns red).
import { test, before } from 'node:test';
import assert from 'node:assert/strict';
import * as PORT from '../bridge/port.js';
import * as REC from '../model/records.js';
import * as PUMP from '../model/pump.js';
import * as F from '../model/frames.js';
import * as FAKE from '../test/fake-port.js';
import * as CAM from '../plane/camera.js';
import * as LK from '../links/links.js';
import * as TRAIL from '../nav/trail.js';
import * as GO from '../nav/go.js';
import * as HOST from './host.js';
import * as LANDING from './landing.js';
import { drawChord } from '../nav/keys.js';
import { t } from '../strings.js';
import { esc } from '../util.js';

const D = '1.0.1.0.3', FAR = '1.0.1.0.127';
const NEAR_TEXT = 'Tumbler.\n\nThe first field.', FAR_TEXT = 'The far edition.\n\nIts cited passage stands here.';
/** the reads of a document read whole — a draft, so no member is sought for an offer */
const reads = (/** @type {string} */ doc, /** @type {string} */ text) => ({
  [FAKE.keyOf('op', { frame: F.retrieveDocVSpanSet(doc) })]: { result: { as_of: 1, resp: 'span_set', set: [{ start: '1.1', width: '0.' + text.length }] } },
  [FAKE.keyOf('op', { frame: F.docMetadata(doc) })]: { result: { as_of: 1, resp: 'doc_metadata', doc, published: false, owner: '1.0.1', birth: null, birth_extent: null, placed: null, base_extent: null, source: null } },
  [FAKE.keyOf('op', { frame: F.retrieveV(doc, 1, text.length) })]: { result: { as_of: 1, resp: 'delivery', items: [{ content: text }] } },
  [FAKE.keyOf('op', { frame: F.image(doc, 1, text.length) })]: { result: { as_of: 1, resp: 'runs', runs: [{ i_start: doc + '.0.1.1', width: String(text.length) }] } },
  [FAKE.keyOf('op', { frame: F.findLinksV(doc, 1, text.length) })]: { result: { as_of: 1, resp: 'addrs', addrs: [] } },
});
/** the passage carried: the first edition's first twelve positions, of which FAR holds the first five, at 25; and one FAR holds whole */
const PARTIAL = { addr: D, pos: 1, width: 12 }, WHOLE = { addr: D, pos: 11, width: 5 };
/** a passage FAR holds in two runs, its second half first: its first five positions at 30, its last five at 2 */
const TWO = { addr: D, pos: 1, width: 10 };
const compared = (/** @type {{addr: string, pos: number, width: number}} */ c, /** @type {Array<[number, number, number]>} */ pairs) => ({
  [FAKE.keyOf('op', { frame: F.compare([{ doc: c.addr, spans: [{ ordinal: c.pos, positions: c.width }] }], [{ doc: FAR, spans: [{ ordinal: 1, positions: FAR_TEXT.length }] }]) })]:
    { result: { as_of: 1, resp: 'compare', pairs: pairs.map(([u1, u2, width]) => ({ d1: D, d2: FAR, u1: { ordinal: String(u1), subspace: '1' }, u2: { ordinal: String(u2), subspace: '1' }, width: String(width) })) } },
});
const script = { ...reads(D, NEAR_TEXT), ...reads(FAR, FAR_TEXT), ...compared(PARTIAL, [[1, 25, 5]]), ...compared(WHOLE, [[11, 20, 5]]), ...compared(TWO, [[1, 30, 5], [6, 2, 5]]) };

/** @typedef {{tag: string, attrs: Record<string, string>, classes: string[], dataset: Record<string, string>, text: string, focus: () => void, blur: () => void, getAttribute: (k: string) => string | null}} Kid */

/** the platform's document, a stand-in: its body, and the element the focus stands on */
const body = /** @type {any} */ ({ tag: 'body' });
const doc = /** @type {{activeElement: any, body: any}} */ ({ activeElement: body, body });

/** the line's element, a stand-in: what O-LAND writes into it is what a person meets, its controls focusable */
function lineEl() {
  /** @type {Kid[]} */
  let kids = [];
  let html = '';
  const classes = new Set();
  return {
    style: {}, inert: false,
    classList: { toggle: (/** @type {string} */ c, /** @type {boolean} */ on) => { if (on) classes.add(c); else classes.delete(c); }, contains: (/** @type {string} */ c) => classes.has(c) },
    addEventListener() {}, getAttribute: () => null, getBoundingClientRect: () => ({ left: 0, top: 0, width: 200, height: 30, right: 200, bottom: 30 }),
    contains: (/** @type {unknown} */ x) => kids.includes(/** @type {Kid} */ (x)),
    querySelectorAll: (/** @type {string} */ sel) => kids.filter((k) => (sel.includes('button') && k.tag === 'button') || (sel.includes('[data-act]') && 'data-act' in k.attrs)),
    querySelector: (/** @type {string} */ sel) => (sel === '.words' ? kids.find((k) => k.classes.includes('words')) || null : null),
    get innerHTML() { return html; },
    set innerHTML(/** @type {string} */ v) {
      html = v;
      const old = kids;
      kids = [...v.matchAll(/<([a-z]+)\b([^>]*)>([^<]*)/g)].map((m) => {
        const attrs = Object.fromEntries([...m[2].matchAll(/([\w-]+)="([^"]*)"/g)].map((a) => [a[1], a[2]]));
        const dataset = Object.fromEntries(Object.entries(attrs).filter(([k]) => k.startsWith('data-')).map(([k, x]) => [k.slice(5), x]));
        /** @type {Kid} */
        const e = { tag: m[1], attrs, classes: (attrs.class || '').split(/\s+/).filter(Boolean), dataset, text: m[3], focus() { doc.activeElement = e; }, blur() { if (doc.activeElement === e) doc.activeElement = body; }, getAttribute: (k) => attrs[k] ?? null };
        return e;
      });
      if (old.includes(doc.activeElement)) doc.activeElement = body;
    },
    /** the line's controls, in the order written, by their acts */
    acts: () => kids.filter((k) => k.tag === 'button').map((k) => k.dataset.act),
    /** the control bearing an act */
    act: (/** @type {string} */ a) => kids.find((k) => k.dataset.act === a),
  };
}

/** an act run to its end: the flight it starts stepped to its last frame */
async function run(/** @type {Promise<unknown>} */ act) {
  let done = false;
  act.then(() => { done = true; });
  for (let i = 0; i < 200 && !done; i++) { await new Promise((r) => setTimeout(r, 0)); if (CAM.flying()) CAM.step(Infinity); }
  assert.ok(done, 'the act ran to its end');
}

/** @type {ReturnType<typeof FAKE.create>} */
let fake;
const el = lineEl();
let handed = 0;

before(async () => {
  REC._reset(); LK._reset(); TRAIL._reset();
  globalThis.document = /** @type {any} */ (doc);
  globalThis.HTMLElement = /** @type {any} */ (class {});
  HOST.attach(/** @type {any} */ ({ className: '', innerHTML: '', style: {}, setAttribute() {}, removeAttribute() {}, addEventListener() {}, querySelector: () => null, querySelectorAll: () => [], getBoundingClientRect: () => ({ left: 0, top: 0, width: 0, height: 0, right: 0, bottom: 0 }), contains: () => false }));
  LANDING.attach(/** @type {any} */ (el), { handOff: () => { handed++; } });
  fake = FAKE.create(script);
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.setBoard({ board: 'b-1', name: '', origin: '' }); REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  REC.takeIndex(/** @type {any} */ ({ docs: [{ doc: D, kind: 'edition', label: 'd', standing: 'public' }, { doc: FAR, kind: 'draft', label: 'far', standing: 'public' }], counts: [{ account: '1.0.1', documents: 2 }], state: { arm: 'complete' } }));
  CAM.setViewport(1440, 900);
  await PUMP.loadWhole(D);
  await GO.launch();
});

test('a landing whose text holds only part of the passage stands its line — its words, then its acts — written from the landing; the next landing takes it down, and a focus its act held goes to the walk\'s element', async () => {
  await run(GO.leapTo(D));
  await run(GO.leapTo(FAR, { how: 'leap', carry: { ...PARTIAL, selected: true } }));
  LANDING.render();
  const words = GO.landingLine();
  assert.ok(words, 'the landing says part of it');
  const s = LANDING.stateNow();
  assert.deepEqual(s && [s.id, s.words, s.acts.map((a) => a.act)], ['L.held.part', words, ['beside']], 'its words, and the one act it offers: the first edition beside it');
  assert.ok(el.classList.contains('on') && el.innerHTML.includes('data-string="L.held.part"') && el.innerHTML.includes(esc(words)), el.innerHTML);
  assert.deepEqual(el.acts(), ['beside'], 'a native button for each act');
  // the act held the focus as the next landing came: the line gone, the focus handed to the walk's element
  /** @type {any} */ (el.act('beside')).focus();
  await run(GO.home());
  LANDING.render();
  assert.deepEqual([el.classList.contains('on'), el.innerHTML, handed], [false, '', 1], 'gone with the outline, the focus handed on');
  assert.deepEqual(fake.unanswered, []);
});

test('a landing that holds all of the passage in one piece stands no line: the outline alone says it', async () => {
  await run(GO.leapTo(D));
  await run(GO.leapTo(FAR, { how: 'leap', carry: WHOLE }));
  LANDING.render();
  assert.deepEqual([GO.arrivalMark()?.runs, LANDING.stateNow(), el.classList.contains('on'), el.innerHTML], [[{ pos: 20, width: 5 }], null, false, '']);
  assert.deepEqual(fake.unanswered, []);
});

test('a landing in several runs: its line the label of the run it stands at, its acts the step\'s — each showing its chord — before its offers; a press on "next piece" steps, the line taking the label of the run stepped to (issue #158)', async () => {
  await run(GO.leapTo(D));
  await run(GO.leapTo(FAR, { how: 'leap', carry: TWO }));
  LANDING.render();
  const piece = (/** @type {number} */ k) => t('L.piece', { k, n: 2 }), clauses = ' · ' + t('L.piece.all') + ' · ' + t('L.piece.order');
  const s = LANDING.stateNow();
  assert.deepEqual(s && [s.id, s.words, s.acts.map((a) => [a.act, a.chord ?? null])], ['L.piece', piece(1) + clauses, [['next', drawChord('Mod+G')], ['previous', drawChord('Mod+Shift+G')], ['beside', null]]],
    'the line "piece 1 of 2 · all of the passage · in another order", the step first, its chords drawn, then the first edition beside it');
  assert.deepEqual(el.acts(), ['next', 'previous', 'beside'], 'a native button for each act');
  assert.ok(el.innerHTML.includes(`<kbd>${esc(drawChord('Mod+G'))}</kbd>`), 'the step\'s chord shown on it');
  GO.landingAct('next');
  for (let i = 0; i < 60; i++) { await new Promise((r) => setTimeout(r, 0)); if (CAM.flying()) CAM.step(Infinity); }
  LANDING.render();
  assert.deepEqual([GO.landing()?.pos, LANDING.stateNow()?.words], [2, piece(2) + clauses], 'stepped to the run before it in the text, piece 2: the line its label');
  assert.ok(el.innerHTML.includes(esc(piece(2) + clauses)), el.innerHTML);
  await run(GO.home());
  LANDING.render();
  assert.equal(el.classList.contains('on'), false, 'gone with the arrival at the next landing');
  assert.deepEqual(fake.unanswered, []);
});

test('the labels that would stack in one column\'s edge are one group, a group\'s room the most any of its labels takes; a label in another column\'s edge, or past the group\'s room, stands apart (issue #158: "Labels that would stack merge into one")', () => {
  const a = (/** @type {number} */ run, /** @type {number} */ x, /** @type {number} */ y, /** @type {number} */ h) => ({ run, x, y, room: 80, h });
  assert.deepEqual(LANDING.stacks([a(0, 500, 100, 13), a(1, 500, 110, 13), a(2, 500, 200, 13), a(3, 900, 105, 13)]), [[0, 1], [2], [3]], 'two lines a label tall apart: one group; one far below, and one in the next column, apart');
  assert.deepEqual(LANDING.stacks([a(0, 500, 100, 13), a(1, 500, 140, 13), a(2, 500, 100.2, 60)]), [[0, 2, 1]], 'a tall label stacks the one below it into its group');
  assert.equal(LANDING.heightOf('piece 1 of 2 · again later', 80), 2 * 13, 'twenty-six characters at six px each in eighty: two lines');
});
