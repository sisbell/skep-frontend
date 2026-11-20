// M-PAST — one draft's history as its list of past states shows it (the
// structure record §3.2; B3-S7 THE LIST). Layer 1 (the
// model), pure: no state, no DOM, no read; SC draws what it answers.
// The rows (`rowsOf`): the draft's change feed rows (`changes` narrowed to
// the draft, wire.md §The change feed), each position once, newest first,
// ONE ROW PER MINUTE AND HAND — the commits one hand made one after another
// within one minute of their `time` (unix ms), a row's state its last commit's
// (`Row.last`) — where the time is lost, one hand's commits one after another
// one row, standing in place by position; a publication's row and every other
// landmark a row of its own whatever minute it shares. Who made a row is its
// hand (`handOf`): the writing key's fingerprint where the row is unsigned and
// names one, `bare` an unsigned hand, `lost` where the board lost the
// testimony (`key: null`), `signed` where the row carries a signature and so
// names no key — never lost — and `system` the board's own daemon. What a row
// did is its kind (`kindOf`, off each commit's `op`): the kind its commits
// share, else `edits`; `unknown` where the op is lost. A landmark
// (`landmarkOf`) is read off the row's own terms: a `publish` the version it
// made, off the member its `docs` names first; a `set_arrangement` with its
// `merge` a merge landed or put back, with none but a `base` the merge undone
// — or, where its base is the landing's own, unmoved, the withdrawal — and
// one naming neither no landmark, for nothing on the row tells a restore from
// a plain re-arrangement.
// The days (`daysOf`): the rows grouped by the reader's day, each day one
// group named by its date (U's `dayOf`, the reader's own time zone), newest
// first; rows with no recorded time standing in place under a group of their
// own. A day whose every row is a landmark never folds; nor does a landmark
// in a folded day: it stands as a row under its day's head
// (`entriesOf`). What stands open on opening (`openOnOpening`): the newest
// day, the shown state's day, and the days after the newest while their rows
// fit the room the column gives; the rest fold, and from then on only the
// reader folds or opens a day — rows that arrive later open none (`arrive`).
// A folded day's head names its hands once each where they differ from the
// row above them, and nothing else of it — no count, no time, no span. The
// list as it stands (`entriesOf`): each day's head, then — where it stands
// open — each run of one hand's rows led by that hand once, where it differs
// from the row above, and the rows; where it is folded, its landmarks alone,
// the hands its head names standing for theirs. How long a row's state stood
// (`stoodUntil`): to the position before the row after it, the newest row's
// to the head the rows were read up to.
// Rules: FP-1, FP-2, FP-6, FP-34.

import { dayOf } from '../util.js';
import { documentOf, memberOf } from './address.js';

/** @typedef {import('../bridge/shapes').FeedUpdate} FeedUpdate */

/**
 * @typedef {Object} Hand — who made a change, as its feed row testifies (wire.md §The change feed, `key` and `attest`)
 * @property {'key' | 'bare' | 'lost' | 'signed' | 'system'} kind `key` an unsigned row naming the writing key; `bare` a keyless hand under local trust; `lost` the board lost the testimony; `signed` the row carries a signature and so names no key; `system` the board's own daemon
 * @property {string | null} fingerprint the writing key's fingerprint, at `key`; null at every other kind
 */

/** @typedef {'typed' | 'removed' | 'quoted' | 'pasted' | 'rearranged' | 'linked' | 'unlinked' | 'started' | 'edits' | 'unknown'} Kind what a row's commits did (`kindOf`): the word each op takes, `edits` where they differ or an op takes none, `unknown` where the op is lost */

/**
 * @typedef {Object} Landmark — a change the list names for what it made, a row of its own that never folds (`landmarkOf`)
 * @property {'version' | 'merged' | 'merge-undone' | 'withdrawn'} kind a version published, a merge landed or put back, the merge undone, the withdrawal
 * @property {string | null} member the member a publication made; null on every other landmark
 * @property {string[]} sides a merge's sides as its row names them; none on every other landmark
 * @property {string | null} head a merge's head as its row names it; null on every other landmark
 */

/**
 * @typedef {Object} Row — one row of the list (`rowsOf`)
 * @property {number} first its first commit's position
 * @property {number} last its last commit's position: the state the row stands for
 * @property {number[]} positions every commit it holds, in position order
 * @property {number | null} time its last commit's time, unix ms; null where the board lost it
 * @property {Hand} hand
 * @property {Kind} kind
 * @property {Landmark | null} landmark
 */

/**
 * @typedef {Object} Day — one group of the list (`daysOf`): the rows of one day by the reader's clock, or rows with no recorded time standing in place
 * @property {string} key the group's key: `d:` and its date, a second group of one date keyed `d:⟨date⟩#⟨n⟩`; `n:` and its newest row's last position for rows with no recorded time
 * @property {number | null} time a time inside its day — its newest row's — whose date names it; null for rows with no recorded time
 * @property {Row[]} rows newest first
 * @property {boolean} landmarks every row a landmark: it never folds
 */

/**
 * @typedef {{kind: 'day', day: Day, folded: boolean, hands: Hand[]} | {kind: 'who', hand: Hand} | {kind: 'row', row: Row, day: Day}} Entry one line of the list as it stands (`entriesOf`): a day's head — folded or open, a folded one with the hands it names — a hand leading its run of rows, or a row
 */

/** a minute, in ms: the grain a row holds its commits at */
const MINUTE_MS = 60 * 1000;
/** a fingerprint as the feed spells one: 64 lowercase hex */
const FINGERPRINT = /^[0-9a-f]{64}$/;

/**
 * A feed row's hand (wire.md §The change feed): its `key` where the row names
 * one — a fingerprint, `bare`, `system`, or `null` for testimony the board
 * lost; where it names none, `signed`: the row carries a signature, or is a
 * row the feed served without its hand, and is never named lost (the past
 * states survey's R6).
 * @param {FeedUpdate} u
 * @returns {Hand}
 */
export function handOf(u) {
  if (u.key === null) return { kind: 'lost', fingerprint: null };
  if (u.key === undefined) return { kind: 'signed', fingerprint: null };
  if (u.key === 'bare') return { kind: 'bare', fingerprint: null };
  if (u.key === 'system') return { kind: 'system', fingerprint: null };
  return FINGERPRINT.test(u.key) ? { kind: 'key', fingerprint: u.key } : { kind: 'signed', fingerprint: null };
}

/** a hand's key: two hands are one where their keys are equal */
export const handKey = (/** @type {Hand} */ h) => (h.kind === 'key' ? 'key:' + h.fingerprint : h.kind);

/** each op the list names by a kind of its own (`kindOf`) */
const KINDS = /** @type {Record<string, Kind>} */ ({
  insert: 'typed', delete: 'removed', copy: 'quoted', reinstate: 'pasted', rearrange: 'rearranged', set_arrangement: 'rearranged',
  make_link: 'linked', edit_link: 'linked', emit: 'linked', assert_sup: 'linked', nullify: 'unlinked',
  create_new_document: 'started', fork: 'started', stage: 'started', version: 'started',
});

/**
 * What one commit did, by its feed row's `op` (B3-S7 WHAT): `typed`, `removed`,
 * `quoted`, `pasted` for an insert, a delete, a copy and a reinstate;
 * `rearranged` for a rearrange and a whole arrangement set; `linked` and
 * `unlinked` for a link's or a mark's write and a retraction; `started` for
 * the mint that made the draft; `edits` for an op the list has no word for;
 * `unknown` where the op is lost.
 * @param {string | null} op
 * @returns {Kind}
 */
export const kindOf = (op) => (op == null ? 'unknown' : KINDS[op] ?? 'edits');

/**
 * A feed row's landmark, read off its own terms (B3-S7; wire.md §The change
 * feed, `base` and `merge`): a `publish` the version it
 * made, its member the first document its `docs` names; a `set_arrangement`
 * naming a `merge` a merge landed — or put back — with its sides and its
 * head; one naming no merge but a `base` the merge undone, or the withdrawal
 * where that base is the latest landing's own (`landed`); null for every
 * other row, a `set_arrangement` naming neither among them, which a restore
 * and a plain re-arrangement both write.
 * @param {FeedUpdate} u
 * @param {string | null | undefined} landed the base the latest merge landing before the row recorded, where one stands before it
 * @returns {Landmark | null}
 */
export function landmarkOf(u, landed) {
  if (u.op === 'publish') return { kind: 'version', member: u.docs && u.docs.length ? u.docs[0] : null, sides: [], head: null };
  if (u.op !== 'set_arrangement') return null;
  if (u.merge) return { kind: 'merged', member: null, sides: [...u.merge.sides], head: u.merge.head };
  if (u.base != null) return { kind: landed !== undefined && landed === u.base ? 'withdrawn' : 'merge-undone', member: null, sides: [], head: null };
  return null;
}

/** a row's minute: its time's whole minutes; null where the time is lost */
const minuteOf = (/** @type {number | null | undefined} */ time) => (time == null ? null : Math.floor(time / MINUTE_MS));

/**
 * The list's rows (see the head): the draft's feed rows, each position once,
 * newest first, one row per minute and hand — one hand's commits one after
 * another in one minute, or, where the time is lost, one after another — a
 * landmark a row of its own; each row's hand, its kind, its landmark, its
 * time its last commit's.
 * @param {readonly FeedUpdate[]} entries the draft's rows, in any order, a position named twice taken once
 * @returns {Row[]}
 */
export function rowsOf(entries) {
  /** @type {Map<number, FeedUpdate>} */
  const at = new Map();
  for (const u of entries) if (!at.has(u.position)) at.set(u.position, u);
  const ordered = [...at.values()].sort((a, b) => a.position - b.position);
  /** @type {Row[]} */
  const rows = [];
  /** @type {string | null | undefined} the base the latest merge landing recorded, as the rows run */
  let landed;
  /** @type {{row: Row, minute: number | null, kinds: Set<Kind>} | null} */
  let open = null;
  for (const u of ordered) {
    const hand = handOf(u), mark = landmarkOf(u, landed), minute = minuteOf(u.time), kind = kindOf(u.op);
    if (u.op === 'set_arrangement' && u.merge && !('at' in u.merge)) landed = u.base;
    const joins = open && !mark && !open.row.landmark && handKey(open.row.hand) === handKey(hand) && open.minute === minute && (minute != null || open.row.time == null);
    if (open && joins) {
      open.row.positions.push(u.position);
      open.row.last = u.position;
      open.row.time = u.time ?? null;
      open.kinds.add(kind);
      open.row.kind = open.kinds.size === 1 ? kind : 'edits';
      continue;
    }
    /** @type {Row} */
    const row = { first: u.position, last: u.position, positions: [u.position], time: u.time ?? null, hand, kind, landmark: mark };
    rows.push(row);
    open = { row, minute, kinds: new Set([kind]) };
  }
  return rows.reverse();
}

/**
 * The list's days (see the head): the rows, newest first, grouped where one
 * row follows another of the same day by the reader's clock, rows with no
 * recorded time grouped where they stand; each group keyed so the key names
 * it again as rows arrive (`Day.key`).
 * @param {readonly Row[]} rows newest first (`rowsOf`)
 * @param {(ms: number) => string} [day] a time's day as the reader names it: U's `dayOf`, the reader's own time zone
 * @returns {Day[]}
 */
export function daysOf(rows, day = dayOf) {
  /** @type {Day[]} */
  const out = [];
  /** @type {Map<string, number>} how many groups each date has had */
  const seen = new Map();
  /** @type {string | null} */
  let last = null;
  for (const r of rows) {
    const date = r.time == null ? null : day(r.time), name = date == null ? null : 'd:' + date;
    const group = out[out.length - 1];
    if (group && last === (name ?? 'n')) { group.rows.push(r); group.landmarks = group.landmarks && !!r.landmark; continue; }
    const n = name ? (seen.get(name) ?? 0) + 1 : 0;
    if (name) seen.set(name, n);
    out.push({ key: name ? (n > 1 ? `${name}#${n}` : name) : 'n:' + r.last, time: r.time, rows: [r], landmarks: !!r.landmark });
    last = name ?? 'n';
  }
  return out;
}

/** the day a position's row stands in (`daysOf`); null where no row holds it */
export const dayHolding = (/** @type {readonly Day[]} */ days, /** @type {number} */ pos) => days.find((d) => d.rows.some((r) => r.positions.includes(pos))) ?? null;

/** the row holding a position (`rowsOf`); null where none does */
export const rowHolding = (/** @type {readonly Row[]} */ rows, /** @type {number} */ pos) => rows.find((r) => r.positions.includes(pos)) ?? null;

/**
 * The last position a row's state stood at (wire.md §Reading history): the
 * position before the draft's next change — the first position of the row
 * after it less one, every commit of the draft standing in a row of the
 * narrowed feed — else, for the newest row, the head the rows were read up
 * to; the row's own last position where the row is no row of `rows`, or the
 * newest where no head is known.
 * @param {readonly Row[]} rows newest first (`rowsOf`)
 * @param {Row} row
 * @param {number | null} head the position the rows were read up to (M-PUMP's `HistoryRead.head`)
 * @returns {number}
 */
export function stoodUntil(rows, row, head) {
  const i = rows.findIndex((r) => r.last === row.last);
  if (i > 0) return Math.max(row.last, rows[i - 1].first - 1);
  return i === 0 && head != null && head > row.last ? head : row.last;
}

/**
 * The days open on opening (FP-36): the newest day, the day of
 * the state shown, and the days after the newest, in the list's order, while
 * their rows together fit the room given; every other day folds, save a day
 * of landmarks alone, which never does.
 * @param {readonly Day[]} days newest first (`daysOf`)
 * @param {number | null} shown the position of the state the past pane shows; null where none
 * @param {number} room how many rows the column holds whole
 * @returns {Set<string>} the open days' keys
 */
export function openOnOpening(days, shown, room) {
  const open = new Set(), held = shown == null ? null : dayHolding(days, shown);
  if (days.length) open.add(days[0].key);
  if (held) open.add(held.key);
  let used = days.length ? days[0].rows.length : 0;
  for (const d of days.slice(1)) {
    if (used + d.rows.length > room) break;
    used += d.rows.length;
    open.add(d.key);
  }
  return open;
}

/** is a day folded as the list stands: not open, and not of landmarks alone, which never folds */
export const isFolded = (/** @type {Day} */ d, /** @type {ReadonlySet<string>} */ open) => !open.has(d.key) && !d.landmarks;

/**
 * The list as it stands (see the head), line by line: each day's head, folded
 * or open; at an open day each of its rows, each run of one hand led by that
 * hand where it differs from the row above it — the first row's always; at a
 * folded day its head naming the day's hands once each where they differ from
 * the row above them — the first run's left out where it goes on from the row
 * above the head — then its landmarks alone.
 * @param {readonly Day[]} days newest first (`daysOf`)
 * @param {ReadonlySet<string>} open the days the reader holds open (`openOnOpening`)
 * @returns {Entry[]}
 */
export function entriesOf(days, open) {
  /** @type {Entry[]} */
  const out = [];
  /** @type {string | null} the hand of the row standing above, as the list runs */
  let above = null;
  for (const day of days) {
    const folded = isFolded(day, open);
    if (folded) {
      /** @type {Hand[]} */
      const hands = [];
      const named = new Set();
      /** @type {string | null} the hand of the row above each, as the day's rows run */
      let prev = above;
      for (const r of day.rows) {
        const k = handKey(r.hand);
        if (k !== prev && !named.has(k)) { named.add(k); hands.push(r.hand); }
        prev = k;
      }
      out.push({ kind: 'day', day, folded, hands });
      for (const r of day.rows) if (r.landmark) out.push({ kind: 'row', row: r, day });
      above = prev;
      continue;
    }
    out.push({ kind: 'day', day, folded, hands: [] });
    for (const r of day.rows) {
      if (handKey(r.hand) !== above) out.push({ kind: 'who', hand: r.hand });
      out.push({ kind: 'row', row: r, day });
      above = handKey(r.hand);
    }
  }
  return out;
}

/**
 * Rows arrived after the list opened, which move no row in view and open no
 * day (FP-36): the rows made again from every row held
 * and the new ones, each position once (`rowsOf`), and their days
 * (`daysOf`); the open days as the reader left them, a day they name anew
 * standing folded — save one of landmarks alone, which never folds.
 * @param {readonly FeedUpdate[]} held the rows the list was made from
 * @param {readonly FeedUpdate[]} came the rows arrived
 * @param {ReadonlySet<string>} open the days the reader holds open
 * @param {(ms: number) => string} [day]
 * @returns {{entries: FeedUpdate[], rows: Row[], days: Day[], open: Set<string>}}
 */
export function arrive(held, came, open, day = dayOf) {
  const entries = [...held, ...came.filter((u) => !held.some((h) => h.position === u.position))];
  const rows = rowsOf(entries);
  return { entries, rows, days: daysOf(rows, day), open: new Set(open) };
}

/**
 * The version a publication's row names (B3-S7, "version ⟨k⟩ of ⟨E⟩"): the
 * member's number and the edition it advances, off the member's address;
 * null where the row names no member.
 * @param {Landmark} m
 * @returns {{k: number, of: string} | null}
 */
export function versionOf(m) {
  const k = m.member ? memberOf(m.member) : null, of = m.member ? documentOf(m.member) : null;
  return k != null && of ? { k, of } : null;
}
