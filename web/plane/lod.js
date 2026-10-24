// P-LOD — the level-of-detail bands (the structure record §3.2). Layer 2,
// pure. State: none. S3's bands, and S1's mount thresholds (S1 Q7): a
// document mounts at em 6.5 and stands down to 5.5, below the canvas's
// readable 8. The text bands read the plane's standard type (P-LAY's
// STANDARD_FS), the size every document is set at until its columns fill its
// room. They decide how deep the one line and the walk go, down to the
// document; whether either goes on to a position or a span is the document's
// own em's (T-LAYER's `atReadingScale`), never a band's: a continuation
// document, or one set a step smaller, is below its own threshold well inside
// `near`. The limit (FP-12): at most MOUNTS_PER_FRAME documents mount afresh
// in a frame, those that reach the readable em counted first and never held
// back — a limit on a frame's new mounts, never a ceiling on what stands.
// The continuations' band (foundations §2.1; P44): an account's continuation
// whose documents the scale draws smaller than the far band's upper edge is
// drawn as one mark, crossfading with its documents' boxes through the far
// band as the clusters crossfade with the extents.
// Rules: FP-1, FP-2, FP-7, FP-12.

import { DOC_W, CELL, G, LEAF, DEPTH_SOUND } from './projection.js';
import { STANDARD_FS } from './layout.js';

/** document extent px: cluster ↔ extent crossfade band */
export const LOD_FAR_LO = 10, LOD_FAR_HI = 18;
/** em px: outline ↔ readable-text band */
export const LOD_TXT_LO = 8, LOD_TXT_HI = 11;
/** em px: S1's mount hysteresis — a document mounts at MOUNT_EM and stands down to UNMOUNT_EM */
export const MOUNT_EM = 6.5, UNMOUNT_EM = 5.5;
/** the documents that mount afresh in one frame, at most: below the readable em, where a mount may wait for the frames after (T-LAYER's `chosen`) */
export const MOUNTS_PER_FRAME = 8;

/**
 * @typedef {Object} Lod
 * @property {'far' | 'far~mid' | 'mid' | 'mid~near' | 'near'} name
 * @property {number} docPx a depth-0 document's extent in px
 * @property {number} fsPx the standard type's em in px (P-LAY's STANDARD_FS)
 * @property {number} fade 0–1 through a crossfade band
 */

/**
 * @param {number} scale the camera's scale
 * @returns {Lod}
 */
export function lodOf(scale) {
  const docPx = DOC_W * scale, fsPx = STANDARD_FS * scale;
  if (docPx < LOD_FAR_LO) return { name: 'far', docPx, fsPx, fade: 0 };
  if (docPx < LOD_FAR_HI) return { name: 'far~mid', docPx, fsPx, fade: (docPx - LOD_FAR_LO) / (LOD_FAR_HI - LOD_FAR_LO) };
  if (fsPx < LOD_TXT_LO) return { name: 'mid', docPx, fsPx, fade: 0 };
  if (fsPx < LOD_TXT_HI) return { name: 'mid~near', docPx, fsPx, fade: (fsPx - LOD_TXT_LO) / (LOD_TXT_HI - LOD_TXT_LO) };
  return { name: 'near', docPx, fsPx, fade: 1 };
}

/**
 * @typedef {Object} ResidueDepth — the continuations a scale draws as one mark each
 * @property {number} k the shallowest continuation drawn as a mark: the first, from 1, whose documents' boxes are smaller than LOD_FAR_HI px; at most DEPTH_SOUND + 1, the continuation past the sound depth, which is always a mark
 * @property {number} fade 0–1 as the depth-k boxes grow through LOD_FAR_LO … LOD_FAR_HI px: the mark of k fading out, the depth-k boxes and the mark of k + 1 fading in
 * @property {number} held the continuation whose mark holds a document for the click and the connections: k, and k + 1 once the band draws the depth-k boxes the stronger
 */

/**
 * The continuation a scale draws as each account's one mark: at HOME the
 * first, its oldest 48 documents standing whole (foundations §2.1).
 * @param {number} scale the camera's scale
 * @returns {ResidueDepth}
 */
export function residueDepth(scale) {
  for (let k = 1; k <= DEPTH_SOUND; k++) {
    const px = (DOC_W * scale) / Math.pow(G[LEAF], k);
    if (px >= LOD_FAR_HI) continue;
    const fade = px < LOD_FAR_LO ? 0 : (px - LOD_FAR_LO) / (LOD_FAR_HI - LOD_FAR_LO);
    return { k, fade, held: fade < 0.5 ? k : k + 1 };
  }
  return { k: DEPTH_SOUND + 1, fade: 0, held: DEPTH_SOUND + 1 };
}

/**
 * The deepest grain whose cell is still ~18 px: accounts, else the board.
 * @param {number} scale
 * @returns {'account' | 'board'}
 */
export const clusterGrain = (scale) => (CELL[4][0] * scale >= 18 ? 'account' : 'board');

/** the em of a document whose box holds `fs` world units per em, at a scale */
export const emPx = (/** @type {number} */ fs, /** @type {number} */ scale) => fs * scale;
