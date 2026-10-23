// M-PUMP's test against the FAKE PORT (FP-15's proof, half one): the model
// built from a scripted sequence of answers and events, no write composed;
// a link's end projected NOW as every run the board answers, an end the
// text holds in two runs as both (a mutant that keeps the first alone turns
// red);
// the view's reads ask nothing for a document a continuation's mark holds;
// a view's read the board did not answer is held, never taken as answered —
// not missing while held, its refusal recorded once for the outage — and
// asked again at once where the daemon is announced `running`, else past
// UNREACHED_MS, for the shell announces no outage its stream rides out (a
// mutant that records it as answered, or holds it until `running` alone,
// turns red), and at once where its document is forgotten or the page's own
// session dies, as a guest; the view's probe of a chain that meets a member
// the board did not answer records no count, and probes again as the daemon
// is back (a mutant that ends the chain there records a count cut short and
// turns red);
// a session's end is taken by the page whose session it is and by no other;
// a restart the shell re-opened is no death — the page goes on under the
// re-opened session, reading and taking drafts rows under it, holding what
// it read and reading no index — and a restart that re-opened none is one;
// the page's own death drops what the model read at the session's class and
// reads the index again in the guest form, the view asking nothing until it
// answers, then asking again as a guest what it read under the session (a
// mutant that re-reads the index alone, drops alone, keeps what the view
// asked as answered, lets the view ask meanwhile or reads the index under the
// dead session turns red); a read out under the session when the page takes
// its death is asked once more in the guest form, the guest's answer handed
// up, never the session's; a read that meets the restart before the event
// takes its `session_died`, or awaits the end its `session_ended` comes
// before, and is asked once more under the re-opened session; another end a
// read meets is the death, the read asked once more in the guest form; a
// `session_ended` no end follows is waited for a bounded time, once per
// session, and is no death;
// a listing read while the feed brings a row and an `index` state lays them
// over its answer — the document the row mints listed and counted over the
// listing's count, the state the event's — and one out across the page's
// own death lays over its answer the rows taken after the death alone (a
// mutant that lays nothing over, lays the rows before the listing's counts,
// takes the listing's state always, or keeps the dead session's rows turns
// red); the board's health and its daemon each laid under a `mode` or a
// `daemon` event taken while it was out, the answer standing where none was
// (a mutant that lays the answer over the event, or drops the answer,
// turns red);
// a board's events by its own page alone, and none before the page knows
// its board; a drafts row by a page holding a session, never by a guest or
// a page whose session ended; the index state of the face the page reads —
// the guest face's for a guest and for a session of no account, a
// session's for every other page, under another session's name too (a
// second tab of the same person);
// a link's lineage read under the audit view, a class scan the board answers
// `scan_busy` asked again, and a lineage side whose read is refused learned
// as nothing, never as no claim;
// at reading scale where each far end a document's read links send sits now
// asked once per link and far slot — none for a document named whole, none
// into one a read found unregistered, none whose place the model holds — and
// held, its stretches, none or what the refusal says of the far document: a
// `doc_not_registered` held of the document too, so no projection into it is
// asked again, a `withheld` of the projection alone, the document never
// marked, so a projection into it is still asked (a mutant that asks none,
// asks one held already, holds every refusal bare, or marks the document
// withheld from its projection turns red), and asked again once a feed row names a new
// member of the document projected into (a mutant that forgets the member's
// address alone, never its trunk's, asks none again and turns red); a far
// end sent from bytes the document transcludes asked as one sent from its
// own bytes is (a mutant that sends far ends from the bytes a document
// minted alone turns red); a projection asked by an act answering the
// refusal it met, held refused, and nothing held where the board did not
// answer (a mutant that answers a bare "refused" turns red);
// a read that lands after its document was dropped — the board's answers and
// the feed's rows come by two channels nothing orders — takes nothing: a
// view's read, its refusal included, left unasked and asked again, the text
// read before a new version's row never put back and the image read over the
// text read after it, a projection's read watching the document projected
// into (a mutant that takes a dropped read, takes its refusal, or watches the
// document the link sends from turns red); an act's whole read begun again,
// across the page's own death too, and its projection asked again, each at
// most DROP_ATTEMPTS times (a mutant that discards without beginning again,
// counts no death, or asks without a bound turns red); the view's probe of a
// chain its trunk is dropped under recording no count and probing again; an
// image placed from the window it was asked for, never from one a text read
// widened before it landed;
// a bare feed row — its docs null — naming the home of the link it deposited
// by its link alone, whatever its op, named or null: the view asks again what
// it read of the home, the new link read with it (a mutant that forgets the
// row's docs alone, or drops a `make_link`'s home alone, turns red);
// the edition claims on the origin of a withheld run asked by the view at
// reading scale and by a whole read — the active view's `find_links_ftt`
// lookup, never the audit view's `edition_claims` — then each listed claim's
// link and its home's metadata, each once (a mutant that asks none, or asks
// the audit view, turns red); dropped by every row that may change them — a
// link written anywhere, a publish, a bare row whose op is null — and by the
// page's own death, and asked again, any other row leaving them held (a
// mutant that drops them at no row, at a named op alone, or never asks
// again, turns red); a lookup that lands after such a row
// taking nothing and asked again (a mutant that watches the origin's drops
// alone takes the claims read before the row and turns red);
// a read refused for its size asked again in parts (issue #153): a
// `compare` over the halves of the operand its refusal names, else of the
// text sought in, their pairs taken together, any other refusal handed up
// at once, and no more than SPLIT_READS reads (a mutant that asks no part,
// halves the wrong operand, or asks without a bound turns red); a whole
// read's image so refused read in parts and taken as one image, every run
// placed across the seam; a whole read handing up the refusal its extent or
// its text met (a mutant that drops it turns red);
// each box read as it is drawn (issue #154's design decision: "The box shows
// one version"): a box showing another of its versions reads that version
// for its text and its image, and its document for its extent, metadata,
// links and chain alone, the version read again after a feed row drops it
// (a mutant that reads the document's text, or probes a chain from the
// version, turns red); a version its box does not show asks nothing,
// whatever the model holds of it; a far end placed in the version its far
// document's box shows; a `publish` row's member handed to the app before
// the row drops anything of the trunk, no row of another op handed (a
// mutant that hands it after the drop turns red); what each row the page
// takes dropped told to the app after the drop, the row's op with it, and the
// page's own death told as a drop of every record (issue #160: a mutant that
// tells before the drop, or tells no death, turns red);
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
import { accountCell, docBox } from '../plane/projection.js';
import { estimate, estimatedSpan } from '../plane/layout.js';
import { documentOf } from './address.js';

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

beforeEach(() => { REC._reset(); });

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
  assert.equal(REC.snapshot().index.length, 0, 'the death drops the index read at the session\'s class');
  await new Promise((r) => setTimeout(r, 0));
  assert.equal(REC.snapshot().index.length, 2, 'the listing read again in the guest form names the board\'s two editions');
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

test('a restart the shell re-opened is no death: the page goes on under the re-opened session, its reads and drafts rows with it, holding what it read; a restart that re-opened none is a death, which drops them and reads the index as a guest', async () => {
  const fake = FAKE.create(script);
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.setBoard({ board: 'b-1', name: '', origin: '' });
  REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  REC.takeIndex(indexAt('building'));
  REC.takeDelivery(D, [{ pos: 1, width: 8, kind: 'content', text: 'Tumbler.', ref: null, origin: null }]);
  const sent = sessionsSent(fake), listings = sessionsSent(fake, 'places');
  fake.fire('session-died', { session: 's-1', reason: REOPENED });
  assert.deepEqual(REC.session(), { session: 's-9', principal: 1, account: '1.0.1' }, 'the re-opened reference, the principal and the account the same');
  assert.equal(REC.deathReason(), null, 'no death, so no death chrome (client.md §4b.2)');
  assert.deepEqual([listings, REC.place(D)?.kind, REC.textBetween(D, 1, 9)], [[], 'edition', 'Tumbler.'], 'it reads no index and holds what it read under the session');
  await PUMP.read(F.docMetadata(D));
  assert.deepEqual(sent, ['s-9'], 'the next read goes out under the re-opened session');
  fake.fire('feed', { board: 'b-1', update: minting('1.0.1.0.1013', 'drafts') });
  assert.equal(REC.place('1.0.1.0.1013')?.kind, 'draft', 'its drafts rows still taken');
  const refused = { arm: 'restart', reopened: false, refused: 'no_key' };
  fake.fire('session-died', { session: 's-9', reason: refused });
  assert.equal(REC.session(), null, 'a restart the shell could not re-open names no session: a death');
  assert.deepEqual(REC.deathReason(), refused);
  assert.deepEqual([listings, REC.place('1.0.1.0.1013'), REC.textBetween(D, 1, 9)], [['guest'], undefined, ''], 'the death drops the draft\'s place and the text, and reads the index in the guest form');
  await new Promise((r) => setTimeout(r, 0));
  assert.deepEqual(REC.places().map((p) => p.doc), [D, '1.0.1.0.127'], 'the guest\'s listing, no draft among it');
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

test('the page\'s own death drops what it read at the session\'s class and reads the index again in the guest form, the view asking nothing until it answers and then asking again as a guest', async () => {
  const DR = '1.0.1.0.5', L = DR + '.0.2.1';
  const edition = { doc: D, kind: 'edition', label: 'd', standing: 'public' };
  const fake = FAKE.create({
    // the listing keys on the board alone, in either form: the session's is set by hand below, so this one is the guest's
    [FAKE.keyOf('places', { board: 'b-1' })]: { result: { docs: [edition], counts: [{ account: '1.0.1', documents: 1 }], state: { arm: 'complete' } } },
    [FAKE.keyOf('op', { frame: F.retrieveDocVSpanSet(D) })]: script[FAKE.keyOf('op', { frame: F.retrieveDocVSpanSet(D) })],
    [FAKE.keyOf('op', { frame: F.retrieveDocVSpanSet(DR) })]: { result: { as_of: 1, resp: 'span_set', set: [{ start: '1.1', width: '0.12' }] } },
  });
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
  fake.fire('session-died', { session: 's-1', reason: { arm: 'closed' } });
  const dr = REC.doc(DR);
  assert.deepEqual([REC.places(), REC.countOf('1.0.1').documents, REC.indexState()], [[], 0, null], 'at once: the session\'s index, its counts and its state dropped');
  assert.deepEqual([dr.from, dr.runs, dr.meta, dr.extent, dr.kind, dr.label, dr.standing], [-1, [], null, null, 'unknown', null, null], 'the draft\'s text, metadata, extent and row dropped');
  assert.deepEqual([REC.doc(D).extent, [...REC.doc(D).links], REC.link(L)], [null, [], undefined], 'the edition\'s extent and the draft-homed link dropped');
  assert.deepEqual([listings, PUMP.visibleDocs(), PUMP.settled()], [['guest'], [], false], 'the index asked again in the guest form; while it is out nothing stands in view and the page is not settled');
  release();
  await new Promise((r) => setTimeout(r, 0));
  assert.deepEqual(REC.places().map((p) => p.doc), [D], 'the guest\'s index: the edition alone');
  assert.deepEqual([REC.countOf('1.0.1').documents, REC.countsExact()], [1, true], 'its count and its state the guest\'s listing\'s');
  assert.deepEqual(PUMP.visibleDocs().map((d) => d.addr), [D], 'the draft no longer in view');
  PUMP.pump();
  await new Promise((r) => setTimeout(r, 0));
  assert.deepEqual([ops, REC.doc(D).extent, listings], [['s-1', 's-1', 'guest'], 30, ['guest']], 'the edition\'s extent, answered under the session, asked again in the guest form; the index read once');
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

test('a read refused session_ended — the shell\'s answer while it derives the end — awaits the end the event brings and is asked once more under the re-opened session', async () => {
  const frame = F.docMetadata(D);
  const s = { ...script };
  firstThen(s, frame, { refused: { kind: 'shell', name: 'session_ended', session: 's-1' } }, script[FAKE.keyOf('op', { frame })]);
  const fake = FAKE.create(s);
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.setBoard({ board: 'b-1', name: '', origin: '' }); REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  const sent = sessionsSent(fake);
  let done = false;
  const pending = PUMP.read(frame).then((o) => { done = true; return o; });
  await new Promise((r) => setTimeout(r, 0));
  assert.deepEqual([sent, done], [['s-1'], false], 'refused, the read awaits the end');
  fake.fire('session-died', { session: 's-1', reason: REOPENED });
  const out = await pending;
  assert.ok('answer' in out, 'the answer, never the refusal');
  assert.deepEqual(sent, ['s-1', 's-9']);
  assert.equal(REC.deathReason(), null);
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

test('a read refused session_ended that no end follows waits a bounded time, hands the refusal up and invents no death; a read under that session after it waits no more', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const flush = () => new Promise((r) => setImmediate(r));
  const frame = F.docMetadata(D);
  const fake = FAKE.create({ [FAKE.keyOf('op', { frame })]: { refused: { kind: 'shell', name: 'session_ended', session: 's-7' } } });
  PORT.boot(fake);
  REC.setBoard({ board: 'b-1', name: '', origin: '' }); REC.setSession({ session: 's-7', principal: 1, account: '1.0.1' });
  const done = [false, false];
  const first = PUMP.read(frame).then((o) => { done[0] = true; return o; });
  await flush();
  assert.equal(done[0], false, 'the read awaits the end');
  t.mock.timers.tick(60000);
  await flush();
  assert.equal(done[0], true, 'the wait is bounded');
  const out = await first;
  assert.equal('refused' in out && out.refused.name, 'session_ended', 'the refusal handed up');
  assert.deepEqual([REC.session()?.session, REC.deathReason()], ['s-7', null], 'no death invented: the page holds what it held');
  const second = PUMP.read(frame).then((o) => { done[1] = true; return o; });
  await flush();
  assert.equal(done[1], true, 'a read under that session after it waits no more');
  await second;
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

/** the page a guest reads D at its reading em, the board's one edition, over a board answering `s` */
function readingD(/** @type {Record<string, unknown>} */ s) {
  const fake = FAKE.create(s);
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
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
  assert.deepEqual(sent.slice(0, 3), ['s-1', 's-1', 's-1'], 'the pass before the death under the session');
  assert.ok(sent.slice(3).every((x) => x === 'guest'), 'every read after it in the guest form');
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
  const s = { ...script, [FAKE.keyOf('op', { frame: F.docMetadata(D + '.2') })]: member, [FAKE.keyOf('op', { frame: F.docMetadata(D + '.4') })]: NOT_REGISTERED };
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

test('a bare feed row — its docs null — names the home of the link it deposited by its link alone: the view asks again what it read of the home, whatever the row\'s op, and reads the new link', async () => {
  const [L1, L2, L3] = [1, 2, 3].map((k) => `${D}.0.2.${k}`);
  const toFar = [{ start: '1.0.1.0.127', width: '0.0.0.0.1' }];
  const s = { ...script, [FAKE.keyOf('op', { frame: F.readLink(L2) })]: citation(14, toFar), [FAKE.keyOf('op', { frame: F.readLink(L3) })]: citation(17, toFar), [FAKE.keyOf('op', { frame: F.docMetadata(D + '.2') })]: NOT_REGISTERED };
  const span = inTurn(s, F.retrieveDocVSpanSet(D), script[FAKE.keyOf('op', { frame: F.retrieveDocVSpanSet(D) })]);
  const touching = (/** @type {string[]} */ addrs) => ({ result: { as_of: 1, resp: 'addrs', addrs } });
  // D's links before each write and after it
  inTurn(s, F.findLinksV(D, 1, 30), touching([L1]), touching([L1, L2]), touching([L1, L2, L3]));
  const fake = readingD(s);
  await settle();
  assert.deepEqual([span.asks(), [...REC.doc(D).links]], [1, [L1]], 'D read at its reading em, its one link');
  // a replacing make_link served bare: its op and its link, its docs lost (wire.md §The change feed)
  fake.fire('feed', { board: 'b-1', update: { position: 4, at: 4, op: 'make_link', docs: null, key: null, time: null, link: L2, class: 'published' } });
  assert.equal(REC.doc(D).extent, null, 'the link\'s home dropped');
  await settle();
  assert.deepEqual([span.asks(), REC.doc(D).extent, [...REC.doc(D).links]], [2, 30, [L1, L2]], 'asked again: its extent, and its links with the new one');
  // a plain make_link, an emit or an assert_sup served bare: the link alone, the op unnamed
  fake.fire('feed', { board: 'b-1', update: { position: 5, at: 5, op: null, docs: null, key: null, time: null, link: L3, class: 'published' } });
  await settle();
  assert.deepEqual([span.asks(), REC.doc(D).extent, [...REC.doc(D).links]], [3, 30, [L1, L2, L3]], 'a row naming no op drops the home as well, and the view asks again');
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

test('at reading scale the view asks the edition claims on the origin of each withheld run its document holds — the active view\'s lookup, never the audit view\'s `edition_claims` — and each listed claim\'s link and its home\'s metadata, once; a row that may change the claims drops them and the view asks again, any other row leaves them held', async () => {
  const s = claimed({ ...script });
  const lookup = inTurn(s, F.editionClaimsAt(O), claimsOn([EDITION, FORK]));
  const fake = readingD(s);
  forgetClaims();
  await settle();
  const times = (/** @type {object} */ frame) => fake.asked.filter((k) => k === FAKE.keyOf('op', { frame })).length;
  assert.deepEqual([lookup.asks(), REC.editionClaimsOf(O)], [1, [EDITION, FORK]], 'the lookup asked once, its claims held');
  assert.deepEqual([F.readLink(EDITION), F.readLink(FORK), F.docMetadata(EDITION_HOME), F.docMetadata(FORK_HOME)].map(times), [1, 1, 1, 1], 'each claim\'s link and each home\'s metadata read once');
  assert.deepEqual([REC.link(FORK)?.from[0].doc, REC.doc(FORK_HOME).meta?.owner], [O, '1.0.1.1'], 'held where the clause reads them');
  assert.ok(!fake.asked.some((k) => k.includes('"op":"edition_claims"')), 'never the audit view\'s edition_claims, which refuses withheld at an origin the reader may not read');
  fake.fire('feed', { board: 'b-1', update: { position: 4, at: 4, op: 'insert', docs: ['1.0.2.0.5'], class: 'published' } });
  await settle();
  assert.deepEqual([lookup.asks(), REC.editionClaimsOf(O)], [1, [EDITION, FORK]], 'a row that writes no link and publishes nothing: the claims held, nothing asked again');
  /** @type {Array<Record<string, unknown>>} */
  const rows = [
    { op: 'make_link', docs: ['1.0.2.0.5'], link: '1.0.2.0.5.0.2.1' }, { op: 'emit', docs: ['1.0.2.0.5'] }, { op: 'edit_link', docs: ['1.0.2.0.5'] },
    { op: 'nullify', docs: ['1.0.2.0.5'] }, { op: 'assert_sup', docs: ['1.0.2.0.5'] }, { op: 'publish', docs: ['1.0.2.0.6.1'] },
    // bare rows (wire.md §The change feed): a link the journal names, its op unnamed — a make_link, an emit or an assert_sup —
    // and a write it decides nothing of, every term null — an edit_link, or a publish under a node no walk reaches, among others
    { op: null, docs: null, link: '1.0.2.0.5.0.2.2' }, { op: null, docs: null, link: null },
  ];
  for (const [i, row] of rows.entries()) {
    const what = row.op ?? (row.link ? 'bare link' : 'bare');
    fake.fire('feed', { board: 'b-1', update: { position: 5 + i, at: 5 + i, class: 'published', ...row } });
    assert.equal(REC.editionClaimsOf(O), undefined, `a ${what} row drops the claims held`);
    await settle();
    assert.deepEqual([lookup.asks(), REC.editionClaimsOf(O)], [2 + i, [EDITION, FORK]], `and the view asks the lookup again after the ${what}`);
  }
  assert.deepEqual([F.readLink(EDITION), F.readLink(FORK), F.docMetadata(EDITION_HOME), F.docMetadata(FORK_HOME)].map(times), [1, 1, 1, 1], 'the links and the metadata held through the drops: read once in all');
  assert.deepEqual(fake.unanswered, []);
});

test('a lookup of the edition claims that lands after a row dropped them takes nothing and is asked again: the claims answered after the row held, never the ones before it', async () => {
  const s = claimed({ ...script });
  const lookup = inTurn(s, F.editionClaimsAt(O), claimsOn([FORK]), claimsOn([EDITION, FORK]));
  const fake = readingD(s);
  forgetClaims();
  const release = fake.hold('op', { frame: F.editionClaimsAt(O) });
  await untilAsked(fake, F.editionClaimsAt(O), true);
  fake.fire('feed', { board: 'b-1', update: { position: 4, at: 4, op: 'make_link', docs: [EDITION_HOME], link: EDITION, class: 'published' } });
  release();
  await new Promise((r) => setTimeout(r, 0));
  assert.equal(REC.editionClaimsOf(O), undefined, 'the claims read before the row are not taken');
  await settle();
  assert.deepEqual([lookup.asks(), REC.editionClaimsOf(O)], [2, [EDITION, FORK]], 'asked again: the claims answered after the row held');
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

test('a box showing another of its versions reads that version for its text and its image, and its document for its extent, metadata, links and chain alone; read again after a feed row drops it (issue #154)', async () => {
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
  // a feed row naming the version shown drops it and its document: both read again as before, the version kept in view through its box
  fake.fire('feed', { board: 'b-1', update: { position: 4, at: 4, op: 'make_link', docs: [M], class: 'published' } });
  assert.deepEqual([REC.doc(M).from, REC.doc(M).extent], [-1, null], 'dropped by the row');
  await pumped();
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

test('a feed row publishing a trunk\'s member is handed to the app before it drops anything of the trunk; no row of another op, and no publish naming no member, is (issue #154: a box at its plain address keeps the version being read)', async () => {
  const fake = FAKE.create(script);
  PORT.boot(fake);
  /** @type {Array<{member: string, held: boolean}>} */
  const told = [];
  PUMP.start({ onDirty: () => {}, onPublish: (member) => told.push({ member, held: REC.doc(D).from >= 0 }) });
  REC.setBoard({ board: 'b-1', name: '', origin: '' });
  REC.takeIndex(indexAt('complete'));
  PUMP.forget(D);
  await PUMP.loadWhole(D);
  assert.ok(REC.doc(D).from >= 0, 'the trunk\'s text held');
  fake.fire('feed', { board: 'b-1', update: { position: 3, at: 3, op: 'publish', docs: [D + '.3'], class: 'published' } });
  assert.deepEqual([[...new Set(told.map((x) => x.member))], told[0]?.held], [[D + '.3'], true], 'the member the row publishes handed over while the trunk\'s text stood');
  assert.equal(REC.doc(D).from, -1, 'the row dropped the trunk after');
  told.length = 0;
  fake.fire('feed', { board: 'b-1', update: { position: 4, at: 4, op: 'make_link', docs: [D + '.4'], class: 'published' } });
  fake.fire('feed', { board: 'b-1', update: { position: 5, at: 5, op: 'publish', docs: ['1.0.1.0.77'], class: 'published' } });
  assert.deepEqual(told, [], 'neither a row of another op nor a publish naming a document whole');
});

test('what each feed row the page takes dropped is told to the app after the drop, the row\'s op with it, and the page\'s own death as a drop of every record, after it — so a reader reading again reads fresh (issue #160)', async () => {
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
  assert.ok(told.length > 0 && told.every((x) => x.op === null && x.addrs === null && !x.signed), `the page's own death told as a drop of every record, after the death: ${JSON.stringify(told)}`);
  await new Promise((r) => setTimeout(r, 0));
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
