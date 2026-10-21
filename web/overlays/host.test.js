// O-HOST's test: THE OPENING still reading (the rule in the head), on a
// stand-in of the host's element. Chrome that opens on its reads is pending
// while they read and shows its answer where no act was made on the chrome
// meanwhile; where one was, its answer shows nothing and its reads are told
// it no longer stands: a dismissal with nothing standing (a mutant whose
// dismissal returns before it counts turns red), and the next opening,
// whichever of the two answers first (a mutant whose opening does not count
// itself turns red). An opening that gives up, or whose reads throw, is
// pending no more (a mutant that clears it only where it shows turns red).
// ESC'S ONE ORDER (N-KEYS): a card still reading is the innermost thing —
// Esc ends it alone and the card standing under it stands (a mutant that
// dismisses the standing card with it, or leaves the opening to the
// dismissal, turns red); the next Esc dismisses that card.
import { test, before } from 'node:test';
import assert from 'node:assert/strict';
import * as HOST from './host.js';
import * as KEYS from '../nav/keys.js';

/** the host's stand-in element: what the host writes into it is what a person meets */
const hostEl = { className: '', innerHTML: '', style: {}, setAttribute() {}, removeAttribute() {}, addEventListener() {}, querySelector: () => null, querySelectorAll: () => [], getBoundingClientRect: () => ({ left: 0, top: 0, width: 0, height: 0 }), contains: () => false };

before(() => {
  globalThis.document = /** @type {any} */ ({ activeElement: null, body: null });
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
