// P-LAY's test: the article's lines as its CSS sets them — the head's lines
// before the first block; the gap after each block at its own size; a line
// holding exactly `cpl` characters, the space after its last word hanging; a
// heading wrapped at its own size; a break after a hyphen inside a word and
// none after a slash; an inline-block set whole; a float beside the last
// line or on a line of its own; a withheld run as bars of its width; the bars
// at their lines and none past the article's clip; the measurements the CSS
// reads, one source.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { metricsFor, layoutOf, wrap, bars, breakBetween, cssMeasures, MEASURE, LINE_H, LAY_FS } from './layout.js';
import { DOC_W, DOC_H } from './projection.js';

/** @typedef {import('./layout.js').Row} Row */
/** @typedef {import('./layout.js').Piece} Piece */

/** @returns {Piece} */
const piece = (/** @type {string} */ text, size = 1, o = {}) => ({ text, size, lead: 0, trail: 0, box: false, ...o });
/** @returns {Row} */
const row = (/** @type {Row['kind']} */ kind, /** @type {number | null} */ pos, /** @type {Piece[]} */ pieces, o = {}) => ({ kind, pos, pieces, float: null, before: 0, after: 0, width: 0, ...o });
const para = (/** @type {number} */ pos, /** @type {string} */ text, size = 1) => row('text', pos, [piece(text, size)], { after: MEASURE.gap * size });
const metrics = (cpl = 10, y1 = 1000) => ({ fs: 1, cpl, lineH: LINE_H, tw: cpl * 0.6, x0: 0, y0: 0, y1 });
const close = (/** @type {number} */ a, /** @type {number} */ b) => Math.abs(a - b) < 1e-9;
/** the widths of a row's lines at a column */
const widths = (/** @type {Row} */ r, /** @type {number} */ cpl) => wrap(r, cpl).map((l) => +l.w.toFixed(4));

test('the metrics: a longer document sets a smaller face; a floor on characters per line', () => {
  const box = { w: DOC_W, h: DOC_H };
  const a = metricsFor(100, box), b = metricsFor(10000, box);
  assert.ok(b.fs < a.fs);
  // the face is capped so that a line holds at least 52 characters, however short the document (the cap on fs, not the dead floor of 8)
  assert.ok(metricsFor(10, box).cpl >= 52);
  assert.ok(a.cpl >= 52);
  assert.ok(a.y0 > 0 && a.y1 === box.h, 'the article runs from its box\'s top padding to its box\'s bottom, its clip');
});

test('the layout wraps words at the column and keys lines by block position; a withheld run is bars of its width', () => {
  const m = metrics(10);
  const L = layoutOf([para(1, 'one two three four five'), row('withheld', 25, [], { width: 25, after: MEASURE.gap })], m);
  assert.ok(L.lines.length >= 3);
  assert.deepEqual(L.blocks.get(1), { first: 0, n: 3 }, '"one two" · "three four" · "five"');
  const wh = L.lines.filter((l) => l.kind === 'withheld');
  assert.equal(wh.length, 3, 'a withheld run of 25 positions at 10 per line is three bars');
  assert.deepEqual(wh.map((l) => l.w), [10, 10, 5]);
  assert.deepEqual(L.blocks.get(25), { first: L.lines.length - 3, n: 3 });
  for (const line of L.lines) assert.ok(line.w <= m.cpl, `${line.w} past the column`);
});

test('the head\'s lines stand before the first block: its first line is the article\'s fourth line box', () => {
  const head = [row('head', null, [piece('1.0.1.0.3')]), row('head', null, [piece('published', MEASURE.head)]), row('head', null, [piece('1.0.1 · dev', MEASURE.head)])];
  const L = layoutOf([...head, para(1, 'text')], metrics(52));
  const b = /** @type {{first: number, n: number}} */ (L.blocks.get(1));
  assert.equal(b.first, 3);
  assert.ok(close(L.lines[b.first].top, 3 * LINE_H), `the first block at ${L.lines[b.first].top} em, three line boxes down`);
  assert.deepEqual(L.lines.slice(0, 3).map((l) => l.kind), ['head', 'head', 'head']);
});

test('the gap after each block is the block\'s own: a heading\'s at its size, adjoining margins collapsing to the larger', () => {
  const offer = row('chrome', null, [piece('this document windows 1.0.1.0.1003', MEASURE.offer)], { before: MEASURE.offerGap * MEASURE.offer, after: MEASURE.offerGap * MEASURE.offer });
  const L = layoutOf([para(1, 'aaaa'), para(10, '# Title', MEASURE.h2), para(20, 'bbbb'), offer], metrics(52));
  const top = (/** @type {number} */ pos) => L.lines[/** @type {{first: number}} */ (L.blocks.get(pos)).first].top;
  assert.ok(close(top(10), LINE_H + MEASURE.gap), 'a paragraph\'s gap: .55 of its em');
  assert.ok(close(top(20), top(10) + LINE_H + MEASURE.gap * MEASURE.h2), 'a heading\'s gap: .55 of its own, larger em');
  const last = L.lines[L.lines.length - 1];
  assert.ok(close(last.top, top(20) + LINE_H + Math.max(MEASURE.gap, MEASURE.offerGap * MEASURE.offer)), 'the offer\'s margin collapses with the block\'s');
  assert.equal(last.pos, null, 'the offer is chrome, no block\'s line');
});

test('a line holds exactly its column\'s characters: the space after its last word hangs', () => {
  assert.deepEqual(widths(para(1, 'abcd efghi'), 10), [10], 'ten characters fill a ten-character column on one line');
  assert.deepEqual(widths(para(1, 'abcdefghij klmn'), 10), [10, 4]);
  assert.deepEqual(widths(para(1, 'abcdefghi jklmn'), 10), [9, 5]);
  assert.deepEqual(widths(para(1, '  a   b  '), 10), [3], 'white space collapses, and none leads or trails the row');
});

test('a heading is wrapped at its own size: the column holds cpl / 1.25 of its characters', () => {
  assert.deepEqual(widths(para(1, 'aaaaaaa bbbbbbbb', MEASURE.h2), 20), [20], 'sixteen characters at 1.25 fill twenty');
  assert.equal(wrap(para(1, 'aaaaaaa bbbbbbbbb', MEASURE.h2), 20).length, 2, 'seventeen do not');
  assert.equal(wrap(para(1, 'aaaaaaa bbbbbbbbb'), 20).length, 1, 'at the body\'s size they do');
});

test('a line breaks after a hyphen inside a word, and never after a slash', () => {
  assert.deepEqual(widths(para(1, 'see `frontend-annotation.md`'), 20), [14, 14], '"see `frontend-" · "annotation.md`"');
  assert.deepEqual(widths(para(1, 'xx aaaa/bbbbbbbbbbb'), 10), [2, 16], 'the path stays whole, past the column');
  assert.deepEqual(widths(para(1, 'a [link](url)'), 8), [8, 5], 'between a closing and an opening bracket');
  assert.ok(breakBetween('a'.charCodeAt(0), '—'.charCodeAt(0), false) && breakBetween('—'.charCodeAt(0), 'a'.charCodeAt(0), false), 'either side of an em dash');
  assert.ok(!breakBetween('-'.charCodeAt(0), '1'.charCodeAt(0), true) && breakBetween('-'.charCodeAt(0), '1'.charCodeAt(0), false), 'a hyphen that begins a word keeps a digit with it');
  assert.ok(!breakBetween('-'.charCodeAt(0), '.'.charCodeAt(0), false) && !breakBetween('.'.charCodeAt(0), 'a'.charCodeAt(0), false));
});

test('an inline-block is set whole, a line free to break on either side of it', () => {
  const mark = piece('visible', 1, { box: true });
  assert.deepEqual(widths(row('text', 1, [piece('aaaa'), mark, piece('bb')]), 12), [11, 2], 'the box joins its line where it fits, the text after it breaking away');
  assert.deepEqual(widths(row('text', 1, [piece('aaaaaaaa'), mark, piece('.')]), 12), [8, 8], 'it goes whole to the next line where it does not fit, the period after it beside it');
  const lead = row('text', 1, [piece('aaaa'), piece('bbbb', 1, { lead: 0.6, trail: 0.6 })]);
  assert.deepEqual(widths(lead, 20), [10], 'a lead and a trail take room on the line (0.6 em is one character)');
});

test('a float stands beside the last line where it fits, else on a line of its own', () => {
  const count = piece('+3 others', 1);
  assert.equal(wrap(row('text', 1, [piece('aaaa')], { float: count }), 20).length, 1);
  assert.equal(wrap(row('text', 1, [piece('aaaaaaaaaaaaaa')], { float: count }), 20).length, 2);
  assert.equal(wrap(row('text', 1, [], { float: count }), 20).length, 1, 'a row with nothing but its float is the float\'s line');
  assert.equal(wrap(row('text', 1, []), 20).length, 0, 'an empty row takes no line');
});

test('the bars stand inside their lines and stop at the article\'s clip, the last one cut there', () => {
  const head = row('head', null, [piece('1.0.1.0.3')]);
  const long = para(1, Array.from({ length: 20 }, () => 'aaaaaaaa').join(' '));
  const L = layoutOf([head, long], metrics(10));
  const clip = 5 * LINE_H + LINE_H / 2 - 0.2 + 0.25; // a quarter of the way into the bar of the article's sixth line
  const B = bars(L, metrics(10, clip));
  assert.equal(B.length, 5, 'the head is no bar: the block\'s first five lines are, its sixth cut and the rest past the clip');
  for (const b of B) assert.ok(b.y + b.h <= clip + 1e-9, 'no bar runs past the clip');
  assert.ok(close(B[4].y + B[4].h, clip) && close(B[4].h, 0.25), 'the last bar is cut at the clip');
  B.forEach((b, i) => assert.ok(b.y > (i + 1) * LINE_H && b.y + 0.5 < (i + 2) * LINE_H, `bar ${i} inside its line box`));
});

test('the measurements the CSS reads are P-LAY\'s, one source', () => {
  const v = cssMeasures();
  assert.equal(v['--gap'], MEASURE.gap + 'em');
  assert.equal(v['--h2'], MEASURE.h2 + 'em');
  assert.equal(v['--head'], MEASURE.head + 'em');
  assert.equal(Object.keys(v).filter((k) => !k.startsWith('--border')).length, Object.keys(MEASURE).length, 'every measure is a custom property');
  assert.ok(Number.isInteger(LINE_H * LAY_FS * 64), 'a line box on the 1/64 px grid at the layout size');
});
