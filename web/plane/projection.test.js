// P-PROJ's test: reading order with the continuation (foundations §2.1), no
// permutation; a mint moves no place; siblings never collide; the residue
// past the sound depth. M2 (the cell arithmetic off by one) turns it red.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { slotOf, cellOf, pathOf, docBox, cellOfKey, accountAt, G, DEPTH_SOUND, depthOfDoc, _reset } from './projection.js';

test('the padded path: a board 3 digits, an account 5, a document 6', () => {
  assert.deepEqual(pathOf('1'), [1, 0, 0]);
  assert.deepEqual(pathOf('1.0.1'), [1, 0, 0, 1, 0]);
  assert.deepEqual(pathOf('1.0.1.0.3'), [1, 0, 0, 1, 0, 3]);
  assert.deepEqual(pathOf('1.0.1.0.3.2'), [1, 0, 0, 1, 0, 3], 'a member projects to its document');
});

test('a document digit picks its cell in reading order — along the row, then the next row', () => {
  assert.deepEqual(slotOf(1, 7, true), { k: 0, idx: 0, col: 0, row: 0 });
  assert.deepEqual(slotOf(2, 7, true), { k: 0, idx: 1, col: 1, row: 0 });
  assert.deepEqual(slotOf(8, 7, true), { k: 0, idx: 7, col: 0, row: 1 });
  assert.deepEqual(slotOf(48, 7, true), { k: 0, idx: 47, col: 5, row: 6 });
});

test('the last cell holds the next grid: the 49th document continues in reading order inside it', () => {
  assert.deepEqual(slotOf(49, 7, true), { k: 1, idx: 0, col: 0, row: 0 });
  assert.deepEqual(slotOf(97, 7, true), { k: 2, idx: 0, col: 0, row: 0 });
  const c48 = cellOf(pathOf('1.0.1.0.48')), c49 = cellOf(pathOf('1.0.1.0.49'));
  assert.equal(c49.w, c48.w / G[5], 'a continuation cell is one grid smaller');
  const cont = cellOf(pathOf('1.0.1.0.49'));
  assert.ok(cont.x >= c48.x + c48.w, 'inside the last cell, to the right of the 48th');
});

test('the separator slot holds the parent\'s own accounts: digit 0 is the first cell', () => {
  assert.deepEqual(slotOf(0, 3, false), { k: 0, idx: 0, col: 0, row: 0 });
  assert.deepEqual(slotOf(1, 3, false), { k: 0, idx: 1, col: 1, row: 0 });
  const acct = cellOfKey('1.0.1'), node = cellOfKey('1');
  assert.ok(acct.x >= node.x && acct.x + acct.w <= node.x + node.w, 'an account lies inside its node');
});

test('siblings never collide and consecutive mints stand side by side', () => {
  _reset();
  const boxes = [];
  for (let n = 1; n <= 100; n++) boxes.push(docBox('1.0.1.0.' + n));
  for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) {
    const a = boxes[i], b = boxes[j];
    const overlap = a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h;
    assert.ok(!overlap, `documents ${i + 1} and ${j + 1} collide`);
  }
  assert.ok(Math.abs(boxes[1].y - boxes[0].y) < 1e-6 && boxes[1].x > boxes[0].x, 'document 2 beside document 1');
  assert.ok(boxes[7].y > boxes[0].y && Math.abs(boxes[7].x - boxes[0].x) < 1e-6, 'document 8 starts the next row');
});

test('a document past the sound depth shares the residue cell, marked so', () => {
  const deep = docBox('1.0.1.0.' + (48 * (DEPTH_SOUND + 2)));
  assert.equal(deep.residue, true);
  assert.equal(depthOfDoc('1.0.1.0.' + (48 * (DEPTH_SOUND + 2))), DEPTH_SOUND + 1);
  const deeper = docBox('1.0.1.0.' + (48 * (DEPTH_SOUND + 5)));
  assert.deepEqual([deeper.x, deeper.y], [deep.x, deep.y], 'every residue member shares the one cell');
  assert.equal(docBox('1.0.1.0.3').residue, false);
});

test('the account under a world point is read back from the grid', () => {
  const c = cellOfKey('1.0.2');
  assert.equal(accountAt(c.x + c.w / 2, c.y + c.h / 2, '1'), '1.0.2');
  const sep = cellOfKey('1');
  assert.equal(accountAt(sep.x + 1, sep.y + 1, '1'), null, 'the separator slot holds no account');
});
