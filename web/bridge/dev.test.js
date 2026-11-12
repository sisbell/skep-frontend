// B-DEV's test with the engine's event stream and its fetch stood in for: the
// client's one stream listens for every event the port names and for its own
// `open` and `error`, a `publication` event that comes off it is re-emitted by
// name with its data parsed, and the stream's drop is told once and its
// reopen at the next open, never at its first; the page URL's `port` names
// the loopback provider at a port of digits alone from 1 to 65535, the
// default where the URL carries none and no provider for any other value; a
// client made at that origin sends its calls, its stream and its close at
// unload there alone; and an `op` handed in at unload is posted to outlive
// the page, before the close, its frame kept in the call log.
import { test, after } from 'node:test';
import assert from 'node:assert/strict';
import * as DEV from './dev.js';
import * as PORT from './port.js';

/** a stand-in for the engine's `EventSource`: each stream opened, with the listeners added to it by event name */
class RecordingSource {
  /** @type {RecordingSource[]} */
  static opened = [];
  /** @param {string} url */
  constructor(url) {
    this.url = url;
    this.readyState = 0;
    /** @type {Map<string, Array<(ev: {data: string}) => void>>} */
    this.listeners = new Map();
    RecordingSource.opened.push(this);
  }
  /** @param {string} name @param {(ev: {data: string}) => void} fn */
  addEventListener(name, fn) { this.listeners.set(name, [...(this.listeners.get(name) || []), fn]); }
  /** @param {string} name @param {unknown} data */
  dispatch(name, data) { for (const fn of this.listeners.get(name) || []) fn({ data: JSON.stringify(data) }); }
  /** the connection standing, as the engine opens it and reopens it */
  open() { this.readyState = 1; this.dispatch('open', null); }
  /** the connection lost: the engine retrying, or, `closed`, giving it up for good */
  fail(closed = false) { this.readyState = closed ? 2 : 0; this.dispatch('error', null); }
}

const engines = /** @type {Record<string, unknown>} */ (/** @type {unknown} */ (globalThis));
const engineSource = engines.EventSource;
engines.EventSource = RecordingSource;
/** @type {string[]} the URL of every fetch the clients make, each answered with an empty list */
const fetched = [];
/** @type {Array<{url: string, keepalive: boolean, body: string, secret: string | undefined}>} every fetch the clients make, as it was posted */
const posted = [];
const engineFetch = engines.fetch;
engines.fetch = async (/** @type {string} */ url, /** @type {{keepalive?: boolean, body?: string, headers?: Record<string, string>}} */ init = {}) => {
  fetched.push(String(url));
  posted.push({ url: String(url), keepalive: !!init.keepalive, body: String(init.body ?? ''), secret: init.headers?.['Skep-Provider'] });
  return { status: 200, text: async () => '{"result":[]}' };
};
after(() => { engines.EventSource = engineSource; engines.fetch = engineFetch; });

/** a client over a fresh stand-in stream, every event and every stream notice it tells recorded */
function client() {
  const dev = DEV.create({ secret: 'test-secret' });
  /** @type {Array<[string, unknown]>} */
  const heard = [];
  /** @type {PORT.StreamNotice[]} */
  const notices = [];
  dev.onStream((n) => notices.push(n));
  dev.subscribe((name, data) => heard.push([name, data]));
  const stream = RecordingSource.opened[RecordingSource.opened.length - 1];
  return { stream, heard, notices };
}

test('the stream listens for every event the port names and its own open and error, and re-emits a publication event by name', () => {
  const before = RecordingSource.opened.length;
  const { stream, heard } = client();
  assert.equal(RecordingSource.opened.length, before + 1, 'one stream');
  assert.deepEqual([...stream.listeners.keys()].sort(), [...PORT.EVENTS, 'open', 'error'].sort());
  const acknowledged = { board: 'b-1', session: 's-1', draft: '1.0.1.0.1013', state: 'acknowledged', member: '1.0.1.0.1013.1', edition: null, at: 12 };
  stream.dispatch('publication', acknowledged);
  assert.deepEqual(heard, [['publication', acknowledged]]);
});

test('the stream tells its drop once, at the first error after it stood open, and its reopen at the next open — never at its first open, nor at an error before it ever opened', () => {
  const { stream, notices } = client();
  stream.fail();
  assert.deepEqual(notices, [], 'an error before the stream ever opened: no drop, for nothing was sent over it');
  stream.open();
  assert.deepEqual(notices, [], 'its first open is no reopen');
  stream.fail(); stream.fail(); stream.fail();
  assert.deepEqual(notices, ['dropped'], 'the drop told once, the platform\'s retries telling nothing more');
  stream.open();
  assert.deepEqual(notices, ['dropped', 'reopened'], 'the reopen at the next open');
  stream.open();
  assert.deepEqual(notices, ['dropped', 'reopened'], 'an open with no drop before it tells nothing');
  stream.fail(); stream.open();
  assert.deepEqual(notices, ['dropped', 'reopened', 'dropped', 'reopened'], 'each drop and its reopen told again');
});

test('a stream the platform closes for good is a drop with no reopen', () => {
  const { stream, notices } = client();
  stream.open();
  stream.fail(true);
  assert.deepEqual([notices, stream.readyState], [['dropped'], 2]);
});

test('the page URL\'s `port` names the loopback provider at a port of ASCII digits alone from 1 to 65535, its origin built from the number; the default provider where the URL carries none; and no provider for any other value, which neither `Number` nor `parseInt` is let read as a port (S-36 (b))', () => {
  /** @type {Array<[string | null, string | null]>} each value the URL may carry, and the provider it names */
  const table = [
    [null, 'http://127.0.0.1:8742'],
    ['1', 'http://127.0.0.1:1'], ['8743', 'http://127.0.0.1:8743'], ['65535', 'http://127.0.0.1:65535'], ['08743', 'http://127.0.0.1:8743'],
    ['', null], ['abc', null], ['0', null], ['65536', null], ['99999', null],
    ['-1', null], ['+8743', null], [' 8743', null], ['8743 ', null], ['8743.0', null], ['1e3', null], ['0x21A7', null], ['8743abc', null],
  ];
  for (const [port, provider] of table) assert.equal(DEV.providerAt(port), provider, `port ${JSON.stringify(port)}`);
  /** the provider a page URL's query names, its `port` read as the boot reads it */
  const named = (/** @type {string} */ query) => DEV.providerAt(new URLSearchParams(query).get('port'));
  assert.deepEqual([named('provider=s'), named('provider=s&port=8743'), named('provider=s&port='), named('provider=s&port=+8743')],
    ['http://127.0.0.1:8742', 'http://127.0.0.1:8743', null, null], 'no key the default; an empty value, and a `+` the query reads as a space, no port');
});

test('a client made at the provider the page URL names sends its calls, its event stream and its close at unload to that origin alone, and at a URL naming no port to the default provider', async () => {
  for (const [port, origin] of [['8743', 'http://127.0.0.1:8743'], [null, 'http://127.0.0.1:8742']]) {
    const provider = /** @type {string} */ (DEV.providerAt(port));
    fetched.length = 0;
    const dev = DEV.create({ provider, secret: 'test-secret' });
    dev.subscribe(() => {});
    const stream = RecordingSource.opened[RecordingSource.opened.length - 1];
    assert.deepEqual(await dev.call('boards', {}), { result: [] }, `port ${port}: the answer handed up as it came`);
    dev.closeAtUnload('s-1');
    assert.deepEqual([...fetched, stream.url], [`${origin}/bridge/boards`, `${origin}/bridge/close`, `${origin}/bridge/events?provider=test-secret`], `port ${port}: every call, the close and the stream at ${origin}`);
  }
});

test('an `op` handed in as the page unloads is posted to the provider with `keepalive`, its argument object the body, before the unload\'s close; the call log keeps it as an `op` with its frame, its answer read by no one (D6 BM-28)', () => {
  posted.length = 0;
  const dev = DEV.create({ provider: 'http://127.0.0.1:8743', secret: 'test-secret' });
  const args = { session: 's-1', frame: { as_of: 7, at: { ordinal: '1', subspace: '1' }, doc: '1.0.1.0.1013', id: 'page:9f.1', op: 'insert', values: ['a'] }, anchors: { before: null, after: null } };
  dev.opAtUnload(args);
  dev.closeAtUnload('s-1');
  assert.deepEqual(posted, [
    { url: 'http://127.0.0.1:8743/bridge/op', keepalive: true, body: JSON.stringify(args), secret: 'test-secret' },
    { url: 'http://127.0.0.1:8743/bridge/close', keepalive: true, body: JSON.stringify({ session: 's-1' }), secret: 'test-secret' },
  ], 'the op first, then the close, each to outlive the page');
  assert.deepEqual(dev.calls().map((c) => [c.name, /** @type {{op?: string}} */ (c).op, /** @type {{frame?: string}} */ (c).frame]), [['op', 'insert', JSON.stringify(args.frame)], ['close', undefined, undefined]], 'the log keeps the op by its kind and its frame, as it keeps a call\'s');
});
