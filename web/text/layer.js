// T-LAYER — THE ONE RECONCILER (the structure record §3.2 "T-LAYER"; FP-12:
// one reconciler, two targets — the plane's text layer and the reading
// scene's panes; the scene BORROWS this mount). Layer 2. ENGINE-BOUND. State:
// VIEW — the mounted set with each record's layout scale, revision, blocks,
// marks and whether it takes the pointer, the corners beside it, whether a
// press stands on the layer, and the platform's selection as it stood over an
// article taken down — THE ONE OWNER (FP-10). Mount an article when a
// document crosses S1's mount threshold (em 6.5, BELOW the canvas's readable
// 8, so bars become text and no character positions disagree — S1 Q7), take
// it down when it leaves or falls below 5.5, and rebuild it where its run,
// its revision or its face changed. THE CAP (S1's MAX_MOUNTED, 8): at most 8
// articles stand — the walk's focused document first, whatever its face (the
// focus record's D6: the place one stands on is readable, its corner the
// plane's next Tab stop, D5 K-57), then the rest by face, the largest first,
// and among equal faces the articles standing, so no pan, reveal or delivery
// trades a standing article for its equal. An article standing, stale or not, keeps its claim
// down to 5.5, as it does against the threshold (`chosen`); a document past
// the cap keeps its bars. But WHILE A PRESS STANDS on the layer (`press`)
// nothing is rebuilt, nothing mounted and so nothing taken down for the cap:
// the platform's drag-selection is anchored in the article's own nodes,
// which a rebuild would take away, and a fresh mount of the document holding
// the selection would place its range over the drag; the first frame after
// the press does what was held. Laid out ONCE at P-LAY's LAY_FS (16 px)
// and its unitless LINE_H, so each element's line box is that element's own
// size's (P-LAY's `lineBox`), in a column of exactly P-LAY's `cpl` characters
// of its own face (`ch`), from its box's top padding to its box's bottom, and
// placed by transform from the same camera arithmetic (registration 0 px —
// S1).
// THE FACE (`metricsOf`) is P-LAY's `fitted` over the article's plan carrying
// the most link chrome any reveal can set in it (LK's `utmost`): the article
// ends inside its box at every stage, toggle and lens, so the clip at the
// box's edge cuts no line of it and moving the reveal re-sets none. Every
// reader of a document's em above the model reads it here; the model's pump,
// which may not, reads P-LAY's estimate, never the smaller. The canvas's bars
// below the mount are P-LAY's layout of the same article's plan at that face
// (`planOf`, from the view the article is mounted with), so the bars a mount
// replaces stand on the lines its text takes. The loop runs `frame` before
// P-RENDER draws, so the canvas draws or yields each document by this frame's
// mounted set. The marks and symbols are placed from LK's `shown` and
// `symbols`, a stretch several links mark in the one mark LK's `mergedMark`
// gives; the selection from O-SELECTION and the focus from N-WALK are
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
// BESIDE its article, never inside it — the article's box clips whatever
// stands past its measure — as an element of the corner layer this module
// keeps: on the document's one side, the left (the beams and the blocks'
// counts take the right), in the strip P-PROJ's `clearLeftOf` keeps free of
// every other document's box, at the interface's size, held to the top of the
// document's visible part below the one line and never past the box's bottom,
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
// class the style gives the pointer (`markLegible`) — so below it a press on
// mounted text falls to the canvas as one on its bars does, the document a
// place "bars or mounted text alike" and the press keyed "on legibility and
// never on whether text is mounted"; the class moves only while no press
// stands, so a drag begun on legible text keeps the article it is anchored in
// through a zoom below the threshold. A drag selects text and never pans, and
// this module holds whether a press stands (APP-INPUT reports its start and
// its end). THE SELECTION IS A BYTE
// SPAN (R11; foundations §3.1) and the platform's selection is its one mark
// (§2.1): this module carries the platform's range to the span it covers —
// each block's own text nodes walked, the chrome inside a block skipped, a
// character boundary carried to its byte position by T-SPAN through the
// blocks the article was made from, never the model's newest, which a
// delivery under a press may have replaced — and the span back to a range,
// which it places over the mounted article when the page makes the
// selection, its anchor at the span's start, and again after a remount (the
// reveal, a lens, a delivery), since a remount rebuilds the element and the
// platform's range dies with the old one: read as the old article is taken
// down, the selection goes back with its anchor at the end it stood at, so
// the platform's own keys (D5 K-71) go on extending it from there. What no
// interface carries is macOS's "no direction yet" of a selection a pointer
// made: put back, it extends from its anchor, as one a key extended does.
// The reading scene's panes borrow that mapping (`rangeIn`) to find where a
// passage stands. The copy event
// carries the passage's board and address beside the plain text and never in
// it (§2.4), in a flavor only a skep client reads; the plain text is the
// document's own bytes over the span, no label of the page among them.
// Carries: the wireframe's §16 `mount`/`unmount`/`place`/`S1.frame`; S1's
// `mount`, `place`, `S1.frame`; `driftSample` and `overlapCheck` become
// gate hooks (`web/gate/hooks.js` reads `mounted`).
// Rules: FP-1, FP-2, FP-8, FP-10, FP-12, FP-20.

import * as REC from '../model/records.js';
import * as LK from '../links/links.js';
import * as FOCUS from '../nav/focus.js';
import { cam, sx, sy, markDirty } from '../plane/camera.js';
import { MOUNT_EM, UNMOUNT_EM, MAX_MOUNTED, LOD_TXT_LO } from '../plane/lod.js';
import { docBox, intersects, clearLeftOf } from '../plane/projection.js';
import { metricsFor, fitted, LAY_FS, LINE_H } from '../plane/layout.js';
import { articleHTML, articlePlan, cornerHTML, blockMarks } from './article.js';
import { posOfChar, charOfPos, sameSpan, CHROME } from './span.js';
import { fingerprintCue } from '../util.js';

/** @typedef {import('../model/records.js').Doc} Doc */
/** @typedef {import('../model/records.js').Block} Block */
/** @typedef {import('./article.js').ArticleView} ArticleView */
/** @typedef {import('./span.js').Span} Span */

/**
 * @typedef {Object} Mounted
 * @property {HTMLElement} el
 * @property {Doc} d
 * @property {number} lay the layout scale: layout px per world unit
 * @property {number} runFrom
 * @property {number} runTo
 * @property {number} rev the document's revision at mount
 * @property {Block[]} blocks the blocks the article was made from: the model replaces a document's blocks whole and never edits them in place, so these stay the article's own while it stands, whatever the model has delivered since
 * @property {number} grev the view revision at mount
 * @property {number} fs the document's em in world units
 * @property {number} x0 the text column's left edge in the box (world units)
 * @property {number} y0 the article's first line's top in the box (world units)
 * @property {string} corner the corner's items at mount (T-ARTICLE's `cornerHTML`); empty where it has none
 * @property {'plane' | 'scene'} target
 * @property {Array<{pos: number, top: number, left: number}>} [blockTops] each block's offset in the one 16 px layout (the gate's span registration)
 * @property {Array<{el: HTMLElement, b: Block}>} marked each block's element with the block it shows: the elements the selection's and the focus's marks stand on
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
 * @typedef {Object} Face — a document's face as `metricsOf` last fitted it
 * @property {string} key the revisions it was read at: the document's, its run's, the model's
 * @property {string} plan what it was fitted to: the extent, the positions not held, the plan as JSON
 * @property {import('../plane/layout.js').Metrics} m
 */

/**
 * @typedef {Object} Readers — what the layer reads of other owners' state, handed in once by the app (FP-10: through the owners' exports)
 * @property {() => (Span | null)} selection the selection (O-SELECTION's span)
 * @property {() => ({addr: string, pos: number} | null)} focus the focused block (N-WALK's)
 * @property {() => number} top the one line's bottom edge on screen (L-LINE's): the corners hold below it
 * @property {() => void} handOff the focus's next home where a corner that held it leaves: the walk's current item (D5 §4 rule 4)
 */

/** the corner's distance from the text column, and from the edge of the strip it stands in (px) */
const CORNER_GAP = 8;

/** @type {Map<string, Mounted>} */
const mounted = new Map();
/** @type {Map<string, Corner>} the corners on the plane, by document */
const corners = new Map();
/** @type {Map<string, Face>} each document's face, by document — a cache of `metricsOf`, a function of the model */
const faces = new Map();
/** @type {Array<{addr: string, ms: number, blocks: number, emPx: number}>} the mount costs (a forced layout inside the measurement — S1) */
const mountLog = [];
/** the mount log, for the gate's figures */
export const mounts = () => mountLog.slice();
/** @type {HTMLElement | null} */
let layer = null;
/** @type {HTMLElement | null} */
let cornerLayer = null;
/** the view revision: the reveal and the lenses, which change the links an article draws — a bump remounts; the selection and the walk's focus never bump it, their blocks marked in place (`markBlocks`) */
let grev = 0;
/** does a press stand on the layer: the button went down on an article and the press has not ended */
let pressed = false;
/** @type {{span: Span, backward: boolean} | null} the platform's selection as it stood over an article as the article was taken down — its bytes, and whether it ran backward — until the frame puts it back (`placeAgain`) */
let kept = null;
/** @type {Readers} */
let read = { selection: () => null, focus: () => null, top: () => 0, handOff: () => {} };

/** @param {HTMLElement} el the text layer's element @param {HTMLElement} cornersEl the corner layer's */
export function attach(el, cornersEl) { layer = el; cornerLayer = cornersEl; }
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
    marks: LK.shown(d.addr), mergedMark: LK.mergedMark, symbols: LK.symbols(d.addr), countAt: (b) => LK.countAt(d.addr, b),
    wholeLinks: LK.wholeLinks(d.addr).length,
    sessionAccount: s ? s.account : null,
    localTrust: !!(h && h.auth && h.auth.local_trust),
    notebook: true,
    scene, originKinds,
    deviceLabel: isOwnerYou && device ? device.label : null,
    ownerFingerprint: isOwnerYou && device ? device.fingerprint : null,
    keyPresent: isOwnerYou && !!device,
  };
  void ownerRow; void fingerprintCue;
  return v;
}

/**
 * The face a document is set at on the plane: P-LAY's `fitted` over the plan
 * of its article carrying the most link chrome any reveal can set in it (LK's
 * `utmost`), the positions it does not hold yet counted as P-LAY counts them —
 * so the article ends inside its box at every stage, toggle and lens, and
 * moving the reveal re-sets no line; P-LAY's estimate where its text has not
 * arrived. Fitted again only where the plan, the extent or the positions held
 * changed, however often the model moves.
 * @param {Doc} d
 * @returns {import('../plane/layout.js').Metrics}
 */
export function metricsOf(d) {
  const est = metricsFor(d.extent || 1, docBox(d.addr));
  if (d.from < 0) return est;
  const key = `${d.rev}:${d.from}:${d.to}:${REC.rev()}`;
  const f = faces.get(d.addr);
  if (f && f.key === key) return f.m;
  const u = LK.utmost(d.addr);
  const rows = articlePlan(d, { ...viewFor(d), marks: u.shown, symbols: u.shown, countAt: u.countAt }, ownerAccount(d));
  const unheld = Math.max(0, (d.extent || 0) - (d.to - d.from));
  const plan = `${d.extent}|${unheld}|${JSON.stringify(rows)}`;
  const m = f && f.plan === plan ? f.m : fitted(rows, est, unheld);
  faces.set(d.addr, { key, plan, m });
  return m;
}

/**
 * Mount a document's article over its box — laid out once at LAY_FS, its
 * column `cpl` characters of its face (`metricsOf`): the column P-LAY wraps
 * the bars in.
 * @param {Doc} d
 * @returns {Mounted | null}
 */
function mount(d) {
  if (!layer || mounted.has(d.addr) || d.from < 0) return null;
  const t0 = performance.now();
  const m = metricsOf(d);
  const lay = LAY_FS / m.fs;
  const el = document.createElement('article');
  el.className = 'dtext';
  el.dataset.addr = d.addr;
  el.style.width = m.cpl + 'ch';
  el.style.paddingLeft = m.x0 * lay + 'px';
  el.style.paddingTop = m.y0 * lay + 'px';
  el.style.height = (m.y1 - m.y0) * lay + 'px';
  el.style.fontSize = LAY_FS + 'px';
  el.style.lineHeight = String(LINE_H);
  el.setAttribute('aria-hidden', 'true'); // the ARIA mirror is the one accessible rendering (S1 Q7)
  const v = viewFor(d);
  el.innerHTML = articleHTML(d, v, ownerAccount(d));
  layer.appendChild(el);
  const art = el.getBoundingClientRect(); // force layout: the cost must be real (S1); the article stands untransformed until placed
  const sps = /** @type {HTMLElement[]} */ ([...el.querySelectorAll('.sp')]);
  // each block's place in the one layout (16 px), fractional (offsetTop rounds): the gate holds every later frame to it, scaled — a reflow would move a line
  const blockTops = sps.map((e) => { const r = e.getBoundingClientRect(); return { pos: Number(e.dataset.pos), top: r.top - art.top, left: r.left - art.left }; });
  const byPos = new Map(d.blocks.map((b) => [b.pos, b]));
  const marked = sps.flatMap((e) => { const b = byPos.get(Number(e.dataset.pos)); return b ? [{ el: e, b }] : []; });
  /** @type {Mounted} */
  const rec = { el, d, lay, runFrom: d.from, runTo: d.to, rev: d.rev, blocks: d.blocks, grev, fs: m.fs, x0: m.x0, y0: m.y0, corner: cornerHTML(d, v), target: 'plane', blockTops, marked, markedFor: marksKey(d.addr, v.selected, v.focus), legible: false };
  mounted.set(d.addr, rec);
  place(rec);
  mountLog.push({ addr: d.addr, ms: performance.now() - t0, blocks: d.blocks.length, emPx: m.fs * cam.scale });
  if (mountLog.length > 500) mountLog.shift();
  return rec;
}

/** the owner account of a document: by `effective_owner` where read, else its account */
export function ownerAccount(/** @type {Doc} */ d) {
  const row = d.account ? REC.ownerOf(d.account) : undefined;
  return (row && row.prefix) || (d.meta && d.meta.owner) || d.account || '';
}

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
 * they were last marked: a class set or taken off where it differs, nothing
 * rebuilt, so the platform's selection in the article stands.
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
 * §2.4): the `legible` class, which the style alone reads, set where its em
 * stands at P-LOD's readable threshold or above and taken off below it,
 * touched only where that changes. An article without it lets a press
 * through to the canvas, which takes it as it takes one on the bars the
 * article replaced: a click is the place's, a drag selects nothing.
 * @param {Mounted} rec
 */
function markLegible(rec) {
  const on = rec.fs * cam.scale >= LOD_TXT_LO;
  if (on === rec.legible) return;
  rec.legible = on;
  rec.el.classList.toggle('legible', on);
}

/** position a mounted article over its box — transform only, never reflow */
function place(/** @type {Mounted} */ rec) {
  const box = docBox(rec.d.addr);
  const s = cam.scale / rec.lay;
  rec.el.style.transform = `translate(${sx(box.x)}px, ${sy(box.y)}px) scale(${s})`;
}

/**
 * Has a mounted article gone stale: its document's run, its revision, the
 * view revision or its face moved since it was mounted?
 * @param {Mounted} rec
 */
const wentStale = (rec) => rec.d.from !== rec.runFrom || rec.d.to !== rec.runTo || rec.rev !== rec.d.rev || rec.grev !== grev || rec.fs !== metricsOf(rec.d).fs;

/**
 * The documents whose articles stand this frame — THE CAP (S1's
 * MAX_MOUNTED): the walk's focused document first, then the largest em
 * first. Of the documents in view whose text has arrived, the system's apart
 * and a residue document only where it is the walk's focused one: a document
 * holding an article now, stale or not, at em 5.5 and above, any other at
 * 6.5 and above (S1's hysteresis). The focused document always holds one of
 * the places, whatever its face (D6: the ring "at the place" presumes a
 * place one can read; its corner is the plane's next Tab stop, D5 K-57), so
 * the eighth-largest may drop to bars as the focus moves; among equal faces
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
    if (!intersects(box, v)) continue;
    const mine = focused(d.addr);
    if (box.residue && !mine) continue;
    const standing = mounted.has(d.addr);
    const em = metricsOf(d).fs * cam.scale;
    if (em >= (standing ? UNMOUNT_EM : MOUNT_EM)) want.push({ d, em, rank: mine ? 0 : standing ? 1 : 2 });
  }
  // the sort is stable: the focused document first, then by face, then the standing articles; equal in all, the model's order stands
  want.sort((a, b) => Number(b.rank === 0) - Number(a.rank === 0) || b.em - a.em || a.rank - b.rank);
  return want.slice(0, MAX_MOUNTED).map((w) => w.d);
}

/**
 * The per-frame policy, run before the canvas draws (so P-RENDER yields to
 * exactly the articles mounted this frame, and draws the bars of exactly the
 * documents unmounted): take down what left or fell below the threshold;
 * choose the articles that stand (`chosen`: the cap), take down every other,
 * rebuild each chosen one that went stale and mount the rest; place
 * everything, mark each standing article's blocks for the selection and the
 * walk's focus in place (`markBlocks`), give each the pointer at reading
 * scale alone (`markLegible`), and place each article's corner beside it;
 * where the article holding the selection was mounted this frame, put the
 * platform's range back over the span, its anchor at the end it stood at
 * (`placeAgain`). While a press stands (`press`) only what left or fell
 * below the threshold is taken down: none is chosen, so no article is taken
 * down for the cap, rebuilt or mounted, and none given or denied the
 * pointer, so the drag keeps the nodes it is anchored in, through a zoom
 * past the readable threshold too, and no range is placed over it; the first
 * frame after the press chooses, rebuilds what went stale, mounts what
 * crossed, gives or takes the pointer where the scale now asks, and places
 * the range the release took over the rebuilt article.
 * @param {(addr: string) => boolean} [focused] whether a document is the walk's focused one: the one residue document of its cell that mounts, the first among equal faces under the cap, and the one whose corner is a Tab stop (D5 K-57)
 */
export function frame(focused = () => false) {
  if (!layer) return;
  const v = { x0: 0, y0: 0, x1: 0, y1: 0 };
  const pad = 40;
  const VW = layer.clientWidth || window.innerWidth, VH = layer.clientHeight || window.innerHeight;
  v.x0 = (-pad - VW / 2) / cam.scale + cam.x; v.x1 = (VW + pad - VW / 2) / cam.scale + cam.x;
  v.y0 = (-pad - VH / 2) / cam.scale + cam.y; v.y1 = (VH + pad - VH / 2) / cam.scale + cam.y;
  for (const [addr, rec] of [...mounted]) {
    const box = docBox(addr);
    if (!intersects(box, v) || rec.fs * cam.scale < UNMOUNT_EM || (box.residue && !focused(addr))) unmount(addr);
  }
  /** @type {string[]} the articles mounted this frame */
  const fresh = [];
  if (!pressed) {
    const stand = chosen(v, focused);
    const keep = new Set(stand.map((d) => d.addr));
    for (const [addr, rec] of [...mounted]) if (!keep.has(addr) || wentStale(rec)) unmount(addr);
    for (const d of stand) if (!mounted.has(d.addr) && mount(d)) fresh.push(d.addr);
  }
  for (const rec of mounted.values()) place(rec);
  const selected = read.selection(), focus = litFocus();
  for (const rec of mounted.values()) { markBlocks(rec, selected, focus); if (!pressed) markLegible(rec); }
  placeCorners(focused);
  if (selected && fresh.includes(selected.addr)) placeAgain(selected);
}

/**
 * The corners' pass, after the articles are placed: each mounted document at
 * reading scale whose corner has items carries it, the rest are removed. The
 * writes come first (an element, items that changed, a cap that binds), the
 * reads together after them (one layout for every corner that changed, none
 * in a frame where none did), then the places: the corner's right edge a gap
 * short of the text column, its width the narrower of its own measure and the
 * strip, its top the article's first line or, where that has risen past the
 * one line, just below the line — and never so low that the corner runs past
 * the box's bottom, unless it is taller than the room below its first line.
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
    const cap = Math.max(0, Math.floor((clearLeftOf(rec.d.addr) + rec.x0) * cam.scale - 2 * CORNER_GAP));
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
      const box = docBox(rec.d.addr);
      const first = sy(box.y + rec.y0);
      const y = Math.max(first, Math.min(Math.max(first, top), sy(box.y + box.h) - c.h));
      const x = sx(box.x + rec.x0) - CORNER_GAP - c.w;
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
 * of the block keyed by its first position — its box (the edge a beam leaves
 * from, the arrival at a document named whole); with one, those of the bytes
 * named, line by line (S1 Q1: the line a beam leaves at, the arrival mark's
 * outline, an overlay at the selection).
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
  const sp = rec.el.querySelector(`.sp[data-pos="${pos}"]`);
  if (!sp) return null;
  const rs = [...sp.getClientRects()].map((r) => ({ x: r.left, y: r.top, w: r.width, h: r.height }));
  return rs.length ? rs : null;
}

// ---- the platform's selection ↔ a span ------------------------------------------

/** the elements of an article's blocks in position order, a withheld run's face among them */
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

/**
 * The byte position a boundary point of a range names in a block: the
 * character boundary the point falls at among the block's own text nodes,
 * carried to its byte position; a point outside the block, or in a block
 * that is not text (a withheld run, a record, a reference, hex), names the
 * block's edge on the side asked.
 * @param {Block} b
 * @param {HTMLElement} el
 * @param {Node} node
 * @param {number} offset
 * @param {'start' | 'end'} side
 */
function posOfPoint(b, el, node, offset, side) {
  if (b.kind !== 'para' || !el.contains(node)) return side === 'start' ? b.pos : b.pos + b.width;
  let count = 0;
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
 * The span a platform range covers in a mounted article: the article the
 * range starts in (else ends in), the first and last of its blocks the range
 * touches — the blocks the article was made from — each end carried to its
 * byte position; null where the range is collapsed, lies outside the plane's
 * mounted articles, or touches no block.
 * @param {Range} range
 * @returns {Span | null}
 */
export function spanOfRange(range) {
  if (range.collapsed) return null;
  const at = (/** @type {Node} */ n) => { const e = elementOf(n); return e ? /** @type {HTMLElement | null} */ (e.closest('article.dtext')) : null; };
  const art = at(range.startContainer) || at(range.endContainer);
  const addr = art ? art.dataset.addr || '' : '';
  const rec = addr ? mounted.get(addr) : undefined;
  if (!art || !rec || rec.el !== art) return null;
  const hit = blockEls(rec.el)
    .map((el) => ({ el, b: rec.blocks.find((x) => x.pos === Number(el.dataset.pos)) || null }))
    .filter((x) => x.b && range.intersectsNode(x.el));
  if (!hit.length) return null;
  const first = hit[0], last = hit[hit.length - 1];
  const p0 = posOfPoint(/** @type {Block} */ (first.b), first.el, range.startContainer, range.startOffset, 'start');
  const p1 = posOfPoint(/** @type {Block} */ (last.b), last.el, range.endContainer, range.endOffset, 'end');
  return p1 > p0 ? { addr, pos: p0, width: p1 - p0 } : null;
}

/** the platform's selection as a span of a mounted article, or null where none stands there */
export function spanOfSelection() {
  const s = window.getSelection();
  if (!s || s.rangeCount === 0 || s.isCollapsed) return null;
  return spanOfRange(s.getRangeAt(0));
}

/**
 * The boundary point of a block's element at a byte position: the text
 * node and offset of the character boundary there; a block that is not
 * text answers its edges.
 * @param {Block} b
 * @param {HTMLElement} el
 * @param {number} pos
 * @param {'start' | 'end'} side
 * @returns {{node: Node, offset: number}}
 */
function pointOfPos(b, el, pos, side) {
  if (b.kind !== 'para') return side === 'start' ? { node: el, offset: 0 } : { node: el, offset: el.childNodes.length };
  let ci = charOfPos(b, pos);
  const nodes = textNodes(el);
  for (const tn of nodes) { if (ci < tn.length || (side === 'end' && ci === tn.length)) return { node: tn, offset: ci }; ci -= tn.length; }
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
  return rec ? rangeIn(rec.el, rec, span) : null;
}

/**
 * The platform range over a span in an element holding a document's article
 * as T-ARTICLE made it — a mounted article, or a reading scene's pane, which
 * borrows this mapping as it borrows the article — its ends carried from byte
 * positions to character boundaries of the blocks' own text, the chrome
 * skipped; null where the span lies in none of the blocks.
 * @param {HTMLElement} el the article's element
 * @param {{blocks: Block[]}} made what the article was made from: a document, or a mounted article's record, whose blocks are the article's own
 * @param {Span} span
 * @returns {Range | null}
 */
export function rangeIn(el, made, span) {
  const els = blockEls(el);
  const elOf = (/** @type {Block} */ b) => els.find((e) => Number(e.dataset.pos) === b.pos) || null;
  const end = span.pos + span.width;
  const blocks = made.blocks;
  const b0 = blocks.find((b) => span.pos >= b.pos && span.pos < b.pos + b.width) || blocks.find((b) => b.pos >= span.pos) || null;
  const b1 = [...blocks].reverse().find((b) => end > b.pos && end <= b.pos + b.width) || [...blocks].reverse().find((b) => b.pos + b.width <= end) || null;
  const e0 = b0 ? elOf(b0) : null, e1 = b1 ? elOf(b1) : null;
  if (!b0 || !b1 || !e0 || !e1 || b1.pos < b0.pos) return null;
  const s = pointOfPos(b0, e0, span.pos, 'start'), t = pointOfPos(b1, e1, end, 'end');
  const r = document.createRange(); r.setStart(s.node, s.offset); r.setEnd(t.node, t.offset);
  return r.collapsed ? null : r;
}

/** @type {Span | null} the span the platform's selection was last placed over, as its range reads back */
let placed = null;

/**
 * Place the platform's selection over a span as the page selects it — a
 * click, Enter, K-8, an act's own. A platform selection that already covers
 * the span is left as it stands, as the person made it; any other is replaced
 * by the span, its anchor at its start; one outside the layer is never
 * touched; null clears a selection that lies in the layer. Either way the
 * selection kept from an article taken down (`kept`) is dropped: the page's
 * selection is this one now.
 * @param {Span | null} span
 */
export function placeSelection(span) {
  kept = null;
  const s = window.getSelection(); if (!s) return;
  const standing = s.rangeCount ? s.getRangeAt(0) : null;
  if (!span) { placed = null; if (standing && layer && layer.contains(standing.commonAncestorContainer)) s.removeAllRanges(); return; }
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
 * anchor at its start; `setBaseAndExtent` sets it at either end.
 * @param {Span} span
 */
function placeAgain(span) {
  const backward = !!kept && kept.backward && sameSpan(kept.span, span);
  kept = null;
  const s = window.getSelection(), r = rangeOf(span);
  if (!s || !r) return;
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
 * The scene borrows the mount (FP-12's second target): an article's HTML for
 * a pane, laid out by the pane's own CSS, never transformed. The scene owns
 * the pane's element; this is the one place the HTML is made.
 * @param {Doc} d
 * @returns {string}
 */
export function sceneArticle(d) { return articleHTML(d, viewFor(d, true), ownerAccount(d)); }

/**
 * A document's article as P-LAY's plan — the rows the canvas's bars are laid
 * out from below the mount — from the same view its article is mounted with.
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

/** the text of a mounted article (the gate's rendered case) */
export function mountedText(/** @type {string} */ addr) {
  const rec = mounted.get(addr); if (!rec) return null;
  const run = rec.el.querySelector('.run');
  return run ? run.textContent : rec.el.textContent;
}

/** every mounted address */
export const mountedAddrs = () => [...mounted.keys()];

/** unmount everything and take the corners down (a board change); a corner that held the focus hands it to the walk */
export function clear() {
  for (const a of [...mounted.keys()]) unmount(a);
  let lost = false;
  for (const a of [...corners.keys()]) lost = dropCorner(a) || lost;
  if (lost) read.handOff();
}

/**
 * The copy event's addition (§2.4): the passage's board and address beside
 * the plain text and never in it, in a flavor only a skep client reads —
 * the span the platform's selection covers, as `{board, addr, pos, width}`.
 * The plain text is the document's own bytes over that span, so a paste
 * anywhere else carries the passage alone and no label of the page (a
 * hairline's, a mark's, a symbol's, a count's). A selection outside the
 * layer leaves the event to the platform.
 * @param {{clipboardData: {setData(format: string, data: string): void} | null, preventDefault(): void}} e the clipboard event (the gate's door hands a stub)
 * @param {string} board the board's origin
 * @returns {Span | null} the span copied
 */
export function onCopy(e, board) {
  const span = spanOfSelection();
  if (!span || !e.clipboardData) return null;
  e.clipboardData.setData('text/plain', REC.textBetween(span.addr, span.pos, span.pos + span.width));
  e.clipboardData.setData('application/x-skep-passage', JSON.stringify({ board, addr: span.addr, pos: span.pos, width: span.width }));
  e.preventDefault();
  return span;
}
