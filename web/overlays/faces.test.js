// O-FACES's test, on a stand-in of the overlay host's element: a `withheld`
// refusal of a read's document consult shows THE DOCUMENT-LEVEL WITHHELD
// FACE (B1 §1's A-170; R56: existence and owner, never bytes) — the document
// named in the withheld box's words, "withheld · ⟨owner⟩" — the words the
// plane's box, the corner and the mirror say — its
// owner by the one owner rule (the seat above a sub-account, never the
// sub-account), the entitlement arm for that owner and this reader beneath,
// for a signed-in reader, a guest whose device holds a key for this board and
// a guest with none — the owner-grant default, C-36's key-present default and
// R56's key-absent default; no token left unfilled, none of C-39's words,
// which are a link address's alone, and no act but its head's (issue #179's
// design decision): its address before its words where the face stands away
// from the document's place, whole the first time a session shows them and
// compact the next, its head opening the rest and folding it, a change of the
// page's class a new session (a mutant that always shows them whole, never
// starts a new session, or drops the address turns red); of the document the
// board names in the rejection's `site.addr`, never another the act named (a
// mutant that takes the act's turns red), named by the act's caption and said
// so (a mutant that drops it turns red); C-67's pointer beneath the arm where
// the edition claims on the document decide one, the claims read for the face
// once and the face shown again as they land, its act the LEAP handed in (a
// mutant that never shows it again turns red). A mutant that fills C-39 with
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
// not read show the document-level face, naming the document they asked of,
// each named by its card's caption (a mutant that drops it turns red).
// A jump reading (issue #136) says so in its own words at its site, heard
// through the status region, offering no act and named apart from a notice's
// face; it ends where it still stands, and a face shown in its place stands
// on (a mutant that ends whatever stands turns red). A jump reaching (FP-25)
// says so in its own words at the act's site, heard through the status
// region, offering no act; its dismissal — Esc's — abandons the jump, and an
// overlay shown in its place does not (a mutant that abandons on a
// replacement, or never, turns red). At the line's sign-in act a death's face
// says its arm's words, the line's own — "signed out" the page's own close's
// alone — and no refusal of a session the shell no longer holds reads
// "signed out" (issue #175: a mutant that says the sign-out's words for the
// mode or the retirement arm, or for `session_ended`, turns red). At a
// COVERED document while the ending stands (issue #177) the withheld face
// says the one line's words for that ending in the arm's place — the
// sign-out's, or a refused re-acquire's leading the guest line — and offers
// the line's sign-in act, faced where it stood; with no ending standing, the
// arm as anywhere (a mutant that keeps the entitlement arm, or offers no act,
// turns red); and so at a document whose text the page holds as the ending
// stands (issue #179's first case: a mutant that reads the cover alone turns
// red).
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
 * class (`.face-text, .arm` …), it answers each `div`, `span` or `button` bearing one of those classes it holds, in order,
 * with its text — a control's inside it among it — as a person reads it
 */
const hostEl = {
  className: '', innerHTML: '', style: {}, setAttribute() {}, removeAttribute() {}, addEventListener() {}, querySelector: () => null,
  querySelectorAll: (/** @type {string} */ sel) => {
    const classes = sel.split(',').map((s) => s.trim().replace(/^\./, ''));
    return [...hostEl.innerHTML.matchAll(/<(div|span|button) class="([^"]*)"[^>]*>(.*?)<\/\1>/g)].filter((m) => m[2].split(/\s+/).some((c) => classes.includes(c))).map((m) => ({ textContent: text(m[3].replace(/<[^>]*>/g, '')) }));
  },
  getBoundingClientRect: () => ({ left: 0, top: 0, width: 0, height: 0 }), contains: () => false,
};
/** the one status region's stand-in: what the host says through it */
const live = { textContent: '', setAttribute() {} };

/** the face standing, as a person meets it: its name, its words and their string, the arm beneath them and its string, the acts its controls offer by name, whether its words are open where they fold, and what the host wrote */
function faceShown() {
  const o = HOST.currentState();
  if (!o) return null;
  const html = hostEl.innerHTML;
  const words = /<(div|button) class="face-text" data-string="([^"]*)"[^>]*>([^<]*)<\/\1>/.exec(html), arm = /<div class="arm" data-string="([^"]*)">([^<]*)<\/div>/.exec(html);
  const open = /class="face-text"[^>]* aria-expanded="(true|false)"/.exec(html);
  return { id: o.id, words: words && [words[2], text(words[3])], arm: arm && [arm[1], text(arm[2])], acts: [...html.matchAll(/data-run="([^"]*)"/g)].map((m) => m[1]), open: open ? open[1] === 'true' : null, html };
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
  REC.takeEditionClaims(X, []);
});

/**
 * The document-level withheld face standing for X, for a reader: its own withheld words, whole or compact, after the
 * caption of the act it answers where one names it, and after X's address where it stands away from X's place.
 * @param {typeof READERS[number]} reader
 * @param {string} what the act that met the refusal
 * @param {{whole: boolean, caption?: string, away?: boolean}} form whole, else compact — its head alone; the act's caption; its address before its words
 */
function heldToTheFace(reader, what, form) {
  const who = reader.who, { whole, caption, away } = form;
  const f = faceShown();
  const arm = entitlementArm({ account: reader.session ? reader.session.account : null, keyPresent: reader.keys.length > 0 }, OWNER);
  assert.equal(arm.id, reader.arm, `${what}, ${who}: the rule's arm for this reader is ${reader.arm}`);
  assert.equal(f?.id, 'face:withheld', `${what}, ${who}: the document-level withheld face`);
  assert.deepEqual(f.words, ['F.corner.withheld', t('F.corner.withheld', { owner: OWNER })], `${what}, ${who}: the withheld box's words, "withheld · ⟨owner⟩", naming ${OWNER}, the seat above the sub-account — never 1.0.2.1`);
  assert.equal(f.words[1], LAYER.withheldBox(REC.doc(X)), `${what}, ${who}: the words the plane's withheld box says`);
  const lead = (caption ? `<span class="label">${esc(caption)}</span>` : '') + (away ? `<div class="face-addr code">${X}</div>` : '') + '<button class="face-text"';
  assert.ok(f.html.startsWith(lead), `${what}, ${who}: ${caption ? 'named by the act\'s caption, ' : ''}${away ? 'the document\'s full address before its words, the face standing away from its place' : 'no address, the face standing at the document\'s own bytes'}: ${f.html}`);
  assert.deepEqual([f.open, f.arm], whole ? [true, [arm.id, arm.text]] : [false, null], `${what}, ${who}: ${whole ? 'whole — the entitlement arm for ' + OWNER + ' and this reader beneath them' : 'compact — the arm one act away'}`);
  assert.equal(live.textContent, [...(caption ? [caption] : []), ...(away ? [X] : []), t('F.corner.withheld', { owner: OWNER }), ...(whole ? [arm.text] : [])].join(' '), `${what}, ${who}: said through the status region as it stands, the act's caption first`);
  assert.ok(!f.html.includes('⟨'), `${what}, ${who}: no token left unfilled: ${f.html}`);
  assert.ok(!f.html.includes(C39), `${what}, ${who}: none of C-39's words — they are a link address's`);
  assert.deepEqual(f.acts, ['head'], `${what}, ${who}: no act but its head's, which opens the rest and folds it — no claim on it decides a pointer`);
}

test('a `withheld` refusal of a read\'s document consult shows the document-level withheld face: B1-S2\'s words naming the document\'s owner, the arm for that owner and this reader beneath, its address before them where the face stands away from its place, no token and no act but its head\'s — whole the first time a session shows it, compact the next, its head\'s act opening the rest and folding it; a change of the page\'s class a new session, whole again (A-170; R56; issue #179)', () => {
  for (const reader of READERS) {
    readAs(reader);
    FACES.classChanged();
    FACES.showRefusal(null, refusal('show_origin'), X);
    heldToTheFace(reader, 'the refusal', { whole: true, away: true });
    HOST.dismiss();
    FACES.withheld(X);
    heldToTheFace(reader, 'the face shown again', { whole: false, away: true });
    HOST.currentState()?.acts?.head(/** @type {any} */ ({}), true);
    heldToTheFace(reader, 'its head\'s act', { whole: true, away: true });
    HOST.currentState()?.acts?.head(/** @type {any} */ ({}), true);
    heldToTheFace(reader, 'its head\'s act again', { whole: false, away: true });
    HOST.dismiss();
  }
});

test('the face of a `withheld` refusal is the document the board names in the rejection\'s `site.addr`, never another the act named; and it is the act\'s answer, named by the caption the act hands it (issue #179\'s design decision: "The refusal names it in `site.addr`"; "Announce each face as the act\'s answer")', () => {
  const Y = '1.0.3.0.4', caption = `${t('B1.who-wrote')} · ${X} · ${t('F.position', { p: 1 })}`;
  REC.takeRefused(Y, 'withheld'); REC.takeEditionClaims(Y, []);
  readAs(READERS[0]);
  FACES.showRefusal({ span: { addr: X, pos: 1, width: 1 } }, { ...refusal('show_origin'), body: { code: 'withheld', disposition: 'reorder', op: 'show_origin', resp: 'rejected', site: { addr: Y } } }, X, { caption });
  const f = faceShown();
  assert.ok(f && f.html.startsWith(`<span class="label">${esc(caption)}</span><div class="face-addr code">${Y}</div>`), `the act's caption, then the document the board named — never ${X}, the face standing at ${X}'s own bytes: ${f && f.html}`);
  assert.deepEqual(f && f.words, ['F.corner.withheld', t('F.corner.withheld', { owner: '1.0.3' })], 'its words naming the owner of the document the board named');
  assert.ok(live.textContent.startsWith(caption + ' ' + Y + ' '), `said as the act's answer, its caption first: ${live.textContent}`);
  assert.equal(FACES.refusedDocument(refusal('show_origin'), X), X, 'a rejection naming no document: the one the act named');
  HOST.dismiss();
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

test('"who wrote this?" and "who uses this?" asked of a document the reader may not read show the document-level withheld face, naming the document they asked of, each named by its card\'s caption, the act\'s answer, no address before its words at the document\'s own bytes — whole the first time, compact the next (issue #179)', async () => {
  const fake = FAKE.create({
    [FAKE.keyOf('op', { frame: F.showOrigin(X, 1, 1) })]: { refused: refusal('show_origin') },
    [FAKE.keyOf('op', { frame: F.findDocsContaining([{ doc: X, spans: [{ ordinal: 1, positions: 1 }] }]) })]: { refused: refusal('find_docs_containing') },
  });
  PORT.boot(fake);
  for (const reader of READERS) {
    readAs(reader);
    FACES.classChanged();
    await PROV.wrote(X, 1);
    heldToTheFace(reader, 'who wrote this?', { whole: true, caption: `${t('B1.who-wrote')} · ${X} · ${t('F.position', { p: 1 })}` });
    HOST.dismiss();
    await PROV.uses(X, 1);
    heldToTheFace(reader, 'who uses this?', { whole: false, caption: `${t('B1.who-uses')} · ${X} · ${t('F.position', { p: 1 })}` });
    HOST.dismiss();
  }
  assert.deepEqual(fake.unanswered, []);
});

test('a withheld document\'s own words carry C-67\'s pointer where the edition claims on it decide one, its act the LEAP the caller hands in: the claims read for the face where the model holds none, once, the face shown at once and shown again with the pointer as they land; shown again compact, the pointer one act away with the arm (issue #179\'s design decision: "the pointer to any claimed published edition the reader can open")', async () => {
  // 1.0.2's draft X2, in its sub-account, withheld from the reader; its edition E2, published, claiming X2 from E2's own bytes
  const X2 = '1.0.2.1.0.4', E2 = '1.0.2.0.12', CLAIM = E2 + '.0.2.1', R20 = '1.1.0.1.0.1.0.3.14';
  const lookup = FAKE.keyOf('op', { frame: F.editionClaimsAt(X2) });
  const fake = FAKE.create({
    [lookup]: { result: { as_of: 1, resp: 'addrs', addrs: [CLAIM] } },
    [FAKE.keyOf('op', { frame: F.readLink(CLAIM) })]: { result: { as_of: 1, resp: 'link_value', link: { slots: [[{ start: E2 + '.0.1.1', width: '0.0.0.0.0.0.0.20' }], [{ start: X2, width: '0.0.0.0.0.1' }], [{ start: R20, width: '0.0.0.0.0.0.0.0.1' }]] } } },
    [FAKE.keyOf('op', { frame: F.docMetadata(E2) })]: { result: { as_of: 1, resp: 'doc_metadata', doc: E2, published: true, owner: OWNER, birth: E2 + '.1', birth_extent: '20', placed: null, base_extent: null, source: null } },
  });
  PORT.boot(fake);
  readAs(READERS[0]);
  REC.takeRefused(X2, 'withheld');
  FACES.classChanged();
  /** @type {Array<[string, boolean]>} the LEAPs the pointer's act asked for: the home, and whether a key made it */
  const leaps = [];
  const asked = { follow: (/** @type {string} */ home, /** @type {boolean} */ byKey) => { leaps.push([home, byKey]); } };
  const pointer = `<div class="clause" data-string="C-67.pointer"><button data-run="follow" data-claim="${CLAIM}" data-home="${E2}">${esc(t('C-67.pointer'))}</button></div>`;
  FACES.withheld(X2, null, asked);
  assert.deepEqual([faceShown()?.id, faceShown()?.open, faceShown()?.acts], ['face:withheld', true, ['head']], 'shown whole at once, before the claims answer: no pointer yet');
  for (let i = 0; i < 50 && !faceShown()?.acts.includes('follow'); i++) await new Promise((r) => setTimeout(r, 0));
  const f = faceShown(), arm = entitlementArm(REC.reader(), OWNER);
  assert.ok(f && f.open && f.html.includes(`<div class="arm" data-string="${arm.id}">${esc(arm.text)}</div>${pointer}<button class="x"`), `shown again whole as the claims land, the pointer beneath the arm, the last before the dismiss: ${f && f.html}`);
  HOST.currentState()?.acts?.follow(/** @type {any} */ ({}), true);
  assert.deepEqual(leaps, [[E2, true]], 'its act the LEAP to the edition the claim names');
  HOST.dismiss();
  FACES.withheld(X2, null, asked);
  assert.deepEqual([faceShown()?.open, faceShown()?.acts], [false, ['head']], 'shown again: compact, the pointer one act away');
  HOST.currentState()?.acts?.head(/** @type {any} */ ({}), true);
  assert.ok(faceShown()?.html.includes(pointer), 'its head\'s act opens the rest, the pointer among it');
  HOST.dismiss();
  FACES.withheld(X2, null, {});
  assert.deepEqual(faceShown()?.acts, ['head'], 'no LEAP handed in: no pointer');
  HOST.dismiss();
  assert.deepEqual([fake.asked.filter((k) => k === lookup).length, fake.unanswered], [1, []], 'the claims asked once');
});

test('a jump reading says so in its own words, as a face is heard, and offers no act; it ends where it still stands, and an overlay shown since stands on (issue #136)', () => {
  const D = '1.0.1.0.3', at = { span: { addr: D, pos: 11, width: 5 } };
  FACES.reading(D, at);
  const f = faceShown(), o = HOST.currentState();
  assert.deepEqual([f?.id, f?.words, f?.acts, o?.anchor, o?.takeFocus], ['reading:' + D, ['L.reading', t('L.reading', { address: D })], [], at, undefined], 'its words at the site it is shown at, no act, no focus taken');
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

test('a jump reaching says so in its own words at the act\'s site, heard as a face is, offering no act; its dismissal abandons the jump, an overlay shown in its place does not (FP-25)', () => {
  const D = '1.0.1.0.3', at = { span: { addr: D, pos: 11, width: 5 }, sign: D };
  let abandoned = 0;
  FACES.reaching(D, at, () => { abandoned++; });
  const f = faceShown(), o = HOST.currentState();
  assert.deepEqual([f?.id, f?.words, f?.acts, o?.anchor, o?.takeFocus], ['reaching:' + D, ['L.reaching', t('L.reaching', { address: D })], [], at, undefined], 'its words at the act\'s site, no act, no focus taken');
  assert.equal(live.textContent, t('L.reaching', { address: D }), 'heard through the one status region');
  FACES.unregistered(D, at);
  assert.deepEqual([HOST.currentState()?.id, abandoned], ['face:doc_not_registered', 0], 'a face shown in its place: the jump not abandoned');
  HOST.dismiss();
  FACES.reaching(D, at, () => { abandoned++; });
  HOST.dismiss();
  assert.deepEqual([HOST.currentState(), abandoned], [null, 1], 'dismissed — Esc\'s innermost thing — it abandons the jump');
});

test('at the line\'s sign-in act a death\'s face says its arm\'s words — the mode arm\'s, the self-retirement\'s, the sign-out marker\'s for the page\'s own close alone — the words the line\'s death arm says; an arm whose words this page does not hold shows none, and no refusal of a session the shell no longer holds reads "signed out" (C-137; issue #175: "\'signed out\' stays on the sign-out path alone")', () => {
  /** @type {Array<[import('../bridge/shapes').DeathReason, string]>} each death's reason, and the string its face says */
  const deaths = [[{ arm: 'mode', mode: 'ENFORCING' }, 'C-137.mode'], [{ arm: 'retired', fingerprint: 'fp-1', own: true }, 'C-137.self'], [{ arm: 'closed' }, 'C-137.signed-out']];
  for (const [reason, id] of deaths) {
    FACES.deathFace(reason, null);
    const f = faceShown();
    assert.deepEqual([f?.id, f?.words, f?.acts, FACES.deathWords(reason)], ['face:session:' + reason.arm, [id, t(id)], [], { id, text: t(id) }], `the ${reason.arm} arm: its words at the act, the line's own (deathWords)`);
    assert.equal(live.textContent, t(id), `the ${reason.arm} arm: heard as a face is`);
    HOST.dismiss();
  }
  /** @type {import('../bridge/shapes').DeathReason[]} the arms whose faces read records this page does not read */
  const wordless = [{ arm: 'seeded', account: '1.0.1.1', as_of: 9, writer: 'fp-2' }, { arm: 'blocked', record: '1.0.1.0.7', ground: null }, { arm: 'unreachable', text: 'refused' }];
  for (const reason of wordless) {
    FACES.deathFace(reason, null);
    assert.deepEqual([FACES.deathWords(reason), HOST.currentState()], [null, null], `the ${reason.arm} arm: no words, so no face — never the sign-out's`);
  }
  for (const name of ['session_ended', 'session_died']) assert.notEqual(FACES.wordsFor(/** @type {Refusal} */ ({ kind: 'shell', name })).id, 'C-137.signed-out', `${name}: a session the shell no longer holds is not the person's sign-out`);
});

// placed last: the endings drop every read the tests above hold
test('the withheld face at a COVERED document — one the class the page left read, withheld from the class it reads at now — while the ending stands says the one line\'s words for that ending in the arm\'s place, and offers the line\'s sign-in act, faced where the face stood: "signed out" for the page\'s own close; "could not reconnect as ⟨account⟩ after a restart" leading the guest line for a re-acquire refused — never the entitlement arm (issue #177: "sign-in is offered in the one line\'s words for that ending"); and so at any document whose text the page holds as the ending stands (issue #179: "Its text is on screen … Where the session ended, show the session-ended notice, offer sign-in")', () => {
  const Y = '1.0.1.0.8', at = { span: { addr: Y, pos: 1 }, sign: Y };
  /** @type {Array<[string, () => void, {id: string, text: string}, string]>} each ending, its words and the face its sign-in act shows */
  const endings = [
    ['the page\'s own close', () => REC.sessionDied({ arm: 'closed' }), { id: 'C-137.signed-out', text: t('C-137.signed-out') }, 'face:session:closed'],
    ['a re-acquire refused', () => REC.sessionLost({ kind: 'shell', name: 'no_key' }), { id: 'L.reconnect-refused', text: t('L.reconnect-refused', { account: '1.0.1' }) + ' · ' + t('B1.guest-line') }, 'face:session:no_key'],
  ];
  try {
    for (const [what, end, words, signIn] of endings) {
      readAs(READERS[0]);
      REC.invalidate(Y);
      REC.takeSpanSet(Y, [{ subspace: 1, ordinal: 1, positions: 12 }]);
      end();
      REC.takeRefused(Y, 'withheld');
      assert.equal(REC.covered(Y), true, `${what}: the draft the session read, withheld now, is covered`);
      FACES.withheld(Y, at);
      const f = faceShown(), o = HOST.currentState();
      assert.deepEqual([f?.id, f?.words, f?.arm], ['face:withheld', ['F.corner.withheld', t('F.corner.withheld', { owner: '1.0.1' })], [words.id, words.text]], `${what}: the withheld box's words, the ending's beneath them`);
      assert.ok(f && f.html.includes(`<button data-run="a0" class="">${esc(t('F.sign-in'))}</button>`) && !f.html.includes('R56') && !f.html.includes(esc(t('R56.key-absent', { owner: '1.0.1' }))), `${what}: its one act the line's sign-in, no entitlement arm: ${f && f.html}`);
      o?.acts?.a0(/** @type {any} */ ({}), false);
      assert.deepEqual([HOST.currentState()?.id, HOST.currentState()?.anchor], [signIn, at], `${what}: its act faces what the line's sign-in faces, where the face stood`);
      HOST.dismiss();
    }
    // a document read after the page's own close, then withheld: its text on screen, access changed after it was read (issue #179's first case)
    readAs(READERS[0]);
    REC.sessionDied({ arm: 'closed' });
    const Z = '1.0.1.0.14';
    REC.takeSpanSet(Z, [{ subspace: 1, ordinal: 1, positions: 4 }]);
    REC.takeDelivery(Z, [{ pos: 1, width: 4, kind: 'content', text: 'Seen', ref: null, origin: null }]);
    REC.takeRefused(Z, 'withheld');
    assert.deepEqual([REC.covered(Z), FACES.accessChanged(Z)], [false, true], 'never covered, its text held: its access changed after it was read');
    FACES.withheld(Z, { span: { addr: Z, pos: 1 } });
    assert.deepEqual([faceShown()?.arm, faceShown()?.acts], [['C-137.signed-out', t('C-137.signed-out')], ['a0']], 'its text on screen as the session ended: the ending\'s words and the line\'s sign-in, never its own withheld words');
    HOST.dismiss();
    REC.setSession(READERS[0].session);
    REC.takeRefused(Y, 'withheld');
    REC.takeEditionClaims(Y, []);
    FACES.withheld(Y, at);
    assert.deepEqual(faceShown()?.arm?.[0], entitlementArm({ account: '1.0.1', keyPresent: true }, '1.0.1').id, 'no ending standing: the entitlement arm, as at any withheld document');
    HOST.dismiss();
  } finally { REC.setSessionRefused(null); REC.takeOwner('1.0.2.1', { prefix: OWNER, principal: 901 }); REC.takeRefused(X, 'withheld'); }
});
