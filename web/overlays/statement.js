// O-STATEMENT — the one drawing of a statement said before a permanent act
// (the statement decision §1, §8, §9; D6 BM-10, BM-16, BM-22, BM-27). Layer
// 2, pure: no state, no DOM of its own — it answers markup its caller sets,
// and the words that markup is spoken as. A statement is ST's ordered parts
// (`statementParts`), each drawn on a line of its own: one paragraph, each
// part a line inside it and a space between two, so the characters drawn
// are the characters spoken and their join is the statement's string
// (`spoken`); a part wider than the measure wraps on a hanging indent of
// HANG_EM, so a wrap never reads as a new part; the exit part — what the
// person can do instead — stands last after HALF_LINE; the measure is the
// face's width and never more than MEASURE_CH characters of the face it is
// set in, at its size; figures are tabular. Nothing else is drawn in or
// around it — no box, rule, ground, bullet, icon, hue, weight, italic or
// capitals — and the paragraph carries no list, group or heading semantics.
// A SHORT PRIVATE ACT's statement (§8 case 5; `below`) sits on its face
// directly below the face's acts, from the face's left edge, drawn whole
// every time; its act is the row's last and never the act focused first —
// the face's own to keep, which sets the acts.
// Rules: FP-1, FP-2, FP-13, FP-26.

import { statementParts } from '../strings.js';
import { esc } from '../util.js';

/** the most characters of the face it is set in a statement's line holds before it wraps (§1's measure) */
export const MEASURE_CH = 60;
/** the indent a part's wrapped lines hang on, in em (§1's line) */
export const HANG_EM = 1;
/** the room before the exit part, in lines (§1's exit) */
export const HALF_LINE = 0.5;

/** the paragraph's own setting: the measure, tabular figures, and the face's weight, slope and case left as they are */
const SET = `margin:0;max-width:${MEASURE_CH}ch;font-variant-numeric:tabular-nums;font-weight:inherit;font-style:normal;text-transform:none`;
/** a part's line: flush at the statement's left edge, its wraps hung */
const LINE = `display:block;padding-left:${HANG_EM}em;text-indent:-${HANG_EM}em`;
/** the exit part's line: a part's, after half a line — in em where the platform has no line-height unit */
const EXIT = `${LINE};margin-top:${HALF_LINE * 1.4}em;margin-top:${HALF_LINE}lh`;

/**
 * A statement as markup (see the head): one paragraph named by its string,
 * each part whose case holds a line inside it, a space between two, the exit
 * part after its half line.
 * @param {string} id the statement's entry in the strings table
 * @param {Record<string, string | number>} [values] its tokens' values
 * @param {(key: string) => boolean} [holds] whether a part's case holds; every case where left out
 * @returns {string}
 */
export function statementHTML(id, values, holds) {
  const lines = statementParts(id, values, holds).map((q) => `<span class="part${q.exit ? ' exit' : ''}" style="${q.exit ? EXIT : LINE}">${esc(q.text)}</span>`);
  return `<p class="statement" data-string="${esc(id)}" style="${SET}">${lines.join(' ')}</p>`;
}

/**
 * A statement as it is spoken (see the head): the parts whose case holds
 * joined, a space between two — the string its act is described by, and the
 * characters `statementHTML` draws.
 * @param {string} id
 * @param {Record<string, string | number>} [values]
 * @param {(key: string) => boolean} [holds]
 * @returns {string}
 */
export const spoken = (id, values, holds) => statementParts(id, values, holds).map((q) => q.text).join(' ');

/**
 * A short private act's statement in its place on a face (see the head; §8
 * case 5): the statement whole, in a block of its own directly below the
 * face's acts, starting at the face's left edge.
 * @param {string} id
 * @param {Record<string, string | number>} [values]
 * @param {(key: string) => boolean} [holds]
 * @returns {string}
 */
export const below = (id, values, holds) => `<div class="said" data-below="acts" style="margin:0;padding:0;text-align:left">${statementHTML(id, values, holds)}</div>`;
