// O-FACES's test, on a stand-in of the overlay host's element: a `withheld`
// refusal of a read's document consult shows THE DOCUMENT-LEVEL WITHHELD
// FACE (B1 §1's A-170; R56: existence and owner, never bytes) — the document
// named in B1-S2's withheld box's words, the words the plane's box says, its
// owner by the one owner rule (the seat above a sub-account, never the
// sub-account), the entitlement arm for that owner and this reader beneath,
// for a signed-in reader, a guest whose device holds a key for this board and
// a guest with none — the owner-grant default, C-36's key-present default and
// R56's key-absent default; no token left unfilled, none of C-39's words,
// which are a link address's alone, and no act. A mutant that fills C-39 with
// the owner, takes the owner from the document's address, drops the arm, or
// decides it on the session alone turns red. Against the FAKE PORT, "who
// wrote this?" and "who uses this?" asked of a document the reader may not
// read show that face, naming the document they asked of.
import { test, before } from 'node:test';
import assert from 'node:assert/strict';
import * as FACES from './faces.js';
import * as HOST from './host.js';
import * as PROV from './provenance.js';
import * as PORT from '../bridge/port.js';
import * as REC from '../model/records.js';
import * as F from '../model/frames.js';
import * as FAKE from '../test/fake-port.js';
import * as LAYER from '../text/layer.js';
import { entitlementArm } from '../text/article.js';
import { STRINGS, t } from '../strings.js';
import { esc } from '../util.js';

/** @typedef {import('../bridge/shapes').Refusal} Refusal */

// a draft in 1.0.2's sub-account 1.0.2.1, withheld from the reader: its owner the seat above the sub-account
const X = '1.0.2.1.0.2', OWNER = '1.0.2';
/** the board's rejection of a read whose document argument the reader may not read: `withheld`, no `detail`, ever (wire.md §Rejections) */
const refusal = (/** @type {string} */ op) => /** @type {Refusal} */ ({ kind: 'refused', name: 'withheld', status: 200, code: 'withheld', detail: null, op, body: null });
/** the board's origin, and a key of the device's store bound at it as `fingerprint` answers it */
const ORIGIN = 'http://127.0.0.1:8642', BOUND = [{ bindings: [ORIGIN + ' principal 1 account 1.0.1'] }];
/**
 * The readers, each with the device's key store and the arm the face shows them: signed in; a guest whose device holds
 * a key for this board; a guest with none
 * @type {Array<{who: string, session: {session: string, principal: number, account: string} | null, keys: Array<{bindings: string[]}>, arm: string}>}
 */
const READERS = [
  { who: '1.0.1', session: { session: 's-1', principal: 1, account: '1.0.1' }, keys: BOUND, arm: 'C-36.owner-grant.arm' },
  { who: 'a guest with a key for this board', session: null, keys: BOUND, arm: 'C-36.guest.key' },
  { who: 'a guest with no key', session: null, keys: [], arm: 'R56.key-absent' },
];
/** the page reading as one of the readers: its session, and the device's key store read for this board */
const readAs = (/** @type {typeof READERS[number]} */ reader) => { REC.setSession(reader.session); REC.takeKeyStore(reader.keys, ORIGIN); };

/** the overlay host's stand-in element: what the host writes into it is what a person meets */
const hostEl = { className: '', innerHTML: '', style: {}, setAttribute() {}, removeAttribute() {}, addEventListener() {}, querySelector: () => null, querySelectorAll: () => [], getBoundingClientRect: () => ({ left: 0, top: 0, width: 0, height: 0 }), contains: () => false };

/** HTML text as a person reads it: the escapes `esc` writes undone */
const text = (/** @type {string} */ s) => s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&amp;/g, '&');

/** the face standing, as a person meets it: its name, its words and their string, the arm beneath them and its string, whether it offers an act, and what the host wrote */
function faceShown() {
  const o = HOST.currentState();
  if (!o) return null;
  const html = hostEl.innerHTML;
  const words = /<div class="face-text" data-string="([^"]*)">([^<]*)<\/div>/.exec(html), arm = /<div class="arm" data-string="([^"]*)">([^<]*)<\/div>/.exec(html);
  return { id: o.id, words: words && [words[1], text(words[2])], arm: arm && [arm[1], text(arm[2])], acts: html.includes('data-run'), html };
}

/** C-39's words past its owner: what it says of a link address, which no document-level face says */
const C39 = esc(STRINGS['C-39'].text.split('⟨owner⟩')[1]);

before(() => {
  globalThis.document = /** @type {any} */ ({ activeElement: null, body: null });
  globalThis.HTMLElement = /** @type {any} */ (class {});
  HOST.attach(/** @type {any} */ (hostEl));
  REC.takeOwner('1.0.2.1', { prefix: OWNER, principal: 901 });
  REC.takeRefused(X, 'withheld');
});

/**
 * The document-level withheld face standing for X, for a reader.
 * @param {typeof READERS[number]} reader
 * @param {string} what the act that met the refusal
 */
function heldToTheFace(reader, what) {
  const who = reader.who;
  const f = faceShown();
  const arm = entitlementArm({ account: reader.session ? reader.session.account : null, keyPresent: reader.keys.length > 0 }, OWNER);
  assert.equal(arm.id, reader.arm, `${what}, ${who}: the rule's arm for this reader is ${reader.arm}`);
  assert.equal(f?.id, 'face:withheld', `${what}, ${who}: the document-level withheld face`);
  assert.deepEqual(f.words, ['B1.withheld-box', t('B1.withheld-box', { owner: OWNER })], `${what}, ${who}: B1-S2's words, naming ${OWNER}, the seat above the sub-account — never 1.0.2.1`);
  assert.equal(f.words[1], LAYER.withheldBox(REC.doc(X)), `${what}, ${who}: the words the plane's withheld box says`);
  assert.deepEqual(f.arm, [arm.id, arm.text], `${what}, ${who}: the entitlement arm for ${OWNER} and this reader beneath them`);
  assert.ok(!f.html.includes('⟨'), `${what}, ${who}: no token left unfilled: ${f.html}`);
  assert.ok(!f.html.includes(C39), `${what}, ${who}: none of C-39's words — they are a link address's`);
  assert.equal(f.acts, false, `${what}, ${who}: no act`);
}

test('a `withheld` refusal of a read\'s document consult shows the document-level withheld face: B1-S2\'s words naming the document\'s owner, the arm for that owner and this reader beneath, no token and no act (A-170; R56)', () => {
  for (const reader of READERS) {
    readAs(reader);
    FACES.showRefusal(null, refusal('show_origin'), X);
    heldToTheFace(reader, 'the refusal');
    HOST.dismiss();
    FACES.withheld(X);
    heldToTheFace(reader, 'the face asked by name');
    HOST.dismiss();
  }
});

test('"who wrote this?" and "who uses this?" asked of a document the reader may not read show the document-level withheld face, naming the document they asked of', async () => {
  const fake = FAKE.create({
    [FAKE.keyOf('op', { frame: F.showOrigin(X, 1, 1) })]: { refused: refusal('show_origin') },
    [FAKE.keyOf('op', { frame: F.findDocsContaining([{ doc: X, spans: [{ ordinal: 1, positions: 1 }] }]) })]: { refused: refusal('find_docs_containing') },
  });
  PORT.boot(fake);
  for (const reader of READERS) {
    readAs(reader);
    await PROV.wrote(X, 1);
    heldToTheFace(reader, 'who wrote this?');
    HOST.dismiss();
    await PROV.uses(X, 1);
    heldToTheFace(reader, 'who uses this?');
    HOST.dismiss();
  }
  assert.deepEqual(fake.unanswered, []);
});
