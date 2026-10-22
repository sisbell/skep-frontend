// APP-INPUT's test, on a page of stand-ins: the act at a withheld run's
// placeholder conjures C-39's face naming the owner the placeholder names —
// its run's origin's, by T-LAYER's one owner rule — with the arm beneath it
// the placeholder's own (B1-S5, B1-S7). Where the board answers the origin's
// account's owner as the seat above it (`effective_owner`), a mutant that
// reads the owner off the origin's record by a rule of its own names the
// account and turns red. A click on a run's hairline, against the FAKE PORT,
// LEAPs to its source carrying the run, which the source's text holds
// elsewhere: the landing is marked at the run's counterpart there (a mutant
// that LEAPs without the run, or carries the block it stands in, turns red).
// An empty click made while a card reads ends its opening alone (O-HOST's):
// its answer shows nothing and the card standing under it stands (a mutant
// that dismisses the standing card with it, or leaves the opening to the
// overlay's dismissal, turns red); the next empty click dismisses that card.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as INPUT from './input.js';
import * as HOST from '../overlays/host.js';
import * as REC from '../model/records.js';
import * as LAYER from '../text/layer.js';
import * as PORT from '../bridge/port.js';
import * as F from '../model/frames.js';
import * as FAKE from '../test/fake-port.js';
import * as GO from '../nav/go.js';
import * as CAM from '../plane/camera.js';
import * as RENDER from '../plane/render.js';
import { lodOf } from '../plane/lod.js';
import { articleHTML, entitlementArm } from '../text/article.js';
import { t } from '../strings.js';
import { esc, byteLength } from '../util.js';

/** the attributes of an element's opening tag, as the platform's `dataset` reads them */
const datasetOf = (/** @type {string} */ tag) =>
  Object.fromEntries([...tag.matchAll(/ data-([a-z-]+)="([^"]*)"/g)].map(([, k, v]) => [k.replace(/-([a-z])/g, (_, c) => c.toUpperCase()), v]));

test('the act at a withheld run conjures C-39\'s face naming the owner its placeholder names, the arm beneath it the placeholder\'s own', () => {
  const platform = { document: globalThis.document, window: globalThis.window, HTMLElement: globalThis.HTMLElement };
  /** @type {Map<string, (e: unknown) => void>} the text layer's listeners, by event */
  const layer = new Map();
  const listens = (/** @type {Map<string, (e: unknown) => void> | null} */ into) => ({ addEventListener: (/** @type {string} */ type, /** @type {(e: unknown) => void} */ fn) => { if (into) into.set(type, fn); } });
  globalThis.HTMLElement = /** @type {any} */ (class {});
  globalThis.document = /** @type {any} */ ({ ...listens(null), activeElement: null, body: null });
  globalThis.window = /** @type {any} */ ({ ...listens(null), getSelection: () => null });
  try {
    // a guest at 1.0.2's document, which windows a run of 1.0.1.1's: an unallocated sub-account, whose owner is the seat above it
    const D = '1.0.2.0.5', O = '1.0.1.1.0.2', owner = '1.0.1';
    REC.setSession(null);
    REC.takeOwner('1.0.1.1', { prefix: owner, principal: 900 });
    const text = 'Tumbler.\n\n', n = new TextEncoder().encode(text).length;
    REC.takeSpanSet(D, [{ subspace: 1, ordinal: 1, positions: n + 240 }]);
    REC.takeDelivery(D, [{ pos: 1, width: n, kind: 'content', text, ref: null, origin: null }, { pos: n + 1, width: 240, kind: 'withheld', text: '', ref: null, origin: O }]);
    const d = REC.doc(D);
    // the placeholder as the plane's article holds it: T-LAYER mounts T-ARTICLE's HTML from its view
    const tag = (/<span class="withheld"[^>]*>/.exec(articleHTML(d, LAYER.viewFor(d), LAYER.ownerAccount(d))) || [''])[0];
    const run = Object.assign(new globalThis.HTMLElement(), { dataset: datasetOf(tag), isConnected: false });
    Object.assign(run, { closest: (/** @type {string} */ sel) => (sel === '[data-withheld]' ? run : null) });
    assert.deepEqual([run.dataset.origin, run.dataset.owner], [O, owner], 'the placeholder carries its origin and its origin\'s owner, the seat above the origin\'s account');
    HOST.attach(/** @type {any} */ ({
      ...listens(null), className: '', innerHTML: '', style: {}, setAttribute() {}, removeAttribute() {},
      querySelector: () => null, querySelectorAll: () => [], contains: () => false, getBoundingClientRect: () => ({ width: 0, height: 0 }),
    }));
    INPUT.attach(/** @type {any} */ ({ plane: listens(null), layer: listens(layer), corners: listens(null) }));
    const click = layer.get('click');
    assert.ok(click, 'the text layer takes a click');
    click({ target: run, clientX: 0, clientY: 0, stopPropagation() {} });
    const face = HOST.currentOverlay();
    assert.equal(face && face.id, 'face:C-39', 'the act at the run conjures C-39\'s face');
    const html = face ? face.html : '';
    assert.ok(html.includes(`>${esc(t('C-39', { owner }))}</div>`), `the face names ${owner}, the owner the placeholder names — never the origin's account, 1.0.1.1`);
    assert.ok(html.includes(`>${esc(entitlementArm(null, owner).text)}</div>`), 'the arm beneath it is the placeholder\'s own: R56\'s key-absent default, naming the same owner');
    HOST.dismiss();
  } finally {
    globalThis.document = platform.document; globalThis.window = platform.window; globalThis.HTMLElement = platform.HTMLElement;
  }
});

test('a click on a run\'s hairline LEAPs to its source carrying the run, the landing marked at the run\'s counterpart in the source\'s text', async () => {
  const platform = { document: globalThis.document, window: globalThis.window, HTMLElement: globalThis.HTMLElement };
  /** @type {Map<string, (e: unknown) => void>} the text layer's listeners, by event */
  const layer = new Map();
  const listens = (/** @type {Map<string, (e: unknown) => void> | null} */ into) => ({ addEventListener: (/** @type {string} */ type, /** @type {(e: unknown) => void} */ fn) => { if (into) into.set(type, fn); } });
  globalThis.HTMLElement = /** @type {any} */ (class {});
  globalThis.document = /** @type {any} */ ({ ...listens(null), activeElement: null, body: null });
  globalThis.window = /** @type {any} */ ({ ...listens(null), getSelection: () => null });
  try {
    // the first edition's second paragraph ends in a run of the draft 1.0.1.0.1003 — positions 23 to 37 — which the draft's own text holds at 12
    const D = '1.0.1.0.3', O = '1.0.1.0.1003';
    const text = 'Tumbler.\n\nAs it says: the window run.', source = 'A source.\n\nthe window run.';
    const run = { addr: D, pos: 23, width: 15 };
    const fake = FAKE.create({
      [FAKE.keyOf('op', { frame: F.retrieveDocVSpanSet(O) })]: { result: { as_of: 1, resp: 'span_set', set: [{ start: '1.1', width: '0.' + byteLength(source) }] } },
      [FAKE.keyOf('op', { frame: F.docMetadata(O) })]: { result: { as_of: 1, resp: 'doc_metadata', doc: O, published: false, owner: '1.0.1', birth: null, birth_extent: null, placed: null, base_extent: null, source: null } },
      [FAKE.keyOf('op', { frame: F.retrieveV(O, 1, byteLength(source)) })]: { result: { as_of: 1, resp: 'delivery', items: [{ content: source }] } },
      [FAKE.keyOf('op', { frame: F.image(O, 1, byteLength(source)) })]: { result: { as_of: 1, resp: 'runs', runs: [{ i_start: O + '.0.1.1', width: String(byteLength(source)) }] } },
      [FAKE.keyOf('op', { frame: F.findLinksV(O, 1, byteLength(source)) })]: { result: { as_of: 1, resp: 'addrs', addrs: [] } },
      [FAKE.keyOf('op', { frame: F.compare([{ doc: D, spans: [{ ordinal: run.pos, positions: run.width }] }], [{ doc: O, spans: [{ ordinal: 1, positions: byteLength(source) }] }]) })]:
        { result: { as_of: 1, resp: 'compare', pairs: [{ d1: D, d2: O, u1: { ordinal: '23', subspace: '1' }, u2: { ordinal: '12', subspace: '1' }, width: '15' }] } },
    });
    PORT.boot(fake);
    REC.takeSpanSet(D, [{ subspace: 1, ordinal: 1, positions: byteLength(text) }]);
    REC.takeDelivery(D, [{ pos: 1, width: byteLength(text), kind: 'content', text, ref: null, origin: null }]);
    REC.takeImage(D, 1, [{ iStart: D + '.0.1.1', width: 22 }, { iStart: O + '.0.1.12', width: 15 }]);
    const d = REC.doc(D);
    // the hairline as the plane's article holds it, in the article T-LAYER mounts from its view
    const tag = (/<span class="hairline[^>]*>/.exec(articleHTML(d, LAYER.viewFor(d), LAYER.ownerAccount(d))) || [''])[0];
    const article = { dataset: { addr: D } };
    const hair = Object.assign(new globalThis.HTMLElement(), { dataset: datasetOf(tag) });
    Object.assign(hair, { closest: (/** @type {string} */ sel) => (sel === '.hairline' ? hair : sel === 'article' ? article : null) });
    assert.equal(hair.dataset.src, O, 'the hairline names the run\'s source');
    HOST.attach(/** @type {any} */ ({
      ...listens(null), className: '', innerHTML: '', style: {}, setAttribute() {}, removeAttribute() {},
      querySelector: () => null, querySelectorAll: () => [], contains: () => false, getBoundingClientRect: () => ({ width: 0, height: 0 }),
    }));
    INPUT.attach(/** @type {any} */ ({ plane: listens(null), layer: listens(layer), corners: listens(null) }));
    const click = layer.get('click');
    assert.ok(click, 'the text layer takes a click');
    click({ target: hair, clientX: 0, clientY: 0, stopPropagation() {} });
    for (let i = 0; i < 200 && !GO.arrivalMark(); i++) await new Promise((r) => setTimeout(r, 0));
    assert.deepEqual(GO.arrivalMark(), { addr: O, pos: 12, runs: [{ pos: 12, width: 15 }], link: null }, 'the run marked where the source holds it');
    assert.deepEqual(fake.unanswered, [], 'the run carried, and no other passage');
  } finally {
    globalThis.document = platform.document; globalThis.window = platform.window; globalThis.HTMLElement = platform.HTMLElement;
  }
});

test('an empty click made while a card reads ends its opening alone: its answer shows nothing, the card standing under it stands, and the next empty click dismisses that card', async () => {
  const platform = { document: globalThis.document, window: globalThis.window, HTMLElement: globalThis.HTMLElement };
  /** @type {Map<string, (e: unknown) => void>} the plane's listeners, by event */
  const plane = new Map();
  const listens = (/** @type {Map<string, (e: unknown) => void> | null} */ into) => ({ addEventListener: (/** @type {string} */ type, /** @type {(e: unknown) => void} */ fn) => { if (into) into.set(type, fn); } });
  globalThis.HTMLElement = /** @type {any} */ (class {});
  globalThis.document = /** @type {any} */ ({ ...listens(null), activeElement: null, body: null });
  globalThis.window = /** @type {any} */ ({ ...listens(null), getSelection: () => null });
  try {
    HOST.attach(/** @type {any} */ ({
      ...listens(null), className: '', innerHTML: '', style: {}, setAttribute() {}, removeAttribute() {},
      querySelector: () => null, querySelectorAll: () => [], contains: () => false, getBoundingClientRect: () => ({ width: 0, height: 0 }),
    }));
    INPUT.attach(/** @type {any} */ ({ plane: { ...listens(plane), classList: { add() {}, remove() {} } }, layer: listens(null), corners: listens(null) }));
    // the camera beyond the board's edge, at a scale where a click that falls on no place is no teleport
    CAM.setViewport(1440, 900);
    CAM.set({ x: -1e9, y: -1e9, scale: 1 });
    const at = { clientX: 720, clientY: 450 };
    assert.ok(RENDER.docAtScreen(at.clientX, at.clientY) === null && RENDER.residueAtScreen(at.clientX, at.clientY) === null && !['far', 'far~mid'].includes(lodOf(CAM.cam.scale).name), 'the click falls on nothing');
    /** an empty click: the button pressed and released on the plane where it was pressed */
    const click = () => { plane.get('pointerdown')?.({ ...at, ctrlKey: false, metaKey: false, pointerId: 1 }); plane.get('pointerup')?.({ ...at }); };
    HOST.show({ kind: 'card', id: 'selection', anchor: null, html: '<span class="label">1.0.1.0.3 · position 11</span>', acts: {} });
    /** @type {(origin: string) => void} */
    let answer = () => {};
    const opening = HOST.opening(() => new Promise((r) => { answer = r; }), (/** @type {string} */ origin) => HOST.show({ kind: 'card', id: 'provenance:wrote', anchor: null, html: `<span class="label">${origin}</span>`, acts: {} }));
    click();
    assert.deepEqual([HOST.pending(), HOST.currentState()?.id], [false, 'selection'], 'the opening ended, the selection\'s card standing');
    answer('1.0.1.0.3');
    await opening;
    assert.equal(HOST.currentState()?.id, 'selection', 'its answer shows nothing');
    click();
    assert.equal(HOST.currentState(), null, 'the next empty click dismisses the card that stood');
  } finally {
    globalThis.document = platform.document; globalThis.window = platform.window; globalThis.HTMLElement = platform.HTMLElement;
  }
});
