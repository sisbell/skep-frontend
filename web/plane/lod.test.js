// P-LOD's test: S3's bands and S1's mount thresholds below the glyph band;
// the continuation a scale draws as one mark — at HOME the first (foundations
// §2.1: the oldest 48 whole, the rest one residue), crossfading through the
// far band, the one past the sound depth at any scale.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { lodOf, residueDepth, LOD_FAR_LO, LOD_FAR_HI, LOD_TXT_LO, LOD_TXT_HI, MOUNT_EM, UNMOUNT_EM, clusterGrain } from './lod.js';
import { DOC_W, REP_FS, G, LEAF, DEPTH_SOUND, accountCell } from './projection.js';
import * as CAM from './camera.js';

test('the bands by document extent and em', () => {
  assert.equal(lodOf((LOD_FAR_LO - 1) / DOC_W).name, 'far');
  assert.equal(lodOf((LOD_FAR_LO + 1) / DOC_W).name, 'far~mid');
  assert.equal(lodOf((LOD_FAR_HI + 1) / DOC_W).name, 'mid');
  assert.equal(lodOf((LOD_TXT_LO + 1) / REP_FS).name, 'mid~near');
  assert.equal(lodOf((LOD_TXT_HI + 1) / REP_FS).name, 'near');
});

test('a crossfade reports its fade', () => {
  const l = lodOf(((LOD_FAR_LO + LOD_FAR_HI) / 2) / DOC_W);
  assert.ok(Math.abs(l.fade - 0.5) < 1e-9);
});

test('the mount threshold sits below the canvas\'s readable em, with hysteresis (S1 Q7)', () => {
  assert.ok(MOUNT_EM < LOD_TXT_LO);
  assert.ok(UNMOUNT_EM < MOUNT_EM);
});

test('at HOME the first continuation is one mark and the oldest 48 stand whole (foundations §2.1)', () => {
  CAM.setViewport(1440, 900);
  const home = CAM.viewForCell(accountCell('1.0.1'), 0.85);
  assert.deepEqual(residueDepth(home.scale), { k: 1, fade: 0, held: 1 });
  assert.ok(DOC_W * home.scale >= LOD_FAR_HI, 'a depth-0 box stands whole');
});

test('a depth-0 box of 160 px draws the first continuation whole and the second as the mark', () => {
  assert.deepEqual(residueDepth(160 / DOC_W), { k: 2, fade: 0, held: 2 });
});

test('through the far band the mark crossfades with the boxes it holds; the click takes the stronger', () => {
  const depth1 = (/** @type {number} */ px) => residueDepth((px * G[LEAF]) / DOC_W); // the scale at which a depth-1 box is px wide
  assert.deepEqual(depth1(LOD_FAR_LO - 1), { k: 1, fade: 0, held: 1 });
  const lower = depth1(12), upper = depth1(16);
  assert.ok(lower.k === 1 && Math.abs(lower.fade - 0.25) < 1e-9 && lower.held === 1, 'the mark drawn the stronger holds its depth-1 documents');
  assert.ok(upper.k === 1 && Math.abs(upper.fade - 0.75) < 1e-9 && upper.held === 2, 'the depth-1 boxes drawn the stronger stand whole');
  assert.equal(depth1(LOD_FAR_HI + 1).k, 2, 'past the band the next continuation is the mark');
});

test('at any scale the continuation past the sound depth is a mark', () => {
  assert.deepEqual(residueDepth(1e12), { k: DEPTH_SOUND + 1, fade: 0, held: DEPTH_SOUND + 1 });
});

test('the cluster grain is accounts while their cell is ~18 px', () => {
  assert.equal(clusterGrain(1e-9), 'board');
  assert.equal(clusterGrain(1), 'account');
});
