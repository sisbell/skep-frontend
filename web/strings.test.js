// ST's test: every entry is PINNED with a source or DRAFT with a screen; the
// pinned strings are verbatim (a token filled leaves the rest); the lane's
// own are marked; every accessible name the page sets is read from ST — none
// stands in the markup, and none is written as a literal in a module (a label
// put back in index.html, or a region's name written inline, turns it red).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { sep } from 'node:path';
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

const WEB = new URL('./', import.meta.url);
/** the page's own modules: every module under web/ but the tests, the fake port and the gate's hooks */
const modules = readdirSync(WEB, { recursive: true })
  .map((f) => String(f).split(sep).join('/'))
  .filter((f) => f.endsWith('.js') && !f.endsWith('.test.js') && !f.startsWith('test/') && !f.startsWith('gate/'));

test('every accessible name the page sets is read from ST: the markup carries none, and a module sets one only as t(…)', () => {
  assert.ok(modules.includes('nav/walk.js') && modules.includes('app/main.js'), 'the page\'s modules are read');
  /** @type {string[]} */
  const bad = [];
  const html = readFileSync(new URL('index.html', WEB), 'utf8');
  for (const m of html.matchAll(/aria-label\s*=\s*(["'])(.*?)\1/g)) bad.push(`index.html: aria-label="${m[2]}"`);
  for (const f of modules) {
    const src = readFileSync(new URL(f, WEB), 'utf8');
    // in a module's markup, the attribute's value is ST's word, escaped
    for (const m of src.matchAll(/aria-label\s*=\s*["'](?!\$\{esc\(t\()([^"'\n]{0,40})/g)) bad.push(`${f}: aria-label="${m[1]}`);
    // set by script, the value is ST's word
    for (const m of src.matchAll(/setAttribute\(\s*["']aria-label["']\s*,(?!\s*t\()\s*([^\n]{0,40})/g)) bad.push(`${f}: setAttribute('aria-label', ${m[1]}`);
    for (const m of src.matchAll(/\.ariaLabel\s*=(?!=)(?!\s*t\()\s*([^\n]{0,40})/g)) bad.push(`${f}: .ariaLabel = ${m[1]}`);
  }
  assert.deepEqual(bad, []);
});
