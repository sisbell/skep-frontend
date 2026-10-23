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
// decides it on the session alone turns red. A withheld run's face whole
// (D5 K-7) is its placeholder's record: the head naming its origin's owner,
// the arm for that owner and each reader, then C-67's clause as the origin's
// edition claims decide it — nothing where none stands, the QUOTING sibling a
// line, the pointer a button carrying the claim it follows, the face's one
// act, the LEAP to that claim's home — none of C-39's words, at the run's own
// positions, taking no focus, the status region saying it whole, the clause
// with it (a mutant that drops the clause, offers an act beside the pointer,
// takes the focus, or says no clause turns red). Against the FAKE PORT,
// "who wrote this?" and "who uses this?" asked of a document the reader may
// not read show the document-level face, naming the document they asked of.
// A jump reading (issue #136) says so in its own words at its site, heard
// through the status region, offering no act and named apart from a notice's
// face; it ends where it still stands, and a face shown in its place stands
// on (a mutant that ends whatever stands turns red).
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
import * as FOCUS from '../nav/focus.js';
import { entitlementArm } from '../text/article.js';
import { homeOf, resolveSpan, unitSpan } from '../model/address.js';
import { STRINGS, t } from '../strings.js';
import { esc, byteLength } from '../util.js';

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

/** HTML text as a person reads it: the escapes `esc` writes undone */
const text = (/** @type {string} */ s) => s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&amp;/g, '&');

/**
 * The overlay host's stand-in element: what the host writes into it is what a person meets. Asked for its lines by
 * class (`.face-text, .arm` …), it answers each `div` of those classes it holds, in order, with its text — a control's
 * inside it among it — as a person reads it
 */
const hostEl = {
  className: '', innerHTML: '', style: {}, setAttribute() {}, removeAttribute() {}, addEventListener() {}, querySelector: () => null,
  querySelectorAll: (/** @type {string} */ sel) => {
    const classes = sel.split(',').map((s) => s.trim().replace(/^\./, ''));
    return [...hostEl.innerHTML.matchAll(/<div class="([^"]*)"[^>]*>(.*?)<\/div>/g)].filter((m) => classes.includes(m[1])).map((m) => ({ textContent: text(m[2].replace(/<[^>]*>/g, '')) }));
  },
  getBoundingClientRect: () => ({ left: 0, top: 0, width: 0, height: 0 }), contains: () => false,
};
/** the one status region's stand-in: what the host says through it */
const live = { textContent: '', setAttribute() {} };

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
  FOCUS.attach({ live: /** @type {any} */ (live) });
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

test('a withheld run\'s face whole is its placeholder\'s record: the head, the arm for its origin\'s owner and this reader, then C-67\'s clause — the pointer its act, the QUOTING sibling a line, nothing where no claim stands — at the run\'s own positions, taking no focus (D5 K-7, K-58)', () => {
  // 1.0.1's edition W, windowing a run of X — 1.0.2's draft in its sub-account — that the reader may not read
  const W = '1.0.1.0.5', text = 'Tumbler.\n\n', n = byteLength(text);
  REC.takeSpanSet(W, [{ subspace: 1, ordinal: 1, positions: n + 240 }]);
  REC.takeDelivery(W, [{ pos: 1, width: n, kind: 'content', text, ref: null, origin: null }, { pos: n + 1, width: 240, kind: 'withheld', text: '', ref: null, origin: X }]);
  const run = REC.doc(W).blocks[1];
  // two edition claims of 1.0.2's on X, each homed in a published edition of theirs: one over its own bytes, one quoting X
  const R20 = '1.1.0.1.0.1.0.3.14', EDITION = '1.0.2.0.9', OWN = EDITION + '.0.2.1', QUOTES = '1.0.2.0.11.0.2.1';
  for (const [c, from] of /** @type {Array<[string, string]>} */ ([[OWN, EDITION + '.0.1.1'], [QUOTES, X + '.0.1.1']])) {
    REC.takeLink({ addr: c, from: [resolveSpan({ start: from, width: '0.0.0.0.0.0.0.20' })], to: [resolveSpan(unitSpan(X))], type: R20 });
    const home = /** @type {string} */ (homeOf(c));
    REC.takeMetadata(home, { doc: home, published: true, owner: OWNER, birth: home + '.1', birthExtent: 20, placed: null, baseExtent: null, source: null, asOf: 1 });
  }
  /** @type {Array<[string, string[], string, string[]]>} each state of X's claims the page holds, the clause beneath the arm it decides, and the clause's words */
  const states = [
    ['no claim on the origin', [], '', []],
    ['an edition quoting the draft alone', [QUOTES], `<div class="clause" data-string="C-67.quoting">${esc(t('C-67.quoting', { claimant: OWNER }))}</div>`, [t('C-67.quoting', { claimant: OWNER })]],
    ['1.0.2\'s edition over its own bytes', [QUOTES, OWN], `<div class="clause" data-string="C-67.pointer"><button data-run="follow" data-claim="${OWN}" data-home="${EDITION}">${esc(t('C-67.pointer'))}</button></div>`, [t('C-67.pointer')]],
  ];
  try {
    for (const reader of READERS) {
      readAs(reader);
      const arm = entitlementArm({ account: reader.session ? reader.session.account : null, keyPresent: reader.keys.length > 0 }, OWNER);
      for (const [state, claims, clause, said] of states) {
        const what = `${reader.who}, ${state}`;
        REC.takeEditionClaims(X, claims);
        /** @type {Array<[string, boolean]>} the LEAPs the face's act asked for: the home, and whether a key made it */
        const leaps = [];
        FACES.withheldRun(W, run, (home, byKey) => { leaps.push([home, byKey]); });
        const f = faceShown(), o = HOST.currentState(), head = t('B1.withheld-run', { owner: OWNER, account: OWNER, width: 240, origin: X });
        assert.equal(f?.id, 'face:withheld-run', `${what}: the run's face`);
        assert.deepEqual(f.words, ['B1.withheld-run', head], `${what}: the placeholder's head, naming ${OWNER}, the owner of the run's origin`);
        assert.equal(live.textContent, [head, arm.text, ...said].join(' '), `${what}: the status region says the face whole — its head, its arm and its clause`);
        assert.ok(o?.html.endsWith(`<div class="arm" data-string="${arm.id}">${esc(arm.text)}</div>${clause}`), `${what}: the arm for ${OWNER} and this reader, then the clause the claims decide, and nothing after it: ${o?.html}`);
        assert.ok(!f.html.includes('⟨') && !f.html.includes(C39), `${what}: no token left unfilled, and none of C-39's words`);
        assert.deepEqual(o?.anchor, { span: { addr: W, pos: run.pos, width: 240 } }, `${what}: at the run's own positions`);
        assert.ok(!o?.takeFocus, `${what}: it takes no focus (K-58)`);
        assert.deepEqual(Object.keys(o?.acts || {}), clause.includes('data-run') ? ['follow'] : [], `${what}: the pointer its one act, and no act besides`);
        if (o && o.acts && o.acts.follow) { o.acts.follow(/** @type {any} */ ({}), true); assert.deepEqual(leaps, [[EDITION, true]], `${what}: its act the LEAP to the edition the claim names`); }
        HOST.dismiss();
      }
    }
  } finally {
    REC.takeEditionClaims(X, []);
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

test('a jump reading says so in its own words, as a face is heard, and offers no act; it ends where it still stands, and an overlay shown since stands on (issue #136)', () => {
  const D = '1.0.1.0.3', at = { span: { addr: D, pos: 11, width: 5 } };
  FACES.reading(D, at);
  const f = faceShown(), o = HOST.currentState();
  assert.deepEqual([f?.id, f?.words, f?.acts, o?.anchor, o?.takeFocus], ['reading:' + D, ['L.reading', t('L.reading', { address: D })], false, at, undefined], 'its words at the site it is shown at, no act, no focus taken');
  assert.ok(!f?.id.startsWith('face:'), 'never named as a notice\'s face is');
  assert.equal(live.textContent, t('L.reading', { address: D }), 'heard through the one status region, as a face is');
  FACES.endReading();
  assert.equal(HOST.currentState(), null, 'ended where it stands');
  FACES.reading(D, at);
  FACES.unregistered(D, at);
  FACES.endReading();
  assert.equal(HOST.currentState()?.id, 'face:doc_not_registered', 'the face its read brought, shown in its place, stands on');
  HOST.dismiss();
});
