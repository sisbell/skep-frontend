// T-LAYER's test: the face a document is set at once its text has arrived
// (`metricsOf`) — the fit over its article carrying the most any reveal can
// set in it, so the article ends inside its box at every stage, toggle and
// lens and no reveal moves the face, however the model moves between them; a
// face fitted to the article as the hidden reveal sets it lets the symbols run
// its lines past the clip, which is why the bound is fitted; and another's
// links arriving fit it again.
// Then THE CAP (`frame`), on a page of stand-ins over a field of an account's
// 48 documents a line each, every face the same: never more than eight
// articles stand, and eight while more of the field is in view, through a pan
// across it and back — each pan taking down only what left the view and every
// other article standing on its own element (a mutant that caps the mounts
// alone turns red at nine; one that chooses the eight by the model's order
// trades equals and turns red); an article standing keeps its place down to
// 5.5 (one that asks 6.5 of it turns red); a larger face takes the place of
// the smallest standing; the walk's focused document stands first among equal
// faces, its leaving trading nothing back (one that ranks it with the rest
// turns red); a stale article is rebuilt in its
// place — after a trade, and in the hysteresis band — never dropped (one that
// chooses after the rebuild turns red); and while a press stands nothing is
// mounted or taken down for the cap, what leaves the view apart (one that
// chooses under the press turns red).
// And the owner a withheld run names, on the plane's mounted article and in
// a reading scene's pane alike: its origin's, by the one rule the byline's
// owner is found by, whoever owns the document windowing it (a view that
// hands the article's owner back turns red).
// And the camera's zoom-in bound, which every face read here reaches: a
// residue member of two hundred one-line paragraphs, set at under a fifth of
// its place's em, is read at reading scale (a face that leaves the bound at
// its place's turns red), and a feed row dropping its text, its face its place's
// again, takes no scale from under its reader (a bound set from the latest
// face turns red).
import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import * as REC from '../model/records.js';
import * as LK from '../links/links.js';
import * as LAYER from './layer.js';
import * as CAM from '../plane/camera.js';
import { metricsFor, layoutOf, heightOf, fitted } from '../plane/layout.js';
import { docBox, intersects, depthOfDoc, DOC_CELL_W, DEPTH_SOUND } from '../plane/projection.js';
import { MAX_MOUNTED, MOUNT_EM } from '../plane/lod.js';
import { t } from '../strings.js';
import { esc } from '../util.js';

/** @typedef {import('../plane/layout.js').Metrics} Metrics */

const D = '1.0.1.0.3', FAR = '1.0.1.0.127', OTHER_HOME = '1.0.2.0.5', CITE = '1.1.0.1.0.1.0.3.13';
/** links per paragraph: their symbols alone are wider than a line */
const PER_BLOCK = 30;
const span = (/** @type {string} */ doc, /** @type {number} */ ord, /** @type {number} */ w) => ({ start: `${doc}.0.1.${ord}`, width: '0.0.0.0.0.0.0.' + w, doc, account: doc.split('.').slice(0, 3).join('.'), whole: false, subspace: 1, ordinal: ord, positions: w });
const whole = (/** @type {string} */ doc) => ({ start: doc, width: '0.0.0.0.1', doc, account: doc.split('.').slice(0, 3).join('.'), whole: true, subspace: null, ordinal: null, positions: null });
/** a paragraph of `n` words of two to nine characters, varied by `seed` */
const words = (/** @type {number} */ n, /** @type {number} */ seed) => Array.from({ length: n }, (_, i) => 'abcdefghij'.slice(0, 2 + ((i * 7 + seed) % 8))).join(' ');
const TEXT = Array.from({ length: 10 }, (_, i) => words(30, i)).join('\n\n');
const EXTENT = new TextEncoder().encode(TEXT).length;
/** the room an article's lines may take at a face, in its em */
const room = (/** @type {Metrics} */ m) => (m.y1 - m.y0) / m.fs;
/** does the article as the reveal sets it now end inside its room at a face? */
const holds = (/** @type {Metrics} */ m) => heightOf(layoutOf(LAYER.planOf(REC.doc(D)), m)) <= room(m);
/** a model move that changes nothing the article shows: the model's revision moves, so no face is read from before it */
const moveModel = () => REC.setDaemon(REC.daemon() === 'running' ? 'stopped' : 'running');

/** links homed at `home` from a span of D's `block`, `n` of them, each a position wide */
function cite(/** @type {string} */ home, /** @type {import('../model/records.js').Block} */ block, /** @type {number} */ n, first = 1) {
  const addrs = Array.from({ length: n }, (_, j) => `${home}.0.2.${first + j}`);
  REC.takeLinks(D, addrs);
  addrs.forEach((addr, j) => {
    const at = span(D, block.pos + j, 1);
    REC.takeLink(home === D ? { addr, from: [at], to: [whole(FAR)], type: CITE } : { addr, from: [span(home, 1 + j, 1)], to: [at], type: CITE });
  });
}

beforeEach(() => {
  REC._reset(); LK._reset();
  REC.takeIndex(/** @type {any} */ ({ docs: [{ doc: D, kind: 'edition', label: 'd', standing: 'public' }], counts: [{ account: '1.0.1', documents: 1 }], state: { arm: 'complete' } }));
  REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  REC.takeSpanSet(D, [{ subspace: 1, ordinal: 1, positions: EXTENT }]);
});

/** D's text delivered whole, the owner's PER_BLOCK links at each of its paragraphs */
function deliver() {
  REC.takeDelivery(D, [{ pos: 1, width: EXTENT, kind: 'content', text: TEXT, ref: null, origin: null }]);
  REC.doc(D).blocks.forEach((b, i) => cite(D, b, PER_BLOCK, 1 + i * PER_BLOCK));
}

test('the face holds the article at every stage, toggle and lens, and no reveal moves it, however the model moves between them', () => {
  deliver();
  const first = LAYER.metricsOf(REC.doc(D));
  assert.ok(first.cpl > metricsFor(EXTENT, docBox(D)).cpl, 'the estimate cannot hold this article: the face is narrowed');
  /** @type {Array<[string, () => void]>} */
  const states = [
    ['hidden', () => {}],
    ['symbols', () => LK.reveal(D, 2)],
    ['content with others\' links on', () => { LK.reveal(D, 3); LK.setOthers(D, true); }],
    ['a lens by type', () => { LK.setOthers(D, false); LK.lens(D, { types: new Set([CITE]) }); }],
    ['dismissed', () => { LK.clearLens(D); LK.hide(D); }],
  ];
  for (const [name, move] of states) {
    move(); moveModel();
    const m = LAYER.metricsOf(REC.doc(D));
    assert.deepEqual([m.fs, m.cpl], [first.fs, first.cpl], `${name}: the face is the one the article was first set at`);
    assert.ok(holds(m), `${name}: the article's lines end inside its box`);
  }
});

test('a face fitted to the article as the hidden reveal sets it would let the symbols run its lines past the clip', () => {
  deliver();
  const hidden = fitted(LAYER.planOf(REC.doc(D)), metricsFor(EXTENT, docBox(D)));
  assert.ok(holds(hidden), 'it holds the hidden article');
  LK.reveal(D, 2);
  assert.ok(!holds(hidden), 'and not the article with its symbols');
  const m = LAYER.metricsOf(REC.doc(D));
  assert.ok(m.cpl > hidden.cpl && holds(m), 'the face fitted to the bound is narrower, and holds it');
});

test('another\'s links arriving fit the face again: the article holds with their counts at the hidden reveal and their symbols with others\' links on', () => {
  deliver();
  const before = LAYER.metricsOf(REC.doc(D));
  const blocks = REC.doc(D).blocks;
  blocks.forEach((b, i) => cite(OTHER_HOME, b, PER_BLOCK, 1 + i * PER_BLOCK));
  const m = LAYER.metricsOf(REC.doc(D));
  assert.ok(m.fs < before.fs, 'the face narrows for what the arrival can set in the text');
  assert.ok(blocks.every((b) => LK.countAt(D, b).n === PER_BLOCK) && holds(m), 'their counts at the hidden reveal: held');
  LK.reveal(D, 2); LK.setOthers(D, true); moveModel();
  assert.ok(LAYER.metricsOf(REC.doc(D)) === m && holds(m), 'their symbols with others\' links on: held, at the same face');
});

// ---- the cap -----------------------------------------------------------------------------------------------------------

/** the field: an account's first grid of documents, 1 … 48 (its 49th cell holds the continuation) */
const FIELD = '1.0.4';
const ALL = Array.from({ length: 48 }, (_, i) => i + 1);
/** the field's document `k` */
const nth = (/** @type {number} */ k) => `${FIELD}.0.${k}`;
/** a document's text delivered whole, its extent with it */
function give(/** @type {number} */ k, /** @type {string} */ text) {
  const n = new TextEncoder().encode(text).length;
  REC.takeSpanSet(nth(k), [{ subspace: 1, ordinal: 1, positions: n }]);
  REC.takeDelivery(nth(k), [{ pos: 1, width: n, kind: 'content', text, ref: null, origin: null }]);
}
/** the field's documents given a line each: every one set at P-LAY's floor of 52 characters, one face */
const note = (/** @type {number[]} */ ks) => ks.forEach((k) => give(k, `Note ${k}.`));
/** a document's face, in world units */
const faceOf = (/** @type {number} */ k) => LAYER.metricsOf(REC.doc(nth(k))).fs;
/** the camera over the field's middle — document 25's place, `dx` columns across — a line's face at `em` px */
function view(/** @type {number} */ em, dx = 0) {
  const b = docBox(nth(25));
  CAM.set({ x: b.x + b.w / 2 + dx * DOC_CELL_W, y: b.y + b.h / 2, scale: em / faceOf(16) });
}
/** the field's documents whose boxes meet the world the layer mounts in: the viewport, 40 px about it */
const inView = () => { const v = CAM.viewportWorld(40); return ALL.filter((k) => intersects(docBox(nth(k)), v)); };
/** a frame, the walk's focus on document `focus`: the documents whose articles stand after it */
function frame(/** @type {number | null} */ focus = null) {
  LAYER.frame((addr) => focus != null && addr === nth(focus));
  return LAYER.mountedAddrs().map((a) => Number(a.split('.').pop())).sort((x, y) => x - y);
}
/** the element each standing article stands on, by document */
const elements = () => new Map([...LAYER.mountedSet()].map(([a, rec]) => [a, rec.el]));
/** of the articles that stood, the ones standing still on the element they stood on */
const unmoved = (/** @type {Map<string, unknown>} */ before) => [...before].filter(([a, el]) => LAYER.mountedSet().get(a)?.el === el).map(([a]) => a);

/**
 * The test run on the text layer over a page of stand-ins — its element 1440 × 900 px, which holds what the layer
 * mounts (`held`), and the platform's selection on nothing — then every article taken down and the platform's
 * `document` and `window` put back.
 */
function onLayer(/** @type {(held: Set<unknown>) => void} */ body) {
  const platform = { document: globalThis.document, window: globalThis.window };
  /** @type {Set<unknown>} */
  const held = new Set();
  const element = () => {
    const e = {
      className: '', innerHTML: '', dataset: {}, style: {}, classList: { toggle() {} }, setAttribute() {},
      querySelectorAll: () => [], getBoundingClientRect: () => ({ top: 0, left: 0, width: 0, height: 0 }),
      remove() { held.delete(e); },
    };
    return e;
  };
  globalThis.document = /** @type {any} */ ({ createElement: element });
  globalThis.window = /** @type {any} */ ({ getSelection: () => null });
  CAM.setViewport(1440, 900);
  LAYER.attach(/** @type {any} */ ({ clientWidth: 1440, clientHeight: 900, appendChild: (/** @type {unknown} */ e) => { held.add(e); } }), /** @type {any} */ (null));
  try { body(held); } finally { LAYER.press(false); LAYER.clear(); globalThis.document = platform.document; globalThis.window = platform.window; }
}

test('never more than eight articles stand, and eight while more qualify, through a pan across the field and back: each pan takes down only what left the view, every other article standing on its own element', () => onLayer((held) => {
  note(ALL);
  assert.ok(ALL.every((k) => faceOf(k) === faceOf(16)), 'the field is one face: every document ties');
  view(7);
  assert.equal(inView().length, 15, 'at em 7, fifteen of the field in view');
  assert.deepEqual(frame(), [16, 17, 18, 19, 20, 23, 24, 25], 'the first eight in view, in the model\'s order');
  for (const dx of [1, 0, -1, 0, 2, 1, 0]) {
    const before = elements();
    view(7, dx);
    const now = frame(), seen = inView();
    const left = [...before.keys()].filter((a) => !seen.includes(Number(a.split('.').pop())));
    assert.ok(seen.length > MAX_MOUNTED, `${dx} across: more of the field in view than the cap`);
    assert.equal(now.length, MAX_MOUNTED, `${dx} across: eight articles stand, never more`);
    assert.equal(held.size, MAX_MOUNTED, `${dx} across: the layer holds their eight elements and no other`);
    assert.ok(now.every((k) => seen.includes(k)), `${dx} across: each in view`);
    assert.deepEqual(unmoved(before), [...before.keys()].filter((a) => !left.includes(a)), `${dx} across: none taken down or rebuilt but what left the view`);
  }
}));

test('an article standing keeps its place down to 5.5; a document holding none takes a place from 6.5', () => onLayer(() => {
  note(ALL);
  view(7);
  const eight = frame();
  view(6);
  assert.ok(inView().length > 15, 'em 6: more of the field in view than at em 7');
  assert.deepEqual(frame(), eight, 'em 6 from above: the eight stand');
  view(5);
  assert.deepEqual(frame(), [], 'em 5: below 5.5, none stands');
  view(6);
  assert.deepEqual(frame(), [], 'em 6 from below: none takes a place below 6.5');
  view(6.6);
  assert.equal(frame().length, MAX_MOUNTED, 'em 6.6 from below: eight take their places');
}));

test('a larger face takes the place of the smallest article standing', () => onLayer((held) => {
  note([16, 17, 18, 19, 20, 23, 24]);
  give(25, Array.from({ length: 40 }, (_, i) => `Line ${i} of a longer document, which its box sets smaller.`).join(' '));
  assert.ok(faceOf(25) < faceOf(16), 'the longer document is set at a smaller face than a line');
  view((6.8 * faceOf(16)) / faceOf(25));
  assert.ok(faceOf(25) * CAM.cam.scale >= MOUNT_EM, 'the longer document at em 6.8: it takes a place');
  const eight = frame();
  assert.deepEqual(eight, [16, 17, 18, 19, 20, 23, 24, 25], 'the eight delivered in view stand');
  const before = elements();
  note([26]);
  assert.deepEqual(frame(), [16, 17, 18, 19, 20, 23, 24, 26], 'a line arriving in view takes the longer document\'s place');
  assert.equal(held.size, MAX_MOUNTED);
  assert.deepEqual(unmoved(before), [16, 17, 18, 19, 20, 23, 24].map(nth), 'the other seven stand as they stood');
}));

test('among equal faces the walk\'s focused document takes a place first, and its leaving trades nothing back', () => onLayer(() => {
  note(ALL);
  view(7);
  const eight = frame();
  assert.ok(!eight.includes(27) && inView().includes(27), 'document 27 in view, past the cap');
  const before = elements();
  const focused = frame(27);
  assert.ok(focused.includes(27), 'focused, it stands: its corner the plane\'s next Tab stop (K-57)');
  assert.equal(focused.length, MAX_MOUNTED, 'eight stand');
  assert.equal(unmoved(before).length, MAX_MOUNTED - 1, 'one article gave up its place, the other seven stand as they stood');
  const after = elements();
  assert.deepEqual(frame(), focused, 'the focus gone: the eight stand as they are');
  assert.equal(unmoved(after).length, MAX_MOUNTED, 'none rebuilt');
}));

test('a stale article is rebuilt in its place — after a trade the model\'s order would undo, and in the hysteresis band — never dropped', () => onLayer(() => {
  note(ALL);
  view(7); frame();
  view(7, 1); frame();
  view(7);
  const traded = frame();
  assert.notDeepEqual(traded, inView().slice(0, MAX_MOUNTED), 'the eight standing are not the first eight in view by the model\'s order');
  let before = elements();
  LAYER.bump();
  assert.deepEqual(frame(), traded, 'a reveal\'s bump: the same eight stand');
  assert.deepEqual(unmoved(before), [], 'each rebuilt, on an element of its own');
  view(6);
  assert.deepEqual(frame(), traded, 'em 6: the eight stand');
  before = elements();
  LAYER.bump();
  assert.deepEqual(frame(), traded, 'em 6, a reveal\'s bump: the eight are rebuilt where they stand');
  assert.deepEqual(unmoved(before), [], 'each on an element of its own');
  before = elements();
  give(16, 'Note 16, delivered again.');
  assert.deepEqual(frame(), traded, 'em 6, a delivery to one of them: the eight stand');
  assert.deepEqual(unmoved(before), [...before.keys()].filter((a) => a !== nth(16)), 'that one rebuilt, the others as they stood');
}));

test('while a press stands nothing is mounted or taken down for the cap, what leaves the view apart; the first frame after it does what was held', () => onLayer((held) => {
  note(ALL);
  view(7);
  const eight = frame();
  const before = elements();
  LAYER.press(true);
  assert.deepEqual(frame(27), eight, 'the focus on document 27 under the press: the eight stand');
  assert.equal(unmoved(before).length, MAX_MOUNTED, 'none rebuilt');
  view(7, 1);
  const during = frame(27);
  assert.deepEqual(during, eight.filter((k) => inView().includes(k)), 'a pan under the press: what left the view is taken down, nothing mounted');
  assert.equal(held.size, during.length);
  LAYER.press(false);
  const after = frame(27);
  assert.equal(after.length, MAX_MOUNTED, 'the press ended: eight stand');
  assert.ok(after.includes(27), 'the focused document among them');
}));

// ---- the owner a withheld run names ------------------------------------------------------------------------------------

test('a guest meets a withheld run named for its origin\'s owner, whoever owns the document windowing it: on the plane\'s mounted article and in a reading scene\'s pane alike', () => onLayer(() => {
  const O = '1.0.2.0.2', text = 'Tumbler.\n\n', width = 240, n = new TextEncoder().encode(text).length;
  REC.setSession(null);
  REC.takeSpanSet(D, [{ subspace: 1, ordinal: 1, positions: n + width }]);
  REC.takeDelivery(D, [{ pos: 1, width: n, kind: 'content', text, ref: null, origin: null }, { pos: n + 1, width, kind: 'withheld', text: '', ref: null, origin: O }]);
  const d = REC.doc(D), box = docBox(D);
  assert.equal(LAYER.ownerAccount(d), '1.0.1', 'the first edition is 1.0.1\'s');
  CAM.set({ x: box.x + box.w / 2, y: box.y + box.h / 2, scale: 12 / LAYER.metricsOf(d).fs });
  LAYER.frame();
  const rec = LAYER.mountedSet().get(D);
  assert.ok(rec, 'at em 12 its article stands on the plane');
  const head = esc(t('B1.withheld-run', { owner: '1.0.2', account: '1.0.2', width, origin: O }));
  const arm = (/** @type {string} */ owner) => esc(t('R56.key-absent', { owner }));
  /** @type {Array<[string, string]>} */
  const met = [['on the plane', String(rec.el.innerHTML)], ['in a pane', LAYER.sceneArticle(d)]];
  for (const [where, html] of met) {
    assert.ok(html.includes(`<span class="wh-head">${head}</span><span class="arm">${arm('1.0.2')}</span>`), `${where}: the head and R56's key-absent arm name 1.0.2, the owner of the run's origin`);
    assert.ok(!html.includes(arm('1.0.1')), `${where}: no arm names 1.0.1, the owner of the document windowing the run`);
  }
}));

// ---- the zoom-in bound -------------------------------------------------------------------------------------------------

test('a face set smaller than its place\'s em raises the zoom-in bound to read it, and no face read after lowers it: a feed row dropping the document\'s text takes no scale from under its reader', () => {
  const RES = `1.0.1.0.${48 * (DEPTH_SOUND + 1) + 1}`, box = docBox(RES);
  CAM._reset(); CAM.setViewport(1440, 900);
  CAM.setDeepest(depthOfDoc(RES)); // the bound the app sets at boot over an index listing it
  const text = Array.from({ length: 200 }, (_, i) => `Item ${i + 1}.`).join('\n\n'), n = new TextEncoder().encode(text).length;
  REC.takeSpanSet(RES, [{ subspace: 1, ordinal: 1, positions: n }]);
  REC.takeDelivery(RES, [{ pos: 1, width: n, kind: 'content', text, ref: null, origin: null }]);
  const fs = LAYER.metricsOf(REC.doc(RES)).fs;
  assert.ok(box.residue && fs < box.fsRep / 5, `a residue member of two hundred one-line paragraphs, set at ${fs / box.fsRep} of its place's em`);
  assert.ok(CAM.bounds().maxS * fs >= 36, `the bound reads its face at 36 px an em, as it reads its place's: ${CAM.bounds().maxS * fs}`);
  const reading = CAM.viewForDoc(box, fs, 12.5);
  CAM.set(reading);
  assert.equal(CAM.view().scale, reading.scale, 'its reader at 12.5 px an em');
  REC.invalidate(RES);
  assert.ok(LAYER.metricsOf(REC.doc(RES)).fs > 5 * fs, 'a feed row drops its text: its face is its place\'s again until the text is read anew');
  CAM.panBy(1, 0);
  assert.equal(CAM.view().scale, reading.scale, 'the next pan keeps its reader\'s scale');
  CAM._reset();
});
