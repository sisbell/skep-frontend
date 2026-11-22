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
// page-local edits applied: it is split into runs (T-LAYER's `shownRuns`), and
// the board is asked only about bytes it holds, by a name it resolves to
// those same bytes — the bytes the model's text holds by that text's
// positions, as of the read it came from (`asOfBase`), a run at a time for the
// two past states the board rebuilds at once (wire.md §/op-at); bytes the page
// made and the board has minted, where only the board knows the answer, by
// their permanent address, carried to a position through the draft's image
// read then and asked as of that read (`byIdentity`). The page answers for
// its own words itself, at once and with no read: who wrote them, whether
// minted or not — where they are not minted, typed while the draft was held,
// not placed, where a line of it stands held moved (D6 BM-14), else held on
// this device where it holds a line the board has not kept (`wroteNew`) —
// and, while the board has not minted them, that no other document uses
// them. No answer waits for a
// burst, and none stands inert under a hold. One answer
// covers the whole span where its runs agree, else each run is named by its
// first words (`stated`); a refused run among several, or a past state the
// board could not read for any run, says it cannot yet be answered there
// (`NOT_YET`). An origin and a container are each another arrangement of the
// passage's material, so each is a LEAP that carries the span asked over —
// its first board run, where it holds several —
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
// Asked at a reading scene's pane (O-SELECTION's; `Pane`), a card is asked
// over the text that pane shows and stands in its article: a draft's editor
// and a text it reads as the plane's runs; a past state's whole as one board
// run, asked as of the position the state stands at (wire.md §/op-at); the
// held version's words the board has not minted answered by the page
// (`wroteNew`) and the rest asked by identity (`byIdentity`), as minted words
// are; its lines' words, its acts' carries and its sides by side named
// through the pane's image, never the plane's text, and what it is about
// naming the pane, which N-GO keeps no place of (`About.site`).
// Rules: FP-1, FP-2, FP-10, FP-13, FP-20, FP-21, FP-36.

import * as HOST from './host.js';
import * as PUMP from '../model/pump.js';
import * as REC from '../model/records.js';
import * as WRITE from '../write/write.js';
import * as MACHINE from '../write/machine.js';
import * as F from '../model/frames.js';
import * as GO from '../nav/go.js';
import * as FACES from './faces.js';
import * as LAYER from '../text/layer.js';
import { t, tHTML, addressedHTML } from '../strings.js';
import { esc, fill } from '../util.js';
import { accountOf } from '../model/address.js';

/** @typedef {import('../text/layer.js').ShownRun} SpanRun */
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
 * @property {'a' | 'b'} [site] the reading scene's pane it was asked at (`Pane`); none on the plane
 */

/**
 * @typedef {Object} Pane — a reading scene's pane a card is asked at (O-SELECTION's; see the head)
 * @property {'a' | 'b'} side
 * @property {'editor' | 'past' | 'held' | 'read'} kind what text it holds (SC's `PaneSite.kind`)
 * @property {import('../model/records.js').Doc} d the record its text was made from
 */

/** @typedef {SpanRun & {id?: import('../model/records.js').ISpan}} Run a run of the span asked over: one of the text shown (`SpanRun`), or one of the held version's board bytes, which it names by identity (`id`) */

/**
 * @typedef {Object} How — how a card is asked: the act's, or a return's
 * @property {boolean} byKey a key made the act: the card takes the focus on its first act
 * @property {string | null} focus a reopened card's control the focus was left on (O-HOST's `keyOf`): it takes the focus there
 * @property {import('./host.js').Left | null} left the card a return reopens, as the reader left it
 */

/**
 * @typedef {{run: Run, is: 'new'} | {run: Run, is: 'later'} | {run: Run, is: 'board', answer: unknown}} RunAnswer — what one run of a span brought (see the head): the page's answer, none yet, or the board's
 */

/**
 * @typedef {Object} Reach — what the acts on a line of an answer take (see the head)
 * @property {Positions} carry the stretch of the text shown a LEAP carries, as the card opened
 * @property {boolean} selected they are the selection's bytes
 * @property {Positions} level the stretch of the text shown a read side by side is set level with, as the card opened
 */

/**
 * A stretch of the text shown held for a card's act (see the head): its
 * bytes by identity as the card opens, so the act names the same words
 * wherever the person's edits have moved them since — the span they hold in
 * the text shown as the act is made, from their first stretch to the end of
 * their last; the stretch as it stood where they were not named or none
 * stands. At a reading scene's pane no edit of the person's moves — a past
 * state, the held version, a text it reads — the stretch as it stood.
 * @param {string} addr
 * @param {Positions} sp
 * @param {Pane | null} [pane]
 * @returns {() => Positions}
 */
function heldFor(addr, sp, pane = null) {
  if (pane && pane.kind !== 'editor') return () => sp;
  const ids = LAYER.shownIdentity(addr, sp.ordinal, sp.positions);
  return () => {
    const now = ids.length ? LAYER.placedShown(addr, ids) : [];
    return now.length ? { ordinal: now[0].pos, positions: now[now.length - 1].pos + now[now.length - 1].width - now[0].pos } : sp;
  };
}

/** @typedef {{addr: string, pos: number, width: number, site?: 'a' | 'b'}} At a span a card stands at, at its site: a reading scene's pane where one is named (O-HOST's `Anchor.span`) */

/** the span a card stands at as an act on it is made: where O-HOST stands it now, moved with its subject's bytes (N-GO's), else as it opened — at its site */
function siteNow(/** @type {{span: At}} */ anchor) {
  const o = HOST.currentState(), at = o && o.anchor && o.anchor.span;
  return at && at.addr === anchor.span.addr && at.width != null ? { ...anchor.span, pos: at.pos, width: at.width } : anchor.span;
}

/** where a card asked at a pane stands (`At`): the span at the pane's site, none on the plane */
const anchorOf = (/** @type {string} */ addr, /** @type {Positions} */ sp, /** @type {Pane | null} */ pane) => ({ span: /** @type {At} */ ({ addr, pos: sp.ordinal, width: sp.positions, ...(pane ? { site: pane.side } : {}) }) });

/** a stretch of a pane's text by its bytes, through the image its record holds (M-REC's `identityIn`): what an act from a pane names its words by (N-GO's `Carry.ids`, SC's `Held.ids`); none on the plane and at a draft's editor, whose text is the text shown */
const paneIds = (/** @type {Pane | null} */ pane, /** @type {Positions} */ sp) => (pane && pane.kind !== 'editor' ? REC.identityIn(pane.d.image, sp.ordinal, sp.positions) : null);

/** the text a side by side from a card at a pane opens its first pane on (SC's `Source`): the record the pane shows where the page derived it, else the text the page shows of the document (T-LAYER's `paneSource`) */
const sourceOf = (/** @type {string} */ addr, /** @type {Pane | null} */ pane) => (pane && pane.kind !== 'editor' && pane.d.derived ? pane.d : LAYER.paneSource(addr));

/**
 * The runs of the span a card is asked over (see the head): of the text shown
 * (T-LAYER's `shownRuns`) on the plane, at a draft's editor and at a text a
 * pane reads; a past state's whole as one board run, its positions the
 * state's; the held version's by its record's image — the page's own words
 * one run each, every other run named by identity (`Run.id`) — one run asked
 * of none where that image does not cover the span.
 * @param {string} addr
 * @param {Positions} sp
 * @param {Pane | null} pane
 * @returns {Run[]}
 */
function runsOf(addr, sp, pane) {
  if (!pane || pane.kind === 'editor' || pane.kind === 'read') return LAYER.shownRuns(addr, sp.ordinal, sp.positions);
  if (pane.kind === 'past') return [{ pos: sp.ordinal, width: sp.positions, base: sp.ordinal, made: false, minted: null }];
  /** @type {Run[]} */
  const out = [];
  let at = sp.ordinal;
  for (const id of REC.identityIn(pane.d.image, sp.ordinal, sp.positions)) {
    const page = REC.isPage(id.prefix), last = out[out.length - 1];
    if (page && last && last.made && last.pos + last.width === at) last.width += id.width;
    else out.push(page ? { pos: at, width: id.width, base: null, made: true, minted: null } : { pos: at, width: id.width, base: null, made: false, minted: null, id });
    at += id.width;
  }
  return out.length ? out : [{ pos: sp.ordinal, width: sp.positions, base: null, made: false, minted: null }];
}

/** the position a past state stands at, whose board runs a card at its pane is asked as of (wire.md §/op-at); null everywhere else */
const pastAt = (/** @type {Pane | null} */ pane) => (pane && pane.kind === 'past' && pane.d.derived && pane.d.derived.at != null ? pane.d.derived.at : null);

/** the first words of a stretch of the text a card is asked over (T-LAYER's `firstWords`): a reading scene's pane's own record's where it is asked at one */
const wordsOf = (/** @type {string} */ addr, /** @type {Pane | null} */ pane) => (/** @type {number} */ pos, /** @type {number} */ width) =>
  (pane ? LAYER.firstWordsOf(REC.textOf(pane.d.runs, pos, pos + width)) : LAYER.firstWords(addr, pos, width));

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
 * the block of that text holding the position, whole (T-LAYER's `blockAt`) —
 * of a reading scene's pane's own record where it is asked at one; a
 * position in no block, one position.
 * @param {string} addr
 * @param {number} pos
 * @param {number | null} width
 * @param {Pane | null} [pane]
 * @returns {Positions}
 */
function spanOf(addr, pos, width, pane = null) {
  if (width != null && width > 0) return { ordinal: pos, positions: width };
  const b = pane ? REC.blockIn(pane.d.blocks, pos) : LAYER.blockAt(addr, pos);
  return b ? { ordinal: b.pos, positions: Math.max(1, b.width) } : { ordinal: pos, positions: 1 };
}

/** what a line's acts carry of a run: its stretch of the text shown, which N-GO names by its bytes */
const carryOf = (/** @type {RunAnswer} */ a) => ({ ordinal: a.run.pos, positions: a.run.width });

/**
 * The frame a board run asks by (see the head): as of the read its base came
 * from (`Doc.readAt`) where the document holds page-local edits; the frame
 * itself where it holds none or no read told that position.
 * @param {string} addr
 * @param {object} frame
 * @returns {object}
 */
function asOfBase(addr, frame) {
  const at = WRITE.edits(addr).length && REC.has(addr) ? REC.doc(addr).readAt : null;
  return at != null ? F.opAt(at, frame) : frame;
}

/**
 * A LEAP to another arrangement of the span's material — an origin, a
 * container — carrying the span (N-GO's carry), made
 * at the span the card stands at, where the face of a failure known at the act
 * stands; the bytes the selection's where a width named them, which the
 * landing's line names as what the reader selected, else the block read
 * (FP-21).
 * @param {string} to
 * @param {string} addr the span's document
 * @param {Positions} carry the bytes carried, a stretch of the text shown (`Reach.carry`)
 * @param {At} site the span the card stands at
 * @param {boolean} selected the bytes are the selection's
 * @param {boolean} byKey a key made the act
 * @param {Pane | null} [pane] the reading scene's pane the card was asked at: the bytes named by identity through its image (`paneIds`)
 */
const carried = (to, addr, carry, site, selected, byKey, pane = null) => {
  const ids = paneIds(pane, carry);
  return GO.leapTo(to, { how: 'leap', byKey, carry: { addr, pos: carry.ordinal, width: carry.positions, selected, ...(ids ? { ids: [ids] } : {}) }, site: { span: site } });
};

/** is the span asked over the selection's bytes, where the asker does not say — a width named — rather than the block a position names? */
const isSelection = (/** @type {number | null} */ width) => width != null && width > 0;

/**
 * A question asked about bytes the page made that the board has minted, by
 * their identity (see the head): the draft's image read now carries their
 * permanent address to the position it stands at as of that read, and the
 * question is asked there, as of the same read. Null where that image places
 * them nowhere, or not in one stretch — the board's text no longer holds them
 * as the page shows them — which the card says it cannot yet answer.
 * @param {string} addr the draft
 * @param {{prefix: string, ordinal: number, width: number}} m the run, by its first permanent address and its width — minted bytes, or the held version's board bytes
 * @param {(pos: number, width: number) => object} frameOf the question, by positions
 * @returns {Promise<{answer: unknown} | {refused: Refusal} | null>}
 */
async function byIdentity(addr, m, frameOf) {
  const whole = await PUMP.extentOf(addr);
  if ('refused' in whole) return whole;
  const im = whole.extent > 0 ? await PUMP.read(F.image(addr, 1, whole.extent)) : null;
  if (!im) return null;
  if ('refused' in im) return im;
  let pos = 1, at = null;
  for (const r of F.decodeRuns(im.answer)) {
    const i = REC.iSpanOf(r);
    if (i.prefix === m.prefix && i.ordinal <= m.ordinal && m.ordinal + m.width <= i.ordinal + i.width) { at = pos + (m.ordinal - i.ordinal); break; }
    pos += r.width;
  }
  if (at == null) return null;
  const asOf = /** @type {{as_of?: unknown}} */ (im.answer).as_of, frame = frameOf(at, m.width);
  return PUMP.read(typeof asOf === 'number' ? F.opAt(asOf, frame) : frame);
}

/**
 * An act's reads over a span's runs (see the head), one at a time: the
 * board's over each run it holds — a run of the model's text by that text's
 * positions (`asOfBase`), a run the page made and the board minted, where the
 * page does not answer for it itself, by identity (`byIdentity`) — and the
 * page's own over every other; and where the board refuses a lone run for
 * anything but a past state it could not read, the refusal, with the reads
 * the face of the document it names is made from (O-FACES' `prepare`) where
 * it is `withheld`, asked while the opening stands. Nothing is asked once the
 * opening has ended. A past state's board runs are asked as of the position
 * it stands at (`at`); the held version's by identity (`Run.id`); a run
 * neither the model's text nor an identity names answers none yet.
 * @param {string} addr the document the act names
 * @param {Run[]} runs the span's runs, in the text's order
 * @param {(base: number, width: number) => object} frameOf the question a run's bytes ask, by positions
 * @param {boolean} minted the page answers for the bytes it made once the board has minted them too: true where the answer is the page's own whatever the board holds, false where only the board knows it from then on
 * @param {number | null} [at] the position a past state stands at, its runs asked as of it (`pastAt`); null for every other text
 * @returns {(stands: () => boolean) => Promise<{runs: RunAnswer[]} | {refused: Refusal} | null>}
 */
const asking = (addr, runs, frameOf, minted, at = null) => async (stands) => {
  /** @type {RunAnswer[]} */
  const out = [];
  for (const run of runs) {
    if (run.made && (minted || !run.minted)) { out.push({ run, is: 'new' }); continue; }
    if (!run.minted && !run.id && run.base == null) { out.push({ run, is: 'later' }); continue; }
    if (!stands()) return null;
    const byId = run.minted || run.id;
    const got = byId ? await byIdentity(addr, byId, frameOf) : await PUMP.read(at != null ? F.opAt(at, frameOf(/** @type {number} */ (run.base), run.width)) : asOfBase(addr, frameOf(/** @type {number} */ (run.base), run.width)));
    if (got && !('refused' in got)) { out.push({ run, is: 'board', answer: got.answer }); continue; }
    if (!got || runs.length > 1 || NOT_YET.has(got.refused.name)) { out.push({ run, is: 'later' }); continue; }
    if (got.refused.name === 'withheld' && stands()) await FACES.prepare(FACES.refusedDocument(got.refused, addr));
    return { refused: got.refused };
  }
  return { runs: out };
};

/**
 * Who wrote a run of new words, in the page's own words (see the head): where
 * the board has not minted them and a line of the draft stands held moved
 * (W-MACHINE's `isMoved`), the moved face's word — typed while the draft was
 * held, not placed (D6 BM-14; B3-S2); where it has not and the draft holds
 * any other line the board has not kept, held on this device; else from this
 * device. Its string's id, and the values its tokens are filled with.
 * @param {string} addr
 * @param {SpanRun} run
 * @returns {{id: string, values: Record<string, string>}}
 */
function wroteNew(addr, run) {
  if (!run.minted && WRITE.heldOf(addr).some(MACHINE.isMoved)) return { id: 'B3.held-version.new', values: { label: LAYER.boxName(addr).name } };
  return { id: !run.minted && LAYER.holding(addr) ? 'L.new.wrote.held' : 'L.new.wrote', values: {} };
}

/** a line of the page's own words, with no act: its string's, each token filled with the client's words (ST's `tHTML`) */
const plainly = (/** @type {string} */ id, /** @type {Record<string, string>} */ values = {}) => /** @type {Line} */ ({ id, html: tHTML(id, values), inline: '', below: '' });

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
 * @param {(pos: number, width: number) => string} [words] a run's first words: of the text the span was asked in (`wordsOf`)
 * @returns {string}
 */
function stated(addr, answers, sp, selected, keyOf, linesOf, words = (pos, width) => LAYER.firstWords(addr, pos, width)) {
  const [first] = answers;
  if (answers.every((a) => keyOf(a) === keyOf(first))) {
    return linesOf(first, { carry: carryOf(first), selected: answers.length === 1 && selected, level: sp }, '').map((l) => `<div class="answer" data-string="${l.id}">${l.html}${l.inline}</div>${l.below}`).join('');
  }
  return answers.flatMap((a, k) => {
    const named = words(a.run.pos, a.run.width) || t('F.position', { p: a.run.pos });
    return linesOf(a, { carry: carryOf(a), selected: false, level: { ordinal: a.run.pos, positions: a.run.width } }, `${k}_`)
      .map((l) => `<div class="answer" data-string="L.run.named">${fill(esc(t('L.run.named')), { words: esc(named), answer: l.html })}${l.inline}${l.below}</div>`);
  }).join('');
}

/** what a board run's addresses amount to, for the comparing (`stated`): the same documents, whatever their order */
const addressesKey = (/** @type {string[]} */ addrs) => `board ${[...addrs].sort().join(' ')}`;

/**
 * What a refusal's face at a card's span is handed (see the head): the
 * card's caption, the act's; C-67's pointer's act, a LEAP to the edition
 * from the span asked over.
 * @param {string} caption
 * @param {{span: At}} anchor
 * @returns {import('./faces.js').Asked}
 */
const answering = (caption, anchor) => ({ caption, follow: (home, byKey) => { void GO.leapTo(home, { how: 'leap', byKey, site: anchor }); } });

/** a card's own focus and what it is about, as `HOST.show` takes them (see the head): the focus on its first act where a key asked, on the control a return reopens it holding it on */
const shownAs = (/** @type {About} */ about, /** @type {How} */ how) => ({ takeFocus: how.byKey || how.focus != null, first: how.focus != null ? HOST.controlOf(how.focus) : undefined, about });

/** what a card asked over a span is about (`About`): the span, by position and identity — through the image of the pane it was asked at, naming that pane (`paneIds`) */
const aboutOf = (/** @type {'wrote' | 'uses'} */ kind, /** @type {string} */ addr, /** @type {Positions} */ sp, /** @type {boolean} */ selected, /** @type {Pane | null} */ pane = null) =>
  /** @type {About} */ ({ kind, addr, pos: sp.ordinal, width: sp.positions, ids: paneIds(pane, sp) ?? LAYER.shownIdentity(addr, sp.ordinal, sp.positions), selected, ...(pane ? { site: pane.side } : {}) });

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
 * @param {Pane | null} [pane] the reading scene's pane it is asked at (see the head); none on the plane
 * @returns {Promise<void>} settled once the card or its face shows, or nothing will
 */
export function wrote(addr, pos, width = null, byKey = false, selected = isSelection(width), pane = null) {
  return wroteOver(addr, spanOf(addr, pos, width, pane), selected, { byKey, focus: null, left: null }, pane);
}

/**
 * who wrote this? over a span (`wrote`, `reopen`).
 * @param {string} addr
 * @param {Positions} sp the span asked over, of the text shown
 * @param {boolean} selected it is the selection's bytes
 * @param {How} how
 * @param {Pane | null} [pane] the reading scene's pane it is asked at (see the head)
 * @returns {Promise<void>}
 */
function wroteOver(addr, sp, selected, how, pane = null) {
  const anchor = anchorOf(addr, sp, pane);
  const caption = `${t('B1.who-wrote')} · ${addr} · ${t('F.position', { p: sp.ordinal })}`;
  return HOST.opening(asking(addr, runsOf(addr, sp, pane), (base, width) => F.showOrigin(addr, base, width), true, pastAt(pane)), (out) => {
    if ('refused' in out) { FACES.showRefusal(anchor, out.refused, addr, answering(caption, anchor)); return; }
    /** @type {Record<string, import('./host.js').Act>} */
    const acts = {};
    const lines = (/** @type {RunAnswer} */ a, /** @type {Reach} */ reach, /** @type {string} */ key) => {
      if (a.is === 'new') { const w = wroteNew(addr, a.run); return [plainly(w.id, w.values)]; }
      if (a.is !== 'board') return [plainly('L.run.not-yet')];
      return F.decodeAddrs(a.answer).map((o, i) => {
        const owner = REC.doc(o).meta ? REC.doc(o).meta?.owner : accountOf(o);
        const same = o !== addr, id = same ? 'B1.wrote' : 'B1.wrote.here', src = `src${key}${i}`, beside = `beside${key}${i}`;
        const named = { owner: owner || '', account: owner || '', origin: o }, ids = { owner: 'id', account: 'id', origin: 'id' };
        if (same) {
          const carry = heldFor(addr, reach.carry, pane), level = heldFor(addr, reach.level, pane);
          acts[src] = (_el, byKey) => carried(o, addr, carry(), siteNow(anchor), reach.selected, byKey, pane);
          acts[beside] = () => {
            const c = carry(), l = level(), held = paneIds(pane, l);
            return GO.toScene(sourceOf(addr, pane), o, { posA: l.ordinal, widthA: l.positions, posB: null, ...(held ? { ids: held } : {}) }, { from: { passage: { addr, pos: c.ordinal, width: c.positions } }, site: { span: siteNow(anchor) } });
          };
        }
        return /** @type {Line} */ ({ id, html: tHTML(id, named, ids), inline: same ? ` <button class="id" data-run="${src}">${esc(o)}</button><button data-run="${beside}">${esc(t('B1.side-by-side'))}</button>` : '', below: '' });
      });
    };
    const html = `<span class="label">${addressedHTML(caption)}</span>` + stated(addr, out.runs, sp, selected, (a) => (a.is === 'board' ? addressesKey(F.decodeAddrs(a.answer)) : a.is === 'new' ? wroteNew(addr, a.run).id : a.is), lines, wordsOf(addr, pane));
    HOST.show({ kind: 'card', id: 'provenance:wrote', anchor, html, acts, ...shownAs(aboutOf('wrote', addr, sp, selected, pane), how) });
  }, how.left);
}

/**
 * who uses this? (A-44, R30) with its blind spots stated (C-72)
 * @param {string} addr
 * @param {number} pos the span's first position, of the text shown
 * @param {number | null} [width] the span's positions; null asks over the block holding `pos`
 * @param {boolean} [byKey] a key made the act: the card takes the focus on its first act
 * @param {boolean} [selected] the span is the selection's bytes (`About.selected`); by default, where a width names it (`isSelection`)
 * @param {Pane | null} [pane] the reading scene's pane it is asked at (see the head); none on the plane
 * @returns {Promise<void>} settled once the card or its face shows, or nothing will
 */
export function uses(addr, pos, width = null, byKey = false, selected = isSelection(width), pane = null) {
  return usesOver(addr, spanOf(addr, pos, width, pane), selected, { byKey, focus: null, left: null }, pane);
}

/**
 * who uses this? over a span (`uses`, `reopen`), its blind spots stated
 * (C-72) wherever the board was asked.
 * @param {string} addr
 * @param {Positions} sp the span asked over, of the text shown
 * @param {boolean} selected it is the selection's bytes
 * @param {How} how
 * @param {Pane | null} [pane] the reading scene's pane it is asked at (see the head)
 * @returns {Promise<void>}
 */
function usesOver(addr, sp, selected, how, pane = null) {
  const anchor = anchorOf(addr, sp, pane);
  const caption = `${t('B1.who-uses')} · ${addr} · ${t('F.position', { p: sp.ordinal })}`;
  const usersOf = (/** @type {unknown} */ answer) => F.decodeAddrs(answer).filter((u) => u !== addr);
  /** is a run's answer the page's own words for none: new words the board has not minted, or minted ones the board names no other document for — the same words on both sides of the ack */
  const none = (/** @type {RunAnswer} */ a) => a.is === 'new' || (a.is === 'board' && a.run.made && !usersOf(a.answer).length);
  return HOST.opening(asking(addr, runsOf(addr, sp, pane), (base, width) => F.findDocsContaining([{ doc: addr, spans: [{ ordinal: base, positions: width }] }]), false, pastAt(pane)), (out) => {
    if ('refused' in out) { FACES.showRefusal(anchor, out.refused, addr, answering(caption, anchor)); return; }
    /** @type {Record<string, import('./host.js').Act>} */
    const acts = {};
    const lines = (/** @type {RunAnswer} */ a, /** @type {Reach} */ reach, /** @type {string} */ key) => {
      if (none(a)) return [plainly('L.new.uses')];
      if (a.is !== 'board') return [plainly('L.run.not-yet')];
      const users = usersOf(a.answer);
      const carry = heldFor(addr, reach.carry, pane);
      users.forEach((u, i) => { acts[`u${key}${i}`] = (_el, byKey) => carried(u, addr, carry(), siteNow(anchor), reach.selected, byKey, pane); });
      return [/** @type {Line} */ ({ id: users.length ? 'B1.uses' : 'B1.uses.none', html: addressedHTML(users.length ? t('B1.uses', { documents: users.join(', ') }) : t('B1.uses.none')), inline: '', below: users.length ? `<div class="acts">${users.map((u, i) => `<button class="id" data-run="u${key}${i}">${esc(u)}</button>`).join('')}</div>` : '' })];
    };
    const html = `<span class="label">${addressedHTML(caption)}</span>` + stated(addr, out.runs, sp, selected, (a) => (none(a) ? 'new' : a.is === 'board' ? addressesKey(usersOf(a.answer)) : a.is), lines, wordsOf(addr, pane)) +
      (out.runs.some((a) => a.is === 'board' && !none(a)) ? `<div class="clause" data-string="B1.C-72">${esc(t('B1.C-72'))}</div>` : '');
    HOST.show({ kind: 'card', id: 'provenance:uses', anchor, html, acts, ...shownAs(aboutOf('uses', addr, sp, selected, pane), how) });
  }, how.left);
}
