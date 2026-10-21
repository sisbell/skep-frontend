// APP-INPUT's test, on a page of stand-ins: the act at a withheld run's
// placeholder conjures C-39's face naming the owner the placeholder names —
// its run's origin's, by T-LAYER's one owner rule — with the arm beneath it
// the placeholder's own (B1-S5, B1-S7). Where the board answers the origin's
// account's owner as the seat above it (`effective_owner`), a mutant that
// reads the owner off the origin's record by a rule of its own names the
// account and turns red.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as INPUT from './input.js';
import * as HOST from '../overlays/host.js';
import * as REC from '../model/records.js';
import * as LAYER from '../text/layer.js';
import { articleHTML, entitlementArm } from '../text/article.js';
import { t } from '../strings.js';
import { esc } from '../util.js';

/** the attributes of an element's opening tag, as the platform's `dataset` reads them */
const datasetOf = (/** @type {string} */ tag) =>
  Object.fromEntries([...tag.matchAll(/ data-([a-z-]+)="([^"]*)"/g)].map(([, k, v]) => [k.replace(/-([a-z])/g, (_, c) => c.toUpperCase()), v]));

test('the act at a withheld run conjures C-39\'s face naming the owner its placeholder names, the arm beneath it the placeholder\'s own', () => {
  const platform = { document: globalThis.document, window: globalThis.window, HTMLElement: globalThis.HTMLElement };
  /** @type {Map<string, (e: unknown) => void>} the text layer's listeners, by event */
  const layer = new Map();
  const listens = (/** @type {Map<string, (e: unknown) => void> | null} */ into) => ({ addEventListener: (/** @type {string} */ type, /** @type {(e: unknown) => void} */ fn) => { if (into) into.set(type, fn); } });
  globalThis.HTMLElement = /** @type {any} */ (class {});
  globalThis.document = /** @type {any} */ ({ ...listens(null), activeElement: null, body: null });
  globalThis.window = /** @type {any} */ ({ ...listens(null), getSelection: () => null });
  try {
    // a guest at 1.0.2's document, which windows a run of 1.0.1.1's: an unallocated sub-account, whose owner is the seat above it
    const D = '1.0.2.0.5', O = '1.0.1.1.0.2', owner = '1.0.1';
    REC.setSession(null);
    REC.takeOwner('1.0.1.1', { prefix: owner, principal: 900 });
    const text = 'Tumbler.\n\n', n = new TextEncoder().encode(text).length;
    REC.takeSpanSet(D, [{ subspace: 1, ordinal: 1, positions: n + 240 }]);
    REC.takeDelivery(D, [{ pos: 1, width: n, kind: 'content', text, ref: null, origin: null }, { pos: n + 1, width: 240, kind: 'withheld', text: '', ref: null, origin: O }]);
    const d = REC.doc(D);
    // the placeholder as the plane's article holds it: T-LAYER mounts T-ARTICLE's HTML from its view
    const tag = (/<span class="withheld"[^>]*>/.exec(articleHTML(d, LAYER.viewFor(d), LAYER.ownerAccount(d))) || [''])[0];
    const run = Object.assign(new globalThis.HTMLElement(), { dataset: datasetOf(tag), isConnected: false });
    Object.assign(run, { closest: (/** @type {string} */ sel) => (sel === '[data-withheld]' ? run : null) });
    assert.deepEqual([run.dataset.origin, run.dataset.owner], [O, owner], 'the placeholder carries its origin and its origin\'s owner, the seat above the origin\'s account');
    HOST.attach(/** @type {any} */ ({
      ...listens(null), className: '', innerHTML: '', style: {}, setAttribute() {}, removeAttribute() {},
      querySelector: () => null, querySelectorAll: () => [], contains: () => false, getBoundingClientRect: () => ({ width: 0, height: 0 }),
    }));
    INPUT.attach(/** @type {any} */ ({ plane: listens(null), layer: listens(layer), corners: listens(null) }));
    const click = layer.get('click');
    assert.ok(click, 'the text layer takes a click');
    click({ target: run, clientX: 0, clientY: 0, stopPropagation() {} });
    const face = HOST.currentOverlay();
    assert.equal(face && face.id, 'face:C-39', 'the act at the run conjures C-39\'s face');
    const html = face ? face.html : '';
    assert.ok(html.includes(`>${esc(t('C-39', { owner }))}</div>`), `the face names ${owner}, the owner the placeholder names — never the origin's account, 1.0.1.1`);
    assert.ok(html.includes(`>${esc(entitlementArm(null, owner).text)}</div>`), 'the arm beneath it is the placeholder\'s own: R56\'s key-absent default, naming the same owner');
    HOST.dismiss();
  } finally {
    globalThis.document = platform.document; globalThis.window = platform.window; globalThis.HTMLElement = platform.HTMLElement;
  }
});
