// O-HINT's test, on stand-ins of its element and of the status region: a
// refused press's hint shows its notice whole at its first press in the
// session and its first clause at every later one, a notice marked whole
// whole at every press, each press said and drawn again with its fade-in, an
// auto-repeat answering nothing, and a change of the page's class showing
// each notice whole again; its element is one button named by the words it
// shows and described by the notice whole, its act opening and folding it
// and ending nothing; the next act takes it down, handing a focus its button
// held to the walk's element; and it stands beside the element its press was
// made at — at its right, else its left, else below, below first where the
// element stands above the view, else inside it at its foot — under the
// overlay where they would meet, inside the view (issue #468's design
// decision).
import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import * as HINT from './hint.js';
import * as HOST from './host.js';
import * as FOCUS from '../nav/focus.js';
import * as CAM from '../plane/camera.js';
import { t } from '../strings.js';

/** @typedef {{tag: string, attrs: Record<string, string>, text: string, focus: () => void, blur: () => void, getAttribute: (k: string) => string | null}} Kid */

/** the platform's document, a stand-in: its body, and the element the focus stands on */
const body = /** @type {any} */ ({ tag: 'body' });
const doc = /** @type {{activeElement: any, body: any}} */ ({ activeElement: body, body });
globalThis.document = /** @type {any} */ (doc);

/** the hint's element, a stand-in: what O-HINT writes into it is what a person meets, its button focusable; each fade-in it runs, by its length */
function hintEl() {
  /** @type {Kid[]} */
  let kids = [];
  let html = '';
  const classes = new Set();
  /** @type {number[]} */
  const faded = [];
  return {
    style: /** @type {Record<string, string>} */ ({}), inert: false, faded,
    classList: { toggle: (/** @type {string} */ c, /** @type {boolean} */ on) => { if (on) classes.add(c); else classes.delete(c); }, contains: (/** @type {string} */ c) => classes.has(c) },
    addEventListener() {}, getAttribute: () => null, getBoundingClientRect: () => ({ left: 0, top: 0, width: 200, height: 22, right: 200, bottom: 22 }),
    contains: (/** @type {unknown} */ x) => kids.includes(/** @type {Kid} */ (x)),
    querySelectorAll: (/** @type {string} */ sel) => kids.filter((k) => sel.includes('button') && k.tag === 'button'),
    querySelector: (/** @type {string} */ sel) => (sel.startsWith('button') ? kids.find((k) => k.tag === 'button') || null : null),
    animate: (/** @type {unknown} */ _frames, /** @type {{duration: number}} */ o) => { faded.push(o.duration); },
    get innerHTML() { return html; },
    set innerHTML(/** @type {string} */ v) {
      html = v;
      const old = kids;
      kids = [...v.matchAll(/<([a-z]+)\b([^>]*)>([^<]*)/g)].map((m) => {
        const attrs = Object.fromEntries([...m[2].matchAll(/([\w-]+)="([^"]*)"/g)].map((a) => [a[1], a[2]]));
        /** @type {Kid} */
        const e = { tag: m[1], attrs, text: m[3], focus() { doc.activeElement = e; }, blur() { if (doc.activeElement === e) doc.activeElement = body; }, getAttribute: (k) => attrs[k] ?? null, get textContent() { return m[3]; } };
        return e;
      });
      if (old.includes(doc.activeElement)) doc.activeElement = body;
    },
    /** its button, as written */
    button: () => kids.find((k) => k.tag === 'button') || null,
  };
}

/** what the status region was told, an emptied region telling nothing */
const said = /** @type {string[]} */ ([]);
let words = '';
FOCUS.attach({ live: /** @type {any} */ ({ setAttribute() {}, set textContent(/** @type {string} */ v) { words = v; if (v) said.push(v); }, get textContent() { return words; } }) });

const el = hintEl();
let handed = 0;
HINT.attach(/** @type {any} */ (el), { handOff: () => { handed++; } });
CAM.setViewport(1440, 900);

/** an element a press was made at, a stand-in: its rect on screen */
const atRect = (/** @type {number} */ x, /** @type {number} */ y, /** @type {number} */ w, /** @type {number} */ h) =>
  /** @type {any} */ ({ isConnected: true, getBoundingClientRect: () => ({ left: x, top: y, width: w, height: h, right: x + w, bottom: y + h }) });

/** a frame: the status region's words written on the next frame let land */
const tick = () => new Promise((r) => setTimeout(r, 0));

const SWALLOW = { 'LEAP chord': '⌘L' };

beforeEach(() => { HINT._reset(); HINT.render(); FOCUS._reset(); doc.activeElement = body; said.length = 0; words = ''; el.faded.length = 0; });

test('a refused press\'s hint shows its notice whole at its first press in the session and its first clause at every later one, said at each; a notice marked whole stands whole at every press; a change of the page\'s class shows each notice whole again', async () => {
  HINT.show('F.swallow', SWALLOW);
  assert.deepEqual([HINT.standing(), said.at(-1)], [{ id: 'F.swallow', words: t('F.swallow', SWALLOW), whole: t('F.swallow', SWALLOW), open: true }, t('F.swallow', SWALLOW)], 'the first press: whole, said');
  HINT.act();
  HINT.show('F.swallow', SWALLOW);
  assert.deepEqual([HINT.standing()?.words, HINT.standing()?.open, said.at(-1)], ['typing goes nowhere here', false, 'typing goes nowhere here'], 'a later press: its first clause, said');
  const n = said.length;
  HINT.show('F.swallow', SWALLOW);
  await tick();
  assert.deepEqual(said.slice(n), ['typing goes nowhere here'], 'a press it answers standing: said again, though the region held those words');
  HINT.show('L.seam.link-to');
  HINT.show('L.seam.link-to');
  assert.deepEqual([HINT.standing()?.words, HINT.standing()?.open], [t('L.seam.link-to'), true], 'a notice marked whole: whole at every press');
  HINT.classChanged();
  assert.equal(HINT.standing(), null, 'a change of the page\'s class takes it down');
  HINT.show('F.swallow', SWALLOW);
  assert.deepEqual([HINT.standing()?.words, HINT.standing()?.open], [t('F.swallow', SWALLOW), true], 'and its next press shows the notice whole again');
});

test('a held key\'s auto-repeat is the press it repeats: answered by nothing — nothing said, nothing drawn again, the hint as it stood', async () => {
  HINT.show('F.swallow', SWALLOW);
  HINT.render();
  const n = said.length, faded = el.faded.length, before = HINT.standing();
  HINT.show('F.swallow', SWALLOW, { repeat: true });
  HINT.show('F.swallow.space', { 'paging key': 'PageDown' }, { repeat: true });
  await tick();
  HINT.render();
  assert.deepEqual([said.length, el.faded.length, HINT.standing()], [n, faded, before]);
});

test('its element is one button, named by the words it shows and described by the notice whole, its string on it, open or folded where the notice has a compact form; a press it answers draws it again with its fade-in; its act opens the notice whole and folds it again, said each time, keeping the focus and ending nothing', async () => {
  HINT.show('F.swallow', SWALLOW);
  HINT.act();
  HINT.show('F.swallow', SWALLOW);
  HINT.render();
  const whole = t('F.swallow', SWALLOW);
  assert.equal(el.innerHTML, `<button type="button" data-hint="F.swallow" data-string="F.swallow" aria-describedby="hint-whole" aria-expanded="false">typing goes nowhere here</button><span id="hint-whole" hidden>${whole}</span>`);
  assert.ok(el.classList.contains('on'), 'shown');
  assert.equal(el.faded.length, 1, 'drawn with its fade-in');
  HINT.show('F.swallow', SWALLOW);
  HINT.render();
  HINT.render();
  assert.equal(el.faded.length, 2, 'a press it answers draws it again with its fade-in, a frame with no press not');
  el.button()?.focus();
  const n = said.length;
  HINT.toggle();
  HINT.render();
  assert.deepEqual([el.button()?.getAttribute('aria-expanded'), el.button()?.text, said.slice(n), doc.activeElement === el.button(), HINT.standing()?.id], ['true', whole, [whole], true, 'F.swallow'],
    'its act: the notice whole, said, the focus kept on its button, the hint standing');
  HINT.toggle();
  HINT.render();
  await tick();
  assert.deepEqual([el.button()?.getAttribute('aria-expanded'), el.button()?.text, said.at(-1)], ['false', 'typing goes nowhere here', 'typing goes nowhere here'], 'its act again folds it');
  HINT.act();
  HINT.show('L.seam.link-to');
  HINT.render();
  assert.equal(el.button()?.getAttribute('aria-expanded'), null, 'a notice with no compact form neither opens nor folds');
});

test('the next act takes the hint down, its element emptied on the next frame; a focus its button held is handed to the walk\'s element', () => {
  HINT.show('D5.select-first');
  HINT.render();
  el.button()?.focus();
  HINT.act();
  assert.equal(HINT.standing(), null, 'gone from the state at once');
  HINT.render();
  assert.deepEqual([el.innerHTML, el.classList.contains('on'), handed], ['', false, 1], 'its element emptied, the focus handed on');
  HINT.show('D5.select-first');
  HINT.render();
  HINT.act();
  HINT.render();
  assert.equal(handed, 1, 'a hint gone that held no focus hands nothing on');
});

test('beside a box means at its right, its tops level, else at its left, else below it — below first where the box stands above the visible view, as the one line\'s acts do — else inside it at its foot', () => {
  const seen = { x: 0, y: 30, w: 1440, h: 870 }, size = { w: 200, h: 22 };
  assert.deepEqual(HINT.besideBox({ x: 100, y: 200, w: 80, h: 20 }, size, seen), { x: 188, y: 200 }, 'at its right, its tops level');
  assert.deepEqual(HINT.besideBox({ x: 1300, y: 200, w: 100, h: 20 }, size, seen), { x: 1092, y: 200 }, 'no room at its right: at its left');
  assert.deepEqual(HINT.besideBox({ x: 300, y: 4, w: 120, h: 18 }, size, seen), { x: 300, y: 30 }, 'a box above the view, as the one line\'s act stands: below it');
  assert.deepEqual(HINT.besideBox({ x: 1300, y: 880, w: 100, h: 20 }, size, seen), { x: 1092, y: 880 }, 'at its left, its tops level, the view holding its height after');
  assert.deepEqual(HINT.besideBox({ x: 20, y: 40, w: 1400, h: 850 }, size, seen), { x: 28, y: 860 }, 'a box the view holds no room beside, as a pane: inside it at its foot');
});

test('the hint stands beside the element its press was made at, below the overlay standing where it would meet it, inside the visible view (D5 §4 rule 5; FP-26)', () => {
  HINT.show('D5.select-first', null, { at: atRect(100, 200, 80, 20) });
  HINT.render();
  assert.deepEqual([el.style.left, el.style.top], ['188px', '200px'], 'at its right, its tops level');
  /** the overlay's element, a stand-in standing where the hint would */
  const overlay = { className: '', innerHTML: '', style: {}, setAttribute() {}, removeAttribute() {}, addEventListener() {}, querySelector: () => null, querySelectorAll: () => [], contains: () => false,
    getBoundingClientRect: () => ({ left: 150, top: 180, width: 300, height: 100, right: 450, bottom: 280 }) };
  HOST.attach(/** @type {any} */ (overlay));
  HOST.show({ kind: 'card', id: 'test', anchor: null, html: '<p>a card</p>' });
  try {
    HINT.render();
    assert.deepEqual([el.style.left, el.style.top], ['188px', '288px'], 'below the overlay, moving it nowhere');
  } finally { HOST.dismiss(); }
  HINT.act();
  HINT.show('D5.select-first', null, { at: atRect(1300, 880, 100, 20) });
  HINT.render();
  assert.deepEqual([el.style.left, el.style.top], ['1092px', '872px'], 'held inside the view: at the element\'s left, its foot inside the view\'s');
});
