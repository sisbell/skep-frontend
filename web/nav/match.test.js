// N-MATCH's test: an address exact; a share form recognized; labels and
// address prefixes over the index; the levels with nothing typed.
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
