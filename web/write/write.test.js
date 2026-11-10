// W-WRITE's test: the words being written are held here and never in the
// model — a draft's kept state; its page-local edits in the order made, each
// act one step, the bytes an edit makes named by the draft's next ordinals
// and a put-back making none, counted with each of M-REC's mints of their
// bytes; what D6's machine holds of a draft, its held lines and its flight;
// and the draft last written — every change counted for the loop, and a
// change of the page's class letting go of all of it, every flight ended and
// its waiters told.
import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import * as WRITE from './write.js';
import * as REC from '../model/records.js';
import * as F from '../model/frames.js';
import { applyEdits } from '../model/derive.js';
import { byteLength } from '../util.js';

beforeEach(() => { REC._reset(); WRITE._reset(); });

/** the page's class changed as a session's death changes it (M-REC's `sessionDied`) */
function classChanges() {
  REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  REC.sessionDied({ arm: 'closed' });
}

test('a draft\'s kept state is set and read by address — the word and its reason, none a null reason — cleared with null, each setting counted for the loop and none a change of the model, and dropped with the class the page reads at (B3-S2; FP-29)', () => {
  const D = '1.0.1.0.2', E = '1.0.1.0.3';
  assert.equal(WRITE.keptOf(D), null, 'none set');
  const rev = WRITE.rev(), model = REC.rev();
  WRITE.setKept(D, { word: 'not yet kept', reason: 'the board is not answering' });
  assert.deepEqual(WRITE.keptOf(D), { word: 'not yet kept', reason: 'the board is not answering' });
  assert.deepEqual([WRITE.rev() > rev, REC.rev()], [true, model], 'counted for the loop, every surface reading it made again; the model untouched');
  WRITE.setKept(D, { word: 'kept', reason: null });
  WRITE.setKept(E, { word: 'not kept', reason: 'refused: out_of_bounds' });
  assert.deepEqual([WRITE.keptOf(D), WRITE.keptOf(E)], [{ word: 'kept', reason: null }, { word: 'not kept', reason: 'refused: out_of_bounds' }], 'each draft its own');
  WRITE.setKept(D, null);
  assert.deepEqual([WRITE.keptOf(D), WRITE.keptOf(E)], [null, { word: 'not kept', reason: 'refused: out_of_bounds' }], 'cleared with null, the other standing');
  classChanges();
  assert.equal(WRITE.keptOf(E), null, 'a change of class drops every kept state');
});

test('a draft\'s page-local edits are kept here in the order made and counted, applied through M-DERIVE over the delivered runs they give the typed text, the model\'s own record and its revision standing as the board served it, and a clearing or a change of class lets them go (K-72; FP-14, FP-29)', () => {
  const D = '1.0.1.0.2', text = 'First line.\n\nSecond.\n', n = byteLength(text);
  REC.takeSpanSet(D, [{ subspace: 1, ordinal: 1, positions: n }]);
  REC.takeDelivery(D, [{ pos: 1, width: n, kind: 'content', text, ref: null, origin: null }]);
  assert.deepEqual([WRITE.edits(D), WRITE.editRev(D)], [[], 0], 'none typed');
  const rev = WRITE.rev(), model = REC.rev();
  WRITE.addEdit(D, { pos: 7, width: 0, text: 'typed ' });
  WRITE.addEdit(D, { pos: 1, width: 6, text: '' });
  assert.deepEqual([WRITE.edits(D), WRITE.editRev(D), WRITE.rev() > rev], [[{ pos: 7, width: 0, text: 'typed ', page: 1, back: null, step: 1 }, { pos: 1, width: 6, text: '', page: null, back: null, step: 2 }], 2, true], 'in the order made, each counted and a step of its own, the bytes an edit makes named by the page\'s next ordinals, counted for the loop');
  const shown = applyEdits(REC.doc(D), WRITE.edits(D)).doc;
  assert.equal(REC.textOf(shown.runs, shown.from, shown.to), 'typed line.\n\nSecond.\n', 'the typed text: the edits applied over the delivered runs');
  assert.deepEqual([REC.textOf(REC.doc(D).runs, 1, n + 1), REC.doc(D).derived, shown.derived?.from, shown.derived?.edits, REC.rev()], [text, undefined, D, 2, model], 'the model\'s record as the board served it, its revision unmoved; the derived one named so');
  WRITE.clearEdits(D);
  assert.deepEqual([WRITE.edits(D), WRITE.editRev(D)], [[], 3], 'let go, the change counted');
  WRITE.addEdit(D, { pos: 1, width: 0, text: 'x' });
  const before = WRITE.editRev(D);
  classChanges();
  assert.deepEqual([WRITE.edits(D), WRITE.editRev(D) > before], [[], true], 'a change of class drops them, the change counted: nothing the class it left typed survives');
  WRITE.addEdit(D, { pos: 1, width: 0, text: 'y' });
  assert.equal(WRITE.edits(D)[0].page, 8, 'and the draft\'s ordinals count on past "typed " and "x", never used twice');
});

test('a draft\'s count of changes counts each of M-REC\'s mints of the bytes its edits made, whoever told the mint, so a record derived from them is made again naming them by their I-addresses (wire.md §The response envelope)', () => {
  const D = '1.0.1.0.2', text = 'First line.\n', n = byteLength(text), own = REC.pageSpace(D);
  REC.takeSpanSet(D, [{ subspace: 1, ordinal: 1, positions: n }]);
  REC.takeDelivery(D, [{ pos: 1, width: n, kind: 'content', text, ref: null, origin: null }]);
  REC.takeImage(D, 1, [{ iStart: D + '.0.1.1', width: n }]);
  WRITE.addEdit(D, { pos: 1, width: 0, text: 'ab' });
  WRITE.addEdit(D, { pos: 3, width: 0, text: 'cde' });
  assert.deepEqual(WRITE.edits(D).map((e) => e.page), [1, 3], 'each edit\'s bytes take the next ordinals of the draft');
  const derived = () => applyEdits(REC.doc(D), WRITE.edits(D), (page, width) => REC.pageIds(D, page, width)).doc;
  assert.deepEqual(REC.identityIn(derived().image, 2, 3), [{ prefix: own, ordinal: 2, width: 3 }], '"bcd", named by the page\'s identity');
  const rev = WRITE.editRev(D);
  REC.mint(D, 1, 4, D + '.0.1.40', 9);
  assert.equal(WRITE.editRev(D), rev + 1, 'the mint counted as a change of the edits');
  assert.deepEqual(REC.identityIn(derived().image, 2, 3), [{ prefix: D + '.0.1', ordinal: 41, width: 3 }], 'made again, the same bytes named by their I-addresses');
  const minted = WRITE.editRev(D);
  classChanges();
  assert.ok(WRITE.editRev(D) > minted, 'a change of class, which drops what was minted, counted on and never back');
});

test('the edits of one act are one step, and a put-back names the bytes an earlier edit removed (FP-14)', () => {
  const D = '1.0.1.0.2';
  WRITE.addEdit(D, { pos: 1, width: 3, text: '' });
  WRITE.addEdits(D, [{ pos: 5, width: 0, text: '', back: { of: 0, from: 1, width: 2 } }, { pos: 1, width: 0, text: '', back: { of: 0, from: 0, width: 1 } }]);
  WRITE.addEdits(D, []);
  assert.deepEqual(WRITE.edits(D).map((e) => [e.step, e.page, e.back]), [[1, null, null], [2, null, { of: 0, from: 1, width: 2 }], [2, null, { of: 0, from: 0, width: 1 }]], 'the two put-backs share one step, and make no byte of the page\'s own');
  assert.equal(WRITE.editRev(D), 2, 'one change counted for the act; none for an act that made no edit');
});

test('what D6\'s machine holds of a draft is set by the machine alone: its held lines as `held(session)` listed them, and whether a burst of it is in flight, which an act that names characters to the board asks to be committed and waits out; with no machine handed in nothing is in flight (B3-S2; foundations §3.1)', async () => {
  const D = '1.0.1.0.2';
  assert.deepEqual([WRITE.heldOf(D), WRITE.inFlight(D)], [[], false], 'nothing held, nothing in flight');
  let waited = false;
  await WRITE.landed(D).then(() => { waited = true; });
  assert.equal(waited, true, 'nothing in flight: landed at once');
  const rows = F.decodeHeldRows([{ held: 1, doc: D, base: 5, frame: { op: 'insert', at: { ordinal: '3', subspace: '1' }, values: ['x'] }, cause: 'unreachable', sent: false, time: 1 }]);
  assert.ok(rows);
  const rev = WRITE.rev();
  WRITE.setHeld(D, rows);
  assert.deepEqual([WRITE.heldOf(D).map((r) => [r.held, r.frame.op]), WRITE.rev() > rev], [[[1, 'insert']], true], 'the held lines, as listed, counted for the loop');
  WRITE.setHeld(D, []);
  assert.deepEqual(WRITE.heldOf(D), [], 'cleared with none');
  /** @type {string[]} */
  const asked = [];
  WRITE.commit(D);
  WRITE.machine({ commit: (addr) => asked.push(addr) });
  WRITE.commit(D);
  assert.deepEqual(asked, [], 'no burst in flight: nothing to commit');
  WRITE.setFlight(D, true);
  WRITE.commit(D);
  let landed = false;
  const wait = WRITE.landed(D).then(() => { landed = true; });
  await Promise.resolve();
  assert.deepEqual([asked, WRITE.inFlight(D), landed], [[D], true, false], 'in flight: the machine asked to commit the open burst, the act waiting');
  WRITE.setFlight(D, false);
  await wait;
  assert.deepEqual([WRITE.inFlight(D), landed], [false, true], 'its ack landed: the one waiting told');
  WRITE.setHeld(D, rows);
  WRITE.setFlight(D, true);
  const dropped = WRITE.landed(D);
  classChanges();
  await dropped;
  assert.deepEqual([WRITE.inFlight(D), WRITE.heldOf(D)], [false, []], 'a change of class ends every flight, its waiters told, and drops the held lines');
});

test('the draft last written in the page\'s session is the one whose edits were added last, an act that made none naming none, a clearing of its edits keeping it — and a change of class forgets it (issue #496\'s design decision)', () => {
  const D = '1.0.1.0.2', E = '1.0.1.0.3';
  assert.equal(WRITE.lastWritten(), null, 'nothing written yet');
  WRITE.addEdit(D, { pos: 1, width: 0, text: 'a' });
  assert.equal(WRITE.lastWritten(), D);
  WRITE.addEdits(E, [{ pos: 1, width: 0, text: 'b' }, { pos: 2, width: 0, text: 'c' }]);
  WRITE.addEdits(D, []);
  assert.equal(WRITE.lastWritten(), E, 'the draft an act last added edits to; an act that made none names none');
  WRITE.clearEdits(E);
  assert.equal(WRITE.lastWritten(), E, 'its edits let go, it is still the draft last written');
  classChanges();
  assert.equal(WRITE.lastWritten(), null, 'a change of class forgets it');
});
