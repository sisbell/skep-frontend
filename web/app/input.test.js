// APP-INPUT's test, on a page of stand-ins: the act at a withheld run's
// gap conjures C-39's face naming the owner the gap names — its run's
// origin's, by T-LAYER's one owner rule — with the arm beneath it the rule's
// for that owner and this reader (B1-S5, B1-S7), and the act at the run's
// face compact in its column's edge opens the face whole (issue #151: a
// mutant that leaves the mark's act to C-39's face turns red), for a guest
// with no key and a guest whose device holds a key for this board. Where the board answers the
// origin's account's owner as the seat above it (`effective_owner`), a mutant
// that reads the owner off the origin's record by a rule of its own names the
// account and turns red; one that decides the face's arm on the session alone
// tells the keyed guest no key is here and turns red. The face stands at the
// placeholder, the run's own positions in the article beside it, where it
// stands once the text layer rebuilds or takes the placeholder down (a mutant
// that anchors it at the placeholder alone turns red). A click on a run's
// hairline, against the FAKE PORT, LEAPs to its source carrying the run,
// which the source's text holds elsewhere: the landing is marked at the run's
// counterpart there (a mutant that LEAPs without the run, or carries the
// block it stands in, turns red). A click on a link's symbol, and one on a
// stretch it marks, against the FAKE PORT, opens the anatomy card of the end
// clicked: of a citation from a document's own bytes to a passage of another
// that the document transcludes, both its ends in one article, each mark's
// card stands at its own end's bytes and reads that end near and the other
// far (a mutant that finds the end by its link alone, the link's first end
// in the article answering every mark, turns red; so does an article whose
// marks carry no end's key). A click on C-67's pointer beneath a withheld
// run's arm, against the FAKE PORT, LEAPs to the edition its claim names —
// the claim's home, landed in whole, its trail entry the one Back returns to
// the run from — carrying no passage, lighting no link and showing no face (a
// mutant that leaves the pointer to the placeholder's C-39, or carries the
// run, turns red); a click on the rest of that placeholder still conjures
// C-39's face.
// A press at the readable em on a document whose text does not stand yet —
// no frame run since the camera moved there — is held for the text, never
// dropped and never a move to the place (issue #122's design decision): it
// selects nothing while no text stands under it, and after the frame that
// sets the text it is the text's click, selecting the block under it whole,
// with no trail entry and no flight (a page that drops the press, or makes it
// the place's, turns red).
// An empty click made while a card reads ends its opening alone (O-HOST's):
// its answer shows nothing and the card standing under it stands (a mutant
// that dismisses the standing card with it, or leaves the opening to the
// overlay's dismissal, turns red); the next empty click dismisses that card.
// A press on a withheld run's placeholder starts no selection — the platform
// selects an item whole wherever a selection touches it (FP-24; issue #161),
// and the placeholder's click is its act's alone — while a press on the text
// beside it starts one (a page that refuses none, or every one, turns red).
// THE CAMERA FOLLOWS THE READER WHILE A JUMP IS IN THE AIR (FP-25; issue
// #137's design decision): a wheel series under way as a LEAP's camera left
// is dropped whole — the flight runs on to its destination and nothing moves
// (a page that pans on it turns red) — and a wheel event SERIES_MS or more
// after the series, a pinch, and the camera key's drag each take the camera
// over: the jump lands where the camera is, its flight ended (a page that
// takes nothing over, or drops every wheel event, turns red).
// A press on an outlined run of an arrival in several runs, below its
// document's reading scale, is a step to it (issue #158's design decision:
// "Clicking an outlined run below reading scale does the same"): the landing
// standing there, the camera bound for its reading view, no trail entry, the
// arrival standing (a page that teleports to the document there turns red).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as INPUT from './input.js';
import * as HOST from '../overlays/host.js';
import * as SEL from '../overlays/selection.js';
import * as REC from '../model/records.js';
import * as LAYER from '../text/layer.js';
import * as LK from '../links/links.js';
import * as PORT from '../bridge/port.js';
import * as F from '../model/frames.js';
import * as FAKE from '../test/fake-port.js';
import * as GO from '../nav/go.js';
import * as TRAIL from '../nav/trail.js';
import * as WALK from '../nav/walk.js';
import * as CAM from '../plane/camera.js';
import * as RENDER from '../plane/render.js';
import { lodOf } from '../plane/lod.js';
import { articleHTML, entitlementArm } from '../text/article.js';
import { resolveSpan, unitSpan } from '../model/address.js';
import { t } from '../strings.js';
import { MAC } from '../nav/keys.js';
import { esc, byteLength } from '../util.js';

/** the attributes of an element's opening tag, as the platform's `dataset` reads them */
const datasetOf = (/** @type {string} */ tag) =>
  Object.fromEntries([...tag.matchAll(/ data-([a-z-]+)="([^"]*)"/g)].map(([, k, v]) => [k.replace(/-([a-z])/g, (_, c) => c.toUpperCase()), v]));

test('the act at a withheld run conjures C-39\'s face naming the owner its gap names, the arm beneath it the rule\'s for that owner and this reader; the act at its face compact in its column\'s edge opens the face whole', () => {
  const platform = { document: globalThis.document, window: globalThis.window, HTMLElement: globalThis.HTMLElement };
  /** @type {Map<string, (e: unknown) => void>} the text layer's listeners, by event */
  const layer = new Map();
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
    REC.takeSpanSet(D, [{ subspace: 1, ordinal: 1, positions: n + 240 }]);
    REC.takeDelivery(D, [{ pos: 1, width: n, kind: 'content', text, ref: null, origin: null }, { pos: n + 1, width: 240, kind: 'withheld', text: '', ref: null, origin: O }]);
    // the edition claims on the origin read, none listed: every read the run's face waits on answered, so it shows at once
    REC.takeEditionClaims(O, []);
    const d = REC.doc(D);
    HOST.attach(/** @type {any} */ ({
      ...listens(null), className: '', innerHTML: '', style: {}, setAttribute() {}, removeAttribute() {},
      querySelector: () => null, querySelectorAll: () => [], contains: () => false, getBoundingClientRect: () => ({ width: 0, height: 0 }),
    }));
    INPUT.attach(/** @type {any} */ ({ plane: listens(null), layer: listens(layer), corners: listens(null) }));
    const click = layer.get('click');
    assert.ok(click, 'the text layer takes a click');
    /** @type {Array<[string, Array<{bindings: string[]}>, string]>} each guest, the device's keys, and the arm the placeholder and the face carry */
    const guests = [['a guest with no key', [], 'R56.key-absent'], ['a guest with a key for this board', BOUND, 'C-36.guest.key']];
    for (const [who, keys, id] of guests) {
      REC.takeKeyStore(keys, ORIGIN);
      // the placeholder as the plane's article holds it: T-LAYER mounts T-ARTICLE's HTML from its view
      const article = articleHTML(d, LAYER.viewFor(d), LAYER.ownerAccount(d));
      const tag = (/<span class="withheld"[^>]*>/.exec(article) || [''])[0], arm = esc(entitlementArm({ account: null, keyPresent: keys.length > 0 }, owner).text);
      // the face whole in its gap where 240 positions hold it — the key-present arm's — else compact in its column's edge: R56's arm is too deep for them
      const inGap = (/<span class="arm">([^<]*)<\/span>/.exec(article) || [])[1] ?? null, marked = article.includes(`>${esc(t('L.withheld.mark', { owner }))}</span>`);
      assert.ok(id === 'R56.key-absent' ? inGap === null && marked : inGap === arm && !marked, `${who}: ${id === 'R56.key-absent' ? 'no arm in its gap, the face compact in its column\'s edge naming ' + owner : 'the face whole in its gap, the rule\'s arm'}`);
      const run = Object.assign(new globalThis.HTMLElement(), { dataset: datasetOf(tag), isConnected: false });
      const holder = { dataset: { addr: D } };
      Object.assign(run, { closest: (/** @type {string} */ sel) => (sel === '[data-withheld]' ? run : sel === 'article' ? holder : null) });
      assert.deepEqual([run.dataset.origin, run.dataset.owner], [O, owner], `${who}: the gap carries its origin and its origin's owner, the seat above the origin's account`);
      click({ target: run, clientX: 0, clientY: 0, stopPropagation() {} });
      const face = HOST.currentOverlay();
      assert.equal(face && face.id, 'face:C-39', `${who}: the act at the run conjures C-39's face`);
      assert.deepEqual(face && face.anchor, { el: run, span: { addr: D, pos: n + 1, width: 240 } }, `${who}: the face stands at the placeholder, the run's own positions beside it, where it stands once the text layer rebuilds or takes the placeholder down`);
      const html = face ? face.html : '';
      assert.ok(html.includes(`>${esc(t('C-39', { owner }))}</div>`), `${who}: the face names ${owner}, the owner the placeholder names — never the origin's account, 1.0.1.1`);
      assert.ok(html.includes(`<div class="arm" data-string="${id}">${arm}</div>`), `${who}: the arm beneath it is the rule's for the run's origin's owner and this reader, ${id}: ${html}`);
      HOST.dismiss();
      // the run's face compact in its column's edge: its act opens the face whole, as Enter at the run does (D5 K-7)
      if (!marked) continue;
      const mark = Object.assign(new globalThis.HTMLElement(), { dataset: { mark: 'withheld' } });
      Object.assign(mark, { closest: (/** @type {string} */ sel) => (sel === '.wh-mark' ? mark : sel === '[data-withheld]' ? run : sel === 'article' ? holder : null) });
      click({ target: mark, clientX: 0, clientY: 0, stopPropagation() {} });
      const whole = HOST.currentOverlay();
      assert.equal(whole && whole.id, 'face:withheld-run', `${who}: the act at the edge's mark opens the run's face whole`);
      assert.ok(!!whole && whole.html.includes(arm) && whole.html.includes(esc(t('B1.withheld-run', { owner, account: owner, width: 240, origin: O }))), `${who}: its head and the arm the rule gives, whole`);
      HOST.dismiss();
    }
  } finally {
    REC.takeKeyStore([], ORIGIN);
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
    REC.takeLink({ addr: L, from: [span(D, 1, 7)], to: [span(O, 16, 6)], type: CITE });
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
    const article = articleHTML(d, LAYER.viewFor(d), LAYER.ownerAccount(d));
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
        const read = [...(card ? card.html : '').matchAll(/<div class="end (far|near)"><span class="k">([^<]*)<\/span> <span class="code">([^<]*)<\/span>.*?<div class="quoted">([^<]*)<\/div>/g)].map((m) => m.slice(1));
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

test('a click on C-67\'s pointer LEAPs to the edition its claim names, landed in whole — a trail entry Back returns from, no passage carried, no link lit, no face — and a click on the rest of the placeholder conjures C-39\'s face', async () => {
  const platform = { document: globalThis.document, window: globalThis.window, HTMLElement: globalThis.HTMLElement };
  /** @type {Map<string, (e: unknown) => void>} the text layer's listeners, by event */
  const layer = new Map();
  const listens = (/** @type {Map<string, (e: unknown) => void> | null} */ into) => ({ addEventListener: (/** @type {string} */ type, /** @type {(e: unknown) => void} */ fn) => { if (into) into.set(type, fn); } });
  globalThis.HTMLElement = /** @type {any} */ (class {});
  globalThis.document = /** @type {any} */ ({ ...listens(null), activeElement: null, body: null });
  globalThis.window = /** @type {any} */ ({ ...listens(null), getSelection: () => null });
  try {
    // a guest at 1.0.2's document, which windows a run of 1.0.1's draft O — twelve lines deep, so its gap holds its face whole —
    // and 1.0.1 published an edition, H, whose claim on O passes: its FROM H's own bytes, which no span of O holds
    const D = '1.0.2.0.6', O = '1.0.1.0.1004', H = '1.0.1.0.40', CLAIM = H + '.0.2.1', R20 = '1.1.0.1.0.1.0.3.14', RUN = 12 * 66;
    const text = 'Tumbler.\n\n', n = byteLength(text), edition = 'The published edition.', m = byteLength(edition);
    const fake = FAKE.create({
      // H read whole on the LEAP: its extent, its text, its image, its links — the claim among them, read already
      [FAKE.keyOf('op', { frame: F.retrieveDocVSpanSet(H) })]: { result: { as_of: 1, resp: 'span_set', set: [{ start: '1.1', width: '0.' + m }] } },
      [FAKE.keyOf('op', { frame: F.retrieveV(H, 1, m) })]: { result: { as_of: 1, resp: 'delivery', items: [{ content: edition }] } },
      [FAKE.keyOf('op', { frame: F.image(H, 1, m) })]: { result: { as_of: 1, resp: 'runs', runs: [{ i_start: H + '.0.1.1', width: String(m) }] } },
      [FAKE.keyOf('op', { frame: F.findLinksV(H, 1, m) })]: { result: { as_of: 1, resp: 'addrs', addrs: [CLAIM] } },
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
    INPUT.attach(/** @type {any} */ ({ plane: listens(null), layer: listens(layer), corners: listens(null) }));
    const click = layer.get('click');
    assert.ok(click, 'the text layer takes a click');
    // the gap as the plane's article holds it, the face whole in it, and its pointer and its head as a click finds them in it
    const article = articleHTML(d, LAYER.viewFor(d), LAYER.ownerAccount(d)), holder = { dataset: { addr: D } };
    const run = Object.assign(new globalThis.HTMLElement(), { dataset: datasetOf((/<span class="withheld"[^>]*>/.exec(article) || [''])[0]) });
    Object.assign(run, { closest: (/** @type {string} */ sel) => (sel === '[data-withheld]' ? run : sel === 'article' ? holder : null) });
    const ptr = Object.assign(new globalThis.HTMLElement(), { dataset: datasetOf((/<span class="clause"[^>]*>/.exec(article) || [''])[0]) });
    Object.assign(ptr, { closest: (/** @type {string} */ sel) => (sel === '.clause[data-home]' ? ptr : run.closest(sel)) });
    const head = Object.assign(new globalThis.HTMLElement(), { closest: (/** @type {string} */ sel) => run.closest(sel) });
    assert.deepEqual([ptr.dataset.claim, ptr.dataset.home], [CLAIM, H], 'the pointer carries the claim it follows and that claim\'s home');
    // the reader stands at the run, a LEAP's landing
    CAM.setViewport(1440, 900);
    TRAIL._reset();
    const departing = GO.leapTo(D, { pos: n + 1 });
    await settled(() => WALK.current()?.pos === n + 1);
    await departing;
    const from = fake.asked.length;
    click({ target: ptr, clientX: 0, clientY: 0, stopPropagation() {} });
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
    assert.equal(HOST.currentState()?.id, 'face:C-39', 'the rest of the placeholder conjures C-39\'s face');
    HOST.dismiss();
  } finally {
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
        down({ clientX: 10, clientY: 10, pointerId: 1, metaKey: MAC, ctrlKey: !MAC });
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
