// G-HOOKS — the gate's read-only hooks (the structure record §3.2 "G-HOOKS",
// §6.3; S-22 (a): loaded by `import()` under `?gate=` alone). ENGINE-BOUND.
// `window.__skep`: the model's held records, the mounted articles' text, the
// mirror's items, the camera and the focus, S1's `driftSample` and
// `overlapCheck` (the measuring code moved into the page), the visibility
// oracle `visible`, the beams' anchors beside their spans' own rects, the
// handoff (`barsOf`: the canvas's own bars for a document beside its mounted
// article's blocks), the reading scene's runs and the ends it set level
// (`scene.pairs`), a passage's line in one of its panes (`scene.at`) and its
// bands and lines beside their passages' lines (`scene.ties`), the
// continuations' marks the canvas drew (`residues`:
// each one's count, newest member, members, the lines set on it and its
// screen rect), the mid connections it drew between places (`connections`),
// the labels it set (`labels`: each one's kind, place, lines — their text,
// size and screen rect — and the room its place gave it, the trail's pip
// numbers among them) and the parts of labels it left out with the rule that
// left each out (`labelsLeftOut`), S3's camera paths (`runPath`) and the
// frame buffer —
// each frame's count of documents both drawn and mounted, and of documents
// yielded and not mounted — the bridge client's own call
// log, the settle signal, the trail, the line's and the overlay's text, the
// selection's span beside the platform's own, the copy door (the copy event
// run against a stub clipboard, its flavors read back), the strings. The app
// installs it with its loop's frame buffer. Nothing here is shipped chrome;
// nothing posts anywhere.
// THE ORACLES MEASURE WHAT A PERSON MEETS, never what the page set: the
// containment check holds an article's content to the clip the page draws
// and each corner to the room beside it, `visible` says whether an element
// the DOM holds is shown (inside its clip and the viewport), and a beam's
// endpoint is held to the client rects of its link's marked words, read from
// the article apart from the beams' own set.
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
import * as SCENE from '../scene/scene.js';
import { docBox, accountCell, boardCell, DOC_W, REP_FS, depthOfDoc } from '../plane/projection.js';
import { lodOf, LOD_FAR_LO, LOD_FAR_HI, LOD_TXT_LO, LOD_TXT_HI, MOUNT_EM } from '../plane/lod.js';
import { metricsFor } from '../plane/layout.js';
import { pinned, lacking } from '../strings.js';
import { pct, r2 } from '../util.js';

/**
 * @typedef {Object} Frame
 * @property {number} t
 * @property {number} interval
 * @property {number} drawMs
 * @property {string} lod
 * @property {number} docs
 * @property {number} both the documents whose label or bars the canvas drew that stand mounted at the frame's end: text over its own bars
 * @property {number} neither the documents the canvas yielded to their text that stand unmounted at the frame's end: an empty box
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
  return { frames: rows.length, fps_median: r2(1000 / Math.max(0.001, pct(iv, 50))), frame_p50: r2(pct(iv, 50)), frame_p95: r2(pct(iv, 95)), frame_p99: r2(pct(iv, 99)), draw_p50: r2(pct(dr, 50)), draw_p99: r2(pct(dr, 99)), frames_over_33ms: over, longest_sub30_run_frames: worstRun, worst_frame_ms: r2(Math.max(0, ...iv)), max_docs_drawn: Math.max(0, ...rows.map((f) => f.docs)), max_both: Math.max(0, ...rows.map((f) => f.both)), max_neither: Math.max(0, ...rows.map((f) => f.neither)) };
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
      // every block's line against its place in the one 16 px layout, scaled — a reflow at zoom moves it; a transform never does
      const s = CAM.cam.scale / rec.lay;
      let spanDx = 0, spanDy = 0, spans = 0;
      for (const b of rec.blockTops || []) {
        const sp = /** @type {HTMLElement | null} */ (rec.el.querySelector(`.sp[data-pos="${b.pos}"]`));
        if (!sp) continue;
        const r = sp.getBoundingClientRect();
        spanDx = Math.max(spanDx, Math.abs((r.left - got.left) - b.left * s)); spanDy = Math.max(spanDy, Math.abs((r.top - got.top) - b.top * s)); spans++;
      }
      out.push({ tag, addr, em_px: r2(rec.fs * CAM.cam.scale), dx: r2(got.left - want.x), dy: r2(got.top - want.y), span_dx: r2(spanDx), span_dy: r2(spanDy), spans, scale: CAM.cam.scale });
    }
    return out;
  }
  /**
   * Containment: does what a mounted article holds fit the place that clips
   * it? The article's own rect is its box by construction (the mount sets
   * it from the box); its content is not — every block's rect is measured
   * against the nearest clip, and a block reaching past it is named with its
   * overflow in px. No two mounted articles may intersect. The corner stands
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
    /** @type {Array<{addr: string, pos: number, overflow_px: number}>} */
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
      for (const sp of /** @type {NodeListOf<HTMLElement>} */ (rec.el.querySelectorAll('.sp, .withheld'))) {
        const clip = clipOf(sp); if (!clip) continue;
        const over = overflowOf(rectOf(sp), rectOf(clip));
        if (over > 0.5) cut.push({ addr: rec.d.addr, pos: Number(sp.dataset.pos), overflow_px: r2(over) });
      }
      const corner = LAYER.cornerOf(rec.d.addr);
      if (!corner) { if (rec.corner && rec.fs * CAM.cam.scale >= LOD_TXT_LO) missing.push(rec.d.addr); continue; }
      const cr = rectOf(corner);
      const clip = clipOf(corner);
      const over = clip ? overflowOf(cr, rectOf(clip)) : 0;
      if (over > 0.5) clipped.push({ addr: rec.d.addr, overflow_px: r2(over) });
      const own = screenBox(rec.d.addr);
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
   * The beam endpoints, each beside an oracle read apart from the beams' own
   * set: the client rects of its link's marked words in the near document's
   * mounted article (every line they occupy) and the article's right edge.
   * A beam leaves the text at its span's own line (foundations §2.1; S1 Q1):
   * the layout case holds each endpoint's y to one of those line rects and
   * its x to the stretch between the words' end and the edge.
   */
  function beamAnchors() {
    return BM.anchors().map((a) => {
      const rec = LAYER.mountedSet().get(a.near);
      const words = rec ? [...rec.el.querySelectorAll(`.lip[data-links~="${a.link}"]`)].flatMap((w) => [...w.getClientRects()].map((r) => ({ x: r.left, y: r.top, w: r.width, h: r.height }))) : [];
      const art = rec ? rectOf(rec.el) : null;
      return { ...a, words, edge: art ? art.x + art.w : null };
    });
  }
  /**
   * The handoff (foundations §2.4: the bars become text and no line moves;
   * S1 Q7): the canvas's own bars for a document — the layout P-RENDER draws
   * below the mount, at the camera as it stands — each block's first line's
   * top on screen, its height and its count of lines, beside the mounted
   * article's blocks as the person meets them: each one's top on screen, its
   * height, and its height in its own line boxes (its computed line height at
   * the article's scale — a heading's lines are a heading's, not the body's).
   * A block the article draws as a withheld run's face is named so. Null
   * where the document's text has not arrived.
   * @param {string} addr
   */
  function barsOf(addr) {
    const laid = RENDER.layoutFor(addr);
    if (!laid) return null;
    const { m, layout } = laid;
    const box = docBox(addr);
    const linePx = m.lineH * CAM.cam.scale;
    const y = (/** @type {number} */ em) => CAM.sy(box.y + m.y0 + em * m.fs);
    const bars = [...layout.blocks].map(([pos, b]) => {
      const first = layout.lines[b.first], last = layout.lines[b.first + b.n - 1];
      return { pos, top: b.n ? r2(y(first.top)) : null, height: b.n ? r2((last.top + last.h - first.top) * m.fs * CAM.cam.scale) : 0, lines: b.n };
    });
    const rec = LAYER.mountedSet().get(addr);
    const s = rec ? CAM.cam.scale / rec.lay : 1;
    const text = rec ? [.../** @type {NodeListOf<HTMLElement>} */ (rec.el.querySelectorAll('.run > .sp, .run > .withheld'))].map((e) => {
      const r = e.getBoundingClientRect();
      const own = parseFloat(getComputedStyle(e).lineHeight) * s;
      return { pos: Number(e.dataset.pos), top: r2(r.top), height: r2(r.height), lines: Math.round(r.height / own), withheld: e.classList.contains('withheld') };
    }) : null;
    return { addr, line_px: r2(linePx), clip: r2(CAM.sy(box.y + m.y1)), head_lines: layout.lines.filter((l) => l.kind === 'head').length, bars, text };
  }
  /** a reading scene's pane, by its side */
  const paneOf = (/** @type {'a' | 'b'} */ side) => document.getElementById(side === 'a' ? 'sceneA' : 'sceneB');
  /** a pane's visible content on screen: inside its border, its scroll's window */
  function paneRect(/** @type {HTMLElement} */ pane) { const r = pane.getBoundingClientRect(); return { x: r.left + pane.clientLeft, y: r.top + pane.clientTop, w: pane.clientWidth, h: pane.clientHeight }; }
  /**
   * A passage in a reading scene's pane as the person meets it, read now
   * through T-LAYER's byte-span mapping over the pane's article: the first
   * line it stands on (the first client rect of its range) and its first
   * characters, white space collapsed; with no width, the passage runs to
   * the end of the block holding `pos`. Null where the scene is not open.
   * @param {'a' | 'b'} side
   * @param {number} pos
   * @param {number | null} [width]
   */
  function sceneAt(side, pos, width = null) {
    const p = SCENE.pair(), pane = paneOf(side);
    if (!p || !pane) return null;
    const addr = side === 'a' ? p.a : p.b;
    const b = REC.blockAt(addr, pos);
    const w = width ?? (b ? b.pos + b.width - pos : 1);
    const art = /** @type {HTMLElement | null} */ (pane.querySelector('article.dtext'));
    const range = art ? LAYER.rangeIn(art, REC.doc(addr), { addr, pos, width: Math.max(1, w) }) : null;
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
  /** S3's camera path: fn(u) moves the camera each frame for ms; the frames of the phase summarized */
  async function runPath(/** @type {string} */ name, /** @type {number} */ ms, /** @type {{kind: 'orbit', scale: number, ax?: number, by?: number, centre?: {x:number,y:number}} | {kind: 'sweep', from: number, to: number, centre?: {x:number,y:number}}} */ spec) {
    const centre = spec.centre || { x: CAM.cam.x, y: CAM.cam.y };
    const t0 = performance.now();
    deps.phase.name = name;
    const start = deps.frames.length;
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
    const rows = deps.frames.slice(start + 2).filter((f) => f.phase === name);
    return summarize(rows);
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
    },
    mounted: (/** @type {string} */ addr) => { const rec = LAYER.mountedSet().get(addr); if (!rec) return null; const r = rec.el.getBoundingClientRect(); return { text: LAYER.mountedText(addr), rect: { x: r.left, y: r.top, w: r.width, h: r.height }, fs: rec.fs, lay: rec.lay }; },
    mountedAddrs: () => LAYER.mountedAddrs(),
    spanRects: (/** @type {string} */ addr, /** @type {number} */ pos, /** @type {number | null} */ width = null) => LAYER.spanRects(addr, pos, width),
    mirror: { item: (/** @type {number} */ i) => WALK.mirrorItem(i), size: () => WALK.mirrorSize(), index: () => WALK.mirrorIndex(), siblings: () => WALK.siblingsNow().map((n) => ({ kind: n.kind, addr: n.addr, pos: n.pos })) },
    view: { camera: () => CAM.view(), focus: () => WALK.current(), lod: () => lodOf(CAM.cam.scale), viewport: () => CAM.viewport(), set: (/** @type {{x:number,y:number,scale:number}} */ v) => { CAM.set(v); CAM.markDirty(); }, bounds: () => CAM.bounds() },
    driftSample, overlapCheck, visible,
    beamAnchors, barsOf,
    /** the continuations the last frame drew as marks */
    residues: () => RENDER.stats.residueMarks.slice(),
    /** the mid connections the last frame drew, each between two places: a document, or a mark's `key` */
    connections: () => RENDER.stats.connections.slice(),
    /** the labels the last frame set, in the order they were set, the trail's pip numbers last */
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
    /** the platform's own selection: whether it is collapsed, and the span it covers in a mounted article (null outside one) */
    platformSelection: () => { const s = window.getSelection(); return { collapsed: !s || s.rangeCount === 0 || s.isCollapsed, span: LAYER.spanOfSelection() }; },
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
    go: { leapTo: (/** @type {string} */ a, /** @type {number | null} */ pos) => GO.leapTo(a, { pos: pos ?? null, how: 'leap' }).then(() => true), follow: (/** @type {string} */ addr, /** @type {string} */ link) => { const s = LK.shown(addr).find((x) => x.link.addr === link); return s ? GO.follow(s, null).then(() => true) : Promise.resolve(false); }, home: () => GO.home(), wholeBoard: () => GO.wholeBoard(), back: () => GO.back(), forward: () => GO.forward(), toTrailEntry: (/** @type {number} */ n) => GO.toTrailEntry(n), arrival: () => GO.arrivalMark() },
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
    /** the scale at which a document's em is `em` px, or its box `docPx` px */
    scaleFor: (/** @type {string} */ addr, /** @type {'em' | 'doc'} */ kind, /** @type {number} */ v) => { const box = docBox(addr); if (kind === 'doc') return v / box.w; const d = REC.doc(addr); return v / metricsFor(d.extent || 1, box).fs; },
    boxOf: (/** @type {string} */ addr) => docBox(addr), accountCell: (/** @type {string} */ a) => accountCell(a), boardCell: (/** @type {string} */ b) => boardCell(b), depthOf: (/** @type {string} */ a) => depthOfDoc(a),
    constants: { DOC_W, REP_FS, LOD_FAR_LO, LOD_FAR_HI, LOD_TXT_LO, LOD_TXT_HI, MOUNT_EM },
    refresh: async () => { const ts = /** @type {number[]} */ ([]); await new Promise((res) => { const step = (/** @type {number} */ t) => { ts.push(t); if (ts.length < 60) requestAnimationFrame(step); else res(undefined); }; requestAnimationFrame(step); }); const iv = []; for (let i = 1; i < ts.length; i++) iv.push(ts[i] - ts[i - 1]); return r2(1000 / Math.max(0.1, pct(iv, 50))); },
  };
  /** @ts-ignore — the driver's door */
  window.__skep = api;
  return api;
}
