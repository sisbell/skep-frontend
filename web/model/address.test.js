// M-ADDR's test (S-5 (a): beside its module; S-20 (a): `node --test web/`).
// Each claim fails when the module's rule is removed.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fieldsOf, accountOf, documentOf, memberOf, elementOf, kindOf, cmpAddr, isAddress, parseAddress, resolveSpan, parseVSpan, vSpan, commonsType, isUnder } from './address.js';

test('the tumbler splits at zeros into dottable fields', () => {
  assert.deepEqual(fieldsOf('1.5.0.1.1.0.1'), [[1, 5], [1, 1], [1]]);
  assert.deepEqual(fieldsOf('1.0.1.0.3.0.2.1'), [[1], [1], [3], [2, 1]]);
});

test('account, document, member and element of an address', () => {
  assert.equal(accountOf('1.0.1.0.3'), '1.0.1');
  assert.equal(accountOf('1'), null);
  assert.equal(documentOf('1.0.1.0.3.2'), '1.0.1.0.3');
  assert.equal(memberOf('1.0.1.0.3.2'), 2);
  assert.equal(memberOf('1.0.1.0.3'), null);
  assert.deepEqual(elementOf('1.0.1.0.3.0.2.1'), { doc: '1.0.1.0.3', subspace: 2, ordinal: 1 });
  assert.equal(kindOf('1.0.1.1'), 'account');
  assert.equal(kindOf('1.1.0.1.0.2'), 'document');
});

test('address order is numeric by component, shorter first', () => {
  const a = ['1.0.1.0.10', '1.0.1.0.2', '1.0.1', '1.0.2.0.1'];
  assert.deepEqual(a.sort(cmpAddr), ['1.0.1', '1.0.1.0.2', '1.0.1.0.10', '1.0.2.0.1']);
  assert.ok(isUnder('1.0.1', '1.0.1.0.3') && !isUnder('1.0.1', '1.0.10'));
});

test('the exact parse admits a dotted address and nothing else', () => {
  assert.equal(parseAddress(' 1.0.1.0.3 '), '1.0.1.0.3');
  assert.equal(parseAddress('1.0.0.1'), null);
  assert.equal(parseAddress('1.0.1.'), null);
  assert.equal(parseAddress('tumbler'), null);
  assert.ok(!isAddress('01.0.1'));
});

test('a relative V-span round-trips the wire spelling', () => {
  assert.deepEqual(vSpan(951, 17), { start: '1.951', width: '0.17' });
  assert.deepEqual(parseVSpan({ start: '1.951', width: '0.17' }), { subspace: 1, ordinal: 951, positions: 17 });
});

test('an absolute span resolves to an element run or a whole address', () => {
  const run = resolveSpan({ start: '1.0.1.0.3.0.1.951', width: '0.0.0.0.0.0.0.17' });
  assert.equal(run.doc, '1.0.1.0.3'); assert.equal(run.ordinal, 951); assert.equal(run.positions, 17); assert.equal(run.whole, false);
  const whole = resolveSpan({ start: '1.0.1.0.1049578', width: '0.0.0.0.1' });
  assert.equal(whole.doc, '1.0.1.0.1049578'); assert.equal(whole.whole, true);
  const acct = resolveSpan({ start: '1.0.1', width: '0.0.1' });
  assert.equal(acct.account, '1.0.1'); assert.equal(acct.doc, null); assert.equal(acct.whole, true);
});

test('a commons type path names its ordinal under subspace 3', () => {
  assert.deepEqual(commonsType('1.1.0.1.0.1.0.3.13'), { ordinal: 13, sub: [] });
  assert.deepEqual(commonsType('1.1.0.1.0.1.0.3.14.2'), { ordinal: 14, sub: [2] });
  assert.equal(commonsType('1.0.1.0.3'), null);
});
