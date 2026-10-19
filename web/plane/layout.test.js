// P-LAY's test: the greek layout wraps by characters per line; a withheld
// block is bars of its width; a block's first line is found by its position.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { metricsFor, layoutOf } from './layout.js';
import { DOC_W, DOC_H } from './projection.js';

test('the metrics: a longer document sets a smaller face; a floor on characters per line', () => {
  const box = { w: DOC_W, h: DOC_H };
  const a = metricsFor(100, box), b = metricsFor(10000, box);
  assert.ok(b.fs < a.fs);
  // the face is capped so that a line holds at least 52 characters, however short the document (the cap on fs, not the dead floor of 8)
  assert.ok(metricsFor(10, box).cpl >= 52);
  assert.ok(a.cpl >= 52);
});

test('the layout wraps words at the column and keys lines by block position', () => {
  const m = { fs: 1, cpl: 10, lineH: 1.35, estLines: 1, tw: 6, x0: 0, y0: 0, textH: 10 };
  const L = layoutOf([{ pos: 1, kind: 'para', text: 'one two three four five', width: 24 }, { pos: 25, kind: 'withheld', text: '', width: 25 }], m);
  assert.ok(L.lines.length >= 3);
  assert.equal(L.blockLine.get(1), 0);
  const wh = L.lines.filter((l) => l[0].withheld);
  assert.equal(wh.length, 3, 'a withheld run of 25 positions at 10 per line is three bars');
  assert.equal(L.blockLine.get(25), L.lines.length - 3);
  for (const line of L.lines) { let len = 0; for (const g of line) len += g.t.length; assert.ok(len <= m.cpl + 1); }
});
