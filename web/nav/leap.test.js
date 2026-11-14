// N-LEAP's test, on stand-ins of the box's elements whose focus lands where
// the platform's would: the box as opened holds the current address and
// takes the new one the line names as a landing changes it — one opened at
// the levels the line's fold mark folds holding them until then — while a box
// typed in or with a row chosen keeps its text and its rows and a closed box
// is written nothing; an opening of the box standing with the caret leaves
// it as it stands; a landing never closes the box, whose close then gives
// the focus to the walk's element; a change of the page's class computes the
// rows standing in the box again from the model, at once and as the new
// class's index answers, its text, its caret and its focus as they stood;
// each row's cells set in their faces — an address the identifier's, a
// document's words the reading face's — and its go named by them heard by
// S22's table, those words kept as written and a landmark's glyph kept out;
// the rows' list stands at the row
// chosen, moved by the least that shows it, at its top where none is chosen,
// and again where its room moves, the reader's own scroll otherwise standing;
// Enter on a row naming an account or the board — a trail entry's among them
// — goes to its region, never reading it as a document; at reading scale
// each row naming another document offers "open beside", which Mod+Shift+Enter
// in the box, at the act, or a click on it makes — the reading scene on the
// document in view and the row's place, the selection standing there held —
// while a press finding no such row opens nothing, the box standing and the
// hint saying why until the box's next key or its close; a rebuild keeps the
// focus on a row's act by its key, else gives it to the input; a chord at an
// act closes the box first; and where no board is held the box lists no
// board's level, says why, and Enter and Mod+Shift+Enter close it onto the
// no-board face with no LEAP made (FP-20, FP-26, FP-29, FP-35, FP-38; D5
// K-101). The creation row (B3-S1 THE START; D5 K-33): it stands at the foot
// over a query while an account acts, never at the box as opened, emptied or
// holding an address, a share form or a URL; drawn off the parse before any
// row arrives; its act the first control after the input, ahead of every
// "open beside"; a Tab at the act held while the index's read is out and
// made as the rows are computed over its answer; Enter minting through
// W-MACHINE and saying the mint; and a refused mint answered at the box.
import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import * as LEAP from './leap.js';
import * as FOCUS from './focus.js';
import * as REC from '../model/records.js';
import * as TRAIL from './trail.js';
import * as HOST from '../overlays/host.js';
import * as HINT from '../overlays/hint.js';
import * as SEL from '../overlays/selection.js';
import * as PORT from '../bridge/port.js';
import * as FAKE from '../test/fake-port.js';
import * as F from '../model/frames.js';
import * as CAM from '../plane/camera.js';
import * as PUMP from '../model/pump.js';
import * as WRITE from '../write/write.js';
import * as MACHINE from '../write/machine.js';
import { MAC } from './keys.js';
import { accountCell, boardCell } from '../plane/projection.js';
import { t, heard, fields } from '../strings.js';
import { esc } from '../util.js';

/** the platform's document: its focus — the body where it stands on nothing */
const body = { id: 'the body' };
globalThis.document = /** @type {any} */ ({ body, activeElement: body });
/** the platform's element class, which a face's anchor is told apart from (O-FACES'): none of the stand-ins is one */
globalThis.HTMLElement = /** @type {any} */ (class {});

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
    getAttribute: (/** @type {string} */ k) => (k in e.attrs ? e.attrs[k] : null),
    removeAttribute(/** @type {string} */ k) { delete e.attrs[k]; },
    focus() { globalThis.document.activeElement = /** @type {any} */ (e); },
    blur() { if (globalThis.document.activeElement === /** @type {any} */ (e)) globalThis.document.activeElement = /** @type {any} */ (body); },
    select() { e.selected = [0, e.value.length]; },
    /** @type {(x: unknown) => boolean} */ contains: (x) => x === e,
    matches: (/** @type {string} */ sel) => !!o.field && sel.split(',').map((s) => s.trim()).includes('input'),
  };
  return e;
}

/**
 * A row's "open beside" as the rows were last drawn with it: a stand-in the
 * platform's focus lands on, bearing its row's index and its key.
 * @param {number} i
 * @param {string} key
 */
function actOf(i, key) {
  const b = {
    id: `the act of row ${i}`, dataset: { beside: String(i) },
    getAttribute: (/** @type {string} */ k) => (k === 'data-key' ? key : null),
    focus() { globalThis.document.activeElement = /** @type {any} */ (b); },
    blur() { if (globalThis.document.activeElement === /** @type {any} */ (b)) globalThis.document.activeElement = /** @type {any} */ (body); },
    closest: (/** @type {string} */ sel) => (sel === '[data-beside]' ? b : null),
  };
  return b;
}

/** the box's parts, the walk's element, and the address the line names, which the test moves as a landing would */
const input = element('the box\'s input', { field: true }), rows = element('the box\'s rows'), note = element('the box\'s note');
const box = element('the box');
/** @type {ReturnType<typeof actOf>[]} the rows' acts as the rows were last drawn, each its row's "open beside" */
let acts = [];
let rowsHTML = '';
Object.defineProperty(rows, 'innerHTML', {
  get: () => rowsHTML,
  set: (/** @type {string} */ html) => { rowsHTML = html; acts = [...html.matchAll(/<button [^>]*data-beside="(\d+)" data-key="([^"]*)"/g)].map((m) => actOf(Number(m[1]), m[2])); },
});
rows.contains = (x) => x === rows || acts.includes(/** @type {any} */ (x));
Object.assign(rows, { querySelector: (/** @type {string} */ sel) => (sel === '[data-beside]' ? acts[0] || null : null) });
/** the box's foot, and the creation row's act as the foot was last drawn with it: a stand-in the platform's focus lands on; null where the foot holds none */
const foot = element('the box\'s foot');
/** @type {any} */
let startAct = null;
let footHTML = '';
Object.defineProperty(foot, 'innerHTML', {
  get: () => footHTML,
  set: (/** @type {string} */ html) => {
    footHTML = html;
    const was = startAct;
    startAct = /data-start/.test(html) ? {
      id: 'the creation row\'s act', isConnected: true, words: (/>([^<]*)<\/button>/.exec(html) || [])[1] || '', string: (/data-string="([^"]*)"/.exec(html) || [])[1] || '',
      getAttribute: (/** @type {string} */ k) => (k === 'data-key' ? 'start' : null),
      focus() { globalThis.document.activeElement = /** @type {any} */ (startAct); },
      blur() { if (globalThis.document.activeElement === startAct) globalThis.document.activeElement = /** @type {any} */ (body); },
      closest: (/** @type {string} */ sel) => (sel === '[data-start]' ? startAct : null),
    } : null;
    if (was && globalThis.document.activeElement === was) globalThis.document.activeElement = /** @type {any} */ (body);
  },
});
foot.contains = (x) => x === foot || (!!startAct && x === startAct);
Object.assign(foot, { querySelector: (/** @type {string} */ sel) => (sel === '[data-start]' ? startAct : null) });
box.contains = (x) => x === box || x === input || x === rows || x === note || foot.contains(x) || acts.includes(/** @type {any} */ (x));
/** the box's controls in the page's order — its input, the creation row's act where it stands, then each row's act — as N-FOCUS's rebuild reads them */
Object.assign(box, { querySelectorAll: () => [input, ...(startAct ? [startAct] : []), ...acts] });
/** the rows' list as a test sets it, px: where its view begins, how tall each row and its view stand, how wide it is, and what a status region with words takes of its view */
const list = { top: 100, row: 20, view: 100, width: 600, note: 20 };
/** the list's rows, one per row drawn, each standing where the list's scroll leaves it */
const drawn = () => Array.from({ length: (String(rows.innerHTML).match(/data-i=/g) || []).length }, (_, i) => ({
  getBoundingClientRect: () => ({ top: list.top + i * list.row - /** @type {any} */ (rows).scrollTop, bottom: list.top + (i + 1) * list.row - /** @type {any} */ (rows).scrollTop }),
}));
Object.assign(rows, { scrollTop: 0, clientTop: 0, getBoundingClientRect: () => ({ top: list.top }) });
Object.defineProperties(rows, {
  children: { get: drawn },
  clientWidth: { get: () => list.width },
  clientHeight: { get: () => list.view - (note.innerHTML ? list.note : 0) },
});
const item = element('the item'), landed = element('the landing\'s item');
let line = '1.0.1.0.3';
/** @type {string | null} the document in view, as the app reads it — the one the line names at its reading scale — which the test moves as a landing or a zoom would */
let view = null;
let walk = item;
/** @type {Array<[string, string]>} each mint the box said in the one line: its words and its string */
const saidOf = [];
LEAP.attach(/** @type {any} */ ({ box, input, rows, note, foot }), () => line, () => view, (words, id) => { saidOf.push([words, id]); });
FOCUS.attach({ home: () => /** @type {any} */ (walk) });
CAM.setViewport(1440, 900);

/** the box as it stands: open or not, its text, whether that text is selected whole, and its rows' places */
const shown = () => ({ open: LEAP.isOpen(), value: input.value, selected: !!input.selected && input.selected[0] === 0 && input.selected[1] === input.value.length, rows: LEAP.currentRows().map((r) => r.addr) });
/** a key the box's input is handed, as the platform hands it */
const key = (/** @type {string} */ k) => input.fire('keydown', { key: k, keyCode: 0, isComposing: false, metaKey: false, ctrlKey: false, stopPropagation() {}, preventDefault() {} });
/** the box's text replaced, as typing it would */
const type = (/** @type {string} */ text) => { input.value = text; input.fire('input'); };
/** the key made n times */
const press = (/** @type {string} */ k, /** @type {number} */ n) => { for (let i = 0; i < n; i++) key(k); };
/** the index as a listing of `n` editions under the account, whose state is the given arm */
const listing = (/** @type {number} */ n, arm = 'complete') => /** @type {any} */ ({
  docs: Array.from({ length: n }, (_, i) => ({ doc: `1.0.1.0.${i + 1}`, kind: 'edition', label: `notes ${i + 1}`, standing: 'public' })),
  counts: [{ account: '1.0.1', documents: n }], state: { arm },
});
/** the box opened, 30 editions in the index, and its text typed so 24 rows are listed, the first chosen: more than the list's view shows */
const longList = () => { REC.takeIndex(listing(30)); LEAP.open(); type('1.0.1.0.'); };
/** the platform's command modifier (D5 §0) */
const MOD = MAC ? { metaKey: true } : { ctrlKey: true };
/** a key with its modifiers, as the platform hands it to an element of the box — the input, else the rows at the act it stands on */
const chordAt = (/** @type {any} */ el, /** @type {string} */ k, /** @type {Record<string, boolean>} */ mods = {}, /** @type {any} */ target = el) => el.fire('keydown', { key: k, keyCode: 0, isComposing: false, repeat: false, metaKey: false, ctrlKey: false, shiftKey: false, ...mods, target, stopPropagation() {}, preventDefault() {} });
/** Mod+Shift+Enter in the box's input — "open beside" (K-101) */
const besideKey = (/** @type {Record<string, boolean>} */ o = {}) => chordAt(input, 'Enter', { ...MOD, shiftKey: true, ...o });
/** the reading scene the trail's current entry was opened as: its two documents and the passage it holds; null where it is none */
const scene = () => { const o = TRAIL.current()?.scene; return o ? { a: typeof o.a === 'string' ? o.a : o.a.addr, b: o.b, held: o.held } : null; };
/** the index of the row the box lists naming a place, of a kind */
const rowAt = (/** @type {string} */ kind, /** @type {string} */ addr) => LEAP.currentRows().findIndex((r) => r.kind === kind && r.addr === addr);
/** the rows offering "open beside", by the places they name */
const offering = () => acts.map((a) => LEAP.currentRows()[Number(a.dataset.beside)].addr);
/** a trail entry pushed at a place, its words its act's where it names one */
const pushed = (/** @type {string} */ addr, /** @type {string | null} */ label = null) => TRAIL.push({ addr, pos: null, width: null, view: { x: 0, y: 0, scale: 1 }, label, notice: null }, null);
/** the turns a scene's opening, a teleport's walk and its flight take, the flight stepped to its end */
const settled = async () => { for (let i = 0; i < 20; i++) { await new Promise((r) => setTimeout(r, 0)); if (CAM.flying()) CAM.step(Infinity); } };
const D = '1.0.1.0.3', FAR = '1.0.1.0.127';

beforeEach(() => {
  LEAP.close();
  Object.assign(list, { top: 100, row: 20, view: 100, width: 600, note: 20 });
  /** @type {any} */ (rows).scrollTop = 0;
  // the board the page opened, whose level the box lists first
  REC.setBoard({ board: 'b-1', name: '', origin: '' });
  line = '1.0.1.0.3'; walk = item; view = null;
  item.focus();
  input.selected = null;
  TRAIL._reset(); HINT._reset();
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

test('a box opened at the levels the line\'s fold mark folds holds them while the line names the place it opened at, and takes the new address the line names once a landing changes it (issue #310\'s design decision: "The mark opens the address box at those levels")', () => {
  LEAP.open('1.0.1');
  assert.deepEqual(shown(), { open: true, value: '1.0.1', selected: true, rows: ['1', '1.0.1', '1.0.1.0.3'] }, 'the account the mark folds, selected, the levels of the place the line names beneath it, the folded one among them');
  input.selected = null;
  LEAP.takeAddress();
  LEAP.takeAddress();
  assert.deepEqual([input.value, input.selected], ['1.0.1', null], 'the line naming the document it opened at: the folded levels kept, nothing written');
  line = '1.0.2.0.9';
  LEAP.takeAddress();
  assert.deepEqual(shown(), { open: true, value: '1.0.2.0.9', selected: true, rows: ['1', '1.0.2', '1.0.2.0.9'] }, 'a landing elsewhere: the new address the line names, selected');
});

test('each row\'s cells stand in their faces: its address the identifier\'s, a document\'s label the reading face\'s, a level\'s words the client\'s, a trail entry\'s number then its address, and its words its first line\'s — a draft\'s carrying no kind, a row only naming its document (issue #16; issue #423\'s design decision: "A face that only names a document carries no kind")', () => {
  REC.takeIndex(/** @type {any} */ ({ docs: [{ doc: '1.0.1.0.3', kind: 'draft', label: 'notes on tumblers', standing: 'public' }], counts: [{ account: '1.0.1', documents: 1 }], state: { arm: 'complete' } }));
  TRAIL.push({ addr: '1.0.1.0.3', pos: null, width: null, view: { x: 0, y: 0, scale: 1 }, label: null, notice: null }, null);
  LEAP.open();
  const html = String(rows.innerHTML);
  assert.ok(/<span class="a" id="leap-addr-\d+"><span class="id">1\.0\.1\.0\.3<\/span><\/span><span>[^<]+<\/span><span class="a"><span class="id">1\.0\.1\.0\.3<\/span><\/span>/.test(html), `the document's level: its words the client's, its address the identifier's in both its cells: ${html}`);
  assert.ok(html.includes(`<span>1 · <span class="id">1.0.1.0.3</span></span><span class="a"><span class="reading">notes on tumblers</span></span>`), `the trail entry: its number, its address, its first line's words, no kind after them: ${html}`);
  input.value = 'tumblers';
  input.fire('input');
  const typed = String(rows.innerHTML);
  assert.ok(typed.includes(`<span class="reading">notes on tumblers</span></span><span class="a"><span class="id">1.0.1.0.3</span></span>`) && !typed.includes(t('F.kind.draft')), `a label row: the label's words, then its address, no kind: ${typed}`);
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

test('an opening of the box standing open with its input holding the caret leaves it as it stands — its text, its caret, its rows and its focus — as a Mod+L made at a landing opens it (issue #267\'s design decision; FP-20); closed, it opens holding the current address', () => {
  LEAP.open();
  input.value = 'artifact';
  input.fire('input');
  input.selected = [3, 3];
  const rows = LEAP.currentRows();
  line = '1.0.2.0.9';
  LEAP.open();
  assert.deepEqual([LEAP.isOpen(), input.value, input.selected, LEAP.currentRows(), globalThis.document.activeElement], [true, 'artifact', [3, 3], rows, /** @type {any} */ (input)], 'the box as it stood');
  LEAP.close();
  LEAP.open();
  const s = shown();
  assert.deepEqual([s.open, s.value, s.selected], [true, '1.0.2.0.9', true], 'closed, it opens holding the current address, selected');
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

test('a change of the page\'s class computes the rows standing in the box again from the model at once — none naming a document only the class it left could read, an edition read as published standing — its text, its caret and its focus as they stood, and once more as the new class\'s index answers; a trail entry\'s row reads its document\'s words from the model — the cover\'s at once where the change ends the session, none where the draft waits on its read, the cover\'s once a read withholds it (issues #177, #274, #350)', () => {
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
    assert.equal(trailRow(), DRAFT.label, 'the draft\'s trail row: its box\'s first line, read from the model, no kind after it');
    const cover = t('L.client-words', { words: t('F.corner.withheld', { owner: '1.0.1' }) });
    REC.sessionDied({ arm: 'closed' });
    LEAP.classChanged();
    assert.equal(trailRow(), cover, 'at once: the session ended, the draft it could read covered — the cover\'s words, bracketed');
    REC.takeRefused(DRAFT.doc, 'withheld');
    REC.takeIndex(listing([EDITION]));
    LEAP.takeIndex();
    assert.equal(trailRow(), cover, 'the guest\'s read withholds it: the cover confirmed, its words as they stood');
    LEAP.close();
    // regained as another principal: the draft waits on its read
    signedIn();
    LEAP.open();
    REC.sessionRegained({ session: 's-2', principal: 2, account: '1.0.2', writes: true });
    LEAP.classChanged();
    assert.equal(trailRow(), '', 'at once: nothing answered of the draft at the new class, nothing said of it');
    REC.takeRefused(DRAFT.doc, 'withheld');
    REC.takeIndex(listing([EDITION]));
    LEAP.takeIndex();
    assert.equal(trailRow(), cover, 'the new principal\'s read withholds it: the cover\'s words, bracketed');
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

test('↓ and ↑ move the rows\' list by the least that shows the row chosen, and not at all while that row stands in its view (issue #511; FP-26)', () => {
  try {
    longList();
    assert.equal(rows.scrollTop, 0, 'typed: the first row chosen, the list at its top');
    press('ArrowDown', 4);
    assert.equal(rows.scrollTop, 0, 'the view\'s last row chosen: the list stands');
    key('ArrowDown');
    assert.equal(rows.scrollTop, 20, 'the row below it: the list moves one row');
    press('ArrowDown', 18);
    assert.equal(rows.scrollTop, 380, 'the list\'s last row: its foot on the view\'s');
    press('ArrowUp', 4);
    assert.equal(rows.scrollTop, 380, 'the view\'s first row chosen: the list stands');
    key('ArrowUp');
    assert.equal(rows.scrollTop, 360, 'the row above it: the list moves one row');
  } finally { REC._reset(); }
});

test('a row taller than the list\'s view is brought in by its top (issue #511; FP-26)', () => {
  try {
    longList();
    list.row = 300;
    key('ArrowDown');
    assert.equal(rows.scrollTop, 300, 'the second row: its top on the view\'s, its foot left below');
    key('ArrowUp');
    assert.equal(rows.scrollTop, 0, 'the first row above it: its top on the view\'s');
  } finally { REC._reset(); }
});

test('a new list stands at the row it chooses or, with none chosen, at its top; text that lists nothing leaves the list as it stands (issue #511; FP-26)', () => {
  try {
    longList();
    press('ArrowDown', 23);
    assert.equal(rows.scrollTop, 380, 'the list at its last row');
    type('notes');
    assert.equal(rows.scrollTop, 0, 'typed text: its first match chosen, the list at its top');
    press('ArrowDown', 23);
    type('');
    assert.equal(rows.scrollTop, 0, 'the text taken away: no row chosen, the list at its top');
    /** @type {any} */ (rows).scrollTop = 40;
    assert.doesNotThrow(() => type('nothing lists this'), 'typed text that lists nothing: no row to bring in');
    assert.deepEqual([LEAP.currentRows(), rows.scrollTop], [[], 40], 'no row listed: the list as it stands');
    LEAP.close();
    /** @type {any} */ (rows).scrollTop = 200;
    LEAP.open();
    assert.equal(rows.scrollTop, 0, 'reopened: no row chosen, the list at its top');
    /** @type {any} */ (rows).scrollTop = 40;
    line = '1.0.2.0.9';
    LEAP.takeAddress();
    assert.equal(rows.scrollTop, 0, 'the box as opened taking a new address: its new levels from their top');
  } finally { REC._reset(); }
});

test('the list is brought to the row chosen in the room the status region\'s words leave it, written first (issue #511; FP-26)', () => {
  try {
    longList();
    press('ArrowDown', 3);
    assert.equal(rows.scrollTop, 0, 'the fourth row in view, no words in the status region');
    REC.takeIndex(listing(30, 'building'));
    key('ArrowDown');
    assert.notEqual(note.innerHTML, '', 'the same render wrote the index\'s state');
    assert.equal(rows.scrollTop, 20, 'the fifth row, its foot on a view the words made one row shorter');
  } finally { REC._reset(); }
});

test('the list is brought back to the row chosen where its room moves, and stands where the reader scrolled it where its room stands or no row is chosen (issue #511; FP-26)', () => {
  try {
    longList();
    press('ArrowDown', 4);
    assert.equal(rows.scrollTop, 0, 'the view\'s last row chosen');
    list.view = 60;
    LEAP.roomChanged();
    assert.equal(rows.scrollTop, 40, 'a shorter view: the row\'s foot on it');
    /** @type {any} */ (rows).scrollTop = 0;
    LEAP.roomChanged();
    assert.equal(rows.scrollTop, 0, 'the room as it stood: the reader\'s scroll stands, the row out of view');
    list.width = 400;
    LEAP.roomChanged();
    assert.equal(rows.scrollTop, 40, 'a narrower list, its rows wrapping anew: the row brought back');
    LEAP.close();
    LEAP.open();
    /** @type {any} */ (rows).scrollTop = 60;
    list.view = 40;
    LEAP.roomChanged();
    assert.equal(rows.scrollTop, 60, 'no row chosen: the reader\'s scroll stands');
    key('ArrowDown');
    LEAP.close();
    /** @type {any} */ (rows).scrollTop = 7;
    list.view = 90;
    LEAP.roomChanged();
    assert.equal(rows.scrollTop, 7, 'the box closed: nothing written');
  } finally { REC._reset(); }
});

test('Enter on a trail entry\'s row naming an account goes to the account\'s region, and on one naming the board to WHOLE BOARD — never a LEAP reading either as a document (D5 K-31; foundations §2.2)', async () => {
  const fake = FAKE.create({});
  PORT.boot(fake);
  try {
    pushed('1.0.1', t('F.level.home'));
    pushed('1', t('L.whole-board'));
    LEAP.open();
    const home = rowAt('trail', '1.0.1');
    assert.ok(home >= 0 && rowAt('trail', '1') >= 0, 'HOME\'s and WHOLE BOARD\'s entries listed among the trail\'s rows');
    press('ArrowDown', home + 1);
    key('Enter');
    let e = TRAIL.current();
    assert.deepEqual(e && [e.addr, e.label, e.notice, e.scene], ['1.0.1', null, null, null], 'the account\'s region: its entry names the account, reading nothing');
    assert.deepEqual(e && e.view, CAM.viewForCell(accountCell('1.0.1'), 0.85), 'at the account\'s region, as an account\'s row takes it');
    await settled();
    LEAP.open();
    press('ArrowDown', rowAt('trail', '1') + 1);
    key('Enter');
    e = TRAIL.current();
    assert.deepEqual(e && [e.addr, e.label, e.notice], ['1', t('L.whole-board'), null], 'the board: WHOLE BOARD\'s entry, reading nothing');
    assert.deepEqual(e && e.view, CAM.viewForCell(boardCell('1'), 0.92), 'at the board\'s whole extent');
    await settled();
    const read = (/** @type {string} */ a) => FAKE.keyOf('op', { frame: F.retrieveDocVSpanSet(a) });
    assert.deepEqual(fake.asked.filter((k) => k === read('1.0.1') || k === read('1')), [], 'neither read as a document');
  } finally { PORT.boot(null); }
});

test('at reading scale each row naming another document offers "open beside" — a row naming the board, HOME, an account, the document in view or another version of it offers none — and below it no row does (issue #332; foundations §2.3; D5 K-101)', () => {
  pushed(FAR); pushed(D);
  view = D;
  LEAP.open();
  assert.deepEqual(offering(), [FAR], 'the levels and the trail: FAR\'s entry alone, never the board, the account, the document in view or its own entry');
  const html = String(rows.innerHTML), i = rowAt('trail', FAR);
  assert.ok(html.includes(`<div class="beside" role="gridcell"><button type="button" id="leap-beside-${i}" data-beside="${i}" data-key="trail 2 ${FAR}" aria-labelledby="leap-beside-${i} leap-addr-${i}">${esc(t('F.open-beside'))}</button></div>`), `a native button in the row's second cell, named by its words and the row's address: ${html}`);
  assert.ok(html.includes(`id="leap-row-${i}" data-i="${i}" role="row"`) && html.includes(`<div class="go" id="leap-go-${i}" role="gridcell" aria-label="`), 'each row a row of the grid, its go its first cell, named');
  type('1.0.1.0.3.2');
  assert.deepEqual(offering(), [], 'another version of the document in view: none');
  type(FAR + '.0.1.5');
  assert.deepEqual(offering(), [FAR + '.0.1.5'], 'a place in another document: offered');
  type('https://example.org/page');
  assert.deepEqual(offering(), [], 'a URL: none');
  LEAP.close();
  view = null;
  LEAP.open();
  assert.deepEqual(offering(), [], 'no document at its reading scale: no row offers it');
});

test('Mod+Shift+Enter in the box opens the reading scene on the document in view and the place the row it acts on names — the answer\'s first row, else the row ↓ chose — the box closed and the scene\'s entry pushed at the act (issue #332; D5 K-101)', async () => {
  view = D;
  pushed(D);
  LEAP.open();
  type(FAR);
  besideKey();
  assert.deepEqual([LEAP.isOpen(), scene()], [false, { a: D, b: FAR, held: {} }], 'the typed address\'s row, the answer\'s first: the scene on the document in view and FAR, nothing held, the box closed');
  await settled();
  pushed(FAR);
  pushed(D);
  LEAP.open();
  press('ArrowDown', rowAt('trail', FAR) + 1);
  besideKey();
  assert.deepEqual([LEAP.isOpen(), scene()], [false, { a: D, b: FAR, held: {} }], 'the row ↓ chose: its place, FAR');
  await settled();
});

test('the selection standing in the document in view is held as the scene opens — its positions set level in the first pane, the step it is opened from recorded by its bytes so Back lights it — and one standing elsewhere is not (issue #332; D5 K-101)', async () => {
  const platform = { window: globalThis.window };
  globalThis.window = /** @type {any} */ ({ addEventListener() {}, getSelection: () => null });
  const TEXT = 'First line.\n\nSecond line here.\n';
  try {
    REC.takeSpanSet(D, [{ subspace: 1, ordinal: 1, positions: TEXT.length }]);
    REC.takeDelivery(D, [{ pos: 1, width: TEXT.length, kind: 'content', text: TEXT, ref: null, origin: null }]);
    REC.takeImage(D, 1, [{ iStart: D + '.0.1.1', width: TEXT.length }]);
    view = D;
    pushed(D);
    SEL.select(D, 3, 5);
    LEAP.open();
    type(FAR);
    besideKey();
    assert.deepEqual(scene(), { a: D, b: FAR, held: { posA: 3, widthA: 5, posB: null } }, 'the selection\'s positions held, set level in the first pane');
    assert.deepEqual(TRAIL.all()[TRAIL.cursorIndex() - 1].step, { kind: 'scene', near: D, link: null, key: null, spans: [{ prefix: D + '.0.1', ordinal: 3, width: 5 }] }, 'the entry it departs records the passage it is opened from, by its bytes');
    await settled();
    SEL.select(FAR, 2, 4);
    LEAP.open();
    type('1.0.1.0.4');
    besideKey();
    assert.deepEqual(scene(), { a: D, b: '1.0.1.0.4', held: {} }, 'a selection in another document: nothing held');
    await settled();
  } finally {
    SEL.clear();
    REC.invalidate(D);
    globalThis.window = platform.window;
  }
});

test('where Mod+Shift+Enter finds no row whose act opens, nothing opens: the box stands with its text, its caret and its focus, and the hint says why beside the box — no row chosen or none answered, no document at its reading scale, a row naming no other document — until the box\'s next key, or its close, takes it down (issue #332\'s "Any case not listed"; D5 K-101; issue #468)', () => {
  view = D;
  pushed(FAR);
  LEAP.open();
  const stands = () => [LEAP.isOpen(), input.value, globalThis.document.activeElement === /** @type {any} */ (input), TRAIL.length()];
  const said = () => HINT.standing()?.id ?? null;
  besideKey();
  assert.deepEqual([stands(), said()], [[true, D, true, 1], 'L.leap.beside.choose'], 'the box as opened, no row chosen: nothing opens, the box standing; the hint says it needs a place');
  assert.equal(HINT.standing()?.whole, 'Open beside needs a place — choose a row with ↓, or type an address or a first line.', 'its key drawn for this platform, never a token (style S21)');
  key('a');
  assert.equal(said(), null, 'the box\'s next key takes the hint down');
  type('nothing lists this');
  besideKey();
  assert.deepEqual([stands(), said()], [[true, 'nothing lists this', true, 1], 'L.leap.beside.choose'], 'an answer of none: the same');
  type('');
  press('ArrowDown', rowAt('board', '1') + 1);
  besideKey();
  assert.deepEqual([stands(), said()], [[true, '', true, 1], 'L.leap.beside.other'], 'the board\'s row: it names no other document');
  press('ArrowDown', rowAt('document', D) - rowAt('board', '1'));
  besideKey();
  assert.equal(said(), 'L.leap.beside.other', 'the document in view\'s own row: the same');
  type('https://example.org/page');
  besideKey();
  assert.deepEqual([stands(), said()], [[true, 'https://example.org/page', true, 1], 'L.leap.beside.other'], 'a URL\'s row: the same');
  view = null;
  LEAP.takeReading();
  type(FAR);
  besideKey();
  assert.deepEqual([stands(), said()], [[true, FAR, true, 1], 'L.leap.beside.reading'], 'no document at its reading scale: it needs one being read');
  LEAP.close();
  assert.equal(said(), null, 'the box\'s close takes down the hint it raised');
});

test('a rebuild keeps the focus on a row\'s act by its key — the document in view changing under it — and gives it to the input where the act is gone (FP-20; D5 §4 rule 5)', () => {
  view = D;
  pushed(FAR);
  pushed('1.0.1.0.4');
  LEAP.open();
  const far = () => acts.find((a) => LEAP.currentRows()[Number(a.dataset.beside)].addr === FAR);
  far()?.focus();
  view = '1.0.1.0.9';
  LEAP.takeReading();
  assert.equal(globalThis.document.activeElement, /** @type {any} */ (far()), 'another document in view: the act rebuilt, the focus on it again');
  view = FAR;
  LEAP.takeReading();
  assert.deepEqual([far(), globalThis.document.activeElement, LEAP.isOpen()], [undefined, /** @type {any} */ (input), true], 'FAR in view, its row offering no act: the focus given to the input, the box standing');
});

test('at a row\'s act Mod+Shift+Enter opens that row\'s place beside the document in view, and so does a click on it, while a click on the rest of the row goes and every other chord closes the box first (M-1; D5 K-101)', async () => {
  view = D;
  pushed(FAR);
  pushed(D);
  LEAP.open();
  let act = acts[0];
  act.focus();
  chordAt(rows, 'Enter', { ...MOD, shiftKey: true }, act);
  assert.deepEqual([LEAP.isOpen(), scene()], [false, { a: D, b: FAR, held: {} }], 'Mod+Shift+Enter at the act: the scene beside FAR, the box closed');
  await settled();
  pushed(D);
  LEAP.open();
  act = acts[0];
  rows.fire('click', { type: 'click', detail: 1, target: act });
  assert.deepEqual([LEAP.isOpen(), scene()], [false, { a: D, b: FAR, held: {} }], 'a click on the act: the same');
  await settled();
  pushed(D);
  LEAP.open();
  act = acts[0];
  act.focus();
  chordAt(rows, '[', MOD, act);
  assert.deepEqual([LEAP.isOpen(), scene()], [false, null], 'Mod+[ at the act: the box closed first, the chord left to the page');
  LEAP.open();
  const i = Number(acts[0].dataset.beside), row = { dataset: { i: String(i) }, closest: (/** @type {string} */ s) => (s === '[data-i]' ? row : null) };
  rows.fire('click', { type: 'click', detail: 1, target: row });
  assert.deepEqual([LEAP.isOpen(), TRAIL.current()?.addr, scene()], [false, FAR, null], 'a click on the rest of the row: it goes, a LEAP to FAR');
  await settled();
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
    HOST.dismiss();
    view = '1.0.1.0.3';
    LEAP.open();
    type('1.0.1.0.127');
    besideKey();
    assert.deepEqual([LEAP.isOpen(), HOST.currentState()?.id, TRAIL.all().length], [false, 'face:no-board', 0], 'Mod+Shift+Enter on a typed address: the face, and no scene opened');
  } finally { HOST.dismiss(); REC._reset(); }
});

// placed last: it lists an index no test above meets
test('each row\'s go is named by its cells heard by S22\'s table, drawn as they stand: a document\'s first line kept as written, its own dash among them, and a landmark by its word, its glyph kept out of the name (patterns K1; style S22; issue #626)', () => {
  REC.takeIndex(/** @type {any} */ ({ docs: [{ doc: '1.0.1.0.1', kind: 'edition', label: 'home — field notes', standing: 'public' }], counts: [{ account: '1.0.1', documents: 1 }], state: { arm: 'complete' } }));
  LEAP.open();
  try {
    const i = rowAt('landmark', '1.0.1.0.1'), html = String(rows.innerHTML);
    const name = (new RegExp(`<div class="go" id="leap-go-${i}" role="gridcell" aria-label="([^"]*)">`).exec(html) || [])[1] || '';
    assert.ok(i >= 0 && name.startsWith('1.0.1.0.1 ') && name.includes('home — field notes'), `named by its address, then the document's first line as written: ${name}`);
    assert.ok(name.endsWith(` ${heard(t('F.landmark'))}`) && !name.includes('◆') && heard(t('F.landmark')) === 'landmark', `a landmark by its word, the glyph kept out: ${name}`);
    assert.ok(html.includes(` ${esc(t('F.landmark'))}</span></div>`), 'drawn as it stands, its glyph beside its word');
  } finally { LEAP.close(); }
});

// ---- the creation row (B3-S1 THE START; D5 K-33) --------------------------------------------

/** the session the creation row acts under */
const SIGNED = /** @type {any} */ ({ session: 's-1', principal: 1, account: '1.0.1', writes: true, fingerprint: null });
/** a key the creation row's act is handed, as the platform hands it to the foot: whether its default was prevented */
function keyAtStart(/** @type {string} */ k, /** @type {Record<string, boolean>} */ mods = {}) {
  let prevented = false;
  foot.fire('keydown', { key: k, keyCode: 0, isComposing: false, repeat: false, metaKey: false, ctrlKey: false, shiftKey: false, altKey: false, ...mods, target: startAct, stopPropagation() {}, preventDefault() { prevented = true; } });
  return prevented;
}
/**
 * The page booted over a fake port for a mint: every `op` answered by
 * `answer`, `held(session)` listing none, `places` the listing given; the
 * session signed and the machine handed in.
 * @param {(frame: Record<string, any>) => unknown} answer
 * @param {unknown} [places]
 */
function minting(answer, places = listing(3)) {
  /** @type {Array<Record<string, any>>} */
  const ops = [];
  const fake = FAKE.create(new Proxy({}, { get: (_t, k) => (String(k).startsWith('op:') ? (() => { const f = JSON.parse(String(k).slice(3)); ops.push(f); return answer(f); })() : String(k).startsWith('held:') ? { result: [] } : String(k).startsWith('places:') ? { result: places } : undefined) }));
  PORT.boot(fake);
  REC.setBoard({ board: 'b-1', name: '', origin: '' });
  REC.setSession(SIGNED);
  MACHINE.handIn();
  return { fake, ops };
}
/** what a test of the creation row leaves is taken down: the machine, the model, the words held and the port */
const unminted = () => { LEAP.close(); MACHINE._reset(); WRITE._reset(); REC._reset(); TRAIL._reset(); HINT._reset(); PORT.boot(null); saidOf.length = 0; };

test('the creation row stands at the box\'s foot over a query while an account acts — beneath the rows and the no-match line alike, its words the table\'s — and never at the box as opened or emptied, over an address, a share form or a URL, for a guest, or where no board is held (B3-S1 THE START; foundations §2.3)', () => {
  try {
    REC.setSession(SIGNED);
    REC.takeIndex(listing(3));
    LEAP.open();
    assert.deepEqual([startAct, foot.innerHTML], [null, ''], 'the box as opened holds the current address: no creation row');
    type('notes');
    assert.deepEqual([startAct && startAct.words, startAct && startAct.string, LEAP.currentRows().length], [t('B3.start-document'), 'B3.start-document', 3], 'a query that matches: the row at the foot, beneath its rows');
    type('no label holds this');
    assert.deepEqual([!!startAct, LEAP.currentRows().length, String(note.innerHTML).includes(esc(t('F.leap.none')))], [true, 0, true], 'a query that matches nothing: the row beneath the no-match line');
    for (const text of ['', '   ', '1.0.1.0.3', 'skep://abc123', 'https://example.org/page']) { type(text); assert.equal(startAct, null, `no row over ${JSON.stringify(text)}`); }
    assert.deepEqual([LEAP.isQuery('a first line'), LEAP.isQuery('1.0.1'), LEAP.isQuery(' ')], [true, false, false], 'a query is text that parses as none of them and holds a character');
    type('a first line');
    assert.ok(startAct, 'the row again as the text is a query again');
    LEAP.close();
    assert.equal(startAct, null, 'the box closed: no row');
    REC.setSession(null);
    LEAP.open(); type('a first line');
    assert.equal(startAct, null, 'a guest: no account acts, no row');
    LEAP.close();
    REC.setSession(SIGNED);
    REC._reset(); REC.setSession(SIGNED);
    LEAP.open(); type('a first line');
    assert.equal(startAct, null, 'no board held: no row');
  } finally { unminted(); }
});

test('the creation row\'s act is the first control after the input, ahead of every row\'s "open beside", and is drawn off the parse alone: it stands before the index has answered, while the rows are still on their way (D5 K-33; foundations §2.3)', async () => {
  const { fake } = minting(() => ({ refused: { kind: 'shell', name: 'unused' } }), listing(3));
  const release = fake.hold('places', { board: 'b-1' });
  try {
    view = D;
    const reading = PUMP.readIndex();
    LEAP.open();
    type('notes');
    assert.deepEqual([!!startAct, LEAP.currentRows().length, PUMP.readingIndex()], [true, 0, true], 'the index\'s read out, no row listed yet: the creation row stands all the same');
    release();
    await reading;
    LEAP.takeIndex();
    assert.equal(LEAP.currentRows().length, 3, 'the rows computed again over the answer');
    const order = /** @type {any} */ (box).querySelectorAll();
    assert.deepEqual([order[0] === input, order[1] === startAct, order.slice(2).length, order.slice(2).every((/** @type {any} */ x) => acts.includes(x))], [true, true, 2, true], 'the input, then the creation row\'s act, then the "open beside" of each row naming another document than the one in view');
  } finally { release(); unminted(); view = null; }
});

test('a Tab at the creation row\'s act is held while the answer to the text as typed waits on the index, and made once the rows are computed over it: to the answer\'s first "open beside", else out of the box to the walk\'s element; a held Tab the person moved away from is dropped, and one pressed once the answer stands is the platform\'s (foundations §2.3; D5 K-33)', async () => {
  const { fake } = minting(() => ({ refused: { kind: 'shell', name: 'unused' } }), listing(3));
  let release = fake.hold('places', { board: 'b-1' });
  try {
    view = D;
    let reading = PUMP.readIndex();
    LEAP.open(); type('notes');
    startAct.focus();
    assert.equal(keyAtStart('Tab'), true, 'the index\'s read out: the Tab is held, the platform\'s move prevented');
    LEAP.takeIndex();
    assert.equal(globalThis.document.activeElement, startAct, 'and nothing moves while the answer waits');
    release(); await reading;
    LEAP.takeIndex();
    assert.deepEqual([globalThis.document.activeElement === acts[0], LEAP.isOpen(), LEAP.currentRows().length], [true, true, 3], 'the answer in: the focus on its first "open beside", the box standing');
    startAct.focus();
    assert.equal(keyAtStart('Tab'), false, 'the answer standing: a Tab is the platform\'s own, never held');
    // an answer that draws no "open beside": out of the box, to the walk's element
    LEAP.close();
    REC.setIndexState(/** @type {any} */ (null));
    release = fake.hold('places', { board: 'b-1' });
    reading = PUMP.readIndex();
    LEAP.open(); type('no label holds this');
    startAct.focus();
    assert.equal(keyAtStart('Tab'), true, 'held again');
    release(); await reading;
    LEAP.takeIndex();
    assert.deepEqual([LEAP.isOpen(), globalThis.document.activeElement === item], [false, true], 'no row offers "open beside": the box closes and the focus is on the walk\'s element, the next stop');
    // a held Tab the person moved away from
    REC.setIndexState(/** @type {any} */ (null));
    release = fake.hold('places', { board: 'b-1' });
    reading = PUMP.readIndex();
    LEAP.open(); type('notes');
    startAct.focus();
    keyAtStart('Tab');
    assert.equal(acts.length, 2, 'the rows listed over the index as held offer their acts while its read is out');
    acts[1].focus();
    release(); await reading;
    LEAP.takeIndex();
    assert.deepEqual([globalThis.document.activeElement === acts[1], globalThis.document.activeElement === acts[0], LEAP.isOpen()], [true, false, true], 'the focus the person moved to a later row\'s act stays on that act: the held Tab is dropped');
    startAct.focus();
    REC.setIndexState(/** @type {any} */ (null));
    release = fake.hold('places', { board: 'b-1' });
    reading = PUMP.readIndex();
    keyAtStart('Tab');
    keyAtStart('Tab', { shiftKey: true });
    release(); await reading;
    LEAP.takeIndex();
    assert.equal(globalThis.document.activeElement, startAct, 'Shift+Tab after it: the held Tab is dropped');
  } finally { release(); unminted(); view = null; }
});

test('Enter on the creation row mints through W-MACHINE — one `create_new_document`, then the typed line as the draft\'s first burst — closes the box, teleports to the draft as a trail entry, and says the mint in the one line: its address, that it is readable by the person alone, and at the first mint of the session that a document stays; the box\'s own Enter mints nothing (B3-S1 THE START; D5 K-31, K-33)', async () => {
  const MINTED = ['1.0.1.0.41', '1.0.1.0.42'];
  let n = 0;
  const { ops } = minting((f) => (f.op === 'create_new_document' ? { result: { resp: 'ack_addr', addr: MINTED[n++], at: 30 + n } } : f.op === 'insert' ? { result: { resp: 'ack_addr', addr: `${f.doc}.0.1.1`, at: 40 + n } } : { refused: { kind: 'refused', name: 'doc_not_registered' } }));
  try {
    LEAP.open(); type('  An annotation that loses its passage is not lost ');
    key('Enter');
    await settled();
    assert.deepEqual([ops.filter((f) => f.op === 'create_new_document').length, LEAP.isOpen()], [0, true], 'Enter in the input goes nowhere over text that matches nothing, and mints nothing');
    foot.fire('click', { target: startAct, detail: 0 });
    await settled();
    const writes = ops.filter((f) => f.op === 'create_new_document' || f.op === 'insert');
    assert.deepEqual(writes.map((f) => [f.op, f.account ?? f.doc, f.published ?? f.values]), [['create_new_document', '1.0.1', false], ['insert', MINTED[0], ['An annotation that loses its passage is not lost']]], 'the mint into the acting account, private, then the typed line, trimmed, as the first burst');
    assert.deepEqual([LEAP.isOpen(), TRAIL.current()?.addr], [false, MINTED[0]], 'the box closed, and the teleport\'s trail entry at the draft the board minted');
    assert.deepEqual(saidOf, [[fields(MINTED[0], t('B3.mint.private'), t('B3.mint.stays')), 'B3.mint']], 'the first mint of the session: the address, the creation copy and that a document stays');
    LEAP.open(); type('A second document');
    foot.fire('click', { target: startAct, detail: 0 });
    await settled();
    assert.deepEqual(saidOf[1], [fields(MINTED[1], t('B3.mint.private')), 'B3.mint'], 'a later mint: the address and the creation copy alone');
    REC.setHealth(/** @type {any} */ ({ auth: { claimant: '1.0.1', local_trust: true } }), /** @type {any} */ (null));
    MINTED.push('1.0.1.0.43');
    LEAP.open(); type('A third document');
    foot.fire('click', { target: startAct, detail: 0 });
    await settled();
    assert.deepEqual(saidOf[2], [fields(MINTED[2], t('L.mint.private.flag-on')), 'B3.mint'], 'a notebook whose local trust is on: the creation copy in its corner\'s chip\'s words, the machine named beside the person');
  } finally { unminted(); }
});

test('a mint the board refuses is answered at the box: nothing typed, no trail entry, the box standing with its text, its caret and its focus, and the hint beside it saying no document was started and why — a session that may not write by its own line (B3-S1 THE START; FP-41)', async () => {
  const { ops } = minting(() => ({ refused: { kind: 'unreachable', name: 'unreachable', text: '' } }));
  try {
    LEAP.open(); type('A first line');
    startAct.focus();
    foot.fire('click', { target: startAct, detail: 0 });
    await settled();
    const why = t('L.start.refused', { why: t('F.daemon.unreachable') });
    assert.deepEqual([ops.map((f) => f.op), LEAP.isOpen(), input.value, TRAIL.all().length, HINT.standing()?.id, HINT.standing()?.whole.toLowerCase().startsWith(why.toLowerCase()), saidOf.length],
      [['create_new_document'], true, 'A first line', 0, 'L.start.refused', true, 0], 'the mint alone dialed; the box as it stood; the hint whole, naming why; nothing said of a mint');
    REC.setSession({ ...SIGNED, writes: false });
    foot.fire('click', { target: startAct, detail: 0 });
    await settled();
    assert.deepEqual([ops.length, HINT.standing()?.whole.includes(t('B3.keyless').split(' — ')[0].split(' — ')[0])], [1, true], 'a session that may not write: nothing dialed, answered by the keyless line');
    key('Escape');
    assert.deepEqual([LEAP.isOpen(), HINT.standing()], [false, null], 'the box\'s close takes the hint it raised down');
  } finally { unminted(); }
});
