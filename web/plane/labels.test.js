// P-LABEL's test: every label set at its rule's size and never below the
// floor; an address or a count never cut — a place too narrow for one leaves
// it out, a count wrapped at its spaces; a first line alone cut, ending in
// its ellipsis, or wrapped down to its place's bottom; a part past its
// place's bottom left out with every part after it; no label meeting another
// place's shape or a label set before it; through a crossfade the weaker
// side setting nothing and blocking nothing; and, over many random frames,
// every line set inside its place and the viewport, no two lines meeting.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { setLabels, sizeOf, lineHeight, LINE_BOX } from './labels.js';
import { LABEL_MIN_PX } from './register.js';

/** @typedef {import('./labels.js').Label} Label */
/** @typedef {import('./labels.js').Part} Part */
/** @typedef {import('./labels.js').Shape} Shape */
/** @typedef {{x: number, y: number, w: number, h: number}} Rect */

/** a monospace measure: 0.6 em a character */
const measure = (/** @type {string} */ s, /** @type {number} */ px) => [...s].length * px * 0.6;
const VIEW = { x: 0, y: 0, w: 1000, h: 800 };
const LH = LABEL_MIN_PX * LINE_BOX;
/** @returns {Part} */
const part = (/** @type {string} */ text, /** @type {Part['fit']} */ fit = 'one', px = 9) => ({ text, px, ink: '#fff', fit });
/** @returns {Label} */
const label = (/** @type {Part[]} */ parts, /** @type {Partial<Label>} */ o = {}) => ({ kind: 'doc', place: 'A', within: { x: 10, y: 10, w: 200, h: 200 }, x: 10, y: 10, align: 'left', alpha: 1, plate: null, parts, ...o });
const run = (/** @type {Label[]} */ labels, /** @type {Shape[]} */ shapes = []) => setLabels(labels, shapes, VIEW, measure);
const texts = (/** @type {ReturnType<typeof run>} */ r, i = 0) => r.set[i].lines.map((l) => l.text);
/** the oracle's own geometry, half a px either way */
const inside = (/** @type {Rect} */ a, /** @type {Rect} */ b) => a.x >= b.x - 0.5 && a.y >= b.y - 0.5 && a.x + a.w <= b.x + b.w + 0.5 && a.y + a.h <= b.y + b.h + 0.5;
const meets = (/** @type {Rect} */ a, /** @type {Rect} */ b) => Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x) > 0.5 && Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y) > 0.5;

test('a label is set at its rule\'s size on the half-px grid, and never below the floor', () => {
  assert.equal(sizeOf(5), LABEL_MIN_PX);
  assert.equal(sizeOf(13.2), 13);
  assert.equal(sizeOf(9.3), 9.5);
  assert.equal(lineHeight(4), LH);
  const r = run([label([part('.0.3', 'one', 7), part('a first line', 'cut', 5.04)])]);
  assert.deepEqual(r.set[0].lines.map((l) => l.px), [LABEL_MIN_PX, LABEL_MIN_PX], 'the address asked for 7 px and its first line for 5.04: both are set at the floor');
});

test('an address is never cut: a place too narrow for it leaves the label out whole', () => {
  // ".0.1012" is 7 characters, 37.8 px at 9 px; the place is 30 px wide
  const r = run([label([part('.0.1012'), part('its first line', 'cut')], { within: { x: 10, y: 10, w: 30, h: 200 } })]);
  assert.equal(r.set.length, 0);
  assert.deepEqual(r.out.map((o) => [o.text, o.reason]), [['.0.1012', 'width'], ['its first line', 'after']]);
});

test('a count wraps at its spaces and is never cut inside a word', () => {
  const at = (/** @type {number} */ w) => run([label([part('≥ 503 documents', 'wrap')], { within: { x: 10, y: 10, w, h: 200 } })]);
  assert.deepEqual(texts(at(100)), ['≥ 503 documents']);
  assert.deepEqual(texts(at(60)), ['≥ 503', 'documents']);
  const narrow = at(40);
  assert.equal(narrow.set.length, 0, '"documents" alone is 48.6 px: the count is left out, never cut');
  assert.equal(narrow.out[0].reason, 'width');
});

test('a first line alone is cut, to its place\'s width, ending in its ellipsis', () => {
  const r = run([label([part('.0.4'), part('The artifact chain', 'cut')], { within: { x: 10, y: 10, w: 60, h: 200 } })]);
  assert.deepEqual(texts(r), ['.0.4', 'The artifa…']);
  for (const l of r.set[0].lines) assert.ok(l.rect.w <= 60, `${l.text} is ${l.rect.w} px`);
});

test('a part past its place\'s bottom is left out with every part after it, the parts above it set', () => {
  const r = run([label([part('.0.4'), part('first line', 'cut'), part('6 links', 'wrap'), part('arriving', 'wrap')], { within: { x: 10, y: 10, w: 200, h: 2 * LH + 1 } })]);
  assert.deepEqual(texts(r), ['.0.4', 'first line']);
  assert.deepEqual(r.out.map((o) => [o.text, o.reason]), [['6 links', 'height'], ['arriving', 'after']]);
});

test('an empty part sets nothing and takes nothing out', () => {
  const r = run([label([part('.0.3'), part(' ', 'cut'), part('6 links', 'wrap')])]);
  assert.deepEqual(texts(r), ['.0.3', '6 links']);
  assert.equal(r.out.length, 0);
});

test('a label meets no other place\'s shape; its own place\'s shape does not block it', () => {
  assert.equal(run([label([part('.0.3')])], [{ place: 'A', rect: { x: 0, y: 0, w: 300, h: 300 }, alpha: 1 }]).set.length, 1);
  const r = run([label([part('.0.3')])], [{ place: 'B', rect: { x: 15, y: 12, w: 20, h: 5 }, alpha: 1 }]);
  assert.deepEqual([r.set.length, r.out[0].reason], [0, 'meets']);
});

test('a label meets no label set before it: of two in one spot, the one drawn first is set', () => {
  const r = run([label([part('board 1')], { kind: 'board', place: '1' }), label([part('.0.3')])]);
  assert.deepEqual(r.set.map((l) => l.place), ['1']);
  assert.deepEqual(r.out.map((o) => [o.place, o.reason]), [['A', 'meets']]);
});

test('through a crossfade the place drawn the weaker sets no label and blocks none', () => {
  const r = run([label([part('1.0.1')], { kind: 'cluster', place: '1.0.1', alpha: 0.4 }), label([part('.0.3')], { alpha: 0.6 })], [{ place: 'B', rect: { x: 0, y: 0, w: 300, h: 300 }, alpha: 0.4 }]);
  assert.deepEqual(r.set.map((l) => l.place), ['A']);
  assert.deepEqual(r.out.map((o) => [o.place, o.reason]), [['1.0.1', 'faint']]);
});

test('a label reaching past the viewport is left out', () => {
  const r = run([label([part('.0.3')], { within: { x: -50, y: 10, w: 200, h: 200 }, x: -40 })]);
  assert.deepEqual([r.set.length, r.out[0].reason], [0, 'view']);
});

test('a first line given room for several wraps down to its place\'s bottom, the last line it keeps ending in its ellipsis', () => {
  const r = run([label([part('+≥ 470 more — newest .0.1012', 'wrap'), part('RES-5 — any user may create agent sub-accounts (RULED 2026-08-24)', 'fill')], { kind: 'mark', place: '1.0.1:1', within: { x: 10, y: 10, w: 61, h: 5 * LH } })]);
  const lines = texts(r);
  assert.deepEqual(lines.slice(0, 3), ['+≥ 470 more', '— newest', '.0.1012'], 'the count set whole at its spaces, the newest member\'s address a word of its own');
  assert.deepEqual(lines.slice(3), ['RES-5 — any', 'user may…']);
  for (const l of r.set[0].lines) assert.ok(l.rect.w <= 61);
});

test('a centred label is wrapped to the width either side of its centre', () => {
  // its centre 30 px in from its place's left: 60 px of width, so the count wraps
  const r = run([label([part('≥ 503 documents', 'wrap')], { kind: 'cluster', place: '1.0.1', align: 'center', x: 40 })]);
  assert.deepEqual(texts(r), ['≥ 503', 'documents']);
  for (const l of r.set[0].lines) assert.ok(Math.abs(l.rect.x + l.rect.w / 2 - 40) < 1e-9);
});

test('over many random frames every line is set at the floor or above, inside its place and the viewport, meeting no other place\'s shape drawn the stronger and no other line', () => {
  let seed = 7;
  const rnd = () => (seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648;
  const pick = (/** @type {any[]} */ xs) => xs[Math.floor(rnd() * xs.length)];
  const words = ['.0.3', '≥', '503', 'documents', 'arriving', '·', 'links', 'held', 'here', 'http://127.0.0.1:8642', 'claimed', 'by', '1.0.1', 'nothing'];
  /** @type {Part['fit'][]} */
  const fits = ['one', 'wrap', 'cut', 'fill'];
  let setLines = 0;
  for (let frame = 0; frame < 300; frame++) {
    /** @type {Shape[]} */
    const shapes = [];
    /** @type {Label[]} */
    const labels = [];
    for (let i = 0; i < 14; i++) {
      const w = 20 + rnd() * 220, h = 10 + rnd() * 130, x = -60 + rnd() * 1000, y = -60 + rnd() * 800;
      const place = 'p' + Math.floor(rnd() * 6), alpha = rnd(), centre = rnd() < 0.3;
      shapes.push({ place, rect: { x, y, w, h }, alpha });
      const parts = Array.from({ length: 1 + Math.floor(rnd() * 3) }, () => part(Array.from({ length: 1 + Math.floor(rnd() * 5) }, () => pick(words)).join(' '), pick(fits), 3 + rnd() * 12));
      labels.push(label(parts, { place, alpha, within: { x, y, w, h }, x: centre ? x + w / 2 : x, y, align: centre ? 'center' : 'left' }));
    }
    const r = run(labels, shapes);
    const lines = r.set.flatMap((l) => l.lines.map((line) => ({ place: l.place, within: l.within, alpha: l.alpha, ...line })));
    setLines += lines.length;
    for (const l of lines) {
      assert.ok(l.px >= LABEL_MIN_PX && l.alpha >= 0.5);
      assert.ok(inside(l.rect, l.within) && inside(l.rect, VIEW), JSON.stringify(l));
      for (const s of shapes) if (s.alpha >= 0.5 && s.place !== l.place) assert.ok(!meets(l.rect, s.rect), `${l.text} meets ${s.place}'s shape`);
    }
    for (let i = 0; i < lines.length; i++) for (let j = i + 1; j < lines.length; j++) assert.ok(!meets(lines[i].rect, lines[j].rect), `${lines[i].text} meets ${lines[j].text}`);
  }
  assert.ok(setLines > 100, `the frames set lines (${setLines}): the invariants are held over labels set, not over none`);
});
