// U — pure helpers every layer may import (the structure record §3.2).
// Layer: a leaf below every layer. PURE.
// Rules: FP-1, FP-2.

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
 * groups here (foundations §2.1's account row).
 * @param {string} fp 64 lowercase hex
 * @param {number} [groups]
 * @returns {string}
 */
export const fingerprintCue = (fp, groups = 4) => {
  const g = [];
  for (let i = 0; i < Math.min(fp.length, groups * 4); i += 4) g.push(fp.slice(i, i + 4));
  return g.join(' ');
};

/** SHA-256's round constants (FIPS 180-4 §4.2.2) */
const SHA256_K = new Uint32Array([
  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
  0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
  0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
  0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
  0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
  0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
  0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
  0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
]);

/** a 32-bit word rotated right by n bits */
const rotr = (/** @type {number} */ x, /** @type {number} */ n) => (x >>> n) | (x << (32 - n));

/**
 * The SHA-256 digest of bytes (FIPS 180-4), as 64 lowercase hex characters.
 * Synchronous: a copy event's handler writes the clipboard before it returns,
 * and the platform's own digest (`crypto.subtle`) answers a promise.
 * @param {Uint8Array} bytes
 * @returns {string}
 */
export function sha256Hex(bytes) {
  const n = bytes.length, total = Math.ceil((n + 9) / 64) * 64;
  const m = new Uint8Array(total);
  m.set(bytes);
  m[n] = 0x80;
  const dv = new DataView(m.buffer);
  dv.setUint32(total - 8, Math.floor(n / 0x20000000));
  dv.setUint32(total - 4, (n * 8) >>> 0);
  const H = new Uint32Array([0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19]);
  const W = new Uint32Array(64);
  for (let o = 0; o < total; o += 64) {
    for (let i = 0; i < 16; i++) W[i] = dv.getUint32(o + i * 4);
    for (let i = 16; i < 64; i++) {
      const s0 = rotr(W[i - 15], 7) ^ rotr(W[i - 15], 18) ^ (W[i - 15] >>> 3);
      const s1 = rotr(W[i - 2], 17) ^ rotr(W[i - 2], 19) ^ (W[i - 2] >>> 10);
      W[i] = W[i - 16] + s0 + W[i - 7] + s1;
    }
    let a = H[0], b = H[1], c = H[2], d = H[3], e = H[4], f = H[5], g = H[6], h = H[7];
    for (let i = 0; i < 64; i++) {
      const t1 = (h + (rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25)) + ((e & f) ^ (~e & g)) + SHA256_K[i] + W[i]) | 0;
      const t2 = ((rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
      h = g; g = f; f = e; e = (d + t1) | 0; d = c; c = b; b = a; a = (t1 + t2) | 0;
    }
    H[0] += a; H[1] += b; H[2] += c; H[3] += d; H[4] += e; H[5] += f; H[6] += g; H[7] += h;
  }
  return [...H].map((x) => x.toString(16).padStart(8, '0')).join('');
}

/** the key-fingerprint framing tag (AUTH-1.11): the bytes a key's fingerprint preimage opens with */
const KEY_TAG = 'skep-key-v1';

/**
 * A key's fingerprint (AUTH-1.8): `SHA-256(framed(KEY_TAG, [alg, raw]))` —
 * the tag's bytes, then each field as its 4-byte big-endian length and its
 * bytes (AUTH-1.12) — `alg` the key's alg token, `raw` its value decoded from
 * its hex, case-insensitively (AUTH-1.3); in the flat 64-lowercase-hex form
 * the daemon emits (AUTH-1.9), never the grouped display (`fingerprintCue`).
 * Null where the hex does not decode.
 * @param {string} alg
 * @param {string} keyHex
 * @returns {string | null}
 */
export function keyFingerprint(alg, keyHex) {
  if (keyHex.length % 2 || !/^[0-9a-fA-F]*$/.test(keyHex)) return null;
  const enc = new TextEncoder(), tag = enc.encode(KEY_TAG), name = enc.encode(alg), raw = new Uint8Array(keyHex.length / 2);
  for (let i = 0; i < raw.length; i++) raw[i] = parseInt(keyHex.slice(2 * i, 2 * i + 2), 16);
  const pre = new Uint8Array(tag.length + 4 + name.length + 4 + raw.length), dv = new DataView(pre.buffer);
  pre.set(tag, 0);
  dv.setUint32(tag.length, name.length);
  pre.set(name, tag.length + 4);
  dv.setUint32(tag.length + 4 + name.length, raw.length);
  pre.set(raw, tag.length + 8 + name.length);
  return sha256Hex(pre);
}

/**
 * A moment as the page names it to a person: its date and its time of day,
 * in the reader's own locale and time zone.
 * @param {number} ms unix milliseconds
 * @returns {string}
 */
export const timeOf = (ms) => new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(ms));

/**
 * Replace ⟨tokens⟩ in a design string with values; a token left unfilled
 * stays as the design writes it.
 * @param {string} s
 * @param {Record<string, string | number>} values
 * @returns {string}
 */
export const fill = (s, values) =>
  s.replace(/⟨([^⟩]+)⟩/g, (m, k) => (k in values ? String(values[k]) : m));
