// N-WALK's test against the FAKE PORT: a landing keeps the position it named
// inside the span it focuses — the one line's position — while a walk key's
// move names none, so stepping back onto the landing's span reads the span's
// own first position; a position no span holds is never kept. The ring is
// drawn at a landing a key made and put out by any other, and a camera move
// re-takes the focus with the ring drawn where a key made the move — a mutant
// that drops the re-take's word of the key turns red. The mirror's
// rebuild leaves the plane one Tab stop (D5 §4 rule 5): the current item while
// it stands, the tree out of the order — a mutant that leaves the tree in it
// turns red — and the tree itself where the walk's level holds no item — a
// mutant that always takes it out turns red. The tree is named from ST as the
// walk attaches it, and each level's group by its own level — a mutant that
// drops the tree's name, or names every group by one level, turns red. An
// overlay's close returns the focus (D5 §4 rule 4) to the element it was
// opened from where that takes it, and to the walk's element where it does
// not — one still on the page among them, so a mutant that asks whether the
// opener is on the page turns red, as does one with no fallback; an overlay
// opened with the focus on nothing returns it to nothing — a mutant that
// falls back wherever the focus lands on nothing turns red — and a focus the
// person moved out of the overlay stays where they put it — a mutant that
// returns it regardless turns red.
import { test, before } from 'node:test';
import assert from 'node:assert/strict';
import * as PORT from '../bridge/port.js';
import * as REC from '../model/records.js';
import * as PUMP from '../model/pump.js';
import * as F from '../model/frames.js';
import * as FAKE from '../test/fake-port.js';
import * as CAM from '../plane/camera.js';
import { accountCell, boardCell } from '../plane/projection.js';
import { lodOf } from '../plane/lod.js';
import { t } from '../strings.js';
import * as WALK from './walk.js';

const D = '1.0.1.0.3';
// three spans: 1 "Tumbler.\n\n" (10), 11 "The first field." (16), 27 a withheld run (4)
const script = {
  [FAKE.keyOf('op', { frame: F.retrieveDocVSpanSet(D) })]: { result: { as_of: 1, resp: 'span_set', set: [{ start: '1.1', width: '0.30' }] } },
  [FAKE.keyOf('op', { frame: F.docMetadata(D) })]: { result: { as_of: 1, resp: 'doc_metadata', doc: D, published: true, owner: '1.0.1', birth: D + '.1', birth_extent: '30', placed: null, base_extent: null, source: null } },
  [FAKE.keyOf('op', { frame: F.retrieveV(D, 1, 30) })]: { result: { as_of: 1, resp: 'delivery', items: [{ content: 'Tumbler.\n\nThe first field.' }, { withheld: { origin: '1.0.1.0.1003', width: '4' } }] } },
  [FAKE.keyOf('op', { frame: F.image(D, 1, 30) })]: { result: { as_of: 1, resp: 'runs', runs: [{ i_start: D + '.0.1.1', width: '26' }, { i_start: '1.0.1.0.1003.0.1.1', width: '4' }] } },
  [FAKE.keyOf('op', { frame: F.findLinksV(D, 1, 30) })]: { result: { as_of: 1, resp: 'addrs', addrs: [] } },
};

/** a walk move run to its end: the flight it starts stepped to its last frame */
async function run(/** @type {Promise<unknown>} */ move) {
  let done = false;
  move.then(() => { done = true; });
  for (let i = 0; i < 100 && !done; i++) { await new Promise((r) => setTimeout(r, 0)); if (CAM.flying()) CAM.step(Infinity); }
  assert.ok(done, 'the move ran to its end');
}

before(async () => {
  REC._reset();
  const fake = FAKE.create(script);
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.setBoard({ board: 'b-1', name: '', origin: '' }); REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  REC.takeIndex(/** @type {any} */ ({ docs: [{ doc: D, kind: 'edition', label: 'd', standing: 'public' }], counts: [{ account: '1.0.1', documents: 1 }], state: { arm: 'complete' } }));
  CAM.setViewport(1440, 900);
  await PUMP.loadWhole(D);
  assert.deepEqual(REC.doc(D).blocks.map((b) => b.pos), [1, 11, 27]);
  assert.deepEqual(fake.unanswered, []);
});

test('a landing focuses the span holding its position and keeps the position it named', async () => {
  await WALK.focusTo(D, 15);
  assert.equal(WALK.current()?.pos, 11, 'the focus is the span holding position 15');
  assert.equal(WALK.landedAt(), 15);
});

test('a walk key names no position, and stepping back onto the landing\'s span reads the span\'s own first', async () => {
  await WALK.focusTo(D, 15);
  await run(WALK.key('down'));
  assert.equal(WALK.current()?.pos, 27);
  assert.equal(WALK.landedAt(), null);
  await run(WALK.key('up'));
  assert.equal(WALK.current()?.pos, 11);
  assert.equal(WALK.landedAt(), null);
});

test('a position no span holds is never kept: the focus falls to the first span with its own position', async () => {
  await WALK.focusTo(D, 99);
  assert.equal(WALK.current()?.pos, 1);
  assert.equal(WALK.landedAt(), null);
});

test('a landing on the document itself names no position', async () => {
  await WALK.focusTo(D, 15);
  await WALK.focusTo(D, null);
  assert.equal(WALK.current()?.kind, 'document');
  assert.equal(WALK.landedAt(), null);
});

test('the ring is drawn at a landing a key made and put out by any other; a camera move re-takes the focus with it drawn where a key made the move', async () => {
  await WALK.focusTo(D, 15, true);
  assert.equal(WALK.ringShown(), true, 'a landing a key made draws the ring');
  await WALK.focusTo(D, 15);
  assert.equal(WALK.ringShown(), false, 'a landing made otherwise puts it out');
  // the camera over the account's region at the whole board's scale, the focus on the document: the re-take moves it to the account
  const cell = accountCell('1.0.1');
  CAM.set({ x: cell.x + cell.w / 2, y: cell.y + cell.h / 2, scale: CAM.viewForCell(boardCell('1'), 0.92).scale });
  assert.equal(lodOf(CAM.cam.scale).name, 'far~mid', 'the scale\'s grain is the account');
  await WALK.retakeFromView(true);
  assert.deepEqual([WALK.current()?.kind, WALK.current()?.addr, WALK.ringShown()], ['account', '1.0.1', true], 'a key\'s camera move re-takes the focus, the ring drawn');
  await WALK.focusTo(D, null, true);
  await WALK.retakeFromView();
  assert.deepEqual([WALK.current()?.kind, WALK.current()?.addr, WALK.ringShown()], ['account', '1.0.1', false], 'a pointer\'s re-takes it and puts the ring out');
});

/** the ids of the mirror's items at tabindex 0, read from the markup the rebuild wrote */
const itemStops = (/** @type {string} */ html) => [...html.matchAll(/<li\b[^>]*>/g)].filter((m) => / tabindex="0"/.test(m[0])).map((m) => (/ id="([^"]*)"/.exec(m[0]) || [])[1]);

// placed last: it attaches a mirror, which every test above runs without
test('the plane is one Tab stop: the current item while it stands, the tree itself where the walk\'s level holds no item', async () => {
  const platform = globalThis.document;
  globalThis.document = /** @type {any} */ ({ activeElement: null }); // the platform's focus on none of the mirror
  const mirror = { innerHTML: '', tabIndex: 0, contains: () => false, setAttribute() {} };
  WALK.attach(/** @type {any} */ (mirror), /** @type {any} */ ({ textContent: '' }));
  try {
    await WALK.focusTo(D, 15);
    assert.deepEqual(itemStops(mirror.innerHTML), ['walk-' + WALK.mirrorIndex()], 'the current item alone of the items is in the order');
    assert.equal(mirror.tabIndex, -1, 'the tree is out of the order while its current item stands');
    // a document in an account the index lists nothing for: the landing's level holds no sibling, so no item
    await WALK.focusTo('1.0.9.0.1', null);
    assert.equal(WALK.mirrorSize(), 0);
    assert.deepEqual(itemStops(mirror.innerHTML), []);
    assert.equal(mirror.tabIndex, 0, 'the tree itself is the stop');
  } finally {
    globalThis.document = platform;
  }
});

// placed last with the tests around it: it attaches a mirror of its own
test('the tree is named from ST as the walk attaches it, and each level\'s group by its own level', async () => {
  const platform = globalThis.document;
  globalThis.document = /** @type {any} */ ({ activeElement: null });
  /** @type {Record<string, string>} the attributes the walk set on the tree */
  const attrs = {};
  const mirror = { innerHTML: '', tabIndex: 0, contains: () => false, setAttribute: (/** @type {string} */ k, /** @type {string} */ v) => { attrs[k] = v; } };
  /** the group's name, read from the markup the rebuild wrote */
  const group = () => (/<ul role="group" aria-label="([^"]*)">/.exec(mirror.innerHTML) || [])[1];
  try {
    WALK.attach(/** @type {any} */ (mirror), /** @type {any} */ ({ textContent: '' }));
    assert.equal(attrs['aria-label'], t('L.mirror-label'), 'the tree, named as it is attached');
    await WALK.focusTo(D, 15);
    assert.equal(group(), t('L.mirror-level', { n: 4 }), 'a span\'s group: board › account › document › span');
    await WALK.focusTo(D, null);
    assert.equal(group(), t('L.mirror-level', { n: 3 }), 'a document\'s group');
  } finally {
    globalThis.document = platform;
  }
});

/**
 * A page for the focus's return: the platform's focus — the body where it stands on nothing, as the platform leaves it
 * once the element holding it is gone — elements whose `focus()` lands it, or lands nothing as the platform's does on an
 * element that no longer takes the focus, and a mirror whose current item takes it.
 */
function page() {
  const body = { id: 'body', focus() {} }; // the body takes no focus: the platform's focus() on it moves nothing
  const doc = { body, activeElement: /** @type {{id: string}} */ (body) };
  /** an element on the page: `takes` whether the platform's focus lands on it */
  const element = (/** @type {string} */ id, takes = true) => ({ id, isConnected: true, focus() { if (takes) doc.activeElement = this; }, getBoundingClientRect: () => ({ top: 0, height: 10 }) });
  const item = element('the current item');
  const mirror = {
    innerHTML: '', tabIndex: -1, clientTop: 0, clientHeight: 100, scrollTop: 0,
    contains: (/** @type {unknown} */ e) => e === item,
    querySelector: (/** @type {string} */ s) => (s === '#walk-' + WALK.mirrorIndex() ? item : null),
    getBoundingClientRect: () => ({ top: 0, height: 100 }),
    focus() { doc.activeElement = { id: 'the tree' }; },
    setAttribute() {},
  };
  return { doc, body, element, mirror };
}

// placed last with the test above: it attaches a mirror of its own
test('an overlay\'s close returns the focus to its opener where that takes it, else to the walk\'s element; never to the top, never from where the person moved it', async () => {
  const platform = globalThis.document;
  const p = page();
  globalThis.document = /** @type {any} */ (p.doc);
  WALK.attach(/** @type {any} */ (p.mirror), /** @type {any} */ ({ textContent: '' }));
  const at = () => p.doc.activeElement.id;
  /** the overlay closed: its markup gone, the focus it held on nothing, then the return to its opener */
  const closed = (/** @type {object} */ opener) => { p.doc.activeElement = p.body; WALK.returnFocus(/** @type {any} */ (opener)); return at(); };
  try {
    await WALK.focusTo(D, 15);
    assert.equal(closed(p.element('the opener')), 'the opener', 'an opener that takes the focus has it back');
    assert.equal(closed(p.element('a corner the walk has left', false)), 'the current item', 'an opener still on the page that no longer takes the focus gives it to the walk\'s element');
    assert.equal(closed({ ...p.element('an item a rebuild replaced', false), isConnected: false }), 'the current item', 'an opener a rebuild removed gives it to the walk\'s element');
    assert.equal(closed(p.body), 'body', 'an overlay opened with the focus on nothing returns it to nothing');
    assert.equal(closed(null), 'body', 'an overlay that kept no opener moves nothing');
    // the person moved the focus out of the overlay before it closed, to an element of the page's
    p.element('the corner').focus();
    WALK.returnFocus(/** @type {any} */ (p.element('the opener')));
    assert.equal(at(), 'the corner', 'a focus the person moved to an element outside the overlay stays there');
  } finally {
    globalThis.document = platform;
  }
});
