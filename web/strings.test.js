// ST's test: every entry is PINNED with a source or DRAFT with a screen; the
// pinned strings are verbatim and a token filled leaves the rest, as words
// or as markup reading the same words, a value asked for set in its class;
// words made elsewhere set as markup in their faces, each address M-ADDR
// reads in them the identifier's and nothing else; a time said in the one
// form of a date, "not recorded" or "on or before" where the board's
// testimony leaves it so; when the page last read what it keeps, by its own
// clock, the hour and the minute, the day first where it was not today; what
// the status region says of a kept place, by its name; a
// continuation's mark's count in what it counts;
// the entries no design document carries are listed; and every accessible name the page
// sets is read from ST — none stands in the markup, and none is written as a
// literal in a module.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { sep } from 'node:path';
import { STRINGS, t, tHTML, addressedHTML, facedHTML, pinned, lacking, isPinned, dated, lastRead, markCount } from './strings.js';

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
  assert.equal(pinned().length, 39, 'the thirty-six the reader\'s lanes pinned, and the deletion face\'s three (issue #410)');
});

test('the deletion face\'s pinned lines are verbatim from the copy inventory — the edition arm, the draft arm and the draft face\'s audience phrase — and the removal\'s reach statement, which the inventory PROPOSES and pins no words for, is B3\'s DRAFT (issue #410)', () => {
  assert.equal(t('C-48'), 'still here — public history: the version you removed it from remains readable, forever');
  assert.equal(t('C-49'), 'still here — for as long as this board retains it; below the reclaim floor it resolves nowhere here, unless another document still windows it');
  assert.equal(t('C-50'), "visible to this draft's readers,");
  assert.ok(isPinned('C-48') && isPinned('C-49') && isPinned('C-50'));
  assert.ok(!('C-167' in STRINGS) && STRINGS['B3.C-167'].cls === 'DRAFT' && STRINGS['B3.C-167'].source === 'designs/B3-editor.md', 'C-167 carries no pinned string: entered as B3 renders it, under the screen\'s prefix as B1.C-72 is');
});

test('every line of the editor\'s is PINNED from the copy inventory or DRAFT from its design document — B3 or D6 — with its source and its screen, and none is the lane\'s own (issue #410)', () => {
  const editor = Object.entries(STRINGS).filter(([id]) => id.startsWith('B3.') || id.startsWith('D6.') || ['C-48', 'C-49', 'C-50'].includes(id));
  assert.ok(editor.length >= 200, `the editor's lines: ${editor.length}`);
  for (const [id, e] of editor) {
    assert.ok(!e.lane, id + ' is no lane string: the page invents no wording');
    if (e.cls === 'PINNED') assert.equal(e.source, 'ux/copy.md', id);
    else {
      assert.equal(e.cls, 'DRAFT', id);
      assert.ok(id.startsWith('B3.') ? e.source === 'designs/B3-editor.md' : e.source === 'designs/D6-burst-machine.md', id + ' names the design document that drafts it');
      assert.ok(e.screen && /B3-S\d+/.test(e.screen), id + ' names its screen');
    }
  }
  // the survey's U8 list, each by the id that enters it: the corner's three words, Mod+S's answer, the moved face's hands,
  // the refused run's statements, the island, held_full's two lines, unwritable's two arms, head_unreadable's, the halt's two
  // forms and its act, the second window's, the fate clause, durability's, the keyless and stopped lines, answers_lost's, the
  // undo's constant sentence, the paste's and quote's faces, S6's, S7's, S9's, S10's, S11's, S12's, S13's
  for (const id of ['B3.kept', 'B3.not-yet-kept', 'B3.not-kept', 'B3.save.kept', 'B3.hand.device', 'B3.hand.unsigned', 'B3.hand.lost', 'B3.refused.discard', 'B3.own-bug',
    'B3.island', 'B3.held_full.line', 'B3.held_full.caret', 'B3.unwritable.full', 'B3.unwritable.read_only', 'B3.head_unreadable', 'B3.store_halted.newer', 'B3.store_halted.damaged', 'B3.show-file',
    'B3.another_window', 'B3.daemon.fate', 'B3.durability', 'B3.keyless', 'B3.stopped.act', 'B3.answers_lost', 'B3.undo.constant', 'B3.undo.empty', 'B3.paste.withheld', 'B3.source_not_registered',
    'B3.dangling_source', 'B3.link.kept-in-set', 'B3.slot_too_large', 'B3.history.busy', 'B3.history.reclaimed', 'B3.history.row', 'B3.capture.kept-in', 'B3.capture.held', 'B3.standing.behind',
    'B3.standing.superseded-by', 'B3.standing.merged-into', 'B3.publish.may-stand', 'B3.merge.moved', 'B3.merge.head-published', 'B3.merge.line.merged', 'B3.merge.line.none', 'B3.card.highlight',
    'B3.bad_target', 'B3.original_not_resident', 'B3.caret.enter', 'B3.caret.enter.paste', 'B3.caret.cut']) {
    assert.ok(id in STRINGS, id + ' entered');
  }
  assert.equal(t('B3.kept'), 'kept');
  assert.equal(t('B3.own-bug'), 'a fault in this client, not a change to your text — nothing was written; your words are held here');
  assert.equal(t('B3.answers_lost', { board: 'board 1', time: '2 minutes' }), 'board 1 has not answered this change for 2 minutes — it may have reached the board: send again checks, and sends it only if it did not');
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

test('when the page last read what it keeps is said by its own clock: the hour and the minute where the read landed today, the day first in the one form of a date where it did not — never an age (issue #345\'s design decision)', () => {
  // in this machine's own time zone: five past nine on the 12th of March 2026, read then and at noon that day, and on the 13th
  const read = new Date(2026, 2, 12, 9, 5).getTime(), noon = new Date(2026, 2, 12, 12).getTime(), next = new Date(2026, 2, 13, 0, 1).getTime();
  assert.equal(lastRead(read, noon), '09:05');
  assert.equal(lastRead(read, read), '09:05', 'the read\'s own moment');
  assert.equal(lastRead(read, next), t('L.time.day-time', { day: '12 March 2026', time: '09:05' }), 'a minute past midnight: the day first');
  assert.equal(t('L.kept.text', { when: lastRead(read, noon) }), 'as last read 09:05');
  assert.equal(t('L.kept.links', { when: lastRead(read, next) }), 'links as last read 12 March 2026, 09:05');
  assert.ok(!/ago|minutes?|hours?|days?/.test(lastRead(read, noon) + lastRead(read, next)), 'never a relative age');
});

test('the status region says a kept place by its name: "⟨name⟩ as last read ⟨when⟩" as it appears, "current, unchanged" or "current, changed" as its reads set it, "still as last read" with the failure\'s words where a read fails — never a bare "now current" — several of one cause counted; the board named as its mirror item names it (issue #369\'s design decision)', () => {
  const name = '"Tumbler." 1.0.1.0.3';
  assert.equal(t('L.kept.said', { name, clause: t('L.kept.text', { when: '09:05' }) }), '"Tumbler." 1.0.1.0.3 as last read 09:05');
  assert.equal(t('L.kept.said', { name, clause: t('L.kept.links', { when: '09:05' }) }), '"Tumbler." 1.0.1.0.3 links as last read 09:05', 'an edition\'s clause as its views show it');
  assert.deepEqual([t('L.kept.unchanged', { name }), t('L.kept.changed', { name })], ['"Tumbler." 1.0.1.0.3 current, unchanged', '"Tumbler." 1.0.1.0.3 current, changed']);
  assert.equal(t('L.kept.still', { name, reason: t('F.daemon.unreachable') }), '"Tumbler." 1.0.1.0.3 still as last read — board unreachable');
  for (const id of ['L.kept.said', 'L.kept.unchanged', 'L.kept.changed', 'L.kept.still']) assert.ok(STRINGS[id].text.startsWith('⟨name⟩'), `${id} names its place first`);
  assert.equal(t('L.kept.said', { name: t('L.kept.and-more', { name, n: 2 }), clause: t('L.kept.text', { when: '09:05' }) }), '"Tumbler." 1.0.1.0.3 and 2 more as last read 09:05', 'several of one cause appearing: the nearest named, the rest counted');
  assert.equal(t('L.kept.changed', { name: t('L.kept.more', { n: 2 }) }), '2 more current, changed', 'the rest of a cause\'s lifts counted by outcome');
  const board = t('L.mirror.board.name', { node: '1', origin: 'http://127.0.0.1:8642' });
  assert.deepEqual([t('L.mirror.board', { board, n: 3 }), t('L.kept.unchanged', { name: board })], ['board 1, http://127.0.0.1:8642: 3 accounts.', 'board 1, http://127.0.0.1:8642 current, unchanged'], 'the board: its mirror item\'s name, then its count; the status region the same name');
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
