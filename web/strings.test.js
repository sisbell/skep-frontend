// ST's test: every entry is PINNED with a source or DRAFT with a screen; the
// pinned strings are verbatim (a token filled leaves the rest); the lane's
// own are marked.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { STRINGS, t, pinned, lacking, isPinned } from './strings.js';

test('every entry is classed and sourced', () => {
  for (const [id, e] of Object.entries(STRINGS)) {
    assert.ok(e.cls === 'PINNED' || e.cls === 'DRAFT', id);
    if (e.cls === 'PINNED') assert.ok(e.source, id + ' has a source');
    if (e.cls === 'DRAFT') assert.ok(e.screen, id + ' names its screen');
    if (e.lane) assert.equal(e.source, '', id + ' is the lane\'s and has no design source');
  }
});

test('the pinned strings are verbatim and their count is what the inventory gives', () => {
  assert.equal(t('C-33'), 'visible to you; withheld for others.');
  assert.equal(t('C-39', { owner: 'Acme' }), "an address inside Acme's withheld document; whether a link occupies it is withheld with it");
  assert.equal(t('C-67.pointer'), 'a published edition may exist — follow the edition claim');
  assert.ok(isPinned('C-136') && !isPinned('B1.invalid'));
  assert.ok(pinned().length >= 30);
});

test('a token left unfilled stays as the design writes it', () => {
  assert.equal(t('F.version-of', { k: 2 }), 'version 2 of ⟨n⟩');
});

test('the lane\'s own strings are listed for the report', () => {
  const l = lacking();
  assert.ok(l.some((x) => x.id === 'L.no-adapter'));
  assert.ok(l.every((x) => x.screen));
});
