// O-FACES's test, on a stand-in of the overlay host's element and against
// the fake port: the document-level withheld face a `withheld` refusal shows
// (A-170; R56) — the withheld box's words naming the owner by the one owner
// rule, the entitlement arm for that owner and each reader beneath, its
// address before its words away from the document's place, whole the first
// time a session shows it and compact the next, of the document the board
// names in `site.addr`, named by the act's caption (FP-26); C-67's clause
// beneath the arm in the same words on the document's face and a run's — the
// pointer, the quoting sibling, "edition claims not read", nothing where the
// lookup was refused as withheld — the claims read once before either shows
// (FP-33); a withheld run's face whole as its placeholder's record, at the
// run's positions, taking no focus; "who wrote this?" and "who uses this?"
// refused `withheld` showing that face; a jump reading and a jump reaching
// (FP-25); the dead end's face and the version offer it takes as it is found
// (FP-21); a death's face saying its arm's words, "signed out" the page's own
// close's alone (FP-28); the withheld face at a covered document while the
// ending stands saying the ending's words and offering sign-in (FP-29); a
// walk's moment as the walk's state (FP-36) — folded by every way the page
// ends an overlay with its typed text kept, unfolded over the view it was
// left over, drawn by its kind, its refusal drawn inside it, only its own
// cancel cancelling, its walk's next moment opening as the last was left,
// one raised over a surface of the reader's opening folded, an unfold an act;
// and where no board is held, why as one entry and the no-board face with
// what still works (FP-35).
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
import * as KEYS from '../nav/keys.js';
import * as GO from '../nav/go.js';
import * as TRAIL from '../nav/trail.js';
import * as CAM from '../plane/camera.js';
import { accountCell } from '../plane/projection.js';
import { entitlementArm } from '../text/article.js';
import { homeOf, resolveSpan, unitSpan } from '../model/address.js';
import { STRINGS, t, addressedHTML } from '../strings.js';
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
  const words = /<(div|button) class="face-text" data-string="([^"]*)"[^>]*>((?:[^<]|<\/?span[^>]*>)*)<\/\1>/.exec(html), arm = /<div class="arm" data-string="([^"]*)">((?:[^<]|<\/?span[^>]*>)*)<\/div>/.exec(html);
  const open = /class="face-text"[^>]* aria-expanded="(true|false)"/.exec(html);
  /** an element's words as a person reads them: its markup's text, each address's span apart */
  const read = (/** @type {string} */ markup) => text(markup.replace(/<[^>]*>/g, ''));
  return { id: o.id, words: words && [words[2], read(words[3])], arm: arm && [arm[1], read(arm[2])], acts: [...html.matchAll(/data-run="([^"]*)"/g)].map((m) => m[1]), open: open ? open[1] === 'true' : null, html };
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
  // the board the page opened: the acts below — a jump, WHOLE BOARD, a moment's unfold — are made on it
  REC.setBoard({ board: 'b-1', name: '', origin: '' });
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
  const lead = (caption ? `<span class="label">${esc(caption)}</span>` : '') + (away ? `<div class="face-addr code id">${X}</div>` : '') + '<button class="face-text"';
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
  assert.ok(f && f.html.startsWith(`<span class="label">${esc(caption)}</span><div class="face-addr code id">${Y}</div>`), `the act's caption, then the document the board named — never ${X}, the face standing at ${X}'s own bytes: ${f && f.html}`);
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
    ['an edition quoting the draft alone', [QUOTES], `<div class="clause" data-string="C-67.quoting">${addressedHTML(t('C-67.quoting', { claimant: OWNER }))}</div>`, [t('C-67.quoting', { claimant: OWNER })]],
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
        assert.ok(o?.html.endsWith(`<div class="arm" data-string="${arm.id}">${addressedHTML(arm.text)}</div>${clause}`), `${what}: the arm for ${OWNER} and this reader, each address it names in the identifier's face, then the clause the claims decide, and nothing after it: ${o?.html}`);
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

test('a withheld document\'s own words carry C-67\'s pointer where the edition claims on it decide one, its act the LEAP the caller hands in: where the model holds none, the claims read before the face shows — once, nothing standing while they are out — and the face shown once they answer, the pointer in its first frame; shown again compact, the pointer one act away with the arm (issue #179\'s design decision: "the pointer to any claimed published edition the reader can open"; issue #186\'s: "Make this read together with the reads that draw the face. That way the clause is in the face\'s first frame")', async () => {
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
  const release = fake.hold('op', { frame: F.editionClaimsAt(X2) });
  FACES.withheld(X2, null, asked);
  assert.deepEqual([HOST.currentState(), HOST.pending()], [null, true], 'nothing stands while the claims are read: the face opens on its reads');
  release();
  for (let i = 0; i < 50 && !HOST.currentState(); i++) await new Promise((r) => setTimeout(r, 0));
  const f = faceShown(), arm = entitlementArm(REC.reader(), OWNER);
  assert.ok(f && f.id === 'face:withheld' && f.open && f.html.includes(`<div class="arm" data-string="${arm.id}">${addressedHTML(arm.text)}</div>${pointer}<button class="x"`), `shown once the claims answer, whole, the pointer beneath the arm in its first frame, the last before the dismiss: ${f && f.html}`);
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

test('every face stating a withheld origin carries C-67\'s clause in the same words beneath the arm — the document\'s own words and a run\'s face whole alike: the QUOTING sibling a line, with or without a LEAP; "edition claims not read" where the board refused the lookup another way or did not answer it; nothing where it refused the lookup as withheld from the reader — each face reading the claims before it shows, the description a landing at the document says carrying the clause too (issue #186\'s design decision: "One fact, one placement"; "A blank there would read as \'no claim\'"; "If the board refuses the read for documents withheld from the reader, no face carries the clause")', async () => {
  // 1.0.2's drafts in its sub-account, withheld from the reader, each with a run of it 1.0.1's edition W windows; E, 1.0.2's
  // published edition, claiming the first by quoting it
  const W = '1.0.1.0.17', E = '1.0.2.0.13', QUOTES = E + '.0.2.1', R20 = '1.1.0.1.0.1.0.3.14';
  const [QUOTED, REFUSED, UNANSWERED, HIDDEN] = ['1.0.2.1.0.6', '1.0.2.1.0.7', '1.0.2.1.0.8', '1.0.2.1.0.9'];
  const lookup = (/** @type {string} */ origin) => FAKE.keyOf('op', { frame: F.editionClaimsAt(origin) });
  const fake = FAKE.create({
    [lookup(QUOTED)]: { result: { as_of: 1, resp: 'addrs', addrs: [QUOTES] } },
    [FAKE.keyOf('op', { frame: F.readLink(QUOTES) })]: { result: { as_of: 1, resp: 'link_value', link: { slots: [[{ start: QUOTED + '.0.1.1', width: '0.0.0.0.0.0.0.20' }], [{ start: QUOTED, width: '0.0.0.0.0.1' }], [{ start: R20, width: '0.0.0.0.0.0.0.0.1' }]] } } },
    [FAKE.keyOf('op', { frame: F.docMetadata(E) })]: { result: { as_of: 1, resp: 'doc_metadata', doc: E, published: true, owner: OWNER, birth: E + '.1', birth_extent: '20', placed: null, base_extent: null, source: null } },
    [lookup(REFUSED)]: { refused: { kind: 'refused', name: 'busy', code: 'busy' } },
    [lookup(UNANSWERED)]: { refused: { kind: 'unreachable', name: 'unreachable', text: 'the board is not answering' } },
    [lookup(HIDDEN)]: { refused: { kind: 'refused', name: 'withheld', code: 'withheld' } },
  });
  PORT.boot(fake);
  readAs(READERS[0]);
  const arm = entitlementArm(REC.reader(), OWNER), armLine = `<div class="arm" data-string="${arm.id}">${addressedHTML(arm.text)}</div>`;
  /** @type {Array<[string, string, string | null]>} each origin, what its lookup answered, and the clause every face stating it carries: its string, or none */
  const cases = [
    [QUOTED, 'an edition quoting the draft alone', 'C-67.quoting'],
    [REFUSED, 'the lookup refused for a reason that says nothing of the claims', 'L.clause.unread'],
    [UNANSWERED, 'the lookup not answered', 'L.clause.unread'],
    [HIDDEN, 'the lookup refused as withheld from the reader', null],
  ];
  for (const [origin, what, id] of cases) {
    REC.takeRefused(origin, 'withheld');
    FACES.classChanged();
    const words = id ? t(id, { claimant: OWNER }) : null, clause = id ? `<div class="clause" data-string="${id}">${addressedHTML(words || '')}</div>` : '';
    // the document's own words, no LEAP handed in: nothing stands until the lookup answers, then the clause in its first frame
    FACES.withheld(origin, null, {});
    assert.equal(HOST.currentState(), null, `${what}: the document's face opens on its reads`);
    for (let i = 0; i < 50 && !HOST.currentState(); i++) await new Promise((r) => setTimeout(r, 0));
    const own = HOST.currentState();
    assert.ok(own?.id === 'face:withheld' && own.html.endsWith(armLine + clause), `${what}: the document's face, ${id ? `"${words}" a line beneath the arm` : 'nothing beneath the arm'}: ${own?.html}`);
    assert.deepEqual(Object.keys(own?.acts || {}), ['head'], `${what}: the clause offers no act`);
    HOST.dismiss();
    // a run of it, its face whole, in the same words
    FACES.withheldRun(W, /** @type {import('../model/records.js').Block} */ ({ pos: 11, width: 240, kind: 'withheld', text: '', origin }), () => {});
    for (let i = 0; i < 50 && !HOST.currentState(); i++) await new Promise((r) => setTimeout(r, 0));
    const run = HOST.currentState();
    assert.ok(run?.id === 'face:withheld-run' && run.html.endsWith(armLine + clause), `${what}: the run's face, the same clause beneath the arm: ${run?.html}`);
    HOST.dismiss();
    assert.equal(FACES.withheldText(origin), [t('F.corner.withheld', { owner: OWNER }), arm.text, ...(words ? [words] : [])].join(' '), `${what}: the description a landing at the document says`);
  }
  assert.deepEqual([[QUOTED, REFUSED, UNANSWERED, HIDDEN].map((o) => fake.asked.filter((k) => k === lookup(o)).length), fake.unanswered], [[1, 1, 1, 1], []], 'each lookup asked once between two drops of the claims: the run\'s face reads what the document\'s face left held, a failed read among it');
});

test('a withheld run\'s face reads the claims on its origin before it shows, where the model holds none: nothing stands while they are out, and the face shows once, its clause in its first frame (issue #186\'s design decision: "Make this read together with the reads that draw the face")', async () => {
  // a run of 1.0.2's draft X4 in 1.0.1's edition W4; 1.0.2's edition E4 claiming X4 from E4's own bytes
  const X4 = '1.0.2.1.0.10', W4 = '1.0.1.0.18', E4 = '1.0.2.0.14', CLAIM = E4 + '.0.2.1', R20 = '1.1.0.1.0.1.0.3.14';
  const fake = FAKE.create({
    [FAKE.keyOf('op', { frame: F.editionClaimsAt(X4) })]: { result: { as_of: 1, resp: 'addrs', addrs: [CLAIM] } },
    [FAKE.keyOf('op', { frame: F.readLink(CLAIM) })]: { result: { as_of: 1, resp: 'link_value', link: { slots: [[{ start: E4 + '.0.1.1', width: '0.0.0.0.0.0.0.20' }], [{ start: X4, width: '0.0.0.0.0.1' }], [{ start: R20, width: '0.0.0.0.0.0.0.0.1' }]] } } },
    [FAKE.keyOf('op', { frame: F.docMetadata(E4) })]: { result: { as_of: 1, resp: 'doc_metadata', doc: E4, published: true, owner: OWNER, birth: E4 + '.1', birth_extent: '20', placed: null, base_extent: null, source: null } },
  });
  PORT.boot(fake);
  readAs(READERS[0]);
  /** @type {Array<[string, boolean]>} the LEAPs the pointer's act asked for */
  const leaps = [];
  const release = fake.hold('op', { frame: F.editionClaimsAt(X4) });
  FACES.withheldRun(W4, /** @type {import('../model/records.js').Block} */ ({ pos: 11, width: 240, kind: 'withheld', text: '', origin: X4 }), (home, byKey) => { leaps.push([home, byKey]); });
  assert.deepEqual([HOST.currentState(), HOST.pending()], [null, true], 'nothing stands while the claims are read');
  release();
  for (let i = 0; i < 50 && !HOST.currentState(); i++) await new Promise((r) => setTimeout(r, 0));
  const o = HOST.currentState();
  assert.ok(o?.id === 'face:withheld-run' && o.html.endsWith(`<div class="clause" data-string="C-67.pointer"><button data-run="follow" data-claim="${CLAIM}" data-home="${E4}">${esc(t('C-67.pointer'))}</button></div>`), `shown once the claims answer, the pointer in its first frame: ${o?.html}`);
  o?.acts?.follow(/** @type {any} */ ({}), true);
  assert.deepEqual(leaps, [[E4, true]], 'its act the LEAP to the edition the claim names');
  HOST.dismiss();
  assert.deepEqual(fake.unanswered, []);
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

test('the dead end\'s face offers the version offer handed in — "read version ⟨k⟩, the last that holds it", its number filled and no token left, its act the version move — and no act where none is; drawn again in its place as the offer is found, still told by its landing, the act\'s words said once and the face\'s own not again; a face no longer standing at that document never drawn again (issue #57)', () => {
  const FAR = '1.0.1.0.127', at = { span: { addr: FAR, pos: 1 }, sign: FAR }, words = t('F.floating', { D: FAR }), label = t('F.floating.read', { k: 3 });
  /** @type {boolean[]} the version moves the act asked for: whether a key made each */
  const moves = [];
  const offer = { k: 3, go: (/** @type {boolean} */ byKey) => { moves.push(byKey); } };
  FACES.floating(FAR, at, null, true);
  assert.deepEqual([faceShown()?.id, faceShown()?.words, faceShown()?.acts], ['face:floating', ['F.floating', words], []], 'none handed in: the dead end\'s words, and no act');
  live.textContent = '';
  FACES.offered(FAR, offer);
  const f = faceShown(), o = HOST.currentState();
  assert.deepEqual([f?.id, f?.words, f?.acts, o?.anchor, o?.told], ['face:floating', ['F.floating', words], ['a0'], at, true], 'drawn again in its place with its act, still told by its landing');
  assert.ok(f && f.html.includes(`<button data-run="a0" class="">${esc(label)}</button>`) && !f.html.includes('⟨'), `the act in its own words, its number filled, no token left: ${f && f.html}`);
  assert.equal(live.textContent, label, 'the act\'s words said through the status region, the face\'s own not again');
  o?.acts?.a0(/** @type {any} */ ({}), true);
  assert.deepEqual(moves, [true], 'its act the version move handed in, told a key made it');
  FACES.offered('1.0.1.0.128', offer);
  assert.equal(HOST.currentState(), o, 'an offer for another document draws nothing over it');
  HOST.dismiss();
  FACES.floating(FAR, at, offer);
  assert.ok(faceShown()?.html.includes(esc(label)), 'shown with an offer standing: the act in its first frame');
  HOST.dismiss();
  live.textContent = '';
  FACES.offered(FAR, offer);
  assert.deepEqual([HOST.currentState(), live.textContent], [null, ''], 'a face the reader dismissed is never brought back, and nothing is said');
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

/**
 * A page of stand-ins for a walk's moment: the platform's document — its focus, the body where it stands on nothing — and
 * the overlay host's element, holding what the host writes into it as elements, each by its tag, attributes and classes,
 * the attributes the host sets on itself among its own, and answering a selector — tags, `.class`, `[attr]`,
 * `[attr="value"]` and `:not([attr])` parts, a list of them by commas — with the elements matching it in the order
 * written. An element's `focus()` lands the platform's focus on it; an input's `value` is its attribute's as written, and
 * what a test types after; markup written over the element holding the focus drops the focus to the body, as the
 * platform's would.
 */
function momentPage() {
  const body = { id: 'the body' };
  const doc = { body, activeElement: /** @type {any} */ (body), getElementById: () => null, createElement: undefined };
  const was = globalThis.document;
  globalThis.document = /** @type {any} */ (doc);
  /** @typedef {{tag: string, attrs: Record<string, string>, classes: string[], dataset: Record<string, string>, value: string, id: string, focus: () => void, blur: () => void, getAttribute: (k: string) => string | null, matches: (sel: string) => boolean}} Kid */
  /** @type {Kid[]} */
  let kids = [];
  let html = '';
  /** @type {Record<string, string>} the attributes the host set on its element */
  const own = {};
  const one = (/** @type {Kid} */ e, /** @type {string} */ sel) => {
    let s = sel.trim(), ok = true;
    s = s.replace(/:not\(\[([\w-]+)\]\)/g, (_, a) => { if (a in e.attrs) ok = false; return ''; });
    s = s.replace(/\[([\w-]+)(?:="([^"]*)")?\]/g, (_, a, v) => { if (!(a in e.attrs) || (v !== undefined && e.attrs[a] !== v)) ok = false; return ''; });
    s = s.replace(/\.([\w-]+)/g, (_, c) => { if (!e.classes.includes(c)) ok = false; return ''; });
    return ok && (!s || s === e.tag);
  };
  const matches = (/** @type {Kid} */ e, /** @type {string} */ sel) => sel.split(',').some((x) => one(e, x));
  const all = (/** @type {string} */ sel) => kids.filter((e) => matches(e, sel));
  const host = {
    className: '', style: {}, addEventListener() {},
    setAttribute: (/** @type {string} */ k, /** @type {string} */ v) => { own[k] = v; }, removeAttribute: (/** @type {string} */ k) => { delete own[k]; }, getAttribute: (/** @type {string} */ k) => own[k] ?? null,
    getBoundingClientRect: () => ({ left: 0, top: 0, width: 100, height: 50 }),
    contains: (/** @type {unknown} */ x) => kids.includes(/** @type {Kid} */ (x)),
    querySelectorAll: all,
    querySelector: (/** @type {string} */ sel) => all(sel)[0] || null,
    get innerHTML() { return html; },
    set innerHTML(/** @type {string} */ v) {
      html = v;
      const old = kids;
      kids = [...v.matchAll(/<([a-z]+)\b([^>]*)>/g)].map((m) => {
        const attrs = Object.fromEntries([...m[2].matchAll(/([\w-]+)(?:="([^"]*)")?/g)].map((a) => [a[1], text(a[2] ?? '')]));
        const dataset = Object.fromEntries(Object.entries(attrs).filter(([k]) => k.startsWith('data-')).map(([k, x]) => [k.slice(5), x]));
        /** @type {Kid} */
        const e = {
          tag: m[1], attrs, classes: (attrs.class || '').split(/\s+/).filter(Boolean), dataset, value: attrs.value ?? '', id: attrs.id || '',
          focus() { doc.activeElement = e; }, blur() { if (doc.activeElement === e) doc.activeElement = body; }, getAttribute: (k) => attrs[k] ?? null, matches: (sel) => matches(e, sel),
        };
        return e;
      });
      if (old.includes(doc.activeElement)) doc.activeElement = body;
    },
  };
  return {
    host, doc, body,
    /** the first element the host holds that a selector matches */
    kid: (/** @type {string} */ sel) => /** @type {Kid} */ (host.querySelector(sel)),
    /** the controls the face offers, by their acts' names, in the order written */
    acts: () => kids.filter((e) => e.dataset.run).map((e) => e.dataset.run),
    /** the stand-ins put back — what stands taken down and a flight cut where it is, the page's document, the host's own element — so no test leaves the next one a face or a flight */
    restore: () => { HOST.dismiss(); if (CAM.flying()) CAM.set(CAM.view()); globalThis.document = was; HOST.attach(/** @type {any} */ (hostEl)); },
  };
}

/** a walk's moment owed an answer, as the shell raises one: a question */
const ask = (/** @type {string} */ id, /** @type {string} */ walk, /** @type {string} */ words) => /** @type {import('../bridge/shapes').MomentEvent} */ ({ id, kind: 'ask', data: { text: words }, walk, board: 'b-1', answerable: true });
/** the walk a moment is of, as its segment's act names it */
const walkKey = (/** @type {string} */ walk) => walk + '|b-1';
/** a walk's folded moment's segment, as the one line reads it; undefined where the walk holds none folded */
const segment = (/** @type {string} */ walk) => FACES.folded().find((f) => f.key === walkKey(walk));
/** the calls the page made to the shell of a moment's answer or cancel */
const told = (/** @type {ReturnType<typeof FAKE.create>} */ fake) => fake.asked.filter((k) => k.startsWith('answer:') || k.startsWith('cancel:'));
/** two views the same, within a flight's rounding */
const sameView = (/** @type {{x: number, y: number, scale: number}} */ a, /** @type {{x: number, y: number, scale: number}} */ b) => Math.abs(a.x - b.x) < 1e-6 * Math.max(1, Math.abs(b.x)) && Math.abs(a.y - b.y) < 1e-6 * Math.max(1, Math.abs(b.y)) && Math.abs(a.scale / b.scale - 1) < 1e-9;
/** a flight run to its end, and the reads and the walk's moves it set going let answer */
async function landed() { for (let i = 0; i < 20; i++) { if (CAM.flying()) CAM.step(Infinity); await new Promise((r) => setTimeout(r, 0)); } }

test('every way the page ends an overlay folds a walk\'s moment into its segment of the one line and tells the shell nothing — Esc, an empty click\'s dismissal, a navigation act, which goes on, another overlay the reader opens: the segment names the walk and its step and that it waits on the reader, said through the status region, the field\'s text kept (issue #182\'s design decision: "Dismissing it changes how much room it takes, never whether it is there")', async () => {
  const page = momentPage(), fake = FAKE.create({});
  PORT.boot(fake);
  HOST.attach(/** @type {any} */ (page.host));
  try {
    /** @type {Array<[string, () => void]>} each way the page ends an overlay */
    const ways = [
      ['Esc', () => KEYS.esc()],
      ['an empty click\'s dismissal', () => HOST.dismiss()],
      ['a navigation act — WHOLE BOARD, made from the plane', () => { page.doc.activeElement = page.body; void GO.wholeBoard(); }],
      ['another overlay the reader opens', () => HOST.show({ kind: 'card', id: 'card:182', anchor: null, html: '<span class="label">a card</span>', acts: {} })],
    ];
    for (const [i, [what, end]] of ways.entries()) {
      const walk = 'fold-' + i, words = 'which devices are lost?';
      FACES.moment(ask('m-fold-' + i, walk, words));
      assert.deepEqual([HOST.currentState()?.id, page.doc.activeElement], ['moment:m-fold-' + i, page.kid('[data-answer]')], `${what}: the moment whole as it arrives over nothing, the focus on its field`);
      page.kid('[data-answer]').value = 'the old phone';
      end();
      assert.notEqual(HOST.currentState()?.id, 'moment:m-fold-' + i, `${what}: its face taken down`);
      assert.deepEqual(segment(walk), { key: walkKey(walk), words: t('L.walk.waits', { walk, step: words }) }, `${what}: folded into its segment — its walk, its step, "waits on you"`);
      assert.equal(live.textContent, t('L.walk.waits', { walk, step: words }), `${what}: the segment said through the status region`);
      if (HOST.currentState()) HOST.dismiss();
      await landed();
    }
    assert.equal(TRAIL.current()?.addr, GO.boardNode(), 'the navigation act went on: WHOLE BOARD its trail\'s entry');
    FACES.unfold(walkKey('fold-0'));
    assert.equal(page.kid('[data-answer]').value, 'the old phone', 'unfolded, its field holds the text typed as it folded');
    HOST.dismiss();
    assert.deepEqual(told(fake), [], 'the shell told nothing: no answer, no cancel');
  } finally { page.restore(); }
});

test('the segment\'s act unfolds the moment as it was left over the view its walk showed it over — the camera brought back there as a jump is, its trail entry taken at the act and Back returning, the walk re-taken without the focus, which stands on the face\'s first words; at that view already, no jump (issue #182: "It brings back the view the walk shows the face over"; "Unfolding moves focus to the face\'s first words")', async () => {
  const page = momentPage(), fake = FAKE.create({});
  PORT.boot(fake);
  HOST.attach(/** @type {any} */ (page.host));
  try {
    CAM.set(CAM.viewForCell(accountCell('1.0.1'), 0.85));
    const shown = CAM.view();
    FACES.moment(ask('m-view', 'view', 'which devices are lost?'));
    page.kid('[data-answer]').value = 'the old phone';
    KEYS.esc();
    CAM.set(CAM.viewForCell(accountCell('1.0.2'), 0.85));
    const away = CAM.view(), entries = TRAIL.length();
    FACES.unfold(walkKey('view'), true);
    assert.deepEqual([HOST.currentState()?.id, page.kid('[data-answer]').value, page.doc.activeElement], ['moment:m-view', 'the old phone', page.kid('.moment-words')], 'the face whole as it was left, its typed text in its field, the focus on its first words');
    assert.ok(sameView(CAM.destination(), shown) && CAM.flying(), `the camera flies back to the view the face was left over: ${JSON.stringify([CAM.destination(), shown])}`);
    assert.deepEqual([TRAIL.length(), sameView(/** @type {any} */ (TRAIL.current()?.view), shown)], [entries + 1, true], 'its trail entry taken at the act, at that view');
    assert.equal(segment('view'), undefined, 'its segment gone');
    await landed();
    assert.deepEqual([sameView(CAM.view(), shown), page.doc.activeElement], [true, page.kid('.moment-words')], 'landed: the walk re-taken there took no focus from the face');
    KEYS.esc();
    FACES.unfold(walkKey('view'));
    assert.deepEqual([HOST.currentState()?.id, TRAIL.length(), CAM.flying()], ['moment:m-view', entries + 1, false], 'folded and unfolded at its view: no jump, no entry');
    HOST.dismiss();
    void GO.back();
    await landed();
    assert.ok(sameView(CAM.view(), away), 'Back returns to the view the unfold left');
    assert.deepEqual(told(fake), [], 'the shell told nothing');
  } finally { page.restore(); }
});

test('a walk\'s moment is drawn by its kind — a label box its title, its statements, its field and its default; a question its words and its field; a yes-or-no question its words and its two answers; a statement its words alone — never its data\'s raw form nor its kind\'s token; "no" answers false, a label box\'s empty field its default, null, and one offering none is flagged at the box and never sent (issue #182; foundations §3.4 F-C4: "an empty label is faced at the box and never committed")', async () => {
  const page = momentPage();
  /** @type {Array<[string, unknown]>} the moments the shell is to be answered, by id, and each one's answer */
  const answered = [['m-no', false], ['m-default', null]];
  const fake = FAKE.create(Object.fromEntries(answered.map(([id, value]) => [FAKE.keyOf('answer', { id, value }), { result: {} }])));
  PORT.boot(fake);
  HOST.attach(/** @type {any} */ (page.host));
  /** what the face shows as a person meets it: its markup with the tags dropped */
  const shows = () => text(page.host.innerHTML.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
  try {
    FACES.moment({ id: 'm-no', kind: 'yes_no', data: { text: 'was the device STOLEN (yes), or LOST (no)?' }, walk: 'recover', board: 'b-1', answerable: true });
    assert.deepEqual(page.acts(), ['yes', 'no', 'cancel'], 'a yes-or-no question: yes, no and the cancel');
    assert.ok(shows().includes('was the device STOLEN (yes), or LOST (no)?') && shows().includes(t('L.moment.yes_no')) && !shows().includes('yes_no') && !shows().includes('{'), shows());
    await HOST.currentState()?.acts?.no(/** @type {any} */ (page.kid('[data-run="no"]')), true);
    for (let i = 0; i < 5; i++) await new Promise((r) => setTimeout(r, 0));
    assert.deepEqual([HOST.currentState(), segment('recover')], [null, undefined], 'answered "no": the moment ended, its face taken down, nothing folded');
    const box = { title: 'name this device', statements: ['This name is permanent and cannot be edited'], default: 'paper anchor 1' };
    FACES.moment({ id: 'm-default', kind: 'label', data: box, walk: 'claim', board: 'b-1', answerable: true });
    assert.ok(['name this device', 'This name is permanent and cannot be edited', t('L.moment.default', { default: 'paper anchor 1' }), t('L.moment.label')].every((w) => shows().includes(w)) && !!page.kid('[data-answer]'), `a label box: its title, its statements, its default and its field: ${shows()}`);
    HOST.currentState()?.acts?.answer(/** @type {any} */ (page.kid('[data-run="answer"]')), true);
    for (let i = 0; i < 5; i++) await new Promise((r) => setTimeout(r, 0));
    assert.equal(HOST.currentState(), null, 'its field left empty: the default answered, null');
    FACES.moment({ id: 'm-empty', kind: 'label', data: { ...box, default: null }, walk: 'keygen', board: 'b-1', answerable: true });
    HOST.currentState()?.acts?.answer(/** @type {any} */ (page.kid('[data-run="answer"]')), true);
    await new Promise((r) => setTimeout(r, 0));
    assert.deepEqual([HOST.currentState()?.id, page.kid('.refused')?.dataset.string], ['moment:m-empty', 'L.moment.empty'], 'no default and nothing typed: flagged at the box, the face standing');
    HOST.dismiss();
    FACES.moment({ id: 'm-says', kind: 'statement', data: { rule: 'AUTH-5.44 (notebook)', text: 'your keys are recorded now' }, walk: 'claim-says', board: 'b-1', answerable: false });
    assert.deepEqual([page.acts(), shows().includes('your keys are recorded now'), live.textContent], [[], true, 'your keys are recorded now'], 'a statement: its words, no answer to give, said through the status region');
    HOST.dismiss();
    assert.deepEqual([HOST.currentState(), segment('claim-says')], [null, undefined], 'dismissed, a statement goes: no walk waits on it');
    assert.deepEqual([told(fake), fake.unanswered], [answered.map(([id, value]) => FAKE.keyOf('answer', { id, value })), []], 'the shell answered "no" and the default, and told nothing of the empty box');
  } finally { page.restore(); }
});

test('a refusal of the moment\'s own answer is drawn inside its face, the moment waiting and answerable again, its typed text kept; `no_such_moment` ends it, so it goes at its next end, never folding (issue #182: "A refusal of the moment\'s own answer is drawn inside its face")', async () => {
  const page = momentPage();
  const fake = FAKE.create({
    [FAKE.keyOf('answer', { id: 'm-refused', value: 'phone' })]: { refused: { kind: 'shell', name: 'malformed_args', what: 'value', takes: 'a string' } },
    [FAKE.keyOf('answer', { id: 'm-refused', value: 'tablet' })]: { refused: { kind: 'shell', name: 'no_such_moment', id: 'm-refused' } },
  });
  PORT.boot(fake);
  HOST.attach(/** @type {any} */ (page.host));
  try {
    FACES.moment(ask('m-refused', 'refused', 'which devices are lost?'));
    page.kid('[data-answer]').value = 'phone';
    await HOST.currentState()?.acts?.answer(/** @type {any} */ (page.kid('[data-run="answer"]')), true);
    for (let i = 0; i < 5; i++) await new Promise((r) => setTimeout(r, 0));
    assert.deepEqual([HOST.currentState()?.id, page.kid('.refused')?.dataset.string, page.kid('[data-answer]').value], ['moment:m-refused', 'L.refused', 'phone'], 'refused: drawn inside its face, standing, the text typed kept');
    page.kid('[data-answer]').value = 'tablet';
    HOST.currentState()?.acts?.answer(/** @type {any} */ (page.kid('[data-run="answer"]')), true);
    for (let i = 0; i < 5; i++) await new Promise((r) => setTimeout(r, 0));
    assert.deepEqual([HOST.currentState()?.id, page.kid('.refused')?.dataset.string], ['moment:m-refused', 'L.moment.gone'], 'no such moment: said inside its face');
    KEYS.esc();
    assert.deepEqual([HOST.currentState(), segment('refused')], [null, undefined], 'ended, Esc takes it down: nothing folds');
    assert.deepEqual(fake.unanswered, []);
  } finally { page.restore(); }
});

test('only the face\'s own cancel sends cancel(id) — named by its walk, beside it that what cancelling leaves behind is not told to this page — and the moment, its cancel accepted, leaves (issue #182: "Only the face\'s own named cancel act sends cancel(id)")', async () => {
  const page = momentPage();
  const fake = FAKE.create({ [FAKE.keyOf('cancel', { id: 'm-cancel' })]: { result: {} } });
  PORT.boot(fake);
  HOST.attach(/** @type {any} */ (page.host));
  try {
    FACES.moment(ask('m-cancel', 'recover', 'which devices are lost?'));
    assert.deepEqual([page.kid('[data-run="cancel"]')?.dataset.string, page.kid('[data-string="L.moment.leaves"]')?.dataset.string], ['L.moment.cancel', 'L.moment.leaves']);
    assert.ok(page.host.innerHTML.includes(`>${esc(t('L.moment.cancel', { walk: 'recover' }))}</button>`), 'the cancel named by its walk');
    KEYS.esc();
    FACES.unfold(walkKey('recover'));
    assert.deepEqual(told(fake), [], 'folded and unfolded: no cancel');
    HOST.currentState()?.acts?.cancel(/** @type {any} */ (page.kid('[data-run="cancel"]')), true);
    for (let i = 0; i < 5; i++) await new Promise((r) => setTimeout(r, 0));
    assert.deepEqual([told(fake), HOST.currentState(), segment('recover')], [[FAKE.keyOf('cancel', { id: 'm-cancel' })], null, undefined], 'its cancel sent once, the moment gone');
  } finally { page.restore(); }
});

test('the walk\'s next moment opens as the last was left: folded, its segment updated and said, the camera unmoved; whole, in the last one\'s place, nothing folding (issue #182: "The walk\'s next moment opens as the last was left")', () => {
  const page = momentPage(), fake = FAKE.create({});
  PORT.boot(fake);
  HOST.attach(/** @type {any} */ (page.host));
  try {
    FACES.moment(ask('m-next-1', 'next', 'which devices are lost?'));
    KEYS.esc();
    const at = CAM.view();
    FACES.moment(ask('m-next-2', 'next', 'which device is this?'));
    assert.deepEqual([HOST.currentState(), segment('next')?.words, live.textContent], [null, t('L.walk.waits', { walk: 'next', step: 'which device is this?' }), t('L.walk.waits', { walk: 'next', step: 'which device is this?' })], 'folded, the segment the next moment\'s, said');
    assert.deepEqual([sameView(CAM.view(), at), CAM.flying()], [true, false], 'the camera unmoved');
    FACES.moment(ask('m-whole-1', 'whole', 'which devices are lost?'));
    page.kid('[data-run="answer"]').focus();
    FACES.moment(ask('m-whole-2', 'whole', 'which device is this?'));
    assert.deepEqual([HOST.currentState()?.id, segment('whole')], ['moment:m-whole-2', undefined], 'whole, in the last one\'s place, nothing folded');
    HOST.dismiss();
    // the last one's field holding the caret (FP-20): the next opens folded, the last one's face standing with its text and its caret
    FACES.moment(ask('m-caret-1', 'caret', 'which devices are lost?'));
    page.kid('[data-answer]').value = 'the old ph';
    const caret = page.doc.activeElement;
    FACES.moment(ask('m-caret-2', 'caret', 'which device is this?'));
    assert.deepEqual([HOST.currentState()?.id, page.doc.activeElement, page.kid('[data-answer]').value, segment('caret')?.words], ['moment:m-caret-1', caret, 'the old ph', t('L.walk.waits', { walk: 'caret', step: 'which device is this?' })], 'the caret kept, the next folded');
    HOST.dismiss();
    assert.deepEqual([HOST.currentState(), segment('caret')?.words], [null, t('L.walk.waits', { walk: 'caret', step: 'which device is this?' })], 'the last one, ended, goes at its end; the next stands folded');
    assert.deepEqual(told(fake), []);
  } finally { page.restore(); }
});

test('a walk\'s moment the shell raises where the reader stands at a surface of their own — a card they opened, the LEAP box\'s field holding the caret — opens folded, said, the card standing and the caret where it was; over nothing, it opens whole, the focus on its first control (FP-36; FP-20)', () => {
  const page = momentPage(), fake = FAKE.create({});
  PORT.boot(fake);
  HOST.attach(/** @type {any} */ (page.host));
  try {
    HOST.show({ kind: 'card', id: 'card:mine', anchor: null, html: '<span class="label">my card</span>', acts: {} });
    FACES.moment(ask('m-over-card', 'over-card', 'which devices are lost?'));
    assert.deepEqual([HOST.currentState()?.id, !!segment('over-card')], ['card:mine', true], 'over a card: the card stands, the moment folded');
    HOST.dismiss();
    const leap = { id: 'the LEAP box\'s field', matches: (/** @type {string} */ sel) => sel.split(',').map((s) => s.trim()).includes('input') };
    page.doc.activeElement = leap;
    FACES.moment(ask('m-over-field', 'over-field', 'which devices are lost?'));
    assert.deepEqual([HOST.currentState(), page.doc.activeElement, !!segment('over-field')], [null, leap, true], 'the caret in a field: it stays there, the moment folded');
    page.doc.activeElement = page.body;
    FACES.moment(ask('m-over-nothing', 'over-nothing', 'which devices are lost?'));
    assert.deepEqual([HOST.currentState()?.id, page.doc.activeElement, segment('over-nothing')], ['moment:m-over-nothing', page.kid('[data-answer]'), undefined], 'over nothing: whole, the focus on its field');
    HOST.dismiss();
  } finally { page.restore(); }
});

test('a face that arrives without the reader\'s act folds nothing: the unfold is an act, so a jump in the air as it is made faces nothing over the moment when its read answers (issue #182: "A face that arrives without the reader\'s act folds nothing")', async () => {
  const page = momentPage(), GONE = '1.0.1.0.902';
  const frame = F.retrieveDocVSpanSet(GONE);
  const fake = FAKE.create({ [FAKE.keyOf('op', { frame })]: { refused: { kind: 'refused', name: 'doc_not_registered', code: 'doc_not_registered' } } });
  PORT.boot(fake);
  HOST.attach(/** @type {any} */ (page.host));
  try {
    const release = fake.hold('op', { frame });
    const jump = GO.leapTo(GONE);
    assert.ok(GO.inAir() && HOST.currentState()?.id === 'reading:' + GONE, 'the jump in the air, its reading face standing');
    FACES.moment(ask('m-air', 'air', 'which devices are lost?'));
    assert.deepEqual([HOST.currentState()?.id, !!segment('air')], ['reading:' + GONE, true], 'raised over the reading face: folded');
    FACES.unfold(walkKey('air'), true);
    assert.deepEqual([HOST.currentState()?.id, GO.inAir()], ['moment:m-air', false], 'unfolded: the face whole, the jump in the air abandoned');
    release();
    await jump;
    for (let i = 0; i < 5; i++) await new Promise((r) => setTimeout(r, 0));
    assert.equal(HOST.currentState()?.id, 'moment:m-air', 'the read answered: no face took the moment\'s place');
    HOST.dismiss();
    await landed();
    assert.deepEqual(fake.unanswered, []);
  } finally { page.restore(); }
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
    // a document read after the page's own close, then withheld: its text on screen, access changed after it was read
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

test('why no board is held is one entry — no shell and no provider, the list empty, the list refused — "try again" offered only where a retry may tell; an act needing a board answers at its site with a face of those words and what still works — at the empty list that beginning a notebook isn\'t built yet, at a list the board did not answer "try again", which reads the list again: refused again, the face shown again where it stood and said; a board found, the face gone (issue #215\'s design decision: "an act that needs a board the reader lacks answers where it is taken and names what still works"; FP-35)', async () => {
  const was = { board: REC.board(), session: REC.session() }, at = { world: { x: 3, y: 4 } };
  const BOARDS = FAKE.keyOf('boards', {}), UNREACHED = { refused: { kind: 'unreachable', name: 'unreachable', text: 'refused' } };
  /** the provider's answers, as the next read finds them */
  const script = /** @type {Record<string, unknown>} */ ({ [BOARDS]: UNREACHED });
  const settle = async () => { for (let i = 0; i < 20; i++) await new Promise((r) => setTimeout(r, 0)); };
  try {
    HOST.dismiss();
    REC.setSession(null);
    PORT.boot(null);
    REC.takeBoards({ result: [] });
    assert.deepEqual(FACES.noBoardWords(), { id: 'L.no-adapter', text: t('L.no-adapter'), again: false, doors: false }, 'no shell and no provider: the page reaches nothing');
    const fake = FAKE.create(script);
    PORT.boot(fake);
    REC.setBoard(was.board);
    assert.equal(FACES.noBoardWords(), null, 'a board held: nothing to say');
    REC.takeBoards({ result: [] });
    assert.deepEqual(FACES.noBoardWords(), { id: 'F.unclaimed', text: t('F.unclaimed'), again: false, doors: true }, 'the list empty: no board on this machine is yours until you claim one');
    FACES.noBoard(at);
    let f = faceShown();
    assert.deepEqual([f?.id, f?.words, f?.acts, HOST.currentState()?.anchor], ['face:no-board', ['F.unclaimed', t('F.unclaimed')], [], at], 'its face at the act\'s site: why, no act');
    assert.ok(f && f.html.includes(`<div class="note" data-string="L.no-notebook-yet">${esc(t('L.no-notebook-yet'))}</div>`), `and that beginning a notebook isn't built yet: ${f && f.html}`);
    assert.equal(live.textContent, `${t('F.unclaimed')} ${t('L.no-notebook-yet')}`, 'said through the status region');
    HOST.dismiss();
    REC.takeBoards({ refused: { kind: 'shell', name: 'provider_403' } });
    assert.deepEqual(FACES.noBoardWords(), { id: 'L.boards-unread', text: t('L.boards-unread'), again: false, doors: false }, 'the provider\'s own refusal: its words, no retry tells');
    FACES.noBoard(at);
    assert.deepEqual([faceShown()?.words?.[0], faceShown()?.acts], ['L.boards-unread', []], 'its face offers nothing');
    HOST.dismiss();
    REC.takeBoards(/** @type {any} */ (UNREACHED));
    assert.deepEqual(FACES.noBoardWords(), { id: 'L.boards-unread', text: t('L.boards-unread'), again: true, doors: false }, 'the board not answering: a retry may tell');
    FACES.noBoard(at);
    f = faceShown();
    assert.ok(f && f.acts.join() === 'a0' && f.html.includes(`<button data-run="a0" class="">${esc(t('B1.try-again'))}</button>`), `its face offers "try again": ${f && f.html}`);
    live.textContent = '';
    HOST.currentState()?.acts?.a0(/** @type {any} */ ({}), false);
    await settle();
    assert.deepEqual([fake.asked.filter((k) => k === BOARDS).length, faceShown()?.id, HOST.currentState()?.anchor, live.textContent], [1, 'face:no-board', at, t('L.boards-unread')], 'refused again: the list read once, the face shown again where it stood, and said');
    Object.assign(script, {
      [BOARDS]: { result: [{ board: 'b-1', name: ORIGIN, origin: ORIGIN }] },
      [FAKE.keyOf('fingerprint', {})]: { result: [] },
      [FAKE.keyOf('session', { board: 'b-1' })]: { refused: { kind: 'shell', name: 'no_key' } },
      [FAKE.keyOf('health', { board: 'b-1' })]: { result: { health: { log_position: 8, auth: { claimant: '1.0.1', local_trust: false }, writes: { halted: false } }, mode: 'ENFORCING' } },
      [FAKE.keyOf('probe', {})]: { result: { daemon: 'running', dialed: null, signed: null } },
      [FAKE.keyOf('places', { board: 'b-1' })]: { refused: { kind: 'unreachable', name: 'unreachable', text: '' } },
    });
    HOST.currentState()?.acts?.a0(/** @type {any} */ ({}), false);
    await settle();
    assert.deepEqual([REC.board()?.board, REC.noBoard(), HOST.currentState()], ['b-1', null, null], 'the board found: held, and the face gone');
    assert.deepEqual(fake.unanswered, []);
  } finally {
    HOST.dismiss();
    REC.setSessionRefused(null); REC.setBoard(was.board); REC.setSession(was.session);
  }
});
