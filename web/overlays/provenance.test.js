// O-PROV's test against the fake port, on a stand-in of the overlay host's
// element: "who wrote this?" and "who uses this?" over a span of the text
// shown ask the board only about the bytes the draft's base holds, by the
// base's positions, as of that base's read, one run at a time; new bytes are
// answered by the page, nothing read for them; one answer covers a span whose
// runs agree and each run is named by its first words where they differ; a run
// the board refuses among several, or a past state it could not read, says it
// cannot yet be answered; the card stands at the span shown (FP-21, FP-36).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as PROV from './provenance.js';
import * as HOST from './host.js';
import * as FOCUS from '../nav/focus.js';
import * as LAYER from '../text/layer.js';
import * as PORT from '../bridge/port.js';
import * as FAKE from '../test/fake-port.js';
import * as REC from '../model/records.js';
import * as F from '../model/frames.js';
import { t } from '../strings.js';
import { byteLength } from '../util.js';

const D = '1.0.1.0.2', FAR = '1.0.1.0.127', TEXT = 'First line.\n\nSecond line here.\n', N = byteLength(TEXT), READ_AT = 9;
const SECOND = { pos: 14, width: 18 };

/** HTML as text: its tags dropped, the escapes `esc` writes undone */
const text = (/** @type {string} */ html) => html.replace(/<[^>]*>/g, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&amp;/g, '&');
/** the overlay host's stand-in element: what the host writes into it is the card a person meets */
const hostEl = { className: '', innerHTML: '', style: {}, setAttribute() {}, removeAttribute() {}, addEventListener() {}, querySelector: () => null, querySelectorAll: () => [], getBoundingClientRect: () => ({ left: 0, top: 0, width: 0, height: 0 }), contains: () => false };
/** the card's answer lines: each one's string and its words */
const lines = () => hostEl.innerHTML.split('<div class="answer" data-string="').slice(1).map((part) => [part.slice(0, part.indexOf('"')), text(part.slice(part.indexOf('">') + 2).split(/<div class="clause"|<button class="x"/)[0]).trim()]);

const key = (/** @type {object} */ frame) => FAKE.keyOf('op', { frame });
const asOf = (/** @type {object} */ frame) => F.opAt(READ_AT, frame);
const origin = (/** @type {number} */ pos, /** @type {number} */ width) => F.showOrigin(D, pos, width);
const users = (/** @type {number} */ pos, /** @type {number} */ width) => F.findDocsContaining([{ doc: D, spans: [{ ordinal: pos, positions: width }] }]);
const addrs = (/** @type {string[]} */ list) => ({ result: { as_of: 1, resp: 'addrs', addrs: list } });
const refused = (/** @type {string} */ name) => ({ refused: { kind: 'refused', name, code: name } });

/**
 * The card's page against a fake port answering `script`: the draft D held as the board served it at READ_AT, the
 * session 1.0.1's, each edit in `edits` made; everything let go after.
 * @param {Record<string, unknown>} script
 * @param {import('../model/records.js').Edit[]} edits
 * @param {(fake: ReturnType<typeof FAKE.create>) => Promise<void>} body
 */
async function onCard(script, edits, body) {
  const platform = { document: globalThis.document, window: globalThis.window };
  globalThis.document = /** @type {any} */ ({ activeElement: null, body: null });
  globalThis.window = /** @type {any} */ ({ addEventListener() {}, getSelection: () => null });
  // the platform's element class, which an overlay's anchor is told apart from (O-HOST's): none of the stand-ins is one
  globalThis.HTMLElement = /** @type {any} */ (class {});
  REC._reset();
  REC.setBoard({ board: 'b-1', name: '', origin: '' });
  REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  REC.takeSpanSet(D, [{ subspace: 1, ordinal: 1, positions: N }]);
  REC.takeDelivery(D, [{ pos: 1, width: N, kind: 'content', text: TEXT, ref: null, origin: null }], READ_AT);
  REC.takeImage(D, 1, [{ iStart: D + '.0.1.1', width: N }]);
  for (const e of edits) REC.addEdit(D, e);
  FOCUS.attach({ live: /** @type {any} */ ({ setAttribute() {}, textContent: '' }) });
  HOST.attach(/** @type {any} */ (hostEl));
  hostEl.innerHTML = '';
  const fake = FAKE.create(script);
  PORT.boot(fake);
  try { await body(fake); } finally { HOST.dismiss(); PORT.boot(null); REC._reset(); LAYER.clear(); globalThis.document = platform.document; globalThis.window = platform.window; }
}

test('asked after typing above the span, the board is asked over the span\'s bytes by the base\'s positions, as of that base\'s read, and the card stands at the span shown', () => onCard({
  [key(asOf(origin(SECOND.pos, 6)))]: addrs([D]),
}, [{ pos: 1, width: 0, text: 'ab' }], async (fake) => {
  await PROV.wrote(D, SECOND.pos + 2, 6, false, true);
  const c = HOST.currentState();
  assert.deepEqual(fake.asked, [key(asOf(origin(SECOND.pos, 6)))], 'the base\'s positions, in the `/op-at` form');
  assert.deepEqual([c?.id, c?.anchor, /** @type {any} */ (c?.about).pos, /** @type {any} */ (c?.about).width], ['provenance:wrote', { span: { addr: D, pos: 16, width: 6 } }, 16, 6], 'the card and what it is about stand at the span shown');
  assert.ok(hostEl.innerHTML.includes(t('F.position', { p: 16 })), 'its caption names the position shown');
  assert.deepEqual(/** @type {any} */ (c?.about).ids, [{ prefix: D + '.0.1', ordinal: 14, width: 6 }], 'and it is left by the bytes it stands on');
  assert.deepEqual(lines().map((l) => l[0]), ['B1.wrote.here'], 'one answer, the board\'s');
  assert.deepEqual(fake.unanswered, []);
}));

test('with no edits the frame is the plain one, at the span\'s own positions', () => onCard({ [key(origin(14, 6))]: addrs([D]), [key(users(14, 6))]: addrs([D, FAR]) }, [], async (fake) => {
  await PROV.wrote(D, 14, 6);
  await PROV.uses(D, 14, 6);
  assert.deepEqual(fake.asked, [key(origin(14, 6)), key(users(14, 6))]);
  assert.deepEqual(fake.unanswered, []);
}));

test('a span wholly of words typed here reads nothing and is answered by the page — who wrote it, who uses it — with no act and no blind-spot clause', () => onCard({}, [{ pos: 1, width: 0, text: 'abc' }], async (fake) => {
  await PROV.wrote(D, 1, 3);
  assert.deepEqual([HOST.currentState()?.id, lines()], ['provenance:wrote', [['L.new.wrote', t('L.new.wrote')]]]);
  assert.deepEqual(Object.keys(HOST.currentState()?.acts || {}), [], 'no act');
  await PROV.uses(D, 1, 3);
  assert.deepEqual([HOST.currentState()?.id, lines()], ['provenance:uses', [['L.new.uses', t('L.new.uses')]]]);
  assert.ok(!hostEl.innerHTML.includes('B1.C-72'), 'nothing was asked: no blind spot to state');
  assert.deepEqual(fake.asked, [], 'no read');
}));

test('runs that answer differently are each named by their first words, in the text\'s order, the page\'s answer beside the board\'s, and only the board\'s byte positions asked', () => onCard({
  [key(asOf(origin(1, 5)))]: addrs([FAR]), [key(asOf(users(1, 5)))]: addrs([D, FAR]),
}, [{ pos: 1, width: 0, text: 'ab' }], async (fake) => {
  await PROV.wrote(D, 1, 7);
  assert.deepEqual(lines().map((l) => l[0]), ['L.run.named', 'L.run.named']);
  assert.deepEqual(lines().map((l) => l[1].split(' — ')[0]), ['“ab”', '“First”'], 'each run named by its own first words');
  assert.ok(lines()[0][1].endsWith(t('L.new.wrote')), lines()[0][1]);
  assert.deepEqual(fake.asked, [key(asOf(origin(1, 5)))], 'one read, the board run\'s: the new one\'s is the page\'s');
  assert.deepEqual(Object.keys(HOST.currentState()?.acts || {}), ['src1_0', 'beside1_0'], 'the board\'s row carries its acts, named apart');
  await PROV.uses(D, 1, 7);
  assert.deepEqual(lines().map((l) => l[1].split(' — ')[0]), ['“ab”', '“First”']);
  assert.ok(lines()[1][1].endsWith(t('B1.uses', { documents: FAR })) || lines()[1][1].includes(FAR), lines()[1][1]);
  assert.ok(hostEl.innerHTML.includes('data-string="B1.C-72"'), 'the board was asked: the blind spots stated');
  assert.deepEqual(fake.unanswered, []);
}));

test('a stretch cut by a removal is asked as two runs, one at a time, and where they answer alike stands as one answer over the selection, its acts naming no run', () => onCard({
  [key(asOf(origin(1, 2)))]: addrs([FAR]), [key(asOf(origin(5, 3)))]: addrs([FAR]),
}, [{ pos: 3, width: 2, text: '' }], async (fake) => {
  const release = fake.hold('op', { frame: asOf(origin(1, 2)) });
  const opening = PROV.wrote(D, 1, 5, false, true);
  await new Promise((r) => setTimeout(r, 0));
  assert.deepEqual(fake.asked, [key(asOf(origin(1, 2)))], 'the second run waits on the first');
  release();
  await opening;
  assert.deepEqual(fake.asked, [key(asOf(origin(1, 2))), key(asOf(origin(5, 3)))], 'in the text\'s order, by the base\'s positions either side of the cut');
  assert.deepEqual(lines().map((l) => l[0]), ['B1.wrote'], 'one answer');
  assert.deepEqual(Object.keys(HOST.currentState()?.acts || {}), ['src0', 'beside0']);
  assert.deepEqual(fake.unanswered, []);
}));

test('answers alike means the same documents in any order', () => onCard({
  [key(asOf(origin(1, 2)))]: addrs([FAR, D]), [key(asOf(origin(5, 3)))]: addrs([D, FAR]),
}, [{ pos: 3, width: 2, text: '' }], async () => {
  await PROV.wrote(D, 1, 5);
  assert.deepEqual(lines().map((l) => l[0]), ['B1.wrote', 'B1.wrote.here'], 'one answer, its two origins');
}));

test('a run the board refuses among several says it cannot yet be answered at that run, the others standing — no face', () => onCard({
  [key(asOf(origin(1, 5)))]: refused('too_much_coverage'),
}, [{ pos: 1, width: 0, text: 'ab' }], async () => {
  await PROV.wrote(D, 1, 7);
  assert.equal(HOST.currentState()?.id, 'provenance:wrote', 'the card, never the face');
  assert.deepEqual(lines().map((l) => l[1]), [`“ab” — ${t('L.new.wrote')}`, `“First” — ${t('L.run.not-yet')}`]);
}));

test('a lone run keeps its face, but a past state the board could not read says it cannot yet be answered at any size', async () => {
  await onCard({ [key(asOf(origin(14, 6)))]: refused('too_much_coverage') }, [{ pos: 1, width: 0, text: 'ab' }], async () => {
    await PROV.wrote(D, 16, 6);
    assert.equal(HOST.currentState()?.id, 'face:too_much_coverage', 'the refusal\'s own face');
  });
  for (const name of ['history_busy', 'history_reclaimed']) {
    await onCard({ [key(asOf(origin(14, 6)))]: refused(name) }, [{ pos: 1, width: 0, text: 'ab' }], async () => {
      await PROV.wrote(D, 16, 6);
      assert.deepEqual([HOST.currentState()?.id, lines()], ['provenance:wrote', [['L.run.not-yet', t('L.run.not-yet')]]], name);
    });
  }
});

test('where no read told when the base was read, the frame is the plain one, at the base\'s positions', () => onCard({ [key(origin(14, 6))]: addrs([D]) }, [{ pos: 1, width: 0, text: 'ab' }], async (fake) => {
  REC.takeDelivery(D, [{ pos: 1, width: N, kind: 'content', text: TEXT, ref: null, origin: null }]);
  await PROV.wrote(D, 16, 6);
  assert.deepEqual(fake.asked, [key(origin(14, 6))]);
}));

test('nothing is asked once an act ended the opening between its runs', () => onCard({
  [key(asOf(origin(1, 2)))]: addrs([FAR]), [key(asOf(origin(5, 3)))]: addrs([FAR]),
}, [{ pos: 3, width: 2, text: '' }], async (fake) => {
  const release = fake.hold('op', { frame: asOf(origin(1, 2)) });
  const opening = PROV.wrote(D, 1, 5);
  await new Promise((r) => setTimeout(r, 0));
  HOST.endOpening();
  release();
  await opening;
  assert.deepEqual([fake.asked, HOST.currentState()], [[key(asOf(origin(1, 2)))], null], 'the second run never asked, nothing shown');
}));
