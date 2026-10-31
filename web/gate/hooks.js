// G-HOOKS — the gate's read-only hooks (the structure record §3.2, §6.3;
// S-22 (a): loaded by `import()` under `?gate=` alone). ENGINE-BOUND. The
// app installs them on `window.__skep` with its loop's frame buffer
// (`install`); nothing here is shipped chrome, and nothing posts anywhere.
// What they expose, for the harness's cases: the model's held records, a
// stretch of a held text by identity (`model.identity`), what a feed row
// naming a document does to the model alone (`model.invalidate`) and a row
// taken as the feed hands one (`model.feed`); the mounted articles' text and
// what stands of each by line (`mountedLines`); the mirror's items; the
// camera, the focus and its owner's state, the focus ring the canvas drew
// (`view.ring`) and the bounds it is clamped to (`view.ringBounds`); the
// registration drift of each mounted box (`driftSample`), the containment of
// each article's rows and its corner (`overlapCheck`) and the visibility
// oracle (`visible`), for the layout checks; the beams' anchors beside their
// spans' own rects and the edge a stroke leaves at (`beamAnchors`), the
// labels the beams set at their bundles' ends (`beamLabels`), the tails the
// canvas drew and where each leaves a passage's line (`tails`,
// `tailAnchors`), the arrival mark's outline beside its link's marked words
// and its article (`arrivalAnchors`), and the handoff — the canvas's own
// bars for a document beside its mounted article's blocks (`barsOf`); a
// document's fold on the plane, where a position stands in it and which
// position stands under a point (`fold`, `centreOf`, `posAt`), the measure in
// force (`measure`), a document's corner as placed (`corner`), its label held
// below the one line (`heldLabel`), its first line and the lead its label
// sets (`firstLine`), the size an address is set at in a label (`address`),
// the places the line names (`named`) and
// where a reading view frames a column (`frameOf`); the continuations' marks
// (`residues`), the mid connections with their counts and stubs
// (`connections`), the labels the canvas set and the parts it left out
// (`labels`, `labelsLeftOut`); the teleports and the landing — the version
// each box shows (`go.shownIn`), the arrival, what a landing says and the
// mirror's descriptions (`go.landing`, `go.described`), the step among its
// runs (`go.step`, `go.stepTo`) and its line as it stands (`landingLine`) —
// for the navigation checks; the camera paths (`runPath`) and the frame
// buffer, each frame's counts (`Frame`), for the frame-cost checks; the
// bridge client's call log, the pump's counts and the settle signal
// (`settled`, `settle`); the trail, the one line's and the overlay's text, a
// walk's moment raised and the folded moments (`moments`); the selection
// beside the platform's own (`platformSelection`) and the copy door (`copy`);
// the reveal's state and setters (`reveal`, `links`), each end `links.shown`
// lists carrying its key and the withheld run it is drawn at, for the marks
// and mirror checks; the reading scene — opened as a step on the trail, with
// the passage its opener holds, and closed by its own end, a Back
// (`scene.open`, `scene.close`), its pairs, a passage's line in a pane
// (`scene.at`), its bands beside their runs' lines and its lines beside their
// passages' lines, and their panes' facing edges (`scene.ties`), the facing
// edges a whole document's ends meet (`scene.edges`), the stop at a band's
// clipped end (`scene.stop`), a stop the reader returned to that only the
// panes' `compare` draws (`scene.returned`), the strokes between its bands and a stretch of
// a pane's characters read from the DOM (`scene.strokes`, `scene.text`), each pane
// as it stands and whether one is being set again (`scene.panes`,
// `scene.updating`), a version read in a pane's place (`scene.read`); and the
// strings.
// The oracles measure what a person meets, never what the page set: the
// containment check holds an article's content to the column that holds it,
// to the clip the page draws and to its document's box, and each corner to
// the room beside it; `visible` says whether an element the DOM holds is
// shown, inside its clip and the viewport; a beam's endpoint and the
// arrival mark's outline are held to the client rects of their link's marked
// words, read from the article apart from the beams' and the canvas's own
// sets. The doors that move the reveal chain redraw the links card where it
// stands open, as the card's own acts do, so a shot after a door shows the
// state it set.
// Rules: FP-1, FP-2, FP-5, FP-17, FP-18.

import * as REC from '../model/records.js';
import * as LAYER from '../text/layer.js';
import * as WALK from '../nav/walk.js';
import * as CAM from '../plane/camera.js';
import * as RENDER from '../plane/render.js';
import * as PORT from '../bridge/port.js';
import * as PUMP from '../model/pump.js';
import * as TRAIL from '../nav/trail.js';
import * as LINE from '../line/line.js';
import * as HOST from '../overlays/host.js';
import * as SEL from '../overlays/selection.js';
import * as FACES from '../overlays/faces.js';
import * as LK from '../links/links.js';
import * as BM from '../beams/beams.js';
import * as GO from '../nav/go.js';
import * as LEAP from '../nav/leap.js';
import * as LINKS from '../overlays/links-card.js';
import * as ANATOMY from '../overlays/anatomy-card.js';
import * as PROV from '../overlays/provenance.js';
import * as VERSIONS from '../overlays/versions.js';
import * as TRAILLIST from '../overlays/trail-list.js';
import * as LANDING from '../overlays/landing.js';
import * as KEYS from '../nav/keys.js';
import * as FOCUS from '../nav/focus.js';
import * as SCENE from '../scene/scene.js';
import { docBox, accountCell, boardCell, boardLabelCell, DOC_W, depthOfDoc } from '../plane/projection.js';
import { STANDARD_FS, MEASURE_CPL, COLUMN_LINES, GUTTER, EDGE, EDGE_GAP, LINE_H, boundsOf, outlineRects, firstRow, edgeOf, leadOf } from '../plane/layout.js';
import { lodOf, LOD_FAR_LO, LOD_FAR_HI, LOD_TXT_LO, LOD_TXT_HI, MOUNT_EM, UNMOUNT_EM, MOUNTS_PER_FRAME } from '../plane/lod.js';
import { RING, ADDRESS } from '../plane/register.js';
import { pinned, lacking } from '../strings.js';
import { pct, r2 } from '../util.js';

/**
 * @typedef {Object} Frame
 * @property {number} t
 * @property {number} interval
 * @property {number} drawMs
 * @property {string} lod
 * @property {number} docs
 * @property {number} both the documents whose label the canvas set while their article stands in the mount band, or that it drew a bar for on a line standing as text at the frame's end: text over its own bars
 * @property {number} neither the documents the canvas yielded a line, or the whole, of to text that does not stand at the frame's end: an empty place
 * @property {number} barred the bars the canvas drew for documents at the readable em or above: none, by FP-12
 * @property {number} mounted the documents T-LAYER mounted afresh in the frame, a rebuild apart
 * @property {number} standing the articles standing in the mount band after it
 * @property {number} lines the lines standing as text after it, every article's
 * @property {string} [phase]
 */

/** @typedef {{x: number, y: number, w: number, h: number}} Rect a screen rect */

/** an element's client rect */
function rectOf(/** @type {Element} */ e) { const r = e.getBoundingClientRect(); return { x: r.left, y: r.top, w: r.width, h: r.height }; }
/** is `a` inside `b`, half a pixel either way? */
function inside(/** @type {Rect} */ a, /** @type {Rect} */ b) { return a.x >= b.x - 0.5 && a.y >= b.y - 0.5 && a.x + a.w <= b.x + b.w + 0.5 && a.y + a.h <= b.y + b.h + 0.5; }
/** how far `r` reaches past `c`, in px (0 where it lies inside) */
function overflowOf(/** @type {Rect} */ r, /** @type {Rect} */ c) { return Math.max(0, c.x - r.x, c.y - r.y, r.x + r.w - (c.x + c.w), r.y + r.h - (c.y + c.h)); }
/**
 * The nearest ancestor below the text layer or the corner layer that clips
 * its overflow, or null where nothing below them clips. The layers
 * themselves are the viewport's clip and no part of containment.
 */
function clipOf(/** @type {Element} */ e) {
  const layers = [document.getElementById('domlayer'), document.getElementById('corners')];
  for (let p = e.parentElement; p && !layers.includes(p); p = p.parentElement) {
    const cs = getComputedStyle(p);
    if (cs.overflowX !== 'visible' || cs.overflowY !== 'visible') return p;
  }
  return null;
}

/** the LOD thresholds, a shot at each (S3) */
export const THRESHOLDS = [
  ['far-clusters', 5, 'doc'], ['far-mid-lower', LOD_FAR_LO, 'doc'], ['far-mid-upper', LOD_FAR_HI, 'doc'], ['mid-extents', 90, 'doc'], ['mid-outline', 260, 'doc'],
  ['mount', MOUNT_EM, 'em'], ['mid-near-lower', LOD_TXT_LO, 'em'], ['mid-near-upper', LOD_TXT_HI, 'em'], ['near-readable', 14, 'em'],
];

/** the frame figures over a window of frames (S3) */
export function summarize(/** @type {Frame[]} */ rows) {
  const iv = rows.map((f) => f.interval), dr = rows.map((f) => f.drawMs);
  let over = 0, run = 0, worstRun = 0;
  for (const f of rows) { if (f.interval > 33.34) { over++; run++; worstRun = Math.max(worstRun, run); } else run = 0; }
  const most = (/** @type {(f: Frame) => number} */ k) => Math.max(0, ...rows.map(k));
  return { frames: rows.length, fps_median: r2(1000 / Math.max(0.001, pct(iv, 50))), frame_p50: r2(pct(iv, 50)), frame_p95: r2(pct(iv, 95)), frame_p99: r2(pct(iv, 99)), draw_p50: r2(pct(dr, 50)), draw_p99: r2(pct(dr, 99)), frames_over_33ms: over, longest_sub30_run_frames: worstRun, worst_frame_ms: r2(Math.max(0, ...iv)),
    max_docs_drawn: most((f) => f.docs), max_both: most((f) => f.both), max_neither: most((f) => f.neither), max_barred: most((f) => f.barred),
    max_standing: most((f) => f.standing), max_lines: most((f) => f.lines), max_mounted: most((f) => f.mounted), mounted: rows.reduce((n, f) => n + f.mounted, 0) };
}

/**
 * Install the hooks with the app's frame buffer.
 * @param {{frames: Frame[], phase: {name: string}, boot: Record<string, unknown>}} deps
 */
export function install(deps) {
  /** the registration drift: the mounted box's top-left vs the camera-projected origin */
  function driftSample(tag = '') {
    const out = [];
    for (const [addr, rec] of LAYER.mountedSet()) {
      const box = docBox(addr);
      const want = { x: CAM.sx(box.x), y: CAM.sy(box.y) };
      const got = rec.el.getBoundingClientRect();
      // every block part's line against its place in the one 16 px layout, scaled — a reflow at zoom moves it; a transform never does
      const s = CAM.cam.scale / rec.lay;
      let spanDx = 0, spanDy = 0, spans = 0;
      for (const b of rec.blockTops || []) {
        const sp = /** @type {HTMLElement | undefined} */ ([.../** @type {NodeListOf<HTMLElement>} */ (rec.el.querySelectorAll(`.sp[data-pos="${b.pos}"]`))].find((e) => Number(e.dataset.char || 0) === b.char));
        if (!sp) continue;
        const r = sp.getBoundingClientRect();
        spanDx = Math.max(spanDx, Math.abs((r.left - got.left) - b.left * s)); spanDy = Math.max(spanDy, Math.abs((r.top - got.top) - b.top * s)); spans++;
      }
      out.push({ tag, addr, em_px: r2(rec.fs * CAM.cam.scale), dx: r2(got.left - want.x), dy: r2(got.top - want.y), span_dx: r2(spanDx), span_dy: r2(spanDy), spans, scale: CAM.cam.scale });
    }
    return out;
  }
  /**
   * Containment: does what a mounted article holds fit its place? The
   * article's own rect is its box by construction (the mount sets it from the
   * box); its content is not — every row it lays out (its head, each block's
   * part, the chrome after them: the scene-offer) is measured against the
   * column that holds it (FP-12), against
   * the nearest clip and against its document's box on screen, the room the
   * plane gives it, which no clip's absence widens, and a row reaching past
   * any is named — by its block's first position, null for the head and the
   * chrome — with its overflow in px. No two mounted articles may intersect.
   * The corner stands
   * beside its article, read from the text layer apart from the article: a
   * mounted document at reading scale whose corner has items and carries
   * none is named; a corner clipped by any box of the page is named with its
   * overflow; a corner reaching into another document's box — mounted or
   * only drawn on the canvas — is named with the box and the overlap in px.
   * The viewport is no part of containment: an article at em 30 is taller
   * than the window by design.
   */
  function overlapCheck() {
    const recs = [...LAYER.mountedSet().values()];
    const arts = recs.map((r) => rectOf(r.el));
    let pairs = 0;
    for (let i = 0; i < arts.length; i++) for (let j = i + 1; j < arts.length; j++) { const a = arts[i], b = arts[j]; if (a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h) pairs++; }
    /** @type {Array<{addr: string, pos: number | null, row: string, overflow_px: number}>} */
    const cut = [];
    /** @type {string[]} */
    const missing = [];
    /** @type {Array<{addr: string, overflow_px: number}>} */
    const clipped = [];
    /** @type {Array<{addr: string, into: string, overlap_px: {w: number, h: number}}>} */
    const into = [];
    const screenBox = (/** @type {string} */ a) => { const b = docBox(a); return { x: CAM.sx(b.x), y: CAM.sy(b.y), w: b.w * CAM.cam.scale, h: b.h * CAM.cam.scale }; };
    const drawn = REC.places().filter((p) => !p.system).map((p) => p.doc);
    for (const rec of recs) {
      const own = screenBox(rec.d.addr);
      for (const row of /** @type {NodeListOf<HTMLElement>} */ (rec.el.querySelectorAll('.hd, .run > *'))) {
        const r = rectOf(row), clip = clipOf(row), col = /** @type {HTMLElement | null} */ (row.closest('.col'));
        const over = Math.max(overflowOf(r, own), clip ? overflowOf(r, rectOf(clip)) : 0, col ? overflowOf(r, columnRect(rec, col)) : 0);
        if (over > 0.5) cut.push({ addr: rec.d.addr, pos: row.dataset.pos != null ? Number(row.dataset.pos) : null, row: row.classList[0] || row.tagName.toLowerCase(), overflow_px: r2(over) });
      }
      const corner = LAYER.cornerOf(rec.d.addr);
      if (!corner) { if (rec.corner.whole && rec.fs * CAM.cam.scale >= LOD_TXT_LO) missing.push(rec.d.addr); continue; }
      const cr = rectOf(corner);
      const clip = clipOf(corner);
      const over = clip ? overflowOf(cr, rectOf(clip)) : 0;
      if (over > 0.5) clipped.push({ addr: rec.d.addr, overflow_px: r2(over) });
      for (const other of new Set([...drawn, ...recs.map((r) => r.d.addr)])) {
        if (other === rec.d.addr) continue;
        const b = screenBox(other);
        if (b.x === own.x && b.y === own.y && b.w === own.w) continue; // a box its own shares: the residue cell
        const w = Math.min(cr.x + cr.w, b.x + b.w) - Math.max(cr.x, b.x), h = Math.min(cr.y + cr.h, b.y + b.h) - Math.max(cr.y, b.y);
        if (w > 0.5 && h > 0.5) into.push({ addr: rec.d.addr, into: other, overlap_px: { w: r2(w), h: r2(h) } });
      }
    }
    return { mounted: recs.length, intersecting_pairs: pairs, blocks_cut: cut, corners_missing: missing, corners_clipped: clipped, corners_into: into, worst_overflow_px: r2(Math.max(0, ...cut.map((c) => c.overflow_px), ...clipped.map((c) => c.overflow_px))) };
  }
  /**
   * The visibility oracle: every element a selector matches, with its rect,
   * the rect of its nearest clipping ancestor below the text layer (null
   * where nothing below the layer clips), and whether it is shown — inside
   * that clip, and inside the viewport. Text the DOM holds past a clip is
   * shown to no one, whatever `textContent` says.
   * @param {string} selector
   */
  function visible(selector) {
    const { VW, VH } = CAM.viewport();
    const view = { x: 0, y: 0, w: VW, h: VH };
    return [...document.querySelectorAll(selector)].map((e) => {
      const el = /** @type {HTMLElement} */ (e);
      const rect = rectOf(el);
      const c = clipOf(el);
      const clip = c ? rectOf(c) : null;
      const holder = /** @type {HTMLElement | null} */ (el.closest('[data-addr], [data-corner]'));
      const sized = rect.w > 0 && rect.h > 0;
      return { addr: holder ? holder.dataset.addr || holder.dataset.corner || null : null, pos: el.dataset.pos != null ? Number(el.dataset.pos) : null, rect, clip, inClip: sized && (!clip || inside(rect, clip)), inView: sized && inside(rect, view), text: (el.textContent || '').slice(0, 80) };
    });
  }
  /**
   * The column of a mounted article a part stands in, as a person meets it:
   * across, the part's box as the engine lays it out — the measure wide, in
   * the reading face's average advance the style sets it in (`--char-w`) —
   * and down, the column's
   * text from its top to the depth its lines were broken at, as the fold
   * places it: its flow, never clipped.
   * @param {import('../text/layer.js').Mounted} rec
   * @param {HTMLElement} col a part's box
   */
  function columnRect(rec, col) {
    const r = rectOf(col), c = rec.fold.columns[Number(col.dataset.column)];
    if (!c) return r;
    const box = docBox(rec.d.addr);
    return { x: r.x, y: CAM.sy(box.y + c.y), w: r.w, h: c.h * CAM.cam.scale };
  }
  /**
   * Where a stroke leaving a line of a mounted article leaves it, read from
   * the article apart from the beams' and the canvas's own sets: the right
   * edge of the part of the block holding the line — the column's, where the
   * block is split across columns (FP-12) — or, where a sign the column's
   * edge holds beside that block stands level with the line, as far past the
   * sign as the sign stands past the text (foundations §3.1; FP-26); null
   * where no part holds the line.
   * @param {HTMLElement} art
   * @param {Rect} line
   */
  function leaveEdge(art, line) {
    const mid = line.y + line.h / 2;
    const part = /** @type {HTMLElement | undefined} */ ([.../** @type {NodeListOf<HTMLElement>} */ (art.querySelectorAll('.run > .sp'))].find((e) => { const q = rectOf(e); return q.y - 0.5 <= mid && mid <= q.y + q.h + 0.5 && q.x <= line.x + line.w && line.x <= q.x + q.w; }));
    if (!part) return null;
    const p = rectOf(part), right = p.x + p.w;
    let edge = right;
    for (const s of /** @type {NodeListOf<HTMLElement>} */ (part.querySelectorAll(':scope > .edge'))) { const q = rectOf(s); if (q.x >= right - 0.5 && q.y - 0.5 <= mid && mid <= q.y + q.h + 0.5) edge = Math.max(edge, q.x + q.w + (q.x - right)); }
    return edge;
  }
  /**
   * The beam endpoints, each beside an oracle read apart from the beams' own
   * set: the client rects of its link's marked words in the near document's
   * mounted article (every line they occupy) and where a stroke leaves the
   * line it leaves at (`leaveEdge`). A beam leaves the text at its span's own
   * line, from the place's edge (foundations §2.1; S1 Q1): the layout case
   * holds each endpoint's y to one of those line rects and its x to the edge.
   */
  function beamAnchors() {
    return BM.anchors().map((a) => {
      const rec = LAYER.mountedSet().get(a.near);
      const words = rec ? [...rec.el.querySelectorAll(`.lip[data-links~="${a.link}"]`)].flatMap((w) => [...w.getClientRects()].map((r) => ({ x: r.left, y: r.top, w: r.width, h: r.height }))) : [];
      return { ...a, words, edge: rec ? leaveEdge(rec.el, a.rect) : null };
    });
  }
  /**
   * The tails leaving a passage's line, each beside an oracle read apart
   * from the canvas's own set, as `beamAnchors`
   * reads a beam's: the client rects of its links' marked words in its
   * document's mounted article and where a stroke leaves the line it leaves at
   * (`leaveEdge`).
   */
  function tailAnchors() {
    return RENDER.stats.tails.filter((tl) => tl.form === 'line' && tl.line).map((tl) => {
      const rec = LAYER.mountedSet().get(tl.at), line = /** @type {Rect} */ (tl.line);
      const words = rec ? tl.links.flatMap((l) => [...rec.el.querySelectorAll(`.lip[data-links~="${l}"]`)].flatMap((w) => [...w.getClientRects()].map((r) => ({ x: r.left, y: r.top, w: r.width, h: r.height })))) : [];
      return { key: tl.key, at: tl.at, links: tl.links, pos: tl.pos, x: tl.from.x, y: tl.from.y, rect: line, words, edge: rec ? leaveEdge(rec.el, line) : null };
    });
  }
  /**
   * The arrival mark — a landing's, or a one-step move's light along the
   * trail, placed where its text holds its passage now — its runs — and its
   * outline as the last frame drew it
   * (`outline`, the rects it stroked around, run by run), beside an oracle
   * read apart from the canvas's own set: the client rects of the followed
   * link's marked words in the landing's mounted article (every line they
   * occupy; none where the landing re-projected a carried passage, which no
   * link marks), the box of the block holding the landing's position, and
   * the landing's mounted article's box. The arrival is an outline around
   * its span (foundations §2.1): the layout case holds the outline to the
   * words, never to the block, to each run's own lines where the span stands
   * in several, and a carried passage's inside its article. Null where no
   * arrival is lit.
   */
  function arrivalAnchors() {
    const a = GO.arrivalMark();
    if (!a) return null;
    const rec = LAYER.mountedSet().get(a.addr);
    const words = rec && a.link ? [...rec.el.querySelectorAll(`.lip[data-links~="${a.link}"]`)].flatMap((w) => [...w.getClientRects()].map((r) => ({ x: r.left, y: r.top, w: r.width, h: r.height }))) : [];
    const b = REC.blockAt(a.addr, a.pos);
    const block = rec && b ? rec.el.querySelector(`.sp[data-pos="${b.pos}"]`) : null;
    return { ...a, outline: RENDER.stats.arrival.slice(), words, block: block ? rectOf(block) : null, article: rec ? rectOf(rec.el) : null };
  }
  /**
   * The handoff (foundations §2.4; S1 Q7; FP-12): the canvas's own bars for
   * a document — the fold P-RENDER draws below the mount, at the camera as it
   * stands — block by block within each run of lines it groups them in: each
   * part of its article standing, where its article stands in that fold, else
   * each column — each group its column, the first line of its run (`part`),
   * its first line's top on screen, its height and its count of lines; beside
   * the mounted article's block parts as the person meets them: each one's
   * column and the first line of the part it stands in, the character it
   * starts at, its top on screen, its height, and its height in its own line
   * boxes (its computed line height at the article's scale). A part the
   * article draws as a withheld run's face is named so. Null where the
   * document's text has not arrived.
   * @param {string} addr
   */
  function barsOf(addr) {
    const laid = RENDER.layoutFor(addr);
    if (!laid) return null;
    const f = laid.fold;
    const box = docBox(addr), s = CAM.cam.scale;
    const rec = LAYER.mountedSet().get(addr);
    const runs = rec && rec.fold === f ? rec.parts.map((p) => ({ column: p.column, first: p.first, end: p.end })) : f.columns.map((c, ci) => ({ column: ci, first: c.first, end: c.first + c.n }));
    /** @type {Array<{pos: number, column: number, part: number, top: number, height: number, lines: number}>} */
    const bars = [];
    for (const run of runs) {
      const c = f.columns[run.column];
      /** @type {Map<number, {first: number, last: number, n: number}>} */
      const parts = new Map();
      for (let i = run.first; i < run.end; i++) {
        const l = f.lines[i];
        if (l.pos == null || l.kind === 'head' || l.kind === 'chrome') continue;
        const p = parts.get(l.pos);
        if (p) { p.last = i; p.n++; } else parts.set(l.pos, { first: i, last: i, n: 1 });
      }
      for (const [pos, p] of parts) {
        const a = f.lines[p.first], z = f.lines[p.last];
        bars.push({ pos, column: run.column, part: run.first, top: r2(CAM.sy(box.y + c.y + (a.top - c.top) * f.fs)), height: r2((z.top + z.h - a.top) * f.fs * s), lines: p.n });
      }
    }
    const k = rec ? s / rec.lay : 1;
    const text = rec ? [.../** @type {NodeListOf<HTMLElement>} */ (rec.el.querySelectorAll('.run > .sp, .run > .withheld'))].map((e) => {
      const r = e.getBoundingClientRect(), col = /** @type {HTMLElement | null} */ (e.closest('.col'));
      const own = parseFloat(getComputedStyle(e).lineHeight) * k;
      return { pos: Number(e.dataset.pos), column: col ? Number(col.dataset.column) : -1, part: col ? Number(col.dataset.first) : -1, char: Number(e.dataset.char || 0), top: r2(r.top), height: r2(r.height), lines: Math.round(r.height / own), withheld: e.classList.contains('withheld') };
    }) : null;
    return { addr, line_px: r2(f.fs * LINE_H * s), columns: f.columns.length, head_lines: f.lines.filter((l) => l.kind === 'head').length, bars, text };
  }
  /**
   * A document's fold as the plane sets it (FP-12): its size, its step,
   * its columns across, its room on the plane, its outline — its bounds, the
   * disjoint rects that make it up and its first row — where its first line
   * stands, which its label sets its first line at (P-LAY's `leadOf`) — and
   * each column — its text box in world units, its count of lines, whether it
   * is estimated.
   * @param {string} addr
   */
  function foldView(addr) {
    const f = LAYER.foldOf(REC.doc(addr)), box = docBox(addr), b = boundsOf(f), r0 = firstRow(f), l = leadOf(f);
    const at = (/** @type {{x: number, y: number, w: number, h: number}} */ r) => ({ x: box.x + r.x, y: box.y + r.y, w: r.w, h: r.h });
    return {
      addr, fs: f.fs, step: f.step, across: f.across, lines: f.lines.length, cpl: f.cpl,
      room: { x: box.x, y: box.y, w: box.w, h: box.h }, outline: at(b), rects: outlineRects(f).map(at), row: at(r0), lead: { column: l.column, x: box.x + l.x, y: box.y + l.y, h: l.h },
      columns: f.columns.map((c) => ({ x: box.x + c.x, y: box.y + c.y, w: c.w, h: c.h, n: c.n, estimated: c.estimated, edge: at(edgeOf(f, c)) })),
    };
  }
  /** a reading scene's pane, by its side */
  const paneOf = (/** @type {'a' | 'b'} */ side) => document.getElementById(side === 'a' ? 'sceneA' : 'sceneB');
  /** a pane's visible content on screen: inside its border, its scroll's window */
  function paneRect(/** @type {HTMLElement} */ pane) { const r = pane.getBoundingClientRect(); return { x: r.left + pane.clientLeft, y: r.top + pane.clientTop, w: pane.clientWidth, h: pane.clientHeight }; }
  /**
   * A passage in a reading scene's pane as the person meets it, read now
   * through T-LAYER's byte-span mapping over the pane's article and the
   * blocks it was made from (`madeOf`) — the text the pane shows, whatever
   * the model has delivered since: the first line it stands on (the first
   * client rect of its range) and its first characters, white space
   * collapsed; with no width, the passage runs to the end of the block holding
   * `pos`. Null where the scene is not open.
   * @param {'a' | 'b'} side
   * @param {number} pos
   * @param {number | null} [width]
   */
  function sceneAt(side, pos, width = null) {
    const p = SCENE.pair(), pane = paneOf(side);
    if (!p || !pane) return null;
    const addr = side === 'a' ? p.a : p.b;
    const art = /** @type {HTMLElement | null} */ (pane.querySelector('article.dtext'));
    const made = art ? LAYER.madeOf(art) : null;
    const b = made ? REC.blockIn(made.blocks, pos) : null;
    const w = width ?? (b ? b.pos + b.width - pos : 1);
    const range = art ? LAYER.rangeIn(art, { addr, pos, width: Math.max(1, w) }) : null;
    const r = range ? [...range.getClientRects()].find((q) => q.width > 0 && q.height > 0) : null;
    return { addr, pos, line: r ? { x: r.left, y: r.top, w: r.width, h: r.height } : null, text: range ? range.toString().replace(/\s+/g, ' ').trim().slice(0, 60) : null, pane: paneRect(pane) };
  }
  /**
   * The line boxes a stretch of a pane's article sets glyphs on, on screen,
   * block by block in the text's order: each client rect of the stretch's
   * part in a block of characters no taller than a line box and a half — a
   * glyph's — as the line of that block's box its middle stands in, each line
   * the block's height over the lines it holds; none where the stretch is
   * empty or sets no glyph.
   * @param {HTMLElement} art
   * @param {import('../text/layer.js').Made} made what the article was made from
   * @param {number} from
   * @param {number} to
   * @param {number} lh the article's computed line height, px
   */
  function glyphLines(art, made, from, to, lh) {
    /** @type {Array<{top: number, mid: number, bottom: number}>} */
    const out = [];
    for (const b of made.blocks) {
      const lo = Math.max(from, b.pos), hi = Math.min(to, b.pos + b.width);
      const el = b.kind === 'para' && hi > lo ? art.querySelector(`.run > [data-pos="${b.pos}"]`) : null;
      const range = el ? LAYER.rangeIn(art, { addr: made.addr, pos: lo, width: hi - lo }) : null;
      const q = el ? el.getBoundingClientRect() : null;
      if (!range || !q || q.height <= 0) continue;
      const pitch = q.height / Math.max(1, Math.round(q.height / lh));
      for (const r of range.getClientRects()) {
        if (!(r.width > 0 && r.height > 0 && r.height <= lh * 1.5)) continue;
        const top = q.top + Math.max(0, Math.floor((r.top + r.height / 2 - q.top) / pitch)) * pitch;
        out.push({ top, mid: top + pitch / 2, bottom: top + pitch });
      }
    }
    return out;
  }
  /**
   * A run in a reading scene's pane as the person meets it, read now through
   * T-LAYER's byte-span mapping over the pane's article and the blocks it was
   * made from (`madeOf`), apart from the scene's own measure: the line boxes
   * of its first and its last glyph, of the last glyph before it and of the
   * first after it, within 512 positions — each null where none stands — and
   * the article's line height. Null where the scene is not open.
   * @param {'a' | 'b'} side
   * @param {number} pos
   * @param {number} width
   */
  function sceneRun(side, pos, width) {
    const p = SCENE.pair(), pane = paneOf(side);
    const art = pane ? /** @type {HTMLElement | null} */ (pane.querySelector('article.dtext')) : null, made = art ? LAYER.madeOf(art) : null;
    if (!p || !art || !made) return null;
    const lh = parseFloat(getComputedStyle(art).lineHeight), blocks = made.blocks;
    const head = blocks.length ? blocks[0].pos : pos, foot = blocks.length ? blocks[blocks.length - 1].pos + blocks[blocks.length - 1].width : pos + width;
    const inside = glyphLines(art, made, pos, pos + width, lh), before = glyphLines(art, made, Math.max(head, pos - 512), pos, lh), after = glyphLines(art, made, pos + width, Math.min(foot, pos + width + 512), lh);
    return { first: inside[0] || null, last: inside[inside.length - 1] || null, prev: before[before.length - 1] || null, next: after[0] || null, lh };
  }
  /**
   * The characters of a stretch of a reading scene's pane as the person
   * meets them, read now from the DOM — its range's own text, the chrome
   * inside it (T-SPAN's `CHROME`) taken out, white space kept — apart from the
   * scene's own reading; null where the scene is not open or the stretch lies
   * in no block.
   * @param {'a' | 'b'} side
   * @param {number} from
   * @param {number} to
   */
  function sceneText(side, from, to) {
    const p = SCENE.pair(), pane = paneOf(side);
    const art = pane ? /** @type {HTMLElement | null} */ (pane.querySelector('article.dtext')) : null;
    const range = p && art && to > from ? LAYER.rangeIn(art, { addr: side === 'a' ? p.a : p.b, pos: from, width: to - from }) : null;
    if (!range) return null;
    const frag = range.cloneContents();
    for (const c of frag.querySelectorAll('.hairline, .pubmark, .sym, .edge')) c.remove();
    return frag.textContent;
  }
  /**
   * The reading scene's bands and lines as its last draw drew them, beside
   * its panes' visible rects and facing edges on screen (pane A's right, pane
   * B's left): each band's end beside its run read now (`sceneRun`) — the
   * scene draws a band at its extent, from its run's first line to its last,
   * dividing a line it shares with the band beside it at its middle, holding
   * an end inside its pane's visible height and clipping it where it passes
   * the pane's edge — and each line's end beside its passage's first line
   * read now (`sceneAt`), none for an end naming its document whole — the
   * scene sets each such end at its passage's line and moves it with its
   * pane's scroll, clips one whose line has left the pane at that pane's
   * edge, and stands a whole document's end at its pane's facing edge
   * (foundations §2.5; FP-26; FP-30). Every one apart from the scene's own
   * measure; the layout case holds every end to that.
   */
  function sceneTies() {
    const a = paneOf('a'), b = paneOf('b'), ra = a ? a.getBoundingClientRect() : null, rb = b ? b.getBoundingClientRect() : null;
    const around = { paneA: a ? paneRect(a) : null, paneB: b ? paneRect(b) : null, faceA: ra ? ra.right : null, faceB: rb ? rb.left : null };
    /** an end's passage's first line read now; none for an end naming its document whole */
    const lineOf = (/** @type {'a' | 'b'} */ side, /** @type {{pos: number, width: number, whole: boolean}} */ e) => (e.whole ? null : (sceneAt(side, e.pos, e.width) || { line: null }).line);
    return SCENE.ties().map((d) => (d.kind === 'band'
      ? { ...d, runA: sceneRun('a', d.a.pos, d.a.width), runB: sceneRun('b', d.b.pos, d.b.width), ...around }
      : { ...d, lineA: lineOf('a', d.a), lineB: lineOf('b', d.b), ...around }));
  }
  /** redraw the links card where it stands open at a document, as its own acts do after a change */
  function redrawCard(/** @type {string} */ addr) { if (LINKS.isOpen(addr)) LINKS.render(); }
  /**
   * S3's camera path: fn(u) moves the camera each frame for ms; the frames of
   * the phase summarized, its first two left out. The phase's frames are the
   * newest run the buffer holds under its name — every frame of a phase is
   * drawn and carries its name, and no frame either side of the run carries
   * it — found by name, never by index: the buffer drops its oldest frames at
   * its cap.
   */
  async function runPath(/** @type {string} */ name, /** @type {number} */ ms, /** @type {{kind: 'orbit', scale: number, ax?: number, by?: number, centre?: {x:number,y:number}} | {kind: 'sweep', from: number, to: number, centre?: {x:number,y:number}}} */ spec) {
    const centre = spec.centre || { x: CAM.cam.x, y: CAM.cam.y };
    const t0 = performance.now();
    deps.phase.name = name;
    const { VW, VH } = CAM.viewport();
    if (spec.kind === 'orbit') CAM.set({ x: centre.x, y: centre.y, scale: spec.scale });
    await new Promise((res) => {
      const step = () => {
        const u = (performance.now() - t0) / ms;
        if (u >= 1) return res(undefined);
        if (spec.kind === 'orbit') { const A = (VW / CAM.cam.scale) * (spec.ax ?? 0.55), B = (VH / CAM.cam.scale) * (spec.by ?? 0.55); CAM.cam.x = centre.x + A * Math.sin(6.283 * u); CAM.cam.y = centre.y + B * Math.sin(6.283 * 1.37 * u); }
        else { const g = 0.5 - 0.5 * Math.cos(6.283 * u); CAM.cam.scale = Math.exp(Math.log(spec.from) + (Math.log(spec.to) - Math.log(spec.from)) * g); CAM.cam.x = centre.x + 40 * Math.sin(12 * u); CAM.cam.y = centre.y; }
        CAM.clamp(); CAM.markDirty(); requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
    deps.phase.name = '';
    let end = deps.frames.length;
    while (end > 0 && deps.frames[end - 1].phase !== name) end--;
    let begin = end;
    while (begin > 0 && deps.frames[begin - 1].phase === name) begin--;
    return summarize(deps.frames.slice(begin + 2, end));
  }
  /** the box the focus ring's element is clamped to on screen (P-RENDER's `ringBox`): the visible view below the one line, inset by the ring's gap and half its stroke (P-REG's RING) */
  function ringBounds() {
    const s = CAM.visibleView(LINE.bottom()), i = RING.gap + RING.width / 2;
    return { x: s.x + i, y: s.y + i, w: s.w - 2 * i, h: s.h - 2 * i };
  }
  /**
   * Settled: the view's needs met, nothing read for it, the camera still, no
   * jump in the air or reaching (FP-25), no chrome opening on its reads
   * (O-HOST's `pending`: a card, or a face reading its clause before it
   * shows; FP-33), and no key held for a landing or being made there.
   */
  const settled = () => PUMP.inflightCount() === 0 && PUMP.pump() === 0 && !CAM.flying() && !GO.inAir() && !GO.isReaching() && !HOST.pending() && KEYS.holding() === 0;
  /** wait until the view's needs are met */
  async function settle(maxMs = 8000) {
    const t0 = performance.now();
    while (performance.now() - t0 < maxMs) {
      await new Promise((r) => setTimeout(r, 60));
      if (settled()) { await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))); return performance.now() - t0; }
    }
    return performance.now() - t0;
  }
  const api = {
    boot: deps.boot,
    model: {
      doc: (/** @type {string} */ addr) => { const d = REC.doc(addr); return { addr: d.addr, kind: d.kind, label: d.label, extent: d.extent, from: d.from, to: d.to, members: d.members, ended: d.ended, refused: d.refused, blocks: d.blocks.map((b) => ({ pos: b.pos, width: b.width, kind: b.kind, text: b.text, origin: b.origin })), origins: d.origins, links: [...d.links].sort(), linksRead: d.linksRead, meta: d.meta }; },
      text: (/** @type {string} */ addr, /** @type {number} */ p0, /** @type {number} */ p1) => REC.textBetween(addr, p0, p1),
      places: () => REC.places(), counts: () => REC.accounts().map((a) => ({ ...a, ...REC.countOf(a.account), links: LK.countAccount(a.account) })),
      indexState: () => REC.indexState(), floor: () => REC.floor(), links: () => REC.links(), link: (/** @type {string} */ a) => REC.link(a),
      session: () => REC.session(), board: () => REC.board(), health: () => REC.health(), mode: () => REC.mode(), daemon: () => REC.daemon(), device: () => REC.device(),
      snapshot: () => REC.snapshot(), feedRows: () => REC.feedRows(), rev: () => REC.rev(),
      loadWhole: (/** @type {string} */ addr) => PUMP.loadWhole(addr).then((d) => !!d),
      /** a stretch of a held text by identity, through its held image (M-REC's `identityOf`): none where the image does not cover it */
      identity: (/** @type {string} */ addr, /** @type {number} */ pos, /** @type {number} */ width) => REC.identityOf(addr, pos, width),
      /** what a feed row naming a document does to the model alone: its delivered state dropped and its reads asked again — reads alone, nothing written, no reader told */
      invalidate: (/** @type {string} */ addr) => { REC.invalidate(addr); PUMP.forget(addr); CAM.markDirty(); },
      /** a feed row taken as the feed hands one (M-PUMP's `takeRow`): the model, the view and a reading scene's panes kept fresh from it — reads alone, nothing written */
      feed: (/** @type {import('../bridge/shapes').FeedUpdate} */ update) => { PUMP.takeRow(update); CAM.markDirty(); },
    },
    mounted: (/** @type {string} */ addr) => { const rec = LAYER.mountedSet().get(addr); if (!rec) return null; const r = rec.el.getBoundingClientRect(); return { text: LAYER.mountedText(addr), rect: { x: r.left, y: r.top, w: r.width, h: r.height }, fs: rec.fs, lay: rec.lay }; },
    mountedAddrs: () => LAYER.mountedAddrs(),
    /** what stands of a document's article (FP-12): its parts, each a column and the run of its fold's lines [first, end) it holds, in their lines' order — the parts' boxes, by the same column and first line (`data-column`, `data-first`); null where no article of it stands */
    mountedLines: (/** @type {string} */ addr) => LAYER.mountedLines(addr),
    spanRects: (/** @type {string} */ addr, /** @type {number} */ pos, /** @type {number | null} */ width = null) => LAYER.spanRects(addr, pos, width),
    mirror: { item: (/** @type {number} */ i) => WALK.mirrorItem(i), size: () => WALK.mirrorSize(), index: () => WALK.mirrorIndex(), siblings: () => WALK.siblingsNow().map((n) => ({ kind: n.kind, addr: n.addr, pos: n.pos })) },
    view: { camera: () => CAM.view(), flying: () => CAM.flying(), focus: () => WALK.current(), ring: () => (RENDER.stats.ring ? { ...RENDER.stats.ring } : null), ringBounds, lod: () => lodOf(CAM.cam.scale), viewport: () => CAM.viewport(), set: (/** @type {{x:number,y:number,scale:number}} */ v) => { CAM.set(v); CAM.markDirty(); }, bounds: () => CAM.bounds() },
    /** the focus's owner as it stands: the ring's rule, whether the plane holds the focus, the regions holding it oldest first */
    focus: () => ({ ring: FOCUS.ringShown(), plane: FOCUS.planeHolds(), standing: FOCUS.standing() }),
    driftSample, overlapCheck, visible,
    beamAnchors, arrivalAnchors, barsOf, tailAnchors,
    /** a document's fold as the plane sets it: its size, step, room, outline and columns */
    fold: foldView,
    /** the middle of the line holding a position, across its column; the first column's centre for none (T-LAYER's `centreOf`) */
    centreOf: (/** @type {string} */ addr, /** @type {number | null} */ pos = null) => LAYER.centreOf(addr, pos),
    /** the position under a world point of a document's fold, null where its column holds no line naming one (T-LAYER's `posAt`) */
    posAt: (/** @type {string} */ addr, /** @type {number} */ x, /** @type {number} */ y) => LAYER.posAt(addr, x, y),
    /** the labels the beams' last frame set, one per bundle whose label stands whole in the visible view: the document it leaves, its far document, its text, whether it ends in a stub, and its rect on screen */
    beamLabels: () => BM.labels(),
    /** the continuations the last frame drew as marks, each its members, the lines it set of its count — of the ringed member's name and place in their place — and of its newest member's label, and its newest target on screen, null where none stands */
    residues: () => RENDER.stats.residueMarks.slice(),
    /** the mid connections the last frame drew, each between two places — a document, or a mark's `key` — with its count and the count the label pass set on its stroke (`label`, null where it set none), and where one place stands out of the visible view its stub: the place it is bound for, the centre it leaves, its cut, its triangle, its hue and alpha */
    connections: () => RENDER.stats.connections.slice(),
    /** the tails the last frame drew: each one's site, its form — leaving a box or a mark, or a passage's line — the place and the documents it leaves, its links and their far documents, where its stroke leaves and ends, the line it leaves at, and the lines the label pass set at its end */
    tails: () => RENDER.stats.tails.map((tl) => ({ ...tl })),
    /** the labels the last frame set, in the order they were set — a connection's count under its two places, `a|b` sorted — the trail's pip numbers last */
    labels: () => RENDER.stats.labels.slice(),
    /** the parts of labels the last frame left out, each with the rule that left it out */
    labelsLeftOut: () => RENDER.stats.labelsLeftOut.slice(),
    runPath, settle,
    frames: () => deps.frames.slice(),
    bridge: { calls: () => PORT.callLog(), adapter: () => PORT.adapterName(), stream: () => PORT.streamState() },
    pump: { missing: () => PUMP.pump(), inflight: () => PUMP.inflightCount(), refusals: () => PUMP.refusalsMet(), retries: () => PUMP.retriesPending() },
    settled,
    lineAct: () => LINE.act(),
    trail: () => ({ entries: TRAIL.all(), cursor: TRAIL.cursorIndex(), numbered: TRAIL.numbered().map((r) => ({ n: r.n, addr: r.entry.addr, pos: r.entry.pos, current: r.current })) }),
    line: () => ({ text: LINE.text(), state: LINE.state(), address: LINE.addressDisplay() }),
    overlay: () => ({ id: HOST.currentState() ? HOST.currentState()?.id : null, kind: HOST.currentKind(), text: HOST.text() }),
    /** a walk's moment raised as the shell's `moment` event raises one (O-FACES' `moment`; FP-28), and the folded moments the one line's walks' segments are, each its walk and its words (`folded`) */
    moments: { raise: (/** @type {import('../bridge/shapes').MomentEvent} */ m) => { FACES.moment(m); return true; }, folded: () => FACES.folded() },
    selection: () => SEL.selected(),
    /** the platform's own selection: whether it is collapsed, whether it runs backward (its focus point before its anchor, read from the platform, never from the page), and the span it covers in a mounted article (null outside one) */
    platformSelection: () => {
      const s = window.getSelection();
      const collapsed = !s || s.rangeCount === 0 || s.isCollapsed;
      let backward = false;
      if (s && !collapsed && s.anchorNode && s.focusNode) { const at = document.createRange(); at.setStart(s.anchorNode, s.anchorOffset); backward = at.comparePoint(s.focusNode, s.focusOffset) < 0; }
      return { collapsed, backward, span: LAYER.spanOfSelection() };
    },
    /** the copy door: the copy event run against a stub clipboard; the flavors set, by name */
    copy: () => {
      /** @type {Record<string, string>} */
      const data = {};
      const b = REC.board();
      const span = LAYER.onCopy({ clipboardData: { setData: (/** @type {string} */ k, /** @type {string} */ v) => { data[k] = v; } }, preventDefault() {} }, b ? b.origin : '');
      return { span, data };
    },
    reveal: (/** @type {string} */ addr) => { const r = LK.state(addr); const o = r.lens.owners, ty = r.lens.types; return { stage: r.stage, others: r.others, lens: { owners: o ? [...o] : null, types: ty ? [...ty] : null, endorsed: r.lens.endorsed } }; },
    links: {
      shown: (/** @type {string} */ addr) => LK.shown(addr).map((s) => ({ link: s.link.addr, end: s.end, key: s.key, pos: s.pos, width: s.width, run: s.run ? { ...s.run } : null, far: s.far, linker: s.linker, value: s.mark.value, hue: s.mark.hue })),
      countDoc: (/** @type {string} */ a) => LK.countDoc(a), countAccount: (/** @type {string} */ a) => LK.countAccount(a), visited: (/** @type {string} */ l) => LK.visited(l),
      classify: (/** @type {string} */ l) => { const x = REC.link(l); return x ? LK.classify(x) : null; },
      /** does a document's composition draw the link — LK's `draws`, the one rule which links show, a link standing at a mark joining two documents where either draws it; false where the model holds no such link */
      draws: (/** @type {string} */ l, /** @type {string} */ addr) => { const x = REC.link(l); return !!x && LK.draws(x, addr); },
      /** is the link's end drawn at a document tailed — its far document one the plane draws nowhere (LK's `tailed`); null where the document draws no end of it */
      tailed: (/** @type {string} */ addr, /** @type {string} */ l) => { const s = LK.shown(addr).find((x) => x.link.addr === l); return s ? LK.tailed(s) : null; },
      /** the link's far end named as its tail, its card and its mirror item name it (LK's `farLabel`), from its end drawn at a document; null where the document draws no end of it */
      farLabel: (/** @type {string} */ addr, /** @type {string} */ l) => { const s = LK.shown(addr).find((x) => x.link.addr === l); return s ? LK.farLabel(s) : null; },
      reveal: (/** @type {string} */ addr, /** @type {1 | 2 | 3} */ stage) => { LK.reveal(addr, stage); LAYER.bump(); CAM.markDirty(); redrawCard(addr); },
      setOthers: (/** @type {string} */ addr, /** @type {boolean} */ on) => { LK.setOthers(addr, on); LAYER.bump(); CAM.markDirty(); redrawCard(addr); },
      hide: (/** @type {string} */ addr) => { LK.hide(addr); LAYER.bump(); CAM.markDirty(); redrawCard(addr); },
      wholeLinks: (/** @type {string} */ a) => LK.wholeLinks(a).map((l) => l.addr),
      othersTouching: (/** @type {string} */ a) => LK.othersTouching(a).map((l) => l.addr),
    },
    walk: { key: (/** @type {'down' | 'up' | 'in' | 'out' | 'first' | 'last'} */ k) => WALK.key(k), enter: () => WALK.enter() },
    dismiss: () => HOST.dismiss(),
    esc: () => KEYS.esc(),
    mounts: () => LAYER.mounts(),
    beams: () => BM.count(),
    /** the teleports; `leapTo`'s third argument names the runs of the span landed on — every run a far end projects to, `pos` at one of them — the link followed to it and the passage they hold by identity, the landing then marked and its runs labelled as a follow's are, or the passage the LEAP carries, re-projected and marked at the landing; `shownIn` the version a document's box shows (FP-22); `step` and `stepTo` the step among an arrival's runs (FP-21) */
    go: { leapTo: (/** @type {string} */ a, /** @type {number | null} */ pos, /** @type {{runs?: import('../nav/go.js').Run[] | null, link?: string | null, passage?: import('../model/records.js').ISpan | null, carry?: import('../nav/go.js').Carry | null}} */ o = {}) => GO.leapTo(a, { pos: pos ?? null, runs: o.runs ?? null, link: o.link ?? null, passage: o.passage ?? null, carry: o.carry ?? null, how: 'leap' }).then(() => true), follow: (/** @type {string} */ addr, /** @type {string} */ link) => { const s = LK.shown(addr).find((x) => x.link.addr === link); return s ? GO.follow(s).then(() => true) : Promise.resolve(false); }, home: () => GO.home(), wholeBoard: () => GO.wholeBoard(), back: () => GO.back(), forward: () => GO.forward(), toTrailEntry: (/** @type {number} */ n) => GO.toTrailEntry(n), shownIn: (/** @type {string} */ a) => GO.shownIn(a), inAir: () => GO.inAir(), arrival: () => GO.arrivalMark(), landing: () => GO.landing(), described: () => GO.described(), landingAct: (/** @type {'beside' | 'version' | 'again' | 'next' | 'previous'} */ which) => { GO.landingAct(which); return true; }, steps: () => GO.steps(), step: (/** @type {1 | -1} */ dir) => GO.step(dir), stepTo: (/** @type {number} */ i) => GO.stepTo(i), endArrival: () => GO.endArrival() },
    /** a landing's line as it stands (FP-21): its words, its acts, its rect on screen, whether the scene covers it, and the labels set for its other runs; null where none stands */
    landingLine: () => LANDING.shown(),
    leap: { open: () => LEAP.open(), close: () => LEAP.close(), rows: () => LEAP.currentRows(), isOpen: () => LEAP.isOpen() },
    cards: {
      links: (/** @type {string} */ a) => LINKS.show(a),
      anatomy: (/** @type {string} */ addr, /** @type {string} */ link) => { const s = LK.shown(addr).find((x) => x.link.addr === link); return s ? ANATOMY.open(s, null).then(() => true) : Promise.resolve(false); },
      wrote: (/** @type {string} */ addr, /** @type {number} */ pos) => PROV.wrote(addr, pos).then(() => true),
      uses: (/** @type {string} */ addr, /** @type {number} */ pos) => PROV.uses(addr, pos).then(() => true),
      versions: (/** @type {string} */ addr, /** @type {number | null} */ pos, /** @type {number | null} */ width = null) => VERSIONS.open(addr, pos, null, width).then(() => true),
      trailList: () => { TRAILLIST.open(false); return true; },
    },
    scene: {
      /** the scene opened on two documents as a step on the trail, the second the one opened beside, with the passage its opener holds (N-GO's `toScene`; SC's `Held`), and its own end, a Back from its entry (N-GO's `closeScene`) */
      open: (/** @type {string} */ a, /** @type {string} */ b, /** @type {import('../scene/scene.js').Held} */ held = {}) => GO.toScene(a, b, held), close: () => GO.closeScene(), isOpen: () => SCENE.isOpen(), pair: () => SCENE.pair(),
      /** its runs of shared identity, contiguous pairs merged, and the two ends it set level */
      pairs: () => SCENE.pairs(),
      at: sceneAt, ties: sceneTies,
      /** the facing edges a whole document's ends meet, as the last draw drew them (FP-30): each its side, its links, its x and its visible top and bottom on screen, its hue and whether it is dashed */
      edges: () => SCENE.edges(),
      /** the stop at a band's clipped end, as the last draw placed it (FP-20): whether it stands, the shared passages it steps through, the one it goes to now and the one after, its name, its count and its rect on screen; null where no scene stands */
      stop: () => SCENE.stop(),
      /** a stop drawn only by the panes' `compare` the reader left from, as it stands returned (FP-20, FP-34, FP-21): its kind and key, its element's id, whether it is shown, its name, its count and whether that is being read, its rect on screen, what the answer told and its words, whether an act on it waits, whether the reader moved on, the overlay it shows; null where none stands */
      returned: () => SCENE.returned(),
      /** the strokes between the bands in view, as the last draw drew them (FP-26): each its key, its ends and halves on screen, its changes, its button's point, id, name, count and rect */
      strokes: () => SCENE.strokes(),
      /** a stretch of a pane's characters read from the DOM, apart from the scene's own reading (`sceneText`) */
      text: sceneText,
      /** the last measure's figures (FP-18): the runs it read, the bands and strokes it made of them, and its time in ms on this machine */
      measured: () => SCENE.measured(),
      /** each pane as it stands (FP-23): the address it was opened on, the record its text was made from, the address its acts name and the one it shows, its kind, its version, the chain's count, its corner's act, what its corner says it lacks, and the blocks its article was made from */
      panes: () => SCENE.panes(),
      /** is a pane being set again: an act on the panes waits for it */
      updating: () => SCENE.updating(),
      /** a version of a pane's document read in its place, as its corner's act reads the one it offers (SC's `readIn`) — reads alone */
      read: (/** @type {'a' | 'b'} */ side, /** @type {number} */ k) => { SCENE.readIn(side, k); return true; },
    },
    select: (/** @type {string} */ addr, /** @type {number} */ pos, /** @type {number | null} */ width = null) => SEL.select(addr, pos, width),
    strings: { pinned: () => pinned(), lacking: () => lacking() },
    thresholds: THRESHOLDS,
    /** the scale at which a document's em — the size the page sets it at (T-LAYER's fold) — is `em` px, or its box `docPx` px */
    scaleFor: (/** @type {string} */ addr, /** @type {'em' | 'doc'} */ kind, /** @type {number} */ v) => (kind === 'doc' ? v / docBox(addr).w : v / LAYER.foldOf(REC.doc(addr)).fs),
    boxOf: (/** @type {string} */ addr) => docBox(addr), accountCell: (/** @type {string} */ a) => accountCell(a), boardCell: (/** @type {string} */ b) => boardCell(b), boardLabelCell: (/** @type {string} */ b) => boardLabelCell(b), depthOf: (/** @type {string} */ a) => depthOfDoc(a),
    constants: { DOC_W, STANDARD_FS, MEASURE_CPL, COLUMN_LINES, GUTTER, EDGE, EDGE_GAP, READING_PX: CAM.READING_PX, LOD_FAR_LO, LOD_FAR_HI, LOD_TXT_LO, LOD_TXT_HI, MOUNT_EM, UNMOUNT_EM, MOUNTS_PER_FRAME },
    /** the measure in force (P-CAM's fit; FP-26): the characters every document's line is set at, and whether a column at the reading size stands beside its corner compact */
    measure: () => ({ ...CAM.fit() }),
    /** a document's corner as T-LAYER placed it: the column it stands beside and whether it stands compact; null where none stands */
    corner: (/** @type {string} */ addr) => LAYER.cornerAt(addr),
    /** a document's label T-LAYER held below the one line over its mounted article (FP-26): its parts' words, its rect on screen and whether it takes the pointer; null where none stands */
    heldLabel: (/** @type {string} */ addr) => LAYER.heldOf(addr),
    /** the places the one line names (L-LINE's `named`; FP-26): its board, its account and its document by its box */
    named: () => LINE.named(),
    /** a document's first line as every surface naming it reads it (T-LAYER's `firstOf`, by T-ARTICLE's one rule), the client's words in its place bracketed, and the lead its label sets before its address (T-LAYER's `firstLine`): its first line with a draft's mark; '' where none is known */
    firstLine: (/** @type {string} */ addr) => ({ first: LAYER.firstOf(REC.doc(addr)).map((r) => r.text).join(''), lead: LAYER.firstLine(REC.doc(addr)) }),
    /** P-REG's address size and weight, at which the harness measures an address's dots apart (FP-18) */
    address: () => ({ ...ADDRESS }),
    /** where a reading view of a document at a position centres, framing the column with its corner and its edge (T-LAYER's `frameOf`) */
    frameOf: (/** @type {string} */ addr, /** @type {number | null} */ pos = null) => LAYER.frameOf(addr, pos),
    refresh: async () => { const ts = /** @type {number[]} */ ([]); await new Promise((res) => { const step = (/** @type {number} */ t) => { ts.push(t); if (ts.length < 60) requestAnimationFrame(step); else res(undefined); }; requestAnimationFrame(step); }); const iv = []; for (let i = 1; i < ts.length; i++) iv.push(ts[i] - ts[i - 1]); return r2(1000 / Math.max(0.1, pct(iv, 50))); },
  };
  /** @ts-ignore — the driver's door */
  window.__skep = api;
  return api;
}
