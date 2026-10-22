// G-HOOKS — the gate's read-only hooks (the structure record §3.2 "G-HOOKS",
// §6.3; S-22 (a): loaded by `import()` under `?gate=` alone). ENGINE-BOUND.
// `window.__skep`: the model's held records, the mounted articles' text, the
// mirror's items, the camera and the focus, the focus ring the canvas drew
// (`view.ring`: the box on screen it outlined, null where it drew none),
// S1's `driftSample` and `overlapCheck` (the measuring code moved into the
// page), the visibility oracle `visible`, the beams' anchors beside their
// spans' own rects and the labels the beams set at their bundles' ends
// (`beamLabels`), the arrival mark's outline beside its link's marked words
// and its article (`arrivalAnchors`; the `go.leapTo` door lands as a follow
// does where it names a link, and as a move to another arrangement of the
// same material does where it carries a passage), the handoff
// (`barsOf`: the canvas's own bars for a document beside its mounted
// article's blocks), the reading scene's runs and the ends it set level
// (`scene.pairs`), a passage's line in one of its panes (`scene.at`) and its
// bands and lines beside their passages' lines (`scene.ties`), the
// continuations' marks the canvas drew (`residues`:
// each one's count, newest member, members, the lines set on it and its
// screen rect), the mid connections it drew between places, each with its
// count and the count set on its stroke, each one bound for a place out of
// view with its stub at the view's border (`connections`), a document's fold
// — its size, its step and its columns on the plane — where a position
// stands in it and which position stands under a point of the plane (`fold`,
// `centreOf`, `posAt`), the labels it set
// (`labels`: each one's kind, place, lines — their text, size and screen
// rect — and the room its place gave it, the connections' counts and the
// trail's pip numbers among them) and the parts of labels it left out with
// the rule that left each out (`labelsLeftOut`), S3's camera paths
// (`runPath`) and the frame buffer —
// each frame's count of documents drawn as bars or a label over their own
// standing text, and yielded to text that does not stand, line by line, its
// bars drawn at the readable em (`barred`), and what the text layer stood:
// its new mounts, its articles in the mount band and their lines — what
// stands of a document's article, part by part (`mountedLines`), the bridge
// client's own call
// log, the settle signal, the trail, the line's and the overlay's text, the
// selection's span beside the platform's own and the way the platform's runs,
// the copy door (the copy event
// run against a stub clipboard, its flavors read back), the invalidation door
// (`model.invalidate`: what a feed row naming a document does to what the
// page holds of it — its delivered state dropped, its reads asked again,
// reads alone), the strings. The app
// installs it with its loop's frame buffer. Nothing here is shipped chrome;
// nothing posts anywhere.
// THE ORACLES MEASURE WHAT A PERSON MEETS, never what the page set: the
// containment check holds an article's content to the column that holds it,
// to the clip the page draws and to its document's box, and each corner to
// the room beside it, `visible`
// says whether an element the DOM holds is shown (inside its clip and the
// viewport), and a beam's endpoint and the arrival mark's outline are held to
// the client rects of their link's marked words, read from the article apart
// from the beams' and the canvas's own sets.
// The doors that move the reveal chain redraw the links card where it stands
// open, as the card's own acts do, so a shot after a door shows the state it
// set. Carries: S1's `driftSample`, `overlapCheck`, `canvasSpanRect`/
// `domSpanRects`; S3's §17 `runPath`/`summarize`/`settle` and its
// `THRESHOLDS`; the wireframe's §15 diagnostics.

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
import * as LK from '../links/links.js';
import * as BM from '../beams/beams.js';
import * as GO from '../nav/go.js';
import * as LEAP from '../nav/leap.js';
import * as LINKS from '../overlays/links-card.js';
import * as ANATOMY from '../overlays/anatomy-card.js';
import * as PROV from '../overlays/provenance.js';
import * as VERSIONS from '../overlays/versions.js';
import * as TRAILLIST from '../overlays/trail-list.js';
import * as KEYS from '../nav/keys.js';
import * as FOCUS from '../nav/focus.js';
import * as SCENE from '../scene/scene.js';
import { docBox, accountCell, boardCell, DOC_W, depthOfDoc } from '../plane/projection.js';
import { STANDARD_FS, MEASURE_CPL, COLUMN_LINES, GUTTER, LINE_H, boundsOf, outlineRects, firstRow } from '../plane/layout.js';
import { lodOf, LOD_FAR_LO, LOD_FAR_HI, LOD_TXT_LO, LOD_TXT_HI, MOUNT_EM, UNMOUNT_EM, MOUNTS_PER_FRAME } from '../plane/lod.js';
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
 * @property {number} barred the bars the canvas drew for documents at the readable em or above: none, by issue #122's rule
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

/** S3's threshold set: a shot at each LOD threshold (the seats' material) */
export const THRESHOLDS = [
  ['far-clusters', 5, 'doc'], ['far-mid-lower', LOD_FAR_LO, 'doc'], ['far-mid-upper', LOD_FAR_HI, 'doc'], ['mid-extents', 90, 'doc'], ['mid-outline', 260, 'doc'],
  ['mount', MOUNT_EM, 'em'], ['mid-near-lower', LOD_TXT_LO, 'em'], ['mid-near-upper', LOD_TXT_HI, 'em'], ['near-readable', 14, 'em'],
];

/** S3's `summarize` over a frame window */
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
   * column that holds it (issue #15: the measure, its own length), against
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
      if (!corner) { if (rec.corner && rec.fs * CAM.cam.scale >= LOD_TXT_LO) missing.push(rec.d.addr); continue; }
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
   * the `ch` of the face the platform sets it in — and down, the column's
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
   * The beam endpoints, each beside an oracle read apart from the beams' own
   * set: the client rects of its link's marked words in the near document's
   * mounted article (every line they occupy) and the right edge of the part
   * of its block that holds the line it leaves at — the column's, where the
   * block is split across columns (issue #15). A beam leaves the text at its
   * span's own line, from the place's edge (foundations §2.1; S1 Q1): the
   * layout case holds each endpoint's y to one of those line rects and its x
   * to the edge.
   */
  function beamAnchors() {
    return BM.anchors().map((a) => {
      const rec = LAYER.mountedSet().get(a.near);
      const words = rec ? [...rec.el.querySelectorAll(`.lip[data-links~="${a.link}"]`)].flatMap((w) => [...w.getClientRects()].map((r) => ({ x: r.left, y: r.top, w: r.width, h: r.height }))) : [];
      const mid = a.rect.y + a.rect.h / 2;
      const part = rec ? [...rec.el.querySelectorAll('.run > .sp')].map(rectOf).find((q) => q.y - 0.5 <= mid && mid <= q.y + q.h + 0.5 && q.x <= a.rect.x + a.rect.w && a.rect.x <= q.x + q.w) : null;
      return { ...a, words, edge: part ? part.x + part.w : null };
    });
  }
  /**
   * The arrival mark — its runs — and its outline as the last frame drew it
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
   * The handoff (foundations §2.4: the bars become text and no line moves;
   * S1 Q7; issue #15: mid scale greeks the columns the mount sets): the
   * canvas's own bars for a document — the fold P-RENDER draws below the
   * mount, at the camera as it stands — block by block within each run of
   * lines it groups them in: each part of its article standing, where its
   * article stands in that fold (issue #122: a document stands by line), else
   * each column — each group its column, the first line of its run (`part`),
   * its first line's top on screen, its height and its count of lines; beside
   * the mounted article's block parts as the person meets them: each one's
   * column and the first line of the part it stands in, the character it
   * starts at, its top on screen, its height, and its height in its own line
   * boxes (its computed line height at the article's scale — a heading's
   * lines are a heading's, not the body's). A part the article draws as a
   * withheld run's face is named so. Null where the document's text has not
   * arrived.
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
   * A document's fold as the plane sets it (issue #15): its size, its step,
   * its columns across, its room on the plane, its outline — its bounds, the
   * disjoint rects that make it up and its first row, where its label stands —
   * and each column — its text box in world units, its count of lines,
   * whether it is estimated.
   * @param {string} addr
   */
  function foldView(addr) {
    const f = LAYER.foldOf(REC.doc(addr)), box = docBox(addr), b = boundsOf(f), r0 = firstRow(f);
    const at = (/** @type {{x: number, y: number, w: number, h: number}} */ r) => ({ x: box.x + r.x, y: box.y + r.y, w: r.w, h: r.h });
    return {
      addr, fs: f.fs, step: f.step, across: f.across, lines: f.lines.length,
      room: { x: box.x, y: box.y, w: box.w, h: box.h }, outline: at(b), rects: outlineRects(f).map(at), row: at(r0),
      columns: f.columns.map((c) => ({ x: box.x + c.x, y: box.y + c.y, w: c.w, h: c.h, n: c.n, estimated: c.estimated })),
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
   * The reading scene's bands and lines as its last draw drew them, each end
   * beside its passage's first line read now (`sceneAt`), apart from the
   * scene's own measure, and beside its pane's visible rect: the scene sets
   * each end at its passage's line and moves it with its pane's scroll, and
   * clips one whose line has left the pane at that pane's edge (foundations
   * §2.5); the layout case holds every end to that.
   */
  function sceneTies() {
    const a = paneOf('a'), b = paneOf('b');
    return SCENE.ties().map((d) => ({ ...d, lineA: (sceneAt('a', d.a.pos, d.a.width) || { line: null }).line, lineB: (sceneAt('b', d.b.pos, d.b.width) || { line: null }).line, paneA: a ? paneRect(a) : null, paneB: b ? paneRect(b) : null }));
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
  /** wait until the view's needs are met */
  async function settle(maxMs = 8000) {
    const t0 = performance.now();
    while (performance.now() - t0 < maxMs) {
      await new Promise((r) => setTimeout(r, 60));
      if (PUMP.inflightCount() === 0 && PUMP.pump() === 0 && !CAM.flying()) { await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))); return performance.now() - t0; }
    }
    return performance.now() - t0;
  }
  const api = {
    boot: deps.boot,
    model: {
      doc: (/** @type {string} */ addr) => { const d = REC.doc(addr); return { addr: d.addr, kind: d.kind, label: d.label, extent: d.extent, from: d.from, to: d.to, members: d.members, refused: d.refused, blocks: d.blocks.map((b) => ({ pos: b.pos, width: b.width, kind: b.kind, text: b.text, origin: b.origin })), origins: d.origins, links: [...d.links].sort(), linksRead: d.linksRead, meta: d.meta }; },
      text: (/** @type {string} */ addr, /** @type {number} */ p0, /** @type {number} */ p1) => REC.textBetween(addr, p0, p1),
      places: () => REC.places(), counts: () => REC.accounts().map((a) => ({ ...a, ...REC.countOf(a.account), links: LK.countAccount(a.account) })),
      indexState: () => REC.indexState(), floor: () => REC.floor(), links: () => REC.links(), link: (/** @type {string} */ a) => REC.link(a),
      session: () => REC.session(), board: () => REC.board(), health: () => REC.health(), mode: () => REC.mode(), daemon: () => REC.daemon(), device: () => REC.device(),
      snapshot: () => REC.snapshot(), feed: () => REC.feedRows(), rev: () => REC.rev(),
      loadWhole: (/** @type {string} */ addr) => PUMP.loadWhole(addr).then((d) => !!d),
      /** what a feed row naming a document does to what the page holds of it: its delivered state dropped and its reads asked again — reads alone, nothing written */
      invalidate: (/** @type {string} */ addr) => { REC.invalidate(addr); PUMP.forget(addr); CAM.markDirty(); },
    },
    mounted: (/** @type {string} */ addr) => { const rec = LAYER.mountedSet().get(addr); if (!rec) return null; const r = rec.el.getBoundingClientRect(); return { text: LAYER.mountedText(addr), rect: { x: r.left, y: r.top, w: r.width, h: r.height }, fs: rec.fs, lay: rec.lay }; },
    mountedAddrs: () => LAYER.mountedAddrs(),
    /** what stands of a document's article (issue #122: a document stands by line): its parts, each a column and the run of its fold's lines [first, end) it holds, in their lines' order — the parts' boxes, by the same column and first line (`data-column`, `data-first`); null where no article of it stands */
    mountedLines: (/** @type {string} */ addr) => LAYER.mountedLines(addr),
    spanRects: (/** @type {string} */ addr, /** @type {number} */ pos, /** @type {number | null} */ width = null) => LAYER.spanRects(addr, pos, width),
    mirror: { item: (/** @type {number} */ i) => WALK.mirrorItem(i), size: () => WALK.mirrorSize(), index: () => WALK.mirrorIndex(), siblings: () => WALK.siblingsNow().map((n) => ({ kind: n.kind, addr: n.addr, pos: n.pos })) },
    view: { camera: () => CAM.view(), focus: () => WALK.current(), ring: () => (RENDER.stats.ring ? { ...RENDER.stats.ring } : null), lod: () => lodOf(CAM.cam.scale), viewport: () => CAM.viewport(), set: (/** @type {{x:number,y:number,scale:number}} */ v) => { CAM.set(v); CAM.markDirty(); }, bounds: () => CAM.bounds() },
    /** the focus's owner as it stands: the ring's rule, whether the plane holds the focus, the regions holding it oldest first */
    focus: () => ({ ring: FOCUS.ringShown(), plane: FOCUS.planeHolds(), standing: FOCUS.standing() }),
    driftSample, overlapCheck, visible,
    beamAnchors, arrivalAnchors, barsOf,
    /** a document's fold as the plane sets it: its size, step, room, outline and columns */
    fold: foldView,
    /** where a reading view of a document at a position centres: the line holding it, across its column; the first column's centre for none (T-LAYER's `centreOf`) */
    centreOf: (/** @type {string} */ addr, /** @type {number | null} */ pos = null) => LAYER.centreOf(addr, pos),
    /** the position under a world point of a document's fold, null where its column holds no line naming one (T-LAYER's `posAt`) */
    posAt: (/** @type {string} */ addr, /** @type {number} */ x, /** @type {number} */ y) => LAYER.posAt(addr, x, y),
    /** the labels the beams' last frame set, one per bundle whose label stands whole in the visible view: the document it leaves, its far document, its text, whether it ends in a stub, and its rect on screen */
    beamLabels: () => BM.labels(),
    /** the continuations the last frame drew as marks */
    residues: () => RENDER.stats.residueMarks.slice(),
    /** the mid connections the last frame drew, each between two places — a document, or a mark's `key` — with its count and the count the label pass set on its stroke (`label`, null where it set none), and where one place stands out of the visible view its stub: the place it is bound for, the centre it leaves, its cut, its triangle, its hue and alpha */
    connections: () => RENDER.stats.connections.slice(),
    /** the labels the last frame set, in the order they were set — a connection's count under its two places, `a|b` sorted — the trail's pip numbers last */
    labels: () => RENDER.stats.labels.slice(),
    /** the parts of labels the last frame left out, each with the rule that left it out */
    labelsLeftOut: () => RENDER.stats.labelsLeftOut.slice(),
    runPath, settle,
    frames: () => deps.frames.slice(),
    bridge: { calls: () => PORT.callLog(), adapter: () => PORT.adapterName(), stream: () => PORT.streamState() },
    pump: { missing: () => PUMP.pump(), inflight: () => PUMP.inflightCount(), refusals: () => PUMP.refusalsMet(), retries: () => PUMP.retriesPending() },
    settled: () => PUMP.inflightCount() === 0 && PUMP.pump() === 0 && !CAM.flying(),
    lineAct: () => LINE.act(),
    trail: () => ({ entries: TRAIL.all(), cursor: TRAIL.cursorIndex(), numbered: TRAIL.numbered().map((r) => ({ n: r.n, addr: r.entry.addr, pos: r.entry.pos, current: r.current })) }),
    line: () => ({ text: LINE.text(), state: LINE.state(), address: LINE.addressDisplay() }),
    overlay: () => ({ id: HOST.currentState() ? HOST.currentState()?.id : null, kind: HOST.currentKind(), text: HOST.text() }),
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
      shown: (/** @type {string} */ addr) => LK.shown(addr).map((s) => ({ link: s.link.addr, end: s.end, pos: s.pos, width: s.width, far: s.far, linker: s.linker, value: s.mark.value, hue: s.mark.hue })),
      countDoc: (/** @type {string} */ a) => LK.countDoc(a), countAccount: (/** @type {string} */ a) => LK.countAccount(a), visited: (/** @type {string} */ l) => LK.visited(l),
      classify: (/** @type {string} */ l) => { const x = REC.link(l); return x ? LK.classify(x) : null; },
      /** does a document's composition draw the link — LK's `draws`, the one rule which links show, a link standing at a mark joining two documents where either draws it; false where the model holds no such link */
      draws: (/** @type {string} */ l, /** @type {string} */ addr) => { const x = REC.link(l); return !!x && LK.draws(x, addr); },
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
    /** the teleports; `leapTo`'s third argument names the runs of the span landed on — every run a far end projects to, `pos` at one of them — and the link followed to it, the landing then marked as a follow's is, or the passage the LEAP carries, re-projected and marked at the landing */
    go: { leapTo: (/** @type {string} */ a, /** @type {number | null} */ pos, /** @type {{runs?: import('../nav/go.js').Run[] | null, link?: string | null, carry?: import('../text/span.js').Span | null}} */ o = {}) => GO.leapTo(a, { pos: pos ?? null, runs: o.runs ?? null, link: o.link ?? null, carry: o.carry ?? null, how: 'leap' }).then(() => true), follow: (/** @type {string} */ addr, /** @type {string} */ link) => { const s = LK.shown(addr).find((x) => x.link.addr === link); return s ? GO.follow(s).then(() => true) : Promise.resolve(false); }, home: () => GO.home(), wholeBoard: () => GO.wholeBoard(), back: () => GO.back(), forward: () => GO.forward(), toTrailEntry: (/** @type {number} */ n) => GO.toTrailEntry(n), arrival: () => GO.arrivalMark() },
    leap: { open: () => LEAP.open(), close: () => LEAP.close(), rows: () => LEAP.currentRows(), isOpen: () => LEAP.isOpen() },
    cards: {
      links: (/** @type {string} */ a) => LINKS.show(a),
      anatomy: (/** @type {string} */ addr, /** @type {string} */ link) => { const s = LK.shown(addr).find((x) => x.link.addr === link); return s ? ANATOMY.open(s, null).then(() => true) : Promise.resolve(false); },
      wrote: (/** @type {string} */ addr, /** @type {number} */ pos) => PROV.wrote(addr, pos).then(() => true),
      uses: (/** @type {string} */ addr, /** @type {number} */ pos) => PROV.uses(addr, pos).then(() => true),
      versions: (/** @type {string} */ addr, /** @type {number | null} */ pos) => VERSIONS.open(addr, pos, null).then(() => true),
      trailList: () => { TRAILLIST.open(false); return true; },
    },
    scene: {
      open: (/** @type {string} */ a, /** @type {string} */ b) => SCENE.open(a, b), close: () => SCENE.close(), isOpen: () => SCENE.isOpen(), pair: () => SCENE.pair(),
      /** its runs of shared identity, contiguous pairs merged, and the two ends it set level */
      pairs: () => SCENE.pairs(),
      at: sceneAt, ties: sceneTies,
    },
    select: (/** @type {string} */ addr, /** @type {number} */ pos, /** @type {number | null} */ width = null) => SEL.select(addr, pos, width),
    strings: { pinned: () => pinned(), lacking: () => lacking() },
    thresholds: THRESHOLDS,
    /** the scale at which a document's em — the size the page sets it at (T-LAYER's fold) — is `em` px, or its box `docPx` px */
    scaleFor: (/** @type {string} */ addr, /** @type {'em' | 'doc'} */ kind, /** @type {number} */ v) => (kind === 'doc' ? v / docBox(addr).w : v / LAYER.foldOf(REC.doc(addr)).fs),
    boxOf: (/** @type {string} */ addr) => docBox(addr), accountCell: (/** @type {string} */ a) => accountCell(a), boardCell: (/** @type {string} */ b) => boardCell(b), depthOf: (/** @type {string} */ a) => depthOfDoc(a),
    constants: { DOC_W, STANDARD_FS, MEASURE_CPL, COLUMN_LINES, GUTTER, LOD_FAR_LO, LOD_FAR_HI, LOD_TXT_LO, LOD_TXT_HI, MOUNT_EM, UNMOUNT_EM, MOUNTS_PER_FRAME },
    refresh: async () => { const ts = /** @type {number[]} */ ([]); await new Promise((res) => { const step = (/** @type {number} */ t) => { ts.push(t); if (ts.length < 60) requestAnimationFrame(step); else res(undefined); }; requestAnimationFrame(step); }); const iv = []; for (let i = 1; i < ts.length; i++) iv.push(ts[i] - ts[i - 1]); return r2(1000 / Math.max(0.1, pct(iv, 50))); },
  };
  /** @ts-ignore — the driver's door */
  window.__skep = api;
  return api;
}
