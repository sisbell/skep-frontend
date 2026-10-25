// The fake port — a third adapter under `web/test/`, never imported by the
// page, standing in for the port's adapter in the pure tests of the model and
// the modules above it (FP-15; the structure record §4.5 (2)): nothing above
// the port can tell which adapter is beneath it. It answers each call from a
// script: a map from a call key (`name` + the argument object's canonical
// JSON, or `op:` + the frame's canonical JSON) to the Outcome the provider
// would answer; it fires events on demand (`fire`); it holds a call on demand
// (`hold`): every call of that key waits for its answer until the test
// releases it, so a test can make acts while a read is in flight and answer
// it when it chooses; and it keeps the key of every call as it is made
// (`asked`) and of every call the script did not answer (`unanswered`).

/** @typedef {import('../bridge/port.js').Adapter} Adapter */
/** @typedef {import('../bridge/shapes').EventName} EventName */

/** canonical JSON: keys sorted at every level */
export function canon(/** @type {unknown} */ v) {
  if (Array.isArray(v)) return '[' + v.map(canon).join(',') + ']';
  if (v && typeof v === 'object') return '{' + Object.keys(v).sort().map((k) => JSON.stringify(k) + ':' + canon(/** @type {Record<string, unknown>} */ (v)[k])).join(',') + '}';
  return JSON.stringify(v);
}

/** the script key of a call: `op` calls key on the frame alone (the session reference differs per run) */
export function keyOf(/** @type {string} */ name, /** @type {unknown} */ args) {
  if (name === 'op') { const a = /** @type {{frame?: unknown}} */ (args || {}); return 'op:' + canon(a.frame); }
  if (name === 'places' || name === 'search') { const a = /** @type {Record<string, unknown>} */ ({ ...(/** @type {object} */ (args || {})) }); delete a.session; delete a.guest; return name + ':' + canon(a); }
  return name + ':' + canon(args ?? {});
}

/**
 * @param {Record<string, unknown>} script keyed by `keyOf`
 * @returns {Adapter & {fire: (name: EventName, data: unknown) => void, hold: (name: string, args: unknown) => () => void, unanswered: string[], asked: string[]}}
 */
export function create(script) {
  /** @type {Array<(name: EventName, data: unknown) => void>} */
  const subs = [];
  /** @type {Array<{name: string, bytesIn: number, bytesOut: number, ms: number, outcome: string, at: number}>} */
  const log = [];
  /** @type {string[]} */
  const unanswered = [];
  /** @type {string[]} every call's key, as it is made — a held one before its release */
  const asked = [];
  /** @type {Map<string, Promise<void>>} the keys held, each until its release */
  const holds = new Map();
  return {
    name: 'dev',
    async call(name, args) {
      const k = keyOf(name, args);
      asked.push(k);
      const held = holds.get(k);
      if (held) await held;
      const body = JSON.stringify(args ?? {});
      const out = /** @type {import('../bridge/shapes').Outcome<unknown> | undefined} */ (script[k]);
      if (!out) { unanswered.push(k); log.push({ name, bytesIn: body.length, bytesOut: 0, ms: 0, outcome: 'refused', at: 0 }); return { refused: { kind: 'shell', name: 'unknown_call' } }; }
      log.push({ name, bytesIn: body.length, bytesOut: JSON.stringify(out).length, ms: 0, outcome: 'refused' in out ? 'refused' : 'result', at: 0 });
      return out;
    },
    subscribe(fn) { subs.push(fn); },
    calls: () => log.slice(),
    closeAtUnload() {},
    streamState: () => 'open',
    fire(name, data) { for (const fn of subs) fn(name, data); },
    /** hold every call of a key until the release this returns, which answers them in the order they were made */
    hold(name, args) {
      const k = keyOf(name, args);
      /** @type {() => void} */
      let release = () => {};
      holds.set(k, new Promise((r) => { release = () => { holds.delete(k); r(); }; }));
      return release;
    },
    unanswered,
    asked,
  };
}
