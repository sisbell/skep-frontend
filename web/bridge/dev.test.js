// B-DEV's test with the engine's event stream stood in for: the client's one
// stream listens for every event the port names and for its own `open` and
// `error`, a `publication` event that comes off it is re-emitted by name with
// its data parsed, and the stream's drop is told once and its reopen at the
// next open, never at its first.
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
after(() => { engines.EventSource = engineSource; });

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
