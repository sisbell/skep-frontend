// W-WRITE's test: the words being written are held here and never in the
// model — a draft's kept state; its page-local edits in the order made, each
// act one step, the bytes an edit makes named by the draft's next ordinals
// and a put-back making none, counted with each of M-REC's mints of their
// bytes; which of them a burst carried out and where it was acked, and the
// rebase that drops what a read holds; what D6's machine holds of a draft,
// its held lines and its flight, the machine told of each act's edits and of
// the page leaving them, its word of whether it posted the page's close handed
// back; and the draft last written — every change counted
// for the loop. A change of the page's class lets go of the kept states, the
// held lines and the draft last written, ends every flight and tells its
// waiters, and keeps the edits and what the board minted of them.
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

test('a draft\'s page-local edits are kept here in the order made and counted, applied through M-DERIVE over the delivered runs they give the typed text, the model\'s own record and its revision standing as the board served it; a clearing lets them go, and a change of class keeps them (K-72; FP-14, FP-29)', () => {
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
  assert.deepEqual([WRITE.edits(D), WRITE.editRev(D)], [[{ pos: 1, width: 0, text: 'x', page: 7, back: null, step: 3 }], before], 'a change of class keeps them as they stood: the words the class it left typed are not discarded');
  WRITE.addEdit(D, { pos: 1, width: 0, text: 'y' });
  assert.deepEqual(WRITE.edits(D).map((e) => [e.text, e.page]), [['x', 7], ['y', 8]], 'and the draft\'s ordinals count on past "typed " and "x", never used twice');
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
  assert.deepEqual([WRITE.editRev(D), WRITE.edits(D).map((e) => e.page), REC.pageIds(D, 2, 3)], [minted, [1, 3], [{ prefix: D + '.0.1', ordinal: 41, width: 3 }]],
    'a change of class keeps the edits and what the board minted of them: the count as it stood, the bytes still named by their I-addresses');
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
  /** @type {string[]} what the machine handed in was told, in order */
  const told = [];
  WRITE.commit(D);
  assert.deepEqual([WRITE.leaving('hidden'), WRITE.leaving('unload')], [false, false], 'no machine: no close posted, the page\'s close its caller\'s');
  WRITE.machine({ commit: (addr) => asked.push(addr), typed: (addr) => told.push('typed ' + addr), leaving: (how) => { told.push('leaving ' + how + (REC.session() ? ' under ' + REC.session()?.session : '')); return how === 'unload'; } });
  WRITE.commit(D);
  assert.deepEqual([asked, told], [[], []], 'no burst in flight: nothing to commit; no machine stood as the page was hidden: no one told');
  WRITE.setFlight(D, true);
  WRITE.commit(D);
  let landed = false;
  const wait = WRITE.landed(D).then(() => { landed = true; });
  await Promise.resolve();
  assert.deepEqual([asked, WRITE.inFlight(D), landed], [[D], true, false], 'in flight: the machine asked to commit the open burst, the act waiting');
  WRITE.setFlight(D, false);
  await wait;
  assert.deepEqual([WRITE.inFlight(D), landed], [false, true], 'its ack landed: the one waiting told');
  WRITE.addEdits(D, [{ pos: 1, width: 0, text: 'a' }, { pos: 2, width: 0, text: 'b' }]);
  WRITE.addEdits(D, []);
  assert.deepEqual(told, ['typed ' + D], 'the machine told once of an act\'s edits as they are added, and of no act that made none');
  assert.deepEqual([WRITE.leaving('hidden'), WRITE.leaving('unload')], [false, true], 'the machine\'s word handed back: whether it posted the page\'s close');
  assert.deepEqual(told.slice(1), ['leaving hidden', 'leaving unload'], 'and of the page hidden and unloading');
  WRITE.setHeld(D, rows);
  WRITE.setFlight(D, true);
  const dropped = WRITE.landed(D);
  classChanges();
  await dropped;
  assert.deepEqual([WRITE.inFlight(D), WRITE.heldOf(D)], [false, []], 'a change of class ends every flight, its waiters told, and drops the held lines');
  assert.deepEqual(told.slice(3), ['leaving class under s-1'], 'the machine told of the change as it begins, the session it leaves still standing');
});

test('the edits a burst carried out are marked by the machine alone — the first unsent, those sent, those acked and where — the text they make unchanged; and a read that sets the draft\'s text drops the leading edits acked at or before its position, in that step, the text shown the same (FP-23, FP-38)', () => {
  const D = '1.0.1.0.2', text = 'abc', n = byteLength(text);
  REC.takeSpanSet(D, [{ subspace: 1, ordinal: 1, positions: n }]);
  REC.takeDelivery(D, [{ pos: 1, width: n, kind: 'content', text, ref: null, origin: null }], 7);
  const shown = () => { const d = applyEdits(REC.doc(D), WRITE.edits(D)).doc; return REC.textOf(d.runs, d.from, d.to); };
  WRITE.addEdit(D, { pos: 4, width: 0, text: 'd' });
  WRITE.addEdit(D, { pos: 1, width: 0, text: 'x' });
  assert.deepEqual([WRITE.unsent(D), WRITE.unacked(D)], [0, false], 'nothing sent');
  const rev = WRITE.editRev(D);
  WRITE.markSent(D, 1);
  WRITE.addEdit(D, { pos: 3, width: 0, text: 'y' });
  assert.deepEqual([WRITE.unsent(D), WRITE.unacked(D), WRITE.edits(D).map((e) => [e.sent ?? null, e.at ?? null]), shown()], [2, true, [[1, null], [1, null], [null, null]], 'xaybcd'], 'the first burst\'s edits sent, the edit after them the open burst\'s');
  WRITE.markAcked(D, 1, 20);
  assert.deepEqual([WRITE.unacked(D), WRITE.edits(D).map((e) => e.at ?? null), WRITE.editRev(D)], [false, [20, 20, null], rev + 1], 'acked at the position the board named; the marks no change of the text the edits make');
  REC.takeDelivery(D, [{ pos: 1, width: 5, kind: 'content', text: 'xabcd', ref: null, origin: null }], 19);
  assert.equal(WRITE.edits(D).length, 3, 'a read answered before the ack holds none of them: nothing dropped');
  REC.invalidate(D);
  REC.takeDelivery(D, [{ pos: 1, width: 5, kind: 'content', text: 'xabcd', ref: null, origin: null }], 20);
  assert.deepEqual([WRITE.edits(D).map((e) => [e.pos, e.text]), shown(), WRITE.unsent(D)], [[[3, 'y']], 'xaybcd', 0], 'a read answered at the ack: the edits it holds gone as it sets the text, the open one standing, the text shown the same');
});

test('an edit a put-back names keeps what it took from the moment the put-back is added, so the put-back places it once a read holds the removal (FP-38)', () => {
  const D = '1.0.1.0.2', text = 'abcdef', n = byteLength(text);
  REC.takeSpanSet(D, [{ subspace: 1, ordinal: 1, positions: n }]);
  REC.takeDelivery(D, [{ pos: 1, width: n, kind: 'content', text, ref: null, origin: null }], 7, { from: 1, runs: [{ iStart: D + '.0.1.1', width: n }] });
  WRITE.addEdit(D, { pos: 3, width: 2, text: '' });
  assert.equal(WRITE.edits(D)[0].took ?? null, null, 'no put-back names it: nothing kept');
  WRITE.addEdits(D, [{ pos: 3, width: 0, text: '', back: { of: 0, from: 0, width: 2 } }]);
  assert.deepEqual(WRITE.edits(D)[0].took, { runs: [{ pos: 1, width: 2, kind: 'content', text: 'cd', ref: null, origin: null }], ids: [{ pos: 1, width: 2, prefix: D + '.0.1', ordinal: 3 }] }, 'the runs it removed and their identity');
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
