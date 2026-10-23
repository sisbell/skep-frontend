// APP — the one module that wires and starts the loop (the structure record
// §3.2 "APP"; FP-11's top). Layer 3. ENGINE-BOUND. State: the dirty mark and
// the frame buffer (view plumbing).
// BOOT: the URL's two flags — `?provider=<secret>` selects the bridge client
// over `skep-dev serve` (S-14 (b), S-36 (a): the one flag, the port the verb's
// default; the secret handed to B-DEV alone), `?gate=` loads `web/gate/` by
// `import()` (S-22 (a)) — the ledger FIRST, before any call; absent the flag
// the page boots against the port with NO adapter and the one line says so
// (the shell's global is the shell's lane's). `?gate=guest` is the gate's
// GUEST: the boot as shipped with `session(board)` never asked, so every
// read takes the guest form and every screen its guest arm — a visitor's
// page before any sign-in is asked (the harness's guest case; the installed
// app loads with no query and never reaches it). Then `boards()` (the
// reference kept), `session(board)` ONCE AT BOOT (S-37 (a) — the session
// kept as the shell opened it: its reference for the page's life, never a
// token, and whether a write may go out under it; `close(session)` at
// `pagehide` on a keepalive fetch), `fingerprint()` (the device's key
// store, read for this board: whether a key is bound here — R56's "key
// present", which the entitlement arms read — and which key is the
// session's, M-REC's `device`), `health(board)` and `probe()` by M-PUMP's
// `readHealth` and `readProbe`, the model's index by its `readIndex`
// (`places` at the page's class, skep #463) — each of the three answers
// laid under the board's events taken while it was out — then the launch
// frame HOME — the acting account's region at mid scale, a guest's the
// board's extent — the trail's first entry (foundations §2.2; W-01; N-GO's
// `launch`). What a module reads of an owner that imports it is handed in
// once as the page boots (FP-10, FP-11): T-LAYER's readers, LK's — N-GO's
// links lit at an arrival or by a one-step move along the trail, P-RENDER's
// test of where the plane draws a document (`drawsDoc`, which tails a link
// whose far document is drawn nowhere — issue #132) and T-LAYER's owner rule
// — and N-WALK's: where Back's light stands (N-GO's `backLight`; issue #152)
// and what a landing says of its passage (N-GO's `described`; issue #153).
// THE LOOP (`requestAnimationFrame`): step the camera's flight, pump on its
// cadence, draw when dirty or animating or an overlay stands — T-LAYER's
// frame, the mirror's documents marked expanded or collapsed in place by the
// view (N-WALK's `markExpanded`; issue #140), its items where Back's light
// stands (`markLocated`; issue #152) and the landing's item's description
// (`markDescribed`; issue #153), then P-RENDER, then BM, then
// O-HOST's place, the landing's line (O-LAND's `render`), the line, then the
// press APP-INPUT holds at reading scale, acted on the text the frame set
// (`afterFrame`) — and the frame buffer the gate reads. T-LAYER decides
// what stands BEFORE the canvas draws, so a line crossing the mount threshold
// or entering the view is drawn as a bar or yielded to its text by the same
// frame's standing lines — never both, never neither (law 13) — and the
// arrival mark reads the article where this frame placed it; each frame's
// record counts the documents the canvas drew a label or a bar for that stands
// as text (`both`), the ones it yielded a line or the whole of to text that
// does not stand (`neither`), the bars it drew at the readable em (`barred`,
// which issue #122's rule holds at none), and what T-LAYER stood: its new
// mounts, its articles in the mount band and their lines. The global key
// listener → N-KEYS, each key handed where the focus is and whether a key
// made it by N-FOCUS's one reading (FP-20) — a chord the LEAP box closed on
// is read at the focus the close returned; ↓ and ↑ in an overlay move among
// its controls through the controller; the pointer → APP-INPUT; the events
// `moment` → a face, `held` → logged, not acted on (the editor's lane's);
// the failure reporter (a line in the page, posted nowhere). NO WRITE is
// composed or sent anywhere in this page (S-35 (a)).
// Carries: the wireframe's §23 (`loop`, the listener, `reportFailure`,
// `boot`; the bare keys RE-CUT to D5's chords; `startWalk` and the hand
// board DROPPED), §0's params. Rules: FP-1, FP-2, FP-4, FP-5, FP-8, FP-9,
// FP-11, FP-14, FP-15.

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
import { cssVariables } from '../plane/register.js';
import { cssMeasures } from '../plane/layout.js';
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

function loop(/** @type {number} */ now) {
  requestAnimationFrame(loop);
  const anim = CAM.step(now);
  if (now - pumpT > 90) { pumpT = now; if (PUMP.pump()) CAM.markDirty(); }
  const camMoved = CAM.cam.x !== lastCam.x || CAM.cam.y !== lastCam.y || CAM.cam.scale !== lastCam.scale;
  const rev = REC.rev(), lrev = LAYER.revision();
  const dirty = CAM.takeDirty() || camMoved || rev !== lastRev || lrev !== lastLayerRev || anim || HOST.hasCurrent() || phase.name;
  if (dirty) {
    const t0 = performance.now();
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
  if (now - lineT > 120) { lineT = now; LINE.render(); }
}

/** where the key event's focus is */
function whereIs(/** @type {EventTarget | null} */ target) {
  const t = /** @type {HTMLElement | null} */ (target);
  if (!t || !t.closest) return /** @type {const} */ ('plane');
  if (t.closest('#leap')) return /** @type {const} */ ('field');
  if (t.matches && t.matches('input, textarea')) return /** @type {const} */ ('field');
  if (t.closest('#overlay')) return /** @type {const} */ ('overlay');
  if (t.closest('#landing')) return /** @type {const} */ ('landing');
  if (t.closest('#line')) return /** @type {const} */ ('line');
  if (t.closest('#scenebar')) return /** @type {const} */ ('scene-acts');
  if (t.closest('#scene')) return /** @type {const} */ ('scene');
  if (t.closest('#corners')) return /** @type {const} */ ('corner');
  return /** @type {const} */ ('plane');
}

async function boot() {
  /** @type {typeof import('../gate/ledger.js') | null} */
  let ledger = null;
  if (GATE) ledger = await import('../gate/ledger.js'); // FIRST: every surface counted before the first call
  for (const [k, v] of Object.entries({ ...cssVariables(), ...cssMeasures() })) document.documentElement.style.setProperty(k, v);
  const plane = /** @type {HTMLCanvasElement} */ (el('plane'));
  RENDER.attach(plane); LAYER.attach(el('domlayer'), el('corners'), { measure: true }); BM.attach(/** @type {HTMLCanvasElement} */ (el('beams')));
  HOST.attach(el('overlay'));
  FOCUS.attach({ live: el('live') });
  WALK.attach(el('mirror'));
  LANDING.attach(el('landing'), { handOff: () => WALK.focusItem() });
  SCENE.attach({ root: el('scene'), bar: el('scenebar'), paneA: el('sceneA'), paneB: el('sceneB'), canvas: /** @type {HTMLCanvasElement} */ (el('scenebeams')) });
  LEAP.attach({ box: el('leap'), input: /** @type {HTMLInputElement} */ (el('leapq')), rows: el('leaphits'), note: el('leapnote') }, () => LINE.currentAddress());
  LINE.attach(el('line'), { open: () => LEAP.open(), back: (byKey) => GO.back(byKey), forward: (byKey) => GO.forward(byKey), trailList: (byKey) => TRAILLIST.open(byKey), signIn: (b) => { const r = REC.sessionRefused(); if (r) FACES.sessionFace(/** @type {import('../bridge/shapes').Refusal} */ (r), b); else if (REC.deathReason()) FACES.sessionFace(/** @type {import('../bridge/shapes').Refusal} */ ({ kind: 'shell', name: 'session_died' }), b); } });
  LAYER.readers({ selection: () => SEL.selected(), focus: () => WALK.focusedSpan(), top: () => LINE.bottom(), handOff: () => WALK.focusItem(), navigated: () => { const e = TRAIL.current(); return e ? e.addr : null; } });
  LK.readers({ lit: () => GO.litLinks(), drawn: RENDER.drawsDoc, owner: LAYER.originOwner });
  WALK.readers({ located: () => GO.backLight(), described: () => GO.described() });
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
  PUMP.start({ onDirty: CAM.markDirty });
  PORT.on('moment', (d) => FACES.moment(/** @type {import('../bridge/shapes').MomentEvent} */ (d)));
  const heldSeen = /** @type {unknown[]} */ ([]);
  PORT.on('held', (d) => { heldSeen.push(d); console.log('held event (not acted on — the editor\'s lane\'s)', d); });
  bootInfo.adapter = PORT.adapterName(); bootInfo.gate = !!GATE; bootInfo.heldSeen = heldSeen;

  const t0 = performance.now();
  if (adapter) {
    const b = await PORT.boards({});
    if ('result' in b && b.result.length) { const row = b.result[0]; REC.setBoard({ board: row.board, name: row.name, origin: row.origin }); }
    else bootInfo.boardsRefused = 'refused' in b ? b.refused : 'none';
    const board = REC.board();
    if (board) {
      if (!GUEST) {
        const s = await PORT.session({ board: board.board });
        if ('result' in s) REC.setSession(s.result);
        else REC.setSessionRefused({ kind: s.refused.kind, name: s.refused.name });
      }
      const fp = await PORT.fingerprint({});
      if ('result' in fp) REC.takeKeyStore(fp.result, board.origin);
      await PUMP.readHealth(board.board);
      await PUMP.readProbe();
      const pl = await PUMP.readIndex();
      if ('result' in pl) { bootInfo.placesBytes = JSON.stringify(pl.result).length; bootInfo.placesDocs = pl.result.docs.length; }
      else bootInfo.placesRefused = pl.refused;
      let deepest = 0; for (const p of REC.places()) if (!p.system) deepest = Math.max(deepest, depthOfDoc(p.doc));
      CAM.setDeepest(deepest); bootInfo.deepestDepth = deepest;
      window.addEventListener('pagehide', () => { const x = REC.session(); if (x) PORT.closeAtUnload(x.session); });
    }
  }
  bootInfo.coldOpenMs = Math.round(performance.now() - t0);
  bootInfo.coldOpenCalls = PORT.callLog().map((c) => c.name);
  bootInfo.coldOpenBytes = PORT.callLog().reduce((a, c) => a + c.bytesIn + c.bytesOut, 0);
  // the launch frame: HOME — the acting account's region at mid scale; a guest's the board's extent — the trail's first entry,
  // the platform's focus on the walk's element with the ring out (rule 21)
  await GO.launch();
  LINE.render(true);
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
