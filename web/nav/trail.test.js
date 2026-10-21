// N-TRAIL's test: pushed by teleports; the departed view re-taken; Back and
// Forward move the cursor and discard nothing; a jump never pushes; a push
// behind the cursor drops the entries ahead. THE CLAIM: it stands where it
// was pushed, and a departure from it re-takes nothing while it reads (a
// mutant that re-takes a claim's view turns red); settled, it keeps its
// place and takes its landing, what its push dropped staying dropped;
// withdrawn as the newest, the entries its push dropped come back and a
// cursor on it stands on the entry before (a mutant that forgets them turns
// red); withdrawn behind a later push, it takes only itself out; and one a
// later claim's push dropped is put back by no withdrawal (a mutant that
// leaves it among the dropped turns red), while one settled meanwhile comes
// back at its landing.
import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import * as T from './trail.js';

const v = (/** @type {number} */ n) => ({ x: n, y: n, scale: 1 });
const e = (/** @type {string} */ addr, /** @type {number} */ n) => ({ addr, pos: null, width: null, view: v(n), link: null, label: null });
const addrs = () => T.all().map((x) => x.addr);

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

test('a claim stands where it was pushed and is re-taken by no departure while it reads; settled, it keeps its place and takes its landing, what its push dropped staying dropped', () => {
  T.push(e('a', 1), null); T.push(e('b', 2), null); T.push(e('c', 3), null);
  T.back(null);
  const claim = T.push(e('x', 4), v(20), true);
  assert.deepEqual(addrs(), ['a', 'b', 'x'], 'pushed as it is made, the entry ahead dropped');
  assert.equal(T.all()[1].view.x, 20, 'the entry departed re-taken');
  assert.equal(T.current(), claim, 'the entry as the trail holds it');
  assert.ok(T.pending(claim), 'a claim standing unanswered');
  assert.equal(T.back(v(30))?.addr, 'b');
  T.forward(v(40));
  assert.equal(T.jump(2, v(50))?.addr, 'b');
  T.forward(v(60));
  T.push(e('y', 5), v(70));
  assert.equal(claim.view.x, 4, 'no departure re-takes a claim\'s view: the camera never landed there');
  T.settle(claim, { view: v(9), pos: 7, width: 2 });
  assert.equal(T.pending(claim), null, 'answered');
  assert.deepEqual([claim.view.x, claim.pos, claim.width], [9, 7, 2], 'its landing');
  assert.deepEqual(addrs(), ['a', 'b', 'x', 'y'], 'in its place; c stays dropped');
  T.back(v(80)); T.back(v(90));
  assert.equal(claim.view.x, 90, 'settled, it is re-taken as any entry is');
});

test('a withdrawn claim that was the newest leaves the trail as its push found it, a cursor on it on the entry before; its waiters woken', async () => {
  T.push(e('a', 1), null); T.push(e('b', 2), null); T.push(e('c', 3), null);
  T.back(null);
  const claim = T.push(e('x', 4), null, true);
  const answered = T.pending(claim);
  T.withdraw(claim);
  assert.deepEqual(addrs(), ['a', 'b', 'c'], 'the entry its push dropped put back');
  assert.equal(T.current()?.addr, 'b');
  assert.equal(T.pending(claim), null);
  await answered;
  // a cursor behind the claim stays where it stands
  const again = T.push(e('x', 4), null, true);
  T.back(null); T.back(null);
  T.withdraw(again);
  assert.deepEqual(addrs(), ['a', 'b', 'c']);
  assert.equal(T.current()?.addr, 'a');
});

test('a withdrawn claim a later push stands after takes only itself out, a cursor past it staying on its entry', () => {
  T.push(e('a', 1), null); T.push(e('b', 2), null); T.push(e('c', 3), null);
  T.back(null);
  const claim = T.push(e('x', 4), null, true);
  T.push(e('y', 5), null);
  T.withdraw(claim);
  assert.deepEqual(addrs(), ['a', 'b', 'y'], 'c stays dropped: a push from b drops it too');
  assert.equal(T.current()?.addr, 'y');
});

test('a claim a later claim\'s push dropped is put back by no withdrawal; one settled meanwhile comes back at its landing', () => {
  T.push(e('a', 1), null);
  const first = T.push(e('x', 2), null, true);
  T.back(null);
  const second = T.push(e('y', 3), null, true);
  assert.deepEqual(addrs(), ['a', 'y']);
  T.withdraw(first);
  T.withdraw(second);
  assert.deepEqual(addrs(), ['a'], 'the first came to nothing: nothing puts it back');
  assert.equal(T.current()?.addr, 'a');
  const third = T.push(e('x', 2), null, true);
  T.back(null);
  const fourth = T.push(e('y', 3), null, true);
  T.settle(third, { view: v(9) });
  T.withdraw(fourth);
  assert.deepEqual(T.all().map((x) => [x.addr, x.view.x]), [['a', 1], ['x', 9]], 'the settled one put back, at its landing');
});

test('a reset wakes every move waiting on a claim', async () => {
  const claim = T.push(e('x', 1), null, true);
  const answered = T.pending(claim);
  T._reset();
  await answered;
  assert.equal(T.current(), null);
});
