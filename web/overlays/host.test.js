// O-HOST's test: THE OPENING still reading (the rule in the head), on a
// stand-in of the host's element. Chrome that opens on its reads is pending
// while they read and shows its answer where no act was made on the chrome
// meanwhile; where one was, its answer shows nothing and its reads are told
// it no longer stands: a dismissal with nothing standing (a mutant whose
// dismissal returns before it counts turns red), and the next opening,
// whichever of the two answers first (a mutant whose opening does not count
// itself turns red). An opening that gives up, or whose reads throw, is
// pending no more (a mutant that clears it only where it shows turns red).
// AN OVERLAY SHOWN is an act on the chrome, whatever conjures it — the trail
// list, a walk's moment, a follow's face, a rebuild of the standing overlay
// by its own act: the opening still reading ends as it is shown, its answer
// never covers what was shown, and one Esc closes what was shown, made before
// the answer or after it (a mutant whose show does not count itself turns
// every row red). THE LEAP BOX opened while an opening reads ends it, the
// overlay standing under it staying: its answer shows nothing and the box
// stands (a mutant whose box leaves the opening reading, or dismisses what
// stands, turns red).
// ESC'S ONE ORDER (N-KEYS): a card still reading is the innermost thing —
// Esc ends it alone and the card standing under it stands (a mutant that
// dismisses the standing card with it, or leaves the opening to the
// dismissal, turns red); the next Esc dismisses that card; the LEAP box,
// opened after the card, closes before it.
// AN OPENING BEGINS IN THE ACT THAT ASKS FOR IT: no module of the page loads
// another by `import()` — the app alone loads its gate's so (S-22 (a)) — so
// no load stands between an act and the opening it begins (a mutant that
// puts a card or a list behind an `import()` turns red).
import { test, before } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { sep } from 'node:path';
import * as HOST from './host.js';
import * as FACES from './faces.js';
import * as TRAILLIST from './trail-list.js';
import * as KEYS from '../nav/keys.js';
import * as LEAP from '../nav/leap.js';

/** the host's stand-in element: what the host writes into it is what a person meets */
const hostEl = { className: '', innerHTML: '', style: {}, setAttribute() {}, removeAttribute() {}, addEventListener() {}, querySelector: () => null, querySelectorAll: () => [], getBoundingClientRect: () => ({ left: 0, top: 0, width: 0, height: 0 }), contains: () => false };

before(() => {
  globalThis.document = /** @type {any} */ ({ activeElement: null, body: null, getElementById: () => null });
  HOST.attach(/** @type {any} */ (hostEl));
});

/** a read the test answers when it chooses: a slow board's */
function slow() {
  /** @type {(v: string) => void} */
  let answer = () => {};
  /** @type {Promise<string>} */
  const read = new Promise((r) => { answer = r; });
  return { read, answer };
}

/** a card's show: the card, by its id, its answer its caption */
const card = (/** @type {string} */ id) => (/** @type {string} */ answer) => HOST.show({ kind: 'card', id, anchor: null, html: `<span class="label">${answer}</span>`, acts: {} });

/** the overlay standing: its id, or null where none stands */
const standing = () => HOST.currentState()?.id ?? null;

test('an opening nothing interrupts is pending while it reads, nothing shown, and shows its answer once they answer', async () => {
  const r = slow();
  const o = HOST.opening(() => r.read, card('provenance:wrote'));
  assert.deepEqual([HOST.pending(), standing()], [true, null], 'pending, nothing shown');
  r.answer('its origin');
  await o;
  assert.deepEqual([HOST.pending(), standing()], [false, 'provenance:wrote']);
  HOST.dismiss();
});

test('a dismissal made while it reads, nothing standing, ends it: its answer shows nothing, and its reads are told it no longer stands', async () => {
  const r = slow();
  /** @type {boolean[]} */
  const told = [];
  const o = HOST.opening(async (stands) => { const v = await r.read; told.push(stands()); return v; }, card('provenance:wrote'));
  HOST.dismiss();
  assert.equal(HOST.pending(), false, 'the dismissal ended it');
  r.answer('its origin');
  await o;
  assert.equal(standing(), null, 'its answer shows nothing');
  assert.deepEqual(told, [false], 'a read after it ended is told so, and asks no more');
});

test('the next opening ends one still reading: the card asked last shows, whichever of the two answers first', async () => {
  for (const firstAnswersFirst of [true, false]) {
    const a = slow(), b = slow();
    const first = HOST.opening(() => a.read, card('provenance:wrote'));
    const last = HOST.opening(() => b.read, card('provenance:uses'));
    if (firstAnswersFirst) { a.answer('its origin'); await first; b.answer('its users'); await last; }
    else { b.answer('its users'); await last; a.answer('its origin'); await first; }
    assert.deepEqual([standing(), HOST.pending()], ['provenance:uses', false], firstAnswersFirst ? 'the first asked answering first' : 'the first asked answering last');
    HOST.dismiss();
  }
});

test('an opening that gives up shows nothing and is pending no more; nor is one whose reads throw', async () => {
  await HOST.opening(async () => null, card('provenance:wrote'));
  assert.deepEqual([standing(), HOST.pending()], [null, false], 'given up');
  await assert.rejects(HOST.opening(async () => { throw new Error('the port failed'); }, card('provenance:wrote')));
  assert.deepEqual([standing(), HOST.pending()], [null, false], 'thrown: no opening is left pending to swallow the next Esc');
});

test('an overlay shown while an opening reads ends it, whatever conjures it: its answer never covers what was shown, and one Esc closes what was shown, before the answer or after it', async () => {
  /** the links card at a document, the others' switch in a state: shown again by the switch's own act, it is rebuilt */
  const links = (/** @type {boolean} */ on) => HOST.show({ kind: 'card', id: 'links:1.0.1.0.3', anchor: null, html: `<span class="label">links</span><button data-run="others" role="switch" aria-checked="${on}">others' links</button>`, acts: {} });
  /** @type {import('../bridge/shapes').MomentEvent} a walk's moment, as the shell raises it */
  const moment = { id: 'm-1', kind: 'statement', data: 'the walk says', walk: 'w-1', board: null, answerable: true };
  /** @type {Array<{what: string, id: string, before?: () => void, show: () => void}>} each overlay shown while the opening reads, the id it stands as, and what stood before the opening began */
  const rows = [
    { what: 'the trail list', id: 'trail-list', show: () => TRAILLIST.open() },
    { what: 'a walk\'s moment', id: 'moment:m-1', show: () => FACES.moment(moment) },
    { what: 'a follow\'s face', id: 'face:invalid', show: () => FACES.invalidFollow(null) },
    { what: 'a rebuild of the standing overlay by its own act', id: 'links:1.0.1.0.3', before: () => links(false), show: () => links(true) },
  ];
  for (const { what, id, before, show } of rows) {
    for (const escFirst of [false, true]) {
      if (before) before();
      const r = slow();
      const o = HOST.opening(() => r.read, card('provenance:wrote'));
      show();
      assert.deepEqual([HOST.pending(), standing()], [false, id], `${what}: the opening ended as it was shown`);
      if (escFirst) {
        KEYS.esc();
        assert.equal(standing(), null, `${what}: Esc made while the read is out closes what was shown, never the opening hidden behind it`);
      }
      r.answer('its origin');
      await o;
      assert.equal(standing(), escFirst ? null : id, `${what}: the opening's answer shows nothing`);
      if (!escFirst) {
        KEYS.esc();
        assert.equal(standing(), null, `${what}: one Esc closes what was shown`);
      }
    }
  }
});

test('Esc\'s one order: a card still reading is the innermost thing — Esc ends it alone, the card standing under it stands; the next Esc dismisses that card', async () => {
  HOST.show({ kind: 'card', id: 'selection', anchor: null, html: '<span class="label">1.0.1.0.3 · position 11</span>', acts: {} });
  const r = slow();
  const o = HOST.opening(() => r.read, card('provenance:wrote'));
  KEYS.esc();
  assert.deepEqual([HOST.pending(), standing()], [false, 'selection'], 'the opening ended, the selection\'s card standing');
  r.answer('its origin');
  await o;
  assert.equal(standing(), 'selection', 'its answer shows nothing');
  KEYS.esc();
  assert.equal(standing(), null, 'the next Esc dismisses the card that stood');
});

/** the LEAP box's stand-ins: its box, input, rows and status region, and whether the box is shown */
function leapBox() {
  const classes = new Set();
  const part = () => ({ innerHTML: '', value: '', setAttribute() {}, removeAttribute() {}, addEventListener() {}, focus() {}, select() {}, contains: () => false });
  const box = { ...part(), classList: { add: (/** @type {string} */ c) => { classes.add(c); }, remove: (/** @type {string} */ c) => { classes.delete(c); } } };
  return { box, input: part(), rows: part(), note: part(), shown: () => classes.has('on') };
}

test('the LEAP box opened while an opening reads ends it, the card standing under it staying: its answer shows nothing over the box; Esc closes the box, then the card', async () => {
  const b = leapBox();
  LEAP.attach(/** @type {any} */ (b), () => null);
  HOST.show({ kind: 'card', id: 'selection', anchor: null, html: '<span class="label">1.0.1.0.3 · position 11</span>', acts: {} });
  const r = slow();
  const o = HOST.opening(() => r.read, card('provenance:wrote'));
  LEAP.open();
  assert.deepEqual([HOST.pending(), standing(), LEAP.isOpen()], [false, 'selection', true], 'the box open, the opening ended, the selection\'s card standing');
  r.answer('its origin');
  await o;
  assert.deepEqual([standing(), LEAP.isOpen(), b.shown()], ['selection', true, true], 'its answer shows nothing: the box stands, the card under it');
  KEYS.esc();
  assert.deepEqual([LEAP.isOpen(), standing()], [false, 'selection'], 'Esc closes the box, the innermost thing');
  KEYS.esc();
  assert.equal(standing(), null, 'the next Esc dismisses the card');
});

test('an opening begins in the act that asks for it: no module of the page loads another by `import()`, the app alone loading its gate\'s so (S-22 (a))', () => {
  const WEB = new URL('../', import.meta.url);
  const modules = readdirSync(WEB, { recursive: true }).map((f) => String(f).split(sep).join('/')).filter((f) => f.endsWith('.js') && !f.endsWith('.test.js') && !f.startsWith('test/') && !f.startsWith('gate/'));
  assert.ok(['app/main.js', 'app/input.js', 'nav/keys.js', 'overlays/links-card.js', 'overlays/faces.js'].every((f) => modules.includes(f)), 'the page\'s modules are read');
  /** @type {string[]} */
  const stray = [];
  for (const f of modules) {
    // comments dropped, a block before a line: a JSDoc type's `import('…')` names a type, and a head comment may name `import()`
    const src = readFileSync(new URL(f, WEB), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/[^\n]*/g, '');
    for (const m of src.matchAll(/\bimport\s*\(([^)]*)\)/g)) if (!(f === 'app/main.js' && /^\s*['"]\.\.\/gate\//.test(m[1]))) stray.push(`${f}: import(${m[1]})`);
  }
  assert.deepEqual(stray, []);
});
