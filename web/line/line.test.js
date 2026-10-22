// L-LINE's test against the FAKE PORT: the address display names the level
// the camera's scale reads (foundations §2.2) — at far scale the board, the
// whole board in view at its clamp; at mid the account under the camera
// (B1-S2: "THE ONE LINE reads `1.5 › 1.5.0.1`"), never the document the walk
// stands on and never a position, though the walk keeps the span a landing
// named until the re-take stands it on the document, and the account the
// camera's, not the walk's; at reading scale the document and the position the
// landing named — a mutant that names the walk's document at mid turns red, and
// so does one that drops the document form at mid~near. The LEAP box's prefill
// is the address the display names (K-30: "the box open holding the current
// address"; the box is the line's stop, opened), so the box never opens on an
// address the line does not show — a mutant whose prefill keeps a rule of its
// own (the walk's document at mid, the account the arithmetic finds at the
// whole board's centre) turns red. A restart the shell re-opened leaves the
// acting-as segment as it stood (client.md §4b.2: "no death chrome") — a
// mutant that takes the restart for a death, or re-opens it as a session no
// write may go out under, turns red. The session's own `writes` decides the
// segment: the keyless session for reading alone reads foundations §3.3
// state 3's words, over an empty key store and over one holding a key bound
// here for its principal, with no key claimed and no sign-in; a session that
// writes reads state 2, naming the label of the key it is opened with — the
// key bound here for its principal, else the store's one key (M-REC's
// `device`) — so a mutant that reads every session as state 2, or decides by
// a key bound at this board, turns red. The sign-in act bears
// its id in the guest's line and in the death arm's, as Back does, so the
// session's face standing at it finds it again as the line is rebuilt
// (O-HOST's anchor) — a mutant that drops the id from either arm turns red.
// The guest line names the board's origin where `boards()` found a board, and
// no origin where it found none (foundations §3.3 state 1: "the board and
// venue shown") — a mutant that names an origin the page never found, or
// leaves the origin's slot empty between its separators, or drops the origin
// where a board stands, turns red.
import { test, before } from 'node:test';
import assert from 'node:assert/strict';
import * as PORT from '../bridge/port.js';
import * as REC from '../model/records.js';
import * as PUMP from '../model/pump.js';
import * as F from '../model/frames.js';
import * as FAKE from '../test/fake-port.js';
import * as CAM from '../plane/camera.js';
import { docBox, accountCell, boardCell, DOC_W, REP_FS } from '../plane/projection.js';
import { lodOf } from '../plane/lod.js';
import { t } from '../strings.js';
import * as WALK from '../nav/walk.js';
import * as LINE from './line.js';

const D = '1.0.1.0.3';
// D's reads, read whole: three spans — 1 "Tumbler.\n\n" (10), 11 "The first field." (16), 27 a withheld run (4)
const script = {
  [FAKE.keyOf('op', { frame: F.retrieveDocVSpanSet(D) })]: { result: { as_of: 1, resp: 'span_set', set: [{ start: '1.1', width: '0.30' }] } },
  [FAKE.keyOf('op', { frame: F.docMetadata(D) })]: { result: { as_of: 1, resp: 'doc_metadata', doc: D, published: true, owner: '1.0.1', birth: D + '.1', birth_extent: '30', placed: null, base_extent: null, source: null } },
  [FAKE.keyOf('op', { frame: F.retrieveV(D, 1, 30) })]: { result: { as_of: 1, resp: 'delivery', items: [{ content: 'Tumbler.\n\nThe first field.' }, { withheld: { origin: '1.0.1.0.1003', width: '4' } }] } },
  [FAKE.keyOf('op', { frame: F.image(D, 1, 30) })]: { result: { as_of: 1, resp: 'runs', runs: [{ i_start: D + '.0.1.1', width: '26' }, { i_start: '1.0.1.0.1003.0.1.1', width: '4' }] } },
  [FAKE.keyOf('op', { frame: F.findLinksV(D, 1, 30) })]: { result: { as_of: 1, resp: 'addrs', addrs: [] } },
  // the edition claims on the withheld run's origin: none
  [FAKE.keyOf('op', { frame: F.editionClaimsAt('1.0.1.0.1003') })]: { result: { as_of: 1, resp: 'addrs', addrs: [] } },
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
  const account = { text: '1 › 1.0.1', addr: '1.0.1', doc: null, pos: null, member: null, whole: false };
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
  assert.deepEqual(LINE.addressDisplay(), { ...account, text: '1 › 1.0.2', addr: '1.0.2' }, 'the account under the camera, not the walk\'s');
  assert.equal(LINE.currentAddress(), '1.0.2');
});

test('at reading scale the line names the document and the position the landing named, and the box opens holding the document', async () => {
  for (const [band, scale] of /** @type {Array<[string, number]>} */ ([['mid~near', 9.5 / REP_FS], ['near', 14 / REP_FS]])) {
    over(D, scale);
    assert.equal(lodOf(CAM.cam.scale).name, band);
    await WALK.focusTo(D, 15);
    assert.deepEqual(LINE.addressDisplay(), { text: `1 › 1.0.1 › ${D} › ${t('F.position', { p: 15 })}`, addr: D, doc: D, pos: 15, member: null, whole: false }, `${band}: board › account › document › position`);
    assert.equal(LINE.currentAddress(), D, `${band}: the box holds the document`);
  }
});

test('at far scale the line names the board, the whole board in view at its clamp, and the box opens holding the board', async () => {
  const whole = CAM.viewForCell(boardCell('1'), 0.92);
  CAM.set(whole);
  assert.equal(lodOf(CAM.cam.scale).name, 'far~mid', 'WHOLE BOARD on this viewport');
  const board = { text: '1 · ' + t('B1.clamp'), addr: '1', doc: null, pos: null, member: null, whole: true };
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

test('a restart the shell re-opened leaves the acting-as segment as it stood: no signed-out words, no sign-in (client.md §4b.2)', () => {
  const was = LINE.actingSegment();
  assert.equal(was.state, 2, 'acting as, through the signed session');
  fake.fire('session-died', { session: 's-1', reason: { arm: 'restart', reopened: true, session: 's-9' } });
  assert.deepEqual(LINE.actingSegment(), was, 'the same words and state under the re-opened session');
  assert.ok(!LINE.actingSegment().html.includes('data-act="signin"'), 'no sign-in offered');
});

test('the sign-in act bears its id in the guest\'s line and in the death arm\'s, as Back does: the session\'s face standing at it finds it again as the line is rebuilt (O-HOST\'s anchor)', () => {
  const was = REC.session();
  REC.setSession(null);
  const guest = LINE.actingSegment();
  REC.sessionDied({ arm: 'closed' });
  const dead = LINE.actingSegment();
  REC.setSession(was);
  assert.deepEqual([guest.state, dead.state], [1, 5], 'a guest\'s line, then the death arm');
  for (const s of [guest, dead]) assert.equal((s.html.match(/<button[^>]*data-act="signin"[^>]*>/g) || []).join(), '<button id="line-signin" data-act="signin">', `state ${s.state}: one sign-in act, bearing its id`);
});

test('the guest line names the board\'s origin where `boards()` found a board, and no origin where it found none (foundations §3.1; §3.3 state 1, "the board and venue shown")', () => {
  const was = { board: REC.board(), session: REC.session() };
  /** the segment's words as the line shows them, its tags taken out */
  const shown = (/** @type {string} */ html) => html.replace(/<[^>]*>/g, '');
  try {
    REC.setSession(null);
    REC.setBoard(null);
    const none = LINE.actingSegment();
    assert.deepEqual([none.state, shown(none.html)], [1, `${t('B1.guest-line')} · ${t('F.venue.notebook')} ${t('F.sign-in')}`], 'no board found: the guest line and the venue, no origin and no empty slot for one');
    REC.setBoard({ board: 'b-1', name: '', origin: 'http://127.0.0.1:9000' });
    const found = LINE.actingSegment();
    assert.deepEqual([found.state, shown(found.html)], [1, `${t('B1.guest-line')} · http://127.0.0.1:9000 · ${t('F.venue.notebook')} ${t('F.sign-in')}`], 'a board found: its origin between the guest line and the venue');
  } finally {
    REC.setBoard(was.board); REC.setSession(was.session);
  }
});

test('the session\'s own `writes` decides the acting-as segment: the keyless session reads state 3\'s words over any key store, a session that writes reads state 2 with the label of the key it is opened with (foundations §3.1, §3.3; E16 (a′))', () => {
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
      const seg = LINE.actingSegment();
      assert.deepEqual([seg.state, seg.words], [3, t('F.keyless-session', { account: '1.0.1', origin: O })], `the keyless session over ${holds}: state 3's words`);
      assert.deepEqual([seg.html.includes('data-string="F.keyless-session"'), seg.html.includes('F.acting-as'), seg.html.includes('key present on this device'), seg.html.includes('data-act="signin"')], [true, false, false, false], `over ${holds}: no acting-as, no key claimed, no sign-in`);
    }
    /** @type {Array<[ReturnType<typeof key>[], string, string]>} each key store, the label of the key the session is opened with, and what the store holds */
    const signed = [[[elsewhere, here], 'dev-notebook', 'the key bound here for its principal, after one bound at another board'], [[elsewhere], 'other-board', 'the store\'s one key, bound at another board alone']];
    for (const [store, label, holds] of signed) {
      REC.takeKeyStore(store, O);
      REC.setSession({ session: 's-3', principal: 1, account: '1.0.1', writes: true });
      const seg = LINE.actingSegment();
      assert.deepEqual([seg.state, seg.words], [2, t('F.acting-as', { account: '1.0.1', N: 1, 'device label': label, origin: O })], `a session that writes over ${holds}: state 2, naming ${label}`);
    }
  } finally {
    REC.takeKeyStore([], O); REC.setBoard(was.board); REC.setSession(was.session);
  }
});
