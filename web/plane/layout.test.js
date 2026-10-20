// P-LAY's test: the article's lines as its CSS sets them — each line box its
// block's own size's, on the 1/64 px grid as the engine lays it out (the
// figures measured on the gate's machine); the head's lines before the first
// block; a heading's margins nearer the block below it, the gap after every
// other block at its own size; a block that sets no line (a separator alone)
// taking no room, its margins collapsing with its neighbours'; a line holding
// exactly `cpl` characters, the space after its last word hanging; a heading
// wrapped at its own size; a break after a hyphen inside a word and none after
// a slash; an inline-block set whole; a float beside the last line or on a
// line of its own, as tall as its own line box; a withheld run as bars of its
// width; the bars at their lines and none past the article's clip; the
// measurements the CSS reads, one source. THE FACE: an article its estimate
// cannot hold fitted at the narrowest column that holds it — its lines inside
// the room, the column filling its width, one character narrower overflowing,
// no bar cut — and one its estimate holds keeping the estimate; the positions
// a plan does not hold yet narrowing the face.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { metricsFor, layoutOf, heightOf, fitted, wrap, bars, breakBetween, cssMeasures, lineBox, MEASURE, LINE_H, LAY_FS, CHAR_W } from './layout.js';
import { DOC_W, DOC_H } from './projection.js';

/** @typedef {import('./layout.js').Row} Row */
/** @typedef {import('./layout.js').Piece} Piece */

/** @returns {Piece} */
const piece = (/** @type {string} */ text, size = 1, o = {}) => ({ text, size, lead: 0, trail: 0, box: false, ...o });
/** @returns {Row} */
const row = (/** @type {Row['kind']} */ kind, /** @type {number | null} */ pos, /** @type {Piece[]} */ pieces, o = {}) => ({ kind, pos, size: 1, pieces, float: null, before: 0, after: 0, width: 0, ...o });
const para = (/** @type {number} */ pos, /** @type {string} */ text, size = 1) => row('text', pos, [piece(text, size)], { size, after: MEASURE.gap * size });
/** a heading's row as T-ARTICLE plans it: its margins at its own size */
const heading = (/** @type {number} */ pos, /** @type {string} */ text, size = MEASURE.h2) => row('text', pos, [piece(text, size)], { size, before: MEASURE.headingBefore * size, after: MEASURE.headingAfter * size });
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

test('a line box is its own size\'s: the engine\'s font size on the 1/64 px grid, rounded, and the line height on it, floored', () => {
  assert.equal(lineBox(1), LINE_H, 'the body\'s line box is LINE_H');
  // Chrome 155 on the gate's machine, a single line of each size at LAY_FS with the article's unitless line height
  const measured = [[MEASURE.head, 17.265625], [MEASURE.derived, 18.34375], [MEASURE.count, 15.53125], [MEASURE.h2, 26.984375], [MEASURE.h3, 23.734375], [MEASURE.label, 15.109375], [MEASURE.sym, 16.1875]];
  for (const [size, px] of measured) assert.equal(lineBox(size) * LAY_FS, px, `${size} em: a line box of ${px} px`);
  for (const [size] of measured) assert.ok(Number.isInteger(lineBox(size) * LAY_FS * 64), `${size} em: on the 1/64 px grid`);
  assert.ok(Math.abs(lineBox(MEASURE.head) / MEASURE.head - LINE_H) < 0.01 && Math.abs(lineBox(MEASURE.h2) / MEASURE.h2 - LINE_H) < 0.01, 'each its own size\'s LINE_H, within the grid');
});

test('the head\'s lines stand before the first block, each its own size\'s line box', () => {
  const head = [row('head', null, [piece('1.0.1.0.3')]), row('head', null, [piece('published', MEASURE.head)], { size: MEASURE.head }), row('head', null, [piece('1.0.1 · dev', MEASURE.head)], { size: MEASURE.head })];
  const L = layoutOf([...head, para(1, 'text')], metrics(52));
  const b = /** @type {{first: number, n: number}} */ (L.blocks.get(1));
  assert.equal(b.first, 3);
  assert.ok(close(L.lines[b.first].top, LINE_H + 2 * lineBox(MEASURE.head)), `the first block at ${L.lines[b.first].top} em: the address's line box and two of the head's`);
  assert.deepEqual(L.lines.slice(0, 3).map((l) => l.kind), ['head', 'head', 'head']);
  assert.deepEqual(L.lines.slice(0, 3).map((l) => l.h), [LINE_H, lineBox(MEASURE.head), lineBox(MEASURE.head)]);
});

test('a heading stands nearer the block it heads than the block above it; the gap after every other block is its own; adjoining margins collapse to the larger', () => {
  const offer = row('chrome', null, [piece('this document windows 1.0.1.0.1003', MEASURE.offer)], { size: MEASURE.offer, before: MEASURE.offerGap * MEASURE.offer, after: MEASURE.offerGap * MEASURE.offer });
  const L = layoutOf([para(1, 'aaaa'), heading(10, '# Title'), para(20, 'bbbb'), offer], metrics(52));
  const top = (/** @type {number} */ pos) => L.lines[/** @type {{first: number}} */ (L.blocks.get(pos)).first].top;
  const above = top(10) - LINE_H, below = top(20) - (top(10) + lineBox(MEASURE.h2));
  assert.ok(close(above, Math.max(MEASURE.gap, MEASURE.headingBefore * MEASURE.h2)), 'above the heading: its room, collapsed with the paragraph\'s gap');
  assert.ok(close(below, MEASURE.headingAfter * MEASURE.h2), 'below it: its own smaller room');
  assert.ok(below < above, `nearer the block it heads (${below} em) than the block above it (${above} em)`);
  const last = L.lines[L.lines.length - 1];
  assert.ok(close(last.top, top(20) + LINE_H + Math.max(MEASURE.gap, MEASURE.offerGap * MEASURE.offer)), 'the offer\'s margin collapses with the block\'s');
  assert.equal(last.pos, null, 'the offer is chrome, no block\'s line');
  const two = layoutOf([heading(10, '# Title'), heading(20, '## Part', MEASURE.h3)], metrics(52));
  const t2 = (/** @type {number} */ pos) => two.lines[/** @type {{first: number}} */ (two.blocks.get(pos)).first].top;
  assert.ok(close(t2(20) - t2(10) - lineBox(MEASURE.h2), MEASURE.headingBefore * MEASURE.h3), 'a heading under a heading: the larger room, the lower one\'s above it');
});

test('a block that sets no line takes no room: its margins collapse with its neighbours\', the block after it the larger of their margins below the block before', () => {
  const top = (/** @type {import('./layout.js').Layout} */ L, /** @type {number} */ pos) => L.lines[/** @type {{first: number}} */ (L.blocks.get(pos)).first].top;
  const bare = layoutOf([para(1, 'aaaa'), para(10, 'bbbb')], metrics(52));
  const sep = layoutOf([para(1, 'aaaa'), para(6, ''), para(10, 'bbbb')], metrics(52));
  assert.deepEqual(sep.blocks.get(6), { first: 1, n: 0 }, 'a separator alone sets no line');
  assert.ok(close(top(sep, 10), top(bare, 10)) && close(top(sep, 10) - LINE_H, MEASURE.gap), 'the paragraph after it one gap below the paragraph before, as with no block between them');
  const head = layoutOf([para(1, 'aaaa'), para(6, ''), heading(10, '## Part', MEASURE.h3)], metrics(52));
  assert.ok(close(top(head, 10) - LINE_H, MEASURE.headingBefore * MEASURE.h3), 'a heading after it: its own room above it, the larger, alone');
});

test('a heading\'s lines are its own size\'s line boxes', () => {
  const L = layoutOf([heading(1, 'aaaaaaa bbbbbbbbb'), para(30, 'cc')], metrics(20));
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
  const small = piece('+3 others', MEASURE.count);
  assert.deepEqual(wrap(row('text', 1, [piece('aaaaaaaaaaaaaaaaaa')], { float: small }), 20).map((l) => l.h), [LINE_H, lineBox(MEASURE.count)], 'a float on a line of its own is as tall as its own line box');
  assert.deepEqual(wrap(row('text', 1, [piece('aaaa')], { float: small }), 20).map((l) => l.h), [LINE_H], 'beside the last line it adds none');
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

/** an article's plan: the head's three lines and a paragraph per text, each its text's positions and a separator apart */
function article(/** @type {string[]} */ texts) {
  let pos = 1;
  const head = [row('head', null, [piece('1.0.1.0.3')]), row('head', null, [piece('published', MEASURE.head)], { size: MEASURE.head }), row('head', null, [piece('1.0.1 · dev', MEASURE.head)], { size: MEASURE.head })];
  const rows = [...head, ...texts.map((s) => { const r = para(pos, s); pos += s.length + 2; return r; })];
  return { rows, positions: pos - 1 };
}
/** a paragraph of `n` words of two to nine characters, varied by `seed` */
const words = (/** @type {number} */ n, /** @type {number} */ seed) => Array.from({ length: n }, (_, i) => 'abcdefghij'.slice(0, 2 + ((i * 7 + seed) % 8))).join(' ');
const BOX = { w: DOC_W, h: DOC_H };
/** the room an article's lines may take at a face, in its em: from its first line's top to its clip */
const room = (/** @type {import('./layout.js').Metrics} */ m) => (m.y1 - m.y0) / m.fs;
/** the metrics at a column that fills the estimate's width */
const atColumn = (/** @type {import('./layout.js').Metrics} */ est, /** @type {number} */ cpl) => ({ ...est, cpl, fs: est.tw / (CHAR_W * cpl), lineH: (est.tw / (CHAR_W * cpl)) * LINE_H });

test('an article its estimate cannot hold is fitted: its lines end inside the room at the narrowest column that holds them, no bar cut', () => {
  for (const texts of [Array.from({ length: 24 }, (_, i) => words(14, i)), Array.from({ length: 60 }, (_, i) => words(30, i)), Array.from({ length: 300 }, () => 'a')]) {
    const { rows, positions } = article(texts);
    const est = metricsFor(positions, BOX);
    assert.ok(heightOf(layoutOf(rows, est)) > room(est), `the estimate for ${texts.length} paragraphs, every line full, does not hold their head, gaps and breaks`);
    const m = fitted(rows, est);
    const L = layoutOf(rows, m);
    assert.ok(heightOf(L) <= room(m), `${texts.length} paragraphs: ${heightOf(L)} em of lines in ${room(m)} em of room`);
    assert.ok(m.cpl > est.cpl && m.fs < est.fs, 'the column widens and the face narrows; never the other way');
    assert.ok(close(m.cpl * CHAR_W * m.fs, m.tw) && close(m.lineH, m.fs * LINE_H), 'the column fills the width the estimate fits it to');
    assert.deepEqual([m.x0, m.y0, m.y1, m.tw], [est.x0, est.y0, est.y1, est.tw], 'the box\'s room is the estimate\'s');
    const narrower = atColumn(est, m.cpl - 1);
    assert.ok(heightOf(layoutOf(rows, narrower)) > room(narrower), `one character narrower (${m.cpl - 1}) the lines run past the clip`);
    const B = bars(L, m), lines = L.lines.filter((l) => l.kind === 'text' && l.w > 0);
    assert.equal(B.length, lines.length, 'every line of the blocks is a bar');
    for (const b of B) assert.ok(close(b.h, 0.5 * m.fs) && b.y + b.h <= m.y1, 'no bar is cut at the clip');
  }
});

test('an article its estimate holds keeps the estimate: a short one, set at the floor of 52 characters', () => {
  const { rows, positions } = article([words(30, 1), words(12, 2)]);
  const est = metricsFor(positions, BOX);
  assert.ok(est.cpl === 52 && heightOf(layoutOf(rows, est)) <= room(est));
  assert.equal(fitted(rows, est), est);
});

test('the positions a plan does not hold yet are counted as body lines and narrow the face', () => {
  const { rows, positions } = article([words(30, 1), words(12, 2)]);
  const est = metricsFor(positions + 6000, BOX);
  const held = fitted(rows, est), whole = fitted(rows, est, 6000);
  assert.equal(held, est, 'the delivered part alone fits the estimate');
  assert.ok(whole.fs < held.fs, 'counting the 6000 positions not held narrows it');
  assert.ok(heightOf(layoutOf(rows, whole)) + Math.ceil(6000 / whole.cpl) * LINE_H <= room(whole), 'the lines held and a body line per column of the rest end inside the room');
});

test('the measurements the CSS reads are P-LAY\'s, one source', () => {
  const v = cssMeasures();
  assert.equal(v['--gap'], MEASURE.gap + 'em');
  assert.equal(v['--h2'], MEASURE.h2 + 'em');
  assert.equal(v['--head'], MEASURE.head + 'em');
  assert.equal(Object.keys(v).filter((k) => !k.startsWith('--border')).length, Object.keys(MEASURE).length, 'every measure is a custom property');
  assert.ok(Number.isInteger(LINE_H * LAY_FS * 64), 'a line box on the 1/64 px grid at the layout size');
});
