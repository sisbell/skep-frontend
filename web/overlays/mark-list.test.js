// O-MARK-LIST's test, on a stand-in of the host's element: a continuation's
// mark's list opened at the mark, the walk on the mark's stop first; its rows
// the mark's members newest first, a page at a time, each the document's
// label as the plane draws it — the address of the version its box shows,
// then its first line — read from the model with no read made; its caption
// the mark's count in what it counts; opened by a key its newest row taking
// the focus, by a press none; a row's act a LEAP to its document, one trail
// entry taken and the list ending as the camera leaves (issue #42).
import { test, before } from 'node:test';
import assert from 'node:assert/strict';
import * as MARKLIST from './mark-list.js';
import * as HOST from './host.js';
import * as REC from '../model/records.js';
import * as CAM from '../plane/camera.js';
import * as WALK from '../nav/walk.js';
import * as GO from '../nav/go.js';
import * as TRAIL from '../nav/trail.js';
import * as PORT from '../bridge/port.js';
import * as FAKE from '../test/fake-port.js';
import { accountCell } from '../plane/projection.js';
import { t, markCount } from '../strings.js';
import { byteLength } from '../util.js';

/** the host's stand-in element: the markup written into it, and the control the focus went to, by its `data-run` */
const host = { html: '', focused: /** @type {string | null} */ (null) };
const hostEl = {
  className: '', style: {}, setAttribute() {}, removeAttribute() {}, addEventListener() {}, getBoundingClientRect: () => ({ left: 0, top: 0, width: 0, height: 0 }), contains: () => false, querySelectorAll: () => [],
  get innerHTML() { return host.html; },
  set innerHTML(/** @type {string} */ v) { host.html = v; },
  /** the first control in order, as the host's focus rule looks for it: the first act */
  querySelector: (/** @type {string} */ sel) => { const run = (/data-run="([^"]*)"/.exec(host.html) || [])[1]; return sel.includes('[data-run]') && run ? { dataset: { run }, focus() { host.focused = run; } } : null; },
};

/** a port that answers nothing: every call it is asked is one the list made */
const fake = FAKE.create({});

/** the account's documents 1 … 100, each its first line "Notes on ⟨n⟩": at HOME its first continuation — the 49th on, fifty-two of them — is one mark */
before(() => {
  PORT.boot(fake);
  globalThis.document = /** @type {any} */ ({ activeElement: null, body: null, getElementById: () => null, addEventListener() {} });
  globalThis.window = /** @type {any} */ ({ addEventListener() {}, getSelection: () => null });
  REC._reset();
  REC.setBoard({ board: 'b-1', name: '', origin: '' });
  REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  REC.takeIndex(/** @type {any} */ ({ docs: Array.from({ length: 100 }, (_, i) => ({ doc: `1.0.1.0.${i + 1}`, kind: 'edition', label: `Notes on ${i + 1}`, standing: 'public' })), counts: [{ account: '1.0.1', documents: 100 }], state: { arm: 'complete' } }));
  CAM.setViewport(1440, 900);
  CAM.set(CAM.viewForCell(accountCell('1.0.1'), 0.85));
  HOST.attach(/** @type {any} */ (hostEl));
});

/** the rows the list shows, in order: each its address and its words, as a person reads them */
const rows = () => [...host.html.matchAll(/<li><button data-run="(m\d+)"><span class="id">([^<]*)<\/span> <span class="dim">(.*?)<\/span><\/button><\/li>/g)].map((m) => [m[1], m[2], m[3].replace(/<[^>]*>/g, '')]);
/** the list opened at the mark, run until it shows */
async function opened(/** @type {boolean} */ byKey) {
  host.focused = null;
  await MARKLIST.open('1.0.1:1', byKey);
  assert.equal(HOST.currentState()?.id, 'mark:1.0.1:1', 'the mark\'s list');
}

test('the list opens at the mark with the walk on the mark\'s stop: its members newest first, a page at a time, each row the document\'s address and its first line, its caption the mark\'s count in what it counts — and no read made', async () => {
  try {
    await opened(false);
    assert.deepEqual([WALK.current()?.kind, WALK.current()?.addr], ['mark', '1.0.1:1'], 'the walk on the mark\'s stop: the list\'s opener');
    assert.ok(host.html.startsWith(`<span class="label">${markCount(52, true)} · <span class="id">1.0.1</span></span>`), `its caption: ${host.html.slice(0, 120)}`);
    assert.deepEqual(rows(), Array.from({ length: 12 }, (_, i) => [`m${i}`, `1.0.1.0.${100 - i}`, `Notes on ${100 - i}`]), 'a page of its members, the newest — the highest-numbered — first');
    assert.ok(host.html.includes(`data-run="more">${t('B1.show-more')}</button>`), 'more to show');
    /** @type {any} */ (HOST.currentState()?.acts)?.more(null, false);
    assert.deepEqual(rows().length, 24, 'a page more');
    for (let i = 0; i < 3; i++) /** @type {any} */ (HOST.currentState()?.acts)?.more(null, false);
    assert.deepEqual([rows().length, rows()[51], host.html.includes('data-run="more"'), host.html.includes('<span class="end">·</span>')], [52, ['m51', '1.0.1.0.49', 'Notes on 49'], false, true], 'every member, its oldest last, the end marked');
    assert.equal(host.focused, null, 'opened by a press: the focus taken by none of its rows');
    assert.deepEqual(fake.asked, [], 'no read made');
  } finally { HOST.dismiss(); }
});

test('opened by a key the list takes the focus on its newest row; a row\'s act is a LEAP to its document, one trail entry taken at the act, the list ending as the camera leaves', async () => {
  try {
    await opened(true);
    assert.deepEqual([HOST.currentState()?.takeFocus, host.focused], [true, 'm0'], 'the newest row takes the focus');
    // the newest's text held: the LEAP reads nothing
    const NEWEST = '1.0.1.0.100', text = 'Notes on 100';
    REC.takeSpanSet(NEWEST, [{ subspace: 1, ordinal: 1, positions: byteLength(text) }]);
    REC.takeDelivery(NEWEST, [{ pos: 1, width: byteLength(text), kind: 'content', text, ref: null, origin: null }]);
    TRAIL._reset();
    const act = /** @type {any} */ (HOST.currentState()?.acts)?.m0;
    act(null, true);
    assert.deepEqual([TRAIL.all().map((e) => e.addr), CAM.flying(), HOST.currentState()], [[NEWEST], true, null], 'one entry, the camera leaving, the list ended');
    CAM.step(Infinity);
    await new Promise((r) => setTimeout(r, 0));
    assert.deepEqual([WALK.current()?.kind, WALK.current()?.addr], ['document', GO.shownIn(NEWEST)], 'the walk on the document landed at');
    assert.deepEqual(fake.asked, [], 'no read made');
  } finally { HOST.dismiss(); }
});
