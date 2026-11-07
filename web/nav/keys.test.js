// N-KEYS's test. The table, read from the module's source: every row of the
// table is read, D5's routed rows are present, every bound chord is a chord, a
// navigation key or one of the platform's text keys at a caret — no plane
// command rides a printable key (§2.7) — no row binds a bare letter, digit or
// sign, and the dispatch guards the IME. Then the dispatch on a page of
// stand-ins: Enter at the walk's focused span of a draft the person may edit
// places the caret, and a printable key, Backspace, Delete, the arrows, Tab
// and Enter act at it, each a change of the text shown alone while the
// model's record stands; Esc leaves the text to the walk with the caret kept,
// and Enter or a printable key at that span returns it; at another span of
// the draft a printable key, a paste and a cut are answered by the draft's own
// line, Space and another's text by K-9's; Mod+S writes nothing, answered
// at the corner with the kept state's statement whole at the first press in a
// session and the corner's own word after it, the statement whole on the
// word's act; and → and ← at a corner move the focus to the read it offers
// and back (D5 K-9, K-57, K-70, K-71, K-72, K-74, K-76, K-77, K-93; D6 BM-1,
// BM-3, BM-52, BM-54; FP-14).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as KEYS from './keys.js';
import * as WALK from './walk.js';
import * as FOCUS from './focus.js';
import * as REC from '../model/records.js';
import * as LAYER from '../text/layer.js';
import * as SEL from '../overlays/selection.js';
import * as CAM from '../plane/camera.js';
import { cornerHTML } from '../text/article.js';
import { docBox } from '../plane/projection.js';
import { t } from '../strings.js';
import { esc, byteLength } from '../util.js';

// the table alone (the dispatch binds DOM modules the Node runner has no DOM for)
const src = await import('node:fs').then((fs) => fs.readFileSync(new URL('./keys.js', import.meta.url), 'utf8'));
const rows = [...src.matchAll(/\{ id: '([^']+)', chord: '([^']+)', act: '([^']+)', surface: '([^']+)' \}/g)].map((m) => ({ id: m[1], chord: m[2], act: m[3], surface: m[4] }));

const NAV = new Set(['↓', '↑', '→', '←', 'Home', 'End', 'PageDown', 'PageUp', 'Enter', 'Esc', 'Tab']);
/** the platform's text keys a caret takes (D5 K-72): bound at the caret alone */
const TEXT_KEYS = new Set(['Backspace', 'Delete']);
/** a function key, alone or with Shift — F3 and Shift+F3, find's next and previous elsewhere than macOS (D5 K-91): never a printable key */
const FN = /^(Shift\+)?F\d{1,2}$/;

test('every row of the TABLE is read (a row the pattern misses would escape the claims below)', () => {
  const table = src.slice(src.indexOf('export const TABLE'), src.indexOf(']));', src.indexOf('export const TABLE')));
  const declared = (table.match(/\{ id:/g) || []).length;
  assert.ok(declared >= 30, 'the table has its rows');
  assert.equal(rows.length, declared);
  for (const r of rows) assert.match(r.id, /^K-\d+$/, `${r.id}: a D5 row id`);
});

test('the table holds D5\'s routed rows', () => {
  for (const id of ['K-1', 'K-7', 'K-11', 'K-13', 'K-14', 'K-20', 'K-21', 'K-30', 'K-40', 'K-41', 'K-47', 'K-48', 'K-49', 'K-51', 'K-52', 'K-57', 'K-62', 'K-70', 'K-71', 'K-72', 'K-74', 'K-76', 'K-77']) assert.ok(rows.some((r) => r.id === id), id);
});

test('no plane command rides a printable key: every chord is Mod+… or Shift+a navigation key or a navigation key, a function key, or one of the platform\'s text keys bound at the caret alone', () => {
  for (const r of rows) {
    const bare = r.chord.replace(/^(Mod\+)?(Shift\+)?/, '');
    const isChord = r.chord.startsWith('Mod+');
    const isNav = NAV.has(bare) && !r.chord.startsWith('Mod') ? (r.chord === bare || r.chord === 'Shift+' + bare) : false;
    const isText = TEXT_KEYS.has(r.chord) && r.surface === 'caret';
    const isFn = FN.test(r.chord);
    assert.ok(isChord || isNav || isText || isFn, `${r.id} ${r.chord} is a bare printable binding`);
    if (!isChord && !isText && !isFn) assert.ok(NAV.has(bare), `${r.id} ${r.chord}: a navigation key alone`);
  }
  assert.ok(rows.some((r) => r.chord === 'F3') && rows.some((r) => r.chord === 'Shift+F3'), 'K-91\'s function keys are bound');
});

test('the wireframe\'s bare keys are gone: no row binds /, t, k, 0–9, +, - alone', () => {
  for (const r of rows) assert.ok(!/^[/tk0-9+\-=]$/.test(r.chord), `${r.id} binds bare ${r.chord}`);
  assert.ok(!/case '\/'|key === '\/'|k === 't'|k === 'k'/.test(src), 'no bare-key branch in the dispatch');
});

test('the dispatch guards the IME: nothing is dispatched during a composition', () => {
  assert.ok(src.includes('e.isComposing') && src.includes("e.key === 'Process'"));
});

// ---- the dispatch on a page of stand-ins -----------------------------------------------------------------------------

/** a draft of the session's account, and another's */
const D = '1.0.1.0.2', O = '1.0.2.0.1';
const TEXT = 'First line.\n\nSecond line here.\n', N = byteLength(TEXT);
/** a key as the platform delivers it */
const keyOf = (/** @type {string} */ key, /** @type {{metaKey?: boolean, ctrlKey?: boolean, shiftKey?: boolean}} */ mods = {}) => /** @type {any} */ ({ type: 'keydown', key, keyCode: 0, isComposing: false, metaKey: false, ctrlKey: false, shiftKey: false, altKey: false, preventDefault() {}, ...mods });
/** the platform's command modifier (D5 §0) */
const MOD = KEYS.MAC ? { metaKey: true } : { ctrlKey: true };
const PLANE = /** @type {const} */ ({ where: 'plane', byKey: true });
/** the text the page shows of D now */
const shown = () => { const d = LAYER.shownOf(D); return REC.textOf(d.runs, d.from, d.to); };
/** the caret as it stands: its document, its position and whether it is live; null where none stands */
const caret = () => { const c = LAYER.caret(); return c && [c.addr, c.pos, c.live]; };
/** the walk's move let land */
const tick = () => new Promise((r) => setTimeout(r, 0));
/** the walk's focus on the span of `addr` holding `pos`, as a landing puts it there, reading nothing */
const focusOn = (/** @type {string} */ addr, /** @type {number} */ pos) => WALK.focusTo(addr, pos, true, true, null, true);

/**
 * The test run on a page of stand-ins — the platform's focus on nothing, the status region keeping what it was told
 * (`said`) — with D and O held as drafts, the session 1.0.1's, the camera at D's reading scale; every caret, edit and
 * selection let go after it.
 * @param {(p: {said: string[]}) => Promise<void>} body
 */
async function onPlane(body) {
  const platform = { document: globalThis.document, window: globalThis.window };
  /** @type {string[]} */
  const said = [];
  const live = { setAttribute() {}, set textContent(/** @type {string} */ v) { said.push(v); }, get textContent() { return said[said.length - 1] ?? ''; } };
  globalThis.document = /** @type {any} */ ({ activeElement: null, body: null });
  globalThis.window = /** @type {any} */ ({ addEventListener() {}, getSelection: () => null });
  REC._reset();
  REC.setBoard({ board: 'b-1', name: '', origin: '' });
  REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  REC.takeIndex(/** @type {any} */ ({ docs: [{ doc: D, kind: 'draft', label: null, standing: 'yours_to_read' }, { doc: O, kind: 'draft', label: null, standing: 'yours_to_read' }], counts: [{ account: '1.0.1', documents: 1 }, { account: '1.0.2', documents: 1 }], state: { arm: 'complete' } }));
  for (const a of [D, O]) {
    REC.takeSpanSet(a, [{ subspace: 1, ordinal: 1, positions: N }]);
    REC.takeDelivery(a, [{ pos: 1, width: N, kind: 'content', text: TEXT, ref: null, origin: null }]);
    REC.takeImage(a, 1, [{ iStart: a + '.0.1.1', width: N }]);
  }
  FOCUS.attach({ live: /** @type {any} */ (live) });
  CAM.setViewport(1440, 900);
  const f = LAYER.foldOf(REC.doc(D)), box = docBox(D), c = f.columns[0];
  CAM.set({ x: box.x + c.x + c.w / 2, y: box.y + c.y + c.h / 2, scale: 12 / f.fs });
  try { await body({ said }); } finally { LAYER.clear(); SEL.clear(); REC._reset(); globalThis.document = platform.document; globalThis.window = platform.window; }
}

test('Enter at the walk\'s focused span of a draft the person may edit places the caret at the span\'s start; a printable key inserts at it, Backspace and Delete take a character out, the arrows move it, Tab puts a tab in and Enter a new line — the text shown changing as a page-local edit list while the model\'s record stands — and Esc leaves the text to the walk at the caret\'s span with the caret kept, a printable key or Enter at that span returning it (K-70, K-71, K-72, K-76, K-77; BM-1, BM-52, BM-54; FP-14)', () => onPlane(async () => {
  assert.equal(LAYER.editable(D), true, 'a draft of the session\'s account at reading scale: text the person may edit');
  await focusOn(D, 1);
  assert.deepEqual([WALK.current()?.kind, WALK.current()?.pos, caret()], ['block', 1, null], 'the walk on the first span, no caret');
  assert.equal(await KEYS.dispatch(keyOf('Enter'), PLANE), true);
  assert.deepEqual([caret(), SEL.selected()], [[D, 1, true], null], 'the caret at the span\'s start, live; the span is not selected');
  assert.equal(await KEYS.dispatch(keyOf('a'), PLANE), true);
  assert.deepEqual([shown(), caret()], ['a' + TEXT, [D, 2, true]], 'typed at it, the caret after the character');
  assert.equal(await KEYS.dispatch(keyOf('Backspace'), PLANE), true);
  assert.deepEqual([shown(), caret()], [TEXT, [D, 1, true]], 'Backspace takes it out');
  assert.equal(await KEYS.dispatch(keyOf('Delete'), PLANE), true);
  assert.deepEqual([shown(), caret()], [TEXT.slice(1), [D, 1, true]], 'Delete takes the character after it');
  await KEYS.dispatch(keyOf('ArrowRight'), PLANE); await KEYS.dispatch(keyOf('ArrowRight'), PLANE);
  assert.equal(caret()?.[1], 3, '→ a character at a time');
  await KEYS.dispatch(keyOf('ArrowDown'), PLANE);
  assert.equal(caret()?.[1], 15, '↓ the same offset into the typed line below (13 + 2)');
  await KEYS.dispatch(keyOf('ArrowUp'), PLANE);
  assert.equal(caret()?.[1], 3, '↑ back');
  await KEYS.dispatch(keyOf('ArrowLeft'), PLANE);
  assert.equal(caret()?.[1], 2, '← a character');
  assert.equal(await KEYS.dispatch(keyOf('Tab'), PLANE), true);
  assert.deepEqual([shown().slice(0, 3), caret()?.[1]], ['i\tr', 3], 'Tab inserts a tab character, never a plane command');
  assert.equal(await KEYS.dispatch(keyOf('Enter'), PLANE), true);
  assert.deepEqual([shown().slice(0, 4), caret()?.[1]], ['i\t\nr', 4], 'Enter at a live caret puts a new line in');
  assert.equal(REC.textOf(REC.doc(D).runs, 1, N + 1), TEXT, 'the model\'s own record stands as the board served it');
  assert.deepEqual(REC.edits(D).map((e) => [e.pos, e.width, e.text]), [[1, 0, 'a'], [1, 1, ''], [1, 1, ''], [2, 0, '\t'], [3, 0, '\n']], 'the page-local edit list: positions and text, never a frame');
  assert.equal(await KEYS.dispatch(keyOf('Escape'), PLANE), true);
  await tick();
  assert.deepEqual([caret(), WALK.current()?.kind, WALK.current()?.addr, WALK.current()?.pos], [[D, 4, false], 'block', D, 1], 'Esc: the caret kept at its position, the keys no longer reaching it; the walk on its span');
  assert.equal(await KEYS.dispatch(keyOf('z'), PLANE), true);
  assert.deepEqual([caret(), shown().slice(0, 5)], [[D, 5, true], 'i\t\nzr'], 'a printable key at the kept span returns the caret and types at it');
  await KEYS.dispatch(keyOf('Escape'), PLANE);
  await tick();
  assert.deepEqual(caret(), [D, 5, false]);
  assert.equal(await KEYS.dispatch(keyOf('Enter'), PLANE), true);
  assert.deepEqual([caret(), shown().slice(0, 5)], [[D, 5, true], 'i\t\nzr'], 'Enter at the kept span returns the caret alone, inserting nothing');
}));

test('at a span of a draft the person may edit holding no caret a printable key is answered by the draft\'s own line and a paste or a cut by that line in their own words, nothing placed and nothing removed; Space keeps K-9\'s line; a kept caret in another span is not returned there, and Enter places a new caret at the span\'s start; at another\'s text K-9\'s line stands, a paste is the platform\'s, Enter selects the span and no caret is placed, the walk\'s move there leaving a live caret kept (K-9, K-70, K-72, K-93; BM-52)', () => onPlane(async ({ said }) => {
  await focusOn(D, 14);
  assert.equal(await KEYS.dispatch(keyOf('q'), PLANE), true);
  assert.deepEqual([said.at(-1), caret(), REC.edits(D)], [t('B3.caret.enter'), null, []], 'the draft\'s own line; nothing typed, no caret');
  assert.equal(await KEYS.dispatch(keyOf('v', MOD), PLANE), true);
  assert.equal(said.at(-1), t('B3.caret.enter.paste'), 'a paste: the line in its own words');
  assert.equal(await KEYS.dispatch(keyOf('x', MOD), PLANE), true);
  assert.equal(said.at(-1), t('B3.caret.cut'), 'a cut: the line in its own words');
  assert.equal(await KEYS.dispatch(keyOf(' '), PLANE), true);
  assert.equal(said.at(-1), t('F.swallow.space', { 'paging key': 'PageDown' }), 'Space: K-9\'s own line');
  assert.deepEqual([REC.edits(D), shown()], [[], TEXT], 'nothing placed and nothing removed');
  await KEYS.dispatch(keyOf('Enter'), PLANE);
  assert.deepEqual(caret(), [D, 14, true]);
  await KEYS.dispatch(keyOf('Escape'), PLANE);
  await tick();
  await focusOn(D, 1);
  assert.equal(await KEYS.dispatch(keyOf('q'), PLANE), true);
  assert.deepEqual([said.at(-1), caret()], [t('B3.caret.enter'), [D, 14, false]], 'at another span of the draft the kept caret is not returned: the draft\'s line, the caret kept where it stood');
  assert.equal(await KEYS.dispatch(keyOf('Enter'), PLANE), true);
  assert.deepEqual(caret(), [D, 1, true], 'Enter at another span places the caret at its start: one caret stands at a time');
  await focusOn(O, 1);
  assert.equal(await KEYS.dispatch(keyOf('q'), PLANE), true);
  assert.deepEqual([said.at(-1), caret()], [t('F.swallow', { 'LEAP chord': KEYS.drawChord('Mod+L') }), [D, 1, false]], 'at text the person may not edit K-9\'s line; the walk\'s move away left the live caret kept');
  assert.equal(await KEYS.dispatch(keyOf('v', MOD), PLANE), false, 'a paste there is the platform\'s own, never taken');
  assert.equal(await KEYS.dispatch(keyOf('Enter'), PLANE), true);
  assert.deepEqual([SEL.selected()?.addr, SEL.selected()?.pos, caret()], [O, 1, [D, 1, false]], 'Enter selects the span whole (D8): no caret in another\'s text');
  assert.deepEqual([REC.edits(D), REC.edits(O)], [[], []]);
}));

test('Mod+S writes nothing and is answered at the corner: where the draft has a kept state, its statement whole at the first press in a session — the save chord\'s line at "kept" — and the corner\'s own word after it, the statement whole on the word\'s act, "nothing to save —" before the word and its reason at the other two; with no kept state the chord is taken and nothing opens; Enter at the corner is the word\'s act (K-57, K-74; BM-3; P41)', () => onPlane(async () => {
  await focusOn(D, 1);
  const corner = () => cornerHTML(REC.doc(D), LAYER.viewFor(REC.doc(D)));
  assert.equal(await KEYS.dispatch(keyOf('s', MOD), PLANE), true, 'taken: the browser\'s save never runs');
  assert.ok(!LAYER.statementOpen(D) && corner().includes('kept-word pending'), 'no kept state: nothing to answer with, the slot empty');
  REC.setKept(D, { word: 'kept', reason: null });
  assert.equal(await KEYS.dispatch(keyOf('s', MOD), PLANE), true);
  assert.ok(LAYER.statementOpen(D) && corner().includes(`<span class="kept-statement" data-string="B3.save.kept">${esc(t('B3.save.kept'))}</span>`), `the first press: the statement whole at the corner — ${corner()}`);
  LAYER.openStatement(D, false);
  const reason = 'the board is not answering';
  REC.setKept(D, { word: 'not yet kept', reason });
  assert.equal(await KEYS.dispatch(keyOf('s', MOD), PLANE), true);
  assert.ok(!LAYER.statementOpen(D) && corner().includes('data-kept="not yet kept"') && !corner().includes('kept-statement'), 'after the first press the corner\'s own word alone answers');
  const target = /** @type {any} */ ({ closest: (/** @type {string} */ sel) => (sel === '[data-corner]' ? { dataset: { corner: D } } : null) });
  assert.equal(await KEYS.dispatch({ ...keyOf('Enter'), target }, { where: 'corner', byKey: true }), true);
  assert.ok(LAYER.statementOpen(D) && corner().includes(esc(`${t('B3.save.before')} ${t('L.kept.failed', { clause: t('B3.not-yet-kept'), reason })}`)), `Enter at the corner, the word's act: the statement whole, the reason on it — ${corner()}`);
  REC.setKept(D, { word: 'not kept', reason: 'refused: out_of_bounds' });
  assert.ok(corner().includes(esc(`${t('B3.save.before')} ${t('L.kept.failed', { clause: t('B3.not-kept'), reason: 'refused: out_of_bounds' })}`)), 'not kept: the same form with its word and reason');
  assert.equal(await KEYS.dispatch({ ...keyOf('Enter'), target }, { where: 'corner', byKey: true }), true);
  assert.ok(!LAYER.statementOpen(D), 'the act again closes it');
  assert.deepEqual([REC.edits(D), caret()], [[], null], 'the chord writes nothing and places no caret');
}));

test('at a corner offering a read, → moves the focus along it to the offered read and ← back to the corner, each a key the page takes; → at the read, ← at the corner, and either at a corner offering none are the platform\'s (D5 K-57, in K-22\'s form)', () => onPlane(async () => {
  const doc = /** @type {any} */ (globalThis.document);
  // a corner as T-LAYER stands it, the read it offers in it, and a corner offering none
  const el = /** @type {any} */ ({ dataset: { corner: D }, focus() { doc.activeElement = el; } });
  const act = /** @type {any} */ ({ dataset: { read: '3' }, focus() { doc.activeElement = act; } });
  Object.assign(el, { closest: (/** @type {string} */ s) => (s === '[data-corner]' ? el : null), querySelector: (/** @type {string} */ s) => (s === '[data-read]' ? act : null) });
  Object.assign(act, { closest: (/** @type {string} */ s) => (s === '[data-corner]' ? el : s === '[data-read]' ? act : null) });
  const bare = /** @type {any} */ ({ dataset: { corner: D }, querySelector: () => null });
  bare.closest = (/** @type {string} */ s) => (s === '[data-corner]' ? bare : null);
  const at = (/** @type {string} */ key, /** @type {unknown} */ target) => KEYS.dispatch({ ...keyOf(key), target }, { where: 'corner', byKey: true });
  doc.activeElement = el;
  assert.equal(await at('ArrowRight', el), true);
  assert.equal(doc.activeElement, act, '→: the focus on the offered read');
  assert.deepEqual([await at('ArrowRight', act), doc.activeElement], [false, act], '→ at the read: nothing further along, the platform\'s');
  assert.equal(await at('ArrowLeft', act), true);
  assert.equal(doc.activeElement, el, '←: back to the corner');
  assert.deepEqual([await at('ArrowLeft', el), doc.activeElement], [false, el], '← at the corner: the platform\'s');
  assert.deepEqual([await at('ArrowRight', bare), await at('ArrowLeft', bare)], [false, false], 'a corner offering none: both the platform\'s');
  assert.ok(KEYS.TABLE.some((r) => r.id === 'K-57' && r.chord === '→' && r.surface === 'corner') && KEYS.TABLE.some((r) => r.id === 'K-57' && r.chord === '←' && r.surface === 'corner'), 'the table binds them at the corner, K-57\'s');
}));
