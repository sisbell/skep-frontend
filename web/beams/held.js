// BM-HELD — WHAT A TEXT HOLDS OF A PASSAGE, and the line that says it
// (issue #153's design decision: "Mark what's held and say the rest in a
// line"). Layer 2, beside BM in `web/beams/`. PURE: no DOM and no state of
// its own; a far end's state read from what M-REC holds.
// A carried or a followed passage lands in one of four states, read here
// from the stretches of the landing's text that hold it, each named by where
// its stretch of the passage lies in the passage (`heldOf`): ALL, one
// stretch holding every position of it — the outline alone says it; PIECES,
// the stretches together holding every position, none of them all of it;
// PART, the stretches together holding less; NONE, no stretch — the dead
// end's face says it (foundations §2.3). A passage named by identity — a
// followed far end, its slot's stored span — is read through the identity of
// the bytes of each run its text holds it in (`piecesOf`). Where no answer
// tells — a read the board refused for any reason but its size, which is
// asked again in parts first (M-PUMP's `compareParts`, `imageParts`), or one
// still refused past SPLIT_READS parts — the state is COULDN'T TELL, its
// reason keyed on the refusal's name and kind, never its token (`whyOf`),
// "try again" offered only where a retry can change the answer (`retries`).
// THE LINE (`lineOf`), for part, pieces and couldn't tell, names the passage
// by what it was to the reader — "what you selected", "the text you were
// reading", a followed link's "its passage" — and the text by F.floating's
// two forms, "version ⟨k⟩" at a member, "⟨D⟩'s current text" at a bare
// address (`whereOf`); it never says "missing", "removed", "deleted" or
// "compare", and where the landing shows withheld text a part's line says
// the rest may be under it. The landing says it (N-GO's `landing`, O-LAND's
// line, N-WALK's description), and so does every surface that knows the
// state before departure, each by this one rule (the decision: "Where a read
// knows the state before departure — a drawn link's far end, the version
// list — say it there too"): a versions row (O-VERSIONS, through N-GO's
// `heldIn`), and a drawn link's far end (`farHolds`, `farSays`), read from
// the end LK draws and what M-REC holds of its far document — its
// projection, and the bytes of each run it names through that document's
// held image — which its stub, its symbol's title, its mirror item and its
// card say.
// Rules: FP-1, FP-2, FP-21 (the one reading of what a landing's text holds).

import * as REC from '../model/records.js';
import { floats } from '../links/links.js';
import { SIZE_REFUSALS } from '../model/frames.js';
import { memberOf } from '../model/address.js';
import { t } from '../strings.js';

/** @typedef {import('../model/records.js').ISpan} ISpan */
/** @typedef {import('../links/links.js').Shown} Shown */

/** @typedef {'all' | 'pieces' | 'part' | 'none'} Holds what a text holds of a passage: all of it in one stretch, all of it in several, part of it, none of it */

/** @typedef {{at: number, width: number}} Piece a stretch of the passage one stretch of the text holds: where it begins in the passage, counted from 0, and its positions */

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

/** the shell's names for the end of the page's session: a read so refused is asked again in the form the end left the page */
const ENDED = new Set(['session_ended', 'session_died', 'closed']);
/** the board's names for a read it could not take now and takes asked again: its admission, its scan permits, its history reader */
const BUSY = new Set(['busy', 'scan_busy', 'history_busy']);

/**
 * Why no answer told what a text holds of a passage (see the head): the id
 * of the words keyed on the refusal met — the board out, the session ended,
 * the board busy, a read still too large in parts, the passage's range no
 * longer where it was, a text withheld from the reader, no such link — every
 * other refusal the board's silence; where none was met, the text that could
 * not be read.
 * @param {Met | null} r
 * @returns {string}
 */
export function whyOf(r) {
  if (!r) return 'L.held.why.unread';
  if (r.kind === 'unreachable') return 'F.daemon.unreachable';
  if (ENDED.has(r.name)) return 'C-137.signed-out';
  if (BUSY.has(r.name)) return 'L.held.why.busy';
  if (SIZE_REFUSALS.includes(r.name)) return 'L.held.why.size';
  if (r.name === 'range_not_present') return 'B1.range_not_present';
  if (r.name === 'withheld') return 'L.held.why.withheld';
  if (r.name === 'not_a_link') return 'B1.not_a_link';
  return 'L.held.why.other';
}

/**
 * Can a retry change the answer (the decision's "'try again' where that
 * helps")? The board out, the session ended, the board busy, the text that
 * could not be read: each read again may answer. Every budget and verdict of
 * the board's is permanent (wire.md §Errors: "no retry shrinks the request").
 * @param {Met | null} r
 * @returns {boolean}
 */
export const retries = (r) => !r || r.kind === 'unreachable' || ENDED.has(r.name) || BUSY.has(r.name);

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
 * ⟨where⟩", with the places it stands in where they are two or more, and,
 * where the text shows withheld text, that the rest may be under it; pieces,
 * "all of ⟨subject⟩ is in ⟨where⟩" and its places; couldn't tell, "couldn't
 * tell whether ⟨where⟩ holds ⟨subject⟩: ⟨reason⟩".
 * @param {Said} s
 * @returns {string}
 */
export function lineOf(s) {
  const subject = t(SUBJECTS[s.subject]), where = whereOf(s.addr);
  if (s.state === 'unknown') return t('L.held.unknown', { subject, where, reason: t(s.why || 'L.held.why.other') });
  const places = s.places > 1 ? t('L.held.places', { n: s.places }) : '';
  if (s.state === 'pieces') return t('L.held.pieces', { subject, where }) + places;
  return t('L.held.part', { subject, where }) + places + (s.withheld ? t('L.held.withheld') : '');
}

/**
 * What a drawn link's far end's text holds of its passage, before departure
 * (see the head), by the rule its landing reads: its projection (LK's
 * `farRuns`, M-REC's held answer), each run's bytes read by identity
 * through the far document's held image (M-REC's `identityOf`) against the
 * span the slot stores (`farEnd`) — and where that image does not cover
 * every run, a projection of fewer positions than the passage still proves
 * part, and nothing more is said; a projection the board refused by a name
 * that says nothing of the document, couldn't tell, by that name — save a
 * refusal for its size, which the follow asks again in parts. Null where the
 * text holds all of it in one piece, where it floats (LK's `floats`, the dead
 * end's words), and where nothing tells.
 * @param {Shown} s
 * @returns {Said | null}
 */
export function farHolds(s) {
  if (!s.farEnd || s.farWhole || s.farEnd.ordinal == null || !s.far) return null;
  const p = REC.projection(s.link.addr, s.farSlot, s.far);
  if (p && typeof p === 'object' && !Array.isArray(p)) return SIZE_REFUSALS.includes(p.refused) ? null : unknownOf({ kind: 'refused', name: p.refused }, 'followed', s.far);
  const passage = REC.identityOfEnd(s.farEnd);
  if (!Array.isArray(p) || !p.length || !passage) return null;
  const d = REC.has(s.far) ? REC.doc(s.far) : null, withheld = !!d && d.blocks.some((b) => b.kind === 'withheld');
  const ids = p.map((r) => REC.identityOf(s.far, r.pos, r.width));
  if (ids.every((x) => x.length)) { const { pieces, places } = piecesOf(passage, ids); return saidOf(heldOf(pieces, passage.width, places), 'followed', s.far, withheld); }
  return p.reduce((n, r) => n + r.width, 0) < passage.width ? saidOf({ holds: 'part', places: p.length }, 'followed', s.far, withheld) : null;
}

/**
 * A drawn link's far end's state in words, before departure — what its stub,
 * its symbol's title, its mirror item and its card say: the dead end's words
 * where it floats (LK's `floats`), the line where its text holds part of it,
 * all of it in pieces, or nothing told (`farHolds`); '' where it holds all
 * of it in one piece or nothing is known.
 * @param {Shown} s
 * @returns {string}
 */
export function farSays(s) {
  if (floats(s)) return t('F.floating', { D: s.far });
  const said = farHolds(s);
  return said ? lineOf(said) : '';
}
