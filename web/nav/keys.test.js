// N-KEYS's test. The table, read from the module's source: every row of the
// table is read, D5's routed rows are present, Mod+L alone opens the LEAP box
// and Mod+K is "link to…", every bound chord is a chord, a
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
// at the corner and in the status region with the kept state's statement
// whole at the first press in a session and the corner's own word after it,
// the statement whole on the word's act; → and ← at a corner move the focus
// along its acts — the read it offers, a head's count of the items it folds —
// and back; the inert slots' chords give their slot's reason at the
// selection's card, else where the focus is; every other slot's chord, with
// nothing in focus that its slot acts on, gives "select a passage first"
// where the focus is; and Mod+Enter at a live caret follows from a selection
// standing alone — with none it selects nothing, follows nothing and leaves
// the caret where it stands, giving the caret's follow line where the focus
// is — while at a kept caret it acts on the kept span as on the plane (D5
// K-9, K-30, K-45 … K-52, K-57, K-70, K-71, K-72, K-74, K-76, K-77, K-93,
// K-100, §1.6; D6 BM-1, BM-3, BM-52, BM-54; B3-S13; P47; FP-14, FP-36).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as KEYS from './keys.js';
import * as WALK from './walk.js';
import * as FOCUS from './focus.js';
import * as TRAIL from './trail.js';
import * as LK from '../links/links.js';
import * as REC from '../model/records.js';
import * as LAYER from '../text/layer.js';
import * as SEL from '../overlays/selection.js';
import * as HOST from '../overlays/host.js';
import * as CAM from '../plane/camera.js';
import { cornerHTML } from '../text/article.js';
import { spanOfBlock } from '../text/span.js';
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
  for (const id of ['K-1', 'K-7', 'K-11', 'K-13', 'K-14', 'K-20', 'K-21', 'K-30', 'K-40', 'K-41', 'K-45', 'K-46', 'K-47', 'K-48', 'K-49', 'K-51', 'K-52', 'K-57', 'K-62', 'K-70', 'K-71', 'K-72', 'K-74', 'K-76', 'K-77', 'K-100']) assert.ok(rows.some((r) => r.id === id), id);
});

test('Mod+L alone opens the LEAP box, and Mod+K is "link to…" at the selection, beside annotate\'s Mod+Shift+A and quote\'s Mod+Shift+C (D5 K-30, K-45, K-46, K-100)', () => {
  assert.deepEqual(rows.filter((r) => r.act === 'leap.open').map((r) => r.chord), ['Mod+L']);
  for (const [id, chord, act] of [['K-45', 'Mod+Shift+A', 'selection.annotate'], ['K-46', 'Mod+Shift+C', 'selection.quote'], ['K-100', 'Mod+K', 'selection.linkto']]) {
    assert.deepEqual(rows.filter((r) => r.chord === chord), [{ id, chord, act, surface: 'selection' }], `${chord}: ${id}'s row alone`);
  }
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

test('Mod+S writes nothing and is answered at the corner and in the status region: where the draft has a kept state, its statement whole at the first press in a session — the save chord\'s line at "kept" — and the corner\'s own word after it, the statement whole on the word\'s act, "nothing to save —" before the word and its reason at the other two; with no kept state the chord is taken, nothing opens and nothing is said; Enter at the corner is the word\'s act (K-57, K-74; BM-3; P41; FP-36)', () => onPlane(async ({ said }) => {
  await focusOn(D, 1);
  const corner = () => cornerHTML(REC.doc(D), LAYER.viewFor(REC.doc(D)));
  const before = said.length;
  assert.equal(await KEYS.dispatch(keyOf('s', MOD), PLANE), true, 'taken: the browser\'s save never runs');
  assert.ok(!LAYER.statementOpen(D) && corner().includes('kept-word pending') && said.length === before, 'no kept state: nothing to answer with, the slot empty, nothing said');
  REC.setKept(D, { word: 'kept', reason: null });
  assert.equal(await KEYS.dispatch(keyOf('s', MOD), PLANE), true);
  assert.ok(LAYER.statementOpen(D) && corner().includes(`<span class="kept-statement" data-string="B3.save.kept">${esc(t('B3.save.kept'))}</span>`), `the first press: the statement whole at the corner — ${corner()}`);
  assert.equal(said.at(-1), t('B3.save.kept'), 'the first press: the statement said in the status region');
  LAYER.openStatement(D, false);
  const reason = 'the board is not answering';
  REC.setKept(D, { word: 'not yet kept', reason });
  assert.equal(await KEYS.dispatch(keyOf('s', MOD), PLANE), true);
  assert.ok(!LAYER.statementOpen(D) && corner().includes('data-kept="not yet kept"') && !corner().includes('kept-statement'), 'after the first press the corner\'s own word alone answers');
  assert.equal(said.at(-1), t('B3.not-yet-kept'), 'after the first press: the corner\'s own word said in the status region');
  const target = /** @type {any} */ ({ closest: (/** @type {string} */ sel) => (sel === '[data-corner]' ? { dataset: { corner: D } } : null) });
  assert.equal(await KEYS.dispatch({ ...keyOf('Enter'), target }, { where: 'corner', byKey: true }), true);
  assert.ok(LAYER.statementOpen(D) && corner().includes(esc(`${t('B3.save.before')} ${t('L.kept.failed', { clause: t('B3.not-yet-kept'), reason })}`)), `Enter at the corner, the word's act: the statement whole, the reason on it — ${corner()}`);
  REC.setKept(D, { word: 'not kept', reason: 'refused: out_of_bounds' });
  assert.ok(corner().includes(esc(`${t('B3.save.before')} ${t('L.kept.failed', { clause: t('B3.not-kept'), reason: 'refused: out_of_bounds' })}`)), 'not kept: the same form with its word and reason');
  assert.equal(await KEYS.dispatch({ ...keyOf('Enter'), target }, { where: 'corner', byKey: true }), true);
  assert.ok(!LAYER.statementOpen(D), 'the act again closes it');
  assert.deepEqual([REC.edits(D), caret()], [[], null], 'the chord writes nothing and places no caret');
}));

test('at a corner offering acts, → moves the focus along them in order — the offered read, then a head\'s count of the items it folds — and ← back along them to the corner, each a key the page takes; → at the last act, ← at the corner, and either at a corner offering none are the platform\'s (D5 K-57, in K-22\'s form)', () => onPlane(async () => {
  const doc = /** @type {any} */ (globalThis.document);
  // a corner as T-LAYER stands it at its document's head, the read it offers and the count of the items it folds in it, and a corner offering none
  const el = /** @type {any} */ ({ dataset: { corner: D }, focus() { doc.activeElement = el; } });
  const act = /** @type {any} */ ({ dataset: { read: '3' }, focus() { doc.activeElement = act; } });
  const more = /** @type {any} */ ({ dataset: { more: '1' }, focus() { doc.activeElement = more; } });
  const ACTS = '[data-read], [data-more]';
  Object.assign(el, { closest: (/** @type {string} */ s) => (s === '[data-corner]' ? el : null), querySelector: (/** @type {string} */ s) => (s === '[data-read]' ? act : null), querySelectorAll: (/** @type {string} */ s) => (s === ACTS ? [act, more] : []) });
  Object.assign(act, { closest: (/** @type {string} */ s) => (s === '[data-corner]' ? el : s === '[data-read]' || s === ACTS ? act : null) });
  Object.assign(more, { closest: (/** @type {string} */ s) => (s === '[data-corner]' ? el : s === ACTS ? more : null) });
  const bare = /** @type {any} */ ({ dataset: { corner: D }, querySelector: () => null, querySelectorAll: () => [] });
  bare.closest = (/** @type {string} */ s) => (s === '[data-corner]' ? bare : null);
  const at = (/** @type {string} */ key, /** @type {unknown} */ target) => KEYS.dispatch({ ...keyOf(key), target }, { where: 'corner', byKey: true });
  doc.activeElement = el;
  assert.equal(await at('ArrowRight', el), true);
  assert.equal(doc.activeElement, act, '→: the focus on the offered read');
  assert.equal(await at('ArrowRight', act), true);
  assert.equal(doc.activeElement, more, '→ again: on the count of the items the head folds');
  assert.deepEqual([await at('ArrowRight', more), doc.activeElement], [false, more], '→ at the last act: nothing further along, the platform\'s');
  assert.equal(await at('ArrowLeft', more), true);
  assert.equal(doc.activeElement, act, '←: back to the offered read');
  assert.equal(await at('ArrowLeft', act), true);
  assert.equal(doc.activeElement, el, '← again: back to the corner');
  assert.deepEqual([await at('ArrowLeft', el), doc.activeElement], [false, el], '← at the corner: the platform\'s');
  assert.deepEqual([await at('ArrowRight', bare), await at('ArrowLeft', bare)], [false, false], 'a corner offering none: both the platform\'s');
  assert.ok(KEYS.TABLE.some((r) => r.id === 'K-57' && r.chord === '→' && r.surface === 'corner') && KEYS.TABLE.some((r) => r.id === 'K-57' && r.chord === '←' && r.surface === 'corner'), 'the table binds them at the corner, K-57\'s');
}));

/** the overlay host's stand-in element: what the host writes into it is the card a person meets */
const hostEl = { className: '', innerHTML: '', style: {}, setAttribute() {}, removeAttribute() {}, addEventListener() {}, querySelector: () => null, querySelectorAll: () => [], getBoundingClientRect: () => ({ left: 0, top: 0, width: 0, height: 0 }), contains: () => false };

/** a slot of the selection's card as the host holds it: its button's markup, and the card's reason line's — null where that line is hidden */
function slotIn(/** @type {string} */ slot) {
  const button = hostEl.innerHTML.match(new RegExp(`<button data-run="${slot}"[^>]*>.*?</button>`));
  const line = hostEl.innerHTML.match(/<div class="note reason"([^>]*)>(.*?)<\/div>/);
  return { button: button ? button[0] : null, reason: line && !/\bhidden\b/.test(line[1]) ? line[0] : null };
}

test('the inert slots\' chords — Mod+K "link to…", never the LEAP box, Mod+Shift+A annotate and Mod+Shift+C quote — act on the selection, else select the walk\'s focused span whole, and the selection\'s card gives the slot\'s reason: the slot marked inert with its chord drawn, the card\'s reason line its words, said through the status region; off any span the reason is said where the focus is, nothing selected and no card shown (D5 K-30, K-45, K-46, K-100; P47)', () => onPlane(async ({ said }) => {
  HOST.attach(/** @type {any} */ (hostEl));
  const SHIFT = { ...MOD, shiftKey: true };
  const block = spanOfBlock(O, /** @type {any} */ (REC.blockAt(O, 1)));
  for (const [key, mods, slot, chord, reason] of /** @type {const} */ ([['k', MOD, 'linkto', 'Mod+K', 'L.seam.link-to'], ['A', SHIFT, 'annotate', 'Mod+Shift+A', 'L.seam.annotate'], ['C', SHIFT, 'quote', 'Mod+Shift+C', 'L.seam.quote']])) {
    await focusOn(O, 1);
    SEL.clear();
    hostEl.innerHTML = '';
    const n = said.length;
    assert.equal(await KEYS.dispatch(keyOf(key, mods), PLANE), true, `${chord}: the page takes it`);
    const s = slotIn(slot);
    assert.deepEqual(SEL.selected(), block, `${chord}: no selection standing, the walk's focused span selected whole`);
    assert.ok(!!s.button && s.button.includes('data-inert="1"') && s.button.includes(`<kbd>${esc(KEYS.drawChord(chord))}</kbd>`), `${chord}: its slot marked inert, its chord drawn — ${s.button}`);
    assert.equal(s.reason, `<div class="note reason" data-string="${reason}">${esc(t(reason))}</div>`, `${chord}: the card's reason line gives the slot's words`);
    assert.deepEqual(['annotate', 'quote', 'linkto'].filter((x) => (slotIn(x).button || '').includes('data-inert')), [slot], `${chord}: its slot alone marked`);
    assert.deepEqual(said.slice(n), [t(reason)], `${chord}: said through the status region`);
  }
  await focusOn(O, 1);
  SEL.select(O, 3, 4);
  let n = said.length;
  assert.equal(await KEYS.dispatch(keyOf('k', MOD), PLANE), true);
  assert.deepEqual([SEL.selected(), slotIn('linkto').reason !== null, said.slice(n)], [{ addr: O, pos: 3, width: 4 }, true, [t('L.seam.link-to')]], 'Mod+K at a selection standing: the card at it gives the reason, the walk\'s span never selected over it');
  SEL.clear();
  hostEl.innerHTML = '';
  await WALK.focusTo(O, null, true, true, null, true);
  assert.equal(WALK.current()?.kind, 'document', 'the walk on the document whole: no span in focus');
  n = said.length;
  assert.equal(await KEYS.dispatch(keyOf('k', MOD), PLANE), true);
  assert.deepEqual([SEL.selected(), hostEl.innerHTML, said.slice(n)], [null, '', [t('L.seam.link-to')]], 'Mod+K off any span: nothing selected, no card, the reason said where the focus is');
}));

test('the other slots\' chords with nothing in focus that the slot acts on give its reason, "select a passage first", where the focus is, nothing selected and no card shown: at a document whole Mod+Shift+O, Mod+Shift+R, Mod+Enter and Mod+Shift+Enter, its links card opening at Mod+Shift+L; at an account and at the whole board all five (D5 K-47, K-48, K-49, K-51, K-52, §1.6; P47)', () => onPlane(async ({ said }) => {
  HOST.attach(/** @type {any} */ (hostEl));
  const SHIFT = { ...MOD, shiftKey: true };
  /** @type {Array<[string, object, string]>} each chord: its key, its modifiers, its name */
  const PASSAGE = [['O', SHIFT, 'Mod+Shift+O'], ['R', SHIFT, 'Mod+Shift+R'], ['Enter', MOD, 'Mod+Enter'], ['Enter', SHIFT, 'Mod+Shift+Enter']];
  const ALL = [...PASSAGE, ['L', SHIFT, 'Mod+Shift+L']];
  for (const [at, kind, chords] of /** @type {const} */ ([[O, 'document', PASSAGE], ['1.0.2', 'account', ALL], ['1', 'board', ALL]])) {
    await WALK.focusTo(at, null, true, true, null, true);
    assert.equal(WALK.current()?.kind, kind, `the walk on the ${kind}: no span in focus`);
    for (const [key, mods, chord] of chords) {
      SEL.clear();
      hostEl.innerHTML = '';
      const n = said.length;
      assert.equal(await KEYS.dispatch(keyOf(key, mods), PLANE), true, `${chord} at the ${kind}: the page takes it`);
      assert.deepEqual([SEL.selected(), hostEl.innerHTML, said.slice(n)], [null, '', [t('D5.select-first')]], `${chord} at the ${kind}: nothing selected, no card, the slot's reason said where the focus is`);
    }
  }
  await WALK.focusTo(O, null, true, true, null, true);
  const n = said.length;
  assert.equal(await KEYS.dispatch(keyOf('L', SHIFT), PLANE), true);
  assert.deepEqual([HOST.currentState()?.id, said.slice(n)], ['links:' + O, []], 'Mod+Shift+L at a document whole opens the links card at it, no reason said');
  HOST.dismiss();
}));

/** a link's end over `w` positions of a document's text from its ordinal `ord`, as the board names a slot's span */
const endOf = (/** @type {string} */ doc, /** @type {number} */ ord, /** @type {number} */ w) => ({ start: `${doc}.0.1.${ord}`, width: '0.0.0.0.0.0.0.' + w, doc, account: doc.split('.').slice(0, 3).join('.'), whole: false, subspace: 1, ordinal: ord, positions: w });
/** the follow's chord (K-51) */
const MOD_ENTER = keyOf('Enter', MOD);
/** the overlay standing, by its id; null where none stands */
const overlay = () => HOST.currentState()?.id ?? null;

/**
 * The overlay host attached, and two links of the person's own homed in D, each from its first span to O, so a follow
 * there asks which of them: D's first span, and L1's end as drawn there.
 */
function twoLinks() {
  HOST.attach(/** @type {any} */ (hostEl));
  const L1 = D + '.0.2.1', L2 = D + '.0.2.2';
  REC.takeLinks(D, [L1, L2]);
  REC.takeLink(/** @type {any} */ ({ addr: L1, from: [endOf(D, 1, 5)], to: [endOf(O, 1, 4)], type: '1.1.0.1.0.1.0.3.13' }));
  REC.takeLink(/** @type {any} */ ({ addr: L2, from: [endOf(D, 1, 5)], to: [endOf(O, 6, 4)], type: '1.1.0.1.0.1.0.3.13' }));
  const first = spanOfBlock(D, /** @type {any} */ (REC.blockAt(D, 1)));
  assert.equal(LK.shownAt(D, first).length, 2, 'both links drawn at D\'s first span');
  return { first, l1: /** @type {import('../links/links.js').Shown} */ (LK.shown(D).find((x) => x.link.addr === L1)) };
}

test('Mod+Enter at the live caret Enter placed at the walk\'s span, its two links drawn there and no selection standing, selects nothing, lists and follows nothing and leaves the caret where it stands, the caret\'s follow line in the one line and said through the status region; with a selection standing at the live caret it follows from the selection; at the kept caret it acts on the kept span as on the plane (D5 K-51; B3-S13)', () => onPlane(async ({ said }) => {
  const { first } = twoLinks();
  const reason = t('B3.row.follow.inert');
  await focusOn(D, 1);
  await KEYS.dispatch(keyOf('Enter'), PLANE);
  assert.deepEqual(caret(), [D, 1, true]);
  let n = said.length;
  const trail = TRAIL.all().length;
  assert.equal(await KEYS.dispatch(MOD_ENTER, PLANE), true, 'taken: the platform runs nothing of its own');
  assert.deepEqual([SEL.selected(), overlay(), caret(), TRAIL.all().length, said.slice(n)], [null, null, [D, 1, true], trail, [reason]],
    'Mod+Enter at the bare caret: no span selected, no "which" list, the caret live where it stood, the trail as it was, the caret\'s follow line said');

  // the caret kept: the text left to the walk at its span
  assert.equal(await KEYS.dispatch(keyOf('Escape'), PLANE), true);
  await tick();
  assert.deepEqual([caret(), WALK.current()?.kind, WALK.current()?.pos], [[D, 1, false], 'block', 1]);
  n = said.length;
  assert.equal(await KEYS.dispatch(MOD_ENTER, PLANE), true);
  assert.deepEqual([SEL.selected(), overlay(), caret(), said.slice(n).includes(reason)], [first, 'which', [D, 1, false], false],
    'Mod+Enter at the kept caret\'s span: the span selected whole and its two links listed, as on the plane');
  await KEYS.dispatch(keyOf('Escape'), PLANE);
  await KEYS.dispatch(keyOf('Escape'), PLANE);
  assert.deepEqual([overlay(), SEL.selected()], [null, null]);

  // a selection standing at the live caret, as a drag or Shift with the arrows at the caret leaves one
  assert.equal(await KEYS.dispatch(keyOf('Enter'), PLANE), true);
  assert.deepEqual(caret(), [D, 1, true], 'Enter at the kept span returns the caret');
  SEL.select(D, 1, 5);
  n = said.length;
  assert.equal(await KEYS.dispatch(MOD_ENTER, PLANE), true);
  assert.deepEqual([SEL.selected(), overlay(), caret(), said.slice(n).includes(reason)], [{ addr: D, pos: 1, width: 5 }, 'which', [D, 1, true], false],
    'Mod+Enter with a selection standing at the live caret: its two links listed, the caret live where it stood, no line said');
  HOST.dismiss();
}));

// placed last: the follow it guards against, where it is made, leaves a jump in the air for the tests after it
test('Mod+Enter at a live caret a click placed in the draft\'s second line, the walk left on a link\'s stop in its first and no selection standing, follows no link from the stop — the trail as it was, nothing faced — and leaves the caret where it stands, the caret\'s follow line in the one line and said through the status region (D5 K-51; B3-S13)', () => onPlane(async ({ said }) => {
  const { l1 } = twoLinks();
  await WALK.focusTo(D, l1.pos, true, true, { link: l1.link.addr, key: l1.key }, true);
  LAYER.placeCaret(D, 14);
  assert.deepEqual([WALK.current()?.kind, WALK.current()?.link?.link.addr, caret()], ['link', l1.link.addr, [D, 14, true]], 'the walk on L1\'s stop, the caret live in the second line');
  const n = said.length, trail = TRAIL.all().length;
  assert.equal(await KEYS.dispatch(MOD_ENTER, PLANE), true);
  assert.deepEqual([SEL.selected(), overlay(), caret(), TRAIL.all().length, said.slice(n)], [null, null, [D, 14, true], trail, [t('B3.row.follow.inert')]],
    'Mod+Enter at the bare caret with the walk on a link\'s stop: no follow from the stop, no span selected, the caret live where it stood, the caret\'s follow line said');
  HOST.dismiss();
}));
