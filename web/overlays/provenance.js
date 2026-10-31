// O-PROV — provenance (the structure record §3.2; B1-S10). Layer 2.
// ENGINE-BOUND. State: none.
// "who wrote this?" — `show_origin` over the selected span's own bytes
// answers byte-granular through transclusion chains: the origin document(s);
// "who uses this?" — `find_docs_containing` over the same bytes names the
// documents whose arrangement holds the passage, short by a stated copy and
// by any document the reader may not read, which the blind-spot line says
// (C-72), every address either names in the identifier's face (P-REG's
// FACE). Each act takes the span exactly as selected (R11); asked by a
// position alone, it takes the block holding it, whole. An origin and a
// container are each another arrangement of the passage's material, so each
// is a LEAP that carries the span asked over, re-projected and marked at the
// landing (N-GO; foundations §2.3; P43), whose line names it as what the
// reader selected where it is the selection's bytes, else as the text they
// were reading (FP-21); an origin read side by side with the span's document
// is a step on the trail from the span asked over, by identity (N-GO's
// `toScene`). Each card takes the focus on its first act where a
// key made the act that asked — the slot's chord, Enter on its button — and
// never otherwise (D5 §4 rule 4; the focus record's rule 16). Each opens on
// its read (O-HOST's `opening`): where an act was made on the chrome while it
// read, nothing shows, a refusal's face included. A refusal's face is the
// act's answer, carrying the caption the card would have carried (O-FACES'
// `caption`): a `withheld` one the document-level withheld face of the
// document the board names, read for before it shows — the edition claims on
// it, which decide C-67's pointer (O-FACES' `prepare`), its act a LEAP from
// the span asked over. Faces: `too_much_coverage`. Each card leaves and
// returns with its place (FP-36): it shows naming what it is about (O-HOST's
// `about`) — the span asked over, by position and identity, and whether it
// was the selection's bytes — and a return asks it again over that span where
// its bytes stand then (`reopen`), taking the focus on the control it was
// left holding it on.
// Rules: FP-1, FP-2, FP-13, FP-20, FP-21, FP-36.

import * as HOST from './host.js';
import * as PUMP from '../model/pump.js';
import * as REC from '../model/records.js';
import * as F from '../model/frames.js';
import * as GO from '../nav/go.js';
import * as FACES from './faces.js';
import { t, tHTML, addressedHTML } from '../strings.js';
import { esc } from '../util.js';
import { accountOf } from '../model/address.js';

/**
 * @typedef {Object} About — what a card is about (see the head)
 * @property {'wrote' | 'uses'} kind which card
 * @property {string} addr the span's document: the version its box showed
 * @property {number} pos the span's first position there
 * @property {number} width its positions
 * @property {import('../model/records.js').ISpan[]} ids its bytes by identity (M-REC's `identityOf`); none where the held image did not cover them
 * @property {boolean} selected the span was the selection's bytes, which an act's landing names as what the reader selected
 */

/**
 * @typedef {Object} How — how a card is asked: the act's, or a return's
 * @property {boolean} byKey a key made the act: the card takes the focus on its first act
 * @property {string | null} focus a reopened card's control the focus was left on (O-HOST's `keyOf`): it takes the focus there
 * @property {import('./host.js').Left | null} left the card a return reopens, as the reader left it
 */

/**
 * The span asked over: the bytes named; with no width, the block holding
 * the position, whole; a position in no delivered block, one position.
 * @param {string} addr
 * @param {number} pos
 * @param {number | null} width
 */
function spanOf(addr, pos, width) {
  if (width != null && width > 0) return { ordinal: pos, positions: width };
  const b = REC.blockAt(addr, pos);
  return b ? { ordinal: b.pos, positions: Math.max(1, b.width) } : { ordinal: pos, positions: 1 };
}

/**
 * A LEAP to another arrangement of the span's material — an origin, a
 * container — carrying the span (N-GO's carry), made at the span the card
 * stands at, where the face of a failure known at the act stands; the span the
 * selection's bytes where a width named them, which the landing's line names
 * as what the reader selected, else the block read (FP-21).
 * @param {string} to
 * @param {string} addr the span's document
 * @param {{ordinal: number, positions: number}} sp
 * @param {boolean} selected the span is the selection's
 * @param {boolean} byKey a key made the act
 */
const carried = (to, addr, sp, selected, byKey) => GO.leapTo(to, { how: 'leap', byKey, carry: { addr, pos: sp.ordinal, width: sp.positions, selected }, site: { span: { addr, pos: sp.ordinal, width: sp.positions } } });

/** is the span asked over the selection's bytes — a width named — rather than the block a position names? */
const isSelection = (/** @type {number | null} */ width) => width != null && width > 0;

/**
 * An act's read, and where the board refuses it `withheld`, the reads the
 * face of the document it names is made from (O-FACES' `prepare`), asked
 * while the opening stands (see the head).
 * @param {string} addr the document the act names
 * @param {object} frame
 * @returns {(stands: () => boolean) => Promise<{answer: unknown} | {refused: import('../bridge/shapes').Refusal}>}
 */
const asking = (addr, frame) => async (stands) => {
  const out = await PUMP.read(frame);
  if ('refused' in out && out.refused.name === 'withheld' && stands()) await FACES.prepare(FACES.refusedDocument(out.refused, addr));
  return out;
};

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
const aboutOf = (/** @type {'wrote' | 'uses'} */ kind, /** @type {string} */ addr, /** @type {{ordinal: number, positions: number}} */ sp, /** @type {boolean} */ selected) =>
  /** @type {About} */ ({ kind, addr, pos: sp.ordinal, width: sp.positions, ids: REC.identityOf(addr, sp.ordinal, sp.positions), selected });

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
 * @param {number} pos the span's first position
 * @param {number | null} [width] the span's positions; null asks over the block holding `pos`
 * @param {boolean} [byKey] a key made the act: the card takes the focus on its first act
 * @returns {Promise<void>} settled once the card or its face shows, or nothing will
 */
export function wrote(addr, pos, width = null, byKey = false) {
  return wroteOver(addr, spanOf(addr, pos, width), isSelection(width), { byKey, focus: null, left: null });
}

/**
 * who wrote this? over a span (`wrote`, `reopen`).
 * @param {string} addr
 * @param {{ordinal: number, positions: number}} sp the span asked over
 * @param {boolean} selected it is the selection's bytes
 * @param {How} how
 * @returns {Promise<void>}
 */
function wroteOver(addr, sp, selected, how) {
  const anchor = { span: { addr, pos: sp.ordinal, width: sp.positions } };
  const caption = `${t('B1.who-wrote')} · ${addr} · ${t('F.position', { p: sp.ordinal })}`;
  return HOST.opening(asking(addr, F.showOrigin(addr, sp.ordinal, sp.positions)), (out) => {
    if ('refused' in out) { FACES.showRefusal(anchor, out.refused, addr, answering(caption, anchor)); return; }
    const origins = F.decodeAddrs(out.answer);
    const rows = origins.map((o) => {
      const owner = REC.doc(o).meta ? REC.doc(o).meta?.owner : accountOf(o);
      const same = o !== addr;
      const named = { owner: owner || '', account: owner || '', origin: o }, ids = { owner: 'id', account: 'id', origin: 'id' };
      return { o, same, html: tHTML(same ? 'B1.wrote' : 'B1.wrote.here', named, ids) };
    });
    const html = `<span class="label">${addressedHTML(caption)}</span>` +
      rows.map((r, i) => `<div class="answer" data-string="${r.same ? 'B1.wrote' : 'B1.wrote.here'}">${r.html}${r.same ? ` <button class="id" data-run="src${i}">${esc(r.o)}</button><button data-run="beside${i}">${esc(t('B1.side-by-side'))}</button>` : ''}</div>`).join('');
    /** @type {Record<string, import('./host.js').Act>} */
    const acts = {};
    rows.forEach((r, i) => { acts['src' + i] = (_el, byKey) => carried(r.o, addr, sp, selected, byKey); acts['beside' + i] = () => GO.toScene(addr, r.o, { posA: sp.ordinal, widthA: sp.positions, posB: null }, { from: { passage: { addr, pos: sp.ordinal, width: sp.positions } }, site: anchor }); });
    HOST.show({ kind: 'card', id: 'provenance:wrote', anchor, html, acts, ...shownAs(aboutOf('wrote', addr, sp, selected), how) });
  }, how.left);
}

/**
 * who uses this? (A-44, R30) with its blind spots stated (C-72)
 * @param {string} addr
 * @param {number} pos the span's first position
 * @param {number | null} [width] the span's positions; null asks over the block holding `pos`
 * @param {boolean} [byKey] a key made the act: the card takes the focus on its first act
 * @returns {Promise<void>} settled once the card or its face shows, or nothing will
 */
export function uses(addr, pos, width = null, byKey = false) {
  return usesOver(addr, spanOf(addr, pos, width), isSelection(width), { byKey, focus: null, left: null });
}

/**
 * who uses this? over a span (`uses`, `reopen`).
 * @param {string} addr
 * @param {{ordinal: number, positions: number}} sp the span asked over
 * @param {boolean} selected it is the selection's bytes
 * @param {How} how
 * @returns {Promise<void>}
 */
function usesOver(addr, sp, selected, how) {
  const anchor = { span: { addr, pos: sp.ordinal, width: sp.positions } };
  const caption = `${t('B1.who-uses')} · ${addr} · ${t('F.position', { p: sp.ordinal })}`;
  return HOST.opening(asking(addr, F.findDocsContaining([{ doc: addr, spans: [sp] }])), (out) => {
    if ('refused' in out) { FACES.showRefusal(anchor, out.refused, addr, answering(caption, anchor)); return; }
    const users = F.decodeAddrs(out.answer).filter((u) => u !== addr);
    const answer = users.length ? t('B1.uses', { documents: users.join(', ') }) : t('B1.uses.none');
    const html = `<span class="label">${addressedHTML(caption)}</span>` +
      `<div class="answer" data-string="${users.length ? 'B1.uses' : 'B1.uses.none'}">${addressedHTML(answer)}</div>` +
      (users.length ? `<div class="acts">${users.map((u, i) => `<button class="id" data-run="u${i}">${esc(u)}</button>`).join('')}</div>` : '') +
      `<div class="clause" data-string="B1.C-72">${esc(t('B1.C-72'))}</div>`;
    /** @type {Record<string, import('./host.js').Act>} */
    const acts = {};
    users.forEach((u, i) => { acts['u' + i] = (_el, byKey) => carried(u, addr, sp, selected, byKey); });
    HOST.show({ kind: 'card', id: 'provenance:uses', anchor, html, acts, ...shownAs(aboutOf('uses', addr, sp, selected), how) });
  }, how.left);
}
