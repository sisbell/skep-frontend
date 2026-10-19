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
export type Refusal = RefusedByBoard | HaltFace | BlockedFace | Unreachable | ShellRefusal;
export type Outcome<T> = { result: T } | { refused: Refusal };
export type EventName = 'mode' | 'session-died' | 'daemon' | 'feed' | 'index' | 'moment' | 'held';

/** `boards()` — one entry per board in the shell's list; `board` the opaque reference every board-touching call takes */
export interface BoardRow {
  board: string;
  name: string;
  origin: string;
}

/** `session(board, principal)` — the session's opaque reference in the token's place */
export interface SessionOpened {
  session: string;
  principal: number;
  account: string | null;
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

/** a refusal: the board's own verdict, verbatim */
export interface RefusedByBoard {
  kind: 'refused';
  name: string;
  status: number;
  code: string;
  detail: string | null;
  op: string | null;
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

/** the reason a death carries: its `arm`, the trigger it names, and the arm's own members beside it */
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

/** the `/changes` row verbatim, with `position` and `class` — THIS CRATE's definition of the update's shape */
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

/** `index(board, session?, state)` */
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

/** the `op` answer where the burst's board is HELD (§3c): the shell's own answer, never `ack` — the page takes it as accepted and not acked; `cause` `other_window` where another window holds the board's held text and the burst is held in this one's memory alone, and `unwritable` — why — where the device refused the line or the held file is out of reach, the burst held in memory alone */
export interface HeldAnswer {
  resp: 'held';
  held: number;
  cause: string;
  unwritable?: string;
}

/** `held(session)` — one held burst of the acting principal at the session's board, in resend order (§3c.2): `held` the ordinal, `doc` the draft, `base` the resend's read start, `frame` the page's frame as composed (no attest), `sent` whether the burst may have landed — a dial whose answer was lost, or a `poisoned` answer (§3c.2), `refusal` the board's verdict for a REFUSED run */
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

/** `held(board, session, {doc, held, state, cause?})` (§4b.2) — a document's held state as it moves, always under the session it is about (never the guest face, P39); `held` the count of lines still held on the document, `cause` the line's cause — the hold's token while `holding`, the refusal's token while `refused`; emitted at a hold's start, at each line's resolution or drop, and at each state the resend moves the document through — never when a principal's file is read at its session's open, whose lines `held(session)` lists */
export interface HeldEvent {
  board: string;
  session: string;
  doc: string;
  held: number;
  state: 'holding' | 'sending' | 'kept' | 'refused' | 'moved';
  cause?: string;
}

/** `resolve(session, {held, act})` — the person's act at a REFUSED run's face or a MOVED document's */
export interface Resolve {
  session: string;
  held: number;
  act: 'drop' | 'send';
}

/** The calls (client.md §4b.1, and the document index's listing `places`): `POST /bridge/<name>` with the argument object; `{result}` or `{refused}` back. */
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
  upload(args: { session: string; target: string; path: string }): Promise<Outcome<never>>;
  fetch(args: { session: string; i: string } | { guest: true; board?: string; origin?: string; i: string }): Promise<Outcome<Uint8Array>>;
  restore(args: { session: string; i: string }): Promise<Outcome<never>>;
  search(args: { session: string; board?: string; query: string; opts?: SearchOpts } | { guest: true; board?: string; origin?: string; query: string; opts?: SearchOpts }): Promise<Outcome<SearchAnswer>>;
  places(args: { session: string; board?: string; opts?: PlacesOpts } | { guest: true; board?: string; origin?: string; opts?: PlacesOpts }): Promise<Outcome<PlacesAnswer>>;
  held(args: { session: string }): Promise<Outcome<HeldRow[]>>;
  resolve(args: { session: string; held: number; act: 'drop' | 'send' }): Promise<Outcome<Empty>>;
  answer(args: Answer): Promise<Outcome<Empty>>;
  cancel(args: Cancel): Promise<Outcome<Empty>>;
}
