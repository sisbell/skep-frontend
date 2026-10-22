// T-LAYER — THE ONE RECONCILER (the structure record §3.2 "T-LAYER"; FP-12:
// one reconciler, two targets — the plane's text layer and the reading
// scene's panes; the scene BORROWS this mount). Layer 2. ENGINE-BOUND. State:
// VIEW — the mounted set with each record's layout scale, revision, what it
// was made from, the fold it was set in, its marks and whether it takes the
// pointer, the corners beside it, each document's fold and its lines as the
// platform set them, the passage being read while its document is set again,
// what each reading scene's pane's article was made from, whether a press
// stands on the layer, and the platform's selection as it stood over an
// article taken down — THE ONE OWNER (FP-10). Mount an article when a
// document crosses S1's mount threshold (em 6.5, BELOW the canvas's readable
// 8, so bars become text and no character positions disagree — S1 Q7), take
// it down when it leaves or falls below 5.5, and rebuild it where its run,
// its revision or its fold changed. THE CAP (S1's MAX_MOUNTED, 8): at most 8
// articles stand — the walk's focused document first, whatever its size (the
// focus record's D6: the place one stands on is readable, its corner the
// plane's next Tab stop, D5 K-57), then the rest by size, the largest first,
// and among equal sizes the articles standing, so no pan, reveal or delivery
// trades a standing article for its equal. An article standing, stale or not, keeps its claim
// down to 5.5, as it does against the threshold (`chosen`); a document past
// the cap keeps its bars. But WHILE A PRESS STANDS on the layer (`press`)
// nothing is rebuilt, nothing mounted and so nothing taken down for the cap:
// the platform's drag-selection is anchored in the article's own nodes,
// which a rebuild would take away, and a fresh mount of the document holding
// the selection would place its range over the drag; the first frame after
// the press does what was held. Laid out ONCE at P-LAY's LAY_FS (16 px)
// and its unitless LINE_H, so each element's line box is that element's own
// size's (P-LAY's `lineBox`), each column exactly P-LAY's MEASURE_CPL
// characters of its own face (`ch`, the style's `--measure`), and placed by
// transform from the same camera arithmetic (registration 0 px — S1).
// THE FOLD (issue #15's design decision; `foldOf`): every document is set at
// one line length and one line height in P-LAY's equal columns inside its
// room, BROKEN AT THE LINES AS RENDERED, after the reader's font and spacing
// settings apply: an article is laid out once in one column (`measureLines`),
// each row's element read for its top and its height — the lines P-LAY
// predicts standing where the element stands, and set as the element sets
// them where it sets them otherwise — and those lines broken into columns by
// P-LAY's keep rules; the mounted article is that one column parted into its
// fold's columns (`partInto`), a block a break falls in split at the point
// its line opens with, chrome included, each part keeping its block's keys and
// the tail naming the character it starts at (`data-char`), so every reader of
// a block here — the selection's mapping, the marks, the rects — reads it
// across its parts. Its size is the step P-LAY's fold takes for the plan
// carrying the most link chrome any reveal can set in it (LK's `utmost`) and
// for the lines as set now, the larger: no reveal moves its type size and
// nothing runs past its room. Every reader of a document's size above the
// model reads it here; the model's pump, which may not, reads P-LAY's
// estimate, never the smaller. Every size read here raises P-CAM's zoom-in
// bound to read it (`reach`, E18 (a)), so the camera never stops short of the
// reading scale of the text this module sets, however small its document is
// set. The canvas's bars below the mount are the same fold's lines, measured
// where the document's text has been set in view (a frame's budget, nearest
// the view's centre first), so mid scale greeks the columns the mount sets
// and no word moves at the hand-off; the loop runs `frame` before P-RENDER
// draws, so the canvas draws or yields each document by this frame's mounted
// set. WHEN A DOCUMENT IS SET AGAIN WHILE IT IS READ — its article rebuilt in
// another fold, or taken down for a feed row and mounted again — the passage
// at the visible view's centre keeps its place and its size on screen
// (`hold`; P-LAY's `holdOf`, P-CAM's `reanchor`). The paging key continues at
// the next column's top at reading scale (`pageTarget`). The marks and
// symbols are placed from LK's `shown` and
// `symbols`, a stretch several links mark in the one mark LK's `mergedMark`
// gives; a withheld run's owner and C-67's clause beneath it from what the
// model holds of its origin (`originOwner`, `clauseOf`), the article made
// again as the origin's edition claims arrive and go (M-REC's revision);
// the selection from O-SELECTION and the focus from N-WALK are
// handed to T-ARTICLE as values at mount, and each frame marks a standing
// article's blocks for them in place by T-ARTICLE's one rule (`blockMarks`):
// a change of the selection or the focus rebuilds no article, so the
// platform's selection stands as the person left it (foundations §2.1: "the
// SELECTION is the platform's own, transient"; D5 §2). THE LIT BLOCK IS THE
// FOCUS RING'S READING-SCALE FORM (the focus record's D3; D5 §4 rule 2): one
// mark, under the ring's one rule — lit while the plane holds the focus and
// a key moved it (N-FOCUS's `ringShown`), out after a pointer's landing as
// every control's ring is — the canvas circling no document whose text
// stands.
// THE CORNER (foundations §3.1; ux-T2; D5 K-57): each mounted document at
// reading scale (em 8, P-LOD's readable threshold, and above) carries its own
// BESIDE its article, never inside it, as an element of the corner layer this
// module keeps: on the document's one side, the left (the beams and the
// blocks' counts take the right), in the strip P-PROJ's `clearLeftOf` keeps
// free of every other document's box, at the interface's size, held to the
// top of the document's visible part below the one line — its first column's
// top, else just below the line — and never past its outline's bottom,
// placed by translate alone from the same camera arithmetic. The element
// outlives its article's remounts and its items are rewritten only where they
// change, so a focus on it survives them; the focused document's corner is
// the plane's next Tab stop, named by its own words, and every other is out
// of the order and hidden from assistive technology; while the reading scene
// stands over the plane the corner layer is inert (`cover`, through N-FOCUS,
// the focus's owner — FP-20), the scene's panes carrying their own (D5 §4
// rule 5); a corner that leaves while it holds the focus hands it to the
// walk (D5 §4 rule 4). The press
// rule's text half (§2.4): an article takes the pointer at reading scale
// alone — its em at P-LOD's readable threshold (8) and above, the `legible`
// class the style gives its columns' pointer (`markLegible`) — so below it a
// press on mounted text falls to the canvas as one on its bars does, and a
// press between its columns falls to the canvas at any scale, the document a
// place "bars or mounted text alike" and the press keyed "on legibility and
// never on whether text is mounted"; the class moves only while no press
// stands, so a drag begun on legible text keeps the article it is anchored in
// through a zoom below the threshold. A drag selects text and never pans, and
// this module holds whether a press stands (APP-INPUT reports its start and
// its end). THE SELECTION IS A BYTE
// SPAN (R11; foundations §3.1) and the platform's selection is its one mark
// (§2.1): this module carries the platform's range to the span it covers —
// each block's own text nodes walked, part by part, the chrome inside a block
// skipped, a character boundary carried to its byte position by T-SPAN
// through the blocks the article was made from, never the model's newest,
// which a delivery under a press may have replaced — and the span back to a
// range, which it places over the mounted article when the page makes the
// selection, its anchor at the span's start, and again after a remount (the
// reveal, a lens, a delivery), since a remount rebuilds the element and the
// platform's range dies with the old one: read as the old article is taken
// down, the selection goes back with its anchor at the end it stood at, so
// the platform's own keys (D5 K-71) go on extending it from there. What no
// interface carries is macOS's "no direction yet" of a selection a pointer
// made: put back, it extends from its anchor, as one a key extended does.
// The platform holds one selection, and no remount takes it from the person:
// a selection standing outside the layer — a drag in a reading scene's pane,
// over an overlay's text — is theirs, whenever they made it, and the page's
// goes back only where the platform's is collapsed, absent or in the layer,
// so the copy is of what the person chose (`placeAgain`).
// THE READING SCENE'S PANES BORROW THE MOUNT (`sceneArticle`; the structure
// record §3.4 (vii)): each pane's article is made here, T-ARTICLE's
// scene-mode variant laid out by the pane's own style — one column at the
// plane's measure — and what it was made from is kept beside it as a mounted
// article's is (`madeOf`) — its
// document's blocks and runs as the model held them, which the model
// replaces whole and never edits in place, so they stay the article's own
// while it stands, whatever the model has delivered since. Every position in
// an article is mapped through them (`rangeIn`): the scene finds a passage
// in a pane so. The copy of any selection in an article — a mounted one, or
// a pane's, where a drag selects as it does on the plane (§2.5) — carries
// the passage's board and address beside the plain text and never in it
// (§2.4), in a flavor only a skep client reads; the plain text is the
// document's own bytes over the span, as the article was made from them, no
// label of the page among them: a range that starts in an article's head
// starts at its first block.
// Carries: the wireframe's §16 `mount`/`unmount`/`place`/`S1.frame`; S1's
// `mount`, `place`, `S1.frame`; `driftSample` and `overlapCheck` become
// gate hooks (`web/gate/hooks.js` reads `mounted`).
// Rules: FP-1, FP-2, FP-8, FP-10, FP-12, FP-20.

import * as REC from '../model/records.js';
import * as LK from '../links/links.js';
import * as FOCUS from '../nav/focus.js';
import { cam, sx, sy, wx, wy, viewport, visibleView, markDirty, reach, reanchor } from '../plane/camera.js';
import { MOUNT_EM, UNMOUNT_EM, MAX_MOUNTED, LOD_TXT_LO } from '../plane/lod.js';
import { docBox, intersects, clearLeftOf } from '../plane/projection.js';
import { layoutOf, fold, estimate, slot, boundsOf, placeOf as placeIn, posAt as posIn, pageTarget as pageIn, holdOf, isSpace, MEASURE_CPL, LAY_FS, LINE_H } from '../plane/layout.js';
import { articleHTML, articlePlan, cornerHTML, blockMarks, editionClause } from './article.js';
import { homeOf } from '../model/address.js';
import { posOfChar, charOfPos, sameSpan, CHROME } from './span.js';
import { fingerprintCue } from '../util.js';
import { t } from '../strings.js';

/** @typedef {import('../model/records.js').Doc} Doc */
/** @typedef {import('../model/records.js').Block} Block */
/** @typedef {import('../model/frames.js').Run} Run */
/** @typedef {import('./article.js').ArticleView} ArticleView */
/** @typedef {import('./span.js').Span} Span */
/** @typedef {import('../plane/layout.js').Fold} Fold */
/** @typedef {import('../plane/layout.js').Line} Line */
/** @typedef {import('../plane/layout.js').Row} Row */
/** @typedef {{x: number, y: number, w: number, h: number}} Rect */

/**
 * @typedef {Object} Made — what an article was made from: its document, and the blocks and runs the model held of it as the article was made. The model replaces a document's blocks and runs whole and never edits them in place, so these stay the article's own while it stands, whatever the model has delivered since: every position in the article is mapped through them (`rangeIn`), and a copy takes its bytes from them (`onCopy`)
 * @property {string} addr the document
 * @property {Block[]} blocks
 * @property {Run[]} runs
 */

/**
 * @typedef {Object} Part — a block's element in a mounted article: the block whole, or the part of it one column holds
 * @property {HTMLElement} el
 * @property {Block} b
 */

/**
 * @typedef {Object} Mounted
 * @property {HTMLElement} el
 * @property {Doc} d
 * @property {number} lay the layout scale: layout px per world unit
 * @property {number} runFrom
 * @property {number} runTo
 * @property {number} rev the document's revision at mount
 * @property {Made} made what the article was made from
 * @property {number} grev the view revision at mount
 * @property {Fold} fold the fold it was set in: its size, its columns and the lines they hold
 * @property {number} fs the document's em in world units: its fold's
 * @property {string} corner the corner's items at mount (T-ARTICLE's `cornerHTML`); empty where it has none
 * @property {Array<{pos: number, char: number, top: number, left: number}>} [blockTops] each block's part's offset in the one 16 px layout, by its block and the character it starts at (the gate's span registration)
 * @property {Part[]} marked each block's parts with the block they show: the elements the selection's and the focus's marks stand on
 * @property {string} markedFor the selection and the focus its blocks are marked for (`marksKey`)
 * @property {boolean} legible it takes the pointer: its em stood at P-LOD's readable threshold or above at the last frame no press stood through (`markLegible`)
 */

/**
 * @typedef {Object} Corner — a document's corner on the plane: its element beside the article, kept across the article's remounts
 * @property {HTMLElement} el
 * @property {string} html the items it shows
 * @property {number} cap the widest it may stand (px): the strip beside the text column, gaps taken
 * @property {number} w its width as laid out (px)
 * @property {number} h its height as laid out (px)
 * @property {boolean} stale its items or its cap changed since it was measured
 * @property {boolean} mine it is the focused document's: the Tab stop
 */

/**
 * @typedef {Object} Folded — a document's fold as `foldOf` last set it
 * @property {string} key the revisions it was read at: the document's, its run's, the model's, the view's
 * @property {string} plan what it was folded from: the extent, the positions held, the plans as JSON, the lines measured
 * @property {Fold} fold
 * @property {boolean} set its lines are the platform's: the article as its plan stands now was set (`measureLines`)
 */

/**
 * @typedef {Object} Measured — a document's lines as the platform set them (`measureLines`)
 * @property {string} key the plan they were set from, as JSON: a plan sets one layout, whatever selection or focus marks it
 * @property {Line[]} lines
 * @property {number} n its serial: a fold made from other lines is made again
 */

/**
 * @typedef {Object} Unit — a row element of an article laid out in one column, and the lines it holds
 * @property {HTMLElement} el
 * @property {number} first its first line, an index into the lines
 * @property {number} n its count of lines
 * @property {number} top its top below the column's, in px
 */

/**
 * @typedef {Object} Hold — the passage at the visible view's centre as its document's article was taken down to be set again (see the head)
 * @property {string} addr
 * @property {Fold} fold the fold it stood in
 * @property {{x: number, y: number}} p where it stood, in world units relative to the room
 */

/**
 * @typedef {Object} Readers — what the layer reads of other owners' state, handed in once by the app (FP-10: through the owners' exports)
 * @property {() => (Span | null)} selection the selection (O-SELECTION's span)
 * @property {() => ({addr: string, pos: number} | null)} focus the focused block (N-WALK's)
 * @property {() => number} top the one line's bottom edge on screen (L-LINE's): the corners hold below it, and the visible view stands below it
 * @property {() => void} handOff the focus's next home where a corner that held it leaves: the walk's current item (D5 §4 rule 4)
 */

/** the corner's distance from the text column, and from the edge of the strip it stands in (px) */
const CORNER_GAP = 8;
/** the time a frame gives the setting of documents in view that stand unmounted, so their bars are their lines as set (ms) */
const MEASURE_BUDGET_MS = 6;
/** the em, in px, the canvas draws a document's bars from (P-RENDER's): below it no bar stands, and no line is set for one */
const BARS_EM = 3;

/** @type {Map<string, Mounted>} */
const mounted = new Map();
/** @type {WeakMap<HTMLElement, Made>} what each reading scene's pane's article was made from, by its element (`sceneArticle`), for as long as the element lives */
const panes = new WeakMap();
/** @type {Map<string, Corner>} the corners on the plane, by document */
const corners = new Map();
/** @type {Map<string, Folded>} each document's fold, by document — a cache of `foldOf`, a function of the model and of the lines set */
const folds = new Map();
/** @type {Map<string, Measured>} each document's lines as the platform set them, by document */
const measured = new Map();
let serial = 0;
/** @type {Array<{addr: string, ms: number, blocks: number, emPx: number, columns: number, measureMs: number, partMs: number}>} the mount costs (a forced layout inside the measurement — S1), the setting of its lines and the parting into columns among them */
const mountLog = [];
/** the mount log, for the gate's figures */
export const mounts = () => mountLog.slice();
/** @type {HTMLElement | null} */
let layer = null;
/** @type {HTMLElement | null} */
let cornerLayer = null;
/** does the platform set the articles here — their lines measured and parted into columns; else (the node tests) the lines P-LAY predicts, in one column */
let engine = false;
/** the view revision: the reveal and the lenses, which change the links an article draws — a bump remounts; the selection and the walk's focus never bump it, their blocks marked in place (`markBlocks`) */
let grev = 0;
/** does a press stand on the layer: the button went down on an article and the press has not ended */
let pressed = false;
/** @type {{span: Span, backward: boolean} | null} the platform's selection as it stood over an article as the article was taken down — its bytes, and whether it ran backward — until the frame puts the page's selection back (`placeAgain`): the end its anchor goes back at, where it covered the same bytes, and never whether it goes back */
let kept = null;
/** @type {Hold | null} */
let hold = null;
/** @type {Readers} */
let read = { selection: () => null, focus: () => null, top: () => 0, handOff: () => {} };

/**
 * @param {HTMLElement} el the text layer's element
 * @param {HTMLElement | null} cornersEl the corner layer's
 * @param {{measure?: boolean}} [opts] `measure` the platform sets the articles: their lines measured as rendered and parted into columns (the page; the node tests run without)
 */
export function attach(el, cornersEl, opts = {}) { layer = el; cornerLayer = cornersEl; engine = !!opts.measure; }
/**
 * The plane covered and uncovered (D5 §4 rule 5): while chrome stands over
 * the plane — the reading scene, whose panes carry their own corners — the
 * corner layer is `inert`, so neither Tab nor assistive technology reaches
 * the focused document's corner under it.
 * @param {boolean} on chrome covers the plane (true) or has left it (false)
 */
export function cover(on) { if (cornerLayer) FOCUS.cover(cornerLayer, on); }
/** the owners hand their readers in once */
export function readers(/** @type {Readers} */ r) { read = r; }
/** the block the `lit` mark stands on (D3): the walk's focused block while the ring is drawn — the plane holds the focus and a key moved it — else none; never in a scene's pane */
const litFocus = (scene = false) => (!scene && FOCUS.ringShown() ? read.focus() : null);
/** bump the view revision: every mounted article is rebuilt on the next frame */
export function bump() { grev++; }
export const revision = () => grev;
/**
 * The press rule's text half (§2.4): a press on an article stands from its
 * button going down to its end — the button's release, the platform's
 * cancel, a context menu — and while it stands `frame` rebuilds nothing,
 * mounts nothing and leaves each article taking the pointer or not as it
 * stood (`markLegible`), so the drag keeps the nodes it is anchored in (R11's
 * one continuous gesture). APP-INPUT reports both. A press's end marks the
 * frame dirty, so the next frame does what was held; ending none changes
 * nothing.
 * @param {boolean} on the press starts (true) or ends (false)
 */
export function press(on) { if (pressed && !on) markDirty(); pressed = on; }
/** does a press stand on the layer? */
export const pressing = () => pressed;
/** the mounted set, read-only */
export const mountedSet = () => mounted;
/** @param {string} addr */
export const isMounted = (addr) => mounted.has(addr);

/** the article's view state, from the owners' readers and LK */
export function viewFor(/** @type {Doc} */ d, scene = false) {
  const s = REC.session();
  const h = REC.health();
  const device = REC.device();
  const ownerRow = REC.ownerOf(d.account || '');
  const isOwnerYou = !!(s && s.account && d.account === s.account);
  /** @type {Map<string, 'edition' | 'draft' | 'unknown'>} */
  const originKinds = new Map();
  for (const o of d.origins) { const od = REC.doc(o.doc); const p = REC.place(o.doc); originKinds.set(o.doc, p ? p.kind : od.meta ? (od.meta.published ? 'edition' : 'draft') : od.kind); }
  /** @type {ArticleView} */
  const v = {
    selected: read.selection(), focus: litFocus(scene),
    marks: LK.shown(d.addr), mergedMark: LK.mergedMark, symbols: LK.symbols(d.addr), floats: LK.floats, countAt: (b) => LK.countAt(d.addr, b),
    wholeLinks: LK.wholeLinks(d.addr).length,
    reader: REC.reader(),
    localTrust: !!(h && h.auth && h.auth.local_trust),
    notebook: true,
    scene, originKinds,
    originOwner, clauseOf,
    deviceLabel: isOwnerYou && device ? device.label : null,
    ownerFingerprint: isOwnerYou && device ? device.fingerprint : null,
  };
  void ownerRow; void fingerprintCue;
  return v;
}

// ---- the fold ---------------------------------------------------------------------------------------------------

/**
 * The fold a document is set in on the plane (see the head): P-LAY's fold of
 * its article's lines — as the platform set them where they have been set
 * (`measureLines`), else as P-LAY predicts them — at the step that holds both
 * those lines and the plan carrying the most link chrome any reveal can set
 * in it (LK's `utmost`), the positions it does not hold estimated — those
 * between its held blocks in columns of their own, those after them after its
 * last line; P-LAY's estimate where its text has not arrived, its first
 * column slot where its extent is unread. Folded again only where the plans,
 * the extent, the positions held or the lines set changed, however often the
 * model moves. Every size it answers is one the camera's zoom-in bound
 * reaches (P-CAM's `reach`, E18 (a)) before any reader places a view on it —
 * a landing, the mount, the pointer's legibility — so no document is set
 * smaller than the camera can read it. The rise draws nothing: the camera's
 * clamp alone reads the bound.
 * @param {Doc} d
 * @returns {Fold}
 */
export function foldOf(d) {
  const f = folded(d);
  reach(f.fs);
  return f;
}

/**
 * The fold `foldOf` answers (see there).
 * @param {Doc} d
 * @returns {Fold}
 */
function folded(d) {
  const room = docBox(d.addr);
  if (d.from < 0) {
    const key = d.extent != null ? `est:${d.extent}` : 'slot';
    const f = folds.get(d.addr);
    if (f && f.key === key) return f.fold;
    const out = d.extent != null ? estimate(d.extent, room) : slot(room);
    folds.set(d.addr, { key, plan: key, fold: out, set: false });
    return out;
  }
  const key = `${d.rev}:${d.from}:${d.to}:${REC.rev()}:${grev}`;
  const f = folds.get(d.addr);
  if (f && f.key === key) return f.fold;
  const v = viewFor(d), owner = ownerAccount(d);
  const now = articlePlan(d, v, owner), nowKey = JSON.stringify(now);
  const m = measured.get(d.addr), set = m && m.key === nowKey ? m : null;
  const u = LK.utmost(d.addr);
  const rows = articlePlan(d, { ...v, marks: u.shown, symbols: u.shown, countAt: u.countAt }, owner);
  const after = Math.max(0, (d.extent || 0) + 1 - d.to);
  const plan = `${d.extent}|${d.from}|${d.to}|${JSON.stringify(rows)}|${nowKey}|${set ? set.n : 0}`;
  if (f && f.plan === plan) { folds.set(d.addr, { key, plan, fold: f.fold, set: !!set }); return f.fold; }
  const opts = { after, heldTo: d.to };
  const most = fold(gapped(d, layoutOf(rows).lines), room, opts);
  const out = fold(gapped(d, set ? set.lines : layoutOf(now).lines), room, { ...opts, step: most.step });
  folds.set(d.addr, { key, plan, fold: out, set: !!set });
  return out;
}

/**
 * The lines of an article with each block that follows positions the
 * document does not hold marked so (P-LAY's `Line.gap`): its first line breaks
 * a column, and those positions are estimated in columns of their own.
 * @param {Doc} d
 * @param {Line[]} lines
 * @returns {Line[]}
 */
function gapped(d, lines) {
  /** @type {Map<number, number>} the positions before each block the document does not hold, by the block's first position */
  const gaps = new Map();
  let end = 1;
  for (const b of d.blocks) { if (b.pos > end) gaps.set(b.pos, b.pos - end); end = Math.max(end, b.pos + b.width); }
  if (!gaps.size) return lines;
  return lines.map((l) => (l.pos != null && l.nth === 0 && gaps.has(l.pos) ? { ...l, gap: gaps.get(l.pos) } : l));
}

/** what an article made from a document now is made from: the document's blocks and runs as the model holds them */
const madeFrom = (/** @type {Doc} */ d) => ({ addr: d.addr, blocks: d.blocks, runs: d.runs });

/** a document's outline's bounds, in world units (where the plane draws it): its fold's padded columns' */
export function shapeOf(/** @type {string} */ addr) {
  const box = docBox(addr), b = boundsOf(foldOf(REC.doc(addr)));
  return { x: box.x + b.x, y: box.y + b.y, w: b.w, h: b.h };
}

/** a document's outline's bounds, in world units (`shapeOf`) */
const shapeIn = (/** @type {Doc} */ d) => shapeOf(d.addr);
/** the outline's bounds of a fold of a document's, in world units */
const shapeAt = (/** @type {string} */ addr, /** @type {Fold} */ f) => { const box = docBox(addr), b = boundsOf(f); return { x: box.x + b.x, y: box.y + b.y, w: b.w, h: b.h }; };

/**
 * Where a reading view of a document centres, in world units: the line
 * holding the position, centred across its column (P-LAY's `placeOf`); the
 * first column's centre where no position is named — N-GO's landing and
 * N-WALK's flight to a span.
 * @param {string} addr
 * @param {number | null} pos
 * @returns {{x: number, y: number}}
 */
export function centreOf(addr, pos) {
  const f = foldOf(REC.doc(addr)), box = docBox(addr);
  if (pos == null) { const c = f.columns[0]; return { x: box.x + c.x + c.w / 2, y: box.y + c.y + c.h / 2 }; }
  const p = placeIn(f, pos);
  return { x: box.x + p.x + p.w / 2, y: box.y + p.y + p.h / 2 };
}

/**
 * The position under a world point of a document's fold (P-LAY's `posAt`):
 * N-WALK's re-take at reading scale; null where the column under it holds
 * no line naming one.
 * @param {string} addr
 * @param {number} x
 * @param {number} y
 */
export function posAt(addr, x, y) { const box = docBox(addr); return posIn(foldOf(REC.doc(addr)), x - box.x, y - box.y); }

/** does a world rect hold a point? */
const holds = (/** @type {Rect} */ r, /** @type {{x: number, y: number}} */ p) => p.x >= r.x && p.x <= r.x + r.w && p.y >= r.y && p.y <= r.y + r.h;

/** the visible view's centre, in world units: the viewport's below the one line */
function viewCentre() { const s = visibleView(read.top()); return { x: wx(s.x + s.w / 2), y: wy(s.y + s.h / 2) }; }

/**
 * The document whose outline holds a world point: a mounted one first, else
 * one whose text the model holds; null where none does.
 * @param {{x: number, y: number}} p
 * @returns {Doc | null}
 */
function docAt(p) {
  for (const rec of mounted.values()) if (holds(shapeAt(rec.d.addr, rec.fold), p)) return rec.d;
  for (const d of REC.docs()) if (d.from >= 0 && !d.system && holds(docBox(d.addr), p) && holds(shapeIn(d), p)) return d;
  return null;
}

/**
 * Where the paging key continues at reading scale (issue #15; P-LAY's
 * `pageTarget`): the document under the visible view's centre at its readable
 * em or above, the view over a column whose foot it shows (PageDown) or whose
 * top it shows (PageUp) — the view that brings the next column's top, or the
 * previous one's, half a gutter below the one line, centred across it, at
 * the scale it stands at; null where the paging pages as it does elsewhere.
 * @param {1 | -1} dir 1 PageDown, -1 PageUp
 * @returns {{x: number, y: number, scale: number} | null}
 */
export function pageTarget(dir) {
  const { VH } = viewport();
  const seen = visibleView(read.top());
  const d = docAt(viewCentre());
  if (!d) return null;
  const f = foldOf(d), box = docBox(d.addr);
  if (f.fs * cam.scale < LOD_TXT_LO) return null;
  const to = pageIn(f, { x0: wx(seen.x) - box.x, y0: wy(seen.y) - box.y, x1: wx(seen.x + seen.w) - box.x, y1: wy(seen.y + seen.h) - box.y }, dir);
  if (!to) return null;
  return { x: box.x + to.x, y: box.y + to.top + (VH / 2 - seen.y) / cam.scale, scale: cam.scale };
}

// ---- setting an article -----------------------------------------------------------------------------------------

/** the article's element and the one column its flow is first laid out in, its HTML in it */
function articleEl(/** @type {Doc} */ d, /** @type {string} */ html) {
  const el = document.createElement('article');
  el.className = 'dtext';
  el.dataset.addr = d.addr;
  el.style.fontSize = LAY_FS + 'px';
  el.style.lineHeight = String(LINE_H);
  el.setAttribute('aria-hidden', 'true'); // the ARIA mirror is the one accessible rendering (S1 Q7)
  const col = document.createElement('div');
  col.className = 'col';
  col.innerHTML = html;
  el.appendChild(col);
  return { el, col };
}

/** the paragraph elements a column breaks inside, as P-LAY's 'lines' keep does: no heading, no empty document's line */
const PARAGRAPH = 'p.sp:not(.empty)';
/** a text block's elements: the paragraphs, the headings, the empty document's line */
const TEXT_BLOCK = 'p.sp, h2.sp, h3.sp, h4.sp, h5.sp, h6.sp';

/**
 * An article's lines as the platform set them in one column (see the head):
 * each row's element — the head, each block, each scene-offer — read for its
 * top and its height, and the lines the plan sets in it (P-LAY's `layoutOf`)
 * standing where the element stands; where a text block's element is set
 * taller or shorter than its lines, the lines it sets — as many as its height
 * holds at its own pitch, a float's own line below them, full but the last,
 * their positions spread over the block — and where a block of another kind
 * is set taller, the room left a line of no ink, shorter, the lines that fit.
 * Every line keeps where a column may break before it, a paragraph broken two
 * lines in from either end and no heading broken.
 * @param {HTMLElement} col the column, laid out
 * @param {Row[]} rows the plan its article was made from
 * @param {Block[]} blocks the blocks it was made from
 * @returns {{lines: Line[], units: Unit[]}}
 */
function measureLines(col, rows, blocks) {
  const P = layoutOf(rows).lines;
  const top0 = col.getBoundingClientRect().top;
  /** @type {Array<{el: HTMLElement, lines: Line[]}>} each row element and the lines the plan sets in it */
  const groups = [];
  let i = 0;
  const hd = /** @type {HTMLElement | null} */ (col.querySelector(':scope > .hd'));
  if (hd) { const g = []; while (i < P.length && P[i].kind === 'head') g.push(P[i++]); groups.push({ el: hd, lines: g }); }
  const run = col.querySelector(':scope > .run');
  for (const child of run ? [...run.children] : []) {
    const el = /** @type {HTMLElement} */ (child), g = [];
    if (el.classList.contains('offer')) { if (i < P.length && P[i].kind === 'chrome') g.push(P[i++]); while (i < P.length && P[i].kind === 'chrome' && P[i].nth > 0) g.push(P[i++]); }
    else { const pos = Number(el.dataset.pos); while (i < P.length && P[i].pos === pos && P[i].kind !== 'chrome' && P[i].kind !== 'head') g.push(P[i++]); }
    groups.push({ el, lines: g });
  }
  if (i < P.length && groups.length) groups[groups.length - 1].lines.push(...P.slice(i));
  /** @type {Line[]} */
  const out = [];
  /** @type {Unit[]} */
  const units = [];
  const half = 0.5 / LAY_FS;
  for (const g of groups) {
    const r = g.el.getBoundingClientRect(), top = (r.top - top0) / LAY_FS, h = r.height / LAY_FS, first = out.length;
    const L = g.lines;
    if (L.length) {
      const p0 = L[0].top, last = L[L.length - 1], ph = last.top + last.h - p0;
      const text = g.el.matches(TEXT_BLOCK);
      if (!text || Math.abs(h - ph) <= half) {
        // the plan's lines, standing at the element's top — those that fit it; a unit set taller keeps the room left as a line of no ink
        for (const l of L) if (l === L[0] || l.top - p0 + l.h <= h + half) out.push({ ...l, top: top + (l.top - p0) });
        const end = out[out.length - 1], deep = end.top + end.h - top;
        if (h - deep > half) out.push({ ...end, top: top + deep, h: h - deep, w: 0, nth: end.nth + 1, brk: false });
      } else {
        // the lines the element sets: as many as its height holds at its own pitch, a float's own line below them
        const pitch = parseFloat(getComputedStyle(g.el).lineHeight) / LAY_FS || L[0].h;
        const m = Math.max(1, Math.floor(h / pitch + 1e-3)), extra = h - m * pitch;
        const inner = g.el.matches(PARAGRAPH), b = blocks.find((x) => x.pos === L[0].pos);
        const a0 = L[0].at, a1 = b ? b.pos + b.width : null;
        for (let k = 0; k < m; k++) {
          const at = m === L.length ? L[k].at : a0 != null && a1 != null ? a0 + Math.floor((k * (a1 - a0)) / m) : a0;
          const brk = k === 0 ? L[0].brk : inner && k >= 2 && m - k >= 2 && (k >= L.length || L[k].brk || L.length < m);
          out.push({ ...L[0], top: top + k * pitch, h: pitch, w: k < m - 1 ? MEASURE_CPL : last.w || MEASURE_CPL, nth: k, brk, at });
        }
        if (extra > half) out.push({ ...L[0], top: top + m * pitch, h: extra, w: 0, nth: m, brk: false, at: a0 });
      }
    }
    units.push({ el: g.el, first, n: out.length - first, top: r.top - top0 });
  }
  return { lines: out, units };
}

/** is a character a collapsible space (P-LAY's `isSpace`), which opens no line */
const spaceAt = (/** @type {string} */ s, /** @type {number} */ i) => isSpace(/** @type {number} */ (s.codePointAt(i)));

/**
 * The point a line of a block opens at: the first character inside the
 * block's element, chrome included and spaces apart, whose box's middle lies
 * below `y` — a line opened by a symbol, a hairline's label or C-33's mark
 * opening before that chrome; null where no character lies below it.
 * @param {HTMLElement} el the block's element
 * @param {number} y the line's top, in client px
 * @returns {{node: Node, offset: number} | null}
 */
function lineStart(el, y) {
  /** @type {Array<{node: Text, offset: number, len: number}>} */
  const atoms = [];
  const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  for (let n = w.nextNode(); n; n = w.nextNode()) {
    const s = /** @type {Text} */ (n).data;
    for (let i = 0; i < s.length;) { const len = /** @type {number} */ (s.codePointAt(i)) > 0xffff ? 2 : 1; if (!spaceAt(s, i)) atoms.push({ node: /** @type {Text} */ (n), offset: i, len }); i += len; }
  }
  const r = document.createRange();
  const mid = (/** @type {{node: Text, offset: number, len: number}} */ a) => { r.setStart(a.node, a.offset); r.setEnd(a.node, a.offset + a.len); const q = r.getBoundingClientRect(); return q.top + q.height / 2; };
  let lo = 0, hi = atoms.length;
  while (lo < hi) { const m = (lo + hi) >> 1; if (mid(atoms[m]) > y) hi = m; else lo = m + 1; }
  if (lo >= atoms.length) return null;
  const a = atoms[lo];
  const chrome = a.node.parentElement ? /** @type {HTMLElement | null} */ (a.node.parentElement.closest('.sym, .hairline, .pubmark')) : null;
  if (chrome && el.contains(chrome) && chrome !== el && a.offset === 0 && document.createTreeWalker(chrome, NodeFilter.SHOW_TEXT).nextNode() === a.node && chrome.parentNode) {
    return { node: chrome.parentNode, offset: [...chrome.parentNode.childNodes].indexOf(chrome) };
  }
  return { node: a.node, offset: a.offset };
}

/** the elements strictly inside `el` that hold a point, outermost first */
function pathTo(/** @type {Node} */ node, /** @type {HTMLElement} */ el) {
  /** @type {HTMLElement[]} */
  const out = [];
  for (let p = node.nodeType === Node.ELEMENT_NODE ? /** @type {HTMLElement} */ (node) : node.parentElement; p && p !== el; p = p.parentElement) out.unshift(p);
  return out;
}

/** the count of a block part's own characters: its text nodes', the chrome apart */
const ownLength = (/** @type {HTMLElement} */ el) => textNodes(el).reduce((n, tn) => n + tn.length, 0);

/**
 * Part an article's one column into its fold's columns (see the head): from
 * the last column back to the second, each column's flow taken out of the
 * first — from the element its first line opens, or from the point its first
 * line opens at inside a block it shares with the column before — into a
 * column of its own, placed after the first so the columns stand in reading
 * order; where a block is split, the element on either side of the point
 * left as it was but for what the split takes from it — an element left with
 * nothing in it removed, and a run's opening (its boundary, its hairline) kept
 * on the side that holds it — and the tail naming the character it starts at;
 * each column placed at its slot. A column whose first line opens at no
 * point found stays in the column before it.
 * @param {HTMLElement} col the article's one column, laid out
 * @param {Fold} f
 * @param {Unit[]} units
 * @param {number} lay layout px per world unit
 */
function partInto(col, f, units, lay) {
  const run = col.querySelector(':scope > .run');
  const top0 = col.getBoundingClientRect().top;
  const unitOf = (/** @type {number} */ i) => units.find((u) => i >= u.first && i < u.first + u.n) || null;
  const at = (/** @type {HTMLElement} */ box, /** @type {import('../plane/layout.js').Column} */ c) => { box.style.left = c.x * lay + 'px'; box.style.top = c.y * lay + 'px'; };
  for (let ci = f.columns.length - 1; ci >= 1; ci--) {
    const c = f.columns[ci];
    if (c.estimated || !c.n || !run) continue;
    const u = unitOf(c.first);
    if (!u || !run.contains(u.el)) continue;
    const range = document.createRange();
    /** @type {HTMLElement[]} */
    let path = [];
    let split = false;
    if (c.first === u.first) range.setStartBefore(u.el);
    else {
      const y = top0 + u.top + (f.lines[c.first].top - f.lines[u.first].top) * LAY_FS;
      const p = lineStart(u.el, y);
      if (!p) continue;
      range.setStart(p.node, p.offset);
      path = pathTo(p.node, u.el);
      split = true;
    }
    range.setEnd(run, run.childNodes.length);
    const frag = range.extractContents();
    if (split && frag.firstChild && frag.firstChild.nodeType === Node.ELEMENT_NODE) {
      const tail = /** @type {HTMLElement} */ (frag.firstChild);
      /** @type {Node | null} */
      let clone = tail;
      for (const orig of path) {
        clone = clone ? clone.firstChild : null;
        if (!orig.textContent) orig.remove();
        else if (clone && clone.nodeType === Node.ELEMENT_NODE && /** @type {HTMLElement} */ (clone).classList.contains('opens')) /** @type {HTMLElement} */ (clone).classList.remove('opens');
      }
      tail.dataset.char = String(Number(u.el.dataset.char || 0) + ownLength(u.el));
    }
    const box = document.createElement('div'); box.className = 'col';
    const r = document.createElement('div'); r.className = 'run';
    r.appendChild(frag); box.appendChild(r); at(box, c);
    col.after(box);
  }
  at(col, f.columns[0]);
}

/**
 * Mount a document's article over its room — laid out once at LAY_FS in one
 * column, its lines set (`measureLines`), then parted into its fold's columns
 * (`partInto`), the article as large as the room so it stands on it.
 * @param {Doc} d
 * @returns {Mounted | null}
 */
function mount(d) {
  if (!layer || mounted.has(d.addr) || d.from < 0) return null;
  const t0 = performance.now();
  const made = madeFrom(d);
  const v = viewFor(d), owner = ownerAccount(d);
  const { el, col } = articleEl(d, articleHTML(d, v, owner));
  layer.appendChild(el);
  let measureMs = 0, partMs = 0;
  /** @type {Unit[]} */
  let units = [];
  if (engine) {
    const t1 = performance.now();
    const rows = articlePlan(d, v, owner);
    const set = measureLines(col, rows, made.blocks);
    units = set.units;
    measured.set(d.addr, { key: JSON.stringify(rows), lines: set.lines, n: ++serial });
    folds.delete(d.addr);
    measureMs = performance.now() - t1;
  }
  const f = foldOf(d);
  const lay = LAY_FS / f.fs, box = docBox(d.addr);
  el.style.width = box.w * lay + 'px';
  el.style.height = box.h * lay + 'px';
  if (engine) { const t2 = performance.now(); partInto(col, f, units, lay); partMs = performance.now() - t2; }
  else { col.style.left = f.columns[0].x * lay + 'px'; col.style.top = f.columns[0].y * lay + 'px'; }
  const art = el.getBoundingClientRect(); // force layout: the cost must be real (S1); the article stands untransformed until placed
  const sps = /** @type {HTMLElement[]} */ ([...el.querySelectorAll('.run > .sp')]);
  // each block's part's place in the one layout (16 px), fractional (offsetTop rounds): the gate holds every later frame to it, scaled — a reflow would move a line
  const blockTops = sps.map((e) => { const r = e.getBoundingClientRect(); return { pos: Number(e.dataset.pos), char: Number(e.dataset.char || 0), top: r.top - art.top, left: r.left - art.left }; });
  const byPos = new Map(made.blocks.map((b) => [b.pos, b]));
  const marked = sps.flatMap((e) => { const b = byPos.get(Number(e.dataset.pos)); return b ? [{ el: e, b }] : []; });
  /** @type {Mounted} */
  const rec = { el, d, lay, runFrom: d.from, runTo: d.to, rev: d.rev, made, grev, fold: f, fs: f.fs, corner: cornerHTML(d, v), blockTops, marked, markedFor: marksKey(d.addr, v.selected, v.focus), legible: false };
  mounted.set(d.addr, rec);
  place(rec);
  mountLog.push({ addr: d.addr, ms: performance.now() - t0, blocks: made.blocks.length, emPx: f.fs * cam.scale, columns: f.columns.length, measureMs, partMs });
  if (mountLog.length > 500) mountLog.shift();
  return rec;
}

/**
 * Set a document's lines as the platform sets them, its article laid out once
 * in one column out of sight and taken down (`measureLines`), so its fold —
 * and the bars the canvas draws for it — are its lines as rendered before it
 * mounts.
 * @param {Doc} d
 */
function measureAside(d) {
  if (!layer) return;
  const v = viewFor(d), owner = ownerAccount(d), rows = articlePlan(d, v, owner);
  const { el, col } = articleEl(d, articleHTML(d, v, owner));
  el.style.visibility = 'hidden';
  layer.appendChild(el);
  try { measured.set(d.addr, { key: JSON.stringify(rows), lines: measureLines(col, rows, d.blocks).lines, n: ++serial }); folds.delete(d.addr); }
  finally { el.remove(); }
}

/**
 * The owner account of a document: by `effective_owner` where read, else by
 * its metadata where read, else its account. The one rule an owner is named
 * by — an article's byline, each withheld run's origin's (`originOwner`), a
 * withheld document's box (`withheldBox`) — so none of them part.
 */
export function ownerAccount(/** @type {Doc} */ d) {
  const row = d.account ? REC.ownerOf(d.account) : undefined;
  return (row && row.prefix) || (d.meta && d.meta.owner) || d.account || '';
}

/**
 * The owner account of an origin document, by the one owner rule
 * (`ownerAccount`): the owner a withheld run's placeholder names
 * (T-ARTICLE's `placeholderOf`) — on the plane, in a pane, and in the ARIA
 * mirror's item at the run.
 * @param {string} addr the origin document
 */
export function originOwner(addr) { return ownerAccount(REC.doc(addr)); }

/**
 * C-67's clause beneath a withheld run of an origin (PUB-5.124), by
 * T-ARTICLE's one rule (`editionClause`) over what the model holds of the
 * origin's edition claims: the active view's lookup (M-REC's
 * `editionClaimsOf`), each listed claim's link as read, and its home's
 * publication state and owner — the owner by the one owner rule
 * (`ownerAccount`), as the origin's (`originOwner`), so the pointer follows
 * the claim whose home the origin's owner owns first. The plane's
 * placeholder, a pane's, the ARIA mirror's item at the run and the run's face
 * whole all read it (T-ARTICLE's `placeholderOf`), so none of them part
 * (R94).
 * @param {string} origin
 * @returns {import('./article.js').Clause | null}
 */
export function clauseOf(origin) {
  const listed = REC.editionClaimsOf(origin);
  const claims = Array.isArray(listed) ? listed.map((claim) => {
    const home = homeOf(claim) || claim, h = REC.has(home) ? REC.doc(home) : null;
    return { claim, link: REC.link(claim) || null, home, published: h && h.meta ? h.meta.published : h && h.refused ? false : null, claimant: h ? ownerAccount(h) : '' };
  }) : null;
  return editionClause(origin, originOwner(origin), claims);
}

/**
 * A document a read answered `withheld`, as the plane names it — B1-S2's
 * withheld box: existence and owner, never bytes — its owner by the one
 * owner rule (`ownerAccount`). The box's first line (P-RENDER), the ARIA
 * mirror's item at the document (N-WALK) and the face a refused read of it
 * conjures (O-FACES's `withheld`) all read it, so what a sighted reader sees
 * and what a screen reader hears never part (R94).
 * @param {Doc} d
 */
export function withheldBox(d) { return t('B1.withheld-box', { owner: ownerAccount(d) }); }

/** take a mounted article down; where the platform's selection stands in it, it is kept (`kept`) for the frame that puts it back */
function unmount(/** @type {string} */ addr) {
  const rec = mounted.get(addr); if (!rec) return;
  const held = heldIn(rec);
  if (held) kept = held;
  rec.el.remove(); mounted.delete(addr);
}

/**
 * The platform's selection where it stands in a mounted article: the span it
 * covers and whether it runs backward, its focus point before its anchor;
 * null where none stands in the article.
 * @param {Mounted} rec
 * @returns {{span: Span, backward: boolean} | null}
 */
function heldIn(rec) {
  const s = window.getSelection();
  if (!s || s.rangeCount === 0 || s.isCollapsed || !s.anchorNode || !s.focusNode) return null;
  const range = s.getRangeAt(0);
  if (!rec.el.contains(range.commonAncestorContainer)) return null;
  const span = spanOfRange(range);
  if (!span) return null;
  const anchor = document.createRange(); anchor.setStart(s.anchorNode, s.anchorOffset);
  return { span, backward: anchor.comparePoint(s.focusNode, s.focusOffset) < 0 };
}

/** what a mounted article's blocks are marked for: the selection and the walk's focus where they stand in its document */
const marksKey = (/** @type {string} */ addr, /** @type {Span | null} */ s, /** @type {{addr: string, pos: number} | null} */ f) =>
  `${s && s.addr === addr ? `${s.pos}+${s.width}` : ''}|${f && f.addr === addr ? f.pos : ''}`;

/**
 * Mark a standing article's blocks for the selection and the walk's focus by
 * T-ARTICLE's rule (`blockMarks`) where either changed in its document since
 * they were last marked: a class set or taken off where it differs, on each
 * part of a block, nothing rebuilt, so the platform's selection in the
 * article stands.
 * @param {Mounted} rec
 * @param {Span | null} selected
 * @param {{addr: string, pos: number} | null} focus
 */
function markBlocks(rec, selected, focus) {
  const key = marksKey(rec.d.addr, selected, focus);
  if (key === rec.markedFor) return;
  rec.markedFor = key;
  for (const { el, b } of rec.marked) {
    const m = blockMarks(rec.d.addr, b, selected, focus);
    el.classList.toggle('sel', m.sel);
    el.classList.toggle('lit', m.lit);
  }
}

/**
 * Give a standing article the pointer at reading scale alone (foundations
 * §2.4): the `legible` class, which the style alone reads — its columns take
 * the pointer, the room between them never — set where its em stands at
 * P-LOD's readable threshold or above and taken off below it, touched only
 * where that changes. An article without it lets a press through to the
 * canvas, which takes it as it takes one on the bars the article replaced: a
 * click is the place's, a drag selects nothing.
 * @param {Mounted} rec
 */
function markLegible(rec) {
  const on = rec.fs * cam.scale >= LOD_TXT_LO;
  if (on === rec.legible) return;
  rec.legible = on;
  rec.el.classList.toggle('legible', on);
}

/** position a mounted article over its room — transform only, never reflow */
function place(/** @type {Mounted} */ rec) {
  const box = docBox(rec.d.addr);
  const s = cam.scale / rec.lay;
  rec.el.style.transform = `translate(${sx(box.x)}px, ${sy(box.y)}px) scale(${s})`;
}

/**
 * Has a mounted article gone stale: its document's run, its revision, the
 * view revision or its fold moved since it was mounted?
 * @param {Mounted} rec
 */
const wentStale = (rec) => rec.d.from !== rec.runFrom || rec.d.to !== rec.runTo || rec.rev !== rec.d.rev || rec.grev !== grev || rec.fold !== foldOf(rec.d);

/**
 * The documents whose articles stand this frame — THE CAP (S1's
 * MAX_MOUNTED): the walk's focused document first, then the largest em
 * first. Of the documents in view whose text has arrived, the system's apart
 * and a residue document only where it is the walk's focused one: a document
 * holding an article now, stale or not, at em 5.5 and above, any other at
 * 6.5 and above (S1's hysteresis). The focused document always holds one of
 * the places, whatever its size (D6: the ring "at the place" presumes a
 * place one can read; its corner is the plane's next Tab stop, D5 K-57), so
 * the eighth-largest may drop to bars as the focus moves; among equal sizes
 * the articles standing rank first, then the model's order, so a pan, a
 * reveal or a delivery trades no standing article for its equal.
 * @param {{x0: number, y0: number, x1: number, y1: number}} v the world the frame mounts in: the view, padded
 * @param {(addr: string) => boolean} focused whether a document is the walk's focused one
 * @returns {Doc[]} at most MAX_MOUNTED, in the order they rank
 */
function chosen(v, focused) {
  /** @type {Array<{d: Doc, em: number, rank: number}>} rank 0 the focused document, 1 a document holding an article, 2 any other */
  const want = [];
  for (const d of REC.docs()) {
    if (d.from < 0 || d.system) continue;
    const box = docBox(d.addr);
    if (!intersects(box, v) || !intersects(shapeIn(d), v)) continue;
    const mine = focused(d.addr);
    if (box.residue && !mine) continue;
    const standing = mounted.has(d.addr);
    const em = foldOf(d).fs * cam.scale;
    if (em >= (standing ? UNMOUNT_EM : MOUNT_EM)) want.push({ d, em, rank: mine ? 0 : standing ? 1 : 2 });
  }
  // the sort is stable: the focused document first, then by size, then the standing articles; equal in all, the model's order stands
  want.sort((a, b) => Number(b.rank === 0) - Number(a.rank === 0) || b.em - a.em || a.rank - b.rank);
  return want.slice(0, MAX_MOUNTED).map((w) => w.d);
}

/**
 * The passage being read: the mounted article at its readable em or above
 * whose outline holds the visible view's centre, and where in its room that
 * centre stands; null where none does.
 * @returns {Hold | null}
 */
function readingNow() {
  const c = viewCentre();
  for (const rec of mounted.values()) {
    if (rec.fs * cam.scale < LOD_TXT_LO || !holds(shapeAt(rec.d.addr, rec.fold), c)) continue;
    const box = docBox(rec.d.addr);
    return { addr: rec.d.addr, fold: rec.fold, p: { x: c.x - box.x, y: c.y - box.y } };
  }
  return null;
}

/**
 * The passage held as its document's article was taken down, set again: the
 * camera re-anchored so it keeps its place and its size on screen (P-LAY's
 * `holdOf`, P-CAM's `reanchor`), a flight bound into the document with it.
 * @param {Hold} h
 * @param {Mounted} rec the article standing again
 */
function keepPlace(h, rec) {
  const at = holdOf(h.fold, rec.fold, h.p);
  if (!at) return;
  const box = docBox(rec.d.addr);
  const a = { x: box.x + h.p.x, y: box.y + h.p.y }, b = { x: box.x + at.to.x, y: box.y + at.to.y };
  if (Math.abs(a.x - b.x) < 1e-9 && Math.abs(a.y - b.y) < 1e-9 && Math.abs(at.k - 1) < 1e-12) return;
  reanchor(a, b, at.k, box);
  markDirty();
}

/**
 * The per-frame policy, run before the canvas draws (so P-RENDER yields to
 * exactly the articles mounted this frame, and draws the bars of exactly the
 * documents unmounted): take down what left or fell below the threshold;
 * choose the articles that stand (`chosen`: the cap), take down every other,
 * rebuild each chosen one that went stale and mount the rest — the passage
 * being read, where its article is taken down to be set again, held until it
 * stands again and the camera re-anchored on it then (`keepPlace`); place
 * everything, mark each standing article's blocks for the selection and the
 * walk's focus in place (`markBlocks`), give each the pointer at reading
 * scale alone (`markLegible`), and place each article's corner beside it;
 * where the article holding the selection was mounted this frame, put the
 * platform's range back over the span, its anchor at the end it stood at,
 * unless the person holds a selection outside the layer (`placeAgain`); then
 * set, within the frame's budget and nearest the view's centre first, the
 * lines of the documents in view whose bars the canvas draws and whose
 * article stands unmounted (`measureAside`). While a press stands
 * (`press`) only what left or fell
 * below the threshold is taken down: none is chosen, so no article is taken
 * down for the cap, rebuilt or mounted, and none given or denied the
 * pointer, so the drag keeps the nodes it is anchored in, through a zoom
 * past the readable threshold too, and no range is placed over it; the first
 * frame after the press chooses, rebuilds what went stale, mounts what
 * crossed, gives or takes the pointer where the scale now asks, and places
 * the range the release took over the rebuilt article.
 * @param {(addr: string) => boolean} [focused] whether a document is the walk's focused one: the one residue document of its cell that mounts, the first among equal sizes under the cap, and the one whose corner is a Tab stop (D5 K-57)
 */
export function frame(focused = () => false) {
  if (!layer) return;
  const v = { x0: 0, y0: 0, x1: 0, y1: 0 };
  const pad = 40;
  const VW = layer.clientWidth || window.innerWidth, VH = layer.clientHeight || window.innerHeight;
  v.x0 = (-pad - VW / 2) / cam.scale + cam.x; v.x1 = (VW + pad - VW / 2) / cam.scale + cam.x;
  v.y0 = (-pad - VH / 2) / cam.scale + cam.y; v.y1 = (VH + pad - VH / 2) / cam.scale + cam.y;
  const reading = readingNow();
  // an article left the view where the fold it stands in did: what the person sees, whatever the model holds of it now
  for (const [addr, rec] of [...mounted]) {
    const box = docBox(addr);
    if (!intersects(shapeAt(addr, rec.fold), v) || rec.fs * cam.scale < UNMOUNT_EM || (box.residue && !focused(addr))) unmount(addr);
  }
  /** @type {string[]} the articles mounted this frame */
  const fresh = [];
  if (!pressed) {
    const stand = chosen(v, focused);
    const keep = new Set(stand.map((d) => d.addr));
    for (const [addr, rec] of [...mounted]) if (!keep.has(addr) || wentStale(rec)) { if (reading && reading.addr === addr) hold = reading; unmount(addr); }
    for (const d of stand) if (!mounted.has(d.addr) && mount(d)) fresh.push(d.addr);
  }
  if (hold) {
    const rec = mounted.get(hold.addr);
    if (rec && fresh.includes(hold.addr)) { const h = hold; hold = null; keepPlace(h, rec); }
    else if (!intersects(docBox(hold.addr), v)) hold = null;
  }
  for (const rec of mounted.values()) place(rec);
  const selected = read.selection(), focus = litFocus();
  for (const rec of mounted.values()) { markBlocks(rec, selected, focus); if (!pressed) markLegible(rec); }
  placeCorners(focused);
  if (selected && fresh.includes(selected.addr)) placeAgain(selected);
  if (engine && !pressed) measureInView(v);
}

/**
 * The lines of the documents in view whose bars the canvas draws and whose
 * article stands unmounted, set as the platform sets them, within the frame's
 * budget, nearest the view's centre first (see `frame`).
 * @param {{x0: number, y0: number, x1: number, y1: number}} v the world in view, padded
 */
function measureInView(v) {
  const t0 = performance.now(), cx = cam.x, cy = cam.y;
  const want = REC.docs().filter((d) => d.from >= 0 && !d.system && !mounted.has(d.addr) && !docBox(d.addr).residue && intersects(docBox(d.addr), v)
    && foldOf(d).fs * cam.scale >= BARS_EM && !(folds.get(d.addr) || { set: true }).set);
  want.sort((a, b) => { const p = docBox(a.addr), q = docBox(b.addr); return Math.hypot(p.x + p.w / 2 - cx, p.y + p.h / 2 - cy) - Math.hypot(q.x + q.w / 2 - cx, q.y + q.h / 2 - cy); });
  for (const d of want) {
    if (performance.now() - t0 > MEASURE_BUDGET_MS) { markDirty(); break; }
    measureAside(d); markDirty();
  }
}

/**
 * The corners' pass, after the articles are placed: each mounted document at
 * reading scale whose corner has items carries it, the rest are removed. The
 * writes come first (an element, items that changed, a cap that binds), the
 * reads together after them (one layout for every corner that changed, none
 * in a frame where none did), then the places: the corner's right edge a gap
 * short of the first column, its width the narrower of its own measure and
 * the strip, its top the first column's top or, where that has risen past the
 * one line, just below the line — and never so low that the corner runs past
 * the outline's bottom, unless it is taller than the room below the first
 * column's top.
 * @param {(addr: string) => boolean} focused
 */
function placeCorners(focused) {
  if (!cornerLayer) return;
  /** @type {Array<{c: Corner, rec: Mounted}>} */
  const shown = [];
  for (const rec of mounted.values()) {
    if (!rec.corner || rec.fs * cam.scale < LOD_TXT_LO) continue;
    const c = corners.get(rec.d.addr) || makeCorner(cornerLayer, rec.d.addr);
    if (c.html !== rec.corner) { c.el.innerHTML = rec.corner; c.html = rec.corner; c.stale = true; }
    const cap = Math.max(0, Math.floor((clearLeftOf(rec.d.addr) + rec.fold.columns[0].x) * cam.scale - 2 * CORNER_GAP));
    // a cap the corner's own measure stands inside, before and after, changes nothing laid out
    if (cap !== c.cap && !(c.w < c.cap && c.w <= cap)) { c.el.style.maxWidth = cap + 'px'; c.cap = cap; c.stale = true; }
    shown.push({ c, rec });
  }
  const here = new Set(shown.map((s) => s.rec.d.addr));
  let lost = false;
  for (const addr of [...corners.keys()]) if (!here.has(addr)) lost = dropCorner(addr) || lost;
  if (shown.length) {
    for (const { c } of shown) if (c.stale) { c.w = c.el.offsetWidth; c.h = c.el.offsetHeight; c.stale = false; }
    const top = read.top() + CORNER_GAP;
    for (const { c, rec } of shown) {
      const box = docBox(rec.d.addr), col = rec.fold.columns[0], b = boundsOf(rec.fold);
      const first = sy(box.y + col.y);
      const y = Math.max(first, Math.min(Math.max(first, top), sy(box.y + b.y + b.h) - c.h));
      const x = sx(box.x + col.x) - CORNER_GAP - c.w;
      c.el.style.transform = `translate(${Math.round(x)}px, ${Math.round(y)}px)`;
      const mine = focused(rec.d.addr);
      if (mine === c.mine) continue;
      if (!mine) lost = c.el.contains(document.activeElement) || lost;
      c.mine = mine;
      if (mine) { c.el.tabIndex = 0; c.el.removeAttribute('aria-hidden'); }
      else { c.el.removeAttribute('tabindex'); c.el.setAttribute('aria-hidden', 'true'); }
    }
  }
  if (lost) read.handOff();
}

/**
 * A document's corner element in the corner layer: a group named by its own
 * words (no string of the page's: it labels itself), out of the Tab order
 * and hidden from assistive technology until it is the focused document's.
 * @param {HTMLElement} into the corner layer
 * @param {string} addr
 * @returns {Corner}
 */
function makeCorner(into, addr) {
  const el = document.createElement('div');
  el.className = 'corner';
  el.dataset.corner = addr;
  el.id = 'corner-' + addr;
  el.setAttribute('role', 'group');
  el.setAttribute('aria-labelledby', el.id);
  el.setAttribute('aria-hidden', 'true');
  into.appendChild(el);
  /** @type {Corner} */
  const c = { el, html: '', cap: -1, w: 0, h: 0, stale: true, mine: false };
  corners.set(addr, c);
  return c;
}

/** remove a document's corner; true where it held the focus */
function dropCorner(/** @type {string} */ addr) {
  const c = corners.get(addr); if (!c) return false;
  const held = c.el.contains(document.activeElement);
  c.el.remove(); corners.delete(addr);
  return held;
}

/**
 * The client rects of a span in a mounted article: without a width, those
 * of the block keyed by its first position — its box, one for each column
 * that holds a part of it (the edge a beam leaves from, the arrival at a
 * document named whole); with one, those of the bytes named, line by line
 * (S1 Q1: the line a beam leaves at, the arrival mark's outline, an overlay
 * at the selection).
 * @param {string} addr
 * @param {number} pos the block's first position, or the span's
 * @param {number | null} [width] the span's positions
 * @returns {Array<{x: number, y: number, w: number, h: number}> | null}
 */
export function spanRects(addr, pos, width = null) {
  const rec = mounted.get(addr); if (!rec) return null;
  if (width != null) {
    const r = rangeOf({ addr, pos, width });
    const rs = r ? [...r.getClientRects()].map((q) => ({ x: q.left, y: q.top, w: q.width, h: q.height })) : [];
    return rs.length ? rs : null;
  }
  const rs = [...rec.el.querySelectorAll(`.sp[data-pos="${pos}"]`)].flatMap((sp) => [...sp.getClientRects()].map((r) => ({ x: r.left, y: r.top, w: r.width, h: r.height })));
  return rs.length ? rs : null;
}

// ---- the platform's selection ↔ a span ------------------------------------------

/** the elements of an article's blocks in position order, a withheld run's face among them, a block split across columns by each of its parts */
function blockEls(/** @type {HTMLElement} */ el) { return /** @type {HTMLElement[]} */ ([...el.querySelectorAll('.run > .sp, .run > .withheld')]); }

/** the text nodes that carry a block's own characters, in order — the chrome inside it skipped */
function textNodes(/** @type {HTMLElement} */ el) {
  /** @type {Text[]} */
  const out = [];
  const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  for (let n = w.nextNode(); n; n = w.nextNode()) { const p = n.parentElement; if (p && p.closest(CHROME)) continue; out.push(/** @type {Text} */ (n)); }
  return out;
}

/** the element a node is or sits in */
const elementOf = (/** @type {Node} */ n) => (n.nodeType === Node.ELEMENT_NODE ? /** @type {Element} */ (n) : n.parentElement);

/** the character a block part starts at, in its block's text: 0 for the block's first */
const charBase = (/** @type {HTMLElement} */ el) => Number(el.dataset.char || 0);

/** the parts of a block in an article, in order */
function partsOf(/** @type {HTMLElement} */ art, /** @type {number} */ pos) {
  return blockEls(art).filter((e) => Number(e.dataset.pos) === pos);
}

/**
 * The byte position a boundary point of a range names in a block part: the
 * character boundary the point falls at among the part's own text nodes,
 * counted from the character the part starts at, carried to its byte
 * position; a point outside the part names the part's edge on the side asked
 * — its first character's position, or past its last: the block's end where
 * it is the block's last part — and a block that is not text (a withheld run,
 * a record, a reference, hex) names the block's edge.
 * @param {Block} b
 * @param {HTMLElement} el the part
 * @param {Node} node
 * @param {number} offset
 * @param {'start' | 'end'} side
 */
function posOfPoint(b, el, node, offset, side) {
  const base = charBase(el);
  if (b.kind !== 'para') return side === 'start' ? b.pos : b.pos + b.width;
  if (!el.contains(node)) {
    if (side === 'start') return base ? posOfChar(b, base) : b.pos;
    const art = /** @type {HTMLElement | null} */ (el.closest('article.dtext'));
    const parts = art ? partsOf(art, b.pos) : [el];
    return parts[parts.length - 1] === el ? b.pos + b.width : posOfChar(b, base + ownLength(el));
  }
  let count = base;
  for (const tn of textNodes(el)) {
    const r = document.createRange(); r.selectNodeContents(tn);
    const c = r.comparePoint(node, offset);
    if (c < 0) return posOfChar(b, count);
    if (c === 0) return posOfChar(b, count + (node === tn ? offset : 0));
    count += tn.length;
  }
  return posOfChar(b, count);
}

/**
 * What an article was made from (`Made`): a mounted article's, or a reading
 * scene's pane's (`sceneArticle`); null where the element is neither.
 * @param {HTMLElement} el the article's element
 * @returns {Made | null}
 */
export function madeOf(el) {
  const rec = mounted.get(el.dataset.addr || '');
  return rec && rec.el === el ? rec.made : panes.get(el) || null;
}

/** the article a range starts in, else the one it ends in; null where it lies in none */
function articleOfRange(/** @type {Range} */ range) {
  const at = (/** @type {Node} */ n) => { const e = elementOf(n); return e ? /** @type {HTMLElement | null} */ (e.closest('article.dtext')) : null; };
  return at(range.startContainer) || at(range.endContainer);
}

/**
 * The span a platform range covers in an article: the first and last of the
 * block parts of the blocks the article was made from that the range
 * touches, each end carried to its byte position — an end outside its part
 * names that part's edge, so a range that starts in the article's head
 * starts at its first block; null where the range is collapsed or touches no
 * block.
 * @param {HTMLElement} el the article's element
 * @param {Made} made what the article was made from
 * @param {Range} range
 * @returns {Span | null}
 */
function spanIn(el, made, range) {
  if (range.collapsed) return null;
  const hit = blockEls(el)
    .map((e) => ({ el: e, b: made.blocks.find((x) => x.pos === Number(e.dataset.pos)) || null }))
    .filter((x) => x.b && range.intersectsNode(x.el));
  if (!hit.length) return null;
  const first = hit[0], last = hit[hit.length - 1];
  const p0 = posOfPoint(/** @type {Block} */ (first.b), first.el, range.startContainer, range.startOffset, 'start');
  const p1 = posOfPoint(/** @type {Block} */ (last.b), last.el, range.endContainer, range.endOffset, 'end');
  return p1 > p0 ? { addr: made.addr, pos: p0, width: p1 - p0 } : null;
}

/**
 * The span a platform range covers in a mounted article (`spanIn`): the
 * article the range starts in, else ends in; null where that is no mounted
 * article — a reading scene's pane's among them, whose selection is never the
 * page's — or the range covers no span of it.
 * @param {Range} range
 * @returns {Span | null}
 */
export function spanOfRange(range) {
  const art = articleOfRange(range);
  const rec = art ? mounted.get(art.dataset.addr || '') : undefined;
  return art && rec && rec.el === art ? spanIn(art, rec.made, range) : null;
}

/** the platform's selection as a span of a mounted article, or null where none stands there */
export function spanOfSelection() {
  const s = window.getSelection();
  if (!s || s.rangeCount === 0 || s.isCollapsed) return null;
  return spanOfRange(s.getRangeAt(0));
}

/**
 * The boundary point of a block at a byte position, in the part that holds
 * it: the text node and offset of the character boundary there — at a
 * part's first character on the start side, past the part before's last on
 * the end side; a block that is not text answers its edges.
 * @param {Block} b
 * @param {HTMLElement[]} parts the block's parts, in order
 * @param {number} pos
 * @param {'start' | 'end'} side
 * @returns {{node: Node, offset: number}}
 */
function pointOfPos(b, parts, pos, side) {
  if (b.kind !== 'para') { const el = side === 'start' ? parts[0] : parts[parts.length - 1]; return side === 'start' ? { node: el, offset: 0 } : { node: el, offset: el.childNodes.length }; }
  const ci = charOfPos(b, pos);
  let el = parts[0];
  for (const p of parts) if (side === 'start' ? charBase(p) <= ci : charBase(p) < ci) el = p;
  let at = ci - charBase(el);
  const nodes = textNodes(el);
  for (const tn of nodes) { if (at < tn.length || (side === 'end' && at === tn.length)) return { node: tn, offset: at }; at -= tn.length; }
  const last = nodes[nodes.length - 1];
  return last ? { node: last, offset: last.length } : { node: el, offset: side === 'start' ? 0 : el.childNodes.length };
}

/**
 * The platform range over a span of a mounted article, or null where the
 * article is not mounted or the span lies in none of the blocks it was made
 * from.
 * @param {Span} span
 * @returns {Range | null}
 */
export function rangeOf(span) {
  const rec = mounted.get(span.addr);
  return rec ? rangeIn(rec.el, span) : null;
}

/**
 * The platform range over a span in an article — a mounted one, or a
 * reading scene's pane's, which borrows this mapping as it borrows the
 * article — its ends carried from byte positions to character boundaries of
 * the blocks the article was made from (`madeOf`), never the model's newest,
 * in the part of each block that holds them, the chrome skipped; null where
 * the element is no such article, the span is another document's, or it lies
 * in none of those blocks.
 * @param {HTMLElement} el the article's element
 * @param {Span} span
 * @returns {Range | null}
 */
export function rangeIn(el, span) {
  const made = madeOf(el);
  if (!made || made.addr !== span.addr) return null;
  const end = span.pos + span.width;
  const blocks = made.blocks;
  const b0 = blocks.find((b) => span.pos >= b.pos && span.pos < b.pos + b.width) || blocks.find((b) => b.pos >= span.pos) || null;
  const b1 = [...blocks].reverse().find((b) => end > b.pos && end <= b.pos + b.width) || [...blocks].reverse().find((b) => b.pos + b.width <= end) || null;
  const e0 = b0 ? partsOf(el, b0.pos) : [], e1 = b1 ? partsOf(el, b1.pos) : [];
  if (!b0 || !b1 || !e0.length || !e1.length || b1.pos < b0.pos) return null;
  const s = pointOfPos(b0, e0, span.pos, 'start'), t = pointOfPos(b1, e1, end, 'end');
  const r = document.createRange(); r.setStart(s.node, s.offset); r.setEnd(t.node, t.offset);
  return r.collapsed ? null : r;
}

/** @type {Span | null} the span the platform's selection was last placed over, as its range reads back */
let placed = null;

/** does a platform range lie in the plane's text layer, where the page's selection is drawn? */
const inLayer = (/** @type {Range} */ r) => !!layer && layer.contains(r.commonAncestorContainer);

/**
 * Place the platform's selection over a span as the page selects it — a
 * click, Enter, K-8, an act's own. Selecting is the person's act, so it
 * takes the platform's one selection wherever that stood: one that already
 * covers the span is left as it stands, as the person made it; any other —
 * in the layer, in a reading scene's pane, over an overlay's text — is
 * replaced by the span, its anchor at its start, where the span's article
 * stands. Null clears a selection that lies in the layer and never touches
 * one outside it, as the remount's put-back never does (`placeAgain`).
 * Either way the selection kept from an article taken down (`kept`) is
 * dropped: the page's selection is this one now.
 * @param {Span | null} span
 */
export function placeSelection(span) {
  kept = null;
  const s = window.getSelection(); if (!s) return;
  const standing = s.rangeCount ? s.getRangeAt(0) : null;
  if (!span) { placed = null; if (standing && inLayer(standing)) s.removeAllRanges(); return; }
  const have = standing && !standing.collapsed ? spanOfRange(standing) : null;
  if (have && sameSpan(have, span)) { placed = have; return; }
  const r = rangeOf(span); if (!r) return;
  s.removeAllRanges(); s.addRange(r);
  placed = spanOfRange(r);
}

/**
 * Put the platform's selection back over a span after the article holding
 * it was rebuilt, as the person left it: its anchor at the end it stood at
 * as the old article was taken down (`kept`), where that selection covered
 * this span; else at the span's start. A range added whole would set its
 * anchor at its start; `setBaseAndExtent` sets it at either end. It goes
 * back only where the platform's selection is collapsed, absent or in the
 * layer: one standing outside the layer — a drag in a reading scene's pane,
 * over an overlay's text, made before the take-down or after it — is the
 * person's, and stands as they made it, so the copy is of it (`onCopy`). A
 * caret, wherever it stands, holds nothing they chose. `kept` decides the
 * anchor's end alone: taking an article down leaves a selection that stood
 * in it collapsed in the layer, where the put-back takes it.
 * @param {Span} span
 */
function placeAgain(span) {
  const backward = !!kept && kept.backward && sameSpan(kept.span, span);
  kept = null;
  const s = window.getSelection();
  if (!s || (s.rangeCount && !s.isCollapsed && !inLayer(s.getRangeAt(0)))) return;
  const r = rangeOf(span); if (!r) return;
  if (backward) s.setBaseAndExtent(r.endContainer, r.endOffset, r.startContainer, r.startOffset);
  else s.setBaseAndExtent(r.startContainer, r.startOffset, r.endContainer, r.endOffset);
  placed = s.rangeCount ? spanOfRange(s.getRangeAt(0)) : null;
}

/**
 * The span the platform's selection was last placed over, as that range
 * reads back — a block placed whole reads back as its text, its separator
 * not among the characters — so the input tells a selection the page made
 * from one the person made and never takes the page's own back as a new
 * one; null where none stands.
 */
export const placedSpan = () => placed;

/** the rect of a symbol element for a link in a mounted article */
export function symbolRect(/** @type {string} */ addr, /** @type {string} */ linkAddr) {
  const rec = mounted.get(addr); if (!rec) return null;
  const el = rec.el.querySelector(`.sym[data-link="${linkAddr}"]`);
  if (!el) return null;
  const r = el.getBoundingClientRect();
  return { x: r.left, y: r.top, w: r.width, h: r.height };
}

/**
 * A document's article for a reading scene's pane — the scene borrows the
 * mount (FP-12's second target; the structure record §3.4 (vii)): T-ARTICLE's
 * scene-mode variant, laid out by the pane's own style in one column at the
 * plane's measure and never transformed, and never hidden from assistive
 * technology as the plane's articles are, a pane's text being what it reads
 * there; what it was made from is kept beside it (`madeOf`) for as long as the
 * element lives. The scene places the element in its pane; this is the one
 * place it is made.
 * @param {Doc} d
 * @returns {HTMLElement}
 */
export function sceneArticle(d) {
  const el = document.createElement('article');
  el.className = 'dtext scene';
  el.dataset.addr = d.addr;
  el.innerHTML = articleHTML(d, viewFor(d, true), ownerAccount(d));
  panes.set(el, madeFrom(d));
  return el;
}

/**
 * A document's article as P-LAY's plan — the rows its lines are predicted
 * from — from the same view its article is mounted with.
 * @param {Doc} d
 * @returns {import('../plane/layout.js').Row[]}
 */
export function planOf(d) { return articlePlan(d, viewFor(d), ownerAccount(d)); }

/**
 * A pane's corner items (ux-T2: each pane its own), from the same view the
 * pane's article is made from; the scene holds their element, on the pane's
 * outer side.
 * @param {Doc} d
 * @returns {string}
 */
export function sceneCorner(d) { return cornerHTML(d, viewFor(d, true)); }

/** a document's corner on the plane, or null where it carries none now (the gate's containment check reads it) */
export function cornerOf(/** @type {string} */ addr) { const c = corners.get(addr); return c ? c.el : null; }

/** the text of a mounted article (the gate's rendered case): its columns' blocks in order */
export function mountedText(/** @type {string} */ addr) {
  const rec = mounted.get(addr); if (!rec) return null;
  const runs = [...rec.el.querySelectorAll('.run')];
  return runs.length ? runs.map((r) => r.textContent).join('') : rec.el.textContent;
}

/** every mounted address */
export const mountedAddrs = () => [...mounted.keys()];

/** unmount everything and take the corners down (a board change); a corner that held the focus hands it to the walk */
export function clear() {
  for (const a of [...mounted.keys()]) unmount(a);
  hold = null;
  let lost = false;
  for (const a of [...corners.keys()]) lost = dropCorner(a) || lost;
  if (lost) read.handOff();
}

/**
 * The copy event's addition (§2.4): the copy of any selection in an article —
 * a mounted one, or a reading scene's pane's, where a drag selects as it does
 * on the plane (§2.5) — carries the passage's board and address beside the
 * plain text and never in it, in a flavor only a skep client reads, as
 * `{board, addr, pos, width}`: the span the platform's selection covers in
 * the article it starts in, else ends in (`spanIn`), through the blocks that
 * article was made from. The plain text is the document's own bytes over
 * that span as the article was made from them — the bytes the person
 * selected, whatever the model has delivered since — so a paste anywhere else
 * carries the passage alone and no label of the page (the head's, a
 * hairline's, a mark's, a symbol's, a count's). A selection in no article
 * leaves the event to the platform.
 * @param {{clipboardData: {setData(format: string, data: string): void} | null, preventDefault(): void}} e the clipboard event (the gate's door hands a stub)
 * @param {string} board the board's origin
 * @returns {Span | null} the span copied
 */
export function onCopy(e, board) {
  const s = window.getSelection();
  if (!s || s.rangeCount === 0 || s.isCollapsed || !e.clipboardData) return null;
  const range = s.getRangeAt(0), art = articleOfRange(range), made = art ? madeOf(art) : null;
  const span = art && made ? spanIn(art, made, range) : null;
  if (!span || !made) return null;
  e.clipboardData.setData('text/plain', REC.textOf(made.runs, span.pos, span.pos + span.width));
  e.clipboardData.setData('application/x-skep-passage', JSON.stringify({ board, addr: span.addr, pos: span.pos, width: span.width }));
  e.preventDefault();
  return span;
}
