// SC's test: the two ends the scene sets level (foundations §2.5: "position
// carries the match") — the held passage's first stretch of shared identity
// and its counterpart, never the first pair where the held passage lies past
// it (a mutant that levels the second pane at `compare`'s first pair turns
// red); a far end the opener names, as given; with nothing held, the first
// pair; with nothing shared, the second pane at its top — and the runs the
// bands are drawn from, contiguous pairs one run. A passage's counterpart,
// where a carried passage's landing stands (N-GO; P43): its first shared
// stretch clipped to the passage at both ends, in the second document's
// positions (a mutant that keeps the stretch's own width, or its own start,
// turns red), contiguous pairs one stretch (a mutant that takes the first
// raw pair alone turns red), none where nothing is shared; and its
// counterparts, what the landing marks: every shared stretch inside it, each
// clipped so, in the first document's order whatever order `compare` names
// them in (a mutant that keeps the first alone, or the pairs' order, turns
// red), the first of them its counterpart.
// The lines between the panes (§2.5: "a link's line drawn where either
// pane's default composition draws that link"; P44): a link both panes show
// is one line, whichever pane meets it — a followed one at its own lighter
// value, two links between the same ends a line each (a mutant that draws a
// line per meeting turns red); each END drawn in the mark its pane's document
// gives the link, the one its symbol takes in that pane (issue #166's design
// decision): the owner's solid at the pane of the document its maker owns and
// another's dashed at the other — whichever pane is A, whether the other pane
// shows it at its span or not at all, and whichever pane alone shows it (a
// mutant that marks the line by the owner of either document, or both ends by
// one pane's mark, turns red) — and a third party's dashed in theirs at both;
// a line whose ends differ changing colour once, at the middle of the gap,
// each stretch from there in its own end's ink, a clipped end's triangle in
// its own end's hue (a mutant changing it elsewhere, or filling a triangle in
// the other end's hue, turns red); a far end naming a document whole at that
// pane's first block; one document in both panes drawing a link inside it
// once for each way its ends stand across them (a mutant that tells ends
// apart by their document alone, folding the two into one, turns red); no
// line to a document neither pane holds; a line homed in the readable pane
// whose far end lies in a pane showing a cover — a covered draft's head
// alone, its projection refused — ending at the cover, in either pane (issue
// #177: a mutant that drops it, as a refused projection's end, turns red).
// Each end where the link's bytes
// stand now: the far end where `project` places it (a mutant drawing to the
// stored position turns red), at its pane's first block where it floats, no
// line where nothing places it; a link met from both panes one line however
// its ends moved, told apart by the spans the link stores (a mutant keying
// the near end by where it stands draws two and turns red); and the opening
// asking each crossing link's far end once, none it holds already. A pane
// holding another version of the box a far end names takes the line at the
// far end where `project` places it in that version's own text (issue #154:
// a mutant that matches the pane by the address the link names draws no
// line, and one reading LK's placement there draws it at the plane's).
// And the position two versions share nearest a passage the second holds
// none of, where a version move keeps the passage's line (issue #154): the
// last of a stretch before it or the first of one after it, the nearer, the
// one before at a tie (a mutant that takes the first stretch, or the one
// after at a tie, turns red), none where they share nothing.
// Then the scene's focus, against the FAKE PORT and a page of stand-ins whose
// focus lands only where the platform's does (D5 §4 rules 5 and 8; K-63;
// the focus's owner N-FOCUS, whose own cases are `nav/focus.test.js` — these
// stay beside it, for they hold the scene's order of cover, uncover and
// return): while the scene stands the plane under it is out of the page's
// order — the walk's tree and the corner layer inert — and its end puts the
// plane back before it returns the focus to the element the scene was
// opened from. A corner the focus is returned to while the plane is still
// covered takes none, so a mutant that returns first turns red; one that
// leaves a focus the scene held on its hidden pane turns red, as does one
// that takes back a focus the person moved out of the scene; a scene opened
// over a standing one returns it to the first one's opener — a mutant that
// reads the opener again turns red; one opened with the focus on nothing
// returns it to the walk's element, never to the top — a mutant that leaves
// it on nothing turns red.
// And each pane's article, T-LAYER's mount (FP-12): made from the blocks and
// runs the scene read and kept beside it, pane A's after its corner and pane
// B's before it, so each corner stands on its pane's outer side (a mutant
// that makes a pane's article itself, or sets both after their corners,
// turns red).
// And THE OPENING (O-HOST's): the dismissal a navigation act makes first,
// Esc, or an overlay shown — a follow's face — made while the scene reads
// ends its opening — made while it reads its documents, no `compare` is
// asked after it (a mutant that asks it turns red); made while it reads their
// `compare`, nothing opens once it answers: the plane in the page's order,
// the focus where it stood, no region holding it but the overlay shown (a
// mutant that opens the scene without the host's opening, whose Esc leaves
// an opening reading, or whose show does not count itself, turns red).
// And A PANE KEPT FRESH BY ITS KIND (issue #160's design decision), against
// the fake port: an edition read at its bare address made as the member its
// text is (a mutant naming the bare address turns red); an edit row naming a
// draft pane's document reads it again and sets it in its place, the other
// pane untouched; a row naming a newer member pins an edition read at its bare
// address at once — the member named in its head, the bar and its corner,
// "version 2 of 3", the newest offered, the arrival said once (a mutant that
// reads it again as a draft, or says nothing, turns red) — then sets it again
// from that member; its corner's act reads the newer version in the pane's
// place, the passage held kept at the nearest shared position and the
// version said to lack it, the plane's box untouched, the version left one
// act away; a pane
// on a version counts the chain alone, reading nothing (a mutant that reads it
// again turns red); a link row reaching a pane's text marks the link it reads
// now; the re-level and a pane's key made while a pane reads wait for it, in
// the order made (a mutant that acts at once turns red); the page's own death
// takes every pane down at once, no tie standing, and reads each again as a
// guest, a draft withheld standing as its head alone (a mutant that keeps the
// dead session's text turns red). A passage the corner's act carries placed by
// the one rule: its first shared stretch's counterpart, else the nearest
// shared position's, else the version's head; a far end the lines read where
// the pane was set, never the model's now.
import { test, before } from 'node:test';
import assert from 'node:assert/strict';
import * as PORT from '../bridge/port.js';
import * as REC from '../model/records.js';
import * as PUMP from '../model/pump.js';
import * as F from '../model/frames.js';
import * as FAKE from '../test/fake-port.js';
import * as WALK from '../nav/walk.js';
import * as LAYER from '../text/layer.js';
import * as HOST from '../overlays/host.js';
import * as FACES from '../overlays/faces.js';
import * as FOCUS from '../nav/focus.js';
import * as KEYS from '../nav/keys.js';
import * as SCENE from './scene.js';
import { levels, merged, counterpart, counterparts, nearest, linesBetween, carriedTo } from './scene.js';
import * as GO from '../nav/go.js';
import { t } from '../strings.js';
import { esc } from '../util.js';
import * as LK from '../links/links.js';
import { inkOf } from '../beams/beams.js';
import { HUE, VISITED_ALPHA, SAMENESS } from '../plane/register.js';
import { recorder } from '../test/canvas.js';

/** @returns {import('../model/frames.js').ComparePair} */
const pair = (/** @type {number} */ u1, /** @type {number} */ u2, /** @type {number} */ width) => ({ d1: '1.0.1.0.3', d2: '1.0.1.0.3.2', u1, u2, width });
// the first edition beside its latest version: its text to 1466, the window run 1467–1706, its last stretch from 1707
const runs = [pair(1, 1, 1466), pair(1467, 1467, 240), pair(1707, 1707, 23)];

test('the held passage is set level at its first shared position and that position\'s counterpart', () => {
  assert.deepEqual(levels(runs, { posA: 541, widthA: 1130 }), { a: 541, b: 541 }, 'a paragraph inside the first run: level at its own start in both');
  assert.deepEqual(levels(runs, { posA: 1500, widthA: 40 }), { a: 1500, b: 1500 }, 'a passage inside the second run, never the first pair\'s 1');
  const moved = [pair(1, 101, 1466), pair(1467, 9, 240)];
  assert.deepEqual(levels(moved, { posA: 1480, widthA: 10 }), { a: 1480, b: 22 }, 'the counterpart where the second document arranges the run elsewhere');
  assert.deepEqual(levels(moved, { posA: 1400, widthA: 100 }), { a: 1400, b: 1500 }, 'the first stretch the held passage shares, from the held position');
  assert.deepEqual(levels([pair(1467, 1, 240)], { posA: 541, widthA: 1130 }), { a: 1467, b: 1 }, 'a held paragraph whose shared stretch starts inside it: level at that stretch');
});

test('a far end the opener names is used as given', () => {
  assert.deepEqual(levels(runs, { posA: 951, widthA: 4, posB: 12 }), { a: 951, b: 12 });
  assert.deepEqual(levels([], { posA: 951, posB: 3 }), { a: 951, b: 3 });
});

test('with nothing held, the first pair\'s two ends; with nothing shared, the second pane at its top', () => {
  assert.deepEqual(levels([pair(1467, 1, 240)]), { a: 1467, b: 1 });
  assert.deepEqual(levels([pair(900, 40, 10), pair(1467, 1, 240)].reverse()), { a: 900, b: 40 }, 'the first in the first document\'s order');
  assert.deepEqual(levels([]), { a: null, b: null });
  assert.deepEqual(levels([pair(1467, 1, 240)], { posA: 20, widthA: 30 }), { a: 20, b: null }, 'a held passage that shares nothing: the second pane at its top');
  assert.deepEqual(levels(runs, { posA: 1466, widthA: null }), { a: 1466, b: 1466 }, 'a position alone');
});

test('a passage\'s counterpart: its first shared stretch, clipped to the passage at both ends, in the second document\'s positions', () => {
  const moved = [pair(1, 101, 1466), pair(1467, 9, 240)];
  assert.deepEqual(counterpart(moved, 1480, 10), { a: 1480, b: 22, width: 10 }, 'inside a run: the passage itself, where the second document arranges it');
  assert.deepEqual(counterpart(moved, 1400, 100), { a: 1400, b: 1500, width: 67 }, 'across two runs: the first, cut at its end');
  assert.deepEqual(counterpart([pair(1467, 1, 240)], 1400, 100), { a: 1467, b: 1, width: 33 }, 'a stretch starting inside the passage: cut at the stretch\'s start');
  assert.deepEqual(counterpart([pair(11, 20, 3), pair(14, 23, 2)].reverse(), 9, 8), { a: 11, b: 20, width: 5 }, 'contiguous pairs, in any order: one stretch');
  assert.equal(counterpart([pair(1467, 1, 240)], 20, 30), null, 'nothing shared: none');
  assert.equal(counterpart([], 20, 30), null);
});

test('a passage\'s counterparts: every shared stretch inside it, each clipped to the passage, in the first document\'s order — the first its counterpart', () => {
  const moved = [pair(1, 101, 1466), pair(1467, 9, 240)];
  assert.deepEqual(counterparts(moved, 1400, 100), [{ a: 1400, b: 1500, width: 67 }, { a: 1467, b: 9, width: 33 }], 'across two runs: both, the first cut at the passage\'s start and the second at its end');
  assert.deepEqual(counterparts(moved, 1480, 10), [{ a: 1480, b: 22, width: 10 }], 'inside one run: that one');
  assert.deepEqual(counterparts([pair(11, 40, 3), pair(1, 20, 5)], 1, 20), [{ a: 1, b: 20, width: 5 }, { a: 11, b: 40, width: 3 }], 'in the first document\'s order, whatever order the pairs are named in');
  assert.deepEqual(counterparts([pair(1467, 1, 240)], 20, 30), [], 'nothing shared: none');
  assert.deepEqual(counterpart(moved, 1400, 100), counterparts(moved, 1400, 100)[0], 'the counterpart is the first');
});

test('the position two versions share nearest a passage the second holds none of: the last of a stretch ending before the passage\'s first position, or the first of one beginning after it, whichever lies nearer — the one before where both lie as near — with its counterpart; none where they share nothing (issue #154)', () => {
  // the board's 1.0.1.0.43 against its first member: positions 134 to 184 its own, the stretches either side shared
  const shared = [pair(1, 1, 133), pair(185, 197, 1972)];
  assert.deepEqual(nearest(shared, 134), { a: 133, b: 133 }, 'the stretch before ends just before the passage: its last position, nearer than 185');
  assert.deepEqual(nearest(shared, 180), { a: 185, b: 197 }, 'the stretch after begins nearer: its first position, in the second\'s positions');
  assert.deepEqual(nearest([pair(1, 1, 10), pair(21, 31, 5)], 15), { a: 10, b: 10 }, 'as near either way: the one before');
  assert.deepEqual(nearest([pair(21, 31, 5), pair(1, 1, 10)].reverse(), 18), { a: 21, b: 31 }, 'in any order the pairs are named in');
  assert.deepEqual(nearest([pair(1, 1, 3), pair(4, 4, 7)], 30), { a: 10, b: 10 }, 'contiguous pairs one stretch: its last position');
  assert.equal(nearest([], 15), null, 'nothing shared: none');
});

test('a passage a pane\'s corner\'s act carries keeps its line at its first shared stretch\'s counterpart in the version read; where that version holds none of it, the counterpart of the nearest shared position takes the line, else the version\'s head, the version said to lack it (issue #160)', () => {
  const shared = [pair(1, 1, 14), pair(40, 52, 10)];
  assert.deepEqual(carriedTo(shared, { pos: 41, width: 5 }, 1), { from: 41, to: 53, none: false }, 'inside a shared stretch: its counterpart');
  assert.deepEqual(carriedTo(shared, { pos: 30, width: 15 }, 1), { from: 40, to: 52, none: false }, 'a passage whose first bytes the version lacks: its first shared stretch\'s line, never its own first position\'s');
  assert.deepEqual(carriedTo(shared, { pos: 20, width: 5 }, 1), { from: 20, to: 14, none: true }, 'none of it shared: the nearest shared position, the end of the stretch before, takes its line');
  assert.deepEqual(carriedTo([], { pos: 20, width: 5 }, 3), { from: 20, to: 3, none: true }, 'nothing shared at all: the version\'s head');
});

test('contiguous pairs — adjoining in both documents — are one run; a gap in either keeps them apart', () => {
  assert.deepEqual(merged([pair(1467, 1467, 240), pair(1, 1, 1466), pair(1707, 1707, 23)]), [pair(1, 1, 1729)], 'the three stretches of an unchanged edition are one');
  assert.deepEqual(merged([pair(1, 1, 10), pair(11, 30, 5)]), [pair(1, 1, 10), pair(11, 30, 5)], 'adjoining in the first document alone');
  const raw = [pair(1, 1, 10), pair(11, 11, 5)];
  merged(raw);
  assert.deepEqual(raw, [pair(1, 1, 10), pair(11, 11, 5)], 'the pairs handed in are left as they are');
});

// ---- the lines between the panes -------------------------------------------------------------------------------------

// the document in pane A, the one in pane B, and a third in neither
const DOC_A = '1.0.1.0.3', DOC_B = '1.0.2.0.5', DOC_C = '1.0.3.0.7';
/** the citation type, a commons type that is neither a record nor social: a passage link */
const CITE = '1.1.0.1.0.1.0.3.13';
/** a passage of a document, as a link's end names one */
const passage = (/** @type {string} */ doc, /** @type {number} */ ord, /** @type {number} */ w) => ({ start: `${doc}.0.1.${ord}`, width: '0.0.0.0.0.0.0.' + w, doc, account: doc.split('.').slice(0, 3).join('.'), whole: false, subspace: 1, ordinal: ord, positions: w });
/** a document named whole, as a link's end names one */
const wholeOf = (/** @type {string} */ doc) => ({ start: doc, width: '0.0.0.0.1', doc, account: doc.split('.').slice(0, 3).join('.'), whole: true, subspace: null, ordinal: null, positions: /** @type {number | null} */ (null) });
/** a link as the model holds it, by its address and the account that made it */
const linkBy = (/** @type {string} */ addr, /** @type {string} */ owner) => /** @type {any} */ ({ addr, owner });
/**
 * A link's end as LK shows it at a document: its passage there — standing where its slot stores it, nothing moved — the far end it
 * names, where `project` places that passage in the far document's text now (by default where it is stored; none where it floats;
 * null where nothing places it), the mark the document gives it at its span (`LK.markOf`)
 */
const endShown = (/** @type {{addr: string, owner: string}} */ link, /** @type {ReturnType<typeof passage>} */ here, /** @type {ReturnType<typeof passage> | ReturnType<typeof wholeOf>} */ there,
  /** @type {Array<{pos: number, width: number}> | null} */ farRuns = there.whole ? null : [{ pos: /** @type {number} */ (there.ordinal), width: there.positions || 1 }]) => {
  const mark = LK.markOf(/** @type {any} */ (link), here.doc);
  const at = { pos: here.ordinal, width: here.positions || 1 };
  return { link, near: here.doc, end: 'from', nearEnd: here, runs: [at], ...at, mark, linker: mark.linker, far: there.doc, farEnd: there, farSlot: 2, farWhole: there.whole, farRuns };
};
/** a pane's links: its document, the ends LK shows there, the blocks its article was made from — by default two, the first at 1 */
const paneLinks = (/** @type {string} */ addr, /** @type {Array<ReturnType<typeof endShown>>} */ shown, blocks = [{ pos: 1, width: 40 }, { pos: 41, width: 60 }]) => /** @type {any} */ ({ addr, shown, blocks });
/** an end's ink as a line draws it: its hue, and whether it is dashed */
const looks = (/** @type {import('../beams/beams.js').Ink} */ i) => [i.hue, i.dash.length > 0];
/** each line: its link, its end in pane A, its end in pane B, the ink at its end in pane A and at its end in pane B, its value */
const drawn = (/** @type {import('./scene.js').Line[]} */ lines) => lines.map((l) => [l.link, [l.a.pos, l.a.width], [l.b.pos, l.b.width], looks(l.ink.a), looks(l.ink.b), l.value]);
/** a lines test read as the person of `account` reads, LK's followed set and toggles fresh; the session the focus tests read put back after it */
function asReader(/** @type {string} */ account, /** @type {() => void} */ body) {
  const was = REC.session();
  REC.setSession({ session: 's-lines', principal: 9, account });
  LK._reset();
  try { body(); } finally { REC.setSession(was); LK._reset(); }
}

test('a link both panes show is one line between its two ends, its end in pane A first, whichever pane meets it — never one per pane', () => asReader('1.0.1', () => {
  const L = linkBy(DOC_A + '.0.2.1', '1.0.1');
  const atA = endShown(L, passage(DOC_A, 50, 10), passage(DOC_B, 1, 5)), atB = endShown(L, passage(DOC_B, 1, 5), passage(DOC_A, 50, 10));
  const one = [[L.addr, [50, 10], [1, 5], [HUE.you, false], [HUE.you, false], 1]];
  assert.deepEqual(drawn(linesBetween(paneLinks(DOC_A, [atA]), paneLinks(DOC_B, [atB]))), one, 'met from both panes: one line');
  assert.deepEqual(drawn(linesBetween(paneLinks(DOC_A, []), paneLinks(DOC_B, [atB]))), one, 'met from pane B alone: the same line');
  LK.follow(L.addr);
  const followed = [endShown(L, passage(DOC_A, 50, 10), passage(DOC_B, 1, 5)), endShown(L, passage(DOC_B, 1, 5), passage(DOC_A, 50, 10))];
  assert.deepEqual(drawn(linesBetween(paneLinks(DOC_A, [followed[0]]), paneLinks(DOC_B, [followed[1]]))).map((l) => l[5]), [VISITED_ALPHA], 'a followed link drawn once, lighter — never stacked back toward full');
  const L2 = linkBy(DOC_A + '.0.2.2', '1.0.1');
  assert.deepEqual(drawn(linesBetween(paneLinks(DOC_A, [atA, { ...atA, link: L2 }]), paneLinks(DOC_B, [atB]))).map((l) => l[0]), [L.addr, L2.addr], 'two links between the same two ends: a line each');
}));

test('a link the owner of one pane\'s document made is drawn at each end in the mark its pane\'s document gives it — the owner\'s solid at that pane, another\'s dashed at the other — whichever pane is A and whatever either pane shows at its span, each end the mark its pane\'s symbol takes (issue #166\'s design decision: "Opening that view never recolours the link it opened on")', () => asReader('1.0.9', () => {
  const P = '1.0.1.0.31', Q = '1.0.2.0.51', L = P + '.0.2.1';
  REC.takeImage(P, 1, [{ iStart: P + '.0.1.1', width: 60 }]); REC.takeImage(Q, 1, [{ iStart: Q + '.0.1.1', width: 10 }]);
  REC.takeLinks(P, [L]); REC.takeLinks(Q, [L]);
  REC.takeLink({ addr: L, from: [passage(P, 50, 10)], to: [passage(Q, 1, 5)], type: CITE });
  REC.takeProjection(L, 2, Q, [{ pos: 1, width: 5 }]); REC.takeProjection(L, 1, P, [{ pos: 50, width: 10 }]);
  const pane = (/** @type {string} */ addr) => paneLinks(addr, /** @type {any} */ (LK.shown(addr)));
  for (const on of [false, true]) {
    LK.setOthers(Q, on);
    for (const [a, b] of [[P, Q], [Q, P]]) {
      const lines = linesBetween(pane(a), pane(b)).map((l) => [l.link, { [a]: looks(l.ink.a), [b]: looks(l.ink.b) }, l.value]);
      assert.deepEqual(lines, [[L, { [P]: [HUE.owner, false], [Q]: [HUE.others, true] }, 1]], `${a} in pane A, the other pane's toggle ${on ? 'on' : 'off'}`);
    }
  }
  assert.deepEqual([LK.shown(P), LK.shown(Q)].map((at) => at.map((s) => looks(inkOf(s.mark)))), [[[HUE.owner, false]], [[HUE.others, true]]], 'each end the mark its pane\'s symbol takes: P\'s owner\'s at P, another\'s at Q');
}));

test('a link one pane alone shows is drawn at each end in the mark that end\'s pane\'s document gives it: a third party\'s dashed in their hue at both; pane B\'s document\'s owner\'s solid in the owner\'s at B and dashed as another\'s at A, whichever pane shows it', () => asReader('1.0.1', () => {
  const theirs = linkBy('1.0.3.0.9.0.2.1', '1.0.3'), owners = linkBy(DOC_B + '.0.2.1', '1.0.2');
  const another = [HUE.others, true], owner = [HUE.owner, false];
  assert.deepEqual(drawn(linesBetween(paneLinks(DOC_A, [endShown(theirs, passage(DOC_A, 50, 10), passage(DOC_B, 1, 5))]), paneLinks(DOC_B, []))), [[theirs.addr, [50, 10], [1, 5], another, another, 1]], 'a third party\'s, shown at pane A');
  assert.deepEqual(drawn(linesBetween(paneLinks(DOC_A, []), paneLinks(DOC_B, [endShown(owners, passage(DOC_B, 1, 5), passage(DOC_A, 50, 10))]))), [[owners.addr, [50, 10], [1, 5], another, owner, 1]], 'pane B\'s document\'s owner\'s, shown at pane B');
  assert.deepEqual(drawn(linesBetween(paneLinks(DOC_A, [endShown(owners, passage(DOC_A, 50, 10), passage(DOC_B, 1, 5))]), paneLinks(DOC_B, []))), [[owners.addr, [50, 10], [1, 5], another, owner, 1]], 'pane B\'s document\'s owner\'s, shown at pane A alone, where it is another\'s: the owner\'s still at B');
}));

test('a line whose ends\' inks differ changes colour once, at the middle of the gap: pane A\'s end\'s ink to there and pane B\'s from there, one curve, each clipped end\'s triangle in its own end\'s hue; a band, its inks alike, one stroke (issue #166\'s design decision: "changing at the middle of the gap")', () => {
  const ink = { a: inkOf(/** @type {any} */ ({ hue: HUE.owner, linker: 'owner' })), b: inkOf(/** @type {any} */ ({ hue: HUE.others, linker: 'others' })) };
  const { ctx, strokes, fills } = recorder();
  SCENE.drawTie(ctx, { x: 400, y: 100, clipped: true, above: true }, { x: 520, y: 300, clipped: true, above: false }, ink);
  assert.deepEqual(strokes.map((s) => [s.hue, s.dash, s.cap]), [[HUE.owner, [], 'butt'], [HUE.others, [5, 4], 'butt']], 'pane A\'s end the owner\'s, solid; pane B\'s another\'s, dashed; butt-capped, so they meet and never overlap');
  assert.deepEqual(strokes.map((s) => s.start), [{ x: 460, y: 200 }, { x: 460, y: 200 }], 'both drawn from the middle of the gap, so the dashed one begins in ink there');
  assert.deepEqual(strokes.map((s) => s.curve[2]), [{ x: 400, y: 100 }, { x: 520, y: 300 }], 'pane A\'s back to its end at pane A\'s edge, pane B\'s on to its end at pane B\'s');
  assert.deepEqual(fills, [HUE.owner, HUE.others], 'each clipped end\'s triangle in its own end\'s hue');
  const band = recorder(), same = { hue: SAMENESS.boundary, dash: [] };
  SCENE.drawTie(band.ctx, { x: 400, y: 100, clipped: false, above: false }, { x: 520, y: 140, clipped: false, above: false }, { a: same, b: same });
  assert.deepEqual(band.strokes.map((s) => [s.hue, s.start, s.curve[2]]), [[SAMENESS.boundary, { x: 400, y: 100 }, { x: 520, y: 140 }]], 'inks alike: one stroke, from pane A\'s end to pane B\'s');
});

test('a far end naming the other pane\'s document whole stands at that pane\'s first block, to the block\'s end', () => asReader('1.0.1', () => {
  const blocks = [{ pos: 3, width: 20 }, { pos: 23, width: 60 }];
  const toB = endShown(linkBy(DOC_A + '.0.2.1', '1.0.1'), passage(DOC_A, 50, 10), wholeOf(DOC_B));
  assert.deepEqual(drawn(linesBetween(paneLinks(DOC_A, [toB]), paneLinks(DOC_B, [], blocks))).map((l) => l[2]), [[3, 20]], 'pane B\'s first block');
  const toA = endShown(linkBy(DOC_B + '.0.2.1', '1.0.2'), passage(DOC_B, 7, 4), wholeOf(DOC_A));
  assert.deepEqual(drawn(linesBetween(paneLinks(DOC_A, [], blocks), paneLinks(DOC_B, [toA]))).map((l) => l[1]), [[3, 20]], 'pane A\'s first block');
}));

test('one document in both panes: a link inside it is drawn once for each way its two ends stand across the panes — never twice, never folded into one', () => asReader('1.0.1', () => {
  const I = linkBy(DOC_A + '.0.2.2', '1.0.1'), p = passage(DOC_A, 60, 5), q = passage(DOC_A, 80, 5);
  const both = [endShown(I, p, q), endShown(I, q, p)];
  assert.deepEqual(drawn(linesBetween(paneLinks(DOC_A, both), paneLinks(DOC_A, both))).map((l) => [l[1], l[2]]), [[[60, 5], [80, 5]], [[80, 5], [60, 5]]], 'p in A to q in B, and q in A to p in B: the pair a scene opened from either end sets level has its line');
}));

test('a link whose far end lies outside the other pane\'s document draws no line between the panes', () => asReader('1.0.1', () => {
  assert.deepEqual(linesBetween(paneLinks(DOC_A, [endShown(linkBy(DOC_A + '.0.2.1', '1.0.1'), passage(DOC_A, 50, 10), passage(DOC_C, 1, 5))]), paneLinks(DOC_B, [])), []);
}));

test('a line homed in the readable pane whose far end lies in a pane showing a cover — a covered draft\'s, its head alone, its projection refused `withheld` — ends at the cover, its end there marked so, in either pane; read as no cover the refused projection places it nowhere (issue #177: "Link lines homed in the readable pane stay, ending at the cover")', () => asReader('1.0.1', () => {
  const L = linkBy(DOC_A + '.0.2.1', '1.0.1');
  const refused = new Map([[L.addr + ' 2', /** @type {'withheld'} */ ('withheld')]]);
  /** the draft's pane: its head alone, the projection into it refused withheld, and whether it shows a cover */
  const draft = (/** @type {string} */ addr, /** @type {boolean} */ cover) => ({ ...paneLinks(addr, [], []), placed: refused, cover });
  const atA = endShown(L, passage(DOC_A, 50, 10), passage(DOC_B, 1, 5), null);
  const ends = (/** @type {import('./scene.js').Line[]} */ lines) => lines.map((l) => [l.link, l.a, l.b, looks(l.ink.a), looks(l.ink.b)]);
  assert.deepEqual(ends(linesBetween(paneLinks(DOC_A, [atA]), draft(DOC_B, true))), [[L.addr, { pos: 50, width: 10 }, { pos: 0, width: 0, cover: true }, [HUE.you, false], [HUE.you, false]]], 'one line, from its passage in pane A to the cover in pane B, in its ends\' marks');
  assert.deepEqual(linesBetween(paneLinks(DOC_A, [atA]), draft(DOC_B, false)), [], 'read as no cover: the refused projection places it nowhere, no line');
  const toA = endShown(L, passage(DOC_B, 50, 10), passage(DOC_A, 1, 5), null);
  assert.deepEqual(ends(linesBetween(draft(DOC_A, true), paneLinks(DOC_B, [toA]))).map((l) => [l[1], l[2]]), [[{ pos: 0, width: 0, cover: true }, { pos: 50, width: 10 }]], 'the cover in pane A: its end there');
}));

test('a line\'s far end stands where `project` places its passage now, never where the link stores it; one that floats at its pane\'s first block, where its follow lands; one nothing places draws no line', () => asReader('1.0.1', () => {
  const L = linkBy(DOC_A + '.0.2.1', '1.0.1'), blocks = [{ pos: 3, width: 20 }, { pos: 23, width: 60 }];
  const toB = (/** @type {Array<{pos: number, width: number}> | null} */ farRuns) => drawn(linesBetween(paneLinks(DOC_A, [endShown(L, passage(DOC_A, 50, 10), passage(DOC_B, 1, 5), farRuns)]), paneLinks(DOC_B, [], blocks)));
  assert.deepEqual(toB([{ pos: 30, width: 5 }]).map((l) => l[2]), [[30, 5]], 'stored at 1, standing at 30: at 30');
  assert.deepEqual(toB([]).map((l) => l[2]), [[3, 20]], 'floating: pane B\'s first block, to its end');
  assert.deepEqual(toB(null), [], 'placed nowhere: no line, never one to the stored position');
}));

test('a pane holding another version of the box a far end names takes the line at the far end where `project` placed it in that version\'s own text as the pane was set, whatever version LK placed it in for the plane (issue #154)', () => asReader('1.0.1', () => {
  const L = linkBy(DOC_A + '.0.2.1', '1.0.1'), B2 = DOC_B + '.2', blocks = [{ pos: 3, width: 20 }, { pos: 23, width: 60 }];
  // LK placed the far end at DOC_B's 30, the plane's box showing DOC_B; the scene's pane holds DOC_B's second version, where `project` placed it at 40
  const atA = endShown(L, passage(DOC_A, 50, 10), passage(DOC_B, 1, 5), [{ pos: 30, width: 5 }]);
  const placed = new Map([[L.addr + ' 2', [{ pos: 40, width: 5 }]]]);
  assert.deepEqual(drawn(linesBetween(paneLinks(DOC_A, [atA]), { ...paneLinks(B2, [], blocks), placed })).map((l) => l[2]), [[40, 5]], 'at 40 in the version the pane holds, never the 30 LK placed it at in DOC_B');
  assert.deepEqual(drawn(linesBetween(paneLinks(DOC_A, [atA]), paneLinks(DOC_B, [], blocks))).map((l) => l[2]), [[30, 5]], 'the pane holding DOC_B: at 30, as LK placed it');
  REC.takeProjection(L.addr, 2, B2, [{ pos: 60, width: 5 }]);
  try {
    assert.deepEqual(drawn(linesBetween(paneLinks(DOC_A, [atA]), { ...paneLinks(B2, [], blocks), placed })).map((l) => l[2]), [[40, 5]], 'the model holding another answer now: the line where the pane was set, never the model\'s now');
  } finally { REC.invalidate(B2); }
}));

test('a link met from both panes is one line wherever its ends stand now: its ends told apart by the spans the link stores, never by where they stand', () => asReader('1.0.1', () => {
  const L = linkBy(DOC_A + '.0.2.1', '1.0.1');
  // pane A's end, stored at 50, stands at 70 now: pane A places it there, and so does the projection pane B's end reads
  const atA = { ...endShown(L, passage(DOC_A, 50, 10), passage(DOC_B, 1, 5)), runs: [{ pos: 70, width: 10 }], pos: 70 };
  const atB = endShown(L, passage(DOC_B, 1, 5), passage(DOC_A, 50, 10), [{ pos: 70, width: 10 }]);
  assert.deepEqual(drawn(linesBetween(paneLinks(DOC_A, [atA]), paneLinks(DOC_B, [atB]))).map((l) => [l[1], l[2]]), [[[70, 10], [1, 5]]], 'one line, from where its end stands now');
}));

// ---- the scene's focus -----------------------------------------------------------------------------------------------

const A = '1.0.1.0.3', B = '1.0.1.0.4';
const A_TEXT = 'The window.\n\nIts passage stands here.', B_TEXT = 'The origin.\n\nIts passage stands here.';
/** the board's answer for an address it will say nothing of */
const NOT_REGISTERED = { refused: { kind: 'refused', name: 'doc_not_registered', code: 'doc_not_registered' } };
/** a document's metadata as `doc_metadata` answers it: an edition born at its first member, else a draft */
const metadata = (/** @type {string} */ doc, /** @type {boolean} */ published, /** @type {number} */ extent) => ({ result: { as_of: 1, resp: 'doc_metadata', doc, published, owner: '1.0.1', birth: published ? doc + '.1' : null, birth_extent: published ? String(extent) : null, placed: null, base_extent: null, source: null } });
/**
 * The reads of a document read whole: its extent, its metadata, its text, its image — its own bytes — and its links
 * (none); where it is an edition at its bare address, its chain's members to `members`, the next one not registered, as a
 * probe of the chain reads them
 * @param {string} doc
 * @param {string} text
 * @param {{published?: boolean, members?: number, image?: Array<{i_start: string, width: string}>}} [o]
 */
const reads = (doc, text, o = {}) => {
  const published = o.published ?? true, members = o.members ?? 1;
  /** @type {Record<string, unknown>} */
  const out = {
    [FAKE.keyOf('op', { frame: F.retrieveDocVSpanSet(doc) })]: { result: { as_of: 1, resp: 'span_set', set: [{ start: '1.1', width: '0.' + text.length }] } },
    [FAKE.keyOf('op', { frame: F.docMetadata(doc) })]: metadata(doc, published, text.length),
    [FAKE.keyOf('op', { frame: F.retrieveV(doc, 1, text.length) })]: { result: { as_of: 1, resp: 'delivery', items: [{ content: text }] } },
    [FAKE.keyOf('op', { frame: F.image(doc, 1, text.length) })]: { result: { as_of: 1, resp: 'runs', runs: o.image ?? [{ i_start: doc + '.0.1.1', width: String(text.length) }] } },
    [FAKE.keyOf('op', { frame: F.findLinksV(doc, 1, text.length) })]: { result: { as_of: 1, resp: 'addrs', addrs: [] } },
  };
  if (published) {
    for (let k = 2; k <= members; k++) out[FAKE.keyOf('op', { frame: F.docMetadata(doc + '.' + k) })] = metadata(doc + '.' + k, true, text.length);
    out[FAKE.keyOf('op', { frame: F.docMetadata(doc + '.' + (members + 1)) })] = NOT_REGISTERED;
  }
  return out;
};
/** `compare` over two documents whole: nothing shared (the bands are not these tests'), or the stretches named, `[u1, u2, width]` */
const compared = (/** @type {string} */ d1, /** @type {string} */ t1, /** @type {string} */ d2, /** @type {string} */ t2, /** @type {Array<[number, number, number]>} */ shared = []) => ({
  [FAKE.keyOf('op', { frame: F.compare([{ doc: d1, spans: [{ ordinal: 1, positions: t1.length }] }], [{ doc: d2, spans: [{ ordinal: 1, positions: t2.length }] }]) })]: { result: { as_of: 1, resp: 'compare', pairs: shared.map(([u1, u2, width]) => ({ d1, d2, u1: { ordinal: String(u1), subspace: '1' }, u2: { ordinal: String(u2), subspace: '1' }, width: String(width) })) } },
});
const script = { ...reads(A, A_TEXT), ...reads(B, B_TEXT), ...compared(A, A_TEXT, B, B_TEXT), ...compared(B, B_TEXT, A, A_TEXT) };

/** @type {ReturnType<typeof FAKE.create>} */
let fake;
before(() => {
  REC._reset();
  fake = FAKE.create(script);
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {}, onDrop: SCENE.dropped });
  REC.setBoard({ board: 'b-1', name: '', origin: '' }); REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  REC.takeIndex(/** @type {any} */ ({ docs: [{ doc: A, kind: 'edition', label: 'a', standing: 'public' }, { doc: B, kind: 'edition', label: 'b', standing: 'public' }], counts: [{ account: '1.0.1', documents: 2 }], state: { arm: 'complete' } }));
});

/**
 * A page of stand-ins: the platform's focus — the body where it stands on nothing — and the elements the scene, the
 * walk, the layer and the overlay host hold, attached to their owners. Each takes the focus only where the platform's
 * would: a pane or the bar while the scene is shown, the walk's item and a corner while their region is not inert, the
 * one line's act always. The platform's own `focus()` on an element that takes none moves nothing. Each pane's corner
 * and the bar's name for each pane stand as elements the scene writes again in place; the status region keeps what it
 * was told, in order (`said`).
 */
function page() {
  const body = { id: 'the body', focus() {} };
  const doc = { body, activeElement: /** @type {{id: string}} */ (body), createElement: (/** @type {string} */ tag) => element('a new ' + tag) };
  /** an element; `takes` whether the platform's focus lands on it now; `placed` the elements put in it, each with how */
  const element = (/** @type {string} */ id, takes = () => true) => {
    /** @type {Array<{how: 'append' | 'prepend', el: unknown}>} */
    const placed = [];
    const e = {
      id, isConnected: true, innerHTML: '', textContent: '', dataset: /** @type {Record<string, string>} */ ({}), style: {}, inert: false, tabIndex: -1,
      scrollTop: 0, scrollHeight: 0, clientTop: 0, clientWidth: 600, clientHeight: 400, placed,
      focus() { if (takes()) doc.activeElement = e; },
      blur() { if (doc.activeElement === e) doc.activeElement = body; },
      append(/** @type {unknown} */ el) { placed.push({ how: 'append', el }); }, prepend(/** @type {unknown} */ el) { placed.unshift({ how: 'prepend', el }); },
      setAttribute() {}, removeAttribute() {}, addEventListener() {}, getContext: () => null,
      getBoundingClientRect: () => ({ top: 0, left: 0, right: 600, bottom: 400, width: 600, height: 400 }),
      /** @type {(s: string) => unknown} */ querySelector: () => null,
      /** @type {(s: string) => unknown[]} */ querySelectorAll: () => [],
      /** @type {(x: unknown) => boolean} */ contains: (x) => x === e,
      classList: { toggle() {} },
    };
    return e;
  };
  const classes = new Set();
  const shown = () => classes.has('on');
  const root = Object.assign(element('the scene'), { classList: { add: (/** @type {string} */ c) => { classes.add(c); }, remove: (/** @type {string} */ c) => { classes.delete(c); }, toggle() {} } });
  const bar = element('the scene\'s bar', shown), paneA = element('pane A', shown), paneB = element('pane B', shown);
  const cornerA = element('pane A\'s corner', shown), cornerB = element('pane B\'s corner', shown);
  paneA.querySelector = (s) => (s === ':scope > .corner' ? cornerA : null);
  paneB.querySelector = (s) => (s === ':scope > .corner' ? cornerB : null);
  const names = { a: element('the bar\'s name for pane A'), b: element('the bar\'s name for pane B') };
  bar.querySelector = (s) => (s === '[data-name="a"]' ? names.a : s === '[data-name="b"]' ? names.b : null);
  /** @type {string[]} what the status region was told, in order */
  const said = [];
  const live = element('the status region');
  Object.defineProperty(live, 'textContent', { get: () => said[said.length - 1] ?? '', set: (/** @type {string} */ v) => { said.push(v); } });
  FOCUS.attach({ live: /** @type {any} */ (live) });
  root.contains = (x) => [root, bar, paneA, paneB].includes(/** @type {any} */ (x));
  const mirror = element('the tree', () => !mirror.inert);
  const item = element('the walk\'s current item', () => !mirror.inert);
  mirror.contains = (x) => x === item;
  mirror.querySelector = (s) => (s === '#walk-' + WALK.mirrorIndex() ? item : null);
  const corners = element('the corner layer');
  const corner = element('the corner', () => !corners.inert);
  const line = element('the one line\'s ‹ back');
  const overlay = Object.assign(element('the overlay'), { querySelectorAll: () => [] });
  globalThis.document = /** @type {any} */ (doc);
  WALK.attach(/** @type {any} */ (mirror), /** @type {any} */ (element('the live region')));
  LAYER.attach(/** @type {any} */ (element('the text layer')), /** @type {any} */ (corners));
  SCENE.attach(/** @type {any} */ ({ root, bar, paneA, paneB, canvas: element('the scene\'s canvas') }));
  HOST.attach(/** @type {any} */ (overlay));
  /** where the platform's focus stands */
  const at = () => doc.activeElement.id;
  /** the plane's two regions: is each inert? */
  const covered = () => [mirror.inert, corners.inert];
  return { doc, item, corner, line, paneA, paneB, cornerA, cornerB, names, said, at, covered };
}

/** the test run on a page of stand-ins, the platform's `document` put back after it */
async function onPage(/** @type {(p: ReturnType<typeof page>) => Promise<void>} */ body) {
  const platform = globalThis.document;
  try { await body(page()); } finally { SCENE.close(); globalThis.document = platform; }
}

test('the scene opened from the walk\'s item covers the plane while it stands; its end uncovers it and returns the focus to the item', () => onPage(async (p) => {
  p.item.focus();
  await SCENE.open(A, B);
  assert.equal(SCENE.isOpen(), true);
  assert.deepEqual(p.covered(), [true, true], 'the tree and the corner layer are out of the page\'s order while the scene stands');
  assert.equal(p.at(), 'pane B', 'the focus in the far end\'s pane');
  SCENE.close();
  assert.deepEqual(p.covered(), [false, false], 'the plane back in the order');
  assert.equal(p.at(), 'the walk\'s current item', 'the focus at the element the scene was opened from (K-63)');
  assert.deepEqual(fake.unanswered, []);
}));

test('the end puts the plane back before it returns the focus: a corner the scene was opened from has it back', () => onPage(async (p) => {
  p.corner.focus();
  await SCENE.open(A, B);
  assert.equal(p.at(), 'pane B');
  SCENE.close();
  assert.equal(p.at(), 'the corner');
}));

test('a scene opened over a standing one returns the focus to the first one\'s opener', () => onPage(async (p) => {
  p.corner.focus();
  await SCENE.open(A, B);
  await SCENE.open(B, A);
  assert.equal(p.at(), 'pane B', 'the second scene\'s far end, its pane');
  SCENE.close();
  assert.equal(p.at(), 'the corner', 'never the pane the second opening found the focus in');
  assert.deepEqual(fake.unanswered, []);
}));

test('a focus the person moved out of the scene stays where they put it; one opened with the focus on nothing returns it to the walk\'s element', () => onPage(async (p) => {
  p.item.focus();
  await SCENE.open(A, B);
  p.line.focus();
  SCENE.close();
  assert.equal(p.at(), 'the one line\'s ‹ back', 'the scene\'s end takes no focus from the one line');
  p.doc.activeElement = p.doc.body;
  await SCENE.open(A, B);
  assert.equal(p.at(), 'pane B');
  SCENE.close();
  assert.equal(p.at(), 'the walk\'s current item', 'a scene opened with the focus on nothing — the scene-offer\'s click — returns it to the walk\'s element: never lost, never to the top');
}));

// ---- the panes' articles: T-LAYER's mount ------------------------------------------------------------------------------

test('each pane holds T-LAYER\'s article of its document, made from the text the scene read, on the inner side of its corner — an edition read at its bare address made as the member its text is', () => onPage(async (p) => {
  await SCENE.open(A, B);
  const [a, b] = [p.paneA.placed, p.paneB.placed];
  assert.deepEqual([a.map((x) => x.how), b.map((x) => x.how)], [['append'], ['prepend']], 'pane A\'s article after its corner, pane B\'s before it: each corner on its pane\'s outer side');
  assert.ok(p.paneA.innerHTML.includes(`data-corner="${A}"`) && p.paneB.innerHTML.includes(`data-corner="${B}"`), 'each pane\'s corner its own document\'s, named by the address it shows');
  for (const [addr, placed] of /** @type {const} */ ([[A, a[0]], [B, b[0]]])) {
    const d = REC.doc(addr);
    assert.deepEqual(LAYER.madeOf(/** @type {any} */ (placed.el)), { addr: addr + '.1', blocks: d.blocks, runs: d.runs, image: d.image }, `${addr}: the pane's article is T-LAYER's, made from the blocks, runs and image the scene read, as ${addr}.1 — the member its text is, which its acts name`);
  }
  assert.deepEqual(SCENE.pair(), { a: A + '.1', b: B + '.1' }, 'the addresses the panes\' acts name and their positions are measured against');
  assert.deepEqual(fake.unanswered, []);
}));

// ---- the opening: O-HOST's ---------------------------------------------------------------------------------------------

test('the dismissal a navigation act makes first, Esc, or an overlay shown, made while the scene reads ends its opening: no compare asked after it, and once its reads answer nothing opens', () => onPage(async (p) => {
  const both = F.compare([{ doc: A, spans: [{ ordinal: 1, positions: A_TEXT.length }] }], [{ doc: B, spans: [{ ordinal: 1, positions: B_TEXT.length }] }]);
  const cmp = FAKE.keyOf('op', { frame: both });
  /** where the scene left the page: whether it stands, the plane's two regions inert, the focus, the regions holding it */
  const left = () => ({ open: SCENE.isOpen(), covered: p.covered(), at: p.at(), standing: FOCUS.standing() });
  /** @type {Array<[string, () => void, string[]]>} each act, and the regions it leaves standing: the overlay a show conjured, which takes no focus */
  const ends = [
    ['the dismissal a navigation act makes first', () => { HOST.dismiss(); SCENE.close(); }, []],
    ['Esc', () => KEYS.esc(), []],
    ['an overlay shown — a follow\'s face', () => FACES.invalidFollow(null), ['overlay']],
  ];
  for (const [what, end, standing] of ends) {
    /** the page as the act leaves it: no scene, the plane in the page's order, the focus where it stood */
    const unopened = { open: false, covered: [false, false], at: 'the walk\'s current item', standing };
    p.item.focus();
    // while it reads its documents: the first edition read anew, its extent held
    REC.invalidate(A);
    const from = fake.asked.length;
    let release = fake.hold('op', { frame: F.retrieveDocVSpanSet(A) });
    let opening = SCENE.open(A, B);
    end();
    release();
    await opening;
    assert.deepEqual(left(), unopened, `${what}, made while it reads its documents: nothing opens`);
    assert.ok(!fake.asked.slice(from).includes(cmp), `${what}, made while it reads its documents: no compare asked after it`);
    // while it reads their compare
    release = fake.hold('op', { frame: both });
    opening = SCENE.open(A, B);
    for (let i = 0; i < 200 && !fake.asked.slice(from).includes(cmp); i++) await new Promise((r) => setTimeout(r, 0));
    assert.ok(fake.asked.slice(from).includes(cmp), `${what}: the compare asked`);
    end();
    release();
    await opening;
    assert.deepEqual(left(), unopened, `${what}, made while it reads their compare: nothing opens`);
    HOST.dismiss();
  }
  assert.deepEqual(fake.unanswered, []);
}));

test('the opening asks where the far end of each link crossing between the panes stands now — once per link and slot, beside the compare — and asks none it already holds', () => onPage(async (p) => {
  const C = '1.0.1.0.8', E = '1.0.1.0.9', C_TEXT = 'Gamma.\n\nIts words.', E_TEXT = 'Epsilon.\n\nIts words.', X = C + '.0.2.1';
  const end = (/** @type {string} */ doc, /** @type {number} */ ord) => [{ start: `${doc}.0.1.${ord}`, width: '0.0.0.0.0.0.0.3' }];
  // the person's citation from C's first word to E's second paragraph, drawn at both; where each of its ends stands now
  Object.assign(script, reads(C, C_TEXT), reads(E, E_TEXT), compared(C, C_TEXT, E, E_TEXT), {
    [FAKE.keyOf('op', { frame: F.findLinksV(C, 1, C_TEXT.length) })]: { result: { as_of: 1, resp: 'addrs', addrs: [X] } },
    [FAKE.keyOf('op', { frame: F.findLinksV(E, 1, E_TEXT.length) })]: { result: { as_of: 1, resp: 'addrs', addrs: [X] } },
    [FAKE.keyOf('op', { frame: F.readLink(X) })]: { result: { as_of: 1, resp: 'link_value', link: { slots: [end(C, 1), end(E, 11), [{ start: CITE, width: '0.0.0.0.0.0.0.0.1' }]] } } },
    [FAKE.keyOf('op', { frame: F.project(X, 2, E) })]: { result: { as_of: 1, resp: 'span_set', set: [{ start: '1.11', width: '0.3' }] } },
    [FAKE.keyOf('op', { frame: F.project(X, 1, C) })]: { result: { as_of: 1, resp: 'span_set', set: [{ start: '1.1', width: '0.3' }] } },
  });
  const projections = (/** @type {number} */ from) => fake.asked.slice(from).filter((k) => k.includes('"op":"project"'));
  p.item.focus();
  const from = fake.asked.length;
  await SCENE.open(C, E);
  assert.equal(SCENE.isOpen(), true);
  assert.deepEqual(projections(from).sort(), [F.project(X, 1, C), F.project(X, 2, E)].map((frame) => FAKE.keyOf('op', { frame })).sort(), 'each end the other pane shows it at, once');
  assert.deepEqual([REC.projection(X, 2, E), REC.projection(X, 1, C)], [[{ pos: 11, width: 3 }], [{ pos: 1, width: 3 }]], 'held, the lines read from them');
  SCENE.close();
  const again = fake.asked.length;
  await SCENE.open(C, E);
  assert.deepEqual(projections(again), [], 'held: none asked again');
  assert.deepEqual(fake.unanswered, []);
}));

// ---- a pane kept fresh by its kind (issue #160's design decision) -----------------------------------------------------

// an edition of two members read at its bare address, its third member published later; a draft edited between two reads;
// a version opened at its member's address
const ED = '1.0.1.0.5', ED2 = ED + '.2', ED3 = ED + '.3', DR = '1.0.1.0.6', VE = '1.0.1.0.7', VE1 = VE + '.1', LDR = DR + '.0.2.1';
const ED_TEXT = 'The edition.\n\nIts second version holds this.', ED3_TEXT = 'The edition.\n\nIts third version holds this.\n\nAnd a new end.';
/** the edition's first paragraph and its separator, shared by its second and third members */
const ED_HEAD = 'The edition.\n\n'.length;
const DR_HEAD = 'A draft.\n\n', DR_OLD = 'Its first words.', DR_NEW = 'Words set before them.\n\n';
const DR_V1 = DR_HEAD + DR_OLD, DR_V2 = DR_HEAD + DR_NEW + DR_OLD;
/** the draft's second text by identity: its first paragraph and its old words their own bytes, the inserted words minted after them */
const DR_V2_IMAGE = [
  { i_start: DR + '.0.1.1', width: String(DR_HEAD.length) },
  { i_start: `${DR}.0.1.${DR_V1.length + 1}`, width: String(DR_NEW.length) },
  { i_start: `${DR}.0.1.${DR_HEAD.length + 1}`, width: String(DR_OLD.length) },
];
const VE_TEXT = 'A version.\n\nIts words.';
const WITHHELD = { refused: { kind: 'refused', name: 'withheld', code: 'withheld' } };
Object.assign(script, reads(ED, ED_TEXT, { members: 2 }), reads(DR, DR_V1, { published: false }), compared(ED, ED_TEXT, DR, DR_V1));

/** a feed row of the board's, as the shell hands it */
const row = (/** @type {number} */ position, /** @type {string | null} */ op, /** @type {string[] | null} */ docs, /** @type {'published' | 'drafts'} */ cls, /** @type {string} */ link = '') =>
  ({ board: 'b-1', update: { position, at: position, op, docs, class: cls, ...(link ? { link } : {}) } });
/** every pane setting the scene asked has landed */
async function landed() {
  for (let i = 0; i < 400 && SCENE.updating(); i++) await new Promise((r) => setTimeout(r, 0));
  assert.equal(SCENE.updating(), false, 'every setting of a pane landed');
}
/** a pane as the scene holds it, by what these tests read of it */
const paneState = (/** @type {'a' | 'b'} */ side) => { const P = SCENE.panes()?.[side]; return P && { kind: P.kind, src: P.src, names: P.names, shows: P.shows, k: P.k, n: P.n, read: P.read, lacks: P.lacks }; };
/** the article a pane shows: pane A's placed last, pane B's first */
const shownIn = (/** @type {{placed: Array<{el: unknown}>}} */ pane, /** @type {'a' | 'b'} */ side) => /** @type {any} */ ((side === 'a' ? pane.placed[pane.placed.length - 1] : pane.placed[0]).el);

test('an edit row naming a draft pane\'s document reads it again whole and sets it in its place — the article made from the text read now, the other pane untouched (issue #160)', () => onPage(async (p) => {
  await SCENE.open(ED, DR);
  assert.deepEqual([paneState('a'), paneState('b')], [
    { kind: 'bare', src: ED, names: ED2, shows: ED, k: 2, n: 2, read: null, lacks: null },
    { kind: 'draft', src: DR, names: DR, shows: DR, k: null, n: null, read: null, lacks: null },
  ], 'pane A an edition read at its bare address, naming the member its text is; pane B a draft');
  const a = shownIn(p.paneA, 'a');
  Object.assign(script, reads(DR, DR_V2, { published: false, image: DR_V2_IMAGE }), compared(ED, ED_TEXT, DR, DR_V2));
  fake.fire('feed', row(10, 'insert', [DR], 'drafts'));
  assert.equal(SCENE.updating(), true, 'pane B is read again');
  await landed();
  const d = REC.doc(DR);
  assert.ok(d.blocks.some((x) => x.text === 'Words set before them.'), 'the model holds the edited text');
  assert.deepEqual(LAYER.madeOf(shownIn(p.paneB, 'b')), { addr: DR, blocks: d.blocks, runs: d.runs, image: d.image }, 'pane B\'s article made from the draft\'s text now');
  assert.deepEqual([p.paneA.placed.length, shownIn(p.paneA, 'a') === a], [1, true], 'pane A set nowhere again');
  assert.deepEqual(fake.unanswered, []);
}));

test('a row naming a newer member pins an edition read at its bare address at once — its head, the bar and its corner naming the member its text is, "version 2 of 3", its corner offering version 3, the arrival said once — then sets it again from that member; the corner\'s act reads version 3 in the pane\'s place, the passage the version lacks said so, the plane\'s box untouched, and version 2 one act away (issue #160)', () => onPage(async (p) => {
  await SCENE.open(ED, DR);
  assert.deepEqual(paneState('a'), { kind: 'bare', src: ED, names: ED2, shows: ED, k: 2, n: 2, read: null, lacks: null });
  const told = p.said.length, arrived = t('F.arrival.pane', { k: 2 });
  Object.assign(script, reads(ED2, ED_TEXT), compared(ED2, ED_TEXT, DR, DR_V2));
  fake.fire('feed', row(11, 'publish', [ED3], 'published'));
  // at once, from the row, no read awaited
  assert.deepEqual(paneState('a'), { kind: 'pinned', src: ED2, names: ED2, shows: ED2, k: 2, n: 3, read: 3, lacks: null }, 'pinned to the member its text is, offering the newest');
  const corner = p.cornerA.innerHTML;
  assert.ok(corner.includes(esc(t('F.corner.pinned', { published: t('F.published.notebook'), k: 2 }))) && corner.includes(esc(t('F.version-of', { k: 2, n: 3 }))), `its corner reads version 2 of 3, never the latest: ${corner}`);
  assert.ok(!corner.includes(esc(t('F.corner.latest', { published: t('F.published.notebook') }))), 'never "the latest"');
  assert.ok(corner.includes(`data-read="3"`) && corner.includes(esc(t('F.versions.read', { k: 3 }))), 'its corner\'s act: read version 3');
  assert.ok(String(shownIn(p.paneA, 'a').innerHTML).includes(`<span class="addr">${ED2}</span>`) && p.names.a.textContent === ED2, 'its head and the bar name the member');
  assert.deepEqual(p.said.slice(told), [arrived], 'the arrival said once, politely');
  await landed();
  const two = REC.doc(ED2);
  assert.deepEqual(LAYER.madeOf(shownIn(p.paneA, 'a')), { addr: ED2, blocks: two.blocks, runs: two.runs, image: two.image }, 'set again from the member read whole: its marks and lines its own');
  assert.deepEqual(p.said.slice(told), [arrived], 'said once, however it is set after');
  // the corner's act: version 3 read in the pane's place, the passage held — the second version's second paragraph, which
  // the third does not hold — kept at the nearest shared position and said to be missing
  Object.assign(script, reads(ED3, ED3_TEXT), compared(ED2, ED_TEXT, ED3, ED3_TEXT, [[1, 1, ED_HEAD]]), compared(ED3, ED3_TEXT, DR, DR_V2));
  SCENE.act('a', { pos: ED_HEAD + 1, width: 10 });
  await landed();
  assert.deepEqual(paneState('a'), { kind: 'pinned', src: ED3, names: ED3, shows: ED3, k: 3, n: 3, read: 2, lacks: 3 }, 'version 3 in the pane, version 2 one act away');
  const three = REC.doc(ED3);
  assert.deepEqual(LAYER.madeOf(shownIn(p.paneA, 'a')), { addr: ED3, blocks: three.blocks, runs: three.runs, image: three.image }, 'its text version 3\'s');
  assert.ok(p.cornerA.innerHTML.includes(esc(t('F.floating.member', { k: 3 }))) && p.cornerA.innerHTML.includes(esc(t('F.versions.read', { k: 2 }))), `the corner says the passage is not in version 3, and offers version 2: ${p.cornerA.innerHTML}`);
  assert.equal(GO.shownIn(ED), ED, 'the plane\'s box untouched: the pane\'s version is the scene\'s own');
  // back to version 2, a passage both hold: nothing said missing
  Object.assign(script, compared(ED3, ED3_TEXT, ED2, ED_TEXT, [[1, 1, ED_HEAD]]));
  SCENE.act('a', { pos: 1, width: 5 });
  await landed();
  assert.deepEqual(paneState('a'), { kind: 'pinned', src: ED2, names: ED2, shows: ED2, k: 2, n: 3, read: 3, lacks: null }, 'version 2 again, one act');
  assert.deepEqual(fake.unanswered, []);
}));

test('a row naming a newer member at a pane on a version counts its chain alone: "version 1 of 2", no act offered, its text read nowhere again (issue #160)', () => onPage(async (p) => {
  Object.assign(script, reads(VE1, VE_TEXT), compared(VE1, VE_TEXT, DR, DR_V2));
  await SCENE.open(VE1, DR);
  assert.deepEqual(paneState('a'), { kind: 'pinned', src: VE1, names: VE1, shows: VE1, k: 1, n: null, read: null, lacks: null });
  const from = fake.asked.length;
  fake.fire('feed', row(12, 'publish', [VE + '.2'], 'published'));
  assert.equal(SCENE.updating(), false, 'no pane read again');
  assert.deepEqual(paneState('a'), { kind: 'pinned', src: VE1, names: VE1, shows: VE1, k: 1, n: 2, read: null, lacks: null });
  assert.ok(p.cornerA.innerHTML.includes(esc(t('F.version-of', { k: 1, n: 2 }))) && !p.cornerA.innerHTML.includes('data-read'), `its "of n" alone: ${p.cornerA.innerHTML}`);
  assert.deepEqual(fake.asked.slice(from), [], 'nothing read');
}));

test('a link row reaching a pane\'s text reads it again in its place: its marks drawn from the links it reads now (issue #160)', () => onPage(async (p) => {
  await SCENE.open(VE1, DR);
  assert.ok(!String(shownIn(p.paneB, 'b').innerHTML).includes(`data-links="${LDR}"`), 'no link marked before the row');
  Object.assign(script, {
    [FAKE.keyOf('op', { frame: F.findLinksV(DR, 1, DR_V2.length) })]: { result: { as_of: 1, resp: 'addrs', addrs: [LDR] } },
    [FAKE.keyOf('op', { frame: F.readLink(LDR) })]: { result: { as_of: 1, resp: 'link_value', link: { slots: [[{ start: DR + '.0.1.1', width: '0.0.0.0.0.0.0.5' }], [{ start: VE, width: '0.0.0.0.1' }], [{ start: CITE, width: '0.0.0.0.0.0.0.0.1' }]] } } },
  });
  fake.fire('feed', row(13, 'make_link', [DR], 'drafts', LDR));
  await landed();
  const b = shownIn(p.paneB, 'b'), d = REC.doc(DR);
  assert.ok(String(b.innerHTML).includes(`data-links="${LDR}"`), 'the new link marked at its span');
  assert.deepEqual(LAYER.madeOf(b), { addr: DR, blocks: d.blocks, runs: d.runs, image: d.image }, 'made from the text read again');
  assert.deepEqual(fake.unanswered, []);
}));

test('the re-level and a pane\'s key made while a pane is being set again wait for it, and act once it lands, in the order made (issue #160)', () => onPage(async (p) => {
  await SCENE.open(VE1, DR);
  const release = fake.hold('op', { frame: F.retrieveDocVSpanSet(DR) });
  fake.fire('feed', row(14, 'insert', [DR], 'drafts'));
  assert.equal(SCENE.updating(), true, 'pane B is being set again');
  p.paneB.scrollTop = 123;
  SCENE.relevel();
  assert.equal(SCENE.key('PageDown'), true, 'the key is taken');
  assert.equal(p.paneB.scrollTop, 123, 'neither has acted while the pane reads');
  release();
  await landed();
  assert.equal(p.paneB.scrollTop, 0.8 * p.paneB.clientHeight, 'once it lands: the re-level, setting the pane at its top, then the key paging it');
  assert.deepEqual(fake.unanswered, []);
}));

test('the page\'s own death takes every pane down at once — nothing of the dead session\'s text, no tie — and reads each again at the guest\'s class, a draft withheld from the guest standing as its head alone (issue #160)', () => onPage(async (p) => {
  await SCENE.open(VE1, DR);
  assert.ok(LAYER.madeOf(shownIn(p.paneB, 'b'))?.blocks.length, 'the draft\'s text stands in pane B');
  Object.assign(script, {
    [FAKE.keyOf('op', { frame: F.retrieveDocVSpanSet(DR) })]: WITHHELD,
    [FAKE.keyOf('places', { board: 'b-1' })]: { result: { docs: [], counts: [], state: { arm: 'complete' } } },
  });
  try {
    fake.fire('session-died', { session: 's-1', reason: { arm: 'closed' } });
    assert.deepEqual([shownIn(p.paneA, 'a'), shownIn(p.paneB, 'b')].map((el) => LAYER.madeOf(el)?.blocks), [[], []], 'at once: no pane holds any of its text');
    assert.deepEqual(SCENE.ties(), [], 'and no tie stands');
    await landed();
    const b = shownIn(p.paneB, 'b'), a = shownIn(p.paneA, 'a');
    assert.deepEqual(LAYER.madeOf(b)?.blocks, [], 'the draft, withheld from the guest, holds no text');
    assert.ok(String(b.innerHTML).includes(esc(t('F.corner.withheld', { owner: '1.0.1' }))), `its head alone, withheld: ${b.innerHTML}`);
    assert.deepEqual(LAYER.madeOf(a)?.blocks.map((x) => x.text), ['A version.', 'Its words.'], 'the version read again as the guest reads it');
    assert.deepEqual(fake.unanswered, []);
  } finally { REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' }); }
}));
