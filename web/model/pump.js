// M-PUMP — view-driven, span-shaped fetching (the structure record §3.2).
// Layer 1, port-bound: every read goes through B-PORT's `op` under the
// page's session, or in the guest form where none stands; nothing here hands
// a write frame to `op` (S-33 (b)), and what is read is M-REC's to hold.
// State: the in-flight set and the view's scans among it; the keys answered
// (`asked`), refused retry-class with the time they may go again (`retryAt`),
// and held while the board did not answer (`unreached`); the refusals met;
// the acquire out (`attempt`), the stream's drop not yet caught up (`gap`),
// the feed rows held while either stands (`rowsHeld`), each with the page's
// clock as it came, the `index` states naming another session kept while
// an acquire's call is out (`faces`), and the positions the catch-ups read
// (`caught`); the index reads out (`indexing`); the pauses out, each
// woken as it ends (`waking`); a record of
// the events taken while each read of the board's state is out (`whileOut`);
// the places the view stood on at the last change of class (`standing`); the
// documents the view shows that a feed row named, a change of class kept or a
// refresh's read left unset, each read again until it is set (`again`); the
// searches out for what a feed row changed of the edition claims
// (`searching`), and the claims on an origin a document the
// view shows windows, each read again until set (`claimsOut`); what stands
// held as it is while it is read again, the page's clock at the row or drop
// that left it behind, whether it has stood KEPT_MS and the refusal that left
// the last of its reads unset (`keptDocs`, `keptClaims`), and the board while
// it lags (`keptBoard`), which `kept`, `claimsKept` and `boardKept` answer;
// how each was last set by its reads — whether that changed what it shows,
// with the stamp it stood from — which `liftOf` answers (`lifts`), and what
// the reads making the lagging board whole found so far (`boardFound`);
// the refresh armed or out, and the changes of class taken; the positions of
// the window's own acked writes, by document (`ownAt`); how the board was
// opened; and the readers the app hands in at `start` — the version each box
// shows (N-GO's `shownIn`), who is told of a member's arrival (N-GO's
// `arrived`) and of each drop (SC's `dropped`), the places the view's state
// names (the trail's), the texts the trail's entries the reader has left read
// and who is told of each chain a refresh counts (N-TRAIL's `readings`,
// `countedAt`), who is told of a board found open, and the text an open find
// searches (N-FIND's `searched`), which the view keeps as it keeps the
// documents it shows (`shownNow`); the view's text reads the board refused
// for their size (`halved`).
// The view's needs (`pump`; FP-11: the plane's pure camera arithmetic beside
// the model): at mid scale and nearer, for the documents in view that stand
// whole — a continuation drawn as one mark asks nothing for its members —
// each box is read as it is drawn (FP-22): the version the box shows for
// everything below, and the box's document, where the box shows another
// version, for what the box draws of the document itself alone — its extent,
// its metadata, its links and their types, and its chain. The reads, within
// MAX_INFLIGHT and the daemon's MAX_SCANS: the extent
// (`retrieve_doc_v_span_set`), the metadata (`doc_metadata`), the links
// touching the document (`find_links_v`, then each new link once by
// `read_link`; E17 (a)) and, from FETCH_EM up, the span window of text
// (`retrieve_v`: from position 1 through the columns in view, every column's
// place read from every line before it — FP-12 — the parts it lacks read
// alone where one delivery would not hold it, each of at most
// MAX_DELIVERY_ITEMS positions, one the board refused for its size asked as
// its halves, `halvedOf`), each part read with its V→I image over the same
// positions (`image`, in parts where the board refuses it for its size:
// `imageParts`) and the two taken in one step (`withImage`, M-REC's
// `takeDelivery`; FP-27) — a part whose image read fails taken alone, and the
// image of held text its held image places nothing of asked on its own, in
// parts of at most MAX_DELIVERY_ITEMS positions, each halved where the board
// refuses it for its size (`imageLacked`, `imageOf`) —
// where each far end its links send from it stands in the far
// document's current text (`project`, A-53) into the version the far box
// shows, from every passage end the document holds (M-REC's `holdsEnd`), the
// edition claims on each origin its withheld runs name (`editionClaimsAt`,
// then each listed claim's link and its home's metadata; PUB-5.124) and the
// byline's facts of its owner (`readAccount`; FP-34) — a value read once per
// account for the page's life, a cause again wherever a feed row naming a
// doc 1 dropped it or kept it as held, owed its read again (M-REC's
// `causeOwed`); and, from LOD_TXT_LO up at the box's document alone,
// the chain's members up to MEMBER_PROBE_CAP (`probeMembers`).
// Asked by an act: the board (`openBoard`, `retryBoards`; FP-35) — `boards()`
// and, for the board held, in this order, the device's key store
// (`fingerprint`, before the session, so the key the session is opened with
// is known with it — FP-34), the session, its health, its daemon and its
// index; the page's session (`acquireSession`), and, got back for one lost,
// what was written on its board while it was out (`changes`; `catchUp`);
// what was written while the event stream was down, once it reopens
// (`changes`; `closeGap`); the client index
// (`readIndex`: `places`, at boot and at every change of class, the view
// asking nothing while it is out); a whole document, its text taken with its
// image in one step (`loadWhole`, `wholeOf`);
// the rest of a document's text an open find searches, each part read with
// its image and the two taken into the model in one step as they land
// (`readRest`; FP-6, FP-27);
// the reads a face stating a withheld origin needs before it shows
// (`claimsToRead`, `readClaims`); a document's metadata where the page holds
// neither it nor a refusal of it — a claim's home's, the home of a link a
// card states (`readMetadata`); where a link's end projects (`projectEnd`,
// `projectedIn`); a member's extent (`extentOf`) and its age (`ageOf`),
// which every `doc_metadata` answered of a member keeps; a link's lineage
// (`lineage`: `in_claims` and `out_claims` under the audit view; A-56,
// A-57); the chain to its end (`probeChain`); and where a passage's bytes
// stand in a text (`compareParts`) and a text's image over a region
// (`imageParts`).
// The orders every read keeps. A read goes at the page's class (`atClass`):
// it waits for an acquire out, and one the class changed under, or that met
// the end of the session it went out under, is asked again in the form the
// page takes then, so no answer to a class the page has left, or of a
// session the shell does not hold, reaches the model. A read the board did
// not answer (`unreachable`; `unanswered`, the one test of it) teaches
// nothing: a view's read so refused is held (`unreached`), not missing, its
// refusal recorded once for the outage, and asked again as the board answers
// again (`answering`) or after UNREACHED_MS; a read again so refused waits out the
// pause (`afterPause`), which ends as the board answers again (`answering`), past
// UNREACHED_MS or at a change of class, whichever comes first, and which any
// reader whose own read the board did not answer may wait out too. A read a
// drop overtook teaches nothing either: the board's answers and the feed's
// rows come by two channels nothing orders, so every read watches the drops
// of the address it is read for (`watchDrops`) — a lookup of the edition
// claims the changes of its origin's claims (`watchClaims`), a byline's cause
// the drops of the causes (M-REC's `keyDrops`), its read answering whether it
// took what it read (`readAccount`) — and takes nothing learned across one —
// a view's read is left unasked, an act's read begun again, at most
// DROP_ATTEMPTS times. A read refused for its size
// (`SIZE_REFUSALS`) is asked again in parts, within SPLIT_READS (FP-21), and a
// text is asked in parts no delivery's item bound refuses (`textParts`). A
// class scan read whole is asked again on `scan_busy`, within SCAN_ATTEMPTS.
// A read of the board's state the board's events overtook keeps what they
// brought (`overtaken`): the listing is laid under the feed rows and the
// `index` state taken while it was out, the health under the last `mode`,
// the probe's daemon under a `daemon` event. The chain's end is the board's
// answer: a probe records the whole chain only where the board answered that
// no member follows; a count it stopped short at is recorded as read so far.
// The events: a board event is taken where it names the page's board, none
// before the board is known. While an acquire for a lost session is out, or
// a gap stands, every feed row is held as it comes (`rowsHeld`) and taken
// once a catch-up lands and nothing else holds it (`drain`); a row at a
// position a catch-up read is left (`caught`), for the catch-up took it.
// Every row is stamped with the page's clock as it comes, a row a catch-up
// read with the drop or the loss that left it unheard, and what it leaves
// held as it stands is kept from that stamp (`Kept.since`). A feed row the
// page takes (`takeRow`, `applyRow`; a `drafts` row only where it names the
// page's own session, or, held, the one the page held as it came) hands a
// `publish` row's member to the app with the row's position before anything
// is dropped (`arrive`), then goes to M-REC's index and invalidation — every
// document it touches dropped, but
// those the view shows — the text an open find searches among them — and the
// homes of the edition claims on the origins
// those window, whose metadata decides the clause there (`keptNow`), which
// stand as held while they are read again and are set in one step as their
// reads land (`readAgain`; M-REC's `setAgain`), a row naming one while they
// are out queueing one more read — the view's answers for each address
// dropped forgotten, and what it touched told after the drop (`onDrop`;
// FP-23), a whole read of a document read again waiting for those reads first
// (`wholeOf`). A row touching a doc 1 keeps the byline cause of each owner of
// a document the view shows as held, owed its read again — read as the view
// draws the text, or with a document's other reads where it is read again —
// and drops every other (M-REC's `causeOwed`; FP-34). A row drops no edition
// claim (PUB-5.124): which origins'
// claims it wrote, retracted or superseded is read from it (`searchClaims`,
// `claimsWritten`) — the link it names, or the edition-class links homed in
// each document it names (M-FRAMES's `editionLinksIn`), every origin where
// such a read is refused — and those alone change (M-REC's `claimsChanged`):
// one a document the view shows windows kept as held and read again until
// set in one step (`claimsAgain`; M-REC's `setClaims`), a change taken
// meanwhile queueing one more read; any other dropped. Wherever the clause on
// an origin may be decided anew — its claims set again or dropped, a claim's
// home dropped by a row or read again — the documents windowing the origin
// are told (`onDrop`), so a reading scene's pane showing one reads it again.
// Owner facts taken that say other than those held — a byline read's
// (`readAccount`), or a shown document's read again (`readAgain`) — are told
// as one drop naming the documents the owner holds and the owner
// (`bylineTaken`), so a reading scene's pane sets its byline again (FP-34);
// what a refresh takes reaches every reader by the refresh's own drop. A
// row naming no document and no link marks the board, and once the run is in
// — no row for RUN_QUIET_MS, at the latest RUN_MAX_MS after its first bare
// row — one refresh runs (`refresh`): each edition held at its bare address,
// and each one a trail entry the reader has left read there at a known
// position, has its chain counted once, every chain told to the trail with
// the member a text read at each position was (`mintedBy`), so each entry
// re-takes its own, then each held edition whose chain advanced past the
// member its text is (`memberShown`) taking that member's arrival; what a
// row naming it would keep stands as held — what the view shows, each draft
// the window writes in, each draft being typed in or holding dialed words —
// the rest dropped (M-REC's `takeRefresh`); each that stands is read again
// (`readFresh`) and set in one step (M-REC's `setAgain`), or, where the board
// left a part of its reads unanswered, read again as a row naming it is until
// its reads set it whole (`readAgain`), save a draft that waits on the
// window's writing (`waitsOnWriting`), whose read waits as a row's does;
// every reader is told. The window's own writes (`wrote`; FP-23): a draft the
// page holds dialed words of that the board has not acked (M-REC's
// `writing`) has its text neither set nor dropped — the view asks nothing of
// it, a row naming it and a refresh keep it as it stands, and a read again of
// it waits — until W-MACHINE tells the acks (`wrote`), which read it again
// as a row naming it would, as that act's feedback: held as it stands with no
// kept clause, and set with no word of how; a row at one of those acks'
// positions is read the same way. An `index`
// state is taken where it is the face the page reads, a signed-in page's
// named by its own session (`ofFace`); one naming another session while the
// call of an acquire for a lost session is out is kept (`faces`), the one
// naming the session that call opens taken as the page goes on under it as
// the same principal (`takeFace`). The event stream's drop (B-PORT's
// `onStream`) opens a gap (`streamDropped`): the reopened stream starts at
// the shell's head, so once it reopens the rows between are read by
// `changes` from the last position the page took (M-REC's `feedAt`) — under
// the page's session, or in the guest form (`{guest, board}`; #749) where it
// holds none, after any acquire out, whose own catch-up reads from the same
// position — and taken with the rows held, each once and in position order
// (`closeGap`, `drain`), a catch-up that cannot be done marking the board as
// a row naming nothing does (`markBehind`); the gap makes no drafts read, its
// two-class read from `feedAt` covering its window. The board lags (`standLag`, `boardKept`;
// FP-23) from the drop, or from the first bare row of a run, until the gap's
// rows are taken and no mark or refresh stands (`lagEnds`). What a kept place
// shows is set by its reads (M-REC's `setAgain`, `setClaims`), each setting
// recorded as changed or unchanged with the stamp the place stood from
// (`liftOf`); the board changed where a catch-up took a row or a refresh
// changed what is shown, else unchanged (`lagFound`); a place let go unset —
// dropped as the view left it, its reads voided or ended by a change of the
// page's class — none. A session's end
// (`takeEnd`) — `session-died`, a read's `session_died`, or the page's own
// `close(session)`, its sign-out — is taken where it names the page's own
// session: the shell's own restart is no death — the page goes on under the
// session the reason names, or, where it re-opened none, the session is lost
// — and every other end is M-REC's death, which changes the page's class
// (`classChanged`).
// The acquire (FP-28): the page's session is opened by one routine
// (`acquireSession`), at boot and for a session lost — one attempt per lost
// session, a loss told while it is out joining it, made once the board
// answers, none after a refused one. While it is out every read waits, and
// for a session lost every feed row is held; while its call is unanswered
// past RECONNECTING_MS the line reads that the page is reconnecting. An
// answer after the attempt settled is stale, a session it opened closed.
// Got back for a session lost with no re-open and as the same principal, and
// `draftsAt` standing, the drafts rows a mid-tick end cut off are read FIRST
// (`changes(session, since: draftsAt, class: 'drafts')`; D6) — each applied
// with `draftsAt` raised but `feedAt` left and `caught` untouched, so no
// published row in its window is masked, a refusal marking the board as the
// catch-up's own does and not blocking it. Then, before the attempt settles,
// what was written on the board while it was out is read by `changes` from
// the last position the page took there (M-REC's `feedAt`) and taken with the
// rows held, each row once and in position order (`catchUp`, `drain`), a
// catch-up that cannot be done marking the board as a row naming nothing
// does. Regained as another principal, or refused, the class changes as at a
// death, and no drafts read is made.
// A change of class (`classChanged`; FP-29, FP-23) takes the documents in
// view and those the view's state names before anything goes (`stoodOn`),
// hands them to M-REC, which keeps those read as published and leaves every
// other box it knew owed its read at the new class — covered at once where
// the change ends the session — reads the index again, reads each document
// it kept again at the new class to be set in one step (`readAgain`), asks
// each other one it stood on its extent again at once, at any scale — an
// owed box's until a read covers, confirms or lifts it — in view first and
// nearest the centre (`reread`), and tells every reader of the change. Every
// other box owed its read is read as the view's needs reach it, nearer than
// far scale (`pump`), and none at far. A gap the stream stands open again
// over ends at the change, the reads at the new class making the page whole;
// one it has not reopened over stands.
// Rules: FP-1, FP-2, FP-6, FP-9, FP-11, FP-21, FP-22, FP-23, FP-27, FP-28,
// FP-29, FP-34, FP-35.

import * as PORT from '../bridge/port.js';
import * as REC from './records.js';
import * as F from './frames.js';
import { cam, viewportWorld, measure, fit } from '../plane/camera.js';
import { lodOf, residueDepth, LOD_TXT_LO } from '../plane/lod.js';
import { docBox, intersects, withinContinuation } from '../plane/projection.js';
import { estimate, estimatedSpan, LINE_H } from '../plane/layout.js';
import { versionAddress, homeOf, documentOf, memberOf, isTrunkMember, kindOf, accountOf, parentAccount, cmpAddr, isUnder } from './address.js';
import { keyFingerprint } from '../util.js';

/** @typedef {import('./records.js').Doc} Doc */
/** @typedef {import('./records.js').Stretch} Stretch */
/** @typedef {import('./records.js').ImageRead} ImageRead */
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
/** @typedef {import('../bridge/shapes').IndexState} IndexState */
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
 * was learned of that side, never that it has none
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
/** the daemon's class-scan pool is two permits (wire.md §Link discovery reads), which `find_links_v`, `in_claims` and `out_claims` take: at most two of the view's scans in flight */
const MAX_SCANS = 2;
/** positions per fetched block — the span window rounds to it */
const SPAN_BLOCK = 2048;
/** the most positions a whole read fetches at once (the staging draft holds six million; the rest comes by the viewport's windows) */
export const WHOLE_CAP = 262144;
/** the rows of a document's head the columns a view meets are read for, where its corner stands at its head (`spanWindow`) */
const HEAD_ROWS = 4;
/** the em (px), by P-LAY's estimate, at which a document's text is fetched — below S1's mount em, and the estimate's size never smaller than the one T-LAYER folds the article at and mounts it at (its columns never more than the text's), so the text is there when the layer mounts */
const FETCH_EM = 5;
/** the view's probe of a chain reads at most this many members (`D.1`, `D.2`, …); an act's probe reads to the chain's end */
const MEMBER_PROBE_CAP = 8;
/** a retry-class refusal (`scan_busy`, `history_busy`) is reissued after this pause */
const RETRY_MS = 120;
/** a view's read the board did not answer is held this long, then asked again, where the board did not answer again first (`answering`) — the interval `skep-shell`'s `PROBE_CADENCE` asks a board's `/health` again at (unmeasured here) */
export const UNREACHED_MS = 2000;
/** a class scan read whole is asked at most this many times while the board answers `scan_busy` */
const SCAN_ATTEMPTS = 6;
/** an act's read — a whole document (`loadWhole`), where a link's end projects (`projectEnd`) — is made at most this many times while what it reads is dropped under it (unmeasured) */
export const DROP_ATTEMPTS = 4;
/** an acquire for a session lost that is not back within this long has the line read that the page is reconnecting (FP-28) */
export const RECONNECTING_MS = 1000;
/** an act's read the board refuses for its size (M-FRAMES's `SIZE_REFUSALS`), and the view's read of an image, is asked in parts in at most this many reads in all (`compareParts`, `imageParts`), a text in at most this many past its first size refusal (`textParts`), and the view's text window in at most this many parts (`halvedOf`); past it the size refusal is handed up (unmeasured: no document on the seeded board meets a size refusal) */
export const SPLIT_READS = 32;
/** a run of feed rows is taken to be in once no row has come for this long: the shell emits a tick's rows back to back and announces no run's end (`skep-shell`'s feed thread; unmeasured) */
export const RUN_QUIET_MS = 250;
/** a refresh runs at the latest this long after the first bare row of a run, however the rows keep coming (unmeasured) */
export const RUN_MAX_MS = 2000;
/** what stands as held while it is read again says so once it has stood this long (`kept`, `claimsKept`; FP-23) */
export const KEPT_MS = 1000;

/** @type {Set<string>} */
const inflight = new Set();
/** @type {Map<string, Promise<boolean>>} the byline reads out, by account (`readAccount`): every reader of one joins it, and is answered whether it took what it read */
const accountsOut = new Map();
/** @type {Set<string>} keys already asked and answered (a refusal included), not to be asked again until invalidated */
const asked = new Set();
/** @type {Map<string, number>} keys refused retry-class, with the time they may be asked again */
const retryAt = new Map();
/** @type {Map<string, number>} keys the board did not answer, HELD, with the time they may be asked again — at once where the daemon is announced answering again (`answering`) */
const unreached = new Map();
let scansInFlight = 0;
/** @type {Array<{frame: string, refusal: Refusal, addr: string}>} the refusals met, for the faces and the gate */
const refusals = [];
/** @type {Array<(r: {frame: string, refusal: Refusal, addr: string}) => void>} */
const refusalWatchers = [];
/**
 * @typedef {Object} Attempt — one call of `session(board)` the page makes (`acquireSession`): at boot, or for its session lost
 * @property {string | null} lost the reference of the session it is made for, lost; null at boot
 * @property {number} at the page's clock as it began: what the rows its catch-up reads left behind is stamped with, where no gap stands (`Gap.at`)
 * @property {boolean} made its call made — false while it waits for the board to answer
 * @property {boolean} answered its call answered: the line reads no reconnecting after, and no face is kept (`faces`)
 * @property {Promise<void>} settled resolved as it settles
 * @property {() => void} settle settles it: its answer and its catch-up taken, another acquire taking its place, or the shell's re-open or a death taken; any answer after it stale
 */
/** @type {Attempt | null} the acquire out, else null */
let attempt = null;
/** @typedef {{u: FeedUpdate, taken: boolean, at: number}} HeldRow — a feed row held while an acquire for a lost session is out or a gap stands (`takeRow`), with whether the page took it under the session it held as the row came — none once the page's class changes (`classChanged`) — and the page's clock as it came */
/** @type {HeldRow[] | null} the feed rows held from a lost session's acquire, or from the stream's drop, until a catch-up lands or none can (`drain`) and nothing else holds them, in the order they came; null while none are held */
let rowsHeld = null;
/** @type {{since: number, next: number} | null} the positions the catch-ups read, `(since, next]`, those that met joined: a row the feed brings there after them is one a catch-up took (`takeRow`, `drain`) */
let caught = null;
/**
 * @typedef {Object} Gap — the event stream's drop, until the rows it missed are taken (FP-23, FP-28): the reopened stream
 * starts at the shell's head, so the rows between are read by `changes` (`closeGap`)
 * @property {number} at the page's clock at the drop: what every row the gap's catch-up reads left behind is stamped with
 * @property {boolean} open the stream stands open again since the drop: its catch-up may go
 * @property {boolean} out its catch-up is out (`closeGap`)
 * @property {boolean} again the stream dropped and reopened while its catch-up was out: one more is made as it lands
 */
/** @type {Gap | null} the stream's drop whose rows are not yet taken; null where none stands */
let gap = null;
/** @type {Map<string, IndexState>} the last `index` state naming each session `ofFace` refused while the call of an acquire for a lost session was out: the face the session it opens is sent before its answer (`takeFace`) */
const faces = new Map();
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
/** @type {(member: string, at: number | null, newest: number | null) => void} told of a trunk's next member arriving — a feed row publishing it, before the row drops anything, with the row's position; a refresh's, its member found from the text, with none, and with the chain's count as the newest member known (N-GO's `arrived`, handed in at `start`) */
let onPublish = () => {};
/** @type {(d: Dropped) => void} told of what each feed row the page takes, and every change of its class, dropped of what it held, after the drop (SC's `dropped`, handed in at `start`) */
let onDrop = () => {};
/** @type {() => string[]} the places the view's state names beside the view — the trail's entries — read again at a change of the page's class (handed in at `start`) */
let stands = () => [];
/** @type {() => void} told once a board the list read again found is open (`retryBoards`): the app's launch there (handed in at `start`) */
let onOpen = () => {};
/** @type {() => Array<{addr: string, at: number}>} what the trail's entries the reader has left read, each by its document and the position its text was read at (N-TRAIL's `readings`, handed in at `start`): a refresh counts the chain of each edition among them */
let readings = () => [];
/** @type {(trunk: string, memberAt: (at: number) => string | null, newest: number) => void} told of each chain a refresh counts, with the member a text read at a position was where a newer member follows it (`mintedBy`) and the chain's count, its newest member (N-TRAIL's `countedAt`, handed in at `start`) */
let onCounted = () => {};
/** @type {() => (string | null)} the text an open find searches (N-FIND's `searched`, handed in at `start`): kept as the view keeps the documents it shows (`shownNow`); null where no find is open */
let finding = () => null;
/** @type {{session: boolean}} how the page opens its board (`openBoard`): whether it asks a session — the gate's guest asks none — as the boot opened it, which the list read again keeps */
let opening = { session: true };
/** @type {Promise<boolean> | null} the list read again, out (`retryBoards`): a second press joins it */
let boardsOut = null;
/** @type {Set<string>} the places the view stood on as the page's class last changed, each asked again at the new class until answered (`reread`) */
let standing = new Set();
/** @type {ReturnType<typeof setTimeout> | null} the refresh armed for the board a bare row marked (`arm`), else null */
let armed = null;
/** when the run the armed refresh waits on began, by the platform's clock: its first bare row */
let runFrom = 0;
/** a refresh is out (`refresh`) */
let refreshing = false;
/** the changes of the page's class taken (`classChanged`), and the pump's starts (`start`): a refresh or a read again begun under another ends */
let classes = 0;

/**
 * @typedef {Object} Again — a read again out: of a document the view keeps (`readAgain`), or of the edition claims on an origin one windows that a row changed (`claimsAgain`)
 * @property {boolean} more one more read follows the one out: a refresh reached it, or a row changed the claims, while it was out
 * @property {boolean} paused the board did not answer one of the last reads, which set nothing: the next waits out the pause (`afterPause`), the view counting nothing missing meanwhile
 * @property {Promise<void>} landed settled as the read out lands — setting what it reads, or overtaken — and made anew for the next
 */
/** @type {Map<string, Again>} the documents the view keeps that a feed row named, a change of class kept or a refresh's read left unset, each read again until it is set (`readAgain`): while one is, the view asks nothing of it */
const again = new Map();
/** @type {Map<string, Again>} the origins a document the view shows windows whose edition claims a feed row changed, each one's claims read again until set (`claimsAgain`): while one is, the view asks nothing of them */
const claimsOut = new Map();
/** the searches out for the origins whose edition claims a feed row changed (`searchClaims`): the view counts each missing */
let searching = 0;
/** @type {Set<() => void>} the pauses out (`afterPause`), each woken as the board answers again (`answering`), past UNREACHED_MS or at a change of the page's class */
const waking = new Set();

/**
 * The pause a read the board did not answer waits out before it is made
 * again (see the head): settled as the board answers again (`answering`), once UNREACHED_MS
 * has passed, or at a change of the page's class, whichever comes first.
 * `woken` runs as it settles, before anything awaiting any pause woken with
 * it resumes.
 * @param {() => void} [woken]
 * @returns {Promise<void>}
 */
export function afterPause(woken = () => {}) {
  return new Promise((/** @type {(v: void) => void} */ res) => {
    const wake = () => { clearTimeout(timer); waking.delete(wake); woken(); res(); };
    const timer = setTimeout(wake, UNREACHED_MS);
    waking.add(wake);
  });
}

/**
 * @typedef {Object} Kept — what stands as held while it is read again (FP-23): a document the view shows that a feed row
 * named, that a refresh reads, or that a change of class kept (`readAgain`, `refresh`); an origin's edition claims a row
 * changed (`claimsAgain`); the board while it lags (`standLag`)
 * @property {number} since the page's clock at the row or drop that left behind what stands: the first one, where several
 * did — what its clause says ⟨when⟩ of (T-LAYER's `keptClause`)
 * @property {boolean} long it has stood KEPT_MS: `kept`, `claimsKept` and `boardKept` answer for it
 * @property {Refusal | null} met the refusal the last of its reads met that left it standing — the board not answering, or a scan it kept busy; null while none has
 * @property {ReturnType<typeof setTimeout>} timer its second, while it runs
 */
/** @type {Map<string, Kept>} the documents standing as held while they are read again, by address */
const keptDocs = new Map();
/** @type {Map<string, Kept>} the origins whose edition claims stand as held while they are read again */
const keptClaims = new Map();
/** @type {Map<string, Kept>} the board's lag (`standLag`), under the board's own address (`BOARD`) */
const keptBoard = new Map();
/** the board's own address, the root every account stands under: the board's lag's key */
const BOARD = '1';
/** the changes of what `kept`, `claimsKept` and `boardKept` answer, counted: the app's loop reads them (`keptRevision`), so every surface shows a change in one frame */
let keptRev = 0;
/** @type {Map<string, number[]>} the positions the board acked the window's own writes at, by document, the newest OWN_KEPT of each (`wrote`): a feed row at one is that act's feedback */
const ownAt = new Map();
/** how many of a document's own ack positions are kept (`ownAt`) */
const OWN_KEPT = 64;
/** @typedef {import('./records.js').Outcome} Outcome */
/** @typedef {'doc' | 'claims' | 'board'} KeptKind what a place held as it stands is: a document, an origin's edition claims, the board */
/** @type {Map<Map<string, Kept>, KeptKind>} what each holder holds */
const KINDS = new Map([[keptDocs, /** @type {KeptKind} */ ('doc')], [keptClaims, /** @type {KeptKind} */ ('claims')], [keptBoard, /** @type {KeptKind} */ ('board')]]);
/** @type {Map<string, {since: number, outcome: Outcome}>} how each place held as it stood was last set by its reads, with the stamp it stood from, by its kind and its key (`liftOf`); none for one let go unset, or held again since */
const lifts = new Map();
/** a place's key among the lifts: its kind, then its key */
const liftKey = (/** @type {Map<string, Kept>} */ map, /** @type {string} */ key) => KINDS.get(map) + ' ' + key;
/** @type {Outcome | null} what the reads that make the lagging board whole found so far: changed once a catch-up took a row or a refresh changed what is shown, else unchanged once one landed; null before any did (`lagFound`) */
let boardFound = null;

/** what is read again held as it stands (`Kept`) from `since`, where it is not already — held so, it keeps its first stamp: its second begun, past which `kept` answers for it and the view is told, and the record of how it was last set (`liftOf`) let go */
function standKept(/** @type {Map<string, Kept>} */ map, /** @type {string} */ key, /** @type {number} */ since) {
  if (map.has(key)) return;
  lifts.delete(liftKey(map, key));
  /** @type {Kept} */
  const k = { since, long: false, met: null, timer: setTimeout(() => { if (map.get(key) !== k) return; k.long = true; keptRev++; dirty(); }, KEPT_MS) };
  map.set(key, k);
}

/** a place held as it stood, set by its reads from the stamp it stood from: how it was set, which `liftOf` answers */
function lifted(/** @type {Map<string, Kept>} */ map, /** @type {string} */ key, /** @type {number | null} */ since, /** @type {Outcome | null} */ outcome) {
  if (since != null && outcome) lifts.set(liftKey(map, key), { since, outcome });
}

/** a read of what is held as it stands met a refusal that leaves it standing: what `kept` answers says why */
function keptMet(/** @type {Map<string, Kept>} */ map, /** @type {string} */ key, /** @type {Refusal} */ met) {
  const k = map.get(key);
  if (!k || k.met === met) return;
  k.met = met;
  if (k.long) { keptRev++; dirty(); }
}

/**
 * What was held as it stood set, or let go: `kept` answers nothing for it
 * from this step on.
 * @param {Map<string, Kept>} map
 * @param {string} key
 * @returns {number | null} the stamp it stood from (`Kept.since`); null where it was not held
 */
function unkeep(map, key) {
  const k = map.get(key);
  if (!k) return null;
  clearTimeout(k.timer); map.delete(key);
  if (k.long) keptRev++;
  return k.since;
}

/** the documents and the origins' claims held as they stood let go (a start, a change of the page's class); the board's lag apart (`lagEnds`) */
function unkeepAll() { for (const map of [keptDocs, keptClaims]) for (const key of [...map.keys()]) unkeep(map, key); }

/** what a kept holder answers for (`kept`, `claimsKept`, `boardKept`): why the last of its reads left it standing and the stamp it stands from, once its second has passed; null else */
const answerOf = (/** @type {Kept | undefined} */ k) => (k && k.long ? { met: k.met, since: k.since } : null);

/**
 * Does a document stand as held past KEPT_MS while it is read again (FP-23)
 * — a feed row named it, a refresh reads it, a change of the page's class
 * kept it: why the last of its reads left it standing, where one did, and the
 * page's clock at the row or drop that left it behind; null where it does
 * not, or its second has not passed. The answer changes in the step its
 * reads set it (M-REC's `setAgain`).
 * @param {string} addr
 * @returns {{met: Refusal | null, since: number} | null}
 */
export function kept(addr) { return answerOf(keptDocs.get(addr)); }

/**
 * Do an origin's edition claims stand as held past KEPT_MS while they are
 * read again (`claimsAgain`; FP-23): as `kept` answers, the answer changing
 * in the step their read sets them (M-REC's `setClaims`).
 * @param {string} origin
 * @returns {{met: Refusal | null, since: number} | null}
 */
export function claimsKept(origin) { return answerOf(keptClaims.get(origin)); }

/**
 * Does the board lag past KEPT_MS (`standLag`; FP-23): as `kept` answers —
 * the stamp the stream's drop or the first bare row of a run left the page's
 * copy behind at, and the refusal the last read toward making it whole met;
 * null where it does not lag, or its second has not passed. The answer
 * changes in the step the catch-up's rows are taken or the refresh has set
 * what is shown (`lagEnds`).
 * @returns {{met: Refusal | null, since: number} | null}
 */
export function boardKept() { return answerOf(keptBoard.get(BOARD)); }

/** every document and every origin's claims `kept` and `claimsKept` answer for now, and whether `boardKept` does */
export const keptAll = () => ({ docs: [...keptDocs].filter(([, k]) => k.long).map(([a]) => a), origins: [...keptClaims].filter(([, k]) => k.long).map(([o]) => o), board: boardKept() !== null });

/** the stamps of the places held as they stand whose second has not passed (`Kept.since`): each is to say so at its second, unless its reads set it first */
export const keptSoon = () => new Set([...keptDocs.values(), ...keptClaims.values(), ...keptBoard.values()].filter((k) => !k.long).map((k) => k.since));

/**
 * How a place held as it stood was last set by its reads (FP-23): whether
 * they changed what it shows (M-REC's `Outcome`), and the stamp it stood
 * from (`Kept.since`) — a document's, by its address; an origin's edition
 * claims, by the origin; the board's, by its own address. Null where nothing
 * set it — it was dropped as the view left it, its reads were ended by a
 * change of the page's class or a start, or it is held again — or it was
 * never held.
 * @param {KeptKind} kind
 * @param {string} key
 * @returns {{since: number, outcome: Outcome} | null}
 */
export function liftOf(kind, key) { return lifts.get(kind + ' ' + key) ?? null; }

/** the changes of what `kept`, `claimsKept` and `boardKept` answer, counted */
export const keptRevision = () => keptRev;

/**
 * The board lags from `since` (`Kept`; FP-23): the stream dropped, or a bare
 * row marked the board (M-REC's `markBare`) — the board the smallest place
 * the page knows its copy may be behind in. Where it lags already, its first
 * stamp stands.
 * @param {number} since
 */
function standLag(since) { if (!keptBoard.has(BOARD)) boardFound = null; standKept(keptBoard, BOARD, since); }

/** a read toward making the lagging board whole met a refusal that leaves it lagging: what `boardKept` answers says why */
function lagMet(/** @type {Refusal | null} */ met) { if (met) keptMet(keptBoard, BOARD, met); }

/** a read toward making the lagging board whole landed: what it found joins what the others found — changed, once one found a change */
function lagFound(/** @type {Outcome} */ found) { if (keptBoard.has(BOARD) && boardFound !== 'changed') boardFound = found; }

/**
 * The board's lag ended where nothing it waits on stands: no gap (`gap`), no
 * bare row's mark, and no refresh armed or out — the catch-up's rows taken,
 * or the refresh has set what is shown — set by what the reads that made it
 * whole found (`lagFound`, `liftOf`), where they found anything.
 */
function lagEnds() {
  if (gap || REC.bare() || armed != null || refreshing) return;
  lifted(keptBoard, BOARD, unkeep(keptBoard, BOARD), boardFound);
  boardFound = null;
}

/**
 * @typedef {Object} Dropped — what one of the board's events dropped of what the page held, told after the drop, so a reader of it reads fresh: a feed row's addresses, a refresh's, what a change of the page's class left — its session's death among them (`classChanged`) — or the documents whose byline owner facts taken anew decide (`bylineTaken`)
 * @property {FeedUpdate | null} row the feed row, its `op` among it — `null` where the journal could not name it (wire.md §The change feed); null for a refresh, a change of class, a clause decided anew and owner facts taken anew
 * @property {string[] | null} addrs the addresses the row touched, each once — the documents it names, the trunk of a member among them, the home of the link it names with the home's trunk (M-REC's `applyFeedUpdate`), every one dropped but those the view keeps, which are read again (`readAgain`) — or those a refresh dropped or kept as held, each read again but one that waits on the window's writing (`waitsOnWriting`); or, its `row` null, the documents windowing an origin whose clause may be decided anew — its edition claims set again or dropped, a claim's home dropped by a row or read again — or a document its read again set after the board kept that read waiting, which a reader read in the wait as it stood, or the held documents an owner whose facts were taken anew owns (`byline`); null for a change of class, which reaches every record: each one M-REC kept read again, every other dropped, a box among them owed its read
 * @property {Map<string, Chain>} [chains] a refresh's alone (`refresh`): the chain of each edition it counted, by its trunk — what a reading scene's pane at a bare address is pinned by
 * @property {string} [byline] owner facts taken anew alone (`bylineTaken`): the account whose facts say other than those held before, which decide the bylines of the documents it names; nothing of those documents dropped
 * @property {number} at the page's clock at the row or drop that left behind what it names: a row's arrival, the stream's drop for a row its catch-up read, the first bare row of a refresh's run, the change of class, the read or the row that brought owner facts — what a reader keeping what it shows as it stands says ⟨when⟩ of (`Kept.since`)
 */

/** the model is subscribed to the port's events: a start made again hands in its readers alone */
let subscribed = false;

/**
 * Start the pump: subscribe the model to the port's events, every board
 * event through `onBoard`, to the sessions the calls name as they cross the
 * port (B-PORT's `onSession`) and to the event stream's own notices
 * (B-PORT's `onStream`) — once, however often it starts, so each event is
 * taken once, under the readers the latest start handed in. A start ends
 * every refresh and read again a start before it left out (`classes`), what
 * they held as it stood with them (`unkeepAll`) and the board's lag, lets go
 * of the rows held, the gap and the faces kept, and forgets the positions the
 * catch-ups read.
 * @param {{onDirty: () => void, shown?: (addr: string) => string, onPublish?: (member: string, at: number | null, newest: number | null) => void, onDrop?: (d: Dropped) => void, stands?: () => string[], readings?: () => Array<{addr: string, at: number}>, onCounted?: (trunk: string, memberAt: (at: number) => string | null, newest: number) => void, onOpen?: () => void, finding?: () => (string | null)}} opts `shown` the version each box shows, which the view reads; `onPublish` told of each trunk member `D.k+1` a `publish` row names, with the row's position, before the row drops what the page held of `D`, and of each a refresh finds past the member a text is, with none and the chain's count as the newest member known; `onDrop` told of what each row the page takes, and every change of its class, dropped, after the drop, and of the documents whose byline owner facts taken anew decide; `stands` the places the view's state names beside the view — the trail's entries — which a change of the page's class reads again with the documents in view; `readings` what the trail's entries the reader has left read, each by its document and the position its text was read at, and `onCounted` told of each chain a refresh counts for them or for a text it holds, with the chain's count, before any arrival it finds (`refresh`); `onOpen` told once a board the list read again found is open (`retryBoards`); `finding` the text an open find searches (N-FIND's `searched`), which the view keeps as it keeps the documents it shows
 */
export function start(opts) {
  dirty = opts.onDirty;
  shown = opts.shown || plain;
  onPublish = opts.onPublish || (() => {});
  onDrop = opts.onDrop || (() => {});
  stands = opts.stands || (() => []);
  readings = opts.readings || (() => []);
  onCounted = opts.onCounted || (() => {});
  onOpen = opts.onOpen || (() => {});
  finding = opts.finding || (() => null);
  standing = new Set(); halved.clear(); typingRows.clear(); ownDocs.clear();
  classes++; again.clear(); claimsOut.clear(); unkeepAll(); unkeep(keptBoard, BOARD); lifts.clear(); boardFound = null;
  rowsHeld = null; caught = null; gap = null; faces.clear(); ownAt.clear();
  started = true;
  if (subscribed) return;
  subscribed = true;
  onBoard('feed', (ev) => { if (ev.update) takeRow(ev.update); });
  PORT.onStream((n) => { if (n === 'dropped') streamDropped(); else streamReopened(); dirty(); });
  onBoard('index', (ev) => {
    if (!ev.state) return;
    if (ofFace(ev)) { REC.setIndexState(ev.state); for (const m of whileOut) m.state = true; dirty(); }
    else if (ev.session != null && attempt && attempt.lost != null && !attempt.answered) faces.set(ev.session, ev.state);
  });
  onBoard('mode', (ev) => { REC.setMode(ev); for (const m of whileOut) m.mode = ev; dirty(); });
  onBoard('daemon', (ev) => {
    REC.setDaemon(ev.state, ev.reason ?? null); for (const m of whileOut) m.daemon = true;
    if (answering(ev.state)) { unreached.clear(); for (const wake of [...waking]) wake(); if (attempt && !attempt.made) void make(attempt); }
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

/** does the page take a feed row: a published row always, a `drafts` row where it names the page's own session */
const takesRow = (/** @type {FeedUpdate} */ u) => { const s = REC.session(); return u.class !== 'drafts' || (!!s && u.session === s.session); };

/**
 * A feed row as the feed hands it, stamped with the page's clock as it
 * comes: held while an acquire for a lost session is out or a gap stands
 * (`rowsHeld`), with whether the page takes it under the session it holds as
 * the row comes, to be taken as they end (`drain`); else left where it
 * stands at a position a catch-up read (`caught`), which took it, or where
 * the page does not take it (`takesRow`); else taken (`applyRow`). The gate's
 * door hands it a row as the feed would (`model.feed`).
 * @param {FeedUpdate} u
 */
export function takeRow(u) {
  const at = Date.now();
  if (rowsHeld) { rowsHeld.push({ u, taken: takesRow(u), at }); return; }
  if (caught && u.position > caught.since && u.position <= caught.next) return;
  if (takesRow(u)) applyRow(u, at);
}

/**
 * A feed row the page takes: the member a
 * `publish` names arriving first, at the row's position (`arrive`), while the
 * page still holds the trunk's text; then the row laid into M-REC's index and
 * invalidation — each document it touches that the view keeps, the view's
 * with the box pins the
 * arrival took and the homes of the edition claims on the origins those
 * window (`keptNow`), kept as held from `at` and read again (`readAgain`),
 * every other dropped; where it touches a doc 1, the byline cause of each
 * owner of a document the view shows kept as held, owed its read again
 * (M-REC's `causeOwed`), every other dropped — every read out of the board's
 * state given it, and the view's answers for each address dropped forgotten,
 * so the view asks them again;
 * then what it touched told to `onDrop`, after the drop, so a reader reading
 * again reads fresh — a whole read of a document read again reading what its
 * reads set (`wholeOf`) — and, where it dropped a claim's home, the documents
 * windowing the origins it claims; then the origins whose edition claims it
 * changed read from it (`searchClaims`); and, while a row naming nothing has
 * the board marked, the board lagging from `at` where it lags from no earlier
 * row or drop (`standLag`), the refresh armed again (`arm`), the run not yet
 * in.
 * A draft the page holds dialed words of that the board has not acked
 * (M-REC's `writing`) is kept as it stands and not read: its acks read it
 * (`wrote`). A draft whose burst stands open, typed and not dialed (M-REC's
 * `typing`), is kept as it stands too, its read again owed to the burst's
 * commit (`readOwed`). A document the row touches at a position the window's
 * own write was acked at (`ownAt`) is read again as that act's feedback.
 * @param {FeedUpdate} u
 * @param {number} at the page's clock at the row or drop that left behind what it names: its arrival, or the stream's drop for a row a catch-up read (`drain`)
 * @param {boolean} [raiseFeed] false where M-PUMP's drafts read applies a drafts entry (D6): `draftsAt` is raised, not `feedAt`
 */
function applyRow(u, at, raiseFeed = true) {
  if (u.op === 'publish') for (const named of Array.isArray(u.docs) ? u.docs : []) if (isTrunkMember(named)) arrive(named, u.position);
  const shown = shownNow(), keep = new Set([...keptNow(shown), ...REC.writingDocs(), ...REC.typingDocs()]);
  const touched = REC.applyFeedUpdate(u, keep, new Set(shown.map((a) => REC.ownerAccount(REC.doc(a)))), raiseFeed);
  for (const m of whileOut) m.rows.push(u);
  for (const addr of touched) {
    // a draft holding dialed words the board has not acked is not read again, nor one being typed in, save at the window's own ack: that act's feedback (FP-23)
    const own = ownAck(addr, u.position);
    if (REC.writing(addr) || (!own && waitsOnWriting(addr, at))) continue;
    if (keep.has(addr)) readAgain(addr, at, null, own); else forget(addr);
  }
  onDrop({ row: u, addrs: touched, at });
  decidedAnew(REC.originsClaimedIn(touched.filter((a) => !keep.has(a))), at);
  if (touched.length) void searchClaims(u, at);
  if (REC.bare()) { standLag(at); arm(RUN_QUIET_MS); }
  dirty();
}

/** the documents the view shows: those in view (`visibleDocs`) — each box's document, and the version it shows — nearer than far scale, where the view reads; and the text an open find searches, at any scale (`finding`) */
const shownNow = () => {
  if (!started) return [];
  const f = finding(), out = lodOf(cam.scale).name !== 'far' ? visibleDocs().map((d) => d.addr) : [];
  return f && !out.includes(f) ? [...out, f] : out;
};

/** the origins the withheld runs of the documents the view shows name (`shownNow`): their edition claims are kept as held while a change of them is read (`claimsAgain`) */
const originsShown = () => new Set(shownNow().flatMap((a) => REC.withheldOrigins(a)));

/**
 * What a feed row keeps as held, reading it again (`readAgain`): the
 * documents the view shows (`shownNow`), the homes of the edition claims
 * held on the origins their withheld runs name, whose publication and owner
 * decide the clause there (PUB-5.99; T-ARTICLE's `editionClause`), and each
 * draft the window's own writes were told of while the page holds its text
 * (`ownDocs`; FP-23, FP-38).
 * @param {string[]} [shown] the documents the view shows, where the caller has read them
 * @returns {string[]}
 */
function keptNow(shown = shownNow()) {
  const origins = new Set(shown.flatMap((a) => REC.withheldOrigins(a)));
  const homes = [...origins].flatMap((o) => { const c = REC.editionClaimsOf(o); return Array.isArray(c) ? c.map((x) => homeOf(x) || x) : []; });
  return [...new Set([...shown, ...homes, ...ownHeld()])];
}

/** @type {Set<string>} the drafts the window's own writes were told of (`wrote`): each kept as the view's while the page holds its text, wherever the plane places it, so the reads its acks ask set it and neither a row nor a refresh drops what the person is writing in */
const ownDocs = new Set();

/** the drafts the window's own writes were told of whose text the page holds (`ownDocs`): what a row or a refresh keeps of them */
const ownHeld = () => [...ownDocs].filter((a) => REC.has(a) && REC.doc(a).from >= 0);

/**
 * The documents windowing these origins told that the clause on each may be
 * decided anew (`onDrop`, its `row` null): a reading scene's pane showing one
 * reads it again; nothing where none is held.
 * @param {ReadonlySet<string>} origins
 * @param {number} at the page's clock at the row or drop that left the clause behind (`Dropped.at`)
 */
function decidedAnew(origins, at) {
  const docs = REC.windowing(origins);
  if (docs.length) onDrop({ row: null, addrs: docs, at });
}

/**
 * A document the view keeps that a feed row named, one a change of the
 * page's class kept (`classChanged`), or one a refresh's read left unset
 * (`refresh`), read again (FP-23):
 * what the page holds of it stands as held while its reads are out — the view
 * asks nothing of it meanwhile (`pump`) — and is set in one step as they land
 * (M-REC's `setAgain`), the view's answers for it then forgotten, so it asks
 * again what the document holds none of; where it is the home of an edition
 * claim, the documents windowing the origins it claims told after
 * (`decidedAnew`). Its edition claims are not among its reads: which origins'
 * claims the row changed is read from the row (`searchClaims`). A row naming
 * it while they are out counts its drop (M-REC's `dropsOf`), and a refresh
 * reaching it marks it (`Again.more`): either queues one more read — the
 * reads out land setting nothing and are made again where the view still
 * keeps it (`keptNow`), else it is dropped as a row drops a document out of
 * view, to be read when it is shown (`dropUnshown`). Where the board did not
 * answer one of the reads, nothing is set — the document is set from its
 * reads' answers alone, all of them — and the reads are made again once
 * UNREACHED_MS has passed or as the board answers again (`answering`) where the view still
 * keeps it, else it is dropped so; one a refresh's read left unset, the board
 * not answering a part of it, waits out that pause before its first read. A
 * change of the page's class ends them, the reads at the new class making the
 * page whole. A row naming the
 * document while its reads are out joins them. While they are out it stands
 * held as it is (`Kept`) from `since`: `kept` answers for it once KEPT_MS has
 * passed, with the refusal that left the last of its reads unset, until the
 * step that sets it or lets it go. Set after the board kept a read of it
 * waiting, its readers are told again (`onDrop`, its `row` null), for one that
 * read it meanwhile read what stood; its owner's byline facts set with it that
 * say other than those held are told after (`bylineTaken`).
 * Read as the feedback of the window's own write (`feedback`; FP-23), it is
 * not held as kept — no clause says it is as last read, and no word says how
 * it was set — unless a row that is news names it meanwhile. While the page
 * holds dialed words of it the board has not acked (M-REC's `writing`), no
 * read of it goes out — its reads wait for the acks, as they wait out a pause
 * (`Again.paused`) — and one out as the words were dialed lands across a drop
 * and sets nothing.
 * @param {string} addr
 * @param {number} since the page's clock at the row or drop that left it behind (`Kept.since`): a row's, a refresh's run's, the change of class
 * @param {Refusal | null} [met] the refusal a read of it already met that left it unset — a refresh's, the board not answering a part of it — so its reads wait out the pause first
 * @param {boolean} [feedback] the read is the window's own write's feedback, said nowhere as news
 */
function readAgain(addr, since, met = null, feedback = false) {
  if (again.has(addr)) { if (!feedback) standKept(keptDocs, addr, since); return; }
  /** @type {() => void} */
  let land = () => {};
  /** @type {Again} */
  const a = { more: false, paused: false, landed: new Promise((/** @type {(v: void) => void} */ r) => { land = r; }) };
  again.set(addr, a);
  if (!feedback) standKept(keptDocs, addr, since);
  const cls = classes, ended = () => classes !== cls;
  /** the board kept one of its reads waiting (`Again.paused`), so a whole read of it in the pause read what stood (`readAgainFirst`) */
  let waited = false;
  void (async () => {
    try {
      /** @type {Refusal | null} the refusal that left the last read unset, whose pause the next read waits out */
      let unheard = met;
      for (;;) {
        if (unheard) {
          keptMet(keptDocs, addr, unheard);
          a.paused = true; waited = true;
          await afterPause(() => { a.paused = false; });
          if (ended()) return;
          if (!keptNow().includes(addr)) { dropUnshown(addr, since); return; }
          unheard = null;
        }
        if (REC.writing(addr)) {
          a.paused = true;
          await REC.written(addr);
          a.paused = false;
          if (ended()) return;
        }
        a.more = false;
        const gone = watchDrops(addr), causes = REC.keyDrops();
        const r = await readFresh(addr, new Map(), new Map());
        if (ended()) return;
        const landed = land;
        a.landed = new Promise((/** @type {(v: void) => void} */ res) => { land = res; });
        if (gone() || a.more) {
          landed();
          if (keptNow().includes(addr)) continue;
          dropUnshown(addr, since);
          return;
        }
        if (!r.unheard) {
          if (r.fresh.byline && 'cause' in r.fresh.byline.facts && REC.keyDrops() !== causes) delete r.fresh.byline;
          const owner = r.fresh.byline ? r.fresh.byline.account : null, was = owner ? REC.accountKey(owner) : undefined;
          const stood = unkeep(keptDocs, addr);
          lifted(keptDocs, addr, stood, REC.setAgain(addr, r.fresh));
          forget(addr);
          landed();
          if (waited) onDrop({ row: null, addrs: [addr], at: since });
          decidedAnew(REC.originsClaimedIn([addr]), since);
          if (owner) bylineTaken(owner, was, since);
          return;
        }
        landed();
        unheard = r.unheard;
      }
    } finally {
      if (again.get(addr) === a) { again.delete(addr); unkeep(keptDocs, addr); }
      land();
      dirty();
    }
  })();
}

/** a document read again (`readAgain`) that the view does not keep now, its reads ended unset: dropped as a row drops a document out of view, its answers forgotten, so the view reads it when it is shown — and, where it is the home of an edition claim, the documents windowing the origins it claims told (`decidedAnew`), from the row or drop that left it behind */
const dropUnshown = (/** @type {string} */ addr, /** @type {number} */ since) => { REC.invalidate(addr); forget(addr); decidedAnew(REC.originsClaimedIn([addr]), since); };

/** was the window's own write on a document acked at a position (`wrote`)? */
const ownAck = (/** @type {string} */ addr, /** @type {number} */ position) => (ownAt.get(addr) || []).includes(position);

/**
 * The window's own writes on a document acked (see the head; W-MACHINE's;
 * FP-23): the positions kept (`ownAt`), so a feed row at one is read as that
 * act's feedback; and, once the page holds no dialed word of the document the
 * board has not acked (M-REC's `writing`), what the page holds of it read
 * again as a row naming it would read it — held as it stands and set in one
 * step where the view keeps it (`readAgain`), as feedback, a draft the page
 * holds the text of kept from now on wherever the plane places it
 * (`ownDocs`); else dropped, to be read when it is shown. Nothing is read
 * before the pump starts.
 * @param {string} addr
 * @param {readonly number[]} ats the positions the board acked the writes at
 */
export function wrote(addr, ats) {
  if (ats.length) ownAt.set(addr, [...(ownAt.get(addr) || []), ...ats].slice(-OWN_KEPT));
  ownDocs.add(addr);
  if (!started || REC.writing(addr)) return;
  if (keptNow().includes(addr)) readAgain(addr, Date.now(), null, true);
  else { REC.invalidate(addr); forget(addr); }
  dirty();
}

/** @type {Map<string, number>} the drafts a row named, or a refresh kept, while their burst stood open, typed and not dialed (M-REC's `typing`), each with the page's clock at the first row or drop that left it behind: read again at the burst's commit (`readOwed`) */
const typingRows = new Map();

/** does a draft owe a read again a row or a refresh asked for while it was being typed in (`readOwed`)? */
export const owesRead = (/** @type {string} */ addr) => typingRows.has(addr);

/**
 * Does a draft wait on the window's writing before it is read again (FP-23;
 * D6 BM-56) — a row's read again of it (`applyRow`) and a refresh's
 * (`refresh`) alike: where the page holds dialed words of it the board has
 * not acked (M-REC's `writing`), its acks' read reads it (`wrote`); where its
 * burst stands open (M-REC's `typing`), its read again is owed to the burst's
 * commit (`readOwed`) from `since`, or from the row or drop it was owed from
 * first.
 * @param {string} addr
 * @param {number} since the page's clock at the row or drop that left it behind (`Kept.since`)
 * @returns {boolean}
 */
function waitsOnWriting(addr, since) {
  if (REC.writing(addr)) return true;
  if (!REC.typing(addr)) return false;
  if (!typingRows.has(addr)) typingRows.set(addr, since);
  return true;
}

/**
 * The read again a draft owes a row that named it, or a refresh that kept
 * it, while its burst stood open (`waitsOnWriting`; D6 BM-56; FP-23), made
 * now, as the burst is committed:
 * what the page holds of it read again and set in one step (`readAgain`),
 * settled once that read lands — at most DROP_ATTEMPTS of them, so a run of
 * rows never holds the burst. At once where it owes none, or the pump has not
 * started.
 * @param {string} addr
 * @returns {Promise<void>}
 */
export async function readOwed(addr) {
  const since = typingRows.get(addr);
  if (since == null) return;
  typingRows.delete(addr);
  if (!started) return;
  readAgain(addr, since);
  await readAgainFirst(addr);
}

/**
 * A whole read waits for the reads again of a document the view keeps
 * (`readAgain`) — at most DROP_ATTEMPTS of them land, so a run of rows never
 * holds the act it reads for — so it reads what they set;
 * at once where none are out, or they wait on the board.
 * @param {string} addr
 * @returns {Promise<void>}
 */
async function readAgainFirst(addr) {
  for (let i = 0; i < DROP_ATTEMPTS; i++) {
    const a = again.get(addr);
    if (!a || a.paused) return;
    await a.landed;
  }
}

/**
 * A newer member's arrival at its trunk (FP-22, FP-23): told
 * to the app with the position it was published at and the newest member
 * known (`onPublish`, N-GO's `arrived`), which pins the trunk's box on the
 * member its text is where the box shows its plain address and the page
 * holds that text, read before that position; where it did, that member
 * takes the trunk's text (M-REC's `takeAsMember`), so the box keeps it
 * standing and no read of it is made.
 * @param {string} member the trunk's newer member, `D.k+1`
 * @param {number | null} [at] the position a feed row published it at; null for a refresh's, whose `D.k` is the member the text was read as (`memberShown`)
 * @param {number | null} [newest] the newest member known, which may follow `member`: a refresh's chain's count; none for a feed row's, whose member is the newest it names
 */
function arrive(member, at = null, newest = null) {
  onPublish(member, at, newest);
  const trunk = documentOf(member), k = memberOf(member);
  if (!trunk || k == null || k < 2) return;
  const read = versionAddress(trunk, k - 1);
  if (shown(trunk) === read) REC.takeAsMember(trunk, read);
}

/**
 * The refresh armed for the board a bare row marked: made
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
 * session of no account; every other page reads its own session's face, the
 * event naming the page's session.
 * @param {IndexEvent} ev
 * @returns {boolean}
 */
function ofFace(ev) {
  const s = REC.session();
  return s && s.account != null ? ev.session === s.session : ev.session == null;
}

/**
 * A session's end — `session-died`, a read's `session_died`, which carries
 * the event's reason, or the page's own close (`CLOSED`) — taken where it
 * names the page's own session. The shell's own restart is no death
 * (client.md §4b.2): where its reason names the session the shell
 * re-opened, the page goes on under that reference, the principal and the
 * account the same, with no face; where it names none, the session is lost
 * (`lose`). Every other end is M-REC's death (`sessionDied`), the page's
 * class changing with it (`classChanged`). Either settles an acquire out for
 * the session, its answer then stale, and takes the rows it held once the
 * page goes on (`drain`): the shell's re-open keeps the principal's place on
 * the feed, and a death's reads at the new class make the page whole.
 * @param {string} ended the session the end names
 * @param {DeathReason} reason
 */
function takeEnd(ended, reason) {
  const s = REC.session();
  if (!s || s.session !== ended) return;
  const reopened = reason.arm === 'restart' && reason.reopened === true && typeof reason.session === 'string' ? reason.session : null;
  if (reason.arm === 'restart' && reopened == null) { lose(ended); return; }
  const out = attempt && attempt.lost === ended ? attempt : null;
  if (out) out.settle();
  if (reopened != null) REC.setSession({ ...s, session: reopened });
  else { const stood = stoodOn(); REC.sessionDied(reason, stood); classChanged(stood); }
  if (out) drain(null, out);
}

/**
 * A call answered as from a session the shell does not hold (B-PORT's
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
 * The page's own session lost without the person's act: the
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
 * The acquire (FP-28): the page's session opened by the
 * boot's own call, `session(board)` — the one routine boot and a session
 * lost share; boot calls it, and awaits it before its other reads.
 * @returns {Promise<void>} settled as the attempt settles
 */
export function acquireSession() { return attempt ? attempt.settled : begin(null); }

/**
 * One attempt begun: its call made at once where the board
 * answers as far as the page knows, else as the board answers again (`answering`); for a
 * session lost, every feed row held from now until its catch-up lands
 * (`rowsHeld`) — those held for an attempt it takes the place of kept — and
 * the line made to read that the page is reconnecting where its call is
 * still unanswered past RECONNECTING_MS.
 * @param {string | null} lost the lost session's reference; null at boot
 * @returns {Promise<void>} settled as it settles
 */
function begin(lost) {
  let resolve = () => {};
  const settled = new Promise((/** @type {(v: void) => void} */ r) => { resolve = r; });
  /** @type {Attempt} */
  const a = {
    lost, at: Date.now(), made: false, answered: false, settled,
    settle: () => { if (timer) clearTimeout(timer); if (attempt === a) { attempt = null; faces.clear(); } resolve(); },
  };
  const timer = lost == null ? null : setTimeout(() => { if (attempt === a && !a.answered) REC.setReconnecting(); }, RECONNECTING_MS);
  attempt = a;
  if (lost != null && !rowsHeld) rowsHeld = [];
  if (answers()) void make(a);
  return settled;
}

/** is a state the shell says of a board (M-REC's `DaemonState`) one the board answers reads in: every state but `stopped` and `unreachable` — a board halted, or whose head record will not read, reads on */
const answering = (/** @type {import('./records.js').DaemonState} */ state) => state !== 'stopped' && state !== 'unreachable';

/** does the page's board answer, as far as the page knows: no `daemon` event, nor the boot's probe, says it stopped or unreachable? */
const answers = () => { const d = REC.daemon(); return d == null || answering(d); };

/**
 * An attempt's one call, `session(board)`, and its answer taken: at boot,
 * the session opened or the refusal met; for a session lost,
 * the session taken in its place (M-REC's `sessionRegained`) — the class
 * changed where it acts as another principal, else the face kept for it
 * taken (`takeFace`) — and what was written while it was out caught up
 * (`catchUp`), or the refusal taken (M-REC's `sessionLost`), the class
 * changed and the index read again as a guest, the rows held taken at that
 * class (`drain`); then the attempt settled, which the reads waiting on the
 * session wait for (`atClass`). An answer that lands after the attempt
 * settled is stale and taken nowhere, a session it opened closed.
 * @param {Attempt} a
 */
async function make(a) {
  a.made = true;
  const b = REC.board();
  const out = b ? await PORT.session({ board: b.board }) : null;
  if (attempt !== a) { if (out && 'result' in out) void PORT.close({ session: out.result.session }); return; }
  a.answered = true;
  if (a.lost == null) {
    if (out && 'result' in out) REC.setSession(out.result);
    else if (out) REC.setSessionRefused({ kind: out.refused.kind, name: out.refused.name });
  } else if (out && 'result' in out) {
    const stood = stoodOn();
    const other = REC.sessionRegained(out.result, stood);
    if (other) classChanged(stood); else takeFace(out.result.session);
    await catchUp(a, out.result.session, !other);
  } else {
    if (out) { const stood = stoodOn(); REC.sessionLost({ kind: out.refused.kind, name: out.refused.name }, stood); classChanged(stood); }
    drain(null, a);
  }
  a.settle();
  dirty();
}

/**
 * The face of a session got back as the same principal, sent before the
 * call that opened it answered and kept (`faces`), set as the face's state
 * (M-REC's `setIndexState`) — no listing is read for it — and every face
 * kept let go.
 * @param {string} ref the session got back
 */
function takeFace(ref) {
  const state = faces.get(ref);
  faces.clear();
  if (state) REC.setIndexState(state);
}

/**
 * The catch-up (FP-28, FP-23): what was written on the page's board while
 * its session was out, read under the session got back from the last
 * position the page took there (M-REC's `feedAt`; `readChanges`) and taken
 * with the rows held since the loss (`drain`), before the attempt settles,
 * every row it reads stamped with the stream's drop where a gap stands, else
 * with the loss. Where none can be done — no position held, `changes`
 * refused, or a page that does not move past where it began — the rows held
 * are taken alone and the board marked as a row naming nothing marks it
 * (`markBehind`). Where the page's class changes while it is out, the rows
 * held are taken at the new class and none of its pages, whose class the
 * page has left; the reads that change makes leave the page whole. Where
 * another acquire takes the attempt's place, nothing is taken: the rows stay
 * held for that acquire, whose catch-up reads from the same position.
 * Where the session is got back as the same principal and `draftsAt` stands
 * (`drafts`; D6), the drafts rows a mid-tick end cut off are read FIRST —
 * `changes(session, since: draftsAt, class: 'drafts')`, paged as the catch-up
 * pages, each entry applied with `draftsAt` raised but `feedAt` left and
 * `caught` untouched, so no published row arriving in its window is masked —
 * and a refusal of it marks the board as the published catch-up's own does
 * and does not block the catch-up after it. A regain with a re-open
 * (`takeEnd`) makes no drafts read, nor one got back as another principal
 * (`drafts` false): its `draftsAt` stands.
 * @param {Attempt} a the acquire the session was got back by
 * @param {string} ref the session got back
 * @param {boolean} drafts the regain is with no re-open and as the same principal: the drafts read is made where `draftsAt` stands
 */
async function catchUp(a, ref, drafts) {
  const cls = classes, at = gap ? gap.at : a.at;
  const d0 = REC.draftsAt();
  if (drafts && d0 != null) {
    const read = await readChanges(ref, d0, () => attempt !== a || classes !== cls, 'drafts');
    if (attempt !== a) return;
    if (classes !== cls || !read) { drain(null, a); return; }
    if ('met' in read) markBehind(read.met, at);
    else for (const u of read.entries) applyRow(u, at, false);
  }
  const since = REC.feedAt();
  const read = since == null ? { met: null } : await readChanges(ref, since, () => attempt !== a || classes !== cls);
  if (attempt !== a) return;
  if (classes !== cls || !read) { drain(null, a); return; }
  if ('met' in read) { drain(null, a); markBehind(read.met, at); }
  else drain({ ...read, at }, a);
}

/**
 * @typedef {Object} CaughtUp — what a catch-up read of the board's rows after a position (`readChanges`)
 * @property {number} since the position it read from
 * @property {number} next the position it read through: it read `(since, next]`
 * @property {FeedUpdate[]} entries the rows there, as `changes` answered them at the page's class
 */

/**
 * What was written on the page's board after a position, read by `changes`:
 * page after page, each from the one before's `next`, until one reaches its
 * `head`. Under a session (`ref` a reference): a page refused as from a
 * session the shell re-opened meanwhile asked again under the re-opened one;
 * with `cls` the drafts form, the drafts page alone (D6). In the guest form
 * (`ref` null), token-free over the page's board (`{guest: true, board}`; the
 * published feed alone) — a refusal is `met`, no session to re-ask under.
 * @param {string | null} ref the session it is read under, or null for the guest form
 * @param {number} since
 * @param {() => boolean} ended read as each page lands: the read is let go where it holds
 * @param {'drafts' | null} [cls] the drafts form of the session read, the drafts supplement's page alone
 * @returns {Promise<CaughtUp | {met: Refusal | null} | null>} the rows read; `met` where none can be done — the refusal `changes` met, null where a page did not move past where it began; null where it was let go
 */
async function readChanges(ref, since, ended, cls = null) {
  const board = ref == null ? REC.board()?.board : undefined;
  /** @type {FeedUpdate[]} */
  const entries = [];
  for (let from = since; ;) {
    const out = await PORT.changes(ref == null ? { guest: /** @type {const} */ (true), board, since: from } : cls ? { session: ref, since: from, class: cls } : { session: ref, since: from });
    if (ended()) return null;
    if ('refused' in out) {
      if (ref == null) return { met: out.refused };
      const now = REC.session();
      if (!PORT.lostSession(out.refused) || !now || now.session === ref) return { met: out.refused };
      ref = now.session;
      continue;
    }
    entries.push(...out.result.entries);
    if (out.result.next >= out.result.head) return { since, next: out.result.next, entries };
    if (out.result.next > from) from = out.result.next;
    else return { met: null };
  }
}

/**
 * No catch-up can be done of what the board wrote while the page could not
 * hear it (FP-23): the board marked as a row naming nothing marks it (M-REC's
 * `markBare`), the refresh armed (`arm`), the board lagging from `at` until
 * the refresh has run (`standLag`), and why where a refusal told (`lagMet`).
 * @param {Refusal | null} met
 * @param {number} at the page's clock at the drop or the loss that left the page behind
 */
function markBehind(met, at) { REC.markBare(); standLag(at); lagMet(met); arm(RUN_QUIET_MS); }

/**
 * The rows held taken (FP-23), with the rows a catch-up read where it
 * landed: each row once, in position order — a row held at a position a
 * catch-up read left for the catch-up's — and each as the feed hands one
 * (`applyRow`), stamped with the page's clock as it came, every row the
 * catch-up read with the read's stamp: every row the catch-up read, read
 * under the page's own session at its class, and a row held where the page
 * took it under the session it held as the row came or takes it under the
 * session it holds now (`takesRow`). The positions the catch-up read are kept
 * (`caught`), joined to those the catch-up before it read where they meet,
 * and the page's place on the feed raised through them (M-REC's `reachFeed`).
 * The rows the feed brings after are held still where a gap stands or an
 * acquire out for a lost session other than `releasing` holds them; else
 * nothing is held.
 * @param {(CaughtUp & {at: number}) | null} read the catch-up's, and the page's clock at the drop or the loss that left behind what it read; null where none landed
 * @param {Attempt | null} releasing the acquire whose rows these are, which holds them no longer
 */
function drain(read, releasing) {
  const rows = rowsHeld ?? [];
  rowsHeld = gap || (attempt && attempt.lost != null && attempt !== releasing) ? [] : null;
  if (read) caught = caught && caught.next >= read.since && read.next >= caught.since ? { since: Math.min(caught.since, read.since), next: Math.max(caught.next, read.next) } : { since: read.since, next: read.next };
  const c = caught, within = (/** @type {number} */ p) => !!c && p > c.since && p <= c.next;
  // a drafts row at or before `draftsAt` the regain's drafts read already took (D6): board positions only grow, so this masks no later row
  const d = REC.draftsAt(), tookDraft = (/** @type {FeedUpdate} */ u) => u.class === 'drafts' && d != null && u.position <= d;
  /** @type {HeldRow[]} */
  const take = [...(read ? read.entries.map((u) => ({ u, taken: true, at: read.at })) : []), ...rows.filter((h) => !within(h.u.position))].filter((h) => !tookDraft(h.u));
  for (const h of take.sort((x, y) => x.u.position - y.u.position)) if (h.taken || takesRow(h.u)) { applyRow(h.u, h.at); lagFound('changed'); }
  if (read) REC.reachFeed(read.next);
}

// ---- the stream's gap --------------------------------------------------------------

/**
 * The event stream dropped (B-PORT's `StreamNotice`; FP-23): every row the
 * feed brings held from now (`rowsHeld`) until the gap's catch-up lands
 * (`closeGap`), and the board lagging from now (`standLag`). A drop while a
 * gap stands holds the gap until the next reopen, its stamp the first
 * drop's.
 */
function streamDropped() {
  if (gap) { gap.open = false; return; }
  gap = { at: Date.now(), open: false, out: false, again: false };
  if (!rowsHeld) rowsHeld = [];
  standLag(gap.at);
}

/** the event stream reopened after a drop (B-PORT's `StreamNotice`): the gap's catch-up made (`closeGap`); nothing where no drop stands */
function streamReopened() {
  if (!gap) return;
  gap.open = true;
  void closeGap(gap);
}

/**
 * The gap's catch-up (FP-23, FP-28), once no acquire is out — an acquire's
 * own catch-up reads from the same position first: what was written on the
 * board after the page's last position (M-REC's `feedAt`), read under the
 * page's session (`readChanges`) and taken with the rows held, each once and
 * in position order (`drain`), every row it reads stamped with the drop. The
 * gap closes as it lands, its hold let go and the board's lag ended where
 * nothing else holds it (`lagEnds`); where the stream dropped again before it
 * landed, what it read is taken and the gap stands for the next reopen's
 * catch-up, and where the stream dropped and reopened meanwhile, one more is
 * made from the position it reached. A read refused as from a session the
 * shell does not hold is made again once the acquire the refusal began has
 * settled. Where none can be done — no session, no position held, `changes`
 * refused — the gap closes, the rows held taken alone and the board marked
 * (`markBehind`). A change of the page's class while it is out takes nothing
 * it read (`classChanged`).
 * @param {Gap} g
 */
async function closeGap(g) {
  if (g.out) { g.again = true; return; }
  g.out = true;
  try {
    for (;;) {
      g.again = false;
      await noAcquire();
      if (gap !== g || !g.open) return;
      const cls = classes, s = REC.session(), since = REC.feedAt();
      const read = since == null ? { met: null } : await readChanges(s ? s.session : null, since, () => gap !== g || classes !== cls);
      if (gap !== g) return;
      if (!read || classes !== cls) continue;
      if ('met' in read) {
        if (attempt) continue;
        gap = null; drain(null, null); markBehind(read.met, g.at);
        return;
      }
      const last = g.open && !g.again;
      if (last) gap = null;
      drain({ ...read, at: g.at }, null);
      lagFound('unchanged');
      if (last) { lagEnds(); return; }
      if (!g.open) return;
    }
  } finally { g.out = false; }
}

/**
 * What follows M-REC's change of the page's class — a death, a session lost
 * and not regained, or one regained as another principal — which kept what
 * the class it left read as published and left every other box it knew owed
 * its read at the new class (M-REC's `dropClass`): every need answered or
 * held asked again, every
 * read of the board's state out left holding no feed row and no `index`
 * state taken before the change — so a listing out across it, asked again at
 * the new class (`atClass`), lays none of the class it left over the new
 * one's — every feed row held taken from then on only where the page takes
 * it at the new class (`HeldRow.taken`), the index read again at the class
 * the page reads at now
 * (`readIndex`), each document the view stood on that M-REC kept read again
 * at that class and set in one step as its reads land (`readAgain`), kept
 * from the change, the other places it stood on asked again at that class
 * (`reread`), and the change told to `onDrop`, so what a reader holds apart
 * from the model — a reading scene's pane — is set again from what the change
 * left and read again at that class too; a refresh armed or out, every read
 * again of a document a feed row named (`readAgain`) or of the edition claims
 * a row changed (`claimsAgain`), what they held as it stood (`unkeepAll`),
 * every search of what a row changed of them (`searchClaims`), and a gap the
 * stream stands open again over (`closeGap`) — its rows held taken, or left
 * to the acquire out for them — ended, and the board's lag with them where
 * no gap stands (`lagEnds`), the reads at the new class making it whole; a
 * gap the stream has not reopened over stands, its rows held.
 * @param {string[]} stood the places the view stood on as the change was taken, before anything went (`stoodOn`)
 */
function classChanged(stood) {
  const at = Date.now();
  classes++;
  if (armed != null) { clearTimeout(armed); armed = null; }
  asked.clear(); retryAt.clear(); unreached.clear(); typingRows.clear(); ownDocs.clear();
  again.clear(); claimsOut.clear(); unkeepAll(); for (const wake of [...waking]) wake();
  for (const m of whileOut) { m.rows = []; m.state = false; }
  if (rowsHeld) for (const h of rowsHeld) h.taken = false;
  // the stream open again: the reads at the new class, made after its reopen, make the page whole — the rows held taken now, or by the acquire out for them
  if (gap && gap.open) { gap = null; if (!(attempt && attempt.lost != null)) drain(null, null); }
  // the board's lag let go unset: the reads at the new class make it whole, not those it waited on
  boardFound = null;
  lagEnds();
  standing = new Set(stood);
  void readIndex();
  for (const addr of stood) if (keptAtChange(addr)) readAgain(addr, at);
  onDrop({ row: null, addrs: null, at });
}

/** did a change of the page's class keep a document (M-REC's `dropClass`): it holds what it was read for, and no refusal — every other document it dropped, a box among them owed its read */
function keptAtChange(/** @type {string} */ addr) {
  const d = REC.has(addr) ? REC.doc(addr) : null;
  return !!d && !d.refused && (d.from >= 0 || !!d.meta || d.extent != null);
}

/**
 * The places the view stands on: the documents in view —
 * nearer than far scale, where the view reads — and the documents the view's
 * state names beside them (`stands`), each once. Taken as a change of the
 * page's class is taken, before anything goes.
 * @returns {string[]}
 */
function stoodOn() {
  return [...new Set([...shownNow(), ...stands().filter((a) => kindOf(a) === 'document')])];
}

/**
 * The places the view stood on as the page's class last changed, asked again
 * at the page's current class: each one's extent
 * (`retrieve_doc_v_span_set`), in view first and nearest the view's centre,
 * a refusal held of the document as any view's read's is (`refuseDoc`), an
 * answer lifting the cover or the wait the change left it (M-REC's
 * `takeSpanSet`). A place
 * answered for leaves the set (`pending`); one the board did not answer
 * stands held until its pause ends.
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
    if (need('s:' + addr, F.retrieveDocVSpanSet(addr), (a) => REC.takeSpanSet(addr, F.decodeSpanSet(a), F.asOf(a)), addr, (r) => refuseDoc(d, r))) missing++;
  }
  return missing;
}

/**
 * Is a place the view stood on still to be answered for at the page's class
 * (`reread`): no read of its extent answered or refused since the change; and
 * a box the change left owed that read (M-REC's `owed`), else no extent
 * read, no refusal held and no listing by the index the page reads at now,
 * which that class reads as it reads every place it lists.
 * @param {string} addr
 * @returns {boolean}
 */
function pending(addr) {
  if (asked.has('s:' + addr)) return false;
  if (REC.owed(addr)) return true;
  const d = REC.has(addr) ? REC.doc(addr) : null;
  return !REC.place(addr) && (!d || (d.extent == null && !d.refused));
}

/**
 * Are the reads a change of the page's class asked still out:
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
 * is handed), once no acquire is out — the one out settled, its catch-up
 * taken, and any that took its place.
 * It is made again, in the form the page takes then, where the page's class
 * — its principal, or guest — changed while it was out, so no answer to a
 * class the page has left is handed up: a death, or a session not regained,
 * taken meanwhile asks it again as a guest. It is made again too where it
 * met the end of the session it went out under — the port having told the
 * end to the acquire, whose attempt it then awaits — and the end left the
 * page another, the one the shell re-opened or the acquire opened in its
 * place, the class the same; so no refusal of a session the shell does not
 * hold is handed up. Each time again follows the page's session or its
 * class changing, which only a restart, a death or an attempt does.
 * @template {object} T
 * @param {(s: {session: string} | null) => Promise<T | {refused: Refusal}>} call
 * @returns {Promise<T | {refused: Refusal}>}
 */
async function atClass(call) {
  if (attempt) await noAcquire();
  let s = REC.session();
  let out = await call(s);
  for (;;) {
    const r = 'refused' in out ? /** @type {{refused: Refusal}} */ (out).refused : null;
    const ended = !!s && !!r && PORT.lostSession(r);
    if (attempt) await noAcquire();
    const now = REC.session();
    if (classOf(now) === classOf(s) && !(ended && !!now && now.session !== s?.session)) return out;
    s = now;
    out = await call(s);
  }
}

/** settled once no acquire is out: the one out, its catch-up taken, and any that took its place */
async function noAcquire() { while (attempt) await attempt.settled; }

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
 * The board opened (FP-35):
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
 * The list read again at the reader's "try again", where it was refused:
 * opened as the boot opened it (`openBoard`), one read out at a
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
 * The client index read at the page's class: `places` under the
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
  return overtaken(() => PORT.probe({}), (out, m) => { if ('result' in out && !m.daemon) REC.setDaemon(out.result.daemon, out.result.reason ?? null); });
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
export const unanswered = (/** @type {{kind: string}} */ r) => r.kind === 'unreachable';

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
 * (`compare`): its pairs, the read asked in parts where the board refuses it
 * for its size (FP-21) — the operand its refusal
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
 * A document's V→I image over a region (`image`), asked in parts where the
 * board refuses it for its size (`image_too_large`: the region's runs past
 * M8's budget; FP-21): the region halved, each half
 * asked on its own, their runs taken in the text's order, at most
 * SPLIT_READS reads in all. Any other refusal is handed up; so is a size
 * refusal past that bound, or of a single position. Every refusal met is
 * recorded once: as it is met; or, with `o.unrecorded`, the one handed up
 * left for the caller to record by its own rule (`need`'s), and each size
 * refusal halved and gone past recorded as the read ends.
 * @param {string} addr
 * @param {number} pos the region's first position
 * @param {number} width its positions
 * @param {{unrecorded?: boolean}} [o]
 * @returns {Promise<{runs: Array<{iStart: string, width: number}>} | {refused: Refusal}>}
 */
export async function imageParts(addr, pos, width, o = {}) {
  /** @type {Array<{iStart: string, width: number}>} */
  const runs = [];
  /** @type {Operand[]} */
  const todo = [{ doc: addr, pos, width }];
  /** @type {Refusal[]} the size refusals met, each halved, in the order met: the last of them the one handed up past the bound */
  const split = [];
  const record = (/** @type {Refusal} */ r) => { refusals.push({ frame: 'image', refusal: r, addr }); };
  /** the read's end, handing up `up`'s refusal — an index into `split`, or none: with `o.unrecorded`, every size refusal halved but the one handed up recorded */
  const end = (/** @type {{runs: Array<{iStart: string, width: number}>} | {refused: Refusal}} */ out, up = -1) => {
    if (o.unrecorded) split.forEach((r, i) => { if (i !== up) record(r); });
    return out;
  };
  for (let reads = 0; todo.length; reads++) {
    if (reads >= SPLIT_READS && split.length) return end({ refused: split[split.length - 1] }, split.length - 1);
    const p = /** @type {Operand} */ (todo.shift());
    const out = await read(F.image(addr, p.pos, p.width));
    if (!('refused' in out)) { runs.push(...F.decodeRuns(out.answer)); continue; }
    if (!o.unrecorded) record(out.refused);
    if (!sized(out.refused) || p.width < 2) return end({ refused: out.refused });
    split.push(out.refused);
    todo.unshift(...halves(p));
  }
  return end({ runs });
}

/**
 * A stretch of a document's text (`retrieve_v`) read in parts (FP-21): parts
 * of at most MAX_DELIVERY_ITEMS positions (`partsOf`), so no delivery passes
 * the board's item bound, each part the board refuses for its size
 * (`too_many_items`: its run-list walk priced past the budget) halved, each
 * half asked on its own, the parts' runs taken in the text's order — at most
 * SPLIT_READS reads past the first size refusal. Any other refusal is handed
 * up; so is a size refusal past that bound, or of a single position. Every
 * refusal met is recorded. With `o.image`, each part's V→I image over the
 * same positions is asked at once with its text (`imageParts`), a halved
 * part's halves each with its own. Each part is told to `part` as it lands —
 * with its image, where one was asked and answered — and no part is asked
 * once `stop` answers true. The text's `as_of` is the earliest its parts were
 * answered at, none where a part said none.
 * @param {string} addr
 * @param {number} pos the stretch's first position
 * @param {number} width its positions
 * @param {{part?: (runs: import('./frames.js').Run[], asOf: number | null, image: ImageRead | null) => void, stop?: () => boolean, image?: boolean}} [o]
 * @returns {Promise<{runs: import('./frames.js').Run[], asOf: number | null} | {refused: Refusal} | null>} null where `stop` ended it
 */
export async function textParts(addr, pos, width, o = {}) {
  /** @type {import('./frames.js').Run[]} */
  const runs = [];
  /** @type {Array<number | null>} */
  const asOfs = [];
  /** @type {Operand[]} */
  const todo = partsOf({ doc: addr, pos, width });
  /** @type {Refusal | null} the last size refusal met: the one handed up past the bound */
  let last = null;
  for (let past = 0; todo.length; ) {
    if (o.stop && o.stop()) return null;
    if (last && past >= SPLIT_READS) return { refused: last };
    const p = /** @type {Operand} */ (todo.shift());
    const [out, im] = await Promise.all([read(F.retrieveV(addr, p.pos, p.width)), o.image ? imageParts(addr, p.pos, p.width) : null]);
    if (last) past++;
    if (!('refused' in out)) {
      const got = F.decodeDelivery(out.answer, p.pos), at = F.asOf(out.answer);
      runs.push(...got); asOfs.push(at);
      if (o.part) o.part(got, at, im && 'runs' in im ? { from: p.pos, runs: im.runs } : null);
      continue;
    }
    refusals.push({ frame: 'retrieve_v', refusal: out.refused, addr });
    if (!sized(out.refused) || p.width < 2) return { refused: out.refused };
    last = out.refused;
    todo.unshift(...halves(p));
  }
  const asOf = asOfs.length && asOfs.every((a) => a != null) ? Math.min(.../** @type {number[]} */ (asOfs)) : null;
  return { runs, asOf };
}

/** a stretch of text cut into the parts one delivery holds: consecutive stretches of at most MAX_DELIVERY_ITEMS positions, in the text's order */
function partsOf(/** @type {Operand} */ o) {
  /** @type {Operand[]} */
  const out = [];
  for (let p = o.pos; p < o.pos + o.width; p += F.MAX_DELIVERY_ITEMS) out.push({ ...o, pos: p, width: Math.min(F.MAX_DELIVERY_ITEMS, o.pos + o.width - p) });
  return out;
}

/**
 * @typedef {Object} PartRead — a part of a document's text as `withImage` answered it
 * @property {unknown} text the part's `retrieve_v` answer
 * @property {Array<{iStart: string, width: number}> | null} image the runs of its V→I image over the part, in the text's
 * order; null where the image read failed — refused, unanswered, or still refused for its size past SPLIT_READS
 */

/**
 * A part of a document's text and its V→I image over the same positions,
 * asked at once — the text by its `retrieve_v`, the image in parts where the
 * board refuses it for its size (`imageParts`) — and answered once both are:
 * the text's refusal where it met one, else its answer with the image's runs,
 * which M-REC takes together in one step (`takeDelivery`; FP-27), the text
 * standing alone where the image read failed.
 * @param {object} frame the part's `retrieve_v`
 * @param {Operand} p the part
 * @returns {Promise<{answer: PartRead} | {refused: Refusal}>}
 */
async function withImage(frame, p) {
  const [text, image] = await Promise.all([read(frame), imageParts(p.doc, p.pos, p.width)]);
  return 'refused' in text ? text : { answer: { text: text.answer, image: 'runs' in image ? image.runs : null } };
}

/**
 * A stretch's V→I image asked in parts (`imageParts`) and answered as a need's
 * read is (`need`): its runs, or the refusal its parts handed up, left for the
 * need to record.
 * @param {Operand} p the stretch
 * @returns {Promise<{answer: Array<{iStart: string, width: number}>} | {refused: Refusal}>}
 */
async function imageOf(p) {
  const out = await imageParts(p.doc, p.pos, p.width, { unrecorded: true });
  return 'runs' in out ? { answer: out.runs } : out;
}

/**
 * Watch an address for a drop from now on, as a read of it goes out: the
 * watch reads true once what the page held of it has been dropped (M-REC's
 * `dropsOf`), and what the read learned is then of what the page does not
 * hold.
 * @param {string} addr
 * @returns {() => boolean} dropped since the watch began
 */
function watchDrops(addr) { const at = REC.dropsOf(addr); return () => REC.dropsOf(addr) !== at; }

/**
 * Watch the edition claims on an origin for a change from now on, as a
 * lookup of them goes out: a change a feed row made of them, a refresh's
 * drop, a change of class (M-REC's `claimDropsOf`).
 * @param {string} origin
 * @returns {() => boolean} changed since the watch began
 */
function watchClaims(origin) { const at = REC.claimDropsOf(origin); return () => REC.claimDropsOf(origin) !== at; }

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
 * answered once; a retry-class refusal (`scan_busy`, `history_busy`) reissued
 * after a pause;
 * a read the board did not answer held (`hold`) and asked again past its
 * pause or as the board answers again (`answering`), its refusal recorded and told to
 * `onRefused` once for the outage; any other refusal recorded, told to
 * `onRefused`, and not asked again until invalidated.
 * A read that lands after its document was dropped (`watchDrops`), or a
 * lookup after its origin's edition claims changed (`watchClaims`), frees its
 * slot and takes nothing — no answer, no refusal recorded, no hold, no retry
 * — its key left unasked, to be asked again as the view next needs it.
 * The read is `frame` asked at the page's class (`read`), or what `ask`
 * makes where one is given — a part of a text and its image, asked at once
 * and answered together (`withImage`), or an image asked in parts
 * (`imageOf`) — one key and one slot either way, its refusal recorded under
 * `frame`'s op.
 * Returns whether the need is still MISSING — pending or not yet issued; a
 * refused need is not missing, nor is a held one (nothing will arrive for
 * either).
 * @template [T=unknown]
 * @param {string} key
 * @param {object} frame
 * @param {(answer: T) => void} take
 * @param {string} addr the document the read is for — a projection's, the document projected into: its drop voids the read, and a refusal is recorded against it
 * @param {(r: Refusal) => void} [onRefused] told of each refusal the need keeps — one the board gave, or the board not answering (`unreachable`), whose read is asked again past its pause — never of a retry-class one
 * @param {(addr: string) => () => boolean} [watch] the drop that voids the read, watched from the moment it goes out: `addr`'s (`watchDrops`), or, `addr` an origin, a change of its edition claims (`watchClaims`)
 * @param {() => Promise<{answer: T} | {refused: Refusal}>} [ask] the read made in place of `frame`'s own
 * @returns {boolean} missing
 */
function need(key, frame, take, addr, onRefused, watch = watchDrops, ask = () => /** @type {Promise<{answer: T} | {refused: Refusal}>} */ (read(frame))) {
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
  ask().then((out) => {
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
 * the continuation the scale draws as one mark (P-LOD's `residueDepth`) — a
 * held one holding what a read brought, a `withheld` refusal, or its read
 * owed at the page's class (M-REC's `owed`), each a box M-REC knows (`known`)
 * — each box's document, and beside it the version its box shows where that is
 * another, whether the model holds that version's text or a
 * drop has emptied it; a version the box does not show none. The mark draws
 * its members' count and its newest's label from the index, which no read
 * brings, and the band fades its depth-k boxes in below every size a read
 * serves; a member is read whole where a jump or the walk's camera frames it
 * (`loadWhole`), and never as the walk steps among the mark's members.
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
    if ((d.from >= 0 || d.meta || d.extent != null || d.refused === 'withheld' || REC.owed(d.addr)) && intersects(docBox(d.addr), v)) take(d);
  }
  return out;
}

/**
 * The span window a document's columns in view need (FP-12): the place
 * of every column is read from every line before it, so its text from
 * position 1 through one estimated column past the last one in view (P-LAY's
 * `estimate`, every line full: never more columns than its text sets, so its
 * positions reach at least as far as the columns in view hold) — through its
 * end where the view stands over its room past the estimate's columns —
 * within WHOLE_CAP; past it, the estimated columns in view alone, which
 * T-LAYER lays out from their estimated column — where the corner stands at
 * its document's head, whose band stands every column lower than the estimate
 * sets it, those meeting the view raised by HEAD_ROWS of its rows (P-CAM's
 * `fit`, P-LAY's `Fold.band`); rounded to SPAN_BLOCK; every column at the
 * measure in force (P-CAM's `measure`), which T-LAYER sets it at.
 * @param {Doc} d
 * @returns {[number, number] | null} [first position, one past the last]
 */
export function spanWindow(d) {
  const extent = d.extent || 0; if (!extent) return null;
  const cpl = measure(), box = docBox(d.addr), f = estimate(extent, box, cpl);
  const v = viewportWorld(0);
  if (!intersects(box, v)) return null;
  let lo = Infinity, hi = -1;
  const band = fit().head ? HEAD_ROWS * LINE_H * f.fs : 0;
  f.columns.forEach((c, i) => {
    const x = box.x + c.x, y = box.y + c.y;
    if (x + c.w >= v.x0 && x <= v.x1 && y + c.h >= v.y0 - band && y <= v.y1) { lo = Math.min(lo, i); hi = Math.max(hi, i); }
  });
  const end = hi < 0 ? extent + 1 : Math.min(extent + 1, estimatedSpan(hi + 1, cpl)[1]);
  const up = (/** @type {number} */ n) => Math.min(extent + 1, Math.ceil((n - 1) / SPAN_BLOCK) * SPAN_BLOCK + 1);
  if (end <= WHOLE_CAP + 1 || hi < 0) return [1, Math.max(up(Math.min(end, WHOLE_CAP + 1)), Math.min(extent + 1, 1 + SPAN_BLOCK))];
  const from = Math.max(1, Math.floor((estimatedSpan(lo, cpl)[0] - 1) / SPAN_BLOCK) * SPAN_BLOCK + 1);
  return [from, up(end)];
}

/** @type {Set<string>} the view's text reads the board refused for their size (`too_many_items`), by their keys: each asked again as its two halves (`halvedOf`) */
const halved = new Set();

/**
 * The parts of a text window the view asks (`pump`), each one the board
 * refused for its size (`halved`) asked as its two halves, theirs so too, at
 * most SPLIT_READS parts in all (FP-21).
 * @param {Operand[]} parts
 * @returns {Operand[]}
 */
function halvedOf(parts) {
  /** @type {Operand[]} */
  const out = [];
  const todo = [...parts];
  while (todo.length) {
    const p = /** @type {Operand} */ (todo.shift());
    if (p.width >= 2 && out.length + todo.length + 2 <= SPLIT_READS && halved.has('r:' + p.doc + ':' + p.pos + ':' + (p.pos + p.width))) todo.unshift(...halves(p));
    else out.push(p);
  }
  return out;
}

/** do a document's delivered runs hold every position of [from, to)? */
function holdsSpan(/** @type {Doc} */ d, /** @type {number} */ from, /** @type {number} */ to) {
  let at = from;
  for (const r of d.runs) { if (r.pos <= at && at < r.pos + r.width) at = r.pos + r.width; if (at >= to) return true; }
  return at >= to;
}

/**
 * The image the view asks of a document's held text (`pump`): each stretch of
 * the positions its delivered runs hold that its held image places nothing of
 * (M-REC's `imageGaps`), in the text's order, cut into parts of at most
 * MAX_DELIVERY_ITEMS positions (`partsOf`), the parts its text is read in;
 * none over positions it holds no text of.
 * @param {Doc} d
 * @returns {Operand[]}
 */
function imageLacked(d) {
  /** @type {Array<{pos: number, width: number}>} the stretches its runs hold, joined where they meet */
  const held = [];
  for (const r of d.runs) {
    const last = held[held.length - 1];
    if (last && last.pos + last.width === r.pos) last.width += r.width; else held.push({ pos: r.pos, width: r.width });
  }
  return held.flatMap((s) => REC.imageGaps(d.image, s.pos, s.width)).flatMap((g) => partsOf({ doc: d.addr, pos: g.pos, width: g.width }));
}

/**
 * The reads the view needs now, issued within the budget — none while the
 * index is read (`readIndex`), which counts as a need missing; the places the
 * view stood on as the page's class last changed first (`reread`), at any
 * scale; a refresh armed or out (`refresh`), each search of what a row
 * changed of the edition claims (`searchClaims`), each read again of them
 * not waiting on the board (`claimsAgain`), the rows held while the call
 * of an acquire for a lost session or its catch-up is out (`rowsHeld`), and
 * the gap's catch-up while it is out (`closeGap`) — never while the stream
 * stands dropped, for nothing comes then — counted missing, and a document
 * while its reads again are out (`readAgain`),
 * nothing asked of it meanwhile; nothing asked of a document a refusal is
 * held of, save a box owed its read at the page's class (M-REC's `owed`), whose extent is
 * asked, nearer than far scale alone. Returns the count
 * of needs still missing — the gate's settle signal with `inflight()`.
 * @returns {number}
 */
export function pump() {
  if (!started) return 0;
  if (indexing) return 1;
  const lod = lodOf(cam.scale);
  let missing = reread() + (armed != null || refreshing ? 1 : 0) + searching + (rowsHeld && attempt && attempt.made ? 1 : 0) + (gap && gap.out ? 1 : 0);
  for (const a of claimsOut.values()) if (!a.paused) missing++;
  if (lod.name === 'far') return missing;
  const vis = visibleDocs();
  // nearest the centre first
  const cx = cam.x, cy = cam.y;
  vis.sort((a, b) => { const ba = docBox(a.addr), bb = docBox(b.addr); return Math.hypot(ba.x + ba.w / 2 - cx, ba.y + ba.h / 2 - cy) - Math.hypot(bb.x + bb.w / 2 - cx, bb.y + bb.h / 2 - cy); });
  const budgetDocs = vis.slice(0, 60);
  for (const d of budgetDocs) {
    // a document read again: nothing asked of it until its reads set it (`readAgain`)
    const out = again.get(d.addr);
    if (out) { if (!out.paused) missing++; continue; }
    // a draft the page holds dialed words of that the board has not acked: nothing asked of it until they are (`wrote`)
    if (REC.writing(d.addr)) continue;
    if (d.refused && !REC.owed(d.addr)) continue;
    const box = docBox(d.addr);
    const docPx = box.w * cam.scale;
    /** the version its box shows, read for its text and what it is placed through; else the box's document, read for what its box draws of it alone */
    const drawn = shown(d.addr) === d.addr;
    if (d.extent == null) {
      if (need('s:' + d.addr, F.retrieveDocVSpanSet(d.addr), (a) => REC.takeSpanSet(d.addr, F.decodeSpanSet(a), F.asOf(a)), d.addr, (r) => refuseDoc(d, r))) missing++;
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
        // joined to what is held where it meets it, where one delivery holds the whole; else the window's parts it lacks, each read alone
        const meets = d.from >= 0 && w[0] <= d.to && d.from <= w[1];
        const from = meets ? Math.min(d.from, w[0]) : w[0];
        const to = meets ? Math.max(d.to, w[1]) : w[1];
        const parts = to - from <= F.MAX_DELIVERY_ITEMS ? [{ doc: d.addr, pos: from, width: to - from }] : partsOf({ doc: d.addr, pos: w[0], width: w[1] - w[0] });
        for (const p of halvedOf(parts)) {
          if (parts.length > 1 && holdsSpan(d, p.pos, p.pos + p.width)) continue;
          const key = 'r:' + d.addr + ':' + p.pos + ':' + (p.pos + p.width), part = F.retrieveV(d.addr, p.pos, p.width);
          // the part's text and its image taken in one step, the text alone where the image read failed
          const take = (/** @type {PartRead} */ a) => REC.takeDelivery(d.addr, F.decodeDelivery(a.text, p.pos), F.asOf(a.text), a.image && { from: p.pos, runs: a.image });
          if (need(key, part, take, d.addr, (r) => { if (sized(r) && p.width >= 2) halved.add(key); else refuseDoc(d, r); }, watchDrops, () => withImage(part, p))) missing++;
        }
      }
      for (const g of imageLacked(d)) {
        // the image of held text its held image places nothing of — a part taken alone, its image read failing — asked in parts, placed from the stretch it was asked for: a text read widening the held text can land first
        if (need('i:' + d.addr + ':' + g.pos + ':' + (g.pos + g.width), F.image(d.addr, g.pos, g.width), (/** @type {Array<{iStart: string, width: number}>} */ runs) => REC.takeImage(d.addr, g.pos, runs), d.addr, undefined, watchDrops, () => imageOf(g))) missing++;
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
 * (PUB-5.124, PUB-5.99, PUB-7.50): none while its claims are read again
 * (`claimsAgain`), which reads them all — missing unless that read waits on
 * the board; else the active view's lookup of the edition claims on it
 * (M-FRAMES's `editionClaimsAt`) where the model holds no answer — none, or a
 * failed one — its key counting the changes of the origin's claims (M-REC's
 * `claimDropsOf`), so it is asked again after each and a lookup out across
 * one takes nothing (`watchClaims`), a refusal held by whether it was
 * withheld (`lookupRefused`); then, for each claim listed, the reads its
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
  const out = claimsOut.get(origin);
  if (out) return out.paused ? 0 : 1;
  const listed = REC.editionClaimsOf(origin);
  if (listed === undefined || listed === 'unread') {
    return need('e:' + REC.claimDropsOf(origin) + ':' + origin, F.editionClaimsAt(origin), (a) => REC.takeEditionClaims(origin, F.decodeAddrs(a)), origin, (r) => REC.takeEditionClaims(origin, lookupRefused(r)), watchClaims) ? 1 : 0;
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
 * first frame (O-FACES; FP-33).
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
 * claim homed there says its claims were not read (FP-33).
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
 * is says its claims were not read (FP-33).
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
 * pause or as the board answers again (`answering`); one its trunk was dropped under is left
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
 * reaches `cap` members or meets another refusal, each member's age it
 * answers kept (M-REC's `takeMemberAge`). The count is recorded
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
    const member = versionAddress(trunk, k);
    const out = await read(F.docMetadata(member));
    if ('refused' in out) {
      if (out.refused.kind === 'refused' && out.refused.name === 'doc_not_registered') ended = true;
      else met = out.refused;
      break;
    }
    const m = F.decodeDocMetadata(out.answer);
    if (m) REC.takeMemberAge(member, m.age);
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
 * reading scene's pane: the chain's end held, answered with
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
 * of it: the extent, every position with its V→I image — the two taken in one
 * step, the image read in parts where the board refuses it whole for its size
 * (`imageParts`), and read on its own for a text held whole that no held image
 * covers (`readWhole`) — the links and their types, and the edition claims on
 * each origin its withheld runs name (`readClaims`).
 * Each pass waits first for the reads again of a document the view keeps that
 * are not waiting on the board (`readAgainFirst`), so it reads what they set.
 * A pass the document was dropped under
 * (`readWhole`) is begun again, and reads again exactly what the drop took,
 * at most DROP_ATTEMPTS passes; past them, the record as it stands, holding
 * nothing read before its last drop.
 * @param {string} addr
 * @returns {Promise<Doc | null>} the record; null where the board refused its extent
 */
export async function loadWhole(addr) { return (await wholeOf(addr)).doc; }

/**
 * A whole read (`loadWhole`) with the refusal it met, which a landing that
 * cannot read its text says it could not tell what that text holds by
 * (FP-21): the extent's, where the board refused it,
 * the record then null; the text's, where the board refused that, the record
 * standing with what it held; none where both answered.
 * @param {string} addr
 * @returns {Promise<{doc: Doc | null, refused: Refusal | null}>}
 */
export async function wholeOf(addr) {
  for (let pass = 1; ; pass++) {
    await readAgainFirst(addr);
    const out = await readWhole(addr, watchDrops(addr));
    if (out !== 'dropped') return out;
    if (pass >= DROP_ATTEMPTS) { dirty(); return { doc: REC.doc(addr), refused: null }; }
  }
}

/**
 * The rest of a document's text, for an open find (N-FIND; B2-S5's one read
 * at open): its extent first where the record lacks it, then every stretch of
 * its positions the record's delivered runs lack, in the text's order, each
 * read in parts (`textParts`), each part's image asked with it, and each part
 * taken into the model with its image in one step as it lands — alone where
 * its image read failed (M-REC's `takeDelivery`; FP-6, FP-27) — and told to
 * `part`. Each pass waits first
 * for the reads again of a document the view keeps (`readAgainFirst`); a pass
 * the document was dropped under takes nothing more and is begun again, at
 * most DROP_ATTEMPTS passes. Never a read per keystroke: the find asks it
 * once as it opens, and again only where a drop took what it read.
 * @param {string} addr the version the find searches
 * @param {() => void} [part] told as each part is taken
 * @returns {Promise<{refused: Refusal | null}>} the refusal the extent or a part met, which the find says it searched only part by; none where every part landed, or the passes ran out
 */
export async function readRest(addr, part = () => {}) {
  for (let pass = 1; ; pass++) {
    await readAgainFirst(addr);
    const out = await restOf(addr, watchDrops(addr), part);
    if (out !== 'dropped') return out;
    if (pass >= DROP_ATTEMPTS) { dirty(); return { refused: null }; }
  }
}

/**
 * One pass of `readRest`.
 * @param {string} addr
 * @param {() => boolean} dropped the document dropped since the pass began
 * @param {() => void} part
 * @returns {Promise<{refused: Refusal | null} | 'dropped'>}
 */
async function restOf(addr, dropped, part) {
  const d = REC.doc(addr);
  if (d.extent == null) {
    const out = await read(F.retrieveDocVSpanSet(addr));
    if (dropped()) return 'dropped';
    if ('refused' in out) { refusals.push({ frame: 'retrieve_doc_v_span_set', refusal: out.refused, addr }); refuseDoc(d, out.refused); dirty(); return { refused: out.refused }; }
    REC.takeSpanSet(addr, F.decodeSpanSet(out.answer), F.asOf(out.answer));
  }
  for (const [from, to] of textLacked(REC.doc(addr))) {
    const out = await textParts(addr, from, to - from, { image: true, part: (runs, asOf, image) => { if (dropped()) return; REC.takeDelivery(addr, runs, asOf, image); part(); dirty(); }, stop: dropped });
    if (!out || dropped()) return 'dropped';
    if ('refused' in out) { refuseDoc(REC.doc(addr), out.refused); dirty(); return { refused: out.refused }; }
  }
  dirty();
  return { refused: null };
}

/**
 * The stretches of a document's positions its delivered runs lack, in the
 * text's order, each [first position, one past the last]: every position of
 * its extent where the record holds none.
 * @param {Doc} d
 * @returns {Array<[number, number]>}
 */
export function textLacked(d) {
  const end = (d.extent ?? 0) + 1;
  /** @type {Array<[number, number]>} */
  const out = [];
  let at = 1;
  for (const r of d.runs) {
    if (r.pos > at) out.push([at, Math.min(r.pos, end)]);
    at = Math.max(at, r.pos + r.width);
    if (at >= end) break;
  }
  if (at < end) out.push([at, end]);
  return out.filter(([a, b]) => b > a);
}

/**
 * One pass of a whole read (`loadWhole`), each step asked where the record
 * lacks what it brings: the extent; the metadata; the text with its image,
 * read at once and taken in one step (M-REC's `takeDelivery`; FP-27), the
 * text alone where the image read fails — or, the text held whole, its image
 * where no held image covers it; the links and their values; the edition
 * claims. Where the document is dropped while a step reads, the pass ends
 * there, taking nothing that step learned — an answer or a refusal alike.
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
    REC.takeSpanSet(addr, F.decodeSpanSet(out.answer), F.asOf(out.answer));
  }
  if (!d.meta) {
    const out = await read(F.docMetadata(addr));
    if (dropped()) return 'dropped';
    if (!('refused' in out)) { const m = F.decodeDocMetadata(out.answer); if (m) REC.takeMetadata(addr, m); }
  }
  const extent = d.extent || 0;
  const whole = Math.min(extent, WHOLE_CAP);
  if (whole > 0 && !(d.from === 1 && d.to >= whole + 1)) {
    // the text and its image read at once and taken in one step, the text alone where the image read failed
    const [text, im] = await Promise.all([textParts(addr, 1, whole), imageParts(addr, 1, whole)]);
    if (dropped()) return 'dropped';
    const out = /** @type {{runs: import('./frames.js').Run[], asOf: number | null} | {refused: Refusal}} */ (text);
    if ('refused' in out) { refuseDoc(d, out.refused); dirty(); return { doc: d, refused: out.refused }; }
    REC.takeDelivery(addr, out.runs, out.asOf, 'runs' in im ? { from: 1, runs: im.runs } : null);
  } else if (whole > 0 && !REC.identityIn(d.image, 1, whole).length) {
    // a text held whole that no held image covers: its image read
    const im = await imageParts(addr, 1, whole);
    if (dropped()) return 'dropped';
    if ('runs' in im) REC.takeImage(addr, 1, im.runs);
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
 * — as the view asks them (`needClaims`), once the read again of its claims a
 * row's change made, if one is out, has landed (`claimsAgainFirst`): each one
 * the page holds no answer to, a failed one asked again — the lookup of the
 * edition claims on it, taken where no change of them overtook it
 * (`watchClaims`); then the metadata of each listed claim's home, at once
 * (`readMetadata`), and the link of each claim whose home may be published
 * (`claimNeeds`), at once, each taken where its home was not dropped under it
 * (`watchDrops`). A refusal is held as the view holds it: the lookup's by
 * whether it was withheld (`lookupRefused`), a home's of the home
 * (`metaRefused`), a link's as failed (`linkRefused`) — the board not
 * answering, as failed.
 * @param {string} origin
 */
export async function readClaims(origin) {
  await claimsAgainFirst(origin);
  const held = REC.editionClaimsOf(origin);
  if (held === undefined || held === 'unread') {
    const dropped = watchClaims(origin);
    const out = await read(F.editionClaimsAt(origin));
    if (dropped()) return;
    REC.takeEditionClaims(origin, 'refused' in out ? lookupRefused(out.refused) : F.decodeAddrs(out.answer));
  }
  const listed = REC.editionClaimsOf(origin);
  const claims = Array.isArray(listed) ? listed : [];
  const homes = [...new Set(claims.filter((c) => claimNeeds(c).meta).map((c) => claimNeeds(c).home))];
  await Promise.all(homes.map(readMetadata));
  await Promise.all(claims.filter((c) => claimNeeds(c).link).map(async (c) => {
    const dropped = watchDrops(claimNeeds(c).home);
    const out = await read(F.readLink(c));
    if (dropped()) return;
    if ('refused' in out) linkRefused(c, out.refused);
    else { const v = F.decodeLinkValue(c, out.answer); if (v) REC.takeLink(v); }
  }));
}

/**
 * A document's metadata read for an act (`doc_metadata`) — a listed edition
 * claim's home (`readClaims`), the home of a link a card states — where the
 * page holds neither it nor a refusal of the document, a failed read of it
 * asked again: the answer taken (M-REC's `takeMetadata`), a refusal held as
 * the view holds it (`metaRefused`), and nothing taken — no record made —
 * where the document was dropped while the read was out (`watchDrops`).
 * Asked where the page holds its metadata or a refusal of it, it reads
 * nothing.
 * @param {string} addr
 * @returns {Promise<boolean>} whether what it read was taken — an answer, a refusal or a failure held; false where a drop overtook the read, so a caller waiting on its answer asks again
 */
export async function readMetadata(addr) {
  const d = REC.has(addr) ? REC.doc(addr) : null;
  if (d && (d.meta || d.refused)) return true;
  const dropped = watchDrops(addr);
  const out = await read(F.docMetadata(addr));
  if (dropped()) return false;
  if ('refused' in out) metaRefused(REC.doc(addr), out.refused);
  else { const m = F.decodeDocMetadata(out.answer); if (m) REC.takeMetadata(addr, m); }
  return true;
}

// ---- the refresh -----------------------------------------------------------------

/**
 * The refresh (FP-23): what the rows naming nothing marked the board for,
 * made once the run's rows are in (`arm`), or at once by the gate and the
 * tests. The mark taken (M-REC's
 * `unmarkBare`) — nothing where none stood or a refresh is out — then, a
 * change of the page's class ending it wherever it stands: (1) the chain of
 * every edition the page holds the text of at its bare address, and of every
 * one a trail entry the reader has left read there at a known position
 * (`readings`), counted once (`countChain`), down to the earliest position
 * those texts were read at, at most MAX_INFLIGHT at once; once every one is,
 * each chain told to `onCounted` with the member a text read at a position
 * was, where a newer member follows it (`mintedBy`), and its count, so each
 * entry re-takes the member its own text was before any arrival is taken;
 * then each edition held whose chain advanced past the member its text is
 * (`memberShown`) taking the arrival of that member's successor (`arrive`),
 * the chain's count the newest member known, its box pinned on the member,
 * which keeps the text — the box holding the view's centre last, so the
 * passage being read there is held across its move (T-LAYER's `holdAcross`) —
 * one whose member cannot be told, or whose box the app did not pin, left as
 * it stands; (2) what a row naming it would keep — what the view shows
 * (`shownNow`), with the pins taken, each draft the window writes in
 * (`ownHeld`) and each draft being typed in or holding dialed words (M-REC's
 * `typing`, `writing`) — kept with the members a text was handed to and the
 * editions left as they stand, and everything else dropped (M-REC's
 * `takeRefresh`), the view's answers for each forgotten, and the edition
 * claims held on the origins the shown documents window read again as a
 * change of them is (`claimsAgain`); (3) each of what a row would keep read
 * again (`readFresh`) — one being read again already (`readAgain`) by those
 * reads, once more; one that waits on the window's writing (`waitsOnWriting`)
 * read as a row's read of it is, as that ends — at most MAX_INFLIGHT at once,
 * and set in one step as its reads land (M-REC's `setAgain`) — none where
 * that writing begins while its reads are out, nor one a drop overtook
 * (`watchDrops`), which the view reads again, and its owner's byline cause
 * left out where a drop of the causes overtook it (M-REC's `keyDrops`) — its
 * answers forgotten so the
 * view asks again what it holds none of, each standing held as it is while
 * its reads are out (`Kept`), from the drop or the row that left the board
 * behind; one the board left a part of unheard sets nothing and is read
 * again as a row naming it is, its reads waiting out the pause first
 * (`readAgain`); (4) every reader told (`onDrop`), the chains counted beside.
 * A chain the board did not answer marks the board again, its lag saying why
 * (`lagMet`), the next refresh made once UNREACHED_MS has passed; a bare row
 * taken while it was out arms the next as it ends; else the board's lag ends
 * with it where no gap stands (`lagEnds`).
 * @returns {Promise<void>}
 */
export async function refresh() {
  if (armed != null) { clearTimeout(armed); armed = null; }
  if (refreshing || !REC.unmarkBare()) return;
  refreshing = true;
  const cls = classes, out = () => classes !== cls;
  /** the page's clock at the drop or the row that left the board behind: what each document it reads again stands kept from */
  const since = keptBoard.get(BOARD)?.since ?? Date.now();
  /** @type {Refusal | null} the refusal a chain the board did not answer met, left uncounted: the board marked again as the refresh ends, its lag saying why */
  let uncounted = null;
  try {
    /** @type {Map<string, Chain>} */
    const chains = new Map();
    /** @type {Set<string>} the editions left as they stand */
    const left = new Set();
    /** @type {Set<string>} the members an advanced edition's text was handed to */
    const handed = new Set();
    /** @type {Array<{doc: string, s: number, n: number}>} the editions whose chain advanced past the member their text is, `s`, to its count, `n` */
    const advanced = [];
    /** @type {Array<{trunk: string, c: Counted}>} each chain counted, by its trunk */
    const counted = [];
    /** the editions the page holds the text of at their bare address */
    const held = new Set(REC.docs().filter(atBare).map((d) => d.addr));
    /** @type {Map<string, number>} the earliest position a trail entry the reader has left read each edition's text at, at its bare address */
    const earliest = new Map();
    for (const r of readings()) {
      const d = REC.has(r.addr) ? REC.doc(r.addr) : null;
      if (d && edition(d)) earliest.set(r.addr, Math.min(r.at, earliest.get(r.addr) ?? Infinity));
    }
    await bounded([...new Set([...held, ...earliest.keys()])], async (addr) => {
      const d = REC.doc(addr), holds = held.has(addr);
      const below = Math.min(holds && d.readAt != null ? d.readAt : Infinity, earliest.get(addr) ?? Infinity);
      const c = await countChain(d, Number.isFinite(below) ? below : null);
      if ('met' in c) { if (unanswered(c.met)) uncounted = c.met; if (holds) left.add(addr); return; }
      counted.push({ trunk: addr, c });
      chains.set(addr, { n: c.n, ended: true, met: null });
      if (!holds) return;
      const s = memberShown(d, c);
      if (s == null) left.add(addr);
      else if (s >= 1 && c.n > s) advanced.push({ doc: addr, s, n: c.n });
    });
    if (out()) return;
    // every chain told before any arrival: each entry re-takes the member its own text was, never the one a text the page holds is
    for (const { trunk, c } of counted) onCounted(trunk, (at) => { const s = mintedBy(c, at); return s != null && s >= 1 && s < c.n ? versionAddress(trunk, s) : null; }, c.n);
    // the box holding the view's centre arrives last: the passage being read is held across its move (T-LAYER's `holdAcross`), which a later arrival would end
    const centre = (/** @type {string} */ doc) => { const b = docBox(doc); return b.x <= cam.x && cam.x <= b.x + b.w && b.y <= cam.y && cam.y <= b.y + b.h ? 1 : 0; };
    for (const { doc, s, n } of advanced.sort((a, b) => centre(a.doc) - centre(b.doc))) {
      const member = versionAddress(doc, s);
      arrive(versionAddress(doc, s + 1), null, n);
      if (shown(doc) === member) handed.add(member); else left.add(doc);
    }
    const showing = shownNow().filter((a) => !left.has(a));
    // what a row naming it would keep: what the view shows, each draft the window writes in, each that waits on the window's writing
    const kept = [...new Set([...showing, ...ownHeld(), ...REC.typingDocs(), ...REC.writingDocs()])];
    const dropped = REC.takeRefresh(new Set([...kept, ...handed, ...left]));
    for (const a of dropped) forget(a);
    // the edition claims held on the origins the shown documents window, read again as a change of them is
    for (const o of new Set(showing.flatMap((a) => REC.withheldOrigins(a)))) if (REC.editionClaimsOf(o) !== undefined) claimsAgain(o, since);
    /** @type {Map<string, Promise<AccountFacts>>} each owner's byline facts, read once for the refresh */
    const facts = new Map();
    /** what the refresh changed of what is shown: an edition advanced, or a shown document set again otherwise than it stood — what the lagging board's reads found (`lagFound`) */
    let changed = advanced.length > 0;
    // a draft that waits on the window's writing is read as that ends; a document being read again is read once more by its own reads, the run's changes among them
    const reads = kept.filter((a) => { if (waitsOnWriting(a, since)) return false; const x = again.get(a); if (x) x.more = true; return !x; });
    await bounded(reads, async (addr) => {
      if (out()) return;
      const gone = watchDrops(addr), causes = REC.keyDrops();
      standKept(keptDocs, addr, since);
      const r = await readFresh(addr, chains, facts);
      if (out()) return;
      // a drop overtook the read, or the window's writing began in it meanwhile: nothing set
      if (gone() || waitsOnWriting(addr, since)) { if (!again.has(addr)) unkeep(keptDocs, addr); return; }
      // a part the board did not answer: nothing set, the document read again until its reads set it whole
      if (r.unheard) { readAgain(addr, since, r.unheard); return; }
      const stood = unkeep(keptDocs, addr);
      if (r.fresh.byline && 'cause' in r.fresh.byline.facts && REC.keyDrops() !== causes) delete r.fresh.byline;
      const outcome = REC.setAgain(addr, r.fresh);
      lifted(keptDocs, addr, stood, outcome);
      if (outcome === 'changed') changed = true;
      forget(addr);
    });
    if (out()) return;
    lagFound(changed ? 'changed' : 'unchanged');
    onDrop({ row: null, addrs: [...dropped, ...kept], chains, at: since });
  } finally {
    refreshing = false;
    if (uncounted && !out()) { REC.markBare(); lagMet(uncounted); }
    if (REC.bare()) arm(uncounted ? UNREACHED_MS : RUN_QUIET_MS);
    lagEnds();
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

/** is a record an edition at its box's own address: a trunk, not the system account's, published — one whose chain a refresh counts where a text of it was read at its bare address (`atBare`, `readings`) */
const edition = (/** @type {Doc} */ d) => !d.system && plain(d.addr) === d.addr && (d.meta ? d.meta.published : d.kind === 'edition');

/** is a record an edition read at its bare address: an edition (`edition`) holding text, its box showing its plain address? */
const atBare = (/** @type {Doc} */ d) => d.from >= 0 && shown(d.addr) === d.addr && edition(d);

/** @typedef {{n: number, at: Map<number, number | null>}} Counted a chain counted to its end (`countChain`): its members `D.1 … D.n`, and the mint position of each member asked (M-FRAMES's `Age.at`), null where the board gave none */

/**
 * A chain counted for a refresh: each member's metadata asked
 * in turn to the end the board answers — `doc_not_registered` past the last —
 * from the end the record holds, read again, else the first; then, where the
 * first member asked was minted after `below`, the members below it, down to
 * one minted at or before it; each member's
 * mint position kept for the count (M-FRAMES's `Age.at`), and its age in the
 * model (M-REC's `takeMemberAge`). The refusal it stopped at
 * where a read met another, the board not answering among them.
 * @param {Doc} d
 * @param {number | null} below the earliest position a text whose member is wanted was read at (`memberShown`, `mintedBy`); null where none is
 * @returns {Promise<Counted | {met: Refusal}>}
 */
async function countChain(d, below) {
  /** @type {Map<number, number | null>} */
  const at = new Map();
  /** member `k` asked: 'member' where the board answers it, 'end' past the chain's end, else the refusal met */
  const ask = async (/** @type {number} */ k) => {
    const member = versionAddress(d.addr, k);
    const out = await read(F.docMetadata(member));
    if (!('refused' in out)) {
      const m = F.decodeDocMetadata(out.answer);
      at.set(k, m ? m.age.at : null);
      if (m) REC.takeMemberAge(member, m.age);
      return /** @type {const} */ ('member');
    }
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
  for (let k = from - 1; below != null && k >= 1 && (at.get(k + 1) ?? -Infinity) > below; k--) {
    const r = await ask(k);
    if (r === 'end') break;
    if (r !== 'member') return { met: r };
  }
  return { n, at };
}

/**
 * The member a text read at a position was (wire.md §Arrangement), among the
 * members a count asked: the newest the board says was minted at or before
 * that position — 0 where every one asked was minted after it; null where the
 * board gave one of them no mint position, or the count asked none.
 * @param {Counted} c
 * @param {number} at
 * @returns {number | null}
 */
function mintedBy(c, at) {
  const ats = [...c.at];
  if (!ats.length || !ats.every(([, a]) => a != null)) return null;
  return ats.reduce((s, [k, a]) => (a != null && a <= at && k > s ? k : s), 0);
}

/**
 * The member a bare address's text is: the one a text read at the position
 * it was read at (`Doc.readAt`) was (`mintedBy`); where the board gave a
 * member no mint position, or the text no position, the end of the chain the
 * record held where the board ended it there; null where neither names one.
 * @param {Doc} d
 * @param {Counted} c
 * @returns {number | null}
 */
function memberShown(d, c) {
  const s = d.readAt == null ? null : mintedBy(c, d.readAt);
  return s != null ? s : d.ended && d.members != null ? d.members : null;
}

/**
 * What reading a shown document again reads — a refresh's, or a feed row's
 * naming it (`readAgain`) — as the view reads it
 * (`pump`) — each part the record holds asked again: its extent — asked too
 * where a refusal is held of it, or its read is owed at the page's class
 * (M-REC's `owed`) — its metadata, its links — within the view's scan
 * permits, a scan the board kept
 * busy said unheard — and each one's value, and, where its box shows it, its
 * text over the window it holds, as many positions longer as the text grew —
 * from the first position where the text is now shorter than the window's
 * start — with its image there; where the slots
 * of the links touching it project, and where every link's slot projects into
 * it, a floating end's among them, each projection held (M-REC's
 * `projectionsOf`, `projectionsInto`); its owner's byline facts where a cause
 * is held, read once an account (`facts`); its chain from what the refresh
 * counted, else counted again. The edition claims on its withheld runs'
 * origins are not among them: a change of them is read apart, and they are
 * read again on their own (`claimsAgain`). A
 * part the board did not answer is left out, so it stands as held, and the
 * reads said unheard, by the first refusal that left a part so — the board
 * not answering, or a scan it kept busy; a read of the document refused as
 * withheld or not registered ends them, the refusal its fresh state.
 * @param {string} addr
 * @param {Map<string, Chain>} chains
 * @param {Map<string, Promise<AccountFacts>>} facts
 * @returns {Promise<{fresh: Fresh, unheard: Refusal | null}>}
 */
async function readFresh(addr, chains, facts) {
  const d = REC.doc(addr), drawn = shown(addr) === addr;
  /** @type {Fresh} */
  const f = {};
  /** @type {Refusal | null} */
  let unheard = null;
  /** a part left unheard: the first refusal that left one so is what the reads say */
  const unheardBy = (/** @type {Refusal} */ r) => { unheard = unheard || r; };
  /** the board's answer to a read, else null: the board not answering noted, and a read of the document itself (`own`) refused as withheld or not registered taken as its fresh state */
  const ask = async (/** @type {object} */ frame, own = false) => {
    const out = await read(frame);
    if (!('refused' in out)) return out.answer;
    if (unanswered(out.refused)) unheardBy(out.refused);
    else if (own && out.refused.name === 'withheld') f.refused = 'withheld';
    else if (own && out.refused.name === 'doc_not_registered') f.refused = 'unregistered';
    return null;
  };
  if (d.extent != null || d.refused || REC.owed(addr)) {
    const a = await ask(F.retrieveDocVSpanSet(addr), true);
    if (f.refused) return { fresh: f, unheard };
    if (a) { f.spans = F.decodeSpanSet(a); f.spansAt = F.asOf(a); }
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
    if ('refused' in out) { if (unanswered(out.refused) || out.refused.name === 'scan_busy') unheardBy(out.refused); }
    else {
      const links = F.decodeAddrs(out.answer);
      /** @type {LinkValue[]} */
      const values = [];
      await bounded(links, async (la) => { const a = await ask(F.readLink(la)); const v = a ? F.decodeLinkValue(la, a) : null; if (v) values.push(v); });
      f.links = links; f.values = values;
    }
  }
  if (drawn && d.from >= 0) {
    // the window held, from its first position, as many positions longer as the text grew, so a window to its end reaches the new end
    const grew = Math.max(0, extent - (d.extent ?? extent));
    const from = d.from <= extent ? d.from : 1, to = Math.min(extent + 1, from + d.to - d.from + grew);
    if (to > from) {
      // in parts, so a window past one delivery's items is read whole (`textParts`)
      const t = /** @type {{runs: import('./frames.js').Run[], asOf: number | null} | {refused: Refusal}} */ (await textParts(addr, from, to - from));
      if ('refused' in t) {
        if (unanswered(t.refused)) unheardBy(t.refused);
        else if (t.refused.name === 'withheld') { f.refused = 'withheld'; return { fresh: f, unheard }; }
        else if (t.refused.name === 'doc_not_registered') { f.refused = 'unregistered'; return { fresh: f, unheard }; }
      } else {
        f.text = { runs: t.runs, asOf: t.asOf };
        const im = await imageParts(addr, from, to - from);
        if ('runs' in im) f.image = { from, runs: im.runs };
        else if (unanswered(im.refused)) unheardBy(im.refused);
      }
    } else f.text = { runs: [], asOf: null };
  }
  /** @type {NonNullable<Fresh['projections']>} */
  const projections = [];
  const into = REC.projectionsInto(addr), key = (/** @type {{link: string, slot: number, addr: string}} */ p) => `${p.link} ${p.slot} ${p.addr}`;
  const projected = [...new Map([...REC.projectionsOf(new Set(f.links ?? d.links)), ...into].map((p) => [key(p), p])).values()];
  await bounded(projected, async (p) => {
    const out = await read(F.project(p.link, p.slot, p.addr));
    if (!('refused' in out)) projections.push({ ...p, runs: stretchesOf(out.answer).sort((x, y) => x.pos - y.pos) });
    else if (unanswered(out.refused)) unheardBy(out.refused);
    else if (out.refused.kind === 'refused') projections.push({ ...p, runs: declinedAs(out.refused) });
  });
  if (projections.length) f.projections = projections;
  const owner = drawn && d.from >= 0 ? REC.ownerAccount(d) : '', held = owner ? REC.accountKey(owner) : undefined;
  if (held && 'cause' in held) {
    let p = facts.get(owner);
    if (!p) { p = factsOf(owner); facts.set(owner, p); }
    const got = await p;
    if ('cause' in got && got.cause === 'unreachable') unheardBy(NOT_ANSWERED); else f.byline = { account: owner, facts: got };
  }
  const chain = d.members == null ? null : chains.get(addr) ?? null;
  if (chain) f.members = { n: chain.n, ended: true };
  else if (d.members != null) {
    const c = await countChain(d, null);
    if (!('met' in c)) f.members = { n: c.n, ended: true };
    else if (unanswered(c.met)) unheardBy(c.met);
  }
  return { fresh: f, unheard };
}

/** the board not answering, where a read says so by its cause and not by the refusal it met (`factsOf`'s `unreachable`) */
export const NOT_ANSWERED = /** @type {Refusal} */ ({ kind: 'unreachable', name: 'unreachable', text: '' });

/**
 * The edition claims on an origin as a read of them again reads them
 * (`claimsAgain`), as the view holds them: the count of the origin's claims'
 * changes as it goes out (M-REC's `claimDropsOf`), which M-REC's `setClaims`
 * holds it to; the lookup (M-FRAMES's `editionClaimsAt`), a refusal held by
 * whether it was withheld (`lookupRefused`); then each listed claim's home's
 * metadata — a refusal of it as withheld or not registered taken of the home,
 * any other, the board not answering among them, a failed read
 * (`metaRefused`) — and each claim's link, a refusal of it but `withheld` a
 * failed read (`linkRefused`). The refusal met where the board did not
 * answer the lookup: the claims held stand.
 * @param {string} origin
 * @returns {Promise<FreshClaims | {unheard: Refusal}>}
 */
async function claimsFresh(origin) {
  const at = REC.claimDropsOf(origin);
  const out = await read(F.editionClaimsAt(origin));
  if ('refused' in out && unanswered(out.refused)) return { unheard: out.refused };
  const lookup = 'refused' in out ? lookupRefused(out.refused) : F.decodeAddrs(out.answer);
  const listed = Array.isArray(lookup) ? lookup : [];
  /** @type {FreshClaims} */
  const c = { origin, at, lookup, values: [], homes: [], failed: [] };
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

// ---- the edition claims a row changed --------------------------------------------

/** the link writes a feed row names by their homes alone (wire.md §The change feed): a `publish` among them, which deposits edition claims and retractions in the homes it names; the edition-class links homed there are read (`claimsWritten`) */
const HOME_WRITES = new Set(['emit', 'edit_link', 'nullify', 'publish']);

/** does a link's end meet an origin — name it, a member of it or bytes of it, or name whole an address above it: the overlap the lookup of the claims on it matches by (M-FRAMES's `editionClaimsAt`) */
const meets = (/** @type {EndRef} */ e, /** @type {string} */ origin) => isUnder(origin, e.start) || (e.whole && isUnder(e.start, origin));

/**
 * The origins whose edition claims a feed row wrote, retracted or superseded
 * (PUB-5.124), of those a change can concern (M-REC's `claimOrigins`): where
 * the row names its link — a `make_link`'s, or the one link a bare row names
 * (wire.md §The change feed) — every origin its `to` meets where it is of the
 * edition class (R20), read (`read_link`) where the page holds none of it;
 * where the row is an `emit`, an `edit_link`, a `nullify` or a `publish`, or
 * names no op, each document it names read for the edition-class links homed
 * there (M-FRAMES's `editionLinksIn`), each one the page holds none of read:
 * every origin a link among them meets that the origin's held claims do not
 * list, and every origin listing a claim homed there that the answer does not
 * hold. None for any other row, an `assert_sup` among them: a supersession
 * changes nothing the active view's lookup lists. Nothing is read where no
 * origin can be concerned. Every origin a change can concern where one of
 * those reads is refused, or not answered, for then the page cannot tell;
 * none where the page's class changes while they are out.
 * Every link read is taken (M-REC's `takeLink`): a link's value never
 * changes.
 * @param {FeedUpdate} u
 * @returns {Promise<Set<string>>}
 */
async function claimsWritten(u) {
  const cls = classes, known = REC.claimOrigins();
  /** @type {Set<string>} */
  const out = new Set();
  if (!known.length) return out;
  /** a link as the page holds it, else as `read_link` answers it, taken; null where none resides there; undefined where the read was refused or the class changed */
  const valueOf = async (/** @type {string} */ addr) => {
    const held = REC.link(addr);
    if (held) return held;
    const got = await read(F.readLink(addr));
    if (classes !== cls || 'refused' in got) return undefined;
    const v = F.decodeLinkValue(addr, got.answer);
    if (v) REC.takeLink(v);
    return v;
  };
  /** the origins a link claims: those its `to` meets, where it is of the edition class */
  const claimed = (/** @type {{type: string | null, to: EndRef[]}} */ v) => (v.type && isUnder(F.EDITION_CLASS, v.type) ? known.filter((o) => v.to.some((e) => meets(e, o))) : []);
  /** every origin a change can concern, or none where the class changed */
  const any = () => new Set(classes === cls ? known : []);
  if (typeof u.link === 'string') {
    const v = await valueOf(u.link);
    if (v === undefined) return any();
    if (v) for (const o of claimed(v)) out.add(o);
  }
  if (u.op != null && !HOME_WRITES.has(u.op)) return out;
  for (const home of new Set(Array.isArray(u.docs) ? u.docs : [])) {
    const got = await read(F.editionLinksIn(home));
    if (classes !== cls || 'refused' in got) return any();
    const now = new Set(F.decodeAddrs(got.answer));
    for (const a of now) {
      const v = await valueOf(a);
      if (v === undefined) return any();
      if (v) for (const o of claimed(v)) { const c = REC.editionClaimsOf(o); if (!Array.isArray(c) || !c.includes(a)) out.add(o); }
    }
    for (const o of known) { const c = REC.editionClaimsOf(o); if (Array.isArray(c) && c.some((x) => homeOf(x) === home && !now.has(x))) out.add(o); }
  }
  return out;
}

/**
 * What a feed row changed of the edition claims (see the head; PUB-5.124),
 * taken: the origins whose claims it wrote, retracted or superseded
 * (`claimsWritten`), each one's change taken (M-REC's `claimsChanged`) —
 * kept as held where a document the view shows windows it (`originsShown`),
 * and read again until set in one step (`claimsAgain`); else dropped, the
 * documents windowing it told (`decidedAnew`). A change of the page's class
 * while the search is out ends it. The view counts it missing while it is out
 * (`pump`).
 * @param {FeedUpdate} u
 * @param {number} at the page's clock at the row or drop that left the claims behind: what those kept stand kept from
 * @returns {Promise<void>}
 */
async function searchClaims(u, at) {
  const cls = classes;
  searching++;
  try {
    const changed = await claimsWritten(u);
    if (classes !== cls || !changed.size) return;
    const kept = originsShown();
    /** @type {Set<string>} */
    const dropped = new Set();
    for (const o of changed) {
      REC.claimsChanged(o, kept.has(o));
      if (kept.has(o)) claimsAgain(o, at); else dropped.add(o);
    }
    decidedAnew(dropped, at);
  } finally { searching--; dirty(); }
}

/**
 * The edition claims on an origin a document the view shows windows, read
 * again (FP-23; see the head): those held stand as held while the read is
 * out — the view asks nothing of them meanwhile (`needClaims`) — and are set
 * in one step as it lands (M-REC's `setClaims`), the documents windowing the
 * origin told after (`decidedAnew`). A change of them taken while the read is
 * out queues one more read (`Again.more`), the read out setting nothing (its
 * count moved: M-REC's `setClaims` refuses it); one the board did not answer
 * sets nothing, and is made again once UNREACHED_MS has passed or as the
 * board answers again (`answering`) where the view still shows a document windowing the
 * origin, else the claims are dropped as a change of an origin out of view
 * drops them; a change of the page's class ends it, the reads at the new
 * class making the page whole. While it is out the claims stand held as they
 * are (`Kept`) from `since`: `claimsKept` answers for them once KEPT_MS has
 * passed, with the refusal the last lookup met, until the step that sets or
 * drops them.
 * @param {string} origin
 * @param {number} since the page's clock at the row or drop that left them behind (`Kept.since`)
 */
function claimsAgain(origin, since) {
  const out = claimsOut.get(origin);
  if (out) { out.more = true; return; }
  /** @type {() => void} */
  let land = () => {};
  /** @type {Again} */
  const a = { more: false, paused: false, landed: new Promise((/** @type {(v: void) => void} */ r) => { land = r; }) };
  claimsOut.set(origin, a);
  standKept(keptClaims, origin, since);
  const cls = classes, ended = () => classes !== cls;
  void (async () => {
    try {
      for (;;) {
        a.more = false;
        const c = await claimsFresh(origin);
        if (ended()) return;
        const landed = land;
        a.landed = new Promise((/** @type {(v: void) => void} */ res) => { land = res; });
        if (a.more) { landed(); continue; }
        if (!('unheard' in c)) {
          const set = REC.setClaims(c);
          landed();
          if (!set) continue;
          lifted(keptClaims, origin, unkeep(keptClaims, origin), set);
          decidedAnew(new Set([origin]), since);
          return;
        }
        keptMet(keptClaims, origin, c.unheard);
        landed();
        a.paused = true;
        await afterPause(() => { a.paused = false; });
        if (ended()) return;
        if (!originsShown().has(origin)) { unkeep(keptClaims, origin); REC.claimsChanged(origin, false); decidedAnew(new Set([origin]), since); return; }
      }
    } finally {
      if (claimsOut.get(origin) === a) { claimsOut.delete(origin); unkeep(keptClaims, origin); }
      land();
      dirty();
    }
  })();
}

/**
 * An act's reads of the edition claims on an origin wait for their read again
 * (`claimsAgain`) — at most DROP_ATTEMPTS of its reads land, so a run of rows
 * never holds the act — so it reads what that set; at once where none is
 * out, or it waits on the board.
 * @param {string} origin
 * @returns {Promise<void>}
 */
async function claimsAgainFirst(origin) {
  for (let i = 0; i < DROP_ATTEMPTS; i++) {
    const a = claimsOut.get(origin);
    if (!a || a.paused) return;
    await a.landed;
  }
}

/** the key an account's byline read is held under while the board does not answer it (`hold`) */
const accountKeyOf = (/** @type {string} */ account) => 'a:' + account;

/** are an account's byline facts to be read: none held; or a cause owed its read again (M-REC's `causeOwed`) or the board not answering held, either once the pause a read the board did not answer holds it for has ended? */
function accountWanted(/** @type {string} */ account) {
  const f = REC.accountKey(account);
  return f === undefined || ('cause' in f && (f.cause === 'unreachable' || REC.causeOwed(account)) && !held(accountKeyOf(account)));
}

/**
 * The view's read of an account's byline facts (`readAccount`): missing
 * while it is out, or while they are to be read and it can ask
 * (`accountWanted`) — none held, or a cause owed its read again; not missing
 * once held as they stand — a cause held while the board's silence holds its
 * read included, for nothing will arrive for it until its pause ends.
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
 * The byline's facts for an account (FP-34): read where the page holds none,
 * holds a cause owed its read again (M-REC's `causeOwed`), or holds that the
 * board did not answer — either of the last two once the pause a read the
 * board did not answer holds them for has ended — once for every reader of
 * them, a read out joined. A value is taken always, for it never changes; a
 * cause only where no drop of the byline causes overtook it (M-REC's
 * `keyDrops`), else nothing is taken and the read answers so — the view asks
 * again as it next needs them, an act begins it again (SC's `readPane`); the
 * board not answering held for UNREACHED_MS (`hold`), asked again past it or
 * as the board answers again (`answering`), and taken only where the page holds nothing else
 * of them: facts held stand through such a read, a cause owed its read again
 * still (FP-23). Facts taken that say other than those held are told
 * (`bylineTaken`).
 * @param {string} account
 * @returns {Promise<boolean>} settled once what was read is taken, or nothing was to be read: false where a drop of the byline causes overtook the read and nothing was taken
 */
export function readAccount(account) {
  const out = accountsOut.get(account);
  if (out) return out;
  if (!account || !accountWanted(account)) return Promise.resolve(true);
  const p = (async () => {
    const at = REC.keyDrops();
    const facts = await factsOf(account);
    if ('cause' in facts && REC.keyDrops() !== at) return false;
    const was = REC.accountKey(account);
    if (!('cause' in facts) || facts.cause !== 'unreachable') unreached.delete(accountKeyOf(account));
    else {
      hold(accountKeyOf(account));
      if (was && !('cause' in was && was.cause === 'unreachable')) return true;
    }
    REC.takeAccountKey(account, facts);
    bylineTaken(account, was, Date.now());
    return true;
  })().finally(() => { accountsOut.delete(account); dirty(); });
  accountsOut.set(account, p);
  return p;
}

/**
 * Owner facts the page took anew told to the readers that keep a byline apart
 * from the model, so each sets it again (`onDrop`, its `byline` the account;
 * FP-23, FP-34): where the facts held now say other than those held before the
 * take (M-REC's `sameFacts`), one drop naming the held documents the account
 * owns (M-REC's `ownedBy`); none where they say the same, or it owns none.
 * @param {string} account
 * @param {AccountFacts | undefined} was the facts held before the take
 * @param {number} at the page's clock at the read or the row that brought them (`Dropped.at`)
 */
function bylineTaken(account, was, at) {
  if (REC.sameFacts(was, REC.accountKey(account))) return;
  const addrs = REC.ownedBy(account);
  if (addrs.length) onDrop({ row: null, addrs, byline: account, at });
}

/**
 * Did the board leave the last read of an account's byline facts unanswered
 * (`readAccount`): the pause that read is held for stands (`hold`), or the
 * page holds that the board did not answer? Facts held stand through such a
 * read, so what the page holds of them alone does not tell (SC's `readPane`).
 * @param {string} account
 * @returns {boolean}
 */
export function factsUnheard(account) {
  const f = REC.accountKey(account);
  return held(accountKeyOf(account)) || (!!f && 'cause' in f && f.cause === 'unreachable');
}

/**
 * An account's byline facts as its board answers them (`readAccount`; R22).
 * Its own credential table first
 * (`key_set`): where it holds no key and never held one — none enrolled,
 * none retired — the table is read at each account above it while each holds
 * none enrolled (wire.md §Sessions), the first that holds one making its
 * writes signed BY REFERENCE with that account's keys, and none UNSIGNED.
 * Else its genesis enrollment: the enrollment records naming it (M-FRAMES's
 * `enrollmentsOf`), each one's link read (`read_link`) and kept where its own
 * `to` names the account, the genesis the first homed in another account's
 * doc 1, else the lowest-addressed homed in its own (skep-client's credential
 * read); its record atom
 * placed in its home's text through the home's V→I image (AUTH-2.114) and read
 * (`retrieve_v`); the record's one device-flagged entry — the record rule's
 * `anchor` false — its label, none where it carries none, and its fingerprint
 * (AUTH-1.8, util's `keyFingerprint`). NOT RECORDED where no genesis stands,
 * the home's text does not place its atom, or its record names not exactly
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
 * Where a link's slot projects into a document's current text (A-53): every
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
 * kept nowhere (`project`): a version member's, for a landing's version
 * offer (N-GO), whose box shows another version, so no beam or symbol reads
 * it. Its runs in the text's order; the refusal met where the board declines
 * the read.
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
 * versions list (A-39) and for the offer of a landing's line (N-GO) — a row
 * asks no member's
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
 * A version member's age read for an act — its row in the versions list,
 * where the model holds none (M-REC's `memberAge`): `doc_metadata` asked of
 * the member, and the age it answers kept.
 * @param {string} member a trunk member's address, `D.k`
 * @returns {Promise<{age: import('./frames.js').Age} | {refused: Refusal | null}>} the refusal met where the board declines the read; null where its answer tells no age
 */
export async function ageOf(member) {
  const out = await read(F.docMetadata(member));
  if ('refused' in out) return out;
  const m = F.decodeDocMetadata(out.answer);
  if (!m) return { refused: null };
  REC.takeMemberAge(member, m.age);
  return { age: m.age };
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
