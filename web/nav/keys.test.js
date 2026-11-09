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
// line, Space and another's text by K-9's, each line its hint at the focus —
// whole at its first press in the session, its first clause after, an
// auto-repeat answered by nothing; Mod+S writes nothing, answered
// at the corner and in the status region with the kept state's statement
// whole at the first press in a session and the corner's own word after it,
// the statement whole on the word's act; → and ← at a corner move the focus
// along its acts — the read it offers, a head's count of the items it folds —
// and back; the inert slots' chords give their slot's reason at the acts
// card drawn at the selection, else at the walk's focused span, which nothing
// selects, else where the focus is; every other slot's chord, with nothing in
// focus that its slot acts on, gives "select a passage first" where the focus
// is; a key moving the caret stands the walk on the caret's span, the ring's
// rule as it stood, and a camera move leaves it there, so a slot chord at the
// caret acts on that span; once Esc, a zoom past its reading scale or a key
// pressed below that scale leaves the caret kept, its span holds the walk,
// each re-take with a line of it in view taking the walk back there — no move
// the page makes of its own releasing it — until the person's next walk move
// or landing; Shift with an arrow at a live caret moves it and
// runs the selection from where it stood to it, while off one Shift+↓ stays
// K-8's; Shift with ← or → at the span a kept caret stands in returns it and
// extends a selection from it a character — from the caret, never from the
// span's edge — and where the caret cannot move that way returns it alone,
// the selection standing, while at a span of the draft holding no caret it is
// the platform's; at the walk's span in text the person may not edit it
// selects from the focus's edge a character a press — → from the span's
// start, ← from the end of its text — then moves the selection's moving end,
// its anchor standing, a selection the page made in another document
// replaced and one the platform made extended where it stands, and below the
// span's reading scale it is the platform's; a caret at the text's end stands
// in its last span, and one kept in
// white space alone — a line of spaces, the newlines before the first typed
// line — in the span the walk stands on there, each a span Esc leaves the
// walk on and where Enter or a printable key returns the caret, a paste there
// the platform's; Mod+Enter at
// a live caret follows from a selection drawn in the caret's own text alone —
// with none there, whatever a slot chord made before it and wherever else a
// selection stands, it selects nothing, follows nothing and leaves the caret
// where it stands, giving the caret's follow line where the focus is — while
// at a kept caret it acts on the kept span as on the plane; a key that puts
// text in or takes it out at the caret, live or kept, replaces a selection
// drawn in the caret's own text, the selection and its card ended, and types
// at the caret where that selection is not whole in the text shown or the
// selection is another document's; and an arrow without Shift there ends that
// selection, ← and → putting the caret at its start and its end; every
// teleport into a live caret's own draft — a LEAP, Back, Forward, a find's
// move — leaves the caret kept where it stood, a printable key at the landing
// answered by the draft's own line, and a zoom past its reading scale leaves
// it kept too, a key pressed below that scale typing nothing; and Home and
// End at a live caret move it to the start and the end of its line — a
// wrap's white space left after it, a break after a hyphen standing on the
// line before — the walk and the camera still, Shift extending a selection
// from it (D5 K-8, K-9,
// K-30, K-45 … K-52, K-57, K-70, K-71, K-72, K-74, K-76, K-77, K-93, K-100,
// M-2, M-13, §1.6, §4 rules 2, 3 and 8; D6 BM-1, BM-3, BM-4, BM-52, BM-54,
// BM-70, BM-75; B3-S1, B3-S13; P47; FP-10, FP-14, FP-36).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as KEYS from './keys.js';
import * as WALK from './walk.js';
import * as FOCUS from './focus.js';
import * as TRAIL from './trail.js';
import * as GO from './go.js';
import * as PORT from '../bridge/port.js';
import * as FAKE from '../test/fake-port.js';
import * as LK from '../links/links.js';
import * as REC from '../model/records.js';
import * as LAYER from '../text/layer.js';
import * as SEL from '../overlays/selection.js';
import * as HOST from '../overlays/host.js';
import * as HINT from '../overlays/hint.js';
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
const keyOf = (/** @type {string} */ key, /** @type {{metaKey?: boolean, ctrlKey?: boolean, shiftKey?: boolean, repeat?: boolean}} */ mods = {}) => /** @type {any} */ ({ type: 'keydown', key, keyCode: 0, isComposing: false, repeat: false, metaKey: false, ctrlKey: false, shiftKey: false, altKey: false, preventDefault() {}, ...mods });
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
 * (`said`), an emptied region telling nothing — with D and O held as drafts, the session 1.0.1's, the camera at D's
 * reading scale, and no hint standing or shown whole yet; every caret, edit, selection and hint let go after it.
 * @param {(p: {said: string[]}) => Promise<void>} body
 */
async function onPlane(body) {
  const platform = { document: globalThis.document, window: globalThis.window };
  /** @type {string[]} */
  const said = [];
  let words = '';
  const live = { setAttribute() {}, set textContent(/** @type {string} */ v) { words = v; if (v) said.push(v); }, get textContent() { return words; } };
  globalThis.document = /** @type {any} */ ({ activeElement: null, body: null });
  globalThis.window = /** @type {any} */ ({ addEventListener() {}, getSelection: () => null });
  REC._reset(); HINT._reset();
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
  try { await body({ said }); } finally { HOST.dismiss(); LAYER.clear(); SEL.clear(); REC._reset(); HINT._reset(); globalThis.document = platform.document; globalThis.window = platform.window; }
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

test('at a span of a draft the person may edit holding no caret a printable key is answered by the draft\'s own line and a paste or a cut by that line in their own words, nothing placed and nothing removed; Space keeps K-9\'s line; a kept caret in another span is not returned there, and Enter places a new caret at the span\'s start; at another\'s text K-9\'s line stands, a paste is the platform\'s, Enter selects the span and no caret is placed, the walk\'s move there leaving a live caret kept; each line its hint at the focus, whole at its first press in the session and its first clause at every later one, a held key\'s auto-repeat answered by nothing (K-9, K-70, K-72, K-93; BM-52)', () => onPlane(async ({ said }) => {
  await focusOn(D, 14);
  assert.equal(await KEYS.dispatch(keyOf('q'), PLANE), true);
  assert.deepEqual([said.at(-1), caret(), REC.edits(D)], [t('B3.caret.enter'), null, []], 'the draft\'s own line; nothing typed, no caret');
  assert.equal(await KEYS.dispatch(keyOf('v', MOD), PLANE), true);
  assert.equal(said.at(-1), t('B3.caret.enter.paste'), 'a paste: the line in its own words');
  assert.equal(await KEYS.dispatch(keyOf('x', MOD), PLANE), true);
  assert.equal(said.at(-1), t('B3.caret.cut'), 'a cut: the line in its own words');
  assert.equal(await KEYS.dispatch(keyOf(' '), PLANE), true);
  assert.equal(said.at(-1), t('F.swallow.space', { 'paging key': 'PageDown' }), 'Space: K-9\'s own line, whole at its first press');
  assert.equal(await KEYS.dispatch(keyOf(' '), PLANE), true);
  assert.deepEqual([said.at(-1), HINT.standing()], ['Space does not page here', { id: 'F.swallow.space', words: 'Space does not page here', whole: t('F.swallow.space', { 'paging key': 'PageDown' }), open: false }],
    'Space again: its first clause, the notice whole kept as its description');
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
  assert.deepEqual([said.at(-1), caret()], [t('F.swallow', { 'LEAP chord': KEYS.drawChord('Mod+L') }), [D, 1, false]], 'at text the person may not edit K-9\'s line, whole at its first press; the walk\'s move away left the live caret kept');
  assert.equal(await KEYS.dispatch(keyOf('w'), PLANE), true);
  assert.deepEqual([said.at(-1), HINT.standing()?.words, HINT.standing()?.open], ['typing goes nowhere here', 'typing goes nowhere here', false], 'a later press: its first clause, said again');
  const n = said.length;
  assert.equal(await KEYS.dispatch(keyOf('w', { repeat: true }), PLANE), true, 'an auto-repeat is taken, typing nothing');
  await tick();
  assert.deepEqual([said.length, HINT.standing()?.words], [n, 'typing goes nowhere here'], 'and answered by nothing: its press was answered');
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

/** the span the acts card or the "which" list standing holds of its own, by position (O-SELECTION's `About.at`); null where it stands at the selection, or none stands */
function holds() {
  const a = /** @type {any} */ (HOST.currentState()?.about);
  return a && a.at ? { addr: a.at.addr, pos: a.at.pos, width: a.at.width } : null;
}

test('the inert slots\' chords — Mod+K "link to…", never the LEAP box, Mod+Shift+A annotate and Mod+Shift+C quote — act on the selection, else on the walk\'s focused span whole, selecting nothing, and the acts card at it gives the slot\'s reason: the slot marked inert with its chord drawn, the card\'s reason line its words, said through the status region; off any span the reason is said where the focus is, nothing selected and no card shown (D5 K-30, K-45, K-46, K-100; P47)', () => onPlane(async ({ said }) => {
  HOST.attach(/** @type {any} */ (hostEl));
  const SHIFT = { ...MOD, shiftKey: true };
  const block = spanOfBlock(O, /** @type {any} */ (REC.blockAt(O, 1)));
  for (const [key, mods, slot, chord, reason] of /** @type {const} */ ([['k', MOD, 'linkto', 'Mod+K', 'L.seam.link-to'], ['A', SHIFT, 'annotate', 'Mod+Shift+A', 'L.seam.annotate'], ['C', SHIFT, 'quote', 'Mod+Shift+C', 'L.seam.quote']])) {
    await focusOn(O, 1);
    HOST.dismiss();
    hostEl.innerHTML = '';
    const n = said.length;
    assert.equal(await KEYS.dispatch(keyOf(key, mods), PLANE), true, `${chord}: the page takes it`);
    const s = slotIn(slot);
    assert.deepEqual([SEL.selected(), HOST.currentState()?.anchor, holds()], [null, { span: block }, block], `${chord}: no selection standing — the card at the walk's focused span whole, which it holds, nothing selected`);
    assert.ok(!!s.button && s.button.includes('data-inert="1"') && s.button.includes(`<kbd>${esc(KEYS.drawChord(chord))}</kbd>`), `${chord}: its slot marked inert, its chord drawn — ${s.button}`);
    assert.equal(s.reason, `<div class="note reason" data-string="${reason}">${esc(t(reason))}</div>`, `${chord}: the card's reason line gives the slot's words`);
    assert.deepEqual(['annotate', 'quote', 'linkto'].filter((x) => (slotIn(x).button || '').includes('data-inert')), [slot], `${chord}: its slot alone marked`);
    assert.deepEqual(said.slice(n), [t(reason)], `${chord}: said through the status region`);
  }
  await focusOn(O, 1);
  SEL.select(O, 3, 4);
  let n = said.length;
  assert.equal(await KEYS.dispatch(keyOf('k', MOD), PLANE), true);
  assert.deepEqual([SEL.selected(), holds(), slotIn('linkto').reason !== null, said.slice(n)], [{ addr: O, pos: 3, width: 4 }, null, true, [t('L.seam.link-to')]], 'Mod+K at a selection standing: the card at it gives the reason, holding no span of its own, the walk\'s span never taken over it');
  SEL.clear();
  hostEl.innerHTML = '';
  await WALK.focusTo(O, null, true, true, null, true);
  assert.equal(WALK.current()?.kind, 'document', 'the walk on the document whole: no span in focus');
  n = said.length;
  assert.equal(await KEYS.dispatch(keyOf('k', MOD), PLANE), true);
  await tick();
  assert.deepEqual([SEL.selected(), hostEl.innerHTML, said.slice(n), HINT.standing()?.id], [null, '', [t('L.seam.link-to')], 'L.seam.link-to'],
    'Mod+K off any span: nothing selected, no card, the reason its hint at the focus, said again though the region held those words');
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
      await tick();
      assert.deepEqual([SEL.selected(), hostEl.innerHTML, said.slice(n), HINT.standing()?.id], [null, '', [t('D5.select-first')], 'D5.select-first'],
        `${chord} at the ${kind}: nothing selected, no card, the slot's reason its hint at the focus, said at every press`);
    }
  }
  await WALK.focusTo(O, null, true, true, null, true);
  const n = said.length;
  assert.equal(await KEYS.dispatch(keyOf('L', SHIFT), PLANE), true);
  assert.deepEqual([HOST.currentState()?.id, said.slice(n)], ['links:' + O, []], 'Mod+Shift+L at a document whole opens the links card at it, no reason said');
  HOST.dismiss();
}));

test('a key moving a live caret into another span stands the walk on that span, naming the span\'s own first position, the ring\'s rule as it stood — drawn where a key drew it, out where a pointer put it out — so a slot chord pressed at the caret acts on the caret\'s span: ↓ from the first line takes the walk to the second, Mod+K there drawing its card at the second whole, and ↑ takes it back (B3-S13; D5 K-71, K-100; §4 rule 2)', () => onPlane(async () => {
  HOST.attach(/** @type {any} */ (hostEl));
  await focusOn(D, 1);
  assert.equal(await KEYS.dispatch(keyOf('Enter'), PLANE), true);
  assert.deepEqual([caret(), WALK.current()?.pos, FOCUS.ringShown()], [[D, 1, true], 1, true], 'the caret live at the first span\'s start, the walk there, a key\'s ring drawn');
  assert.equal(await KEYS.dispatch(keyOf('ArrowDown'), PLANE), true);
  assert.deepEqual([caret(), WALK.current()?.kind, WALK.current()?.addr, WALK.current()?.pos, WALK.landedAt(), FOCUS.ringShown()], [[D, 14, true], 'block', D, 14, 14, true],
    '↓: the caret in the second line, the walk on its span naming the span\'s own first position, the ring drawn as it stood');
  assert.equal(await KEYS.dispatch(keyOf('k', MOD), PLANE), true);
  assert.deepEqual([holds(), SEL.selected(), caret()], [spanOfBlock(D, /** @type {any} */ (REC.blockAt(D, 14))), null, [D, 14, true]], 'Mod+K at the caret: the acts card at the caret\'s span whole, never the first, nothing selected; the caret where it stood');
  HOST.dismiss();
  assert.equal(await KEYS.dispatch(keyOf('ArrowUp'), PLANE), true);
  assert.deepEqual([caret(), WALK.current()?.pos], [[D, 1, true], 1], '↑: the caret back in the first line, the walk with it');
  // the caret kept, the walk landed at its span by a pointer — the ring out — and the caret returned there
  await KEYS.dispatch(keyOf('Escape'), PLANE);
  await tick();
  await WALK.focusTo(D, 1, false, true, null, true);
  assert.equal(await KEYS.dispatch(keyOf('Enter'), PLANE), true);
  assert.deepEqual([caret(), FOCUS.ringShown()], [[D, 1, true], false], 'the kept caret returned live, the ring out');
  assert.equal(await KEYS.dispatch(keyOf('ArrowDown'), PLANE), true);
  assert.deepEqual([WALK.current()?.pos, FOCUS.ringShown()], [14, false], '↓: the walk on the second span, the ring still out');
}));

test('a caret at the end of a draft\'s text stands in its last span: Esc there leaves the text to the walk on that span, the caret kept, and Enter at that span, or a printable key, returns the kept caret where it stood (D5 K-70, K-72, K-77; BM-4, BM-52)', () => onPlane(async () => {
  await focusOn(D, 14);
  LAYER.placeCaret(D, N + 1);
  assert.deepEqual(caret(), [D, N + 1, true], 'the caret live at the text\'s end, one past its last position');
  assert.equal(await KEYS.dispatch(keyOf('Escape'), PLANE), true);
  await tick();
  assert.deepEqual([caret(), WALK.current()?.kind, WALK.current()?.pos], [[D, N + 1, false], 'block', 14], 'Esc: the caret kept at the end, the walk on the last span, never the first');
  assert.equal(await KEYS.dispatch(keyOf('Enter'), PLANE), true);
  assert.deepEqual([caret(), REC.edits(D)], [[D, N + 1, true], []], 'Enter at the last span returns the kept caret at the end, nothing inserted');
  await KEYS.dispatch(keyOf('Escape'), PLANE);
  await tick();
  assert.equal(await KEYS.dispatch(keyOf('z'), PLANE), true);
  assert.deepEqual([caret(), REC.edits(D).map((e) => [e.pos, e.width, e.text])], [[D, N + 2, true], [[N + 1, 0, 'z']]], 'a printable key at the last span returns the kept caret and types at the end');
}));

/** a document's text read again as `text`, delivered whole */
function deliver(/** @type {string} */ addr, /** @type {string} */ text) {
  const n = byteLength(text);
  REC.invalidate(addr);
  REC.takeSpanSet(addr, [{ subspace: 1, ordinal: 1, positions: n }]);
  REC.takeDelivery(addr, [{ pos: 1, width: n, kind: 'content', text, ref: null, origin: null }]);
  REC.takeImage(addr, 1, [{ iStart: addr + '.0.1.1', width: n }]);
}

test('a caret kept in a line of white space alone stands in the span the walk stands on there, the span before it: Esc leaves the walk on that span, and there Enter returns the kept caret where it stood, a printable key returns it and types at it and a paste is the platform\'s, never the line of a span holding no caret; at the span after the line Enter places a caret of its own (D5 §4 rule 20; K-70, K-72, K-77, K-93; BM-52)', () => onPlane(async ({ said }) => {
  deliver(D, 'First line.\n\n   \n\nSecond line here.\n');
  assert.deepEqual(REC.doc(D).blocks.map((b) => [b.pos, b.text]), [[1, 'First line.'], [14, '   '], [19, 'Second line here.']], 'a line of three spaces between two typed lines');
  assert.equal(LAYER.editable(D), true);
  await focusOn(D, 1);
  LAYER.placeCaret(D, 15);
  assert.deepEqual(caret(), [D, 15, true], 'the caret live in the line of spaces');
  assert.equal(await KEYS.dispatch(keyOf('Escape'), PLANE), true);
  await tick();
  assert.deepEqual([caret(), WALK.current()?.kind, WALK.current()?.pos], [[D, 15, false], 'block', 1], 'Esc: the caret kept in the line of spaces, the walk on the span before it');
  assert.deepEqual([LAYER.caretInSpan(D, 1), LAYER.caretSpan()?.block], [true, 1], 'the kept caret stands in the span the walk stands on');
  assert.equal(await KEYS.dispatch(keyOf('Enter'), PLANE), true);
  assert.deepEqual([caret(), REC.edits(D)], [[D, 15, true], []], 'Enter at that span returns the kept caret where it stood, nothing inserted');
  await KEYS.dispatch(keyOf('Escape'), PLANE);
  await tick();
  const before = said.length;
  assert.equal(await KEYS.dispatch(keyOf('v', MOD), PLANE), false, 'a paste at the kept caret\'s span: the platform\'s own');
  assert.deepEqual([said.length, caret()], [before, [D, 15, false]], 'no line said, the caret kept');
  assert.equal(await KEYS.dispatch(keyOf('z'), PLANE), true);
  assert.deepEqual([caret(), REC.edits(D).map((e) => [e.pos, e.width, e.text]), WALK.current()?.pos], [[D, 16, true], [[15, 0, 'z']], 1], 'a printable key at that span returns the kept caret and types at it, the walk on the span');
  await KEYS.dispatch(keyOf('Escape'), PLANE);
  await tick();
  await focusOn(D, 19);
  assert.equal(await KEYS.dispatch(keyOf('Enter'), PLANE), true);
  assert.deepEqual(caret(), [D, 20, true], 'Enter at the span after the line: a caret at that span\'s start, the kept caret not returned there');
}));

test('a caret kept in the newlines before a draft\'s first typed line stands in that line\'s span, the one the walk stands on there: Esc leaves the walk on it, and Enter at it returns the kept caret where it stood, never a caret at the span\'s start (D5 §4 rule 20; K-70, K-77; BM-52)', () => onPlane(async () => {
  deliver(D, '\n\nFirst line.\n');
  assert.deepEqual(REC.doc(D).blocks.map((b) => [b.pos, b.text]), [[1, ''], [3, 'First line.']], 'the newlines before the first typed line one block of no text');
  await focusOn(D, 3);
  LAYER.placeCaret(D, 1);
  assert.equal(await KEYS.dispatch(keyOf('Escape'), PLANE), true);
  await tick();
  assert.deepEqual([caret(), WALK.current()?.kind, WALK.current()?.pos], [[D, 1, false], 'block', 3], 'Esc: the caret kept before the first typed line, the walk on that line\'s span');
  assert.equal(await KEYS.dispatch(keyOf('Enter'), PLANE), true);
  assert.deepEqual([caret(), REC.edits(D)], [[D, 1, true], []], 'Enter at that span returns the kept caret where it stood');
}));

test('a camera move leaves the walk at a live caret\'s span, the focus being the caret, which no camera move moves, so a slot chord pressed after it acts there; once Esc, a zoom past the caret\'s reading scale or a key pressed below that scale leaves the caret kept, its span holds the walk — a re-take with a line of it in view at a scale the person may edit it at takes the walk back to it, whatever stands under the view\'s centre, so a printable key there types at the kept caret, and one with none of it in view takes the place under the centre — until the person\'s next walk move or landing releases it, the re-take then taking the walk under the view\'s centre (B3-S1; D5 §4 rule 3, M-2; B3-S13; K-11, K-77, K-100)', () => onPlane(async () => {
  HOST.attach(/** @type {any} */ (hostEl));
  const f = LAYER.foldOf(REC.doc(D)), reading = CAM.view();
  /** the walk's element: its kind, its place, its position */
  const at = () => { const n = WALK.current(); return n && [n.kind, n.addr, n.pos]; };
  /** a zoom chord pressed until D stands at its reading scale or below it */
  const zoomTo = async (/** @type {boolean} */ readable) => {
    for (let i = 0; i < 4 && LAYER.atReadingScale(D) !== readable; i++) { assert.equal(await KEYS.dispatch(keyOf(readable ? '=' : '-', MOD), PLANE), true); await tick(); }
    assert.equal(LAYER.atReadingScale(D), readable);
  };
  await focusOn(D, 14);
  assert.equal(await KEYS.dispatch(keyOf('Enter'), PLANE), true);
  const under = WALK.elementUnder(reading), there = [under.kind, under.addr, under.pos];
  assert.deepEqual([caret(), under.kind, under.addr, under.pos !== 14], [[D, 14, true], 'block', D, true], 'the caret live in the second span; the view\'s centre over another span of the draft');
  await WALK.retakeFromView();
  assert.deepEqual([WALK.current()?.kind, WALK.current()?.pos, caret()], ['block', 14, [D, 14, true]], 'the re-take leaves the walk at the caret\'s span, the caret live');
  assert.equal(await KEYS.dispatch(keyOf('k', MOD), PLANE), true);
  assert.deepEqual([holds(), SEL.selected()], [spanOfBlock(D, /** @type {any} */ (REC.blockAt(D, 14))), null], 'Mod+K after the camera move: the acts card at the caret\'s span whole, nothing selected');
  HOST.dismiss();
  assert.equal(await KEYS.dispatch(keyOf('Escape'), PLANE), true);
  await tick();
  assert.deepEqual([caret(), WALK.current()?.pos], [[D, 14, false], 14], 'Esc: the caret kept, the walk on its span');
  await WALK.retakeFromView();
  assert.deepEqual([at(), caret()], [['block', D, 14], [D, 14, false]], 'the re-take: the walk held on the kept caret\'s span, its line in view, never moved under the view\'s centre');
  assert.equal(await KEYS.dispatch(keyOf('q'), PLANE), true);
  assert.deepEqual([caret(), shown()], [[D, 15, true], TEXT.slice(0, 13) + 'q' + TEXT.slice(13)], 'q at the held span returns the kept caret and types at it');

  // none of the kept span in view: the place under the view's centre; back over it, the span again
  await KEYS.dispatch(keyOf('Escape'), PLANE);
  await tick();
  CAM.set({ ...reading, y: reading.y + 2000 / reading.scale });
  const away = WALK.elementUnder(CAM.view());
  assert.ok(!LAYER.inView(D) && away.addr !== D, `D's text out of view, the centre over ${away.kind} ${away.addr}`);
  await WALK.retakeFromView();
  assert.deepEqual(at(), [away.kind, away.addr, away.pos], 'none of the kept span in view: the re-take takes the place under the view\'s centre');
  CAM.set(reading);
  await WALK.retakeFromView();
  assert.deepEqual([at(), caret()], [['block', D, 14], [D, 15, false]], 'the camera back over it: the walk on the kept caret\'s span, the re-take\'s own move releasing nothing');

  // a zoom out over the draft and back: from the kept caret, then — Esc's hold released by a landing — from a live one
  await zoomTo(false);
  assert.deepEqual(at(), ['document', D, null], 'Mod+- past D\'s reading scale: the walk re-taken on D whole');
  await zoomTo(true);
  assert.deepEqual([at(), caret()], [['block', D, 14], [D, 15, false]], 'Mod+= back to it: the walk on the kept caret\'s span');
  await focusOn(D, 14);
  assert.equal(await KEYS.dispatch(keyOf('Enter'), PLANE), true);
  assert.deepEqual(caret(), [D, 15, true], 'Enter at the span landed on returns the kept caret');
  await zoomTo(false);
  assert.deepEqual([at(), caret()], [['document', D, null], [D, 15, false]], 'a zoom past its reading scale from the live caret: the caret kept, the walk on D whole');
  await zoomTo(true);
  assert.deepEqual(at(), ['block', D, 14], 'and back: the walk on the kept caret\'s span, the zoom having left the caret with its span held');

  // a key pressed below the caret's reading scale before any re-take: the caret kept, its span held
  CAM.set(reading);
  await focusOn(D, 14);
  assert.equal(await KEYS.dispatch(keyOf('Enter'), PLANE), true);
  CAM.set({ ...reading, scale: 7 / f.fs });
  assert.equal(await KEYS.dispatch(keyOf('w'), PLANE), true);
  assert.deepEqual([caret(), at()], [[D, 15, false], ['block', D, 14]], 'w below the scale: swallowed, the caret kept, the walk where it stood');
  CAM.set(reading);
  await WALK.retakeFromView();
  assert.deepEqual(at(), ['block', D, 14], 'at reading scale again: the re-take keeps the walk on the kept caret\'s span');

  // the person's next walk move releases the hold
  await landed(KEYS.dispatch(keyOf('ArrowUp'), PLANE));
  await landed(KEYS.dispatch(keyOf('ArrowDown'), PLANE));
  assert.deepEqual(at(), ['block', D, 14], '↑ then ↓: the walk on the kept caret\'s span by the person\'s own moves');
  CAM.set(reading);
  await WALK.retakeFromView();
  assert.deepEqual([at(), caret()], [there, [D, 15, false]], 'released by the walk moves: the re-take takes the walk under the view\'s centre, the caret kept');

  // and so does a landing, on the kept caret's span itself
  await focusOn(D, 14);
  assert.equal(await KEYS.dispatch(keyOf('Enter'), PLANE), true);
  assert.equal(await KEYS.dispatch(keyOf('Escape'), PLANE), true);
  await tick();
  await WALK.retakeFromView();
  assert.deepEqual(at(), ['block', D, 14], 'Esc again: the span holds the walk');
  await focusOn(D, 14);
  await WALK.retakeFromView();
  assert.deepEqual(at(), there, 'released by the landing: the re-take takes the walk under the view\'s centre');
}));

test('the moves the page makes of its own — the box the walk stands in shown on a newer version, a reading scene\'s close returning the focus as the scene found it, a change of the page\'s class — leave the kept caret\'s span holding the walk, the next re-take with it in view taking the walk back there (B3-S1; D5 §4 rules 3 and 8; FP-22, FP-29)', () => onPlane(async () => {
  const fake = FAKE.create({});
  PORT.boot(fake);
  // D's metadata and links held beside its text, so reading it whole reads nothing
  REC.takeMetadata(D, { doc: D, published: false, owner: '1.0.1', birth: null, birthExtent: null, placed: null, baseExtent: null, source: null, asOf: 1 });
  REC.takeLinks(D, []);
  const under = WALK.elementUnder(CAM.view());
  /** the walk's element: its kind, its place, its position */
  const at = () => { const n = WALK.current(); return n && [n.kind, n.addr, n.pos]; };
  try {
    await focusOn(D, 14);
    assert.equal(await KEYS.dispatch(keyOf('Enter'), PLANE), true);
    assert.equal(await KEYS.dispatch(keyOf('Escape'), PLANE), true);
    await tick();
    assert.deepEqual([at(), caret(), under.pos !== 14], [['block', D, 14], [D, 14, false], true], 'Esc: the caret kept, the walk on its span, the view\'s centre over another span');
    /** @type {Array<[string, () => Promise<unknown>]>} each move the page makes of its own */
    const moves = [
      ['the box shown on a newer version', () => WALK.standAgain(D, under.pos)],
      ['a reading scene\'s close', () => WALK.returnFocusTo(D, under.pos, true, true)],
      ['a change of the page\'s class', () => WALK.dropped({ row: null, addrs: null, at: Date.now() })],
    ];
    for (const [what, move] of moves) {
      await move();
      await WALK.retakeFromView();
      assert.deepEqual([at(), caret()], [['block', D, 14], [D, 14, false]], `${what}: the re-take takes the walk back to the kept caret's span`);
    }
    assert.deepEqual(fake.unanswered, []);
  } finally { PORT.boot(null); }
}));

test('Shift with each arrow at a live caret moves it — ↓ and ↑ a line, → and ← a character — and the selection runs from where it stood to it, then on from that anchor, the walk following the caret\'s span and the selection\'s card shown, none standing where the caret comes back to the anchor and nothing typed; with the caret kept, Shift+↓ is K-8\'s, the walk\'s span selected whole (D5 K-8, K-71, §1.6)', () => onPlane(async () => {
  HOST.attach(/** @type {any} */ (hostEl));
  await focusOn(D, 1);
  LAYER.placeCaret(D, 3);
  const SHIFT = { shiftKey: true };
  /** Shift with an arrow, taken: the selection, the caret and the walk's span after it */
  const extend = async (/** @type {string} */ key) => { assert.equal(await KEYS.dispatch(keyOf(key, SHIFT), PLANE), true, `Shift+${key}: the page takes it`); return [SEL.selected(), caret(), WALK.current()?.pos]; };
  assert.deepEqual(await extend('ArrowDown'), [{ addr: D, pos: 3, width: 13 }, [D, 16, true], 14], 'Shift+↓: the caret the same offset into the line below (14 + 2), the selection from where it stood to it; the walk on the caret\'s span');
  assert.equal(HOST.currentState()?.id, 'selection', 'the selection\'s card shown at it');
  assert.deepEqual(await extend('ArrowRight'), [{ addr: D, pos: 3, width: 14 }, [D, 17, true], 14], 'Shift+→: a character on, from the same anchor');
  assert.deepEqual(await extend('ArrowUp'), [{ addr: D, pos: 3, width: 1 }, [D, 4, true], 1], 'Shift+↑: the caret a line up (1 + 3), one character from the anchor; the walk back on the first span');
  assert.deepEqual(await extend('ArrowLeft'), [null, [D, 3, true], 1], 'Shift+←: the caret back at the anchor, no selection standing');
  assert.equal(HOST.currentState()?.id ?? null, null, 'and no card of one');
  assert.deepEqual(await extend('ArrowLeft'), [{ addr: D, pos: 2, width: 1 }, [D, 2, true], 1], 'Shift+← again: the selection runs back from the anchor');
  assert.deepEqual(REC.edits(D), [], 'nothing typed');
  assert.equal(await KEYS.dispatch(keyOf('Escape'), PLANE), true);
  assert.deepEqual([SEL.selected(), caret()], [null, [D, 2, true]], 'Esc: the selection\'s card closed, the selection with it, the caret live');
  assert.equal(await KEYS.dispatch(keyOf('Escape'), PLANE), true);
  await tick();
  assert.deepEqual(caret(), [D, 2, false], 'Esc again: the caret kept');
  assert.equal(await KEYS.dispatch(keyOf('ArrowDown', SHIFT), PLANE), true);
  assert.deepEqual([SEL.selected(), caret()], [spanOfBlock(D, /** @type {any} */ (REC.blockAt(D, 1))), [D, 2, false]], 'Shift+↓ off a live caret: K-8\'s, the kept caret\'s span selected whole, the caret kept where it stood');
  assert.ok(['Shift+←', 'Shift+→', 'Shift+↑', 'Shift+↓'].every((c) => KEYS.TABLE.some((r) => r.id === 'K-71' && r.chord === c && r.surface === 'caret')), 'the table binds them at the caret, K-71\'s');
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
  assert.deepEqual([SEL.selected(), overlay(), HOST.currentState()?.anchor, holds(), caret(), said.slice(n).includes(reason)], [null, 'which', { span: first }, first, [D, 1, false], false],
    'Mod+Enter at the kept caret\'s span: its two links listed at the span whole, which the list holds, as on the plane; nothing selected');
  await KEYS.dispatch(keyOf('Escape'), PLANE);
  assert.deepEqual([overlay(), SEL.selected()], [null, null], 'one Esc closes the list: no selection stands behind it');

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

test('a slot chord made at a live caret with no selection standing selects nothing, so Mod+Enter after it at the caret — the chord\'s answer dismissed, or the acts card it drew standing — selects nothing, lists and follows nothing and gives the caret\'s follow line, the caret live where it stands; and Shift+→ after it runs the selection from the caret, never from the far end of the span the chord acted on (issue #471; D5 K-49, K-51, K-71, K-100; B3-S13)', () => onPlane(async ({ said }) => {
  twoLinks();
  const SHIFT_MOD = { ...MOD, shiftKey: true }, trail = TRAIL.all().length;
  await focusOn(D, 1);
  await KEYS.dispatch(keyOf('Enter'), PLANE);
  assert.deepEqual(caret(), [D, 1, true], 'the caret live at the first span\'s start, its two links drawn there');
  /** Mod+Enter at the caret: what stands after it, and what the status region said */
  const followed = async () => {
    const n = said.length;
    assert.equal(await KEYS.dispatch(MOD_ENTER, PLANE), true, 'taken: the platform runs nothing of its own');
    return [SEL.selected(), overlay(), caret(), TRAIL.all().length, HINT.standing()?.id, said.slice(n).length];
  };
  assert.equal(await KEYS.dispatch(keyOf('L', SHIFT_MOD), PLANE), true);
  assert.deepEqual([overlay(), SEL.selected()], ['links:' + D, null], 'Mod+Shift+L at the caret: the links card at the caret\'s document, nothing selected');
  await KEYS.dispatch(keyOf('Escape'), PLANE);
  assert.deepEqual(await followed(), [null, null, [D, 1, true], trail, 'B3.row.follow.inert', 1],
    'Mod+Enter once its card is dismissed: nothing selected, no "which" list, the caret live where it stood, the trail as it was, the caret\'s follow line said');
  assert.equal(await KEYS.dispatch(keyOf('k', MOD), PLANE), true);
  assert.deepEqual([overlay(), holds(), SEL.selected()], ['selection', spanOfBlock(D, /** @type {any} */ (REC.blockAt(D, 1))), null], 'Mod+K at the caret: the acts card at the caret\'s span, nothing selected');
  assert.deepEqual(await followed(), [null, 'selection', [D, 1, true], trail, 'B3.row.follow.inert', 1],
    'Mod+Enter with that card standing: nothing selected, the card standing, nothing followed, the caret\'s follow line said');
  HOST.dismiss();
  await KEYS.dispatch(keyOf('L', SHIFT_MOD), PLANE);
  await KEYS.dispatch(keyOf('Escape'), PLANE);
  assert.equal(await KEYS.dispatch(keyOf('ArrowRight', { shiftKey: true }), PLANE), true);
  assert.deepEqual([SEL.selected(), caret()], [{ addr: D, pos: 1, width: 1 }, [D, 2, true]], 'Shift+→ after Mod+Shift+L: the caret a character on, the selection from where it stood to it');
}));

test('Mod+Enter at a live caret with a selection drawn in another document, no link drawn there, counts that selection nothing: it follows nothing and gives the caret\'s follow line, the selection and its card standing and the caret live where it stands (issue #471; D5 K-51; B3-S13)', () => onPlane(async ({ said }) => {
  HOST.attach(/** @type {any} */ (hostEl));
  await focusOn(D, 1);
  await KEYS.dispatch(keyOf('Enter'), PLANE);
  SEL.select(O, 14, 4);
  assert.deepEqual([caret(), SEL.selected(), overlay()], [[D, 1, true], { addr: O, pos: 14, width: 4 }, 'selection'], 'the caret live in D, a selection drawn in O, its card standing');
  const n = said.length, trail = TRAIL.all().length;
  assert.equal(await KEYS.dispatch(MOD_ENTER, PLANE), true);
  assert.deepEqual([SEL.selected(), overlay(), caret(), TRAIL.all().length, said.slice(n), HINT.standing()?.id], [{ addr: O, pos: 14, width: 4 }, 'selection', [D, 1, true], trail, [t('B3.row.follow.inert')], 'B3.row.follow.inert'],
    'Mod+Enter: O\'s selection and its card standing, nothing followed, the caret live where it stood, the caret\'s follow line said');
}));

/** a key's chord at the caret: the key with its modifiers, dispatched on the plane, `n` times; whether the page took each */
const press = async (/** @type {string} */ key, /** @type {object} */ mods = {}, n = 1) => { for (let i = 0; i < n; i++) assert.equal(await KEYS.dispatch(keyOf(key, mods), PLANE), true, `${key}: the page takes it`); };
/** the page-local edits of D, each its position, its width and its text */
const editsOfD = () => REC.edits(D).map((e) => [e.pos, e.width, e.text]);

test('a printable key, Tab, Enter, Backspace and Delete at a live caret with a selection drawn in its text replace the selection — the key\'s text, none for Backspace and Delete, in its bytes\' place — the caret after it, the selection and its card ended; at the kept caret\'s span a printable key returns the caret, replaces the selection drawn in its text and stands the walk on the span the caret is in then; with a selection drawn in another document alone, the key types at the caret, that selection and its card standing (D5 K-70, K-71, K-72, K-76; D6 BM-70, BM-75)', () => onPlane(async () => {
  HOST.attach(/** @type {any} */ (hostEl));
  const SHIFT = { shiftKey: true };
  await focusOn(D, 1);
  LAYER.placeCaret(D, 3);
  await press('ArrowRight', SHIFT, 3);
  assert.deepEqual([SEL.selected(), caret(), overlay()], [{ addr: D, pos: 3, width: 3 }, [D, 6, true], 'selection'], 'Shift+→ three times: "rst" selected from the caret, its card shown');
  await press('q');
  assert.deepEqual([shown(), caret(), SEL.selected(), overlay(), editsOfD()], [TEXT.slice(0, 2) + 'q' + TEXT.slice(5), [D, 4, true], null, null, [[3, 3, 'q']]],
    'a printable key: the selection replaced by it, one edit, the caret after it, the selection and its card ended');
  await press('ArrowLeft', SHIFT, 2);
  assert.deepEqual(SEL.selected(), { addr: D, pos: 2, width: 2 }, 'Shift+← twice: "iq" selected');
  await press('Tab');
  assert.deepEqual([shown().slice(0, 4), caret(), SEL.selected()], ['F\t l', [D, 3, true], null], 'Tab: a tab character in its place');
  await press('ArrowRight', SHIFT, 2);
  await press('Enter');
  assert.deepEqual([shown().slice(0, 5), caret(), SEL.selected()], ['F\t\nin', [D, 4, true], null], 'Enter: a new line in the place of " l"');
  await press('ArrowRight', SHIFT, 2);
  await press('Backspace');
  assert.deepEqual([shown().slice(0, 5), caret(), SEL.selected()], ['F\t\ne.', [D, 4, true], null], 'Backspace: "in" taken out, nothing put in, the caret where it began');
  await press('ArrowLeft', SHIFT, 2);
  await press('Delete');
  assert.deepEqual([shown(), caret(), SEL.selected(), overlay()], ['F' + TEXT.slice(9), [D, 2, true], null, null], 'Delete: the tab and the new line taken out, not the character after the caret');
  assert.deepEqual(editsOfD(), [[3, 3, 'q'], [2, 2, '\t'], [3, 2, '\n'], [4, 2, ''], [2, 2, '']], 'each key one edit replacing the selection');
  assert.equal(REC.textOf(REC.doc(D).runs, 1, N + 1), TEXT, 'the model\'s own record stands as the board served it');

  // the caret kept on the first span, a selection drawn over "Second", and a printable key at the kept caret's span
  await press('Escape');
  await tick();
  assert.deepEqual([caret(), WALK.current()?.kind, WALK.current()?.pos], [[D, 2, false], 'block', 1], 'Esc: the caret kept, the walk on its span');
  SEL.select(D, 6, 6);
  assert.equal(overlay(), 'selection');
  await press('z');
  assert.deepEqual([shown(), caret(), SEL.selected(), overlay(), WALK.current()?.pos], ['Fe.\n\nz line here.\n', [D, 7, true], null, null, 14],
    'z at the kept caret\'s span: the caret returned, "Second" replaced, the selection and its card ended, the walk on the second span, where the caret stands now');

  // a selection drawn in another document alone
  SEL.select(O, 14, 4);
  await press('y');
  assert.deepEqual([shown(), caret(), SEL.selected(), overlay(), REC.edits(O)], ['Fe.\n\nzy line here.\n', [D, 8, true], { addr: O, pos: 14, width: 4 }, 'selection', []],
    'y with a selection in O alone: typed at the caret, O\'s selection and its card standing');
  HOST.dismiss();
}));

test('an arrow without Shift at a live caret with a selection drawn in its text ends the selection and its card — ← putting the caret at the selection\'s start, → at its end, ↓ a line from the caret — nothing typed; Mod+K at the caret then draws the acts card at the caret\'s span, nothing selected (D5 K-71, K-100; issue #471)', () => onPlane(async () => {
  HOST.attach(/** @type {any} */ (hostEl));
  const SHIFT = { shiftKey: true };
  await focusOn(D, 1);
  LAYER.placeCaret(D, 3);
  await press('ArrowRight', SHIFT, 2);
  assert.deepEqual([SEL.selected(), caret(), overlay()], [{ addr: D, pos: 3, width: 2 }, [D, 5, true], 'selection'], 'Shift+→ twice: two characters selected, the caret at their end');
  await press('ArrowLeft');
  assert.deepEqual([caret(), SEL.selected(), overlay()], [[D, 3, true], null, null], '←: the caret at the selection\'s start, the selection and its card ended');
  await press('ArrowLeft', SHIFT, 2);
  assert.deepEqual([SEL.selected(), caret()], [{ addr: D, pos: 1, width: 2 }, [D, 1, true]], 'Shift+← twice: two characters selected, the caret at their start');
  await press('ArrowRight');
  assert.deepEqual([caret(), SEL.selected(), overlay()], [[D, 3, true], null, null], '→: the caret at the selection\'s end, the selection and its card ended');
  await press('ArrowRight', SHIFT);
  assert.deepEqual(SEL.selected(), { addr: D, pos: 3, width: 1 });
  await press('ArrowDown');
  assert.deepEqual([caret(), SEL.selected(), overlay(), WALK.current()?.pos], [[D, 17, true], null, null, 14], '↓: a line from the caret (14 + 3), the selection ended, the walk on the caret\'s span');
  await press('k', MOD);
  assert.deepEqual([holds(), SEL.selected(), caret()], [spanOfBlock(D, /** @type {any} */ (REC.blockAt(D, 14))), null, [D, 17, true]], 'Mod+K: the acts card at the caret\'s span whole, nothing selected');
  HOST.dismiss();
  assert.deepEqual(REC.edits(D), [], 'nothing typed');
}));

test('a selection in the caret\'s text not whole in the text shown — running past its end — is not replaced: a printable key types at the caret, the selection ended, and the next key types after it (D5 K-72; M-DERIVE\'s `applyEdits`)', () => onPlane(async () => {
  HOST.attach(/** @type {any} */ (hostEl));
  await focusOn(D, 1);
  LAYER.placeCaret(D, 1);
  SEL.select(D, N - 2, 10);
  assert.deepEqual(SEL.selected(), { addr: D, pos: N - 2, width: 10 }, 'a selection running past the text\'s end');
  await press('q');
  await press('r');
  assert.deepEqual([shown(), caret(), SEL.selected(), overlay(), editsOfD()], ['qr' + TEXT, [D, 3, true], null, null, [[1, 0, 'q'], [2, 0, 'r']]],
    'both typed at the caret, the selection and its card ended');
}));

/** an act let land: every read it sets going answered and every flight it starts stepped to its last frame, no jump left in the air */
async function landed(/** @type {Promise<unknown> | null} */ act = null) {
  let done = !act;
  if (act) void act.then(() => { done = true; });
  for (let i = 0; i < 200 && !(done && !CAM.flying() && !GO.inAir()); i++) { await tick(); if (CAM.flying()) CAM.step(Infinity); }
  assert.ok(done && !CAM.flying() && !GO.inAir(), 'the act landed');
}

/** the walk's element: its kind, its place, its position */
const walkAt = () => { const f = WALK.current(); return f && [f.kind, f.addr, f.pos]; };

test('every teleport into the live caret\'s own draft — a LEAP, Back, Forward, a find\'s move — leaves the caret kept where it stood and the walk on its landing, so a printable key there is answered by the draft\'s own line, nothing typed, and Enter there places a caret of its own (D5 M-2, §4 rule 3; K-70, K-77)', () => onPlane(async ({ said }) => {
  const fake = FAKE.create({});
  PORT.boot(fake);
  HOST.attach(/** @type {any} */ (hostEl));
  TRAIL._reset();
  // D's metadata and links held beside its text, so a LEAP to it reads nothing
  REC.takeMetadata(D, { doc: D, published: false, owner: '1.0.1', birth: null, birthExtent: null, placed: null, baseExtent: null, source: null, asOf: 1 });
  REC.takeLinks(D, []);
  try {
    await landed(GO.leapTo(D, { pos: 1 }));
    assert.equal(await KEYS.dispatch(keyOf('Enter'), PLANE), true);
    assert.deepEqual([walkAt(), caret()], [['block', D, 1], [D, 1, true]], 'the LEAP lands on D\'s first span, where Enter places the caret');
    /** @type {Array<[string, () => (Promise<unknown> | null), number, number]>} each teleport, the span it lands on and the span the caret it leaves stands in */
    const jumps = [
      ['a LEAP to the second span', () => GO.leapTo(D, { pos: 14 }), 14, 1],
      ['Back', () => GO.back(), 1, 14],
      ['Forward', () => GO.forward(), 14, 1],
      ['a find\'s move to a match in the first span', () => { GO.toMatch(D, { pos: 1, width: 5 }); return null; }, 1, 14],
    ];
    for (const [what, jump, to, from] of jumps) {
      assert.deepEqual(caret(), [D, from, true], `before ${what}: the caret live at ${from}`);
      await landed(jump());
      assert.deepEqual([caret(), walkAt()], [[D, from, false], ['block', D, to]], `${what}: the caret kept where it stood, the walk on the span it landed on`);
      const n = said.length;
      assert.equal(await KEYS.dispatch(keyOf('q'), PLANE), true);
      await tick();
      assert.deepEqual([REC.edits(D), caret(), HINT.standing()?.id, said.at(-1), said.length > n], [[], [D, from, false], 'B3.caret.enter', t('B3.caret.enter'), true], `${what}: q is answered there by the draft's own line, said again, nothing typed`);
      assert.equal(await KEYS.dispatch(keyOf('Enter'), PLANE), true);
      assert.deepEqual(caret(), [D, to, true], `${what}: Enter places a caret at the span landed on`);
    }
    assert.deepEqual(fake.unanswered, []);
  } finally { PORT.boot(null); TRAIL._reset(); }
}));

test('a zoom past a live caret\'s reading scale leaves the caret kept, the walk re-taken on its draft whole, so the next printable key is swallowed with K-9\'s line, nothing typed; a key pressed below that scale before any re-take finds the caret its scale does not read and leaves it kept, typing nothing; and the re-take leaves such a caret kept where the walk stays where it stands (D5 M-2, K-11; FP-12)', () => onPlane(async ({ said }) => {
  const f = LAYER.foldOf(REC.doc(D)), reading = CAM.view();
  await focusOn(D, 1);
  assert.equal(await KEYS.dispatch(keyOf('Enter'), PLANE), true);
  assert.deepEqual(caret(), [D, 1, true]);
  for (let i = 0; i < 4 && LAYER.atReadingScale(D); i++) { assert.equal(await KEYS.dispatch(keyOf('-', MOD), PLANE), true); await tick(); }
  assert.equal(LAYER.atReadingScale(D), false, 'Mod+- past D\'s reading scale');
  assert.deepEqual([caret(), walkAt()], [[D, 1, false], ['document', D, null]], 'the caret kept where it stood; the walk re-taken on D whole');
  let n = said.length;
  assert.equal(await KEYS.dispatch(keyOf('q'), PLANE), true);
  assert.deepEqual([REC.edits(D), caret(), HINT.standing()?.id, said.length > n], [[], [D, 1, false], 'F.swallow', true], 'q: swallowed with K-9\'s line, nothing typed');

  // the caret returned live at reading scale, then the camera set below that scale with no re-take after it
  CAM.set(reading);
  await focusOn(D, 1);
  assert.equal(await KEYS.dispatch(keyOf('Enter'), PLANE), true);
  assert.deepEqual(caret(), [D, 1, true], 'Enter at its span returns the kept caret');
  CAM.set({ ...reading, scale: 7 / f.fs });
  n = said.length;
  assert.equal(await KEYS.dispatch(keyOf('q'), PLANE), true);
  assert.deepEqual([REC.edits(D), caret(), HINT.standing()?.id, said.length > n], [[], [D, 1, false], 'F.swallow', true], 'q below the scale before any re-take: the caret left kept, nothing typed');

  // a live caret in the draft the walk stands on whole: the re-take below its reading scale moves no walk and leaves the caret kept
  CAM.set(reading);
  await WALK.focusTo(D, null, true, true, null, true);
  LAYER.placeCaret(D, 14);
  assert.deepEqual([caret(), walkAt()], [[D, 14, true], ['document', D, null]]);
  CAM.set({ ...reading, scale: 7 / f.fs });
  await WALK.retakeFromView();
  assert.deepEqual([caret(), walkAt()], [[D, 14, false], ['document', D, null]], 'the re-take: the walk where it stood, the caret kept');
}));

test('Home and End at a live caret move it to the start and the end of its line — the end before the white space a wrap broke the line at, and before the typed line\'s newline — the walk staying on the caret\'s span and the camera still; with Shift each extends a selection from the caret, and without it each ends that selection, a line\'s start or end from where the caret stands (D5 K-71, M-13)', () => onPlane(async () => {
  HOST.attach(/** @type {any} */ (hostEl));
  await focusOn(D, 14);
  LAYER.placeCaret(D, 17);
  const view = CAM.view();
  /** a key at the caret, taken: the caret, the walk's position and whether the camera stood still after it */
  const at = async (/** @type {string} */ key, /** @type {object} */ mods = {}) => { assert.equal(await KEYS.dispatch(keyOf(key, mods), PLANE), true, `${key}: the page takes it`); return [caret(), WALK.current()?.pos, !CAM.flying() && CAM.view().x === view.x && CAM.view().y === view.y && CAM.view().scale === view.scale]; };
  assert.deepEqual(await at('End'), [[D, 31, true], 14, true], 'End: the caret before the line\'s newline (14 + 17), the walk on its span, the camera still');
  assert.deepEqual(await at('Home'), [[D, 14, true], 14, true], 'Home: the caret at the line\'s start');
  LAYER.placeCaret(D, 17);
  assert.deepEqual([await at('End', { shiftKey: true }), SEL.selected()], [[[D, 31, true], 14, true], { addr: D, pos: 17, width: 14 }], 'Shift+End: the selection from where the caret stood to the line\'s end');
  assert.deepEqual([await at('Home', { shiftKey: true }), SEL.selected()], [[[D, 14, true], 14, true], { addr: D, pos: 14, width: 3 }], 'Shift+Home: on from the same anchor to the line\'s start');
  assert.deepEqual([await at('End'), SEL.selected()], [[[D, 31, true], 14, true], null], 'End without Shift: the selection ended, the caret at the line\'s end from where it stood');
  assert.deepEqual(REC.edits(D), [], 'nothing typed');

  // a typed line the measure wraps: each line's start and end as the fold sets it, single spaces between its words
  const LONG = Array.from({ length: 40 }, (_, i) => 'word' + i).join(' ') + '\n', n = byteLength(LONG);
  REC.takeSpanSet(D, [{ subspace: 1, ordinal: 1, positions: n }]);
  REC.takeDelivery(D, [{ pos: 1, width: n, kind: 'content', text: LONG, ref: null, origin: null }]);
  REC.takeImage(D, 1, [{ iStart: D + '.0.1.1', width: n }]);
  const opens = LAYER.foldOf(REC.doc(D)).lines.filter((l) => l.pos === 1 && l.at != null).map((l) => /** @type {number} */ (l.at));
  assert.ok(opens.length >= 3 && opens[0] === 1, `the typed line wraps: its lines open at ${opens}`);
  const [, second, third] = opens;
  await focusOn(D, 1);
  LAYER.placeCaret(D, 3);
  assert.deepEqual((await at('End'))[0], [D, second - 1, true], 'End on the first line: before the space the wrap broke at, never on the next line');
  assert.ok(LONG[second - 2] === ' ' && LONG[second - 3] !== ' ', 'that position the space after the line\'s last word');
  LAYER.placeCaret(D, second + 2);
  assert.deepEqual((await at('Home'))[0], [D, second, true], 'Home on the second line: its first character');
  assert.deepEqual((await at('End'))[0], [D, third - 1, true], 'End on the second line: before the space the next wrap broke at');

  // a typed line the measure wraps after its hyphens, no white space at a break: the line's end is where the next line opens, and the caret there stands on the first
  const HYPHENED = Array.from({ length: 30 }, (_, i) => 'part' + i).join('-') + '\n', h = byteLength(HYPHENED);
  REC.takeSpanSet(D, [{ subspace: 1, ordinal: 1, positions: h }]);
  REC.takeDelivery(D, [{ pos: 1, width: h, kind: 'content', text: HYPHENED, ref: null, origin: null }]);
  REC.takeImage(D, 1, [{ iStart: D + '.0.1.1', width: h }]);
  const broken = LAYER.foldOf(REC.doc(D)).lines.filter((l) => l.pos === 1 && l.at != null).map((l) => /** @type {number} */ (l.at));
  assert.ok(broken.length >= 2 && HYPHENED[broken[1] - 2] === '-', `the typed line wraps after a hyphen: its lines open at ${broken}`);
  await focusOn(D, 1);
  LAYER.placeCaret(D, 3);
  assert.deepEqual((await at('End'))[0], [D, broken[1], true], 'End on the first line: after its last hyphen, where the next line opens');
  assert.deepEqual((await at('End'))[0], [D, broken[1], true], 'End again: the caret stands at that line\'s end');
  assert.deepEqual((await at('Home'))[0], [D, 1, true], 'Home there: the first line\'s start, never the next line\'s');
  for (const c of ['Home', 'End', 'Shift+Home', 'Shift+End']) assert.ok(KEYS.TABLE.some((r) => r.id === 'K-71' && r.chord === c && r.surface === 'caret'), `the table binds ${c} at the caret, K-71's`);
}));

test('Shift with ← or → at the span a kept caret stands in returns the caret and extends a selection from it a character, as at a live caret — from the caret, never from the span\'s edge where K-8\'s selection stands, the acts card shown and the walk following the caret into the next span — and a printable key then replaces that selection; where the caret cannot move that way the caret is returned live and K-8\'s selection stands with its card; at a span of the draft holding no caret Shift with ← or → is the platform\'s, and at another\'s text the page\'s, selecting from the walk\'s span in K-8\'s selection\'s place — the kept caret returned at neither (D5 K-70, K-71, K-77; B3-S1; D6 BM-70)', () => onPlane(async () => {
  HOST.attach(/** @type {any} */ (hostEl));
  const SHIFT = { shiftKey: true };
  /** the caret placed live at `pos` and kept by Esc, the walk on its span */
  const keptAt = async (/** @type {number} */ pos) => { LAYER.placeCaret(D, pos); await press('Escape'); await tick(); };
  const whole = spanOfBlock(D, /** @type {any} */ (REC.blockAt(D, 1)));
  await focusOn(D, 1);
  await keptAt(3);
  assert.deepEqual([caret(), walkAt()], [[D, 3, false], ['block', D, 1]], 'Esc: the caret kept two characters in, the walk on its span');
  assert.equal(await KEYS.dispatch(keyOf('ArrowRight', SHIFT), PLANE), true, 'Shift+→ at the kept span: the page takes it');
  assert.deepEqual([caret(), SEL.selected(), overlay(), walkAt()], [[D, 4, true], { addr: D, pos: 3, width: 1 }, 'selection', ['block', D, 1]],
    'Shift+→: the caret returned live a character on, the character from where it stood selected, its card shown');
  await press('Escape', {}, 2);
  await tick();
  assert.deepEqual([caret(), SEL.selected()], [[D, 4, false], null], 'Esc twice: the selection and its card closed, the caret kept a character on');
  await press('ArrowLeft', SHIFT);
  assert.deepEqual([caret(), SEL.selected()], [[D, 3, true], { addr: D, pos: 3, width: 1 }], 'Shift+←: the caret returned live a character back, the character between selected');
  await press('q');
  assert.deepEqual([caret(), SEL.selected(), overlay(), editsOfD()], [[D, 4, true], null, null, [[3, 1, 'q']]], 'q: the selection replaced by it, the caret after it');

  // K-8's selection over the kept caret's span whole: Shift+→ runs from the caret, never from the span's edge
  await press('Escape');
  await tick();
  await press('ArrowDown', SHIFT);
  assert.deepEqual([SEL.selected(), caret()], [whole, [D, 4, false]], 'Shift+↓ at the kept span: K-8\'s, the span selected whole, the caret kept');
  await press('ArrowRight', SHIFT);
  assert.deepEqual([caret(), SEL.selected()], [[D, 5, true], { addr: D, pos: 4, width: 1 }], 'Shift+→ then: the caret returned live, the selection from where it stood, not from the span\'s start or end');

  // the caret kept at the end of the first span's text: Shift+→ takes it into the next span, the walk with it
  await press('Escape', {}, 2);
  await keptAt(13);
  assert.deepEqual([caret(), walkAt()], [[D, 13, false], ['block', D, 1]]);
  await press('ArrowRight', SHIFT);
  assert.deepEqual([caret(), SEL.selected(), walkAt()], [[D, 14, true], { addr: D, pos: 13, width: 1 }, ['block', D, 14]], 'Shift+→: the caret in the second span, the walk following it there');

  // the caret kept at the text's first position, K-8's selection standing: Shift+← returns the caret and moves nothing
  await press('Escape', {}, 2);
  await keptAt(1);
  await press('ArrowDown', SHIFT);
  assert.deepEqual([SEL.selected(), overlay(), caret()], [whole, 'selection', [D, 1, false]]);
  await press('ArrowLeft', SHIFT);
  assert.deepEqual([caret(), SEL.selected(), overlay(), walkAt()], [[D, 1, true], whole, 'selection', ['block', D, 1]], 'Shift+← where the caret cannot move: the caret returned live, K-8\'s selection and its card standing');

  // a span of the draft holding no caret: the platform's; another's text: the page's
  await focusOn(D, 14);
  assert.deepEqual([await KEYS.dispatch(keyOf('ArrowRight', SHIFT), PLANE), await KEYS.dispatch(keyOf('ArrowLeft', SHIFT), PLANE), caret()], [false, false, [D, 1, false]],
    'at the draft\'s other span: the platform\'s, the kept caret not returned');
  await focusOn(O, 1);
  assert.equal(await KEYS.dispatch(keyOf('ArrowRight', SHIFT), PLANE), true, 'Shift+→ at another\'s text: the page takes it');
  assert.deepEqual([SEL.selected(), caret()], [{ addr: O, pos: 1, width: 1 }, [D, 1, false]], 'K-8\'s selection in the draft replaced by the first character of the walk\'s span, the kept caret not returned');
  assert.equal(await KEYS.dispatch(keyOf('ArrowLeft', SHIFT), PLANE), true, 'Shift+← there: the page takes it');
  assert.deepEqual([SEL.selected(), caret()], [null, [D, 1, false]], 'the character taken back, no selection standing, the kept caret not returned');
  assert.deepEqual(editsOfD(), [[3, 1, 'q']], 'nothing typed but q');
  assert.ok(['Shift+←', 'Shift+→'].every((c) => KEYS.TABLE.some((r) => r.id === 'K-77' && r.chord === c && r.surface === 'plane')), 'the table binds them at the kept span, K-77\'s');
  HOST.dismiss();
}));

test('Shift with ← or → at the walk\'s span in text the person may not edit selects from the focus\'s edge a character a press — with nothing selected, → from the span\'s start and ← from the end of its text, never its newline — then moves the selection\'s moving end, its anchor standing, none standing where the two meet, each selection\'s card shown and said, the walk where it stood; a character of two bytes is taken whole; after K-8\'s selection → moves its end; a selection the page made in another document is replaced at the walk\'s span, one the platform made extended where it stands; below the span\'s reading scale the keys are the platform\'s; a kept caret in the draft stays kept (D5 K-8, K-70, K-71)', () => onPlane(async ({ said }) => {
  HOST.attach(/** @type {any} */ (hostEl));
  const SHIFT = { shiftKey: true }, here = ['block', O, 1];
  await focusOn(D, 1);
  LAYER.placeCaret(D, 3);
  await press('Escape');
  await tick();
  await focusOn(O, 1);
  assert.deepEqual([caret(), SEL.selected(), walkAt(), LAYER.editable(O), LAYER.atReadingScale(O)], [[D, 3, false], null, here, false, true],
    'the caret kept in D, nothing selected, the walk on the first span of O, text the person may not edit, at its reading scale');
  /** Shift with an arrow at the walk's span, taken: the selection, the card standing and the walk's element after it */
  const shifted = async (/** @type {string} */ key) => { assert.equal(await KEYS.dispatch(keyOf(key, SHIFT), PLANE), true, `Shift+${key}: the page takes it`); return [SEL.selected(), overlay(), walkAt()]; };
  assert.deepEqual(await shifted('ArrowRight'), [{ addr: O, pos: 1, width: 1 }, 'selection', here], 'Shift+→: the first character of the span, its card shown, the walk where it stood');
  assert.equal(said.at(-1), `${O} · ${t('F.position', { p: 1 })}`, 'the selection said through the status region');
  assert.deepEqual(await shifted('ArrowRight'), [{ addr: O, pos: 1, width: 2 }, 'selection', here], 'Shift+→ again: its end a character on, its start standing');
  assert.deepEqual(await shifted('ArrowLeft'), [{ addr: O, pos: 1, width: 1 }, 'selection', here], 'Shift+←: its end back a character');
  assert.deepEqual(await shifted('ArrowLeft'), [null, null, here], 'Shift+← again: its end at its anchor, no selection standing and no card');
  assert.deepEqual(await shifted('ArrowLeft'), [{ addr: O, pos: 11, width: 1 }, 'selection', here], 'Shift+← with nothing selected: the last character of the span\'s text, never the newline after it');
  assert.deepEqual(await shifted('ArrowLeft'), [{ addr: O, pos: 10, width: 2 }, 'selection', here], 'Shift+← again: its start back a character, its end standing');
  assert.deepEqual(await shifted('ArrowRight'), [{ addr: O, pos: 11, width: 1 }, 'selection', here], 'Shift+→: its start on a character, the end ← moved being the one that moves');

  // a text ending in a character of two bytes
  SEL.clear();
  deliver(O, 'Café\n');
  await focusOn(O, 1);
  assert.deepEqual(await shifted('ArrowLeft'), [{ addr: O, pos: 4, width: 2 }, 'selection', here], 'Shift+← at a text ending in é: both its bytes, never one');

  // K-8's selection, then Shift+→
  SEL.clear();
  deliver(O, TEXT);
  await focusOn(O, 1);
  await press('ArrowDown', SHIFT);
  assert.deepEqual(SEL.selected(), spanOfBlock(O, /** @type {any} */ (REC.blockAt(O, 1))), 'Shift+↓: K-8\'s, the span whole');
  assert.deepEqual(await shifted('ArrowRight'), [{ addr: O, pos: 1, width: 14 }, 'selection', here], 'Shift+→ after it: its end a character on, the first of the next line, its start standing');

  // a selection in another document
  SEL.select(D, 3, 4);
  assert.deepEqual(await shifted('ArrowRight'), [{ addr: O, pos: 1, width: 1 }, 'selection', here], 'a selection the page made in D: replaced by the first character of the walk\'s span');
  SEL.select(D, 3, 4, 'focus');
  assert.deepEqual(await shifted('ArrowRight'), [{ addr: D, pos: 3, width: 5 }, 'selection', here], 'a selection the platform made in D: its end a character on, where it stands');
  assert.deepEqual(await shifted('ArrowLeft'), [{ addr: D, pos: 3, width: 4 }, 'selection', here], 'and back, its start standing');

  // below the span's reading scale
  SEL.clear();
  const reading = CAM.view(), f = LAYER.foldOf(REC.doc(O));
  CAM.set({ ...reading, scale: 7 / f.fs });
  assert.deepEqual([await KEYS.dispatch(keyOf('ArrowRight', SHIFT), PLANE), await KEYS.dispatch(keyOf('ArrowLeft', SHIFT), PLANE), SEL.selected()], [false, false, null], 'below O\'s reading scale: the platform\'s, nothing selected');
  CAM.set(reading);
  assert.deepEqual([caret(), REC.edits(D), REC.edits(O)], [[D, 3, false], [], []], 'the caret kept where it stood throughout, nothing typed');
  assert.ok(['Shift+←', 'Shift+→'].every((c) => KEYS.TABLE.some((r) => r.id === 'K-70' && r.chord === c && r.surface === 'plane')), 'the table binds them at the plane, K-70\'s');
  HOST.dismiss();
}));

// placed last: the follow it guards against, where it is made, leaves a jump in the air for the tests after it
test('Mod+Enter at a live caret placed in the draft\'s second line while the walk stands on a link\'s stop in its first, no selection standing, follows no link from the stop — the trail as it was, nothing faced — and leaves the caret where it stands, the caret\'s follow line in the one line and said through the status region (D5 K-51; B3-S13)', () => onPlane(async ({ said }) => {
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
