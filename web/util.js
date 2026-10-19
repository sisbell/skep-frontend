// U — pure helpers every layer may import (the structure record §3.2 "U").
// Layer: a leaf below every layer. PURE.
// Carries: the wireframe's §1 tail (`pct`, `r2`, `kb`, `esc`); the
// deterministic primitives of §1 (`hash32`, `mix`, `rngFrom`, `shuffled`)
// are DROPPED with the permutation (foundations §2.1).
// Rules: FP-1 (plain JavaScript), FP-2 (every shape in JSDoc).

/**
 * The p-th percentile of a list of numbers (nearest rank).
 * @param {number[]} arr
 * @param {number} p 0–100
 * @returns {number}
 */
export const pct = (arr, p) => {
  if (!arr.length) return 0;
  const a = arr.slice().sort((x, y) => x - y);
  return a[Math.min(a.length - 1, Math.max(0, Math.ceil((p / 100) * a.length) - 1))];
};

/** @param {number} x @returns {number} rounded to two decimals */
export const r2 = (x) => Math.round(x * 100) / 100;

/** @param {number} b bytes @returns {string} kibibytes with one decimal */
export const kb = (b) => (b / 1024).toFixed(1) + ' KB';

/**
 * HTML-escape a value for insertion as text.
 * @param {unknown} s
 * @returns {string}
 */
export const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/**
 * The UTF-8 byte length of a string — a V-position is one byte of a
 * per-byte value (wire.md §Value encodings), so position arithmetic
 * over delivered text runs in bytes, never in characters.
 * @param {string} s
 * @returns {number}
 */
export const byteLength = (s) => {
  let n = 0;
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);
    if (c < 0x80) n += 1;
    else if (c < 0x800) n += 2;
    else if (c >= 0xd800 && c <= 0xdbff) { n += 4; i++; }
    else n += 3;
  }
  return n;
};

/**
 * The byte offset of each character boundary of `s`, for cutting a run
 * at a byte position: `offsets[i]` is the byte offset where character
 * `i` begins; the last entry is the total byte length.
 * @param {string} s
 * @returns {number[]}
 */
export const byteOffsets = (s) => {
  const out = [0];
  let n = 0;
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);
    if (c < 0x80) n += 1;
    else if (c < 0x800) n += 2;
    else if (c >= 0xd800 && c <= 0xdbff) { n += 4; i++; out.push(n); continue; }
    else n += 3;
    out.push(n);
  }
  return out;
};

/**
 * Cut a string at byte positions [b0, b1) — the characters whose first
 * byte lies in the range.
 * @param {string} s
 * @param {number} b0
 * @param {number} b1
 * @returns {string}
 */
export const sliceBytes = (s, b0, b1) => {
  const offs = byteOffsets(s);
  let i0 = 0;
  while (i0 < s.length && offs[i0] < b0) i0++;
  let i1 = i0;
  while (i1 < s.length && offs[i1] < b1) i1++;
  return s.slice(i0, i1);
};

/**
 * Fingerprint cue: the leading groups of a hex fingerprint in AUTH-5.1's
 * one convention (groups of four), the count the auth round's — four
 * groups here (foundations §2.1's account row: "the fingerprint's leading
 * groups").
 * @param {string} fp 64 lowercase hex
 * @param {number} [groups]
 * @returns {string}
 */
export const fingerprintCue = (fp, groups = 4) => {
  const g = [];
  for (let i = 0; i < Math.min(fp.length, groups * 4); i += 4) g.push(fp.slice(i, i + 4));
  return g.join(' ');
};

/**
 * Replace ⟨tokens⟩ in a design string with values; a token left unfilled
 * stays as the design writes it.
 * @param {string} s
 * @param {Record<string, string | number>} values
 * @returns {string}
 */
export const fill = (s, values) =>
  s.replace(/⟨([^⟩]+)⟩/g, (m, k) => (k in values ? String(values[k]) : m));
