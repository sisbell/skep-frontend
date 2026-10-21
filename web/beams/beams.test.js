// BM's test — the bundles over LK's rule on a hand-built model: one per
// document a beam leaves and far document it reaches, whatever document the
// links are homed in (a mutant keying them by the link's home turns red);
// each beam once, a link met from both its ends or from both inside one
// document drawn once (a mutant without the once-rule turns red), and a link
// whose endset holds two spans keeping a beam from each (a mutant keying the
// rule by the link alone turns red). Then a beam's ends over a laid-out
// geometry: it leaves the near block's right edge level with the span's own
// line nearest the far end, never the block's middle; a mounted far end
// takes the far span's own line nearest the start, at the far block's left
// edge; a whole-work end, the far article's first block; an unmounted one is
// aimed at its document's box, a stub, and so is one whose box's centre stands
// under the one line, outside the visible view. A bundle's label stands above
// its end, or below it where above would reach past the visible view's top —
// a stub on the top border sets its label under the line, shown to no one,
// without the rule.
import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import * as REC from '../model/records.js';
import * as LK from '../links/links.js';
import { bundlesOf, beamOf, labelPlace } from './beams.js';

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

/** the model holding some of the links, D and H read, the reveal at stage 3 at D with others' links on */
function build(/** @type {string[]} */ addrs) {
  REC._reset(); LK._reset();
  REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  for (const a of addrs) REC.takeLink({ addr: a, ...LINKS[/** @type {keyof typeof LINKS} */ (a)], type: CITE });
  REC.takeLinks(D, addrs);
  REC.takeLinks(H, addrs.filter((a) => a !== INSIDE));
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

test('each beam once: a link met from both its ends, and a link with both ends inside one document, are drawn once', () => {
  LK.reveal(H, 3);
  const all = met([D, H]);
  assert.ok(all.filter((b) => b.s.link.addr === OWN).length === 2 && all.filter((b) => b.s.link.addr === INSIDE).length === 2, 'LK shows each at both its ends');
  const drawn = members(bundlesOf(all));
  assert.equal(drawn.filter(([l]) => l === OWN).length, 1, 'the person\'s citation, met at D and at H, once');
  assert.equal(drawn.filter(([l]) => l === INSIDE).length, 1, 'the link inside D, met at both its ends, once');
  assert.deepEqual(bundlesOf(all).map((b) => [b.near, b.far]), [[D, H], [D, D]], 'the first met keeps it: no bundle from H back to D');
});

test('a link whose endset holds two spans in D keeps a beam from each', () => {
  build([TWO]);
  assert.deepEqual(members(bundlesOf(met([D]))), [[TWO, 70], [TWO, 90]]);
});

// a laid-out geometry: D mounted, its span at 50 wrapping onto two lines in a block 400 px wide from x 100; H's box centred at `centre`
const NEAR = [{ x: 300, y: 100, w: 200, h: 15 }, { x: 100, y: 118, w: 80, h: 15 }];
const NEAR_BLOCK = { x: 100, y: 90, w: 400, h: 60 };
const FAR = [{ x: 1200, y: 400, w: 50, h: 15 }, { x: 1100, y: 418, w: 30, h: 15 }];
const FAR_BLOCK = { x: 1100, y: 390, w: 400, h: 50 };
/** @returns {import('./beams.js').Geometry} */
function geometry(/** @type {{farMounted: boolean, centre: {x: number, y: number}}} */ o) {
  return {
    lines: (addr, pos, width) => (addr === D && pos === 50 && width === 10 ? NEAR : addr === H && o.farMounted && pos === 1 && width === 5 ? FAR : []),
    block: (addr, pos) => (addr === D && pos >= 50 && pos < 60 ? NEAR_BLOCK : addr === H && o.farMounted && pos >= 1 && pos < 6 ? FAR_BLOCK : null),
    first: (addr) => (addr === H && o.farMounted ? FAR_BLOCK : null),
    mounted: (addr) => addr === D || (addr === H && o.farMounted),
    centre: () => o.centre,
    view: SEEN,
  };
}
/** the visible view: a 1000 × 800 viewport below a one line 25 px tall */
const SEEN = { x: 0, y: 25, w: 1000, h: 775 };
const inside = (/** @type {{x: number, y: number, w: number, h: number}} */ a, /** @type {typeof SEEN} */ b) => a.x >= b.x && a.y >= b.y && a.x + a.w <= b.x + b.w && a.y + a.h <= b.y + b.h;
const own = () => /** @type {import('../links/links.js').Shown} */ (LK.beams(D).find((s) => s.link.addr === OWN));

test('a beam leaves the near block\'s right edge level with the middle of its span\'s own line nearest the far end — never the block\'s middle', () => {
  const low = beamOf(own(), geometry({ farMounted: false, centre: { x: 50, y: 700 } }));
  assert.deepEqual(low && [low.from, low.line], [{ x: 500, y: 125.5 }, NEAR[1]], 'the far end below and to the left: the wrapped line');
  const high = beamOf(own(), geometry({ farMounted: false, centre: { x: 900, y: -300 } }));
  assert.deepEqual(high && [high.from, high.line], [{ x: 500, y: 107.5 }, NEAR[0]], 'the far end above: the first line');
  assert.ok(low && low.aimed && low.stub && low.to.x === 50, 'an unmounted far end: aimed at its document\'s box, a stub');
  assert.equal(beamOf(own(), { ...geometry({ farMounted: false, centre: { x: 0, y: 0 } }), lines: () => [] }), null, 'no line laid out: no beam');
});

test('a mounted far end: the beam ends at the far block\'s left edge, level with the far span\'s own line nearest the start', () => {
  const b = beamOf(own(), geometry({ farMounted: true, centre: { x: 1300, y: 415 } }));
  assert.ok(b);
  assert.deepEqual([b.to, b.aimed, b.stub], [{ x: 1100, y: 425.5 }, false, false]);
  assert.deepEqual(b.line, NEAR[0], 'the near line nearest the far span');
});

test('a mounted whole-work far end: the beam ends at the far article\'s first block', () => {
  const s = { ...own(), farEnd: whole(H), farWhole: true };
  const b = beamOf(s, geometry({ farMounted: true, centre: { x: 1300, y: 415 } }));
  assert.deepEqual(b && b.to, { x: 1100, y: 415 });
});

test('a far end not laid out whose box\'s centre stands under the one line is off screen: a stub', () => {
  // H mounted, its span's line not laid out: the beam is aimed at H's box, its centre 10 px down, under the line
  const g = { ...geometry({ farMounted: true, centre: { x: 900, y: 10 } }), lines: (/** @type {string} */ addr, /** @type {number} */ pos, /** @type {number} */ width) => (addr === D && pos === 50 && width === 10 ? NEAR : []) };
  const b = beamOf(own(), g);
  assert.ok(b && b.aimed && b.stub, 'outside the visible view, though inside the viewport');
  const c = beamOf(own(), { ...g, centre: () => ({ x: 900, y: 40 }) });
  assert.ok(c && c.aimed && !c.stub, 'below the line, in view: no stub');
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
