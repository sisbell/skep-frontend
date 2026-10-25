// P-LABEL's test: every label set at its rule's size and never below the
// floor; an address or a count never cut, a first line cut or wrapped down
// to its place's bottom, a part past the bottom left out with every part
// after it; no label meeting another place's shape or a label set before it,
// the weaker side of a crossfade setting and blocking nothing; a connection's
// count named alike from either end and standing on its stroke in the clear
// stretch nearest the middle, between the ends and inside the visible view;
// a tail's room rightward to the first shape its band meets, and its label
// set in it; the hold (FP-26) — a sign held at its place's top or at the
// hold and pushed up by its place's foot, a held label one line at the
// top-left of its place's visible part, its address first, its badge whole
// or dropped and its words cut then dropped, one inside a region's held label
// just below it, a label with no hold left out under the line, its room the
// narrowest row its line meets; each part measured and set run by run in
// its face, an address inside the client's words in the identifier's, a cut
// never inside an address and a wrapped word keeping its face, the client's
// figures apart from its words; and, over many random frames, every line and
// every held line inside its place and the view, meeting no other place's
// shape and no other line.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { setLabels, sizeOf, lineHeight, onStroke, roomRight, pairOf, holdTop, heldLine, across, inFace, plain, runsOf, figuresOf, face, LINE_BOX } from './labels.js';
import { LABEL_MIN_PX, HOLD, FACE } from './register.js';

/** @typedef {import('./labels.js').Label} Label */
/** @typedef {import('./labels.js').Part} Part */
/** @typedef {import('./labels.js').Shape} Shape */
/** @typedef {{x: number, y: number, w: number, h: number}} Rect */

/** a measure of one width a character in every face: 0.6 em */
const measure = (/** @type {string} */ s, /** @type {number} */ px) => [...s].length * px * 0.6;
/** a measure each face sets at a width of its own a character: the client's 0.5 em, the identifier's 0.6, the reading face's 0.45 */
const byFace = (/** @type {string} */ s, /** @type {number} */ px, /** @type {string} */ _w, /** @type {import('./register.js').Face} */ f) => [...s].length * px * { client: 0.5, ident: 0.6, reading: 0.45 }[f];
const VIEW = { x: 0, y: 0, w: 1000, h: 800 };
const LH = LABEL_MIN_PX * LINE_BOX;
/** @returns {Part} */
const part = (/** @type {string} */ text, /** @type {Part['fit']} */ fit = 'one', px = 9) => ({ text, px, ink: '#fff', fit });
/** @returns {Label} */
const label = (/** @type {Part[]} */ parts, /** @type {Partial<Label>} */ o = {}) => ({ kind: 'doc', place: 'A', within: { x: 10, y: 10, w: 200, h: 200 }, x: 10, y: 10, align: 'left', alpha: 1, plate: null, parts, hold: null, ...o });
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

test('a connection\'s two places are one name, whichever end it was met from', () => {
  assert.equal(pairOf('1.0.1:1', '1.0.1.0.14'), '1.0.1.0.14|1.0.1:1');
  assert.equal(pairOf('1.0.1.0.14', '1.0.1:1'), pairOf('1.0.1:1', '1.0.1.0.14'));
});

/** a count's room as P-RENDER sets one: its numeral's own line at the floor, its plate */
const roomOf = (/** @type {string} */ text) => ({ w: measure(text, LABEL_MIN_PX), h: LH });
/** a count as P-RENDER hands it to the pass: its numeral centred on `at`, its room clipped to the visible view */
function countLabel(/** @type {{x: number, y: number}} */ at, /** @type {string} */ text, /** @type {Rect} */ seen) {
  const room = roomOf(text);
  const x0 = Math.max(at.x - room.w / 2, seen.x), y0 = Math.max(at.y - room.h / 2, seen.y);
  const within = { x: x0, y: y0, w: Math.max(0, Math.min(at.x + room.w / 2, seen.x + seen.w) - x0), h: Math.max(0, Math.min(at.y + room.h / 2, seen.y + seen.h) - y0) };
  return label([part(text)], { kind: 'connection', place: pairOf('A', 'B'), within, x: at.x, y: at.y - room.h / 2, align: 'center', plate: '#000' });
}
const near = (/** @type {number} */ a, /** @type {number} */ b) => Math.abs(a - b) < 1e-9;

test('a count stands at its stroke\'s middle where nothing meets it there', () => {
  const at = onStroke({ x: 100, y: 100 }, { x: 300, y: 200 }, roomOf('2'), [], VIEW);
  assert.ok(near(at.x, 200) && near(at.y, 150), JSON.stringify(at));
  assert.equal(run([countLabel(at, '2', VIEW)]).set.length, 1);
});

test('a place over the stroke\'s middle moves the count to the clear stretch nearest the middle, where the pass sets it; at the middle it would meet the place', () => {
  const p = { x: 100, y: 100 }, q = { x: 300, y: 100 }, room = roomOf('2');
  /** @type {Array<[Rect, 'left' | 'right']>} a place over the middle, reaching nearer the stroke's start, then nearer its end */
  const cases = [[{ x: 180, y: 80, w: 60, h: 40 }, 'left'], [{ x: 160, y: 80, w: 60, h: 40 }, 'right']];
  for (const [box, side] of cases) {
    const shapes = [{ place: 'X', rect: box, alpha: 1 }];
    const at = onStroke(p, q, room, shapes, VIEW);
    assert.ok(near(at.y, 100), 'on the stroke');
    assert.ok(side === 'left' ? at.x + room.w / 2 <= box.x : at.x - room.w / 2 >= box.x + box.w, `on the place's ${side}, its room clear of it: ${at.x}`);
    assert.equal(run([countLabel(at, '2', VIEW)], shapes).set.length, 1, 'the pass sets it there');
    assert.equal(run([countLabel({ x: 200, y: 100 }, '2', VIEW)], shapes).out[0].reason, 'meets', 'at the stroke\'s middle it would meet the place');
  }
});

test('a gap between two places narrower than the count\'s room holds no count, however near the middle: the count stands in the clear stretch beyond', () => {
  // the stroke's middle at x 250 in a 3 px gap between two places; the count's room is 5.4 px wide
  const p = { x: 100, y: 100 }, q = { x: 400, y: 100 }, room = roomOf('2');
  const shapes = [{ place: 'X', rect: { x: 150, y: 80, w: 96.5, h: 40 }, alpha: 1 }, { place: 'Y', rect: { x: 249.5, y: 80, w: 80.5, h: 40 }, alpha: 1 }];
  const at = onStroke(p, q, room, shapes, VIEW);
  assert.ok(near(at.y, 100) && at.x - room.w / 2 >= 330, `past the second place, its room clear of it: ${at.x}`);
  assert.equal(run([countLabel(at, '2', VIEW)], shapes).set.length, 1, 'the pass sets it there');
  assert.equal(run([countLabel({ x: 248, y: 100 }, '2', VIEW)], shapes).out[0].reason, 'meets', 'in the gap it would meet a place');
});

test('the count\'s room stands wholly between the stroke\'s ends: past the place it leaves, short of a stub\'s triangle\'s base', () => {
  // a stroke down from a place's centre to a stub's triangle's base, 12 px of it past the place's box: room for a line box, and no more
  const p = { x: 100, y: 100 }, q = { x: 100, y: 160 }, room = roomOf('2');
  const at = onStroke(p, q, room, [{ place: 'X', rect: { x: 80, y: 60, w: 40, h: 88 }, alpha: 1 }], VIEW);
  assert.ok(near(at.x, 100) && at.y - room.h / 2 >= 148 - 1e-9 && at.y + room.h / 2 <= q.y + 1e-9, `between the box's bottom at 148 and the base at 160: ${at.y - room.h / 2}–${at.y + room.h / 2}`);
});

test('the count stands inside the visible view: a stroke whose middle lies under the one line sets its count below the line', () => {
  const seen = { x: 0, y: 30, w: 1000, h: 770 }, room = roomOf('3');
  const at = onStroke({ x: 500, y: -60 }, { x: 500, y: 100 }, room, [], seen);
  assert.ok(near(at.x, 500) && at.y - room.h / 2 >= seen.y - 1e-9, `below the line's bottom at ${seen.y}: ${at.y - room.h / 2}`);
  assert.equal(run([countLabel(at, '3', seen)]).set.length, 1);
  assert.equal(run([countLabel({ x: 500, y: 20 }, '3', seen)]).set.length, 0, 'at the stroke\'s middle its room would stand under the line');
});

test('a place drawn the weaker blocks no count', () => {
  const at = onStroke({ x: 100, y: 100 }, { x: 300, y: 100 }, roomOf('2'), [{ place: 'X', rect: { x: 180, y: 80, w: 60, h: 40 }, alpha: 0.4 }], VIEW);
  assert.ok(near(at.x, 200) && near(at.y, 100));
});

test('where no stretch of the stroke is clear the count stands at its middle, and the pass leaves it out', () => {
  const shapes = [{ place: 'X', rect: { x: 0, y: 0, w: 400, h: 400 }, alpha: 1 }];
  const at = onStroke({ x: 100, y: 100 }, { x: 300, y: 200 }, roomOf('2'), shapes, VIEW);
  assert.deepEqual(at, { x: 200, y: 150 });
  assert.deepEqual(run([countLabel(at, '2', VIEW)], shapes).out.map((o) => o.reason), ['meets']);
});

test('over many random strokes a count stands on its stroke, and wherever the stroke has room clear of every place drawn the stronger, the pass sets it there: inside the visible view, between the ends, meeting no such place', () => {
  let seed = 11;
  const rnd = () => (seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648;
  /** any overlap at all: the oracle's own, stricter than the pass's half px */
  const overlaps = (/** @type {Rect} */ a, /** @type {Rect} */ b) => Math.min(a.x + a.w, b.x + b.w) > Math.max(a.x, b.x) && Math.min(a.y + a.h, b.y + b.h) > Math.max(a.y, b.y);
  let clear = 0, moved = 0;
  for (let frame = 0; frame < 400; frame++) {
    const top = rnd() * 40, seen = { x: 0, y: top, w: 1000, h: 800 - top };
    /** @type {Shape[]} */
    const shapes = Array.from({ length: Math.floor(rnd() * 24) }, (_, i) => ({ place: 'p' + i, rect: { x: rnd() * 1000 - 60, y: rnd() * 800 - 60, w: 15 + rnd() * 160, h: 15 + rnd() * 200 }, alpha: rnd() }));
    const p = { x: rnd() * 1000, y: rnd() * 800 }, q = { x: rnd() * 1000, y: rnd() * 800 };
    const dx = q.x - p.x, dy = q.y - p.y, len = Math.hypot(dx, dy);
    if (len < 1) continue;
    const text = String(2 + Math.floor(rnd() * 40)), room = roomOf(text);
    const at = onStroke(p, q, room, shapes, seen);
    const t = ((at.x - p.x) * dx + (at.y - p.y) * dy) / (len * len);
    assert.ok(Math.abs((at.x - p.x) * dy - (at.y - p.y) * dx) <= 1e-6 * len && t >= -1e-9 && t <= 1 + 1e-9, `on the stroke: ${JSON.stringify({ p, q, at })}`);
    // the oracle: a spot on the stroke whose room lies inside the visible view, between the ends, and apart from every place drawn the stronger
    const reach = (Math.abs(dx) * room.w / 2 + Math.abs(dy) * room.h / 2) / len;
    const roomAt = (/** @type {number} */ s) => ({ x: p.x + dx * s - room.w / 2, y: p.y + dy * s - room.h / 2, ...room });
    const fits = (/** @type {number} */ s) => { const r = roomAt(s); return r.x >= seen.x && r.y >= seen.y && r.x + r.w <= seen.x + seen.w && r.y + r.h <= seen.y + seen.h && s * len >= reach && (1 - s) * len >= reach && shapes.every((sh) => sh.alpha < 0.5 || !overlaps(r, sh.rect)); };
    if (!Array.from({ length: 1001 }, (_, i) => i / 1000).some(fits)) continue;
    clear++;
    if (!fits(0.5)) moved++;
    const r = run([countLabel(at, text, seen)], shapes);
    assert.equal(r.set.length, 1, `the stroke has room clear of every place, and the pass sets the count there: ${JSON.stringify({ p, q, at, out: r.out })}`);
    const line = r.set[0].lines[0].rect;
    assert.ok(inside(line, seen), 'inside the visible view');
    assert.ok(t * len >= reach - 1e-6 && (1 - t) * len >= reach - 1e-6, 'its room between the stroke\'s ends');
    for (const sh of shapes) if (sh.alpha >= 0.5) assert.ok(!meets(line, sh.rect), `${text} meets ${sh.place}`);
  }
  assert.ok(clear > 200 && moved > 30, `strokes with room (${clear}), of them ones whose middle a place takes (${moved}): the rule is held over counts moved off the middle, not over none`);
});

test('a tail\'s room runs right from its point to the first shape drawn the stronger its band meets, none where one holds the point, else to the visible view\'s edge — a place named left out (issue #132)', () => {
  const at = { x: 100, y: 100 }, h = 10;
  assert.equal(roomRight(at, h, [], VIEW), 900, 'nothing in its way: to the view\'s right edge');
  /** @type {Shape[]} */
  const shapes = [
    { place: 'A', rect: { x: 0, y: 90, w: 104, h: 40 }, alpha: 1 },
    { place: 'B', rect: { x: 150, y: 105, w: 50, h: 50 }, alpha: 1 },
    { place: 'C', rect: { x: 120, y: 60, w: 50, h: 40.4 }, alpha: 1 },
    { place: 'D', rect: { x: 130, y: 100, w: 10, h: 10 }, alpha: 0.4 },
  ];
  assert.equal(roomRight(at, h, shapes, VIEW), 0, 'a shape holding its point: none');
  assert.equal(roomRight(at, h, shapes, VIEW, 'A'), 50, 'its own place left out: to B, whose top its band meets; C ends above the band, D drawn the weaker');
  assert.equal(roomRight({ x: 1100, y: 100 }, h, [], VIEW), 0, 'past the view: none');
});

test('a tail\'s label set in its room meets no shape: its address whole, its words cut to the room; where the address does not fit, the label is left out', () => {
  /** @type {Shape[]} */
  const shapes = [{ place: 'next', rect: { x: 200, y: 80, w: 100, h: 60 }, alpha: 1 }];
  const tail = (/** @type {number} */ x) => {
    const w = roomRight({ x, y: 100 }, 2 * LH, shapes, VIEW, 'tail');
    return run([label([part('1.0.1.0.1049578'), part('nothing this board will say about this address', 'cut')], { kind: 'tail', place: 'tail', within: { x, y: 100, w, h: 2 * LH }, x, y: 100, plate: '#000' })], shapes);
  };
  const r = tail(40);
  assert.deepEqual(texts(r).map((x) => x.endsWith('…') || x === '1.0.1.0.1049578'), [true, true], `the address whole, the words cut: ${texts(r)}`);
  for (const l of r.set[0].lines) assert.ok(l.rect.x + l.rect.w <= 200 + 0.5, 'short of the next place');
  const narrow = tail(150);
  assert.deepEqual([narrow.set.length, narrow.out[0].reason], [0, 'width'], 'fifty px: the address does not fit — left out, never cut');
});

// ---- the hold (FP-26) ------------------------------------------------------------------------------------------------

/** the visible view below a one line 30 px deep, and the hold's height below it */
const SEEN = { x: 0, y: 30, w: 1000, h: 770 }, HELD_AT = SEEN.y + HOLD.gap;
/** a document's label as P-RENDER hands it over: its address, its first line, its badge; its first row's top risen to `y` */
const docLabel = (/** @type {Partial<Label>} */ o = {}) => label([part('.0.3', 'one', 13), part('The artifact chain', 'cut'), part('6 links', 'wrap')],
  { within: { x: 110, y: -90, w: 300, h: 100 }, x: 110, y: -90, plate: '#161b22', hold: { rects: [{ x: 100, y: -100, w: 320, h: 400 }], pad: 10, plate: '#161b22' }, ...o });

test('a sign held below the one line stands at its place\'s top while that stands below the hold, else at the hold; its place\'s foot rising pushes it up under the line, never above its own top (issue #169)', () => {
  assert.equal(holdTop(200, 38, 900, 20), 200, 'its place\'s top below the hold: there');
  assert.equal(holdTop(-100, 38, 900, 20), 38, 'its place\'s top risen past the line: at the hold');
  assert.equal(holdTop(-100, 38, 50, 20), 30, 'its place\'s foot risen: its height above the foot, under the line');
  assert.equal(holdTop(10, 38, 20, 20), 10, 'a place shorter than it: at its own top');
});

test('a held label\'s one line: its head whole, else none; a badge kept whole beside it, else dropped; a first line cut to the room the two leave, ending in its ellipsis, else dropped (issue #169: "dropping words before address", "Its link badge holds with it")', () => {
  const parts = [part('.0.3'), part('The artifact chain', 'cut'), part('6 links', 'wrap')];
  const at = (/** @type {number} */ w) => (heldLine(parts, w, measure) || []).map((m) => [m.text, +m.x.toFixed(2)]);
  assert.deepEqual(at(200), [['.0.3', 0], ['The artifact chain', 27], ['6 links', 129.6]], 'room for all three, in their order, a space at their size between');
  assert.deepEqual(at(100).map(([s]) => s), ['.0.3', 'The…', '6 links'], 'the words cut to what the address and the badge leave');
  assert.deepEqual(at(60).map(([s]) => s), ['.0.3', 'The a…'], 'the badge dropped where it does not fit beside the address, the words cut to the rest');
  assert.deepEqual(at(30).map(([s]) => s), ['.0.3'], 'no room for a character and its ellipsis: the words dropped');
  assert.equal(heldLine(parts, 20, measure), null, 'the address wider than the room: no label, never an address cut');
  const mark = [part('+≥ 470 more — newest .0.1012', 'wrap'), part('RES-5 — any user', 'fill')];
  assert.deepEqual(heldLine(mark, 200, measure)?.map((m) => m.text), ['+≥ 470 more — newest .0.1012', 'RES-5 —…'], 'a mark\'s count its head, set whole on its one line, its newest\'s first line cut beside it');
  assert.equal(heldLine(mark, 120, measure), null, 'the count wider than the room: no label, never the count wrapped or cut');
});

test('a label whose first line rises above the hold stands held: one line at the hold, at the top-left of its place\'s visible part inside its pad, on its place\'s ground, its address first (issue #169)', () => {
  const r = setLabels([docLabel()], [], SEEN, measure);
  assert.deepEqual(r.out, [], 'nothing left out');
  const l = r.set[0], lh = lineHeight(13);
  assert.ok(l.held, 'held');
  assert.deepEqual(l.lines.map((x) => x.text), ['.0.3', 'The artifact chain', '6 links'], 'the address first, the words, the badge');
  assert.ok(l.lines.every((x) => x.rect.y === HELD_AT && x.rect.h === lh), `one line, ${lh} px deep, at ${HELD_AT}: ${JSON.stringify(l.lines.map((x) => x.rect))}`);
  assert.deepEqual([l.lines[0].rect.x, l.within, l.plate], [110, { x: 110, y: HELD_AT, w: 300, h: lh }, '#161b22'], 'at its place\'s left inside its pad, across its place, on its ground');
});

test('a held label short of room drops its words and its badge and never its address; where its address does not fit, it is left out whole (issue #169: "If the address itself cannot fit whole, draw no label")', () => {
  const narrow = setLabels([docLabel({ hold: { rects: [{ x: 100, y: -100, w: 60, h: 400 }], pad: 10, plate: null } })], [], SEEN, measure);
  assert.deepEqual(narrow.set[0].lines.map((x) => x.text), ['.0.3'], 'the address alone');
  assert.deepEqual(narrow.out.map((o) => [o.text, o.reason]), [['The artifact chain', 'width'], ['6 links', 'width']], 'the words and the badge named left out for the width');
  const none = setLabels([docLabel({ hold: { rects: [{ x: 100, y: -100, w: 45, h: 400 }], pad: 10, plate: null } })], [], SEEN, measure);
  assert.deepEqual([none.set.length, none.out.map((o) => o.reason)], [0, ['width', 'after', 'after']], 'no label: the address never cut');
});

test('a held label\'s place\'s foot rising pushes it up under the one line, set while its bottom is in view and left out wholly under it (issue #169: "As the box\'s bottom edge rises, it pushes the label up under the line")', () => {
  const lh = lineHeight(13);
  const risen = (/** @type {number} */ bottom) => setLabels([docLabel({ y: -290, hold: { rects: [{ x: 100, y: -300, w: 320, h: bottom + 300 }], pad: 10, plate: null } })], [], SEEN, measure);
  const pushed = risen(50);
  assert.ok(pushed.set.length === 1 && Math.abs(pushed.set[0].within.y - (40 - lh)) < 1e-9, `its foot at 40: its line ends there, under the line from ${40 - lh}`);
  assert.ok(pushed.set[0].within.y < SEEN.y, 'part of it under the line');
  const gone = risen(30);
  assert.deepEqual([gone.set.length, gone.out[0].reason], [0, 'view'], 'its foot at 20, the line\'s bottom at 30: wholly under it, left out');
});

test('a held label inside a region whose label is held stands just below the region\'s; a label with no hold — a place the one line names — is left out under the line as before (issue #169: "Nested", "Named once")', () => {
  const region = label([part('1.0.2 · 3 documents', 'one', 10)], { kind: 'frame', place: 'R', within: { x: 8, y: -60, w: 980, h: 12 }, x: 8, y: -60, hold: { rects: [{ x: 0, y: -200, w: 1000, h: 900 }], pad: 8, plate: null } });
  const r = setLabels([region, docLabel()], [], SEEN, measure);
  assert.deepEqual(r.set.map((l) => [l.place, l.held, l.within.y]), [['R', true, HELD_AT], ['A', true, HELD_AT + lineHeight(10)]], 'the region\'s at the hold, its document\'s just below it');
  const named = setLabels([docLabel({ hold: null })], [], SEEN, measure);
  assert.deepEqual([named.set.length, named.out[0].reason], [0, 'view'], 'no hold: left out, past the visible view');
  const unrisen = setLabels([docLabel({ y: 60, within: { x: 110, y: 60, w: 300, h: 100 } })], [], SEEN, measure);
  assert.deepEqual([unrisen.set[0].held, unrisen.set[0].lines.length], [false, 3], 'its first line below the hold: set in its place as ever, line by line');
});

test('the room across a held line is its place\'s at the line\'s foot: the narrowest row the line meets, a short last column\'s width only where the line stands beside it (issue #169: "A label never leaves its box")', () => {
  const rows = [{ x: 0, y: 0, w: 300, h: 100 }, { x: 0, y: 100, w: 200, h: 100 }, { x: 200, y: 100, w: 100, h: 40 }];
  assert.deepEqual(across(rows, 20, 12, 5), { x: 5, w: 290 }, 'the first row');
  assert.deepEqual(across(rows, 110, 12, 5), { x: 5, w: 290 }, 'beside the short last column: the row with it');
  assert.deepEqual(across(rows, 150, 12, 5), { x: 5, w: 190 }, 'past the short column\'s foot: the row without it');
  assert.equal(across(rows, 250, 12, 5), null, 'past the place: none');
});

test('over many random frames every held line stands inside its place — between its rows\' edges at its line\'s foot, above its foot — its bottom in view, meeting no other place\'s shape drawn the stronger and no other line (issue #169)', () => {
  let seed = 23;
  const rnd = () => (seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648;
  let heldSet = 0, pushedUp = 0;
  for (let frame = 0; frame < 300; frame++) {
    const top = rnd() * 40, seen = { x: 0, y: top, w: 1000, h: 800 - top };
    /** @type {Shape[]} */
    const shapes = [];
    /** @type {Label[]} */
    const labels = [];
    /** @type {Map<string, {rects: Rect[], pad: number}>} */
    const places = new Map();
    for (let i = 0; i < 12; i++) {
      const place = 'p' + i, x0 = (i % 4) * 250 + 5 - rnd() * 60, y0 = Math.floor(i / 4) * 300 - 260 + rnd() * 280, alpha = rnd() < 0.85 ? 1 : 0.3;
      /** @type {Rect[]} */
      const rects = [];
      let w = 60 + rnd() * 180, y = y0;
      for (let k = 0, n = 1 + Math.floor(rnd() * 4); k < n; k++) { const h = 20 + rnd() * 60; rects.push({ x: x0, y, w, h }); y += h; w *= 0.5 + 0.5 * rnd(); }
      const pad = 2 + rnd() * 6;
      places.set(place, { rects, pad });
      for (const r of rects) shapes.push({ place, rect: r, alpha });
      const parts = [part('.0.' + (1 + Math.floor(rnd() * 999)), 'one', 9 + rnd() * 6), part('the first line of a document here', 'cut'), ...(rnd() < 0.5 ? [part(Math.floor(1 + rnd() * 30) + ' links', 'wrap')] : [])];
      labels.push(label(parts, { place, alpha, within: { x: x0 + pad, y: y0 + pad, w: rects[0].w - 2 * pad, h: rects[0].h - 2 * pad }, x: x0 + pad, y: y0 + pad, hold: rnd() < 0.85 ? { rects, pad, plate: '#000' } : null }));
    }
    const r = setLabels(labels, shapes, seen, measure);
    const lines = r.set.flatMap((l) => l.lines.map((x) => ({ place: l.place, held: l.held, ...x })));
    for (const l of r.set.filter((x) => x.held)) {
      heldSet++;
      const { rects, pad } = /** @type {{rects: Rect[], pad: number}} */ (places.get(l.place)), q = l.within, at = q.y + q.h - 0.5;
      const row = rects.filter((k) => k.y <= at && at < k.y + k.h), foot = Math.max(...rects.map((k) => k.y + k.h)) - pad;
      if (q.y < seen.y + HOLD.gap - 0.5) pushedUp++;
      assert.ok(l.lines.every((x) => x.rect.y === q.y && x.rect.h === q.h), `one line: ${JSON.stringify(l.lines.map((x) => x.rect))}`);
      for (const x of l.lines) {
        const left = Math.min(...row.map((k) => k.x)) + pad, right = Math.max(...row.map((k) => k.x + k.w)) - pad;
        assert.ok(row.length && x.rect.x >= left - 0.5 && x.rect.x + x.rect.w <= right + 0.5 && x.rect.y + x.rect.h <= foot + 0.5, `${x.text} inside its place: ${JSON.stringify({ rect: x.rect, left, right, foot })}`);
        assert.ok(x.rect.y + x.rect.h > seen.y + 0.5 && x.rect.x >= seen.x - 0.5 && x.rect.x + x.rect.w <= seen.x + seen.w + 0.5, `${x.text}'s bottom in view: ${JSON.stringify(x.rect)}`);
        for (const s of shapes) if (s.alpha >= 0.5 && s.place !== l.place) assert.ok(!meets(x.rect, s.rect), `${x.text} meets ${s.place}'s shape`);
      }
    }
    for (let i = 0; i < lines.length; i++) for (let j = i + 1; j < lines.length; j++) assert.ok(!meets(lines[i].rect, lines[j].rect), `${lines[i].text} meets ${lines[j].text}`);
  }
  assert.ok(heldSet > 150 && pushedUp > 10, `labels held (${heldSet}), of them pushed up by their place's foot (${pushedUp}): the rule held over labels held, not over none`);
});

test('a part is set in its face, a stretch of it marked in another set in that one: each line\'s runs in their faces, its width their widths, its words as a person reads them (issue #16)', () => {
  const words = `${inFace('ident', '1.0.4')} · 3 documents`;
  assert.deepEqual(runsOf(words, 'client'), [{ text: '1.0.4', face: 'ident' }, { text: ' · 3 documents', face: 'client' }]);
  assert.equal(plain(words), '1.0.4 · 3 documents');
  const r = setLabels([label([{ text: words, px: 10, ink: '#fff', fit: 'one' }, { text: 'A first line', px: 10, ink: '#fff', fit: 'cut', face: 'reading' }])], [], VIEW, byFace);
  const [line, first] = r.set[0].lines;
  assert.deepEqual([line.text, line.runs, line.rect.w], ['1.0.4 · 3 documents', runsOf(words, 'client'), 5 * 10 * 0.6 + 14 * 10 * 0.5], 'the address in the identifier\'s face, the counts in the client\'s');
  assert.deepEqual([first.text, first.runs, first.rect.w], ['A first line', [{ text: 'A first line', face: 'reading' }], 12 * 10 * 0.45], 'a first line in the reading face');
  assert.equal(face(10, '600', 'ident'), `600 10px ${FACE.ident}`, 'each run\'s font its face\'s stack');
  assert.equal(face(9), `9px ${FACE.client}`, 'the client\'s where none is named');
});

test('a cut never falls inside an address: it ends before the address or after it, and a part wrapped at its spaces keeps each word\'s face (F-9; issue #16)', () => {
  const text = `withheld · ${inFace('ident', '1.0.123456')} · more words here`;
  for (const w of [60, 72, 90, 110, 130, 150]) {
    const r = setLabels([label([{ text, px: 10, ink: '#fff', fit: 'cut' }], { within: { x: 10, y: 10, w, h: 200 } })], [], VIEW, byFace);
    const line = r.set.length ? r.set[0].lines[0] : null;
    if (!line) continue;
    const id = line.runs.filter((x) => x.face === 'ident').map((x) => x.text).join('');
    assert.ok(id === '' || id === '1.0.123456', `${w} px: the address whole or not at all — ${JSON.stringify(line.runs)}`);
    assert.ok(line.rect.w <= w + 1e-6, `${w} px: within its place`);
  }
  const wrapped = setLabels([label([{ text: `newest ${inFace('reading', 'The artifact chain')}`, px: 10, ink: '#fff', fit: 'wrap' }], { within: { x: 10, y: 10, w: 60, h: 200 } })], [], VIEW, byFace);
  assert.deepEqual(wrapped.set[0].lines.map((l) => l.runs), [[{ text: 'newest ', face: 'client' }, { text: 'The', face: 'reading' }], [{ text: 'artifact', face: 'reading' }], [{ text: 'chain', face: 'reading' }]], 'each word of the first line in the reading face, on whatever line it falls, the space between two words the part\'s own');
});

test('the client\'s figures stand apart from its words, for the canvas sets each in a cell as wide as the face\'s widest (issue #16)', () => {
  assert.deepEqual(figuresOf('≥ 503 documents · 12 links'), [{ text: '≥ ', figures: false }, { text: '503', figures: true }, { text: ' documents · ', figures: false }, { text: '12', figures: true }, { text: ' links', figures: false }]);
  assert.deepEqual(figuresOf('links'), [{ text: 'links', figures: false }]);
  assert.deepEqual(figuresOf('7'), [{ text: '7', figures: true }]);
});

test('a held label\'s parts carry their runs: its address in the identifier\'s face, its first line in the reading face\'s (issue #16)', () => {
  const line = /** @type {NonNullable<ReturnType<typeof heldLine>>} */ (heldLine([{ text: '.0.3', px: 10, ink: '#fff', fit: 'one', face: 'ident' }, { text: 'The artifact chain', px: 10, ink: '#fff', fit: 'cut', face: 'reading' }], 400, byFace));
  assert.deepEqual(line.map((m) => [m.text, m.runs]), [['.0.3', [{ text: '.0.3', face: 'ident' }]], ['The artifact chain', [{ text: 'The artifact chain', face: 'reading' }]]]);
  assert.equal(line[1].x, 4 * 10 * 0.6 + 10 * 0.45, 'the first line one space of its own face past the address, set at its width');
});
