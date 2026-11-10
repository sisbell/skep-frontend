// M-PUMP's test against the fake port (FP-15): the model built from scripted
// answers and events with no write composed — a board's events taken where
// they name the page's board, a drafts row or a session's index state where
// it names the page's own session; the view's reads and probes —
// each box read as it is drawn, far ends projected into the version the far
// box shows, the edition claims and the byline's facts read once, a chain's
// members' ages kept as its probe reads them — and what
// a read the board did not answer, a drop that overtook a read, a size
// refusal or a `scan_busy` does to each, and when the pause such a read
// waits out ends; the acquire, a session's end and the
// page's own death — what it kept read again and set in one step, every other
// draft it could read covered at once where the change ends the session and
// else left waiting, read at once where the view stood on it and else as the
// view comes nearer than far, never at far, that read covering, confirming or
// lifting it, a refresh keeping each such box — every read asked again at the
// page's class; a session got back with no re-open reading first the drafts
// rows its end cut off — from the page's own drafts place, which stands
// below the head and is never the regained session's opening, raising that
// place alone — then catching up — what was written while it was out read
// by `changes` from the feed's place and taken with the rows held meanwhile,
// once and in position order, a row the drafts read took never again,
// before any read waiting on it goes out, its face taken, and the board
// marked where no catch-up can be done; a listing,
// the health and the daemon laid under the events that overtook them; the
// board opened in the boot's order and read again at "try again"; a publish
// row's member handed to the app at the row's position before anything is
// dropped, and a refresh's at none; the one
// refresh a run of bare rows earns, each chain it counts — an edition held at
// its bare address, or one a trail entry the reader has left read there —
// counted once and told to the trail before any arrival, each entry
// re-taking the member its own text was, a shown document whose reads there
// the board answers in part read again as a row naming it is, and a change of
// class ending its reads where they stand; a row naming a document the view
// shows, which keeps it as held until its reads again set it in one step,
// rows meanwhile queueing one more read, kept from the row's arrival — each
// setting recorded changed or unchanged with the stamp it stood from, none
// where it is let go unset, the board's by whether its catch-up took a row; a row
// touching a doc 1, which keeps the byline cause of each shown document's
// owner as held until a read of it again lands, the board's silence leaving
// it standing, a byline read it overtook answering that it took nothing;
// owner facts taken that say other than those held — by a byline read, or a
// shown document's read again — told once as a drop naming the documents the
// owner holds, and none where they say the same; the event stream's drop, which holds every row until its
// reopen's catch-up reads `changes` from the last position the page took —
// after any acquire's, from where that reached, and marking the board where
// none can be done — the board lagging past a second from the drop or a run's
// first bare row until the catch-up's rows are taken or its refresh has run,
// and a document the gap's rows name kept from the drop; and the edition claims a row
// changes — read from its link and from the edition-class links homed in the
// documents it names — kept as held where a document the view shows windows
// their origin until their read again sets them in one step, the homes their
// clause reads kept with them, else dropped, the documents windowing the
// origin told either way, and every other row leaving them held; a text past
// one delivery's items read in parts — a whole read, an open find's read of
// the rest, and a row's read again of the window held, the find's text kept as
// the view's — a part refused for its size asked as its halves; each part of
// the view's window and a whole read's text read with its image and taken
// with it in one step, a part whose image read fails taken alone and its
// image asked again on its own, and a text a whole read finds held with no
// image covering it read for its image. With SKEP_REPLAY naming a script the
// harness recorded, the model's snapshot is printed for the gate.
import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync } from 'node:fs';
import * as PORT from '../bridge/port.js';
import * as REC from './records.js';
import * as PUMP from './pump.js';
import * as F from './frames.js';
import * as FAKE from '../test/fake-port.js';
import * as CAM from '../plane/camera.js';
import * as TRAIL from '../nav/trail.js';
import { accountCell, docBox, DOC_W } from '../plane/projection.js';
import { lodOf, LOD_FAR_LO } from '../plane/lod.js';
import { estimate, estimatedSpan, MEASURE_CPL } from '../plane/layout.js';
import { documentOf, memberOf, unitSpan, versionAddress } from './address.js';
import { clauseOf } from '../text/layer.js';
import { t } from '../strings.js';
import { createHash } from 'node:crypto';

const D = '1.0.1.0.3';
const script = {
  [FAKE.keyOf('boards', {})]: { result: [{ board: 'b-1', name: 'http://127.0.0.1:8642', origin: 'http://127.0.0.1:8642' }] },
  [FAKE.keyOf('session', { board: 'b-1' })]: { result: { session: 's-1', principal: 1, account: '1.0.1', writes: true } },
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
  // the edition claims on the withheld run's origin: none
  [FAKE.keyOf('op', { frame: F.editionClaimsAt('1.0.1.0.1003') })]: { result: { as_of: 1, resp: 'addrs', addrs: [] } },
};

/** the byline's facts of 1.0.1, the owner of the documents the tests read, held from the start: the reads a test holds the view to are its documents' own — the byline's reads are held by the tests that make them (`readAccount`) */
const OWN_FACTS = { label: 'dev-notebook', fingerprint: 'e4272902a11439e5' };

beforeEach(() => { REC._reset(); CAM._reset(); REC.takeAccountKey('1.0.1', OWN_FACTS); });

/** the board answering that no edition-class link is homed in each of these documents: what a row naming them is read for, its claims' changes (M-PUMP's search) */
const noEditionLinks = (/** @type {string[]} */ ...homes) => Object.fromEntries(homes.map((h) => [FAKE.keyOf('op', { frame: F.editionLinksIn(h) }), { result: { as_of: 1, resp: 'addrs', addrs: [] } }]));

test('the model after a scripted cold open and a whole read, over the fake port', async () => {
  const fake = FAKE.create(script);
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  const b = await PORT.boards({}); assert.ok('result' in b); REC.setBoard({ board: b.result[0].board, name: b.result[0].name, origin: b.result[0].origin });
  const s = await PORT.session({ board: 'b-1' }); assert.ok('result' in s); REC.setSession(s.result);
  const pl = await PORT.places({ session: 's-1', board: 'b-1' }); assert.ok('result' in pl); REC.takeIndex(pl.result);
  const d = await PUMP.loadWhole(D);
  assert.ok(d);
  assert.equal(d.extent, 30);
  assert.deepEqual(d.blocks.map((x) => [x.pos, x.kind]), [[1, 'para'], [11, 'para'], [27, 'withheld']]);
  assert.deepEqual(d.origins, [{ pos: 27, width: 4, doc: '1.0.1.0.1003' }]);
  assert.equal(REC.link(D + '.0.2.1')?.type, '1.1.0.1.0.1.0.3.13');
  assert.deepEqual(await PUMP.projectEnd(D + '.0.2.1', 2, '1.0.1.0.127'), { runs: [{ pos: 1, width: 100 }] });
  assert.deepEqual(await PUMP.projectEnd(D + '.0.2.2', 2, '1.0.1.0.127'), { runs: [{ pos: 3, width: 4 }, { pos: 20, width: 5 }] }, 'an end the text holds in two runs: both, never the first alone');
  assert.deepEqual(REC.projection(D + '.0.2.2', 2, '1.0.1.0.127'), [{ pos: 3, width: 4 }, { pos: 20, width: 5 }], 'held in the model, the view reading it as its own');
  assert.deepEqual(fake.unanswered, [], 'every call the pump made was a read the script expected');
  assert.ok(fake.calls().every((c) => c.name !== 'op' || true));
  // the feed keeps the index and invalidates
  fake.fire('feed', { board: 'b-1', update: { position: 2, at: 2, op: 'publish', docs: [D + '.2'], class: 'published' } });
  assert.equal(REC.doc(D).from, -1);
  fake.fire('session-died', { session: 's-1', reason: { arm: 'closed' } });
  assert.equal(REC.session(), null);
  assert.deepEqual([REC.snapshot().index.map((p) => p[0]), REC.indexState()], [[D, '1.0.1.0.127'], null], 'the death keeps the editions the session\'s index listed, read as published, its state gone');
  await new Promise((r) => setTimeout(r, 0));
  assert.deepEqual([REC.snapshot().index.length, REC.indexState()?.arm], [2, 'at_the_floor'], 'the listing read again in the guest form names the board\'s two editions, its state the guest\'s');
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

/**
 * The camera over a document's first column at its reading em, by P-LAY's
 * estimate of its extent — the size the view's reads are made at, never
 * smaller than the one its text is set at.
 * @param {string} addr
 * @param {number} extent
 */
function readAt(addr, extent) {
  const box = docBox(addr), e = estimate(extent, box), c = e.columns[0];
  CAM.setViewport(1440, 900); CAM.reach(e.fs); CAM.set(CAM.viewAt({ x: box.x + c.x + c.w / 2, y: box.y + c.y + c.h / 2 }, e.fs));
}
/** the index a page reads at boot: one edition of 1.0.1's, its count, the index's state `arm` */
const indexAt = (/** @type {string} */ arm) => /** @type {any} */ ({ docs: [{ doc: D, kind: 'edition', label: 'd', standing: 'public' }], counts: [{ account: '1.0.1', documents: 1 }], state: { arm, floor: 8265 } });
/** a feed row of class `cls` minting the document `doc`: a `drafts` row names the session it is sent to, `s-1` unless `session` names another */
const minting = (/** @type {string} */ doc, /** @type {'published' | 'drafts'} */ cls, session = 's-1') => (cls === 'drafts'
  ? { position: 3, at: 3, op: 'create_new_document', docs: [doc], class: 'drafts', session }
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
  assert.equal(REC.place('1.0.1.0.1015'), undefined, 'a page whose session ended reads as a guest: no drafts row, the ended session\'s own among them');
});

test('a page signed in takes the drafts rows and the index state its own session\'s events name — never another principal\'s, nor its own principal\'s as another tab\'s session hears them, nor a row naming no session, nor the guest face\'s state — and a listing out lays none of another session\'s over its answer; a session of no account reads the guest face (issue #145)', async () => {
  const fake = FAKE.create({ [FAKE.keyOf('places', { board: 'b-1' })]: { result: indexAt('building') } });
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.setBoard({ board: 'b-1', name: '', origin: '' });
  REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  REC.takeIndex(indexAt('building'));
  fake.fire('feed', { board: 'b-1', update: minting('1.0.2.0.1013', 'drafts', 's-2') });
  fake.fire('feed', { board: 'b-1', update: minting('1.0.1.0.1014', 'drafts', 's-3') });
  fake.fire('feed', { board: 'b-1', update: { position: 3, at: 3, op: 'create_new_document', docs: ['1.0.1.0.1015'], class: 'drafts' } });
  assert.deepEqual(['1.0.2.0.1013', '1.0.1.0.1014', '1.0.1.0.1015'].map((a) => REC.place(a)), [undefined, undefined, undefined], 'another principal\'s draft, the principal\'s own as its other tab\'s session hears it, and a row naming no session: none listed');
  assert.deepEqual([REC.countOf('1.0.2').documents, REC.countOf('1.0.1').documents], [0, 1], 'nor counted');
  fake.fire('index', { board: 'b-1', session: 's-2', state: { arm: 'widening' } });
  fake.fire('index', { board: 'b-1', session: null, state: { arm: 'complete' } });
  assert.deepEqual([REC.indexState()?.arm, REC.countsExact()], ['building', false], 'neither another session\'s state nor the guest face\'s');
  fake.fire('feed', { board: 'b-1', update: minting('1.0.1.0.1014', 'drafts') });
  fake.fire('index', { board: 'b-1', session: 's-1', state: { arm: 'complete' } });
  assert.deepEqual([REC.place('1.0.1.0.1014')?.kind, REC.countOf('1.0.1').documents, REC.countsExact()], ['draft', 2, true], 'its own session\'s row listed and counted, its own session\'s state taken');
  const release = fake.hold('places', { board: 'b-1' });
  const listing = PUMP.readIndex();
  await new Promise((r) => setTimeout(r, 0));
  fake.fire('feed', { board: 'b-1', update: minting('1.0.2.0.1016', 'drafts', 's-2') });
  fake.fire('index', { board: 'b-1', session: 's-2', state: { arm: 'complete' } });
  release();
  await listing;
  assert.deepEqual([REC.place('1.0.2.0.1016'), REC.indexState()?.arm], [undefined, 'building'], 'the listing\'s answer whole: no other session\'s row laid over it, and its own state, never another session\'s');
  REC.setSession({ session: 's-4', principal: 2, account: null });
  fake.fire('index', { board: 'b-1', session: 's-4', state: { arm: 'complete' } });
  assert.equal(REC.indexState()?.arm, 'building', 'a session of no account has no drafts index: a session\'s face is not its, under its own name too');
  fake.fire('index', { board: 'b-1', session: null, state: { arm: 'complete' } });
  assert.equal(REC.indexState()?.arm, 'complete', 'its face is the guest\'s, the published index alone');
});

/** the shell's own restart, the session re-opened under a key the shell holds: the reason names the re-opened reference (skep-shell's `Sessions::end`) */
const REOPENED = { arm: 'restart', reopened: true, session: 's-9' };

/**
 * A frame the board answers with each of `outcomes` in turn, the last again
 * at every ask after — keyed on the frame alone, so an ask under another
 * session is the same call; `asks()` counts the asks.
 * @param {Record<string, unknown>} s the script
 * @param {{op: string}} frame
 * @param {...unknown} outcomes
 */
function inTurn(s, frame, ...outcomes) {
  let n = 0;
  Object.defineProperty(s, FAKE.keyOf('op', { frame }), { enumerable: true, configurable: true, get: () => outcomes[Math.min(n++, outcomes.length - 1)] });
  return { asks: () => n };
}

/**
 * A frame the board answers `first` the first time it is asked and `then`
 * after (`inTurn`).
 * @param {Record<string, unknown>} s the script
 * @param {{op: string}} frame
 * @param {unknown} first
 * @param {unknown} then
 */
function firstThen(s, frame, first, then) { return inTurn(s, frame, first, then); }

/**
 * The session each call of one name — `op` unless named — went out under,
 * in order, as the fake port received it ('guest' for the guest form).
 * @param {ReturnType<typeof FAKE.create>} fake
 * @param {string} [named]
 * @returns {string[]}
 */
function sessionsSent(fake, named = 'op') {
  /** @type {string[]} */
  const sent = [];
  const call = fake.call;
  fake.call = (name, args) => { if (name === named) sent.push(/** @type {{session?: string}} */ (args).session ?? 'guest'); return call(name, args); };
  return sent;
}

/** a restart the shell re-opened no session at: the reason names none (skep-shell's `derive_death`) */
const UNOPENED = { arm: 'restart', reopened: false };
/** the board's `session(board)` answering a session under the reference `ref` — principal 1's, account 1.0.1's, unless `other` names others */
const opened = (/** @type {string} */ ref, other = {}) => ({ [FAKE.keyOf('session', { board: 'b-1' })]: { result: { session: ref, principal: 1, account: '1.0.1', writes: true, ...other } } });
/** the board's `session(board)` refused, `no_key`'s keyless cell */
const NO_KEY = { [FAKE.keyOf('session', { board: 'b-1' })]: { refused: { kind: 'shell', name: 'no_key' } } };
/** how many times the page called `session(board)`, as the fake port received each call — a held one at once */
const opens = (/** @type {ReturnType<typeof FAKE.create>} */ fake) => fake.asked.filter((k) => k.startsWith('session:')).length;
/** every answer the fake port gives and every step a promise makes taken, a timer's apart */
const flush = () => new Promise((r) => setTimeout(r, 0));
/** the board's head as the boot's `/health` read answers it: the page's place on its feed */
const readHead = (/** @type {number} */ at) => REC.setHealth({ log_position: at }, null);
/** the board's `changes(session, since)` answering one page: the rows `entries` at the session's class, read through `next`, the board's head `head`; with `cls`, the drafts form (D6) */
const caughtUp = (/** @type {string} */ session, /** @type {number} */ since, /** @type {object[]} */ entries = [], next = since, head = next, /** @type {'drafts' | undefined} */ cls = undefined) => ({ [FAKE.keyOf('changes', cls ? { session, since, class: cls } : { session, since })]: { result: { entries, next, head } } });
/** the board's guest `changes({guest, board, since})` answering one page: the published rows alone (D6, #749) */
const caughtUpGuest = (/** @type {string} */ board, /** @type {number} */ since, /** @type {object[]} */ entries = [], next = since, head = next) => ({ [FAKE.keyOf('changes', { guest: true, board, since })]: { result: { entries, next, head } } });
/** the `changes` calls the fake port was asked, each by its members — its session and position, a `class` or the guest form among them */
const catchUps = (/** @type {ReturnType<typeof FAKE.create>} */ fake) => fake.asked.filter((k) => k.startsWith('changes:')).map((k) => JSON.parse(k.slice('changes:'.length)));

test('the boot\'s session is opened by the acquire: one call, the session taken, or the refusal kept with nothing said of a restart (S-37 (a); issue #175)', async () => {
  /** @type {Array<[Record<string, unknown>, string | null, {kind: string, name: string} | null]>} each answer, the session it leaves the page, the refusal it keeps */
  const answers = [[opened('s-1'), 's-1', null], [NO_KEY, null, { kind: 'shell', name: 'no_key' }]];
  for (const [answer, session, refusal] of answers) {
    REC._reset();
    const fake = FAKE.create(answer);
    PORT.boot(fake);
    PUMP.start({ onDirty: () => {} });
    REC.setBoard({ board: 'b-1', name: '', origin: '' });
    await PUMP.acquireSession();
    assert.deepEqual([opens(fake), REC.session()?.session ?? null, REC.sessionRefused(), REC.reconnect(), REC.deathReason()], [1, session, refusal, null, null], session ? 'opened' : 'refused');
  }
});

test('a restart the shell re-opened is no death: the page goes on under the re-opened session, its reads and drafts rows with it, holding what it read; one that re-opened none is no death either — the boot\'s own call is made again, once, and the page goes on under the session it opens, reading no index and saying nothing, and takes what was written while it was out: `changes` from the last position it took, before any read waiting on the session goes out, each row as the feed hands one — a draft minted listed, a draft written dropped, a row the shell sent only another tab\'s session taken from the catch-up (issues #175, #326)', async () => {
  const DR = '1.0.1.0.1013', NEW = '1.0.1.0.1014';
  // what was written while the session was out: a draft minted at 4 — which the shell sends another tab's session, s-3, meanwhile — and the draft DR written at 5
  const minted = { ...minting(NEW, 'drafts', 's-10'), position: 4, at: 4 }, written = { position: 5, at: 5, op: 'insert', docs: [DR], class: 'drafts', session: 's-10' };
  // the drafts the end cut off are read FIRST from `draftsAt` (the drafts row at 3 set it), then the catch-up from `feedAt` reads them again and they are not re-taken (D6)
  const fake = FAKE.create({ ...script, ...opened('s-10'), ...caughtUp('s-10', 3, [minted, written], 5, 5, 'drafts'), ...caughtUp('s-10', 3, [minted, written], 5) });
  PORT.boot(fake);
  let drops = 0;
  PUMP.start({ onDirty: () => {}, onDrop: (d) => { if (!d.row) drops++; } });
  REC.setBoard({ board: 'b-1', name: '', origin: '' });
  REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  REC.takeIndex(indexAt('building'));
  REC.takeDelivery(D, [{ pos: 1, width: 8, kind: 'content', text: 'Tumbler.', ref: null, origin: null }]);
  const sent = sessionsSent(fake), listings = sessionsSent(fake, 'places');
  fake.fire('session-died', { session: 's-1', reason: REOPENED });
  assert.deepEqual(REC.session(), { session: 's-9', principal: 1, account: '1.0.1' }, 'the re-opened reference, the principal and the account the same');
  assert.equal(REC.deathReason(), null, 'no death, so no death chrome (client.md §4b.2)');
  assert.deepEqual([listings, REC.place(D)?.kind, REC.textBetween(D, 1, 9), opens(fake)], [[], 'edition', 'Tumbler.', 0], 'it reads no index, holds what it read under the session and asks for no session');
  await PUMP.read(F.docMetadata(D));
  assert.deepEqual(sent, ['s-9'], 'the next read goes out under the re-opened session');
  fake.fire('feed', { board: 'b-1', update: minting(DR, 'drafts', 's-9') });
  assert.deepEqual([REC.place(DR)?.kind, REC.feedAt()], ['draft', 3], 'its drafts rows still taken, named by the re-opened session: the page\'s place on the feed at the row');
  REC.takeDelivery(DR, [{ pos: 1, width: 5, kind: 'content', text: 'draft', ref: null, origin: null }]);
  const from = fake.asked.length;
  fake.fire('session-died', { session: 's-9', reason: UNOPENED });
  const waiting = PUMP.read(F.docMetadata(D));
  fake.fire('feed', { board: 'b-1', update: { ...minted, session: 's-3' } });
  await waiting;
  assert.deepEqual(REC.session(), { session: 's-10', principal: 1, account: '1.0.1', writes: true }, 'a restart that re-opened none: the session the boot\'s own call opens again');
  assert.deepEqual([opens(fake), REC.deathReason(), REC.reconnect(), drops, listings], [1, null, null, 0, []], 'one call; no death, nothing to say, no change of class and no index read');
  assert.deepEqual([fake.asked.slice(from).map((k) => k.slice(0, k.indexOf(':'))), catchUps(fake)], [['session', 'changes', 'changes', 'op'], [{ class: 'drafts', session: 's-10', since: 3 }, { session: 's-10', since: 3 }]], 'the drafts read from `draftsAt` with class drafts, then the catch-up from `feedAt`, both under the session got back and before the read waiting on the session went out');
  assert.deepEqual(REC.feedRows().map((r) => r.position), [3, 4, 5], 'each row once: the two the drafts read took are not taken again from the catch-up, which reads them too');
  assert.deepEqual([REC.place(NEW)?.kind, REC.textBetween(DR, 1, 6), REC.place(DR)?.kind, REC.textBetween(D, 1, 9), REC.feedAt()], ['draft', '', 'draft', 'Tumbler.', 5], 'the draft the end cut off read by the drafts read and listed, the one written there dropped of its text, what no row named standing, the page\'s place on the feed past the gap');
  assert.deepEqual(sent, ['s-9', 's-10'], 'the read waiting went out under the session got back');
});

test('a regain with no re-open reads the drafts from the page\'s own drafts place — below the head, never from `feedAt` nor from the regained session\'s `opened_at` — with class drafts BEFORE the catch-up from `feedAt`, lists each draft the end cut off, raises `draftsAt` but not `feedAt`, and masks no published row in the drafts read\'s window (issues #392, #394; D6)', async () => {
  const CUT = '1.0.1.0.1012', NEW = '1.0.1.0.1013', A = '1.0.1.0.21';
  /** a drafts row minting `doc` at `position`, sent under s-2 */
  const draftAt = (/** @type {string} */ doc, /** @type {number} */ position) => ({ position, at: position, op: 'create_new_document', docs: [doc], class: 'drafts', session: 's-2' });
  // the drafts place stands at 8, below the head at 10, and the regained session opened at 13: the drafts read goes from 8 — the draft minted at 9 among its rows, which a read from the head or from the new opened_at never sees — and reaches 14; the catch-up from feedAt reads an earlier snapshot to 12, so its `caught` is (10,12] and a live row at 13 lies in the drafts read's window above it
  const fake = FAKE.create({ ...script, ...opened('s-2', { opened_at: 13 }),
    ...caughtUp('s-2', 8, [draftAt(CUT, 9), draftAt(NEW, 14)], 14, 14, 'drafts'),
    ...caughtUp('s-2', 10, [rowOf(11, [A]), rowOf(12, [A])], 12) });
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.setBoard({ board: 'b-1', name: '', origin: '' }); REC.setSession({ session: 's-1', principal: 1, account: '1.0.1', writes: true, opened_at: 8 });
  readHead(10);
  assert.deepEqual([REC.draftsAt(), REC.feedAt()], [8, 10], 'the drafts place below the head');
  const release = fake.hold('changes', { session: 's-2', since: 8, class: 'drafts' });
  fake.fire('session-died', { session: 's-1', reason: UNOPENED });
  await until(() => catchUps(fake).some((c) => c.class === 'drafts'), 'the drafts read asked');
  assert.deepEqual([catchUps(fake), REC.draftsAt(), REC.place(CUT), REC.place(NEW)], [[{ class: 'drafts', session: 's-2', since: 8 }], 8, undefined, undefined], 'the drafts read asked first from the place the page kept — never the head, never the regained session\'s opened_at — and held: nothing of the catch-up asked yet, no draft taken');
  release();
  await settle();
  assert.deepEqual([REC.place(CUT)?.kind, REC.place(NEW)?.kind, REC.draftsAt(), REC.feedAt()], ['draft', 'draft', 14, 12], 'the drafts the end cut off listed, the one minted below the head among them; draftsAt raised to the last, feedAt left at the catch-up\'s reach — the drafts read never raises feedAt');
  fake.fire('feed', { board: 'b-1', update: rowOf(13, [A]) });
  assert.deepEqual([REC.feedAt(), REC.feedRows().some((r) => r.position === 13)], [13, true], 'a published row in the drafts read\'s window (8,14] above the catch-up\'s caught (10,12] is taken, never masked by the drafts read');
  assert.deepEqual([catchUps(fake), fake.unanswered], [[{ class: 'drafts', session: 's-2', since: 8 }, { session: 's-2', since: 10 }], []], 'the drafts read with class drafts from draftsAt, then the catch-up from feedAt, every read the script expected');
});

test('a regain with a re-open makes no drafts read — the re-opened session keeps the principal\'s place and `draftsAt` stands as it was (issue #392, D6)', async () => {
  const fake = FAKE.create({ ...script });
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.setBoard({ board: 'b-1', name: '', origin: '' });
  REC.setSession({ session: 's-1', principal: 1, account: '1.0.1', writes: true, opened_at: 8 });
  readHead(10);
  assert.equal(REC.draftsAt(), 8, 'started from the session\'s opened_at');
  fake.fire('session-died', { session: 's-1', reason: REOPENED });
  await flush();
  assert.deepEqual([REC.session()?.session, catchUps(fake), REC.draftsAt(), REC.deathReason()], ['s-9', [], 8, null], 'the re-opened reference, no catch-up of any kind — drafts or feed — draftsAt standing, no death');
});

test('a regain\'s drafts read refused does not block the catch-up: the board is marked as the published catch-up\'s own refusal marks it, and the catch-up from feedAt still runs and takes its rows (issue #392, D6)', async () => {
  const A = '1.0.1.0.21';
  const fake = FAKE.create({ ...script, ...opened('s-2', { opened_at: 10 }),
    [FAKE.keyOf('changes', { session: 's-2', since: 10, class: 'drafts' })]: RECLAIMED,
    ...caughtUp('s-2', 10, [rowOf(11, [A])], 11) });
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.setBoard({ board: 'b-1', name: '', origin: '' }); REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  readHead(10);
  fake.fire('session-died', { session: 's-1', reason: UNOPENED });
  await settle();
  assert.deepEqual([REC.session()?.session, catchUps(fake)], ['s-2', [{ class: 'drafts', session: 's-2', since: 10 }, { session: 's-2', since: 10 }]], 'the drafts read refused, the catch-up from feedAt still asked after it');
  assert.deepEqual([REC.feedRows().map((r) => r.position), REC.feedAt(), REC.bare()], [[11], 11, true], 'the catch-up\'s row taken, the board marked by the drafts read\'s refusal as the catch-up\'s own would mark it');
  assert.deepEqual(fake.unanswered, []);
});

test('a call refused `session_died` is taken as the event\'s end by its reason: the restart arm with `reopened: true` and `session` goes on under that reference, the arm with `reopened: false` — a reference of an earlier shell run — asks for a session again, neither a death (issue #392 step 4; #571, #625/#532)', async () => {
  // (a) reopened: true — on under reason.session, no session asked, no death
  let frame = F.docMetadata(D);
  let s = { ...script };
  firstThen(s, frame, { refused: { kind: 'shell', name: 'session_died', session: 's-1', reason: { arm: 'restart', reopened: true, session: 's-9' } } }, script[FAKE.keyOf('op', { frame })]);
  let fake = FAKE.create(s);
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.setBoard({ board: 'b-1', name: '', origin: '' }); REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  let sent = sessionsSent(fake);
  let out = await PUMP.read(frame);
  assert.ok('answer' in out, 'the answer, never the refusal');
  assert.deepEqual([sent, opens(fake), REC.session()?.session, REC.deathReason()], [['s-1', 's-9'], 0, 's-9', null], 'reopened true: on under reason.session, no session asked for, no death');
  // (b) reopened: false — a reference of an earlier shell run, a session asked for again as session_ended\'s lose does
  REC._reset();
  s = { ...script, ...opened('s-2'), ...caughtUp('s-2', 3) };
  firstThen(s, frame, { refused: { kind: 'shell', name: 'session_died', session: 's-7', reason: { arm: 'restart', reopened: false } } }, script[FAKE.keyOf('op', { frame })]);
  fake = FAKE.create(s);
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.setBoard({ board: 'b-1', name: '', origin: '' }); REC.setSession({ session: 's-7', principal: 1, account: '1.0.1' });
  readHead(3);
  sent = sessionsSent(fake);
  out = await PUMP.read(frame);
  assert.ok('answer' in out, 'the answer, never the refusal');
  assert.deepEqual([sent, opens(fake), REC.session()?.session, REC.deathReason()], [['s-7', 's-2'], 1, 's-2', null], 'reopened false: a session asked for again, on under it, no death');
});

test('a restart that re-opened none whose call again is refused: what the session read is dropped and the index read again in the guest form — no death recorded, for the shell named none, the refusal kept as boot keeps it with the account the page could not reconnect as; no second call (issue #175)', async () => {
  const fake = FAKE.create({ ...script, ...NO_KEY });
  PORT.boot(fake);
  let drops = 0;
  PUMP.start({ onDirty: () => {}, onDrop: (d) => { if (!d.row) drops++; } });
  REC.setBoard({ board: 'b-1', name: '', origin: '' });
  REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  REC.takeIndex(indexAt('building'));
  REC.takeDelivery(D, [{ pos: 1, width: 8, kind: 'content', text: 'Tumbler.', ref: null, origin: null }]);
  fake.fire('feed', { board: 'b-1', update: minting('1.0.1.0.1013', 'drafts') });
  const listings = sessionsSent(fake, 'places');
  fake.fire('session-died', { session: 's-1', reason: { ...UNOPENED, refused: 'no_key' } });
  await flush();
  assert.deepEqual([REC.session(), REC.deathReason()], [null, null], 'a guest, and no death recorded');
  assert.deepEqual([REC.sessionRefused(), REC.reconnect()], [{ kind: 'shell', name: 'no_key' }, { as: '1.0.1', refused: true }], 'the refusal as boot keeps it, and the account it could not reconnect as');
  assert.deepEqual([listings, REC.place('1.0.1.0.1013'), REC.textBetween(D, 1, 9), drops], [['guest'], undefined, '', 1], 'what the session read dropped and told, and the index read again in the guest form');
  assert.deepEqual(REC.places().map((p) => p.doc), [D, '1.0.1.0.127'], 'the guest\'s listing, no draft among it');
  fake.fire('session-died', { session: 's-1', reason: UNOPENED });
  await flush();
  assert.equal(opens(fake), 1, 'one call, never made again');
});

test('a read that meets the re-opened restart before the event takes its end and is asked once more under the re-opened session; the event after it changes nothing', async () => {
  const frame = F.docMetadata(D);
  const s = { ...script };
  firstThen(s, frame, { refused: { kind: 'shell', name: 'session_died', session: 's-1', reason: REOPENED } }, script[FAKE.keyOf('op', { frame })]);
  const fake = FAKE.create(s);
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.setBoard({ board: 'b-1', name: '', origin: '' }); REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  const sent = sessionsSent(fake);
  const out = await PUMP.read(frame);
  assert.ok('answer' in out, 'the answer, never the restart\'s refusal');
  assert.deepEqual(sent, ['s-1', 's-9'], 'asked once more, under the re-opened session');
  assert.deepEqual(REC.session(), { session: 's-9', principal: 1, account: '1.0.1' });
  assert.equal(REC.deathReason(), null);
  fake.fire('session-died', { session: 's-1', reason: REOPENED });
  assert.deepEqual([REC.session()?.session, REC.deathReason()], ['s-9', null], 'the event after it changes nothing');
});

test('a read that meets another end records the death and is asked once more in the guest form, the guest\'s answer handed up', async () => {
  const frame = F.docMetadata(D);
  const retired = { arm: 'retired', fingerprint: 'fp-1', own: true, hand: 'fp-1', position: 9, label: null };
  const s = {};
  firstThen(s, frame, { refused: { kind: 'shell', name: 'session_died', session: 's-1', reason: retired } }, script[FAKE.keyOf('op', { frame })]);
  const fake = FAKE.create(s);
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.setBoard({ board: 'b-1', name: '', origin: '' }); REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  const sent = sessionsSent(fake);
  const out = await PUMP.read(frame);
  assert.ok('answer' in out, 'the guest\'s answer, never the death\'s refusal');
  assert.deepEqual(sent, ['s-1', 'guest'], 'asked once more, in the guest form');
  assert.equal(REC.session(), null, 'the death taken as the read met it');
  assert.deepEqual(REC.deathReason(), retired);
});

test('a read out under the session when the page takes its death is asked once more in the guest form: the guest\'s answer handed up, never the session\'s', async () => {
  const frame = F.retrieveV(D, 1, 30);
  const s = {};
  firstThen(s, frame,
    { result: { as_of: 1, resp: 'delivery', items: [{ content: 'Tumbler.\n\nThe first field.' }, { content: 'mine' }] } },
    { result: { as_of: 1, resp: 'delivery', items: [{ content: 'Tumbler.\n\nThe first field.' }, { withheld: { origin: '1.0.1.0.1003', width: '4' } }] } });
  const fake = FAKE.create(s);
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.setBoard({ board: 'b-1', name: '', origin: '' }); REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  const sent = sessionsSent(fake);
  const release = fake.hold('op', { frame });
  const pending = PUMP.read(frame);
  await new Promise((r) => setTimeout(r, 0));
  fake.fire('session-died', { session: 's-1', reason: { arm: 'closed' } });
  release();
  const out = await pending;
  assert.deepEqual(sent, ['s-1', 'guest'], 'the board answered it under the session; asked once more, in the guest form');
  assert.deepEqual('answer' in out ? F.decodeDelivery(out.answer, 1).map((r) => r.kind) : out, ['content', 'withheld'], 'the guest\'s answer, the run withheld — never the session\'s bytes');
});

test('the page\'s own death keeps what the session read as published and covers the draft the view stood on at once — the edition\'s row and extent standing while they are read again in the guest form and set in one step, the draft\'s text, metadata and row and the link homed in it gone at once, the draft the withheld box a guest meets, its read owed — and reads the index again in the guest form, the draft\'s cover confirmed once the guest\'s read of it answers it withheld (issues #177, #274)', async () => {
  const DR = '1.0.1.0.5', L = DR + '.0.2.1';
  const edition = { doc: D, kind: 'edition', label: 'd', standing: 'public' };
  /** @type {Record<string, unknown>} */
  const s = {
    // the listing keys on the board alone, in either form: the session's is set by hand below, so this one is the guest's
    [FAKE.keyOf('places', { board: 'b-1' })]: { result: { docs: [edition], counts: [{ account: '1.0.1', documents: 1 }], state: { arm: 'complete' } } },
    [FAKE.keyOf('op', { frame: F.retrieveDocVSpanSet(D) })]: script[FAKE.keyOf('op', { frame: F.retrieveDocVSpanSet(D) })],
    [FAKE.keyOf('op', { frame: F.findLinksV(D, 1, 30) })]: { result: { as_of: 1, resp: 'addrs', addrs: [] } },
    [FAKE.keyOf('op', { frame: F.docMetadata(D) })]: script[FAKE.keyOf('op', { frame: F.docMetadata(D) })],
  };
  // the draft's extent under the session; withheld from the guest
  inTurn(s, F.retrieveDocVSpanSet(DR), { result: { as_of: 1, resp: 'span_set', set: [{ start: '1.1', width: '0.12' }] } }, { refused: { kind: 'refused', name: 'withheld', code: 'withheld' } });
  const fake = FAKE.create(s);
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.setBoard({ board: 'b-1', name: '', origin: '' }); REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  REC.takeIndex(/** @type {any} */ ({ docs: [edition, { doc: DR, kind: 'draft', label: 'the draft', standing: 'yours_to_read' }], counts: [{ account: '1.0.1', documents: 2 }], state: { arm: 'building' } }));
  const ops = sessionsSent(fake), listings = sessionsSent(fake, 'places');
  PUMP.forget(D); PUMP.forget(DR);
  CAM.setViewport(1440, 900);
  CAM.set(CAM.viewForCell(accountCell('1.0.1'), 0.85));
  assert.deepEqual(PUMP.visibleDocs().map((d) => d.addr).sort(), [D, DR], 'at HOME the edition and the draft stand in view');
  PUMP.pump();
  await new Promise((r) => setTimeout(r, 0));
  assert.deepEqual([REC.doc(D).extent, REC.doc(DR).extent, ops], [30, 12, ['s-1', 's-1']], 'the view read both extents under the session');
  // what else the session read: the draft's text and metadata, and a link homed in it touching the edition
  REC.takeDelivery(DR, [{ pos: 1, width: 12, kind: 'content', text: 'draft words.', ref: null, origin: null }]);
  REC.takeMetadata(DR, { doc: DR, published: false, owner: '1.0.1', birth: null, birthExtent: null, placed: null, baseExtent: null, source: null, asOf: 1 });
  REC.takeLinks(D, [L]);
  REC.takeLink({ addr: L, from: [], to: [], type: '1.1.0.1.0.1.0.3.13' });
  const release = fake.hold('places', { board: 'b-1' });
  const drafted = FAKE.keyOf('op', { frame: F.retrieveDocVSpanSet(DR) }), editionRead = FAKE.keyOf('op', { frame: F.retrieveDocVSpanSet(D) });
  const asks = (/** @type {string} */ k) => fake.asked.filter((x) => x === k).length, before = { draft: asks(drafted), edition: asks(editionRead), ops: ops.length };
  fake.fire('session-died', { session: 's-1', reason: { arm: 'closed' } });
  const dr = REC.doc(DR);
  assert.deepEqual([REC.places().map((p) => p.doc), REC.countOf('1.0.1'), REC.indexState()], [[D], { documents: 1, exact: false }, null], 'at once: the edition\'s row stands, read as published, the count it gives a lower bound; the draft\'s row, the counts and the state gone');
  assert.deepEqual([dr.from, dr.runs, dr.meta, dr.extent, dr.kind, dr.label, dr.standing], [-1, [], null, null, 'unknown', null, null], 'the draft\'s text, metadata, extent and row gone');
  assert.deepEqual([dr.refused, REC.covered(DR), REC.owed(DR), REC.known()], ['withheld', true, true, [D, DR]], 'the draft the view stood on covered at once, its read at the guest\'s class owed: a box the model knows, existence and owner');
  assert.deepEqual([REC.doc(D).extent, [...REC.doc(D).links], REC.link(L)], [30, [], undefined], 'the edition\'s extent stands; the link homed in the draft gone from its raw set and from the model');
  assert.deepEqual([listings, PUMP.settled(), PUMP.rereading()], [['guest'], false, true], 'the index asked again in the guest form; while it is out the page is not settled and the change\'s reads are out');
  release();
  for (let i = 0; i < 5; i++) await new Promise((r) => setTimeout(r, 0));
  assert.deepEqual(REC.places().map((p) => p.doc), [D], 'the guest\'s index: the edition alone');
  assert.deepEqual([REC.countOf('1.0.1').documents, REC.countsExact()], [1, true], 'its count and its state the guest\'s listing\'s');
  assert.deepEqual([asks(editionRead) - before.edition, REC.doc(D).extent, PUMP.rereading()], [1, 30, true], 'the edition read again in the guest form and set from that read; the draft\'s cover still owed its read');
  PUMP.pump();
  for (let i = 0; i < 5; i++) await new Promise((r) => setTimeout(r, 0));
  assert.deepEqual([asks(drafted) - before.draft, listings], [1, ['guest']], 'the draft the view stood on asked again in the guest form; the index read once');
  assert.ok(ops.slice(before.ops).every((x) => x === 'guest'), `every read after the death in the guest form: ${ops}`);
  assert.deepEqual([REC.doc(DR).refused, REC.covered(DR), REC.owed(DR), REC.covered(D), REC.known(), PUMP.rereading()], ['withheld', true, false, false, [D, DR], false], 'the draft withheld from the guest: its cover confirmed, a box the model knows — the edition the guest reads none — and the change\'s reads answered');
});

test('a cover the change of class made lifts where the read at the new class returns its material: a draft the view stood on that the new class may read holds its extent again, no longer withheld, and the change\'s reads answered (issue #274\'s design decision: "A cover lifts if the new read returns its material")', async () => {
  const DR = '1.0.1.0.5';
  /** @type {Record<string, unknown>} */
  const s = {
    [FAKE.keyOf('places', { board: 'b-1' })]: { result: { docs: [{ doc: D, kind: 'edition', label: 'd', standing: 'public' }], counts: [{ account: '1.0.1', documents: 1 }], state: { arm: 'complete' } } },
    // the draft's extent, under the session and at the guest's class alike: a draft its owner grants every reader
    [FAKE.keyOf('op', { frame: F.retrieveDocVSpanSet(DR) })]: { result: { as_of: 1, resp: 'span_set', set: [{ start: '1.1', width: '0.12' }] } },
  };
  const fake = FAKE.create(s);
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.setBoard({ board: 'b-1', name: '', origin: '' }); REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  REC.takeIndex(/** @type {any} */ ({ docs: [{ doc: DR, kind: 'draft', label: 'the draft', standing: 'yours_to_read' }], counts: [{ account: '1.0.1', documents: 1 }], state: { arm: 'building' } }));
  REC.takeSpanSet(DR, [{ subspace: 1, ordinal: 1, positions: 12 }]);
  REC.takeDelivery(DR, [{ pos: 1, width: 12, kind: 'content', text: 'draft words.', ref: null, origin: null }]);
  PUMP.forget(DR);
  CAM.setViewport(1440, 900);
  CAM.set(CAM.viewForCell(accountCell('1.0.1'), 0.85));
  assert.ok(PUMP.visibleDocs().some((d) => d.addr === DR), 'at HOME the draft stands in view');
  fake.fire('session-died', { session: 's-1', reason: { arm: 'closed' } });
  assert.deepEqual([REC.doc(DR).refused, REC.owed(DR), REC.textBetween(DR, 1, 13)], ['withheld', true, ''], 'at once: covered, its read owed, none of its text');
  for (let i = 0; i < 5; i++) { PUMP.pump(); await new Promise((r) => setTimeout(r, 0)); }
  assert.deepEqual([REC.doc(DR).refused, REC.covered(DR), REC.owed(DR), REC.doc(DR).extent, PUMP.rereading()], [null, false, false, 12, false], 'the guest\'s read answered it: the cover lifted, its extent held, the change\'s reads answered');
});

test('a listing read while the feed brings a row and an index state lays them over its answer: the document the row mints listed and counted, the state the event\'s — the shell emits each once, and its listing may not hold the row yet', async () => {
  const fake = FAKE.create({ [FAKE.keyOf('places', { board: 'b-1' })]: { result: indexAt('building') } });
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.setBoard({ board: 'b-1', name: '', origin: '' });
  const release = fake.hold('places', { board: 'b-1' });
  const listing = PUMP.readIndex();
  await new Promise((r) => setTimeout(r, 0));
  fake.fire('feed', { board: 'b-1', update: minting('1.0.1.0.77', 'published') });
  fake.fire('index', { board: 'b-1', session: null, state: { arm: 'complete' } });
  release();
  await listing;
  assert.deepEqual(REC.places().map((p) => [p.doc, p.kind]), [[D, 'edition'], ['1.0.1.0.77', 'edition']], 'the listing\'s edition, and the one the row minted while it was read');
  assert.deepEqual([REC.countOf('1.0.1').documents, REC.indexState()?.arm, REC.countsExact()], [2, 'complete', true], 'counted over the listing\'s count; the state the event brought, never the listing\'s building');
});

test('a listing read out across the page\'s own death lays over its answer the rows taken after the death alone — never the dead session\'s drafts row', async () => {
  const fake = FAKE.create({ [FAKE.keyOf('places', { board: 'b-1' })]: { result: indexAt('at_the_floor') } });
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.setBoard({ board: 'b-1', name: '', origin: '' }); REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  const listings = sessionsSent(fake, 'places');
  const release = fake.hold('places', { board: 'b-1' });
  const boot = PUMP.readIndex();
  await new Promise((r) => setTimeout(r, 0));
  fake.fire('feed', { board: 'b-1', update: minting('1.0.1.0.1013', 'drafts') });
  fake.fire('index', { board: 'b-1', session: 's-1', state: { arm: 'complete' } });
  fake.fire('session-died', { session: 's-1', reason: { arm: 'closed' } });
  fake.fire('feed', { board: 'b-1', update: { ...minting('1.0.1.0.78', 'published'), position: 4, at: 4 } });
  release();
  await boot;
  await new Promise((r) => setTimeout(r, 0));
  assert.deepEqual(listings, ['s-1', 'guest', 'guest'], 'the boot\'s listing out under the session, the death\'s as a guest, and the boot\'s asked once more as a guest, landing last');
  assert.deepEqual(REC.places().map((p) => [p.doc, p.kind]), [[D, 'edition'], ['1.0.1.0.78', 'edition']], 'the guest\'s listing, and the edition minted after the death');
  assert.deepEqual([REC.place('1.0.1.0.1013'), REC.countOf('1.0.1').documents, REC.indexState()?.arm], [undefined, 2, 'at_the_floor'], 'no draft the dead session read, nor its face\'s state');
});

test('the board\'s health and its daemon, each read while a mode or a daemon event arrives, are laid under the event — which may be newer and is never sent again; with no event meanwhile, the answer stands', async () => {
  let reads = 0;
  /** @type {Record<string, unknown>} */
  const s = { [FAKE.keyOf('probe', {})]: { result: { daemon: 'running', dialed: null, signed: null } } };
  // a fresh `/health` document at each read, its log position the read's count
  Object.defineProperty(s, FAKE.keyOf('health', { board: 'b-1' }), { enumerable: true, get: () => ({ result: { health: { log_position: 8 + ++reads, auth: { claimant: null, local_trust: true }, writes: { halted: false } }, mode: 'UNCLAIMED' } }) });
  const fake = FAKE.create(s);
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.setBoard({ board: 'b-1', name: '', origin: '' });
  await PUMP.readHealth('b-1');
  await PUMP.readProbe();
  assert.deepEqual([REC.mode(), REC.health()?.auth?.claimant, REC.health()?.log_position, REC.daemon()], ['UNCLAIMED', null, 9, 'running'], 'no event meanwhile: the answers');
  const health = fake.hold('health', { board: 'b-1' }), probe = fake.hold('probe', {});
  const pending = [PUMP.readHealth('b-1'), PUMP.readProbe()];
  await new Promise((r) => setTimeout(r, 0));
  fake.fire('mode', { board: 'b-1', mode: 'ENFORCING', claimant: '1.0.1', local_trust: false });
  fake.fire('daemon', { board: 'b-1', state: 'unreachable' });
  health(); probe();
  await Promise.all(pending);
  assert.deepEqual([REC.mode(), REC.health()?.auth?.claimant, REC.health()?.auth?.local_trust, REC.health()?.log_position], ['ENFORCING', '1.0.1', false, 10], 'the mode the event brought laid over the answer\'s health, whose log position stands');
  assert.equal(REC.daemon(), 'unreachable', 'the outage the event announced, never the answer\'s running');
  assert.deepEqual(fake.unanswered, []);
});

test('a read refused session_ended while the shell derives the end asks for the session again; the event re-opening it settles that, the page going on under the re-opened session, and the call\'s later answer is stale — taken nowhere, the session it opened closed (issue #175)', async () => {
  const frame = F.docMetadata(D);
  const s = { ...script, ...opened('s-10'), [FAKE.keyOf('close', { session: 's-10' })]: { result: {} } };
  firstThen(s, frame, { refused: { kind: 'shell', name: 'session_ended', session: 's-1' } }, script[FAKE.keyOf('op', { frame })]);
  const fake = FAKE.create(s);
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.setBoard({ board: 'b-1', name: '', origin: '' }); REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  const sent = sessionsSent(fake);
  const call = fake.hold('session', { board: 'b-1' });
  let done = false;
  const pending = PUMP.read(frame).then((o) => { done = true; return o; });
  await flush();
  assert.deepEqual([sent, opens(fake), done], [['s-1'], 1, false], 'refused, the read waits for the call made again, out');
  fake.fire('session-died', { session: 's-1', reason: REOPENED });
  const out = await pending;
  assert.ok('answer' in out, 'the answer, never the refusal');
  assert.deepEqual([sent, REC.session()?.session, REC.deathReason()], [['s-1', 's-9'], 's-9', null], 'asked again under the session the shell re-opened');
  call();
  await flush();
  assert.equal(REC.session()?.session, 's-9', 'the call\'s later answer taken nowhere');
  assert.ok(fake.asked.includes(FAKE.keyOf('close', { session: 's-10' })), 'the session it opened closed, so none stands with no owner');
});

test('a read refused session_ended after the event brought the re-opened session is asked once more under it at once', async () => {
  const frame = F.docMetadata(D);
  const s = { ...script };
  firstThen(s, frame, { refused: { kind: 'shell', name: 'session_ended', session: 's-1' } }, script[FAKE.keyOf('op', { frame })]);
  const fake = FAKE.create(s);
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.setBoard({ board: 'b-1', name: '', origin: '' }); REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  const sent = sessionsSent(fake);
  const release = fake.hold('op', { frame });
  const pending = PUMP.read(frame);
  await new Promise((r) => setTimeout(r, 0));
  fake.fire('session-died', { session: 's-1', reason: REOPENED });
  release();
  const out = await pending;
  assert.ok('answer' in out, 'the answer, never the refusal');
  assert.deepEqual(sent, ['s-1', 's-9']);
});

test('a read refused session_ended — a reference from before the shell\'s own restart, which announces none — asks for the session again by the boot\'s own call and is answered under the session it opens: no refusal handed up, no death (issue #175)', async () => {
  const frame = F.docMetadata(D);
  const s = { ...script, ...opened('s-2'), ...caughtUp('s-2', 3) };
  firstThen(s, frame, { refused: { kind: 'shell', name: 'session_ended', session: 's-7' } }, script[FAKE.keyOf('op', { frame })]);
  const fake = FAKE.create(s);
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.setBoard({ board: 'b-1', name: '', origin: '' }); REC.setSession({ session: 's-7', principal: 1, account: '1.0.1' });
  readHead(3);
  const sent = sessionsSent(fake);
  const out = await PUMP.read(frame);
  assert.ok('answer' in out, 'the answer, never the refusal');
  assert.deepEqual([sent, opens(fake), catchUps(fake)], [['s-7', 's-2'], 1, [{ session: 's-2', since: 3 }]], 'asked again under the session the one call opened, once its catch-up is taken');
  assert.deepEqual([REC.session()?.session, REC.deathReason()], ['s-2', null], 'no death');
});

test('every loss told while the call again is out joins it — the restart\'s event, two reads refused session_ended, one refused session_died naming the restart — and each read is answered under the session the one call opens (issue #175)', async () => {
  const frames = [F.docMetadata(D), F.retrieveDocVSpanSet(D), F.findLinksV(D, 1, 30)];
  const s = { ...script, ...opened('s-2'), ...caughtUp('s-2', 3) };
  const ended = { refused: { kind: 'shell', name: 'session_ended', session: 's-1' } };
  const died = { refused: { kind: 'shell', name: 'session_died', session: 's-1', reason: UNOPENED } };
  frames.forEach((frame, i) => firstThen(s, frame, i < 2 ? ended : died, script[FAKE.keyOf('op', { frame })]));
  const fake = FAKE.create(s);
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.setBoard({ board: 'b-1', name: '', origin: '' }); REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  readHead(3);
  const sent = sessionsSent(fake);
  const ops = frames.map((frame) => fake.hold('op', { frame }));
  const call = fake.hold('session', { board: 'b-1' });
  const reads = frames.map((frame) => PUMP.read(frame));
  await flush();
  fake.fire('session-died', { session: 's-1', reason: UNOPENED });
  for (const release of ops) release();
  await flush();
  assert.deepEqual([opens(fake), REC.session()?.session, REC.deathReason()], [1, 's-1', null], 'one call out, held; the lost session stands meanwhile, no death');
  call();
  const outs = await Promise.all(reads);
  assert.ok(outs.every((o) => 'answer' in o), 'every read answered, none the refusal');
  assert.deepEqual([opens(fake), catchUps(fake), sent.slice(0, 3), sent.slice(3)], [1, [{ session: 's-2', since: 3 }], ['s-1', 's-1', 's-1'], ['s-2', 's-2', 's-2']], 'one call and one catch-up; each read asked again under the session it opened');
});

test('after the call again is refused, a late session_ended for the lost reference asks for no session again, and its read is asked once more in the guest form (issue #175)', async () => {
  const frame = F.docMetadata(D);
  const s = { ...script, ...NO_KEY };
  firstThen(s, frame, { refused: { kind: 'shell', name: 'session_ended', session: 's-1' } }, script[FAKE.keyOf('op', { frame })]);
  const fake = FAKE.create(s);
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.setBoard({ board: 'b-1', name: '', origin: '' }); REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  const sent = sessionsSent(fake);
  const op = fake.hold('op', { frame });
  const late = PUMP.read(frame);
  await flush();
  fake.fire('session-died', { session: 's-1', reason: UNOPENED });
  await flush();
  assert.deepEqual([REC.session(), opens(fake)], [null, 1], 'the call again refused: a guest');
  op();
  const out = await late;
  assert.ok('answer' in out, 'the guest\'s answer, never the refusal');
  assert.deepEqual([opens(fake), sent], [1, ['s-1', 'guest']], 'no second call; the read asked once more as a guest');
});

test('a session lost while its board is known unreachable is asked for again at the board\'s running and never before, every read waiting for it meanwhile (issue #175: "once the board is answering")', async () => {
  const frame = F.docMetadata(D);
  const fake = FAKE.create({ ...script, ...opened('s-2'), ...caughtUp('s-2', 3) });
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.setBoard({ board: 'b-1', name: '', origin: '' }); REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  readHead(3);
  fake.fire('daemon', { board: 'b-1', state: 'unreachable' });
  const sent = sessionsSent(fake);
  fake.fire('session-died', { session: 's-1', reason: UNOPENED });
  let done = false;
  const pending = PUMP.read(frame).then((o) => { done = true; return o; });
  await flush();
  assert.deepEqual([opens(fake), catchUps(fake), sent, done], [0, [], [], false], 'no call while the board does not answer; the read waits, asked nowhere');
  fake.fire('daemon', { board: 'b-1', state: 'running' });
  const out = await pending;
  assert.ok('answer' in out);
  assert.deepEqual([opens(fake), catchUps(fake), sent, REC.session()?.session], [1, [{ session: 's-2', since: 3 }], ['s-2'], 's-2'], 'at running, the one call and its catch-up; the read asked under the session it opened');
});

test('a session the call again opens as another principal is taken only once what the lost session read is dropped, the index read again under it (issue #175; M-REC\'s THE CLASS)', async () => {
  const fake = FAKE.create({ ...script, ...opened('s-2', { principal: 2, account: '1.0.2' }), ...caughtUp('s-2', 3) });
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.setBoard({ board: 'b-1', name: '', origin: '' }); REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  readHead(3);
  REC.takeIndex(indexAt('building'));
  REC.takeDelivery(D, [{ pos: 1, width: 8, kind: 'content', text: 'Tumbler.', ref: null, origin: null }]);
  const listings = sessionsSent(fake, 'places');
  fake.fire('session-died', { session: 's-1', reason: UNOPENED });
  await flush();
  assert.deepEqual([REC.session()?.session, REC.session()?.principal, REC.deathReason()], ['s-2', 2, null], 'the session opened, another principal\'s');
  assert.deepEqual([REC.textBetween(D, 1, 9), catchUps(fake), listings], ['', [{ session: 's-2', since: 3 }], ['s-2']], 'principal 1\'s text dropped, what was written while the session was out read under the new one, and the index read again under it');
});

test('a catch-up takes each row once and in position order: the rows the feed brings while it is out wait, every read waiting on the session with them and the page not settled; a row held at a position it read is left for its own — a straddle\'s drafts rendering among them — and the rest taken around them; a row the feed brings after at a position it read is left, one past it taken, and a start forgets the positions it read (issue #326\'s design decision: "Rows that arrive meanwhile wait, and each row is applied once, in position order")', async () => {
  const [A, B, C, X, Y] = ['1.0.1.0.21', '1.0.1.0.22', '1.0.1.0.23', '1.0.1.0.24', '1.0.1.0.25'];
  /** a row of `op` at `position` naming `docs`, of class `cls`: a drafts row sent under s-2 */
  const row = (/** @type {number} */ position, /** @type {string[]} */ docs, cls = 'published', op = 'insert') => ({ position, at: position, op, docs, class: cls, ...(cls === 'drafts' ? { session: 's-2' } : {}) });
  // what was written while the session was out, as the catch-up reads it: an edit at 11, a draft minted at 12, and at 13 a straddle, its drafts rendering naming the draft beside the edition
  const fake = FAKE.create({ ...script, ...opened('s-2'), ...caughtUp('s-2', 10, [row(11, [A]), row(12, [B], 'drafts', 'create_new_document'), row(13, [C, A], 'drafts')], 13) });
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.setBoard({ board: 'b-1', name: '', origin: '' }); REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  readHead(10);
  const release = fake.hold('changes', { session: 's-2', since: 10 });
  fake.fire('session-died', { session: 's-1', reason: UNOPENED });
  await until(() => catchUps(fake).length === 1, 'the catch-up asked');
  const waiting = PUMP.read(F.docMetadata(D));
  // the feed meanwhile: a row past the catch-up's reach, one before where it began, the straddle's published rendering, a row it read, and a drafts row past its reach
  for (const u of [row(15, [Y]), row(9, [X]), row(13, [A]), row(11, [A]), row(14, [Y], 'drafts')]) fake.fire('feed', { board: 'b-1', update: u });
  await flush();
  assert.deepEqual([REC.feedRows(), fake.asked.filter((k) => k.startsWith('op:')), PUMP.settled()], [[], [], false], 'while the catch-up is out: no row taken, the read waiting on the session asked nowhere, the page not settled');
  release();
  await waiting;
  await flush();
  assert.deepEqual(REC.feedRows().map((r) => [r.position, r.cls]), [[9, 'published'], [11, 'published'], [12, 'drafts'], [13, 'drafts'], [14, 'drafts'], [15, 'published']], 'each position once and in order: the catch-up\'s at the positions it read, the straddle its drafts rendering, the rows held around them');
  assert.deepEqual([REC.place(B)?.kind, REC.feedAt(), PUMP.settled()], ['draft', 15, true], 'the draft minted listed, the page\'s place on the feed past every row taken, the page settled');
  fake.fire('feed', { board: 'b-1', update: row(12, [B], 'drafts', 'create_new_document') });
  fake.fire('feed', { board: 'b-1', update: row(16, [X]) });
  assert.deepEqual(REC.feedRows().slice(6).map((r) => r.position), [16], 'after it, a row at a position the catch-up read left — the feed lagging the catch-up — and one past it taken');
  PUMP.start({ onDirty: () => {} });
  fake.fire('feed', { board: 'b-1', update: row(12, [B]) });
  assert.deepEqual(REC.feedRows().slice(7).map((r) => r.position), [12], 'a start forgets the positions the last catch-up read');
  assert.deepEqual(fake.unanswered, []);
});

test('where no catch-up can be done — no position held, or `changes` refused — the rows held are taken alone and the board marked as a row naming nothing marks it, the page not settled until its refresh has run (issue #326\'s design decision: "If no catch-up can be done, the page marks the board as #212 does")', async () => {
  const reclaimed = { refused: { kind: 'refused', name: 'history_reclaimed', status: 410, code: 'history_reclaimed', detail: null, op: null, body: { error: 'history_reclaimed', floor: 12 } } };
  for (const [what, head] of /** @type {Array<[string, number | null]>} */ ([['no position held', null], ['`changes` refused', 10]])) {
    REC._reset();
    const fake = FAKE.create({ ...script, ...opened('s-2'), [FAKE.keyOf('changes', { session: 's-2', since: 10 })]: reclaimed });
    PORT.boot(fake);
    PUMP.start({ onDirty: () => {} });
    REC.setBoard({ board: 'b-1', name: '', origin: '' }); REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
    if (head != null) readHead(head);
    const call = fake.hold('session', { board: 'b-1' });
    fake.fire('session-died', { session: 's-1', reason: UNOPENED });
    fake.fire('feed', { board: 'b-1', update: { position: 12, at: 12, op: 'insert', docs: [D], class: 'published' } });
    assert.deepEqual(REC.feedRows(), [], `${what}: the row held while the call is out`);
    call();
    await flush();
    assert.deepEqual([REC.session()?.session, catchUps(fake).length, REC.feedRows().map((r) => r.position), REC.bare(), PUMP.settled()], ['s-2', head == null ? 0 : 1, [12], true, false], `${what}: the row taken, the board marked and its refresh armed`);
    await PUMP.refresh();
    assert.deepEqual([REC.bare(), PUMP.settled()], [false, true], `${what}: the refresh took the mark`);
  }
});

test('a catch-up the page\'s class changes under takes nothing it read and marks nothing, the rows held taken at the new class; one whose session is lost under it, the shell naming no death, leaves the rows held and the reads waiting on the session for the call that follows, whose catch-up reads from the same position (issue #326)', async () => {
  const NEW = '1.0.1.0.1014', OTHER = '1.0.1.0.1015';
  /** a drafts row minting `doc` at `position`, sent under `session` */
  const draftAt = (/** @type {string} */ doc, /** @type {number} */ position, /** @type {string} */ session) => ({ ...minting(doc, 'drafts', session), position, at: position });
  const edit = { position: 5, at: 5, op: 'insert', docs: [D], class: 'published' };
  // the session got back dies while its catch-up is out
  let fake = FAKE.create({ ...script, ...opened('s-2'), ...caughtUp('s-2', 3, [draftAt(NEW, 4, 's-2')], 4), [FAKE.keyOf('places', { board: 'b-1' })]: { result: indexAt('complete') } });
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.setBoard({ board: 'b-1', name: '', origin: '' }); REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  readHead(3);
  const release = fake.hold('changes', { session: 's-2', since: 3 });
  fake.fire('session-died', { session: 's-1', reason: UNOPENED });
  await until(() => catchUps(fake).length === 1, 'the catch-up asked');
  fake.fire('feed', { board: 'b-1', update: edit });
  fake.fire('feed', { board: 'b-1', update: draftAt(OTHER, 6, 's-2') });
  fake.fire('session-died', { session: 's-2', reason: { arm: 'closed' } });
  release();
  await until(() => REC.places().length > 0, 'the guest\'s listing taken');
  assert.deepEqual([REC.session(), REC.place(NEW), REC.place(OTHER), REC.feedRows().map((r) => r.position), REC.bare()], [null, undefined, undefined, [5], false], 'a guest: nothing the dead session\'s catch-up read taken, its drafts row held dropped, the published row held taken, the board unmarked');
  assert.deepEqual(REC.places().map((p) => p.doc), [D], 'the guest\'s listing');
  // the session got back is lost under its catch-up, the shell naming no death
  REC._reset();
  /** @type {Record<string, unknown>} */
  const s = { ...script, ...caughtUp('s-11', 3, [draftAt(NEW, 4, 's-11')], 4), [FAKE.keyOf('changes', { session: 's-10', since: 3 })]: { refused: { kind: 'shell', name: 'session_ended', session: 's-10' } } };
  let calls = 0;
  Object.defineProperty(s, FAKE.keyOf('session', { board: 'b-1' }), { enumerable: true, get: () => ({ result: { session: ++calls === 1 ? 's-10' : 's-11', principal: 1, account: '1.0.1', writes: true } }) });
  fake = FAKE.create(s);
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.setBoard({ board: 'b-1', name: '', origin: '' }); REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  readHead(3);
  const sent = sessionsSent(fake);
  const ended = fake.hold('changes', { session: 's-10', since: 3 }), second = fake.hold('changes', { session: 's-11', since: 3 });
  fake.fire('session-died', { session: 's-1', reason: UNOPENED });
  const waiting = PUMP.read(F.docMetadata(D));
  await until(() => catchUps(fake).length === 1, 'the first catch-up asked');
  fake.fire('feed', { board: 'b-1', update: edit });
  ended();
  await until(() => catchUps(fake).length === 2, 'the second catch-up asked');
  await flush();
  assert.deepEqual([opens(fake), REC.session()?.session, catchUps(fake), sent, REC.feedRows()], [2, 's-11', [{ session: 's-10', since: 3 }, { session: 's-11', since: 3 }], [], []], 'a second call, its catch-up from the same position; while it is out, the read waiting on the session asked nowhere and the row held');
  second();
  await waiting;
  assert.deepEqual(sent, ['s-11'], 'the read waiting on the session went out once the second catch-up was taken');
  assert.deepEqual([REC.place(NEW)?.kind, REC.feedRows().map((r) => r.position), REC.feedAt()], ['draft', [4, 5], 5], 'the second catch-up\'s row taken with the row held through both, once each and in order');
});

test('the face the shell sends the session an acquire opens, before the call that opens it answers, is taken as the page goes on under it as the same principal; one naming another session is not; the session answer\'s `opened_at` starts `draftsAt` and the regain reads the drafts from it (issues #326, #392)', async () => {
  const fake = FAKE.create({ ...script, ...opened('s-10', { opened_at: 3 }), ...caughtUp('s-10', 3, [], 3, 3, 'drafts'), ...caughtUp('s-10', 3) });
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.setBoard({ board: 'b-1', name: '', origin: '' }); REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  REC.takeIndex(indexAt('complete'));
  readHead(3);
  const call = fake.hold('session', { board: 'b-1' });
  fake.fire('session-died', { session: 's-1', reason: UNOPENED });
  fake.fire('index', { board: 'b-1', session: 's-3', state: { arm: 'building' } });
  fake.fire('index', { board: 'b-1', session: 's-10', state: { arm: 'widening' } });
  assert.equal(REC.indexState()?.arm, 'complete', 'while the call is out: the face the page reads stands');
  call();
  await settle();
  assert.deepEqual([REC.session()?.session, REC.indexState()?.arm, REC.countsExact()], ['s-10', 'widening', false], 'the face of the session got back, never another tab\'s');
  assert.deepEqual([REC.draftsAt(), catchUps(fake)], [3, [{ class: 'drafts', session: 's-10', since: 3 }, { session: 's-10', since: 3 }]], 'draftsAt started from opened_at, the drafts read from it before the catch-up from feedAt');
});

test('a session got back says nothing of reconnecting while its catch-up is out, however long it takes (issues #175, #326)', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const turn = () => new Promise((r) => setImmediate(r));
  const fake = FAKE.create({ ...script, ...opened('s-10', { opened_at: 3 }), ...caughtUp('s-10', 3, [], 3, 3, 'drafts'), ...caughtUp('s-10', 3) });
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.setBoard({ board: 'b-1', name: '', origin: '' }); REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  readHead(3);
  const release = fake.hold('changes', { session: 's-10', since: 3 });
  fake.fire('session-died', { session: 's-1', reason: UNOPENED });
  for (let i = 0; i < 5; i++) await turn();
  assert.deepEqual([REC.session()?.session, catchUps(fake)], ['s-10', [{ class: 'drafts', session: 's-10', since: 3 }, { session: 's-10', since: 3 }]], 'the session got back, its drafts read taken and its catch-up from feedAt out');
  t.mock.timers.tick(PUMP.RECONNECTING_MS);
  assert.equal(REC.reconnect(), null, 'past RECONNECTING_MS: nothing said of reconnecting');
  release();
  for (let i = 0; i < 5; i++) await turn();
  assert.deepEqual([REC.session()?.session, REC.reconnect()], ['s-10', null], 'the catch-up taken: nothing said');
});

test('the page\'s own close(session) is its sign-out, never a loss: taken as the call goes out as the end the shell\'s close carries, and a read out under the session that meets session_ended asks for no session but is asked once more as a guest (client.md §4b.2: "`close(session)` stays the page\'s sign-out"; issue #175)', async () => {
  const frame = F.docMetadata(D);
  const s = { ...script, ...opened('s-2'), [FAKE.keyOf('close', { session: 's-1' })]: { result: {} } };
  firstThen(s, frame, { refused: { kind: 'shell', name: 'session_ended', session: 's-1' } }, script[FAKE.keyOf('op', { frame })]);
  const fake = FAKE.create(s);
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.setBoard({ board: 'b-1', name: '', origin: '' }); REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  const sent = sessionsSent(fake), listings = sessionsSent(fake, 'places');
  const op = fake.hold('op', { frame });
  const pending = PUMP.read(frame);
  await flush();
  const closing = PORT.close({ session: 's-1' });
  assert.deepEqual([REC.session(), REC.deathReason(), listings], [null, { arm: 'closed' }, ['guest']], 'as the close goes out: the sign-out\'s end, the index read again in the guest form');
  op();
  const out = await pending;
  await closing;
  assert.ok('answer' in out, 'the guest\'s answer, never the refusal');
  assert.deepEqual([opens(fake), sent], [0, ['s-1', 'guest']], 'no session asked for; the read asked once more as a guest');
  fake.fire('session-died', { session: 's-1', reason: { arm: 'closed' } });
  assert.deepEqual([REC.session(), REC.deathReason(), opens(fake)], [null, { arm: 'closed' }, 0], 'the shell\'s own event after it changes nothing');
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
  return firstThen(s, frame, { refused: { kind: 'refused', name: 'scan_busy', status: 503, code: 'scan_busy', detail: null, op: frame.op, body: null } }, then);
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

/** the board not answering a read: the shell's dial, or the dev provider's fetch, failed */
const UNREACHABLE = { refused: { kind: 'unreachable', name: 'unreachable', text: 'the board is not answering' } };

/**
 * A guest's page at HOME, the board's one edition D in view and nothing of it
 * read, over a board that lists D alone and whose span-set read of D answers
 * `outcomes` in turn.
 * @param {...unknown} outcomes
 */
function homeAsking(...outcomes) {
  const s = { [FAKE.keyOf('places', { board: 'b-1' })]: { result: indexAt('complete') } };
  const span = inTurn(s, F.retrieveDocVSpanSet(D), ...outcomes);
  const fake = FAKE.create(s);
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.setBoard({ board: 'b-1', name: '', origin: '' });
  REC.takeIndex(indexAt('complete'));
  PUMP.forget(D);
  CAM.setViewport(1440, 900);
  CAM.set(CAM.viewForCell(accountCell('1.0.1'), 0.85));
  return { fake, span };
}

test('a view\'s read the board did not answer is held, never taken as answered, and asked again at once where the daemon is announced running', async (t) => {
  t.mock.method(performance, 'now', () => 1000);
  const { fake, span } = homeAsking(UNREACHABLE, script[FAKE.keyOf('op', { frame: F.retrieveDocVSpanSet(D) })]);
  PUMP.pump();
  await new Promise((r) => setTimeout(r, 0));
  assert.deepEqual([span.asks(), REC.doc(D).extent], [1, null], 'asked; the board did not answer');
  PUMP.pump();
  await new Promise((r) => setTimeout(r, 0));
  assert.equal(span.asks(), 1, 'held while the board is out');
  fake.fire('daemon', { board: 'b-1', state: 'running' });
  PUMP.pump();
  await new Promise((r) => setTimeout(r, 0));
  assert.deepEqual([span.asks(), REC.doc(D).extent], [2, 30], 'asked again at once as the daemon is announced back, and answered');
});

test('a view\'s read the board did not answer is asked again past UNREACHED_MS where no running comes — the shell announces no outage its stream rides out — its refusal recorded once, and not missing while held', async (t) => {
  let clock = 1000;
  t.mock.method(performance, 'now', () => clock);
  const { span } = homeAsking(UNREACHABLE, UNREACHABLE, script[FAKE.keyOf('op', { frame: F.retrieveDocVSpanSet(D) })]);
  const met = PUMP.refusalsMet().length;
  PUMP.pump();
  await new Promise((r) => setTimeout(r, 0));
  assert.deepEqual([span.asks(), PUMP.refusalsMet().length - met], [1, 1], 'asked; the board did not answer, and the refusal is recorded');
  clock += PUMP.UNREACHED_MS - 1;
  assert.equal(PUMP.pump(), 0, 'held, the read is not missing: nothing can arrive for it while the board is out');
  await new Promise((r) => setTimeout(r, 0));
  assert.equal(span.asks(), 1, 'nothing asked inside the pause');
  clock += 1;
  PUMP.pump();
  await new Promise((r) => setTimeout(r, 0));
  assert.deepEqual([span.asks(), REC.doc(D).extent, PUMP.refusalsMet().length - met], [2, null, 1], 'asked again past the pause; the board still out, the outage\'s refusal not recorded twice');
  clock += PUMP.UNREACHED_MS;
  PUMP.pump();
  await new Promise((r) => setTimeout(r, 0));
  assert.deepEqual([span.asks(), REC.doc(D).extent], [3, 30], 'asked again past the next pause, and answered');
});

test('a view\'s read held while the board is out is asked again at once where its document is forgotten, and in the guest form at the page\'s own death', async (t) => {
  t.mock.method(performance, 'now', () => 1000);
  const { fake, span } = homeAsking(UNREACHABLE, UNREACHABLE, script[FAKE.keyOf('op', { frame: F.retrieveDocVSpanSet(D) })]);
  REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  const sent = sessionsSent(fake);
  PUMP.pump();
  await new Promise((r) => setTimeout(r, 0));
  PUMP.pump();
  await new Promise((r) => setTimeout(r, 0));
  assert.equal(span.asks(), 1, 'held');
  PUMP.forget(D);
  PUMP.pump();
  await new Promise((r) => setTimeout(r, 0));
  assert.equal(span.asks(), 2, 'forgotten, its document\'s held read is asked again at once');
  fake.fire('session-died', { session: 's-1', reason: { arm: 'closed' } });
  await new Promise((r) => setTimeout(r, 0));
  PUMP.pump();
  await new Promise((r) => setTimeout(r, 0));
  assert.deepEqual([sent, REC.doc(D).extent], [['s-1', 's-1', 'guest'], 30], 'at the death, the read held under the session asked again at once as a guest, and answered');
});

test('the pause a read the board did not answer waits out settles at the daemon\'s running and at a change of the page\'s class — every pause woken there running its `woken` before anything awaiting one resumes — and past UNREACHED_MS where neither comes, never before', async (t) => {
  const fake = FAKE.create(script);
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.setBoard({ board: 'b-1', name: '', origin: '' });
  REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  /** @type {string[]} what the pauses did, in order */
  const order = [];
  /** a pause begun, its waking and the resumption of what awaits it recorded */
  const paused = (/** @type {string} */ name) => PUMP.afterPause(() => { order.push(name + ' woken'); }).then(() => { order.push(name + ' resumed'); });
  const both = Promise.all([paused('first'), paused('second')]);
  fake.fire('daemon', { board: 'b-1', state: 'running' });
  await both;
  assert.deepEqual(order, ['first woken', 'second woken', 'first resumed', 'second resumed'], 'at running: every pause woken, then what awaits each resumed, in the order begun');
  order.length = 0;
  const atDeath = paused('death');
  fake.fire('session-died', { session: 's-1', reason: { arm: 'closed' } });
  await atDeath;
  assert.deepEqual(order, ['death woken', 'death resumed'], 'at a change of the page\'s class');
  order.length = 0;
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const late = paused('late');
  t.mock.timers.tick(PUMP.UNREACHED_MS - 1);
  await Promise.resolve();
  assert.deepEqual(order, [], 'nothing inside the pause');
  t.mock.timers.tick(1);
  await late;
  assert.deepEqual(order, ['late woken', 'late resumed'], 'past UNREACHED_MS, no running having come');
});

test('the view\'s probe of a chain records no count where the board did not answer a member, and probes again as the daemon is back, recording the chain to its end', async (t) => {
  t.mock.method(performance, 'now', () => 1000);
  // "a version member answers its DOCUMENT's state" (wire.md §Namespace, `doc_metadata`)
  const member = script[FAKE.keyOf('op', { frame: F.docMetadata(D) })];
  const s = {
    ...script,
    [FAKE.keyOf('op', { frame: F.docMetadata(D + '.2') })]: member,
    [FAKE.keyOf('op', { frame: F.docMetadata(D + '.4') })]: { refused: { kind: 'refused', name: 'doc_not_registered', code: 'doc_not_registered' } },
  };
  const third = inTurn(s, F.docMetadata(D + '.3'), UNREACHABLE, member);
  const fake = FAKE.create(s);
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.setBoard({ board: 'b-1', name: '', origin: '' });
  REC.takeIndex(indexAt('complete'));
  PUMP.forget(D);
  await PUMP.loadWhole(D);
  // D read at its reading em, where the view probes its chain
  readAt(D, 30);
  PUMP.pump();
  await new Promise((r) => setTimeout(r, 0));
  assert.deepEqual([third.asks(), REC.doc(D).members], [1, null], 'D.2 answered and D.3 not: no count recorded, never a chain cut short at two');
  PUMP.pump();
  await new Promise((r) => setTimeout(r, 0));
  assert.equal(third.asks(), 1, 'held while the board is out');
  fake.fire('daemon', { board: 'b-1', state: 'running' });
  PUMP.pump();
  await new Promise((r) => setTimeout(r, 0));
  assert.deepEqual([third.asks(), REC.doc(D).members], [2, 3], 'probed again as the daemon is back: the chain to its end, D.4 not registered');
  assert.deepEqual(fake.unanswered, []);
});

/** a link of D's as `read_link` answers it: from a passage of D's own bytes to `to`, a citation */
const citation = (/** @type {number} */ ord, /** @type {Array<{start: string, width: string}>} */ to) => ({ result: { as_of: 1, resp: 'link_value', link: { slots: [[{ start: `${D}.0.1.${ord}`, width: '0.0.0.0.0.0.0.2' }], to, [{ start: '1.1.0.1.0.1.0.3.13', width: '0.0.0.0.0.0.0.0.1' }]] } } });
const passageOf = (/** @type {string} */ doc, /** @type {number} */ ord, /** @type {number} */ w) => [{ start: `${doc}.0.1.${ord}`, width: '0.0.0.0.0.0.0.' + w }];

test('at reading scale the view asks where each far end its read links send from a document sits now — one `project` per link and far slot, none for a document named whole or one a read found unregistered, none whose place the model holds, none again once answered — and the model holds the stretches, none, and what each refusal says of the far document', async () => {
  const FAR = '1.0.1.0.127', GHOST = '1.0.1.0.1049578', DEAD = '1.0.1.0.9', HIDDEN = '1.0.2.0.7';
  const [MOVED, FLOATS, TO_GHOST, TO_DEAD, HELD, TO_HIDDEN, AGAIN_GHOST, AGAIN_HIDDEN] = [3, 4, 5, 6, 8, 9, 10, 11].map((k) => `${D}.0.2.${k}`);
  /** @type {Record<string, unknown>} */
  const s = {
    ...script,
    [FAKE.keyOf('op', { frame: F.findLinksV(D, 1, 30) })]: { result: { as_of: 1, resp: 'addrs', addrs: [D + '.0.2.1', MOVED, FLOATS, TO_GHOST, TO_DEAD, HELD, TO_HIDDEN] } },
    [FAKE.keyOf('op', { frame: F.readLink(HELD) })]: citation(23, passageOf(FAR, 12, 2)),
    [FAKE.keyOf('op', { frame: F.readLink(MOVED) })]: citation(11, passageOf(FAR, 3, 4)),
    [FAKE.keyOf('op', { frame: F.readLink(FLOATS) })]: citation(14, passageOf(FAR, 8, 4)),
    [FAKE.keyOf('op', { frame: F.readLink(TO_GHOST) })]: citation(17, passageOf(GHOST, 1, 3)),
    [FAKE.keyOf('op', { frame: F.readLink(TO_DEAD) })]: citation(20, passageOf(DEAD, 1, 3)),
    [FAKE.keyOf('op', { frame: F.readLink(TO_HIDDEN) })]: citation(26, passageOf(HIDDEN, 1, 3)),
    // where each far end sits now: the passage stored at FAR's 3 moved to 40; the one stored at 8 gone from FAR's text; the ghost's
    // refused, the board saying nothing of the address; the one into another account's draft refused, withheld from the reader
    [FAKE.keyOf('op', { frame: F.project(MOVED, 2, FAR) })]: { result: { as_of: 1, resp: 'span_set', set: [{ start: '1.40', width: '0.4' }] } },
    [FAKE.keyOf('op', { frame: F.project(FLOATS, 2, FAR) })]: { result: { as_of: 1, resp: 'span_set', set: [] } },
    [FAKE.keyOf('op', { frame: F.project(TO_GHOST, 2, GHOST) })]: { refused: { kind: 'refused', name: 'doc_not_registered', code: 'doc_not_registered' } },
    [FAKE.keyOf('op', { frame: F.project(TO_HIDDEN, 2, HIDDEN) })]: { refused: { kind: 'refused', name: 'withheld', code: 'withheld' } },
    [FAKE.keyOf('op', { frame: F.project(AGAIN_HIDDEN, 2, HIDDEN) })]: { refused: { kind: 'refused', name: 'withheld', code: 'withheld' } },
    [FAKE.keyOf('op', { frame: F.docMetadata(D + '.2') })]: { refused: { kind: 'refused', name: 'doc_not_registered', code: 'doc_not_registered' } },
    ...noEditionLinks(FAR + '.2'),
  };
  const fake = FAKE.create(s);
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.setBoard({ board: 'b-1', name: '', origin: '' });
  REC.takeIndex(indexAt('complete'));
  PUMP.forget(D);
  await PUMP.loadWhole(D);
  REC.takeRefused(DEAD, 'unregistered');
  // one far end's place already held, as an act's projection leaves it
  REC.takeProjection(HELD, 2, FAR, [{ pos: 12, width: 2 }]);
  const projections = () => fake.asked.filter((k) => k.includes('"op":"project"'));
  // D at its reading em
  readAt(D, 30);
  PUMP.pump();
  await new Promise((r) => setTimeout(r, 0));
  assert.deepEqual(projections().sort(), [F.project(MOVED, 2, FAR), F.project(FLOATS, 2, FAR), F.project(TO_GHOST, 2, GHOST), F.project(TO_HIDDEN, 2, HIDDEN)].map((frame) => FAKE.keyOf('op', { frame })).sort(), 'one per far end: none for the citation of FAR whole, none into the document a read found unregistered, none whose place is held');
  assert.deepEqual([REC.projection(MOVED, 2, FAR), REC.projection(FLOATS, 2, FAR), REC.projection(TO_GHOST, 2, GHOST), REC.projection(TO_HIDDEN, 2, HIDDEN)], [[{ pos: 40, width: 4 }], [], 'unregistered', 'withheld'],
    'held: where it stands now, none for the floating end, and what each refusal says of its far document');
  assert.deepEqual([REC.doc(GHOST).refused, REC.has(HIDDEN) ? REC.doc(HIDDEN).refused : null], ['unregistered', null], 'the ghost known unregistered, as every read of the address would answer; the draft never marked withheld by its projection alone');
  PUMP.pump();
  await new Promise((r) => setTimeout(r, 0));
  assert.equal(projections().length, 4, 'none asked again once answered');
  // two more of D's links read: one into the ghost, one into the draft
  REC.takeLinks(D, [AGAIN_GHOST, AGAIN_HIDDEN]);
  for (const [addr, doc] of [[AGAIN_GHOST, GHOST], [AGAIN_HIDDEN, HIDDEN]]) REC.takeLink(/** @type {any} */ ({ addr, from: [{ start: `${D}.0.1.2`, width: '0.0.0.0.0.0.0.2', doc: D, account: '1.0.1', whole: false, subspace: 1, ordinal: 2, positions: 2 }], to: [{ start: `${doc}.0.1.4`, width: '0.0.0.0.0.0.0.2', doc, account: doc.split('.').slice(0, 3).join('.'), whole: false, subspace: 1, ordinal: 4, positions: 2 }], type: '1.1.0.1.0.1.0.3.13' }));
  PUMP.pump();
  await new Promise((r) => setTimeout(r, 0));
  assert.deepEqual(projections().slice(4), [FAKE.keyOf('op', { frame: F.project(AGAIN_HIDDEN, 2, HIDDEN) })], 'none into the ghost, the board having said nothing of it; one into the draft, for its projection alone said withheld');
  // FAR re-versioned: the feed names its new member, and where links project into its trunk is asked again
  fake.fire('feed', { board: 'b-1', update: { position: 3, at: 3, op: 'publish', docs: [FAR + '.2'], class: 'published' } });
  assert.deepEqual([REC.projection(MOVED, 2, FAR), REC.projection(HELD, 2, FAR)], [undefined, undefined], 'dropped with the trunk the row names a member of');
  PUMP.pump();
  await new Promise((r) => setTimeout(r, 0));
  assert.deepEqual(projections().slice(5).sort(), [F.project(MOVED, 2, FAR), F.project(FLOATS, 2, FAR), F.project(HELD, 2, FAR)].map((frame) => FAKE.keyOf('op', { frame })).sort(), 'each into FAR asked again, none into the ghost');
  assert.deepEqual(fake.unanswered.filter((k) => k !== FAKE.keyOf('op', { frame: F.project(HELD, 2, FAR) })), [], 'every other read the script expected');
});

test('at reading scale the view asks where the far end of a link on bytes a document transcludes sits now, as it asks of one on its own bytes, and the model holds it', async () => {
  const FAR = '1.0.1.0.127', S = '1.0.1.0.1003', L = S + '.0.2.1';
  /** @type {Record<string, unknown>} */
  const s = {
    ...script,
    // D's own twenty-six bytes, then four of S's it transcludes, readable here, from 27
    [FAKE.keyOf('op', { frame: F.retrieveV(D, 1, 30) })]: { result: { as_of: 1, resp: 'delivery', items: [{ content: 'Tumbler.\n\nThe first field.abcd' }] } },
    [FAKE.keyOf('op', { frame: F.image(D, 1, 30) })]: { result: { as_of: 1, resp: 'runs', runs: [{ i_start: D + '.0.1.1', width: '26' }, { i_start: S + '.0.1.1', width: '4' }] } },
    [FAKE.keyOf('op', { frame: F.findLinksV(D, 1, 30) })]: { result: { as_of: 1, resp: 'addrs', addrs: [L] } },
    // S's citation from two of the bytes D transcludes to a passage of FAR, which stands at FAR's 40 now
    [FAKE.keyOf('op', { frame: F.readLink(L) })]: { result: { as_of: 1, resp: 'link_value', link: { slots: [passageOf(S, 2, 2), passageOf(FAR, 3, 4), [{ start: '1.1.0.1.0.1.0.3.13', width: '0.0.0.0.0.0.0.0.1' }]] } } },
    [FAKE.keyOf('op', { frame: F.project(L, 2, FAR) })]: { result: { as_of: 1, resp: 'span_set', set: [{ start: '1.40', width: '0.4' }] } },
    [FAKE.keyOf('op', { frame: F.docMetadata(D + '.2') })]: { refused: { kind: 'refused', name: 'doc_not_registered', code: 'doc_not_registered' } },
  };
  const fake = FAKE.create(s);
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.setBoard({ board: 'b-1', name: '', origin: '' });
  REC.takeIndex(indexAt('complete'));
  PUMP.forget(D); PUMP.forget(S);
  await PUMP.loadWhole(D);
  assert.deepEqual(REC.doc(D).origins, [{ pos: 27, width: 4, doc: S }], 'the four bytes D transcludes from S');
  // D at its reading em
  readAt(D, 30);
  PUMP.pump();
  await new Promise((r) => setTimeout(r, 0));
  assert.deepEqual(fake.asked.filter((k) => k.includes('"op":"project"')), [FAKE.keyOf('op', { frame: F.project(L, 2, FAR) })], 'its far end asked once: the link\'s near end lies in bytes S minted, which D\'s text holds');
  assert.deepEqual(REC.projection(L, 2, FAR), [{ pos: 40, width: 4 }], 'held: where it stands now');
  assert.deepEqual(fake.unanswered, [], 'every read the script expected');
});

test('a view over a document\'s later columns reads its text from position 1 through one estimated column past the last in view, every column\'s place read from every line before it (issue #15); a view past the whole read\'s cap reads its columns in view alone, never joined to the text held from 1', async () => {
  const BIG = '1.0.1.0.5', HUGE = '1.0.1.0.6';
  /** @type {Record<string, unknown>} */
  const s = {};
  for (const [doc, extent] of /** @type {Array<[string, number]>} */ ([[BIG, 40000], [HUGE, 2000000]])) {
    s[FAKE.keyOf('op', { frame: F.retrieveDocVSpanSet(doc) })] = { result: { as_of: 1, resp: 'span_set', set: [{ start: '1.1', width: '0.' + extent }] } };
    s[FAKE.keyOf('op', { frame: F.docMetadata(doc) })] = { result: { as_of: 1, resp: 'doc_metadata', doc, published: true, owner: '1.0.1', birth: null, birth_extent: null, placed: null, base_extent: null, source: null } };
    s[FAKE.keyOf('op', { frame: F.findLinksV(doc, 1, extent) })] = { result: { as_of: 1, resp: 'addrs', addrs: [] } };
  }
  const fake = FAKE.create(s);
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.setBoard({ board: 'b-1', name: '', origin: '' });
  REC.takeIndex(/** @type {any} */ ({ docs: [BIG, HUGE].map((doc) => ({ doc, kind: 'edition', label: 'd', standing: 'public' })), counts: [{ account: '1.0.1', documents: 2 }], state: { arm: 'complete' } }));
  /** the camera over an estimated column of a document at its reading em */
  const over = (/** @type {string} */ addr, /** @type {number} */ extent, /** @type {number} */ k) => {
    const box = docBox(addr), e = estimate(extent, box), c = e.columns[k];
    CAM.setViewport(1440, 900); CAM.reach(e.fs); CAM.set(CAM.viewAt({ x: box.x + c.x + c.w / 2, y: box.y + c.y + c.h / 2 }, e.fs));
  };
  /** the text windows asked of a document, each [first position, one past the last] */
  const windows = (/** @type {string} */ addr) => fake.asked.filter((k) => k.startsWith('op:') && k.includes('"op":"retrieve_v"')).map((k) => JSON.parse(k.slice(3)).specs[0]).filter((x) => x.doc === addr).map((x) => {
    const from = Number(x.span.start.split('.').pop());
    return [from, from + Number(x.span.width.split('.').pop())];
  });
  // the extent read first, then the window
  for (const [doc, extent, k] of /** @type {Array<[string, number, number]>} */ ([[BIG, 40000, 9], [HUGE, 2000000, 300]])) {
    over(doc, extent, k);
    for (let i = 0; i < 6; i++) { PUMP.pump(); await new Promise((r) => setTimeout(r, 0)); }
  }
  const [big] = windows(BIG);
  assert.ok(big && big[0] === 1 && big[1] >= estimatedSpan(9)[1], `the window from position 1 through column 9's positions and on: ${JSON.stringify(big)}, column 9 holding ${estimatedSpan(9)}`);
  // HUGE: its first block held, the view over its column 300 — past the whole read's cap
  REC.takeSpanSet(HUGE, [{ subspace: 1, ordinal: 1, positions: 2000000 }]);
  REC.takeDelivery(HUGE, [{ pos: 1, width: 4096, kind: 'content', text: 'x'.repeat(4096), ref: null, origin: null }]);
  over(HUGE, 2000000, 300);
  const from = fake.asked.length;
  for (let i = 0; i < 6; i++) { PUMP.pump(); await new Promise((r) => setTimeout(r, 0)); }
  const huge = windows(HUGE).filter((w, i, all) => i >= all.length - (fake.asked.length - from));
  const w = huge[huge.length - 1];
  assert.ok(w && w[0] > PUMP.WHOLE_CAP && w[0] <= estimatedSpan(300)[0] && w[1] >= estimatedSpan(300)[1], `past the cap: the columns in view alone — ${JSON.stringify(w)}, column 300 holding ${estimatedSpan(300)}`);
  assert.ok(w[1] - w[0] < PUMP.WHOLE_CAP, 'never joined to the text held from position 1');
});

test('the span window reads the estimate at the measure in force: at a 480 px view the columns in view hold its narrower measure\'s positions, never the full measure\'s (issue #151)', () => {
  const HUGE = '1.0.1.0.12', extent = 2000000;
  REC.takeSpanSet(HUGE, [{ subspace: 1, ordinal: 1, positions: extent }]);
  const box = docBox(HUGE);
  try {
    CAM.setViewport(480, 900);
    const cpl = CAM.measure(), e = estimate(extent, box, cpl), c = e.columns[300];
    assert.ok(cpl < MEASURE_CPL && e.cpl === cpl, `480 px: a measure of ${cpl}`);
    CAM.reach(e.fs); CAM.set(CAM.viewAt({ x: box.x + c.x + c.w / 2, y: box.y + c.y + c.h / 2 }, e.fs));
    const w = /** @type {[number, number]} */ (PUMP.spanWindow(REC.doc(HUGE)));
    const [a, b] = estimatedSpan(300, cpl), [a66, b66] = estimatedSpan(300);
    assert.ok(w && w[0] <= a && w[1] >= b, `the window holds column 300's positions at ${cpl} characters, ${a}–${b}: ${JSON.stringify(w)}`);
    assert.ok(w[1] < a66 || w[0] > b66, `and none of what column 300 would hold at the full measure, ${a66}–${b66}`);
  } finally { CAM._reset(); }
});

test('a projection the board declines answers the refusal it met, and the model holds what it says of the far document — the document marked where the board will say nothing of it, never where it is withheld; one the board did not answer holds nothing', async () => {
  const L = D + '.0.2.7', FAR = '1.0.1.0.127', GHOST = '1.0.1.0.1049578', HIDDEN = '1.0.2.0.7';
  const declined = { refused: { kind: 'refused', name: 'not_a_link', code: 'not_a_link' } };
  const unregistered = { refused: { kind: 'refused', name: 'doc_not_registered', code: 'doc_not_registered' } };
  const withheld = { refused: { kind: 'refused', name: 'withheld', code: 'withheld' } };
  const s = {
    ...script, [FAKE.keyOf('op', { frame: F.project(L, 2, FAR) })]: declined, [FAKE.keyOf('op', { frame: F.project(L, 1, D) })]: UNREACHABLE,
    [FAKE.keyOf('op', { frame: F.project(L, 2, GHOST) })]: unregistered, [FAKE.keyOf('op', { frame: F.project(L, 2, HIDDEN) })]: withheld,
  };
  const fake = FAKE.create(s);
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.setBoard({ board: 'b-1', name: '', origin: '' });
  assert.deepEqual(await PUMP.projectEnd(L, 2, FAR), declined, 'its own refusal');
  assert.deepEqual([REC.projection(L, 2, FAR), REC.doc(FAR).refused], [{ refused: 'not_a_link' }, null], 'held refused by its name — the reason a far end\'s words give for not telling what its text holds (issue #153) — saying nothing of FAR');
  assert.deepEqual(await PUMP.projectEnd(L, 2, GHOST), unregistered);
  assert.deepEqual([REC.projection(L, 2, GHOST), REC.doc(GHOST).refused], ['unregistered', 'unregistered'], 'the board says nothing of the ghost: held so, of the projection and the document');
  assert.deepEqual(await PUMP.projectEnd(L, 2, HIDDEN), withheld);
  assert.deepEqual([REC.projection(L, 2, HIDDEN), REC.doc(HIDDEN).refused], ['withheld', null], 'withheld: held of the projection alone');
  assert.deepEqual(await PUMP.projectEnd(L, 1, D), UNREACHABLE, 'the board out: the refusal handed up');
  assert.equal(REC.projection(L, 1, D), undefined, 'and nothing learned of where it stands');
  assert.deepEqual(fake.unanswered, []);
});

/** past the chain's end, or no document there */
const NOT_REGISTERED = { refused: { kind: 'refused', name: 'doc_not_registered', code: 'doc_not_registered' } };
/** a delivery of one content run */
const delivery = (/** @type {string} */ text) => ({ result: { as_of: 1, resp: 'delivery', items: [{ content: text }] } });
/** the feed's row of a new version's `publish`, naming the member */
const published = (/** @type {string} */ member) => ({ board: 'b-1', update: { position: 3, at: 3, op: 'publish', docs: [member], class: 'published' } });
/** D's text before its new version's row and after it, thirty bytes each */
const [BEFORE, AFTER] = ['Tumbler.\n\nThe first field, old', 'Tumbler.\n\nThe first field, new'];

/** the view's reads asked and answered — at most `rounds` times — until nothing is missing and nothing is in flight */
async function settle(rounds = 50) {
  for (let i = 0; i < rounds && !PUMP.settled(); i++) await new Promise((r) => setTimeout(r, 0));
}

/** wait — at most twenty ticks, the view's needs pumped at each where `pumping` — until the fake port has received a call of `frame` */
async function untilAsked(/** @type {ReturnType<typeof FAKE.create>} */ fake, /** @type {object} */ frame, pumping = false) {
  const key = FAKE.keyOf('op', { frame });
  for (let i = 0; i < 20 && !fake.asked.includes(key); i++) { if (pumping) PUMP.pump(); await new Promise((r) => setTimeout(r, 0)); }
  assert.ok(fake.asked.includes(key), 'asked: ' + key);
}

/** the page a guest reads D at its reading em, the board's one edition, over a board answering `s`, each drop told to `onDrop` */
function readingD(/** @type {Record<string, unknown>} */ s, /** @type {(d: PUMP.Dropped) => void} */ onDrop = () => {}) {
  const fake = FAKE.create(s);
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {}, onDrop });
  REC.setBoard({ board: 'b-1', name: '', origin: '' });
  REC.takeIndex(indexAt('complete'));
  PUMP.forget(D);
  readAt(D, 30);
  return fake;
}

test('a view\'s read that lands after its document was dropped takes nothing and is asked again: the text read before a new version\'s row is never put back, and the image is read over the text read after it', async () => {
  const member = script[FAKE.keyOf('op', { frame: F.docMetadata(D) })];
  // D.2 the new version the row names, the chain's end past it; D's text before the row and after it
  const s = { ...script, [FAKE.keyOf('op', { frame: F.docMetadata(D + '.2') })]: member, [FAKE.keyOf('op', { frame: F.docMetadata(D + '.3') })]: NOT_REGISTERED };
  const text = inTurn(s, F.retrieveV(D, 1, 30), delivery(BEFORE), delivery(AFTER));
  const fake = readingD(s);
  const release = fake.hold('op', { frame: F.retrieveV(D, 1, 30) });
  await untilAsked(fake, F.retrieveV(D, 1, 30), true);
  fake.fire('feed', published(D + '.2'));
  release();
  await new Promise((r) => setTimeout(r, 0));
  assert.deepEqual([REC.doc(D).from, REC.textBetween(D, 1, 31)], [-1, ''], 'the text read before the row is not put back');
  await settle();
  assert.deepEqual([text.asks(), REC.textBetween(D, 1, 31)], [2, AFTER], 'asked again: the text read after the row held');
  assert.deepEqual(REC.doc(D).imageFor, [1, 31], 'and the image read over it');
  assert.deepEqual(fake.unanswered, []);
});

test('a view\'s projection that lands after the document projected into was dropped takes nothing, its refusal included, and is asked again', async () => {
  const FAR = '1.0.1.0.127', L = D + '.0.2.3';
  const s = {
    ...script,
    [FAKE.keyOf('op', { frame: F.findLinksV(D, 1, 30) })]: { result: { as_of: 1, resp: 'addrs', addrs: [L] } },
    [FAKE.keyOf('op', { frame: F.readLink(L) })]: citation(11, passageOf(FAR, 3, 4)),
    [FAKE.keyOf('op', { frame: F.docMetadata(D + '.2') })]: NOT_REGISTERED,
    ...noEditionLinks(FAR + '.2'),
  };
  // FAR withheld from the reader before its new version, readable after it, the passage at its 40
  const proj = inTurn(s, F.project(L, 2, FAR), { refused: { kind: 'refused', name: 'withheld', code: 'withheld' } }, { result: { as_of: 1, resp: 'span_set', set: [{ start: '1.40', width: '0.4' }] } });
  const fake = readingD(s);
  await PUMP.loadWhole(D);
  const release = fake.hold('op', { frame: F.project(L, 2, FAR) });
  PUMP.pump();
  await untilAsked(fake, F.project(L, 2, FAR));
  fake.fire('feed', published(FAR + '.2'));
  release();
  await new Promise((r) => setTimeout(r, 0));
  assert.equal(REC.projection(L, 2, FAR), undefined, 'the refusal read before FAR\'s row is not held: D, the document the link sends from, was never dropped');
  await settle();
  assert.deepEqual([proj.asks(), REC.projection(L, 2, FAR)], [2, [{ pos: 40, width: 4 }]], 'asked again: where it stands after the row held');
  assert.deepEqual(fake.unanswered, []);
});

test('a whole read its document is dropped under begins again: the text read before a new version\'s row is never taken, and the read answers the text read after it', async () => {
  const s = { ...script };
  const span = inTurn(s, F.retrieveDocVSpanSet(D), script[FAKE.keyOf('op', { frame: F.retrieveDocVSpanSet(D) })]);
  const text = inTurn(s, F.retrieveV(D, 1, 30), delivery(BEFORE), delivery(AFTER));
  const fake = FAKE.create(s);
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.setBoard({ board: 'b-1', name: '', origin: '' });
  const release = fake.hold('op', { frame: F.retrieveV(D, 1, 30) });
  const pending = PUMP.loadWhole(D);
  await untilAsked(fake, F.retrieveV(D, 1, 30));
  fake.fire('feed', published(D + '.2'));
  release();
  const d = await pending;
  assert.deepEqual([d?.extent, REC.textBetween(D, 1, 31)], [30, AFTER], 'the record whole, holding the text read after the row');
  assert.deepEqual([span.asks(), text.asks()], [2, 2], 'begun again: what the row dropped read again');
  assert.deepEqual(fake.unanswered, []);
});

test('a whole read across the page\'s own death begins again as a guest: the record answered holds its extent and metadata', async () => {
  const fake = FAKE.create(script);
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.setBoard({ board: 'b-1', name: '', origin: '' }); REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  const sent = sessionsSent(fake);
  const release = fake.hold('op', { frame: F.retrieveV(D, 1, 30) });
  const pending = PUMP.loadWhole(D);
  await untilAsked(fake, F.retrieveV(D, 1, 30));
  fake.fire('session-died', { session: 's-1', reason: { arm: 'closed' } });
  release();
  const d = await pending;
  assert.deepEqual([d?.extent, d?.meta?.doc, REC.textBetween(D, 1, 27)], [30, D, 'Tumbler.\n\nThe first field.'], 'the extent and metadata the death dropped read again, with the text');
  assert.deepEqual(sent.slice(0, 4), ['s-1', 's-1', 's-1', 's-1'], 'the pass before the death under the session: its extent, its metadata, and its text with its image');
  assert.ok(sent.slice(4).every((x) => x === 'guest'), 'every read after it in the guest form');
});

test('a whole read its document is dropped under at every pass ends after DROP_ATTEMPTS passes, holding nothing read before the last drop', async () => {
  const s = { ...script }, key = FAKE.keyOf('op', { frame: F.retrieveV(D, 1, 30) }), answer = script[key];
  let asks = 0;
  // a write lands on D as each of the first twenty text reads is answered
  Object.defineProperty(s, key, { enumerable: true, configurable: true, get: () => { if (++asks <= 20) REC.invalidate(D); return answer; } });
  PORT.boot(FAKE.create(s));
  REC.setBoard({ board: 'b-1', name: '', origin: '' });
  const d = await PUMP.loadWhole(D);
  assert.equal(asks, PUMP.DROP_ATTEMPTS, 'the text asked once a pass, DROP_ATTEMPTS passes');
  assert.deepEqual([d?.from, d?.extent, d?.meta, REC.textBetween(D, 1, 31)], [-1, null, null, ''], 'the record as the last drop left it');
});

test('the view\'s probe of a chain its trunk is dropped under records no count and probes again: a new member\'s row never leaves the count one short', async () => {
  const member = script[FAKE.keyOf('op', { frame: F.docMetadata(D) })];
  const s = { ...script, [FAKE.keyOf('op', { frame: F.docMetadata(D + '.2') })]: member, [FAKE.keyOf('op', { frame: F.docMetadata(D + '.4') })]: NOT_REGISTERED, ...noEditionLinks(D + '.3') };
  // D.3 past the chain's end before its row, a member after it
  const third = inTurn(s, F.docMetadata(D + '.3'), NOT_REGISTERED, member);
  const fake = readingD(s);
  await PUMP.loadWhole(D);
  const release = fake.hold('op', { frame: F.docMetadata(D + '.3') });
  PUMP.pump();
  await untilAsked(fake, F.docMetadata(D + '.3'));
  fake.fire('feed', published(D + '.3'));
  release();
  await new Promise((r) => setTimeout(r, 0));
  assert.equal(REC.doc(D).members, null, 'the end met before the row is not recorded');
  await settle();
  assert.deepEqual([third.asks(), REC.doc(D).members], [2, 3], 'probed again: the chain to its new end');
  assert.deepEqual(fake.unanswered, []);
});

/** the `doc_metadata` reads the fake port was asked since `from`, by the address each asked of */
const metadataAsked = (/** @type {ReturnType<typeof FAKE.create>} */ fake, from = 0) => fake.asked.slice(from).flatMap((k) => { const m = /^op:\{"doc":"([^"]*)","op":"doc_metadata"\}$/.exec(k); return m ? [m[1]] : []; });

test('a probe of a chain whose trunk\'s metadata the page does not hold asks its first member, never taking the chain for one of none: answered, the chain is counted from it to its end; not answered, nothing is recorded (issue #184)', async () => {
  const member = script[FAKE.keyOf('op', { frame: F.docMetadata(D) })];
  const s = { ...script, [FAKE.keyOf('op', { frame: F.docMetadata(D + '.2') })]: member, [FAKE.keyOf('op', { frame: F.docMetadata(D + '.3') })]: NOT_REGISTERED };
  inTurn(s, F.docMetadata(D + '.1'), UNREACHABLE, member);
  const fake = FAKE.create(s);
  PORT.boot(fake);
  REC.setBoard({ board: 'b-1', name: '', origin: '' });
  assert.equal(REC.doc(D).meta, null, 'no metadata held');
  const out = await PUMP.probeChain(D);
  assert.deepEqual([out?.n, out?.ended, out && out.met && out.met.kind, REC.doc(D).members], [0, false, 'unreachable', null], 'its first member not answered: nothing read, nothing recorded — never a count of none');
  assert.deepEqual(await PUMP.probeChain(D), { n: 2, ended: true, met: null }, 'asked again: its first and second answer, its third is not registered');
  assert.deepEqual([REC.doc(D).members, REC.doc(D).ended], [2, true]);
  assert.deepEqual(metadataAsked(fake), [D + '.1', D + '.1', D + '.2', D + '.3'], 'its members asked, from the first');
  assert.deepEqual(fake.unanswered, []);
});

test('the view\'s probe of a chain reads at most eight members and records them as read so far, never as the whole chain; an act\'s probe goes on from there to the end the board answers, which it records as the chain (issue #184)', async () => {
  const member = script[FAKE.keyOf('op', { frame: F.docMetadata(D) })];
  /** @type {Record<string, unknown>} D's ten members, its eleventh not registered */
  const s = { ...script, [FAKE.keyOf('op', { frame: F.docMetadata(D + '.11') })]: NOT_REGISTERED };
  for (let k = 2; k <= 10; k++) s[FAKE.keyOf('op', { frame: F.docMetadata(D + '.' + k) })] = member;
  const fake = readingD(s);
  await PUMP.loadWhole(D);
  const from = fake.asked.length, waiting = PUMP.retriesPending();
  PUMP.pump();
  await settle();
  assert.deepEqual([REC.doc(D).members, REC.doc(D).ended, PUMP.retriesPending()], [8, false, waiting], 'eight members read: the end not met, and nothing held to be asked again');
  assert.deepEqual(metadataAsked(fake, from), [2, 3, 4, 5, 6, 7, 8].map((k) => D + '.' + k), 'its second to its eighth asked, its birth its first');
  PUMP.pump();
  await settle();
  assert.equal(metadataAsked(fake, from).length, 7, 'the count recorded: the view asks no more');
  const act = fake.asked.length;
  assert.deepEqual(await PUMP.probeChain(D), { n: 10, ended: true, met: null }, 'an act\'s probe: read on to the end');
  assert.deepEqual(metadataAsked(fake, act), [D + '.9', D + '.10', D + '.11'], 'from the ninth, never a member read before');
  assert.deepEqual([REC.doc(D).members, REC.doc(D).ended], [10, true]);
  assert.deepEqual(fake.unanswered, []);
});

test('an act\'s probe goes on past the members a probe before it read, asking the next first; one stopped at a refusal the board gave records the members read as read so far (issue #184)', async () => {
  const member = script[FAKE.keyOf('op', { frame: F.docMetadata(D) })];
  const withheld = { refused: { kind: 'refused', name: 'withheld', code: 'withheld' } };
  const s = { ...script, [FAKE.keyOf('op', { frame: F.docMetadata(D + '.4') })]: member, [FAKE.keyOf('op', { frame: F.docMetadata(D + '.5') })]: withheld };
  const fake = FAKE.create(s);
  PORT.boot(fake);
  REC.setBoard({ board: 'b-1', name: '', origin: '' });
  await PUMP.loadWhole(D);
  const from = fake.asked.length;
  const out = await PUMP.probeChain(D, () => true, 3);
  assert.deepEqual([out?.n, out?.ended, out && out.met && out.met.kind, out && out.met && out.met.name], [4, false, 'refused', 'withheld'], 'three read before: the fourth answers, the fifth is refused');
  assert.deepEqual(metadataAsked(fake, from), [D + '.4', D + '.5'], 'the fourth asked first');
  assert.deepEqual([REC.doc(D).members, REC.doc(D).ended], [4, false], 'recorded as read so far, never as the chain');
  assert.deepEqual(fake.unanswered, []);
});

test('a probe of a chain keeps each member\'s age as its metadata answered it — a feed row naming the trunk dropping none, a change of the page\'s class every one — and an act\'s read of a member the probe never asked, its birth, keeps that one\'s too (issue #22)', async () => {
  const meta = script[FAKE.keyOf('op', { frame: F.docMetadata(D) })];
  /** member k's metadata as the board answers it: minted at 100 + k, the feed's row for it standing */
  const aged = (/** @type {number} */ k) => ({ result: { ...meta.result, at: 100 + k, time: 1792000000000 + k, time_from: 'feed' } });
  const age = (/** @type {number} */ k) => ({ at: 100 + k, time: 1792000000000 + k, from: 'feed' });
  const s = { ...script, [FAKE.keyOf('op', { frame: F.docMetadata(D + '.4') })]: NOT_REGISTERED };
  for (const k of [1, 2, 3]) s[FAKE.keyOf('op', { frame: F.docMetadata(D + '.' + k) })] = aged(k);
  const fake = FAKE.create(s);
  PORT.boot(fake);
  REC.setBoard({ board: 'b-1', name: '', origin: '' });
  await PUMP.loadWhole(D);
  assert.deepEqual(await PUMP.probeChain(D), { n: 3, ended: true, met: null });
  assert.deepEqual([1, 2, 3].map((k) => REC.memberAge(D + '.' + k)), [undefined, age(2), age(3)], 'the second and third as their metadata answered; the first, the birth the trunk names, never asked');
  assert.deepEqual([await PUMP.ageOf(D + '.1'), REC.memberAge(D + '.1')], [{ age: age(1) }, age(1)], 'an act\'s read of the first, kept');
  REC.applyFeedUpdate(/** @type {any} */ ({ position: 5, at: 5, op: 'insert', docs: [D], class: 'published' }));
  assert.deepEqual(REC.memberAge(D + '.2'), age(2), 'a feed row naming the trunk drops no member\'s age: a mint\'s age never changes');
  REC.sessionDied({ arm: 'closed' });
  assert.deepEqual([1, 2, 3].map((k) => REC.memberAge(D + '.' + k)), [undefined, undefined, undefined], 'a change of the page\'s class drops every one');
  assert.deepEqual(fake.unanswered, []);
});

test('an act\'s projection the document projected into is dropped under is asked again and holds where the end stands after the row; dropped at every ask, it answers after DROP_ATTEMPTS asks and holds nothing', async () => {
  const FAR = '1.0.1.0.127', L = D + '.0.2.3';
  const at = (/** @type {number} */ pos) => ({ result: { as_of: 1, resp: 'span_set', set: [{ start: '1.' + pos, width: '0.4' }] } });
  /** @type {Record<string, unknown>} */
  const s = {};
  // the passage at FAR's 3 before FAR's new version, at its 40 after it
  const proj = inTurn(s, F.project(L, 2, FAR), at(3), at(40));
  const fake = FAKE.create(s);
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.setBoard({ board: 'b-1', name: '', origin: '' });
  const release = fake.hold('op', { frame: F.project(L, 2, FAR) });
  const pending = PUMP.projectEnd(L, 2, FAR);
  await untilAsked(fake, F.project(L, 2, FAR));
  fake.fire('feed', published(FAR + '.2'));
  release();
  assert.deepEqual(await pending, { runs: [{ pos: 40, width: 4 }] }, 'where it stands after the row');
  assert.deepEqual([proj.asks(), REC.projection(L, 2, FAR)], [2, [{ pos: 40, width: 4 }]], 'asked again, and held');
  let asks = 0;
  // a write lands on D as each of the first twenty projections into it is answered
  Object.defineProperty(s, FAKE.keyOf('op', { frame: F.project(L, 1, D) }), { enumerable: true, configurable: true, get: () => { if (++asks <= 20) REC.invalidate(D); return at(7); } });
  assert.deepEqual(await PUMP.projectEnd(L, 1, D), { runs: [{ pos: 7, width: 4 }] }, 'its outcome answered to the act');
  assert.deepEqual([asks, REC.projection(L, 1, D)], [PUMP.DROP_ATTEMPTS, undefined], 'after DROP_ATTEMPTS asks, nothing held');
});

test('an image asked for a window a text read widens before it lands is placed from the window it was asked for', async () => {
  const s = { ...script, [FAKE.keyOf('op', { frame: F.image(D, 11, 20) })]: { result: { as_of: 1, resp: 'runs', runs: [{ i_start: D + '.0.1.11', width: '20' }] } } };
  const fake = readingD(s);
  // D's extent, metadata, links and chain held, and its text from 11 on
  REC.takeSpanSet(D, [{ subspace: 1, ordinal: 1, positions: 30 }]);
  REC.takeMetadata(D, { doc: D, published: true, owner: '1.0.1', birth: D + '.1', birthExtent: 30, placed: null, baseExtent: null, source: null, asOf: 1 });
  REC.takeLinks(D, []); REC.takeMembers(D, 1);
  REC.takeDelivery(D, [{ pos: 11, width: 20, kind: 'content', text: 'The first field.abcd', ref: null, origin: null }]);
  const release = fake.hold('op', { frame: F.image(D, 11, 20) });
  PUMP.pump();
  await new Promise((r) => setTimeout(r, 0));
  assert.deepEqual([fake.asked.includes(FAKE.keyOf('op', { frame: F.image(D, 11, 20) })), REC.doc(D).from], [true, 1], 'the image asked for 11 on, and the text read from 1 landed before it');
  release();
  await new Promise((r) => setTimeout(r, 0));
  assert.deepEqual(REC.doc(D).image.map((r) => [r.pos, r.width, r.ordinal]), [[11, 20, 11]], 'placed at 11, where it was asked');
  assert.deepEqual(fake.unanswered, []);
});

test('a bare feed row — its docs null — names the home of the link it deposited by its link alone, whatever the row\'s op: the home the view shows stands as held while it is read again — its extent, and its links with the new one — and the new link is read', async () => {
  const [L1, L2, L3] = [1, 2, 3].map((k) => `${D}.0.2.${k}`);
  const toFar = [{ start: '1.0.1.0.127', width: '0.0.0.0.1' }];
  const s = {
    ...script, [FAKE.keyOf('op', { frame: F.readLink(L2) })]: citation(14, toFar), [FAKE.keyOf('op', { frame: F.readLink(L3) })]: citation(17, toFar),
    // D's chain, counted from its first member as it is read again: one member, the second not registered
    [FAKE.keyOf('op', { frame: F.docMetadata(D + '.1') })]: script[FAKE.keyOf('op', { frame: F.docMetadata(D) })], [FAKE.keyOf('op', { frame: F.docMetadata(D + '.2') })]: NOT_REGISTERED,
  };
  const span = inTurn(s, F.retrieveDocVSpanSet(D), script[FAKE.keyOf('op', { frame: F.retrieveDocVSpanSet(D) })]);
  const touching = (/** @type {string[]} */ addrs) => ({ result: { as_of: 1, resp: 'addrs', addrs } });
  // D's links before each write and after it
  inTurn(s, F.findLinksV(D, 1, 30), touching([L1]), touching([L1, L2]), touching([L1, L2, L3]));
  const fake = readingD(s);
  await settle();
  assert.deepEqual([span.asks(), [...REC.doc(D).links]], [1, [L1]], 'D read at its reading em, its one link');
  // a replacing make_link served bare: its op and its link, its docs lost (wire.md §The change feed)
  fake.fire('feed', { board: 'b-1', update: { position: 4, at: 4, op: 'make_link', docs: null, key: null, time: null, link: L2, class: 'published' } });
  assert.deepEqual([REC.doc(D).extent, REC.textBetween(D, 1, 9), [...REC.doc(D).links]], [30, 'Tumbler.', [L1]], 'the link\'s home, in view, stands as held');
  await settle();
  assert.deepEqual([span.asks(), REC.doc(D).extent, [...REC.doc(D).links], REC.link(L2)?.addr], [2, 30, [L1, L2], L2], 'read again: its extent, and its links with the new one, read');
  // a plain make_link, an emit or an assert_sup served bare: the link alone, the op unnamed
  fake.fire('feed', { board: 'b-1', update: { position: 5, at: 5, op: null, docs: null, key: null, time: null, link: L3, class: 'published' } });
  assert.deepEqual([REC.doc(D).extent, [...REC.doc(D).links]], [30, [L1, L2]], 'a row naming no op keeps the home as held as well');
  await settle();
  assert.deepEqual([span.asks(), REC.doc(D).extent, [...REC.doc(D).links]], [3, 30, [L1, L2, L3]], 'and reads it again');
  assert.deepEqual(fake.unanswered, []);
});

// ---- the edition claims on a withheld run's origin -------------------------------------------------------------------

/** D's withheld run's origin, and two claims of the edition class on it: the owner's edition over its own bytes, a delegate's quoting the draft — each homed out of the view D is read at */
const O = '1.0.1.0.1003', [EDITION, FORK] = ['1.0.1.0.30.0.2.1', '1.0.1.1.0.4.0.2.1'], [EDITION_HOME, FORK_HOME] = ['1.0.1.0.30', '1.0.1.1.0.4'];
/** the lookup's answer: the claims it lists */
const claimsOn = (/** @type {string[]} */ addrs) => ({ result: { as_of: 1, resp: 'addrs', addrs } });
/** a claim's link as `read_link` answers it: FROM `from`, TO the origin whole, typed R20 */
const claimLink = (/** @type {Array<{start: string, width: string}>} */ from) => ({ result: { as_of: 1, resp: 'link_value', link: { slots: [from, [{ start: O, width: '0.0.0.0.1' }], [{ start: F.EDITION_CLASS, width: '0.0.0.0.0.0.0.0.1' }]] } } });
/** a published home's metadata */
const homeMeta = (/** @type {string} */ home, /** @type {string} */ owner) => ({ result: { as_of: 1, resp: 'doc_metadata', doc: home, published: true, owner, birth: home + '.1', birth_extent: '20', placed: null, base_extent: null, source: null } });
/** a board answering `s`, the two claims' links and their homes' metadata beside it, D's chain ending at its first member */
const claimed = (/** @type {Record<string, unknown>} */ s) => Object.assign(s, {
  [FAKE.keyOf('op', { frame: F.readLink(EDITION) })]: claimLink(passageOf(EDITION_HOME, 1, 20)),
  [FAKE.keyOf('op', { frame: F.readLink(FORK) })]: claimLink(passageOf(O, 1, 4)),
  [FAKE.keyOf('op', { frame: F.docMetadata(EDITION_HOME) })]: homeMeta(EDITION_HOME, '1.0.1'),
  [FAKE.keyOf('op', { frame: F.docMetadata(FORK_HOME) })]: homeMeta(FORK_HOME, '1.0.1.1'),
  [FAKE.keyOf('op', { frame: F.docMetadata(D + '.2') })]: NOT_REGISTERED,
});
/** what the pump asked of the origin, the claims and their homes in tests before this one asked anew */
const forgetClaims = () => { for (const a of [O, EDITION_HOME, FORK_HOME]) PUMP.forget(a); };

test('at reading scale the view asks the edition claims on the origin of each withheld run its document holds — the active view\'s lookup, never the audit view\'s `edition_claims` — and each listed claim\'s link and its home\'s metadata, once; a row that changes none of them — a write elsewhere, a link that is no claim on the origin, the edition-class links homed in the documents it names as they were, a supersession — leaves them held and asks no lookup again; a row naming nothing drops none, the refresh after it asking them again (issues #212, #272)', async () => {
  // D's first member as the board answers it, which the refresh counts D's chain from
  const s = claimed({ ...script, [FAKE.keyOf('op', { frame: F.docMetadata(D + '.1') })]: script[FAKE.keyOf('op', { frame: F.docMetadata(D) })] });
  // the two claims at the view's lookup; the edition's alone at the refresh's
  const lookup = inTurn(s, F.editionClaimsAt(O), claimsOn([EDITION, FORK]), claimsOn([EDITION]));
  const CITES = '1.0.2.0.5.0.2.1', NONE = '1.0.2.0.5.0.2.2';
  Object.assign(s, {
    // a citation of the origin, which is no edition claim; and an address no link resides at
    [FAKE.keyOf('op', { frame: F.readLink(CITES) })]: { result: { as_of: 1, resp: 'link_value', link: { slots: [passageOf('1.0.2.0.5', 1, 3), [{ start: O, width: '0.0.0.0.1' }], [{ start: '1.1.0.1.0.1.0.3.13', width: '0.0.0.0.0.0.0.0.1' }]] } } },
    [FAKE.keyOf('op', { frame: F.readLink(NONE) })]: { result: { as_of: 1, resp: 'link_value', link: null } },
    // the edition-class links homed in the documents the rows name: none; the edition's own home the edition alone
    ...noEditionLinks('1.0.2.0.5', '1.0.2.0.6.1', EDITION_HOME + '.2'),
    [FAKE.keyOf('op', { frame: F.editionLinksIn(EDITION_HOME) })]: claimsOn([EDITION]),
  });
  const fake = readingD(s);
  forgetClaims();
  await settle();
  const times = (/** @type {object} */ frame) => fake.asked.filter((k) => k === FAKE.keyOf('op', { frame })).length;
  assert.deepEqual([lookup.asks(), REC.editionClaimsOf(O)], [1, [EDITION, FORK]], 'the lookup asked once, its claims held');
  assert.deepEqual([F.readLink(EDITION), F.readLink(FORK), F.docMetadata(EDITION_HOME), F.docMetadata(FORK_HOME)].map(times), [1, 1, 1, 1], 'each claim\'s link and each home\'s metadata read once');
  assert.deepEqual([REC.link(FORK)?.from[0].doc, REC.doc(FORK_HOME).meta?.owner], [O, '1.0.1.1'], 'held where the clause reads them');
  assert.ok(!fake.asked.some((k) => k.includes('"op":"edition_claims"')), 'never the audit view\'s edition_claims, which refuses withheld at an origin the reader may not read');
  const drops = REC.claimDropsOf(O);
  /** @type {Array<Record<string, unknown>>} */
  const rows = [
    { op: 'insert', docs: ['1.0.2.0.5'] }, { op: 'make_link', docs: ['1.0.2.0.5'], link: CITES }, { op: 'emit', docs: ['1.0.2.0.5'] },
    { op: 'edit_link', docs: ['1.0.2.0.5'] }, { op: 'nullify', docs: ['1.0.2.0.5'] }, { op: 'assert_sup', docs: ['1.0.2.0.5'] },
    { op: 'publish', docs: ['1.0.2.0.6.1'] }, { op: 'publish', docs: [EDITION_HOME + '.2', EDITION_HOME] },
    // a bare row (wire.md §The change feed): a link the journal names, its op unnamed — a make_link, an emit or an assert_sup
    { op: null, docs: null, link: NONE },
  ];
  for (const [i, row] of rows.entries()) {
    const what = row.op ?? 'bare link';
    fake.fire('feed', { board: 'b-1', update: { position: 5 + i, at: 5 + i, class: 'published', ...row } });
    assert.deepEqual(REC.editionClaimsOf(O), [EDITION, FORK], `a ${what} row drops no claim`);
    await settle();
    assert.deepEqual([lookup.asks(), REC.editionClaimsOf(O), REC.claimDropsOf(O)], [1, [EDITION, FORK], drops], `a ${what} row changing none of them: held, no lookup asked again, no change counted`);
  }
  assert.deepEqual([times(F.readLink(CITES)), times(F.readLink(NONE)), times(F.editionLinksIn('1.0.2.0.5')), times(F.editionLinksIn(EDITION_HOME + '.2')), times(F.editionLinksIn(EDITION_HOME))], [1, 1, 3, 1, 1],
    'each link a row names read once; each document an emit, an edit_link, a nullify or a publish names read for the edition-class links homed there — the publish of the edition\'s second member at the member and at the edition its claim is homed in, a home holding its own links alone (wire.md §Link discovery reads) — never for an insert or a supersession');
  // a write the journal decides nothing of, every term null — an edit_link, or a publish under a node no walk reaches, among
  // others: the claims stand as it comes, the board marked; the refresh after the run asks them again with what they wait on
  fake.fire('feed', { board: 'b-1', update: { position: 5 + rows.length, at: 5 + rows.length, class: 'published', op: null, docs: null, link: null } });
  assert.deepEqual([REC.editionClaimsOf(O), REC.bare()], [[EDITION, FORK], true], 'a row naming nothing: the claims stand, the board marked');
  await PUMP.refresh();
  await settle();
  assert.deepEqual([lookup.asks(), REC.editionClaimsOf(O)], [2, [EDITION]], 'the refresh asks the lookup again, and holds what it answers now');
  assert.deepEqual([F.readLink(EDITION), F.readLink(FORK), F.docMetadata(EDITION_HOME), F.docMetadata(FORK_HOME)].map(times), [2, 1, 3, 1], 'and the claim it lists and its link once more, its home\'s metadata read again by the publish naming that home as well');
  assert.deepEqual(fake.unanswered, []);
});

/** a claim of the edition class on O homed in `home`, its link answered over the home's own bytes, and the home published */
const claimAt = (/** @type {string} */ home) => ({ [FAKE.keyOf('op', { frame: F.readLink(home + '.0.2.1') })]: claimLink(passageOf(home, 1, 20)), [FAKE.keyOf('op', { frame: F.docMetadata(home) })]: homeMeta(home, '1.0.1') });
/** the number of times the fake port was asked a frame, held calls among them */
const askedOf = (/** @type {ReturnType<typeof FAKE.create>} */ fake, /** @type {object} */ frame) => fake.asked.filter((k) => k === FAKE.keyOf('op', { frame })).length;
/** wait, at most forty ticks, until a condition holds */
async function until(/** @type {() => boolean} */ cond, /** @type {string} */ what) {
  for (let i = 0; i < 40 && !cond(); i++) await new Promise((r) => setTimeout(r, 0));
  assert.ok(cond(), what);
}

test('a make_link whose link is an edition claim on the origin, a nullify retracting one the origin lists and a publish whose edition homes a new one each change the claims on an origin a document the view shows windows: they stand as held at every step until their read again sets them in one step; a row changing them while that read is out queues one more read, never one a row (issue #272\'s design decision: "a link write drops only the edition claims it writes, retracts or supersedes"; "Rows arriving while a read is out queue one more read")', async () => {
  const [NEW_HOME, PUB_HOME, Q_HOME, R_HOME] = ['1.0.1.0.31', '1.0.1.0.32', '1.0.1.0.33', '1.0.1.0.34'], [NEW, PUB, Q, R] = [NEW_HOME, PUB_HOME, Q_HOME, R_HOME].map((h) => h + '.0.2.1');
  const s = claimed({ ...script, ...claimAt(NEW_HOME), ...claimAt(PUB_HOME), ...claimAt(Q_HOME), ...claimAt(R_HOME) });
  // the lookup as each change leaves the claims: the new claim beside the two; the fork's retracted; the publish's claim beside the rest; then the two the queued rows write
  const lookup = inTurn(s, F.editionClaimsAt(O), claimsOn([EDITION, FORK]), claimsOn([EDITION, FORK, NEW]), claimsOn([EDITION, NEW]), claimsOn([EDITION, NEW, PUB]), claimsOn([EDITION, NEW, PUB, Q]), claimsOn([EDITION, NEW, PUB, Q, R]));
  Object.assign(s, noEditionLinks(FORK_HOME, PUB_HOME + '.1'), { [FAKE.keyOf('op', { frame: F.editionLinksIn(PUB_HOME) })]: claimsOn([PUB]) });
  const fake = readingD(s);
  forgetClaims();
  await settle();
  assert.deepEqual(REC.editionClaimsOf(O), [EDITION, FORK], 'the claims held, D shown');
  // every state of the claims the model held from the first row on
  let watching = true;
  /** @type {string[]} */
  const held = [];
  REC.watch(() => { if (!watching) return; const c = JSON.stringify(REC.editionClaimsOf(O) ?? null); if (held[held.length - 1] !== c) held.push(c); });
  /** @type {Array<[string, Record<string, unknown>, string[]]>} each change: its row and the claims its read again sets */
  const changes = [
    ['a make_link writing a claim', { op: 'make_link', docs: [NEW_HOME], link: NEW }, [EDITION, FORK, NEW]],
    ['a nullify retracting the fork\'s', { op: 'nullify', docs: [FORK_HOME] }, [EDITION, NEW]],
    ['a publish whose edition homes a new one', { op: 'publish', docs: [PUB_HOME + '.1', PUB_HOME] }, [EDITION, NEW, PUB]],
  ];
  for (const [i, [what, row, after]] of changes.entries()) {
    const before = REC.editionClaimsOf(O), drops = REC.claimDropsOf(O);
    fake.fire('feed', { board: 'b-1', update: { position: 10 + i, at: 10 + i, class: 'published', ...row } });
    assert.deepEqual(REC.editionClaimsOf(O), before, `${what}: the claims held as the row comes`);
    await settle();
    assert.deepEqual([REC.editionClaimsOf(O), lookup.asks(), REC.claimDropsOf(O)], [after, 2 + i, drops + 1], `${what}: one change counted, one lookup again, its answer set`);
  }
  assert.deepEqual(held, [JSON.stringify([EDITION, FORK]), ...changes.map(([, , after]) => JSON.stringify(after))], 'from one set of claims to the next, in one step each: never dropped between');
  // two rows writing claims while the read again of them is out: one more read, never one a row
  const release = fake.hold('op', { frame: F.editionClaimsAt(O) });
  fake.fire('feed', { board: 'b-1', update: { position: 20, at: 20, class: 'published', op: 'make_link', docs: [Q_HOME], link: Q } });
  await until(() => askedOf(fake, F.editionClaimsAt(O)) === 5, 'the first row\'s read again asked');
  fake.fire('feed', { board: 'b-1', update: { position: 21, at: 21, class: 'published', op: 'make_link', docs: [R_HOME], link: R } });
  await until(() => askedOf(fake, F.readLink(R)) >= 1, 'the second row\'s link read');
  await new Promise((r) => setTimeout(r, 0));
  assert.deepEqual([askedOf(fake, F.editionClaimsAt(O)), REC.editionClaimsOf(O)], [5, [EDITION, NEW, PUB]], 'the second row joins the read out: no lookup of its own, the claims held');
  release();
  await settle();
  watching = false;
  assert.deepEqual([askedOf(fake, F.editionClaimsAt(O)), REC.editionClaimsOf(O)], [6, [EDITION, NEW, PUB, Q, R]], 'one more read after the one the rows overtook, which set nothing: its answer set');
  assert.ok(!held.includes(JSON.stringify([EDITION, NEW, PUB, Q])), 'the read the second row overtook set nothing');
  assert.deepEqual(fake.unanswered, []);
});

test('a row changing the claims on an origin no document the view shows windows drops them, and tells the documents windowing it, so a reader of them reads the clause anew; one changing an origin the view shows tells them once its read again sets them (issue #272)', async () => {
  const NEW_HOME = '1.0.1.0.31', NEW = NEW_HOME + '.0.2.1', NEXT_HOME = '1.0.1.0.35', NEXT = NEXT_HOME + '.0.2.1';
  const s = claimed({ ...script, ...claimAt(NEW_HOME), ...claimAt(NEXT_HOME) });
  inTurn(s, F.editionClaimsAt(O), claimsOn([EDITION, FORK]), claimsOn([EDITION, FORK, NEW]), claimsOn([EDITION, FORK, NEW, NEXT]));
  const fake = FAKE.create(s);
  PORT.boot(fake);
  /** @type {import('./pump.js').Dropped[]} */
  const told = [];
  PUMP.start({ onDirty: () => {}, onDrop: (x) => { told.push(x); } });
  REC.setBoard({ board: 'b-1', name: '', origin: '' });
  REC.takeIndex(indexAt('complete'));
  PUMP.forget(D); forgetClaims();
  await PUMP.loadWhole(D);
  assert.deepEqual([REC.editionClaimsOf(O), PUMP.visibleDocs().map((d) => d.addr)], [[EDITION, FORK], []], 'the claims held, the view far from D');
  fake.fire('feed', { board: 'b-1', update: { position: 10, at: 10, class: 'published', op: 'make_link', docs: [NEW_HOME], link: NEW } });
  await settle();
  assert.equal(REC.editionClaimsOf(O), undefined, 'out of view: dropped, for the view to ask when it shows them');
  assert.ok(told.some((x) => x.row === null && JSON.stringify(x.addrs) === JSON.stringify([D])), `the documents windowing the origin told: ${JSON.stringify(told.map((x) => x.addrs))}`);
  // a change of them with D shown, its claim homed where no claim on the origin is: told once the read again sets the claims
  await PUMP.loadWhole(D);
  readAt(D, 30);
  await settle();
  assert.deepEqual(REC.editionClaimsOf(O), [EDITION, FORK, NEW], 'read again with D, D shown');
  told.length = 0;
  fake.fire('feed', { board: 'b-1', update: { position: 11, at: 11, class: 'published', op: 'make_link', docs: [NEXT_HOME], link: NEXT } });
  assert.deepEqual(REC.editionClaimsOf(O), [EDITION, FORK, NEW], 'held as the row comes');
  await settle();
  assert.deepEqual([REC.editionClaimsOf(O), told.filter((x) => x.row === null).map((x) => x.addrs)], [[EDITION, FORK, NEW, NEXT], [[D]]], 'shown: set again, and told once after');
  assert.deepEqual(fake.unanswered, []);
});

test('a row naming the home of an edition claim on an origin a document the view shows windows keeps that home as held — the clause decided at every step — and reads it again, telling the documents windowing the origin once it is set; one naming a home of a claim on an origin out of view drops it and tells them at once (issue #272)', async () => {
  const s = claimed({ ...script });
  inTurn(s, F.editionClaimsAt(O), claimsOn([EDITION, FORK]));
  const fake = FAKE.create(s);
  PORT.boot(fake);
  /** @type {import('./pump.js').Dropped[]} */
  const told = [];
  PUMP.start({ onDirty: () => {}, onDrop: (x) => { told.push(x); } });
  REC.setBoard({ board: 'b-1', name: '', origin: '' });
  REC.takeIndex(indexAt('complete'));
  PUMP.forget(D); forgetClaims();
  readAt(D, 30);
  await settle();
  assert.deepEqual([REC.editionClaimsOf(O), REC.doc(EDITION_HOME).meta?.published], [[EDITION, FORK], true], 'the claims and their homes read, D shown');
  const pointer = { id: 'C-67.pointer', text: t('C-67.pointer'), claim: EDITION, home: EDITION_HOME };
  assert.deepEqual(clauseOf(O), pointer, 'the clause the pointer to the owner\'s edition');
  /** @type {unknown[]} every other clause the model decided from the row on */
  const other = [];
  let watching = true;
  REC.watch(() => { const c = clauseOf(O); if (watching && JSON.stringify(c) !== JSON.stringify(pointer)) other.push(c); });
  const before = askedOf(fake, F.docMetadata(EDITION_HOME));
  told.length = 0;
  fake.fire('feed', { board: 'b-1', update: { position: 10, at: 10, class: 'published', op: 'insert', docs: [EDITION_HOME] } });
  assert.ok(REC.doc(EDITION_HOME).meta, 'the home kept as the row comes');
  await settle();
  watching = false;
  assert.deepEqual([other, askedOf(fake, F.docMetadata(EDITION_HOME)) - before], [[], 1], 'the clause the pointer at every step, never undecided, and the home\'s metadata read again once');
  assert.ok(told.some((x) => x.row === null && JSON.stringify(x.addrs) === JSON.stringify([D])), `told once it is set: ${JSON.stringify(told.map((x) => x.addrs))}`);
  // out of view: the home dropped, the documents windowing the origin told at once
  CAM._reset();
  told.length = 0;
  fake.fire('feed', { board: 'b-1', update: { position: 11, at: 11, class: 'published', op: 'insert', docs: [FORK_HOME] } });
  assert.deepEqual([REC.doc(FORK_HOME).meta, told.filter((x) => x.row === null).map((x) => x.addrs)], [null, [[D]]], 'dropped, and told at once');
  assert.deepEqual(fake.unanswered, []);
});

test('a lookup of the edition claims that lands after a row changed them takes nothing: the claims answered after the row held, never the ones before it (issue #272)', async () => {
  const s = claimed({ ...script });
  const lookup = inTurn(s, F.editionClaimsAt(O), claimsOn([FORK]), claimsOn([EDITION, FORK]));
  const fake = readingD(s);
  forgetClaims();
  let watching = true, before = false;
  REC.watch(() => { if (watching && JSON.stringify(REC.editionClaimsOf(O)) === JSON.stringify([FORK])) before = true; });
  const release = fake.hold('op', { frame: F.editionClaimsAt(O) });
  await untilAsked(fake, F.editionClaimsAt(O), true);
  // the edition's claim written: a row the claims on the origin change at
  fake.fire('feed', { board: 'b-1', update: { position: 4, at: 4, op: 'make_link', docs: [EDITION_HOME], link: EDITION, class: 'published' } });
  await until(() => askedOf(fake, F.editionClaimsAt(O)) === 2, 'the claims\' read again asked');
  release();
  await settle();
  watching = false;
  assert.deepEqual([lookup.asks(), REC.editionClaimsOf(O), before], [2, [EDITION, FORK], false], 'the claims answered after the row held, never the ones before it');
  assert.deepEqual(fake.unanswered, []);
});

test('the page\'s own death drops the edition claims held, and the view asks them again as a guest', async () => {
  const s = claimed({ ...script });
  const lookup = inTurn(s, F.editionClaimsAt(O), claimsOn([EDITION, FORK]), claimsOn([]));
  const fake = readingD(s);
  forgetClaims();
  REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  await settle();
  assert.deepEqual(REC.editionClaimsOf(O), [EDITION, FORK], 'read under the session');
  fake.fire('session-died', { session: 's-1', reason: { arm: 'closed' } });
  assert.equal(REC.editionClaimsOf(O), undefined, 'dropped at once with every read held at the session\'s class');
  await settle();
  assert.deepEqual([lookup.asks(), REC.editionClaimsOf(O)], [2, []], 'asked again as a guest: the guest\'s answer held');
});

test('a whole read reads the edition claims on each origin its withheld runs name — the lookup, each claim\'s link and each home\'s metadata — so what is made from it holds them', async () => {
  const s = claimed({ ...script });
  const lookup = inTurn(s, F.editionClaimsAt(O), claimsOn([EDITION, FORK]));
  const fake = FAKE.create(s);
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.setBoard({ board: 'b-1', name: '', origin: '' });
  REC.takeIndex(indexAt('complete'));
  PUMP.forget(D); forgetClaims();
  await PUMP.loadWhole(D);
  assert.deepEqual([lookup.asks(), REC.editionClaimsOf(O)], [1, [EDITION, FORK]], 'the lookup read with the document');
  assert.deepEqual([REC.link(EDITION)?.type, REC.link(FORK)?.from[0].doc, REC.doc(EDITION_HOME).meta?.published, REC.doc(FORK_HOME).meta?.owner], [F.EDITION_CLASS, O, true, '1.0.1.1'], 'each claim\'s link and each home\'s metadata with it');
  assert.ok(!fake.asked.some((k) => k.includes('"op":"edition_claims"')));
  assert.deepEqual(fake.unanswered, []);
});

/** a refusal that says nothing of what a read names, and the board not answering one */
const BUSY = { refused: { kind: 'refused', name: 'busy', code: 'busy' } }, NO_ANSWER = { refused: { kind: 'unreachable', name: 'unreachable', text: 'the board is not answering' } };
/** the board refusing a read as of a document withheld from the reader */
const WITHHELD_READ = { refused: { kind: 'refused', name: 'withheld', code: 'withheld' } };

test('the view holds the lookup\'s refusal by whether it was withheld — a refusal that says nothing of the claims held unread, asked again only past a change of the claims — and a read a listed claim\'s admission waits on that failed, the board not answering among them, held failed (issue #186\'s design decision: "If the board refuses the read for documents withheld from the reader, no face carries the clause. Otherwise, a face whose read failed says \'edition claims not read\'")', async () => {
  const s = claimed({ ...script });
  const lookup = inTurn(s, F.editionClaimsAt(O), BUSY, WITHHELD_READ, claimsOn([EDITION, FORK]));
  s[FAKE.keyOf('op', { frame: F.readLink(EDITION) })] = BUSY;
  s[FAKE.keyOf('op', { frame: F.docMetadata(FORK_HOME) })] = NO_ANSWER;
  const fake = readingD(s);
  forgetClaims();
  await settle();
  assert.deepEqual([lookup.asks(), REC.editionClaimsOf(O)], [1, 'unread'], 'refused for a reason that says nothing of the claims: held unread');
  PUMP.pump();
  await settle();
  assert.equal(lookup.asks(), 1, 'not asked again while the claims stand unchanged');
  /** a row writing the fork's claim on the origin, changing the claims on it */
  const linkWritten = (/** @type {number} */ position) => fake.fire('feed', { board: 'b-1', update: { position, at: position, op: 'make_link', docs: [FORK_HOME], link: FORK, class: 'published' } });
  linkWritten(4);
  await settle();
  assert.deepEqual([lookup.asks(), REC.editionClaimsOf(O)], [2, 'withheld'], 'past a change, asked again: refused as withheld from the reader, held so');
  linkWritten(5);
  await settle();
  assert.deepEqual([lookup.asks(), REC.editionClaimsOf(O)], [3, [EDITION, FORK]], 'past the next, the claims listed');
  assert.deepEqual([REC.readFailed(EDITION), REC.readFailed(FORK_HOME), REC.readFailed(EDITION_HOME), REC.readFailed(FORK)], [true, true, false, false], 'the edition\'s link refused, and the fork\'s home unanswered: each held failed, and no read that answered');
  assert.equal(PUMP.claimsToRead(O), true, 'the clause waits on the reads that failed');
  forgetClaims();
  assert.deepEqual(fake.unanswered, []);
});

test('an act\'s reads of the edition claims hold a refusal as the view holds them, and ask again a read the page holds no answer to — a failed one among them — while one refused as withheld from the reader is an answer, never asked again', async () => {
  const s = claimed({ ...script }), HIDDEN_ORIGIN = '1.0.1.0.1004';
  const lookup = inTurn(s, F.editionClaimsAt(O), BUSY, claimsOn([EDITION]));
  const link = inTurn(s, F.readLink(EDITION), NO_ANSWER, claimLink(passageOf(EDITION_HOME, 1, 20)));
  const hidden = inTurn(s, F.editionClaimsAt(HIDDEN_ORIGIN), WITHHELD_READ);
  const fake = FAKE.create(s);
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.setBoard({ board: 'b-1', name: '', origin: '' });
  REC.takeIndex(indexAt('complete'));
  forgetClaims();
  await PUMP.readClaims(O);
  assert.deepEqual([lookup.asks(), REC.editionClaimsOf(O), PUMP.claimsToRead(O)], [1, 'unread', true], 'the lookup refused: held unread, a read the clause still waits on');
  await PUMP.readClaims(O);
  assert.deepEqual([lookup.asks(), REC.editionClaimsOf(O), REC.doc(EDITION_HOME).meta?.published], [2, [EDITION], true], 'asked again by the next act: the claim listed, its home read');
  assert.deepEqual([link.asks(), REC.readFailed(EDITION), PUMP.claimsToRead(O)], [1, true, true], 'its link unanswered: held failed');
  await PUMP.readClaims(O);
  assert.deepEqual([lookup.asks(), link.asks(), REC.link(EDITION)?.type, REC.readFailed(EDITION), PUMP.claimsToRead(O)], [2, 2, F.EDITION_CLASS, false, false], 'the next act asks the failed link alone, and every read answered');
  await PUMP.readClaims(HIDDEN_ORIGIN);
  await PUMP.readClaims(HIDDEN_ORIGIN);
  assert.deepEqual([hidden.asks(), REC.editionClaimsOf(HIDDEN_ORIGIN), PUMP.claimsToRead(HIDDEN_ORIGIN)], [1, 'withheld', false], 'refused as withheld from the reader: an answer, asked once');
  forgetClaims();
  assert.deepEqual(fake.unanswered, []);
});

/** a `compare` of the passage `a` against the stretch of text `b`, as M-PUMP asks it */
const compareOf = (/** @type {{doc: string, pos: number, width: number}} */ a, /** @type {{doc: string, pos: number, width: number}} */ b) =>
  F.compare([{ doc: a.doc, spans: [{ ordinal: a.pos, positions: a.width }] }], [{ doc: b.doc, spans: [{ ordinal: b.pos, positions: b.width }] }]);
/** a `compare` answer from D into 1.0.1.0.127: each pair its position in each and its positions */
const compared = (/** @type {Array<[number, number, number]>} */ pairs) => ({ result: { as_of: 1, resp: 'compare', pairs: pairs.map(([u1, u2, width]) => ({ d1: D, d2: '1.0.1.0.127', u1: { ordinal: String(u1), subspace: '1' }, u2: { ordinal: String(u2), subspace: '1' }, width: String(width) })) } });
/** a budget refusal of the board's, naming the operand it localizes where one is given (wire.md §Errors: `site.operand`) */
const budget = (/** @type {string} */ name, /** @type {string | null} */ operand = null) => ({ refused: { kind: 'refused', name, status: 200, code: name, detail: null, op: 'compare', body: { resp: 'rejected', code: name, disposition: 'permanent', op: 'compare', site: operand ? { operand } : null } } });

test('a compare the board refuses for its size is asked again in parts — the operand its refusal names halved, else the text sought in — each part asked on its own and their pairs taken together; any other refusal handed up, and a size refusal past SPLIT_READS reads (issue #153)', async () => {
  const FAR = '1.0.1.0.127', a = { doc: D, pos: 1, width: 10 }, b = { doc: FAR, pos: 1, width: 40 };
  /** the board's answers to a script's compares, and the compares the pump asked */
  const over = (/** @type {Record<string, unknown>} */ answers) => {
    const fake = FAKE.create({ ...script, ...answers });
    PORT.boot(fake); PUMP.start({ onDirty: () => {} }); REC.setBoard({ board: 'b-1', name: '', origin: '' });
    return { fake, asked: () => fake.asked.filter((k) => k.includes('"op":"compare"')) };
  };
  const key = (/** @type {typeof a} */ x, /** @type {typeof b} */ y) => FAKE.keyOf('op', { frame: compareOf(x, y) });
  // naming no operand: the text sought in halved, its first half holding the passage's first four positions at 5, its second the rest at 30
  let p = over({ [key(a, b)]: budget('too_many_blocks'), [key(a, { ...b, width: 20 })]: compared([[1, 5, 4]]), [key(a, { ...b, pos: 21, width: 20 })]: compared([[5, 30, 6]]) });
  assert.deepEqual(await PUMP.compareParts(a, b), { pairs: [{ d1: D, d2: FAR, u1: 1, u2: 5, width: 4 }, { d1: D, d2: FAR, u1: 5, u2: 30, width: 6 }] }, 'both halves\' pairs');
  assert.deepEqual(p.asked(), [key(a, b), key(a, { ...b, width: 20 }), key(a, { ...b, pos: 21, width: 20 })], 'the whole, then each half in turn');
  assert.deepEqual(p.fake.unanswered, []);
  // naming the first operand: the passage halved
  p = over({ [key(a, b)]: budget('too_many_pairs', 'first'), [key({ ...a, width: 5 }, b)]: compared([[1, 5, 5]]), [key({ ...a, pos: 6, width: 5 }, b)]: compared([[6, 30, 5]]) });
  assert.deepEqual(await PUMP.compareParts(a, b), { pairs: [{ d1: D, d2: FAR, u1: 1, u2: 5, width: 5 }, { d1: D, d2: FAR, u1: 6, u2: 30, width: 5 }] }, 'the operand the refusal names halved');
  assert.deepEqual(p.fake.unanswered, []);
  // any other refusal: handed up, no part asked
  const moved = { refused: { kind: 'refused', name: 'range_not_present', status: 200, code: 'range_not_present', detail: null, op: 'compare', body: null } };
  p = over({ [key(a, b)]: moved });
  assert.deepEqual([await PUMP.compareParts(a, b), p.asked().length], [moved, 1]);
  // every part wider than four positions refused for its size, every narrower one answered: the 63 reads its parts would take bounded
  // at SPLIT_READS, then the size refusal handed up
  const one = { doc: D, pos: 1, width: 1 }, wide = { doc: FAR, pos: 1, width: 128 };
  /** @type {Record<string, unknown>} */
  const all = {};
  const walk = (/** @type {typeof b} */ o) => { all[key(one, o)] = o.width > 4 ? budget('too_many_blocks') : compared([]); if (o.width > 4) { const h = Math.floor(o.width / 2); walk({ ...o, width: h }); walk({ ...o, pos: o.pos + h, width: o.width - h }); } };
  walk(wide);
  p = over(all);
  const out = await PUMP.compareParts(one, wide);
  assert.deepEqual(['refused' in out && out.refused.name, p.asked().length], ['too_many_blocks', PUMP.SPLIT_READS], 'bounded: never past SPLIT_READS reads');
  // a part of a single position each refused for its size: handed up at once, no further part asked
  p = over({ [key(one, { ...b, width: 1 })]: budget('too_many_pairs') });
  const single = await PUMP.compareParts(one, { ...b, width: 1 });
  assert.deepEqual(['refused' in single && single.refused.name, p.asked().length], ['too_many_pairs', 1], 'nothing left to halve: handed up');
  assert.deepEqual(p.fake.unanswered, []);
});

test('a whole read whose image the board refuses for its size reads it in parts and takes them as one image, every run placed; one whose extent or text the board refuses hands that refusal up with the record (issue #153)', async () => {
  const sized = { refused: { kind: 'refused', name: 'image_too_large', status: 200, code: 'image_too_large', detail: null, op: 'image', body: null } };
  const fake = FAKE.create({
    ...script, [FAKE.keyOf('op', { frame: F.image(D, 1, 30) })]: sized,
    [FAKE.keyOf('op', { frame: F.image(D, 1, 15) })]: { result: { as_of: 1, resp: 'runs', runs: [{ i_start: D + '.0.1.1', width: '15' }] } },
    [FAKE.keyOf('op', { frame: F.image(D, 16, 15) })]: { result: { as_of: 1, resp: 'runs', runs: [{ i_start: D + '.0.1.16', width: '11' }, { i_start: '1.0.1.0.1003.0.1.1', width: '4' }] } },
  });
  PORT.boot(fake); PUMP.start({ onDirty: () => {} }); REC.setBoard({ board: 'b-1', name: '', origin: '' });
  const w = await PUMP.wholeOf(D);
  assert.deepEqual([w.refused, w.doc?.imageFor], [null, [1, 31]], 'the image held over the whole text, nothing refused handed up');
  assert.deepEqual(REC.identityOf(D, 14, 4), [{ prefix: D + '.0.1', ordinal: 14, width: 2 }, { prefix: D + '.0.1', ordinal: 16, width: 2 }], 'every position placed, across the parts\' seam');
  assert.deepEqual(REC.doc(D).origins, [{ pos: 27, width: 4, doc: '1.0.1.0.1003' }], 'the transcluded run named from the second part');
  assert.deepEqual(fake.unanswered, []);
  REC._reset();
  const busy = { refused: { kind: 'refused', name: 'busy', status: 503, code: 'busy', detail: null, op: 'retrieve_doc_v_span_set', body: null } };
  PORT.boot(FAKE.create({ ...script, [FAKE.keyOf('op', { frame: F.retrieveDocVSpanSet(D) })]: busy }));
  assert.deepEqual(await PUMP.wholeOf(D), { doc: null, refused: busy.refused }, 'the extent refused: no record, the refusal handed up');
  REC._reset();
  const withheld = { refused: { kind: 'refused', name: 'withheld', status: 200, code: 'withheld', detail: null, op: 'retrieve_v', body: null } };
  PORT.boot(FAKE.create({ ...script, [FAKE.keyOf('op', { frame: F.retrieveV(D, 1, 30) })]: withheld }));
  const t = await PUMP.wholeOf(D);
  assert.deepEqual([t.doc?.extent, t.refused], [30, withheld.refused], 'the text refused: the record with its extent, the refusal handed up');
});

/** a published document's metadata as `doc_metadata` answers it */
const metaOf = (/** @type {string} */ doc, /** @type {string | null} */ birth = null) => ({ result: { as_of: 1, resp: 'doc_metadata', doc, published: true, owner: '1.0.1', birth, birth_extent: null, placed: null, base_extent: null, source: null } });
const unregistered = { refused: { kind: 'refused', name: 'doc_not_registered', code: 'doc_not_registered' } };
/** N-GO's `shownIn` over a map of pins: the version each box shows, its document where none is pinned */
const showing = (/** @type {Record<string, string>} */ pins) => (/** @type {string} */ a) => { const box = documentOf(a) || a; return pins[box] ?? box; };
/** pump `n` times, each read answered between */
async function pumped(n = 4) { for (let i = 0; i < n; i++) { PUMP.pump(); await new Promise((r) => setTimeout(r, 0)); } }

test('a box showing another of its versions reads that version for its text and its image, and its document for its extent, metadata, links and chain alone; both read again as at first after a feed row names the version, standing as held until their reads land (issue #154)', async () => {
  const M = D + '.1';
  /** @type {Record<string, unknown>} */
  const s = {
    ...script,
    // D's chain: D.2 its head, no D.3
    [FAKE.keyOf('op', { frame: F.docMetadata(D + '.2') })]: metaOf(D + '.2'),
    [FAKE.keyOf('op', { frame: F.docMetadata(D + '.3') })]: unregistered,
    // the version the box shows: twenty positions of D's bytes
    [FAKE.keyOf('op', { frame: F.retrieveDocVSpanSet(M) })]: { result: { as_of: 1, resp: 'span_set', set: [{ start: '1.1', width: '0.20' }] } },
    [FAKE.keyOf('op', { frame: F.docMetadata(M) })]: metaOf(M),
    [FAKE.keyOf('op', { frame: F.findLinksV(M, 1, 20) })]: { result: { as_of: 1, resp: 'addrs', addrs: [] } },
    [FAKE.keyOf('op', { frame: F.retrieveV(M, 1, 20) })]: { result: { as_of: 1, resp: 'delivery', items: [{ content: 'Tumbler.\n\nThe first.' }] } },
    [FAKE.keyOf('op', { frame: F.image(M, 1, 20) })]: { result: { as_of: 1, resp: 'runs', runs: [{ i_start: D + '.0.1.1', width: '20' }] } },
  };
  const fake = FAKE.create(s);
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {}, shown: showing({ [D]: M }) });
  REC.setBoard({ board: 'b-1', name: '', origin: '' });
  REC.takeIndex(indexAt('complete'));
  PUMP.forget(D);
  readAt(D, 30);
  await pumped();
  const key = (/** @type {object} */ frame) => FAKE.keyOf('op', { frame });
  const own = [key(F.retrieveDocVSpanSet(D)), key(F.docMetadata(D)), key(F.findLinksV(D, 1, 30)), key(F.readLink(D + '.0.2.1')), key(F.docMetadata(D + '.2')), key(F.docMetadata(D + '.3'))];
  const shownReads = [key(F.retrieveDocVSpanSet(M)), key(F.docMetadata(M)), key(F.findLinksV(M, 1, 20)), key(F.retrieveV(M, 1, 20)), key(F.image(M, 1, 20))];
  assert.deepEqual([...new Set(fake.asked)].sort(), [...own, ...shownReads].sort(), 'the document read for its extent, metadata, links and chain; the version shown for its own and its text and image; the document\'s text never, nor the version\'s chain');
  assert.deepEqual([REC.doc(D).from, REC.doc(D).members, REC.doc(M).from, REC.doc(M).to, REC.doc(M).imageFor, REC.doc(M).members], [-1, 2, 1, 21, [1, 21], null], 'the model holds the version\'s text and image and the document\'s chain, none of the document\'s text, and no chain probed from the version');
  // a feed row naming the version shown: it and its document, both shown through its box, stand as held and are read again as at first
  fake.fire('feed', { board: 'b-1', update: { position: 4, at: 4, op: 'make_link', docs: [M], class: 'published' } });
  assert.deepEqual([REC.doc(M).from, REC.doc(M).extent, REC.doc(D).extent, REC.doc(D).members], [1, 20, 30, 2], 'kept by the row while they are read');
  await settle();
  const count = (/** @type {string} */ k) => fake.asked.filter((x) => x === k).length;
  assert.deepEqual(shownReads.map(count), [2, 2, 2, 2, 2], 'the version shown read again, its text and its image among it');
  assert.deepEqual([REC.doc(M).from, REC.doc(M).to], [1, 21], 'its text held again');
  assert.equal(fake.asked.filter((k) => k.includes('"op":"retrieve_v"') && k.includes(JSON.stringify(D))).length, 0, 'the document\'s text never asked');
  assert.deepEqual(fake.unanswered, []);
});

test('a version its box does not show asks nothing, whatever the model holds of it (issue #154)', async () => {
  const M = D + '.1';
  const fake = FAKE.create({ ...script, [FAKE.keyOf('op', { frame: F.docMetadata(D + '.2') })]: unregistered });
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {}, shown: showing({}) });
  REC.setBoard({ board: 'b-1', name: '', origin: '' });
  REC.takeIndex(indexAt('complete'));
  PUMP.forget(D);
  // an earlier version read once, as a box showing it read it: its extent and its metadata held, none of its text
  REC.takeSpanSet(M, F.decodeSpanSet({ as_of: 1, resp: 'span_set', set: [{ start: '1.1', width: '0.20' }] }));
  const m = F.decodeDocMetadata(/** @type {any} */ (metaOf(M)).result);
  if (m) REC.takeMetadata(M, m);
  readAt(D, 30);
  await pumped();
  assert.deepEqual(fake.asked.filter((k) => k.includes(JSON.stringify(M))), [], 'nothing asked of the version the box does not show');
  assert.equal(REC.doc(D).from, 1, 'the box\'s document read for its text, the version it shows');
  assert.deepEqual(fake.unanswered, []);
});

test('a far end is placed in the version its far document\'s box shows: `project` into that version, never the document (issue #154)', async () => {
  const FAR = '1.0.1.0.127', AT = FAR + '.1', L = D + '.0.2.3';
  /** @type {Record<string, unknown>} */
  const s = {
    ...script,
    [FAKE.keyOf('op', { frame: F.findLinksV(D, 1, 30) })]: { result: { as_of: 1, resp: 'addrs', addrs: [L] } },
    [FAKE.keyOf('op', { frame: F.readLink(L) })]: citation(11, passageOf(FAR, 3, 4)),
    [FAKE.keyOf('op', { frame: F.project(L, 2, AT) })]: { result: { as_of: 1, resp: 'span_set', set: [{ start: '1.7', width: '0.4' }] } },
    [FAKE.keyOf('op', { frame: F.docMetadata(D + '.2') })]: unregistered,
  };
  const fake = FAKE.create(s);
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {}, shown: showing({ [FAR]: AT }) });
  REC.setBoard({ board: 'b-1', name: '', origin: '' });
  REC.takeIndex(indexAt('complete'));
  PUMP.forget(D);
  await PUMP.loadWhole(D);
  readAt(D, 30);
  await pumped();
  assert.deepEqual(fake.asked.filter((k) => k.includes('"op":"project"')), [FAKE.keyOf('op', { frame: F.project(L, 2, AT) })], 'one `project`, into the version FAR\'s box shows');
  assert.deepEqual([REC.projection(L, 2, AT), REC.projection(L, 2, FAR)], [[{ pos: 7, width: 4 }], undefined], 'held at that version, nothing at the document');
  assert.deepEqual(fake.unanswered, []);
});

test('a feed row publishing a trunk\'s member is handed to the app with the row\'s position before it drops anything of the trunk; no row of another op, and no publish naming no member, is (issues #154, #298: a box at its plain address keeps the version being read)', async () => {
  const fake = FAKE.create(script);
  PORT.boot(fake);
  /** @type {Array<{member: string, at: number | null, held: boolean}>} */
  const told = [];
  PUMP.start({ onDirty: () => {}, onPublish: (member, at) => told.push({ member, at, held: REC.doc(D).from >= 0 }) });
  REC.setBoard({ board: 'b-1', name: '', origin: '' });
  REC.takeIndex(indexAt('complete'));
  PUMP.forget(D);
  await PUMP.loadWhole(D);
  assert.ok(REC.doc(D).from >= 0, 'the trunk\'s text held');
  fake.fire('feed', { board: 'b-1', update: { position: 3, at: 3, op: 'publish', docs: [D + '.3'], class: 'published' } });
  assert.deepEqual([[...new Set(told.map((x) => x.member))], told[0]?.at, told[0]?.held], [[D + '.3'], 3, true], 'the member the row publishes handed over at the row\'s position while the trunk\'s text stood');
  assert.equal(REC.doc(D).from, -1, 'the row dropped the trunk after');
  told.length = 0;
  fake.fire('feed', { board: 'b-1', update: { position: 4, at: 4, op: 'make_link', docs: [D + '.4'], class: 'published' } });
  fake.fire('feed', { board: 'b-1', update: { position: 5, at: 5, op: 'publish', docs: ['1.0.1.0.77'], class: 'published' } });
  assert.deepEqual(told, [], 'neither a row of another op nor a publish naming a document whole');
});

test('what each feed row the page takes dropped is told to the app after the drop, the row\'s op with it, and the page\'s own death as a change of its class, naming no address, after it — so a reader reading again reads fresh (issue #160)', async () => {
  const fake = FAKE.create(script);
  PORT.boot(fake);
  /** @type {Array<{op: string | null, addrs: string[] | null, held: boolean, signed: boolean}>} */
  const told = [];
  PUMP.start({ onDirty: () => {}, onDrop: (x) => told.push({ op: x.row ? x.row.op : null, addrs: x.addrs ? [...x.addrs].sort() : null, held: REC.doc(D).from >= 0, signed: REC.session() !== null }) });
  REC.setBoard({ board: 'b-1', name: '', origin: '' });
  REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  REC.takeIndex(indexAt('complete'));
  PUMP.forget(D);
  await PUMP.loadWhole(D);
  assert.ok(REC.doc(D).from >= 0, 'the text held before the rows');
  fake.fire('feed', { board: 'b-1', update: { position: 3, at: 3, op: 'insert', docs: [D], class: 'published' } });
  assert.ok(told.length > 0 && told.every((x) => x.op === 'insert' && JSON.stringify(x.addrs) === JSON.stringify([D]) && !x.held), `an edit row, its op and what it dropped told after the drop: ${JSON.stringify(told)}`);
  await PUMP.loadWhole(D);
  told.length = 0;
  fake.fire('feed', { board: 'b-1', update: { position: 4, at: 4, op: 'publish', docs: [D + '.2'], class: 'published' } });
  assert.ok(told.length > 0 && told.every((x) => x.op === 'publish' && JSON.stringify(x.addrs) === JSON.stringify([D, D + '.2']) && !x.held), `a publish, the member and its trunk dropped, told after: ${JSON.stringify(told)}`);
  told.length = 0;
  fake.fire('session-died', { session: 's-1', reason: { arm: 'closed' } });
  assert.ok(told.length > 0 && told.every((x) => x.op === null && x.addrs === null && !x.signed), `the page's own death told as a change of its class, after the death: ${JSON.stringify(told)}`);
  await new Promise((r) => setTimeout(r, 0));
});

// ---- the byline's facts (FP-34) -------------------------------------------------------------------------

/** a key's fingerprint, built here apart from the page's: SHA-256 over the tag, then each field's 4-byte big-endian length and its bytes (AUTH-1.8) */
const fingerprintOf = (/** @type {string} */ alg, /** @type {string} */ keyHex) => {
  const be32 = (/** @type {number} */ n) => { const b = Buffer.alloc(4); b.writeUInt32BE(n); return b; };
  const a = Buffer.from(alg, 'utf8'), raw = Buffer.from(keyHex, 'hex');
  return createHash('sha256').update(Buffer.concat([Buffer.from('skep-key-v1', 'utf8'), be32(a.length), a, be32(raw.length), raw])).digest('hex');
};
const ALG = 'mldsa65-ed25519', KEY_A = '0a1b2c3d'.repeat(8), KEY_B = 'f0e1d2c3'.repeat(8), KEY_C = '5a6b7c8d'.repeat(8);
/** `key_set` as the board answers it */
const keySetOf = (/** @type {object[]} */ enrolled, /** @type {object[]} */ retired = []) => ({ result: { as_of: 1, resp: 'key_set', enrolled, retired } });
/** one key enrolled */
const ONE_KEY = [{ alg: ALG, anchor: false, fingerprint: 'ab'.repeat(32) }];
/** an enrollment record's link as `read_link` answers it: from its record's one byte `atom` to the account `to` it enrolls */
const enrollment = (/** @type {string} */ atom, /** @type {string} */ to) => ({ result: { as_of: 1, resp: 'link_value', link: { slots: [[unitSpan(atom)], [unitSpan(to)], [{ start: F.ENROLL_CLASS, width: '0.0.0.0.0.0.0.0.1' }]] } } });
/** a genesis record of keys, each `[key, label, anchor]`, a label of null carrying none */
const genesisRecord = (/** @type {Array<[string, string | null, boolean]>} */ keys) => ({ type: 'skep-enroll', keys: keys.map(([key, label, anchor]) => ({ alg: ALG, key, anchor, ...(label ? { label } : {}) })) });
const opKey = (/** @type {object} */ frame) => FAKE.keyOf('op', { frame });
/**
 * The reads of an account's byline facts as its board answers them: its credential table holding one key, the enrollment
 * records naming it — each `[link, to, atom]` — and the genesis's `home`: its text `extent` positions, its V→I image `runs`,
 * its record atom read at position `at`.
 * @param {string} account
 * @param {Array<[string, string, string]>} records
 * @param {{home: string, extent: number, runs: Array<{i_start: string, width: string}>, at: number, record: object}} g
 */
function genesisReads(account, records, g) {
  return {
    [opKey(F.keySet(account))]: keySetOf(ONE_KEY),
    [opKey(F.enrollmentsOf(account))]: { result: { as_of: 1, resp: 'addrs', addrs: records.map(([l]) => l) } },
    ...Object.fromEntries(records.map(([l, to, atom]) => [opKey(F.readLink(l)), enrollment(atom, to)])),
    [opKey(F.retrieveDocVSpanSet(g.home))]: { result: { as_of: 1, resp: 'span_set', set: [{ start: '1.1', width: '0.' + g.extent }] } },
    [opKey(F.image(g.home, 1, g.extent))]: { result: { as_of: 1, resp: 'runs', runs: g.runs } },
    [opKey(F.retrieveV(g.home, g.at, 1))]: { result: { as_of: 1, resp: 'delivery', items: [{ atom: JSON.stringify(g.record) }] } },
  };
}
/** the port booted over a script, the pump started over it, the board known */
function bylineBoard(/** @type {Record<string, unknown>} */ s) {
  const fake = FAKE.create(s);
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.setBoard({ board: 'b-1', name: '', origin: '' });
  return fake;
}
/** how many times a frame was asked */
const asksOf = (/** @type {ReturnType<typeof FAKE.create>} */ fake, /** @type {object} */ frame) => fake.asked.filter((k) => k === opKey(frame)).length;

test('at reading scale the view reads the byline facts of the owner of each text it draws — once, a read out joined, missing while out and not once held — and nothing below the reading em (FP-34)', async () => {
  REC._reset();
  const s = { ...script, [opKey(F.keySet('1.0.1'))]: keySetOf([]) };
  const fake = bylineBoard(s);
  REC.takeIndex(indexAt('complete'));
  PUMP.forget(D);
  CAM.setViewport(1440, 900);
  CAM.set(CAM.viewForCell(accountCell('1.0.1'), 0.85));
  await pumped();
  assert.equal(asksOf(fake, F.keySet('1.0.1')), 0, 'at HOME, where no text is read, no byline is');
  const release = fake.hold('op', { frame: F.keySet('1.0.1') });
  readAt(D, 30);
  PUMP.pump();
  await flush();
  assert.ok(PUMP.pump() > 0, 'missing while out');
  await flush();
  assert.deepEqual([asksOf(fake, F.keySet('1.0.1')), REC.accountKey('1.0.1')], [1, undefined], 'asked once, its read out joined by every pass');
  release();
  await pumped();
  assert.deepEqual([asksOf(fake, F.keySet('1.0.1')), REC.accountKey('1.0.1')], [1, { cause: 'unsigned' }], 'answered: no key enrolled and none above — unsigned — and never asked again once held');
});

test('an account\'s byline facts are the sole device-flagged entry of its genesis enrollment — the record whose own `to` names the account, the lowest-addressed in its own doc 1, its atom placed through the home\'s image and read there — its label, and its fingerprint (FP-34; R22)', async () => {
  const A = '1.0.4', HOME = '1.0.4.0.1';
  const s = genesisReads(A, [
    ['1.0.4.0.1.0.2.3', A, '1.0.4.0.1.0.1.3'],
    ['1.0.4.0.1.0.2.1', '1.0.4.1', '1.0.4.0.1.0.1.1'],
    ['1.0.4.0.1.0.2.2', A, '1.0.4.0.1.0.1.2'],
  ], {
    // an edit set a byte before the record's: the atom minted at ordinal 2 stands at position 3 now
    home: HOME, extent: 4, runs: [{ i_start: '1.0.4.0.1.0.1.9', width: '1' }, { i_start: '1.0.4.0.1.0.1.1', width: '3' }], at: 3,
    record: genesisRecord([[KEY_A, 'paper', true], [KEY_B, 'dev-laptop', false]]),
  });
  const fake = bylineBoard(s);
  await PUMP.readAccount(A);
  assert.deepEqual(REC.accountKey(A), { label: 'dev-laptop', fingerprint: fingerprintOf(ALG, KEY_B) }, 'the record\'s device-flagged entry: its label and its fingerprint, never the anchor\'s');
  assert.deepEqual(fake.unanswered, [], 'every read the script names: the lowest-addressed record whose `to` is the account — never the sub-account\'s, lower though it is — its atom read at the position the image places it, never its stored ordinal');
});

test('an account\'s genesis is the enrollment homed in another account\'s doc 1 first, before any in its own; with no key enrolled and none retired the byline climbs the credential tables above it — by reference where one holds a key, unsigned where none does — and with a key retired it never climbs (FP-34; wire.md §Sessions)', async () => {
  const OUT = '1.0.7.0.1', A = '1.0.5';
  const s = {
    ...genesisReads(A, [['1.0.5.0.1.0.2.1', A, '1.0.5.0.1.0.1.1'], ['1.0.7.0.1.0.2.9', A, '1.0.7.0.1.0.1.4']], {
      home: OUT, extent: 4, runs: [{ i_start: '1.0.7.0.1.0.1.1', width: '4' }], at: 4, record: genesisRecord([[KEY_C, 'registry-device', false]]),
    }),
    [opKey(F.keySet('1.0.6.1'))]: keySetOf([]), [opKey(F.keySet('1.0.6'))]: keySetOf(ONE_KEY),
    [opKey(F.keySet('1.0.8.1'))]: keySetOf([]), [opKey(F.keySet('1.0.8'))]: keySetOf([]),
    [opKey(F.keySet('1.0.11.1'))]: keySetOf([], ONE_KEY), [opKey(F.enrollmentsOf('1.0.11.1'))]: { result: { as_of: 1, resp: 'addrs', addrs: [] } },
  };
  const fake = bylineBoard(s);
  await Promise.all([A, '1.0.6.1', '1.0.8.1', '1.0.11.1'].map((a) => PUMP.readAccount(a)));
  assert.deepEqual(REC.accountKey(A), { label: 'registry-device', fingerprint: fingerprintOf(ALG, KEY_C) }, 'homed in 1.0.7\'s doc 1: the genesis, though its own doc 1\'s record is lower-addressed');
  assert.deepEqual([REC.accountKey('1.0.6.1'), REC.accountKey('1.0.8.1')], [{ cause: 'by-reference' }, { cause: 'unsigned' }], 'its credentials those of the account above it; none anywhere above');
  assert.deepEqual([REC.accountKey('1.0.11.1'), asksOf(fake, F.keySet('1.0.11'))], [{ cause: 'not-recorded' }, 0], 'a key retired: its genesis looked for, never the table above');
  assert.deepEqual(fake.unanswered, []);
});

test('where an account\'s byline can name no key it says why: its genesis names not exactly one device-flagged entry, or none stands — not recorded; a read withheld from the reader — withheld, naming the owner of what was withheld; a read refused any other way — not read (FP-34)', async () => {
  const s = {
    ...genesisReads('1.0.12', [['1.0.12.0.1.0.2.1', '1.0.12', '1.0.12.0.1.0.1.1']], { home: '1.0.12.0.1', extent: 1, runs: [{ i_start: '1.0.12.0.1.0.1.1', width: '1' }], at: 1, record: genesisRecord([[KEY_A, 'one', false], [KEY_B, 'two', false]]) }),
    ...genesisReads('1.0.13', [['1.0.13.0.1.0.2.1', '1.0.13', '1.0.13.0.1.0.1.1']], { home: '1.0.13.0.1', extent: 2, runs: [{ i_start: '1.0.13.0.1.0.1.5', width: '2' }], at: 1, record: genesisRecord([[KEY_A, 'gone', false]]) }),
    [opKey(F.keySet('1.0.14.1'))]: keySetOf(ONE_KEY),
    [opKey(F.enrollmentsOf('1.0.14.1'))]: { result: { as_of: 1, resp: 'addrs', addrs: ['1.0.14.0.1.0.2.1'] } },
    [opKey(F.readLink('1.0.14.0.1.0.2.1'))]: enrollment('1.0.14.0.1.0.1.2', '1.0.14.1'),
    [opKey(F.retrieveDocVSpanSet('1.0.14.0.1'))]: { refused: { kind: 'refused', name: 'withheld', code: 'withheld' } },
    [opKey(F.keySet('1.0.15'))]: { refused: { kind: 'refused', name: 'bad_request', code: 'bad_request' } },
  };
  const fake = bylineBoard(s);
  await Promise.all(['1.0.12', '1.0.13', '1.0.14.1', '1.0.15'].map((a) => PUMP.readAccount(a)));
  assert.deepEqual(REC.accountKey('1.0.12'), { cause: 'not-recorded' }, 'two device-flagged entries: no one of them the byline\'s');
  assert.deepEqual(REC.accountKey('1.0.13'), { cause: 'not-recorded' }, 'the home\'s text no longer places the record\'s byte');
  assert.deepEqual(REC.accountKey('1.0.14.1'), { cause: 'withheld', owner: '1.0.14' }, 'the genesis\'s home withheld: the owner of the home, never the account read');
  assert.deepEqual(REC.accountKey('1.0.15'), { cause: 'unread' }, 'a refusal that says nothing of the facts');
  assert.deepEqual(fake.unanswered, []);
});

test('a byline read the board did not answer is held — not asked again inside its pause — and asked again at the daemon\'s running; a cause that lands after a feed row touching a doc 1 is never taken, its read answering that it took nothing, and is asked again, while a value is taken whatever the row (FP-34; AUTH-2.127)', async (t) => {
  t.mock.method(performance, 'now', () => 1000);
  const s = {
    [opKey(F.keySet('1.0.17'))]: keySetOf([]),
    ...genesisReads('1.0.18', [['1.0.18.0.1.0.2.1', '1.0.18', '1.0.18.0.1.0.1.1']], { home: '1.0.18.0.1', extent: 1, runs: [{ i_start: '1.0.18.0.1.0.1.1', width: '1' }], at: 1, record: genesisRecord([[KEY_B, 'dev', false]]) }),
  };
  const out = inTurn(s, F.keySet('1.0.16'), UNREACHABLE, keySetOf([]));
  const fake = bylineBoard(s);
  await PUMP.readAccount('1.0.16');
  await PUMP.readAccount('1.0.16');
  assert.deepEqual([out.asks(), REC.accountKey('1.0.16')], [1, { cause: 'unreachable' }], 'the board not answering: held, and not asked again inside its pause');
  fake.fire('daemon', { board: 'b-1', state: 'running' });
  await PUMP.readAccount('1.0.16');
  assert.deepEqual([out.asks(), REC.accountKey('1.0.16')], [2, { cause: 'unsigned' }], 'asked again at once as the daemon is back');
  // a cause read across a feed row touching a doc 1: its account may have enrolled since
  const held = fake.hold('op', { frame: F.keySet('1.0.17') });
  const p = PUMP.readAccount('1.0.17');
  assert.equal(PUMP.readAccount('1.0.17'), p, 'a read out is joined');
  fake.fire('feed', { board: 'b-1', update: { position: 9, at: 9, op: 'make_link', docs: ['1.0.17.0.1'], class: 'published', link: '1.0.17.0.1.0.2.1' } });
  held();
  assert.deepEqual([await p, REC.accountKey('1.0.17')], [false, undefined], 'the cause the row overtook is never taken, and the read says it took nothing');
  assert.equal(await PUMP.readAccount('1.0.17'), true, 'asked again: taken');
  assert.deepEqual([asksOf(fake, F.keySet('1.0.17')), REC.accountKey('1.0.17')], [2, { cause: 'unsigned' }], 'asked again, and taken');
  // a value read across such a row: a value never changes
  const atom = fake.hold('op', { frame: F.retrieveV('1.0.18.0.1', 1, 1) });
  const q = PUMP.readAccount('1.0.18');
  await flush();
  fake.fire('feed', { board: 'b-1', update: { position: 10, at: 10, op: 'make_link', docs: ['1.0.18.0.1'], class: 'published', link: '1.0.18.0.1.0.2.2' } });
  atom();
  assert.deepEqual([await q, REC.accountKey('1.0.18')], [true, { label: 'dev', fingerprint: fingerprintOf(ALG, KEY_B) }], 'taken');
});

test('owner facts a byline read takes that say other than those held are told once — a drop naming no row, the held documents the owner owns and the owner, at the page\'s clock as they are taken — and a read that brings the facts held tells nothing (FP-23, FP-34)', async () => {
  const A = '1.0.20', MINE = [A + '.0.3', A + '.0.4'], OTHER = '1.0.21.0.2';
  const s = { [opKey(F.enrollmentsOf(A))]: { result: { as_of: 1, resp: 'addrs', addrs: [] } } };
  // unsigned, unsigned again, then a key with no genesis enrollment: not recorded
  inTurn(s, F.keySet(A), keySetOf([]), keySetOf([]), keySetOf(ONE_KEY));
  const fake = FAKE.create(s);
  PORT.boot(fake);
  /** @type {PUMP.Dropped[]} */
  const told = [];
  PUMP.start({ onDirty: () => {}, onDrop: (x) => { told.push(x); } });
  REC.setBoard({ board: 'b-1', name: '', origin: '' });
  for (const d of [...MINE, OTHER]) REC.takeSpanSet(d, [{ subspace: 1, ordinal: 1, positions: 4 }]);
  /** a row touching a doc 1 keeping A's cause owed its read again, as M-PUMP keeps a shown document's owner's */
  const owe = (/** @type {number} */ position) => REC.applyFeedUpdate(/** @type {any} */ ({ position, at: position, op: 'insert', docs: ['1.0.9.0.1'], class: 'published' }), new Set(), new Set([A]));
  const told1 = (/** @type {PUMP.Dropped[]} */ xs) => xs.map((x) => [x.row, x.addrs, x.byline]);
  const t0 = Date.now();
  assert.equal(await PUMP.readAccount(A), true);
  assert.deepEqual(told1(told), [[null, MINE, A]], 'none held before: one drop naming the documents A owns and A');
  assert.ok(told[0].at >= t0 && told[0].at <= Date.now(), 'at the page\'s clock as they are taken');
  told.length = 0;
  owe(1);
  assert.equal(await PUMP.readAccount(A), true);
  assert.deepEqual([REC.accountKey(A), REC.causeOwed(A), told], [{ cause: 'unsigned' }, false, []], 'the cause held read again: taken, owed no more, nothing told');
  owe(2);
  await PUMP.readAccount(A);
  assert.deepEqual([REC.accountKey(A), told1(told)], [{ cause: 'not-recorded' }, [[null, MINE, A]]], 'another cause: told once');
  assert.deepEqual(fake.unanswered, []);
});

// ---- a row naming nothing ---------------------------------------------------------------------------------

/** a member of D's chain as `doc_metadata` answers it, minted at `at` — a version member dates its own mint (wire.md §Namespace) */
const mintedAt = (/** @type {number} */ at) => ({ result: { as_of: 9, at, resp: 'doc_metadata', doc: D, published: true, owner: '1.0.1', birth: D + '.1', birth_extent: '30', placed: null, base_extent: null, source: null } });
/** a delivery of one content run, answered at `asOf` */
const deliveredAt = (/** @type {string} */ text, /** @type {number} */ asOf) => ({ result: { as_of: asOf, resp: 'delivery', items: [{ content: text }] } });
/** the feed's row naming no document and no link, its op `op` (wire.md §The change feed: a bare row the journal decides no document of) */
const naming = (/** @type {number} */ position, /** @type {string | null} */ op) => ({ board: 'b-1', update: { position, at: position, op, docs: null, class: 'published' } });
/** a frame's script key */
const opKeyOf = (/** @type {object} */ frame) => FAKE.keyOf('op', { frame });

test('rows naming nothing mark the board and drop nothing as they come; once the run is in — no row for RUN_QUIET_MS — one refresh counts the chain of each edition read at its bare address and reads again what the view shows, set in one step and never emptied meanwhile, a link the board no longer answers gone, and a draft out of view dropped unread (issue #212)', async () => {
  const OUT = '1.0.2.0.7';
  const s = { ...script, [opKeyOf(F.docMetadata(D + '.1'))]: mintedAt(3), [opKeyOf(F.docMetadata(D + '.2'))]: NOT_REGISTERED };
  // D's text read at 5 before the run and at 9 after it; its link, then none
  inTurn(s, F.retrieveV(D, 1, 30), deliveredAt(BEFORE, 5), deliveredAt(AFTER, 9));
  inTurn(s, F.findLinksV(D, 1, 30), script[opKeyOf(F.findLinksV(D, 1, 30))], { result: { as_of: 9, resp: 'addrs', addrs: [] } });
  const fake = readingD(s);
  await settle();
  assert.deepEqual([REC.textBetween(D, 1, 31), REC.doc(D).readAt, REC.doc(D).members, REC.linksTouching(D).length], [BEFORE, 5, 1, 1], 'D read at its reading em: its text, read at 5, its chain of one member and its link');
  // a draft of another account's read before, out of view
  REC.takeDelivery(OUT, [{ pos: 1, width: 5, kind: 'content', text: 'draft', ref: null, origin: null }], 5);
  const from = fake.asked.length, runs = REC.doc(D).runs;
  let emptied = false, watching = true;
  REC.watch(() => { if (watching && REC.doc(D).from < 0) emptied = true; });
  fake.fire('feed', naming(20, null)); fake.fire('feed', naming(21, 'nullify')); fake.fire('feed', naming(22, 'version'));
  assert.deepEqual([REC.textBetween(D, 1, 31), REC.doc(OUT).from, REC.bare(), fake.asked.length - from, PUMP.settled()], [BEFORE, 1, true, 0, false], 'as they come: nothing dropped and nothing asked, the board marked, the refresh armed and counted missing');
  await new Promise((r) => setTimeout(r, PUMP.RUN_QUIET_MS + 50));
  await settle();
  watching = false;
  const times = (/** @type {object} */ frame) => fake.asked.slice(from).filter((k) => k === opKeyOf(frame)).length;
  assert.deepEqual([F.docMetadata(D + '.1'), F.docMetadata(D + '.2'), F.retrieveV(D, 1, 30), F.image(D, 1, 30)].map(times), [1, 1, 1, 1], 'one refresh for the three: D\'s chain counted once, its text and its image read once');
  assert.deepEqual([REC.textBetween(D, 1, 31), REC.doc(D).readAt, emptied, REC.bare(), REC.doc(D).runs !== runs], [AFTER, 9, false, false, true], 'set again from what it read, never emptied while its reads were out, given new runs');
  assert.deepEqual(REC.linksTouching(D), [], 'a link the board no longer answers gone');
  assert.deepEqual([REC.doc(OUT).from, fake.asked.slice(from).filter((k) => k.includes(OUT)).length], [-1, 0], 'the draft out of view dropped, nothing read of it');
  assert.deepEqual(fake.unanswered, []);
});

test('an edition whose chain the refresh counts past the member its text is — the newest minted at or before the position its text was read at, never the chain\'s end the page held, counted after a newer member was minted — takes that member\'s successor\'s arrival: its box pinned on the member, which takes its text and is read again at its own address, nothing read at the bare address (issue #212)', async () => {
  const M = D + '.1', NEXT = D + '.2';
  const s = {
    ...script, [opKeyOf(F.docMetadata(M))]: mintedAt(3), [opKeyOf(F.docMetadata(D + '.3'))]: NOT_REGISTERED,
    // D.1 at its own address: the text D's bare address answered at 5, its own links none
    [opKeyOf(F.retrieveDocVSpanSet(M))]: script[opKeyOf(F.retrieveDocVSpanSet(D))], [opKeyOf(F.retrieveV(M, 1, 30))]: deliveredAt(BEFORE, 9),
    [opKeyOf(F.image(M, 1, 30))]: script[opKeyOf(F.image(D, 1, 30))], [opKeyOf(F.findLinksV(M, 1, 30))]: { result: { as_of: 9, resp: 'addrs', addrs: [] } },
    // D.2 minted at 7, after D's text was read at 5 and before the view probed its chain
    [opKeyOf(F.docMetadata(NEXT))]: mintedAt(7),
  };
  inTurn(s, F.retrieveV(D, 1, 30), deliveredAt(BEFORE, 5));
  const fake = FAKE.create(s);
  PORT.boot(fake);
  /** @type {Record<string, string>} */
  const pins = {};
  /** @type {Array<[string, number | null]>} */
  const told = [];
  PUMP.start({ onDirty: () => {}, shown: showing(pins), onPublish: (member, at) => { told.push([member, at]); const k = memberOf(member); if (k != null && k >= 2) pins[D] = versionAddress(D, k - 1); } });
  REC.setBoard({ board: 'b-1', name: '', origin: '' });
  REC.takeIndex(indexAt('complete'));
  PUMP.forget(D);
  readAt(D, 30);
  await settle();
  assert.deepEqual([REC.textBetween(D, 1, 31), REC.doc(D).readAt, REC.doc(D).members, REC.doc(D).ended], [BEFORE, 5, 2, true], 'D read at its bare address at 5, its chain counted after to two members');
  const from = fake.asked.length, runs = REC.doc(D).runs;
  fake.fire('feed', naming(20, null));
  await PUMP.refresh();
  await settle();
  const asked = fake.asked.slice(from);
  assert.ok(asked.includes(opKeyOf(F.docMetadata(M))), 'counted from the end held, D.2 minted past the text\'s position: D.1 asked below it');
  assert.deepEqual([told, pins[D], REC.textBetween(M, 1, 31), REC.doc(D).from], [[[NEXT, null]], M, BEFORE, -1], 'D.2, minted after the text was read, arrives with no position, the member the text is found already: the box pinned on D.1, which holds the text, D holding none');
  assert.ok(REC.doc(M).runs !== runs && !asked.includes(opKeyOf(F.retrieveV(D, 1, 30))), 'D.1 set again from its own read; nothing read at the bare address');
  assert.deepEqual([asked.filter((k) => k === opKeyOf(F.retrieveV(M, 1, 30))).length, REC.doc(D).members], [1, 2], 'D.1 read once at its own address; the box\'s document counted to its two members');
  assert.deepEqual(fake.unanswered, []);
});

test('a row naming a shown document while the refresh\'s reads of it are out voids them: the refresh sets nothing of it, and the view reads it again after the row (issue #212)', async () => {
  const MIDDLE = 'Tumbler.\n\nThe first field, mid';
  const s = { ...script, [opKeyOf(F.docMetadata(D + '.1'))]: mintedAt(3), [opKeyOf(F.docMetadata(D + '.2'))]: NOT_REGISTERED };
  // D's text: as the view first reads it, as the refresh reads it before the row, and as the view reads it after
  inTurn(s, F.retrieveV(D, 1, 30), deliveredAt(BEFORE, 5), deliveredAt(MIDDLE, 9), deliveredAt(AFTER, 11));
  const fake = readingD(s);
  await settle();
  const text = opKeyOf(F.retrieveV(D, 1, 30)), asks = () => fake.asked.filter((k) => k === text).length, before = asks();
  const release = fake.hold('op', { frame: F.retrieveV(D, 1, 30) });
  fake.fire('feed', naming(20, null));
  const out = PUMP.refresh();
  for (let i = 0; i < 40 && asks() === before; i++) await new Promise((r) => setTimeout(r, 0));
  assert.equal(asks(), before + 1, 'the refresh reads D\'s text again');
  fake.fire('feed', { board: 'b-1', update: { position: 21, at: 21, op: 'insert', docs: [D], class: 'published' } });
  for (let i = 0; i < 20 && asks() === before + 1; i++) { PUMP.pump(); await new Promise((r) => setTimeout(r, 0)); }
  release();
  await out;
  await settle();
  assert.deepEqual([REC.textBetween(D, 1, 31), REC.doc(D).readAt], [AFTER, 11], 'the text the view read after the row, never the one the refresh read before it');
  assert.deepEqual(fake.unanswered, []);
});

test('an edition whose member the page cannot tell — the board giving no mint position, the record no chain\'s end — is left by the refresh as it stands: its text kept, nothing of it read again, the board not marked again (issue #212)', async () => {
  const s = { ...script, [opKeyOf(F.docMetadata(D + '.1'))]: script[opKeyOf(F.docMetadata(D))], [opKeyOf(F.docMetadata(D + '.2'))]: NOT_REGISTERED };
  const fake = FAKE.create(s);
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.setBoard({ board: 'b-1', name: '', origin: '' });
  REC.takeIndex(indexAt('complete'));
  PUMP.forget(D);
  await PUMP.loadWhole(D);
  // HOME: D in view below its reading em, so the view counts no chain
  CAM.setViewport(1440, 900);
  CAM.set(CAM.viewForCell(accountCell('1.0.1'), 0.85));
  const from = fake.asked.length, runs = REC.doc(D).runs;
  fake.fire('feed', naming(20, null));
  await PUMP.refresh();
  assert.deepEqual([REC.doc(D).runs === runs, REC.doc(D).members, REC.bare()], [true, null, false], 'its text as it stood, no chain\'s end taken, no mark again');
  assert.deepEqual(fake.asked.slice(from), [opKeyOf(F.docMetadata(D + '.1')), opKeyOf(F.docMetadata(D + '.2'))], 'its chain counted, and nothing else read');
  assert.deepEqual(fake.unanswered, []);
});

test('an edition whose chain the refresh cannot count, the board not answering, is left as it stands — nothing of it read again — and marks the board again, the refresh made once UNREACHED_MS has passed counting its chain and reading it again (issue #371)', async (t) => {
  const s = { ...script, [opKeyOf(F.docMetadata(D + '.2'))]: NOT_REGISTERED };
  const first = inTurn(s, F.docMetadata(D + '.1'), UNREACHABLE, mintedAt(3));
  const fake = readingD(s);
  await settle();
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const turn = () => new Promise((r) => setImmediate(r));
  const texts = () => fake.asked.filter((k) => k === opKeyOf(F.retrieveV(D, 1, 30))).length;
  const from = fake.asked.length, runs = REC.doc(D).runs, read = texts();
  fake.fire('feed', naming(20, null));
  await PUMP.refresh();
  for (let i = 0; i < 10; i++) { PUMP.pump(); await turn(); }
  assert.deepEqual([first.asks(), REC.doc(D).runs === runs, fake.asked.slice(from), REC.bare(), PUMP.settled()], [1, true, [opKeyOf(F.docMetadata(D + '.1'))], true, false], 'its chain not counted: its text as it stood, nothing else read, the board marked again and the next refresh armed');
  t.mock.timers.tick(PUMP.UNREACHED_MS);
  for (let i = 0; i < 40 && !PUMP.settled(); i++) await turn();
  assert.deepEqual([first.asks(), texts() - read, REC.doc(D).runs !== runs, REC.bare(), PUMP.settled()], [2, 1, true, false, true], 'past UNREACHED_MS: its chain counted and its text read again and set, the mark taken');
  assert.deepEqual(fake.unanswered, []);
});

test('a change of the page\'s class while a refresh is out ends it: nothing it counted under the class it left arrives, though the view has read the text again at the new class meanwhile, nothing is set again, and the mark goes with the class (issue #212)', async () => {
  const s = { ...script, [opKeyOf(F.docMetadata(D + '.1'))]: mintedAt(3), [opKeyOf(F.docMetadata(D + '.2'))]: mintedAt(7), [opKeyOf(F.docMetadata(D + '.3'))]: NOT_REGISTERED };
  inTurn(s, F.retrieveV(D, 1, 30), deliveredAt(BEFORE, 5));
  const fake = readingD(s);
  /** @type {string[]} */
  const told = [];
  PUMP.start({ onDirty: () => {}, onPublish: (member) => told.push(member) });
  REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  await PUMP.loadWhole(D);
  fake.fire('feed', naming(20, null));
  const release = fake.hold('op', { frame: F.docMetadata(D + '.2') });
  const out = PUMP.refresh();
  await untilAsked(fake, F.docMetadata(D + '.2'));
  fake.fire('session-died', { session: 's-1', reason: { arm: 'closed' } });
  // the view reads D again as a guest while the refresh's count is out: its text at 5 again
  for (let i = 0; i < 20 && REC.doc(D).from < 0; i++) { PUMP.pump(); await new Promise((r) => setTimeout(r, 0)); }
  assert.equal(REC.doc(D).readAt, 5, 'D\'s text read again at the new class');
  const reads = fake.asked.filter((k) => k === opKeyOf(F.retrieveV(D, 1, 30))).length;
  release();
  await out;
  assert.deepEqual([told, fake.asked.filter((k) => k === opKeyOf(F.retrieveV(D, 1, 30))).length, REC.bare()], [[], reads, false], 'its chain advanced past the member its text is, yet nothing arrives and nothing is read or set again: the death ended the refresh, the mark with it');
});

test('a publish row\'s member arriving where the box showed its plain address takes the trunk\'s text as the member it is: the box pinned on it keeps its text standing, none of it read again, the trunk holding none (issue #212)', async () => {
  const fake = FAKE.create({ ...script, ...noEditionLinks(D + '.2') });
  PORT.boot(fake);
  /** @type {Record<string, string>} */
  const pins = {};
  PUMP.start({ onDirty: () => {}, shown: showing(pins), onPublish: (member) => { const k = memberOf(member); if (k != null && k >= 2) pins[D] = versionAddress(D, k - 1); } });
  REC.setBoard({ board: 'b-1', name: '', origin: '' });
  REC.takeIndex(indexAt('complete'));
  PUMP.forget(D);
  await PUMP.loadWhole(D);
  const t = REC.doc(D), runs = t.runs, image = t.image, from = fake.asked.length;
  fake.fire('feed', published(D + '.2'));
  const m = REC.doc(D + '.1');
  assert.deepEqual([pins[D], m.runs === runs, m.image === image, m.from, m.to, REC.textBetween(D + '.1', 1, 27)], [D + '.1', true, true, 1, 31, 'Tumbler.\n\nThe first field.'], 'the box pinned on D.1, which holds the text and image D held');
  assert.deepEqual([t.from, t.runs], [-1, []], 'D holds none of it');
  await settle();
  assert.deepEqual(fake.asked.slice(from), [FAKE.keyOf('op', { frame: F.editionLinksIn(D + '.2') })], 'none of its text read: the member the row names read alone, for the edition claims the row may have written');
});

/**
 * The trail holding, for each of `ats`, an entry the reader has left at D's
 * plain address whose view read D's text at that position, the walk standing
 * in D, and the cursor on an entry past them: those entries, oldest first.
 * @param {number[]} ats
 */
function leftAt(ats) {
  TRAIL._reset();
  const view = { x: 0, y: 0, scale: 1 }, entry = (/** @type {string} */ addr) => ({ addr, pos: null, width: null, view, label: null, notice: null });
  TRAIL.push(entry(D), null);
  ats.forEach((at, i) => TRAIL.push(entry(i + 1 < ats.length ? D : '1.0.1.0.127'), { view, reading: { addr: D, at, pos: 1, width: 8, ids: [], around: [], p: { x: 0, y: 0 }, line: { x: 0, y: 0 }, fs: 1, top: 0 }, stood: { addr: D, pos: 1, ids: [], of: [], end: null } }));
  return TRAIL.all().slice(0, ats.length);
}
/** what a trail entry names: its place, the document its view read and the one its walk stood in */
const named = (/** @type {import('../nav/trail.js').Entry} */ e) => [e.addr, e.reading && e.reading.addr, e.stood && e.stood.addr];

test('a refresh counts the chain of an edition a trail entry the reader has left read at its plain address, though the page holds none of its text — each member asked once — and the entry re-takes the member its text was by the position it was read at, one whose text the newest member is standing at the plain address; where the board gives a member no mint position, nothing is re-taken (issue #361; FP-22, FP-23)', async () => {
  const s = { ...script, [opKeyOf(F.docMetadata(D + '.1'))]: mintedAt(3), [opKeyOf(F.docMetadata(D + '.3'))]: NOT_REGISTERED };
  // D.2 minted at 7; at the second refresh, answering no mint position
  inTurn(s, F.docMetadata(D + '.2'), mintedAt(7), { result: { ...mintedAt(7).result, at: null } });
  const fake = FAKE.create(s);
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {}, readings: TRAIL.readings, onCounted: TRAIL.countedAt });
  REC.setBoard({ board: 'b-1', name: '', origin: '' });
  REC.takeIndex(indexAt('complete'));
  try {
    const [early, late] = leftAt([5, 8]);
    assert.deepEqual([REC.doc(D).from, PUMP.visibleDocs().length], [-1, 0], 'none of D\'s text held, the view far from it');
    let from = fake.asked.length;
    fake.fire('feed', naming(20, null));
    await PUMP.refresh();
    assert.deepEqual(metadataAsked(fake, from), [D + '.1', D + '.2', D + '.3'], 'D\'s chain counted, each member asked once');
    assert.deepEqual([named(early), named(late)], [[D + '.1', D + '.1', D + '.1'], [D, D, D]], 'the entry read at 5 re-takes D.1, minted at 3 and followed by D.2, minted at 7; the one read at 8 read D.2, the newest, and stands at the plain address');
    assert.deepEqual([early.newer, late.newer], [{ [D]: 2 }, {}], 'the chain\'s count told with it: the entry re-taken marked with D.2, the newest member; the other unmarked (issue #240)');
    const [again] = leftAt([5]);
    from = fake.asked.length;
    fake.fire('feed', naming(21, null));
    await PUMP.refresh();
    assert.deepEqual([metadataAsked(fake, from), named(again)], [[D + '.1', D + '.2', D + '.3'], [D, D, D]], 'D.2 answering no mint position: the chain cannot tell the member, and the entry stands at the plain address');
    assert.deepEqual(fake.unanswered, []);
  } finally { TRAIL._reset(); }
});

test('a refresh counts once the chain of an edition whose text the page holds at its plain address and that trail entries the reader has left read there, down to the earliest position any of them was read at — each member asked once — and tells it to the trail before the arrival it finds: each entry re-takes the member its own text was, never the one the held text is (issue #361; FP-22, FP-23)', async () => {
  // D.1 minted at 1, D.2 at 4, D.3 at 7, no D.4
  const s = { ...script, [opKeyOf(F.docMetadata(D + '.1'))]: mintedAt(1), [opKeyOf(F.docMetadata(D + '.2'))]: mintedAt(4), [opKeyOf(F.docMetadata(D + '.3'))]: mintedAt(7), [opKeyOf(F.docMetadata(D + '.4'))]: NOT_REGISTERED };
  const fake = FAKE.create(s);
  PORT.boot(fake);
  /** @type {Record<string, string>} */
  const pins = {};
  /** @type {Array<[string, number | null, number | null]>} each arrival as N-GO is told it: its member, its position and the newest member known */
  const told = [];
  // the arrival as N-GO takes it: every entry left at D's plain address re-taking the member before the one published, and D's box pinned on it
  PUMP.start({ onDirty: () => {}, shown: showing(pins), readings: TRAIL.readings, onCounted: TRAIL.countedAt, onPublish: (member, at, newest) => { told.push([member, at, newest]); const k = memberOf(member); if (k != null && k >= 2) { TRAIL.arrivedAt(D, versionAddress(D, k - 1), at, Math.max(k, newest ?? k)); pins[D] = versionAddress(D, k - 1); } } });
  REC.setBoard({ board: 'b-1', name: '', origin: '' });
  REC.takeIndex(indexAt('complete'));
  // D's text held at its plain address, read at 5 — D.2's — and its chain probed to three members
  REC.takeDelivery(D, [{ pos: 1, width: 30, kind: 'content', text: BEFORE, ref: null, origin: null }], 5);
  REC.takeMembers(D, 3);
  try {
    const [early, same] = leftAt([2, 5]);
    const from = fake.asked.length;
    fake.fire('feed', naming(20, null));
    await PUMP.refresh();
    assert.deepEqual(metadataAsked(fake, from), [D + '.3', D + '.4', D + '.2', D + '.1'], 'counted once from the end the record held, then down to D.1, the member minted at or before 2: each member asked once');
    assert.deepEqual([named(early), named(same)], [[D + '.1', D + '.1', D + '.1'], [D + '.2', D + '.2', D + '.2']], 'the entry read at 2 re-takes D.1, the one read at 5 D.2: each the member its own text was');
    assert.deepEqual([pins[D], REC.textBetween(D + '.2', 1, 31)], [D + '.2', BEFORE], 'the arrival taken after: D\'s box pinned on D.2, which holds the text');
    assert.deepEqual([told, early.newer, same.newer], [[[D + '.3', null, 3]], { [D]: 3 }, { [D]: 3 }], 'the arrival told with the chain\'s count, version 3, as the newest member known, and each entry re-taken marked with it (issue #240)');
    assert.deepEqual(fake.unanswered, []);
  } finally { TRAIL._reset(); }
});

// ---- a row naming a document the view shows -------------------------------------------------------------------------

/** a published feed row of `op` naming the documents `docs`, at `position` */
const writing = (/** @type {number} */ position, /** @type {string[]} */ docs, op = 'insert') => ({ board: 'b-1', update: { position, at: position, op, docs, class: 'published' } });
/** D's chain as a read again counts it from its first member: one member, the second not registered */
const ONE_MEMBER = { [opKeyOf(F.docMetadata(D + '.1'))]: mintedAt(3), [opKeyOf(F.docMetadata(D + '.2'))]: NOT_REGISTERED };
/** how many times the fake port was asked a frame */
const timesAsked = (/** @type {ReturnType<typeof FAKE.create>} */ fake, /** @type {object} */ frame) => fake.asked.filter((k) => k === opKeyOf(frame)).length;

test('a feed row naming a document the view shows keeps what the page holds of it — its text, its image, its extent and its links — while it is read again, the view asking nothing of it meanwhile, then sets it in one step from what that read answers; a document the row names out of view is dropped (issue #285)', async () => {
  const OUT = '1.0.2.0.7';
  const s = { ...script, ...ONE_MEMBER };
  // D's text read at 5 before the row and at 9 after it
  inTurn(s, F.retrieveV(D, 1, 30), deliveredAt(BEFORE, 5), deliveredAt(AFTER, 9));
  const fake = readingD(s);
  await settle();
  assert.deepEqual([REC.textBetween(D, 1, 31), REC.doc(D).readAt, [...REC.doc(D).links]], [BEFORE, 5, [D + '.0.2.1']], 'D read at its reading em');
  // a document of another account's read before, out of view
  REC.takeDelivery(OUT, [{ pos: 1, width: 5, kind: 'content', text: 'other', ref: null, origin: null }], 5);
  const d = REC.doc(D), runs = d.runs, image = d.image, drops = REC.dropsOf(D), from = fake.asked.length;
  /** whether a frame met D emptied, from the row until its read again lands */
  let emptied = false;
  REC.watch(() => { if (REC.doc(D).from < 0 || REC.doc(D).extent == null) emptied = true; });
  const release = fake.hold('op', { frame: F.retrieveV(D, 1, 30) });
  fake.fire('feed', writing(20, [D, OUT]));
  assert.deepEqual([d.runs === runs, d.image === image, d.extent, [...d.links], REC.dropsOf(D)], [true, true, 30, [D + '.0.2.1'], drops + 1], 'at the row: D stands as held, its drop counted');
  assert.equal(REC.doc(OUT).from, -1, 'the document out of view dropped');
  await untilAsked(fake, F.retrieveV(D, 1, 30));
  for (let i = 0; i < 5; i++) { PUMP.pump(); await flush(); }
  assert.deepEqual([REC.textBetween(D, 1, 31), PUMP.settled()], [BEFORE, false], 'while its read is out: D as held, the page not settled');
  release();
  await settle();
  assert.deepEqual([REC.textBetween(D, 1, 31), REC.doc(D).readAt, REC.doc(D).runs !== runs, emptied], [AFTER, 9, true, false], 'set in one step from its read again, never emptied meanwhile');
  assert.deepEqual([timesAsked(fake, F.retrieveV(D, 1, 30)), timesAsked(fake, F.image(D, 1, 30))], [2, 2], 'its text and its image read again once');
  assert.ok(!fake.asked.slice(from).some((k) => k.includes(JSON.stringify(OUT))), 'nothing read of the document out of view');
  assert.deepEqual(fake.unanswered, []);
});

test('rows naming a shown document while its read again is out queue one more read: the read out lands setting nothing, the next sets the text read after the last row, and the rows together read it once more, never once a row (issue #285)', async () => {
  const MIDDLE = 'Tumbler.\n\nThe first field, mid';
  const s = { ...script, ...ONE_MEMBER };
  inTurn(s, F.retrieveV(D, 1, 30), deliveredAt(BEFORE, 5), deliveredAt(MIDDLE, 7), deliveredAt(AFTER, 9));
  const fake = readingD(s);
  await settle();
  let sawMiddle = false;
  REC.watch(() => { if (REC.textBetween(D, 1, 31) === MIDDLE) sawMiddle = true; });
  const release = fake.hold('op', { frame: F.retrieveV(D, 1, 30) });
  fake.fire('feed', writing(20, [D]));
  for (let i = 0; i < 20 && timesAsked(fake, F.retrieveV(D, 1, 30)) < 2; i++) await flush();
  fake.fire('feed', writing(21, [D]));
  fake.fire('feed', writing(22, [D]));
  assert.equal(REC.textBetween(D, 1, 31), BEFORE, 'D as held while its read is out');
  release();
  await settle();
  assert.deepEqual([REC.textBetween(D, 1, 31), REC.doc(D).readAt, sawMiddle], [AFTER, 9, false], 'set from the read after the last row; the read the rows overtook set nothing');
  assert.equal(timesAsked(fake, F.retrieveV(D, 1, 30)), 3, 'two reads again: the one the rows overtook, and one more');
  assert.deepEqual(fake.unanswered, []);
});

test('a shown document\'s read again one part of which the board did not answer sets nothing — every part as held, the text among it, the view asking nothing of it — and is made again at the daemon\'s running, set then from its answers alone (issue #285)', async () => {
  const s = { ...script, ...ONE_MEMBER };
  inTurn(s, F.retrieveV(D, 1, 30), deliveredAt(BEFORE, 5), UNREACHABLE, deliveredAt(AFTER, 9));
  // its links read again answering a second, which is set only once every read has answered
  const [L1, L2] = [D + '.0.2.1', D + '.0.2.2'], touching = (/** @type {string[]} */ addrs) => ({ result: { as_of: 7, resp: 'addrs', addrs } });
  inTurn(s, F.findLinksV(D, 1, 30), touching([L1]), touching([L1, L2]));
  s[opKeyOf(F.readLink(L2))] = citation(14, [{ start: '1.0.1.0.127', width: '0.0.0.0.1' }]);
  const fake = readingD(s);
  await settle();
  const rev = REC.doc(D).rev;
  fake.fire('feed', writing(20, [D]));
  await settle();
  assert.deepEqual([timesAsked(fake, F.retrieveV(D, 1, 30)), REC.textBetween(D, 1, 31), [...REC.doc(D).links], REC.doc(D).rev], [2, BEFORE, [L1], rev], 'its text not answered: nothing set — its links as held, though their read again answered another');
  for (let i = 0; i < 5; i++) { PUMP.pump(); await flush(); }
  assert.equal(timesAsked(fake, F.retrieveV(D, 1, 30)), 2, 'nothing asked of it while the board is out');
  fake.fire('daemon', { board: 'b-1', state: 'running' });
  await settle();
  assert.deepEqual([timesAsked(fake, F.retrieveV(D, 1, 30)), REC.textBetween(D, 1, 31), REC.doc(D).readAt, [...REC.doc(D).links]], [3, AFTER, 9, [L1, L2]], 'made again at running, and set in one step');
  assert.deepEqual(fake.unanswered.filter((k) => k !== opKeyOf(F.retrieveV(D, 1, 30))), []);
});

test('a shown document whose read again the board did not answer, the view leaving it meanwhile, is dropped as a document out of view is — never left as it stood with nothing to read it again — and read as the view reads it once it is shown again (issue #285)', async () => {
  const s = { ...script, ...ONE_MEMBER };
  inTurn(s, F.retrieveV(D, 1, 30), deliveredAt(BEFORE, 5), UNREACHABLE, deliveredAt(AFTER, 9));
  const fake = readingD(s);
  await settle();
  fake.fire('feed', writing(20, [D]));
  await settle();
  assert.equal(REC.textBetween(D, 1, 31), BEFORE, 'its text not answered: held');
  CAM._reset();
  fake.fire('daemon', { board: 'b-1', state: 'running' });
  await settle();
  assert.deepEqual([REC.doc(D).from, timesAsked(fake, F.retrieveV(D, 1, 30))], [-1, 2], 'the view gone from it: dropped, and not read');
  readAt(D, 30);
  await settle();
  assert.deepEqual([REC.textBetween(D, 1, 31), timesAsked(fake, F.retrieveV(D, 1, 30))], [AFTER, 3], 'shown again: read as the view reads it');
});

test('a shown document a feed row named whose read again is refused as withheld from the reader keeps its text until that answer, then stands as the withheld box the refusal makes it (issue #285)', async () => {
  const s = { ...script, ...ONE_MEMBER };
  inTurn(s, F.retrieveDocVSpanSet(D), script[opKeyOf(F.retrieveDocVSpanSet(D))], WITHHELD_READ);
  const fake = readingD(s);
  await settle();
  const release = fake.hold('op', { frame: F.retrieveDocVSpanSet(D) });
  fake.fire('feed', writing(20, [D]));
  await untilAsked(fake, F.retrieveDocVSpanSet(D));
  await flush();
  assert.deepEqual([REC.textBetween(D, 1, 27), REC.doc(D).refused], ['Tumbler.\n\nThe first field.', null], 'its text as held while its read is out');
  release();
  await settle();
  const d = REC.doc(D);
  assert.deepEqual([d.refused, d.from, d.extent, REC.known().includes(D)], ['withheld', -1, null, true], 'withheld: nothing of its text held, the withheld box the model knows standing in its place');
});

/** long enough for what stands held while it is read again to have stood KEPT_MS */
const pastTheSecond = () => new Promise((r) => setTimeout(r, PUMP.KEPT_MS + 20));
/** what a kept holder answers (`kept`, `claimsKept`, `boardKept`), its stamp read as whether it falls between `t0` and `t1` by the page's clock */
const keptBetween = (/** @type {{met: unknown, since: number} | null} */ k, /** @type {number} */ t0, /** @type {number} */ t1) => (k ? { met: k.met, since: k.since >= t0 && k.since <= t1 } : null);

test('a shown document a feed row named stands kept once its read again has been out KEPT_MS — nothing before, then the document with no refusal while its read is out — and is kept no more from the step its read sets it, each change counted (issue #345)', async () => {
  const s = { ...script, ...ONE_MEMBER };
  inTurn(s, F.retrieveV(D, 1, 30), deliveredAt(BEFORE, 5), deliveredAt(AFTER, 9));
  const fake = readingD(s);
  await settle();
  const release = fake.hold('op', { frame: F.retrieveV(D, 1, 30) });
  const t0 = Date.now();
  fake.fire('feed', writing(20, [D]));
  const t1 = Date.now();
  await untilAsked(fake, F.retrieveV(D, 1, 30));
  const rev = PUMP.keptRevision();
  assert.deepEqual([PUMP.kept(D), PUMP.keptAll().docs], [null, []], 'before the second: not kept');
  await pastTheSecond();
  assert.deepEqual([keptBetween(PUMP.kept(D), t0, t1), PUMP.keptAll().docs, PUMP.keptRevision()], [{ met: null, since: true }, [D], rev + 1], 'past the second: kept from the row\'s arrival, no refusal met while its read is out');
  let watching = true, lagged = false;
  REC.watch(() => { if (watching && REC.textBetween(D, 1, 31) === AFTER && PUMP.kept(D)) lagged = true; });
  release();
  await settle();
  watching = false;
  assert.deepEqual([REC.textBetween(D, 1, 31), PUMP.kept(D), lagged, PUMP.keptRevision()], [AFTER, null, false, rev + 2], 'set: kept no more, in no step that holds its new text');
  assert.deepEqual(fake.unanswered, []);
});

test('a shown document\'s read again the board does not answer leaves it kept, saying the refusal its read met, until the read made at running sets it; then its readers are told again, for one that read it in the wait read what stood (issue #345)', async () => {
  const s = { ...script, ...ONE_MEMBER };
  inTurn(s, F.retrieveV(D, 1, 30), deliveredAt(BEFORE, 5), UNREACHABLE, deliveredAt(AFTER, 9));
  /** @type {PUMP.Dropped[]} */
  const told = [];
  const fake = readingD(s, (x) => { told.push(x); });
  await settle();
  const t0 = Date.now();
  fake.fire('feed', writing(20, [D]));
  const t1 = Date.now();
  await settle();
  await pastTheSecond();
  assert.deepEqual([REC.textBetween(D, 1, 31), keptBetween(PUMP.kept(D), t0, t1)], [BEFORE, { met: UNREACHABLE.refused, since: true }], 'its text not answered: held, kept from the row\'s arrival, the refusal named');
  const whole = await PUMP.wholeOf(D);
  assert.equal(REC.textBetween(D, 1, 31), BEFORE, 'a whole read in the wait reads what stands');
  assert.ok(whole.doc);
  const before = told.length;
  fake.fire('daemon', { board: 'b-1', state: 'running' });
  await settle();
  assert.deepEqual([REC.textBetween(D, 1, 31), PUMP.kept(D)], [AFTER, null], 'made again at running and set: kept no more');
  assert.deepEqual(told.slice(before).map((x) => [x.row, x.addrs]), [[null, [D]]], 'its readers told again once it is set');
  assert.deepEqual(fake.unanswered.filter((k) => k !== opKeyOf(F.retrieveV(D, 1, 30))), []);
});

test('a shown document a read again sets with no wait tells its readers nothing more: a reader of it then waited on that read (issue #345)', async () => {
  const s = { ...script, ...ONE_MEMBER };
  inTurn(s, F.retrieveV(D, 1, 30), deliveredAt(BEFORE, 5), deliveredAt(AFTER, 9));
  /** @type {PUMP.Dropped[]} */
  const told = [];
  const fake = readingD(s, (x) => { told.push(x); });
  await settle();
  fake.fire('feed', writing(20, [D]));
  const after = told.length;
  await settle();
  assert.deepEqual([REC.textBetween(D, 1, 31), told.slice(after)], [AFTER, []], 'set, the row\'s drop the one telling');
  assert.deepEqual(fake.unanswered, []);
});

test('a shown document a row names records how its reads set it, with the stamp it stood from — unchanged where the board answered the text it showed, changed where other words came, changed where it came withheld — its stamp listed while its second has not passed; and nothing where it is let go unset, the view gone from it and a row voiding its read (issue #369)', async () => {
  const s = { ...script, ...ONE_MEMBER };
  inTurn(s, F.retrieveV(D, 1, 30), deliveredAt(BEFORE, 5), deliveredAt(BEFORE, 7), deliveredAt(AFTER, 9));
  // the view's read of its extent, then the reads again of the first two rows, as the board answers them; then withheld
  inTurn(s, F.retrieveDocVSpanSet(D), ...Array(3).fill(script[opKeyOf(F.retrieveDocVSpanSet(D))]), WITHHELD_READ, script[opKeyOf(F.retrieveDocVSpanSet(D))]);
  const fake = readingD(s);
  await settle();
  /** a row naming D, the page's clock held still as it comes: the stamp it leaves D kept from */
  const kept = (/** @type {number} */ position) => { const at = Date.now(), clock = Date.now; Date.now = () => at; try { fake.fire('feed', writing(position, [D])); } finally { Date.now = clock; } return at; };
  let at = kept(20);
  assert.deepEqual([PUMP.keptSoon().has(at), PUMP.liftOf('doc', D)], [true, null], 'as the row comes: its stamp within its second, no setting yet');
  await settle();
  assert.deepEqual([PUMP.liftOf('doc', D), PUMP.keptSoon().has(at)], [{ since: at, outcome: 'unchanged' }, false], 'the board answered the text as it stood: unchanged');
  at = kept(21);
  await settle();
  assert.deepEqual([PUMP.liftOf('doc', D), REC.textBetween(D, 1, 31)], [{ since: at, outcome: 'changed' }, AFTER], 'other words: changed');
  at = kept(22);
  await settle();
  assert.deepEqual([PUMP.liftOf('doc', D), REC.doc(D).refused], [{ since: at, outcome: 'changed' }, 'withheld'], 'withheld from the reader: changed');
  // read again whole, the view gone from it while a row's read of it is out
  REC.invalidate(D); PUMP.forget(D);
  await settle();
  const release = fake.hold('op', { frame: F.retrieveV(D, 1, 30) }), asks = () => timesAsked(fake, F.retrieveV(D, 1, 30)), before = asks();
  kept(23);
  await until(() => asks() > before, 'the row\'s read of its text out');
  CAM._reset();
  fake.fire('feed', writing(24, [D]));
  release();
  await settle();
  assert.deepEqual([PUMP.kept(D), PUMP.liftOf('doc', D)], [null, null], 'let go unset: no setting recorded');
});

test('a document a refresh reads again stands kept past KEPT_MS while that read is out, and, where the board left a part of it unheard, until its read again sets it (issue #345)', async () => {
  const s = { ...script, [opKeyOf(F.docMetadata(D + '.1'))]: mintedAt(3), [opKeyOf(F.docMetadata(D + '.2'))]: NOT_REGISTERED };
  inTurn(s, F.findLinksV(D, 1, 30), script[opKeyOf(F.findLinksV(D, 1, 30))], UNREACHABLE, script[opKeyOf(F.findLinksV(D, 1, 30))]);
  const fake = readingD(s);
  await settle();
  const t0 = Date.now();
  fake.fire('feed', naming(20, null));
  const t1 = Date.now();
  await PUMP.refresh();
  await settle();
  await pastTheSecond();
  assert.deepEqual(keptBetween(PUMP.kept(D), t0, t1), { met: UNREACHABLE.refused, since: true }, 'its links unheard: kept past the refresh, from the bare row that left the board behind');
  fake.fire('daemon', { board: 'b-1', state: 'running' });
  await settle();
  assert.equal(PUMP.kept(D), null, 'its read again made at running answered: kept no more');
  assert.deepEqual(fake.unanswered, []);
});

test('a shown document a refresh reads again, one part of which the board did not answer, sets nothing — every part as held, the view asking nothing of it, the board not marked again — and is read again as a row naming it is: kept, saying the refusal its read met, until the read made at the daemon\'s running sets it in one step, its readers then told again (issue #371)', async () => {
  const s = { ...script, ...ONE_MEMBER };
  inTurn(s, F.retrieveV(D, 1, 30), deliveredAt(BEFORE, 5), UNREACHABLE, deliveredAt(AFTER, 9));
  // its links read again answering a second, which is set only once every read has answered
  const [L1, L2] = [D + '.0.2.1', D + '.0.2.2'], touching = (/** @type {string[]} */ addrs) => ({ result: { as_of: 7, resp: 'addrs', addrs } });
  inTurn(s, F.findLinksV(D, 1, 30), touching([L1]), touching([L1, L2]));
  s[opKeyOf(F.readLink(L2))] = citation(14, [{ start: '1.0.1.0.127', width: '0.0.0.0.1' }]);
  /** @type {PUMP.Dropped[]} */
  const told = [];
  const fake = readingD(s, (x) => { told.push(x); });
  await settle();
  const meta = REC.doc(D).meta;
  const t0 = Date.now();
  fake.fire('feed', naming(20, null));
  const t1 = Date.now();
  await PUMP.refresh();
  await settle();
  assert.deepEqual([timesAsked(fake, F.retrieveV(D, 1, 30)), REC.textBetween(D, 1, 31), [...REC.doc(D).links], REC.link(L2), REC.doc(D).meta === meta, REC.bare()], [2, BEFORE, [L1], undefined, true, false], 'its text not answered: nothing set — its links and its metadata as held, though the refresh read them again — and the board not marked again');
  for (let i = 0; i < 5; i++) { PUMP.pump(); await flush(); }
  assert.equal(timesAsked(fake, F.retrieveV(D, 1, 30)), 2, 'nothing asked of it while the board is out');
  await pastTheSecond();
  assert.deepEqual(keptBetween(PUMP.kept(D), t0, t1), { met: UNREACHABLE.refused, since: true }, 'kept from the bare row, the refusal its read met named');
  const before = told.length;
  fake.fire('daemon', { board: 'b-1', state: 'running' });
  await settle();
  assert.deepEqual([timesAsked(fake, F.retrieveV(D, 1, 30)), REC.textBetween(D, 1, 31), REC.doc(D).readAt, [...REC.doc(D).links], REC.link(L2)?.addr, PUMP.kept(D)], [3, AFTER, 9, [L1, L2], L2, null], 'made again at running and set in one step: kept no more');
  assert.deepEqual(told.slice(before).map((x) => [x.row, x.addrs]), [[null, [D]]], 'its readers told again once it is set');
  assert.deepEqual(fake.unanswered, []);
});

test('the edition claims a row changed on an origin a shown document windows stand kept once their read again has been out KEPT_MS, saying the refusal the lookup met where the board does not answer, until the read made at running sets them (issue #345)', async () => {
  const NEW_HOME = '1.0.1.0.31', NEW = NEW_HOME + '.0.2.1';
  const s = claimed({ ...script, ...claimAt(NEW_HOME) });
  inTurn(s, F.editionClaimsAt(O), claimsOn([EDITION, FORK]), UNREACHABLE, claimsOn([EDITION, FORK, NEW]));
  const fake = readingD(s);
  forgetClaims();
  await settle();
  const t0 = Date.now();
  fake.fire('feed', { board: 'b-1', update: { position: 10, at: 10, class: 'published', op: 'make_link', docs: [NEW_HOME], link: NEW } });
  const t1 = Date.now();
  await until(() => askedOf(fake, F.editionClaimsAt(O)) === 2, 'the claims read again');
  await settle();
  assert.deepEqual([REC.editionClaimsOf(O), PUMP.claimsKept(O)], [[EDITION, FORK], null], 'the lookup not answered: the claims held, not kept before the second');
  await pastTheSecond();
  assert.deepEqual([keptBetween(PUMP.claimsKept(O), t0, t1), PUMP.keptAll().origins], [{ met: UNREACHABLE.refused, since: true }, [O]], 'past the second: kept from the row\'s arrival, the refusal the lookup met');
  fake.fire('daemon', { board: 'b-1', state: 'running' });
  await settle();
  assert.deepEqual([REC.editionClaimsOf(O), PUMP.claimsKept(O), PUMP.keptAll().origins], [[EDITION, FORK, NEW], null, []], 'read again at running and set: kept no more');
});

test('a row touching a doc 1 keeps the byline cause of the owner of a document the view shows as held, never emptied: the view reads it again at once, missing while out, the cause standing meanwhile and through a read the board does not answer until the read made at running; a row naming the shown document too reads it with that document\'s reads, set with them in one step; another account\'s cause is dropped (FP-23, FP-34; AUTH-2.127)', async (t) => {
  t.mock.method(performance, 'now', () => 1000);
  REC._reset();
  const s = { ...script, ...ONE_MEMBER, [opKeyOf(F.enrollmentsOf('1.0.1'))]: { result: { as_of: 1, resp: 'addrs', addrs: [] } } };
  // D's owner's byline as the board answers it in turn: unsigned; not recorded; not answered; unsigned; not recorded
  inTurn(s, F.keySet('1.0.1'), keySetOf([]), keySetOf(ONE_KEY), UNREACHABLE, keySetOf([]), keySetOf(ONE_KEY));
  inTurn(s, F.retrieveV(D, 1, 30), deliveredAt(BEFORE, 5), deliveredAt(AFTER, 9));
  /** a feed row of a credential record's link made in another account's doc 1, the board answering the link as one */
  const enrolling = (/** @type {number} */ position) => {
    const link = `1.0.7.0.1.0.2.${position}`;
    s[opKeyOf(F.readLink(link))] = enrollment(`1.0.7.0.1.0.1.${position}`, '1.0.7');
    return { board: 'b-1', update: { position, at: position, op: 'make_link', docs: ['1.0.7.0.1'], class: 'published', link } };
  };
  /** the cause the page holds of an account's byline, else null */
  const causeOf = (/** @type {string} */ account) => { const f = REC.accountKey(account); return f && 'cause' in f ? f.cause : null; };
  const fake = readingD(s);
  await settle();
  assert.deepEqual([causeOf('1.0.1'), asksOf(fake, F.keySet('1.0.1')), REC.textBetween(D, 1, 31)], ['unsigned', 1, BEFORE], 'D read at its reading em, its owner\'s byline with it');
  REC.takeAccountKey('1.0.2', { cause: 'unsigned' });
  /** whether a frame met D's owner's byline emptied, or, once a row names D, set before D's text */
  let watching = true, alongD = false, emptied = false, early = false;
  REC.watch(() => {
    if (!watching) return;
    if (causeOf('1.0.1') === null) emptied = true;
    if (alongD && causeOf('1.0.1') === 'not-recorded' && REC.textBetween(D, 1, 31) === BEFORE) early = true;
  });
  const rev = REC.doc(D).rev, release = fake.hold('op', { frame: F.keySet('1.0.1') });
  fake.fire('feed', enrolling(20));
  assert.deepEqual([causeOf('1.0.1'), REC.causeOwed('1.0.1'), REC.doc(D).rev, REC.accountKey('1.0.2')], ['unsigned', true, rev, undefined], 'at the row: the shown document\'s owner\'s cause stands as held, owed its read again, D made again for nothing; another account\'s cause dropped');
  await settle();
  assert.deepEqual([asksOf(fake, F.keySet('1.0.1')), PUMP.settled(), causeOf('1.0.1')], [2, false, 'unsigned'], 'the view reads it again at once, missing while out, the cause standing meanwhile');
  release();
  await settle();
  assert.deepEqual([causeOf('1.0.1'), REC.causeOwed('1.0.1'), asksOf(fake, F.keySet('1.0.1'))], ['not-recorded', false, 2], 'answered: taken, owed no more, and not asked again');
  fake.fire('feed', enrolling(21));
  await settle();
  assert.deepEqual([causeOf('1.0.1'), REC.causeOwed('1.0.1'), asksOf(fake, F.keySet('1.0.1')), PUMP.settled(), PUMP.factsUnheard('1.0.1')], ['not-recorded', true, 3, true, true], 'read again after the next row, the board not answering: the cause stands, owed still, its read held and said unheard, nothing missing in its pause');
  fake.fire('daemon', { board: 'b-1', state: 'running' });
  await settle();
  assert.deepEqual([causeOf('1.0.1'), REC.causeOwed('1.0.1'), asksOf(fake, F.keySet('1.0.1')), PUMP.factsUnheard('1.0.1')], ['unsigned', false, 4, false], 'asked again at running, and taken');
  // a row naming D and a doc 1: D read again, its owner's byline among its reads
  const text = fake.hold('op', { frame: F.retrieveV(D, 1, 30) }), held = REC.doc(D).rev;
  alongD = true;
  fake.fire('feed', writing(30, [D, '1.0.7.0.1']));
  for (let i = 0; i < 20 && timesAsked(fake, F.retrieveV(D, 1, 30)) < 2; i++) await flush();
  for (let i = 0; i < 5; i++) { PUMP.pump(); await flush(); }
  assert.deepEqual([causeOf('1.0.1'), REC.causeOwed('1.0.1'), REC.doc(D).rev, REC.textBetween(D, 1, 31), asksOf(fake, F.keySet('1.0.1'))], ['unsigned', true, held, BEFORE, 4], 'while D\'s reads are out: its byline and its text as held, D made again for nothing, the byline asked of nothing but D\'s reads');
  text();
  await settle();
  watching = false;
  assert.deepEqual([REC.textBetween(D, 1, 31), causeOf('1.0.1'), REC.causeOwed('1.0.1'), asksOf(fake, F.keySet('1.0.1'))], [AFTER, 'not-recorded', false, 5], 'set in one step from D\'s reads, its owner\'s byline read once among them');
  assert.deepEqual([emptied, early], [false, false], 'the byline never emptied, and never set before D\'s text');
  assert.deepEqual(fake.unanswered, []);
});

test('owner facts a shown document\'s read again takes that say other than those held are told once after it is set — a drop naming the documents the owner owns and the owner, stamped by the row that left the document behind (FP-23, FP-34)', async () => {
  const s = { ...script, ...ONE_MEMBER, [opKeyOf(F.keySet('1.0.1'))]: keySetOf(ONE_KEY), [opKeyOf(F.enrollmentsOf('1.0.1'))]: { result: { as_of: 1, resp: 'addrs', addrs: [] } } };
  inTurn(s, F.retrieveV(D, 1, 30), deliveredAt(BEFORE, 5), deliveredAt(AFTER, 9));
  /** @type {PUMP.Dropped[]} */
  const told = [];
  // D's owner's byline held as a cause, which a read of D again reads again
  REC.takeAccountKey('1.0.1', { cause: 'unsigned' });
  const fake = readingD(s, (x) => { told.push(x); });
  await settle();
  assert.equal(asksOf(fake, F.keySet('1.0.1')), 0, 'the cause held: not read as the view draws D');
  const at = Date.now(), clock = Date.now;
  Date.now = () => at;
  try { fake.fire('feed', writing(20, [D])); } finally { Date.now = clock; }
  await settle();
  const byline = told.filter((x) => x.byline);
  assert.deepEqual([REC.textBetween(D, 1, 31), REC.accountKey('1.0.1'), asksOf(fake, F.keySet('1.0.1'))], [AFTER, { cause: 'not-recorded' }, 1], 'D set again, its owner\'s byline read once among its reads');
  assert.deepEqual(byline.map((x) => [x.row, x.byline, x.addrs?.includes(D), x.at]), [[null, '1.0.1', true, at]], 'told once, naming D among 1.0.1\'s documents, from the row\'s stamp');
  assert.deepEqual(byline[0].addrs, REC.ownedBy('1.0.1'), 'every held document 1.0.1 owns');
  assert.deepEqual(fake.unanswered, []);
});

test('the board opened as the boot opens it: `boards()` first, then for the board it holds the key store, the session where one is asked, the health, the daemon and the index, in that order; an empty list or a refusal holds none, why kept, nothing asked past the list; "try again" reads the list again, one read for presses made while it is out, a board it finds opened as the boot opened one and the app told once (issue #215\'s design decision; FP-35)', async () => {
  const BOARDS = FAKE.keyOf('boards', {}), ORIGIN = 'http://127.0.0.1:8642';
  const ROW = { board: 'b-1', name: ORIGIN, origin: ORIGIN };
  /** the board's own reads, past the list */
  const reads = {
    [FAKE.keyOf('fingerprint', {})]: { result: [] },
    [FAKE.keyOf('session', { board: 'b-1' })]: { result: { session: 's-1', principal: 1, account: '1.0.1', writes: true } },
    [FAKE.keyOf('health', { board: 'b-1' })]: { result: { health: { log_position: 8, auth: { claimant: '1.0.1', local_trust: false }, writes: { halted: false } }, mode: 'ENFORCING' } },
    [FAKE.keyOf('probe', {})]: { result: { daemon: 'running', dialed: null, signed: null } },
    [FAKE.keyOf('places', { board: 'b-1' })]: { result: indexAt('complete') },
  };
  let opened = 0;
  /** the calls a fake answered, by name */
  const names = (/** @type {ReturnType<typeof FAKE.create>} */ f) => f.calls().map((c) => c.name);
  // the list empty: no board on this machine has begun
  let fake = FAKE.create({ ...reads, [BOARDS]: { result: [] } });
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {}, onOpen: () => { opened++; } });
  const empty = await PUMP.openBoard({ session: true });
  assert.deepEqual([REC.board(), REC.noBoard(), empty.places, names(fake)], [null, 'none', null, ['boards']], 'an empty list: no board, why kept, nothing asked past the list');
  // the list refused: the board not answering
  fake = FAKE.create({ ...reads, [BOARDS]: { refused: { kind: 'unreachable', name: 'unreachable', text: 'refused' } } });
  PORT.boot(fake);
  const refused = await PUMP.openBoard({ session: true });
  assert.deepEqual([REC.board(), REC.noBoard(), refused.places, names(fake)], [null, { refused: { kind: 'unreachable', name: 'unreachable' } }, null, ['boards']], 'a refusal: no board, its kind and its name kept, nothing asked past the list');
  // "try again", the list answering now: two presses while the read is out, one read
  fake = FAKE.create({ ...reads, [BOARDS]: { result: [ROW] } });
  PORT.boot(fake);
  const release = fake.hold('boards', {});
  const first = PUMP.retryBoards(), second = PUMP.retryBoards();
  release();
  assert.deepEqual(await Promise.all([first, second]), [true, true], 'both presses answered: a board held');
  assert.deepEqual([fake.asked.filter((k) => k === BOARDS).length, names(fake)], [1, ['boards', 'fingerprint', 'session', 'health', 'probe', 'places']], 'one list read, then the board\'s reads in the boot\'s order, the session asked as the boot asked it');
  assert.deepEqual([REC.board(), REC.noBoard(), REC.session()?.session, REC.countsExact(), opened], [ROW, null, 's-1', true, 1], 'the board held, its session and its index taken, the app told once');
  assert.deepEqual([await PUMP.retryBoards(), names(fake).length, opened], [true, 6, 1], 'a board held: nothing read again, nothing told');
  // the gate's guest: no session asked
  REC._reset();
  fake = FAKE.create({ ...reads, [BOARDS]: { result: [ROW] } });
  PORT.boot(fake);
  const guest = await PUMP.openBoard({ session: false });
  assert.deepEqual([names(fake), REC.session(), guest.places && 'result' in guest.places], [['boards', 'fingerprint', 'health', 'probe', 'places'], null, true], 'a guest: the board\'s reads but the session');
  assert.deepEqual(fake.unanswered, []);
});

// ---- the boxes a change of class leaves owed their read --------------------------------------------------------------

/** the board's listing at the class after the change: nothing the tests' drafts stand among */
const NONE_LISTED = { [FAKE.keyOf('places', { board: 'b-1' })]: { result: { docs: [], counts: [], state: { arm: 'complete' } } } };
/** the session's listing: each of `drafts` a draft of its account's the session may read */
const draftsListed = (/** @type {string[]} */ drafts) => /** @type {any} */ ({ docs: drafts.map((doc) => ({ doc, kind: 'draft', label: 'the draft ' + doc, standing: 'yours_to_read' })), counts: [], state: { arm: 'building' } });
/** a draft the session read: its extent and its text, the view's answers for it forgotten */
const readDraft = (/** @type {string} */ doc) => {
  REC.takeSpanSet(doc, [{ subspace: 1, ordinal: 1, positions: 12 }]);
  REC.takeDelivery(doc, [{ pos: 1, width: 12, kind: 'content', text: 'draft words.', ref: null, origin: null }]);
  PUMP.forget(doc);
};
/** the camera over an account's HOME cell, at mid scale */
const atHome = (/** @type {string} */ account) => { CAM.setViewport(1440, 900); CAM.set(CAM.viewForCell(accountCell(account), 0.85)); };
/** the camera over an account's HOME cell at far scale: its documents' boxes half LOD_FAR_LO px across */
const farOver = (/** @type {string} */ account) => { CAM.setViewport(1440, 900); CAM.set({ ...CAM.viewForCell(accountCell(account), 0.85), scale: (LOD_FAR_LO / DOC_W) * 0.5 }); };
/** how many times the fake port was asked a document's extent */
const extentAsks = (/** @type {ReturnType<typeof FAKE.create>} */ fake, /** @type {string} */ doc) => fake.asked.filter((k) => k === opKeyOf(F.retrieveDocVSpanSet(doc))).length;

test('a session ending with the view at far scale covers at once each draft the session could read — a box the model knows, nothing read of it there — and the view reads it as it comes nearer, once, in the guest form, the guest\'s refusal confirming the cover (issue #350\'s design decision: "No draft is read at far scale … it is read when the view comes nearer")', async () => {
  const DR = '1.0.1.0.5';
  const fake = FAKE.create({ ...NONE_LISTED, [opKeyOf(F.retrieveDocVSpanSet(DR))]: WITHHELD_READ });
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.setBoard({ board: 'b-1', name: '', origin: '' }); REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  REC.takeIndex(draftsListed([DR]));
  readDraft(DR);
  farOver('1.0.1');
  assert.equal(lodOf(CAM.cam.scale).name, 'far', 'the view at far scale over the draft\'s account');
  const sent = sessionsSent(fake);
  fake.fire('session-died', { session: 's-1', reason: { arm: 'closed' } });
  const dr = REC.doc(DR);
  assert.deepEqual([dr.from, dr.extent, dr.refused, REC.covered(DR), REC.owed(DR), REC.known().includes(DR)], [-1, null, 'withheld', true, true, true], 'at once: none of its text, covered, owed its read at the guest\'s class, a box the model knows');
  await pumped(6);
  assert.deepEqual([extentAsks(fake, DR), sent, PUMP.rereading(), PUMP.settled()], [0, [], false, true], 'at far scale: nothing read of it, the change\'s reads answered, the page settled');
  atHome('1.0.1');
  await pumped(6);
  assert.deepEqual([extentAsks(fake, DR), sent], [1, ['guest']], 'nearer than far: its extent asked once, in the guest form');
  assert.deepEqual([REC.doc(DR).refused, REC.covered(DR), REC.owed(DR), REC.known().includes(DR)], ['withheld', true, false, true], 'the guest\'s read withholds it: the cover confirmed, a box the model knows');
  assert.deepEqual(fake.unanswered, []);
});

test('a session got back as another principal leaves each draft the lost one could read waiting to be read — never withheld before a read says so, a box the model knows — the draft the view stood on asked its extent at once under the new session, one out of view asked nothing until the view reaches it (issue #350\'s design decision: "the face shown straight after the change is \'waiting to be read\', except when signed out")', async () => {
  const DR = '1.0.1.0.5', OUT = '1.0.3.0.5';
  const fake = FAKE.create({
    ...opened('s-2', { principal: 2, account: '1.0.2' }), ...caughtUp('s-2', 3), ...NONE_LISTED,
    // the draft the view stands on, readable by the principal got back; the one out of view withheld from it
    [opKeyOf(F.retrieveDocVSpanSet(DR))]: { result: { as_of: 1, resp: 'span_set', set: [{ start: '1.1', width: '0.12' }] } },
    [opKeyOf(F.docMetadata(DR))]: { result: { as_of: 1, resp: 'doc_metadata', doc: DR, published: false, owner: '1.0.1', birth: null, birth_extent: null, placed: null, base_extent: null, source: null } },
    [opKeyOf(F.findLinksV(DR, 1, 12))]: { result: { as_of: 1, resp: 'addrs', addrs: [] } },
    [opKeyOf(F.retrieveDocVSpanSet(OUT))]: WITHHELD_READ,
  });
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.setBoard({ board: 'b-1', name: '', origin: '' }); REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  readHead(3);
  REC.takeIndex(draftsListed([DR, OUT]));
  readDraft(DR); readDraft(OUT);
  atHome('1.0.1');
  assert.deepEqual(PUMP.visibleDocs().map((d) => d.addr), [DR], 'the draft DR in view, OUT out of it');
  const sent = sessionsSent(fake), listing = fake.hold('places', { board: 'b-1' });
  fake.fire('session-died', { session: 's-1', reason: UNOPENED });
  await until(() => REC.session()?.session === 's-2', 'the session got back');
  for (const a of [DR, OUT]) {
    const d = REC.doc(a);
    assert.deepEqual([d.from, d.extent, d.refused, REC.covered(a), REC.owed(a), REC.known().includes(a)], [-1, null, null, false, true, true], `at once: ${a} holds none of its text and waits on its read, never withheld before a read says so, a box the model knows`);
  }
  listing();
  await pumped(6);
  assert.deepEqual([extentAsks(fake, DR), extentAsks(fake, OUT), sent.length > 0 && sent.every((x) => x === 's-2')], [1, 0, true], 'the draft the view stood on asked its extent at once, under the new session; the one out of view asked nothing');
  assert.deepEqual([REC.doc(DR).refused, REC.owed(DR), REC.doc(DR).extent, REC.owed(OUT), REC.known().includes(OUT)], [null, false, 12, true, true], 'its answer lifts the wait; the other waits still, a box the model knows');
  atHome('1.0.3');
  await pumped(6);
  assert.deepEqual([extentAsks(fake, OUT), sent.every((x) => x === 's-2'), REC.doc(OUT).refused, REC.covered(OUT), REC.owed(OUT)], [1, true, 'withheld', true, false], 'the view at it: its extent asked under the new session, which withholds it — covered');
  assert.deepEqual(fake.unanswered, []);
});

test('a refresh after a change of class keeps each box the change left: a cover in view read again and covered still, a box owed its read out of view waiting — its cover dropped with the rest, a box the model knows, nothing read of it — and read in the refresh that finds it in view, set in one step (issue #350)', async () => {
  const DR = '1.0.1.0.5', OUT = '1.0.3.0.5';
  const fake = FAKE.create({ ...NONE_LISTED, [opKeyOf(F.retrieveDocVSpanSet(DR))]: WITHHELD_READ, [opKeyOf(F.retrieveDocVSpanSet(OUT))]: WITHHELD_READ });
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.setBoard({ board: 'b-1', name: '', origin: '' }); REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  REC.takeIndex(draftsListed([DR, OUT]));
  readDraft(DR); readDraft(OUT);
  atHome('1.0.1');
  fake.fire('session-died', { session: 's-1', reason: { arm: 'closed' } });
  await pumped(6);
  assert.deepEqual([extentAsks(fake, DR), REC.covered(DR), REC.owed(DR), extentAsks(fake, OUT), REC.covered(OUT), REC.owed(OUT)], [1, true, false, 0, true, true], 'the draft the view stood on read at the guest\'s class, its cover confirmed; the one out of view covered at once and owed its read, nothing read of it');
  fake.fire('feed', naming(20, null));
  await PUMP.refresh();
  await pumped(6);
  assert.deepEqual([extentAsks(fake, DR), REC.doc(DR).refused, REC.covered(DR), REC.known().includes(DR)], [2, 'withheld', true, true], 'the refresh reads the cover in view again: covered still, a box the model knows');
  assert.deepEqual([extentAsks(fake, OUT), REC.doc(OUT).refused, REC.owed(OUT), REC.known().includes(OUT)], [0, null, true, true], 'the box out of view: its cover dropped with the rest, owed its read still, a box the model knows, nothing read of it');
  atHome('1.0.3');
  fake.fire('feed', naming(21, null));
  await PUMP.refresh();
  assert.deepEqual([extentAsks(fake, OUT), REC.covered(OUT), REC.owed(OUT)], [1, true, false], 'the next refresh, the view at it: read in that refresh and set in one step, covered');
  assert.deepEqual(fake.unanswered, []);
});

test('a change of the page\'s class while a refresh reads what the view shows ends its reads where they stand: a document still waiting its turn is never read, and none is left kept with no read again of it out (issue #371)', async () => {
  const drafts = [5, 6, 7, 8, 9, 10, 11].map((k) => '1.0.1.0.' + k);
  const fake = FAKE.create({ ...NONE_LISTED, ...Object.fromEntries(drafts.map((dr) => [opKeyOf(F.retrieveDocVSpanSet(dr)), WITHHELD_READ])) });
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.setBoard({ board: 'b-1', name: '', origin: '' }); REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  REC.takeIndex(draftsListed(drafts));
  for (const dr of drafts) readDraft(dr);
  atHome('1.0.1');
  const order = PUMP.visibleDocs().map((d) => d.addr), [last] = order.slice(6);
  assert.deepEqual([...order].sort(), [...drafts].sort(), 'the seven drafts in view');
  // the six the refresh reads at once held, the seventh waiting its turn
  const releases = order.slice(0, 6).map((dr) => fake.hold('op', { frame: F.retrieveDocVSpanSet(dr) }));
  fake.fire('feed', naming(20, null));
  const refreshed = PUMP.refresh();
  await until(() => order.slice(0, 6).every((dr) => extentAsks(fake, dr) === 1), 'the first six read');
  fake.fire('session-died', { session: 's-1', reason: { arm: 'closed' } });
  for (const release of releases) release();
  await refreshed;
  await pastTheSecond();
  assert.deepEqual([extentAsks(fake, last), PUMP.keptAll().docs], [0, []], 'the seventh never read, and no document kept');
  assert.deepEqual(fake.unanswered, []);
});

// ---- the stream's gap ---------------------------------------------------------------------------------------------

/** a feed row of `op` at `position` naming `docs`, of class `cls`: a drafts row sent under s-1 */
const rowOf = (/** @type {number} */ position, /** @type {string[]} */ docs, cls = 'published', op = 'insert') => ({ position, at: position, op, docs, class: cls, ...(cls === 'drafts' ? { session: 's-1' } : {}) });
/** a page signed in under s-1 on b-1, its place on the feed `head`, over a board answering `s` */
function signedIn(/** @type {Record<string, unknown>} */ s, head = 10) {
  const fake = FAKE.create(s);
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.setBoard({ board: 'b-1', name: '', origin: '' }); REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  readHead(head);
  return fake;
}
/** the board refusing `changes` for a position it no longer holds the history of */
const RECLAIMED = { refused: { kind: 'refused', name: 'history_reclaimed', status: 410, code: 'history_reclaimed', detail: null, op: null, body: { error: 'history_reclaimed', floor: 12 } } };

test('the event stream\'s drop holds every row until the stream reopens and its catch-up reads `changes` from the last position the page took, under the page\'s session: the rows the dropped stream never sent and those the reopened one brings taken together, each once and in position order, nothing read and nothing missing while the stream stands dropped, the page not settled while the catch-up is out (issue #367\'s design decision: "`web/model/pump.js` holds new rows and reads `changes` from its last position once it has a session")', async () => {
  const [A, B] = ['1.0.1.0.21', '1.0.1.0.22'];
  // what was written while the stream was down: an edit at 11, a draft minted at 12, edits at 13 and 14
  const fake = signedIn({ ...script, ...caughtUp('s-1', 10, [rowOf(11, [A]), rowOf(12, [B], 'drafts', 'create_new_document'), rowOf(13, [A]), rowOf(14, [A])], 14) });
  fake.drop();
  fake.fire('feed', { board: 'b-1', update: rowOf(13, [A]) });
  await flush();
  assert.deepEqual([REC.feedRows(), catchUps(fake), PUMP.settled()], [[], [], true], 'dropped: a row handed meanwhile held, nothing read, nothing missing — nothing comes while the stream is down');
  const release = fake.hold('changes', { session: 's-1', since: 10 });
  fake.reopen();
  await until(() => catchUps(fake).length === 1, 'the catch-up asked');
  // the reopened stream: a row the catch-up reads too, and one past it
  for (const u of [rowOf(14, [A]), rowOf(15, [A])]) fake.fire('feed', { board: 'b-1', update: u });
  await flush();
  assert.deepEqual([REC.feedRows(), catchUps(fake), PUMP.settled()], [[], [{ session: 's-1', since: 10 }], false], 'reopened: the catch-up asked from the last position under the page\'s session, every row held, the page not settled');
  release();
  await settle();
  assert.deepEqual(REC.feedRows().map((r) => r.position), [11, 12, 13, 14, 15], 'each position once and in order');
  assert.deepEqual([REC.place(B)?.kind, REC.feedAt(), PUMP.settled()], ['draft', 15, true], 'the draft minted in the gap listed, the page\'s place past every row taken, settled');
  fake.fire('feed', { board: 'b-1', update: rowOf(16, [A]) });
  assert.deepEqual(REC.feedRows().slice(5).map((r) => r.position), [16], 'after it, a row taken as it comes');
  assert.deepEqual(fake.unanswered, []);
});

test('a gap whose catch-up meets the page\'s session lost leaves the gap to the acquire that loss begins: one catch-up at a time — the acquire\'s from the last position, then the gap\'s from where it reached — every row taken once (issue #367)', async () => {
  const A = '1.0.1.0.21';
  const fake = signedIn({ ...script, ...opened('s-2'), [FAKE.keyOf('changes', { session: 's-1', since: 10 })]: { refused: { kind: 'shell', name: 'session_ended', session: 's-1' } }, ...caughtUp('s-2', 10, [rowOf(11, [A]), rowOf(12, [A])], 12), ...caughtUp('s-2', 12, [rowOf(13, [A])], 13) });
  fake.drop();
  fake.reopen();
  await settle();
  assert.deepEqual([catchUps(fake), opens(fake), REC.session()?.session], [[{ session: 's-1', since: 10 }, { session: 's-2', since: 10 }, { session: 's-2', since: 12 }], 1, 's-2'], 'refused as lost: the acquire\'s catch-up from the last position, then the gap\'s from where that one reached');
  assert.deepEqual([REC.feedRows().map((r) => r.position), REC.feedAt(), PUMP.settled()], [[11, 12, 13], 13, true], 'each row once, in order');
  assert.deepEqual(fake.unanswered, []);
});

test('an acquire\'s catch-up that lands while the stream stands dropped takes what it read and leaves the rows held for the gap, whose catch-up reads from where it reached once the stream reopens (issue #367)', async () => {
  const A = '1.0.1.0.21', frame = F.docMetadata(D);
  const s = { ...script, ...opened('s-2'), ...caughtUp('s-2', 10, [rowOf(11, [A])], 11), ...caughtUp('s-2', 11, [rowOf(12, [A]), rowOf(13, [A])], 13) };
  firstThen(s, frame, { refused: { kind: 'shell', name: 'session_ended', session: 's-1' } }, script[FAKE.keyOf('op', { frame })]);
  const fake = signedIn(s);
  fake.drop();
  const out = await PUMP.read(frame);
  assert.ok('answer' in out, 'the read answered under the session got back');
  assert.deepEqual([REC.session()?.session, catchUps(fake), REC.feedRows().map((r) => r.position)], ['s-2', [{ session: 's-2', since: 10 }], [11]], 'the acquire\'s catch-up taken while the stream stands dropped');
  fake.fire('feed', { board: 'b-1', update: rowOf(13, [A]) });
  assert.deepEqual(REC.feedRows().map((r) => r.position), [11], 'the stream still dropped: a row held still');
  fake.reopen();
  await settle();
  assert.deepEqual([catchUps(fake).slice(1), REC.feedRows().map((r) => r.position), REC.feedAt()], [[{ session: 's-2', since: 11 }], [11, 12, 13], 13], 'reopened: the gap\'s catch-up from where the acquire\'s reached, every row once');
  assert.deepEqual(fake.unanswered, []);
});

test('the event stream\'s drop over a guest\'s page is caught up with the guest form of `changes` — the published rows read token-free from the last position the page took, taken with the rows held, each once and in position order (issue #367; #749)', async () => {
  const [A, B] = ['1.0.1.0.21', '1.0.1.0.22'];
  // what was written while the stream was down: edits at 11 and 12
  const fake = FAKE.create({ ...script, ...caughtUpGuest('b-1', 10, [rowOf(11, [A]), rowOf(12, [B])], 12) });
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.setBoard({ board: 'b-1', name: '', origin: '' });
  readHead(10);
  fake.drop();
  fake.fire('feed', { board: 'b-1', update: rowOf(13, [A]) });
  assert.deepEqual(REC.feedRows(), [], 'dropped: the row held');
  const release = fake.hold('changes', { guest: true, board: 'b-1', since: 10 });
  fake.reopen();
  await until(() => catchUps(fake).length === 1, 'the guest catch-up asked');
  assert.deepEqual([catchUps(fake), PUMP.settled()], [[{ guest: true, board: 'b-1', since: 10 }], false], 'reopened with no session: the guest form asked from the last position, token-free, the page not settled');
  release();
  await settle();
  assert.deepEqual([REC.feedRows().map((r) => r.position), REC.feedAt(), REC.bare(), PUMP.settled()], [[11, 12, 13], 13, false, true], 'the gap\'s rows and the row held taken, each once and in order, the board not marked');
  assert.deepEqual(fake.unanswered, []);
});

test('the board lags from the stream\'s drop: past a second it is kept from the drop while the stream stands dropped and while the gap\'s catch-up is out, and kept no more from the step the catch-up\'s rows are taken (issue #367\'s design decision: "Meanwhile the board carries the clause")', async () => {
  const fake = signedIn({ ...script, ...caughtUp('s-1', 10, [rowOf(11, ['1.0.1.0.21'])], 11) });
  const t0 = Date.now();
  fake.drop();
  const t1 = Date.now(), rev = PUMP.keptRevision();
  assert.deepEqual([PUMP.boardKept(), PUMP.keptAll().board], [null, false], 'within the second: not kept');
  await pastTheSecond();
  assert.deepEqual([keptBetween(PUMP.boardKept(), t0, t1), PUMP.keptAll().board, PUMP.keptRevision()], [{ met: null, since: true }, true, rev + 1], 'past the second: kept from the drop');
  const release = fake.hold('changes', { session: 's-1', since: 10 });
  fake.reopen();
  await until(() => catchUps(fake).length === 1, 'the catch-up asked');
  assert.notEqual(PUMP.boardKept(), null, 'reopened, its catch-up out: kept still');
  release();
  await settle();
  assert.deepEqual([REC.feedAt(), PUMP.boardKept(), PUMP.keptAll().board, PUMP.keptRevision()], [11, null, false, rev + 2], 'the catch-up\'s rows taken: kept no more');
  assert.deepEqual(fake.unanswered, []);
});

test('the lagging board records how the reads that made it whole set it, with the stamp of the drop — unchanged where its catch-up read no row, changed where it took one — and nothing where a change of the page\'s class let the lag go (issue #369)', async () => {
  const A = '1.0.1.0.21';
  const fake = signedIn({ ...script, ...caughtUp('s-1', 10), ...caughtUp('s-1', 20, [rowOf(21, [A])], 21) });
  /** the stream dropped, the page's clock held still as it drops: the stamp the board lags from */
  const dropped = () => { const at = Date.now(), clock = Date.now; Date.now = () => at; try { fake.drop(); } finally { Date.now = clock; } return at; };
  let at = dropped();
  fake.reopen();
  await settle();
  assert.deepEqual([PUMP.boardKept(), PUMP.liftOf('board', '1')], [null, { since: at, outcome: 'unchanged' }], 'its catch-up read no row: unchanged');
  REC.reachFeed(20);
  at = dropped();
  fake.reopen();
  await settle();
  assert.deepEqual([REC.feedAt(), PUMP.liftOf('board', '1')], [21, { since: at, outcome: 'changed' }], 'its catch-up took a row: changed');
  const held = fake.hold('changes', { session: 's-1', since: 21 });
  dropped();
  fake.reopen();
  await until(() => catchUps(fake).some((c) => c.since === 21), 'the catch-up asked');
  fake.fire('session-died', { session: 's-1', reason: { arm: 'closed' } });
  held();
  await settle();
  assert.deepEqual([PUMP.boardKept(), PUMP.liftOf('board', '1')], [null, null], 'the class changed while it was out: the lag let go, no setting recorded');
});

test('a document the view shows that the gap\'s rows name, still being read a second after they are taken, stands kept from the stream\'s drop — the board\'s stamp, never the catch-up\'s — until its read again sets it (issue #367\'s design decision: "If documents are still being read a second after the catch-up\'s rows, they take the clause from the board")', async () => {
  const s = { ...script, ...ONE_MEMBER, ...caughtUp('s-1', 10, [writing(11, [D]).update], 11) };
  inTurn(s, F.retrieveV(D, 1, 30), deliveredAt(BEFORE, 5), deliveredAt(AFTER, 9));
  const fake = readingD(s);
  REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  readHead(10);
  await settle();
  const t0 = Date.now();
  fake.drop();
  const t1 = Date.now();
  await new Promise((r) => setTimeout(r, 20));
  const text = fake.hold('op', { frame: F.retrieveV(D, 1, 30) });
  const caught = Date.now();
  fake.reopen();
  await until(() => REC.feedAt() === 11, 'the gap\'s rows taken');
  assert.deepEqual([REC.textBetween(D, 1, 31), PUMP.boardKept()], [BEFORE, null], 'D held as it stands, the board\'s lag ended with the catch-up');
  await pastTheSecond();
  const k = PUMP.kept(D);
  assert.deepEqual(keptBetween(k, t0, t1), { met: null, since: true }, 'kept from the drop');
  assert.ok(k && k.since < caught, 'never from the catch-up that read the row');
  text();
  await settle();
  assert.deepEqual([REC.textBetween(D, 1, 31), PUMP.kept(D)], [AFTER, null], 'set: kept no more');
  assert.deepEqual(fake.unanswered, []);
});

test('the board lags from the first bare row of a run: past a second it is kept from that row while its refresh is out, and kept no more as the refresh ends (issue #367\'s design decision: "That place is a document whose read is still out, or else the board")', async () => {
  const fake = readingD({ ...script, ...ONE_MEMBER });
  await settle();
  const count = fake.hold('op', { frame: F.docMetadata(D + '.1') });
  const t0 = Date.now();
  fake.fire('feed', naming(20, null));
  const t1 = Date.now();
  fake.fire('feed', naming(21, null));
  await pastTheSecond();
  assert.deepEqual([keptBetween(PUMP.boardKept(), t0, t1), REC.bare()], [{ met: null, since: true }, false], 'kept from the first bare row, its refresh out');
  count();
  await settle();
  assert.deepEqual([PUMP.boardKept(), REC.bare()], [null, false], 'the refresh ended: kept no more');
  assert.deepEqual(fake.unanswered, []);
});

test('where `changes` refuses the gap\'s catch-up, the board is marked and lags from the stream\'s drop, saying why, until its refresh has run (issue #367\'s design decision)', async () => {
  const fake = readingD({ ...script, ...ONE_MEMBER, [FAKE.keyOf('changes', { session: 's-1', since: 10 })]: RECLAIMED });
  REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  readHead(10);
  await settle();
  const count = fake.hold('op', { frame: F.docMetadata(D + '.1') });
  const t0 = Date.now();
  fake.drop();
  const t1 = Date.now();
  fake.reopen();
  await until(() => catchUps(fake).length === 1, 'the catch-up asked');
  await pastTheSecond();
  assert.deepEqual(keptBetween(PUMP.boardKept(), t0, t1), { met: RECLAIMED.refused, since: true }, 'kept from the drop, the refusal the catch-up met named, its refresh out');
  count();
  await settle();
  assert.deepEqual([PUMP.boardKept(), REC.bare()], [null, false], 'the refresh ended: kept no more');
  assert.deepEqual(fake.unanswered, []);
});

/** a text of `n` positions of one character, as `retrieve_v` delivers it */
const filled = (/** @type {string} */ ch, /** @type {number} */ n) => ({ result: { as_of: 1, resp: 'delivery', items: [{ content: ch.repeat(n) }] } });

test('a text past one delivery\'s items is read in parts of at most MAX_DELIVERY_ITEMS positions — a whole read, an open find\'s read of the rest, and a feed row\'s read again of the window held, the text an open find searches kept as the view keeps what it shows — and a part the board refuses for its size is asked again as its halves (FP-21; wire.md §Content & provenance reads)', async () => {
  const HUGE = '1.0.1.0.7', SIZED = '1.0.1.0.8', n = 200000, cut = F.MAX_DELIVERY_ITEMS;
  /** @type {Record<string, unknown>} */
  const s = {
    [opKeyOf(F.retrieveDocVSpanSet(HUGE))]: { result: { as_of: 1, resp: 'span_set', set: [{ start: '1.1', width: '0.' + n }] } },
    [opKeyOf(F.docMetadata(HUGE))]: { result: { as_of: 1, resp: 'doc_metadata', doc: HUGE, published: false, owner: '1.0.1', birth: null, birth_extent: null, placed: null, base_extent: null, source: null } },
    [opKeyOf(F.image(HUGE, 1, n))]: { result: { as_of: 1, resp: 'runs', runs: [{ i_start: HUGE + '.0.1.1', width: String(n) }] } },
    [opKeyOf(F.findLinksV(HUGE, 1, n))]: { result: { as_of: 1, resp: 'addrs', addrs: [] } },
    [opKeyOf(F.retrieveDocVSpanSet(SIZED))]: { result: { as_of: 1, resp: 'span_set', set: [{ start: '1.1', width: '0.1000' }] } },
    // SIZED's text whole refused for its size — its run-list walk priced past the budget — each half answering
    [opKeyOf(F.retrieveV(SIZED, 1, 1000))]: { refused: { kind: 'refused', name: 'too_many_items', code: 'too_many_items' } },
    [opKeyOf(F.retrieveV(SIZED, 1, 500))]: filled('s', 500),
    [opKeyOf(F.retrieveV(SIZED, 501, 500))]: filled('z', 500),
  };
  // HUGE's two parts: the first text read, then the text a write left
  inTurn(s, F.retrieveV(HUGE, 1, cut), filled('a', cut), filled('c', cut));
  inTurn(s, F.retrieveV(HUGE, cut + 1, n - cut), filled('b', n - cut), filled('d', n - cut));
  const fake = FAKE.create(s);
  PORT.boot(fake);
  /** the text an open find searches: HUGE, kept as the view keeps what it shows, at any scale */
  let finding = /** @type {string | null} */ (null);
  PUMP.start({ onDirty: () => {}, finding: () => finding });
  REC.setBoard({ board: 'b-1', name: '', origin: '' });
  await PUMP.loadWhole(HUGE);
  assert.equal(REC.textBetween(HUGE, 1, n + 1), 'a'.repeat(cut) + 'b'.repeat(n - cut), 'the whole read: both parts taken');
  assert.deepEqual([timesAsked(fake, F.retrieveV(HUGE, 1, n)), timesAsked(fake, F.retrieveV(HUGE, 1, cut))], [0, 1], 'never one delivery past the bound');
  assert.deepEqual(await PUMP.readRest(SIZED), { refused: null });
  assert.equal(REC.textBetween(SIZED, 1, 1001), 's'.repeat(500) + 'z'.repeat(500), 'the find\'s read of the rest: the text refused whole read as its halves');
  // a write to HUGE while a find searches it: kept as held, read again in parts and set in one step
  finding = HUGE;
  fake.fire('feed', writing(20, [HUGE]));
  for (let i = 0; i < 40 && REC.textBetween(HUGE, 1, 2) !== 'c'; i++) await flush();
  assert.equal(REC.textBetween(HUGE, 1, n + 1), 'c'.repeat(cut) + 'd'.repeat(n - cut), 'the row\'s read again: the window held, in parts, set in one step');
  assert.deepEqual(fake.unanswered, []);
});

test('the view\'s window past one delivery\'s items reads each part of it the page lacks on its own, of at most MAX_DELIVERY_ITEMS positions, and a part the board refuses for its size as its two halves (FP-21, FP-12)', async () => {
  const BIG = '1.0.1.0.9', n = 200000, cut = F.MAX_DELIVERY_ITEMS, half = Math.floor((n - cut) / 2);
  /** @type {Record<string, unknown>} */
  const s = {
    [opKeyOf(F.retrieveDocVSpanSet(BIG))]: { result: { as_of: 1, resp: 'span_set', set: [{ start: '1.1', width: '0.' + n }] } },
    [opKeyOf(F.docMetadata(BIG))]: { result: { as_of: 1, resp: 'doc_metadata', doc: BIG, published: true, owner: '1.0.1', birth: null, birth_extent: null, placed: null, base_extent: null, source: null } },
    [opKeyOf(F.findLinksV(BIG, 1, n))]: { result: { as_of: 1, resp: 'addrs', addrs: [] } },
    [opKeyOf(F.retrieveV(BIG, 1, cut))]: filled('a', cut),
    // the window's second part refused for its size, each half answering
    [opKeyOf(F.retrieveV(BIG, cut + 1, n - cut))]: { refused: { kind: 'refused', name: 'too_many_items', code: 'too_many_items' } },
    [opKeyOf(F.retrieveV(BIG, cut + 1, half))]: filled('b', half),
    [opKeyOf(F.retrieveV(BIG, cut + 1 + half, n - cut - half))]: filled('c', n - cut - half),
    [opKeyOf(F.image(BIG, 1, n))]: { result: { as_of: 1, resp: 'runs', runs: [{ i_start: BIG + '.0.1.1', width: String(n) }] } },
    [opKeyOf(F.editionClaimsAt(BIG))]: { result: { as_of: 1, resp: 'addrs', addrs: [] } },
  };
  const fake = FAKE.create(s);
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.setBoard({ board: 'b-1', name: '', origin: '' });
  REC.takeIndex(/** @type {any} */ ({ docs: [{ doc: BIG, kind: 'edition', label: 'd', standing: 'public' }], counts: [{ account: '1.0.1', documents: 1 }], state: { arm: 'complete' } }));
  REC.takeSpanSet(BIG, [{ subspace: 1, ordinal: 1, positions: n }]);
  // the camera over the estimate's last column at its reading em: the window from position 1 through the text's end
  const box = docBox(BIG), e = estimate(n, box), c = e.columns[e.columns.length - 1];
  CAM.setViewport(1440, 900); CAM.reach(e.fs); CAM.set(CAM.viewAt({ x: box.x + c.x + c.w / 2, y: box.y + c.y + c.h / 2 }, e.fs));
  for (let i = 0; i < 12; i++) { PUMP.pump(); await flush(); }
  assert.equal(REC.textBetween(BIG, 1, n + 1), 'a'.repeat(cut) + 'b'.repeat(half) + 'c'.repeat(n - cut - half), 'the window whole, in parts');
  assert.deepEqual([timesAsked(fake, F.retrieveV(BIG, 1, n)), timesAsked(fake, F.retrieveV(BIG, cut + 1, n - cut))], [0, 1], 'never one delivery past the bound; the part refused for its size asked once, then as its halves');
});

/** D's chain as the view probes it: its birth its first member, its second not registered */
const D_CHAIN = { [opKeyOf(F.docMetadata(D + '.2'))]: NOT_REGISTERED };
/** the stretches of a document's held text its held image names by nothing */
const gapsIn = (/** @type {string} */ addr) => { const d = REC.doc(addr); return REC.identityParts(d.image, d.from, d.to - d.from).filter((p) => 'gap' in p); };

test('the view reads each part of its window\'s text with the image over the same positions and takes the two in one step: while the image is out none of the part\'s text is held, and no state holds the text without its image (FP-27)', async () => {
  const fake = readingD({ ...script, ...D_CHAIN });
  let watching = true, bare = false;
  REC.watch(() => { const d = REC.doc(D); if (watching && d.from >= 0 && !REC.identityIn(d.image, d.from, d.to - d.from).length) bare = true; });
  const release = fake.hold('op', { frame: F.image(D, 1, 30) });
  try {
    await untilAsked(fake, F.retrieveV(D, 1, 30), true);
    for (let i = 0; i < 5; i++) { PUMP.pump(); await flush(); }
    assert.deepEqual([askedOf(fake, F.image(D, 1, 30)), REC.doc(D).from, PUMP.settled()], [1, -1, false], 'the part\'s image asked with its text, none of its text held while the image is out, the page not settled');
  } finally { release(); }
  await settle();
  watching = false;
  assert.deepEqual([REC.doc(D).from, REC.doc(D).to, REC.doc(D).imageFor, gapsIn(D), askedOf(fake, F.image(D, 1, 30))], [1, 31, [1, 31], [], 1], 'answered: the text and its image held together, every position named, the image asked once');
  assert.equal(bare, false, 'no state held the text without its image');
  assert.deepEqual(fake.unanswered, []);
});

test('a part of the view\'s window whose image read is refused is taken alone at once, and the image of the text held is asked again on its own and placed over it', async () => {
  const s = { ...script, ...D_CHAIN };
  const image = inTurn(s, F.image(D, 1, 30), BUSY, script[opKeyOf(F.image(D, 1, 30))]);
  const fake = readingD(s);
  for (let i = 0; i < 20 && REC.doc(D).from < 0; i++) { PUMP.pump(); await flush(); }
  assert.deepEqual([image.asks(), REC.textBetween(D, 1, 27), REC.doc(D).imageFor], [1, 'Tumbler.\n\nThe first field.', null], 'its image refused: the text taken alone, at once');
  const release = fake.hold('op', { frame: F.image(D, 1, 30) });
  PUMP.pump();
  await flush();
  assert.deepEqual([askedOf(fake, F.image(D, 1, 30)), REC.doc(D).imageFor], [2, null], 'the image of the text held asked again on its own');
  release();
  await settle();
  assert.deepEqual([image.asks(), REC.doc(D).imageFor, gapsIn(D)], [2, [1, 31], []], 'placed over the text held, every position named');
  assert.deepEqual(fake.unanswered, []);
});

test('a whole read asks its text\'s image with the text and takes the two in one step, and asks the image of a text it holds whole that no held image covers (FP-27)', async () => {
  const fake = FAKE.create(script);
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.setBoard({ board: 'b-1', name: '', origin: '' });
  const release = fake.hold('op', { frame: F.image(D, 1, 30) });
  const pending = PUMP.loadWhole(D);
  try {
    await untilAsked(fake, F.image(D, 1, 30));
    for (let i = 0; i < 5; i++) await flush();
    assert.deepEqual([askedOf(fake, F.retrieveV(D, 1, 30)), REC.doc(D).from], [1, -1], 'the text and its image asked at once, none of the text held while the image is out');
  } finally { release(); }
  const d = await pending;
  assert.deepEqual([d?.from, d?.to, d?.imageFor, gapsIn(D)], [1, 31, [1, 31], []], 'taken together: every position named');
  assert.deepEqual(fake.unanswered, []);
  // D's text held whole, as a refresh's setting again leaves a text carried with no image
  REC._reset();
  const held = FAKE.create(script);
  PORT.boot(held);
  REC.setBoard({ board: 'b-1', name: '', origin: '' });
  REC.takeSpanSet(D, [{ subspace: 1, ordinal: 1, positions: 30 }]);
  REC.takeDelivery(D, F.decodeDelivery(/** @type {any} */ (script[opKeyOf(F.retrieveV(D, 1, 30))]).result, 1), 1);
  await PUMP.loadWhole(D);
  assert.deepEqual([askedOf(held, F.retrieveV(D, 1, 30)), askedOf(held, F.image(D, 1, 30)), REC.doc(D).imageFor, gapsIn(D)], [0, 1, [1, 31], []], 'its text not read again; its image asked once and placed over it, every position named');
  assert.deepEqual(held.unanswered, []);
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
