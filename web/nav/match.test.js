// N-MATCH's test: an address is exact, a share form and a URL are recognized
// and go nowhere, labels match by text and addresses by prefix over the index
// with the system account never listed, and with nothing typed the levels are
// listed — the board's first where a board is held, and none where none is
// (FP-35).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { matches, isShareForm, isUrl } from './match.js';

const ctx = {
  places: [
    { doc: '1.0.1.0.3', kind: /** @type {const} */ ('edition'), label: '# skep-ux-design', standing: /** @type {const} */ ('public'), account: '1.0.1', system: false },
    { doc: '1.0.1.0.4', kind: /** @type {const} */ ('edition'), label: '## The artifact chain', standing: /** @type {const} */ ('public'), account: '1.0.1', system: false },
    { doc: '1.1.0.1.0.2', kind: /** @type {const} */ ('edition'), label: null, standing: /** @type {const} */ ('public'), account: '1.1.0.1', system: true },
  ],
  landmarks: [{ doc: '1.0.2.0.1', kind: /** @type {const} */ ('edition'), label: null, standing: /** @type {const} */ ('public'), account: '1.0.2', system: false }],
  trail: [{ n: 1, addr: '1.0.1.0.3', label: 'x' }],
  current: '1.0.1.0.3', board: '1', home: '1.0.1',
  levelWords: { board: 'the whole board', home: 'HOME', account: 'the account\'s region', document: 'the whole document' },
};

test('an address is exact — one row', () => {
  const r = matches('1.0.1.0.4', ctx);
  assert.deepEqual(r.map((x) => [x.kind, x.addr, x.exact]), [['address', '1.0.1.0.4', true]]);
});
test('a share form and a URL are recognized and go nowhere here', () => {
  assert.ok(isShareForm('skep://3xK9'));
  assert.ok(isShareForm('https://skep.network/l/3xK9'));
  assert.ok(isUrl('https://example.org/page'));
  assert.equal(matches('https://example.org/page', ctx)[0].kind, 'url');
});
test('labels match by text, addresses by prefix; the system account is never listed', () => {
  assert.deepEqual(matches('artifact', ctx).map((x) => x.addr), ['1.0.1.0.4']);
  assert.deepEqual(matches('1.0.1.0', ctx).map((x) => x.addr).sort(), ['1.0.1.0.3', '1.0.1.0.4']);
  assert.ok(!matches('1.1', ctx).some((x) => x.addr === '1.1.0.1.0.2'));
});
test('nothing typed: the levels, the whole board first, HOME, the landmarks, the trail', () => {
  const r = matches('', ctx);
  assert.deepEqual(r.map((x) => x.kind), ['board', 'home', 'document', 'landmark', 'trail']);
  assert.equal(r[0].addr, '1');
});
test('nothing typed, no board held: no board\'s level is listed — the rows begin at what the reader holds (issue #215; FP-35)', () => {
  const r = matches('', { ...ctx, board: null, home: null, current: null, landmarks: [], trail: [] });
  assert.deepEqual(r, [], 'nothing to list: no board, no HOME, no address named');
  assert.deepEqual(matches('', { ...ctx, board: null }).map((x) => x.kind), ['home', 'document', 'landmark', 'trail'], 'the board row alone left out');
});
test('an address typed at a number the plane\'s map gives no cell is one row as any address is, marked reserved and saying the words handed in for it, before any press; an ordinary address, a slot\'s and the home page\'s say nothing of it (issue #771\'s decision: "It shows on the LEAP box\'s row as soon as the address is typed")', () => {
  const at = { ...ctx, reserved: 'reserved number' };
  assert.deepEqual(matches('1.0.1.0.7', at), [{ kind: 'address', addr: '1.0.1.0.7', title: '1.0.1.0.7', sub: 'reserved number', exact: true, reserved: true }], 'a reserved number: one row, its words beside its address');
  assert.deepEqual(matches('1.0.2.0.63.2', at).map((r) => [r.reserved, r.sub]), [[true, 'reserved number']], 'a version address under one, on another account: the same');
  for (const a of ['1.0.1.0.64', '1.0.1.0.3', '1.0.1.0.5', '1.0.1.0.1', '1.0.1']) assert.deepEqual(matches(a, at).map((r) => [r.kind, r.reserved, r.sub]), [['address', undefined, '']], `${a}: no reserved words`);
});
