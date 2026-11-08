// T-LAYER's test, on a page of stand-ins: the fold a document is set in —
// one size at every stage, toggle and lens, inside its room at the measure,
// a count setting no line; where a passage stands and is read back, and the
// paging key's next column; the corner beside the column nearest the view's
// centre, whole or compact by its room, held below the one line by the one
// hold a label holds by and never meeting a held label's line; a reading
// view framing its column with both margins; the measure in force and a
// resize re-setting the article being read with the passage held at its height
// and the view framed across its column, its corner inside the view, a return
// by the trail across a refit landing framed; a passage read below one bottom
// of the one line, set again or returned to below another, kept at its
// height from the visible view's centre; the corner at its document's
// head below forty characters — its rows, across the column on the band its
// fold reserves, its first row held below the line, a form opened beneath it,
// the band's change re-anchoring the camera — and a kept word said where it
// changes; a
// document's region and the view's window over it; the passage in view
// keeping its place through a reveal, a feed row naming its document — the
// article standing until the reads it makes again set it — a version move
// and an edit above the view, by its bytes' identity, the view's centre on an
// empty line typed below it as well, and the reader told where a text set
// again holds none of it; a flight aimed at a passage of a document set again
// under it landing on that passage, the line under the camera kept where it
// stood; what stands — every
// readable document in the one frame, the limit's order below it, by line,
// the selection's and the focus's lines held, hysteresis, stale articles set
// again and a press holding them; the owner a withheld run names; C-67's
// clause from the model; what an article was made from; a copy named where
// its words were read — a box's at its version, the head its corner names at
// a plain address, and a pane's alike — by its bytes' identity, never a
// draft's positions; the zoom-in bound;
// symbols marked heavier in place, titled with their far ends' state in its
// short form, and a span inside a withheld run at the
// run's boxes; a byline's facts arriving and its cut label opening in
// place; a face arriving after the first layout setting every standing
// article again, the passage held; a box's label and first line in their
// faces; the name the status region gives a document — its first line as the
// mirror says it, six words at the most, then its address; a kept document's one clause — a draft's text, else its links, an
// edition's links alone, at the row or drop that left it behind, the failed
// read's words after it — its label carrying it after its address, none where
// the one line names it, and its account counting it; and the plane's corner made again as the board's lag
// begins and ends, as its box's chain is counted again, naming no count
// the board did not end the chain at, and as the read a newer version's
// arrival offers comes, rises and goes, a focus on it kept (FP-8, FP-12, FP-20, FP-22, FP-23,
// FP-26, FP-27, FP-30, FP-31, FP-33, FP-34, FP-36, FP-37).
import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import * as REC from '../model/records.js';
import * as PUMP from '../model/pump.js';
import * as PORT from '../bridge/port.js';
import * as FAKE from '../test/fake-port.js';
import * as LK from '../links/links.js';
import * as F from '../model/frames.js';
import * as LAYER from './layer.js';
import * as FOCUS from '../nav/focus.js';
import * as CAM from '../plane/camera.js';
import { layoutOf, fold, placeOf, padded, windowIn, standardFs, columnW, columnOfLine, setAdvance, STANDARD_GRID, MEASURE_CPL, COLUMN_W, GUTTER, EDGE, CHAR_W, LINE_H } from '../plane/layout.js';
import { CORNER, ADDRESS, COL, cornerWidth } from '../plane/register.js';
import { holdTop, runsOf } from '../plane/labels.js';
import { docBox, intersects, depthOfDoc, clearLeftOf, DOC_CELL_W, DEPTH_SOUND } from '../plane/projection.js';
import { MOUNTS_PER_FRAME } from '../plane/lod.js';
import { CLAUSE_READING, articleHTML } from './article.js';
import { farSays } from '../beams/held.js';
import { t, tHTML, lastRead } from '../strings.js';
import { esc } from '../util.js';

/** @typedef {import('../plane/layout.js').Fold} Fold */

const D = '1.0.1.0.3', FAR = '1.0.1.0.127', OTHER_HOME = '1.0.2.0.5', CITE = '1.1.0.1.0.1.0.3.13';
/** links per paragraph: their symbols take the article past the standard grid */
const PER_BLOCK = 10;
const span = (/** @type {string} */ doc, /** @type {number} */ ord, /** @type {number} */ w) => ({ start: `${doc}.0.1.${ord}`, width: '0.0.0.0.0.0.0.' + w, doc, account: doc.split('.').slice(0, 3).join('.'), whole: false, subspace: 1, ordinal: ord, positions: w });
const whole = (/** @type {string} */ doc) => ({ start: doc, width: '0.0.0.0.1', doc, account: doc.split('.').slice(0, 3).join('.'), whole: true, subspace: null, ordinal: null, positions: null });
/** a paragraph of `n` words of two to nine characters, varied by `seed` */
const words = (/** @type {number} */ n, /** @type {number} */ seed) => Array.from({ length: n }, (_, i) => 'abcdefghij'.slice(0, 2 + ((i * 7 + seed) % 8))).join(' ');
/** eighty-four typed lines, an empty line after each: eleven columns hidden, past the standard grid's twelve with its links' symbols */
const TEXT = Array.from({ length: 84 }, (_, i) => words(30, i)).join('\n\n');
const EXTENT = new TextEncoder().encode(TEXT).length;
/** a model move that changes nothing the article shows: the model's revision moves, so no fold is read from before it */
const moveModel = () => REC.setDaemon(REC.daemon() === 'running' ? 'stopped' : 'running');
/** does every line of a fold stand in a column, and every column inside its room? */
function inside(/** @type {Fold} */ f) {
  if (f.columns.reduce((n, c) => n + c.n, 0) !== f.lines.length) return false;
  return f.columns.every((c) => {
    const p = padded(f, c);
    if (p.x < -1e-6 || p.y < -1e-6 || p.x + p.w > f.room.w + 1e-6 || p.y + p.h > f.room.h + 1e-6) return false;
    return f.lines.slice(c.first, c.first + c.n).every((l) => (l.top - c.top + l.h) * f.fs <= c.h + 1e-6);
  });
}

/** links homed at `home` from a span of D's `block`, `n` of them, each a position wide */
function cite(/** @type {string} */ home, /** @type {import('../model/records.js').Block} */ block, /** @type {number} */ n, first = 1) {
  const addrs = Array.from({ length: n }, (_, j) => `${home}.0.2.${first + j}`);
  REC.takeLinks(D, addrs);
  addrs.forEach((addr, j) => {
    const at = span(D, block.pos + j, 1);
    REC.takeLink(home === D ? { addr, from: [at], to: [whole(FAR)], type: CITE } : { addr, from: [span(home, 1 + j, 1)], to: [at], type: CITE });
  });
}

beforeEach(() => {
  REC._reset(); LK._reset();
  REC.takeIndex(/** @type {any} */ ({ docs: [{ doc: D, kind: 'edition', label: 'd', standing: 'public' }], counts: [{ account: '1.0.1', documents: 1 }], state: { arm: 'complete' } }));
  REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  REC.takeSpanSet(D, [{ subspace: 1, ordinal: 1, positions: EXTENT }]);
});

/** a feed row naming D, which the view shows (M-PUMP's `takeRow`): what the page holds of it kept as held, its drop counted */
const fedKept = () => REC.applyFeedUpdate(/** @type {any} */ ({ position: 9, at: 9, op: 'insert', docs: [D], class: 'published' }), new Set([D]));

/** D's text delivered whole — its image its own bytes, where nothing has moved them — the owner's PER_BLOCK links at each of its paragraphs */
function deliver() {
  REC.takeDelivery(D, [{ pos: 1, width: EXTENT, kind: 'content', text: TEXT, ref: null, origin: null }]);
  REC.takeImage(D, 1, [{ iStart: D + '.0.1.1', width: EXTENT }]);
  REC.doc(D).blocks.forEach((b, i) => cite(D, b, PER_BLOCK, 1 + i * PER_BLOCK));
}

test('the size stands at every stage, toggle and lens, however the model moves between them, and every column stays inside the room at the measure', () => {
  deliver();
  const first = LAYER.foldOf(REC.doc(D));
  /** @type {Array<[string, () => void]>} */
  const states = [
    ['hidden', () => {}],
    ['symbols', () => LK.reveal(D, 2)],
    ['content with others\' links on', () => { LK.reveal(D, 3); LK.setOthers(D, true); }],
    ['a lens by type', () => { LK.setOthers(D, false); LK.lens(D, { types: new Set([CITE]) }); }],
    ['dismissed', () => { LK.clearLens(D); LK.hide(D); }],
  ];
  for (const [name, move] of states) {
    move(); moveModel(); LAYER.bump();
    const f = LAYER.foldOf(REC.doc(D));
    assert.deepEqual([f.fs, f.step], [first.fs, first.step], `${name}: the size the article was first set at`);
    assert.ok(inside(f), `${name}: every line in a column inside its room`);
    assert.ok(f.columns.every((c) => Math.abs(c.w - COLUMN_W * f.fs) < 1e-9) && f.lines.every((l) => l.w <= MEASURE_CPL + 1e-9), `${name}: at the measure`);
  }
});

test('an article whose own lines hold the standard grid hidden, but not with its symbols, is set at the step past it from the first: no reveal re-sets it', () => {
  deliver();
  const d = REC.doc(D), room = docBox(D);
  const hidden = fold(layoutOf(LAYER.planOf(d)).lines, room);
  assert.ok(hidden.step === 0 && hidden.columns.length <= STANDARD_GRID[0] * STANDARD_GRID[1], `hidden, its lines take ${hidden.columns.length} columns: the standard grid holds them`);
  LK.reveal(D, 2);
  const shown = fold(layoutOf(LAYER.planOf(d)).lines, room);
  assert.ok(shown.step > hidden.step, `with its symbols, ${shown.columns.length} columns: past the standard grid`);
  LK.hide(D);
  const f = LAYER.foldOf(d);
  assert.equal(f.step, shown.step, 'set at the step its symbols take, hidden as it stands');
  assert.ok(f.fs < standardFs(room), 'smaller than the standard');
});

test('another\'s links arriving fold it again: their counts at the hidden reveal and their symbols with others\' links on, set at one size', () => {
  deliver();
  const before = LAYER.foldOf(REC.doc(D));
  const blocks = REC.doc(D).blocks;
  blocks.forEach((b, i) => cite(OTHER_HOME, b, PER_BLOCK * 3, 1 + i * PER_BLOCK * 3));
  const f = LAYER.foldOf(REC.doc(D));
  assert.ok(f !== before && f.fs <= before.fs, 'folded again, no larger, for what the arrival can set in the text');
  assert.ok(blocks.every((b) => LK.countAt(D, b).n === PER_BLOCK * 3) && inside(f), 'their counts at the hidden reveal: inside the room');
  LK.reveal(D, 2); LK.setOthers(D, true); moveModel(); LAYER.bump();
  const g = LAYER.foldOf(REC.doc(D));
  assert.ok(g.fs === f.fs && inside(g), 'their symbols with others\' links on: inside the room, at the same size');
});

test('a count arriving at the hidden reveal sets no line: the fold\'s lines and columns as they were, the count in the article beside its block\'s first line (issue #151; A-254: "so a link\'s arrival breaks no line")', () => {
  deliver();
  const before = LAYER.foldOf(REC.doc(D)), b = REC.doc(D).blocks[3];
  cite(OTHER_HOME, b, 1, 900);
  assert.equal(LK.countAt(D, b).n, 1, 'another\'s link counted at its block, the reveal hidden');
  const f = LAYER.foldOf(REC.doc(D));
  assert.deepEqual([f.step, f.lines, f.columns], [before.step, before.lines, before.columns], 'every line and every column where it stood');
  const html = LAYER.planOf(REC.doc(D)).find((r) => r.pos === b.pos);
  assert.ok(html && !html.pieces.some((p) => p.text.includes(t('F.others-count', { n: 1 }))), 'the count no piece of the plan');
});

test('a reading view centres on the line holding a position, in its column; the position under a point reads it back; the outline is the plane\'s shape for the document', () => {
  deliver();
  const d = REC.doc(D), f = LAYER.foldOf(d), box = docBox(D);
  const later = d.blocks[Math.floor(d.blocks.length * 0.7)];
  const at = LAYER.centreOf(D, later.pos), p = placeOf(f, later.pos);
  assert.ok(p.column > 2, `a later paragraph stands in column ${p.column}`);
  assert.deepEqual(at, { x: box.x + p.x + p.w / 2, y: box.y + p.y + p.h / 2 }, 'centred on its line, across its column');
  assert.equal(LAYER.posAt(D, at.x, at.y), later.pos, 'read back');
  const c0 = f.columns[0];
  assert.deepEqual(LAYER.centreOf(D, null), { x: box.x + c0.x + c0.w / 2, y: box.y + c0.y + c0.h / 2 }, 'no position: the first column\'s centre');
  const s = LAYER.shapeOf(D);
  assert.ok(s.x >= box.x && s.y >= box.y && s.x + s.w <= box.x + box.w + 1e-6 && s.y + s.h <= box.y + box.h + 1e-6, 'the outline inside the room');
  const est = LAYER.foldOf(REC.doc(FAR));
  assert.equal(est.columns.length, 1, 'a document whose extent is unread: its first column slot');
});

test('at reading scale the paging key continues at the next column\'s top where the view shows its column\'s foot, half a gutter below the visible view\'s top', () => {
  deliver();
  CAM._reset(); CAM.setViewport(1440, 900);
  const d = REC.doc(D), f = LAYER.foldOf(d), box = docBox(D), c = f.columns[1], next = f.columns[2];
  // the camera over the second column, its foot in view, at 12.5 px an em
  CAM.set({ x: box.x + c.x + c.w / 2, y: box.y + c.y + c.h / 2, scale: 12.5 / f.fs });
  assert.ok(CAM.sy(box.y + c.y + c.h) < 900, 'the column\'s foot in view');
  const to = /** @type {NonNullable<ReturnType<typeof LAYER.pageTarget>>} */ (LAYER.pageTarget(1));
  assert.ok(to, 'a target');
  CAM.set(to);
  assert.ok(Math.abs(CAM.sy(box.y + next.y) - (GUTTER / 2) * f.fs * CAM.cam.scale) < 1e-6, 'the next column\'s text half a gutter below the top');
  assert.ok(Math.abs(CAM.sx(box.x + next.x + next.w / 2) - 720) < 1e-6 && to.scale === 12.5 / f.fs, 'centred across it, at the scale it stood at');
  CAM.set({ ...to, scale: 4 / f.fs });
  assert.equal(LAYER.pageTarget(1), null, 'below reading scale: the paging pages the view as it does anywhere');
  CAM._reset();
});

test('a document\'s region is its outline\'s bounds widened leftward by the strip its corner stands in, which meets no neighbour\'s; the document stands in view while its region meets the visible view below the one line, whose window over it reads the positions there (issue #141)', () => {
  deliver();
  CAM._reset(); CAM.setViewport(1440, 900);
  const TOP = 30;
  LAYER.readers({ selection: () => null, focus: () => null, top: () => TOP, handOff: () => {}, navigated: () => null });
  try {
    const s = LAYER.shapeOf(D), r = LAYER.regionOf(D), strip = clearLeftOf(D);
    assert.deepEqual(r, { x: s.x - strip, y: s.y, w: s.w + strip, h: s.h }, 'the outline\'s bounds, widened leftward by the corner\'s strip');
    // the neighbour on its left, read whole as D is: its region ends where D's begins
    const L = '1.0.1.0.2';
    REC.takeSpanSet(L, [{ subspace: 1, ordinal: 1, positions: EXTENT }]);
    REC.takeDelivery(L, [{ pos: 1, width: EXTENT, kind: 'content', text: TEXT, ref: null, origin: null }]);
    const q = LAYER.regionOf(L);
    assert.ok(q.x + q.w <= r.x + 1e-9 && r.x < s.x, `the neighbour's region, to ${q.x + q.w}, ends at or before D's, from ${r.x}`);
    const f = LAYER.foldOf(REC.doc(D)), box = docBox(D), scale = 12.5 / f.fs, c0 = f.columns[0];
    /** the camera with D's outline's bottom-left at a screen point */
    const footAt = (/** @type {number} */ px, /** @type {number} */ py) => CAM.set({ x: s.x - (px - 720) / scale, y: s.y + s.h - (py - 450) / scale, scale });
    footAt(400, TOP - 10);
    assert.equal(LAYER.inView(D), false, 'the outline\'s foot under the one line: out of the visible view');
    footAt(400, TOP + 10);
    assert.equal(LAYER.inView(D), true, 'its foot below the line: in view');
    // the outline past the view's right edge, the corner's strip alone in it
    CAM.set({ x: s.x - 720 / scale - strip / 2, y: s.y + s.h / 2, scale });
    assert.ok(CAM.sx(s.x) > 1440 && CAM.sx(r.x) < 1440, 'the strip alone in the viewport');
    assert.equal(LAYER.inView(D), true, 'the corner\'s strip in view: the document in view');
    // the first column's top under the one line: the view has not run past the start
    CAM.set({ x: box.x + c0.x + c0.w / 2, y: box.y + c0.y + (450 - TOP / 2) / scale, scale });
    const v = { x0: CAM.wx(0) - box.x, x1: CAM.wx(1440) - box.x, y0: CAM.wy(TOP) - box.y, y1: CAM.wy(900) - box.y };
    const w = LAYER.windowIn(D);
    assert.deepEqual(w, windowIn(f, v), 'the window read over the visible view, in the room\'s units');
    assert.ok(w && !w.start && !w.end, `the first column's top under the one line: the start not run past — ${JSON.stringify(w)}`);
  } finally {
    LAYER.readers({ selection: () => null, focus: () => null, top: () => 0, handOff: () => {}, navigated: () => null });
    CAM._reset();
  }
});

// ---- the corner beside the column nearest the view's centre; the reading view's frame (FP-26) ----------------------

/** the middle of a column of a fold, in world units relative to the room */
const middleOf = (/** @type {Fold} */ f, /** @type {number} */ i) => ({ x: f.columns[i].x + f.columns[i].w / 2, y: f.columns[i].y + f.columns[i].h / 2 });

test('the corner stands beside the column nearest the view\'s centre: beside a row\'s first column in the strip\'s room, whole; beside a later one in the gutter and the edge before it, compact where they hold less than it whole and whole where they hold it; where they hold not even the compact corner, or the signs there leave it none, by its row\'s first column (issue #151; FP-26)', () => {
  deliver();
  const f = LAYER.foldOf(REC.doc(D)), strip = clearLeftOf(D), at = (/** @type {number} */ em) => em / f.fs;
  assert.ok(f.across >= 3 && f.columns.length > f.across, `${f.across} across, ${f.columns.length} columns`);
  const first = LAYER.besideOf(f, strip, middleOf(f, 0), at(12.5));
  assert.deepEqual([first.column, first.first, first.room], [0, true, Math.floor((strip + f.columns[0].x) * at(12.5) - 2 * CORNER.gap)], 'over the first column: the strip\'s room beside it, its gaps taken');
  assert.equal(LAYER.formFor(first.room, false), 'whole', 'the strip holds the corner whole');
  const third = LAYER.besideOf(f, strip, middleOf(f, 2), at(12.5));
  assert.deepEqual([third.column, third.first], [2, false], 'over the third column: beside it');
  assert.ok(Math.abs(third.room - ((EDGE + GUTTER) * 12.5 - 2 * CORNER.gap)) <= 1, `the gutter and the second column's edge, its gaps taken: ${third.room} px`);
  assert.ok(cornerWidth(true) <= third.room && third.room < cornerWidth(false), 'room for it compact, not whole');
  assert.deepEqual([LAYER.formFor(third.room, false), LAYER.formFor(third.room, true)], ['compact', 'whole'], 'compact; whole where its act opened it');
  assert.deepEqual([LAYER.formFor(first.room, false, true), LAYER.formFor(first.room, true, true)], ['compact', 'whole'], 'a view whose fit holds a column beside the compact corner alone: compact in the strip too, the margins compacted first (FP-26); whole where its act opened it');
  const near = LAYER.besideOf(f, strip, middleOf(f, 2), at(30));
  assert.deepEqual([near.column, LAYER.formFor(near.room, false)], [2, 'whole'], 'at 30 px an em the gutter and the edge hold it whole');
  const small = LAYER.besideOf(f, strip, middleOf(f, 2), at(8));
  assert.deepEqual([small.column, small.first], [0, true], 'at 8 px an em they hold not even the compact corner: by the row\'s first column, its own document\'s free room');
  assert.deepEqual(LAYER.besideOf(f, strip, middleOf(f, 2), at(12.5), 2).column, 0, 'blocked beside the third column by the signs before it: by the row\'s first');
  const row = LAYER.besideOf(f, strip, middleOf(f, f.across + 1), at(12.5));
  assert.deepEqual([row.column, row.first], [f.across + 1, false], 'a later row\'s second column: beside it');
  assert.equal(LAYER.besideOf(f, strip, middleOf(f, f.across), at(12.5)).first, true, 'a later row\'s first column: the strip, as the first row\'s');
  assert.equal(LAYER.besideOf(f, strip, { x: -1e9, y: -1e9 }, at(12.5)).column, 0, 'a centre off every column: the nearest');
});

test('a corner holds to its column\'s visible top below the one line, never running past its foot, and stacks below each sign of the edge before its column it would meet; none where that leaves it no room (foundations §3.1: "an item at a y another already holds stacks below it")', () => {
  const c = { x: 100, w: 78, h: 60 };
  assert.equal(LAYER.cornerTop(c, 200, 38, 900, []), 200, 'its column\'s top in view: there');
  assert.equal(LAYER.cornerTop(c, 10, 38, 900, []), 38, 'its column\'s top under the one line: just below the line');
  assert.equal(LAYER.cornerTop(c, 10, 38, 80, []), 20, 'its foot risen: no lower than its height above the foot');
  const count = { x: 90, y: 50, w: 60, h: 12 };
  assert.equal(LAYER.cornerTop(c, 10, 38, 900, [count]), 50 + 12 + CORNER.gap, 'a count where it would stand: below it, a gap past it');
  assert.equal(LAYER.cornerTop(c, 10, 38, 900, [count, { ...count, y: 125 }]), 125 + 12 + CORNER.gap, 'and below the next it would meet there');
  assert.equal(LAYER.cornerTop(c, 10, 38, 900, [{ ...count, x: 300 }]), 38, 'a sign beside it, not under it: where it was');
  assert.equal(LAYER.cornerTop(c, 10, 38, 120, [count]), null, 'below the sign it would run past the foot: no room beside that column');
});

test('a corner holds by the one hold a label holds by, so the two stand level below the one line: with no sign before its column its top is P-LABEL\'s `holdTop` for its column, at its top, at the hold, pushed up by its foot (issue #169: "The corner keeps its side, outside the text, level with the label")', () => {
  const c = { x: 100, w: 78, h: 60 };
  for (const [rowTop, bottom] of [[200, 900], [10, 900], [10, 80], [-500, 20], [30, 70]]) assert.equal(LAYER.cornerTop(c, rowTop, 38, bottom, []), holdTop(rowTop, 38, bottom, c.h), `its column's top at ${rowTop}, its foot at ${bottom}`);
});

test('a held label\'s line never meets its corner: where the corner\'s box meets the line, the stretch left of it ends a gap short of it and the stretch right of it begins a gap past it; the line whole where the corner stands beside it, above it or below it (issue #169: "The two never overlap")', () => {
  const line = { x: 100, w: 600 }, band = { y: 42, h: 18 }, g = CORNER.gap;
  assert.deepEqual(LAYER.besideCorner(line, band, null), [line], 'no corner: the line whole');
  assert.deepEqual(LAYER.besideCorner(line, band, { x: 300, y: 42, w: 77, h: 60 }), [{ x: 100, w: 300 - g - 100 }, { x: 377 + g, w: 700 - 377 - g }], 'a corner standing on the line, beside a later column: left of it, then right of it');
  assert.deepEqual(LAYER.besideCorner(line, band, { x: 15, y: 42, w: 77, h: 60 }), [line], 'a row\'s first column\'s corner, left of the line\'s start: the line whole');
  assert.deepEqual(LAYER.besideCorner(line, band, { x: 300, y: 60, w: 77, h: 60 }), [line], 'the corner below the line: the line whole');
  assert.deepEqual(LAYER.besideCorner(line, band, { x: 300, y: -18, w: 77, h: 60 }), [line], 'the corner above it: the line whole');
  assert.deepEqual(LAYER.besideCorner(line, band, { x: 104, y: 42, w: 77, h: 60 }), [{ x: 181 + g, w: 700 - 181 - g }], 'the corner at the line\'s start: the stretch past it alone');
  for (const s of LAYER.besideCorner(line, band, { x: 300, y: 50, w: 77, h: 60 })) assert.ok(s.x + s.w <= 300 - g || s.x >= 377 + g, `${JSON.stringify(s)} a gap clear of the corner`);
});

test('a reading view frames its column with both its margins: the corner on its left in the form its room holds at the reading size, the edge on its right, the three centred in the view together, the frame carrying the em of the fold it frames (issue #151: "The landing frames the column, not the middle of a line")', () => {
  deliver();
  CAM._reset(); CAM.setViewport(1440, 900);
  try {
    const d = REC.doc(D), f = LAYER.foldOf(d), box = docBox(D), fs = f.fs;
    const inThird = d.blocks.find((b) => placeOf(f, b.pos).column === 2);
    assert.ok(inThird, 'a block opening in the third column');
    /** @type {Array<[number | null, number, number, string]>} a position, its column, the corner's width beside it, what stands there */
    const cases = [[null, 0, cornerWidth(false), 'no position: the first column, the strip holding the corner whole'], [/** @type {NonNullable<typeof inThird>} */ (inThird).pos, 2, cornerWidth(true), 'the third column: the gutter holding the corner compact']];
    const read = CAM.READING_PX;
    for (const [pos, i, corner, what] of cases) {
      CAM.set(CAM.viewAt(LAYER.frameOf(D, pos), fs));
      const c = f.columns[i], left = CAM.sx(box.x + c.x) - CORNER.gap - corner, right = CAM.sx(box.x + c.x + c.w) + EDGE * read;
      assert.ok(Math.abs((left + right) / 2 - 720) < 1e-6, `${what}: the corner, the column and its edge centred together — ${left} … ${right}`);
      assert.ok(left >= 0 && right <= 1440 && Math.abs(CAM.cam.scale * fs - read) < 1e-9, `${what}: all in view, at the reading size, ${read} px an em`);
      assert.equal(LAYER.frameOf(D, pos).y, LAYER.centreOf(D, pos).y, `${what}: on the line holding it`);
      assert.equal(LAYER.frameOf(D, pos).fs, fs, `${what}: the em of the fold it frames`);
    }
  } finally { CAM._reset(); }
});

test('a document read whole whose first column the visible view below the one line holds is framed on that column\'s middle; one it does not hold, on its head: the column\'s outline at the top of the visible view, never under the line (FP-37; issue #16)', () => {
  deliver();
  CAM._reset(); CAM.setViewport(1440, 900);
  const f = LAYER.foldOf(REC.doc(D)), box = docBox(D), c = f.columns[0], g = (GUTTER / 2) * f.fs;
  /** the first column's depth on screen at the reading size, and where its outline's top stands with the camera at the frame */
  const deep = c.h * (CAM.READING_PX / f.fs);
  const topAt = () => { CAM.set(CAM.viewAt(LAYER.frameOf(D, null), f.fs)); return CAM.sy(box.y + c.y - g); };
  try {
    for (const [line, held] of /** @type {Array<[number, boolean]>} */ ([[0, deep <= 900], [30, deep <= 870], [120, deep <= 780]])) {
      LAYER.readers({ selection: () => null, focus: () => null, top: () => line, handOff: () => {}, navigated: () => null });
      const at = LAYER.frameOf(D, null), top = topAt();
      if (held) assert.equal(at.y, LAYER.centreOf(D, null).y, `the line at ${line} px, the visible view ${900 - line} px tall, the column ${deep} px deep: on its middle`);
      else assert.ok(Math.abs(top - line) < 1e-6, `the line at ${line} px, the column ${deep} px deep: its outline's top at the visible view's top, ${top} px`);
    }
    assert.ok(deep > 780 && deep <= 900, `the case holds both: a column ${deep} px deep at ${CAM.READING_PX} px an em`);
  } finally {
    LAYER.readers({ selection: () => null, focus: () => null, top: () => 0, handOff: () => {}, navigated: () => null });
    CAM._reset();
  }
});

test('the measure in force: every document folded at what the view holds — the full measure at 1440 px, fewer characters at 480 — and a resize that moves it sets again the article being read, the line under the view\'s centre kept at its height in the view and at its size, the view\'s centre framed across that line\'s column as a landing frames it; never a zoom (issue #151, #436; FP-8, FP-26)', () => onLayer(() => {
  deliver();
  const box = docBox(D), f0 = LAYER.foldOf(REC.doc(D));
  assert.equal(f0.cpl, MEASURE_CPL, '1440 px: the full measure');
  const c = f0.columns[4];
  // the view's centre on the first line of a typed line two-fifths down the column: it opens at its block's start at every measure
  const top = (/** @type {import('../plane/layout.js').Line} */ l) => c.y + (l.top - c.top) * f0.fs, mid = c.y + c.h * 0.4;
  const first = f0.lines.slice(c.first, c.first + c.n).filter((l) => l.kind === 'text' && l.nth === 0).reduce((a, l) => (Math.abs(top(l) - mid) < Math.abs(top(a) - mid) ? l : a));
  CAM.set({ x: box.x + c.x + c.w / 2, y: box.y + top(first) + (first.h / 2) * f0.fs, scale: 12 / f0.fs });
  LAYER.frame();
  assert.ok(LAYER.isMounted(D), 'read at em 12');
  const pos = /** @type {number} */ (LAYER.posAt(D, CAM.cam.x, CAM.cam.y));
  /** where the line holding `pos` stands on screen, from the view's centre, in the fold the document is set in now */
  const fromCentre = () => { const p = placeOf(LAYER.foldOf(REC.doc(D)), pos), { VW, VH } = CAM.viewport(); return { x: CAM.sx(box.x + p.x) - VW / 2, y: CAM.sy(box.y + p.y) - VH / 2 }; };
  const was = fromCentre(), em = CAM.cam.scale * f0.fs;
  for (const w of [480, 1440]) {
    CAM.setViewport(w, 900);
    const cpl = CAM.measure();
    assert.ok(w === 480 ? cpl < MEASURE_CPL : cpl === MEASURE_CPL, `${w} px: the measure in force ${cpl}`);
    LAYER.frame();
    const f = LAYER.foldOf(REC.doc(D)), now = fromCentre();
    assert.ok(f.cpl === cpl && f.columns.every((k) => Math.abs(k.w - columnW(cpl) * f.fs) < 1e-6) && f.lines.every((l) => l.w <= cpl + 1e-9), `${w} px: every column and line at ${cpl} characters`);
    assert.ok(Math.abs(now.y - was.y) < 1e-6, `${w} px: the line at the height it stood in the view, from its centre — ${JSON.stringify(was)} → ${JSON.stringify(now)}`);
    assert.ok(Math.abs(CAM.cam.x - LAYER.frameOf(D, pos, em).x) < 1e-6, `${w} px: the view's centre framed across the line's column, at its em — ${CAM.cam.x} against ${LAYER.frameOf(D, pos, em).x}`);
    assert.ok(Math.abs(CAM.cam.scale * f.fs - em) < 1e-9, `${w} px: at its size on screen`);
  }
  const f = LAYER.foldOf(REC.doc(D));
  CAM.zoomAt(2, 720, 450); LAYER.frame();
  assert.ok(LAYER.foldOf(REC.doc(D)) === f && CAM.measure() === MEASURE_CPL, 'a zoom: the measure and the fold as they were');
}, 1440, 900));

// ---- what stands: every readable document, by line; the limit below reading size ------------------------------------

/** the field: an account's first grid of documents, 1 … 48 (its 49th cell holds the continuation) */
const FIELD = '1.0.4';
const ALL = Array.from({ length: 48 }, (_, i) => i + 1);
/** the field's document `k` */
const nth = (/** @type {number} */ k) => `${FIELD}.0.${k}`;
/** a document's text delivered whole, its extent with it */
function give(/** @type {number} */ k, /** @type {string} */ text) {
  const n = new TextEncoder().encode(text).length;
  REC.takeSpanSet(nth(k), [{ subspace: 1, ordinal: 1, positions: n }]);
  REC.takeDelivery(nth(k), [{ pos: 1, width: n, kind: 'content', text, ref: null, origin: null }]);
}
/** the field's documents given a line each: every one one column at the standard size, one size */
const note = (/** @type {number[]} */ ks) => ks.forEach((k) => give(k, `Note ${k}.`));
/** a document's size, in world units */
const faceOf = (/** @type {number} */ k) => LAYER.foldOf(REC.doc(nth(k))).fs;
/** the viewport the policy is held on: five of the field's columns across and three rows down hold their first columns at em 7 */
const VW = 5200, VH = 3600;
/** the camera over the field's middle — document 25's first column, `dx` columns across — a line's size at `em` px */
function view(/** @type {number} */ em, dx = 0) {
  const at = LAYER.centreOf(nth(25), null);
  CAM.set({ x: at.x + dx * DOC_CELL_W, y: at.y, scale: em / faceOf(16) });
}
/** the field's documents whose outlines meet the world the layer mounts in: the viewport, 40 px about it */
const inView = () => { const v = CAM.viewportWorld(40); return ALL.filter((k) => intersects(LAYER.shapeOf(nth(k)), v)); };
/** a frame, the walk's focus on document `focus`: the field's documents whose articles stand in the mount band after it */
function frame(/** @type {number | null} */ focus = null) {
  LAYER.frame((addr) => focus != null && addr === nth(focus));
  return LAYER.mountedAddrs().filter((a) => a.startsWith(FIELD + '.')).map((a) => Number(a.split('.').pop())).sort((x, y) => x - y);
}
/** frames until one mounts nothing afresh: the field's documents standing after them */
function settle(/** @type {number | null} */ focus = null) {
  let now = frame(focus);
  for (let i = 0; i < 20 && LAYER.frameStats().mounted; i++) now = frame(focus);
  return now;
}
/** the element each standing article stands on, by document */
const elements = () => new Map([...LAYER.mountedSet()].map(([a, rec]) => [a, rec.el]));
/** of the articles that stood, the ones standing still on the element they stood on */
const unmoved = (/** @type {Map<string, unknown>} */ before) => [...before].filter(([a, el]) => LAYER.mountedSet().get(a)?.el === el).map(([a]) => a);
/** the page's selection and the place just navigated to, as their owners hand them to the layer */
const readers = (/** @type {import('./span.js').Span | null} */ span, /** @type {string | null} */ navigated = null) =>
  LAYER.readers({ selection: () => span, focus: () => null, top: () => 0, handOff: () => {}, navigated: () => navigated });
/** the lines of a document standing, as one set */
const standing = (/** @type {string} */ addr) => new Set((LAYER.mountedLines(addr) || []).flatMap((p) => Array.from({ length: p.end - p.first }, (_, k) => p.first + k)));
/**
 * The lines of a document's fold whose boxes meet the world the layer mounts in — the viewport, 40 px about it — read
 * here from the fold, column by column: each line's box across its column, from its top to its foot.
 */
function meeting(/** @type {string} */ addr) {
  const f = LAYER.foldOf(REC.doc(addr)), box = docBox(addr), v = CAM.viewportWorld(40);
  /** @type {Set<number>} */
  const out = new Set();
  for (const c of f.columns) for (let i = c.first; i < c.first + c.n; i++) {
    const top = box.y + c.y + (f.lines[i].top - c.top) * f.fs;
    if (intersects({ x: box.x + c.x, y: top, w: c.w, h: f.lines[i].h * f.fs }, v)) out.add(i);
  }
  return out;
}

/**
 * The test run on the text layer over a page of stand-ins — its element `w` × `h` px, which holds what the layer
 * mounts (`held`), and the platform's selection on nothing — then every article taken down, the owners' readers
 * handing in nothing, and the platform's `document` and `window` put back. The stand-ins lay nothing out: the layer
 * sets the lines P-LAY predicts, its articles' HTML whole and their parts the runs of lines that stand; each answers
 * a selector with the stand-ins `answers` names for it, else with none.
 */
function onLayer(/** @type {(held: Set<unknown>) => void} */ body, w = VW, h = VH, /** @type {Map<string, unknown[]> | null} */ answers = null) {
  const platform = { document: globalThis.document, window: globalThis.window };
  /** @type {Set<unknown>} */
  const held = new Set();
  const element = () => {
    /** @type {{className: string, innerHTML: string, dataset: object, style: object, children: unknown[], classList: {toggle(): void}, setAttribute(): void, appendChild(c: unknown): void, querySelectorAll(sel: string): unknown[], getBoundingClientRect(): object, remove(): void}} */
    const e = {
      className: '', innerHTML: '', dataset: {}, style: {}, children: [], classList: { toggle() {} }, setAttribute() {},
      appendChild(c) { e.children.push(c); },
      querySelectorAll: (/** @type {string} */ sel) => (answers && answers.get(sel)) || [], getBoundingClientRect: () => ({ top: 0, left: 0, width: 0, height: 0 }),
      remove() { held.delete(e); },
    };
    return e;
  };
  globalThis.document = /** @type {any} */ ({ createElement: element });
  globalThis.window = /** @type {any} */ ({ getSelection: () => null });
  CAM.setViewport(w, h);
  LAYER.attach(/** @type {any} */ ({ clientWidth: w, clientHeight: h, appendChild: (/** @type {unknown} */ e) => { held.add(e); } }), /** @type {any} */ (null));
  try { body(held); } finally { LAYER.press(false); LAYER.clear(); readers(null); globalThis.document = platform.document; globalThis.window = platform.window; }
}

test('a reveal that re-breaks the article while a later column is read leaves the line under the view\'s centre where it stood on screen, at its size; a feed row naming it keeps the article standing on its element until its reads again set it, the line held through that setting (issue #285)', () => onLayer(() => {
  deliver();
  const d = REC.doc(D), box = docBox(D);
  const f0 = LAYER.foldOf(d), c = f0.columns[6];
  CAM.set({ x: box.x + c.x + c.w / 2, y: box.y + c.y + c.h * 0.4, scale: 12 / f0.fs });
  LAYER.frame();
  assert.ok(LAYER.isMounted(D), 'its article stands at em 12');
  const pos = /** @type {number} */ (LAYER.posAt(D, CAM.cam.x, CAM.cam.y));
  /** where a position's line stands on screen in the fold the document is set in now */
  const screen = (at = pos) => { const p = placeOf(LAYER.foldOf(REC.doc(D)), at); return { x: CAM.sx(box.x + p.x), y: CAM.sy(box.y + p.y) }; };
  const was = screen(), scale = CAM.cam.scale;
  LK.reveal(D, 2); LAYER.bump();
  const moved = placeOf(LAYER.foldOf(REC.doc(D)), pos), stood = placeOf(f0, pos);
  assert.ok(moved.column !== stood.column || Math.abs(moved.y - stood.y) > f0.fs, 'the symbols re-break the article: the passage moves in its room');
  LAYER.frame();
  const now = screen();
  assert.ok(Math.abs(now.x - was.x) < 1e-6 && Math.abs(now.y - was.y) < 1e-6, `the line where it stood: ${JSON.stringify(was)} → ${JSON.stringify(now)}`);
  assert.equal(CAM.cam.scale, scale, 'at its size: the step stands, the scale with it');
  // a feed row naming the document, which the view shows: its article stands on its element while it is read again; the
  // reads land with its links gone, and set in one step it is set at the size its text sets without them, the passage under
  // the view's centre — its line's position in the fold it stands in now — held where it stood
  const under = /** @type {number} */ (LAYER.posAt(D, CAM.cam.x, CAM.cam.y)), held = screen(under), el = LAYER.mountedSet().get(D)?.el;
  fedKept();
  for (let i = 0; i < 3; i++) LAYER.frame();
  assert.ok(LAYER.isMounted(D) && LAYER.mountedSet().get(D)?.el === el && together(screen(under), held), 'kept standing on its element, its line where it stood, while its reads are out');
  REC.setAgain(D, { spans: [{ subspace: 1, ordinal: 1, positions: EXTENT }], links: [], text: { runs: [{ pos: 1, width: EXTENT, kind: 'content', text: TEXT, ref: null, origin: null }], asOf: 9 }, image: { from: 1, runs: [{ iStart: D + '.0.1.1', width: EXTENT }] } });
  const reset = LAYER.foldOf(REC.doc(D));
  assert.ok(reset.step === 0 && reset.fs > f0.fs, 'its links gone, it is set at the standard size: a re-set');
  LAYER.frame();
  assert.ok(LAYER.isMounted(D) && LAYER.mountedSet().get(D)?.el !== el, 'set again in its place, on an element of its own');
  const back = screen(under);
  assert.ok(Math.abs(back.x - held.x) < 1e-6 && Math.abs(back.y - held.y) < 1e-6, `the passage where it stood: ${JSON.stringify(held)} → ${JSON.stringify(back)}`);
  assert.ok(Math.abs(CAM.cam.scale * reset.fs - scale * f0.fs) < 1e-9, 'at its size on screen: the scale by the ratio of its sizes');
}, 1440, 900));

// ---- one article a box (FP-22) ---------------------------------------------------------------------------------------

/** D's second version: a prologue of its own set before D's text, so each of D's positions stands later in it */
const D2 = D + '.2', PROLOGUE = 'A prologue the second version set before the text.\n\n', TEXT2 = PROLOGUE + TEXT;
const SHIFT = new TextEncoder().encode(PROLOGUE).length;
/** D's second version's text delivered whole */
function deliver2() {
  const n = new TextEncoder().encode(TEXT2).length;
  REC.takeSpanSet(D2, [{ subspace: 1, ordinal: 1, positions: n }]);
  REC.takeDelivery(D2, [{ pos: 1, width: n, kind: 'content', text: TEXT2, ref: null, origin: null }]);
}
/** the owners' readers, the box D and its versions share showing `shown` */
const showing = (/** @type {{at: string}} */ box) => LAYER.readers({ selection: () => null, focus: () => null, top: () => 0, handOff: () => {}, navigated: () => null, shown: (a) => (a === D || a === D2 ? box.at : a) });

test('a box shows one version: of a document and its version, both texts held, the article of the version the box shows stands alone, and the box taking the other takes it down and stands the other (issue #154)', () => onLayer((held) => {
  deliver(); deliver2();
  const box = { at: D };
  showing(box);
  const f = LAYER.foldOf(REC.doc(D)), c = f.columns[0], room = docBox(D);
  CAM.set({ x: room.x + c.x + c.w / 2, y: room.y + c.y + c.h / 2, scale: 12 / f.fs });
  LAYER.frame();
  assert.deepEqual([LAYER.isMounted(D), LAYER.isMounted(D2), held.size], [true, false, 1], 'the box shows D: its article alone stands, the version\'s text held and never mounted over it');
  box.at = D2;
  LAYER.frame();
  assert.deepEqual([LAYER.isMounted(D), LAYER.mountedSet().has(D), LAYER.isMounted(D2), held.size], [false, false, true, 1], 'the box takes the version: D\'s article taken down, the version\'s standing alone');
  assert.deepEqual(LAYER.mountedAddrs(), [D2]);
}, 1440, 900));

test('a box taking another version keeps the line being read in place (issue #154): the line holding the position its mover names stands, in the version taken, where the line holding the position it left stood on screen, the scale by the ratio of the two folds\' sizes; held across one version, the line taken stands where the line left stood at once', () => onLayer(() => {
  deliver(); deliver2();
  const box = { at: D };
  showing(box);
  const room = docBox(D), f0 = LAYER.foldOf(REC.doc(D)), c = f0.columns[6];
  CAM.set({ x: room.x + c.x + c.w / 2, y: room.y + c.y + c.h * 0.4, scale: 12 / f0.fs });
  LAYER.frame();
  const from = /** @type {number} */ (LAYER.posAt(D, CAM.cam.x, CAM.cam.y)), to = from + SHIFT;
  /** where a position's line stands on screen in a version's fold as it is set now */
  const screen = (/** @type {string} */ addr, /** @type {number} */ at) => { const p = placeOf(LAYER.foldOf(REC.doc(addr)), at); return { x: CAM.sx(room.x + p.x), y: CAM.sy(room.y + p.y) }; };
  const was = screen(D, from), scale = CAM.cam.scale;
  const f2 = LAYER.foldOf(REC.doc(D2));
  assert.ok(f2.fs !== f0.fs, `the version set at another size: ${f2.fs} beside ${f0.fs}`);
  assert.ok(Math.abs(screen(D2, to).y - was.y) > 1, 'unheld, the version\'s line would stand elsewhere on screen');
  LAYER.holdAcross(D, D2, { from, to });
  box.at = D2;
  LAYER.frame();
  assert.ok(LAYER.isMounted(D2), 'the version stands');
  const now = screen(D2, to);
  assert.ok(Math.abs(now.x - was.x) < 1e-6 && Math.abs(now.y - was.y) < 1e-6, `the version's line where the line left stood: ${JSON.stringify(was)} → ${JSON.stringify(now)}`);
  assert.ok(Math.abs(CAM.cam.scale * f2.fs - scale * f0.fs) < 1e-9, 'at its size on screen: the scale by the ratio of the two folds\' sizes');
  // held across one version, its article standing: the line taken where the line left stood, at once
  const there = to + 200, stood = screen(D2, to), k = CAM.cam.scale;
  LAYER.holdAcross(D2, D2, { from: to, to: there });
  const moved = screen(D2, there);
  assert.ok(Math.abs(moved.x - stood.x) < 1e-6 && Math.abs(moved.y - stood.y) < 1e-6 && CAM.cam.scale === k, `the line taken where the line left stood, the scale kept: ${JSON.stringify(stood)} → ${JSON.stringify(moved)}`);
}, 1440, 900));

// ---- an edit above the view (FP-8, FP-23) ------------------------------------------------------------------------------

/** D's text with the prologue set before it, its bytes minted after the old text's: every old byte stands SHIFT later, its identity kept */
const EDITED_IMAGE = [{ iStart: `${D}.0.1.${EXTENT + 1}`, width: SHIFT }, { iStart: D + '.0.1.1', width: EXTENT }];
/** D set again in one step as the reads a feed row naming it made land (M-REC's `setAgain`): a text, and the image read with it, or none where its read failed */
const setD = (/** @type {string} */ text, /** @type {Array<{iStart: string, width: number}> | null} */ image) => {
  const n = new TextEncoder().encode(text).length;
  REC.setAgain(D, { spans: [{ subspace: 1, ordinal: 1, positions: n }], text: { runs: [{ pos: 1, width: n, kind: 'content', text, ref: null, origin: null }], asOf: 9 }, ...(image ? { image: { from: 1, runs: image } } : {}) });
};
/** D's edited text set again — its image with it, or after it */
const setEdited = (withImage = true) => setD(TEXT2, withImage ? EDITED_IMAGE : null);
/** D read at em 12 over its seventh column, its article standing: the position the line under the view's centre opens at, and where a position's line stands on screen in the fold D is set in now */
function readLater() {
  deliver();
  const box = docBox(D), f0 = LAYER.foldOf(REC.doc(D)), c = f0.columns[6];
  CAM.set({ x: box.x + c.x + c.w / 2, y: box.y + c.y + c.h * 0.4, scale: 12 / f0.fs });
  LAYER.frame();
  assert.ok(LAYER.isMounted(D), 'its article stands at em 12');
  const pos = /** @type {number} */ (LAYER.posAt(D, CAM.cam.x, CAM.cam.y));
  const screen = (/** @type {number} */ at) => { const p = placeOf(LAYER.foldOf(REC.doc(D)), at); return { x: CAM.sx(box.x + p.x), y: CAM.sy(box.y + p.y) }; };
  return { pos, screen };
}
/** do two points on screen stand together? */
const together = (/** @type {{x: number, y: number}} */ a, /** @type {{x: number, y: number}} */ b) => Math.abs(a.x - b.x) < 1e-6 && Math.abs(a.y - b.y) < 1e-6;

test('a document edited above the view, kept standing through the feed row naming it and set again in one step from its reads, keeps the line the reader read on the same words, never the same position: the passage\'s bytes carried by their identity through the image its article was made from into the text set again (issues #160, #285)', () => onLayer(() => {
  const { pos, screen } = readLater();
  const was = screen(pos), el = LAYER.mountedSet().get(D)?.el;
  fedKept();
  LAYER.frame();
  assert.ok(LAYER.mountedSet().get(D)?.el === el && together(screen(pos), was), 'kept standing on its element while its text is read anew');
  setEdited();
  assert.equal(REC.textBetween(D, pos + SHIFT, pos + SHIFT + 12), TEXT.slice(pos - 1, pos + 11), 'the words the reader read stand SHIFT later in the edited text');
  LAYER.frame();
  assert.ok(LAYER.isMounted(D) && LAYER.mountedSet().get(D)?.el !== el, 'set again in its place');
  assert.ok(together(screen(pos + SHIFT), was), `the same words' line where it stood: ${JSON.stringify(was)} → ${JSON.stringify(screen(pos + SHIFT))}`);
  assert.ok(Math.abs(screen(pos).y - was.y) > 1, 'never the same position\'s line, which holds other words now');
}, 1440, 900));

test('where the edited text is set again before its image — the image\'s read failed with it — the line is held by its position until the view reads the image, the re-set the image makes then standing the same words\' line where the reader read it; a camera the reader moved meanwhile stands as they left it (issues #160, #285)', () => onLayer(() => {
  const { pos, screen } = readLater();
  const was = screen(pos);
  fedKept();
  LAYER.frame();
  setEdited(false);
  LAYER.frame();
  assert.ok(LAYER.isMounted(D) && together(screen(pos), was), 'set again from its text alone: by position for now, no image placing its bytes');
  REC.takeImage(D, 1, EDITED_IMAGE);
  LAYER.frame();
  assert.ok(together(screen(pos + SHIFT), was), `the image arrived: the same words' line where the reader read it — ${JSON.stringify(was)} → ${JSON.stringify(screen(pos + SHIFT))}`);
  // edited above the view again, its text first; the reader pans before its image arrives
  const lead = 'Another line set first.\n\n', more = new TextEncoder().encode(lead).length;
  fedKept();
  LAYER.frame();
  setD(lead + TEXT2, null);
  LAYER.frame();
  CAM.set({ ...CAM.view(), y: CAM.cam.y + 40 / CAM.cam.scale });
  LAYER.frame();
  const under = /** @type {number} */ (LAYER.posAt(D, CAM.cam.x, CAM.cam.y)), stood = screen(under), words = screen(pos + more + SHIFT);
  REC.takeImage(D, 1, [{ iStart: `${D}.0.1.${EXTENT + SHIFT + 1}`, width: more }, ...EDITED_IMAGE]);
  LAYER.frame();
  assert.ok(together(screen(under), stood) && !together(screen(pos + more + SHIFT), was) && together(screen(pos + more + SHIFT), words), 'the reader moved the camera before the image arrived: the line they left under the view\'s centre stands where they left it, the words never pulled back to where they were read');
}, 1440, 900));

test('read with the view\'s centre on the empty line typed below a line, a document edited above the view whose text comes before its image keeps that line\'s words where they stood: the re-set by position and the one the image makes hold the one line (FP-8, FP-23)', () => onLayer(() => {
  deliver();
  const box = docBox(D), f0 = LAYER.foldOf(REC.doc(D)), c = f0.columns[6], lh = LINE_H * f0.fs;
  const top = (/** @type {import('../plane/layout.js').Line} */ l) => c.y + (l.top - c.top) * f0.fs;
  // a typed line's last line in the column, an empty line typed below it before the next typed line
  const lines = f0.lines.slice(c.first, c.first + c.n);
  const k = lines.findIndex((l, i) => i > lines.length / 3 && i + 1 < lines.length && lines[i + 1].pos !== l.pos && top(lines[i + 1]) - (top(l) + l.h * f0.fs) > 0.9 * lh);
  assert.ok(k > 0, 'a line with an empty line typed below it');
  const l = lines[k];
  CAM.set({ x: box.x + c.x + c.w / 2, y: box.y + top(l) + l.h * f0.fs + 0.4 * lh, scale: 12 / f0.fs });
  LAYER.frame();
  const pos = /** @type {number} */ (LAYER.posAt(D, CAM.cam.x, CAM.cam.y));
  assert.equal(pos, l.at, 'the view\'s centre on the empty line: the line above it read');
  const screen = (/** @type {number} */ at) => { const p = placeOf(LAYER.foldOf(REC.doc(D)), at); return { x: CAM.sx(box.x + p.x), y: CAM.sy(box.y + p.y) }; };
  const was = screen(pos);
  fedKept();
  LAYER.frame();
  setEdited(false);
  LAYER.frame();
  assert.ok(together(screen(pos), was), 'set again from its text alone: the line by position where it stood');
  REC.takeImage(D, 1, EDITED_IMAGE);
  LAYER.frame();
  assert.ok(together(screen(pos + SHIFT), was), `the image arrived: the same words' line where it stood, never the line the view's centre fell on — ${JSON.stringify(was)} → ${JSON.stringify(screen(pos + SHIFT))}`);
}, 1440, 900));

test('a change of the page\'s class keeps the document the view reads standing, set again from what the change kept: the line under the view\'s centre — in a run of a draft\'s bytes, a withheld run now — keeps its place, and nothing is told vanished, for the passage is covered, never gone (issue #274)', () => onLayer(() => {
  /** @type {string[]} */
  const told = [];
  LAYER.readers({ vanished: (addr) => { told.push(addr); } });
  // D's later half a run of the draft's bytes, its image placing them in the draft's I-space
  const DRAFT = '1.0.1.0.1003', CUT = Math.floor(EXTENT / 2);
  REC.takeDelivery(D, [{ pos: 1, width: EXTENT, kind: 'content', text: TEXT, ref: null, origin: null }]);
  REC.takeImage(D, 1, [{ iStart: D + '.0.1.1', width: CUT }, { iStart: DRAFT + '.0.1.1', width: EXTENT - CUT }]);
  const box = docBox(D), f0 = LAYER.foldOf(REC.doc(D)), c = f0.columns[f0.columns.length - 2];
  CAM.set({ x: box.x + c.x + c.w / 2, y: box.y + c.y + c.h * 0.4, scale: 12 / f0.fs });
  LAYER.frame();
  const pos = /** @type {number} */ (LAYER.posAt(D, CAM.cam.x, CAM.cam.y));
  assert.ok(LAYER.isMounted(D) && pos > CUT, `its article stands at em 12, the view's centre on a line of the draft's bytes: ${pos}`);
  const screen = () => { const p = placeOf(LAYER.foldOf(REC.doc(D)), pos); return { x: CAM.sx(box.x + p.x), y: CAM.sy(box.y + p.y) }; };
  const was = screen();
  REC.sessionDied({ arm: 'closed' }, [D]);
  LAYER.frame();
  assert.deepEqual([LAYER.isMounted(D), REC.textBetween(D, CUT + 1, EXTENT + 1), told], [true, '', []], 'set again from what the change kept: the draft\'s run withheld, nothing told vanished');
  assert.ok(together(screen(), was), `the line read where it stood: ${JSON.stringify(was)} → ${JSON.stringify(screen())}`);
}, 1440, 900));

test('a text set again holding none of the line being read, its image covering it whole, keeps that line\'s place by position and tells the reader once (FP-21\'s landing rule); one that holds its bytes elsewhere, or whose image covers less of it, tells nothing (issue #285)', () => onLayer(() => {
  /** @type {Array<[string, number, number]>} each telling: the document, the position whose line keeps the place, the passage's spans */
  const told = [];
  LAYER.readers({ vanished: (addr, pos, ids) => { told.push([addr, pos, ids.length]); } });
  const { pos, screen } = readLater();
  // an edit above the view: the line's bytes SHIFT on, held
  fedKept(); LAYER.frame(); setEdited(); LAYER.frame();
  assert.deepEqual(told, [], 'its bytes stand elsewhere: nothing told');
  const at = /** @type {number} */ (LAYER.posAt(D, CAM.cam.x, CAM.cam.y)), here = screen(at), n = new TextEncoder().encode(TEXT2).length;
  assert.equal(at, pos + SHIFT, 'the line read now opens SHIFT on');
  // set again as bytes minted since, its image covering only its first half: the page cannot tell where the passage stands
  fedKept(); LAYER.frame(); setD(TEXT2, [{ iStart: `${D}.0.1.${2 * n + 1}`, width: Math.floor(n / 2) }]); LAYER.frame();
  assert.deepEqual(told, [], 'its image covering less than the text: nothing told');
  assert.ok(together(screen(at), here), 'the line read kept by its position');
  // its bytes as they stand read again whole, then set again as bytes minted since, its image whole: the passage is in none of it
  fedKept(); LAYER.frame(); setEdited(); LAYER.frame();
  const at2 = /** @type {number} */ (LAYER.posAt(D, CAM.cam.x, CAM.cam.y)), here2 = screen(at2);
  fedKept(); LAYER.frame(); setD(TEXT2, [{ iStart: `${D}.0.1.${3 * n + 1}`, width: n }]); LAYER.frame();
  assert.deepEqual(told.map(([a, p]) => [a, p]), [[D, at2]], 'gone: the reader told once, at the position whose line keeps its place');
  assert.ok(told[0][2] > 0 && together(screen(at2), here2), 'the passage named by its bytes, its line kept by position');
  LAYER.frame();
  assert.equal(told.length, 1, 'told once for the setting');
}, 1440, 900));

test('a flight aimed at a passage of a document set again under it as it flies: words set between the line under the camera and the passage, between two frames at one time, leave that line where it stood on screen — the frame after them moves the camera toward the passage as its aim answered before them, and only then reads the aim again — and the flight lands where its aim answers then, on the passage\'s own bytes past the words set before them (FP-8, FP-25)', () => onLayer(() => {
  const { screen } = readLater();
  const f0 = LAYER.foldOf(REC.doc(D)), c = f0.columns[8];
  const line = c && f0.lines.slice(c.first, c.first + c.n).find((l) => l.kind === 'text' && l.at != null);
  assert.ok(line && line.at != null, 'a typed line two columns on from the one read');
  const there = /** @type {number} */ (line.at), ids = REC.identityOf(D, there, 1);
  /** the view that reads the passage where D's held image places its first byte now, as N-GO's aim reads it */
  const aim = () => { const now = REC.placedIdentity(D, ids), at = LAYER.frameOf(D, now.length ? now[0].pos : there); return CAM.viewAt(at, at.fs); };
  CAM.fly(aim, 400, 0);
  CAM.step(100); LAYER.frame();
  const under = /** @type {number} */ (LAYER.posAt(D, CAM.cam.x, CAM.cam.y)), was = screen(under);
  // a paragraph set after the block holding the line under the camera: that line stays where it stands, the passage later
  const b = /** @type {import('../model/records.js').Block} */ (REC.doc(D).blocks.find((x) => x.pos <= under && under < x.pos + x.width));
  const cut = b.pos + b.width - 1, words = 'Words set between the line read and the passage.\n\n', n = new TextEncoder().encode(words).length;
  assert.ok(cut < there, 'set before the passage');
  setD(TEXT.slice(0, cut) + words + TEXT.slice(cut), [{ iStart: D + '.0.1.1', width: cut }, { iStart: `${D}.0.1.${EXTENT + 1}`, width: n }, { iStart: `${D}.0.1.${cut + 1}`, width: EXTENT - cut }]);
  CAM.step(100); LAYER.frame();
  assert.ok(LAYER.isMounted(D) && together(screen(under), was), `the line under the camera where it stood on screen: ${JSON.stringify(was)} → ${JSON.stringify(screen(under))}`);
  CAM.step(300); LAYER.frame();
  CAM.step(Infinity); LAYER.frame();
  const at = LAYER.frameOf(D, there + n), old = LAYER.frameOf(D, there);
  assert.deepEqual([CAM.flying(), CAM.view()], [false, CAM.viewAt(at, at.fs)], 'landed where the aim answers: the passage past the words set before it');
  assert.notDeepEqual(CAM.view(), CAM.viewAt(old, old.fs), 'never the position the flight set out for, which holds other words now');
}, 1440, 900));

test('every document in view at the readable em stands in the frame it gets there, however many: no count holds one back', () => onLayer((held) => {
  note(ALL);
  view(9);
  const seen = inView();
  assert.ok(seen.length > MOUNTS_PER_FRAME, `at em 9, ${seen.length} of the field in view: more than the limit`);
  assert.deepEqual(frame(), seen, 'each in view stands, in the one frame');
  assert.equal(held.size, seen.length, 'the layer holds their articles and no other');
  assert.ok(seen.every((k) => { const s = standing(nth(k)), m = meeting(nth(k)); return s.size === m.size && [...m].every((i) => s.has(i)); }), 'each stands by its lines in view');
}, 9000, 6000));

test('below the readable em at most the limit mounts afresh in a frame — the page\'s selection, the walk\'s focus and the place just navigated to first, then equal ems in the model\'s order, never by length — none is taken down, and the frames after mount the rest', () => onLayer(() => {
  // the field at one size: a note of a line each, and every fourth a document of five columns, set at the size a note is
  const long = Array.from({ length: 50 }, (_, i) => words(30, i)).join('\n\n');
  ALL.forEach((k) => give(k, k % 4 ? `Note ${k}.` : long));
  assert.ok(ALL.every((k) => faceOf(k) === faceOf(16)) && LAYER.foldOf(REC.doc(nth(4))).columns.length >= 5, 'the field is one size, long documents and short notes alike');
  view(7);
  const seen = inView();
  assert.ok(seen.length > 2 * MOUNTS_PER_FRAME, `at em 7, ${seen.length} of the field in view: more than twice the limit`);
  // the last three in the model's order: the one holding the selection, the one just navigated to, the walk's focused one
  const [sel, nav, foc] = seen.slice(-3);
  readers({ addr: nth(sel), pos: 1, width: 3 }, nth(nav));
  let was = frame(foc);
  const first = [...seen.filter((k) => ![sel, nav, foc].includes(k)).slice(0, MOUNTS_PER_FRAME - 3), sel, nav, foc].sort((x, y) => x - y);
  assert.deepEqual(was, first, 'the first frame: the three first in the limit\'s order, then the rest in the model\'s order, long or short, to the limit');
  while (was.length < seen.length) {
    const before = elements();
    const now = frame(foc);
    const next = seen.filter((k) => !was.includes(k)).slice(0, MOUNTS_PER_FRAME);
    assert.deepEqual(now, [...was, ...next].sort((x, y) => x - y), `the next frame: the next ${next.length} in the model's order`);
    assert.deepEqual(unmoved(before), [...before.keys()], 'none taken down or set again');
    was = now;
  }
  assert.deepEqual(was, seen, 'every one in view stands, over the frames');
}, 9000, 6000));

test('the limit\'s order: those holding the selection or the focus and the place just navigated to first, whatever their size, then the largest em first, equal ems in the order given — never by length', () => {
  const cands = [
    { k: 1, em: 6.6, first: false, chars: 40 }, { k: 2, em: 7.6, first: false, chars: 90000 }, { k: 3, em: 6.6, first: true, chars: 9 },
    { k: 4, em: 7.6, first: false, chars: 12 }, { k: 5, em: 6.6, first: false, chars: 3 }, { k: 6, em: 7.1, first: true, chars: 50000 },
  ];
  assert.deepEqual(LAYER.limitOrder(cands).map((c) => c.k), [6, 3, 2, 4, 1, 5]);
});

test('the stretch of a span the parts standing hold runs from the first position of it a part standing holds to the last: a span whose last lines stand in no part keeps the lines that stand, a withheld run\'s part holds the run whole, and a span no part standing holds has none (issue #152)', () => {
  // a paragraph of 28 characters and its separator, set in two parts, its first 12 characters in the first; a withheld run of 6
  // positions; a paragraph of 10
  const blocks = /** @type {import('../model/records.js').Block[]} */ ([
    { pos: 1, width: 30, kind: 'para', text: 'a'.repeat(28), origin: null },
    { pos: 31, width: 6, kind: 'withheld', text: '', origin: '1.0.2.0.2' },
    { pos: 37, width: 10, kind: 'para', text: 'b'.repeat(10), origin: null },
  ]);
  const head = { pos: 1, char: 0, length: 12 }, rest = { pos: 1, char: 12, length: 16 }, run = { pos: 31, char: 0, length: 0 }, last = { pos: 37, char: 0, length: 10 };
  const span = (/** @type {number} */ pos, /** @type {number} */ width) => ({ addr: D, pos, width });
  assert.deepEqual(LAYER.standingStretch(blocks, [head, rest, run, last], span(5, 40)), span(5, 40), 'every part standing: the span itself');
  assert.deepEqual(LAYER.standingStretch(blocks, [head], span(5, 40)), span(5, 8), 'its lines past the first part standing in none: the first part\'s stretch of it');
  assert.deepEqual(LAYER.standingStretch(blocks, [rest, run], span(5, 40)), span(13, 24), 'its first part and its last standing in none: from the second part\'s first character through the withheld run whole');
  assert.equal(LAYER.standingStretch(blocks, [last], span(5, 20)), null, 'no part standing holds any of it: none');
});

test('the fold\'s boxes of a span stand for any document whose text the model holds, mounted or not: each line holding a position of it, its column\'s width, with its line and its column — what an arrival is outlined on where no part of it stands (issue #158) — and none where its text has not arrived', () => {
  deliver();
  const d = REC.doc(D), f = LAYER.foldOf(d), box = docBox(D);
  CAM.set({ x: box.x + box.w / 2, y: box.y + box.h / 2, scale: 2 / f.fs });
  const b = d.blocks[40], own = f.lines.flatMap((l, i) => (l.pos === b.pos && l.at != null ? [i] : []));
  const boxes = LAYER.foldBoxes(D, b.pos, b.width);
  assert.ok(!LAYER.isMounted(D) && LAYER.lineBoxes(D, b.pos, b.width) === null, 'no article stands at em 2: the mount band\'s boxes none');
  assert.deepEqual(boxes.map((x) => x.line), own, 'every line of the paragraph, and no other');
  assert.ok(boxes.every((x) => x.column === columnOfLine(f, x.line)), 'each in the column holding its line');
  const first = boxes[0], c = f.columns[first.column], l = f.lines[first.line];
  assert.deepEqual(first.rect, { x: CAM.sx(box.x + c.x), y: CAM.sy(box.y + c.y + (l.top - c.top) * f.fs), w: c.w * CAM.cam.scale, h: l.h * f.fs * CAM.cam.scale }, 'its line\'s box on screen, its column\'s width');
  assert.deepEqual(LAYER.foldBoxes(D, b.pos + 3, 1).map((x) => x.line), [own[0]], 'a position: the line holding it alone');
  REC.invalidate(D);
  assert.deepEqual(LAYER.foldBoxes(D, 1, 5), [], 'its text not arrived: none');
});

test('a document stands by line: at a fresh mount the lines meeting the view, padded, stand, and no other; a pan stands the lines entering in parts of their own and takes down the parts none of whose lines is in view, setting no standing part again', () => onLayer(() => {
  deliver();
  const box = docBox(D), f = LAYER.foldOf(REC.doc(D)), c = f.columns[6];
  CAM.set({ x: box.x + c.x + c.w / 2, y: box.y + c.y + c.h * 0.4, scale: 12 / f.fs });
  LAYER.frame();
  const m0 = meeting(D), s0 = standing(D);
  assert.ok(m0.size > 0 && m0.size < f.lines.length, `the view meets ${m0.size} of its ${f.lines.length} lines`);
  assert.deepEqual([...s0].sort((x, y) => x - y), [...m0].sort((x, y) => x - y), 'the lines meeting the view stand, and no other');
  const before = /** @type {Array<{column: number, first: number, end: number}>} */ (LAYER.mountedLines(D));
  CAM.set({ ...CAM.view(), y: CAM.cam.y + 300 / CAM.cam.scale });
  LAYER.frame();
  const m1 = meeting(D), s1 = standing(D), after = /** @type {Array<{column: number, first: number, end: number}>} */ (LAYER.mountedLines(D));
  assert.ok([...m1].every((i) => s1.has(i)) && [...m1].some((i) => !s0.has(i)), 'the pan brings lines into view, and each stands');
  assert.ok(after.every((p) => Array.from({ length: p.end - p.first }, (_, k) => p.first + k).some((i) => m1.has(i))), 'every part standing holds a line in view');
  const kept = before.filter((p) => Array.from({ length: p.end - p.first }, (_, k) => p.first + k).some((i) => m1.has(i)));
  assert.ok(kept.length > 0 && kept.every((p) => after.some((q) => q.column === p.column && q.first === p.first && q.end === p.end)), 'a part still in view stands as it stood, set again for no line entering');
  assert.ok(after.filter((q) => !before.some((p) => p.first === q.first)).every((q) => Array.from({ length: q.end - q.first }, (_, k) => q.first + k).every((i) => !s0.has(i))), 'the lines entering stand in parts of their own');
}, 1440, 900));

test('the lines holding the page\'s selection stand through a pan and a zoom below 5.5, every one that stood, and go with it; its first and last lines stand wherever the view is', () => onLayer(() => {
  deliver();
  const d = REC.doc(D), box = docBox(D), f = LAYER.foldOf(d), c = f.columns[6];
  CAM.set({ x: box.x + c.x + c.w / 2, y: box.y + c.y + c.h * 0.4, scale: 12 / f.fs });
  LAYER.frame();
  /** a paragraph's lines, first to last */
  const linesOf = (/** @type {import('../model/records.js').Block} */ b) => { const a = /** @type {number} */ (placeOf(f, b.pos).line), z = /** @type {number} */ (placeOf(f, b.pos + b.width - 1).line); return Array.from({ length: z - a + 1 }, (_, k) => a + k); };
  // a paragraph of three lines or more, every one in view: the page selects it whole
  const m = meeting(D);
  const b = /** @type {import('../model/records.js').Block} */ (d.blocks.find((x) => { const ls = linesOf(x); return ls.length >= 3 && ls.every((i) => m.has(i)); }));
  const lines = linesOf(b);
  readers({ addr: D, pos: b.pos, width: b.width });
  LAYER.frame();
  assert.ok(lines.every((i) => standing(D).has(i)), 'its lines stand, in view');
  // a pan to the document's foot: every line of it that stood stands, out of view, and the lines in view with them
  const z = f.columns[f.columns.length - 1];
  CAM.set({ x: box.x + z.x + z.w / 2, y: box.y + z.y + z.h / 2, scale: CAM.cam.scale });
  LAYER.frame();
  assert.ok(lines.every((i) => !meeting(D).has(i)), 'its lines lie out of view');
  assert.ok(lines.every((i) => standing(D).has(i)) && LAYER.isMounted(D), 'through a pan, every one of its lines stands, in the mount band');
  assert.ok([...meeting(D)].every((i) => standing(D).has(i)), 'and the lines in view with them');
  // em 5, below the band: its lines alone stand, its article outside the band
  CAM.set({ ...CAM.view(), scale: 5 / f.fs });
  LAYER.frame();
  const held = /** @type {Array<{column: number, first: number, end: number}>} */ (LAYER.mountedLines(D));
  assert.ok(lines.every((i) => standing(D).has(i)) && held.every((p) => lines.some((i) => i >= p.first && i < p.end)), 'at em 5 its lines stand, and no part holding none of them');
  assert.ok(!LAYER.isMounted(D) && !LAYER.mountedAddrs().includes(D), 'its article outside the mount band');
  readers(null);
  LAYER.frame();
  assert.equal(LAYER.mountedLines(D), null, 'the selection gone, its article is taken down');
  // a paragraph of the second column, out of view, selected whole: its first and last lines stand, so its range can be placed
  CAM.set({ x: box.x + c.x + c.w / 2, y: box.y + c.y + c.h * 0.4, scale: 12 / f.fs });
  LAYER.frame();
  const o = /** @type {import('../model/records.js').Block} */ (d.blocks.find((x) => placeOf(f, x.pos).column === 1));
  const ol = linesOf(o);
  assert.ok(ol.every((i) => !meeting(D).has(i)), 'its lines lie out of view');
  readers({ addr: D, pos: o.pos, width: o.width });
  LAYER.frame();
  assert.ok(standing(D).has(ol[0]) && standing(D).has(ol[ol.length - 1]), 'its first and last lines stand, out of view');
}, 1440, 900));

test('an article standing keeps its place down to 5.5; a document holding none takes a place from 6.5', () => onLayer(() => {
  note(ALL);
  view(7);
  const all = settle();
  assert.deepEqual(all, inView(), 'em 7: every one in view stands, over the frames the limit takes');
  // 5.6: between the two thresholds, where the view takes in rows of the field no frame stood
  view(5.6);
  assert.ok(inView().length > all.length, 'em 5.6: more of the field in view');
  assert.deepEqual(frame(), all, 'em 5.6 from above: those standing stand, and none takes a place below 6.5');
  view(5);
  assert.deepEqual(frame(), [], 'em 5: below 5.5, none stands');
  view(5.6);
  assert.deepEqual(frame(), [], 'em 5.6 from below: none takes a place below 6.5');
  view(6.6);
  assert.deepEqual(settle(), inView(), 'em 6.6 from below: every one in view takes its place');
}, 9000, 6000));

test('a stale article is set again in its place, in the mount band and at the readable em, whatever the limit — never dropped', () => onLayer(() => {
  note(ALL);
  view(7);
  const all = settle();
  let before = elements();
  LAYER.bump();
  assert.deepEqual(frame(), all, 'a reveal\'s bump: every one stands, in the one frame');
  assert.deepEqual(unmoved(before), [], 'each set again, on an element of its own');
  view(6);
  assert.deepEqual(frame(), all, 'em 6: they stand');
  before = elements();
  LAYER.bump();
  assert.deepEqual(frame(), all, 'em 6, a reveal\'s bump: they are set again where they stand');
  assert.deepEqual(unmoved(before), [], 'each on an element of its own');
  before = elements();
  const one = all[0];
  give(one, `Note ${one}, delivered again.`);
  assert.deepEqual(frame(), all, 'em 6, a delivery to one of them: they stand');
  assert.deepEqual(unmoved(before), [...before.keys()].filter((a) => a !== nth(one)), 'that one set again, the others as they stood');
}));

test('while a press stands no standing article is set again, but a document reaching the readable em stands in the frame it gets there; the first frame after the press sets again what went stale', () => onLayer(() => {
  note(ALL);
  view(7, -3);
  settle();
  LAYER.press(true);
  LAYER.bump();
  const before = elements();
  view(9, 1);
  const seen = inView();
  assert.ok(seen.some((k) => !before.has(nth(k))), 'the pan and the zoom bring documents into view that stood nowhere');
  assert.deepEqual(frame(), seen, 'under the press every one in view stands, at the readable em');
  const kept = [...before.keys()].filter((a) => seen.includes(Number(a.split('.').pop())));
  assert.ok(kept.length > 0, 'some standing before the press stand in view still');
  assert.deepEqual(unmoved(before), kept, 'none of those set again under the press, stale as they are');
  LAYER.press(false);
  const after = elements();
  assert.deepEqual(frame(), seen, 'the press ended: they stand');
  assert.deepEqual(unmoved(after).filter((a) => kept.includes(a)), [], 'and those that went stale under it are set again');
}, 9000, 6000));

// ---- the owner a withheld run names ------------------------------------------------------------------------------------

test('a guest meets a withheld run named for its origin\'s owner, whoever owns the document windowing it: on the plane\'s mounted article and in a reading scene\'s pane alike — in its gap\'s face where the gap holds it, its clause decided (issue #151)', () => onLayer(() => {
  const O = '1.0.2.0.2', text = 'Tumbler.\n\n', width = 12 * 66, n = new TextEncoder().encode(text).length;
  REC.setSession(null);
  // the lookup of the edition claims on the run's origin answered: none
  REC.takeEditionClaims(O, []);
  REC.takeSpanSet(D, [{ subspace: 1, ordinal: 1, positions: n + width }]);
  REC.takeDelivery(D, [{ pos: 1, width: n, kind: 'content', text, ref: null, origin: null }, { pos: n + 1, width, kind: 'withheld', text: '', ref: null, origin: O }]);
  const d = REC.doc(D);
  assert.equal(REC.ownerAccount(d), '1.0.1', 'the first edition is 1.0.1\'s');
  const at = LAYER.centreOf(D, null);
  CAM.set({ x: at.x, y: at.y, scale: 12 / LAYER.foldOf(d).fs });
  LAYER.frame();
  const rec = LAYER.mountedSet().get(D);
  assert.ok(rec, 'at em 12 its article stands on the plane');
  const head = tHTML('B1.withheld-run', { owner: '1.0.2', account: '1.0.2', width, origin: O }, { owner: 'id', account: 'id', origin: 'id' });
  const arm = (/** @type {string} */ owner) => tHTML('R56.key-absent', { owner }, { owner: 'id' });
  /** @type {Array<[string, string]>} */
  const met = [['on the plane', String(/** @type {any} */ (rec.el).children[0].innerHTML)], ['in a pane', String(LAYER.sceneArticle(d).innerHTML)]];
  for (const [where, html] of met) {
    assert.ok(html.includes(`<span class="wh-head">${head}</span><span class="arm">${arm('1.0.2')}</span>`), `${where}: the head and R56's key-absent arm name 1.0.2, the owner of the run's origin`);
    assert.ok(!html.includes(arm('1.0.1')), `${where}: no arm names 1.0.1, the owner of the document windowing the run`);
  }
}, 1440, 900));

// ---- C-67's clause, from what the model holds ---------------------------------------------------------------------------

test('C-67\'s clause beneath a withheld origin reads the model whole: undecided while the lookup or a read a listed claim\'s admission waits on is out; where such a read failed — its home\'s metadata, or its link — "edition claims not read"; and the read that answers it decides the clause again (issue #186\'s design decision: "A blank there would read as \'no claim\'"; issue #272\'s: "Its words appear only when all their reads answer")', () => {
  const O = '1.0.1.0.1003', H = '1.0.1.0.9', C = H + '.0.2.1', R20 = '1.1.0.1.0.1.0.3.14';
  const notRead = { id: 'L.clause.unread', text: t('L.clause.unread') };
  assert.equal(LAYER.clauseOf(O), CLAUSE_READING, 'the lookup not answered: undecided');
  REC.takeEditionClaims(O, [C]);
  assert.equal(LAYER.clauseOf(O), CLAUSE_READING, 'the claim listed, its reads out: undecided');
  REC.takeFailedRead(H);
  assert.deepEqual(LAYER.clauseOf(O), notRead, 'its home\'s metadata read failed');
  REC.takeMetadata(H, { doc: H, published: true, owner: '1.0.1', birth: H + '.1', birthExtent: 20, placed: null, baseExtent: null, source: null, asOf: 1 });
  assert.equal(LAYER.clauseOf(O), CLAUSE_READING, 'the home answered, its link out: undecided');
  REC.takeFailedRead(C);
  assert.deepEqual(LAYER.clauseOf(O), notRead, 'its link\'s read failed');
  REC.takeLink({ addr: C, from: [span(H, 1, 20)], to: [whole(O)], type: R20 });
  assert.deepEqual(LAYER.clauseOf(O), { id: 'C-67.pointer', text: t('C-67.pointer'), claim: C, home: H }, 'the link answered: the edition over its own bytes, the pointer');
  REC.takeEditionClaims(O, 'unread');
  assert.deepEqual(LAYER.clauseOf(O), notRead, 'the lookup failed');
  REC.takeEditionClaims(O, 'withheld');
  assert.equal(LAYER.clauseOf(O), null, 'the lookup refused as withheld from the reader: no clause');
});

// ---- what an article was made from -------------------------------------------------------------------------------------

test('an article keeps what it was made from — its document\'s blocks, runs and image as the model held them — through a feed row naming it and the text its reads set again: a reading scene\'s pane\'s as a mounted one\'s', () => onLayer(() => {
  const text = 'Tumbler.\n\nThe passage a reader selected.', n = new TextEncoder().encode(text).length;
  REC.takeSpanSet(D, [{ subspace: 1, ordinal: 1, positions: n }]);
  REC.takeDelivery(D, [{ pos: 1, width: n, kind: 'content', text, ref: null, origin: null }]);
  const d = REC.doc(D);
  const at = LAYER.centreOf(D, null);
  CAM.set({ x: at.x, y: at.y, scale: 12 / LAYER.foldOf(d).fs });
  LAYER.frame();
  const rec = LAYER.mountedSet().get(D);
  assert.ok(rec, 'at em 12 its article stands on the plane');
  const pane = LAYER.sceneArticle(d);
  assert.deepEqual([pane.className, pane.dataset.addr], ['dtext scene', D], 'the pane\'s article: T-ARTICLE\'s scene-mode variant, keyed by its document');
  const blocks = d.blocks, runs = d.runs, image = d.image;
  /** @type {Array<[string, HTMLElement]>} */
  const made = [['on the plane', rec.el], ['in a pane', pane]];
  for (const [where, el] of made) assert.deepEqual(LAYER.madeOf(el), { addr: D, blocks, runs, image }, `${where}: made from the document's blocks, runs and image as the model held them`);
  // a feed row naming the document; the reads it makes again set other text in its place
  fedKept();
  const edited = 'Tumbler.\n\nAnother passage now.';
  setD(edited, [{ iStart: D + '.0.1.40', width: new TextEncoder().encode(edited).length }]);
  assert.equal(REC.textBetween(D, 11, 22), 'Another pas', 'the model holds the new text');
  for (const [where, el] of made) {
    const kept = LAYER.madeOf(el);
    assert.ok(kept && kept.blocks === blocks && kept.runs === runs && kept.image === image, `${where}: the article's own blocks, runs and image, never the model's newest`);
    assert.equal(kept && REC.textOf(kept.runs, 11, 22), 'The passage', `${where}: its bytes are the text it shows`);
  }
  assert.equal(LAYER.madeOf(/** @type {any} */ ({ dataset: { addr: D } })), null, 'an element that is neither a mounted article nor a pane\'s was made from nothing');
}, 1440, 900));

// ---- where an article's words were read: a copy named (FP-27) --------------------------------------------------------

/** D's metadata as `doc_metadata` answers it: an edition born at its first member */
const META = { doc: D, published: true, owner: '1.0.1', birth: D + '.1', birthExtent: EXTENT, placed: null, baseExtent: null, source: null, asOf: 1 };
/** the span the copies below name */
const AT = { pos: 5, width: 12 };
/** the camera over D's first column at em 12: its article, or its version's, stands */
function readFirst() {
  const f = LAYER.foldOf(REC.doc(D)), room = docBox(D), c = f.columns[0];
  CAM.set({ x: room.x + c.x + c.w / 2, y: room.y + c.y + c.h / 2, scale: 12 / f.fs });
}
/** the entry a copy of AT names in the article a box shows, after a frame */
function copyOf(/** @type {string} */ addr, board = 'origin-1') {
  LAYER.frame();
  const rec = LAYER.mountedSet().get(addr);
  assert.ok(rec, `${addr}'s article stands`);
  return LAYER.namedIn(rec.el, { addr, ...AT }, board);
}

test('a copy from a box names its words as FP-27 names a copy: at a published document\'s plain address the head its corner names, the span copied in it, read at the plain address; a chain not known to end there, or holding no member, no member and no positions; a box pinned at a version that version alone; a draft its address and never its positions — each by its bytes\' identity through the image its article was made from, the head named again as the chain is counted again (issue #244)', () => onLayer(() => {
  deliver(); deliver2();
  REC.takeImage(D2, 1, EDITED_IMAGE);
  const box = { at: D }, board = 'origin-1', ids = REC.identityOf(D, AT.pos, AT.width), ids2 = REC.identityOf(D2, AT.pos, AT.width);
  showing(box);
  readFirst();
  assert.ok(ids.length && ids2.length && ids[0].ordinal !== ids2[0].ordinal, 'each version\'s image covers the span, over bytes of its own');
  REC.takeMetadata(D, META); REC.takeMembers(D, 2);
  assert.deepEqual(copyOf(D), { board, doc: D, member: D2, plain: true, ...AT, ids }, 'the plain address, the chain ended at 2: the head its corner names, the span in it, read at the plain address');
  REC.takeMembers(D, 3);
  assert.deepEqual(copyOf(D), { board, doc: D, member: D + '.3', plain: true, ...AT, ids }, 'the chain counted again at 3: its article set again, naming the head now');
  REC.takeMembers(D, 8, false);
  assert.deepEqual(copyOf(D), { board, doc: D, member: null, plain: true, pos: null, width: null, ids }, 'a chain not known to end there: no member and no positions, read at the plain address');
  REC.takeMetadata(D, { ...META, birth: null }); REC.takeMembers(D, 0);
  assert.deepEqual(copyOf(D), { board, doc: D, member: null, plain: true, pos: null, width: null, ids }, 'no versions yet: no member, never a member 0');
  box.at = D2;
  assert.deepEqual(copyOf(D2), { board, doc: D2, member: D2, plain: false, ...AT, ids: ids2 }, 'pinned at version 2, its metadata unread: that version by its own address, its own bytes, never the plain address');
  box.at = D;
  REC.takeMetadata(D, { ...META, published: false, birth: null });
  assert.deepEqual(copyOf(D), { board, doc: D, member: null, plain: false, pos: null, width: null, ids }, 'a draft: its address and its bytes by identity, never its positions, which move');
}, 1440, 900));

test('a reading scene\'s pane names a copy where the scene says its words were read, its span measured against the address its acts name: an edition at its bare address, made as the member its text is, names the same words as the box showing it does; made with no word of where, as a box showing its record would; a span of another address none (issue #244)', () => onLayer(() => {
  deliver();
  REC.takeMetadata(D, META); REC.takeMembers(D, 2);
  readFirst();
  const box = copyOf(D);
  assert.ok(box && box.member === D2 && box.ids.length, 'the box at its plain address names its head and its bytes');
  const pane = LAYER.sceneArticle(REC.doc(D), { names: D2, shows: D, where: { doc: D, member: D2, plain: true } });
  assert.deepEqual(LAYER.namedIn(pane, { addr: D2, ...AT }, 'origin-1'), box, 'the pane at the bare address, made as the scene makes it: the box\'s entry, over the same bytes');
  assert.deepEqual(LAYER.namedIn(LAYER.sceneArticle(REC.doc(D)), { addr: D, ...AT }, 'origin-1'), box, 'made with no word of where: as the box names it');
  assert.equal(LAYER.namedIn(pane, { addr: D, ...AT }, 'origin-1'), null, 'a span measured against another address: none');
}, 1440, 900));

// ---- the zoom-in bound -------------------------------------------------------------------------------------------------

test('a document set smaller than its place\'s standard raises the zoom-in bound to read it, and no size read after lowers it: a change of the page\'s class dropping the document\'s text takes no scale from under its reader', () => {
  const RES = `1.0.1.0.${48 * (DEPTH_SOUND + 1) + 1}`, box = docBox(RES);
  CAM._reset(); CAM.setViewport(1440, 900);
  CAM.setDeepest(depthOfDoc(RES)); // the bound the app sets at boot over an index listing it
  const text = Array.from({ length: 2000 }, (_, i) => `Item ${i + 1}.`).join('\n\n'), n = new TextEncoder().encode(text).length;
  REC.takeSpanSet(RES, [{ subspace: 1, ordinal: 1, positions: n }]);
  REC.takeDelivery(RES, [{ pos: 1, width: n, kind: 'content', text, ref: null, origin: null }]);
  const fs = LAYER.foldOf(REC.doc(RES)).fs;
  assert.ok(box.residue && fs < standardFs(box) / 2.5, `a residue member of two thousand one-line paragraphs, set at ${fs / standardFs(box)} of its place's standard`);
  assert.ok(CAM.bounds().maxS * fs >= 36, `the bound reads its size at 36 px an em, as it reads its place's: ${CAM.bounds().maxS * fs}`);
  const reading = CAM.viewAt(LAYER.centreOf(RES, null), fs, 12.5);
  CAM.set(reading);
  assert.equal(CAM.view().scale, reading.scale, 'its reader at 12.5 px an em');
  REC.sessionDied({ arm: 'closed' });
  assert.ok(LAYER.foldOf(REC.doc(RES)).fs > 2.5 * fs, 'a change of the page\'s class drops its text: its size its place\'s standard again until the text is read anew');
  CAM.panBy(1, 0);
  assert.equal(CAM.view().scale, reading.scale, 'the next pan keeps its reader\'s scale');
  CAM._reset();
});

test('a standing article\'s symbols are marked heavier in place where every link one stands for is lit at an arrival — a text symbol its link, a withheld run\'s every end drawn at it — nothing rebuilt, and unmarked as the arrival goes; a span wholly inside a withheld run stands at the run\'s own boxes, never a line inside its gap (FP-30; issue #202)', () => {
  const O = '1.0.2.0.9', TEXT1 = 'Tumbler.\n\n', n = TEXT1.length, RUN = n + 1;
  /** @type {Map<string, boolean>} each symbol's `heavier` mark as last set, by the links it stands for */
  const heavier = new Map();
  const sym = (/** @type {Record<string, string>} */ dataset) => ({ dataset, classList: { toggle: (/** @type {string} */ c, /** @type {boolean} */ on) => { if (c === 'heavier') heavier.set(dataset.link || dataset.links, on); } } });
  const gap = { getClientRects: () => [{ left: 10, top: 20, width: 300, height: 40 }] };
  const answers = new Map([['.sym[data-link], .sym[data-links]', [sym({ link: 'L1' }), sym({ links: 'L1 L2' })]], [`.withheld[data-pos="${RUN}"]`, [gap]]]);
  onLayer(() => {
    REC.takeSpanSet(D, [{ subspace: 1, ordinal: 1, positions: n + 8 }]);
    REC.takeDelivery(D, [{ pos: 1, width: n, kind: 'content', text: TEXT1, ref: null, origin: null }, { pos: RUN, width: 8, kind: 'withheld', text: '', ref: null, origin: O }]);
    REC.takeImage(D, 1, [{ iStart: D + '.0.1.1', width: n }, { iStart: O + '.0.1.1', width: 8 }]);
    const f = LAYER.foldOf(REC.doc(D)), at = LAYER.centreOf(D, null);
    CAM.set({ x: at.x, y: at.y, scale: 12 / f.fs });
    LAYER.frame();
    assert.ok(LAYER.isMounted(D), 'its article stands at em 12');
    const el = LAYER.mountedSet().get(D)?.el;
    const marks = () => [heavier.get('L1'), heavier.get('L1 L2')];
    assert.deepEqual(marks(), [false, false], 'nothing lit: neither marked');
    LK.readers({ lit: () => ['L1'] });
    LAYER.frame();
    assert.deepEqual(marks(), [true, false], 'L1 lit: its text symbol heavier, the run\'s — standing for L2 too — not (P44)');
    LK.readers({ lit: () => ['L2', 'L1'] });
    LAYER.frame();
    assert.deepEqual(marks(), [true, true], 'both lit: both heavier');
    LK.readers({ lit: () => [] });
    LAYER.frame();
    assert.deepEqual(marks(), [false, false], 'the arrival gone: both unmarked');
    assert.equal(LAYER.mountedSet().get(D)?.el, el, 'every mark made in place, the article standing on its element');
    assert.deepEqual(LAYER.spanRects(D, RUN + 3, 2), [{ x: 10, y: 20, w: 300, h: 40 }], 'two positions inside the run: the run\'s own box');
    assert.deepEqual(LAYER.spanRects(D, RUN, 8), [{ x: 10, y: 20, w: 300, h: 40 }], 'the run whole: its own box');
  }, 1440, 900, answers);
});

test('an owner\'s byline facts arriving set a standing article again, its byline filled, and move no line — the fold it stands in as it stood; its cut label marked open in place on its act, closed again on the act again, nothing rebuilt (FP-34; issue #208)', () => {
  /** @type {boolean[]} the `open` mark the cut label was given, in order */
  const opened = [];
  const label = { classList: { toggle: (/** @type {string} */ c, /** @type {boolean} */ on) => { if (c === 'open') opened.push(on); } } };
  onLayer(() => {
    REC.setSession(null);
    const text = 'Tumbler.\n\nThe first field.', n = new TextEncoder().encode(text).length;
    REC.takeSpanSet(D, [{ subspace: 1, ordinal: 1, positions: n }]);
    REC.takeDelivery(D, [{ pos: 1, width: n, kind: 'content', text, ref: null, origin: null }]);
    const at = LAYER.centreOf(D, null);
    CAM.set({ x: at.x, y: at.y, scale: 12 / LAYER.foldOf(REC.doc(D)).fs });
    LAYER.frame();
    const standing = () => LAYER.mountedSet().get(D)?.el;
    const html = () => String(/** @type {any} */ (standing())?.children[0].innerHTML);
    assert.ok(LAYER.isMounted(D) && html().includes('class="slot pending"'), 'its owner\'s facts not read: the byline\'s boxes stand empty');
    const fold = LAYER.foldOf(REC.doc(D)), el = standing();
    REC.takeAccountKey('1.0.1', { label: 'Shane’s MacBook Pro (work, 2024)', fingerprint: 'ab'.repeat(32) });
    LAYER.frame();
    assert.ok(standing() !== el && html().includes(`>${esc('Shane’s MacBook Pro…')}<span class="whole">`) && html().includes('>abab abab abab abab</span>') && !html().includes('slot pending'), `set again, its byline filled: ${html().slice(0, 600)}`);
    assert.equal(LAYER.foldOf(REC.doc(D)), fold, 'the fold it stands in as it stood: what the slots show sets no line');
    const filled = standing();
    LAYER.openLabel(D);
    LAYER.frame();
    assert.deepEqual([LAYER.labelOpened(D), opened.at(-1)], [true, true], 'its act opens the cut label whole');
    LAYER.openLabel(D);
    LAYER.frame();
    assert.deepEqual([LAYER.labelOpened(D), opened.at(-1)], [false, false], 'the act again closes it');
    assert.equal(standing(), filled, 'each mark made in place, the article standing on its element');
  }, 1440, 900, new Map([['.slot.cut', [label]]]));
});

test('a face arriving after the first layout is a re-set: the type measured again, every standing article set again in the fold its words now take, the line under the view\'s centre kept at its height on screen and at its size, the view\'s centre framed across its column as a landing frames it (issue #16, #436; FP-8, FP-12)', () => onLayer(() => {
  deliver();
  const box = docBox(D), f0 = LAYER.foldOf(REC.doc(D)), c = f0.columns[3];
  CAM.set({ x: box.x + c.x + c.w / 2, y: box.y + c.y + c.h * 0.4, scale: 12 / f0.fs });
  LAYER.frame();
  const el = LAYER.mountedSet().get(D)?.el, pos = /** @type {number} */ (LAYER.posAt(D, CAM.cam.x, CAM.cam.y));
  const screen = () => { const p = placeOf(LAYER.foldOf(REC.doc(D)), pos); return { x: CAM.sx(box.x + p.x), y: CAM.sy(box.y + p.y) }; };
  const was = screen(), em = CAM.cam.scale * f0.fs, before = CHAR_W;
  try {
    // the face as rendered sets a wider advance: APP measures it again, refits the viewport and tells the layer
    setAdvance(0.5); CAM.setViewport(1440, 900); LAYER.refaced();
    LAYER.frame();
    const f = LAYER.foldOf(REC.doc(D)), now = screen();
    assert.ok(f !== f0 && f.fs !== f0.fs, `folded again at the new advance: ${f0.fs} → ${f.fs}`);
    assert.ok(LAYER.mountedSet().get(D)?.el !== el, 'the standing article set again on an element of its own');
    assert.ok(Math.abs(now.y - was.y) < 1e-6, `the line at the height it stood: ${JSON.stringify(was)} → ${JSON.stringify(now)}`);
    assert.ok(Math.abs(CAM.cam.x - LAYER.frameOf(D, pos, em).x) < 1e-6, 'the view\'s centre framed across its column, at its em');
    assert.ok(Math.abs(CAM.cam.scale * f.fs - em) < 1e-9, 'at its size on screen');
  } finally { setAdvance(before); LAYER.refaced(); }
}, 1440, 900));

test('a box\'s label is its contents line: its first line leading, at its em, its words as typed in the reading face, its draft mark the client\'s, cut on a word; its address at P-REG\'s one size and weight in the identifier\'s face, past its region\'s prefix and whole beside it for where its region is not named, in the title\'s ink; a withheld box\'s statement bracketed, the owner it names the identifier\'s — on the canvas and in the chrome alike (issues #16, #23)', () => {
  REC.takeIndex(/** @type {any} */ ({ docs: [{ doc: D, kind: 'draft', label: '# The artifact chain', standing: 'public' }], counts: [{ account: '1.0.1', documents: 1 }], state: { arm: 'complete' } }));
  const d = REC.doc(D), l = LAYER.docLabel(d, 12), first = /** @type {import('../plane/labels.js').Part} */ (l.lead);
  assert.deepEqual([l.address.text, l.address.whole, l.address.face, l.address.px, l.address.weight, l.address.ink, l.region], [LAYER.shortAddr(d), D, 'ident', ADDRESS.px, ADDRESS.weight, COL.title, '1.0.1'], 'the address past its region\'s prefix, whole beside it, at one size, never greyed');
  assert.deepEqual([first.px, first.fit, first.close], [12, 'cut', ''], 'the first line at the box\'s em, cut on a word');
  assert.deepEqual(runsOf(first.text, first.face || 'client'), [{ text: '# The artifact chain', face: 'reading' }, { text: ' · ' + t('F.label.draft'), face: 'client' }], 'the first line\'s words the reading face\'s, its characters as typed, "#" among them; the draft mark the client\'s');
  assert.equal(LAYER.firstLineHTML(d), `<span class="reading"># The artifact chain</span>${esc(' · ' + t('F.label.draft'))}`, 'in the chrome: the words in the reading face');
  assert.equal(LAYER.firstLine(d), '# The artifact chain · ' + t('F.label.draft'), 'as words, the same');
  REC.takeRefused(D, 'withheld');
  const held = /** @type {import('../plane/labels.js').Part} */ (LAYER.docLabel(REC.doc(D), 12).lead);
  assert.deepEqual(runsOf(held.text, held.face || 'client'), [{ text: '[withheld · ', face: 'client' }, { text: '1.0.1', face: 'ident' }, { text: ']', face: 'client' }], 'withheld: the statement the client\'s, bracketed, its owner the identifier\'s');
  assert.equal(held.close, ']', 'a cut keeps its closing bracket');
  assert.deepEqual(LAYER.docLabel(REC.doc(D), 12).parts, [], 'no badge at a withheld box');
  assert.equal(LAYER.firstLineHTML(REC.doc(D)), `[${tHTML('F.corner.withheld', { owner: '1.0.1' }, { owner: 'id' })}]`);
});

test('a box\'s first line is read by one rule: its own text from its first position where the model holds it — a record\'s words by the record rule, bracketed, else its first typed line holding more than white space — else the index\'s first line at its bare address; none where none is known, and none at a version the model holds no text of (issue #23)', () => {
  const at = (/** @type {string} */ addr) => LAYER.firstOf(REC.doc(addr)).map((r) => [r.text, r.face]);
  const U = '1.0.1.0.17', H = '1.0.1.0.1', V = D + '.3';
  REC.takeIndex(/** @type {any} */ ({ docs: [{ doc: D, kind: 'edition', label: 'the index\'s words', standing: 'public' }], counts: [{ account: '1.0.1', documents: 1 }], state: { arm: 'complete' } }));
  assert.deepEqual(at(D), [['the index\'s words', 'reading']], 'listed, no text held: the index\'s first line');
  assert.deepEqual(at(U), [], 'unlisted, nothing held: none');
  REC.takeDelivery(U, [{ pos: 1, width: 24, kind: 'content', text: '   \n\nAn unlisted document.', ref: null, origin: null }]);
  assert.deepEqual(at(U), [['An unlisted document.', 'reading']], 'unlisted, its text held: its first typed line holding more than white space');
  REC.takeDelivery(D, [{ pos: 1, width: 20, kind: 'content', text: 'Its own first line.\n', ref: null, origin: null }]);
  assert.deepEqual(at(D), [['Its own first line.', 'reading']], 'its text held from its first position: its own first line, the words that stand when it mounts');
  REC.takeDelivery(H, [{ pos: 1, width: 1, kind: 'atom', text: JSON.stringify({ type: 'skep-enroll', keys: [{ label: 'dev', alg: 'ed25519', key: '00' }] }), ref: null, origin: null }]);
  assert.deepEqual(LAYER.firstOf(REC.doc(H)).map((r) => r.text).join(''), t('L.client-words', { words: t('F.home-record.yours') }), 'opening with a record: the record rule\'s words, bracketed, never its raw value');
  assert.deepEqual(at(V), [], 'a version, its text unread: none, never its trunk\'s index line');
});

test('the status region names a document as the mirror\'s item finds it: its first line as the item says it — the document\'s own words quoted, the client\'s bracketed — NAME_WORDS of its words at the most, cut on a word with the quote or the bracket it closes with kept after the ellipsis, then the address it names; the address alone where no first line is known; a box by the version it shows (issue #369\'s design decision: "The name is the one the mirror uses: the first line\'s first six words, then the address")', () => {
  const U = '1.0.1.0.17', H = '1.0.1.0.1', W = '1.0.1.0.19', V = D + '.3', P = D + '.2';
  const text = (/** @type {string} */ addr, /** @type {string} */ words) => REC.takeDelivery(addr, [{ pos: 1, width: words.length, kind: 'content', text: words, ref: null, origin: null }]);
  text(D, 'Tumbler.\n\nThe first field.');
  assert.deepEqual([LAYER.mirrorLabel(REC.doc(D)).map((r) => r.text).join(''), LAYER.placeName(REC.doc(D), D)], ['"Tumbler."', `"Tumbler." ${D}`], 'a first line of one word: whole, quoted as the mirror quotes it, then the address');
  text(U, 'Item 1 of an edition longer than its room\'s twelve columns.\n');
  assert.equal(LAYER.placeName(REC.doc(U), U), `"Item 1 of an edition longer…" ${U}`, 'eleven words: the first six, cut on a word, the closing quote kept after the ellipsis');
  text(W, 'Six words make this first line.\n');
  assert.equal(LAYER.placeName(REC.doc(W), W), `"Six words make this first line." ${W}`, 'six words: whole');
  REC.takeDelivery(H, [{ pos: 1, width: 1, kind: 'atom', text: JSON.stringify({ type: 'skep-enroll', keys: [{ label: 'dev', alg: 'ed25519', key: '00' }] }), ref: null, origin: null }]);
  const record = LAYER.placeName(REC.doc(H), H);
  assert.ok(record.startsWith('[' + t('F.home-record.yours').split(' ').slice(0, 3).join(' ')) && record.endsWith(`…] ${H}`) && record.split(' ').filter((w) => /[\p{L}\p{N}]/u.test(w)).length === LAYER.NAME_WORDS + 1, `a record's words, the client's: bracketed, never quoted, cut to six with its closing bracket kept — ${record}`);
  assert.equal(LAYER.placeName(REC.doc(V), V), V, 'no first line known: the address alone');
  REC.takeRefused(U, 'withheld');
  assert.equal(LAYER.placeName(REC.doc(U), U), U, 'withheld: the address alone, as the mirror names no first line there');
  text(P, 'The second version holds this.\n');
  try {
    LAYER.readers({ shown: (a) => (a === D ? P : a) });
    assert.deepEqual(LAYER.boxName(D), { addr: P, name: `"The second version holds this." ${P}` }, 'a box pinned on a version: that version\'s first line and address');
  } finally { LAYER.readers({}); }
  assert.deepEqual(LAYER.boxName(D), { addr: D, name: `"Tumbler." ${D}` }, 'at its plain address: its own');
});

test('where the platform sets no words — the node tests — the article\'s measure counts every character one advance of the reading face, whatever its face, as the plan does (issue #16)', () => {
  assert.equal(LAYER.widthOf('1.0.1.0.3', 'ident'), 9 * CHAR_W);
  assert.equal(LAYER.widthOf('not rendered', 'client'), 12 * CHAR_W);
  assert.equal(LAYER.viewFor(REC.doc(D)).measure, LAYER.widthOf, 'the article\'s view measures by it');
});

test('a link\'s symbol is titled with its far end\'s state in its short form, the start of what its mirror item and its card say whole: no clause for the withheld text its far document shows, and no count of the runs holding its passage (issue #242\'s design decision: "Stubs and symbols show the start of the card\'s and mirror\'s full phrase")', () => {
  // the person's citation from D's first three bytes of FAR's first five, which FAR's text holds two of at 1 and its fourth at 8, in two runs, before thirty positions withheld from the reader
  const L = D + '.0.2.1', P = FAR + '.0.1.';
  REC.takeDelivery(D, [{ pos: 1, width: EXTENT, kind: 'content', text: TEXT, ref: null, origin: null }]);
  REC.takeImage(D, 1, [{ iStart: D + '.0.1.1', width: EXTENT }]);
  REC.takeLinks(D, [L]);
  REC.takeLink({ addr: L, from: [span(D, 1, 3)], to: [span(FAR, 1, 5)], type: CITE });
  REC.takeDelivery(FAR, [{ pos: 1, width: 10, kind: 'content', text: 'abcde\n\nfg\n', ref: null, origin: null }, { pos: 11, width: 30, kind: 'withheld', text: '', ref: null, origin: '1.0.2.0.6' }]);
  REC.takeImage(FAR, 1, [{ iStart: P + '1', width: 2 }, { iStart: P + '100', width: 5 }, { iStart: P + '4', width: 1 }, { iStart: P + '200', width: 32 }]);
  REC.takeProjection(L, 2, FAR, [{ pos: 1, width: 2 }, { pos: 8, width: 1 }]);
  LK.reveal(D, 2);
  const d = REC.doc(D), v = LAYER.viewFor(d), s = /** @type {import('../links/links.js').Shown} */ (v.symbols.find((x) => x.link.addr === L));
  const part = t('L.held.part', { subject: t('L.held.followed'), where: t('L.held.current', { D: FAR }) });
  assert.deepEqual([v.says(s), farSays(s)], [part, part + t('L.held.withheld')], 'the symbol\'s words the short form, its mirror item\'s the whole');
  const title = (articleHTML(d, v, '1.0.1').match(new RegExp(`<span class="sym [^"]*" data-link="${L}"[^>]* title="([^"]*)"`)) || [])[1];
  assert.equal(title, esc(`${CITE} · ${part}`), 'its title: its type, then the short form alone');
});

test('a kept document carries one clause by one rule: a draft holding its text "as last read", else "links as last read" — an edition\'s words never change, so its links\' alone, a pinned box\'s its document\'s — at the page\'s clock at the row or drop that left it behind, the failed read\'s words after it; none where it is not kept, a read refused it, or it holds neither (issues #345, #367)', () => {
  const at = new Date(2026, 2, 12, 9, 5).getTime(), now = new Date(2026, 2, 12, 12).getTime();
  const draft = { ...REC.doc('1.0.1.0.2'), kind: /** @type {const} */ ('draft'), from: 1, to: 5, linksRead: true };
  const kept = { met: null, since: at }, unreachable = { met: /** @type {any} */ ({ kind: 'unreachable', name: 'unreachable', text: '' }), since: at }, busy = { met: /** @type {any} */ ({ kind: 'refused', name: 'scan_busy' }), since: at };
  assert.deepEqual(LAYER.keptWords(draft, draft, kept, now), { id: 'L.kept.text', text: t('L.kept.text', { when: lastRead(at, now) }), reason: '', since: at }, 'a draft holding its text: as last read, at the row or drop that left it behind, the stamp it says');
  assert.equal(LAYER.keptWords(draft, draft, kept, now)?.text, 'as last read 09:05');
  assert.equal(LAYER.keptWords(draft, draft, { met: null, since: new Date(2026, 2, 12, 9, 7).getTime() }, now)?.text, 'as last read 09:07', 'the stamp the kept answer carries, whatever the text was read at');
  assert.deepEqual([LAYER.keptWords(draft, draft, unreachable, now)?.text, LAYER.keptWords(draft, draft, unreachable, now)?.reason], [t('L.kept.failed', { clause: 'as last read 09:05', reason: t('F.daemon.unreachable') }), t('F.daemon.unreachable')], 'the board not answering: its words after the clause, and apart');
  assert.equal(LAYER.keptWords(draft, draft, busy, now)?.text, t('L.kept.failed', { clause: 'as last read 09:05', reason: t('L.held.why.busy') }), 'a scan the board kept busy');
  assert.deepEqual(LAYER.keptWords({ ...draft, from: -1 }, draft, kept, now), { id: 'L.kept.links', text: 'links as last read 09:05', reason: '', since: at }, 'a draft holding no text: its links');
  const edition = { ...REC.doc(D), from: 1, to: 5, linksRead: true };
  assert.deepEqual(LAYER.keptWords(edition, edition, kept, now), { id: 'L.kept.links', text: 'links as last read 09:05', reason: '', since: at }, 'an edition holding its text: its links alone');
  const member = { ...REC.doc(D + '.2'), kind: /** @type {const} */ ('edition'), from: 1, to: 5 };
  assert.equal(LAYER.keptWords(member, edition, kept, now)?.text, 'links as last read 09:05', 'a pinned box: its document\'s links');
  assert.equal(LAYER.keptWords(draft, draft, null, now), null, 'not kept: none');
  assert.equal(LAYER.keptWords({ ...draft, refused: 'withheld' }, draft, kept, now), null, 'a read refused it: none');
  assert.equal(LAYER.keptWords({ ...edition, linksRead: false }, { ...edition, linksRead: false }, kept, now), null, 'an edition whose links are not read: none');
  assert.equal(LAYER.keptWords(draft, draft, kept, new Date(2026, 2, 13, 8).getTime())?.text, 'as last read 12 March 2026, 09:05', 'left behind another day: the day first');
});

test('a withheld run\'s kept sign carries nothing while no origin\'s edition claims stand kept, and a standing article\'s signs are emptied in place (issue #345)', () => {
  const O = '1.0.1.0.1003';
  REC.takeEditionClaims(O, []);
  assert.equal(LAYER.claimsKeptIn(O), null, 'claims held, none kept: no clause');
  /** a kept sign in an article: its origin, its words and the string they are */
  const sign = { dataset: /** @type {Record<string, string>} */ ({ kept: O, string: 'L.kept.links' }), textContent: 'links as last read 09:05' };
  LAYER.markKeptSigns(/** @type {any} */ ({ querySelectorAll: (/** @type {string} */ sel) => (sel === '.wh-kept[data-kept]' ? [sign] : []) }));
  assert.deepEqual([sign.textContent, sign.dataset.string], ['', undefined], 'the claims kept no more: the sign emptied');
});

test('a kept box\'s label carries its clause after its address — the words the page says of it wherever it names it, at P-REG\'s address size, in the title\'s ink, wrapped and never cut — and none within the second, where the one line names it, or once its read again sets it; its account counts it among its documents standing so (issue #368\'s design decision: "the clause follows the address, at the address\'s small size"; "At far scale, the account\'s label carries \'⟨n⟩ as last read\'")', async (ctx) => {
  const fake = FAKE.create({});
  try {
    PORT.boot(fake);
    PUMP.start({ onDirty: () => {} });
    REC.setBoard({ board: 'b-1', name: '', origin: '' });
    REC.takeLinks(D, []);
    // the camera over D's first column, below its reading scale: D shown, so a row naming it keeps it as it stands
    CAM._reset(); CAM.setViewport(1440, 900);
    const f = LAYER.foldOf(REC.doc(D)), box = docBox(D), c = f.columns[0];
    CAM.set({ x: box.x + c.x + c.w / 2, y: box.y + c.y + c.h / 2, scale: 4 / f.fs });
    const release = fake.hold('op', { frame: F.retrieveDocVSpanSet(D) });
    ctx.mock.timers.enable({ apis: ['setTimeout'] });
    const label = () => LAYER.docLabel(REC.doc(D), 4);
    fake.fire('feed', { board: 'b-1', update: { position: 9, at: 9, op: 'insert', docs: [D], class: 'published' } });
    assert.deepEqual([label().kept, LAYER.keptCountIn('1.0.1')], [null, 0], 'within the second: no clause, none counted');
    ctx.mock.timers.tick(PUMP.KEPT_MS);
    const k = /** @type {{since: number}} */ (PUMP.kept(D));
    assert.ok(k, 'D kept past the second, its read again out');
    const words = t('L.kept.links', { when: lastRead(k.since) });
    assert.deepEqual(label().kept, { text: words, px: ADDRESS.px, ink: COL.title, fit: 'wrap' }, 'an edition\'s "links as last read", at the address\'s size, in the title\'s ink, never cut');
    assert.equal(LAYER.keptIn(D)?.text, words, 'the words the page says of it wherever it names it');
    assert.deepEqual([LAYER.keptCountIn('1.0.1'), LAYER.keptCountIn('1.0.2')], [1, 0], 'its account counts it; another none');
    LAYER.readers({ named: () => D });
    assert.equal(label().kept, null, 'the one line naming it: none on its label, for the line carries the clause beside its address');
    LAYER.readers({});
    release();
    for (let i = 0; i < 50 && PUMP.kept(D); i++) await new Promise((r) => setImmediate(r));
    assert.deepEqual([PUMP.kept(D), label().kept, LAYER.keptCountIn('1.0.1')], [null, null, 0], 'its read again set it: no clause, none counted');
  } finally { LAYER.readers({}); PORT.boot(null); CAM._reset(); }
});

test('while the board lags past a second the plane\'s corner names neither the latest version nor the chain\'s count — its items made again in the frame the lag begins, and again in the frame it ends with the catch-up\'s rows (issue #367\'s design decision: "corners drop \'the latest\' and \'of ⟨n⟩\'")', async (ctx) => {
  const platform = { document: globalThis.document, window: globalThis.window };
  /** an element of the page: the corner's, the article's and its column's, measured as the platform lays them out */
  const element = () => {
    const e = {
      className: '', innerHTML: '', id: '', dataset: {}, style: {}, children: /** @type {unknown[]} */ ([]), tabIndex: -1, offsetWidth: 160, offsetHeight: 40,
      classList: { toggle() {} }, setAttribute() {}, removeAttribute() {}, appendChild(/** @type {unknown} */ c) { e.children.push(c); },
      querySelector: () => null, querySelectorAll: () => [], getBoundingClientRect: () => ({ top: 0, left: 0, width: 0, height: 0 }), contains: () => false, remove() {},
    };
    return e;
  };
  globalThis.document = /** @type {any} */ ({ createElement: element });
  globalThis.window = /** @type {any} */ ({ getSelection: () => null });
  const fake = FAKE.create({ [FAKE.keyOf('changes', { session: 's-1', since: 10 })]: { result: { entries: [], next: 10, head: 10 } } });
  try {
    PORT.boot(fake);
    PUMP.start({ onDirty: () => {} });
    REC.setBoard({ board: 'b-1', name: '', origin: '' });
    REC.reachFeed(10);
    REC.takeMetadata(D, { doc: D, published: true, owner: '1.0.1', birth: D + '.1', birthExtent: EXTENT, placed: null, baseExtent: null, source: null, asOf: 1 });
    REC.takeMembers(D, 2);
    REC.takeDelivery(D, [{ pos: 1, width: EXTENT, kind: 'content', text: TEXT, ref: null, origin: null }]);
    REC.takeImage(D, 1, [{ iStart: D + '.0.1.1', width: EXTENT }]);
    CAM.setViewport(VW, VH);
    LAYER.attach(/** @type {any} */ ({ clientWidth: VW, clientHeight: VH, appendChild() {} }), /** @type {any} */ (element()));
    const f = LAYER.foldOf(REC.doc(D)), box = docBox(D), c = f.columns[0];
    CAM.set({ x: box.x + c.x + c.w / 2, y: box.y + c.y + c.h / 2, scale: 12 / f.fs });
    const items = () => /** @type {{innerHTML: string} | null} */ (/** @type {unknown} */ (LAYER.cornerOf(D)))?.innerHTML ?? '';
    const latest = esc(t('F.corner.latest', { published: t('F.published.notebook') })), counted = esc(t('F.version-of', { k: 2, n: 2 }));
    LAYER.frame();
    assert.ok(items().includes(latest) && items().includes(counted), `the corner at reading scale: the latest, "version 2 of 2" — ${items()}`);
    ctx.mock.timers.enable({ apis: ['setTimeout'] });
    fake.drop();
    LAYER.frame();
    assert.ok(items().includes(counted), 'within the second: as it stood');
    ctx.mock.timers.tick(PUMP.KEPT_MS);
    LAYER.frame();
    assert.ok(!items().includes(latest) && !items().includes(counted) && items().includes(`<span class="version">${esc(t('L.version', { k: 2 }))}</span>`), `the board lagging: its publication alone, "version 2" — ${items()}`);
    fake.reopen();
    for (let i = 0; i < 20 && PUMP.boardKept(); i++) await new Promise((r) => setImmediate(r));
    LAYER.frame();
    assert.ok(PUMP.boardKept() === null && items().includes(latest) && items().includes(counted), `the catch-up's rows taken: the latest and the count again — ${items()}`);
    assert.deepEqual(fake.unanswered, []);
  } finally { LAYER.press(false); LAYER.clear(); PORT.boot(null); globalThis.document = platform.document; globalThis.window = platform.window; }
});

/**
 * The plane's corner over stand-ins of the page: `body` run with the corner layer attached, D's version 2 delivered whole
 * and D's metadata and version 2's read — the chain born at version 1 — the camera at reading scale over D's box; the
 * corner's items read back by `items(addr)`
 * @param {(items: (addr: string) => string) => void} body
 */
function onCorner(body) {
  const platform = { document: globalThis.document, window: globalThis.window };
  /** an element of the page: the corner's, the article's and its column's, measured as the platform lays them out */
  const element = () => {
    const e = {
      className: '', innerHTML: '', id: '', dataset: {}, style: {}, children: /** @type {unknown[]} */ ([]), tabIndex: -1, offsetWidth: 160, offsetHeight: 40,
      classList: { toggle() {} }, setAttribute() {}, removeAttribute() {}, appendChild(/** @type {unknown} */ c) { e.children.push(c); },
      querySelector: () => null, querySelectorAll: () => [], getBoundingClientRect: () => ({ top: 0, left: 0, width: 0, height: 0 }), contains: () => false, remove() {},
    };
    return e;
  };
  globalThis.document = /** @type {any} */ ({ createElement: element });
  globalThis.window = /** @type {any} */ ({ getSelection: () => null });
  try {
    const meta = { doc: D, published: true, owner: '1.0.1', birth: D + '.1', birthExtent: EXTENT, placed: null, baseExtent: null, source: null, asOf: 1 };
    deliver(); deliver2();
    REC.takeMetadata(D, meta); REC.takeMetadata(D2, meta);
    CAM.setViewport(VW, VH);
    LAYER.attach(/** @type {any} */ ({ clientWidth: VW, clientHeight: VH, appendChild() {} }), /** @type {any} */ (element()));
    const f = LAYER.foldOf(REC.doc(D)), box = docBox(D), c = f.columns[0];
    CAM.set({ x: box.x + c.x + c.w / 2, y: box.y + c.y + c.h / 2, scale: 12 / f.fs });
    body((addr) => /** @type {{innerHTML: string} | null} */ (/** @type {unknown} */ (LAYER.cornerOf(addr)))?.innerHTML ?? '');
  } finally { LAYER.press(false); LAYER.clear(); LAYER.readers({}); globalThis.document = platform.document; globalThis.window = platform.window; }
}

test('the plane\'s corner of a box shown at a version names that version and its chain\'s count, and counts the chain again in the frame a newer version\'s arrival counts it — "version 2 of 2", then "version 2 of 3" — its article standing all the while (FP-22, FP-23; issue #239\'s design decision: "it counts the chain again when a newer version arrives")', () => onCorner((items) => {
  showing({ at: D2 });
  REC.takeMembers(D, 2);
  const published = t('F.published.notebook'), of = (/** @type {number} */ n) => `<span class="version" data-members="${n}">${esc(t('F.version-of', { k: 2, n }))}</span>`;
  LAYER.frame();
  assert.ok(LAYER.isMounted(D2) && items(D2).includes(esc(t('F.corner.pinned', { published, k: 2 }))) && items(D2).includes(of(2)), `the box at version 2: its corner names it, "version 2 of 2" — ${items(D2)}`);
  const last = LAYER.mounts().at(-1);
  REC.takeMembers(D, 3);
  LAYER.frame();
  assert.ok(items(D2).includes(of(3)) && !items(D2).includes(of(2)), `version 3 arrived, the chain counted again: "version 2 of 3" in that frame — ${items(D2)}`);
  assert.ok(LAYER.isMounted(D2) && LAYER.mounts().at(-1) === last, 'its article standing: nothing mounted again');
}));

test('the plane\'s corner claims no total the board did not give: a chain its probe read part of — the board not answering that none follows — names no count at the bare address nor at a version, its state standing; the board ending the chain there, the count (FP-22; #184\'s rule: "nothing built from it claims a total or a latest")', () => onCorner((items) => {
  const box = { at: D };
  showing(box);
  const published = t('F.published.notebook');
  REC.takeMembers(D, 8, false);
  LAYER.frame();
  assert.ok(items(D).includes(esc(t('F.corner.latest', { published }))) && !items(D).includes('class="version"'), `the bare address: the latest version, no "version 8 of 8" — ${items(D)}`);
  box.at = D2;
  LAYER.frame();
  assert.ok(items(D2).includes(esc(t('F.corner.pinned', { published, k: 2 }))) && !items(D2).includes('class="version"'), `at version 2: its own version, no "of 8" — ${items(D2)}`);
  REC.takeMembers(D, 8, true);
  LAYER.frame();
  assert.ok(items(D2).includes(esc(t('F.version-of', { k: 2, n: 8 }))), `the chain ended at 8: "version 2 of 8" — ${items(D2)}`);
}));

test('the plane\'s corner of a box a newer version\'s arrival pinned offers to read the newest member named — a control after its version statement, never a Tab stop — in the frame the offer stands, raises it in the frame it is raised and drops it in the frame it ends, its article standing all the while; a focus on the offer goes to the offer standing in its place, and to the corner once none does (issue #240; D5 K-57; FP-20, FP-23)', () => onCorner(() => {
  /** the platform's focus, and each element of the page: the corner's controls as its items set them, read back as the platform reads them */
  const page = /** @type {any} */ ({ activeElement: null });
  page.createElement = () => {
    /** @type {any[]} */
    const controls = [];
    let html = '';
    const e = /** @type {any} */ ({
      className: '', id: '', dataset: {}, style: {}, children: [], tabIndex: -1, offsetWidth: 160, offsetHeight: 40,
      classList: { toggle() {} }, setAttribute() {}, removeAttribute() {}, appendChild(/** @type {unknown} */ c) { e.children.push(c); },
      querySelector: () => null, getBoundingClientRect: () => ({ top: 0, left: 0, width: 0, height: 0 }), remove() {},
      getAttribute: (/** @type {string} */ a) => (a === 'tabindex' ? String(e.tabIndex) : null), focus() { page.activeElement = e; },
      querySelectorAll: () => controls, contains: (/** @type {unknown} */ x) => x === e || controls.includes(x),
      get innerHTML() { return html; },
      set innerHTML(/** @type {string} */ v) {
        html = v; controls.length = 0;
        for (const m of v.matchAll(/data-read="(\d+)"[^>]*tabindex="(-?\d+)"/g)) { const c = { dataset: { read: m[1] }, getAttribute: (/** @type {string} */ a) => (a === 'tabindex' ? m[2] : null), focus() { page.activeElement = c; } }; controls.push(c); }
      },
    });
    return e;
  };
  globalThis.document = page;
  const offer = { n: /** @type {number | null} */ (null) };
  LAYER.readers({ selection: () => null, focus: () => null, top: () => 0, handOff: () => {}, navigated: () => null, shown: (a) => (a === D || a === D2 ? D2 : a), newer: (a) => (a === D2 ? offer.n : null) });
  REC.takeMembers(D, 3);
  const corner = () => /** @type {any} */ (LAYER.cornerOf(D2)), items = () => corner()?.innerHTML ?? '';
  const act = (/** @type {number} */ n) => `<span class="read" data-read="${n}" role="button" tabindex="-1">${esc(t('F.versions.read', { k: n }))}</span>`;
  const mine = (/** @type {string} */ a) => a === D2;
  LAYER.frame(mine);
  assert.ok(LAYER.isMounted(D2) && items().includes(esc(t('F.version-of', { k: 2, n: 3 }))) && !items().includes('data-read'), `the box at version 2, no offer: "version 2 of 3" alone — ${items()}`);
  const last = LAYER.mounts().at(-1);
  offer.n = 3;
  LAYER.frame(mine);
  assert.ok(items().includes(act(3)) && items().indexOf('class="version"') < items().indexOf(act(3)), `the offer in that frame, after the version statement — ${items()}`);
  const [read3] = corner().querySelectorAll();
  read3.focus();
  offer.n = 4;
  LAYER.frame(mine);
  const [read4] = corner().querySelectorAll();
  assert.ok(items().includes(act(4)) && !items().includes(act(3)), `raised to version 4 in that frame — ${items()}`);
  assert.ok(read4 && read4 !== read3 && page.activeElement === read4, 'the focus on the offer standing in its place');
  offer.n = null;
  LAYER.frame(mine);
  assert.ok(!items().includes('data-read') && page.activeElement === corner(), `the offer gone in that frame, the focus on the corner — ${items()}`);
  assert.ok(LAYER.isMounted(D2) && LAYER.mounts().at(-1) === last, 'its article standing: nothing mounted again');
}));

test('the plane\'s corner of a draft carries its kept state — the slot an empty box while none is set — its items made again in the frame the state is set, the frame the word\'s statement opens and the frame it closes, and the frame the state is cleared (B3-S2; D5 K-57, K-74; FP-34)', () => {
  const platform = { document: globalThis.document, window: globalThis.window };
  /** an element of the page: the corner's, the article's and its column's, measured as the platform lays them out */
  const element = () => {
    const e = {
      className: '', innerHTML: '', id: '', dataset: {}, style: {}, children: /** @type {unknown[]} */ ([]), tabIndex: -1, offsetWidth: 160, offsetHeight: 40,
      classList: { toggle() {} }, setAttribute() {}, removeAttribute() {}, appendChild(/** @type {unknown} */ c) { e.children.push(c); },
      querySelector: () => null, querySelectorAll: () => [], getBoundingClientRect: () => ({ top: 0, left: 0, width: 0, height: 0 }), contains: () => false, remove() {},
    };
    return e;
  };
  globalThis.document = /** @type {any} */ ({ createElement: element });
  globalThis.window = /** @type {any} */ ({ getSelection: () => null });
  try {
    // D a draft of the session's account, its text held
    REC.takeIndex(/** @type {any} */ ({ docs: [{ doc: D, kind: 'draft', label: 'd', standing: 'yours_to_read' }], counts: [{ account: '1.0.1', documents: 1 }], state: { arm: 'complete' } }));
    REC.takeDelivery(D, [{ pos: 1, width: EXTENT, kind: 'content', text: TEXT, ref: null, origin: null }]);
    REC.takeImage(D, 1, [{ iStart: D + '.0.1.1', width: EXTENT }]);
    CAM.setViewport(VW, VH);
    LAYER.attach(/** @type {any} */ ({ clientWidth: VW, clientHeight: VH, appendChild() {} }), /** @type {any} */ (element()));
    const f = LAYER.foldOf(REC.doc(D)), box = docBox(D), c = f.columns[0];
    CAM.set({ x: box.x + c.x + c.w / 2, y: box.y + c.y + c.h / 2, scale: 12 / f.fs });
    const items = () => /** @type {{innerHTML: string} | null} */ (/** @type {unknown} */ (LAYER.cornerOf(D)))?.innerHTML ?? '';
    const reason = 'the board is not answering';
    LAYER.frame();
    assert.ok(items().includes('<span class="kept-word pending" aria-hidden="true"') && items().includes('data-chip="1"') && !items().includes('class="version"'), `a draft's corner at reading scale: the empty slot, then the chip — ${items()}`);
    REC.setKept(D, { word: 'not yet kept', reason });
    LAYER.frame();
    assert.ok(items().includes(`data-kept="not yet kept" data-string="B3.not-yet-kept"`) && items().includes(esc(t('B3.not-yet-kept'))) && !items().includes('kept-statement'), `the state set: its word in the slot, the statement closed — ${items()}`);
    assert.equal(LAYER.openStatement(D), true, 'the word\'s act opens the statement');
    LAYER.frame();
    assert.ok(items().includes('<span class="kept-statement" data-string="B3.save.before">') && items().includes(esc(reason)), `the statement whole, the reason on it — ${items()}`);
    assert.equal(LAYER.openStatement(D), false, 'the act again closes it');
    LAYER.frame();
    assert.ok(items().includes('data-kept="not yet kept"') && !items().includes('kept-statement'), 'closed: the word alone');
    REC.setKept(D, null);
    LAYER.frame();
    assert.ok(items().includes('kept-word pending') && !items().includes('data-kept'), 'cleared: the slot empty again, its width kept');
    assert.equal(LAYER.openStatement(D), false, 'no state set: there is no statement to open');
  } finally { LAYER.press(false); LAYER.clear(); globalThis.document = platform.document; globalThis.window = platform.window; }
});

// ---- the corner at its document's head; the view framed sideways through a refit (FP-8, FP-26, FP-31, FP-36) ----------

test('a head\'s rows: the name\'s least room first, then the kept clause and the items in their one order while they fit, standing at the first row\'s end, the name\'s room before them; an item that never yields wrapped whole onto the next row, its words wrapped onto the rows they take where it is wider than the head; one that yields folded into "⟨n⟩ more", which takes the next slot (issue #436; FP-26)', () => {
  const pitch = LINE_H * 17;
  const items = [{ w: 11, yields: false, words: '○' }, { w: 70, yields: false, words: 'version 2 of 3' }, { w: 80, yields: true, words: 'read version 3' }, { w: 190, yields: false, words: '12 links to this document as a whole' }];
  const L = LAYER.headLayout(items, 50, null, 220, pitch);
  const at = (/** @type {number} */ k) => L.slots.find((s) => s.k === k);
  assert.deepEqual([at(0)?.row, at(1)?.row, at(2), at(3)?.row, L.folded], [0, 0, undefined, 1, 1], 'the glyph and the version beside the name; the read, which yields, folded; the whole-document count, which never does, whole on the next row');
  const first = L.slots.filter((s) => s.row === 0);
  assert.ok(Math.abs(Math.max(...first.map((s) => s.x + s.w)) - 220) < 1e-9 && Math.abs(L.name - (Math.min(...first.map((s) => s.x)) - CORNER.pad)) < 1e-9 && L.name >= 50, `the first row's items at its end, the name's room before them: ${L.name}`);
  const more = at(-2);
  assert.ok(more && more.row >= 1 && more.w > 0, `the count of those folded in the next slot: ${JSON.stringify(more)}`);
  assert.equal(L.rows, Math.max(...L.slots.map((s) => s.row + s.rows)), 'its rows every slot\'s');
  const wide = LAYER.headLayout([{ w: 400, yields: false, words: 'nothing this board will say about this address' }], 50, null, 220, pitch);
  assert.ok(wide.slots[0].row === 1 && wide.slots[0].w === 220 && wide.slots[0].rows >= 1 && wide.rows === 1 + wide.slots[0].rows, `an item wider than the head: its own row, the head's width, its words on the rows they take — ${JSON.stringify(wide)}`);
  const clause = LAYER.headLayout(items.slice(0, 1), 50, { w: 60, words: 'as last read 09:05' }, 300, pitch);
  assert.deepEqual(clause.slots.map((s) => [s.k, s.row]), [[-1, 0], [0, 0]], 'the kept clause after the name, before the items');
  assert.ok(clause.slots[0].x > clause.name && clause.slots[0].x < clause.slots[1].x, 'the clause between the name and the items');
});

/**
 * An element of a stand-in page: its classes kept, its markup's rows and the form opened beneath them read back as the
 * platform lays them out — each row by `data-row`, the form `formH` px tall — and the corner as wide as the style sets it,
 * whole or compact (P-REG's `cornerWidth`)
 */
function standIn(formH = 30) {
  const classes = new Set();
  /** @type {Map<string, any>} */
  let parts = new Map();
  let html = '';
  const part = (/** @type {string} */ key, /** @type {Record<string, string>} */ dataset = {}) => { if (!parts.has(key)) parts.set(key, { dataset, style: {}, offsetHeight: formH }); return parts.get(key); };
  const e = /** @type {any} */ ({
    className: '', id: '', dataset: {}, style: {}, children: [], tabIndex: -1, offsetHeight: 40,
    get offsetWidth() { return cornerWidth(classes.has('compact')); },
    classList: { add: (/** @type {string} */ c) => { classes.add(c); }, remove: (/** @type {string} */ c) => { classes.delete(c); }, toggle: (/** @type {string} */ c, /** @type {boolean} */ on) => { if (on ?? !classes.has(c)) classes.add(c); else classes.delete(c); }, contains: (/** @type {string} */ c) => classes.has(c) },
    setAttribute() {}, removeAttribute() {}, appendChild(/** @type {unknown} */ c) { e.children.push(c); },
    get innerHTML() { return html; }, set innerHTML(/** @type {string} */ v) { html = v; parts = new Map(); },
    querySelector: (/** @type {string} */ sel) => (sel === ':scope > .opened' && html.includes('class="opened"') ? part('opened') : null),
    querySelectorAll: (/** @type {string} */ sel) => (sel === ':scope > .hrow' ? [...html.matchAll(/class="hrow" data-row="(\d+)"/g)].map((m) => part('row' + m[1], { row: m[1] })) : []),
    getBoundingClientRect: () => ({ top: 0, left: 0, width: 0, height: 0 }), contains: () => false, remove() {},
    part: (/** @type {string} */ key) => parts.get(key),
    classes,
  });
  return e;
}

/** where a corner element stands on screen, from its transform */
const standsAt = (/** @type {any} */ el) => { const m = /translate\(([-\d.]+)px, ([-\d.]+)px\)/.exec(el.style.transform || ''); return m ? { x: Number(m[1]), y: Number(m[2]) } : null; };

/**
 * The plane's corners over a stand-in page (`standIn`): `body` run with the corner layer attached, D a draft of the
 * session's account delivered whole, the one line's bottom at `LINE_PX`, the status region keeping what it was told
 * (`said`), the viewport 1440 × 900
 * @param {(p: {said: string[]}) => void} body
 */
function onHead(body) {
  const platform = { document: globalThis.document, window: globalThis.window };
  /** @type {string[]} */
  const said = [];
  globalThis.document = /** @type {any} */ ({ createElement: () => standIn(), activeElement: null });
  globalThis.window = /** @type {any} */ ({ getSelection: () => null });
  FOCUS.attach({ live: /** @type {any} */ ({ setAttribute() {}, set textContent(/** @type {string} */ v) { said.push(v); }, get textContent() { return said[said.length - 1] ?? ''; } }) });
  try {
    REC.takeIndex(/** @type {any} */ ({ docs: [{ doc: D, kind: 'draft', label: 'd', standing: 'yours_to_read' }], counts: [{ account: '1.0.1', documents: 1 }], state: { arm: 'complete' } }));
    REC.takeDelivery(D, [{ pos: 1, width: EXTENT, kind: 'content', text: TEXT, ref: null, origin: null }]);
    REC.takeImage(D, 1, [{ iStart: D + '.0.1.1', width: EXTENT }]);
    CAM._reset(); CAM.setViewport(1440, 900);
    LAYER.attach(/** @type {any} */ ({ clientWidth: 1440, clientHeight: 900, appendChild() {} }), /** @type {any} */ (standIn()));
    LAYER.readers({ top: () => LINE_PX });
    body({ said });
  } finally { LAYER.press(false); LAYER.clear(); LAYER.readers({}); CAM._reset(); globalThis.document = platform.document; globalThis.window = platform.window; }
}
/** the one line's bottom over the stand-in page */
const LINE_PX = 30;
/** the camera at D's reading frame of a position, at the landing's em */
const landAt = (/** @type {number | null} */ pos) => { const at = LAYER.frameOf(D, pos); CAM.set(CAM.viewAt(at, at.fs)); };

test('a resize that narrows the measure frames the view across the column being read: the corner, compact beside it, stands inside the view, never left of it, the line at its height and its size (issue #436; FP-8, FP-26)', () => onHead(() => {
  const d = REC.doc(D), later = d.blocks[Math.floor(d.blocks.length * 0.4)];
  landAt(later.pos);
  LAYER.frame();
  const el = LAYER.cornerOf(D), wide = standsAt(el);
  assert.ok(wide && wide.x >= 0 && LAYER.cornerAt(D)?.head === false, `1440 px: the corner beside its column, in view — ${JSON.stringify(wide)}`);
  const box = docBox(D), line = () => { const p = placeOf(LAYER.foldOf(REC.doc(D)), later.pos); return CAM.sy(box.y + p.y) - 450; };
  const y = line(), em = CAM.cam.scale * LAYER.foldOf(REC.doc(D)).fs;
  CAM.setViewport(600, 900);
  LAYER.frame();
  const at = standsAt(LAYER.cornerOf(D)), placed = LAYER.cornerAt(D);
  assert.ok(CAM.measure() < MEASURE_CPL && placed && placed.compact && !placed.head, `600 px: a narrower measure, the corner compact beside its column — ${JSON.stringify(placed)}`);
  assert.ok(at && at.x >= 0 && at.x + cornerWidth(true) <= 600, `the corner inside the view: ${JSON.stringify(at)}`);
  assert.ok(Math.abs(line() - y) < 1e-6 && Math.abs(CAM.cam.scale * LAYER.foldOf(REC.doc(D)).fs - em) < 1e-9, 'the line at its height, at its size');
}));

test('below forty characters beside its column the corner stands at its document\'s head: across the column, inside the view below the one line, on the band its fold reserves above its first row, its first row holding the kept word in its slot; its first row held below the line as the document scrolls, the rest passing under it; a form its act opens beneath its rows; and no held label set over that document\'s text (issue #436; FP-26, FP-31, FP-37)', () => onHead(() => {
  REC.setKept(D, { word: 'kept', reason: null });
  CAM.setViewport(480, 900);
  assert.ok(CAM.fit().head, '480 px: the corner at the head');
  landAt(null);
  LAYER.frame();
  const f = LAYER.foldOf(REC.doc(D)), el = LAYER.cornerOf(D), placed = LAYER.cornerAt(D), box = docBox(D);
  assert.ok(f.band > 0 && placed && placed.head && placed.compact, `the fold reserves the head's band, the corner at the head — ${JSON.stringify(placed)}, band ${f.band}`);
  const at = /** @type {{x: number, y: number}} */ (standsAt(el)), col = f.columns[placed.column], w = parseFloat(el.style.width);
  assert.ok(Math.abs(at.x - Math.round(CAM.sx(box.x + col.x))) < 1e-9 && Math.abs(w - (col.w + EDGE * f.fs) * CAM.cam.scale) < 1e-6, `across the column, its text and its edge: x ${at.x}, ${w} px wide`);
  assert.ok(at.x >= 0 && at.x + w <= 480 && at.y >= LINE_PX, `inside the view, below the one line: ${JSON.stringify(at)}, ${w} px`);
  assert.ok(Math.abs(at.y - Math.round(CAM.sy(box.y + col.y - f.band))) <= 1, 'on the band, above the first line');
  const row0 = /** @type {string} */ (el.innerHTML).split('class="hrow" data-row="1"')[0];
  assert.ok(row0.includes('data-row="0"') && row0.includes('data-kept="kept"') && row0.includes(`>${esc(t('B3.kept'))}<`), `the kept word in its slot on the first row: ${row0.slice(0, 400)}`);
  assert.equal(LAYER.heldOf(D), null, 'no held label over the text: the head names it');
  // scrolled down past the band: the first row held below the line, over the text
  CAM.set({ ...CAM.view(), y: CAM.cam.y + 200 / CAM.cam.scale });
  LAYER.frame();
  const held = /** @type {{x: number, y: number}} */ (standsAt(LAYER.cornerOf(D)));
  assert.ok(Math.abs(held.y - (LINE_PX + 8)) <= 1 && LAYER.headClear(D) === held.y + LINE_H * f.fs * CAM.cam.scale, `held below the line, its first row what it covers: ${JSON.stringify(held)}, ${LAYER.headClear(D)}`);
  // the kept word's act opens its statement beneath the head's rows
  LAYER.openStatement(D, true);
  LAYER.frame();
  const opened = LAYER.cornerOf(D);
  assert.ok(String(opened.innerHTML).includes(`<div class="opened"`) && String(opened.innerHTML).includes(esc(t('B3.save.kept'))), 'the statement opened beneath the rows');
  assert.ok(/** @type {number} */ (LAYER.headClear(D)) > held.y + LINE_H * f.fs * CAM.cam.scale, 'what it covers runs to the form\'s foot');
  LAYER.openStatement(D, false);
}));

test('a standing corner\'s kept word is said once in the status region where it changes, beside its column and at its document\'s head alike; never at the frame it first stands, nor for a state cleared (issue #436; FP-36)', () => onHead(({ said }) => {
  for (const vw of [1440, 480]) {
    CAM.setViewport(vw, 900);
    landAt(null);
    REC.setKept(D, { word: 'kept', reason: null });
    LAYER.frame();
    const before = said.length;
    LAYER.frame();
    assert.equal(said.length, before, `${vw} px: nothing said while the word stands`);
    REC.setKept(D, { word: 'not yet kept', reason: null });
    LAYER.frame();
    assert.deepEqual(said.slice(before), [t('B3.not-yet-kept')], `${vw} px: the new word said once`);
    LAYER.frame();
    REC.setKept(D, null);
    LAYER.frame();
    assert.deepEqual(said.slice(before), [t('B3.not-yet-kept')], `${vw} px: a state cleared says nothing`);
  }
}));

test('a change of the head\'s rows changes the band its fold reserves, and the article set again re-anchors the camera on the passage being read: its line at its height and its size (issue #436; FP-8)', () => onLayer(() => {
  deliver();
  REC.takeMetadata(D, { doc: D, published: true, owner: '1.0.1', birth: D + '.1', birthExtent: EXTENT, placed: null, baseExtent: null, source: null, asOf: 1 });
  // a link to D as a whole: its count on the head's first row beside the state's glyph
  const W1 = OTHER_HOME + '.0.2.900';
  REC.takeLinks(D, [W1]);
  REC.takeLink({ addr: W1, from: [span(OTHER_HOME, 1, 1)], to: [whole(D)], type: CITE });
  CAM.setViewport(320, 900);
  assert.ok(CAM.fit().head, '320 px: the corner at the head');
  const box = docBox(D), f0 = LAYER.foldOf(REC.doc(D)), c = f0.columns[0];
  CAM.set({ x: box.x + c.x + c.w / 2, y: box.y + c.y + c.h * 0.4, scale: 17 / f0.fs });
  LAYER.frame();
  const pos = /** @type {number} */ (LAYER.posAt(D, CAM.cam.x, CAM.cam.y));
  const line = () => { const p = placeOf(LAYER.foldOf(REC.doc(D)), pos); return CAM.sy(box.y + p.y); };
  const y = line(), em = CAM.cam.scale * f0.fs;
  // the chain counted: the version statement joins the corner's items before the count, which the head's first row no longer holds
  REC.takeMembers(D, 3);
  const f = LAYER.foldOf(REC.doc(D));
  assert.ok(f.band > f0.band, `the band deeper: ${f0.band} → ${f.band}`);
  LAYER.frame();
  assert.ok(Math.abs(line() - y) < 1e-6, `the passage's line at its height: ${y} → ${line()}`);
  assert.ok(Math.abs(CAM.cam.scale * f.fs - em) < 1e-9, 'at its size on screen');
}, 320, 900));

/** the one line's bottom the layer's readers give, as a test sets it: one row of the line, then three */
const lineAt = { top: 25 };
/** the readers with the one line's bottom at `lineAt.top` */
const rowsOfLine = () => LAYER.readers({ selection: () => null, focus: () => null, top: () => lineAt.top, handOff: () => {}, navigated: () => null });
/** a world height's distance from the visible view's centre, on screen, with the camera at a view and the one line's bottom at `top` */
const fromCentre = (/** @type {number} */ y, /** @type {{y: number, scale: number}} */ view, /** @type {number} */ top) => (y - view.y) * view.scale + VH / 2 - (top + VH) / 2;

test('a view read below one bottom of the one line and returned to below another — the line having taken rows — lands its line at the height it stood from the visible view\'s centre (issue #310; FP-8, FP-25)', () => onLayer(() => {
  lineAt.top = 25;
  rowsOfLine();
  deliver();
  const box = docBox(D), f0 = LAYER.foldOf(REC.doc(D)), c = f0.columns[6];
  CAM.set({ x: box.x + c.x + c.w / 2, y: box.y + c.y + c.h * 0.4, scale: 12 / f0.fs });
  LAYER.frame();
  const view = CAM.view(), r = /** @type {import('./layer.js').Reading} */ (LAYER.readAt(view));
  assert.ok(r && r.addr === D && r.top === 25, 'the view reads D below one row of the line');
  const was = fromCentre(box.y + placeOf(f0, r.pos).y, view, 25);
  lineAt.top = 61;
  const v = /** @type {{x: number, y: number, scale: number}} */ (LAYER.keptAt(view, r, r.pos));
  const now = fromCentre(box.y + placeOf(LAYER.foldOf(REC.doc(D)), r.pos).y, v, 61);
  assert.ok(Math.abs(now - was) < 1e-6 && v.scale === view.scale, `below three rows: the line at the height it stood from the visible centre — ${was} → ${now}`);
}, 1440, 900));

test('an article set again while the one line has taken rows keeps the passage the reader last saw at the visible view\'s centre at its height from that centre as it stands now (issue #310; FP-8)', () => onLayer(() => {
  lineAt.top = 25;
  rowsOfLine();
  deliver();
  const box = docBox(D), f0 = LAYER.foldOf(REC.doc(D)), c = f0.columns[6];
  CAM.set({ x: box.x + c.x + c.w / 2, y: box.y + c.y + c.h * 0.4, scale: 12 / f0.fs });
  LAYER.frame();
  // the passage at the visible centre below one row of the line, and its line's height from that centre
  const centre = CAM.cam.y + 25 / (2 * CAM.cam.scale), pos = /** @type {number} */ (LAYER.posAt(D, CAM.cam.x, centre));
  const was = fromCentre(box.y + placeOf(f0, pos).y, CAM.view(), 25);
  // the line takes two rows more as the article goes stale: a reveal re-breaks it
  lineAt.top = 61;
  LK.reveal(D, 2); LAYER.bump();
  LAYER.frame();
  const f = LAYER.foldOf(REC.doc(D)), now = fromCentre(box.y + placeOf(f, pos).y, CAM.view(), 61);
  assert.ok(placeOf(f, pos).column !== placeOf(f0, pos).column || Math.abs(placeOf(f, pos).y - placeOf(f0, pos).y) > f0.fs, 'the reveal re-breaks the article: the passage moves in its room');
  assert.ok(Math.abs(now - was) < 1e-6, `the passage at the height it stood from the visible centre, below three rows now — ${was} → ${now}`);
  LK.hide(D);
}, 1440, 900));

test('a view read under one fit and returned to under another lands framed across the column its line stands in, at the em it was read at, the line at its height; returned to under the same fit, where it stood (issue #436; FP-8, FP-25)', () => onLayer(() => {
  deliver();
  const box = docBox(D), f0 = LAYER.foldOf(REC.doc(D)), c = f0.columns[6];
  CAM.set({ x: box.x + c.x + c.w / 2 + 40 / (12 / f0.fs), y: box.y + c.y + c.h * 0.4, scale: 12 / f0.fs });
  const view = CAM.view(), r = /** @type {import('./layer.js').Reading} */ (LAYER.readAt(view));
  assert.ok(r && r.addr === D, 'the view reads D');
  assert.deepEqual(LAYER.keptAt(view, r, r.pos), view, 'the same fit: the view where it stood');
  CAM.setViewport(600, 900);
  const v = /** @type {{x: number, y: number, scale: number}} */ (LAYER.keptAt(view, r, r.pos)), f = LAYER.foldOf(REC.doc(D)), em = view.scale * f0.fs;
  assert.ok(f.cpl < MEASURE_CPL && Math.abs(v.scale * f.fs - em) < 1e-9, `600 px: a narrower measure, the em it was read at — ${v.scale * f.fs}`);
  assert.ok(Math.abs(v.x - LAYER.frameOf(D, r.pos, em).x) < 1e-6, 'its centre framed across the line\'s column');
  const p0 = placeOf(f0, r.pos), p = placeOf(f, r.pos);
  assert.ok(Math.abs((box.y + p.y - v.y) * v.scale - (box.y + p0.y - view.y) * view.scale) < 1e-6, 'the line at its height from the view\'s centre');
}, 1440, 900));
