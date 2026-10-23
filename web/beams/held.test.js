// BM-HELD's test — the four states and the line (issue #153's design
// decision): all where one stretch holds every position of the passage,
// pieces where the stretches together do and none alone, part where they
// hold less, none where there are none (a mutant that sums the stretches'
// widths — a half held twice reading whole — or that calls a passage held in
// two stretches all of it, turns red); a passage named by identity read
// through each run's bytes, bytes that follow on in the text and the passage
// one piece, each run holding any of it one place, and bytes of another
// I-space none of it; the line in the decision's own words — "only part of
// what you selected is in version 3 — in 2 places", "the text you were
// reading" — no places named at one place, the withheld text's clause on a
// part alone, and never "missing", "removed", "deleted" or "compare"; the
// reason a line could not tell by keyed on the refusal's name and kind,
// never its token, and "try again" offered only where a retry can change
// the answer (a mutant that offers it for a budget or a verdict of the
// board's turns red). A drawn link's far end says before departure what its
// text holds of its passage, by the rule its landing reads: part, all of it
// in pieces, couldn't tell by the refusal's name, nothing for all of it, for
// a refusal for its size or for an image that does not cover its runs beyond
// what the projection's widths prove (a mutant that reads the positions the
// text holds in place of its bytes' identity turns red).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as REC from '../model/records.js';
import * as LK from '../links/links.js';
import { heldOf, piecesOf, lineOf, saidOf, unknownOf, whyOf, retries, whereOf, farHolds, farSays } from './held.js';
import { t } from '../strings.js';

const D = '1.0.1.0.3', OTHER_HOME = '1.0.2.0.5', CITE = '1.1.0.1.0.1.0.3.13';
const span = (/** @type {string} */ doc, /** @type {number} */ ord, /** @type {number} */ w) => ({ start: `${doc}.0.1.${ord}`, width: '0.0.0.0.0.0.0.' + w, doc, account: doc.split('.').slice(0, 3).join('.'), whole: false, subspace: 1, ordinal: ord, positions: w });
/** D's text and its own bytes, and another account's citation into it from OTHER_HOME's first five bytes, drawn at D with others' links on */
function buildFar() {
  REC._reset(); LK._reset();
  REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  REC.takeDelivery(D, [{ pos: 1, width: 100, kind: 'content', text: 'x'.repeat(40) + '\n\n' + 'y'.repeat(58), ref: null, origin: null }]);
  REC.takeImage(D, 1, [{ iStart: D + '.0.1.1', width: 100 }]);
  REC.takeLinks(D, [OTHER_HOME + '.0.2.1']);
  REC.takeLink({ addr: OTHER_HOME + '.0.2.1', from: [span(OTHER_HOME, 1, 5)], to: [span(D, 3, 10)], type: CITE });
}

test('what a text holds of a passage: all, in one stretch; pieces, together and none alone; part; none', () => {
  assert.deepEqual(heldOf([{ at: 0, width: 10 }], 10), { holds: 'all', places: 1 });
  assert.deepEqual(heldOf([{ at: 5, width: 5 }, { at: 0, width: 5 }], 10), { holds: 'pieces', places: 2 }, 'its halves apart, in either order');
  assert.deepEqual(heldOf([{ at: 0, width: 5 }, { at: 0, width: 5 }], 10), { holds: 'part', places: 2 }, 'its first half twice: as many positions as the passage, never all of it');
  assert.deepEqual(heldOf([{ at: 0, width: 4 }, { at: 6, width: 4 }], 10), { holds: 'part', places: 2 }, 'a gap between them');
  assert.deepEqual(heldOf([], 10), { holds: 'none', places: 0 });
  assert.deepEqual(heldOf([{ at: 0, width: 10 }, { at: 0, width: 3 }], 10, 2), { holds: 'all', places: 2 }, 'one stretch holding all of it: all, whatever else holds part of it');
  assert.deepEqual(heldOf([{ at: 0, width: 3 }, { at: 3, width: 7 }], 10, 1), { holds: 'pieces', places: 1 }, 'the places counted as named');
});

test('a passage named by identity is read through each run\'s bytes: bytes following on in the text and the passage one piece, each run holding any of it one place, another I-space\'s none', () => {
  const P = '1.0.1.0.127.0.1', passage = { prefix: P, ordinal: 3, width: 22 };
  assert.deepEqual(piecesOf(passage, [[{ prefix: P, ordinal: 3, width: 4 }], [{ prefix: P, ordinal: 20, width: 5 }]]), { pieces: [{ at: 0, width: 4 }, { at: 17, width: 5 }], places: 2 });
  assert.deepEqual(piecesOf(passage, [[{ prefix: P, ordinal: 1, width: 10 }, { prefix: P, ordinal: 11, width: 20 }]]), { pieces: [{ at: 0, width: 22 }], places: 1 }, 'two image runs following on in both: one piece, the passage whole');
  assert.deepEqual(piecesOf(passage, [[{ prefix: P, ordinal: 13, width: 12 }, { prefix: P, ordinal: 3, width: 10 }]]), { pieces: [{ at: 10, width: 12 }, { at: 0, width: 10 }], places: 1 }, 'its halves swapped in one run: two pieces, one place');
  assert.deepEqual(piecesOf(passage, [[{ prefix: '1.0.1.0.3.0.1', ordinal: 3, width: 22 }]]), { pieces: [], places: 0 }, 'another document\'s bytes at those ordinals: none of it');
  assert.equal(heldOf(piecesOf(passage, [[{ prefix: P, ordinal: 3, width: 4 }], [{ prefix: P, ordinal: 20, width: 5 }]]).pieces, 22).holds, 'part');
});

test('the line in the decision\'s words: a part with its places, the text a member\'s version or a bare address\'s current text, pieces, the withheld text\'s clause on a part alone; never "missing", "removed", "deleted" or "compare"', () => {
  const at = '1.0.1.0.43.3';
  const part = /** @type {import('./held.js').Said} */ (saidOf({ holds: 'part', places: 2 }, 'selected', at));
  assert.equal(lineOf(part), 'only part of what you selected is in version 3 — in 2 places', 'the decision\'s own example');
  assert.equal(lineOf({ ...part, subject: 'reading', places: 1 }), 'only part of the text you were reading is in version 3', 'no places at one place');
  assert.equal(whereOf('1.0.1.0.43'), t('L.held.current', { D: '1.0.1.0.43' }), 'a bare address: its current text');
  assert.equal(lineOf(/** @type {import('./held.js').Said} */ (saidOf({ holds: 'pieces', places: 3 }, 'followed', '1.0.1.0.43', true))), t('L.held.pieces', { subject: t('L.held.followed'), where: t('L.held.current', { D: '1.0.1.0.43' }) }) + t('L.held.places', { n: 3 }), 'pieces: all of it, its places — no withheld clause, for nothing is left to be under it');
  assert.equal(lineOf(/** @type {import('./held.js').Said} */ (saidOf({ holds: 'part', places: 1 }, 'selected', at, true))), t('L.held.part', { subject: t('L.held.selected'), where: t('L.held.member', { k: 3 }) }) + t('L.held.withheld'), 'a part where the text shows withheld text: the rest may be under it');
  assert.deepEqual([saidOf({ holds: 'all', places: 1 }, 'selected', at), saidOf({ holds: 'none', places: 0 }, 'selected', at)], [null, null], 'all says nothing beyond the outline, none nothing beyond the dead end\'s face');
  const lines = [part, { ...part, state: /** @type {const} */ ('pieces') }, unknownOf(null, 'reading', at), unknownOf({ kind: 'refused', name: 'too_many_pairs' }, 'followed', at)].map(lineOf);
  assert.ok(lines.every((l) => !/missing|removed|deleted|compare|too_many|not_a_link/.test(l)), lines.join(' | '));
});

test('couldn\'t tell says why, keyed on the refusal\'s name and kind, never its token, and offers "try again" only where a retry can change the answer', () => {
  /** @type {Array<[{kind: string, name: string} | null, string, boolean]>} each refusal, its reason's words and whether a retry may tell */
  const rows = [
    [{ kind: 'unreachable', name: 'unreachable' }, 'F.daemon.unreachable', true],
    [{ kind: 'shell', name: 'session_ended' }, 'C-137.signed-out', true],
    [{ kind: 'shell', name: 'session_died' }, 'C-137.signed-out', true],
    [{ kind: 'refused', name: 'scan_busy' }, 'L.held.why.busy', true],
    [{ kind: 'refused', name: 'too_many_blocks' }, 'L.held.why.size', false],
    [{ kind: 'refused', name: 'image_too_large' }, 'L.held.why.size', false],
    [{ kind: 'refused', name: 'range_not_present' }, 'B1.range_not_present', false],
    [{ kind: 'refused', name: 'withheld' }, 'L.held.why.withheld', false],
    [{ kind: 'refused', name: 'not_a_link' }, 'B1.not_a_link', false],
    [{ kind: 'refused', name: 'bad_region' }, 'L.held.why.other', false],
    [null, 'L.held.why.unread', true],
  ];
  for (const [r, why, again] of rows) assert.deepEqual([whyOf(r), retries(r)], [why, again], r ? r.name : 'none met');
  const s = unknownOf({ kind: 'unreachable', name: 'unreachable' }, 'reading', '1.0.1.0.127');
  assert.deepEqual([s.state, s.again], ['unknown', true]);
  assert.equal(lineOf(s), t('L.held.unknown', { subject: t('L.held.reading'), where: t('L.held.current', { D: '1.0.1.0.127' }), reason: t('F.daemon.unreachable') }));
});

test('a drawn link\'s far end says before departure what its text holds of its passage, by the rule its landing reads (issue #153): all of it in one piece, nothing; part, or all of it in pieces, the line — its bytes read through the far document\'s held image, and where that image covers them not, a projection of fewer positions than the passage still part, nothing more; refused by a name that says nothing of the document, couldn\'t tell by that name, save a refusal for its size; floating, the dead end\'s words', () => {
  buildFar();
  LK.setOthers(D, true);
  // the other account's citation into D, drawn at D: its far end OTHER_HOME's first five bytes, slot 1
  const L = OTHER_HOME + '.0.2.1', P = OTHER_HOME + '.0.1.';
  const at = () => /** @type {import('../links/links.js').Shown} */ (LK.shown(D).find((s) => s.link.addr === L));
  const subject = t('L.held.followed'), where = t('L.held.current', { D: OTHER_HOME });
  REC.takeImage(OTHER_HOME, 1, [{ iStart: P + '1', width: 40 }]);
  REC.takeProjection(L, 1, OTHER_HOME, [{ pos: 1, width: 5 }]);
  assert.deepEqual([farHolds(at()), farSays(at())], [null, ''], 'all of it in one piece: nothing said, the beam alone');
  REC.takeProjection(L, 1, OTHER_HOME, [{ pos: 1, width: 2 }]);
  assert.equal(farSays(at()), t('L.held.part', { subject, where }), 'its first two bytes alone: part');
  // an edit set its last three bytes at 10 and its first two at 20, other bytes about them
  REC.takeImage(OTHER_HOME, 1, [{ iStart: P + '100', width: 9 }, { iStart: P + '3', width: 3 }, { iStart: P + '200', width: 7 }, { iStart: P + '1', width: 2 }, { iStart: P + '300', width: 19 }]);
  REC.takeProjection(L, 1, OTHER_HOME, [{ pos: 10, width: 3 }, { pos: 20, width: 2 }]);
  assert.deepEqual([farHolds(at())?.state, farSays(at())], ['pieces', t('L.held.pieces', { subject, where }) + t('L.held.places', { n: 2 })], 'all of it, in two places');
  // its first two bytes twice, the rest nowhere: as many positions as the passage, never all of it
  REC.takeImage(OTHER_HOME, 1, [{ iStart: P + '1', width: 2 }, { iStart: P + '1', width: 2 }, { iStart: P + '200', width: 36 }]);
  REC.takeProjection(L, 1, OTHER_HOME, [{ pos: 1, width: 4 }]);
  assert.equal(farHolds(at())?.state, 'part', 'two of its five bytes, held twice: part, read by identity — never by the width the text holds');
  // the image dropped with the text: the projection's widths alone
  REC.invalidate(OTHER_HOME);
  REC.takeProjection(L, 1, OTHER_HOME, [{ pos: 1, width: 2 }, { pos: 20, width: 2 }]);
  assert.equal(farSays(at()), t('L.held.part', { subject, where }) + t('L.held.places', { n: 2 }), 'no image: four positions of five prove part');
  REC.takeProjection(L, 1, OTHER_HOME, [{ pos: 1, width: 5 }]);
  assert.equal(farSays(at()), '', 'no image, as many positions as the passage: nothing more said, never a guess');
  REC.takeProjection(L, 1, OTHER_HOME, { refused: 'not_a_link' });
  assert.equal(farSays(at()), t('L.held.unknown', { subject, where, reason: t('B1.not_a_link') }), 'refused by a name that says nothing of the document: couldn\'t tell, by that name');
  REC.takeProjection(L, 1, OTHER_HOME, { refused: 'image_too_large' });
  assert.equal(farSays(at()), '', 'refused for its size: nothing, for the follow asks it in parts');
  REC.takeProjection(L, 1, OTHER_HOME, []);
  assert.equal(farSays(at()), t('F.floating', { D: OTHER_HOME }), 'floating: the dead end\'s words');
  // OTHER_HOME's text showing a withheld run: the rest of a part may be under it
  REC.takeDelivery(OTHER_HOME, [{ pos: 1, width: 10, kind: 'content', text: 'abcde\n\nfg\n', ref: null, origin: null }, { pos: 11, width: 30, kind: 'withheld', text: '', ref: null, origin: '1.0.2.0.6' }]);
  REC.takeProjection(L, 1, OTHER_HOME, [{ pos: 1, width: 2 }]);
  assert.equal(farSays(at()), t('L.held.part', { subject, where }) + t('L.held.withheld'), 'its text shows withheld text: the rest may be under it');
});
