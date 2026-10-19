// P-LOD — the level-of-detail bands (the structure record §3.2 "P-LOD").
// Layer 2, pure. Carries the wireframe's §7 (S3's bands, unchanged) and S1's
// mount thresholds (em 6.5 / 5.5, below the canvas's readable 8 — S1 Q7).
// Rules: FP-1, FP-2, FP-7.

import { DOC_W, REP_FS, CELL } from './projection.js';

/** document extent px: cluster ↔ extent crossfade band */
export const LOD_FAR_LO = 10, LOD_FAR_HI = 18;
/** em px: outline ↔ readable-text band */
export const LOD_TXT_LO = 8, LOD_TXT_HI = 11;
/** S1's mount hysteresis and cap */
export const MOUNT_EM = 6.5, UNMOUNT_EM = 5.5, MAX_MOUNTED = 8;

/**
 * @typedef {Object} Lod
 * @property {'far' | 'far~mid' | 'mid' | 'mid~near' | 'near'} name
 * @property {number} docPx a depth-0 document's extent in px
 * @property {number} fsPx the representative em in px
 * @property {number} fade 0–1 through a crossfade band
 */

/**
 * @param {number} scale the camera's scale
 * @returns {Lod}
 */
export function lodOf(scale) {
  const docPx = DOC_W * scale, fsPx = REP_FS * scale;
  if (docPx < LOD_FAR_LO) return { name: 'far', docPx, fsPx, fade: 0 };
  if (docPx < LOD_FAR_HI) return { name: 'far~mid', docPx, fsPx, fade: (docPx - LOD_FAR_LO) / (LOD_FAR_HI - LOD_FAR_LO) };
  if (fsPx < LOD_TXT_LO) return { name: 'mid', docPx, fsPx, fade: 0 };
  if (fsPx < LOD_TXT_HI) return { name: 'mid~near', docPx, fsPx, fade: (fsPx - LOD_TXT_LO) / (LOD_TXT_HI - LOD_TXT_LO) };
  return { name: 'near', docPx, fsPx, fade: 1 };
}

/**
 * The deepest grain whose cell is still ~18 px: accounts, else the board.
 * @param {number} scale
 * @returns {'account' | 'board'}
 */
export const clusterGrain = (scale) => (CELL[4][0] * scale >= 18 ? 'account' : 'board');

/** the em of a document whose box holds `fs` world units per em, at a scale */
export const emPx = (/** @type {number} */ fs, /** @type {number} */ scale) => fs * scale;
