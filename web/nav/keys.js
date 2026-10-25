// N-KEYS — D5's key table as a dispatch (the structure record §3.2; D5
// §1.1–§1.8, §1.11, §4; foundations §2.7). Layer 2. The table (`TABLE`) is
// pure; the dispatch acts on the owners it names, the one layer-2 module
// that imports across the layer (S-7 (a)). State (FP-10): the keys a jump in
// the air holds for its landing, in the order they were pressed, and whether
// they are being made; the swallow's transient mark is the line's.
// The dispatch (`dispatch`; FP-25): the navigation acts — Mod+[ and Mod+]
// (K-20, K-21), Mod+1…9 (K-40), Mod+0 and Mod+Shift+H (K-13, K-14) — are
// made at once, a jump in the air abandoned (N-GO); every other key the page
// would act on while N-GO's jump is in the air, or while held keys are being
// made, is held (`hold`), its platform default prevented as it is pressed,
// and made at the jump's landing (`replay`) in the order pressed, with the
// context it was pressed in, its act read again where the focus is then
// (`route`), so a key means the same however slowly the board answers; a
// jump that never lands drops the keys it held. The keys a control takes as
// its own stay its own: a field's, the line's ← and → among its acts, an
// overlay's and a landing's line's buttons.
// No plane command rides a printable key (§2.7): every command is a chord
// (Mod = ⌘ on macOS, Ctrl elsewhere; D5 §0) or a navigation key with the
// platform's meaning; a printable key on the plane is swallowed, never
// dispatched, the K-9 line shown at the focus (`swallow`); Mod+S is
// swallowed too (K-74), Mod+R and F5 taken and nothing reloaded (K-94), and
// the platform's own chords — copy, paste, cut, select all, print, close,
// quit, minimize, hide, preferences — are never taken (K-92, K-93). No key is
// dispatched while an input method's composition is open (the IME guard).
// Esc closes the innermost thing, in one order (`esc`; §4 rule 7; D7): the
// box, a card or scene still reading, the overlay, a jump reaching, the
// scene, the selection, and after them all the arrival (FP-21; N-GO's
// `endArrival`). Mod+L and Mod+K open the LEAP box (K-30), Mod+Y the trail's
// list (K-41), Mod+= and Mod+- zoom the camera by 1.25 about the view's
// centre and re-take the focus (K-11), Mod+Shift+P shows the one line's strip
// (K-23), and the selection's slot chords (K-47 … K-52) and K-8's
// select-by-span act from the plane and from a standing overlay alike. Mod+G
// and Mod+Shift+G (K-91) step to the next and the previous run of an arrival
// in several runs (N-GO's `step`), from the plane and every control on it
// alike, while such an arrival stands or a jump is in the air that may land
// one, and are the platform's otherwise (FP-21). Where the focus is
// (`Ctx.where`) decides the rest: in a field every key but Esc is the field's
// own; on the line ← and → move among its acts and every other key is the
// act's own (K-22); at a corner Enter takes the corner's act (K-57) and its
// other keys are the platform's; in an overlay and at a landing's line every
// key is the control's own; on the plane the walk's keys (K-1 … K-5) move
// the walk, Enter activates the focus (K-7) — at a continuation's mark's stop
// it opens the mark's list — and the paging keys page the camera (K-6);
// while the scene stands its keys alone are read (`sceneKey`; D5 M-4), and
// nothing under it takes one. Whether a key made an act is the
// focus owner's one reading, handed in by the app with each key (`Ctx.byKey`;
// FP-20), so a teleport or a re-take a key made puts the platform's focus on
// its landing wherever the key was pressed, the ring drawn (rules 10, 12). →
// at a document below its reading scale (N-WALK's `collapsed`) takes Enter's
// act, a teleport to its reading scale pushed on the trail (foundations
// §2.2); at its reading scale → enters its spans (K-3). The paging key
// continues at the next column's top where the view shows the foot of the
// column it reads (T-LAYER's `pageTarget`; FP-12), and pages the view by 0.9
// of its height everywhere else. Shift with ← and → is never dispatched: it
// is the platform's own (K-71), and APP-INPUT reads what it does back into
// the page's selection. Where no board is held (FP-35) the walk's keys at
// the plane (K-1 … K-5, K-7), K-8, the selection's slot chords (K-47 … K-52)
// and the strip (K-23) each answer with O-FACES' no-board face, as HOME and
// WHOLE BOARD do through N-GO; the paging keys and the zoom chords stay the
// camera's.
// Rules: FP-1, FP-2, FP-9, FP-10, FP-13, FP-25, FP-35.

import * as GO from './go.js';
import * as WALK from './walk.js';
import * as LEAP from './leap.js';
import * as REC from '../model/records.js';
import * as HOST from '../overlays/host.js';
import * as FACES from '../overlays/faces.js';
import * as SEL from '../overlays/selection.js';
import * as SCENE from '../scene/scene.js';
import * as LINE from '../line/line.js';
import * as TRAILLIST from '../overlays/trail-list.js';
import * as MARKLIST from '../overlays/mark-list.js';
import * as VERSIONS from '../overlays/versions.js';
import * as ANATOMY from '../overlays/anatomy-card.js';
import * as CAM from '../plane/camera.js';
import * as LAYER from '../text/layer.js';
import { t } from '../strings.js';

/** the platform's primary command modifier: ⌘ on macOS, Ctrl elsewhere (D5 §0) */
export const MAC = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform || '');

/**
 * @typedef {Object} Row — one row of D5's key table
 * @property {string} id K-n
 * @property {string} chord the key as D5 writes it (`Mod+L`, `↓`, `Enter`)
 * @property {string} act the act's name
 * @property {'plane' | 'line' | 'box' | 'trail' | 'selection' | 'cards' | 'corner' | 'scene' | 'platform'} surface
 */

/** the table: every chord the page binds, by D5's row — K-9's swallow, K-10's quasimode and K-12's pinch are APP-INPUT's */
export const TABLE = Object.freeze(/** @type {Row[]} */ ([
  { id: 'K-1', chord: '↓', act: 'walk.down', surface: 'plane' },
  { id: 'K-2', chord: '↑', act: 'walk.up', surface: 'plane' },
  { id: 'K-3', chord: '→', act: 'walk.in', surface: 'plane' },
  { id: 'K-4', chord: '←', act: 'walk.out', surface: 'plane' },
  { id: 'K-5', chord: 'Home', act: 'walk.first', surface: 'plane' },
  { id: 'K-5', chord: 'End', act: 'walk.last', surface: 'plane' },
  { id: 'K-6', chord: 'PageDown', act: 'camera.pageDown', surface: 'plane' },
  { id: 'K-6', chord: 'PageUp', act: 'camera.pageUp', surface: 'plane' },
  { id: 'K-7', chord: 'Enter', act: 'walk.act', surface: 'plane' },
  { id: 'K-8', chord: 'Shift+↓', act: 'select.span', surface: 'plane' },
  { id: 'K-8', chord: 'Shift+↑', act: 'select.span', surface: 'plane' },
  { id: 'K-11', chord: 'Mod+=', act: 'camera.zoomIn', surface: 'plane' },
  { id: 'K-11', chord: 'Mod+-', act: 'camera.zoomOut', surface: 'plane' },
  { id: 'K-13', chord: 'Mod+0', act: 'go.wholeBoard', surface: 'plane' },
  { id: 'K-14', chord: 'Mod+Shift+H', act: 'go.home', surface: 'plane' },
  { id: 'K-20', chord: 'Mod+[', act: 'go.back', surface: 'line' },
  { id: 'K-21', chord: 'Mod+]', act: 'go.forward', surface: 'line' },
  { id: 'K-23', chord: 'Mod+Shift+P', act: 'line.strip', surface: 'line' },
  { id: 'K-30', chord: 'Mod+L', act: 'leap.open', surface: 'box' },
  { id: 'K-30', chord: 'Mod+K', act: 'leap.open', surface: 'box' },
  { id: 'K-34', chord: 'Esc', act: 'esc', surface: 'box' },
  { id: 'K-40', chord: 'Mod+1…9', act: 'trail.jump', surface: 'trail' },
  { id: 'K-41', chord: 'Mod+Y', act: 'trail.list', surface: 'trail' },
  { id: 'K-47', chord: 'Mod+Shift+O', act: 'selection.wrote', surface: 'selection' },
  { id: 'K-48', chord: 'Mod+Shift+R', act: 'selection.uses', surface: 'selection' },
  { id: 'K-49', chord: 'Mod+Shift+L', act: 'selection.links', surface: 'selection' },
  { id: 'K-51', chord: 'Mod+Enter', act: 'selection.follow', surface: 'selection' },
  { id: 'K-52', chord: 'Mod+Shift+Enter', act: 'selection.scene', surface: 'selection' },
  { id: 'K-55', chord: 'Enter', act: 'cards.open', surface: 'cards' },
  { id: 'K-57', chord: 'Enter', act: 'corner.act', surface: 'corner' },
  { id: 'K-91', chord: 'Mod+G', act: 'arrival.next', surface: 'plane' },
  { id: 'K-91', chord: 'Mod+Shift+G', act: 'arrival.previous', surface: 'plane' },
  { id: 'K-62', chord: 'Mod+R', act: 'scene.relevel', surface: 'scene' },
  { id: 'K-63', chord: 'Esc', act: 'esc', surface: 'scene' },
  { id: 'K-64', chord: 'Mod+=', act: 'scene.swallowZoomIn', surface: 'scene' },
  { id: 'K-92', chord: 'Mod+C', act: 'platform.copy', surface: 'platform' },
  { id: 'K-92', chord: 'Mod+P', act: 'platform.print', surface: 'platform' },
  { id: 'K-94', chord: 'Mod+R', act: 'nothing', surface: 'platform' },
]));

/** the selection's slot chords (K-47 … K-52): the TABLE's selection rows */
const SLOT_CHORDS = new Set(TABLE.filter((r) => r.surface === 'selection').map((r) => r.chord));
/** the walk's keys at the plane (K-1 … K-5, K-7) */
const WALK_KEYS = new Set(['↓', '↑', '→', '←', 'Home', 'End', 'Enter']);

/** the chord a KeyboardEvent spells, in D5's notation — `Mod+Shift+L`, `↓`, `Enter`, or the printable key itself */
export function chordOf(/** @type {KeyboardEvent} */ e) {
  const mod = MAC ? e.metaKey : e.ctrlKey;
  const parts = [];
  if (mod) parts.push('Mod');
  if (e.shiftKey) parts.push('Shift');
  if (e.altKey && !MAC) parts.push('Alt');
  let k = e.key;
  const map = { ArrowDown: '↓', ArrowUp: '↑', ArrowRight: '→', ArrowLeft: '←', Escape: 'Esc', ' ': 'Space' };
  if (k in map) k = map[/** @type {keyof typeof map} */ (k)];
  if (k.length === 1 && /[a-z]/i.test(k)) k = k.toUpperCase();
  if (k === '+') k = '=';
  parts.push(k);
  return parts.join('+');
}

/** is the key printable (it would type a character in a field)? */
export const printable = (/** @type {KeyboardEvent} */ e) => e.key.length === 1 && !(MAC ? e.metaKey : e.ctrlKey) && !e.altKey;

/** how a chord is drawn for this platform (D5 §0) */
export const drawChord = (/** @type {string} */ chord) => (MAC ? chord.replace('Mod+', '⌘').replace('Shift+', '⇧').replace('Enter', '↩') : chord.replace('Mod', 'Ctrl'));

/**
 * @typedef {Object} Ctx — where the focus is, and whether a key made the act
 * @property {'plane' | 'line' | 'box' | 'overlay' | 'landing' | 'corner' | 'scene' | 'scene-acts' | 'field'} where `scene` a reading scene's pane, `scene-acts` its bar's buttons, `landing` a landing's line's acts (O-LAND)
 * @property {boolean} byKey a key made the act (the focus owner's one reading, `FOCUS.byKey`)
 */

/** @typedef {() => (boolean | Promise<boolean>)} Act a key's act, made: true where the page took the key */

/**
 * @typedef {Object} Held — a key a jump in the air held for its landing (see the head)
 * @property {KeyboardEvent} e
 * @property {Ctx} ctx where the focus was as it was pressed, and whether a key made it
 * @property {Promise<boolean>} jump the landing it waits for (N-GO's `aground`): true where the jump landed, false where it never did
 */

/** @type {Held[]} the keys held, in the order they were pressed */
const held = [];
/** the held keys are being made at a landing, or wait for it: a key pressed meanwhile waits behind them */
let replaying = false;
/** a held key's act is being made now */
let making = false;

/** the keys held for a landing, and the one whose act is being made there (the gate's settle signal) */
export const holding = () => held.length + (making ? 1 : 0);

/**
 * Dispatch a key: true where the page took it (the caller then prevents the
 * default). A branch that waits before it answers prevents the default
 * itself, before the wait — the platform runs the default as soon as the
 * listeners return, not when the answer arrives. Nothing is dispatched
 * during an IME composition. The navigation acts are made at once; every
 * other key the page would act on while a jump is in the air — or while the
 * keys it held are being made — waits for its landing (`hold`; see the head),
 * save the line's ← and →, which move among its acts.
 * @param {KeyboardEvent} e
 * @param {Ctx} ctx
 * @returns {Promise<boolean>}
 */
export async function dispatch(e, ctx) {
  if (e.isComposing || e.key === 'Process' || e.keyCode === 229) return false;
  const chord = chordOf(e);
  const mod = MAC ? e.metaKey : e.ctrlKey;
  // the platform's own, never taken (K-92, K-93)
  if (mod && !e.shiftKey && ['C', 'V', 'X', 'A', 'P', 'W', 'Q', 'M', 'H', ','].includes(chord.slice(4))) return false;
  if (ctx.where === 'field') {
    if (chord === 'Esc') { esc(); return true; }
    return false; // a field takes its keys
  }
  const byKey = ctx.byKey;
  // the navigation acts — Back / Forward (K-20, K-21), the trail (K-40), WHOLE BOARD / HOME (K-13, K-14): made at once, a jump in the air abandoned (FP-25)
  if (chord === 'Mod+[') { GO.back(byKey); return true; }
  if (chord === 'Mod+]') { GO.forward(byKey); return true; }
  if (/^Mod\+[1-9]$/.test(chord)) { GO.toTrailEntry(Number(chord.slice(4)), byKey); return true; }
  if (chord === 'Mod+0') { GO.wholeBoard(byKey); return true; }
  if (chord === 'Mod+Shift+H') { GO.home(byKey); return true; }
  const run = route(e, chord, ctx);
  if (!run) return false;
  if ((GO.inAir() || held.length > 0 || replaying) && !(ctx.where === 'line' && (chord === '←' || chord === '→'))) { e.preventDefault(); hold(e, ctx); return true; }
  return run();
}

/**
 * The act a key past the navigation acts makes where the focus is now,
 * unmade: null where the page takes no such key there. Read again for a held
 * key as it is made, so it acts where the focus is at the landing.
 * @param {KeyboardEvent} e
 * @param {string} chord
 * @param {Ctx} ctx
 * @returns {Act | null}
 */
function route(e, chord, ctx) {
  const byKey = ctx.byKey;
  // Esc: the innermost thing, one order
  if (chord === 'Esc') return () => { esc(); return true; };
  // the LEAP box
  if (chord === 'Mod+L' || chord === 'Mod+K') return () => { LEAP.open(); return true; };
  // the trail's list (K-41)
  if (chord === 'Mod+Y') return () => { TRAILLIST.open(byKey); return true; };
  if (chord === 'Mod+S') return () => true; // K-74: swallowed — no save exists; the corner's "kept" is the answer
  // the scene covers the plane: its keys alone, nothing under it takes one
  if (SCENE.isOpen()) return sceneKey(e, chord, ctx);
  // zoom (K-11)
  if (chord === 'Mod+=') return () => { zoomAboutFocus(1.25, byKey); return true; };
  if (chord === 'Mod+-') return () => { zoomAboutFocus(1 / 1.25, byKey); return true; };
  // no board held (see the head): the selection's chords, K-8 and the strip answer why, as the walk's keys do below
  const lacking = REC.board() ? null : () => { FACES.noBoard(null); return true; };
  if (lacking && (SLOT_CHORDS.has(chord) || chord === 'Shift+↓' || chord === 'Shift+↑' || chord === 'Mod+Shift+P')) return lacking;
  // the selection's slot chords (K-47 … K-52) and K-8's select-by-span — live from the plane and from a standing overlay alike; the selection's acts take no focus (rule 15), and the next K-8 press extends the selection from the walk's element
  if (chord === 'Mod+Shift+O') return () => { SEL.act('wrote', byKey); return true; };
  if (chord === 'Mod+Shift+R') return () => { SEL.act('uses', byKey); return true; };
  if (chord === 'Mod+Shift+L') return () => { SEL.act('links', byKey); return true; };
  if (chord === 'Mod+Enter') return () => { SEL.act('follow', byKey); return true; };
  if (chord === 'Mod+Shift+Enter') return () => { SEL.act('scene', byKey); return true; };
  if (chord === 'Shift+↓') return () => { SEL.selectFocused('down'); return true; };
  if (chord === 'Shift+↑') return () => { SEL.selectFocused('up'); return true; };
  if (chord === 'Mod+Shift+P') return () => { LINE.stripAct(); return true; };
  if (chord === 'Mod+R' || e.key === 'F5') return () => true; // K-94: the plane is live; nothing reloads
  // the step (K-91's chords; FP-21): an arrival's next and previous run, live from the plane and every control on it — held for a
  // jump's landing while one is in the air, which may stand an arrival in several runs; the platform's find where none steps
  if (chord === 'Mod+G' || chord === 'Mod+Shift+G') return GO.steps() || GO.inAir() ? () => { GO.step(chord === 'Mod+G' ? 1 : -1, byKey); return true; } : null;
  // the corner (K-57): Enter takes its act; its other keys are the platform's
  if (ctx.where === 'corner') {
    const corner = /** @type {HTMLElement | null} */ (/** @type {HTMLElement} */ (e.target).closest('[data-corner]'));
    return chord === 'Enter' && corner ? () => VERSIONS.fromCorner(corner, SEL.selected(), byKey) : null;
  }
  // the line is one stop (K-22): ← and → move among its acts; every other key is the act's own
  if (ctx.where === 'line') return chord === '←' || chord === '→' ? () => { e.preventDefault(); return LINE.step(chord === '→' ? 1 : -1); } : null;
  if (ctx.where === 'overlay' || ctx.where === 'landing') return null; // the overlay's own keys, and a landing's line's: Enter and Space press its act
  if (lacking && WALK_KEYS.has(chord)) return lacking;
  // the walk (K-1 … K-8): each key waits on the camera's flight, and the platform runs a key's default — a scroll of
  // the scroller the focus stands in, the mirror — as soon as the listeners return; so the default is prevented first
  if (chord === '↓') return async () => { e.preventDefault(); await WALK.key('down'); return true; };
  if (chord === '↑') return async () => { e.preventDefault(); await WALK.key('up'); return true; };
  if (chord === '→') return async () => { e.preventDefault(); if (WALK.collapsed()) await activateFocus(byKey); else await WALK.key('in'); return true; };
  if (chord === '←') return async () => { e.preventDefault(); await WALK.key('out'); return true; };
  if (chord === 'Home') return async () => { e.preventDefault(); await WALK.key('first'); return true; };
  if (chord === 'End') return async () => { e.preventDefault(); await WALK.key('last'); return true; };
  if (chord === 'PageDown' || chord === 'PageUp') return () => { page(chord === 'PageDown' ? 1 : -1); CAM.markDirty(); WALK.retakeFromView(byKey); return true; };
  if (chord === 'Enter') return async () => { await activateFocus(byKey); return true; };
  // a printable key on the plane: swallowed, the K-9 line at the focus
  if (printable(e)) return () => { swallow(e); return true; };
  return null;
}

/**
 * A key a jump in the air finds is held for its landing (see the head; FP-25):
 * made there, in the order pressed, with the context it was pressed in, each
 * read where the focus is then (`route`); dropped, with every other key held
 * for the same jump, where the jump never lands.
 * @param {KeyboardEvent} e
 * @param {Ctx} ctx
 */
function hold(e, ctx) {
  held.push({ e, ctx, jump: GO.aground() });
  if (!replaying) void replay();
}

/** the held keys made, each once the landing it waits for answers, one after another: a key's act ends before the next is read */
async function replay() {
  replaying = true;
  try {
    while (held.length) {
      const k = held[0];
      if (!(await k.jump)) { while (held.length && held[0].jump === k.jump) held.shift(); continue; }
      held.shift();
      const run = route(k.e, chordOf(k.e), k.ctx);
      if (!run) continue;
      making = true;
      try { await run(); } finally { making = false; }
    }
  } finally {
    replaying = false;
  }
}

/**
 * A key while the reading scene stands (D5 M-4; K-60 … K-64). The scene
 * covers the plane, and nothing it covers takes a key: the walk, the
 * selection and the corner stand under it as they were. Wherever the focus
 * is, Mod+R re-levels (K-62), Mod+= is swallowed (K-64), Mod+- ends the
 * scene (K-63) and Mod+Shift+P shows the one line's strip (K-23); the
 * selection's slot chords, which have nothing to act on in the scene, are
 * taken and do nothing, so the browser's own meanings never run (Mod+Shift+R
 * would reload), as F5 is (K-94). On the one line or a standing overlay every
 * other key is that control's own. Elsewhere ← ends the scene (K-63); a
 * pane's own keys moved that pane, and Enter at a pane's corner took the
 * corner's act, before the dispatch (SC's `key`, K-60), and → and Enter
 * elsewhere in a pane, and Shift with the
 * arrows, are the platform's; on the scene's acts every other key is the
 * button's own — Enter and Space press it; a printable key anywhere else is
 * swallowed, the K-9 line shown.
 * @param {KeyboardEvent} e
 * @param {string} chord
 * @param {Ctx} ctx
 * @returns {Act | null} the key's act; null where the page takes no such key there
 */
function sceneKey(e, chord, ctx) {
  if (chord === 'Mod+R') return () => { SCENE.relevel(); return true; };
  if (chord === 'Mod+=') return () => true; // swallowed: nothing is nearer than the scene's reading scale
  if (chord === 'Mod+-') return () => { SCENE.close(); CAM.markDirty(); return true; };
  if (SLOT_CHORDS.has(chord) || e.key === 'F5') return () => true;
  if (chord === 'Mod+Shift+P') return () => { LINE.stripAct(); return true; };
  if (ctx.where === 'overlay' || ctx.where === 'line') return null; // the overlay's or the line's own keys
  if (chord === '←') return () => { SCENE.close(); CAM.markDirty(); return true; };
  if (ctx.where === 'scene-acts') return null; // the button's own keys
  if (printable(e)) return () => { swallow(e); return true; };
  return null;
}

/** a printable key no field takes: swallowed, the K-9 line at the focus until the next act (foundations §2.7) */
function swallow(/** @type {KeyboardEvent} */ e) {
  LINE.transient(e.key === ' ' ? t('F.swallow.space', { 'paging key': 'PageDown' }) : t('F.swallow', { 'LEAP chord': drawChord('Mod+L') }));
}

/**
 * Esc's one order (§4 rule 7; D7): the most recently opened thing closes —
 * the box, the card or scene still reading (O-HOST's opening, ended alone:
 * the overlay standing under it stands), the overlay — a jump's reaching
 * face among them, whose dismissal abandons the jump — then a jump reaching
 * whose face another overlay took the place of (FP-25; N-GO's `abandon`),
 * the scene, then the selection, which a scene
 * stands over and which outlives it, then the arrival — its outline, its
 * labels and its line (FP-21; N-GO's `endArrival`); on the bare plane nothing.
 */
export function esc() {
  if (LEAP.isOpen()) { LEAP.close(); return; }
  if (HOST.pending()) { HOST.endOpening(); return; }
  if (HOST.current()) { HOST.dismiss(); return; }
  if (GO.abandon()) return;
  if (SCENE.isOpen()) { SCENE.close(); CAM.markDirty(); return; }
  if (SEL.selected()) { SEL.clear(); return; }
  GO.endArrival();
}

/**
 * Enter activates the focus (K-7): a place goes — the board, an account or a
 * document, each a teleport pushed on the trail, a document's made at the
 * document, where the face of a failure known at the act stands (N-GO) — a
 * continuation's mark opens its members' list, which takes the focus on its
 * newest row (O-MARK-LIST); a withheld
 * run shows its face whole (§2.1), C-67's pointer its offered act, a LEAP to
 * the edition its claim names made at the run, reached by Tab (K-58); any
 * other span is selected whole (D8), a link's
 * symbol opens its card, which takes the focus as a key opened it (K-55).
 * → at a document below its reading scale takes this act too (K-3; see the
 * head).
 * @param {boolean} byKey
 */
async function activateFocus(byKey) {
  const f = WALK.current();
  if (!f) { await WALK.enter(); return; }
  if (f.kind === 'account') { await GO.toAccount(f.addr, byKey); return; }
  if (f.kind === 'board') { await GO.wholeBoard(byKey); return; }
  if (f.kind === 'mark') { await MARKLIST.open(f.addr, byKey); return; }
  if (f.kind === 'document') { await GO.leapTo(f.addr, { how: 'key', byKey, site: { span: { addr: f.addr, pos: 1 } } }); return; }
  if (f.kind === 'block' && f.pos != null) {
    const b = REC.blockByPos(f.addr, f.pos);
    if (b && b.kind === 'withheld') FACES.withheldRun(f.addr, b, (home, byKey) => GO.leapTo(home, { how: 'leap', byKey, site: { span: { addr: f.addr, pos: b.pos, width: b.width } } }));
    else SEL.select(f.addr, f.pos);
    return;
  }
  if (f.kind === 'link' && f.link) ANATOMY.open(f.link, null, byKey);
}

/**
 * A paging key (K-6): at reading scale, the view's centre over a column whose
 * foot the view already shows (PageDown) or whose top it shows (PageUp), the
 * next column's top — or the previous one's — brought to the top of the view,
 * centred across it, at once (T-LAYER's `pageTarget`; FP-12); anywhere else
 * the view paged by 0.9 of its height.
 * @param {1 | -1} dir
 */
function page(dir) {
  const to = LAYER.pageTarget(dir);
  if (to) { CAM.set(to); return; }
  const { VH } = CAM.viewport();
  CAM.panBy(0, dir > 0 ? -VH * 0.9 : VH * 0.9);
}

/** a zoom chord (K-11): the camera stepped about the view's centre, the focus re-taken at the new grain with the ring drawn (rule 10) */
function zoomAboutFocus(/** @type {number} */ factor, /** @type {boolean} */ byKey) {
  const { VW, VH } = CAM.viewport();
  CAM.zoomAt(factor, VW / 2, VH / 2);
  CAM.markDirty();
  WALK.retakeFromView(byKey);
}
