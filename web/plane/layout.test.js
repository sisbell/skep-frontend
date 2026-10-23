// P-LAY's test: the article's lines as its CSS sets them — each line box its
// block's own size's, on the 1/64 px grid as the engine lays it out (the
// figures measured on the gate's machine); the head's lines before the first
// block; a heading's margins nearer the block below it, the gap after every
// other block at its own size; a block that sets no line (a separator alone)
// taking no room, its margins collapsing with its neighbours'; a line holding
// exactly `cpl` characters, the space after its last word hanging; a heading
// wrapped at its own size; a break after a hyphen inside a word and none after
// a slash; an inline-block set whole; a withheld run's gap its bars, one line
// for each measure's count of its positions; each line naming the position its
// first own character stands at; the measurements the CSS reads, one source.
// THE EDGE (issue #151's design decision): each column followed by its edge
// and a gutter, the edge EDGE_GAP past its text and inside its padded slot,
// short of the next column's text (a mutant that drops the edge from the pitch
// or the slot turns red). THE FIT: the full measure wherever the view holds a
// column at the reading size with both its margins, the corner whole, else
// compact — the corner compacted before the measure narrows (a mutant that
// narrows first turns red) — else the most whole characters the view holds,
// never more; a fold at a narrower measure every column and line at it, its
// estimate's lines and spans at it too (a mutant that keeps the full measure
// anywhere turns red). THE FOLD (issue #15's design
// decision): every document set at MEASURE_CPL characters a line, from a
// hundred positions to six hundred thousand (a mutant that lets the length
// widen the column turns red); every line of a long article standing in a
// column inside its room, no bar past its column (a mutant that clips the
// article at the room drops lines and turns red); columns COLUMN_LINES body
// line boxes deep, the margin above a column's head dropped; a heading kept
// with the first two lines after it, no paragraph line alone at a column's head
// or foot, a short paragraph moved whole, a record, a withheld run and the head
// never split, a kept unit deeper than a column broken at a line anyway (a
// mutant without each rule turns red); columns left to right, then row by row,
// each followed by its edge and a gutter, a short document one column of its own length; the standard
// size until the columns fill the room, then steps each at least doubling the
// room's capacity (a mutant that sets the size continuously, or steps by a
// factor that does not double, turns red); the outline tracing the padded
// columns, one edge; the estimate never more columns than the text sets, so
// its size never smaller (a mutant that counts a line per fewer positions
// turns red); positions placed and read back; unheld positions estimated in
// columns of their own; the view's window over a fold, its estimated lines read
// as `placeOf` places them (a mutant reading the held lines alone, or an end by
// the view's edge it never reached, turns red); the paging key's next column;
// a re-set's hold, and a hold across two versions' folds by the pair of
// positions a version move names (issue #154: a mutant that reads the point's
// own position in the second fold turns red).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  layoutOf, heightOf, wrap, breakBetween, cssMeasures, lineBox, columnsOf, fold, estimate, estimatedSpan, slot, outline, outlineRects, boundsOf, firstRow, padded,
  bars, placeOf, posAt, columnAt, pageTarget, windowIn, holdOf, standardFs, stepAt, stepFor, gapOf, edgeOf, fitFor, columnW,
  MEASURE, BORDER, LINE_H, LAY_FS, CHAR_W, MEASURE_CPL, COLUMN_LINES, COLUMN_H, COLUMN_W, GUTTER, EDGE, EDGE_GAP, STANDARD_GRID, STANDARD_FS,
} from './layout.js';
import { DOC_W, DOC_H } from './projection.js';

/** @typedef {import('./layout.js').Row} Row */
/** @typedef {import('./layout.js').Piece} Piece */
/** @typedef {import('./layout.js').Line} Line */

/** @returns {Piece} */
const piece = (/** @type {string} */ text, size = 1, o = {}) => ({ text, size, lead: 0, trail: 0, box: false, own: true, ...o });
/** @returns {Row} */
const row = (/** @type {Row['kind']} */ kind, /** @type {number | null} */ pos, /** @type {Piece[]} */ pieces, o = {}) => ({ kind, pos, size: 1, pieces, before: 0, after: 0, width: 0, keep: /** @type {const} */ ('lines'), ...o });
const para = (/** @type {number} */ pos, /** @type {string} */ text, size = 1) => row('text', pos, [piece(text, size)], { size, after: MEASURE.gap * size });
/** a heading's row as T-ARTICLE plans it: its margins at its own size */
const heading = (/** @type {number} */ pos, /** @type {string} */ text, size = MEASURE.h2) => row('text', pos, [piece(text, size)], { size, before: MEASURE.headingBefore * size, after: MEASURE.headingAfter * size, keep: /** @type {const} */ ('heading') });
const close = (/** @type {number} */ a, /** @type {number} */ b) => Math.abs(a - b) < 1e-9;
/** the widths of a row's lines at a column */
const widths = (/** @type {Row} */ r, /** @type {number} */ cpl) => wrap(r, cpl).map((l) => +l.w.toFixed(4));
/** a depth-0 document's room */
const ROOM = { w: DOC_W, h: DOC_H };
/** the head's three rows, as T-ARTICLE plans them */
const HEAD = [row('head', null, [piece('1.0.1.0.3', 1, { own: false })], { keep: 'whole' }), row('head', null, [piece('published', MEASURE.head, { own: false })], { size: MEASURE.head, keep: 'joined' }), row('head', null, [piece('1.0.1 · dev', MEASURE.head, { own: false })], { size: MEASURE.head, keep: 'joined' })];
/** a paragraph of `n` words of two to nine characters, varied by `seed` */
const words = (/** @type {number} */ n, /** @type {number} */ seed) => Array.from({ length: n }, (_, i) => 'abcdefghij'.slice(0, 2 + ((i * 7 + seed) % 8))).join(' ');
/** an article's plan: the head's rows and a paragraph per text, each its text's positions and a separator apart */
function article(/** @type {string[]} */ texts) {
  let pos = 1;
  const rows = [...HEAD, ...texts.map((s) => { const r = para(pos, s); pos += s.length + 2; return r; })];
  return { rows, positions: pos - 1 };
}
/** the place of a line in its fold, in world units relative to the room */
const lineBox_ = (/** @type {import('./layout.js').Fold} */ f, /** @type {number} */ i) => {
  const c = f.columns.find((k) => i >= k.first && i < k.first + k.n);
  if (!c) return null;
  const l = f.lines[i];
  return { x: c.x, y: c.y + (l.top - c.top) * f.fs, w: l.w * CHAR_W * f.fs, h: l.h * f.fs, c };
};

test('the layout wraps words at the column and keys lines by block position; a withheld run is bars of its width', () => {
  const L = layoutOf([para(1, 'one two three four five'), row('withheld', 25, [], { width: 25, after: MEASURE.gap, keep: 'whole' })], 10);
  assert.ok(L.lines.length >= 3);
  assert.deepEqual(L.blocks.get(1), { first: 0, n: 3 }, '"one two" · "three four" · "five"');
  const wh = L.lines.filter((l) => l.kind === 'withheld');
  assert.equal(wh.length, 3, 'a withheld run of 25 positions at 10 per line is three bars');
  assert.deepEqual(wh.map((l) => l.w), [10, 10, 5]);
  assert.deepEqual(L.blocks.get(25), { first: L.lines.length - 3, n: 3 });
  for (const line of L.lines) assert.ok(line.w <= 10, `${line.w} past the column`);
});

test('every line names the position its first own character stands at: a paragraph\'s by its bytes, a withheld run\'s bars a column of positions on, the head none', () => {
  const L = layoutOf([...HEAD, para(1, 'one two — three four'), row('withheld', 30, [], { width: 25, keep: 'whole' })], 10);
  const text = L.lines.filter((l) => l.pos === 1);
  // "one two —" · "three four": the em dash is three bytes
  assert.deepEqual(text.map((l) => l.at), [1, 1 + 'one two — '.length + 2]);
  assert.deepEqual(L.lines.filter((l) => l.kind === 'withheld').map((l) => l.at), [30, 40, 50]);
  assert.ok(L.lines.filter((l) => l.kind === 'head').every((l) => l.at === null));
});

test('a line box is its own size\'s: the engine\'s font size on the 1/64 px grid, rounded, and the line height on it, floored', () => {
  assert.equal(lineBox(1), LINE_H, 'the body\'s line box is LINE_H');
  // Chrome 155 on the gate's machine, a single line of each size at LAY_FS with the article's unitless line height
  const measured = [[MEASURE.head, 17.265625], [MEASURE.derived, 18.34375], [MEASURE.count, 15.53125], [MEASURE.h2, 26.984375], [MEASURE.h3, 23.734375], [MEASURE.label, 15.109375], [MEASURE.sym, 16.1875]];
  for (const [size, px] of measured) assert.equal(lineBox(size) * LAY_FS, px, `${size} em: a line box of ${px} px`);
  for (const [size] of measured) assert.ok(Number.isInteger(lineBox(size) * LAY_FS * 64), `${size} em: on the 1/64 px grid`);
  assert.ok(Math.abs(lineBox(MEASURE.head) / MEASURE.head - LINE_H) < 0.01 && Math.abs(lineBox(MEASURE.h2) / MEASURE.h2 - LINE_H) < 0.01, 'each its own size\'s LINE_H, within the grid');
});

test('the head\'s lines stand before the first block, each its own size\'s line box', () => {
  const L = layoutOf([...HEAD, para(1, 'text')], 52);
  const b = /** @type {{first: number, n: number}} */ (L.blocks.get(1));
  assert.equal(b.first, 3);
  assert.ok(close(L.lines[b.first].top, LINE_H + 2 * lineBox(MEASURE.head)), `the first block at ${L.lines[b.first].top} em: the address's line box and two of the head's`);
  assert.deepEqual(L.lines.slice(0, 3).map((l) => l.kind), ['head', 'head', 'head']);
  assert.deepEqual(L.lines.slice(0, 3).map((l) => l.h), [LINE_H, lineBox(MEASURE.head), lineBox(MEASURE.head)]);
});

test('a heading stands nearer the block it heads than the block above it; the gap after every other block is its own; adjoining margins collapse to the larger', () => {
  const offer = row('chrome', null, [piece('this document windows 1.0.1.0.1003', MEASURE.offer, { own: false })], { size: MEASURE.offer, before: MEASURE.offerGap * MEASURE.offer, after: MEASURE.offerGap * MEASURE.offer, keep: 'whole' });
  const L = layoutOf([para(1, 'aaaa'), heading(10, '# Title'), para(20, 'bbbb'), offer], 52);
  const top = (/** @type {number} */ pos) => L.lines[/** @type {{first: number}} */ (L.blocks.get(pos)).first].top;
  const above = top(10) - LINE_H, below = top(20) - (top(10) + lineBox(MEASURE.h2));
  assert.ok(close(above, Math.max(MEASURE.gap, MEASURE.headingBefore * MEASURE.h2)), 'above the heading: its room, collapsed with the paragraph\'s gap');
  assert.ok(close(below, MEASURE.headingAfter * MEASURE.h2), 'below it: its own smaller room');
  assert.ok(below < above, `nearer the block it heads (${below} em) than the block above it (${above} em)`);
  const last = L.lines[L.lines.length - 1];
  assert.ok(close(last.top, top(20) + LINE_H + Math.max(MEASURE.gap, MEASURE.offerGap * MEASURE.offer)), 'the offer\'s margin collapses with the block\'s');
  assert.equal(last.pos, null, 'the offer is chrome, no block\'s line');
  const two = layoutOf([heading(10, '# Title'), heading(20, '## Part', MEASURE.h3)], 52);
  const t2 = (/** @type {number} */ pos) => two.lines[/** @type {{first: number}} */ (two.blocks.get(pos)).first].top;
  assert.ok(close(t2(20) - t2(10) - lineBox(MEASURE.h2), MEASURE.headingBefore * MEASURE.h3), 'a heading under a heading: the larger room, the lower one\'s above it');
});

test('a block that sets no line takes no room: its margins collapse with its neighbours\', the block after it the larger of their margins below the block before', () => {
  const top = (/** @type {import('./layout.js').Layout} */ L, /** @type {number} */ pos) => L.lines[/** @type {{first: number}} */ (L.blocks.get(pos)).first].top;
  const bare = layoutOf([para(1, 'aaaa'), para(10, 'bbbb')], 52);
  const sep = layoutOf([para(1, 'aaaa'), para(6, ''), para(10, 'bbbb')], 52);
  assert.deepEqual(sep.blocks.get(6), { first: 1, n: 0 }, 'a separator alone sets no line');
  assert.ok(close(top(sep, 10), top(bare, 10)) && close(top(sep, 10) - LINE_H, MEASURE.gap), 'the paragraph after it one gap below the paragraph before, as with no block between them');
  const head = layoutOf([para(1, 'aaaa'), para(6, ''), heading(10, '## Part', MEASURE.h3)], 52);
  assert.ok(close(top(head, 10) - LINE_H, MEASURE.headingBefore * MEASURE.h3), 'a heading after it: its own room above it, the larger, alone');
});

test('a heading\'s lines are its own size\'s line boxes', () => {
  const L = layoutOf([heading(1, 'aaaaaaa bbbbbbbbb'), para(30, 'cc')], 20);
  const b = /** @type {{first: number, n: number}} */ (L.blocks.get(1));
  assert.equal(b.n, 2, 'seventeen characters at 1.25 wrap in twenty');
  assert.ok(close(L.lines[b.first + 1].top - L.lines[b.first].top, lineBox(MEASURE.h2)), 'the second line one heading line box below the first');
  assert.ok(close(L.lines[/** @type {{first: number}} */ (L.blocks.get(30)).first].top - L.lines[b.first].top, 2 * lineBox(MEASURE.h2) + MEASURE.headingAfter * MEASURE.h2), 'two heading line boxes, then its room below');
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
  const mark = piece('visible', 1, { box: true, own: false });
  assert.deepEqual(widths(row('text', 1, [piece('aaaa'), mark, piece('bb')]), 12), [11, 2], 'the box joins its line where it fits, the text after it breaking away');
  assert.deepEqual(widths(row('text', 1, [piece('aaaaaaaa'), mark, piece('.')]), 12), [8, 8], 'it goes whole to the next line where it does not fit, the period after it beside it');
  const lead = row('text', 1, [piece('aaaa'), piece('bbbb', 1, { lead: 0.6, trail: 0.6 })]);
  assert.deepEqual(widths(lead, 20), [10], 'a lead and a trail take room on the line (0.6 em is one character)');
});

test('a withheld run\'s gap is its bars: a line for each measure\'s count of its positions, the last its remainder, one line of one position at the least; an empty row takes no line', () => {
  assert.deepEqual(gapOf(240, MEASURE_CPL), [66, 66, 66, 42]);
  assert.deepEqual(gapOf(132, MEASURE_CPL), [66, 66], 'a whole count of lines: the last full');
  assert.deepEqual(gapOf(240, 40), [40, 40, 40, 40, 40, 40], 'at a narrower measure, more lines of it');
  assert.deepEqual([gapOf(3, MEASURE_CPL), gapOf(0, MEASURE_CPL)], [[3], [1]], 'a short run one line of its width; none one line of one');
  const L = layoutOf([row('withheld', 1, [], { width: 240, keep: 'whole' })], MEASURE_CPL);
  assert.deepEqual(L.lines.map((l) => [l.w, l.h, l.at]), gapOf(240, MEASURE_CPL).map((w, i) => [w, LINE_H, 1 + i * MEASURE_CPL]), 'the layout\'s lines are its gap\'s, each a body line box');
  assert.equal(wrap(row('text', 1, []), 20).length, 0, 'an empty row takes no line');
});

// ---- the fold ---------------------------------------------------------------------------------------------------

test('every document is set at MEASURE_CPL characters a line, from a hundred positions to six hundred thousand', () => {
  for (const n of [1, 3, 20, 60, 400, 2000, 6000]) {
    const { rows, positions } = article(Array.from({ length: n }, (_, i) => words(14, i)));
    const f = fold(layoutOf(rows).lines, ROOM);
    assert.ok(f.lines.every((l) => l.w <= MEASURE_CPL + 1e-9), `${positions} positions: no line past the measure`);
    assert.ok(f.columns.every((c) => close(c.w, MEASURE_CPL * CHAR_W * f.fs)), `${positions} positions: every column ${MEASURE_CPL} characters of its face`);
  }
  for (const extent of [100, 5900, 27000, 600000]) {
    const e = estimate(extent, ROOM);
    assert.ok(e.columns.every((c) => close(c.w, COLUMN_W * e.fs)), `the estimate of ${extent} positions: the measure too`);
  }
});

test('every line of a long article stands in a column inside the room, none cut: the columns COLUMN_LINES line boxes deep, the margin above a column\'s head dropped', () => {
  const { rows } = article(Array.from({ length: 300 }, (_, i) => words(20 + (i % 9) * 6, i)));
  const L = layoutOf(rows), f = fold(L.lines, ROOM);
  assert.ok(f.columns.length > STANDARD_GRID[0] * STANDARD_GRID[1], `${f.columns.length} columns: past the standard grid`);
  assert.equal(f.columns.reduce((n, c) => n + c.n, 0), L.lines.length, 'every line in a column, once');
  for (let i = 0; i < f.lines.length; i++) {
    const b = /** @type {NonNullable<ReturnType<typeof lineBox_>>} */ (lineBox_(f, i));
    assert.ok(b.y >= b.c.y - 1e-6 && b.y + b.h <= b.c.y + b.c.h + 1e-6, `line ${i} inside its column`);
    assert.ok(b.c.x >= 0 && b.c.y >= 0 && b.c.x + b.c.w <= ROOM.w + 1e-6 && b.c.y + b.c.h <= ROOM.h + 1e-6, `line ${i}'s column inside the room`);
  }
  for (const c of f.columns.slice(0, -1)) assert.ok(close(c.h, COLUMN_H * f.fs), 'every column but the last its full depth');
  for (const c of f.columns.slice(1)) assert.ok(close(f.lines[c.first].top, c.top), 'each column starts at its first line\'s top: the margin above it dropped');
  for (const [ci, cb] of bars(f).entries()) for (const b of cb) assert.ok(b.y >= f.columns[ci].y - 1e-6 && b.y + b.h <= f.columns[ci].y + f.columns[ci].h + 1e-6, 'no bar past its column');
});

test('the standard size holds until the columns fill the room; each step after it at least doubles the room\'s capacity', () => {
  const s0 = stepAt(ROOM, 0);
  assert.ok(close(s0.fs, standardFs(ROOM)) && close(STANDARD_FS, s0.fs), 'step 0 is the standard size');
  assert.equal(s0.capacity, STANDARD_GRID[0] * STANDARD_GRID[1]);
  assert.ok(s0.fs * STANDARD_GRID[0] * (COLUMN_W + GUTTER) <= ROOM.w + 1e-6 && s0.fs * STANDARD_GRID[1] * (COLUMN_H + GUTTER) <= ROOM.h + 1e-6, 'the standard grid fits the room');
  for (let n = 1; n <= s0.capacity; n++) assert.equal(stepFor(ROOM, n).k, 0, `${n} columns: the standard size`);
  let prev = s0;
  for (let k = 1; k <= 9; k++) {
    const s = stepAt(ROOM, k);
    assert.ok(s.fs < prev.fs, `step ${k} smaller than step ${k - 1}`);
    assert.ok(s.capacity >= STANDARD_GRID[0] * STANDARD_GRID[1] * 2 ** k && s.capacity >= 2 * (STANDARD_GRID[0] * STANDARD_GRID[1] * 2 ** (k - 1)), `step ${k} holds at least twice step ${k - 1}'s count: ${s.capacity}`);
    assert.equal(stepFor(ROOM, prev.capacity + 1).k <= k, true, 'one column past a step\'s capacity takes no more than the next step');
    prev = s;
  }
  // a growing draft re-sets only where it crosses a step's capacity: between steps the size stands
  const sizes = new Set();
  for (let n = 1; n <= 200; n++) sizes.add(stepFor(ROOM, n).fs);
  assert.ok(sizes.size <= 1 + Math.ceil(Math.log2(200 / (STANDARD_GRID[0] * STANDARD_GRID[1]))), `two hundred columns set at ${sizes.size} sizes: one a doubling`);
  assert.ok(close(standardFs({ w: ROOM.w / 7, h: ROOM.h / 7 }), STANDARD_FS / 7), 'a room 7 times smaller sets the standard 7 times smaller');
});

test('columns stand left to right, then row by row, each followed by its edge and a gutter; a document shorter than one column is one column of its own length', () => {
  const short = fold(layoutOf(article([words(30, 1)]).rows).lines, ROOM);
  assert.equal(short.columns.length, 1);
  const L = short.lines[short.lines.length - 1];
  assert.ok(close(short.columns[0].h, (L.top + L.h) * short.fs), 'its own length');
  assert.ok(close(short.columns[0].x, (GUTTER / 2) * short.fs) && close(short.columns[0].y, (GUTTER / 2) * short.fs), 'half a gutter in from the room\'s corner');
  const f = fold(layoutOf(article(Array.from({ length: 60 }, (_, i) => words(30, i))).rows).lines, ROOM);
  assert.ok(f.columns.length > f.across, 'more columns than a row holds');
  f.columns.forEach((c, i) => {
    const col = i % f.across, rowN = Math.floor(i / f.across);
    assert.ok(close(c.x, (col * (COLUMN_W + EDGE + GUTTER) + GUTTER / 2) * f.fs), `column ${i} at its place across: past the column before it, its edge and a gutter`);
    assert.ok(close(c.y, (rowN * (COLUMN_H + GUTTER) + GUTTER / 2) * f.fs), `column ${i} at its row`);
  });
  for (let i = 1; i < f.columns.length; i++) {
    const a = padded(f, f.columns[i - 1]), b = padded(f, f.columns[i]);
    if (i % f.across) assert.ok(close(a.x + a.w, b.x), 'neighbouring padded columns meet: one edge');
  }
});

test('a heading stays with the first two lines after it; no paragraph line stands alone at a column\'s head or foot; a short paragraph moves whole', () => {
  // a filler that leaves `left` body lines in the first column, then what is kept
  const filler = (/** @type {number} */ left) => Array.from({ length: COLUMN_LINES - left }, (_, i) => ({ ...para(1 + i * 20, 'x'.repeat(10)), after: 0 }));
  const at = (/** @type {Row[]} */ rows, /** @type {number} */ pos) => { const f = fold(layoutOf(rows, MEASURE_CPL).lines, ROOM); return f.columns.findIndex((c) => f.lines.slice(c.first, c.first + c.n).some((l) => l.pos === pos)); };
  // a paragraph of `n` full lines: six words of ten characters a line, the space after the sixth hanging
  const long = (/** @type {number} */ pos, /** @type {number} */ n) => ({ ...para(pos, Array.from({ length: 6 * n }, () => 'y'.repeat(10)).join(' ')), after: 0 });
  // two lines left: a heading and one line of the paragraph after it would fit; the heading goes to the next column with it
  const h = { ...heading(5000, '## Part', 1), before: 0, after: 0 };
  assert.equal(layoutOf([long(1, 5)], MEASURE_CPL).lines.length, 5, 'the paragraph sets five lines');
  assert.equal(at([...filler(2), h, long(6000, 5)], 5000), 1, 'the heading moves to the next column with its text');
  assert.equal(at([...filler(3), h, long(6000, 5)], 5000), 0, 'three lines left: the heading and its first two lines stand at the foot');
  // two lines left before a five-line paragraph: two at the foot, three at the head
  const two = fold(layoutOf([...filler(2), long(6000, 5)], MEASURE_CPL).lines, ROOM);
  assert.deepEqual(two.columns.map((c) => two.lines.slice(c.first, c.first + c.n).filter((l) => l.pos === 6000).length), [2, 3], 'two lines at the foot, three at the head');
  // one line left: no orphan at the foot — the paragraph moves whole
  assert.equal(at([...filler(1), long(6000, 5)], 6000), 1);
  const one = fold(layoutOf([...filler(1), long(6000, 5)], MEASURE_CPL).lines, ROOM);
  assert.equal(one.lines.filter((l, i) => l.pos === 6000 && i < one.columns[0].first + one.columns[0].n).length, 0, 'no lone line at the foot');
  // four lines left before a five-line paragraph: three at the foot leave a widow; the break moves one line up
  const four = fold(layoutOf([...filler(4), long(6000, 5)], MEASURE_CPL).lines, ROOM);
  assert.deepEqual(four.columns.map((c) => four.lines.slice(c.first, c.first + c.n).filter((l) => l.pos === 6000).length), [3, 2], 'never a lone line at the head');
  // a three-line paragraph two lines from the foot moves whole
  const t = fold(layoutOf([...filler(2), long(6000, 3)], MEASURE_CPL).lines, ROOM);
  assert.deepEqual(t.columns.map((c) => t.lines.slice(c.first, c.first + c.n).filter((l) => l.pos === 6000).length), [0, 3], 'a paragraph of three lines or fewer moves whole');
});

test('the head, a record and a withheld run are never split; a kept unit deeper than a column is broken at a line anyway, so no text is dropped', () => {
  const filler = Array.from({ length: COLUMN_LINES - 2 }, (_, i) => ({ ...para(1 + i * 20, 'x'.repeat(10)), after: 0 }));
  const withheld = row('withheld', 9000, [], { width: MEASURE_CPL * 4, keep: 'whole' });
  const f = fold(layoutOf([...filler, withheld], MEASURE_CPL).lines, ROOM);
  assert.deepEqual(f.columns.map((c) => f.lines.slice(c.first, c.first + c.n).filter((l) => l.pos === 9000).length), [0, 4], 'the withheld run moves whole');
  const record = [row('text', 9000, [piece('skep-enroll', 1, { own: false })], { keep: 'whole' }), row('text', null, [piece('dev · device', MEASURE.derived, { own: false })], { size: MEASURE.derived, keep: 'joined' })];
  const fr = fold(layoutOf([...Array.from({ length: COLUMN_LINES - 1 }, (_, i) => ({ ...para(1 + i * 20, 'x'), after: 0 })), ...record], MEASURE_CPL).lines, ROOM);
  assert.ok(fr.columns.length === 2 && fr.lines.slice(fr.columns[1].first).every((l) => l.pos === 9000), 'a record\'s words and keys stand together');
  const deep = fold(layoutOf([row('withheld', 1, [], { width: MEASURE_CPL * COLUMN_LINES * 2, keep: 'whole' })], MEASURE_CPL).lines, ROOM);
  assert.equal(deep.columns.length, 2, 'a withheld run two columns deep takes two columns');
  assert.equal(deep.columns.reduce((n, c) => n + c.n, 0), COLUMN_LINES * 2, 'every one of its lines stands');
});

test('the outline traces the padded columns: one edge, each row\'s run of full columns and a short last column a step', () => {
  const one = fold(layoutOf(article([words(30, 1)]).rows).lines, ROOM);
  const p1 = padded(one, one.columns[0]);
  assert.deepEqual(outline(one), [{ x: p1.x, y: p1.y }, { x: p1.x + p1.w, y: p1.y }, { x: p1.x + p1.w, y: p1.y + p1.h }, { x: p1.x, y: p1.y + p1.h }], 'one column: its padded slot');
  const f = fold(layoutOf(article(Array.from({ length: 40 }, (_, i) => words(30, i))).rows).lines, ROOM);
  const rects = outlineRects(f);
  const area = rects.reduce((a, r) => a + r.w * r.h, 0), cols = f.columns.reduce((a, c) => { const p = padded(f, c); return a + p.w * p.h; }, 0);
  assert.ok(Math.abs(area - cols) < 1e-6 * cols, 'the rects cover the padded columns, nothing more');
  const pts = outline(f), b = boundsOf(f);
  for (const p of pts) assert.ok(p.x >= b.x - 1e-9 && p.x <= b.x + b.w + 1e-9 && p.y >= b.y - 1e-9 && p.y <= b.y + b.h + 1e-9);
  for (let i = 0; i < pts.length; i++) { const a = pts[i], z = pts[(i + 1) % pts.length]; assert.ok(close(a.x, z.x) || close(a.y, z.y), 'its edges run across or down: a column\'s'); }
  // the polygon's area by the shoelace equals the columns'
  let sh = 0; for (let i = 0; i < pts.length; i++) { const a = pts[i], z = pts[(i + 1) % pts.length]; sh += a.x * z.y - z.x * a.y; }
  assert.ok(Math.abs(Math.abs(sh) / 2 - cols) < 1e-6 * cols, 'its area the padded columns\'');
  const r0 = firstRow(f);
  assert.ok(close(r0.w, Math.min(f.across, f.columns.length) * (COLUMN_W + EDGE + GUTTER) * f.fs) && close(r0.h, (COLUMN_H + GUTTER) * f.fs), 'the first row: its columns across, each with its edge, a column deep');
});

test('each column is followed by its edge — EDGE_GAP past its text, as deep as the column, inside its padded slot and its room — and the next column\'s text stands a gutter past the edge (issue #151)', () => {
  const f = fold(layoutOf(article(Array.from({ length: 60 }, (_, i) => words(30, i))).rows).lines, ROOM);
  assert.ok(f.across > 1, 'more than one column a row');
  for (const [i, c] of f.columns.entries()) {
    const e = edgeOf(f, c), p = padded(f, c);
    assert.ok(close(e.x, c.x + c.w + EDGE_GAP * f.fs) && close(e.w, (EDGE - EDGE_GAP) * f.fs) && close(e.y, c.y) && close(e.h, c.h), `column ${i}'s edge EDGE_GAP past its text, the rest of the edge wide, as deep as the column`);
    assert.ok(e.x >= p.x && e.x + e.w <= p.x + p.w + 1e-9 && close(p.x + p.w, c.x + c.w + (EDGE + GUTTER / 2) * f.fs), `column ${i}'s padded slot holds its edge, half a gutter past it`);
    assert.ok(e.x + e.w <= ROOM.w + 1e-6, `column ${i}'s edge inside the room`);
    const next = f.columns[i + 1];
    if (next && (i + 1) % f.across) assert.ok(close(next.x - (e.x + e.w), GUTTER * f.fs), `column ${i + 1}'s text a gutter past column ${i}'s edge`);
  }
  assert.ok(close(standardFs(ROOM), Math.min(ROOM.w / (STANDARD_GRID[0] * (COLUMN_W + EDGE + GUTTER)), ROOM.h / (STANDARD_GRID[1] * (COLUMN_H + GUTTER)))), 'the standard size holds the standard grid of columns with their edges');
});

/** the corner as P-REG sizes it: whole 133 px, compact 78 px, 8 px from the text */
const CORNER = { whole: 133, compact: 78, gap: 8 };
/** the view a column at the reading size needs beside its margins, in px: the corner and its gap, the column, its edge and a gutter */
const needs = (/** @type {number} */ cpl, /** @type {number} */ corner, readPx = 12.5) => corner + CORNER.gap + cpl * CHAR_W * readPx + (EDGE + GUTTER) * readPx;

test('the fit: the full measure wherever the view holds a column at the reading size with both its margins, the corner whole, else compact — the corner compacted before the measure narrows — else the most whole characters the view holds beside them (issue #151; FP-26)', () => {
  assert.deepEqual(fitFor(1440, 12.5, CORNER), { cpl: MEASURE_CPL, compact: false }, 'a 1440 px view: the full measure, the corner whole');
  const whole = needs(MEASURE_CPL, CORNER.whole), compact = needs(MEASURE_CPL, CORNER.compact);
  assert.deepEqual(fitFor(Math.ceil(whole), 12.5, CORNER), { cpl: MEASURE_CPL, compact: false }, `${Math.ceil(whole)} px: still whole`);
  assert.deepEqual(fitFor(Math.floor(whole) - 1, 12.5, CORNER), { cpl: MEASURE_CPL, compact: true }, 'a px short of that: the corner compacts first, the measure kept');
  assert.deepEqual(fitFor(Math.ceil(compact), 12.5, CORNER), { cpl: MEASURE_CPL, compact: true });
  let prev = MEASURE_CPL;
  for (let vw = Math.floor(compact) - 1; vw >= 320; vw -= 7) {
    const f = fitFor(vw, 12.5, CORNER);
    assert.ok(f.compact && Number.isInteger(f.cpl) && f.cpl < MEASURE_CPL && f.cpl <= prev, `${vw} px: a narrower whole count, never wider than at a wider view`);
    assert.ok(needs(f.cpl, CORNER.compact) <= vw + 1e-9 && needs(f.cpl + 1, CORNER.compact) > vw, `${vw} px: the most characters the view holds beside the compact corner, ${f.cpl}`);
    prev = f.cpl;
  }
  assert.equal(fitFor(480, 12.5, CORNER).cpl, 39, 'a 480 px view: 39 characters');
  assert.deepEqual(fitFor(1, 12.5, CORNER), { cpl: 1, compact: true }, 'never below one');
  assert.ok(fitFor(900, 20, CORNER).cpl < fitFor(900, 12.5, CORNER).cpl, 'a larger reading size holds fewer');
});

test('a fold at a narrower measure sets every column and every line at it — its standard size no smaller, the room\'s depth binding it — and its estimate\'s lines and spans at it too', () => {
  const cpl = 40, { rows, positions } = article(Array.from({ length: 30 }, (_, i) => words(30, i)));
  const f = fold(layoutOf(rows, cpl).lines, ROOM, { cpl }), full = fold(layoutOf(rows).lines, ROOM);
  assert.equal(f.cpl, cpl);
  assert.ok(f.columns.every((c) => close(c.w, columnW(cpl) * f.fs)) && f.lines.every((l) => l.w <= cpl + 1e-9), 'every column and every line at the measure');
  assert.ok(f.columns.length > full.columns.length, `more columns of it: ${f.columns.length} against ${full.columns.length}`);
  assert.ok(stepAt(ROOM, 0, cpl).fs >= stepAt(ROOM, 0).fs && close(stepAt(ROOM, 0, cpl).fs, ROOM.h / (STANDARD_GRID[1] * (COLUMN_H + GUTTER))), 'its standard size no smaller: the room\'s depth binds it');
  f.columns.forEach((c, i) => { if (i % f.across) assert.ok(close(c.x - f.columns[i - 1].x, (columnW(cpl) + EDGE + GUTTER) * f.fs), 'the pitch its measure\'s'); });
  // the estimate: a line for each measure's count of positions, the first column's span after the head at it
  const e = estimate(positions, ROOM, cpl), e66 = estimate(positions, ROOM);
  assert.ok(e.cpl === cpl && e.columns.length >= e66.columns.length, 'the estimate at the measure: as many columns or more');
  const [a0, b0] = estimatedSpan(0, cpl), [a1, b1] = estimatedSpan(1, cpl);
  assert.ok(a0 === 1 && b0 === a1 && b1 - a1 === COLUMN_LINES * cpl && (b0 - 1) % cpl === 0, 'its spans a column of lines of the measure each');
  assert.equal(placeOf(e, a1).column, 1, 'a column\'s first estimated position in that column');
  assert.ok(close(placeOf(e, a1 + cpl).y - placeOf(e, a1).y, LINE_H * e.fs), 'the next line a measure\'s count of positions on');
  assert.equal(slot(ROOM, cpl).cpl, cpl);
});

test('the estimate never sets more columns than the text, so its size is never smaller than the text\'s; an unread extent is the first column slot', () => {
  for (const n of [1, 5, 30, 120, 600, 3000]) {
    const { rows, positions } = article(Array.from({ length: n }, (_, i) => words(8 + (i % 30), i)));
    const f = fold(layoutOf(rows).lines, ROOM), e = estimate(positions, ROOM);
    assert.ok(e.columns.length <= f.columns.length, `${positions} positions: the estimate ${e.columns.length} columns, the text ${f.columns.length}`);
    assert.ok(e.fs >= f.fs - 1e-12, 'its size never smaller');
  }
  const s = slot(ROOM);
  assert.equal(s.columns.length, 1);
  assert.ok(close(s.fs, STANDARD_FS) && close(s.columns[0].h, COLUMN_H * s.fs), 'a column deep, at the standard size');
  for (const c of [0, 1, 7]) { const [a] = estimatedSpan(c), e = estimate(60 * MEASURE_CPL * COLUMN_LINES, ROOM); assert.equal(placeOf(e, a).column, c, `the estimate's column ${c} holds its span's first position`); }
});

test('positions are placed and read back: each line\'s position names its line, in its column', () => {
  const { rows } = article(Array.from({ length: 50 }, (_, i) => words(24, i)));
  const f = fold(layoutOf(rows).lines, ROOM);
  let checked = 0;
  for (let i = 0; i < f.lines.length; i++) {
    const l = f.lines[i];
    if (l.at == null || (i && f.lines[i - 1].at === l.at)) continue;
    const p = placeOf(f, l.at), b = /** @type {NonNullable<ReturnType<typeof lineBox_>>} */ (lineBox_(f, i));
    assert.ok(close(p.y, b.y) && close(p.x, b.c.x), `line ${i}'s position placed at its line`);
    assert.equal(posAt(f, p.x + p.w / 2, p.y + p.h / 2), l.at, `and read back from its middle`);
    checked++;
  }
  assert.ok(checked > 100, `${checked} lines`);
  assert.equal(columnAt(f, -1e9, -1e9), 0, 'a point off every column reads its nearest');
});

test('positions the document does not hold are estimated: those after its lines from the last line\'s foot, those between its blocks in columns of their own', () => {
  const { rows } = article([words(30, 1), words(12, 2)]);
  const lines = layoutOf(rows).lines, held = lines[lines.length - 1];
  const f = fold(lines, ROOM, { after: MEASURE_CPL * COLUMN_LINES * 3, heldTo: 1000 });
  assert.ok(f.columns.length >= 4 && f.columns.slice(1).every((c) => c.estimated), 'the rest in estimated columns after the held one');
  const first = placeOf(f, 1000);
  assert.ok(first.column === 0 && close(first.y, f.columns[0].y + (held.top + held.h - f.columns[0].top) * f.fs), 'the first unheld position at the held lines\' foot');
  assert.ok(placeOf(f, 1000 + MEASURE_CPL * COLUMN_LINES * 2).column >= 2, 'later ones in later columns');
  // a block after a gap: a column breaks before it, the gap in columns of its own
  const gap = layoutOf([...HEAD, para(1, words(20, 1)), para(100001, words(20, 2))]).lines.map((l) => (l.pos === 100001 && l.nth === 0 ? { ...l, gap: 100000 - 120 } : l));
  const g = fold(gap, ROOM);
  const after = g.columns.findIndex((c) => g.lines.slice(c.first, c.first + c.n).some((l) => l.pos === 100001));
  assert.ok(after >= 2 && g.columns.slice(1, after).every((c) => c.estimated), `the block after the gap in column ${after}, estimated columns before it`);
  assert.ok(g.columns[after].first === g.lines.findIndex((l) => l.pos === 100001), 'the block opens its column');
  assert.equal(placeOf(g, 50000).column > 0 && placeOf(g, 50000).column < after, true, 'a position in the gap stands in its estimated columns');
});

test('the view\'s window over a fold: the first and last positions of the lines a view meets — held, or estimated where the fold holds none — and whether it reaches the first column\'s top and the last column\'s foot (issue #141)', () => {
  const { rows, positions } = article(Array.from({ length: 30 }, (_, i) => words(30, i)));
  const f = fold(layoutOf(rows).lines, ROOM, { after: MEASURE_CPL * COLUMN_LINES * 3, heldTo: positions + 1 });
  const ce = f.columns.findIndex((c) => c.estimated), last = f.columns.length - 1;
  assert.ok(ce >= 2 && ce < last, `${ce} held columns, then ${last + 1 - ce} estimated ones`);
  /** the positions the held lines meeting a band of a column open at */
  const opens = (/** @type {import('./layout.js').Column} */ c, /** @type {number} */ y0, /** @type {number} */ y1) =>
    f.lines.slice(c.first, c.first + c.n).filter((l) => { const t = c.y + (l.top - c.top) * f.fs; return l.at != null && t <= y1 && t + l.h * f.fs >= y0; }).map((l) => /** @type {number} */ (l.at));
  // the middle third of the first column alone
  const c0 = f.columns[0], band = { x0: c0.x, x1: c0.x + c0.w, y0: c0.y + c0.h / 3, y1: c0.y + (2 * c0.h) / 3 }, held = opens(c0, band.y0, band.y1);
  assert.deepEqual(windowIn(f, band), { from: Math.min(...held), to: Math.max(...held), start: false, end: false }, 'a band of the first column: the positions its lines open at, neither end run past');
  // the whole fold and more: its first position to its last estimated line's, both ends run past
  const all = /** @type {NonNullable<ReturnType<typeof windowIn>>} */ (windowIn(f, { x0: -1e9, y0: -1e9, x1: 1e9, y1: 1e9 }));
  assert.ok(all.start && all.end && all.from === 1 && all.to > positions && placeOf(f, all.to).column === last && placeOf(f, all.to + MEASURE_CPL).y === placeOf(f, all.to).y, `the whole fold: ${JSON.stringify(all)}`);
  // the first estimated column from above its top to its middle: its first estimated line, and the last meeting the band, as `placeOf` places them
  const c = f.columns[ce], top = { x0: c.x, x1: c.x + c.w, y0: c.y - 1, y1: c.y + c.h / 2 };
  const w = /** @type {NonNullable<ReturnType<typeof windowIn>>} */ (windowIn(f, top));
  assert.ok(w && !w.start && !w.end, `an estimated column's upper half: ${JSON.stringify(w)}`);
  assert.ok(placeOf(f, w.from).column === ce && placeOf(f, w.from - MEASURE_CPL).column < ce, 'from: the column\'s first estimated line');
  assert.ok(placeOf(f, w.to).column === ce && placeOf(f, w.to).y <= top.y1 && placeOf(f, w.to + MEASURE_CPL).y > top.y1, 'to: the last estimated line meeting the band');
  // the last column's upper half, its foot below the view: the end not run past; its lower half and below its foot: run past
  const z = f.columns[last], short = windowIn(f, { x0: z.x, x1: z.x + z.w, y0: z.y - 1, y1: z.y + z.h / 2 });
  assert.ok(short && !short.end && !short.start, `the last column's upper half: no end run past — ${JSON.stringify(short)}`);
  const past = windowIn(f, { x0: z.x, x1: z.x + z.w, y0: z.y + z.h / 2, y1: z.y + z.h + 100 * f.fs });
  assert.ok(past && past.end && !past.start, `past the last column's foot: the end run past — ${JSON.stringify(past)}`);
  assert.equal(windowIn(f, { x0: f.room.w + 1, x1: f.room.w + 2, y0: 0, y1: f.room.h }), null, 'a view meeting no column: no window');
});

test('the paging key continues at the next column\'s top where the view shows its column\'s foot, and pages within a column that runs past the view', () => {
  const f = fold(layoutOf(article(Array.from({ length: 30 }, (_, i) => words(30, i))).rows).lines, ROOM);
  const c0 = f.columns[0], c1 = f.columns[1], half = (GUTTER / 2) * f.fs;
  const whole = { x0: c0.x - half, y0: c0.y - half, x1: c0.x + c0.w + half, y1: c0.y + c0.h + 10 * half };
  assert.deepEqual(pageTarget(f, whole, 1), { column: 1, x: c1.x + c1.w / 2, top: c1.y - half }, 'the foot in view: the next column\'s top, half a gutter above its text');
  const part = { ...whole, y1: c0.y + c0.h / 2 };
  assert.equal(pageTarget(f, part, 1), null, 'the foot below the view: page within the column');
  const second = { x0: c1.x - half, y0: c1.y - half, x1: c1.x + c1.w + half, y1: c1.y + c1.h };
  assert.deepEqual(pageTarget(f, second, -1), { column: 0, x: c0.x + c0.w / 2, top: c0.y - half }, 'PageUp from a column\'s top: the previous column\'s top');
  const last = f.columns[f.columns.length - 1];
  assert.equal(pageTarget(f, { x0: last.x - half, y0: last.y - half, x1: last.x + last.w + half, y1: last.y + last.h + 4 * half }, 1), null, 'past the last column: nothing to continue at');
});

test('a passage read in one fold is held to its place in another: its position\'s line, the offset kept at the new size, and the scale\'s factor the sizes\' ratio', () => {
  const { rows } = article(Array.from({ length: 40 }, (_, i) => words(30, i)));
  const lines = layoutOf(rows).lines;
  const a = fold(lines, ROOM), b = fold(lines, ROOM, { step: 2 });
  assert.ok(b.fs < a.fs && b.across > a.across, 'set two steps smaller: more columns across');
  const line = a.lines[Math.floor(a.lines.length * 0.6)];
  const p = placeOf(a, /** @type {number} */ (line.at)), pt = { x: p.x + 7, y: p.y + p.h / 2 };
  const h = /** @type {NonNullable<ReturnType<typeof holdOf>>} */ (holdOf(a, b, pt));
  assert.equal(h.pos, line.at);
  const q = placeOf(b, /** @type {number} */ (line.at));
  assert.ok(close(h.to.x, q.x + 7 * (b.fs / a.fs)) && close(h.to.y, q.y + (p.h / 2) * (b.fs / a.fs)), 'the same offset from the same line, at the new size');
  assert.ok(close(h.k, a.fs / b.fs), 'the camera\'s scale grows by the sizes\' ratio, so the text keeps its size on screen');
});

test('a passage held across two versions\' folds by the pair of positions its mover names: the second position\'s line takes the offset from the first\'s, at the new size, whatever position the point itself reads (issue #154)', () => {
  const { rows } = article(Array.from({ length: 40 }, (_, i) => words(30, i)));
  const lines = layoutOf(rows).lines;
  const a = fold(lines, ROOM), b = fold(lines, ROOM, { step: 2 });
  const from = /** @type {number} */ (a.lines[Math.floor(a.lines.length * 0.6)].at), to = /** @type {number} */ (b.lines[Math.floor(b.lines.length * 0.2)].at);
  const p = placeOf(a, from), pt = { x: p.x + 7, y: p.y + p.h / 2 };
  const h = /** @type {NonNullable<ReturnType<typeof holdOf>>} */ (holdOf(a, b, pt, { from, to }));
  assert.equal(h.pos, from, 'read from the first position named');
  const q = placeOf(b, to);
  assert.ok(close(h.to.x, q.x + 7 * (b.fs / a.fs)) && close(h.to.y, q.y + (p.h / 2) * (b.fs / a.fs)), 'the offset from the second position\'s line, at the new size — never the first position\'s line in the second fold');
  assert.ok(close(h.k, a.fs / b.fs), 'the scale\'s factor the sizes\' ratio');
});

test('the measurements the CSS reads are P-LAY\'s, one source: the fold\'s measure as a count the style multiplies by 1ch', () => {
  const v = cssMeasures();
  assert.equal(v['--gap'], MEASURE.gap + 'em');
  assert.equal(v['--h2'], MEASURE.h2 + 'em');
  assert.equal(v['--head'], MEASURE.head + 'em');
  assert.equal(v['--measure'], String(MEASURE_CPL));
  assert.equal(v['--gutter'], GUTTER + 'em');
  assert.deepEqual([v['--edge'], v['--edge-gap'], v['--line-box'], v['--face'], v['--face-gap']], [EDGE + 'em', EDGE_GAP + 'em', LINE_H + 'em', MEASURE.face + 'em', MEASURE.faceGap + 'em'], 'the edge, its gap, a body line box and the withheld face\'s sizes');
  assert.equal(Object.keys(v).length, Object.keys(MEASURE).length + Object.keys(BORDER).length + 5, 'every measure, every border and the fold\'s five — the measure, the gutter, the edge, its gap and the line box — each a custom property');
  assert.ok(Number.isInteger(LINE_H * LAY_FS * 64), 'a line box on the 1/64 px grid at the layout size');
  assert.equal(heightOf({ lines: [], blocks: new Map() }), 0);
  assert.equal(columnsOf([]).length, 0);
});
