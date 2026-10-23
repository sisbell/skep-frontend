// U's test: the digest and the key fingerprint a copy of a key record carries
// (issue #161). SHA-256 equals the platform's own over the lengths its padding
// turns on — empty, one block's room for the length and past it (55, 56, 63,
// 64, 119, 120 bytes) — and a hybrid key's 1,984 raw bytes (a mutant that
// writes the length's bits as bytes, or drops the second block, turns red).
// A key's fingerprint is SHA-256 over AUTH-1.12's framing of its alg token and
// its raw bytes under `skep-key-v1`, built here apart from the page's (AUTH-1.8)
// — the hex read case-insensitively, as its bytes, and a value that is no hex
// deriving none (a mutant that hashes the hex as text, or frames no lengths,
// turns red).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { sha256Hex, keyFingerprint } from './util.js';

/** n bytes of a fixed pattern */
const bytes = (/** @type {number} */ n) => Uint8Array.from({ length: n }, (_, i) => (i * 131 + 7) & 0xff);

test('SHA-256 equals the platform\'s own over every length its padding turns on, and over a hybrid key\'s raw value', () => {
  for (const n of [0, 1, 55, 56, 63, 64, 65, 119, 120, 1984]) {
    const b = bytes(n);
    assert.equal(sha256Hex(b), createHash('sha256').update(b).digest('hex'), `${n} bytes`);
  }
  assert.equal(sha256Hex(new TextEncoder().encode('abc')), 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad', 'FIPS 180-4\'s own example');
});

test('a key\'s fingerprint is SHA-256 over the tag and each field framed by its 4-byte big-endian length (AUTH-1.8, AUTH-1.12), the hex read as bytes whatever its case; a value that is no hex derives none', () => {
  const alg = 'mldsa65-ed25519', raw = Buffer.from(bytes(1984));
  const be32 = (/** @type {number} */ n) => { const b = Buffer.alloc(4); b.writeUInt32BE(n); return b; };
  const want = createHash('sha256').update(Buffer.concat([Buffer.from('skep-key-v1'), be32(alg.length), Buffer.from(alg), be32(raw.length), raw])).digest('hex');
  assert.equal(keyFingerprint(alg, raw.toString('hex')), want);
  assert.equal(keyFingerprint(alg, raw.toString('hex').toUpperCase()), want, 'upper-case hex reads as the same bytes (AUTH-1.3)');
  assert.equal(keyFingerprint(alg, 'abc'), null, 'an odd count of digits');
  assert.equal(keyFingerprint(alg, 'zz'), null, 'a digit that is no hex');
});
