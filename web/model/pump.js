// M-PUMP — view-driven, span-shaped fetching (the structure record §3.2
// "M-PUMP"; W §8 carried and grown: the frames are the wire's, the index
// from `places` and the feed, `loadWhole` kept). Layer 1, port-bound.
// ENGINE-BOUND (the port). State: the in-flight set (model-side plumbing).
// NO WRITE PATH: `writes.js` is the editor's lane's (S-33 (b)); nothing here
// hands a write frame to `op` (S-35 (a); class 5 proves it).
// The needs, from the viewport and the LOD (FP-11: the plane's pure camera
// arithmetic beside the model): at mid scale and nearer, for the documents
// in view that stand whole — a continuation drawn as one mark asks nothing
// for its members — EACH BOX READ AS IT IS DRAWN (issue #154's design
// decision: "The box shows one version"): the version the box shows (the
// reader `shown`, N-GO's, which the app hands in) read for all of what
// follows, the box's document, where the box shows another of its versions,
// for what the box draws of the document itself alone — its extent, its
// metadata, its links and their types, and its chain — and a version the box
// does not show for nothing; the version shown kept in view through its box,
// so a feed row or a change of class that drops it has it read again — the
// extent (`retrieve_doc_v_span_set`), the metadata
// (`doc_metadata`), the links touching them (`find_links_v`, then each new
// link's type ONCE by `read_link` — E17 (a)), and, where legible, the span
// window of text (`retrieve_v`: from position 1 through the columns in view,
// every column's place reading every line before it — issue #15's fold) with
// its V→I image (`image`) — the
// transcluded runs, and the permanent addresses a link's stored span is read
// back to the text through (M-REC's `placed`) — and where each far end its
// read links send from it sits in its far document's current text now
// (`project`, A-53), into the version the far document's box shows — from
// every passage end the document holds, its own
// bytes and the ones its text transcludes alike (M-REC's `holdsEnd`) — so a
// beam, a symbol and the mirror place a moved passage where it stands and say
// so of one that has left the text before anyone follows it (foundations
// §2.3), and a far end's label names a document withheld from the reader or
// one the board will say nothing of (LK's `farWords`; issue #132): a refusal
// held by what it says of the far document (`declined`), a
// `doc_not_registered` taken as the far document's own read's answer, for
// every read of an unregistered address answers it, and a `withheld` never —
// a document known withheld is drawn as its withheld box, and a far end
// learned withheld by its projection alone is named so at its tail instead;
// the chain's members probed where a document is read; and, for each
// origin its delivered withheld runs name, the reads C-67's clause beneath
// the run is decided from (PUB-5.124, PUB-5.99, PUB-7.50) — the active view's
// lookup of the edition claims on the origin (M-FRAMES's `editionClaimsAt`),
// then each listed claim's link (`read_link`) and its home's metadata
// (`doc_metadata`), the page's own reads of both, memoized with them.
// Asked by an act rather than the view: the page's session
// (`acquireSession`: `session(board)`, at boot and for a session lost — see
// THE ACQUIRE below), the client index (`readIndex`: `places`, at boot and
// again at every change of the page's class — the view asking nothing while
// it is out), the board's health and its daemon at boot
// (`readHealth`, `readProbe`), a whole document (`loadWhole`, the claims
// on its withheld runs' origins among it, so a pane the scene makes from it
// and the walk's mirror item at a run hold the clause decided), where a
// link's end projects now (`projectEnd`), a link's supersession lineage
// (`lineage`: `in_claims` and `out_claims`, A-56, A-57), the chain's
// members (`probeChain`, the view's probe and the versions list's alike),
// and where a passage's bytes stand in a text (`compareParts`) and a text's
// image over a region (`imageParts`). A class scan read whole — `loadWhole`'s
// `find_links_v`, the lineage's two — is reissued on `scan_busy`
// (`readScan`): the daemon bounds each by the same two permits the view's
// scans take. A READ REFUSED FOR ITS SIZE (M-FRAMES's `SIZE_REFUSALS`) is
// asked again IN PARTS (issue #153's design decision: "split a size refusal
// … into smaller reads"): `compare`'s operands and an `image` region halved
// until each part answers, within SPLIT_READS reads, so a landing tells what
// its text holds of a passage, and a text of more runs than one `image`
// answers is placed whole (`loadWhole`).
// A READ THE BOARD DID NOT ANSWER (`unreachable`: the shell's dial, or the
// dev provider's fetch, failed) teaches nothing, and is never taken as an
// answer: a view's read so refused is HELD (`unreached`) — not missing, for
// nothing can arrive for it while the board is out, and its refusal recorded
// once for the outage — and asked again at once where the shell announces
// the daemon `running`, else after UNREACHED_MS. The pause stands beside the
// event, for the shell announces no outage its event stream rides out — a
// board back within its reconnect wait (`skep-client`'s `RECONNECT_WAIT`),
// a read's own dial failing while the stream stands — and no `running`
// follows an outage it never announced. A probe of the chain that meets a
// member the board did not answer records no count, so it is probed again
// as a held read is asked again, never left at a chain cut short.
// A READ A DROP OVERTOOK teaches nothing either: the board's answers come back
// by one channel and the feed's rows by another, and nothing orders the two,
// so a read can land after the row of a write it was read before. Every read
// M-REC takes for a document watches the address whose drop voids it
// (`watchDrops`, M-REC's `dropsOf`, a change of class dropping every one) —
// the document it is read for; a projection's, the document projected into,
// under which the model holds it; the edition-claim lookup's, the claims
// held, which a feed row drops together (M-REC's `claimDrops`), its key
// counting the drops so it is asked again after each — and takes nothing it
// learned across a drop: a view's read is left unasked, its slot freed, and
// asked again as the view next needs it; the view's probe of a chain records
// no count; an act's whole read (`loadWhole`) is begun again, and its
// projection (`projectEnd`) asked again, at most DROP_ATTEMPTS times.
// A READ OF THE BOARD'S STATE THE BOARD'S EVENTS OVERTOOK keeps what they
// brought (`overtaken`): the shell answers the listing between its feed
// thread's ticks, which can emit a feed row before the index the listing
// comes from holds it, and the health and the probe on the caller's thread;
// it emits each event once, as what it carries moves; and nothing orders an
// answer against the events. So each such read keeps a record of the events
// taken while it is out (`whileOut`) and lays its answer under them as it
// lands: the listing under the feed rows, by M-REC's own rule for a row, and
// under an `index` state (`takeIndex`); the health under the last `mode`; the
// probe's daemon under a `daemon` event. Every change of the page's class
// empties every record of the rows and the state taken before it, which were
// the class's it left. A row taken before a listing goes out is laid over
// nothing: the listing names no feed position to tell whether it holds the
// row (reported: skep #572).
// The reads go through `op(session, frame)` — the claimant's class — or the
// guest form where no session stands; a followed far board's reads would
// take the guest form over its origin (no such board is seeded). EVERY READ
// AT THE PAGE'S CLASS (`atClass`): a read waits for the acquire out, if one
// is, before it goes; a read the page's class — its principal, or guest —
// changed under while it was out, a death or a session not regained taken
// meanwhile, is asked again in the form the page takes now, so no answer to
// a class the page has left reaches the model; and a read that met the end of
// the session it went out under is asked again under what the end left the
// page, so no answer of a session the shell no longer holds is handed up.
// The shell's bus carries every board's events and every session's to every
// page (client.md §4b.2); the page takes its own. A board event — `feed`,
// `index`, `mode`, `daemon` — is taken where it names the page's board, and
// none before the board is known: the boot's `health`, `probe` and `places`
// answer all it would set. The feed's rows → M-REC's index and
// invalidation, and the view asks again what it read of each address M-REC
// dropped for the row (`applyFeedUpdate`) — each document the row names and
// the trunk of a member among them (a new version's `publish` names the
// member, and the trunk's text, its chain and where links project into it
// are what changed — the member, a trunk's own `D.k+1`, handed to the app's
// `onPublish` before anything is dropped, so a box read at its plain address
// keeps the version being read: N-GO's `arrived`), and the home of the link it names with the home's
// trunk, which a bare row, its `docs` reading `null`, names by its `link`
// alone — and what each row dropped told to the app's `onDrop` after the drop
// (`takeRow`), with the row's `op`, so a reading scene's pane showing a
// document the row reached is kept fresh by its kind, reading fresh (SC;
// issue #160's design decision); a `drafts` row only while the page holds a
// session — a guest's
// index lists no draft (search.md §4 (iii)), nor does the index of a page
// whose session was refused or ended. `index` → M-REC's state where
// it is the face the page reads ("a face receives the state of the pair it
// searches"): the guest face's, which names no session, for a page with no
// session or with a session of no account, for which no drafts index
// stands; a session's for every other page, never the guest face's. A
// signed-in page takes a drafts row or a face's state named under another
// session too: the shell reads a principal's drafts once, under whichever
// of its sessions it reaches first, and names the principal's face by its
// last-opened session, so a person's second tab would otherwise take
// neither (reported to skep: until every session is named, the page cannot
// tell its principal's other sessions from another principal's). `mode`
// and `daemon` → M-REC's state, the daemon's `running` making the call of an
// acquire waiting for its board (below); `session-died` → the end of the
// page's own session where it names it: a page that holds no session (a
// guest) or holds another was never signed in under the one that ended. A death drops every read the
// model held at the session's class (M-REC's `sessionDied`); the needs
// answered under it are asked again, the drop of every record is told to
// `onDrop`, and the index is read again in the guest form, as the shell
// narrows its own at the death (client.md §4e.3: "at `session-died` in every
// arm but the shell's OWN RESTART"), so the page's index, its counts and
// what it draws are a guest's (foundations §2.1: "masked at the reader's
// class"). The shell's own restart is no death (client.md §4b.2; ps3-13 (b),
// cs6-6 reading (i)): where the shell re-opened the session under a key it
// holds, the page goes on under the re-opened reference the reason names,
// with no face, holding what it read; where it re-opened none, the session is
// LOST — as is one a call finds the shell no longer holds (`session_ended`:
// a reference from before the shell's own restart, which announces none) —
// told by the port (B-PORT's `onSession`), as is a read's `session_died`,
// whose reason is taken as the event's.
// THE ACQUIRE (issue #175's design decision: "Get the session back, and never
// say 'signed out' unless the person signed out"; FP-28): the page's session
// is opened by one routine (`acquireSession`), the boot's `session(board)` —
// at boot, and again for a session lost: ONE ATTEMPT per lost session, a loss
// told while it is out joining it, made once the board answers — at once,
// unless the page knows its daemon stopped or unreachable, else at the
// board's `running` — and none after a refused one. While it is out what was
// read stands and every read waits for it (`atClass`); past RECONNECTING_MS
// the line reads that the page is reconnecting (M-REC's `setReconnecting`). It
// settles on the first of its answer, the shell's re-open of the session, or
// a death of another arm; an answer after it settled is stale and dropped, a
// session it opened closed, so none stands with no owner. Opened, the session
// is taken in the lost one's place with nothing said and what was read held —
// dropped and read again only where it acts as another principal (M-REC's
// `sessionRegained`). Refused, what was read is dropped as at a death, and the
// refusal kept as boot keeps it with the account the page could not
// reconnect as (M-REC's `sessionLost`), the page reading as a guest. The
// page's own `close(session)`, told by the port as it goes out, is no loss:
// it is the person's sign-out (client.md §4b.2: "`close(session)` stays the
// page's sign-out"), taken at once as the death the shell's close carries,
// the `closed` arm.
// Rules: FP-1, FP-2, FP-6, FP-9 (fetches, never draws), FP-11, FP-22, FP-23,
// FP-28.

import * as PORT from '../bridge/port.js';
import * as REC from './records.js';
import * as F from './frames.js';
import { cam, viewportWorld, measure } from '../plane/camera.js';
import { lodOf, residueDepth, LOD_TXT_LO } from '../plane/lod.js';
import { docBox, intersects, withinContinuation } from '../plane/projection.js';
import { estimate, estimatedSpan } from '../plane/layout.js';
import { versionAddress, homeOf, documentOf, isTrunkMember } from './address.js';

/** @typedef {import('./records.js').Doc} Doc */
/** @typedef {import('./records.js').Stretch} Stretch */
/** @typedef {import('./address.js').EndRef} EndRef */
/** @typedef {import('./frames.js').Claim} Claim */
/** @typedef {import('../bridge/shapes').Refusal} Refusal */
/** @typedef {import('../bridge/shapes').PlacesAnswer} PlacesAnswer */
/** @typedef {import('../bridge/shapes').Health} Health */
/** @typedef {import('../bridge/shapes').Probe} Probe */
/** @typedef {import('../bridge/shapes').FeedEvent} FeedEvent */
/** @typedef {import('../bridge/shapes').FeedUpdate} FeedUpdate */
/** @typedef {import('../bridge/shapes').IndexEvent} IndexEvent */
/** @typedef {import('../bridge/shapes').ModeEvent} ModeEvent */
/** @typedef {import('../bridge/shapes').DaemonEvent} DaemonEvent */
/** @typedef {import('../bridge/shapes').SessionDiedEvent} SessionDiedEvent */
/** @typedef {import('../bridge/shapes').DeathReason} DeathReason */
/** @typedef {{feed: FeedEvent, index: IndexEvent, mode: ModeEvent, daemon: DaemonEvent}} BoardEvents — the events that name their board, by name */

/**
 * @typedef {Object} Meanwhile — what the board's events brought while one read
 * of the board's state was out (`overtaken`), each kept as it was taken
 * @property {FeedUpdate[]} rows the feed rows taken, in the order taken
 * @property {boolean} state an `index` state taken
 * @property {ModeEvent | null} mode the last `mode` event taken
 * @property {boolean} daemon a `daemon` event taken
 */

/**
 * @typedef {Object} Lineage — a link's supersession lineage as read (B1-S5;
 * A-56, A-57, A-82): each side the claims the board answered, in its order,
 * or null where no `claims` answer came back — the read refused — so nothing
 * was learned of that side, which is never B1-S5's "none"
 * @property {Claim[] | null} supersededBy the claims whose `old` is the link: each one's `new` supersedes it
 * @property {Claim[] | null} supersedes the claims whose `new` is the link: each one's `old` it supersedes
 */

const MAX_INFLIGHT = 6;
/** the daemon's class-scan pool is two permits (wire.md §Link discovery reads); `find_links_v`, `in_claims` and `out_claims` meet it at this pin (a finding, reported): at most two of the view's in flight */
const MAX_SCANS = 2;
/** positions per fetched block — the span window rounds to it */
const SPAN_BLOCK = 2048;
/** the most positions a whole read fetches at once (the staging draft holds six million; the rest comes by the viewport's windows) */
export const WHOLE_CAP = 262144;
/** the em (px), by P-LAY's estimate, at which a document's text is fetched — below S1's mount em, and the estimate's size never smaller than the one T-LAYER folds the article at and mounts it at (its columns never more than the text's), so the text is there when the layer mounts */
const FETCH_EM = 5;
/** at most this many members probed (`D.2`, `D.3`, …) */
const MEMBER_PROBE_CAP = 8;
/** a retry-class refusal (`scan_busy`) is reissued after this pause — "reissued at once", paced */
const RETRY_MS = 120;
/** a view's read the board did not answer is held this long, then asked again where no `running` came first — `skep-shell`'s own `PROBE_CADENCE`, the interval at which the shell asks a board's `/health` again while it holds a burst there (unmeasured here) */
export const UNREACHED_MS = 2000;
/** a class scan read whole is asked at most this many times while the board answers `scan_busy` */
const SCAN_ATTEMPTS = 6;
/** an act's read — a whole document (`loadWhole`), where a link's end projects (`projectEnd`) — is made at most this many times while what it reads is dropped under it (unmeasured) */
export const DROP_ATTEMPTS = 4;
/** an acquire for a session lost that is not back within this long has the line read "reconnecting as ⟨account⟩ after a restart" (issue #175's design decision: "within about a second") */
export const RECONNECTING_MS = 1000;
/** an act's read the board refuses for its size (M-FRAMES's `SIZE_REFUSALS`) is asked in parts in at most this many reads in all (`compareParts`, `imageParts`); past it the size refusal is handed up (unmeasured: no document on the seeded board meets a size refusal) */
export const SPLIT_READS = 32;

/** @type {Set<string>} */
const inflight = new Set();
/** @type {Set<string>} keys already asked and answered (a refusal included), not to be asked again until invalidated */
const asked = new Set();
/** @type {Map<string, number>} keys refused retry-class, with the time they may be asked again */
const retryAt = new Map();
/** @type {Map<string, number>} keys the board did not answer, HELD, with the time they may be asked again — at once where the daemon is announced `running` */
const unreached = new Map();
let scansInFlight = 0;
/** @type {Array<{frame: string, refusal: Refusal, addr: string}>} the refusals met, for the faces and the gate */
const refusals = [];
/** @type {Array<(r: {frame: string, refusal: Refusal, addr: string}) => void>} */
const refusalWatchers = [];
/**
 * @typedef {Object} Attempt — one call of `session(board)` the page makes (`acquireSession`; see the head): at boot, or for its session lost
 * @property {string | null} lost the reference of the session it is made for, lost; null at boot
 * @property {boolean} made its call made — false while it waits for the board to answer
 * @property {Promise<void>} settled resolved as it settles
 * @property {() => void} settle settles it: its answer, the shell's re-open or a death taken, any answer after it stale
 */
/** @type {Attempt | null} the acquire out, else null */
let attempt = null;
/** the client index's reads out (`readIndex`): while one is, the view asks nothing and `pump` counts it missing */
let indexing = 0;
/** @type {Set<Meanwhile>} one record for each read of the board's state out — two listings at once where a change of class meets the boot's */
const whileOut = new Set();
let dirty = () => {};
let started = false;
/** every box showing its plain address: the reader until the app hands N-GO's in */
const plain = (/** @type {string} */ addr) => documentOf(addr) || addr;
/** @type {(addr: string) => string} the version a document's box shows (N-GO's `shownIn`, handed in at `start`) */
let shown = plain;
/** @type {(member: string) => void} told of a feed row publishing a trunk's next member, before the row drops anything (N-GO's `arrived`, handed in at `start`) */
let onPublish = () => {};
/** @type {(d: Dropped) => void} told of what each feed row the page takes, and every change of its class, dropped of what it held, after the drop (SC's `dropped`, handed in at `start`) */
let onDrop = () => {};

/**
 * @typedef {Object} Dropped — what one of the board's events dropped of what the page held, told after the drop, so a reader of it reads fresh: a feed row's addresses, or every record at a change of the page's class — its session's death among them (`classChanged`)
 * @property {FeedUpdate | null} row the feed row, its `op` among it — `null` where the journal could not name it (wire.md §The change feed); null for a change of class
 * @property {string[] | null} addrs the addresses the row dropped, each once — the documents it names, the trunk of a member among them, the home of the link it names with the home's trunk (M-REC's `applyFeedUpdate`); null for a change of class, which drops every record
 */

/**
 * Start the pump: subscribe the model to the port's events, every board
 * event through `onBoard`, and to the sessions the calls name as they cross
 * the port (B-PORT's `onSession`).
 * @param {{onDirty: () => void, shown?: (addr: string) => string, onPublish?: (member: string) => void, onDrop?: (d: Dropped) => void}} opts `shown` the version each box shows, which the view reads (see the head); `onPublish` told of each trunk member `D.k+1` a `publish` row names, before the row drops what the page held of `D`; `onDrop` told of what each row the page takes, and every change of its class, dropped, after the drop
 */
export function start(opts) {
  dirty = opts.onDirty;
  shown = opts.shown || plain;
  onPublish = opts.onPublish || (() => {});
  onDrop = opts.onDrop || (() => {});
  started = true;
  onBoard('feed', (ev) => { if (ev.update) takeRow(ev.update); });
  onBoard('index', (ev) => { if (ev.state && ofFace(ev)) { REC.setIndexState(ev.state); for (const m of whileOut) m.state = true; dirty(); } });
  onBoard('mode', (ev) => { REC.setMode(ev); for (const m of whileOut) m.mode = ev; dirty(); });
  onBoard('daemon', (ev) => {
    REC.setDaemon(ev.state); for (const m of whileOut) m.daemon = true;
    if (ev.state === 'running') { unreached.clear(); if (attempt && !attempt.made) void make(attempt); }
    dirty();
  });
  PORT.on('session-died', (d) => { const ev = /** @type {SessionDiedEvent | null} */ (d); if (ev) takeEnd(ev.session, ev.reason); dirty(); });
  PORT.onSession((n) => { if ('closed' in n) takeEnd(n.closed, CLOSED); else metEnd(n.lost, n.refusal); dirty(); });
}

/** the reason the shell's own close carries (`skep-shell`'s `sessions::closed`): the page's own `close(session)`, its sign-out, taken as it goes out */
const CLOSED = /** @type {DeathReason} */ (Object.freeze({ arm: 'closed' }));

/**
 * Subscribe to a board event, handed on where it names the page's board
 * alone; none before the board is known.
 * @template {keyof BoardEvents} K
 * @param {K} name
 * @param {(ev: BoardEvents[K]) => void} take
 */
function onBoard(name, take) {
  PORT.on(name, (d) => { const ev = /** @type {BoardEvents[K] | null} */ (d); const b = REC.board(); if (ev && b && ev.board === b.board) take(ev); });
}

/** does the page take a feed row: a published row always, a `drafts` row while it holds a session — under any session's name */
const takesRow = (/** @type {FeedUpdate} */ u) => u.class !== 'drafts' || REC.session() !== null;

/**
 * A feed row the page takes (`takesRow`; see the head): the member a
 * `publish` names handed to `onPublish` first, while the page still holds the
 * trunk's text; then the row laid into M-REC's index and invalidation, every
 * read out of the board's state given it, and the view's answers for each
 * address it dropped forgotten, so the view asks them again; then what it
 * dropped told to `onDrop`, after the drop, so a reader reading again reads
 * fresh. The gate's door hands it a row as the feed would (`model.feed`).
 * @param {FeedUpdate} u
 */
export function takeRow(u) {
  if (!takesRow(u)) return;
  if (u.op === 'publish') for (const named of Array.isArray(u.docs) ? u.docs : []) if (isTrunkMember(named)) onPublish(named);
  const dropped = REC.applyFeedUpdate(u);
  for (const m of whileOut) m.rows.push(u);
  for (const addr of dropped) forget(addr);
  onDrop({ row: u, addrs: dropped });
  dirty();
}

/**
 * Is an `index` event the state of the face the page reads? The guest
 * face's names no session: a page reads it with no session, or with a
 * session of no account; every other page reads a session's face, under
 * any session's name.
 * @param {IndexEvent} ev
 * @returns {boolean}
 */
function ofFace(ev) {
  const s = REC.session();
  return s && s.account != null ? ev.session != null : ev.session == null;
}

/**
 * A session's end — `session-died`, a read's `session_died`, which carries
 * the event's reason, or the page's own close (`CLOSED`) — taken where it
 * names the page's own session. The shell's own restart is no death
 * (client.md §4b.2: "the page re-acquires a reference with no face"; ps3-13
 * (b), cs6-6 reading (i)): where its reason names the session the shell
 * re-opened, the page goes on under that reference, the principal and the
 * account the same, with no face; where it names none, the session is lost
 * (`lose`). Every other end is M-REC's death (`sessionDied`), its class's
 * reads dropped (`classChanged`). Either settles an acquire out for the
 * session, its answer then stale.
 * @param {string} ended the session the end names
 * @param {DeathReason} reason
 */
function takeEnd(ended, reason) {
  const s = REC.session();
  if (!s || s.session !== ended) return;
  const reopened = reason.arm === 'restart' && reason.reopened === true && typeof reason.session === 'string' ? reason.session : null;
  if (reason.arm === 'restart' && reopened == null) { lose(ended); return; }
  if (attempt && attempt.lost === ended) attempt.settle();
  if (reopened != null) REC.setSession({ ...s, session: reopened });
  else { REC.sessionDied(reason); classChanged(); }
}

/**
 * A call answered as from a session the shell no longer holds (B-PORT's
 * `onSession`): `session_died` carries the end's reason, taken as the
 * event's (`takeEnd`); `session_ended` carries none — the session lost
 * (`lose`), as is a `session_died` whose reason cannot be read.
 * @param {string} ref the session the answer names
 * @param {Refusal} r
 */
function metEnd(ref, r) {
  const reason = r.name === 'session_died' ? /** @type {{reason?: {arm?: unknown} | null}} */ (r).reason : null;
  if (reason && typeof reason.arm === 'string') takeEnd(ref, /** @type {DeathReason} */ (reason));
  else lose(ref);
}

/**
 * The page's own session lost without the person's act (see the head): the
 * acquire begun for it, or joined where one is out for it already; nothing
 * where the page holds another session or none.
 * @param {string} ref
 */
function lose(ref) {
  const s = REC.session();
  if (!s || s.session !== ref || (attempt && attempt.lost === ref)) return;
  void begin(ref);
}

/**
 * THE ACQUIRE (see the head; FP-28): the page's session opened by the
 * boot's own call, `session(board)` — the one routine boot and a session
 * lost share; boot calls it, and awaits it before its other reads.
 * @returns {Promise<void>} settled as the attempt settles
 */
export function acquireSession() { return attempt ? attempt.settled : begin(null); }

/**
 * One attempt begun (see the head): its call made at once where the board
 * answers as far as the page knows, else at the board's `running`; for a
 * session lost, the line made to read that the page is reconnecting where it
 * is still out past RECONNECTING_MS.
 * @param {string | null} lost the lost session's reference; null at boot
 * @returns {Promise<void>} settled as it settles
 */
function begin(lost) {
  let resolve = () => {};
  const settled = new Promise((/** @type {(v: void) => void} */ r) => { resolve = r; });
  /** @type {Attempt} */
  const a = {
    lost, made: false, settled,
    settle: () => { if (timer) clearTimeout(timer); if (attempt === a) attempt = null; resolve(); },
  };
  const timer = lost == null ? null : setTimeout(() => { if (attempt === a) REC.setReconnecting(); }, RECONNECTING_MS);
  attempt = a;
  if (answers()) void make(a);
  return settled;
}

/** does the page's board answer, as far as the page knows: no `daemon` event, nor the boot's probe, says it stopped or unreachable? */
const answers = () => { const d = REC.daemon(); return d !== 'stopped' && d !== 'unreachable'; };

/**
 * An attempt's one call, `session(board)`, and its answer taken (see the
 * head): at boot, the session opened or the refusal met; for a session lost,
 * the session taken in its place (M-REC's `sessionRegained`) — what was read
 * dropped and read again where it acts as another principal — or the refusal
 * taken (M-REC's `sessionLost`), what was read dropped and the index read
 * again as a guest; then the attempt settled. An answer that lands after the
 * attempt settled is stale and taken nowhere, a session it opened closed.
 * @param {Attempt} a
 */
async function make(a) {
  a.made = true;
  const b = REC.board();
  const out = b ? await PORT.session({ board: b.board }) : null;
  if (attempt !== a) { if (out && 'result' in out) void PORT.close({ session: out.result.session }); return; }
  if (out) {
    if ('result' in out) {
      if (a.lost == null) REC.setSession(out.result);
      else if (REC.sessionRegained(out.result)) classChanged();
    } else {
      const r = { kind: out.refused.kind, name: out.refused.name };
      if (a.lost == null) REC.setSessionRefused(r);
      else { REC.sessionLost(r); classChanged(); }
    }
  }
  a.settle();
  dirty();
}

/**
 * What follows every record M-REC held being dropped at a change of the
 * page's class — a death, a session lost and not regained, or one regained
 * as another principal: every need answered or held asked again, every read
 * of the board's state out left holding no feed row and no `index` state
 * taken before the change — so a listing out across it, asked again at the
 * new class (`atClass`), lays none of the class it left over the new one's —
 * the index read again at the class the page reads at now (`readIndex`), and
 * the drop of every record told to `onDrop`, so what a reader holds apart
 * from the model — a reading scene's pane — is read again at that class too.
 */
function classChanged() {
  asked.clear(); retryAt.clear(); unreached.clear();
  for (const m of whileOut) { m.rows = []; m.state = false; }
  void readIndex();
  onDrop({ row: null, addrs: null });
}

/** the refusals the reads met */
export const refusalsMet = () => refusals.slice();
export function onRefusal(/** @type {(r: {frame: string, refusal: Refusal, addr: string}) => void} */ fn) { refusalWatchers.push(fn); }

/**
 * One read through the port at the page's class (`atClass`): the session
 * form where a session stands, the guest form where none does.
 * @param {object} frame
 * @returns {Promise<{answer: unknown} | {refused: Refusal}>}
 */
export function read(frame) { return atClass((s) => ask(s, frame)); }

/**
 * One call at the page's class: made under the page's session, or in the
 * guest form where none stands (`call` composes the form from the session it
 * is handed), once the acquire out, if one is, has settled (see the head).
 * It is made again, in the form the page takes then, where the page's class
 * — its principal, or guest — changed while it was out, so no answer to a
 * class the page has left is handed up: a death, or a session not regained,
 * taken meanwhile asks it again as a guest. It is made again too where it
 * met the end of the session it went out under — the port having told the
 * end to the acquire, whose attempt it then awaits — and the end left the
 * page another, the one the shell re-opened or the acquire opened in its
 * place, the class the same; so no refusal of a session the shell no longer
 * holds is handed up. Each time again follows the page's session or its
 * class changing, which only a restart, a death or an attempt does.
 * @template {object} T
 * @param {(s: {session: string} | null) => Promise<T | {refused: Refusal}>} call
 * @returns {Promise<T | {refused: Refusal}>}
 */
async function atClass(call) {
  if (attempt) await attempt.settled;
  let s = REC.session();
  let out = await call(s);
  for (;;) {
    const r = 'refused' in out ? /** @type {{refused: Refusal}} */ (out).refused : null;
    const ended = !!s && !!r && PORT.lostSession(r);
    if (attempt) await attempt.settled;
    const now = REC.session();
    if (classOf(now) === classOf(s) && !(ended && !!now && now.session !== s?.session)) return out;
    s = now;
    out = await call(s);
  }
}

/** the class a page reads at: its session's principal; a guest's none */
const classOf = (/** @type {{principal: number} | null} */ s) => (s ? s.principal : null);

/**
 * One read of the board's state, made with a record of what the board's
 * events bring while it is out (`whileOut`), handed to `take` with the answer
 * as it lands — so the answer is laid under the events that overtook it — and
 * closed with the read.
 * @template T
 * @param {() => Promise<T>} ask
 * @param {(out: T, meanwhile: Meanwhile) => void} take
 * @returns {Promise<T>}
 */
async function overtaken(ask, take) {
  /** @type {Meanwhile} */
  const m = { rows: [], state: false, mode: null, daemon: false };
  whileOut.add(m);
  try {
    const out = await ask();
    take(out, m);
    return out;
  } finally { whileOut.delete(m); }
}

/**
 * The client index read at the page's class (skep #463): `places` under the
 * page's session, or in the guest form where none stands (`atClass`), the
 * answer M-REC's index whole with the feed rows and any `index` state taken
 * while it was out laid over it (`overtaken`, `takeIndex`); a refusal leaves
 * the index as it stands — the rows taken since the board was known, or
 * since the class changed. While the read is out the view asks nothing and
 * `pump` counts it missing, so no document is asked for against an index the
 * answer is about to replace, and the gate's settle waits for it.
 * @returns {Promise<{result: PlacesAnswer} | {refused: Refusal}>}
 */
export async function readIndex() {
  const b = REC.board(), board = b ? b.board : undefined;
  indexing++;
  try {
    return await overtaken(
      () => atClass((s) => PORT.places(s ? { session: s.session, board } : { guest: true, board })),
      (out, m) => { if ('result' in out) REC.takeIndex(out.result, m); },
    );
  } finally { indexing--; dirty(); }
}

/**
 * The board's health, read at boot (`health`): the `/health` document and the
 * mode derived from it M-REC's (`setHealth`), the last `mode` event taken
 * while the read was out laid over them (`setMode`).
 * @param {string} board
 * @returns {Promise<{result: Health} | {refused: Refusal}>}
 */
export function readHealth(board) {
  return overtaken(() => PORT.health({ board }), (out, m) => {
    if (!('result' in out)) return;
    REC.setHealth(out.result.health, out.result.mode);
    if (m.mode) REC.setMode(m.mode);
  });
}

/**
 * The board's daemon, read at boot (`probe`): the probe's state M-REC's
 * (`setDaemon`) where no `daemon` event was taken while the read was out.
 * @returns {Promise<{result: Probe} | {refused: Refusal}>}
 */
export function readProbe() {
  return overtaken(() => PORT.probe({}), (out, m) => { if ('result' in out && !m.daemon) REC.setDaemon(out.result.daemon); });
}

/**
 * One `op` under a session, or in the guest form where none is given.
 * @param {{session: string} | null} s
 * @param {object} frame
 * @returns {Promise<{answer: unknown} | {refused: Refusal}>}
 */
async function ask(s, frame) {
  const b = REC.board();
  const out = await PORT.op(s ? { session: s.session, frame } : { guest: /** @type {const} */ (true), board: b ? b.board : undefined, frame });
  return 'refused' in out ? { refused: out.refused } : { answer: out.result };
}

/**
 * A class scan read whole, for an act: a `scan_busy` — the board's two
 * permits taken — is reissued after a pause, up to SCAN_ATTEMPTS asks;
 * every refusal met is recorded.
 * @param {{op: string}} frame
 * @param {string} addr the document or link the read is about
 * @returns {Promise<{answer: unknown} | {refused: Refusal}>}
 */
async function readScan(frame, addr) {
  let out = await read(frame);
  for (let asks = 1; 'refused' in out; asks++) {
    refusals.push({ frame: frame.op, refusal: out.refused, addr });
    if (out.refused.name !== 'scan_busy' || asks >= SCAN_ATTEMPTS) break;
    await new Promise((r) => setTimeout(r, RETRY_MS));
    out = await read(frame);
  }
  return out;
}

/** did the board not answer — the shell's dial, or the dev provider's fetch, failed? Nothing was learned of what was asked */
const unanswered = (/** @type {Refusal} */ r) => r.kind === 'unreachable';

/** did the board refuse a read for its size — a budget the same question asked over less can meet (M-FRAMES's `SIZE_REFUSALS`)? */
export const sized = (/** @type {Refusal} */ r) => r.kind === 'refused' && F.SIZE_REFUSALS.includes(r.name);

/** @typedef {{doc: string, pos: number, width: number}} Operand a stretch of a document's text a read is asked over: its positions [pos, pos + width) */

/** a stretch cut in two at its middle position */
const halves = (/** @type {Operand} */ o) => { const h = Math.floor(o.width / 2); return [{ ...o, width: h }, { ...o, pos: o.pos + h, width: o.width - h }]; };

/** the operand a `compare` refusal localizes (wire.md §Errors: `site.operand`), where the board's verdict names one */
function operandOf(/** @type {Refusal} */ r) {
  const body = /** @type {{site?: {operand?: unknown} | null} | null} */ (r.kind === 'refused' ? r.body : null);
  const named = body && body.site ? body.site.operand : null;
  return named === 'first' || named === 'second' ? named : null;
}

/**
 * Where a passage's bytes stand in a stretch of a document's text
 * (`compare`): its pairs, the read asked IN PARTS where the board refuses it
 * for its size (issue #153's design decision: "split a size refusal …
 * into smaller reads and report the result") — the operand its refusal
 * names (wire.md §Errors: `site.operand`), else the text sought in, halved,
 * the other where that one is a single position, each half asked on its own
 * and their pairs taken together (a stretch cut at a seam is rejoined by its
 * reader: SC's `merged`), at most SPLIT_READS reads in all. Any other
 * refusal is handed up; so is a size refusal past that bound, or of two
 * single positions. Every refusal met is recorded.
 * @param {Operand} a the passage
 * @param {Operand} b the text it is sought in
 * @returns {Promise<{pairs: import('./frames.js').ComparePair[]} | {refused: Refusal}>}
 */
export async function compareParts(a, b) {
  /** @type {import('./frames.js').ComparePair[]} */
  const pairs = [];
  /** @type {Array<[Operand, Operand]>} */
  const todo = [[a, b]];
  /** @type {Refusal | null} the last size refusal met: the one handed up past the bound */
  let last = null;
  for (let reads = 0; todo.length; reads++) {
    if (reads >= SPLIT_READS && last) return { refused: last };
    const [x, y] = /** @type {[Operand, Operand]} */ (todo.shift());
    const out = await read(F.compare([{ doc: x.doc, spans: [{ ordinal: x.pos, positions: x.width }] }], [{ doc: y.doc, spans: [{ ordinal: y.pos, positions: y.width }] }]));
    if (!('refused' in out)) { pairs.push(...F.decodeCompare(out.answer)); continue; }
    const r = out.refused;
    refusals.push({ frame: 'compare', refusal: r, addr: y.doc });
    const first = operandOf(r) === 'first' ? x.width >= 2 : y.width < 2;
    if (!sized(r) || (first ? x : y).width < 2) return { refused: r };
    last = r;
    const [lo, hi] = halves(first ? x : y);
    todo.unshift(first ? [lo, y] : [x, lo], first ? [hi, y] : [x, hi]);
  }
  return { pairs };
}

/**
 * A document's V→I image over a region (`image`), asked IN PARTS where the
 * board refuses it for its size (`image_too_large`: the region's runs past
 * M8's budget; issue #153's design decision): the region halved, each half
 * asked on its own, their runs taken in the text's order, at most
 * SPLIT_READS reads in all. Any other refusal is handed up; so is a size
 * refusal past that bound, or of a single position. Every refusal met is
 * recorded.
 * @param {string} addr
 * @param {number} pos the region's first position
 * @param {number} width its positions
 * @param {Refusal | null} [met] the size refusal the region whole already met, so its halves are asked first
 * @returns {Promise<{runs: Array<{iStart: string, width: number}>} | {refused: Refusal}>}
 */
export async function imageParts(addr, pos, width, met = null) {
  /** @type {Array<{iStart: string, width: number}>} */
  const runs = [];
  /** @type {Operand} */
  const region = { doc: addr, pos, width };
  if (met && width < 2) return { refused: met };
  /** @type {Operand[]} */
  const todo = met ? halves(region) : [region];
  let last = met;
  for (let reads = 0; todo.length; reads++) {
    if (reads >= SPLIT_READS && last) return { refused: last };
    const o = /** @type {Operand} */ (todo.shift());
    const out = await read(F.image(addr, o.pos, o.width));
    if (!('refused' in out)) { runs.push(...F.decodeRuns(out.answer)); continue; }
    refusals.push({ frame: 'image', refusal: out.refused, addr });
    if (!sized(out.refused) || o.width < 2) return { refused: out.refused };
    last = out.refused;
    todo.unshift(...halves(o));
  }
  return { runs };
}

/**
 * Watch an address for a drop from now on, as a read of it goes out: the
 * watch reads true once what the page held of it has been dropped (M-REC's
 * `dropsOf`), and what the read learned is then of what the page no longer
 * holds.
 * @param {string} addr
 * @returns {() => boolean} dropped since the watch began
 */
function watchDrops(addr) { const at = REC.dropsOf(addr); return () => REC.dropsOf(addr) !== at; }

/**
 * Watch the edition claims held for a drop from now on, as a lookup of them
 * goes out: a feed row that may have changed them drops them together, and a
 * change of class with them (M-REC's `claimDrops`), whichever origin was asked.
 * @returns {() => boolean} dropped since the watch began
 */
function watchClaims() { const at = REC.claimDrops(); return () => REC.claimDrops() !== at; }

/** is a key held — the board did not answer it, and its pause stands? */
const held = (/** @type {string} */ key) => { const at = unreached.get(key); return at != null && performance.now() < at; };

/**
 * Hold a key the board did not answer for UNREACHED_MS, in place of any
 * retry it waited on.
 * @param {string} key
 * @returns {boolean} whether it was held for the first time this outage — its refusal the one recorded
 */
function hold(key) {
  const first = !unreached.has(key);
  unreached.set(key, performance.now() + UNREACHED_MS); retryAt.delete(key);
  return first;
}

/**
 * A need: a read keyed for the in-flight set, issued within the budget;
 * answered once; a retry-class refusal (`scan_busy`) reissued after a pause;
 * a read the board did not answer held (`hold`) and asked again past its
 * pause or at the daemon's `running`, its refusal recorded once for the
 * outage; any other refusal recorded and not asked again until invalidated.
 * A read that lands after its document was dropped (`watchDrops`), or the
 * edition claims for a lookup of them (`watchClaims`), frees its slot and
 * takes nothing — no answer, no refusal recorded, no hold, no retry — its key
 * left unasked, to be asked again as the view next needs it.
 * Returns whether the need is still MISSING — pending or not yet issued; a
 * refused need is not missing, nor is a held one (nothing will arrive for
 * either).
 * @param {string} key
 * @param {object} frame
 * @param {(answer: unknown) => void} take
 * @param {string} addr the document the read is for — a projection's, the document projected into: its drop voids the read, and a refusal is recorded against it
 * @param {(r: Refusal) => void} [onRefused]
 * @param {(addr: string) => () => boolean} [watch] the drop that voids the read, watched from the moment it goes out: `addr`'s (`watchDrops`), or the edition claims' (`watchClaims`)
 * @returns {boolean} missing
 */
function need(key, frame, take, addr, onRefused, watch = watchDrops) {
  if (asked.has(key)) return false;
  if (inflight.has(key)) return true;
  if (held(key)) return false;
  const at = retryAt.get(key);
  if (at != null && performance.now() < at) return true;
  if (inflight.size >= MAX_INFLIGHT) return true;
  const isScan = /** @type {{op?: string}} */ (frame).op === 'find_links_v';
  if (isScan && scansInFlight >= MAX_SCANS) return true;
  inflight.add(key); if (isScan) scansInFlight++;
  const dropped = watch(addr);
  read(frame).then((out) => {
    inflight.delete(key); if (isScan) scansInFlight--;
    if (dropped()) return;
    if ('refused' in out) {
      const refusal = out.refused;
      const record = () => { const r = { frame: /** @type {{op?: string}} */ (frame).op || 'op', refusal, addr }; refusals.push(r); for (const w of refusalWatchers) w(r); };
      if (unanswered(refusal)) { if (hold(key)) record(); }
      else {
        unreached.delete(key); record();
        if (refusal.name === 'scan_busy' || refusal.name === 'history_busy') { retryAt.set(key, performance.now() + RETRY_MS); }
        else { asked.add(key); if (onRefused) onRefused(refusal); }
      }
    } else { asked.add(key); retryAt.delete(key); unreached.delete(key); take(out.answer); }
    dirty();
  });
  return true;
}

/** the name a refusal faces on */
const nameOf = (/** @type {Refusal} */ r) => r.name;

/**
 * The documents in view: every indexed or held document whose box meets the
 * viewport (the system account's rows left out) and stands shallower than
 * the continuation the scale draws as one mark (P-LOD's `residueDepth`) —
 * each box's document, and beside it the version its box shows where that is
 * another (see the head), whether the model holds that version's text or a
 * drop has emptied it; a version the box does not show none. The mark draws
 * its members' count and its newest's label from the index, which no read
 * brings, and the band fades its depth-k boxes in below every size a read
 * serves; a member is read whole when it is the focus (`loadWhole`).
 * @param {number} [pad]
 * @returns {Doc[]}
 */
export function visibleDocs(pad = 80) {
  const v = viewportWorld(pad);
  const { k } = residueDepth(cam.scale);
  /** @type {Doc[]} */
  const out = [];
  const seen = new Set();
  /** a box's document taken, and the version its box shows beside it */
  const take = (/** @type {Doc} */ d) => {
    out.push(d); seen.add(d.addr);
    const s = shown(d.addr);
    if (s !== d.addr && !seen.has(s)) { out.push(REC.doc(s)); seen.add(s); }
  };
  for (const p of REC.places()) {
    if (p.system || withinContinuation(p.doc, k)) continue;
    if (intersects(docBox(p.doc), v)) take(REC.doc(p.doc));
  }
  for (const d of REC.docs()) {
    if (seen.has(d.addr) || d.system || withinContinuation(d.addr, k)) continue;
    const doc = plain(d.addr);
    if (doc !== d.addr) { if (shown(doc) === d.addr && !seen.has(doc) && intersects(docBox(doc), v)) take(REC.doc(doc)); continue; }
    if ((d.from >= 0 || d.meta || d.extent != null) && intersects(docBox(d.addr), v)) take(d);
  }
  return out;
}

/**
 * The span window a document's columns in view need (issue #15): the place
 * of every column is read from every line before it, so its text from
 * position 1 through one estimated column past the last one in view (P-LAY's
 * `estimate`, every line full: never more columns than its text sets, so its
 * positions reach at least as far as the columns in view hold) — through its
 * end where the view stands over its room past the estimate's columns —
 * within WHOLE_CAP; past it, the estimated columns in view alone, which
 * T-LAYER lays out from their estimated column; rounded to SPAN_BLOCK; every
 * column at the measure in force (P-CAM's `measure`), which T-LAYER sets it
 * at.
 * @param {Doc} d
 * @returns {[number, number] | null} [first position, one past the last]
 */
export function spanWindow(d) {
  const extent = d.extent || 0; if (!extent) return null;
  const cpl = measure(), box = docBox(d.addr), f = estimate(extent, box, cpl);
  const v = viewportWorld(0);
  if (!intersects(box, v)) return null;
  let lo = Infinity, hi = -1;
  f.columns.forEach((c, i) => {
    const x = box.x + c.x, y = box.y + c.y;
    if (x + c.w >= v.x0 && x <= v.x1 && y + c.h >= v.y0 && y <= v.y1) { lo = Math.min(lo, i); hi = Math.max(hi, i); }
  });
  const end = hi < 0 ? extent + 1 : Math.min(extent + 1, estimatedSpan(hi + 1, cpl)[1]);
  const up = (/** @type {number} */ n) => Math.min(extent + 1, Math.ceil((n - 1) / SPAN_BLOCK) * SPAN_BLOCK + 1);
  if (end <= WHOLE_CAP + 1 || hi < 0) return [1, Math.max(up(Math.min(end, WHOLE_CAP + 1)), Math.min(extent + 1, 1 + SPAN_BLOCK))];
  const from = Math.max(1, Math.floor((estimatedSpan(lo, cpl)[0] - 1) / SPAN_BLOCK) * SPAN_BLOCK + 1);
  return [from, up(end)];
}

/** do a document's delivered runs hold every position of [from, to)? */
function holdsSpan(/** @type {Doc} */ d, /** @type {number} */ from, /** @type {number} */ to) {
  let at = from;
  for (const r of d.runs) { if (r.pos <= at && at < r.pos + r.width) at = r.pos + r.width; if (at >= to) return true; }
  return at >= to;
}

/**
 * The reads the view needs now, issued within the budget — none while the
 * index is read (`readIndex`), which counts as a need missing. Returns the
 * count of needs still missing — the gate's settle signal with `inflight()`.
 * @returns {number}
 */
export function pump() {
  if (!started) return 0;
  if (indexing) return 1;
  const lod = lodOf(cam.scale);
  let missing = 0;
  if (lod.name === 'far') return 0;
  const vis = visibleDocs();
  // nearest the centre first
  const cx = cam.x, cy = cam.y;
  vis.sort((a, b) => { const ba = docBox(a.addr), bb = docBox(b.addr); return Math.hypot(ba.x + ba.w / 2 - cx, ba.y + ba.h / 2 - cy) - Math.hypot(bb.x + bb.w / 2 - cx, bb.y + bb.h / 2 - cy); });
  const budgetDocs = vis.slice(0, 60);
  for (const d of budgetDocs) {
    if (d.refused) continue;
    const box = docBox(d.addr);
    const docPx = box.w * cam.scale;
    /** the version its box shows, read for its text and what it is placed through; else the box's document, read for what its box draws of it alone */
    const drawn = shown(d.addr) === d.addr;
    if (d.extent == null) {
      if (need('s:' + d.addr, F.retrieveDocVSpanSet(d.addr), (a) => REC.takeSpanSet(d.addr, F.decodeSpanSet(a)), d.addr, (r) => refuseDoc(d, r))) missing++;
      continue;
    }
    if (!d.meta && docPx > 40) {
      if (need('m:' + d.addr, F.docMetadata(d.addr), (a) => { const m = F.decodeDocMetadata(a); if (m) REC.takeMetadata(d.addr, m); }, d.addr, (r) => refuseDoc(d, r))) missing++;
    }
    if (!d.linksRead && docPx > 18 && d.extent > 0) {
      if (need('l:' + d.addr, F.findLinksV(d.addr, 1, d.extent), (a) => REC.takeLinks(d.addr, F.decodeAddrs(a)), d.addr)) missing++;
    }
    for (const la of REC.unreadLinks(d.addr).slice(0, 12)) {
      if (need('k:' + la, F.readLink(la), (a) => { const v = F.decodeLinkValue(la, a); if (v) REC.takeLink(v); }, d.addr)) missing++;
    }
    const em = estimate(d.extent, box, measure()).fs * cam.scale;
    if (drawn && em >= FETCH_EM && d.extent > 0) {
      const w = spanWindow(d);
      if (w && !holdsSpan(d, w[0], w[1])) {
        // joined to what is held where it meets it; a window past the whole read's cap read alone
        const meets = d.from >= 0 && w[0] <= d.to && d.from <= w[1];
        const from = meets ? Math.min(d.from, w[0]) : w[0];
        const to = meets ? Math.max(d.to, w[1]) : w[1];
        if (need('r:' + d.addr + ':' + from + ':' + to, F.retrieveV(d.addr, from, to - from), (a) => REC.takeDelivery(d.addr, F.decodeDelivery(a, from)), d.addr, (r) => refuseDoc(d, r))) missing++;
      }
      if (d.from >= 0 && (!d.imageFor || d.imageFor[0] > d.from || d.imageFor[1] < d.to)) {
        // placed from the window it was asked for: a text read widening the window can land first
        const from = d.from, to = d.to;
        if (need('i:' + d.addr + ':' + from + ':' + to, F.image(d.addr, from, to - from), (a) => REC.takeImage(d.addr, from, F.decodeRuns(a)), d.addr)) missing++;
      }
      for (const p of farEnds(d.addr).slice(0, 12)) {
        if (need('p:' + p.link + ':' + p.slot + ':' + p.far, F.project(p.link, p.slot, p.far), (a) => REC.takeProjection(p.link, p.slot, p.far, stretchesOf(a)), p.far, (r) => declined(p.link, p.slot, p.far, r))) missing++;
      }
      for (const origin of REC.withheldOrigins(d.addr)) missing += needClaims(origin);
    }
    // the chain, its box's document's alone: every version shares its count
    if (em >= LOD_TXT_LO && d.extent > 0 && d.members == null && d.meta && d.meta.published && plain(d.addr) === d.addr) { if (probeMembers(d)) missing++; }
  }
  return missing;
}

/**
 * The far ends a document's read links send from it, whose place in their
 * far document's current text the view asks (`project`) — in the version the
 * far document's box shows (the reader `shown`), where LK places them: for
 * each link touching the document with a passage end it holds (M-REC's
 * `holdsEnd`, the ends LK draws there: the document the span's trunk, or its
 * held text placing the span), the slot opposite — whose first span names a
 * passage of a document, what LK draws a beam to — once per link and slot;
 * none whose projection is held, or whose document or version a read found
 * unregistered — its own read, or another link's projection into it
 * (`declined`) — or withheld, which refuses the projection with it.
 * @param {string} addr
 * @returns {Array<{link: string, slot: 1 | 2, far: string}>}
 */
function farEnds(addr) {
  /** @type {Map<string, {link: string, slot: 1 | 2, far: string}>} */
  const out = new Map();
  for (const l of REC.linksTouching(addr)) {
    for (const [near, other, slot] of /** @type {Array<[EndRef[], EndRef[], 1 | 2]>} */ ([[l.from, l.to, 2], [l.to, l.from, 1]])) {
      const f = other[0];
      if (!f || f.whole || f.ordinal == null || !f.doc) continue;
      if (!near.some((e) => REC.holdsEnd(addr, e))) continue;
      const at = shown(f.doc);
      if (REC.projection(l.addr, slot, at) !== undefined || [f.doc, at].some((x) => REC.has(x) && REC.doc(x).refused)) continue;
      out.set(l.addr + ' ' + slot, { link: l.addr, slot, far: at });
    }
  }
  return [...out.values()];
}

/**
 * The view's reads of C-67's clause beneath the withheld runs of one origin
 * (PUB-5.124, PUB-5.99, PUB-7.50): the active view's lookup of the edition
 * claims on it (M-FRAMES's `editionClaimsAt`) where the model holds none, its
 * key counting the drops of the claims held (M-REC's `claimDrops`), so it is
 * asked again after each and a lookup out across one takes nothing
 * (`watchClaims`); then, for each claim listed, its link (`read_link`) where
 * the model holds none, and its home's publication state and owner
 * (`doc_metadata`) where the model holds neither nor a refusal of it — the
 * page's own reads of a link and a document, keyed as the view keys them, so
 * each is read once for every reader of it. T-ARTICLE's `editionClause`
 * decides the clause from what they hold.
 * @param {string} origin
 * @returns {number} the needs still missing
 */
function needClaims(origin) {
  const claims = REC.editionClaimsOf(origin);
  if (claims === undefined) {
    const take = (/** @type {string[] | 'refused'} */ c) => REC.takeEditionClaims(origin, c);
    return need('e:' + REC.claimDrops() + ':' + origin, F.editionClaimsAt(origin), (a) => take(F.decodeAddrs(a)), origin, () => take('refused'), watchClaims) ? 1 : 0;
  }
  let missing = 0;
  for (const c of claims === 'refused' ? [] : claims) {
    const home = homeOf(c) || c, h = REC.has(home) ? REC.doc(home) : null;
    if (!REC.link(c) && need('k:' + c, F.readLink(c), (a) => { const v = F.decodeLinkValue(c, a); if (v) REC.takeLink(v); }, home)) missing++;
    if (!(h && (h.meta || h.refused)) && need('m:' + home, F.docMetadata(home), (a) => { const m = F.decodeDocMetadata(a); if (m) REC.takeMetadata(home, m); }, home, (r) => refuseDoc(REC.doc(home), r))) missing++;
  }
  return missing;
}

/** `project`'s span set as stretches of the text's content: each V-span's first position and its positions */
const stretchesOf = (/** @type {unknown} */ answer) => F.decodeSpanSet(answer).filter((s) => s.subspace === 1).map((s) => ({ pos: s.ordinal, width: s.positions }));

/**
 * A `project` the board refused, held by what its refusal says of the far
 * document (M-REC's `Declined`): `withheld`, `unregistered`, else the
 * refusal by its name.
 * A `doc_not_registered` is the far document's own answer too — every read of
 * an unregistered address answers it — so the model keeps it of the document
 * (`refuseDoc`), and no projection into it is asked again (`farEnds`); a
 * `withheld` is held of the projection alone, for a document read and found
 * withheld is drawn as its withheld box, which would draw the far end the
 * projection says is withheld. A refusal of the shell's, or a board that did
 * not answer, says nothing of the document and holds nothing.
 * @param {string} link
 * @param {1 | 2} slot
 * @param {string} far the document projected into
 * @param {Refusal} r
 */
function declined(link, slot, far, r) {
  if (r.kind !== 'refused') return;
  REC.takeProjection(link, slot, far, r.name === 'withheld' ? 'withheld' : r.name === 'doc_not_registered' ? 'unregistered' : { refused: r.name });
  if (r.name === 'doc_not_registered') refuseDoc(REC.doc(far), r);
}

/** a document's read refused: `doc_not_registered` or `withheld` — the model keeps the fact */
function refuseDoc(/** @type {Doc} */ d, /** @type {Refusal} */ r) {
  const n = nameOf(r);
  if (n === 'doc_not_registered') REC.takeRefused(d.addr, 'unregistered');
  else if (n === 'withheld') REC.takeRefused(d.addr, 'withheld');
}

/**
 * The view's probe of a document's chain (`probeChain`), one at a time: a
 * count recorded is not probed again until invalidated; a probe that met a
 * member the board did not answer is held as a view's read is (`hold`), and
 * probed again past its pause or at the daemon's `running`; one its trunk was
 * dropped under is left unasked, as a view's read is (`need`), and probed
 * again as the view next needs it.
 * @param {Doc} d
 * @returns {boolean} missing
 */
function probeMembers(d) {
  const key = 'v:' + d.addr;
  if (asked.has(key)) return false;
  if (inflight.has(key)) return true;
  if (held(key)) return false;
  inflight.add(key);
  const dropped = watchDrops(d.addr);
  probeChain(d.addr).then((p) => {
    inflight.delete(key);
    if (dropped()) return;
    if (p && p.known) { unreached.delete(key); asked.add(key); } else hold(key);
    dirty();
  });
  return true;
}

/**
 * The chain's members: `D.1` is the birth; `D.k` answers until the first
 * refusal (`doc_not_registered` past the chain's end), at most
 * MEMBER_PROBE_CAP; the count `known` and recorded (M-REC's `takeMembers`).
 * A member the board did not answer ends the probe with the members met,
 * nothing recorded and the count not `known`: the chain's end was not met, and
 * a count cut short there would stand until invalidated. A trunk dropped while
 * the probe reads (`watchDrops`) — a new member's `publish` drops it — answers
 * the members met, nothing recorded and the count not `known`: the end met may
 * be the one before the new member. Null, nothing recorded, where `stands`
 * reads false before a member is asked — an opening that has ended asks no
 * more.
 * @param {string} trunk
 * @param {() => boolean} [stands]
 * @returns {Promise<{n: number, known: boolean} | null>}
 */
export async function probeChain(trunk, stands = () => true) {
  const dropped = watchDrops(trunk);
  const d = REC.doc(trunk);
  let n = d.meta && d.meta.birth ? 1 : 0;
  for (let k = 2; k <= MEMBER_PROBE_CAP && n >= 1; k++) {
    if (!stands()) return null;
    const out = await read(F.docMetadata(versionAddress(trunk, k)));
    if ('refused' in out) { if (unanswered(out.refused)) return { n, known: false }; break; }
    n = k;
  }
  if (dropped()) return { n, known: false };
  REC.takeMembers(trunk, n);
  return { n, known: true };
}

/**
 * Read a whole document now — the scene, the walk and a landing ask for all
 * of it: the extent, every position, the image — in parts where the board
 * refuses it whole for its size (`imageParts`) — the links and their types,
 * and the edition claims on each origin its withheld runs name (`readClaims`).
 * A pass the document was dropped under (`readWhole`) is begun again, and
 * reads again exactly what the drop took, at most DROP_ATTEMPTS passes; past
 * them, the record as it stands, holding nothing read before its last drop.
 * @param {string} addr
 * @returns {Promise<Doc | null>} the record; null where the board refused its extent
 */
export async function loadWhole(addr) { return (await wholeOf(addr)).doc; }

/**
 * A whole read (`loadWhole`) with the refusal it met, which a landing that
 * cannot read its text says it could not tell what that text holds by
 * (issue #153's design decision): the extent's, where the board refused it,
 * the record then null; the text's, where the board refused that, the record
 * standing with what it held; none where both answered.
 * @param {string} addr
 * @returns {Promise<{doc: Doc | null, refused: Refusal | null}>}
 */
export async function wholeOf(addr) {
  for (let pass = 1; ; pass++) {
    const out = await readWhole(addr, watchDrops(addr));
    if (out !== 'dropped') return out;
    if (pass >= DROP_ATTEMPTS) { dirty(); return { doc: REC.doc(addr), refused: null }; }
  }
}

/**
 * One pass of a whole read (`loadWhole`), each step asked where the record
 * lacks what it brings. Where the document is dropped while a step reads, the
 * pass ends there, taking nothing that step learned — an answer or a refusal
 * alike.
 * @param {string} addr
 * @param {() => boolean} dropped the document dropped since the pass began
 * @returns {Promise<{doc: Doc | null, refused: Refusal | null} | 'dropped'>} the record — null where the board refused its extent — and the refusal its extent or its text met; 'dropped' where the document was dropped under the pass
 */
async function readWhole(addr, dropped) {
  const d = REC.doc(addr);
  if (d.extent == null) {
    const out = await read(F.retrieveDocVSpanSet(addr));
    if (dropped()) return 'dropped';
    if ('refused' in out) { refusals.push({ frame: 'retrieve_doc_v_span_set', refusal: out.refused, addr }); refuseDoc(d, out.refused); dirty(); return { doc: null, refused: out.refused }; }
    REC.takeSpanSet(addr, F.decodeSpanSet(out.answer));
  }
  if (!d.meta) {
    const out = await read(F.docMetadata(addr));
    if (dropped()) return 'dropped';
    if (!('refused' in out)) { const m = F.decodeDocMetadata(out.answer); if (m) REC.takeMetadata(addr, m); }
  }
  const extent = d.extent || 0;
  const whole = Math.min(extent, WHOLE_CAP);
  if (whole > 0 && !(d.from === 1 && d.to >= whole + 1)) {
    const out = await read(F.retrieveV(addr, 1, whole));
    if (dropped()) return 'dropped';
    if ('refused' in out) { refusals.push({ frame: 'retrieve_v', refusal: out.refused, addr }); refuseDoc(d, out.refused); dirty(); return { doc: d, refused: out.refused }; }
    REC.takeDelivery(addr, F.decodeDelivery(out.answer, 1));
    const im = await read(F.image(addr, 1, whole));
    if (dropped()) return 'dropped';
    if (!('refused' in im)) REC.takeImage(addr, 1, F.decodeRuns(im.answer));
    else if (sized(im.refused)) {
      // a text of more runs than one `image` answers: its image read in parts, taken whole, so every run is placed
      const parts = await imageParts(addr, 1, whole, im.refused);
      if (dropped()) return 'dropped';
      if ('runs' in parts) REC.takeImage(addr, 1, parts.runs);
    }
  }
  if (!d.linksRead && extent > 0) {
    const out = await readScan(F.findLinksV(addr, 1, extent), addr);
    if (dropped()) return 'dropped';
    if (!('refused' in out)) REC.takeLinks(addr, F.decodeAddrs(out.answer));
  }
  for (const la of REC.unreadLinks(addr)) {
    const out = await read(F.readLink(la));
    if (dropped()) return 'dropped';
    if (!('refused' in out)) { const v = F.decodeLinkValue(la, out.answer); if (v) REC.takeLink(v); }
  }
  for (const origin of REC.withheldOrigins(addr)) {
    await readClaims(origin);
    if (dropped()) return 'dropped';
  }
  dirty();
  return { doc: d, refused: null };
}

/**
 * C-67's reads for one origin, for an act (`readWhole`), as the view asks
 * them (`needClaims`): the lookup of the edition claims on it where the model
 * holds none, taken where no drop of the claims held overtook it
 * (`watchClaims`); then each listed claim's link and each listed claim's
 * home's metadata the model lacks, the metadata taken where the home was not
 * dropped under it (`watchDrops`) and a refusal of it held as the home's. A
 * lookup or a link refused teaches the model nothing here: the view asks it
 * again, and records the refusal.
 * @param {string} origin
 */
async function readClaims(origin) {
  if (REC.editionClaimsOf(origin) === undefined) {
    const dropped = watchClaims();
    const out = await read(F.editionClaimsAt(origin));
    if (dropped() || 'refused' in out) return;
    REC.takeEditionClaims(origin, F.decodeAddrs(out.answer));
  }
  const claims = REC.editionClaimsOf(origin);
  for (const c of Array.isArray(claims) ? claims : []) {
    if (!REC.link(c)) {
      const out = await read(F.readLink(c));
      if (!('refused' in out)) { const v = F.decodeLinkValue(c, out.answer); if (v) REC.takeLink(v); }
    }
    const home = homeOf(c) || c, h = REC.has(home) ? REC.doc(home) : null;
    if (h && (h.meta || h.refused)) continue;
    const dropped = watchDrops(home);
    const out = await read(F.docMetadata(home));
    if (dropped()) continue;
    if ('refused' in out) refuseDoc(REC.doc(home), out.refused);
    else { const m = F.decodeDocMetadata(out.answer); if (m) REC.takeMetadata(home, m); }
  }
}

/**
 * Where a link's slot projects NOW into a document (A-53: "the spans"): every
 * V-span of the text's content the board answers, as stretches in the text's
 * order — the wire names no order for a span set — an end the document's
 * text holds in several runs, a passage a later edit cut in two among them,
 * answered as several; none where the end has left the text. Held in the
 * model (M-REC's `takeProjection`), the view's beams, symbols and mirror
 * reading it as they read the view's own `project`. Where the board declines
 * the read (`not_a_link` where no such slot), the refusal it met — this
 * read's own, whatever other read met one meanwhile — the model holding what
 * it says of the document (`declined`). A read the document was dropped under
 * (`watchDrops`) is asked again, at most DROP_ATTEMPTS times; past them, its
 * outcome answered and nothing held.
 * @param {string} linkAddr
 * @param {1 | 2} slot
 * @param {string} doc
 * @returns {Promise<{runs: Stretch[]} | {refused: Refusal}>}
 */
export async function projectEnd(linkAddr, slot, doc) {
  for (let asks = 1; ; asks++) {
    const dropped = watchDrops(doc);
    const out = await read(F.project(linkAddr, slot, doc));
    const holds = !dropped();
    if (!holds && asks < DROP_ATTEMPTS) continue;
    if ('refused' in out) {
      refusals.push({ frame: 'project', refusal: out.refused, addr: doc });
      if (holds) declined(linkAddr, slot, doc, out.refused);
      return { refused: out.refused };
    }
    const runs = stretchesOf(out.answer).sort((a, b) => a.pos - b.pos);
    if (holds) REC.takeProjection(linkAddr, slot, doc, runs);
    return { runs };
  }
}

/**
 * Where a link's slot projects into a document now, read for an act and
 * kept nowhere (`project`): a version member's, for the offer of a landing's
 * line (N-GO; issue #153), whose box shows another version, so no beam or
 * symbol reads it. Its runs in the text's order; the refusal met where the
 * board declines the read.
 * @param {string} linkAddr
 * @param {1 | 2} slot
 * @param {string} doc
 * @returns {Promise<{runs: Stretch[]} | {refused: Refusal}>}
 */
export async function projectedIn(linkAddr, slot, doc) {
  const out = await read(F.project(linkAddr, slot, doc));
  return 'refused' in out ? out : { runs: stretchesOf(out.answer).sort((a, b) => a.pos - b.pos) };
}

/**
 * A document's content extent read for an act and kept nowhere
 * (`retrieve_doc_v_span_set`): a version member's, for its row in the
 * versions list (§2.1's version row: one span read per member, A-39) and for
 * the offer of a landing's line (N-GO; issue #153) — a row asks no member's
 * text, which a read act brings once the member is moved to. The refusal met
 * where the board declines the read.
 * @param {string} addr
 * @returns {Promise<{extent: number} | {refused: Refusal}>}
 */
export async function extentOf(addr) {
  const out = await read(F.retrieveDocVSpanSet(addr));
  if ('refused' in out) return out;
  const c = F.decodeSpanSet(out.answer).find((s) => s.subspace === 1);
  return { extent: c ? c.positions : 0 };
}

/**
 * A link's supersession lineage (B1-S5; A-56, A-57): `in_claims` — what
 * supersedes it — then `out_claims` — what it supersedes — under the AUDIT
 * view, so a retracted claim arrives marked `active: false` where the
 * active view would leave it out. The two are asked one after the other,
 * holding at most one of the board's two scan permits.
 * @param {string} linkAddr
 * @returns {Promise<Lineage>}
 */
export async function lineage(linkAddr) {
  const side = async (/** @type {{op: string}} */ frame) => {
    const out = await readScan(frame, linkAddr);
    return 'refused' in out ? null : F.decodeClaims(out.answer);
  };
  const supersededBy = await side(F.inClaims(linkAddr, 'audit'));
  const supersedes = await side(F.outClaims(linkAddr, 'audit'));
  return { supersededBy, supersedes };
}

/** the number of reads in flight (the gate's settle signal) */
export const inflightCount = () => inflight.size;
/** settled: nothing missing and nothing in flight */
export const settled = () => inflight.size === 0 && pump() === 0;
/** drop the asked set for a document — every key naming it, its members' and its links' among them — and what waits to be asked again (tests, invalidation) */
export function forget(/** @type {string} */ addr) {
  for (const k of [...asked]) if (k.includes(addr)) asked.delete(k);
  for (const waiting of [retryAt, unreached]) for (const k of [...waiting.keys()]) if (k.includes(addr)) waiting.delete(k);
}
/** the needs waiting to be asked again: refused retry-class, or held while the board did not answer (the gate reads it) */
export const retriesPending = () => retryAt.size + unreached.size;
