// O-DELETION's test, on a stand-in of the status region and over the fake
// port: the face's parts whole — C-49, then the audience by the venue, then
// the edition's line where a published document holds the words — and never
// a count of links the page did not read; the face whole at a draft's first
// removal in the page's session and a compact mark at every later one, its
// mark's act opening and folding it and saying what shows, a whole face said
// once; and, driven through W-MACHINE, a removal faced where a burst's
// `delete` takes kept text, none for a character removed inside its own open
// burst, and at an undo only the words a dial carried.
import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import * as DELETION from './deletion.js';
import * as FOCUS from '../nav/focus.js';
import * as PORT from '../bridge/port.js';
import * as FAKE from '../test/fake-port.js';
import * as REC from '../model/records.js';
import * as WRITE from '../write/write.js';
import * as MACHINE from '../write/machine.js';
import { t } from '../strings.js';
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
  assert.deepEqual(DELETION.partsOf({ shared: false, edition: null }), [{ id: 'C-49', text: t('C-49') }, { id: 'B3.deletion.private', text: t('B3.deletion.private') }], 'a private draft');
  assert.deepEqual(DELETION.partsOf({ shared: true, edition: null }).map((p) => p.id), ['C-49', 'C-50', 'B3.C-167'], 'a shared draft: the pinned audience, then the reach');
  assert.deepEqual(DELETION.partsOf({ shared: false, edition: 'Notes 1.0.1.0.2' }).map((p) => [p.id, p.text]).at(-1), ['B3.deletion.edition', t('B3.deletion.edition', { label: 'Notes 1.0.1.0.2' })], 'the edition\'s line last, naming the draft');
  for (const of of [{ shared: false, edition: null }, { shared: true, edition: 'x' }]) assert.equal(DELETION.partsOf(of).some((p) => p.id.startsWith('B3.deletion.links')), false, 'no count of links: the page made no read that answers one');
});

test('the face stands whole at a draft\'s first removal in the page\'s session and is a compact mark at every later one; a mark\'s act opens its face whole, folding the one that stood, and folds it again, saying what then shows; a whole face is said once; and a change of the page\'s class starts the session\'s count again (B3-S4; foundations §3.1; D5 K-59)', () => {
  const face = DELETION.partsOf({ shared: false, edition: null }).map((p) => p.text).join(' ');
  assert.deepEqual(DELETION.standing(D), [], 'none made');
  WRITE.addRemoval(D, { before: at(1), after: at(4), words: 'bc', ids: [{ prefix: `${D}.0.1`, ordinal: 2, width: 2 }] });
  assert.deepEqual([DELETION.standing(D), DELETION.take(D), DELETION.take(D)], [[{ id: 1, whole: true }], face, ''], 'the first removal: its face whole, its words taken to be said once');
  WRITE.addRemoval(D, { before: at(5), after: [], words: 'f', ids: at(6) });
  assert.deepEqual([DELETION.standing(D), DELETION.take(D)], [[{ id: 1, whole: false }, { id: 2, whole: false }], ''], 'the next: a compact mark, the face that stood folded, nothing said of it');
  const n = said.length;
  DELETION.act(D, 2);
  assert.deepEqual([DELETION.standing(D), said.slice(n)], [[{ id: 1, whole: false }, { id: 2, whole: true }], [face]], 'the mark\'s act: its face whole, said');
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
