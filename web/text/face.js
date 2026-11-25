// T-FACE — the slot's face at reading scale (B11-S5; the slot's face
// decision; the one form's drawing, part 1). Layer 2, a drawing module.
// State (FP-10): the faces standing, each its two elements — its body, set
// inside the one form's corners, and its corner — what each was last written
// from, whether its read was out as it first stood, and whether its corner's
// row stands; the slots whose statement stood whole in the page's session
// (`seenWhole`) and those whose statement stands whole now; the list open at
// each face, and whether its folded rows were opened whole; the told line at
// an arrival by follow; what each face's corner last said in the status
// region; and the readers the app hands in. View state, never written (FP-7).
// Where it stands: at each assigned slot past the mailbox where the one form
// stands (M-REC's `faceSlot`) whose rectangle meets the view at its reading
// scale (T-LAYER's `atReadingScale` over `formFold`) — reached by every act
// aimed at the address, each a landing N-GO tells it of (`landed`), and by a
// zoom into the cell, no act made — and nowhere else: never below that scale,
// where the plane draws the form alone and nothing here reads or draws. It is
// a place's form, never an overlay: no act shows it and none takes it down;
// it stands while the place is in view at reading scale and goes as the
// reader leaves that place, its list closed and its told line gone with it
// (FP-36). Its body is set inside the corners the plane draws, at the head
// where the label stood, so the zoom carries the label into the face in place
// (law 8): laid out once at P-LAY's LAY_FS in the column the slot's document
// would take at that cell — the form's first column slot at the fit's
// measure (T-LAYER's `formFold`) — each of its rows placed by this module's
// own wrap of its words and set unwrapped, so where each row stands is
// known before anything is drawn, and moved by transform as an article is
// (FP-8, FP-26). Its lines, in order: its head — the slot's name as the
// reader is shown it (T-LAYER's `slotNamed`), its state set in after it,
// then the slot's address whole at one small size at the row's end, never a
// possessive and never a device's label (the slot's face decision, point 4);
// the told line, at an arrival by follow, naming the link followed until the
// next act leaves the face; the statement — whole at its first opening in
// the page's session and compact after (P41), its compact mark opening it
// whole and every reading of it for the ear whole — its list clause scoped
// to what the read kept, keyed to the corner's state; to the slot's owner,
// the plain word that no act of this client creates the page, and at their
// bio what every other reader meets there meanwhile (P10); the link act's
// plain word; and the list region, beneath the acts. Its corner (the slot's
// face decision, point 1) stands where the slot's document's would: beside
// the column, in its edge, level with the head's first row, while the fit
// keeps the column beside the corner (P-CAM's `fit`); else at the face's
// head, on a row of its own directly beneath the head's first row, which
// stands with it — never at a foot. It holds to the top of the face's
// visible part below the one line while any of the rectangle is in view
// (P-LABEL's `holdTop`; FP-37) and goes once it leaves; at one column the
// head's two rows hold together, the body reserving their band. Its items, in
// order: the count of the links the face's read kept that end at the slot's
// address — whole where its edge holds it, else compact, each saying the
// links end there — and the social mark (LK's `slotFold`, rule (i)'s one
// test); hollow while the read is out, "links not read" where it failed,
// nothing at zero (P69), each item its own act and the corner one line of
// acts (a toolbar, one Tab stop, ← and → along it), every item at least the
// minimum press area tall (FP-44). Nothing moves at the answer: a face first
// drawn while its read was out keeps its list clause's room and its corner's
// row until it is left (FP-34). Each item's act opens its list in the one
// list region beneath the face's acts, in the place of any list standing
// there, the item drawn open; the list draws no head of its own, its region
// named for the ear by its opener (`aria-controls`): its rows newest first, a
// run's writer once at its head by its account's address — "yours" over the
// reader's own run — each row its home's address past that prefix, its first
// line where the page holds one, its type where it is no letter, a LEAP to the
// document homing the link (FP-25), the followed link's row marked; past the
// face's room its oldest rows folded into one row with their count, whole on
// its act, each row's first line cut from its end to keep it one line, and
// the statement compact only once every row is folded (THE FACE's BUDGET;
// P48). Its stops stand in the order they are drawn — the corner, the
// statement's mark, the owner's plain word, the link act's, the list — Tab
// reaching them while the walk stands on the form, and a focus on a row
// bringing it clear below the held rows (FP-20, FP-37). What it says: each
// corner item once, politely, as it fills (FP-36); an inert act's reason at
// every press (FP-41). Its words are the strings table's alone (ST's `t`).
// Rules: FP-7, FP-8, FP-9, FP-10, FP-20, FP-25, FP-26, FP-30, FP-33, FP-34,
// FP-36, FP-37, FP-41, FP-43, FP-44.

import * as REC from '../model/records.js';
import * as LK from '../links/links.js';
import * as FOCUS from '../nav/focus.js';
import * as LAYER from './layer.js';
import { cam, sx, sy, wx, wy, viewport, visibleView, markDirty, fit, panInto } from '../plane/camera.js';
import { docBox, intersects } from '../plane/projection.js';
import { LAY_FS, LINE_H, EDGE_GAP } from '../plane/layout.js';
import { CORNER, HOLD, ADDRESS, TARGET } from '../plane/register.js';
import { holdTop, cutWords } from '../plane/labels.js';
import { accountOf, documentOf, commonsType } from '../model/address.js';
import { t, heard, sentence, sentences, counted, typeName, ended, FIELD } from '../strings.js';
import { esc } from '../util.js';

/** @typedef {import('../model/records.js').Link} Link */

/**
 * @typedef {Object} Readers — what the face reads from owners above it or beside it, handed in once by the app
 * @property {() => number} top the one line's bottom, px (L-LINE's `bottom`)
 * @property {(addr: string) => boolean} focused does the walk stand on the form at an address (N-WALK's `current`)
 * @property {(addr: string, byKey: boolean) => void} leap a LEAP to a document (N-GO's `leapTo`)
 * @property {() => void} handOff the focus given to the walk's element, where a face it stood in is taken down (N-WALK's `focusItem`)
 */

/**
 * @typedef {Object} Face — one face standing
 * @property {string} slot the slot's address
 * @property {number} n its serial, which its elements' ids carry
 * @property {HTMLElement} body its body, set inside the form's corners
 * @property {HTMLElement} corner its corner, beside the column or at its head
 * @property {string} html what its body was last written from
 * @property {string} cornerHtml what its corner was last written from
 * @property {boolean} reserved it was drawn while its read was out: its list clause's room and its corner's row stand until it is left
 * @property {boolean} whole its statement stands whole
 * @property {Layout | null} layout its body's rows as last laid out
 * @property {string} said what its corner last said in the status region
 * @property {boolean} head its corner stood at its head when last placed
 */

/**
 * @typedef {Object} Row — one row of a face's body, in layout px (P-LAY's LAY_FS)
 * @property {string} cls its kind: `head`, `told`, `state`, `clause`, `own`, `act`, `run`, `item`, `more`, `band`
 * @property {string} html its markup
 * @property {number} top its top
 * @property {number} h its height
 */

/**
 * @typedef {Object} Layout — a face's body as laid out (`layOut`)
 * @property {Row[]} rows in their order down the body
 * @property {number} width the column's width, layout px
 * @property {number} pitch a line's pitch, layout px
 * @property {number} room the rectangle's depth below the column's top, layout px
 * @property {boolean} whole the statement stands whole
 * @property {number} folded the list's rows folded into its fold row; 0 where none
 * @property {boolean} cut a row's first line was cut from its end
 * @property {number} band the depth the corner's rows take at the head, layout px; 0 beside the column
 */

/** the faces standing, by the slot's address */
/** @type {Map<string, Face>} */
const faces = new Map();
/** @type {Set<string>} the slots whose statement stood whole in the page's session (P41) */
const seenWhole = new Set();
/** @type {Map<string, 'count' | 'social'>} the list open at each face */
const open = new Map();
/** @type {Set<string>} the faces whose folded rows the reader opened whole */
const unfolded = new Set();
/** @type {Map<string, string>} the link followed to arrive at each face, while its told line stands */
const told = new Map();
/** @type {HTMLElement | null} */
let layer = null;
let serial = 0;
/** @type {Readers} */
let read = { top: () => 0, focused: () => false, leap: () => {}, handOff: () => {} };

/** the readers the app hands in */
export function readers(/** @type {Partial<Readers>} */ r) { read = { ...read, ...r }; }

/** the face's layer, after the corners in the page's order, and its own clicks and focus (see the head) */
export function attach(/** @type {HTMLElement} */ el) {
  layer = el;
  el.addEventListener('click', (e) => onClick(/** @type {MouseEvent} */ (e)));
  el.addEventListener('focusin', (e) => onFocus(/** @type {FocusEvent} */ (e)));
}

/** a change of the page's class (see the head): a new session's first opening of each face shows its statement whole again */
export function classChanged() { seenWhole.clear(); }

/**
 * A landing at a face (N-GO's): a new opening of it — its statement whole
 * where it has not stood whole in the session (P41), else compact — the told
 * line naming the link followed where the landing was a follow's, and none
 * where it was not.
 * @param {string} slot
 * @param {{link?: string | null}} [o] `link` the link followed to arrive
 */
export function landed(slot, o = {}) {
  for (const s of [...told.keys()]) if (s !== slot) told.delete(s);
  if (o.link) told.set(slot, o.link); else told.delete(slot);
  const f = faces.get(slot);
  if (f) { f.whole = !seenWhole.has(slot); seenWhole.add(slot); f.said = ''; }
  markDirty();
}

/** an act that leaves a face (N-GO's every navigation act): its told line goes (see the head) */
export function acted() { if (told.size) { told.clear(); markDirty(); } }

/** does a slot's face stand now (see the head)? */
export const stands = (/** @type {string} */ addr) => faces.has(addr);

/** the faces standing, by their slots' addresses */
export const standing = () => [...faces.keys()];

/**
 * The faces that stand this frame (see the head): each place of the one form
 * past the mailbox (M-REC's `faceSlot`) at its reading scale whose rectangle
 * meets the visible view.
 * @returns {string[]}
 */
function wanted() {
  const { VW, VH } = viewport(), seen = visibleView(read.top());
  const v = { x0: wx(0), y0: wy(seen.y), x1: wx(VW), y1: wy(VH) };
  return REC.forms().filter((a) => REC.faceSlot(a) && LAYER.atReadingScale(a) && intersects(LAYER.shapeOf(a), v));
}

/**
 * The face's frame (see the head): each face that stands mounted, laid out
 * where what it is made from moved, and placed; each that no longer stands
 * taken down, its list closed and its told line gone.
 */
export function frame() {
  if (!layer) return;
  const want = new Set(wanted());
  for (const slot of [...faces.keys()]) if (!want.has(slot)) unmount(slot);
  for (const slot of want) { const f = faces.get(slot) || mount(slot); draw(f); place(f); }
}

/** a face mounted: its two elements in the layer, its opening's statement whole where none stood whole in the session */
function mount(/** @type {string} */ slot) {
  const n = ++serial;
  const body = document.createElement('section');
  body.className = 'slotface';
  body.dataset.face = slot;
  const corner = document.createElement('div');
  corner.className = 'facecorner';
  corner.dataset.corner = slot;
  corner.dataset.faceCorner = slot;
  /** @type {HTMLElement} */ (layer).appendChild(corner);
  /** @type {HTMLElement} */ (layer).appendChild(body);
  const whole = !seenWhole.has(slot);
  seenWhole.add(slot);
  /** @type {Face} */
  const f = { slot, n, body, corner, html: '', cornerHtml: '', reserved: LK.slotFold(slot).state === 'reading', whole, layout: null, said: '', head: false };
  faces.set(slot, f);
  return f;
}

/** a face taken down: its elements gone, its list closed, its folded rows folded again and its told line gone (FP-36: the place left) */
function unmount(/** @type {string} */ slot) {
  const f = faces.get(slot);
  if (!f) return;
  const had = f.body.contains(document.activeElement) || f.corner.contains(document.activeElement);
  f.body.remove(); f.corner.remove();
  faces.delete(slot); open.delete(slot); unfolded.delete(slot); told.delete(slot);
  if (had) read.handOff();
}

// ---- the words ---------------------------------------------------------------------------------------------------

/** the slot's name as the reader is shown it, with its state set in after it; the state alone at a slot whose name is not given (see the head; T-LAYER's `unwrittenWords`) */
export const headWords = (/** @type {string} */ slot) => LAYER.unwrittenWords(slot);

/** what every other reader meets at a slot: its plain name with its state (see the head) */
const othersWords = (/** @type {string} */ slot) => LAYER.unwrittenWords(slot, false);

/** the board as the status region names it: what the list clause scopes the read to */
function boardName() {
  const b = REC.board();
  return b ? t('L.mirror.board.name', { node: '1', origin: b.origin }) : '';
}

/**
 * The statement's list clause, keyed to what the face's read kept (the slot's
 * face decision, point 2): its scope at a count; the social mark's list
 * where it stands alone; at zero what the silence means and that nothing is
 * listed here; none while the read is out or where it failed.
 * @param {ReturnType<typeof LK.slotFold>} fold
 * @returns {string[]} its sentences
 */
function clauseOf(fold) {
  if (fold.state !== 'answered') return [];
  const board = boardName();
  if (fold.count.length) return [sentence('L.slot-face.clause.counted', { board })];
  if (fold.social.length) return [sentence('L.slot-face.clause.social', { board })];
  return [sentence('L.slot-face.clause.zero', { board }), sentence('L.slot-face.clause.zero.not')];
}

/** every list clause the read can key, as sentences: what a face first drawn while its read was out keeps room for */
const CLAUSES = () => { const board = boardName(); return [[sentence('L.slot-face.clause.counted', { board })], [sentence('L.slot-face.clause.social', { board })], [sentence('L.slot-face.clause.zero', { board }), sentence('L.slot-face.clause.zero.not')]]; };

/** the string the list clause's first sentence is, keyed as `clauseOf` keys it; null where none stands */
function clauseId(/** @type {ReturnType<typeof LK.slotFold>} */ fold) {
  if (fold.state !== 'answered') return null;
  return fold.count.length ? 'L.slot-face.clause.counted' : fold.social.length ? 'L.slot-face.clause.social' : 'L.slot-face.clause.zero';
}

/** the statement's own sentences, before its clause: what the place is, that nothing here says whether a page stands at it, and that the links naming it differ by reader */
const statementWords = () => [sentence('L.slot-face.what'), sentence('L.slot-face.asserts'), sentence('L.slot-face.differs')];

/**
 * The statement whole, as the ear reads it every time (FP-26): its sentences
 * then its list clause as the read keyed it.
 * @param {string} slot
 * @returns {string}
 */
export function statementOf(slot) { return sentences(...statementWords(), ...clauseOf(LK.slotFold(slot))); }

/**
 * A face's words as the ear reads them (see the head; FP-26): its head's
 * first row as a sentence, the corner's items as they stand, whole, and the
 * statement whole — what the form's mirror item is described by while the
 * face stands (N-WALK's), and what the landing's announcement says of the
 * place and its state; '' where no face stands.
 * @param {string} slot
 * @returns {string}
 */
export function heardWords(slot) {
  if (!faces.has(slot)) return '';
  const head = headWords(slot), fold = LK.slotFold(slot);
  const items = itemsOf(fold).filter((k) => k !== 'arriving').map((k) => (k === 'unread' ? t('L.slot-face.unread') : k === 'count' ? countWords(fold.count.length, false) : '◦'));
  return sentences(ended(head.charAt(0).toUpperCase() + head.slice(1)), ...items.map((w) => ended(w.charAt(0).toUpperCase() + w.slice(1))), statementOf(slot));
}

/** the count's words, whole or compact, its noun agreeing with it, each saying the links end at the address */
function countWords(/** @type {number} */ n, /** @type {boolean} */ compact) {
  return t(countId(n, compact), { n: counted(n, '', '').n });
}

/** the string the count's words are, by its number and its form */
const countId = (/** @type {number} */ n, /** @type {boolean} */ compact) => counted(n, compact ? 'L.slot-face.count.compact.1' : 'L.slot-face.count.1', compact ? 'L.slot-face.count.compact' : 'L.slot-face.count').id;

/** the fold row's words, its noun agreeing with its count */
const moreWords = (/** @type {number} */ n) => { const c = counted(n, 'L.slot-face.more.1', 'L.slot-face.more'); return t(c.id, { n: c.n }); };

/** is a link a letter — its type the mail type or one under it (the commons' 15) — whose row names no type */
const letter = (/** @type {Link} */ l) => { const ty = commonsType(l.type); return !!ty && ty.ordinal === 15; };

/** a document's first line as the page holds it: its index row's label; null where it holds none */
const firstLineOf = (/** @type {string} */ home) => { const p = REC.place(documentOf(home) || home); return p && p.label ? p.label : null; };

/** the told line's words: the link followed, by its home's address, that home's first line where the page holds one, and its type where it is no letter */
function toldWords(/** @type {string} */ link) {
  const l = REC.link(link), home = l ? l.home : documentOf(link) || link;
  const first = firstLineOf(home);
  return [t('L.slot-face.told', { address: home }), first, l && l.type && !letter(l) ? typeName(l.type) : null].filter(Boolean).join(FIELD);
}

/** the reader's own plain word and, at their bio, what every other reader meets there meanwhile (see the head); none at another's slot */
function ownWords(/** @type {string} */ slot) {
  if (!REC.isOwn(slot)) return null;
  const name = LAYER.slotNamed(slot);
  const word = sentence('L.slot-face.own.none', { name: name ? name.text : slot });
  const others = REC.slotName(slot) === 'L.well-known.bio' ? sentence('L.slot-face.own.others', { words: othersWords(slot) }) : null;
  return { word, others };
}

// ---- the layout --------------------------------------------------------------------------------------------------

/** words' width in layout px, in a face (T-LAYER's `widthOf`) */
const wide = (/** @type {string} */ s, /** @type {import('../plane/register.js').Face} */ f = 'client') => LAYER.widthOf(s, f) * LAY_FS;

/** words broken at their spaces into rows of a width, each row as wide as it can be (see the head) */
export function wrap(/** @type {string} */ text, /** @type {number} */ width) {
  /** @type {string[]} */
  const rows = [];
  let row = '';
  for (const w of text.split(' ')) {
    const next = row ? `${row} ${w}` : w;
    if (row && wide(next) > width + 1e-6) { rows.push(row); row = w; } else row = next;
  }
  if (row) rows.push(row);
  return rows.length ? rows : [''];
}

/** a row of words as wide as a width holds, its last field cut from its end on a word where it is wider (P-LABEL's `cutWords`) */
function cutRow(/** @type {string[]} */ fields, /** @type {number} */ cutAt, /** @type {number} */ width) {
  const whole = fields.join(FIELD);
  if (wide(whole) <= width + 1e-6 || cutAt < 0) return { text: whole, cut: false };
  const before = fields.slice(0, cutAt).join(FIELD), after = fields.slice(cutAt + 1).join(FIELD);
  const join = (/** @type {string} */ s) => [before, s, after].filter((x) => x).join(FIELD);
  const s = cutWords(fields[cutAt], (c) => wide(join(c)) <= width + 1e-6);
  return { text: s ? join(s) : join(''), cut: true };
}

/**
 * The list's rows, newest first (see the head): a run's writer once at its
 * head — "yours" over the reader's own — then its rows, each its home's
 * address past the writer's prefix, its first line, its type where it is no
 * letter, the followed link's marked.
 * @param {Link[]} links newest first
 * @param {string | null} followed
 * @returns {Array<{head: string | null, link: Link, fields: string[], first: number, arrival: boolean}>} each row with the run head standing before it, where it opens a run
 */
function listRows(links, followed) {
  /** @type {Array<{head: string | null, link: Link, fields: string[], first: number, arrival: boolean}>} */
  const out = [];
  let writer = '';
  for (const l of links) {
    const account = l.owner || accountOf(l.home) || '';
    const head = account !== writer ? (REC.isOwn(l.home) ? t('L.slot-face.yours') : account) : null;
    writer = account;
    const first = firstLineOf(l.home);
    const fields = [account ? l.home.slice(account.length) : l.home, ...(first ? [first] : []), ...(l.type && !letter(l) ? [typeName(l.type)] : [])];
    out.push({ head, link: l, fields, first: first ? 1 : -1, arrival: l.addr === followed });
  }
  return out;
}

/** a row's markup: its words, set unwrapped at its top (see the head), by its index in the layout */
const rowHTML = (/** @type {Row} */ r, /** @type {number} */ i) => `<div class="frow ${r.cls}" data-row="${i}" style="top:${r.top}px;height:${r.h}px">${r.html}</div>`;

/** text rows' markup, one line each, the space a row breaks at kept at its end so the words read on across rows */
const lines = (/** @type {string[]} */ rows) => rows.map((s, i) => `<span class="fline">${esc(i < rows.length - 1 ? s + ' ' : s)}</span>`).join('');

/**
 * A face's body laid out (see the head; THE FACE's BUDGET): its rows in order
 * — the head beside the column, else the band the corner's rows take at the
 * head; the told line; the statement, whole or compact; its list clause, its
 * room kept where the face was first drawn while its read was out; the
 * owner's plain word and its clause; the link act's plain word; the list
 * open — the list's oldest rows folded first into one row with their count
 * where the room cannot hold them, each row's first line cut to keep it one
 * line, and the statement compact only once every row is folded.
 * @param {Face} f
 * @returns {Layout}
 */
export function layOut(f) {
  const slot = f.slot, fold = LK.slotFold(slot), F = fit(), ff = LAYER.formFold(slot), col = ff.columns[0], k = LAY_FS / ff.fs;
  const width = col.w * k, P = LINE_H * LAY_FS, room = col.h * k, gap = P / 2;
  const band = F.head ? cornerBand(f, fold, F.px) : 0;
  const which = open.get(slot) ?? null, items = which ? (which === 'count' ? fold.count : fold.social) : [];
  const followed = told.get(slot) ?? null;
  const own = ownWords(slot);
  /** the clause's rows; its room, where the face was first drawn while its read was out, the most any keyed clause takes */
  const clauseRows = (/** @type {string[]} */ s) => (s.length ? wrap(sentences(...s), width) : []);
  const reservedRows = f.reserved ? Math.max(...CLAUSES().map((c) => clauseRows(c).length)) : 0;
  const clause = clauseRows(clauseOf(fold));
  const fixed = (/** @type {boolean} */ whole) => {
    /** @type {Array<{cls: string, rows: number, html: string}>} */
    const parts = [];
    if (!F.head) parts.push({ cls: 'head', rows: 1, html: headHTML(slot) });
    if (followed) { const r = wrap(toldWords(followed), width); parts.push({ cls: 'told', rows: r.length, html: `<span data-string="L.slot-face.told">${lines(r)}</span>` }); }
    if (whole) {
      const r = wrap(sentences(...statementWords()), width);
      parts.push({ cls: 'state', rows: r.length, html: `<span class="fstatement" data-string="L.slot-face.what">${lines(r)}</span>` });
      const n = Math.max(clause.length, reservedRows), id = clauseId(fold);
      if (n) parts.push({ cls: 'clause', rows: n, html: id ? `<span data-string="${id}">${lines(clause)}</span>` : '' });
    } else parts.push({ cls: 'state', rows: 1, html: compactHTML(f) });
    if (own) {
      const w = wrap(own.word, width);
      parts.push({ cls: 'own', rows: w.length, html: `<button type="button" class="fact" data-string="L.slot-face.own.none" data-inert="${esc(own.word)}" aria-disabled="true" tabindex="-1">${lines(w)}</button>` });
      if (own.others) { const o = wrap(own.others, width); parts.push({ cls: 'own-clause', rows: o.length, html: `<span data-string="L.slot-face.own.others">${lines(o)}</span>` }); }
    }
    const act = sentence('L.slot-face.no-link-act'), a = wrap(act, width);
    parts.push({ cls: 'act', rows: a.length, html: `<button type="button" class="fact" data-string="L.slot-face.no-link-act" data-inert="${esc(act)}" aria-disabled="true" tabindex="-1">${lines(a)}</button>` });
    return parts;
  };
  const depth = (/** @type {Array<{rows: number}>} */ parts) => band + parts.reduce((d, p, i) => d + p.rows * P + (i || band ? gap : 0), 0);
  // the list's rows: one line each, its first line cut from its end where the row is wider than the column
  const all = listRows(items, followed);
  let cut = false;
  const made = all.map((r) => { const c = cutRow(r.fields, r.first, width); if (c.cut) cut = true; return { ...r, text: c.text }; });
  /** the list's lines with its newest `n` rows standing and the rest folded into one row */
  const listLines = (/** @type {number} */ n) => {
    const shown = made.slice(0, n), heads = shown.filter((r) => r.head !== null).length;
    return shown.length + heads + (n < made.length ? 1 : 0);
  };
  let whole = f.whole, parts = fixed(whole), shown = made.length;
  if (which) {
    const fits = (/** @type {number} */ n) => depth(parts) + gap + listLines(n) * P <= room + 1e-6;
    if (!unfolded.has(slot)) while (shown > 0 && !fits(shown)) shown--;
    // every row folded and the room still short: the statement compact (THE FACE's BUDGET)
    if (whole && !unfolded.has(slot) && shown === 0 && !fits(0)) { whole = false; parts = fixed(false); shown = made.length; while (shown > 0 && !fits(shown)) shown--; }
  }
  /** @type {Row[]} */
  const rows = [];
  let y = band;
  if (band) rows.push({ cls: 'band', html: '', top: 0, h: band });
  parts.forEach((p, i) => { y += i || band ? gap : 0; rows.push({ cls: p.cls, html: p.html, top: y, h: p.rows * P }); y += p.rows * P; });
  if (which) {
    y += gap;
    let first = true;
    for (const r of made.slice(0, shown)) {
      if (r.head !== null) { rows.push({ cls: 'run', html: `<span class="fline"${r.head === t('L.slot-face.yours') ? ' data-string="L.slot-face.yours"' : ''}>${esc(r.head)}</span>`, top: y, h: P }); y += P; }
      const mark = r.arrival ? '▸ ' : '';
      rows.push({ cls: 'item', html: `<button type="button" class="fitem${r.arrival ? ' arrival' : ''}" data-leap="${esc(r.link.home)}" tabindex="${first ? 0 : -1}"><span class="fline">${esc(mark + r.text)}</span></button>`, top: y, h: P });
      first = false; y += P;
    }
    if (shown < made.length) { rows.push({ cls: 'more', html: `<button type="button" class="fitem more" data-string="L.slot-face.more" data-more="${made.length - shown}" tabindex="${first ? 0 : -1}"><span class="fline">${esc(moreWords(made.length - shown))}</span></button>`, top: y, h: P }); y += P; }
  }
  return { rows, width, pitch: P, room, whole, folded: which ? made.length - shown : 0, cut: which ? cut && shown > 0 : false, band };
}

/** the depth the corner's rows take at the face's head, layout px (see the head): the head's first row and the corner's own row, where it stands, at the reading line's pitch */
function cornerBand(/** @type {Face} */ f, /** @type {ReturnType<typeof LK.slotFold>} */ fold, /** @type {number} */ px) {
  const P = LINE_H * LAY_FS;
  const row = cornerRowStands(f, fold) ? Math.max(TARGET.min, CORNER.px * 1.6) * (LAY_FS / px) : 0;
  return P + row;
}

/** does the corner's own row stand at one column: drawn where the face was first drawn while its read was out, or where it holds an item, and standing until the face is left (see the head) */
const cornerRowStands = (/** @type {Face} */ f, /** @type {ReturnType<typeof LK.slotFold>} */ fold) => f.reserved || itemsOf(fold).length > 0;

/** the head's first row's markup beside the column: the slot's name and its state, then its address at the row's end */
function headHTML(/** @type {string} */ slot) {
  return `<span class="fname">${nameHTML(slot)}</span><span class="faddr" style="font-size:${(ADDRESS.px / fit().px).toFixed(4)}em">${esc(slot)}</span>`;
}

/** the head's words as markup, each string naming its id: the slot's name as the reader is shown it, then its state */
function nameHTML(/** @type {string} */ slot) {
  const name = LAYER.slotNamed(slot), state = `<span data-string="L.slot-face.unwritten">${esc(t('L.slot-face.unwritten'))}</span>`;
  return name ? `<span data-string="${esc(name.id)}">${esc(name.text)}</span> — ${state}` : state;
}

/** the statement's compact mark: its act opens it whole; the ear reads it whole as its description (FP-26) */
function compactHTML(/** @type {Face} */ f) {
  const ids = idsOf(f);
  return `<button type="button" class="fcompact" data-string="L.slot-face.compact" data-whole="1" aria-describedby="${ids.said}" tabindex="-1"><span class="fline">${esc(t('L.slot-face.compact'))}</span></button>`;
}

/** a face's elements' ids, by its serial */
const idsOf = (/** @type {Face} */ f) => ({ list: `face${f.n}-list`, said: `face${f.n}-said`, count: `face${f.n}-count`, social: `face${f.n}-social` });

// ---- the corner ---------------------------------------------------------------------------------------------------

/**
 * The corner's items as the read keyed them (see the head; the slot's face
 * decision, point 2): the count's place hollow while the read is out; "links
 * not read" where it failed; the count and the social mark where it kept
 * either; nothing at zero.
 * @param {ReturnType<typeof LK.slotFold>} fold
 * @returns {Array<'arriving' | 'unread' | 'count' | 'social'>}
 */
export function itemsOf(fold) {
  if (fold.state === 'reading') return ['arriving'];
  if (fold.state === 'failed') return ['unread'];
  return [...(fold.count.length ? /** @type {const} */ (['count']) : []), ...(fold.social.length ? /** @type {const} */ (['social']) : [])];
}

/** the corner's markup: its head's first row at one column, then its items, one line of acts */
function cornerHTML(/** @type {Face} */ f, /** @type {boolean} */ head, /** @type {boolean} */ compact) {
  const fold = LK.slotFold(f.slot), ids = idsOf(f), which = open.get(f.slot) ?? null;
  const item = (/** @type {'arriving' | 'unread' | 'count' | 'social'} */ k) => {
    if (k === 'arriving') return `<span class="fcount arriving" aria-hidden="true" style="width:${Math.round(LAYER.cornerPx(countWords(10, true)))}px"></span>`;
    if (k === 'unread') return `<span class="funread" data-string="L.slot-face.unread">${esc(t('L.slot-face.unread'))}</span>`;
    if (k === 'count') return `<button type="button" class="fcount" id="${ids.count}" data-string="${countId(fold.count.length, compact)}" data-list="count" aria-expanded="${which === 'count'}" aria-controls="${ids.list}">${esc(countWords(fold.count.length, compact))}</button>`;
    return `<button type="button" class="fsocial" id="${ids.social}" data-list="social" aria-label="${esc(heard('◦'))}" aria-expanded="${which === 'social'}" aria-controls="${ids.list}">◦</button>`;
  };
  const items = itemsOf(fold).map(item).join('');
  const bar = items ? `<div class="fbar" role="toolbar">${items}</div>` : '';
  if (!head) return bar;
  const fsPx = LAYER.formFold(f.slot).fs * cam.scale;
  const name = headWords(f.slot), width = LAYER.formFold(f.slot).columns[0].w * cam.scale;
  // at one column the address gives way first where the row cannot hold it whole (#23); the one line keeps it whole
  const both = LAYER.widthOf(name, 'client') * fsPx + LAYER.widthOf(f.slot, 'ident') * ADDRESS.px + CORNER.gap <= width;
  const row = `<div class="fhead" style="font-size:${fsPx.toFixed(2)}px;line-height:${(LINE_H * fsPx).toFixed(2)}px;height:${(LINE_H * fsPx).toFixed(2)}px"><span class="fname">${nameHTML(f.slot)}</span>${both ? `<span class="faddr" style="font-size:${ADDRESS.px}px">${esc(f.slot)}</span>` : ''}</div>`;
  return row + (cornerRowStands(f, fold) ? `<div class="fbarrow">${bar}</div>` : '');
}

// ---- drawing and placing ---------------------------------------------------------------------------------------------

/**
 * A face drawn for the frame (see the head): its body and its corner written
 * only where what they are made from moved, the focus kept on the act it
 * stood on (FP-20); its corner's items said once as they fill (FP-36).
 * @param {Face} f
 */
function draw(f) {
  // drawn while its read is out — as it first stands, or at a landing that reads it again — its clause's room and its corner's row kept until it is left
  if (LK.slotFold(f.slot).state === 'reading') f.reserved = true;
  const F = fit(), L = layOut(f), ids = idsOf(f), focused = read.focused(f.slot);
  f.layout = L;
  const said = `<span id="${ids.said}" class="fsaid" hidden>${esc(heard(statementOf(f.slot)))}</span>`;
  const which = open.get(f.slot) ?? null;
  const inList = (/** @type {Row} */ r) => r.cls === 'run' || r.cls === 'item' || r.cls === 'more';
  const marked = L.rows.map((r, i) => ({ r, html: rowHTML(r, i) }));
  // the list's rows in the one region its opener names (`aria-controls`), which draws no head of its own
  const list = which ? `<div class="flist" id="${ids.list}" role="group" aria-labelledby="${which === 'count' ? ids.count : ids.social}">${marked.filter((m) => inList(m.r)).map((m) => m.html).join('')}</div>` : '';
  const html = `<div class="fbody" style="width:${L.width}px;height:${L.room}px">${marked.filter((m) => !inList(m.r)).map((m) => m.html).join('')}${list}${said}</div>`;
  if (html !== f.html) {
    FOCUS.keep(f.body, keyOf, () => { f.body.innerHTML = html; });
    f.html = html;
  }
  const compact = !F.head && LAYER.cornerPx(countWords(Math.max(1, LK.slotFold(f.slot).count.length), false)) > roomBeside(f);
  const c = cornerHTML(f, F.head, compact);
  if (c !== f.cornerHtml) {
    FOCUS.keep(f.corner, keyOf, () => { f.corner.innerHTML = c; });
    f.cornerHtml = c;
  }
  f.corner.classList.toggle('head', F.head);
  f.head = F.head;
  stops(f, focused);
  sayCorner(f);
}

/** the room the column's edge leaves the corner beside it, px (see the head) */
function roomBeside(/** @type {Face} */ f) {
  const ff = LAYER.formFold(f.slot), box = docBox(f.slot), shape = LAYER.shapeOf(f.slot), col = ff.columns[0];
  return (shape.x + shape.w - (box.x + col.x + col.w + EDGE_GAP * ff.fs)) * cam.scale;
}

/** the key a control of a face bears, which a rebuild puts the focus back on (N-FOCUS's `keep`) */
function keyOf(/** @type {Element} */ el) {
  const e = /** @type {HTMLElement} */ (el);
  return e.dataset ? e.dataset.list || e.dataset.leap || e.dataset.more || e.dataset.whole || (e.dataset.inert ? 'inert:' + e.dataset.inert : null) || null : null;
}

/**
 * A face's Tab stops (see the head; FP-20): while the walk stands on its
 * form, the corner's one stop — its first item, else the one the focus
 * stands on — the statement's mark, the owner's plain word, the link act's
 * plain word, the list's one stop; none, and hidden from assistive
 * technology, while it does not.
 * @param {Face} f
 * @param {boolean} mine
 */
function stops(f, mine) {
  const at = document.activeElement;
  const bar = /** @type {HTMLElement[]} */ ([...f.corner.querySelectorAll('button')]);
  const stop = bar.find((b) => b === at) || bar[0];
  for (const b of bar) b.tabIndex = mine && b === stop ? 0 : -1;
  for (const b of /** @type {HTMLElement[]} */ ([...f.body.querySelectorAll('.fcompact, .fact')])) b.tabIndex = mine ? 0 : -1;
  const rows = /** @type {HTMLElement[]} */ ([...f.body.querySelectorAll('.fitem')]);
  const row = rows.find((b) => b === at) || rows[0];
  for (const b of rows) b.tabIndex = mine && b === row ? 0 : -1;
  for (const el of [f.body, f.corner]) { if (mine) el.removeAttribute('aria-hidden'); else el.setAttribute('aria-hidden', 'true'); }
}

/** a face's corner's items said once each, politely, as they fill (FP-36): nothing for the hollow place, nothing at zero */
function sayCorner(/** @type {Face} */ f) {
  const fold = LK.slotFold(f.slot), items = itemsOf(fold).filter((k) => k !== 'arriving');
  const words = items.map((k) => (k === 'unread' ? t('L.slot-face.unread') : k === 'count' ? countWords(fold.count.length, false) : heard('◦'))).join(', ');
  if (!words || words === f.said) return;
  f.said = words;
  FOCUS.say(words);
}

/**
 * A face placed for the frame (see the head): its body by transform at the
 * column's top-left, its corner beside the column in its edge or across it at
 * the head, held to the top of the rectangle's visible part below the one
 * line while any of it is in view, and gone once it leaves.
 * @param {Face} f
 */
function place(f) {
  const ff = LAYER.formFold(f.slot), box = docBox(f.slot), col = ff.columns[0], shape = LAYER.shapeOf(f.slot);
  const s = cam.scale * ff.fs / LAY_FS;
  f.body.style.transform = `translate(${sx(box.x + col.x)}px, ${sy(box.y + col.y)}px) scale(${s})`;
  const top = read.top() + HOLD.gap, rowTop = sy(box.y + col.y), foot = sy(shape.y + shape.h);
  const h = f.corner.offsetHeight || cornerHeight(f);
  const gone = foot < read.top() || rowTop > viewport().VH;
  f.corner.style.display = gone || !f.cornerHtml ? 'none' : '';
  const x = f.head ? sx(box.x + col.x) : sx(box.x + col.x + col.w + EDGE_GAP * ff.fs);
  const y = holdTop(rowTop, top, foot, h);
  f.corner.style.transform = `translate(${Math.round(x)}px, ${Math.round(y)}px)`;
  if (f.head) f.corner.style.width = `${(col.w * cam.scale).toFixed(2)}px`; else f.corner.style.width = '';
}

/** the corner's height where the platform lays nothing out: its rows at their pitch (see the head) */
function cornerHeight(/** @type {Face} */ f) {
  const fold = LK.slotFold(f.slot), row = Math.max(TARGET.min, CORNER.px * 1.6);
  if (!f.head) return itemsOf(fold).length ? row : 0;
  return LINE_H * LAYER.formFold(f.slot).fs * cam.scale + (cornerRowStands(f, fold) ? row : 0);
}

/**
 * Where a face's corner stands on screen (see the head), for the gate and
 * the tests: its box as placed, and the body's head row's top on screen.
 * @param {string} slot
 * @returns {{corner: {x: number, y: number, h: number, head: boolean, shown: boolean}, rowTop: number, columnRight: number} | null}
 */
export function cornerAt(slot) {
  const f = faces.get(slot);
  if (!f) return null;
  const ff = LAYER.formFold(slot), box = docBox(slot), col = ff.columns[0];
  const m = /translate\(([-\d.]+)px, ([-\d.]+)px\)/.exec(f.corner.style.transform || '');
  return { corner: { x: m ? Number(m[1]) : NaN, y: m ? Number(m[2]) : NaN, h: f.corner.offsetHeight || cornerHeight(f), head: f.head, shown: f.corner.style.display !== 'none' }, rowTop: sy(box.y + col.y), columnRight: sx(box.x + col.x + col.w) };
}

/**
 * What a face draws now, for the gate and the tests (see the head): its
 * layout, its corner's items, the list open, whether its statement stands
 * whole, and its told link; null where it does not stand.
 * @param {string} slot
 */
export function faceOf(slot) {
  const f = faces.get(slot);
  if (!f) return null;
  return { slot, layout: f.layout, items: itemsOf(LK.slotFold(slot)), open: open.get(slot) ?? null, whole: !!f.layout && f.layout.whole, told: told.get(slot) ?? null, body: f.body, corner: f.corner, reserved: f.reserved };
}

// ---- the acts -------------------------------------------------------------------------------------------------------

/**
 * A corner item's act (see the head): its list opened in the face's one list
 * region, in the place of any list standing there, the item drawn open; its
 * own list closed where it stands open. Nothing above the region moves.
 * @param {string} slot
 * @param {'count' | 'social'} which
 */
export function toggleList(slot, which) {
  if (open.get(slot) === which) open.delete(slot); else open.set(slot, which);
  unfolded.delete(slot);
  markDirty();
}

/** the statement's compact mark's act: the statement whole while the face stands (FP-26) */
export function wholeStatement(/** @type {string} */ slot) { const f = faces.get(slot); if (f) { f.whole = true; markDirty(); } }

/** the fold row's act: the rows it folded opened whole (P48) */
export function unfold(/** @type {string} */ slot) { unfolded.add(slot); markDirty(); }

/** a click in the face's layer (see the head): a corner item, the statement's mark, an inert act, the fold row, a row */
function onClick(/** @type {MouseEvent} */ e) {
  const target = /** @type {HTMLElement} */ (e.target);
  if (!target || typeof target.closest !== 'function') return;
  const holder = /** @type {HTMLElement | null} */ (target.closest('[data-face], [data-face-corner]'));
  const slot = holder ? holder.dataset.face || holder.dataset.faceCorner || '' : '';
  if (!slot) return;
  const byKey = FOCUS.byKey(e), act = /** @type {HTMLElement | null} */ (target.closest('button'));
  if (!act) return;
  e.stopPropagation();
  if (act.dataset.list === 'count' || act.dataset.list === 'social') toggleList(slot, act.dataset.list);
  else if (act.dataset.whole) wholeStatement(slot);
  else if (act.dataset.inert) FOCUS.say(act.dataset.inert, false, true);
  else if (act.dataset.more) unfold(slot);
  else if (act.dataset.leap) read.leap(act.dataset.leap, byKey);
}

/**
 * A focus landing on a face's row (see the head; FP-37; WCAG 2.4.11): the
 * least pan that brings the row's whole line clear below the one line and the
 * held rows.
 * @param {FocusEvent} e
 */
function onFocus(e) {
  const target = /** @type {HTMLElement} */ (e.target);
  if (!target || typeof target.closest !== 'function') return;
  const row = /** @type {HTMLElement | null} */ (target.closest('.frow'));
  const holder = /** @type {HTMLElement | null} */ (target.closest('[data-face]'));
  if (!row || !holder) return;
  bringClear(holder.dataset.face || '', Number(row.dataset.row));
}

/**
 * The least pan that brings a face's row's whole line clear below the one
 * line and the rows its corner holds there (see the head; FP-37; WCAG
 * 2.4.11): its box as the face's layout places it, never a guess.
 * @param {string} slot
 * @param {number} i the row's index in the face's layout
 * @returns {{dx: number, dy: number}} the pan made
 */
export function bringClear(slot, i) {
  const f = faces.get(slot), box = f ? rowBox(f, i) : null;
  if (!f || !box) return { dx: 0, dy: 0 };
  const at = cornerAt(slot), held = at && at.corner.shown ? at.corner.y + at.corner.h : 0;
  const moved = panInto(box, visibleView(Math.max(read.top(), held)));
  if (moved.dx || moved.dy) { markDirty(); place(f); }
  return moved;
}

/** a face's row's box on screen, as its layout places it and its body stands (`place`); null where it has no such row */
function rowBox(/** @type {Face} */ f, /** @type {number} */ i) {
  const r = f.layout ? f.layout.rows[i] : null;
  if (!r || !f.layout) return null;
  const ff = LAYER.formFold(f.slot), box = docBox(f.slot), col = ff.columns[0], s = cam.scale * ff.fs / LAY_FS;
  return { x: sx(box.x + col.x), y: sy(box.y + col.y) + r.top * s, w: f.layout.width * s, h: r.h * s };
}

/**
 * A face's rows on screen (see the head), for the gate and the tests: each its
 * kind, its index and its box as the face's layout places it.
 * @param {string} slot
 * @returns {Array<{cls: string, i: number, x: number, y: number, w: number, h: number}>}
 */
export function rowBoxes(slot) {
  const f = faces.get(slot);
  if (!f || !f.layout) return [];
  return f.layout.rows.map((r, i) => ({ cls: r.cls, i, .../** @type {{x: number, y: number, w: number, h: number}} */ (rowBox(f, i)) }));
}

/**
 * ↓ or ↑ among a face's stops (N-KEYS'): the focus moved to the next stop,
 * or the one before, in the order they are drawn, staying at the ends.
 * @param {Element} at the element the focus stands on
 * @param {1 | -1} dir
 * @returns {boolean} the focus moved
 */
export function step(at, dir) {
  const holder = /** @type {HTMLElement | null} */ (at && typeof at.closest === 'function' ? at.closest('[data-face], [data-face-corner]') : null);
  const slot = holder ? holder.dataset.face || holder.dataset.faceCorner || '' : '';
  const f = faces.get(slot);
  if (!f) return false;
  const all = /** @type {HTMLElement[]} */ ([...f.corner.querySelectorAll('button'), ...f.body.querySelectorAll('button')]);
  const i = all.indexOf(/** @type {HTMLElement} */ (at)), to = all[Math.max(0, Math.min(all.length - 1, (i < 0 ? -1 : i) + dir))];
  if (!to || to === at) return false;
  if (to.classList.contains('fitem')) for (const b of /** @type {HTMLElement[]} */ ([...f.body.querySelectorAll('.fitem')])) b.tabIndex = b === to ? 0 : -1;
  return FOCUS.land(to);
}

/** is an element in a face, and whose (N-KEYS'): the slot's address, or null */
export function faceHolding(/** @type {Element | null} */ el) {
  const holder = el && typeof el.closest === 'function' ? /** @type {HTMLElement | null} */ (el.closest('[data-face], [data-face-corner]')) : null;
  return holder ? holder.dataset.face || holder.dataset.faceCorner || null : null;
}

/** the tests' reset: every face taken down and every memory of what was shown cleared */
export function _reset() {
  for (const slot of [...faces.keys()]) unmount(slot);
  seenWhole.clear(); open.clear(); unfolded.clear(); told.clear(); layer = null; serial = 0;
  read = { top: () => 0, focused: () => false, leap: () => {}, handOff: () => {} };
}

