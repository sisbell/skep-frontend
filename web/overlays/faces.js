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
// board's answer here is byte-identical to never-held), `withheld` on a
// read's document consult → THE DOCUMENT-LEVEL WITHHELD FACE (B1 §1's
// A-170; B1-S8's WITHHELD state; R56: existence and owner, never bytes —
// "who wrote this?", "who uses this?" or a follow's far end asking of a
// document the reader may not read): the document named in B1-S2's withheld
// box's words, the words the plane's box and the ARIA mirror's item say
// (T-LAYER's `withheldBox`), its owner by the one owner rule, the entitlement
// arm for that owner and this reader beneath them (T-ARTICLE's one rule),
// and no act — never C-39, whose words are a link address's alone;
// `not_a_link`, C-39 at a link address inside a withheld document with the
// entitlement arm the run's placeholder carries beneath it (T-ARTICLE's one
// rule, by the reader), `range_not_present`, the `invalid` follow,
// `scan_busy`, `endsets_too_large`, `too_many_blocks`, `too_many_pairs`,
// `too_much_coverage`, the session's `no_key` (C-136 with this version's
// limit), the death arms (C-137), `unreachable`; a withheld run's face whole,
// Enter's act at the run (D5 K-7), made from the run's placeholder record
// (T-ARTICLE's `placeholderOf`), C-67's pointer its offered act; a jump
// reading and a jump reaching (FP-25: "'Reading', 'reaching' and a failure
// show where the camera is"), their overlays named `reading:⟨address⟩` and
// `reaching:⟨address⟩` and never `face:…`, the prefix a notice's face
// carries — each anchored, as every face N-GO shows for a jump is, with the
// document it stands at, out of the visible view of which the one line
// carries its words (O-HOST's `sign`); a PUBLIC
// `moment` rendered as a face with `answer`/`cancel` (no ceremony panel is
// built here — a seam). A face never takes the focus (D5 §4 rule 4; K-58):
// it is heard through the one status region (D4, O-HOST's), and a face
// offered by a key's act takes none either; the moment's face alone takes it,
// on its first control (K-80). Carries: the wireframe's §18 `face` (its words
// and acts; its reviewer's label stays in the wireframe),
// `deadReferenceFace`'s fifth cell, `c39Face`. Rules: FP-1, FP-2, FP-13,
// FP-20, FP-25.

import * as HOST from './host.js';
import * as VERSIONS from './versions.js';
import * as PORT from '../bridge/port.js';
import * as REC from '../model/records.js';
import * as LAYER from '../text/layer.js';
import { entitlementArm, placeholderOf } from '../text/article.js';
import { memberOf } from '../model/address.js';
import { t } from '../strings.js';
import { esc } from '../util.js';

/** @typedef {import('../bridge/shapes').Refusal} Refusal */
/** @typedef {import('../bridge/shapes').MomentEvent} MomentEvent */
/** @typedef {import('./host.js').Anchor} Anchor */
/** @typedef {import('../model/records.js').Reader} Reader */

/**
 * @typedef {Object} Face
 * @property {string} id the string's id
 * @property {string} text
 * @property {Array<{label: string, run?: () => void, inert?: boolean}>} acts
 */

/**
 * The words for a refusal, by its name. A `withheld` refusal is not among
 * them: its face names the document it withholds (`withheld`).
 * @param {Refusal} r
 * @param {{addr?: string}} [ctx]
 * @returns {Face}
 */
export function wordsFor(r, ctx = {}) {
  const name = r.name;
  const addr = ctx.addr || '';
  const f = (/** @type {string} */ id, /** @type {Record<string, string | number>} */ v = {}) => ({ id, text: t(id, v), acts: /** @type {Face['acts']} */ ([]) });
  switch (name) {
    case 'doc_not_registered': return f('B1.doc_not_registered', { address: addr });
    case 'not_a_link': return f('B1.not_a_link');
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

/** the entitlement arm beneath a face's words (T-ARTICLE's `entitlementArm`), named by its string */
const armHTML = (/** @type {{id: string, text: string}} */ arm) => `<div class="arm" data-string="${esc(arm.id)}">${esc(arm.text)}</div>`;

/**
 * Show a refusal's face at an anchor: a `withheld` refusal as the
 * document-level withheld face (`withheld`), naming the document the read
 * asked of; every other by its name (`wordsFor`), with the acts given.
 * @param {Anchor | HTMLElement | {x: number, y: number} | null} anchor
 * @param {Refusal} r
 * @param {string} addr the document the refused read asked of
 * @param {Array<{label: string, run?: () => void, inert?: boolean}>} [acts]
 */
export function showRefusal(anchor, r, addr, acts = []) {
  if (r.name === 'withheld') { withheld(addr, anchor); return; }
  const face = wordsFor(r, { addr });
  face.acts.push(...acts);
  /** @type {Record<string, import('./host.js').Act>} */
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

/**
 * THE DOCUMENT-LEVEL WITHHELD FACE (B1 §1's A-170; B1-S8's WITHHELD state):
 * a document a read's consult refused `withheld` — met by "who wrote this?"
 * or "who uses this?" over its bytes, or by a followed link's far end — named
 * by existence and owner, never bytes (R56): B1-S2's withheld box's words,
 * which the plane's box and the ARIA mirror's item say too (T-LAYER's
 * `withheldBox`), its owner by the one owner rule, then the entitlement arm
 * for that owner and this reader (T-ARTICLE's `entitlementArm`, the rule the
 * run's placeholder reads). It offers no act.
 * @param {string} addr the document withheld
 * @param {Anchor | HTMLElement | {x: number, y: number} | null} [anchor] the act's site
 */
export function withheld(addr, anchor = null) {
  const d = REC.doc(addr);
  const arm = entitlementArm(REC.reader(), LAYER.ownerAccount(d));
  HOST.show({ kind: 'face', id: 'face:withheld', anchor: toAnchor(anchor), html: faceHTML({ id: 'B1.withheld-box', text: LAYER.withheldBox(d), acts: [] }, armHTML(arm)) });
}

/** the reading face's overlay id, before the address it names */
const READING = 'reading:';
/** the reaching face's overlay id, before the address it names */
const REACHING = 'reaching:';

/**
 * A jump reading (FP-25: "'Reading' … show[s] where the camera is"): said as
 * the camera leaves, at the place it left for — the document the jump named,
 * its anchor's `sign`, out of the visible view of which the one line carries
 * its words — and heard through the one status region as every face is; gone
 * with the next act, replaced by the face its read brings, or ended as the
 * read answers (`endReading`); shown again where a cursor move reaches its
 * entry while the read is out (N-GO). It offers no act.
 * @param {string} addr the place the jump named
 * @param {Anchor | HTMLElement | {x: number, y: number} | null} [anchor] where the camera went
 */
export function reading(addr, anchor = null) {
  HOST.show({ kind: 'face', id: READING + addr, anchor: toAnchor(anchor), html: faceHTML({ id: 'L.reading', text: t('L.reading', { address: addr }), acts: [] }) });
}

/**
 * A jump reaching (FP-25: "Where only a read can place the destination, the
 * camera waits … and Esc or Back abandons the jump"): its destination one
 * only a read can place — a board the plane does not draw — said at the act's
 * site in the place of what stands there, the camera still, and heard through
 * the one status region as every face is. Its dismissal — Esc's, the
 * innermost thing — abandons the jump (`abandon`); a replacement does not,
 * the jump reaching on under the overlay shown in its place. It offers no
 * act.
 * @param {string} addr the place the jump named
 * @param {Anchor | HTMLElement | {x: number, y: number} | null} anchor the act's site
 * @param {() => void} abandon the jump abandoned, its entry given back (N-GO)
 */
export function reaching(addr, anchor, abandon) {
  HOST.show({ kind: 'face', id: REACHING + addr, anchor: toAnchor(anchor), html: faceHTML({ id: 'L.reaching', text: t('L.reaching', { address: addr }), acts: [] }), onDismiss: (replaced) => { if (!replaced) abandon(); } });
}

/** the reading face ends where it still stands — its jump's read answered; an overlay shown since stands */
export function endReading() {
  const o = HOST.currentState();
  if (o && o.id && o.id.startsWith(READING)) HOST.dismiss();
}

/** the `invalid` follow: no such link or slot */
export function invalidFollow(/** @type {Anchor | HTMLElement | {x: number, y: number} | null} */ anchor) {
  HOST.show({ kind: 'face', id: 'face:invalid', anchor: toAnchor(anchor), html: faceHTML({ id: 'B1.invalid', text: t('B1.invalid'), acts: [] }) });
}

/**
 * The dead end's words for a document whose text holds none of a passage
 * (foundations §2.3): "its passage is not in ⟨D⟩'s current text", and at a
 * pinned member in its own words, "its passage is not in version ⟨k⟩" — the
 * floating face's, and the landing's description where it lands there
 * (N-GO's `described`; issue #153).
 * @param {string} far
 * @returns {{id: string, text: string}}
 */
export function floatingWords(far) {
  const k = memberOf(far);
  return k != null ? { id: 'F.floating.member', text: t('F.floating.member', { k }) } : { id: 'F.floating', text: t('F.floating', { D: far }) };
}

/**
 * A floating end: the passage a document's text no longer arranges
 * (foundations §2.3), in the dead end's words (`floatingWords`) — met
 * at the landing N-GO makes at the document's head, whether a followed
 * link's end or a carried passage brought the reader there (the carry rule's
 * empty case, P43). Where `offer` stands, the act opens the versions list to
 * read the last member that holds it, the list taking the face's place where
 * the face stood — the head landed on — and following it as the camera moves
 * (foundations §3.1: at the act's site); a carried passage's landing offers
 * none, for the list holds a passage of its own document and the carried one
 * is another's. Shown at the landing that met it, its words are that
 * landing's description, said where the focus lands (`told`; N-WALK), and
 * the status region does not repeat them (D4: a landing is told by the focus
 * move); shown again at a cursor move, they are said there.
 * @param {string} far the document whose text holds none of the passage
 * @param {Anchor | HTMLElement | {x: number, y: number} | null} anchor the head landed on: where the face stands, and the list its act opens
 * @param {boolean} [offer] the face offers the versions list
 * @param {boolean} [told] the landing's description says its words
 */
export function floating(far, anchor, offer = true, told = false) {
  const at = toAnchor(anchor);
  HOST.show({ kind: 'face', id: 'face:floating', anchor: at, told, acts: offer ? { a0: (_el, byKey) => VERSIONS.open(far, null, at, null, byKey) } : {},
    html: faceHTML({ ...floatingWords(far), acts: offer ? [{ label: t('F.versions.read', { k: '⟨k⟩' }) }] : [] }) });
}

/**
 * A withheld run's face whole, the act at the run by the keyboard (D5 K-7;
 * foundations §1 row 8: the placeholder "with R56's arm, whole on the run's
 * act"), made from the run's placeholder as one record (T-ARTICLE's
 * `placeholderOf`; R94): its head, the entitlement arm for its origin's owner
 * and this reader, then C-67's clause where the origin's edition claims
 * decide one — the pointer the face's offered act, in its own words, which
 * LEAPs to the edition its claim names (B1-S7 → S6); the QUOTING sibling a
 * line that offers nothing — and nothing past the arm where they decide none.
 * It stands at the run's own positions and takes no focus: it is heard
 * through the status region, and its act is reached by Tab (K-58).
 * @param {string} addr the document the run stands in
 * @param {import('../model/records.js').Block} b the withheld run
 * @param {(home: string, byKey: boolean) => void} follow the pointer's act, handed in by its caller: the LEAP to the edition, the claim's home
 */
export function withheldRun(addr, b, follow) {
  const p = placeholderOf(b, REC.reader(), LAYER.originOwner, LAYER.clauseOf);
  const c = p.clause;
  /** @type {Record<string, import('./host.js').Act>} */
  const acts = {};
  let clause = '';
  if (c && c.id === 'C-67.pointer') {
    const home = c.home;
    acts.follow = (_el, byKey) => follow(home, byKey);
    clause = `<div class="clause" data-string="${esc(c.id)}"><button data-run="follow" data-claim="${esc(c.claim)}" data-home="${esc(home)}">${esc(c.text)}</button></div>`;
  } else if (c) clause = `<div class="clause" data-string="${esc(c.id)}">${esc(c.text)}</div>`;
  HOST.show({ kind: 'face', id: 'face:withheld-run', anchor: { span: { addr, pos: b.pos, width: b.width } }, acts,
    html: faceHTML({ id: 'B1.withheld-run', text: p.head, acts: [] }, armHTML(p.arm) + clause) });
}

/**
 * C-39: a link address inside a withheld document — the entitlement arm for
 * this reader beneath, by the rule the run's placeholder reads, and not the
 * clause (B1-S5).
 * @param {string} owner the withheld document's owner account
 * @param {Reader} reader who reads (M-REC's `reader`)
 * @param {Anchor | HTMLElement | null} anchor
 */
export function c39(owner, reader, anchor) {
  const face = { id: 'C-39', text: t('C-39', { owner }), acts: [] };
  HOST.show({ kind: 'face', id: 'face:C-39', anchor: toAnchor(anchor), html: faceHTML(face, armHTML(entitlementArm(reader, owner))) });
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
