// SC's test: the two ends the scene sets level (foundations §2.5: "position
// carries the match") — the held passage's first stretch of shared identity
// and its counterpart, never the first pair where the held passage lies past
// it (a mutant that levels the second pane at `compare`'s first pair turns
// red); a far end the opener names, as given; with nothing held, the first
// pair; with nothing shared, the second pane at its top — and the runs the
// bands are drawn from, contiguous pairs one run.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { levels, merged } from './scene.js';

/** @returns {import('../model/frames.js').ComparePair} */
const pair = (/** @type {number} */ u1, /** @type {number} */ u2, /** @type {number} */ width) => ({ d1: '1.0.1.0.3', d2: '1.0.1.0.3.2', u1, u2, width });
// the first edition beside its latest version: its text to 1466, the window run 1467–1706, its last stretch from 1707
const runs = [pair(1, 1, 1466), pair(1467, 1467, 240), pair(1707, 1707, 23)];

test('the held passage is set level at its first shared position and that position\'s counterpart', () => {
  assert.deepEqual(levels(runs, { posA: 541, widthA: 1130 }), { a: 541, b: 541 }, 'a paragraph inside the first run: level at its own start in both');
  assert.deepEqual(levels(runs, { posA: 1500, widthA: 40 }), { a: 1500, b: 1500 }, 'a passage inside the second run, never the first pair\'s 1');
  const moved = [pair(1, 101, 1466), pair(1467, 9, 240)];
  assert.deepEqual(levels(moved, { posA: 1480, widthA: 10 }), { a: 1480, b: 22 }, 'the counterpart where the second document arranges the run elsewhere');
  assert.deepEqual(levels(moved, { posA: 1400, widthA: 100 }), { a: 1400, b: 1500 }, 'the first stretch the held passage shares, from the held position');
  assert.deepEqual(levels([pair(1467, 1, 240)], { posA: 541, widthA: 1130 }), { a: 1467, b: 1 }, 'a held paragraph whose shared stretch starts inside it: level at that stretch');
});

test('a far end the opener names is used as given', () => {
  assert.deepEqual(levels(runs, { posA: 951, widthA: 4, posB: 12 }), { a: 951, b: 12 });
  assert.deepEqual(levels([], { posA: 951, posB: 3 }), { a: 951, b: 3 });
});

test('with nothing held, the first pair\'s two ends; with nothing shared, the second pane at its top', () => {
  assert.deepEqual(levels([pair(1467, 1, 240)]), { a: 1467, b: 1 });
  assert.deepEqual(levels([pair(900, 40, 10), pair(1467, 1, 240)].reverse()), { a: 900, b: 40 }, 'the first in the first document\'s order');
  assert.deepEqual(levels([]), { a: null, b: null });
  assert.deepEqual(levels([pair(1467, 1, 240)], { posA: 20, widthA: 30 }), { a: 20, b: null }, 'a held passage that shares nothing: the second pane at its top');
  assert.deepEqual(levels(runs, { posA: 1466, widthA: null }), { a: 1466, b: 1466 }, 'a position alone');
});

test('contiguous pairs — adjoining in both documents — are one run; a gap in either keeps them apart', () => {
  assert.deepEqual(merged([pair(1467, 1467, 240), pair(1, 1, 1466), pair(1707, 1707, 23)]), [pair(1, 1, 1729)], 'the three stretches of an unchanged edition are one');
  assert.deepEqual(merged([pair(1, 1, 10), pair(11, 30, 5)]), [pair(1, 1, 10), pair(11, 30, 5)], 'adjoining in the first document alone');
  const raw = [pair(1, 1, 10), pair(11, 11, 5)];
  merged(raw);
  assert.deepEqual(raw, [pair(1, 1, 10), pair(11, 11, 5)], 'the pairs handed in are left as they are');
});
