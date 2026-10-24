// B-DEV — the bridge client over `skep-dev serve`, the development adapter
// beneath B-PORT (the structure record §3.2, §4.3; FP-15's one exception to
// FP-14). Layer 0. Engine-bound (`fetch`, `EventSource`): the page's only
// network code. Every call is one `POST <provider>/bridge/<name>` with the
// row's argument object as the body and the run's admission secret in the
// `Skep-Provider` header — the secret the boot reads from the page URL's
// `?provider=` (S-36 (a)) and hands to `create`, the provider at the verb's
// default `http://127.0.0.1:8742`; the secret is held in this module alone
// and sent nowhere else, admits the page to the provider and grants nothing
// at the board, and the page holds no token (FP-14). The answer, `{result}`
// or `{refused}`, is handed up opaque: this module composes no frame, decodes
// no answer, refuses no call and replays no fixture. The seven events come
// off one `EventSource` on `/bridge/events?provider=<secret>` (an
// `EventSource` sends no custom header), re-emitted by name. `close(session)`
// at `pagehide` rides a `keepalive` fetch, best-effort, the browser's.
// State: the provider's origin and the secret, the stream, and its own call
// log (name, bytes, ms, outcome), which the gate holds equal to `GET
// /bridge/log`'s `call` entries and to the ledger's `fetch` count.
// Rules: FP-1, FP-2, FP-4, FP-14, FP-15, FP-16.

/** @typedef {import('./port.js').Adapter} Adapter */
/** @typedef {import('./shapes').EventName} EventName */
/** @typedef {import('./shapes').Refusal} Refusal */

export const DEFAULT_PROVIDER = 'http://127.0.0.1:8742';
const EVENT_NAMES = /** @type {EventName[]} */ (['mode', 'session-died', 'daemon', 'feed', 'index', 'moment', 'held']);

/**
 * @typedef {Object} CallEntry
 * @property {string} name
 * @property {number} bytesIn the body posted
 * @property {number} bytesOut the answer's bytes
 * @property {number} ms
 * @property {string} outcome 'result' | 'refused' | 'unreachable' | 'provider'
 * @property {number} at performance.now() at the post
 * @property {string} [op] for an `op` call, the frame's op kind — the gate's proof that every frame was a read
 * @property {string} [frame] for an `op` call, the frame itself (the page's own composition, no secret in it) — the gate replays it over the fake port
 * @property {string} [args] under the gate's `record`: the argument object posted, as JSON
 * @property {string} [answer] under the gate's `record`: the answer's text — the fake port's script is cut from it (FP-15's proof)
 */

/**
 * Make the bridge client.
 * @param {{provider?: string, secret: string, record?: boolean}} opts `record` keeps every call's arguments and answer in the log — the gate's door alone (`?gate=`), never the installed app's
 * @returns {Adapter}
 */
export function create({ provider = DEFAULT_PROVIDER, secret, record = false }) {
  /** @type {CallEntry[]} */
  const log = [];
  /** @type {Array<(name: EventName, data: unknown) => void>} */
  const subscribers = [];
  /** @type {EventSource | null} */
  let stream = null;

  /**
   * @param {string} name
   * @param {unknown} args
   * @returns {Promise<import('./shapes').Outcome<unknown>>}
   */
  async function call(name, args) {
    const body = JSON.stringify(args ?? {});
    const t0 = performance.now();
    /** @type {CallEntry} */
    const entry = { name, bytesIn: body.length, bytesOut: 0, ms: 0, outcome: 'result', at: t0 };
    if (name === 'op') {
      const fr = /** @type {{frame?: {op?: string, at?: number, frame?: {op?: string}}}} */ (args || {}).frame;
      entry.op = fr ? (fr.op || (fr.frame && fr.frame.op) || 'op-at') : '?';
      entry.frame = JSON.stringify(fr ?? null);
    }
    if (record) entry.args = body;
    log.push(entry);
    try {
      const res = await fetch(`${provider}/bridge/${name}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Skep-Provider': secret },
        body,
      });
      const text = await res.text();
      entry.bytesOut = text.length;
      entry.ms = performance.now() - t0;
      if (record) entry.answer = text;
      /** @type {unknown} */
      let parsed = null;
      try { parsed = text ? JSON.parse(text) : null; } catch { parsed = null; }
      if (parsed && typeof parsed === 'object' && ('result' in parsed || 'refused' in parsed)) {
        const out = /** @type {import('./shapes').Outcome<unknown>} */ (parsed);
        entry.outcome = 'refused' in out ? 'refused' : 'result';
        return out;
      }
      // the provider's own answer, no call's (a 4xx with a text line or a JSON body without the envelope)
      entry.outcome = 'provider';
      return { refused: /** @type {Refusal} */ ({ kind: 'shell', name: `provider_${res.status}`, status: res.status, text: text.slice(0, 200) }) };
    } catch (e) {
      // a CORS failure or a closed port reaches the page as a TypeError with nothing readable
      entry.ms = performance.now() - t0;
      entry.outcome = 'unreachable';
      return { refused: /** @type {Refusal} */ ({ kind: 'unreachable', name: 'unreachable', text: String(e && /** @type {Error} */ (e).message || e) }) };
    }
  }

  function openStream() {
    if (stream) return;
    stream = new EventSource(`${provider}/bridge/events?provider=${encodeURIComponent(secret)}`);
    for (const name of EVENT_NAMES) {
      stream.addEventListener(name, (ev) => {
        /** @type {unknown} */
        let data = null;
        try { data = JSON.parse(/** @type {MessageEvent} */ (ev).data); } catch { data = null; }
        for (const fn of subscribers) fn(name, data);
      });
    }
  }

  return {
    name: 'dev',
    call,
    subscribe(fn) { subscribers.push(fn); openStream(); },
    calls: () => log.slice(),
    closeAtUnload(session) {
      try {
        fetch(`${provider}/bridge/close`, { method: 'POST', keepalive: true, headers: { 'Content-Type': 'application/json', 'Skep-Provider': secret }, body: JSON.stringify({ session }) }).catch(() => {});
        log.push({ name: 'close', bytesIn: JSON.stringify({ session }).length, bytesOut: 0, ms: 0, outcome: 'result', at: performance.now() });
      } catch { /* the browser's */ }
    },
    streamState() {
      if (!stream) return 'none';
      return stream.readyState === 0 ? 'connecting' : stream.readyState === 1 ? 'open' : 'closed';
    },
  };
}
