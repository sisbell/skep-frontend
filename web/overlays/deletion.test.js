// O-DELETION's test, on a stand-in of the status region and over the fake
// port: the face's parts whole — C-49, then the audience by the venue, then
// the edition's line where a published document holds the words, heard by
// S22's table with the draft's name kept as written — and never
// a count of links the page did not read; the face whole at a draft's first
// removal in the page's session and a compact mark at every later one, its
// mark's act opening and folding it and saying what shows, a whole face said
// once; a press on a mark leaving the focus where it stands; and, driven
// through W-MACHINE, a removal faced where a burst's
// `delete` takes kept text, none for a character removed inside its own open
// burst, and at an undo only the words a dial carried; and a paste's face
// raised, said at every paste, replaced and taken down at a change of class;
// and the face's act, "read it as it stood", after its parts where the
// removal keeps the position its `delete` was acked at, and none before it.
import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import * as DELETION from './deletion.js';
import * as FOCUS from '../nav/focus.js';
import * as PORT from '../bridge/port.js';
import * as FAKE from '../test/fake-port.js';
import * as REC from '../model/records.js';
import * as WRITE from '../write/write.js';
import * as MACHINE from '../write/machine.js';
import { t, heard, runsText } from '../strings.js';
import { byteLength } from '../util.js';

const D = '1.0.1.0.2';
const own = (/** @type {string} */ addr, /** @type {number} */ n) => `${addr}.0.1.${n}`;
const at = (/** @type {number} */ n) => [{ prefix: `${D}.0.1`, ordinal: n, width: 1 }];

/** what the status region was told, an emptied region telling nothing */
const said = /** @type {string[]} */ ([]);
let words = '';
FOCUS.attach({ live: /** @type {any} */ ({ setAttribute() {}, set textContent(/** @type {string} */ v) { words = v; if (v) said.push(v); }, get textContent() { return words; } }) });

beforeEach(() => { MACHINE._reset(); REC._reset(); WRITE._reset(); DELETION._reset(); said.length = 0; words = ''; });

test('the face whole is its parts in order: C-49; at a draft the person alone reads, the one clause that keys the audience on the venue; at a shared draft C-50 then the reach; and where a published document holds the words removed, the line naming the edition of the draft — never an orphan line, whose count the page reads nowhere (B3-S4)', () => {
  assert.deepEqual(DELETION.partsOf({ shared: false, edition: null }).map((p) => ({ id: p.id, text: p.text })), [{ id: 'C-49', text: t('C-49') }, { id: 'B3.deletion.private', text: t('B3.deletion.private') }], 'a private draft');
  assert.deepEqual(DELETION.partsOf({ shared: true, edition: null }).map((p) => p.id), ['C-49', 'C-50', 'B3.C-167'], 'a shared draft: the pinned audience, then the reach');
  assert.deepEqual(DELETION.partsOf({ shared: false, edition: 'Notes 1.0.1.0.2' }).map((p) => [p.id, p.text]).at(-1), ['B3.deletion.edition', t('B3.deletion.edition', { label: 'Notes 1.0.1.0.2' })], 'the edition\'s line last, naming the draft');
  for (const of of [{ shared: false, edition: null }, { shared: true, edition: 'x' }]) assert.equal(DELETION.partsOf(of).some((p) => p.id.startsWith('B3.deletion.links')), false, 'no count of links: the page made no read that answers one');
});

test('the face\'s words are spoken as S22\'s table hears them, the draft\'s name in the edition\'s line kept as written: each part\'s words its text, and as stretches the draft\'s name stands in its own face (style S22; issue #626)', () => {
  /** a draft whose first line holds a dash of its own, named as the status region names a box */
  const named = /** @type {import('../strings.js').Run[]} */ ([{ text: '"', face: 'client' }, { text: 'Field notes — draft', face: 'reading' }, { text: '" ', face: 'client' }, { text: D, face: 'ident' }]);
  const parts = DELETION.partsOf({ shared: false, edition: named }), line = parts[parts.length - 1];
  assert.equal(line.text, t('B3.deletion.edition', { label: `"Field notes — draft" ${D}` }), 'drawn as the strings table words it, the name as its label sets it');
  assert.ok(line.runs.some((r) => r.face === 'reading' && r.text === 'Field notes — draft'), 'the name a stretch in the reading face');
  assert.equal(heard(line.runs), `the edition of Field notes — draft ${D} holds these words, taken out, they leave its next version; undo keeps them here; to use them elsewhere, copy rather than cut`,
    'heard: the line\'s own dash a pause, the name\'s dash and words kept, its quotation marks silent');
  assert.equal(heard(parts[0].runs), 'still here, for as long as this board retains it; below the reclaim floor it resolves nowhere here, unless another document still windows it', 'C-49 heard: its dash a pause');
});

test('the face stands whole at a draft\'s first removal in the page\'s session and is a compact mark at every later one; a mark\'s act opens its face whole, folding the one that stood, and folds it again, saying what then shows; a whole face is said once; and a change of the page\'s class starts the session\'s count again (B3-S4; foundations §3.1; D5 K-59)', () => {
  const face = DELETION.partsOf({ shared: false, edition: null }).map((p) => p.text).join(' ');
  assert.deepEqual(DELETION.standing(D), [], 'none made');
  WRITE.addRemoval(D, { before: at(1), after: at(4), words: 'bc', ids: [{ prefix: `${D}.0.1`, ordinal: 2, width: 2 }] });
  assert.deepEqual([DELETION.standing(D), runsText(DELETION.take(D)), DELETION.take(D)], [[{ id: 1, whole: true }], face, []], 'the first removal: its face whole, its words taken to be said once');
  WRITE.addRemoval(D, { before: at(5), after: [], words: 'f', ids: at(6) });
  assert.deepEqual([DELETION.standing(D), DELETION.take(D)], [[{ id: 1, whole: false }, { id: 2, whole: false }], []], 'the next: a compact mark, the face that stood folded, nothing said of it');
  const n = said.length;
  DELETION.act(D, 2);
  assert.deepEqual([DELETION.standing(D), said.slice(n)], [[{ id: 1, whole: false }, { id: 2, whole: true }], [heard(face)]], 'the mark\'s act: its face whole, said as a screen reader hears it');
  assert.ok(!said.at(-1)?.includes('—'), `no dash handed to a screen reader: ${said.at(-1)}`);
  DELETION.act(D, 1);
  assert.deepEqual(DELETION.standing(D), [{ id: 1, whole: true }, { id: 2, whole: false }], 'another mark\'s act: one whole in a draft at a time');
  DELETION.act(D, 1);
  assert.deepEqual([DELETION.standing(D), said.at(-1)], [[{ id: 1, whole: false }, { id: 2, whole: false }], t('B3.removed-here')], 'the act again folds it to its mark, which is named');
  WRITE.dropRemovals(D, () => true);
  WRITE.addRemoval(D, { before: [], after: [], words: 'q', ids: at(9) });
  assert.deepEqual(DELETION.standing(D), [{ id: 3, whole: false }], 'a later removal is never the draft\'s first again');
  // a change of the page's class: the session's count starts again
  REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  REC.sessionDied({ arm: 'closed' });
  DELETION.classChanged();
  WRITE.addRemoval(D, { before: [], after: [], words: 'z', ids: at(9) });
  assert.deepEqual(DELETION.standing(D), [{ id: 1, whole: true }], 'the first removal after it stands whole again');
});

test('a press on a mark leaves the platform\'s focus where it stands — its mousedown\'s default prevented, which would focus the button — and its click is its act; a press on a face\'s words is the platform\'s (D5 K-59; FP-20; issue #674)', () => {
  /** @type {Record<string, (ev: any) => void>} the layer's listeners, as the module attaches them */
  const on = {};
  DELETION.attach(/** @type {any} */ ({ addEventListener: (/** @type {string} */ type, /** @type {(ev: any) => void} */ fn) => { on[type] = fn; } }));
  /** an event of `type` at the mark of D's removal `id`, else at a face's words: whether its default was prevented */
  const press = (/** @type {string} */ type, /** @type {number | null} */ id) => {
    let prevented = false;
    const mark = id == null ? null : { dataset: { doc: D, removal: String(id) } };
    on[type]({ target: { closest: (/** @type {string} */ s) => (s === 'button[data-removal]' ? mark : null) }, preventDefault() { prevented = true; } });
    return prevented;
  };
  WRITE.addRemoval(D, { before: at(1), after: at(3), words: 'b', ids: at(2) });
  assert.deepEqual(DELETION.standing(D), [{ id: 1, whole: true }], 'the draft\'s first removal: its face whole');
  assert.deepEqual([press('mousedown', 1), press('mousedown', null)], [true, false], 'a press on the mark: its default prevented; on a face\'s words: the platform\'s');
  press('click', 1);
  assert.deepEqual([DELETION.standing(D), said.at(-1)], [[{ id: 1, whole: false }], t('B3.removed-here')], 'its click its act: the face folded to its mark, which is named');
});

test('a removal is faced where a burst\'s `delete` takes kept text and not for a character removed inside its own open burst; at an undo it is keyed, at the press, to the words a dial carried and never to words no dial carried; and the mark goes as the words come back (D6 BM-34, BM-51)', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const flush = async () => { for (let i = 0; i < 6; i++) await new Promise((r) => setImmediate(r)); };
  let n = 0;
  const fake = FAKE.create(new Proxy({}, { get: (_t, key) => (String(key).startsWith('op:') ? (JSON.parse(String(key).slice(3)).op === 'insert' ? { result: { addr: own(D, 100 * ++n), at: 19 + n, resp: 'ack_addr' } } : { result: { at: 19 + ++n, resp: 'ack' } }) : String(key).startsWith('held:') ? { result: [] } : undefined) }));
  PORT.boot(fake);
  REC.setBoard({ board: 'b-1', name: '', origin: '' });
  REC.setSession(/** @type {any} */ ({ session: 's-1', principal: 1, account: '1.0.1', writes: true, fingerprint: null }));
  MACHINE.handIn();
  const text = 'abcdef', width = byteLength(text);
  REC.takeSpanSet(D, [{ subspace: 1, ordinal: 1, positions: width }]);
  REC.takeDelivery(D, [{ pos: 1, width, kind: 'content', text, ref: null, origin: null }], 7, { from: 1, runs: [{ iStart: own(D, 1), width }] });
  const key = (/** @type {number} */ pos, /** @type {string} */ ch) => WRITE.addEdit(D, { pos, width: 0, text: ch }, { at: pos });
  const backspace = (/** @type {number} */ pos) => WRITE.addEdit(D, { pos: pos - 1, width: 1, text: '' }, { at: pos });
  // a character typed and backspaced inside one open burst: no `delete`, no face
  key(7, 'x'); backspace(8);
  t.mock.timers.tick(MACHINE.PAUSE_MS);
  await flush();
  assert.deepEqual(DELETION.standing(D), [], 'a character removed inside its own open burst carries no face');
  // Backspace over kept text: the burst's `delete` is what the face is keyed to
  WRITE.endRun(D);
  backspace(7);
  assert.deepEqual(DELETION.standing(D), [], 'not at the key');
  t.mock.timers.tick(MACHINE.PAUSE_MS);
  assert.deepEqual([DELETION.standing(D), WRITE.removalsOf(D).map((r) => r.words)], [[{ id: 1, whole: true }], ['f']], 'at the commit that composes the `delete`, before its answer: the face whole, the draft\'s first');
  await flush();
  // its undo puts the words back: the mark goes
  MACHINE.undo(D);
  assert.deepEqual(DELETION.standing(D), [], 'the words back in the text: no mark stands where nothing is removed');
  t.mock.timers.tick(MACHINE.PAUSE_MS);
  await flush();
  // a run split across an acked burst and the open one, undone: the face is keyed to the acked words alone
  WRITE.endRun(D);
  key(7, 'K'); key(8, 'L');
  t.mock.timers.tick(MACHINE.PAUSE_MS);
  await flush();
  key(9, 'M');
  MACHINE.undo(D);
  assert.deepEqual([WRITE.removalsOf(D).map((r) => r.words), DELETION.standing(D).map((x) => x.whole)], [['KL'], [false]], 'decided at the press: the words a dial carried, never the key no burst took — and compact, the draft\'s first removal being past');
  // a run no burst carried, undone: no face
  WRITE.endRun(D);
  key(1, 'Z');
  MACHINE.undo(D);
  assert.deepEqual(WRITE.removalsOf(D).map((r) => r.words), ['KL'], 'an undo of words no dial carried faces nothing');
});

test('a paste\'s face is raised where the paste was made, its words said in the status region as it is raised — again at a paste that raises the same words, so no press meets silence — standing in the place of any paste\'s face before it, and taken down at a change of the page\'s class (B3-S5; FP-41; the paste survey\'s P6)', async () => {
  assert.equal(DELETION.pasteFace(), null, 'none raised');
  const withheld = { id: 'B3.paste.withheld', text: 'The source of this passage is withheld from you — 1.0.1.0.30; nothing can be placed from it.' };
  DELETION.pasted(D, { before: at(25), after: at(26) }, withheld);
  assert.deepEqual([DELETION.pasteFace(), said], [{ addr: D, ...withheld }, [heard(withheld.text)]], 'raised, and said');
  DELETION.pasted(D, { before: at(25), after: at(26) }, withheld);
  await new Promise((r) => setTimeout(r, 0));
  assert.deepEqual(said, [heard(withheld.text), heard(withheld.text)], 'the same words again at the next paste: said again, the region emptied first');
  const fault = { id: 'L.paste.fault', text: 'A fault in this client — nothing was placed, and your text is unchanged.' };
  DELETION.pasted('1.0.1.0.7', { before: [], after: [] }, fault);
  assert.deepEqual(DELETION.pasteFace(), { addr: '1.0.1.0.7', ...fault }, 'a later paste\'s face in its place');
  DELETION.classChanged();
  assert.equal(DELETION.pasteFace(), null, 'a change of the page\'s class takes it down');
});

test('the face whole carries its act, "read it as it stood", after its parts — a native button in the table\'s words, the removal named on it — where the removal keeps the position its `delete` was acked at; none before that ack, and none on a compact mark; its parts unchanged (B3-S4; C-354; the past states survey P8, U6; D5 K-58)', async () => {
  const r = WRITE.addRemoval(D, { before: at(1), after: at(4), words: 'bc', ids: [{ prefix: `${D}.0.1`, ordinal: 2, width: 2 }] });
  const parts = DELETION.partsOf({ shared: false, edition: null }).map((p) => p.id);
  const unacked = DELETION.markup(D, r, true);
  assert.ok(!unacked.includes('data-read'), `no position yet: no act — ${unacked}`);
  assert.equal(await DELETION.readEarlier(D, r.id), false, 'its press opens nothing where the removal keeps no position');
  WRITE.ackRemovals(D, [{ prefix: `${D}.0.1`, ordinal: 2, width: 2 }], 30);
  const acked = WRITE.removalsOf(D)[0], whole = DELETION.markup(D, acked, true);
  assert.equal(acked.at, 30, 'the position its delete was acked at');
  assert.ok(whole.includes(`<button type="button" class="face-act" data-read="${acked.id}" data-doc="${D}" data-string="B3.deletion.read-earlier" aria-label="${heard(t('B3.deletion.read-earlier'))}">${t('B3.deletion.read-earlier')}</button>`), `the act, in the table's words: ${whole}`);
  assert.deepEqual([...whole.matchAll(/class="part" data-string="([^"]+)"/g)].map((m) => m[1]), parts, 'the face\'s parts unchanged, in order, before it');
  assert.ok(whole.indexOf('data-read') > whole.lastIndexOf('data-string="B3.deletion.private"'), 'after them');
  assert.ok(!DELETION.markup(D, acked, false).includes('data-read'), 'a compact mark carries no act');
});
