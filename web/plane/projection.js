// P-PROJ — the address → position projection (the structure record §3.2
// "P-PROJ"). Layer 2 (the plane's pure arithmetic, read by the model's pump
// and by every renderer — FP-11's "the plane's pure camera arithmetic").
// PURE: caches of a pure function; no state of its own.
//
// Position is a pure function of the address (foundations §2.1; law 3):
// the plane's grid is fixed by the address space — each digit picks a cell
// in a grid of its parent's cell IN READING ORDER, its ordinal counted along
// the grid's rows, so consecutive mints stand side by side but across a
// row's end; each depth's grid has a fixed dimension, a constant never
// derived from a count (the wireframe's G, 7 cells across at a document's
// digit); the grid's LAST cell holds, from the start, the next grid of the
// same dimension, in which the digits past the grid's other cells CONTINUE
// in reading order (the continuation rule, E18 (a) RULED), so a cell's place
// is a function of its own digit and its parent prefix alone, no two
// siblings share a place, and a mint moves no place already drawn. A
// sub-node's region sits inside its parent node's cell at the digit's slot
// and the parent's own accounts at the separator's slot (slot 0).
//
// Carries: the wireframe's §2 second half (`PAD`, `G`, `CELL`, `cellOf`,
// `docBox`) — the PERMUTATION (`perm`, `shuffled`, the ring offset) DROPPED
// per foundations §2.1 ("S3's cellOf without its permutation"; the ring
// offset "retired, an overplot"). The structure record's §8.2 row for W §2
// and its §11 stop 18 still say "the permutation CARRIED as-is" — they
// predate the design and are owed (reported).
//
// THE CONTINUATIONS: an account's continuation k is the last cell of its
// document grid k − 1 (`continuationCell`), holding every document at
// continuation depth k and deeper (`withinContinuation`). Where the camera
// draws a continuation's documents too small to stand whole, the plane draws
// the continuation as ONE MARK (foundations §2.1: "its mid frame shows its
// oldest 48 whole and the other 152 as one residue, its newest's label on
// it"; P44; P-LOD's `residueDepth`, P-RENDER).
//
// THE PRECISION FLOOR (this lane's finding, reported): world positions are
// doubles; a document at continuation depth k has a cell 7^k smaller than
// its account's position, so past DEPTH_SOUND grids the arithmetic the
// camera runs (`(wx - cam.x) * scale`) loses the box. Documents deeper than
// that have no box of their own: they share the cell of the continuation
// past the sound depth, `continuationCell(account, DEPTH_SOUND + 1)`, marked
// `residue` — a continuation always drawn as one mark — and the one of them
// the focus names mounts there. E18 (a) holds: the zoom bound reaches every
// place the projection draws.
//
// Rules: FP-1, FP-2, FP-7 (never serialized), FP-10 (no state), FP-11.

import { fieldsOf, accountOf, boardOf, kindOf } from '../model/address.js';

/**
 * @typedef {Object} Cell
 * @property {number} x world x of the cell's left edge
 * @property {number} y
 * @property {number} w
 * @property {number} h
 * @property {number} depth the continuation depth at the cell's own level (0 = the first grid)
 */

/**
 * @typedef {Object} DocBox
 * @property {number} x
 * @property {number} y
 * @property {number} w
 * @property {number} h
 * @property {number} depth
 * @property {boolean} residue true where the document lies past DEPTH_SOUND and shares the residue cell, `continuationCell(account, DEPTH_SOUND + 1)`
 * @property {number} fsRep the representative em size (world units) of text set in this box
 */

export const WORLD_W = 1e6;
export const WORLD_H = 1.5e6;
/** digits per field: node 3, user 2, document 1 (the wireframe's PAD) */
export const PAD = [3, 2, 1];
/** grid cells across, per padded level (the wireframe's G; 7 at the document's digit) */
export const G = [2, 3, 2, 3, 2, 7];
/** the leaf level (the document's digit) */
export const LEAF = G.length - 1;
/** the deepest continuation grid the arithmetic positions soundly (see the head) */
export const DEPTH_SOUND = 11;

/** [w, h] of one cell at each level, at depth 0 */
export const CELL = (() => {
  /** @type {Array<[number, number]>} */
  const out = [];
  let px = 1, py = 1;
  for (let L = 0; L < G.length; L++) { px *= G[L]; py *= G[L]; out.push([WORLD_W / px, WORLD_H / py]); }
  return out;
})();
export const DOC_CELL_W = CELL[LEAF][0];
export const DOC_CELL_H = CELL[LEAF][1];
/** the document's box inside its cell (the wireframe's 0.80 / 0.86) */
export const DOC_W = DOC_CELL_W * 0.8;
export const DOC_H = DOC_CELL_H * 0.86;
/** the representative em at depth 0 — the wireframe's REP_FS, S3's */
export const REP_FS = 44.8;

/**
 * The padded digit path the projection walks: a board is 3 digits, an
 * account 5, a document 6. "1.0.1.0.3" → [1,0,0, 1,0, 3].
 * @param {string} key
 * @returns {number[]}
 */
export function pathOf(key) {
  const f = fieldsOf(key);
  /** @type {number[]} */
  const p = [];
  const k = kindOf(key);
  const fields = k === 'board' ? 1 : k === 'account' ? 2 : 3;
  for (let i = 0; i < fields; i++) for (let j = 0; j < PAD[i]; j++) p.push((f[i] && f[i][j]) || 0);
  return p;
}

/**
 * Where a digit sits in its level's grid, in READING ORDER with the
 * continuation: the usable cells are the first g²−1 (indices 0 … g²−2), the
 * last cell (index g²−1) holds the next grid. At the leaf the digit is
 * 1-based (document 1 is the first cell); elsewhere digit 0 is the
 * separator's slot (the first cell).
 * @param {number} digit
 * @param {number} g cells across
 * @param {boolean} leaf
 * @returns {{k: number, idx: number, col: number, row: number}} k the continuation depth, idx the cell index within that grid
 */
export function slotOf(digit, g, leaf) {
  const U = g * g - 1;
  const d = leaf ? digit - 1 : digit;
  const k = Math.floor(d / U);
  const idx = d - k * U;
  return { k, idx, col: idx % g, row: Math.floor(idx / g) };
}

/**
 * World cell for a padded path (1 … 6 digits).
 * @param {number[]} a
 * @param {number} [depthCap] the continuation depth past which the leaf's digits share the residue cell
 * @returns {Cell}
 */
export function cellOf(a, depthCap = DEPTH_SOUND) {
  let x = 0, y = 0, depth = 0;
  let w = WORLD_W, h = WORLD_H;
  for (let L = 0; L < a.length; L++) {
    const g = G[L];
    const leaf = L === LEAF;
    const s = slotOf(a[L], g, leaf);
    let k = s.k, col = s.col, row = s.row;
    // past the sound depth a leaf shares the residue: the continuation cell at the cap
    if (leaf && k > depthCap) { k = depthCap; col = g - 1; row = g - 1; }
    let cw = w / g, ch = h / g;
    // descend k times into the continuation cell — the LAST cell of each grid
    for (let i = 0; i < k; i++) { x += (g - 1) * cw; y += (g - 1) * ch; cw /= g; ch /= g; }
    x += col * cw; y += row * ch;
    w = cw; h = ch;
    if (leaf) depth = k;
  }
  return { x, y, w, h, depth };
}

/** @type {Map<string, DocBox>} */
const _boxCache = new Map();
/** @type {Map<string, Cell>} */
const _cellCache = new Map();

/** @param {string} key @returns {Cell} */
export function cellOfKey(key) {
  let c = _cellCache.get(key);
  if (!c) { c = cellOf(pathOf(key)); _cellCache.set(key, c); }
  return c;
}

/**
 * The continuation depth of a document's digit (0 = the first grid).
 * @param {string} key a document address
 * @returns {number}
 */
export function depthOfDoc(key) {
  const p = pathOf(key);
  return slotOf(p[LEAF], G[LEAF], true).k;
}

/**
 * The document's box: its cell shrunk to the box fractions; a document past
 * DEPTH_SOUND shares the residue cell (`residue: true`).
 * @param {string} key a document address (a version member answers its document's box)
 * @returns {DocBox}
 */
export function docBox(key) {
  let b = _boxCache.get(key);
  if (!b) {
    const p = pathOf(key);
    const depth = slotOf(p[LEAF], G[LEAF], true).k;
    const residue = depth > DEPTH_SOUND;
    const c = cellOf(p);
    const shrink = Math.pow(G[LEAF], c.depth);
    const fsRep = REP_FS / shrink;
    b = { x: c.x + (c.w - c.w * 0.8) / 2, y: c.y + (c.h - c.h * 0.86) / 2, w: c.w * 0.8, h: c.h * 0.86, depth: c.depth, residue, fsRep };
    _boxCache.set(key, b);
  }
  return b;
}

/**
 * The world width left of a document's box that no other document's box
 * reaches into: its own cell's margin, and where the cell to its left is a
 * usable cell of the same grid — the same size, its box the same fraction of
 * it — that cell's margin too. A document in its grid's first column meets
 * the grid's edge, past which a cell may be of any size (a neighbouring
 * grid's continuation holds smaller ones), so its own margin alone is clear.
 * The document's corner stands in this strip (foundations §3.1).
 * @param {string} key a document address
 * @returns {number}
 */
export function clearLeftOf(key) {
  const b = docBox(key);
  const margin = b.x - cellOfKey(key).x;
  const s = slotOf(pathOf(key)[LEAF], G[LEAF], true);
  const col = s.k > DEPTH_SOUND ? G[LEAF] - 1 : s.col;
  return col > 0 ? 2 * margin : margin;
}

/**
 * An account's continuation k (1 … DEPTH_SOUND + 1): the last cell of its
 * document grid k − 1, which the account's grid k fills — the cell holding
 * every document of the account at continuation depth k and deeper. The
 * arithmetic is `cellOf`'s descent, step for step, so the continuation past
 * the sound depth is exactly the cell its documents' boxes share.
 * @param {string} account
 * @param {number} k
 * @returns {Cell}
 */
export function continuationCell(account, k) {
  const a = cellOfKey(account);
  const g = G[LEAF];
  let x = a.x, y = a.y, cw = a.w / g, ch = a.h / g;
  for (let i = 1; i < k; i++) { x += (g - 1) * cw; y += (g - 1) * ch; cw /= g; ch /= g; }
  return { x: x + (g - 1) * cw, y: y + (g - 1) * ch, w: cw, h: ch, depth: k - 1 };
}

/**
 * Does a document stand inside its account's continuation k — at
 * continuation depth k or deeper? A document past the sound depth stands
 * inside every continuation, its box the cell of the last.
 * @param {string} key a document address (a version member answers its document's)
 * @param {number} k 1 … DEPTH_SOUND + 1
 */
export function withinContinuation(key, k) {
  const b = docBox(key);
  return b.residue || b.depth >= k;
}

/** @param {string} account @returns {Cell} */
export const accountCell = (account) => cellOfKey(account);
/** @param {string} board @returns {Cell} */
export const boardCell = (board) => cellOfKey(board);

/**
 * The cell a board's own label stands in: the first cell of its user grid,
 * the user field's separator slot, which no account takes (an account's
 * user field starts at 1), so the board's label meets no account's place.
 * @param {string} board
 * @returns {Cell}
 */
export const boardLabelCell = (board) => cellOf([...pathOf(board), 0]);

/**
 * The address of the account whose cell holds a world point, or null off
 * every account cell of the board (the separator slots hold no account).
 * @param {number} wx
 * @param {number} wy
 * @param {string} board the board the camera is over
 * @returns {string | null}
 */
export function accountAt(wx, wy, board) {
  const bc = cellOfKey(board);
  if (wx < bc.x || wx >= bc.x + bc.w || wy < bc.y || wy >= bc.y + bc.h) return null;
  // walk the padded levels after the node's three digits
  const p = pathOf(board);
  let x = bc.x, y = bc.y, cw = bc.w, ch = bc.h;
  /** @type {number[]} */
  const digits = [];
  for (let L = p.length; L < LEAF; L++) {
    const g = G[L];
    cw = cw / g; ch = ch / g;
    const col = Math.min(g - 1, Math.floor((wx - x) / cw)), row = Math.min(g - 1, Math.floor((wy - y) / ch));
    digits.push(row * g + col);
    x += col * cw; y += row * ch;
  }
  // digits: [user1, user2] — the separator slot (0) at user1 holds no account
  if (!digits.length || digits[0] === 0 || digits[0] >= G[3] * G[3] - 1) return null;
  const acct = board + '.0.' + digits[0] + (digits[1] ? '.' + digits[1] : '');
  return acct;
}

/** @param {string} key @returns {string} */
export const boardOfKey = boardOf;
/** @param {string} key @returns {string | null} */
export const accountOfKey = accountOf;

/** The world box a view (camera + viewport) sees, padded in screen px. */
export function viewportWorld(/** @type {{x:number,y:number,scale:number}} */ cam, /** @type {number} */ VW, /** @type {number} */ VH, pad = 0) {
  const wx = (/** @type {number} */ px) => (px - VW / 2) / cam.scale + cam.x;
  const wy = (/** @type {number} */ py) => (py - VH / 2) / cam.scale + cam.y;
  return { x0: wx(-pad), y0: wy(-pad), x1: wx(VW + pad), y1: wy(VH + pad) };
}

/** does a box intersect a world rect? */
export const intersects = (/** @type {{x:number,y:number,w:number,h:number}} */ b, /** @type {{x0:number,y0:number,x1:number,y1:number}} */ v) =>
  !(b.x + b.w < v.x0 || b.x > v.x1 || b.y + b.h < v.y0 || b.y > v.y1);

/** reset the caches (tests) */
export function _reset() { _boxCache.clear(); _cellCache.clear(); }
