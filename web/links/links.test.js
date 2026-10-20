// LK's test — the rule over a hand-built model: the owner's links marked,
// the person's own in their hue, the others' counted and not shown, the
// lenses filtering, a visited link lighter, the records and account-named
// ends never counted, the badge arriving until read, the mid connections one
// per pair of places drawn.
import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import * as REC from '../model/records.js';
import * as LK from './links.js';
import { HUE, VISITED_ALPHA } from '../plane/register.js';

const CITE = '1.1.0.1.0.1.0.3.13', ENROLL = '1.1.0.1.0.1.0.3.1', CLAIM = '1.1.0.1.0.1.0.3.3', ENDORSE = '1.1.0.1.0.1.0.3.42';
const D = '1.0.1.0.3', OTHER_HOME = '1.0.2.0.5';
const span = (/** @type {string} */ doc, /** @type {number} */ ord, /** @type {number} */ w) => ({ start: `${doc}.0.1.${ord}`, width: '0.0.0.0.0.0.0.' + w, doc, account: doc.split('.').slice(0, 3).join('.'), whole: false, subspace: 1, ordinal: ord, positions: w });
const whole = (/** @type {string} */ doc) => ({ start: doc, width: '0.0.0.0.1', doc, account: doc.split('.').slice(0, 3).join('.'), whole: true, subspace: null, ordinal: null, positions: null });
const acct = (/** @type {string} */ a) => ({ start: a, width: '0.0.1', doc: null, account: a, whole: true, subspace: null, ordinal: null, positions: null });

function build(/** @type {{session?: string | null}} */ opts = {}) {
  REC._reset(); LK._reset();
  REC.takeIndex(/** @type {any} */ ({ docs: [{ doc: D, kind: 'edition', label: 'd', standing: 'public' }, { doc: OTHER_HOME, kind: 'edition', label: 'o', standing: 'public' }], counts: [{ account: '1.0.1', documents: 1 }, { account: '1.0.2', documents: 1 }], state: { arm: 'complete' } }));
  if (opts.session !== null) REC.setSession({ session: 's-1', principal: 1, account: opts.session ?? '1.0.1' });
  REC.takeDelivery(D, [{ pos: 1, width: 100, kind: 'content', text: 'x'.repeat(40) + '\n\n' + 'y'.repeat(58), ref: null, origin: null }]);
  // the owner's citation from D's second block to a far document; a record (enroll) with an account end; the claim; another's link onto D's first block; a social link; a whole-document end
  REC.takeLinks(D, [D + '.0.2.1', '1.0.1.0.1.0.2.1', '1.0.1.0.1.0.2.2', OTHER_HOME + '.0.2.1', OTHER_HOME + '.0.2.2', OTHER_HOME + '.0.2.3']);
  REC.takeLink({ addr: D + '.0.2.1', from: [span(D, 50, 10)], to: [whole('1.0.1.0.127')], type: CITE });
  REC.takeLink({ addr: '1.0.1.0.1.0.2.1', from: [span('1.0.1.0.1', 1, 1)], to: [acct('1.0.1')], type: ENROLL });
  REC.takeLink({ addr: '1.0.1.0.1.0.2.2', from: [acct('1.0.1')], to: [], type: CLAIM });
  REC.takeLink({ addr: OTHER_HOME + '.0.2.1', from: [span(OTHER_HOME, 1, 5)], to: [span(D, 3, 10)], type: CITE });
  REC.takeLink({ addr: OTHER_HOME + '.0.2.2', from: [span(OTHER_HOME, 7, 5)], to: [span(D, 5, 4)], type: ENDORSE });
  REC.takeLink({ addr: OTHER_HOME + '.0.2.3', from: [span(OTHER_HOME, 9, 5)], to: [whole(D)], type: CITE });
}

beforeEach(() => build());

test('the owner\'s own link is marked at its span in the person\'s hue (the owner is the person)', () => {
  const s = LK.shown(D);
  assert.equal(s.length, 1);
  assert.equal(s[0].link.addr, D + '.0.2.1'); assert.equal(s[0].pos, 50); assert.equal(s[0].linker, 'you'); assert.equal(s[0].mark.hue, HUE.you);
  assert.equal(s[0].far, '1.0.1.0.127'); assert.equal(s[0].farWhole, true);
});

test('where the person is not the owner, the owner\'s link takes the owner\'s hue', () => {
  build({ session: '1.0.9' });
  assert.equal(LK.shown(D)[0].linker, 'owner'); assert.equal(LK.shown(D)[0].mark.hue, HUE.owner);
});

test('another\'s link is an overlay off by default — counted at its block, not shown', () => {
  const b1 = REC.doc(D).blocks[0];
  assert.deepEqual(LK.countAt(D, b1), { n: 1, social: true });
  assert.ok(!LK.shown(D).some((s) => s.link.owner === '1.0.2'));
  assert.equal(LK.othersTouching(D).length, 1);
});

test('the toggle shows others\' links attributed; a lens by owner admits them too', () => {
  LK.setOthers(D, true);
  assert.ok(LK.shown(D).some((s) => s.link.addr === OTHER_HOME + '.0.2.1' && s.linker === 'others' && s.mark.hue === HUE.others));
  assert.equal(LK.countAt(D, REC.doc(D).blocks[0]).n, 0, 'shown links are no longer counted');
  LK.setOthers(D, false); LK.lens(D, { owners: new Set(['1.0.2']) });
  assert.deepEqual(LK.shown(D).map((s) => s.link.owner), ['1.0.2'], 'the lens by owner shows the other and hides the person\'s own');
  LK.clearLens(D); LK.lens(D, { types: new Set([CITE]) });
  assert.equal(LK.shown(D).length, 1);
});

test('records, the claim, an account-named end and the social types never count or mark', () => {
  assert.equal(LK.classify(/** @type {any} */ (REC.link('1.0.1.0.1.0.2.1'))), 'record');
  assert.equal(LK.classify(/** @type {any} */ (REC.link('1.0.1.0.1.0.2.2'))), 'record');
  assert.equal(LK.classify(/** @type {any} */ (REC.link(OTHER_HOME + '.0.2.2'))), 'social');
  assert.equal(LK.classify(/** @type {any} */ (REC.link(OTHER_HOME + '.0.2.3'))), 'passage', 'a passage at its home, a whole-work end at D');
  assert.ok(!LK.shown(D).some((s) => s.link.type === ENROLL || s.link.type === CLAIM));
  assert.equal(LK.wholeLinks(D).length, 1, 'a whole-document end counts once, at the corner');
  assert.equal(LK.countAt(D, REC.doc(D).blocks[0]).n, 1, 'and never at a passage');
});

test('the badge counts the links a document holds; arriving until its links are read', () => {
  assert.deepEqual(LK.countDoc(D), { n: 1, social: false, arriving: false });
  assert.deepEqual(LK.countDoc('1.0.1.0.127'), { n: 0, social: false, arriving: true });
  assert.equal(LK.countAccount('1.0.1').arriving, false);
  assert.equal(LK.countAccount('1.0.1').n, 1);
});

test('the reveal chain: symbols at stage 2, beams at stage 3, hidden again on dismiss', () => {
  assert.equal(LK.symbols(D).length, 0);
  LK.reveal(D, 2); assert.equal(LK.symbols(D).length, 1); assert.equal(LK.beams(D).length, 0);
  LK.reveal(D, 3); assert.equal(LK.beams(D).length, 1);
  LK.hide(D); assert.equal(LK.symbols(D).length, 0);
});

test('a followed link is drawn lighter, its hue kept (D-3)', () => {
  const l = /** @type {any} */ (REC.link(D + '.0.2.1'));
  assert.equal(LK.markOf(l, D).value, 1);
  LK.follow(l);
  assert.ok(LK.visited(l));
  assert.equal(LK.markOf(l, D).value, VISITED_ALPHA);
  assert.equal(LK.markOf(l, D).hue, HUE.you);
});

test('the mid connections: one per document pair', () => {
  const c = LK.connections([D, '1.0.1.0.127', OTHER_HOME]);
  assert.deepEqual(c.map((x) => [x.a, x.b, x.count]), [[D, '1.0.1.0.127', 1]]);
});

test('the mid connections run between the places drawn: links into one mark are one connection with their count, a link inside one place none (P44)', () => {
  REC.takeLinks(D, [D + '.0.2.2']);
  REC.takeLink({ addr: D + '.0.2.2', from: [span(D, 70, 5)], to: [whole('1.0.1.0.128')], type: CITE });
  const mark = (/** @type {string} */ a) => (a === D ? D : '1.0.1:1');
  assert.deepEqual(LK.connections([D, '1.0.1.0.127', '1.0.1.0.128'], mark).map((x) => [x.a, x.b, x.count]), [[D, '1.0.1:1', 2]]);
  assert.deepEqual(LK.connections([D, '1.0.1.0.127'], () => '1.0.1:1'), [], 'both ends inside one mark: no line');
});
