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
export type Placement = { whole: { ordinal: number } } | { split: [number, number, number][] } | 'absent';
export type Term = 'runs' | 'places' | 'links' | 'retract' | 'read_with' | 'body' | 'values' | 'reads' | 'bytes';
export type AckVia = 'answer' | 'twin' | 'records' | 'walk' | 'edition_claim';
export type Inert = 'unchanged' | { unanswered: number[] } | { publish_first: number[] };
export type Missing = { copy: number } | { retraction: number };
export type HandKey = 'own' | 'other' | 'bare' | 'lost';
export type Refusal = RefusedByBoard | HaltFace | BlockedFace | Unreachable | ShellRefusal;
export type Outcome<T> = { result: T } | { refused: Refusal };
export type EventName = 'mode' | 'session-died' | 'daemon' | 'feed' | 'index' | 'moment' | 'held' | 'publication';

/** `boards()` — one entry per board in the shell's list; `board` the opaque reference every board-touching call takes */
export interface BoardRow {
  board: string;
  name: string;
  origin: string;
}

/** `session(board, principal)` — the session's opaque reference in the token's place; `writes` whether a write may go out under it: the signed mode's session writes, the bare mode's keyless one reads alone and has every write refused `write_in_bare_session` */
export interface SessionOpened {
  session: string;
  principal: number;
  account: string | null;
  writes: boolean;
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

/** `probe()` — the own node's state */
export interface Probe {
  daemon: 'running' | 'stopped' | 'unreachable';
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

/** `changes(session, since, limit?)` — what changed since the position `since` at the session's class: the entries in the `feed` update's shape, oldest first, each `published` or `drafts` by the read that answered it (two reads, the published feed as a guest and the session's drafts supplement under its token, merged by position); `next` the position to ask from next time, past every entry answered and never past one withheld; `head` the board's latest position, read before the page */
export interface ChangesAnswer {
  entries: FeedUpdate[];
  next: number;
  head: number;
}

/** a refusal: the board's own verdict, verbatim; `site` the address and the entry the code names (`already_published`'s member, `kept_place_moved`'s `runs` entry, a deposit's entry in its own list), each absent where the code carries none */
export interface RefusedByBoard {
  kind: 'refused';
  name: string;
  status: number;
  code: string;
  detail: string | null;
  op: string | null;
  site: { addr?: string; index?: number };
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

/** a refusal: the shell's own, its detail beside the name */
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

/** the reason a death carries: its `arm`, the trigger it names, and the arm's own members beside it — the `retired` arm's `own` null where the fork on whose key retired it cannot be taken (no record read, a hand the read could not name, or the shell's key store unlisted beside another hand), its `position` the one read whatever the hand (AUTH-5.77's no-hand form) */
export interface DeathReason {
  arm: 'closed' | 'mode' | 'retired' | 'seeded' | 'blocked' | 'restart' | 'unreachable';
  [member: string]: unknown;
}

/** `daemon(board, state)` */
export interface DaemonEvent {
  board: string;
  state: 'running' | 'stopped' | 'unreachable';
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

/** the `op` answer where the burst's board is HELD (§3c): the shell's own answer, never `ack` — the page takes it as accepted and not acked; `cause` the hold's token, and `unwritable` — why — where the device refused the line or the held file is out of reach (another process's lock on the board's held store among the causes: one shell per data directory, §3c.3), the burst held in memory alone */
export interface HeldAnswer {
  resp: 'held';
  held: number;
  cause: string;
  unwritable?: string;
}

/** `held(session)` — one held burst of the acting principal at the session's board, in resend order (§3c.2): `held` the ordinal, `doc` the draft, `base` the resend's read start, `frame` the page's frame as composed (no attest), `sent` whether the burst may have landed — a dial whose answer was lost (the board's `internal_panic` among them), or a `poisoned` answer (§3c.2), `refusal` the board's verdict for a REFUSED run */
export interface HeldRow {
  held: number;
  doc: string;
  base: number;
  frame: unknown;
  cause: string;
  sent: boolean;
  time: number;
  refusal?: unknown;
}

/** `held(board, session, {doc, held, state, cause?, hands?})` (§4b.2) — a document's held state as it moves, always under the session it is about (never the guest face, P39); `held` the count of lines still held on the document, `cause` the line's cause — the hold's token while `holding`, the refusal's token while `refused`; `hands` with the `moved` state, EACH HAND ONCE, read off the `under=` rows since `base` the read already holds (§3c.5); emitted at a hold's start, at each line's resolution or drop, and at each state the resend moves the document through — never when a principal's file is read at its session's open, whose lines `held(session)` lists */
export interface HeldEvent {
  board: string;
  session: string;
  doc: string;
  held: number;
  state: 'holding' | 'sending' | 'kept' | 'refused' | 'moved';
  cause?: string;
  hands?: Hand[];
}

/** one hand whose row moved a held document (§3c.5): `own` this store's own key with its fingerprint, `other` another key with its fingerprint and the label the shell's key store holds for it (rendered inert), `bare` an unsigned hand under local trust, `lost` a row whose testimony the board lost — the data of the three forms the moved face draws, the strings `ux/copy.md`'s */
export interface Hand {
  key: HandKey;
  fingerprint?: string;
  label?: string;
}

/** `resolve(session, {held, act})` — the person's act at a REFUSED run's face or a MOVED document's */
export interface Resolve {
  session: string;
  held: number;
  act: 'drop' | 'send';
}

/** one run of a selection, I-runs in V-order (P51): `width` positions of the document `origin`'s content I-space from the ordinal `i_start` */
export interface Run {
  origin: string;
  i_start: number;
  width: number;
}

/** `publication.open(session, {draft, doc?, mint?, claim?, selection?, notes?, readable_drafts?, published?})` — THE PANEL: the composition's first steps run by the shell (`enumerate` → `panel` → the price), every member DATA with a code or a kind and never a string a person reads; `rows` the sets in the RULED order — own, notes, private, public by address; `read_with` per published document of the person's whether the edition is read with it now; `count` at the switches' DEFAULT — every private row OFF; `price` the five terms against their caps, as the request would stand with every window kept private; `windows` the own-origin windows the three answers are asked for; `hold` where a HELD publication of this draft stood and is re-opened as it stands, with the switches and answers the page last sent it (item 1 (a)) */
export interface PublicationPanel {
  rows: PublicationRow[];
  formatting: Formatting;
  read_with: Record<string, boolean>;
  count: Count;
  price: Price;
  windows: Window[];
  hold?: Hold;
}

/** one set of the panel: `home` the set, `kind` own, notes, private or public with whether the edition is read with it, `label` the home's first line (rendered INERT, AUTH-5.2), `links` the row's offered links BY ADDRESS, `types` the fold by type with each type's count and its far documents, `line` the five counts P3's lines are drawn from, `read_through` the private move's share where the row stays OFF */
export interface PublicationRow {
  home: string;
  kind: RowKind;
  label: string;
  links: string[];
  types: TypeFold[];
  line: RowLine;
  read_through: number;
}

/** the links of one type in a row: the type's address, how many of the row's links carry it, each far document they point into in address order */
export interface TypeFold {
  ty: string;
  n: number;
  far: string[];
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

/** one held removal on the job list: `record` the `3.24` record in the draft, `mark` the published mark it names, `mark_value` the mark's value as stored, `on_selection` whether the mark is on the selection's words, `spent` whether a retraction of it already stands, `remake` the formatting-line mark that re-makes it, where one does */
export interface Removal {
  record: string;
  mark: string;
  mark_value: LinkValue;
  on_selection: boolean;
  spent: boolean;
  remake: string | null;
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

/** `publication.count(session, {switches, answers})` — THE COUNT: PUB-3.8's four numbers as DATA (DECISION 5) — ⟨l⟩ the switched-on sets' `links` entries plus the `read_with` entries, ⟨n⟩ the formatting line's marks that re-make nothing, ⟨r⟩ the `retract` entries no re-make covers, ⟨e⟩ the re-makes — `claim` whether the one write carries the edition claim, `read_with` the entries the switches need: each switched-on row's destination other than the member, once, where the edition is not already read with it */
export interface Count {
  l: number;
  n: number;
  r: number;
  e: number;
  claim: boolean;
  read_with: string[];
}

/** THE PRICE: the five terms against their caps — `lists` the five lists (`runs`, `places`, `links`, `retract`, `read_with`; 4,096 each), `body` the signed body (8 MiB), `values` the distinct draft-native positions (131,072), `reads` the in-lock reads (65,536), `bytes` the staged bytes (64 MiB) — and `over`, each term past its cap with how far: a non-empty `over` is refused `over_cap` at `confirm` BEFORE ANY FRAME (P13); `count` re-runs it over the rows as switched, so the caps are decided at P3 as a set flips */
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

/** one own-origin window P2 (i) asks the three answers for: a run of the selection that windows an unpublished draft of the person's own — `run` the run's index in the selection (the key `answers` take), `origin` and `width` the run's own, `owner` the origin's account, `i_start` WHERE IN ⟨origin⟩ THE PASSAGE WAS WRITTEN (the run's first ordinal in ⟨origin⟩'s I-space), `counterpart` where a record of a draft the person reads names the run's words as published, offered FIRST and re-read at every open; NO ANSWER PRE-SELECTED (P50) */
export interface Window {
  run: number;
  origin: string;
  owner: string;
  i_start: number;
  width: number;
  counterpart?: Counterpart;
}

/** the counterpart offered first at a window: `record` the record of `draft`, a draft the person reads, that names the run's words as published — `from` the part of the run it covers, on the run's own chain, `to` the published span that part became */
export interface Counterpart {
  run: number;
  draft: string;
  record: string;
  from: ISpan;
  to: ISpan;
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

/** `publication.confirm` — THE ACKNOWLEDGMENT: `member` the member minted (`E.1` of the edition at the mint form), `edition` the edition minted at the mint form, `claim` whether the edition claim rode in the write (the request's own, echoed), `at` the commit's position, `via` how it was reached — `answer` the frame's own ack or the memo of the one re-ask, `twin` `already_published` READ AS THE ACKNOWLEDGMENT (the landed test passed at the member the refusal named), `records`, `walk` and `edition_claim` a lost answer's landed test; the page lands at P5 */
export interface Acknowledged {
  outcome: 'acknowledged';
  member: string;
  edition: string | null;
  claim: boolean;
  at: number;
  via: AckVia;
}

/** `publication.confirm` — THE RE-STATEMENT: P4's RE-READ found the draft moved since the panel — `left` links gone or retracted, `superseded` links a claim of the person's superseded since, `came` links arrived, `removals_undone` and `removals_came` the held removals' job list moved, `selection` held runs whose placement changed with where each stands now — NOTHING SENT (PUB-3.108): the page re-renders P2 from it and confirms again; `race` where the re-statement follows the board's `kept_place_moved`, the newest row under the draft since the request's reads and its key */
export interface Restated {
  outcome: 'restated';
  left: string[];
  superseded: string[];
  came: string[];
  removals_undone: string[];
  removals_came: string[];
  selection: { run: number; placement: Placement }[];
  race?: RaceKey;
}

/** the race's key at a kept place moved: the feed's newest row under the draft since the request's reads — `at` its position, `key` whose write it was (a fingerprint, `bare`; null where lost or a signed entry), `signed` whether the row carries its own attest */
export interface RaceKey {
  at: number;
  key: string | null;
  signed: boolean;
}

/** `publication.confirm` — THE REFUSAL: a typed arm with its face's DATA beside `arm` and never a string — the library's `twin {member, missing}`, `kept_place_moved {index, race}` (where the re-read found no difference to re-state), `unowned_draft {draft}`, `not_owner {addr}`, `claim_refused {edition}` (crossing as the board answered it, nothing re-sent), `window_withheld {origin}`, `needs_signed_session`, `no_such_document`, `older_board {detail}`, `head_unreadable` (nothing sent), `session_ended {reason}`, `budget_race {detail}`, `may_already_stand`, `own_fault {fault}`, `other {refusal}` — and the shell's own two BEFORE ANY FRAME: `over_cap {over}` and `inert {inert}` */
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

/** The calls (client.md §4b.1 — the `publication` family's four among them — the document index's listing `places`, and the change feed's page `changes`): `POST /bridge/<name>` with the argument object; `{result}` or `{refused}` back. */
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
  op(args: { session: string; frame: unknown } | { guest: true; board?: string; origin?: string; frame: unknown }): Promise<Outcome<unknown>>;
  'publication.open'(args: { session: string; draft: string; doc?: string; mint?: string; claim?: boolean; selection?: Run[]; notes?: string[]; readable_drafts?: string[]; published?: string[] }): Promise<Outcome<PublicationPanel>>;
  'publication.count'(args: { session: string; switches?: Switches; answers?: Record<string, OriginAnswer> }): Promise<Outcome<{ count: Count; price: Price }>>;
  'publication.confirm'(args: { session: string; switches?: Switches; answers?: Record<string, OriginAnswer> }): Promise<Outcome<Acknowledged | Restated | PublicationRefused>>;
  'publication.cancel'(args: { session: string }): Promise<Outcome<Empty>>;
  upload(args: { session: string; target: string; path: string }): Promise<Outcome<never>>;
  fetch(args: { session: string; i: string } | { guest: true; board?: string; origin?: string; i: string }): Promise<Outcome<Uint8Array>>;
  restore(args: { session: string; i: string }): Promise<Outcome<never>>;
  search(args: { session: string; board?: string; query: string; opts?: SearchOpts } | { guest: true; board?: string; origin?: string; query: string; opts?: SearchOpts }): Promise<Outcome<SearchAnswer>>;
  places(args: { session: string; board?: string; opts?: PlacesOpts } | { guest: true; board?: string; origin?: string; opts?: PlacesOpts }): Promise<Outcome<PlacesAnswer>>;
  held(args: { session: string }): Promise<Outcome<HeldRow[]>>;
  resolve(args: { session: string; held: number; act: 'drop' | 'send' }): Promise<Outcome<Empty>>;
  changes(args: { session: string; since: number; limit?: number }): Promise<Outcome<ChangesAnswer>>;
  answer(args: Answer): Promise<Outcome<Empty>>;
  cancel(args: Cancel): Promise<Outcome<Empty>>;
}
