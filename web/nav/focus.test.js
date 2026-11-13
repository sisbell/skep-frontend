// N-FOCUS's test, on a page of stand-ins whose focus lands only where the
// platform's would: one owner — no `.focus()` call stands in any module of
// the page outside the controller — one reading of "a key made it", the
// ring's rule read from the walk's aim, whatever moved the focus, and a Tab
// told to the walk, the opener stack remembered once and its close's return, a
// field keeping its caret through a move the page makes and through a key's
// opening beside it, whose region its close then gives the focus, a rebuild
// keeping the focus, and the host's cases: which control an overlay gives
// the focus as a key or a pointer opens it, as a rebuild, a replacement or a
// face takes its place, and as it is dismissed, and a notice below it, which
// takes none and closes first; and the status region, written once for
// words it is told, rendered for the ear by S22's table with the person's
// words, a document's name and an address kept, asked again saying words it
// holds already by emptying it and writing them on the next frame (FP-20,
// FP-36; style S22; the focus record's rules 10–16).
import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { sep } from 'node:path';
import * as FOCUS from './focus.js';
import * as HOST from '../overlays/host.js';
import { t, heard, asHeard } from '../strings.js';

/**
 * A page of stand-ins: the platform's focus — the body where it stands on
 * nothing — and elements whose `focus()` lands it only where the platform's
 * would (`takes`), `blur()` dropping it to the body.
 */
function page() {
  const body = { id: 'the body', focus() {}, isConnected: true };
  const doc = { body, activeElement: /** @type {{id: string}} */ (body) };
  /** @param {string} id @param {() => boolean} [takes] */
  const element = (id, takes = () => true) => {
    const e = {
      id, isConnected: true, inert: false, disabled: false, dataset: /** @type {Record<string, string>} */ ({}), attrs: /** @type {Record<string, string>} */ ({}),
      focus() { if (takes() && !e.inert) doc.activeElement = e; },
      blur() { if (doc.activeElement === e) doc.activeElement = body; },
      /** @type {(x: unknown) => boolean} */ contains: (x) => x === e,
      getAttribute: (/** @type {string} */ k) => e.attrs[k] ?? null,
      setAttribute: (/** @type {string} */ k, /** @type {string} */ v) => { e.attrs[k] = v; },
      removeAttribute: (/** @type {string} */ k) => { delete e.attrs[k]; },
      /** @type {(s: string) => unknown[]} */ querySelectorAll: () => [],
      /** @type {(s: string) => unknown} */ querySelector: () => null,
      addEventListener() {},
    };
    return e;
  };
  globalThis.document = /** @type {any} */ (doc);
  return { doc, body, element, at: () => doc.activeElement.id };
}

beforeEach(() => FOCUS._reset());

test('one reading of "a key made it": a keyboard event, or the click the platform makes from a key (detail 0); a pointer\'s click never', () => {
  assert.equal(FOCUS.byKey({ type: 'keydown' }), true);
  assert.equal(FOCUS.byKey({ type: 'click', detail: 0 }), true, 'Enter or Space on a button: the platform\'s click carries no count');
  assert.equal(FOCUS.byKey({ type: 'click', detail: 1 }), false, 'a pointer\'s click carries its count');
  assert.equal(FOCUS.byKey({ type: 'click', detail: 2 }), false);
  assert.equal(FOCUS.byKey({ type: 'pointerdown', detail: 0 }), false, 'a pointer event is never a key\'s');
});

test('no `.focus()` call stands outside the controller: every module of the page moves the focus through it', () => {
  const WEB = new URL('../', import.meta.url);
  const modules = readdirSync(WEB, { recursive: true }).map((f) => String(f).split(sep).join('/')).filter((f) => f.endsWith('.js') && !f.endsWith('.test.js') && !f.startsWith('test/'));
  assert.ok(modules.includes('nav/walk.js') && modules.includes('overlays/host.js') && modules.includes('nav/leap.js') && modules.includes('scene/scene.js') && modules.includes('app/main.js'), 'the page\'s modules are read');
  /** @type {string[]} */
  const stray = [];
  for (const f of modules) {
    if (f === 'nav/focus.js') continue;
    const src = readFileSync(new URL(f, WEB), 'utf8').replace(/\/\/[^\n]*/g, '').replace(/\/\*[\s\S]*?\*\//g, '');
    // `read.focus()` is T-LAYER's reader of the walk's focused block, not a move of the focus
    for (const m of src.matchAll(/(?<!\bread)\.(focus|blur)\s*\(/g)) stray.push(`${f}: .${m[1]}(`);
  }
  assert.deepEqual(stray, []);
});

test('the ring\'s rule: drawn while the plane holds the focus and the walk stands where an act of the person\'s put it — the walk\'s reading, whatever moved the focus — and out whenever the plane does not hold it; a focus the platform moves into the plane after a key tells the walk of the act, one after a pointer tells nothing (issue #559\'s design decision)', () => {
  const p = page();
  const plane = p.element('the tree'), item = p.element('the item'), line = p.element('the line\'s act');
  plane.contains = (x) => x === item || x === plane;
  /** @type {Map<string, () => void>} the plane's listeners, by event; and the window's, the platform's input among them */
  const heard = new Map(), input = new Map();
  plane.addEventListener = (/** @type {string} */ type, /** @type {() => void} */ fn) => { heard.set(type, fn); };
  const was = globalThis.window;
  globalThis.window = /** @type {any} */ ({ addEventListener: (/** @type {string} */ type, /** @type {() => void} */ fn) => { input.set(type, fn); } });
  let aimed = true, told = 0;
  try {
    FOCUS.attach({ plane: /** @type {any} */ (plane), home: () => /** @type {any} */ (item), aimed: () => aimed, entered: () => { told++; } });
    assert.equal(FOCUS.land(/** @type {any} */ (item)), true, 'a landing puts the focus on the item');
    assert.equal(FOCUS.ringShown(), true, 'drawn: the plane holds the focus and the walk stands where an act put it');
    aimed = false;
    assert.equal(FOCUS.ringShown(), false, 'the walk on another element than the act put it on: no ring, the focus where it stood');
    aimed = true;
    FOCUS.land(/** @type {any} */ (line));
    assert.deepEqual([FOCUS.planeHolds(), FOCUS.ringShown()], [false, false], 'the one line holds the focus: no ring');
    FOCUS.land(null);
    assert.equal(p.at(), 'the line\'s act', 'a landing naming no element moves none');
    // the platform moves the focus into the plane on its own
    input.get('keydown')?.();
    heard.get('focusin')?.();
    assert.equal(told, 1, 'after a key — a Tab — the walk is told of the act');
    input.get('pointerdown')?.();
    heard.get('focusin')?.();
    assert.equal(told, 1, 'after a pointer, nothing is told');
  } finally {
    globalThis.window = was;
    FOCUS.attach({ aimed: () => false, entered: () => {} });
  }
});

test('a field the reader types in keeps the caret through a move the page makes: the focus stays in it, no ring drawn while it does, and the region holding it closes onto the walk\'s element — never its opener, which still takes the focus — the ring drawn there (#171\'s rule 2)', () => {
  const p = page();
  const plane = p.element('the tree'), item = p.element('the item'), landed = p.element('the landing\'s item'), box = p.element('the box'), rows = p.element('the box\'s rows');
  const field = Object.assign(p.element('the box\'s input'), { matches: (/** @type {string} */ sel) => sel.split(',').map((s) => s.trim()).includes('input') });
  plane.contains = (x) => x === item || x === landed || x === plane;
  box.contains = (x) => x === field || x === rows;
  let walk = item;
  // the walk stands where the landing put it: its reading of the ring
  FOCUS.attach({ plane: /** @type {any} */ (plane), home: () => /** @type {any} */ (walk), aimed: () => true });
  assert.deepEqual([FOCUS.isField(/** @type {any} */ (field)), FOCUS.isField(/** @type {any} */ (item)), FOCUS.isField(null)], [true, false, false], 'one reading of a field: an input or a textarea, never another element');
  item.focus();
  FOCUS.open('box', { el: /** @type {any} */ (box), byKey: true, first: /** @type {any} */ (field) });
  assert.equal(p.at(), 'the box\'s input', 'the box\'s input takes the focus, the item its opener');
  walk = landed; // a landing arrives under the box: the walk stands on its item
  assert.equal(FOCUS.land(/** @type {any} */ (landed)), false, 'the landing\'s move puts the focus nowhere');
  assert.deepEqual([p.at(), FOCUS.ringShown()], ['the box\'s input', false], 'the caret stays in the field, no ring drawn while the plane does not hold the focus');
  FOCUS.land(/** @type {any} */ (field));
  assert.equal(p.at(), 'the box\'s input', 'a move onto the field itself is a move like any other');
  FOCUS.close('box');
  assert.deepEqual([p.at(), FOCUS.ringShown()], ['the landing\'s item', true], 'its close gives the focus to the walk\'s element — the landing — never the item it was opened from, the ring drawn there');
  // a focus on a control of a region that is no field moves as ever
  FOCUS.open('box', { el: /** @type {any} */ (box), byKey: true, first: /** @type {any} */ (rows) });
  assert.equal(p.at(), 'the box\'s rows');
  FOCUS.land(/** @type {any} */ (item));
  assert.equal(p.at(), 'the item', 'no field holds the focus: the move takes it');
  FOCUS.close('box');
  FOCUS.attach({ aimed: () => false });
});

test('a key\'s opening beside a field the reader types in takes none of its caret: the region stands without the focus, said by its own name, and the field\'s close gives it the focus on its first control as that stands then — the region gone, or a face in its place, the walk\'s element (issue #267\'s design decision: "Esc in that field then gives the surface the focus")', () => {
  const p = page();
  /** @type {string[]} what the status region was given to say */
  const said = [];
  /** @type {any} */ (p.doc).getElementById = (/** @type {string} */ id) => (id === 'overlay-name' ? { textContent: 'the trail' } : null);
  let shown = false;
  const plane = p.element('the tree'), item = p.element('the item'), landed = p.element('the landing\'s item'), box = p.element('the box');
  const field = Object.assign(p.element('the box\'s input', () => shown), { matches: (/** @type {string} */ sel) => sel.split(',').map((s) => s.trim()).includes('input') });
  box.contains = (x) => x === field;
  plane.contains = (x) => x === item || x === landed || x === plane;
  const list = p.element('the list'), row = p.element('its newest row'), redrawn = p.element('its newest row, redrawn');
  let rows = [row];
  list.contains = (x) => rows.includes(/** @type {any} */ (x));
  list.querySelectorAll = () => rows;
  list.attrs['aria-labelledby'] = 'overlay-name';
  const scene = p.element('the scene'), pane = p.element('pane B');
  scene.contains = (x) => x === pane;
  scene.attrs['aria-label'] = 'the reading scene';
  let walk = item;
  FOCUS.attach({ plane: /** @type {any} */ (plane), home: () => /** @type {any} */ (walk), live: /** @type {any} */ ({ setAttribute() {}, set textContent(/** @type {string} */ v) { said.push(v); } }) });
  /** the box opened from the walk's item, its input taking the caret, and a landing passing over it */
  const typing = () => {
    walk = item; item.focus(); shown = true;
    FOCUS.open('box', { el: /** @type {any} */ (box), byKey: true, first: /** @type {any} */ (field) });
    walk = landed; FOCUS.land(/** @type {any} */ (landed));
    assert.equal(p.at(), 'the box\'s input', 'the landing\'s move leaves the caret in the field');
  };
  /** the box closed as Esc in its input closes it: hidden, its input taking no focus from then */
  const shut = () => { shown = false; FOCUS.close('box'); };
  typing();
  FOCUS.open('overlay', { el: /** @type {any} */ (list), byKey: true, first: /** @type {any} */ (row) });
  assert.deepEqual([p.at(), FOCUS.standing(), said[said.length - 1]], ['the box\'s input', ['box', 'overlay'], 'the trail'], 'a key\'s list beside the field: the caret stays in the field, the list standing, said by the name its caption gives it');
  rows = [redrawn]; row.isConnected = false; // its owner draws it again
  shut();
  assert.deepEqual([p.at(), FOCUS.standing()], ['its newest row, redrawn', ['overlay']], 'the field\'s close gives the list the focus, on its first control as it stands then');
  FOCUS.close('overlay');
  assert.equal(p.at(), 'the landing\'s item', 'the list\'s close: its opener, the field, takes no focus once the box is shut — the walk\'s element');
  typing();
  FOCUS.open('overlay', { el: /** @type {any} */ (list), byKey: true, first: /** @type {any} */ (redrawn) });
  FOCUS.close('overlay');
  assert.equal(p.at(), 'the box\'s input', 'the list closing beside the field moves no focus');
  shut();
  assert.equal(p.at(), 'the landing\'s item', 'the list gone: the field\'s close goes to the walk\'s element');
  typing();
  FOCUS.open('overlay', { el: /** @type {any} */ (list), byKey: true, first: /** @type {any} */ (redrawn) });
  FOCUS.open('overlay', { el: /** @type {any} */ (list), byKey: false });
  shut();
  assert.equal(p.at(), 'the landing\'s item', 'a face taking the list\'s place, an opening no key made: the field\'s close goes to the walk\'s element');
  FOCUS.close('overlay');
  typing();
  FOCUS.open('scene', { el: /** @type {any} */ (scene), byKey: true, first: /** @type {any} */ (pane) });
  assert.deepEqual([p.at(), said[said.length - 1]], ['the box\'s input', 'the reading scene'], 'a key\'s scene beside the field: the caret stays, the scene said by its own label');
  shut();
  assert.equal(p.at(), 'pane B', 'the field\'s close gives the scene the focus, on the pane its opening named');
  FOCUS.close('scene');
  assert.deepEqual(FOCUS.standing(), []);
});

test('a region\'s opener is remembered once: a second opening keeps the first, and the close returns the focus there', () => {
  const p = page();
  const item = p.element('the item'), region = p.element('the overlay'), first = p.element('the first act'), other = p.element('another act');
  region.contains = (x) => x === first || x === other;
  FOCUS.attach({ home: () => /** @type {any} */ (item) });
  item.focus();
  FOCUS.open('overlay', { el: /** @type {any} */ (region), byKey: true, first: /** @type {any} */ (first) });
  assert.equal(p.at(), 'the first act', 'a key\'s opening takes the focus on the first control');
  assert.deepEqual(FOCUS.standing(), ['overlay']);
  FOCUS.open('overlay', { el: /** @type {any} */ (region), byKey: true, first: /** @type {any} */ (other) });
  assert.deepEqual(FOCUS.standing(), ['overlay'], 'one entry: the replacement pushes none');
  p.doc.activeElement = p.body; // the replacement's markup removed the control that held the focus
  FOCUS.close('overlay');
  assert.equal(p.at(), 'the item', 'the close returns to the FIRST opener, never to a control of the replaced overlay');
  assert.deepEqual(FOCUS.standing(), []);
});

test('a close made where the act left the reader at the walk\'s element passes over the opener: the focus goes to the walk\'s element though the opener still takes it — an in-document find\'s Esc on its match (issue #222\'s design decision; FP-20)', () => {
  const p = page();
  const opener = p.element('the corner'), match = p.element('the match\'s item'), region = p.element('the find'), field = p.element('the find\'s field');
  region.contains = (x) => x === field;
  FOCUS.attach({ home: () => /** @type {any} */ (match) });
  opener.focus();
  FOCUS.open('find', { el: /** @type {any} */ (region), byKey: true, first: /** @type {any} */ (field) });
  assert.equal(p.at(), 'the find\'s field');
  FOCUS.close('find', { toWalk: true });
  assert.equal(p.at(), 'the match\'s item', 'the walk\'s element, never the opener');
  opener.focus();
  FOCUS.open('find', { el: /** @type {any} */ (region), byKey: true, first: /** @type {any} */ (field) });
  FOCUS.close('find');
  assert.equal(p.at(), 'the corner', 'a close made otherwise returns to the opener');
});

test('a pointer\'s opening takes no focus; the close returns a focus on nothing to the opener where that takes it, else to the walk\'s element — never to the top', () => {
  const p = page();
  const item = p.element('the item'), region = p.element('the overlay'), first = p.element('the first act'), opener = p.element('the line\'s act');
  region.contains = (x) => x === first;
  FOCUS.attach({ home: () => /** @type {any} */ (item) });
  opener.focus();
  FOCUS.open('overlay', { el: /** @type {any} */ (region), byKey: false, first: /** @type {any} */ (first) });
  assert.equal(p.at(), 'the line\'s act', 'a pointer\'s opening moves nothing');
  p.doc.activeElement = p.body;
  FOCUS.close('overlay');
  assert.equal(p.at(), 'the line\'s act', 'back to the opener');
  // an opener that does not take the focus: a corner the walk has left, an item a rebuild replaced
  const gone = p.element('a corner the walk has left', () => false);
  gone.focus();
  p.doc.activeElement = gone;
  FOCUS.open('overlay', { el: /** @type {any} */ (region), byKey: false });
  p.doc.activeElement = p.body;
  FOCUS.close('overlay');
  assert.equal(p.at(), 'the item', 'an opener that takes no focus gives it to the walk\'s element');
  const replaced = { ...p.element('an item a rebuild replaced'), isConnected: false };
  p.doc.activeElement = replaced;
  FOCUS.open('overlay', { el: /** @type {any} */ (region), byKey: false });
  p.doc.activeElement = p.body;
  FOCUS.close('overlay');
  assert.equal(p.at(), 'the item', 'an opener a rebuild removed gives it to the walk\'s element');
  // opened with the focus on nothing — by a click on a block, the platform having moved the focus to the body
  p.doc.activeElement = p.body;
  FOCUS.open('overlay', { el: /** @type {any} */ (region), byKey: false });
  FOCUS.close('overlay');
  assert.equal(p.at(), 'the item', 'opened from nothing, the close puts the focus on the walk\'s element: never lost');
});

test('a focus the person moved out of a region stays where they put it; one still inside the region is taken off it first', () => {
  const p = page();
  const item = p.element('the item'), region = p.element('the scene'), pane = p.element('pane B'), corner = p.element('the corner');
  region.contains = (x) => x === pane;
  FOCUS.attach({ home: () => /** @type {any} */ (item) });
  item.focus();
  FOCUS.open('scene', { el: /** @type {any} */ (region), byKey: true, first: /** @type {any} */ (pane) });
  corner.focus();
  FOCUS.close('scene');
  assert.equal(p.at(), 'the corner', 'moved to the corner while the scene stood: it stays there');
  item.focus();
  FOCUS.open('scene', { el: /** @type {any} */ (region), byKey: true, first: /** @type {any} */ (pane) });
  assert.equal(p.at(), 'pane B');
  FOCUS.close('scene');
  assert.equal(p.at(), 'the item', 'a focus the scene held is taken off its pane and returned to the opener');
  FOCUS.close('scene');
  assert.equal(p.at(), 'the item', 'a close of a region not standing moves nothing');
});

test('two regions stand: each close returns its own opener, whatever order they close in', () => {
  const p = page();
  const item = p.element('the item'), scene = p.element('the scene'), pane = p.element('pane B'), overlay = p.element('the overlay'), act = p.element('the card\'s first act');
  scene.contains = (x) => x === pane; overlay.contains = (x) => x === act;
  FOCUS.attach({ home: () => /** @type {any} */ (item) });
  item.focus();
  FOCUS.open('scene', { el: /** @type {any} */ (scene), byKey: true, first: /** @type {any} */ (pane) });
  FOCUS.open('overlay', { el: /** @type {any} */ (overlay), byKey: true, first: /** @type {any} */ (act) });
  assert.deepEqual(FOCUS.standing(), ['scene', 'overlay']);
  p.doc.activeElement = p.body;
  FOCUS.close('overlay');
  assert.equal(p.at(), 'pane B', 'the overlay over the scene returns the focus to the pane it was opened from');
  assert.deepEqual(FOCUS.standing(), ['scene']);
  FOCUS.close('scene');
  assert.equal(p.at(), 'the item');
});

test('a region closing over a standing scene whose opener has left the page, the walk\'s element inert under the scene, puts the focus on the scene\'s first control — never the body', () => {
  const p = page();
  const item = p.element('the item'), scene = p.element('the scene'), pane = p.element('pane B'), stroke = p.element('a stroke'), overlay = p.element('the overlay'), row = p.element('the list\'s first row');
  scene.contains = (x) => x === pane || x === stroke; overlay.contains = (x) => x === row;
  FOCUS.attach({ home: () => /** @type {any} */ (item) });
  item.focus();
  FOCUS.open('scene', { el: /** @type {any} */ (scene), byKey: true, first: /** @type {any} */ (pane) });
  item.inert = true;
  stroke.focus();
  FOCUS.open('overlay', { el: /** @type {any} */ (overlay), byKey: true, first: /** @type {any} */ (row) });
  assert.equal(p.at(), 'the list\'s first row');
  stroke.isConnected = false; // the pane scrolled it out of view: its control taken down
  FOCUS.close('overlay');
  assert.equal(p.at(), 'pane B', 'neither the opener nor the walk\'s element takes it: the scene\'s first control');
  assert.deepEqual(FOCUS.standing(), ['scene']);
});

/**
 * A region of controls that rebuilds its markup: its children are made from
 * a list of keys, each a stand-in control; a rebuild replaces them, and the
 * platform drops a focus that stood on a replaced one to the body.
 * @param {ReturnType<typeof page>} p
 * @param {string} id
 */
function region(p, id) {
  const r = p.element(id);
  /** @type {ReturnType<typeof p.element>[]} */
  let kids = [];
  const make = (/** @type {Array<{key: string, disabled?: boolean, tabindex?: string}>} */ spec) => {
    const old = kids;
    kids = spec.map((s) => { const k = p.element(id + ': ' + s.key); k.dataset.act = s.key; k.disabled = !!s.disabled; if (s.tabindex !== undefined) k.attrs.tabindex = s.tabindex; return k; });
    if (old.includes(/** @type {any} */ (p.doc.activeElement))) p.doc.activeElement = p.body;
  };
  r.contains = (x) => kids.includes(/** @type {any} */ (x));
  r.querySelectorAll = () => kids;
  return { r, make, kid: (/** @type {string} */ key) => /** @type {NonNullable<typeof kids[0]>} */ (kids.find((k) => k.dataset.act === key)) };
}

test('a rebuild keeps the focus on the control bearing the same key, else on the region\'s first control; a region that held none moves nothing', () => {
  const p = page();
  const line = region(p, 'the line');
  line.make([{ key: 'back', disabled: true, tabindex: '-1' }, { key: 'forward', tabindex: '0' }, { key: 'address', tabindex: '-1' }]);
  const keyOf = (/** @type {any} */ e) => e.dataset.act || null;
  line.kid('address').focus();
  const was = line.kid('address');
  let kept = FOCUS.keep(/** @type {any} */ (line.r), keyOf, () => line.make([{ key: 'back', tabindex: '-1' }, { key: 'forward', tabindex: '-1' }, { key: 'address', tabindex: '0' }]));
  assert.equal(p.at(), 'the line: address', 'the act that held the focus has it back by its key');
  assert.ok(kept !== was && kept === line.kid('address'), 'on the new element, not the one the rebuild replaced');
  line.kid('back').focus();
  FOCUS.keep(/** @type {any} */ (line.r), keyOf, () => line.make([{ key: 'back', disabled: true, tabindex: '-1' }, { key: 'forward', tabindex: '0' }, { key: 'address', tabindex: '-1' }]));
  assert.equal(p.at(), 'the line: forward', 'an act gone or disabled: the region\'s first control that is in the order, never the body');
  p.doc.activeElement = p.body;
  kept = FOCUS.keep(/** @type {any} */ (line.r), keyOf, () => line.make([{ key: 'back', tabindex: '0' }]));
  assert.equal(kept, null);
  assert.equal(p.at(), 'the body', 'a region that held no focus is rebuilt and nothing moves');
  const other = p.element('the item');
  other.focus();
  FOCUS.keep(/** @type {any} */ (line.r), keyOf, () => line.make([{ key: 'back', tabindex: '0' }]));
  assert.equal(p.at(), 'the item', 'a focus elsewhere is left where it is');
});

test('the status region: words it is told written once, polite unless asked assertive; asked again, words it holds already said again — the region emptied now and written on the next frame — and any write before that frame taking its place (issue #468\'s design decision: "What it shows is spoken in the status region")', async () => {
  /** each write of the region, in order, and the politeness each was made at */
  const writes = /** @type {string[]} */ ([]);
  let words = '', live = '';
  FOCUS.attach({ live: /** @type {any} */ ({ setAttribute(/** @type {string} */ _k, /** @type {string} */ v) { live = v; }, set textContent(/** @type {string} */ v) { words = v; writes.push(v); }, get textContent() { return words; } }) });
  const frame = () => new Promise((r) => setTimeout(r, 0));
  FOCUS.say('typing goes nowhere here');
  FOCUS.say('typing goes nowhere here');
  assert.deepEqual([writes, live], [['typing goes nowhere here', 'typing goes nowhere here'], 'polite'], 'unasked, the same words are written as they stand, which the platform may not say again');
  writes.length = 0;
  FOCUS.say('typing goes nowhere here', false, true);
  assert.deepEqual(writes, [''], 'asked again: the region emptied now');
  await frame();
  assert.deepEqual(writes, ['', 'typing goes nowhere here'], 'and the words written on the next frame');
  writes.length = 0;
  FOCUS.say('select a passage first', false, true);
  assert.deepEqual(writes, ['select a passage first'], 'words the region does not hold are written at once');
  writes.length = 0;
  FOCUS.say('select a passage first', false, true);
  FOCUS.say('board unreachable', true);
  await frame();
  assert.deepEqual([writes, live], [['', 'board unreachable'], 'assertive'], 'a write before the next frame takes the waiting words\' place');
});

test('the status region says every word it is told rendered for the ear by S22\'s table — "·", "—" and "≥" by their words, a chord by its keys — and keeps the person\'s own words, a document\'s name and an address it is handed as stretches exactly; words already heard said as they stand (style S22; issue #626)', () => {
  /** @type {string[]} each write of the region, in order */
  const writes = [];
  FOCUS.attach({ live: /** @type {any} */ ({ setAttribute() {}, set textContent(/** @type {string} */ v) { writes.push(v); }, get textContent() { return writes[writes.length - 1] ?? ''; } }) });
  FOCUS.say('≥ 3 so far · no match in 1.0.1.0.3 — try another word');
  FOCUS.say('typing goes nowhere here — to go somewhere, the address line: ⌘L');
  FOCUS.say([{ text: 'taken out — “', face: 'client' }, { text: 'the river — rose (at) dawn', face: 'reading' }, { text: '” in ', face: 'client' }, { text: '1.0.1.0.5', face: 'ident' }]);
  FOCUS.say(asHeard('Field — notes, as last read'));
  assert.deepEqual(writes, [
    'at least 3 so far, no match in 1.0.1.0.3, try another word',
    'typing goes nowhere here, to go somewhere, the address line: Command L',
    'taken out, the river — rose (at) dawn in 1.0.1.0.5',
    'Field — notes, as last read',
  ]);
});

test('cover: a region chrome stands over is inert while it does', () => {
  const p = page();
  const tree = p.element('the tree');
  FOCUS.cover(/** @type {any} */ (tree), true);
  assert.equal(tree.inert, true);
  tree.focus();
  assert.equal(p.at(), 'the body', 'an inert region takes no focus');
  FOCUS.cover(/** @type {any} */ (tree), false);
  assert.equal(tree.inert, false);
});

// ---- the host's cases (rules 11, 13, 16), on a stand-in of its element whose markup is read for its controls ----------

/**
 * A stand-in element for the host — the overlay's, or the notice's below it,
 * by its name: its `innerHTML` is parsed for the elements the host and the
 * controller ask it for — the acts, the native controls, the caption — each a
 * stand-in the platform's focus can land on; a rewrite replaces them and
 * drops a focus that stood on one to the body.
 * @param {ReturnType<typeof page>} p
 * @param {string} [name]
 */
function hostElement(p, name = 'the overlay') {
  const host = p.element(name);
  /** @type {Array<ReturnType<typeof p.element> & {tag: string, classes: string[], text: string}>} */
  let kids = [];
  let html = '';
  const parse = (/** @type {string} */ src) => {
    const out = [];
    const re = /<(button|input|span|div)\b([^>]*)>([^<]*)/g;
    let m;
    while ((m = re.exec(src))) {
      const attrs = /** @type {Record<string, string>} */ ({});
      for (const a of m[2].matchAll(/([\w-]+)(?:="([^"]*)")?/g)) attrs[a[1]] = a[2] ?? '';
      const e = Object.assign(p.element(name + ': ' + (attrs['data-run'] || (attrs['data-x'] ? 'x' : attrs.class || m[1]))), { tag: m[1], classes: (attrs.class || '').split(/\s+/).filter(Boolean), text: m[3] });
      e.attrs = attrs; e.disabled = 'disabled' in attrs;
      for (const [k, v] of Object.entries(attrs)) if (k.startsWith('data-')) e.dataset[k.slice(5)] = v;
      Object.defineProperty(e, 'textContent', { get: () => e.text });
      out.push(e);
    }
    return out;
  };
  /** does an element match one simple selector: a tag, classes, attributes, :not([attr]) */
  const matches = (/** @type {typeof kids[0]} */ e, /** @type {string} */ sel) => {
    let s = sel.trim(), ok = true;
    s = s.replace(/:not\(\[([\w-]+)\]\)/g, (_, a) => { if (a in e.attrs) ok = false; return ''; });
    s = s.replace(/\[([\w-]+)(?:="([^"]*)")?\]/g, (_, a, v) => { if (!(a in e.attrs) || (v !== undefined && e.attrs[a] !== v)) ok = false; return ''; });
    s = s.replace(/\.([\w-]+)/g, (_, c) => { if (!e.classes.includes(c)) ok = false; return ''; });
    if (s && s !== e.tag) ok = false;
    return ok;
  };
  const all = (/** @type {string} */ sel) => kids.filter((e) => sel.split(',').some((one) => matches(e, one)));
  Object.defineProperty(host, 'innerHTML', {
    get: () => html,
    set: (v) => { html = v; const old = kids; kids = parse(v); if (old.includes(/** @type {any} */ (p.doc.activeElement))) p.doc.activeElement = p.body; },
  });
  host.contains = (x) => kids.includes(/** @type {any} */ (x));
  host.querySelectorAll = all;
  host.querySelector = (sel) => all(sel)[0] || null;
  Object.assign(host, { className: '', style: {}, getBoundingClientRect: () => ({ width: 100, height: 50 }) });
  return { host, kid: (/** @type {string} */ run) => kids.find((k) => k.dataset.run === run) || null, kids: () => kids };
}

test('the host: an overlay a key opened takes the focus on its first act, never the dismiss — a native button after the content, its glyph drawn alone, named by its act\'s words with Esc its key — and the dialog is named by its own caption\'s words rendered for the ear (style S22; issue #626)', () => {
  const p = page();
  const h = hostElement(p);
  const item = p.element('the item');
  FOCUS.attach({ home: () => /** @type {any} */ (item) });
  HOST.attach(/** @type {any} */ (h.host));
  item.focus();
  HOST.show({ kind: 'card', id: 'a card', anchor: null, html: '<span class="label">the caption</span><button data-run="first">first</button><button data-run="second">second</button>', acts: {}, takeFocus: true });
  assert.equal(p.at(), 'the overlay: first', 'the first act');
  const x = h.kids().find((k) => k.dataset.x);
  assert.ok(x && x.tag === 'button' && h.kids().indexOf(x) === h.kids().length - 1, 'the dismiss is a native button, the last control in the order');
  assert.deepEqual(x && [x.text, x.attrs.title, x.attrs['aria-label'], x.attrs['aria-keyshortcuts'], x.attrs['aria-description']], ['×', `${t('L.dismiss')} (Esc)`, 'dismiss', 'Escape', 'dismiss, Escape'],
    'drawn "×" alone, its title its words and its chord (Esc carries no modifier to draw); named "dismiss", no glyph in its name, its key Escape, its title described for the ear');
  assert.deepEqual([h.host.attrs['aria-label'], h.host.attrs['aria-labelledby'], h.kids().find((k) => k.classes.includes('label'))?.id], ['the caption', undefined, 'overlay-name'], 'the caption\'s words name the dialog');
  HOST.dismiss();
  assert.equal(p.at(), 'the item', 'the dismissal returns the focus to the opener');
  // a list names its current row as the control the focus goes to first
  HOST.show({ kind: 'list', id: 'versions', anchor: null, html: '<span class="label">versions</span><button data-run="read1" aria-current="false">1</button><button data-run="read2" aria-current="true">2</button>', acts: {}, takeFocus: true, first: '[data-run][aria-current="true"]' });
  assert.equal(p.at(), 'the overlay: read2', 'the versions list lands on its current member');
  HOST.dismiss();
  // a face has no caption: named by its own words
  HOST.show({ kind: 'face', id: 'face:x', anchor: null, html: '<div class="face-text">its words — the rest · and more</div>' });
  assert.deepEqual([h.host.attrs['aria-label'], h.kids().find((k) => k.classes.includes('face-text'))?.id], ['its words, the rest, and more', 'overlay-name'], 'a face is named by its words, rendered for the ear');
  assert.equal(p.at(), 'the item', 'a face takes no focus');
  HOST.dismiss();
  HOST.show({ kind: 'card', id: 'bare', anchor: null, html: '<button data-run="only">only</button>' });
  assert.equal(h.host.attrs['aria-label'], heard(t('L.dialog.card')), 'no caption: ST\'s string for the kind');
  HOST.dismiss();
});

test('the host: a pointer-opened overlay takes no focus, and its dismissal returns the focus where the pointer left it', () => {
  const p = page();
  const h = hostElement(p);
  const item = p.element('the item'), button = p.element('the line\'s trail act');
  FOCUS.attach({ home: () => /** @type {any} */ (item) });
  HOST.attach(/** @type {any} */ (h.host));
  button.focus();
  HOST.show({ kind: 'list', id: 'trail-list', anchor: null, html: '<span class="label">the trail</span><button data-run="j1">1</button>', acts: {}, takeFocus: false });
  assert.equal(p.at(), 'the line\'s trail act', 'a pointer\'s opening moves nothing');
  HOST.dismiss();
  assert.equal(p.at(), 'the line\'s trail act', 'the dismissal leaves it there');
  p.doc.activeElement = p.body;
  HOST.show({ kind: 'card', id: 'selection', anchor: null, html: '<span class="label">s</span><button data-run="annotate">a</button>', acts: {}, takeFocus: false });
  assert.equal(p.at(), 'the body', 'opened with the focus on nothing — a click on a block — it stays on nothing');
  HOST.dismiss();
  assert.equal(p.at(), 'the item', 'and the dismissal puts it on the walk\'s element: never to the top');
});

test('the host: a rebuild with the same id keeps the focus on the control pressed; a replacement takes it on its first act where the replaced one held it, and a face replacing it returns the focus to the opener', () => {
  const p = page();
  const h = hostElement(p);
  const item = p.element('the item');
  FOCUS.attach({ home: () => /** @type {any} */ (item) });
  HOST.attach(/** @type {any} */ (h.host));
  item.focus();
  const card = (/** @type {string} */ pressed) => `<span class="label">links</span><button data-run="stage3">content</button><button data-run="owner:1" aria-pressed="${pressed}">1.0.1</button><button data-run="row:0">a row</button>`;
  HOST.show({ kind: 'card', id: 'links', anchor: null, html: card('false'), acts: {}, takeFocus: true });
  const lens = h.kid('owner:1');
  assert.ok(lens); lens.focus();
  HOST.show({ kind: 'card', id: 'links', anchor: null, html: card('true'), acts: {}, takeFocus: false });
  assert.equal(p.at(), 'the overlay: owner:1', 'the lens pressed has the focus back after the rebuild');
  assert.notEqual(p.doc.activeElement, lens, 'on the new element the rebuild wrote');
  // the row's act, by a key, opens the anatomy card in the links card's place
  const row = h.kid('row:0'); assert.ok(row); row.focus();
  HOST.show({ kind: 'card', id: 'anatomy', anchor: null, html: '<span class="label">anatomy</span><button data-run="follow">follow</button><button data-run="beside">beside</button>', acts: {}, takeFocus: true });
  assert.equal(p.at(), 'the overlay: follow', 'the replacement takes the focus on its first act');
  // the pointer's replacement of an overlay whose control held the focus (Chrome focuses a clicked button) takes it too: never the body
  const follow = h.kid('follow'); assert.ok(follow); follow.focus();
  HOST.show({ kind: 'card', id: 'provenance:wrote', anchor: null, html: '<span class="label">who wrote this?</span><button data-run="src0">1.0.1.0.3</button>', acts: {}, takeFocus: false });
  assert.equal(p.at(), 'the overlay: src0', 'a replacement whose predecessor held the focus takes it on its first act');
  // a face replacing it: the focus returns to the chain's opener, the face standing
  HOST.show({ kind: 'face', id: 'face:refused', anchor: null, html: '<div class="face-text">refused</div>' });
  assert.equal(p.at(), 'the item', 'back to the opener of the chain');
  assert.equal(HOST.currentIs('face:refused'), true, 'with the face standing');
  HOST.dismiss();
  assert.equal(p.at(), 'the item', 'its dismissal moves nothing: the focus was not on nothing');
  assert.deepEqual(FOCUS.standing(), []);
});

test('the host: a notice a read brought stands below the card in its own element and takes no focus — the card\'s control keeps it; a focus tabbed into the notice returns to that control as the notice closes first, and the card\'s close then returns it to the card\'s opener (issue #265\'s design decision: "covering neither the card nor its focus. Esc closes the face first")', () => {
  const p = page();
  const h = hostElement(p), n = hostElement(p, 'the notice');
  const item = p.element('the item');
  FOCUS.attach({ home: () => /** @type {any} */ (item) });
  HOST.attach(/** @type {any} */ (h.host), /** @type {any} */ (n.host));
  try {
    item.focus();
    HOST.show({ kind: 'card', id: 'a card', anchor: null, html: '<span class="label">a card</span><button data-run="first">first</button>', acts: {}, takeFocus: true });
    assert.equal(p.at(), 'the overlay: first', 'a key\'s card takes the focus on its first act');
    HOST.show({ kind: 'face', id: 'face:floating', anchor: null, html: '<div class="face-text">its words</div><button data-run="a0">read version 1</button>', acts: {}, notice: true });
    assert.deepEqual([p.at(), HOST.currentState()?.id, HOST.notice()?.id, FOCUS.standing()], ['the overlay: first', 'a card', 'face:floating', ['overlay', 'notice']], 'the notice below the card, a focus region of its own, taking no focus');
    const act = n.kid('a0');
    assert.ok(act, 'the notice\'s act stands in its own element');
    act.focus();
    assert.equal(p.at(), 'the notice: a0', 'Tab into the notice\'s act');
    HOST.dismissInnermost();
    assert.deepEqual([p.at(), HOST.currentState()?.id, HOST.notice()], ['the overlay: first', 'a card', null], 'the notice closes first, the focus back on the card\'s control it stood on as the notice took its place below');
    HOST.dismissInnermost();
    assert.deepEqual([p.at(), FOCUS.standing()], ['the item', []], 'the card\'s close returns the focus to its opener');
  } finally {
    HOST.attach(/** @type {any} */ (h.host));
  }
});
