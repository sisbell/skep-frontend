// P-CAM's test: the projection to the screen and back, the clamp, a flight
// that lands, the zoom bound widened per E18 (a); the edge stub's cut on its
// true bearing, STUB.inset px inside the visible view's border on every side
// — below the chrome across the viewport's top, never under it — and the
// triangle behind its tip on that bearing.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as CAM from './camera.js';
import { WORLD_W, WORLD_H } from './projection.js';
import { STUB } from './register.js';

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

test('the zoom-in bound reaches the reading scale of the deepest drawn place (E18 (a))', () => {
  CAM.setViewport(1000, 500);
  CAM.setDeepest(0); const b0 = CAM.bounds().maxS;
  assert.equal(b0, 40, "S3's constant bound where every document sits in the first grid");
  CAM.setDeepest(3); const b3 = CAM.bounds().maxS;
  assert.ok(b3 > b0 * 5, 'three grids deeper needs a far larger scale');
  CAM.setDeepest(5); assert.ok(CAM.bounds().maxS > b3 * 40, 'two more grids: 49× the em');
  CAM.setDeepest(0);
});

test('a flight interpolates and lands exactly, resolving its promise', async () => {
  CAM.setViewport(1000, 500);
  CAM.set({ x: 0, y: 0, scale: 1 });
  const p = CAM.fly({ x: 100, y: 50, scale: 2 }, 100, 0);
  assert.ok(CAM.flying());
  CAM.step(50); assert.ok(CAM.cam.x > 0 && CAM.cam.x < 100);
  CAM.step(100);
  await p;
  assert.ok(!CAM.flying());
  assert.deepEqual(CAM.view(), { x: 100, y: 50, scale: 2 });
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

test('the dirty mark is taken once', () => {
  CAM.markDirty();
  assert.equal(CAM.takeDirty(), true);
  assert.equal(CAM.takeDirty(), false);
});
