// O-HINT's test, on stand-ins of its element and of the status region: a
// refused press's hint shows its notice whole at its first press in the
// session and its first clause at every later one, each a sentence, a notice
// marked whole whole at every press, each press said and drawn again with
// its fade-in, an
// auto-repeat answering nothing, and a change of the page's class showing
// each notice whole again; its element is one button named by the words it
// shows and described by the notice whole, its act opening and folding it
// and ending nothing; a line handed where the person was writing ends with
// it as a sentence of its own, whole and compact alike, its label's act
// taking the hint down and making the act handed in; its names, its
// description and what the status region says heard by S22's table, the
// draft's name kept as written; a line that ends on a
// sentence of its own shows
// and says it after both while its notice stands whole, and never beside the
// compact form, its tokens filled by the values the press hands with it; the
// next act takes it down, handing a focus its button
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
import { addressedHTML, hintSentences, sentence, sentences, heard } from '../strings.js';

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
  /** @type {Record<string, (e: unknown) => void>} its listeners, by event */
  const listeners = {};
  return {
    style: /** @type {Record<string, string>} */ ({}), inert: false, faded, listeners,
    classList: { toggle: (/** @type {string} */ c, /** @type {boolean} */ on) => { if (on) classes.add(c); else classes.delete(c); }, contains: (/** @type {string} */ c) => classes.has(c) },
    addEventListener: (/** @type {string} */ type, /** @type {(e: unknown) => void} */ fn) => { listeners[type] = fn; }, getAttribute: () => null, getBoundingClientRect: () => ({ left: 0, top: 0, width: 200, height: 22, right: 200, bottom: 22 }),
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
/** K-9's notice as the hint says it: whole, and its first clause, each a sentence */
const SWALLOWED = hintSentences('F.swallow', SWALLOW);
/** K-9's notice whole as a screen reader hears it: its dash a pause, its chord by its keys' words (S22) */
const HEARD = 'Typing goes nowhere here, to go somewhere, the address line: Command L.';

beforeEach(() => { HINT._reset(); HINT.render(); FOCUS._reset(); doc.activeElement = body; said.length = 0; words = ''; el.faded.length = 0; });

test('a refused press\'s hint shows its notice whole at its first press in the session and its first clause at every later one, each a sentence, said at each; a notice marked whole stands whole at every press; a change of the page\'s class shows each notice whole again (style S1)', async () => {
  HINT.show('F.swallow', SWALLOW);
  assert.deepEqual([HINT.standing(), said.at(-1)], [{ id: 'F.swallow', words: SWALLOWED.whole, whole: SWALLOWED.whole, open: true, writing: null }, HEARD], 'the first press: whole, a sentence, said as a screen reader hears it — its dash a pause, its chord by its keys\' words');
  assert.equal(SWALLOWED.whole, 'Typing goes nowhere here — to go somewhere, the address line: ⌘L.', 'drawn as the strings table words it, its glyphs among them');
  HINT.act();
  HINT.show('F.swallow', SWALLOW);
  assert.deepEqual([HINT.standing()?.words, HINT.standing()?.open, said.at(-1)], ['Typing goes nowhere here.', false, 'Typing goes nowhere here.'], 'a later press: its first clause, a sentence, said');
  const n = said.length;
  HINT.show('F.swallow', SWALLOW);
  await tick();
  assert.deepEqual(said.slice(n), ['Typing goes nowhere here.'], 'a press it answers standing: said again, though the region held those words');
  HINT.show('L.seam.link-to');
  HINT.show('L.seam.link-to');
  assert.deepEqual([HINT.standing()?.words, HINT.standing()?.open], [hintSentences('L.seam.link-to').whole, true], 'a notice marked whole: whole at every press');
  HINT.classChanged();
  assert.equal(HINT.standing(), null, 'a change of the page\'s class takes it down');
  HINT.show('F.swallow', SWALLOW);
  assert.deepEqual([HINT.standing()?.words, HINT.standing()?.open], [SWALLOWED.whole, true], 'and its next press shows the notice whole again');
});

test('a held key\'s auto-repeat is the press it repeats: answered by nothing — nothing said, nothing drawn again, the hint as it stood', async () => {
  HINT.show('F.swallow', SWALLOW);
  HINT.render();
  const n = said.length, faded = el.faded.length, before = HINT.standing();
  HINT.show('F.swallow', SWALLOW, { repeat: true });
  HINT.show('F.swallow.space', { 'space key': 'Space', 'paging key': 'Page Down' }, { repeat: true });
  await tick();
  HINT.render();
  assert.deepEqual([said.length, el.faded.length, HINT.standing()], [n, faded, before]);
});

test('its element is one button, named by the words it shows and described by the notice whole, its string on it, open or folded where the notice has a compact form; a press it answers draws it again with its fade-in; its act opens the notice whole and folds it again, said each time, keeping the focus and ending nothing', async () => {
  HINT.show('F.swallow', SWALLOW);
  HINT.act();
  HINT.show('F.swallow', SWALLOW);
  HINT.render();
  const whole = SWALLOWED.whole;
  assert.equal(el.innerHTML, `<button type="button" data-hint="F.swallow" data-string="F.swallow" aria-label="Typing goes nowhere here." aria-describedby="hint-whole" aria-expanded="false">Typing goes nowhere here.</button><span id="hint-whole" hidden>${HEARD}</span>`,
    'named by the words it shows and described by the notice whole, each as a screen reader hears it');
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
  assert.deepEqual([el.button()?.getAttribute('aria-expanded'), el.button()?.text, el.button()?.getAttribute('aria-label'), said.slice(n), doc.activeElement === el.button(), HINT.standing()?.id], ['true', whole, HEARD, [HEARD], true, 'F.swallow'],
    'its act: the notice whole, drawn as written, named and said as heard, the focus kept on its button, the hint standing');
  HINT.toggle();
  HINT.render();
  await tick();
  assert.deepEqual([el.button()?.getAttribute('aria-expanded'), el.button()?.text, said.at(-1)], ['false', 'Typing goes nowhere here.', 'Typing goes nowhere here.'], 'its act again folds it');
  HINT.act();
  HINT.show('L.seam.link-to');
  HINT.render();
  assert.equal(el.button()?.getAttribute('aria-expanded'), null, 'a notice with no compact form neither opens nor folds');
});

test('a line that ends with where the person was writing shows that ending after the notice as a sentence of its own, whole and compact alike — on one line, its label a button of its own — and says the two together; a click on the label, a key\'s or the pointer\'s, takes the hint down and makes the act handed in as it was made (issue #496\'s design decision)', () => {
  /** @type {boolean[]} each act the label made, whether a key made it */
  const acts = [];
  const writing = { label: 'Notes 1.0.1.0.2', act: (/** @type {boolean} */ byKey) => { acts.push(byKey); } };
  const end = sentence('B3.undo.last-writing', { label: writing.label }), whole = SWALLOWED.whole;
  assert.equal(end, 'You were last writing in Notes 1.0.1.0.2.', 'the ending a sentence: no dash joins it');
  HINT.show('F.swallow', SWALLOW, { writing });
  HINT.render();
  assert.deepEqual([HINT.standing(), said.at(-1)], [{ id: 'F.swallow', words: whole, whole, open: true, writing: end }, sentences(HEARD, end)], 'whole: the notice, then the ending, said together');
  assert.equal(el.innerHTML, `<button type="button" data-hint="F.swallow" data-string="F.swallow" aria-label="${HEARD}" aria-describedby="hint-whole" aria-expanded="true">${addressedHTML(whole)}</button> `
    + `<span class="writing" data-string="B3.undo.last-writing">You were last writing in <button type="button" data-writing="1" aria-label="${writing.label}">${addressedHTML(writing.label)}</button>.</span><span id="hint-whole" hidden>${HEARD}</span>`);
  assert.ok(el.classList.contains('writing'), 'the notice and its ending drawn as one line');
  HINT.act();
  HINT.show('F.swallow', SWALLOW, { writing });
  assert.deepEqual([HINT.standing()?.words, HINT.standing()?.writing, said.at(-1)], ['Typing goes nowhere here.', end, `Typing goes nowhere here. ${end}`], 'compact: its first clause, then the same ending');
  /** a click on the label, as the platform delivers it: a key's carries no click count */
  const click = (/** @type {number} */ detail) => el.listeners.click({ type: 'click', detail, target: { closest: (/** @type {string} */ sel) => (sel === 'button[data-writing]' ? {} : null) } });
  click(0);
  assert.deepEqual([HINT.standing(), acts], [null, [true]], 'Enter on the label: the hint taken down, the act made as a key\'s');
  HINT.render();
  assert.deepEqual([el.innerHTML, el.classList.contains('writing')], ['', false], 'gone with it');
  HINT.show('F.swallow', SWALLOW, { writing });
  click(1);
  assert.deepEqual([HINT.standing(), acts], [null, [true, false]], 'a pointer\'s click: the act made as the pointer\'s');
  click(1);
  assert.deepEqual(acts, [true, false], 'with no hint standing the label makes nothing');
  HINT.show('F.swallow', SWALLOW);
  HINT.render();
  assert.deepEqual([HINT.standing()?.writing, el.classList.contains('writing'), el.innerHTML.includes('data-writing')], [null, false, false], 'a line handed no ending ends with its notice');
});

test('where the person was writing is spoken by the draft\'s name as written: the label\'s button named, and the status region told, the name\'s own dash and its quotation marks kept as the reading face holds them, while the line around it is heard by S22\'s table (style S22; issue #626)', () => {
  /** a draft whose first line holds a dash of its own, named as the status region names a box: its words quoted, then its address */
  const named = /** @type {import('../strings.js').Run[]} */ ([{ text: '"', face: 'client' }, { text: 'Field notes — draft', face: 'reading' }, { text: '" ', face: 'client' }, { text: '1.0.1.0.2', face: 'ident' }]);
  const writing = { label: '"Field notes — draft" 1.0.1.0.2', named, act: () => {} };
  HINT.show('F.swallow', SWALLOW, { writing });
  HINT.render();
  const name = (/aria-label="([^"]*)">[^<]*<span class="id">1\.0\.1\.0\.2<\/span><\/button>/.exec(el.innerHTML) || [])[1];
  assert.equal(name, 'Field notes — draft 1.0.1.0.2', 'the label\'s button named by the draft\'s name, its dash kept, the quotation marks around it silent');
  assert.equal(said.at(-1), `${HEARD} You were last writing in Field notes — draft 1.0.1.0.2.`, 'said with the notice heard and the name kept as written');
  assert.ok(el.innerHTML.includes(`<button type="button" data-writing="1" aria-label="${name}">${addressedHTML(writing.label)}</button>`), `drawn as written: ${el.innerHTML}`);
});

test('a line that ends on a sentence of its own — the undo chord\'s constant sentence — shows it after the notice and after where the person was writing, and says the three together, while the notice stands whole; beside the compact form it is neither shown nor said, and the notice\'s act brings it back with the whole (B3-S3; D6 BM-42)', () => {
  const writing = { label: 'Notes 1.0.1.0.2', act: () => {} };
  const end = sentence('B3.undo.last-writing', { label: writing.label }), last = sentence('B3.undo.constant'), { whole, clause } = hintSentences('B3.undo.none');
  assert.equal(clause, 'Undo works in the text of a draft you are writing.');
  HINT.show('B3.undo.none', null, { writing, ending: { id: 'B3.undo.constant' } });
  HINT.render();
  const heardWhole = 'Undo works in the text of a draft you are writing, there is nothing here to undo.';
  assert.equal(heard(whole), heardWhole, 'its dash a pause as a screen reader hears it');
  assert.deepEqual([HINT.standing(), said.at(-1)], [{ id: 'B3.undo.none', words: whole, whole, open: true, writing: end, ending: last }, `${heardWhole} ${end} ${last}`], 'whole at its first press: the notice, where the person was writing, then the sentence the line ends on');
  assert.equal(el.innerHTML, `<button type="button" data-hint="B3.undo.none" data-string="B3.undo.none" aria-label="${heardWhole}" aria-describedby="hint-whole" aria-expanded="true">${addressedHTML(whole)}</button> `
    + `<span class="writing" data-string="B3.undo.last-writing">You were last writing in <button type="button" data-writing="1" aria-label="${writing.label}">${addressedHTML(writing.label)}</button>.</span>`
    + ` <span class="ending" data-string="B3.undo.constant">${last}</span><span id="hint-whole" hidden>${heardWhole} ${last}</span>`);
  HINT.act();
  HINT.show('B3.undo.none', null, { writing, ending: { id: 'B3.undo.constant' } });
  HINT.render();
  assert.deepEqual([HINT.standing(), said.at(-1), el.innerHTML.includes('class="ending"')], [{ id: 'B3.undo.none', words: clause, whole, open: false, writing: end }, `${clause} ${end}`, false], 'a later press: its first clause and where the person was writing — the sentence neither shown nor said');
  HINT.toggle();
  HINT.render();
  assert.deepEqual([HINT.standing()?.ending, said.at(-1), el.innerHTML.includes('class="ending"')], [last, `${heardWhole} ${end} ${last}`, true], 'the notice\'s act opens it whole, the sentence with it');
  HINT.act();
  HINT.show('C-45', { D: '1.0.1.0.3' }, { ending: { id: 'B3.undo.constant' } });
  HINT.show('C-45', { D: '1.0.1.0.3' }, { ending: { id: 'B3.undo.constant' } });
  assert.deepEqual([HINT.standing()?.open, HINT.standing()?.ending], [true, last], 'a notice with no compact form stands whole at every press, the sentence after it each time');
});

test('a line\'s ending carries the values its tokens are filled with — the copy line\'s act its key as the press drew it — shown and said filled, never a token (style S21)', () => {
  const ending = { id: 'L.copy.nothing.enter', values: { 'act key': 'Return' } }, whole = hintSentences('L.copy.nothing').whole;
  HINT.show('L.copy.nothing', null, { ending });
  HINT.render();
  assert.deepEqual([HINT.standing()?.ending, said.at(-1)], ['Return selects this passage.', `${heard(whole)} Return selects this passage.`], 'the act\'s key filled, a sentence, said after the notice');
  assert.ok(el.innerHTML.includes('<span class="ending" data-string="L.copy.nothing.enter">Return selects this passage.</span>') && !el.innerHTML.includes('⟨'), `drawn filled: ${el.innerHTML}`);
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
