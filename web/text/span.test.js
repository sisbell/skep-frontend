// T-SPAN's test: a character boundary of a block and its byte position
// round-trip over text holding a multi-byte character — a mutant that adds
// the character index to the block's first position turns red; a position
// inside a character resolves past it, as `sliceBytes` cuts; K-8's extension
// widens by one block in the direction pressed and stops at the document's
// edges; a block is touched by the span that overlaps it.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { posOfChar, charOfPos, extended, touches, sameSpan, spanOfBlock } from './span.js';
import { sliceBytes, byteLength } from '../util.js';

/** @returns {import('../model/records.js').Block} */
const block = (/** @type {number} */ pos, /** @type {string} */ text, sep = 2) => ({ pos, width: byteLength(text) + sep, kind: 'para', text, origin: null });

test('a character boundary and its byte position round-trip over a multi-byte character', () => {
  const b = block(100, 'a—b'); // the dash is three bytes
  assert.deepEqual([0, 1, 2, 3].map((i) => posOfChar(b, i)), [100, 101, 104, 105]);
  for (let i = 0; i <= 3; i++) assert.equal(charOfPos(b, posOfChar(b, i)), i, `character ${i}`);
  assert.equal(charOfPos(b, 102), 2, 'a position inside the dash resolves past it');
  assert.equal(charOfPos(b, 103), 2);
  assert.equal(charOfPos(b, 99), 0, 'a position before the block is its start');
  assert.equal(charOfPos(b, 1000), 3, 'a position past the text is its end');
  assert.equal(posOfChar(b, 9), 105, 'an index past the text is its end');
  assert.equal(sliceBytes(b.text, posOfChar(b, 1) - b.pos, posOfChar(b, 2) - b.pos), '—', 'the positions cut the text as the article does');
});

test('K-8 extends by a span in the direction pressed and stops at the document\'s edges', () => {
  const blocks = [block(1, 'aaaaaaaa'), block(11, 'bbbbbbbb'), block(21, 'cccccccc')];
  const addr = '1.0.1.0.3';
  const middle = spanOfBlock(addr, blocks[1]);
  assert.deepEqual(extended(blocks, middle, 'down'), { addr, pos: 11, width: 20 }, 'down takes the next block whole');
  assert.deepEqual(extended(blocks, middle, 'up'), { addr, pos: 1, width: 20 }, 'up takes the previous block whole');
  assert.deepEqual(extended(blocks, { addr, pos: 13, width: 3 }, 'down'), { addr, pos: 13, width: 8 }, 'a span ending inside a block first reaches that block\'s end');
  assert.deepEqual(extended(blocks, { addr, pos: 13, width: 3 }, 'up'), { addr, pos: 11, width: 5 }, 'a span starting inside a block first reaches that block\'s start');
  assert.deepEqual(extended(blocks, spanOfBlock(addr, blocks[2]), 'down'), spanOfBlock(addr, blocks[2]), 'nothing below the last block');
  assert.deepEqual(extended(blocks, spanOfBlock(addr, blocks[0]), 'up'), spanOfBlock(addr, blocks[0]), 'nothing above the first');
});

test('a block is touched by the span that overlaps it; the same span names the same bytes', () => {
  const b = block(11, 'bbbbbbbb');
  assert.ok(touches(b, { pos: 18, width: 10 }) && touches(b, { pos: 1, width: 12 }) && !touches(b, { pos: 1, width: 10 }) && !touches(b, { pos: 21, width: 4 }));
  assert.ok(sameSpan({ addr: 'd', pos: 1, width: 2 }, { addr: 'd', pos: 1, width: 2 }));
  assert.ok(!sameSpan({ addr: 'd', pos: 1, width: 2 }, { addr: 'd', pos: 1, width: 3 }) && !sameSpan(null, { addr: 'd', pos: 1, width: 2 }));
});
