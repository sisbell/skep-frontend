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
// its origin, the arm for the reader, C-67's clause as the origin's edition
// claims decide it — as the plane's placeholder shows them, its pointer a
// control following the owner's passing claim, for a signed-in
// reader, a guest whose device holds a key for this board and a guest with
// none, at each state of the claims: none read, none standing, the owner's
// edition standing, an edition quoting the draft alone: a mutant that names
// the owner of the document windowing the run, or the origin's account, or
// gives two readers one arm, or keeps the pointer where no claim stands, or
// leaves an empty sentence where the clause's place is empty, turns red. A document a
// read answered `withheld` is named by its withheld box's words, its owner
// the seat above a sub-account by the one owner rule: a mutant that calls it
// published, or names the sub-account, turns red. A link whose far end floats
// says so at its item, as its symbol and its stub do (R94): a mutant whose
// item says nothing of it turns red. A link's item names its far end as its
// tail and its card do (issue #132): its address alone while nothing is
// answered of its document, then the words the board's answer gives — a
// mutant that names the address alone, or speaks before an answer, turns red.
// While chrome covers the plane the tree stays inert through the rebuild —
// a mutant whose rebuild lifts the mark turns red — until the plane is
// uncovered. The focus's return as an overlay closes is the controller's
// (`focus.test.js`). THE ORDER OF MOVES, a read held while a later move is
// made: a landing in a document held in part, overtaken by a landing in
// another, sets nothing when its read answers — a mutant that sets the walk
// after the read turns red — and → on such a document at its reading scale,
// where → reads its spans, overtaken by ↑, enters nothing, the levels above
// standing as ↑ left them (a mutant whose → asks nothing turns red); ↓ onto a document whose
// extent is read before the camera follows, overtaken by a landing, flies the
// camera nowhere (a mutant that flies after the read turns red); ↓ whose
// flight a second ↓ cut short ends, the walk on the span the second reached
// (a mutant that leaves a cut flight unsettled turns red). IN A DOCUMENT
// FOLDED INTO COLUMNS (issue #15) the camera follows the walk to a span's line
// in its own column at reading size, and to the document's outline framed, no
// nearer than reading size; a re-take at reading scale takes the span in the
// column under the view's centre — a mutant that places either by the
// position's fraction of the extent down the room, frames the room, or frames
// a short document's one column past reading size turns red. THE GRAIN BELOW
// A DOCUMENT IS THE DOCUMENT'S OWN (issue #140's design decision): over a
// continuation document at the near band, its own em under the readable
// threshold, a re-take stands the walk on the document whole, collapsed, and
// → there enters nothing; at its own reading scale the re-take takes the span
// under the view's centre — a mutant that takes a span by the camera's band,
// or enters a collapsed document, turns red. Each document's item in the
// mirror says whether it is expanded or collapsed by its own em at the view
// the camera is bound for, and is marked again in place as the camera takes
// it across its threshold — a mutant that writes no `aria-expanded`, marks
// nothing in place, or reads the camera where a flight is bound elsewhere
// turns red.
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
import { accountCell, boardCell, docBox } from '../plane/projection.js';
import { lodOf, LOD_TXT_LO } from '../plane/lod.js';
import { placeOf, STANDARD_FS } from '../plane/layout.js';
import { STRINGS, t } from '../strings.js';
import { esc, byteLength } from '../util.js';
import { homeOf, resolveSpan, unitSpan } from '../model/address.js';
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
/** the account's 49th document, its first continuation's first: its room a seventh of a depth-0 document's across, its type with it */
const C1 = '1.0.1.0.49';
const C1_TEXT = 'Tumbler.\n\nThe first field.';
/** a document longer than a column: a hundred and twenty paragraphs of a line each, folded into its room's columns */
const H = '1.0.1.0.40';
const H_TEXT = Array.from({ length: 120 }, (_, i) => `Paragraph ${i + 1} of an edition longer than one column.`).join('\n\n');
// D: three spans: 1 "Tumbler.\n\n" (10), 11 "The first field." (16), 27 a withheld run (4)
const script = {
  ...reads(D, [{ content: 'Tumbler.\n\nThe first field.' }, { withheld: { origin: '1.0.1.0.1003', width: '4' } }], 30, [{ i_start: D + '.0.1.1', width: '26' }, { i_start: '1.0.1.0.1003.0.1.1', width: '4' }]),
  ...reads(E, [{ content: E_TEXT }], E_TEXT.length, [{ i_start: E + '.0.1.1', width: String(E_TEXT.length) }]),
  ...reads(G, [{ content: G_TEXT }], G_TEXT.length, [{ i_start: G + '.0.1.1', width: String(G_TEXT.length) }]),
  ...reads(H, [{ content: H_TEXT }], H_TEXT.length, [{ i_start: H + '.0.1.1', width: String(H_TEXT.length) }]),
  ...reads(C1, [{ content: C1_TEXT }], C1_TEXT.length, [{ i_start: C1 + '.0.1.1', width: String(C1_TEXT.length) }]),
  // the edition claims on D's withheld run's origin: none
  [FAKE.keyOf('op', { frame: F.editionClaimsAt('1.0.1.0.1003') })]: { result: { as_of: 1, resp: 'addrs', addrs: [] } },
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
  // the camera at G's reading scale, where → enters its spans and reads them first
  CAM.set(CAM.viewAt(LAYER.centreOf(G, null), LAYER.foldOf(REC.doc(G)).fs, 12.5));
  const text = FAKE.keyOf('op', { frame: F.retrieveV(G, 1, G_TEXT.length) }), from = fake.asked.length;
  const release = fake.hold('op', { frame: F.retrieveV(G, 1, G_TEXT.length) });
  const entering = WALK.key('in');
  await run(WALK.key('up'));
  assert.ok(fake.asked.slice(from).includes(text), '→ asked for G\'s text before ↑ overtook it');
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

/** the index listing the documents given, all of account 1.0.1 */
const index = (/** @type {string[]} */ docs) => REC.takeIndex(/** @type {any} */ ({ docs: docs.map((doc) => ({ doc, kind: 'edition', label: doc, standing: 'public' })), counts: [{ account: '1.0.1', documents: docs.length }], state: { arm: 'complete' } }));

test('nearer than mid the walk takes a span only inside a document at its own reading scale: over a continuation document at the near band a re-take stands it on the document whole, collapsed, and → there enters nothing; at the document\'s own reading scale the re-take takes the span under the view\'s centre (issue #140)', async () => {
  await PUMP.loadWhole(C1);
  index([D, E, C1]);
  try {
    const fs = LAYER.foldOf(REC.doc(C1)).fs, at = LAYER.centreOf(C1, 15);
    // the near band over the line holding position 15: the band's standard em 14 px, C1's own a seventh of it, where a click teleports
    CAM.set({ ...at, scale: 14 / STANDARD_FS });
    assert.equal(lodOf(CAM.cam.scale).name, 'near');
    assert.ok(fs * CAM.cam.scale < LOD_TXT_LO, `C1's own em ${fs * CAM.cam.scale} px, below the readable threshold`);
    await WALK.focusTo(D, 15);
    await WALK.retakeFromView(true);
    assert.deepEqual(walkAt(), ['document', C1, null], 'the re-take stands the walk on the document whole, as at mid');
    assert.equal(WALK.collapsed(), true, 'collapsed: its spans are Enter\'s act\'s');
    const view = CAM.view();
    await run(WALK.key('in'));
    assert.deepEqual(walkAt(), ['document', C1, null], '→ enters nothing');
    assert.deepEqual(CAM.view(), view, 'and flies the camera nowhere');
    // C1's own reading scale, over the same line: the re-take takes the span there
    CAM.set(CAM.viewAt(at, fs, 12.5));
    await WALK.retakeFromView(true);
    assert.deepEqual(walkAt(), ['block', C1, 11], 'the span under the view\'s centre');
    await run(WALK.key('out'));
    assert.deepEqual([...(walkAt() || []), WALK.collapsed()], ['document', C1, null, false], '← to its document at its reading scale: not collapsed');
  } finally {
    index([D, E]);
  }
});

test('the mirror\'s item at a withheld run is the run\'s placeholder: its origin\'s owner, the entitlement arm for the reader and C-67\'s clause where the origin\'s edition claims decide one, as the plane\'s placeholder shows them (R56; R94; PUB-5.124)', () => {
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
  // two edition claims of the owner's, each homed in a published edition of theirs: one over its own fresh bytes, one quoting the draft
  const R20 = '1.1.0.1.0.1.0.3.14', OWN = '1.0.1.0.9.0.2.1', QUOTES = '1.0.1.0.11.0.2.1';
  for (const [c, from] of /** @type {Array<[string, string]>} */ ([[OWN, '1.0.1.0.9.0.1.1'], [QUOTES, O + '.0.1.1']])) {
    REC.takeLink({ addr: c, from: [resolveSpan({ start: from, width: '0.0.0.0.0.0.0.20' })], to: [resolveSpan(unitSpan(O))], type: R20 });
    const home = /** @type {string} */ (homeOf(c));
    REC.takeMetadata(home, { doc: home, published: true, owner, birth: home + '.1', birthExtent: 20, placed: null, baseExtent: null, source: null, asOf: 1 });
  }
  /** @type {Array<[string, () => void, string | null, string]>} each state of the origin's claims the page holds, the words of the clause it decides, and what the plane's clause carries besides them: the pointer the claim it follows and that claim's home, a control */
  const states = [
    ['no claim read', () => REC.applyFeedUpdate({ position: 9, at: 9, op: 'nullify', docs: [], class: 'published' }), null, ''],
    ['no claim on the origin', () => REC.takeEditionClaims(O, []), null, ''],
    ['the owner\'s edition over its own bytes', () => REC.takeEditionClaims(O, [QUOTES, OWN]), t('C-67.pointer'), ` data-claim="${OWN}" data-home="1.0.1.0.9" role="button" tabindex="-1"`],
    ['an edition quoting the draft alone', () => REC.takeEditionClaims(O, [QUOTES]), t('C-67.quoting', { claimant: owner }), ''],
  ];
  const signedIn = REC.session();
  // the device's key store as `fingerprint` answers it: a key bound at this board, or none
  const ORIGIN = 'http://127.0.0.1:8642', BOUND = [{ bindings: [ORIGIN + ' principal 1 account 1.0.1'] }];
  /** @type {Array<[typeof signedIn, Array<{bindings: string[]}>, string]>} each reader, the device's keys, and the arm the rule gives them */
  const readers = [[signedIn, BOUND, 'C-36.owner-grant.arm'], [null, BOUND, 'C-36.guest.key'], [null, [], 'R56.key-absent']];
  try {
    for (const [reader, keys, id] of readers) {
      REC.setSession(reader); REC.takeKeyStore(keys, ORIGIN);
      const who = reader ? reader.account : keys.length ? 'a guest with a key for this board' : 'a guest with no key';
      const rule = entitlementArm({ account: reader ? reader.account : null, keyPresent: keys.length > 0 }, owner), arm = rule.text;
      assert.equal(rule.id, id, `${who}: the rule's arm is ${id}`);
      for (const [state, hold, clause, follows] of states) {
        hold();
        const item = WALK.nameOf({ kind: 'block', addr: W, pos: run.pos, link: null }, 1, 2);
        assert.equal(item, t('L.mirror.withheld', { document: W, width: 240, owner, origin: O, arm, clause: clause ? t('L.mirror.clause', { clause }) : '' }) + ' ' + t('L.mirror.item', { i: 2, n: 2 }),
          `${who}, ${state}: the owner of the run's origin, ${owner} — never ${W}'s account, nor ${O}'s — the arm for that owner and this reader, and the clause the claims decide`);
        assert.ok(clause ? item.includes(`${arm}. ${clause}. `) : item.includes(`${arm}. `) && !/\.\s+\./.test(item), `${who}, ${state}: the clause a sentence of its own after the arm, or nothing in its place: ${item}`);
        const html = withheldBlockHTML(run, d, LAYER.viewFor(d));
        assert.ok(html.includes(` data-owner="${owner}"`) && html.includes(`<span class="arm">${esc(arm)}</span>`) && (clause ? html.includes(`<span class="clause"${follows}>${esc(clause)}</span>`) : !html.includes('class="clause"')),
          `${who}, ${state}: the plane's placeholder shows the same owner, arm and clause, the pointer a control following the owner's passing claim: ${html}`);
      }
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

// placed last with the tests around it: it attaches a mirror of its own
test('each document\'s item in the mirror says whether it is expanded — at its own reading scale — or collapsed, read at the view the camera is bound for, and is marked again in place as the camera takes it across its threshold, nothing rebuilt (issue #140)', async () => {
  const platform = globalThis.document;
  globalThis.document = /** @type {any} */ ({ activeElement: null });
  /** @type {Array<{attrs: Record<string, string>, dataset: {addr?: string}, getAttribute: (k: string) => string | null, setAttribute: (k: string, v: string) => void}>} the items the last rebuild wrote, as elements, each marked in place */
  let items = [];
  let rebuilds = 0;
  const mirror = {
    tabIndex: 0, contains: () => false, setAttribute() {}, classList: { toggle() {} },
    get innerHTML() { return ''; },
    set innerHTML(/** @type {string} */ html) {
      rebuilds++;
      items = [...html.matchAll(/<li\b[^>]*>/g)].map((m) => {
        /** @type {Record<string, string>} */
        const attrs = Object.fromEntries([...m[0].matchAll(/ ([\w-]+)="([^"]*)"/g)].map((a) => [a[1], a[2]]));
        return { attrs, dataset: { addr: attrs['data-addr'] }, getAttribute: (k) => attrs[k] ?? null, setAttribute: (k, v) => { attrs[k] = v; } };
      });
    },
    querySelectorAll: (/** @type {string} */ sel) => (sel === 'li[aria-expanded]' ? items.filter((i) => 'aria-expanded' in i.attrs) : []),
  };
  /** each listed document's `aria-expanded`, by its address */
  const expanded = () => Object.fromEntries(items.map((i) => [i.attrs['data-addr'], i.getAttribute('aria-expanded')]));
  await PUMP.loadWhole(C1);
  index([D, E, C1]);
  try {
    WALK.attach(/** @type {any} */ (mirror));
    const fs = LAYER.foldOf(REC.doc(C1)).fs, reading = CAM.viewAt(LAYER.centreOf(C1, null), fs, 12.5);
    // the near band over D: D and E at their reading scale, C1 a seventh of their size and below its own
    const b = docBox(D);
    CAM.set({ x: b.x + b.w / 2, y: b.y + b.h / 2, scale: 14 / STANDARD_FS });
    await WALK.focusTo(C1, null);
    assert.deepEqual(expanded(), { [D]: 'true', [E]: 'true', [C1]: 'false' }, 'the rebuild: each document by its own em');
    assert.equal(WALK.collapsed(), true);
    // the camera at C1's own reading scale: its item marked expanded in place, no rebuild
    const was = rebuilds;
    CAM.set(reading);
    WALK.markExpanded();
    assert.deepEqual(expanded(), { [D]: 'true', [E]: 'true', [C1]: 'true' }, 'C1 at its reading scale: expanded');
    assert.equal(WALK.collapsed(), false);
    // a flight bound for the whole board, not yet flown: each read where the camera is bound, collapsed
    const flight = CAM.fly(CAM.viewForCell(boardCell('1'), 0.92), 300);
    WALK.markExpanded();
    assert.deepEqual(expanded(), { [D]: 'false', [E]: 'false', [C1]: 'false' }, 'bound for the whole board: every document collapsed');
    assert.equal(WALK.collapsed(), true, 'a key made during the flight acts where it lands');
    // and back at the near band, the flight cut short
    CAM.set({ x: b.x + b.w / 2, y: b.y + b.h / 2, scale: 14 / STANDARD_FS });
    assert.equal(await flight, false);
    WALK.markExpanded();
    assert.deepEqual(expanded(), { [D]: 'true', [E]: 'true', [C1]: 'false' });
    assert.equal(rebuilds, was, 'every mark made in place, nothing rebuilt');
  } finally {
    globalThis.document = platform;
    index([D, E]);
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

test('the mirror\'s item at a link names its far end as its tail and its card do: its address alone while nothing is answered of its document, then the words the board\'s answer gives (issue #132)', () => {
  const L = D + '.0.2.2', GHOST = '1.0.1.0.1049578', THEIRS = '1.0.2.0.99';
  const span = (/** @type {string} */ doc, /** @type {number} */ ord, /** @type {number} */ w) => ({ start: `${doc}.0.1.${ord}`, width: '0.0.0.0.0.0.0.' + w, doc, account: doc.split('.').slice(0, 3).join('.'), whole: false, subspace: 1, ordinal: ord, positions: w });
  REC.takeLinks(D, [L]);
  REC.takeLink({ addr: L, from: [span(D, 12, 3)], to: [span(GHOST, 1, 4)], type: '1.1.0.1.0.1.0.3.13' });
  const item = () => { const s = LK.shown(D).find((x) => x.link.addr === L); return s ? WALK.nameOf({ kind: 'link', addr: D, pos: s.pos, link: s }, 0, 1) : ''; };
  assert.equal(item(), t('L.mirror.link', { link: L, type: '1.1.0.1.0.1.0.3.13', direction: t('F.card.to'), far: GHOST, floating: '' }) + ' ' + t('L.mirror.item', { i: 1, n: 1 }), 'nothing answered: the address alone');
  REC.takeProjection(L, 2, GHOST, 'unregistered');
  assert.ok(item().includes(`${t('F.card.to')} ${GHOST} · ${t('L.far.empty')}`), `the board saying nothing of an address of the reader's own account the complete index lists nothing at: ${item()}`);
  REC.takeLink({ addr: L, from: [span(D, 12, 3)], to: [span(THEIRS, 1, 4)], type: '1.1.0.1.0.1.0.3.13' });
  REC.takeProjection(L, 2, THEIRS, 'unregistered');
  assert.ok(item().includes(`${t('F.card.to')} ${THEIRS} · ${t('L.far.unregistered')}`), `another account's: ${item()}`);
  REC.invalidate(THEIRS); REC.invalidate(GHOST);
});

// placed last: it lists a document no test above meets, and lists the index back as it found it
test('in a document folded into columns the camera follows the walk to a span\'s line in its own column at reading size, and to the document\'s outline framed no nearer than reading size; a re-take at reading scale takes the span in the column under the view\'s centre (issue #15)', async () => {
  /** two views the same, within a flight's last step's rounding */
  const near = (/** @type {{x: number, y: number, scale: number}} */ a, /** @type {{x: number, y: number, scale: number}} */ b, /** @type {string} */ what) =>
    assert.ok([a.x - b.x, a.y - b.y, a.scale - b.scale].every((d, i) => Math.abs(d) <= 1e-9 * Math.max(1, Math.abs([b.x, b.y, b.scale][i]))), `${what}: ${JSON.stringify(a)}, not ${JSON.stringify(b)}`);
  await PUMP.loadWhole(H);
  index([D, E, H]);
  try {
    const d = REC.doc(H), f = LAYER.foldOf(d), box = docBox(H);
    const columnOf = (/** @type {number} */ pos) => placeOf(f, pos).column;
    assert.ok(f.across > 2 && f.columns.length > f.across + 1, `H folds into ${f.columns.length} columns, ${f.across} across: a second row, its second column off the room's left`);
    // the span heading the second row's first column, below the middle of the room's width, and the span before it at the foot of the first row's last
    const i = d.blocks.findIndex((b) => columnOf(b.pos) === f.across), at = d.blocks[i], c = f.columns[f.across];
    assert.ok(i > 0 && columnOf(d.blocks[i - 1].pos) === f.across - 1 && c.x + c.w < box.w / 2);
    await WALK.focusTo(H, d.blocks[i - 1].pos, true);
    await run(WALK.key('down'));
    assert.deepEqual(walkAt(), ['block', H, at.pos], '↓ steps onto the span heading the next column');
    const line = placeOf(f, at.pos);
    near(CAM.view(), { x: box.x + c.x + c.w / 2, y: box.y + line.y + line.h / 2, scale: 12.5 / f.fs }, 'the camera on its line, centred across its column, at reading size');
    await run(WALK.key('out'));
    assert.deepEqual(walkAt(), ['document', H, null]);
    const s = LAYER.shapeOf(H), framed = CAM.viewForCell(s, 0.9);
    assert.ok(s.h < box.h * 0.75 && framed.scale < 12.5 / f.fs, 'its outline two rows of its room\'s, framed below reading size');
    near(CAM.view(), framed, '← to the document: its outline framed, never its room');
    // a document of one short column, framed whole, would be read far past reading size
    await WALK.focusTo(D, 11, true);
    await run(WALK.key('out'));
    near(CAM.view(), { ...CAM.viewForCell(LAYER.shapeOf(D), 0.9), scale: 12.5 / LAYER.foldOf(REC.doc(D)).fs }, '← to a document of one short column: its outline at reading size, no nearer');
    // the camera over a span part way down the second row's second column, at reading scale
    const c2 = f.columns[f.across + 1], later = d.blocks.find((b) => columnOf(b.pos) === f.across + 1 && placeOf(f, b.pos).y > c2.y + c2.h / 3);
    assert.ok(later, 'a span a third of the way down the column');
    CAM.set(CAM.viewAt(LAYER.centreOf(H, later.pos), f.fs, 12.5));
    await WALK.retakeFromView(true);
    assert.deepEqual(walkAt(), ['block', H, later.pos], 'the re-take: the span under the view\'s centre, in its column');
  } finally {
    index([D, E]);
  }
});
