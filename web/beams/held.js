// BM-HELD — WHAT A TEXT HOLDS OF A PASSAGE, and the words that say it
// (issue #153's design decision: "Mark what's held and say the rest in a
// line"; issue #158's: each run labelled). Layer 2, beside BM in
// `web/beams/`. PURE: no DOM and no state of its own; a far end's state read
// from what M-REC holds.
// A carried or a followed passage lands in one of four states, read here
// from the stretches of the landing's text that hold it, each named by where
// its stretch of the passage lies in the passage (`heldOf`): ALL, one
// stretch holding every position of it — the outline alone says it; PIECES,
// the stretches together holding every position, none of them all of it;
// PART, the stretches together holding less; NONE, no stretch — the dead
// end's face says it (foundations §2.3). A passage named by identity — a
// followed far end, its slot's stored span — is read through the identity of
// the bytes of each run its text holds it in (`piecesOf`), each run cut where
// its bytes break the passage's order into the stretches an arrival
// outlines (`stretchesOf`). Where no answer
// tells — a read the board refused for any reason but its size, which is
// asked again in parts first (M-PUMP's `compareParts`, `imageParts`), or one
// still refused past SPLIT_READS parts — the state is COULDN'T TELL, its
// reason keyed on the refusal's name and kind, never its token (`whyOf`),
// "try again" offered only where a retry can change the answer (`retries`).
// THE RUNS' LABELS (FP-21: "in several runs, each run labelled"; issue
// #158's design decision), where two stretches of the text or more hold the
// passage (`piecesIn`): stretches of different material are PIECES, each
// numbered in the passage's own order, "piece ⟨k⟩ of ⟨n⟩", and none numbered
// where every stretch holds the same; a stretch holding the material of one
// before it in the text says "again", and the first of such stretches "again
// later"; the run the landing stands at adds how much of the passage the
// runs hold — "all of the passage", or "only part of the passage" and, where
// the text shows withheld text, that the rest may be under it — and "in
// another order" where the text holds the pieces out of the passage's own
// (`labelOf`); labels that would stack merge into one naming the pieces they
// hold, "pieces 1–4 of 9" (`mergedLabel`). "Part" names an amount alone, and
// no label counts "places". A step takes the runs in the passage's order,
// each repeat after the first of its material, wrapping (`stepFrom`); the
// landing stands at the first (`Pieces.order`).
// THE LINE (`lineOf`), for part, pieces and couldn't tell, names the passage
// by what it was to the reader — "what you selected", "the text you were
// reading", a followed link's "its passage" — and the text by F.floating's
// two forms, "version ⟨k⟩" at a member, "⟨D⟩'s current text" at a bare
// address (`whereOf`); it never says "missing", "removed", "deleted" or
// "compare", and where the landing shows withheld text a part's line says
// the rest may be under it. A landing in one run says it so (N-GO's
// `landing`, O-LAND's line, N-WALK's description), counting no runs; a
// landing in several says its runs' labels in its place, the label of the
// run it stands at its line. Every surface that knows the
// state before departure says it, each by this one rule (the decision: "Where a read
// knows the state before departure — a drawn link's far end, the version
// list — say it there too"): a versions row (O-VERSIONS, through N-GO's
// `heldIn`), and a drawn link's far end (`farHolds`, `farSays`), read from
// the end LK draws and what M-REC holds of its far document — its
// projection, and the bytes of each run it names through that document's
// held image — which its stub, its symbol's title, its mirror item and its
// card say, the line counting the runs that hold it there (issue #242 holds
// those words).
// Rules: FP-1, FP-2, FP-21 (the one reading of what a landing's text holds).

import * as REC from '../model/records.js';
import { lostSession } from '../bridge/port.js';
import { floats } from '../links/links.js';
import { SIZE_REFUSALS } from '../model/frames.js';
import { memberOf } from '../model/address.js';
import { t } from '../strings.js';

/** @typedef {import('../model/records.js').ISpan} ISpan */
/** @typedef {import('../links/links.js').Shown} Shown */

/** @typedef {'all' | 'pieces' | 'part' | 'none'} Holds what a text holds of a passage: all of it in one stretch, all of it in several, part of it, none of it */

/** @typedef {{at: number, width: number}} Piece a stretch of the passage one stretch of the text holds: where it begins in the passage, counted from 0, and its positions */

/** @typedef {{pos: number, width: number, at: number}} Stretch a stretch of the text that holds one stretch of the passage, its bytes in the passage's own order: its first position in the text, its positions, and where its stretch of the passage begins in the passage, counted from 0 — the run an arrival outlines, labels and steps to */

/**
 * @typedef {Object} Labelled — one run of an arrival in several, as its label reads it (`piecesIn`)
 * @property {number} pos its first position in the text
 * @property {number} width its positions
 * @property {number} at where its stretch of the passage begins in the passage, counted from 0
 * @property {number | null} piece its material's number in the passage's own order; null where every run holds the same material
 * @property {'again' | 'again-later' | null} repeat `again` where a run before it in the text holds the same material, `again-later` where it is the first of such runs; null where no other run does
 */

/**
 * @typedef {Object} Pieces — an arrival in several runs, each labelled (see the head; FP-21)
 * @property {Labelled[]} runs in the text's order, two or more
 * @property {number} of the pieces: the runs' materials, each counted once
 * @property {number[]} order the runs, by index, in the order a step takes them: the passage's own order, each repeat after the first run of its material, runs of one material in the text's order
 * @property {boolean} whole the runs together hold every position of the passage
 * @property {boolean} reordered the text holds the pieces out of the passage's order: each material's first run, in the text's order
 * @property {boolean} withheld the runs hold only part of the passage and the text shows withheld text, under which the rest may stand
 */

/**
 * @typedef {Object} Held — what a text holds of a passage (`heldOf`)
 * @property {Holds} holds
 * @property {number} places the stretches of the text holding any of it
 */

/** @typedef {'selected' | 'reading' | 'followed'} Subject the passage as the reader had it: the selection, carried; the text they were reading, carried with nothing selected; a followed link's far end */

/** @typedef {{kind: string, name: string}} Met a refusal as its reason is read: its kind and its one name (O-FACES' key) */

/**
 * @typedef {Object} Said — what the line says (`lineOf`): a passage the text holds part of, or all of in pieces, or one no answer told of
 * @property {'part' | 'pieces' | 'unknown'} state
 * @property {number} places the stretches of the text holding it, for part and pieces
 * @property {Subject} subject
 * @property {string} addr the document whose text it is: a member, or a bare address
 * @property {boolean} withheld the text shows withheld text, and the line says the rest of a part may be under it
 * @property {string | null} why couldn't tell: the id of its reason's words (`whyOf`)
 * @property {boolean} again couldn't tell: a retry may tell (`retries`)
 */

/**
 * What a text holds of a passage, from the stretches of the passage its
 * stretches hold (see the head): all where one of them holds every position
 * of it, pieces where together they do, part where together they hold less,
 * none where there are none.
 * @param {Piece[]} pieces each stretch of the text's stretch of the passage, in any order
 * @param {number} width the passage's positions
 * @param {number} [places] the stretches of the text holding them, where one holds several pieces; else each piece one
 * @returns {Held}
 */
export function heldOf(pieces, width, places = pieces.length) {
  const w = Math.max(1, width);
  const held = pieces.filter((p) => p.width > 0 && p.at < w && p.at + p.width > 0);
  if (!held.length) return { holds: 'none', places: 0 };
  if (held.some((p) => p.at <= 0 && p.at + p.width >= w)) return { holds: 'all', places };
  let at = 0;
  for (const p of [...held].sort((x, y) => x.at - y.at)) { if (p.at > at) break; at = Math.max(at, p.at + p.width); }
  return { holds: at >= w ? 'pieces' : 'part', places };
}

/**
 * The pieces of a passage named by identity that runs of a text hold (see
 * the head): each run's bytes, by identity in the text's order, cut to the
 * passage's own, one piece where they meet it — bytes that follow on in the
 * text and in the passage both extending the piece before them — and the
 * runs holding any of it, its places. A run whose bytes are not named counts
 * as none.
 * @param {ISpan} passage
 * @param {ISpan[][]} runs each run of the text, its bytes by identity in the text's order
 * @returns {{pieces: Piece[], places: number}}
 */
export function piecesOf(passage, runs) {
  /** @type {Piece[]} */
  const pieces = [];
  let places = 0;
  for (const ids of runs) {
    let holds = false;
    /** @type {{piece: Piece, end: number} | null} the last piece, where its bytes reached the end of their own run of the image, and the permanent ordinal they end at */
    let last = null;
    for (const s of ids) {
      const lo = Math.max(s.ordinal, passage.ordinal), hi = Math.min(s.ordinal + s.width, passage.ordinal + passage.width);
      if (s.prefix !== passage.prefix || lo >= hi) { last = null; continue; }
      holds = true;
      /** @type {Piece | null} the piece these bytes follow on from */
      const on = last && lo === s.ordinal && last.end === lo ? last.piece : null;
      if (on) on.width += hi - lo;
      /** @type {Piece} */
      const piece = on || { at: lo - passage.ordinal, width: hi - lo };
      if (!on) pieces.push(piece);
      last = hi === s.ordinal + s.width ? { piece, end: hi } : null;
    }
    if (holds) places++;
  }
  return { pieces, places };
}

/**
 * The stretches of a text that hold a passage named by identity (see the
 * head): each run's bytes, by identity in the text's order, cut to the
 * passage's own and cut again wherever they break the passage's order —
 * bytes that follow on in the text and in the passage both one stretch —
 * each at its own positions in the text. Bytes of another I-space, or past
 * the passage, hold none of it.
 * @param {ISpan} passage
 * @param {Array<{pos: number, width: number}>} runs the runs of the text, in its order
 * @param {ISpan[][]} ids each run's bytes by identity, in the text's order, as many positions as the run
 * @returns {Stretch[]} in the text's order
 */
export function stretchesOf(passage, runs, ids) {
  /** @type {Stretch[]} */
  const out = [];
  runs.forEach((r, k) => {
    let p = r.pos;
    for (const s of ids[k] || []) {
      const lo = Math.max(s.ordinal, passage.ordinal), hi = Math.min(s.ordinal + s.width, passage.ordinal + passage.width);
      if (s.prefix === passage.prefix && lo < hi) {
        const pos = p + (lo - s.ordinal), at = lo - passage.ordinal, last = out[out.length - 1];
        if (last && last.pos + last.width === pos && last.at + last.width === at) last.width += hi - lo;
        else out.push({ pos, width: hi - lo, at });
      }
      p += s.width;
    }
  });
  return out.sort((a, b) => a.pos - b.pos);
}

/** a stretch's material: its stretch of the passage */
const materialOf = (/** @type {Piece} */ s) => `${s.at} ${s.width}`;

/**
 * An arrival's runs labelled (see the head): each stretch of the text that
 * holds the passage a run, in the text's order; their materials — each
 * stretch of the passage they hold, counted once — numbered in the passage's
 * own order, its first position first, a shorter before a longer from one
 * position, and none numbered where they hold one material alone; a run
 * holding the material of one before it in the text a repeat, the first of
 * such runs "again later"; and the step's order, the landing at its first.
 * Null where fewer than two stretches hold any of it: the outline alone, or
 * the landing's line, says it.
 * @param {Stretch[]} stretches
 * @param {number} width the passage's positions
 * @param {boolean} [withheld] the text shows withheld text
 * @returns {Pieces | null}
 */
export function piecesIn(stretches, width, withheld = false) {
  const runs = stretches.filter((s) => s.width > 0).sort((a, b) => a.pos - b.pos);
  if (runs.length < 2) return null;
  const kinds = [...new Map(runs.map((s) => [materialOf(s), s])).values()].sort((a, b) => a.at - b.at || a.width - b.width);
  /** @type {Map<string, number>} each material's number, in the passage's own order */
  const num = new Map(kinds.map((s, i) => [materialOf(s), i + 1]));
  /** @type {Map<string, number>} each material's first run, by its index in the text's order */
  const first = new Map();
  /** @type {Map<string, number>} the runs holding each material */
  const count = new Map();
  runs.forEach((s, i) => { const k = materialOf(s); if (!first.has(k)) first.set(k, i); count.set(k, (count.get(k) || 0) + 1); });
  const numOf = (/** @type {Stretch} */ s) => /** @type {number} */ (num.get(materialOf(s)));
  /** @type {Labelled[]} */
  const labelled = runs.map((s, i) => {
    const k = materialOf(s), again = (count.get(k) || 0) > 1;
    return { pos: s.pos, width: s.width, at: s.at, piece: kinds.length > 1 ? numOf(s) : null, repeat: !again ? null : first.get(k) === i ? 'again-later' : 'again' };
  });
  const order = runs.map((_, i) => i).sort((x, y) => numOf(runs[x]) - numOf(runs[y]) || x - y);
  const firsts = [...first.values()].sort((a, b) => a - b).map((i) => numOf(runs[i]));
  const held = heldOf(runs.map((s) => ({ at: s.at, width: s.width })), width);
  const whole = held.holds === 'all' || held.holds === 'pieces';
  return { runs: labelled, of: kinds.length, order, whole, reordered: firsts.some((n, i) => i > 0 && n < firsts[i - 1]), withheld: !whole && withheld };
}

/** what the run the landing stands at adds (see the head): how much of the passage the runs hold, and whether the text holds the pieces out of the passage's order */
function amountOf(/** @type {Pieces} */ p) {
  const amount = p.whole ? t('L.piece.all') : t('L.piece.part') + (p.withheld ? t('L.held.withheld') : '');
  return p.reordered ? [amount, t('L.piece.order')] : [amount];
}

/**
 * A run's label in words (see the head): its piece — "piece ⟨k⟩ of ⟨n⟩" —
 * where the runs hold two materials or more; "again" where a run before it
 * holds its material, "again later" where it is the first of such runs; and,
 * at the run the landing stands at, how much of the passage the runs hold and
 * "in another order" where the text holds the pieces out of the passage's.
 * @param {Pieces} p
 * @param {number} i the run, an index into `p.runs`
 * @param {boolean} [current] the landing stands at it
 * @returns {string}
 */
export function labelOf(p, i, current = false) {
  const r = p.runs[i];
  if (!r) return '';
  /** @type {string[]} */
  const words = [];
  if (r.piece != null) words.push(t('L.piece', { k: r.piece, n: p.of }));
  if (r.repeat) words.push(t(r.repeat === 'again' ? 'L.piece.again' : 'L.piece.again-later'));
  if (current) words.push(...amountOf(p));
  return words.join(' · ');
}

/** numbers in order as their ranges — consecutive ones `a–b` — joined: "1–3, 5" */
function rangesOf(/** @type {number[]} */ ns) {
  /** @type {string[]} */
  const out = [];
  for (let i = 0; i < ns.length; i++) {
    let j = i;
    while (j + 1 < ns.length && ns[j + 1] === ns[j] + 1) j++;
    out.push(j > i ? `${ns[i]}–${ns[j]}` : String(ns[i]));
    i = j;
  }
  return out.join(', ');
}

/**
 * The label standing for runs whose labels would stack (issue #158's design
 * decision: "Labels that would stack merge into one"): the pieces they hold —
 * "pieces 1–4 of 9", consecutive numbers a range — then "again" where any of
 * them holds the material of a run before it, else "again later" where one is
 * the first of such runs; where the landing stands at one of them, how much of
 * the passage the runs hold after. One run's own label where they are one.
 * @param {Pieces} p
 * @param {number[]} members the runs, by index into `p.runs`
 * @param {number} [current] the run the landing stands at; -1 where none of them is
 * @returns {string}
 */
export function mergedLabel(p, members, current = -1) {
  if (members.length === 1) return labelOf(p, members[0], members[0] === current);
  const runs = members.map((i) => p.runs[i]).filter(Boolean);
  const nums = [...new Set(runs.flatMap((r) => (r.piece != null ? [r.piece] : [])))].sort((a, b) => a - b);
  /** @type {string[]} */
  const words = [];
  if (nums.length > 1) words.push(t('L.pieces', { list: rangesOf(nums), n: p.of }));
  else if (nums.length === 1) words.push(t('L.piece', { k: nums[0], n: p.of }));
  if (runs.some((r) => r.repeat === 'again')) words.push(t('L.piece.again'));
  else if (runs.some((r) => r.repeat === 'again-later')) words.push(t('L.piece.again-later'));
  if (members.includes(current)) words.push(...amountOf(p));
  return words.join(' · ');
}

/**
 * The run a step takes the landing to from run `i` (FP-21: "Stepping the
 * pieces follows find's concept, in passage order, wrapping"): the next in
 * the step's order, or the one before it, round to the first from the last
 * and to the last from the first.
 * @param {Pieces} p
 * @param {number} i the run the landing stands at, an index into `p.runs`
 * @param {1 | -1} dir
 * @returns {number}
 */
export function stepFrom(p, i, dir) {
  const n = p.order.length, k = p.order.indexOf(i);
  if (k < 0) return p.order[dir > 0 ? 0 : n - 1];
  return p.order[(((k + dir) % n) + n) % n];
}

/** the board's names for a read it could not take now and takes asked again: its admission, its scan permits, its history reader */
const BUSY = new Set(['busy', 'scan_busy', 'history_busy']);

/**
 * Why no answer told what a text holds of a passage (see the head): the id
 * of the words keyed on the refusal met — the board out, the board busy, a
 * read still too large in parts, the passage's range no longer where it was,
 * a text withheld from the reader, no such link — every other refusal the
 * board's silence; where none was met, or a session the shell no longer held
 * was (B-PORT's `lostSession` — a read M-PUMP asks again under the session it
 * gets back, never the person's sign-out), the text that could not be read.
 * @param {Met | null} r
 * @returns {string}
 */
export function whyOf(r) {
  if (!r || lostSession(r)) return 'L.held.why.unread';
  if (r.kind === 'unreachable') return 'F.daemon.unreachable';
  if (BUSY.has(r.name)) return 'L.held.why.busy';
  if (SIZE_REFUSALS.includes(r.name)) return 'L.held.why.size';
  if (r.name === 'range_not_present') return 'B1.range_not_present';
  if (r.name === 'withheld') return 'L.held.why.withheld';
  if (r.name === 'not_a_link') return 'B1.not_a_link';
  return 'L.held.why.other';
}

/**
 * Can a retry change the answer (the decision's "'try again' where that
 * helps")? The board out, the session lost, the board busy, the text that
 * could not be read: each read again may answer. Every budget and verdict of
 * the board's is permanent (wire.md §Errors: "no retry shrinks the request").
 * @param {Met | null} r
 * @returns {boolean}
 */
export const retries = (r) => !r || r.kind === 'unreachable' || lostSession(r) || BUSY.has(r.name);

/** the text a line names (see the head): "version ⟨k⟩" at a member, "⟨D⟩'s current text" at a bare address */
export const whereOf = (/** @type {string} */ addr) => { const k = memberOf(addr); return k != null ? t('L.held.member', { k }) : t('L.held.current', { D: addr }); };

/** each subject's words */
const SUBJECTS = { selected: 'L.held.selected', reading: 'L.held.reading', followed: 'L.held.followed' };

/**
 * What the line says of what a text holds (see the head): part, the rest
 * possibly under the withheld text it shows, or pieces; null for all, which
 * the outline alone says, and for none, which the dead end's face says.
 * @param {Held} held
 * @param {Subject} subject
 * @param {string} addr the document whose text it is
 * @param {boolean} [withheld] the text shows withheld text
 * @returns {Said | null}
 */
export function saidOf(held, subject, addr, withheld = false) {
  if (held.holds !== 'part' && held.holds !== 'pieces') return null;
  return { state: held.holds, places: held.places, subject, addr, withheld: held.holds === 'part' && withheld, why: null, again: false };
}

/**
 * The line where no answer told (see the head): couldn't tell, by the
 * refusal met, and whether a retry may tell.
 * @param {Met | null} r the refusal met; null where the text could not be read and none was
 * @param {Subject} subject
 * @param {string} addr the document whose text it is
 * @returns {Said}
 */
export function unknownOf(r, subject, addr) {
  return { state: 'unknown', places: 0, subject, addr, withheld: false, why: whyOf(r), again: retries(r) };
}

/**
 * The line's words (see the head): a part, "only part of ⟨subject⟩ is in
 * ⟨where⟩", with the places it stands in where they are two or more and the
 * line counts them, and, where the text shows withheld text, that the rest
 * may be under it; pieces, "all of ⟨subject⟩ is in ⟨where⟩" and its places
 * where the line counts them; couldn't tell, "couldn't tell whether ⟨where⟩
 * holds ⟨subject⟩: ⟨reason⟩".
 * @param {Said} s
 * @param {boolean} [counts] the line counts the runs holding the passage — a drawn link's far end's, before departure; a landing's never, its outline showing them (FP-21: "nothing counts 'places'")
 * @returns {string}
 */
export function lineOf(s, counts = true) {
  const subject = t(SUBJECTS[s.subject]), where = whereOf(s.addr);
  if (s.state === 'unknown') return t('L.held.unknown', { subject, where, reason: t(s.why || 'L.held.why.other') });
  const places = counts && s.places > 1 ? t('L.held.places', { n: s.places }) : '';
  if (s.state === 'pieces') return t('L.held.pieces', { subject, where }) + places;
  return t('L.held.part', { subject, where }) + places + (s.withheld ? t('L.held.withheld') : '');
}

/**
 * What a drawn link's far end's text holds of its passage, before departure
 * (see the head), by the rule its landing reads — the text of the version its
 * far box shows (LK's `farAt`; issue #154's design decision): its projection
 * (LK's `farRuns`, M-REC's held answer), each run's bytes read by identity
 * through that version's held image (M-REC's `identityOf`) against the span
 * the slot stores (`farEnd`) — and where that image does not cover every
 * run, a projection of fewer positions than the passage still proves part,
 * and nothing more is said; a projection the board refused by a name that
 * says nothing of the document, couldn't tell, by that name — save a refusal
 * for its size, which the follow asks again in parts. Null where the text
 * holds all of it in one piece, where it floats (LK's `floats`, the dead
 * end's words), and where nothing tells.
 * @param {Shown} s
 * @returns {Said | null}
 */
export function farHolds(s) {
  const at = s.farAt;
  if (!s.farEnd || s.farWhole || s.farEnd.ordinal == null || !at) return null;
  const p = REC.projection(s.link.addr, s.farSlot, at);
  if (p && typeof p === 'object' && !Array.isArray(p)) return SIZE_REFUSALS.includes(p.refused) ? null : unknownOf({ kind: 'refused', name: p.refused }, 'followed', at);
  const passage = REC.identityOfEnd(s.farEnd);
  if (!Array.isArray(p) || !p.length || !passage) return null;
  const d = REC.has(at) ? REC.doc(at) : null, withheld = !!d && d.blocks.some((b) => b.kind === 'withheld');
  const ids = p.map((r) => REC.identityOf(at, r.pos, r.width));
  if (ids.every((x) => x.length)) { const { pieces, places } = piecesOf(passage, ids); return saidOf(heldOf(pieces, passage.width, places), 'followed', at, withheld); }
  return p.reduce((n, r) => n + r.width, 0) < passage.width ? saidOf({ holds: 'part', places: p.length }, 'followed', at, withheld) : null;
}

/**
 * The dead end's words for a text that holds none of a passage (foundations
 * §2.3): "its passage is not in ⟨D⟩'s current text" at a plain address, and
 * "its passage is not in version ⟨k⟩" at a version member — the words of
 * O-FACES' floating face.
 * @param {string} addr the text's document: a plain address, or a version member
 * @returns {string}
 */
export const floatingOf = (addr) => { const k = memberOf(addr); return k != null ? t('F.floating.member', { k }) : t('F.floating', { D: addr }); };

/**
 * A drawn link's far end's state in words, before departure — what its stub,
 * its symbol's title, its mirror item and its card say: the dead end's words
 * where it floats in the version its far box shows (LK's `floats`,
 * `floatingOf`), the line where that text holds part of it, all of it in
 * pieces, or nothing told (`farHolds`); '' where it holds all of it in one
 * piece or nothing is known.
 * @param {Shown} s
 * @returns {string}
 */
export function farSays(s) {
  if (floats(s)) return floatingOf(s.farAt || s.far);
  const said = farHolds(s);
  return said ? lineOf(said) : '';
}
