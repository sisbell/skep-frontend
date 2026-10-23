// N-TRAIL's test: pushed by teleports; the departed view re-taken; Back and
// Forward move the cursor and discard nothing; a jump never pushes; a push
// behind the cursor drops the entries ahead. THE CLAIM: it stands where it
// was pushed, and a departure from it re-takes nothing while it reads (a
// mutant that re-takes a claim's view turns red); settled with a place, it
// keeps its place and takes its landing, its reading notice taken off (a
// mutant that leaves the reading notice standing turns red), what its push
// dropped staying dropped. Settled with a notice (issue #136's design
// decision), whether the cursor stands on it or a Back left it while it read,
// it keeps its place and the number it took as it was pushed, holding the
// notice at the view its push left, the cursor where the last move put it,
// and nothing its push dropped comes back — so one Back from it returns to
// the entry the jump was made from and a second goes one further either way
// (a mutant that hands the entry back, or puts the dropped entries back,
// turns red). THE STEP (issue #152's design decision): a push writes the step
// it takes on the entry it departs, in the place of any that entry held, and
// none where it takes none or departs a claim (a mutant that writes the step
// on the entry pushed, keeps the step an entry held, or writes one on a claim
// turns red); a cursor move writes none. A reset wakes every move waiting on
// a claim.
// A departure re-takes the place of the cursor's entry — the version its box
// shows then — and never a claim's (issue #154: a newer version's arrival
// pins a box on the member being read).
import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import * as T from './trail.js';

/** @typedef {import('./trail.js').Notice} Notice */

const v = (/** @type {number} */ n) => ({ x: n, y: n, scale: 1 });
const e = (/** @type {string} */ addr, /** @type {number} */ n) => ({ addr, pos: null, width: null, view: v(n), label: null, notice: null });
const addrs = () => T.all().map((x) => x.addr);
/** @type {Notice} a jump's reading notice, as its claim holds it while its read is out */
const reading = { face: 'reading', addr: 'x', refusal: null, site: null, at: { addr: 'b', pos: null }, offer: false };
/** @type {Notice} what its read brought where it brought no place: the fifth cell */
const faced = { ...reading, face: 'unregistered' };

beforeEach(() => T._reset());

test('push, back, forward: the cursor moves and nothing is dropped', () => {
  T.push(e('a', 1), null); T.push(e('b', 2), v(10)); T.push(e('c', 3), v(20));
  assert.equal(T.all()[0].view.x, 10, 'the departed view re-taken on a');
  assert.equal(T.back(v(30))?.addr, 'b');
  assert.equal(T.all()[2].view.x, 30);
  assert.equal(T.back(null)?.addr, 'a');
  assert.equal(T.back(null), null);
  assert.equal(T.forward(null)?.addr, 'b');
  assert.equal(T.length(), 3);
});

test('numbered newest-first; a jump is a cursor move', () => {
  T.push(e('a', 1), null); T.push(e('b', 2), null); T.push(e('c', 3), null);
  assert.deepEqual(T.numbered().map((r) => [r.n, r.entry.addr]), [[1, 'c'], [2, 'b'], [3, 'a']]);
  assert.equal(T.jump(3, null)?.addr, 'a');
  assert.equal(T.length(), 3);
  assert.equal(T.cursorIndex(), 0);
});

test('a fresh teleport behind the cursor drops the entries ahead', () => {
  T.push(e('a', 1), null); T.push(e('b', 2), null); T.push(e('c', 3), null);
  T.back(null); T.back(null);
  T.push(e('d', 4), null);
  assert.deepEqual(addrs(), ['a', 'd']);
});

test('a claim stands where it was pushed and is re-taken by no departure while it reads; settled with a place, it keeps its place and takes its landing, its reading notice taken off, what its push dropped staying dropped', () => {
  T.push(e('a', 1), null); T.push(e('b', 2), null); T.push(e('c', 3), null);
  T.back(null);
  const claim = T.push({ ...e('x', 4), notice: reading }, v(20), true);
  assert.deepEqual(addrs(), ['a', 'b', 'x'], 'pushed as it is made, the entry ahead dropped');
  assert.equal(T.all()[1].view.x, 20, 'the entry departed re-taken');
  assert.equal(T.current(), claim, 'the entry as the trail holds it');
  assert.ok(T.pending(claim), 'a claim standing unanswered');
  assert.equal(claim.notice, reading, 'holding its reading notice while it reads');
  assert.equal(T.back(v(30))?.addr, 'b');
  T.forward(v(40));
  assert.equal(T.jump(2, v(50))?.addr, 'b');
  T.forward(v(60));
  T.push(e('y', 5), v(70));
  assert.equal(claim.view.x, 4, 'no departure re-takes a claim\'s view: the camera never landed there');
  T.settle(claim, { view: v(9), pos: 7, width: 2 });
  assert.equal(T.pending(claim), null, 'answered');
  assert.deepEqual([claim.view.x, claim.pos, claim.width, claim.notice], [9, 7, 2, null], 'its landing, and no notice: the read brought a place');
  assert.deepEqual(addrs(), ['a', 'b', 'x', 'y'], 'in its place; c stays dropped');
  T.back(v(80)); T.back(v(90));
  assert.equal(claim.view.x, 90, 'settled, it is re-taken as any entry is');
});

test('a claim answered with a notice keeps its place and its number, holding the notice at the view its push left — answered with the cursor on it, or after a Back left it while it read; nothing its push dropped comes back, and one Back from it returns to the entry it was made from either way', async () => {
  for (const left of [false, true]) {
    T._reset();
    T.push(e('a', 1), null); T.push(e('b', 2), null); T.push(e('c', 3), null);
    T.back(v(30));
    const claim = T.push({ ...e('x', 4), notice: reading }, v(20), true);
    const answered = T.pending(claim);
    if (left) assert.equal(T.back(v(40))?.addr, 'b', 'a Back while it reads: the cursor on the entry the jump was made from');
    T.settle(claim, { view: v(20), notice: faced });
    await answered;
    const was = left ? 'answered after a Back left it' : 'answered with the cursor on it';
    assert.deepEqual(addrs(), ['a', 'b', 'x'], `${was}: its place kept, and c, which its push dropped, stays dropped`);
    assert.deepEqual(T.numbered().map((r) => [r.n, r.entry.addr]), [[1, 'x'], [2, 'b'], [3, 'a']], `${was}: its number the one it took as it was pushed`);
    assert.deepEqual([claim.notice, claim.view.x, T.pending(claim)], [faced, 20, null], `${was}: holding the notice at the view its push left, answered`);
    assert.equal(T.cursorIndex(), left ? 1 : 2, `${was}: the cursor where the last move put it`);
    if (!left) assert.equal(T.back(v(50))?.addr, 'b', `${was}: one Back returns to the entry it was made from`);
    assert.equal(T.back(v(60))?.addr, 'a', `${was}: a second goes one entry further`);
    assert.equal(T.forward(v(70))?.addr, 'b');
    assert.equal(T.forward(v(80)), claim, `${was}: Forward returns to it`);
  }
});

test('a push writes the step it takes on the entry it departs, and the newest holds none; a push from behind the newest writes its own in the place of the one that entry held; a claim departed, and a move that takes no step, leave none; a cursor move writes none (issue #152)', () => {
  /** @type {import('./trail.js').Step} */
  const follow = { kind: 'follow', link: 'a.0.2.1', near: 'a', key: 'k', far: 'b', spans: [{ prefix: 'b.0.1', ordinal: 3, width: 4 }] };
  /** @type {import('./trail.js').Step} */
  const carry = { kind: 'carry', from: 'b', to: 'c', spans: [{ prefix: 'b.0.1', ordinal: 9, width: 2 }] };
  /** @type {import('./trail.js').Step} */
  const again = { ...carry, to: 'x' };
  const steps = () => T.all().map((x) => x.step);
  T.push(e('a', 1), null); T.push(e('b', 2), v(10), false, follow); T.push(e('c', 3), v(20), false, carry); T.push(e('d', 4), v(30));
  assert.deepEqual(steps(), [follow, carry, null, null], 'each entry the step that left it: a follow, a carry, a move that takes none; the newest none, nothing having left it');
  T.back(v(40)); T.back(v(50)); T.forward(v(60)); T.jump(4, v(70));
  assert.deepEqual(steps(), [follow, carry, null, null], 'a cursor move writes none');
  T.jump(3, v(80));
  T.push(e('x', 5), v(90), false, again);
  assert.deepEqual([addrs(), steps()], [['a', 'b', 'x'], [follow, again, null]], 'from behind the newest: b holds the step taken from it now, the entries ahead dropped');
  const claim = T.push(e('y', 6), v(100), true);
  T.push(e('z', 7), v(110), false, follow);
  assert.deepEqual([steps()[2], claim.step], [null, null], 'x departed by a move that takes no step, and the claim departed before its read answered — the camera never stood there: none');
});

test('the cursor\'s entry\'s place re-taken as it is departed — the version its box shows then — never a claim\'s (issue #154)', () => {
  T.push(e('d', 1), null);
  T.retakePlace('d.2');
  assert.deepEqual(addrs(), ['d.2'], 'the version its box shows');
  T.push({ ...e('f', 2), notice: reading }, v(1), true);
  T.retakePlace('f.3');
  assert.deepEqual(addrs(), ['d.2', 'f'], 'a claim keeps the place its jump named');
});

test('a reset wakes every move waiting on a claim', async () => {
  const claim = T.push(e('x', 1), null, true);
  const answered = T.pending(claim);
  T._reset();
  await answered;
  assert.equal(T.current(), null);
});
