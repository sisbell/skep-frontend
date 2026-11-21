// M-PAST's tests: a draft's change feed rows made into the list of its past
// states — one row per minute and hand, newest first, a landmark a row of its
// own, each row's hand and kind read off the row as the wire spells it — and
// the list's days, what folds and what stands open, and what arriving rows do
// (B3-S7 THE LIST; skep-frontend #662); how long a row's state stood, to the
// position before the draft's next change (skep-frontend #688); whether a
// row's state is not its minute's last (skep-frontend #696); and the one-state
// step across the commits read, how long a commit's state stood, and where
// the floor's line falls (B3-S7; D5 K-102; skep-frontend #663).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { handOf, kindOf, landmarkOf, rowsOf, daysOf, openOnOpening, isFolded, entriesOf, arrive, versionOf, dayHolding, rowHolding, stoodUntil, notLastOf, stoodUntilAt, commitsOf, stepFrom, floorLine, isBelow, risen } from './past.js';

/** @typedef {import('../bridge/shapes').FeedUpdate} FeedUpdate */

/** the reader's day, by the UTC date, so the tests read the same in every time zone */
const day = (/** @type {number} */ ms) => new Date(ms).toISOString().slice(0, 10);
/** a minute, and an hour, in ms */
const MIN = 60 * 1000, HOUR = 60 * MIN;
/** noon of 16 November 2026, UTC, and the day before's, and two days before's */
const NOON = Date.UTC(2026, 10, 16, 12), DAY_1 = NOON - 24 * HOUR, DAY_2 = NOON - 48 * HOUR;
const D = '1.0.2.0.2', KEY = 'e4272902a11439e5'.padEnd(64, '0'), OTHER = 'b0e411d7'.padEnd(64, '1');

/** a feed row as the shell hands it (`FeedUpdate`): the wire's row with its position and class */
const row = (/** @type {number} */ at, /** @type {Partial<FeedUpdate>} */ o = {}) => /** @type {FeedUpdate} */ ({ position: at, at, op: 'insert', docs: [D], class: 'drafts', key: KEY, time: NOON, ...o });

// the wire's own examples (docs/wire.md §The change feed, `changes feed`, the signed row, `changes bare`), as the shell hands
// them: the draft 1.0.2.0.2's mint, its two-byte insert and its link, each from a bare session within one minute; a signed
// row; and two rows of lost testimony
const WIRE = [
  row(394, { op: 'create_new_document', key: 'bare', time: 1786838400021 }),
  row(397, { op: 'insert', key: 'bare', time: 1786838400033 }),
  row(400, { op: 'make_link', key: 'bare', time: 1786838400047, link: '1.0.2.0.2.0.2.1' }),
];
const SIGNED = /** @type {FeedUpdate} */ ({ position: 21, at: 21, attest: { alg: 'mldsa65-ed25519', sig: 'ab' }, docs: ['1.0.1.0.1'], link: '1.0.1.0.1.0.2.3', op: 'make_link', time: 1786838400052, class: 'published' });
const BARE = [3, 6].map((at) => /** @type {FeedUpdate} */ ({ position: at, at, base: null, base_extent: null, docs: null, key: null, link: null, merge: null, op: null, placed: null, time: null, class: 'published' }));

test('a row\'s hand is its testimony as the wire spells it: the writing key\'s fingerprint, "bare" a keyless hand, "system" the board\'s own, null lost — and where the row names no key, a signature\'s hand, never lost (the past states survey\'s R6)', () => {
  assert.deepEqual(handOf(row(1)), { kind: 'key', fingerprint: KEY }, 'a fingerprint');
  assert.deepEqual(WIRE.map(handOf), Array(3).fill({ kind: 'bare', fingerprint: null }), 'the wire\'s bare rows');
  assert.deepEqual(handOf(row(1, { key: 'system' })), { kind: 'system', fingerprint: null }, 'the board\'s own daemon');
  assert.deepEqual(BARE.map(handOf), Array(2).fill({ kind: 'lost', fingerprint: null }), 'lost testimony: not recorded');
  assert.deepEqual(handOf(SIGNED), { kind: 'signed', fingerprint: null }, 'a signed row, carrying no key: signed, never lost');
});

test('what a commit did is its op\'s word — typed, removed, quoted, pasted for an insert, a delete, a copy and a reinstate; rearranged, linked, unlinked and started for the ops the design gives no word; edits for an op the list knows no word for; unknown where the op is lost (B3-S7 WHAT)', () => {
  assert.deepEqual(['insert', 'delete', 'copy', 'reinstate'].map(kindOf), ['typed', 'removed', 'quoted', 'pasted']);
  assert.deepEqual(['rearrange', 'set_arrangement', 'make_link', 'edit_link', 'nullify', 'create_new_document'].map(kindOf), ['rearranged', 'rearranged', 'linked', 'linked', 'unlinked', 'started']);
  assert.deepEqual([kindOf('some_later_op'), kindOf(null)], ['edits', 'unknown']);
});

test('the list\'s rows: one row per minute and hand, newest first, each its commits\' positions, its last commit\'s time and the state it ends at — the wire\'s mint, insert and link of one bare hand in one minute one row, their kinds differing, "edits" (B3-S7: ONE ROW PER MINUTE AND HAND)', () => {
  assert.deepEqual(rowsOf(WIRE), [{ first: 394, last: 400, positions: [394, 397, 400], time: 1786838400047, hand: { kind: 'bare', fingerprint: null }, kind: 'edits', landmark: null }]);
  const typed = rowsOf([row(10), row(11), row(12)]);
  assert.deepEqual(typed.map((r) => [r.positions, r.kind]), [[[10, 11, 12], 'typed']], 'every commit of the minute typed: "typed" kept on the row');
  const rows = rowsOf([row(10), row(12, { time: NOON + 10 * 1000 }), row(14, { key: OTHER, time: NOON + 20 * 1000 }), row(16, { time: NOON + MIN }), row(18, { time: NOON + MIN + 1000, op: 'delete' })]);
  assert.deepEqual(rows.map((r) => [r.positions, r.hand.kind === 'key' && r.hand.fingerprint === OTHER ? 'other' : 'mine', r.kind]),
    [[[16, 18], 'mine', 'edits'], [[14], 'other', 'typed'], [[10, 12], 'mine', 'typed']], 'newest first: a change of hand breaks the minute\'s row, the next minute a row of its own');
  assert.deepEqual(rowsOf([row(5), row(5), row(4)]).map((r) => r.positions), [[4, 5]], 'a position named twice is taken once, in position order');
});

test('a landmark is a row of its own whatever minute it shares — a publication\'s, its member the first document its row names; a merge landed; the merge undone; the withdrawal, its base the landing\'s own — the minute\'s other states a row before it and a row after it; a `set_arrangement` naming neither base nor merge no landmark, rearranged (B3-S7; skep-frontend #662)', () => {
  const pub = row(12, { op: 'publish', docs: ['1.0.1.0.3.2', D], key: undefined, attest: { alg: 'mldsa65-ed25519', sig: 'cd' } });
  const rows = rowsOf([row(10), row(11), pub, row(13), row(14)]);
  assert.deepEqual(rows.map((r) => [r.positions, r.landmark ? r.landmark.kind : null]), [[[13, 14], null], [[12], 'version'], [[10, 11], null]], 'the publication between two rows of the same minute and hand');
  assert.deepEqual(versionOf(/** @type {any} */ (rows[1].landmark)), { k: 2, of: '1.0.1.0.3' }, 'version 2 of the edition it advances');
  const merge = { sides: ['1.0.1.0.40'], head: '1.0.1.0.3.2' };
  const set = (/** @type {number} */ at, /** @type {string | null} */ base, /** @type {object | null} */ m) => row(at, { op: 'set_arrangement', base, merge: /** @type {any} */ (m) });
  const marks = rowsOf([set(20, 'B', merge), set(21, 'B', null), set(22, 'B', merge), set(23, 'A', null), set(24, null, null)]);
  assert.deepEqual(marks.map((r) => [r.last, r.landmark ? r.landmark.kind : null, r.kind]),
    [[24, null, 'rearranged'], [23, 'merge-undone', 'rearranged'], [22, 'merged', 'rearranged'], [21, 'withdrawn', 'rearranged'], [20, 'merged', 'rearranged']],
    'a landing; the withdrawal, the landing\'s base unmoved; a landing again; the undo, the base before it; and one naming neither, which a restore writes too, no landmark');
  assert.deepEqual(landmarkOf(set(30, null, null), 'B'), null, 'base and merge both null: nothing tells a restore');
});

test('where the time is lost one hand\'s commits one after another are one row, standing in place by position; the wire\'s two rows of lost testimony one row, its kind unknown (B3-S7)', () => {
  assert.deepEqual(rowsOf(BARE), [{ first: 3, last: 6, positions: [3, 6], time: null, hand: { kind: 'lost', fingerprint: null }, kind: 'unknown', landmark: null }]);
  const rows = rowsOf([row(1, { time: DAY_1 }), row(3, { time: null, key: null, op: null }), row(4, { time: null, key: null, op: null }), row(6, { time: NOON })]);
  assert.deepEqual(rows.map((r) => [r.positions, r.time]), [[[6], NOON], [[3, 4], null], [[1], DAY_1]], 'the lost run in its place between the rows around it');
});

test('the days: the rows grouped by the reader\'s day, newest first, each named by its date; rows with no recorded time under a group of their own where they stand, keyed by their row (skep-frontend #662)', () => {
  const rows = rowsOf([row(1, { time: DAY_2 }), row(3, { time: DAY_1 }), row(4, { time: null, key: null, op: null }), row(6, { time: DAY_1 + HOUR }), row(8, { time: NOON }), row(9, { time: NOON + HOUR })]);
  const days = daysOf(rows, day);
  assert.deepEqual(days.map((d) => [d.key, d.rows.map((r) => r.last)]), [['d:2026-11-16', [9, 8]], ['d:2026-11-15', [6]], ['n:4', [4]], ['d:2026-11-15#2', [3]], ['d:2026-11-14', [1]]],
    'today, yesterday — cut where the rows with no time stand — those rows, yesterday again, the day before');
  assert.deepEqual([dayHolding(days, 3)?.key, rowHolding(rows, 8)?.last, dayHolding(days, 99)], ['d:2026-11-15#2', 8, null]);
});

test('open on opening: the newest day, the shown state\'s day, and the days after the newest while their rows fit the room; the rest fold — save a day of landmarks alone, which has no fold (skep-frontend #662)', () => {
  const pub = (/** @type {number} */ at, /** @type {number} */ time) => row(at, { op: 'publish', docs: ['1.0.1.0.3.' + at, D], key: undefined, attest: { alg: 'x', sig: 'y' }, time });
  const rows = rowsOf([pub(1, NOON - 96 * HOUR), row(2, { time: DAY_2 - 24 * HOUR }), row(3, { time: DAY_2 }), pub(4, DAY_2 + HOUR), row(5, { time: DAY_1 }), row(6, { time: DAY_1 + 2 * MIN }), row(7, { time: NOON })]);
  const days = daysOf(rows, day);
  assert.deepEqual(days.map((d) => [d.key, d.rows.length, d.landmarks]), [['d:2026-11-16', 1, false], ['d:2026-11-15', 2, false], ['d:2026-11-14', 2, false], ['d:2026-11-13', 1, false], ['d:2026-11-12', 1, true]]);
  assert.deepEqual([...openOnOpening(days, 7, 3)], ['d:2026-11-16', 'd:2026-11-15'], 'room for three rows: the newest day and the next, whose two rows fit; the day after them would not');
  assert.deepEqual([...openOnOpening(days, 2, 1)], ['d:2026-11-16', 'd:2026-11-13'], 'the shown state\'s day open whatever room is left');
  const open = openOnOpening(days, 7, 1);
  assert.deepEqual(days.map((d) => isFolded(d, open)), [false, true, true, true, false], 'the rest fold; the day of landmarks alone never folds');
});

test('the list as it stands: each day\'s head; at an open day each run of one hand led by that hand where it differs from the row above, across the days\' heads too; a folded day\'s head naming its hands once each where they differ from the row above them — no count, no time — then its landmarks alone (B3-S7 WHO; skep-frontend #662)', () => {
  const pub = row(5, { op: 'publish', docs: ['1.0.1.0.3.2', D], key: undefined, attest: { alg: 'x', sig: 'y' }, time: DAY_1 + 3 * MIN });
  const rows = rowsOf([row(1, { time: DAY_1 }), row(2, { time: DAY_1 + MIN, key: 'bare' }), row(3, { time: DAY_1 + 2 * MIN }), pub, row(8, { time: NOON }), row(9, { time: NOON + MIN, key: OTHER })]);
  const days = daysOf(rows, day);
  const shown = (/** @type {Set<string>} */ open) => entriesOf(days, open).map((e) => (e.kind === 'day' ? `day ${e.day.key}${e.folded ? ' folded ' + e.hands.map((h) => h.kind).join('+') : ''}` : e.kind === 'who' ? `who ${e.hand.kind === 'key' ? (e.hand.fingerprint === KEY ? 'mine' : 'other') : e.hand.kind}` : `row ${e.row.last}`));
  assert.deepEqual(shown(new Set(['d:2026-11-16', 'd:2026-11-15'])), ['day d:2026-11-16', 'who other', 'row 9', 'who mine', 'row 8', 'day d:2026-11-15', 'who signed', 'row 5', 'who mine', 'row 3', 'who bare', 'row 2', 'who mine', 'row 1'],
    'both open: a hand at each change of hand, the publication\'s signature a hand of its own');
  assert.deepEqual(shown(new Set(['d:2026-11-16'])), ['day d:2026-11-16', 'who other', 'row 9', 'who mine', 'row 8', 'day d:2026-11-15 folded signed+key+bare', 'row 5'],
    'yesterday folded: its head names each of its hands once, in their order — the signature, the key, the keyless hand — nor any count, then its publication alone');
  const going = daysOf(rowsOf([row(1, { time: DAY_1 }), row(2, { time: DAY_1 + 2 * MIN }), row(8, { time: NOON })]), day);
  const head = entriesOf(going, new Set(['d:2026-11-16']))[3];
  assert.deepEqual(head && head.kind === 'day' ? [head.folded, head.hands] : null, [true, []], 'a folded day all of whose rows go on with the hand of the row above it names no hand');
});

test('rows arriving once the list stands move nothing open and open no day: the days the reader left open stay so, a day the rows name anew stands folded, each position taken once (skep-frontend #662)', () => {
  const held = [row(8, { time: NOON }), row(9, { time: NOON + MIN })];
  const open = new Set(['d:2026-11-16']);
  const got = arrive(held, [row(1, { time: DAY_1 }), row(2, { time: DAY_1 + 2 * MIN }), row(8, { time: NOON })], open, day);
  assert.deepEqual([got.entries.length, got.days.map((d) => d.key), [...got.open]], [4, ['d:2026-11-16', 'd:2026-11-15'], ['d:2026-11-16']]);
  assert.deepEqual(got.days.map((d) => isFolded(d, got.open)), [false, true], 'yesterday arrived folded; today as it stood');
  assert.notEqual(got.open, open, 'the open days a set of their own, the reader\'s left as it was');
});

test('a row\'s state stood until the position before the draft\'s next change — the first of the row after it, less one — the newest row\'s until the head its rows were read up to, and the row\'s own last position where no head is known, the head stands at it, or the row is none of the rows (skep-frontend #688)', () => {
  const rows = rowsOf([row(30, { op: 'create_new_document' }), row(40, { time: NOON + 2 * MIN }), row(48, { time: NOON + 5 * MIN }), row(49, { time: NOON + 5 * MIN })]);
  assert.deepEqual(rows.map((r) => [r.first, r.last]), [[48, 49], [40, 40], [30, 30]], 'three rows, the newest of two commits');
  assert.deepEqual([stoodUntil(rows, rows[1], 60), stoodUntil(rows, rows[2], 60)], [47, 39], 'each to the position before the next row\'s first');
  assert.deepEqual([stoodUntil(rows, rows[0], 60), stoodUntil(rows, rows[0], null), stoodUntil(rows, rows[0], 49)], [60, 49, 49], 'the newest to the head, else its own last position');
  const adjacent = rowsOf([row(40), row(41, { time: NOON + 3 * MIN })]);
  assert.equal(stoodUntil(adjacent, adjacent[1], 60), 40, 'the next change right after it: its own last position');
  assert.equal(stoodUntil(rows, { first: 20, last: 20, positions: [20], time: null, hand: { kind: 'bare', fingerprint: null }, kind: 'typed', landmark: null }, 60), 20, 'a row none of the rows: its own last position');
});

test('a row\'s state is not its minute\'s last where a newer row of the list shares its recorded minute: the rows of that minute counted once a row of an earlier minute stands below every one of them, or the rows read reach their bottom, else not yet; never where its time is lost, where no newer row shares the minute, or where no row holds the position (skep-frontend #696)', () => {
  const mint = row(30, { op: 'create_new_document', key: 'bare' }), mine = row(40, { key: 'bare', time: NOON + 2 * MIN }), theirs = row(48, { key: OTHER, time: NOON + 2 * MIN + 40 * 1000 });
  const all = rowsOf([mint, mine, theirs]), part = rowsOf([mine, theirs]);
  assert.deepEqual(all.map((r) => r.positions), [[48], [40], [30]], 'another hand\'s change in the minute of the bare one: a row of its own');
  assert.deepEqual([notLastOf(all, 40, false), notLastOf(part, 40, false), notLastOf(part, 40, true)], [{ n: 2 }, { n: null }, { n: 2 }],
    'the minute holding a newer row: two rows counted once the mint\'s earlier minute stands below them; not yet with the rows below unread; counted at the bottom');
  assert.deepEqual([notLastOf(all, 48, false), notLastOf(all, 30, true)], [null, null], 'the newest of its minute, and a minute of one row: its minute\'s last');
  const landmark = rowsOf([mint, mine, row(44, { op: 'publish', docs: ['1.0.1.0.3.2', D], key: undefined, attest: { alg: 'mldsa65-ed25519', sig: 'cd' }, time: NOON + 2 * MIN + 10 * 1000 }), theirs]);
  assert.deepEqual([notLastOf(landmark, 40, false), notLastOf(landmark, 44, false)], [{ n: 3 }, { n: 3 }], 'a landmark of the minute a row of its own, counted with the rest');
  const lost = rowsOf([mint, row(40, { key: 'bare', time: null }), row(48, { key: OTHER, time: null })]);
  assert.deepEqual([notLastOf(lost, 40, true), notLastOf(all, 99, true)], [null, null], 'its time lost: never; no row holding the position: none');
  const gap = rowsOf([row(20, { key: 'bare', time: NOON + 2 * MIN }), row(30, { key: OTHER, time: null }), mine, theirs]);
  assert.deepEqual(notLastOf(gap, 40, false), { n: null }, 'below its minute\'s rows only one whose time is lost, and one of that minute below it: not yet');
});

/** a draft's rows across three minutes of one hand: its mint alone, then a minute of two commits — a burst inside the minute — then the newest change alone */
const STEPS = rowsOf([row(30, { time: NOON }), row(40, { time: NOON + 2 * MIN }), row(44, { time: NOON + 2 * MIN + 5000 }), row(48, { time: NOON + 5 * MIN })]);

test('one state back or forward is the commit before or after another across the rows read — a burst inside a minute reached by the step, its row the one shown — and none past the oldest commit read or the newest (B3-S7: "a burst inside the minute reached by the step"; D5 K-102)', () => {
  assert.deepEqual(STEPS.map((r) => r.positions), [[48], [40, 44], [30]], 'three rows, the middle one two commits');
  assert.deepEqual(commitsOf(STEPS), [48, 44, 40, 30], 'every commit, newest first, the list\'s order');
  assert.deepEqual([stepFrom(STEPS, 48, -1), stepFrom(STEPS, 44, -1), stepFrom(STEPS, 40, -1), stepFrom(STEPS, 30, -1)], [44, 40, 30, null], 'back: into the minute\'s row at its last commit, then its first, then the row below; none past the oldest');
  assert.deepEqual([stepFrom(STEPS, 30, 1), stepFrom(STEPS, 40, 1), stepFrom(STEPS, 44, 1), stepFrom(STEPS, 48, 1)], [40, 44, 48, null], 'forward alike; none past the newest');
  assert.equal(rowHolding(STEPS, 40)?.last, 44, 'a commit inside a row: that row the one marked shown');
  assert.equal(stepFrom(STEPS, 41, -1), null, 'none from a position no commit stands at');
});

test('a commit\'s state stood to the position before the draft\'s next commit — inside its row, its row\'s next commit less one; at its row\'s last, before the next row; the newest\'s to the head read — never its row\'s last state where it is not the row\'s last (issue #688\'s re-ask, at a commit; B3-S7)', () => {
  assert.deepEqual([stoodUntilAt(STEPS, 40, 60), stoodUntilAt(STEPS, 44, 60), stoodUntilAt(STEPS, 30, 60), stoodUntilAt(STEPS, 48, 60), stoodUntilAt(STEPS, 48, null)], [43, 47, 39, 60, 48]);
  assert.equal(stoodUntilAt(STEPS, 44, 60), stoodUntil(STEPS, STEPS[1], 60), 'a row\'s last commit: the row\'s own');
  assert.equal(stoodUntilAt(STEPS, 41, 60), 41, 'a position no commit stands at: its own');
});

test('the floor\'s line falls beneath the newest commit at or before the floor — the state that stood there, read at the floor — every row wholly older beneath it, that commit\'s row above it whole, no row spanning it; none where no commit read stands at or before the floor (skep-frontend #663\'s design decision)', () => {
  assert.deepEqual(floorLine(STEPS, 42), { cut: 40, below: 30 }, 'the floor inside the minute\'s row: steps stop at its first commit, the row above the line, the mint below');
  assert.deepEqual(floorLine(STEPS, 47), { cut: 44, below: 30 }, 'the floor past the row\'s last commit: that commit read there');
  assert.deepEqual(floorLine(STEPS, 48), { cut: 48, below: 44 }, 'at the newest commit: every older row below — no state before the newest readable');
  assert.deepEqual(floorLine(STEPS, 30), { cut: 30, below: null }, 'at the oldest commit read: no row read below');
  assert.equal(floorLine(STEPS, 20), null, 'below every commit read: no line among them');
  const line = floorLine(STEPS, 42);
  assert.deepEqual(STEPS.map((r) => isBelow(line, r)), [false, false, true], 'the rows above and below');
  assert.deepEqual(STEPS.map((r) => isBelow(null, r)), [false, false, false], 'no line, none below');
  assert.deepEqual([risen(null, 42), risen(42, 47), risen(47, 35), risen(47, 47)], [42, 47, 47, 47], 'the line only rises: a later refusal\'s lower floor leaves it where it stood');
});
