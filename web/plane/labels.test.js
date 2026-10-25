// P-LABEL's test: every label set at its rule's size and never below the
// floor; an address or a count never cut, a first line cut on a whole word —
// two of its words kept at the least, its close kept after the ellipsis — or
// wrapped down to its place's bottom, a part past the bottom left out with
// every part after it; a document's contents line — its first line from
// where its words stand, its address whole at the row's end, standing alone
// there where no first line fits, the label left out whole where the address
// does not, its row the same height known or not — its address past its
// region's prefix only where the region is named in view, held or not; first
// lines that read alike once cut cut apart where they differ; no label meeting another place's shape or a label set before it,
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
import { setLabels, sizeOf, lineHeight, onStroke, roomRight, pairOf, holdTop, heldLine, heldContents, apartTexts, cutWords, across, inFace, plain, runsOf, figuresOf, face, LINE_BOX, LEAD_WORDS } from './labels.js';
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

test('a first line alone is cut, to its place\'s width, on a whole word ending in its ellipsis — a separator ending the cut dropped, the bracket its words close with kept after it — and where fewer than two of its words fit so it is left out, the whole of a shorter one set where it fits (issue #23)', () => {
  const at = (/** @type {number} */ w, /** @type {Part} */ first) => run([label([part('.0.4'), first], { within: { x: 10, y: 10, w, h: 200 } })]);
  // 5.4 px a character at 9 px: "The artifact…" is 70.2 px
  const r = at(80, part('The artifact chain', 'cut'));
  assert.deepEqual(texts(r), ['.0.4', 'The artifact…'], 'cut after its second word, never inside its third');
  for (const l of r.set[0].lines) assert.ok(l.rect.w <= 80, `${l.text} is ${l.rect.w} px`);
  const one = at(60, part('The artifact chain', 'cut'));
  assert.deepEqual([texts(one), one.out.map((o) => [o.text, o.reason])], [['.0.4'], [['The artifact chain', 'width']]], 'room for one word alone: the first line left out, its address set');
  assert.deepEqual(texts(at(60, part('Tumbler.', 'cut'))), ['.0.4', 'Tumbler.'], 'a first line of one word, whole where it fits');
  assert.deepEqual(texts(at(110, part('The artifact · chain of custody', 'cut'))), ['.0.4', 'The artifact…'], 'a separator ending the cut is dropped');
  const bracketed = at(140, { ...part('[your home document — published here from birth]', 'cut'), close: ']' });
  assert.deepEqual(texts(bracketed), ['.0.4', '[your home document…]'], 'the client\'s words cut inside their brackets, the closing one kept after the ellipsis');
});

test('a word cut never ends inside a word, so never inside an address, and keeps at the least the words it is asked to (issue #23)', () => {
  const fits = (/** @type {number} */ n) => (/** @type {string} */ s) => [...plain(s)].length <= n;
  assert.equal(cutWords('alpha beta gamma delta', fits(17)), 'alpha beta gamma…');
  assert.equal(cutWords('alpha beta gamma delta', fits(16)), 'alpha beta…');
  assert.equal(cutWords('alpha beta', fits(6), '', 2), null, 'one word fits: fewer than the two asked');
  assert.equal(cutWords(`see ${inFace('ident', '1.0.123456')} today`, fits(12)), 'see…', 'an address never cut: the words before it');
  assert.equal(cutWords(`see ${inFace('ident', '1.0.123456')} today`, fits(16)), `see ${inFace('ident', '1.0.123456')}…`, 'or the address whole');
  assert.equal(cutWords('anextraordinarilylongword and more', fits(10)), null, 'its first word wider than the room: none');
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

test('a held label\'s one line: its head whole, else none; a badge kept whole beside it, else dropped; a first line cut on a word to the room the two leave, ending in its ellipsis, else dropped (issue #169: "dropping words before address", "Its link badge holds with it"; issue #23)', () => {
  const parts = [part('.0.3'), part('The artifact chain', 'cut'), part('6 links', 'wrap')];
  const at = (/** @type {number} */ w) => (heldLine(parts, w, measure) || []).map((m) => [m.text, +m.x.toFixed(2)]);
  assert.deepEqual(at(200), [['.0.3', 0], ['The artifact chain', 27], ['6 links', 129.6]], 'room for all three, in their order, a space at their size between');
  assert.deepEqual(at(150).map(([s]) => s), ['.0.3', 'The artifact…', '6 links'], 'the words cut on a word to what the address and the badge leave');
  assert.deepEqual(at(100).map(([s]) => s), ['.0.3', '6 links'], 'room for one word of them alone: the words dropped');
  assert.deepEqual(at(60).map(([s]) => s), ['.0.3'], 'the badge dropped where it does not fit beside the address');
  assert.equal(heldLine(parts, 20, measure), null, 'the address wider than the room: no label, never an address cut');
  const mark = [part('+≥ 470 more — newest .0.1012', 'wrap'), part('RES-5 — any user', 'fill')];
  assert.deepEqual(heldLine(mark, 260, measure)?.map((m) => m.text), ['+≥ 470 more — newest .0.1012', 'RES-5 — any user'], 'a mark\'s count its head, set whole on its one line, its newest\'s first line beside it');
  assert.deepEqual(heldLine(mark, 200, measure)?.map((m) => m.text), ['+≥ 470 more — newest .0.1012'], 'room for one word of the first line: it is dropped');
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

// ---- the contents line, the region, the cut apart (issue #23) ---------------------------------------------------------

/** a document's label as P-RENDER hands one over: its contents line on the row at `y`, its lead from `from` to `to`, its address ending at `end`, its badge beneath */
const contents = (/** @type {{lead?: string | null, from?: number, to?: number, end?: number, address?: string, whole?: string, region?: string | null, y?: number, badge?: string}} */ o = {}) => label(o.badge ? [part(o.badge, 'wrap')] : [], {
  within: { x: 10, y: 10, w: 300, h: 200 }, x: 10, y: o.y ?? 40, region: o.region ?? null,
  contents: { lead: o.lead === null ? null : part(o.lead ?? 'The artifact chain of custody', 'cut', 12), px: 12, address: { ...part(o.address ?? '.0.3'), whole: o.whole ?? '1.0.1.0.3', face: 'ident' }, from: o.from ?? 20, to: o.to ?? 200, end: o.end ?? 300 },
});
/** the line of a set label whose runs are all in the identifier's face: its address */
const addressOf = (/** @type {import('./labels.js').SetLabel} */ l) => l.lines.find((x) => x.runs.every((q) => q.face === 'ident'));

test('a contents line sets its first line from where its words stand, cut on a word to the room before its column\'s end and a space short of its address, and its address whole at the row\'s end; its row one line box of the larger, each centred on it (issue #23)', () => {
  // the address ".0.3" 21.6 px at 9 px, ending at 300; the first line at 12 px, 7.2 px a character, from 20 to its column's end at 200
  const r = run([contents()]);
  const l = r.set[0], a = /** @type {import('./labels.js').SetLine} */ (addressOf(l)), first = l.lines[0], lh = 12 * LINE_BOX;
  assert.deepEqual(l.lines.map((x) => x.text), ['The artifact chain of…', '.0.3'], 'its first line, cut on a word, then its address');
  assert.ok(Math.abs(a.rect.x + a.rect.w - 300) < 1e-9 && Math.abs(a.rect.w - 4 * 9 * 0.6) < 1e-9, `the address ends at the row's end: ${JSON.stringify(a.rect)}`);
  assert.ok(first.rect.x === 20 && first.rect.x + first.rect.w <= 200 + 1e-9, `the first line from where its words stand, inside its column: ${JSON.stringify(first.rect)}`);
  const close = run([contents({ to: 300 })]).set[0].lines[0];
  assert.ok(close.rect.x + close.rect.w <= 300 - 21.6 - 7.2 + 1e-9, `a column reaching the address: the first line a space short of it: ${JSON.stringify(close.rect)}`);
  assert.ok(Math.abs(first.rect.y + first.rect.h / 2 - (40 + lh / 2)) < 1e-9 && Math.abs(a.rect.y + a.rect.h / 2 - (40 + lh / 2)) < 1e-9, 'each centred on the row');
});

test('where no first line is known, or too few of its words fit before the address, the address stands alone at the same end, so words arriving later never move it; where the address does not fit whole, the label is left out whole (issue #23)', () => {
  const address = (/** @type {Parameters<typeof contents>[0]} */ o) => { const r = run([contents(o)]); return { r, a: r.set[0] ? addressOf(r.set[0]) : null }; };
  const known = address({ lead: 'The artifact chain of custody' }), unknown = address({ lead: null }), narrow = address({ to: 40 });
  assert.ok(known.a && unknown.a && narrow.a, 'an address set in each');
  assert.deepEqual([unknown.a?.rect, narrow.a?.rect], [known.a?.rect, known.a?.rect], 'the address where it stood with its first line beside it');
  assert.deepEqual([unknown.r.set[0].lines.length, narrow.r.set[0].lines.length, narrow.r.out.map((o) => o.reason)], [1, 1, ['width']], 'the address alone; the first line too wide for two of its words named left out for its width');
  const empty = address({ lead: '   ' });
  assert.equal(empty.r.set[0].lines.length, 1, 'an empty document\'s: the address alone');
  const none = run([{ ...contents({ end: 300 }), within: { x: 10, y: 10, w: 290, h: 200 } }].map((l) => ({ ...l, contents: l.contents && { ...l.contents, end: 315 } })));
  assert.deepEqual([none.set.length, none.out.map((o) => o.reason)], [0, ['width', 'after']], 'the address past its room: no label at all, never the first line alone');
});

test('a contents label\'s badge stands beneath its row, from its column\'s left (issue #23)', () => {
  const r = run([contents({ badge: '6 links' })]);
  const badge = r.set[0].lines.find((x) => x.text === '6 links');
  assert.ok(badge && badge.rect.x === 10 && badge.rect.y >= 40 + 12 * LINE_BOX - 1e-9, `beneath the row: ${JSON.stringify(badge)}`);
});

test('a label\'s address drops its region\'s prefix only where that region is named in view — its own label set before it in the pass, or the one line naming it — and is whole elsewhere, the held form too (issue #23; foundations F-9)', () => {
  const doc = () => contents({ region: '1.0.1' });
  const frame = label([part('1.0.1 · 3 documents')], { kind: 'frame', place: '1.0.1', within: { x: 400, y: 10, w: 300, h: 40 }, x: 400, y: 10 });
  const addr = (/** @type {ReturnType<typeof run>} */ r) => addressOf(/** @type {import('./labels.js').SetLabel} */ (r.set.find((l) => l.kind === 'doc')))?.text;
  assert.equal(addr(run([doc()])), '1.0.1.0.3', 'nothing in view names its region: its whole address');
  assert.equal(addr(run([frame, doc()])), '.0.3', 'its region\'s label set before it: the fields past the prefix');
  const blocked = label([part('1.0.1 · 3 documents')], { kind: 'frame', place: '1.0.1', within: { x: 400, y: 10, w: 30, h: 40 }, x: 400, y: 10 });
  assert.equal(addr(run([blocked, doc()])), '1.0.1.0.3', 'its region\'s label left out: whole');
  assert.equal(addr(setLabels([doc()], [], VIEW, measure, new Set(['1.0.1']))), '.0.3', 'the one line naming its region: the fields past the prefix');
  // held below the line: its region's held label above it, or none
  const held = { ...doc(), y: -60, hold: { rects: [{ x: 0, y: -100, w: 400, h: 400 }], pad: 10, plate: null } };
  const regionHeld = label([part('1.0.1 · 3 documents')], { kind: 'frame', place: '1.0.1', within: { x: 0, y: -200, w: 1000, h: 12 }, x: 0, y: -200, hold: { rects: [{ x: 0, y: -300, w: 1000, h: 1200 }], pad: 0, plate: null } });
  const heldAddr = (/** @type {Label[]} */ ls) => { const r = setLabels(ls, [], SEEN, measure); const l = r.set.find((x) => x.kind === 'doc'); return l && { held: l.held, addr: addressOf(l)?.text }; };
  assert.deepEqual(heldAddr([held]), { held: true, addr: '1.0.1.0.3' }, 'held, its region named nowhere: whole');
  assert.deepEqual(heldAddr([regionHeld, held]), { held: true, addr: '.0.3' }, 'held beneath its region\'s held label: the fields past the prefix');
});

test('a contents line held: its address at the line\'s end, whole, else no line; a badge whole just before it; its first line from the line\'s start, cut on a word to the room those leave, else dropped (issue #23; issue #169)', () => {
  const c = { lead: part('The artifact chain', 'cut'), address: part('.0.3') }, badge = [part('6 links', 'wrap')];
  const at = (/** @type {number} */ w, /** @type {Part[]} */ ps = badge) => (heldContents(c, ps, w, measure) || []).map((m) => [m.text, +m.x.toFixed(2)]);
  // ".0.3" 21.6, "6 links" 37.8, a space 5.4, "The artifact chain" 97.2, "The artifact…" 70.2
  assert.deepEqual(at(200), [['The artifact chain', 0], ['6 links', 200 - 21.6 - 5.4 - 37.8], ['.0.3', 200 - 21.6]], 'room for all: the first line at the start, the address at the end, the badge before it');
  assert.deepEqual(at(150).map(([s]) => s), ['The artifact…', '6 links', '.0.3'], 'the first line cut on a word to the room left');
  assert.deepEqual(at(100).map(([s]) => s), ['6 links', '.0.3'], 'room for one word of it: dropped');
  assert.deepEqual(at(50).map(([s]) => s), ['.0.3'], 'the badge dropped where it does not fit');
  assert.ok(Math.abs((heldContents(c, badge, 50, measure) || [])[0].x - (50 - 21.6)) < 1e-9, 'the address alone at the line\'s end');
  assert.equal(heldContents(c, badge, 20, measure), null, 'the address wider than the line: none');
});

test('first lines that read alike once cut are cut again to show where they differ: the first word, an ellipsis, then the words from the first that differs, in the room each was set in; texts that differ before their second word, or are the same, are left as shown (issue #23)', () => {
  const room = (/** @type {number} */ n) => (/** @type {string} */ s) => [...plain(s)].length <= n;
  const a = 'Notes on the meeting of the third', b = 'Notes on the meeting of the ninth', same = 'Notes on the meeting of the third';
  const cut = (/** @type {string} */ s) => /** @type {string} */ (cutWords(s, room(22), '', LEAD_WORDS));
  assert.equal(cut(a), cut(b), 'they read alike once cut');
  const now = apartTexts([a, b, same].map((full) => ({ shown: cut(full), full, close: '', fits: room(22) })));
  assert.deepEqual(now, ['Notes … third', 'Notes … ninth', 'Notes … third'], 'each from the word where it differs from another; the same words as another its alike, both shown apart from the one they differ from');
  assert.deepEqual(apartTexts([{ shown: 'Alpha…', full: 'Alpha beta', close: '', fits: room(6) }, { shown: 'Alpha…', full: 'Alpha gamma', close: '', fits: room(6) }]), ['Alpha…', 'Alpha…'], 'differing at their second word: left as shown');
  assert.deepEqual(apartTexts([{ shown: 'Notes on…', full: 'Notes on the long meeting of the third', close: '', fits: room(9) }, { shown: 'Notes on…', full: 'Notes on the long meeting of the ninth', close: '', fits: room(9) }]), ['Notes on…', 'Notes on…'], 'no room for the first word and the words that differ: left as shown');
  const ends = apartTexts([{ shown: '[x y…]', full: '[x y zeta omega]', close: ']', fits: room(14) }, { shown: '[x y…]', full: '[x y zeta delta]', close: ']', fits: room(14) }]);
  assert.deepEqual(ends, ['[x … omega]', '[x … delta]'], 'a bracketed first line keeps its close');
});

test('the pass cuts its first lines that read alike apart, each within the width it was set at (issue #23)', () => {
  const doc = (/** @type {string} */ place, /** @type {number} */ x, /** @type {string} */ lead) => ({ ...label([], { place, within: { x, y: 10, w: 200, h: 100 }, x, y: 20 }), contents: { lead: part(lead, 'cut'), px: 9, address: part('.0.' + place), from: x, to: x + 140, end: x + 200 } });
  const r = run([doc('3', 10, 'Notes on the meeting of the third'), doc('4', 400, 'Notes on the meeting of the ninth')]);
  const leads = r.set.map((l) => l.lines[0]);
  assert.deepEqual(leads.map((x) => x.text), ['Notes … third', 'Notes … ninth'], 'apart where they differ');
  for (const x of leads) assert.ok(x.rect.w <= 140 + 1e-9 && x.rect.w === measure(x.text, 9), `inside its room, its width its words': ${JSON.stringify(x.rect)}`);
});

test('over many random frames every contents line\'s lines stand inside their place and the view, the address whole at the row\'s end or the label left out whole, meeting no other place\'s shape and no other line (issue #23)', () => {
  let seed = 31;
  const rnd = () => (seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648;
  const words = ['The', 'artifact', 'chain', 'of', 'custody', 'notes', 'on', 'a', 'meeting', 'Tumbler.'];
  let rows = 0;
  for (let frame = 0; frame < 300; frame++) {
    /** @type {Shape[]} */
    const shapes = [];
    /** @type {Label[]} */
    const labels = [];
    for (let i = 0; i < 10; i++) {
      const w = 30 + rnd() * 250, h = 20 + rnd() * 150, x = -60 + rnd() * 1000, y = -60 + rnd() * 800, place = 'p' + i, alpha = rnd() < 0.85 ? 1 : 0.3;
      shapes.push({ place, rect: { x, y, w, h }, alpha });
      const px = 9 + rnd() * 8, lead = rnd() < 0.2 ? null : part(Array.from({ length: 1 + Math.floor(rnd() * 6) }, () => words[Math.floor(rnd() * words.length)]).join(' '), 'cut', px);
      const end = x + w * (0.6 + 0.4 * rnd()), to = x + (end - x) * (0.4 + 0.5 * rnd());
      labels.push({ ...label(rnd() < 0.5 ? [part('6 links', 'wrap')] : [], { place, alpha, within: { x, y, w, h }, x, y: y + rnd() * 20 }),
        contents: { lead, px, address: { ...part('.0.' + Math.floor(rnd() * 999)), face: 'ident' }, from: x + rnd() * 10, to, end } });
    }
    const r = run(labels, shapes);
    const lines = r.set.flatMap((l) => l.lines.map((line) => ({ place: l.place, within: l.within, ...line })));
    for (const l of r.set) {
      const c = /** @type {import('./labels.js').Contents} */ (/** @type {Label} */ (labels.find((x) => x.place === l.place)).contents);
      const a = addressOf(l);
      assert.ok(a && Math.abs(a.rect.x + a.rect.w - c.end) < 1e-9, `${l.place}: its address set, ending at its row's end`);
      rows++;
    }
    for (const l of lines) {
      assert.ok(inside(l.rect, l.within) && inside(l.rect, VIEW), JSON.stringify(l));
      for (const s of shapes) if (s.alpha >= 0.5 && s.place !== l.place) assert.ok(!meets(l.rect, s.rect), `${l.text} meets ${s.place}'s shape`);
    }
    for (let i = 0; i < lines.length; i++) for (let j = i + 1; j < lines.length; j++) assert.ok(!meets(lines[i].rect, lines[j].rect), `${lines[i].text} meets ${lines[j].text}`);
  }
  assert.ok(rows > 100, `contents lines set (${rows}): the invariants held over rows set, not over none`);
});
