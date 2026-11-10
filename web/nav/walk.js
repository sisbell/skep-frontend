// N-WALK — the linearization, the walk's position and the ARIA mirror (the
// structure record §3.2; S-27 (a); D5 §4; foundations §2.7). Layer 2, mixed:
// the tree arithmetic pure, the mirror engine-bound. State (FP-10): the
// walk's position — the element the walk stands on, its siblings and the
// levels above — the position a landing named inside the focused span (W-01
// step 3), kept until the walk moves; the bytes its focus stands on
// (`stood`); the count of its moves; whether the
// walk holds the span of a caret the person left kept; the mirror's
// element; and the readers the app hands in (`readers`; FP-11): where Back's
// light stands and what a landing says (N-GO's `backLight` and `described`),
// the version each box shows (N-GO's `shownIn`) and why no board is held
// (O-FACES' `noBoardWords`). The walk is always live: it has no toggle.
// The order of moves: every move — a walk key, a landing, a re-take — counts
// itself as it starts, and one whose reads a later move overtook sets
// nothing when they answer and flies the camera nowhere, so the walk stands
// where the latest move put it whatever order the reads answer in. The focus
// is N-FOCUS's (FP-20): every move of it this module asks for goes through
// the controller's `land` — a walk key, a landing and a key-made re-take
// each put the platform's focus on the walk's element wherever the key was
// pressed (rules 10, 12), the ring drawn where a key made the move and put
// out by a pointer's landing or a camera-made re-take (D5 §4 rule 2); a
// camera-made re-take carries the focus to the new element only where the
// mirror held it, leaving a focus standing elsewhere where it is; and no
// move takes the caret from a field the reader types in. Every move names a
// position or none, so a landing's position never outlives the span it was
// named in: a walk key names none, and the line reads the span's own first
// position. At launch the platform's focus rests on the walk's element with
// the ring out (rule 21). Enter at a focused span selects the block whole
// (D8); at a withheld run it shows the run's face whole (K-7; N-KEYS').
// The walk follows the text shown (foundations §2.7): in a draft holding the
// person's page-local edits its elements are the blocks of the text the page
// shows (T-LAYER's `shownOf`) and the links LK draws on them — a line the
// person typed a stop, a line they removed whole none, each part of a line a
// typed break split a stop of its own — and every position it keeps is one
// of that text. Its focus holds its place by its bytes (`stand`, `carry`):
// through an edit it stays on the element holding the first of them still
// there, and gives its place up only where none is, to the element after the
// point they were removed at, else the one before; nothing in it moves at a
// commit or an ack.
// The walk follows a live caret (`followCaret`; B3-S13): as a click places
// it or a key at it moves it, the walk stands on the block of the text shown
// the caret is in, by the landing's rule, naming the block's own
// first position — a click's move putting the ring out, a key's leaving the
// ring's rule as it stands — so every act on the walk's element acts there.
// Every other move of the walk — a walk key, a landing, a step, a re-take —
// leaves a live caret as it is made, kept where it stood (D5 M-2, §4 rule 3;
// T-LAYER's `leaveCaret`), so the next key acts where the walk stands and
// never at a caret it did not land at; save a reading scene's close, whose
// landing returns the focus to the plane as the scene found it, a live caret
// standing live (`returnFocusTo`; D5 §4 rule 8, K-63).
// The kept caret's span holds the walk (B3-S1's THE KEPT CARET; D5 §4 rule
// 3): where the person leaves the text at a live caret and no act of theirs
// moves the walk — Esc, which stands the walk on the caret's span at its
// position (`leaveText`; N-KEYS'), or a camera move past the caret's reading
// scale (`holdCaret`; the re-take's own, and N-KEYS' `whereNow`) — every
// re-take that ends with a line of that span in the visible view, in text the
// person may edit at the camera's scale (T-LAYER's `editable`, `spanInView`),
// stands the walk on it at the caret's position, whatever stands under the
// view's centre (`heldSpan`), so a scroll that keeps the span in view, or a
// zoom out over the draft and back, ends at a caret a key acts at. The
// person's next walk move, click or teleport releases it — a walk key's
// move, a landing (`focusTo`) — and no move the page makes of its own does:
// a re-take, the caret followed (`followCaret`), a reading scene's close
// returning the focus as the scene found it (`returnFocusTo`), a change of the
// page's class (`dropped`), the box the walk stands in shown on a newer
// version (`standAgain`).
// The linearization: board › account › document › block | link in record
// order (S3 Q6), each box once, as the version it shows (FP-22; the `shown`
// reader): an account's documents are every box the plane draws — the
// model's one list (M-REC's `known`), a covered one among them (FP-29) —
// each the version its box shows, its spans and links that version's; where
// the plane draws a continuation of the account as its one mark at the scale
// the camera is bound for (P-LOD's `residueDepth`), one stop for the mark
// stands before its members, each a stop still in record order (P-PROJ's
// `markKey`, `membersAt`), named by the mark's count in its words (ST's
// `markCount`), Enter at it opening its members' list (N-KEYS'); at
// reading scale the walk holds the links the reading scale draws after the
// blocks, exactly what is drawn where it is drawn: an end LK draws at a
// withheld run (LK's `Shown.run`) is a child of the run's item, a level
// below, never a link of the document's own — the run's item saying how many
// end there and standing expanded, → entering them, Enter at each opening
// its card (K-55) and Enter at the run still showing its face. A block whose
// text is only white space is no element of the walk, by T-SPAN's rule
// (`isElement`, `elementIn`; rule 20): the mirror lists none, and a landing
// inside one, or a view's centre over one, stands on the element before it;
// a position no block holds stands on the first span. A landing the index does
// not list — a withheld document, one unchanged since the index's floor, its
// account — lands on its own node, placed among the listed siblings in
// address order (`among`; rule 12). → steps in to the child the plane draws
// under the centre of the view the camera is bound for as the key is made,
// else to the first in record order (D5 K-3; `childUnder`): at the board the
// account whose cell holds the centre; at an account the mark whose cell
// holds it, else, nearer than far, the document whose region holds it; at a
// document the element standing on the position its fold holds there, a
// position of the text shown, by the landing's rule (`elementAt`); at a
// withheld run its first end. The camera
// follows the focus — a walk move flies to the element at its level's scale
// (`flyToFocus`): the mark's stop, and a member the walk lists after it, to
// the mark centred at the scale nearest the camera's that draws it (P-LOD's
// `markScale`), the member never framed, so its ring stands on the mark
// (P-RENDER's); any other document to its outline framed, no nearer than its
// reading size where the scale the move was made at reads it at its reading
// scale, else no nearer than just short of that (T-LAYER's
// `scaleBelowReading`), so no step takes a document to its reading scale from
// below it; a span to its line where the text shown sets it, its
// column framed at the landing's em (T-LAYER's `frameOf`); a document's frame
// and a span's line read again
// each frame as the document is set while the camera flies, at the position
// the walk's node holds and under the cap decided as the move is made, their
// last answer kept while the page holds none of its text (P-CAM's `Aim`;
// `aimIn`; FP-8) — and the focus follows the camera: any other move re-takes
// it at the scale's grain (`retakeFromView`), save while a live caret stands
// in text the person may edit at the camera's scale, the focus then the
// caret, which no camera move moves (D5 §4 rule 3); a live caret whose text
// that scale does not read — a zoom past its reading scale — is left kept as
// the re-take is made, its span holding the walk (D5 M-2; `holdCaret`). The
// re-take's order, so the walk never stands on a place out of view nor on one
// the plane does not draw: the kept caret's span, where it holds the walk and
// a line of it stands in the visible view (above); else a continuation's mark
// whose cell holds the view's centre — the walk's
// focus kept where it stands on one of the mark's members, a span or a link in
// one taken to the member whole, else the mark's stop, never the member under
// the centre, and no list opened; else the document whose region holds the
// view's centre (T-LAYER's `regionOf`), none a mark holds; else the document
// the walk stands on, kept while its region meets the visible view
// (T-LAYER's `inView`; `kept`); else
// the account whose region holds the centre, else the board. At far scale the
// grain stops at the account, and the last alone is read. That order without
// its rules of keeping is the element under a view's centre, read at any view
// (`elementUnder`): the re-take reads it at the camera, and a return to a
// trail entry at the view it lands at (N-GO's). Where no board is
// held (FP-35) the root names no board: it says why, in the words the
// `noBoard` reader gives, and the re-take stands on it alone. The grain below
// a document is the document's own: P-LOD's band decides how deep the walk
// goes, down to the document; it steps by span only inside a document at its
// reading scale (T-LAYER's `atReadingScale`), and any other document is one
// stop, focused whole, its mirror item collapsed (`collapsed`); entering it
// from the keyboard is Enter's act (N-KEYS') — no walk step takes it to its
// reading scale (`flyToFocus`) — which expands it, and there → enters its
// spans. Collapsed or expanded is read at the view the camera is
// bound for, so a key made during a flight acts where the flight lands (D5 §4
// rule 8), and each dirty frame marks the items again in place
// (`markExpanded`).
// The ARIA mirror (`role=tree`, virtualised to 24 items either side of the
// current one, `aria-level`/`aria-posinset`/`aria-setsize`) is the one
// accessible rendering at span grain (S1 Q7; R94), the tree named as it
// attaches by ST's `L.mirror-label`, each level's group by `L.mirror-level`
// and each item by ST's `L.mirror.*` entries (`nameOf`), shown in the same
// words, each address in the identifier's face and a document's words in the
// reading face (`named`; P-REG's FACE); what a screen reader
// hears is the focus moving onto the item (rule 12), and no live region
// repeats it (D4). Every block that holds no text is announced by its kind,
// the item rule's (T-ARTICLE's `itemOf`; FP-24), in the strings table's
// words, then what the plane shows of it — a record's words and keys, an
// unshown item's length — and never its raw value; a withheld run's item is
// made from the record the plane's placeholder is (T-ARTICLE's
// `placeholderOf`: the owner of its origin, the entitlement arm for this
// reader, C-67's clause where the origin's edition claims decide one and
// nothing in its place where they do not — R56, B1-S7, PUB-5.124), and while
// a read its clause waits on is out says what needs no read alone — its kind,
// where it stands and its length, as the plane's gap shows its ground alone
// (FP-33); a
// document is named by its address, then the first line its box's label sets
// as the mirror says it (T-LAYER's `mirrorLabel`, the one the status region
// names it by), the version's own — its words quoted, the client's
// words in their place bracketed — then its state (T-LAYER's
// `mirrorState`): where a read answered its metadata its corner's state
// whole, the version its box shows and the count of its chain among it
// (FP-22), a draft's after its kind; one a read answered `withheld` by its
// withheld box's words (B1-S2), its first line standing for none, one the
// board said nothing about by the words for that (`L.far.unregistered`),
// and one no read or listing has told the state of by no state at all
// (FP-25) — and, while it stands kept as it is read again, the clause the
// one line or its corner shows, as a sentence of its own (T-LAYER's
// `keptIn`; FP-23, FP-33), the first withheld run of an origin in it the
// clause its kept sign shows while the origin's edition claims stand so
// (`claimsKeptIn`), and the board's while it lags so (`boardKeptIn`), each
// item marked again in place on each dirty frame where its clause or a
// document's state changed (`markKept`), the current item, where the panel's
// window held it whole, held there as words above it or its own change
// height; a mark's stop by its count,
// the words the mark shows (ST's `markCount`), its item saying a list opens
// on it (`aria-haspopup`); a link's item names its far end as its tail does
// (LK's `farLabel`), and says BM-HELD's line where the
// far end floats or its text holds part of its passage (`farSays`;
// foundations §2.3); where the board will say nothing of its far end's
// document, the item is described by the far end's whole form in its one
// state (LK's `farEmpty`; FP-21), the words a follow of it is faced with, a
// hidden description of its own written at the rebuild and marked again in
// place (`markDescribed`). Back's light is exposed: the items it stands on — each
// span holding a stretch of the passage carried, or the link's end the follow
// was made at, at a withheld run the run's item — carry
// `aria-current="location"` while it stands, written at the rebuild and
// marked again in place on each dirty frame (`markLocated`). A landing's line
// is its item's description (FP-21): the item a landing stands on carries
// `aria-describedby` naming the mirror's hidden description, which holds what
// the landing says (the `described` reader), and every span holding another
// run of a passage in several is described by those runs' labels, a hidden
// description of its own, each written at the rebuild and marked again in
// place (`markDescribed`), so the focus moving onto an item says it once. The
// mirror reads the same elements as the walk, with the words as shown — the
// person's own typing among them — its items written again in place, silently,
// as the text under them changes (`rewrite`); for words in flight it says
// nothing more, and while a draft holds a line the board has not kept an item
// holding words the board has not minted, or a held removal, is described
// "held on this device" (`isHeld`; T-LAYER's `heldIn`, read from the held
// lines alone). The
// mirror is rebuilt whole on every move (`render`), and its Tab stop with it:
// the plane is one stop (D5 §4 rule 5) — the current item, while the tree's
// container stands out of the order; the container is the stop only where
// the mirror holds no item. The panel is shown while the ring is drawn.
// While chrome stands over the plane the tree is inert (`cover`), out of the
// order and of the accessibility tree.
// The page's own death, and every other change of its class (FP-23, FP-29),
// takes the walk again where it stood, at once from the model the change
// left — on the span it stood on where its document kept its text, else on
// the document — and again once its document is read at the new class
// (`dropped`) — on that document still where the new class may not read it,
// named by its withheld box's words, its cover.
// Rules: FP-1, FP-2, FP-7, FP-8, FP-9, FP-10, FP-13, FP-20, FP-21, FP-22,
// FP-23, FP-24, FP-29, FP-33, FP-35.

import * as REC from '../model/records.js';
import * as LK from '../links/links.js';
import * as PUMP from '../model/pump.js';
import * as CAM from '../plane/camera.js';
import * as LAYER from '../text/layer.js';
import * as FOCUS from './focus.js';
import { placeholderOf, itemOf, itemWords, itemLength, recordOf, CLAUSE_READING } from '../text/article.js';
import { farSays } from '../beams/held.js';
import { docBox, accountCell, boardCell, accountAt, clearLeftOf, continuationCell, withinContinuation, membersAt, markKey, continuationOf } from '../plane/projection.js';
import { lodOf, residueDepth, markScale } from '../plane/lod.js';
import { cmpAddr, accountOf, documentOf } from '../model/address.js';
import { touches, isElement, elementIn } from '../text/span.js';
import { esc, fill } from '../util.js';
import { t, tHTML, addressedHTML, markCount } from '../strings.js';

/** @typedef {import('../links/links.js').Shown} Shown */
/** @typedef {import('../model/records.js').ISpan} ISpan */

/**
 * @typedef {Object} Node — one element of the linearization
 * @property {'board' | 'account' | 'mark' | 'document' | 'block' | 'link'} kind
 * @property {string} addr the board, the account, the document; a mark's, the name the plane draws its continuation under (P-PROJ's `markKey`), never an address
 * @property {number | null} pos a block's first position
 * @property {Shown | null} link a drawn link
 */

/** @typedef {{link: string, key: string}} End a link's end among a document's elements: the link and its end's key (LK's `endKey`) */

/**
 * @typedef {Object} Located — where Back's light stands (N-GO's `backLight`), which the mirror marks `aria-current="location"`
 * @property {string} addr the document it stands in
 * @property {Array<{pos: number, width: number}>} runs the stretches of its text the passage carried stands in; none for a link's end
 * @property {End | null} end the link's end the follow was made at; null for a passage
 */

/**
 * @typedef {Object} Described — what a landing says of the passage it carried or followed (N-GO's `described`), which the mirror gives the items it stands on as their descriptions
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
/** the walk holds the kept caret's span (see the head): set where the person leaves the text at a live caret and no act of theirs moves the walk, released by their next walk move or landing */
let caretHeld = false;
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
/** the id of the mirror's hidden description of an item holding what a hold keeps from the board, "held on this device" (see the head) */
const HELD = 'walk-held';
/** the id of the hidden description of a link item's far end the board will say nothing of, item i's (see the head) */
const farId = (/** @type {number} */ i) => 'walk-far-' + i;

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
/** the walk's element, read-only, as the text shown stands now: carried first where that text moved under it (`carry`) */
export function current() { carry(); return focus; }
/** the position a landing named inside the focused span, read-only — the one line's position (null: the span's own first) */
export function landedAt() { carry(); return landed; }
/** the focused span, for the article's `lit` mark */
export function focusedSpan() { carry(); return focus && focus.kind === 'block' && focus.pos != null ? { addr: focus.addr, pos: focus.pos } : null; }
/** is the ring drawn — the focus's owner's rule (rule 10): the plane holds the focus and a key moved it */
export const ringShown = () => FOCUS.ringShown();

/** is a document below its reading scale at the view the camera is bound for (see the head; T-LAYER's one test) — `scale` that view's, where a pass over the mirror's items read it once */
const below = (/** @type {string} */ addr, scale = CAM.destination().scale) => !LAYER.atReadingScale(addr, scale);
/**
 * Does the walk stand on a document below its reading scale (see the head):
 * one stop, focused whole, its mirror item collapsed — its spans reached
 * through Enter's act, a teleport to its reading scale, which `→` takes there
 * (N-KEYS); `key('in')` enters nothing there.
 */
export const collapsed = () => !!focus && focus.kind === 'document' && below(focus.addr);

/**
 * The continuation the plane draws as each account's one mark at a scale, the
 * one drawn the stronger (P-LOD's `residueDepth`); null at the far scale, which
 * draws clusters and no document.
 * @param {number} scale
 * @returns {number | null}
 */
const markDepth = (scale) => (lodOf(scale).name === 'far' ? null : residueDepth(scale).held);

/** the documents the model knows exist under an account (M-REC's `known`), in record order: the boxes the plane draws there */
const documentsUnder = (/** @type {string} */ account) => REC.known().filter((doc) => accountOf(doc) === account).sort(cmpAddr);

/** the members of the mark a stop names (P-PROJ's `membersAt`, as the plane counts them): its account's documents its continuation holds, in record order; none for any other name */
function membersOf(/** @type {string} */ key) {
  const c = continuationOf(key);
  return c ? membersAt(documentsUnder(c.account), c.k).get(c.account) || [] : [];
}

/**
 * The children of a node, in record order: an account's, its documents with
 * the stop for its mark before the mark's members (see the head), the mark
 * read at the scale the camera is bound for.
 * @param {Node | null} node null = the plane's root
 * @returns {Promise<Node[]>}
 */
export async function childrenOf(node) {
  if (!node) return [BOARD];
  if (node.kind === 'board') return REC.accounts().filter((a) => !a.system).map((a) => ({ kind: /** @type {const} */ ('account'), addr: a.account, pos: null, link: null }));
  // an account's documents as the plane draws them: every box the model knows of under it, a covered one among them (M-REC's `known`)
  if (node.kind === 'account') {
    const docs = documentsUnder(node.addr), k = markDepth(CAM.destination().scale);
    /** @type {Node[]} */
    const out = docs.map((doc) => ({ kind: /** @type {const} */ ('document'), addr: read.shown(doc), pos: null, link: null }));
    const first = k == null ? -1 : docs.findIndex((doc) => withinContinuation(doc, k));
    if (k != null && first >= 0) out.splice(first, 0, { kind: 'mark', addr: markKey(node.addr, k), pos: null, link: null });
    return out;
  }
  if (node.kind === 'document') return (await PUMP.loadWhole(node.addr)) ? elementsOf(node.addr) : [];
  // a withheld run's: the ends drawn at it (see the head)
  if (node.kind === 'block' && node.pos != null) return runEnds(node.addr, node.pos).map((s) => ({ kind: /** @type {const} */ ('link'), addr: node.addr, pos: s.pos, link: s }));
  return [];
}

/** a document's elements of the walk in the text the page shows of it now (T-LAYER's `shownOf`): its blocks that are elements — a line the person typed among them, none for one they removed whole — then the ends LK draws in that text, each one stop at its first drawn byte — a document's children once it is read whole (`childrenOf`) */
function elementsOf(/** @type {string} */ addr) {
  /** @type {Node[]} */
  const out = LAYER.shownOf(addr).blocks.filter(isElement).map((b) => ({ kind: /** @type {const} */ ('block'), addr, pos: b.pos, link: null }));
  for (const s of LK.shown(addr)) if (!s.run) out.push({ kind: 'link', addr, pos: s.pos, link: s });
  return out;
}

/**
 * The index of the element of the walk standing on a position, among a
 * document's elements: the span T-SPAN's rule stands it on (`elementIn`; rule
 * 20), read over the blocks of the text the page shows of it; the first where
 * that rule stands it on none — no block holds the position, or none is an
 * element.
 * @param {Node[]} kids the document's elements (`elementsOf`)
 * @param {string} addr the document
 * @param {number} pos a position of the text shown
 * @returns {number}
 */
function elementAt(kids, addr, pos) {
  const b = elementIn(REC.has(addr) ? LAYER.shownOf(addr).blocks : [], pos);
  return b ? Math.max(0, kids.findIndex((n) => n.kind === 'block' && n.pos === b.pos)) : 0;
}

/** the ends LK draws at the withheld run a document's block at `pos` is, in the order it draws them; none for any other block */
const runEnds = (/** @type {string} */ addr, /** @type {number} */ pos) => LK.shown(addr).filter((s) => !!s.run && s.run.pos === pos);

/** the accessible name of a node (what the mirror's item says), from ST's entries (`named`) */
export function nameOf(/** @type {Node} */ n, /** @type {number} */ i, /** @type {number} */ total) { return named(n, i, total).text; }

/** a string's words and its markup, each token `faces` names set in its class — an address the identifier's (`id`), a document's words the reading face's (`reading`) — and every address in the other values the identifier's (ST's `tHTML`) */
const said = (/** @type {string} */ id, /** @type {Record<string, string | number>} */ values, /** @type {Record<string, string>} */ faces = {}) => ({ text: t(id, values), html: tHTML(id, values, faces) });
/** the client's words, as text and markup, each address in them the identifier's (ST's `addressedHTML`) */
const plainly = (/** @type {string} */ words) => ({ text: words, html: addressedHTML(words) });

/**
 * What the mirror's item says of a node (`nameOf`), its words and its markup:
 * the markup the same words, each address in the identifier's face and a
 * document's words in the reading face (P-REG's FACE), so what is shown and
 * what is announced never part.
 * @param {Node} n
 * @param {number} i
 * @param {number} total
 * @returns {{text: string, html: string}}
 */
function named(n, i, total) {
  const at = plainly(' ' + t('L.mirror.item', { i: i + 1, n: total }));
  const then = (/** @type {{text: string, html: string}} */ x, /** @type {{text: string, html: string}} */ y = at) => ({ text: x.text + y.text, html: x.html + y.html });
  if (n.kind === 'board') {
    // where no board is held the root names none: it says why, as the one line does (FP-35)
    const b = REC.board();
    if (!b) { const why = read.noBoard(); return why ? then(plainly(why.text)) : plainly(at.text.trim()); }
    // its name, the one the status region calls it by, then its count
    const name = said('L.mirror.board.name', { node: n.addr, origin: b.origin }, { node: 'id' }), count = REC.accounts().filter((a) => !a.system).length;
    return then(then({ text: t('L.mirror.board', { board: name.text, n: count }), html: fill(esc(t('L.mirror.board')), { board: name.html, n: String(count) }) }, plainly(keptSentence(n))));
  }
  if (n.kind === 'account') {
    const c = REC.countOf(n.addr); const lk = LK.countAccount(n.addr);
    const documents = c.exact ? String(c.documents) : t('L.mirror.at-least', { n: c.documents });
    const links = lk.arriving ? t('L.mirror.at-least', { n: lk.n }) : String(lk.n);
    return then(said('L.mirror.account', { account: n.addr, documents, links, empty: c.documents ? '' : ' — ' + t('B1.empty_subspace') }, { account: 'id' }));
  }
  // a mark's stop: its count, the words the mark shows (ST's `markCount`)
  if (n.kind === 'mark') return then(plainly(markCount(membersOf(n.addr).length, REC.countsExact())));
  if (n.kind === 'document') {
    // a version named by its own first line, as its box's label names it (T-LAYER's `mirrorLabel`; FP-22), then its state as
    // its corner states it, whole, where a read told it (T-LAYER's `mirrorState`)
    const d = REC.doc(n.addr), label = LAYER.mirrorLabel(d);
    const values = { document: n.addr, state: LAYER.mirrorState(d), extent: d.extent != null ? t('L.mirror.positions', { n: d.extent }) : '' };
    return then(then({ text: t('L.mirror.document', { ...values, label: label.map((r) => r.text).join('') }), html: tHTML('L.mirror.document', { ...values, label }, { document: 'id' }) }, plainly(keptSentence(n))));
  }
  if (n.kind === 'block') {
    const d = LAYER.shownOf(n.addr); const b = d.blocks.find((x) => x.pos === n.pos);
    if (!b) return then(said('L.mirror.span.bare', { p: n.pos ?? '', document: n.addr }, { document: 'id' }));
    const kind = itemOf(b);
    if (kind === 'withheld') {
      const w = placeholderOf(b, REC.reader(), LAYER.originOwner, LAYER.clauseOf), ends = runEnds(n.addr, b.pos).length;
      const links = ends ? t('L.mirror.run-links', { links: ends === 1 ? t('F.label.links.1') : t('F.label.links', { n: ends }) }) : '';
      // its clause not decided: what needs no read alone, as the plane's gap shows its ground alone (FP-33)
      if (w.clause === CLAUSE_READING) return then(then(said('L.mirror.no-text', { kind: itemWords(kind), p: b.pos, extent: d.extent ?? '?', document: n.addr, same: '', shown: t('L.mirror.shows', { shown: itemLength(b.width) }) }, { document: 'id' }), plainly(links)));
      return then(then(then(said('L.mirror.withheld', { kind: itemWords(kind), document: n.addr, length: itemLength(b.width), owner: w.owner, origin: b.origin || '', arm: w.arm.text, clause: w.clause ? t('L.mirror.clause', { clause: w.clause.text }) : '' }, { document: 'id', owner: 'id', origin: 'id' }), plainly(keptSentence(n))), plainly(links)));
    }
    const org = d.origins.find((o) => o.pos < b.pos + b.width && b.pos < o.pos + o.width);
    const same = org ? t('L.mirror.same', { origin: org.doc }) : '';
    if (kind) {
      // what the plane shows of the item after its kind: a record's words and keys, an unshown item's length — never its raw value
      const rec = kind === 'record' ? recordOf(b, d, REC.reader()) : null;
      const shown = rec ? [rec.words, rec.keys].filter(Boolean).join(' · ') : kind === 'unshown' ? itemLength(b.width) : '';
      return then(said('L.mirror.no-text', { kind: itemWords(kind), p: b.pos, extent: d.extent ?? '?', document: n.addr, same, shown: shown ? t('L.mirror.shows', { shown }) : '' }, { document: 'id' }));
    }
    return then(said('L.mirror.span', { p: b.pos, extent: d.extent ?? '?', document: n.addr, same, text: b.text }, { document: 'id', text: 'reading' }));
  }
  if (n.kind === 'link' && n.link) {
    const l = n.link, says = farSays(l);
    return then(said('L.mirror.link', {
      link: l.link.addr, type: l.link.type || t('L.mirror.untyped'), direction: l.end === 'from' ? t('F.card.to') : t('F.card.from'), far: LK.farLabel(l),
      floating: says ? t('L.mirror.floating', { sentence: says }) : '',
    }, { link: 'id' }));
  }
  return plainly('');
}

/** a node's level in the tree: board › account › document | mark › span | link, a withheld run's links a level below the run (see the head) */
const levelOf = (/** @type {Node} */ n) => (n.kind === 'board' ? 1 : n.kind === 'account' ? 2 : n.kind === 'document' || n.kind === 'mark' ? 3 : n.kind === 'link' && n.link && n.link.run ? 5 : 4);

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
  const held = at != null && focus && focus.kind === 'block' ? LAYER.blockAt(focus.addr, at) : null;
  landed = held && focus && held.pos === focus.pos ? at : null;
  stand();
}

/**
 * @typedef {Object} Stood — the bytes the walk's focus stands on, where it is a span or a link's end in a document (see the head)
 * @property {string} addr the document
 * @property {number} text how many times the document's page-local edits had changed as they were read (M-REC's `editRev`): the walk is carried where they moved since
 * @property {ISpan[]} ids the span's bytes, or the link's end's, by identity, in the text's order (T-LAYER's `shownIdentity`)
 * @property {ISpan[]} at the byte at the position a landing named inside the span (`landed`); none where it named none
 * @property {number | null} run for a link's end drawn at a withheld run, that run's first position as the bytes were read; null for every other element
 */

/** @type {Stood | null} what the walk's focus stands on (`stand`), which an edit of the text shown carries it by (`carry`); null off a document's spans and links */
let stood = null;

/** the bytes the walk's focus stands on read from the text shown now (`Stood`): what `carry` finds it by once that text moves */
function stand() {
  const f = focus;
  if (!f || (f.kind !== 'block' && f.kind !== 'link') || f.pos == null || !REC.has(f.addr)) { stood = null; return; }
  const b = f.kind === 'block' ? LAYER.blockByPos(f.addr, f.pos) : null, end = f.kind === 'link' ? f.link : null;
  const run = end && end.run ? end.run : null;
  const of = run ? { pos: run.pos, width: run.width } : end ? { pos: end.pos, width: Math.max(1, end.width) } : b ? { pos: b.pos, width: Math.max(1, b.width) } : { pos: f.pos, width: 1 };
  stood = { addr: f.addr, text: REC.editRev(f.addr), ids: LAYER.shownIdentity(f.addr, of.pos, of.width), at: landed != null ? LAYER.shownIdentity(f.addr, landed, 1) : [], run: run ? run.pos : null };
}

/** do two lists of a document's elements name the same elements at the same places? */
const sameElements = (/** @type {Node[]} */ a, /** @type {Node[]} */ b) => a.length === b.length && a.every((n, i) => n.kind === b[i].kind && n.addr === b[i].addr && n.pos === b[i].pos && (n.link ? n.link.link.addr : null) === (b[i].link ? /** @type {Shown} */ (b[i].link).link.addr : null) && (n.link ? n.link.key : null) === (b[i].link ? /** @type {Shown} */ (b[i].link).key : null));

/**
 * The walk carried through a change of the text shown under it (see the
 * head; D5 §4 rule 4): where the page-local edits of the document its focus
 * stands in moved since the focus was read — a key typed, a put-back, bytes
 * the board minted — the document's elements are listed again from
 * it and the focus stands on the element holding the first of its bytes still
 * there (T-LAYER's `firstStanding`); where none is, on the element after the
 * point the page's own record says they were removed at (T-LAYER's
 * `removedOf`), else after where they stood, else on the one before; a link's
 * end on its own stop while LK still draws it. A stop is never lost, and where
 * the elements stand as they stood nothing moves: the mirror is rebuilt only
 * where they changed, the platform's focus kept on the walk's item where the
 * mirror held it.
 * @returns {boolean} whether the walk's element or its siblings changed
 */
export function carry() {
  const f = focus, was = stood;
  if (!f || !was || f.pos == null || !REC.has(was.addr) || REC.editRev(was.addr) === was.text) return false;
  const addr = was.addr, kids = elementsOf(addr), deep = f.kind === 'link' && was.run != null;
  if (!kids.length) { stood = { ...was, text: REC.editRev(addr) }; return false; }
  const first = LAYER.firstStanding(addr, was.ids);
  /** the element that takes the place of bytes the text shown no longer holds: the first at or after the point they were removed at, else the last before it */
  const after = (/** @type {number} */ p) => { const i = kids.findIndex((n) => n.kind === 'block' && n.pos != null && n.pos >= p); return i >= 0 ? i : Math.max(0, kids.map((n) => n.kind).lastIndexOf('block')); };
  const gone = first == null ? LAYER.removedOf(addr, was.ids).at ?? f.pos : null;
  // the level of the document's elements: the walk's own, or, at a withheld run's ends, the one above it
  const level = deep ? stack[stack.length - 1] : null, old = level ? level.siblings : siblings;
  const end = f.kind === 'link' && f.link ? f.link : null;
  let i = first != null ? elementAt(kids, addr, first) : after(/** @type {number} */ (gone));
  if (end && !deep) { const k = kids.findIndex((n) => n.kind === 'link' && !!n.link && n.link.link.addr === end.link.addr && n.link.key === end.key); if (k >= 0) i = k; }
  const changed = !sameElements(old, kids);
  if (level) {
    level.siblings = kids; level.idx = i;
    const ends = kids[i] && kids[i].kind === 'block' && kids[i].pos != null ? runEnds(addr, /** @type {number} */ (kids[i].pos)).map((x) => /** @type {Node} */ ({ kind: 'link', addr, pos: x.pos, link: x })) : [];
    const k = end ? ends.findIndex((n) => !!n.link && n.link.link.addr === end.link.addr && n.link.key === end.key) : -1;
    if (k >= 0) { siblings = ends; idx = k; focus = ends[k]; } else { stack.pop(); siblings = kids; idx = i; focus = kids[i]; }
  } else { siblings = kids; idx = i; focus = kids[i]; }
  const at = was.at.length ? LAYER.firstStanding(addr, was.at) : null, b = at != null && focus && focus.kind === 'block' ? LAYER.blockAt(addr, at) : null;
  landed = b && focus && b.pos === focus.pos ? at : null;
  stand();
  const moved_ = changed || !focus || focus.kind !== f.kind || focus.pos !== f.pos;
  if (!moved_) { rewrite(); return false; }
  // the same elements in the same order, each moved or its words changed: its items written again in place, silently; else the mirror rebuilt
  if (old.length === kids.length && old.every((n, k) => n.kind === kids[k].kind) && focus && focus.kind === f.kind && !level) rewrite();
  else { const held = mirrorHolds(); render(); if (held) focusItem(); }
  moved();
  return true;
}

/**
 * The mirror's items written again in place where the text under them
 * changed and the walk's elements stand as they stood (see the head): each
 * item's words and its position, the item itself kept, so the platform's
 * focus stays on the item it stands on and nothing is announced — the mirror
 * reads the words as shown, the person's own typing among them, and changes
 * silently as the text changes. The mirror rebuilt where the platform gives
 * no items to write in.
 */
function rewrite() {
  if (!mirrorEl) return;
  if (typeof mirrorEl.querySelectorAll !== 'function') { render(); return; }
  const total = siblings.length;
  for (const li of /** @type {HTMLElement[]} */ ([...mirrorEl.querySelectorAll('li[role="treeitem"]')])) {
    const i = Number(li.dataset.i), n = siblings[i];
    if (!n) continue;
    if (n.pos != null && li.dataset.pos !== String(n.pos)) li.dataset.pos = String(n.pos);
    const html = named(n, i, total).html;
    if (li.innerHTML !== html) li.innerHTML = html;
  }
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
 * head), held in the mirror's one hidden element after the items, each other
 * description an item names in a hidden element of its own after them. Replacing
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
  const at = read.located(), said = read.described(), scale = CAM.destination().scale;
  let pieces = '';
  for (let i = lo; i < hi; i++) {
    const n = siblings[i];
    const expanded = n.kind === 'document' ? ` aria-expanded="${!below(n.addr, scale)}"` : n.kind === 'block' && n.pos != null && runEnds(n.addr, n.pos).length ? ' aria-expanded="true"' : '';
    const popup = n.kind === 'mark' ? ' aria-haspopup="dialog"' : '';
    const located = isLocated(n, at) ? ' aria-current="location"' : '';
    const by = describedBy(n, i, said);
    const described = by ? ` aria-describedby="${by}"` : '';
    const state = n.kind === 'document' ? ` data-state="${esc(stateOf(n))}"` : '';
    html += `<li role="treeitem" id="walk-${i}" tabindex="${i === idx ? 0 : -1}" aria-level="${lvl}" aria-posinset="${i + 1}" aria-setsize="${total}" aria-selected="${i === idx}"${expanded}${popup}${located}${described} data-i="${i}" data-addr="${esc(n.addr)}"${n.pos != null ? ` data-pos="${n.pos}"` : ''} data-kept="${esc(keptSentence(n))}"${state}>${named(n, i, total).html}</li>`;
    if (holdsRuns(n, said)) pieces += `<div id="${pieceId(i)}" hidden>${esc(otherRuns(n, said))}</div>`;
    const far = farWhole(n);
    if (far) pieces += `<div id="${farId(i)}" hidden>${esc(far)}</div>`;
  }
  html += `</ul><div id="${DESCRIPTION}" hidden>${esc(said ? said.words : '')}</div><div id="${HELD}" hidden>${esc(t('L.held.device'))}</div>${pieces}`;
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
  const scale = CAM.destination().scale;
  for (const li of /** @type {HTMLElement[]} */ ([...mirrorEl.querySelectorAll('li[aria-expanded]')])) {
    const n = siblings[Number(li.dataset.i)];
    if (!n || n.kind !== 'document') continue;
    const v = String(!below(li.dataset.addr || '', scale));
    if (li.getAttribute('aria-expanded') !== v) li.setAttribute('aria-expanded', v);
  }
}

/**
 * The kept clause a node's item carries as its own sentence after its words
 * (see the head; FP-23, FP-33): a document's, the words its corner or the
 * one line shows (T-LAYER's `keptIn`); the board's while it lags, the words
 * the one line shows (T-LAYER's `boardKeptIn`); the first withheld run of an
 * origin in its document, while the origin's edition claims stand held as
 * they are read again, the words its kept sign shows (T-LAYER's
 * `claimsKeptIn`); '' for every other node, and where nothing is kept.
 * @param {Node} n
 * @returns {string}
 */
function keptSentence(n) {
  if (n.kind === 'document') { const k = LAYER.keptIn(n.addr); return k ? t('L.mirror.clause', { clause: k.text }) : ''; }
  if (n.kind === 'board') { const k = LAYER.boardKeptIn(); return k ? t('L.mirror.clause', { clause: k.text }) : ''; }
  const b = n.kind === 'block' && n.pos != null ? LAYER.blockByPos(n.addr, n.pos) : null;
  if (!b || b.kind !== 'withheld' || !b.origin || LAYER.shownOf(n.addr).blocks.find((x) => x.kind === 'withheld' && x.origin === b.origin) !== b) return '';
  const k = LAYER.claimsKeptIn(b.origin);
  return k ? t('L.mirror.clause', { clause: k.text }) : '';
}

/** a document's state as its item voices it (T-LAYER's `mirrorState`): the version its node names, as its corner states it */
const stateOf = (/** @type {Node} */ n) => LAYER.mirrorState(REC.doc(n.addr));

/**
 * The mirror's items marked in place where the kept clause they carry, or a
 * document's state, changed (see the head; `keptSentence`, `stateOf`): each
 * such item's words written again, the item itself kept, so the platform's
 * focus stays on the item it stands on. The app's loop runs it on each dirty
 * frame: a clause appears once its read again has stood a second and lifts
 * in the frame its read sets it, and a document's item says what its corner
 * says in the frame its corner says it — its chain counted again, the
 * board's lag begun or ended — between the walk's moves. Words written again
 * change an item's height: the current item, where the panel's window held it
 * whole, is brought inside it again (`showInPanel`), and where the reader's
 * scroll had left it outside, the scroll stands.
 */
export function markKept() {
  if (!mirrorEl || typeof mirrorEl.querySelectorAll !== 'function') return;
  const total = siblings.length, runs = PUMP.keptAll().origins.length > 0;
  const items = /** @type {HTMLElement[]} */ ([...mirrorEl.querySelectorAll('li[role="treeitem"]')]);
  const current = items.find((li) => Number(li.dataset.i) === idx) || null, held = !!current && inPanel(current);
  let wrote = false;
  for (const li of items) {
    const i = Number(li.dataset.i), n = siblings[i];
    // a span's item carries a clause only while an origin's edition claims stand kept, or carries one still
    if (!n || (n.kind !== 'document' && n.kind !== 'board' && (n.kind !== 'block' || (!runs && !li.dataset.kept)))) continue;
    const words = keptSentence(n), state = n.kind === 'document' ? stateOf(n) : null;
    if (li.dataset.kept === words && (state === null || li.dataset.state === state)) continue;
    li.dataset.kept = words;
    if (state !== null) li.dataset.state = state;
    li.innerHTML = named(n, i, total).html;
    wrote = true;
  }
  if (wrote && current && held) showInPanel(current);
}

/** does Back's light stand on a node (see the head): a span holding a stretch of the passage carried, or the link's end the follow was made at — at a withheld run, where LK draws that end there, the run's item */
function isLocated(/** @type {Node} */ n, /** @type {Located | null} */ at) {
  if (!at || n.addr !== at.addr) return false;
  const end = at.end;
  if (n.kind === 'link') return !!end && !!n.link && n.link.link.addr === end.link && n.link.key === end.key;
  const b = n.kind === 'block' && n.pos != null ? LAYER.blockByPos(n.addr, n.pos) : null;
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
const blockOf = (/** @type {Node} */ n) => (n.kind === 'block' && n.pos != null ? LAYER.blockByPos(n.addr, n.pos) : null);

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

/** a link node's far end's whole form where the board will say nothing of its document (LK's `farEmpty`), its parts in order as a face of it is heard: its own description's words (see the head); '' for every other node */
function farWhole(/** @type {Node} */ n) {
  const empty = n.kind === 'link' && n.link ? LK.farEmpty(n.link) : null;
  return empty ? empty.whole.map((p) => p.text).join(' ') : '';
}

/** does a span node hold what a hold keeps from the board (see the head; T-LAYER's `heldIn`): words the board has not minted, or a held removal, while its draft holds a line the board has not kept */
function isHeld(/** @type {Node} */ n) {
  const b = blockOf(n);
  return !!b && LAYER.heldIn(n.addr, b.pos, Math.max(1, b.width));
}

/**
 * The descriptions a node names (see the head): the landing's, where it
 * stands on it; "held on this device", where it holds what a hold keeps from
 * the board; its other runs' labels, where it holds any; its far end's
 * whole form, where the board will say nothing of its far document; null
 * where it names none.
 * @param {Node} n
 * @param {number} i its index among its siblings
 * @param {Described | null} at
 * @returns {string | null} the ids, as `aria-describedby` takes them
 */
function describedBy(n, i, at) {
  /** @type {string[]} */
  const ids = [];
  if (isDescribed(n, at)) ids.push(DESCRIPTION);
  if (isHeld(n)) ids.push(HELD);
  if (otherRuns(n, at)) ids.push(pieceId(i));
  if (farWhole(n)) ids.push(farId(i));
  return ids.length ? ids.join(' ') : null;
}

/**
 * The items' descriptions marked in place (see the head): the hidden
 * elements' words set to what they say now — the landing's line, each span's
 * other runs' labels, each link item's far end's whole form — and
 * `aria-describedby` on the items they stand on and on no other, naming an
 * item's own hidden description only where the rebuild wrote one, nothing
 * rebuilt, so the platform's focus stays on the item it stands on. The app's
 * loop runs it on each dirty frame: the line goes with the arrival, its words
 * change as its reads answer — an offer found, a retry answered — a step
 * moves the landing among its runs, and a far end's state changes with the
 * index and the session, between the walk's moves.
 */
export function markDescribed() {
  if (!mirrorEl || typeof mirrorEl.querySelectorAll !== 'function') return;
  const said = read.described(), words = said ? said.words : '';
  const q = (/** @type {string} */ id) => (mirrorEl && typeof mirrorEl.querySelector === 'function' ? mirrorEl.querySelector('#' + id) : null);
  const el = q(DESCRIPTION);
  if (el && el.textContent !== words) el.textContent = words;
  for (const li of /** @type {HTMLElement[]} */ ([...mirrorEl.querySelectorAll('li[role="treeitem"]')])) {
    const i = Number(li.dataset.i), n = siblings[i], piece = q(pieceId(i)), far = q(farId(i));
    if (n && piece) { const w = otherRuns(n, said); if (piece.textContent !== w) piece.textContent = w; }
    if (n && far) { const w = farWhole(n); if (far.textContent !== w) far.textContent = w; }
    const by = n ? describedBy(n, i, said) : null;
    const named = by ? by.split(' ').filter((x) => (x !== pieceId(i) || piece) && (x !== farId(i) || far)).join(' ') || null : null;
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
  const at = placeInPanel(item);
  if (!at || !mirrorEl) return;
  if (at.top < 0) mirrorEl.scrollTop += at.top;
  else if (at.bottom > mirrorEl.clientHeight) mirrorEl.scrollTop += at.bottom - mirrorEl.clientHeight;
}

/**
 * Where an item stands in the panel's scroll window: its top and bottom
 * edges measured from the panel's padding box, in px; null where the platform
 * lays it out nowhere.
 * @param {HTMLElement} item
 * @returns {{top: number, bottom: number} | null}
 */
function placeInPanel(item) {
  if (!mirrorEl || typeof item.getBoundingClientRect !== 'function') return null;
  const panel = mirrorEl.getBoundingClientRect(), r = item.getBoundingClientRect();
  const top = r.top - (panel.top + mirrorEl.clientTop);
  return { top, bottom: top + r.height };
}

/** is an item inside the panel's scroll window, whole? */
function inPanel(/** @type {HTMLElement} */ item) {
  const at = placeInPanel(item);
  return !!at && !!mirrorEl && at.top >= 0 && at.bottom <= mirrorEl.clientHeight;
}

/** the mirror's item i's name (the gate reads it) */
export function mirrorItem(/** @type {number} */ i) {
  carry();
  const n = siblings[i]; return n ? nameOf(n, i, siblings.length) : null;
}
export function mirrorSize() { carry(); return siblings.length; }
export function mirrorIndex() { carry(); return idx; }

/** the walk moved: its watchers told, the plane redrawn */
function moved() {
  for (const w of watchers) w(focus);
  CAM.markDirty();
}

/**
 * The continuation of the mark whose stop the walk's level holds, where that
 * mark holds a document (see the head): the walk lists the document after
 * the mark's stop; null where its level holds no mark, or the mark holds the
 * document not.
 * @param {string} addr
 * @returns {{account: string, k: number} | null}
 */
function heldBy(addr) {
  const stop = siblings.find((n) => n.kind === 'mark'), c = stop ? continuationOf(stop.addr) : null, doc = documentOf(addr) || addr;
  return c && accountOf(doc) === c.account && withinContinuation(doc, c.k) ? c : null;
}

/**
 * The camera follows the focus: fly to the element at its level's scale — a
 * mark's stop, and a document the mark it stands before holds (`heldBy`), the
 * mark's cell centred at the scale nearest the camera's that draws it as one
 * mark (P-LOD's `markScale`), the document never framed, its ring standing on
 * the mark; any other document's outline framed, no nearer than its reading
 * size where the scale the camera was bound for as the move was made reads it
 * at its reading scale, else no nearer than just short of that (T-LAYER's
 * `scaleBelowReading`), so a step never takes a document to its reading scale
 * from below it; a span's line, or a link's end's, where the text shown sets
 * it, its column framed with both its margins, at the landing's em
 * (T-LAYER's `frameOf`; P-CAM's `landingPx`) — the document's frame and the
 * span's line each read again as the camera flies (`aimIn`) — nowhere where
 * the document's extent is read first and a later move overtook this one
 * meanwhile.
 * @param {number} move the move's count
 */
async function flyToFocus(move) {
  if (!focus) return;
  const from = CAM.destination().scale;
  const mark = focus.kind === 'mark' ? continuationOf(focus.addr) : focus.kind === 'document' ? heldBy(focus.addr) : null;
  if (mark) {
    const c = continuationCell(mark.account, mark.k);
    await CAM.fly({ x: c.x + c.w / 2, y: c.y + c.h / 2, scale: markScale(mark.k, from) }, 300);
  } else if (focus.kind === 'mark') return;
  else if (focus.kind === 'board') await CAM.fly(CAM.viewForCell(boardCell(focus.addr), 0.92), 300);
  else if (focus.kind === 'account') await CAM.fly(CAM.viewForCell(accountCell(focus.addr), 0.85), 300);
  else if (focus.kind === 'document') {
    const addr = focus.addr;
    if (REC.doc(addr).extent == null) await PUMP.loadWhole(addr);
    if (move !== moves) return;
    const reads = LAYER.atReadingScale(addr, from);
    await CAM.fly(aimIn(addr, () => {
      const v = CAM.viewForCell(LAYER.shapeOf(addr), 0.9);
      return { ...v, scale: Math.min(v.scale, reads ? CAM.landingPx() / LAYER.foldOf(REC.doc(addr)).fs : LAYER.scaleBelowReading(addr)) };
    }), 300);
  } else {
    const addr = focus.addr, pos = focus.pos;
    await CAM.fly(aimIn(addr, () => { const at = LAYER.frameOf(addr, pos); return CAM.viewAt(at, at.fs); }), 260);
  }
  CAM.markDirty();
}

/**
 * The aim of a walk move's flight to a document's place (see the head;
 * P-CAM's `Aim`; FP-8): `view` read again each frame as the document is set
 * — a resize, a face, its text or its links arriving — its last answer kept
 * while the page holds none of the document's text, which an estimate would
 * place elsewhere.
 * @param {string} addr
 * @param {() => import('../plane/camera.js').View} view
 * @returns {import('../plane/camera.js').Aim}
 */
function aimIn(addr, view) {
  let last = view();
  return () => { if (REC.has(addr) && REC.doc(addr).from >= 0) last = view(); return last; };
}

/** a walk key's move: the kept caret's hold released (see the head), the mirror rebuilt, the platform's focus on the new item with the ring drawn (rules 10, 12), the watchers told */
function stepped() { caretHeld = false; render(); focusItem({ byKey: true }); moved(); }

/**
 * The child of a node → steps in to (D5 K-3), read from what the plane draws
 * under a view's centre as the key is made, before the node's children are
 * read: at the board, the account whose cell holds the centre; at an account,
 * the continuation's mark whose cell holds it at the view's scale (`markAt`),
 * else, nearer than far, where the plane draws documents, the document whose
 * region holds it, as the version its box shows (`documentAt`); at a
 * document, the element standing on the position its fold holds under the
 * centre, where its region holds the centre — a position of the text shown —
 * by the landing's rule (`elementAt`). It answers that child's
 * index among the node's children once they are read, and the first's where
 * none of them is drawn under the centre.
 * @param {Node} node
 * @param {import('../plane/camera.js').View} view the view the camera is bound for
 * @returns {(kids: Node[]) => number}
 */
function childUnder(node, view) {
  const { x, y, scale } = view;
  /** the index of the child at an address, else the first's */
  const named = (/** @type {string | null} */ addr) => (/** @type {Node[]} */ kids) => Math.max(0, kids.findIndex((n) => n.addr === addr));
  if (node.kind === 'board') return named(REC.board() ? accountAt(x, y, BOARD.addr) : null);
  if (node.kind === 'account') { const mark = markAt(x, y, scale); return named(mark ? mark.key : lodOf(scale).name === 'far' ? null : documentAt(x, y, scale)); }
  const pos = node.kind === 'document' && holdsPoint(LAYER.regionOf(node.addr), x, y) ? LAYER.posAt(node.addr, x, y) : null;
  return (kids) => (pos == null ? 0 : elementAt(kids, node.addr, pos));
}

/**
 * A walk key: ↓ ↑ siblings, → in, ← out, Home/End first/last, Enter acts;
 * off a live caret, Shift+↓ / Shift+↑ select by span (K-8, the selection's
 * owner's, which leaves the focus here — rule 15). A live caret is left kept
 * as the key is made (see the head). → steps in to the child drawn under the
 * centre of the view the camera is bound for as the key is made, else to the
 * first (`childUnder`); it reads the children first, and
 * enters nothing where a later move overtook it meanwhile, nor at a document
 * below its reading scale (`collapsed`), whose spans Enter's act reaches.
 * @param {'down' | 'up' | 'in' | 'out' | 'first' | 'last'} k
 * @returns {Promise<boolean>}
 */
export async function key(k) {
  LAYER.leaveCaret();
  if (!focus) { await enter(); return true; }
  if (k === 'down' || k === 'up' || k === 'first' || k === 'last') {
    const ni = k === 'down' ? Math.min(siblings.length - 1, idx + 1) : k === 'up' ? Math.max(0, idx - 1) : k === 'first' ? 0 : siblings.length - 1;
    if (ni !== idx) { const move = ++moves; setFocus(siblings, ni); stepped(); await flyToFocus(move); }
    return true;
  }
  if (k === 'in') {
    if (collapsed()) return true;
    const move = ++moves, child = childUnder(focus, CAM.destination());
    const kids = await childrenOf(focus);
    if (move !== moves) return true;
    if (kids.length) { stack.push({ siblings, idx }); setFocus(kids, child(kids)); stepped(); await flyToFocus(move); }
    return true;
  }
  if (k === 'out') {
    const up = stack.pop();
    if (up && up.siblings.length) { const move = ++moves; setFocus(up.siblings, up.idx); stepped(); await flyToFocus(move); }
    return true;
  }
  return false;
}

/** the plane takes focus with nothing focused yet: the board, a live caret left kept (see the head) */
export async function enter() {
  LAYER.leaveCaret();
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
 * crossed): the walk stands on that link's item where the document's
 * elements list it, else on the span holding the position. A mark's name
 * stands it on the mark's stop where the plane draws that mark at the scale
 * the camera is bound for, else on the mark's account. A move taken from what
 * the model holds (`asHeld`) reads no text: a span's levels are its
 * document's elements as the page shows them now (`elementsOf`). A landing
 * is the person's act: the kept caret's hold is released and a live caret
 * left kept as the move is made, before anything is read (see the head;
 * T-LAYER's `leaveCaret`).
 * @param {string} addr a document, an account or a board; a mark's name (P-PROJ's `markKey`)
 * @param {number | null} pos
 * @param {boolean | null} [byKey] a key made the act; null where the move is no act of its own and the ring's rule stands (a key's caret followed, `followCaret`)
 * @param {boolean} [take] the platform's focus goes to the landing's item wherever it stood (an act); false carries it only where the mirror held it (a camera's re-take)
 * @param {End | null} [end] the link's end to stand on, at `pos`
 * @param {boolean} [asHeld] a span's levels taken from the text the page shows now, its document's text read for none (`dropped`, `followCaret`, `leaveText`)
 * @returns {Promise<void>}
 */
export async function focusTo(addr, pos, byKey = false, take = true, end = null, asHeld = false) {
  caretHeld = false;
  LAYER.leaveCaret();
  await standOn(addr, pos, byKey, take, end, asHeld);
}

/**
 * The walk moves to a landing that returns the focus to the plane a reading
 * scene was opened over (see the head; D5 §4 rule 8, K-63): as `focusTo`,
 * save that a live caret stands live and the kept caret's hold stands, as
 * the scene found them.
 * @param {string} addr
 * @param {number | null} pos
 * @param {boolean | null} [byKey] a key made the act
 * @param {boolean} [take] the platform's focus goes to the landing's item wherever it stood
 * @param {End | null} [end] the link's end to stand on, at `pos`
 * @returns {Promise<void>}
 */
export function returnFocusTo(addr, pos, byKey = false, take = true, end = null) { return standOn(addr, pos, byKey, take, end); }

/**
 * The walk stood on a landing as `focusTo` names it, a live caret untouched
 * and the kept caret's hold neither set nor released: the move `focusTo` and
 * `returnFocusTo` make, `followCaret`'s, `leaveText`'s, the re-take's, and
 * the moves the page makes of its own (`restand`).
 * @param {string} addr
 * @param {number | null} pos
 * @param {boolean | null} [byKey]
 * @param {boolean} [take]
 * @param {End | null} [end]
 * @param {boolean} [asHeld]
 * @returns {Promise<void>}
 */
async function standOn(addr, pos, byKey = false, take = true, end = null, asHeld = false) {
  const move = ++moves;
  const held = mirrorHolds();
  // a mark's name is no address: read before any address is taken from it
  const mark = continuationOf(addr);
  const doc = !mark && documentOf(addr) ? read.shown(addr) : null, acct = mark ? mark.account : accountOf(addr);
  if (mark) {
    const A = among(await childrenOf(BOARD), { kind: 'account', addr: mark.account, pos: null, link: null });
    const M = await childrenOf({ kind: 'account', addr: mark.account, pos: null, link: null });
    if (move !== moves) return;
    const i = M.findIndex((n) => n.kind === 'mark' && n.addr === addr);
    stack = [{ siblings: [BOARD], idx: 0 }];
    if (i >= 0) { stack.push({ siblings: A.sibs, idx: A.i }); setFocus(M, i); } else setFocus(A.sibs, A.i);
  } else if (doc) {
    const d = LAYER.shownOf(doc);
    // the levels above the landing, each holding ITS OWN place in its siblings (so ← walks out to this document, this account)
    const A = among(await childrenOf(BOARD), { kind: 'account', addr: acct || '', pos: null, link: null });
    const D = among(await childrenOf({ kind: 'account', addr: acct || '', pos: null, link: null }), { kind: 'document', addr: doc, pos: null, link: null });
    const kids = pos != null && d.blocks.length ? (asHeld ? elementsOf(doc) : await childrenOf({ kind: 'document', addr: doc, pos: null, link: null })) : [];
    if (move !== moves) return;
    if (pos != null && kids.length) {
      const named = end ? kids.findIndex((n) => n.kind === 'link' && !!n.link && n.link.link.addr === end.link && n.link.key === end.key) : -1;
      stack = [{ siblings: [BOARD], idx: 0 }, { siblings: A.sibs, idx: A.i }, { siblings: D.sibs, idx: D.i }];
      setFocus(kids, named >= 0 ? named : elementAt(kids, doc, pos), pos);
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
  const ring = byKey === null ? {} : { byKey };
  render();
  if (take || held) focusItem(ring); else FOCUS.land(null, ring);
  moved();
}

/**
 * A move the page makes of its own (see the head): a live caret left kept
 * as it is made (T-LAYER's `leaveCaret`), the walk stood as `standOn` stands
 * it, the kept caret's hold standing.
 * @param {string} addr
 * @param {number | null} pos
 * @param {boolean | null} [byKey]
 * @param {boolean} [take]
 * @param {End | null} [end]
 * @param {boolean} [asHeld]
 * @returns {Promise<void>}
 */
function restand(addr, pos, byKey = false, take = true, end = null, asHeld = false) {
  LAYER.leaveCaret();
  return standOn(addr, pos, byKey, take, end, asHeld);
}

/**
 * The walk stood on the version the box it stands in shows now, at the
 * position it stands at — a newer version's arrival pinning that box on the
 * member being read (N-GO's `arrived`; FP-22, FP-23): a move the page makes
 * of its own (`restand`), the platform's focus carried only where the mirror
 * held it, the ring out.
 * @param {string} addr the version the box shows
 * @param {number | null} pos
 * @returns {Promise<void>}
 */
export function standAgain(addr, pos) { return restand(addr, pos, false, false); }

/**
 * A live caret left without a move of the walk (see the head): kept where it
 * stood (T-LAYER's `leaveCaret`), its span holding the walk from now — a
 * camera move past the caret's reading scale, read by the re-take
 * (`retakeFromView`) or by the key that meets it first (N-KEYS' `whereNow`),
 * and Esc (`leaveText`).
 * @returns {{addr: string, pos: number, block: number | null} | null} the span the caret stands in, in the text shown (T-LAYER's `caretSpan`); null where no live caret stood, nothing then held
 */
export function holdCaret() {
  const left = LAYER.leaveCaret();
  if (left) caretHeld = true;
  return left;
}

/**
 * Esc at a live caret (K-77; see the head): the caret kept and its span
 * holding the walk (`holdCaret`), the walk stood on that span at the caret's
 * position with the ring drawn — the text left to the walk, no act of the
 * walk's, so the hold stands.
 * @returns {boolean} a live caret stood
 */
export function leaveText() {
  const left = holdCaret();
  if (left) void standOn(left.addr, left.pos, true, true, null, true);
  return !!left;
}

/**
 * The element of the walk the kept caret's span is, where that span holds the
 * walk (see the head): a kept caret standing in text the person may edit at
 * the camera's scale (T-LAYER's `editable`), its element found by the
 * landing's rule as the walk follows a caret (`followCaret`), a line of it
 * standing in the visible view (T-LAYER's `spanInView`); null where no hold
 * stands, or no such span does.
 * @returns {{node: Node, pos: number} | null} the element, and the caret's position in the text shown, which the walk names there
 */
function heldSpan() {
  const c = caretHeld ? LAYER.caret() : null;
  const at = c && !c.live && LAYER.editable(c.addr) ? LAYER.caretSpan() : null;
  if (!at) return null;
  const kids = elementsOf(at.addr), node = kids[elementAt(kids, at.addr, at.pos)];
  const b = node && node.kind === 'block' && node.pos != null ? LAYER.blockByPos(at.addr, node.pos) : null;
  return b && LAYER.spanInView(at.addr, b.pos, b.width) ? { node, pos: at.pos } : null;
}

/** the live caret the walk follows (`followCaret`): one standing in text the person may edit at the camera's scale (T-LAYER's `editable`); null where none does */
function liveCaret() {
  const c = LAYER.caret();
  return c && c.live && LAYER.editable(c.addr) ? c : null;
}

/**
 * The walk follows a live caret (B3-S13): it stands on the element of the
 * walk the caret's span is by the landing's rule (T-LAYER's `caretSpan`;
 * `elementAt`), its levels taken from the text the page shows and no text read
 * (`focusTo`'s `asHeld`), naming that element's own first position, so the
 * one line never names a position the caret has left, the caret standing
 * live through the move (`standOn`; see the head). Like a camera-made
 * re-take, it carries the platform's focus to the new item only where the
 * mirror held it. Nothing where the walk stands on that element already, or
 * no live caret stands (`liveCaret`).
 * @param {boolean | null} [byKey] false where a click placed the caret, which puts the ring out; null where a key at the caret moved it, the ring's rule standing
 * @returns {Promise<void>}
 */
export async function followCaret(byKey = null) {
  const at = liveCaret() ? LAYER.caretSpan() : null;
  // the walk already on the span the caret stands in (T-LAYER's `caretSpan`), as at every key typed inside a span: answered before the document's elements are listed
  if (!at || (focus && focus.kind === 'block' && focus.addr === at.addr && focus.pos === at.block)) return;
  const kids = elementsOf(at.addr), el = kids[elementAt(kids, at.addr, at.pos)];
  if (!el || (focus && focus.kind === el.kind && focus.addr === el.addr && focus.pos === el.pos)) return;
  await standOn(at.addr, el.pos, byKey, false, null, true);
}

/** does a world rect hold a point? */
const holdsPoint = (/** @type {{x: number, y: number, w: number, h: number}} */ r, /** @type {number} */ x, /** @type {number} */ y) => x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h;
/** is a node a document's element of the walk: the document itself, or a span or a link in it */
const inDocument = (/** @type {Node} */ n) => n.kind === 'document' || n.kind === 'block' || n.kind === 'link';

/**
 * The continuation's mark whose cell holds a world point at a scale — the one
 * the plane draws the stronger there — with its name and its members; null
 * where no mark's cell holds it, or the mark holds no document (see the head).
 * @param {number} x
 * @param {number} y
 * @param {number} [scale] the camera's where none is given
 * @returns {{key: string, members: string[]} | null}
 */
function markAt(x, y, scale = CAM.cam.scale) {
  const k = markDepth(scale), acct = REC.board() ? accountAt(x, y, BOARD.addr) : null;
  if (k == null || !acct || !holdsPoint(continuationCell(acct, k), x, y)) return null;
  const key = markKey(acct, k), members = membersOf(key);
  return members.length ? { key, members } : null;
}

/**
 * The document whose region holds a world point (T-LAYER's `regionOf`: its
 * outline and the strip its corner stands in), of the boxes the plane draws
 * (M-REC's `known`) whole at a scale — none a continuation's mark holds — as
 * the version its box shows, the region that version's (see the head); of
 * documents sharing the room past the sound depth, the first whose outline
 * holds it; null where no region does.
 * @param {number} x
 * @param {number} y
 * @param {number} [scale] the camera's where none is given
 * @returns {string | null}
 */
function documentAt(x, y, scale = CAM.cam.scale) {
  let best = null, on = false;
  const k = markDepth(scale);
  for (const doc of REC.known()) {
    if (k != null && withinContinuation(doc, k)) continue;
    // the room widened by the corner's strip: the region stands inside it — the region of the version the box shows
    const b = docBox(doc), left = clearLeftOf(doc), shown = read.shown(doc);
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
 * The element of the walk the plane draws under a view's centre, in the
 * re-take's order without its rules of keeping — the kept caret's span, a
 * member a mark holds, the walk's own document (see the head): nearer
 * than far, a continuation's mark whose cell holds the centre (`markAt`),
 * else the document whose region holds it (`documentAt`) — where the view
 * reads that document at its own reading scale (T-LAYER's fold and its one
 * test) and it holds an element of the walk, the element T-SPAN's rule
 * stands the position under the centre on (`elementIn`; rule 20) — the text
 * shown's position there (T-LAYER's `posAt`) — else its first element; else the document
 * whole; else, and at far scale, where the grain stops at the account, the
 * account whose region holds the centre, else the board — the root alone
 * where no board is held. The re-take reads it at the camera
 * (`retakeFromView`), and a return at the view it lands at as the act is
 * made, before the camera is there (N-GO's).
 * @param {import('../plane/camera.js').View} view
 * @returns {Node}
 */
export function elementUnder(view) {
  const { x, y, scale } = view, lod = lodOf(scale).name;
  if (lod !== 'far' && lod !== 'far~mid') {
    const mark = markAt(x, y, scale);
    if (mark) return { kind: 'mark', addr: mark.key, pos: null, link: null };
    const doc = documentAt(x, y, scale);
    if (doc) {
      const d = LAYER.shownOf(doc), first = d.blocks.find(isElement);
      if (!LAYER.atReadingScale(doc, scale) || !first) return { kind: 'document', addr: doc, pos: null, link: null };
      const pos = LAYER.posAt(doc, x, y);
      const b = (pos != null && elementIn(d.blocks, pos)) || first;
      return { kind: 'block', addr: doc, pos: b.pos, link: null };
    }
  }
  const acct = REC.board() ? accountAt(x, y, BOARD.addr) : null;
  return acct ? { kind: 'account', addr: acct, pos: null, link: null } : BOARD;
}

/**
 * The focus follows the camera (rule 3): after a camera move — the wheel,
 * the camera key's drag, a zoom chord, PageDown — re-take it at the scale's
 * grain, in the re-take's order (see the head), on the element under the
 * view's centre (`elementUnder`) save where one of its rules keeps the walk.
 * The kept caret's span, where it holds the walk, a line of it in the visible
 * view at a scale the person may edit it at, takes the walk back, at the
 * caret's position, whatever stands under the centre (`heldSpan`); the walk
 * standing there already, nothing moves. A continuation's mark under the
 * centre keeps the walk's own document where the mark holds it, a span or a
 * link in it taken to the document whole, else takes the mark's stop; never
 * the member under the centre, and no list opened. Where no document stands
 * under the centre nearer than far,
 * the walk's own document is kept while its region meets the visible view, a
 * span or a link in it taken to the document where it stands below its
 * reading scale; else the account or the board under the centre takes it. A
 * key's move puts the platform's focus on the element wherever the key was
 * pressed, the ring drawn (rule 10); a pointer's or the wheel's carries it
 * only where the mirror held it, the ring out, and says nothing until the
 * next keyboard act (rule 12). While a live caret stands in text the person
 * may edit at the camera's scale the focus is the caret, which no camera move
 * moves (D5 §4 rule 3): the walk stays at the caret's span (`liveCaret`). A
 * live caret whose text that scale does not read is left kept, its span
 * holding the walk, whether or not the walk moves (D5 M-2; `holdCaret`). No
 * move of the re-take's releases the hold.
 * @param {boolean} [byKey] a key made the camera move
 */
export async function retakeFromView(byKey = false) {
  if (liveCaret()) return;
  holdCaret();
  const held = heldSpan();
  if (held) {
    const n = held.node;
    if (!focus || focus.kind !== 'block' || focus.addr !== n.addr || focus.pos !== n.pos) await standOn(n.addr, held.pos, byKey, byKey, null, true);
    return;
  }
  const view = CAM.view(), at = elementUnder(view), lod = lodOf(view.scale).name;
  if (at.kind === 'mark') {
    const own = focus && inDocument(focus) && membersOf(at.addr).includes(documentOf(focus.addr) || focus.addr) ? focus : null;
    if (own) { if (own.kind !== 'document') await standOn(own.addr, null, byKey, byKey); }
    else if (!focus || focus.addr !== at.addr) await standOn(at.addr, null, byKey, byKey);
    return;
  }
  if (at.kind === 'block') { if (!focus || focus.addr !== at.addr || focus.pos !== at.pos) await standOn(at.addr, at.pos, byKey, byKey); return; }
  if (at.kind === 'document') { if (!focus || focus.addr !== at.addr || focus.kind !== 'document') await standOn(at.addr, null, byKey, byKey); return; }
  // the walk's own document, while it is in view: below its reading scale its spans are no stops, so it stands whole
  if (lod !== 'far' && lod !== 'far~mid' && focus && inDocument(focus) && LAYER.inView(focus.addr)) {
    if (focus.kind !== 'document' && !LAYER.atReadingScale(focus.addr)) await standOn(focus.addr, null, byKey, byKey);
    return;
  }
  if (!focus || focus.addr !== at.addr) await standOn(at.addr, null, byKey, byKey);
}

/**
 * A change of the page's class — its own death among them (FP-23, FP-29) —
 * told by M-PUMP once the model holds what the change left (its `onDrop`,
 * naming no address): the walk taken again where it stood, at once, from that
 * model — its levels and every item named from what the page holds now, so
 * the mirror quotes nothing only the class it left could read and lists no
 * document only that class could list — on the span holding the position it
 * stood at, or the link's end it stood on, where its document kept its text
 * (M-REC's `dropClass`), else on its document whole; then, once that
 * document is read at the new class, taken again there, on that span or that
 * end. A move made meanwhile overtakes it (the order of moves). Like a
 * camera-made re-take, it carries the platform's focus only where the mirror
 * held it, and each of its moves is the page's own (`restand`). A feed row
 * names what it dropped and leaves the walk where it stands.
 * @param {import('../model/pump.js').Dropped} x
 * @returns {Promise<void>}
 */
export async function dropped(x) {
  const f = focus;
  if (x.addrs || !f) return;
  const at = landed ?? f.pos, doc = inDocument(f) ? f.addr : null;
  const end = f.kind === 'link' && f.link ? { link: f.link.link.addr, key: f.link.key } : null;
  const kept = !!doc && f.kind !== 'document' && REC.has(doc) && REC.doc(doc).blocks.length > 0;
  await restand(f.addr, kept ? at : null, false, false, kept ? end : null, kept);
  if (!doc) return;
  const move = moves;
  await PUMP.loadWhole(doc);
  if (move === moves) await restand(doc, f.kind === 'document' ? null : at, false, false, end);
}

/** @returns {Node[]} the siblings in order, as the text shown stands now (the gate's a11y case) */
export function siblingsNow() { carry(); return siblings.slice(); }
