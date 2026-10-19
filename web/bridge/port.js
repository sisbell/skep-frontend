// B-PORT — the page's ONE interface (the structure record §3.2 "B-PORT";
// client.md §4b.1's calls and §4b.2's events; FP-14, FP-15). Layer 0.
// The TWENTY-THREE calls (§4b.1's twenty, `held`, `resolve`, and `places` —
// skep #463) as functions, the SEVEN events as a subscription, the two
// answers to a moment, and the adapter beneath, selected at boot (S-14 (b):
// by the URL's flag). State: the event subscribers alone — no copy of any
// record. The port composes no frame, decodes no answer and refuses no
// call: every answer is the adapter's `Outcome` handed up as it came, in the
// one refusal shape (`{kind, name, …}`, §4.4). The write calls and the
// ceremonial rows are DECLARED here from the first lane and called by no
// screen of this lane (S-35 (a); the ceremonies a seam).
// Types: the generated declarations in `./shapes.d.ts` (S-16 (a) — fetched
// from `GET /bridge/shapes`, committed as fetched, never hand-edited).
// Carries: the wireframe's §4b `shell.act` (its one seam) and §4's `wire.op`
// signature. ENGINE-BOUND only through its adapter.

/** @typedef {import('./shapes').Bridge} Bridge */
/** @typedef {import('./shapes').EventName} EventName */
/** @typedef {import('./shapes').Refusal} Refusal */
/**
 * @template T
 * @typedef {import('./shapes').Outcome<T>} Outcome
 */

/**
 * @typedef {Object} Adapter — what an adapter beneath the port provides
 * @property {string} name 'dev' | 'shell'
 * @property {(name: string, args: unknown) => Promise<Outcome<unknown>>} call one call, posted; the answer opaque
 * @property {(fn: (name: EventName, data: unknown) => void) => void} subscribe the seven events, by name
 * @property {() => Array<{name: string, bytesIn: number, bytesOut: number, ms: number, outcome: string, at: number}>} calls the adapter's own call log
 * @property {(session: string) => void} closeAtUnload a best-effort `close(session)` as the page hides
 * @property {() => string} streamState the event stream's state
 */

/** every call name the port carries, in `skep-shell`'s `CALLS` order plus `places` */
export const CALLS = Object.freeze([
  'boards', 'session', 'close', 'keygen', 'fingerprint', 'claim', 'enroll', 'bind', 'recover', 'rotate', 'retire',
  'handoff', 'accept', 'health', 'probe', 'op', 'upload', 'fetch', 'restore', 'search', 'places', 'held', 'resolve',
]);
/** the seven events */
export const EVENTS = Object.freeze(['mode', 'session-died', 'daemon', 'feed', 'index', 'moment', 'held']);

/** @type {Adapter | null} */
let adapter = null;
/** @type {Map<string, Array<(data: unknown) => void>>} */
const subs = new Map();

/** the port's own refusal where no adapter stands beneath it (the page's own name, not the crate's — reported) */
const NO_ADAPTER = Object.freeze({ kind: /** @type {const} */ ('shell'), name: 'no_adapter' });

/**
 * Start the port over an adapter; with none the page reaches nothing and
 * every call answers `no_adapter`.
 * @param {Adapter | null} a
 */
export function boot(a) {
  adapter = a;
  if (a) a.subscribe((name, data) => emit(name, data));
}
export const adapterName = () => (adapter ? adapter.name : null);
export const hasAdapter = () => adapter !== null;

/**
 * @template T
 * @param {string} name
 * @param {unknown} args
 * @returns {Promise<Outcome<T>>}
 */
function call(name, args) {
  if (!adapter) return Promise.resolve(/** @type {Outcome<T>} */ ({ refused: /** @type {Refusal} */ (NO_ADAPTER) }));
  return /** @type {Promise<Outcome<T>>} */ (adapter.call(name, args));
}

/** @param {string} name @param {unknown} data */
function emit(name, data) { for (const fn of subs.get(name) || []) fn(data); }

/**
 * Subscribe to one of the seven events (or `*` for every event).
 * @param {EventName | '*'} name
 * @param {(data: unknown) => void} fn
 */
export function on(name, fn) {
  if (name === '*') { for (const n of EVENTS) on(/** @type {EventName} */ (n), (d) => fn({ name: n, data: d })); return; }
  if (!subs.has(name)) subs.set(name, []);
  /** @type {Array<(data: unknown) => void>} */ (subs.get(name)).push(fn);
}

// ---- the twenty-three calls, typed by the generated declarations ----------------

/** @type {Bridge['boards']} */
export const boards = (args = {}) => call('boards', args);
/** @type {Bridge['session']} */
export const session = (args) => call('session', args);
/** @type {Bridge['close']} */
export const close = (args) => call('close', args);
/** @type {Bridge['keygen']} */
export const keygen = (args) => call('keygen', args);
/** @type {Bridge['fingerprint']} */
export const fingerprint = (args) => call('fingerprint', args);
/** @type {Bridge['claim']} */
export const claim = (args) => call('claim', args);
/** @type {Bridge['enroll']} */
export const enroll = (args) => call('enroll', args);
/** @type {Bridge['bind']} */
export const bind = (args) => call('bind', args);
/** @type {Bridge['recover']} */
export const recover = (args) => call('recover', args);
/** @type {Bridge['rotate']} */
export const rotate = (args) => call('rotate', args);
/** @type {Bridge['retire']} */
export const retire = (args) => call('retire', args);
/** @type {Bridge['handoff']} */
export const handoff = (args) => call('handoff', args);
/** @type {Bridge['accept']} */
export const accept = (args) => call('accept', args);
/** @type {Bridge['health']} */
export const health = (args) => call('health', args);
/** @type {Bridge['probe']} */
export const probe = (args = {}) => call('probe', args);
/** @type {Bridge['op']} */
export const op = (args) => call('op', args);
/** @type {Bridge['upload']} */
export const upload = (args) => call('upload', args);
/** @type {Bridge['fetch']} */
export const fetch = (args) => call('fetch', args);
/** @type {Bridge['restore']} */
export const restore = (args) => call('restore', args);
/** @type {Bridge['search']} */
export const search = (args) => call('search', args);
/** @type {Bridge['places']} */
export const places = (args) => call('places', args);
/** @type {Bridge['held']} */
export const held = (args) => call('held', args);
/** @type {Bridge['resolve']} */
export const resolve = (args) => call('resolve', args);
/** @type {Bridge['answer']} */
export const answer = (args) => call('answer', args);
/** @type {Bridge['cancel']} */
export const cancel = (args) => call('cancel', args);

/** the adapter's own call log (the gate holds it equal to `GET /bridge/log`'s calls and to the ledger's fetch count) */
export const callLog = () => (adapter ? adapter.calls() : []);
/** a best-effort `close(session)` at `pagehide` (S-37 (a)) */
export function closeAtUnload(/** @type {string} */ s) { if (adapter) adapter.closeAtUnload(s); }
/** the event stream's state */
export const streamState = () => (adapter ? adapter.streamState() : 'none');

/** is an outcome a refusal? */
export const refused = (/** @type {Outcome<unknown>} */ o) => 'refused' in o;
