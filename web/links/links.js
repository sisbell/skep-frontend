// LK — THE LINK SEAM (the structure record §3.2 "LK"; the three-gaps note;
// the gate ruling: what still moves is built behind ONE SEAM). Layer 2
// (S-31 (a)), `web/links/`. State: VIEW — the reveal chain's stage and
// lenses PER DOCUMENT for the session (S-29 (b); D-2 RULED PER DOCUMENT) and
// THE VISITED-LINK SET (S-32 (a); D-3) — THE ONE OWNER of both (FP-10).
// Imports: M-REC (the raw links, each link's type, the index) and P-REG
// (the values) alone; M-ADDR's arithmetic beneath.
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
//   - a link shows as a SYMBOL at its span where the reveal has reached stage
//     2 and as a BEAM where it has reached stage 3; the lenses by owner, type
//     and endorsement filter the set per document for the session;
//   - the most any reveal can set in a document's text — a symbol at every
//     passage end, each block's count as the hidden reveal counts it — is
//     what the plane's face is fitted to (`utmost`), so moving the chain, the
//     toggle or a lens re-sets no line;
//   - a link the person has FOLLOWED this session is drawn lighter (D-3:
//     VALUE, the hue kept), the set client-side, never written;
//   - the mid connections: one per pair of places the plane draws the
//     documents at — a document's own box, or the mark of the continuation
//     holding it (P44) — in its kind's form, hue the linker's; a link whose
//     two ends stand at one place draws none; the scene's pane-to-pane lines
//     the same set.
// WHAT REPLACES THIS RULE LATER: link sets (`_designs/LINK-SETS/…` §4, in
// review) — at a version `E.k` the default view is `E`'s OWN SET plus the sets
// its author has `E.k` read with plus the reader's own links; everything else
// an overlay; the card lists SETS; the anatomy card gains a SET line. A
// DIFFERENT RULE FOR WHICH LINKS SHOW, THE SAME MARKS AND THE SAME DRAWING:
// when it lands, THIS FILE's rule and its state change; NO DRAWING MODULE
// CHANGES (BM, T-LAYER, P-RENDER, SC, the cards draw what `shown`, `shownAt`,
// `symbols`, `beams`, `countAt`, `connections`, `markOf` give them, and
// T-LAYER fits the face to what `utmost` gives).
// Carries: the wireframe's §16 `.sym`/`.lip` selection and the owner-link
// marking in `articleHTML`, §17's wanted set, §18 `revealLinks`'s lens
// filters, §10's by-linker colouring and mid lines, S1's `buildBeams`.
// Rules: FP-1, FP-2, FP-7, FP-10, FP-11.

import * as REC from '../model/records.js';
import { HUE, KIND_FORM, VISITED_ALPHA } from '../plane/register.js';
import { commonsType } from '../model/address.js';

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
/**
 * @typedef {Object} Shown — one link drawn at a document
 * @property {Link} link
 * @property {string} near the document it is drawn at — the one `end` lies in, whichever end that is and wherever the link is homed
 * @property {'from' | 'to'} end which end lies in this document
 * @property {number} pos the end's first position
 * @property {number} width the end's positions
 * @property {Mark} mark
 * @property {'you' | 'owner' | 'others'} linker
 * @property {string} far the document the other end names, or '' where it names none
 * @property {EndRef | null} farEnd
 * @property {boolean} farWhole
 */
/**
 * @typedef {Object} Connection — a mid connection between two places the plane draws documents at
 * @property {string} a the place one end's document is drawn at: its own address, or the mark `placeOf` names
 * @property {string} b the place the other end's is drawn at
 * @property {'link'} kind
 * @property {Mark} mark
 * @property {number} count the links the pair holds
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

/** the reveal a document stands at until a card moves it: hidden, others' links off, no lens */
const hidden = () => /** @type {Reveal} */ ({ stage: 1, others: false, lens: { owners: null, types: null, endorsed: false } });

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

/** the linker of a link at a document: you, the document's owner, or everyone else as one */
export function linkerOf(/** @type {Link} */ l, /** @type {string} */ atDoc) {
  const s = REC.session();
  if (s && s.account && l.owner === s.account) return /** @type {const} */ ('you');
  const d = REC.doc(atDoc);
  if (l.owner && l.owner === d.account) return /** @type {const} */ ('owner');
  return /** @type {const} */ ('others');
}

/**
 * How one link is marked: hue the linker's, form its kind's, value lighter
 * once followed (D-3).
 * @param {Link} l
 * @param {string} atDoc
 * @returns {Mark}
 */
export function markOf(l, atDoc) {
  const linker = linkerOf(l, atDoc);
  return { hue: HUE[linker], linker, form: KIND_FORM.link, value: visitedSet.has(l.addr) ? VISITED_ALPHA : 1, own: linker !== 'others' };
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
 * A link's end drawn at a document: its span, its mark, its far end.
 * @param {Link} l
 * @param {string} addr the document the end lies in
 * @param {'you' | 'owner' | 'others'} linker
 * @param {'from' | 'to'} end
 * @param {EndRef} e
 * @returns {Shown}
 */
function drawnEnd(l, addr, linker, end, e) {
  const far = (end === 'from' ? l.to : l.from)[0] || null;
  return { link: l, near: addr, end, pos: /** @type {number} */ (e.ordinal), width: e.positions || 1, mark: markOf(l, addr), linker, far: far ? far.doc || far.account || '' : '', farEnd: far, farWhole: !!(far && far.whole) };
}

/**
 * The links to mark in a document's article, each with its mark: the owner's
 * and the person's own at their spans; others' only where the toggle or a
 * lens admits them.
 * @param {string} addr
 * @returns {Shown[]}
 */
export function shown(addr) {
  const r = state(addr);
  /** @type {Shown[]} */
  const out = [];
  for (const l of REC.linksTouching(addr)) {
    const kind = classify(l);
    if (kind !== 'passage') continue;
    const linker = linkerOf(l, addr);
    if (linker === 'others' && !othersLet(r, l)) continue;
    if (!admitted(r, l)) continue;
    for (const { end, e } of endsIn(l, addr)) out.push(drawnEnd(l, addr, linker, end, e));
  }
  return out;
}

/** the links drawn at a span — a block's, or the selection's bytes (what a click there lists; the selection's slots count these alone) */
export function shownAt(/** @type {string} */ addr, /** @type {{pos: number, width: number}} */ span) {
  return shown(addr).filter((s) => s.pos < span.pos + span.width && span.pos < s.pos + s.width);
}

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
  for (const l of REC.linksTouching(addr)) {
    if (classify(l) !== 'passage') continue;
    const linker = linkerOf(l, addr);
    for (const { end, e } of endsIn(l, addr)) all.push(drawnEnd(l, addr, linker, end, e));
  }
  const none = hidden();
  return { shown: all, countAt: (block) => countUnder(none, addr, block) };
}

/**
 * The others' passage links touching a block that a reveal does not show,
 * and whether a social link touches the document.
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
    if (linkerOf(l, addr) !== 'others') continue;
    if (othersLet(r, l) && admitted(r, l)) continue;
    if (endsIn(l, addr).some(({ e }) => /** @type {number} */ (e.ordinal) < block.pos + block.width && block.pos < /** @type {number} */ (e.ordinal) + (e.positions || 1))) n++;
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
 * The mid connections among the documents the plane draws: one per pair of
 * PLACES they are drawn at (P44: one per document pair, with its count) —
 * `placeOf` names a document's place, its own box or the mark of the
 * continuation that holds it — its kind's form, hue the linker's — the
 * owner's and the person's own by default, others' where a document's toggle
 * is on. A link whose two ends stand at one place draws none.
 * @param {string[]} docsDrawn the documents drawn, whole or inside a mark
 * @param {(addr: string) => string} [placeOf] the place a document is drawn at; by default its own box
 * @returns {Connection[]}
 */
export function connections(docsDrawn, placeOf = (addr) => addr) {
  const set = new Set(docsDrawn);
  /** @type {Map<string, Connection>} */
  const pairs = new Map();
  for (const addr of docsDrawn) {
    const here = placeOf(addr);
    for (const s of shown(addr)) {
      if (!s.far || !set.has(s.far)) continue;
      const there = placeOf(s.far);
      if (there === here) continue;
      const key = [here, there].sort().join('|');
      const c = pairs.get(key);
      if (c) c.count++;
      else pairs.set(key, { a: here, b: there, kind: 'link', mark: s.mark, count: 1 });
    }
  }
  return [...pairs.values()];
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
export function _reset() { reveals.clear(); visitedSet.clear(); }
