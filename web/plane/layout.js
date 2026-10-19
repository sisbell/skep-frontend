// P-LAY — the greeking layout in world units (the structure record §3.2
// "P-LAY"). Layer 2, pure. Carries the wireframe's §9 (`layoutOf`, the
// monospace metrics, the withheld run as bars of its width) over the model's
// document shape — blocks (paragraphs) derived from the delivered runs.
// Rules: FP-1, FP-2, FP-8.

import { DOC_W, DOC_H } from './projection.js';

/**
 * @typedef {Object} Metrics
 * @property {number} fs the em in world units
 * @property {number} cpl characters per line
 * @property {number} lineH the line height in world units
 * @property {number} estLines
 * @property {number} tw the text column width (world units)
 * @property {number} x0 the column's left edge, relative to the box
 * @property {number} y0 the text's top, relative to the box
 * @property {number} textH
 */

/**
 * @typedef {Object} GreekGlyph
 * @property {number} pos the block's first position (its key)
 * @property {string} t the word (with its trailing space)
 * @property {number} x column (characters)
 * @property {boolean} [withheld]
 */

/**
 * @typedef {Object} Layout
 * @property {GreekGlyph[][]} lines
 * @property {Map<number, number>} blockLine the first line index of each block, by its position
 */

/** the characters per em of the monospace face the greek assumes */
export const CHAR_W = 0.6;

/**
 * The document's own extent holds its own text (S3): the em from the
 * positions it holds, with a floor on characters per line so a short
 * document is not set in a giant face.
 * @param {number} positions the content extent (bytes ≈ characters)
 * @param {{w:number, h:number}} box
 * @returns {Metrics}
 */
export function metricsFor(positions, box) {
  const chars = Math.max(1, positions);
  const tw = box.w * 0.88, th = box.h * 0.9;
  const fs = Math.min(Math.sqrt((th * tw) / (0.81 * chars)), tw / (CHAR_W * 52));
  const cpl = Math.max(8, Math.floor(tw / (CHAR_W * fs)));
  const lineH = fs * 1.35;
  const padY = box.h * (0.05 / 0.86), titleH = lineH * 2.2;
  return { fs, cpl, lineH, estLines: Math.ceil(chars / cpl), tw, x0: (box.w - tw) / 2, y0: padY + titleH, textH: box.h - 2 * padY - titleH };
}

/**
 * The greeked lines of a document's delivered blocks.
 * @param {Array<{pos:number, kind:string, text:string, width:number}>} blocks
 * @param {Metrics} m
 * @returns {Layout}
 */
export function layoutOf(blocks, m) {
  /** @type {GreekGlyph[][]} */
  const lines = [];
  /** @type {Map<number, number>} */
  const blockLine = new Map();
  /** @type {GreekGlyph[]} */
  let cur = [];
  let curLen = 0;
  const flush = () => { if (cur.length) { lines.push(cur); cur = []; curLen = 0; } };
  for (const b of blocks) {
    flush();
    blockLine.set(b.pos, lines.length);
    if (b.kind === 'withheld') {
      const n = Math.max(1, Math.ceil(b.width / m.cpl));
      for (let i = 0; i < n; i++) lines.push([{ pos: b.pos, t: '▒'.repeat(Math.max(1, Math.min(m.cpl, b.width - i * m.cpl))), x: 0, withheld: true }]);
      continue;
    }
    for (const wRaw of b.text.split(/\s+/)) {
      if (!wRaw) continue;
      const w = wRaw + ' ';
      if (curLen + w.length > m.cpl) flush();
      cur.push({ pos: b.pos, t: w, x: curLen }); curLen += w.length;
    }
  }
  flush();
  return { lines, blockLine };
}

/** the box fractions the layout shares with the text layer */
export const BOX = { DOC_W, DOC_H };
