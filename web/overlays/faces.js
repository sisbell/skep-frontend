// O-FACES — a refusal's face at the act's site (the structure record §3.2
// "O-FACES"; foundations §3.1, F-G3; §4.4 the one refusal shape). Layer 2.
// PURE table + ENGINE through O-HOST. State: VIEW — the documents whose own
// withheld words a face has shown whole in the page's session, the own-words
// face shown last, and the reads of the claims its faces asked — the one
// owner, emptied at a change of the page's class (`classChanged`).
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
// board's answer here is byte-identical to never-held), `withheld` → THE
// DOCUMENT-LEVEL WITHHELD FACE (B1 §1's A-170; B1-S8's WITHHELD state; R56:
// existence and owner, never bytes; issue #179's design decision: "describe
// the document the board refused") — "who wrote this?" or "who uses this?"
// asked of a document the reader may not read, a follow's far end withheld —
// of the document the board names (`refusedDocument`: the rejection's
// `site.addr`, else the document the act named), by the first case that
// holds: ITS TEXT ON SCREEN, the page holding its text or having held it
// under the class it left (`accessChanged`; M-REC's `covered`) — where the
// session's ending stands, the one line's words for that ending in the arm's
// place (`endingWords`) and its sign-in act, the line's own (`signIn`; issue
// #177's design decision: "sign-in is offered in the one line's words for
// that ending"; FP-29), the act's repeat once signed in the ceremonies'
// lane's, and the access-withdrawn notice for a withdrawal on record waiting
// on a read the board does not serve (skep #577); else, and at every other
// document, ITS OWN WITHHELD WORDS (`ownWords`): its full address, save where
// the face stands at the document's own place; the withheld box's words,
// "withheld · ⟨owner⟩", which the plane's box, the corner and the ARIA
// mirror's item say (T-LAYER's `withheldBox`), its owner by the one owner
// rule; and beneath them the entitlement arm for that owner and this reader
// (T-ARTICLE's one rule) and C-67's pointer where the edition claims on the
// document decide one (T-LAYER's `clauseOf`), its act the LEAP its caller
// hands in — the claims read for it where the model holds none (`prepare`),
// the face shown again as they land. Whole the first time a face shows them
// in the page's session, compact after (FP-26: "A compact sign opens whole on
// its act"): the address and the head, the head a disclosure whose act opens
// the rest, and folds it again. Never C-39, whose words are a link address's
// alone (the decision's third case: a link inspected inside the document); a
// follow to a withheld document whose text the page does not hold lands at
// the document's place first (N-GO; the decision's second case);
// `not_a_link`, C-39 at a link address inside a withheld document with the
// entitlement arm the run's placeholder carries beneath it (T-ARTICLE's one
// rule, by the reader), `range_not_present`, the `invalid` follow,
// `scan_busy`, `endsets_too_large`, `too_many_blocks`, `too_many_pairs`,
// `too_much_coverage`, the session's `no_key` (C-136 with this version's
// limit), `unreachable`; at the one line's sign-in act the session's refusal
// — the boot's, or the re-acquire's of a session a restart lost — and a
// death's arm (C-137, by the death's reason: `deathWords`, the words the
// line's death arm says too), "signed out" the sign-out marker's alone and
// never a restart's (issue #175's design decision; FP-28); a withheld run's
// face whole, Enter's act at the run (D5 K-7), made from the run's
// placeholder record (T-ARTICLE's `placeholderOf`), C-67's pointer its
// offered act; a jump
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
// on its first control (K-80). A refusal's face that answers an act carries
// the act's own caption, the words its card names itself by (`caption`), so
// O-HOST names it as the act's answer and says the caption before its words
// (issue #179's design decision: "Announce each face as the act's answer,
// tied to the act in markup"); a landing's face is tied by the item's
// description where the focus lands instead (`told`). Carries: the
// wireframe's §18 `face` (its words and acts; its reviewer's label stays in
// the wireframe), `deadReferenceFace`'s fifth cell, `c39Face`. Rules: FP-1,
// FP-2, FP-13, FP-20, FP-25, FP-26, FP-28, FP-29.

import * as HOST from './host.js';
import * as VERSIONS from './versions.js';
import * as PORT from '../bridge/port.js';
import * as REC from '../model/records.js';
import * as PUMP from '../model/pump.js';
import * as LAYER from '../text/layer.js';
import { entitlementArm, placeholderOf } from '../text/article.js';
import { memberOf } from '../model/address.js';
import { t } from '../strings.js';
import { esc } from '../util.js';

/** @typedef {import('../bridge/shapes').Refusal} Refusal */
/** @typedef {import('../bridge/shapes').DeathReason} DeathReason */
/** @typedef {import('../bridge/shapes').MomentEvent} MomentEvent */
/** @typedef {import('./host.js').Anchor} Anchor */
/** @typedef {import('./host.js').Overlay} Overlay */
/** @typedef {import('../model/records.js').Reader} Reader */
/** @typedef {import('../text/article.js').Pointer} Pointer */

/**
 * @typedef {Object} Face
 * @property {string} id the string's id
 * @property {string} text
 * @property {Array<{label: string, run?: () => void, inert?: boolean}>} acts
 */

/**
 * @typedef {Object} Asked — what the act a refusal's face answers hands it (see the head)
 * @property {string | null} [caption] the act's own caption, the words its card names itself by: the face is named by it, the act's answer; none where a landing's item's description ties the face instead
 * @property {(home: string, byKey: boolean) => void} [follow] C-67's pointer's act, handed in by its caller: the LEAP to the edition its claim names; the pointer stands only where one is handed in
 * @property {boolean} [told] the landing that met the face says its words where the focus lands (N-GO's `described`): the status region does not repeat them
 */

/**
 * @typedef {Object} OwnWords — a withheld document's own withheld words (see the head; `ownWords`)
 * @property {string | null} addr its full address, before its words; null where the face stands at the document's own place
 * @property {{id: string, text: string}} head the withheld box's words, "withheld · ⟨owner⟩" (T-LAYER's `withheldBox`)
 * @property {{id: string, text: string}} arm the entitlement arm for its owner and this reader (T-ARTICLE's `entitlementArm`)
 * @property {Pointer | null} pointer C-67's pointer where the edition claims on the document decide one; null where they decide none, or the quoting sibling
 */

/** @type {Set<string>} the documents whose own withheld words a face has shown whole in the page's session (see the head) */
const seenWhole = new Set();
/** @type {{addr: string, overlay: Overlay, pointer: string, again: () => void} | null} the own-words face shown last, with the claim its pointer followed as it was made ('' for none): shown again, in the form it stands in, where the claims its pointer is decided from land deciding another */
let ownFace = null;
/** @type {Map<string, Promise<void>>} the reads of the edition claims on a withheld document a face asked, by the drops of the claims held and the document: each asked once until the claims held drop (M-REC's `claimDrops`) */
const claimReads = new Map();

/**
 * The document a `withheld` refusal names (wire.md §Rejections: `site.addr`,
 * "the document argument a READ may not" read, the first in declaration
 * order where a read carries several), from the rejection the shell hands up
 * whole as the refusal's `body`; the document the refused act named where
 * the body names none.
 * @param {Refusal} r
 * @param {string} addr the document the act named
 * @returns {string}
 */
export function refusedDocument(r, addr) {
  const body = r.kind === 'refused' && r.body && typeof r.body === 'object' ? /** @type {{site?: unknown}} */ (r.body) : null;
  const site = body && body.site && typeof body.site === 'object' ? /** @type {{addr?: unknown}} */ (body.site) : null;
  return site && typeof site.addr === 'string' && site.addr ? site.addr : addr;
}

/**
 * Did access to a document change after its text was read (see the head; the
 * decision's first case, "Its text is on screen")? The page holds its text,
 * or held it under the class it left — a covered document (M-REC's
 * `covered`), its place standing as the cover draws it. A follow to such a
 * document faces at the act (N-GO's `known`); to any other withheld
 * document, it lands at the document's place.
 * @param {string} addr
 * @returns {boolean}
 */
export const accessChanged = (addr) => REC.covered(addr) || (REC.has(addr) && REC.doc(addr).from >= 0);

/**
 * The reads a withheld document's own words are made from, made where the
 * model holds none (see the head): the edition claims on it, which decide
 * C-67's pointer (M-PUMP's `readClaims`), asked once until the claims held
 * drop. An act that shows the face once its reads answer awaits it — the
 * provenance cards' openings, a follow in the air; a face shown before it
 * answers is shown again as it lands (`withheld`).
 * @param {string} addr the withheld document
 * @returns {Promise<void>}
 */
export function prepare(addr) {
  if (REC.editionClaimsOf(addr) !== undefined) return Promise.resolve();
  const key = REC.claimDrops() + ':' + addr;
  let asked = claimReads.get(key);
  if (!asked) { asked = PUMP.readClaims(addr); claimReads.set(key, asked); }
  return asked;
}

/**
 * A change of the page's class (see the head; FP-29), told by the app as
 * O-HOST is told: a new session's first face of each withheld document is
 * shown whole again, and nothing the class the page left read is asked by it
 * or shown again from it.
 */
export function classChanged() {
  seenWhole.clear();
  ownFace = null;
  claimReads.clear();
}

/** an act's caption, which names the face shown in its answer (see the head) */
const captionHTML = (/** @type {string | null | undefined} */ caption) => (caption ? `<span class="label">${esc(caption)}</span>` : '');
/** C-67's pointer beneath an arm, the face's act: a button following the claim it names to the edition its home is */
const pointerHTML = (/** @type {Pointer} */ c) => `<div class="clause" data-string="${esc(c.id)}"><button data-run="follow" data-claim="${esc(c.claim)}" data-home="${esc(c.home)}">${esc(c.text)}</button></div>`;

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
 * document-level withheld face (`withheld`) of the document the board names
 * (`refusedDocument`); every other by its name (`wordsFor`), with the acts
 * given. Either carries the caption of the act it answers, where one is
 * handed in (see the head).
 * @param {Anchor | HTMLElement | {x: number, y: number} | null} anchor
 * @param {Refusal} r
 * @param {string} addr the document the refused act named
 * @param {Asked & {acts?: Array<{label: string, run?: () => void, inert?: boolean}>}} [asked]
 */
export function showRefusal(anchor, r, addr, asked = {}) {
  if (r.name === 'withheld') { withheld(refusedDocument(r, addr), anchor, asked); return; }
  const face = wordsFor(r, { addr });
  face.acts.push(...(asked.acts || []));
  /** @type {Record<string, import('./host.js').Act>} */
  const handlers = {};
  face.acts.forEach((a, i) => { handlers['a' + i] = () => { if (a.run) a.run(); }; });
  HOST.show({ kind: 'face', id: 'face:' + r.name, anchor: toAnchor(anchor), html: captionHTML(asked.caption) + faceHTML(face), acts: handlers });
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
 * THE DOCUMENT-LEVEL WITHHELD FACE (B1 §1's A-170; B1-S8's WITHHELD state;
 * issue #179's design decision): a withheld document — met by "who wrote
 * this?" or "who uses this?" over its bytes, or by a followed link's far
 * end — named by existence and owner, never bytes (R56), by the first case
 * that holds (see the head). Its text on screen (`accessChanged`) while the
 * session's ending stands — a covered document a cursor move's landing
 * reaches among them (N-GO) — the withheld box's words, "withheld · ⟨owner⟩"
 * (T-LAYER's `withheldBox`), the one line's words for that ending beneath
 * them (`endingWords`), and its one act the line's sign-in (`signIn`), faced
 * where this face stood: the way back. Else its own withheld words
 * (`ownWords`): whole the first time a face shows them in the page's
 * session, compact after, its head the disclosure that opens the rest and
 * folds it again, said through the status region as the reader's act changes
 * it; C-67's pointer among the rest where the claims on the document decide
 * one and a LEAP is handed in for it — the claims read where the model holds
 * none (`prepare`), and the face shown again in its form as they land, where
 * it still stands, its pointer changed and no opening reading (O-HOST's
 * `pending`).
 * @param {string} addr the document withheld
 * @param {Anchor | HTMLElement | {x: number, y: number} | null} [anchor] where the face stands: the act's site, or the place a landing stands at
 * @param {Asked} [asked]
 */
export function withheld(addr, anchor = null, asked = {}) {
  const at = toAnchor(anchor);
  const ending = accessChanged(addr) ? endingWords() : null;
  if (ending) {
    const box = { id: 'F.corner.withheld', text: LAYER.withheldBox(REC.doc(addr)) };
    HOST.show({ kind: 'face', id: 'face:withheld', anchor: at, told: asked.told, acts: { a0: () => signIn(at) }, html: captionHTML(asked.caption) + faceHTML({ ...box, acts: [{ label: t('F.sign-in') }] }, armHTML(ending)) });
    return;
  }
  const show = (/** @type {boolean} */ open, /** @type {boolean | undefined} */ told) => {
    const w = ownWords(addr, at), follow = asked.follow, pointer = follow ? w.pointer : null;
    /** @type {Record<string, import('./host.js').Act>} */
    const acts = { head: () => show(!open, false) };
    if (open && pointer && follow) { const home = pointer.home; acts.follow = (_el, byKey) => follow(home, byKey); }
    if (open) seenWhole.add(addr);
    /** @type {Overlay} */
    const o = { kind: 'face', id: 'face:withheld', anchor: at, told, acts, html: captionHTML(asked.caption) + ownHTML(w, open, pointer) };
    ownFace = { addr, overlay: o, pointer: pointerOf(addr), again: () => show(open, told) };
    HOST.show(o);
  };
  show(!seenWhole.has(addr), asked.told);
  if (REC.editionClaimsOf(addr) !== undefined) return;
  void prepare(addr).then(() => {
    const f = ownFace;
    if (f && f.addr === addr && HOST.currentState() === f.overlay && !HOST.pending() && pointerOf(addr) !== f.pointer) f.again();
  });
}

/**
 * A withheld document's own withheld words (see the head): its full address
 * where the face stands away from the document's own place, the withheld
 * box's words, the entitlement arm for its owner and this reader, and C-67's
 * pointer where the edition claims on it decide one.
 * @param {string} addr
 * @param {Anchor | null} at where the face stands
 * @returns {OwnWords}
 */
function ownWords(addr, at) {
  const d = REC.doc(addr), c = LAYER.clauseOf(addr);
  return {
    addr: at && at.span && at.span.addr === addr ? null : addr,
    head: { id: 'F.corner.withheld', text: LAYER.withheldBox(d) },
    arm: entitlementArm(REC.reader(), LAYER.ownerAccount(d)),
    pointer: c && c.id === 'C-67.pointer' ? c : null,
  };
}

/** the claim C-67's pointer follows at a withheld document now; '' where none is decided — what the face shown last is compared by as the claims land */
const pointerOf = (/** @type {string} */ addr) => { const c = LAYER.clauseOf(addr); return c && c.id === 'C-67.pointer' ? c.claim : ''; };

/**
 * A withheld document's own words as its face writes them (see the head):
 * its address, in its own element, where it stands; its head, the disclosure
 * whose act opens the rest and folds it again; and, open, the rest beneath —
 * the arm, then the pointer where one stands.
 * @param {OwnWords} w
 * @param {boolean} open
 * @param {Pointer | null} pointer
 */
function ownHTML(w, open, pointer) {
  return (w.addr ? `<div class="face-addr code">${esc(w.addr)}</div>` : '') +
    `<button class="face-text" data-string="${esc(w.head.id)}" data-run="head" aria-expanded="${open}">${esc(w.head.text)}</button>` +
    (open ? armHTML(w.arm) + (pointer ? pointerHTML(pointer) : '') : '');
}

/**
 * The words a withheld document's face says whole at the document's own
 * place, as the ARIA mirror reads them (FP-26: "the mirror reads every sign
 * whole"; see the head): the withheld box's words, then the ending's words
 * where its text was on screen as the session ended, else the arm and C-67's
 * pointer where decided — the description of the item a follow's landing
 * there stands on (N-GO's `described`).
 * @param {string} addr
 * @returns {string}
 */
export function withheldText(addr) {
  const ending = accessChanged(addr) ? endingWords() : null, w = ownWords(addr, { span: { addr, pos: 1 } });
  return [w.head.text, ...(ending ? [ending.text] : [w.arm.text, ...(w.pointer ? [w.pointer.text] : [])])].join(' ');
}

/**
 * The one line's words for the session's ending (L-LINE's acting-as segment;
 * issue #175's design decision): a death's (`deathWords`), the guest line in
 * their place for an arm this page holds none for; a session a restart lost
 * that the acquire could not get back, "could not reconnect as ⟨account⟩
 * after a restart" leading the guest line; null where no ending stands.
 * @returns {{id: string, text: string} | null}
 */
export function endingWords() {
  const dead = REC.deathReason(), lost = REC.reconnect();
  const guest = { id: 'B1.guest-line', text: t('B1.guest-line') };
  if (dead) return deathWords(dead) || guest;
  if (lost && lost.refused) return { id: 'L.reconnect-refused', text: t('L.reconnect-refused', { account: lost.as || '' }) + ' · ' + guest.text };
  return null;
}

/**
 * The sign-in act — the one line's, and a covered document's face's (see
 * the head): the session's refusal faced where the page holds one — the
 * boot's, or the re-acquire's of a session a restart lost — else the death's
 * (`deathFace`); nothing where neither stands.
 * @param {Anchor | HTMLElement | {x: number, y: number} | null} anchor where the act was made
 */
export function signIn(anchor) {
  const r = REC.sessionRefused(), dead = REC.deathReason();
  if (r) sessionFace(/** @type {Refusal} */ (r), anchor);
  else if (dead) deathFace(dead, anchor);
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

/** the reading face ends where it still stands — its jump's read answered, its own completion (O-HOST's `complete`): an overlay shown since stands, and a card asked since still opens */
export function endReading() {
  const o = HOST.currentState();
  if (o && o.id && o.id.startsWith(READING)) HOST.complete(o.id);
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
    clause = pointerHTML(c);
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
 * The session's refusal at the line's sign-in act — the boot's, or the
 * re-acquire's of a session a restart lost: `no_key` → C-136 with this
 * version's limit; any other by its name.
 * @param {Refusal} r
 * @param {Anchor | HTMLElement | {x: number, y: number} | null} anchor
 */
export function sessionFace(r, anchor) {
  const face = wordsFor(r);
  const extra = r.name === 'no_key' ? `<div class="note" data-string="F.keyless-limit">${esc(t('F.keyless-limit'))}</div>` : '';
  HOST.show({ kind: 'face', id: 'face:session:' + r.name, anchor: toAnchor(anchor), html: faceHTML(face, extra) });
}

/**
 * The death's words (C-137), by its reason's arm: the MODE arm's "this
 * board now requires a signed session", the SELF-retirement's "sign in with
 * the new key", and the sign-out marker's "signed out" for the `closed` arm
 * alone — the page's own close, the person's sign-out (issue #175's design
 * decision: "'signed out' stays on the sign-out path alone"; FP-28); none
 * for an arm whose words this page does not hold — the seeded, the blocked
 * and the unreachable arms, whose faces read records it does not read. The
 * one line's death arm and its sign-in act's face both say them
 * (`deathFace`). A restart is no death (M-PUMP), so none is ever a restart's.
 * @param {DeathReason} reason
 * @returns {{id: string, text: string} | null}
 */
export function deathWords(reason) {
  const id = reason.arm === 'closed' ? 'C-137.signed-out' : reason.arm === 'mode' ? 'C-137.mode' : reason.arm === 'retired' ? 'C-137.self' : null;
  return id ? { id, text: t(id) } : null;
}

/**
 * The death's face at the line's sign-in act: its words (`deathWords`);
 * nothing where this page holds none for its arm.
 * @param {DeathReason} reason
 * @param {Anchor | HTMLElement | {x: number, y: number} | null} anchor
 */
export function deathFace(reason, anchor) {
  const words = deathWords(reason);
  if (words) HOST.show({ kind: 'face', id: 'face:session:' + reason.arm, anchor: toAnchor(anchor), html: faceHTML({ ...words, acts: [] }) });
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
