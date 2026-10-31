// N-LEAP's test, on stand-ins of the box's elements whose focus lands where
// the platform's would: the box as opened holds the current address and
// takes the new one the line names as a landing changes it, while a box
// typed in or with a row chosen keeps its text and its rows and a closed box
// is written nothing; a landing never closes the box, whose close then gives
// the focus to the walk's element; a change of the page's class computes the
// rows standing in the box again from the model, at once and as the new
// class's index answers, its text, its caret and its focus as they stood;
// each row's cells set in their faces — an address the identifier's, a
// document's words the reading face's; and where no board is held the box
// lists no board's level, says why, and Enter closes it onto the no-board
// face with no LEAP made (FP-20, FP-29, FP-35).
import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import * as LEAP from './leap.js';
import * as FOCUS from './focus.js';
import * as REC from '../model/records.js';
import * as TRAIL from './trail.js';
import * as HOST from '../overlays/host.js';
import * as PORT from '../bridge/port.js';
import * as FAKE from '../test/fake-port.js';
import { t } from '../strings.js';
import { esc } from '../util.js';

/** the platform's document: its focus — the body where it stands on nothing */
const body = { id: 'the body' };
globalThis.document = /** @type {any} */ ({ body, activeElement: body });

/**
 * A stand-in element: its listeners kept by type, its focus landing it the
 * platform's, an input's selection read back.
 * @param {string} id
 * @param {{field?: boolean}} [o]
 */
function element(id, o = {}) {
  /** @type {Record<string, Array<(ev: any) => void>>} */
  const on = {};
  const e = {
    id, value: '', innerHTML: '', isConnected: true, selected: /** @type {[number, number] | null} */ (null), attrs: /** @type {Record<string, string>} */ ({}),
    classList: { set: new Set(), add(/** @type {string} */ c) { this.set.add(c); }, remove(/** @type {string} */ c) { this.set.delete(c); } },
    addEventListener(/** @type {string} */ type, /** @type {(ev: any) => void} */ fn) { (on[type] ||= []).push(fn); },
    fire(/** @type {string} */ type, /** @type {any} */ ev = {}) { for (const fn of on[type] || []) fn(ev); },
    setAttribute(/** @type {string} */ k, /** @type {string} */ v) { e.attrs[k] = v; },
    removeAttribute(/** @type {string} */ k) { delete e.attrs[k]; },
    focus() { globalThis.document.activeElement = /** @type {any} */ (e); },
    blur() { if (globalThis.document.activeElement === /** @type {any} */ (e)) globalThis.document.activeElement = /** @type {any} */ (body); },
    select() { e.selected = [0, e.value.length]; },
    /** @type {(x: unknown) => boolean} */ contains: (x) => x === e,
    matches: (/** @type {string} */ sel) => !!o.field && sel.split(',').map((s) => s.trim()).includes('input'),
  };
  return e;
}

/** the box's parts, the walk's element, and the address the line names, which the test moves as a landing would */
const input = element('the box\'s input', { field: true }), rows = element('the box\'s rows'), note = element('the box\'s note');
const box = element('the box');
box.contains = (x) => x === box || x === input || x === rows || x === note;
const item = element('the item'), landed = element('the landing\'s item');
let line = '1.0.1.0.3';
let walk = item;
LEAP.attach(/** @type {any} */ ({ box, input, rows, note }), () => line);
FOCUS.attach({ home: () => /** @type {any} */ (walk) });

/** the box as it stands: open or not, its text, whether that text is selected whole, and its rows' places */
const shown = () => ({ open: LEAP.isOpen(), value: input.value, selected: !!input.selected && input.selected[0] === 0 && input.selected[1] === input.value.length, rows: LEAP.currentRows().map((r) => r.addr) });
/** a key the box's input is handed, as the platform hands it */
const key = (/** @type {string} */ k) => input.fire('keydown', { key: k, keyCode: 0, isComposing: false, metaKey: false, ctrlKey: false, stopPropagation() {}, preventDefault() {} });

beforeEach(() => {
  LEAP.close();
  // the board the page opened, whose level the box lists first
  REC.setBoard({ board: 'b-1', name: '', origin: '' });
  line = '1.0.1.0.3'; walk = item;
  item.focus();
  input.selected = null;
});

test('the box as opened holds the current address, selected, its levels beneath it, and takes the new address the line names as a landing changes it (#171\'s rule 2)', () => {
  LEAP.open();
  assert.deepEqual(shown(), { open: true, value: '1.0.1.0.3', selected: true, rows: ['1', '1.0.1', '1.0.1.0.3'] }, 'the current address, selected; the board, the account and the document beneath it');
  input.selected = null;
  LEAP.takeAddress();
  assert.equal(input.selected, null, 'the address unchanged: nothing is written');
  line = '1.0.2.0.9';
  LEAP.takeAddress();
  assert.deepEqual(shown(), { open: true, value: '1.0.2.0.9', selected: true, rows: ['1', '1.0.2', '1.0.2.0.9'] }, 'the new address, selected, its own levels beneath it');
});

test('each row\'s cells stand in their faces: its address the identifier\'s, a document\'s label the reading face\'s, a level\'s words the client\'s, a trail entry\'s number then its address, and its words its first line\'s (issue #16)', () => {
  REC.takeIndex(/** @type {any} */ ({ docs: [{ doc: '1.0.1.0.3', kind: 'draft', label: 'notes on tumblers', standing: 'public' }], counts: [{ account: '1.0.1', documents: 1 }], state: { arm: 'complete' } }));
  TRAIL.push({ addr: '1.0.1.0.3', pos: null, width: null, view: { x: 0, y: 0, scale: 1 }, label: null, notice: null }, null);
  LEAP.open();
  const html = String(rows.innerHTML);
  assert.ok(/<span class="a"><span class="id">1\.0\.1\.0\.3<\/span><\/span><span>[^<]+<\/span><span class="a"><span class="id">1\.0\.1\.0\.3<\/span><\/span>/.test(html), `the document's level: its words the client's, its address the identifier's in both its cells: ${html}`);
  assert.ok(html.includes(`<span>1 · <span class="id">1.0.1.0.3</span></span><span class="a"><span class="reading">notes on tumblers</span>${esc(' · ' + t('F.label.draft'))}</span>`), `the trail entry: its number, its address, its first line's words: ${html}`);
  input.value = 'tumblers';
  input.fire('input');
  const typed = String(rows.innerHTML);
  assert.ok(typed.includes(`<span class="reading">notes on tumblers</span></span><span class="a"><span class="id">1.0.1.0.3</span>${esc(' · draft')}</span>`), `a label row: the label's words, then its address and the draft mark: ${typed}`);
  LEAP.close();
});

test('a box typed in, or with a row chosen, keeps its text and its rows as the address changes; a closed box is written nothing', () => {
  LEAP.open();
  input.value = 'artifact';
  input.fire('input');
  line = '1.0.2.0.9';
  LEAP.takeAddress();
  assert.deepEqual([input.value, LEAP.currentRows().map((r) => r.kind)], ['artifact', []], 'typed in: its text and its answer kept');
  LEAP.close();
  line = '1.0.1.0.3';
  LEAP.open();
  key('ArrowDown');
  const chosen = shown();
  line = '1.0.2.0.9';
  LEAP.takeAddress();
  assert.deepEqual(shown(), chosen, 'a row chosen by ↓: the box and its rows as they stood');
  LEAP.close();
  input.value = 'left as it closed';
  line = '1.0.1.0.127';
  LEAP.takeAddress();
  assert.equal(input.value, 'left as it closed', 'closed: nothing written');
});

test('a landing never closes the box: a move the page makes leaves the focus in its input, and its close gives the focus to the landing, never to the element it was opened from (#171\'s rule 2; FP-20)', () => {
  LEAP.open();
  assert.equal(globalThis.document.activeElement, /** @type {any} */ (input), 'the input takes the focus, the item its opener');
  walk = landed;
  FOCUS.land(/** @type {any} */ (landed), { byKey: true });
  assert.deepEqual([globalThis.document.activeElement, LEAP.isOpen()], [/** @type {any} */ (input), true], 'the landing\'s move leaves the focus in the input, the box open');
  key('Escape');
  assert.deepEqual([LEAP.isOpen(), globalThis.document.activeElement], [false, /** @type {any} */ (landed)], 'Esc closes the box onto the landing, the walk\'s element, though the item it was opened from still takes the focus');
});

test('a change of the page\'s class computes the rows standing in the box again from the model at once — none naming a document only the class it left could read, an edition read as published standing — its text, its caret and its focus as they stood, and once more as the new class\'s index answers; a trail entry\'s row reads its document\'s words from the model, the cover\'s once a read withholds it (issues #177, #274)', () => {
  const listing = (/** @type {Array<{doc: string, kind: string, label: string}>} */ docs) => /** @type {any} */ ({ docs: docs.map((d) => ({ ...d, standing: 'public' })), counts: [{ account: '1.0.1', documents: docs.length }], state: { arm: 'complete' } });
  const DRAFT = { doc: '1.0.1.0.1003', kind: 'draft', label: 'notes the draft holds' }, EDITION = { doc: '1.0.1.0.3', kind: 'edition', label: 'notes on tumblers' };
  /** the session reading both, the draft's entry on the trail */
  const signedIn = () => { REC._reset(); REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' }); REC.takeIndex(listing([DRAFT, EDITION])); };
  const trailRow = () => LEAP.currentRows().find((r) => r.kind === 'trail' && r.addr === DRAFT.doc)?.sub;
  TRAIL.push({ addr: DRAFT.doc, pos: null, width: null, view: { x: 0, y: 0, scale: 1 }, label: null, notice: null }, null);
  try {
    // as opened: the levels, the landmarks and the trail's entries
    signedIn();
    LEAP.open();
    assert.equal(trailRow(), `${DRAFT.label} · ${t('F.label.draft')}`, 'the draft\'s trail row: its box\'s first line, read from the model');
    REC.sessionDied({ arm: 'closed' });
    LEAP.classChanged();
    assert.equal(trailRow(), '', 'at once: nothing answered of the draft, nothing said of it');
    REC.takeRefused(DRAFT.doc, 'withheld');
    REC.takeIndex(listing([EDITION]));
    LEAP.takeIndex();
    assert.equal(trailRow(), t('L.client-words', { words: t('F.corner.withheld', { owner: '1.0.1' }) }), 'the guest\'s read withholds it: the cover\'s words, bracketed');
    LEAP.close();
    // typed in
    signedIn();
    LEAP.open();
    input.value = 'notes';
    input.fire('input');
    input.selected = [2, 2];
    assert.deepEqual(shown().rows.sort(), [DRAFT.doc, EDITION.doc].sort(), 'typed in: the draft and the edition the session\'s index lists');
    REC.sessionDied({ arm: 'closed' });
    LEAP.classChanged();
    assert.deepEqual([shown().rows, input.value, input.selected, globalThis.document.activeElement, LEAP.isOpen()], [[EDITION.doc], 'notes', [2, 2], /** @type {any} */ (input), true], 'at once: no row only the dead class could give — the draft — the edition, read as published, standing; the text, the caret and the focus as they stood');
    LEAP.takeIndex();
    assert.deepEqual(shown().rows, [EDITION.doc], 'the new class\'s index not yet answered: nothing taken');
    REC.takeIndex(listing([EDITION]));
    LEAP.takeIndex();
    assert.deepEqual([shown().rows, input.value, globalThis.document.activeElement], [[EDITION.doc], 'notes', /** @type {any} */ (input)], 'the guest\'s index answered: the rows over it, the text and the focus kept');
  } finally { REC._reset(); TRAIL._reset(); }
});

test('where no board is held the box opens empty and lists no board\'s level, its status region says why in the answer\'s place, and Enter — on the box as opened, a typed address or a typed URL — closes it onto the no-board face, no LEAP made (issue #215\'s design decision; FP-35)', () => {
  const hostEl = { className: '', innerHTML: '', style: {}, setAttribute() {}, removeAttribute() {}, addEventListener() {}, querySelector: () => null, querySelectorAll: () => [], getBoundingClientRect: () => ({ left: 0, top: 0, width: 0, height: 0 }), contains: () => false };
  HOST.attach(/** @type {any} */ (hostEl));
  PORT.boot(FAKE.create({}));
  try {
    REC.takeBoards({ result: [] });
    line = '';
    LEAP.open();
    assert.deepEqual(shown(), { open: true, value: '', selected: true, rows: [] }, 'opened empty: no board\'s level, nothing to list');
    assert.equal(note.innerHTML, `<span data-string="F.unclaimed">${esc(t('F.unclaimed'))}</span>`, 'its status region says why, never "nothing … on this board"');
    key('Enter');
    assert.deepEqual([LEAP.isOpen(), HOST.currentState()?.id], [false, 'face:no-board'], 'Enter as opened: closed onto the no-board face');
    HOST.dismiss();
    LEAP.open();
    input.value = '1.0.1.0.3';
    input.fire('input');
    assert.deepEqual(shown().rows, ['1.0.1.0.3'], 'a typed address: its row');
    key('Enter');
    assert.deepEqual([LEAP.isOpen(), HOST.currentState()?.id, TRAIL.all().length], [false, 'face:no-board', 0], 'Enter on it: the face, and no LEAP — no trail entry');
    HOST.dismiss();
    LEAP.open();
    input.value = 'https://example.org/page';
    input.fire('input');
    assert.deepEqual(LEAP.currentRows().map((r) => r.kind), ['url'], 'a typed URL: its row');
    key('Enter');
    assert.deepEqual([LEAP.isOpen(), HOST.currentState()?.id], [false, 'face:no-board'], 'Enter on it: answered too, never silent');
  } finally { HOST.dismiss(); REC._reset(); }
});
