// O-ANATOMY's test: the lineage's rows as the card sets them (B1-S5; A-56,
// A-57, A-82) — "superseded by" the `new` of each claim whose `old` is the
// link, "supersedes" the `old` of each claim whose `new` is it, in the
// answer's order, a retracted claim marked retracted, "none" where a side
// answered no claim, and no row where its read was refused; neither row
// holds a control.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { supersessionRows } from './anatomy-card.js';
import { t } from '../strings.js';

/** @typedef {import('../model/frames.js').Claim} Claim */

const L = '1.0.1.0.3.0.2.1';

/** a claim naming the card's link on both sides unless told otherwise @param {Partial<Claim>} c @returns {Claim} */
const claim = (c) => ({ claim: '1.0.1.0.3.0.2.9', home: '1.0.1.0.3', old: L, new: L, active: true, ...c });

/** HTML as text: its tags dropped, the escapes `esc` writes undone */
const text = (/** @type {string} */ html) => html.replace(/<[^>]*>/g, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&amp;/g, '&');

/** the rows as a person reads them: each one's label and the words of its value */
const rows = (/** @type {string} */ html) => [...html.matchAll(/<div class="kv[^"]*"><b>(.*?)<\/b>(.*?)<\/div>/g)].map((m) => ({ label: text(m[1]), value: text(m[2]).trim() }));

test('superseded by names each in-claim\'s new link and supersedes each out-claim\'s old one, in the answer\'s order', () => {
  const html = supersessionRows({
    supersededBy: [claim({ new: '1.0.1.0.3.0.2.5' }), claim({ claim: '1.0.1.0.4.0.2.2', home: '1.0.1.0.4', new: '1.0.1.0.4.0.2.1' })],
    supersedes: [claim({ old: '1.0.1.0.2.0.2.7' })],
  });
  assert.deepEqual(rows(html), [
    { label: t('F.card.superseded-by'), value: '1.0.1.0.3.0.2.5, 1.0.1.0.4.0.2.1' },
    { label: t('F.card.supersedes'), value: '1.0.1.0.2.0.2.7' },
  ]);
  assert.ok(!/<button|data-run/.test(html), 'neither row holds a control: the card\'s first act stays follow');
});

test('a side that answered no claim reads B1-S5\'s "none"', () => {
  assert.deepEqual(rows(supersessionRows({ supersededBy: [], supersedes: [] })), [
    { label: t('F.card.superseded-by'), value: t('F.card.none') },
    { label: t('F.card.supersedes'), value: t('F.card.none') },
  ]);
});

test('a retracted claim stands, its address marked retracted; an active one bears no mark', () => {
  const [by, sup] = rows(supersessionRows({
    supersededBy: [claim({ new: '1.0.1.0.3.0.2.5', active: false }), claim({ new: '1.0.1.0.3.0.2.6' })],
    supersedes: [claim({ old: '1.0.1.0.2.0.2.7', active: false })],
  }));
  assert.equal(by.value, `1.0.1.0.3.0.2.5 · ${t('F.card.retracted')}, 1.0.1.0.3.0.2.6`);
  assert.equal(sup.value, `1.0.1.0.2.0.2.7 · ${t('F.card.retracted')}`);
});

test('a side whose read was refused draws no row: nothing was learned of it, which is not "none"', () => {
  assert.deepEqual(rows(supersessionRows({ supersededBy: null, supersedes: [] })), [{ label: t('F.card.supersedes'), value: t('F.card.none') }]);
  assert.deepEqual(rows(supersessionRows({ supersededBy: [claim({ new: '1.0.1.0.3.0.2.5' })], supersedes: null })), [{ label: t('F.card.superseded-by'), value: '1.0.1.0.3.0.2.5' }]);
  assert.equal(supersessionRows({ supersededBy: null, supersedes: null }), '');
});
