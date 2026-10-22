// LK — THE LINK SEAM (the structure record §3.2 "LK"; the three-gaps note;
// the gate ruling: what still moves is built behind ONE SEAM). Layer 2
// (S-31 (a)), `web/links/`. State: VIEW — the reveal chain's stage and
// lenses PER DOCUMENT for the session (S-29 (b); D-2 RULED PER DOCUMENT) and
// THE VISITED-LINK SET (S-32 (a); D-3) — THE ONE OWNER of both (FP-10).
// Imports: M-REC (the raw links, each link's type, the index) and P-REG
// (the values) alone; M-ADDR's arithmetic beneath. N-GO's link lit at an
// arrival is read through the reader the app hands in (`readers`), never
// imported — N-GO imports LK — and never kept here.
//
// WHICH LINKS SHOW at a document and at a span, and HOW each is marked —
// ITS RULE TODAY IS THE RULED DESIGNS' AND NOTHING MORE (foundations §2.1's
// link row; R60's default composition; the counts' three rules (i)–(iii),
// E11 (c), E12 (i), E13 (a), E15 (a), E17 (a); D-2; D-3; B1-S4):
//   - the document owner's links are marked at their spans with no act, and
//     the person's own in their own hue (R60's default composition);
//   - every other party's link is an OVERLAY, off by default, present as the
//     "+⟨n⟩ others" count per block; shown where the card's toggle is on or a
//     lens admits it, attributed in its linker's hue;
//   - rule (i): a link whose end is a WHOLE WORK counts ONCE, at the corner,
//     never at a passage; an ACCOUNT-named end counts NOWHERE as a number;
//     a RECORD (a credential, the claim, `replaces`, an edition claim, a
//     registry record, a succession pair) never counts and is never a mark;
//     the SOCIAL types stand as ONE UNNUMBERED MARK;
//   - rule (iii): the registry's STRUCTURAL family is formatting — rendered by
//     T-ARTICLE, never counted, never marked;
//   - every count is a fold of `find_links_v`'s answer, the type learned once
//     (`count_v` no longer used — E17 (a)); a document whose links are not
//     yet read shows its count ARRIVING (#465, needs-design: a lower bound);
//   - an end stands WHERE ITS BYTES STAND NOW: a link's slot stores the
//     permanent I-spans of the bytes it named, never a place (wire.md
//     §Links, `make_link`), so each end drawn at a document is its stored
//     span read back to the document's held text through the V→I image
//     (M-REC's `placed`) — every stretch it stands in, a passage an edit cut
//     in two at both, its marks, symbol and counts there and never at the
//     stored ordinal — and an end the held text places nowhere (its image
//     not read, or the text holding none of it) is not drawn; the end is
//     told apart by its stored span (`nearEnd`) wherever it stands;
//   - its FAR end stands where `project` answers it sits in the far
//     document's current text now (A-53: "the beam lands at the passage's
//     current place (version-proof)"; M-REC's projection, `farRuns`); a far
//     end that text holds none of FLOATS (`floats`), and its symbol, its stub
//     and its mirror item say "its passage is not in ⟨D⟩'s current text"
//     before anyone follows it (foundations §2.3: "the projection the beam
//     already makes says so before the departure");
//   - a link shows as a SYMBOL at its span where the reveal has reached stage
//     2 and as a BEAM where it has reached stage 3; the lenses by owner, type
//     and endorsement filter the set per document for the session;
//   - the most any reveal can set in a document's text — a symbol at every
//     passage end, each block's count as the hidden reveal counts it — is
//     what the plane's face is fitted to (`utmost`), so moving the chain, the
//     toggle or a lens re-sets no line;
//   - a link the person has FOLLOWED this session is drawn lighter (D-3:
//     VALUE, the hue kept), the set client-side, never written;
//   - the link LIT AT AN ARRIVAL — the one a landing followed, or the one
//     Back came back along (N-GO's `litLink`) — is drawn heavier until the
//     next act (foundations §2.1's register: "the arrival an outline around
//     its span with the followed link drawn heavier": WEIGHT);
//   - a link at a mark JOINING TWO DOCUMENTS — a mid connection, a scene's
//     line — is decided ONCE, from the link and the two documents, never at
//     each end apart: its linker you, else the document's owner where its
//     owner owns EITHER of the two (foundations §2.1's register: "the
//     document's owner the owner of either"), else everyone else (`markOf`
//     given both); it stands there where EITHER document's composition
//     draws it (`draws`; §2.5: "drawn where either pane's default
//     composition draws that link");
//   - links drawn at ONE SITE — a stretch of text several mark, a mid
//     connection holding several, a beam met from both its ends — are ONE
//     MARK carrying what they share (P44; its Use at §2.1's register:
//     "neutral in any variable its members do not share — hue where their
//     linkers differ"): the linker's hue where every one's linker is one,
//     else the neutral hue; lighter only where every one was followed;
//     heavier only where every one is lit; the form the link kind's, which
//     every mark here carries (`mergedMark`);
//   - the mid connections: one per pair of places the plane draws the
//     documents at — a document's own box, or the mark of the continuation
//     holding it (P44) — holding once each link that joins a document at one
//     to a document at the other, however many of its ends lie there, so its
//     count and its mark are the same whether the other document is drawn,
//     held by a mark or out of view; a link whose two documents stand at one
//     place draws none; a drawn document's links run to the place of each
//     document they join it to, drawn there this frame or out of view, where
//     the plane ends them at the view's edge (foundations §2.1: "one whose far
//     end is out of view ending at the view's edge as §2.5's stub does"), and
//     to no place where the plane draws that document nowhere; the scene's
//     pane-to-pane lines are drawn from the shown set at both panes'
//     documents, each link once per pair of its ends, in its one mark joining
//     the two.
// WHAT REPLACES THIS RULE LATER: link sets (`_designs/LINK-SETS/…` §4, in
// review) — at a version `E.k` the default view is `E`'s OWN SET plus the sets
// its author has `E.k` read with plus the reader's own links; everything else
// an overlay; the card lists SETS; the anatomy card gains a SET line. A
// DIFFERENT RULE FOR WHICH LINKS SHOW, THE SAME MARKS AND THE SAME DRAWING:
// when it lands, THIS FILE's rule and its state change; NO DRAWING MODULE
// CHANGES (BM, T-LAYER, P-RENDER, SC, the cards draw what `shown`, `shownAt`,
// `symbols`, `beams`, `countAt`, `connections`, `markOf`, `mergedMark`,
// `floats` and `farPos` give them, and T-LAYER fits the face to what
// `utmost` gives).
// Carries: the wireframe's §16 `.sym`/`.lip` selection and the owner-link
// marking in `articleHTML`, §17's wanted set, §18 `revealLinks`'s lens
// filters, §10's by-linker colouring and mid lines, S1's `buildBeams`.
// Rules: FP-1, FP-2, FP-7, FP-10, FP-11.

import * as REC from '../model/records.js';
import { HUE, NEUTRAL_HUE, KIND_FORM, VISITED_ALPHA, ARRIVAL_WEIGHT } from '../plane/register.js';
import { commonsType, documentOf, accountOf } from '../model/address.js';

/** @typedef {import('../model/records.js').Link} Link */
/** @typedef {import('../model/records.js').Block} Block */
/** @typedef {import('../model/address.js').EndRef} EndRef */
/** @typedef {import('../plane/register.js').Mark} Mark */

/**
 * @typedef {Object} Reveal — the chain's state at one document (B1-S4): 1 hidden, 2 symbols, 3 content
 * @property {1 | 2 | 3} stage
 * @property {boolean} others the overlay toggle (R60)
 * @property {Lens} lens the standing lenses (D-2 per document, the session's)
 */
/**
 * @typedef {Object} Lens
 * @property {Set<string> | null} owners the accounts admitted, or null for every owner
 * @property {Set<string> | null} types the type addresses admitted, or null for every type
 * @property {boolean} endorsed only links the owner endorsed (no endorsement exists on this board: the lens admits none when on)
 */
/** @typedef {import('../model/records.js').Stretch} Stretch */

/**
 * @typedef {Object} Shown — one end of a link drawn at a document: the span its slot stores there, where that span stands in the document's text now, and where its far end stands in the far document's
 * @property {Link} link
 * @property {string} near the document it is drawn at — the one `end` lies in, whichever end that is and wherever the link is homed
 * @property {'from' | 'to'} end which end lies in this document
 * @property {EndRef} nearEnd the span of the slot this end draws, as stored: the bytes' identity, by which an end met from both its documents is told apart wherever it stands
 * @property {Stretch[]} runs every stretch of the near document's held text `nearEnd` stands in now (M-REC's `placed`), in the text's order — never empty: an end the held text places nowhere is not drawn
 * @property {number} pos the first stretch's first position
 * @property {number} width the first stretch's positions
 * @property {Mark} mark
 * @property {'you' | 'owner' | 'others'} linker
 * @property {string} far the document the other end names, or '' where it names none
 * @property {EndRef | null} farEnd the other slot's first span, as stored
 * @property {1 | 2} farSlot the slot the far end lies in: 2 where this end is the link's from, 1 where it is its to
 * @property {boolean} farWhole
 * @property {Stretch[] | null} farRuns where the far end's passage stands in the far document's current text now (`project`'s answer, M-REC's projection), in the text's order; none where it floats — that text holds none of it; null where nothing places it: its projection not read or refused, or the far end naming a document whole, an account or nothing
 */
/**
 * @typedef {Object} Readers — what LK reads from an owner above it, handed in once by the app
 * @property {() => string | null} lit the link lit at an arrival (N-GO's `litLink`); null where none is
 */
/**
 * @typedef {Object} Connection — a mid connection between two places the plane draws documents at
 * @property {string} a the place of the drawn document the first of its links was met at: the document's own address, or the mark `placeOf` names
 * @property {string} b the place of the document that link joins it to, drawn this frame or out of view
 * @property {'link'} kind
 * @property {Mark} mark the one mark its links merge into (`mergedMark`), each marked as a mark joining its two documents marks it (`markOf`)
 * @property {number} count the links the pair holds, each once
 */

/** the commons rows: the credential classes, `replaces`, the edition claim, the registry's five, succession — RECORDS (rule (i)'s test) */
const RECORD_ORDINALS = new Set([1, 2, 3, 12, 14, 55, 56, 57, 58, 59]);
/** the social types — one unnumbered mark (E11 (c)): endorse 3.42, bookmark 3.44 */
const SOCIAL_ORDINALS = new Set([42, 44]);
/** the structural family — formatting, never counted (rule (iii)); the commons map's 3.22–3.29 (the registry file `link-types-structural.md` numbers them 2.20–2.22 — the discrepancy is reported) */
const STRUCTURAL_ORDINALS = new Set([22, 23, 24, 25, 26, 27, 28, 29]);

/** @type {Map<string, Reveal>} */
const reveals = new Map();
/** @type {Set<string>} the followed links, the session's (D-3) */
const visitedSet = new Set();
/** the readers until the app hands N-GO's in: no link lit */
const noReaders = () => /** @type {Readers} */ ({ lit: () => null });
/** @type {Readers} */
let read = noReaders();

/** the owners above hand their readers in once (the app) */
export function readers(/** @type {Readers} */ r) { read = r; }

/** the reveal a document stands at until a card moves it: hidden, others' links off, no lens */
const hidden = () => /** @type {Reveal} */ ({ stage: 1, others: false, lens: { owners: null, types: null, endorsed: false } });
/** the hidden reveal, read at a document no card has moved — never handed out to be set */
const HIDDEN = Object.freeze({ ...hidden(), lens: Object.freeze(hidden().lens) });
/** the reveal standing at a document, read without making one: a far document a connection asks about stands at the hidden one */
const revealAt = (/** @type {string} */ addr) => reveals.get(addr) || HIDDEN;

/** the reveal's state at a document (hidden by default) */
export function state(/** @type {string} */ addr) {
  let r = reveals.get(addr);
  if (!r) { r = hidden(); reveals.set(addr, r); }
  return r;
}
/** set the chain's stage at a document (the card's setter) */
export function reveal(/** @type {string} */ addr, /** @type {1 | 2 | 3} */ stage) { state(addr).stage = stage; }
/** the overlay toggle (R60): others' links on or off at a document */
export function setOthers(/** @type {string} */ addr, /** @type {boolean} */ on) { const r = state(addr); r.others = on; if (on && r.stage < 2) r.stage = 2; }
/** set a lens at a document — stands for the session, client-side (D-2) */
export function lens(/** @type {string} */ addr, /** @type {Partial<Lens>} */ l) { Object.assign(state(addr).lens, l); }
export function clearLens(/** @type {string} */ addr) { state(addr).lens = hidden().lens; }
/** dismissing the card returns the chain to hidden; a standing lens keeps the links it admits marked */
export function hide(/** @type {string} */ addr) { const r = state(addr); r.stage = 1; }

/** `follow` reports the link followed (N-GO → here, S-32 (a)) */
export function follow(/** @type {Link | string} */ l) { visitedSet.add(typeof l === 'string' ? l : l.addr); }
/** has the link been followed this session? */
export const visited = (/** @type {Link | string} */ l) => visitedSet.has(typeof l === 'string' ? l : l.addr);

/**
 * The kind of a link under the register's rules.
 * @param {Link} l
 * @returns {'record' | 'social' | 'structural' | 'account-end' | 'passage' | 'whole'}
 */
export function classify(l) {
  const ty = commonsType(l.type);
  if (ty) {
    if (RECORD_ORDINALS.has(ty.ordinal)) return 'record';
    if (SOCIAL_ORDINALS.has(ty.ordinal)) return 'social';
    if (STRUCTURAL_ORDINALS.has(ty.ordinal)) return 'structural';
  }
  const ends = [...l.from, ...l.to];
  if (!l.from.length || !l.to.length) return 'record';
  if (ends.some((e) => e.whole && !e.doc)) return 'account-end';
  if (ends.every((e) => e.whole)) return 'whole';
  return 'passage';
}

/**
 * The linker of a link at a mark: you, where the person made it; else the
 * document's owner, where its owner owns the document the mark stands at —
 * at a mark joining two documents, a mid connection or a scene's line,
 * either of them (foundations §2.1's register: "the document's owner the
 * owner of either"); else everyone else as one.
 * @param {Link} l
 * @param {string} at the document the mark stands at, or one of the two it joins
 * @param {string} [other] the other document a mark joining two joins
 * @returns {'you' | 'owner' | 'others'}
 */
export function linkerOf(l, at, other = at) {
  const s = REC.session();
  if (s && s.account && l.owner === s.account) return 'you';
  if (l.owner && (l.owner === accountOf(at) || l.owner === accountOf(other))) return 'owner';
  return 'others';
}

/**
 * How one link is marked at a mark standing at a document, or joining two:
 * hue its linker's there (`linkerOf`), form its kind's, value lighter once
 * followed (D-3), weight heavier while it is the link lit at an arrival
 * (foundations §2.1's register).
 * @param {Link} l
 * @param {string} at the document the mark stands at, or one of the two it joins
 * @param {string} [other] the other document a mark joining two joins
 * @returns {Mark}
 */
export function markOf(l, at, other = at) {
  const linker = linkerOf(l, at, other);
  return { hue: HUE[linker], linker, form: KIND_FORM.link, value: visitedSet.has(l.addr) ? VISITED_ALPHA : 1, weight: read.lit() === l.addr ? ARRIVAL_WEIGHT : 1, own: linker !== 'others' };
}

/**
 * The one mark links drawn at one site merge into — a stretch of text
 * several mark, a mid connection holding several, a beam met from both its
 * ends — carrying what they share and nothing they do not (P44; its Use at
 * §2.1's register: "neutral in any variable its members do not share — hue
 * where their linkers differ"): the linker and its hue where every member's
 * is one, else none and NEUTRAL_HUE; lighter only where every member was
 * followed (D-3), else full — value carries the followed mark alone, so a
 * site followed in part has no value of its own; heavier only where every
 * member is the link lit, else the drawer's own weight; standing with no act
 * only where every member does; the form the link kind's, which every mark
 * `markOf` makes carries.
 * @param {[Mark, ...Mark[]]} marks the members' marks
 * @returns {Mark}
 */
export function mergedMark(marks) {
  const [m] = marks;
  return {
    hue: marks.every((x) => x.hue === m.hue) ? m.hue : NEUTRAL_HUE,
    linker: marks.every((x) => x.linker === m.linker) ? m.linker : null,
    form: KIND_FORM.link,
    value: marks.every((x) => x.value === m.value) ? m.value : 1,
    weight: marks.every((x) => x.weight === m.weight) ? m.weight : 1,
    own: marks.every((x) => x.own),
  };
}

/** does the lens at a document admit the link? */
function admitted(/** @type {Reveal} */ r, /** @type {Link} */ l) {
  const { owners, types, endorsed } = r.lens;
  if (owners && !(l.owner && owners.has(l.owner))) return false;
  if (types && !(l.type && types.has(l.type))) return false;
  if (endorsed) return false; // no endorsement records exist on this board; an endorsement is a social link onto the link
  return true;
}

/**
 * Is another's link let onto the article? Only by the toggle (R60 — others'
 * content shown on request) or by a lens that NAMES its owner (an explicit
 * ask for that person's links); a lens by type alone filters what is shown
 * and reveals no one new.
 */
function othersLet(/** @type {Reveal} */ r, /** @type {Link} */ l) {
  return r.others || !!(r.lens.owners && l.owner && r.lens.owners.has(l.owner));
}

/** the ends of a link that lie in a document as passages */
function endsIn(/** @type {Link} */ l, /** @type {string} */ addr) {
  /** @type {Array<{end: 'from' | 'to', e: EndRef}>} */
  const out = [];
  for (const e of l.from) if (e.doc === addr && !e.whole && e.ordinal != null) out.push({ end: 'from', e });
  for (const e of l.to) if (e.doc === addr && !e.whole && e.ordinal != null) out.push({ end: 'to', e });
  return out;
}

/**
 * Does a reveal let a link in, given the linker its document gives it: the
 * owner's and the person's own always, another's by the toggle or a lens
 * naming its owner (`othersLet`); every one through the lenses standing
 * (`admitted`).
 * @param {Reveal} r
 * @param {Link} l
 * @param {'you' | 'owner' | 'others'} linker
 * @returns {boolean}
 */
function lets(r, l, linker) {
  return (linker !== 'others' || othersLet(r, l)) && admitted(r, l);
}

/**
 * Does a document's composition draw the link — R60's default composition,
 * moved by the reveal standing there: the link joins passages, the document
 * holds a passage end of it, and its reveal lets it in (`lets`). The one
 * rule which links show: `shown` marks what a document draws at its spans,
 * and a mark joining two documents holds a link where either of them draws
 * it.
 * @param {Link} l
 * @param {string} addr
 * @returns {boolean}
 */
export function draws(l, addr) {
  return classify(l) === 'passage' && endsIn(l, addr).length > 0 && lets(revealAt(addr), l, linkerOf(l, addr));
}

/**
 * A link's end drawn at a document: its stored span, where that span stands
 * in the document's held text now, its mark, and its far end with where that
 * stands in its own document's current text; null where the held text places
 * the end nowhere.
 * @param {Link} l
 * @param {string} addr the document the end lies in
 * @param {'you' | 'owner' | 'others'} linker
 * @param {'from' | 'to'} end
 * @param {EndRef} e
 * @returns {Shown | null}
 */
function drawnEnd(l, addr, linker, end, e) {
  const runs = REC.placed(addr, e);
  if (!runs.length) return null;
  const farSlot = end === 'from' ? 2 : 1;
  const far = (end === 'from' ? l.to : l.from)[0] || null;
  const held = far && !far.whole && far.ordinal != null && far.doc ? REC.projection(l.addr, farSlot, far.doc) : undefined;
  return {
    link: l, near: addr, end, nearEnd: e, runs, pos: runs[0].pos, width: runs[0].width, mark: markOf(l, addr), linker,
    far: far ? far.doc || far.account || '' : '', farEnd: far, farSlot, farWhole: !!(far && far.whole), farRuns: Array.isArray(held) ? held : null,
  };
}

/** every end of a link a document draws, as its held text places it (`drawnEnd`) */
function endsDrawn(/** @type {Link} */ l, /** @type {string} */ addr, /** @type {'you' | 'owner' | 'others'} */ linker) {
  /** @type {Shown[]} */
  const out = [];
  for (const { end, e } of endsIn(l, addr)) { const s = drawnEnd(l, addr, linker, end, e); if (s) out.push(s); }
  return out;
}

/**
 * The links to mark in a document's article, each with its mark: what the
 * document draws (`draws`) — the owner's and the person's own at their
 * spans; others' only where the toggle or a lens admits them — each end
 * where its held text places it.
 * @param {string} addr
 * @returns {Shown[]}
 */
export function shown(addr) {
  /** @type {Shown[]} */
  const out = [];
  for (const l of REC.linksTouching(addr)) if (draws(l, addr)) out.push(...endsDrawn(l, addr, linkerOf(l, addr)));
  return out;
}

/** does a stretch of the text meet a span? */
const meets = (/** @type {Stretch} */ r, /** @type {{pos: number, width: number}} */ span) => r.pos < span.pos + span.width && span.pos < r.pos + r.width;

/** the links drawn at a span — a block's, or the selection's bytes (what a click there lists; the selection's slots count these alone): each end standing in a stretch the span meets */
export function shownAt(/** @type {string} */ addr, /** @type {{pos: number, width: number}} */ span) {
  return shown(addr).filter((s) => s.runs.some((r) => meets(r, span)));
}

/** does a drawn link's far end float — its far document's current text holding none of its passage (foundations §2.3)? */
export const floats = (/** @type {Shown} */ s) => !!s.farRuns && s.farRuns.length === 0;
/** where a drawn link's far end stands first in its far document's current text — the position a scene sets level with its near end — or null where nothing places it there */
export const farPos = (/** @type {Shown} */ s) => (s.farRuns && s.farRuns.length ? s.farRuns[0].pos : null);

/** the symbols: stage 2 and above — the shown set at its spans */
export function symbols(/** @type {string} */ addr) { return state(addr).stage >= 2 ? shown(addr) : []; }
/** the beams: stage 3 — the shown set with its far ends */
export function beams(/** @type {string} */ addr) { return state(addr).stage >= 3 ? shown(addr) : []; }

/**
 * The others' links touching a block that are NOT shown — the "+⟨n⟩ others"
 * count (rule (i)–(iii)); zero where none.
 * @param {string} addr
 * @param {Block} block
 */
export function countAt(addr, block) { return countUnder(state(addr), addr, block); }

/**
 * The most link chrome any reveal can set in a document's text: every
 * passage end at the document, as `shown` gives the reveal that shows them
 * all — stage 2 and on, others' links on, no lens — and at each block the
 * "+⟨n⟩ others" count as the hidden reveal counts it, which shows none of
 * them. An article set with all of it is at least as long as at any stage,
 * toggle and lens, so the face T-LAYER fits to it holds the article at each,
 * and moving the reveal re-sets no line — what A-254 places the count by: "so
 * a link's arrival breaks no line".
 * @param {string} addr
 * @returns {{shown: Shown[], countAt: (block: Block) => {n: number, social: boolean}}}
 */
export function utmost(addr) {
  /** @type {Shown[]} */
  const all = [];
  for (const l of REC.linksTouching(addr)) if (classify(l) === 'passage') all.push(...endsDrawn(l, addr, linkerOf(l, addr)));
  const none = hidden();
  return { shown: all, countAt: (block) => countUnder(none, addr, block) };
}

/**
 * The others' passage links touching a block that a reveal does not show —
 * an end standing in the block where its held text places it (M-REC's
 * `placed`) — and whether a social link touches the document.
 * @param {Reveal} r
 * @param {string} addr
 * @param {Block} block
 */
function countUnder(r, addr, block) {
  let n = 0, social = false;
  for (const l of REC.linksTouching(addr)) {
    const kind = classify(l);
    if (kind === 'social') { social = true; continue; }
    if (kind !== 'passage') continue;
    if (linkerOf(l, addr) !== 'others' || lets(r, l, 'others')) continue;
    if (endsIn(l, addr).some(({ e }) => REC.placed(addr, e).some((p) => meets(p, block)))) n++;
  }
  return { n, social };
}

/** the links whose end is this document as a whole — counted once at the corner (rule (i)) */
export function wholeLinks(/** @type {string} */ addr) {
  return REC.linksTouching(addr).filter((l) => classify(l) === 'whole' || (classify(l) === 'passage' && [...l.from, ...l.to].some((e) => e.doc === addr && e.whole)));
}

/**
 * The badge: the links a document HOLDS (homed in it — foundations §2.1: "a
 * link counted where it is homed"), two-ended, records and the structural
 * family left out, the social types as one mark; `arriving` where the
 * document's links are not yet read (the count then a lower bound).
 * @param {string} addr
 */
export function countDoc(addr) {
  const d = REC.doc(addr);
  let n = 0, social = false;
  for (const l of REC.linksTouching(addr)) {
    if (l.home !== addr) continue;
    const kind = classify(l);
    if (kind === 'social') { social = true; continue; }
    if (kind === 'passage' || kind === 'whole') n++;
  }
  return { n, social, arriving: !d.linksRead };
}

/** the cluster's count: the fold over an account's indexed documents whose links are read; arriving where any is not */
export function countAccount(/** @type {string} */ account) {
  let n = 0, arriving = false;
  for (const p of REC.placesOf(account)) {
    const c = countDoc(p.doc);
    n += c.n; if (c.arriving) arriving = true;
  }
  return { n, arriving };
}

/**
 * The documents a link joins, each pair once, in the order its ends name
 * them: each document holding a passage end of it against each document its
 * other slot names — a version member named whole as its document, the box
 * the two share — and none where the two are one.
 * @param {Link} l
 * @returns {Array<[string, string]>}
 */
function joined(l) {
  /** @type {Map<string, [string, string]>} */
  const out = new Map();
  for (const [ends, others] of [[l.from, l.to], [l.to, l.from]]) {
    for (const e of ends) {
      if (e.whole || e.ordinal == null || !e.doc) continue;
      for (const f of others) {
        const y = f.doc ? documentOf(f.doc) || f.doc : null;
        if (!y || y === e.doc) continue;
        const key = [e.doc, y].sort().join('|');
        if (!out.has(key)) out.set(key, [e.doc, y]);
      }
    }
  }
  return [...out.values()];
}

/**
 * The mid connections from the documents the plane draws: one per pair of
 * PLACES (P44: one per document pair, with its count) — `placeOf` names the
 * place a document stands at, its own box or the mark of the continuation
 * that holds it. Every passage link among a drawn document's links
 * (`find_links_v`'s answer) pairs it with each document the link joins it to
 * — a passage end in one, its other slot naming the other (`joined`); a link
 * stands at such a pair where EITHER of its two documents draws it
 * (`draws`) — the owner's and the person's own by default, another's where
 * a document's toggle or a lens naming its owner lets it in — decided from
 * the link and the two documents alone, so it stands there whether the other
 * document is drawn, held by a mark nobody read or out of view. The other
 * document stands at its place — a version member named whole at its
 * document's, the box the two share — whether the frame draws that place or
 * not: a far end out of view is still a connection's end, which the plane
 * draws to the view's edge (foundations §2.1); where `placeOf` names no
 * place, the plane drawing the document nowhere, the link draws none. Its
 * count is its links, each once, however many of a link's ends lie at its
 * places and from however many of its documents it is met; its mark the one
 * its links' marks merge into (`mergedMark`), each link marked as a mark
 * joining its two documents marks it (`markOf`: the owner of either
 * document's link the owner's), so no order of the documents, and no toggle
 * at either, recolours a link. A link whose two documents stand at one place
 * draws none.
 * @param {string[]} docsDrawn the documents drawn, whole or inside a mark
 * @param {(addr: string) => string | null} [placeOf] the place a document stands at, drawn this frame or not; null where the plane draws it nowhere. By default its own box
 * @returns {Connection[]}
 */
export function connections(docsDrawn, placeOf = (addr) => addr) {
  /** @type {Map<string, {a: string, b: string, links: Map<string, Mark>}>} the pairs met, each with its links, each once, and the mark each link takes there */
  const pairs = new Map();
  for (const addr of docsDrawn) {
    const here = placeOf(addr);
    if (here == null) continue;
    for (const l of REC.linksTouching(addr)) {
      if (classify(l) !== 'passage') continue;
      for (const [x, y] of joined(l)) {
        if (x !== addr && y !== addr) continue;
        const there = placeOf(x === addr ? y : x);
        if (there == null || there === here || !(draws(l, x) || draws(l, y))) continue;
        const key = [here, there].sort().join('|');
        const p = pairs.get(key);
        if (!p) pairs.set(key, { a: here, b: there, links: new Map([[l.addr, markOf(l, x, y)]]) });
        else if (!p.links.has(l.addr)) p.links.set(l.addr, markOf(l, x, y));
      }
    }
  }
  return [...pairs.values()].map((p) => ({ a: p.a, b: p.b, kind: /** @type {const} */ ('link'), mark: mergedMark(/** @type {[Mark, ...Mark[]]} */ ([...p.links.values()])), count: p.links.size }));
}

/** the owners and types present among a document's links (the card's lens rows) */
export function lensRows(/** @type {string} */ addr) {
  const owners = new Set(), types = new Set();
  for (const l of REC.linksTouching(addr)) { if (classify(l) === 'record' || classify(l) === 'structural') continue; if (l.owner) owners.add(l.owner); if (l.type) types.add(l.type); }
  return { owners: [...owners], types: [...types] };
}

/** the others' links touching a document at a passage (two-ended), for the card's toggle count */
export function othersTouching(/** @type {string} */ addr) {
  return REC.linksTouching(addr).filter((l) => classify(l) === 'passage' && linkerOf(l, addr) === 'others' && endsIn(l, addr).length > 0);
}

/** reset (tests) */
export function _reset() { reveals.clear(); visitedSet.clear(); read = noReaders(); }
