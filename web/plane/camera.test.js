// P-CAM's test: the projection to the screen and back, the clamp, a flight
// that lands, the zoom bound widened per E18 (a).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as CAM from './camera.js';
import { WORLD_W, WORLD_H } from './projection.js';

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

test('the dirty mark is taken once', () => {
  CAM.markDirty();
  assert.equal(CAM.takeDirty(), true);
  assert.equal(CAM.takeDirty(), false);
});
