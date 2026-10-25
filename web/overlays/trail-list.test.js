// O-TRAIL-LIST's test, on a stand-in of the host's element: each row names
// where its entry stands — an entry a reading scene was opened as both its
// documents, in its panes' order, as the reader last left it, each address
// in the identifier's face, beside the act's name — and holds no document's
// words of its own (FP-29).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as TRAILLIST from './trail-list.js';
import * as HOST from './host.js';
import * as TRAIL from '../nav/trail.js';
import { t } from '../strings.js';
import { esc } from '../util.js';

/** the host's stand-in element: what the host writes into it is what a person meets */
const hostEl = { className: '', innerHTML: '', style: {}, setAttribute() {}, removeAttribute() {}, addEventListener() {}, querySelector: () => null, querySelectorAll: () => [], getBoundingClientRect: () => ({ left: 0, top: 0, width: 0, height: 0 }), contains: () => false };

/** the list's rows as the host wrote them: each its number and what it names */
const rows = () => [...hostEl.innerHTML.matchAll(/<li><button data-run="j(\d+)"[^>]*><span class="k">[^<]*<\/span> (.*?)<\/button><\/li>/g)].map((m) => [Number(m[1]), m[2]]);
/** a pane's text as SC records it, its record the address given */
const version = (/** @type {string} */ src) => ({ doc: src, src, names: src, shows: src, kind: /** @type {const} */ ('pinned'), k: 2, n: 2, read: null });

test('an entry a reading scene was opened as names both its documents in its panes\' order — those it opened on, then, once the reader has left it, those its panes showed — each in the identifier\'s face, beside the act\'s name; every other entry its address and its position (issue #50\'s design decision: "the trail\'s list names both documents")', () => {
  globalThis.document = /** @type {any} */ ({ activeElement: null, body: null, getElementById: () => null });
  HOST.attach(/** @type {any} */ (hostEl));
  TRAIL._reset();
  const view = { x: 0, y: 0, scale: 1 }, D = '1.0.1.0.3', O = '1.0.1.0.1003';
  TRAIL.push({ addr: D, pos: 11, width: null, view, label: null, notice: null }, null);
  TRAIL.push({ addr: O, pos: null, width: null, view, label: null, notice: null, scene: { a: D, b: O, held: {}, left: null } }, { view, reading: null, stood: null });
  TRAILLIST.open();
  const named = (/** @type {string} */ a, /** @type {string} */ b) => `<span class="id">${a}</span> │ <span class="id">${b}</span> <span class="dim">${esc(t('B1.side-by-side'))}</span>`;
  assert.deepEqual(rows(), [[1, named(D, O)], [2, `<span class="id">${D}</span> · ${esc(t('F.position', { p: 11 }))} <span class="dim"></span>`]], 'the scene\'s entry its two documents and "read side by side"; the other its address and position');
  HOST.dismiss();
  TRAIL.back({ view, reading: null, stood: null, scene: { panes: { a: version(D + '.2'), b: version(O) }, spots: null, stop: null } });
  TRAILLIST.open();
  assert.deepEqual(rows()[0], [1, named(D + '.2', O)], 'left with pane A on another version: the version its pane showed');
  HOST.dismiss();
});
