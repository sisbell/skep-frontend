// LK's test — the rule over a hand-built model: the owner's links marked,
// the person's own in their hue, the others' counted and not shown, the
// lenses filtering, each drawn link naming the document it is drawn at, a
// visited link lighter, each link lit at an arrival heavier and every other at
// the drawer's own weight, as the reader the app hands in names them — two
// lit at once both heavier (a mutant that weights by anything but the reader,
// or by its first link alone, turns red), the records and
// account-named ends never counted, the badge arriving until read and
// counting what is homed in a document's version members with its own, a
// member's own alone (a mutant that matches a home by equality, or by its
// trunk, turns red), the mid connections one per pair of places drawn, each
// holding once every link that joins their documents and that either
// document draws — the other document's owner's links into a drawn document
// among them, the passage link and the one naming it whole, whether that
// document is out of view, inside a mark nobody read or drawn with its links
// read (a mutant that decides a link at the drawn document alone, or keeps to
// the ends drawn there, turns red) — each link marked once from itself and
// its two documents, the owner of either document's link in the owner's hue
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
// stage, toggle or lens moves or exceeds. Each end drawn where its bytes
// stand now, through the held image, never at the position its slot stores
// — marks, symbols, the others' count and the size's bound moved with an
// edit (a mutant that draws at the stored ordinal, or counts by it, turns
// red), each carrying its key, the span its slot stores, so a link's two
// ends at one document are told apart and keep their keys through an edit
// (a mutant keying an end by where it stands turns red); an end the text
// holds in two stretches one drawn end standing in both, met at a span by
// either (a mutant that keeps the first stretch alone turns red); none
// drawn where no image is held, the badge and the toggle's
// count reading no position; and each far end where `project` answers it
// sits now — elsewhere than stored, floating where the text holds none of
// it, placed nowhere where no answer is held or it was refused, never for a
// document named whole. An end drawn at every document whose text holds its
// bytes, whichever document minted them: a passage a document transcludes
// marked there, counted at its paragraph, in the toggle's count and in the
// size's bound, its box drawing no connection for it (a mutant joining a
// document by the ends its text holds turns red), and the bytes a member
// shares with its trunk drawn at the member where they stand in its text (a
// mutant that draws an end at the document that minted its bytes alone
// turns red); the minting document holding its own before any image is read
// (a mutant that holds an end by the held text alone turns the connections
// and the toggle's count above red). A LINK WHOSE FAR DOCUMENT THE PLANE
// DRAWS NOWHERE (issue #132) stays in the set — marked, its symbol set,
// counted — and is tailed: no beam, until its far document is drawn (a
// mutant that drops it from the set, or keeps its beam, turns red); the
// tails one per place a drawn document stands at, each link joining it to a
// document drawn nowhere once, with its far end, merged in one mark, a link
// with a drawn far document a connection and never a tail (a mutant that
// draws such a link nowhere, or as both, turns red); a far end named by its
// address and what the page holds of its document — nothing answered, the
// address alone, never a guess from the index's silence (a mutant that says
// "no document here yet" from the index alone turns red); the board saying
// nothing of it, "nothing this board will say about this address", or "no
// document here yet" in the reader's own account under a complete index
// listing none there; withheld, "withheld · ⟨owner⟩" by the owner rule
// handed in; readable, its first line where the page holds one.
import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import * as REC from '../model/records.js';
import * as LK from './links.js';
import { HUE, NEUTRAL_HUE, VISITED_ALPHA, ARRIVAL_WEIGHT } from '../plane/register.js';
import { t } from '../strings.js';

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
  // its V→I image: its own bytes, where nothing has moved them
  REC.takeImage(D, 1, [{ iStart: D + '.0.1.1', width: 100 }]);
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

test('the badge counts what is homed in a document\'s version members with its own, and at a member its own alone; the account counts each once', () => {
  const M = D + '.2';
  REC.takeLinks(D, [M + '.0.2.1']);
  REC.takeLink({ addr: M + '.0.2.1', from: [span(D, 20, 5)], to: [whole('1.0.1.0.127')], type: CITE });
  REC.takeLinks(M, [M + '.0.2.1', D + '.0.2.1']);
  assert.deepEqual(LK.countDoc(D), { n: 2, social: false, arriving: false }, 'its own citation and the one homed in its second member');
  assert.deepEqual(LK.countDoc(M), { n: 1, social: false, arriving: false }, 'the member: the citation homed in it, never its trunk\'s');
  assert.equal(LK.countAccount('1.0.1').n, 2, 'the account: each once');
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

test('each link lit at an arrival is drawn heavier, every other at the drawer\'s own weight — read through the reader handed in, none lit until it is', () => {
  const own = /** @type {any} */ (REC.link(D + '.0.2.1')), other = /** @type {any} */ (REC.link(OTHER_HOME + '.0.2.1'));
  const weights = () => [LK.markOf(own, D).weight, LK.markOf(other, D).weight];
  assert.deepEqual(weights(), [1, 1], 'no reader handed in: none lit');
  LK.readers({ lit: () => [D + '.0.2.1'] });
  assert.deepEqual(weights(), [ARRIVAL_WEIGHT, 1], 'the link the reader names heavier, the other at its own');
  assert.equal(LK.shown(D)[0].mark.weight, ARRIVAL_WEIGHT, 'as drawn at its span');
  assert.equal(LK.markOf(own, D).hue, HUE.you, 'its hue kept');
  LK.readers({ lit: () => [OTHER_HOME + '.0.2.1'] });
  assert.deepEqual(weights(), [1, ARRIVAL_WEIGHT], 'the reader naming another: that one heavier');
  LK.readers({ lit: () => [OTHER_HOME + '.0.2.1', D + '.0.2.1'] });
  assert.deepEqual(weights(), [ARRIVAL_WEIGHT, ARRIVAL_WEIGHT], 'the reader naming both — the one Back came back along and the one a notice came from: both heavier');
  LK.readers({ lit: () => [] });
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
  REC.takeLinks(D, [D + '.0.2.9']); REC.takeLinks(E, [D + '.0.2.9']); REC.takeImage(E, 1, [{ iStart: E + '.0.1.1', width: 10 }]);
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
  REC.takeLinks(D, [D + '.0.2.9']); REC.takeLinks(X, [D + '.0.2.9']); REC.takeImage(X, 1, [{ iStart: X + '.0.1.1', width: 40 }]);
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

/** D as its second member arranges it: twenty bytes the member minted before D's own hundred, which stand from 21 */
function movedOn() {
  REC.takeDelivery(D, [{ pos: 1, width: 120, kind: 'content', text: 'z'.repeat(18) + '\n\n' + 'x'.repeat(40) + '\n\n' + 'y'.repeat(58), ref: null, origin: null }]);
  REC.takeImage(D, 1, [{ iStart: D + '.2.0.1.1', width: 20 }, { iStart: D + '.0.1.1', width: 100 }]);
}

test('an end stands where its bytes stand now, never at the position its slot stores: marks, symbols and the others\' count move with an edit', () => {
  movedOn();
  const [first, second, third] = REC.doc(D).blocks;
  assert.deepEqual([first.pos, second.pos, third.pos], [1, 21, 63]);
  const own = LK.shown(D).find((s) => s.link.addr === D + '.0.2.1');
  assert.deepEqual(own && [own.pos, own.width, own.runs, own.nearEnd.ordinal], [70, 10, [{ pos: 70, width: 10 }], 50], 'the citation stored at 50 stands at 70, its stored span kept as its identity');
  assert.deepEqual([first, second, third].map((b) => LK.countAt(D, b).n), [0, 1, 0], 'another\'s link stored at 3 counted at the paragraph its bytes stand in now');
  LK.reveal(D, 2);
  assert.deepEqual(LK.symbols(D).map((s) => s.pos), [70], 'its symbol there');
  assert.deepEqual(LK.shownAt(D, { pos: 50, width: 10 }), [], 'nothing drawn at the stored position');
  assert.deepEqual(LK.utmost(D).shown.map((s) => [s.link.addr, s.pos]), [[D + '.0.2.1', 70], [OTHER_HOME + '.0.2.1', 23]], 'the size\'s bound where they stand');
});

test('each end drawn carries its key, the span its slot stores (`endKey`): a link\'s two ends at one document told apart, each keeping its key wherever an edit moves it', () => {
  REC.takeLinks(D, [D + '.0.2.9']);
  REC.takeLink({ addr: D + '.0.2.9', from: [span(D, 30, 2)], to: [span(D, 60, 2)], type: CITE });
  const from = LK.endKey(span(D, 30, 2)), to = LK.endKey(span(D, 60, 2));
  assert.deepEqual([from, to, LK.endKey(whole('1.0.1.0.127'))], [D + '.0.1.30+0.0.0.0.0.0.0.2', D + '.0.1.60+0.0.0.0.0.0.0.2', '1.0.1.0.127@whole'], 'a passage keyed by its first address and its width, a document named whole by its address');
  const ends = () => LK.shown(D).filter((s) => s.link.addr === D + '.0.2.9').map((s) => [s.end, s.pos, s.key]);
  assert.deepEqual(ends(), [['from', 30, from], ['to', 60, to]], 'its two ends in D, two keys');
  movedOn();
  assert.deepEqual(ends(), [['from', 50, from], ['to', 80, to]], 'moved by an edit: each standing elsewhere, its key its own still');
});

test('an end the text holds in two stretches is one drawn end standing in both, met at a span by either; one the held text places nowhere is not drawn', () => {
  // D's own bytes 51 to 55 cut from 56 to 60 by a window of five bytes of another document
  REC.takeDelivery(D, [{ pos: 1, width: 105, kind: 'content', text: 'x'.repeat(40) + '\n\n' + 'y'.repeat(63), ref: null, origin: null }]);
  REC.takeImage(D, 1, [{ iStart: D + '.0.1.1', width: 55 }, { iStart: '1.0.1.0.7.0.1.1', width: 5 }, { iStart: D + '.0.1.56', width: 45 }]);
  const own = LK.shown(D).filter((s) => s.link.addr === D + '.0.2.1');
  assert.deepEqual(own.map((s) => [s.pos, s.width, s.runs]), [[50, 6, [{ pos: 50, width: 6 }, { pos: 61, width: 4 }]]], 'one drawn end, its first stretch its position, both its stretches carried');
  assert.equal(LK.shownAt(D, { pos: 62, width: 1 }).length, 1, 'a span meeting its second stretch alone meets it');
  assert.equal(LK.shownAt(D, { pos: 56, width: 5 }).length, 0, 'the window between them is no part of it');
  build();
  REC.invalidate(D);
  REC.takeDelivery(D, [{ pos: 1, width: 100, kind: 'content', text: 'x'.repeat(40) + '\n\n' + 'y'.repeat(58), ref: null, origin: null }]);
  REC.takeLinks(D, [D + '.0.2.1', OTHER_HOME + '.0.2.1']);
  assert.deepEqual([LK.shown(D), LK.countAt(D, REC.doc(D).blocks[0]).n], [[], 0], 'no image read: no end drawn, none counted at a passage');
  assert.deepEqual([LK.countDoc(D).n, LK.othersTouching(D).length], [1, 1], 'the badge and the toggle\'s count read no position');
});

test('a far end stands where `project` answers it sits now: placed elsewhere than stored, floating where the text holds none of it, placed nowhere where no answer is held or the board refused it, and never for a document named whole', () => {
  LK.setOthers(D, true);
  const at = () => /** @type {import('./links.js').Shown} */ (LK.shown(D).find((s) => s.link.addr === OTHER_HOME + '.0.2.1'));
  assert.deepEqual([at().farSlot, at().farRuns, LK.floats(at()), LK.farPos(at())], [1, null, false, null], 'unread: placed nowhere, never at the stored position');
  REC.takeProjection(OTHER_HOME + '.0.2.1', 1, OTHER_HOME, [{ pos: 9, width: 3 }, { pos: 2, width: 2 }]);
  assert.deepEqual([at().farRuns, LK.floats(at()), LK.farPos(at())], [[{ pos: 2, width: 2 }, { pos: 9, width: 3 }], false, 2], 'where it stands now, in the text\'s order — its stored position 1');
  REC.takeProjection(OTHER_HOME + '.0.2.1', 1, OTHER_HOME, []);
  assert.deepEqual([at().farRuns, LK.floats(at()), LK.farPos(at())], [[], true, null], 'none: it floats');
  REC.takeProjection(OTHER_HOME + '.0.2.1', 1, OTHER_HOME, 'refused');
  assert.deepEqual([at().farRuns, LK.floats(at())], [null, false], 'refused: placed nowhere, and no word of floating');
  const own = /** @type {import('./links.js').Shown} */ (LK.shown(D).find((s) => s.link.addr === D + '.0.2.1'));
  REC.takeProjection(D + '.0.2.1', 2, '1.0.1.0.127', []);
  assert.deepEqual([own.farSlot, LK.shown(D).find((s) => s.link.addr === D + '.0.2.1')?.farRuns, LK.floats(own)], [2, null, false], 'a far end naming its document whole stands at no passage and never floats');
});

test('an end stands at every document whose text holds its bytes: a passage D transcludes from another document is marked, counted and fitted there as D\'s own bytes are, and D\'s box draws no connection for it, its link joining the document that minted them', () => {
  const S = '1.0.2.0.9', MINE = D + '.0.2.5', THEIRS = S + '.0.2.1';
  // D's own hundred bytes, then twenty of S's it transcludes, a paragraph of their own from 101
  REC.takeDelivery(D, [{ pos: 1, width: 120, kind: 'content', text: 'x'.repeat(40) + '\n\n' + 'y'.repeat(56) + '\n\n' + 'z'.repeat(20), ref: null, origin: null }]);
  REC.takeImage(D, 1, [{ iStart: D + '.0.1.1', width: 100 }, { iStart: S + '.0.1.1', width: 20 }]);
  // the person's link homed at D from S's third to sixth bytes, and S's owner's from its tenth to fourteenth: both on the bytes D transcludes
  REC.takeLinks(D, [MINE, THEIRS]);
  REC.takeLink({ addr: MINE, from: [span(S, 3, 4)], to: [whole('1.0.1.0.127')], type: CITE });
  REC.takeLink({ addr: THEIRS, from: [span(S, 10, 5)], to: [span(OTHER_HOME, 20, 3)], type: CITE });
  const at = () => LK.shown(D).filter((s) => s.link.addr === MINE || s.link.addr === THEIRS).map((s) => [s.link.addr, s.near, s.end, s.pos, s.width, s.linker]);
  assert.deepEqual(at(), [[MINE, D, 'from', 103, 4, 'you']], 'the person\'s link marked at the transcluded passage, where its bytes stand in D now');
  const blocks = REC.doc(D).blocks;
  assert.deepEqual(blocks.map((b) => LK.countAt(D, b).n), [1, 0, 1], 'S\'s owner\'s link, another\'s at D, counted at the transcluded paragraph, as the other\'s link into D\'s own first one is');
  assert.deepEqual(LK.othersTouching(D).map((l) => l.addr).sort(), [OTHER_HOME + '.0.2.1', THEIRS].sort(), 'and in the toggle\'s count');
  assert.deepEqual(LK.utmost(D).shown.filter((s) => s.link.addr === MINE || s.link.addr === THEIRS).map((s) => [s.link.addr, s.pos]), [[MINE, 103], [THEIRS, 110]], 'the size\'s bound holding both');
  LK.setOthers(D, true);
  assert.deepEqual(at(), [[MINE, D, 'from', 103, 4, 'you'], [THEIRS, D, 'from', 110, 5, 'others']], 'the toggle on: S\'s owner\'s shown there too, attributed as another\'s');
  assert.equal(LK.countAt(D, blocks[2]).n, 0, 'and no longer counted');
  assert.deepEqual(LK.connections([D]).map((c) => [c.a, c.b, c.count]), [[D, '1.0.1.0.127', 1], [D, OTHER_HOME, 2]], 'D\'s box joined by its own citation and the other document\'s two links into its own bytes alone: the two on the bytes it transcludes join S');
});

test('a version member draws its trunk\'s links at the bytes it shares with it, where they stand in its text, and counts the others\' there', () => {
  const M = D + '.2';
  // the second member's text: twenty bytes minted under its chain, then its trunk's hundred from 21
  REC.takeDelivery(M, [{ pos: 1, width: 120, kind: 'content', text: 'z'.repeat(18) + '\n\n' + 'x'.repeat(40) + '\n\n' + 'y'.repeat(58), ref: null, origin: null }]);
  REC.takeImage(M, 1, [{ iStart: M + '.0.1.1', width: 20 }, { iStart: D + '.0.1.1', width: 100 }]);
  REC.takeLinks(M, [D + '.0.2.1', OTHER_HOME + '.0.2.1']);
  assert.deepEqual(LK.shown(M).map((s) => [s.link.addr, s.near, s.pos, s.width]), [[D + '.0.2.1', M, 70, 10]], 'the person\'s citation, stored at D\'s 50, drawn at the member where its bytes stand');
  assert.deepEqual(REC.doc(M).blocks.map((b) => LK.countAt(M, b).n), [0, 1, 0], 'another\'s link into D\'s third byte counted at the member\'s paragraph that byte stands in');
});

test('a link whose far document the plane draws nowhere stays in the set — marked at its span, its symbol set, counted, named — and is tailed: it draws no beam; once its far document is drawn, its beam stands again (issue #132)', () => {
  const drawn = new Set([D, OTHER_HOME]);
  LK.readers({ drawn: (a) => drawn.has(a) });
  LK.reveal(D, 3);
  const own = () => /** @type {import('./links.js').Shown} */ (LK.shown(D).find((s) => s.link.addr === D + '.0.2.1'));
  assert.ok(own() && LK.tailed(own()), 'its far document, 1.0.1.0.127, drawn nowhere: tailed');
  assert.deepEqual([LK.symbols(D).map((s) => s.link.addr), LK.countDoc(D).n], [[D + '.0.2.1'], 1], 'its symbol set at its span, and counted');
  assert.deepEqual(LK.beams(D), [], 'no beam, which would point at the address\'s place');
  drawn.add('1.0.1.0.127');
  assert.ok(!LK.tailed(own()), 'its far document drawn: no longer tailed');
  assert.deepEqual(LK.beams(D).map((s) => s.link.addr), [D + '.0.2.1'], 'its beam again');
  LK.readers({});
  assert.ok(!LK.tailed(own()), 'no reader handed in: every document drawn, nothing tailed');
});

test('the tails: one per place a drawn document stands at, holding once each link joining it to a document the plane draws nowhere, drawn at either — with its far end there and its mark — the links merged in one mark; a link whose other document has a place is a connection, never a tail (issue #132)', () => {
  // 1.0.1.0.127 drawn nowhere: D's citation of it whole a tail, the other document's owner's two links into D a connection
  const nowhere127 = (/** @type {string} */ a) => (a === '1.0.1.0.127' ? null : a);
  assert.deepEqual(LK.connections([D], nowhere127).map((c) => [c.a, c.b, c.count]), [[D, OTHER_HOME, 2]], 'the connection: the other document\'s two links');
  const one = LK.tails([D], nowhere127);
  assert.deepEqual(one.map((x) => [x.at, x.docs, x.ends.map((e) => [e.link.addr, e.far, e.farSlot, e.farWhole])]), [[D, [D], [[D + '.0.2.1', '1.0.1.0.127', 2, true]]]], 'the tail: D\'s citation, its far end the to slot\'s whole 1.0.1.0.127');
  assert.deepEqual([one[0].mark.hue, one[0].ends[0].mark.hue], [HUE.you, HUE.you], 'the person\'s link in their hue');
  // the other document drawn nowhere too: its two links into D join D's tail, each once, its passage end the from slot's; no connection
  const onlyD = (/** @type {string} */ a) => (a === D ? D : null);
  assert.deepEqual(LK.connections([D], onlyD), [], 'no connection');
  const both = LK.tails([D], onlyD);
  assert.deepEqual(both.map((x) => [x.at, x.ends.map((e) => [e.link.addr, e.far, e.farSlot])]), [[D, [[D + '.0.2.1', '1.0.1.0.127', 2], [OTHER_HOME + '.0.2.1', OTHER_HOME, 1], [OTHER_HOME + '.0.2.3', OTHER_HOME, 1]]]], 'each link once, in the order met');
  assert.deepEqual([both[0].mark.hue, both[0].mark.linker], [NEUTRAL_HUE, null], 'the person\'s and the other owner\'s merged: neutral (P44)');
  // every document drawn: no tail
  assert.deepEqual(LK.tails([D, OTHER_HOME, '1.0.1.0.127']), [], 'every far document drawn: no tail');
  // two drawn documents inside one mark: one tail at the mark, holding the links of both
  const E = '1.0.1.0.60';
  REC.takeLinks(E, [E + '.0.2.1']);
  REC.takeLink({ addr: E + '.0.2.1', from: [span(E, 2, 3)], to: [whole('1.0.1.0.1049578')], type: CITE });
  const mark = (/** @type {string} */ a) => (a === '1.0.1.0.127' || a === '1.0.1.0.1049578' ? null : a === D || a === E ? '1.0.1:1' : a);
  assert.deepEqual(LK.tails([D, E], mark).map((x) => [x.at, x.docs, x.ends.map((e) => e.link.addr)]), [['1.0.1:1', [D, E], [D + '.0.2.1', E + '.0.2.1']]], 'one tail at the mark, its documents and their links');
});

test('a far end is named by its address, then what the page holds of its document: nothing answered, the address alone; readable, its first line; withheld, "withheld · ⟨owner⟩" by the owner rule handed in; the board saying nothing of it, "nothing this board will say about this address" — "no document here yet" in the reader\'s own account under a complete index listing none there — never from the index\'s silence alone (issue #132)', () => {
  const GHOST = '1.0.1.0.1049578', HIDDEN = '1.0.2.0.7', THEIR_GHOST = '1.0.2.0.99';
  const [TO_GHOST, TO_HIDDEN, TO_THEIRS] = [20, 21, 22].map((k) => `${D}.0.2.${k}`);
  REC.takeLinks(D, [TO_GHOST, TO_HIDDEN, TO_THEIRS]);
  REC.takeLink({ addr: TO_GHOST, from: [span(D, 60, 3)], to: [whole(GHOST)], type: CITE });
  REC.takeLink({ addr: TO_HIDDEN, from: [span(D, 64, 3)], to: [span(HIDDEN, 2, 3)], type: CITE });
  REC.takeLink({ addr: TO_THEIRS, from: [span(D, 68, 3)], to: [span(THEIR_GHOST, 1, 3)], type: CITE });
  const end = (/** @type {string} */ l) => /** @type {import('./links.js').Shown} */ (LK.shown(D).find((s) => s.link.addr === l));
  const named = (/** @type {string} */ l) => LK.farLabel(end(l));
  // nothing answered: the index complete, lists nothing at the ghost's address in the reader's own account, and still says nothing
  assert.ok(REC.countsExact() && !REC.place(GHOST) && REC.session()?.account === '1.0.1');
  assert.deepEqual([named(TO_GHOST), named(TO_HIDDEN), named(D + '.0.2.1')], [GHOST, HIDDEN, '1.0.1.0.127'], 'nothing answered: the address alone, never a guess from the index\'s silence');
  // the board says nothing of the ghost's address: in the reader's own account, the index complete and listing none there
  REC.takeRefused(GHOST, 'unregistered');
  assert.equal(named(TO_GHOST), `${GHOST} · ${t('L.far.empty')}`);
  REC.setIndexState({ arm: 'at_the_floor', floor: 9 });
  assert.equal(named(TO_GHOST), `${GHOST} · ${t('L.far.unregistered')}`, 'the index from a floor: nothing this board will say');
  REC.setIndexState({ arm: 'complete' });
  REC.setSession({ session: 's-2', principal: 2, account: '1.0.9' });
  assert.equal(named(TO_GHOST), `${GHOST} · ${t('L.far.unregistered')}`, 'another reader\'s account: nothing this board will say');
  REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  // the projection the plane makes says the same: the other account's ghost, the draft withheld
  REC.takeProjection(TO_THEIRS, 2, THEIR_GHOST, 'unregistered');
  REC.takeProjection(TO_HIDDEN, 2, HIDDEN, 'withheld');
  assert.equal(named(TO_THEIRS), `${THEIR_GHOST} · ${t('L.far.unregistered')}`, 'another account\'s address, its projection refused doc_not_registered');
  assert.equal(named(TO_HIDDEN), `${HIDDEN} · ${t('F.corner.withheld', { owner: '1.0.2' })}`, 'withheld: its owner by its account, where no owner rule is handed in');
  LK.readers({ owner: (a) => (a === HIDDEN ? '1.0.4' : '') });
  assert.equal(named(TO_HIDDEN), `${HIDDEN} · ${t('F.corner.withheld', { owner: '1.0.4' })}`, 'its owner by the owner rule handed in');
  // a refusal that says nothing of the document: the address alone
  REC.takeProjection(TO_HIDDEN, 2, HIDDEN, 'refused');
  assert.equal(named(TO_HIDDEN), HIDDEN, 'refused for another reason: nothing said of the document');
  // readable: answered, its first line where the page holds one
  REC.takeProjection(TO_HIDDEN, 2, HIDDEN, [{ pos: 2, width: 3 }]);
  assert.equal(named(TO_HIDDEN), HIDDEN, 'answered, no first line held: the address alone');
  REC.takeDelivery(HIDDEN, [{ pos: 1, width: 30, kind: 'content', text: '## A heading line\nand more\n\nnext', ref: null, origin: null }]);
  assert.equal(named(TO_HIDDEN), `${HIDDEN} · A heading line`, 'its text read: its first line, its heading\'s marks dropped');
  REC.takeIndex(/** @type {any} */ ({ docs: [{ doc: D, kind: 'edition', label: 'd', standing: 'public' }, { doc: '1.0.1.0.127', kind: 'edition', label: '# The far edition', standing: 'public' }], counts: [{ account: '1.0.1', documents: 2 }], state: { arm: 'complete' } }));
  assert.equal(named(D + '.0.2.1'), '1.0.1.0.127 · The far edition', 'the index listing it: the index\'s first line');
  assert.equal(LK.farWords(end(D + '.0.2.1')), 'The far edition', 'the words alone, which a tail\'s label sets beneath its address');
});
