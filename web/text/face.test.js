// T-FACE's test, with M-PUMP, M-REC and LK over the fake port and the small
// DOM: the slot's face at reading scale (B11-S5; the slot's face decision) —
// where it stands and by which routes, set inside the one form's corners; its
// head carrying the label; its corner's site beside the column and at one
// column, and its hold; its read — one four-set at a landing, each found link
// read once, kept by its stored end and folded by rule (i) — in every state;
// its list on ask, its statement whole once and compact after, its compact
// mark led by `▸`, its budget;
// the owner's own unwritten slot; and the one form's accessible statement.
import { test, before, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import * as PORT from '../bridge/port.js';
import * as REC from '../model/records.js';
import * as PUMP from '../model/pump.js';
import * as F from '../model/frames.js';
import * as FAKE from '../test/fake-port.js';
import * as CAM from '../plane/camera.js';
import * as LK from '../links/links.js';
import * as HOST from '../overlays/host.js';
import * as TRAIL from '../nav/trail.js';
import * as WALK from '../nav/walk.js';
import * as GO from '../nav/go.js';
import * as KEYS from '../nav/keys.js';
import * as HINT from '../overlays/hint.js';
import * as FOCUS from '../nav/focus.js';
import * as LAYER from './layer.js';
import * as SLOTFACE from './face.js';
import { page } from '../test/dom.js';
import { docBox } from '../plane/projection.js';
import { LINE_H, LAY_FS } from '../plane/layout.js';
import { HOLD, CORNER } from '../plane/register.js';
import { unitSpan } from '../model/address.js';
import { t, sentence } from '../strings.js';
import { OPENS } from './article.js';

// the board: the acting account 1.0.1 and another, 1.0.2, each its home page listed, so the one form stands at each one's slots
const ME = '1.0.1', THEM = '1.0.2', ORIGIN = 'http://127.0.0.1:8644';
const SLOT = THEM + '.0.3', PAGE = THEM + '.0.4', FIVE = THEM + '.0.5', OWN = ME + '.0.3', OWN_PAGE = ME + '.0.4';
// a document of the reader's own holding a link to the slot, and one of a third account's
const NEAR = ME + '.0.70', NEAR_TEXT = 'Notes on a bio not written.', OTHER = '1.0.3.0.66';
const CITE = '1.1.0.1.0.1.0.3.13', ENDORSE = '1.1.0.1.0.1.0.3.42', CREDENTIAL = '1.1.0.1.0.1.0.3.1', STRUCTURE = '1.1.0.1.0.1.0.3.22', MAIL = '1.1.0.1.0.1.0.3.15';
/** the board as the status region names it, which the list clause scopes the read to */
const BOARD = () => t('L.mirror.board.name', { node: '1', origin: ORIGIN });
const NONE = { refused: { kind: 'refused', name: 'doc_not_registered', code: 'doc_not_registered' } };

/** a link's value as `read_link` answers it: its from, its to, its type, the position of the commit that made it */
const value = (/** @type {object} */ from, /** @type {object} */ to, /** @type {string | null} */ type, /** @type {number} */ at) => ({ result: { as_of: 1, resp: 'link_value', at, link: { slots: [[from], [to], type ? [unitSpan(type)] : []] } } });
/** a passage of a document's own bytes, as a slot stores it */
const passage = (/** @type {string} */ doc, /** @type {number} */ ordinal, /** @type {number} */ n) => ({ start: `${doc}.0.1.${ordinal}`, width: `0.0.0.0.0.0.0.${n}` });

/** @type {Record<string, unknown>} */
const script = {
  ...Object.fromEntries([SLOT, PAGE, FIVE, OWN, OWN_PAGE].map((a) => [FAKE.keyOf('op', { frame: F.retrieveDocVSpanSet(a) }), NONE])),
  ...Object.fromEntries([SLOT, PAGE, FIVE, OWN, OWN_PAGE].map((a) => [FAKE.keyOf('op', { frame: F.linksEndingAt(a) }), { result: { as_of: 1, resp: 'addrs', addrs: [] } }])),
  // the documents the view reads beside the faces: each holding no text, published
  ...Object.fromEntries([ME + '.0.1', THEM + '.0.1', NEAR, OTHER].flatMap((a) => [
    [FAKE.keyOf('op', { frame: F.retrieveDocVSpanSet(a) }), { result: { as_of: 1, resp: 'span_set', set: [] } }],
    [FAKE.keyOf('op', { frame: F.docMetadata(a) }), { result: { as_of: 1, resp: 'doc_metadata', doc: a, published: true, owner: a.slice(0, a.lastIndexOf('.0.')), birth: null, birth_extent: null, placed: null, base_extent: null, source: null } }],
  ])),
};
/** the four-set at a slot answering these links */
const found = (/** @type {string} */ slot, /** @type {string[]} */ addrs) => { script[FAKE.keyOf('op', { frame: F.linksEndingAt(slot) })] = { result: { as_of: 1, resp: 'addrs', addrs } }; };
/** a link's read answering its value */
const reads = (/** @type {string} */ link, /** @type {unknown} */ answer) => { script[FAKE.keyOf('op', { frame: F.readLink(link) })] = answer; };

/** @type {ReturnType<typeof FAKE.create>} */
let fake;
const pg = page({ width: 1440, height: 900 });
/** @type {any} */
let layerEl, liveEl, hintEl;
const hostEl = { className: '', innerHTML: '', style: {}, setAttribute() {}, removeAttribute() {}, addEventListener() {}, querySelector: () => null, querySelectorAll: () => [], getBoundingClientRect: () => ({ left: 0, top: 0, width: 0, height: 0 }), contains: () => false };

/** the index the page holds: both accounts' home pages, the reader's note, a third account's document */
function listing() {
  REC.takeIndex(/** @type {any} */ ({ docs: [ME + '.0.1', THEM + '.0.1', NEAR, OTHER].map((doc) => ({ doc, kind: 'edition', label: doc === NEAR ? NEAR_TEXT : doc === OTHER ? 'Another page' : null, standing: 'public' })), counts: [{ account: ME, documents: 2 }, { account: THEM, documents: 1 }, { account: '1.0.3', documents: 1 }], state: { arm: 'complete' } }));
}

before(() => {
  pg.install();
  layerEl = pg.element('div'); layerEl.id = 'slotface'; pg.document.body.appendChild(layerEl);
  liveEl = pg.element('div'); pg.document.body.appendChild(liveEl);
  FOCUS.attach({ live: liveEl });
  hintEl = pg.element('div'); pg.document.body.appendChild(hintEl);
  HINT.attach(hintEl);
  HOST.attach(/** @type {any} */ (hostEl), /** @type {any} */ ({ ...hostEl }));
  fake = FAKE.create(script);
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  WALK.readers({ located: () => GO.backLight(), described: () => GO.described(), shown: GO.shownIn });
  // the one line's bottom as T-LAYER and the face read it alike: a landing frames the face below it
  LAYER.readers({ shown: GO.shownIn, top: () => 30 });
});

beforeEach(() => {
  REC._reset(); LK._reset(); SLOTFACE._reset(); CAM._reset(); TRAIL._reset();
  // every slot's four-set answering none until a test seeds its own
  for (const a of [SLOT, PAGE, FIVE, OWN, OWN_PAGE]) found(a, []);
  // the bylines' facts held: the reads a face makes are its own alone
  for (const a of [ME, THEM, '1.0.3']) REC.takeAccountKey(a, { label: null, fingerprint: '00' + a });
  REC.setBoard({ board: 'b-1', name: ORIGIN, origin: ORIGIN }); REC.setSession(/** @type {any} */ ({ session: 's-1', principal: 1, account: ME, writes: true }));
  listing();
  SLOTFACE.attach(layerEl);
  SLOTFACE.readers({ top: () => 30, focused: (a) => { const f = WALK.current(); return !!f && f.addr === a; }, leap: () => {}, handOff: () => {} });
  CAM.setViewport(1440, 900);
});

/** the camera at a slot's face as a landing frames it: the form's first column slot at the landing's em (T-LAYER's `frameOf`) */
function atFace(/** @type {string} */ slot) {
  const at = LAYER.frameOf(slot, null);
  CAM.reach(at.fs);
  CAM.set(CAM.viewAt(at, at.fs, CAM.landingPx()));
}
/** every read the view and the face set going answered, and the face drawn after them */
async function settle() {
  for (let i = 0; i < 400; i++) { PUMP.pump(); SLOTFACE.frame(); await new Promise((r) => setTimeout(r, 0)); if (PUMP.settled() && PUMP.inflightCount() === 0) break; }
  SLOTFACE.frame();
}
/** a face's rows as laid out, by their kind: each its top and its height in layout px */
const rows = (/** @type {string} */ slot) => (SLOTFACE.faceOf(slot)?.layout?.rows ?? []).map((r) => ({ cls: r.cls, top: r.top, h: r.h, text: r.html.replace(/<[^>]*>/g, '') }));
/** what a face draws, its corner's and its body's words */
const text = (/** @type {string} */ slot) => { const f = SLOTFACE.faceOf(slot); return f ? `${f.corner.textContent} ${rows(slot).map((r) => r.text).join(' ')}` : ''; };
/** the find_links_ftt frames the port was asked, by their `to` */
const fourSets = (from = 0) => fake.asked.slice(from).filter((k) => k.startsWith('op:') && k.includes('"find_links_ftt"'));

test('the read a slot\'s face makes is one four-set naming its address in `to` alone, no other slot constrained and no census composed (B11-S5; the slot\'s face decision, point 2; A-47)', () => {
  assert.deepEqual(F.linksEndingAt(SLOT), { op: 'find_links_ftt', q: { from: 'any', home: 'any', to: [{ start: SLOT, width: '0.0.0.0.1' }], ty: 'any' } });
  assert.ok(F.READ_OPS.includes('find_links_ftt') && F.READ_OPS.includes('read_link') && !F.READ_OPS.includes('count_ftt'), 'its two ops are reads the page composes; the census is not among them');
});

test('not the census: the four-set\'s links kept by their stored end at or under the slot\'s address — one naming the slot\'s account or a prefix above it counting nothing — one find_links_ftt asked at the landing with `to` the slot, each found link read once, no count_ftt (the slot\'s face decision, point 2, test 2; P55; E15 (a))', async () => {
  const ACCT = THEM + '.0.2.0.1.1', TOP = THEM + '.0.66.0.2.1', SPAN = THEM + '.0.66.0.2.2', AT = NEAR + '.0.2.1';
  found(SLOT, [ACCT, TOP, SPAN]);
  reads(ACCT, value(passage(THEM + '.0.66', 1, 4), unitSpan(THEM), CITE, 40));
  reads(TOP, value(passage(THEM + '.0.66', 9, 4), unitSpan('1'), CITE, 41));
  // a `to` naming a run of the account's documents from its home page, the slot among them: a document's end by rule (i), never the slot's
  reads(SPAN, value(passage(THEM + '.0.66', 17, 4), { start: THEM + '.0.1', width: '0.0.0.0.5' }, CITE, 43));
  reads(AT, value(passage(NEAR, 1, 5), unitSpan(SLOT), CITE, 42));
  const asked = fake.asked.length;
  void PUMP.readLinksEndingAt(SLOT);
  atFace(SLOT);
  await settle();
  assert.deepEqual([LK.slotFold(SLOT).state, LK.slotFold(SLOT).count.length, SLOTFACE.faceOf(SLOT)?.items], ['answered', 0, []], 'links to the account, to the board and to a run of documents the slot lies in count nothing: zero, the corner drawing nothing');
  assert.ok(text(SLOT).includes(sentence('L.slot-face.clause.zero', { board: BOARD() })), 'the zero clause stands, naming the board');
  found(SLOT, [ACCT, TOP, SPAN, AT]);
  void PUMP.readLinksEndingAt(SLOT);
  await settle();
  assert.deepEqual([LK.slotFold(SLOT).count.map((l) => l.addr), SLOTFACE.faceOf(SLOT)?.items], [[AT], ['count']], 'one link whose `to` is the slot: the count reads 1');
  const made = fake.asked.slice(asked);
  const ops = made.filter((k) => k.startsWith('op:')).map((k) => /** @type {{op: string}} */ (JSON.parse(k.slice(3))).op);
  assert.deepEqual([ops.filter((o) => o === 'find_links_ftt').length, ops.filter((o) => o === 'count_ftt').length], [2, 0], 'two landings\' four-sets, no census');
  assert.ok(fourSets(asked).every((k) => k.includes(`"to":[{"start":"${SLOT}"`)), 'each with `to` the slot');
  assert.deepEqual(ops.filter((o) => o === 'read_link').length, 4, 'each found link read once, a link read before never again');
  assert.ok(ops.every((o) => F.READ_OPS.includes(o)), `every frame the face sent a read: ${ops}`);
  assert.deepEqual(fake.unanswered, []);
});

test('a heavily named account: two hundred links naming the slot\'s account and three naming the slot — the count reads 3, one four-set asked and each found link read once, never more than the pump\'s bound out at once (the slot\'s face decision, point 2: its cost)', async () => {
  const MANY = Array.from({ length: 200 }, (_, i) => `${THEM}.0.${100 + i}.0.2.1`), MINE = [1, 2, 3].map((i) => `${OTHER}.0.2.${i}`);
  MANY.forEach((a, i) => reads(a, value(passage(`${THEM}.0.${100 + i}`, 1, 3), unitSpan(THEM), CITE, 100 + i)));
  MINE.forEach((a, i) => reads(a, value(passage(OTHER, 10 * i + 1, 3), unitSpan(SLOT), CITE, 400 + i)));
  found(SLOT, [...MANY, ...MINE]);
  const releases = [...MANY, ...MINE].map((a) => fake.hold('op', { frame: F.readLink(a) }));
  const asked = fake.asked.length, t0 = performance.now();
  void PUMP.readLinksEndingAt(SLOT);
  atFace(SLOT);
  for (let i = 0; i < 20; i++) { PUMP.pump(); await new Promise((r) => setTimeout(r, 0)); }
  const out = () => fake.asked.slice(asked).filter((k) => k.includes('"read_link"')).length;
  assert.equal(out(), 6, 'held: only as many link reads out as the pump\'s bound lets go at once');
  let frames = 0;
  for (const r of releases) { r(); for (let i = 0; i < 3; i++) { PUMP.pump(); frames++; await new Promise((x) => setTimeout(x, 0)); } }
  await settle();
  const ms = performance.now() - t0;
  assert.deepEqual([LK.slotFold(SLOT).state, LK.slotFold(SLOT).count.length], ['answered', 3], 'the count reads 3');
  assert.deepEqual([fourSets(asked).length, fake.asked.slice(asked).filter((k) => k.includes('"read_link"')).length], [1, 203], 'one four-set, one read per found link');
  console.log(`# figures: a heavily named account — 203 links found, 203 read, ${frames} pump passes, ${ms.toFixed(0)} ms over the fake port`);
  assert.deepEqual(fake.unanswered, []);
});

let seeded = 0;
/** the links of each kind the tests seed at a slot: a citation from the reader's note, one from another account's page, an endorsement, a credential record and a structural link */
function seedKinds(/** @type {string} */ slot, /** @type {Array<'cite' | 'other' | 'social' | 'record' | 'structural' | 'mail'>} */ kinds) {
  const types = { cite: CITE, other: CITE, social: ENDORSE, record: CREDENTIAL, structural: STRUCTURE, mail: MAIL };
  // each test's links at addresses of their own: M-PUMP reads a link once for the page's life
  const base = (seeded += 100);
  const addrs = kinds.map((k, i) => `${k === 'other' ? OTHER : NEAR}.0.2.${base + i}`);
  kinds.forEach((k, i) => reads(addrs[i], value(passage(k === 'other' ? OTHER : NEAR, 3 * i + 1, 2), unitSpan(slot), types[k], base + i)));
  found(slot, addrs);
  return addrs;
}

test('rule (i), LK\'s one test: the social types stand as the social mark alone — no count, no zero clause, its act listing them; a record and a structural type count nowhere (the slot\'s face decision, point 2, test 3; E11 (c); E17 (a); FP-33)', async () => {
  const [social, record, structural] = seedKinds(SLOT, ['social', 'record', 'structural']);
  void PUMP.readLinksEndingAt(SLOT);
  atFace(SLOT);
  await settle();
  const fold = LK.slotFold(SLOT);
  assert.deepEqual([fold.count.length, fold.social.map((l) => l.addr), SLOTFACE.faceOf(SLOT)?.items], [0, [social], ['social']], 'the social mark alone; the record and the structural link nowhere');
  assert.deepEqual([LK.classify(/** @type {any} */ (REC.link(record))), LK.classify(/** @type {any} */ (REC.link(structural)))], ['record', 'structural'], 'by the one test');
  const said = SLOTFACE.statementOf(SLOT);
  assert.ok(said.includes(sentence('L.slot-face.clause.social', { board: BOARD() })) && !said.includes(sentence('L.slot-face.clause.zero', { board: BOARD() })), `its clause says the mark opens its list; no zero clause: ${said}`);
  SLOTFACE.toggleList(SLOT, 'social'); SLOTFACE.frame();
  assert.deepEqual(rows(SLOT).filter((r) => r.cls === 'item').length, 1, 'its act lists the endorsement');
  assert.deepEqual(fake.unanswered, []);
});

test('zero: no corner item, no element of the face carrying `aria-expanded` or `aria-controls`, the statement whole with its list clause naming the board, the ear reading it whole; a second landing in the session shows it compact, its mark led by `▸`, the ear still reading it whole, no list act (the slot\'s face decision, point 2, test 1; P69; P41; the byline\'s act decision, point 1, test 3)', async () => {
  void PUMP.readLinksEndingAt(PAGE);
  atFace(PAGE);
  await settle();
  const f = /** @type {NonNullable<ReturnType<typeof SLOTFACE.faceOf>>} */ (SLOTFACE.faceOf(PAGE));
  const markup = f.corner.innerHTML + f.body.innerHTML;
  assert.deepEqual([f.items, markup.includes('aria-expanded'), markup.includes('aria-controls')], [[], false, false], 'nothing in the corner, nothing that opens a list');
  const zero = sentence('L.slot-face.clause.zero', { board: BOARD() });
  assert.ok(f.whole && text(PAGE).includes(zero) && SLOTFACE.heardWords(PAGE).includes(zero), 'whole, its clause naming the board, the ear reading it');
  SLOTFACE.landed(PAGE); SLOTFACE.frame();
  const g = /** @type {NonNullable<ReturnType<typeof SLOTFACE.faceOf>>} */ (SLOTFACE.faceOf(PAGE));
  assert.ok(!g.whole && !text(PAGE).includes(zero) && text(PAGE).includes(t('L.slot-face.compact')), 'a second opening: compact');
  const mark = g.body.querySelector('.fcompact');
  assert.ok(mark && mark.innerHTML.startsWith(`<span class="sign" aria-hidden="true">${OPENS}</span>`), `its compact mark led by \`▸\`, hidden from its name, its act opening it whole (the byline's act decision, point 1, test 3): ${mark && mark.innerHTML}`);
  assert.ok(SLOTFACE.heardWords(PAGE).includes(zero) && g.body.innerHTML.includes('aria-describedby'), 'the ear reads it whole still, as the compact mark\'s description');
  assert.ok(!(g.corner.innerHTML + g.body.innerHTML).includes('aria-controls'), 'no list act');
});

test('every state drawn: the count\'s place hollow while the read is out — never blank — and nothing moving as it answers; "links not read" where it failed, no zero clause and no list act (the slot\'s face decision, point 2, tests 4 and 5; FP-34)', async () => {
  seedKinds(SLOT, ['cite']);
  const release = fake.hold('op', { frame: F.linksEndingAt(SLOT) });
  void PUMP.readLinksEndingAt(SLOT);
  atFace(SLOT);
  SLOTFACE.frame();
  const f = /** @type {NonNullable<ReturnType<typeof SLOTFACE.faceOf>>} */ (SLOTFACE.faceOf(SLOT));
  const hollow = f.corner.querySelector('.arriving');
  assert.ok(f.items.includes('arriving') && hollow && /width:\d+px/.test(hollow.getAttribute('style') || '') && hollow.getAttribute('aria-hidden') === 'true', 'reading: the count\'s place hollow, a box of the count\'s width, hidden from assistive technology');
  const before = rows(SLOT), corner = SLOTFACE.cornerAt(SLOT);
  release();
  await settle();
  assert.deepEqual(SLOTFACE.faceOf(SLOT)?.items, ['count'], 'answered: the count');
  const after = rows(SLOT);
  for (const r of before) { const a = after.find((x) => x.cls === r.cls); assert.ok(a && Math.abs(a.top - r.top) <= 0.5, `${r.cls} kept its place: ${r.top} → ${a && a.top}`); }
  assert.ok(Math.abs((SLOTFACE.cornerAt(SLOT)?.corner.y ?? NaN) - (corner?.corner.y ?? NaN)) <= 0.5, 'the corner kept its place');
  script[FAKE.keyOf('op', { frame: F.linksEndingAt(PAGE) })] = { refused: { kind: 'refused', name: 'scan_refused', code: 'scan_refused' } };
  try {
    void PUMP.readLinksEndingAt(PAGE);
    atFace(PAGE);
    await settle();
    const g = /** @type {NonNullable<ReturnType<typeof SLOTFACE.faceOf>>} */ (SLOTFACE.faceOf(PAGE));
    assert.deepEqual(g.items, ['unread'], 'failed: links not read');
    assert.ok(g.corner.textContent.includes(t('L.slot-face.unread')) && !text(PAGE).includes(sentence('L.slot-face.clause.zero', { board: BOARD() })) && !(g.corner.innerHTML + g.body.innerHTML).includes('aria-controls'), 'no zero clause, no list act');
  } finally { script[FAKE.keyOf('op', { frame: F.linksEndingAt(PAGE) })] = { result: { as_of: 1, resp: 'addrs', addrs: [] } }; }
});

test('the statement whole at its first opening in a session and compact after — the opening a landing or the face coming to stand — the ear reading it whole every time; a change of the page\'s class shows it whole once more (P41; FP-26; B11-S5)', async () => {
  void PUMP.readLinksEndingAt(SLOT);
  atFace(SLOT);
  await settle();
  assert.equal(SLOTFACE.faceOf(SLOT)?.whole, true, 'first opening: whole');
  CAM.set({ ...CAM.view(), scale: CAM.view().scale / 8 }); SLOTFACE.frame();
  assert.equal(SLOTFACE.stands(SLOT), false, 'below its reading scale the face goes');
  atFace(SLOT); SLOTFACE.frame();
  assert.equal(SLOTFACE.faceOf(SLOT)?.whole, false, 'a later opening: compact');
  SLOTFACE.wholeStatement(SLOT); SLOTFACE.frame();
  assert.equal(SLOTFACE.faceOf(SLOT)?.whole, true, 'whole on its act');
  SLOTFACE.classChanged(); SLOTFACE.landed(SLOT); SLOTFACE.frame();
  assert.equal(SLOTFACE.faceOf(SLOT)?.whole, true, 'a new class\'s first opening: whole');
});

/** a face's body as it stands on screen: its transform's place and its scale */
function bodyAt(/** @type {string} */ slot) {
  const f = /** @type {NonNullable<ReturnType<typeof SLOTFACE.faceOf>>} */ (SLOTFACE.faceOf(slot));
  const m = /translate\(([-\d.e]+)px, ([-\d.e]+)px\) scale\(([-\d.e]+)\)/.exec(f.body.style.transform || '');
  return { x: Number(m && m[1]), y: Number(m && m[2]), s: Number(m && m[3]) };
}
/** a face's row of a kind on screen: its top and its bottom */
const rowOn = (/** @type {string} */ slot, /** @type {string} */ cls) => { const r = SLOTFACE.rowBoxes(slot).find((x) => x.cls === cls); return r ? { top: r.y, bottom: r.y + r.h, x: r.x, w: r.w } : null; };

test('the face is set inside the one form\'s corners, at the head where the label stood: its body at the form\'s first column slot\'s top-left, as wide as that column, its rows inside the rectangle `shapeOf` gives the form; the corners still drawn about it (the one form\'s drawing, part 1; FP-43)', async () => {
  void PUMP.readLinksEndingAt(SLOT);
  atFace(SLOT);
  await settle();
  const shape = LAYER.shapeOf(SLOT), f = LAYER.formFold(SLOT), box = docBox(SLOT), col = f.columns[0];
  const b = bodyAt(SLOT), L = /** @type {any} */ (SLOTFACE.faceOf(SLOT)?.layout);
  assert.ok(Math.abs(b.x - CAM.sx(box.x + col.x)) < 1e-6 && Math.abs(b.y - CAM.sy(box.y + col.y)) < 1e-6, 'at the column\'s top-left');
  const right = b.x + L.width * b.s, bottom = b.y + Math.max(...L.rows.map((/** @type {any} */ r) => r.top + r.h)) * b.s;
  assert.ok(b.x >= CAM.sx(shape.x) - 1e-6 && right <= CAM.sx(shape.x + shape.w) + 1e-6 && b.y >= CAM.sy(shape.y) - 1e-6 && bottom <= CAM.sy(shape.y + shape.h) + 1e-6, `inside the form's rectangle: ${JSON.stringify({ b, right, bottom, shape: { x: CAM.sx(shape.x), y: CAM.sy(shape.y), r: CAM.sx(shape.x + shape.w), b: CAM.sy(shape.y + shape.h) } })}`);
  assert.ok(Math.abs(L.width * b.s - col.w * CAM.view().scale) < 1e-6 && shape.w < box.w, 'as wide as the first column slot, never the whole cell');
  assert.ok(REC.isForm(SLOT) && !REC.known().includes(SLOT), 'still the form: no box stands at the slot');
});

test('its head carries the form\'s label: the slot\'s name, its state set in after it, then its address whole at the row\'s end — "your bio" at the reader\'s own — never a possessive on an address, never a device\'s label (the slot\'s face decision, point 4, tests 1 to 3)', async () => {
  REC.takeAccountKey(THEM, { label: 'studio-laptop', fingerprint: 'ab12cd34ef56ab12' });
  for (const [slot, name] of [[SLOT, t('L.well-known.bio')], [OWN, t('L.well-known.your-bio')], [PAGE, t('L.well-known.link-page')]]) {
    void PUMP.readLinksEndingAt(slot);
    atFace(slot);
    await settle();
    const head = rows(slot).find((r) => r.cls === 'head');
    assert.ok(head && head.text.startsWith(`${name} — ${t('L.slot-face.unwritten')}`) && head.text.endsWith(slot), `the label carried, its state between the name and the address: ${head && head.text}`);
    const all = [text(slot), SLOTFACE.heardWords(slot)].join(' ');
    assert.ok(!/[0-9][’']s\b/.test(all), `no possessive on an address: ${all}`);
    assert.ok(!all.includes('studio-laptop'), 'no device label');
  }
});

test('the corner beside the column at 1440 stands where a document\'s corner stands beside a row\'s first column: on the column\'s left, its right edge a gap short of the column\'s text whatever its width, level with the head\'s first row; one line of acts (the slot\'s face decision, point 1; #151; foundations §3.1)', async () => {
  seedKinds(SLOT, ['cite', 'social']);
  void PUMP.readLinksEndingAt(SLOT);
  atFace(SLOT);
  await settle();
  const at = /** @type {NonNullable<ReturnType<typeof SLOTFACE.cornerAt>>} */ (SLOTFACE.cornerAt(SLOT)), head = rowOn(SLOT, 'head');
  assert.ok(!at.corner.head && at.corner.shown, 'beside the column');
  assert.ok(head && Math.abs(at.corner.y - head.top) <= 1, `level with the head's first row: ${at.corner.y} against ${head && head.top}`);
  const right = (/** @type {NonNullable<ReturnType<typeof SLOTFACE.cornerAt>>} */ c) => c.corner.x + c.corner.w;
  assert.ok(Math.abs(right(at) - (at.columnLeft - CORNER.gap)) <= 1 && right(at) <= at.columnLeft, `its right edge a gap short of the column's text, wholly left of the column: ${right(at)} against ${at.columnLeft}`);
  const f = /** @type {NonNullable<ReturnType<typeof SLOTFACE.faceOf>>} */ (SLOTFACE.faceOf(SLOT));
  // the platform sets the corner as wide as its items: it stands out leftward from that edge
  /** @type {any} */ (f.corner).offsetWidth = 140;
  SLOTFACE.frame();
  const wide = /** @type {NonNullable<ReturnType<typeof SLOTFACE.cornerAt>>} */ (SLOTFACE.cornerAt(SLOT));
  assert.ok(Math.abs(wide.corner.x - (wide.columnLeft - CORNER.gap - 140)) <= 1 && Math.abs(right(wide) - (wide.columnLeft - CORNER.gap)) <= 1 && Math.abs(wide.corner.y - at.corner.y) <= 0.5, `140 px wide: its left 140 px past that edge, its right edge and its top where they stood — ${JSON.stringify(wide)}`);
  assert.deepEqual([f.corner.querySelectorAll('[role="toolbar"]').length, f.corner.querySelectorAll('[role="toolbar"] button').length], [1, 2], 'one line of acts holding the count and the social mark');
});

test('the corner is placed by its width as it stands in that frame: its first frame beside the column after it stood across the column at its head, and its first frame shown after it stood hidden holding no item, each stand its right edge a gap short of the column\'s text (the slot\'s face decision, point 1; FP-8)', async () => {
  seedKinds(SLOT, ['cite']);
  CAM.setViewport(390, 844);
  void PUMP.readLinksEndingAt(SLOT);
  atFace(SLOT);
  await settle();
  const f = /** @type {any} */ (SLOTFACE.faceOf(SLOT));
  // the platform's width of the corner: none while it is hidden, the width set on it where one is, else its items' own
  Object.defineProperty(f.corner, 'offsetWidth', { configurable: true, get: () => (f.corner.style.display === 'none' ? 0 : f.corner.style.width ? parseFloat(f.corner.style.width) : 90) });
  SLOTFACE.frame();
  assert.ok(SLOTFACE.cornerAt(SLOT)?.corner.head && f.corner.offsetWidth > 90, `390: across the column at its head, as wide as the column — ${f.corner.offsetWidth}`);
  const beside = () => { const at = /** @type {NonNullable<ReturnType<typeof SLOTFACE.cornerAt>>} */ (SLOTFACE.cornerAt(SLOT)); return { head: at.corner.head, shown: at.corner.shown, x: at.corner.x, want: at.columnLeft - CORNER.gap - 90 }; };
  CAM.setViewport(1440, 900);
  atFace(SLOT);
  SLOTFACE.frame();
  const wide = beside();
  assert.ok(!wide.head && wide.shown && Math.abs(wide.x - wide.want) <= 1, `1440, its first frame beside the column: by its items' width, never the column's — ${JSON.stringify(wide)}`);
  found(SLOT, []);
  void PUMP.readLinksEndingAt(SLOT); SLOTFACE.landed(SLOT);
  await settle();
  assert.deepEqual([SLOTFACE.faceOf(SLOT)?.items, SLOTFACE.cornerAt(SLOT)?.corner.shown], [[], false], 'zero: no item, the corner hidden');
  const release = fake.hold('op', { frame: F.linksEndingAt(SLOT) });
  try {
    void PUMP.readLinksEndingAt(SLOT); SLOTFACE.landed(SLOT);
    SLOTFACE.frame();
    const shown = beside();
    assert.ok(shown.shown && Math.abs(shown.x - shown.want) <= 1, `its read out again, its first frame shown: by its items' width, never none — ${JSON.stringify(shown)}`);
  } finally { release(); await settle(); }
});

test('beside the column the corner takes the form a document\'s corner takes by a row\'s first column — by the strip left of the slot\'s box and the view\'s fit (T-LAYER\'s `roomBeside`, `formFor`): at 1440 two links\' count whole; at 700 px, where the fit holds a column beside the compact corner alone, one link\'s count compact (the slot\'s face decision, point 1; FP-26; #151)', async () => {
  const count = () => /** @type {any} */ (SLOTFACE.faceOf(SLOT))?.corner.querySelector('.fcount');
  seedKinds(SLOT, ['cite', 'other']);
  void PUMP.readLinksEndingAt(SLOT);
  atFace(SLOT);
  await settle();
  assert.deepEqual([CAM.fit().compact, CAM.fit().head], [false, false], '1440: the fit holds the whole corner beside the column');
  assert.ok(count()?.dataset.string === 'L.slot-face.count' && count()?.textContent === t('L.slot-face.count', { n: '2' }), `whole: ${count()?.textContent}`);
  CAM.setViewport(700, 900);
  seedKinds(SLOT, ['cite']);
  void PUMP.readLinksEndingAt(SLOT);
  atFace(SLOT);
  await settle();
  assert.deepEqual([CAM.fit().compact, CAM.fit().head, SLOTFACE.cornerAt(SLOT)?.corner.head], [true, false, false], '700 px: the fit holds the compact corner beside the column');
  assert.ok(count()?.dataset.string === 'L.slot-face.count.compact.1' && count()?.textContent === t('L.slot-face.count.compact.1', { n: '1' }), `compact: ${count()?.textContent}`);
});

test('the corner at one column — 390 px and 320 CSS px: on its own row directly beneath the head\'s first row, which stands with it, above the told line or the statement; its items on that row, wrapped only between items; none below the face\'s acts (the slot\'s face decision, point 1, test 2; WCAG 1.4.10)', async () => {
  for (const w of [390, 320]) {
    CAM.setViewport(w, 844);
    seedKinds(SLOT, ['cite']);
    void PUMP.readLinksEndingAt(SLOT);
    atFace(SLOT);
    await settle();
    const f = /** @type {NonNullable<ReturnType<typeof SLOTFACE.faceOf>>} */ (SLOTFACE.faceOf(SLOT)), at = /** @type {NonNullable<ReturnType<typeof SLOTFACE.cornerAt>>} */ (SLOTFACE.cornerAt(SLOT));
    assert.ok(at.corner.head && f.corner.querySelector('.fhead') && f.corner.querySelector('.fbarrow [role="toolbar"]'), `${w}: at the head, its first row the head's, its items on a row of their own`);
    const headH = LINE_H * LAYER.formFold(SLOT).fs * CAM.view().scale, band = /** @type {any} */ (f.layout).band * bodyAt(SLOT).s;
    const itemsTop = at.corner.y + headH, state = rowOn(SLOT, 'state');
    assert.ok(itemsTop >= at.corner.y + headH - 0.5, `${w}: its items' row at or below the head's first row's bottom`);
    assert.ok(state && at.corner.y + at.corner.h <= state.top + 0.5 && Math.abs(band - at.corner.h) < 1, `${w}: above the statement, the body's band its rows' depth: ${JSON.stringify({ corner: at.corner, state, band })}`);
    const act = rowOn(SLOT, 'act');
    assert.ok(act && itemsTop < act.top, `${w}: no item below the face's acts`);
    assert.ok(f.corner.querySelector('.fhead')?.textContent?.startsWith(`${t('L.well-known.bio')} — ${t('L.slot-face.unwritten')}`), `${w}: the head's words`);
  }
});

test('held: at one column the head\'s two rows held under the one line while the form\'s rectangle is in view, and gone once it leaves, the count still a stop; at 1440 the corner alone held; a focus on a row the held rows cover brings its whole line clear below them (the slot\'s face decision, point 1, tests 3 and 5; FP-37; #689; #703; WCAG 2.4.11)', async () => {
  const many = seedKinds(SLOT, Array.from({ length: 12 }, () => 'cite'));
  for (const w of [390, 1440]) {
    CAM.setViewport(w, w === 390 ? 844 : 900);
    void PUMP.readLinksEndingAt(SLOT);
    atFace(SLOT);
    await settle();
    SLOTFACE.toggleList(SLOT, 'count'); SLOTFACE.frame();
    const top = 30 + HOLD.gap, at0 = /** @type {any} */ (SLOTFACE.cornerAt(SLOT));
    CAM.panBy(0, -(at0.rowTop - top) - 200); SLOTFACE.frame();
    const at = /** @type {any} */ (SLOTFACE.cornerAt(SLOT)), head = rowOn(SLOT, 'head') || { top: at.rowTop };
    assert.ok(Math.abs(at.corner.y - top) <= 0.5 && at.corner.shown && head.top < top, `${w}: the corner held below the one line as the face scrolls under it: ${at.corner.y}`);
    assert.equal(at.corner.head, w === 390, `${w}: ${w === 390 ? 'the head\'s two rows held together' : 'the corner alone held'}`);
    const f = /** @type {NonNullable<ReturnType<typeof SLOTFACE.faceOf>>} */ (SLOTFACE.faceOf(SLOT));
    assert.ok(f.corner.querySelector('button.fcount'), `${w}: the count still a stop while held`);
    // a row the held rows cover: a focus on it brings its whole line clear below them
    const covered = SLOTFACE.rowBoxes(SLOT).find((r) => r.cls === 'item' && r.y < at.corner.y + at.corner.h && r.y + r.h > top);
    if (covered) {
      SLOTFACE.bringClear(SLOT, covered.i); SLOTFACE.frame();
      const now = /** @type {any} */ (SLOTFACE.rowBoxes(SLOT)[covered.i]), held = /** @type {any} */ (SLOTFACE.cornerAt(SLOT));
      assert.ok(now.y >= Math.max(30, held.corner.y + held.corner.h) - 0.5, `${w}: the row's line clear below the held rows: ${now.y} against ${held.corner.y + held.corner.h}`);
    }
    const shape = LAYER.shapeOf(SLOT);
    CAM.panBy(0, -(CAM.sy(shape.y + shape.h) - top) - 50); SLOTFACE.frame();
    assert.equal(SLOTFACE.cornerAt(SLOT)?.corner.shown ?? false, false, `${w}: gone once the rectangle has left the view`);
    SLOTFACE.toggleList(SLOT, 'count');
  }
  void many;
});

test('one numeral: the count\'s act opens its list in the one region beneath the face\'s acts, moving nothing above it, the item drawn open; the list draws no head of its own, its numeral drawn once on the face (the slot\'s face decision, point 1, test 4)', async () => {
  seedKinds(SLOT, ['cite', 'cite', 'other']);
  void PUMP.readLinksEndingAt(SLOT);
  atFace(SLOT);
  await settle();
  const before = rows(SLOT);
  SLOTFACE.toggleList(SLOT, 'count'); SLOTFACE.frame();
  const after = rows(SLOT), f = /** @type {NonNullable<ReturnType<typeof SLOTFACE.faceOf>>} */ (SLOTFACE.faceOf(SLOT));
  for (const r of before) { const a = after.find((x) => x.cls === r.cls); assert.ok(a && Math.abs(a.top - r.top) <= 0.5, `${r.cls} kept its place`); }
  const actBottom = Math.max(...after.filter((r) => r.cls === 'act').map((r) => r.top + r.h)), list = after.filter((r) => ['run', 'item', 'more'].includes(r.cls));
  assert.ok(list.length && list.every((r) => r.top >= actBottom), 'the list beneath the face\'s acts');
  assert.ok(f.corner.querySelector('[aria-expanded="true"]') && f.body.querySelector('.flist[role="group"]')?.getAttribute('aria-labelledby') === f.corner.querySelector('.fcount')?.id, 'drawn open; the region named by its opener');
  assert.equal(f.corner.querySelector('.fcount')?.getAttribute('aria-controls'), f.body.querySelector('.flist')?.id, 'its opener controls it');
  const numeral = text(SLOT).split(/\s+/).filter((w) => w === '3').length;
  assert.equal(numeral, 1, `the count's numeral drawn once: ${text(SLOT)}`);
  assert.ok(!list.some((r) => r.text.includes(t('L.slot-face.count', { n: '3' }))), 'no head of the list\'s own');
});

test('THE FACE\'s BUDGET at one column: fifty links listed, the oldest rows fold first into one row with their count, each row one line its first line cut from its end, while the statement stands whole; the head, the corner, the acts and the told line never yield (B11-S5; P48)', async () => {
  CAM.setViewport(390, 844);
  REC.takeIndex(/** @type {any} */ ({ docs: [ME + '.0.1', THEM + '.0.1', NEAR, OTHER].map((doc) => ({ doc, kind: 'edition', label: doc === NEAR ? 'Notes on a bio not written, at some length, past the measure of one column at this width' : 'p', standing: 'public' })), counts: [], state: { arm: 'complete' } }));
  // letters, whose rows name no type: each row its home and that home's first line, past the column's measure at this width
  const many = seedKinds(SLOT, Array.from({ length: 50 }, () => 'mail'));
  void PUMP.readLinksEndingAt(SLOT);
  atFace(SLOT);
  await settle();
  SLOTFACE.landed(SLOT, { link: many[0] });
  SLOTFACE.wholeStatement(SLOT);
  SLOTFACE.toggleList(SLOT, 'count'); SLOTFACE.frame();
  const f = /** @type {NonNullable<ReturnType<typeof SLOTFACE.faceOf>>} */ (SLOTFACE.faceOf(SLOT)), L = /** @type {any} */ (f.layout);
  assert.ok(L.folded > 0 && rows(SLOT).some((r) => r.cls === 'more' && r.text === t('L.slot-face.more', { n: String(L.folded) })), `the oldest folded into one row with their count: ${L.folded}`);
  const items = rows(SLOT).filter((r) => r.cls === 'item');
  assert.ok(items.length > 0 && items.length + L.folded === 50, 'the rest stand, newest first');
  assert.ok(L.cut && items.some((r) => r.text.includes('…')), 'a row\'s first line cut from its end');
  assert.ok(f.whole, 'the statement whole while rows fold before it');
  for (const cls of ['band', 'told', 'state', 'act']) assert.ok(rows(SLOT).some((r) => r.cls === cls), `${cls} stands`);
  assert.ok(f.corner.querySelector('.fhead') && f.corner.querySelector('button.fcount'), 'the head and the corner stand');
  const deepest = Math.max(...L.rows.map((/** @type {any} */ r) => r.top + r.h));
  assert.ok(deepest <= L.room + 1e-6, `inside the rectangle: ${deepest} of ${L.room}`);
  SLOTFACE.unfold(SLOT); SLOTFACE.frame();
  assert.equal(rows(SLOT).filter((r) => r.cls === 'item').length, 50, 'the fold row\'s act: every row whole');
});

test('the list\'s rows: newest first by the commit that made each; a run\'s writer named once at its head by its account\'s address, each row its home past that prefix; the reader\'s own run headed "yours"; a letter\'s row naming no type, any other its type (the slot\'s face decision, point 4, test 4; P71; R44; seat-settled 10)', async () => {
  const [mine1, mine2, theirs, mail] = seedKinds(SLOT, ['cite', 'cite', 'other', 'mail']);
  // newest first: the letter, then the other account's, then the reader's two
  for (const [a, at] of /** @type {Array<[string, number]>} */ ([[mine1, 10], [mine2, 11], [theirs, 20], [mail, 30]])) {
    const l = /** @type {any} */ (JSON.parse(JSON.stringify(script[FAKE.keyOf('op', { frame: F.readLink(a) })])));
    l.result.at = at; reads(a, l);
  }
  void PUMP.readLinksEndingAt(SLOT);
  atFace(SLOT);
  await settle();
  SLOTFACE.toggleList(SLOT, 'count'); SLOTFACE.frame();
  const list = rows(SLOT).filter((r) => r.cls === 'run' || r.cls === 'item').map((r) => [r.cls, r.text]);
  assert.deepEqual(list.map((r) => r[0]), ['run', 'item', 'run', 'item', 'run', 'item', 'item'], `runs by writer, newest first: ${JSON.stringify(list)}`);
  assert.deepEqual([list[0][1], list[2][1], list[4][1]], [t('L.slot-face.yours'), '1.0.3', t('L.slot-face.yours')], 'each run headed once: "yours" over the reader\'s own, the writer\'s address over another\'s');
  assert.ok(list[1][1].startsWith(NEAR.slice(ME.length) + ' · ') && !list[1][1].includes('link of type'), `a letter: its home past the prefix, no type: ${list[1][1]}`);
  assert.ok(list[3][1].startsWith(OTHER.slice('1.0.3'.length) + ' · ') && list[3][1].includes(t('R5.undocumented', { T: '3.13' })), `another account's citation: its type named: ${list[3][1]}`);
  assert.ok(list.filter((r) => r[0] === 'item').every((r) => !r[1].startsWith('1.0.')), 'no row repeats its writer\'s address');
});

test('slot 5, whose name is not given: its face names no slot and stands no word for a name — its state, then its address (O12; the slot\'s face decision\'s rule for the face at a slot whose name is a gap)', async () => {
  void PUMP.readLinksEndingAt(FIVE);
  atFace(FIVE);
  await settle();
  const head = rows(FIVE).find((r) => r.cls === 'head');
  assert.ok(head && head.text.startsWith(t('L.slot-face.unwritten')) && head.text.endsWith(FIVE), `the state, then the address: ${head && head.text}`);
  assert.ok(![t('L.well-known.bio'), t('L.well-known.link-page'), t('L.well-known.mailbox'), '⟨', ' — '].some((w) => head?.text.includes(w)), 'no name, no placeholder, no joiner for a missing name');
});

test('said once: the corner\'s items said once each, politely, as they fill — nothing while the read is out, nothing at zero, nothing again at a redraw (the slot\'s face decision, point 2, test 7; FP-21; FP-36)', async () => {
  seedKinds(SLOT, ['cite']);
  const release = fake.hold('op', { frame: F.linksEndingAt(SLOT) });
  void PUMP.readLinksEndingAt(SLOT);
  atFace(SLOT);
  liveEl.textContent = '';
  SLOTFACE.frame();
  assert.equal(liveEl.textContent, '', 'nothing said while the read is out');
  release();
  await settle();
  assert.equal(liveEl.textContent, t('L.slot-face.count.1', { n: '1' }), 'the count said as it fills');
  assert.equal(liveEl.getAttribute('aria-live'), 'polite', 'politely');
  liveEl.textContent = '';
  for (let i = 0; i < 3; i++) SLOTFACE.frame();
  assert.equal(liveEl.textContent, '', 'never again at a redraw');
  void PUMP.readLinksEndingAt(PAGE);
  atFace(PAGE);
  await settle();
  assert.equal(liveEl.textContent, '', 'nothing at zero');
});

test('targets and order: each corner item at least 24 px each way; the corner one Tab stop, ← and → walking it; the face\'s stops in the order they are drawn — the corner, the statement\'s mark, the link act\'s plain word, the list — while the walk stands on its form, none while it does not (the slot\'s face decision, point 1, tests 6 and 7; #585; WCAG 2.5.8)', async () => {
  seedKinds(SLOT, ['cite', 'social']);
  void PUMP.readLinksEndingAt(SLOT);
  atFace(SLOT);
  await settle();
  SLOTFACE.landed(SLOT); SLOTFACE.toggleList(SLOT, 'count');
  await WALK.focusTo(SLOT, null);
  SLOTFACE.frame();
  const f = /** @type {NonNullable<ReturnType<typeof SLOTFACE.faceOf>>} */ (SLOTFACE.faceOf(SLOT));
  const bar = /** @type {any[]} */ ([...f.corner.querySelectorAll('[role="toolbar"] button')]);
  assert.deepEqual(bar.map((b) => b.tabIndex), [0, -1], 'the corner one stop');
  const css = (await import('node:fs')).readFileSync(new URL('../style.css', import.meta.url), 'utf8');
  assert.ok(/#slotface \.facecorner \.fbar > \* \{[^}]*min-height:24px;[^}]*min-width:24px;/.test(css), 'each item at least 24 px each way');
  const stops = /** @type {any[]} */ ([...f.corner.querySelectorAll('button'), ...f.body.querySelectorAll('button')]).filter((b) => b.tabIndex === 0).map((b) => b.className.split(' ')[0]);
  assert.deepEqual(stops, ['fcount', 'fcompact', 'fact', 'fitem'], 'the corner, the statement\'s mark, the link act\'s plain word, the list');
  const right = await KEYS.dispatch(/** @type {any} */ ({ key: 'ArrowRight', code: 'ArrowRight', target: bar[0], preventDefault() {}, shiftKey: false, metaKey: false, ctrlKey: false, altKey: false }), { where: 'corner', byKey: true });
  assert.ok(right && pg.document.activeElement === bar[1], '→ along the corner');
  await WALK.focusTo(NEAR, null);
  SLOTFACE.frame();
  const g = /** @type {NonNullable<ReturnType<typeof SLOTFACE.faceOf>>} */ (SLOTFACE.faceOf(SLOT));
  assert.ok([...g.corner.querySelectorAll('button'), ...g.body.querySelectorAll('button')].every((b) => /** @type {any} */ (b).tabIndex === -1) && g.body.getAttribute('aria-hidden') === 'true', 'the walk elsewhere: no stop, hidden from assistive technology');
});

test('the one form\'s accessible statement: its visible label first, then what it is — at another person\'s form an assigned address, the account\'s address voiced once; at the reader\'s own "your bio", their assigned address and, their index complete, that nothing is written there yet (the slot\'s face decision, point 4, test 5; WCAG 2.5.3; P80)', async () => {
  const sibs = await WALK.childrenOf({ kind: 'account', addr: THEM, pos: null, link: null }), i = sibs.findIndex((n) => n.addr === SLOT);
  const theirs = WALK.nameOf(sibs[i], i, sibs.length);
  const bio = t('L.well-known.bio');
  assert.ok(theirs.startsWith(`${bio.charAt(0).toUpperCase() + bio.slice(1)}, ${SLOT}, ${t('L.slot-face.name.other')}`), `the label first, then an assigned address: ${theirs}`);
  assert.equal(theirs.split(THEM).length - 1, 1, 'the account voiced once');
  assert.ok(!theirs.includes(t('L.slot-face.unwritten')) && !theirs.includes(t('L.far.unregistered')), 'no absence asserted at another person\'s form, and no read\'s answer');
  const mine = await WALK.childrenOf({ kind: 'account', addr: ME, pos: null, link: null }), j = mine.findIndex((n) => n.addr === OWN);
  const own = WALK.nameOf(mine[j], j, mine.length);
  assert.ok(own.startsWith(`Your bio, ${OWN}, ${t('L.slot-face.name.own')}, ${t('L.slot-face.unwritten')}`), `the reader's own: ${own}`);
});

/** an act run to its end, every flight stepped and every read answered (as N-GO's test runs one) */
async function run(/** @type {Promise<unknown>} */ act) {
  let done = false;
  act.then(() => { done = true; });
  for (let i = 0; i < 300 && !done; i++) { PUMP.pump(); await new Promise((r) => setTimeout(r, 0)); if (CAM.flying()) CAM.step(Infinity); }
  assert.ok(done, 'the act ran to its end');
  await settle();
}

test('the face stands at the form\'s place at reading scale by every route — a LEAP (a press\'s, Enter\'s, a typed address\'s), a follow, a zoom into the cell — never the fifth cell\'s notice, the entry holding none; it stands past an act that leaves no place, and the zoom out lands at the form (B11-S5; B11-S4 "THE PLACE"; O1)', async () => {
  await GO.launch();
  const four = fourSets().length;
  await run(GO.leapTo(SLOT));
  assert.ok(SLOTFACE.stands(SLOT), 'a LEAP: the face stands');
  assert.deepEqual([HOST.currentState(), TRAIL.current()?.addr, TRAIL.current()?.notice ?? null], [null, SLOT, null], 'no notice standing, the entry the slot\'s with none');
  assert.ok(LAYER.atReadingScale(SLOT) && fourSets().length === four + 1, 'at its reading scale; its read made at the act');
  SLOTFACE.wholeStatement(SLOT); CAM.panBy(0, -40); SLOTFACE.frame();
  assert.ok(SLOTFACE.stands(SLOT), 'an act that leaves no place, and a pan within it: it stands');
  // a follow of a link from the reader's note to the slot: the face, its told line naming the link
  const L = NEAR + '.0.2.900';
  REC.takeLink({ addr: L, from: [{ start: NEAR + '.0.1.3', width: '0.0.0.0.0.0.0.8', doc: NEAR, account: ME, whole: false, subspace: 1, ordinal: 3, positions: 8 }], to: [{ start: SLOT, width: '0.0.0.0.1', doc: SLOT, account: THEM, whole: true, subspace: null, ordinal: null, positions: null }], type: CITE, age: { at: 90, time: null, from: null } });
  const shown = /** @type {any} */ ({ link: REC.link(L), near: NEAR, end: 'from', nearEnd: REC.link(L)?.from[0], key: 'k', runs: [{ pos: 3, width: 8 }], run: null, pos: 3, width: 8, far: SLOT, farEnd: REC.link(L)?.to[0], farSlot: 2, farWhole: true, farAt: SLOT, farRuns: null });
  await run(GO.follow(shown));
  assert.ok(SLOTFACE.stands(SLOT) && SLOTFACE.faceOf(SLOT)?.told === L, 'a follow: the face, its told line naming the link followed');
  const told = rows(SLOT).find((r) => r.cls === 'told');
  assert.ok(told && told.text.startsWith(t('L.slot-face.told', { address: NEAR })) && told.text.includes(NEAR_TEXT), `the told line: ${told && told.text}`);
  assert.ok(SLOTFACE.statementOf(SLOT).includes(sentence('L.slot-face.clause.zero', { board: BOARD() })), 'the zero clause stands beside it, scoped to its board');
  await run(GO.leapTo(NEAR));
  assert.ok(!SLOTFACE.stands(SLOT), 'leaving the place: the face goes, its told line with it');
  // a zoom into the cell: no act, no flight
  CAM.reach(LAYER.formFold(PAGE).fs); atFace(PAGE);
  const asked = fourSets().length;
  PUMP.pump(); SLOTFACE.frame();
  assert.ok(SLOTFACE.stands(PAGE) && !CAM.flying(), 'a zoom: the face, no flight');
  assert.equal(fourSets().length, asked + 1, 'its read, as a landing makes it, once');
  await settle();
  CAM.set({ ...CAM.view(), scale: LAYER.scaleBelowReading(PAGE) }); SLOTFACE.frame();
  assert.ok(!SLOTFACE.stands(PAGE) && REC.isForm(PAGE), 'the zoom out: the form, never a document');
  assert.deepEqual(fake.unanswered, []);
});

test('the read\'s moment: one four-set at each landing — never at mid, at a redraw, or at the walk\'s stop below the reading scale — and none for a form below its reading scale, which holds no record; another person\'s mailbox takes no face and no count (the slot\'s face decision, point 2; B11-S5; B11 call 6)', async () => {
  const forms = REC.forms(), asked = fourSets().length;
  const home = docBox(THEM + '.0.1');
  CAM.set({ x: home.x + home.w, y: home.y + home.h / 2, scale: LAYER.scaleBelowReading(SLOT) / 3 });
  for (let i = 0; i < 5; i++) { PUMP.pump(); SLOTFACE.frame(); await new Promise((r) => setTimeout(r, 0)); }
  assert.deepEqual([fourSets().length - asked, SLOTFACE.standing(), forms.filter(REC.has)], [0, [], []], 'at mid: no read, no face, no record');
  await WALK.focusTo(SLOT, null);
  PUMP.pump(); SLOTFACE.frame();
  assert.equal(fourSets().length - asked, 0, 'the walk\'s stop below its reading scale: none');
  await run(GO.leapTo(SLOT));
  for (let i = 0; i < 4; i++) SLOTFACE.frame();
  assert.equal(fourSets().length - asked, 1, 'a landing: one, made at its act, none at a redraw');
  await run(GO.leapTo(SLOT));
  assert.equal(fourSets().length - asked, 2, 'each landing its own');
  assert.ok(!REC.faceSlot(THEM + '.0.2') && REC.theirMailboxForm(THEM + '.0.2'), 'another person\'s mailbox: the form, no face');
});

test('the reader\'s own unwritten slot: its plain word that no act here creates it, standing in the act\'s place inert, and at their bio what every other reader meets there; no entry offered; a key no field takes at that face answered by the face\'s line naming that word, the key making nothing — a stranger\'s key at another\'s face keeping the plane\'s line (B11-S5; P10; seat-settled 19; K-72)', async () => {
  await GO.launch();
  await run(GO.leapTo(OWN));
  const own = rows(OWN).find((r) => r.cls === 'own'), others = rows(OWN).find((r) => r.cls === 'own-clause');
  const word = sentence('L.slot-face.own.none', { name: t('L.well-known.your-bio') });
  assert.ok(own && own.text === word, `the plain word: ${own && own.text}`);
  assert.ok(others && others.text === sentence('L.slot-face.own.others', { words: `${t('L.well-known.bio')} — ${t('L.slot-face.unwritten')}` }), `what every other reader meets there: ${others && others.text}`);
  const f = /** @type {NonNullable<ReturnType<typeof SLOTFACE.faceOf>>} */ (SLOTFACE.faceOf(OWN));
  assert.ok([...f.body.querySelectorAll('button.fact')].every((b) => b.getAttribute('aria-disabled') === 'true') && !f.body.innerHTML.includes('data-leap') && !f.body.innerHTML.includes('continue'), 'inert, no entry offered');
  await WALK.focusTo(OWN, null);
  await KEYS.dispatch(/** @type {any} */ ({ key: 'a', code: 'KeyA', target: pg.document.body, preventDefault() {}, shiftKey: false, metaKey: false, ctrlKey: false, altKey: false }), { where: 'plane', byKey: true });
  assert.equal(HINT.shown()?.id, 'L.slot-face.own.key', 'a key on the walk at the face: its line');
  assert.ok(JSON.stringify(HINT.shown()).includes(t('L.slot-face.own.none', { name: t('L.well-known.your-bio') })), `naming the face's plain word: ${JSON.stringify(HINT.shown())}`);
  await KEYS.dispatch(/** @type {any} */ ({ key: 'b', code: 'KeyB', target: f.body.querySelector('button.fact'), preventDefault() {}, shiftKey: false, metaKey: false, ctrlKey: false, altKey: false }), { where: 'face', byKey: true });
  assert.equal(HINT.shown()?.id, 'L.slot-face.own.key', 'a key at the face\'s own acts: the same line');
  await run(GO.leapTo(SLOT));
  await WALK.focusTo(SLOT, null);
  await KEYS.dispatch(/** @type {any} */ ({ key: 'c', code: 'KeyC', target: pg.document.body, preventDefault() {}, shiftKey: false, metaKey: false, ctrlKey: false, altKey: false }), { where: 'plane', byKey: true });
  assert.equal(HINT.shown()?.id, 'F.swallow', 'a stranger\'s key at another person\'s face: the plane\'s line');
});

test('what the own-record read waits on stands as built: no own item in the corner and no own link act — the link act stands as its plain word (the slot\'s face decision, point 3: "What it waits on")', async () => {
  seedKinds(SLOT, ['cite', 'social']);
  void PUMP.readLinksEndingAt(SLOT);
  atFace(SLOT);
  await settle();
  const f = /** @type {NonNullable<ReturnType<typeof SLOTFACE.faceOf>>} */ (SLOTFACE.faceOf(SLOT));
  assert.deepEqual(f.items, ['count', 'social'], 'the count and the social mark, nothing before them');
  assert.ok(!f.corner.textContent.includes(t('L.slot-face.yours')) && rows(SLOT).some((r) => r.cls === 'act' && r.text === sentence('L.slot-face.no-link-act')), 'the link act its plain word');
});

test('a created, empty slot page read by reader: its owner meets "nothing here yet" and the corner\'s whole line; every other reader its state alone, no act named, and "bio — not written yet" in the empty line\'s place — one state read one way at the face and at the page; a feed row creating the slot while its face stands draws no flight, the face giving way to the page, the count of the same links the same by the face\'s read and by the page\'s own, the page\'s corner standing where the face\'s stood — its right edge and its top (B11-S4; seat-settled 14; the slot\'s face decision, point 1, test 8)', async () => {
  const { articleHTML } = await import('./article.js');
  const created = (/** @type {string} */ slot) => {
    REC.takeIndex(/** @type {any} */ ({ docs: [ME + '.0.1', THEM + '.0.1', NEAR, OTHER, slot].map((doc) => ({ doc, kind: 'edition', label: null, standing: 'public' })), counts: [], state: { arm: 'complete' } }));
    REC.takeSpanSet(slot, []);
    REC.takeMetadata(slot, { doc: slot, published: true, owner: slot.slice(0, slot.lastIndexOf('.0.')), birth: null, birthExtent: null, placed: null, baseExtent: null, source: null, base: null, baseCopied: null, merge: null, age: { at: null, time: null, from: null }, asOf: 1 });
  };
  // its face standing, a link ending there counted
  const [l] = seedKinds(SLOT, ['other']);
  void PUMP.readLinksEndingAt(SLOT);
  atFace(SLOT);
  await settle();
  assert.deepEqual([SLOTFACE.stands(SLOT), LK.slotFold(SLOT).count.map((x) => x.addr)], [true, [l]], 'the face, its count 1');
  // the face's corner 110 px wide and the page's stand-in none wide: the two stand at one site by their right edges and tops
  /** @type {any} */ (SLOTFACE.faceOf(SLOT)?.corner).offsetWidth = 110;
  SLOTFACE.frame();
  const faced = /** @type {NonNullable<ReturnType<typeof SLOTFACE.cornerAt>>} */ (SLOTFACE.cornerAt(SLOT));
  created(SLOT);
  REC.takeLinks(SLOT, [l]);
  SLOTFACE.frame();
  assert.deepEqual([SLOTFACE.stands(SLOT), CAM.flying(), REC.isForm(SLOT), REC.known().includes(SLOT)], [false, false, false, true], 'created: no flight, the face gives way to the page\'s box');
  const textLayer = pg.element('div'), cornerLayer = pg.element('div');
  textLayer.clientWidth = 1440; textLayer.clientHeight = 900;
  LAYER.attach(/** @type {any} */ (textLayer), /** @type {any} */ (cornerLayer));
  try {
    LAYER.frame();
    const placed = LAYER.cornerPlace(SLOT);
    assert.ok(LAYER.isMounted(SLOT) && placed && LAYER.cornerAt(SLOT)?.head === false, `the page's corner beside its column: ${JSON.stringify(placed)}`);
    const was = { right: faced.corner.x + faced.corner.w, top: faced.corner.y };
    assert.ok(Math.abs(/** @type {any} */ (placed).right - was.right) <= 1 && Math.abs(/** @type {any} */ (placed).top - was.top) <= 1, `the corner stands where the face's stood: the page's corner's right edge and top the face's corner's — ${JSON.stringify({ was, placed })}`);
  } finally { LAYER.clear(); LAYER.attach(/** @type {any} */ (null), null); }
  console.log(`# figures: across creation, the same link — the face's read counted ${LK.slotFold(SLOT).count.length}, the page's own whole links ${LK.wholeLinks(SLOT).length}`);
  assert.equal(LK.wholeLinks(SLOT).length, LK.slotFold(SLOT).count.length, 'one count of the same links by either read');
  const d = REC.doc(SLOT), html = articleHTML(d, LAYER.viewFor(d), THEM);
  assert.ok(html.includes(`${t('L.well-known.bio')} — ${t('L.slot-face.unwritten')}`) && !html.includes(t('B1.empty_subspace')), `another reader: the bio's words, never "nothing here yet": ${html}`);
  assert.ok(LAYER.mirrorState(d).includes(t('L.corner.no-versions.state')) && !LAYER.mirrorState(d).includes(t('F.corner.no-versions')), `its state alone: ${LAYER.mirrorState(d)}`);
  created(OWN);
  const o = REC.doc(OWN), mine = articleHTML(o, LAYER.viewFor(o), ME);
  assert.ok(mine.includes(t('B1.empty_subspace')) && LAYER.mirrorState(o).includes(t('F.corner.no-versions')), `its owner: "nothing here yet" and the whole line: ${LAYER.mirrorState(o)}`);
});

test('a landing that reads the face again while it stands — its read held — draws the corner\'s row and the clause\'s room, which stand once the read answers, at one column: nothing moves, the row standing until the face is left (the slot\'s face decision, point 1: "Once drawn, the row stands until the face is left"; FP-34)', async () => {
  CAM.setViewport(390, 844);
  void PUMP.readLinksEndingAt(SLOT);
  atFace(SLOT);
  await settle();
  assert.deepEqual(SLOTFACE.faceOf(SLOT)?.items, [], 'zero: no item, no corner row');
  const release = fake.hold('op', { frame: F.linksEndingAt(SLOT) });
  void PUMP.readLinksEndingAt(SLOT); SLOTFACE.landed(SLOT);
  SLOTFACE.frame();
  const reading = rows(SLOT), at = SLOTFACE.cornerAt(SLOT);
  assert.ok(SLOTFACE.faceOf(SLOT)?.items.includes('arriving') && SLOTFACE.faceOf(SLOT)?.corner.querySelector('.fbarrow'), 'reading again: the corner\'s row drawn, the count\'s place hollow');
  release();
  await settle();
  const after = rows(SLOT);
  for (const r of reading) { const a = after.find((x) => x.cls === r.cls); assert.ok(a && Math.abs(a.top - r.top) <= 0.5, `${r.cls} kept its place at the answer`); }
  assert.ok(Math.abs((SLOTFACE.cornerAt(SLOT)?.corner.h ?? 0) - (at?.corner.h ?? NaN)) <= 0.5 && SLOTFACE.faceOf(SLOT)?.corner.querySelector('.fbarrow'), 'the corner\'s row stands, empty, until the face is left');
});
