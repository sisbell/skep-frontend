// O-TRAIL-LIST's test, on a stand-in of the host's element: each row names
// where its entry stands — the version its entry keeps, the member a newer
// version's arrival found its text was among them; an entry a reading scene
// was opened as both its documents, in its panes' order, as the reader last
// left it, each address in the identifier's face, beside the act's name — and
// holds no document's words of its own; and each row is named by its number,
// where it stands and its words as S22's table hears them, a document's first
// line kept as written (FP-22, FP-29).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as TRAILLIST from './trail-list.js';
import * as HOST from './host.js';
import * as TRAIL from '../nav/trail.js';
import * as REC from '../model/records.js';
import { t } from '../strings.js';
import { esc, byteLength } from '../util.js';

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

test('a row names the version its entry keeps: an entry left at an edition\'s bare address names the member its text was once a newer version arrived (issue #298\'s design decision: "a list row names its entry\'s version")', () => {
  globalThis.document = /** @type {any} */ ({ activeElement: null, body: null, getElementById: () => null });
  HOST.attach(/** @type {any} */ (hostEl));
  TRAIL._reset();
  const view = { x: 0, y: 0, scale: 1 }, E = '1.0.1.0.43', O = '1.0.1.0.3';
  TRAIL.push({ addr: E, pos: 11, width: null, view, label: null, notice: null }, null);
  TRAIL.push({ addr: O, pos: null, width: null, view, label: null, notice: null }, { view, reading: null, stood: null });
  const row = (/** @type {string} */ a) => [2, `<span class="id">${a}</span> · ${esc(t('F.position', { p: 11 }))} <span class="dim"></span>`];
  TRAILLIST.open();
  assert.deepEqual(rows()[1], row(E), 'its bare address while nothing has arrived');
  HOST.dismiss();
  TRAIL.arrivedAt(E, E + '.2', null);
  TRAILLIST.open();
  assert.deepEqual(rows()[1], row(E + '.2'), 'version 3 arrived: the member its text was, version 2');
  HOST.dismiss();
});

test('each row is named by its number, where its entry stands and its words as a screen reader hears them — the bar between a scene\'s two documents and the dot before a position a pause, a document\'s first line kept as written, its own dash among it — the row drawn as it stands (style S22; issue #626)', () => {
  globalThis.document = /** @type {any} */ ({ activeElement: null, body: null, getElementById: () => null });
  HOST.attach(/** @type {any} */ (hostEl));
  TRAIL._reset();
  const view = { x: 0, y: 0, scale: 1 }, D = '1.0.1.0.3', O = '1.0.1.0.1003', TEXT = 'Field notes — draft\n\nMore.';
  REC.takeDelivery(D, [{ pos: 1, width: byteLength(TEXT), kind: 'content', text: TEXT, ref: null, origin: null }]);
  try {
    TRAIL.push({ addr: D, pos: 11, width: null, view, label: null, notice: null }, null);
    TRAIL.push({ addr: O, pos: null, width: null, view, label: null, notice: null, scene: { a: D, b: O, held: {}, left: null } }, { view, reading: null, stood: null });
    TRAILLIST.open();
    const names = [...hostEl.innerHTML.matchAll(/<button data-run="j(\d+)"[^>]*aria-label="([^"]*)"/g)].map((m) => [Number(m[1]), m[2]]);
    assert.deepEqual(names, [[1, `1 ${D}, ${O} ${t('B1.side-by-side')}`], [2, `2 ${D}, ${t('F.position', { p: 11 })} Field notes — draft`]], 'named as heard: the bar and the dot a pause, the first line\'s own dash kept');
    assert.ok(hostEl.innerHTML.includes(`<span class="id">${D}</span> │ <span class="id">${O}</span>`) && hostEl.innerHTML.includes(`<span class="id">${D}</span> · ${esc(t('F.position', { p: 11 }))}`), 'drawn as it stands, the bar and the dot among it');
  } finally { HOST.dismiss(); REC.invalidate(D); }
});
