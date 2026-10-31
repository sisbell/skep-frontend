// O-HOST's test, on a stand-in of the host's element: the opening still
// reading — pending while its reads are out, its answer shown only where no
// act was made on the chrome meanwhile, ended by a dismissal, the next
// opening, an overlay shown whatever conjures it, the LEAP box opened or
// Esc's one order, its reads told it no longer stands, and pending no more
// where it gives up or throws; a walk's moment raised while one reads opening
// folded (FP-36); an overlay's end running while its element still holds
// what it wrote; an overlay's own completion, and its owner drawing it again
// in its place, no act on the chrome; no module of the page loading another
// by `import()` (S-22 (a)); the anchor — beneath its element while that
// stands, at the span beside it once the text layer takes the element away,
// an element redrawn from state found again by its id; a face said through
// the status region save a told one, and a face that
// answers an act named by the act's caption and described by its words; a
// jump's face hidden exactly while its document is out of the visible view,
// the one line carrying its words (FP-25); a face shown while the standing
// overlay's field holds the caret taking nothing's place (FP-20); and a
// change of the page's class dismissing the card standing and ending the
// opening, a jump's reading face and a moment's standing through it (FP-29).
import { test, before } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { sep } from 'node:path';
import * as HOST from './host.js';
import * as FACES from './faces.js';
import * as TRAILLIST from './trail-list.js';
import * as KEYS from '../nav/keys.js';
import * as LEAP from '../nav/leap.js';
import * as FOCUS from '../nav/focus.js';
import * as CAM from '../plane/camera.js';
import { docBox } from '../plane/projection.js';
import { t } from '../strings.js';

/** the host's stand-in element: what the host writes into it is what a person meets */
const hostEl = { className: '', innerHTML: '', style: {}, setAttribute() {}, removeAttribute() {}, addEventListener() {}, querySelector: () => null, querySelectorAll: () => [], getBoundingClientRect: () => ({ left: 0, top: 0, width: 0, height: 0 }), contains: () => false };

before(() => {
  globalThis.document = /** @type {any} */ ({ activeElement: null, body: null, getElementById: () => null });
  HOST.attach(/** @type {any} */ (hostEl));
});

/** a read the test answers when it chooses: a slow board's */
function slow() {
  /** @type {(v: string) => void} */
  let answer = () => {};
  /** @type {Promise<string>} */
  const read = new Promise((r) => { answer = r; });
  return { read, answer };
}

/** a card's show: the card, by its id, its answer its caption */
const card = (/** @type {string} */ id) => (/** @type {string} */ answer) => HOST.show({ kind: 'card', id, anchor: null, html: `<span class="label">${answer}</span>`, acts: {} });

/** the overlay standing: its id, or null where none stands */
const standing = () => HOST.currentState()?.id ?? null;

test('a face is said through the one status region, save one whose words the landing that met it says where the focus lands (`told`: issue #153), heard there once', () => {
  let said = 0;
  FOCUS.attach({ live: /** @type {any} */ ({ setAttribute() { said++; }, textContent: '' }) });
  FACES.floating('1.0.1.0.127', null, null);
  assert.deepEqual([standing(), said], ['face:floating', 1], 'a face shown: said');
  FACES.floating('1.0.1.0.127', null, null, true);
  assert.deepEqual([standing(), said], ['face:floating', 1], 'told by the landing\'s description: the status region not written again');
  HOST.dismiss();
});

test('a face that answers an act is named by the act\'s caption and described by its words, each part in its order, and said through the status region caption first; a face with no caption is named by its words and described by nothing (issue #179\'s design decision: "Announce each face as the act\'s answer, tied to the act in markup")', () => {
  /** @type {Record<string, string>} the dialog's attributes as the host set them */
  const attrs = {};
  /** @type {Array<{classes: string[], textContent: string, id: string}>} the parts of the markup the host wrote, each by its classes and its text, its id the host's to set */
  let parts = [];
  const el = {
    className: '', style: {}, addEventListener() {}, getBoundingClientRect: () => ({ left: 0, top: 0, width: 0, height: 0 }), contains: () => false,
    setAttribute: (/** @type {string} */ k, /** @type {string} */ v) => { attrs[k] = v; }, removeAttribute: (/** @type {string} */ k) => { delete attrs[k]; },
    get innerHTML() { return ''; },
    set innerHTML(/** @type {string} */ v) { parts = [...v.matchAll(/<(div|span|button) class="([^"]*)"[^>]*>(.*?)<\/\1>/g)].map((m) => ({ classes: m[2].split(/\s+/), textContent: m[3].replace(/<[^>]*>/g, ''), id: '' })); },
    querySelector: (/** @type {string} */ sel) => parts.find((p) => p.classes.includes(sel.replace(/^\./, ''))) || null,
    querySelectorAll: (/** @type {string} */ sel) => { const cs = sel.split(',').map((x) => x.trim().replace(/^\./, '')); return parts.filter((p) => p.classes.some((c) => cs.includes(c))); },
  };
  /** @type {string[]} what the status region was given to say */
  const said = [];
  FOCUS.attach({ live: /** @type {any} */ ({ setAttribute() {}, set textContent(/** @type {string} */ v) { said.push(v); } }) });
  HOST.attach(/** @type {any} */ (el));
  try {
    const caption = `${t('B1.who-wrote')} · 1.0.1.0.3 · ${t('F.position', { p: 11 })}`, words = t('B1.too_much_coverage');
    FACES.showRefusal(null, /** @type {any} */ ({ kind: 'refused', name: 'too_much_coverage', code: 'too_much_coverage', detail: null, op: 'show_origin', body: null }), '1.0.1.0.3', { caption });
    const label = parts.find((p) => p.classes.includes('label')), text = parts.find((p) => p.classes.includes('face-text'));
    assert.deepEqual([attrs['aria-labelledby'], label?.id, attrs['aria-describedby'], text?.id], ['overlay-name', 'overlay-name', 'overlay-said-0', 'overlay-said-0'], 'named by the act\'s caption, described by its words');
    assert.equal(said[said.length - 1], `${caption} ${words}`, 'said as the act\'s answer: its caption, then its words');
    FACES.invalidFollow(null);
    assert.deepEqual([attrs['aria-labelledby'], parts.find((p) => p.classes.includes('face-text'))?.id, attrs['aria-describedby'], said[said.length - 1]], ['overlay-name', 'overlay-name', undefined, t('B1.invalid')], 'no caption: named by its words, described by nothing, said as its words');
    HOST.dismiss();
    assert.deepEqual([attrs['aria-labelledby'], attrs['aria-describedby']], [undefined, undefined], 'taken down: neither stands');
  } finally {
    HOST.dismiss();
    HOST.attach(/** @type {any} */ (hostEl));
  }
});

test('an opening nothing interrupts is pending while it reads, nothing shown, and shows its answer once they answer', async () => {
  const r = slow();
  const o = HOST.opening(() => r.read, card('provenance:wrote'));
  assert.deepEqual([HOST.pending(), standing()], [true, null], 'pending, nothing shown');
  r.answer('its origin');
  await o;
  assert.deepEqual([HOST.pending(), standing()], [false, 'provenance:wrote']);
  HOST.dismiss();
});

test('a dismissal made while it reads, nothing standing, ends it: its answer shows nothing, and its reads are told it no longer stands', async () => {
  const r = slow();
  /** @type {boolean[]} */
  const told = [];
  const o = HOST.opening(async (stands) => { const v = await r.read; told.push(stands()); return v; }, card('provenance:wrote'));
  HOST.dismiss();
  assert.equal(HOST.pending(), false, 'the dismissal ended it');
  r.answer('its origin');
  await o;
  assert.equal(standing(), null, 'its answer shows nothing');
  assert.deepEqual(told, [false], 'a read after it ended is told so, and asks no more');
});

test('the next opening ends one still reading: the card asked last shows, whichever of the two answers first', async () => {
  for (const firstAnswersFirst of [true, false]) {
    const a = slow(), b = slow();
    const first = HOST.opening(() => a.read, card('provenance:wrote'));
    const last = HOST.opening(() => b.read, card('provenance:uses'));
    if (firstAnswersFirst) { a.answer('its origin'); await first; b.answer('its users'); await last; }
    else { b.answer('its users'); await last; a.answer('its origin'); await first; }
    assert.deepEqual([standing(), HOST.pending()], ['provenance:uses', false], firstAnswersFirst ? 'the first asked answering first' : 'the first asked answering last');
    HOST.dismiss();
  }
});

test('an opening that gives up shows nothing and is pending no more; nor is one whose reads throw', async () => {
  await HOST.opening(async () => null, card('provenance:wrote'));
  assert.deepEqual([standing(), HOST.pending()], [null, false], 'given up');
  await assert.rejects(HOST.opening(async () => { throw new Error('the port failed'); }, card('provenance:wrote')));
  assert.deepEqual([standing(), HOST.pending()], [null, false], 'thrown: no opening is left pending to swallow the next Esc');
});

test('an overlay shown while an opening reads ends it, whatever conjures it: its answer never covers what was shown, and one Esc closes what was shown, before the answer or after it', async () => {
  /** the links card at a document, the others' switch in a state: shown again by the switch's own act, it is rebuilt */
  const links = (/** @type {boolean} */ on) => HOST.show({ kind: 'card', id: 'links:1.0.1.0.3', anchor: null, html: `<span class="label">links</span><button data-run="others" role="switch" aria-checked="${on}">others' links</button>`, acts: {} });
  /** @type {import('../bridge/shapes').MomentEvent} a walk's moment, as the shell raises it: a question owed an answer */
  const moment = { id: 'm-1', kind: 'ask', data: { text: 'which devices are lost?' }, walk: 'w-1', board: null, answerable: true };
  /** the walk's moment folded, nothing standing: raised over nothing, then dismissed */
  const folded = () => { if (!FACES.folded().length) { FACES.moment(moment); HOST.dismiss(); } };
  /** @type {Array<{what: string, id: string, before?: () => void, show: () => void}>} each overlay shown while the opening reads, the id it stands as, and what stood before the opening began */
  const rows = [
    { what: 'the trail list', id: 'trail-list', show: () => TRAILLIST.open() },
    { what: 'a walk\'s moment unfolded by its segment\'s act', id: 'moment:m-1', before: folded, show: () => FACES.unfold(FACES.folded()[0].key) },
    { what: 'a follow\'s face', id: 'face:invalid', show: () => FACES.invalidFollow(null) },
    { what: 'a rebuild of the standing overlay by its own act', id: 'links:1.0.1.0.3', before: () => links(false), show: () => links(true) },
  ];
  for (const { what, id, before, show } of rows) {
    for (const escFirst of [false, true]) {
      if (before) before();
      const r = slow();
      const o = HOST.opening(() => r.read, card('provenance:wrote'));
      show();
      assert.deepEqual([HOST.pending(), standing()], [false, id], `${what}: the opening ended as it was shown`);
      if (escFirst) {
        KEYS.esc();
        assert.equal(standing(), null, `${what}: Esc made while the read is out closes what was shown, never the opening hidden behind it`);
      }
      r.answer('its origin');
      await o;
      assert.equal(standing(), escFirst ? null : id, `${what}: the opening's answer shows nothing`);
      if (!escFirst) {
        KEYS.esc();
        assert.equal(standing(), null, `${what}: one Esc closes what was shown`);
      }
    }
  }
});

test('a walk\'s moment the shell raises while an opening reads takes nothing\'s place (issue #182; FP-36): it opens folded, its segment said, and the card asked shows its answer', async () => {
  /** @type {string[]} what the status region was given to say */
  const said = [];
  FOCUS.attach({ live: /** @type {any} */ ({ setAttribute() {}, set textContent(/** @type {string} */ v) { said.push(v); } }) });
  const r = slow();
  const o = HOST.opening(() => r.read, card('provenance:wrote'));
  FACES.moment({ id: 'm-182', kind: 'yes_no', data: { text: 'was the device stolen?' }, walk: 'w-182', board: null, answerable: true });
  assert.deepEqual([HOST.pending(), standing(), FACES.folded().find((f) => f.key.startsWith('w-182|'))?.words], [true, null, t('L.walk.waits', { walk: 'w-182', step: 'was the device stolen?' })], 'the opening still reading, nothing shown, the walk\'s segment standing');
  assert.equal(said[said.length - 1], t('L.walk.waits', { walk: 'w-182', step: 'was the device stolen?' }), 'the segment said through the status region');
  r.answer('its origin');
  await o;
  assert.equal(standing(), 'provenance:wrote', 'the card asked shows its answer');
  HOST.dismiss();
});

test('an overlay\'s end runs while its element still holds what it wrote, dismissed or replaced — a walk\'s moment folds with the text typed in its field (issue #182)', () => {
  /** @type {Array<[boolean, string]>} each end as it ran: replaced or dismissed, and what the element held then */
  const ends = [];
  const end = (/** @type {boolean} */ replaced) => { ends.push([replaced, hostEl.innerHTML]); };
  HOST.show({ kind: 'card', id: 'card:a', anchor: null, html: '<span class="label">a</span>', acts: {}, onDismiss: end });
  HOST.show({ kind: 'card', id: 'card:b', anchor: null, html: '<span class="label">b</span>', acts: {}, onDismiss: end });
  HOST.dismiss();
  assert.deepEqual(ends.map(([replaced, html]) => [replaced, html.startsWith('<span class="label">')]), [[true, true], [false, true]], 'each end met its own markup standing');
  assert.ok(ends[0][1].includes('>a<') && ends[1][1].includes('>b<'), JSON.stringify(ends));
  assert.equal(hostEl.innerHTML, '', 'then the element emptied');
});

test('Esc\'s one order: a card still reading is the innermost thing — Esc ends it alone, the card standing under it stands; the next Esc dismisses that card', async () => {
  HOST.show({ kind: 'card', id: 'selection', anchor: null, html: '<span class="label">1.0.1.0.3 · position 11</span>', acts: {} });
  const r = slow();
  const o = HOST.opening(() => r.read, card('provenance:wrote'));
  KEYS.esc();
  assert.deepEqual([HOST.pending(), standing()], [false, 'selection'], 'the opening ended, the selection\'s card standing');
  r.answer('its origin');
  await o;
  assert.equal(standing(), 'selection', 'its answer shows nothing');
  KEYS.esc();
  assert.equal(standing(), null, 'the next Esc dismisses the card that stood');
});

/** the LEAP box's stand-ins: its box, input, rows and status region, and whether the box is shown */
function leapBox() {
  const classes = new Set();
  const part = () => ({ innerHTML: '', value: '', setAttribute() {}, removeAttribute() {}, addEventListener() {}, focus() {}, select() {}, contains: () => false });
  const box = { ...part(), classList: { add: (/** @type {string} */ c) => { classes.add(c); }, remove: (/** @type {string} */ c) => { classes.delete(c); } } };
  return { box, input: part(), rows: part(), note: part(), shown: () => classes.has('on') };
}

test('the LEAP box opened while an opening reads ends it, the card standing under it staying: its answer shows nothing over the box; Esc closes the box, then the card', async () => {
  const b = leapBox();
  LEAP.attach(/** @type {any} */ (b), () => null);
  HOST.show({ kind: 'card', id: 'selection', anchor: null, html: '<span class="label">1.0.1.0.3 · position 11</span>', acts: {} });
  const r = slow();
  const o = HOST.opening(() => r.read, card('provenance:wrote'));
  LEAP.open();
  assert.deepEqual([HOST.pending(), standing(), LEAP.isOpen()], [false, 'selection', true], 'the box open, the opening ended, the selection\'s card standing');
  r.answer('its origin');
  await o;
  assert.deepEqual([standing(), LEAP.isOpen(), b.shown()], ['selection', true, true], 'its answer shows nothing: the box stands, the card under it');
  KEYS.esc();
  assert.deepEqual([LEAP.isOpen(), standing()], [false, 'selection'], 'Esc closes the box, the innermost thing');
  KEYS.esc();
  assert.equal(standing(), null, 'the next Esc dismisses the card');
});

/** the parts of a face's markup the host reads its words from — its words, its arm, its clause, its note — each as an element bearing its text */
const faceParts = (/** @type {string} */ html, /** @type {string} */ sel) => {
  const classes = sel.split(',').map((s) => s.trim().replace(/^\./, ''));
  return [...html.matchAll(/<div class="([\w-]+)"(?: data-string="([^"]*)")?>((?:[^<]|<\/?span[^>]*>)*)<\/div>/g)].filter((m) => classes.includes(m[1])).map((m) => ({ id: '', dataset: { string: m[2] }, textContent: m[3].replace(/<[^>]*>/g, '') }));
};

test('a face shown while the standing overlay\'s field holds the caret takes nothing\'s place: the overlay stands with its caret, and the face\'s words — a told face\'s too — are said through the status region; with the caret elsewhere, the face takes its place (#171\'s rule 2)', () => {
  /** @type {string[]} what the status region was given to say */
  const said = [];
  FOCUS.attach({ live: /** @type {any} */ ({ setAttribute() {}, set textContent(/** @type {string} */ v) { said.push(v); } }) });
  /** the moment's answer field, the platform's focus in it */
  const field = { id: 'the answer', matches: (/** @type {string} */ sel) => sel.split(',').map((s) => s.trim()).includes('input'), blur() {}, focus() {} };
  const was = { contains: hostEl.contains, createElement: globalThis.document.createElement, active: globalThis.document.activeElement };
  hostEl.contains = /** @type {any} */ ((/** @type {unknown} */ x) => x === field);
  // the platform's parse of a markup string, written into nothing the page shows: a template's content
  globalThis.document.createElement = /** @type {any} */ (() => { const t = { innerHTML: '', get content() { return { querySelectorAll: (/** @type {string} */ sel) => faceParts(t.innerHTML, sel) }; } }; return t; });
  try {
    FACES.moment({ id: 'm-171', kind: 'ask', data: { text: 'name this' }, walk: 'w-171', board: null, answerable: true });
    globalThis.document.activeElement = /** @type {any} */ (field);
    assert.equal(HOST.typing(), true, 'the moment holds the caret');
    FACES.reading('1.0.1.0.3', null);
    FACES.floating('1.0.1.0.127', null, null, true);
    assert.deepEqual([standing(), globalThis.document.activeElement], ['moment:m-171', /** @type {any} */ (field)], 'the moment stands, its field holding the focus');
    assert.deepEqual(said, [t('L.reading', { address: '1.0.1.0.3' }), t('F.floating', { D: '1.0.1.0.127' })], 'each face said, the one its landing would tell too: no focus moves to tell it');
    globalThis.document.activeElement = /** @type {any} */ ({ id: 'the answer button' });
    assert.equal(HOST.typing(), false, 'the focus on the moment\'s button: no caret held');
    FACES.invalidFollow(null);
    assert.equal(standing(), 'face:invalid', 'the caret elsewhere, the face takes its place');
    HOST.dismiss();
  } finally {
    hostEl.contains = was.contains; globalThis.document.createElement = was.createElement; globalThis.document.activeElement = was.active;
  }
});

test('an overlay\'s own completion is no act on the chrome: the reading face taken down as its read answers ends no card asked while it stood, whose answer shows; another overlay standing is left (issue #171)', async () => {
  FACES.reading('1.0.1.0.3', null);
  const r = slow();
  const o = HOST.opening(() => r.read, card('provenance:wrote'));
  FACES.endReading();
  assert.deepEqual([standing(), HOST.pending()], [null, true], 'the reading face taken down, the card still reading');
  r.answer('its origin');
  await o;
  assert.equal(standing(), 'provenance:wrote', 'its answer shows');
  HOST.complete('reading:1.0.1.0.3');
  assert.equal(standing(), 'provenance:wrote', 'a completion names the overlay it ends: the card stands');
  const again = slow();
  const ended = HOST.opening(() => again.read, card('provenance:uses'));
  HOST.dismiss();
  again.answer('its users');
  await ended;
  assert.equal(standing(), null, 'a dismissal is an act on the chrome: the card still reading ends with it');
});

test('an overlay drawn again in its place by the module that showed it is no act on the chrome: the dead end\'s face taking its version offer while a card reads leaves the card\'s opening standing, whose answer shows; a face no longer standing is never drawn again (issue #57)', async () => {
  const FAR = '1.0.1.0.127', at = { span: { addr: FAR, pos: 1 }, sign: FAR }, offer = { k: 1, go: () => {} };
  const was = globalThis.HTMLElement;
  globalThis.HTMLElement = /** @type {any} */ (class {});
  try {
    FACES.floating(FAR, at, null, true);
    const r = slow();
    const o = HOST.opening(() => r.read, card('provenance:wrote'));
    FACES.offered(FAR, offer);
    assert.deepEqual([standing(), Object.keys(HOST.currentState()?.acts || {}), HOST.pending()], ['face:floating', ['a0'], true], 'the face drawn again with its act, the card still reading');
    r.answer('its origin');
    await o;
    assert.equal(standing(), 'provenance:wrote', 'the card asked shows its answer');
    HOST.dismiss();
    FACES.offered(FAR, offer);
    assert.equal(standing(), null, 'no face standing: none drawn again');
  } finally {
    globalThis.HTMLElement = was;
    HOST.dismiss();
  }
});

test('an opening begins in the act that asks for it: no module of the page loads another by `import()`, the app alone loading its gate\'s so (S-22 (a))', () => {
  const WEB = new URL('../', import.meta.url);
  const modules = readdirSync(WEB, { recursive: true }).map((f) => String(f).split(sep).join('/')).filter((f) => f.endsWith('.js') && !f.endsWith('.test.js') && !f.startsWith('test/') && !f.startsWith('gate/'));
  assert.ok(['app/main.js', 'app/input.js', 'nav/keys.js', 'overlays/links-card.js', 'overlays/faces.js'].every((f) => modules.includes(f)), 'the page\'s modules are read');
  /** @type {string[]} */
  const stray = [];
  for (const f of modules) {
    // comments dropped, a block before a line: a JSDoc type's `import('…')` names a type, and a head comment may name `import()`
    const src = readFileSync(new URL(f, WEB), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/[^\n]*/g, '');
    for (const m of src.matchAll(/\bimport\s*\(([^)]*)\)/g)) if (!(f === 'app/main.js' && /^\s*['"]\.\.\/gate\//.test(m[1]))) stray.push(`${f}: import(${m[1]})`);
  }
  assert.deepEqual(stray, []);
});

/** a stand-in of the element an act was made at, standing in the page at a rect on screen, bearing `id` where one is given */
const conjuredAt = (/** @type {{x: number, y: number, w: number, h: number}} */ r, id = '') => ({ id, isConnected: true, getBoundingClientRect: () => ({ left: r.x, top: r.y, right: r.x + r.w, bottom: r.y + r.h, width: r.w, height: r.h }) });
/** where the host placed the overlay standing, in px: its left and its top */
const placed = () => ({ x: parseFloat(/** @type {any} */ (hostEl.style).left), y: parseFloat(/** @type {any} */ (hostEl.style).top) });

test('an overlay conjured at an element stands beneath it while it stands in the page, and at the span named beside it once the text layer takes it away — never at the viewport\'s corner', () => {
  const D = '1.0.1.0.3', b = docBox(D);
  CAM.setViewport(1440, 900);
  // the camera over the document's box, the whole box in view; no article of it is mounted here, so its span's place is the box
  CAM.set({ x: b.x + b.w / 2, y: b.y + b.h / 2, scale: Math.min(600 / b.w, 600 / b.h) });
  const sym = conjuredAt({ x: 300, y: 200, w: 12, h: 14 });
  HOST.show({ kind: 'card', id: 'anatomy:L', anchor: { el: /** @type {any} */ (sym), span: { addr: D, pos: 11, width: 5 } }, html: '<span class="label">L</span>', acts: {} });
  assert.deepEqual(placed(), { x: 300, y: 218 }, 'beneath the element while it stands, the span beside it never read');
  sym.isConnected = false; // the text layer rebuilt the article the element stood in, or took it down
  HOST.place();
  const box = { x: CAM.sx(b.x + b.w), y: CAM.sy(b.y) };
  assert.ok(box.x > 6 && box.x < 1434 && box.y > 34 && box.y < 894, `the box's top-right stands in the viewport: ${JSON.stringify(box)}`);
  assert.deepEqual(placed(), box, 'the element gone: at the span named beside it — its document\'s box, no article of it mounted — never at the viewport\'s corner');
  HOST.dismiss();
});

test('a jump\'s face is hidden on the plane exactly while the document it stands at is out of the visible view, the one line carrying its string\'s id and its words exactly then; a face naming no document is never hidden (FP-25)', () => {
  const D = '1.0.1.0.3', b = docBox(D), scale = Math.min(600 / b.w, 600 / b.h);
  CAM.setViewport(1440, 900);
  /** the face's parts the host reads its words from, read from the markup it wrote: its words, its arm, its clause, its note */
  const parts = (/** @type {string} */ sel) => {
    const classes = sel.split(',').map((s) => s.trim().replace(/^\./, ''));
    return [...hostEl.innerHTML.matchAll(/<div class="([\w-]+)"(?: data-string="([^"]*)")?>((?:[^<]|<\/?span[^>]*>)*)<\/div>/g)].filter((m) => classes.includes(m[1])).map((m) => ({ id: '', dataset: { string: m[2] }, textContent: m[3].replace(/<[^>]*>/g, '') }));
  };
  const was = { one: hostEl.querySelector, all: hostEl.querySelectorAll, HTMLElement: globalThis.HTMLElement };
  Object.assign(hostEl, { querySelector: (/** @type {string} */ sel) => parts(sel)[0] || null, querySelectorAll: parts });
  globalThis.HTMLElement = /** @type {any} */ (class {});
  try {
    CAM.set({ x: b.x + b.w / 2, y: b.y + b.h / 2, scale });
    FACES.reading(D, { span: { addr: D, pos: 1 }, sign: D });
    assert.deepEqual([/** @type {any} */ (hostEl.style).visibility, HOST.aside()], ['', null], 'its document in view: shown on the plane, nothing aside');
    CAM.set({ x: b.x - 20 * b.w, y: b.y - 20 * b.h, scale });
    HOST.place();
    assert.deepEqual([/** @type {any} */ (hostEl.style).visibility, HOST.aside()], ['hidden', { id: 'L.reading', text: t('L.reading', { address: D }) }], 'its document out of view: hidden, the line carrying its words');
    CAM.set({ x: b.x + b.w / 2, y: b.y + b.h / 2, scale });
    HOST.place();
    assert.deepEqual([/** @type {any} */ (hostEl.style).visibility, HOST.aside()], ['', null], 'back in view: shown again');
    CAM.set({ x: b.x - 20 * b.w, y: b.y - 20 * b.h, scale });
    FACES.unregistered(D, null);
    assert.deepEqual([/** @type {any} */ (hostEl.style).visibility, HOST.aside()], ['', null], 'a face naming no document: never hidden');
    HOST.dismiss();
  } finally {
    Object.assign(hostEl, { querySelector: was.one, querySelectorAll: was.all });
    globalThis.HTMLElement = was.HTMLElement;
  }
});

test('an element its owner redrew from state is found again by its id: the overlay stands beneath the one the page holds now', () => {
  const back = conjuredAt({ x: 10, y: 8, w: 40, h: 24 }, 'line-back'), redrawn = conjuredAt({ x: 14, y: 8, w: 44, h: 24 }, 'line-back');
  const find = globalThis.document.getElementById;
  globalThis.document.getElementById = /** @type {any} */ ((/** @type {string} */ id) => (id === redrawn.id ? redrawn : null));
  try {
    HOST.show({ kind: 'list', id: 'trail-list', anchor: { el: /** @type {any} */ (back) }, html: '<span class="label">the trail</span>', acts: {} });
    assert.deepEqual(placed(), { x: 10, y: 36 }, 'beneath Back');
    back.isConnected = false; // the one line rebuilt: its Back is another element, bearing the same id
    HOST.place();
    assert.deepEqual(placed(), { x: 14, y: 36 }, 'beneath the Back the line holds now, found by its id');
  } finally {
    globalThis.document.getElementById = find;
    HOST.dismiss();
  }
});

test('a change of the page\'s class takes down what the host wrote from what the class it left could read (issue #177: "Cards on covered material close onto the cover"): the card standing dismissed — its end run, the focus it held handed to the walk\'s element — and an opening still reading ended, its answer showing nothing; a jump\'s reading face and a moment\'s stand through it', async () => {
  const doc = /** @type {any} */ (globalThis.document);
  /** the walk's element, and a control of the card holding the focus */
  const item = { id: 'the walk\'s item', isConnected: true, focus() { doc.activeElement = item; } };
  const act = { id: 'the card\'s act', blur() { doc.activeElement = null; } };
  const was = { contains: hostEl.contains, active: doc.activeElement };
  FOCUS.attach({ home: () => /** @type {any} */ (item) });
  hostEl.contains = /** @type {any} */ ((/** @type {unknown} */ x) => x === act);
  try {
    /** @type {boolean | null} how the card's end ran: replaced, or dismissed */
    let ended = null;
    HOST.show({ kind: 'card', id: 'anatomy:1.0.1.0.1003.0.2.1', anchor: null, html: '<span class="label">its passage</span>', acts: {}, onDismiss: (replaced) => { ended = replaced; } });
    doc.activeElement = act;
    const r = slow();
    const o = HOST.opening(() => r.read, card('provenance:wrote'));
    HOST.classChanged();
    assert.deepEqual([standing(), ended, HOST.pending(), doc.activeElement], [null, false, false, item], 'the card dismissed, its end run, the opening ended, the focus it held on the walk\'s element');
    r.answer('its origin');
    await o;
    assert.equal(standing(), null, 'the opening\'s answer shows nothing');
    FACES.reading('1.0.1.0.3', null);
    HOST.classChanged();
    assert.equal(standing(), 'reading:1.0.1.0.3', 'a jump\'s reading face stands: its read is asked again at the new class');
    FACES.endReading();
    FACES.moment({ id: 'm-177', kind: 'label', data: { title: 'name this device', statements: [], default: null }, walk: 'w-177', board: null, answerable: true });
    HOST.classChanged();
    assert.equal(standing(), 'moment:m-177', 'a moment\'s face stands: the shell\'s, not the page\'s');
    HOST.dismiss();
  } finally {
    hostEl.contains = was.contains; doc.activeElement = was.active; FOCUS.attach({ home: () => null });
  }
});
