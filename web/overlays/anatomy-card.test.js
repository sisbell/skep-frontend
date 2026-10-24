// O-ANATOMY's test: the lineage as the card sets it (B1-S5; A-56, A-57,
// A-82) — a claim has authority where its claimant, the account of its home
// read whole, owns the link it declares superseded; the rows draw the claims
// with authority alone, in the answer's order, a retracted one marked, "none"
// where a side answered none and no row where its read was refused, a
// claimant the owner row does not name following its claim; every other
// claim behind one line whose act lists them as assertions naming their
// claimant and what it is to the links. The card itself, against the fake
// port on a stand-in of the host's element: a key opens it on follow, the
// line standing before follow, and the line's act shows it again under its
// id; beneath its far end's words the line its landing says where that end's
// text holds only part of its passage (FP-21); and an end drawn at a withheld
// run says it is withheld and whose, with no read of its bytes, the run's one
// symbol listing its several ends (FP-30).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as ANATOMY from './anatomy-card.js';
import * as HOST from './host.js';
import * as PORT from '../bridge/port.js';
import * as REC from '../model/records.js';
import * as F from '../model/frames.js';
import * as FAKE from '../test/fake-port.js';
import * as LK from '../links/links.js';
import { resolveSpan } from '../model/address.js';
import { t } from '../strings.js';

const { supersessionRows, hasAuthority } = ANATOMY;

/** @typedef {import('../model/frames.js').Claim} Claim */

const L = '1.0.1.0.3.0.2.1';
/** the card's link is 1.0.1's, read by a guest */
const OWNED = { owner: '1.0.1', reader: null };

/** a claim naming the card's link on both sides, homed in 1.0.1's document, unless told otherwise @param {Partial<Claim>} c @returns {Claim} */
const claim = (c) => ({ claim: '1.0.1.0.3.0.2.9', home: '1.0.1.0.3', old: L, new: L, active: true, ...c });

/** HTML as text: its tags dropped, the escapes `esc` writes undone */
const text = (/** @type {string} */ html) => html.replace(/<[^>]*>/g, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&amp;/g, '&');

/** the rows as a person reads them: each one's label and the words of its value */
const rows = (/** @type {string} */ html) => [...html.matchAll(/<div class="kv[^"]*"><b>(.*?)<\/b>(.*?)<\/div>/g)].map((m) => ({ label: text(m[1]), value: text(m[2]).trim() }));

/** the line the claims without authority stand behind, as a person reads it; null where none stands */
const line = (/** @type {string} */ html) => { const m = html.match(/<button data-run="claims"[^>]*>(.*?)<\/button>/); return m ? text(m[1]) : null; };

/** the claims listed in the line's place: each one's string and its words; none where no list stands */
const listed = (/** @type {string} */ html) => {
  const m = html.match(/<ul class="rows claims">(.*?)<\/ul>/);
  return m ? [...m[1].matchAll(/<li data-string="([^"]*)">(.*?)<\/li>/g)].map((x) => ({ id: x[1], text: text(x[2]) })) : [];
};

const NONE = { by: { label: t('F.card.superseded-by'), value: t('F.card.none') }, sup: { label: t('F.card.supersedes'), value: t('F.card.none') } };

test('superseded by names each in-claim\'s new link and supersedes each out-claim\'s old one, in the answer\'s order', () => {
  const html = supersessionRows({
    supersededBy: [claim({ new: '1.0.1.0.3.0.2.5' }), claim({ claim: '1.0.1.0.4.0.2.2', home: '1.0.1.0.4', new: '1.0.1.0.4.0.2.1' })],
    supersedes: [claim({ old: '1.0.1.0.2.0.2.7' })],
  }, OWNED);
  assert.deepEqual(rows(html), [
    { label: t('F.card.superseded-by'), value: '1.0.1.0.3.0.2.5, 1.0.1.0.4.0.2.1' },
    { label: t('F.card.supersedes'), value: '1.0.1.0.2.0.2.7' },
  ]);
  assert.ok(!/<button|data-run/.test(html), 'neither row holds a control, and every claim having authority, no line stands');
});

test('a side that answered no claim reads B1-S5\'s "none"', () => {
  assert.deepEqual(rows(supersessionRows({ supersededBy: [], supersedes: [] }, OWNED)), [NONE.by, NONE.sup]);
});

test('a retracted claim stands, its address marked retracted; an active one bears no mark', () => {
  const [by, sup] = rows(supersessionRows({
    supersededBy: [claim({ new: '1.0.1.0.3.0.2.5', active: false }), claim({ new: '1.0.1.0.3.0.2.6' })],
    supersedes: [claim({ old: '1.0.1.0.2.0.2.7', active: false })],
  }, OWNED));
  assert.equal(by.value, `1.0.1.0.3.0.2.5 · ${t('F.card.retracted')}, 1.0.1.0.3.0.2.6`);
  assert.equal(sup.value, `1.0.1.0.2.0.2.7 · ${t('F.card.retracted')}`);
});

test('a side whose read was refused draws no row: nothing was learned of it, which is not "none"', () => {
  assert.deepEqual(rows(supersessionRows({ supersededBy: null, supersedes: [] }, OWNED)), [NONE.sup]);
  assert.deepEqual(rows(supersessionRows({ supersededBy: [claim({ new: '1.0.1.0.3.0.2.5' })], supersedes: null }, OWNED)), [{ label: t('F.card.superseded-by'), value: '1.0.1.0.3.0.2.5' }]);
  assert.equal(supersessionRows({ supersededBy: null, supersedes: null }, OWNED), '');
});

test('a claim has authority where its claimant — the account of its home, read whole — owns the link it declares superseded, `old`\'s account, whatever `new` is', () => {
  assert.equal(hasAuthority(claim({})), true, '1.0.1 of its own link');
  assert.equal(hasAuthority(claim({ home: '1.0.1.0.3.2' })), true, '1.0.1, homed at its document\'s second version member');
  assert.equal(hasAuthority(claim({ home: '1.0.2.0.5' })), false, '1.0.2 of 1.0.1\'s link');
  assert.equal(hasAuthority(claim({ home: '1.0.2.0.5', old: '1.0.2.0.5.0.2.1' })), true, '1.0.2 of its own link, superseded by 1.0.1\'s');
  assert.equal(hasAuthority(claim({ old: '1.0.2.0.5.0.2.1' })), false, '1.0.1 of 1.0.2\'s link, superseded by its own: `new`\'s owner does not decide');
  assert.equal(hasAuthority(claim({ home: '1.0.1.1.0.4' })), false, '1.0.1.1, the account under 1.0.1, of 1.0.1\'s link');
  assert.equal(hasAuthority(claim({ home: '1.0.1.1.0.4', old: '1.0.1.1.0.4.0.2.3' })), true, '1.0.1.1 of its own link: its account field read whole, never its first component');
});

test('a claim another account made of this link stays off its "superseded by" row, which draws its owner\'s alone; one line follows the rows, its words the line\'s and no number in them', () => {
  const html = supersessionRows({
    supersededBy: [claim({ claim: '1.0.2.0.5.0.2.1', home: '1.0.2.0.5', new: '1.0.2.0.5.0.2.2' }), claim({ new: '1.0.1.0.3.0.2.5' })],
    supersedes: [],
  }, OWNED);
  assert.deepEqual(rows(html), [{ label: t('F.card.superseded-by'), value: '1.0.1.0.3.0.2.5' }, NONE.sup], 'the owner\'s claim alone, as today\'s words');
  assert.equal(line(html), t('L.card.others'));
  assert.ok(!/\d/.test(line(html) || ''), 'no number in it');
  assert.ok(html.indexOf('data-run="claims"') > html.lastIndexOf('class="kv lineage"'), 'it follows the rows');
  assert.deepEqual(listed(html), [], 'nothing listed until its act');
  assert.ok(!html.includes('1.0.2.0.5.0.2.2'), 'the claim behind it is nowhere on the card');
});

test('on a "supersedes" row this link is `new`: a claim stands where its claimant owns `old`, followed by its claimant where the owner row does not name it — "you" for the reader — the claims then parting at "; "', () => {
  const X = '1.0.2.0.5.0.2.1';
  const lineage = { supersededBy: [], supersedes: [
    // 1.0.2 of its own link X: authority, its claimant named; 1.0.1 of 1.0.2's link X: none; 1.0.1 of its own link: authority, named by the owner row
    claim({ claim: '1.0.2.0.5.0.2.3', home: '1.0.2.0.5', old: X }), claim({ claim: '1.0.1.0.3.0.2.8', old: X }), claim({ old: '1.0.1.0.2.0.2.7' }),
  ] };
  assert.deepEqual(rows(supersessionRows(lineage, OWNED))[1], { label: t('F.card.supersedes'), value: `${X} ${t('L.card.by-owner', { claimant: '1.0.2' })}; 1.0.1.0.2.0.2.7` });
  assert.equal(line(supersessionRows(lineage, OWNED)), t('L.card.others'), '1.0.1\'s claim of 1.0.2\'s link behind the line');
  assert.deepEqual(rows(supersessionRows(lineage, { owner: '1.0.1', reader: '1.0.2' }))[1].value, `${X} ${t('L.card.by-owner', { claimant: t('L.card.you') })}; 1.0.1.0.2.0.2.7`, 'the reader named "you"');
  const unnamed = { supersededBy: null, supersedes: [claim({ old: '1.0.1.0.2.0.2.7' }), claim({ old: '1.0.1.0.2.0.2.8', active: false })] };
  assert.deepEqual(rows(supersessionRows(unnamed, OWNED)), [{ label: t('F.card.supersedes'), value: `1.0.1.0.2.0.2.7, 1.0.1.0.2.0.2.8 · ${t('F.card.retracted')}` }], 'no claimant named: the claims part at ", " as today');
});

test('a side whose every claim lacks authority reads "none", the line after the rows; where every claim has authority, or none was answered, no line stands', () => {
  const html = supersessionRows({ supersededBy: [claim({ home: '1.0.2.0.5', new: '1.0.2.0.5.0.2.2' })], supersedes: null }, OWNED);
  assert.deepEqual(rows(html), [NONE.by], 'B1-S5\'s "none": the lineage is the claims with authority');
  assert.equal(line(html), t('L.card.others'));
  assert.equal(line(supersessionRows({ supersededBy: [claim({ new: '1.0.1.0.3.0.2.5' })], supersedes: [claim({ old: '1.0.1.0.2.0.2.7' })] }, OWNED)), null, 'every claim has authority');
  assert.equal(line(supersessionRows({ supersededBy: [], supersedes: null }, OWNED)), null, 'no claim answered');
});

test('the line\'s act made, the claims behind it stand in its place as assertions naming their claimant — "you" for the reader, the verb agreeing — and what the claimant is to the links, a retracted one marked', () => {
  const lineage = {
    supersededBy: [
      // 1.0.2 of 1.0.1's link: no relation; 1.0.1.1, under 1.0.1, of 1.0.1's link, retracted
      claim({ claim: '1.0.2.0.5.0.2.1', home: '1.0.2.0.5', new: '1.0.2.0.5.0.2.2' }),
      claim({ claim: '1.0.1.1.0.4.0.2.1', home: '1.0.1.1.0.4', new: '1.0.1.1.0.4.0.2.2', active: false }),
    ],
    supersedes: [
      // 1.0.1 — this link's owner, above 1.0.1.1 — of 1.0.1.1's link; 1.0.3 of 1.0.2's link
      claim({ claim: '1.0.1.0.3.0.2.8', old: '1.0.1.1.0.4.0.2.3' }),
      claim({ claim: '1.0.3.0.2.0.2.1', home: '1.0.3.0.2', old: '1.0.2.0.5.0.2.7' }),
    ],
  };
  const owner = t('L.card.this-owner'), above = t('L.card.above'), under = t('L.card.under'), you = t('L.card.you');
  const html = supersessionRows(lineage, { owner: '1.0.1', reader: '1.0.3' }, true);
  assert.equal(line(html), null, 'the line gone');
  assert.deepEqual(rows(html), [NONE.by, NONE.sup], 'no claim has authority');
  assert.ok(html.indexOf('<ul class="rows claims">') > html.lastIndexOf('class="kv lineage"'), 'the list where the line stood, after the rows');
  assert.deepEqual(listed(html), [
    { id: 'L.card.claims.superseded-by', text: t('L.card.claims.superseded-by', { claimant: '1.0.2', link: '1.0.2.0.5.0.2.2' }) },
    { id: 'L.card.claims.superseded-by', text: `${t('L.card.claims.superseded-by', { claimant: `1.0.1.1 (${under})`, link: '1.0.1.1.0.4.0.2.2' })} · ${t('F.card.retracted')}` },
    { id: 'L.card.claims.supersedes', text: t('L.card.claims.supersedes', { claimant: `1.0.1 (${owner}, ${above})`, link: '1.0.1.1.0.4.0.2.3' }) },
    { id: 'L.card.claims.supersedes.you', text: t('L.card.claims.supersedes.you', { claimant: you, link: '1.0.2.0.5.0.2.7' }) },
  ]);
  assert.ok(listed(html)[3].text.startsWith(`${you} claim this supersedes`), 'the reader\'s claim in the second person');
  assert.deepEqual(listed(supersessionRows(lineage, { owner: '1.0.1', reader: '1.0.1' }, true))[2], { id: 'L.card.claims.supersedes.you', text: t('L.card.claims.supersedes.you', { claimant: `${you} (${owner}, ${above})`, link: '1.0.1.1.0.4.0.2.3' }) }, 'the reader this link\'s owner: "you", and what it is to the links');
});

/**
 * A page of stand-ins for the card: the platform's focus — the body where it
 * stands on nothing — and the overlay host's element, which holds what the
 * host writes into it as the elements it opens, each by its tag, attributes
 * and classes, and answers a selector — tags, `.class`, `[attr]`,
 * `[attr="value"]` and `:not([attr])` parts, a list of them by commas — with
 * the elements matching it in the order written; an element's `focus()`
 * lands the platform's focus on it, and markup written over the element
 * holding it drops the focus to the body, as the platform's would.
 */
function cardPage() {
  const body = { id: 'the body' };
  const doc = { body, activeElement: /** @type {object} */ (body), getElementById: () => null };
  globalThis.document = /** @type {any} */ (doc);
  /** @typedef {{tag: string, attrs: Record<string, string>, classes: string[], dataset: Record<string, string>, disabled: boolean, id: string, focus: () => void, blur: () => void, getAttribute: (k: string) => string | null}} Kid */
  /** @type {Kid[]} */
  let kids = [];
  let html = '';
  const matches = (/** @type {Kid} */ e, /** @type {string} */ sel) => {
    let s = sel.trim(), ok = true;
    s = s.replace(/:not\(\[([\w-]+)\]\)/g, (_, a) => { if (a in e.attrs) ok = false; return ''; });
    s = s.replace(/\[([\w-]+)(?:="([^"]*)")?\]/g, (_, a, v) => { if (!(a in e.attrs) || (v !== undefined && e.attrs[a] !== v)) ok = false; return ''; });
    s = s.replace(/\.([\w-]+)/g, (_, c) => { if (!e.classes.includes(c)) ok = false; return ''; });
    return ok && (!s || s === e.tag);
  };
  const all = (/** @type {string} */ sel) => kids.filter((e) => sel.split(',').some((one) => matches(e, one)));
  const host = {
    className: '', style: {}, setAttribute() {}, removeAttribute() {}, addEventListener() {},
    getBoundingClientRect: () => ({ left: 0, top: 0, width: 100, height: 50 }),
    contains: (/** @type {unknown} */ x) => kids.includes(/** @type {Kid} */ (x)),
    querySelectorAll: all,
    querySelector: (/** @type {string} */ sel) => all(sel)[0] || null,
    get innerHTML() { return html; },
    set innerHTML(/** @type {string} */ v) {
      html = v;
      const old = kids;
      kids = [...v.matchAll(/<([a-z]+)\b([^>]*)>/g)].map((m) => {
        const attrs = Object.fromEntries([...m[2].matchAll(/([\w-]+)(?:="([^"]*)")?/g)].map((a) => [a[1], a[2] ?? '']));
        const dataset = Object.fromEntries(Object.entries(attrs).filter(([k]) => k.startsWith('data-')).map(([k, x]) => [k.slice(5), x]));
        /** @type {Kid} */
        const e = {
          tag: m[1], attrs, classes: (attrs.class || '').split(/\s+/).filter(Boolean), dataset, disabled: 'disabled' in attrs, id: attrs.id || '',
          focus() { doc.activeElement = e; }, blur() { if (doc.activeElement === e) doc.activeElement = body; }, getAttribute: (k) => attrs[k] ?? null,
        };
        return e;
      });
      if (old.includes(/** @type {Kid} */ (doc.activeElement))) doc.activeElement = body;
    },
  };
  /** the control an element is: its act's name, `x` for the dismiss */
  const nameOf = (/** @type {Kid} */ e) => e.dataset.run || (e.dataset.x ? 'x' : e.tag);
  return {
    host,
    /** the card's controls, in the order written */
    controls: () => kids.filter((e) => e.tag === 'button').map(nameOf),
    /** the control bearing an act's name */
    kid: (/** @type {string} */ run) => /** @type {Kid} */ (kids.find((e) => e.dataset.run === run)),
    /** the control the platform's focus stands on, by its name; 'the body' where it stands on nothing */
    at: () => (doc.activeElement === body ? 'the body' : nameOf(/** @type {Kid} */ (doc.activeElement))),
  };
}

test('the card: a key opens it on follow, the line standing before follow; the line\'s act shows it again under its id with the claims in the line\'s place, a focus held on the line going to follow', async () => {
  const p = cardPage();
  HOST.attach(/** @type {any} */ (p.host));
  // the first edition's citation of 1.0.1.0.127 whole, from its own bytes at 11; 1.0.2's claim of it superseded, homed in 1.0.2's document
  const D = '1.0.1.0.3', FAR = '1.0.1.0.127', TEXT = 'Tumbler.\n\nThe first field.';
  REC.takeDelivery(D, [{ pos: 1, width: TEXT.length, kind: 'content', text: TEXT, ref: null, origin: null }]);
  REC.takeImage(D, 1, [{ iStart: D + '.0.1.1', width: TEXT.length }]);
  REC.takeLinks(D, [L]);
  REC.takeLink({ addr: L, from: [resolveSpan({ start: D + '.0.1.11', width: '0.0.0.0.0.0.0.5' })], to: [resolveSpan({ start: FAR, width: '0.0.0.0.1' })], type: '1.1.0.1.0.1.0.3.13' });
  const stranger = { active: true, claim: '1.0.2.0.5.0.2.1', home: '1.0.2.0.5', new: '1.0.2.0.5.0.2.2', old: L };
  const fake = FAKE.create({
    [FAKE.keyOf('op', { frame: F.inClaims(L, 'audit') })]: { result: { as_of: 1, resp: 'claims', claims: [stranger] } },
    [FAKE.keyOf('op', { frame: F.outClaims(L, 'audit') })]: { result: { as_of: 1, resp: 'claims', claims: [] } },
  });
  PORT.boot(fake);
  const s = LK.shown(D).find((x) => x.link.addr === L);
  assert.ok(s, 'the citation drawn at the first edition');
  await ANATOMY.open(s, null, true);
  assert.equal(HOST.currentState()?.id, 'anatomy:' + L);
  assert.deepEqual(p.controls(), ['claims', 'follow', 'beside', 'x'], 'the line stands before the card\'s acts');
  assert.equal(p.at(), 'follow', 'a key opened it: the focus on its first act, follow, never the line before it');
  p.kid('claims').focus();
  const act = HOST.currentState()?.acts?.claims;
  assert.ok(act, 'the line offers its act');
  act(/** @type {any} */ (p.kid('claims')), true);
  assert.equal(HOST.currentState()?.id, 'anatomy:' + L, 'shown again under its id');
  assert.deepEqual(p.controls(), ['follow', 'beside', 'x'], 'the line gone');
  assert.deepEqual(listed(p.host.innerHTML), [{ id: 'L.card.claims.superseded-by', text: t('L.card.claims.superseded-by', { claimant: '1.0.2', link: '1.0.2.0.5.0.2.2' }) }], 'the claim behind it in the line\'s place');
  assert.equal(p.at(), 'follow', 'the focus held on the line goes to the card\'s first control (rule 11), never the body');
  HOST.dismiss();
  assert.deepEqual(fake.unanswered, []);
});

test('the card says beneath its far end\'s words what that end\'s text holds of its passage where it is not all of it in one piece — the line its landing says — and nothing where it is (issue #153)', async () => {
  const p = cardPage();
  HOST.attach(/** @type {any} */ (p.host));
  // the first edition's citation of twenty-two of 1.0.1.0.127's bytes from its third, which an edit cut in two: four at 3, five at 20
  const D = '1.0.1.0.3', FAR = '1.0.1.0.127', CUT = D + '.0.2.4';
  const TEXT = 'Tumbler.\n\nThe first field.', FAR_TEXT = 'The far edition.\n\nIts cited passage stands here.';
  REC.takeDelivery(D, [{ pos: 1, width: TEXT.length, kind: 'content', text: TEXT, ref: null, origin: null }]);
  REC.takeImage(D, 1, [{ iStart: D + '.0.1.1', width: TEXT.length }]);
  REC.takeDelivery(FAR, [{ pos: 1, width: FAR_TEXT.length, kind: 'content', text: FAR_TEXT, ref: null, origin: null }]);
  REC.takeImage(FAR, 1, [{ iStart: FAR + '.0.1.1', width: FAR_TEXT.length }]);
  REC.takeLinks(D, [CUT]);
  REC.takeLink({ addr: CUT, from: [resolveSpan({ start: D + '.0.1.1', width: '0.0.0.0.0.0.0.3' })], to: [resolveSpan({ start: FAR + '.0.1.3', width: '0.0.0.0.0.0.0.22' })], type: '1.1.0.1.0.1.0.3.13' });
  REC.takeProjection(CUT, 2, FAR, [{ pos: 3, width: 4 }, { pos: 20, width: 5 }]);
  const fake = FAKE.create({
    [FAKE.keyOf('op', { frame: F.inClaims(CUT, 'audit') })]: { result: { as_of: 1, resp: 'claims', claims: [] } },
    [FAKE.keyOf('op', { frame: F.outClaims(CUT, 'audit') })]: { result: { as_of: 1, resp: 'claims', claims: [] } },
  });
  PORT.boot(fake);
  const drawn = () => /** @type {import('../links/links.js').Shown} */ (LK.shown(D).find((x) => x.link.addr === CUT));
  /** the line beneath the far end's words, as a person reads it; null where none stands */
  const said = () => { const m = p.host.innerHTML.match(/<div class="end far">.*?<div class="note" data-string="L\.held\.(\w+)">(.*?)<\/div>/); return m ? [m[1], text(m[2])] : null; };
  await ANATOMY.open(drawn(), null);
  assert.deepEqual(said(), ['part', t('L.held.part', { subject: t('L.held.followed'), where: t('L.held.current', { D: FAR }) }) + t('L.held.places', { n: 2 })], 'nine of its twenty-two bytes, in two places');
  HOST.dismiss();
  REC.takeProjection(CUT, 2, FAR, [{ pos: 3, width: 22 }]);
  await ANATOMY.open(drawn(), null);
  assert.equal(said(), null, 'all of it in one piece: the far end\'s words alone');
  HOST.dismiss();
  assert.deepEqual(fake.unanswered, []);
});

test('an end LK draws at a withheld run: its card says the end is withheld and whose — the owner of the run\'s origin, as its placeholder names it — with no read of the withheld bytes, and shows the other end; the run\'s one symbol standing for several lists them at the symbol, each row opening its own end\'s card (issue #202)', async () => {
  const p = cardPage();
  HOST.attach(/** @type {any} */ (p.host));
  // a document of 1.0.1's: its first paragraph, then eight of 1.0.2's draft's bytes withheld from the reader, two of 1.0.1's citations on them
  const D = '1.0.1.0.31', O = '1.0.2.0.9', FAR = '1.0.1.0.131', CITE = '1.1.0.1.0.1.0.3.13', TEXT = 'Tumbler.\n\n', n = TEXT.length;
  REC.takeDelivery(D, [{ pos: 1, width: n, kind: 'content', text: TEXT, ref: null, origin: null }, { pos: n + 1, width: 8, kind: 'withheld', text: '', ref: null, origin: O }]);
  REC.takeImage(D, 1, [{ iStart: D + '.0.1.1', width: n }, { iStart: O + '.0.1.1', width: 8 }]);
  const [A, B] = [D + '.0.2.1', D + '.0.2.2'];
  REC.takeLinks(D, [A, B]);
  for (const [l, at] of /** @type {Array<[string, number]>} */ ([[A, 2], [B, 6]])) REC.takeLink({ addr: l, from: [resolveSpan({ start: `${O}.0.1.${at}`, width: '0.0.0.0.0.0.0.2' })], to: [resolveSpan({ start: FAR, width: '0.0.0.0.1' })], type: CITE });
  const fake = FAKE.create(Object.fromEntries([A, B].flatMap((l) => [
    [FAKE.keyOf('op', { frame: F.inClaims(l, 'audit') }), { result: { as_of: 1, resp: 'claims', claims: [] } }],
    [FAKE.keyOf('op', { frame: F.outClaims(l, 'audit') }), { result: { as_of: 1, resp: 'claims', claims: [] } }],
  ])));
  PORT.boot(fake);
  const end = (/** @type {string} */ l) => /** @type {import('../links/links.js').Shown} */ (LK.shown(D).find((x) => x.link.addr === l));
  assert.deepEqual([end(A).pos, end(A).width, end(A).run?.origin], [n + 1, 8, O], 'drawn at the run\'s start, the run\'s whole extent');
  /** a card's two ends as a person reads them, far first: which end, its document, its words */
  const ends = () => [...p.host.innerHTML.matchAll(/<div class="end (far|near)"><span class="k">[^<]*<\/span> <span class="code">([^<]*)<\/span>.*?<div class="quoted">([^<]*)<\/div>/g)].map((m) => [m[1], m[2], text(m[3])]);
  await ANATOMY.open(end(A), null);
  assert.deepEqual(ends(), [['far', FAR, '…'], ['near', D, t('F.corner.withheld', { owner: '1.0.2' })]], 'the other end shown; this end withheld, by the owner of the run\'s origin — never D\'s');
  assert.ok(!fake.asked.some((k) => k.includes('"retrieve_v"')), `no read of the withheld bytes: ${fake.asked}`);
  HOST.dismiss();
  // the run's one symbol, standing for both, pressed: both listed at it, each row its own end's card
  const el = /** @type {any} */ ({ isConnected: true, getBoundingClientRect: () => ({ left: 0, top: 0, right: 10, bottom: 10, width: 10, height: 10 }) });
  ANATOMY.fromSymbol([end(A), end(B)], el);
  const list = HOST.currentState();
  assert.deepEqual([list?.id, list?.kind, list?.anchor], [`ends:${D}:${n + 1}`, 'list', { el, span: { addr: D, pos: n + 1, width: 8 } }], 'a list at the symbol, at the run\'s positions where the symbol is taken down');
  assert.deepEqual(p.controls(), ['t0', 't1', 'x'], 'a row for each end');
  assert.ok(p.host.innerHTML.includes(`→ ${FAR}</button>`), 'each row naming its far end as its tail would');
  const act = list?.acts?.t1;
  assert.ok(act);
  await act(/** @type {any} */ (p.kid('t1')), false);
  for (let i = 0; i < 50 && HOST.currentState()?.id !== 'anatomy:' + B; i++) await new Promise((r) => setTimeout(r, 0));
  assert.equal(HOST.currentState()?.id, 'anatomy:' + B, 'the second row opens the second end\'s card');
  HOST.dismiss();
  assert.deepEqual(fake.unanswered, []);
});
