// P-CAM's test: the projection to the screen and back, the clamp, a flight
// that lands and where the camera is bound while it runs, every flight
// settled once — true as it lands, false where a newer flight, `set`, a pan,
// a zoom or a reset cuts it short — the zoom-in bound raised per E18 (a) by
// the deepest place and by every size a document is set at and never
// lowered, a re-anchor keeping a passage's place and size on screen with a
// flight bound into its document moved with it, the measure in force moved
// by a resize or the reader's root size alone (FP-26), the reading size
// 1.0625 of the root's and the landing's em smaller only where a column of
// one character does not fit, and the edge stub's cut and triangle on the
// true bearing inside the visible view.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as CAM from './camera.js';
import { WORLD_W, WORLD_H, DEPTH_SOUND, docBox } from './projection.js';
import { STANDARD_FS, MEASURE_CPL, standardFs, fitFor } from './layout.js';
import { STUB, CORNER, cornerWidth } from './register.js';

test('screen and world project both ways about the viewport centre', () => {
  CAM.setViewport(1000, 500);
  CAM.set({ x: 1000, y: 2000, scale: 2 });
  assert.equal(CAM.sx(1000), 500); assert.equal(CAM.sy(2000), 250);
  assert.equal(CAM.wx(CAM.sx(1234)), 1234);
  assert.equal(CAM.wy(CAM.sy(4321)), 4321);
});

test('the clamp keeps the camera in the world\'s margin and the scale in its bounds', () => {
  CAM.setViewport(1000, 500);
  CAM.set({ x: -1e9, y: 1e9, scale: 1e9 });
  assert.equal(CAM.cam.x, -WORLD_W * 0.6); assert.equal(CAM.cam.y, WORLD_H + WORLD_W * 0.6);
  assert.ok(CAM.cam.scale <= CAM.bounds().maxS);
  CAM.set({ x: 0, y: 0, scale: 1e-12 });
  assert.equal(CAM.cam.scale, CAM.bounds().minS);
});

test('the zoom-in bound reaches the reading scale of the deepest drawn place, at its standard type (E18 (a))', () => {
  CAM._reset(); CAM.setViewport(1000, 500);
  CAM.setDeepest(0); const b0 = CAM.bounds().maxS;
  assert.equal(b0, 40, "S3's constant bound where every document sits in the first grid");
  CAM.setDeepest(3); const b3 = CAM.bounds().maxS;
  assert.ok(b3 > b0 * 5, 'three grids deeper needs a far larger scale');
  CAM.setDeepest(5); assert.ok(CAM.bounds().maxS > b3 * 40, 'two more grids: 49× the em');
  for (const d of [0, 2, 3, 7, DEPTH_SOUND, DEPTH_SOUND + 1, DEPTH_SOUND + 4]) {
    CAM._reset(); CAM.setDeepest(d);
    assert.equal(CAM.bounds().maxS, Math.max(40, (30 / (STANDARD_FS / 7 ** Math.min(d, DEPTH_SOUND))) * 1.2), `depth ${d}: 36 px an em of its place's standard type, the residue's past the sound depth`);
  }
  CAM._reset();
});

test('the bound reaches every size a document is set at, and only rises: a flight to read a document set smaller than its place\'s standard lands at its reading scale, and a larger size, a shallower place or no size lowers nothing (E18 (a))', async () => {
  CAM._reset(); CAM.setViewport(1440, 900);
  CAM.setDeepest(3);
  const box = docBox('1.0.1.0.145'), fs = standardFs(box) / 10;
  assert.equal(box.depth, 3, 'an account\'s 145th document stands in its third continuation');
  const to = CAM.viewAt({ x: box.x + box.w / 2, y: box.y + box.h / 2 }, fs, 12.5);
  assert.ok(to.scale > CAM.bounds().maxS, 'a tenth of its place\'s standard is read past the bound its place sets');
  CAM.reach(fs);
  CAM.set(CAM.viewForCell(box));
  const landing = CAM.fly(to, 100, 0);
  CAM.step(100);
  await landing;
  const landed = CAM.view().scale;
  assert.ok(Math.abs(landed * fs - 12.5) < 1e-9, `the flight lands at 12.5 px an em, unclamped: ${landed * fs}`);
  const raised = CAM.bounds().maxS;
  CAM.reach(standardFs(box)); CAM.setDeepest(0); CAM.reach(0); CAM.reach(-1);
  assert.equal(CAM.bounds().maxS, raised, 'its place\'s standard, the first grid, no size: the bound stands');
  CAM.panBy(1, 0);
  assert.equal(CAM.view().scale, landed, 'the next pan keeps the reading scale');
  CAM._reset();
});

test('a flight interpolates and lands exactly, resolving its promise', async () => {
  CAM.setViewport(1000, 500);
  CAM.set({ x: 0, y: 0, scale: 1 });
  const p = CAM.fly({ x: 100, y: 50, scale: 2 }, 100, 0);
  assert.ok(CAM.flying());
  CAM.step(50); assert.ok(CAM.cam.x > 0 && CAM.cam.x < 100);
  CAM.step(100);
  assert.equal(await p, true, 'it settles true as it lands');
  assert.ok(!CAM.flying());
  assert.deepEqual(CAM.view(), { x: 100, y: 50, scale: 2 });
});

test('a flight cut short settles false: by a newer flight, which runs on and settles true as it lands, by set, a pan, a zoom or a reset — the camera where the cut put it', async () => {
  /** @type {Array<[string, () => Promise<boolean> | void]>} each cut, made mid-flight; a newer flight answers its own promise */
  const cuts = [
    ['a newer flight', () => CAM.fly({ x: -100, y: -50, scale: 0.5 }, 100, 50)],
    ['set', () => CAM.set({ x: 7, y: 8, scale: 1.5 })],
    ['a pan', () => CAM.panBy(10, 0)],
    ['a zoom', () => CAM.zoomAt(2, 200, 100)],
    ['a reset', () => CAM._reset()],
  ];
  for (const [what, cut] of cuts) {
    CAM.setViewport(1000, 500);
    CAM.set({ x: 0, y: 0, scale: 1 });
    /** @type {boolean | undefined} */
    let settled;
    CAM.fly({ x: 100, y: 50, scale: 2 }, 100, 0).then((landed) => { settled = landed; });
    CAM.step(50);
    const mid = CAM.view();
    const newer = cut();
    await new Promise((r) => setTimeout(r, 0));
    assert.equal(settled, false, `${what}: the flight it cut short settles false`);
    if (newer) {
      assert.ok(CAM.flying(), `${what}: runs on`);
      CAM.step(Infinity);
      assert.equal(await newer, true, `${what}: settles true as it lands`);
    } else assert.ok(!CAM.flying(), `${what}: no flight runs`);
    if (what === 'a pan') assert.deepEqual(CAM.view(), { x: mid.x - 10 / mid.scale, y: mid.y, scale: mid.scale }, 'the pan moves the camera from where the flight was, by the pan alone');
  }
  CAM._reset();
});

test('a re-anchor keeps a passage\'s place and size on screen: the point it stood at moved to where it stands now, the scale by the ratio of its sizes; a flight bound into the document lands at its new place, never cut, settling true; one bound elsewhere carries on', async () => {
  const near = (/** @type {number} */ x, /** @type {number} */ y) => Math.abs(x - y) < 1e-6;
  CAM._reset(); CAM.setViewport(1000, 500);
  CAM.set({ x: 100, y: 200, scale: 2 });
  const a = { x: 130, y: 210 }, b = { x: 400, y: 900 }, k = 1.5, room = { x: 0, y: 0, w: 2000, h: 2000 };
  const seen = { x: CAM.sx(a.x), y: CAM.sy(a.y) };
  CAM.reanchor(a, b, k, room);
  assert.ok(near(CAM.sx(b.x), seen.x) && near(CAM.sy(b.y), seen.y), 'the passage where it stood on screen');
  assert.ok(near(CAM.view().scale, 2 * k), 'at k times the scale: its size kept');
  // a flight bound into the document: moved with it, from where it set out to where it lands
  CAM.set({ x: 0, y: 0, scale: 1 });
  const to = { x: 150, y: 220, scale: 2 };
  /** @type {boolean | undefined} */
  let landed;
  CAM.fly(to, 100, 0).then((v) => { landed = v; });
  CAM.step(50);
  CAM.reanchor(a, b, k, room);
  assert.ok(CAM.flying(), 'never cut');
  CAM.step(100);
  await new Promise((r) => setTimeout(r, 0));
  assert.equal(landed, true, 'it settles true as it lands');
  const v = CAM.view();
  assert.ok(near((b.x - v.x) * v.scale, (a.x - to.x) * to.scale) && near((b.y - v.y) * v.scale, (a.y - to.y) * to.scale) && near(v.scale, to.scale * k), 'it lands with the passage where the flight would have shown it, at its size');
  // a flight bound elsewhere: the camera carried on by it, as it was
  CAM.set({ x: 0, y: 0, scale: 1 });
  const away = { x: 5000, y: 5000, scale: 1 };
  CAM.fly(away, 100, 0);
  CAM.step(50);
  const mid = CAM.view();
  CAM.reanchor(a, b, k, room);
  assert.deepEqual(CAM.view(), mid, 'the camera as the flight put it');
  CAM.step(100);
  const end = CAM.view();
  assert.ok(near(end.x, away.x) && near(end.y, away.y) && near(end.scale, away.scale), 'it lands where it was bound');
  CAM._reset();
});

test('where the camera is bound: the flight\'s destination while it runs, never the point it is passing; the view itself once it lands', () => {
  CAM.setViewport(1000, 500);
  CAM.set({ x: 0, y: 0, scale: 1 });
  assert.deepEqual(CAM.destination(), CAM.view(), 'no flight: the view');
  const to = { x: 100, y: 50, scale: 2 };
  CAM.fly(to, 100, 0);
  CAM.step(50);
  assert.ok(CAM.cam.x > 0 && CAM.cam.x < 100, 'mid-flight');
  assert.deepEqual(CAM.destination(), to);
  const bound = CAM.destination(); bound.x = -1;
  assert.deepEqual(CAM.destination(), to, 'a copy: the flight is not moved through it');
  CAM.step(100);
  assert.deepEqual(CAM.destination(), CAM.view());
});

test('pan and zoom are view arithmetic: zooming about a point keeps it still', () => {
  CAM.setViewport(1000, 500);
  CAM.set({ x: 500, y: 500, scale: 1 });
  const wxBefore = CAM.wx(200), wyBefore = CAM.wy(100);
  CAM.zoomAt(2, 200, 100);
  assert.ok(Math.abs(CAM.wx(200) - wxBefore) < 1e-6 && Math.abs(CAM.wy(100) - wyBefore) < 1e-6);
  const x0 = CAM.cam.x;
  CAM.panBy(10, 0);
  assert.ok(Math.abs(CAM.cam.x - (x0 - 10 / CAM.cam.scale)) < 1e-9, 'a pan of ten px moves the camera ten px worth of world against the drag');
});

test('the edge stub\'s cut keeps the true bearing and lands STUB.inset px inside the visible view\'s border, on whichever side the ray leaves by', () => {
  CAM.setViewport(1000, 800);
  const seen = CAM.visibleView(0), from = { x: 300, y: 500 };
  /** @type {Array<[{x: number, y: number}, 'x' | 'y', number]>} the far end, and the coordinate the cut takes on the side the ray leaves by */
  const cases = [[{ x: 5000, y: 1500 }, 'x', 1000 - STUB.inset], [{ x: -4000, y: 100 }, 'x', STUB.inset], [{ x: 900, y: 9000 }, 'y', 800 - STUB.inset], [{ x: 200, y: -6000 }, 'y', STUB.inset]];
  for (const [to, axis, at] of cases) {
    const cut = CAM.edgeStub(from, to, seen);
    assert.ok(Math.abs(cut[axis] - at) < 1e-9, `toward ${JSON.stringify(to)}: the cut at ${axis} ${at}, not ${cut[axis]}`);
    const ax = cut.x - from.x, ay = cut.y - from.y, bx = to.x - from.x, by = to.y - from.y;
    assert.ok(Math.abs(ax * by - ay * bx) < 1e-6 * Math.hypot(bx, by) && ax * bx + ay * by > 0, `toward ${JSON.stringify(to)}: on the bearing`);
    assert.ok(cut.x >= STUB.inset - 1e-9 && cut.x <= 1000 - STUB.inset + 1e-9 && cut.y >= STUB.inset - 1e-9 && cut.y <= 800 - STUB.inset + 1e-9, 'inside the inset border');
  }
  assert.deepEqual(CAM.edgeStub(from, from, seen), from, 'no bearing: cut at its start');
});

test('the visible view stands below the chrome across the viewport\'s top: a cut bound upward lands below the one line, never under it', () => {
  CAM.setViewport(1000, 800);
  assert.deepEqual(CAM.visibleView(25), { x: 0, y: 25, w: 1000, h: 775 });
  assert.deepEqual(CAM.visibleView(-3), { x: 0, y: 0, w: 1000, h: 800 }, 'no chrome: the viewport whole');
  const up = CAM.edgeStub({ x: 500, y: 400 }, { x: 500, y: -1000 }, CAM.visibleView(25));
  assert.ok(up.x === 500 && Math.abs(up.y - (25 + STUB.inset)) < 1e-9, `the cut at y ${25 + STUB.inset}, STUB.inset px below the line's bottom: ${JSON.stringify(up)}`);
});

test('the stub\'s triangle stands behind its tip on the bearing, STUB.length long and STUB.width across its base', () => {
  const tip = { x: 100, y: 50 }, to = { x: 100 + 3000, y: 50 + 4000 };
  const [t, p, q] = CAM.stubTriangle(tip, to);
  assert.deepEqual(t, tip);
  const ux = 3 / 5, uy = 4 / 5, base = { x: (p.x + q.x) / 2, y: (p.y + q.y) / 2 };
  assert.ok(Math.abs(base.x - (tip.x - ux * STUB.length)) < 1e-9 && Math.abs(base.y - (tip.y - uy * STUB.length)) < 1e-9, 'the base\'s middle STUB.length behind the tip, away from the far end');
  assert.ok(Math.abs(Math.hypot(p.x - q.x, p.y - q.y) - STUB.width) < 1e-9 && Math.abs((p.x - q.x) * ux + (p.y - q.y) * uy) < 1e-9, 'the base STUB.width across, square to the bearing');
});

test('the measure in force is the fit of the viewport\'s width at the reading size: the full measure at 1440 px, fewer whole characters at 480, and back at the full on a reset; a zoom or a pan moves none of it (issue #151)', () => {
  CAM._reset();
  assert.deepEqual([CAM.READING_PX, CAM.measure(), CAM.fit()], [17, MEASURE_CPL, { cpl: MEASURE_CPL, compact: false, px: 17 }], 'before any viewport: the full measure, the landing at the reading size');
  CAM.setViewport(1440, 900);
  assert.deepEqual(CAM.fit(), { cpl: MEASURE_CPL, compact: false, px: 17 }, '1440 px: the full measure, the corner whole');
  CAM.setViewport(480, 900);
  const narrow = CAM.fit();
  assert.ok(narrow.compact && narrow.cpl === fitFor(480, 17, { whole: cornerWidth(false), compact: cornerWidth(true), gap: CORNER.gap }).cpl && narrow.cpl < MEASURE_CPL && narrow.px === 17, `480 px: fewer characters beside the compact corner, at the reading size: ${JSON.stringify(narrow)}`);
  CAM.set({ x: 1000, y: 1000, scale: 3 }); CAM.zoomAt(2, 100, 100); CAM.panBy(40, 10);
  assert.deepEqual(CAM.fit(), narrow, 'a zoom and a pan: the measure as it was');
  assert.deepEqual(CAM.viewAt({ x: 5, y: 6 }, 2), { x: 5, y: 6, scale: CAM.landingPx() / 2 }, 'a reading view at the landing\'s em where none is given');
  CAM._reset();
  assert.equal(CAM.measure(), MEASURE_CPL, 'a reset: the full measure');
});

test('every arrival at reading scale sets the document\'s em at 1.0625 of the root\'s size as the reader\'s settings render it — 17 px at a 16 px root, 21.25 at 20 — the measure refit at it; and only where even a column of one character is wider than the view, at the em that holds that one (issue #16)', () => {
  CAM._reset();
  assert.deepEqual([CAM.READING_REM, CAM.READING_PX, CAM.landingPx()], [1.0625, 17, 17], 'a 16 px root: 17 px');
  CAM.setViewport(800, 700);
  const at16 = CAM.fit();
  CAM.setRoot(20);
  assert.deepEqual([CAM.READING_PX, CAM.landingPx()], [21.25, 21.25], 'a 20 px root: 21.25 px');
  assert.ok(CAM.measure() < at16.cpl, `the measure refit at the larger size: ${CAM.measure()} characters against ${at16.cpl}`);
  CAM.setRoot(0);
  assert.equal(CAM.READING_PX, 21.25, 'no root size read: nothing moves');
  CAM.setRoot(16);
  assert.deepEqual(CAM.fit(), at16, 'back at 16 px: the measure as it was');
  CAM.setViewport(150, 700);
  assert.ok(CAM.measure() === 1 && CAM.landingPx() < 17 && CAM.landingPx() >= 1, `a 150 px view: one character, the landing smaller — ${JSON.stringify(CAM.fit())}`);
  assert.deepEqual(CAM.viewAt({ x: 0, y: 0 }, 2).scale, CAM.landingPx() / 2, 'a reading view there at the landing\'s em');
  CAM._reset();
  assert.equal(CAM.READING_PX, 17, 'a reset: a 16 px root again');
});

test('the dirty mark is taken once', () => {
  CAM.markDirty();
  assert.equal(CAM.takeDirty(), true);
  assert.equal(CAM.takeDirty(), false);
});
