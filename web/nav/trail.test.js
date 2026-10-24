// N-TRAIL's test: entries pushed by teleports, each departure re-taking the
// view, what it reads and where the walk stood on the entry it leaves; Back,
// Forward and a jump moving the cursor and dropping nothing, a push behind
// the cursor dropping the entries ahead; a claim standing where it was
// pushed, re-taken by every departure, settled with a place — its reading
// notice taken off, what its push dropped staying dropped — or with no view
// where the reader took the camera over, or with a notice, keeping its place
// and its number either way; the step a push writes on the entry it departs
// and a cursor move writes nowhere; a jump whose camera never left giving its
// entry back; the place of the cursor's entry re-taken and never a claim's;
// a change of the page's class dropping what each entry's view read; and a
// reset waking every move waiting on a claim (FP-22, FP-25, FP-29).
import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import * as T from './trail.js';

/** @typedef {import('./trail.js').Notice} Notice */
/** @typedef {import('./trail.js').Entry} Entry */

const v = (/** @type {number} */ n) => ({ x: n, y: n, scale: 1 });
const e = (/** @type {string} */ addr, /** @type {number} */ n) => ({ addr, pos: null, width: null, view: v(n), label: null, notice: null });
const addrs = () => T.all().map((x) => x.addr);
/** a departure at the view n, which reads no passage, the walk in no document read */
const at = (/** @type {number} */ n) => ({ view: v(n), reading: null, stood: null });
/** what the view n reads: the passage at its centre, its position n */
const readOf = (/** @type {number} */ n) => ({ addr: 'd', pos: n, ids: [{ prefix: 'd.0.1', ordinal: n, width: 1 }], p: { x: n, y: n }, line: { x: 0, y: n }, fs: 1 });
/** a departure at the view n, which reads the passage at n, the walk standing there */
const away = (/** @type {number} */ n) => ({ view: v(n), reading: readOf(n), stood: { addr: 'd', pos: n, ids: [{ prefix: 'd.0.1', ordinal: n, width: 1 }], end: null } });
/** what an entry keeps of the departure from it: its view's x, what that view reads, where the walk stood */
const kept = (/** @type {Entry} */ x) => [x.view.x, x.reading && x.reading.pos, x.stood && x.stood.pos];
/** @type {Notice} a jump's reading notice, as its claim holds it while its read is out */
const reading = { face: 'reading', addr: 'x', refusal: null, site: { span: { addr: 'x', pos: 1 }, sign: 'x' }, offer: false };
/** @type {Notice} what its read brought where it brought no place: the fifth cell */
const faced = { ...reading, face: 'unregistered' };

beforeEach(() => T._reset());

test('push, back, forward: the cursor moves and nothing is dropped', () => {
  T.push(e('a', 1), null); T.push(e('b', 2), at(10)); T.push(e('c', 3), at(20));
  assert.equal(T.all()[0].view.x, 10, 'the departed view re-taken on a');
  assert.equal(T.back(at(30))?.addr, 'b');
  assert.equal(T.all()[2].view.x, 30);
  assert.equal(T.back(null)?.addr, 'a');
  assert.equal(T.back(null), null);
  assert.equal(T.forward(null)?.addr, 'b');
  assert.equal(T.length(), 3);
});

test('numbered newest-first; a jump is a cursor move', () => {
  T.push(e('a', 1), null); T.push(e('b', 2), null); T.push(e('c', 3), null);
  assert.deepEqual(T.numbered().map((r) => [r.n, r.entry.addr]), [[1, 'c'], [2, 'b'], [3, 'a']]);
  assert.equal(T.jump(3, null)?.addr, 'a');
  assert.equal(T.length(), 3);
  assert.equal(T.cursorIndex(), 0);
});

test('a fresh teleport behind the cursor drops the entries ahead', () => {
  T.push(e('a', 1), null); T.push(e('b', 2), null); T.push(e('c', 3), null);
  T.back(null); T.back(null);
  T.push(e('d', 4), null);
  assert.deepEqual(addrs(), ['a', 'd']);
});

test('a claim stands where it was pushed — the place its camera left for — and is re-taken by every departure while it reads; settled with a place, it keeps its place and takes its landing, its reading notice taken off, what its push dropped staying dropped; settled with no view, it keeps the view it stands at (FP-25)', () => {
  T.push(e('a', 1), null); T.push(e('b', 2), null); T.push(e('c', 3), null);
  T.back(null);
  const claim = T.push({ ...e('x', 4), notice: reading }, at(20), true);
  assert.deepEqual(addrs(), ['a', 'b', 'x'], 'pushed as it is made, the entry ahead dropped');
  assert.equal(T.all()[1].view.x, 20, 'the entry departed re-taken');
  assert.equal(T.current(), claim, 'the entry as the trail holds it');
  assert.ok(T.pending(claim), 'a claim standing unanswered');
  assert.equal(claim.notice, reading, 'holding its reading notice while it reads');
  assert.equal(T.back(at(30))?.addr, 'b');
  assert.equal(claim.view.x, 30, 'a departure re-takes a claim\'s view: its camera left for it');
  T.forward(at(40));
  assert.equal(T.jump(2, at(50))?.addr, 'b');
  assert.equal(claim.view.x, 50);
  T.forward(at(60));
  T.push(e('y', 5), at(70));
  assert.equal(claim.view.x, 70, 'a push departing it re-takes it as any entry\'s');
  T.settle(claim, { view: v(9), pos: 7, width: 2 });
  assert.equal(T.pending(claim), null, 'answered');
  assert.deepEqual([claim.view.x, claim.pos, claim.width, claim.notice], [9, 7, 2, null], 'its landing, and no notice: the read brought a place');
  assert.deepEqual(addrs(), ['a', 'b', 'x', 'y'], 'in its place; c stays dropped');
  T.back(at(80)); T.back(at(90));
  assert.equal(claim.view.x, 90, 'settled, it is re-taken as any entry is');
  const taken = T.push({ ...e('z', 6), notice: reading }, at(100), true);
  T.settle(taken, { pos: 3, width: 1 });
  assert.deepEqual([taken.view.x, taken.pos, T.pending(taken)], [6, 3, null], 'settled with no view — the reader took the camera over there: the view it stands at kept, its place taken');
});

test('a claim answered with a notice keeps its place and its number, holding the notice where it stands — answered with the cursor on it, or after a Back left it while it read; nothing its push dropped comes back, and one Back from it returns to the entry it was made from either way', async () => {
  for (const left of [false, true]) {
    T._reset();
    T.push(e('a', 1), null); T.push(e('b', 2), null); T.push(e('c', 3), null);
    T.back(at(30));
    const claim = T.push({ ...e('x', 4), notice: reading }, at(20), true);
    const answered = T.pending(claim);
    if (left) assert.equal(T.back(at(40))?.addr, 'b', 'a Back while it reads: the cursor on the entry the jump was made from');
    T.settle(claim, { notice: faced });
    await answered;
    const was = left ? 'answered after a Back left it' : 'answered with the cursor on it';
    assert.deepEqual(addrs(), ['a', 'b', 'x'], `${was}: its place kept, and c, which its push dropped, stays dropped`);
    assert.deepEqual(T.numbered().map((r) => [r.n, r.entry.addr]), [[1, 'x'], [2, 'b'], [3, 'a']], `${was}: its number the one it took as it was pushed`);
    assert.deepEqual([claim.notice, claim.view.x, T.pending(claim)], [faced, left ? 40 : 4, null], `${was}: holding the notice where it stands — the view a Back left it at, else its own — answered`);
    assert.equal(T.cursorIndex(), left ? 1 : 2, `${was}: the cursor where the last move put it`);
    if (!left) assert.equal(T.back(at(50))?.addr, 'b', `${was}: one Back returns to the entry it was made from`);
    assert.equal(T.back(at(60))?.addr, 'a', `${was}: a second goes one entry further`);
    assert.equal(T.forward(at(70))?.addr, 'b');
    assert.equal(T.forward(at(80)), claim, `${was}: Forward returns to it`);
  }
});

test('a push writes the step it takes on the entry it departs — a claim\'s too, the place its camera left for — and the newest holds none; a push from behind the newest writes its own in the place of the one that entry held; a move that takes no step leaves none; a cursor move writes none (issue #152; FP-25)', () => {
  /** @type {import('./trail.js').Step} */
  const follow = { kind: 'follow', link: 'a.0.2.1', near: 'a', key: 'k', far: 'b', spans: [{ prefix: 'b.0.1', ordinal: 3, width: 4 }] };
  /** @type {import('./trail.js').Step} */
  const carry = { kind: 'carry', from: 'b', to: 'c', spans: [{ prefix: 'b.0.1', ordinal: 9, width: 2 }] };
  /** @type {import('./trail.js').Step} */
  const again = { ...carry, to: 'x' };
  const steps = () => T.all().map((x) => x.step);
  T.push(e('a', 1), null); T.push(e('b', 2), at(10), false, follow); T.push(e('c', 3), at(20), false, carry); T.push(e('d', 4), at(30));
  assert.deepEqual(steps(), [follow, carry, null, null], 'each entry the step that left it: a follow, a carry, a move that takes none; the newest none, nothing having left it');
  T.back(at(40)); T.back(at(50)); T.forward(at(60)); T.jump(4, at(70));
  assert.deepEqual(steps(), [follow, carry, null, null], 'a cursor move writes none');
  T.jump(3, at(80));
  T.push(e('x', 5), at(90), false, again);
  assert.deepEqual([addrs(), steps()], [['a', 'b', 'x'], [follow, again, null]], 'from behind the newest: b holds the step taken from it now, the entries ahead dropped');
  const claim = T.push(e('y', 6), at(100), true);
  T.push(e('z', 7), at(110), false, follow);
  assert.deepEqual([steps()[2], claim.step], [null, follow], 'x departed by a move that takes no step: none; the claim departed before its read answered: the follow taken from it');
});

test('a jump whose camera never left gives its entry back: its push undone — the entry gone, a move waiting on it woken, the cursor on the entry it was made from, that entry\'s step as the push found it, the entries the push dropped standing again; only the last push, while it is the newest entry (FP-25)', async () => {
  /** @type {import('./trail.js').Step} */
  const carry = { kind: 'carry', from: 'b', to: 'c', spans: [{ prefix: 'b.0.1', ordinal: 9, width: 2 }] };
  /** @type {import('./trail.js').Step} */
  const other = { ...carry, to: 'r' };
  T.push(e('a', 1), null); T.push(e('b', 2), at(10)); T.push(e('c', 3), at(20), false, carry);
  T.back(at(30));
  const r = T.push({ ...e('r', 4), notice: reading }, at(40), true, other);
  assert.deepEqual([addrs(), T.all()[1].step], [['a', 'b', 'r'], other], 'pushed: c dropped, b holding the step taken from it');
  const answered = T.pending(r);
  assert.equal(T.giveBack(r), true, 'given back');
  await answered;
  assert.deepEqual([addrs(), T.cursorIndex(), T.all()[1].step, T.pending(r)], [['a', 'b', 'c'], 1, carry, null], 'the push undone: c standing again, the cursor on b, b\'s step as the push found it, the move waiting on r woken');
  const s = T.push(e('s', 5), at(50));
  T.push(e('t', 6), at(60));
  assert.deepEqual([T.giveBack(s), addrs()], [false, ['a', 'b', 's', 't']], 'an entry no longer the newest, or no longer the last push\'s, is not given back');
});

test('a jump whose camera leaves only once its read placed it re-takes the view of the entry it was made from as it leaves (FP-25)', () => {
  T.push(e('a', 1), at(1));
  const r = T.push({ ...e('r', 2), notice: reading }, at(10), true);
  assert.equal(T.all()[0].view.x, 10, 're-taken as the push departed it');
  T.leaveFrom(r, at(20));
  assert.equal(T.all()[0].view.x, 20, 're-taken where the camera stood as it left');
});

test('the cursor\'s entry\'s place re-taken as it is departed — the version its box shows then — never a claim\'s (issue #154)', () => {
  T.push(e('d', 1), null);
  T.retakePlace('d.2');
  assert.deepEqual(addrs(), ['d.2'], 'the version its box shows');
  T.push({ ...e('f', 2), notice: reading }, at(1), true);
  T.retakePlace('f.3');
  assert.deepEqual(addrs(), ['d.2', 'f'], 'a claim keeps the place its jump named');
});

test('every departure re-takes what its view reads and where the walk stood beside the view — a push\'s, Back\'s, Forward\'s, a jump\'s and a jump\'s camera leaving; the entry pushed holds neither until one does (issue #221)', () => {
  T.push(e('a', 1), null);
  assert.deepEqual(kept(T.all()[0]), [1, null, null], 'pushed: its view alone');
  T.push(e('b', 2), away(10)); T.push(e('c', 3), away(20));
  assert.deepEqual(T.all().map(kept), [[10, 10, 10], [20, 20, 20], [3, null, null]], 'each push re-takes all three on the entry it leaves; the newest holds its view alone');
  T.back(away(30)); T.forward(away(40)); T.jump(3, away(50));
  assert.deepEqual(T.all().map(kept), [[10, 10, 10], [40, 40, 40], [50, 50, 50]], 'Back, Forward and a jump each re-take the entry they leave');
  const r = T.push({ ...e('r', 4), notice: reading }, away(60), true);
  T.leaveFrom(r, away(70));
  assert.deepEqual(kept(T.all()[0]), [70, 70, 70], 'a jump\'s camera leaving re-takes the entry it was made from');
  T.back(at(80));
  assert.deepEqual(kept(r), [80, null, null], 'a departure from a view that reads nothing: neither kept');
});

test('a landing that writes a view writes what that view reads and drops where the walk stood — the walk lands on the place the read placed; one that writes no view keeps all three (issue #221)', () => {
  T.push(e('a', 1), null);
  const claim = T.push({ ...e('x', 2), notice: reading }, at(10), true);
  T.back(away(20));
  assert.deepEqual(kept(claim), [20, 20, 20], 'departed while it reads');
  T.settle(claim, { pos: 5, width: 1 });
  assert.deepEqual(kept(claim), [20, 20, 20], 'settled with no view — the reader took the camera over there: the view, what it read and where the walk stood kept');
  T.settle(claim, { view: v(30), reading: readOf(30), pos: 7, width: 1 });
  assert.deepEqual(kept(claim), [30, 30, null], 'settled with a view: that view and what it reads, and no longer where the walk stood');
  T.settle(claim, { view: v(40), pos: 8, width: 1 });
  assert.deepEqual(kept(claim), [40, null, null], 'a view written with nothing it reads reads nothing');
});

test('a change of the page\'s class drops what each entry\'s view read and where the walk stood, keeping its view and its place (FP-29; issue #221)', () => {
  T.push(e('a', 1), null); T.push(e('b', 2), away(10)); T.back(away(20));
  T.classChanged();
  assert.deepEqual([addrs(), T.all().map(kept)], [['a', 'b'], [[10, null, null], [20, null, null]]]);
});

test('a reset wakes every move waiting on a claim', async () => {
  const claim = T.push(e('x', 1), null, true);
  const answered = T.pending(claim);
  T._reset();
  await answered;
  assert.equal(T.current(), null);
});
