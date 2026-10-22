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
// The mirror's item at a withheld run is the run's placeholder — the owner of
// its origin, the arm for the reader, C-67's clause — as the plane's
// placeholder shows them, for a signed-in reader, a guest whose device holds
// a key for this board and a guest with none: a mutant that names the owner
// of the document windowing the run, or the origin's account, or gives two
// readers one arm, or drops the clause, turns red. A document a
// read answered `withheld` is named by its withheld box's words, its owner
// the seat above a sub-account by the one owner rule: a mutant that calls it
// published, or names the sub-account, turns red. A link whose far end floats
// says so at its item, as its symbol and its stub do (R94): a mutant whose
// item says nothing of it turns red.
// While chrome covers the plane the tree stays inert through the rebuild —
// a mutant whose rebuild lifts the mark turns red — until the plane is
// uncovered. The focus's return as an overlay closes is the controller's
// (`focus.test.js`). THE ORDER OF MOVES, a read held while a later move is
// made: a landing in a document held in part, overtaken by a landing in
// another, sets nothing when its read answers — a mutant that sets the walk
// after the read turns red — and → on such a document, overtaken by ↑, enters
// nothing, the levels above standing as ↑ left them; ↓ onto a document whose
// extent is read before the camera follows, overtaken by a landing, flies the
// camera nowhere (a mutant that flies after the read turns red); ↓ whose
// flight a second ↓ cut short ends, the walk on the span the second reached
// (a mutant that leaves a cut flight unsettled turns red).
import { test, before } from 'node:test';
import assert from 'node:assert/strict';
import * as PORT from '../bridge/port.js';
import * as REC from '../model/records.js';
import * as PUMP from '../model/pump.js';
import * as F from '../model/frames.js';
import * as FAKE from '../test/fake-port.js';
import * as CAM from '../plane/camera.js';
import * as LAYER from '../text/layer.js';
import { withheldBlockHTML, entitlementArm } from '../text/article.js';
import { accountCell, boardCell } from '../plane/projection.js';
import { lodOf } from '../plane/lod.js';
import { STRINGS, t } from '../strings.js';
import { esc, byteLength } from '../util.js';
import * as WALK from './walk.js';
import * as LK from '../links/links.js';

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

test('a walk key whose flight a later walk key cut short ends: the walk on the span the later key reached', async () => {
  await WALK.focusTo(D, 1);
  const first = WALK.key('down');
  const cut = CAM.cam.anim;
  assert.ok(cut, '↓ flies the camera to the span below');
  const second = WALK.key('down');
  assert.ok(CAM.cam.anim && CAM.cam.anim !== cut, 'a second ↓ flies on, cutting the first one\'s flight short');
  await run(second);
  await run(first);
  assert.deepEqual(walkAt(), ['block', D, 27]);
});

test('the mirror\'s item at a withheld run is the run\'s placeholder: its origin\'s owner, the entitlement arm for the reader and C-67\'s clause, as the plane\'s placeholder shows them (R56; R94)', () => {
  // a document of 1.0.2's windowing a run of 1.0.1.1's: an unallocated sub-account, whose owner is the seat above it
  const W = '1.0.2.0.5', O = '1.0.1.1.0.2', owner = '1.0.1';
  REC.takeOwner('1.0.1.1', { prefix: owner, principal: 900 });
  const text = 'Tumbler.\n\n', n = byteLength(text);
  REC.takeSpanSet(W, [{ subspace: 1, ordinal: 1, positions: n + 240 }]);
  REC.takeDelivery(W, [{ pos: 1, width: n, kind: 'content', text, ref: null, origin: null }, { pos: n + 1, width: 240, kind: 'withheld', text: '', ref: null, origin: O }]);
  const d = REC.doc(W), run = d.blocks[1];
  assert.deepEqual([run.kind, run.origin], ['withheld', O]);
  const words = STRINGS['L.mirror.withheld'].text;
  assert.ok(['⟨owner⟩', '⟨origin⟩', '⟨arm⟩', '⟨clause⟩'].every((k) => words.includes(k)), `the item's words carry the owner, the origin, the arm and the clause: ${words}`);
  const signedIn = REC.session();
  // the device's key store as `fingerprint` answers it: a key bound at this board, or none
  const ORIGIN = 'http://127.0.0.1:8642', BOUND = [{ bindings: [ORIGIN + ' principal 1 account 1.0.1'] }];
  /** @type {Array<[typeof signedIn, Array<{bindings: string[]}>, string]>} each reader, the device's keys, and the arm the rule gives them */
  const readers = [[signedIn, BOUND, 'C-36.owner-grant.arm'], [null, BOUND, 'C-36.guest.key'], [null, [], 'R56.key-absent']];
  try {
    for (const [reader, keys, id] of readers) {
      REC.setSession(reader); REC.takeKeyStore(keys, ORIGIN);
      const who = reader ? reader.account : keys.length ? 'a guest with a key for this board' : 'a guest with no key';
      const rule = entitlementArm({ account: reader ? reader.account : null, keyPresent: keys.length > 0 }, owner), arm = rule.text, clause = t('C-67.pointer');
      assert.equal(rule.id, id, `${who}: the rule's arm is ${id}`);
      const item = WALK.nameOf({ kind: 'block', addr: W, pos: run.pos, link: null }, 1, 2);
      assert.equal(item, t('L.mirror.withheld', { document: W, width: 240, owner, origin: O, arm, clause }) + ' ' + t('L.mirror.item', { i: 2, n: 2 }),
        `${who}: the owner of the run's origin, ${owner} — never ${W}'s account, nor ${O}'s — the arm for that owner and this reader, and the clause`);
      const html = withheldBlockHTML(run, d, LAYER.viewFor(d));
      assert.ok(html.includes(` data-owner="${owner}"`) && html.includes(`<span class="arm">${esc(arm)}</span>`) && html.includes(`<span class="clause">${esc(clause)}</span>`),
        `${who}: the plane's placeholder shows the same owner, arm and clause`);
    }
  } finally {
    REC.setSession(signedIn); REC.takeKeyStore([], ORIGIN);
  }
});

test('the mirror names a document a read answered `withheld` by its withheld box\'s words — its owner by the one owner rule — and never "published" (B1-S2)', () => {
  // a draft in 1.0.2's sub-account 1.0.2.1, withheld from the reader: its owner the seat above the sub-account
  const X = '1.0.2.1.0.2', owner = '1.0.2';
  REC.takeOwner('1.0.2.1', { prefix: owner, principal: 901 });
  REC.takeRefused(X, 'withheld');
  const box = t('B1.withheld-box', { owner });
  assert.equal(LAYER.withheldBox(REC.doc(X)), box, 'the box names the seat that owns the document, never its sub-account');
  const item = WALK.nameOf({ kind: 'document', addr: X, pos: null, link: null }, 0, 1);
  assert.ok(item.includes(box), `the item says what the box says: ${item}`);
  assert.ok(!item.includes(t('F.published')), `and never that the document is published: ${item}`);
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

test('the mirror\'s item at a link whose far end floats says "its passage is not in ⟨D⟩\'s current text", as its symbol and its stub do; one whose far end stands somewhere says nothing of it', () => {
  const L = D + '.0.2.1', FAR = '1.0.1.0.127';
  const span = (/** @type {string} */ doc, /** @type {number} */ ord, /** @type {number} */ w) => ({ start: `${doc}.0.1.${ord}`, width: '0.0.0.0.0.0.0.' + w, doc, account: '1.0.1', whole: false, subspace: 1, ordinal: ord, positions: w });
  REC.takeLinks(D, [L]);
  REC.takeLink({ addr: L, from: [span(D, 11, 3)], to: [span(FAR, 8, 4)], type: '1.1.0.1.0.1.0.3.13' });
  const item = () => { const s = LK.shown(D).find((x) => x.link.addr === L); return s ? WALK.nameOf({ kind: 'link', addr: D, pos: s.pos, link: s }, 0, 1) : ''; };
  const floating = t('L.mirror.floating', { sentence: t('F.floating', { D: FAR }) });
  REC.takeProjection(L, 2, FAR, []);
  assert.ok(item().includes(floating), item());
  REC.takeProjection(L, 2, FAR, [{ pos: 20, width: 4 }]);
  assert.ok(item() !== '' && !item().includes(t('F.floating', { D: FAR })), item());
});
