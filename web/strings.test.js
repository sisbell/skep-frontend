// ST's test: every entry is PINNED with a source or DRAFT with a screen; the
// pinned strings are verbatim, the pinned lines the editor draws among them
// under their own ids; the editor's lines stand as its design words them, in
// its characters, every line its screens carry entered — a line only
// foundations carries entered from there — and none it retired left standing,
// nor its words in any entry; a token filled leaves the rest, as words
// or as markup reading the same words, a value asked for set in its class;
// words made elsewhere set as markup in their faces, each address M-ADDR
// reads in them the identifier's and nothing else; a time said in the one
// form of a date, "not recorded" or "on or before" where the board's
// testimony leaves it so; when the page last read what it keeps, by its own
// clock, the hour and the minute, the day first where it was not today; what
// the status region says of a kept place, by its name; no words said of a
// passage held counting "places"; a
// continuation's mark's count in what it counts; a formatting form named by
// its one entry, a heading's level held to its word, a type the table lacks by
// its card's name, forms named together in the strip's order with each
// qualifier on its own form and each other hand's after the document's own —
// the forms the sets draw each by its form alone, the heading form "headings"
// whatever its levels, and one block's heading by its level — a form's act and
// take-off one pattern each, a form's Format menu title its name with its
// first letter capitalised, a line's place for a form's chord its act's name
// where no chord is bound, and no other entry spelling a form's name; a
// one-line hint's compact form its notice's first clause, cut from its
// template at its first em dash a space or a no-break space sets off, before
// its tokens are filled, the whole notice where it has none,
// is pinned or is marked whole, and every hint the page raises marked;
// the entries no design document carries are listed; and every accessible name the page
// sets is read from ST — none stands in the markup, and none is written as a
// literal in a module; and the words of a draft holding unsent typing are
// the decision's DRAFT strings.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { sep } from 'node:path';
import { STRINGS, t, tHTML, addressedHTML, facedHTML, pinned, lacking, isPinned, dated, lastRead, markCount, typeName, formName, formsNamed, formsAt, formAct, formTakeOff, formTitle, formAgain, hintOf } from './strings.js';

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
  assert.equal(pinned().length, 47, 'the thirty-six the reader\'s lanes pinned, the deletion face\'s three (issue #410), and the publication\'s eight (issue #440)');
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
  assert.equal(t('B3.answers_lost', { board: 'board 1', time: '2 minutes' }), 'board 1 has not answered this change for 2 minutes\u00a0— it may have reached board 1: send again checks, and sends it only if it did not');
});

test('the editor\'s lines stand as its design words them, in its characters — B3-S2\'s discard of what the head-unreadable hold keeps, B3-S4\'s orphan line at one link, B3-S11\'s draft side\'s one line and the leave line it shares, B3-S13\'s formatting lines — and the selection\'s chords as D5 words them (issue #438)', () => {
  /** @type {Array<[string, string, string]>} each line's id, the screen its entry's `screen` opens on, and its words */
  const LINES = [
    ['B3.head_unreadable.discard', 'B3-S2', 'discard what is held'],
    ['B3.head_unreadable.discard.compact', 'B3-S2', 'discard'],
    ['B3.head_unreadable.discard.name', 'B3-S2', 'discard what is held for ⟨label⟩'],
    ['B3.head_unreadable.discard.said.typed', 'B3-S2', 'if discarded, what is held here is never sent, and the words you typed in it are removed from this device for good; if left held, it is sent once ⟨board⟩ can take it'],
    ['B3.head_unreadable.discard.said', 'B3-S2', 'if discarded, what is held here is never sent; if left held, it is sent once ⟨board⟩ can take it'],
    ['B3.head_unreadable.discard.said.compact', 'B3-S2', 'if discarded, what is held here is never sent and its words are removed for good'],
    ['B3.deletion.links.1', 'B3-S4', '1\u00a0link on this passage leaves the current text with it\u00a0— undo, or this draft’s past states, puts the words and the link back'],
    ['B3.deletion.links.past.1', 'B3-S4', '1\u00a0link on this passage left the current text with it\u00a0— undo, or this draft’s past states, puts the words and the link back'],
    ['B3.merge.landed', 'B3-S11', 'nothing is published\u00a0— ⟨into⟩ keeps the merged words; undo takes them out'],
    ['B3.merge.scene.line.draft', 'B3-S11', 'merging ⟨label⟩ into your draft of ⟨D⟩\u00a0— undo takes it out; what needs a choice is listed first'],
    ['B3.merge.scene.line.draft.new', 'B3-S11', 'merging ⟨label⟩ into a new draft of ⟨D⟩\u00a0— undo takes it out; what needs a choice is listed first'],
    ['B3.notes.home', 'B3-S13', 'in Notes on ⟨draft⟩'],
    ['B3.format.again.off', 'B3-S13', '⟨chord⟩ again takes its mark off them'],
    ['B3.format.held', 'B3-S13', 'taken off with your next version\u00a0— then out of view at every version; a reader\'s “as published” switch still shows it where it stood'],
    ['B3.format.kept.set.made', 'B3-S13', 'kept in Formatting of ⟨label⟩, made for it —'],
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
    ['B3.format.levels-differ', 'B3-S13', 'levels differ'],
    ['B3.format.underline', 'B3-S13', 'there is no underline here\u00a0— to emphasise words, ⟨italic⟩ or ⟨bold⟩'],
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
  assert.equal(t('B3.format.cycle', { level: formName(HEADING, 2) }), 'heading\u00a02 — let go to set it', 'the held cycle\'s line in B3\'s example\'s words, its level one block\'s heading named');
  assert.equal(t('B3.format.underline', { italic: formName(ITALIC), bold: formName(BOLD) }), 'there is no underline here\u00a0— to emphasise words, italic or bold', 'Mod+U\'s answer as B3 words it, its forms named by their one names');
  assert.deepEqual([formName(HEADING, 2), formName(PARAGRAPH)].map((form) => t('B3.format.said', { form, 'first words': 'Tumbler' })), ['heading\u00a02 — “Tumbler”', 'paragraph — “Tumbler”'],
    'a level\'s spoken outcome is the outcome\'s one line with its block\'s form named, as B3 words its "heading ⟨n⟩" and "paragraph" forms');
  assert.equal(t('D5.slots'), 'annotate ⌘⇧A · quote ⌘⇧C · who wrote this? ⌘⇧O · who uses this? ⌘⇧R · see the links ⌘⇧L · follow ⌘↩ · read side by side ⌘⇧↩ · link to… ⌘K · format…');
  for (const id of ['B3.deletion.links', 'B3.deletion.links.past', 'B3.deletion.links.unread']) {
    assert.ok(!/[\u00a0’]/.test(STRINGS[id].text), `${id}: B3 sets it in plain characters, and the table keeps them`);
  }
});

test('the five lines the editor\'s screens draw that the table lacked stand as B3 words them — the mint\'s clause, the draft side\'s slot, the merge journal\'s label, the re-apply act\'s outcome at the marked draft and its datum while the scene stands — each apart from the longer line that shares its words (issue #440)', () => {
  assert.equal(t('B3.mint.stays'), 'it stays — you can remove its words, never the document');
  assert.equal(t('B3.merge.slot.draft'), 'publish all of it as the next version');
  assert.equal(t('B3.merge.records'), 'merges');
  assert.equal(t('B3.reapply.reopen'), 'open as you left it');
  assert.equal(t('B3.reapply.open-here'), 'open here');
  assert.notEqual(t('B3.reapply.reopen'), t('B3.reapply.open', { label: 'Tumbler' }), 'the marked draft\'s own outcome names no draft; the daughter\'s names the one it re-opens');
  assert.match(STRINGS['B3.merge.open-here'].screen, /reason/, 'the act\'s reason while the scene stands, beside the datum "open here"');
});

test('every line the editor\'s screens carry stands as B3 words it at the design\'s head, in its characters — the entry form\'s no-break space before an em dash where B3 sets one, its curly marks where it sets them — PINNED nowhere, DRAFT with B3 its source and its screen named (issue #440)', () => {
  /** @type {Array<[string, string, string]>} each line's id, the screen its entry's `screen` opens on, and its words */
  const LINES = [
    ['B3.mint.stays', 'B3-S1', 'it stays — you can remove its words, never the document'],
    ['B3.merge.slot.draft', 'B3-S11', 'publish all of it as the next version'],
    ['B3.merge.records', 'B3-S11', 'merges'],
    ['B3.reapply.reopen', 'B3-S11', 'open as you left it'],
    ['B3.reapply.open-here', 'B3-S1, B3-S11', 'open here'],
    ['B3.slot.capture.inert', 'B3-S1', 'a thought here goes public from a document of yours — quote it into a document of yours, then publish that — publishing asks what of it goes public'],
    ['B3.slot.notes.inert', 'B3-S1', 'this version publishes no notes document whole — to publish a note\'s words, quote them into a document of yours, then publish that — publishing asks what of it goes public'],
    ['B3.slot.merges.inert', 'B3-S1', 'merges keeps your private record of each merge\u00a0— what others see of a merge is the version it publishes and, where it merged a published version, that the new version supersedes it; this version of the client publishes no merge record'],
    ['B3.slot.formatting.inert', 'B3-S1', 'this version publishes no formatting set — where a document of yours quotes the words it formats, publishing that document asks whether your formatting goes with them'],
    ['B3.read-on-board', 'B3-S1', 'read it on ⟨board⟩\u00a0— ⟨board⟩ sees this read'],
    ['B3.launch.not-in', 'B3-S1', 'the passage your ⟨note | formatting⟩ is on is not in ⟨D⟩\'s current text — read version ⟨k⟩, the last that holds it'],
    ['B3.last-wrote.note', 'B3-S1', 'you last wrote a note on ⟨label⟩'],
    ['B3.last-wrote.formatting', 'B3-S1', 'you last formatted ⟨label⟩ — for you'],
    ['B3.notes.row', 'B3-S1', 'Notes on ⟨label⟩ — at your newest note'],
    ['B3.format.set.row', 'B3-S1', 'Formatting of ⟨label⟩ — at the words you last formatted'],
    ['B3.death.corner.stays', 'B3-S2', 'held on this device, never sent\u00a0— it stays here when this window closes; copy the text out to use it\u00a0— this device’s key no longer writes on ⟨board⟩'],
    ['B3.death.corner.unshown', 'B3-S2', 'held on this device, never sent\u00a0— this version of the app cannot show it once this window closes; copy the text out to use it\u00a0— this device’s key no longer writes on ⟨board⟩'],
    ['B3.death.copy', 'B3-S2', 'copy the text out'],
    ['B3.death.copied', 'B3-S2', 'copied'],
    ['B3.death.ending.shown', 'B3-S2', '— the words held on this device that were never sent are shown there too'],
    ['B3.death.ending.unshown', 'B3-S2', '— the words held on this device that were never sent stay there; this version of the app shows them only in the drafts still open in this window, and not after it closes'],
    ['B3.death.mark', 'B3-S2', 'words held on this device, never sent'],
    ['B3.hand.unread', 'B3-S2', '— its hand not read yet'],
    ['B3.undo.taken-back.cut', 'B3-S3', 'taken back from ⟨label⟩'],
    ['B3.paste.other-board', 'B3-S5', 'this passage is on ⟨board⟩\u00a0— a paste from another board is not offered in this version; to write about it, annotate it where it stands, or capture your own words here and link them to it'],
    ['B3.quote.other-board.inert', 'B3-S5', 'quoting from another board is not offered in this version — when it comes it places the same material here, never a copy; to write about this passage, annotate it — ⟨annotate chord⟩ — or write in your own words in a document of yours — ⟨capture chord⟩ captures them from here — and tie your note to it with link to…'],
    ['B3.link.hold-other', 'B3-S6', 'hold the other passage too\u00a0— open a document beside this one and select it there; for a note of yours, open its "in Notes on …" first, select the note there, then open this draft beside it and select this passage again'],
    ['B3.link.direction', 'B3-S6', 'from "⟨…⟩" to "⟨…⟩"'],
    ['B3.link.own-type.row', 'B3-S6', 'a type of your own — one of your documents, or a passage of yours by its address'],
    ['B3.link.set.private', 'B3-S6', 'into ⟨set label⟩ — ⟨its reader chip⟩'],
    ['B3.link.set.published', 'B3-S6', 'into ⟨E⟩ — public the moment it is made, and on the record for good'],
    ['B3.link.set.published.notebook', 'B3-S6', 'into ⟨E⟩ — public the moment it is made: readable by anyone who can reach this notebook, local while it stays unbound — and on the record for good'],
    ['B3.link.reach.member', 'B3-S6', 'by default it shows at every version that holds these words, an earlier one included'],
    ['B3.link.reach.set', 'B3-S6, B3-S12', 'by default it shows only where ⟨set⟩ applies — ⟨set⟩ itself and every page read with it, at every version that holds these words; on any other page it is an overlay other readers switch on'],
    ['B3.link.reach.pick', 'B3-S6', 'on the pages of this board it joins it is an overlay, off by default — other readers meet it there only by switching ⟨set⟩ on, unless a page\'s owner has that page read with ⟨set⟩ — and those owners cannot remove it'],
    ['B3.link.remedy', 'B3-S6', 'retracting it takes it out of today\'s view at every version; a reader\'s "as published" switch still shows it at the versions published while it stood, beside its retraction'],
    ['B3.link.far.private', 'B3-S6', '⟨document, with its owner⟩ stays private — readers see that a passage there is linked, and can read how long it is and where in that document it was written, not what it says'],
    ['B3.link.far.draft', 'B3-S6', 'once you publish those words as new, it stays on the draft\'s earlier words and readers meet it as withheld'],
    ['B3.link.type.private', 'B3-S6', 'typed by a private document of yours — readers see its address as their type, never what it says'],
    ['B3.link.lineage', 'B3-S6, B3-S12', 'the link it replaces stays public and active, marked superseded by this one for good — retracting this one does not undo that'],
    ['B3.link.private-arms', 'B3-S6', '— to keep a note on these words private, annotate them, or link from your draft of it'],
    ['B3.link.corner.yours', 'B3-S6', 'yours, on words not in this version'],
    ['B3.history.row.version', 'B3-S7', 'version ⟨k⟩ of ⟨E⟩'],
    ['B3.history.row.merged', 'B3-S7', 'merged ⟨alternative⟩ with version ⟨k⟩'],
    ['B3.history.row.merge-undone', 'B3-S7', 'the merge undone'],
    ['B3.history.row.withdrawn', 'B3-S7', 'the words kept, superseding nothing'],
    ['B3.history.row.withdrawn.draft', 'B3-S7', 'the words kept, as an ordinary draft'],
    ['B3.history.row.restored', 'B3-S7', 'set to how it stood ⟨time⟩'],
    ['B3.capture.own-piece', 'B3-S9', '· a piece of its own: type its first line in the address line'],
    ['B3.capture.record-stays', 'B3-S9', 'the captures record stays — it is a record of its own, not text'],
    ['B3.family.home-draft', 'B3-S10', 'your draft of your home document'],
    ['B3.key-record-stays', 'B3-S10', 'your key record stays — it is a record of its own, not text'],
    ['B3.held.publish.inert', 'B3-S10', '⟨label⟩ publishes by what you quote from it\u00a0— its edition holds the passages published so far; to publish another, quote it into a document of yours, then publish that'],
    ['B3.family.alternative-from', 'B3-S10', 'an alternative from ⟨time⟩ of ⟨label⟩'],
    ['B3.standing.daughter-line', 'B3-S10', 'published as version ⟨k.1⟩, beside version ⟨k+1⟩, the one ⟨E⟩\'s readers meet'],
    ['B3.publish.colophon', 'B3-S11 P2 (i)', 'their colophon is published with them — the page\'s address, its hash and the date you quoted it'],
    ['B3.publish.family', 'B3-S11 P2 (i)', '⟨n⟩ passages first written in ⟨D⟩ publish as ⟨E⟩\'s own words; ⟨D⟩ keeps a record of where they went, and shows them as published from this version on'],
    ['B3.publish.merges.inert', 'B3-S11 P2 (i)', 'a merge record stays private, so merges is never published\u00a0— leave these words out, or leave them private: readers see a placeholder'],
    ['B3.publish.origin-first.line', 'B3-S11 P2 (i)', 'publishing these words from ⟨origin⟩ first makes them public, and they stay published whether or not ⟨label⟩ is'],
    ['B3.publish.back', 'B3-S11 P2 (i)', 'back to publishing ⟨label⟩'],
    ['B3.publish.origin-first.step', 'B3-S11 P2 (i)', 'publishing ⟨origin⟩ first — then back to ⟨label⟩'],
    ['B3.publish.back.kept', 'B3-S11 P2 (i)', 'back to publishing ⟨label⟩ — your other answers there are kept'],
    ['B3.publish.replaces', 'B3-S11 P1', 'this replaces the publication you were holding — its answers are not kept'],
    ['B3.publish.leave-private', 'B3-S11 P2 (i)', 'leave it private — readers see a placeholder'],
    ['B3.publish.leave-private.line', 'B3-S11 P2 (i)', 'readers of version ⟨k⟩ meet a placeholder here — they see that a private passage of ⟨origin⟩ stands here, whose it is, how long it is and where in ⟨origin⟩ it was written, never what it says; version ⟨k⟩ keeps it so for good, and only a later version fills it, once those words of ⟨origin⟩ are published'],
    ['B3.publish.history', 'B3-S11 P2 (ii)', 'every later version of this page is public history from the moment it commits, for as long as this board retains it'],
    ['B3.publish.forever', 'B3-S11 P2 (ii)', 'what this publishes can never be made private again — afterwards the one remedy is a public "published in error" claim on the whole document, which leaves it readable'],
    ['B3.publish.stayed-private', 'B3-S11 P2 (iii)', '⟨n⟩ of your links and notes on these words stayed private when version\u00a0⟨k⟩ was published; they stay private with this version\u00a0— open their sets to publish any of them with this version'],
    ['B3.publish.provenance', 'B3-S11 P2 (iv)', 'what you typed here reads as written by you at this publication, and so do words you quoted as a copy — their colophon, published with them, says whose they were; what you windowed answers its origin'],
    ['B3.publish.count', 'B3-S11 P2 (vii)', 'this is one permanent public write — version ⟨k⟩ of ⟨E⟩ with ⟨l⟩ link(s) published with it, with ⟨n⟩ mark(s) of formatting published with it, with ⟨r⟩ mark(s) you took off retracted and with ⟨e⟩ mark(s) you edited published over their words as they now stand, each earlier form retracted, public the moment it commits; your draft then shows the published words'],
    ['B3.publish.count.claim', 'B3-S11 P2 (vii)', 'version ⟨k⟩ of ⟨E⟩, with its claim naming ⟨D⟩, with ⟨l⟩ link(s) published with it,'],
    ['B3.publish.count.supersede', 'B3-S11 P2 (vii)', 'version\u00a0⟨k+1⟩ of ⟨D⟩, with its claim that ⟨alternative⟩ is superseded by it, with ⟨l⟩ link(s) published with it,'],
    ['B3.publish.claim-line', 'B3-S11 P2 (vii)', 'its claim tells every reader of ⟨E⟩ that it was published from ⟨D⟩ — they see that draft\'s address and whose it is, never what it says'],
    ['B3.publish.edition.new', 'B3-S1, B3-S11', 'a new document'],
    ['B3.publish.edition.minted', 'B3-S11 P2 (vii)', 'the new document'],
    ['B3.publish.formatting-line', 'B3-S11 P3 (1)', 'the formatting of these words (⟨m⟩ marks) is published with them\u00a0— and where an earlier version holds the same words, it shows there too; retracting one takes it out of today’s view at every version, one link at a time; a reader’s "as published" switch still shows it at the versions published while it stood, beside its retraction'],
    ['B3.publish.formatting.retracted', 'B3-S11 P3 (1)', '⟨r⟩ marks you took off these words are retracted with this version\u00a0— out of today’s view at every version that shows them, and from your other documents that hold these words; a reader’s "as published" switch still shows each at the versions published while it stood'],
    ['B3.publish.formatting.edited', 'B3-S11 P3 (1)', '⟨e⟩ marks you edited are published over their words as they now stand, each earlier form retracted'],
    ['B3.publish.formatting.widened', 'B3-S11 P3 (1)', '; where one now also marks words an earlier version holds without it, it shows there too'],
    ['B3.publish.formatting.set-ends', 'B3-S11 P3 (1)', '; your formatting of these words in ⟨label⟩ ends with them'],
    ['B3.publish.formatting.set-came', 'B3-S11 P3 (1)', '; ⟨f⟩ of these came from Formatting of ⟨label⟩\u00a0— their edited forms are this draft’s now'],
    ['B3.publish.formatting.run-on', 'B3-S11 P3 (1)', '⟨n⟩ of these marks run on past the last word you publish — each is published up to it, the rest staying in your draft'],
    ['B3.publish.formatting.part', 'B3-S11 P3 (1)', '⟨n⟩ of these marks are published without the part you took off'],
    ['B3.publish.caveat.marks', 'B3-S11 P3 (1)', 'these marks may be this machine\'s writes, not yours — this board admits that write whenever local trust is on, and this surface cannot read whether it was.'],
    ['B3.publish.row.switch', 'B3-S11 P3 (2)', 'publish these ⟨n⟩ links with the text — into ⟨destination⟩'],
    ['B3.publish.row.switch.formatting', 'B3-S11 P3 (2)', 'publish this formatting with the text\u00a0— into ⟨destination⟩'],
    ['B3.publish.row.formatting-ends', 'B3-S11 P3 (2)', '— your formatting of these words in ⟨label⟩ stays while its copy stands, and ends with it'],
    ['B3.publish.row.line', 'B3-S11 P3 (2)', 'public and permanent, like the text — each a fresh public link to every reader, its tie to your private original a record only ⟨set⟩\'s readers can read — anyone can tell that a private original stands behind each, never where; ⟨p⟩ of them point into ⟨private documents, each with its owner⟩, which stay private — readers see that a passage there is linked, and can read how long it is and where in that document it was written, not what it says, and, where one points at a link there rather than a passage, that a link there exists, and how many that document holds at least; ⟨d⟩ of them point at words of this draft you are not publishing — readers see that a passage of this draft is linked there, how long it is and where in your drafting it was written, not what it says — and once you publish those words as new, each stays on the draft\'s earlier words and readers meet it as withheld, its original offered again with those words and, switched on, published then whole beside this copy; ⟨c⟩ of these run on past the last word you publish — each is published up to it, the rest staying private with your draft, and is offered again when you publish the rest and, switched on, published then whole beside this part; to publish one whole, widen what you publish to its words; ⟨t⟩ of them are typed by a private document of yours — readers see its address as their type, never what it says; a public copy of each is published into ⟨destination⟩ — your originals stay in ⟨set⟩, each marked as published by its copy, and are not offered again — save ⟨c⟩\'s and ⟨d⟩\'s, as above'],
    ['B3.publish.row.notes', 'B3-S11 P3 (2)', '⟨a⟩ of them link these words to your notes, whose words stay private — readers see that each links to a note of yours, and can read how long the note is and where in ⟨set⟩ it was written, not what it says'],
    ['B3.publish.row.reoffered', 'B3-S11 P3 (2)', '⟨n⟩ of these were published before — their first copies stay, and readers meet each as withheld; retract each at its card, at its mark in this draft: after publishing, a reader\'s "as published" switch still shows each at this version, beside its retraction; to keep them from this version too, cancel and retract them first; or leave this off and move each first copy\'s end publicly at its card; left off, this document offers none again while these words stay in its versions\u00a0— to publish one later, make the link again'],
    ['B3.publish.row.reoffered.part', 'B3-S11 P3 (2)', '⟨n⟩ of these were published before, in part — their first copies stay, and readers meet both over the words each covers; retract each at its card, at its mark in this draft: after publishing, a reader\'s "as published" switch still shows each at this version, beside its retraction; to keep them from this version too, cancel and retract them first; or leave this off and move each first copy\'s end publicly at its card; left off, this document offers none again while these words stay in its versions\u00a0— to publish one later, make the link again'],
    ['B3.publish.row.reoffered.notes', 'B3-S11 P3 (2)', 'annotate these words again'],
    ['B3.publish.row.reoffered.both', 'B3-S11 P3 (2)', 'make the link again, or annotate these words again for a note'],
    ['B3.publish.row.move-end', 'B3-S11 P3 (2)', '— or leave this off and move the first copy\'s end publicly at its card'],
    ['B3.publish.row.revises', 'B3-S11 P3 (2)', '⟨u⟩ of these revise links already published — to publish the revision, revise the published copy at its page, or, where you took that copy back, make the link again'],
    ['B3.publish.destination', 'B3-S11 P3 (2)', '⟨E⟩ (this document — version ⟨k⟩, the one being published)'],
    ['B3.publish.destination.first', 'B3-S11 P3 (2)', '(version 1, the one being published)'],
    ['B3.publish.destination.line', 'B3-S11 P3 (2)', 'in ⟨E⟩ these links are published with version ⟨k⟩ and live under its address; by default they show at every version that holds their words, an earlier one included — a reader\'s "as published" switch shows each version its own; retracting one takes it out of today\'s view at every version, one link at a time; a reader\'s "as published" switch still shows it at the versions published while it stood, beside its retraction'],
    ['B3.publish.destination.other', 'B3-S11 P3 (2)', 'another published document of yours'],
    ['B3.publish.destination.other.line', 'B3-S11 P3 (2)', 'shown at every version read with it, an earlier one included — retracting one takes it out of today\'s view at every version, one link at a time; a reader\'s "as published" switch still shows it at the versions published while it stood, beside its retraction — the link and its retraction staying on the record'],
    ['B3.publish.destination.read-with', 'B3-S11 P3 (2)', '— and ⟨E⟩ is then read with all of ⟨S⟩: every reader of ⟨E⟩, at every version of it, sees ⟨S⟩\'s links on its words by default, its later links there too, until you retract "read ⟨E⟩ with ⟨S⟩" at ⟨E⟩\'s links card; where you retracted one before, this writes it again'],
    ['B3.publish.row.off', 'B3-S11 P3 (2)', 'stays private — these links stay on this draft\'s earlier words; you read them on the published text through this publication\'s record, as does every reader of both ⟨set⟩ and this draft who switches ⟨set⟩ on'],
    ['B3.publish.no-one-else', 'B3-S11 P3', 'no one else does'],
    ['B3.publish.row.off.again', 'B3-S11 P3 (2)', '— and your next version offers them again'],
    ['B3.publish.row.off.others', 'B3-S11 P3 (2)', '— and your next version offers the others again'],
    ['B3.publish.row.readers', 'B3-S11 P3 (2)', 'moves privately — read by you and ⟨reviewer⟩'],
    ['B3.publish.row.on-published', 'B3-S11 P3 (2)', '⟨w⟩ of these were made on words already published — they stay on those words and show there for you — and, switched on, for every reader of ⟨set⟩: ⟨its reader chip⟩'],
    ['B3.publish.row.compact', 'B3-S11 P3 (2)', '⟨set label⟩ · private · ⟨n⟩ links that stayed private when version\u00a0⟨k⟩ was published'],
    ['B3.publish.row.on', 'B3-S11 P3 (2)', '⟨set label⟩ on\u00a0— what it publishes is shown whole beside its switch'],
    ['B3.publish.row.folded', 'B3-S11 P3 (2)', '⟨o⟩ more that stayed private when version\u00a0⟨k⟩ was published'],
    ['B3.publish.public.overlay', 'B3-S11 P3 (3)', '⟨S⟩\'s links show on ⟨E⟩ as an overlay, off by default — readers meet them only by switching ⟨S⟩ on; to make them its default, read ⟨E⟩ with ⟨S⟩ at ⟨E⟩\'s links card'],
    ['B3.publish.public.off', 'B3-S11 P3 (3)', '⟨S⟩\'s ⟨q⟩ links on the new words stay on this draft\'s earlier words — public links, pointing at text only this draft\'s readers can read — ⟨its reader chip⟩'],
    ['B3.publish.public.into', 'B3-S11 P3 (3)', '⟨set⟩ publishes into ⟨S⟩, so ⟨E⟩ is read with all of ⟨S⟩ — only its ⟨q⟩ links on the new words stay behind'],
    ['B3.publish.private-move', 'B3-S11 P3', '⟨c⟩ of your links and notes on these words stay on this draft\'s earlier words, in ⟨sets⟩, and show on the published text for you — and, switched on, for every reader of both ⟨set⟩ and this draft: ⟨its reader chip⟩'],
    ['B3.publish.others-links', 'B3-S11 P3', 'any links others made on these words stay on this draft\'s earlier words; readers who cannot read this draft meet them there, withheld'],
    ['B3.publish.own-links', 'B3-S11 P3', '⟨n⟩ of ⟨E⟩\'s own links on these words stay on this draft\'s earlier words — readers meet them as withheld, though these words are now public in version ⟨k⟩; you see each at its counterpart, marked so'],
    ['B3.publish.route', 'B3-S11 P3', 'to publish some of these and not others, move the others to another document of yours first'],
    ['B3.publish.venue', 'B3-S11 P4', 'readable now by anything on this machine, and nothing beyond it'],
    ['B3.publish.command.all', 'B3-S11 P4', 'publish all of this draft as version ⟨k⟩ of ⟨D⟩ — it can never be made private again'],
    ['B3.publish.command.selected', 'B3-S11 P4', 'publish the ⟨n⟩ passages you selected as version ⟨k⟩ of ⟨D⟩ — it can never be made private again'],
    ['B3.publish.command.selected.alone', 'B3-S11 P4', 'publish the ⟨n⟩ passages you selected as version ⟨k⟩ of ⟨D⟩ — it holds them alone, nothing else of version ⟨k−1⟩; it can never be made private again'],
    ['B3.publish.command.beside', 'B3-S11 P4', 'publish all of this draft beside version ⟨k+1⟩ of ⟨D⟩, as version ⟨k.1⟩ — ⟨D⟩\'s own address keeps showing version ⟨k+1⟩; it can never be made private again'],
    ['B3.publish.origins.inert', 'B3-S11 P4', 'decide what of ⟨origin⟩ goes with this version: publish ⟨origin⟩ first, leave those words out, or keep them private — readers see a placeholder naming whose they are, how long they are and where in ⟨origin⟩ they were written'],
    ['B3.publish.merge-kept', 'B3-S11 P5', '· this merge’s record kept in "merges"'],
    ['B3.publish.merge-kept.first', 'B3-S11 P5', '· this merge’s record kept in "merges", made now to keep a private record of each merge you publish'],
    ['B3.publish.placeholder-mark', 'B3-S11 P5', 'in version ⟨k⟩ as a placeholder — withheld for its readers'],
    ['B3.publish.published-as', 'B3-S11 P5, B3-S12', 'published as ⟨copy⟩ in ⟨destination⟩'],
    ['B3.publish.published-as.version', 'B3-S11 P5, B3-S12', 'published as ⟨copy⟩ in ⟨destination⟩ with version ⟨j⟩'],
    ['B3.publish.copy-row', 'B3-S12', 'in ⟨destination⟩ (published)'],
    ['B3.publish.copy-row.version', 'B3-S11 P5, B3-S12', 'in ⟨destination⟩ (published with version ⟨j⟩)'],
    ['B3.publish.counterpart.backward', 'B3-S11 P5', 'on version ⟨k⟩\'s words — shown here at ⟨D⟩\'s earlier words they were published from'],
    ['B3.reapply.merged', 'B3-S1, B3-S11', 'merged into version ⟨j⟩'],
    ['B3.merge.line.head', 'B3-S11', 'its next version supersedes ⟨alternative⟩'],
    ['B3.merge.undo.inherited', 'B3-S11', 'nothing to undo: this draft inherited the merge when it was staged; discard it or edit it'],
    ['B3.merge.no-claim.draft', 'B3-S11 P2 (vi)', 'this draft\'s merge ends with it; to merge ⟨label⟩ with version ⟨k+1⟩, cancel and re-apply to the head'],
    ['B3.merge.behind.ending', 'B3-S11 P4', '— ⟨alternative⟩ is not marked superseded; it can never be made private again'],
    ['B3.merge.statement', 'B3-S11 P2', 'this publishes all of this draft as version\u00a0⟨k+1⟩ of ⟨D⟩\u00a0— ⟨alternative⟩ stays readable at its own address and is marked superseded by it for good; to publish these words with no such mark, cancel and take "keep the words, supersede nothing" at this draft’s corner first'],
    ['B3.merge.places', 'B3-S11 P2', '⟨n⟩ places stand as the merge placed them:'],
    ['B3.merge.placed.order', 'B3-S11 P2', 'version ⟨k⟩\'s first'],
    ['B3.merge.placed.after', 'B3-S11 P2', 'after "⟨words⟩"'],
    ['B3.merge.placed.both', 'B3-S11 P2', 'both, version ⟨k⟩\'s first'],
    ['B3.merge.placed.moves', 'B3-S11 P2', 'as ⟨side⟩ ordered them'],
    ['B3.merge.command', 'B3-S11 P4', 'publish all of this draft as version ⟨k+1⟩ of ⟨D⟩ — ⟨alternative⟩ stays readable at its own address and is marked superseded by it for good — nothing of yours takes that mark back; it can never be made private again'],
    ['B3.merge.cap', 'B3-S11', '⟨alternative⟩ merged with version ⟨k⟩ would be in more pieces than one publication can carry — ⟨n⟩, where ⟨cap⟩ is the most; nothing was merged. To bring its words in, paste them into ⟨label⟩ — retyping a passage there as new words joins its pieces, at the cost of the links on them'],
    ['B3.card.retract.line', 'B3-S12', 'retracting takes this link out of today\'s view, at every version — the link\'s record stays, and so does the retraction, at ⟨the target⟩\'s history; a reader\'s "as published" switch still shows it at the versions published while it stood, beside its retraction'],
    ['B3.card.retract.reader', 'B3-S12', 'the "as published" switch of whoever reads ⟨set label⟩'],
    ['B3.card.retract.public', 'B3-S12', 'and this retraction is public, like the link'],
    ['B3.card.retract.copy', 'B3-S12', 'your private original stays where it is and still shows for you\u00a0— it is not offered at your next version, save at a version that brings in words of it this copy does not reach; to publish it again otherwise, make the link again'],
    ['B3.card.retract.copy.again', 'B3-S12', '; to publish it again, make the link again'],
    ['B3.card.retract.copy.other', 'B3-S12', '; its other copy, in ⟨destination⟩, covers its words, and every reader still meets it'],
    ['B3.card.retract.rest', 'B3-S12', '— its part on words ⟨label⟩ has not yet published stays there'],
    ['B3.card.retract.set', 'B3-S12', '— your formatting of these words in ⟨label⟩ ends with it'],
    ['B3.card.retract.set.rest', 'B3-S12', '— your formatting of these words in ⟨label⟩ ends with it; on words you never published, it stays'],
    ['B3.card.retract.note-copy', 'B3-S12', 'to publish the note again otherwise, annotate these words again — your next version offers that new note, its words private as this one\'s are, and you see both until you retract the original'],
    ['B3.card.retract.note-original', 'B3-S12', 'your published copy stays in ⟨destination⟩ and every reader still meets it — to take it back, retract it at its own card'],
    ['B3.card.retract.note-original.two', 'B3-S12', 'your published copies stay, in ⟨destination⟩ with version ⟨j⟩ and in ⟨destination⟩ with version ⟨j′⟩, and every reader still meets both — to take one back, retract it at its own card'],
    ['B3.card.retract.note', 'B3-S12', '— your note stays in ⟨label⟩ as words of its own, tied to no passage once this goes'],
    ['B3.card.move.readers', 'B3-S12', '⟨readers⟩ read ⟨destination⟩ and will see that ⟨source⟩ holds this link, and what it says'],
    ['B3.card.move.public', 'B3-S12', 'a copy goes into ⟨set⟩ — the original stays public in ⟨its set⟩, and every reader still meets it, until you retract it'],
    ['B3.card.move.public.superseded', 'B3-S12', '— and from now on marked superseded by the copy, for good, whatever you retract later'],
    ['B3.card.link-to.inert.beside', 'B3-S12', 'hold the other passage too — open the document it is in beside this one from the address line, select it there, then open this card again at its symbol'],
    ['B3.card.link-to.peek', 'B3-S12', 'then peek at the passage\'s links and open this card again at its symbol'],
    ['B3.card.in-error.confirm', 'B3-S12', 'this files a public claim that ⟨E⟩ was published in error — the claim names the whole document, not this version — permanent, never withdrawn, and supersedable — and only ⟨claimant⟩ can supersede it, so if you lose every key nothing lifts it, ever. It reveals nothing back: ⟨E⟩ stays readable. For a wrong passage in a document that is otherwise right, publish its next version without the passage — it leaves what every reader meets and stays readable at this version, forever'],
    ['B3.format.slot.others', 'B3-S13', 'format for you\u00a0— the selection'],
    ['B3.format.slot.others.focus', 'B3-S13', 'format for you\u00a0— “⟨first words⟩”'],
    ['B3.format.hand', 'B3-S13', '⟨form⟩\u00a0— ⟨owner⟩’s'],
    ['B3.format.show.owner', 'B3-S13', 'show ⟨owner⟩’s formatting'],
    ['B3.format.show.yours', 'B3-S13', 'show your formatting'],
    ['B3.no-notebook', 'B3-S13', '⟨a note | a link | your formatting | what you write⟩ is kept in a notebook of your own\u00a0— no board on this machine is yours until you claim one'],
    ['B3.no-notebook.back', 'B3-S13', 'back to ⟨label⟩'],
    ['B3.no-notebook.back.act', 'B3-S13', 'back to ⟨label⟩\u00a0— ⟨the act⟩ these words'],
    ['B3.no-notebook.back.capture', 'B3-S13', 'back to ⟨label⟩\u00a0— capture your thought'],
    ['B3.format.set.label', 'B3-S13', 'Formatting of ⟨label⟩'],
    ['B3.format.stands', 'B3-S13', '⟨hand⟩’s ⟨form⟩ stands\u00a0— to read without it, switch off ⟨hand⟩’s formatting for this session'],
    ['B3.format.switch-off', 'B3-S13', 'switch it off for this session'],
    ['B3.format.kept.set.others', 'B3-S13', 'kept in Formatting of ⟨label⟩\u00a0— only you see it; ⟨owner⟩’s document is unchanged'],
    ['B3.format.said.set', 'B3-S13', '⟨form⟩ for you\u00a0— “⟨first words⟩”, in Formatting of ⟨label⟩'],
    ['B3.format.take-it-off', 'B3-S13', 'take it off'],
    ['B3.format.card.on', 'B3-S13', 'on ⟨its words⟩'],
    ['B3.format.precedence', 'B3-S13', 'where these sets’ formatting differs, yours is drawn, then ⟨owner⟩’s, then the rest in this list’s order'],
    ['B3.format.precedence.yours', 'B3-S13', 'yours\u00a0— drawn over ⟨owner⟩’s where they differ'],
    ['B3.format.taken-off', 'B3-S13', 'taken off with version\u00a0⟨k⟩\u00a0— out of today’s view at every version, and on the record for good: a reader’s "as published" switch still shows it at the versions published while it stood; putting it back makes a new mark, published with your next version'],
    ['B3.format.kept.set', 'B3-S13', 'kept in Formatting of ⟨label⟩\u00a0— only you see it'],
    ['B3.format.kept.set.compact', 'B3-S13', 'kept in Formatting of ⟨label⟩'],
    ['B3.format.kept.set.made', 'B3-S13', 'kept in Formatting of ⟨label⟩, made for it\u00a0—'],
    ['B3.format.in.set', 'B3-S13', 'in Formatting of ⟨label⟩ (private)'],
    ['B3.format.taken-off.set', 'B3-S13', 'taken off in Formatting of ⟨E⟩'],
    ['B3.publish.cap.links', 'B3-S11 P3', '⟨n⟩ links is more than one version can publish at once\u00a0— switch some sets off, or publish the rest with your next version, which lists them as having stayed private at this one'],
  ];
  assert.equal(new Set(LINES.map(([id]) => id)).size, LINES.length, 'each line once');
  for (const [id, screen, text] of LINES) {
    const e = STRINGS[id];
    assert.ok(e, id + ' entered');
    assert.deepEqual({ text: e.text, cls: e.cls, source: e.source, screen: e.screen?.split(':')[0] }, { text, cls: 'DRAFT', source: 'designs/B3-editor.md', screen }, id);
  }
  /** @type {Array<[string, string]>} the refraction's three B1 drafts, drawn at the editor's publication too */
  const B1_LINES = [
    ['B1.counterpart', 'on ⟨D⟩\'s earlier words — shown here at their counterpart in version ⟨k⟩'],
    ['B1.counterpart.withheld', 'readers of ⟨S⟩ who cannot read this draft see this as withheld'],
    ['B1.counterpart.unread', 'your notes from the draft are not shown here — reading them failed'],
  ];
  for (const [id, text] of B1_LINES) {
    assert.deepEqual({ text: STRINGS[id]?.text, cls: STRINGS[id]?.cls, source: STRINGS[id]?.source }, { text, cls: 'DRAFT', source: 'designs/B1-reader.md' }, id);
    assert.match(STRINGS[id].screen ?? '', /^B1-S5\b.*B3-S11/, id + ' names the reader\'s card and the editor\'s publication');
  }
  assert.equal(t('B3.publish.command.all', { k: 2, D: 'Tumbler' }), 'publish all of this draft as version 2 of Tumbler — it can never be made private again', 'the whole-draft command in general, its first version at the home its instance');
  assert.equal(t('B3.format.stands', { hand: 'Acme', form: formName(BOLD) }), 'Acme’s bold stands\u00a0— to read without it, switch off Acme’s formatting for this session', 'B3\'s example, its form filled by its one name');
  assert.equal(t('B3.format.hand', { form: formName(ITALIC), owner: 'Acme' }), 'italic\u00a0— Acme’s');
});

test('no line B3 has retired or re-said stands in the table — the merge journal\'s doc-1 lines and the visit gate\'s head (E2; S8-6), the drawn original\'s face, mark and undo line (E3), the death\'s corner as it stood (E5), the formatting set\'s lines under the notes document\'s name — and the entries that kept their words name the site B3 draws them at (issue #440)', () => {
  for (const id of ['B3.merge.records.list', 'B3.merge.unlooked', 'B3.undo.original', 'B3.format.original.first', 'B3.format.original', 'B3.death.corner',
    'B3.format.kept.notes', 'B3.format.kept.notes.compact', 'B3.format.kept.notes.made', 'B3.format.in.notes', 'B3.format.taken-off.notes',
    'B3.publish.needs-key', 'B3.card.published-in-error']) {
    assert.ok(!(id in STRINGS), id + ' gone');
  }
  const retired = /records of merges|not yet looked at|your own original of|does not bring back your own original|copy the text out to use it now/;
  assert.deepEqual(Object.entries(STRINGS).filter(([, e]) => retired.test(e.text)).map(([id]) => id), [], 'no entry keeps a retired line\'s words');
  assert.deepEqual(Object.entries(STRINGS).filter(([id, e]) => id.startsWith('B3.format.') && /Notes on/.test(e.text)).map(([id]) => id), [], 'a formatting mark lives in the person\'s formatting set, never in the notes document');
  assert.equal(t('B3.format.taken-off', { k: 3 }), 'taken off with version\u00a03\u00a0— out of today’s view at every version, and on the record for good: a reader’s "as published" switch still shows it at the versions published while it stood; putting it back makes a new mark, published with your next version');
  assert.ok(t('B3.publish.cap.links').endsWith(', which lists them as having stayed private at this one'), 'the links cap\'s face with its tail');
  assert.match(STRINGS['B3.format.unseen'].screen, /formatting set/);
  assert.match(STRINGS['B3.merge.line.supersedes'].screen, /member's corner/);
  assert.match(STRINGS['B3.link.own-type'].screen, /face/);
});

test('every line the editor\'s design added or re-said on 2026-11-09 stands as it words it, in its characters — the copy ledger\'s sections P, Q and R and the entries they re-said, each where B3 draws it, the no-break space before an em dash where B3 sets one; the durability face off the notebook from foundations, the one file that carries it; and each form named by its one name, never spelled (issue #517)', () => {
  /** @type {Array<[string, string, string]>} each line's id, the screen its entry's `screen` opens on, and its words */
  const LINES = [
    ['B3.save.held', 'B3-S1', 'nothing to save\u00a0— held on this device and sent when your notebook answers'],
    ['B3.save.held.board', 'B3-S1', 'nothing to save — not yet kept — held on this device and sent when ⟨board⟩ can be reached'],
    ['B3.last-published', 'B3-S1', 'you last published ⟨label⟩'],
    ['B3.tab.exit', 'B3-S1', 'Tab types a tab here\u00a0— Esc, then Tab, leaves the text'],
    ['B3.last-wrote.note.dead-end', 'B3-S1', 'you last wrote a note on ⟨label⟩\u00a0— its passage is not in the current text'],
    ['B3.caveat.mark', 'B3-S1', 'which key wrote here?'],
    ['B3.moved.compact', 'B3-S2', 'changed while this text was held\u00a0— not placed · by ⟨hand⟩'],
    ['B3.moved.see-held', 'B3-S2', 'see the held text'],
    ['B3.moved.first-key', 'B3-S2', 'this document changed while your text was held\u00a0— what you type now is held with it and placed by hand'],
    ['B3.answers_lost', 'B3-S2', '⟨board⟩ has not answered this change for ⟨time⟩\u00a0— it may have reached ⟨board⟩: send again checks, and sends it only if it did not'],
    ['B3.place-at-caret', 'B3-S2', 'place at the caret'],
    ['B3.place-at-caret.inert', 'B3-S2', 'put the caret where these words go in your current text, then take this'],
    ['B3.moved.send-again.inert', 'B3-S2', 'place these words where they go, or discard them\u00a0— it can be sent as it stands only if ⟨label⟩ changes back, by an undo where that change was made'],
    ['B3.held.none', 'B3-S2', 'nothing is held for ⟨label⟩ now\u00a0— Esc closes this'],
    ['B3.island', 'B3-S2', 'a fault in this client, not a change to your text: nothing was written or held — closing this window loses it; keep the window open, or copy these words out'],
    ['B3.copy-words-out', 'B3-S2', 'copy these words out'],
    ['B3.held_full.refused', 'B3-S2', 'the text held for your notebook is at its limit; this change waits\u00a0— send again once what is held is sent'],
    ['B3.unwritable', 'B3-S2', 'this device could not keep it: ⟨cause⟩'],
    ['B3.unwritable.full', 'B3-S2', '— closing this window loses it; this device\'s disk is full\u00a0— what you have typed is held on this device as soon as there is room; copy the text out'],
    ['B3.durability', 'B3-S2', 'your notebook could not keep that yet\u00a0— trying again'],
    ['B3.durability.store.notebook', 'B3-S2', 'your notebook\'s store is not keeping writes\u00a0— free space on this device, then restart your notebook here'],
    ['B3.durability.store', 'B3-S2', '⟨board⟩\'s store is not keeping writes\u00a0— its disk needs attention'],
    ['B3.death.retired', 'B3-S2', 'this device\'s key was retired from ⟨account⟩ by ⟨device label⟩\u00a0— reading goes on; writing needs a key you hold'],
    ['B3.undo.in-error.way', 'B3-S3', 'take “published in error” at its corner\u00a0— pin the version at ○ to reach it'],
    ['B3.undo.withheld', 'B3-S3', 'the source of this passage is withheld from you now\u00a0— ⟨origin⟩; the words cannot be put back as the same words'],
    ['B3.undo.said.put-back', 'B3-S3', 'put back\u00a0— “⟨first words⟩”'],
    ['B3.undo.said.taken-out', 'B3-S3', 'taken out\u00a0— “⟨first words⟩”'],
    ['B3.undo.said.put-back.in', 'B3-S3', 'put back in ⟨label⟩\u00a0— “⟨first words⟩”'],
    ['B3.undo.said.taken-out.in', 'B3-S3', 'taken out of ⟨label⟩\u00a0— “⟨first words⟩”'],
    ['B3.deletion.private', 'B3-S4', 'you alone can still reach what you remove'],
    ['B3.deletion.edition', 'B3-S4', 'the edition of ⟨label⟩ holds these words\u00a0— taken out, they leave its next version; undo keeps them here; to use them elsewhere, copy rather than cut'],
    ['B3.deletion.read-earlier', 'B3-S4', 'read it as it stood'],
    ['B3.removed-here', 'B3-S4', 'removed here'],
    ['B3.quote.published', 'B3-S5', 'these words are already published in ⟨E.j⟩\u00a0— window them from version ⟨j⟩'],
    ['B3.quote.published.other', 'B3-S5', 'these words are published in ⟨E.j⟩ by ⟨owner⟩\u00a0— window them from version ⟨j⟩'],
    ['B3.quote.published.act', 'B3-S5, B3-S11 P2 (i)', 'window them from version ⟨j⟩'],
    ['B3.quote.into', 'B3-S5', 'quote by transclusion into…'],
    ['B3.quote.into.writing', 'B3-S5', '⟨label⟩, where you were writing'],
    ['B3.quote.into.end', 'B3-S5', '⟨label⟩, at its end'],
    ['B3.quote.filter', 'B3-S5', 'type a draft\'s first words'],
    ['B3.paste.other-board.annotate', 'B3-S5', 'annotate it on ⟨board⟩'],
    ['B3.link.made', 'B3-S6', 'linked · ⟨type⟩ · ⟨address⟩'],
    ['B3.link.enter', 'B3-S6', 'linked privately\u00a0— kept in ⟨home⟩; Enter makes nothing public here\u00a0— Tab to make the link publicly'],
    ['B3.link.make', 'B3-S6', 'make the link'],
    ['B3.link.publicly', 'B3-S6', 'make the link publicly'],
    ['B3.link.hold-other.act', 'B3-S6', 'open a document beside this one'],
    ['B3.link.corner.yours.row', 'B3-S6', '⟨first words | form | type⟩\u00a0— in version ⟨k⟩'],
    ['B3.history.not-last', 'B3-S7', 'one of ⟨n⟩ changes that minute, not the last'],
    ['B3.history.as-of', 'B3-S7', 'as it stood ⟨time⟩'],
    ['B3.history.nothing-to-set', 'B3-S7', '— nothing to set'],
    ['B3.history.read-only', 'B3-S7', 'a past state is read, never edited\u00a0— to bring its words into the current text, put a removed passage back, or quote it'],
    ['B3.history.held', 'B3-S2, B3-S7', 'what you typed while it was held\u00a0— not on the board'],
    ['B3.history.links.arriving', 'B3-S7', 'links\u00a0— arriving'],
    ['B3.capture.keep', 'B3-S9', 'keep the thought'],
    ['B3.standing.behind', 'B3-S10', 'written on version ⟨k⟩ of ⟨E⟩\u00a0— version ⟨k+1⟩ is the head, published since from your draft from ⟨time⟩'],
    ['B3.standing.daughter', 'B3-S10, B3-S11', 'version ⟨k+1⟩ was published from your draft from ⟨time⟩; yours stands beside it as version ⟨k.1⟩\u00a0— readers of ⟨E⟩ meet version ⟨k+1⟩; to bring these words into its next version, re-apply to the head merges them with the head\'s text for you to check before anything is published, or paste them into your draft of it and publish that'],
    ['B3.standing.daughter.paste', 'B3-S10', 'to bring these words into its next version, paste them into your draft of it and publish that'],
    ['B3.standing.before-1.beside', 'B3-S10, B3-S11', 'begun before version 1\u00a0— it publishes beside it'],
    ['B3.family.begun-from.draft', 'B3-S10', 'begun from your draft of it'],
    ['B3.family.alternative-of.draft', 'B3-S10', 'an alternative of your draft of it'],
    ['B3.family.draft-of-it', 'B3-S10, B3-S11', 'your draft of it'],
    ['B3.held.publish.inert.rest', 'B3-S10', 'publishing asks what of it goes public; to take a passage off what its readers meet\u00a0— it stays readable at the versions that held it\u00a0— select the passages it should keep, then publish them here'],
    ['B3.reapply.into', 'B3-S10, B3-S11', 'into your draft of it'],
    ['B3.daughter.head', 'B3-S10, B3-S11', 'your version landed beside the newer one'],
    ['B3.daughter.row.read', 'B3-S10, B3-S11', 'your draft of it · read beside'],
    ['B3.daughter.row.reapply', 'B3-S10, B3-S11', 'into your draft of it · version ⟨k+1⟩ is the head · re-apply to the head'],
    ['B3.daughter.leave', 'B3-S10, B3-S11', 'or leave it as version ⟨k.1⟩ beside version ⟨k+1⟩'],
    ['B3.publish.step', 'B3-S11', 'publishing ⟨label⟩ · ⟨i⟩ of 4'],
    ['B3.publish.held-since', 'B3-S11 P1', 'held since ⟨time⟩\u00a0— Enter continues it'],
    ['B3.publish.selection.all', 'B3-S11 P1', 'all of ⟨label⟩'],
    ['B3.publish.selection.passages', 'B3-S11 P1', '⟨n⟩ passages of ⟨label⟩'],
    ['B3.publish.summary', 'B3-S11 P2', 'one write · version ⟨k⟩ of ⟨E⟩ · ⟨m⟩ marks · ⟨o⟩ origins to decide · ⟨c⟩ copies'],
    ['B3.publish.summary.marks-so-far', 'B3-S11 P2', '⟨m⟩ marks so far'],
    ['B3.publish.reveal.public', 'B3-S11 P2', 'what goes public'],
    ['B3.publish.reveal.for-good', 'B3-S11 P2', 'for good'],
    ['B3.publish.reveal.not-carried', 'B3-S11 P2', 'what does not carry'],
    ['B3.publish.reveal.whose', 'B3-S11 P2', 'whose words these are'],
    ['B3.publish.reveal.own', 'B3-S11 P2', 'a document of its own'],
    ['B3.publish.reveal.later', 'B3-S11 P2', 'what later versions add'],
    ['B3.publish.reveal.count', 'B3-S11 P2', 'the count'],
    ['B3.publish.extent', 'B3-S11 P2 (i)', '⟨n⟩ paragraphs\u00a0— “⟨first words⟩” to “⟨last words⟩”'],
    ['B3.publish.copies', 'B3-S11 P2 (i)', '⟨c⟩ quoted copies\u00a0— their colophons'],
    ['B3.publish.copies.1', 'B3-S11 P2 (i)', '1 quoted copy\u00a0— its colophon'],
    ['B3.publish.leave-out', 'B3-S11 P2 (i)', 'leave these words out'],
    ['B3.publish.placeholder.fills', 'B3-S11 P2 (i)', '— version ⟨k⟩ shows a placeholder here; windowing them fills it in this version'],
    ['B3.publish.placeholder.fills.side', 'B3-S11 P2 (i), the merge scene', '— version ⟨k.m⟩ shows a placeholder here; windowing them fills it in this version'],
    ['B3.publish.placeholder.fills.both', 'B3-S11 P2 (i), the merge scene', '— versions ⟨k⟩ and ⟨k.m⟩ show a placeholder here; windowing them fills it in this version'],
    ['B3.publish.answered.counterpart', 'B3-S11 P2 (i)', '— your ⟨m⟩ marks on these words are published with them, and your ⟨l⟩ links on them are offered next'],
    ['B3.publish.answered.private', 'B3-S11 P2 (i)', '— your formatting on these words stays in your draft until a version shows them'],
    ['B3.publish.left-out', 'B3-S11 P2, P4, the merge scene', 'except the ⟨n⟩ passages you left out'],
    ['B3.publish.left-out.1', 'B3-S11 P2, P4, the merge scene', 'except the passage you left out'],
    ['B3.publish.history.private', 'B3-S11 P2 (iii)', 'this draft\'s past states stay private\u00a0— the version carries these words as they stand, not how they came to be'],
    ['B3.publish.divergence', 'B3-S11 P2 (v)', 'from now on the published version and this draft are two documents\u00a0— what you change here reaches readers when you publish again'],
    ['B3.publish.recurrence', 'B3-S11 P2 (vi)', 'this adds version ⟨k+1⟩ after version ⟨k⟩\u00a0— readers meet it at ⟨E⟩\'s address; earlier versions stay readable at theirs'],
    ['B3.publish.caveat.past-states', 'B3-S11 P2 (vii)', '— this draft\'s past states name the key behind each change'],
    ['B3.publish.formatting.folded', 'B3-S11 P3 (1)', 'formatting · ⟨n⟩ marks · ⟨r⟩ taken off, ⟨e⟩ edited, ⟨c⟩ cut'],
    ['B3.publish.row.switch.1', 'B3-S11 P3 (2)', 'publish this link with the text — into ⟨destination⟩'],
    ['B3.publish.switch.off', 'B3-S11 P3 (2)', 'off'],
    ['B3.publish.switch.on', 'B3-S11 P3 (2)', 'on\u00a0— publishes with the text'],
    ['B3.publish.row.revises.folded', 'B3-S11 P3 (2)', '⟨u⟩ revise links already published'],
    ['B3.publish.row.off.counterpart', 'B3-S11 P3 (2)', 'stays private\u00a0— these links stay on ⟨origin⟩’s earlier words; you read them on the published words through ⟨E.j⟩’s publication, as does every reader of both ⟨set⟩ and ⟨origin⟩ who switches ⟨set⟩ on'],
    ['B3.publish.row.off.placeholder', 'B3-S11 P3 (2)', 'stays private\u00a0— these links stay on ⟨origin⟩’s words, which this version shows as a placeholder; you see them there, as does every reader of both ⟨set⟩ and ⟨origin⟩ who switches ⟨set⟩ on'],
    ['B3.publish.row.private', 'B3-S11 P3 (2)', 'private · ⟨n⟩ links · its readers see that your note is linked'],
    ['B3.publish.row.on-published.folded', 'B3-S11 P3 (2)', '⟨w⟩ made on words already published'],
    ['B3.publish.public.read-with', 'B3-S11 P3 (3)', '⟨E⟩ is read with it at every version\u00a0— to leave it off, retract that at ⟨E⟩\'s links card, which takes it off every version'],
    ['B3.publish.public.retract', 'B3-S11 P3 (3)', 'retract its read-with at the links card'],
    ['B3.publish.own-links.folded', 'B3-S11 P3', '⟨n⟩ of ⟨E⟩\'s own links on these words'],
    ['B3.publish.command.left-out', 'B3-S11 P4', 'publish all of this draft except the ⟨n⟩ passages you left out as version ⟨k⟩ of ⟨D⟩\u00a0— it can never be made private again'],
    ['B3.publish.origins.inert.counterpart', 'B3-S11 P2, P4', 'decide what of ⟨origin⟩ goes with this version: window its published words from version ⟨j⟩, or leave those words out'],
    ['B3.publish.enter', 'B3-S11 P4', 'Enter publishes nothing here\u00a0— Tab to the publish command to take it'],
    ['B3.publish.values', 'B3-S11 P4', 'as it will stand'],
    ['B3.publish.running', 'B3-S11 P4', 'publishing…'],
    ['B3.publish.restated.lineage', 'B3-S11 P4, THE REFUSALS', '“⟨first words⟩” already carries your ⟨form | link⟩, published before\u00a0— this client offered it again by mistake; nothing was published, and here is what this version now publishes'],
    ['B3.publish.over-cap', 'B3-S11 P1', '⟨n⟩ passages is more than one publication can carry\u00a0— ⟨cap⟩ at most; the first ⟨cap⟩ end at “⟨words⟩”\u00a0— select up to there, and publish the rest with your next version'],
    ['B3.publish.over-cap.act', 'B3-S11 P1', 'select up to there'],
    ['B3.publish.cap.links.later', 'B3-S11 P3', 'or publish the rest with a later version'],
    ['B3.publish.twin', 'B3-S11', 'these words are already published as version ⟨k⟩\u00a0— this draft now shows them as published; publish again only what you have changed since'],
    ['B3.publish.older-board.notebook', 'B3-S11', 'your notebook runs an older skep than this app\u00a0— update it, then publish again'],
    ['B3.publish.busy.reading.notebook', 'B3-S11', 'your notebook is busy\u00a0— reading again'],
    ['B3.publish.busy.notebook', 'B3-S11', 'your notebook is busy\u00a0— nothing was published; publish again in a moment'],
    ['B3.publish.may-stand', 'B3-S11', 'this publication may already stand\u00a0— look at your published documents before you publish it again; if it does not, cancel and publish again'],
    ['B3.publish.behind.left-out', 'B3-S11', 'this publishes all of this draft except the ⟨n⟩ passages you left out, as version ⟨k+1⟩ of ⟨D⟩\u00a0— ⟨label⟩ stays as it is, written on an earlier version than this'],
    ['B3.publish.arrival', 'B3-S11 P5', 'version ⟨k⟩ of ⟨E⟩\u00a0— at “⟨first words⟩”'],
    ['B3.publish.read-again', 'B3-S11 P5', 'read them again'],
    ['B3.merge.segment', 'B3-S11', 'merging ⟨alternative⟩ into your draft of ⟨D⟩'],
    ['B3.merge.segment.new', 'B3-S11', 'merging ⟨alternative⟩ into a new draft of ⟨D⟩'],
    ['B3.merge.scene.line', 'B3-S11', 'merging ⟨alternative⟩ into your draft of ⟨D⟩\u00a0— undo takes it out; what needs a choice is listed first'],
    ['B3.merge.scene.line.new', 'B3-S11', 'merging ⟨alternative⟩ into a new draft of ⟨D⟩\u00a0— undo takes it out; what needs a choice is listed first'],
    ['B3.merge.held', 'B3-S11', '⟨into⟩ holds words the board has not kept\u00a0— the merge can be composed once it has; its corner says why'],
    ['B3.merge.gap.head.order', 'B3-S11', 'added on both sides'],
    ['B3.merge.gap.head.collision', 'B3-S11', 'both rewrote this'],
    ['B3.merge.gap.head.corner', 'B3-S11', 'placed after surviving words'],
    ['B3.merge.gap.head.anchor', 'B3-S11', 'kept beside its neighbour'],
    ['B3.merge.gap.head.cut', 'B3-S11', 'written between words that moved apart'],
    ['B3.merge.gap.head.moves', 'B3-S11', 'both moved this'],
    ['B3.merge.gap.swap', 'B3-S11', 'swap the order'],
    ['B3.merge.gap.keep-order', 'B3-S11', 'keep this order'],
    ['B3.merge.gap.keep-both', 'B3-S11', 'keep both'],
    ['B3.merge.gap.choose', 'B3-S11', 'choose'],
    ['B3.merge.strip.count', 'B3-S11', '⟨n⟩ places · ⟨m⟩ to choose'],
    ['B3.place-at-caret.after', 'B3-S11', 'place at the caret\u00a0— after “⟨words⟩”'],
    ['B3.merge.statement.left-out', 'B3-S11 P2', 'this publishes all of this draft except the ⟨n⟩ passages you left out, as version ⟨k+1⟩ of ⟨D⟩\u00a0— ⟨alternative⟩ stays readable at its own address and is marked superseded by it for good; to publish these words with no such mark, cancel and take “keep the words, supersede nothing” at this draft’s corner first'],
    ['B3.merge.command.left-out', 'B3-S11 P4', 'publish all of this draft except the ⟨n⟩ passages you left out as version ⟨k+1⟩ of ⟨D⟩\u00a0— ⟨alternative⟩ stays readable at its own address and is marked superseded by it for good\u00a0— nothing of yours takes that mark back; it can never be made private again'],
    ['B3.card.retract', 'B3-S12', 'retract'],
    ['B3.card.retract.publicly', 'B3-S12', 'retract publicly'],
    ['B3.card.split', 'B3-S12', 'this link\'s words are split here\u00a0— what stands between them is not on it'],
    ['B3.card.split.act', 'B3-S12', 'move the link onto the words as they now stand'],
    ['B3.card.move-to', 'B3-S12, B3-S13', 'move this link to…'],
    ['B3.card.move-it', 'B3-S12', 'move it'],
    ['B3.card.edit.private', 'B3-S12', 'this replaces the link\u00a0— the old one is retracted, its record kept'],
    ['B3.card.retract.copy.lead', 'B3-S12', 'this retraction is public, like the link\u00a0— your private original stays and still shows for you'],
    ['B3.card.in-error.enter', 'B3-S12', 'Enter files nothing here\u00a0— Tab to “published in error” to take it'],
    ['B3.row.others-document', 'B3-S13', 'this is ⟨owner⟩\'s document\u00a0— to write about a passage here, select it, then annotate it, or link to it from a document of yours'],
    ['B3.notes.keep', 'B3-S13', 'keep the note'],
    ['B3.format.carry', 'B3-S13', 'format these words in your draft\u00a0— Enter takes you there'],
    ['B3.format.outranked', 'B3-S13', '⟨hand⟩\'s ⟨form⟩\u00a0— drawn under yours'],
    ['B3.format.said.held', 'B3-S13', '⟨form⟩ off with your next version\u00a0— “⟨first words⟩”'],
    ['B3.format.said.spent', 'B3-S13', 'taken off with version ⟨k⟩\u00a0— this makes a new mark'],
  ];
  assert.equal(new Set(LINES.map(([id]) => id)).size, LINES.length, 'each line once');
  for (const [id, screen, text] of LINES) {
    const e = STRINGS[id];
    assert.ok(e, id + ' entered');
    assert.deepEqual({ text: e.text, cls: e.cls, source: e.source, screen: e.screen?.split(':')[0] }, { text, cls: 'DRAFT', source: 'designs/B3-editor.md', screen }, id);
  }
  assert.deepEqual({ text: STRINGS['F.durability']?.text, cls: STRINGS['F.durability']?.cls, source: STRINGS['F.durability']?.source }, { text: '⟨board⟩ could not keep that yet — trying again', cls: 'DRAFT', source: 'designs/foundations.md' }, 'the durability face off the notebook, as foundations words it');
  assert.match(STRINGS['F.durability'].screen ?? '', /^B3-S2:/, 'drawn at the editor\'s screen');
  assert.equal(t('B3.format.outranked', { hand: 'Acme', form: formName(HEADING, 2) }), 'Acme\'s heading\u00a02\u00a0— drawn under yours', 'B3\'s outranked mark, its form one block\'s heading by its one name');
  assert.equal(t('B3.publish.restated.lineage', { 'first words': 'Tumbler', 'form | link': formName(BOLD) }), '“Tumbler” already carries your bold, published before\u00a0— this client offered it again by mistake; nothing was published, and here is what this version now publishes', 'the lineage re-statement, its form by its one name');
});

test('no line the editor\'s design retired on 2026-11-08 or 2026-11-09 stands in the table — the draft side\'s leave line and its third entry form, the staging draft\'s two version labels, the twin\'s reload, "place here", the minute\'s last, links being read, the merge scene\'s caption — and no entry keeps the words the design now quotes only as earlier wording (issue #517)', () => {
  for (const id of ['B3.merge.landed.draft', 'B3.merge.scene.line.draft.beside', 'B3.merge.scene.caption', 'B3.family.home-next', 'B3.family.home-first', 'B3.publish.twin.act', 'B3.place-here', 'B3.place-here.inert',
    'B3.history.row.not-last', 'B3.history.links.reading', 'B3.standing.before-1.published']) {
    assert.ok(!(id in STRINGS), id + ' gone');
  }
  const plain = (/** @type {string} */ x) => x.replace(/\u00a0/g, ' ').replace(/’/g, "'");
  const RETIRED = ['window them from there', 'reload this draft', 'could not make that durable', 'free space on this device — what you have typed', 'not this minute\'s last', 'links — reading', 'version of ⟨your home document⟩',
    'link to… publicly', 'publish it in parts', 'put back by their identity', 'annotate: ⟨annotate chord⟩', 'take this to move the link', 'of ⟨D⟩ in ⟨into⟩', 'from the address line and select it there', 'none is offered again for these words',
    'italic: ⟨Mod+I⟩', 'your held text — not on the board', 'never edited or quoted', 'published beside it', 'it may have reached the board', 'when it comes it places the same material here, never a copy; where the other app drops the trace',
    'not kept — a fault in this client', 'not kept — this device could not keep it', 'version ⟨k+1⟩ published since, from ⟨A⟩', 'if discarded, what is held here is never sent\'', 'taken off with your next version of these words', 'save at the version that first publishes'];
  assert.deepEqual(Object.entries(STRINGS).flatMap(([id, e]) => RETIRED.filter((w) => plain(e.text + "'").includes(w)).map((w) => `${id}: ${w}`)), [], 'no entry keeps a retired line\'s words');
});

test('the pinned lines the editor draws stand PINNED under the copy inventory\'s ids, verbatim — the notebook\'s publish copy, the public-permanent gate\'s face, the remedy\'s label, the arrangement\'s and the link enumeration\'s caveats in their flag-off and flag-on forms — and R83\'s notebook mark under requirements.md (issue #440)', () => {
  /** @type {Array<[string, string, string]>} each line's id, its source and its words */
  const PINS = [
    ['C-32', 'ux/copy.md', 'readable by anyone who can reach this notebook — local while it stays unbound; this notebook itself is never part of the public docuverse.'],
    ['C-47', 'ux/copy.md', 'this changes what the world can read, and that needs your key — open a session with your key on this board, then repeat the act'],
    ['C-58', 'ux/copy.md', 'published in error'],
    ['C-97.flag-on', 'ux/copy.md', 'the arrangement in ⟨D⟩ may be this machine\'s write, not yours'],
    ['C-97', 'ux/copy.md', 'the arrangement in ⟨D⟩ may be this machine\'s write, not yours — this board admits that write whenever local trust is on, and this face cannot read whether it was.'],
    ['C-100.flag-on', 'ux/copy.md', 'these links may be this machine\'s writes, not yours'],
    ['C-100', 'ux/copy.md', 'these links may be this machine\'s writes, not yours — this board admits that write whenever local trust is on, and this surface cannot read whether it was.'],
    ['R83.notebook', 'requirements.md', 'published — anyone who can reach this notebook reads this passage at ⟨E⟩'],
  ];
  for (const [id, source, text] of PINS) assert.deepEqual(STRINGS[id], { text, cls: 'PINNED', source }, id);
  assert.ok(t('C-97').startsWith(t('C-97.flag-on')) && t('C-100').startsWith(t('C-100.flag-on')), 'each flag-off form its flag-on form with its clause');
  assert.equal(t('B3.publish.caveat.marks'), t('C-100').replace('these links', 'these marks'), 'beside the formatting line C-100 says "marks", B3\'s rendering of its siting');
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
  assert.deepEqual([1, 2, 6].map((n) => formName(HEADING, n)), ['heading\u00a01', 'heading\u00a02', 'heading\u00a06']);
  assert.equal(formName(FLAG), t('L.format.flag'));
  for (const [ty, level] of [[UNKNOWN], [HEADING, 7], [HEADING, 0], [HEADING]]) {
    assert.equal(formName(ty, level), typeName(ty), `${ty} at level ${level}: the card's name, never a placeholder`);
  }
  assert.equal(formName(UNKNOWN), 'link of type 3.23.8 — undocumented here');
});

test('forms named together stand in the strip\'s order with a comma alone, "not" before each one off, each named once, and each other hand\'s forms after the document\'s own as a group led by the hand, semicolons between groups — the forms the sets draw and the forms at one place in the text alike, the mirror\'s naming its block\'s heading by its level (issue #442\'s design decision)', () => {
  for (const named of [formsNamed, formsAt]) {
    assert.equal(named([{ ty: ITALIC }, { ty: FLAG }, { ty: BOLD }, { ty: CODE }]), 'bold, italic, code, flag', `${named.name}: the strip's order, whatever the order given`);
    assert.equal(named([{ ty: SUP }, { ty: STRIKE }, { ty: PARAGRAPH }, { ty: SUB }, { ty: CODE }]), 'code, strikethrough, subscript, superscript, paragraph', `${named.name}: the paragraph after the superscript`);
    assert.equal(named([{ ty: UNKNOWN }, { ty: FLAG }, { ty: BOLD }]), `bold, flag, ${typeName(UNKNOWN)}`, `${named.name}: what the table lacks after every form it names`);
    assert.equal(named([{ ty: ITALIC, off: true }, { ty: CODE, off: true }, { ty: BOLD }]), 'bold, not italic, not code', `${named.name}: no qualifier across a comma — "not" before each form that is off`);
    assert.equal(named([{ ty: BOLD }, { ty: ITALIC, off: true }], [{ hand: t('L.format.yours'), forms: [{ ty: SUB }, { ty: CODE }] }]), 'bold, not italic; yours: code, subscript', named.name);
    assert.equal(named([{ ty: BOLD }], [{ hand: '1.0.2', forms: [] }, { hand: t('L.format.yours'), forms: [{ ty: ITALIC }] }]), 'bold; yours: italic', `${named.name}: a hand's group holding no form dropped`);
    assert.equal(named([{ ty: BOLD }, { ty: BOLD }, { ty: CODE }]), 'bold, code', `${named.name}: each form named once`);
    assert.equal(named([]), '', named.name);
  }
  assert.equal(formsAt([{ ty: ITALIC }, { ty: FLAG }, { ty: BOLD }, { ty: HEADING, level: 2 }]), 'bold, italic, heading\u00a02, flag', 'one place\'s heading by its level, where the strip\'s heading group stands');
  assert.equal(formsAt([{ ty: SUP }, { ty: STRIKE }, { ty: HEADING, level: 3 }, { ty: HEADING, level: 1 }, { ty: PARAGRAPH }, { ty: SUB }, { ty: CODE }]),
    'code, strikethrough, subscript, superscript, paragraph, heading\u00a01, heading\u00a03', 'headings by their levels, after the paragraph');
  assert.equal(formsAt([{ ty: UNKNOWN }, { ty: FLAG }, { ty: BOLD }, { ty: HEADING, level: 9 }]), `bold, flag, ${typeName(UNKNOWN)}, ${typeName(HEADING)}`, 'a heading at a level the table lacks by its card\'s name, after every form it names, in the order given');
  assert.equal(formsAt([], [{ hand: t('L.format.yours'), forms: [{ ty: HEADING, level: 2 }] }]), 'yours: heading\u00a02', 'the mirror\'s: the hand leads its group');
  assert.equal(formsAt([{ ty: BOLD }, { ty: HEADING, level: 2 }, { ty: HEADING, level: 2 }]), 'bold, heading\u00a02', 'each form named once');
});

test('a list of the forms the sets draw names the heading form once, "headings", whatever levels its blocks take — one, all six, a level the table lacks or none — after the paragraph, never merged with it, and never by a level; one block\'s heading keeps "heading ⟨n⟩", its number held to its word by a no-break space (issue #462\'s design decision)', () => {
  const EVERY = [FLAG, SUP, SUB, STRIKE, CODE, ITALIC, BOLD, PARAGRAPH].map((ty) => ({ ty }));
  for (const levels of [[1], [2], [6, 5, 4, 3, 2, 1], [9], [0], [undefined], [2, 9]]) {
    assert.equal(formsNamed([...levels.map((level) => ({ ty: HEADING, level })), ...EVERY]), 'bold, italic, code, strikethrough, subscript, superscript, paragraph, headings, flag', `levels ${levels.join(', ')}: the heading form once, by its form`);
  }
  assert.equal(formsNamed([{ ty: HEADING, level: 2 }]), t('L.format.headings'), 'one level drawn names the form, never the level');
  assert.equal(formsNamed([{ ty: SUP }, { ty: STRIKE }, { ty: HEADING, level: 3 }, { ty: HEADING, level: 1 }, { ty: PARAGRAPH }, { ty: SUB }, { ty: CODE }]),
    'code, strikethrough, subscript, superscript, paragraph, headings', 'the paragraph keeps its own name, before the headings');
  assert.equal(formsNamed([{ ty: UNKNOWN }, { ty: FLAG }, { ty: BOLD }, { ty: HEADING, level: 9 }]), `bold, headings, flag, ${typeName(UNKNOWN)}`, 'a level the table lacks names the heading form; a type the table lacks keeps its card\'s name, after every form it names');
  assert.equal(formsNamed([{ ty: BOLD }], [{ hand: t('L.format.yours'), forms: [{ ty: HEADING, level: 2 }, { ty: HEADING, level: 1 }] }]), 'bold; yours: headings', 'another hand\'s group alike');
  assert.equal(formsNamed([{ ty: BOLD }, { ty: HEADING, level: 2 }, { ty: HEADING, level: 2 }]), 'bold, headings', 'named once');
  const { text, cls, source, screen, lane } = STRINGS['L.format.headings'];
  assert.deepEqual({ text, cls, source, lane }, { text: 'headings', cls: 'DRAFT', source: 'designs/B1-reader.md', lane: undefined }, 'B1-S4 drafts it among the switch\'s forms');
  assert.match(screen ?? '', /^B1-S4:/);
  assert.deepEqual([1, 2, 3, 4, 5, 6].map((n) => formName(HEADING, n)), [1, 2, 3, 4, 5, 6].map((n) => `heading\u00a0${n}`), 'one block names its level, no line breaking inside the name');
  assert.deepEqual({ text: STRINGS['B3.format.heading'].text, source: STRINGS['B3.format.heading'].source, screen: STRINGS['B3.format.heading'].screen?.split(':')[0] }, { text: 'heading\u00a0⟨n⟩', source: 'designs/B3-editor.md', screen: 'B3-S13' });
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

test('every Format menu titles a form by its one name with its first letter capitalised — "Strikethrough", "Subscript", "Superscript" — a heading by its level, and a type the table lacks, or a heading at a level it lacks, by its card\'s name so, the table entering no title of its own (issue #463\'s design decision)', () => {
  assert.deepEqual([BOLD, ITALIC, CODE, STRIKE, SUB, SUP, PARAGRAPH, FLAG].map((ty) => formTitle(ty)), ['Bold', 'Italic', 'Code', 'Strikethrough', 'Subscript', 'Superscript', 'Paragraph', 'Flag']);
  assert.deepEqual([1, 2, 3].map((n) => formTitle(HEADING, n)), ['Heading 1', 'Heading 2', 'Heading 3']);
  for (const [ty, level] of [[STRIKE], [SUB], [SUP], [HEADING, 2], [HEADING, 7], [HEADING], [UNKNOWN]]) {
    const name = formName(ty, level);
    assert.equal(formTitle(ty, level), name[0].toUpperCase() + name.slice(1), `${ty} at level ${level}: its one name, only its first letter changed`);
  }
  assert.equal(formTitle(UNKNOWN), 'Link of type 3.23.8 — undocumented here');
  assert.deepEqual(Object.entries(STRINGS).filter(([, e]) => /^(Bold|Italic|Code|Strikethrough|Subscript|Superscript|Paragraph|Headings?|Flag)\b/.test(e.text)).map(([id]) => id), [], 'no entry holds a title: each is its form\'s name');
});

test('a line that would name a form\'s chord names, where none is bound, the act by the form\'s one name and keeps its shape — strikethrough, subscript and superscript, which have no chord — and a chord bound takes the name\'s place, as bold\'s does, the place never blank (issue #463\'s design decision)', () => {
  assert.equal(t('B3.format.style.on', { form: formName(STRIKE), 'its chord or act': formAgain(STRIKE, null) }), 'strikethrough — what you type next; strikethrough again stops it', 'the decision\'s own example');
  for (const ty of [SUB, SUP]) {
    const form = formName(ty);
    assert.equal(t('B3.format.style.on', { form, 'its chord or act': formAgain(ty, null) }), `${form} — what you type next; ${form} again stops it`, form);
  }
  assert.equal(t('B3.format.again', { chord: formAgain(SUP, null) }), 'superscript again marks these words');
  assert.equal(t('B3.format.again.off', { chord: formAgain(SUB, null) }), 'subscript again takes its mark off them');
  assert.equal(t('B3.format.carried', { E: 'Tumbler', chord: formAgain(STRIKE, null) }), 'Tumbler is published — formatting is made here, in your draft: strikethrough again marks these words');
  assert.equal(t('B3.format.again', { chord: formAgain(BOLD, '⌘B') }), '⌘B again marks these words', 'a chord bound is named');
  assert.equal(formAgain(STRIKE, '⌘⇧X'), '⌘⇧X', 'a chord bound later replaces the act\'s name');
  assert.deepEqual([formAgain(SUP, ''), formAgain(HEADING, null, 2), formAgain(UNKNOWN, null)], ['superscript', 'heading 2', typeName(UNKNOWN)], 'never blank: a heading by its level, a type the table lacks by its card\'s name');
});

test('no entry spells a formatting form\'s name save the form\'s own — the heading form\'s in a list among them — and a heading\'s act and take-off, so every place that names a form reads its one name — and none says "struck" (issue #442\'s design decision)', () => {
  const NAMES = /\b(bold|italic|code|strikethrough|subscript|superscript|paragraph|headings?|flag|struck)\b/i;
  const own = new Set(['B3.format.bold', 'B3.format.italic', 'B3.format.code', 'B3.format.strikethrough', 'B3.format.subscript', 'B3.format.superscript', 'B3.format.paragraph', 'B3.format.heading', 'L.format.flag',
    'L.format.headings', 'L.format.make.heading', 'L.format.take-off.heading']);
  for (const id of own) assert.ok(NAMES.test(STRINGS[id].text), `${id} names a form`);
  // a token is a slot a name is filled into, never words of the entry's own
  assert.deepEqual(Object.entries(STRINGS).filter(([id, e]) => !own.has(id) && NAMES.test(e.text.replace(/⟨[^⟩]*⟩/g, ''))).map(([id]) => id), []);
});

test('a one-line hint\'s compact form is its notice\'s first clause, the text before its template\'s first em dash a space or a no-break space sets off, cut before its tokens are filled so no value moves it; the whole notice where the template has none, where it is pinned and where it is marked whole; a string the table lacks, or marks no hint, throws (issue #468\'s design decision)', () => {
  assert.deepEqual(hintOf('F.swallow', { 'LEAP chord': '⌘L' }), { whole: 'typing goes nowhere here — to go somewhere, the address line: ⌘L', clause: 'typing goes nowhere here' });
  assert.deepEqual(hintOf('F.swallow.space', { 'paging key': 'PageDown' }), { whole: 'Space does not page here — PageDown does', clause: 'Space does not page here' });
  assert.deepEqual(hintOf('B3.caret.enter.paste'), { whole: 'Enter places a caret here — then paste', clause: 'Enter places a caret here' });
  assert.equal(hintOf('L.find.off', { 'find chord': '⌘F' }).clause, 'words are found in a document');
  assert.equal(hintOf('F.swallow', { 'LEAP chord': 'x — y' }).clause, 'typing goes nowhere here', 'a value holding the separator moves no cut');
  assert.deepEqual(hintOf('B3.row.others-document', { owner: '1.0.2' }),
    { whole: 'this is 1.0.2\'s document\u00a0— to write about a passage here, select it, then annotate it, or link to it from a document of yours', clause: 'this is 1.0.2\'s document' }, 'another\'s document: its owner named in its first clause, cut at the em dash a no-break space sets off');
  const c45 = hintOf('C-45', { D: '1.0.1.0.3' });
  assert.ok(isPinned('C-45') && STRINGS['C-45'].hint === 'whole' && c45.whole.startsWith('1.0.1.0.3 is published — ') && c45.clause === c45.whole, 'C-45: pinned and marked whole, never cut');
  for (const id of ['D5.select-first', 'B3.caret.enter', 'B3.caret.cut', 'B3.caret.back', 'B3.row.follow.inert', 'L.no-notebook-yet']) {
    const h = hintOf(id);
    assert.ok(!h.whole.includes(' — ') && h.clause === h.whole, `${id}: no " — " in it, its compact form the notice whole`);
  }
  for (const id of ['L.seam.annotate', 'L.seam.quote', 'L.seam.link-to', 'B3.caret.mark']) {
    const h = hintOf(id);
    assert.ok(STRINGS[id].hint === 'whole' && h.whole.includes(' — ') && h.clause === h.whole, `${id}: its first clause says no why on its own — marked whole, never cut`);
  }
  STRINGS['T.pinned-hint'] = { text: 'a pinned notice — its rest', cls: 'PINNED', source: 'ux/copy.md', hint: 'clause' };
  try { assert.equal(hintOf('T.pinned-hint').clause, 'a pinned notice — its rest', 'a pinned notice is never cut'); } finally { delete STRINGS['T.pinned-hint']; }
  assert.throws(() => hintOf('F.published'), /no hint F\.published/);
  assert.throws(() => hintOf('T.none'), /no string T\.none/);
});

test('the words of a draft holding unsent typing are the decision\'s DRAFT strings, each naming the decision and its screen, none the lane\'s own; the put-back\'s are B3-S7\'s', () => {
  const D = 'ux/questions/2026-11-09-unsent-typing-which-text.decision.md';
  /** @type {Array<[string, string]>} */
  const DRAFTS = [['L.new.wrote.held', 'new in this draft, held on this device'], ['L.held.device', 'held on this device'], ['L.removed.part', 'only part of the passage — you removed the rest'], ['L.removed.all', 'you removed this passage']];
  for (const [id, words] of DRAFTS) {
    const { text, cls, source, screen, lane } = STRINGS[id];
    assert.deepEqual([text, cls, source, !!screen, lane], [words, 'DRAFT', D, true, undefined], id);
  }
  assert.deepEqual([t('B3.history.put-back'), STRINGS['B3.history.put-back'].source], ['put back in the current text', 'designs/B3-editor.md']);
  assert.ok(!lacking().some((x) => DRAFTS.some(([id]) => id === x.id)), 'none of them is listed as the lane\'s own');
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

test('every hint the page raises is marked in the table whether it compacts — each string a module hands O-HINT, the one line\'s inert act\'s among them, and each inert slot\'s reason (issue #468\'s design decision)', () => {
  /** @type {Set<string>} */
  const raised = new Set();
  for (const f of modules) {
    const src = readFileSync(new URL(f, WEB), 'utf8');
    for (const m of src.matchAll(/(?:HINT\.show|acts\.hint)\(([^,]+),/g)) for (const id of m[1].matchAll(/'([A-Z][\w-]*(?:\.[^']+)?)'/g)) raised.add(id[1]);
    for (const m of src.matchAll(/INERT_REASON = [^;]*?\(\{([^}]*)\}\)/g)) for (const id of m[1].matchAll(/'([A-Z][\w-]*(?:\.[^']+)?)'/g)) raised.add(id[1]);
  }
  for (const id of ['F.swallow', 'F.swallow.space', 'B3.caret.enter', 'B3.caret.enter.paste', 'B3.caret.cut', 'D5.select-first', 'B3.row.follow.inert', 'L.find.off', 'L.no-notebook-yet', 'L.seam.annotate', 'L.seam.quote', 'L.seam.link-to', 'C-45', 'B3.row.others-document']) {
    assert.ok(raised.has(id), `${id}: raised as a hint`);
  }
  assert.deepEqual([...raised].filter((id) => !STRINGS[id] || !STRINGS[id].hint), [], 'every one marked');
});

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
