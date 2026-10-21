// N-WALK's test against the FAKE PORT: a landing keeps the position it named
// inside the span it focuses — the one line's position — while a walk key's
// move names none, so stepping back onto the landing's span reads the span's
// own first position; a position no span holds is never kept. The ring is
// drawn at a landing a key made and put out by any other, and a camera move
// re-takes the focus with the ring drawn where a key made the move — a mutant
// that drops the re-take's word of the key turns red. A block of white space
// alone is no element of the walk (rule 20): the mirror lists none, and a
// landing inside one stands on the element before it — a mutant that lists
// every block turns red. A landing the index does not list stands on its
// own node, placed among the listed siblings in address order, so the mirror
// and the line name it (rule 12) — a mutant that lands on the first listed
// sibling turns red. The mirror's rebuild leaves the plane one Tab stop (D5
// §4 rule 5): the current item while it stands, the tree out of the order —
// a mutant that leaves the tree in it turns red. The tree is named from ST as
// the walk attaches it, and each level's group by its own level — a mutant
// that drops the tree's name, or names every group by one level, turns red.
// While chrome covers the plane the tree stays inert through the rebuild —
// a mutant whose rebuild lifts the mark turns red — until the plane is
// uncovered. The focus's return as an overlay closes is the controller's
// (`focus.test.js`). THE ORDER OF MOVES, a read held while a later move is
// made: a landing in a document held in part, overtaken by a landing in
// another, sets nothing when its read answers — a mutant that sets the walk
// after the read turns red — and → on such a document, overtaken by ↑, enters
// nothing, the levels above standing as ↑ left them; ↓ onto a document whose
// extent is read before the camera follows, overtaken by a landing, flies the
// camera nowhere (a mutant that flies after the read turns red).
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
/** a second document: a separator alone, then a span, a block of one space, a span — two elements of the walk among four blocks */
const E = '1.0.1.0.5';
const E_TEXT = '\n\nSecond.\n\n \n\nThird.';
/** the reads of a document read whole: its extent, its metadata, its text, its image, its links (none) */
const reads = (/** @type {string} */ doc, /** @type {Array<Record<string, unknown>>} */ items, /** @type {number} */ extent, /** @type {Array<Record<string, string>>} */ runs) => ({
  [FAKE.keyOf('op', { frame: F.retrieveDocVSpanSet(doc) })]: { result: { as_of: 1, resp: 'span_set', set: [{ start: '1.1', width: '0.' + extent }] } },
  [FAKE.keyOf('op', { frame: F.docMetadata(doc) })]: { result: { as_of: 1, resp: 'doc_metadata', doc, published: true, owner: '1.0.1', birth: doc + '.1', birth_extent: String(extent), placed: null, base_extent: null, source: null } },
  [FAKE.keyOf('op', { frame: F.retrieveV(doc, 1, extent) })]: { result: { as_of: 1, resp: 'delivery', items } },
  [FAKE.keyOf('op', { frame: F.image(doc, 1, extent) })]: { result: { as_of: 1, resp: 'runs', runs } },
  [FAKE.keyOf('op', { frame: F.findLinksV(doc, 1, extent) })]: { result: { as_of: 1, resp: 'addrs', addrs: [] } },
});
/** a third document, held in part as the viewport's read leaves it — its extent and its first paragraph — the rest of its text read on the walk's ask */
const G = '1.0.1.0.7';
const G_TEXT = 'First.\n\nSecond.\n\nThird.';
// D: three spans: 1 "Tumbler.\n\n" (10), 11 "The first field." (16), 27 a withheld run (4)
const script = {
  ...reads(D, [{ content: 'Tumbler.\n\nThe first field.' }, { withheld: { origin: '1.0.1.0.1003', width: '4' } }], 30, [{ i_start: D + '.0.1.1', width: '26' }, { i_start: '1.0.1.0.1003.0.1.1', width: '4' }]),
  ...reads(E, [{ content: E_TEXT }], E_TEXT.length, [{ i_start: E + '.0.1.1', width: String(E_TEXT.length) }]),
  ...reads(G, [{ content: G_TEXT }], G_TEXT.length, [{ i_start: G + '.0.1.1', width: String(G_TEXT.length) }]),
};

/** @type {ReturnType<typeof FAKE.create>} */
let fake;

/** G as the viewport's read leaves it: its extent and its first paragraph, the rest unread */
function partly() {
  REC.invalidate(G);
  REC.takeSpanSet(G, F.decodeSpanSet({ resp: 'span_set', set: [{ start: '1.1', width: '0.' + G_TEXT.length }] }));
  REC.takeDelivery(G, F.decodeDelivery({ resp: 'delivery', items: [{ content: 'First.\n\n' }] }, 1));
}
/** the walk's element: its kind, its place, its position */
const walkAt = () => { const f = WALK.current(); return f && [f.kind, f.addr, f.pos]; };

/** a walk move run to its end: the flight it starts stepped to its last frame */
async function run(/** @type {Promise<unknown>} */ move) {
  let done = false;
  move.then(() => { done = true; });
  for (let i = 0; i < 100 && !done; i++) { await new Promise((r) => setTimeout(r, 0)); if (CAM.flying()) CAM.step(Infinity); }
  assert.ok(done, 'the move ran to its end');
}

before(async () => {
  REC._reset();
  fake = FAKE.create(script);
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.setBoard({ board: 'b-1', name: '', origin: '' }); REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  REC.takeIndex(/** @type {any} */ ({ docs: [{ doc: D, kind: 'edition', label: 'd', standing: 'public' }, { doc: E, kind: 'edition', label: 'e', standing: 'public' }], counts: [{ account: '1.0.1', documents: 2 }], state: { arm: 'complete' } }));
  CAM.setViewport(1440, 900);
  await PUMP.loadWhole(D);
  await PUMP.loadWhole(E);
  assert.deepEqual(REC.doc(D).blocks.map((b) => b.pos), [1, 11, 27]);
  assert.deepEqual(REC.doc(E).blocks.map((b) => [b.pos, b.text]), [[1, ''], [3, 'Second.'], [12, ' '], [15, 'Third.']], 'E holds two blocks of white space among its spans');
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

test('a block of white space alone is no element of the walk; a landing inside one stands on the element before it (rule 20)', async () => {
  await WALK.focusTo(E, 4);
  assert.deepEqual(WALK.siblingsNow().map((n) => n.pos), [3, 15], 'the walk holds the two spans; the separator and the space are no elements');
  assert.equal(WALK.current()?.pos, 3);
  await WALK.focusTo(E, 13);
  assert.equal(WALK.current()?.pos, 3, 'a landing in the block of one space stands on the span before it');
  assert.equal(WALK.landedAt(), null, 'and keeps no position: the span does not hold it');
  await WALK.focusTo(E, 1);
  assert.equal(WALK.current()?.pos, 3, 'a landing in the leading separator, with no element before it, stands on the first span');
  await run(WALK.key('down'));
  assert.equal(WALK.current()?.pos, 15, '↓ steps over the space to the next span');
});

test('a landing the index does not list stands on its own node among the listed siblings, in address order (rule 12)', async () => {
  await WALK.focusTo('1.0.1.0.4', null);
  assert.deepEqual(WALK.siblingsNow().map((n) => n.addr), [D, '1.0.1.0.4', E], 'the document placed between the two the index lists');
  assert.deepEqual([WALK.current()?.kind, WALK.current()?.addr], ['document', '1.0.1.0.4'], 'the focus on its own node, never a listed sibling');
  await WALK.focusTo('1.0.9.0.1', null);
  assert.deepEqual([WALK.current()?.kind, WALK.current()?.addr], ['document', '1.0.9.0.1']);
  assert.deepEqual(WALK.siblingsNow().map((n) => n.addr), ['1.0.9.0.1'], 'an account the index lists nothing for: the document its own level\'s one node');
  await run(WALK.key('out'));
  assert.deepEqual([WALK.current()?.kind, WALK.current()?.addr], ['account', '1.0.9'], '← walks out to the account, itself placed among the listed accounts');
  assert.deepEqual(WALK.siblingsNow().map((n) => n.addr), ['1.0.1', '1.0.9']);
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

test('a landing whose read a later move overtook sets nothing when the read answers: the walk stands where the later move put it', async () => {
  partly();
  const release = fake.hold('op', { frame: F.retrieveV(G, 1, G_TEXT.length) });
  const first = WALK.focusTo(G, 10);
  await WALK.focusTo(D, 15);
  release();
  await first;
  assert.equal(REC.doc(G).to, G_TEXT.length + 1, 'G\'s text was read whole');
  assert.deepEqual(walkAt(), ['block', D, 11], 'the walk on the span the later landing named');
  assert.equal(WALK.landedAt(), 15, 'and its position');
  assert.deepEqual(fake.unanswered, []);
});

test('→ whose read a later walk key overtook enters nothing when the read answers', async () => {
  partly();
  await WALK.focusTo(G, null);
  assert.deepEqual(WALK.siblingsNow().map((n) => n.addr), [D, E, G]);
  const release = fake.hold('op', { frame: F.retrieveV(G, 1, G_TEXT.length) });
  const entering = WALK.key('in');
  await run(WALK.key('up'));
  release();
  await run(entering);
  assert.deepEqual(walkAt(), ['document', E, null], 'the walk where ↑ put it, not inside G');
  assert.deepEqual(WALK.siblingsNow().map((n) => n.addr), [D, E, G]);
  await run(WALK.key('out'));
  assert.deepEqual(walkAt(), ['account', '1.0.1', null], '← walks out to the account: the levels above stand as ↑ left them');
  assert.deepEqual(fake.unanswered, []);
});

test('a walk key whose flight waits on a read flies the camera nowhere once a later move overtook it', async () => {
  partly();
  await WALK.focusTo(G, null);
  await run(WALK.key('up'));
  REC.invalidate(G);
  const release = fake.hold('op', { frame: F.retrieveDocVSpanSet(G) });
  const stepping = WALK.key('down');
  assert.deepEqual(walkAt(), ['document', G, null], '↓ moved the walk onto G, its extent read before the camera follows');
  await WALK.focusTo(D, 15);
  const at = CAM.view();
  release();
  await run(stepping);
  assert.deepEqual(walkAt(), ['block', D, 11]);
  assert.deepEqual(CAM.view(), at, 'the camera where the later landing left it');
  assert.deepEqual(fake.unanswered, []);
});

/** the ids of the mirror's items at tabindex 0, read from the markup the rebuild wrote */
const itemStops = (/** @type {string} */ html) => [...html.matchAll(/<li\b[^>]*>/g)].filter((m) => / tabindex="0"/.test(m[0])).map((m) => (/ id="([^"]*)"/.exec(m[0]) || [])[1]);

// placed last: it attaches a mirror, which every test above runs without
test('the plane is one Tab stop: the current item while it stands, the tree out of the order — a landing the index does not list included', async () => {
  const platform = globalThis.document;
  globalThis.document = /** @type {any} */ ({ activeElement: null }); // the platform's focus on none of the mirror
  const mirror = { innerHTML: '', tabIndex: 0, contains: () => false, setAttribute() {}, classList: { toggle() {} } };
  WALK.attach(/** @type {any} */ (mirror));
  try {
    await WALK.focusTo(D, 15);
    assert.deepEqual(itemStops(mirror.innerHTML), ['walk-' + WALK.mirrorIndex()], 'the current item alone of the items is in the order');
    assert.equal(mirror.tabIndex, -1, 'the tree is out of the order while its current item stands');
    // a document in an account the index lists nothing for: its own node is the level's one item, and the stop
    await WALK.focusTo('1.0.9.0.1', null);
    assert.equal(WALK.mirrorSize(), 1);
    assert.deepEqual(itemStops(mirror.innerHTML), ['walk-0']);
    assert.equal(mirror.tabIndex, -1, 'the item is the stop, the tree out of the order');
    assert.ok(mirror.innerHTML.includes('1.0.9.0.1'), 'the mirror names the place landed on');
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
  const mirror = { innerHTML: '', tabIndex: 0, contains: () => false, setAttribute: (/** @type {string} */ k, /** @type {string} */ v) => { attrs[k] = v; }, classList: { toggle() {} } };
  /** the group's name, read from the markup the rebuild wrote */
  const group = () => (/<ul role="group" aria-label="([^"]*)">/.exec(mirror.innerHTML) || [])[1];
  try {
    WALK.attach(/** @type {any} */ (mirror));
    assert.equal(attrs['aria-label'], t('L.mirror-label'), 'the tree, named as it is attached');
    await WALK.focusTo(D, 15);
    assert.equal(group(), t('L.mirror-level', { n: 4 }), 'a span\'s group: board › account › document › span');
    assert.ok(mirror.innerHTML.includes(t('L.mirror.item', { i: 2, n: 3 })), 'each item named from ST: its place in the set');
    await WALK.focusTo(D, null);
    assert.equal(group(), t('L.mirror-level', { n: 3 }), 'a document\'s group');
  } finally {
    globalThis.document = platform;
  }
});

// placed last with the tests around it: it attaches a mirror of its own
test('while chrome covers the plane the tree is inert, through the rebuild, until the plane is uncovered', async () => {
  const platform = globalThis.document;
  globalThis.document = /** @type {any} */ ({ activeElement: null });
  const mirror = { innerHTML: '', tabIndex: 0, inert: false, contains: () => false, setAttribute() {}, classList: { toggle() {} } };
  try {
    WALK.attach(/** @type {any} */ (mirror));
    WALK.cover(true);
    await WALK.focusTo(D, 15);
    assert.ok(mirror.innerHTML.includes('role="treeitem"'), 'the landing rebuilt the tree');
    assert.equal(mirror.inert, true, 'the rebuild keeps the tree out of the order while the plane is covered');
    WALK.cover(false);
    assert.equal(mirror.inert, false, 'uncovered: the tree back in the order');
  } finally {
    globalThis.document = platform;
  }
});
