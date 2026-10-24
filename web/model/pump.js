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
// (`doc_metadata`), the page's own reads of both, memoized with them — a
// refusal of the lookup held by whether it was withheld, and one of the
// others that says nothing of what it reads, or the board not answering,
// held failed, so the clause says the claims were not read (issue #186's
// design decision: "A blank there would read as 'no claim'"); and, for the
// owner of each document whose text it draws (M-REC's `ownerAccount`), THE
// BYLINE'S FACTS (`readAccount`; FP-34; issue #208's design decision: "The
// byline's label and fingerprint are public on the document's board. Read
// them once per account, because they never change"), which a reading
// scene's pane reads as it is set too: the account's device key — the sole
// device-flagged entry of its genesis enrollment (R22's naming input) — else
// why its byline names none, all of it read on the page's own board, the one
// the one line names, and kept for the page's life — a cause until a feed row
// naming a doc 1, or a change of class, drops it, the board not answering
// held for UNREACHED_MS as a view's read is.
// Asked by an act rather than the view: THE BOARD (`openBoard`; issue #215's
// design decision: "never draw or name a board the client has no record of";
// FP-35): `boards()`, at boot and again at the reader's "try again" where it
// was refused (`retryBoards`, one read out at a time, the app told of a board
// it opens: `onOpen`), its first row the board the page holds, an empty list
// or a refusal none and why (M-REC's `takeBoards`), and for the board held,
// in this order, the device's key store (`fingerprint`, before the session,
// so the one line names the key the session opens with — FP-34), the
// session, its health, its daemon and its index, each below, nothing past
// the list where it holds none; the page's session
// (`acquireSession`: `session(board)`, at boot and for a session lost — see
// THE ACQUIRE below), the client index (`readIndex`: `places`, at boot and
// again at every change of the page's class — the view asking nothing while
// it is out), the board's health and its daemon at boot
// (`readHealth`, `readProbe`), a whole document (`loadWhole`, the claims
// on its withheld runs' origins among it, so a pane the scene makes from it
// and the walk's mirror item at a run hold the clause decided), the reads of
// C-67's clause beneath a face stating a withheld origin, made before the
// face shows where the page holds no answer to one (`claimsToRead`,
// `readClaims`; issue #186's design decision: "Make this read together with
// the reads that draw the face"), where a
// link's end projects now (`projectEnd`), a link's supersession lineage
// (`lineage`: `in_claims` and `out_claims`, A-56, A-57), the chain's
// members to its end (`probeChain`: the versions list's, a landing's
// offer's, a pane's — the view's own probe reads at most MEMBER_PROBE_CAP),
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
// member the board did not answer records no count, so the view's is probed
// again as a held read is asked again, never left at a chain cut short.
// THE CHAIN'S END IS THE BOARD'S ANSWER (issue #184's design decision: "say
// whether the board ended the chain there"): a probe records a count as the
// whole chain only where the board answered that no member follows it; a
// count it stopped short of an end at — the view's cap, a refusal the board
// gave — is recorded as read so far, and an act's probe goes on from it.
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
// keeps the version being read: N-GO's `arrived`, the member it pins the box
// on taking the trunk's text, so the box's text stands through the row
// (`arrive`, M-REC's `takeAsMember`)), and the home of the link it names with the home's
// trunk, which a bare row, its `docs` reading `null`, names by its `link`
// alone — and what each row dropped told to the app's `onDrop` after the drop
// (`takeRow`), with the row's `op`, so a reading scene's pane showing a
// document the row reached is kept fresh by its kind, reading fresh (SC;
// issue #160's design decision). THE REFRESH (issue #212's design decision:
// "When a row names no document and no link, whatever op it carries, the page
// treats it as naming everything it holds of that board"; FP-23): such a row
// only marks the board (M-REC's `bare`), and once the run's rows are in — no
// row taken for RUN_QUIET_MS, every row taken re-arming it, and at the latest
// RUN_MAX_MS after the run's first bare row, for the shell announces no run's
// end — ONE refresh runs, however many rows were bare (`refresh`). First the
// chain of every edition the page holds the text of at its bare address is
// counted, to the end the board answers, each member's mint position read
// with it (`countChain`); one whose chain advanced past the member its text
// is — the newest minted at or before the position the text was read at
// (`memberShown`) — takes the arrival a `publish` row brings (`arrive`), its
// box pinned on that member, which keeps the text; one whose member cannot be
// told is left as it stands. Then what the view shows — nearer than far
// scale, the pins taken — is kept and everything else dropped (M-REC's
// `takeRefresh`); each shown document is read again as the view reads it
// (`readFresh`), standing as held until its reads land, then set in one step
// (M-REC's `setAgain`), T-LAYER holding the words being read still; then
// every reader is told (`onDrop`, the chains counted beside), so a reading
// scene's pane is kept fresh by its kind. A read the board did not answer
// leaves what it would have set standing and the board marked again, the
// next refresh made once UNREACHED_MS has passed; a change of the page's
// class ends the refresh, the reads at the new class making it whole. While
// a refresh is armed or out the view counts it missing, so the gate's settle
// waits for it. The page holds no draft being typed in — that waits on the
// editor's lane — so no setting waits for one. A `drafts` row is taken only
// while the page holds a session — a guest's
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
// THE PLACES THE VIEW STOOD ON (issue #177's design decision: "Re-read each
// document the view stands on"; FP-29): every change of the page's class
// takes, before anything is dropped, the documents in view — nearer than far
// scale, where the view reads — and the documents the view's state names
// beside them (`stands`, the trail's entries, the app's to hand in), and asks
// each one's extent again at the class the page reads at then — none its index
// lists, which it reads as it reads every place it lists — in view first and
// nearest the view's centre, until the board answers it (`reread`): one
// the new class may not read is held `withheld` (`refuseDoc`), M-REC's cover,
// and drawn as the withheld box a guest meets, at its own place; one it may
// read the view reads on as it reads any document it holds. The one line
// says the change once these reads and the index's are answered
// (`rereading`).
// Rules: FP-1, FP-2, FP-6, FP-9 (fetches, never draws), FP-11, FP-22, FP-23,
// FP-28, FP-29, FP-34, FP-35.

import * as PORT from '../bridge/port.js';
import * as REC from './records.js';
import * as F from './frames.js';
import { cam, viewportWorld, measure } from '../plane/camera.js';
import { lodOf, residueDepth, LOD_TXT_LO } from '../plane/lod.js';
import { docBox, intersects, withinContinuation } from '../plane/projection.js';
import { estimate, estimatedSpan } from '../plane/layout.js';
import { versionAddress, homeOf, documentOf, memberOf, isTrunkMember, kindOf, accountOf, parentAccount, cmpAddr } from './address.js';
import { keyFingerprint } from '../util.js';

/** @typedef {import('./records.js').Doc} Doc */
/** @typedef {import('./records.js').Stretch} Stretch */
/** @typedef {import('./records.js').AccountFacts} AccountFacts */
/** @typedef {import('./records.js').KeyCause} KeyCause */
/** @typedef {import('./records.js').Fresh} Fresh */
/** @typedef {import('./records.js').FreshClaims} FreshClaims */
/** @typedef {import('./records.js').Declined} Declined */
/** @typedef {import('./frames.js').LinkValue} LinkValue */
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
/** @typedef {import('../bridge/shapes').BoardRow} BoardRow */
/** @typedef {{feed: FeedEvent, index: IndexEvent, mode: ModeEvent, daemon: DaemonEvent}} BoardEvents — the events that name their board, by name */

/**
 * @typedef {Object} Opened — what opening the board read (`openBoard`)
 * @property {{result: BoardRow[]} | {refused: Refusal}} boards the list as `boards()` answered it
 * @property {{result: PlacesAnswer} | {refused: Refusal} | null} places the board's index as `places` answered it; null where no board is held
 */

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

/**
 * @typedef {{n: number, ended: true, met: null} | {n: number, ended: false, met: Refusal | null}} Chain — what a probe of
 * a version chain read (`probeChain`): its members `D.1 … D.n`, each answered; `ended` where the board answered that no
 * member follows `D.n` — `doc_not_registered` at `D.n+1`, or a trunk born with none — else `met`, the refusal the probe
 * stopped at (`unreachable` where the board did not answer), null where it stopped at its cap or at a trunk dropped
 * under every pass
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
/** the view's probe of a chain reads at most this many members (`D.1`, `D.2`, …); an act's probe reads to the chain's end */
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
/** a run of feed rows is taken to be in once no row has come for this long: the shell emits a tick's rows back to back and announces no run's end (`skep-shell`'s feed thread; unmeasured) */
export const RUN_QUIET_MS = 250;
/** a refresh runs at the latest this long after the first bare row of a run, however the rows keep coming (unmeasured) */
export const RUN_MAX_MS = 2000;

/** @type {Set<string>} */
const inflight = new Set();
/** @type {Map<string, Promise<void>>} the byline reads out, by account (`readAccount`): every reader of one joins it */
const accountsOut = new Map();
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
/** @type {() => string[]} the places the view's state names beside the view — the trail's entries — read again at a change of the page's class (handed in at `start`) */
let stands = () => [];
/** @type {() => void} told once a board the list read again found is open (`retryBoards`): the app's launch there (handed in at `start`) */
let onOpen = () => {};
/** @type {{session: boolean}} how the page opens its board (`openBoard`): whether it asks a session — the gate's guest asks none — as the boot opened it, which the list read again keeps */
let opening = { session: true };
/** @type {Promise<boolean> | null} the list read again, out (`retryBoards`): a second press joins it */
let boardsOut = null;
/** @type {Set<string>} the places the view stood on as the page's class last changed, each asked again at the new class until answered (see the head; `reread`) */
let standing = new Set();
/** @type {ReturnType<typeof setTimeout> | null} the refresh armed for the board a bare row marked (`arm`), else null */
let armed = null;
/** when the run the armed refresh waits on began, by the platform's clock: its first bare row */
let runFrom = 0;
/** a refresh is out (`refresh`) */
let refreshing = false;
/** the changes of the page's class taken (`classChanged`): a refresh begun under another ends */
let classes = 0;

/**
 * @typedef {Object} Dropped — what one of the board's events dropped of what the page held, told after the drop, so a reader of it reads fresh: a feed row's addresses, a refresh's, or every record at a change of the page's class — its session's death among them (`classChanged`)
 * @property {FeedUpdate | null} row the feed row, its `op` among it — `null` where the journal could not name it (wire.md §The change feed); null for a refresh and a change of class
 * @property {string[] | null} addrs the addresses the row dropped, each once — the documents it names, the trunk of a member among them, the home of the link it names with the home's trunk (M-REC's `applyFeedUpdate`) — or those a refresh dropped or set again; null for a change of class, which drops every record
 * @property {Map<string, Chain>} [chains] a refresh's alone (`refresh`): the chain of each edition it counted, by its trunk — what a reading scene's pane at a bare address is pinned by
 */

/**
 * Start the pump: subscribe the model to the port's events, every board
 * event through `onBoard`, and to the sessions the calls name as they cross
 * the port (B-PORT's `onSession`).
 * @param {{onDirty: () => void, shown?: (addr: string) => string, onPublish?: (member: string) => void, onDrop?: (d: Dropped) => void, stands?: () => string[], onOpen?: () => void}} opts `shown` the version each box shows, which the view reads (see the head); `onPublish` told of each trunk member `D.k+1` a `publish` row names, before the row drops what the page held of `D`; `onDrop` told of what each row the page takes, and every change of its class, dropped, after the drop; `stands` the places the view's state names beside the view — the trail's entries — which a change of the page's class reads again with the documents in view; `onOpen` told once a board the list read again found is open (`retryBoards`)
 */
export function start(opts) {
  dirty = opts.onDirty;
  shown = opts.shown || plain;
  onPublish = opts.onPublish || (() => {});
  onDrop = opts.onDrop || (() => {});
  stands = opts.stands || (() => []);
  onOpen = opts.onOpen || (() => {});
  standing = new Set();
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
 * `publish` names arriving first (`arrive`), while the page still holds the
 * trunk's text; then the row laid into M-REC's index and invalidation, every
 * read out of the board's state given it, and the view's answers for each
 * address it dropped forgotten, so the view asks them again; then what it
 * dropped told to `onDrop`, after the drop, so a reader reading again reads
 * fresh; and, while a row naming nothing has the board marked, the refresh
 * armed again (`arm`), the run not yet in. The gate's door hands it a row as
 * the feed would (`model.feed`).
 * @param {FeedUpdate} u
 */
export function takeRow(u) {
  if (!takesRow(u)) return;
  if (u.op === 'publish') for (const named of Array.isArray(u.docs) ? u.docs : []) if (isTrunkMember(named)) arrive(named);
  const dropped = REC.applyFeedUpdate(u);
  for (const m of whileOut) m.rows.push(u);
  for (const addr of dropped) forget(addr);
  onDrop({ row: u, addrs: dropped });
  if (REC.bare()) arm(RUN_QUIET_MS);
  dirty();
}

/**
 * A newer member's arrival at its trunk (see the head; FP-22, FP-23): told
 * to the app (`onPublish`, N-GO's `arrived`), which pins the trunk's box on
 * the member its text is where the box shows its plain address and the page
 * holds that text; where it did, that member takes the trunk's text (M-REC's
 * `takeAsMember`), so the box keeps it standing and no read of it is made.
 * @param {string} member the trunk's newer member, `D.k+1`
 */
function arrive(member) {
  onPublish(member);
  const trunk = documentOf(member), k = memberOf(member);
  if (!trunk || k == null || k < 2) return;
  const read = versionAddress(trunk, k - 1);
  if (shown(trunk) === read) REC.takeAsMember(trunk, read);
}

/**
 * The refresh armed for the board a bare row marked (see the head): made
 * once no feed row has come for `quiet`, at the latest RUN_MAX_MS after the
 * run's first bare row; each row taken while the board stands marked arms it
 * again. A refresh out arms the next as it ends.
 * @param {number} quiet
 */
function arm(quiet) {
  if (refreshing) return;
  const now = performance.now();
  if (armed == null) runFrom = now; else clearTimeout(armed);
  armed = setTimeout(() => { armed = null; void refresh(); }, Math.max(0, Math.min(quiet, runFrom + RUN_MAX_MS - now)));
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
  else { const stood = stoodOn(); REC.sessionDied(reason); classChanged(stood); }
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
      else { const stood = stoodOn(); if (REC.sessionRegained(out.result)) classChanged(stood); }
    } else {
      const r = { kind: out.refused.kind, name: out.refused.name };
      if (a.lost == null) REC.setSessionRefused(r);
      else { const stood = stoodOn(); REC.sessionLost(r); classChanged(stood); }
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
 * the index read again at the class the page reads at now (`readIndex`), the
 * places the view stood on asked again at that class (`reread`), and the drop
 * of every record told to `onDrop`, so what a reader holds apart from the
 * model — a reading scene's pane — is read again at that class too; a refresh
 * armed or out ended, the reads at the new class making it whole.
 * @param {string[]} stood the places the view stood on as the change was taken, before anything was dropped (`stoodOn`)
 */
function classChanged(stood) {
  classes++;
  if (armed != null) { clearTimeout(armed); armed = null; }
  asked.clear(); retryAt.clear(); unreached.clear();
  for (const m of whileOut) { m.rows = []; m.state = false; }
  standing = new Set(stood);
  void readIndex();
  onDrop({ row: null, addrs: null });
}

/**
 * The places the view stands on (see the head): the documents in view —
 * nearer than far scale, where the view reads — and the documents the view's
 * state names beside them (`stands`), each once. Taken as a change of the
 * page's class is taken, before anything is dropped.
 * @returns {string[]}
 */
function stoodOn() {
  const inView = started && lodOf(cam.scale).name !== 'far' ? visibleDocs().map((d) => d.addr) : [];
  return [...new Set([...inView, ...stands().filter((a) => kindOf(a) === 'document')])];
}

/**
 * The places the view stood on as the page's class last changed, asked again
 * at the class the page reads at now (see the head): each one's extent
 * (`retrieve_doc_v_span_set`), in view first and nearest the view's centre,
 * a refusal held of the document as any view's read's is (`refuseDoc`). A
 * place answered for leaves the set: its extent read, a refusal held, a read
 * answered and not asked again, or a listing by the index the page reads at
 * now, which that class reads as it reads every place it lists; one the board
 * did not answer stands held until its pause ends.
 * @returns {number} the needs still missing
 */
function reread() {
  if (!standing.size) return 0;
  const v = viewportWorld(80);
  const order = [...standing].map((addr) => {
    const b = docBox(addr);
    return { addr, out: intersects(b, v) ? 0 : 1, d: Math.hypot(b.x + b.w / 2 - cam.x, b.y + b.h / 2 - cam.y) };
  }).sort((a, b) => a.out - b.out || a.d - b.d);
  let missing = 0;
  for (const { addr } of order) {
    if (!pending(addr)) { standing.delete(addr); continue; }
    const d = REC.doc(addr);
    if (need('s:' + addr, F.retrieveDocVSpanSet(addr), (a) => REC.takeSpanSet(addr, F.decodeSpanSet(a)), addr, (r) => refuseDoc(d, r))) missing++;
  }
  return missing;
}

/** is a place the view stood on still to be answered for at the page's class (`reread`): no extent read, no refusal held, no read answered, and no listing by the index the page reads at now */
function pending(/** @type {string} */ addr) {
  const d = REC.has(addr) ? REC.doc(addr) : null;
  return !REC.place(addr) && !asked.has('s:' + addr) && (!d || (d.extent == null && !d.refused));
}

/**
 * Are the reads a change of the page's class asked still out (see the head):
 * the index read again, or a place the view stood on not yet answered for
 * (`reread`)? The one line says the change once they are answered.
 * @returns {boolean}
 */
export const rereading = () => indexing > 0 || [...standing].some(pending);

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
 * THE BOARD OPENED (see the head; issue #215's design decision; FP-35):
 * `boards()` read and its answer M-REC's (`takeBoards`) — its first row the
 * board the page holds; an empty list or a refusal none, and why — and, for
 * the board held, in this order: the device's key store (`fingerprint`),
 * before the session, so the key the session is opened with is named with it
 * (FP-34); the session, where one is asked (`acquireSession`); the board's
 * health and its daemon (`readHealth`, `readProbe`); its index
 * (`readIndex`). Nothing past the list where it holds none.
 * @param {{session: boolean}} opts `session` the page's session is asked — the gate's guest asks none; kept for the list read again (`retryBoards`)
 * @returns {Promise<Opened>}
 */
export async function openBoard(opts) {
  opening = opts;
  const boards = await PORT.boards({});
  REC.takeBoards(boards);
  const b = REC.board();
  if (!b) return { boards, places: null };
  const fp = await PORT.fingerprint({});
  REC.takeKeyStore('result' in fp ? fp.result : null, b.origin);
  if (opts.session) await acquireSession();
  await readHealth(b.board);
  await readProbe();
  return { boards, places: await readIndex() };
}

/**
 * The list read again at the reader's "try again", where it was refused (see
 * the head): opened as the boot opened it (`openBoard`), one read out at a
 * time, a press made while one is out joining it; a board it finds held, the
 * app told (`onOpen`), which launches there.
 * @returns {Promise<boolean>} a board is held
 */
export function retryBoards() {
  if (REC.board()) return Promise.resolve(true);
  if (!boardsOut) {
    boardsOut = openBoard(opening).then(() => {
      boardsOut = null;
      const held = !!REC.board();
      if (held) onOpen();
      dirty();
      return held;
    });
  }
  return boardsOut;
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
 * pause or at the daemon's `running`, its refusal recorded and told to
 * `onRefused` once for the outage; any other refusal recorded, told to
 * `onRefused`, and not asked again until invalidated.
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
 * @param {(r: Refusal) => void} [onRefused] told of each refusal the need keeps — one the board gave, or the board not answering (`unreachable`), whose read is asked again past its pause — never of a retry-class one
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
      if (unanswered(refusal)) { if (hold(key)) { record(); if (onRefused) onRefused(refusal); } }
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
 * index is read (`readIndex`), which counts as a need missing; the places the
 * view stood on as the page's class last changed first (`reread`), at any
 * scale; a refresh armed or out (`refresh`) counted missing. Returns the count
 * of needs still missing — the gate's settle signal with `inflight()`.
 * @returns {number}
 */
export function pump() {
  if (!started) return 0;
  if (indexing) return 1;
  const lod = lodOf(cam.scale);
  let missing = reread() + (armed != null || refreshing ? 1 : 0);
  if (lod.name === 'far') return missing;
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
      if (need('m:' + d.addr, F.docMetadata(d.addr), (a) => { const m = F.decodeDocMetadata(a); if (m) REC.takeMetadata(d.addr, m); }, d.addr, (r) => metaRefused(d, r))) missing++;
    }
    if (!d.linksRead && docPx > 18 && d.extent > 0) {
      if (need('l:' + d.addr, F.findLinksV(d.addr, 1, d.extent), (a) => REC.takeLinks(d.addr, F.decodeAddrs(a)), d.addr)) missing++;
    }
    for (const la of REC.unreadLinks(d.addr).slice(0, 12)) {
      if (need('k:' + la, F.readLink(la), (a) => { const v = F.decodeLinkValue(la, a); if (v) REC.takeLink(v); }, d.addr, (r) => linkRefused(la, r))) missing++;
    }
    const em = estimate(d.extent, box, measure()).fs * cam.scale;
    // the byline of a text the view draws: its owner's facts
    if (drawn && em >= FETCH_EM) missing += needAccount(REC.ownerAccount(d));
    if (drawn && em >= FETCH_EM && d.extent > 0) {
      const w = spanWindow(d);
      if (w && !holdsSpan(d, w[0], w[1])) {
        // joined to what is held where it meets it; a window past the whole read's cap read alone
        const meets = d.from >= 0 && w[0] <= d.to && d.from <= w[1];
        const from = meets ? Math.min(d.from, w[0]) : w[0];
        const to = meets ? Math.max(d.to, w[1]) : w[1];
        if (need('r:' + d.addr + ':' + from + ':' + to, F.retrieveV(d.addr, from, to - from), (a) => REC.takeDelivery(d.addr, F.decodeDelivery(a, from), F.asOf(a)), d.addr, (r) => refuseDoc(d, r))) missing++;
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
 * claims on it (M-FRAMES's `editionClaimsAt`) where the model holds no
 * answer — none, or a failed one — its key counting the drops of the claims
 * held (M-REC's `claimDrops`), so it is asked again after each and a lookup
 * out across one takes nothing (`watchClaims`), a refusal held by whether it
 * was withheld (`lookupRefused`); then, for each claim listed, the reads its
 * admission waits on (`claimNeeds`) — its home's publication state and owner
 * (`doc_metadata`), a refusal held of the home (`metaRefused`), and its link
 * (`read_link`), a refusal held as failed (`linkRefused`) — the page's own
 * reads of a document and a link, keyed as the view keys them, so each is
 * read once for every reader of it. T-ARTICLE's `editionClause` decides the
 * clause from what they hold.
 * @param {string} origin
 * @returns {number} the needs still missing
 */
function needClaims(origin) {
  const listed = REC.editionClaimsOf(origin);
  if (listed === undefined || listed === 'unread') {
    return need('e:' + REC.claimDrops() + ':' + origin, F.editionClaimsAt(origin), (a) => REC.takeEditionClaims(origin, F.decodeAddrs(a)), origin, (r) => REC.takeEditionClaims(origin, lookupRefused(r)), watchClaims) ? 1 : 0;
  }
  let missing = 0;
  for (const c of Array.isArray(listed) ? listed : []) {
    const n = claimNeeds(c), home = n.home;
    if (n.meta && need('m:' + home, F.docMetadata(home), (a) => { const m = F.decodeDocMetadata(a); if (m) REC.takeMetadata(home, m); }, home, (r) => metaRefused(REC.doc(home), r))) missing++;
    if (n.link && need('k:' + c, F.readLink(c), (a) => { const v = F.decodeLinkValue(c, a); if (v) REC.takeLink(v); }, home, (r) => linkRefused(c, r))) missing++;
  }
  return missing;
}

/**
 * The reads an edition claim's admission waits on (PUB-5.99), as the page
 * holds them: its home's metadata, where neither it nor a refusal of the
 * home is held; and its link, where none is held — neither where the home is
 * refused, or read unpublished, which admits the claim nowhere whatever its
 * link says. A read held failed (M-REC's `readFailed`) waits still: an act
 * asks it again (`readClaims`), and the view as it asks any refused read.
 * @param {string} claim
 * @returns {{home: string, meta: boolean, link: boolean}}
 */
function claimNeeds(claim) {
  const home = homeOf(claim) || claim, h = REC.has(home) ? REC.doc(home) : null;
  const nowhere = !!h && (!!h.refused || (!!h.meta && !h.meta.published));
  return { home, meta: !nowhere && !(h && h.meta), link: !nowhere && !REC.link(claim) };
}

/**
 * Does C-67's clause beneath a withheld origin wait on a read the page holds
 * no answer to (`readClaims`'s reads): the lookup, where it has not answered
 * or failed, or a read a listed claim's admission waits on (`claimNeeds`)? A
 * face stating the origin makes them before it shows, so its clause is in its
 * first frame (O-FACES; issue #186's design decision: "Make this read
 * together with the reads that draw the face").
 * @param {string} origin
 * @returns {boolean}
 */
export function claimsToRead(origin) {
  const listed = REC.editionClaimsOf(origin);
  if (listed === undefined || listed === 'unread') return true;
  return Array.isArray(listed) && listed.some((c) => { const n = claimNeeds(c); return n.meta || n.link; });
}

/** the edition-claim lookup refused, as the model holds it (M-REC's `Lookup`): 'withheld' where the board refused it as a read withheld from the reader, else 'unread' — the board not answering among it */
const lookupRefused = (/** @type {Refusal} */ r) => (nameOf(r) === 'withheld' ? 'withheld' : 'unread');

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
  REC.takeProjection(link, slot, far, declinedAs(r));
  if (r.name === 'doc_not_registered') refuseDoc(REC.doc(far), r);
}

/** what a `project` the board refused says of the document projected into, as the model holds it (M-REC's `Declined`): `withheld`, `unregistered`, else the refusal by its name */
const declinedAs = (/** @type {Refusal} */ r) => /** @type {Declined} */ (r.name === 'withheld' ? 'withheld' : r.name === 'doc_not_registered' ? 'unregistered' : { refused: r.name });

/** a document's read refused: `doc_not_registered` or `withheld` — the model keeps the fact */
function refuseDoc(/** @type {Doc} */ d, /** @type {Refusal} */ r) {
  const n = nameOf(r);
  if (n === 'doc_not_registered') REC.takeRefused(d.addr, 'unregistered');
  else if (n === 'withheld') REC.takeRefused(d.addr, 'withheld');
}

/**
 * A read of a document's metadata refused: the fact kept where the refusal
 * says it (`refuseDoc`); where it says nothing of the document — any refusal
 * but `withheld` and `doc_not_registered`, or the board not answering — the
 * read held failed (M-REC's `takeFailedRead`), so the clause of an edition
 * claim homed there says its claims were not read (issue #186's design
 * decision: "A blank there would read as 'no claim'").
 * @param {Doc} d
 * @param {Refusal} r
 */
function metaRefused(d, r) {
  refuseDoc(d, r);
  const n = nameOf(r);
  if (n !== 'withheld' && n !== 'doc_not_registered') REC.takeFailedRead(d.addr);
}

/**
 * A read of a link refused: where the refusal says nothing of the link's home
 * — any but `withheld`, which the home's own refusal answers — the read held
 * failed (M-REC's `takeFailedRead`), so the clause of the edition claim it
 * is says its claims were not read (issue #186's design decision).
 * @param {string} link
 * @param {Refusal} r
 */
function linkRefused(link, r) { if (nameOf(r) !== 'withheld') REC.takeFailedRead(link); }

/**
 * The view's probe of a document's chain (`probePass`, at most
 * MEMBER_PROBE_CAP members), one at a time: a count recorded — the chain's
 * end, or the members read before the cap or a refusal the board gave — is
 * not probed again until invalidated; a probe that met a member the board did
 * not answer is held as a view's read is (`hold`), and probed again past its
 * pause or at the daemon's `running`; one its trunk was dropped under is left
 * unasked, as a view's read is (`need`), and probed again as the view next
 * needs it.
 * @param {Doc} d
 * @returns {boolean} missing
 */
function probeMembers(d) {
  const key = 'v:' + d.addr;
  if (asked.has(key)) return false;
  if (inflight.has(key)) return true;
  if (held(key)) return false;
  inflight.add(key);
  probePass(d.addr, () => true, 0, MEMBER_PROBE_CAP).then((p) => {
    inflight.delete(key);
    if (!p || p.dropped) return;
    if (p.met && unanswered(p.met)) hold(key); else { unreached.delete(key); asked.add(key); }
    dirty();
  });
  return true;
}

/**
 * One pass of a probe of a chain, past the `from` members known: `D.1`
 * exists where the trunk's metadata names a birth, none where it names none
 * — the chain's end, met with nothing asked — and is asked where the record
 * holds no metadata; then each `D.k` is asked until the board answers one
 * `doc_not_registered`, the chain's end (the members of a published chain
 * are all published, so none is withheld from a reader of it), or the pass
 * reaches `cap` members or meets another refusal. The count is recorded
 * (M-REC's `takeMembers`) where the board answered every read the pass made
 * and it read a member or met the end — `ended` where it met the end — so a
 * chain cut short where the board did not answer stands unrecorded and is
 * probed again; nothing is recorded where the trunk was dropped while it read
 * (`watchDrops`: a new member's `publish` drops it, and the end met may be the
 * one before that member). Null, nothing recorded, where `stands` reads false
 * before a member is asked — an opening that has ended asks no more.
 * @param {string} trunk
 * @param {() => boolean} stands
 * @param {number} from the members known to exist, `D.1 … D.from`: the pass asks `D.from+1` first
 * @param {number} cap the most members the pass reads
 * @returns {Promise<(Chain & {dropped: boolean}) | null>} `dropped` the trunk was dropped while it read, nothing recorded
 */
async function probePass(trunk, stands, from, cap) {
  const dropped = watchDrops(trunk);
  const d = REC.doc(trunk);
  let n = from >= 1 ? from : d.meta && d.meta.birth ? 1 : 0;
  let ended = from < 1 && !!d.meta && !d.meta.birth;
  /** @type {Refusal | null} */
  let met = null;
  for (let k = n + 1; !ended && k <= cap; k++) {
    if (!stands()) return null;
    const out = await read(F.docMetadata(versionAddress(trunk, k)));
    if ('refused' in out) {
      if (out.refused.kind === 'refused' && out.refused.name === 'doc_not_registered') ended = true;
      else met = out.refused;
      break;
    }
    n = k;
  }
  if (dropped()) return { n, ended: false, met: null, dropped: true };
  if ((ended || n >= 1) && !(met && unanswered(met))) REC.takeMembers(trunk, n, ended);
  return ended ? { n, ended: true, met: null, dropped: false } : { n, ended: false, met, dropped: false };
}

/**
 * The chain the record holds where the board ended it there, as a probe of it
 * answers (`probeChain`), read at once — so an act that holds it begins its
 * own reads in the act (O-HOST's opening); null where the record holds no
 * count, or a count the board did not end the chain at.
 * @param {string} trunk
 * @returns {Chain | null}
 */
export function heldChain(trunk) {
  const d = REC.doc(trunk);
  return d.members != null && d.ended ? { n: d.members, ended: true, met: null } : null;
}

/**
 * The chain's members, for an act — the versions list, a landing's offer, a
 * reading scene's pane (see the head): the chain's end held, answered with
 * nothing asked; else probed to its end (`probePass`, uncapped) past the
 * members known — those the record holds, or the `from` a probe before it
 * read where that is more — a pass the trunk was dropped under begun again
 * past the members it read, which stand, for a member is never unminted, at
 * most DROP_ATTEMPTS passes. What it read where it stopped short of the end,
 * and why (`Chain`); null where `stands` read false before a member was
 * asked.
 * @param {string} trunk
 * @param {() => boolean} [stands]
 * @param {number} [from] the members a probe before this one read
 * @returns {Promise<Chain | null>}
 */
export async function probeChain(trunk, stands = () => true, from = 0) {
  const held = heldChain(trunk);
  if (held) return held;
  const d = REC.doc(trunk);
  let n = Math.max(from, d.members ?? 0);
  for (let pass = 1; ; pass++) {
    const p = await probePass(trunk, stands, n, Infinity);
    if (!p) return null;
    if (!p.dropped) return p.ended ? { n: p.n, ended: true, met: null } : { n: p.n, ended: false, met: p.met };
    n = p.n;
    if (pass >= DROP_ATTEMPTS) return { n, ended: false, met: null };
  }
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
    REC.takeDelivery(addr, F.decodeDelivery(out.answer, 1), F.asOf(out.answer));
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
 * C-67's reads for one origin, for an act — a whole read (`readWhole`), a
 * face stating the origin, which shows once they answer (O-FACES' `prepare`)
 * — as the view asks them (`needClaims`), each one the page holds no answer
 * to, a failed one asked again: the lookup of the edition claims on it, taken
 * where no drop of the claims held overtook it (`watchClaims`); then the
 * metadata of each listed claim's home, at once, and the link of each claim
 * whose home may be published (`claimNeeds`), at once, each taken where its
 * home was not dropped under it (`watchDrops`). A refusal is held as the view
 * holds it: the lookup's by whether it was withheld (`lookupRefused`), a
 * home's of the home (`metaRefused`), a link's as failed (`linkRefused`) —
 * the board not answering, as failed.
 * @param {string} origin
 */
export async function readClaims(origin) {
  const held = REC.editionClaimsOf(origin);
  if (held === undefined || held === 'unread') {
    const dropped = watchClaims();
    const out = await read(F.editionClaimsAt(origin));
    if (dropped()) return;
    REC.takeEditionClaims(origin, 'refused' in out ? lookupRefused(out.refused) : F.decodeAddrs(out.answer));
  }
  const listed = REC.editionClaimsOf(origin);
  const claims = Array.isArray(listed) ? listed : [];
  const homes = [...new Set(claims.filter((c) => claimNeeds(c).meta).map((c) => claimNeeds(c).home))];
  await Promise.all(homes.map(async (home) => {
    const dropped = watchDrops(home);
    const out = await read(F.docMetadata(home));
    if (dropped()) return;
    if ('refused' in out) metaRefused(REC.doc(home), out.refused);
    else { const m = F.decodeDocMetadata(out.answer); if (m) REC.takeMetadata(home, m); }
  }));
  await Promise.all(claims.filter((c) => claimNeeds(c).link).map(async (c) => {
    const dropped = watchDrops(claimNeeds(c).home);
    const out = await read(F.readLink(c));
    if (dropped()) return;
    if ('refused' in out) linkRefused(c, out.refused);
    else { const v = F.decodeLinkValue(c, out.answer); if (v) REC.takeLink(v); }
  }));
}

// ---- the refresh -----------------------------------------------------------------

/**
 * THE REFRESH (see the head; issue #212's design decision): what the rows
 * naming nothing marked the board for, made once the run's rows are in
 * (`arm`), or at once by the gate and the tests. The mark taken (M-REC's
 * `unmarkBare`) — nothing where none stood or a refresh is out — then, a
 * change of the page's class ending it wherever it stands: (1) the chain of
 * every edition the page holds the text of at its bare address counted
 * (`countChain`), at most MAX_INFLIGHT at once, and, once every one is, each
 * whose chain advanced past the member its text is (`memberShown`) taking the
 * arrival of that member's successor (`arrive`), its box pinned on the member,
 * which keeps the text — the box holding the view's centre last, so the
 * passage being read there is held across its move (T-LAYER's `holdAcross`) —
 * one whose member cannot be told, or whose box the app did not pin, left as
 * it stands; (2) what the view shows, nearer than far scale and with
 * the pins taken, kept with the members a text was handed to and the editions
 * left as they stand, and everything else dropped (M-REC's `takeRefresh`), the
 * view's answers for each forgotten; (3) each shown document read again
 * (`readFresh`), at most MAX_INFLIGHT at once, and set in one step as its
 * reads land (M-REC's `setAgain`) — none a drop overtook (`watchDrops`), which
 * the view reads again, its claims left out where a drop of the claims
 * overtook them (`watchClaims`), and its owner's byline cause where a drop of
 * the causes did (M-REC's `keyDrops`) — its answers forgotten so the view asks
 * again what it holds none of; (4) every reader told (`onDrop`), the chains
 * counted beside. A read the board did not answer marks the board again, the
 * next refresh made once UNREACHED_MS has passed; a bare row taken while it was
 * out arms the next as it ends.
 * @returns {Promise<void>}
 */
export async function refresh() {
  if (armed != null) { clearTimeout(armed); armed = null; }
  if (refreshing || !REC.unmarkBare()) return;
  refreshing = true;
  const cls = classes, out = () => classes !== cls;
  let unheard = false;
  try {
    /** @type {Map<string, Chain>} */
    const chains = new Map();
    /** @type {Set<string>} the editions left as they stand */
    const left = new Set();
    /** @type {Set<string>} the members an advanced edition's text was handed to */
    const handed = new Set();
    /** @type {Array<{doc: string, s: number}>} the editions whose chain advanced past the member their text is */
    const advanced = [];
    await bounded(REC.docs().filter(atBare), async (d) => {
      const c = await countChain(d, true);
      if ('met' in c) { if (unanswered(c.met)) unheard = true; left.add(d.addr); return; }
      chains.set(d.addr, { n: c.n, ended: true, met: null });
      const s = memberShown(d, c);
      if (s == null) left.add(d.addr);
      else if (s >= 1 && c.n > s) advanced.push({ doc: d.addr, s });
    });
    if (out()) return;
    // the box holding the view's centre arrives last: the passage being read is held across its move (T-LAYER's `holdAcross`), which a later arrival would end
    const centre = (/** @type {string} */ doc) => { const b = docBox(doc); return b.x <= cam.x && cam.x <= b.x + b.w && b.y <= cam.y && cam.y <= b.y + b.h ? 1 : 0; };
    for (const { doc, s } of advanced.sort((a, b) => centre(a.doc) - centre(b.doc))) {
      const member = versionAddress(doc, s);
      arrive(versionAddress(doc, s + 1));
      if (shown(doc) === member) handed.add(member); else left.add(doc);
    }
    const showing = lodOf(cam.scale).name !== 'far' ? visibleDocs().map((d) => d.addr).filter((a) => !left.has(a)) : [];
    const dropped = REC.takeRefresh(new Set([...showing, ...handed, ...left]));
    for (const a of dropped) forget(a);
    /** @type {Map<string, Promise<AccountFacts>>} each owner's byline facts, read once for the refresh */
    const facts = new Map();
    await bounded(showing, async (addr) => {
      const gone = watchDrops(addr), claimsGone = watchClaims(), causes = REC.keyDrops();
      const r = await readFresh(addr, chains, facts);
      if (out() || gone()) return;
      if (r.unheard) unheard = true;
      if (claimsGone()) delete r.fresh.claims;
      if (r.fresh.byline && 'cause' in r.fresh.byline.facts && REC.keyDrops() !== causes) delete r.fresh.byline;
      REC.setAgain(addr, r.fresh);
      forget(addr);
    });
    if (out()) return;
    onDrop({ row: null, addrs: [...dropped, ...showing], chains });
  } finally {
    refreshing = false;
    if (unheard && !out()) REC.markBare();
    if (REC.bare()) arm(unheard ? UNREACHED_MS : RUN_QUIET_MS);
    dirty();
  }
}

/**
 * Each of `items` handed to `fn`, at most `limit` at once — the view's own
 * budget — settled once every one has.
 * @template T
 * @param {T[]} items
 * @param {(item: T) => Promise<void>} fn
 * @param {number} [limit]
 * @returns {Promise<void>}
 */
async function bounded(items, fn, limit = MAX_INFLIGHT) {
  let next = 0;
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, async () => { while (next < items.length) await fn(items[next++]); }));
}

/** is a record an edition read at its bare address (see the head): a trunk, published, holding text, its box showing its plain address? */
const atBare = (/** @type {Doc} */ d) => d.from >= 0 && !d.system && plain(d.addr) === d.addr && shown(d.addr) === d.addr && (d.meta ? d.meta.published : d.kind === 'edition');

/**
 * A chain counted for a refresh (see the head): each member's metadata asked
 * in turn to the end the board answers — `doc_not_registered` past the last —
 * from the end the record holds, read again, else the first; then, where
 * `down` and the first member asked was minted after the text the record holds
 * was read, the members below it, down to one minted before it; each member's
 * mint position kept (M-FRAMES's `DocMeta.at`). The refusal it stopped at
 * where a read met another, the board not answering among them.
 * @param {Doc} d
 * @param {boolean} down whether the member the record's text is is wanted (`memberShown`)
 * @returns {Promise<{n: number, at: Map<number, number | null>} | {met: Refusal}>}
 */
async function countChain(d, down) {
  /** @type {Map<number, number | null>} */
  const at = new Map();
  /** member `k` asked: 'member' where the board answers it, 'end' past the chain's end, else the refusal met */
  const ask = async (/** @type {number} */ k) => {
    const out = await read(F.docMetadata(versionAddress(d.addr, k)));
    if (!('refused' in out)) { const m = F.decodeDocMetadata(out.answer); at.set(k, m ? m.at : null); return /** @type {const} */ ('member'); }
    return out.refused.kind === 'refused' && out.refused.name === 'doc_not_registered' ? /** @type {const} */ ('end') : out.refused;
  };
  const from = Math.max(1, d.members ?? 1);
  let n = from - 1;
  for (let k = from; ; k++) {
    const r = await ask(k);
    if (r === 'end') break;
    if (r !== 'member') return { met: r };
    n = k;
  }
  for (let k = from - 1; down && k >= 1 && d.readAt != null && (at.get(k + 1) ?? -Infinity) > d.readAt; k--) {
    const r = await ask(k);
    if (r === 'end') break;
    if (r !== 'member') return { met: r };
  }
  return { n, at };
}

/**
 * The member a bare address's text is (see the head; wire.md §Arrangement:
 * "Every arrangement reader of a bare DOCUMENT address answers the document's
 * trunk HEAD"): the newest the board says was minted at or before the
 * position the text was read at (`Doc.readAt`) — 0 where every member was
 * minted after it; where the board gave a member no mint position, or the
 * text no position, the end of the chain the record held where the board
 * ended it there; null where neither names one.
 * @param {Doc} d
 * @param {{n: number, at: Map<number, number | null>}} c
 * @returns {number | null}
 */
function memberShown(d, c) {
  const readAt = d.readAt, ats = [...c.at];
  if (readAt != null && ats.length && ats.every(([, a]) => a != null)) return ats.reduce((s, [k, a]) => (a != null && a <= readAt && k > s ? k : s), 0);
  return d.ended && d.members != null ? d.members : null;
}

/**
 * What a shown document's refresh reads (see the head), as the view reads it
 * (`pump`) — each part the record holds asked again: its extent, its
 * metadata, its links — within the view's scan permits, a scan the board kept
 * busy said unheard — and each one's value, and, where its box shows it, its
 * text over the window it holds — from the first position where the text is
 * now shorter than the window's start — with its image there; where the slots
 * of the links touching it project, each projection held (M-REC's
 * `projectionsOf`); the edition claims on its withheld runs' origins where
 * held, with the reads each claim's admission waits on (`claimsFresh`); its
 * owner's byline facts where a cause is held, read once an account
 * (`facts`); its chain from what the refresh counted, else counted again. A
 * part the board did not answer is left out, so it stands as held, and the
 * reads said unheard; a read of the document refused as withheld or not
 * registered ends them, the refusal its fresh state.
 * @param {string} addr
 * @param {Map<string, Chain>} chains
 * @param {Map<string, Promise<AccountFacts>>} facts
 * @returns {Promise<{fresh: Fresh, unheard: boolean}>}
 */
async function readFresh(addr, chains, facts) {
  const d = REC.doc(addr), drawn = shown(addr) === addr;
  /** @type {Fresh} */
  const f = {};
  let unheard = false;
  /** the board's answer to a read, else null: the board not answering noted, and a read of the document itself (`own`) refused as withheld or not registered taken as its fresh state */
  const ask = async (/** @type {object} */ frame, own = false) => {
    const out = await read(frame);
    if (!('refused' in out)) return out.answer;
    if (unanswered(out.refused)) unheard = true;
    else if (own && out.refused.name === 'withheld') f.refused = 'withheld';
    else if (own && out.refused.name === 'doc_not_registered') f.refused = 'unregistered';
    return null;
  };
  if (d.extent != null || d.refused) {
    const a = await ask(F.retrieveDocVSpanSet(addr), true);
    if (f.refused) return { fresh: f, unheard };
    if (a) f.spans = F.decodeSpanSet(a);
  }
  if (d.meta) {
    const a = await ask(F.docMetadata(addr), true);
    if (f.refused) return { fresh: f, unheard };
    const m = a ? F.decodeDocMetadata(a) : null;
    if (m) f.meta = m;
  }
  const content = f.spans ? f.spans.find((s) => s.subspace === 1) : null;
  const extent = f.spans ? (content ? content.positions : 0) : d.extent ?? 0;
  if (d.linksRead && extent > 0) {
    // within the view's scan permits (MAX_SCANS), which the daemon's two bound
    while (scansInFlight >= MAX_SCANS) await new Promise((r) => setTimeout(r, RETRY_MS));
    scansInFlight++;
    const out = await readScan(F.findLinksV(addr, 1, extent), addr).finally(() => { scansInFlight--; });
    if ('refused' in out) { if (unanswered(out.refused) || out.refused.name === 'scan_busy') unheard = true; }
    else {
      const links = F.decodeAddrs(out.answer);
      /** @type {LinkValue[]} */
      const values = [];
      await bounded(links, async (la) => { const a = await ask(F.readLink(la)); const v = a ? F.decodeLinkValue(la, a) : null; if (v) values.push(v); });
      f.links = links; f.values = values;
    }
  }
  if (drawn && d.from >= 0) {
    const from = d.from <= extent ? d.from : 1, to = Math.min(extent + 1, from + d.to - d.from);
    if (to > from) {
      const a = await ask(F.retrieveV(addr, from, to - from), true);
      if (f.refused) return { fresh: f, unheard };
      if (a) {
        f.text = { runs: F.decodeDelivery(a, from), asOf: F.asOf(a) };
        const im = await imageParts(addr, from, to - from);
        if ('runs' in im) f.image = { from, runs: im.runs };
        else if (unanswered(im.refused)) unheard = true;
      }
    } else f.text = { runs: [], asOf: null };
  }
  /** @type {NonNullable<Fresh['projections']>} */
  const projections = [];
  await bounded(REC.projectionsOf(new Set(f.links ?? d.links)), async (p) => {
    const out = await read(F.project(p.link, p.slot, p.addr));
    if (!('refused' in out)) projections.push({ ...p, runs: stretchesOf(out.answer).sort((x, y) => x.pos - y.pos) });
    else if (unanswered(out.refused)) unheard = true;
    else if (out.refused.kind === 'refused') projections.push({ ...p, runs: declinedAs(out.refused) });
  });
  if (projections.length) f.projections = projections;
  const origins = f.text ? [...new Set(f.text.runs.flatMap((r) => (r.kind === 'withheld' && r.origin ? [r.origin] : [])))] : REC.withheldOrigins(addr);
  /** @type {FreshClaims[]} */
  const claims = [];
  for (const origin of origins) {
    if (REC.editionClaimsOf(origin) === undefined) continue;
    const c = await claimsFresh(origin);
    if (c) claims.push(c); else unheard = true;
  }
  if (claims.length) f.claims = claims;
  const owner = drawn && d.from >= 0 ? REC.ownerAccount(d) : '', held = owner ? REC.accountKey(owner) : undefined;
  if (held && 'cause' in held) {
    let p = facts.get(owner);
    if (!p) { p = factsOf(owner); facts.set(owner, p); }
    const got = await p;
    if ('cause' in got && got.cause === 'unreachable') unheard = true; else f.byline = { account: owner, facts: got };
  }
  const chain = d.members == null ? null : chains.get(addr) ?? null;
  if (chain) f.members = { n: chain.n, ended: true };
  else if (d.members != null) {
    const c = await countChain(d, false);
    if (!('met' in c)) f.members = { n: c.n, ended: true };
    else if (unanswered(c.met)) unheard = true;
  }
  return { fresh: f, unheard };
}

/**
 * The edition claims on an origin as a refresh reads them (`readFresh`), as
 * the view holds them: the lookup (M-FRAMES's `editionClaimsAt`), a refusal
 * held by whether it was withheld (`lookupRefused`); then each listed claim's
 * home's metadata — a refusal of it as withheld or not registered taken of the
 * home, any other, the board not answering among them, a failed read
 * (`metaRefused`) — and each claim's link, a refusal of it but `withheld` a
 * failed read (`linkRefused`). Null where the board did not answer the
 * lookup: the claims held stand.
 * @param {string} origin
 * @returns {Promise<FreshClaims | null>}
 */
async function claimsFresh(origin) {
  const out = await read(F.editionClaimsAt(origin));
  if ('refused' in out && unanswered(out.refused)) return null;
  const lookup = 'refused' in out ? lookupRefused(out.refused) : F.decodeAddrs(out.answer);
  const listed = Array.isArray(lookup) ? lookup : [];
  /** @type {FreshClaims} */
  const c = { origin, lookup, values: [], homes: [], failed: [] };
  await bounded([...new Set(listed.map((claim) => homeOf(claim) || claim))], async (home) => {
    const m = await read(F.docMetadata(home));
    if (!('refused' in m)) { const meta = F.decodeDocMetadata(m.answer); if (meta) c.homes.push({ home, meta, refused: null }); }
    else if (m.refused.name === 'withheld' || m.refused.name === 'doc_not_registered') c.homes.push({ home, meta: null, refused: m.refused.name === 'withheld' ? 'withheld' : 'unregistered' });
    else c.failed.push(home);
  });
  await bounded(listed, async (claim) => {
    const v = await read(F.readLink(claim));
    if (!('refused' in v)) { const lv = F.decodeLinkValue(claim, v.answer); if (lv) c.values.push(lv); }
    else if (v.refused.name !== 'withheld') c.failed.push(claim);
  });
  return c;
}

/** the key an account's byline read is held under while the board does not answer it (`hold`) */
const accountKeyOf = (/** @type {string} */ account) => 'a:' + account;

/** are an account's byline facts to be read: none held, or the board not answering held and its pause ended? */
function accountWanted(/** @type {string} */ account) {
  const f = REC.accountKey(account);
  return f === undefined || ('cause' in f && f.cause === 'unreachable' && !held(accountKeyOf(account)));
}

/**
 * The view's read of an account's byline facts (see the head;
 * `readAccount`): missing while it is out, or while the page holds none and
 * can ask; not missing once held — a cause the board's silence left held
 * included, for nothing will arrive for it until its pause ends.
 * @param {string} account
 * @returns {number} the needs still missing
 */
function needAccount(account) {
  if (!account) return 0;
  if (accountsOut.has(account)) return 1;
  if (!accountWanted(account)) return 0;
  void readAccount(account);
  return 1;
}

/**
 * THE BYLINE'S FACTS FOR AN ACCOUNT (see the head; FP-34): read where the
 * page holds none, or holds that the board did not answer and the pause it
 * holds that for has ended — once for every reader of them, a read out
 * joined. A value is taken always, for it never changes; a cause only where
 * no drop of the byline causes overtook it (M-REC's `keyDrops`), else it is
 * asked again as the view next needs it; the board not answering held for
 * UNREACHED_MS (`hold`), asked again past it or at the daemon's `running`.
 * @param {string} account
 * @returns {Promise<void>} settled once what was read is taken, or nothing is
 */
export function readAccount(account) {
  const out = accountsOut.get(account);
  if (out) return out;
  if (!account || !accountWanted(account)) return Promise.resolve();
  const p = (async () => {
    const at = REC.keyDrops();
    const facts = await factsOf(account);
    if ('cause' in facts && REC.keyDrops() !== at) return;
    if ('cause' in facts && facts.cause === 'unreachable') hold(accountKeyOf(account)); else unreached.delete(accountKeyOf(account));
    REC.takeAccountKey(account, facts);
  })().finally(() => { accountsOut.delete(account); dirty(); });
  accountsOut.set(account, p);
  return p;
}

/**
 * An account's byline facts as its board answers them (`readAccount`; R22's
 * naming input: "the sole DEVICE-FLAGGED entry of its GENESIS ENROLLMENT …
 * read by one enroll-typed lookup"). Its own credential table first
 * (`key_set`): where it holds no key and never held one — none enrolled,
 * none retired — the table is read at each account above it while each holds
 * none enrolled (wire.md §Sessions), the first that holds one making its
 * writes signed BY REFERENCE with that account's keys, and none UNSIGNED.
 * Else its genesis enrollment: the enrollment records naming it (M-FRAMES's
 * `enrollmentsOf`), each one's link read (`read_link`) and kept where its own
 * `to` names the account, the genesis the first homed in another account's
 * doc 1, else the lowest-addressed homed in its own (skep-client's credential
 * read: "the genesis is the enrollment homed in the genesis registry's doc 1
 * — another account's, or the own doc 1's lowest link"); its record atom
 * placed in its home's text through the home's V→I image (AUTH-2.114) and read
 * (`retrieve_v`); the record's one device-flagged entry — the record rule's
 * `anchor` false — its label, none where it carries none, and its fingerprint
 * (AUTH-1.8, util's `keyFingerprint`). NOT RECORDED where no genesis stands,
 * the home's text no longer places its atom, or its record names not exactly
 * one device-flagged entry. A refusal says why where it can (`KeyCause`):
 * withheld from the reader, naming the owner of the document withheld; the
 * board not answering; else unread.
 * @param {string} account
 * @returns {Promise<AccountFacts>}
 */
async function factsOf(account) {
  /** @type {(r: Refusal, about: string) => KeyCause} */
  const why = (r, about) => (unanswered(r) ? { cause: 'unreachable' } : r.name === 'withheld' ? { cause: 'withheld', owner: accountOf(about) || about } : { cause: 'unread' });
  const own = await read(F.keySet(account));
  if ('refused' in own) return why(own.refused, account);
  const ks = F.decodeKeySet(own.answer);
  if (!ks) return { cause: 'unread' };
  if (!ks.enrolled.length && !ks.retired.length) {
    for (let above = parentAccount(account); above; above = parentAccount(above)) {
      const up = await read(F.keySet(above));
      if ('refused' in up) return why(up.refused, above);
      const set = F.decodeKeySet(up.answer);
      if (set && set.enrolled.length) return { cause: 'by-reference' };
    }
    return { cause: 'unsigned' };
  }
  const found = await read(F.enrollmentsOf(account));
  if ('refused' in found) return why(found.refused, account);
  /** @type {Array<{link: string, home: string, atom: EndRef}>} */
  const records = [];
  for (const link of F.decodeAddrs(found.answer)) {
    const lv = await read(F.readLink(link));
    if ('refused' in lv) return why(lv.refused, homeOf(link) || link);
    const v = F.decodeLinkValue(link, lv.answer);
    const to = v && v.to.length === 1 ? v.to[0] : null, atom = v ? v.from[0] : null;
    if (to && to.start === account && atom && !atom.whole) records.push({ link, home: homeOf(link) || link, atom });
  }
  const homed = (/** @type {{home: string}} */ r) => Number(accountOf(r.home) === account);
  const [genesis] = records.sort((x, y) => homed(x) - homed(y) || cmpAddr(x.home, y.home) || cmpAddr(x.link, y.link));
  if (!genesis) return { cause: 'not-recorded' };
  const ext = await extentOf(genesis.home);
  if ('refused' in ext) return why(ext.refused, genesis.home);
  const im = ext.extent > 0 ? await imageParts(genesis.home, 1, ext.extent) : { runs: [] };
  if ('refused' in im) return why(im.refused, genesis.home);
  const id = REC.identityOfEnd(genesis.atom), [at] = id ? REC.placedIn(placedRuns(im.runs), [id]) : [];
  if (!at) return { cause: 'not-recorded' };
  const got = await read(F.retrieveV(genesis.home, at.pos, 1));
  if ('refused' in got) return why(got.refused, genesis.home);
  const [run] = F.decodeDelivery(got.answer, at.pos);
  const rec = run ? REC.recordValue(run) : null;
  const devices = rec && rec.type === 'skep-enroll' ? rec.keys.filter((k) => !k.anchor) : [];
  const [entry] = devices;
  const fingerprint = devices.length === 1 && typeof entry.alg === 'string' && typeof entry.key === 'string' ? keyFingerprint(entry.alg, entry.key) : null;
  if (!fingerprint) return { cause: 'not-recorded' };
  return { label: typeof entry.label === 'string' && entry.label ? entry.label : null, fingerprint };
}

/** a V→I image as `image` answers it (`F.decodeRuns`), each run placed at its positions from the text's first: what M-REC's `placedIn` reads bytes by identity through */
function placedRuns(/** @type {Array<{iStart: string, width: number}>} */ runs) {
  let pos = 1;
  return runs.map((r) => { const run = { pos, ...REC.iSpanOf(r) }; pos += r.width; return run; });
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
