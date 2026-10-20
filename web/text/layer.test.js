// T-LAYER's test: the face a document is set at once its text has arrived
// (`metricsOf`) — the fit over its article carrying the most any reveal can
// set in it, so the article ends inside its box at every stage, toggle and
// lens and no reveal moves the face, however the model moves between them; a
// face fitted to the article as the hidden reveal sets it lets the symbols run
// its lines past the clip, which is why the bound is fitted; and another's
// links arriving fit it again.
import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import * as REC from '../model/records.js';
import * as LK from '../links/links.js';
import * as LAYER from './layer.js';
import { metricsFor, layoutOf, heightOf, fitted } from '../plane/layout.js';
import { docBox } from '../plane/projection.js';

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
