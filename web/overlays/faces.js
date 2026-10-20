// O-FACES — a refusal's face at the act's site (the structure record §3.2
// "O-FACES"; foundations §3.1, F-G3; §4.4 the one refusal shape). Layer 2.
// PURE table + ENGINE through O-HOST. State: none.
// A face is keyed on the refusal's ONE `name` — the board's token (the
// `detail` of a `credential_refused`, else the `code`) or the shell's own —
// and its `kind` (the halt's, the block's, `unreachable`), never on prose;
// the disposition shapes the offered act. The name keys the face and names
// the overlay (`face:⟨name⟩`, the gate's reading); a person meets the words
// alone, never the token, which reads as a claim the words may refuse to
// make. The read path's faces: `doc_not_registered` → THE FIFTH CELL
// (B1-S8: where this client holds no record of its own that the board
// answered for the document, the UNREGISTERED-OR-UNREACHABLE face — C-42's
// content, DRAFT — and the floor face MUST NOT render; it offers no act,
// for B1-S8's one act, "try again", is the unreachable node's, and the
// board's answer here is byte-identical to never-held), `not_a_link`, C-39
// at a link address inside a withheld document, `range_not_present`, the
// `invalid` follow, `scan_busy`, `endsets_too_large`, `too_many_blocks`,
// `too_many_pairs`, `too_much_coverage`, `withheld`, the session's `no_key`
// (C-136 with this version's limit), the death arms (C-137),
// `unreachable`; a PUBLIC `moment` rendered as a face with `answer`/`cancel`
// (no ceremony panel is built here — a seam). Carries: the wireframe's §18
// `face` (its words and acts; its reviewer's label stays in the wireframe),
// `deadReferenceFace`'s fifth cell, `c39Face`. Rules: FP-1, FP-2, FP-13.

import * as HOST from './host.js';
import * as PORT from '../bridge/port.js';
import { t } from '../strings.js';
import { esc } from '../util.js';

/** @typedef {import('../bridge/shapes').Refusal} Refusal */
/** @typedef {import('../bridge/shapes').MomentEvent} MomentEvent */
/** @typedef {import('../model/records.js').Link} Link */
/** @typedef {import('./host.js').Anchor} Anchor */

/**
 * @typedef {Object} Face
 * @property {string} id the string's id
 * @property {string} text
 * @property {Array<{label: string, run?: () => void, inert?: boolean}>} acts
 */

/**
 * The words for a refusal, by its name.
 * @param {Refusal} r
 * @param {{addr?: string, owner?: string}} [ctx]
 * @returns {Face}
 */
export function wordsFor(r, ctx = {}) {
  const name = r.name;
  const addr = ctx.addr || '';
  const f = (/** @type {string} */ id, /** @type {Record<string, string | number>} */ v = {}) => ({ id, text: t(id, v), acts: /** @type {Face['acts']} */ ([]) });
  switch (name) {
    case 'doc_not_registered': return f('B1.doc_not_registered', { address: addr });
    case 'not_a_link': return f('B1.not_a_link');
    case 'withheld': return f('C-39', { owner: ctx.owner || '⟨owner⟩' });
    case 'range_not_present': return f('B1.range_not_present');
    case 'scan_busy': return f('B1.scan_busy');
    case 'endsets_too_large': return f('B1.endsets_too_large');
    case 'too_many_blocks': return f('B1.too_many_blocks');
    case 'too_many_pairs': return f('B1.too_many_pairs');
    case 'too_much_coverage': return f('B1.too_much_coverage');
    case 'empty_subspace': return f('B1.empty_subspace');
    case 'no_key': return f('C-136');
    case 'session_ended': case 'session_died': case 'closed': return f('C-137.signed-out');
    case 'busy': return f('C-138.busy');
    case 'unreachable': return f('F.daemon.unreachable');
    case 'no_adapter': return f('L.no-adapter');
    default: return f('L.refused', { name });
  }
}

/** the face's HTML: its words, what stands beneath them, its acts — and no token */
function faceHTML(/** @type {Face} */ face, extra = '') {
  return `<div class="face-text" data-string="${esc(face.id)}">${esc(face.text)}</div>` + (extra || '') +
    (face.acts.length ? `<div class="acts">${face.acts.map((a, i) => `<button data-run="a${i}" class="${a.inert ? 'inert' : ''}">${esc(a.label)}</button>`).join('')}</div>` : '');
}

/**
 * Show a refusal's face at an anchor.
 * @param {Anchor | HTMLElement | {x: number, y: number} | null} anchor
 * @param {Refusal} r
 * @param {string} [addr]
 * @param {Array<{label: string, run?: () => void, inert?: boolean}>} [acts]
 */
export function showRefusal(anchor, r, addr = '', acts = []) {
  const face = wordsFor(r, { addr });
  face.acts.push(...acts);
  /** @type {Record<string, (el: HTMLElement) => void>} */
  const handlers = {};
  face.acts.forEach((a, i) => { handlers['a' + i] = () => { if (a.run) a.run(); }; });
  HOST.show({ kind: 'face', id: 'face:' + r.name, anchor: toAnchor(anchor), html: faceHTML(face), acts: handlers });
}

/** @param {Anchor | HTMLElement | {x: number, y: number} | null} a */
function toAnchor(a) {
  if (!a) return null;
  if (a instanceof HTMLElement) return { el: a };
  if ('x' in a && 'y' in a && typeof a.x === 'number') return { screen: /** @type {{x: number, y: number}} */ (a) };
  return /** @type {Anchor} */ (a);
}

/**
 * THE FIFTH CELL (B1-S8): an address this board will say nothing about — the
 * board answered `doc_not_registered` and this client holds no record that
 * it ever answered for the document — met by a typed address (B1-S11 → S8)
 * or by a followed link's far end (THE DEAD REFERENCE, at its site). C-42's
 * content and nothing more, and no act: the answer is byte-identical to
 * never-held, and the model keeps it as a fact.
 * @param {string} addr
 * @param {Anchor | HTMLElement | {x: number, y: number} | null} [anchor] the reference's site; null where an address was typed
 */
export function unregistered(addr, anchor = null) {
  showRefusal(anchor, /** @type {Refusal} */ ({ kind: 'refused', name: 'doc_not_registered', status: 200, code: 'doc_not_registered', detail: null, op: 'doc_metadata', body: null }), addr);
}

/** the `invalid` follow: no such link or slot */
export function invalidFollow(/** @type {Anchor | HTMLElement | {x: number, y: number} | null} */ anchor) {
  HOST.show({ kind: 'face', id: 'face:invalid', anchor: toAnchor(anchor), html: faceHTML({ id: 'B1.invalid', text: t('B1.invalid'), acts: [] }) });
}

/**
 * A floating end: the passage the head no longer arranges (foundations
 * §2.3) — "its passage is not in ⟨D⟩'s current text"; the act opens the
 * versions list to read the last member that holds it.
 * @param {Link} l
 * @param {string} far
 * @param {Anchor | HTMLElement | {x: number, y: number} | null} anchor
 */
export function floating(l, far, anchor) {
  HOST.show({ kind: 'face', id: 'face:floating', anchor: toAnchor(anchor), acts: { a0: () => import('./versions.js').then((V) => V.open(far, null, null)) },
    html: faceHTML({ id: 'F.floating', text: t('F.floating', { D: far }), acts: [{ label: t('F.versions.read', { k: '⟨k⟩' }) }] }) });
  void l;
}

/** C-39: a link address inside a withheld document, R56's arm beneath and not the clause */
export function c39(/** @type {string} */ owner, /** @type {Anchor | HTMLElement | null} */ anchor) {
  const face = { id: 'C-39', text: t('C-39', { owner }), acts: [] };
  HOST.show({ kind: 'face', id: 'face:C-39', anchor: toAnchor(anchor), html: faceHTML(face, `<div class="arm" data-string="C-36.owner-grant.arm">${esc(t('C-36.owner-grant.arm'))}</div>`) });
}

/**
 * The session's refusal at the line's sign-in act: `no_key` → C-136 with
 * this version's limit; any other by its name.
 * @param {Refusal} r
 * @param {HTMLElement | null} anchor
 */
export function sessionFace(r, anchor) {
  const face = wordsFor(r);
  const extra = r.name === 'no_key' ? `<div class="note" data-string="F.keyless-limit">${esc(t('F.keyless-limit'))}</div>` : '';
  HOST.show({ kind: 'face', id: 'face:session:' + r.name, anchor: toAnchor(anchor), html: faceHTML(face, extra) });
}

/**
 * A PUBLIC moment of a walk, rendered as a face with `answer` and `cancel`
 * (no ceremony panel is built here — the ceremonies are a seam).
 * @param {MomentEvent} m
 */
export function moment(m) {
  const data = typeof m.data === 'string' ? m.data : JSON.stringify(m.data);
  const input = m.kind === 'label' || m.kind === 'ask' ? `<input type="text" data-answer="1" aria-label="${esc(t('L.answer'))}">` : '';
  HOST.show({
    kind: 'moment', id: 'moment:' + m.id, anchor: null, takeFocus: true,
    html: `<span class="label"><span class="code">${esc(m.walk)}</span> · ${esc(t('L.moment', { kind: m.kind }))}</span><div class="face-text">${esc(data)}</div>${input}` +
      `<div class="acts"><button data-run="answer">${esc(t('L.answer'))}</button>${m.answerable ? `<button data-run="cancel">${esc(t('L.cancel'))}</button>` : ''}</div>`,
    acts: {
      answer: () => {
        const el = HOST.element(); const inp = el ? /** @type {HTMLInputElement | null} */ (el.querySelector('[data-answer]')) : null;
        const value = m.kind === 'yes_no' ? true : m.kind === 'statement' ? null : inp ? inp.value : null;
        PORT.answer({ id: m.id, value }); HOST.dismiss();
      },
      cancel: () => { PORT.cancel({ id: m.id }); HOST.dismiss(); },
    },
  });
}
