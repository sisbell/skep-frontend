// M-REC — the model (the structure record §3.2; FP-6). Layer 1, pure:
// runnable under Node against a fake port. State: the one owner (FP-10) of
// every record the page reads at its class — the board, the first row
// `boards()` answered, or why none is held (`noBoard`; FP-35); the session
// as `session` opened it — its reference, a name and never a token (FP-14),
// its principal and account, whether a write may go out under it — the death
// that ended it, the refusal `session()` met, and the account the page is
// reconnecting as or could not (`reconnect`); health and the derived mode;
// the daemon's state; the device's key store as `fingerprint` answered it,
// or that it was not read (`keyPresent`, `device`; FP-34); the client index
// built from `places` — the documents per account with their labels, kinds
// and standing, the counts per account, the index's state and floor — each
// answer replacing it whole with the feed rows taken meanwhile laid over it
// (`takeIndex`), and kept by the feed's rows, never from `/changes` nor by
// enumerating documents; documents — their index row, extent, delivered
// runs and the blocks derived from them, metadata, V→I image as read with
// the transclusion origins it shows, the raw set of links touching them,
// their chain's count and whether the board ended it there, the position
// their text was read at (`Doc.readAt`), and a refusal a read of them met;
// links as delivered, the type learned once (E17 (a)); where a link's slot
// projects into a document's current text as `project` answered it, or what
// its refusal said of that document (`Declined`; A-53), held until that
// document's delivered state is dropped; the edition claims the active view
// lists on each origin a withheld run names, or that the lookup was withheld
// or failed (`Lookup`; PUB-5.124), and the failed reads a listed claim's
// admission waits on (`takeFailedRead`); the owners and key sets; the
// byline's facts per account, its device key or why it names none
// (`AccountFacts`; FP-34); the feed's rows as they arrived; and a bare row's
// mark on the board (`bare`).
// A link's slot names bytes, never a place (wire.md §Links): where a stored
// span stands in a document's text is read through that document's held V→I
// image (`placed`) — moved where the image puts it, cut in two as two
// stretches, nowhere where the text does not hold it — and a document holds
// an end wherever its bytes stand, whichever document minted them
// (`holdsEnd`): the trunk the span's address lies under by that address
// alone, any other once its held text places them. A passage carried is
// named the same way, by the permanent addresses of its bytes read through
// the held image (`identityOf`), and read back by a slot's rule
// (`placedIdentity`).
// Every drop is counted and the counts never fall (`dropsOf`, `claimDrops`,
// `keyDrops`): the board's answers come by one channel and the feed's rows
// by another, so a read can land after the row of a write it was read
// before; M-PUMP reads a count as a read goes out and again as it lands, and
// takes nothing learned across a drop. The edition claims held are dropped
// together — a feed row names a claim's home, never the origin it claims —
// and a failed read of a claim's link or home stands through those drops
// until a read of it answers or what the page held of it is dropped. A
// byline's cause — never its value, which is the same at every class — is
// dropped at every feed row naming a doc 1 (AUTH-2.127) and at every change
// of class.
// A bare row, its `docs` null and naming no link, drops nothing and marks
// its board (`bare`; FP-23); M-PUMP's one refresh after the run takes the
// mark (`unmarkBare`), hands an advanced edition's text to the member it is
// (`takeAsMember`), drops what no shown document reads through
// (`takeRefresh`) and sets each shown document again in one step
// (`setAgain`), each standing as held until its reads land.
// The class: the page's own session's death (`sessionDied`), a lost session
// not regained (`sessionLost`) or one regained as another principal
// (`sessionRegained`) drops every record (`dropClass`), keeping only which
// documents the class it left could read (`couldRead`); a document one of
// them that a read at the new class answers `withheld` is covered
// (`covered`; FP-29): its place stands, drawn and named as the withheld box
// a guest meets. Every document the model knows exists — listed, or
// answered for — is one box (`known`). The system account's rows are held
// and marked `system` for the drawing modules to leave out. The model knows
// nothing of pixels, zoom, selection or lenses: the links touching an
// address are the raw set as delivered, and which of them show, and how, is
// LK's.
// Rules: FP-1, FP-2, FP-6, FP-7, FP-10, FP-14, FP-22, FP-23, FP-29, FP-34,
// FP-35.

import { accountOf, documentOf, homeOf, cmpAddr, elementOf, memberOf, isUnder, isTrunkMember, docOneOf } from './address.js';
import { byteOffsets } from '../util.js';

/** @typedef {import('./frames.js').Run} Run */
/** @typedef {import('./frames.js').DocMeta} DocMeta */
/** @typedef {import('./frames.js').LinkValue} LinkValue */
/** @typedef {import('./address.js').EndRef} EndRef */
/** @typedef {import('../bridge/shapes').Place} ShapePlace */
/** @typedef {import('../bridge/shapes').PlacesAnswer} PlacesAnswer */
/** @typedef {import('../bridge/shapes').IndexState} IndexState */
/** @typedef {import('../bridge/shapes').FeedUpdate} FeedUpdate */
/** @typedef {import('../bridge/shapes').Health} Health */
/** @typedef {import('../bridge/shapes').Mode} Mode */
/** @typedef {import('../bridge/shapes').DeathReason} DeathReason */
/** @typedef {import('../bridge/shapes').Standing} Standing */
/** @typedef {import('../bridge/shapes').SessionOpened} SessionOpened */
/** @typedef {import('../bridge/shapes').FingerprintRow} FingerprintRow */
/** @typedef {import('../bridge/shapes').BoardRow} BoardRow */
/** @typedef {import('../bridge/shapes').Refusal} Refusal */

/**
 * @typedef {'none' | {refused: {kind: string, name: string}}} NoBoard — why the page holds no board (FP-35), as `boards()`
 * answered: `none` the list empty — no board on this machine has begun; `refused` the list could not be read, which says
 * nothing of whether one exists, the refusal by its kind and its one name
 */

/** the system account whose head document `H` the daemon writes (wire.md §The other endpoints: `1.1.0.1.0.2`) */
export const SYSTEM_ACCOUNT = '1.1.0.1';

/**
 * @typedef {Object} Place — one row of the client index
 * @property {string} doc
 * @property {'edition' | 'draft'} kind
 * @property {string | null} label the first line of its content, the index's
 * @property {Standing} standing
 * @property {string} account
 * @property {boolean} system a row of the system account — held, not drawn
 */

/**
 * @typedef {Object} Block — a paragraph of delivered text, the span grain the walk and the mirror use (the selection is a byte span, which a click takes as the whole block)
 * @property {number} pos the first V-position (1-based) — the block's stable key
 * @property {number} width positions (bytes), the separator after it included
 * @property {'para' | 'withheld' | 'atom' | 'ref' | 'hex'} kind
 * @property {string} text the paragraph's text (the separator trimmed), the atom's JSON, or ''
 * @property {string | null} origin a withheld run's origin document
 */

/**
 * @typedef {Object} Origin — a run of this document whose bytes have another origin (a transcluded run)
 * @property {number} pos
 * @property {number} width
 * @property {string} doc the origin document
 */

/**
 * @typedef {Object} ImageRun — one run of a document's V→I image, placed at its positions: `width` consecutive permanent addresses from `ordinal` in the I-space `prefix` names (wire.md §Value encodings, `runs`), sitting at the positions [pos, pos + width) of the document's text
 * @property {number} pos the run's first position in the document's text
 * @property {number} width
 * @property {string} prefix the run's first permanent address without its last field — the I-space it lies in: `1.0.1.0.3.0.1` for the document's own content, `1.0.1.0.3.2.0.1` for content minted under its second member's chain, another document's for a transcluded run
 * @property {number} ordinal the last field of its first permanent address
 */

/** @typedef {{pos: number, width: number}} Stretch a stretch of a document's text a stored span stands in: its first position and its positions */

/**
 * @typedef {Object} ISpan — bytes by identity: `width` consecutive permanent addresses from `ordinal` in the I-space `prefix` names — what a link's slot stores for a passage, and what a passage carried is recorded as (`identityOf`) — never a position, so where they stand is read again through a document's held image (`placedIdentity`)
 * @property {string} prefix the I-space they lie in: a permanent address without its last field
 * @property {number} ordinal the last field of their first permanent address
 * @property {number} width
 */

/**
 * @typedef {'withheld' | 'unregistered' | {refused: string}} Declined — a `project` the board refused, by what its refusal
 * says of the document projected into: `withheld` from the reader, `doc_not_registered` — nothing the board will say of the
 * address — or another refusal by its name (`not_a_link`), which says nothing of the document; BM-HELD's `whyOf` reads it
 * for the reason a far end's words give for not telling what its text holds
 */

/**
 * @typedef {Object} Doc
 * @property {string} addr
 * @property {string | null} account
 * @property {'edition' | 'draft' | 'unknown'} kind
 * @property {string | null} label
 * @property {Standing | null} standing
 * @property {boolean} system
 * @property {number | null} extent the content subspace's positions, from the span set
 * @property {number | null} linkPositions the link subspace's positions
 * @property {DocMeta | null} meta
 * @property {Run[]} runs the delivered runs, merged, in position order
 * @property {number} from the first delivered position, or -1
 * @property {number} to one past the last delivered position
 * @property {number | null} readAt the position the delivery taken last was answered at (its `as_of`) — a widening read asks the whole window again, so it is the text's; null where no delivery said, or none is held
 * @property {Block[]} blocks
 * @property {ImageRun[]} image the V→I image as read, in position order: the permanent address of every position it covers
 * @property {Origin[]} origins the image's runs whose origin is another document — the transcluded runs
 * @property {[number, number] | null} imageFor the window the image was read for
 * @property {Set<string>} links the addresses of the links touching this document, as `find_links_v` delivered them
 * @property {boolean} linksRead
 * @property {number | null} members the chain's member count where probed, else null
 * @property {boolean} ended `members` is the whole chain: the board answered that no member follows `D.members` (M-PUMP's `probeChain`); false where the probe stopped short of an end, or none was recorded
 * @property {number | null} whole the content extent the whole document holds, where the span set said
 * @property {number} rev bumped on every change to this document
 * @property {'unregistered' | 'withheld' | null} refused what a read of this document answered, where one refused
 */

/**
 * @typedef {Object} Link — as delivered; raw (which show and how is LK's)
 * @property {string} addr
 * @property {string} home the document the link resides in — the version member, where it is homed at one, never its trunk (M-ADDR's `homeOf`)
 * @property {string | null} owner the home's account
 * @property {string | null} type the type slot's address
 * @property {EndRef[]} from
 * @property {EndRef[]} to
 */

/**
 * @typedef {Object} OwnerRow
 * @property {string | null} prefix
 * @property {number | null} principal
 */

/**
 * @typedef {Object} Reconnect — the page's session lost at a restart and not regained (FP-28): the account the lost session acted as, and whether the re-acquire was refused
 * @property {string | null} as the account — null for a session of no account
 * @property {boolean} refused false while the re-acquire is out past a second ("reconnecting as"), true once it was refused ("could not reconnect as")
 */

/**
 * @typedef {string[] | 'withheld' | 'unread'} Lookup — the edition-claim lookup's answer for an origin as the page holds it
 * (`takeEditionClaims`): the claims of the edition class the active view lists on it, in the order answered; 'withheld'
 * where the board refused it as a read of a document withheld from the reader; 'unread' where it failed any other way —
 * refused for a reason that says nothing of the claims, or not answered
 */

/**
 * @typedef {Object} Reader — who reads, as the entitlement arm at a withheld document or run is decided for them (PUB-5.97's key-split defaults, in PUB-5.121's order; R56)
 * @property {string | null} account the acting account, or null (a guest)
 * @property {boolean} keyPresent the device's key store holds a key bound at this board's origin (PUB-5.97)
 */

/**
 * @typedef {Object} DeviceKey — a key of the device's store: its label, none where it carries none, and its fingerprint
 * @property {string | null} label
 * @property {string} fingerprint
 */

/**
 * @typedef {Object} DeviceCause — why the session's key on this device cannot be named (`device`; FP-34)
 * @property {'store-unread' | 'key-untold'} cause `store-unread` the device's key store was not read — `fingerprint`
 * refused, or not answered; `key-untold` the store holds more than one key the session may have been opened with, or
 * none, and `session` does not name the one it was
 */

/**
 * @typedef {Object} AccountKey — an account's device key as its byline names it (FP-34; R22's naming input): the sole
 * DEVICE-FLAGGED entry of its GENESIS ENROLLMENT (PUB-5.61, PUB-5.62) — its label, carried verbatim across rotation and
 * burn (AUTH-5.59 step 6, AUTH-5.69), none where the entry carries none, and its fingerprint (AUTH-1.8)
 * @property {string | null} label
 * @property {string} fingerprint 64 lowercase hex
 */

/**
 * @typedef {Object} KeyCause — why an account's byline can name no device key (FP-34)
 * @property {'unsigned' | 'by-reference' | 'not-recorded' | 'withheld' | 'unreachable' | 'unread'} cause `unsigned` no
 * account at or above it holds a key, so no key made its writes; `by-reference` it holds no key of its own and its writes
 * are signed with the keys of an account above it (wire.md §Sessions); `not-recorded` it holds keys of its own and the
 * board holds no genesis enrollment naming one device-flagged key for it; `withheld` a read its facts wait on was refused
 * as withheld from the reader; `unreachable` the board did not answer; `unread` the board refused a read for a reason
 * that says none of these
 * @property {string} [owner] where `withheld`, the owner of the document withheld
 */

/** @typedef {AccountKey | KeyCause} AccountFacts — what the page holds of an account's byline: its device key, or why it names none */

/**
 * @typedef {Object} RecordValue — a record atom's value, where its type is one the record rule renders (D13)
 * @property {'skep-enroll' | 'skep-head'} type
 * @property {Array<{alg?: unknown, key?: unknown, label?: unknown, anchor?: unknown}>} keys a genesis record's keys, in the record's own order; none for the head record
 * @property {unknown} position the head record's position
 * @property {string} chain the head record's chain
 */

const state = {
  /** @type {{board: string, name: string, origin: string} | null} */
  board: null,
  /** @type {NoBoard | null} why the page holds no board, where `boards()` answered none (`takeBoards`); null where a board is held, or the list has not answered */
  noBoard: null,
  /** @type {SessionOpened | null} the session as `session` opened it: `writes` the signed session's, never the bare one's, which reads alone */
  session: null,
  /** @type {DeathReason | null} */
  sessionDied: null,
  /** @type {{kind: string, name: string} | null} the refusal `session()` met, where it did — at boot, or re-acquiring a session a restart lost */
  sessionRefused: null,
  /** @type {Reconnect | null} the page's session lost at a restart and not regained, where the line says so (`setReconnecting`, `sessionLost`) */
  reconnect: null,
  /** @type {unknown} the `/health` document verbatim */
  health: null,
  /** @type {Mode | null} */
  mode: null,
  /** @type {Array<{label: string | null, fingerprint: string, principals: number[]}> | null} the key store's keys as `fingerprint` answers them, each with the principals its bindings name at this board's origin (`takeKeyStore`); null where the store was not read */
  keys: null,
  /** @type {'running' | 'stopped' | 'unreachable' | null} */
  daemon: null,
  /** @type {boolean} */
  daemonChanged: false,
  /** @type {Map<string, Place>} */
  index: new Map(),
  /** @type {Map<string, number>} documents per account, from `places` */
  counts: new Map(),
  /** @type {IndexState | null} */
  indexState: null,
  /** a feed row naming no document and no link marked the board since the last refresh took the mark (`bare`) */
  bare: false,
  /** @type {Map<string, Doc>} */
  docs: new Map(),
  /** @type {Map<string, Link>} */
  links: new Map(),
  /** @type {Map<string, Map<string, Stretch[] | Declined>>} `project`'s answers, by the document projected into, then by `⟨link⟩ ⟨slot⟩` */
  projections: new Map(),
  /** @type {Map<string, Lookup>} the edition-claim lookup's answer per origin (`takeEditionClaims`) */
  editionClaims: new Map(),
  /** @type {Set<string>} the links and documents whose read an edition claim's admission waits on failed, unanswered since (`takeFailedRead`) */
  failedReads: new Set(),
  /** how many times the edition claims held have been dropped together at a feed row (`claimDrops`) */
  claimDrops: 0,
  /** @type {Map<string, number>} how many times each address's delivered state has been dropped (`invalidate`), its record held or not */
  drops: new Map(),
  /** how many times a change of the page's class has dropped every record (`dropClass`) */
  classDrops: 0,
  /** @type {Set<string>} the documents the class the page last left could read, as the change found them (`dropClass`, `couldRead`) */
  readBefore: new Set(),
  /** @type {Map<string, OwnerRow>} */
  owners: new Map(),
  /** @type {Map<string, {enrolled: Array<{fingerprint: string, anchor: boolean}>, retired: Array<{fingerprint: string}>}>} */
  keySets: new Map(),
  /** @type {Map<string, AccountFacts>} the byline's facts per account (`takeAccountKey`) */
  accountKeys: new Map(),
  /** how many times the byline causes held have been dropped (`keyDrops`) */
  keyDrops: 0,
  /** @type {Array<{position: number, op: string | null, docs: string[], cls: string, time: number | null}>} the feed's rows as they arrived (the newest last), each with its commit's wall-clock unix milliseconds where the row carries them (wire.md §The change feed, `time`) */
  feed: [],
  rev: 0,
  /** @type {Array<() => void>} */
  watchers: [],
};

function bump() { state.rev++; for (const w of state.watchers) w(); }

/** subscribe to any change (the app marks its frame dirty) */
export function watch(/** @type {() => void} */ fn) { state.watchers.push(fn); }
/** the model's revision counter */
export const rev = () => state.rev;

// ---- the board, the session, health, the daemon ------------------------------

/** @param {{board: string, name: string, origin: string} | null} b the board the page holds; null for none, why left untold */
export function setBoard(b) { state.board = b; state.noBoard = null; bump(); }
export const board = () => state.board;
/**
 * The board list as `boards()` answered it (FP-35): its first row the board
 * the page holds; an empty list no board, none on this machine having begun;
 * a refusal no board, and nothing known of whether one exists (`noBoard`).
 * @param {{result: BoardRow[]} | {refused: Refusal}} out
 */
export function takeBoards(out) {
  const row = 'result' in out ? out.result[0] : undefined;
  state.board = row ? { board: row.board, name: row.name, origin: row.origin } : null;
  state.noBoard = row ? null : 'result' in out ? 'none' : { refused: { kind: out.refused.kind, name: out.refused.name } };
  bump();
}
/** why the page holds no board, as `boards()` answered (`NoBoard`); null where a board is held, or the list has not answered */
export const noBoard = () => state.noBoard;
/** @param {SessionOpened | null} s */
export function setSession(s) { state.session = s; state.sessionDied = null; state.reconnect = null; bump(); }
export const session = () => state.session;
/** @param {{kind: string, name: string} | null} r */
export function setSessionRefused(r) { state.sessionRefused = r; bump(); }
export const sessionRefused = () => state.sessionRefused;
/**
 * Every read held at the page's class dropped with it (THE CLASS): the
 * index (its rows, counts and state), each document's delivered state and
 * the index's row on it, the links and where their slots project, the
 * edition claims and the failed reads of them, the owners and key sets, the
 * byline causes (`dropKeyCauses`), the feed's drafts rows and a bare row's
 * mark, whose refresh the reads at the new class make whole — so no
 * frame after it draws, lists or counts what the class could read and the
 * next cannot. Every address is counted dropped once more (`dropsOf`), so no
 * read out across the change is taken. What the class could read is kept by
 * address alone (`couldRead`), for the cover (see the head). M-PUMP reads
 * the index again at the class the page reads at now, and the view asks the
 * rest.
 */
function dropClass() {
  state.classDrops++;
  state.bare = false;
  state.readBefore = new Set([...state.index.keys(), ...[...state.docs.values()].filter((d) => !d.refused && (d.from >= 0 || d.meta || d.extent != null)).map((d) => d.addr)]);
  state.index.clear(); state.counts.clear(); state.indexState = null;
  for (const d of state.docs.values()) { drop(d); unlist(d); }
  state.links.clear(); state.projections.clear(); state.editionClaims.clear(); state.failedReads.clear(); state.owners.clear(); state.keySets.clear();
  dropKeyCauses();
  state.feed = state.feed.filter((r) => r.cls !== 'drafts');
}
/**
 * The death signal: the session goes, and every read held at its class with
 * it (`dropClass`).
 * @param {DeathReason} reason
 */
export function sessionDied(reason) {
  dropClass();
  state.sessionDied = reason; state.session = null; state.reconnect = null;
  bump();
}
export const deathReason = () => state.sessionDied;
/**
 * The page reconnecting as the account its session acted as, a restart
 * having lost it and the re-acquire not back within a second (FP-28): the
 * session stands, and what was read at its class with it, until the
 * re-acquire settles.
 */
export function setReconnecting() {
  if (!state.session) return;
  state.reconnect = { as: state.session.account, refused: false }; bump();
}
/**
 * The re-acquire of a session a restart lost, refused (FP-28): every read
 * held at the session's class goes with it (`dropClass`), as at a death —
 * but no death is recorded, for the shell named none — the refusal
 * `session()` met kept as boot keeps it, and the account the page could not
 * reconnect as kept.
 * @param {{kind: string, name: string}} r the refusal the re-acquire met
 */
export function sessionLost(r) {
  const as = state.session ? state.session.account : null;
  dropClass();
  state.session = null; state.sessionRefused = r; state.reconnect = { as, refused: true };
  bump();
}
/**
 * A session the re-acquire opened in the place of one a restart lost
 * (FP-28), taken as `setSession` takes it — every read held at the lost
 * session's class dropped first (`dropClass`) where the new one acts as
 * another principal, so nothing read at one principal's class is held under
 * another's.
 * @param {SessionOpened} s
 * @returns {boolean} the principal another: every read dropped
 */
export function sessionRegained(s) {
  const other = !!state.session && state.session.principal !== s.principal;
  if (other) dropClass();
  setSession(s);
  return other;
}
/** the page's session lost at a restart and not regained, where the line says so; null where it is not */
export const reconnect = () => state.reconnect;
/** @param {unknown} h @param {Mode | null} mode */
export function setHealth(h, mode) { state.health = h; state.mode = mode; bump(); }
export const health = () => /** @type {{auth?: {claimant?: string | null, local_trust?: boolean}, log_position?: number, writes?: {halted?: boolean}} | null} */ (state.health);
export const mode = () => state.mode;
/** @param {{mode: Mode, claimant: string | null, local_trust: boolean}} ev */
export function setMode(ev) {
  state.mode = ev.mode;
  const h = /** @type {{auth?: Record<string, unknown>} | null} */ (state.health);
  if (h && h.auth) { h.auth.claimant = ev.claimant; h.auth.local_trust = ev.local_trust; }
  bump();
}
/** @param {'running' | 'stopped' | 'unreachable'} s */
export function setDaemon(s) { state.daemonChanged = state.daemon !== null && state.daemon !== s; state.daemon = s; bump(); }
export const daemon = () => state.daemon;
/**
 * The key store as `fingerprint` answers it, read for this board: each key's
 * label and fingerprint, and the principals its bindings name at this
 * board's origin — each binding reads `⟨origin⟩ principal ⟨N⟩ account ⟨A⟩`,
 * so the origin is the binding's whole first field and never a prefix of it
 * (`…:8642` is not `…:86420`'s), and the principal its whole second (`1` is
 * not `12`). A session's death leaves it standing: the store is the
 * device's, not the session's. Null — the `fingerprint` call refused — holds
 * the store unread, as the page holds it before it reads one.
 * @param {FingerprintRow[] | null} rows the store's keys, each with its bindings; null where the store was not read
 * @param {string} origin this board's origin, as `boards` answers it
 */
export function takeKeyStore(rows, origin) {
  const head = origin + ' principal ';
  const principalOf = (/** @type {string} */ b) => { const n = b.startsWith(head) ? b.slice(head.length).split(' ')[0] : ''; return /^\d+$/.test(n) ? [Number(n)] : []; };
  state.keys = rows ? rows.map((r) => ({ label: r.label, fingerprint: r.fingerprint, principals: r.bindings.flatMap(principalOf) })) : null;
  bump();
}
/** does the device's key store hold a key bound at this board, for any principal (R56's "key present")? None where the store was not read */
export const keyPresent = () => !!state.keys && state.keys.some((k) => k.principals.length > 0);
/**
 * The device's key for the page's session at this board, as the shell picks
 * the key a signed session is opened with (skep-client's `FileStore::select`):
 * the one key of the store bound here for the session's principal; else,
 * under a session that writes, the store's one key, which the shell signs
 * with where no binding names one. Under a session that writes, where no key
 * can be named, why (FP-34: the slot says why, never another key): the
 * store not read, or more than one key it may have been opened with — or
 * none — for the shell signs with the newest binding, `fingerprint` does not
 * order bindings across keys, and `session` does not name the key it opened
 * with. None for a guest, and none for a bare session
 * no one key is bound for, whose open read no key: the one line's slot does
 * not apply to either. So no label or fingerprint shown is of a key other
 * than the one this principal's signed session is opened with here.
 * @returns {DeviceKey | DeviceCause | null}
 */
export function device() {
  const s = state.session, keys = state.keys;
  if (!s) return null;
  if (!keys) return s.writes ? { cause: 'store-unread' } : null;
  const bound = keys.filter((k) => k.principals.includes(s.principal));
  const key = bound.length === 1 ? bound[0] : !bound.length && s.writes && keys.length === 1 ? keys[0] : null;
  if (key) return { label: key.label, fingerprint: key.fingerprint };
  return s.writes ? { cause: 'key-untold' } : null;
}
/**
 * Who reads now — the acting account, or a guest's null, and whether a key
 * for this board is present: the one value every entitlement arm is decided
 * from (T-ARTICLE's `entitlementArm`).
 * @returns {Reader}
 */
export const reader = () => ({ account: state.session ? state.session.account : null, keyPresent: keyPresent() });

// ---- the index -----------------------------------------------------------------

/**
 * Build the index from `places`: every document of the board's document
 * index at the call's class, in address order; the counts per
 * account; the index's state. The answer replaces the index whole, and the
 * feed rows taken while it was read are laid over it in the order taken, by
 * the rule a row taken after it follows (`listRow`): the listing names no
 * feed position, and the shell can emit a row before the index it lists from
 * holds it, and emits each row once. A record that neither the
 * answer nor those rows list keeps none of its row. The answer's state is
 * taken where no `index` state was taken while it was read, for the shell
 * emits a state once, as it moves, and the answer can be the older.
 * @param {PlacesAnswer} answer
 * @param {{rows: FeedUpdate[], state: boolean}} [meanwhile] what the board's events brought while the answer was read: the feed rows taken, and whether an `index` state was
 */
export function takeIndex(answer, meanwhile = { rows: [], state: false }) {
  const listed = [...state.index.keys()];
  state.index.clear(); state.counts.clear();
  for (const p of answer.docs) putPlace(p);
  for (const c of answer.counts) state.counts.set(c.account, c.documents);
  for (const u of meanwhile.rows) listRow(u);
  for (const addr of listed) { const d = state.docs.get(addr); if (d && !state.index.has(addr)) unlist(d); }
  if (!meanwhile.state) state.indexState = answer.state;
  bump();
}

/** a record no index row stands on: none of a row's kind, label or standing — its kind its metadata's, where read (as `takeMetadata` sets it) */
function unlist(/** @type {Doc} */ d) {
  d.kind = d.meta && !memberOf(d.addr) ? (d.meta.published ? 'edition' : 'draft') : 'unknown';
  d.label = null; d.standing = null; d.rev++;
}

/** @param {ShapePlace} p */
function putPlace(p) {
  const account = accountOf(p.doc) || '';
  const system = isUnder(SYSTEM_ACCOUNT, p.doc);
  /** @type {Place} */
  const row = { doc: p.doc, kind: p.kind, label: p.label, standing: p.standing, account, system };
  state.index.set(p.doc, row);
  const d = doc(p.doc);
  d.kind = p.kind; d.label = p.label; d.standing = p.standing; d.system = system;
}

/** @param {IndexState} s */
export function setIndexState(s) { state.indexState = s; bump(); }
export const indexState = () => state.indexState;
/** the reclaim floor the index counts from, where its state names one */
export function floor() {
  const s = /** @type {{arm: string, floor?: unknown} | null} */ (state.indexState);
  return s && typeof s.floor === 'number' ? s.floor : null;
}
/** are the index's counts exact (an index run unbroken from the board's first position), or lower bounds? */
export const countsExact = () => !!state.indexState && state.indexState.arm === 'complete';
/** @param {string} addr @returns {Place | undefined} */
export const place = (addr) => state.index.get(addr);
/** every indexed place, in address order */
export function places() { return [...state.index.values()].sort((a, b) => cmpAddr(a.doc, b.doc)); }
/** the indexed documents of one account */
export function placesOf(/** @type {string} */ account) { return places().filter((p) => p.account === account); }
/** the accounts the index names (counts and rows), in address order — the system account among them, marked */
export function accounts() {
  const set = new Set([...state.counts.keys(), ...[...state.index.values()].map((p) => p.account)]);
  return [...set].filter(Boolean).sort(cmpAddr).map((a) => ({ account: a, system: isUnder(SYSTEM_ACCOUNT, a) }));
}
/** documents per account, with whether the count is exact or a lower bound */
export function countOf(/** @type {string} */ account) {
  const n = state.counts.get(account) ?? placesOf(account).length;
  return { documents: n, exact: countsExact() };
}
/** the landmarks: every account's document 1 the index holds */
export function landmarks() { return places().filter((p) => /\.0\.1$/.test(p.doc) && !p.system); }

// ---- documents -----------------------------------------------------------------

/**
 * The document record for an address — made on first ask, an empty record
 * until the reads deliver (FP-6).
 * @param {string} addr a document address (a member's address answers its own record, under its member address)
 * @returns {Doc}
 */
export function doc(addr) {
  let d = state.docs.get(addr);
  if (!d) {
    const p = state.index.get(addr);
    d = {
      addr, account: accountOf(addr), kind: p ? p.kind : 'unknown', label: p ? p.label : null, standing: p ? p.standing : null,
      system: isUnder(SYSTEM_ACCOUNT, addr), extent: null, linkPositions: null, meta: null, runs: [], from: -1, to: -1, readAt: null, blocks: [],
      image: [], origins: [], imageFor: null, links: new Set(), linksRead: false, members: null, ended: false, whole: null, rev: 0, refused: null,
    };
    state.docs.set(addr, d);
  }
  return d;
}
/** @param {string} addr */
export const has = (addr) => state.docs.has(addr);
/** every held document */
export const docs = () => [...state.docs.values()];

/**
 * Every document the model knows exists, ONE A BOX (see the head): by its
 * document's address, a version member's its trunk's — the index's places,
 * in address order, then each held record a read answered for, its text, its
 * metadata or a `withheld` refusal (existence and owner, never bytes: B1-S2),
 * in the order first held — the system account's rows left out. The plane
 * draws a box for each (P-RENDER's `drawable`) and the walk lists each under
 * its account (N-WALK's `childrenOf`), so the two never part.
 * @returns {string[]}
 */
export function known() {
  /** @type {string[]} */
  const out = [];
  const seen = new Set();
  const take = (/** @type {string} */ doc) => { seen.add(doc); out.push(doc); };
  for (const p of places()) if (!p.system && !seen.has(p.doc)) take(p.doc);
  for (const d of state.docs.values()) { const doc = documentOf(d.addr) || d.addr; if (!seen.has(doc) && !d.system && (d.from >= 0 || d.meta || d.refused === 'withheld')) take(doc); }
  return out;
}

/** could the class the page last left read a document — its record holding its text, its metadata or its extent, or its index listing it, as the change found them (see the head)? None before the page's class first changes */
export const couldRead = (/** @type {string} */ addr) => state.readBefore.has(addr);
/**
 * Is a document COVERED (see the head; FP-29): a read at the page's class
 * answered `withheld` of a document the class it last left could read
 * (`couldRead`) — its place kept, its material withheld from the reader now.
 * @param {string} addr
 * @returns {boolean}
 */
export const covered = (addr) => { const d = state.docs.get(addr); return !!d && d.refused === 'withheld' && state.readBefore.has(addr); };
/** every document covered now (`covered`), in address order */
export const coveredDocs = () => [...state.docs.keys()].filter(covered).sort(cmpAddr);

/** the span set: the content extent (subspace 1) and the link positions (subspace 2) */
export function takeSpanSet(/** @type {string} */ addr, /** @type {Array<{subspace: number, ordinal: number, positions: number}>} */ set) {
  const d = doc(addr);
  spanSetInto(d, set);
  d.rev++; bump();
}

/** a span set into a record (`takeSpanSet`, `setAgain`) */
function spanSetInto(/** @type {Doc} */ d, /** @type {Array<{subspace: number, ordinal: number, positions: number}>} */ set) {
  const c = set.find((s) => s.subspace === 1), l = set.find((s) => s.subspace === 2);
  d.extent = c ? c.positions : 0; d.whole = d.extent; d.linkPositions = l ? l.positions : 0;
}

/** `doc_metadata`'s answer, a failed read of it before answered (`takeFailedRead`); where the document is an edition claim's home, each document windowing the claim's origin is made again (`reclause`) */
export function takeMetadata(/** @type {string} */ addr, /** @type {DocMeta} */ meta) {
  const d = doc(addr);
  metaInto(d, meta);
  d.rev++; reclause(claiming((c) => homeOf(c) === addr)); bump();
}

/** metadata into a record, its kind with it where no index row and no member's address names one, a failed read of it answered (`takeMetadata`, `setAgain`) */
function metaInto(/** @type {Doc} */ d, /** @type {DocMeta} */ meta) {
  d.meta = meta;
  if (!state.index.has(d.addr) && !memberOf(d.addr)) d.kind = meta.published ? 'edition' : 'draft';
  state.failedReads.delete(d.addr);
}

/** a read of this document refused: `doc_not_registered` or `withheld` — an answer, a failed read of it before answered; where it is an edition claim's home, each document windowing the claim's origin is made again */
export function takeRefused(/** @type {string} */ addr, /** @type {'unregistered' | 'withheld'} */ what) {
  const d = doc(addr); d.refused = what; state.failedReads.delete(addr); d.rev++; reclause(claiming((c) => homeOf(c) === addr)); bump();
}

/**
 * A delivery merged into the document's runs: adjacent content runs join,
 * the blocks are re-derived, the window [from, to) widened, the position it
 * was answered at kept (`Doc.readAt`). The document is given new runs and new
 * blocks, and the ones it held are left as they were, as `invalidate` leaves
 * them: an article made from them keeps them.
 * @param {string} addr
 * @param {Run[]} runs
 * @param {number | null} [asOf] the delivery's `as_of`
 */
export function takeDelivery(addr, runs, asOf = null) {
  const d = doc(addr);
  deliverInto(d, runs, asOf);
  d.rev++; bump();
}

/** a delivery merged into a record's runs (`takeDelivery`, `setAgain`): nothing where it carries no run */
function deliverInto(/** @type {Doc} */ d, /** @type {Run[]} */ runs, /** @type {number | null} */ asOf) {
  if (!runs.length) return;
  /** @type {Run[]} */
  const all = d.runs.filter((r) => !runs.some((n) => overlaps(r, n)));
  all.push(...runs);
  all.sort((a, b) => a.pos - b.pos);
  /** @type {Run[]} */
  const merged = [];
  for (const r of all) {
    const last = merged[merged.length - 1];
    if (last && last.kind === 'content' && r.kind === 'content' && last.pos + last.width === r.pos) { last.text += r.text; last.width += r.width; }
    else merged.push({ ...r });
  }
  d.runs = merged;
  d.from = merged[0].pos;
  d.to = merged[merged.length - 1].pos + merged[merged.length - 1].width;
  d.readAt = asOf;
  d.blocks = deriveBlocks(merged);
  d.refused = null;
}

/** @param {Run} a @param {Run} b */
const overlaps = (a, b) => a.pos < b.pos + b.width && b.pos < a.pos + a.width;

/**
 * The blocks of a document's runs: a content run splits at paragraph
 * boundaries (a blank line), each block tiling its positions in bytes; a
 * withheld, atom, ref or hex run is a block of its own.
 * @param {Run[]} runs
 * @returns {Block[]}
 */
export function deriveBlocks(runs) {
  /** @type {Block[]} */
  const out = [];
  for (const r of runs) {
    if (r.kind !== 'content') { out.push({ pos: r.pos, width: r.width, kind: r.kind === 'withheld' ? 'withheld' : r.kind === 'ref' ? 'ref' : r.kind === 'hex' ? 'hex' : 'atom', text: r.text, origin: r.origin }); continue; }
    const offs = byteOffsets(r.text);
    const re = /\n[ \t]*\n+/g;
    let cut = 0;
    let m;
    while ((m = re.exec(r.text))) {
      const end = m.index + m[0].length;
      const text = r.text.slice(cut, m.index);
      out.push({ pos: r.pos + offs[cut], width: offs[end] - offs[cut], kind: 'para', text, origin: null });
      cut = end;
    }
    if (cut < r.text.length) out.push({ pos: r.pos + offs[cut], width: offs[r.text.length] - offs[cut], kind: 'para', text: r.text.slice(cut), origin: null });
  }
  return out;
}

/**
 * The block of a set of blocks holding a position: a document's as the model
 * holds them (`blockAt`), or the ones an article was made from.
 * @param {Block[]} blocks
 * @param {number} pos
 * @returns {Block | null}
 */
export const blockIn = (blocks, pos) => blocks.find((b) => pos >= b.pos && pos < b.pos + b.width) || null;
/** the block holding a position, where delivered */
export function blockAt(/** @type {string} */ addr, /** @type {number} */ pos) {
  const d = state.docs.get(addr);
  return d ? blockIn(d.blocks, pos) : null;
}
/** the block keyed by its first position */
export function blockByPos(/** @type {string} */ addr, /** @type {number} */ pos) {
  const d = state.docs.get(addr); if (!d) return null;
  return d.blocks.find((b) => b.pos === pos) || null;
}

/**
 * The value a record atom holds, where its type is one the record rule
 * renders — the genesis record `skep-enroll`, the head record `skep-head` —
 * else null: the one reading of an atom the plane's record (T-ARTICLE's
 * `recordOf`), the item rule (`itemOf`), a copy's stand-in
 * (`recordContents`) and a byline's genesis entry (M-PUMP's `readAccount`)
 * share.
 * @param {{kind: string, text: string}} item a block, or a delivered run
 * @returns {RecordValue | null}
 */
export function recordValue(item) {
  if (item.kind !== 'atom') return null;
  /** @type {any} */
  let rec = null;
  try { rec = JSON.parse(item.text); } catch { return null; }
  if (!rec || typeof rec !== 'object' || (rec.type !== 'skep-enroll' && rec.type !== 'skep-head')) return null;
  const keys = Array.isArray(rec.keys) ? rec.keys.filter((/** @type {unknown} */ k) => !!k && typeof k === 'object') : [];
  return { type: rec.type, keys, position: rec.position ?? '', chain: String(rec.chain || '') };
}
/**
 * The text of a set of delivered runs between two positions (bytes): the
 * characters whose first byte lies in [p0, p1), a run that is not content (a
 * withheld run, an atom, a reference, hex) adding none. A document's runs as
 * the model holds them (`textBetween`), or the ones an article was made from.
 * @param {Run[]} runs
 * @param {number} p0
 * @param {number} p1
 * @returns {string}
 */
export function textOf(runs, p0, p1) {
  let out = '';
  for (const r of runs) {
    if (r.kind !== 'content' || r.pos >= p1 || r.pos + r.width <= p0) continue;
    const offs = byteOffsets(r.text);
    let i0 = 0; while (i0 < r.text.length && r.pos + offs[i0] < p0) i0++;
    let i1 = i0; while (i1 < r.text.length && r.pos + offs[i1] < p1) i1++;
    out += r.text.slice(i0, i1);
  }
  return out;
}
/** the text of a document's delivered content between two positions (bytes), for a passage's first words */
export function textBetween(/** @type {string} */ addr, /** @type {number} */ p0, /** @type {number} */ p1) {
  const d = state.docs.get(addr);
  return d ? textOf(d.runs, p0, p1) : '';
}

/** a permanent address cut at its last field: the I-space it lies in, and its ordinal there */
function iPlace(/** @type {string} */ start) {
  const cut = start.lastIndexOf('.');
  return { prefix: start.slice(0, cut), ordinal: Number(start.slice(cut + 1)) };
}

/**
 * One run of a V→I image as `image` answers it (`F.decodeRuns`), by
 * identity: the permanent addresses from its first, for its positions — the
 * form a reader of an image kept outside the model names its runs in.
 * @param {{iStart: string, width: number}} r
 * @returns {ISpan}
 */
export const iSpanOf = (r) => ({ ...iPlace(r.iStart), width: r.width });

/**
 * The V→I image's runs over a window, kept whole — each placed at its
 * positions, the permanent addresses `placed` reads a link's stored span
 * back to the text through — and the runs whose origin is another document,
 * the transcluded runs, marked as origins.
 * @param {string} addr
 * @param {number} fromPos the window's first position
 * @param {Array<{iStart: string, width: number}>} runs
 */
export function takeImage(addr, fromPos, runs) {
  const d = doc(addr);
  imageInto(d, fromPos, runs);
  d.rev++; bump();
}

/** an image's runs over a window into a record (`takeImage`, `setAgain`) */
function imageInto(/** @type {Doc} */ d, /** @type {number} */ fromPos, /** @type {Array<{iStart: string, width: number}>} */ runs) {
  /** @type {ImageRun[]} */
  const image = [];
  /** @type {Origin[]} */
  const out = [];
  let pos = fromPos;
  for (const r of runs) {
    image.push({ pos, width: r.width, ...iPlace(r.iStart) });
    const el = elementOf(r.iStart);
    const origin = el ? el.doc : documentOf(r.iStart);
    if (origin && origin !== d.addr && documentOf(origin) !== documentOf(d.addr)) out.push({ pos, width: r.width, doc: origin });
    pos += r.width;
  }
  const outside = (/** @type {{pos: number, width: number}} */ o) => o.pos + o.width <= fromPos || o.pos >= pos;
  d.image = d.image.filter(outside).concat(image).sort((a, b) => a.pos - b.pos);
  d.origins = d.origins.filter(outside).concat(out).sort((a, b) => a.pos - b.pos);
  d.imageFor = [fromPos, pos];
}

/**
 * Where bytes named by identity stand in a document's held text now: the
 * positions of the held V→I image whose permanent addresses they name, in
 * the text's order, stretches meeting in the text joined — a passage an edit
 * moved where the image puts it, one cut in two as two stretches, one
 * transcluded twice at both places. None where the image held places none of
 * them: no image read, the bytes outside the window it was read for, or the
 * text not holding them.
 * @param {string} addr
 * @param {ISpan[]} spans
 * @returns {Stretch[]}
 */
export function placedIdentity(addr, spans) {
  const d = state.docs.get(addr);
  return d ? placedIn(d.image, spans) : [];
}

/**
 * Where bytes named by identity stand in a text an image covers — a
 * document's held image (`placedIdentity`), or the one an article was made
 * from, which outlives the model's (T-LAYER's `Made`): the positions whose
 * permanent addresses they name, in the text's order, stretches meeting in
 * the text joined. None where the image places none of them.
 * @param {ImageRun[]} image
 * @param {ISpan[]} spans
 * @returns {Stretch[]}
 */
export function placedIn(image, spans) {
  /** @type {Stretch[]} */
  const out = [];
  for (const s of spans) for (const r of image) {
    if (r.prefix !== s.prefix) continue;
    const lo = Math.max(s.ordinal, r.ordinal), hi = Math.min(s.ordinal + s.width, r.ordinal + r.width);
    if (lo < hi) out.push({ pos: r.pos + (lo - r.ordinal), width: hi - lo });
  }
  out.sort((a, b) => a.pos - b.pos);
  /** @type {Stretch[]} */
  const joined = [];
  for (const s of out) {
    const last = joined[joined.length - 1];
    if (last && s.pos <= last.pos + last.width) last.width = Math.max(last.width, s.pos + s.width - last.pos); else joined.push(s);
  }
  return joined;
}

/**
 * A link's stored span by identity: the permanent addresses its slot names
 * (the span's I-space, from its ordinal for its positions); null for a span
 * naming a document or an account whole, which names no bytes.
 * @param {EndRef} e
 * @returns {ISpan | null}
 */
export function identityOfEnd(e) {
  return e.whole || e.ordinal == null ? null : { ...iPlace(e.start), width: e.positions || 1 };
}

/**
 * Where a link's stored span stands in a document's held text now: its bytes
 * (`identityOfEnd`) placed through the held image (`placedIdentity`). A span
 * naming a document or an account whole stands at no position.
 * @param {string} addr
 * @param {EndRef} e
 * @returns {Stretch[]}
 */
export function placed(addr, e) {
  const i = identityOfEnd(e);
  return i ? placedIdentity(addr, [i]) : [];
}

/**
 * A stretch of a document's held text by identity — a passage carried is
 * recorded by its bytes, never by its positions: the permanent addresses of
 * its bytes, read through the held V→I image — each
 * image run it crosses cut to it, in the text's order — so wherever an edit
 * moves it, `placedIdentity` finds it again. None unless the held image
 * covers every position of it: a part named would be lit later as though it
 * were the whole.
 * @param {string} addr
 * @param {number} pos
 * @param {number} width
 * @returns {ISpan[]}
 */
export function identityOf(addr, pos, width) {
  const d = state.docs.get(addr);
  return d ? identityIn(d.image, pos, width) : [];
}

/**
 * A stretch of a text by identity, read through an image that covers it — a
 * document's held image (`identityOf`), or the one an article was made from
 * (T-LAYER's `Made`), which a pane set again carries its reader's place
 * through (SC): each image run it crosses cut to it, in the
 * text's order. None unless the image covers every position of it.
 * @param {ImageRun[]} image
 * @param {number} pos
 * @param {number} width
 * @returns {ISpan[]}
 */
export function identityIn(image, pos, width) {
  if (width < 1) return [];
  const end = pos + width;
  /** @type {ISpan[]} */
  const out = [];
  let at = pos;
  for (const r of image) {
    if (r.pos + r.width <= at) continue;
    if (r.pos > at || at >= end) break;
    const hi = Math.min(end, r.pos + r.width);
    out.push({ prefix: r.prefix, ordinal: r.ordinal + (at - r.pos), width: hi - at });
    at = hi;
  }
  return at >= end ? out : [];
}

/**
 * Does a document hold a link's end as a passage? Where it is the span's
 * `doc` — the trunk the span's address lies under, its bytes minted in that
 * trunk's I-space or a member's chain — decided from the span alone, its text
 * read or not; else where its held text places the span (`placed`): a
 * passage it transcludes from another document, a version member's bytes,
 * shared with its trunk or minted under its own chain, once its image is
 * read. A span naming a document or an account whole is no passage. The one
 * test of which ends of the links touching it a document holds: LK's, which
 * draws each where `placed` puts it, and M-PUMP's, which asks where the far
 * end of each stands.
 * @param {string} addr
 * @param {EndRef} e
 * @returns {boolean}
 */
export function holdsEnd(addr, e) {
  return !e.whole && e.ordinal != null && (e.doc === addr || placed(addr, e).length > 0);
}

/**
 * The members probed: the chain holds at least n members (`D.1 … D.n`), and
 * exactly n where `ended` — the board answered that none follows `D.n`.
 * @param {string} addr
 * @param {number} n
 * @param {boolean} [ended]
 */
export function takeMembers(addr, n, ended = true) { const d = doc(addr); d.members = n; d.ended = ended; d.rev++; bump(); }

/** drop a document's delivered state (a feed row named it; the viewport asks again), and where every link's slot projects into it, whether or not the page holds its record — the drop counted first (`dropsOf`), no record made for it — and a failed read of it or of a link homed in it (`takeFailedRead`), which is asked again; where it is an edition claim's home, each document windowing the claim's origin is made again */
export function invalidate(/** @type {string} */ addr) {
  counted(addr);
  const d = state.docs.get(addr);
  const projected = unproject(addr);
  const failed = [...state.failedReads].filter((a) => homeOf(a) === addr);
  for (const a of failed) state.failedReads.delete(a);
  if (d || failed.length) reclause(claiming((c) => homeOf(c) === addr));
  if (d) drop(d);
  if (d || projected || failed.length) bump();
}

/**
 * How many times what the page held of an address has been dropped: by
 * `invalidate`, its record held or not, by a refresh's drop and its setting
 * again (`takeRefresh`, `setAgain`), by an arrival taking a trunk's text
 * (`takeAsMember`), and by every drop of the class
 * (`dropClass`), which drops every record. It never falls, so a read that
 * finds it moved between going out and landing was learned of what the page
 * does not hold.
 * @param {string} addr
 * @returns {number}
 */
export const dropsOf = (addr) => (state.drops.get(addr) ?? 0) + state.classDrops;

/** count one more drop of an address (`dropsOf`) */
const counted = (/** @type {string} */ addr) => { state.drops.set(addr, (state.drops.get(addr) ?? 0) + 1); };

/** a document's delivered state dropped — everything its reads brought; the record stands, its runs and blocks given new empty ones as a delivery gives new ones */
function drop(/** @type {Doc} */ d) {
  d.runs = []; d.blocks = []; d.from = -1; d.to = -1; d.readAt = null; d.extent = null; d.whole = null; d.linkPositions = null; d.meta = null; d.image = []; d.origins = []; d.imageFor = null;
  d.links.clear(); d.linksRead = false; d.members = null; d.ended = false; d.refused = null; d.rev++;
}

// ---- links ---------------------------------------------------------------------

/** `find_links_v`'s answer for a document: the raw set of addresses */
export function takeLinks(/** @type {string} */ addr, /** @type {string[]} */ addrs) {
  const d = doc(addr);
  for (const a of addrs) d.links.add(a);
  d.linksRead = true; d.rev++; bump();
}
/** `read_link`'s answer: the link's slots, its type learned once, its home read from its address whole — the version member it is homed at, where it is one (`homeOf`) — a failed read of it before answered (`takeFailedRead`); where it is an edition claim, each document windowing the claim's origin is made again */
export function takeLink(/** @type {LinkValue} */ v) {
  const home = homeOf(v.addr) || v.addr;
  state.links.set(v.addr, { addr: v.addr, home, owner: accountOf(home), type: v.type, from: v.from, to: v.to });
  state.failedReads.delete(v.addr);
  reclause(claiming((c) => c === v.addr));
  bump();
}
/** @param {string} addr */
export const link = (addr) => state.links.get(addr);
/** the links touching a document, RAW, as delivered and read (unread addresses omitted) */
export function linksTouching(/** @type {string} */ addr) {
  const d = state.docs.get(addr); if (!d) return /** @type {Link[]} */ ([]);
  /** @type {Link[]} */
  const out = [];
  for (const a of d.links) { const l = state.links.get(a); if (l) out.push(l); }
  return out;
}
/** the link addresses a document names that are not yet read */
export function unreadLinks(/** @type {string} */ addr) {
  const d = state.docs.get(addr); if (!d) return /** @type {string[]} */ ([]);
  return [...d.links].filter((a) => !state.links.has(a));
}
/** every link held */
export const links = () => [...state.links.values()];

/** every held document whose links include one of these gains a revision: what its article sets from where they project is made again */
function relink(/** @type {Set<string>} */ named) {
  for (const d of state.docs.values()) for (const a of d.links) if (named.has(a)) { d.rev++; break; }
}

/**
 * `project`'s answer (A-53): where a link's slot sits in a document's current
 * text now — every stretch, in the text's order; none where the end has left
 * that text (a floating end); what the refusal says of the document where the
 * board declined the read (`Declined`). Held until the document's delivered
 * state is dropped (`invalidate`, the session's death).
 * @param {string} link
 * @param {1 | 2} slot
 * @param {string} addr the document projected into
 * @param {Stretch[] | Declined} runs
 */
export function takeProjection(link, slot, addr, runs) {
  let m = state.projections.get(addr);
  if (!m) { m = new Map(); state.projections.set(addr, m); }
  m.set(link + ' ' + slot, Array.isArray(runs) ? [...runs].sort((a, b) => a.pos - b.pos) : runs);
  relink(new Set([link]));
  bump();
}
/**
 * The held projection of a link's slot into a document: its stretches in the
 * text's order, none for a floating end, the refusal it met (`Declined`), or
 * undefined where none is held.
 * @param {string} link
 * @param {1 | 2} slot
 * @param {string} addr
 * @returns {Stretch[] | Declined | undefined}
 */
export const projection = (link, slot, addr) => state.projections.get(addr)?.get(link + ' ' + slot);
/** where every link's slot projects into a document dropped; whether any was held */
function unproject(/** @type {string} */ addr) {
  const m = state.projections.get(addr); if (!m) return false;
  state.projections.delete(addr);
  relink(new Set([...m.keys()].map((k) => k.split(' ')[0])));
  return true;
}

// ---- the edition claims on an origin ---------------------------------------------

/**
 * The feed rows after which the edition claims standing on any origin, or the
 * ones a reader may see, may be others: the five link writes — a claim
 * deposited, its successor, a retraction, a supersession (wire.md §Links
 * (writes)) — and a `publish`, which may publish a claim's home (PUB-5.99) and
 * make a claim homed in it one the reader may read. A bare row whose op the
 * journal could not name serves `op: null` (wire.md §The change feed) and may
 * be any of the six, so `applyFeedUpdate` drops the claims at one naming its
 * link too; one naming nothing marks the board instead (see the head).
 */
const CLAIM_WRITES = new Set(['make_link', 'emit', 'edit_link', 'nullify', 'assert_sup', 'publish']);

/**
 * The edition-claim lookup's answer for an origin (PUB-5.124; M-FRAMES's
 * `editionClaimsAt`), as the page holds it (`Lookup`): the claims listed,
 * 'withheld' or 'unread'. Held until a feed row may have changed them
 * (`applyFeedUpdate`) or the session's death; each listed claim's link
 * (`takeLink`) and its home's metadata (`takeMetadata`) are the page's own
 * reads of them, held beside it, and a failed one of those reads too
 * (`takeFailedRead`). Every held document windowing the origin is made again,
 * as it is wherever a claim's link or its home's metadata arrives, fails or
 * goes: its placeholder's clause is decided again (T-ARTICLE's
 * `editionClause`).
 * @param {string} origin
 * @param {Lookup} claims
 */
export function takeEditionClaims(origin, claims) {
  state.editionClaims.set(origin, Array.isArray(claims) ? [...claims] : claims);
  reclause(new Set([origin]));
  bump();
}
/** the edition claims held on an origin (`Lookup`), or undefined where the lookup has not answered */
export const editionClaimsOf = (/** @type {string} */ origin) => state.editionClaims.get(origin);
/**
 * A read an edition claim's admission waits on failed (PUB-5.99; FP-33):
 * the claim's link (`read_link`), or a document's metadata
 * (`doc_metadata`) — a claim's home's — refused for a reason that says
 * nothing of what it reads, or not answered. Held until a read of it answers
 * (`takeLink`, `takeMetadata`, `takeRefused`), what the page held of it is
 * dropped (`invalidate`), or the class drops every read; each held document
 * windowing the origin of a claim it decides is made again.
 * @param {string} addr the link, or the document
 */
export function takeFailedRead(addr) {
  state.failedReads.add(addr);
  reclause(claiming((c) => c === addr || homeOf(c) === addr));
  bump();
}
/** has a read of a link, or of a document's metadata, failed, unanswered since (`takeFailedRead`)? */
export const readFailed = (/** @type {string} */ addr) => state.failedReads.has(addr);
/**
 * How many times the edition claims held have been dropped — together, at a
 * feed row that may have changed them, and at every drop of the class — so a
 * lookup that finds the count moved between going out and landing was
 * answered of claims the page does not hold. It never falls.
 * @returns {number}
 */
export const claimDrops = () => state.claimDrops + state.classDrops;

/** the origins a document's delivered withheld runs name, each once, in position order */
export function withheldOrigins(/** @type {string} */ addr) {
  const d = state.docs.get(addr);
  return d ? [...new Set(d.blocks.flatMap((b) => (b.kind === 'withheld' && b.origin ? [b.origin] : [])))] : [];
}

/** the origins whose held edition claims list one the test names */
function claiming(/** @type {(claim: string) => boolean} */ named) {
  /** @type {Set<string>} */
  const out = new Set();
  for (const [origin, claims] of state.editionClaims) if (Array.isArray(claims) && claims.some(named)) out.add(origin);
  return out;
}

/** every held document windowing one of these origins in a withheld run gains a revision: its placeholder's clause is decided again from what the page holds now */
function reclause(/** @type {Set<string>} */ origins) {
  if (!origins.size) return;
  for (const d of state.docs.values()) if (d.blocks.some((b) => b.kind === 'withheld' && b.origin !== null && origins.has(b.origin))) d.rev++;
}

/** every edition claim held dropped, the drop counted (`claimDrops`); each held document windowing an origin whose claims were held is made again */
function dropClaims() {
  state.claimDrops++;
  const origins = new Set(state.editionClaims.keys());
  state.editionClaims.clear();
  reclause(origins);
}

// ---- owners, key sets ----------------------------------------------------------

export function takeOwner(/** @type {string} */ addr, /** @type {OwnerRow} */ row) { state.owners.set(addr, row); bump(); }
export const ownerOf = (/** @type {string} */ addr) => state.owners.get(addr);
export function takeKeySet(/** @type {string} */ account, /** @type {{enrolled: Array<{fingerprint: string, anchor: boolean}>, retired: Array<{fingerprint: string}>}} */ ks) { state.keySets.set(account, ks); bump(); }
export const keySetOf = (/** @type {string} */ account) => state.keySets.get(account);

/**
 * The owner account of a document: by `effective_owner` where read, else by
 * its metadata where read, else its account. The one rule an owner is named
 * by — an article's byline and the account its facts are read for
 * (`accountKey`), each withheld run's origin's (T-LAYER's `originOwner`), a
 * withheld document's box (T-LAYER's `withheldBox`) — so none of them part.
 * @param {Doc} d
 * @returns {string}
 */
export function ownerAccount(d) {
  const row = d.account ? state.owners.get(d.account) : undefined;
  return (row && row.prefix) || (d.meta && d.meta.owner) || d.account || '';
}

// ---- the byline's facts --------------------------------------------------------

/**
 * An account's byline facts, read (M-PUMP's `readAccount`): its device key,
 * or why its byline names none (`AccountFacts`). Every held document the
 * account owns (`ownerAccount`) is made again: its byline is decided again
 * from what the page holds now.
 * @param {string} account
 * @param {AccountFacts} facts
 */
export function takeAccountKey(account, facts) {
  state.accountKeys.set(account, facts);
  rebyline(new Set([account]));
  bump();
}
/** an account's byline facts as the page holds them (`takeAccountKey`); undefined while they are not read */
export const accountKey = (/** @type {string} */ account) => state.accountKeys.get(account);
/**
 * How many times the byline causes held have been dropped (`dropKeyCauses`),
 * so a read of an account's facts that finds the count moved between going
 * out and landing learned a cause that may not hold at the board by then. A
 * value never changes, and is taken whatever the count. It never falls.
 * @returns {number}
 */
export const keyDrops = () => state.keyDrops;

/** every held document one of these accounts owns gains a revision: its byline is decided again from what the page holds now */
function rebyline(/** @type {Set<string>} */ accounts) {
  if (!accounts.size) return;
  for (const d of state.docs.values()) if (accounts.has(ownerAccount(d))) d.rev++;
}

/**
 * Every byline cause held dropped — never a value, which never changes — and
 * the drop counted (`keyDrops`); each held document whose owner's cause was
 * held made again, so the view asks its facts again. At a feed row naming a
 * doc 1 (`applyFeedUpdate`), where a credential record is homed (AUTH-2.127):
 * an account that had no genesis may enroll one; and at a change of class.
 */
function dropKeyCauses() {
  state.keyDrops++;
  /** @type {Set<string>} */
  const dropped = new Set();
  for (const [account, facts] of state.accountKeys) if ('cause' in facts) { state.accountKeys.delete(account); dropped.add(account); }
  rebyline(dropped);
}

/** is an address an account's doc 1, or under it — a member of it, an element of it (`docOneOf`)? */
const inDocOne = (/** @type {string} */ addr) => { const a = accountOf(addr), trunk = documentOf(addr); return !!a && trunk === docOneOf(a); };

// ---- the feed ------------------------------------------------------------------

/**
 * A `feed` update as the shell crate defines it (S-24 (b)): the `/changes`
 * row verbatim plus `position` and `class`. The index takes its part
 * (`listRow`). A write drops what the viewport held of every document it
 * touched, each once: each document the row names, with the trunk of a member
 * among them, and the home of the link the row names, with the home's trunk.
 * A bare row — lost testimony, its `docs` reading `null` (wire.md §The change
 * feed) — names its home by its `link` alone, the one link the journal says
 * the write deposited, whether its op is named or `null`; where the journal
 * decides no link the row serves `link: null`, though the shell's shape
 * declares `link` never null. A bare row naming neither — a `nullify` by its
 * op alone, an `edit_link`, a `version`, an arrangement write or a mint,
 * whatever its op — names no document of what it touched, for the journal
 * works out what such a write touched and serves none of it: it drops
 * nothing and marks the board (`bare`), the
 * refresh after the run giving everything held what a row naming it gets (see
 * the head). A row after which the edition claims may be others
 * (`CLAIM_WRITES`, a `null` op among them) drops every one held; a row
 * touching a doc 1 drops every byline cause held (`dropKeyCauses`).
 * @param {FeedUpdate} u
 * @returns {string[]} the addresses dropped, each once: what the view asks again (M-PUMP)
 */
export function applyFeedUpdate(u) {
  const docsNamed = Array.isArray(u.docs) ? u.docs : [];
  state.feed.push({ position: u.position, op: u.op, docs: docsNamed, cls: u.class, time: typeof u.time === 'number' ? u.time : null });
  if (state.feed.length > 2000) state.feed.shift();
  listRow(u);
  const home = typeof u.link === 'string' ? homeOf(u.link) : null;
  if (!Array.isArray(u.docs) && !home) { state.bare = true; bump(); return []; }
  /** @type {Set<string>} */
  const touched = new Set();
  for (const named of home ? [...docsNamed, home] : docsNamed) { touched.add(documentOf(named) || named); touched.add(named); }
  for (const addr of touched) invalidate(addr);
  if (u.op == null || CLAIM_WRITES.has(u.op)) dropClaims();
  if ([...touched].some(inDocOne)) dropKeyCauses();
  bump();
  return [...touched];
}

/**
 * A feed row's part in the index: a mint, a fork, a version or a publish —
 * or any row naming a document the index does not hold — puts the place of
 * the trunk it names, counted where the index held none; a `system` row marks
 * it, held and never drawn; a delegation lists its new account, holding no
 * document yet. Laid over a listing that already holds what the row did
 * (`takeIndex`), it counts nothing twice.
 * @param {FeedUpdate} u
 */
function listRow(u) {
  for (const named of Array.isArray(u.docs) ? u.docs : []) {
    const trunk = documentOf(named) || named;
    const existing = state.index.get(trunk);
    if (u.op === 'create_new_document' || u.op === 'fork' || u.op === 'version' || u.op === 'publish' || !existing) {
      const kind = u.op === 'publish' ? 'edition' : u.class === 'drafts' ? 'draft' : existing ? existing.kind : 'edition';
      const label = existing ? existing.label : null;
      putPlace({ doc: trunk, kind, label, standing: u.class === 'drafts' ? 'yours_to_read' : 'public' });
      const acct = accountOf(trunk);
      if (acct && !existing) state.counts.set(acct, (state.counts.get(acct) || 0) + 1);
    }
    if (u.key === 'system') { const p = state.index.get(trunk); if (p) p.system = true; const d = doc(trunk); d.system = true; }
  }
  if (u.op === 'delegate' && u.new_prefix) { if (!state.counts.has(u.new_prefix)) state.counts.set(u.new_prefix, 0); }
}
/** the feed rows held (the newest last) */
export const feedRows = () => state.feed.slice();

/**
 * The highest member of a trunk's own chain a held feed row names — a
 * `publish` its minted member, an owned `version` its new member, a write
 * homed at one (wire.md §The change feed, `docs`): the chain holds at least
 * that many members, for a member is never unminted and each `D.k+1` is
 * minted against `D.k` (§Namespace, `doc_metadata`). Null where no row held
 * names one.
 * @param {string} trunk
 * @returns {number | null}
 */
export function feedMember(trunk) {
  let k = null;
  for (const r of state.feed) for (const named of r.docs) if (isTrunkMember(named) && documentOf(named) === trunk) { const m = /** @type {number} */ (memberOf(named)); if (k == null || m > k) k = m; }
  return k;
}

/** the commit time of the newest held feed row that carries one, in unix milliseconds: the latest moment the page's feed is known to have held; null where no row held carries a time */
export function feedTime() {
  for (let i = state.feed.length - 1; i >= 0; i--) { const t = state.feed[i].time; if (t != null) return t; }
  return null;
}

// ---- the refresh ---------------------------------------------------------------

/**
 * @typedef {Object} Fresh — what a refresh's reads of one shown document answered (M-PUMP's `refresh`; `setAgain`): each
 * part where its read answered, a part absent standing as held
 * @property {'withheld' | 'unregistered'} [refused] a read of the document refused as one withheld from the reader, or one
 * the board will say nothing of: what it held goes with it
 * @property {Array<{subspace: number, ordinal: number, positions: number}>} [spans] its span set
 * @property {DocMeta} [meta]
 * @property {{runs: Run[], asOf: number | null}} [text] its text over the window it held, as the delivery placed it
 * @property {{from: number, runs: Array<{iStart: string, width: number}>}} [image] its V→I image over that window
 * @property {string[]} [links] the links touching it, as `find_links_v` answered
 * @property {LinkValue[]} [values] the values of those links, each read
 * @property {Array<{link: string, slot: 1 | 2, addr: string, runs: Stretch[] | Declined}>} [projections] where each
 * held projection of a slot of those links stands now, in the document it was asked into
 * @property {{n: number, ended: boolean}} [members] its chain, counted
 * @property {FreshClaims[]} [claims] the edition claims on its withheld runs' origins
 * @property {{account: string, facts: AccountFacts}} [byline] its owner's byline facts, read again where a cause was held
 */

/**
 * @typedef {Object} FreshClaims — the edition claims on one origin as a refresh read them (`Fresh.claims`)
 * @property {string} origin
 * @property {Lookup} lookup the lookup's answer
 * @property {LinkValue[]} values each listed claim's link, read
 * @property {Array<{home: string, meta: DocMeta | null, refused: 'withheld' | 'unregistered' | null}>} homes each listed
 * claim's home's metadata, or what a refusal of it says of the home
 * @property {string[]} failed the claims and homes whose read failed (`takeFailedRead`), the board not answering among them
 */

/** has a feed row naming no document and no link marked the board since a refresh last took the mark (see the head)? */
export const bare = () => state.bare;
/** the board's mark taken as a refresh begins: whether a bare row marked it, the mark gone */
export function unmarkBare() { const was = state.bare; state.bare = false; return was; }
/** the board marked again: a refresh met a read the board did not answer, so what the run changed is still to be taken */
export function markBare() { state.bare = true; bump(); }

/**
 * A newer member's arrival at a trunk read at its bare address (M-PUMP's
 * `arrive`; FP-22, FP-23): the text the trunk's record holds handed to the
 * member that text is — the one its box shows now (N-GO's `arrived`) — its
 * runs and blocks, its image and the position it was read at, and its extent
 * where the member holds none, so the box keeps the text it shows; the trunk
 * keeps none of it, for its bare address answers the newer member now, a read
 * of it out from before the arrival counted dropped (`dropsOf`). Nothing where
 * the trunk holds no text, or the member holds text of its own.
 * @param {string} trunk
 * @param {string} member
 * @returns {boolean} whether the text was handed
 */
export function takeAsMember(trunk, member) {
  const t = state.docs.get(trunk), held = state.docs.get(member);
  if (!t || t.from < 0 || (held && held.from >= 0)) return false;
  const m = doc(member);
  m.runs = t.runs; m.blocks = t.blocks; m.from = t.from; m.to = t.to; m.readAt = t.readAt;
  m.image = t.image; m.origins = t.origins; m.imageFor = t.imageFor; m.refused = null;
  if (m.extent == null) { m.extent = t.extent; m.whole = t.whole; m.linkPositions = t.linkPositions; }
  t.runs = []; t.blocks = []; t.from = -1; t.to = -1; t.readAt = null; t.image = []; t.origins = []; t.imageFor = null;
  counted(trunk);
  m.rev++; t.rev++; bump();
  return true;
}

/**
 * Every held projection of a slot of one of these links: the link, the slot
 * and the document it was asked into — what a refresh asks again (M-PUMP's
 * `refresh`).
 * @param {Set<string>} links
 * @returns {Array<{link: string, slot: 1 | 2, addr: string}>}
 */
export function projectionsOf(links) {
  /** @type {Array<{link: string, slot: 1 | 2, addr: string}>} */
  const out = [];
  for (const [addr, m] of state.projections) for (const k of m.keys()) { const [link, slot] = k.split(' '); if (links.has(link)) out.push({ link, slot: slot === '1' ? 1 : 2, addr }); }
  return out;
}

/**
 * A refresh's drop (FP-23): what a feed row naming each document held would
 * drop, but for the documents `keep` names — those shown,
 * and the members an advanced edition's text was handed to — and what their
 * drawing reads through: every other record's delivered state, each counted
 * dropped (`dropsOf`), the homes of the edition claims on a kept document's
 * withheld runs' origins kept, whose metadata decides the clause there
 * (T-ARTICLE's `editionClause`); every link value no kept document lists and no
 * kept claim is; where the slots of every other link project; the edition
 * claims on every other origin, the drop counted (`claimDrops`); a failed read
 * of anything not kept; every byline cause but a kept document's owner's, the
 * drop counted (`keyDrops`). The index, its counts and its state, the feed's
 * rows, the owners and the key sets, which no row drops, stand. M-PUMP reads
 * again what each shown document holds and sets it again (`setAgain`).
 * @param {Set<string>} keep
 * @returns {string[]} the documents dropped
 */
export function takeRefresh(keep) {
  const kept = [...keep].flatMap((a) => { const d = state.docs.get(a); return d ? [d] : []; });
  const origins = new Set(kept.flatMap((d) => withheldOrigins(d.addr)));
  const claims = [...origins].flatMap((o) => { const c = state.editionClaims.get(o); return Array.isArray(c) ? c : []; });
  const homes = new Set(claims.map((c) => homeOf(c) || c));
  const linked = new Set(kept.flatMap((d) => [...d.links]));
  const named = new Set([...linked, ...claims]);
  const owners = new Set(kept.map(ownerAccount));
  /** @type {string[]} */
  const dropped = [];
  for (const d of state.docs.values()) {
    if (keep.has(d.addr) || homes.has(d.addr)) continue;
    counted(d.addr); drop(d); dropped.push(d.addr);
  }
  for (const a of [...state.links.keys()]) if (!named.has(a)) state.links.delete(a);
  for (const [addr, m] of [...state.projections]) {
    for (const k of [...m.keys()]) if (!linked.has(k.split(' ')[0])) m.delete(k);
    if (!m.size) state.projections.delete(addr);
  }
  for (const o of [...state.editionClaims.keys()]) if (!origins.has(o)) state.editionClaims.delete(o);
  state.claimDrops++;
  for (const a of [...state.failedReads]) if (!named.has(a) && !homes.has(a)) state.failedReads.delete(a);
  state.keyDrops++;
  for (const [account, facts] of [...state.accountKeys]) if ('cause' in facts && !owners.has(account)) state.accountKeys.delete(account);
  bump();
  return dropped;
}

/**
 * A shown document set again from a refresh's fresh reads (FP-23), in one
 * step: each part the reads carried replacing what the record held of it —
 * its text and its image whole
 * over the window read, never merged with what they replace, given new arrays
 * as a delivery gives them, so an article made from the old keeps it and
 * carries the words being read by their bytes' identity (T-LAYER) — each part
 * they did not carry standing as held, and the drop counted (`dropsOf`), so no
 * read out from before it is taken; a document refused as withheld or not
 * registered dropped whole, the refusal held. With it, in the same step, the
 * values of its links read, where their slots project, the edition claims on
 * its withheld runs' origins with the reads each claim's admission waits on,
 * and its owner's byline facts.
 * @param {string} addr
 * @param {Fresh} fresh
 */
export function setAgain(addr, fresh) {
  const d = doc(addr);
  counted(addr);
  if (fresh.refused) { drop(d); d.refused = fresh.refused; state.failedReads.delete(addr); }
  else {
    if (fresh.spans) spanSetInto(d, fresh.spans);
    if (fresh.meta) metaInto(d, fresh.meta);
    if (fresh.text) { d.runs = []; d.blocks = []; d.from = -1; d.to = -1; d.readAt = null; deliverInto(d, fresh.text.runs, fresh.text.asOf); }
    if (fresh.image) { d.image = []; d.origins = []; imageInto(d, fresh.image.from, fresh.image.runs); }
    if (fresh.links) { d.links = new Set(fresh.links); d.linksRead = true; }
    if (fresh.members) { d.members = fresh.members.n; d.ended = fresh.members.ended; }
    if (fresh.spans || fresh.meta || fresh.text) d.refused = null;
  }
  d.rev++;
  for (const v of fresh.values ?? []) takeLink(v);
  for (const p of fresh.projections ?? []) takeProjection(p.link, p.slot, p.addr, p.runs);
  for (const c of fresh.claims ?? []) {
    for (const h of c.homes) { if (h.meta) takeMetadata(h.home, h.meta); else if (h.refused) takeRefused(h.home, h.refused); }
    for (const v of c.values) takeLink(v);
    for (const a of c.failed) takeFailedRead(a);
    takeEditionClaims(c.origin, c.lookup);
  }
  if (fresh.byline) takeAccountKey(fresh.byline.account, fresh.byline.facts);
  bump();
}

/** reset everything (tests) */
export function _reset() {
  state.board = null; state.noBoard = null; state.session = null; state.sessionDied = null; state.sessionRefused = null; state.reconnect = null; state.health = null; state.mode = null;
  state.keys = null; state.daemon = null; state.index.clear(); state.counts.clear(); state.indexState = null; state.bare = false; state.docs.clear();
  state.links.clear(); state.projections.clear(); state.drops.clear(); state.classDrops = 0; state.readBefore = new Set(); state.editionClaims.clear(); state.failedReads.clear(); state.claimDrops = 0;
  state.owners.clear(); state.keySets.clear(); state.accountKeys.clear(); state.keyDrops = 0; state.feed = []; state.rev = 0;
}

/** a deep, serializable picture of the model for the gate and the fake-port test */
export function snapshot() {
  return {
    board: state.board, session: state.session ? { principal: state.session.principal, account: state.session.account } : null,
    mode: state.mode, daemon: state.daemon, indexState: state.indexState,
    index: places().map((p) => [p.doc, p.kind, p.label, p.system]),
    counts: [...state.counts.entries()].sort(),
    docs: docs().filter((d) => d.from >= 0 || d.extent != null || d.meta).map((d) => ({ addr: d.addr, extent: d.extent, from: d.from, to: d.to, blocks: d.blocks.length, links: [...d.links].sort(), members: d.members, origins: d.origins })).sort((a, b) => cmpAddr(a.addr, b.addr)),
    links: links().map((l) => ({ addr: l.addr, home: l.home, type: l.type, from: l.from.map((e) => e.start), to: l.to.map((e) => e.start) })).sort((a, b) => cmpAddr(a.addr, b.addr)),
  };
}
