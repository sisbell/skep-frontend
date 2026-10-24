// N-KEYS's table test, read from the module's source: every row of the table
// is read, D5's routed rows are present, every bound chord is a chord or a
// navigation key — no plane command rides a printable key (§2.7) — no row
// binds a bare letter, digit or sign, and the dispatch guards the IME.
import { test } from 'node:test';
import assert from 'node:assert/strict';

// the table alone (the dispatch binds DOM modules the Node runner has no DOM for)
const src = await import('node:fs').then((fs) => fs.readFileSync(new URL('./keys.js', import.meta.url), 'utf8'));
const rows = [...src.matchAll(/\{ id: '([^']+)', chord: '([^']+)', act: '([^']+)', surface: '([^']+)' \}/g)].map((m) => ({ id: m[1], chord: m[2], act: m[3], surface: m[4] }));

const NAV = new Set(['↓', '↑', '→', '←', 'Home', 'End', 'PageDown', 'PageUp', 'Enter', 'Esc', 'Tab']);

test('every row of the TABLE is read (a row the pattern misses would escape the claims below)', () => {
  const table = src.slice(src.indexOf('export const TABLE'), src.indexOf(']));', src.indexOf('export const TABLE')));
  const declared = (table.match(/\{ id:/g) || []).length;
  assert.ok(declared >= 30, 'the table has its rows');
  assert.equal(rows.length, declared);
  for (const r of rows) assert.match(r.id, /^K-\d+$/, `${r.id}: a D5 row id`);
});

test('the table holds D5\'s routed rows', () => {
  for (const id of ['K-1', 'K-7', 'K-11', 'K-13', 'K-14', 'K-20', 'K-21', 'K-30', 'K-40', 'K-41', 'K-47', 'K-48', 'K-49', 'K-51', 'K-52', 'K-57', 'K-62']) assert.ok(rows.some((r) => r.id === id), id);
});

test('no plane command rides a printable key: every chord is Mod+… or Shift+a navigation key or a navigation key', () => {
  for (const r of rows) {
    const bare = r.chord.replace(/^(Mod\+)?(Shift\+)?/, '');
    const isChord = r.chord.startsWith('Mod+');
    const isNav = NAV.has(bare) && !r.chord.startsWith('Mod') ? (r.chord === bare || r.chord === 'Shift+' + bare) : false;
    assert.ok(isChord || isNav, `${r.id} ${r.chord} is a bare printable binding`);
    if (!isChord) assert.ok(NAV.has(bare), `${r.id} ${r.chord}: a navigation key alone`);
  }
});

test('the wireframe\'s bare keys are gone: no row binds /, t, k, 0–9, +, - alone', () => {
  for (const r of rows) assert.ok(!/^[/tk0-9+\-=]$/.test(r.chord), `${r.id} binds bare ${r.chord}`);
  assert.ok(!/case '\/'|key === '\/'|k === 't'|k === 'k'/.test(src), 'no bare-key branch in the dispatch');
});

test('the dispatch guards the IME: nothing is dispatched during a composition', () => {
  assert.ok(src.includes('e.isComposing') && src.includes("e.key === 'Process'"));
});
