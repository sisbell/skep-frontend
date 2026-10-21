// LK's test — the rule over a hand-built model: the owner's links marked,
// the person's own in their hue, the others' counted and not shown, the
// lenses filtering, each drawn link naming the document it is drawn at, a
// visited link lighter, the link lit at an arrival heavier and every other at
// the drawer's own weight, as the reader the app hands in names it (a mutant
// that weights by anything but the reader turns red), the records and
// account-named ends never counted, the badge arriving until read, the mid
// connections one per pair of places drawn, each holding once every link
// that joins their documents and that either document draws — the other
// document's owner's links into a drawn document among them, the passage
// link and the one naming it whole, whether that document is out of view,
// inside a mark nobody read or drawn with its links read (a mutant that
// decides a link at the drawn document alone, or keeps to the ends drawn
// there, turns red) — each link marked once from itself and its two
// documents, the owner of either document's link in the owner's hue
// whichever document comes first and whatever either's toggle (a mutant that
// merges the marks of a link's two ends turns red), and each connection
// marked with what its links share — neutral in the hue where their linkers
// differ, lighter only where every one was followed, heavier only where every
// one is lit (a mutant that keeps the first link's mark, or counts ends,
// turns red); a link's far end a connection's end whether the plane draws it
// or not — out of view, at the place it would stand at, carrying the count
// and the mark it carries in view — and no end where the plane draws its
// document nowhere; a far end naming a version member whole at its
// document's place; the most a reveal can set in a document's text, which no
// stage, toggle or lens moves or exceeds.
import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import * as REC from '../model/records.js';
import * as LK from './links.js';
import { HUE, NEUTRAL_HUE, VISITED_ALPHA, ARRIVAL_WEIGHT } from '../plane/register.js';

const CITE = '1.1.0.1.0.1.0.3.13', ENROLL = '1.1.0.1.0.1.0.3.1', CLAIM = '1.1.0.1.0.1.0.3.3', ENDORSE = '1.1.0.1.0.1.0.3.42';
const D = '1.0.1.0.3', OTHER_HOME = '1.0.2.0.5';
const span = (/** @type {string} */ doc, /** @type {number} */ ord, /** @type {number} */ w) => ({ start: `${doc}.0.1.${ord}`, width: '0.0.0.0.0.0.0.' + w, doc, account: doc.split('.').slice(0, 3).join('.'), whole: false, subspace: 1, ordinal: ord, positions: w });
const whole = (/** @type {string} */ doc) => ({ start: doc, width: '0.0.0.0.1', doc, account: doc.split('.').slice(0, 3).join('.'), whole: true, subspace: null, ordinal: null, positions: null });
const acct = (/** @type {string} */ a) => ({ start: a, width: '0.0.1', doc: null, account: a, whole: true, subspace: null, ordinal: null, positions: null });
/** the connections between two places, whichever of them is `a` */
const between = (/** @type {import('./links.js').Connection[]} */ cs, /** @type {string} */ x, /** @type {string} */ y) => cs.filter((c) => (c.a === x && c.b === y) || (c.a === y && c.b === x));

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

test('a drawn link names the document it is drawn at, whichever of its ends lies there', () => {
  LK.setOthers(D, true);
  const own = LK.shown(D).find((s) => s.link.addr === D + '.0.2.1');
  const other = LK.shown(D).find((s) => s.link.addr === OTHER_HOME + '.0.2.1');
  assert.equal(own?.end, 'from'); assert.equal(own?.near, D);
  assert.equal(other?.end, 'to'); assert.equal(other?.near, D, 'drawn at its to end, the link homed elsewhere: near is D');
  assert.equal(other?.far, OTHER_HOME, 'and the far end is the other document');
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

test('the most a reveal can set in a document\'s text: every passage end at it and each block\'s count as the hidden reveal counts it — the same at every stage, toggle and lens, and holding what each of them sets', () => {
  const blocks = REC.doc(D).blocks;
  const bound = () => { const u = LK.utmost(D); return { ends: u.shown.map((s) => [s.link.addr, s.end, s.pos, s.width]), counts: blocks.map((b) => u.countAt(b)) }; };
  const first = bound();
  assert.deepEqual(first.ends, [[D + '.0.2.1', 'from', 50, 10], [OTHER_HOME + '.0.2.1', 'to', 3, 10]], 'the owner\'s end and the other\'s; the social link, the whole-work end and the records left out');
  assert.deepEqual(first.counts, [{ n: 1, social: true }, { n: 0, social: true }], 'the other\'s link counted at its block, as the hidden reveal counts it');
  /** @type {Array<[string, () => void]>} */
  const states = [
    ['hidden', () => {}],
    ['symbols', () => LK.reveal(D, 2)],
    ['content with others\' links on', () => { LK.reveal(D, 3); LK.setOthers(D, true); }],
    ['a lens by the other\'s owner', () => { LK.setOthers(D, false); LK.lens(D, { owners: new Set(['1.0.2']) }); }],
    ['a lens by type', () => { LK.clearLens(D); LK.lens(D, { types: new Set([CITE]) }); }],
    ['dismissed', () => { LK.clearLens(D); LK.hide(D); }],
  ];
  for (const [name, move] of states) {
    move();
    const now = bound();
    assert.deepEqual(now, first, `${name}: the bound stands as it was`);
    const ends = now.ends.map((e) => e[0]);
    assert.ok(LK.symbols(D).every((s) => ends.includes(s.link.addr)), `${name}: every symbol the reveal sets is among its ends`);
    blocks.forEach((b, i) => assert.ok(LK.countAt(D, b).n <= first.counts[i].n, `${name}: no block's count above the bound's`));
  }
});

test('a followed link is drawn lighter, its hue kept (D-3)', () => {
  const l = /** @type {any} */ (REC.link(D + '.0.2.1'));
  assert.equal(LK.markOf(l, D).value, 1);
  LK.follow(l);
  assert.ok(LK.visited(l));
  assert.equal(LK.markOf(l, D).value, VISITED_ALPHA);
  assert.equal(LK.markOf(l, D).hue, HUE.you);
});

test('links merged at one site carry what they share and are neutral in what they do not, whatever their order (P44)', () => {
  const yours = { hue: HUE.you, linker: 'you', form: [], value: VISITED_ALPHA, weight: ARRIVAL_WEIGHT, own: true };
  const others = { hue: HUE.others, linker: 'others', form: [], value: 1, weight: 1, own: false };
  assert.deepEqual(LK.mergedMark([yours, { ...yours }]), yours, 'what every member shares stands');
  for (const marks of [[yours, others], [others, yours]]) {
    assert.deepEqual(LK.mergedMark(/** @type {any} */ (marks)), { hue: NEUTRAL_HUE, linker: null, form: [], value: 1, weight: 1, own: false }, `${marks[0].linker}'s first`);
  }
});

test('the link lit at an arrival is drawn heavier, every other at the drawer\'s own weight — read through the reader handed in, none lit until it is', () => {
  const own = /** @type {any} */ (REC.link(D + '.0.2.1')), other = /** @type {any} */ (REC.link(OTHER_HOME + '.0.2.1'));
  const weights = () => [LK.markOf(own, D).weight, LK.markOf(other, D).weight];
  assert.deepEqual(weights(), [1, 1], 'no reader handed in: none lit');
  LK.readers({ lit: () => D + '.0.2.1' });
  assert.deepEqual(weights(), [ARRIVAL_WEIGHT, 1], 'the link the reader names heavier, the other at its own');
  assert.equal(LK.shown(D)[0].mark.weight, ARRIVAL_WEIGHT, 'as drawn at its span');
  assert.equal(LK.markOf(own, D).hue, HUE.you, 'its hue kept');
  LK.readers({ lit: () => OTHER_HOME + '.0.2.1' });
  assert.deepEqual(weights(), [1, ARRIVAL_WEIGHT], 'the reader naming another: that one heavier');
  LK.readers({ lit: () => null });
  assert.deepEqual(weights(), [1, 1], 'the reader naming none: none lit');
});

test('the mid connections: one per document pair, each holding the links that join the two', () => {
  const c = LK.connections([D, '1.0.1.0.127', OTHER_HOME]);
  assert.deepEqual(c.map((x) => [x.a, x.b, x.count]), [[D, '1.0.1.0.127', 1], [D, OTHER_HOME, 2]], 'D\'s citation of 1.0.1.0.127; the other document\'s owner\'s two links into D, met in D\'s links');
});

test('the mid connections run between the places drawn: links into one mark are one connection with their count, a link inside one place none (P44)', () => {
  REC.takeLinks(D, [D + '.0.2.2']);
  REC.takeLink({ addr: D + '.0.2.2', from: [span(D, 70, 5)], to: [whole('1.0.1.0.128')], type: CITE });
  /** D at its box, the account's other documents inside its first continuation's mark, the other account's at their boxes */
  const mark = (/** @type {string} */ a) => (a !== D && a.startsWith('1.0.1.0.') ? '1.0.1:1' : a);
  assert.deepEqual(LK.connections([D, '1.0.1.0.127', '1.0.1.0.128'], mark).map((x) => [x.a, x.b, x.count]), [[D, '1.0.1:1', 2], [D, OTHER_HOME, 2]]);
  assert.deepEqual(LK.connections([D, '1.0.1.0.127'], () => '1.0.1:1'), [], 'both ends inside one mark: no line');
});

test('a mid connection counts each link once: one shown at both its documents, or with two passages in one', () => {
  const E = '1.0.1.0.4';
  REC.takeLinks(D, [D + '.0.2.9']); REC.takeLinks(E, [D + '.0.2.9']);
  REC.takeLink({ addr: D + '.0.2.9', from: [span(D, 20, 5)], to: [span(E, 1, 5)], type: CITE });
  assert.ok(LK.shown(E).some((s) => s.link.addr === D + '.0.2.9'), 'the person\'s link is shown at both its documents');
  assert.deepEqual(between(LK.connections([D, E]), D, E).map((x) => [x.a, x.b, x.count]), [[D, E, 1]]);
  build();
  REC.takeLinks(D, [D + '.0.2.9']);
  REC.takeLink({ addr: D + '.0.2.9', from: [span(D, 30, 2), span(D, 40, 2)], to: [span(E, 8, 2)], type: CITE });
  assert.equal(LK.shown(D).filter((s) => s.link.addr === D + '.0.2.9').length, 2, 'two passages in D: two ends drawn there');
  assert.deepEqual(between(LK.connections([D, E]), D, E).map((x) => [x.a, x.b, x.count]), [[D, E, 1]], 'read at D alone: one link');
});

test('a mid connection is marked with what its links share: the linker\'s hue where they share one, neutral where theirs differ, lighter only where every one was followed (P44)', () => {
  const F = '1.0.3.0.8', G = '1.0.4.0.2';
  REC.takeLinks(D, [D + '.0.2.9', G + '.0.2.1']);
  REC.takeLink({ addr: D + '.0.2.9', from: [span(D, 20, 5)], to: [span(F, 30, 5)], type: CITE });
  // a third party's link joining the two: neither document's owner's, nor the person's
  REC.takeLink({ addr: G + '.0.2.1', from: [span(D, 60, 5)], to: [span(F, 40, 5)], type: CITE });
  const at = () => between(LK.connections([D, F]), D, F).map((c) => ({ count: c.count, hue: c.mark.hue, linker: c.mark.linker, value: c.mark.value, own: c.mark.own }));
  assert.deepEqual(at(), [{ count: 1, hue: HUE.you, linker: 'you', value: 1, own: true }], 'the person\'s link alone: their hue, the third party\'s an overlay off at both documents');
  LK.setOthers(D, true);
  assert.deepEqual(at(), [{ count: 2, hue: NEUTRAL_HUE, linker: null, value: 1, own: false }], 'the third party\'s link beside it: neutral, never the first link\'s hue');
  LK.follow(D + '.0.2.9');
  assert.equal(at()[0].value, 1, 'the first of the two followed: drawn full, never the first link\'s value');
  LK.follow(G + '.0.2.1');
  assert.deepEqual([at()[0].value, at()[0].hue], [VISITED_ALPHA, NEUTRAL_HUE], 'both followed: drawn lighter, the hue still neutral');
});

test('a link the owner of either document made draws its connection in the owner\'s hue, counted once, whichever document comes first and whatever the other\'s toggle (foundations §2.1: "the owner of either")', () => {
  build({ session: '1.0.9' });
  const X = '1.0.5.0.2';
  REC.takeLinks(D, [D + '.0.2.9']); REC.takeLinks(X, [D + '.0.2.9']);
  REC.takeLink({ addr: D + '.0.2.9', from: [span(D, 20, 5)], to: [span(X, 30, 5)], type: CITE });
  for (const on of [false, true]) {
    LK.setOthers(X, on);
    for (const order of [[D, X], [X, D]]) {
      assert.deepEqual(between(LK.connections(order), D, X).map((c) => [c.count, c.mark.hue, c.mark.linker]), [[1, HUE.owner, 'owner']], `${order.join(' then ')}, the other document's toggle ${on ? 'on' : 'off'}`);
    }
  }
  assert.deepEqual([LK.shown(D).find((s) => s.link.addr === D + '.0.2.9')?.linker, LK.shown(X).map((s) => s.linker)], ['owner', ['others']], 'at its spans each document marks it as its own composition does: D\'s owner\'s at D, another\'s at the other');
});

test('the other document\'s owner\'s links into D are one connection, its count theirs and its hue the owner\'s, wherever that document stands: out of view, inside a mark nobody read, or drawn with its links read (foundations §2.1: "the owner of either")', () => {
  const at = (/** @type {import('./links.js').Connection[]} */ cs, /** @type {string} */ there) => between(cs, D, there).map((c) => [c.count, c.mark.hue, c.mark.linker]);
  const theirs = [[2, HUE.owner, 'owner']];
  assert.deepEqual(at(LK.connections([D]), OTHER_HOME), theirs, 'its document out of view: to its box — the passage link another\'s at D, and the one naming D whole drawn at its passage there');
  assert.deepEqual(at(LK.connections([D], (a) => (a === OTHER_HOME ? '1.0.2:1' : a)), '1.0.2:1'), theirs, 'its document inside a mark whose members\' links no read brings');
  REC.takeLinks(OTHER_HOME, [OTHER_HOME + '.0.2.1', OTHER_HOME + '.0.2.2', OTHER_HOME + '.0.2.3']);
  assert.deepEqual(at(LK.connections([D, OTHER_HOME]), OTHER_HOME), theirs, 'its document drawn, its links read');
  assert.deepEqual(at(LK.connections([OTHER_HOME]), OTHER_HOME), theirs, 'D out of view, the links met at the other document alone');
  LK.setOthers(D, true);
  assert.deepEqual(at(LK.connections([D]), OTHER_HOME), theirs, 'D\'s toggle on, letting the passage link in at D too: still the owner\'s, never neutral');
});

test('a link whose far end the plane does not draw is still a connection, to the place its far end stands at; none where the plane draws that document nowhere (foundations §2.1)', () => {
  const ends = (/** @type {import('./links.js').Connection[]} */ cs) => cs.map((x) => [x.a, x.b, x.count]);
  assert.deepEqual(ends(LK.connections([D])), [[D, '1.0.1.0.127', 1], [D, OTHER_HOME, 2]], 'drawn at D alone: the citation of 1.0.1.0.127 to its box, and the other document\'s owner\'s two links to its');
  assert.deepEqual(ends(LK.connections([D], (a) => (a === '1.0.1.0.127' ? '1.0.1:1' : a))), [[D, '1.0.1:1', 1], [D, OTHER_HOME, 2]], 'to the mark that would hold it');
  assert.deepEqual(LK.connections([D], (a) => (a === D ? D : null)), [], 'their documents drawn nowhere: no connection');
  assert.deepEqual(LK.connections([D], (a) => (a === D ? null : a)), [], 'the near document drawn nowhere: none from it');
});

test('a connection to a far end out of view carries what one in view does: its count and its mark', () => {
  for (const far of ['1.0.1.0.127', OTHER_HOME]) {
    const pair = (/** @type {string[]} */ drawn) => between(LK.connections(drawn), D, far).map((c) => ({ count: c.count, mark: c.mark }));
    assert.deepEqual(pair([D]), pair([D, far]), far);
    assert.equal(pair([D]).length, 1, far);
  }
});

test('a far end naming a version member whole stands at its document\'s place, the box the two share', () => {
  const E = '1.0.1.0.4', E2 = E + '.2';
  REC.takeLinks(D, [D + '.0.2.7']);
  REC.takeLink({ addr: D + '.0.2.7', from: [span(D, 80, 5)], to: [whole(E2)], type: CITE });
  assert.equal(LK.shown(D).find((s) => s.link.addr === D + '.0.2.7')?.far, E2, 'the end names the member');
  /** @type {string[]} */
  const asked = [];
  const cs = LK.connections([D, E], (a) => { asked.push(a); return a; });
  assert.deepEqual(between(cs, D, E).map((x) => [x.a, x.b, x.count]), [[D, E, 1]]);
  assert.ok(!asked.includes(E2) && !cs.some((c) => c.a === E2 || c.b === E2), 'no place asked for, or drawn at, the member\'s own address');
});
