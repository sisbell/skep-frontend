// N-LEAP's test, on stand-ins of the box's elements whose focus lands where
// the platform's would. THE BOX AS OPENED TAKES THE ADDRESS THE LINE NAMES
// (#171's rule 2: "An address box with nothing typed in it takes the new
// address"; `takeAddress`): opened, it holds the current address, selected,
// its levels beneath it, and as a landing changes that address the box takes
// the new one, selected, its levels with it — a mutant that leaves it on the
// address it opened with turns red; typed in, or with a row chosen by ↓, it
// keeps its text and its rows — a mutant that refills it then turns red; and
// closed, nothing is written to it. A LANDING NEVER CLOSES THE BOX (FP-20):
// a move of the focus the page makes while its input holds the focus leaves
// it there, and the box's close then gives it to the walk's element, the
// landing — never the element it was opened from.
import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import * as LEAP from './leap.js';
import * as FOCUS from './focus.js';

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
