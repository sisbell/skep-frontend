// SC's test: the two ends the scene sets level — the held passage's first
// shared stretch and its counterpart, a far end as the opener names it, the
// first pair with nothing held, the second pane at its top with nothing
// shared, nothing of a document a far end names whole — and the runs the
// bands are drawn from; a passage's counterpart
// and counterparts, clipped to the passage in the first document's order,
// and the position two versions share nearest a passage the second holds
// none of (FP-22); the lines between the panes — one per link and pair of
// ends however the ends stand or moved, each end in the mark its pane's
// document gives the link, changing colour once at the middle of the gap, a
// whole-work end at its pane's facing edge, drawn whole in the one mark its
// ends there merge into, a floating one at its pane's first block, a far end
// where `project` places it in the version the pane holds, a line ending at
// a covered pane's cover (FP-29, FP-30) — the stop picking the next shared
// passage out of view, and the opening asking each crossing far end once.
// Then, against the fake port and a page of stand-ins: the scene's focus —
// the plane covered while it stands, uncovered before the focus returns to
// the opener, the first opener kept across a scene opened over another, a
// focus moved out of the scene left alone (FP-20); the scene a step on the
// trail through N-GO — its opening one entry at the act, its own close a
// Back lighting the passage it was opened from, the scene recorded as left
// and reopened so by Forward and by Back after a teleport out, the focus on
// the stop it stood on, an opening abandoned or refused giving its entry
// back (FP-25); each pane's article
// T-LAYER's mount on the inner side of its corner, its byline's facts read
// before the pane is set (FP-12, FP-34); the opening ended by a navigation
// act's dismissal, Esc or an overlay shown, asking no `compare` after it and
// opening nothing; and a pane kept fresh by its kind (FP-23) — a draft read
// again in place, an edition at its bare address pinned at once to the
// member its text is and set again from it, its corner's act reading
// another version in the pane's place with the passage held, a version
// counting its chain alone, a link row re-reading the text, acts made while
// a pane reads waiting in order, the page's death taking every pane down and
// reading each again as a guest, and a refresh pinning an edition whose
// chain it counted past the member shown; and a scene opened on a document a
// far end names whole — the far pane that version or the latest, named as
// the link's whole end and current, its `compare` answering after it shows
// and adding bands alone, moving no pane and no focus (FP-20, FP-30).
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
import { levels, merged, counterpart, counterparts, nearest, linesBetween, carriedTo, wholeEdges, drawEdge, stopFor } from './scene.js';
import * as GO from '../nav/go.js';
import * as TRAIL from '../nav/trail.js';
import * as CAM from '../plane/camera.js';
import { t, tHTML } from '../strings.js';
import { esc } from '../util.js';
import * as LK from '../links/links.js';
import { inkOf } from '../beams/beams.js';
import { HUE, NEUTRAL_HUE, VISITED_ALPHA, SAMENESS } from '../plane/register.js';
import * as ANATOMY from '../overlays/anatomy-card.js';
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

test('a far end naming the second document whole sets nothing of it level: the held passage at its own first position, the second pane at its top, whatever the two share (issue #59\'s design decision: "never lines the near passage up with any passage of that document")', () => {
  const moved = [pair(1, 101, 1466), pair(1467, 9, 240)];
  assert.deepEqual(levels(moved, { posA: 1400, widthA: 100, wholeB: true }), { a: 1400, b: null }, 'never the counterpart, 1500, its first shared stretch has');
  assert.deepEqual(levels([pair(1467, 1, 240)], { posA: 1400, widthA: 100, wholeB: true }), { a: 1400, b: null }, 'never the shared stretch\'s start, 1467, past the passage\'s own');
  assert.deepEqual(levels(runs, { posA: 951, widthA: 4, posB: 12, wholeB: true }), { a: 951, b: null }, 'nor a position the opener names in it');
  assert.deepEqual(levels(runs, { wholeB: true }), { a: null, b: null }, 'nothing held: both panes at their tops, never the first pair\'s two ends');
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

test('a far end naming the other pane\'s document whole is that whole document, in either pane: it stands at no position of it and no block, marked whole, its mark there the one that pane\'s document gives the link; into a pane showing a cover, at the cover (issue #59\'s design decision: "The end\'s shape shows what the link points at")', () => asReader('1.0.1', () => {
  const blocks = [{ pos: 3, width: 20 }, { pos: 23, width: 60 }];
  const mine = linkBy(DOC_A + '.0.2.1', '1.0.1'), theirs = linkBy(DOC_B + '.0.2.1', '1.0.2');
  const toB = endShown(mine, passage(DOC_A, 50, 10), wholeOf(DOC_B));
  const intoB = linesBetween(paneLinks(DOC_A, [toB]), paneLinks(DOC_B, [], blocks));
  assert.deepEqual(intoB.map((l) => [l.a, l.b]), [[{ pos: 50, width: 10 }, { pos: 0, width: 0, whole: true }]], 'pane B whole, never its first block');
  assert.deepEqual(intoB.map((l) => [l.marks.a, l.marks.b]), [[LK.markOf(mine, DOC_A), LK.markOf(mine, DOC_B)]], 'each end the mark its pane\'s document gives the link');
  const toA = endShown(theirs, passage(DOC_B, 7, 4), wholeOf(DOC_A));
  assert.deepEqual(linesBetween(paneLinks(DOC_A, [], blocks), paneLinks(DOC_B, [toA])).map((l) => [l.a, l.b]), [[{ pos: 0, width: 0, whole: true }, { pos: 7, width: 4 }]], 'pane A whole');
  assert.deepEqual(linesBetween(paneLinks(DOC_A, [toB]), { ...paneLinks(DOC_B, [], []), cover: true }).map((l) => l.b), [{ pos: 0, width: 0, cover: true }], 'a pane showing a cover: at the cover, as every far end crossing into it');
}));

test('the facing edge a whole document\'s ends meet stands in the one mark they merge into there — one link\'s own mark; several links\', the hue they share or the neutral one where their linkers differ, lighter only where every one was followed — one edge for each pane such ends meet, in the panes\' order, none for a band (P44; FP-30)', () => asReader('1.0.1', () => {
  const mine = linkBy(DOC_A + '.0.2.1', '1.0.1'), theirs = linkBy('1.0.3.0.9.0.2.1', '1.0.3');
  /** a tie a link draws between the panes, its end in pane `side` whole, each end in the mark its pane's document gives it */
  const tie = (/** @type {{addr: string, owner: string}} */ l, /** @type {'a' | 'b'} */ side) => ({ link: l.addr, a: { whole: side === 'a' }, b: { whole: side === 'b' }, marks: { a: LK.markOf(/** @type {any} */ (l), DOC_A), b: LK.markOf(/** @type {any} */ (l), DOC_B) } });
  const band = { link: null, a: {}, b: {} };
  const looks = (/** @type {ReturnType<typeof wholeEdges>} */ es) => es.map((e) => [e.side, e.links, e.mark.hue, e.mark.value]);
  assert.deepEqual(looks(wholeEdges([tie(mine, 'b'), band])), [['b', [mine.addr], HUE.you, 1]], 'one link\'s whole end in pane B: its edge in that link\'s mark there, the band apart');
  assert.deepEqual(looks(wholeEdges([tie(mine, 'b'), tie(theirs, 'b')])), [['b', [mine.addr, theirs.addr], NEUTRAL_HUE, 1]], 'two links\' there, their linkers differing: one edge, in the neutral hue');
  assert.deepEqual(looks(wholeEdges([tie(theirs, 'a'), tie(mine, 'b')])), [['a', [theirs.addr], HUE.others, 1], ['b', [mine.addr], HUE.you, 1]], 'one in each pane: an edge each, in the panes\' order');
  LK.follow(mine.addr);
  assert.deepEqual(looks(wholeEdges([tie(mine, 'b')])).map((e) => e[3]), [VISITED_ALPHA], 'its link followed: lighter');
  assert.deepEqual(looks(wholeEdges([tie(mine, 'b'), tie(theirs, 'b')])).map((e) => e[3]), [1], 'one of two followed: full');
  assert.deepEqual(wholeEdges([band]), [], 'no whole end: no edge');
}));

test('a whole document\'s edge is one straight stroke down its pane\'s facing edge, from the pane\'s visible top to its visible bottom, in its ink — dashed where the ink is — butt-capped so it ends where the view does', () => {
  const { ctx, strokes } = recorder();
  ctx.lineWidth = 3;
  drawEdge(ctx, 601.5, 40, 640, inkOf(/** @type {any} */ ({ hue: HUE.others, linker: 'others' })));
  assert.deepEqual(strokes.map((s) => [s.hue, s.dash, s.cap, s.width, s.start, s.line, s.curve]), [[HUE.others, [5, 4], 'butt', 3, { x: 601.5, y: 40 }, { x: 601.5, y: 640 }, []]]);
});

test('the stop stands for the first shared passage out of pane B\'s view, from the one its next act goes to and round again, on its bearing — none where every one stands in view (issue #59\'s design decision: "Where there are several, it shows a count and each further act goes to the next")', () => {
  const shared = [{ y: 100 }, { y: 900 }, { y: 1500 }];
  assert.deepEqual(stopFor(shared, 0, { top: 0, h: 400 }), { i: 1, above: false }, 'the first in view: the next, below');
  assert.deepEqual(stopFor(shared, 2, { top: 0, h: 400 }), { i: 2, above: false }, 'from the one the next act goes to');
  assert.deepEqual(stopFor(shared, 1, { top: 800, h: 400 }), { i: 2, above: false }, 'the one it went to in view: on to the one after it');
  assert.deepEqual(stopFor(shared, 2, { top: 1300, h: 400 }), { i: 0, above: true }, 'past the last in view: round again to the first, above');
  assert.equal(stopFor([{ y: 100 }], 0, { top: 0, h: 400 }), null, 'every one in view: none');
  assert.equal(stopFor([], 0, { top: 0, h: 400 }), null, 'nothing shared: none');
});

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
/** the byline's facts of 1.0.1, the panes' owner, as its board answers them: no key enrolled at it and none above — unsigned (FP-34) */
const OWNER_KEYS = { [FAKE.keyOf('op', { frame: F.keySet('1.0.1') })]: { result: { as_of: 1, resp: 'key_set', enrolled: [], retired: [] } } };
const script = { ...reads(A, A_TEXT), ...reads(B, B_TEXT), ...compared(A, A_TEXT, B, B_TEXT), ...compared(B, B_TEXT, A, A_TEXT), ...OWNER_KEYS };

/** @type {ReturnType<typeof FAKE.create>} */
let fake;
before(() => {
  REC._reset();
  // the platform's element class, which an overlay's anchor is told apart from (O-HOST's): none of the stand-ins is one
  globalThis.HTMLElement = /** @type {any} */ (class {});
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
 * one line's act always. The platform's own `focus()` on an element that takes none moves nothing. Each pane's corner,
 * the address its head names, the bar's name for each pane and the stop stand as elements the scene writes again in
 * place, every element keeping the attributes set on it (`attrs`); the status region keeps what it was told, in order
 * (`said`).
 */
function page() {
  const body = { id: 'the body', focus() {} };
  const doc = { body, activeElement: /** @type {{id: string}} */ (body), createElement: (/** @type {string} */ tag) => element('a new ' + tag) };
  /** an element; `takes` whether the platform's focus lands on it now; `placed` the elements put in it, each with how */
  const element = (/** @type {string} */ id, takes = () => true) => {
    /** @type {Array<{how: 'append' | 'prepend', el: unknown}>} */
    const placed = [];
    /** @type {Record<string, string>} */
    const attrs = {};
    const e = {
      id, isConnected: true, innerHTML: '', textContent: '', dataset: /** @type {Record<string, string>} */ ({}), style: {}, inert: false, hidden: false, tabIndex: -1,
      scrollTop: 0, scrollHeight: 0, clientTop: 0, clientWidth: 600, clientHeight: 400, placed, attrs,
      focus() { if (takes()) doc.activeElement = e; },
      blur() { if (doc.activeElement === e) doc.activeElement = body; },
      append(/** @type {unknown} */ el) { placed.push({ how: 'append', el }); }, prepend(/** @type {unknown} */ el) { placed.unshift({ how: 'prepend', el }); },
      setAttribute(/** @type {string} */ k, /** @type {string} */ v) { attrs[k] = String(v); },
      removeAttribute(/** @type {string} */ k) { delete attrs[k]; },
      getAttribute: (/** @type {string} */ k) => attrs[k] ?? null,
      addEventListener() {}, getContext: () => null,
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
  /** @type {Record<string, (ev: any) => void>} the bar's listeners, as the scene attaches them */
  const barOn = {};
  const bar = Object.assign(element('the scene\'s bar', shown), { addEventListener: (/** @type {string} */ type, /** @type {(ev: any) => void} */ fn) => { barOn[type] = fn; } });
  const paneA = element('pane A', shown), paneB = element('pane B', shown);
  const cornerA = element('pane A\'s corner', shown), cornerB = element('pane B\'s corner', shown);
  const headA = element('the address pane A\'s head names'), headB = element('the address pane B\'s head names');
  paneA.querySelector = (s) => (s === ':scope > .corner' ? cornerA : s === '.hd .addr' ? headA : null);
  paneB.querySelector = (s) => (s === ':scope > .corner' ? cornerB : s === '.hd .addr' ? headB : null);
  /** @type {Array<() => void>} the stop's click listeners, as the scene attaches them */
  const stopOn = [];
  const stop = Object.assign(element('the stop', shown), { hidden: true, addEventListener: (/** @type {string} */ type, /** @type {() => void} */ fn) => { if (type === 'click') stopOn.push(fn); } });
  const names = { a: element('the bar\'s name for pane A'), b: element('the bar\'s name for pane B') };
  bar.querySelector = (s) => (s === '[data-name="a"]' ? names.a : s === '[data-name="b"]' ? names.b : null);
  /** @type {string[]} what the status region was told, in order */
  const said = [];
  const live = element('the status region');
  Object.defineProperty(live, 'textContent', { get: () => said[said.length - 1] ?? '', set: (/** @type {string} */ v) => { said.push(v); } });
  FOCUS.attach({ live: /** @type {any} */ (live) });
  root.contains = (x) => [root, bar, paneA, paneB, cornerA, cornerB, stop].includes(/** @type {any} */ (x));
  paneA.contains = (x) => x === paneA || x === cornerA;
  paneB.contains = (x) => x === paneB || x === cornerB;
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
  SCENE.attach(/** @type {any} */ ({ root, bar, paneA, paneB, canvas: element('the scene\'s canvas'), stop }), { end: (byKey) => GO.closeScene(byKey) });
  HOST.attach(/** @type {any} */ (overlay));
  /** where the platform's focus stands */
  const at = () => doc.activeElement.id;
  /** the plane's two regions: is each inert? */
  const covered = () => [mirror.inert, corners.inert];
  /** a pointer's press on the bar's act a selector names, as the platform hands its click to the bar */
  const press = (/** @type {string} */ sel) => { if (barOn.click) barOn.click({ type: 'click', detail: 1, target: { closest: (/** @type {string} */ s) => (s === sel ? {} : null) } }); };
  return { doc, item, corner, line, bar, paneA, paneB, cornerA, cornerB, headA, headB, stop, stopOn, names, said, at, covered, press };
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

// ---- the scene, a step on the trail (N-GO's `toScene`, `closeScene`) -------------------------------------------------

/** an address the board says nothing of: a scene opened on it is refused */
const GONE = '1.0.1.0.29';
Object.assign(script, { [FAKE.keyOf('op', { frame: F.retrieveDocVSpanSet(GONE) })]: NOT_REGISTERED });
/** the two first editions' `compare` whole: the read a scene on them makes last before it shows */
const BOTH = F.compare([{ doc: A, spans: [{ ordinal: 1, positions: A_TEXT.length }] }], [{ doc: B, spans: [{ ordinal: 1, positions: B_TEXT.length }] }]);
/** every flight a move started stepped to its end, and the reads, the walk's moves and the scene's opening it set going let answer */
async function flown() {
  for (let i = 0; i < 80; i++) { await new Promise((r) => setTimeout(r, 0)); if (CAM.flying()) CAM.step(Infinity); }
  assert.deepEqual([CAM.flying(), GO.inAir(), GO.isReaching(), HOST.pending()], [false, false, false, false], 'every flight landed, every opening shown or ended');
}
/** a key as the platform delivers it, with the platform's command modifier where `mod` is asked (D5 §0) */
const keyOf = (/** @type {string} */ key, mod = false) => /** @type {any} */ ({ type: 'keydown', key, keyCode: 0, isComposing: false, metaKey: mod && KEYS.MAC, ctrlKey: mod && !KEYS.MAC, shiftKey: false, altKey: false, preventDefault() {} });
/** the trail's places, oldest first, and its cursor */
const trailNow = () => ({ addrs: TRAIL.all().map((e) => e.addr), cursor: TRAIL.cursorIndex() });
/** the walk's element: its kind, its place, its position */
const walkAt = () => { const f = WALK.current(); return f && [f.kind, f.addr, f.pos]; };
/** the trail started afresh on the page of stand-ins — the launch frame, HOME, then a LEAP to the first edition's first span, the entry the scenes below open over — the focus on the walk's item */
async function onTrail(/** @type {ReturnType<typeof page>} */ p) {
  CAM.setViewport(1440, 900);
  TRAIL._reset();
  await PUMP.loadWhole(A); await PUMP.loadWhole(B);
  await GO.launch();
  const leap = GO.leapTo(A, { pos: 1 }); await flown(); await leap;
  p.item.focus();
}

test('a reading scene opened through N-GO is a step on the trail (issue #50\'s design decision: "Opening a scene pushes one entry, the scene, the way a follow does"): one entry pushed as the act is made, its address the document opened beside, the entry ahead of the cursor dropped, the passage it was opened from recorded by identity on the entry it departs; its own close — Esc, the bar\'s ×, Mod+-, ← in a pane, Mod+[ — is Back: the cursor on the entry it opened over, nothing pushed or dropped, that passage lit there and the walk on it, each close counted; leaving, the entry records the scene as left, and Forward reopens it, the focus in the pane it stood in', () => onPage(async (p) => {
  await onTrail(p);
  const board = GO.wholeBoard(); await flown(); await board;
  const back = GO.back(); await flown(); await back;
  const home = TRAIL.all()[0].addr;
  assert.deepEqual(trailNow(), { addrs: [home, A, '1'], cursor: 1 }, 'the cursor on the first edition, WHOLE BOARD ahead of it');
  const opening = GO.toScene(A, B, { posA: 1, widthA: 3 }, { from: { passage: { addr: A, pos: 1, width: 3 } } });
  assert.deepEqual([trailNow(), GO.isReaching()], [{ addrs: [home, A, B], cursor: 2 }, true], 'its entry taken at the act, the document opened beside its address, the entry ahead dropped; reaching while it reads');
  assert.equal(await opening, true, 'the scene shows');
  assert.deepEqual([SCENE.isOpen(), p.at(), TRAIL.current()?.scene], [true, 'pane B', { a: A, b: B, held: { posA: 1, widthA: 3 }, left: null }], 'shown, the focus in the far end\'s pane, its entry holding the pair it opened on');
  assert.deepEqual(TRAIL.all()[1].step, { kind: 'scene', near: A, link: null, key: null, spans: [{ prefix: A + '.0.1', ordinal: 1, width: 3 }] }, 'the entry it departed records the passage it was opened from, by identity');
  const n = GO.closed();
  /** @type {Array<[string, () => unknown]>} each of the scene's own closes */
  const closes = [
    ['Esc', () => KEYS.esc()],
    ['the bar\'s ×, pressed', () => p.press('[data-x]')],
    ['Mod+-', () => KEYS.dispatch(keyOf('-', true), { where: 'scene', byKey: true })],
    ['← in a pane', () => KEYS.dispatch(keyOf('ArrowLeft'), { where: 'scene', byKey: true })],
    ['Mod+[', () => KEYS.dispatch(keyOf('[', true), { where: 'scene', byKey: true })],
  ];
  for (const [i, [what, close]] of closes.entries()) {
    await close(); await flown();
    assert.deepEqual([SCENE.isOpen(), trailNow()], [false, { addrs: [home, A, B], cursor: 1 }], `${what}: Back — the scene ended, the cursor on the entry it opened over, nothing pushed or dropped`);
    assert.deepEqual([GO.arrivalMark(), walkAt(), GO.closed()], [{ addr: A, pos: 1, runs: [{ pos: 1, width: 3 }], link: null }, ['block', A, 1], n + i + 1], `${what}: the passage it was opened from lit there, the walk on it, the close counted`);
    const left = TRAIL.all()[2].scene?.left;
    assert.deepEqual([left?.panes.a.src, left?.panes.b.src, left?.stop, !!left?.spots], [A, B, 'b', true], `${what}: the scene's entry records it as left — each pane's text, where the reader stood, the stop the focus stood on`);
    const forward = GO.forward(); await flown(); await forward;
    assert.deepEqual([SCENE.isOpen(), trailNow().cursor, p.at(), GO.arrivalMark()], [true, 2, 'pane B', null], `${what}: Forward reopens it, the focus in the pane it stood in, nothing lit under it`);
  }
  assert.deepEqual(fake.unanswered, []);
}));

test('leaving a scene\'s entry by a teleport records the scene, and Back onto the entry reopens it as left (issue #50\'s design decision: "Back after a teleport out, reopens the scene as recorded … Focus lands inside the scene through the focus controller, and the status region names the reopened pair"): WHOLE BOARD from the scene pushes its own entry after the scene\'s, and Back reopens it, the focus on the stop it stood on, the pair named in the status region', () => onPage(async (p) => {
  await onTrail(p);
  assert.equal(await GO.toScene(A, B), true);
  const home = TRAIL.all()[0].addr;
  p.cornerA.focus();
  assert.equal(p.at(), 'pane A\'s corner', 'the focus on pane A\'s corner');
  const board = GO.wholeBoard(); await flown(); await board;
  assert.deepEqual([SCENE.isOpen(), trailNow()], [false, { addrs: [home, A, B, '1'], cursor: 3 }], 'WHOLE BOARD from the scene: the scene ended, its own entry pushed after the scene\'s');
  assert.equal(TRAIL.all()[2].scene?.left?.stop, 'a:corner', 'the scene\'s entry recorded the stop the focus stood on');
  const told = p.said.length;
  const back = GO.back(); await flown(); await back;
  assert.deepEqual([SCENE.isOpen(), trailNow().cursor, p.at()], [true, 2, 'pane A\'s corner'], 'Back reopens it, the focus on the stop it stood on (FP-20)');
  assert.ok(p.said.slice(told).includes(`${t('L.scene-label')} · ${A} │ ${B}`), `the status region names the reopened pair: ${JSON.stringify(p.said.slice(told))}`);
  assert.deepEqual([GO.shownIn(A), GO.shownIn(B)], [A, B], 'no box\'s version changed (FP-22)');
  assert.deepEqual(fake.unanswered, []);
}));

test('a reading scene\'s opening reaches as a jump only a read can place does (FP-25): Esc and Back made while its reads are out abandon it, its entry given back — the trail as it stood, nothing opened, the camera still; a read refused gives its entry back too, the refusal faced at the act\'s site', () => onPage(async (p) => {
  await onTrail(p);
  const before = trailNow(), view = CAM.view();
  /** @type {Array<[string, () => unknown]>} each act that abandons the opening */
  const acts = [['Esc', () => KEYS.esc()], ['Back', () => GO.back()]];
  for (const [what, abandon] of acts) {
    const release = fake.hold('op', { frame: BOTH });
    const opening = GO.toScene(A, B);
    assert.deepEqual([trailNow().addrs.length, GO.isReaching()], [before.addrs.length + 1, true], `${what}: its entry taken at the act, reaching`);
    await abandon();
    release();
    assert.equal(await opening, false, `${what}: nothing shows`);
    await flown();
    assert.deepEqual([SCENE.isOpen(), trailNow(), CAM.view()], [false, before, view], `${what}: abandoned — its entry given back, the camera where it stood`);
  }
  const site = { span: { addr: A, pos: 1, width: 3 } };
  assert.equal(await GO.toScene(A, GONE, {}, { site }), false);
  assert.deepEqual([SCENE.isOpen(), trailNow(), HOST.currentState()?.id, HOST.currentState()?.anchor], [false, before, 'face:doc_not_registered', { ...site, sign: A }], 'refused: its entry given back, the fifth cell faced at the act\'s site');
  HOST.dismiss();
  assert.deepEqual(fake.unanswered, []);
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
  for (const [side, placed] of /** @type {const} */ ([['A', a[0]], ['B', b[0]]])) {
    const html = String(/** @type {any} */ (placed.el).innerHTML);
    assert.ok(html.includes(`data-slot="label" data-string="F.slot.unsigned"`) && html.includes(`>${esc(t('F.slot.unsigned'))}</span>`) && !html.includes('slot pending'), `pane ${side}: its byline set with its owner's facts, read before the pane was set — never an empty box a pane set from its kept view would show again (FP-34)`);
  }
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

// ---- a pane kept fresh by its kind (FP-23) ----------------------------------------------------------------------------

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
  assert.ok(String(shownIn(p.paneA, 'a').innerHTML).includes(`<span class="addr id">${ED2}</span>`) && p.names.a.textContent === ED2, 'its head and the bar name the member');
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
    assert.ok(String(b.innerHTML).includes(tHTML('F.corner.withheld', { owner: '1.0.1' }, { owner: 'id' })), `its head alone, withheld: ${b.innerHTML}`);
    assert.deepEqual(LAYER.madeOf(a)?.blocks.map((x) => x.text), ['A version.', 'Its words.'], 'the version read again as the guest reads it');
    assert.deepEqual(fake.unanswered, []);
  } finally { REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' }); }
}));

test('a refresh after a row naming nothing reaches every pane: an edition read at its bare address whose chain the refresh counted past the member its text is pinned at once — "version 2 of 3", the arrival said once — and read nowhere at its bare address; the draft beside it read again in its place (issue #212)', () => onPage(async (p) => {
  // an edition of two members read at its bare address, and a draft, neither met before; the third member minted since, which no row named
  const RE = '1.0.1.0.11', RE2 = RE + '.2', DR9 = '1.0.1.0.12';
  const RE_TEXT = 'The refreshed.\n\nIts second version holds this.', DR9_TEXT = 'A note.\n\nIts words.';
  Object.assign(script, reads(RE, RE_TEXT, { members: 2 }), reads(RE2, RE_TEXT), reads(DR9, DR9_TEXT, { published: false }), compared(RE, RE_TEXT, DR9, DR9_TEXT), compared(RE2, RE_TEXT, DR9, DR9_TEXT));
  await SCENE.open(RE, DR9);
  assert.deepEqual(paneState('a'), { kind: 'bare', src: RE, names: RE2, shows: RE, k: 2, n: 2, read: null, lacks: null }, 'pane A read at its bare address, its text the second member\'s');
  Object.assign(script, { [FAKE.keyOf('op', { frame: F.docMetadata(RE + '.3') })]: metadata(RE + '.3', true, RE_TEXT.length), [FAKE.keyOf('op', { frame: F.docMetadata(RE + '.4') })]: NOT_REGISTERED });
  const told = p.said.length, from = fake.asked.length, unanswered = fake.unanswered.length;
  fake.fire('feed', row(30, null, null, 'published'));
  assert.deepEqual(paneState('a'), { kind: 'bare', src: RE, names: RE2, shows: RE, k: 2, n: 2, read: null, lacks: null }, 'the row alone reaches no pane');
  await PUMP.refresh();
  assert.deepEqual(paneState('a'), { kind: 'pinned', src: RE2, names: RE2, shows: RE2, k: 2, n: 3, read: 3, lacks: null }, 'at once as the refresh tells the panes: pinned to the member its text is, offering the newest');
  assert.ok(p.cornerA.innerHTML.includes(esc(t('F.version-of', { k: 2, n: 3 }))), `its corner reads version 2 of 3: ${p.cornerA.innerHTML}`);
  assert.deepEqual(p.said.slice(told), [t('F.arrival.pane', { k: 2 })], 'the arrival said once');
  await landed();
  const asked = fake.asked.slice(from);
  assert.ok(!asked.includes(FAKE.keyOf('op', { frame: F.retrieveV(RE, 1, RE_TEXT.length) })), 'nothing read at the bare address');
  assert.ok(asked.includes(FAKE.keyOf('op', { frame: F.retrieveV(RE2, 1, RE_TEXT.length) })), 'the member read whole, the pane set again from it');
  assert.ok(asked.includes(FAKE.keyOf('op', { frame: F.retrieveV(DR9, 1, DR9_TEXT.length) })) && paneState('b')?.kind === 'draft', 'the draft read again in its place');
  assert.deepEqual(fake.unanswered.slice(unanswered), []);
}));

// ---- a far end naming its document whole -------------------------------------------------------------------------------

/** the passage a citation stands on in the first edition: its second paragraph's first seven positions, "Its pas", which the origin holds at the same place */
const NEAR = { posA: 14, widthA: 7 };
/** the two first editions' `compare` as the board answers it once they share that passage */
const SHARED = compared(A, A_TEXT, B, B_TEXT, [[14, 14, 7]]);

test('a scene opened on a document a far end names whole shows without waiting on `compare` (issue #59\'s design decision: "The opening never waits on compare … Its answer only adds bands and never moves a pane or the focus"): its `compare` held, the scene stands, the focus in pane B, pane B at its top; answered, its band the scene\'s, pane B where the reader scrolled it, the focus where they put it, no setting held reading', () => onPage(async (p) => {
  const was = script[FAKE.keyOf('op', { frame: BOTH })], unanswered = fake.unanswered.length;
  const release = fake.hold('op', { frame: BOTH });
  try {
    p.item.focus();
    const opening = SCENE.open(A, B, { ...NEAR, wholeB: true });
    const shown = await Promise.race([opening.then((o) => o.shown), new Promise((r) => setTimeout(() => r('still reading'), 100))]);
    assert.equal(shown, true, 'shown while its compare is held');
    assert.ok(fake.asked.includes(FAKE.keyOf('op', { frame: BOTH })), 'the compare asked as it shows');
    assert.deepEqual([p.at(), SCENE.pairs()?.pairs, SCENE.pairs()?.level, p.paneB.scrollTop], ['pane B', [], { a: 14, b: null }, 0], 'the focus in pane B, no band yet, pane B at its top');
    p.paneB.scrollTop = 77;
    p.cornerA.focus();
    Object.assign(script, SHARED);
    release();
    for (let i = 0; i < 20; i++) await new Promise((r) => setTimeout(r, 0));
    assert.deepEqual(SCENE.pairs()?.pairs.map((x) => [x.u1, x.u2, x.width]), [[14, 14, 7]], 'answered: its band the scene\'s');
    assert.deepEqual([p.paneB.scrollTop, p.at(), SCENE.updating(), SCENE.pairs()?.level], [77, 'pane A\'s corner', false, { a: 14, b: null }], 'pane B where the reader scrolled it, the focus where they put it, nothing set level with pane B');
  } finally { release(); Object.assign(script, { [FAKE.keyOf('op', { frame: BOTH })]: was }); }
  assert.deepEqual(fake.unanswered.slice(unanswered), []);
}));

test('pane B, the whole document a far end names, is named by its address and the words saying the whole document is the link\'s end, and is the current location — pane A neither, nor pane B in a scene opened on a passage (issue #59\'s design decision: "its name says the whole document is the end … aria-current goes on the document")', () => onPage(async (p) => {
  const unanswered = fake.unanswered.length;
  p.item.focus();
  await SCENE.open(A, B, { ...NEAR, wholeB: true });
  assert.deepEqual([p.headB.id, p.paneB.attrs['aria-labelledby'], p.paneB.attrs['aria-current']], ['sceneB-name', 'sceneB-name sceneB-whole', 'location'], 'pane B: its address, then the whole end\'s words; the current location');
  assert.deepEqual([p.paneA.attrs['aria-labelledby'], p.paneA.attrs['aria-current']], ['sceneA-name', undefined], 'pane A: its address alone, and no current');
  assert.ok(p.bar.innerHTML.includes(`<span id="sceneB-whole" data-string="L.scene.whole-end" hidden>${esc(t('L.scene.whole-end'))}</span>`), `the words, hidden, in the bar: ${p.bar.innerHTML}`);
  SCENE.close();
  await SCENE.open(A, B, NEAR);
  assert.deepEqual([p.paneB.attrs['aria-labelledby'], p.paneB.attrs['aria-current']], ['sceneB-name', undefined], 'opened on a passage: pane B its address alone, and no current');
  assert.ok(!p.bar.innerHTML.includes('sceneB-whole'), 'and no such words');
  assert.deepEqual(fake.unanswered.slice(unanswered), []);
}));

test('"read side by side" from the card of a link whose far end names a document whole opens that document as the end names it — its bare address, read as its latest member — never the version the plane\'s box shows, its near passage held and nothing of the far one set level (issue #59\'s design decision: "If the end names a version, that member opens; otherwise the latest does")', () => onPage(async (p) => {
  await onTrail(p);
  const L = A + '.0.2.31', unanswered = fake.unanswered.length;
  Object.assign(script, {
    [FAKE.keyOf('op', { frame: F.inClaims(L, 'audit') })]: { result: { as_of: 1, resp: 'claims', claims: [] } },
    [FAKE.keyOf('op', { frame: F.outClaims(L, 'audit') })]: { result: { as_of: 1, resp: 'claims', claims: [] } },
  });
  REC.takeLinks(A, [L]);
  REC.takeLink({ addr: L, from: [passage(A, 14, 7)], to: [wholeOf(B)], type: CITE, age: { at: null, time: null, from: null } });
  // the box B and its versions share showing its second member, as N-GO's `shownIn` hands it to LK
  LK.readers({ shown: (a) => (a === B ? B + '.2' : a) });
  try {
    const s = LK.shown(A).find((x) => x.link.addr === L);
    assert.ok(s && s.farWhole && s.far === B && s.farAt === B + '.2', 'drawn at the first edition, naming B whole, B\'s box showing its second member');
    await ANATOMY.open(/** @type {import('../links/links.js').Shown} */ (s), null);
    const beside = HOST.currentState()?.acts?.beside;
    assert.ok(beside, 'the card offers "read side by side"');
    beside(/** @type {any} */ (null), false);
    await flown();
    assert.deepEqual([SCENE.isOpen(), SCENE.panes()?.b.src, SCENE.panes()?.b.names, SCENE.pairs()?.level], [true, B, B + '.1', { a: 14, b: null }], 'pane B the address the end names, read as its latest member; pane A at the near passage, pane B at its top');
  } finally { LK._reset(); }
  assert.deepEqual(fake.unanswered.slice(unanswered), []);
}));
