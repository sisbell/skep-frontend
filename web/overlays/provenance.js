// O-PROV — provenance (the structure record §3.2; B1-S10). Layer 2.
// ENGINE-BOUND. State: none.
// "who wrote this?" — `show_origin` over the selected span's own bytes
// answers byte-granular through transclusion chains: the origin document(s);
// "who uses this?" — `find_docs_containing` over the same bytes names the
// documents whose arrangement holds the passage, short by a stated copy and
// by any document the reader may not read, which the blind-spot line says
// (C-72), every address either names in the identifier's face (P-REG's
// FACE). Each act takes the span it is asked over exactly (R11); asked by a
// position alone, it takes the block holding it, whole. The span is one of
// the text the page shows (T-LAYER's `shownOf`), a draft's with its
// page-local edits applied: it is split into runs (M-DERIVE's `spanRuns`), and
// the board is asked only about the bytes its base holds, by the base's
// positions and as of the read that base came from (`asOfBase`), a run at a
// time for the two past states the board rebuilds at once (wire.md §/op-at);
// bytes the page made are answered by the page, no read made. One answer
// covers the whole span where its runs agree, else each run is named by its
// first words (`stated`); a refused run among several, or a past state the
// board could not read for any run, says it cannot yet be answered there
// (`NOT_YET`). An origin and a container are each another arrangement of the
// passage's material, so each is a LEAP that carries the span asked over, by
// the base's positions — its first board run, where it holds several —
// re-projected and marked at the landing (N-GO; foundations §2.3; P43), whose
// line names it as what the reader selected where it is the selection's
// bytes, else as the text they were reading (FP-21); an origin read side by
// side with the span's document is a step on the trail from the span asked
// over, by identity (N-GO's `toScene`), its pane on the text the page shows
// of that document, set level with the span there. Each card takes the focus
// on its first act where a key made the act that asked — the slot's chord,
// Enter on its button — and never otherwise (D5 §4 rule 4; the focus record's
// rule 16). Each opens on its read (O-HOST's `opening`): where an act was
// made on the chrome while it read, nothing shows, a refusal's face included.
// A refusal's face is the act's answer, carrying the caption the card would
// have carried (O-FACES' `caption`): a `withheld` one the document-level
// withheld face of the document the board names, read for before it shows —
// the edition claims on it, which decide C-67's pointer (O-FACES' `prepare`),
// its act a LEAP from the span asked over. Faces: `too_much_coverage`. Each
// card stands at the span shown and leaves and returns with its place
// (FP-36): it shows naming what it is about (O-HOST's `about`) — the span
// asked over, by position and identity, and whether it was the selection's
// bytes — and a return asks it again over that span where its bytes stand
// then (`reopen`), taking the focus on the control it was left holding it on.
// Rules: FP-1, FP-2, FP-13, FP-20, FP-21, FP-36.

import * as HOST from './host.js';
import * as PUMP from '../model/pump.js';
import * as REC from '../model/records.js';
import * as F from '../model/frames.js';
import * as GO from '../nav/go.js';
import * as FACES from './faces.js';
import * as LAYER from '../text/layer.js';
import { t, tHTML, addressedHTML } from '../strings.js';
import { esc, fill } from '../util.js';
import { accountOf } from '../model/address.js';
import { spanRuns } from '../model/derive.js';

/** @typedef {import('../model/derive.js').SpanRun} SpanRun */
/** @typedef {import('../bridge/shapes').Refusal} Refusal */
/** @typedef {{ordinal: number, positions: number}} Positions a stretch's first position and its positions, of the text shown or of its base as a caller says */

/**
 * @typedef {Object} About — what a card is about (see the head)
 * @property {'wrote' | 'uses'} kind which card
 * @property {string} addr the span's document: the version its box showed
 * @property {number} pos the span's first position in the text the page shows of it
 * @property {number} width its positions
 * @property {import('../model/records.js').ISpan[]} ids its bytes by identity (T-LAYER's `shownIdentity`); none where the text shown holds no identity for them
 * @property {boolean} selected the span was the selection's bytes, which an act's landing names as what the reader selected
 */

/**
 * @typedef {Object} How — how a card is asked: the act's, or a return's
 * @property {boolean} byKey a key made the act: the card takes the focus on its first act
 * @property {string | null} focus a reopened card's control the focus was left on (O-HOST's `keyOf`): it takes the focus there
 * @property {import('./host.js').Left | null} left the card a return reopens, as the reader left it
 */

/**
 * @typedef {{run: SpanRun, is: 'new'} | {run: SpanRun, is: 'later'} | {run: SpanRun, is: 'board', answer: unknown}} RunAnswer — what one run of a span brought (see the head): the page's answer, none yet, or the board's
 */

/**
 * @typedef {Object} Reach — what the acts on a line of an answer take (see the head)
 * @property {Positions} carry the bytes of the base a LEAP carries
 * @property {boolean} selected they are the selection's bytes
 * @property {Positions} level the stretch of the text shown a read side by side is set level with
 */

/**
 * @typedef {Object} Line — one line of an answer
 * @property {string} id its string
 * @property {string} html its words, as markup
 * @property {string} inline the markup of its acts, on the line
 * @property {string} below the markup of its acts, beneath the line
 */

/** the refusals of a past state that could not be read: said at their run at any size, which no other refusal of a lone run is */
const NOT_YET = new Set(['history_busy', 'history_reclaimed']);

/**
 * The span asked over, of the text shown: the bytes named; with no width,
 * the block holding the position, whole (T-LAYER's `shownBlockOf`); a
 * position in no delivered block, one position.
 * @param {string} addr
 * @param {number} pos
 * @param {number | null} width
 * @returns {Positions}
 */
function spanOf(addr, pos, width) {
  if (width != null && width > 0) return { ordinal: pos, positions: width };
  const b = REC.has(addr) ? LAYER.shownBlockOf(addr, pos) : null;
  return b ? { ordinal: b.pos, positions: Math.max(1, b.width) } : { ordinal: pos, positions: 1 };
}

/** what a line's acts carry of a run: the bytes of its base; the run's own positions where it is the page's, whose lines hold no act */
const carryOf = (/** @type {RunAnswer} */ a) => ({ ordinal: a.run.base ?? a.run.pos, positions: a.run.width });

/**
 * The frame a board run asks by (see the head): as of the read its base came
 * from (`Doc.readAt`) where the document holds page-local edits; the frame
 * itself where it holds none or no read told that position.
 * @param {string} addr
 * @param {object} frame
 * @returns {object}
 */
function asOfBase(addr, frame) {
  const at = REC.edits(addr).length && REC.has(addr) ? REC.doc(addr).readAt : null;
  return at != null ? F.opAt(at, frame) : frame;
}

/**
 * A LEAP to another arrangement of the span's material — an origin, a
 * container — carrying the span (N-GO's carry) by the base's positions, made
 * at the span the card stands at, where the face of a failure known at the act
 * stands; the bytes the selection's where a width named them, which the
 * landing's line names as what the reader selected, else the block read
 * (FP-21).
 * @param {string} to
 * @param {string} addr the span's document
 * @param {Positions} carry the bytes carried, of the base (`Reach.carry`)
 * @param {{addr: string, pos: number, width: number}} site the span the card stands at
 * @param {boolean} selected the bytes are the selection's
 * @param {boolean} byKey a key made the act
 */
const carried = (to, addr, carry, site, selected, byKey) => GO.leapTo(to, { how: 'leap', byKey, carry: { addr, pos: carry.ordinal, width: carry.positions, selected }, site: { span: site } });

/** is the span asked over the selection's bytes, where the asker does not say — a width named — rather than the block a position names? */
const isSelection = (/** @type {number | null} */ width) => width != null && width > 0;

/**
 * An act's reads over a span's runs (see the head), one at a time: the
 * board's over each run its base holds, the page's over each it made; and
 * where the board refuses a lone run for anything but a past state it could
 * not read, the refusal, with the reads the face of the document it names is
 * made from (O-FACES' `prepare`) where it is `withheld`, asked while the
 * opening stands. Nothing is asked once the opening has ended.
 * @param {string} addr the document the act names
 * @param {SpanRun[]} runs the span's runs, in the text's order
 * @param {(base: number, width: number) => object} frameOf the question a run's bytes ask, by the base's positions
 * @returns {(stands: () => boolean) => Promise<{runs: RunAnswer[]} | {refused: Refusal} | null>}
 */
const asking = (addr, runs, frameOf) => async (stands) => {
  /** @type {RunAnswer[]} */
  const out = [];
  for (const run of runs) {
    if (run.base == null) { out.push({ run, is: 'new' }); continue; }
    if (!stands()) return null;
    const got = await PUMP.read(asOfBase(addr, frameOf(run.base, run.width)));
    if (!('refused' in got)) { out.push({ run, is: 'board', answer: got.answer }); continue; }
    if (runs.length > 1 || NOT_YET.has(got.refused.name)) { out.push({ run, is: 'later' }); continue; }
    if (got.refused.name === 'withheld' && stands()) await FACES.prepare(FACES.refusedDocument(got.refused, addr));
    return { refused: got.refused };
  }
  return { runs: out };
};

/** a line of the page's own words, with no act */
const plainly = (/** @type {string} */ id) => /** @type {Line} */ ({ id, html: esc(t(id)), inline: '', below: '' });

/**
 * What a card states of its runs (see the head): where all of them answer
 * alike, the one answer over the whole span, its acts reaching for its first
 * run's bytes and setting the whole span level; else each run's lines, named
 * by its first words (T-LAYER's `firstWords`), or its position where it holds
 * none, its acts reaching for that run alone.
 * @param {string} addr
 * @param {RunAnswer[]} answers never empty
 * @param {Positions} sp the span asked over, of the text shown
 * @param {boolean} selected the span is the selection's bytes
 * @param {(a: RunAnswer) => string} keyOf what a run's answer amounts to, for the comparing
 * @param {(a: RunAnswer, reach: Reach, key: string) => Line[]} linesOf the lines a run's answer states, `key` keeping its acts' names apart
 * @returns {string}
 */
function stated(addr, answers, sp, selected, keyOf, linesOf) {
  const [first] = answers;
  if (answers.every((a) => keyOf(a) === keyOf(first))) {
    return linesOf(first, { carry: carryOf(first), selected: answers.length === 1 && selected, level: sp }, '').map((l) => `<div class="answer" data-string="${l.id}">${l.html}${l.inline}</div>${l.below}`).join('');
  }
  return answers.flatMap((a, k) => {
    const words = LAYER.firstWords(addr, a.run.pos, a.run.width) || t('F.position', { p: a.run.pos });
    return linesOf(a, { carry: carryOf(a), selected: false, level: { ordinal: a.run.pos, positions: a.run.width } }, `${k}_`)
      .map((l) => `<div class="answer" data-string="L.run.named">${fill(esc(t('L.run.named')), { words: esc(words), answer: l.html })}${l.inline}${l.below}</div>`);
  }).join('');
}

/** what a board run's addresses amount to, for the comparing (`stated`): the same documents, whatever their order */
const addressesKey = (/** @type {string[]} */ addrs) => `board ${[...addrs].sort().join(' ')}`;

/**
 * What a refusal's face at a card's span is handed (see the head): the
 * card's caption, the act's; C-67's pointer's act, a LEAP to the edition
 * from the span asked over.
 * @param {string} caption
 * @param {{span: {addr: string, pos: number, width: number}}} anchor
 * @returns {import('./faces.js').Asked}
 */
const answering = (caption, anchor) => ({ caption, follow: (home, byKey) => { void GO.leapTo(home, { how: 'leap', byKey, site: anchor }); } });

/** a card's own focus and what it is about, as `HOST.show` takes them (see the head): the focus on its first act where a key asked, on the control a return reopens it holding it on */
const shownAs = (/** @type {About} */ about, /** @type {How} */ how) => ({ takeFocus: how.byKey || how.focus != null, first: how.focus != null ? HOST.controlOf(how.focus) : undefined, about });

/** what a card asked over a span is about (`About`): the span, by position and identity */
const aboutOf = (/** @type {'wrote' | 'uses'} */ kind, /** @type {string} */ addr, /** @type {Positions} */ sp, /** @type {boolean} */ selected) =>
  /** @type {About} */ ({ kind, addr, pos: sp.ordinal, width: sp.positions, ids: LAYER.shownIdentity(addr, sp.ordinal, sp.positions), selected });

/**
 * A card asked again on a return to its place (see the head; N-GO's), over
 * the span its bytes hold now (`at`, the landing rule's placing), its read
 * made again, taking the focus on the control it was left holding it on.
 * @param {{about: About, focus: string | null}} left
 * @param {{addr: string, pos: number, width: number}} at
 * @returns {Promise<void>} settled once the card or its face shows, or nothing will
 */
export function reopen(left, at) {
  const sp = { ordinal: at.pos, positions: Math.max(1, at.width) }, how = { byKey: false, focus: left.focus, left };
  return left.about.kind === 'wrote' ? wroteOver(at.addr, sp, left.about.selected, how) : usesOver(at.addr, sp, left.about.selected, how);
}

/**
 * who wrote this? (A-41, R29)
 * @param {string} addr
 * @param {number} pos the span's first position, of the text shown
 * @param {number | null} [width] the span's positions; null asks over the block holding `pos`
 * @param {boolean} [byKey] a key made the act: the card takes the focus on its first act
 * @param {boolean} [selected] the span is the selection's bytes (`About.selected`); by default, where a width names it (`isSelection`)
 * @returns {Promise<void>} settled once the card or its face shows, or nothing will
 */
export function wrote(addr, pos, width = null, byKey = false, selected = isSelection(width)) {
  return wroteOver(addr, spanOf(addr, pos, width), selected, { byKey, focus: null, left: null });
}

/**
 * who wrote this? over a span (`wrote`, `reopen`).
 * @param {string} addr
 * @param {Positions} sp the span asked over, of the text shown
 * @param {boolean} selected it is the selection's bytes
 * @param {How} how
 * @returns {Promise<void>}
 */
function wroteOver(addr, sp, selected, how) {
  const anchor = { span: { addr, pos: sp.ordinal, width: sp.positions } };
  const caption = `${t('B1.who-wrote')} · ${addr} · ${t('F.position', { p: sp.ordinal })}`;
  return HOST.opening(asking(addr, spanRuns(REC.edits(addr), sp.ordinal, sp.positions), (base, width) => F.showOrigin(addr, base, width)), (out) => {
    if ('refused' in out) { FACES.showRefusal(anchor, out.refused, addr, answering(caption, anchor)); return; }
    /** @type {Record<string, import('./host.js').Act>} */
    const acts = {};
    const lines = (/** @type {RunAnswer} */ a, /** @type {Reach} */ reach, /** @type {string} */ key) => {
      if (a.is !== 'board') return [plainly(a.is === 'new' ? 'L.new.wrote' : 'L.run.not-yet')];
      return F.decodeAddrs(a.answer).map((o, i) => {
        const owner = REC.doc(o).meta ? REC.doc(o).meta?.owner : accountOf(o);
        const same = o !== addr, id = same ? 'B1.wrote' : 'B1.wrote.here', src = `src${key}${i}`, beside = `beside${key}${i}`;
        const named = { owner: owner || '', account: owner || '', origin: o }, ids = { owner: 'id', account: 'id', origin: 'id' };
        if (same) {
          acts[src] = (_el, byKey) => carried(o, addr, reach.carry, anchor.span, reach.selected, byKey);
          acts[beside] = () => GO.toScene(LAYER.paneSource(addr), o, { posA: reach.level.ordinal, widthA: reach.level.positions, posB: null }, { from: { passage: { addr, pos: reach.carry.ordinal, width: reach.carry.positions } }, site: anchor });
        }
        return /** @type {Line} */ ({ id, html: tHTML(id, named, ids), inline: same ? ` <button class="id" data-run="${src}">${esc(o)}</button><button data-run="${beside}">${esc(t('B1.side-by-side'))}</button>` : '', below: '' });
      });
    };
    const html = `<span class="label">${addressedHTML(caption)}</span>` + stated(addr, out.runs, sp, selected, (a) => (a.is === 'board' ? addressesKey(F.decodeAddrs(a.answer)) : a.is), lines);
    HOST.show({ kind: 'card', id: 'provenance:wrote', anchor, html, acts, ...shownAs(aboutOf('wrote', addr, sp, selected), how) });
  }, how.left);
}

/**
 * who uses this? (A-44, R30) with its blind spots stated (C-72)
 * @param {string} addr
 * @param {number} pos the span's first position, of the text shown
 * @param {number | null} [width] the span's positions; null asks over the block holding `pos`
 * @param {boolean} [byKey] a key made the act: the card takes the focus on its first act
 * @param {boolean} [selected] the span is the selection's bytes (`About.selected`); by default, where a width names it (`isSelection`)
 * @returns {Promise<void>} settled once the card or its face shows, or nothing will
 */
export function uses(addr, pos, width = null, byKey = false, selected = isSelection(width)) {
  return usesOver(addr, spanOf(addr, pos, width), selected, { byKey, focus: null, left: null });
}

/**
 * who uses this? over a span (`uses`, `reopen`), its blind spots stated
 * (C-72) wherever the board was asked.
 * @param {string} addr
 * @param {Positions} sp the span asked over, of the text shown
 * @param {boolean} selected it is the selection's bytes
 * @param {How} how
 * @returns {Promise<void>}
 */
function usesOver(addr, sp, selected, how) {
  const anchor = { span: { addr, pos: sp.ordinal, width: sp.positions } };
  const caption = `${t('B1.who-uses')} · ${addr} · ${t('F.position', { p: sp.ordinal })}`;
  const usersOf = (/** @type {unknown} */ answer) => F.decodeAddrs(answer).filter((u) => u !== addr);
  return HOST.opening(asking(addr, spanRuns(REC.edits(addr), sp.ordinal, sp.positions), (base, width) => F.findDocsContaining([{ doc: addr, spans: [{ ordinal: base, positions: width }] }])), (out) => {
    if ('refused' in out) { FACES.showRefusal(anchor, out.refused, addr, answering(caption, anchor)); return; }
    /** @type {Record<string, import('./host.js').Act>} */
    const acts = {};
    const lines = (/** @type {RunAnswer} */ a, /** @type {Reach} */ reach, /** @type {string} */ key) => {
      if (a.is !== 'board') return [plainly(a.is === 'new' ? 'L.new.uses' : 'L.run.not-yet')];
      const users = usersOf(a.answer);
      users.forEach((u, i) => { acts[`u${key}${i}`] = (_el, byKey) => carried(u, addr, reach.carry, anchor.span, reach.selected, byKey); });
      return [/** @type {Line} */ ({ id: users.length ? 'B1.uses' : 'B1.uses.none', html: addressedHTML(users.length ? t('B1.uses', { documents: users.join(', ') }) : t('B1.uses.none')), inline: '', below: users.length ? `<div class="acts">${users.map((u, i) => `<button class="id" data-run="u${key}${i}">${esc(u)}</button>`).join('')}</div>` : '' })];
    };
    const html = `<span class="label">${addressedHTML(caption)}</span>` + stated(addr, out.runs, sp, selected, (a) => (a.is === 'board' ? addressesKey(usersOf(a.answer)) : a.is), lines) +
      (out.runs.some((a) => a.is === 'board') ? `<div class="clause" data-string="B1.C-72">${esc(t('B1.C-72'))}</div>` : '');
    HOST.show({ kind: 'card', id: 'provenance:uses', anchor, html, acts, ...shownAs(aboutOf('uses', addr, sp, selected), how) });
  }, how.left);
}
