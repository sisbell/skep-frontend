// P-RENDER — the canvas (the structure record §3.2). Layer 2. ENGINE-BOUND.
// State: none of the model's or the view's — the canvas, the per-frame
// `stats` and the widths its labels' words were measured at (`measure`)
// alone; the canvas is repainted whole on a dirty frame (FP-8).
// The frame (`draw`), in order: the board's region with its label and its
// statements (`boardStatements`; FP-23) in the cell of its user grid no
// account takes — where no board is held none of it, nor an account's frame
// under the view, nor a ring at the walk's root (FP-35); at far the accounts
// as clusters with their counts, exact or a lower bound where the index runs
// from a floor, the address above the density mark and each count on lines
// of its own beneath it (foundations §2.1); at mid the account frames, an
// empty one saying so (law 13), the mid connections behind, the
// continuations too small to stand whole as one mark each (foundations §2.1;
// P44; P-LOD's `residueDepth`), crossfading with the boxes they hold through
// the far band — law 13's count of what it holds (P-PROJ's `membersAt`), its
// members' count in what it counts (ST's `markCount`) — the mark two targets
// where its visible part holds two of P-REG's TARGET each way: a band at its
// foot holding its newest member's label as a box's label sets it, the target
// that goes to that member, and the rest of the mark, its count's, the target
// that opens its members' list; where it holds fewer, no newest label and the
// whole mark the list's (`residueAtScreen`) — and the documents as their
// columns, one box a document showing one version of it (FP-22; N-GO's
// `shownIn`): the version's own text, its fold, its bars and its label, and
// the box's document's edge, landmark, badge, history strip, connections and
// tails, which stand as they are whichever version it shows. A document's one
// edge traces the outside of its columns (P-LAY's `outline`), the edition or
// draft edge its weight, so length reads as a count of columns (FP-12); a
// document whose text has not arrived is its estimated columns, one whose
// extent is unread its first column slot; its label, its contents
// line (T-LAYER's `docLabel`) — its first line where those words stand in its
// column (P-LAY's `leadOf`), its address at the end of that row, the end of
// the outline's first row — and the members' marks on the strip along its
// outline's top; a document a read answered `withheld`, whether the index
// lists it or not, as the withheld box (B1-S2). The mid connections come
// from LK's `connections`, each end at the outline that draws a document or
// the mark that holds it — none where the plane draws its document nowhere
// (`drawsDoc`, the one test LK reads through the reader the app hands it) —
// a line between two places standing in the visible view, and from the place
// standing there toward one out of it the edge stub: its stroke cut at the
// view's border on the true bearing (P-CAM's `edgeStub`; foundations §2.1,
// §2.5); two places both out of view joined only where the frame draws both;
// a connection holding more than one link carrying its count, the bare
// numeral, on its stroke where the stroke runs clear of every place, over a
// plate of the plane's ground (foundations §2.1's register; P44; P-LABEL's
// `onStroke`). The tails (`tailsOf`), from LK's `tails`: a link joining a
// drawn document to one the plane draws nowhere is no connection and no
// stub, but a short horizontal stroke with no bearing and no triangle
// leaving its near end, P-REG's TAIL.length rightward, held short of any
// other place's shape (P-LABEL's `roomRight`), in the mark its links merge
// into — at mid scale from its place's right edge at its middle; where the
// document's article stands in the mount band, from each passage's line
// where its symbol stands (BM's `leaveAt`), the passages leaving by one line
// one tail — each drawn only where it leaves inside the visible view and set
// ending in its label by the pass: one link's far end named, its address
// whole then LK's `farWords` cut on a word to the room, or the count of
// several; a press on it lists its links (`tailAtScreen`).
// The labels — every string the canvas sets but the trail's pip numbers —
// are handed to P-LABEL's one pass once every place's shapes are drawn
// (`drawLabels`), each set only where its place holds it whole inside the
// visible view, meeting no other place's shape and no label set before it
// (F-9; foundations §2.1), a document's on a plate of its ground behind each
// of its lines over the bars beneath; a document's address and a mark's
// newest member's past their region's prefix only where the region's label
// is set before them or the line names the region, else whole (P-LABEL's
// region rule), the regions whose label the frame set kept for T-LAYER's held
// labels (`regionNamed`); where its place has risen under the one line, held below it
// (FP-26) — every label naming a place is handed its place's shape and its
// ground, but the board's and those of the places the line names (L-LINE's
// `named`), whose labels keep the rule above; a document whose article
// stands in the mount band has its label held over its text by T-LAYER
// instead. Every label is set by role (P-REG's FACE): a place's address and
// a withheld box's owner in the identifier's face, in the title's ink and
// never greyed, a document's own words in the reading face, every other
// word and every count in the client's, its
// figures each in a cell as wide as the face's widest, so a count that
// changes moves nothing beside it (P-LABEL's `drawRun`); each stretch is
// measured in the face it is set in (`measure`, its widths dropped as a face
// arrives: `refaced`). Then the stubs' triangles and the tails' strokes, over the places
// and their labels, for the stubs' strokes run behind the boxes, which at
// mid scale stand along most of the view's border and would hide a triangle
// drawn with its stroke, and a tail leaving a passage's line starts inside
// its document's outline, whose ground would cover it; then the trail's pips
// numbered newest-first at the label floor, and no path between them
// (foundations §2.2); the focus ring, its box clamped inside the visible view
// (P-REG's RING; `drawFocus`) — at a continuation's mark's stop, and at a
// document a mark drawn the stronger holds, on the mark, that member's name
// and place among the mark's members set on the mark while it stands, in the
// count's place; and the arrival mark, every run of the span
// landed on, or of the passage a one-step move along the trail lights,
// outlined in view or not (FP-21; `drawArrival`), a press on an outlined run
// naming it (`arrivalAtScreen`).
// Bars mean only too small to read (FP-12): no document at reading size is
// ever drawn as bars — the canvas draws them below P-LOD's readable
// threshold, and at or above it every document is real text, T-LAYER
// standing every line of it in view in the frame its em gets there. A
// document's bars are the lines of T-LAYER's fold (`foldOf`), each bar where
// its line's glyphs will stand, in its column, so the handoff swaps bars for
// text in place and mid scale greeks the columns the mount sets (law 8; S1
// Q7); a line T-LAYER stands as text yields its bar (`standing`), line by
// line, a document whose article stands in the mount band its label, and one
// whose article stands in another fold — a stale one a press holds — the
// whole of it. The app's loop runs T-LAYER's frame before `draw`, so what
// stands is settled when a document's label and bars are drawn or yielded.
// `stats` names what the frame drew, for the gate; the hit tests
// (`docAtScreen`, `residueAtScreen`, `tailAtScreen`, `arrivalAtScreen`) read
// the draw's own rule, as the last frame drew it — a mark's two targets among
// it. The system account's rows are never drawn (the record §1.8).
// Rules: FP-1, FP-2, FP-8, FP-10, FP-12, FP-21, FP-22, FP-23, FP-26, FP-35.

import * as REC from '../model/records.js';
import * as LK from '../links/links.js';
import * as BM from '../beams/beams.js';
import * as TRAIL from '../nav/trail.js';
import * as WALK from '../nav/walk.js';
import * as LAYER from '../text/layer.js';
import * as GO from '../nav/go.js';
import * as LINE from '../line/line.js';
import { cam, sx, sy, wx, wy, viewport, viewportWorld, visibleView, edgeStub, stubTriangle, markDirty } from './camera.js';
import { lodOf, residueDepth, LOD_TXT_LO } from './lod.js';
import { docBox, accountCell, boardCell, boardLabelCell, intersects, continuationCell, withinContinuation, accountAt, membersAt, markKey, continuationOf } from './projection.js';
import { bars, outline, outlineRects, firstRow, leadOf, GUTTER } from './layout.js';
import { setLabels, sizeOf, lineHeight, onStroke, roomRight, pairOf, inFace, runWidth, drawRun, LINE_BOX } from './labels.js';
import { COL, EDGE, HUE, LABEL_MIN_PX, RING, TAIL, TARGET, ADDRESS } from './register.js';
import { documentOf, accountOf } from '../model/address.js';
import * as FOCUS from '../nav/focus.js';
import { t, markCount } from '../strings.js';

/** @typedef {import('../model/records.js').Doc} Doc */
/** @typedef {import('./projection.js').Cell} Cell */
/** @typedef {import('./labels.js').Part} Part */
/** @typedef {import('./camera.js').Point} Point a screen point */
/** @typedef {{x: number, y: number, w: number, h: number}} Rect a screen rect */

/**
 * @typedef {Object} ResidueMark — a continuation drawn as one mark (foundations §2.1; P44)
 * @property {string} key the place it draws its documents at, for the connections and the walk's stop: `account:k` (P-PROJ's `markKey`)
 * @property {string} account
 * @property {number} k the continuation: its cell holds the account's documents at continuation depth k and deeper
 * @property {number} n law 13's count of what it holds
 * @property {boolean} exact the count is exact, the index complete; else a lower bound, drawn so
 * @property {string} newest its newest member, the highest-numbered — the document its newest label's target goes to
 * @property {string[]} members the documents it holds, in address order
 * @property {number} alpha the alpha it is drawn at: below 1 through the far bands
 * @property {string[]} lines the lines the label pass set of its count, top to bottom — of the ringed member's name and place in their place, while the walk's ring stands on a member it holds; none where it left them out
 * @property {string[]} newestLines the lines the label pass set of its newest member's label; none where it set none
 * @property {Rect | null} newestTarget where a press goes to its newest member, on screen: the band at its visible part's foot its newest label stands in; null where it set no newest label, and the whole mark opens the list
 * @property {Rect} rect its screen rect
 */

/**
 * @typedef {Object} Pass — one frame's labels and shapes, handed to P-LABEL once every place is drawn
 * @property {import('./labels.js').Label[]} labels in the order their places were drawn
 * @property {import('./labels.js').Shape[]} shapes every place's shape the frame drew
 */

/**
 * @typedef {Object} Stub — a mid connection's end at the visible view's border, bound for the place out of it (foundations §2.1, §2.5)
 * @property {string} toward the place out of view it is bound for
 * @property {Point} from the centre of the place in view its stroke leaves
 * @property {Point} cut where its stroke ends, P-REG's STUB.inset px inside the border on the bearing: its triangle's tip
 * @property {[Point, Point, Point]} triangle the tip, then its base's two corners
 * @property {string} hue
 * @property {number} alpha the alpha its triangle is drawn at: the documents' band's, by its links' value
 */

/**
 * @typedef {Object} DrawnConnection — a mid connection the frame drew
 * @property {string} a the place one end stands at: a document, or a mark's `key`
 * @property {string} b the place the other end stands at
 * @property {number} count the links it holds, each once
 * @property {Stub | null} stub where one place stands in the visible view and the other out of it; null for a line
 * @property {string | null} label the count the label pass set on its stroke; null where it set none — a connection holding one link, or one whose count the pass left out (`stats.labelsLeftOut` names why)
 */

/**
 * @typedef {Object} DrawnTail — a tail the frame drew (see the head): the links a place sends to documents the plane draws nowhere, leaving it by a short stroke, their far end named at its end
 * @property {string} key its site, the place its label is set under: `tail ⟨place⟩` where it leaves a box or a mark, `tail ⟨document⟩ ⟨x⟩,⟨y⟩` where it leaves a passage's line
 * @property {'box' | 'line'} form it leaves its place's right edge — a document's outline's first row, or a mark — or a passage's line in its document's mounted text
 * @property {string} at the place it leaves: a document, or a mark's `key`
 * @property {string[]} docs the drawn documents it leaves
 * @property {string[]} links its links, each once
 * @property {string[]} far each link's far document, in the order of `links`
 * @property {Point} from where it leaves
 * @property {Point} to where its stroke ends: TAIL.length px on, or short of the nearer shape of another place
 * @property {{x: number, y: number}} world `from` in world units, where the overlay its press shows stands
 * @property {Rect | null} line the line it leaves at, its form `line`; null for `box`
 * @property {number | null} pos the first position of the passage it leaves, its form `line`; null for `box`
 * @property {string} hue its links' merged mark's (LK's `mergedMark`)
 * @property {number} alpha the documents' band's, by its links' value
 * @property {number} weight its links' weight: heavier where every one is lit
 * @property {boolean} dashed every one of its links another's, dashed as a beam is
 * @property {string[]} label the lines the label pass set at its end — its far end named, or its count; none where it left the label out (`stats.labelsLeftOut` names why)
 * @property {Rect[]} rects those lines' rects
 */

/** @type {HTMLCanvasElement | null} */
let cv = null;
/** @type {CanvasRenderingContext2D | null} */
let ctx = null;
let DPR = 1;
/**
 * The last frame's figures; `drawn` the documents whose label the label pass
 * set or whose bars the frame drew, `labelled` those whose label it set,
 * `yielded` the ones whose label or whole it left to T-LAYER's article,
 * `bars` each line it drew a bar for and `yieldedLines` each line in view it
 * left to its text, by document, `barred` the bars it drew for documents at
 * the readable em or above — none, by the rule (see the head) —
 * `residueMarks` the continuations drawn as marks, `connections` the
 * mid connections drawn, each between two places, a stub where one of them
 * stands out of view, the count set on its stroke where the pass set one,
 * `tails` the tails drawn, each with its links and the label set at its end,
 * `labels` the labels set — the connections' counts, the tails' labels and
 * the trail's pip numbers among them — `labelsLeftOut` the parts the pass left out, each with
 * the rule that left it out, `ring` the focused element's box on screen the
 * focus ring outlined, null where it drew none, and `arrival` the rects the
 * arrival mark outlined, each with the run it outlines (`ArrivalRect`).
 */
export const stats = {
  linksDrawn: 0, linesDrawn: 0, clusters: 0, docsDrawn: 0,
  residueMarks: /** @type {ResidueMark[]} */ ([]),
  connections: /** @type {DrawnConnection[]} */ ([]),
  tails: /** @type {DrawnTail[]} */ ([]),
  drawn: /** @type {string[]} */ ([]), labelled: /** @type {string[]} */ ([]), yielded: /** @type {string[]} */ ([]),
  bars: /** @type {Array<[string, number]>} */ ([]), yieldedLines: /** @type {Array<[string, number]>} */ ([]), barred: 0,
  labels: /** @type {import('./labels.js').SetLabel[]} */ ([]),
  labelsLeftOut: /** @type {import('./labels.js').LeftOut[]} */ ([]),
  ring: /** @type {Rect | null} */ (null),
  arrival: /** @type {ArrivalRect[]} */ ([]),
};

/** @typedef {Rect & {run: number}} ArrivalRect a rect the arrival mark outlined, and the run it outlines: an index into the arrival's `runs`; -1 for the block a mark naming the document whole stands on */

/**
 * @typedef {Object} LaidOut — a document's fold and the bars the canvas draws for it, column by column
 * @property {import('./layout.js').Fold} fold
 * @property {import('./layout.js').Bar[][]} bars
 */
/** @type {WeakMap<import('./layout.js').Fold, import('./layout.js').Bar[][]>} each fold's bars: a cache of a pure function of the fold */
const barsOf = new WeakMap();

/** @param {HTMLCanvasElement} c */
export function attach(c) { cv = c; ctx = c.getContext('2d', { alpha: false }); }
export function resize() {
  if (!cv) return;
  const { VW, VH } = viewport();
  DPR = Math.min(2, window.devicePixelRatio || 1);
  cv.width = Math.round(VW * DPR); cv.height = Math.round(VH * DPR);
}

function rrect(/** @type {CanvasRenderingContext2D} */ c, /** @type {number} */ x, /** @type {number} */ y, /** @type {number} */ w, /** @type {number} */ h, /** @type {number} */ r) {
  c.beginPath(); const rr = Math.max(0, Math.min(r, w / 2, h / 2));
  c.moveTo(x + rr, y); c.arcTo(x + w, y, x + w, y + h, rr); c.arcTo(x + w, y + h, x, y + h, rr); c.arcTo(x, y + h, x, y, rr); c.arcTo(x, y, x + w, y, rr); c.closePath();
}
const plural = (/** @type {number} */ n, /** @type {string} */ one, /** @type {string} */ many) => (n === 1 ? t(one) : t(many, { n }));

/** @type {Map<string, number>} the widths the canvas measured, by face, weight, size and string */
const widths = new Map();
/**
 * A run's width set at a size and weight in its face, by the canvas's own
 * measure — the label pass's measure: the client's figures each in a cell as
 * wide as the face's widest, as they are drawn (P-LABEL's `runWidth`,
 * `drawRun`).
 * @param {string} text
 * @param {number} px
 * @param {string} weight
 * @param {import('./register.js').Face} [f]
 * @returns {number}
 */
function measure(text, px, weight, f = 'client') {
  const key = `${f}|${weight}|${px}|${text}`;
  let w = widths.get(key);
  if (w === undefined) {
    if (!ctx) return Infinity;
    if (widths.size >= 20000) widths.clear();
    w = runWidth(ctx, { text, face: f }, px, weight);
    widths.set(key, w);
  }
  return w;
}
/** the widths measured dropped, for a face arrived since they were measured (APP's, as a face loads late) */
export function refaced() { widths.clear(); }

/**
 * The board's statements beneath its label (see the head): at the floor, the
 * residue statement; while the shell's index reports changes it could not
 * place — the arm `unplaced`, whose counts the model never draws as exact
 * (M-REC's `countsExact`) — that a document such a change created is not
 * shown (FP-23).
 * @returns {string[]}
 */
export function boardStatements() {
  /** @type {string[]} */
  const out = [];
  const floor = REC.floor(), state = REC.indexState();
  if (floor != null && !REC.countsExact()) out.push(t('F.board-residue', { floor }));
  if (state && state.arm === 'unplaced') out.push(t('L.board-unplaced'));
  return out;
}

/** the board's region: an outline; its label and its statements (`boardStatements`), in the cell of its user grid no account takes; nothing where no board is held (FP-35) */
function drawBoard(/** @type {Pass} */ pass) {
  const b = REC.board(), h = REC.health();
  if (!ctx || !b) return;
  const { VW, VH } = viewport();
  const c = boardCell('1');
  const X = sx(c.x), Y = sy(c.y), W = c.w * cam.scale, H = c.h * cam.scale;
  if (X + W < 0 || X > VW || Y + H < 0 || Y > VH) return;
  ctx.strokeStyle = COL.boardEdge; ctx.lineWidth = 1; ctx.setLineDash([6, 6]); ctx.strokeRect(X + 2, Y + 2, W - 4, H - 4); ctx.setLineDash([]);
  const room = boardLabelCell('1');
  const RX = sx(room.x) + 8, RY = sy(room.y) + 6;
  const claimant = h && h.auth && h.auth.claimant ? inFace('ident', h.auth.claimant) : '—';
  /** @type {Part[]} */
  const parts = [{ text: t('L.board-label', { node: inFace('ident', '1'), origin: b.origin, venue: t('F.venue.notebook'), claimant }), px: Math.max(10, Math.min(13, W * 0.03)), ink: COL.title, fit: 'wrap' }];
  for (const text of boardStatements()) parts.push({ text, px: 10, ink: COL.greek, fit: 'wrap' });
  // the line names the board at every scale: its label is never held
  pass.labels.push({ kind: 'board', place: '1', within: { x: RX, y: RY, w: room.w * cam.scale - 16, h: room.h * cam.scale - 12 }, x: RX, y: RY, align: 'left', alpha: 1, plate: null, parts, hold: null });
}

/** the accounts as clusters (FAR): the mark, the density, and the labels at their places on the mark — the address held below the one line on the mark's ground */
function drawClusters(/** @type {number} */ alpha, /** @type {Pass} */ pass) {
  if (!ctx) return 0;
  ctx.globalAlpha = alpha;
  let n = 0;
  const v = viewportWorld(120);
  for (const a of REC.accounts()) {
    if (a.system) continue;
    const b = accountCell(a.account);
    if (!intersects(b, v)) continue;
    n++;
    const X = sx(b.x), Y = sy(b.y), W = b.w * cam.scale, H = b.h * cam.scale;
    const count = REC.countOf(a.account);
    const links = LK.countAccount(a.account);
    const dens = Math.min(1, count.documents / 48);
    const mark = { x: X + W * 0.06, y: Y + H * 0.06, w: W * 0.88, h: H * 0.88 };
    ctx.fillStyle = COL.cluster; rrect(ctx, mark.x, mark.y, mark.w, mark.h, Math.min(14, W * 0.1)); ctx.fill();
    ctx.strokeStyle = COL.clusterEdge; ctx.lineWidth = 1; ctx.stroke();
    pass.shapes.push({ place: a.account, rect: mark, alpha });
    const cx = X + W / 2, cy = Y + H / 2;
    const rad = count.documents ? Math.min(W, H) * 0.3 * (0.4 + 0.6 * dens) : 0;
    if (count.documents) {
      ctx.fillStyle = links.arriving ? COL.hollow : `rgba(127,178,255,${0.05 + 0.32 * dens})`;
      ctx.beginPath(); ctx.arc(cx, cy, rad, 0, 6.284); ctx.fill();
      if (links.arriving) { ctx.strokeStyle = 'rgba(127,178,255,0.5)'; ctx.setLineDash([3, 3]); ctx.stroke(); ctx.setLineDash([]); }
      if (links.n) { ctx.strokeStyle = `rgba(127,178,255,${Math.min(0.5, 0.06 + links.n / (count.documents * 10))})`; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(cx, cy, rad * 1.35, 0, 6.284); ctx.stroke(); }
    }
    // the address above the density disc; beneath it each count on lines of its own, then the landmarks or law 13's empty statement — the link ring, the cluster's own mark, passing behind them
    const outer = rad + 1;
    const ax = Math.min(15, W * 0.09), cpx = Math.min(12, W * 0.075);
    pass.labels.push({ kind: 'cluster', place: a.account, within: { x: mark.x + 3, y: mark.y, w: mark.w - 6, h: cy - outer - mark.y }, x: cx, y: cy - outer - lineHeight(ax), align: 'center', alpha, plate: null,
      parts: [{ text: a.account, px: ax, ink: COL.title, fit: 'one', face: 'ident' }], hold: { rects: [mark], pad: 3, plate: COL.cluster } });
    /** @type {Part[]} */
    const counts = [
      { text: `${count.exact ? count.documents : t('L.lower-bound', { n: count.documents })} ${t('F.count.documents')}`, px: cpx, ink: COL.text, fit: 'wrap' },
      { text: `${links.arriving ? t('L.arriving') + ' · ' : ''}${links.n} ${t('F.count.links')}`, px: cpx, ink: COL.text, fit: 'wrap' },
    ];
    const land = REC.landmarks().filter((p) => p.account === a.account).length;
    if (land) counts.push({ text: '◆'.repeat(Math.min(4, land)), px: cpx, ink: COL.land, fit: 'one' });
    if (!count.documents) counts.push({ text: t('B1.empty_subspace'), px: cpx, ink: COL.greek, fit: 'wrap' });
    pass.labels.push({ kind: 'cluster', place: a.account, within: { x: mark.x + 3, y: cy + outer, w: mark.w - 6, h: mark.y + mark.h - cy - outer }, x: cx, y: cy + outer, align: 'center', alpha, plate: null, parts: counts, hold: null });
  }
  ctx.globalAlpha = 1;
  return n;
}

/** the account frames at mid and nearer: the region exists because the address does — on the board the page holds, none where it holds none (FP-35); its label at its foot, held below the one line but where the line names the account, and an empty one says so */
function drawAccountFrames(/** @type {number} */ alpha, /** @type {Pass} */ pass, /** @type {import('../line/line.js').Named} */ named) {
  if (!ctx) return;
  const v = viewportWorld(120);
  const frames = new Set(REC.accounts().filter((a) => !a.system).map((a) => a.account));
  const under = (/** @type {string | null} */ x) => x && frames.add(x);
  if (REC.board()) under(accountUnderView());
  for (const acct of frames) {
    const b = accountCell(acct);
    if (!intersects(b, v)) continue;
    const X = sx(b.x), Y = sy(b.y), W = b.w * cam.scale, H = b.h * cam.scale;
    ctx.strokeStyle = COL.clusterEdge; ctx.lineWidth = 1; ctx.setLineDash([3, 5]); ctx.strokeRect(X + 1, Y + 1, W - 2, H - 2); ctx.setLineDash([]);
    const count = REC.countOf(acct), links = LK.countAccount(acct);
    const docs = plural(count.documents, 'F.label.documents.1', 'F.label.documents');
    const px = Math.max(10, Math.min(13, W * 0.025));
    const within = { x: X + 8, y: Y + 4, w: W - 16, h: H - 8 };
    pass.labels.push({ kind: 'frame', place: acct, within, x: X + 8, y: Y + H - 4 - lineHeight(px), align: 'left', alpha, plate: null,
      parts: [{ text: `${inFace('ident', acct)} · ${count.exact ? docs : t('L.lower-bound', { n: docs })} · ${links.arriving ? t('L.arriving') + ' ' : ''}${plural(links.n, 'F.label.links.1', 'F.label.links')}`, px, ink: COL.greek, fit: 'one' }],
      hold: named.account === acct ? null : { rects: [within], pad: 0, plate: null } });
    if (!count.documents) pass.labels.push({ kind: 'frame', place: acct, within, x: X + W / 2, y: Y + H / 2 - lineHeight(14) / 2, align: 'center', alpha, plate: null, parts: [{ text: t('B1.empty_subspace'), px: 14, ink: COL.text, fit: 'wrap' }], hold: null });
  }
}

/** the account cell under the view's centre (the empty agent space is drawn by this) */
export function accountUnderView() { return accountAt(cam.x, cam.y, '1'); }

/**
 * A document's fold and its bars (P-LAY's `bars`): T-LAYER's fold of the
 * article's lines, made again as T-LAYER folds it again — the document's
 * record or run moving, the model, the article's view state, its lines set.
 * @param {Doc} d
 * @returns {LaidOut}
 */
function laidOut(d) {
  const fold = LAYER.foldOf(d);
  let b = barsOf.get(fold);
  if (!b) { b = bars(fold); barsOf.set(fold, b); }
  return { fold, bars: b };
}

/** a document's fold and bars as the canvas lays them out now, or null where its text has not arrived (the gate's handoff check reads them) */
export function layoutFor(/** @type {string} */ addr) { const d = REC.doc(addr); return d.from < 0 ? null : laidOut(d); }

/** the first of a column's bars whose bottom lies below a world height in its room (a column's bars run top to bottom) */
function firstBar(/** @type {import('./layout.js').Bar[]} */ B, /** @type {number} */ y) {
  let lo = 0, hi = B.length;
  while (lo < hi) { const mid = (lo + hi) >> 1; if (B[mid].y + B[mid].h < y) lo = mid + 1; else hi = mid; }
  return lo;
}

/**
 * Every box the plane may draw, one a document (see the head), as the record
 * of the version it shows (N-GO's `shownIn`): every document the model knows
 * exists (M-REC's `known`, the one list the walk's accounts read too) — the
 * index's places, and the documents the model holds that the index does not
 * list — a version of theirs with its text or its metadata delivered, or a
 * read of them answered `withheld`: existence and owner, never bytes (B1-S2),
 * drawn as the withheld box where it stands whole and counted in its
 * continuation's mark where one holds it (the index at guest class lists no
 * draft; a LEAP to one learns it exists, and a change of class covers one the
 * view stood on) — the system account's rows left out.
 * @returns {Doc[]}
 */
function drawable() {
  return REC.known().map((doc) => REC.doc(GO.shownIn(doc)));
}

/** @type {{rev: number, docs: Set<string>}} the documents `drawable` lists, each as its document, at a model revision: a cache of a pure function of the model */
let drawnDocs = { rev: -1, docs: new Set() };
/**
 * Does the plane draw a document somewhere — at its box where it stands whole,
 * or in the continuation's mark that holds it: a document `drawable` lists, a
 * version member as its document, whose box the two share? The one test of
 * where a link's far end can stand on the plane: the connections end only at
 * such a document, and LK tails a link whose far document is none (the
 * reader the app hands it).
 * @param {string} addr
 * @returns {boolean}
 */
export function drawsDoc(addr) {
  if (drawnDocs.rev !== REC.rev()) drawnDocs = { rev: REC.rev(), docs: new Set(drawable().map((d) => documentOf(d.addr) || d.addr)) };
  return drawnDocs.docs.has(documentOf(addr) || addr);
}

/** the part of a screen rect inside another — the visible view — zero-sized where none is */
function clipped(/** @type {Rect} */ r, /** @type {Rect} */ to) {
  const x = Math.max(r.x, to.x), y = Math.max(r.y, to.y);
  return { x, y, w: Math.max(0, Math.min(r.x + r.w, to.x + to.w) - x), h: Math.max(0, Math.min(r.y + r.h, to.y + to.h) - y) };
}

/** the room inside a mark its labels stand in: its pad in from each side */
const MARK_PAD = 6;

/**
 * A continuation's mark (see the head): its cell, and its labels on its
 * ground, each held below the one line where its place rises under it — its
 * members' count in what it counts (ST's `markCount`), the words of the
 * target that opens its list; and where its visible part holds two targets
 * of P-REG's TARGET each way, a band across its visible part's foot holding
 * its newest member's label as a box's label sets it (T-LAYER's `shortAddr`,
 * `leadPart`) — the address of the version its box shows (N-GO's `shownIn`)
 * at P-REG's ADDRESS, past the region's prefix where the region is named in
 * view, else whole (P-LABEL's region rule), its first line beneath cut on a
 * word — the target that goes to that member, the count kept to the rest
 * above it; and, while the walk's ring stands on a member it holds
 * (`ringed`), that member's name and place among its members
 * (`L.mark.member`), handed first so it takes the count's place. The label
 * pass sets them, and the lines it set are read back after it (`drawLabels`),
 * the band the mark's newest target where the pass sets its newest label.
 * @param {{key: string, account: string, k: number, members: string[], cell: Cell, alpha: number}} m
 * @param {Pass} pass
 * @param {Rect} seen the visible view
 * @param {string | null} ringed the member the walk's ring stands on, where this mark holds it
 * @returns {ResidueMark}
 */
function drawMark(m, pass, seen, ringed) {
  const c = /** @type {CanvasRenderingContext2D} */ (ctx);
  const X = sx(m.cell.x), Y = sy(m.cell.y), W = m.cell.w * cam.scale, H = m.cell.h * cam.scale;
  const n = m.members.length, exact = REC.countsExact();
  const newest = REC.doc(GO.shownIn(m.members[n - 1]));
  c.globalAlpha = m.alpha;
  c.fillStyle = COL.residue; rrect(c, X, Y, W, H, Math.min(6, W * 0.05)); c.fill();
  c.strokeStyle = COL.clusterEdge; c.lineWidth = 1; c.setLineDash([2, 3]); c.stroke(); c.setLineDash([]);
  const rect = { x: X, y: Y, w: W, h: H }, pad = MARK_PAD, f = Math.min(12, W * 0.07), hold = { rects: [rect], pad, plate: COL.residue };
  pass.shapes.push({ place: m.key, rect, alpha: m.alpha });
  // the newest member's label: its address, then its first line, in a band across the visible part's foot as tall as a target at the least
  const lead = LAYER.leadPart(newest, f);
  /** @type {Part[]} */
  const parts = [{ text: LAYER.shortAddr(newest), whole: newest.addr, px: ADDRESS.px, ink: COL.title, weight: ADDRESS.weight, fit: 'one', face: 'ident' }, ...(lead ? [{ ...lead, ink: COL.greek }] : [])];
  const tall = parts.reduce((h, p) => h + lineHeight(p.px), 0), vis = clipped(rect, seen), bandH = Math.max(TARGET.min, tall + pad);
  const band = vis.w >= TARGET.min && vis.h - bandH >= TARGET.min ? { x: vis.x, y: vis.y + vis.h - bandH, w: vis.w, h: bandH } : null;
  /** the room above the band, or the whole mark where none stands: the count's, the list's target's */
  const rest = { x: X + pad, y: Y + pad, w: W - 2 * pad, h: (band ? band.y : Y + H - pad) - (Y + pad) };
  /** a label of the mark's (see the head), under its name */
  const label = (/** @type {import('./labels.js').LabelKind} */ kind, /** @type {Part[]} */ ps, /** @type {Rect} */ within, /** @type {number} */ y, /** @type {string | null} */ region) =>
    pass.labels.push({ kind, place: m.key, within, x: within.x, y, align: 'left', alpha: m.alpha, plate: null, parts: ps, region, hold });
  if (ringed) {
    const d = REC.doc(GO.shownIn(ringed)), at = { i: m.members.indexOf(ringed) + 1, n: exact ? n : t('L.lower-bound', { n }) };
    label('member', [{ text: t('L.mark.member', { ...at, name: inFace('ident', LAYER.shortAddr(d)) }), whole: t('L.mark.member', { ...at, name: inFace('ident', d.addr) }), px: f, ink: COL.title, fit: 'wrap' }], rest, rest.y, m.account);
  }
  label('mark', [{ text: markCount(n, exact), px: f, ink: COL.title, fit: 'wrap' }], rest, rest.y, null);
  if (band) label('newest', parts, { x: band.x + pad, y: band.y, w: band.w - 2 * pad, h: band.h }, band.y + (band.h - tall) / 2, m.account);
  return { key: m.key, account: m.account, k: m.k, n, exact, newest: m.members[n - 1], members: m.members, alpha: m.alpha, lines: [], newestLines: [], newestTarget: band, rect };
}

/** the documents as extents; the continuations too small to stand whole as marks; the mid connections, against the visible view `seen`; a label held below the one line but where the line names its document (`named`) */
function drawDocs(/** @type {import('./lod.js').Lod} */ lod, /** @type {number} */ alpha, /** @type {Pass} */ pass, /** @type {Rect} */ seen, /** @type {import('../line/line.js').Named} */ named) {
  if (!ctx) return 0;
  const { VW, VH } = viewport();
  const v = viewportWorld(80);
  const cont = residueDepth(cam.scale);
  const all = drawable();
  // the documents drawn whole: those shallower than the continuation k, and through the band the depth-k ones fading in
  /** @type {Array<{d: Doc, alpha: number}>} */
  const vis = [];
  for (const d of all) {
    if (!intersects(docBox(d.addr), v)) continue;
    if (!withinContinuation(d.addr, cont.k)) vis.push({ d, alpha });
    else if (cont.fade > 0 && !withinContinuation(d.addr, cont.k + 1)) vis.push({ d, alpha: alpha * cont.fade });
  }
  // the continuations drawn as marks: k's, and through the band k + 1's fading in as k's fades out
  /** @type {Array<{key: string, account: string, k: number, members: string[], cell: Cell, alpha: number}>} */
  const marks = [];
  const drawnK = cont.fade > 0 ? [[cont.k, alpha * (1 - cont.fade)], [cont.k + 1, alpha * cont.fade]] : [[cont.k, alpha]];
  for (const [k, a] of drawnK) {
    for (const [account, members] of membersAt(all.map((d) => d.addr), k)) {
      const cell = continuationCell(account, k);
      if (intersects(cell, v)) marks.push({ key: markKey(account, k), account, k, members, cell, alpha: a });
    }
  }
  // the mid connections behind, from LK (the seam): a document stands at its box, or at the mark of the continuation that holds it — the
  // mark drawn here, or out of view the one that would hold it; a document the plane draws nowhere stands at no place
  /** @type {Map<string, string>} the place of each document a mark drawn here holds */
  const heldAt = new Map();
  for (const m of marks) if (m.k === cont.held) for (const a of m.members) heldAt.set(a, m.key);
  /** @type {Map<string, {x: number, y: number, w: number, h: number}>} each place met, by its key: a document's outline's bounds, a mark's cell */
  const cells = new Map();
  const placeOf = (/** @type {string} */ addr) => {
    const doc = documentOf(addr) || addr, account = accountOf(doc);
    if (!drawsDoc(doc)) return null;
    const key = account && withinContinuation(doc, cont.held) ? markKey(account, cont.held) : doc;
    if (!cells.has(key)) cells.set(key, key === doc ? LAYER.shapeOf(GO.shownIn(doc)) : continuationCell(/** @type {string} */ (account), cont.held));
    return key;
  };
  /** the places this frame draws: the boxes standing whole, the marks holding their documents */
  const drawnAt = new Set([...vis.map((x) => placeOf(x.d.addr)), ...heldAt.values()]);
  const centreOf = (/** @type {string} */ key) => { const c = /** @type {{x: number, y: number, w: number, h: number}} */ (cells.get(key)); return { x: sx(c.x + c.w / 2), y: sy(c.y + c.h / 2) }; };
  const inView = (/** @type {Point} */ p) => p.x >= seen.x && p.x <= seen.x + seen.w && p.y >= seen.y && p.y <= seen.y + seen.h;
  /** @type {Array<{place: string, count: number, p: Point, q: Point}>} each connection holding more than one link, and the stroke its count stands on: to the far place's centre, or to the stub's triangle's base */
  const counted = [];
  let drawn = 0;
  /** the documents drawn: whole, or inside a mark drawn here */
  const docsDrawn = [...new Set([...vis.map((x) => x.d.addr), ...heldAt.keys()])];
  if (lod.docPx > 6) {
    ctx.lineWidth = Math.min(1.6, 0.4 + lod.docPx / 300);
    for (const c of LK.connections(docsDrawn, placeOf)) {
      const A = centreOf(c.a), B = centreOf(c.b), inA = inView(A), inB = inView(B);
      // both out of view: a line only between two places the frame draws, unless both lie far past one side
      if (!inA && !inB && (!drawnAt.has(c.a) || !drawnAt.has(c.b) || (A.x < -400 && B.x < -400) || (A.x > VW + 400 && B.x > VW + 400) || (A.y < -400 && B.y < -400) || (A.y > VH + 400 && B.y > VH + 400))) continue;
      /** @type {Stub | null} */
      let stub = null;
      if (inA !== inB) {
        const [from, to, toward] = inA ? [A, B, c.b] : [B, A, c.a];
        const cut = edgeStub(from, to, seen);
        stub = { toward, from, cut, triangle: stubTriangle(cut, to), hue: c.mark.hue, alpha: alpha * c.mark.value };
      }
      const [p, q] = stub ? [stub.from, stub.cut] : [A, B];
      ctx.globalAlpha = alpha * 0.3 * c.mark.value; ctx.strokeStyle = c.mark.hue;
      ctx.setLineDash(Array.isArray(c.mark.form) ? c.mark.form : []);
      ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke(); ctx.setLineDash([]); drawn++;
      stats.connections.push({ a: c.a, b: c.b, count: c.count, stub, label: null });
      if (c.count > 1) counted.push({ place: pairOf(c.a, c.b), count: c.count, p, q: stub ? { x: (stub.triangle[1].x + stub.triangle[2].x) / 2, y: (stub.triangle[1].y + stub.triangle[2].y) / 2 } : q });
    }
  }
  stats.linksDrawn = drawn;
  // the marks, then the boxes beside them: one mark per continuation, never a stack of its members (P44) — the one drawn the stronger holding
  // the document the walk's ring stands on names it there
  const walked = WALK.current(), ringOn = FOCUS.ringShown() && walked && walked.kind !== 'mark' ? documentOf(walked.addr) : null;
  stats.residueMarks = marks.map((m) => drawMark(m, pass, seen, ringOn && m.k === cont.held && m.members.includes(ringOn) ? ringOn : null));
  for (const { d, alpha: a } of vis) {
    ctx.globalAlpha = a;
    // the version the box shows draws its text and its label; the box's document its edge, its landmark, its badge and its strip
    const doc = documentOf(d.addr) || d.addr, trunk = REC.doc(doc);
    const box = docBox(d.addr), f = LAYER.foldOf(d);
    const draft = LAYER.isDraft(trunk);
    const landmark = /\.0\.1$/.test(doc);
    const ground = d.refused === 'withheld' ? COL.withheld : COL.doc;
    // the document's one edge, around its columns: no frame or rule around a column (FP-12)
    const pts = outline(f);
    ctx.beginPath();
    for (let i = 0; i < pts.length; i++) { const p = pts[i]; if (i) ctx.lineTo(sx(box.x + p.x), sy(box.y + p.y)); else ctx.moveTo(sx(box.x + p.x), sy(box.y + p.y)); }
    ctx.closePath();
    ctx.fillStyle = ground; ctx.fill();
    ctx.strokeStyle = landmark ? COL.land : draft ? COL.draftEdge : COL.docEdge;
    ctx.lineWidth = landmark ? EDGE.landmark : draft ? EDGE.draft : EDGE.edition;
    if (draft) ctx.setLineDash([3, 3]); ctx.stroke(); ctx.setLineDash([]);
    const rects = outlineRects(f).map((r) => ({ x: sx(box.x + r.x), y: sy(box.y + r.y), w: r.w * cam.scale, h: r.h * cam.scale }));
    for (const rect of rects) pass.shapes.push({ place: d.addr, rect, alpha: a });
    // the first row, where the label and the history strip stand: its columns' text, inside their half gutters
    const row = firstRow(f), g = (GUTTER / 2) * f.fs;
    const X = sx(box.x + row.x + g), Y = sy(box.y + row.y + g), W = (row.w - 2 * g) * cam.scale, H = (row.h - 2 * g) * cam.scale;
    const fsPx = f.fs * cam.scale;
    const mountedHere = LAYER.isMounted(d.addr);
    // what stands of it as text: a line standing yields its bar; an article standing in another fold — a stale one a press holds — the whole document
    const stand = LAYER.standing(d.addr), whole = !!stand && stand.fold !== f;
    if (mountedHere || whole) stats.yielded.push(d.addr);
    if (W >= 10 && !mountedHere) {
      // the label, its contents line (T-LAYER's `docLabel`): its first line from where its words stand in its column (P-LAY's `leadOf`), its row centred on that line, cut short of its column's
      // end and of its address at the row's end, the end of the outline's first row; its badge beneath, none at a withheld box — set by the label pass in that row on the document's
      // ground, else held below the one line in its outline, but where the line names the document
      const lab = LAYER.docLabel(d, fsPx), lead = leadOf(f), col = f.columns[lead.column], rowH = Math.max(lineHeight(lab.address.px), lineHeight(fsPx));
      pass.labels.push({ kind: 'doc', place: d.addr, within: { x: X, y: Y, w: W, h: H }, x: sx(box.x + col.x), y: Math.max(Y, sy(box.y + lead.y + lead.h / 2) - rowH / 2), align: 'left', alpha: a, plate: ground,
        contents: { lead: lab.lead, px: fsPx, address: lab.address, from: sx(box.x + lead.x), to: sx(box.x + col.x + col.w), end: X + W },
        parts: lab.parts, region: lab.region, hold: named.doc === doc ? null : { rects, pad: g * cam.scale, plate: ground } });
      // the history strip along the first row's top: the members as marks
      if (trunk.members && trunk.members > 1 && W > 60) { ctx.fillStyle = COL.land; for (let k = 0; k < trunk.members; k++) ctx.fillRect(X + k * 6, sy(box.y + row.y) + 2, 4, 2); }
    }
    if (W < 26) continue;
    if (d.refused === 'withheld') { if (W > 60) { ctx.strokeStyle = COL.greek; ctx.setLineDash([2, 4]); ctx.strokeRect(X + W * 0.04, Y + H * 0.3, W * 0.92, H * 0.5); ctx.setLineDash([]); } continue; }
    if (landmark) { ctx.fillStyle = COL.land; const s = Math.max(4, Math.min(11, W * 0.03)), cx = sx(box.x + row.x + row.w / 2), ty = sy(box.y + row.y); ctx.beginPath(); ctx.moveTo(cx, ty - s * 1.6); ctx.lineTo(cx + s, ty - s * 0.3); ctx.lineTo(cx, ty + s); ctx.lineTo(cx - s, ty - s * 0.3); ctx.closePath(); ctx.fill(); }
    if (fsPx < 3 || whole || d.from < 0) continue;
    // the bars, column by column: the article's own lines, each where its glyphs will stand, a line standing as text yielding its bar — and
    // at the readable em every line in view stands, for bars mean only too small to read (FP-12)
    const B = laidOut(d).bars;
    let set = 0;
    const below = wy(VH + fsPx) - box.y;
    for (let ci = 0; ci < f.columns.length; ci++) {
      const c = f.columns[ci], cb = B[ci] || [];
      if (!cb.length || sy(box.y + c.y) > VH || sy(box.y + c.y + c.h) < 0 || sx(box.x + c.x) > VW || sx(box.x + c.x + c.w) < 0) continue;
      for (let i = firstBar(cb, wy(-fsPx) - box.y); i < cb.length && cb[i].y < below; i++) {
        const b = cb[i];
        if (stand && stand.lines.has(b.line)) { stats.yieldedLines.push([d.addr, b.line]); continue; }
        ctx.fillStyle = COL.greek; ctx.globalAlpha = a * (b.gap ? 0.25 : 0.55);
        ctx.fillRect(sx(box.x + b.x), sy(box.y + b.y), b.w * cam.scale, Math.max(1, b.h * cam.scale));
        stats.linesDrawn++; set++;
        stats.bars.push([d.addr, b.line]);
        if (fsPx >= LOD_TXT_LO) stats.barred++;
      }
    }
    if (set) stats.drawn.push(d.addr);
  }
  // the tails, once every place's shape is drawn: each stroke a shape of the pass, so no count stands on it, and its label handed to it
  if (lod.docPx > 6) stats.tails = tailsOf(docsDrawn, placeOf, alpha, pass, seen);
  // each connection's count, once every place's shape is drawn: on its stroke where its room meets none of them (P-LABEL's `onStroke`), the
  // room the numeral's own line, which the pass holds clear, and its plate, the plane's ground the line passes behind
  const cpx = sizeOf(LABEL_MIN_PX), lh = lineHeight(LABEL_MIN_PX);
  for (const k of counted) {
    const text = String(k.count), w = measure(text, cpx, 'normal');
    const at = onStroke(k.p, k.q, { w, h: lh }, pass.shapes, seen);
    const x0 = Math.max(at.x - w / 2, seen.x), y0 = Math.max(at.y - lh / 2, seen.y);
    const within = { x: x0, y: y0, w: Math.max(0, Math.min(at.x + w / 2, seen.x + seen.w) - x0), h: Math.max(0, Math.min(at.y + lh / 2, seen.y + seen.h) - y0) };
    pass.labels.push({ kind: 'connection', place: k.place, within, x: at.x, y: at.y - lh / 2, align: 'center', alpha, plate: COL.bg, parts: [{ text, px: LABEL_MIN_PX, ink: COL.text, fit: 'one' }], hold: null });
  }
  ctx.globalAlpha = 1;
  return vis.length;
}

/** a screen coordinate to a hundredth of a px: one line's tails, left at one point, are one site */
const hundredth = (/** @type {number} */ v) => Math.round(v * 100) / 100;

/**
 * @typedef {Object} Site — a tail laid out before it is drawn: where it leaves, and the far ends it holds, each link once with its mark
 * @property {string} at
 * @property {string[]} docs
 * @property {Array<import('../links/links.js').FarEnd & {mark: import('./register.js').Mark}>} ends
 * @property {Point} from
 * @property {Rect | null} line
 * @property {number | null} pos
 */

/**
 * The tails (see the head), against the visible view `seen`, once every
 * place's shape is in `pass`: where a document's article stands in the mount
 * band, each line its tailed ends leave by (LK's `tailed`; BM's `leaveAt`,
 * toward no far end: where its symbol stands), each link once; then each of
 * LK's `tails` with the links no line of its documents carries, at its
 * place's right edge — a document's outline's first row, or a mark — at its
 * middle. Each drawn where it leaves inside the visible view and has room for
 * a stroke, its stroke held short of any other place's shape (P-LABEL's
 * `roomRight`) and made a shape of the pass; then each one's label handed to
 * the pass at its stroke's end, its room run to the first shape its lines
 * would meet, its own document's among them: one link's far end named — its
 * address whole, then LK's `farWords` cut on a word to the room — or the
 * count of several, on a plate of the plane's ground.
 * @param {string[]} docsDrawn
 * @param {(addr: string) => string | null} placeOf
 * @param {number} alpha the documents' band's
 * @param {Pass} pass
 * @param {Rect} seen
 * @returns {DrawnTail[]}
 */
function tailsOf(docsDrawn, placeOf, alpha, pass, seen) {
  const g = BM.pageGeometry(seen);
  /** @type {Map<string, Site>} */
  const sites = new Map();
  /** @type {Set<string>} each link a line's tail carries, by `⟨document⟩ ⟨link⟩` */
  const carried = new Set();
  for (const d of docsDrawn) {
    if (!LAYER.isMounted(d)) continue;
    for (const s of LK.shown(d)) {
      if (!LK.tailed(s)) continue;
      const left = BM.leaveAt(g, d, s.runs);
      if (!left) continue;
      carried.add(d + ' ' + s.link.addr);
      const key = `tail ${d} ${hundredth(left.from.x)},${hundredth(left.from.y)}`;
      let site = sites.get(key);
      if (!site) sites.set(key, (site = { at: d, docs: [d], ends: [], from: left.from, line: left.line, pos: s.pos }));
      if (!site.ends.some((e) => e.link.addr === s.link.addr)) site.ends.push(s);
    }
  }
  for (const tl of LK.tails(docsDrawn, placeOf)) {
    const ends = tl.ends.filter((e) => !tl.docs.some((d) => carried.has(d + ' ' + e.link.addr)));
    if (!ends.length) continue;
    const i = tl.at.indexOf(':');
    let from;
    if (i < 0) { const box = docBox(tl.at), row = firstRow(LAYER.foldOf(REC.doc(GO.shownIn(tl.at)))); from = { x: sx(box.x + row.x + row.w), y: sy(box.y + row.y + row.h / 2) }; }
    else { const c = continuationCell(tl.at.slice(0, i), Number(tl.at.slice(i + 1))); from = { x: sx(c.x + c.w), y: sy(c.y + c.h / 2) }; }
    sites.set('tail ' + tl.at, { at: tl.at, docs: tl.docs, ends, from, line: null, pos: null });
  }
  /** @type {Array<{key: string, site: Site, to: Point, mark: import('./register.js').Mark}>} */
  const laid = [];
  for (const [key, site] of sites) {
    const { from } = site;
    if (from.x < seen.x || from.x > seen.x + seen.w || from.y < seen.y || from.y > seen.y + seen.h) continue;
    const len = Math.min(TAIL.length, roomRight({ x: from.x, y: from.y - 1 }, 2, pass.shapes, seen, site.at));
    if (len < 2) continue;
    const mark = LK.mergedMark(/** @type {[import('./register.js').Mark, ...import('./register.js').Mark[]]} */ (site.ends.map((e) => e.mark)));
    laid.push({ key, site, to: { x: from.x + len, y: from.y }, mark });
    pass.shapes.push({ place: key, rect: { x: from.x, y: from.y - 1, w: len, h: 2 }, alpha });
  }
  const lh = lineHeight(LABEL_MIN_PX);
  return laid.map(({ key, site, to, mark }) => {
    const one = site.ends.length === 1 ? site.ends[0] : null, words = one ? LK.farFaced(one).map((r) => (r.face === 'client' ? r.text : inFace(r.face, r.text))).join('') : '';
    /** @type {Part[]} */
    const parts = one ? [{ text: one.far, px: LABEL_MIN_PX, ink: COL.text, fit: 'one', face: 'ident' }, { text: words, px: LABEL_MIN_PX, ink: COL.greek, fit: 'cut' }]
      : [{ text: String(site.ends.length), px: LABEL_MIN_PX, ink: COL.text, fit: 'one' }];
    const x = to.x + TAIL.gap, y = site.from.y - lh / 2, h = (words ? 2 : 1) * lh;
    pass.labels.push({ kind: 'tail', place: key, within: { x, y, w: roomRight({ x, y }, h, pass.shapes, seen, key), h }, x, y, align: 'left', alpha, plate: COL.bg, parts, hold: null });
    return {
      key, form: site.line ? 'line' : 'box', at: site.at, docs: site.docs, links: site.ends.map((e) => e.link.addr), far: site.ends.map((e) => e.far),
      from: site.from, to, world: { x: wx(site.from.x), y: wy(site.from.y) }, line: site.line, pos: site.pos,
      hue: mark.hue, alpha: alpha * mark.value, weight: mark.weight, dashed: mark.linker === 'others', label: [], rects: [],
    };
  });
}

/** the regions — the accounts — whose label the last frame set, a frame's or a cluster's: each named in view (P-LABEL's region rule), which T-LAYER's held labels read (`regionNamed`) */
let regionsSet = new Set();
/** is an account's label set on the last frame (see `regionsSet`) */
export const regionNamed = (/** @type {string} */ account) => regionsSet.has(account);

/**
 * The labels' one pass (P-LABEL): every label the places handed over, set
 * over their shapes inside the visible view, or held below the one line, its
 * addresses past a region's prefix where the region's label is set before it
 * or the one line names the region, each on the plate its place asks for —
 * behind each line it set, a held label's its one line across its place —
 * before its words are set, every run in the identifier's face in the
 * title's ink, never greyed; `stats` takes the labels set and the parts left
 * out — a part of a label with no hold reaching under the one line or past
 * the viewport left out by the pass's 'view' with every part after it, so a
 * label whose head reaches there is left out whole — each mark the lines set
 * of its count, or of the ringed member's name and place in their place, and
 * of its newest label, its newest target standing only where that label is
 * set, each connection the count set on it, each tail the lines set at its
 * end, and `drawn` each document whose label was set. Where the regions whose
 * label it set differ from the last frame's, the frame is marked dirty, so
 * the held labels read them on the next.
 * @param {Pass} pass
 * @param {Rect} seen the visible view (P-CAM's `visibleView`): the viewport below the one line
 * @param {import('../line/line.js').Named} named the places the one line names
 */
function drawLabels(pass, seen, named) {
  const c = ctx; if (!c) return;
  const { set, out } = setLabels(pass.labels, pass.shapes, seen, measure, new Set(/** @type {string[]} */ ([named.board, named.account, named.doc].filter((p) => !!p))));
  c.textAlign = 'left'; c.textBaseline = 'middle';
  for (const l of set) {
    c.globalAlpha = l.alpha;
    // the plate laid once under each line: a held label's one line across its place, else each line it set
    if (l.plate) { c.fillStyle = l.plate; for (const r of l.held ? [l.within] : l.lines.map((x) => x.rect)) c.fillRect(r.x, r.y, r.w, r.h); }
    for (const line of l.lines) {
      const r = line.rect;
      let x = r.x;
      for (const run of line.runs) { c.fillStyle = run.face === 'ident' ? COL.title : line.ink; x += drawRun(c, run, x, r.y + r.h / 2, line.px, line.weight); }
    }
  }
  c.globalAlpha = 1; c.textBaseline = 'alphabetic';
  stats.labels = set; stats.labelsLeftOut = out;
  const regions = new Set(set.filter((l) => l.kind === 'frame' || l.kind === 'cluster').map((l) => l.place));
  if (regions.size !== regionsSet.size || [...regions].some((a) => !regionsSet.has(a))) { regionsSet = regions; markDirty(); }
  for (const mk of stats.residueMarks) {
    const words = set.find((x) => (x.kind === 'member' || x.kind === 'mark') && x.place === mk.key), newest = set.find((x) => x.kind === 'newest' && x.place === mk.key);
    mk.lines = words ? words.lines.map((x) => x.text) : [];
    mk.newestLines = newest ? newest.lines.map((x) => x.text) : [];
    if (!newest) mk.newestTarget = null;
  }
  const counts = new Map(set.filter((l) => l.kind === 'connection').map((l) => [l.place, l.lines[0].text]));
  for (const cn of stats.connections) cn.label = counts.get(pairOf(cn.a, cn.b)) ?? null;
  for (const tl of stats.tails) { const l = set.find((x) => x.kind === 'tail' && x.place === tl.key); tl.label = l ? l.lines.map((x) => x.text) : []; tl.rects = l ? l.lines.map((x) => x.rect) : []; }
  const drawn = new Set(stats.drawn);
  for (const l of set) if (l.kind === 'doc') { stats.labelled.push(l.place); if (!drawn.has(l.place)) stats.drawn.push(l.place); }
}

/**
 * The mid connections' stubs' triangles, each at its cut in its
 * connection's hue and value, over the places and their labels (see the
 * head).
 */
function drawStubs() {
  const c = ctx; if (!c) return;
  for (const { stub } of stats.connections) {
    if (!stub) continue;
    const [p, q, r] = stub.triangle;
    c.globalAlpha = stub.alpha; c.fillStyle = stub.hue;
    c.beginPath(); c.moveTo(p.x, p.y); c.lineTo(q.x, q.y); c.lineTo(r.x, r.y); c.closePath(); c.fill();
  }
  c.globalAlpha = 1;
}

/**
 * The tails' strokes (see the head), each in its links' merged mark — its
 * hue, its value, its weight, dashed where every link is another's as a beam
 * is — over the places and their labels, with the stubs' triangles.
 */
function drawTails() {
  const c = ctx; if (!c) return;
  for (const tl of stats.tails) {
    c.globalAlpha = tl.alpha; c.strokeStyle = tl.hue; c.lineWidth = 1.6 * tl.weight;
    c.setLineDash(tl.dashed ? [3, 2] : []);
    c.beginPath(); c.moveTo(tl.from.x, tl.from.y); c.lineTo(tl.to.x, tl.to.y); c.stroke();
  }
  c.setLineDash([]); c.globalAlpha = 1;
}

/** the trail's pips, numbered newest-first at the label floor, no path joining them (see the head) */
function drawTrail() {
  const c = ctx; if (!c) return;
  const rows = TRAIL.numbered();
  if (!rows.length) return;
  c.save();
  // a pip holds its number at the floor: its radius three quarters of the number's size
  const px = sizeOf(8), r9 = Math.ceil(px * 0.75), lh = px * LINE_BOX;
  c.textAlign = 'left'; c.textBaseline = 'middle';
  for (const r of rows) {
    const e = r.entry;
    const X = sx(e.view.x), Y = sy(e.view.y);
    c.fillStyle = COL.trail; c.globalAlpha = r.n <= 9 ? 1 : 0.5;
    c.beginPath(); c.arc(X, Y, r.n <= 9 ? r9 : 3, 0, 6.284); c.fill();
    if (r.current) { c.strokeStyle = COL.trail; c.lineWidth = 1.5; c.beginPath(); c.arc(X, Y, r9 + 3, 0, 6.284); c.stroke(); }
    if (r.n > 9) continue;
    const text = String(r.n), w = measure(text, px, 'normal'), run = /** @type {import('./labels.js').Run} */ ({ text, face: 'client' });
    c.fillStyle = COL.bg; drawRun(c, run, X - w / 2, Y, px, 'normal');
    stats.labels.push({ kind: 'pip', place: e.addr, within: { x: X - r9, y: Y - r9, w: 2 * r9, h: 2 * r9 }, alpha: 1, plate: null, lines: [{ text, runs: [run], px, ink: COL.bg, weight: 'normal', rect: { x: X - w / 2, y: Y - lh / 2, w, h: lh } }], held: false });
  }
  c.globalAlpha = 1; c.restore();
}

/**
 * A box on screen clamped inside the visible view, inset by the focus ring's
 * reach (P-REG's RING), so the ring's whole stroke stands in the view: an
 * element wider than the view held at its border, one out of it collapsed to
 * a mark on the facing edge.
 * @param {Rect} b
 * @param {Rect} seen the visible view
 * @returns {Rect}
 */
function ringBox(b, seen) {
  const inset = RING.gap + RING.width / 2;
  const x0 = seen.x + inset, y0 = seen.y + inset, x1 = seen.x + seen.w - inset, y1 = seen.y + seen.h - inset;
  const clamp = (/** @type {number} */ v, /** @type {number} */ lo, /** @type {number} */ hi) => Math.max(lo, Math.min(hi, v));
  const X = clamp(b.x, x0, x1), Y = clamp(b.y, y0, y1);
  return { x: X, y: Y, w: clamp(b.x + b.w, x0, x1) - X, h: clamp(b.y + b.h, y0, y1) - Y };
}

/**
 * The focus ring at the walk's element while the plane holds the focus and
 * a key moved it (N-FOCUS's rule; D5 §4 rule 2) — its document's outline's
 * bounds for a document or a link (T-LAYER's `shapeOf`), the account's
 * region, the board's — none at the walk's root where no board is held,
 * whose cell names none (FP-35); a continuation's mark at its stop, and a
 * document the mark drawn the stronger holds — or a span or a link in one —
 * which the frame draws nowhere but in it (`holding`), on the mark — its rect
 * as the frame drew it, its continuation's cell where the frame drew it
 * nowhere; a span whose article
 * stands is marked by its lit block instead, the ring's reading-scale form
 * (D3), wherever a line of it meets the visible view, so the canvas circles
 * no document whose text is laid out — and where none does (a span the
 * re-take keeps while its document stays in view, N-WALK's), at its lines
 * (T-LAYER's `lineBoxes`).
 * Its box clamped to the visible view (`ringBox`). `stats.ring` is the box it
 * outlined.
 * @param {Rect} seen the visible view
 */
function drawFocus(seen) {
  if (!ctx || !FOCUS.ringShown()) return;
  const f = WALK.current(); if (!f || (f.kind === 'board' && !REC.board())) return;
  /** @type {Rect} the element's box on screen */
  let b;
  const mark = f.kind === 'mark' ? stats.residueMarks.find((m) => m.key === f.addr) : holding(f.addr);
  const cont = f.kind === 'mark' && !mark ? continuationOf(f.addr) : null;
  if (mark) b = mark.rect;
  else if (cont) { const w = continuationCell(cont.account, cont.k); b = { x: sx(w.x), y: sy(w.y), w: w.w * cam.scale, h: w.h * cam.scale }; }
  else if (f.kind === 'mark') return;
  else if (f.kind === 'block' && LAYER.isMounted(f.addr)) {
    const blk = f.pos != null ? REC.blockByPos(f.addr, f.pos) : null;
    const lines = blk ? LAYER.lineBoxes(f.addr, blk.pos, blk.width) || [] : [];
    const meets = (/** @type {Rect} */ r) => r.x < seen.x + seen.w && r.x + r.w > seen.x && r.y < seen.y + seen.h && r.y + r.h > seen.y;
    if (!lines.length || lines.some(meets)) return;
    const x0 = Math.min(...lines.map((r) => r.x)), y0 = Math.min(...lines.map((r) => r.y));
    b = { x: x0, y: y0, w: Math.max(...lines.map((r) => r.x + r.w)) - x0, h: Math.max(...lines.map((r) => r.y + r.h)) - y0 };
  } else {
    const w = f.kind === 'account' ? accountCell(f.addr) : f.kind === 'board' ? boardCell(f.addr) : LAYER.shapeOf(f.addr);
    b = { x: sx(w.x), y: sy(w.y), w: w.w * cam.scale, h: w.h * cam.scale };
  }
  const r = ringBox(b, seen), g = RING.gap;
  ctx.strokeStyle = COL.focus; ctx.lineWidth = RING.width; rrect(ctx, r.x - g, r.y - g, r.w + 2 * g, r.h + 2 * g, Math.min(8, r.w * 0.06)); ctx.stroke();
  stats.ring = r;
}

/** the mark the last frame drew the stronger holding the document an address lies in, which it draws nowhere else; null where none holds it, or the address names no document */
function holding(/** @type {string} */ addr) {
  const doc = documentOf(addr), { held } = residueDepth(cam.scale);
  return (doc && stats.residueMarks.find((m) => m.k === held && m.members.includes(doc))) || null;
}

/**
 * The extents of a span's fold lines no part stands for: each column's run
 * of them one rect, their union (T-LAYER's `foldBoxes`, the lines that stand
 * as text left out).
 * @param {string} addr
 * @param {number} pos
 * @param {number} width
 * @returns {Rect[]}
 */
function foldExtents(addr, pos, width) {
  /** @type {Array<{column: number, line: number, rect: Rect}>} */
  const runs = [];
  for (const b of LAYER.foldBoxes(addr, pos, width)) {
    if (LAYER.lineStands(addr, b.line)) continue;
    const last = runs[runs.length - 1];
    if (last && last.column === b.column && last.line + 1 === b.line) {
      const r = last.rect, y1 = Math.max(r.y + r.h, b.rect.y + b.rect.h);
      last.rect = { x: Math.min(r.x, b.rect.x), y: Math.min(r.y, b.rect.y), w: Math.max(r.x + r.w, b.rect.x + b.rect.w) - Math.min(r.x, b.rect.x), h: y1 - Math.min(r.y, b.rect.y) };
      last.line = b.line;
    } else runs.push({ column: b.column, line: b.line, rect: { ...b.rect } });
  }
  return runs.map((x) => x.rect);
}

/**
 * The arrival mark (foundations §2.1, §3.2; FP-21): every run the landing's
 * text holds the span in outlined, and nothing between them, in view or
 * not: line by line on its own bytes' line-rects where its lines
 * stand as text in its article (T-LAYER's `standingRects`), and on its
 * fold's lines where they stand in no part — out of the view's padding, or
 * the document below the mount band — each column's run of them one extent
 * (`foldExtents`), wherever its article stands or its box stands whole, the
 * far band over and no continuation's mark holding it, so no outline is
 * drawn on a mark's ground; where the link names the document whole, the
 * block holding the landing's position. A one-step move's light is drawn
 * with the same marks, its runs read anew each frame from where its text
 * holds the passage now (N-GO's
 * `arrivalMark`). `stats.arrival` names each rect with the run it outlines.
 * The arrival's other mark, the link followed drawn heavier, is BM's, by the
 * weight LK's `markOf` gives it.
 */
function drawArrival() {
  if (!ctx) return;
  const a = GO.arrivalMark(); if (!a) return;
  const doc = documentOf(a.addr) || a.addr;
  /** the fold's lines are outlined where no part stands: where the document's article stands, or its box stands whole */
  const folds = !!LAYER.standing(a.addr) || (lodOf(cam.scale).name !== 'far' && !withinContinuation(doc, residueDepth(cam.scale).k));
  const unstood = (/** @type {number} */ pos, /** @type {number} */ width) => (folds ? foldExtents(a.addr, pos, width) : []);
  /** @type {ArrivalRect[]} */
  const out = [];
  const take = (/** @type {Rect[]} */ rs, /** @type {number} */ run) => { for (const r of rs) if (r.w > 0 && r.h > 0) out.push({ x: r.x, y: r.y, w: r.w, h: r.h, run }); };
  if (a.runs) a.runs.forEach((r, i) => take([...(LAYER.standingRects(a.addr, r.pos, r.width) || []), ...unstood(r.pos, r.width)], i));
  else {
    const b = REC.blockAt(a.addr, a.pos);
    if (b) take(LAYER.spanRects(a.addr, b.pos) || unstood(b.pos, b.width), -1);
  }
  ctx.strokeStyle = HUE.you; ctx.lineWidth = 2; ctx.setLineDash([]);
  for (const r of out) ctx.strokeRect(r.x - 2, r.y - 2, r.w + 4, r.h + 4);
  stats.arrival = out;
}

/**
 * Draw the frame: a function of model and view state (FP-8) — the places,
 * then their labels, then the stubs' triangles and the tails' strokes, the
 * trail, the focus ring and the arrival mark; the connections, the tails and
 * the labels against one visible view, and the places the one line names
 * (L-LINE's `named`), read once for the frame.
 * @returns {import('./lod.js').Lod}
 */
export function draw() {
  const lod = lodOf(cam.scale);
  if (!ctx || !cv) return lod;
  const { VW, VH } = viewport();
  const seen = visibleView(LINE.bottom()), named = LINE.named();
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  ctx.fillStyle = COL.bg; ctx.fillRect(0, 0, VW, VH);
  ctx.textBaseline = 'alphabetic';
  stats.linksDrawn = 0; stats.linesDrawn = 0; stats.clusters = 0; stats.docsDrawn = 0; stats.residueMarks = []; stats.connections = []; stats.tails = []; stats.drawn = []; stats.labelled = []; stats.yielded = [];
  stats.bars = []; stats.yieldedLines = []; stats.barred = 0; stats.labels = []; stats.labelsLeftOut = []; stats.ring = null; stats.arrival = [];
  /** @type {Pass} */
  const pass = { labels: [], shapes: [] };
  drawBoard(pass);
  if (lod.name === 'far') stats.clusters = drawClusters(1, pass);
  else if (lod.name === 'far~mid') { stats.clusters = drawClusters(1 - lod.fade, pass); drawAccountFrames(lod.fade, pass, named); stats.docsDrawn = drawDocs(lod, lod.fade, pass, seen, named); }
  else { drawAccountFrames(1, pass, named); stats.docsDrawn = drawDocs(lod, 1, pass, seen, named); }
  drawLabels(pass, seen, named);
  drawStubs(); drawTails(); drawTrail(); drawFocus(seen); drawArrival();
  return lod;
}

/**
 * The tail under a screen point, as the last frame drew it: on its stroke, 5
 * px either side, or on a line of its label; null where none is (a hit test;
 * draws nothing).
 * @param {number} px
 * @param {number} py
 * @returns {DrawnTail | null}
 */
export function tailAtScreen(px, py) {
  const holds = (/** @type {Rect} */ r, /** @type {number} */ pad) => px >= r.x - pad && px <= r.x + r.w + pad && py >= r.y - pad && py <= r.y + r.h + pad;
  return stats.tails.find((tl) => holds({ x: tl.from.x, y: tl.from.y, w: tl.to.x - tl.from.x, h: 0 }, 5) || tl.rects.some((r) => holds(r, 0))) || null;
}

/**
 * The run of the arrival under a screen point, on its outline as the last
 * frame drew it, 3 px either way (a hit test; draws nothing): APP-INPUT's step
 * to it, below its document's reading scale (FP-21); null where no outlined
 * run holds the point.
 * @param {number} px
 * @param {number} py
 * @returns {{addr: string, run: number} | null}
 */
export function arrivalAtScreen(px, py) {
  const a = GO.arrivalMark();
  const r = a ? stats.arrival.find((q) => q.run >= 0 && px >= q.x - 3 && px <= q.x + q.w + 3 && py >= q.y - 3 && py <= q.y + q.h + 3) : null;
  return a && r ? { addr: a.addr, run: r.run } : null;
}

/** the document under a screen point where it stands whole, on its outline — the version its box shows (N-GO's `shownIn`), the outline that version's; one a continuation's mark holds is the mark's (a hit test; draws nothing) */
export function docAtScreen(/** @type {number} */ px, /** @type {number} */ py) {
  const { held } = residueDepth(cam.scale);
  const wxp = wx(px), wyp = wy(py);
  const inside = (/** @type {{x: number, y: number, w: number, h: number}} */ b, /** @type {number} */ x, /** @type {number} */ y) => x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h;
  for (const p of REC.places()) {
    if (p.system || withinContinuation(p.doc, held)) continue;
    const b = docBox(p.doc), shown = GO.shownIn(p.doc);
    if (inside(b, wxp, wyp) && outlineRects(LAYER.foldOf(REC.doc(shown))).some((r) => inside(r, wxp - b.x, wyp - b.y))) return shown;
  }
  return null;
}

/**
 * @typedef {Object} MarkHit — a continuation's mark under a screen point, and which of its two targets holds it (see the head)
 * @property {string} account
 * @property {number} k
 * @property {string} key its name (P-PROJ's `markKey`): the walk's stop for it, the list's
 * @property {string} newest its newest member, the highest-numbered
 * @property {'newest' | 'list'} target `newest` on the band its newest label stands in, which goes to that member; `list` anywhere else on it, which opens its members' list
 */

/**
 * The continuation's mark under a screen point, as the last frame drew it
 * the stronger (a hit test; draws nothing) — the far scale draws clusters,
 * and no mark — and the target the point falls on: its newest label's band,
 * where the frame set that label, else the rest of the mark (see the head);
 * null where no mark holds the point.
 * @param {number} px
 * @param {number} py
 * @returns {MarkHit | null}
 */
export function residueAtScreen(px, py) {
  const { held } = residueDepth(cam.scale);
  const holds = (/** @type {Rect | null} */ r) => !!r && px >= r.x && px <= r.x + r.w && py >= r.y && py <= r.y + r.h;
  const m = stats.residueMarks.find((x) => x.k === held && holds(x.rect));
  return m ? { account: m.account, k: m.k, key: m.key, newest: m.newest, target: holds(m.newestTarget) ? 'newest' : 'list' } : null;
}
