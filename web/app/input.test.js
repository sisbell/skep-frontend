// APP-INPUT's test, on a page of stand-ins and against the fake port: the
// act at a withheld run's gap conjures C-39's face naming the owner the gap
// names, with the arm the rule gives that owner and this reader, anchored at
// the run's own positions, and the act at the run's key in its gap or at its
// origin's statement in the edge opens its whole wording's card; a
// transcluded run's key in its column's edge LEAPs to its source carrying the
// run; a symbol's click and
// a marked stretch's open the card of the end clicked; C-67's pointer in a
// withheld origin's statement LEAPs to the claim's home whole, carrying no
// passage and lighting no link, while the rest of the gap still conjures
// C-39's face; a
// click on the read a corner offers is the version move to it; a
// press at the readable em on text not yet standing is held for it and
// becomes the text's click; a press or a click falls on every box the plane
// draws, one the index does not list among them; an empty click ends a card's
// opening alone, then dismisses the card; a press on a placeholder starts no selection; a wheel
// series under way as a jump's camera left is dropped whole, and a later
// wheel, a pinch or the camera key's drag takes the camera over; a wheel over
// the overlay or the notice below it is theirs, the camera staying; a press on
// an outlined run below reading scale is a step to it; a withheld run's one
// symbol opens its ends' card or list, never C-39's face; a byline's cut
// label opens and closes on its clicks, selecting nothing; where no board is
// held a click at far scale is an empty one, and where one is held it goes to
// the account whose cell holds it, in a continuation too; a
// continuation's mark is two targets, its newest label going to that member
// and the rest opening its list, the pointer's shape over each its own; a
// click placing the caret in a draft the person may edit stands the walk on
// its span, the ring out, so a slot chord acts there and the next key types
// at it wherever the walk stood; a click on a block of text the person may
// not edit stands the walk on that block, the ring out, a live caret left
// kept, so the next key types nothing; a click on any other of another
// document's things keeps a live caret, owing the frame nothing, and stands
// the walk on what it marks, else on the stop nearest the point, and one on
// the caret's own draft's things but its text and its corner leaves the caret
// live with the walk on its span; an empty click is the pointer's Esc, one
// step of its order a click, the live caret's its last and no arrival ended;
// and a focus landing in a corner the
// view does not show whole pans the camera by the least that brings it in below
// the one line, never while a flight runs. On the DOM under `web/test/`, the
// test standing for the platform's selection: a drag forward or backward, a
// double-click and a Shift+click — from the live caret, the kept caret, a
// selection's anchor or nothing — in a draft the person may edit, and a Shift
// press the canvas holds until the text stands, each leave the caret live at
// the selection's moving end, the selection standing, so a key replaces it
// and Esc ends it before it keeps the caret; and a drag reaching past one
// document places no caret, leaving the caret by the document its moving end
// lies in (FP-12, FP-20, FP-21, FP-24, FP-25, FP-30, FP-34, FP-35, FP-36,
// FP-40).
import { test, before } from 'node:test';
import assert from 'node:assert/strict';
import * as INPUT from './input.js';
import * as HOST from '../overlays/host.js';
import * as SEL from '../overlays/selection.js';
import * as REC from '../model/records.js';
import * as WRITE from '../write/write.js';
import * as LAYER from '../text/layer.js';
import * as LK from '../links/links.js';
import * as PORT from '../bridge/port.js';
import * as F from '../model/frames.js';
import * as FAKE from '../test/fake-port.js';
import * as GO from '../nav/go.js';
import * as TRAIL from '../nav/trail.js';
import * as WALK from '../nav/walk.js';
import * as KEYS from '../nav/keys.js';
import * as FOCUS from '../nav/focus.js';
import * as HINT from '../overlays/hint.js';
import * as CAM from '../plane/camera.js';
import * as RENDER from '../plane/render.js';
import * as LINE from '../line/line.js';
import { lodOf } from '../plane/lod.js';
import { articleHTML, entitlementArm, edgeStatementHTML, placeholderOf, originRunsOf, sourceStatementHTML } from '../text/article.js';
import { resolveSpan, unitSpan } from '../model/address.js';
import { accountCell, boardCell, docBox } from '../plane/projection.js';
import { outlineRects } from '../plane/layout.js';
import { t, tHTML, addressedHTML } from '../strings.js';
import { esc, byteLength } from '../util.js';
import { spanOfBlock } from '../text/span.js';
import { recorder } from '../test/canvas.js';
import { page } from '../test/dom.js';

/** the attributes of an element's opening tag, as the platform's `dataset` reads them */
const datasetOf = (/** @type {string} */ tag) =>
  Object.fromEntries([...tag.matchAll(/ data-([a-z-]+)="([^"]*)"/g)].map(([, k, v]) => [k.replace(/-([a-z])/g, (_, c) => c.toUpperCase()), v]));

// the board the page opened: the page makes every act below on the board `boards()` answered
before(() => { REC.setBoard({ board: 'b-1', name: '', origin: '' }); });

test('the act at a withheld run\'s gap conjures C-39\'s face naming the owner its gap names, the arm beneath it the rule\'s for that owner and this reader; the act at its key in its gap, and at its origin\'s statement in its column\'s edge, opens its whole wording\'s card (issue #288\'s design decision: "The whole wording opens as a card on any run\'s act")', () => {
  const platform = { document: globalThis.document, window: globalThis.window, HTMLElement: globalThis.HTMLElement };
  /** @type {Map<string, (e: unknown) => void>} the text layer's listeners, by event */
  const layer = new Map();
  /** @type {Map<string, (e: unknown) => void>} the corner layer's listeners, by event */
  const corners = new Map();
  const listens = (/** @type {Map<string, (e: unknown) => void> | null} */ into) => ({ addEventListener: (/** @type {string} */ type, /** @type {(e: unknown) => void} */ fn) => { if (into) into.set(type, fn); } });
  globalThis.HTMLElement = /** @type {any} */ (class {});
  globalThis.document = /** @type {any} */ ({ ...listens(null), activeElement: null, body: null });
  globalThis.window = /** @type {any} */ ({ ...listens(null), getSelection: () => null });
  // the device's key store as `fingerprint` answers it: a key bound at this board, or none
  const ORIGIN = 'http://127.0.0.1:8642', BOUND = [{ bindings: [ORIGIN + ' principal 1 account 1.0.1'] }];
  try {
    // a guest at 1.0.2's document, which windows a run of 1.0.1.1's: an unallocated sub-account, whose owner is the seat above it
    const D = '1.0.2.0.5', O = '1.0.1.1.0.2', owner = '1.0.1';
    REC.setSession(null);
    REC.takeOwner('1.0.1.1', { prefix: owner, principal: 900 });
    const text = 'Tumbler.\n\n', n = new TextEncoder().encode(text).length;
    REC.takeSpanSet(D, [{ subspace: 1, ordinal: 1, positions: n + 300 }]);
    REC.takeDelivery(D, [{ pos: 1, width: n, kind: 'content', text, ref: null, origin: null }, { pos: n + 1, width: 300, kind: 'withheld', text: '', ref: null, origin: O }]);
    // the edition claims on the origin read, none listed: every read the run's card waits on answered, so it shows at once
    REC.takeEditionClaims(O, []);
    const d = REC.doc(D);
    HOST.attach(/** @type {any} */ ({
      ...listens(null), className: '', innerHTML: '', style: {}, setAttribute() {}, removeAttribute() {},
      querySelector: () => null, querySelectorAll: () => [], contains: () => false, getBoundingClientRect: () => ({ width: 0, height: 0 }),
    }));
    INPUT.attach(/** @type {any} */ ({ plane: listens(null), layer: listens(layer), corners: listens(corners) }));
    const click = layer.get('click'), cornerClick = corners.get('click');
    assert.ok(click && cornerClick, 'the text layer and the corner layer take a click');
    /** @type {Array<[string, Array<{bindings: string[]}>, string]>} each guest, the device's keys, and the arm the placeholder and the card carry */
    const guests = [['a guest with no key', [], 'R56.key-absent'], ['a guest with a key for this board', BOUND, 'C-36.guest.key']];
    for (const [who, keys, id] of guests) {
      REC.takeKeyStore(keys, ORIGIN);
      // the placeholder as the plane's article holds it: T-LAYER mounts T-ARTICLE's HTML from its view
      const article = articleHTML(d, LAYER.viewFor(d), REC.ownerAccount(d));
      const tag = (/<span class="withheld"[^>]*>/.exec(article) || [''])[0], arm = entitlementArm({ account: null, keyPresent: keys.length > 0 }, owner).text;
      assert.ok(!article.includes('class="arm"') && article.includes(`data-key="${O}"`), `${who}: no face in its gap, its key in it`);
      const run = Object.assign(new globalThis.HTMLElement(), { dataset: datasetOf(tag), isConnected: false });
      const holder = { dataset: { addr: D } };
      Object.assign(run, { closest: (/** @type {string} */ sel) => (sel === '[data-withheld]' ? run : sel === 'article' ? holder : null) });
      assert.deepEqual([run.dataset.origin, run.dataset.owner], [O, owner], `${who}: the gap carries its origin and its origin's owner, the seat above the origin's account`);
      click({ target: run, clientX: 0, clientY: 0, stopPropagation() {} });
      const face = HOST.currentOverlay();
      assert.equal(face && face.id, 'face:C-39', `${who}: the act at the gap conjures C-39's face`);
      assert.deepEqual(face && face.anchor, { el: run, span: { addr: D, pos: n + 1, width: 300 } }, `${who}: the face stands at the placeholder, the run's own positions beside it, where it stands once the text layer rebuilds or takes the placeholder down`);
      const html = face ? face.html : '';
      assert.ok(html.includes(`>${addressedHTML(t('C-39', { owner }))}</div>`) && html.includes(`<span class="id">${owner}</span>`), `${who}: the face names ${owner}, in the identifier's face, the owner the placeholder names — never the origin's account, 1.0.1.1`);
      assert.ok(html.includes(`<div class="arm" data-string="${id}">${addressedHTML(arm)}</div>`), `${who}: the arm beneath it is the rule's for the run's origin's owner and this reader, ${id}: ${html}`);
      HOST.dismiss();
      /** the card standing: its id, its kind, and whether its head and the rule's arm stand in it whole */
      const card = () => { const o = HOST.currentOverlay(); return o && [o.id, o.kind, o.html.includes(addressedHTML(t('B1.withheld-run', { owner, account: owner, width: 300, origin: O }))) && o.html.includes(addressedHTML(arm))]; };
      // the key in its gap
      const key = Object.assign(new globalThis.HTMLElement(), { closest: (/** @type {string} */ sel) => (sel === '.wh-key' ? key : run.closest(sel)) });
      click({ target: key, clientX: 0, clientY: 0, stopPropagation() {} });
      assert.deepEqual(card(), ['withheld:' + O, 'card', true], `${who}: the act at its key opens its whole wording's card, its head and the rule's arm whole`);
      HOST.dismiss();
      // its origin's statement in its column's edge, as T-LAYER places it: the mark heading it
      const sign = { dataset: { addr: D, pos: String(n + 1), width: '300', origin: O, sign: 'statement' } };
      const mark = Object.assign(new globalThis.HTMLElement(), { closest: (/** @type {string} */ sel) => (sel === '.edge-sign' ? sign : sel === '.wh-mark, .wh-key' ? mark : null) });
      cornerClick({ target: mark, stopPropagation() {} });
      assert.deepEqual(card(), ['withheld:' + O, 'card', true], `${who}: the act at its statement's mark opens the same card`);
      HOST.dismiss();
    }
  } finally {
    REC.takeKeyStore([], ORIGIN);
    globalThis.document = platform.document; globalThis.window = platform.window; globalThis.HTMLElement = platform.HTMLElement;
  }
});

test('a click on a transcluded run\'s key in its column\'s edge — heading its origin\'s statement — LEAPs to its source carrying the run, the landing marked at the run\'s counterpart in the source\'s text; the article sets no hairline label to click (issue #304)', async () => {
  const platform = { document: globalThis.document, window: globalThis.window, HTMLElement: globalThis.HTMLElement };
  /** @type {Map<string, (e: unknown) => void>} the corner layer's listeners, by event */
  const corners = new Map();
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
    assert.ok(!articleHTML(d, LAYER.viewFor(d), REC.ownerAccount(d)).includes('hairline'), 'the article sets no label in the run\'s line');
    // the run the edge states, and its key heading the statement as T-LAYER places it, the sign carrying the run
    const [taken] = originRunsOf(d);
    assert.deepEqual(taken, { pos: run.pos, width: run.width, origin: O, withheld: false }, 'the run, its own positions in the document windowing it');
    const tag = (/<span class="src-key"[^>]*>/.exec(sourceStatementHTML(taken.origin, LAYER.carriesC33(d, LAYER.originKind(O)), false)) || [''])[0];
    const sign = { dataset: { addr: D, pos: String(taken.pos), width: String(taken.width), origin: O, sign: 'statement' } };
    const key = Object.assign(new globalThis.HTMLElement(), { dataset: datasetOf(tag) });
    Object.assign(key, { closest: (/** @type {string} */ sel) => (sel === '.edge-sign' ? sign : sel === '.src-key[data-src]' ? key : null) });
    assert.equal(key.dataset.src, O, 'the key names the run\'s source');
    HOST.attach(/** @type {any} */ ({
      ...listens(null), className: '', innerHTML: '', style: {}, setAttribute() {}, removeAttribute() {},
      querySelector: () => null, querySelectorAll: () => [], contains: () => false, getBoundingClientRect: () => ({ width: 0, height: 0 }),
    }));
    INPUT.attach(/** @type {any} */ ({ plane: listens(null), layer: listens(null), corners: listens(corners) }));
    const click = corners.get('click');
    assert.ok(click, 'the corner layer takes a click');
    click({ target: key, stopPropagation() {} });
    for (let i = 0; i < 200 && !GO.arrivalMark(); i++) await new Promise((r) => setTimeout(r, 0));
    assert.deepEqual(GO.arrivalMark(), { addr: O, pos: 12, runs: [{ pos: 12, width: 15 }], link: null }, 'the run marked where the source holds it');
    assert.deepEqual(fake.unanswered, [], 'the run carried, and no other passage');
  } finally {
    globalThis.document = platform.document; globalThis.window = platform.window; globalThis.HTMLElement = platform.HTMLElement;
  }
});

test('a press on an outlined run of an arrival in several runs, below its document\'s reading scale, is a step to it — the landing standing there, the camera bound for its reading view — never a teleport to the document: no trail entry, the arrival standing (issue #158)', async () => {
  const platform = { document: globalThis.document, window: globalThis.window, HTMLElement: globalThis.HTMLElement };
  /** @type {Map<string, (e: unknown) => void>} the plane's listeners, by event */
  const plane = new Map();
  const listens = (/** @type {Map<string, (e: unknown) => void> | null} */ into) => ({ addEventListener: (/** @type {string} */ type, /** @type {(e: unknown) => void} */ fn) => { if (into) into.set(type, fn); } });
  globalThis.HTMLElement = /** @type {any} */ (class {});
  globalThis.document = /** @type {any} */ ({ ...listens(null), activeElement: null, body: null });
  globalThis.window = /** @type {any} */ ({ ...listens(null), getSelection: () => null });
  try {
    // the first edition's run at 23, fifteen positions, carried into the draft 1.0.1.0.7, which holds its first seven at 12 and its last eight at 30
    const D = '1.0.1.0.3', O = '1.0.1.0.7';
    const text = 'Tumbler.\n\nAs it says: the window run.', source = 'A source.\n\nthe window run, and then more words here.';
    const carried = { addr: D, pos: 23, width: 15 };
    const fake = FAKE.create({
      [FAKE.keyOf('op', { frame: F.retrieveDocVSpanSet(O) })]: { result: { as_of: 1, resp: 'span_set', set: [{ start: '1.1', width: '0.' + byteLength(source) }] } },
      [FAKE.keyOf('op', { frame: F.docMetadata(O) })]: { result: { as_of: 1, resp: 'doc_metadata', doc: O, published: false, owner: '1.0.1', birth: null, birth_extent: null, placed: null, base_extent: null, source: null } },
      [FAKE.keyOf('op', { frame: F.retrieveV(O, 1, byteLength(source)) })]: { result: { as_of: 1, resp: 'delivery', items: [{ content: source }] } },
      [FAKE.keyOf('op', { frame: F.image(O, 1, byteLength(source)) })]: { result: { as_of: 1, resp: 'runs', runs: [{ i_start: O + '.0.1.1', width: String(byteLength(source)) }] } },
      [FAKE.keyOf('op', { frame: F.findLinksV(O, 1, byteLength(source)) })]: { result: { as_of: 1, resp: 'addrs', addrs: [] } },
      [FAKE.keyOf('op', { frame: F.compare([{ doc: D, spans: [{ ordinal: carried.pos, positions: carried.width }] }], [{ doc: O, spans: [{ ordinal: 1, positions: byteLength(source) }] }]) })]:
        { result: { as_of: 1, resp: 'compare', pairs: [{ d1: D, d2: O, u1: { ordinal: '23', subspace: '1' }, u2: { ordinal: '12', subspace: '1' }, width: '7' }, { d1: D, d2: O, u1: { ordinal: '30', subspace: '1' }, u2: { ordinal: '30', subspace: '1' }, width: '8' }] } },
    });
    PORT.boot(fake);
    REC.invalidate(O);
    REC.takeSpanSet(D, [{ subspace: 1, ordinal: 1, positions: byteLength(text) }]);
    REC.takeDelivery(D, [{ pos: 1, width: byteLength(text), kind: 'content', text, ref: null, origin: null }]);
    REC.takeImage(D, 1, [{ iStart: D + '.0.1.1', width: byteLength(text) }]);
    HOST.attach(/** @type {any} */ ({
      ...listens(null), className: '', innerHTML: '', style: {}, setAttribute() {}, removeAttribute() {},
      querySelector: () => null, querySelectorAll: () => [], contains: () => false, getBoundingClientRect: () => ({ width: 0, height: 0 }),
    }));
    INPUT.attach(/** @type {any} */ ({ plane: { ...listens(plane), classList: { add() {}, remove() {} } }, layer: listens(null), corners: listens(null) }));
    CAM.setViewport(1440, 900);
    const leap = GO.leapTo(O, { how: 'leap', carry: carried });
    for (let i = 0; i < 300 && !GO.landing(); i++) { await new Promise((r) => setTimeout(r, 0)); if (CAM.flying()) CAM.step(Infinity); }
    await leap;
    assert.deepEqual([GO.arrivalMark()?.runs, GO.landing()?.current], [[{ pos: 12, width: 7 }, { pos: 30, width: 8 }], 0], 'landed at piece 1, both runs outlined');
    // zoomed out below the draft's reading scale, the canvas having outlined its second run here as its last frame drew it
    CAM.set({ ...LAYER.centreOf(O, 30), scale: 3 / LAYER.foldOf(REC.doc(O)).fs });
    assert.equal(LAYER.atReadingScale(O), false, 'below its reading scale');
    RENDER.stats.arrival = [{ x: 700, y: 448, w: 40, h: 4, run: 1 }];
    const entries = TRAIL.all().length, at = { clientX: 715, clientY: 450 };
    plane.get('pointerdown')?.({ ...at, ctrlKey: false, metaKey: false, pointerId: 1 });
    plane.get('pointerup')?.({ ...at });
    assert.deepEqual([GO.landing()?.current, GO.landing()?.pos, TRAIL.all().length], [1, 30, entries], 'a step to the run pressed: the landing there, no trail entry');
    const v = CAM.destination(), want = GO.viewFor(O, 30);
    assert.ok(Math.abs(v.x - want.x) < 1e-6 && Math.abs(v.y - want.y) < 1e-6 && Math.abs(v.scale - want.scale) < 1e-9, 'the camera bound for its reading view');
    assert.equal(GO.arrivalMark()?.addr, O, 'the arrival standing');
    assert.deepEqual(fake.unanswered, []);
  } finally {
    RENDER.stats.arrival = [];
    GO.endArrival();
    if (CAM.flying()) CAM.step(Infinity);
    globalThis.document = platform.document; globalThis.window = platform.window; globalThis.HTMLElement = platform.HTMLElement;
  }
});

test('a click on a link\'s symbol, or on a stretch it marks, opens the card of the end clicked: of a link whose two ends stand in one article, each its own', async () => {
  const platform = { document: globalThis.document, window: globalThis.window, HTMLElement: globalThis.HTMLElement };
  /** @type {Map<string, (e: unknown) => void>} the text layer's listeners, by event */
  const layer = new Map();
  const listens = (/** @type {Map<string, (e: unknown) => void> | null} */ into) => ({ addEventListener: (/** @type {string} */ type, /** @type {(e: unknown) => void} */ fn) => { if (into) into.set(type, fn); } });
  globalThis.HTMLElement = /** @type {any} */ (class {});
  globalThis.document = /** @type {any} */ ({ ...listens(null), activeElement: null, body: null });
  globalThis.window = /** @type {any} */ ({ ...listens(null), getSelection: () => null });
  try {
    // a citation homed in D from D's own "Tumbler", at 1, to O's "quoted", at O's 16 — a run of O that D's second paragraph ends
    // in, standing at D's 27: both its ends stand in D's article
    const D = '1.0.1.0.21', O = '1.0.1.0.22', L = D + '.0.2.1', CITE = '1.1.0.1.0.1.0.3.13';
    const text = 'Tumbler.\n\nThe window says quoted';
    const span = (/** @type {string} */ doc, /** @type {number} */ ord, /** @type {number} */ w) => ({ start: `${doc}.0.1.${ord}`, width: '0.0.0.0.0.0.0.' + w, doc, account: '1.0.1', whole: false, subspace: 1, ordinal: ord, positions: w });
    const fake = FAKE.create({
      // where each end's far end stands now — the to end in O at 16, the from end in D at 1 — and the to end's words in O
      [FAKE.keyOf('op', { frame: F.project(L, 2, O) })]: { result: { as_of: 1, resp: 'span_set', set: [{ start: '1.16', width: '0.6' }] } },
      [FAKE.keyOf('op', { frame: F.project(L, 1, D) })]: { result: { as_of: 1, resp: 'span_set', set: [{ start: '1.1', width: '0.7' }] } },
      [FAKE.keyOf('op', { frame: F.retrieveV(O, 16, 6) })]: { result: { as_of: 1, resp: 'delivery', items: [{ content: 'quoted' }] } },
      // its lineage: no claims either way
      [FAKE.keyOf('op', { frame: F.inClaims(L, 'audit') })]: { result: { as_of: 1, resp: 'claims', claims: [] } },
      [FAKE.keyOf('op', { frame: F.outClaims(L, 'audit') })]: { result: { as_of: 1, resp: 'claims', claims: [] } },
    });
    PORT.boot(fake);
    REC.takeSpanSet(D, [{ subspace: 1, ordinal: 1, positions: byteLength(text) }]);
    REC.takeDelivery(D, [{ pos: 1, width: byteLength(text), kind: 'content', text, ref: null, origin: null }]);
    REC.takeImage(D, 1, [{ iStart: D + '.0.1.1', width: 26 }, { iStart: O + '.0.1.16', width: 6 }]);
    REC.takeLinks(D, [L]);
    REC.takeLink({ addr: L, from: [span(D, 1, 7)], to: [span(O, 16, 6)], type: CITE, age: { at: null, time: null, from: null } });
    LK.reveal(D, 2);
    const d = REC.doc(D);
    assert.deepEqual(LK.shown(D).map((s) => [s.link.addr, s.end, s.pos, s.width]), [[L, 'from', 1, 7], [L, 'to', 27, 6]], 'both its ends drawn in D');
    HOST.attach(/** @type {any} */ ({
      ...listens(null), className: '', innerHTML: '', style: {}, setAttribute() {}, removeAttribute() {},
      querySelector: () => null, querySelectorAll: () => [], contains: () => false, getBoundingClientRect: () => ({ width: 0, height: 0 }),
    }));
    INPUT.attach(/** @type {any} */ ({ plane: listens(null), layer: listens(layer), corners: listens(null) }));
    const click = layer.get('click');
    assert.ok(click, 'the text layer takes a click');
    // the citation's symbols and the stretches it marks as the plane's article holds them, each in the text's order: its from end's, then its to end's
    const article = articleHTML(d, LAYER.viewFor(d), REC.ownerAccount(d));
    /** @type {Array<[string, string[]]>} */
    const marks = [['.sym', article.match(/<span class="sym [^"]*" data-link="[^"]*"[^>]*>/g) || []], ['.lip', article.match(/<span class="seg lip[^"]*"[^>]*>/g) || []]];
    const holder = { dataset: { addr: D } };
    /** each end: its own bytes in D, and the card's two ends as it reads them — far first: which end, its document, its words */
    const ends = [
      { bytes: { addr: D, pos: 1, width: 7 }, lines: [['far', t('F.card.to'), O, 'quoted'], ['near', t('F.card.from'), D, 'Tumbler']] },
      { bytes: { addr: D, pos: 27, width: 6 }, lines: [['far', t('F.card.from'), D, 'Tumbler'], ['near', t('F.card.to'), D, 'quoted']] },
    ];
    for (const [cls, tags] of marks) {
      assert.equal(tags.length, ends.length, `${cls}: one for each end`);
      for (const [i, tag] of tags.entries()) {
        const el = Object.assign(new globalThis.HTMLElement(), { dataset: datasetOf(tag), isConnected: false });
        Object.assign(el, { closest: (/** @type {string} */ sel) => (sel === cls ? el : sel === 'article' ? holder : null) });
        click({ target: el, clientX: 0, clientY: 0, stopPropagation() {} });
        for (let n = 0; n < 200 && !HOST.currentOverlay(); n++) await new Promise((r) => setTimeout(r, 0));
        const card = HOST.currentOverlay(), { bytes, lines } = ends[i];
        assert.equal(card && card.id, 'anatomy:' + L, `${cls} at ${bytes.pos}: the citation's anatomy card`);
        assert.deepEqual(card && card.anchor, { el, span: bytes }, `${cls} at ${bytes.pos}: the card stands at the mark clicked, its own end's bytes beside it`);
        const read = [...(card ? card.html : '').matchAll(/<div class="end (far|near)"><span class="k">([^<]*)<\/span> <span class="code id">([^<]*)<\/span>.*?<div class="quoted">((?:[^<]|<\/?span[^>]*>)*)<\/div>/g)].map((m) => [m[1], m[2], m[3], m[4].replace(/<[^>]*>/g, '')]);
        assert.deepEqual(read, lines.map(([at, k, addr, words]) => [at, esc(k), addr, words]), `${cls} at ${bytes.pos}: the near end the one clicked, the far end the other`);
        HOST.dismiss();
      }
    }
    assert.deepEqual(fake.unanswered, []);
  } finally {
    globalThis.document = platform.document; globalThis.window = platform.window; globalThis.HTMLElement = platform.HTMLElement;
  }
});

/** an act run to its end: the flights it starts stepped to their last frames, until `done` holds */
async function settled(/** @type {() => boolean} */ done) {
  for (let i = 0; i < 200 && !(done() && !CAM.flying()); i++) { await new Promise((r) => setTimeout(r, 0)); if (CAM.flying()) CAM.step(Infinity); }
  assert.ok(done() && !CAM.flying(), 'the act ran to its end');
}

test('a click on the one symbol a withheld run\'s ends merge into opens its one end\'s card, or lists its several there — a target of its own, never the run\'s C-39 face (issue #202: "The symbol opens the link\'s card. … The run\'s own act stays a separate target")', async () => {
  const platform = { document: globalThis.document, window: globalThis.window, HTMLElement: globalThis.HTMLElement };
  /** @type {Map<string, (e: unknown) => void>} the text layer's listeners, by event */
  const layer = new Map();
  const listens = (/** @type {Map<string, (e: unknown) => void> | null} */ into) => ({ addEventListener: (/** @type {string} */ type, /** @type {(e: unknown) => void} */ fn) => { if (into) into.set(type, fn); } });
  globalThis.HTMLElement = /** @type {any} */ (class {});
  globalThis.document = /** @type {any} */ ({ ...listens(null), activeElement: null, body: null });
  globalThis.window = /** @type {any} */ ({ ...listens(null), getSelection: () => null });
  try {
    // a document of the reader's: its first paragraph, then eight of another account's draft's bytes withheld, two of the reader's citations on them
    const D = '1.0.1.0.24', O = '1.0.2.0.19', FAR = '1.0.1.0.132', CITE = '1.1.0.1.0.1.0.3.13', text = 'Tumbler.\n\n', n = byteLength(text);
    const [A, B] = [D + '.0.2.1', D + '.0.2.2'];
    const fake = FAKE.create(Object.fromEntries([A, B].flatMap((l) => [
      [FAKE.keyOf('op', { frame: F.inClaims(l, 'audit') }), { result: { as_of: 1, resp: 'claims', claims: [] } }],
      [FAKE.keyOf('op', { frame: F.outClaims(l, 'audit') }), { result: { as_of: 1, resp: 'claims', claims: [] } }],
    ])));
    PORT.boot(fake);
    REC.takeSpanSet(D, [{ subspace: 1, ordinal: 1, positions: n + 8 }]);
    REC.takeDelivery(D, [{ pos: 1, width: n, kind: 'content', text, ref: null, origin: null }, { pos: n + 1, width: 8, kind: 'withheld', text: '', ref: null, origin: O }]);
    REC.takeImage(D, 1, [{ iStart: D + '.0.1.1', width: n }, { iStart: O + '.0.1.1', width: 8 }]);
    REC.takeLinks(D, [A, B]);
    for (const [l, at] of /** @type {Array<[string, number]>} */ ([[A, 2], [B, 6]])) REC.takeLink({ addr: l, from: [resolveSpan({ start: `${O}.0.1.${at}`, width: '0.0.0.0.0.0.0.2' })], to: [resolveSpan(unitSpan(FAR))], type: CITE, age: { at: null, time: null, from: null } });
    HOST.attach(/** @type {any} */ ({
      ...listens(null), className: '', innerHTML: '', style: {}, setAttribute() {}, removeAttribute() {},
      querySelector: () => null, querySelectorAll: () => [], contains: () => false, getBoundingClientRect: () => ({ width: 0, height: 0 }),
    }));
    INPUT.attach(/** @type {any} */ ({ plane: listens(null), layer: listens(layer), corners: listens(null) }));
    const click = /** @type {(e: unknown) => void} */ (layer.get('click'));
    const d = REC.doc(D), article = articleHTML(d, LAYER.viewFor(d), REC.ownerAccount(d));
    const tag = /** @type {string} */ ((article.match(/<span class="sym at-run [^"]*"[^>]*>/) || [])[0]);
    assert.ok(tag, `the run's one symbol in the plane's article: ${article}`);
    const holder = { dataset: { addr: D } };
    const run = { dataset: { withheld: '1', owner: '1.0.2', pos: String(n + 1), width: '8' }, closest: (/** @type {string} */ sel) => (sel === 'article' ? holder : null) };
    /** a click on a symbol carrying these attributes, inside the run's gap */
    const press = async (/** @type {Record<string, string>} */ dataset) => {
      const el = Object.assign(new globalThis.HTMLElement(), { dataset, isConnected: false, getBoundingClientRect: () => ({ left: 0, top: 0, right: 0, bottom: 0, width: 0, height: 0 }) });
      Object.assign(el, { closest: (/** @type {string} */ sel) => (sel === '.sym' ? el : sel === '[data-withheld]' ? run : sel === 'article' ? holder : null) });
      click({ target: el, clientX: 0, clientY: 0, stopPropagation() {} });
      for (let i = 0; i < 200 && !HOST.currentOverlay(); i++) await new Promise((r) => setTimeout(r, 0));
      return { el, shown: HOST.currentOverlay() };
    };
    const both = await press(datasetOf(tag));
    assert.deepEqual([both.shown?.id, both.shown?.kind], [`ends:${D}:${n + 1}`, 'list'], 'both ends: listed at the symbol, never C-39\'s face');
    HOST.dismiss();
    const keyA = /** @type {import('../links/links.js').Shown} */ (LK.shown(D).find((s) => s.link.addr === A)).key;
    const one = await press({ links: A, ends: keyA });
    assert.deepEqual([one.shown?.id, one.shown?.anchor], ['anatomy:' + A, { el: one.el, span: { addr: D, pos: n + 1, width: 8 } }], 'one end: its card, at the symbol and the run');
    HOST.dismiss();
    assert.deepEqual(fake.unanswered, []);
  } finally {
    globalThis.document = platform.document; globalThis.window = platform.window; globalThis.HTMLElement = platform.HTMLElement;
  }
});

test('a click on C-67\'s pointer in a withheld origin\'s statement LEAPs to the edition its claim names, landed in whole and made at the run — a trail entry Back returns from, no passage carried, no link lit, no face — and a click on the rest of the gap conjures C-39\'s face', async () => {
  const platform = { document: globalThis.document, window: globalThis.window, HTMLElement: globalThis.HTMLElement };
  /** @type {Map<string, (e: unknown) => void>} the text layer's listeners, by event */
  const layer = new Map();
  /** @type {Map<string, (e: unknown) => void>} the corner layer's listeners, by event */
  const corners = new Map();
  const listens = (/** @type {Map<string, (e: unknown) => void> | null} */ into) => ({ addEventListener: (/** @type {string} */ type, /** @type {(e: unknown) => void} */ fn) => { if (into) into.set(type, fn); } });
  globalThis.HTMLElement = /** @type {any} */ (class {});
  globalThis.document = /** @type {any} */ ({ ...listens(null), activeElement: null, body: null });
  globalThis.window = /** @type {any} */ ({ ...listens(null), getSelection: () => null });
  try {
    // a guest at 1.0.2's document, which windows a run of 1.0.1's draft O, twelve lines deep, and 1.0.1 published an edition, H,
    // whose claim on O passes: its FROM H's own bytes, which no span of O holds
    const D = '1.0.2.0.6', O = '1.0.1.0.1004', H = '1.0.1.0.40', CLAIM = H + '.0.2.1', R20 = '1.1.0.1.0.1.0.3.14', RUN = 12 * 66;
    const text = 'Tumbler.\n\n', n = byteLength(text), edition = 'The published edition.', m = byteLength(edition);
    const fake = FAKE.create({
      // H read whole on the LEAP: its extent, its text, its image, its links — the claim among them, read already
      [FAKE.keyOf('op', { frame: F.retrieveDocVSpanSet(H) })]: { result: { as_of: 1, resp: 'span_set', set: [{ start: '1.1', width: '0.' + m }] } },
      [FAKE.keyOf('op', { frame: F.retrieveV(H, 1, m) })]: { result: { as_of: 1, resp: 'delivery', items: [{ content: edition }] } },
      [FAKE.keyOf('op', { frame: F.image(H, 1, m) })]: { result: { as_of: 1, resp: 'runs', runs: [{ i_start: H + '.0.1.1', width: String(m) }] } },
      [FAKE.keyOf('op', { frame: F.findLinksV(H, 1, m) })]: { result: { as_of: 1, resp: 'addrs', addrs: [CLAIM] } },
      // D's image, its own bytes then O's run, which the LEAP to D's run asks of its text held whole
      [FAKE.keyOf('op', { frame: F.image(D, 1, n + RUN) })]: { result: { as_of: 1, resp: 'runs', runs: [{ i_start: D + '.0.1.1', width: String(n) }, { i_start: O + '.0.1.1', width: String(RUN) }] } },
    });
    PORT.boot(fake);
    REC.setSession(null);
    REC.takeSpanSet(D, [{ subspace: 1, ordinal: 1, positions: n + RUN }]);
    REC.takeDelivery(D, [{ pos: 1, width: n, kind: 'content', text, ref: null, origin: null }, { pos: n + 1, width: RUN, kind: 'withheld', text: '', ref: null, origin: O }]);
    REC.takeMetadata(D, { doc: D, published: true, owner: '1.0.2', birth: D + '.1', birthExtent: n + RUN, placed: null, baseExtent: null, source: null, asOf: 1 });
    REC.takeLinks(D, []);
    REC.takeEditionClaims(O, [CLAIM]);
    REC.takeLink({ addr: CLAIM, from: [resolveSpan({ start: H + '.0.1.1', width: '0.0.0.0.0.0.0.' + m })], to: [resolveSpan(unitSpan(O))], type: R20 });
    REC.takeMetadata(H, { doc: H, published: true, owner: '1.0.1', birth: H + '.1', birthExtent: m, placed: null, baseExtent: null, source: null, asOf: 1 });
    const d = REC.doc(D);
    HOST.attach(/** @type {any} */ ({
      ...listens(null), className: '', innerHTML: '', style: {}, setAttribute() {}, removeAttribute() {},
      querySelector: () => null, querySelectorAll: () => [], contains: () => false, getBoundingClientRect: () => ({ width: 0, height: 0 }),
    }));
    INPUT.attach(/** @type {any} */ ({ plane: listens(null), layer: listens(layer), corners: listens(corners) }));
    const click = layer.get('click'), cornerClick = corners.get('click');
    assert.ok(click && cornerClick, 'the text layer and the corner layer take a click');
    // the gap as the plane's article holds it, and the origin's statement as T-LAYER places it, its pointer as a click finds it
    const article = articleHTML(d, LAYER.viewFor(d), REC.ownerAccount(d)), holder = { dataset: { addr: D } };
    const run = Object.assign(new globalThis.HTMLElement(), { dataset: datasetOf((/<span class="withheld"[^>]*>/.exec(article) || [''])[0]) });
    Object.assign(run, { closest: (/** @type {string} */ sel) => (sel === '[data-withheld]' ? run : sel === 'article' ? holder : null) });
    const statement = edgeStatementHTML(placeholderOf(d.blocks[1], REC.reader(), LAYER.originOwner, LAYER.clauseOf), null, false);
    const sign = { dataset: { addr: D, pos: String(n + 1), width: String(RUN), origin: O, sign: 'statement' } };
    const ptr = Object.assign(new globalThis.HTMLElement(), { dataset: datasetOf((/<span class="clause"[^>]*>/.exec(statement) || [''])[0]) });
    Object.assign(ptr, { closest: (/** @type {string} */ sel) => (sel === '.edge-sign' ? sign : sel === '.clause[data-home]' ? ptr : null) });
    const head = Object.assign(new globalThis.HTMLElement(), { closest: (/** @type {string} */ sel) => run.closest(sel) });
    assert.deepEqual([ptr.dataset.claim, ptr.dataset.home], [CLAIM, H], 'the pointer carries the claim it follows and that claim\'s home');
    assert.ok(!article.includes('class="clause"'), 'no clause in the gap: the pointer the statement\'s alone');
    // the reader stands at the run, a LEAP's landing
    CAM.setViewport(1440, 900);
    TRAIL._reset();
    const departing = GO.leapTo(D, { pos: n + 1 });
    await settled(() => WALK.current()?.pos === n + 1);
    await departing;
    const from = fake.asked.length;
    cornerClick({ target: ptr, stopPropagation() {} });
    await settled(() => WALK.current()?.addr === H);
    const e = TRAIL.current();
    assert.deepEqual([e && [e.addr, e.pos, e.width], TRAIL.all()[TRAIL.cursorIndex() - 1]?.step], [[H, null, null], null], 'a trail entry at the edition, landed in whole, the run\'s entry recording no step: no link followed, no passage carried');
    assert.deepEqual([WALK.current()?.kind, WALK.current()?.addr], ['document', H], 'the walk on the edition');
    assert.deepEqual([HOST.currentState(), GO.arrivalMark(), GO.litLinks()], [null, null, []], 'no face, nothing marked and no link lit: the claim is a record no link draws');
    assert.ok(!fake.asked.slice(from).some((k) => k.includes('"compare"')), 'no passage carried: no compare asked of the edition');
    assert.deepEqual(fake.unanswered, []);
    await settled(() => true);
    const back = GO.back();
    await settled(() => TRAIL.current()?.addr === D && WALK.current()?.addr === D);
    await back;
    assert.deepEqual([WALK.current()?.kind, WALK.current()?.pos], ['block', n + 1], 'Back returns to the withheld run');
    click({ target: head, clientX: 0, clientY: 0, stopPropagation() {} });
    assert.equal(HOST.currentState()?.id, 'face:C-39', 'the rest of the gap conjures C-39\'s face');
    HOST.dismiss();
  } finally {
    globalThis.document = platform.document; globalThis.window = platform.window; globalThis.HTMLElement = platform.HTMLElement;
  }
});

test('a click on the read a corner offers makes the version move to that version, landing in place — its trail entry taken at the act, the box showing the version, the camera where it stood — and opens no list (issue #240; D5 K-57)', async () => {
  const platform = { document: globalThis.document, window: globalThis.window, HTMLElement: globalThis.HTMLElement };
  /** @type {Map<string, (e: unknown) => void>} the corners' listeners, by event */
  const corners = new Map();
  const listens = (/** @type {Map<string, (e: unknown) => void> | null} */ into) => ({ addEventListener: (/** @type {string} */ type, /** @type {(e: unknown) => void} */ fn) => { if (into) into.set(type, fn); } });
  globalThis.HTMLElement = /** @type {any} */ (class {});
  globalThis.document = /** @type {any} */ ({ ...listens(null), activeElement: null, body: null });
  globalThis.window = /** @type {any} */ ({ ...listens(null), getSelection: () => null });
  // E, an edition whose box a newer version's arrival pinned on its first member: each member read whole as a version move reads it
  const E = '1.0.1.0.62', E1 = E + '.1', E2 = E + '.2', text = 'An edition.\n\nIts second paragraph.', n = byteLength(text);
  const reads = (/** @type {string} */ doc) => ({
    [FAKE.keyOf('op', { frame: F.retrieveDocVSpanSet(doc) })]: { result: { as_of: 1, resp: 'span_set', set: [{ start: '1.1', width: '0.' + n }] } },
    [FAKE.keyOf('op', { frame: F.docMetadata(doc) })]: { result: { as_of: 1, resp: 'doc_metadata', doc, published: true, owner: '1.0.1', birth: E1, birth_extent: String(n), placed: null, base_extent: null, source: null } },
    [FAKE.keyOf('op', { frame: F.retrieveV(doc, 1, n) })]: { result: { as_of: 1, resp: 'delivery', items: [{ content: text }] } },
    [FAKE.keyOf('op', { frame: F.image(doc, 1, n) })]: { result: { as_of: 1, resp: 'runs', runs: [{ i_start: E + '.0.1.1', width: String(n) }] } },
    [FAKE.keyOf('op', { frame: F.findLinksV(doc, 1, n) })]: { result: { as_of: 1, resp: 'addrs', addrs: [] } },
  });
  try {
    const fake = FAKE.create({ ...reads(E1), ...reads(E2) });
    PORT.boot(fake);
    REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
    HOST.attach(/** @type {any} */ ({
      ...listens(null), className: '', innerHTML: '', style: {}, setAttribute() {}, removeAttribute() {},
      querySelector: () => null, querySelectorAll: () => [], contains: () => false, getBoundingClientRect: () => ({ width: 0, height: 0 }),
    }));
    INPUT.attach(/** @type {any} */ ({ plane: listens(null), layer: listens(null), corners: listens(corners) }));
    const onCorner = corners.get('click');
    assert.ok(onCorner, 'the corners take a click');
    CAM.setViewport(1440, 900);
    TRAIL._reset();
    const departing = GO.leapTo(E1, { pos: 1 });
    await settled(() => GO.shownIn(E) === E1 && !GO.inAir());
    await departing;
    // E1's corner as T-LAYER stands it, the read it offers in it
    const holder = { dataset: { corner: E1 }, querySelector: (/** @type {string} */ s) => (s === '[data-read]' ? offer : null) };
    const offer = { dataset: { read: '2' }, closest: (/** @type {string} */ s) => (s === '[data-corner]' ? holder : s === '[data-read]' ? offer : null) };
    const at = CAM.view(), n0 = TRAIL.length();
    let stopped = false;
    onCorner({ target: offer, stopPropagation() { stopped = true; } });
    assert.deepEqual([stopped, TRAIL.length(), TRAIL.current()?.addr], [true, n0 + 1, E2], 'taken: the move\'s trail entry pushed at the act, at version 2');
    await settled(() => GO.shownIn(E) === E2 && !GO.inAir());
    const v = CAM.view();
    assert.ok(v.x === at.x && v.y === at.y && v.scale === at.scale, 'landed in place: the camera where it stood');
    assert.equal(HOST.currentState(), null, 'no list opened');
    assert.deepEqual(fake.unanswered, []);
  } finally {
    TRAIL._reset();
    globalThis.document = platform.document; globalThis.window = platform.window; globalThis.HTMLElement = platform.HTMLElement;
  }
});

test('a press at the readable em on a document whose text does not stand yet is held for it, never dropped and never a move to the place: after the frame that sets the text, the click selects the block under it', () => {
  const platform = { document: globalThis.document, window: globalThis.window, HTMLElement: globalThis.HTMLElement };
  /** @type {Map<string, (e: unknown) => void>} the plane's listeners, and the window's, by event */
  const plane = new Map(), win = new Map();
  const listens = (/** @type {Map<string, (e: unknown) => void> | null} */ into) => ({ addEventListener: (/** @type {string} */ type, /** @type {(e: unknown) => void} */ fn) => { if (into) into.set(type, fn); } });
  /** @type {unknown} what the platform answers stands under the press: the plane until the frame sets the text there */
  let under = { id: 'plane', closest: () => null };
  /** @type {Set<unknown>} the articles the text layer holds */
  const held = new Set();
  const element = () => {
    const e = { className: '', innerHTML: '', dataset: {}, style: {}, children: /** @type {unknown[]} */ ([]), classList: { toggle() {} }, setAttribute() {},
      appendChild(/** @type {unknown} */ c) { e.children.push(c); }, querySelectorAll: () => [], getBoundingClientRect: () => ({ top: 0, left: 0, width: 0, height: 0 }), remove() { held.delete(e); } };
    return e;
  };
  globalThis.HTMLElement = /** @type {any} */ (class {});
  globalThis.document = /** @type {any} */ ({ ...listens(null), activeElement: null, body: null, createElement: element, elementFromPoint: () => under });
  globalThis.window = /** @type {any} */ ({ ...listens(win), getSelection: () => null });
  try {
    // the first edition indexed, its text arrived: two paragraphs
    const D = '1.0.1.0.3', text = 'Tumbler addresses everything.\n\nThe second paragraph is read here.', n = byteLength(text);
    REC.takeIndex(/** @type {any} */ ({ docs: [{ doc: D, kind: 'edition', label: 'd', standing: 'public' }], counts: [{ account: '1.0.1', documents: 1 }], state: { arm: 'complete' } }));
    REC.takeSpanSet(D, [{ subspace: 1, ordinal: 1, positions: n }]);
    REC.takeDelivery(D, [{ pos: 1, width: n, kind: 'content', text, ref: null, origin: null }]);
    const d = REC.doc(D), second = d.blocks[1];
    HOST.attach(/** @type {any} */ ({
      ...listens(null), className: '', innerHTML: '', style: {}, setAttribute() {}, removeAttribute() {},
      querySelector: () => null, querySelectorAll: () => [], contains: () => false, getBoundingClientRect: () => ({ width: 0, height: 0 }),
    }));
    INPUT.attach(/** @type {any} */ ({ plane: { ...listens(plane), classList: { add() {}, remove() {} } }, layer: listens(null), corners: listens(null) }));
    LAYER.attach(/** @type {any} */ ({ clientWidth: 1440, clientHeight: 900, appendChild: (/** @type {unknown} */ e) => { held.add(e); } }), null);
    TRAIL._reset();
    // the camera at em 9 over the second paragraph's line, its text not yet standing: no frame has run since
    CAM.setViewport(1440, 900);
    const f = LAYER.foldOf(d), at = LAYER.centreOf(D, second.pos);
    CAM.set({ x: at.x, y: at.y, scale: 9 / f.fs });
    const press = { clientX: 720, clientY: 450, ctrlKey: false, metaKey: false, pointerId: 1 };
    assert.equal(RENDER.docAtScreen(press.clientX, press.clientY), D, 'the press falls on the first edition, at em 9');
    plane.get('pointerdown')?.(press);
    plane.get('pointerup')?.(press);
    win.get('pointerup')?.(press);
    const entries = TRAIL.all().length;
    INPUT.afterFrame();
    assert.equal(SEL.selected(), null, 'held: no text stands under it yet, and nothing is selected');
    // the frame sets the text: the paragraph stands under the press, and the click is the text's
    LAYER.frame();
    assert.ok(LAYER.isMounted(D), 'the frame stands the first edition\'s text');
    const article = { dataset: { addr: D } }, sp = { dataset: { addr: D, pos: String(second.pos) } };
    under = { id: '', closest: (/** @type {string} */ sel) => (sel === '#domlayer article.dtext' || sel === 'article' ? article : sel === '.sp' ? sp : null) };
    INPUT.afterFrame();
    assert.deepEqual(SEL.selected(), { addr: D, pos: second.pos, width: second.width }, 'the click selects the block under it whole');
    assert.deepEqual([TRAIL.all().length, CAM.flying()], [entries, false], 'no trail entry and no flight: never a move to the place');
    INPUT.afterFrame();
    HOST.dismiss();
    SEL.clear();
  } finally {
    LAYER.clear();
    globalThis.document = platform.document; globalThis.window = platform.window; globalThis.HTMLElement = platform.HTMLElement;
  }
});

test('a press or a click on a box the plane draws that the index does not list falls on it as on a listed one: at the readable em the press is held for its text and selects the block under it once the frame sets it; below its reading scale the click goes to it, its trail entry taken and the camera leaving (issue #233)', async () => {
  const platform = { document: globalThis.document, window: globalThis.window, HTMLElement: globalThis.HTMLElement };
  /** @type {Map<string, (e: unknown) => void>} the plane's listeners, and the window's, by event */
  const plane = new Map(), win = new Map();
  const listens = (/** @type {Map<string, (e: unknown) => void> | null} */ into) => ({ addEventListener: (/** @type {string} */ type, /** @type {(e: unknown) => void} */ fn) => { if (into) into.set(type, fn); } });
  /** @type {unknown} what the platform answers stands under the press: the plane until the frame sets the text there */
  let under = { id: 'plane', closest: () => null };
  /** @type {Set<unknown>} the articles the text layer holds */
  const held = new Set();
  const element = () => {
    const e = { className: '', innerHTML: '', dataset: {}, style: {}, children: /** @type {unknown[]} */ ([]), classList: { toggle() {} }, setAttribute() {},
      appendChild(/** @type {unknown} */ c) { e.children.push(c); }, querySelectorAll: () => [], getBoundingClientRect: () => ({ top: 0, left: 0, width: 0, height: 0 }), remove() { held.delete(e); } };
    return e;
  };
  globalThis.HTMLElement = /** @type {any} */ (class {});
  globalThis.document = /** @type {any} */ ({ ...listens(null), activeElement: null, body: null, createElement: element, elementFromPoint: () => under });
  globalThis.window = /** @type {any} */ ({ ...listens(win), getSelection: () => null });
  try {
    // the index listing nothing; a document of the reader's account whose text, metadata and links the page holds, so a LEAP to it reads nothing
    const D = '1.0.1.0.5', text = 'A document the index does not list.\n\nIts second paragraph is read here.', n = byteLength(text);
    REC.takeIndex(/** @type {any} */ ({ docs: [], counts: [], state: { arm: 'complete' } }));
    REC.takeSpanSet(D, [{ subspace: 1, ordinal: 1, positions: n }]);
    REC.takeDelivery(D, [{ pos: 1, width: n, kind: 'content', text, ref: null, origin: null }]);
    REC.takeMetadata(D, { doc: D, published: true, owner: '1.0.1', birth: D + '.1', birthExtent: n, placed: null, baseExtent: null, source: null, asOf: 1 });
    REC.takeLinks(D, []);
    assert.ok(!REC.place(D) && REC.known().includes(D), 'a box the plane draws, the index listing it not');
    const d = REC.doc(D), second = d.blocks[1];
    HOST.attach(/** @type {any} */ ({
      ...listens(null), className: '', innerHTML: '', style: {}, setAttribute() {}, removeAttribute() {},
      querySelector: () => null, querySelectorAll: () => [], contains: () => false, getBoundingClientRect: () => ({ width: 0, height: 0 }),
    }));
    INPUT.attach(/** @type {any} */ ({ plane: { ...listens(plane), classList: { add() {}, remove() {} } }, layer: listens(null), corners: listens(null) }));
    LAYER.attach(/** @type {any} */ ({ clientWidth: 1440, clientHeight: 900, appendChild: (/** @type {unknown} */ e) => { held.add(e); } }), null);
    TRAIL._reset();
    // the camera at em 9 over the second paragraph's line, its text not yet standing: no frame has run since
    CAM.setViewport(1440, 900);
    const f = LAYER.foldOf(d), at = LAYER.centreOf(D, second.pos);
    CAM.set({ x: at.x, y: at.y, scale: 9 / f.fs });
    const press = { clientX: 720, clientY: 450, ctrlKey: false, metaKey: false, pointerId: 1 };
    assert.equal(RENDER.docAtScreen(press.clientX, press.clientY), D, 'the press falls on the document, at em 9');
    plane.get('pointerdown')?.(press);
    plane.get('pointerup')?.(press);
    win.get('pointerup')?.(press);
    INPUT.afterFrame();
    assert.equal(SEL.selected(), null, 'held: no text stands under it yet, and nothing is selected');
    LAYER.frame();
    assert.ok(LAYER.isMounted(D), 'the frame stands its text');
    const article = { dataset: { addr: D } }, sp = { dataset: { addr: D, pos: String(second.pos) } };
    under = { id: '', closest: (/** @type {string} */ sel) => (sel === '#domlayer article.dtext' || sel === 'article' ? article : sel === '.sp' ? sp : null) };
    INPUT.afterFrame();
    assert.deepEqual([SEL.selected(), TRAIL.all().length], [{ addr: D, pos: second.pos, width: second.width }, 0], 'the click selects the block under it whole, and moves to no place');
    SEL.clear();
    // em 3 over the same line, below its reading scale: a click is on the place
    under = { id: 'plane', closest: () => null };
    CAM.set({ x: at.x, y: at.y, scale: 3 / f.fs });
    assert.deepEqual([lodOf(CAM.cam.scale).name, LAYER.atReadingScale(D), RENDER.docAtScreen(press.clientX, press.clientY)], ['mid', false, D], 'at mid, below its reading scale, the click falls on the document');
    plane.get('pointerdown')?.(press);
    plane.get('pointerup')?.(press);
    assert.deepEqual([TRAIL.current()?.addr, CAM.flying()], [D, true], 'the document: its entry taken and the camera leaving');
    await settled(() => WALK.current()?.addr === D);
  } finally {
    HOST.dismiss();
    SEL.clear();
    LAYER.clear();
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

test('a press on a withheld run\'s placeholder starts no selection — its click is its act\'s alone — and a press anywhere else on the text layer starts one', () => {
  const platform = { document: globalThis.document, window: globalThis.window };
  /** @type {Map<string, (e: unknown) => void>} the text layer's listeners, by event */
  const layer = new Map();
  const listens = (/** @type {Map<string, (e: unknown) => void> | null} */ into) => ({ addEventListener: (/** @type {string} */ type, /** @type {(e: unknown) => void} */ fn) => { if (into) into.set(type, fn); } });
  globalThis.document = /** @type {any} */ ({ ...listens(null), activeElement: null, body: null });
  globalThis.window = /** @type {any} */ ({ ...listens(null), getSelection: () => null });
  try {
    INPUT.attach(/** @type {any} */ ({ plane: listens(null), layer: listens(layer), corners: listens(null) }));
    const start = layer.get('selectstart');
    assert.ok(start, 'the text layer hears a selection start');
    /** an element of the layer, inside a placeholder or not */
    const element = (/** @type {boolean} */ inside) => { const e = { nodeType: 1, closest: (/** @type {string} */ s) => (inside && s === '[data-withheld]' ? e : null) }; return e; };
    const placeholder = element(true), word = element(false);
    /** whether a selection starting at a node — a Text node, as the platform names one, or an element — is refused */
    const refused = (/** @type {unknown} */ target) => { let no = false; start({ target, preventDefault() { no = true; } }); return no; };
    assert.deepEqual([refused({ nodeType: 3, parentElement: placeholder }), refused(placeholder), refused({ nodeType: 3, parentElement: word }), refused(word)], [true, true, false, false],
      'the placeholder\'s words and the placeholder refuse a selection\'s start; the text beside it does not');
  } finally {
    globalThis.document = platform.document; globalThis.window = platform.window;
  }
});

test('a wheel series under way as a jump\'s camera left is dropped whole — the flight runs on to its destination, nothing moving — and a wheel event SERIES_MS or more after the series, a pinch, or the camera key\'s drag takes the camera over: the jump lands where the camera is (FP-25; issue #137)', async () => {
  const platform = { document: globalThis.document, window: globalThis.window, HTMLElement: globalThis.HTMLElement };
  /** @type {Map<string, (e: unknown) => void>} the window's listeners, by event */
  const win = new Map();
  /** @type {Map<string, (e: unknown) => void>} the plane's */
  const plane = new Map();
  const listens = (/** @type {Map<string, (e: unknown) => void> | null} */ into) => ({ addEventListener: (/** @type {string} */ type, /** @type {(e: unknown) => void} */ fn) => { if (into) into.set(type, fn); } });
  globalThis.HTMLElement = /** @type {any} */ (class {});
  globalThis.document = /** @type {any} */ ({ ...listens(null), activeElement: null, body: null });
  globalThis.window = /** @type {any} */ ({ ...listens(win), getSelection: () => null, setTimeout: () => 0 });
  /** two views the same */
  const same = (/** @type {{x: number, y: number, scale: number}} */ a, /** @type {{x: number, y: number, scale: number}} */ b) => a.x === b.x && a.y === b.y && a.scale === b.scale;
  try {
    // a document whose text the page holds: a LEAP to it reads nothing and flies at once
    const D = '1.0.1.0.61', text = 'A document the page holds.';
    REC.takeSpanSet(D, [{ subspace: 1, ordinal: 1, positions: byteLength(text) }]);
    REC.takeDelivery(D, [{ pos: 1, width: byteLength(text), kind: 'content', text, ref: null, origin: null }]);
    CAM.setViewport(1440, 900);
    INPUT.attach(/** @type {any} */ ({ plane: { ...listens(plane), setPointerCapture() {}, classList: { add() {}, remove() {} } }, layer: listens(null), corners: listens(null) }));
    const wheel = /** @type {(e: unknown) => void} */ (win.get('wheel'));
    /** a wheel event at a time, by the event's clock; a pinch as a trackpad sends it where `ctrlKey` */
    const roll = (/** @type {number} */ time, ctrlKey = false) => wheel({ target: { closest: () => null }, preventDefault() {}, ctrlKey, metaKey: false, deltaX: 0, deltaY: 40, clientX: 700, clientY: 450, timeStamp: time });
    // whole milliseconds, so every time below is exact: from a fractional clock (t0 + 100 + SERIES_MS) − (t0 + 100) can round below SERIES_MS
    const t0 = Math.floor(performance.now()) - 1;
    roll(t0);
    const leap = GO.leapTo(D);
    const bound = CAM.destination(), at = CAM.view();
    roll(t0 + 100);
    assert.deepEqual([GO.inAir(), CAM.flying(), same(CAM.destination(), bound), same(CAM.view(), at)], [true, true, true, true], 'the series under way as the camera left goes on, dropped: the flight runs on to its destination, the camera never moved');
    roll(t0 + 100 + INPUT.SERIES_MS);
    assert.deepEqual([GO.inAir(), CAM.flying()], [false, false], 'a new series takes the camera over: the jump landed where the camera is, its flight ended');
    assert.equal(await leap, null, 'the LEAP lands in no document');
    /** @type {Array<[string, () => void]>} each other gesture that takes the camera over */
    const gestures = [
      ['a pinch', () => roll(t0 + 2000, true)],
      ['the camera key\'s drag', () => {
        const down = /** @type {(e: unknown) => void} */ (plane.get('pointerdown')), move = /** @type {(e: unknown) => void} */ (plane.get('pointermove'));
        down({ clientX: 10, clientY: 10, pointerId: 1, metaKey: KEYS.MAC, ctrlKey: !KEYS.MAC });
        move({ clientX: 40, clientY: 30 });
      }],
    ];
    for (const [what, gesture] of gestures) {
      const jump = GO.leapTo(D);
      assert.equal(GO.inAir(), true, `${what}: the jump in the air`);
      gesture();
      assert.deepEqual([GO.inAir(), CAM.flying()], [false, false], `${what} takes the camera over`);
      assert.equal(await jump, null);
    }
  } finally {
    globalThis.document = platform.document; globalThis.window = platform.window; globalThis.HTMLElement = platform.HTMLElement;
  }
});

test('a wheel over the overlay or the notice below it is theirs: its default stands, so it scrolls what of them scrolls, and the camera stays; over the plane the wheel is the camera\'s', () => {
  const platform = { document: globalThis.document, window: globalThis.window, HTMLElement: globalThis.HTMLElement };
  /** @type {Map<string, (e: unknown) => void>} the window's listeners, by event */
  const win = new Map();
  const listens = (/** @type {Map<string, (e: unknown) => void> | null} */ into) => ({ addEventListener: (/** @type {string} */ type, /** @type {(e: unknown) => void} */ fn) => { if (into) into.set(type, fn); } });
  globalThis.HTMLElement = /** @type {any} */ (class {});
  globalThis.document = /** @type {any} */ ({ ...listens(null), activeElement: null, body: null });
  globalThis.window = /** @type {any} */ ({ ...listens(win), getSelection: () => null, setTimeout: () => 0 });
  try {
    CAM.setViewport(1440, 900);
    CAM.set({ x: 0, y: 0, scale: 1 });
    INPUT.attach(/** @type {any} */ ({ plane: { ...listens(null), setPointerCapture() {}, classList: { add() {}, remove() {} } }, layer: listens(null), corners: listens(null) }));
    const wheel = /** @type {(e: unknown) => void} */ (win.get('wheel'));
    /** a wheel over an element inside the region `id` names — the one `closest` finds for any selector list naming it: whether its default was prevented, and whether the camera moved */
    const over = (/** @type {string} */ id) => {
      const was = CAM.view();
      let prevented = false;
      wheel({ target: { closest: (/** @type {string} */ sel) => (sel.split(',').map((s) => s.trim()).includes(id) ? { id } : null) }, preventDefault() { prevented = true; }, ctrlKey: false, metaKey: false, deltaX: 0, deltaY: 40, clientX: 700, clientY: 450, timeStamp: performance.now() });
      const now = CAM.view();
      return { prevented, moved: now.x !== was.x || now.y !== was.y || now.scale !== was.scale };
    };
    for (const id of ['#overlay', '#notice']) assert.deepEqual(over(id), { prevented: false, moved: false }, `over ${id}: its default stands, the camera stays`);
    assert.equal(over('#plane').prevented, true, 'over the plane: the wheel is the camera\'s, its default prevented');
  } finally {
    globalThis.document = platform.document; globalThis.window = platform.window; globalThis.HTMLElement = platform.HTMLElement;
  }
});

test('a click on a byline\'s cut label opens it whole and a click again closes it, selecting nothing — the label\'s act alone (FP-34; issue #208: "A label too long for the box is cut and shown whole on its act")', () => {
  const platform = { document: globalThis.document, window: globalThis.window, HTMLElement: globalThis.HTMLElement };
  /** @type {Map<string, (e: unknown) => void>} the text layer's listeners, by event */
  const layer = new Map();
  const listens = (/** @type {Map<string, (e: unknown) => void> | null} */ into) => ({ addEventListener: (/** @type {string} */ type, /** @type {(e: unknown) => void} */ fn) => { if (into) into.set(type, fn); } });
  globalThis.HTMLElement = /** @type {any} */ (class {});
  globalThis.document = /** @type {any} */ ({ ...listens(null), activeElement: null, body: null });
  globalThis.window = /** @type {any} */ ({ ...listens(null), getSelection: () => null });
  try {
    // another account's document, its owner's genesis entry labelled longer than the label's box
    const D = '1.0.2.0.6', OWNER = '1.0.2', text = 'Tumbler.\n\n';
    REC.setSession(null);
    REC.takeSpanSet(D, [{ subspace: 1, ordinal: 1, positions: byteLength(text) }]);
    REC.takeDelivery(D, [{ pos: 1, width: byteLength(text), kind: 'content', text, ref: null, origin: null }]);
    REC.takeAccountKey(OWNER, { label: 'Shane’s MacBook Pro (work, 2024)', fingerprint: 'ab'.repeat(32) });
    const d = REC.doc(D);
    // the label as the plane's article holds it, in the article T-LAYER mounts from its view
    const tag = (/<span class="slot cut"[^>]*>/.exec(articleHTML(d, LAYER.viewFor(d), REC.ownerAccount(d))) || [''])[0];
    assert.ok(tag.includes('data-cut="1"'), `the label cut in its box: ${tag}`);
    const article = { dataset: { addr: D } };
    const label = Object.assign(new globalThis.HTMLElement(), { dataset: datasetOf(tag) });
    Object.assign(label, { closest: (/** @type {string} */ sel) => (sel === '.slot[data-cut]' ? label : sel === 'article' ? article : null) });
    INPUT.attach(/** @type {any} */ ({ plane: listens(null), layer: listens(layer), corners: listens(null) }));
    const click = /** @type {(e: unknown) => void} */ (layer.get('click'));
    let stopped = 0;
    const act = () => click({ target: label, clientX: 0, clientY: 0, stopPropagation() { stopped++; } });
    act();
    assert.deepEqual([LAYER.labelOpened(D), SEL.selected(), stopped], [true, null, 1], 'a click opens it whole, selecting nothing, the click its own');
    act();
    assert.deepEqual([LAYER.labelOpened(D), SEL.selected()], [false, null], 'a click again closes it');
  } finally {
    globalThis.document = platform.document; globalThis.window = platform.window; globalThis.HTMLElement = platform.HTMLElement;
  }
});

test('where no board is held a click on the plane at far scale names no account the grid finds under it: it is an empty click — no teleport, no trail entry, no face — where, the board held, the same click goes to that account\'s region (issue #215\'s design decision: "never draw or name a board the client has no record of"; FP-35)', async () => {
  const platform = { document: globalThis.document, window: globalThis.window, HTMLElement: globalThis.HTMLElement };
  /** @type {Map<string, (e: unknown) => void>} the plane's listeners, by event */
  const plane = new Map();
  const listens = (/** @type {Map<string, (e: unknown) => void> | null} */ into) => ({ addEventListener: (/** @type {string} */ type, /** @type {(e: unknown) => void} */ fn) => { if (into) into.set(type, fn); } });
  globalThis.HTMLElement = /** @type {any} */ (class {});
  globalThis.document = /** @type {any} */ ({ ...listens(null), activeElement: null, body: null });
  globalThis.window = /** @type {any} */ ({ ...listens(null), getSelection: () => null });
  const was = REC.board();
  try {
    HOST.attach(/** @type {any} */ ({
      ...listens(null), className: '', innerHTML: '', style: {}, setAttribute() {}, removeAttribute() {},
      querySelector: () => null, querySelectorAll: () => [], contains: () => false, getBoundingClientRect: () => ({ width: 0, height: 0 }),
    }));
    INPUT.attach(/** @type {any} */ ({ plane: { ...listens(plane), classList: { add() {}, remove() {} } }, layer: listens(null), corners: listens(null) }));
    // the camera at far scale over the middle of 1.0.2's cell, which the grid holds whatever the index lists
    CAM.setViewport(1440, 900);
    const c = accountCell('1.0.2');
    CAM.set({ x: c.x + c.w / 2, y: c.y + c.h / 2, scale: CAM.viewForCell(boardCell('1'), 0.92).scale / 2 });
    assert.ok(['far', 'far~mid'].includes(lodOf(CAM.cam.scale).name), 'at far scale');
    TRAIL._reset();
    const at = { clientX: 720, clientY: 450 };
    const click = () => { plane.get('pointerdown')?.({ ...at, ctrlKey: false, metaKey: false, pointerId: 1 }); plane.get('pointerup')?.({ ...at }); };
    REC.takeBoards({ result: [] });
    click();
    assert.deepEqual([TRAIL.all().length, HOST.currentState(), CAM.flying()], [0, null, false], 'no board held: an empty click — no entry, no face, no flight');
    REC.setBoard({ board: 'b-1', name: '', origin: '' });
    click();
    assert.deepEqual([TRAIL.current()?.addr, CAM.flying()], ['1.0.2', true], 'the board held: the account\'s region, its entry pushed and the camera leaving');
    CAM.step(Infinity);
  } finally {
    HOST.dismiss();
    REC.setBoard(was);
    globalThis.document = platform.document; globalThis.window = platform.window; globalThis.HTMLElement = platform.HTMLElement;
  }
});

test('a click on the plane at far scale goes to the account whose cell holds it in a continuation too — over 1.0.9\'s cell to 1.0.9, over 1.0.1.4\'s to 1.0.1.4 — its entry pushed and the camera leaving (issue #232)', () => {
  const platform = { document: globalThis.document, window: globalThis.window, HTMLElement: globalThis.HTMLElement };
  /** @type {Map<string, (e: unknown) => void>} the plane's listeners, by event */
  const plane = new Map();
  const listens = (/** @type {Map<string, (e: unknown) => void> | null} */ into) => ({ addEventListener: (/** @type {string} */ type, /** @type {(e: unknown) => void} */ fn) => { if (into) into.set(type, fn); } });
  globalThis.HTMLElement = /** @type {any} */ (class {});
  globalThis.document = /** @type {any} */ ({ ...listens(null), activeElement: null, body: null });
  globalThis.window = /** @type {any} */ ({ ...listens(null), getSelection: () => null });
  try {
    REC._reset(); WRITE._reset(); REC.setBoard({ board: 'b-1', name: '', origin: '' });
    HOST.attach(/** @type {any} */ ({
      ...listens(null), className: '', innerHTML: '', style: {}, setAttribute() {}, removeAttribute() {},
      querySelector: () => null, querySelectorAll: () => [], contains: () => false, getBoundingClientRect: () => ({ width: 0, height: 0 }),
    }));
    INPUT.attach(/** @type {any} */ ({ plane: { ...listens(plane), classList: { add() {}, remove() {} } }, layer: listens(null), corners: listens(null) }));
    CAM.setViewport(1440, 900);
    const scale = CAM.viewForCell(boardCell('1'), 0.92).scale / 2, at = { clientX: 720, clientY: 450 };
    const click = () => { plane.get('pointerdown')?.({ ...at, ctrlKey: false, metaKey: false, pointerId: 1 }); plane.get('pointerup')?.({ ...at }); };
    TRAIL._reset();
    for (const acct of ['1.0.9', '1.0.1.4']) {
      // the camera at far scale over the middle of the account's cell, the click at the view's centre
      const c = accountCell(acct);
      CAM.set({ x: c.x + c.w / 2, y: c.y + c.h / 2, scale });
      assert.ok(['far', 'far~mid'].includes(lodOf(CAM.cam.scale).name), 'at far scale');
      click();
      assert.deepEqual([TRAIL.current()?.addr, CAM.flying()], [acct, true], `over ${acct}'s cell: its region, its entry pushed and the camera leaving`);
      CAM.step(Infinity);
    }
  } finally {
    HOST.dismiss();
    REC._reset(); WRITE._reset(); REC.setBoard({ board: 'b-1', name: '', origin: '' });
    globalThis.document = platform.document; globalThis.window = platform.window; globalThis.HTMLElement = platform.HTMLElement;
  }
});

test('a click on a continuation\'s mark acts by the target it falls on: its newest label goes to that member, its trail entry taken and the camera leaving; the rest of the mark opens its members\' list at the mark — no entry, no flight, the walk on the mark\'s stop — and the pointer\'s shape over each is its own (issue #42\'s design decision)', async () => {
  const platform = { document: globalThis.document, window: globalThis.window, HTMLElement: globalThis.HTMLElement };
  /** @type {Map<string, (e: unknown) => void>} the plane's listeners, by event */
  const plane = new Map();
  /** @type {Set<string>} the plane's classes */
  const classes = new Set();
  const listens = (/** @type {Map<string, (e: unknown) => void> | null} */ into) => ({ addEventListener: (/** @type {string} */ type, /** @type {(e: unknown) => void} */ fn) => { if (into) into.set(type, fn); } });
  globalThis.HTMLElement = /** @type {any} */ (class {});
  globalThis.document = /** @type {any} */ ({ ...listens(null), activeElement: null, body: null });
  globalThis.window = /** @type {any} */ ({ ...listens(null), getSelection: () => null });
  try {
    // an account of sixty documents and nothing else: at HOME its first continuation, the twelve from the 49th, is one mark; its newest's text held, so a LEAP to it reads nothing
    REC._reset(); WRITE._reset(); REC.setBoard({ board: 'b-1', name: '', origin: '' });
    REC.takeIndex(/** @type {any} */ ({ docs: Array.from({ length: 60 }, (_, i) => ({ doc: `1.0.1.0.${i + 1}`, kind: 'edition', label: `Notes on ${i + 1}`, standing: 'public' })), counts: [{ account: '1.0.1', documents: 60 }], state: { arm: 'complete' } }));
    const NEWEST = '1.0.1.0.60', text = 'Notes on 60';
    REC.takeSpanSet(NEWEST, [{ subspace: 1, ordinal: 1, positions: byteLength(text) }]);
    REC.takeDelivery(NEWEST, [{ pos: 1, width: byteLength(text), kind: 'content', text, ref: null, origin: null }]);
    HOST.attach(/** @type {any} */ ({
      ...listens(null), className: '', innerHTML: '', style: {}, setAttribute() {}, removeAttribute() {},
      querySelector: () => null, querySelectorAll: () => [], contains: () => false, getBoundingClientRect: () => ({ width: 0, height: 0 }),
    }));
    INPUT.attach(/** @type {any} */ ({ plane: { ...listens(plane), classList: { add: (/** @type {string} */ c) => classes.add(c), remove: (/** @type {string} */ c) => classes.delete(c) } }, layer: listens(null), corners: listens(null) }));
    const { ctx } = recorder();
    RENDER.attach(/** @type {any} */ ({ getContext: () => ctx }));
    CAM.setViewport(1440, 900);
    const home = CAM.viewForCell(accountCell('1.0.1'), 0.85);
    /** the mark as the frame at HOME draws it, and a point on each of its targets */
    const frame = () => {
      CAM.set(home); RENDER.draw();
      const m = /** @type {import('../plane/render.js').ResidueMark} */ (RENDER.stats.residueMarks.find((x) => x.key === '1.0.1:1'));
      const band = /** @type {{x: number, y: number, w: number, h: number}} */ (m.newestTarget);
      return { label: { clientX: band.x + band.w / 2, clientY: band.y + band.h / 2 }, rest: { clientX: m.rect.x + m.rect.w / 2, clientY: m.rect.y + 4 } };
    };
    const click = (/** @type {{clientX: number, clientY: number}} */ at) => { plane.get('pointerdown')?.({ ...at, ctrlKey: false, metaKey: false, pointerId: 1 }); plane.get('pointerup')?.({ ...at }); };
    const at = frame();
    plane.get('pointermove')?.(at.label);
    assert.deepEqual([...classes], ['to-doc'], 'over the newest label: the shape that goes to a document');
    plane.get('pointermove')?.(at.rest);
    assert.deepEqual([...classes], ['to-list'], 'over the rest of the mark: the shape that opens a list');
    plane.get('pointermove')?.({ clientX: 5, clientY: 5 });
    assert.deepEqual([...classes], [], 'off the mark: neither');
    TRAIL._reset();
    click(at.rest);
    for (let i = 0; i < 200 && !HOST.currentState(); i++) await new Promise((r) => setTimeout(r, 0));
    assert.deepEqual([HOST.currentState()?.id, HOST.currentState()?.kind, TRAIL.all().length, CAM.flying()], ['mark:1.0.1:1', 'list', 0, false], 'the rest: the mark\'s list, no entry, no flight');
    assert.deepEqual([WALK.current()?.kind, WALK.current()?.addr], ['mark', '1.0.1:1'], 'the walk on the mark\'s stop, the list\'s opener');
    HOST.dismiss();
    click(frame().label);
    assert.deepEqual([TRAIL.current()?.addr, CAM.flying(), HOST.currentState()], [NEWEST, true, null], 'the newest label: the newest member, its entry pushed and the camera leaving');
    CAM.step(Infinity);
  } finally {
    HOST.dismiss();
    RENDER.stats.residueMarks = [];
    REC._reset(); WRITE._reset(); REC.setBoard({ board: 'b-1', name: '', origin: '' });
    globalThis.document = platform.document; globalThis.window = platform.window; globalThis.HTMLElement = platform.HTMLElement;
  }
});

/**
 * @typedef {Object} Drafts — what `onDrafts` hands its body
 * @property {string} D a draft of the session's account, at its reading scale
 * @property {string} O another account's draft, holding the same text
 * @property {(addr: string, pos: number) => void} clickAt a click on a block's part with the platform's selection collapsed at its start, as a click leaves it
 * @property {(e: unknown) => void} onCorner the corners' click listener
 * @property {(target: unknown, at: {x: number, y: number}) => void} press a press and its click on the text layer at a world point, on the element `target` stands in for, the platform's selection standing nowhere
 * @property {(target: unknown, at: {x: number, y: number}) => void} cornerAt a click on the corner layer at a world point, on the element `target` stands in for
 * @property {(at: {x: number, y: number}) => void} planeAt a press and its release on the plane, unmoved, at a world point
 */

/**
 * A page of stand-ins for a click in a draft's text: D a draft of the session's account and O another's, each holding
 * the same text, the camera at D's reading scale, the plane's, the text layer's, the corners' and the window's listeners
 * attached; the body clicks a block's part with the platform's selection collapsed at its start, as a click leaves it
 * (`clickAt`), or presses and clicks on stand-ins of the page's elements at a world point (`press`, `cornerAt`,
 * `planeAt`), and every caret, selection and card is let go after it.
 * @param {(p: Drafts) => void | Promise<void>} body
 */
async function onDrafts(body) {
  const platform = { document: globalThis.document, window: globalThis.window, HTMLElement: globalThis.HTMLElement, Node: globalThis.Node };
  /** @type {Map<string, (e: unknown) => void>} the plane's, the text layer's, the corners' and the window's listeners, by event */
  const plane = new Map(), layer = new Map(), corners = new Map(), win = new Map();
  const listens = (/** @type {Map<string, (e: unknown) => void> | null} */ into) => ({ addEventListener: (/** @type {string} */ type, /** @type {(e: unknown) => void} */ fn) => { if (into) into.set(type, fn); } });
  globalThis.HTMLElement = /** @type {any} */ (class {});
  globalThis.Node = /** @type {any} */ ({ ELEMENT_NODE: 1 });
  /** @type {unknown} the platform's selection as the click left it */
  let selection = null;
  globalThis.document = /** @type {any} */ ({ ...listens(null), activeElement: null, body: null, createElement: () => ({ className: '', innerHTML: '', dataset: {} }) });
  globalThis.window = /** @type {any} */ ({ ...listens(win), getSelection: () => selection });
  const D = '1.0.1.0.2', O = '1.0.2.0.1', text = 'First line.\n\nSecond line here.\n', n = byteLength(text);
  try {
    REC._reset(); WRITE._reset(); REC.setBoard({ board: 'b-1', name: '', origin: '' }); REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
    REC.takeIndex(/** @type {any} */ ({ docs: [{ doc: D, kind: 'draft', label: null, standing: 'yours_to_read' }, { doc: O, kind: 'draft', label: null, standing: 'yours_to_read' }], counts: [{ account: '1.0.1', documents: 1 }, { account: '1.0.2', documents: 1 }], state: { arm: 'complete' } }));
    for (const a of [D, O]) {
      REC.takeSpanSet(a, [{ subspace: 1, ordinal: 1, positions: n }]);
      REC.takeDelivery(a, [{ pos: 1, width: n, kind: 'content', text, ref: null, origin: null }]);
      REC.takeImage(a, 1, [{ iStart: a + '.0.1.1', width: n }]);
    }
    CAM.setViewport(1440, 900);
    const f = LAYER.foldOf(REC.doc(D)), box = docBox(D), c = f.columns[0];
    CAM.set({ x: box.x + c.x + c.w / 2, y: box.y + c.y + c.h / 2, scale: 12 / f.fs });
    assert.deepEqual([LAYER.editable(D), LAYER.editable(O)], [true, false], 'the session\'s own draft at reading scale; another\'s is not');
    /** a block part of a document's article as the layer's mapping reads it — the article a pane's, made from the record, which the mapping reads through what it was made from; the click's point the part's own start */
    const partOf = (/** @type {string} */ addr, /** @type {number} */ pos) => {
      const art = LAYER.sceneArticle(REC.doc(addr));
      const sp = Object.assign(new globalThis.HTMLElement(), { nodeType: 1, dataset: { addr, pos: String(pos) }, contains: () => false });
      Object.assign(sp, { closest: (/** @type {string} */ sel) => (sel === '.sp' || sel === '.run > .sp' ? sp : sel === 'article.dtext' || sel === 'article' ? art : null) });
      return sp;
    };
    /** the platform's selection collapsed at a part's start, as a click leaves it */
    const collapsedAt = (/** @type {unknown} */ sp) => ({ rangeCount: 1, isCollapsed: true, anchorNode: sp, anchorOffset: 0, getRangeAt: () => ({ collapsed: true, startContainer: sp, endContainer: sp, commonAncestorContainer: sp }), removeAllRanges() {} });
    HOST.attach(/** @type {any} */ ({
      ...listens(null), className: '', innerHTML: '', style: {}, setAttribute() {}, removeAttribute() {},
      querySelector: () => null, querySelectorAll: () => [], contains: () => false, getBoundingClientRect: () => ({ width: 0, height: 0 }),
    }));
    INPUT.attach(/** @type {any} */ ({ plane: { ...listens(plane), setPointerCapture() {}, classList: { add() {}, remove() {} } }, layer: listens(layer), corners: listens(corners) }));
    // the text layer's element, which the page's selection is read against as it is cleared
    LAYER.attach(/** @type {any} */ ({ clientWidth: 1440, clientHeight: 900, appendChild() {}, contains: () => false }), null);
    const click = layer.get('click'), onCorner = corners.get('click');
    assert.ok(click && onCorner, 'the text layer and the corners take a click');
    /** a world point on screen */
    const screen = (/** @type {{x: number, y: number}} */ at) => ({ clientX: CAM.sx(at.x), clientY: CAM.sy(at.y) });
    /** a press on the text layer, its release and its click at a screen point, as the platform delivers them */
    const pressAt = (/** @type {unknown} */ target, /** @type {{clientX: number, clientY: number}} */ p) => {
      layer.get('pointerdown')?.({ ...p, target, ctrlKey: false, metaKey: false, pointerId: 1 });
      win.get('pointerup')?.({ ...p, target });
      click({ ...p, target, stopPropagation() {} });
    };
    const clickAt = (/** @type {string} */ addr, /** @type {number} */ pos) => { const sp = partOf(addr, pos); selection = collapsedAt(sp); pressAt(sp, { clientX: 0, clientY: 0 }); };
    const press = (/** @type {unknown} */ target, /** @type {{x: number, y: number}} */ at) => { selection = null; pressAt(target, screen(at)); };
    const cornerAt = (/** @type {unknown} */ target, /** @type {{x: number, y: number}} */ at) => onCorner({ ...screen(at), target, stopPropagation() {} });
    const planeAt = (/** @type {{x: number, y: number}} */ at) => {
      const p = { ...screen(at), ctrlKey: false, metaKey: false, pointerId: 1 };
      plane.get('pointerdown')?.(p); plane.get('pointerup')?.(p); win.get('pointerup')?.(p);
    };
    await body({ D, O, clickAt, onCorner, press, cornerAt, planeAt });
  } finally {
    HOST.dismiss(); SEL.clear(); LAYER.clear();
    REC._reset(); WRITE._reset(); REC.setBoard({ board: 'b-1', name: '', origin: '' });
    globalThis.document = platform.document; globalThis.window = platform.window; globalThis.HTMLElement = platform.HTMLElement; globalThis.Node = platform.Node;
  }
}

/** a key as the platform delivers it, at the plane */
const keyOf = (/** @type {string} */ key, /** @type {{metaKey?: boolean, ctrlKey?: boolean, shiftKey?: boolean}} */ mods = {}) => /** @type {any} */ ({ type: 'keydown', key, keyCode: 0, isComposing: false, metaKey: false, ctrlKey: false, shiftKey: false, altKey: false, preventDefault() {}, ...mods });
/** the platform's command modifier (D5 §0) */
const MOD = KEYS.MAC ? { metaKey: true } : { ctrlKey: true };
/** the walk's move let land: its reads answered within the act's own task */
const tick = () => new Promise((r) => setTimeout(r, 0));

test('a click on a block of a draft the person may edit places the caret at the character clicked — where the platform collapsed its selection — the selection cleared and the block not selected; the same click on another\'s block selects it whole; a click on the corner\'s kept word opens the draft\'s statement, and again closes it (D5 K-70, K-57, K-74; FP-14)', () => onDrafts(({ D, O, clickAt, onCorner }) => {
  const second = REC.doc(D).blocks[1];
  SEL.select(D, 1);
  clickAt(D, second.pos);
  assert.deepEqual([LAYER.caret(), SEL.selected()], [{ addr: D, pos: second.pos, live: true }, null], 'the caret at the character clicked, live; the selection cleared, the block not selected');
  clickAt(O, second.pos);
  assert.deepEqual([SEL.selected()?.addr, SEL.selected()?.pos, LAYER.caret()?.addr], [O, second.pos, D], 'another\'s block: selected whole, no caret placed in it');
  // the corner's kept word
  WRITE.setKept(D, { word: 'kept', reason: null });
  const holder = { dataset: { corner: D } };
  const word = /** @type {any} */ ({ closest: (/** @type {string} */ sel) => (sel === '[data-corner]' ? holder : sel === '.kept-word[data-kept]' ? word : null) });
  onCorner({ target: word, stopPropagation() {} });
  assert.equal(LAYER.statementOpen(D), true, 'the kept word\'s click opens the statement');
  onCorner({ target: word, stopPropagation() {} });
  assert.equal(LAYER.statementOpen(D), false, 'and again closes it');
}));

test('a click placing the caret in a draft the person may edit stands the walk on the span it is placed in, the ring out, so a slot chord pressed there acts on that span: with the walk on the draft\'s first span, Mod+K at the caret a click placed in its second draws the acts card at the second whole, selecting nothing (B3-S13; D5 K-70, K-100)', () => onDrafts(async ({ D, clickAt }) => {
  const second = REC.doc(D).blocks[1];
  await WALK.focusTo(D, 1, true, true, null, true);
  assert.deepEqual([WALK.current()?.kind, WALK.current()?.pos, FOCUS.ringShown()], ['block', 1, true], 'the walk on the first span, a key\'s ring drawn');
  clickAt(D, second.pos);
  await tick();
  assert.deepEqual([LAYER.caret(), WALK.current()?.kind, WALK.current()?.addr, WALK.current()?.pos, WALK.landedAt(), FOCUS.ringShown()], [{ addr: D, pos: second.pos, live: true }, 'block', D, second.pos, second.pos, false],
    'the caret live where the click fell; the walk on its span, naming the span\'s own first position, the ring out');
  assert.equal(await KEYS.dispatch(keyOf('k', MOD), { where: 'plane', byKey: true }), true);
  assert.deepEqual([HOST.currentState()?.anchor, SEL.selected(), LAYER.caret()], [{ span: spanOfBlock(D, second) }, null, { addr: D, pos: second.pos, live: true }], 'Mod+K at the caret: the acts card at the caret\'s span whole, never the first, nothing selected; the caret where it stood');
}));

test('a click placing the caret in a draft the person may edit while the walk stands in another\'s document keeps the caret live for the next key, which types at it (D5 K-70, K-72; BM-1)', () => onDrafts(async ({ D, O, clickAt }) => {
  const second = REC.doc(D).blocks[1];
  await WALK.focusTo(O, 1, true, true, null, true);
  assert.deepEqual([WALK.current()?.addr, WALK.current()?.pos], [O, 1], 'the walk on the first span of another\'s document');
  clickAt(D, second.pos);
  await tick();
  assert.equal(await KEYS.dispatch(keyOf('q'), { where: 'plane', byKey: true }), true);
  assert.deepEqual([WRITE.edits(D).map((e) => [e.pos, e.width, e.text]), LAYER.caret(), WALK.current()?.addr], [[[second.pos, 0, 'q']], { addr: D, pos: second.pos + 1, live: true }, D],
    'the key typed at the caret the click placed, the caret live after it, the walk in its draft');
}));

test('a click on a block of text the person may not edit, a caret live in a draft of theirs, selects the block whole and stands the walk on its span, the ring out and the caret left kept where it stood, so the next printable key is answered by K-9\'s line there and types nothing (D5 K-70, M-2)', () => onDrafts(async ({ D, O, clickAt }) => {
  const second = REC.doc(D).blocks[1];
  clickAt(D, second.pos);
  await tick();
  assert.deepEqual([LAYER.caret(), WALK.current()?.addr, WALK.current()?.pos], [{ addr: D, pos: second.pos, live: true }, D, second.pos], 'the click in D: the caret live where it fell, the walk on its span');
  clickAt(O, second.pos);
  await tick();
  assert.deepEqual([SEL.selected()?.addr, SEL.selected()?.pos, WALK.current()?.kind, WALK.current()?.addr, WALK.current()?.pos, FOCUS.ringShown(), LAYER.caret()],
    [O, second.pos, 'block', O, second.pos, false, { addr: D, pos: second.pos, live: false }], 'the click on O\'s block: selected whole, the walk on its span with the ring out, the caret kept in D');
  assert.equal(await KEYS.dispatch(keyOf('q'), { where: 'plane', byKey: true }), true);
  assert.deepEqual([WRITE.edits(D), WRITE.edits(O), LAYER.caret()], [[], [], { addr: D, pos: second.pos, live: false }], 'q: nothing typed in either');
}));

/** every read a card or a face an act opened let answer, and what it opened taken down */
async function closeAll() {
  for (let i = 0; i < 20; i++) await tick();
  if (HOST.pending()) HOST.endOpening();
  HOST.dismiss(); SEL.clear();
}

/** the plane's last frame as a page of stand-ins holds it: no tail, outlined run or mark drawn */
function noneDrawn() { RENDER.stats.tails = []; RENDER.stats.arrival = []; RENDER.stats.residueMarks = []; }

/**
 * A point of a document's ground at its reading scale: inside its outline, left of its first column's text, level
 * with the line a position opens — on the plane, where the press is the canvas's (`textAt` none).
 * @param {string} addr
 * @param {number} pos
 */
function groundOf(addr, pos) {
  const f = LAYER.foldOf(REC.doc(addr)), box = docBox(addr), c = f.columns[0], r = outlineRects(f)[0], at = { x: box.x + (r.x + c.x) / 2, y: LAYER.centreOf(addr, pos).y };
  assert.ok(r.x < c.x && RENDER.docAtScreen(CAM.sx(at.x), CAM.sy(at.y)) === addr && !LAYER.holdsText(addr, at.x, at.y), `a point of ${addr}'s ground: on its outline, in none of its columns`);
  return at;
}

test('with the caret live in a draft the person may edit, a click on any of another document\'s things — a link\'s symbol, the ⟡, its byline\'s cut label, a withheld run\'s gap, a column\'s blank room, a sign in its column\'s edge, its corner, its held label, its ground on the plane — keeps the caret where it stood and stands the walk on what was acted on — the span the symbol, the gap or the sign marks, else the stop nearest the point — the ring out, so the next printable key types nothing (issue #496\'s design decision)', () => onDrafts(async ({ D, O, clickAt, press, cornerAt, planeAt }) => {
  PORT.boot(FAKE.create({}));
  noneDrawn();
  const second = REC.doc(O).blocks[1], L = D + '.0.2.1';
  const endOf = (/** @type {string} */ doc, /** @type {number} */ ord, /** @type {number} */ w) => ({ start: `${doc}.0.1.${ord}`, width: '0.0.0.0.0.0.0.' + w, doc, account: doc.split('.').slice(0, 3).join('.'), whole: false, subspace: 1, ordinal: ord, positions: w });
  // a link of the reader's own from D's first span to O's second, its far end drawn at O
  REC.takeLinks(O, [L]);
  REC.takeLink({ addr: L, from: [endOf(D, 1, 5)], to: [endOf(O, second.pos, 6)], type: '1.1.0.1.0.1.0.3.13', age: { at: null, time: null, from: null } });
  const end = /** @type {import('../links/links.js').Shown} */ (LK.shown(O).find((s) => s.link.addr === L));
  assert.deepEqual([end && end.near, end && end.pos], [O, second.pos], 'its end drawn at O\'s second span');
  /** a world point over O's first line, and one over its second */
  const first = LAYER.centreOf(O, 1), near = LAYER.centreOf(O, second.pos), art = { dataset: { addr: O } };
  /** a stand-in of an element of O's article: itself for the selectors it is, the article for `article` */
  const inO = (/** @type {string[]} */ is, /** @type {Record<string, string>} */ dataset = {}) => {
    const el = { dataset, isConnected: false, getBoundingClientRect: () => ({ left: 0, top: 0, right: 0, bottom: 0, width: 0, height: 0 }), closest: (/** @type {string} */ sel) => (is.includes(sel) ? el : sel === 'article' ? art : null) };
    return el;
  };
  /** a stand-in of an element of the corner layer: `found` for the selector it stands under */
  const inCorners = (/** @type {string} */ under, /** @type {unknown} */ found) => ({ closest: (/** @type {string} */ sel) => (sel === under ? found : null) });
  /** @type {Array<[string, () => void, number]>} each thing of O's: what it is, the click on it, and the position the walk then stands on — the span the thing marks, else the one nearest the point */
  const things = [
    ['a link\'s symbol, clicked at O\'s first line', () => press(inO(['.sym'], { link: L, end: end.key }), first), second.pos],
    ['the ⟡', () => press(inO(['.sym'], { reveal: O }), near), second.pos],
    ['the byline\'s cut label', () => press(inO(['.slot[data-cut]'], { cut: '1' }), near), second.pos],
    ['a withheld run\'s gap, clicked at O\'s first line', () => press(inO(['[data-withheld]'], { withheld: '1', owner: '1.0.2', pos: String(second.pos), width: '6' }), first), second.pos],
    ['a column\'s blank room', () => press(inO([]), near), second.pos],
    ['a sign in its column\'s edge, clicked at O\'s first line', () => cornerAt(inCorners('.edge-sign', { dataset: { addr: O, pos: String(second.pos), width: '6', origin: '1.0.3.0.1', sign: 'statement' } }), first), second.pos],
    ['its corner', () => cornerAt(inCorners('[data-corner]', { dataset: { corner: O } }), near), second.pos],
    ['its held label', () => cornerAt(inCorners('[data-held]', { dataset: { held: O } }), near), second.pos],
    ['its ground on the plane', () => planeAt(groundOf(O, second.pos)), second.pos],
  ];
  for (const [what, act, pos] of things) {
    clickAt(D, 1);
    await tick();
    assert.deepEqual([LAYER.caret(), WALK.current()?.addr, WALK.current()?.pos], [{ addr: D, pos: 1, live: true }, D, 1], `${what}: before it, the caret live in D, the walk on its span`);
    act();
    await tick();
    assert.deepEqual([LAYER.caret(), LAYER.caretOwes(), WALK.current()?.kind, WALK.current()?.addr, WALK.current()?.pos, FOCUS.ringShown()], [{ addr: D, pos: 1, live: false }, null, 'block', O, pos, false],
      `${what}: the caret kept where it stood, owing the frame nothing — neither its mark brought into view nor the platform's selection collapsed at it — the walk on O's span holding ${pos}, the ring out`);
    assert.equal(await KEYS.dispatch(keyOf('q'), { where: 'plane', byKey: true }), true);
    assert.deepEqual([WRITE.edits(D), WRITE.edits(O), LAYER.caret()], [[], [], { addr: D, pos: 1, live: false }], `${what}: q types nothing, the caret kept`);
    await closeAll();
  }
}));

test('with the caret live in a draft the person may edit and the walk elsewhere in it, a click on the draft\'s own things but its text and its corner — its byline\'s cut label, a column\'s blank room, a sign in its column\'s edge, its held label, its ground on the plane — leaves the caret live and stands the walk on its span, so the next printable key types at the caret; a click on its corner leaves the caret live and the walk where it stood (issue #496\'s design decision)', () => onDrafts(async ({ D, press, cornerAt, planeAt }) => {
  PORT.boot(FAKE.create({}));
  noneDrawn();
  const second = REC.doc(D).blocks[1], near = LAYER.centreOf(D, 1), art = { dataset: { addr: D } };
  /** a stand-in of an element of D's article: itself for the selectors it is, the article for `article` */
  const inD = (/** @type {string[]} */ is, /** @type {Record<string, string>} */ dataset = {}) => {
    const el = { dataset, isConnected: false, getBoundingClientRect: () => ({ left: 0, top: 0, right: 0, bottom: 0, width: 0, height: 0 }), closest: (/** @type {string} */ sel) => (is.includes(sel) ? el : sel === 'article' ? art : null) };
    return el;
  };
  const inCorners = (/** @type {string} */ under, /** @type {unknown} */ found) => ({ closest: (/** @type {string} */ sel) => (sel === under ? found : null) });
  /** @type {Array<[string, () => void, number]>} each thing of D's: what it is, the click on it — each at D's first line — and the position the walk then stands on */
  const things = [
    ['the byline\'s cut label', () => press(inD(['.slot[data-cut]'], { cut: '1' }), near), second.pos],
    ['a column\'s blank room', () => press(inD([]), near), second.pos],
    ['a sign in its column\'s edge', () => cornerAt(inCorners('.edge-sign', { dataset: { addr: D, pos: '1', width: '5', origin: '1.0.3.0.1', sign: 'statement' } }), near), second.pos],
    ['its held label', () => cornerAt(inCorners('[data-held]', { dataset: { held: D } }), near), second.pos],
    ['its ground on the plane', () => planeAt(groundOf(D, 1)), second.pos],
    ['its corner', () => cornerAt(inCorners('[data-corner]', { dataset: { corner: D } }), near), 1],
  ];
  for (const [what, act, pos] of things) {
    await WALK.focusTo(D, 1, false, true, null, true);
    LAYER.placeCaret(D, second.pos);
    assert.deepEqual([LAYER.caret(), WALK.current()?.pos], [{ addr: D, pos: second.pos, live: true }, 1], `${what}: before it, the caret live in D's second span, the walk on its first`);
    act();
    await tick();
    assert.deepEqual([LAYER.caret(), WALK.current()?.kind, WALK.current()?.addr, WALK.current()?.pos], [{ addr: D, pos: second.pos, live: true }, 'block', D, pos], `${what}: the caret live, the walk on the span holding ${pos}`);
    assert.equal(await KEYS.dispatch(keyOf('q'), { where: 'plane', byKey: true }), true);
    assert.deepEqual(WRITE.edits(D).map((e) => [e.pos, e.width, e.text]), [[second.pos, 0, 'q']], `${what}: q typed at the caret`);
    WRITE.clearEdits(D);
    await closeAll();
  }
}));

test('an empty click is the pointer\'s Esc, one step of its order a click: with a selection standing in a draft the person may edit and its caret live, the first takes the selection\'s card down and the selection with it, the second keeps the caret, its span holding the walk with the ring drawn, and the third ends no arrival (issue #496\'s design decision; FP-21)', () => onDrafts(async ({ D, clickAt, planeAt }) => {
  PORT.boot(FAKE.create({}));
  noneDrawn();
  // D's metadata and links held beside its text, so a find's move to it reads nothing
  REC.takeMetadata(D, { doc: D, published: false, owner: '1.0.1', birth: null, birthExtent: null, placed: null, baseExtent: null, source: null, asOf: 1 });
  REC.takeLinks(D, []);
  TRAIL._reset();
  try {
    const second = REC.doc(D).blocks[1];
    GO.toMatch(D, { pos: 1, width: 5 });
    await settled(() => !GO.inAir());
    assert.ok(GO.arrivalMark(), 'an arrival at D\'s first line, as a find\'s move stands one');
    clickAt(D, second.pos);
    await tick();
    SEL.select(D, 1, 3);
    assert.deepEqual([LAYER.caret(), SEL.selected(), HOST.currentState()?.id], [{ addr: D, pos: second.pos, live: true }, { addr: D, pos: 1, width: 3 }, 'selection'], 'the caret live in D\'s second span, a selection in its first, its card standing');
    // nothing under the point: the camera far from every box, at D's reading scale
    const view = CAM.view();
    CAM.set({ x: -1e9, y: -1e9, scale: view.scale });
    const nothing = { x: CAM.wx(720), y: CAM.wy(450) };
    assert.deepEqual([RENDER.docAtScreen(720, 450), lodOf(view.scale).name !== 'far', LAYER.editable(D)], [null, true, true], 'the click falls on nothing, nearer than far, D still text the person may edit');
    planeAt(nothing);
    assert.deepEqual([HOST.currentState(), SEL.selected(), LAYER.caret()], [null, null, { addr: D, pos: second.pos, live: true }], 'the first: the card down and the selection with it, the caret live');
    planeAt(nothing);
    await tick();
    assert.deepEqual([LAYER.caret(), LAYER.caretOwes(), WALK.current()?.kind, WALK.current()?.addr, WALK.current()?.pos, FOCUS.ringShown()], [{ addr: D, pos: second.pos, live: false }, 'collapse', 'block', D, second.pos, true],
      'the second: the caret kept as Esc keeps it, owing the frame its mark in view, its span holding the walk, the ring drawn');
    planeAt(nothing);
    await tick();
    assert.deepEqual([GO.arrivalMark()?.addr, LAYER.caret()?.live], [D, false], 'the third: the arrival standing, nothing else to close');
    CAM.set(view);
  } finally { GO.endArrival(); TRAIL._reset(); }
}));

test('a focus landing in a corner the view does not show whole moves the camera by the least pan that brings the whole corner into the view below the one line; one the view shows whole, or one landing while a flight runs, moves nothing (FP-20)', () => {
  const platform = { document: globalThis.document, window: globalThis.window };
  /** @type {Map<string, (e: unknown) => void>} the corners' listeners, by event */
  const corners = new Map();
  const listens = (/** @type {Map<string, (e: unknown) => void> | null} */ into) => ({ addEventListener: (/** @type {string} */ type, /** @type {(e: unknown) => void} */ fn) => { if (into) into.set(type, fn); } });
  globalThis.document = /** @type {any} */ ({ ...listens(null), activeElement: null, body: null });
  globalThis.window = /** @type {any} */ ({ ...listens(null), getSelection: () => null });
  try {
    INPUT.attach(/** @type {any} */ ({ plane: listens(null), layer: listens(null), corners: listens(corners) }));
    // the one line, its bottom edge 30 px down the viewport: the visible view stands below it
    LINE.attach(/** @type {any} */ ({ ...listens(null), setAttribute() {}, querySelectorAll: () => [], getBoundingClientRect: () => ({ bottom: 30 }) }), { open() {}, back() {}, forward() {}, trailList() {}, signIn() {} });
    const onFocus = corners.get('focusin');
    assert.ok(onFocus, 'the corners take a focus landing in them');
    CAM.setViewport(1440, 900);
    const start = { x: 5000, y: 5000, scale: 2 };
    // a corner's element as the platform lays it out on screen, and a control inside it the focus lands on
    let rect = { left: -60, top: 300, width: 77, height: 54 };
    const holder = { dataset: { corner: '1.0.1.0.3' }, getBoundingClientRect: () => ({ ...rect, right: rect.left + rect.width, bottom: rect.top + rect.height }) };
    const inside = { closest: (/** @type {string} */ s) => (s === '[data-corner]' ? holder : null) };
    /** the camera after a focus lands in the corner standing at `r`, from the start's view */
    const landed = (/** @type {typeof rect} */ r) => { CAM.set(start); rect = r; onFocus({ target: inside }); return CAM.view(); };
    assert.deepEqual(landed({ left: -60, top: 300, width: 77, height: 54 }), { ...start, x: start.x - 60 / start.scale }, 'its left edge 60 px past the view\'s: panned 60 px right, the corner\'s left edge at the view\'s');
    assert.deepEqual(landed({ left: 1400, top: 300, width: 77, height: 54 }), { ...start, x: start.x + 37 / start.scale }, 'its right edge 37 px past the view\'s: panned 37 px left');
    assert.deepEqual(landed({ left: 200, top: 10, width: 77, height: 54 }), { ...start, y: start.y - 20 / start.scale }, 'its top 20 px under the one line: panned 20 px down, its top at the line\'s bottom');
    assert.deepEqual(landed({ left: 200, top: 880, width: 77, height: 54 }), { ...start, y: start.y + 34 / start.scale }, 'its foot 34 px below the view\'s: panned 34 px up');
    assert.deepEqual(landed({ left: 200, top: 300, width: 77, height: 54 }), start, 'shown whole: nothing moves');
    CAM.set(start);
    rect = { left: -60, top: 300, width: 77, height: 54 };
    void CAM.fly({ x: 6000, y: 6000, scale: 2 }, 620, 0);
    onFocus({ target: inside });
    assert.deepEqual([CAM.flying(), CAM.view()], [true, start], 'a flight running: nothing moves, the flight runs on');
    CAM.set(start);
  } finally {
    CAM._reset();
    globalThis.document = platform.document; globalThis.window = platform.window;
  }
});

/**
 * @typedef {Object} Gestures — what `onGestures` hands its body
 * @property {string} D a draft of the session's account, its article mounted at its reading scale
 * @property {string} E another draft of the session's account, its article mounted after D's
 * @property {string} O another account's draft holding the same text, its article mounted after both
 * @property {(addr: string, pos: number) => {node: any, offset: number}} at the boundary point before a position of a mounted article's text — after its last character at the text's end — where the platform's selection names it
 * @property {(from: {addr: string, pos: number}, to: {addr: string, pos: number}) => void} drag a drag pressed at one point and released at another, the platform's selection carried from the first to the second
 * @property {(addr: string, pos: number) => void} click a click at a point, the platform's selection collapsed there as its press sets it
 * @property {(addr: string, pos: number, word: {pos: number, width: number}) => void} doubleClick a double-click at a point: its first press a click, its second the platform's word selected
 * @property {(addr: string, pos: number) => void} shiftClick a Shift+click at a point: the platform's selection extended from its anchor to it
 * @property {() => any} platform the platform's selection, as the page's DOM holds it
 * @property {ReturnType<typeof page>} dom the page's DOM
 * @property {Map<string, (e: unknown) => void>} plane the plane's listeners, by event
 */

/** the two lines each draft of `onGestures` holds */
const LINES = 'Tumbler words stand here.\n\nThe second line holds more words.\n';

/**
 * A page of the DOM under `web/test/` for a pointer's gestures in a draft's text: D and E drafts of the session's account
 * and O another's, each holding `LINES`, all mounted as T-LAYER mounts them, in that order — the layer as wide as their
 * boxes at D's reading scale — APP-INPUT's handlers attached to the layer, the window and the document; each gesture made as the platform
 * makes it, the test standing for the platform's selection (`at`, the gestures), and every caret, edit, selection and
 * card let go after it.
 * @param {(g: Gestures) => void | Promise<void>} body
 */
async function onGestures(body) {
  const dom = page({ width: 1440, height: 900 }), D = '1.0.1.0.2', E = '1.0.1.0.4', O = '1.0.2.0.1', n = byteLength(LINES);
  dom.install();
  const listens = (/** @type {Map<string, (e: unknown) => void> | null} */ into) => ({ addEventListener: (/** @type {string} */ type, /** @type {(e: unknown) => void} */ fn) => { if (into) into.set(type, fn); } });
  try {
    REC._reset(); WRITE._reset(); REC.setBoard({ board: 'b-1', name: '', origin: '' }); REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
    REC.takeIndex(/** @type {any} */ ({ docs: [D, E, O].map((doc) => ({ doc, kind: 'draft', label: null, standing: 'yours_to_read' })), counts: [{ account: '1.0.1', documents: 2 }, { account: '1.0.2', documents: 1 }], state: { arm: 'complete' } }));
    for (const a of [D, E, O]) {
      REC.takeSpanSet(a, [{ subspace: 1, ordinal: 1, positions: n }]);
      REC.takeDelivery(a, [{ pos: 1, width: n, kind: 'content', text: LINES, ref: null, origin: null }]);
      REC.takeImage(a, 1, [{ iStart: a + '.0.1.1', width: n }]);
    }
    // the camera amid the three boxes at D's reading scale, the layer as wide and as tall as they are: each article stands
    CAM.setViewport(1440, 900);
    const f = LAYER.foldOf(REC.doc(D)), boxes = [D, E, O].map(docBox), scale = 12 / f.fs;
    const x0 = Math.min(...boxes.map((q) => q.x)), y0 = Math.min(...boxes.map((q) => q.y)), x1 = Math.max(...boxes.map((q) => q.x + q.w)), y1 = Math.max(...boxes.map((q) => q.y + q.h));
    CAM.set({ x: (x0 + x1) / 2, y: (y0 + y1) / 2, scale });
    const layer = dom.element('div');
    layer.id = 'domlayer'; layer.clientWidth = (x1 - x0) * scale + 200; layer.clientHeight = (y1 - y0) * scale + 200;
    dom.document.body.appendChild(layer);
    LAYER.attach(/** @type {any} */ (layer), null);
    HOST.attach(/** @type {any} */ ({
      ...listens(null), className: '', innerHTML: '', style: {}, setAttribute() {}, removeAttribute() {},
      querySelector: () => null, querySelectorAll: () => [], contains: () => false, getBoundingClientRect: () => ({ width: 0, height: 0 }),
    }));
    /** @type {Map<string, (e: unknown) => void>} */
    const plane = new Map();
    INPUT.attach(/** @type {any} */ ({ plane: { ...listens(plane), setPointerCapture() {}, classList: { add() {}, remove() {} } }, layer, corners: listens(null) }));
    LAYER.frame();
    assert.deepEqual([[D, E, O].map(LAYER.isMounted), [D, E, O].map((x) => LAYER.editable(x))], [[true, true, true], [true, true, false]], 'the three articles stand: D and E text the person may edit, O not');
    assert.deepEqual([...LAYER.mountedSet().keys()], [D, E, O], 'mounted in that order: a range across two of them starts in the earlier');
    const sel = dom.document.selection;
    const at = (/** @type {string} */ addr, /** @type {number} */ pos) => {
      const r = LAYER.rangeOf({ addr, pos, width: 1 });
      if (r) return { node: r.startContainer, offset: r.startOffset };
      const e = /** @type {Range} */ (LAYER.rangeOf({ addr, pos: pos - 1, width: 1 }));
      return { node: e.endContainer, offset: e.endOffset };
    };
    // each point a gesture presses at stands at a screen x of its own, where the platform finds it again (`caretPositionFromPoint`)
    /** @type {Array<{node: any, offset: number}>} */
    const points = [];
    dom.document.pointAt = (x) => points[x / 10 - 1] || null;
    const screen = (/** @type {{node: any, offset: number}} */ p) => { points.push(p); return points.length * 10; };
    const under = (/** @type {{node: any}} */ p) => (p.node.nodeType === 3 ? p.node.parentElement : p.node);
    const event = (/** @type {any} */ target, /** @type {number} */ x, /** @type {object} */ more = {}) => ({ target, clientX: x, clientY: 0, metaKey: false, ctrlKey: false, shiftKey: false, pointerId: 1, detail: 1, preventDefault() {}, stopPropagation() {}, ...more });
    /** a press and its release at one screen point, then its click, the platform's part made between the press and the release */
    const press = (/** @type {{node: any, offset: number}} */ p, /** @type {() => void} */ platform, /** @type {object} */ more = {}) => {
      const x = screen(p), target = under(p);
      layer.fire('pointerdown', event(target, x, more));
      platform();
      dom.fire('window', 'pointerup', event(target, x, more));
      layer.fire('click', event(target, x, more));
      dom.fire('document', 'selectionchange', {});
    };
    const drag = (/** @type {{addr: string, pos: number}} */ from, /** @type {{addr: string, pos: number}} */ to) => {
      const p = at(from.addr, from.pos), q = at(to.addr, to.pos), target = under(p);
      layer.fire('pointerdown', event(target, screen(p)));
      sel.set(p.node, p.offset, q.node, q.offset);
      const x = screen(q);
      dom.fire('window', 'pointerup', event(under(q), x));
      layer.fire('click', event(under(q), x));
      dom.fire('document', 'selectionchange', {});
    };
    const click = (/** @type {string} */ addr, /** @type {number} */ pos) => { const p = at(addr, pos); press(p, () => sel.collapse(p.node, p.offset)); };
    const doubleClick = (/** @type {string} */ addr, /** @type {number} */ pos, /** @type {{pos: number, width: number}} */ word) => {
      click(addr, pos);
      const p = at(addr, pos), w0 = at(addr, word.pos), w1 = at(addr, word.pos + word.width);
      press(p, () => sel.set(w0.node, w0.offset, w1.node, w1.offset), { detail: 2 });
    };
    const shiftClick = (/** @type {string} */ addr, /** @type {number} */ pos) => { const p = at(addr, pos); press(p, () => sel.extend(p.node, p.offset), { shiftKey: true }); };
    const platform = () => { const s = LAYER.movingPart(); return { collapsed: sel.isCollapsed, span: s ? s.span : null, backward: s ? s.backward : null }; };
    await body({ D, E, O, at, drag, click, doubleClick, shiftClick, platform, dom, plane });
  } finally {
    HOST.dismiss(); SEL.clear(); LAYER.dropCaret(); LAYER.clear();
    REC._reset(); WRITE._reset(); REC.setBoard({ board: 'b-1', name: '', origin: '' });
    dom.uninstall();
  }
}

/** the walk's element: its kind, its place, its position */
const walkAt = () => { const f = WALK.current(); return f && [f.kind, f.addr, f.pos]; };
/** the caret as it stands: its document, its position and whether it is live */
const caretNow = () => { const c = LAYER.caret(); return c && [c.addr, c.pos, c.live]; };
/** the page-local edits of a draft, each its position, its width and its text */
const editsOf = (/** @type {string} */ addr) => WRITE.edits(addr).map((e) => [e.pos, e.width, e.text]);
/** a key as the platform delivers it, at the plane */
const plainKey = (/** @type {string} */ key, /** @type {object} */ mods = {}) => /** @type {any} */ ({ type: 'keydown', key, keyCode: 0, isComposing: false, repeat: false, metaKey: false, ctrlKey: false, shiftKey: false, altKey: false, preventDefault() {}, ...mods });
/** the plane's context for a key */
const ON_PLANE = /** @type {const} */ ({ where: 'plane', byKey: true });

test('a drag in a draft the person may edit leaves the caret live at the selection\'s moving end — where it was released, forward or backward — the selection standing as the platform drew it and the walk on the caret\'s span, the ring out; a printable key then replaces the selection, one edit, the caret after it; Esc ends the selection, the caret live, and a second Esc keeps it; a drag in another\'s text places none (issue #568\'s design decision; FP-40; D5 K-70, K-72, K-77)', () => onGestures(async ({ D, O, drag, platform }) => {
  // "words stand", positions 9 to 19 of the first line
  const words = { addr: D, pos: 9, width: 11 };
  drag({ addr: D, pos: 9 }, { addr: D, pos: 20 });
  await tick();
  assert.deepEqual([caretNow(), SEL.selected(), platform(), walkAt(), FOCUS.ringShown()], [[D, 20, true], words, { collapsed: false, span: words, backward: false }, ['block', D, 1], false],
    'forward: the caret live at the release, after "stand"; the selection standing, the platform\'s as it drew it; the walk on the caret\'s span, the ring out');
  assert.equal(await KEYS.dispatch(plainKey('q'), ON_PLANE), true);
  assert.deepEqual([editsOf(D), caretNow(), SEL.selected(), REC.textOf(LAYER.shownOf(D).runs, 1, 13)], [[[9, 11, 'q']], [D, 10, true], null, 'Tumbler q he'],
    'q: the selection replaced by it, one edit, the caret after it, the selection ended');
  WRITE.clearEdits(D);
  drag({ addr: D, pos: 20 }, { addr: D, pos: 9 });
  await tick();
  assert.deepEqual([caretNow(), SEL.selected(), platform()], [[D, 9, true], words, { collapsed: false, span: words, backward: true }], 'backward: the caret live at the release, the selection\'s start');
  assert.equal(await KEYS.dispatch(plainKey('Escape'), ON_PLANE), true);
  assert.deepEqual([SEL.selected(), caretNow(), HOST.currentState()], [null, [D, 9, true], null], 'Esc: the selection and its card ended, the caret live at the moving end');
  assert.equal(await KEYS.dispatch(plainKey('Escape'), ON_PLANE), true);
  await tick();
  assert.deepEqual([caretNow(), walkAt()], [[D, 9, false], ['block', D, 1]], 'a second Esc: the text left to the walk, the caret kept there');
  LAYER.dropCaret();
  drag({ addr: O, pos: 9 }, { addr: O, pos: 20 });
  await tick();
  assert.deepEqual([caretNow(), SEL.selected()], [null, { addr: O, pos: 9, width: 11 }], 'a drag in another\'s text: selected, no caret placed');
}));

test('a Shift+click in a draft the person may edit extends what stands there to the point clicked, the caret live there — from the live caret, from the kept caret, returned, and from a selection\'s anchor — whatever the platform\'s selection stood over; with nothing standing there it is a click: the caret at the point, nothing selected (issue #568\'s design decision; FP-40; D5 K-70)', () => onGestures(async ({ D, at, click, shiftClick, platform }) => {
  const elsewhere = () => { const p = at(D, 28); globalThis.window.getSelection()?.collapse(p.node, p.offset); };
  click(D, 9);
  await tick();
  assert.deepEqual(caretNow(), [D, 9, true], 'a click places the caret');
  // the platform's selection put elsewhere, as an act on another part of the page leaves it: the anchor is the page's to set
  elsewhere();
  shiftClick(D, 20);
  await tick();
  assert.deepEqual([caretNow(), SEL.selected(), platform(), walkAt()], [[D, 20, true], { addr: D, pos: 9, width: 11 }, { collapsed: false, span: { addr: D, pos: 9, width: 11 }, backward: false }, ['block', D, 1]],
    'from the live caret: the selection from the caret to the point clicked, the caret live there');
  assert.equal(await KEYS.dispatch(plainKey('Escape'), ON_PLANE), true);
  assert.equal(await KEYS.dispatch(plainKey('Escape'), ON_PLANE), true);
  await tick();
  assert.deepEqual([caretNow(), SEL.selected()], [[D, 20, false], null], 'Esc twice: the caret kept at 20, nothing selected');
  elsewhere();
  shiftClick(D, 9);
  await tick();
  assert.deepEqual([caretNow(), SEL.selected(), platform().backward], [[D, 9, true], { addr: D, pos: 9, width: 11 }, true], 'from the kept caret: returned, the selection running back from it to the point clicked, the caret live there');
  LAYER.dropCaret(); SEL.clear();
  SEL.select(D, 1, 7);
  elsewhere();
  shiftClick(D, 14);
  await tick();
  assert.deepEqual([caretNow(), SEL.selected()], [[D, 14, true], { addr: D, pos: 1, width: 13 }], 'from a selection\'s anchor, no caret standing: the selection from its start to the point clicked, the caret live there');
  LAYER.dropCaret(); SEL.clear();
  globalThis.window.getSelection()?.removeAllRanges();
  shiftClick(D, 9);
  await tick();
  assert.deepEqual([caretNow(), SEL.selected(), platform().collapsed], [[D, 9, true], null, true], 'from nothing: a click, the caret at the point clicked, nothing selected');
}));

test('a double-click on a word of a draft the person may edit places the caret at its first press and leaves it live at the word\'s end, the word selected — never its paragraph — so a key replaces the word alone; in another\'s text the double-click\'s word stands selected, the walk on its span, a live caret elsewhere kept (issue #568\'s design decision; FP-40; D5 K-70)', () => onGestures(async ({ D, O, click, doubleClick, platform }) => {
  const word = { pos: 9, width: 5 };
  doubleClick(D, 11, word);
  await tick();
  assert.deepEqual([caretNow(), SEL.selected(), platform(), walkAt()], [[D, 14, true], { addr: D, ...word }, { collapsed: false, span: { addr: D, ...word }, backward: false }, ['block', D, 1]],
    'the caret live at the word\'s end, "words" selected, the platform\'s as it drew it, the walk on its span');
  assert.equal(await KEYS.dispatch(plainKey('q'), ON_PLANE), true);
  assert.deepEqual([editsOf(D), caretNow()], [[[9, 5, 'q']], [D, 10, true]], 'q: the word replaced, nothing else of its paragraph');
  WRITE.clearEdits(D);
  click(D, 2);
  await tick();
  doubleClick(O, 11, word);
  await tick();
  assert.deepEqual([SEL.selected(), caretNow(), walkAt()], [{ addr: O, ...word }, [D, 2, false], ['block', O, 1]], 'in another\'s text: its word selected, the walk on its span, the caret in D kept');
}));

test('a drag reaching from one document into another places no caret, and leaves the caret by the document its moving end lies in, whichever article the range starts in: released in another document, a live caret is kept and the walk stands on the span the release is in, a printable key answered by that site\'s line; released in the caret\'s own draft, from a document before it or after it, the caret stays live with the walk on its span, and a printable key types at it, the selection replaced nowhere; with no caret, none placed (issue #568\'s design decision; FP-40; D5 K-72)', () => onGestures(async ({ D, E, O, click, drag }) => {
  click(D, 2);
  await tick();
  assert.deepEqual(caretNow(), [D, 2, true]);
  drag({ addr: D, pos: 9 }, { addr: O, pos: 31 });
  await tick();
  assert.deepEqual([caretNow(), walkAt(), SEL.reachesPast()], [[D, 2, false], ['block', O, 28], true], 'released in O: the caret kept where it stood, the walk on the span of O the release is in, the selection reaching past its document');
  assert.equal(await KEYS.dispatch(plainKey('q'), ON_PLANE), true);
  assert.deepEqual([editsOf(D), editsOf(O), HINT.standing()?.id, caretNow()], [[], [], 'B3.row.others-document', [D, 2, false]], 'q: nothing typed, O\'s line answering');
  SEL.clear();
  click(D, 2);
  await tick();
  drag({ addr: O, pos: 31 }, { addr: D, pos: 9 });
  await tick();
  assert.deepEqual([caretNow(), walkAt(), SEL.reachesPast()], [[D, 2, true], ['block', D, 1], true], 'released in D, the caret\'s own draft: the caret live where it stood, the walk on its span');
  assert.equal(await KEYS.dispatch(plainKey('q'), ON_PLANE), true);
  assert.deepEqual([editsOf(D), editsOf(O), caretNow()], [[[2, 0, 'q']], [], [D, 3, true]], 'q: typed at the caret, the selection replaced nowhere');
  WRITE.clearEdits(D); SEL.clear();
  click(E, 2);
  await tick();
  drag({ addr: D, pos: 9 }, { addr: E, pos: 9 });
  await tick();
  assert.deepEqual([caretNow(), walkAt(), SEL.selected()?.addr, SEL.reachesPast()], [[E, 2, true], ['block', E, 1], D, true], 'released in E, the caret\'s own draft, from D before it: the caret live where it stood, the walk on its span, though the page\'s selection is D\'s part');
  assert.equal(await KEYS.dispatch(plainKey('q'), ON_PLANE), true);
  assert.deepEqual([editsOf(D), editsOf(E), caretNow()], [[], [[2, 0, 'q']], [E, 3, true]], 'q: typed at the caret, the selection replaced nowhere');
  WRITE.clearEdits(E); SEL.clear(); LAYER.dropCaret();
  drag({ addr: D, pos: 9 }, { addr: O, pos: 31 });
  await tick();
  assert.deepEqual([caretNow(), SEL.reachesPast()], [null, true], 'with no caret: none placed');
}));

test('a Shift press the canvas takes on a draft the person may edit before the text under it stands — the caret live there — is held for the text and, once the frame sets it, extends from the caret to the point pressed, the caret live there and the selection standing (issue #568\'s design decision; FP-12, FP-40)', () => onGestures(async ({ D, at, dom, plane, platform }) => {
  LAYER.clear();
  LAYER.placeCaret(D, 9);
  assert.deepEqual([LAYER.isMounted(D), caretNow()], [false, [D, 9, true]], 'no text of D stands, the caret live in it at 9');
  // a point of D's first line on screen: once the frame sets the text, the platform finds its position 20 and its block there
  const c = LAYER.centreOf(D, 1), x = CAM.sx(c.x), y = CAM.sy(c.y);
  const there = (/** @type {number} */ px, /** @type {number} */ py) => px === x && py === y && LAYER.isMounted(D);
  dom.document.pointAt = (px, py) => (there(px, py) ? at(D, 20) : null);
  dom.document.elementAt = (px, py) => (there(px, py) ? at(D, 20).node.parentElement : null);
  const press = { clientX: x, clientY: y, metaKey: false, ctrlKey: false, shiftKey: true, pointerId: 1 };
  plane.get('pointerdown')?.(press);
  dom.fire('window', 'pointerup', press);
  INPUT.afterFrame();
  assert.deepEqual([caretNow(), SEL.selected()], [[D, 9, true], null], 'held: nothing done before the text stands');
  LAYER.frame();
  INPUT.afterFrame();
  await tick();
  assert.deepEqual([caretNow(), SEL.selected(), platform().collapsed], [[D, 20, true], { addr: D, pos: 9, width: 11 }, false], 'the frame set the text: the selection from the caret to the point pressed, the caret live there');
}));
