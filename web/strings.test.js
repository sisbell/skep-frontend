// ST's test: every entry is PINNED with a source or DRAFT with a screen; the
// pinned strings are verbatim, and the editor's lines stand as its design
// words them, in its characters; a token filled leaves the rest, as words
// or as markup reading the same words, a value asked for set in its class;
// words made elsewhere set as markup in their faces, each address M-ADDR
// reads in them the identifier's and nothing else; a time said in the one
// form of a date, "not recorded" or "on or before" where the board's
// testimony leaves it so; when the page last read what it keeps, by its own
// clock, the hour and the minute, the day first where it was not today; what
// the status region says of a kept place, by its name; no words said of a
// passage held counting "places"; a
// continuation's mark's count in what it counts; a formatting form named by
// its one entry, a type the table lacks by its card's name, forms named
// together in the strip's order with each qualifier on its own form and each
// other hand's after the document's own, a form's act and take-off one
// pattern each, and no other entry spelling a form's name;
// the entries no design document carries are listed; and every accessible name the page
// sets is read from ST — none stands in the markup, and none is written as a
// literal in a module.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { sep } from 'node:path';
import { STRINGS, t, tHTML, addressedHTML, facedHTML, pinned, lacking, isPinned, dated, lastRead, markCount, typeName, formName, formsNamed, formAct, formTakeOff } from './strings.js';

/** a commons type as a link stores it, by its path under the registry document's subspace 3 */
const commons = (/** @type {string} */ path) => '1.1.0.1.0.1.0.' + path;
const BOLD = commons('3.23.2'), ITALIC = commons('3.23.1'), CODE = commons('3.23.3'), STRIKE = commons('3.23.5'), SUB = commons('3.23.6'), SUP = commons('3.23.7');
const PARAGRAPH = commons('3.21'), HEADING = commons('3.20'), FLAG = commons('3.23.4'), UNKNOWN = commons('3.23.8');

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

test('the editor\'s lines stand as its design words them, in its characters — B3-S2\'s discard of what the head-unreadable hold keeps, B3-S4\'s orphan line at one link, B3-S11\'s draft side\'s one line and leave line, B3-S13\'s formatting lines — and the selection\'s chords as D5 words them (issue #438)', () => {
  /** @type {Array<[string, string, string]>} each line's id, the screen its entry's `screen` opens on, and its words */
  const LINES = [
    ['B3.head_unreadable.discard', 'B3-S2', 'discard what is held'],
    ['B3.head_unreadable.discard.compact', 'B3-S2', 'discard'],
    ['B3.head_unreadable.discard.name', 'B3-S2', 'discard what is held for ⟨label⟩'],
    ['B3.head_unreadable.discard.said.typed', 'B3-S2', 'if discarded, what is held here is never sent, and the words you typed in it are removed from this device for good; if left held, it is sent once ⟨board⟩ can take it'],
    ['B3.head_unreadable.discard.said', 'B3-S2', 'if discarded, what is held here is never sent; if left held, it is sent once ⟨board⟩ can take it'],
    ['B3.head_unreadable.discard.said.compact', 'B3-S2', 'if discarded, what is held here is never sent'],
    ['B3.deletion.links.1', 'B3-S4', '1\u00a0link on this passage leaves the current text with it\u00a0— undo, or this draft’s past states, puts the words and the link back'],
    ['B3.deletion.links.past.1', 'B3-S4', '1\u00a0link on this passage left the current text with it\u00a0— undo, or this draft’s past states, puts the words and the link back'],
    ['B3.merge.landed.draft', 'B3-S11', 'nothing is published\u00a0— ⟨into⟩ now holds version\u00a0⟨k⟩’s text with the changes from ⟨label⟩, which stays as it is; undo in ⟨into⟩ undoes the merge while this session lasts\u00a0— after it, making ⟨into⟩’s state before the merge current, in its past states, takes the words out'],
    ['B3.merge.scene.line.draft', 'B3-S11', 'merging ⟨label⟩ with version\u00a0⟨k⟩ of ⟨D⟩ in ⟨into⟩\u00a0— it now holds version\u00a0⟨k⟩’s text with the changes from ⟨label⟩, which stays as it is; undo in ⟨into⟩ undoes the merge while this session lasts, and its past states keep it as it was; what needs a choice is listed first'],
    ['B3.merge.scene.line.draft.new', 'B3-S11', 'merging ⟨label⟩ with version\u00a0⟨k⟩ of ⟨D⟩ in a new draft, ⟨into⟩\u00a0— it holds version\u00a0⟨k⟩’s text with the changes from ⟨label⟩, which stays as it is; ⟨into⟩ stays\u00a0— you can remove its words, never the document; what needs a choice is listed first'],
    ['B3.merge.scene.line.draft.beside', 'B3-S11', 'merging ⟨label⟩ with version\u00a0⟨k⟩ of ⟨D⟩ in a new draft, ⟨into⟩\u00a0— it holds version\u00a0⟨k⟩’s text with the changes from ⟨label⟩, which stays as it is; ⟨into⟩ stays\u00a0— you can remove its words, never the document; ⟨level⟩ keeps its unpublished changes as you left them\u00a0— after this version is published, re-apply ⟨level⟩ to the head from its corner, or read it beside ⟨into⟩ and paste them in; what needs a choice is listed first'],
    ['B3.notes.home', 'B3-S13', 'in Notes on ⟨draft⟩'],
    ['B3.format.again.off', 'B3-S13', '⟨chord⟩ again takes its mark off them'],
    ['B3.format.held', 'B3-S13', 'taken off with your next version of these words'],
    ['B3.format.kept.notes.made', 'B3-S13', '— Notes on ⟨E⟩ made for it'],
    ['B3.format.slot', 'B3-S13', 'format…'],
    ['B3.format.strip.selection', 'B3-S13', 'format — the selection'],
    ['B3.format.strip.focus', 'B3-S13', 'format — “⟨first words⟩”'],
    ['B3.format.strip.caret', 'B3-S13', 'format — what you type next'],
    ['B3.format.bold', 'B3-S13', 'bold'],
    ['B3.format.italic', 'B3-S13', 'italic'],
    ['B3.format.code', 'B3-S13', 'code'],
    ['B3.format.strikethrough', 'B3-S13', 'strikethrough'],
    ['B3.format.subscript', 'B3-S13', 'subscript'],
    ['B3.format.superscript', 'B3-S13', 'superscript'],
    ['B3.format.paragraph', 'B3-S13', 'paragraph'],
    ['B3.format.heading', 'B3-S13', 'heading ⟨n⟩'],
    ['B3.format.levels-differ', 'B3-S13', 'levels differ'],
    ['B3.format.underline', 'B3-S13', 'there is no underline here — to emphasise words, ⟨italic⟩: ⟨Mod+I⟩, or ⟨bold⟩: ⟨Mod+B⟩'],
    ['B3.format.underline.compact', 'B3-S13', 'no underline'],
    ['B3.format.not-a-form', 'B3-S13', 'that is not a form this editor makes — its forms are under format… at a selection, and in the Format menu'],
    ['B3.format.cycle', 'B3-S13', '⟨level⟩ — let go to set it'],
    ['B3.format.style.on', 'B3-S13', '⟨form⟩ — what you type next; ⟨its chord or act⟩ again stops it'],
    ['B3.format.style.off', 'B3-S13', 'not ⟨form⟩ — what you type next'],
    ['B3.format.style.inside', 'B3-S13', '; the ⟨form⟩ either side stays'],
    ['B3.format.style.on.compact', 'B3-S13', '⟨form⟩ next'],
    ['B3.format.style.off.compact', 'B3-S13', 'not ⟨form⟩ next'],
    ['B3.format.style.unkept', 'B3-S13', '⟨board⟩ has not kept these words, so their ⟨form⟩ is not made — once it has, select them and apply ⟨form⟩ again'],
    ['B3.format.said', 'B3-S13', '⟨form⟩ — “⟨first words⟩”'],
    ['B3.format.said.off', 'B3-S13', '⟨form⟩ off — “⟨first words⟩”'],
    ['B3.format.said.union', 'B3-S13', '⟨form⟩ — “⟨first words⟩” and the ⟨form⟩ beside them'],
    ['B3.format.said.style.on', 'B3-S13', '⟨form⟩ — what you type next'],
    ['B3.format.said.style.off', 'B3-S13', 'not ⟨form⟩ — what you type next'],
  ];
  for (const [id, screen, text] of LINES) {
    const e = STRINGS[id];
    assert.ok(e, id + ' entered');
    assert.deepEqual({ text: e.text, cls: e.cls, source: e.source, screen: e.screen?.split(':')[0] }, { text, cls: 'DRAFT', source: 'designs/B3-editor.md', screen }, id);
  }
  assert.equal(t('B3.format.cycle', { level: t('B3.format.heading', { n: 2 }) }), 'heading 2 — let go to set it', 'the held cycle\'s line as B3\'s own example has it');
  assert.equal(t('B3.format.underline', { italic: formName(ITALIC), bold: formName(BOLD) }), 'there is no underline here — to emphasise words, italic: ⟨Mod+I⟩, or bold: ⟨Mod+B⟩', 'Mod+U\'s answer as B3 words it, its forms named by their one names');
  assert.deepEqual([formName(HEADING, 2), formName(PARAGRAPH)].map((form) => t('B3.format.said', { form, 'first words': 'Tumbler' })), ['heading 2 — “Tumbler”', 'paragraph — “Tumbler”'],
    'a level\'s spoken outcome is the outcome\'s one line with its form\'s name, as B3 words its "heading ⟨n⟩" and "paragraph" forms');
  assert.equal(t('D5.slots'), 'annotate ⌘⇧A · quote ⌘⇧C · who wrote this? ⌘⇧O · who uses this? ⌘⇧R · see the links ⌘⇧L · follow ⌘↩ · read side by side ⌘⇧↩ · link to… ⌘K · format…');
  for (const id of ['B3.deletion.links', 'B3.deletion.links.past', 'B3.deletion.links.unread', 'B3.merge.landed', 'B3.merge.scene.line', 'B3.merge.scene.line.new']) {
    assert.ok(!/[\u00a0’]/.test(STRINGS[id].text), `${id}: B3 sets it in plain characters, and the table keeps them`);
  }
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

test('no words a landing, a link\'s far end, a reading scene\'s returned stop or a versions row says of a passage count "places" — on this page a place is a document — and a versions row says a member holding all of the passage in pieces in the arrival\'s words (issue #242\'s design decision: "\'Places\' goes"; "The versions row takes these words")', () => {
  const held = Object.entries(STRINGS).filter(([id]) => /^L\.(held|piece|pieces|versions)\b/.test(id));
  assert.ok(held.length >= 30, `the passage's words: ${held.length}`);
  assert.deepEqual(held.filter(([, e]) => /places/.test(e.text)).map(([id]) => id), []);
  assert.equal(t('L.versions.pieces'), 'holds all of the passage');
  assert.ok(t('L.versions.pieces').endsWith(t('L.piece.all')), 'the arrival\'s "all of the passage"');
});

test('a continuation\'s mark\'s count says what it counts — "152 newer documents", one in its own words — and is a lower bound where the counts are (issue #42\'s design decision)', () => {
  assert.deepEqual([markCount(152, true), markCount(1, true), markCount(152, false)], ['152 newer documents', '1 newer document', '≥ 152 newer documents']);
});

test('each formatting form has one name — the strip\'s, a heading\'s by its level, 3.23.4 "flag" from the table and never the board\'s registry — and a type the table lacks, or a heading at a level it lacks, the name its card gives it, so none stands blank (issue #442\'s design decision)', () => {
  assert.deepEqual([BOLD, ITALIC, CODE, STRIKE, SUB, SUP, PARAGRAPH, FLAG].map((ty) => formName(ty)), ['bold', 'italic', 'code', 'strikethrough', 'subscript', 'superscript', 'paragraph', 'flag']);
  assert.deepEqual([1, 2, 6].map((n) => formName(HEADING, n)), ['heading 1', 'heading 2', 'heading 6']);
  assert.equal(formName(FLAG), t('L.format.flag'));
  for (const [ty, level] of [[UNKNOWN], [HEADING, 7], [HEADING, 0], [HEADING]]) {
    assert.equal(formName(ty, level), typeName(ty), `${ty} at level ${level}: the card's name, never a placeholder`);
  }
  assert.equal(formName(UNKNOWN), 'link of type 3.23.8 — undocumented here');
});

test('forms named together stand in the strip\'s order with a comma alone, "not" before each one off, each named once, and each other hand\'s forms after the document\'s own as a group led by the hand, semicolons between groups (issue #442\'s design decision)', () => {
  assert.equal(formsNamed([{ ty: ITALIC }, { ty: FLAG }, { ty: BOLD }, { ty: HEADING, level: 2 }]), 'bold, italic, heading 2, flag', 'the strip\'s order, whatever the order given');
  assert.equal(formsNamed([{ ty: SUP }, { ty: STRIKE }, { ty: HEADING, level: 3 }, { ty: HEADING, level: 1 }, { ty: PARAGRAPH }, { ty: SUB }, { ty: CODE }]),
    'code, strikethrough, subscript, superscript, paragraph, heading 1, heading 3', 'the headings by their levels, after the paragraph');
  assert.equal(formsNamed([{ ty: UNKNOWN }, { ty: FLAG }, { ty: BOLD }, { ty: HEADING, level: 9 }]), `bold, flag, ${typeName(UNKNOWN)}, ${typeName(HEADING)}`, 'what the table lacks after every form it names, in the order given');
  assert.equal(formsNamed([{ ty: ITALIC, off: true }, { ty: CODE, off: true }, { ty: BOLD }]), 'bold, not italic, not code', 'no qualifier across a comma: "not" before each form that is off');
  assert.equal(formsNamed([{ ty: BOLD }, { ty: ITALIC, off: true }], [{ hand: t('L.format.yours'), forms: [{ ty: SUB }, { ty: CODE }] }]), 'bold, not italic; yours: code, subscript');
  assert.equal(formsNamed([], [{ hand: t('L.format.yours'), forms: [{ ty: HEADING, level: 2 }] }]), 'yours: heading 2', 'the mirror\'s: the hand leads its group');
  assert.equal(formsNamed([{ ty: BOLD }], [{ hand: '1.0.2', forms: [] }, { hand: t('L.format.yours'), forms: [{ ty: ITALIC }] }]), 'bold; yours: italic', 'a hand\'s group holding no form dropped');
  assert.equal(formsNamed([{ ty: BOLD }, { ty: BOLD }, { ty: HEADING, level: 2 }, { ty: HEADING, level: 2 }]), 'bold, heading 2', 'each form named once');
  assert.equal(formsNamed([]), '');
});

test('a form\'s act and its take-off are one pattern each around the label of the set they write into, a heading\'s "a heading" and "the heading" — every form taking the take-off, every form this editor makes the act, and a flag, a paragraph and a type the table lacks none (issue #442\'s design decision)', () => {
  const SET = 'Tumbler';
  assert.deepEqual([BOLD, ITALIC, CODE, STRIKE, SUB, SUP, HEADING].map((ty) => formAct(ty, SET)),
    ['make it bold in Tumbler', 'make it italic in Tumbler', 'make it code in Tumbler', 'make it strikethrough in Tumbler', 'make it subscript in Tumbler', 'make it superscript in Tumbler', 'make it a heading in Tumbler']);
  assert.deepEqual([FLAG, PARAGRAPH, UNKNOWN].map((ty) => formAct(ty, SET)), [null, null, null], 'a flag made by no act of this editor; a paragraph a heading taken off');
  assert.deepEqual([BOLD, ITALIC, CODE, STRIKE, SUB, SUP, PARAGRAPH, HEADING, FLAG].map((ty) => formTakeOff(ty, SET)),
    ['take the bold off in Tumbler', 'take the italic off in Tumbler', 'take the code off in Tumbler', 'take the strikethrough off in Tumbler', 'take the subscript off in Tumbler', 'take the superscript off in Tumbler',
      'take the paragraph off in Tumbler', 'take the heading off in Tumbler', 'take the flag off in Tumbler']);
  assert.equal(formTakeOff(UNKNOWN, SET), t('L.format.take-off', { name: typeName(UNKNOWN), set: SET }), 'a type the table lacks named as its card names it');
  for (const id of ['B3.format.bold.notes', 'B3.format.heading.notes', 'B3.format.bold.off', 'B3.format.heading.off']) assert.ok(!(id in STRINGS), `${id}: one pattern for every form, never a line of one form's own`);
});

test('no entry spells a formatting form\'s name save the form\'s own and a heading\'s act and take-off, so every place that names a form reads its one name — and none says "struck" (issue #442\'s design decision)', () => {
  const NAMES = /\b(bold|italic|code|strikethrough|subscript|superscript|paragraph|headings?|flag|struck)\b/i;
  const own = new Set(['B3.format.bold', 'B3.format.italic', 'B3.format.code', 'B3.format.strikethrough', 'B3.format.subscript', 'B3.format.superscript', 'B3.format.paragraph', 'B3.format.heading', 'L.format.flag',
    'L.format.make.heading', 'L.format.take-off.heading']);
  for (const id of own) assert.ok(NAMES.test(STRINGS[id].text), `${id} names a form`);
  // a token is a slot a name is filled into, never words of the entry's own
  assert.deepEqual(Object.entries(STRINGS).filter(([id, e]) => !own.has(id) && NAMES.test(e.text.replace(/⟨[^⟩]*⟩/g, ''))).map(([id]) => id), []);
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
