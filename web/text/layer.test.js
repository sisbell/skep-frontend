// T-LAYER's test: the fold a document is set in once its text has arrived
// (`foldOf`) — every document at the measure, in columns inside its room; its
// size the step that holds the article carrying the most any reveal can set
// in it, so at every stage, toggle and lens its size stands and its columns
// stay inside the room, however the model moves between them (issue #15); an
// article whose own lines hold the standard grid hidden but not with its
// symbols set at the step past it from the first, so no reveal re-sets it (a
// fold of the hidden lines alone turns red); another's links arriving folding
// it again. Where a passage stands and is read back — a reading view centred
// on a position's line in its column, the position under a point, the outline
// the plane draws — and the paging key's next column at reading scale. THE
// PASSAGE IN VIEW KEEPS ITS PLACE: a reveal that re-breaks the article while a
// later column is read leaves the line under the view's centre where it stood
// on screen, at its size (a frame that rebuilds without re-anchoring turns
// red), and a feed row's take-down holds it until the article stands again.
// Then THE CAP (`frame`), on a page of stand-ins over a field of an account's
// 48 documents a line each, every one at the standard size, the viewport wide
// enough to hold fifteen of their first columns at em 7: never more than eight
// articles stand, and eight while more of the field is in view, through a pan
// across it and back — each pan taking down only what left the view and every
// other article standing on its own element (a mutant that caps the mounts
// alone turns red at nine; one that chooses the eight by the model's order
// trades equals and turns red); an article standing keeps its place down to
// 5.5 (one that asks 6.5 of it turns red); a larger size takes the place of
// the smallest standing; the walk's focused document stands first among equal
// sizes, its leaving trading nothing back (one that ranks it with the rest
// turns red); a stale article is rebuilt in its
// place — after a trade, and in the hysteresis band — never dropped (one that
// chooses after the rebuild turns red); and while a press stands nothing is
// mounted or taken down for the cap, what leaves the view apart (one that
// chooses under the press turns red).
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
import { layoutOf, fold, placeOf, padded, standardFs, STANDARD_GRID, MEASURE_CPL, COLUMN_W, GUTTER } from '../plane/layout.js';
import { docBox, intersects, depthOfDoc, DOC_CELL_W, DEPTH_SOUND } from '../plane/projection.js';
import { MAX_MOUNTED, MOUNT_EM } from '../plane/lod.js';
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

// ---- the cap -----------------------------------------------------------------------------------------------------------

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
/** the viewport the cap is held on: five of the field's columns across and three rows down hold their first columns at em 7 */
const VW = 5200, VH = 3600;
/** the camera over the field's middle — document 25's first column, `dx` columns across — a line's size at `em` px */
function view(/** @type {number} */ em, dx = 0) {
  const at = LAYER.centreOf(nth(25), null);
  CAM.set({ x: at.x + dx * DOC_CELL_W, y: at.y, scale: em / faceOf(16) });
}
/** the field's documents whose outlines meet the world the layer mounts in: the viewport, 40 px about it */
const inView = () => { const v = CAM.viewportWorld(40); return ALL.filter((k) => intersects(LAYER.shapeOf(nth(k)), v)); };
/** a frame, the walk's focus on document `focus`: the documents whose articles stand after it */
function frame(/** @type {number | null} */ focus = null) {
  LAYER.frame((addr) => focus != null && addr === nth(focus));
  return LAYER.mountedAddrs().map((a) => Number(a.split('.').pop())).sort((x, y) => x - y);
}
/** the element each standing article stands on, by document */
const elements = () => new Map([...LAYER.mountedSet()].map(([a, rec]) => [a, rec.el]));
/** of the articles that stood, the ones standing still on the element they stood on */
const unmoved = (/** @type {Map<string, unknown>} */ before) => [...before].filter(([a, el]) => LAYER.mountedSet().get(a)?.el === el).map(([a]) => a);

/**
 * The test run on the text layer over a page of stand-ins — its element `w` × `h` px, which holds what the layer
 * mounts (`held`), and the platform's selection on nothing — then every article taken down and the platform's
 * `document` and `window` put back. The stand-ins lay nothing out: the layer sets the lines P-LAY predicts, in one
 * column.
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
  try { body(held); } finally { LAYER.press(false); LAYER.clear(); globalThis.document = platform.document; globalThis.window = platform.window; }
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

test('never more than eight articles stand, and eight while more qualify, through a pan across the field and back: each pan takes down only what left the view, every other article standing on its own element', () => onLayer((held) => {
  note(ALL);
  assert.ok(ALL.every((k) => faceOf(k) === faceOf(16)), 'the field is one size: every document ties');
  view(7);
  const seen0 = inView();
  assert.ok(seen0.length > MAX_MOUNTED, `at em 7, ${seen0.length} of the field in view`);
  assert.deepEqual(frame(), seen0.slice(0, MAX_MOUNTED), 'the first eight in view, in the model\'s order');
  for (const dx of [1, 0, -1, 0, 2, 1, 0]) {
    const before = elements();
    view(7, dx);
    const now = frame(), seen = inView();
    const left = [...before.keys()].filter((a) => !seen.includes(Number(a.split('.').pop())));
    assert.ok(seen.length > MAX_MOUNTED, `${dx} across: more of the field in view than the cap`);
    assert.equal(now.length, MAX_MOUNTED, `${dx} across: eight articles stand, never more`);
    assert.equal(held.size, MAX_MOUNTED, `${dx} across: the layer holds their eight elements and no other`);
    assert.ok(now.every((k) => seen.includes(k)), `${dx} across: each in view`);
    assert.deepEqual(unmoved(before), [...before.keys()].filter((a) => !left.includes(a)), `${dx} across: none taken down or rebuilt but what left the view`);
  }
}));

test('an article standing keeps its place down to 5.5; a document holding none takes a place from 6.5', () => onLayer(() => {
  note(ALL);
  view(7);
  const eight = frame();
  view(6);
  assert.ok(inView().length > MAX_MOUNTED, 'em 6: more of the field in view than the cap');
  assert.deepEqual(frame(), eight, 'em 6 from above: the eight stand');
  view(5);
  assert.deepEqual(frame(), [], 'em 5: below 5.5, none stands');
  view(6);
  assert.deepEqual(frame(), [], 'em 6 from below: none takes a place below 6.5');
  view(6.6);
  assert.equal(frame().length, MAX_MOUNTED, 'em 6.6 from below: eight take their places');
}));

test('a larger size takes the place of the smallest article standing', () => onLayer((held) => {
  note([16, 17, 18, 19, 20, 23, 24]);
  give(25, Array.from({ length: 500 }, (_, i) => `Line ${i} of a longer document, which its room sets smaller.`).join('\n\n'));
  assert.ok(faceOf(25) < faceOf(16), 'the longer document, its columns past the standard grid, is set smaller than a line');
  view((6.8 * faceOf(16)) / faceOf(25));
  assert.ok(faceOf(25) * CAM.cam.scale >= MOUNT_EM, 'the longer document at em 6.8: it takes a place');
  const eight = frame();
  assert.deepEqual(eight, [16, 17, 18, 19, 20, 23, 24, 25], 'the eight delivered in view stand');
  const before = elements();
  note([26]);
  assert.ok(inView().includes(26), 'the line arriving stands in view');
  assert.deepEqual(frame(), [16, 17, 18, 19, 20, 23, 24, 26], 'a line arriving in view takes the longer document\'s place');
  assert.equal(held.size, MAX_MOUNTED);
  assert.deepEqual(unmoved(before), [16, 17, 18, 19, 20, 23, 24].map(nth), 'the other seven stand as they stood');
}, 9000, 6000));

test('among equal sizes the walk\'s focused document takes a place first, and its leaving trades nothing back', () => onLayer(() => {
  note(ALL);
  view(7);
  const eight = frame();
  const past = inView().find((k) => !eight.includes(k));
  assert.ok(past != null, 'a document in view, past the cap');
  const before = elements();
  const focused = frame(past);
  assert.ok(focused.includes(/** @type {number} */ (past)), 'focused, it stands: its corner the plane\'s next Tab stop (K-57)');
  assert.equal(focused.length, MAX_MOUNTED, 'eight stand');
  assert.equal(unmoved(before).length, MAX_MOUNTED - 1, 'one article gave up its place, the other seven stand as they stood');
  const after = elements();
  assert.deepEqual(frame(), focused, 'the focus gone: the eight stand as they are');
  assert.equal(unmoved(after).length, MAX_MOUNTED, 'none rebuilt');
}));

test('a stale article is rebuilt in its place — after a trade the model\'s order would undo, and in the hysteresis band — never dropped', () => onLayer(() => {
  note(ALL);
  view(7); frame();
  view(7, 1); frame();
  view(7);
  const traded = frame();
  assert.notDeepEqual(traded, inView().slice(0, MAX_MOUNTED), 'the eight standing are not the first eight in view by the model\'s order');
  let before = elements();
  LAYER.bump();
  assert.deepEqual(frame(), traded, 'a reveal\'s bump: the same eight stand');
  assert.deepEqual(unmoved(before), [], 'each rebuilt, on an element of its own');
  view(6);
  assert.deepEqual(frame(), traded, 'em 6: the eight stand');
  before = elements();
  LAYER.bump();
  assert.deepEqual(frame(), traded, 'em 6, a reveal\'s bump: the eight are rebuilt where they stand');
  assert.deepEqual(unmoved(before), [], 'each on an element of its own');
  before = elements();
  const one = traded[0];
  give(one, `Note ${one}, delivered again.`);
  assert.deepEqual(frame(), traded, 'em 6, a delivery to one of them: the eight stand');
  assert.deepEqual(unmoved(before), [...before.keys()].filter((a) => a !== nth(one)), 'that one rebuilt, the others as they stood');
}));

test('while a press stands nothing is mounted or taken down for the cap, what leaves the view apart; the first frame after it does what was held', () => onLayer((held) => {
  note(ALL);
  view(7);
  const eight = frame();
  const past = /** @type {number} */ (inView().find((k) => !eight.includes(k)));
  const before = elements();
  LAYER.press(true);
  assert.deepEqual(frame(past), eight, `the focus on document ${past} under the press: the eight stand`);
  assert.equal(unmoved(before).length, MAX_MOUNTED, 'none rebuilt');
  view(7, 1);
  const during = frame(past);
  assert.deepEqual(during, eight.filter((k) => inView().includes(k)), 'a pan under the press: what left the view is taken down, nothing mounted');
  assert.equal(held.size, during.length);
  LAYER.press(false);
  const after = frame(past);
  assert.equal(after.length, MAX_MOUNTED, 'the press ended: eight stand');
  assert.ok(after.includes(past) || !inView().includes(past), 'the focused document among them, where it stands in view');
}));

// ---- the owner a withheld run names ------------------------------------------------------------------------------------

test('a guest meets a withheld run named for its origin\'s owner, whoever owns the document windowing it: on the plane\'s mounted article and in a reading scene\'s pane alike', () => onLayer(() => {
  const O = '1.0.2.0.2', text = 'Tumbler.\n\n', width = 240, n = new TextEncoder().encode(text).length;
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

test('an article keeps what it was made from — its document\'s blocks and runs as the model held them — through a feed row and a new delivery: a reading scene\'s pane\'s as a mounted one\'s', () => onLayer(() => {
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
  const blocks = d.blocks, runs = d.runs;
  /** @type {Array<[string, HTMLElement]>} */
  const made = [['on the plane', rec.el], ['in a pane', pane]];
  for (const [where, el] of made) assert.deepEqual(LAYER.madeOf(el), { addr: D, blocks, runs }, `${where}: made from the document's blocks and runs as the model held them`);
  // a feed row naming the document drops what the model held of it; its reads deliver other text
  REC.invalidate(D);
  const edited = 'Tumbler.\n\nAnother passage now.', m = new TextEncoder().encode(edited).length;
  REC.takeSpanSet(D, [{ subspace: 1, ordinal: 1, positions: m }]);
  REC.takeDelivery(D, [{ pos: 1, width: m, kind: 'content', text: edited, ref: null, origin: null }]);
  assert.equal(REC.textBetween(D, 11, 22), 'Another pas', 'the model holds the new text');
  for (const [where, el] of made) {
    const kept = LAYER.madeOf(el);
    assert.ok(kept && kept.blocks === blocks && kept.runs === runs, `${where}: the article's own blocks and runs, never the model's newest`);
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
