// P-LOD's test: S3's bands and S1's mount thresholds below the glyph band.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { lodOf, LOD_FAR_LO, LOD_FAR_HI, LOD_TXT_LO, LOD_TXT_HI, MOUNT_EM, UNMOUNT_EM, clusterGrain } from './lod.js';
import { DOC_W, REP_FS } from './projection.js';

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

test('the cluster grain is accounts while their cell is ~18 px', () => {
  assert.equal(clusterGrain(1e-9), 'board');
  assert.equal(clusterGrain(1), 'account');
});
