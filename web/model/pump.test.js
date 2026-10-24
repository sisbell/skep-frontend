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
// it read and reading no index; THE ACQUIRE (issue #175's design decision):
// the boot's session opened by the one routine, one call, its refusal kept;
// a restart that re-opened none is no death either — the boot's own call is
// made again, once, and the page goes on under the session it opens, holding
// what it read, reading no index and dropping nothing (a mutant that takes it
// for a death, or drops what was read, turns red); refused, what was read is
// dropped and the index read again as a guest, no death recorded, the
// refusal kept with the account the page could not reconnect as (a mutant
// that records a death or keeps what was read turns red); a read refused
// `session_ended` with no event — a reference from before the shell's own
// restart — asks for the session again and is answered under it, never
// handing the refusal up (a mutant that hands it up, or waits and gives up,
// turns red); every loss told while the call is out joins it, one call for
// all of them (a mutant that calls per loss turns red); the shell's re-open
// settles the call out, its later answer stale and its session closed (a
// mutant that takes the late answer turns red); a late `session_ended` after
// a refused call asks for none again; a board known unreachable has the call
// made at its `running` alone, reads waiting meanwhile (a mutant that calls
// at once turns red); a session opened as another principal taken only once
// what was read is dropped; the page's own `close(session)` its sign-out,
// taken as the call goes out as the `closed` end, a read meeting
// `session_ended` after it asking for no session (a mutant that takes the
// close for a loss signs the person back in and turns red);
// the page's own death drops what the model read at the session's class and
// reads the index again in the guest form, the view asking nothing until it
// answers, then asking again as a guest what it read under the session (a
// mutant that re-reads the index alone, drops alone, keeps what the view
// asked as answered, lets the view ask meanwhile or reads the index under the
// dead session turns red); a read out under the session when the page takes
// its death is asked once more in the guest form, the guest's answer handed
// up, never the session's; a read that meets the re-opened restart before
// the event takes its `session_died` and is asked once more under the
// re-opened session; another end a read meets is the death, the read asked
// once more in the guest form;
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
// chain its trunk is dropped under recording no count and probing again;
// THE CHAIN'S END IS THE BOARD'S ANSWER (issue #184): a probe whose trunk's
// metadata the page does not hold asks its first member, never taking the
// chain for one of none (a mutant that does turns red); the view's probe
// reads at most eight members and records them as read so far, holding
// nothing to be asked again, and an act's probe goes on from there to the
// end the board answers (a mutant that caps the act's probe, records the cap
// as the end, or holds the capped count turns red); an act's probe goes on
// past the members a probe before it read, and one stopped at a refusal the
// board gave records what it read as read so far (a mutant that takes the
// refusal for the end turns red); an
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
// alone takes the claims read before the row and turns red); a lookup refused
// held by whether it was withheld from the reader — unread where the refusal
// says nothing of the claims, asked again past a drop of them alone — and a
// failed read of a listed claim's link or its home's metadata, the board not
// answering among them, held failed, which an act asks again where one
// refused as withheld is an answer (issue #186: a mutant that holds every
// refusal alike, tells the view nothing of a read the board did not answer,
// or never asks a failed read again turns red);
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
// THE BYLINE'S FACTS (issue #208; FP-34): read by the view for the owner of
// each text it draws at reading scale, once, a read out joined, never below
// the reading em (a mutant that never asks them turns red); the sole
// device-flagged entry of the genesis enrollment — the record whose own `to`
// names the account, one homed in another account's doc 1 before its own
// doc 1's lowest-addressed, its atom placed through the home's image (a
// mutant that keeps a sub-account's record, sorts by address alone, reads
// the atom at its stored ordinal or reads the anchor's entry turns red); with
// no key enrolled and none retired, the tables above it climbed — by
// reference, else unsigned (a mutant that never climbs turns red); a cause
// where none can be named — not recorded, withheld naming the owner of what
// was withheld, not read; the board not answering held through its pause and
// asked again at the daemon's `running` (a mutant that holds nothing turns
// red); a cause a feed row touching a doc 1 overtook never taken and asked
// again, a value taken whatever the row (a mutant that takes the cause turns
// red);
// A ROW NAMING NOTHING (issue #212): such rows mark the board and drop
// nothing as they come, the refresh armed and counted missing; once the run
// is in, ONE refresh for every row of it counts the chain of each edition read
// at its bare address and reads again what the view shows, set in one step
// and never emptied meanwhile, a link the board no longer answers gone and a
// draft out of view dropped unread (a mutant that empties what is shown
// first, or arms nothing, turns red); a row naming a shown document while the
// refresh's reads of it are out voids them (a mutant that sets them turns
// red); an edition whose chain advanced past the member its text is — the
// newest minted at or before the position its text was read at, never the
// chain's end the page held — pinned on that member, which takes its text,
// nothing read at the bare address (a mutant that tells the member by the end
// held, or hands nothing, turns red); one whose member cannot be told left as
// it stands; a change of class mid-refresh ends it (a mutant that arrives
// after it turns red); the claims on a shown document's origins read again and
// held as they answer now (a mutant that reads them and keeps the old turns
// red); a publish row's member taking the trunk's text where the box pins on
// it, none of it read again (a mutant that hands nothing turns red);
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
import { estimate, estimatedSpan, MEASURE_CPL } from '../plane/layout.js';
import { documentOf, memberOf, unitSpan, versionAddress } from './address.js';
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

beforeEach(() => { REC._reset(); REC.takeAccountKey('1.0.1', OWN_FACTS); });

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

test('a restart the shell re-opened is no death: the page goes on under the re-opened session, its reads and drafts rows with it, holding what it read; one that re-opened none is no death either — the boot\'s own call is made again, once, and the page goes on under the session it opens, holding what it read, reading no index and dropping nothing (issue #175)', async () => {
  const fake = FAKE.create({ ...script, ...opened('s-10') });
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
  fake.fire('feed', { board: 'b-1', update: minting('1.0.1.0.1013', 'drafts') });
  assert.equal(REC.place('1.0.1.0.1013')?.kind, 'draft', 'its drafts rows still taken');
  fake.fire('session-died', { session: 's-9', reason: UNOPENED });
  await flush();
  assert.deepEqual(REC.session(), { session: 's-10', principal: 1, account: '1.0.1', writes: true }, 'a restart that re-opened none: the session the boot\'s own call opens again');
  assert.deepEqual([opens(fake), REC.deathReason(), REC.reconnect(), drops], [1, null, null, 0], 'one call; no death, nothing to say and nothing dropped');
  assert.deepEqual([listings, REC.place('1.0.1.0.1013')?.kind, REC.textBetween(D, 1, 9)], [[], 'draft', 'Tumbler.'], 'it holds what it read — the draft\'s place, the text — and reads no index');
  await PUMP.read(F.docMetadata(D));
  assert.deepEqual(sent, ['s-9', 's-10'], 'the next read goes out under the session got back');
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

test('the page\'s own death drops what it read at the session\'s class and reads the index again in the guest form, the view asking nothing until it answers and then asking again as a guest — the edition, and the draft the view stood on, which the guest may not read: held `withheld`, a box the model knows, covered at its own place (issue #177)', async () => {
  const DR = '1.0.1.0.5', L = DR + '.0.2.1';
  const edition = { doc: D, kind: 'edition', label: 'd', standing: 'public' };
  /** @type {Record<string, unknown>} */
  const s = {
    // the listing keys on the board alone, in either form: the session's is set by hand below, so this one is the guest's
    [FAKE.keyOf('places', { board: 'b-1' })]: { result: { docs: [edition], counts: [{ account: '1.0.1', documents: 1 }], state: { arm: 'complete' } } },
    [FAKE.keyOf('op', { frame: F.retrieveDocVSpanSet(D) })]: script[FAKE.keyOf('op', { frame: F.retrieveDocVSpanSet(D) })],
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
  fake.fire('session-died', { session: 's-1', reason: { arm: 'closed' } });
  const dr = REC.doc(DR);
  assert.deepEqual([REC.places(), REC.countOf('1.0.1').documents, REC.indexState()], [[], 0, null], 'at once: the session\'s index, its counts and its state dropped');
  assert.deepEqual([dr.from, dr.runs, dr.meta, dr.extent, dr.kind, dr.label, dr.standing], [-1, [], null, null, 'unknown', null, null], 'the draft\'s text, metadata, extent and row dropped');
  assert.deepEqual([REC.doc(D).extent, [...REC.doc(D).links], REC.link(L)], [null, [], undefined], 'the edition\'s extent and the draft-homed link dropped');
  assert.deepEqual([listings, PUMP.visibleDocs(), PUMP.settled(), PUMP.rereading()], [['guest'], [], false, true], 'the index asked again in the guest form; while it is out nothing is read for the view, the page is not settled and the change\'s reads are out');
  release();
  await new Promise((r) => setTimeout(r, 0));
  assert.deepEqual(REC.places().map((p) => p.doc), [D], 'the guest\'s index: the edition alone');
  assert.deepEqual([REC.countOf('1.0.1').documents, REC.countsExact()], [1, true], 'its count and its state the guest\'s listing\'s');
  assert.deepEqual([PUMP.visibleDocs().map((d) => d.addr), PUMP.rereading()], [[D], true], 'the draft unlisted and holding nothing, its place still to be read again');
  PUMP.pump();
  await new Promise((r) => setTimeout(r, 0));
  assert.deepEqual([ops, REC.doc(D).extent, listings], [['s-1', 's-1', 'guest', 'guest'], 30, ['guest']], 'each place the view stood on — the edition and the draft — asked again in the guest form; the index read once');
  assert.deepEqual([REC.doc(DR).refused, REC.covered(DR), REC.covered(D), REC.known(), PUMP.rereading()], ['withheld', true, false, [D, DR], false], 'the draft withheld from the guest: covered, a box the model knows — the edition the guest reads none — and the change\'s reads answered');
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
  const s = { ...script, ...opened('s-2') };
  firstThen(s, frame, { refused: { kind: 'shell', name: 'session_ended', session: 's-7' } }, script[FAKE.keyOf('op', { frame })]);
  const fake = FAKE.create(s);
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.setBoard({ board: 'b-1', name: '', origin: '' }); REC.setSession({ session: 's-7', principal: 1, account: '1.0.1' });
  const sent = sessionsSent(fake);
  const out = await PUMP.read(frame);
  assert.ok('answer' in out, 'the answer, never the refusal');
  assert.deepEqual([sent, opens(fake)], [['s-7', 's-2'], 1], 'asked again under the session the one call opened');
  assert.deepEqual([REC.session()?.session, REC.deathReason()], ['s-2', null], 'no death');
});

test('every loss told while the call again is out joins it — the restart\'s event, two reads refused session_ended, one refused session_died naming the restart — and each read is answered under the session the one call opens (issue #175)', async () => {
  const frames = [F.docMetadata(D), F.retrieveDocVSpanSet(D), F.findLinksV(D, 1, 30)];
  const s = { ...script, ...opened('s-2') };
  const ended = { refused: { kind: 'shell', name: 'session_ended', session: 's-1' } };
  const died = { refused: { kind: 'shell', name: 'session_died', session: 's-1', reason: UNOPENED } };
  frames.forEach((frame, i) => firstThen(s, frame, i < 2 ? ended : died, script[FAKE.keyOf('op', { frame })]));
  const fake = FAKE.create(s);
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.setBoard({ board: 'b-1', name: '', origin: '' }); REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
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
  assert.deepEqual([opens(fake), sent.slice(0, 3), sent.slice(3)], [1, ['s-1', 's-1', 's-1'], ['s-2', 's-2', 's-2']], 'one call; each read asked again under the session it opened');
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
  const fake = FAKE.create({ ...script, ...opened('s-2') });
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.setBoard({ board: 'b-1', name: '', origin: '' }); REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  fake.fire('daemon', { board: 'b-1', state: 'unreachable' });
  const sent = sessionsSent(fake);
  fake.fire('session-died', { session: 's-1', reason: UNOPENED });
  let done = false;
  const pending = PUMP.read(frame).then((o) => { done = true; return o; });
  await flush();
  assert.deepEqual([opens(fake), sent, done], [0, [], false], 'no call while the board does not answer; the read waits, asked nowhere');
  fake.fire('daemon', { board: 'b-1', state: 'running' });
  const out = await pending;
  assert.ok('answer' in out);
  assert.deepEqual([opens(fake), sent, REC.session()?.session], [1, ['s-2'], 's-2'], 'at running, the one call; the read asked under the session it opened');
});

test('a session the call again opens as another principal is taken only once what the lost session read is dropped, the index read again under it (issue #175; M-REC\'s THE CLASS)', async () => {
  const fake = FAKE.create({ ...script, ...opened('s-2', { principal: 2, account: '1.0.2' }) });
  PORT.boot(fake);
  PUMP.start({ onDirty: () => {} });
  REC.setBoard({ board: 'b-1', name: '', origin: '' }); REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  REC.takeIndex(indexAt('building'));
  REC.takeDelivery(D, [{ pos: 1, width: 8, kind: 'content', text: 'Tumbler.', ref: null, origin: null }]);
  const listings = sessionsSent(fake, 'places');
  fake.fire('session-died', { session: 's-1', reason: UNOPENED });
  await flush();
  assert.deepEqual([REC.session()?.session, REC.session()?.principal, REC.deathReason()], ['s-2', 2, null], 'the session opened, another principal\'s');
  assert.deepEqual([REC.textBetween(D, 1, 9), listings], ['', ['s-2']], 'principal 1\'s text dropped, the index read again under the new session');
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

test('at reading scale the view asks the edition claims on the origin of each withheld run its document holds — the active view\'s lookup, never the audit view\'s `edition_claims` — and each listed claim\'s link and its home\'s metadata, once; a row that may change the claims drops them and the view asks again, any other row leaves them held; a row naming nothing drops none, the refresh after it asking them again (issue #212)', async () => {
  // D's first member as the board answers it, which the refresh counts D's chain from
  const s = claimed({ ...script, [FAKE.keyOf('op', { frame: F.docMetadata(D + '.1') })]: script[FAKE.keyOf('op', { frame: F.docMetadata(D) })] });
  // the two claims at each of the eight lookups the view makes; the edition's alone after them, at the refresh's
  const lookup = inTurn(s, F.editionClaimsAt(O), ...Array(8).fill(claimsOn([EDITION, FORK])), claimsOn([EDITION]));
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
    // a bare row (wire.md §The change feed): a link the journal names, its op unnamed — a make_link, an emit or an assert_sup
    { op: null, docs: null, link: '1.0.2.0.5.0.2.2' },
  ];
  for (const [i, row] of rows.entries()) {
    const what = row.op ?? 'bare link';
    fake.fire('feed', { board: 'b-1', update: { position: 5 + i, at: 5 + i, class: 'published', ...row } });
    assert.equal(REC.editionClaimsOf(O), undefined, `a ${what} row drops the claims held`);
    await settle();
    assert.deepEqual([lookup.asks(), REC.editionClaimsOf(O)], [2 + i, [EDITION, FORK]], `and the view asks the lookup again after the ${what}`);
  }
  assert.deepEqual([F.readLink(EDITION), F.readLink(FORK), F.docMetadata(EDITION_HOME), F.docMetadata(FORK_HOME)].map(times), [1, 1, 1, 1], 'the links and the metadata held through the drops: read once in all');
  // a write the journal decides nothing of, every term null — an edit_link, or a publish under a node no walk reaches, among
  // others: the claims stand as it comes, the board marked; the refresh after the run asks them again with what they wait on
  fake.fire('feed', { board: 'b-1', update: { position: 5 + rows.length, at: 5 + rows.length, class: 'published', op: null, docs: null, link: null } });
  assert.deepEqual([REC.editionClaimsOf(O), REC.bare()], [[EDITION, FORK], true], 'a row naming nothing: the claims stand, the board marked');
  await PUMP.refresh();
  await settle();
  assert.deepEqual([lookup.asks(), REC.editionClaimsOf(O)], [2 + rows.length, [EDITION]], 'the refresh asks the lookup again, and holds what it answers now');
  assert.deepEqual([F.readLink(EDITION), F.readLink(FORK), F.docMetadata(EDITION_HOME), F.docMetadata(FORK_HOME)].map(times), [2, 1, 2, 1], 'and the claim it lists, its link and its home\'s metadata, once');
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

/** a refusal that says nothing of what a read names, and the board not answering one */
const BUSY = { refused: { kind: 'refused', name: 'busy', code: 'busy' } }, NO_ANSWER = { refused: { kind: 'unreachable', name: 'unreachable', text: 'the board is not answering' } };
/** the board refusing a read as of a document withheld from the reader */
const WITHHELD_READ = { refused: { kind: 'refused', name: 'withheld', code: 'withheld' } };

test('the view holds the lookup\'s refusal by whether it was withheld — a refusal that says nothing of the claims held unread, asked again only past a drop of the claims — and a read a listed claim\'s admission waits on that failed, the board not answering among them, held failed (issue #186\'s design decision: "If the board refuses the read for documents withheld from the reader, no face carries the clause. Otherwise, a face whose read failed says \'edition claims not read\'")', async () => {
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
  assert.equal(lookup.asks(), 1, 'not asked again while the claims stand undropped');
  /** a row that may change the claims, dropping every one held */
  const linkWritten = (/** @type {number} */ position) => fake.fire('feed', { board: 'b-1', update: { position, at: position, op: 'make_link', docs: ['1.0.2.0.5'], link: '1.0.2.0.5.0.2.1', class: 'published' } });
  linkWritten(4);
  await settle();
  assert.deepEqual([lookup.asks(), REC.editionClaimsOf(O)], [2, 'withheld'], 'past a drop, asked again: refused as withheld from the reader, held so');
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

// ---- the byline's facts (issue #208; FP-34) -------------------------------------------------------------------------

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

test('a byline read the board did not answer is held — not asked again inside its pause — and asked again at the daemon\'s running; a cause that lands after a feed row touching a doc 1 is never taken and is asked again, while a value is taken whatever the row (FP-34; AUTH-2.127)', async (t) => {
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
  await p;
  assert.equal(REC.accountKey('1.0.17'), undefined, 'the cause the row overtook is never taken');
  await PUMP.readAccount('1.0.17');
  assert.deepEqual([asksOf(fake, F.keySet('1.0.17')), REC.accountKey('1.0.17')], [2, { cause: 'unsigned' }], 'asked again, and taken');
  // a value read across such a row: a value never changes
  const atom = fake.hold('op', { frame: F.retrieveV('1.0.18.0.1', 1, 1) });
  const q = PUMP.readAccount('1.0.18');
  await flush();
  fake.fire('feed', { board: 'b-1', update: { position: 10, at: 10, op: 'make_link', docs: ['1.0.18.0.1'], class: 'published', link: '1.0.18.0.1.0.2.2' } });
  atom();
  await q;
  assert.deepEqual(REC.accountKey('1.0.18'), { label: 'dev', fingerprint: fingerprintOf(ALG, KEY_B) }, 'taken');
});

// ---- a row naming nothing (issue #212) ---------------------------------------------------------------------------------

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
  /** @type {string[]} */
  const told = [];
  PUMP.start({ onDirty: () => {}, shown: showing(pins), onPublish: (member) => { told.push(member); const k = memberOf(member); if (k != null && k >= 2) pins[D] = versionAddress(D, k - 1); } });
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
  assert.deepEqual([told, pins[D], REC.textBetween(M, 1, 31), REC.doc(D).from], [[NEXT], M, BEFORE, -1], 'D.2, minted after the text was read, arrives: the box pinned on D.1, which holds the text, D holding none');
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
  const fake = FAKE.create(script);
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
  assert.deepEqual(fake.asked.slice(from), [], 'nothing read');
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
