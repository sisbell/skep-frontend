// B-DEV's test with the engine's event stream stood in for: the client's one
// stream listens for every event the port names, and a `publication` event
// that comes off it is re-emitted by name with its data parsed.
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
    this.readyState = 1;
    /** @type {Map<string, Array<(ev: {data: string}) => void>>} */
    this.listeners = new Map();
    RecordingSource.opened.push(this);
  }
  /** @param {string} name @param {(ev: {data: string}) => void} fn */
  addEventListener(name, fn) { this.listeners.set(name, [...(this.listeners.get(name) || []), fn]); }
  /** @param {string} name @param {unknown} data */
  dispatch(name, data) { for (const fn of this.listeners.get(name) || []) fn({ data: JSON.stringify(data) }); }
}

const engines = /** @type {Record<string, unknown>} */ (/** @type {unknown} */ (globalThis));
const engineSource = engines.EventSource;
engines.EventSource = RecordingSource;
after(() => { engines.EventSource = engineSource; });

test('the stream listens for every event the port names and re-emits a publication event by name', () => {
  const dev = DEV.create({ secret: 'test-secret' });
  /** @type {Array<[string, unknown]>} */
  const heard = [];
  dev.subscribe((name, data) => heard.push([name, data]));
  assert.equal(RecordingSource.opened.length, 1, 'one stream');
  const [stream] = RecordingSource.opened;
  assert.deepEqual([...stream.listeners.keys()].sort(), [...PORT.EVENTS].sort());
  const acknowledged = { board: 'b-1', session: 's-1', draft: '1.0.1.0.1013', state: 'acknowledged', member: '1.0.1.0.1013.1', edition: null, at: 12 };
  stream.dispatch('publication', acknowledged);
  assert.deepEqual(heard, [['publication', acknowledged]]);
});
