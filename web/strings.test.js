// ST's test: every entry is PINNED with a source or DRAFT with a screen; the
// pinned strings are verbatim and a token filled leaves the rest, as words
// or as markup reading the same words, a value asked for set in its class;
// words made elsewhere set as markup in their faces, each address M-ADDR
// reads in them the identifier's and nothing else; a time said in the one
// form of a date, "not recorded" or "on or before" where the board's
// testimony leaves it so; a continuation's mark's count in what it counts;
// the entries no design document carries are listed; and every accessible name the page
// sets is read from ST — none stands in the markup, and none is written as a
// literal in a module.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { sep } from 'node:path';
import { STRINGS, t, tHTML, addressedHTML, facedHTML, pinned, lacking, isPinned, dated, markCount } from './strings.js';

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

test('a string as markup reads the same words, every value escaped, a value asked for set in a span of its class, and every address in the rest in the identifier\'s face (issue #16)', () => {
  const vals = { owner: '1.0.<2>', account: '1.0.2', width: 240, origin: '1.0.1.0.1003' };
  const html = tHTML('B1.withheld-run', vals, { owner: 'reading', origin: 'id' });
  assert.equal(html, 'withheld · <span class="reading">1.0.&lt;2&gt;</span> (<span class="id">1.0.2</span>) · 240 positions · origin <span class="id">1.0.1.0.1003</span>');
  assert.equal(html.replace(/<[^>]*>/g, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>'), t('B1.withheld-run', vals), 'the words t gives');
});

test('words made elsewhere as markup: each address M-ADDR reads in them in the identifier\'s face, escaped, and nothing else — not a loopback origin\'s host, a decimal or a bare count; runs in their faces, the client\'s words with their addresses so too (issue #16)', () => {
  assert.equal(addressedHTML('its passage is not in 1.0.1.0.127\'s current text'), 'its passage is not in <span class="id">1.0.1.0.127</span>\'s current text');
  assert.equal(addressedHTML('1.0.2 quotes 1.0.2.1.0.6, <b>'), '<span class="id">1.0.2</span> quotes <span class="id">1.0.2.1.0.6</span>, &lt;b&gt;', 'every address, the rest escaped');
  for (const plain of ['http://127.0.0.1:8742', 'http://192.168.1.20:8642', 'at 1.0625 of the root', 'position 529 of 240 positions', 'version 2 of 3']) assert.equal(addressedHTML(plain), plain, `${plain}: no address in it — a URL's host none`);
  assert.equal(facedHTML([{ text: 'withheld · ', face: 'client' }, { text: '1.0.2', face: 'ident' }, { text: ' · ', face: 'client' }, { text: 'Notes <1>', face: 'reading' }, { text: ' in 1.0.1.0.3', face: 'client' }]),
    'withheld · <span class="id">1.0.2</span> · <span class="reading">Notes &lt;1&gt;</span> in <span class="id">1.0.1.0.3</span>', 'each run in its face, a document\'s words the reading face\'s and never searched for addresses');
  assert.equal(facedHTML([{ text: 'see 1.0.1.0.3', face: 'reading' }]), '<span class="reading">see 1.0.1.0.3</span>', 'a document\'s own words keep their letterforms, an address in them too');
});

test('a time is said in one form of a date — the day, the month in words, the year — from the board\'s testimony: the feed\'s row its own day; an hour\'s anchor its day while the hour after it stays inside that day, else "on or before" the day the hour ends in; "not recorded" where the board holds no reading (issue #22)', () => {
  // in this machine's own time zone: noon, two minutes before eleven at night, and half past eleven, on the 12th of March 2026
  const noon = new Date(2026, 2, 12, 12).getTime(), before = new Date(2026, 2, 12, 22, 58).getTime(), late = new Date(2026, 2, 12, 23, 30).getTime();
  assert.equal(dated({ at: 7, time: noon, from: 'feed' }), '12 March 2026');
  assert.equal(dated({ at: 7, time: late, from: 'feed' }), '12 March 2026', 'the feed\'s row is exact: its own day, however late');
  assert.equal(dated({ at: 8, time: before, from: 'anchor' }), '12 March 2026', 'the hour after 22:58 ends inside the day');
  assert.equal(dated({ at: 8, time: late, from: 'anchor' }), t('L.time.on-or-before', { date: '13 March 2026' }), 'the hour after 23:30 ends on the 13th');
  assert.equal(dated({ at: 9, time: null, from: null }), t('F.slot.not-recorded'));
  assert.equal(dated({ at: null, time: null, from: null }), 'not recorded');
});

test('a continuation\'s mark\'s count says what it counts — "152 newer documents", one in its own words — and is a lower bound where the counts are (issue #42\'s design decision)', () => {
  assert.deepEqual([markCount(152, true), markCount(1, true), markCount(152, false)], ['152 newer documents', '1 newer document', '≥ 152 newer documents']);
});

test('the lane\'s own strings are listed for the report', () => {
  const l = lacking();
  assert.ok(l.some((x) => x.id === 'L.no-adapter'));
  assert.ok(l.every((x) => x.screen));
});

const WEB = new URL('./', import.meta.url);
/** the page's own modules: every module under web/ but the tests, `test/` and `gate/` */
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
