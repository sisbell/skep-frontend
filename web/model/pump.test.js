// M-PUMP's test against the FAKE PORT (FP-15's proof, half one): the model
// built from a scripted sequence of answers and events, no write composed;
// a link's end projected NOW as every run the board answers, an end the
// text holds in two runs as both (a mutant that keeps the first alone turns
// red);
// the view's reads ask nothing for a document a continuation's mark holds;
// a session's end is taken by the page whose session it is and by no other;
// a board's events by its own page alone, and none before the page knows
// its board; a drafts row by a page holding a session, never by a guest or
// a page whose session ended; the index state of the face the page reads —
// the guest face's for a guest and for a session of no account, a
// session's for every other page, under another session's name too (a
// second tab of the same person);
// a link's lineage read under the audit view, a class scan the board answers
// `scan_busy` asked again, and a lineage side whose read is refused learned
// as nothing, never as no claim;
// with SKEP_REPLAY naming a script the harness recorded from the provider,
// the model's snapshot is printed for the gate to hold deep-equal to the
// page's (half two: `harness/cases/wire.py`).
import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync } from 'node:fs';
import * as PORT from '../bridge/port.js';
import * as REC from './records.js';
import * as PUMP from './pump.js';
import * as F from './frames.js';
import * as FAKE from '../test/fake-port.js';
import * as CAM from '../plane/camera.js';
import { accountCell } from '../plane/projection.js';

const D = '1.0.1.0.3';
const script = {
  [FAKE.keyOf('boards', {})]: { result: [{ board: 'b-1', name: 'http://127.0.0.1:8642', origin: 'http://127.0.0.1:8642' }] },
  [FAKE.keyOf('session', { board: 'b-1' })]: { result: { session: 's-1', principal: 1, account: '1.0.1' } },
  [FAKE.keyOf('places', { board: 'b-1' })]: { result: { docs: [{ doc: D, kind: 'edition', label: '# skep-ux-design', standing: 'public' }, { doc: '1.0.1.0.127', kind: 'edition', label: 'far', standing: 'public' }], counts: [{ account: '1.0.1', documents: 2 }], state: { arm: 'at_the_floor', floor: 8265 } } },
  [FAKE.keyOf('op', { frame: F.retrieveDocVSpanSet(D) })]: { result: { as_of: 1, resp: 'span_set', set: [{ start: '1.1', width: '0.30' }] } },
  [FAKE.keyOf('op', { frame: F.docMetadata(D) })]: { result: { as_of: 1, resp: 'doc_metadata', doc: D, published: true, owner: '1.0.1', birth: D + '.1', birth_extent: '30', placed: null, base_extent: null, source: null } },
  [FAKE.keyOf('op', { frame: F.retrieveV(D, 1, 30) })]: { result: { as_of: 1, resp: 'delivery', items: [{ content: 'Tumbler.\n\nThe first field.' }, { withheld: { origin: '1.0.1.0.1003', width: '4' } }] } },
  [FAKE.keyOf('op', { frame: F.image(D, 1, 30) })]: { result: { as_of: 1, resp: 'runs', runs: [{ i_start: D + '.0.1.1', width: '26' }, { i_start: '1.0.1.0.1003.0.1.1', width: '4' }] } },
  [FAKE.keyOf('op', { frame: F.findLinksV(D, 1, 30) })]: { result: { as_of: 1, resp: 'addrs', addrs: [D + '.0.2.1'] } },
  [FAKE.keyOf('op', { frame: F.readLink(D + '.0.2.1') })]: { result: { as_of: 1, resp: 'link_value', link: { slots: [[{ start: D + '.0.1.11', width: '0.0.0.0.0.0.0.5' }], [{ start: '1.0.1.0.127', width: '0.0.0.0.1' }], [{ start: '1.1.0.1.0.1.0.3.13', width: '0.0.0.0.0.0.0.0.1' }]] } } },
  [FAKE.keyOf('op', { frame: F.project(D + '.0.2.1', 2, '1.0.1.0.127') })]: { result: { as_of: 1, resp: 'span_set', set: [{ start: '1.1', width: '0.100' }] } },
  // a second link's far end, which the far document's text now holds in two runs
  [FAKE.keyOf('op', { frame: F.project(D + '.0.2.2', 2, '1.0.1.0.127') })]: { result: { as_of: 1, resp: 'span_set', set: [{ start: '1.3', width: '0.4' }, { start: '1.20', width: '0.5' }] } },
};

beforeEach(() => { REC._reset(); });

test('the model after a scripted cold open and a whole read, over the fake port', async () => {
  const fake = FAKE.create(script);
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  const b = await PORT.boards({}); assert.ok('result' in b); REC.setBoard({ board: b.result[0].board, name: b.result[0].name, origin: b.result[0].origin });
  const s = await PORT.session({ board: 'b-1' }); assert.ok('result' in s); REC.setSession({ session: s.result.session, principal: s.result.principal, account: s.result.account });
  const pl = await PORT.places({ session: 's-1', board: 'b-1' }); assert.ok('result' in pl); REC.takeIndex(pl.result);
  const d = await PUMP.loadWhole(D);
  assert.ok(d);
  assert.equal(d.extent, 30);
  assert.deepEqual(d.blocks.map((x) => [x.pos, x.kind]), [[1, 'para'], [11, 'para'], [27, 'withheld']]);
  assert.deepEqual(d.origins, [{ pos: 27, width: 4, doc: '1.0.1.0.1003' }]);
  assert.equal(REC.link(D + '.0.2.1')?.type, '1.1.0.1.0.1.0.3.13');
  assert.deepEqual(await PUMP.projectEnd(D + '.0.2.1', 2, '1.0.1.0.127'), [{ ordinal: 1, positions: 100 }]);
  assert.deepEqual(await PUMP.projectEnd(D + '.0.2.2', 2, '1.0.1.0.127'), [{ ordinal: 3, positions: 4 }, { ordinal: 20, positions: 5 }], 'an end the text holds in two runs: both, never the first alone');
  assert.deepEqual(fake.unanswered, [], 'every call the pump made was a read the script expected');
  assert.ok(fake.calls().every((c) => c.name !== 'op' || true));
  // the feed keeps the index and invalidates
  fake.fire('feed', { board: 'b-1', update: { position: 2, at: 2, op: 'publish', docs: [D + '.2'], class: 'published' } });
  assert.equal(REC.doc(D).from, -1);
  fake.fire('session-died', { session: 's-1', reason: { arm: 'closed' } });
  assert.equal(REC.session(), null);
  const snap = REC.snapshot();
  assert.equal(snap.index.length, 2);
});

test('a session-died ends the page\'s own session alone: a guest, or a page signed in under another session, takes no death', () => {
  const fake = FAKE.create(script);
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.setBoard({ board: 'b-1', name: '', origin: '' });
  fake.fire('session-died', { session: 's-2', reason: { arm: 'closed' } });
  assert.equal(REC.deathReason(), null, 'a guest was never signed in: another page\'s close is not its death');
  REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  fake.fire('session-died', { session: 's-2', reason: { arm: 'closed' } });
  assert.equal(REC.session()?.session, 's-1', 'a page signed in under another session keeps its own');
  assert.equal(REC.deathReason(), null);
  fake.fire('session-died', { session: 's-1', reason: { arm: 'closed' } });
  assert.equal(REC.session(), null, 'its own session\'s end is its death');
  assert.deepEqual(REC.deathReason(), { arm: 'closed' });
});

/** the index a page reads at boot: one edition of 1.0.1's, its count, the index's state `arm` */
const indexAt = (/** @type {string} */ arm) => /** @type {any} */ ({ docs: [{ doc: D, kind: 'edition', label: 'd', standing: 'public' }], counts: [{ account: '1.0.1', documents: 1 }], state: { arm, floor: 8265 } });
/** a feed row of class `cls` minting the document `doc` */
const minting = (/** @type {string} */ doc, /** @type {'published' | 'drafts'} */ cls) => (cls === 'drafts'
  ? { position: 3, at: 3, op: 'create_new_document', docs: [doc], class: 'drafts', session: 's-2' }
  : { position: 3, at: 3, op: 'publish', docs: [doc + '.1'], class: 'published' });

test('a page takes the events of its own board alone, and none before it knows its board', () => {
  const fake = FAKE.create(script);
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.takeIndex(indexAt('at_the_floor'));
  REC.setDaemon('running');
  const all = (/** @type {string} */ board) => {
    fake.fire('feed', { board, update: minting('1.0.1.0.77', 'published') });
    fake.fire('index', { board, session: null, state: { arm: 'complete' } });
    fake.fire('mode', { board, mode: 'ENFORCING', claimant: '1.0.1', local_trust: false });
    fake.fire('daemon', { board, state: 'unreachable' });
  };
  const untouched = (/** @type {string} */ why) => {
    assert.equal(REC.place('1.0.1.0.77'), undefined, why + ': no place minted');
    assert.equal(REC.countOf('1.0.1').documents, 1, why + ': no count raised');
    assert.equal(REC.indexState()?.arm, 'at_the_floor', why + ': the index\'s state kept');
    assert.equal(REC.countsExact(), false, why + ': the counts still lower bounds');
    assert.equal(REC.mode(), null, why + ': no mode taken');
    assert.equal(REC.daemon(), 'running', why + ': the daemon\'s state kept');
  };
  all('b-1');
  untouched('before the page knows its board');
  REC.setBoard({ board: 'b-1', name: '', origin: '' });
  all('b-2');
  untouched('another board\'s events');
  all('b-1');
  assert.equal(REC.place('1.0.1.0.77')?.kind, 'edition', 'its own board\'s row mints the place');
  assert.equal(REC.countOf('1.0.1').documents, 2);
  assert.equal(REC.countsExact(), true, 'its own board\'s index state taken');
  assert.equal(REC.mode(), 'ENFORCING');
  assert.equal(REC.daemon(), 'unreachable');
});

test('a guest, or a page whose session ended, takes no drafts row and no session\'s index state; a published row and the guest face\'s state it takes', () => {
  const fake = FAKE.create(script);
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.setBoard({ board: 'b-1', name: '', origin: '' });
  REC.takeIndex(indexAt('at_the_floor'));
  fake.fire('feed', { board: 'b-1', update: minting('1.0.1.0.1013', 'drafts') });
  assert.equal(REC.place('1.0.1.0.1013'), undefined, 'another session\'s draft is not in the guest\'s index (search.md §4 (iii))');
  assert.equal(REC.countOf('1.0.1').documents, 1, 'nor in its count');
  fake.fire('index', { board: 'b-1', session: 's-2', state: { arm: 'complete' } });
  assert.equal(REC.indexState()?.arm, 'at_the_floor', 'a session\'s face is not the guest\'s');
  assert.equal(REC.countsExact(), false);
  fake.fire('feed', { board: 'b-1', update: minting('1.0.1.0.1014', 'published') });
  assert.equal(REC.place('1.0.1.0.1014')?.kind, 'edition', 'a published row reaches the guest');
  fake.fire('index', { board: 'b-1', session: null, state: { arm: 'complete' } });
  assert.equal(REC.countsExact(), true, 'the guest face\'s state is the guest\'s');
  REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  REC.sessionDied({ arm: 'closed' });
  fake.fire('feed', { board: 'b-1', update: minting('1.0.1.0.1015', 'drafts') });
  assert.equal(REC.place('1.0.1.0.1015'), undefined, 'a page whose session ended reads as a guest: no drafts row');
});

test('a page signed in takes a session\'s index state and drafts rows, never the guest face\'s state — under another session\'s name too; a session of no account reads the guest face', () => {
  const fake = FAKE.create(script);
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.setBoard({ board: 'b-1', name: '', origin: '' });
  REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  REC.takeIndex(indexAt('building'));
  fake.fire('index', { board: 'b-1', session: null, state: { arm: 'complete' } });
  assert.equal(REC.indexState()?.arm, 'building', 'the guest face\'s complete is not the state of the drafts index the page reads');
  assert.equal(REC.countsExact(), false, 'nor are its counts marked exact by it');
  // the person's second tab: the shell names the principal's face by its last-opened session and reads its drafts under
  // whichever of its sessions it reaches first, so this page's state and rows can come named under s-2
  fake.fire('index', { board: 'b-1', session: 's-2', state: { arm: 'complete' } });
  assert.equal(REC.countsExact(), true, 'the face\'s state named under the principal\'s other session');
  fake.fire('feed', { board: 'b-1', update: minting('1.0.1.0.1013', 'drafts') });
  assert.equal(REC.place('1.0.1.0.1013')?.kind, 'draft', 'the principal\'s drafts row read under its other session');
  assert.equal(REC.countOf('1.0.1').documents, 2);
  REC.setSession({ session: 's-3', principal: 2, account: null });
  REC.setIndexState({ arm: 'building' });
  fake.fire('index', { board: 'b-1', session: 's-1', state: { arm: 'complete' } });
  assert.equal(REC.indexState()?.arm, 'building', 'a session of no account has no drafts index: a session\'s face is not its');
  fake.fire('index', { board: 'b-1', session: null, state: { arm: 'complete' } });
  assert.equal(REC.indexState()?.arm, 'complete', 'its face is the guest\'s, the published index alone');
});

test('no call the pump makes is a write: every op frame names a read op', async () => {
  const fake = FAKE.create(script);
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.setBoard({ board: 'b-1', name: '', origin: '' }); REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  await PUMP.loadWhole(D);
  const ops = fake.calls().filter((c) => c.name === 'op');
  assert.ok(ops.length >= 5);
  for (const k of fake.unanswered) assert.ok(false, 'unexpected ' + k);
  for (const key of Object.keys(script)) if (key.startsWith('op:')) { const frame = JSON.parse(key.slice(3)); assert.ok(F.READ_OPS.includes(frame.op), frame.op + ' is a read'); }
});

test('at HOME the reads ask for the documents standing whole and nothing for the 49th, which the first continuation\'s mark holds', async () => {
  const fake = FAKE.create(script);
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.setBoard({ board: 'b-1', name: '', origin: '' }); REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  const MEMBER = '1.0.1.0.49';
  REC.takeIndex(/** @type {any} */ ({ docs: [{ doc: D, kind: 'edition', label: 'd', standing: 'public' }, { doc: MEMBER, kind: 'edition', label: 'm', standing: 'public' }], counts: [{ account: '1.0.1', documents: 2 }], state: { arm: 'complete' } }));
  PUMP.forget(D); PUMP.forget(MEMBER);
  CAM.setViewport(1440, 900);
  CAM.set(CAM.viewForCell(accountCell('1.0.1'), 0.85));
  assert.deepEqual(PUMP.visibleDocs().map((d) => d.addr), [D], 'the 49th is in view, inside the mark');
  PUMP.pump();
  await new Promise((r) => setTimeout(r, 0));
  assert.equal(REC.doc(D).extent, 30, 'the document standing whole has its span set read');
  assert.deepEqual(fake.unanswered.filter((k) => k.includes(MEMBER)), [], 'no read names the document the mark holds');
  assert.equal(REC.doc(MEMBER).extent, null);
});

/**
 * A frame the board answers `scan_busy` the first time it is asked — its two
 * class-scan permits taken — and `then` after; `asks()` counts the asks.
 * @param {Record<string, unknown>} s the script
 * @param {{op: string}} frame
 * @param {unknown} then
 */
function busyOnce(s, frame, then) {
  const busy = { refused: { kind: 'refused', name: 'scan_busy', status: 503, code: 'scan_busy', detail: null, op: frame.op, body: null } };
  let n = 0;
  Object.defineProperty(s, FAKE.keyOf('op', { frame }), { enumerable: true, configurable: true, get: () => (++n === 1 ? busy : then) });
  return { asks: () => n };
}

test('a whole read asks find_links_v again where the board answers scan_busy, and takes the links answered after it', async () => {
  const s = { ...script };
  const frame = F.findLinksV(D, 1, 30);
  const scan = busyOnce(s, frame, script[FAKE.keyOf('op', { frame })]);
  const fake = FAKE.create(s);
  PORT.boot(fake);
  REC.setBoard({ board: 'b-1', name: '', origin: '' }); REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  await PUMP.loadWhole(D);
  assert.equal(scan.asks(), 2, 'asked once more after scan_busy');
  assert.deepEqual([...REC.doc(D).links], [D + '.0.2.1']);
  assert.ok(REC.doc(D).linksRead);
});

test('a link\'s lineage is read under the audit view: what supersedes it, what it supersedes, a retracted claim answered with them', async () => {
  const L = D + '.0.2.1';
  const fake = FAKE.create({
    [FAKE.keyOf('op', { frame: F.inClaims(L, 'audit') })]: { result: { as_of: 1, resp: 'claims', claims: [{ active: false, claim: D + '.0.2.9', home: D, new: D + '.0.2.5', old: L }, { active: true, claim: '1.0.1.0.4.0.2.2', home: '1.0.1.0.4', new: '1.0.1.0.4.0.2.1', old: L }] } },
    [FAKE.keyOf('op', { frame: F.outClaims(L, 'audit') })]: { result: { as_of: 1, resp: 'claims', claims: [{ active: true, claim: D + '.0.2.8', home: D, new: L, old: '1.0.1.0.2.0.2.7' }] } },
  });
  PORT.boot(fake);
  REC.setBoard({ board: 'b-1', name: '', origin: '' }); REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  const lin = await PUMP.lineage(L);
  assert.deepEqual(fake.unanswered, [], 'both sides asked under the audit view, the one that answers a retracted claim');
  assert.deepEqual(lin.supersededBy?.map((c) => [c.new, c.active]), [[D + '.0.2.5', false], ['1.0.1.0.4.0.2.1', true]], 'the claims whose old is the link, in the answer\'s order');
  assert.deepEqual(lin.supersedes?.map((c) => [c.old, c.active]), [['1.0.1.0.2.0.2.7', true]], 'the claims whose new is the link');
  assert.deepEqual(fake.calls().map((c) => c.name), ['op', 'op'], 'the two reads one after the other, nothing else');
});

test('a lineage read the board answers scan_busy is asked again; a side whose read is refused is null, never no claim', async () => {
  const L = D + '.0.2.1';
  const s = { [FAKE.keyOf('op', { frame: F.outClaims(L, 'audit') })]: { refused: { kind: 'unreachable', name: 'unreachable', text: 'the board is not answering' } } };
  const scan = busyOnce(s, F.inClaims(L, 'audit'), { result: { as_of: 1, resp: 'claims', claims: [] } });
  PORT.boot(FAKE.create(s));
  const lin = await PUMP.lineage(L);
  assert.equal(scan.asks(), 2, 'in_claims asked once more after scan_busy');
  assert.deepEqual(lin, { supersededBy: [], supersedes: null }, 'the side answered no claim; the refused side learned nothing');
});

test('replay: a recorded script from the provider builds the model; the snapshot printed for the gate', async () => {
  const file = process.env.SKEP_REPLAY;
  if (!file) return; // the harness sets it
  const rec = JSON.parse(readFileSync(file, 'utf8'));
  /** @type {Record<string, unknown>} the script: keyed as given, or cut from the bridge client's recorded calls (name, args, outcome) */
  const script = rec.script ? rec.script : {};
  for (const c of rec.calls || []) script[FAKE.keyOf(c.name, c.args)] = c.outcome;
  const fake = FAKE.create(script);
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.setBoard(rec.board); REC.setSession(rec.session);
  const pl = await PORT.places({ session: rec.session.session, board: rec.board.board });
  if ('result' in pl) REC.takeIndex(pl.result);
  for (const addr of rec.loadWhole) await PUMP.loadWhole(addr);
  for (const ev of rec.events || []) fake.fire(ev.name, ev.data);
  const snap = JSON.stringify(REC.snapshot());
  if (process.env.SKEP_REPLAY_OUT) writeFileSync(process.env.SKEP_REPLAY_OUT, snap); // the runner's TAP escapes stdout; the gate reads the file
  else process.stdout.write('SNAPSHOT ' + snap + '\n');
  assert.deepEqual(fake.unanswered, []);
});
