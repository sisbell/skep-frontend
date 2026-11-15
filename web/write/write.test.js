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
// waiters, and keeps the edits and what the board minted of them. The stacks
// — a draft's undo and redo stacks set by the machine alone, an act telling
// it how it was made and a run's end told too, the edits an undo or a redo
// makes added as given, and the removals the deletion face stands at — are
// held here and gone at a change of class — the most text one paste
// places, with its headroom under the board's cap on a frame; bytes the
// board holds placed by identity as one act, a burst ending short of the
// rest, and a refused placing told to those watching; and a burst the board
// took in part split at the bytes it took, the text shown the same and each
// put-back naming a removal cut naming the piece that holds its bytes.
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

test('a draft\'s undo and redo stacks are held here and set by the machine alone: an act\'s edits tell the machine how they were made — a key typing at the caret and where it stood, or a step of its own — a run\'s end is told it too, and with no machine handed in no one is told; a change of the page\'s class lets the stacks go (D6 BM-31)', () => {
  const D = '1.0.1.0.2';
  REC.takeSpanSet(D, [{ subspace: 1, ordinal: 1, positions: 3 }]);
  REC.takeDelivery(D, [{ pos: 1, width: 3, kind: 'content', text: 'abc', ref: null, origin: null }]);
  assert.deepEqual([WRITE.undoOf(D), WRITE.redoOf(D)], [[], []], 'none made');
  WRITE.addEdit(D, { pos: 4, width: 0, text: 'x' }, { at: 4 });
  WRITE.endRun(D);
  assert.deepEqual([WRITE.undoOf(D), WRITE.lastAct(D)], [[], 1], 'no machine handed in: the act is counted, no step is made and no one is told of the run\'s end');
  /** @type {unknown[]} */
  const told = [];
  WRITE.machine({ commit() {}, typed: (addr, how) => told.push(['typed', addr, how]), ended: (addr) => told.push(['ended', addr]), leaving: () => false });
  WRITE.addEdit(D, { pos: 5, width: 0, text: 'y' }, { at: 5 });
  WRITE.addEdits(D, [{ pos: 1, width: 1, text: '' }]);
  WRITE.endRun(D);
  WRITE.endRun();
  assert.deepEqual(told, [['typed', D, { at: 5 }], ['typed', D, null], ['ended', D], ['ended', null]], 'a key typing at the caret tells where the caret stood; any other act tells none; a run\'s end is told, every draft\'s where none is named');
  /** @type {import('./write.js').Step} */
  const step = { id: 1, kind: 'typing', open: true, acts: [2], placed: [{ prefix: REC.pageSpace(D), ordinal: 2, width: 1 }], took: [], began: { before: [], after: [], pos: 5 }, stood: null, removal: null };
  const rev = WRITE.rev();
  WRITE.setStacks(D, [step], []);
  assert.deepEqual([WRITE.undoOf(D), WRITE.redoOf(D), WRITE.rev() > rev], [[step], [], true], 'set as the machine sets them, counted for the loop');
  WRITE.setStacks(D, [], [{ ...step, open: false }]);
  assert.deepEqual([WRITE.undoOf(D), WRITE.redoOf(D).map((x) => x.open)], [[], [false]]);
  classChanges();
  assert.deepEqual([WRITE.undoOf(D), WRITE.redoOf(D), WRITE.edits(D).length], [[], [], 3], 'a change of class lets the stacks go; the edits stand');
});

test('the edits an undo or a redo makes are added as given, one act, the machine not told: an insert naming bytes the page made before takes their own ordinals, any other the page\'s next; a removal kept only for the put-back that names it changes nothing and gives the put-back its bytes (D6 BM-32, BM-33)', () => {
  const D = '1.0.1.0.2', own = (/** @type {number} */ n) => `${D}.0.1.${n}`;
  REC.takeSpanSet(D, [{ subspace: 1, ordinal: 1, positions: 3 }]);
  REC.takeDelivery(D, [{ pos: 1, width: 3, kind: 'content', text: 'abc', ref: null, origin: null }], 7, { from: 1, runs: [{ iStart: own(1), width: 3 }] });
  /** @type {string[]} */
  const told = [];
  WRITE.machine({ commit() {}, typed: (addr) => told.push(addr), ended() {}, leaving: () => false });
  WRITE.addEdit(D, { pos: 4, width: 0, text: 'xy' });
  WRITE.dropEdits(D, () => true);
  told.length = 0;
  assert.equal(WRITE.restore(D, []), 0, 'nothing added: no act');
  const act = WRITE.restore(D, [{ pos: 4, width: 0, text: 'xy', page: 1 }, { pos: 6, width: 0, text: 'z' }]);
  assert.deepEqual([act, WRITE.edits(D).map((e) => [e.text, e.page, e.step]), told], [2, [['xy', 1, 2], ['z', 3, 2]], []], 'one act: the bytes that come back under the ordinals they had, a new byte under the page\'s next — and the machine is not told of its own act');
  // a removal the record's text holds the change of, kept only for the put-back that names it
  const took = { runs: [{ pos: 1, width: 2, kind: /** @type {const} */ ('content'), text: 'QR', ref: null, origin: null }], ids: [{ pos: 1, width: 2, prefix: `${D}.0.1`, ordinal: 90 }] };
  const n = WRITE.edits(D).length;
  WRITE.restore(D, [{ pos: 1, width: 0, text: '', based: true, took }, { pos: 1, width: 0, text: '', back: { of: n, from: 0, width: 2 } }]);
  const shown = applyEdits(REC.doc(D), WRITE.edits(D), (page, width) => REC.pageIds(D, page, width)).doc;
  assert.deepEqual([REC.textOf(shown.runs, shown.from, shown.to), REC.identityIn(shown.image, 1, 2), WRITE.edits(D)[n].based, WRITE.unsent(D)], ['QRabcxyz', [{ prefix: `${D}.0.1`, ordinal: 90, width: 2 }], true, 0],
    'the bytes it kept stand where the put-back places them, by their own identity; the removal itself changes nothing and is no burst\'s to carry');
});

test('the removals the deletion face stands at are held per draft, numbered by the draft\'s count of them in the page\'s session, let go by the one who names them and at a change of the page\'s class; and those watching are told of an undo the board declined (D6 BM-34, BM-51, BM-11)', () => {
  const D = '1.0.1.0.2', E = '1.0.1.0.3', at = (/** @type {number} */ n) => [{ prefix: `${D}.0.1`, ordinal: n, width: 1 }];
  assert.deepEqual([WRITE.removalsOf(D), WRITE.removalDocs()], [[], []]);
  const first = WRITE.addRemoval(D, { before: at(1), after: at(4), words: 'bc', ids: [{ prefix: `${D}.0.1`, ordinal: 2, width: 2 }] });
  const second = WRITE.addRemoval(D, { before: at(5), after: [], words: 'f', ids: at(6) });
  WRITE.addRemoval(E, { before: [], after: [], words: 'x', ids: [{ prefix: `${E}.0.1`, ordinal: 1, width: 1 }] });
  assert.deepEqual([first.id, second.id, WRITE.removalsOf(D).map((r) => r.words), WRITE.removalsOf(E).map((r) => r.id), WRITE.removalDocs()], [1, 2, ['bc', 'f'], [1], [D, E]], 'each draft its own, the first its 1');
  WRITE.dropRemovals(D, (r) => r.id === 1);
  assert.deepEqual([WRITE.removalsOf(D).map((r) => r.id), WRITE.addRemoval(D, { before: [], after: [], words: 'q', ids: at(9) }).id], [[2], 3], 'one let go; the count never falls, so a later removal is never the draft\'s first again');
  /** @type {Array<[string, string]>} */
  const told = [];
  WRITE.onDeclined((addr, origin) => { told.push([addr, origin]); });
  WRITE.decline(D, '1.0.2.0.5');
  assert.deepEqual(told, [[D, '1.0.2.0.5']], 'an undo the board declined is told to those watching, with the origin');
  classChanges();
  assert.deepEqual([WRITE.removalsOf(D), WRITE.removalDocs()], [[], []], 'a change of class lets them go');
});

test('one paste places at most 1 MiB of text: spelled at six bytes a byte — a control character\'s escape, the longest a frame\'s JSON spells a byte of text in — it leaves 2 MiB of the 8 MiB the board caps a frame\'s request body at (B3-S5; skep `docs/wire.md` §Transport)', () => {
  const MIB = 1024 * 1024, CAP = 8 * MIB;
  assert.equal(WRITE.PASTE_MAX_BYTES, MIB, 'the bound, in UTF-8 bytes');
  const control = String.fromCharCode(1);
  assert.deepEqual([byteLength(control), JSON.stringify(control).length - 2], [1, 6], 'a control character: one byte of text, six in JSON');
  assert.equal(CAP - WRITE.PASTE_MAX_BYTES * 6, 2 * MIB, 'the headroom left for the rest of the frame, its anchors and its envelope');
});

test('bytes the board holds placed by identity are one act of the person\'s and a step of its own — the positions replaced taken out, each stretch the board holds placed as itself by a removal kept only for the put-back after it, its new words beside them under the page\'s next ordinals — the text shown holding them at once; the machine is told the act goes out as a burst of its own, and nothing is added where nothing is placed or the draft cannot be written (B3-S5; the paste survey\'s W1)', () => {
  const D = '1.0.1.0.2', E = '1.0.1.0.5', own = (/** @type {string} */ addr, /** @type {number} */ n) => `${addr}.0.1.${n}`;
  REC.takeSpanSet(D, [{ subspace: 1, ordinal: 1, positions: 6 }]);
  REC.takeDelivery(D, [{ pos: 1, width: 6, kind: 'content', text: 'abcdef', ref: null, origin: null }], 7, { from: 1, runs: [{ iStart: own(D, 1), width: 6 }] });
  /** @type {unknown[]} */
  const told = [];
  WRITE.machine({ commit() {}, typed: (addr, how, apart) => told.push([addr, how, apart]), ended() {}, leaving: () => false });
  const took = (/** @type {string} */ text, /** @type {number} */ ordinal) => ({ runs: [{ pos: 1, width: byteLength(text), kind: /** @type {const} */ ('content'), text, ref: null, origin: null }], ids: [{ pos: 1, width: byteLength(text), prefix: `${E}.0.1`, ordinal }] });
  assert.equal(WRITE.placeSame(D, [{ took: took('XY', 4) }, { text: 'n' }, { took: took('Z', 9) }], 2, 2, { at: 4, own: 'paste' }), 4, 'four positions placed');
  const shown = applyEdits(REC.doc(D), WRITE.edits(D), (page, width) => REC.pageIds(D, page, width)).doc;
  assert.deepEqual([REC.textOf(shown.runs, shown.from, shown.to), REC.identityIn(shown.image, 2, 4)], ['aXYnZdef', [{ prefix: `${E}.0.1`, ordinal: 4, width: 2 }, { prefix: REC.pageSpace(D), ordinal: 1, width: 1 }, { prefix: `${E}.0.1`, ordinal: 9, width: 1 }]],
    'the selection "bc" replaced: the board\'s bytes by their own identity, the new word by the page\'s');
  assert.deepEqual(WRITE.edits(D).map((e) => [e.pos, e.width, e.text, e.page ?? null, e.back ? e.back.of : null, !!e.based, e.step]),
    [[2, 2, '', null, null, false, 1], [2, 0, '', null, null, true, 1], [2, 0, '', null, 1, false, 1], [4, 0, 'n', 1, null, false, 1], [5, 0, '', null, null, true, 1], [5, 0, '', null, 4, false, 1]],
    'one act: the removal, then for each stretch the board holds a removal kept for it and the put-back naming it, the new word between them');
  assert.deepEqual([WRITE.unsent(D), told], [0, [[D, { at: 4, own: 'paste' }, true]]], 'unsent from the removal on; the machine told of the act, made at the caret, going out apart');
  assert.equal(WRITE.lastWritten(), D, 'the draft last written');
  assert.deepEqual([WRITE.placeSame(D, [{ text: '' }], 1, 0), WRITE.lastAct(D)], [0, 1], 'nothing placed: no act');
  REC.setBoard({ board: 'b-1', name: '', origin: '' });
  WRITE.setUnwritable('b-1', { why: 'keyless' });
  assert.deepEqual([WRITE.placeSame(D, [{ took: took('Q', 1) }], 1, 0), WRITE.lastAct(D)], [0, 1], 'a draft that cannot be written: nothing added');
});

test('a burst carries the unsent edits up to the edit it ends before, the rest unsent for the next; and those watching are told of each placing by identity the board refused for its source, why and where (B3-S5; the paste survey\'s W3)', () => {
  const D = '1.0.1.0.2';
  REC.takeSpanSet(D, [{ subspace: 1, ordinal: 1, positions: 3 }]);
  REC.takeDelivery(D, [{ pos: 1, width: 3, kind: 'content', text: 'abc', ref: null, origin: null }]);
  WRITE.addEdits(D, [{ pos: 4, width: 0, text: 'x' }, { pos: 5, width: 0, text: 'y' }, { pos: 6, width: 0, text: 'z' }]);
  WRITE.markSent(D, 1, 2);
  assert.deepEqual([WRITE.edits(D).map((e) => e.sent ?? null), WRITE.unsent(D)], [[1, 1, null], 2], 'the first two carried, the third left for the next burst');
  WRITE.markSent(D, 2);
  assert.deepEqual(WRITE.edits(D).map((e) => e.sent ?? null), [1, 1, 2], 'with no end named, every unsent edit');
  /** @type {unknown[]} */
  const told = [];
  WRITE.onUnplaced((addr, why) => told.push([addr, why]));
  const why = { name: 'withheld', origin: '1.0.1.0.9', site: { before: [], after: [] } };
  WRITE.unplace(D, why);
  assert.deepEqual(told, [[D, why]], 'told, the draft and why');
});

/** a draft "abcdef" as a read at position 7 delivers it, each byte by its own address, and the text it shows with its edits: its words and their identity */
function sixBytes(/** @type {string} */ addr) {
  REC.takeSpanSet(addr, [{ subspace: 1, ordinal: 1, positions: 6 }]);
  REC.takeDelivery(addr, [{ pos: 1, width: 6, kind: 'content', text: 'abcdef', ref: null, origin: null }], 7, { from: 1, runs: [{ iStart: `${addr}.0.1.1`, width: 6 }] });
  return () => { const d = applyEdits(REC.doc(addr), WRITE.edits(addr), (page, width) => REC.pageIds(addr, page, width)).doc; return { text: REC.textOf(d.runs, d.from, d.to), image: d.image }; };
}
/** an edit as these tests read it: where it acts, what it removes and places, the page's ordinal, the put-back, its burst and where that was acked */
const row = (/** @type {import('../model/records.js').Edit} */ e) => [e.pos, e.width, e.text, e.page ?? null, e.back ?? null, e.sent ?? null, e.at ?? null];

test('a burst the board took in part is split at the bytes it took: the edit cut there, the part taken a burst of its own acked where it was taken and the rest the burst\'s, each piece keeping its act and the page\'s ordinals; the text shown the same byte for byte; and a put-back naming the removal cut naming the piece that holds its bytes, so it stands as the rest of the burst leaves (D6 BM-32, BM-45, BM-81)', () => {
  const D = '1.0.1.0.2', shown = sixBytes(D);
  // "cd" replaced by "XY", sent as burst 1; then, as an undo makes them, "XY" taken out and "cd" put back by the replacement's own removal
  WRITE.addEdit(D, { pos: 3, width: 2, text: 'XY' });
  WRITE.markSent(D, 1);
  WRITE.restore(D, [{ pos: 3, width: 2, text: '' }]);
  WRITE.restore(D, [{ pos: 3, width: 0, text: '', back: { of: 0, from: 0, width: 2 } }]);
  const before = shown(), rev = WRITE.editRev(D);
  assert.equal(before.text, 'abcdef');
  assert.equal(WRITE.splitSent(D, 1, [{ prefix: `${D}.0.1`, ordinal: 3, width: 2 }], 2, 20), true, 'the board took the `delete` of "cd"');
  assert.deepEqual(WRITE.edits(D).map(row), [[3, 2, '', null, null, 2, 20], [3, 0, 'XY', 1, null, 1, null], [3, 2, '', null, null, null, null], [3, 0, '', null, { of: 0, from: 0, width: 2 }, null, null]],
    'the removal of "cd" first, burst 2 acked at 20; the words "XY" burst 1\'s still; the put-back naming the removal piece');
  assert.deepEqual([shown(), WRITE.editRev(D) > rev, WRITE.edits(D).map((e) => e.step), WRITE.edits(D)[0].took], [before, true, [1, 1, 2, 3], { runs: [{ pos: 1, width: 2, kind: 'content', text: 'cd', ref: null, origin: null }], ids: [{ pos: 1, width: 2, prefix: `${D}.0.1`, ordinal: 3 }] }],
    'the text shown the same, each byte by the same identity; the change counted; every piece of the act it was made by; the removal piece keeping what it took');
  assert.equal(WRITE.splitSent(D, 1, [{ prefix: `${D}.0.1`, ordinal: 3, width: 2 }], 3, 21), false, 'nothing of burst 1 left that the bytes name: nothing marked');
  WRITE.dropEdits(D, (e) => e.sent === 1);
  assert.deepEqual([WRITE.edits(D).map(row), shown().text], [[[3, 2, '', null, null, 2, 20], [3, 0, '', null, null, null, null], [3, 0, '', null, { of: 0, from: 0, width: 2 }, null, null]], 'abcdef'],
    'the rest of the burst dropped: the put-back stands with the removal the board took, putting back what it took out');
});

test('a split cuts an edit wherever the bytes the board took begin and end in what it removed or what it placed, the part taken first — its removals, then its placements — each piece where the pieces before leave the text; a put-back naming the removal is cut where the removal\'s pieces meet; an edit the board took all of is marked whole, and bytes no edit of the burst touched mark nothing (D6 BM-32)', () => {
  const D = '1.0.1.0.2', E = '1.0.1.0.3', G = '1.0.1.0.4', shownD = sixBytes(D), shownE = sixBytes(E), shownG = sixBytes(G);
  // the board took "d" alone of the removal of "cd"
  WRITE.addEdit(D, { pos: 3, width: 2, text: 'XY' });
  WRITE.markSent(D, 1);
  WRITE.restore(D, [{ pos: 3, width: 2, text: '' }]);
  WRITE.restore(D, [{ pos: 3, width: 0, text: '', back: { of: 0, from: 0, width: 2 } }]);
  const before = shownD();
  assert.equal(WRITE.splitSent(D, 1, [{ prefix: `${D}.0.1`, ordinal: 4, width: 1 }], 2, 20), true);
  assert.deepEqual(WRITE.edits(D).map(row), [[4, 1, '', null, null, 2, 20], [3, 1, '', null, null, 1, null], [3, 0, 'XY', 1, null, 1, null], [3, 2, '', null, null, null, null],
    [3, 0, '', null, { of: 1, from: 0, width: 1 }, null, null], [4, 0, '', null, { of: 0, from: 0, width: 1 }, null, null]],
  '"d" taken out first, at 4 past "c"; then "c", then "XY"; the put-back of "cd" two, "c" from the piece holding it and "d" from the other');
  assert.deepEqual([shownD(), WRITE.edits(D).slice(0, 2).map((e) => e.took && e.took.runs.map((r) => r.text).join(''))], [before, ['d', 'c']], 'the text shown the same; each removal piece its share of what the edit took');
  // the board took the words "XY" and none of the removal of "cd"
  WRITE.addEdit(E, { pos: 3, width: 2, text: 'XY' });
  WRITE.markSent(E, 1);
  const was = shownE();
  assert.equal(WRITE.splitSent(E, 1, REC.pageIds(E, 1, 2), 2, 21), true);
  assert.deepEqual([WRITE.edits(E).map(row), shownE()], [[[3, 0, 'XY', 1, null, 2, 21], [5, 2, '', null, null, 1, null]], was], '"XY" placed first, then "cd" taken out past it: the text shown the same');
  // the board took all of an insert
  WRITE.addEdit(G, { pos: 7, width: 0, text: 'Q' });
  WRITE.markSent(G, 1);
  assert.equal(WRITE.splitSent(G, 1, [{ prefix: `${G}.0.1`, ordinal: 9, width: 1 }], 2, 22), false, 'bytes no edit of the burst touched: nothing marked');
  assert.equal(WRITE.splitSent(G, 1, REC.pageIds(G, 1, 1), 2, 22), true);
  assert.deepEqual([WRITE.edits(G).map(row), shownG().text], [[[7, 0, 'Q', 1, null, 2, 22]], 'abcdefQ'], 'taken whole: the edit as it was, marked');
});
