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
// line per meeting turns red); drawn in the one mark its link takes at a
// mark joining the two panes' documents (foundations §2.1's register: "the
// owner of either"), the owner of either document's solid in the owner's
// hue — whichever pane is A, whether the other pane shows it at its span as
// another's or not at all, and whichever pane alone shows it (a mutant that
// merges the panes' marks, or takes either pane's own, turns red) — and a
// third party's dashed in theirs; a far end naming a document whole at that
// pane's first block; one document in both panes drawing a link inside it
// once for each way its ends stand across them (a mutant that tells ends
// apart by their document alone, folding the two into one, turns red); no
// line to a document neither pane holds.
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
import { test, before } from 'node:test';
import assert from 'node:assert/strict';
import * as PORT from '../bridge/port.js';
import * as REC from '../model/records.js';
import * as PUMP from '../model/pump.js';
import * as F from '../model/frames.js';
import * as FAKE from '../test/fake-port.js';
import * as WALK from '../nav/walk.js';
import * as LAYER from '../text/layer.js';
import * as SCENE from './scene.js';
import { levels, merged, counterpart, counterparts, linesBetween } from './scene.js';
import * as LK from '../links/links.js';
import { HUE, VISITED_ALPHA } from '../plane/register.js';

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
/** a link's end as LK shows it at a document: its passage there, the far end it names, the mark the document gives it at its span (`LK.markOf`) */
const endShown = (/** @type {{addr: string, owner: string}} */ link, /** @type {ReturnType<typeof passage>} */ here, /** @type {ReturnType<typeof passage> | ReturnType<typeof wholeOf>} */ there) => {
  const mark = LK.markOf(/** @type {any} */ (link), here.doc);
  return { link, near: here.doc, end: 'from', pos: here.ordinal, width: here.positions || 1, mark, linker: mark.linker, far: there.doc, farEnd: there, farWhole: there.whole };
};
/** a pane's links: its document, the ends LK shows there, the blocks its article was made from — by default two, the first at 1 */
const paneLinks = (/** @type {string} */ addr, /** @type {Array<ReturnType<typeof endShown>>} */ shown, blocks = [{ pos: 1, width: 40 }, { pos: 41, width: 60 }]) => /** @type {any} */ ({ addr, shown, blocks });
/** each line: its link, its end in pane A, its end in pane B, its hue, its value, dashed */
const drawn = (/** @type {import('./scene.js').Line[]} */ lines) => lines.map((l) => [l.link, [l.a.pos, l.a.width], [l.b.pos, l.b.width], l.hue, l.value, l.dashed]);
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
  const one = [[L.addr, [50, 10], [1, 5], HUE.you, 1, false]];
  assert.deepEqual(drawn(linesBetween(paneLinks(DOC_A, [atA]), paneLinks(DOC_B, [atB]))), one, 'met from both panes: one line');
  assert.deepEqual(drawn(linesBetween(paneLinks(DOC_A, []), paneLinks(DOC_B, [atB]))), one, 'met from pane B alone: the same line');
  LK.follow(L.addr);
  const followed = [endShown(L, passage(DOC_A, 50, 10), passage(DOC_B, 1, 5)), endShown(L, passage(DOC_B, 1, 5), passage(DOC_A, 50, 10))];
  assert.deepEqual(drawn(linesBetween(paneLinks(DOC_A, [followed[0]]), paneLinks(DOC_B, [followed[1]]))).map((l) => l[4]), [VISITED_ALPHA], 'a followed link drawn once, lighter — never stacked back toward full');
  const L2 = linkBy(DOC_A + '.0.2.2', '1.0.1');
  assert.deepEqual(drawn(linesBetween(paneLinks(DOC_A, [atA, { ...atA, link: L2 }]), paneLinks(DOC_B, [atB]))).map((l) => l[0]), [L.addr, L2.addr], 'two links between the same two ends: a line each');
}));

test('a link the owner of either pane\'s document made is drawn in the owner\'s hue, solid, whichever pane is A and whatever the other pane shows at its span — never neutral (foundations §2.1: "the owner of either")', () => asReader('1.0.9', () => {
  const P = '1.0.1.0.31', Q = '1.0.2.0.51', L = P + '.0.2.1';
  REC.takeLinks(P, [L]); REC.takeLinks(Q, [L]);
  REC.takeLink({ addr: L, from: [passage(P, 50, 10)], to: [passage(Q, 1, 5)], type: CITE });
  const pane = (/** @type {string} */ addr) => paneLinks(addr, /** @type {any} */ (LK.shown(addr)));
  for (const on of [false, true]) {
    LK.setOthers(Q, on);
    for (const [a, b] of [[P, Q], [Q, P]]) {
      assert.deepEqual(linesBetween(pane(a), pane(b)).map((l) => [l.link, l.hue, l.value, l.dashed]), [[L, HUE.owner, 1, false]], `${a} in pane A, the other pane's toggle ${on ? 'on' : 'off'}`);
    }
  }
  assert.deepEqual([LK.shown(P).map((s) => s.linker), LK.shown(Q).map((s) => s.linker)], [['owner'], ['others']], 'each pane marks it at its span as its own composition does: P\'s owner\'s at P, another\'s at Q');
}));

test('a link one pane alone shows is drawn as it is marked between the two panes\' documents: another\'s dashed in their hue, the owner of either document\'s solid in the owner\'s, whichever pane shows it', () => asReader('1.0.1', () => {
  const theirs = linkBy('1.0.3.0.9.0.2.1', '1.0.3'), owners = linkBy(DOC_B + '.0.2.1', '1.0.2');
  assert.deepEqual(drawn(linesBetween(paneLinks(DOC_A, [endShown(theirs, passage(DOC_A, 50, 10), passage(DOC_B, 1, 5))]), paneLinks(DOC_B, []))), [[theirs.addr, [50, 10], [1, 5], HUE.others, 1, true]], 'a third party\'s, shown at pane A');
  assert.deepEqual(drawn(linesBetween(paneLinks(DOC_A, []), paneLinks(DOC_B, [endShown(owners, passage(DOC_B, 1, 5), passage(DOC_A, 50, 10))]))), [[owners.addr, [50, 10], [1, 5], HUE.owner, 1, false]], 'pane B\'s document\'s owner\'s, shown at pane B');
  assert.deepEqual(drawn(linesBetween(paneLinks(DOC_A, [endShown(owners, passage(DOC_A, 50, 10), passage(DOC_B, 1, 5))]), paneLinks(DOC_B, []))), [[owners.addr, [50, 10], [1, 5], HUE.owner, 1, false]], 'pane B\'s document\'s owner\'s, shown at pane A alone, where it is another\'s: the owner\'s still');
}));

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

// ---- the scene's focus -----------------------------------------------------------------------------------------------

const A = '1.0.1.0.3', B = '1.0.1.0.4';
const A_TEXT = 'The window.\n\nIts passage stands here.', B_TEXT = 'The origin.\n\nIts passage stands here.';
/** the reads of a document read whole: its extent, its metadata, its text, its image, its links (none) */
const reads = (/** @type {string} */ doc, /** @type {string} */ text) => ({
  [FAKE.keyOf('op', { frame: F.retrieveDocVSpanSet(doc) })]: { result: { as_of: 1, resp: 'span_set', set: [{ start: '1.1', width: '0.' + text.length }] } },
  [FAKE.keyOf('op', { frame: F.docMetadata(doc) })]: { result: { as_of: 1, resp: 'doc_metadata', doc, published: true, owner: '1.0.1', birth: doc + '.1', birth_extent: String(text.length), placed: null, base_extent: null, source: null } },
  [FAKE.keyOf('op', { frame: F.retrieveV(doc, 1, text.length) })]: { result: { as_of: 1, resp: 'delivery', items: [{ content: text }] } },
  [FAKE.keyOf('op', { frame: F.image(doc, 1, text.length) })]: { result: { as_of: 1, resp: 'runs', runs: [{ i_start: doc + '.0.1.1', width: String(text.length) }] } },
  [FAKE.keyOf('op', { frame: F.findLinksV(doc, 1, text.length) })]: { result: { as_of: 1, resp: 'addrs', addrs: [] } },
});
/** `compare` over two documents whole: nothing shared (the bands are not these tests') */
const compared = (/** @type {string} */ d1, /** @type {string} */ t1, /** @type {string} */ d2, /** @type {string} */ t2) => ({
  [FAKE.keyOf('op', { frame: F.compare([{ doc: d1, spans: [{ ordinal: 1, positions: t1.length }] }], [{ doc: d2, spans: [{ ordinal: 1, positions: t2.length }] }]) })]: { result: { as_of: 1, resp: 'compare', pairs: [] } },
});
const script = { ...reads(A, A_TEXT), ...reads(B, B_TEXT), ...compared(A, A_TEXT, B, B_TEXT), ...compared(B, B_TEXT, A, A_TEXT) };

/** @type {ReturnType<typeof FAKE.create>} */
let fake;
before(() => {
  REC._reset();
  fake = FAKE.create(script);
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.setBoard({ board: 'b-1', name: '', origin: '' }); REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  REC.takeIndex(/** @type {any} */ ({ docs: [{ doc: A, kind: 'edition', label: 'a', standing: 'public' }, { doc: B, kind: 'edition', label: 'b', standing: 'public' }], counts: [{ account: '1.0.1', documents: 2 }], state: { arm: 'complete' } }));
});

/**
 * A page of stand-ins: the platform's focus — the body where it stands on nothing — and the elements the scene, the
 * walk and the layer hold, attached to their owners. Each takes the focus only where the platform's would: a pane or
 * the bar while the scene is shown, the walk's item and a corner while their region is not inert, the one line's act
 * always. The platform's own `focus()` on an element that takes none moves nothing.
 */
function page() {
  const body = { id: 'the body', focus() {} };
  const doc = { body, activeElement: /** @type {{id: string}} */ (body), createElement: (/** @type {string} */ tag) => element('a new ' + tag) };
  /** an element; `takes` whether the platform's focus lands on it now; `placed` the elements put in it, each with how */
  const element = (/** @type {string} */ id, takes = () => true) => {
    /** @type {Array<{how: 'append' | 'prepend', el: unknown}>} */
    const placed = [];
    const e = {
      id, isConnected: true, innerHTML: '', dataset: /** @type {Record<string, string>} */ ({}), style: {}, inert: false, tabIndex: -1,
      scrollTop: 0, scrollHeight: 0, clientTop: 0, clientWidth: 600, clientHeight: 400, placed,
      focus() { if (takes()) doc.activeElement = e; },
      blur() { if (doc.activeElement === e) doc.activeElement = body; },
      append(/** @type {unknown} */ el) { placed.push({ how: 'append', el }); }, prepend(/** @type {unknown} */ el) { placed.unshift({ how: 'prepend', el }); },
      setAttribute() {}, removeAttribute() {}, addEventListener() {}, getContext: () => null,
      getBoundingClientRect: () => ({ top: 0, left: 0, right: 600, bottom: 400, width: 600, height: 400 }),
      /** @type {(s: string) => unknown} */ querySelector: () => null,
      /** @type {(x: unknown) => boolean} */ contains: (x) => x === e,
      classList: { toggle() {} },
    };
    return e;
  };
  const classes = new Set();
  const shown = () => classes.has('on');
  const root = Object.assign(element('the scene'), { classList: { add: (/** @type {string} */ c) => { classes.add(c); }, remove: (/** @type {string} */ c) => { classes.delete(c); }, toggle() {} } });
  const bar = element('the scene\'s bar', shown), paneA = element('pane A', shown), paneB = element('pane B', shown);
  root.contains = (x) => [root, bar, paneA, paneB].includes(/** @type {any} */ (x));
  const mirror = element('the tree', () => !mirror.inert);
  const item = element('the walk\'s current item', () => !mirror.inert);
  mirror.contains = (x) => x === item;
  mirror.querySelector = (s) => (s === '#walk-' + WALK.mirrorIndex() ? item : null);
  const corners = element('the corner layer');
  const corner = element('the corner', () => !corners.inert);
  const line = element('the one line\'s ‹ back');
  globalThis.document = /** @type {any} */ (doc);
  WALK.attach(/** @type {any} */ (mirror), /** @type {any} */ (element('the live region')));
  LAYER.attach(/** @type {any} */ (element('the text layer')), /** @type {any} */ (corners));
  SCENE.attach(/** @type {any} */ ({ root, bar, paneA, paneB, canvas: element('the scene\'s canvas') }));
  /** where the platform's focus stands */
  const at = () => doc.activeElement.id;
  /** the plane's two regions: is each inert? */
  const covered = () => [mirror.inert, corners.inert];
  return { doc, item, corner, line, paneA, paneB, at, covered };
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

test('each pane holds T-LAYER\'s article of its document, made from the text the scene read, on the inner side of its corner', () => onPage(async (p) => {
  await SCENE.open(A, B);
  const [a, b] = [p.paneA.placed, p.paneB.placed];
  assert.deepEqual([a.map((x) => x.how), b.map((x) => x.how)], [['append'], ['prepend']], 'pane A\'s article after its corner, pane B\'s before it: each corner on its pane\'s outer side');
  assert.ok(p.paneA.innerHTML.includes(`data-corner="${A}"`) && p.paneB.innerHTML.includes(`data-corner="${B}"`), 'each pane\'s corner its own document\'s');
  for (const [addr, placed] of /** @type {const} */ ([[A, a[0]], [B, b[0]]])) {
    const d = REC.doc(addr);
    assert.deepEqual(LAYER.madeOf(/** @type {any} */ (placed.el)), { addr, blocks: d.blocks, runs: d.runs }, `${addr}: the pane's article is T-LAYER's, made from the blocks and runs the scene read`);
  }
  assert.deepEqual(fake.unanswered, []);
}));
