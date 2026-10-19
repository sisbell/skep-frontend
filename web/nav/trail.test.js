// N-TRAIL's test: pushed by teleports; the departed view re-taken; Back and
// Forward move the cursor and discard nothing; a jump never pushes; a push
// behind the cursor drops the entries ahead.
import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import * as T from './trail.js';

const v = (/** @type {number} */ n) => ({ x: n, y: n, scale: 1 });
const e = (/** @type {string} */ addr, /** @type {number} */ n) => ({ addr, pos: null, view: v(n), link: null, label: null });

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
  assert.deepEqual(T.all().map((x) => x.addr), ['a', 'd']);
});
