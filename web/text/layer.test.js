// T-LAYER's test: the fold a document is set in once its text has arrived
// (`foldOf`) — every document at the measure, in columns inside its room; its
// size the step that holds the article carrying the most any reveal can set
// in it, so at every stage, toggle and lens its size stands and its columns
// stay inside the room, however the model moves between them (issue #15); an
// article whose own lines hold the standard grid hidden but not with its
// symbols set at the step past it from the first, so no reveal re-sets it (a
// fold of the hidden lines alone turns red); another's links arriving folding
// it again; a count arriving at the hidden reveal setting no line, every line
// and column as it stood (issue #151; a fold that sets the count turns red).
// Where a passage stands and is read back — a reading view centred
// on a position's line in its column, the position under a point, the outline
// the plane draws — and the paging key's next column at reading scale. THE
// CORNER (issue #151's design decision): beside the column nearest the view's
// centre — the strip's room beside a row's first column, the gutter and the
// edge before it beside a later one — whole where its room holds it, compact
// where it holds the compact corner alone, by its row's first column where it
// holds neither or the signs there leave it none (a mutant that keeps it by
// the first column, or squeezes it whole into a gutter, turns red); held below
// the one line, never past its foot, stacked below the signs it would meet. A
// reading view frames its column with both its margins centred together (a
// view on the column's middle alone turns red). THE MEASURE IN FORCE: the full
// measure at 1440 px, 39 characters at 480, and a resize that moves it sets
// the article being read again with the line under the view's centre kept in
// place, at its size, a zoom moving neither (a frame that re-sets without the
// hold, or a fold keyed on the scale, turns red). A
// document's REGION (issue #141): its outline's bounds widened leftward by its
// corner's strip, ending where its neighbour's begins; the document in view
// while that region meets the visible view below the one line — the corner's
// strip alone in view among it — and the view's window over it read over that
// visible view (a region of the outline alone, or a view that takes in what
// stands under the one line, turns red). THE
// PASSAGE IN VIEW KEEPS ITS PLACE: a reveal that re-breaks the article while a
// later column is read leaves the line under the view's centre where it stood
// on screen, at its size (a frame that rebuilds without re-anchoring turns
// red), and a feed row's take-down holds it until the article stands again.
// ONE ARTICLE A BOX (issue #154's design decision): of a document and its
// version, both texts held, the article of the version the box shows stands
// alone, and the box taking the other takes it down and stands the other (a
// frame that mounts every held text, or keeps the version left standing,
// turns red); the line being read keeps its place as the box takes the other
// version — the line holding the position the move names standing where the
// line it left stood, the scale by the ratio of the two folds' sizes (a
// frame that sets the version taken with no hold, or holds by the position
// alone, turns red) — and held across one version, at once. AN EDIT ABOVE
// THE VIEW (issue #160): a document taken down for a feed row and set again
// keeps the line the reader read on the same words, carried by their identity
// through the image its article was made from (a frame that holds the
// position turns red); where the text comes before its image, held by its
// position until the image's arrival sets it again, a camera the reader moved
// meanwhile standing where they left it (a frame with no such hold, or one
// that pulls back a camera the reader moved, turns red).
// Then WHAT STANDS (`frame`; issue #122's design decision), on a page of
// stand-ins over a field of an account's 48 documents, every one at the
// standard size: at the readable em every document in view stands in the one
// frame, more than the limit (a ceiling on what stands turns red); below it at
// most the limit mounts afresh in a frame — the one holding the page's
// selection, the walk's focused one and the place just navigated to first,
// though last in the model's order, then the rest in the model's order, long
// documents and short notes of one size alike — none taken down or set again,
// and the frames after mount the rest (a cap that never mounts the rest, an
// order that leaves the first last, or one by length, turns red); the limit's
// order itself, the largest em first after the first, equal ems in the order
// given (one by length, or that drops the first, turns red); a document
// stands by line — at a fresh mount exactly the lines meeting the view,
// padded, and a pan standing the lines entering in parts of their own, taking
// down the parts that left and setting no standing part again (a whole
// article, or a part set again to take a line, turns red); the stretch of a
// span the parts standing hold, which the arrival mark outlines — from the
// first position of it a part standing holds to the last, a withheld run's
// part holding the run whole (issue #152: one that answers the span whole, or
// nothing, wherever a line of it stands in no part, turns red); every line of the
// page's selection that stood stands through a pan and a zoom to em 5, no part
// standing then that holds none of them, and goes with it, and its first and
// last lines stand wherever the view is (one that holds no line, standing the
// selection's ends alone, turns red); an article standing keeps its place down to 5.5 (one
// that asks 6.5 of it turns red); a stale article is set again in its place,
// whatever the limit, never dropped; and while a press stands no standing
// article is set again, but the documents a pan brings in at the readable em
// stand (one that mounts nothing under a press turns red), the first frame
// after it setting again what went stale.
// And the owner a withheld run names, on the plane's mounted article and in
// a reading scene's pane alike: its origin's, by the one rule the byline's
// owner is found by, whoever owns the document windowing it (a view that
// hands the article's owner back turns red).
// And what an article was made from, on the plane and in a reading scene's
// pane alike: its document's blocks and runs as the model held them, kept
// through a feed row naming the document and a delivery of other text, so its
// positions are mapped and its bytes copied through the text it shows (a pane
// whose article keeps nothing, or a record that answers the model's newest,
// turns red).
// And the camera's zoom-in bound, which every size read here reaches: a
// residue member of two thousand one-line paragraphs, its columns filling its
// room three steps past the standard, is read at reading scale (a size that
// leaves the bound at its place's turns red), and a feed row dropping its
// text, its size its place's standard again, takes no scale from under its
// reader (a bound set from the latest size turns red).
import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import * as REC from '../model/records.js';
import * as LK from '../links/links.js';
import * as LAYER from './layer.js';
import * as CAM from '../plane/camera.js';
import { layoutOf, fold, placeOf, padded, windowIn, standardFs, columnW, columnOfLine, STANDARD_GRID, MEASURE_CPL, COLUMN_W, GUTTER, EDGE } from '../plane/layout.js';
import { CORNER, cornerWidth } from '../plane/register.js';
import { docBox, intersects, depthOfDoc, clearLeftOf, DOC_CELL_W, DEPTH_SOUND } from '../plane/projection.js';
import { MOUNTS_PER_FRAME } from '../plane/lod.js';
import { t } from '../strings.js';
import { esc } from '../util.js';

/** @typedef {import('../plane/layout.js').Fold} Fold */

const D = '1.0.1.0.3', FAR = '1.0.1.0.127', OTHER_HOME = '1.0.2.0.5', CITE = '1.1.0.1.0.1.0.3.13';
/** links per paragraph: their symbols take the article past the standard grid */
const PER_BLOCK = 10;
const span = (/** @type {string} */ doc, /** @type {number} */ ord, /** @type {number} */ w) => ({ start: `${doc}.0.1.${ord}`, width: '0.0.0.0.0.0.0.' + w, doc, account: doc.split('.').slice(0, 3).join('.'), whole: false, subspace: 1, ordinal: ord, positions: w });
const whole = (/** @type {string} */ doc) => ({ start: doc, width: '0.0.0.0.1', doc, account: doc.split('.').slice(0, 3).join('.'), whole: true, subspace: null, ordinal: null, positions: null });
/** a paragraph of `n` words of two to nine characters, varied by `seed` */
const words = (/** @type {number} */ n, /** @type {number} */ seed) => Array.from({ length: n }, (_, i) => 'abcdefghij'.slice(0, 2 + ((i * 7 + seed) % 8))).join(' ');
/** ninety-six paragraphs: eleven columns hidden, past the standard grid's twelve with its links' symbols */
const TEXT = Array.from({ length: 96 }, (_, i) => words(30, i)).join('\n\n');
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

// ---- the corner beside the column nearest the view's centre; the reading view's frame (issue #151) -----------------

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

test('a reading view frames its column with both its margins: the corner on its left in the form its room holds at the reading size, the edge on its right, the three centred in the view together (issue #151: "The landing frames the column, not the middle of a line")', () => {
  deliver();
  CAM._reset(); CAM.setViewport(1440, 900);
  try {
    const d = REC.doc(D), f = LAYER.foldOf(d), box = docBox(D), fs = f.fs;
    const inThird = d.blocks.find((b) => placeOf(f, b.pos).column === 2);
    assert.ok(inThird, 'a block opening in the third column');
    /** @type {Array<[number | null, number, number, string]>} a position, its column, the corner's width beside it, what stands there */
    const cases = [[null, 0, cornerWidth(false), 'no position: the first column, the strip holding the corner whole'], [/** @type {NonNullable<typeof inThird>} */ (inThird).pos, 2, cornerWidth(true), 'the third column: the gutter holding the corner compact']];
    for (const [pos, i, corner, what] of cases) {
      CAM.set(CAM.viewAt(LAYER.frameOf(D, pos), fs));
      const c = f.columns[i], left = CAM.sx(box.x + c.x) - CORNER.gap - corner, right = CAM.sx(box.x + c.x + c.w) + EDGE * 12.5;
      assert.ok(Math.abs((left + right) / 2 - 720) < 1e-6, `${what}: the corner, the column and its edge centred together — ${left} … ${right}`);
      assert.ok(left >= 0 && right <= 1440 && Math.abs(CAM.cam.scale * fs - 12.5) < 1e-9, `${what}: all in view, at the reading size`);
      assert.equal(LAYER.frameOf(D, pos).y, LAYER.centreOf(D, pos).y, `${what}: on the line holding it`);
    }
  } finally { CAM._reset(); }
});

test('the measure in force: every document folded at what the view holds — the full measure at 1440 px, 39 characters at 480 — and a resize that moves it sets again the article being read, the line under the view\'s centre kept where it stood in the view, at its size; never a zoom (issue #151; FP-26)', () => onLayer(() => {
  deliver();
  const box = docBox(D), f0 = LAYER.foldOf(REC.doc(D));
  assert.equal(f0.cpl, MEASURE_CPL, '1440 px: the full measure');
  const c = f0.columns[4];
  CAM.set({ x: box.x + c.x + c.w / 2, y: box.y + c.y + c.h * 0.4, scale: 12 / f0.fs });
  LAYER.frame();
  assert.ok(LAYER.isMounted(D), 'read at em 12');
  const pos = /** @type {number} */ (LAYER.posAt(D, CAM.cam.x, CAM.cam.y));
  /** where the line holding `pos` stands on screen, from the view's centre, in the fold the document is set in now */
  const fromCentre = () => { const p = placeOf(LAYER.foldOf(REC.doc(D)), pos), { VW, VH } = CAM.viewport(); return { x: CAM.sx(box.x + p.x) - VW / 2, y: CAM.sy(box.y + p.y) - VH / 2 }; };
  const was = fromCentre(), em = CAM.cam.scale * f0.fs;
  for (const [w, cpl] of /** @type {Array<[number, number]>} */ ([[480, 39], [1440, MEASURE_CPL]])) {
    CAM.setViewport(w, 900);
    LAYER.frame();
    const f = LAYER.foldOf(REC.doc(D)), now = fromCentre();
    assert.ok(f.cpl === cpl && f.columns.every((k) => Math.abs(k.w - columnW(cpl) * f.fs) < 1e-6) && f.lines.every((l) => l.w <= cpl + 1e-9), `${w} px: every column and line at ${cpl} characters`);
    assert.ok(Math.abs(now.x - was.x) < 1e-6 && Math.abs(now.y - was.y) < 1e-6, `${w} px: the line where it stood in the view, from its centre — ${JSON.stringify(was)} → ${JSON.stringify(now)}`);
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
 * sets the lines P-LAY predicts, its articles' HTML whole and their parts the runs of lines that stand.
 */
function onLayer(/** @type {(held: Set<unknown>) => void} */ body, w = VW, h = VH) {
  const platform = { document: globalThis.document, window: globalThis.window };
  /** @type {Set<unknown>} */
  const held = new Set();
  const element = () => {
    /** @type {{className: string, innerHTML: string, dataset: object, style: object, children: unknown[], classList: {toggle(): void}, setAttribute(): void, appendChild(c: unknown): void, querySelectorAll(): unknown[], getBoundingClientRect(): object, remove(): void}} */
    const e = {
      className: '', innerHTML: '', dataset: {}, style: {}, children: [], classList: { toggle() {} }, setAttribute() {},
      appendChild(c) { e.children.push(c); },
      querySelectorAll: () => [], getBoundingClientRect: () => ({ top: 0, left: 0, width: 0, height: 0 }),
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

test('a reveal that re-breaks the article while a later column is read leaves the line under the view\'s centre where it stood on screen, at its size; a feed row\'s take-down holds it until the article stands again', () => onLayer(() => {
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
  // a feed row naming the document drops its text and its links: the article is taken down, and the passage under the
  // view's centre — its line's position in the fold it stands in now — held until it stands again, in the size its text
  // sets without those links
  const under = /** @type {number} */ (LAYER.posAt(D, CAM.cam.x, CAM.cam.y)), held = screen(under);
  REC.invalidate(D);
  LAYER.frame();
  assert.ok(!LAYER.isMounted(D), 'taken down while its text is read anew');
  REC.takeSpanSet(D, [{ subspace: 1, ordinal: 1, positions: EXTENT }]);
  REC.takeDelivery(D, [{ pos: 1, width: EXTENT, kind: 'content', text: TEXT, ref: null, origin: null }]);
  REC.takeImage(D, 1, [{ iStart: D + '.0.1.1', width: EXTENT }]);
  const reset = LAYER.foldOf(REC.doc(D));
  assert.ok(reset.step === 0 && reset.fs > f0.fs, 'its links unread, it is set at the standard size: a re-set');
  LAYER.frame();
  assert.ok(LAYER.isMounted(D), 'standing again');
  const back = screen(under);
  assert.ok(Math.abs(back.x - held.x) < 1e-6 && Math.abs(back.y - held.y) < 1e-6, `the passage where it stood: ${JSON.stringify(held)} → ${JSON.stringify(back)}`);
  assert.ok(Math.abs(CAM.cam.scale * reset.fs - scale * f0.fs) < 1e-9, 'at its size on screen: the scale by the ratio of its sizes');
}, 1440, 900));

// ---- one article a box (issue #154's design decision: "The box shows one version") -----------------------------------

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

// ---- an edit above the view (issue #160; FP-8, FP-23) ------------------------------------------------------------------

/** D's text with the prologue set before it, its bytes minted after the old text's: every old byte stands SHIFT later, its identity kept */
const EDITED_IMAGE = [{ iStart: `${D}.0.1.${EXTENT + 1}`, width: SHIFT }, { iStart: D + '.0.1.1', width: EXTENT }];
/** D's edited text delivered whole — its image with it, or after it */
function deliverEdited(withImage = true) {
  const n = new TextEncoder().encode(TEXT2).length;
  REC.takeSpanSet(D, [{ subspace: 1, ordinal: 1, positions: n }]);
  REC.takeDelivery(D, [{ pos: 1, width: n, kind: 'content', text: TEXT2, ref: null, origin: null }]);
  if (withImage) REC.takeImage(D, 1, EDITED_IMAGE);
}
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

test('a document edited above the view, taken down for the feed row and set again, keeps the line the reader read on the same words, never the same position: the passage\'s bytes carried by their identity through the image its article was made from into the text set again (issue #160)', () => onLayer(() => {
  const { pos, screen } = readLater();
  const was = screen(pos);
  REC.invalidate(D);
  LAYER.frame();
  assert.ok(!LAYER.isMounted(D), 'taken down while its text is read anew');
  deliverEdited();
  assert.equal(REC.textBetween(D, pos + SHIFT, pos + SHIFT + 12), TEXT.slice(pos - 1, pos + 11), 'the words the reader read stand SHIFT later in the edited text');
  LAYER.frame();
  assert.ok(LAYER.isMounted(D), 'standing again');
  assert.ok(together(screen(pos + SHIFT), was), `the same words' line where it stood: ${JSON.stringify(was)} → ${JSON.stringify(screen(pos + SHIFT))}`);
  assert.ok(Math.abs(screen(pos).y - was.y) > 1, 'never the same position\'s line, which holds other words now');
}, 1440, 900));

test('where the edited text comes before its image, the line is held by its position until the image arrives, the re-set the image makes then standing the same words\' line where the reader read it; a camera the reader moved meanwhile stands as they left it (issue #160)', () => onLayer(() => {
  const { pos, screen } = readLater();
  const was = screen(pos);
  REC.invalidate(D);
  LAYER.frame();
  deliverEdited(false);
  LAYER.frame();
  assert.ok(LAYER.isMounted(D) && together(screen(pos), was), 'set again from its text alone: by position for now, no image placing its bytes');
  REC.takeImage(D, 1, EDITED_IMAGE);
  LAYER.frame();
  assert.ok(together(screen(pos + SHIFT), was), `the image arrived: the same words' line where the reader read it — ${JSON.stringify(was)} → ${JSON.stringify(screen(pos + SHIFT))}`);
  // edited above the view again, its text first; the reader pans before its image arrives
  const lead = 'Another line set first.\n\n', more = new TextEncoder().encode(lead).length, n = new TextEncoder().encode(lead + TEXT2).length;
  REC.invalidate(D);
  LAYER.frame();
  REC.takeSpanSet(D, [{ subspace: 1, ordinal: 1, positions: n }]);
  REC.takeDelivery(D, [{ pos: 1, width: n, kind: 'content', text: lead + TEXT2, ref: null, origin: null }]);
  LAYER.frame();
  CAM.set({ ...CAM.view(), y: CAM.cam.y + 40 / CAM.cam.scale });
  const panned = CAM.view();
  LAYER.frame();
  REC.takeImage(D, 1, [{ iStart: `${D}.0.1.${EXTENT + SHIFT + 1}`, width: more }, ...EDITED_IMAGE]);
  LAYER.frame();
  assert.deepEqual(CAM.view(), panned, 'the reader moved the camera before the image arrived: it stands where they left it, never pulled back to the words');
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

test('a guest meets a withheld run named for its origin\'s owner, whoever owns the document windowing it: on the plane\'s mounted article and in a reading scene\'s pane alike — in its gap\'s face where the gap holds it (issue #151)', () => onLayer(() => {
  const O = '1.0.2.0.2', text = 'Tumbler.\n\n', width = 12 * 66, n = new TextEncoder().encode(text).length;
  REC.setSession(null);
  REC.takeSpanSet(D, [{ subspace: 1, ordinal: 1, positions: n + width }]);
  REC.takeDelivery(D, [{ pos: 1, width: n, kind: 'content', text, ref: null, origin: null }, { pos: n + 1, width, kind: 'withheld', text: '', ref: null, origin: O }]);
  const d = REC.doc(D);
  assert.equal(LAYER.ownerAccount(d), '1.0.1', 'the first edition is 1.0.1\'s');
  const at = LAYER.centreOf(D, null);
  CAM.set({ x: at.x, y: at.y, scale: 12 / LAYER.foldOf(d).fs });
  LAYER.frame();
  const rec = LAYER.mountedSet().get(D);
  assert.ok(rec, 'at em 12 its article stands on the plane');
  const head = esc(t('B1.withheld-run', { owner: '1.0.2', account: '1.0.2', width, origin: O }));
  const arm = (/** @type {string} */ owner) => esc(t('R56.key-absent', { owner }));
  /** @type {Array<[string, string]>} */
  const met = [['on the plane', String(/** @type {any} */ (rec.el).children[0].innerHTML)], ['in a pane', String(LAYER.sceneArticle(d).innerHTML)]];
  for (const [where, html] of met) {
    assert.ok(html.includes(`<span class="wh-head">${head}</span><span class="arm">${arm('1.0.2')}</span>`), `${where}: the head and R56's key-absent arm name 1.0.2, the owner of the run's origin`);
    assert.ok(!html.includes(arm('1.0.1')), `${where}: no arm names 1.0.1, the owner of the document windowing the run`);
  }
}, 1440, 900));

// ---- what an article was made from -------------------------------------------------------------------------------------

test('an article keeps what it was made from — its document\'s blocks, runs and image as the model held them — through a feed row and a new delivery: a reading scene\'s pane\'s as a mounted one\'s', () => onLayer(() => {
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
  // a feed row naming the document drops what the model held of it; its reads deliver other text
  REC.invalidate(D);
  const edited = 'Tumbler.\n\nAnother passage now.', m = new TextEncoder().encode(edited).length;
  REC.takeSpanSet(D, [{ subspace: 1, ordinal: 1, positions: m }]);
  REC.takeDelivery(D, [{ pos: 1, width: m, kind: 'content', text: edited, ref: null, origin: null }]);
  assert.equal(REC.textBetween(D, 11, 22), 'Another pas', 'the model holds the new text');
  for (const [where, el] of made) {
    const kept = LAYER.madeOf(el);
    assert.ok(kept && kept.blocks === blocks && kept.runs === runs && kept.image === image, `${where}: the article's own blocks, runs and image, never the model's newest`);
    assert.equal(kept && REC.textOf(kept.runs, 11, 22), 'The passage', `${where}: its bytes are the text it shows`);
  }
  assert.equal(LAYER.madeOf(/** @type {any} */ ({ dataset: { addr: D } })), null, 'an element that is neither a mounted article nor a pane\'s was made from nothing');
}, 1440, 900));

// ---- the zoom-in bound -------------------------------------------------------------------------------------------------

test('a document set smaller than its place\'s standard raises the zoom-in bound to read it, and no size read after lowers it: a feed row dropping the document\'s text takes no scale from under its reader', () => {
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
  REC.invalidate(RES);
  assert.ok(LAYER.foldOf(REC.doc(RES)).fs > 2.5 * fs, 'a feed row drops its text: its size its place\'s standard again until the text is read anew');
  CAM.panBy(1, 0);
  assert.equal(CAM.view().scale, reading.scale, 'the next pan keeps its reader\'s scale');
  CAM._reset();
});
