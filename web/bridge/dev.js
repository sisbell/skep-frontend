// B-DEV — the bridge client over `skep-dev serve`, the development adapter
// beneath B-PORT (the structure record §3.2, §4.3; FP-15's one exception to
// FP-14). Layer 0. Engine-bound (`fetch`, `EventSource`): the page's only
// network code. Every call is one `POST <provider>/bridge/<name>` with the
// row's argument object as the body and the run's admission secret in the
// `Skep-Provider` header — the secret the boot reads from the page URL's
// `?provider=` and hands to `create` with the provider's origin. That origin
// is always loopback, `http://127.0.0.1:<port>`: the port the page URL's
// `?port=` names (S-36 (b)), read by `providerAt` — ASCII digits alone,
// naming 1 to 65535, the origin built from the number — and the verb's
// default 8742 where the URL carries no `port`; a value naming no port
// names no provider, and the boot makes no client. The secret is held in
// this module alone and sent to that origin alone, admits the page to the
// provider and grants nothing at the board, and the page holds no token
// (FP-14). The answer, `{result}` or `{refused}`, is handed up opaque: this
// module composes no frame, decodes no answer, refuses no call and replays
// no fixture. Every event comes off one `EventSource` on
// `/bridge/events?provider=<secret>` (an `EventSource` sends no custom
// header), one listener per `EventName`, re-emitted by name; an event the
// declarations do not name is heard by none. The stream's own
// `open` and `error` are its notices (B-PORT's `StreamNotice`), told to the
// stream watchers: `dropped` once, at the first `error` after it stood open —
// the platform's retries, each an `error`, telling nothing more, and a
// stream the platform closes for good a drop with no reopen — and
// `reopened` at the next `open`, never at its first. The platform reopens
// the stream by itself, and the reopened stream starts at the shell's head,
// not where the dropped one stopped: M-PUMP reads what it missed.
// At `pagehide` the page's `close` rides one `keepalive` fetch, best-effort,
// the browser's (`closeAtUnload`): its argument object the body, its answer
// unread. The browser refuses a keepalive body past KEEPALIVE_BYTES, sending
// nothing of it, so a close past that budget is posted with its `after`
// whole and the longest prefix of its `frames` that fits (`unloadBody`): the
// frames cut are ones the budget leaves no room for in any request that
// outlives the page.
// State: the provider's origin and the secret, the stream, whether it has
// stood open and whether a drop stands told, and its own call log (name,
// bytes, ms, outcome), which the gate holds equal to `GET /bridge/log`'s
// `call` entries and to the ledger's `fetch` count.
// Rules: FP-1, FP-2, FP-4, FP-14, FP-15, FP-16.

/** @typedef {import('./port.js').Adapter} Adapter */
/** @typedef {import('./port.js').CloseArgs} CloseArgs */
/** @typedef {import('./port.js').StreamNotice} StreamNotice */
/** @typedef {import('./shapes').EventName} EventName */
/** @typedef {import('./shapes').Refusal} Refusal */

/** the one host a provider listens on */
const LOOPBACK = 'http://127.0.0.1';
/** the provider at the verb's default port, where the page URL names none */
export const DEFAULT_PROVIDER = `${LOOPBACK}:8742`;
/** @type {Record<EventName, null>} every `EventName` of the generated declarations, the checker refusing one missed (FP-16) */
const EVENT_ROWS = { mode: null, 'session-died': null, daemon: null, feed: null, index: null, moment: null, held: null, publication: null, 'another-window': null };
const EVENT_NAMES = /** @type {EventName[]} */ (Object.keys(EVENT_ROWS));

/**
 * The provider's origin for the page URL's `port` value (S-36 (b)): the
 * default provider where the URL carries no `port`; where the value is ASCII
 * digits alone naming 1 to 65535, the loopback origin of that port, built
 * from the number; null for any other value — a sign, a space, a fraction,
 * an exponent, a radix prefix, a trailing letter, an empty value or one out
 * of range — which names no provider, so none is dialed.
 * @param {string | null} port the `?port=` value, null where the URL carries none
 * @returns {string | null}
 */
export function providerAt(port) {
  if (port === null) return DEFAULT_PROVIDER;
  if (!/^[0-9]+$/.test(port)) return null;
  const n = Number(port);
  return n >= 1 && n <= 65535 ? `${LOOPBACK}:${n}` : null;
}

/** the most a body posted to outlive the page may weigh, in UTF-8 bytes: the Fetch standard's keepalive budget, shared by every such request the page has in flight */
export const KEEPALIVE_BYTES = 64 * 1024;

/** a body's weight as the browser posts it, in UTF-8 bytes */
const weight = (/** @type {string} */ body) => new TextEncoder().encode(body).length;

/**
 * The body of the close posted as the page unloads (see the head): its
 * argument object as JSON where that fits within KEEPALIVE_BYTES; else the
 * session and its `after` whole with the longest prefix of its `frames` that
 * fits, `frames` left out where none does.
 * @param {CloseArgs} args
 * @returns {string}
 */
function unloadBody(args) {
  const whole = JSON.stringify(args);
  const { frames, ...rest } = args;
  if (!frames || weight(whole) <= KEEPALIVE_BYTES) return whole;
  for (let k = frames.length - 1; k > 0; k--) {
    const body = JSON.stringify({ ...rest, frames: frames.slice(0, k) });
    if (weight(body) <= KEEPALIVE_BYTES) return body;
  }
  return JSON.stringify(rest);
}

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
 * Make the bridge client: every call, the event stream and the close at
 * unload go to the one provider's origin it is given.
 * @param {{provider?: string, secret: string, record?: boolean}} opts `provider` the origin `providerAt` reads from the page URL; `record` keeps every call's arguments and answer in the log — the gate's door alone (`?gate=`), never the installed app's
 * @returns {Adapter}
 */
export function create({ provider = DEFAULT_PROVIDER, secret, record = false }) {
  /** @type {CallEntry[]} */
  const log = [];
  /** @type {Array<(name: EventName, data: unknown) => void>} */
  const subscribers = [];
  /** @type {Array<(n: StreamNotice) => void>} */
  const streamWatchers = [];
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
    /** the stream has stood open: an `error` after it is a drop */
    let opened = false;
    /** a drop told, and no `open` since */
    let down = false;
    const tell = (/** @type {StreamNotice} */ n) => { for (const fn of streamWatchers) fn(n); };
    stream.addEventListener('open', () => { opened = true; if (down) { down = false; tell('reopened'); } });
    stream.addEventListener('error', () => { if (opened && !down) { down = true; tell('dropped'); } });
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
    onStream(fn) { streamWatchers.push(fn); },
    calls: () => log.slice(),
    closeAtUnload(args) {
      const body = unloadBody(args);
      try {
        fetch(`${provider}/bridge/close`, { method: 'POST', keepalive: true, headers: { 'Content-Type': 'application/json', 'Skep-Provider': secret }, body }).catch(() => {});
        log.push({ name: 'close', bytesIn: body.length, bytesOut: 0, ms: 0, outcome: 'result', at: performance.now() });
      } catch { /* the browser's */ }
    },
    streamState() {
      if (!stream) return 'none';
      return stream.readyState === 0 ? 'connecting' : stream.readyState === 1 ? 'open' : 'closed';
    },
  };
}
