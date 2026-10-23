// O-LAND's test against the FAKE PORT, on a stand-in of the line's element
// (issue #153's design decision): a LEAP whose text holds only part of the
// passage carried stands the line — the landing's words, and its acts as the
// landing offers them, here the scene with the text it came from — written
// from N-GO's state (a mutant that writes the words alone, or no line,
// turns red); a press on an act is N-GO's; the next act takes the line down
// with the outline, and where one of its acts held the focus the focus goes
// to the walk's element (a mutant that drops the hand-off leaves the focus
// on nothing and turns red); a landing that says nothing stands no line.
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
const compared = (/** @type {{addr: string, pos: number, width: number}} */ c, /** @type {Array<[number, number, number]>} */ pairs) => ({
  [FAKE.keyOf('op', { frame: F.compare([{ doc: c.addr, spans: [{ ordinal: c.pos, positions: c.width }] }], [{ doc: FAR, spans: [{ ordinal: 1, positions: FAR_TEXT.length }] }]) })]:
    { result: { as_of: 1, resp: 'compare', pairs: pairs.map(([u1, u2, width]) => ({ d1: D, d2: FAR, u1: { ordinal: String(u1), subspace: '1' }, u2: { ordinal: String(u2), subspace: '1' }, width: String(width) })) } },
});
const script = { ...reads(D, NEAR_TEXT), ...reads(FAR, FAR_TEXT), ...compared(PARTIAL, [[1, 25, 5]]), ...compared(WHOLE, [[11, 20, 5]]) };

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

test('a landing whose text holds only part of the passage stands its line — its words, then its acts — written from the landing; the next act takes it down, and a focus its act held goes to the walk\'s element', async () => {
  await run(GO.leapTo(D));
  await run(GO.leapTo(FAR, { how: 'leap', carry: { ...PARTIAL, selected: true } }));
  LANDING.render();
  const words = GO.landingLine();
  assert.ok(words, 'the landing says part of it');
  const s = LANDING.stateNow();
  assert.deepEqual(s && [s.id, s.words, s.acts.map((a) => a.act)], ['L.held.part', words, ['beside']], 'its words, and the one act it offers: the first edition beside it');
  assert.ok(el.classList.contains('on') && el.innerHTML.includes('data-string="L.held.part"') && el.innerHTML.includes(esc(words)), el.innerHTML);
  assert.deepEqual(el.acts(), ['beside'], 'a native button for each act');
  // the act held the focus as the next act came: the line gone, the focus handed to the walk's element
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
