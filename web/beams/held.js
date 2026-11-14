// BM-HELD — what a text holds of a passage, and the words that say it
// (FP-21). Layer 2, beside BM. PURE: no DOM and no state of its own; a far
// end's state is read from what M-REC holds.
// A carried or a followed passage lands in one of four states, read here
// from the stretches of the landing's text that hold it, each named by where
// its stretch of the passage lies in the passage (`heldOf`): all, one
// stretch holding every position of it — the outline alone says it; pieces,
// the stretches together holding every position, none of them all of it;
// part, the stretches together holding less; none, no stretch — the dead
// end's face says it (foundations §2.3). A passage named by identity — a
// followed far end, its slot's stored span, the passage a reading scene's
// stop stood for, the words a trail entry's view read, any of which may
// cross several runs of an image — is read through the identity of the
// bytes of each run its text holds it in (`piecesOf`), each run cut where
// its bytes break the passage's order into the stretches an arrival
// outlines (`stretchesOf`). Where no answer told — a read refused by any
// name but a size's, or still refused for its size once asked in parts
// (M-PUMP's `compareParts`, `imageParts`) — the state is couldn't tell, its
// reason keyed on the refusal's name and kind, never its token (`whyOf`),
// "try again" offered only where a retry can change the answer (`retries`).
// The runs' labels (FP-21), where two stretches of the text or more hold the
// passage (`piecesIn`): stretches of different material are pieces, each
// numbered in the passage's own order, and none numbered where every stretch
// holds the same; a stretch holding the material of one before it in the
// text says "again", and the first of such stretches "again later"; the run
// the landing stands at adds how much of the passage the runs hold — all of
// it, or only part and, where the text shows withheld text, that the rest
// may be in it — and that the text holds the pieces out of the passage's
// order where it does (`labelOf`); a label's parts are fields (ST's
// `fields`); labels that would stack merge into one naming the pieces they
// hold (`mergedLabel`). A step takes the runs in the passage's order, each
// repeat after the first of its material, wrapping (`stepFrom`); the landing
// stands at the first (`Pieces.order`).
// The line (`lineOf`), for part, pieces and couldn't tell, names the passage
// by what it was to the reader — the selection, the text they were reading,
// a followed link's passage, what a reading scene's stop the reader returned
// to stood for — and the text by F.floating's two forms, a
// member or a bare address's current text (`whereOf`); where the landing
// shows withheld text, a part's line says after its short form — the line's
// start (`shortLineOf`) — that the rest may be in text withheld from the
// reader. The line is
// sentences, each its capital and its end mark (ST's `sentences`; style S1,
// S2), wherever it is said; its short form is a field's words, no capital and
// no end mark, standing in a row. A landing in one run says its line (N-GO's
// `landing`); a landing in several says its runs' labels in its place, the
// label of the run it stands at its line. Every surface that knows the state
// before departure says it by this one rule (FP-21): a versions row
// (O-VERSIONS, through N-GO's `heldIn`), and a drawn link's far end
// (`farHolds`), read from the end LK draws and what M-REC holds of its far
// document — its projection, and the bytes of each run it names through that
// document's held image — its card and its mirror item saying the line whole
// (`farSays`), the dead end's words a sentence there too (`floatingLineOf`),
// its stub and its symbol its short form (`farShort`). A document a line
// names at its bare address — the line's current text, the dead end's words —
// is named by its label, the first line the board's index lists for it, cut
// on a word with an ellipsis (`labelIn`; foundations §2.1's label cap), and
// by its address where the index lists none (`nameIn`); every line naming a
// document so reads it here.
// Figures: a label inside a line holds LABEL_CH characters at the most,
// its ellipsis among them.
// Rules: FP-1, FP-2, FP-21, FP-22, FP-33.

import * as REC from '../model/records.js';
import { lostSession } from '../bridge/port.js';
import { floats } from '../links/links.js';
import { SIZE_REFUSALS } from '../model/frames.js';
import { memberOf } from '../model/address.js';
import { cutTo, LABEL_CH } from '../text/article.js';
import { t, sentence, sentences, fields } from '../strings.js';
import { numeral } from '../util.js';

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

/** @typedef {'selected' | 'reading' | 'followed' | 'stop'} Subject the passage as the reader had it: the selection, carried; the text they were reading, carried with nothing selected; a followed link's far end; what a reading scene's stop stood for as the reader left it (SC's) */

/** @typedef {{kind: string, name: string}} Met a refusal as its reason is read: its kind and its one name (O-FACES' key) */

/**
 * @typedef {Object} Said — what the line says (`lineOf`): a passage the text holds part of, or all of in pieces, or one no answer told of
 * @property {'part' | 'pieces' | 'unknown'} state
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
 * runs holding any of it, its places. A passage named by several spans is
 * one passage, each span after the one before it in the passage's order. A
 * run whose bytes are not named counts as none.
 * @param {ISpan | ISpan[]} passage
 * @param {ISpan[][]} runs each run of the text, its bytes by identity in the text's order
 * @returns {{pieces: Piece[], places: number}}
 */
export function piecesOf(passage, runs) {
  /** each span of the passage, with where it begins in the passage, counted from 0 */
  const spans = [];
  let o = 0;
  for (const p of Array.isArray(passage) ? passage : [passage]) { spans.push({ ...p, from: o }); o += p.width; }
  /** @type {Piece[]} */
  const pieces = [];
  let places = 0;
  for (const ids of runs) {
    let holds = false, text = 0;
    /** @type {{piece: Piece, text: number} | null} the last piece, and where in the run's text its bytes end */
    let last = null;
    for (const s of ids) {
      const hits = spans.flatMap((p) => {
        const lo = Math.max(s.ordinal, p.ordinal), hi = Math.min(s.ordinal + s.width, p.ordinal + p.width);
        return p.prefix === s.prefix && lo < hi ? [{ lo, hi, at: p.from + lo - p.ordinal }] : [];
      }).sort((x, y) => x.lo - y.lo);
      for (const h of hits) {
        holds = true;
        const at = text + h.lo - s.ordinal, width = h.hi - h.lo;
        /** @type {Piece | null} the piece these bytes follow on from */
        const on = last && last.text === at && last.piece.at + last.piece.width === h.at ? last.piece : null;
        if (on) on.width += width;
        /** @type {Piece} */
        const piece = on || { at: h.at, width };
        if (!on) pieces.push(piece);
        last = { piece, text: at + width };
      }
      text += s.width;
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
 * each at its own positions in the text. A passage named by several spans is
 * one passage, each span after the one before it in the passage's order.
 * Bytes of another I-space, or past the passage, hold none of it.
 * @param {ISpan | ISpan[]} passage
 * @param {Array<{pos: number, width: number}>} runs the runs of the text, in its order
 * @param {ISpan[][]} ids each run's bytes by identity, in the text's order, as many positions as the run
 * @returns {Stretch[]} in the text's order
 */
export function stretchesOf(passage, runs, ids) {
  /** @type {Array<ISpan & {from: number}>} each span of the passage, with where it begins in the passage, counted from 0 */
  const spans = [];
  let o = 0;
  for (const p of Array.isArray(passage) ? passage : [passage]) { spans.push({ ...p, from: o }); o += p.width; }
  /** @type {Stretch[]} */
  const out = [];
  runs.forEach((r, k) => {
    let p = r.pos;
    for (const s of ids[k] || []) {
      const hits = spans.flatMap((q) => {
        const lo = Math.max(s.ordinal, q.ordinal), hi = Math.min(s.ordinal + s.width, q.ordinal + q.width);
        return q.prefix === s.prefix && lo < hi ? [{ lo, hi, at: q.from + lo - q.ordinal }] : [];
      }).sort((x, y) => x.lo - y.lo);
      for (const h of hits) {
        const pos = p + (h.lo - s.ordinal), last = out[out.length - 1];
        if (last && last.pos + last.width === pos && last.at + last.width === h.at) last.width += h.hi - h.lo;
        else out.push({ pos, width: h.hi - h.lo, at: h.at });
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

/** what the run the landing stands at adds (see the head), each a field: how much of the passage the runs hold, where only part that the rest may be in the withheld text the text shows, and whether the text holds the pieces out of the passage's order; '' for each that does not hold */
function amountOf(/** @type {Pieces} */ p) {
  return [p.whole ? t('L.piece.all') : t('L.piece.part'), p.withheld ? t('L.held.withheld') : '', p.reordered ? t('L.piece.order') : ''];
}

/**
 * A run's label in words (see the head): its piece — "piece ⟨k⟩ of ⟨n⟩" —
 * where the runs hold two materials or more; "again" where a run before it
 * holds its material, "again later" where it is the first of such runs; and,
 * at the run the landing stands at, how much of the passage the runs hold and
 * "in another order" where the text holds the pieces out of the passage's —
 * each a field (ST's `fields`).
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
  if (r.piece != null) words.push(t('L.piece', { k: numeral(r.piece), n: numeral(p.of) }));
  if (r.repeat) words.push(t(r.repeat === 'again' ? 'L.piece.again' : 'L.piece.again-later'));
  if (current) words.push(...amountOf(p));
  return fields(...words);
}

/** numbers in order as their ranges — consecutive ones `a–b` — joined: "1–3, 5" */
function rangesOf(/** @type {number[]} */ ns) {
  /** @type {string[]} */
  const out = [];
  for (let i = 0; i < ns.length; i++) {
    let j = i;
    while (j + 1 < ns.length && ns[j + 1] === ns[j] + 1) j++;
    out.push(j > i ? `${numeral(ns[i])}–${numeral(ns[j])}` : numeral(ns[i]));
    i = j;
  }
  return out.join(', ');
}

/**
 * The label standing for runs whose labels would stack: the pieces they hold
 * — "pieces 1–4 of 9", consecutive numbers a range — then "again" where any of
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
  if (nums.length > 1) words.push(t('L.pieces', { list: rangesOf(nums), n: numeral(p.of) }));
  else if (nums.length === 1) words.push(t('L.piece', { k: numeral(nums[0]), n: numeral(p.of) }));
  if (runs.some((r) => r.repeat === 'again')) words.push(t('L.piece.again'));
  else if (runs.some((r) => r.repeat === 'again-later')) words.push(t('L.piece.again-later'));
  if (members.includes(current)) words.push(...amountOf(p));
  return fields(...words);
}

/**
 * The run a step takes the landing to from run `i` (FP-21): the next in the
 * step's order, or the one before it, round to the first from the last and
 * to the last from the first.
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
 * was (B-PORT's `lostSession`; FP-28), the text that could not be read.
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
 * Can a retry change the answer? The board out, the session lost, the board
 * busy, the text that could not be read: each read again may answer. Every
 * budget and verdict of the board's is permanent (wire.md §Errors).
 * @param {Met | null} r
 * @returns {boolean}
 */
export const retries = (r) => !r || r.kind === 'unreachable' || lostSession(r) || BUSY.has(r.name);

/**
 * A document's label as a line sets it (see the head): the first line the
 * board's index lists for it (M-REC's `place`), cut on a word to LABEL_CH
 * characters, an ellipsis after the cut (T-ARTICLE's `cutTo`); null where the
 * index lists no label for it.
 * @param {string} addr a bare address
 * @returns {string | null}
 */
export function labelIn(addr) {
  const label = (REC.place(addr)?.label ?? '').trim();
  return label ? cutTo(label, LABEL_CH, (s) => [...s].length) : null;
}

/** a document as a line names it (see the head): its label (`labelIn`), else its address */
export const nameIn = (/** @type {string} */ addr) => labelIn(addr) ?? addr;

/** the text a line names (see the head): a member's version (`L.held.member`), a bare address's current text (`L.held.current`), the document by its name (`nameIn`) */
export const whereOf = (/** @type {string} */ addr) => { const k = memberOf(addr); return k != null ? t('L.held.member', { k }) : t('L.held.current', { D: nameIn(addr) }); };

/** each subject's words */
const SUBJECTS = { selected: 'L.held.selected', reading: 'L.held.reading', followed: 'L.held.followed', stop: 'L.held.stop' };

/**
 * What the line says of what a text holds (see the head): part, the rest
 * possibly under the withheld text it shows, or pieces; null for all, which
 * the outline alone says, and for none, which the dead end's face says.
 * @param {{holds: Holds}} held
 * @param {Subject} subject
 * @param {string} addr the document whose text it is
 * @param {boolean} [withheld] the text shows withheld text
 * @returns {Said | null}
 */
export function saidOf(held, subject, addr, withheld = false) {
  if (held.holds !== 'part' && held.holds !== 'pieces') return null;
  return { state: held.holds, subject, addr, withheld: held.holds === 'part' && withheld, why: null, again: false };
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
  return { state: 'unknown', subject, addr, withheld: false, why: whyOf(r), again: retries(r) };
}

/**
 * The string the line's short form says (`shortLineOf`), and its values: a
 * part's (`L.held.part`), pieces' (`L.held.pieces`), couldn't tell's with its
 * reason (`L.held.unknown`), each naming the passage and the text it is in.
 * @param {Said} s
 * @returns {[string, Record<string, string>]}
 */
function shortOf(s) {
  const subject = t(SUBJECTS[s.subject]), where = whereOf(s.addr);
  if (s.state === 'unknown') return ['L.held.unknown', { subject, where, reason: t(s.why || 'L.held.why.other') }];
  return [s.state === 'pieces' ? 'L.held.pieces' : 'L.held.part', { subject, where }];
}

/**
 * The line's short form (see the head), the start of its words (`lineOf`): a
 * field's words, no capital and no end mark (`shortOf`).
 * @param {Said} s
 * @returns {string}
 */
export const shortLineOf = (s) => t(...shortOf(s));

/**
 * The line's words (see the head): its short form (`shortOf`) a sentence,
 * then, for a part where the text shows withheld text, that the rest may be
 * in it, a sentence of its own (ST's `sentence`, `sentences`).
 * @param {Said} s
 * @returns {string}
 */
export const lineOf = (s) => sentences(sentence(...shortOf(s)), s.withheld ? sentence('L.held.withheld') : '');

/**
 * What a drawn link's far end's text holds of its passage, before departure
 * (see the head), by the rule its landing reads — the text of the version its
 * far box shows (LK's `farAt`; FP-22): its projection
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
  return p.reduce((n, r) => n + r.width, 0) < passage.width ? saidOf({ holds: 'part' }, 'followed', at, withheld) : null;
}

/**
 * The dead end's words for a text that holds none of a passage (foundations
 * §2.3), a field's words, no capital and no end mark: a plain address's
 * (`F.floating`), its document by its name (`nameIn`), and a version
 * member's own (`F.floating.member`) — what a stub's label and a symbol's
 * title say.
 * @param {string} addr the text's document: a plain address, or a version member
 * @returns {string}
 */
export const floatingOf = (addr) => t(...deadEndOf(addr));

/**
 * The dead end's words as a sentence (`floatingOf`; ST's `sentence`): what a
 * surface that says the line says where the text holds none of the passage —
 * a drawn link's far end's card and mirror item, a reading scene's stop
 * returned to, O-FACES' floating face and a landing's description there
 * (`floatingSaid`).
 * @param {string} addr the text's document: a plain address, or a version member
 * @returns {string}
 */
export const floatingLineOf = (addr) => sentence(...deadEndOf(addr));

/** the dead end's words as a sentence (`floatingLineOf`), with the string they are said in */
export const floatingSaid = (/** @type {string} */ addr) => ({ id: deadEndOf(addr)[0], text: floatingLineOf(addr) });

/** the string the dead end's words are said in, and its values (`floatingOf`): a version member's own, else a plain address's, its document by its name (`nameIn`) */
function deadEndOf(/** @type {string} */ addr) {
  const k = memberOf(addr);
  return /** @type {[string, Record<string, string | number>]} */ (k != null ? ['F.floating.member', { k }] : ['F.floating', { D: nameIn(addr) }]);
}

/**
 * A drawn link's far end's state in words, before departure, in the form
 * given (see the head): the dead end's words where it floats in the version
 * its far box shows (LK's `floats`), the line where that text holds part of
 * it, all of it in pieces, or nothing told (`farHolds`); '' where it holds
 * all of it in one piece or nothing is known.
 * @param {Shown} s
 * @param {(addr: string) => string} dead the dead end's words (`floatingOf`, `floatingLineOf`)
 * @param {(said: Said) => string} line the line's words (`shortLineOf`, `lineOf`)
 * @returns {string}
 */
function farIn(s, dead, line) {
  if (floats(s)) return dead(s.farAt || s.far);
  const said = farHolds(s);
  return said ? line(said) : '';
}

/**
 * A drawn link's far end's state in words whole, before departure — what its
 * mirror item and its card say: sentences (`floatingLineOf`, `lineOf`).
 * @param {Shown} s
 * @returns {string}
 */
export const farSays = (s) => farIn(s, floatingLineOf, lineOf);

/**
 * A drawn link's far end's state in words short, before departure — what its
 * stub's label and its symbol's title say, a field's words (`floatingOf`,
 * `shortLineOf`): the start of what `farSays` says, but for the capital its
 * sentence takes.
 * @param {Shown} s
 * @returns {string}
 */
export const farShort = (s) => farIn(s, floatingOf, shortLineOf);
