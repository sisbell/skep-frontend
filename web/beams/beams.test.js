// BM's test — the bundles over LK's rule on a hand-built model: one per
// document a beam leaves and far document it reaches, whatever document the
// links are homed in (a mutant keying them by the link's home turns red);
// each beam once, counted once, a link met from both its ends or from both
// inside one document drawn once (a mutant without the once-rule turns red),
// and so is one met from both its ends while its far box shows another
// version of its document (a mutant keying the far end by the document the
// link names draws it twice and turns red), and a link
// whose endset holds two spans keeping a beam from each (a mutant keying the
// rule by the link alone turns red), as one stored end drawn at two
// documents — the one that minted its bytes and one transcluding them — does,
// each beam in its own document's mark (a mutant keying a beam by its stored
// spans alone folds the two into one and turns red). Each END of a beam in
// the mark the document it touches gives the link, the one the link's symbol
// takes there, whether one side drew it or both and whichever met it first,
// never neutral (issue #166's design decision: a mutant that merges its
// meetings' marks, that marks its far end as its near, or that marks both by
// the owner of either turns red); where the two differ the stroke changing
// colour once, at the first point along it as far from the far document's box
// as from the near one's, outside both (a mutant cutting it at its curve's
// middle, inside the near document's box, turns red), cut there into two
// stretches of the one curve meeting at that point, each butt-capped and
// drawn from it in its own end's ink; a stub, and a beam whose ends' marks
// agree, one stroke in its near end's ink; a bundle marked at each end with
// what its beams' marks share there — neutral only where its links take
// different colours at that end, a single link never (a mutant that marks a
// bundle by its first beam turns red). Then a beam's ends
// over a laid-out geometry: it leaves the near block's right edge level
// with the span's own line nearest the far end, never the block's middle — a
// block parted across two columns the right edge of the part holding that
// line (a mutant taking the two parts' bounds turns red), and past a sign its
// column's edge holds level with that line, never across it (issue #151: a
// mutant that leaves from the text's edge whatever stands there turns red); a
// mounted far end in view takes the far span's own line nearest the start, at
// the far block's left edge, where its stroke ends; a whole-work end, the far
// article's first block; a mounted far end outside the visible view — its
// line under the one line, or past the view's border — is off screen: the
// beam is aimed at it and its stroke cut at the border, a stub, its label set
// in the view (a mutant that ends a mounted end's beam at the end wherever it
// stands turns red); a far end not laid out stands at its document's box's
// centre — in the visible view, mounted or not, the beam ends there, no
// stub, its stroke never cut at the border past it (a mutant that stubs an
// unmounted end in view, or cuts every stroke at the border, turns red), and
// outside the view, above it or under the one line, the beam is a stub, its
// stroke cut at the border (a mutant that never cuts turns red). A bundle's
// label stands above its end, or below it where above would reach past the
// visible view's top — a stub on the top border sets its label under the
// line, shown to no one, without the rule — and nowhere it would not stand
// whole in that view: a beam cut at its start just under the line, bound
// upward, sets none there, where it would straddle the line's edge (a mutant
// that sets it wherever it falls turns red). Both ends where the link's
// bytes stand now: a beam met from both its ends one beam, its ends told
// apart by the documents they are drawn at and the spans the link stores (a
// mutant keying them by the stretches they stand in draws two and turns
// red); a far end at the stretch `project` places it in (a mutant ending it
// at the stored position's line turns red), at the far article's first block
// where it floats, at its box's centre where no projection is held; a bundle
// whose every beam floats saying so at its end, and one whose every beam's
// far text holds only part of its passage saying the line its landing says
// (issue #153), one whose beams part saying nothing of it.
// A far end in the version its far box shows ends at that version's mounted
// article, never at the box's centre (issue #154).
import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import * as REC from '../model/records.js';
import * as LK from '../links/links.js';
import { bundlesOf, beamOf, labelPlace, labelText, pastSigns, inkOf, strokeOf, pointOn, strokeIn } from './beams.js';
import { edgeStub } from '../plane/camera.js';
import { HUE, NEUTRAL_HUE, STUB } from '../plane/register.js';
import { t } from '../strings.js';
import { recorder } from '../test/canvas.js';

const CITE = '1.1.0.1.0.1.0.3.13';
// the person's edition, another account's, a third account's
const D = '1.0.1.0.3', H = '1.0.2.0.5', T = '1.0.3.0.7';
const span = (/** @type {string} */ doc, /** @type {number} */ ord, /** @type {number} */ w) => ({ start: `${doc}.0.1.${ord}`, width: '0.0.0.0.0.0.0.' + w, doc, account: doc.split('.').slice(0, 3).join('.'), whole: false, subspace: 1, ordinal: ord, positions: w });
const whole = (/** @type {string} */ doc) => ({ start: doc, width: '0.0.0.0.1', doc, account: doc.split('.').slice(0, 3).join('.'), whole: true, subspace: null, ordinal: null, positions: null });

// the person's citation from D to H, homed at D; another's from H into D, homed at H; a third party's between D and H, homed at T;
// the person's link inside D; the person's link from two spans of D to H
const OWN = D + '.0.2.1', INTO = H + '.0.2.1', THIRD = T + '.0.2.1', INSIDE = D + '.0.2.2', TWO = D + '.0.2.3';
const LINKS = {
  [OWN]: { from: [span(D, 50, 10)], to: [span(H, 1, 5)] },
  [INTO]: { from: [span(H, 7, 5)], to: [span(D, 3, 10)] },
  [THIRD]: { from: [span(D, 30, 5)], to: [span(H, 9, 3)] },
  [INSIDE]: { from: [span(D, 60, 5)], to: [span(D, 80, 5)] },
  [TWO]: { from: [span(D, 70, 2), span(D, 90, 4)], to: [span(H, 12, 2)] },
};

/** the model holding some of the links, D and H read — their images their own bytes, where nothing has moved them — the person's citation's far end projected where its slot stores it, the reveal at stage 3 at D with others' links on */
function build(/** @type {string[]} */ addrs) {
  REC._reset(); LK._reset();
  REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  for (const a of addrs) REC.takeLink({ addr: a, ...LINKS[/** @type {keyof typeof LINKS} */ (a)], type: CITE });
  REC.takeImage(D, 1, [{ iStart: D + '.0.1.1', width: 100 }]);
  REC.takeImage(H, 1, [{ iStart: H + '.0.1.1', width: 20 }]);
  REC.takeLinks(D, addrs);
  REC.takeLinks(H, addrs.filter((a) => a !== INSIDE));
  REC.takeProjection(OWN, 2, H, [{ pos: 1, width: 5 }]);
  LK.reveal(D, 3); LK.setOthers(D, true);
}
/** what `build` in BM feeds the bundles: every shown link of the documents named, as a beam */
const met = (/** @type {string[]} */ docs) => docs.flatMap((d) => LK.beams(d)).map((s) => ({ s }));
const members = (/** @type {Array<{members: Array<{s: {link: {addr: string}, pos: number}}>}>} */ bs) => bs.flatMap((b) => b.members.map((m) => [m.s.link.addr, m.s.pos]));

beforeEach(() => build(Object.keys(LINKS)));

test('one bundle per destination: the person\'s link from D and another\'s link into D from H are one bundle at D, whatever document each is homed in', () => {
  build([OWN, INTO]);
  const bs = bundlesOf(met([D]));
  assert.deepEqual(bs.map((b) => [b.near, b.far, b.members.length]), [[D, H, 2]], 'one bundle, two members — never one per home');
});

test('a third party\'s link between D and H, homed at neither, joins that bundle', () => {
  build([OWN, INTO, THIRD]);
  const bs = bundlesOf(met([D]));
  assert.deepEqual(bs.map((b) => [b.near, b.far]), [[D, H]]);
  assert.deepEqual(members(bs).map(([l]) => l).sort(), [INTO, OWN, THIRD].sort());
});

test('each beam once, counted once: a link met from both its ends, and a link with both ends inside one document, are drawn once — and so is one met from both its ends while its far box shows another version of its document', () => {
  LK.reveal(H, 3);
  const all = met([D, H]);
  assert.ok(all.filter((b) => b.s.link.addr === OWN).length === 2 && all.filter((b) => b.s.link.addr === INSIDE).length === 2, 'LK shows each at both its ends');
  const drawn = members(bundlesOf(all));
  assert.equal(drawn.filter(([l]) => l === OWN).length, 1, 'the person\'s citation, met at D and at H, once');
  assert.equal(drawn.filter(([l]) => l === INSIDE).length, 1, 'the link inside D, met at both its ends, once');
  assert.deepEqual(bundlesOf(all).map((b) => [b.near, b.far]), [[D, H], [D, D]], 'the first met keeps it: no bundle from H back to D');
  // H's box showing its second version, whose text holds H's twenty bytes: the links into H met at D and at that version
  const H2 = H + '.2';
  REC.takeImage(H2, 1, [{ iStart: H + '.0.1.1', width: 20 }]);
  REC.takeLinks(H2, [OWN, INTO, THIRD, TWO]);
  LK.readers({ shown: (a) => (a === H ? H2 : a) });
  try {
    const both = met([D, H2]);
    assert.deepEqual([OWN, INTO].map((l) => both.filter((b) => b.s.link.addr === l).map((b) => b.s.near)), [[D, H2], [D, H2]], 'LK shows each at D and at the version H\'s box shows');
    /** each bundle met from the documents named, with its count */
    const counted = (/** @type {string[]} */ docs) => bundlesOf(met(docs)).map((b) => [b.near, b.far, b.members.length]);
    assert.deepEqual(counted([D, H2]), counted([D]), 'each once, D\'s bundle counted as from D alone: no bundle from the version back to D');
  } finally { LK.readers({}); }
});

test('each end of a beam takes the colour of the document it touches, the one the link\'s symbol takes there — whether one side drew it or both, whichever met it first — and is never neutral (issue #166\'s design decision)', () => {
  /** the hue and linker a mark draws in */
  const look = (/** @type {import('../plane/register.js').Mark} */ m) => [m.hue, m.linker];
  /** a link's symbol's look at a document, as its article sets it there */
  const symbol = (/** @type {string} */ l, /** @type {string} */ at) => look(/** @type {import('../links/links.js').Shown} */ (LK.symbols(at).find((s) => s.link.addr === l)).mark);
  /** the beams met from the documents named, each with the look of its end at each document it joins */
  const drawn = (/** @type {string[]} */ docs) => bundlesOf(met(docs)).flatMap((b) => b.members);
  const ends = (/** @type {string} */ l, /** @type {string[]} */ docs) => drawn(docs).filter((m) => m.s.link.addr === l).map((m) => ({ [m.s.near]: look(m.s.mark), [m.s.farAt]: look(m.s.farMark) }));
  LK.reveal(H, 3);
  assert.deepEqual([symbol(INTO, D), symbol(INTO, H)], [[HUE.others, 'others'], [HUE.owner, 'owner']], 'H\'s owner\'s link into D: another\'s at D, its toggle on there, and the owner\'s at H');
  for (const order of [[D, H], [H, D]]) {
    assert.deepEqual(ends(INTO, order), [{ [D]: symbol(INTO, D), [H]: symbol(INTO, H) }], `met at both (${order.join(' then ')}): one beam, each end its symbol's there`);
    assert.deepEqual(ends(OWN, order), [{ [D]: [HUE.you, 'you'], [H]: [HUE.you, 'you'] }], `the person's own at both (${order.join(' then ')}): their hue at each end`);
    assert.ok(drawn(order).every((m) => m.s.mark.hue !== NEUTRAL_HUE && m.s.farMark.hue !== NEUTRAL_HUE), `no beam neutral at either end (${order.join(' then ')})`);
  }
  LK.reveal(H, 2);
  assert.deepEqual([LK.beams(H).length, symbol(INTO, H)], [0, [HUE.owner, 'owner']], 'H at symbols: its symbol stands, no beam leaves it');
  assert.deepEqual(ends(INTO, [D]), [{ [D]: symbol(INTO, D), [H]: symbol(INTO, H) }], 'drawn from D alone: the same beam, its far end in H\'s symbol\'s colour');
});

test('only a bundle of differing colours is neutral, and only at the end where they differ; a single link never is (issue #166\'s design decision: "Neutral keeps one meaning")', () => {
  /** each bundle D sends, with its hue at each end */
  const hues = (/** @type {string[]} */ links) => { build(links); return bundlesOf(met([D])).map((b) => [b.near, b.far, b.marks.near.hue, b.marks.far.hue]); };
  assert.deepEqual(hues([OWN, INTO, THIRD]), [[D, H, NEUTRAL_HUE, NEUTRAL_HUE]], 'the person\'s, H\'s owner\'s and a third party\'s: their colours differ at D and at H');
  assert.deepEqual(hues([INTO, THIRD]), [[D, H, HUE.others, NEUTRAL_HUE]], 'H\'s owner\'s and a third party\'s: another\'s both at D, apart at H');
  assert.deepEqual(hues([OWN]), [[D, H, HUE.you, HUE.you]], 'one link: its own colour at each end');
  build(Object.keys(LINKS)); LK.reveal(H, 3);
  const beams = bundlesOf(met([D, H])).flatMap((b) => b.members);
  assert.ok(beams.length > 1 && beams.every((m) => m.s.mark.hue !== NEUTRAL_HUE && m.s.farMark.hue !== NEUTRAL_HUE), 'no single beam neutral at either end, whichever bundle holds it');
});

test('a link whose endset holds two spans in D keeps a beam from each', () => {
  build([TWO]);
  assert.deepEqual(members(bundlesOf(met([D]))), [[TWO, 70], [TWO, 90]]);
});

test('one stored end drawn at two documents — the one that minted its bytes and one that transcludes them — is a beam from each, in its own bundle, each marked as its document marks it', () => {
  build([OWN]);
  // T transcludes twenty of D's bytes from D's 45th: the citation's passage, stored at D's 50, stands at T's 6
  REC.takeImage(T, 1, [{ iStart: D + '.0.1.45', width: 20 }]);
  REC.takeLinks(T, [OWN]);
  LK.reveal(T, 3);
  const all = met([D, T]);
  assert.deepEqual(all.map((b) => [b.s.near, b.s.pos]), [[D, 50], [T, 6]], 'drawn at both, each where its bytes stand');
  assert.deepEqual(bundlesOf(all).map((b) => [b.near, b.far, b.members.length]), [[D, H, 1], [T, H, 1]], 'a beam from each, never one folded into the other');
  // another reader: the citation D's owner's at D, and another's at T, its toggle on there
  REC.setSession({ session: 's-2', principal: 2, account: '1.0.9' });
  LK.setOthers(T, true);
  assert.deepEqual(bundlesOf(met([D, T])).flatMap((b) => b.members).map((m) => [m.s.near, m.s.mark.hue, m.s.mark.linker]), [[D, HUE.owner, 'owner'], [T, HUE.others, 'others']], 'each beam leaving in its own document\'s mark, never one folded into the other');
});

/** @typedef {{x: number, y: number, w: number, h: number}} Rect */
// a laid-out geometry: D mounted, its span at 50 wrapping onto two lines in a block 400 px wide from x 100, in D's box; H, where mounted,
// its span at 1 wrapping onto two lines in a block from x 600 (or the block and lines handed in); H's box centred at `centre`
const NEAR = [{ x: 300, y: 100, w: 200, h: 15 }, { x: 100, y: 118, w: 80, h: 15 }];
const NEAR_BLOCK = { x: 100, y: 90, w: 400, h: 60 };
const NEAR_BOX = { x: 80, y: 30, w: 440, h: 500 };
const FAR = [{ x: 700, y: 400, w: 50, h: 15 }, { x: 600, y: 418, w: 30, h: 15 }];
const FAR_BLOCK = { x: 600, y: 390, w: 300, h: 50 };
/** a document's box on screen centred at a point: 100 × 80 px */
const around = (/** @type {{x: number, y: number}} */ p) => ({ x: p.x - 50, y: p.y - 40, w: 100, h: 80 });
/** @returns {import('./beams.js').Geometry} */
function geometry(/** @type {{farMounted: boolean, centre: {x: number, y: number}, far?: Rect[], farBlock?: Rect, signs?: Rect[]}} */ o) {
  const far = o.far || FAR, farBlock = o.farBlock || FAR_BLOCK;
  return {
    lines: (addr, pos, width) => (addr === D && pos === 50 && width === 10 ? NEAR : addr === H && o.farMounted && pos === 1 && width === 5 ? far : []),
    block: (addr, pos) => (addr === D && pos >= 50 && pos < 60 ? [NEAR_BLOCK] : addr === H && o.farMounted && pos >= 1 && pos < 6 ? [farBlock] : []),
    first: (addr) => (addr === H && o.farMounted ? farBlock : null),
    signs: (addr, pos) => (addr === D && pos >= 50 && pos < 60 ? o.signs || [] : []),
    mounted: (addr) => addr === D || (addr === H && o.farMounted),
    box: (addr) => (addr === D ? NEAR_BOX : around(o.centre)),
    view: SEEN,
  };
}
/** the visible view: a 1000 × 800 viewport below a one line 25 px tall */
const SEEN = { x: 0, y: 25, w: 1000, h: 775 };
/** a point's distance from a rect: none inside it */
const away = (/** @type {Rect} */ r, /** @type {{x: number, y: number}} */ p) => Math.hypot(Math.max(r.x - p.x, 0, p.x - r.x - r.w), Math.max(r.y - p.y, 0, p.y - r.y - r.h));
const inside = (/** @type {{x: number, y: number, w: number, h: number}} */ a, /** @type {typeof SEEN} */ b) => a.x >= b.x && a.y >= b.y && a.x + a.w <= b.x + b.w && a.y + a.h <= b.y + b.h;
const own = () => /** @type {import('../links/links.js').Shown} */ (LK.beams(D).find((s) => s.link.addr === OWN));

test('a block parted across two columns sends each line\'s beam from the right edge of the part that holds the line — never the edge of the two parts taken together (issue #15)', () => {
  // the span's first line in the block's part in the first column, its second at the head of the next column's part
  const parts = [{ x: 100, y: 90, w: 400, h: 30 }, { x: 560, y: 20, w: 400, h: 40 }];
  const lines = [{ x: 300, y: 100, w: 200, h: 15 }, { x: 560, y: 25, w: 80, h: 15 }];
  const g = { ...geometry({ farMounted: false, centre: { x: 50, y: 700 } }), lines: (/** @type {string} */ addr, /** @type {number} */ pos, /** @type {number} */ width) => (addr === D && pos === 50 && width === 10 ? lines : []), block: (/** @type {string} */ addr) => (addr === D ? parts : []) };
  const first = beamOf(own(), g);
  assert.deepEqual(first && [first.from, first.line], [{ x: 500, y: 107.5 }, lines[0]], 'the far end below and to the left: the first column\'s line, from the first part\'s edge');
  const second = beamOf(own(), { ...g, box: () => around({ x: 1200, y: -200 }) });
  assert.deepEqual(second && [second.from, second.line], [{ x: 960, y: 32.5 }, lines[1]], 'the far end above and to the right: the second column\'s line, from the second part\'s edge');
});

test('a beam leaving a line its column\'s edge holds a sign level with starts past that sign, as far past it as the sign stands past the text — never across it; a line no sign stands level with leaves from the text\'s edge (issue #151; foundations §3.1: "the beams routed outside them")', () => {
  // the block's count in its edge, 12 px past the text, level with its first line
  const count = { x: 512, y: 101, w: 60, h: 12 };
  const high = beamOf(own(), geometry({ farMounted: false, centre: { x: 900, y: -300 }, signs: [count] }));
  assert.deepEqual(high && [high.from, high.line], [{ x: 584, y: 107.5 }, NEAR[0]], 'the first line, the count level with it: from 12 px past the count');
  const low = beamOf(own(), geometry({ farMounted: false, centre: { x: 50, y: 700 }, signs: [count] }));
  assert.deepEqual(low && low.from, { x: 500, y: 125.5 }, 'the wrapped line, no sign level with it: from the text\'s edge');
  assert.equal(pastSigns({ line: NEAR[0], block: NEAR_BLOCK, signs: [{ x: 300, y: 101, w: 60, h: 12 }] }), 500, 'a sign inside the text\'s edge is none of the edge\'s');
});

test('a beam leaves the near block\'s right edge level with the middle of its span\'s own line nearest the far end — never the block\'s middle', () => {
  const low = beamOf(own(), geometry({ farMounted: false, centre: { x: 50, y: 700 } }));
  assert.deepEqual(low && [low.from, low.line], [{ x: 500, y: 125.5 }, NEAR[1]], 'the far end below and to the left: the wrapped line');
  const high = beamOf(own(), geometry({ farMounted: false, centre: { x: 900, y: -300 } }));
  assert.deepEqual(high && [high.from, high.line], [{ x: 500, y: 107.5 }, NEAR[0]], 'the far end above: the first line');
  assert.deepEqual(low && [low.to, low.stub, low.end], [{ x: 50, y: 700 }, false, { x: 50, y: 700 }], 'an unmounted far end in view: the beam ends at its document\'s box\'s centre, no stub');
  assert.ok(high && high.stub && high.to.x === 900 && high.to.y === -300, 'an unmounted far end above the view: aimed at its document\'s box, a stub');
  assert.equal(beamOf(own(), { ...geometry({ farMounted: false, centre: { x: 0, y: 0 } }), lines: () => [] }), null, 'no line laid out: no beam');
});

test('a mounted far end in view: the beam ends at the far block\'s left edge, level with the far span\'s own line nearest the start', () => {
  const b = beamOf(own(), geometry({ farMounted: true, centre: { x: 750, y: 415 } }));
  assert.ok(b);
  assert.deepEqual([b.to, b.stub, b.end], [{ x: 600, y: 425.5 }, false, { x: 600, y: 425.5 }], 'its stroke ends there');
  assert.deepEqual(b.line, NEAR[0], 'the near line nearest the far span');
});

test('a far end stands in the version its far box shows (issue #154): the beam ends at that version\'s mounted article, never at the box\'s centre for the document the link names', () => {
  const H2 = H + '.2';
  /** the far box showing H's second version: its article mounted, the far span's lines laid out in it; H's own never */
  const g = geometry({ farMounted: true, centre: { x: 750, y: 415 } });
  const version = { ...g, lines: (/** @type {string} */ addr, /** @type {number} */ pos, /** @type {number} */ width) => g.lines(addr === H2 ? H : addr === H ? '' : addr, pos, width),
    block: (/** @type {string} */ addr, /** @type {number} */ pos) => g.block(addr === H2 ? H : addr === H ? '' : addr, pos), mounted: (/** @type {string} */ addr) => addr === D || addr === H2 };
  const b = beamOf({ ...own(), farAt: H2 }, version);
  assert.deepEqual(b && [b.to, b.stub], [{ x: 600, y: 425.5 }, false], 'at the version\'s far block\'s left edge, level with the far span\'s line');
  const named = beamOf(own(), version);
  assert.deepEqual(named && named.to, { x: 750, y: 415 }, 'placed in the document the link names, unmounted: the box\'s centre');
});

test('a mounted whole-work far end in view: the beam ends at the far article\'s first block', () => {
  const s = { ...own(), farEnd: whole(H), farWhole: true };
  const b = beamOf(s, geometry({ farMounted: true, centre: { x: 750, y: 415 } }));
  assert.deepEqual(b && [b.to, b.stub, b.end], [{ x: 600, y: 415 }, false, { x: 600, y: 415 }]);
});

test('a mounted far end outside the visible view is off screen: the beam is aimed at it and its stroke cut at the view\'s border, a stub, its label in view', () => {
  const m = { w: 120, ascent: 9, descent: 3 };
  // H mounted, its span's line laid out at y 5, under the one line, in a block from x 600 at the viewport's top
  const under = geometry({ farMounted: true, centre: { x: 750, y: 20 }, far: [{ x: 700, y: 5, w: 50, h: 15 }], farBlock: { x: 600, y: 0, w: 300, h: 40 } });
  const b = beamOf(own(), under);
  assert.ok(b);
  assert.deepEqual([b.to, b.stub], [{ x: 600, y: 12.5 }, true], 'its end, the far block\'s left edge level with its line, under the line: aimed at it, a stub');
  assert.deepEqual(b.end, edgeStub(b.from, b.to, SEEN), 'its stroke cut where P-CAM\'s edgeStub cuts the bearing to its end');
  const at = labelPlace(b.end, m, SEEN);
  assert.ok(b.end.y > SEEN.y && at && inside(at.rect, SEEN), `cut below the line on the bearing to the end, its label in view (${JSON.stringify(at && at.rect)})`);
  // H mounted, its span's lines past the viewport's right border, its whole-work end too
  const past = geometry({ farMounted: true, centre: { x: 1300, y: 415 }, far: [{ x: 1200, y: 400, w: 50, h: 15 }, { x: 1100, y: 418, w: 30, h: 15 }], farBlock: { x: 1100, y: 390, w: 400, h: 50 } });
  const r = beamOf(own(), past), w = beamOf({ ...own(), farEnd: whole(H), farWhole: true }, past);
  assert.deepEqual(r && [r.to, r.stub], [{ x: 1100, y: 425.5 }, true], 'past the right border: a stub');
  assert.deepEqual(w && [w.to, w.stub], [{ x: 1100, y: 415 }, true], 'a whole-work end past it: a stub');
  const ra = r && labelPlace(r.end, m, SEEN);
  assert.ok(r && Math.abs(r.end.x - (SEEN.x + SEEN.w - STUB.inset)) < 1e-9 && ra && inside(ra.rect, SEEN), `cut STUB.inset px inside the right border, its label in view (${JSON.stringify(r && r.end)})`);
});

test('a far end not laid out whose box\'s centre stands under the one line is off screen: a stub', () => {
  // H mounted, its span's line not laid out: the beam is aimed at H's box, its centre 10 px down, under the line
  const g = { ...geometry({ farMounted: true, centre: { x: 900, y: 10 } }), lines: (/** @type {string} */ addr, /** @type {number} */ pos, /** @type {number} */ width) => (addr === D && pos === 50 && width === 10 ? NEAR : []) };
  const b = beamOf(own(), g);
  assert.ok(b && b.stub && Math.abs(b.end.y - (SEEN.y + STUB.inset)) < 1e-9, `outside the visible view, though inside the viewport: its stroke cut STUB.inset px below the line (${JSON.stringify(b && b.end)})`);
  const c = beamOf(own(), { ...g, box: () => around({ x: 900, y: 40 }) });
  assert.deepEqual(c && [c.stub, c.end], [false, { x: 900, y: 40 }], 'below the line, in view: no stub, the beam ends at the box\'s centre');
});

test('a far end not laid out whose box\'s centre stands in the visible view is where its beam ends, mounted or not: no stub, its stroke never cut at the border past it (foundations §2.1: "the edge stub where the far end is off screen")', () => {
  // H unmounted, its box centred well inside the view, short of every border
  const unmounted = beamOf(own(), geometry({ farMounted: false, centre: { x: 750, y: 415 } }));
  assert.deepEqual(unmounted && [unmounted.to, unmounted.stub, unmounted.end], [{ x: 750, y: 415 }, false, { x: 750, y: 415 }], 'unmounted: the beam ends at its box\'s centre, no triangle');
  // H mounted, its passage's lines not laid out: the same
  const notLaidOut = { ...geometry({ farMounted: true, centre: { x: 750, y: 415 } }), lines: (/** @type {string} */ addr, /** @type {number} */ pos, /** @type {number} */ width) => (addr === D && pos === 50 && width === 10 ? NEAR : []) };
  const mounted = beamOf(own(), notLaidOut);
  assert.deepEqual(mounted && [mounted.to, mounted.stub, mounted.end], [{ x: 750, y: 415 }, false, { x: 750, y: 415 }], 'mounted, its passage not laid out: the same');
  // H unmounted, its box above the view: off screen, a stub cut at the view's top on the bearing to its box
  const above = beamOf(own(), geometry({ farMounted: false, centre: { x: 900, y: -300 } }));
  assert.ok(above && above.stub, 'above the view: a stub');
  assert.deepEqual(above.end, edgeStub(above.from, above.to, SEEN), 'its stroke cut where P-CAM\'s edgeStub cuts the bearing to its box');
  assert.ok(Math.abs(above.end.y - (SEEN.y + STUB.inset)) < 1e-9, `STUB.inset px below the one line (${JSON.stringify(above.end)})`);
});

test('differing ends change colour once, outside both documents: the stroke cut at the first point along it as far from the far document\'s box as from the near one\'s, the two stretches of the one curve meeting there, each butt-capped and drawn from it in its own end\'s ink; a stub, and a beam whose ends agree, one stroke in its near end\'s (issue #166\'s design decision)', () => {
  // H's owner's link into D, another's at D and the owner's at H, its far end projected where its slot stores it, at H's 7
  REC.takeProjection(INTO, 1, H, [{ pos: 7, width: 5 }]);
  const into = /** @type {import('../links/links.js').Shown} */ (LK.beams(D).find((s) => s.link.addr === INTO));
  // D's box to x 720 and H's from x 840; the link's line leaving D's block at x 500, its far line in H's block from x 900
  const D_BOX = { x: 80, y: 0, w: 640, h: 700 }, H_BOX = { x: 840, y: 0, w: 640, h: 700 };
  /** @type {import('./beams.js').Geometry} */
  const g = {
    lines: (addr, pos, width) => (addr === D && pos === 3 && width === 10 ? [{ x: 300, y: 100, w: 200, h: 15 }] : addr === H && pos === 7 && width === 5 ? [{ x: 950, y: 400, w: 50, h: 15 }] : []),
    block: (addr) => (addr === D ? [{ x: 100, y: 90, w: 400, h: 60 }] : addr === H ? [{ x: 900, y: 390, w: 300, h: 50 }] : []),
    first: () => null, signs: () => [], mounted: (addr) => addr === D || addr === H,
    box: (addr) => (addr === D ? D_BOX : H_BOX), view: SEEN,
  };
  const b = beamOf(into, g);
  assert.ok(b && b.change != null, 'its ends differ: it changes');
  assert.deepEqual([b.from, b.end, b.stub], [{ x: 500, y: 107.5 }, { x: 900, y: 407.5 }, false]);
  const c = strokeOf(b.from, b.end), at = pointOn(c, b.change);
  assert.ok(Math.abs(at.x - 780) < 1e-6 && Math.abs(away(D_BOX, at) - away(H_BOX, at)) < 1e-6 && away(D_BOX, at) > 0,
    `midway between the two boxes' edges, outside both (${JSON.stringify(at)}) — never at the curve's middle, x ${pointOn(c, 0.5).x}, inside D's box`);
  const { ctx, strokes } = recorder();
  strokeIn(ctx, c, inkOf(into.mark), inkOf(into.farMark), b.change);
  assert.deepEqual(strokes.map((s) => [s.hue, s.dash, s.cap]), [[HUE.others, [5, 4], 'butt'], [HUE.owner, [], 'butt']], 'two stretches: D\'s end another\'s, dashed, H\'s the owner\'s, solid — butt-capped, whatever cap the context held, so they meet and never overlap');
  assert.ok(strokes.every((s) => Math.hypot(s.start.x - at.x, s.start.y - at.y) < 1e-9), 'each drawn from the one point, so the dashed one begins in ink there');
  assert.deepEqual(strokes.map((s) => s.curve[2]), [b.from, b.end], 'D\'s back to where the beam leaves D, H\'s on to where it ends in H');
  for (const [s, on] of /** @type {Array<[import('../test/canvas.js').Stroke, (u: number) => number]>} */ ([[strokes[0], (u) => b.change * (1 - u)], [strokes[1], (u) => b.change + (1 - b.change) * u]])) {
    const part = /** @type {import('./beams.js').Cubic} */ ([s.start, ...s.curve]);
    for (const u of [0.25, 0.5, 0.75]) { const p = pointOn(part, u), q = pointOn(c, on(u)); assert.ok(Math.hypot(p.x - q.x, p.y - q.y) < 1e-6, `every point of each stretch on the one curve (${s.hue} at ${u})`); }
  }
  // the same beam, its far end past the view's right border: a stub, in D's colour to the border
  const stub = beamOf(into, { ...g, view: { x: 0, y: 25, w: 850, h: 775 } });
  assert.ok(stub && stub.stub && stub.change === null, 'a stub changes nowhere');
  const cut = recorder();
  strokeIn(cut.ctx, strokeOf(stub.from, stub.end), inkOf(into.mark), inkOf(into.farMark), stub.change);
  assert.deepEqual(cut.strokes.map((s) => [s.hue, s.dash]), [[HUE.others, [5, 4]]], 'one stroke, D\'s end\'s ink');
  // the person's own, theirs at both ends
  const mine = beamOf(own(), geometry({ farMounted: false, centre: { x: 750, y: 415 } }));
  assert.ok(mine && mine.change === null, 'the person\'s own, theirs at both ends: no change');
  const one = recorder();
  strokeIn(one.ctx, strokeOf(mine.from, mine.end), inkOf(mine.s.mark), inkOf(mine.s.farMark), mine.change);
  assert.deepEqual(one.strokes.map((s) => [s.hue, s.dash]), [[HUE.you, []]], 'one stroke in their hue');
});

test('a bundle\'s label stands above its end, toward the view\'s middle, and below its end where above would reach past the visible view\'s top', () => {
  const m = { w: 120, ascent: 9, descent: 3 };
  const mid = labelPlace({ x: 300, y: 400 }, m, SEEN);
  assert.deepEqual([mid.x, mid.y, mid.align], [314, 394, 'left'], 'above the end, its baseline 6 px up, set rightward from the left half');
  assert.deepEqual(labelPlace({ x: 900, y: 400 }, m, SEEN).align, 'right', 'set leftward from the right half');
  const top = labelPlace({ x: 300, y: SEEN.y + 8 }, m, SEEN);
  assert.ok(inside(top.rect, SEEN) && top.rect.y === SEEN.y + 8 + 6, `a stub on the top border: the label below its end, inside the visible view (${JSON.stringify(top.rect)})`);
  const near = labelPlace({ x: 990, y: SEEN.y + 12 }, m, SEEN);
  assert.ok(inside(near.rect, SEEN) && near.rect.y > SEEN.y + 12, 'an end on the right border near the top: below it too');
  assert.ok(inside(labelPlace({ x: 300, y: SEEN.y + 8 + 6 + 9 }, m, SEEN).rect, SEEN), 'an end with room above it: above, inside the view');
});

test('a bundle\'s label stands nowhere it would not stand whole in the visible view: a beam cut at its start just under the one line, bound upward, sets none', () => {
  const m = { w: 120, ascent: 9, descent: 3 };
  assert.equal(labelPlace({ x: 300, y: SEEN.y - 10 }, m, SEEN), null, 'an end 10 px under the line\'s bottom: below it, the label would straddle the line\'s edge');
  assert.equal(labelPlace({ x: 300, y: SEEN.y + SEEN.h + 20 }, m, SEEN), null, 'an end past the viewport\'s bottom: shown to no one');
  // D's span on a line under the one line, at the viewport's top; H unmounted, its box above the viewport: the stroke bound upward leaves
  // the visible view at once, so its cut stands at its start, under the line
  const top = [{ x: 300, y: 5, w: 200, h: 15 }];
  const g = { ...geometry({ farMounted: false, centre: { x: 900, y: -300 } }), lines: (/** @type {string} */ addr, /** @type {number} */ pos, /** @type {number} */ width) => (addr === D && pos === 50 && width === 10 ? top : []), block: (/** @type {string} */ addr) => (addr === D ? [{ x: 100, y: 0, w: 400, h: 40 }] : []) };
  const b = beamOf(own(), g);
  assert.ok(b && b.stub);
  const cut = b.end;
  assert.deepEqual(cut, b.from, 'cut at its start, under the line');
  assert.equal(labelPlace(cut, m, SEEN), null, 'no label at it');
});

test('a beam met from both its ends is one beam wherever its ends stand now: told apart by the spans the link stores, never by the stretches they stand in', () => {
  build([OWN]);
  // D as a later member arranges it: twenty bytes it minted before D's own, so the citation stored at D's 50 stands at 70
  REC.takeImage(D, 1, [{ iStart: D + '.2.0.1.1', width: 20 }, { iStart: D + '.0.1.1', width: 100 }]);
  REC.takeProjection(OWN, 1, D, [{ pos: 70, width: 10 }]);
  LK.reveal(H, 3);
  const all = met([D, H]);
  assert.deepEqual(all.filter((b) => b.s.link.addr === OWN).map((b) => [b.s.near, b.s.pos]), [[D, 70], [H, 1]], 'met at D where it stands now, and at H');
  assert.equal(members(bundlesOf(all)).filter(([l]) => l === OWN).length, 1, 'one beam, never one from each end');
});

test('a far end stands where `project` places its passage now: the beam ends at the projected stretch\'s line, never at the line its stored position holds; one that floats ends at the far article\'s first block, where its follow lands; one nothing places ends at the far document\'s box\'s centre', () => {
  // H mounted: the text at the citation's stored position, 1, another passage now on FAR's lines; the cited passage moved to 9, three
  // positions, on a line of its own lower in the block
  const MOVED = [{ x: 640, y: 440, w: 60, h: 15 }];
  const base = geometry({ farMounted: true, centre: { x: 750, y: 415 } });
  /** @type {import('./beams.js').Geometry} */
  const g = { ...base, lines: (addr, pos, width) => (addr === H && pos === 9 && width === 3 ? MOVED : base.lines(addr, pos, width)), block: (addr, pos) => (addr === H && pos >= 9 && pos < 12 ? [FAR_BLOCK] : base.block(addr, pos)) };
  REC.takeProjection(OWN, 2, H, [{ pos: 9, width: 3 }]);
  const moved = beamOf(own(), g);
  assert.deepEqual(moved && [moved.to, moved.stub, moved.end], [{ x: 600, y: 447.5 }, false, { x: 600, y: 447.5 }], 'at the moved passage\'s line, from the far block\'s left edge');
  REC.takeProjection(OWN, 2, H, []);
  const floating = beamOf(own(), g);
  assert.deepEqual(floating && [floating.to, floating.stub, floating.end], [{ x: 600, y: 415 }, false, { x: 600, y: 415 }], 'floating: at the far article\'s first block');
  REC.invalidate(H);
  const unread = beamOf(own(), g);
  assert.deepEqual(unread && [unread.to, unread.stub, unread.end], [{ x: 750, y: 415 }, false, { x: 750, y: 415 }], 'no projection held: at H\'s box\'s centre, as an end not laid out, in view: no stub');
});

test('a bundle whose every beam floats says so at its end, "its passage is not in ⟨D⟩\'s current text"; one holding a beam that lands beside one that floats says neither (P44)', () => {
  build([OWN, THIRD]);
  REC.takeProjection(OWN, 2, H, []); REC.takeProjection(THIRD, 2, H, []);
  const label = () => labelText(bundlesOf(met([D]))[0]);
  const words = ' · ' + t('F.floating', { D: H });
  assert.ok(label().startsWith(H + ' · 2') && label().endsWith(words), label());
  REC.takeProjection(THIRD, 2, H, [{ pos: 9, width: 3 }]);
  assert.equal(label(), H + ' · 2', 'one lands: no word of floating');
});

test('a bundle whose every beam\'s far text holds only part of its passage says so at its end in the line its landing says; one whose beams part says nothing of it (issue #153; P44)', () => {
  build([OWN, THIRD]);
  // H holds the person's citation's first two bytes of five, and the third party's first of three
  REC.takeProjection(OWN, 2, H, [{ pos: 1, width: 2 }]); REC.takeProjection(THIRD, 2, H, [{ pos: 9, width: 1 }]);
  const label = () => labelText(bundlesOf(met([D]))[0]);
  const words = ' · ' + t('L.held.part', { subject: t('L.held.followed'), where: t('L.held.current', { D: H }) });
  assert.ok(label().startsWith(H + ' · 2') && label().endsWith(words), label());
  REC.takeProjection(THIRD, 2, H, [{ pos: 9, width: 3 }]);
  assert.equal(label(), H + ' · 2', 'the third party\'s whole: they part, and nothing is said');
});
