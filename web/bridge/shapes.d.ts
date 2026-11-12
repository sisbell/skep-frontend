// skep-shell — the bridge's declarations (client.md §4b), generated from
// the crate's tables (`SHAPES` and `CALL_ROWS` in `src/shapes.rs`); every
// field name of a value the shell answers or emits is pinned by the crate's
// own suite against the values its code builds, and every optional argument
// member against the row that reads it.

export type Mode = 'UNCLAIMED' | 'CLAIMED-PERMISSIVE' | 'ENFORCING';
export type Empty = Record<string, never>;
export type Standing = 'public' | 'yours_to_read' | { held: { kind: 'named' | 'any_principal'; rung: 'document' | 'account'; issuer: string } };
export interface SearchOpts { limit?: number; offset?: number; reindex?: boolean }
export interface PlacesOpts { under?: string }
export type RowKind = 'own' | 'notes' | 'private' | { public: { read_with: boolean } };
export type Destination = 'member' | { set: string };
export type OriginAnswer = 'publish_first' | 'drop' | 'keep_private' | 'counterpart';
export type Placement = { whole: { ordinal: number } } | { places: number[] } | { split: [number, number, number][] } | 'absent';
export type Term = 'runs' | 'places' | 'links' | 'retract' | 'read_with' | 'body' | 'values' | 'reads' | 'bytes';
export type AckVia = 'answer' | 'twin' | 'records' | 'walk' | 'edition_claim';
export type Inert = 'unchanged' | { unanswered: { run: number; part: number; named: boolean }[] } | { publish_first: { run: number; part: number }[] };
export type Missing = { copy: number } | { retraction: number };
export type HandKey = 'own' | 'other' | 'bare' | 'lost' | 'unread';
export type BaseStanding = 'at_head' | 'behind' | 'first' | 'superseded_first';
export type GapKind = 'order' | 'anchor' | 'corner' | 'cut' | 'collision' | 'moves';
export type GapPlacement = number[] | 'after' | 'before' | 'omitted';
export type MergeChoice = 'keep_both' | 'omit' | { order: number[] } | { keep_only: number } | { after: string } | { before: string };
export type Refusal = RefusedByBoard | HaltFace | BlockedFace | Unreachable | HeldLinesRefusal | WindowPartsOwedRefusal | LandingUnreadRefusal | NoOwnNodeRefusal | OtherPanelRefusal | ShellRefusal;
export type Outcome<T> = { result: T } | { refused: Refusal };
export type EventName = 'mode' | 'session-died' | 'daemon' | 'feed' | 'index' | 'moment' | 'held' | 'publication' | 'another-window';

/** `boards()` — one entry per board in the shell's list; `board` the opaque reference every board-touching call takes; this machine's notebook absent from the list while the shell holds it unstarted — before `node.start`, the notebook door's act, or `node.restart` has started it, and again once a stop whose `/health` read found it unclaimed has stopped it, `node.stop`'s or a claim's cancel or close (L1) */
export interface BoardRow {
  board: string;
  name: string;
  origin: string;
}

/** `session(board, principal)` — the session's opaque reference in the token's place; `writes` whether the session itself may write: the signed mode's session writes, the bare mode's keyless one reads alone and has every write refused `write_in_bare_session` — the board's own state can refuse a write beside it: the own node stopped, its writes halted or its write path poisoned (§3c.4), which this answer does not report, or another shell holding its held store (§3c.3), which it reports; `fingerprint` the key the session was opened with, a signed session's, spelled as the `fingerprint()` rows spell it — the page takes the key's label from the row of that fingerprint and never works the key out from the rows' bindings, which cannot tell two keys bound for one principal apart — and `null` for a bare session, which holds none (skep #579); `another_window` present, `true`, only while another shell over the data directory holds the board's held store as the session opens — every write at the board refused `another_window`, nothing held and nothing sent, whatever `writes` says — every later edge of that state an `another-window` event (skep #827); `opened_at` the board's position read before the session opened, where its drafts feed starts — the position a page keeps as its last drafts row's (`draftsAt`) until a row moves it, and reads `changes(session, since, class: 'drafts')` from after the session's end */
export interface SessionOpened {
  session: string;
  principal: number;
  account: string | null;
  writes: boolean;
  fingerprint: string | null;
  opened_at?: number;
  another_window?: true;
}

/** `keygen({label?})` — the device key's fingerprint, its enrollment record, and the outstanding act */
export interface Keygen {
  fingerprint: string;
  payload: string;
  outstanding: string;
}

/** `fingerprint({select?, payload?})` — one key of the store, its bindings, the pending state */
export interface FingerprintRow {
  fingerprint: string;
  label: string | null;
  bindings: string[];
  unbound: boolean;
  payload: string | null;
}

/** `claim(board, opts)` — the three facts and the agent space; the display name held */
export interface Claimed {
  account: string;
  principal: number;
  fingerprint: string;
  agent_space: string | null;
  display_name: string | null;
  warnings: string[];
}

/** the three facts of a return leg */
export interface Facts {
  principal: number;
  account: string;
  origin: string;
}

/** `enroll(board, payload)` */
export interface Enrolled {
  facts: Facts;
  fingerprints: string[];
  reconciled: boolean;
  warnings: string[];
}

/** `bind(board, facts)` — empty, or the warning an unwritable store returns */
export interface Bound {
  warning?: string;
  warnings?: string[];
}

/** `recover(board, opts)` */
export interface Recovered {
  facts: Facts;
  enrolled: string[];
  retired: string[];
  containment: boolean;
  recovery_read: string[];
  warnings: string[];
}

/** `rotate(board, opts)` */
export interface Rotated {
  facts: Facts;
  old: string;
  new: string;
  trail: string;
  warnings: string[];
}

/** `handoff(board, {account})` without a payload — beat (a)'s address */
export interface HandoffDelegated {
  address: string;
  principal: number;
  already: boolean;
}

/** `accept(board, opts)` — the enrollment record for the giver */
export interface Accepted {
  payload: string;
}

/** `health(board)` — the `/health` document verbatim and the derived mode */
export interface Health {
  health: unknown;
  mode: Mode;
}

/** `probe()` — the state the `daemon` event says of the own node or, where the shell runs none, the first board, taken after the call's own `/health` read: the most severe that holds, `stopped`, `unreachable`, `halted`, `head_unreadable` with its `reason`, else `running`; `node.start`, the notebook door's act, answers it once the node is started, a node already running started no second time; `node.stop` once the node is stopped, a node already stopped asked nothing; and `node.restart` once the node is stopped and started again — the act that clears a halt, a poison or a silence, the start's door asked before anything stops — a stopped notebook's restart its start (L1) */
export interface Probe {
  daemon: 'running' | 'stopped' | 'unreachable' | 'halted' | 'head_unreadable';
  reason?: string;
  dialed: string | null;
  signed: string | null;
}

/** `search(…)` — the hits, the places, the pair's state */
export interface SearchAnswer {
  hits: Hit[];
  places: Place[];
  state: IndexState;
  total: number;
  truncated: boolean;
  more_terms: boolean;
  fuzzy_bounded: boolean;
  positions_bounded: boolean;
}

/** one hit (search.md §3.1) */
export interface Hit {
  doc: string;
  member: string | null;
  as_of: number;
  span: SpanText;
  score: number;
  snippet: Snippet | null;
  kind: 'edition' | 'draft';
  standing: Standing;
  occurrences: number;
  matched: Matched[];
}

/** a hit's passage: the V-ordinal of its first byte and its width in positions */
export interface SpanText {
  start: number;
  width: number;
}

/** the paragraph window around a hit's span */
export interface Snippet {
  text: string;
  start: number;
  marks: Mark[];
}

/** one mark of a snippet */
export interface Mark {
  offset: number;
  len: number;
  kind: { span: true } | { term: string } | { gap: { width: number } };
}

/** a query word matched by one edit */
export interface Matched {
  word: string;
  term: string;
}

/** one document of the document index — an exact address or label match `search` answers, or a document `places` lists */
export interface Place {
  doc: string;
  kind: 'edition' | 'draft';
  label: string | null;
  standing: Standing;
}

/** `places(…)` — every document of the board's document index at the call's class, in address order, under `opts.under` where given; the counts per account over them; the pair's state */
export interface PlacesAnswer {
  docs: Place[];
  counts: AccountCount[];
  state: IndexState;
}

/** how many of a listing's documents lie under one account, the counts in address order */
export interface AccountCount {
  account: string;
  documents: number;
}

/** `changes(session, since, limit?, class?, under?)` and its guest form — what changed since the position `since`: the entries in the `feed` update's shape, oldest first, each `published` or `drafts` by the read that answered it — under a session two reads, the published feed as a guest and the session's drafts supplement under its token, merged by position; with `class: 'drafts'`, the one value the member takes, the drafts supplement's page alone (a page's read, from the session's `opened_at`, of the drafts rows an end cut off before it regained a session); as a guest, `{guest: true, board?, origin?, since, limit?, under?}`, the published feed alone, token-free (no `class`); with `under`, an address of any level in its one spelling — a draft, a document, an account — every read the form makes is the board's `under=` narrowing (PUB-7.31): the rows whose reduced `docs` name a document at or under it, masked as the plain feed is, so a draft the caller may not read answers no row, `next` at the head — one draft's history, a row per change with its `key` or `attest` and its `time` (skep #652), the wire's two residues of lost testimony standing (wire.md §The change feed, Narrowings); `next` the position to ask from next time, past every entry answered and never past one withheld — under `under`, a position of the narrowed feed: asked again with the same `under` it misses no row under the address, and it read no row outside it, so a page keeps it apart from the positions it holds for the whole feed (`feedAt`, `draftsAt`) and never moves those by it; `head` the board's latest position, read before the page, and the floor `history_reclaimed` names the board's, narrowed or not; the shell keeps no position — every form reads from `since` */
export interface ChangesAnswer {
  entries: FeedUpdate[];
  next: number;
  head: number;
}

/** a refusal: the board's own verdict, verbatim; `site` the fault's place as the wire names it (wire.md §Rejections), each member absent where the code carries none — `addr` the address the code names (`already_published`'s member, `not_owner`'s document, `withheld`'s origin), `index` the entry (`kept_place_moved`'s `runs` entry, a deposit's entry in its own list) and `fault` the span fault beside it, `operand` and `region` a compare input's, `slot` an `edit_link` successor's slot, `as_of` and `current` an `arrangement_moved`'s two states — the one the refused burst was typed against, echoed, and the position the document's arrangement last changed at */
export interface RefusedByBoard {
  kind: 'refused';
  name: string;
  status: number;
  code: string;
  detail: string | null;
  op: string | null;
  site: { addr?: string; index?: number; operand?: 'first' | 'second'; region?: number; slot?: number; fault?: string; as_of?: number; current?: number };
  body: unknown;
}

/** a refusal: a halt's face under the armed name */
export interface HaltFace {
  kind: 'halt';
  name: string;
  state: string;
  cause: string;
  act: string;
}

/** a refusal: the block */
export interface BlockedFace {
  kind: 'blocked';
  name: 'blocked';
  record: string;
  named_by: string;
  ground: string | null;
}

/** a refusal: the board is not answering */
export interface Unreachable {
  kind: 'unreachable';
  name: 'unreachable';
  text: string;
}

/** a refusal: the shell's own `held_lines` (§3c.4, THE HELD-LINES GATE; skep #849, #854) — a whole-draft write (`history.restore`, `merge.land`, `merge.undo`, `merge.withdraw`, `publication.confirm` over the rendering draft or a draft `also` names) refused at the shell's one write door, nothing sent, while `doc`, a draft it writes, holds `held` lines of the acting principal's the board has not kept, in any state (holding, sending, refused, moved, `head_unreadable`, `session_died`); the page draws the slot inert ahead of the act with B3-S13's row rule ("⟨label⟩ holds words the board has not kept — resolve them where they are marked, then take this"), and this is that rule's answer for a write that arrives anyway: `held(session)` lists the lines, `resolve` acts on each, the write then goes out; a burst on such a draft is held `behind` the lines, never refused so */
export interface HeldLinesRefusal {
  kind: 'shell';
  name: 'held_lines';
  doc: string;
  held: number;
}

/** a refusal: the shell's own `window_parts_owed` (skep #932) — `merge.land`, or an agent's merge tool once one lands, met a window part with no answer: nothing was published, and the landing composes no answer the caller did not give, at any window part. FINAL in meaning and the same for every caller, `skep merge --publish`'s printed refusal composed from the same library data. `parts` every part that needs an answer, `answers` the answers that stand beside them, `misfits` an answer of the shot's that fits nothing or names words another also answers, `left_private` the private sets the shot left out of `merge.land` (each with its count, none at the shot), `defaults` the merge's places left at their defaults (kind, where, as placed). `merge.land` then again with `answers` in the panel's form, each part keyed `⟨run⟩.⟨part⟩` */
export interface WindowPartsOwedRefusal {
  kind: 'shell';
  name: 'window_parts_owed';
  parts: WindowPart[];
  answers: WindowPart[];
  misfits: WindowMisfit[];
  left_private: LeftPrivate[];
  defaults: MergeDefault[];
}

/** a refusal: the shell's own `landing_unread` (§3c.4; skep #866, #983) — `resolve(session, {held, act: 'drop'})` under a session that may write, on a line marked `sent` that is holding or handed over as `answers_lost`, reads for the line's landing before it drops anything, since a dial whose answer was lost can commit late and a `poisoned` commit is rebuilt at the board's restart — no read where the shell knows no dial of the line left this device; where that read cannot tell, nothing is dropped and the drop is refused naming `held`, the line, and `why`: `unanswered` the board gave the read no answer, or is not answering the shell, which then makes no read; `unread` the board answered it with no page; `undecided` a row could be the line's landing and the read could not confirm it; `stopped`, `poisoned` or `halted` that hold stands at the board, no read made — the drop is asked again once the board answers and takes writes, and an `undecided` line leaves by `send` where it was handed over, which the board judges by its typed state, and by the probe's resend where it is holding; the page draws the line as still held, never as discarded */
export interface LandingUnreadRefusal {
  kind: 'shell';
  name: 'landing_unread';
  held: number;
  why: 'unanswered' | 'unread' | 'undecided' | 'stopped' | 'poisoned' | 'halted';
}

/** a refusal: the shell's own `no_own_node` (L1) — `node.start`, `node.stop` or `node.restart` at a shell that runs no node on this machine, the verb that opened it having handed it no start and stop of one, as a shell over boards elsewhere hands none; `call` the call refused; nothing is started or stopped, and `boards()` lists what it listed */
export interface NoOwnNodeRefusal {
  kind: 'shell';
  name: 'no_own_node';
  call: string;
}

/** a refusal: the shell's own `other_panel` (skep #956) — `merge.land` where the family's panel of the draft the composition landed in, standing or held, publishes into another document than the composition's or mints an edition: a shot through it would publish the merge outside the document merged, so nothing is composed or sent, and that panel with every switch and answer the person set, the family's standing panel and the composition stand as they were; `draft` the draft, and exactly one of `doc`, the document the panel publishes into, and `mint`, the account it mints an edition under, as `publication.open` took them; the way on is `publication.cancel` of that panel — a held one re-opened by `publication.open` first — then `merge.land` again, which opens its own panel at the composition's document; confirming that panel instead publishes the draft as a document of its own, and the next `merge.land` is refused `base_unrecorded` */
export interface OtherPanelRefusal {
  kind: 'shell';
  name: 'other_panel';
  draft: string;
  doc?: string;
  mint?: string;
}

/** a refusal: the shell's own, its detail beside the name (`held_lines`'s declared whole as `HeldLinesRefusal`, `window_parts_owed`'s as `WindowPartsOwedRefusal`, `landing_unread`'s as `LandingUnreadRefusal`, `no_own_node`'s as `NoOwnNodeRefusal`, `other_panel`'s as `OtherPanelRefusal`) */
export interface ShellRefusal {
  kind: 'shell';
  name: string;
  [member: string]: unknown;
}

/** `mode(board, …)` — the pair moved */
export interface ModeEvent {
  board: string;
  mode: Mode;
  claimant: string | null;
  local_trust: boolean;
}

/** `session-died(session, reason)` */
export interface SessionDiedEvent {
  session: string;
  reason: DeathReason;
}

/** the reason a death carries: its `arm`, the trigger it names, and the arm's own members beside it, each declared here and present on its arm alone, `fingerprint` on two — the `restart` arm's `reopened`, with `session` the reference the shell re-opened silently in the dead one's place and `fingerprint` the key that session was opened with where it did (the page takes the key from here as it takes a session's from the `session` answer; skep #579), and `refused` the name of the re-open's refusal where one was tried and refused; the `mode` arm's `mode`, the pair the bare session died at the flip to; the `unreachable` arm's `text`; the `retired` arm's `fingerprint`, the key retired, `own`, `hand`, `position` and `label` — `own` null where the fork on whose key retired it cannot be taken (no record read, a hand the read could not name, or the shell's key store unlisted beside another hand), its `position` the one read whatever the hand (AUTH-5.77's no-hand form); the `seeded` arm's `account`, `as_of` and `writer`; the `blocked` arm's `record` and `ground`; the `closed` arm carries nothing beside */
export interface DeathReason {
  arm: 'closed' | 'mode' | 'retired' | 'seeded' | 'blocked' | 'restart' | 'unreachable';
  reopened?: boolean;
  session?: string;
  refused?: string;
  mode?: Mode;
  text?: string;
  fingerprint?: string;
  own?: boolean | null;
  hand?: string | null;
  position?: number | null;
  label?: string | null;
  account?: string;
  as_of?: number;
  writer?: string | null;
  record?: string;
  ground?: string | null;
  [member: string]: unknown;
}

/** `daemon(board, state)` — the board's state, the most severe that holds, once per change, never repeated at a tick: `stopped` and `running` as the own node's owner stops and starts it, nothing else said while the stop stands — a notebook the shell starts itself says nothing before `node.start`, `running` at that start and at `node.restart`'s, and `stopped` at `node.stop`, at `node.restart` before its start, and at a claim's cancel or close that stops it unclaimed (L1); else `unreachable` where a `/health` read of the board goes unanswered, the probe's verdict alone, never one request's failure, the commit stream's among them (P37; skep #863); else `halted` where a `/health` read says the board's writes are halted; else `head_unreadable` where the board's head record will not read, `reason` saying why, told before any write meets it (§3c.3; skep #865); else `running`. A board halted whose head record will not read says `halted`, then `head_unreadable` when the halt clears, then `running` */
export interface DaemonEvent {
  board: string;
  state: 'running' | 'stopped' | 'unreachable' | 'halted' | 'head_unreadable';
  reason?: string;
}

/** `feed(board, update)` */
export interface FeedEvent {
  board: string;
  update: FeedUpdate;
}

/** the `/changes` row verbatim, with `position` and `class` — THIS CRATE's definition of the update's shape, a `feed` event's `update` and a `changes` entry alike; a `drafts` row goes out once per session of its principal at the board, each event naming its own `session` */
export interface FeedUpdate {
  position: number;
  at: number;
  op: string | null;
  docs: string[] | null;
  class: 'published' | 'drafts';
  session?: string;
  key?: string | null;
  time?: number | null;
  attest?: { alg: string; sig: string } | null;
  new_prefix?: string;
  new_id?: number;
  link?: string;
  placed?: string;
  base_extent?: string | null;
  base?: string | null;
  merge?: { sides: string[]; head: string } | null;
}

/** `index(board, session?, state)` — a face's state where it moved: the guest's, `session` null, or a principal's, once per session of the principal at the board, each event naming its own */
export interface IndexEvent {
  board: string;
  session: string | null;
  state: IndexState;
}

/** the index's ten arms; the arm's own members beside it */
export interface IndexState {
  arm: 'none' | 'building' | 'widening' | 'complete' | 'at_the_floor' | 'resumed_from_the_floor' | 'unplaced' | 'past_the_ceiling' | 'newer_skep' | 'busy';
  [member: string]: unknown;
}

/** `moment(id, kind, data)` — a PUBLIC moment of a walk; answered by `answer(id, value)` — a string for a `label`, or `null` where its `data.default` names one, the answer then that default; a string for an `ask`; a boolean for a `yes_no` — or declined by `cancel(id)` where `answerable` */
export interface MomentEvent {
  id: string;
  kind: 'statement' | 'label' | 'ask' | 'yes_no';
  data: unknown;
  walk: string;
  board: string | null;
  answerable: boolean;
}

/** `answer(id, value)` — `value` of the form its moment's kind takes (`MomentEvent`), else `malformed_args` naming `value`, the moment still waiting; `no_such_moment` where no moment of that id waits */
export interface Answer {
  id: string;
  value: unknown;
}

/** `cancel(id)` */
export interface Cancel {
  id: string;
}

/** the `op` answer where the burst's board is HELD (§3c): the shell's own answer, never `ack` — the page takes it as accepted and not acked; `cause` the hold's token — `session_died` where the death signal met the burst, at its dial or, the board having refused it as typed against an older state, at the shell's read for its shift or for the hands that moved its document, the session then ended and its `session-died` naming the arm (§3c.4) — and `unwritable` — why — where the device refused the line's copy, or refused a copy the held file still owes an earlier line of the principal's at the board — its first copy, a re-mark or its `done` (the line waits behind it, both written in order once the device takes them) — or refused the held store itself: the held directory or its lock could not be made, the held file could not be read, or an earlier run's lines in it could not be renumbered past this run's — the burst held in memory alone, owed to the file, and written at the first retry the device takes (a board unclaimed or away, or whose head will not read, keeps no line in memory: its lines go to the pending file from the first touch, and another shell's hold on the store refuses the burst `another_window` instead, §3c.3); and `unwritable_class` beside `unwritable`, always with it, the class the page keys its act by, read off the refusal's kind and never its words, which differ by platform (§3c.3's face): `full` a full disk or a spent quota, which space freed on this device ends, the shell's retry then writing the line, `read_only` a read-only volume or a write the shell has no right to make, which no space freed ends, `other` every other kind of I/O refusal — a line waiting behind a refused copy carrying that copy's class unchanged */
export interface HeldAnswer {
  resp: 'held';
  held: number;
  cause: string;
  unwritable?: string;
  unwritable_class?: 'full' | 'read_only' | 'other';
}

/** `held(session)` — one held burst of the acting principal at the session's board, in resend order (§3c.2): `held` the ordinal — the line's for the shell's life, naming it until it leaves and no other line after (skep #856) — `doc` the draft, `base` the resend's read start, `frame` the wire frame (no attest) — the page's as composed, or as the shell last shifted it through another writer's change, every position it names moved by one displacement and its `as_of` the state they are true of, its `id` the page's own: a resend dials the line under an `id` the shell draws for it, `shell:` and hex, which never crosses the bridge, and no burst of the page's may carry that prefix (skep #971) — `anchors` the page's, where the burst carried them (the `op` row's member): the identities on either side of the span the frame edits and, for a delete or a rearrange, the I-runs of the units it holds, by which the shell shifts it — an edge naming words the board has not minted yet an `AnchorPiece` until the line it names is kept and the shell places it at the words' address, and the whole member absent once that line left the queue with no address of them known (skep #969) — `sent` whether a dial of the line was attempted since the last read, so it may have landed — a first dial whose answer was lost (the board's `internal_panic` among them), a `poisoned` answer, or any resend, which marks its line before it dials (§3c.2) — kept through a move, and read for its landing before the person's drop drops the line, save where the shell knows no dial of it left this device (`Resolve`; skep #866, #983), `refusal` the verdict for a refused run — the board's, a refusal at a resend under a code the shell's table holds nowhere among them, handed to the person at once, or the shell's `answers_lost` where it handed the person a line no landing of which was found two minutes after its first failed send, whatever the failure (§3c.4): `last` the last failure's token, the held cause or the board's, and `elapsed_ms` the milliseconds since that first failed send — its `sent` kept, a drop of it then reading for its landing first (`Resolve`; skep #866); at a line held `moved` because the board refused it as typed against an older state and the shift could not move it through the change exactly, the board's `arrangement_moved` (`site.as_of` the state it was typed against, `site.current` the document's); at a line held `head_unreadable`, the shell's refusal naming why its signature could not be made, the line holding all the same (SP-14); at a line held `session_died`, the shell's `session_died` refusal once the session's end derives the death, its `reason` the death's arm (§4b.2; the `retired` arm's `own` among its members), the line holding all the same until a session of the principal's that may write stands and resends it (§3c.4); `sendable` on a moved document's first moved line (§3c.5; skep #867): what `resolve(send)` would do now, true where it would shift the line into the text as it now stands, false where it would hold it moved again — always false for a line with no anchors or no span, a burst an agent sent among them — and absent where the shell does not know, the image read having gone unanswered or been refused, and under the keyless session; it never changes what `resolve` does; `unwritable`, with `unwritable_class` always beside it, as the `op` answer spells them (`HeldAnswer`), while the line stands on no file — in memory alone, the device having refused its copy or a copy owed before it, so a close loses it — and absent once the retry writes it (§3c.3; skep #860); a line parked on the pending file has a copy a close keeps and carries neither, and a line whose `done` the file still owes has left the queue and is on no row */
export interface HeldRow {
  held: number;
  doc: string;
  base: number;
  frame: unknown;
  anchors?: Anchors;
  cause: string;
  sent: boolean;
  time: number;
  refusal?: unknown;
  sendable?: boolean;
  unwritable?: string;
  unwritable_class?: 'full' | 'read_only' | 'other';
}

/** the identities a burst's edit is placed by (skep #442, #751), sent beside the frame on the `op` row and kept with the held line, never on the wire — the whole within the board's frame cap as compact JSON, anchors past it refused `malformed_args` naming `anchors`: `before` the I-address of the unit just before the span the burst edits, `after` the I-address of the unit just after it — in the tumbler-string form `image` answers an `i_start` in, the run's position added — each `null` at the document's edge, or an `AnchorPiece` naming words of a burst the board has not minted yet, which the shell places at their address once it has (skep #969); an insert, a copy or a reinstate names the units on either side of its `at`, a delete those on either side of its `width` positions from `p`, a rearrange those on either side of its first cut to its last; `span`, for a delete and a rearrange alone, the I-runs of the units between the two, in V order, as the page's `image` read gave them — `start` an I-address, `width` a natural of 1 or more as a decimal string, the widths summing to the span's positions; where the board refuses the burst as typed against an older state, the shell finds `before` and `after` in the document's current image and, where each stands at one place and the units between them are the span's own — none for an insert, a copy or a reinstate, so the two stand adjacent; for a delete or a rearrange its `span`, compared run for run with adjacent runs joined on both sides, so a span another writer cut, filled, emptied and refilled with as many others, or rearranged is not whole — moves every position the frame names by their one displacement and sends it again; else the document is held as moved; a burst sent without anchors, or a delete or a rearrange without its `span`, is held as moved there */
export interface Anchors {
  before: string | AnchorPiece | null;
  after: string | AnchorPiece | null;
  span?: { start: string; width: string }[];
}

/** an edge of a burst's `Anchors` naming words the board has not minted yet (skep #969): the unit `offset` positions — counted from 0 as the board seats them, a byte of a string, one per atom — into the words of the insert the session sent on the same document with the envelope `id` `burst`, a string of at most 128 bytes; where that insert stands held, the burst holds `behind` its line, and once that line is kept the shell places the edge at the I-address the insert's words were minted at advanced by `offset` — read off its ack's `addr`, or, where the resend found its landing, off an `image` of its site at the position the landing was confirmed at — the held file's `done` carrying the address; where it is no longer held, the newest insert of that `id` kept on the document among the session's principal's last 64 the shell remembers places the edge at once; else the burst is refused `no_such_burst` `{anchor, burst}`, `anchor` the edge, and `malformed_args` naming `anchors.before` or `anchors.after` where the burst named is no insert or `offset` is not below its positions, nothing held or dialed; a line whose named words left the queue with no address of them known — dropped, or kept where no read found their address — loses its anchors, said in the shell's own window, and is held as moved where the board refuses it as typed against an older state; `burst` names the newest insert of its `id` among the principal's — held under any of its sessions, the one a restart re-opens among them — so a page keeps its ids unique across its reloads and the principal's other pages */
export interface AnchorPiece {
  burst: string;
  offset: number;
}

/** a PIECE of a follower write's end (§3c.6; the `op` row's `after`): an element of a `make_link`'s `from` or `to` in the I-span form `{spans: […]}`, beside its `{start, width}` spans, naming `width` positions of the words of the insert `burst` — the follower's own `after` — from its `offset`, counted from 0 in positions as the board seats them: a byte of a string, one per atom, never characters; resolved at the insert's ack to the I-span `{start: <the ack's I-address advanced by offset>, width: '<width>'}`, so a mark over the words of two bursts is sent as two followers. A FOLLOWER is a `make_link` or a `nullify` sent with `after`, the `id` of a burst its session sent — any of the five kinds, a piece after an insert alone (else `malformed_args` naming the slot, as for a piece past the insert's positions): it waits for that burst's answer and the followers of it before it, then is sent and answered with its own answer where the burst was acked — and at the shell's stop, behind the window, before any session closes; refused `not_followed` `{after, why, cause?}`, nothing written and nothing held, with `why` `burst` and the burst's `cause` — the hold's token, or the refusal's name — where the burst was not acked, `ahead` where a follower of the same burst before it was not acked (a chord's writes are one step), `ack` where the burst's ack names no I-address its pieces resolve against, `stop` where the shell's stop came before the burst's answer; `no_such_burst` `{after}` where no burst of that `id` reached the session's table within a second of the follower; a session that ends under a follower answers it as a call on the ended session */
export interface BurstPiece {
  burst: string;
  offset: number;
  width: number;
}

/** `held(board, session, {doc, held, state, cause?, hands?, landed?})` (§4b.2) — a document's held state as it moves, always under the session it is about (never the guest face, P39); `held` the count of lines still held on the document, `cause` the line's cause — the hold's token while `holding`, the refusal's token while `refused`; `hands` with the `moved` state, EACH HAND ONCE, read off the `under=` rows since the burst's typed state or the person's last `send` on the document, whichever is later (a document moved again after that `send` names only the hands since it) — the board's refusal of it as typed against an older state (`arrangement_moved`), at its first dial or at a resend, where the shell could not shift the burst through the change exactly (no anchors, a delete or a rearrange without its span, an anchor lost or at two places, the span between them cut or refilled), is the one route to `moved`; a burst it shifts is sent again and lands, no `moved` said; a shift whose live read the board gave no answer to is not tried and says no `moved`, the document `holding` until the board answers; the resend's read judges only whether the line's own write landed (§3c.5); emitted at a hold's start, at each line's resolution or drop, and at each state the resend moves the document through — the one document a resend the board's silence cut back to `holding`, the documents the pass did not reach said nothing (skep #863) — never when a principal's file is read at its session's open, whose lines `held(session)` lists, nor for a line a call enters, shifts and settles within itself, whose ack the `op` answer carries; `landed` on the event that says a line kept after its `op` answered `held` — its ack at a resend, the landing the resend's read found, a drop's read that found it landed — that line's one entry (`LandedLine`), said on that event whatever the event last said, so a keep that leaves the state and count as they stood is said all the same, and never said again: the one place the page learns a resent line's ack (skep #968), and a page that was not listening as it was said learns of the landing as it does with no event, the line gone from `held(session)`, the feed's `drafts` row at the landing's `at`, an `image` read showing the words; `sendable` with the `moved` state, as the document's first moved line's row carries it (`HeldRow`; skep #867), the event sent again, its hands named, where the answer moves to or from true — a row that names the document, a read after an unanswered one, or the first test after a launch, the probe after a session's open — and never for false against absent, the page holding its act inert on both; `unwritable`, with `unwritable_class` always beside it, while a line of the document stands on no file, the refusal it waits behind in the words the `op` answer spells it (`HeldAnswer`), and absent once none does — within one probe of the retry writing the document's lines, the event said again under each session of the principal with its state, cause, hands and `sendable` as last told — a session told nothing of a document that stands moved hearing it with the hands read for it, or the one hand `unread` (skep #972) — so the page's face for a line this device could not keep lifts as the copy lands (§3c.3; skep #860) */
export interface HeldEvent {
  board: string;
  session: string;
  doc: string;
  held: number;
  state: 'holding' | 'sending' | 'kept' | 'refused' | 'moved';
  cause?: string;
  hands?: Hand[];
  sendable?: boolean;
  unwritable?: string;
  unwritable_class?: 'full' | 'read_only' | 'other';
  landed?: LandedLine[];
}

/** one held line that left the store kept, as the `held` event names it (§4b.2; skep #968): `held` the line's ordinal, the one the `op` call's `held` answer named; `burst` the envelope `id` the page sent on the frame (A-60), absent where it sent none; `at` the position the board took the line at — its ack's `at` (A-62, A-63), or the position the resend's read found its landing at — absent where the read found it under a reclaimed history; `addr` the first I-address an insert's `ack_addr` minted (A-63), absent for the other kinds and for a landing the read found, which no ack names: the page reads the image there for those */
export interface LandedLine {
  held: number;
  burst?: string;
  at?: number;
  addr?: string;
}

/** one hand whose row moved a held document (§3c.5): `own` this store's own key with its fingerprint, `other` another key with its fingerprint and its label rendered inert — the one the shell's key store holds for it, else the one the account's verified credential records give it, another device's key thus named by its enrolled label, and absent where neither names one (skep #869) — `bare` an unsigned hand under local trust, `lost` a row whose testimony the board lost — the data of the three forms the moved face draws, the strings `ux/copy.md`'s; `unread`, the one hand, where no page of the rows named them after a real verdict — the board gave the read no answer or answered it with no page (a refusal, a reclaimed history), the read met the death signal, or none was made at a board not answering or an own node stopped — the hands not read yet, never `lost`, read again as the shell's walk meets the document, under every session told them so, and the `moved` state said once more with them (skep #863, #972) */
export interface Hand {
  key: HandKey;
  fingerprint?: string;
  label?: string;
}

/** `resolve(session, {held, act})` — the person's act on a held line: `send` at a refused run's face or a moved document's, handing the document's waiting lines back to the probe, and refused `not_resolvable` on a line holding, which the probe sends; `drop` on any line, a holding one among them, with every later line of its document; neither act on a line a resend, or a first dial's shift within its call, has out for its dials, refused `not_resolvable` (skep #983); answered `{}`, save a `drop` under a session that may write of a line marked `sent` that is holding or handed over as `answers_lost`, which reads for the line's landing first unless the shell knows no dial of it left this device (§3c.4; skep #866, #983): a landing found keeps the line, nothing dropped, the lines behind it going out in order, answered `{kept: true}`; none that could be its landing drops it, answered `{}`; a read that cannot tell drops nothing, refused `landing_unread` (`LandingUnreadRefusal`); a read the death signal met ends the session, `session_died` — the page takes the outcome from the answer, the `held` event saying `kept` with `held: 0` after a drop as after a keep */
export interface Resolve {
  session: string;
  held: number;
  act: 'drop' | 'send';
}

/** `another-window(board, another_window)` (§3c.3; skep #827, #828, #873) — another shell's hold on the board's held store, at each edge of that state: `true` where a session's open or a probe finds another shell over the data directory holding a lock of the store, the pending directory's or the board's own — every write at the board refused `another_window` from then, nothing held and nothing sent — and `false` where this shell takes the locks, the pending one's and the board's own where a term has read, at a later session's open or at a probe; emitted once at each edge, and never at an open or a probe that finds no change — the `session` answer's `another_window` gives the state as a session opens */
export interface AnotherWindowEvent {
  board: string;
  another_window: boolean;
}

/** one run of a selection or of a past state's arrangement (`Past`), I-runs in V-order (P51): `width` positions of the document `origin`'s content I-space from the ordinal `i_start` */
export interface Run {
  origin: string;
  i_start: number;
  width: number;
}

/** `publication.standing(session, {draft, doc, also?})` — A DRAFT's STANDING READ ALONE (skep #864): where the draft stands against its document, in the members the panel carries, read before the person starts publishing and so with no panel composed, none left standing and none disturbed, no event said and nothing held: `base` the base the board records for the draft in `doc`'s chain, `standing` that base typed against the document's head, `head` where it is `behind` the trunk's newest member, the version the draft's corner names, `left_behind` the drafts of the family its publication leaves behind by address — every draft `also` names, then, where it becomes the head (`at_head`, `first`), every other draft of the person's own whose recorded base is this draft's. It is a read: it asks no write door, so a second window reads it; a session with no key is refused `write_in_bare_session`. A draft the board records no base for in `doc`'s chain is refused `base_unrecorded {draft, doc, reason}`, a `doc` of another chain among them — `other_chain` — as `publication.open` refuses it */
export interface PublicationStanding {
  base: string;
  standing: BaseStanding;
  head?: string;
  left_behind: string[];
}

/** `publication.open(session, {draft, also?, doc?, mint?, claim?, selection?, notes?, readable_drafts?, published?})` — THE PANEL: the composition's first steps run by the shell (`enumerate` → `panel` → the price), every member DATA with a code or a kind and never a string a person reads; `draft` the RENDERING draft, `also` the OTHER private drafts of the person's own whose words this publication re-mints as the document's own beside it (the Nelson way — the family: the staging draft and the alternatives made from it, never the notes), each keeping its own records; the draft's BASE the shell's own read off the board, never the page's — the base the board records for the draft, the version its `stage` copied (the bare document while the chain is empty) or the member its newest publication made — so the shot lands after it, or as its daughter where the trunk has moved past it; a draft the board records no base for is refused `base_unrecorded {draft, doc, reason}` — `reason` `no_record` (minted and never staged), `other_chain` (a base in another document's chain) or `free_standing` (an alternative of a draft with no base) — the one refusal of a base, every standing of a recorded one told; `rows` the sets in the RULED order — own, notes, private, public by address; `read_with` per published document of the person's whether the edition is read with it now; `count` at the switches' DEFAULT — every private row OFF — and every window awaiting its answer, which counts toward nothing; `price` the five terms against their caps, as the request would stand with every window part a record names taken by its counterpart and every other kept private; `windows` the own-origin windows, each in its PARTS with the answers each part admits (B3-S11 P2 (i)), the drafts `also` names EXCLUDED; `parts` what each part's answer brings, the answered row's clause's data; `inherited` per draft `also` names, in its order, THE STATEMENT's count — the passages first written in it (B3-S11 P2 (i)); `merge_records` per named draft whose runs of the selection hold any, in the selection's order, the merge records the publication leaves out — no publication publishes a merge record, so a journal's records stay private and its arrangement keeps them, and a selection of merge records alone is refused `only_merge_records {draft}`; `edition_links` how many of the document's own links lie on the words this publication re-inserts — the ⟨n⟩ of the link-sets design §5.2's line "⟨n⟩ of ⟨E⟩'s own links on these words stay on this draft's earlier words", read once at the open, nothing written for them and no answer changing it; `p3_stands` whether P3 stands (E4 1.4): a private row holding a link not unchanged since the recorded base, the formatting line's marks or listed removals, a re-offered original, a public row's link on words this version publishes as new, or `edition_links` above zero — where none stands, P2's own line says the links stayed private; `standing` the base TYPED against the document's head before any act — `at_head`, `behind` (told and never refused: the shot lands the base's daughter, the head unmoved, `head` beside it the trunk's newest member, the version the draft's corner names), `first` (the bare document, its chain empty) or `superseded_first` (the draft was begun from the bare document and version 1 has since been published: told, never refused — the shot lands beside version 1 as its daughter, the head unmoved) — absent at the mint form; `left_behind` the drafts of the family this publication leaves behind, by address: every draft `also` names, then, where it becomes the head (`at_head`, `first`), every other draft of the person's own whose recorded base is this draft's — empty at the mint form; `hold` where a HELD publication of this draft stood and is re-opened as it stands, with the switches and answers the page last sent it (item 1 (a)), its standing typed again */
export interface PublicationPanel {
  rows: PublicationRow[];
  formatting: Formatting;
  read_with: Record<string, boolean>;
  count: Count;
  price: Price;
  windows: Window[];
  parts: PartCounts[];
  inherited: Inherited[];
  merge_records: MergeRecords[];
  edition_links: number;
  p3_stands: boolean;
  standing?: BaseStanding;
  head?: string;
  left_behind: string[];
  hold?: Hold;
}

/** one set of the panel: `home` the set, `kind` own, notes, private or public with whether the edition is read with it, `label` the home's first line (rendered INERT, AUTH-5.2), `links` the row's offered links BY ADDRESS, `types` the fold by type with each type's count and its far documents, `line` the five counts P3's lines are drawn from, `read_through` the private move's share where the row stays OFF, `unchanged` the row's links UNCHANGED SINCE THE RECORDED BASE (E4 1.1: made before the version the request's `base` names, every word it touches on the selection held by that version, none new) BY ADDRESS, in `links`' order, `fold` the two counts (E4 1.8) — a private row whose every link is unchanged is drawn compact, one with any changed whole, folded by change; where the base is no version member nothing is unchanged — and `changed_types` and `unchanged_types` the same fold by type as `types` over each side of `fold` alone (E4 1.3): a row folded by change draws its head's type counts and far documents from `changed_types`, not `types`, and the line under it from `unchanged_types`, a far document reached from both sides standing in both */
export interface PublicationRow {
  home: string;
  kind: RowKind;
  label: string;
  links: string[];
  types: TypeFold[];
  line: RowLine;
  read_through: number;
  unchanged: string[];
  fold: RowFold;
  changed_types: TypeFold[];
  unchanged_types: TypeFold[];
}

/** the links of one type among those a row's fold by type takes: the type's address, how many of those links carry it, each far document they point into in address order */
export interface TypeFold {
  ty: string;
  n: number;
  far: string[];
}

/** a row's links counted by the fold's test (E4 1.8): `unchanged` those unchanged since the recorded base, `changed` the rest */
export interface RowFold {
  unchanged: number;
  changed: number;
}

/** the five counts of a row's line: ⟨p⟩ links with an end into a private document, ⟨d⟩ links with an end wholly on words of the draft the selection leaves out, ⟨c⟩ links with an end running past the selection's cut, ⟨t⟩ links typed by a private document, ⟨u⟩ revisions of links already published, not offered */
export interface RowLine {
  p: number;
  d: number;
  c: number;
  t: number;
  u: number;
}

/** the formatting line: `marks` the line's marks by address, `cut` how many run past the selection's cut, `removals` the held removals' job list — the spent and the off-selection dropped, the ⟨r⟩/⟨e⟩ split by `remake` */
export interface Formatting {
  marks: string[];
  cut: number;
  removals: Removal[];
}

/** one held removal on the job list: `record` the `3.24` record in the draft, `mark` the published mark it names, `mark_value` the mark's value as stored, `on_selection` whether the mark is on the selection's words, `spent` whether a retraction of it already stands, `remake` the formatting-line mark that re-makes it, where one does; `original` the person's own original the mark stands for — the `old` of the mark's accept claim, found from the copy — where the mark is of the formatting types and such a claim stands, which the one commit ENDS with the mark through the request's `originals` rider (outside the signed body), null for a mark of another type or one with no original standing; `rest` the original's words no copy ever covered, kept formatted by a fresh mark of its type in the one commit, empty where none */
export interface Removal {
  record: string;
  mark: string;
  mark_value: LinkValue;
  on_selection: boolean;
  spent: boolean;
  remake: string | null;
  original: string | null;
  rest: ISpan[];
}

/** a link's value as stored: the three slots as spans, and the position of the commit that minted it — null where the board serves none */
export interface LinkValue {
  from: LinkSpan[];
  to: LinkSpan[];
  ty: LinkSpan[];
  at: number | null;
}

/** one span of a stored slot: its start and its width in their dotted spelling (wire.md §Value encodings) */
export interface LinkSpan {
  start: string;
  width: string;
}

/** `publication.count(session, {switches, answers})` — THE COUNT: PUB-3.8's four numbers as DATA (DECISION 5) — ⟨l⟩ the switched-on sets' `links` entries plus the `read_with` entries, ⟨n⟩ the formatting line's marks that re-make nothing, ⟨r⟩ the `retract` entries no re-make covers, ⟨e⟩ the re-makes — `claim` whether the one write carries the edition claim, `read_with` the entries the switches need: each switched-on row's destination other than the member, once, where the edition is not already read with it; `supersede` THE SUPERSESSION CLAIM the one write carries — the published daughters the draft's merge marker names, each one claim in the commit marking the daughter superseded by the member (the slot's merge form, B3-S11's THE MERGE SCENE) — composed by the shell off the board's marker alone, never session memory, at the open and again at a confirm that finds the draft's base moved or a `merge.land` over a panel read under another marker (`MergeLanded`), and ONLY where the marker's head is the trunk's head as read there: empty at an unmarked draft, at a marked draft behind the head, and at a draft-side merge, whose side is a private draft no public claim supersedes */
export interface Count {
  l: number;
  n: number;
  r: number;
  e: number;
  claim: boolean;
  read_with: string[];
  supersede: string[];
}

/** THE PRICE: the five terms against their caps — `lists` the six lists (`runs`, `places`, `links`, `retract`, `read_with`, `originals`; 4,096 each), `body` the signed body (8 MiB), `values` the distinct draft-native positions (131,072), `reads` the in-lock reads (65,536), `bytes` the staged bytes (64 MiB) — and `over`, each term past its cap with how far: a non-empty `over` is refused `over_cap` at `confirm` BEFORE ANY FRAME (P13); `count` re-runs it over the rows as switched, so the caps are decided at P3 as a set flips */
export interface Price {
  lists: number[];
  body: number;
  values: number;
  reads: number;
  bytes: number;
  over: PriceOver[];
}

/** one term of the price past its cap, and by how much */
export interface PriceOver {
  term: Term;
  by: number;
}

/** one window P2 (i) asks its answers at: a run of the selection that windows an unpublished draft of the person's own or, at a merge, another account's unpublished document (skep #932; a published origin is never asked) — the drafts `also` names EXCLUDED, their runs re-minted as the document's own words and not windowed (their count is `inherited`) — `run` the run's index in the selection, `origin` and `width` the run's own, `owner` the origin's account, `i_start` WHERE IN ⟨origin⟩ THE PASSAGE WAS WRITTEN (the run's first ordinal in ⟨origin⟩'s I-space), `parts` the stretches the draft arranges of it, cut where a record of a draft the person reads names its words as published, each answered on its own and re-read at every open; NO ANSWER PRE-SELECTED (P50), and a window awaiting its answer counts toward nothing */
export interface Window {
  run: number;
  origin: string;
  owner: string;
  i_start: number;
  width: number;
  parts: Part[];
}

/** one part of a window — the key `answers` take is `⟨run⟩.⟨part⟩` — `from` its words on ⟨origin⟩'s chain, `ordinal` where the draft arranges its first word, `admits` the answers it takes: where a record names its words as published, `record` that record and `to` the published words it names — THE COUNTERPART — and `admits` the counterpart ("window them from version ⟨j⟩") and `drop` alone, a placeholder over words anyone reads at the published version being no answer; where none does, `publish_first`, `drop` and `keep_private`, `publish_first` not at another account's words, which are not the person's to publish */
export interface Part {
  part: number;
  from: ISpan;
  ordinal: number;
  admits: OriginAnswer[];
  record?: string;
  to?: ISpan;
}

/** one window part as the landing names it — a part that needs an answer in `window_parts_owed`, or an answer given in `MergeLanded.answers`: `run` and `part` its key as `publication.confirm` takes it (`⟨run⟩.⟨part⟩`), `words` its first words (`null` where the merger may not read them) and `after` the words it stands after in the merged text (`null` at the start, empty where the words before are not readable), each rendered inert; `ordinal` its first position in the merged text; `origin` its origin, `owner` that origin's owner where it is not the person; `span` its words on the origin's chain; where a record names them as published, `record` the record, `counterpart` the published words it names and `version` ⟨E.j⟩, the member that publishes them; `sides` each published side of the merge whose version shows the part as a placeholder; `admits` the answers it takes; `answer` the answer given, where one stands; `named_since` whether a record named the part only after its answer was given (PUB-3.108) */
export interface WindowPart {
  run: number;
  part: number;
  words: string | null;
  after: string | null;
  ordinal: number;
  origin: string;
  owner: string | null;
  span: ISpan;
  record: string | null;
  counterpart: ISpan | null;
  version: string | null;
  sides: string[];
  admits: OriginAnswer[];
  answer: OriginAnswer | null;
  named_since: boolean;
}

/** one answer of `skep merge --publish`'s the landing cannot place: `flag` the answer (`window`, `leave_out`, `keep_private`) and `key` its address; with `second`, two answers name the same words; without it, the answer fits nothing here, `published_in` the versions that publish the words of an origin the answer named where a record names all of them */
export interface WindowMisfit {
  flag: 'window' | 'leave_out' | 'keep_private';
  second?: 'window' | 'leave_out' | 'keep_private';
  key: string;
  published_in: string[];
}

/** a private set the landing left out, as `merge.land`'s acknowledgment and refusal name it (`stayed private: ⟨links⟩ links in ⟨set⟩ — your next version offers them again`) */
export interface LeftPrivate {
  set: string;
  links: number;
}

/** one of the merge's places left at its default, as the reveal lists them: `id` its gap, `kind`, `after` and `before` its anchors, `placed` as placed */
export interface MergeDefault {
  id: number;
  kind: 'order' | 'anchor' | 'corner' | 'cut' | 'collision' | 'moves';
  after: string | null;
  before: string | null;
  placed: number[] | 'after' | 'before' | 'omitted';
}

/** what one window part's answer brings — the data of the answered row's clause (B3-S11 P2 (i)), the words the page's: the part by `run` and `part`; taken by its counterpart, `marks` the formatting line's marks on the published words, which go out with them, and `links` the private rows' offered links on them, offered next; kept behind a placeholder, `kept_marks` the person's formatting marks on its words, which stay in the draft until a version shows them; zeros at a part left out or awaiting its answer */
export interface PartCounts {
  run: number;
  part: number;
  marks: number;
  links: number;
  kept_marks: number;
}

/** THE STATEMENT's count for one draft `also` names (B3-S11 P2 (i)'s statement before the act — "⟨n⟩ passages first written in ⟨D⟩ publish as ⟨E⟩'s own words; ⟨D⟩ keeps a record of where they went" — the statement itself the page's): `draft` the draft, `passages` ⟨n⟩ — the selection's runs of that origin, consecutive runs of one origin in the selection's V-order counted once; the rendering draft's own words are counted nowhere */
export interface Inherited {
  draft: string;
  passages: number;
}

/** the merge records of one named draft the selection holds, which the publication leaves out — the data of "⟨n⟩ merge records in ⟨label⟩ stay private and are not published with it" (one: "1 merge record in ⟨label⟩ stays private and is not published with it"), the statement the page's: `draft` the draft the records were written in, `n` ⟨n⟩ */
export interface MergeRecords {
  draft: string;
  n: number;
}

/** a content I-span: `chain` the content chain (`document.0.1`), `first` its first ordinal, `width` its positions */
export interface ISpan {
  chain: string;
  first: number;
  width: number;
}

/** a HELD publication re-opened (item 1 (a)): `since` when the panel was put behind another, in unix milliseconds */
export interface Hold {
  since: number;
}

/** `publication.count` and `publication.confirm` — the rows' switches: `on` the private rows switched ON by home, `destinations` per switched-on row its `Destination` — the member the shot mints, or another published document of the person's one pick away — the member where unnamed; a home no private row holds, or a set that is no published document of the person's, is refused `malformed_args` */
export interface Switches {
  on: string[];
  destinations?: Record<string, Destination>;
}

/** `publication.confirm` — THE ACKNOWLEDGMENT: `member` the member minted (`E.1` of the edition at the mint form), `edition` the edition minted at the mint form, `claim` whether the edition claim rode in the write (the request's own, echoed), `supersede` the daughters the write claimed superseded — the panel's `count.supersede` as sent, less a daughter an active claim of the person's own already named, which the board skips and the request leaves out — `at` the commit's position, `via` how it was reached — `answer` the frame's own ack or the memo of the one re-ask, `twin` `already_published` READ AS THE ACKNOWLEDGMENT (the landed test passed at the member the refusal named), `records`, `walk` and `edition_claim` a lost answer's landed test; the page lands at P5 */
export interface Acknowledged {
  outcome: 'acknowledged';
  member: string;
  edition: string | null;
  claim: boolean;
  supersede: string[];
  at: number;
  via: AckVia;
}

/** `publication.confirm` — THE RE-STATEMENT: P4's RE-READ found the draft moved since the panel — `left` links gone or retracted, `superseded` links a claim of the person's superseded since, `came` links arrived, `removals_undone` and `removals_came` the held removals' job list moved, `selection` held runs whose placement changed with where each stands now, `places` the whole places a run standing at more than one since the panel is carried at — or THE DRAFT'S BASE, or its STANDING, moved — NOTHING SENT (PUB-3.108; D4 (b′)): the page re-renders P2 from it and confirms again; `parts` the window parts named, un-named or named by another record since the panel — an origin published meanwhile — each `{run, part, record}` with the record naming it now, null where none does, its answer asked again unless it left the words out; `left_out` where the board refused an entry by its LINEAGE (B3-S11 P4) — its words already carrying its copy (`superseded`), or its original retracted (`retracted`) — the entry by its index, the original, the cause: the original left out of the panel from then on, the re-statement saying what the version now publishes, never the own-bug class alone; `race` where the re-statement follows the board's `kept_place_moved`, the newest row under the draft that refusal named — the rendering draft, or one `also` names — since the request's reads and its key, or a lineage refusal a change of the person's since those reads explains, the newest row under that change's home; `base` where the draft's recorded base differs from the panel's in member or extent — another publication of this draft or a merge landed in it since the panel, which a moved standing need not show (`at_head` both times where the draft itself made the new head) — the base as the re-read read it, present only then: the panel re-composed on it and the claim on the marker as it stands (`Count.supersede`), so the next confirm sends against that base and the request's `base` is the member the panel was tested against; a panel of the whole draft re-takes what the draft now arranges, `selection` then empty, the runs' indices no longer lining up, a draft emptied since keeping the held runs, re-stated absent — a selection the page passed stays held, re-stated over what is left, and a confirm over one the draft has wholly left is refused `selection_not_arranged`, nothing sent; `standing` where the base's standing moved since the panel — a sibling's shot landing while it stood, `at_head` → `behind`, `first` → `superseded_first` for a draft begun from the bare document, whose shot then lands beside version 1 as its daughter, or a newer head while the draft stays `behind` — as the re-read typed it, the panel's own from then on, `head` beside it the trunk's newest member where it is `behind` (a re-read finding the base no longer recorded refuses as the open does, `base_unrecorded`) */
export interface Restated {
  outcome: 'restated';
  left: string[];
  superseded: string[];
  came: string[];
  removals_undone: string[];
  removals_came: string[];
  selection: { run: number; placement: Placement }[];
  parts?: { run: number; part: number; record: string | null }[];
  left_out?: { entry: number; original: string; cause: 'superseded' | 'retracted' }[];
  race?: RaceKey;
  base?: string;
  standing?: BaseStanding;
  head?: string;
}

/** the race's key at a kept place moved: the feed's newest row under the draft the refusal named — the rendering draft, or a draft `also` names, each re-windowed in the one write — since the request's reads — `at` its position, `key` whose write it was (a fingerprint, `bare`; null where lost or a signed entry), `signed` whether the row carries its own attest */
export interface RaceKey {
  at: number;
  key: string | null;
  signed: boolean;
}

/** `publication.confirm` — THE REFUSAL: a typed arm with its face's DATA beside `arm` and never a string — the library's `twin {member, missing}`, `kept_place_moved {index, draft, race}` (where the re-read found no difference to re-state: `draft` the draft that no longer holds the entry's words at the place the panel read — the rendering draft, or one `also` names, each re-windowed at its own places in the one write — and `race` whose write moved them, read under that draft), `unowned_draft {draft}`, `not_owner {addr}`, `claim_refused {edition}` (crossing as the board answered it, nothing re-sent), `window_withheld {origin}`, `needs_signed_session`, `no_such_document`, `older_board {detail}`, `head_unreadable` (nothing sent), `session_ended {reason}`, `budget_race {detail}`, `may_already_stand`, `base_superseded {first}` (the board's refusal of a request naming NO base while the document holds its first member, `first` — a shape this shell never sends at the document form, where the request's base is the board's record and a draft begun from the bare document lands beside version 1; carried for the library's raw callers; nothing published), `own_fault {fault}` (the library's own composition at fault, `fault` by its `kind` — `stray_place {index, draft}`, a kept place beside a run of published identity no record names whole, in the draft named; `deposit {code, index, detail}`; `shot {code}`; `attest {detail}`; `budget {detail}`), `other {refusal}` — and the shell's own three BEFORE ANY FRAME: `over_cap {over}`, `inert {inert}` and `head_unreadable {refusal}`, the refusal naming why the signature could not be made (SP-14) */
export interface PublicationRefused {
  outcome: 'refused';
  arm: string;
  [member: string]: unknown;
}

/** `publication(board, session, {draft, state, …})` (§4b.2) — THE STATE OF THE ONE REQUEST as it moves: `sent` (the frame left the shell), `acknowledged {member, edition, at}` (the commit stands), `restated` (the re-read found a difference; nothing sent), `refused {arm}` (the arm by name, its data in `confirm`'s answer), `cancelled` (the standing panel dropped by `cancel`), `ended` (the session died with the panel standing or held — gone with it); fired at `confirm`'s send and at its outcome, at `cancel`, and at the session's death */
export interface PublicationEvent {
  board: string;
  session: string;
  draft: string;
  state: 'sent' | 'acknowledged' | 'restated' | 'refused' | 'cancelled' | 'ended';
  [member: string]: unknown;
}

/** `merge.compose(session, {doc, alternative, into?})` — or THE DRAFT SIDE, `merge.compose(session, {doc, draft, into?})` — THE REPORT, brief-shaped as the publication panel is, every member DATA and never a string: `outcome` — `landed`, M landed into `into` by ONE `set_arrangement` (the draft named, or a FRESH draft staged from the head first where none is named, `fresh` true where this call staged it — false for a draft named and for a landing of the person's own of the key found standing, nothing staged), typed against the compose's read of the draft, the draft's recorded base re-recorded to the head and the marker set beside it, `position` the write's commit, `head_moved` the trunk's newer head where one stands (LAND AND TELL: the write landed on the head it composed on), `record_link` the merge record's link, homed in the person's private journal beside the record, or null where the record could not be written and the landing stands (`unrecorded` the refusal, for a later `merge.compose` to record); `reopened`, the draft `into` already carrying this merge (its marker naming the side and the head): the report with NOTHING landed, the side read as compose read it — at the marker's position, `position` — and each unsettled gap's state read off the draft as it stands, settled `person` where the draft no longer arranges the gap's default as M placed it (its runs removed whole, or reordered); `merged`, a daughter a supersession claim of the person's own already names: `member` the member that claim names, `claims` the claims standing at the daughter, `record_link` the record of that merge — the person's own, written now where none of theirs named it — and nothing landed; `doc` the trunk, `head` the trunk's head the merge was composed on (the marker's at a re-open), `base` the member both sides descend from, derived, `side` the daughter or the draft composed, `form` which, `sides` the record's sides with the position a draft side was read at, `runs` M with each run's side and family, `gaps` THE GAP REPORT — each gap its kind (`order`, `corner`, `cut`, `collision`, `moves` unsettled; `anchor` settled by the rules), its anchors, the runs placed with their sides, the placement as it stands (the default), `settled` and `resolved_by` (`rule`, `person`, `agent`, `answer:<address>`, or null) — `counts` the run counts, `m` against `cap`, `over_cap` where it passes it (the composition answered, nothing landed, the refusal `over_cap`), `record` the merge record's body as it stands — unlanded at a re-open — and `as_of` the one board position every read was made at */
export interface MergeReport {
  outcome: 'landed' | 'reopened' | 'merged';
  doc: string;
  head: string;
  base: string;
  side: string;
  form: 'daughter' | 'draft';
  sides: MergeSide[];
  runs: MergeRun[];
  gaps: MergeGap[];
  counts: RunCounts;
  cap: number;
  over_cap: boolean;
  record: unknown;
  as_of: number;
  into?: string;
  position?: number;
  fresh?: boolean;
  head_moved?: string | null;
  record_link?: string | null;
  unrecorded?: Refusal;
  member?: string;
  claims?: string[];
}

/** one side of the merge record: `at` the member or the draft, `role` the head, an alternative (a daughter), a draft or a fork, `position` the board position a draft side was read at — null at a member */
export interface MergeSide {
  at: string;
  role: 'head' | 'alternative' | 'draft' | 'fork';
  position: number | null;
}

/** one run of M, the merged list, in V-order: `width` positions of `origin`'s content I-space from the ordinal `i_start`, `side` the side that placed it (0 the head, then each side in order) or null for the base's own, `family` the shot's three — `own` the trunk's I-space by reference, `window` another document's, `draft_native` a draft side's fresh text */
export interface MergeRun {
  origin: string;
  i_start: number;
  width: number;
  side: number | null;
  family: 'own' | 'window' | 'draft_native';
}

/** one gap of the report: `id` the key `merge.land`'s `resolutions` take, `kind`, `after` and `before` the surviving base anchors on either side (null at an edge), `runs` the runs the gap places with the side each came from, `placed` the placement as it stands — the sides' order, `after` or `before` the anchor, or `omitted` — `settled` whether the rules settled it (an `anchor` gap) or the person did (`resolved_by` `person`), `resolved_by` who settled it, or null while it stands unsettled at its default */
export interface MergeGap {
  id: number;
  kind: GapKind;
  after: string | null;
  before: string | null;
  runs: GapRun[];
  placed: GapPlacement;
  settled: boolean;
  resolved_by: string | null;
}

/** one run a gap places: `side` the side it came from, `i_start` its first I-address, `width` its positions */
export interface GapRun {
  side: number;
  i_start: string;
  width: number;
}

/** the run counts the record keeps (the merge record's decision 17): `a` the head's, `b` the sides', `m` the merged list's, checked against the cap */
export interface RunCounts {
  a: number;
  b: number;
  m: number;
}

/** `merge.land(session, {resolutions?, answers?})` — THE LANDING ON THE TRUNK: the shot through the publication family's one composition and send from the draft the composition landed in — the page's panel of it at the composition's document, standing or held, with the switches and answers the page last sent, or one the shell opens over the whole draft, every private row OFF, under the answers the call names (`Record<string, OriginAnswer>`, keyed `⟨run⟩.⟨part⟩` as `publication.confirm`'s are), the landing composing NO answer the caller did not give at any window part — an unanswered part refuses `window_parts_owed` (`WindowPartsOwedRefusal`), every part named whole, nothing sent — a panel the page read under another merge marker than the draft carries, before the compose or over an earlier merge, FIRST KEYED ON THE DRAFT AS IT STANDS, the claim composed again off the marker, a panel of the whole draft re-taking what the draft arranges and the draft side named `also`, a selection the page passed kept held and any difference re-stated, nothing sent — THE REQUEST CARRYING THE SUPERSESSION CLAIM as the panel composed it, at its open, at a confirm that found the draft's base moved or at that keying (`Count.supersede`), then THE MERGE RECORD, its own write, idempotent by reading first: `member` the member minted, `at` its commit, `via` and `claim` the acknowledgment's, `supersede` the daughters the write claimed superseded (`Acknowledged.supersede`), `daughter` whether the head moved under a shot naming NO daughter — the draft side's — and the member landed as a daughter, reported as a race is and never a silent success, `record` the merge record's link, homed in the person's private journal, null where the member stands and its record could not be written (`unrecorded` the refusal; the next `merge.compose` of the daughter records it), `claims` the supersession claims standing at the daughters whose `new` is the member, `retries` the record's, `answers` each window part's answer as given, `left_private` each private set this landing left out with its count, `defaults` each of the merge's places left at its default; the composition is gone with the landing; the panel's RE-STATEMENT (`Restated`) and its typed REFUSAL (`PublicationRefused`) are the other two shapes — a panel of the whole draft keyed at this call re-stated only where the merge brought a link (`came`) onto a private row left switched on, its `selection` empty and no `parts`, the runs' indices no longer lining up, the next call landing it — the race, `supersede_refused` with `detail` `head_moved` and `head` the trunk's, crossing as the board answered it, NOTHING RE-SENT, the composition gone, to be made again on that head; `no_merge` where nothing is composed; `held_lines` (`HeldLinesRefusal`) where the draft the composition landed in, or a draft the shot names `also`, holds lines of yours the board has not kept, nothing sent; `other_panel` (`OtherPanelRefusal`) where the family's panel of that draft, standing or held, mints an edition or publishes into another document, nothing sent and every panel and the composition as they stood */
export interface MergeLanded {
  outcome: 'landed';
  member: string;
  at: number;
  via: AckVia;
  claim: boolean;
  supersede: string[];
  daughter: boolean;
  record: string | null;
  unrecorded?: Refusal;
  claims: string[];
  retries: number;
  answers: WindowPart[];
  left_private: LeftPrivate[];
  defaults: MergeDefault[];
}

/** `merge.undo(session)` — the landing's one undo step while the session that landed it stands, or with `{draft, withdrawal}` a withdrawal's (below): ONE `set_arrangement` carrying the arrangement the draft held before the landing, its runs mapped through the correspondence records where a publication made its words public since, its old base as the base to record, and the marker the draft carried then put back as it stood — an earlier landing's, or the one its stage copied — or no marker where it carried none (skep #964), typed against this shell's own last acknowledged arrangement write on the draft, or the landing's position — or the latest write that put its marker back, where only a take-back and its undo moved the words since — where that is later (the library's R6 with P3's editor rule: the person's own later changes, taken back first, never refuse it; a write to the draft since by another hand refuses it `arrangement_moved`, nothing wiped); `draft` the draft the merge was taken back out of, `position` the write's commit, `record` the replacing record's link, homed in its private journal (null where no record of the landing stood, or where the one standing is the earlier landing's whose marker came back), `restored` the base restored, address and extent (null where the draft records none), `marker` — the landing's undo alone — the draft's merge marker as the undo left it, the one it put back, or null; the composition is gone with the undo, and where the marker it put back is an earlier landing's whose composition a later landing in the draft set aside, that composition stands again while its session stands, so the next `merge.undo(session)` takes that landing back and `merge.land` publishes it (skep #981); `no_merge` where nothing is composed, `nothing_to_undo {draft, why}` where the merge is not one an undo takes back, `held_lines` (`HeldLinesRefusal`) where the draft holds lines of yours the board has not kept, nothing sent. `merge.undo(session, {draft, withdrawal})` is the withdrawal's undo, `withdrawal` the `position` a `merge.withdraw` answered: ONE `set_arrangement` of the draft's current runs, mapped as the undo's are, its recorded base re-sent unmoved and the marker the withdrawal cleared put back as it stood — its sides, its head and the landing's own `at` — typed as the undo is; the composition the withdrawal took aside in this session stands again, so the next `merge.undo(session)` takes the landing back; `restored` null; `no_merge {draft, withdrawal}` where the position names no withdrawal of the draft, `nothing_to_undo {draft, why}` with `remarked` where the draft carries a merge again or one landed since, `published` with the `version` where the draft was published since, nothing sent */
export interface Undone {
  draft: string;
  position: number;
  record: string | null;
  restored: { base: string; extent: number } | null;
  marker?: MergeMarker | null;
}

/** `merge.withdraw(session, {draft})` — THE WITHDRAWAL, in any session: ONE `set_arrangement` of the draft's current runs with its recorded base re-sent unmoved and no `merge`, clearing the marker and keeping the words, typed against the shell's read of the draft; `draft` the draft, `position` the write's commit, `record` the replacing record's link, homed in its private journal (null where no record of the landing stood); `no_merge {draft}` where the draft carries no marker, `not_owner {addr}` where it is another account's or published, `held_lines` (`HeldLinesRefusal`) where the draft holds lines of yours the board has not kept, nothing sent; the composition standing on the draft goes aside, and `merge.undo(session, {draft, withdrawal: position})` puts the merge back (`Undone`) */
export interface Withdrawn {
  draft: string;
  position: number;
  record: string | null;
}

/** `history.past(session, {draft, at})` — a past state read, nothing written (B3-S7; skep #853): the reads `history.restore` makes before its write — the draft's `doc_metadata` at the head, its extent and image as of `at` through `/op-at`, the image in parts where the board answers it too large, then the person's correspondence records at the head, one read per chunk of each origin of the person's own the state holds — answered with no write, so the page draws, while the person rests on a past state, what that state brings back and which links the change would orphan (its own `delete_orphans` read over the current text, less the links whose ends `sent` keeps) before "make this state current"; it asks no write door, so a bare session and a second window read it and a hold standing at the board stops none of its reads, and it holds, notes and changes nothing, `history.restore` reading again for itself: `draft` the draft, `at` the position read, `as_of` the position the reads were made at — no typed state: `history.restore` stays typed at the page's own state of the draft, and one typed at this `as_of` would write over a change the page never showed — `state` the draft's runs as read at `at`, in V order, for drawing and never for sending: a run a publication has re-minted since is the draft's own words there, which the board's twin fence refuses sent as draft-native (`already_published`); `sent` the same positions in the same order mapped through the records, words published since as the published words they became — what a restore made now would send; `covered` the positions of `state` a record covers, the words that come back as published words; `marker` the draft's merge marker as it stands, which a restore leaves standing, or null; `at` at or past the draft's position refused `merge_refused` with `not_past`, a published document `not_owner` with `published`, and a session the board answered no account for `no_account` */
export interface Past {
  draft: string;
  at: number;
  as_of: number;
  state: Run[];
  sent: Run[];
  covered: number;
  marker: MergeMarker | null;
}

/** `history.restore(session, {draft, at, as_of})` — A PAST STATE MADE CURRENT (B3-S7): ONE `set_arrangement` of the draft's runs as read at `at`, mapped through the person's correspondence records so words published since come back as the published words they became, naming no base and no merge — the draft's recorded base and its marker stand — typed against the call's `as_of`, THE TYPED STATE, the page's own state of the draft as its burst frames on it carry it, and refused `arrangement_moved` where the draft's arrangement changed past it, nothing changed; `at` at or past the draft's position refused `merge_refused` with `not_past`; a draft holding lines of yours the board has not kept refused `held_lines` (`HeldLinesRefusal`) before any read, nothing sent — resolve them, then restore: `draft` the draft, `at` the position restored, `position` the write's commit, `as_of` the position the draft stood at as the shell's read found it before the write — the way back, `history.restore` again at `{at: as_of}` typed at `position` — and `marker` the draft's merge marker as it stands, which a restore never takes out, or null */
export interface Restored {
  draft: string;
  at: number;
  position: number;
  as_of: number;
  marker: MergeMarker | null;
}

/** a draft's merge marker as `doc_metadata` serves it: `sides` the merge's sides by address, `head` the trunk member the merge was composed on, `head_copied` that member's content count as read at the compose, a decimal string, or null where the board serves none, `at` the position of the commit that put the marker on the draft, or null where the board serves none */
export interface MergeMarker {
  sides: string[];
  head: string;
  head_copied: string | null;
  at: number | null;
}

/** The calls (client.md §4b.1 — the `publication` family's four, the `merge` family's four and `history.restore` among them — this machine's notebook's three acts `node.start`, `node.stop` and `node.restart`, the read of a draft's standing `publication.standing`, the read of a draft's past state `history.past`, the document index's listing `places`, and the change feed's page `changes`): `POST /bridge/<name>` with the argument object; `{result}` or `{refused}` back. */
export interface Bridge {
  boards(args: {}): Promise<Outcome<BoardRow[]>>;
  session(args: { board: string; principal?: number }): Promise<Outcome<SessionOpened>>;
  close(args: { session: string }): Promise<Outcome<Empty>>;
  keygen(args: { label?: string }): Promise<Outcome<Keygen>>;
  fingerprint(args: { select?: string; payload?: boolean }): Promise<Outcome<FingerprintRow[]>>;
  claim(args: { board: string; principal?: number; name?: string; paper?: boolean }): Promise<Outcome<Claimed>>;
  enroll(args: { board: string; payload: string; principal?: number }): Promise<Outcome<Enrolled>>;
  bind(args: { board: string; principal: number; account: string; origin: string }): Promise<Outcome<Bound>>;
  recover(args: { board: string; principal?: number; lost?: string[]; stolen?: boolean; anchorLost?: boolean }): Promise<Outcome<Recovered>>;
  rotate(args: { board: string; principal?: number; label?: string; payload?: string }): Promise<Outcome<Rotated>>;
  retire(args: { board: string; principal?: number; fingerprint: string }): Promise<Outcome<Empty>>;
  handoff(args: { board: string; account: string; payload?: string; principal?: number }): Promise<Outcome<HandoffDelegated | Empty>>;
  accept(args: { board: string; address: string; label?: string; paper?: boolean; noAnchors?: boolean }): Promise<Outcome<Accepted>>;
  health(args: { board: string }): Promise<Outcome<Health>>;
  probe(args: {}): Promise<Outcome<Probe>>;
  'node.start'(args: {}): Promise<Outcome<Probe>>;
  'node.stop'(args: {}): Promise<Outcome<Probe>>;
  'node.restart'(args: {}): Promise<Outcome<Probe>>;
  op(args: { session: string; frame: unknown; anchors?: Anchors; after?: string } | { guest: true; board?: string; origin?: string; frame: unknown }): Promise<Outcome<unknown>>;
  'publication.open'(args: { session: string; draft: string; also?: string[]; doc?: string; mint?: string; claim?: boolean; selection?: Run[]; notes?: string[]; readable_drafts?: string[]; published?: string[] }): Promise<Outcome<PublicationPanel>>;
  'publication.count'(args: { session: string; switches?: Switches; answers?: Record<string, OriginAnswer> }): Promise<Outcome<{ count: Count; price: Price; rows: PublicationRow[]; formatting: Formatting; windows: Window[]; parts: PartCounts[]; edition_links: number; p3_stands: boolean }>>;
  'publication.confirm'(args: { session: string; switches?: Switches; answers?: Record<string, OriginAnswer> }): Promise<Outcome<Acknowledged | Restated | PublicationRefused>>;
  'publication.cancel'(args: { session: string }): Promise<Outcome<Empty>>;
  'publication.standing'(args: { session: string; draft: string; doc: string; also?: string[] }): Promise<Outcome<PublicationStanding>>;
  'merge.compose'(args: { session: string; doc: string; alternative?: string; draft?: string; into?: string }): Promise<Outcome<MergeReport>>;
  'merge.land'(args: { session: string; resolutions?: Record<string, MergeChoice>; answers?: Record<string, OriginAnswer> }): Promise<Outcome<MergeLanded | Restated | PublicationRefused>>;
  'merge.undo'(args: { session: string } | { session: string; draft: string; withdrawal: number }): Promise<Outcome<Undone>>;
  'merge.withdraw'(args: { session: string; draft: string }): Promise<Outcome<Withdrawn>>;
  'history.past'(args: { session: string; draft: string; at: number }): Promise<Outcome<Past>>;
  'history.restore'(args: { session: string; draft: string; at: number; as_of: number }): Promise<Outcome<Restored>>;
  upload(args: { session: string; target: string; path: string }): Promise<Outcome<never>>;
  fetch(args: { session: string; i: string } | { guest: true; board?: string; origin?: string; i: string }): Promise<Outcome<Uint8Array>>;
  restore(args: { session: string; i: string }): Promise<Outcome<never>>;
  search(args: { session: string; board?: string; query: string; opts?: SearchOpts } | { guest: true; board?: string; origin?: string; query: string; opts?: SearchOpts }): Promise<Outcome<SearchAnswer>>;
  places(args: { session: string; board?: string; opts?: PlacesOpts } | { guest: true; board?: string; origin?: string; opts?: PlacesOpts }): Promise<Outcome<PlacesAnswer>>;
  held(args: { session: string }): Promise<Outcome<HeldRow[]>>;
  'held.show'(args: { session: string }): Promise<Outcome<{ shown: boolean }>>;
  resolve(args: { session: string; held: number; act: 'drop' | 'send' }): Promise<Outcome<{ kept?: true }>>;
  changes(args: { session: string; since: number; limit?: number; class?: 'drafts'; under?: string } | { guest: true; board?: string; origin?: string; since: number; limit?: number; under?: string }): Promise<Outcome<ChangesAnswer>>;
  answer(args: Answer): Promise<Outcome<Empty>>;
  cancel(args: Cancel): Promise<Outcome<Empty>>;
}
