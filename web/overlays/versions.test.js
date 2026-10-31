// O-VERSIONS' test against the fake port, the overlay host on a stand-in
// element: each member's row carries the day it was published as its
// metadata answered — "not recorded" where the board holds no reading, the
// board not answering said once across the row — under "published" said
// once at the list's head; each member's row marks what its text holds of the passage held,
// by `compare` over the member's own extent and by the rule a landing reads
// (FP-21) — whole, part, all of it in pieces, couldn't tell by the refusal
// met; each read act a version move carrying the passage held and landing in
// place, the box taking the member, the list standing through it and read
// again at the member, and a list opened at the version its box
// shows holding the passage in that version (FP-22, FP-36); the open end — the
// head's row marked latest and the caption counting the chain only where the
// board ended it, a list whose probe stopped keeping every member read and
// saying how far it read, "try again" going on from there, the version being
// read and the members a feed row names listed "not read", a chain of ten
// listed to its end, a board that answers nothing leaving no member; and the
// list standing at the act's site — the corner's statement and the
// document's box beside it.
import { test, before } from 'node:test';
import assert from 'node:assert/strict';
import * as PORT from '../bridge/port.js';
import * as REC from '../model/records.js';
import * as PUMP from '../model/pump.js';
import * as F from '../model/frames.js';
import * as FAKE from '../test/fake-port.js';
import * as CAM from '../plane/camera.js';
import * as GO from '../nav/go.js';
import { docBox } from '../plane/projection.js';
import * as HOST from './host.js';
import * as VERSIONS from './versions.js';
import { memberOf } from '../model/address.js';
import { t } from '../strings.js';
import { esc } from '../util.js';

const T = '1.0.1.0.43', T1 = T + '.1', T2 = T + '.2';
// the edition and its first member: two paragraphs; its second member: a prologue set before them, which stands the second paragraph 24 positions later
const TEXT = 'First.\n\nSecond paragraph.', PROLOGUE = 'Prologue added before.\n\n', TEXT2 = PROLOGUE + TEXT;
/** the second paragraph, the passage held: its first position and its positions, in the edition */
const HELD = { pos: TEXT.indexOf('Second') + 1, width: 'Second paragraph.'.length };
/** the second paragraph as the second member sets it: the passage held, read in that member */
const HELD2 = { pos: HELD.pos + PROLOGUE.length, width: HELD.width };

/** the day the board says a member `D.k` was published: noon on the 10+k-th of March 2026, in this machine's own time zone, its feed row standing; a trunk the 1st's */
const publishedAt = (/** @type {string} */ doc) => new Date(2026, 2, 10 + (memberOf(doc) ?? -9), 12).getTime();
/** that day, as the page names it */
const dayNamed = (/** @type {string} */ doc) => `${10 + (memberOf(doc) ?? -9)} March 2026`;
/** the reads of a document of `trunk`'s chain read whole: its extent, its metadata with its age, its text, its image, its links (none) */
const reads = (/** @type {string} */ doc, /** @type {string} */ text, trunk = T) => ({
  [FAKE.keyOf('op', { frame: F.retrieveDocVSpanSet(doc) })]: { result: { as_of: 1, resp: 'span_set', set: [{ start: '1.1', width: '0.' + text.length }] } },
  [FAKE.keyOf('op', { frame: F.docMetadata(doc) })]: { result: { as_of: 1, resp: 'doc_metadata', doc, published: true, owner: '1.0.1', birth: trunk + '.1', birth_extent: String(TEXT.length), placed: null, base_extent: null, source: null, at: 100 + (memberOf(doc) ?? 0), time: publishedAt(doc), time_from: 'feed' } },
  [FAKE.keyOf('op', { frame: F.retrieveV(doc, 1, text.length) })]: { result: { as_of: 1, resp: 'delivery', items: [{ content: text }] } },
  [FAKE.keyOf('op', { frame: F.image(doc, 1, text.length) })]: { result: { as_of: 1, resp: 'runs', runs: [{ i_start: trunk + '.0.1.1', width: String(text.length) }] } },
  [FAKE.keyOf('op', { frame: F.findLinksV(doc, 1, text.length) })]: { result: { as_of: 1, resp: 'addrs', addrs: [] } },
});
/** `compare`'s answer for a passage held in `doc` (the held passage of T unless named) against a member's positions 1 to `extent`: the pairs given */
const compared = (/** @type {string} */ member, /** @type {number} */ extent, /** @type {Array<[number, number, number]>} */ pairs, doc = T, held = HELD) => ({
  [FAKE.keyOf('op', { frame: F.compare([{ doc, spans: [{ ordinal: held.pos, positions: held.width }] }], [{ doc: member, spans: [{ ordinal: 1, positions: extent }] }]) })]:
    { result: { as_of: 1, resp: 'compare', pairs: pairs.map(([u1, u2, width]) => ({ d1: doc, d2: member, u1: { ordinal: String(u1), subspace: '1' }, u2: { ordinal: String(u2), subspace: '1' }, width: String(width) })) } },
});
// another edition, U, of two members, each its text whole; the passage held where the list is opened on no position: its first block, whole
const U = '1.0.1.0.44', U1 = U + '.1', U2 = U + '.2';
const FIRST = { pos: 1, width: 'First.\n\n'.length };
// another edition, V, of four members, the passage held its second paragraph: the first holding it whole; the second its first nine
// positions and its first eight again — as many positions as the passage, never all of it; the third all of it in two pieces, its last
// nine positions first; the fourth's extent the board does not answer
const V = '1.0.1.0.45', V1 = V + '.1', V2 = V + '.2', V3 = V + '.3', V4 = V + '.4';
// the open end: X, of four members, its third's metadata the board never answers, its fourth one a feed row names;
// Y, of ten members, past the view's cap of eight, whose eleventh — past its end — the board does not answer while `beyond`
// stands; Z, which the board does not answer at all
const X = '1.0.1.0.46', X1 = X + '.1', X2 = X + '.2', X3 = X + '.3', X4 = X + '.4';
const Y = '1.0.1.0.47', Z = '1.0.1.0.48';
// W, of three members, each holding its first paragraph: the board keeping no reading of its second's time, and not
// answering its third's metadata
const W = '1.0.1.0.49', W1 = W + '.1', W2 = W + '.2', W3 = W + '.3';
/** a member's metadata as `reads` answers it, its time as the board answers it where it holds no reading */
const untimed = (/** @type {string} */ doc, /** @type {string} */ trunk) => {
  const answer = /** @type {{result: Record<string, unknown>}} */ (reads(doc, TEXT, trunk)[FAKE.keyOf('op', { frame: F.docMetadata(doc) })]);
  return { result: { ...answer.result, time: null, time_from: null } };
};
const UNREACHABLE = { refused: { kind: 'unreachable', name: 'unreachable', text: 'the board is not answering' } };
const NOT_REGISTERED = { refused: { kind: 'refused', name: 'doc_not_registered', code: 'doc_not_registered' } };
/** Y's k-th member */
const y = (/** @type {number} */ k) => Y + '.' + k;
const script = {
  ...reads(T, TEXT), ...reads(T1, TEXT), ...reads(T2, TEXT2),
  // the second member's bytes as its text sets them: its prologue its own, then the edition's
  [FAKE.keyOf('op', { frame: F.image(T2, 1, TEXT2.length) })]: { result: { as_of: 1, resp: 'runs', runs: [{ i_start: T2 + '.0.1.1', width: String(PROLOGUE.length) }, { i_start: T + '.0.1.1', width: String(TEXT.length) }] } },
  ...compared(T1, TEXT.length, [[HELD.pos, HELD.pos, HELD.width]]),
  ...compared(T2, TEXT2.length, [[HELD.pos, HELD.pos + PROLOGUE.length, HELD.width]]),
  // the second member's first positions, as long as the edition: its prologue and its first paragraph, none of the passage
  ...compared(T2, TEXT.length, []),
  // the passage held in the second member, and in the first, against each: where a list standing over a version move is read again
  ...compared(T1, TEXT.length, [[HELD2.pos, HELD.pos, HELD.width]], T2, HELD2), ...compared(T2, TEXT2.length, [[HELD2.pos, HELD2.pos, HELD.width]], T2, HELD2),
  ...compared(T1, TEXT.length, [[HELD.pos, HELD.pos, HELD.width]], T1), ...compared(T2, TEXT2.length, [[HELD.pos, HELD2.pos, HELD.width]], T1),
  ...reads(U, TEXT, U), ...reads(U1, TEXT, U), ...reads(U2, TEXT, U),
  ...compared(U1, TEXT.length, [[1, 1, FIRST.width]], U, FIRST), ...compared(U2, TEXT.length, [[1, 1, FIRST.width]], U, FIRST),
  [FAKE.keyOf('op', { frame: F.docMetadata(U + '.3') })]: { refused: { kind: 'refused', name: 'doc_not_registered', code: 'doc_not_registered' } },
  [FAKE.keyOf('op', { frame: F.docMetadata(T + '.3') })]: { refused: { kind: 'refused', name: 'doc_not_registered', code: 'doc_not_registered' } },
  ...reads(V, TEXT, V), ...reads(V1, TEXT, V), ...reads(V2, TEXT, V), ...reads(V3, TEXT, V),
  ...compared(V1, TEXT.length, [[HELD.pos, HELD.pos, HELD.width]], V),
  ...compared(V2, TEXT.length, [[HELD.pos, 1, 9], [HELD.pos, 12, 8]], V),
  ...compared(V3, TEXT.length, [[HELD.pos + 8, 1, HELD.width - 8], [HELD.pos, 15, 8]], V),
  [FAKE.keyOf('op', { frame: F.docMetadata(V4) })]: reads(V4, TEXT, V)[FAKE.keyOf('op', { frame: F.docMetadata(V4) })],
  [FAKE.keyOf('op', { frame: F.retrieveDocVSpanSet(V4) })]: { refused: { kind: 'unreachable', name: 'unreachable', text: 'the board is not answering' } },
  // X's members, the passage held its second paragraph at its bare address, its third's first block at its third member
  ...reads(X, TEXT, X), ...reads(X1, TEXT, X), ...reads(X2, TEXT, X), ...reads(X3, TEXT, X),
  [FAKE.keyOf('op', { frame: F.docMetadata(X3) })]: UNREACHABLE,
  ...compared(X1, TEXT.length, [[HELD.pos, HELD.pos, HELD.width]], X), ...compared(X2, TEXT.length, [[HELD.pos, HELD.pos, HELD.width]], X),
  ...compared(X1, TEXT.length, [[1, 1, FIRST.width]], X3, FIRST), ...compared(X2, TEXT.length, [[1, 1, FIRST.width]], X3, FIRST),
  // Y's ten members, each holding the passage whole
  ...reads(Y, TEXT, Y),
  ...Object.assign({}, ...Array.from({ length: 10 }, (_, i) => ({ ...reads(y(i + 1), TEXT, Y), ...compared(y(i + 1), TEXT.length, [[HELD.pos, HELD.pos, HELD.width]], Y) }))),
  [FAKE.keyOf('op', { frame: F.retrieveDocVSpanSet(Z) })]: UNREACHABLE,
  [FAKE.keyOf('op', { frame: F.docMetadata(Z + '.1') })]: UNREACHABLE,
  ...reads(W, TEXT, W), ...reads(W1, TEXT, W), ...reads(W2, TEXT, W),
  [FAKE.keyOf('op', { frame: F.docMetadata(W2) })]: untimed(W2, W),
  [FAKE.keyOf('op', { frame: F.docMetadata(W3) })]: UNREACHABLE,
  ...compared(W1, TEXT.length, [[1, 1, FIRST.width]], W, FIRST), ...compared(W2, TEXT.length, [[1, 1, FIRST.width]], W, FIRST),
};
/** the board out while Y's chain is first probed past its tenth member */
let beyond = true;
Object.defineProperty(script, FAKE.keyOf('op', { frame: F.docMetadata(y(11)) }), { enumerable: true, get: () => (beyond ? UNREACHABLE : NOT_REGISTERED) });
/** the board out while U's chain is first probed: its second member's metadata not answered until the outage ends */
let outage = true;
const U2_META = script[FAKE.keyOf('op', { frame: F.docMetadata(U2) })];
Object.defineProperty(script, FAKE.keyOf('op', { frame: F.docMetadata(U2) }), {
  enumerable: true,
  get: () => (outage ? { refused: { kind: 'unreachable', name: 'unreachable', text: 'the board is not answering' } } : U2_META),
});

/** @type {ReturnType<typeof FAKE.create>} */
let fake;
/** the overlay host's stand-in element: what the host writes into it is what a person meets */
const hostEl = { className: '', innerHTML: '', style: {}, setAttribute() {}, removeAttribute() {}, addEventListener() {}, querySelector: () => null, querySelectorAll: () => [], getBoundingClientRect: () => ({ left: 0, top: 0, width: 0, height: 0 }), contains: () => false };
/** the list's rows: each member's number and what its strip marks */
const rows = () => [...hostEl.innerHTML.matchAll(/data-run="read(\d+)"[^>]*>(?:(?!<\/button>).)*<\/button> (?:<span class="date">[^<]*<\/span> )?<span class="strip[^"]*" data-holds="([a-z]*)"/g)].map((m) => [Number(m[1]), m[2]]);
/** the list's rows as a person reads them: each member's number, its date's words, and its strip's — one cell's words alone where one stands across both */
const cells = () => [...hostEl.innerHTML.matchAll(/data-run="read(\d+)"[^>]*>(?:(?!<\/button>).)*<\/button> (?:<span class="date">([^<]*)<\/span> <span class="strip" data-holds="[a-z]*">([^<]*)<\/span>|<span class="strip across" data-holds="[a-z]*">([^<]*)<\/span>)/g)]
  .map((m) => (m[4] != null ? [Number(m[1]), unesc(m[4])] : [Number(m[1]), unesc(m[2]), unesc(m[3])]));
/** the words "published" stands in at the list's head, each time it stands there */
const heads = () => [...hostEl.innerHTML.matchAll(/<li class="head"><span data-string="F\.published">([^<]*)<\/span><\/li>/g)].map((m) => unesc(m[1]));
/** HTML text as a person reads it: the escapes `esc` writes undone */
const unesc = (/** @type {string} */ s) => s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&amp;/g, '&');
/** the list's caption as markup, up to the rows */
const captionHTML = () => { const m = hostEl.innerHTML.match(/<span class="label">(.*?)<\/span><ul class="rows/); return m ? m[1] : null; };
/** the list's caption, as a person reads it */
const caption = () => { const h = captionHTML(); return h == null ? null : unesc(h.replace(/<[^>]*>/g, '')); };
/** the members whose read act carries the latest version's mark */
const marked = () => [...hostEl.innerHTML.matchAll(/data-run="read(\d+)"[^>]*>(?:(?!<\/button>).)*class="latest"/g)].map((m) => Number(m[1]));
/** the members whose read act is the current one */
const current = () => [...hostEl.innerHTML.matchAll(/data-run="read(\d+)" aria-current="true"/g)].map((m) => Number(m[1]));
/** the line at the list's open end, as a person reads it: its string, its words, its date's words, whether it offers "try again"; null where none stands */
const openEnd = () => {
  const m = hostEl.innerHTML.match(/<div class="open-end"><span data-string="([^"]*)">([^<]*)<\/span>(.*?)<\/div>/);
  if (!m) return null;
  const date = m[3].match(/<span data-string="L\.versions\.as-of">([^<]*)<\/span>/);
  return { id: m[1], words: unesc(m[2]), asOf: date ? unesc(date[1]) : null, again: m[3].includes('data-run="again"') };
};
/** the reads the fake port was asked since `from`, by their frames' keys */
const askedSince = (/** @type {number} */ from) => fake.asked.slice(from);
/** a frame's key, as the fake port keeps it */
const key = (/** @type {object} */ frame) => FAKE.keyOf('op', { frame });
/** the list's "try again" pressed, its reads run to their end */
async function again() {
  const act = HOST.currentState()?.acts?.again;
  assert.ok(act, 'the list offers "try again"');
  act(/** @type {any} */ (hostEl), false);
  await opened();
}

before(async () => {
  REC._reset();
  globalThis.document = /** @type {any} */ ({ activeElement: null, body: null });
  globalThis.HTMLElement = /** @type {any} */ (class {});
  HOST.attach(/** @type {any} */ (hostEl));
  fake = FAKE.create(script);
  PORT.boot(fake);
  REC.setBoard({ board: 'b-1', name: '', origin: '' }); REC.setSession({ session: 's-1', principal: 1, account: '1.0.1' });
  REC.takeIndex(/** @type {any} */ ({ docs: [{ doc: T, kind: 'edition', label: 't', standing: 'public' }], counts: [{ account: '1.0.1', documents: 1 }], state: { arm: 'complete' } }));
  CAM.setViewport(1440, 900);
  await PUMP.loadWhole(T);
  REC.takeMembers(T, 2);
});

test('each member\'s row marks the passage held by `compare` over the member\'s own extent: a member longer than its document holds it whole past the document\'s length', async () => {
  await VERSIONS.open(T, HELD.pos, null);
  assert.deepEqual(rows(), [[1, 'whole'], [2, 'whole']], hostEl.innerHTML);
  assert.deepEqual(fake.unanswered, []);
});

test('each row carries the day its member was published, as the board answered its metadata, beside its read act — and "published" stands once, over the dates, at the list\'s head (issue #22\'s design decision: "show each version\'s publish date on its row. Say \'published\' once, at the list\'s head")', async () => {
  await VERSIONS.open(T, HELD.pos, null);
  assert.deepEqual(cells(), [[1, dayNamed(T1), t('F.versions.whole')], [2, dayNamed(T2), t('F.versions.whole')]], 'version 1 the 11th of March, version 2 the 12th');
  assert.deepEqual(heads(), [t('F.published')], 'said once');
  assert.ok(hostEl.innerHTML.indexOf('<li class="head">') < hostEl.innerHTML.indexOf('data-run="read1"'), 'at the list\'s head, before its first row');
  assert.ok(!/\d+ (days?|hours?|minutes?) ago/.test(hostEl.innerHTML), 'never a relative age');
  HOST.dismiss();
  assert.deepEqual(fake.unanswered, []);
});

test('a member the board holds no reading of the time of reads "not recorded"; one whose metadata the board does not answer reads "board unreachable" once across its date and what it holds, the member asked nothing more (issue #22; FP-34)', async () => {
  await PUMP.loadWhole(W);
  REC.takeMembers(W, 3);
  const from = fake.asked.length;
  await VERSIONS.open(W, null, null);
  assert.deepEqual(cells(), [[1, dayNamed(W1), t('F.versions.whole')], [2, t('F.slot.not-recorded'), t('F.versions.whole')], [3, t('F.daemon.unreachable')]]);
  assert.deepEqual(rows(), [[1, 'whole'], [2, 'whole'], [3, 'unknown']], 'the third could not tell what it holds');
  assert.ok(!askedSince(from).includes(key(F.retrieveDocVSpanSet(W3))), 'the third asked nothing after its metadata went unanswered');
  assert.deepEqual(heads(), [t('F.published')]);
  HOST.dismiss();
  assert.deepEqual(fake.unanswered, []);
});

test('each row reads its member by the rule a landing reads (issue #153): whole, in one piece; part, though it holds as many positions as the passage; all of it in pieces, its places named; couldn\'t tell, by the refusal met, where the board did not answer — never a strip left blank', async () => {
  await PUMP.loadWhole(V);
  REC.takeMembers(V, 4);
  await VERSIONS.open(V, HELD.pos, null);
  assert.deepEqual(rows(), [[1, 'whole'], [2, 'part'], [3, 'pieces'], [4, 'unknown']], hostEl.innerHTML);
  const strips = [...hostEl.innerHTML.matchAll(/<span class="strip" data-holds="[a-z]*">([^<]*)<\/span>/g)].map((m) => m[1]);
  assert.deepEqual(strips, [t('F.versions.whole'), t('F.versions.part'), t('L.versions.pieces', { n: 2 }), t('L.versions.unknown', { reason: t('F.daemon.unreachable') })].map(esc), 'each in its words');
  HOST.dismiss();
  assert.deepEqual(fake.unanswered, []);
});

test('a member\'s read act is a version move carrying the passage held (issue #154): it lands in place, never flying, the box taking the member and the landing marked at the passage\'s counterpart there, never at the edition\'s position; the list stands through it, read again at the member over the passage there, the member current (issue #266)', async () => {
  await VERSIONS.open(T, HELD.pos, null);
  const o = HOST.currentState();
  const read = o && o.acts ? o.acts['read2'] : null;
  assert.ok(read, 'the second member\'s row offers its read act');
  const at = CAM.view();
  let flew = false;
  read(/** @type {any} */ (hostEl), false);
  for (let i = 0; i < 200 && !GO.arrivalMark(); i++) { await new Promise((r) => setTimeout(r, 0)); flew = flew || CAM.flying(); if (CAM.flying()) CAM.step(Infinity); }
  assert.deepEqual(GO.arrivalMark(), { addr: T2, pos: HELD.pos + PROLOGUE.length, runs: [{ pos: HELD.pos + PROLOGUE.length, width: HELD.width }], link: null });
  const v = CAM.view();
  assert.ok(!flew && v.x === at.x && v.y === at.y && v.scale === at.scale, 'no flight: the camera where it stood');
  assert.equal(GO.shownIn(T), T2, 'the box takes the member');
  await listedAt(T2);
  assert.deepEqual([HOST.currentState()?.id, rows(), current(), caption()], ['versions:' + T, [[1, 'whole'], [2, 'whole']], [2], `${T} · ${t('F.version-of', { k: 2, n: 2 })}`], 'the list standing, read again at the member: version 2 current');
  assert.deepEqual(/** @type {VERSIONS.About} */ (HOST.currentState()?.about).held, { ...HELD2, ids: [{ prefix: T + '.0.1', ordinal: HELD.pos, width: HELD.width }] }, 'over the passage where the member holds its bytes');
  assert.deepEqual(fake.unanswered, []);
});

test('the list opened at the version its box shows holds the passage in that version (issue #154): its rows compare the passage from it, and its read acts carry it from it — never the trunk\'s positions; the list read again at the version moved to (issue #266)', async () => {
  await run(GO.leapTo(T2));
  assert.equal(GO.shownIn(T), T2, 'a LEAP to the member: its box shows it');
  await VERSIONS.open(T2, HELD2.pos, null);
  assert.deepEqual(rows(), [[1, 'whole'], [2, 'whole']], hostEl.innerHTML);
  assert.ok(hostEl.innerHTML.includes(esc(t('F.version-of', { k: 2, n: 2 }))), 'version 2 of 2: the list opened at the member');
  const read = HOST.currentState()?.acts?.read1;
  assert.ok(read, 'the first member\'s row offers its read act');
  read(/** @type {any} */ (hostEl), false);
  for (let i = 0; i < 200 && GO.arrivalMark()?.addr !== T1; i++) await new Promise((r) => setTimeout(r, 0));
  assert.deepEqual([GO.arrivalMark(), GO.shownIn(T)], [{ addr: T1, pos: HELD.pos, runs: [{ pos: HELD.pos, width: HELD.width }], link: null }, T1], 'carried from the member: its counterpart in the first');
  await listedAt(T1);
  assert.deepEqual([rows(), current(), caption()], [[[1, 'whole'], [2, 'whole']], [1], `${T} · ${t('F.version-of', { k: 1, n: 2 })}`], 'the list read again at the first: version 1 current');
  HOST.dismiss();
  assert.deepEqual(fake.unanswered, []);
});

test('the head\'s row carries the latest version\'s mark, and the caption counts the chain, only where the board ended the chain there: a count held as read so far is read on from, its next member asked first, to the end the board answers (issue #184\'s design decision: "End proved")', async () => {
  await VERSIONS.open(T, HELD.pos, null);
  assert.deepEqual([caption(), marked(), openEnd()], [`${T} · ${t('F.version-of', { k: 2, n: 2 })}`, [2], null], 'the end held: the head marked, the chain counted, no line');
  assert.ok((captionHTML() || '').startsWith(`<span class="id">${T}</span>`), `the caption's address in the identifier's face (issue #16): ${captionHTML()}`);
  assert.ok(hostEl.innerHTML.includes(`<span class="latest" role="img" aria-label="${esc(t('L.versions.latest'))}" data-string="L.versions.latest-mark">${esc(t('L.versions.latest-mark'))}</span>`), 'the mark a shape, named in words');
  HOST.dismiss();
  REC.takeMembers(T, 2, false);
  const from = fake.asked.length;
  await VERSIONS.open(T, HELD.pos, null);
  assert.deepEqual(askedSince(from).filter((k) => k.includes('"doc_metadata"')), [key(F.docMetadata(T + '.3'))], 'read on past the two held: its third member asked, never its second');
  assert.deepEqual([rows(), caption(), marked(), openEnd(), REC.doc(T).ended], [[[1, 'whole'], [2, 'whole']], `${T} · ${t('F.version-of', { k: 2, n: 2 })}`, [2], null, true], 'its third not registered: the end proved, the head marked');
  HOST.dismiss();
  assert.deepEqual(fake.unanswered, []);
});

test('a list whose probe the board stopped answering keeps every member it read and says at its open end how far it read and that it is not known to be complete — no count, no mark, nothing recorded; "try again" goes on from there, asking neither the document nor a row it told again, and the line goes once the board ends the chain (issue #184)', async () => {
  await VERSIONS.open(U, null, null);
  assert.deepEqual([rows(), caption(), marked(), REC.doc(U).members], [[[1, 'whole']], U, [], null], 'U.2 not answered: its first member listed, the caption counting nothing, no mark, no count recorded');
  assert.deepEqual(openEnd(), { id: 'L.versions.cut', words: t('L.versions.cut', { k: 1 }), asOf: null, again: true }, 'the line at the open end, "try again" its act');
  outage = false;
  const from = fake.asked.length;
  await again();
  const U2_ROW = F.compare([{ doc: U, spans: [{ ordinal: FIRST.pos, positions: FIRST.width }] }], [{ doc: U2, spans: [{ ordinal: 1, positions: TEXT.length }] }]);
  assert.deepEqual(askedSince(from), [F.docMetadata(U2), F.docMetadata(U + '.3'), F.retrieveDocVSpanSet(U2), U2_ROW].map(key), 'gone on from its first member: its second asked and its third, then its second\'s row — nothing of U\'s own, and no row it told');
  assert.deepEqual([rows(), caption(), marked(), openEnd(), REC.doc(U).members, REC.doc(U).ended], [[[1, 'whole'], [2, 'whole']], `${U} · ${t('F.version-of', { k: 2, n: 2 })}`, [2], null, 2, true], 'the end proved: the line gone, the head marked, the chain counted');
  HOST.dismiss();
  assert.deepEqual(fake.unanswered, []);
});

test('the version being read is listed where the probe stopped short of it: current, and "not read" once across its date and what it holds of the passage, the caption naming it alone (issue #184: "The version being read is always listed"; FP-34)', async () => {
  await VERSIONS.open(X3, null, null);
  assert.deepEqual([rows(), current(), caption(), marked(), REC.doc(X).members], [[[1, 'whole'], [2, 'whole'], [3, 'unread']], [3], `${X} · ${t('L.version', { k: 3 })}`, [], null]);
  assert.ok(hostEl.innerHTML.includes(`<span class="strip across" data-holds="unread">${esc(t('L.versions.not-read'))}</span>`), 'never a blank strip, which would read as "no"');
  assert.deepEqual(cells(), [[1, dayNamed(X1), t('F.versions.whole')], [2, dayNamed(X2), t('F.versions.whole')], [3, t('L.versions.not-read')]], 'the members read dated; the one past them "not read", said once for its date and its strip');
  assert.deepEqual(openEnd(), { id: 'L.versions.cut', words: t('L.versions.cut', { k: 2 }), asOf: null, again: true });
  HOST.dismiss();
  assert.deepEqual(fake.unanswered, []);
});

test('the members a held feed row names past where the probe stopped are listed, each not read, and the line dates them by the newest row\'s commit time, in the form every date of the list takes (issue #184: "as last read ⟨when⟩"; issue #22)', async () => {
  const WHEN = new Date(2026, 9, 22, 9, 4).getTime();
  REC.applyFeedUpdate(/** @type {any} */ ({ position: 12654, at: 12654, op: 'publish', docs: [X4], class: 'published', time: WHEN }));
  await VERSIONS.open(X, HELD.pos, null);
  assert.deepEqual([rows(), current(), caption(), marked()], [[[1, 'whole'], [2, 'whole'], [3, 'unread'], [4, 'unread']], [], X, []], 'every member up to the fourth the row names, the third between them among them');
  assert.deepEqual(openEnd(), { id: 'L.versions.cut', words: t('L.versions.cut', { k: 2 }), asOf: t('L.versions.as-of', { when: '22 October 2026' }), again: true }, 'the day, the month in words and the year, as the rows\' dates: no time of day');
  HOST.dismiss();
  assert.deepEqual(fake.unanswered, []);
});

test('a chain longer than the view\'s cap is listed to its end — ten members — its head marked only once the board answers that no eleventh follows; "try again" asks the eleventh alone (issue #184)', async () => {
  await VERSIONS.open(Y, HELD.pos, null);
  const ten = Array.from({ length: 10 }, (_, i) => [i + 1, 'whole']);
  assert.deepEqual([rows(), marked(), caption(), REC.doc(Y).members], [ten, [], Y, null], 'its eleventh not answered: ten members, no mark, no count');
  assert.deepEqual(openEnd(), { id: 'L.versions.cut', words: t('L.versions.cut', { k: 10 }), asOf: null, again: true });
  beyond = false;
  const from = fake.asked.length;
  await again();
  assert.deepEqual(askedSince(from), [key(F.docMetadata(y(11)))], 'the eleventh asked, and nothing else');
  assert.deepEqual([rows(), marked(), caption(), openEnd(), REC.doc(Y).members, REC.doc(Y).ended], [ten, [10], `${Y} · ${t('F.version-of', { k: 10, n: 10 })}`, null, 10, true]);
  HOST.dismiss();
  assert.deepEqual(fake.unanswered, []);
});

test('a list where the board answered nothing says no version could be read, offering "try again" — never a chain of none, nothing recorded (issue #184: "the board did not answer — no version could be read")', async () => {
  await VERSIONS.open(Z, null, null);
  assert.deepEqual([rows(), caption(), marked(), REC.doc(Z).members], [[], Z, [], null]);
  assert.deepEqual(openEnd(), { id: 'L.versions.cut.none', words: t('L.versions.cut.none'), asOf: null, again: true });
  HOST.dismiss();
  assert.deepEqual(fake.unanswered, []);
});

/** an act run to its end, its flight stepped to its last frame */
async function run(/** @type {Promise<unknown>} */ act) {
  let done = false;
  void act.then(() => { done = true; });
  for (let i = 0; i < 200 && !done; i++) { await new Promise((r) => setTimeout(r, 0)); if (CAM.flying()) CAM.step(Infinity); }
  assert.ok(done, 'the act ran to its end');
}

/** an act's list read to its end: the host's opening pending no more */
async function opened() {
  for (let i = 0; i < 200 && HOST.pending(); i++) await new Promise((r) => setTimeout(r, 0));
  assert.equal(HOST.pending(), false, 'the list\'s reads answered');
}
/** the list standing read again at a version, as the re-check after a version move shows it (N-GO's `surfacesAcross`) */
async function listedAt(/** @type {string} */ addr) {
  const about = () => /** @type {VERSIONS.About | undefined} */ (HOST.currentState()?.about);
  for (let i = 0; i < 200 && (about()?.addr !== addr || HOST.pending()); i++) await new Promise((r) => setTimeout(r, 0));
  assert.equal(about()?.addr, addr, 'the list stands read again at ' + addr);
}

test('opened by the corner\'s act at its version statement, the list stands at it, the document\'s box beside it — its top-left, the side the corner stands on — where it stands once the corner is rewritten or taken down', async () => {
  /** the statement in the corner's element, out of the page once the corner is rewritten */
  const statement = { isConnected: false };
  /** the corner's element: its document named, its version statement in it */
  const corner = { dataset: { corner: T }, querySelector: (/** @type {string} */ s) => (s === '.version' ? statement : null) };
  assert.equal(VERSIONS.fromCorner(/** @type {any} */ (corner), { addr: T, ...HELD }), true, 'the corner has the act');
  await opened();
  const b = docBox(T);
  assert.deepEqual([HOST.currentState()?.id, HOST.currentState()?.anchor], ['versions:' + T, { el: statement, world: { x: b.x, y: b.y } }]);
  HOST.dismiss();
  assert.deepEqual(fake.unanswered, []);
});
