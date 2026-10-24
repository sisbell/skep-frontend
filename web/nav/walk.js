// N-WALK — the linearization, THE WALK'S POSITION and the ARIA mirror (the
// structure record §3.2 "N-WALK"; S-27 (a) the mirror inside it; D5 §4 the
// focus model; foundations §2.7). Layer 2. Mixed: the tree arithmetic pure,
// the mirror ENGINE-BOUND. State: VIEW — the walk's position (the element the
// walk stands on, its siblings and the levels above) and the position a
// landing named inside the focused span (the one line's position, W-01 step
// 3's "position honored", until the walk moves) and the count of its moves —
// THE ONE OWNER of the walk's position (FP-10). THE ORDER OF MOVES: every
// move — a walk key, a landing, a re-take — counts itself as it starts, and
// one whose reads a later move overtook sets nothing when they answer and
// flies the camera nowhere, so the walk stands where the latest move put it
// whatever order the reads answer in. THE FOCUS IS N-FOCUS's (FP-20): the
// page has one focus, the platform's, and every move of it this module asks
// for goes through the controller's `land` — a walk key, a landing, a
// key-made re-take each put the platform's focus on the walk's element
// wherever the key was pressed (rules 10, 12), the ring drawn where a key
// made the move and put out by a pointer's landing or a camera-made re-take
// (D5 §4 rule 2, the platform's focus-visible rule); a camera-made re-take
// carries the focus to the new element only where the mirror held it, and
// leaves a focus standing in the one line, a card or the scene where it is;
// and no move takes the caret from a field the reader types in, where the
// focus stays until the field closes onto the walk's element (N-FOCUS's
// `land`; issue #171's rule 2).
// Every move names a position or none, so a landing's position never
// outlives the span it was named in: a walk key names none, and the line
// reads the span's own first position. At launch the platform's focus rests
// on the walk's element with the ring out (rule 21). Enter at a focused span
// selects the block whole, as a click on plain text does, until the editor's
// caret exists (D8; K-7's "text takes the caret" waits on D6); at a withheld
// run it shows the run's face whole, C-67's pointer its offered act (K-7,
// N-KEYS'; O-FACES's `withheldRun`).
// The plane linearizes board › account › document › block | link in record
// order (S3 Q6) — EACH BOX ONCE, AS THE VERSION IT SHOWS (issue #154's
// design decision: "The box shows one version"; N-GO's `shownIn`, the
// reader `shown`): an account's documents are its boxes — every one the
// plane draws, the model's one list (M-REC's `known`): its index's places and
// each it holds a read's answer for, a covered one among them (issue #177;
// FP-29) — each the version
// its box shows, its spans and links that version's, and a landing or a
// re-take at a document stands on the version its box shows; at reading
// scale the walk holds THE LINKS THE READING SCALE
// DRAWS (D5 §4 rule 2: the owner's and the person's own; others' only where a
// peek or a lens shows them), after the blocks — EXACTLY WHAT IS DRAWN, where
// it is drawn (issue #202's design decision: "The mirror lists exactly what is
// drawn. A run's links go on the run's item"): an end LK draws at a withheld
// run (LK's `Shown.run`) is a child of the run's item, never a link of the
// document's own — D5 §4 rule 2's "a bundle's [children] its links", K-53's
// "→ into its links" — the run's item saying how many end there and standing
// expanded, → entering them a level below, Enter at each opening its card
// (K-55) and Enter at the run still showing its face; Back to such an end
// stands on the run's item, and Back's light marks it. A block whose text is only
// white space is no span a person reads and no element of the walk (rule
// 20): the mirror lists none, and a landing inside one stands on the element
// before it; a position no block holds stands on the first span. A landing
// the index does not list — a withheld document, one
// unchanged since the index's floor, its account — lands on ITS OWN node,
// placed among the listed siblings in address order, so the mirror and the
// one line name the place landed on (rule 12). The camera follows the focus
// (a walk move flies to the element at its level's scale) and the focus
// follows the camera (any other move re-takes it at the scale's grain). THE
// RE-TAKE'S ORDER (issue #141's design decision), so the walk never stands on
// a place out of view: the document whose REGION holds the view's centre —
// its outline, which holds its label, badge and counts, and the strip its
// corner stands in (T-LAYER's `regionOf`); else the document the walk stands
// on, its own element or a span or a link in it, KEPT while its region meets
// the visible view (T-LAYER's `inView`) — reading past its last line, or
// panning to its corner, never leaves it, and the one line marks the view's
// window over it (`kept`); else the account whose region holds the centre,
// else the board. At far scale the grain stops at the account, and the last
// alone is read. WHERE NO BOARD IS HELD (issue #215's design decision: "The
// mirror's board sentence says what the line says"; FP-35) the root names no
// board: it says why, the words O-FACES' one entry gives (`noBoardWords`,
// through the reader the app hands in), and the re-take stands on it alone,
// naming no account the grid finds under the centre. THE GRAIN BELOW A
// DOCUMENT IS THE DOCUMENT'S OWN (issue #140's design decision): P-LOD's
// band decides how deep the walk goes, down to the document; it steps by
// span only inside a document at its reading scale — its own em at the
// readable threshold,
// T-LAYER's one test, the one the press rule and the one line's position read
// — and any other document is one stop, focused whole, as at mid, its mirror
// item collapsed (`aria-expanded` false, `collapsed`). Entering such a
// document from the keyboard is Enter's act (N-KEYS: a teleport to its
// reading scale, pushed on the trail, as a click is), which expands it; there
// `→` enters its spans. Collapsed or expanded is read at the view the
// camera is bound for, so a key made during a flight acts where the flight
// lands (D5 §4 rule 8), and each dirty frame marks the items again in place
// (`markExpanded`), the camera crossing a document's threshold between the
// walk's moves. The ARIA mirror (`role=tree`,
// virtualised ±24, `aria-level`/`aria-posinset`/`aria-setsize`) is THE ONE
// ACCESSIBLE RENDERING at span grain (S1 Q7; R94 at span grain — RULED), the
// tree named as it attaches by ST's `L.mirror-label`, each level's group by
// `L.mirror-level`, and each item by ST's `L.mirror.*` entries — what a screen
// reader hears is the focus moving onto the item (rule 12); no live region
// repeats it (D4). Every block that holds no text is announced by its kind,
// the item rule's (T-ARTICLE's `itemOf`; issue #161's design decision; FP-24)
// in the strings table's words, the ones a copy's stand-in names it by in its
// place — a record, a reference, a withheld run, an item this client cannot
// show — then what the plane shows of it, a record's words and keys, an
// unshown item's length, and never its raw value. A withheld run's item is
// made from the record the plane's
// placeholder is (T-ARTICLE's `placeholderOf`: the owner of its origin, the
// entitlement arm for this reader, C-67's clause where the origin's edition
// claims decide one — "edition claims not read" where a read of them failed —
// and nothing in its place where they do not — R56, B1-S7, PUB-5.124; issue
// #186), and a
// document a read answered `withheld` is named by its withheld box's words
// (T-LAYER's `withheldBox`: existence and owner — B1-S2), one the board said
// nothing about by a far end's words for it (`L.far.unregistered`), and one
// no read or listing has told the state of by no state at all — never
// "published" for a place a jump's walk stands on before its read answers
// (FP-25), a link's item
// names its far end as its tail, its card and every list naming it do (LK's
// `farLabel`: its address, then what the board answered of its document —
// issue #132), and a link whose far end floats
// says "its passage is not in ⟨D⟩'s current text" as its symbol's title and
// its stub do, and one whose far end's text holds part of its passage, all
// of it in pieces, or the board would not tell, says BM-HELD's line
// (`farSays`; foundations §2.3; issue #153), so at each a screen reader
// hears what the plane shows (R94). BACK'S LIGHT IS EXPOSED (issue #152's
// design decision: "While lit, it is exposed to assistive technology"): the
// items it stands on — each span holding a stretch of the passage carried,
// or the link's end the follow was made at — carry `aria-current="location"`
// while it stands, written at the rebuild and marked again in place on each
// dirty frame (`markLocated`), the light read through the reader the app
// hands in (`readers`: N-GO's, which imports this module); Back's landing
// names that end where the view shows it, and the walk stands on its item
// (`focusTo`'s `end`). A LANDING'S LINE IS ITS ITEM'S DESCRIPTION (issue
// #153's design decision: "Focus lands on the first held piece or landing
// point, the line as its description, so the screen-reader mirror says all
// four states"): the item a landing stands on — the span holding its
// position, or its document where the walk stands on it whole — carries
// `aria-describedby` naming the mirror's hidden description, which holds the
// line's words where the text landed in holds part of the passage carried or
// followed, all of it in pieces, or no answer told — the label of the run the
// landing stands at, where the passage stands in several — and the dead end's
// words where it holds none of it; nothing where it holds all of it in one
// piece, which the outline alone says (N-GO's `described`, through the reader
// the app hands in). EACH RUN'S ITEM CARRIES ITS LABEL (FP-21; issue #158's
// design decision: "Each run's accessible item carries its label from the
// moment of landing"): every span holding another run of a passage in several
// is described by those runs' labels, a hidden description of its own. Each is
// written at the rebuild and marked again in place on each
// dirty frame (`markDescribed`) — a step moving the landing among the runs —
// so the focus moving onto an item says it once, the landing's item the one
// announcement. The mirror is rebuilt whole on every move, and its Tab
// stop with it: the plane is ONE stop between the one line and the focused
// document's corner (D5 §4 rule 5) — the current item, while the tree's
// container stands out of the order; the container is the stop only where
// the mirror holds no item. The panel is shown while the ring is drawn
// (`shown`): a keyboard user sees the list they stand in; a pointer user's
// landing shows none. While the reading scene stands over the plane the tree
// is inert (`cover`), out of the order and of the accessibility tree, the
// scene's stops in its place ("In the scene: pane, pane, the scene's acts",
// each pane's corner after it — issue #160), until the scene's end puts it
// back. THE PAGE'S OWN DEATH (FP-23) takes the walk again where it stood, at
// once from the model the death left, so the mirror names nothing the dead
// session read, and again once its document is read at the guest's class
// (`dropped`) — on that document still where the guest may not read it, named
// by its withheld box's words, its cover (issue #177's design decision: "The
// walk stays put on that withheld form, never on nothing"; FP-29).
// Carries: the wireframe's §13 whole; the bare `k` toggle DROPPED (M-7
// ELIMINATED: the walk is always live).
// Rules: FP-1, FP-2, FP-7, FP-9, FP-10, FP-13 (the mirror rebuilt from state), FP-20, FP-21, FP-22, FP-23, FP-24, FP-29, FP-35.

import * as REC from '../model/records.js';
import * as LK from '../links/links.js';
import * as PUMP from '../model/pump.js';
import * as CAM from '../plane/camera.js';
import * as LAYER from '../text/layer.js';
import * as FOCUS from './focus.js';
import { placeholderOf, itemOf, itemWords, itemLength, recordOf } from '../text/article.js';
import { farSays } from '../beams/held.js';
import { docBox, accountCell, boardCell, accountAt, clearLeftOf } from '../plane/projection.js';
import { lodOf } from '../plane/lod.js';
import { cmpAddr, accountOf, documentOf } from '../model/address.js';
import { touches } from '../text/span.js';
import { esc } from '../util.js';
import { t } from '../strings.js';

/** @typedef {import('../model/records.js').Block} Block */
/** @typedef {import('../links/links.js').Shown} Shown */

/**
 * @typedef {Object} Node — one element of the linearization
 * @property {'board' | 'account' | 'document' | 'block' | 'link'} kind
 * @property {string} addr the board, the account, the document
 * @property {number | null} pos a block's first position
 * @property {Shown | null} link a drawn link
 */

/** @typedef {{link: string, key: string}} End a link's end among a document's elements: the link and its end's key (LK's `endKey`) */

/**
 * @typedef {Object} Located — where Back's light stands (issue #152's design decision; N-GO's `backLight`), which the mirror marks `aria-current="location"`
 * @property {string} addr the document it stands in
 * @property {Array<{pos: number, width: number}>} runs the stretches of its text the passage carried stands in; none for a link's end
 * @property {End | null} end the link's end the follow was made at; null for a passage
 */

/**
 * @typedef {Object} Described — what a landing says of the passage it carried or followed (issue #153's design decision; N-GO's `described`), which the mirror gives the items it stands on as their descriptions
 * @property {string} addr the document landed in
 * @property {number} pos where the landing stands: the run it stands at, or the landing point
 * @property {string} words the line's words — the label of the run it stands at, where the passage stands in several — or the dead end's where the text holds none of the passage
 * @property {Array<{pos: number, width: number, words: string}>} runs every run of the passage where it stands in several, each with its own label; none where it stands in one
 */

/**
 * @typedef {Object} Readers — what the walk reads from an owner that imports it, handed in once by the app (FP-10, FP-11)
 * @property {() => Located | null} located where Back's light stands (N-GO's `backLight`); null where none does
 * @property {() => Described | null} described what the landing says of its passage, where it says anything (N-GO's `described`); null where nothing is said
 * @property {(addr: string) => string} shown the version a document's box shows (N-GO's `shownIn`): the one the walk stands on and lists there
 * @property {() => ({id: string, text: string} | null)} noBoard why no board is held, the words the root says in the board's place (O-FACES' `noBoardWords`); null where a board is held, or the list has not answered
 */

/** @type {Node | null} */
let focus = null;
/** the siblings the focus walks among, and its index */
/** @type {Node[]} */
let siblings = [];
let idx = 0;
/** @type {Array<{siblings: Node[], idx: number}>} the levels above */
let stack = [];
/** @type {number | null} the position a landing named inside the focused span; null where the focus moved by a walk key */
let landed = null;
/** the walk's moves, each counted as it starts: a move a later one has overtaken sets nothing */
let moves = 0;
/** @type {HTMLElement | null} */
let mirrorEl = null;
/** @type {Array<(n: Node | null) => void>} */
const watchers = [];
/** @returns {Readers} the readers before the app hands its owner's in: no light stands, no landing says anything, every box shows its plain address, and no board's absence is told */
const noReaders = () => ({ located: () => null, described: () => null, shown: (/** @type {string} */ addr) => documentOf(addr) || addr, noBoard: () => null });
/** @type {Readers} */
let read = noReaders();

/** the owner that imports the walk hands its readers in once (the app); one left out reads nothing */
export function readers(/** @type {Partial<Readers>} */ r) { read = { ...noReaders(), ...r }; }

/** the id of the mirror's hidden description of the landing, which the item it stands on names (see the head) */
const DESCRIPTION = 'walk-landing';
/** the id of the hidden description of the other runs an item holds, item i's (see the head) */
const pieceId = (/** @type {number} */ i) => 'walk-piece-' + i;

/** the board's node */
const BOARD = /** @type {Node} */ ({ kind: 'board', addr: '1', pos: null, link: null });

/**
 * Attach the mirror: the plane's stop registered with the focus's owner,
 * which tells the walk when the ring's rule changes, so the panel follows it
 * and the plane is redrawn.
 * @param {HTMLElement} mirror
 */
export function attach(mirror) {
  mirrorEl = mirror;
  mirror.setAttribute('aria-label', t('L.mirror-label'));
  FOCUS.attach({ plane: mirror, home: stopEl });
  FOCUS.onChange(() => { if (mirrorEl && mirrorEl.classList) mirrorEl.classList.toggle('shown', FOCUS.ringShown()); CAM.markDirty(); });
}
/** the plane's one stop now: the mirror's current item, or the tree itself where it holds no item */
function stopEl() {
  if (!mirrorEl || typeof mirrorEl.querySelector !== 'function') return mirrorEl;
  return /** @type {HTMLElement | null} */ (mirrorEl.querySelector(`#walk-${idx}`)) || mirrorEl;
}
/** does the mirror hold the platform's focus now? */
const mirrorHolds = () => !!mirrorEl && typeof document !== 'undefined' && mirrorEl.contains(document.activeElement);
/**
 * The plane covered and uncovered (D5 §4 rule 5): while chrome stands over
 * the plane — the reading scene — the tree is `inert`, so neither Tab nor
 * assistive technology reaches the walk's element under it. The mark stands
 * on the tree, never on an item, so the rebuild keeps it.
 * @param {boolean} on chrome covers the plane (true) or has left it (false)
 */
export function cover(on) { if (mirrorEl) FOCUS.cover(mirrorEl, on); }
export function onFocus(/** @type {(n: Node | null) => void} */ fn) { watchers.push(fn); }
/** the walk's element, read-only */
export const current = () => focus;
/** the position a landing named inside the focused span, read-only — the one line's position (null: the span's own first) */
export const landedAt = () => landed;
/** the focused span, for the article's `lit` mark */
export function focusedSpan() { return focus && focus.kind === 'block' && focus.pos != null ? { addr: focus.addr, pos: focus.pos } : null; }
/** is the ring drawn — the focus's owner's rule (rule 10): the plane holds the focus and a key moved it */
export const ringShown = () => FOCUS.ringShown();

/** is a block an element of the walk (rule 20): any but a paragraph of white space alone */
export const isElement = (/** @type {Block} */ b) => b.kind !== 'para' || b.text.trim() !== '';

/** is a document below its reading scale at the view the camera is bound for (see the head; T-LAYER's one test) */
const below = (/** @type {string} */ addr) => !LAYER.atReadingScale(addr, CAM.destination().scale);
/**
 * Does the walk stand on a document below its reading scale (see the head):
 * one stop, focused whole, its mirror item collapsed — its spans reached
 * through Enter's act, a teleport to its reading scale, which `→` takes there
 * (N-KEYS); `key('in')` enters nothing there.
 */
export const collapsed = () => !!focus && focus.kind === 'document' && below(focus.addr);

/**
 * The children of a node, in record order.
 * @param {Node | null} node null = the plane's root
 * @returns {Promise<Node[]>}
 */
export async function childrenOf(node) {
  if (!node) return [BOARD];
  if (node.kind === 'board') return REC.accounts().filter((a) => !a.system).map((a) => ({ kind: /** @type {const} */ ('account'), addr: a.account, pos: null, link: null }));
  // an account's documents as the plane draws them: every box the model knows of under it, a covered one among them (M-REC's `known`)
  if (node.kind === 'account') return REC.known().filter((doc) => accountOf(doc) === node.addr).sort(cmpAddr).map((doc) => ({ kind: /** @type {const} */ ('document'), addr: read.shown(doc), pos: null, link: null }));
  if (node.kind === 'document') {
    const d = await PUMP.loadWhole(node.addr); if (!d) return [];
    /** @type {Node[]} */
    const out = d.blocks.filter(isElement).map((b) => ({ kind: /** @type {const} */ ('block'), addr: node.addr, pos: b.pos, link: null }));
    for (const s of LK.shown(node.addr)) if (!s.run) out.push({ kind: 'link', addr: node.addr, pos: s.pos, link: s });
    return out;
  }
  // a withheld run's: the ends drawn at it (see the head)
  if (node.kind === 'block' && node.pos != null) return runEnds(node.addr, node.pos).map((s) => ({ kind: /** @type {const} */ ('link'), addr: node.addr, pos: s.pos, link: s }));
  return [];
}

/** the ends LK draws at the withheld run a document's block at `pos` is, in the order it draws them; none for any other block */
const runEnds = (/** @type {string} */ addr, /** @type {number} */ pos) => LK.shown(addr).filter((s) => !!s.run && s.run.pos === pos);

/** the accessible name of a node (what the mirror's item says), from ST's entries */
export function nameOf(/** @type {Node} */ n, /** @type {number} */ i, /** @type {number} */ total) {
  const pos = ' ' + t('L.mirror.item', { i: i + 1, n: total });
  if (n.kind === 'board') {
    // where no board is held the root names none: it says why, as the one line does (FP-35)
    const b = REC.board();
    if (!b) { const why = read.noBoard(); return why ? why.text + pos : pos.trim(); }
    return t('L.mirror.board', { node: n.addr, origin: b.origin, n: REC.accounts().filter((a) => !a.system).length }) + pos;
  }
  if (n.kind === 'account') {
    const c = REC.countOf(n.addr); const lk = LK.countAccount(n.addr);
    const documents = c.exact ? String(c.documents) : t('L.mirror.at-least', { n: c.documents });
    const links = lk.arriving ? t('L.mirror.at-least', { n: lk.n }) : String(lk.n);
    return t('L.mirror.account', { account: n.addr, documents, links, empty: c.documents ? '' : ' — ' + t('B1.empty_subspace') }) + pos;
  }
  if (n.kind === 'document') {
    // a version named by its box's document's place, the one the index lists (issue #154); its state as the board answered it —
    // withheld, nothing it will say of the address, a draft, published — and none where nothing has told it yet
    const d = REC.doc(n.addr); const p = REC.place(documentOf(n.addr) || n.addr);
    const kind = p ? p.kind : d.kind !== 'unknown' ? d.kind : d.meta ? (d.meta.published ? 'edition' : 'draft') : null;
    const state = d.refused === 'withheld' ? LAYER.withheldBox(d) : d.refused === 'unregistered' ? t('L.far.unregistered') : kind === 'draft' ? t('L.mirror.draft') : kind === 'edition' ? t('F.published') : '';
    return t('L.mirror.document', { document: n.addr, label: p && p.label ? '"' + p.label + '"' : '', state, extent: d.extent != null ? t('L.mirror.positions', { n: d.extent }) : '' }) + pos;
  }
  if (n.kind === 'block') {
    const d = REC.doc(n.addr); const b = d.blocks.find((x) => x.pos === n.pos);
    if (!b) return t('L.mirror.span.bare', { p: n.pos ?? '', document: n.addr }) + pos;
    const kind = itemOf(b);
    if (kind === 'withheld') {
      const w = placeholderOf(b, REC.reader(), LAYER.originOwner, LAYER.clauseOf), ends = runEnds(n.addr, b.pos).length;
      const links = ends ? t('L.mirror.run-links', { links: ends === 1 ? t('F.label.links.1') : t('F.label.links', { n: ends }) }) : '';
      return t('L.mirror.withheld', { kind: itemWords(kind), document: n.addr, length: itemLength(b.width), owner: w.owner, origin: b.origin || '', arm: w.arm.text, clause: w.clause ? t('L.mirror.clause', { clause: w.clause.text }) : '' }) + links + pos;
    }
    const org = d.origins.find((o) => o.pos < b.pos + b.width && b.pos < o.pos + o.width);
    const same = org ? t('L.mirror.same', { origin: org.doc }) : '';
    if (kind) {
      // what the plane shows of the item after its kind: a record's words and keys, an unshown item's length — never its raw value
      const rec = kind === 'record' ? recordOf(b, d, REC.reader()) : null;
      const shown = rec ? [rec.words, rec.keys].filter(Boolean).join(' · ') : kind === 'unshown' ? itemLength(b.width) : '';
      return t('L.mirror.no-text', { kind: itemWords(kind), p: b.pos, extent: d.extent ?? '?', document: n.addr, same, shown: shown ? t('L.mirror.shows', { shown }) : '' }) + pos;
    }
    return t('L.mirror.span', { p: b.pos, extent: d.extent ?? '?', document: n.addr, same, text: b.text }) + pos;
  }
  if (n.kind === 'link' && n.link) {
    const l = n.link, says = farSays(l);
    return t('L.mirror.link', {
      link: l.link.addr, type: l.link.type || t('L.mirror.untyped'), direction: l.end === 'from' ? t('F.card.to') : t('F.card.from'), far: LK.farLabel(l),
      floating: says ? t('L.mirror.floating', { sentence: says }) : '',
    }) + pos;
  }
  return '';
}

/** a node's level in the tree: board › account › document › span | link, a withheld run's links a level below the run (see the head) */
const levelOf = (/** @type {Node} */ n) => (n.kind === 'board' ? 1 : n.kind === 'account' ? 2 : n.kind === 'document' ? 3 : n.kind === 'link' && n.link && n.link.run ? 5 : 4);

/**
 * Move the walk to item `i` of `sibs` — the one way it moves. A landing
 * passes the position it named, kept only where the focused span holds it;
 * a walk key passes none.
 * @param {Node[]} sibs
 * @param {number} i
 * @param {number | null} [at] the position a landing named
 */
function setFocus(sibs, i, at = null) {
  siblings = sibs; idx = i; focus = sibs[i] ?? null;
  const held = at != null && focus && focus.kind === 'block' ? REC.blockAt(focus.addr, at) : null;
  landed = held && focus && held.pos === focus.pos ? at : null;
}

/**
 * A node among its listed siblings (rule 12): its own index where the index
 * lists it, else the siblings with the node placed among them in address
 * order, so a landing the index does not list stands on its own node and the
 * mirror and the one line name it.
 * @param {Node[]} sibs
 * @param {Node} node
 * @returns {{sibs: Node[], i: number}}
 */
export function among(sibs, node) {
  const i = sibs.findIndex((n) => n.addr === node.addr);
  if (i >= 0) return { sibs, i };
  let at = sibs.findIndex((n) => cmpAddr(n.addr, node.addr) > 0);
  if (at < 0) at = sibs.length;
  const out = sibs.slice(); out.splice(at, 0, node);
  return { sibs: out, i: at };
}

/**
 * Rebuild the mirror from state (FP-13), the plane's one Tab stop with it
 * (D5 §4 rule 5): the current item, the only item at tabindex 0, while the
 * tree's container stands out of the order — focusable still, by script and
 * by a click — and the container itself where the walk's level holds no item
 * (a landing where the index lists nothing at its level). Each document's
 * item says whether it is expanded — at its reading scale — or collapsed
 * (see the head) — a withheld run's item, where ends are drawn at it, expanded,
 * → entering them — and the item a landing stands on its description (see the
 * head), held in the mirror's one hidden element after the items. Replacing
 * the items removes the one the platform's focus may stand on; the callers
 * put it on the new current item through the focus's owner (`FOCUS.land`), as
 * every rebuild here is a move of the walk.
 */
export function render() {
  if (!mirrorEl) return;
  const total = siblings.length, W = 24;
  const lo = Math.max(0, idx - W), hi = Math.min(total, idx + W);
  const lvl = total ? levelOf(siblings[0]) : 1;
  let html = `<ul role="group" aria-label="${esc(t('L.mirror-level', { n: lvl }))}">`;
  const at = read.located(), said = read.described();
  let pieces = '';
  for (let i = lo; i < hi; i++) {
    const n = siblings[i];
    const expanded = n.kind === 'document' ? ` aria-expanded="${!below(n.addr)}"` : n.kind === 'block' && n.pos != null && runEnds(n.addr, n.pos).length ? ' aria-expanded="true"' : '';
    const located = isLocated(n, at) ? ' aria-current="location"' : '';
    const by = describedBy(n, i, said);
    const described = by ? ` aria-describedby="${by}"` : '';
    html += `<li role="treeitem" id="walk-${i}" tabindex="${i === idx ? 0 : -1}" aria-level="${lvl}" aria-posinset="${i + 1}" aria-setsize="${total}" aria-selected="${i === idx}"${expanded}${located}${described} data-i="${i}" data-addr="${esc(n.addr)}"${n.pos != null ? ` data-pos="${n.pos}"` : ''}>${esc(nameOf(n, i, total))}</li>`;
    if (holdsRuns(n, said)) pieces += `<div id="${pieceId(i)}" hidden>${esc(otherRuns(n, said))}</div>`;
  }
  html += `</ul><div id="${DESCRIPTION}" hidden>${esc(said ? said.words : '')}</div>${pieces}`;
  mirrorEl.innerHTML = html;
  mirrorEl.tabIndex = idx >= lo && idx < hi ? -1 : 0;
}

/**
 * The mirror's document items marked expanded or collapsed in place (see the
 * head): `aria-expanded` set where an item says otherwise than its document's
 * reading scale at the view the camera is bound for, nothing rebuilt, so the
 * platform's focus stays on the item it stands on. The app's loop runs it on
 * each dirty frame: the mirror is rebuilt at the walk's moves alone, and a
 * camera move — a zoom chord, the wheel, a teleport's flight — takes a
 * document across its threshold between them. A withheld run's item, which
 * no camera move expands or collapses, is left as the rebuild wrote it.
 */
export function markExpanded() {
  if (!mirrorEl || typeof mirrorEl.querySelectorAll !== 'function') return;
  for (const li of /** @type {HTMLElement[]} */ ([...mirrorEl.querySelectorAll('li[aria-expanded]')])) {
    const n = siblings[Number(li.dataset.i)];
    if (!n || n.kind !== 'document') continue;
    const v = String(!below(li.dataset.addr || ''));
    if (li.getAttribute('aria-expanded') !== v) li.setAttribute('aria-expanded', v);
  }
}

/** does Back's light stand on a node (see the head): a span holding a stretch of the passage carried, or the link's end the follow was made at — at a withheld run, where LK draws that end there, the run's item */
function isLocated(/** @type {Node} */ n, /** @type {Located | null} */ at) {
  if (!at || n.addr !== at.addr) return false;
  const end = at.end;
  if (n.kind === 'link') return !!end && !!n.link && n.link.link.addr === end.link && n.link.key === end.key;
  const b = n.kind === 'block' && n.pos != null ? REC.blockByPos(n.addr, n.pos) : null;
  if (!b) return false;
  if (end) return b.kind === 'withheld' && runEnds(n.addr, b.pos).some((s) => s.link.addr === end.link && s.key === end.key);
  return at.runs.some((r) => touches(b, r));
}

/**
 * The mirror's items marked in place where Back's light stands (see the
 * head): `aria-current="location"` on each item it stands on and on no other,
 * nothing rebuilt, so the platform's focus stays on the item it stands on.
 * The app's loop runs it on each dirty frame: the light goes out with the
 * arrival — at the next landing, at Esc — and the passage it stands on moves
 * as its text is set again, between the walk's moves.
 */
export function markLocated() {
  if (!mirrorEl || typeof mirrorEl.querySelectorAll !== 'function') return;
  const at = read.located();
  for (const li of /** @type {HTMLElement[]} */ ([...mirrorEl.querySelectorAll('li[role="treeitem"]')])) {
    const n = siblings[Number(li.dataset.i)], on = !!n && isLocated(n, at);
    if (on && li.getAttribute('aria-current') !== 'location') li.setAttribute('aria-current', 'location');
    else if (!on && li.getAttribute('aria-current') != null) li.removeAttribute('aria-current');
  }
}

/** the block a span node stands for; null for every other node */
const blockOf = (/** @type {Node} */ n) => (n.kind === 'block' && n.pos != null ? REC.blockByPos(n.addr, n.pos) : null);

/** does a landing's description stand on a node (see the head): the span holding the landing's position, or its document, where the walk stands on it whole */
function isDescribed(/** @type {Node} */ n, /** @type {Described | null} */ at) {
  if (!at || n.addr !== at.addr) return false;
  if (n.kind === 'document') return true;
  const b = blockOf(n);
  return !!b && at.pos >= b.pos && at.pos < b.pos + b.width;
}

/** does a span node hold a run of a passage that stands in several (see the head)? */
function holdsRuns(/** @type {Node} */ n, /** @type {Described | null} */ at) {
  const b = at && n.addr === at.addr ? blockOf(n) : null;
  return !!at && !!b && at.runs.some((r) => touches(b, r));
}

/** the labels of the runs a span node holds, the one the landing stands at apart, in the text's order: its own description's words (see the head); '' where it holds none */
function otherRuns(/** @type {Node} */ n, /** @type {Described | null} */ at) {
  const b = at && n.addr === at.addr ? blockOf(n) : null;
  return at && b ? at.runs.filter((r) => r.pos !== at.pos && touches(b, r)).map((r) => r.words).join('; ') : '';
}

/**
 * The descriptions a node names (see the head): the landing's, where it
 * stands on it; its other runs' labels, where it holds any; null where it
 * names none.
 * @param {Node} n
 * @param {number} i its index among its siblings
 * @param {Described | null} at
 * @returns {string | null} the ids, as `aria-describedby` takes them
 */
function describedBy(n, i, at) {
  /** @type {string[]} */
  const ids = [];
  if (isDescribed(n, at)) ids.push(DESCRIPTION);
  if (otherRuns(n, at)) ids.push(pieceId(i));
  return ids.length ? ids.join(' ') : null;
}

/**
 * The landing's descriptions marked in place (see the head): the hidden
 * elements' words set to what the landing says now — its line's, and each
 * span's other runs' labels — and `aria-describedby` on the items they stand
 * on and on no other, nothing rebuilt, so the platform's focus stays on the
 * item it stands on. The app's loop runs it on each dirty frame: the line
 * goes with the arrival, its words change as its reads answer — an offer
 * found, a retry answered — and a step moves the landing among its runs,
 * between the walk's moves.
 */
export function markDescribed() {
  if (!mirrorEl || typeof mirrorEl.querySelectorAll !== 'function') return;
  const said = read.described(), words = said ? said.words : '';
  const q = (/** @type {string} */ id) => (mirrorEl && typeof mirrorEl.querySelector === 'function' ? mirrorEl.querySelector('#' + id) : null);
  const el = q(DESCRIPTION);
  if (el && el.textContent !== words) el.textContent = words;
  for (const li of /** @type {HTMLElement[]} */ ([...mirrorEl.querySelectorAll('li[role="treeitem"]')])) {
    const i = Number(li.dataset.i), n = siblings[i], piece = q(pieceId(i));
    if (n && piece) { const w = otherRuns(n, said); if (piece.textContent !== w) piece.textContent = w; }
    const by = n ? describedBy(n, i, said) : null, named = by && !piece ? by.split(' ').filter((x) => x !== pieceId(i)).join(' ') || null : by;
    if (named && li.getAttribute('aria-describedby') !== named) li.setAttribute('aria-describedby', named);
    else if (!named && li.getAttribute('aria-describedby') != null) li.removeAttribute('aria-describedby');
  }
}

/**
 * The walk's element takes the platform's focus through the focus's owner —
 * the mirror's current item, brought inside the panel's window, or the mirror
 * itself where it holds no item — with the ring's rule set where the move is
 * an act's (`byKey` given), or kept where it is a hand-off: the app's, where
 * a control that held the focus has gone (a corner leaving the plane), and
 * the controller's own return to the walk's element (D5 §4 rule 4).
 * @param {{byKey?: boolean}} [opts]
 */
export function focusItem(opts = {}) {
  const el = stopEl();
  FOCUS.land(el, opts);
  if (el && el !== mirrorEl) showInPanel(/** @type {HTMLElement} */ (el));
}

/**
 * Bring an item inside the panel's scroll window by the panel's own scroll
 * alone. The item's place is measured against the panel's padding box, so
 * the panel's position on the page and the viewport both stay where they
 * are; an item above the window lands at its top, one below at its bottom.
 * @param {HTMLElement} item
 */
function showInPanel(item) {
  if (!mirrorEl || typeof item.getBoundingClientRect !== 'function') return;
  const panel = mirrorEl.getBoundingClientRect(), r = item.getBoundingClientRect();
  const top = r.top - (panel.top + mirrorEl.clientTop), bottom = top + r.height;
  if (top < 0) mirrorEl.scrollTop += top;
  else if (bottom > mirrorEl.clientHeight) mirrorEl.scrollTop += bottom - mirrorEl.clientHeight;
}

/** the mirror's item i's name (the gate reads it) */
export function mirrorItem(/** @type {number} */ i) {
  const n = siblings[i]; return n ? nameOf(n, i, siblings.length) : null;
}
export const mirrorSize = () => siblings.length;
export const mirrorIndex = () => idx;

/** the walk moved: its watchers told, the plane redrawn */
function moved() {
  for (const w of watchers) w(focus);
  CAM.markDirty();
}

/**
 * The camera follows the focus: fly to the element at its level's scale — a
 * document's outline framed, no nearer than the reading size; a span's line,
 * its column framed with both its margins, at the reading size (T-LAYER's
 * `frameOf`; P-CAM's READING_PX) — nowhere where the document's extent is
 * read first and a later move overtook this one meanwhile.
 * @param {number} move the move's count
 */
async function flyToFocus(move) {
  if (!focus) return;
  if (focus.kind === 'board') await CAM.fly(CAM.viewForCell(boardCell(focus.addr), 0.92), 300);
  else if (focus.kind === 'account') await CAM.fly(CAM.viewForCell(accountCell(focus.addr), 0.85), 300);
  else if (focus.kind === 'document') {
    const d = REC.doc(focus.addr); if (d.extent == null) await PUMP.loadWhole(focus.addr);
    if (move !== moves) return;
    // its outline framed, no nearer than the reading size
    const v = CAM.viewForCell(LAYER.shapeOf(focus.addr), 0.9);
    await CAM.fly({ ...v, scale: Math.min(v.scale, CAM.READING_PX / LAYER.foldOf(REC.doc(focus.addr)).fs) }, 300);
  } else {
    const d = REC.doc(focus.addr);
    await CAM.fly(CAM.viewAt(LAYER.frameOf(focus.addr, focus.pos), LAYER.foldOf(d).fs), 260);
  }
  CAM.markDirty();
}

/** a walk key's move: the mirror rebuilt, the platform's focus on the new item with the ring drawn (rules 10, 12), the watchers told */
function stepped() { render(); focusItem({ byKey: true }); moved(); }

/**
 * A walk key: ↓ ↑ siblings, → in, ← out, Home/End first/last, Enter acts;
 * Shift+↓ / Shift+↑ select by span (K-8, the selection's owner's, which
 * leaves the focus here — rule 15). → reads the children first, and enters
 * nothing where a later move overtook it meanwhile, nor at a document below
 * its reading scale (`collapsed`), whose spans Enter's act reaches.
 * @param {'down' | 'up' | 'in' | 'out' | 'first' | 'last'} k
 * @returns {Promise<boolean>}
 */
export async function key(k) {
  if (!focus) { await enter(); return true; }
  if (k === 'down' || k === 'up' || k === 'first' || k === 'last') {
    const ni = k === 'down' ? Math.min(siblings.length - 1, idx + 1) : k === 'up' ? Math.max(0, idx - 1) : k === 'first' ? 0 : siblings.length - 1;
    if (ni !== idx) { const move = ++moves; setFocus(siblings, ni); stepped(); await flyToFocus(move); }
    return true;
  }
  if (k === 'in') {
    if (collapsed()) return true;
    const move = ++moves;
    const kids = await childrenOf(focus);
    if (move !== moves) return true;
    if (kids.length) { stack.push({ siblings, idx }); setFocus(kids, 0); stepped(); await flyToFocus(move); }
    return true;
  }
  if (k === 'out') {
    const up = stack.pop();
    if (up && up.siblings.length) { const move = ++moves; setFocus(up.siblings, up.idx); stepped(); await flyToFocus(move); }
    return true;
  }
  return false;
}

/** the plane takes focus with nothing focused yet: the board */
export async function enter() {
  const move = ++moves;
  const kids = await childrenOf(null);
  if (move !== moves) return;
  stack = []; setFocus(kids, 0); stepped();
}

/**
 * The walk moves to a landing (a teleport, D5 §4 rule 8): the document — the
 * version its box shows (see the head) — or the span holding a position in
 * it — the position kept as the one the landing
 * named (`landedAt`); a place the index does not list on its own node among
 * the listed siblings (rule 12). The platform's focus goes to the landing's
 * item wherever the act was made — save from a field the reader types in
 * (see the head) — the ring drawn where a key made it and put
 * out where anything else did (D5 §4 rule 2); a camera-made re-take (`take`
 * false) carries the focus to the new item only where the mirror held it,
 * the ring out, and leaves a focus standing elsewhere where it is. The
 * landing's levels are read first — a span's, its document's whole text — and
 * where a later move overtook it meanwhile it sets nothing. A landing may
 * name a link's end in the document (`end`: Back's return to the follow it
 * crossed — issue #152's design decision): the walk stands on that link's
 * item where the document's elements list it, else on the span holding the
 * position.
 * @param {string} addr a document, an account or a board
 * @param {number | null} pos
 * @param {boolean} [byKey] a key made the act
 * @param {boolean} [take] the platform's focus goes to the landing's item wherever it stood (an act); false carries it only where the mirror held it (a camera's re-take)
 * @param {End | null} [end] the link's end to stand on, at `pos`
 */
export async function focusTo(addr, pos, byKey = false, take = true, end = null) {
  const move = ++moves;
  const held = mirrorHolds();
  const doc = documentOf(addr) ? read.shown(addr) : null, acct = accountOf(addr);
  if (doc) {
    const d = REC.doc(doc);
    // the levels above the landing, each holding ITS OWN place in its siblings (so ← walks out to this document, this account)
    const A = among(await childrenOf(BOARD), { kind: 'account', addr: acct || '', pos: null, link: null });
    const D = among(await childrenOf({ kind: 'account', addr: acct || '', pos: null, link: null }), { kind: 'document', addr: doc, pos: null, link: null });
    const kids = pos != null && d.blocks.length ? await childrenOf({ kind: 'document', addr: doc, pos: null, link: null }) : [];
    if (move !== moves) return;
    if (pos != null && kids.length) {
      const b = REC.blockAt(doc, pos);
      const named = end ? kids.findIndex((n) => n.kind === 'link' && !!n.link && n.link.link.addr === end.link && n.link.key === end.key) : -1;
      let i = named >= 0 ? named : b ? kids.findIndex((n) => n.kind === 'block' && n.pos === b.pos) : -1;
      // a position no block holds stands on the first span; one in a block that is no element of the walk — white space — on the element before it
      if (i < 0) { i = 0; if (b) kids.forEach((n, k) => { if (n.kind === 'block' && n.pos != null && n.pos <= pos) i = k; }); }
      stack = [{ siblings: [BOARD], idx: 0 }, { siblings: A.sibs, idx: A.i }, { siblings: D.sibs, idx: D.i }];
      setFocus(kids, i, pos);
    } else {
      stack = [{ siblings: [BOARD], idx: 0 }, { siblings: A.sibs, idx: A.i }];
      setFocus(D.sibs, D.i, null);
    }
  } else if (acct) {
    const A = among(await childrenOf(BOARD), { kind: 'account', addr: acct, pos: null, link: null });
    if (move !== moves) return;
    stack = [{ siblings: [BOARD], idx: 0 }];
    setFocus(A.sibs, A.i);
  } else {
    stack = []; setFocus([BOARD], 0);
  }
  render();
  if (take || held) focusItem({ byKey }); else FOCUS.land(null, { byKey });
  moved();
}

/** does a world rect hold a point? */
const holdsPoint = (/** @type {{x: number, y: number, w: number, h: number}} */ r, /** @type {number} */ x, /** @type {number} */ y) => x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h;
/** is a node a document's element of the walk: the document itself, or a span or a link in it */
const inDocument = (/** @type {Node} */ n) => n.kind === 'document' || n.kind === 'block' || n.kind === 'link';

/**
 * The document whose region holds a world point (T-LAYER's `regionOf`: its
 * outline and the strip its corner stands in), of those the index lists — as
 * the version its box shows, the region that version's (see the head); of
 * documents sharing the room past the sound depth, the first whose outline
 * holds it; null where no region does.
 * @param {number} x
 * @param {number} y
 * @returns {string | null}
 */
function documentAt(x, y) {
  let best = null, on = false;
  for (const p of REC.places()) {
    if (p.system) continue;
    // the room widened by the corner's strip: the region stands inside it — the region of the version the box shows
    const b = docBox(p.doc), left = clearLeftOf(p.doc), shown = read.shown(p.doc);
    if (x < b.x - left || x > b.x + b.w || y < b.y || y > b.y + b.h || !holdsPoint(LAYER.regionOf(shown), x, y)) continue;
    const outline = holdsPoint(LAYER.shapeOf(shown), x, y);
    if (!best || (outline && !on)) { best = shown; on = outline; }
  }
  return best;
}

/**
 * Does the walk stand on a document the re-take keeps (see the head): its
 * element the document, or a span or a link in it, the document's region
 * meeting the visible view (T-LAYER's `inView`) and not holding the view's
 * centre — the one line marks the view's window over it.
 * @returns {boolean}
 */
export function kept() {
  if (!focus || !inDocument(focus)) return false;
  return !holdsPoint(LAYER.regionOf(focus.addr), CAM.cam.x, CAM.cam.y) && LAYER.inView(focus.addr);
}

/**
 * The focus follows the camera (rule 3): after a camera move — the wheel,
 * the camera key's drag, a zoom chord, PageDown — re-take it at the scale's
 * grain, in THE RE-TAKE'S ORDER (issue #141's design decision; see the head).
 * Nearer than far: the document whose region holds the view's centre, and the
 * span in the column under it where that document stands at its own reading
 * scale (T-LAYER's fold and its one test); else the walk's own document, kept
 * while its region meets the visible view, a span or a link in it taken to
 * the document where it stands below its reading scale. Else, and at far
 * scale, where the grain stops at the account: the account whose region holds
 * the centre, else the board — the root alone where no board is held (see the
 * head). A key's move puts the platform's focus on the
 * element wherever the key was pressed, the ring drawn (rule 10); a
 * pointer's or the wheel's carries it only where the mirror held it, the ring
 * out, and says nothing until the next keyboard act (rule 12).
 * @param {boolean} [byKey] a key made the camera move
 */
export async function retakeFromView(byKey = false) {
  const { x, y } = CAM.cam;
  const lod = lodOf(CAM.cam.scale);
  if (lod.name !== 'far' && lod.name !== 'far~mid') {
    // 1. the document under the centre
    const best = documentAt(x, y);
    if (best) {
      if (LAYER.atReadingScale(best)) {
        const d = REC.doc(best);
        if (d.blocks.length) {
          // the span in the column under the centre (T-LAYER's fold)
          const pos = LAYER.posAt(best, x, y);
          const b = (pos != null && d.blocks.find((q) => pos >= q.pos && pos < q.pos + q.width)) || d.blocks[0];
          if (!focus || focus.addr !== best || focus.pos !== b.pos) await focusTo(best, b.pos, byKey, byKey);
          return;
        }
      }
      if (!focus || focus.addr !== best || focus.kind !== 'document') await focusTo(best, null, byKey, byKey);
      return;
    }
    // 2. the walk's own document, while it is in view: below its reading scale its spans are no stops, so it stands whole
    if (focus && inDocument(focus) && LAYER.inView(focus.addr)) {
      if (focus.kind !== 'document' && !LAYER.atReadingScale(focus.addr)) await focusTo(focus.addr, null, byKey, byKey);
      return;
    }
  }
  // 3. the place holding the centre: the account whose region holds it, else the board — the root alone where no board is held
  const at = (REC.board() && accountAt(x, y, BOARD.addr)) || BOARD.addr;
  if (!focus || focus.addr !== at) await focusTo(at, null, byKey, byKey);
}

/**
 * THE PAGE'S OWN DEATH (FP-23: the death takes every surface still showing
 * what the dead session read down at once, then reads it again as a guest),
 * told by M-PUMP once it has emptied the model (its `onDrop`, naming no
 * address): the walk taken again where it stood, at once, from the model the
 * death left — its levels and every item named from what a guest's page holds
 * now, so the mirror quotes nothing the dead session read and lists no
 * document it alone could list — the walk's document standing whole; then,
 * once that document is read at the guest's class, taken again there, on the
 * span holding the position it stood at, or the link's end it stood on. A
 * move made meanwhile overtakes it (the order of moves). Like a camera-made
 * re-take, it carries the platform's focus only where the mirror held it.
 * A feed row names what it dropped and leaves the walk where it stands.
 * @param {import('../model/pump.js').Dropped} x
 * @returns {Promise<void>}
 */
export async function dropped(x) {
  const f = focus;
  if (x.addrs || !f) return;
  const at = landed ?? f.pos, doc = inDocument(f) ? f.addr : null;
  const end = f.kind === 'link' && f.link ? { link: f.link.link.addr, key: f.link.key } : null;
  await focusTo(f.addr, null, false, false);
  if (!doc) return;
  const move = moves;
  await PUMP.loadWhole(doc);
  if (move === moves) await focusTo(doc, f.kind === 'document' ? null : at, false, false, end);
}

/** @returns {Node[]} the siblings in order (the gate's a11y case) */
export const siblingsNow = () => siblings.slice();
/** the sorted documents of an account (record order) */
export const documentsOf = (/** @type {string} */ acct) => REC.placesOf(acct).map((p) => p.doc).sort(cmpAddr);
