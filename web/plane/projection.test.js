// P-PROJ's test: a document's number mapped to its cell — the home page and
// the slots their own, an ordinary document from cell 6 in mint order, a
// reserved number none — and the assigned slot an address names; reading
// order with the continuation (foundations
// §2.1); a mint moves no place; siblings never collide; each continuation's
// cell holds its documents and none shallower; a mark's name read back, and
// its members each account's documents its continuation holds; the residue
// past the sound depth; the clear strip left of a box; the account under a
// point, read through every level's continuations, and none where the
// doubles can no longer place a continuation apart; and the board's label
// cell.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { slotOf, cellOf, pathOf, docBox, cellOfKey, accountAt, boardLabelCell, clearLeftOf, continuationCell, withinContinuation, membersAt, markKey, continuationOf, cellNumberOf, numberAtCell, hasCell, assignedSlotOf, MAILBOX_SLOT, LAST_NAMED_SLOT, G, DEPTH_SOUND, depthOfDoc, _reset } from './projection.js';

/** the document of account 1.0.1 standing at a cell, counted from 1 */
const atCell = (/** @type {number} */ cell) => '1.0.1.0.' + numberAtCell(cell);

test('the padded path: a board 3 digits, an account 5, a document 6', () => {
  assert.deepEqual(pathOf('1'), [1, 0, 0]);
  assert.deepEqual(pathOf('1.0.1'), [1, 0, 0, 1, 0]);
  assert.deepEqual(pathOf('1.0.1.0.3'), [1, 0, 0, 1, 0, 3]);
  assert.deepEqual(pathOf('1.0.1.0.3.2'), [1, 0, 0, 1, 0, 3], 'a member projects to its document');
});

test('a document\'s number takes its cell: the home page and the slots 2 … 5 their own, an ordinary document from 64 the cells after them in mint order, a reserved number 6 … 63 none (B11-S3)', () => {
  assert.deepEqual([1, 2, 3, 4, 5].map(cellNumberOf), [1, 2, 3, 4, 5], 'the home page and the slots');
  assert.deepEqual([64, 65, 106, 107, 634, 635].map(cellNumberOf), [6, 7, 48, 49, 576, 577], 'an ordinary document: 64 at cell 6, 106 the first grid\'s last, 107 the first continuation\'s first, 634 the sound depth\'s last');
  assert.deepEqual([6, 12, 63, 0].map(cellNumberOf), [null, null, null, null], 'a reserved number, and none at all: no cell');
  for (const c of [1, 5, 6, 48, 49, 576, 577]) assert.equal(cellNumberOf(numberAtCell(c)), c, `cell ${c} read back`);
  assert.deepEqual([hasCell('1.0.1.0.5'), hasCell('1.0.1.0.64'), hasCell('1.0.1.0.64.2'), hasCell('1.0.1.0.7'), hasCell('1.0.1.0.7.2'), hasCell('1.0.1.0.7.0.2.1'), hasCell('1.0.1'), hasCell('1')], [true, true, true, false, false, false, true, true], 'a reserved number has no place, nor its members or elements; every board and account has one');
});

test('an address names an assigned slot where its document\'s number is one of the well-known slots 2 … 5, in any account and on any board — a member as its document — and none at the home page, a reserved number 6 … 63, an ordinary document from 64, or a board\'s or an account\'s own address; the cell map unchanged by it (B11-S5; O1)', () => {
  assert.deepEqual(['1.0.1.0.2', '1.0.1.0.3', '1.0.1.0.4', '1.0.1.0.5', '1.0.2.1.0.2', '2.0.1.0.5', '1.0.1.0.3.2'].map(assignedSlotOf), [2, 3, 4, 5, 2, 5, 3], 'the slots, the mailbox first, of an account, a sub-account and another board\'s account — a member as its document');
  assert.deepEqual(['1.0.1.0.1', '1.0.1.0.6', '1.0.1.0.7', '1.0.1.0.63', '1.0.1.0.64', '1.0.1.0.65', '1.0.1.0.1049578', '1.0.1', '1.0.1.1', '1'].map(assignedSlotOf), [null, null, null, null, null, null, null, null, null, null], 'the home page, the reserved numbers, the ordinary documents, an account and a board: none');
  assert.deepEqual([MAILBOX_SLOT, LAST_NAMED_SLOT], [2, 5], 'skep\'s mailbox slot and its last named slot');
  assert.deepEqual(['1.0.1.0.2', '1.0.1.0.5', '1.0.1.0.6', '1.0.1.0.63', '1.0.1.0.64'].map(hasCell), [true, true, false, false, true], 'the slots keep their cells, the reserved numbers none');
});

test('a reserved number answers the account\'s first cell, at depth 0 inside no continuation, which no mark counts', () => {
  _reset();
  const home = docBox('1.0.1.0.1'), reserved = docBox('1.0.1.0.7');
  assert.deepEqual([reserved.x, reserved.y, reserved.w, reserved.h, reserved.depth, reserved.residue], [home.x, home.y, home.w, home.h, 0, false]);
  assert.equal(depthOfDoc('1.0.1.0.63'), 0);
  assert.ok(!withinContinuation('1.0.1.0.63', 1), 'no continuation holds it');
  assert.deepEqual([...membersAt(['1.0.1.0.7', '1.0.1.0.63', atCell(49)], 1)], [['1.0.1', [atCell(49)]]], 'no mark counts it');
});

test('a document digit picks its cell in reading order — along the row, then the next row', () => {
  assert.deepEqual(slotOf(1, 7, true), { k: 0, idx: 0, col: 0, row: 0 });
  assert.deepEqual(slotOf(2, 7, true), { k: 0, idx: 1, col: 1, row: 0 });
  assert.deepEqual(slotOf(64, 7, true), { k: 0, idx: 5, col: 5, row: 0 }, 'the first ordinary document at cell 6, beside the slots');
  assert.deepEqual(slotOf(65, 7, true), { k: 0, idx: 6, col: 6, row: 0 });
  assert.deepEqual(slotOf(66, 7, true), { k: 0, idx: 7, col: 0, row: 1 }, 'the next row');
  assert.deepEqual(slotOf(106, 7, true), { k: 0, idx: 47, col: 5, row: 6 });
});

test('the last cell holds the next grid: the document at the 49th cell continues in reading order inside it', () => {
  assert.deepEqual(slotOf(numberAtCell(49), 7, true), { k: 1, idx: 0, col: 0, row: 0 });
  assert.deepEqual(slotOf(numberAtCell(97), 7, true), { k: 2, idx: 0, col: 0, row: 0 });
  const c48 = cellOf(pathOf(atCell(48))), c49 = cellOf(pathOf(atCell(49)));
  assert.equal(c49.w, c48.w / G[5], 'a continuation cell is one grid smaller');
  assert.ok(c49.x >= c48.x + c48.w, 'inside the last cell, to the right of the 48th');
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
  for (let c = 1; c <= 100; c++) boxes.push(docBox(atCell(c)));
  for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) {
    const a = boxes[i], b = boxes[j];
    const overlap = a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h;
    assert.ok(!overlap, `the documents at cells ${i + 1} and ${j + 1} collide`);
  }
  assert.ok(Math.abs(boxes[1].y - boxes[0].y) < 1e-6 && boxes[1].x > boxes[0].x, 'document 2 beside document 1');
  assert.ok(boxes[7].y > boxes[0].y && Math.abs(boxes[7].x - boxes[0].x) < 1e-6, 'cell 8 starts the next row');
  const minted = docBox('1.0.1.0.65'), next = docBox('1.0.1.0.64');
  assert.ok(Math.abs(minted.y - next.y) < 1e-6 && minted.x > next.x, 'the second ordinary mint beside the first');
});

test('a continuation\'s cell holds the documents at its depth and deeper, and none shallower', () => {
  for (const k of [1, 2, 3]) {
    const c = continuationCell('1.0.1', k);
    const inside = (/** @type {{x: number, y: number, w: number, h: number}} */ b) => b.x >= c.x && b.y >= c.y && b.x + b.w <= c.x + c.w && b.y + b.h <= c.y + c.h;
    const first = atCell(48 * k + 1), next = atCell(48 * (k + 1) + 1), before = atCell(48 * k);
    assert.ok(inside(docBox(first)) && withinContinuation(first, k), `${first}, at the continuation's first cell, inside continuation ${k}`);
    assert.ok(inside(docBox(next)) && withinContinuation(next, k), 'the next continuation\'s first inside it too');
    assert.ok(!inside(docBox(before)) && !withinContinuation(before, k), `${before}, at the grid's last cell before it, outside`);
  }
  assert.equal(continuationCell('1.0.1', 1).w, cellOfKey('1.0.1').w / G[5], 'the first continuation is a cell of the account\'s first grid');
});

test('a mark\'s name is its account and its continuation, read back whole; no address is one (issue #42)', () => {
  assert.equal(markKey('1.0.1', 2), '1.0.1:2');
  assert.deepEqual(continuationOf(markKey('1.0.1.1', 3)), { account: '1.0.1.1', k: 3 }, 'a sub-account\'s');
  for (const name of ['1.0.1.0.3', '1.0.1', '1', '1.0.1:0', '1.0.1:x', ':1', '1.0.1.0.3:1']) assert.equal(continuationOf(name), null, `${name}: no mark's name`);
});

test('a mark\'s members are each account\'s documents its continuation holds, in address order, its newest last — a version member counted once, as its document — and none shallower (issue #42)', () => {
  const docs = ['1.0.1.0.118', '1.0.1.0.3', '1.0.1.0.107', '1.0.1.0.107.2', '1.0.2.0.108', '1.0.1.0.106', '1.0.1.0.258'];
  assert.deepEqual([...membersAt(docs, 1)], [['1.0.1', ['1.0.1.0.107', '1.0.1.0.118', '1.0.1.0.258']], ['1.0.2', ['1.0.2.0.108']]]);
  assert.deepEqual([...membersAt(docs, 2)], [['1.0.1', ['1.0.1.0.258']]], 'continuation 2: from the 97th cell');
  assert.deepEqual([...membersAt(['1.0.1.0.3', '1.0.1.0.64', '1.0.1.0.106'], 1)], [], 'the first grid\'s documents stand whole: no member');
});

test('the continuation past the sound depth is exactly the cell its documents share', () => {
  const deep = atCell(48 * (DEPTH_SOUND + 1) + 1), sound = atCell(48 * (DEPTH_SOUND + 1));
  assert.deepEqual([deep, sound], ['1.0.1.0.635', '1.0.1.0.634'], 'the residue from document 635, 634 the last with a box of its own');
  assert.deepEqual(continuationCell('1.0.1', DEPTH_SOUND + 1), cellOfKey(deep), 'cellOf\'s own descent, step for step');
  assert.ok(docBox(deep).residue && withinContinuation(deep, DEPTH_SOUND + 1));
  assert.ok(!docBox(sound).residue && depthOfDoc(sound) === DEPTH_SOUND, 'the sound depth\'s last document has a box of its own');
  assert.ok(!withinContinuation(sound, DEPTH_SOUND + 1) && withinContinuation(sound, DEPTH_SOUND), 'the sound depth\'s last document stands whole, inside its own continuation');
});

test('a document past the sound depth shares the residue cell, marked so', () => {
  const deep = docBox(atCell(48 * (DEPTH_SOUND + 2)));
  assert.equal(deep.residue, true);
  assert.equal(depthOfDoc(atCell(48 * (DEPTH_SOUND + 2))), DEPTH_SOUND + 1);
  const deeper = docBox(atCell(48 * (DEPTH_SOUND + 5)));
  assert.deepEqual([deeper.x, deeper.y], [deep.x, deep.y], 'every residue member shares the one cell');
  assert.equal(docBox('1.0.1.0.3').residue, false);
});

test('the strip left of a box is clear of every other box: to the sibling\'s box beside it, or its own cell\'s edge at its grid\'s first column', () => {
  for (const [d, left] of [['1.0.1.0.3', '1.0.1.0.2'], ['1.0.1.0.4', '1.0.1.0.3'], ['1.0.1.0.64', '1.0.1.0.5'], [atCell(50), atCell(49)]]) {
    const b = docBox(d), n = docBox(left);
    assert.ok(Math.abs(b.x - clearLeftOf(d) - (n.x + n.w)) < 1e-6, `${d}: its strip ends at ${left}'s box`);
  }
  for (const d of ['1.0.1.0.1', atCell(8), atCell(49)]) {
    assert.ok(Math.abs(docBox(d).x - clearLeftOf(d) - cellOfKey(d).x) < 1e-6, `${d}: at its grid's first column, its own cell's margin alone`);
  }
  const deep = atCell(48 * (DEPTH_SOUND + 1) + 1); // past the sound depth, its own digit the first of its grid
  assert.equal(slotOf(numberAtCell(48 * (DEPTH_SOUND + 1) + 1), G[5], true).col, 0);
  const ratio = clearLeftOf(deep) / (docBox(deep).x - cellOfKey(deep).x); // a cell 7^11 smaller: compared as a ratio
  assert.ok(Math.abs(ratio - 2) < 0.01, `the residue cell stands in its grid's last column: a sibling's margin with its own (${ratio})`);
});

test('the account under a world point is read back from the grid', () => {
  const c = cellOfKey('1.0.2');
  assert.equal(accountAt(c.x + c.w / 2, c.y + c.h / 2, '1'), '1.0.2');
  const sep = cellOfKey('1');
  assert.equal(accountAt(sep.x + 1, sep.y + 1, '1'), null, 'the separator slot holds no account');
});

test('the account under a world point is read back through each level\'s continuations: at the middle of every account\'s cell, that account — 1.0.9 in the user grid\'s continuation, 1.0.1.4 in the sub-account grid\'s — whether or not the board holds it (issue #232)', () => {
  /** @type {string[]} */
  const missed = [];
  for (let u = 1; u <= 40; u++) for (const s of [0, 1, 2, 3, 4, 5, 9, 12]) {
    const a = '1.0.' + u + (s ? '.' + s : ''), c = cellOfKey(a), at = accountAt(c.x + c.w / 2, c.y + c.h / 2, '1');
    if (at !== a) missed.push(`${a} read as ${at}`);
  }
  assert.deepEqual(missed, []);
});

/** the double `n` representable steps below a positive `v` */
const below = (/** @type {number} */ v, /** @type {number} */ n) => {
  const f = new Float64Array([v]), bits = new BigInt64Array(f.buffer);
  bits[0] -= BigInt(n);
  return f[0];
};

test('no account is under a point lying in a continuation the doubles can no longer place apart from the grid holding it: on the edge 1.0.3\'s cell shares with 1.0.4\'s, which the grid reads inside 1.0.3\'s, just above 1.0.6\'s top — the corner 1.0.3\'s sub-account continuations close on (issue #232)', () => {
  assert.equal(accountAt(cellOfKey('1.0.4').x, below(cellOfKey('1.0.6').y, 3), '1'), null);
});

test('the board\'s label stands in the first cell of its user grid, which no account\'s cell meets', () => {
  const room = boardLabelCell('1'), b = cellOfKey('1');
  assert.deepEqual([room.x, room.y, room.w, room.h], [b.x, b.y, b.w / G[3], b.h / G[3]]);
  for (const a of ['1.0.1', '1.0.2', '1.0.7', '1.0.8', '1.0.9', '1.0.1.1', '1.0.9.3']) {
    const c = cellOfKey(a);
    const meet = c.x < room.x + room.w && room.x < c.x + c.w && c.y < room.y + room.h && room.y < c.y + c.h;
    assert.ok(!meet, `${a}'s cell meets the board's label cell`);
  }
  assert.equal(accountAt(room.x + room.w / 2, room.y + room.h / 2, '1'), null);
});
