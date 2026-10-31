// APP — the one module that wires the owners and starts the loop (the
// structure record §3.2; FP-11's top). Layer 3. Engine-bound. State: the
// loop's cadences and its last readings of the model, the layer and the
// camera, the gate's phase, the frame buffer the gate reads (`frames`, at
// most FRAME_CAP of them) and what boot found (`bootInfo`), the shipped faces
// as the first frame found them among it.
// Boot (`boot`): the URL's two flags — `?provider=<secret>` selects the
// bridge client over `skep-dev serve` (S-14 (b), S-36 (a): the one flag, the
// port the verb's default, the secret handed to B-DEV alone; FP-15), and
// `?gate=` loads `web/gate/` by `import()` (S-22 (a)), the ledger first,
// before any call. Absent the provider flag the page boots against the port
// with no adapter and the one line says so. `?gate=guest` boots at guest
// class with `session(board)` never asked, so every read takes the guest
// form and every screen its guest arm. Then the board, by M-PUMP's
// `openBoard`: `boards()`, and for the board held its key store
// (`fingerprint()`, read before the session so the one line's device label
// is taken with it — FP-34), the session by M-PUMP's acquire (S-37 (a);
// FP-28: the boot's own call, made again where a restart loses the session;
// the session kept as the shell opened it, its reference and never a token;
// `close(session)` at `pagehide`), its health, its daemon and the model's
// index (`places` at the page's class); where the list held no board, none
// is launched at or named (FP-35). The type, beside them: the shipped faces
// (P-REG's SHIPPED) loaded before the first layout, one that fails leaving
// the page in its fallback; then measured as rendered (`typeSet`) — the
// reading face's average advance (P-LAY's `setAdvance`, the style's
// `--char-w`), the root's size as the reader's own settings render it, the
// reading size 1.0625 of it (P-CAM's `setRoot`) — and the viewport fit again;
// a face that arrives later is a re-set (FP-8, FP-12): the type measured
// again, and T-LAYER, P-RENDER and the scene set again from it
// (`refaced`). Then the launch (`launch`): the launch
// frame HOME, the trail's first entry (foundations §2.2; W-01; N-GO's
// `launch`), or with no board the walk's root, saying why, and no entry; a
// board the list read again finds launches the same way (M-PUMP's `onOpen`).
// What a module reads of an owner above it is handed in once as the page
// boots (FP-10, FP-11): T-LAYER's readers (the selection, the walk's focus,
// the line's bottom, the trail's current entry, the version each box shows
// — N-GO's `shownIn`, FP-22 — the document the line names — L-LINE's
// `named`, FP-26 — and whether an account is named in view: the line names
// it, or the canvas's last frame set its label, P-RENDER's `regionNamed`);
// LK's (the links lit, P-RENDER's `drawsDoc`, T-LAYER's
// owner rule, `shownIn`, and a far document's first line, T-LAYER's
// `firstOfFar` by T-ARTICLE's one rule); N-WALK's (Back's light, what a landing says,
// `shownIn`, why no board is held); L-LINE's acts and readers (the LEAP box,
// Back, Forward, the trail's list, sign-in, the board list's retry, a
// jump's face out of view — O-HOST's `aside`, FP-25 — the runs of an arrival
// in several, the walks' folded moments with the act that unfolds each —
// O-FACES' `folded`, `unfold` — and the reading scenes closed, N-GO's
// `closed`); SC's own end, a Back from its entry (N-GO's `closeScene`), and
// the faces a stop the reader returned to shows at its site (O-FACES'
// `reaching`, `floating`, `held`); O-LAND's hand-off and its pieces' element;
// and M-PUMP's (`shownIn`, N-GO's `arrived` for each feed row publishing a
// trunk's next member, `dropped` for what each row and each change of the
// page's class dropped, and the places the trail's entries name — a reading
// scene's entry its two documents (N-GO's `scenePair`) — which a change reads
// again beside the view's — FP-23, FP-29).
// The loop (`loop`, on `requestAnimationFrame`): step the camera's flight,
// pump every 90 ms, and on a dirty frame — the mark, a camera move, a model
// or layer revision, a flight, an overlay standing, a phase — run T-LAYER's
// frame first, so what stands is decided before anything is drawn (FP-8),
// mark the mirror's documents, Back's light and the landing's description in
// place (N-WALK's `markExpanded`, `markLocated`, `markDescribed`), then
// P-RENDER, BM, O-HOST's place, the landing's line (O-LAND's `render`), the
// scene's ties where the scene is open (SC's `draw`), then the press
// APP-INPUT holds at reading scale, acted on the text the frame set
// (`afterFrame`); and record the frame: its interval, its draw time, the
// documents the canvas drew a label or a bar for that stand as text (`both`),
// the ones it yielded a line or the whole of to text that does not stand
// (`neither`), the bars it drew at the readable em (`barred`), and what
// T-LAYER stood — its new mounts, its articles in the mount band and their
// lines. Every 120 ms the line is rebuilt and the LEAP box takes the
// address beside it and, standing over a change of the page's class, the
// index its new class reads (N-LEAP's `takeAddress`, `takeIndex`).
// A change of the page's class (`dropped`): the overlay host, the faces, the
// LEAP box, N-GO and the one line first, so what the class the page left
// could read goes with it (FP-29), then each reading scene's pane and the
// walk (FP-23).
// The global key listener → N-KEYS, each key handed where the focus is
// (`whereIs`; a field as N-FOCUS reads one, `isField`; the scene's stop and
// its strokes' buttons among the scene's acts, as its bar's buttons are) and
// whether a key
// made it by N-FOCUS's one reading (FP-20): a chord the LEAP box closed on
// is read at the focus the close returned (M-1); in the scene the scene's
// keys go first (SC's `key`); ↓ and ↑ in an overlay move among its controls
// through the controller; every key but Tab and Shift is the line's next
// act. The pointer → APP-INPUT; the copy event → T-LAYER's `onCopy`; the
// events `moment` → a walk's moment (O-FACES'), `held` → logged, not acted
// on; the failure reporter (a line in the page, posted nowhere). No write is
// composed or sent anywhere in this page (S-35 (a)).
// Rules: FP-1, FP-2, FP-4, FP-5, FP-8, FP-9, FP-10, FP-11, FP-14, FP-15,
// FP-20, FP-22, FP-23, FP-25, FP-26, FP-28, FP-29, FP-34, FP-35.

import * as PORT from '../bridge/port.js';
import * as DEV from '../bridge/dev.js';
import * as REC from '../model/records.js';
import * as PUMP from '../model/pump.js';
import * as CAM from '../plane/camera.js';
import * as RENDER from '../plane/render.js';
import * as LAYER from '../text/layer.js';
import * as LK from '../links/links.js';
import * as BM from '../beams/beams.js';
import * as HOST from '../overlays/host.js';
import * as FACES from '../overlays/faces.js';
import * as SEL from '../overlays/selection.js';
import * as TRAILLIST from '../overlays/trail-list.js';
import * as LANDING from '../overlays/landing.js';
import * as LINE from '../line/line.js';
import * as LEAP from '../nav/leap.js';
import * as WALK from '../nav/walk.js';
import * as FOCUS from '../nav/focus.js';
import * as KEYS from '../nav/keys.js';
import * as GO from '../nav/go.js';
import * as TRAIL from '../nav/trail.js';
import * as SCENE from '../scene/scene.js';
import * as INPUT from './input.js';
import { cssVariables, FACE, SHIPPED } from '../plane/register.js';
import { cssMeasures, setAdvance, advanceOf, LAY_FS, CHAR_W } from '../plane/layout.js';
import { depthOfDoc } from '../plane/projection.js';
import { lodOf } from '../plane/lod.js';

/** @typedef {import('../gate/hooks.js').Frame} Frame */

const P = new URLSearchParams(location.search);
const SECRET = P.get('provider');
const GATE = P.get('gate');
/** the gate's guest: the page boots at guest class, asking no session */
const GUEST = GATE === 'guest';

/** the frame buffer the gate reads */
/** @type {Frame[]} */
const frames = [];
const FRAME_CAP = 4000;
const phase = { name: '' };
/** @type {Record<string, unknown>} what boot found, for the report */
const bootInfo = {};
let lastT = performance.now(), pumpT = 0, lineT = 0;
let lastRev = -1, lastLayerRev = -1;
let lastCam = { x: NaN, y: NaN, scale: NaN };

/** @param {string} kind @param {string} msg @param {string} [stack] */
function reportFailure(kind, msg, stack) {
  const el = document.getElementById('fail');
  if (el) { el.textContent = kind + ': ' + msg + '\n' + (stack || '').split('\n').slice(0, 3).join('\n'); el.classList.add('on'); }
  console.error(kind, msg, stack);
}
window.addEventListener('error', (e) => reportFailure('ERROR', e.message, e.error && e.error.stack));
window.addEventListener('unhandledrejection', (e) => reportFailure('REJECTION', String(e.reason), e.reason && e.reason.stack));

function el(/** @type {string} */ id) { const e = document.getElementById(id); if (!e) throw new Error('missing #' + id); return e; }

function resize() {
  const plane = /** @type {HTMLCanvasElement} */ (el('plane'));
  CAM.setViewport(plane.clientWidth || window.innerWidth, plane.clientHeight || window.innerHeight);
  RENDER.resize(); BM.resize(); CAM.markDirty();
}

/** the shipped faces loaded (P-REG's SHIPPED): each style asked of the platform's font set, one that fails to load leaving the page in its fallback */
const facesLoaded = () => Promise.all(SHIPPED.map((f) => document.fonts.load(f).catch(() => []))).then(() => undefined);

/**
 * The type as the platform renders it (see the head): the reading face's
 * average advance measured by the canvas at P-LAY's layout size (`advanceOf`)
 * and set, the style's advance with it; the root's size as the reader's own
 * settings render it, the reading size read from it; the viewport fit again.
 */
function typeSet() {
  const c = document.createElement('canvas').getContext('2d');
  if (c) { c.font = `${LAY_FS}px ${FACE.reading}`; setAdvance(advanceOf((ch) => c.measureText(ch).width / LAY_FS)); }
  document.documentElement.style.setProperty('--char-w', String(CHAR_W));
  CAM.setRoot(parseFloat(getComputedStyle(document.documentElement).fontSize));
  resize();
}

/** a face that arrived after the first layout (see the head): the type measured again, and every surface that measured words set again from it */
function refaced() { typeSet(); LAYER.refaced(); RENDER.refaced(); SCENE.refaced(); }

function loop(/** @type {number} */ now) {
  requestAnimationFrame(loop);
  const anim = CAM.step(now);
  if (now - pumpT > 90) { pumpT = now; if (PUMP.pump()) CAM.markDirty(); }
  const camMoved = CAM.cam.x !== lastCam.x || CAM.cam.y !== lastCam.y || CAM.cam.scale !== lastCam.scale;
  const rev = REC.rev(), lrev = LAYER.revision();
  const dirty = CAM.takeDirty() || camMoved || rev !== lastRev || lrev !== lastLayerRev || anim || HOST.hasCurrent() || phase.name;
  if (dirty) {
    const t0 = performance.now();
    if (!bootInfo.firstFrame) bootInfo.firstFrame = SHIPPED.map((f) => [f, document.fonts.check(f)]);
    LAYER.frame((addr) => { const f = WALK.current(); return !!f && f.addr === addr; });
    WALK.markExpanded();
    WALK.markLocated();
    WALK.markDescribed();
    const lod = RENDER.draw();
    BM.draw();
    HOST.place();
    LANDING.render();
    if (SCENE.isOpen()) SCENE.draw();
    INPUT.afterFrame();
    const drawMs = performance.now() - t0;
    const S = RENDER.stats, stood = LAYER.frameStats();
    const both = new Set([...S.labelled.filter((a) => LAYER.isMounted(a)), ...S.bars.filter(([a, i]) => LAYER.lineStands(a, i)).map(([a]) => a)]).size;
    const neither = new Set([...S.yielded.filter((a) => !LAYER.standing(a)), ...S.yieldedLines.filter(([a, i]) => !LAYER.lineStands(a, i)).map(([a]) => a)]).size;
    frames.push({ t: now, interval: now - lastT, drawMs, lod: lod.name, docs: S.docsDrawn, both, neither, barred: S.barred, mounted: stood.mounted, standing: stood.standing, lines: stood.lines, phase: phase.name || undefined });
    if (frames.length > FRAME_CAP) frames.splice(0, frames.length - FRAME_CAP);
    lastRev = rev; lastLayerRev = lrev; lastCam = { x: CAM.cam.x, y: CAM.cam.y, scale: CAM.cam.scale };
  }
  lastT = now;
  if (now - lineT > 120) { lineT = now; LINE.render(); LEAP.takeAddress(); LEAP.takeIndex(); }
}

/**
 * What a feed row or a change of the page's class dropped, told by M-PUMP
 * after the drop (its `onDrop`): at a change of class — FP-23, FP-29 — the
 * overlay, the faces' memory of what they showed whole, the LEAP box's rows,
 * the arrival and the trail's notices, and the one line's transient taken
 * down from the model at once, the overlay first so the focus a closing card
 * hands back stands on the walk's element as the walk is taken again; then
 * each reading scene's pane kept fresh by its kind, and the walk taken again
 * where it stood.
 * @param {import('../model/pump.js').Dropped} x
 */
function dropped(x) {
  if (!x.addrs) { HOST.classChanged(); FACES.classChanged(); LEAP.classChanged(); GO.classChanged(); LINE.classChanged(); }
  SCENE.dropped(x);
  void WALK.dropped(x);
}

/** where the key event's focus is */
function whereIs(/** @type {EventTarget | null} */ target) {
  const t = /** @type {HTMLElement | null} */ (target);
  if (!t || !t.closest) return /** @type {const} */ ('plane');
  if (t.closest('#leap')) return /** @type {const} */ ('field');
  if (FOCUS.isField(t)) return /** @type {const} */ ('field');
  if (t.closest('#overlay')) return /** @type {const} */ ('overlay');
  if (t.closest('#landing')) return /** @type {const} */ ('landing');
  if (t.closest('#line')) return /** @type {const} */ ('line');
  if (t.closest('#scenebar, #scenestop, #scenestrokes')) return /** @type {const} */ ('scene-acts');
  if (t.closest('#scene')) return /** @type {const} */ ('scene');
  if (t.closest('#corners')) return /** @type {const} */ ('corner');
  return /** @type {const} */ ('plane');
}

/**
 * The launch (see the head): the zoom-in bound read from the deepest place
 * the index lists (P-CAM's `setDeepest`), then the launch frame (N-GO's
 * `launch`) — HOME, the trail's first entry, where a board is held; the
 * walk's root, saying why, where none is — the platform's focus on the walk's
 * element with the ring out (rule 21). At boot, and where the list read again
 * opens a board the boot found none of (M-PUMP's `onOpen`).
 */
async function launch() {
  let deepest = 0; for (const p of REC.places()) if (!p.system) deepest = Math.max(deepest, depthOfDoc(p.doc));
  CAM.setDeepest(deepest); bootInfo.deepestDepth = deepest;
  await GO.launch();
  LINE.render(true);
}

async function boot() {
  /** @type {typeof import('../gate/ledger.js') | null} */
  let ledger = null;
  if (GATE) ledger = await import('../gate/ledger.js'); // FIRST: every surface counted before the first call
  for (const [k, v] of Object.entries({ ...cssVariables(), ...cssMeasures() })) document.documentElement.style.setProperty(k, v);
  // the shipped faces, asked first so they load beside the board's reads: the first layout waits for them
  const faces = facesLoaded();
  const plane = /** @type {HTMLCanvasElement} */ (el('plane'));
  RENDER.attach(plane); LAYER.attach(el('domlayer'), el('corners'), { measure: true }); BM.attach(/** @type {HTMLCanvasElement} */ (el('beams')));
  HOST.attach(el('overlay'));
  FOCUS.attach({ live: el('live') });
  WALK.attach(el('mirror'));
  LANDING.attach(el('landing'), { handOff: () => WALK.focusItem(), pieces: el('pieces') });
  SCENE.attach({ root: el('scene'), bar: el('scenebar'), paneA: el('sceneA'), paneB: el('sceneB'), canvas: /** @type {HTMLCanvasElement} */ (el('scenebeams')), stop: /** @type {HTMLButtonElement} */ (el('scenestop')), strokes: el('scenestrokes') },
    { end: (byKey) => GO.closeScene(byKey), faces: { reaching: FACES.reaching, floating: (far, at, told) => FACES.floating(far, at, null, told), held: FACES.held } });
  LEAP.attach({ box: el('leap'), input: /** @type {HTMLInputElement} */ (el('leapq')), rows: el('leaphits'), note: el('leapnote') }, () => LINE.currentAddress());
  LINE.attach(el('line'), { open: () => LEAP.open(), back: (byKey) => GO.back(byKey), forward: (byKey) => GO.forward(byKey), trailList: (byKey) => TRAILLIST.open(byKey), signIn: (b) => FACES.signIn(b), again: () => { void FACES.tryBoardsAgain(); }, aside: () => HOST.aside(), pieces: () => { const l = GO.landing(); return l && l.pieces ? { addr: l.addr, runs: l.pieces.runs, current: l.current } : null; }, walks: () => FACES.folded(), walk: (key, byKey) => FACES.unfold(key, byKey), closed: () => GO.closed() });
  LAYER.readers({ selection: () => SEL.selected(), focus: () => WALK.focusedSpan(), top: () => LINE.bottom(), handOff: () => WALK.focusItem(), navigated: () => { const e = TRAIL.current(); return e ? e.addr : null; }, shown: GO.shownIn, named: () => LINE.named().doc, region: (a) => LINE.named().account === a || RENDER.regionNamed(a) });
  LK.readers({ lit: () => GO.litLinks(), drawn: RENDER.drawsDoc, owner: LAYER.originOwner, shown: GO.shownIn, first: LAYER.firstOfFar });
  WALK.readers({ located: () => GO.backLight(), described: () => GO.described(), shown: GO.shownIn, noBoard: () => FACES.noBoardWords() });
  INPUT.attach({ plane, layer: el('domlayer'), corners: el('corners') });
  window.addEventListener('resize', resize); resize();
  document.addEventListener('copy', (e) => { const b = REC.board(); LAYER.onCopy(e, b ? b.origin : ''); });
  window.addEventListener('keydown', async (e) => {
    // a chord the LEAP box closed on acts as anywhere (M-1): read at the focus the close returned, not at the box
    const target = /** @type {HTMLElement | null} */ (e.target);
    const where = whereIs(target && target.closest && target.closest('#leap') && !LEAP.isOpen() ? document.activeElement : e.target);
    const byKey = FOCUS.byKey(e);
    if (where === 'scene' && SCENE.isOpen() && SCENE.key(KEYS.chordOf(e))) { e.preventDefault(); return; }
    if (where === 'overlay' && !e.shiftKey && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) { const items = /** @type {HTMLElement[]} */ ([...el('overlay').querySelectorAll('button:not([disabled]), input, [tabindex="0"]')]); const i = items.indexOf(/** @type {HTMLElement} */ (document.activeElement)); const n = items[Math.max(0, Math.min(items.length - 1, i + (e.key === 'ArrowDown' ? 1 : -1)))]; if (n) FOCUS.land(n, { byKey }); e.preventDefault(); return; }
    if (e.key !== 'Tab' && e.key !== 'Shift') LINE.act();
    const took = await KEYS.dispatch(e, { where, byKey });
    if (took) e.preventDefault();
  });

  // the adapter: the bridge client where the flag stands; nothing otherwise
  const adapter = SECRET ? DEV.create({ provider: DEV.DEFAULT_PROVIDER, secret: SECRET, record: !!GATE }) : null;
  PORT.boot(adapter);
  PUMP.start({ onDirty: CAM.markDirty, shown: GO.shownIn, onPublish: GO.arrived, onDrop: dropped, stands: () => TRAIL.all().flatMap((e) => [e.addr, ...(GO.scenePair(e) || [])]), onOpen: () => { void launch(); } });
  PORT.on('moment', (d) => FACES.moment(/** @type {import('../bridge/shapes').MomentEvent} */ (d)));
  const heldSeen = /** @type {unknown[]} */ ([]);
  PORT.on('held', (d) => { heldSeen.push(d); console.log('held event (not acted on — the editor\'s lane\'s)', d); });
  bootInfo.adapter = PORT.adapterName(); bootInfo.gate = !!GATE; bootInfo.heldSeen = heldSeen;

  const t0 = performance.now();
  // the board, and for the board held its key store, the session (none for the gate's guest), its health, its daemon and its index
  const opened = await PUMP.openBoard({ session: !GUEST });
  if (!REC.board()) bootInfo.boardsRefused = 'refused' in opened.boards ? opened.boards.refused : 'none';
  if (opened.places && 'result' in opened.places) { bootInfo.placesBytes = JSON.stringify(opened.places.result).length; bootInfo.placesDocs = opened.places.result.docs.length; }
  else if (opened.places) bootInfo.placesRefused = opened.places.refused;
  window.addEventListener('pagehide', () => { const x = REC.session(); if (x) PORT.closeAtUnload(x.session); });
  bootInfo.coldOpenMs = Math.round(performance.now() - t0);
  bootInfo.coldOpenCalls = PORT.callLog().map((c) => c.name);
  bootInfo.coldOpenBytes = PORT.callLog().reduce((a, c) => a + c.bytesIn + c.bytesOut, 0);
  await faces;
  typeSet();
  bootInfo.type = { faces: SHIPPED.map((f) => [f, document.fonts.check(f)]), advance: CHAR_W, readingPx: CAM.READING_PX, root: getComputedStyle(document.documentElement).fontSize };
  document.fonts.addEventListener('loadingdone', refaced);
  await launch();
  if (GATE) {
    const hooks = await import('../gate/hooks.js');
    hooks.install({ frames, phase, boot: bootInfo });
    /** @ts-ignore */
    window.__skepLedgerModule = ledger;
  }
  requestAnimationFrame(loop);
  void lodOf;
}

boot().catch((e) => reportFailure('BOOT', String(e && e.message || e), e && e.stack));
