// N-KEYS — D5's key table as a dispatch (the structure record §3.2 "N-KEYS";
// designs/D5-keys.md §1.1–§1.8, §1.11 (the UI rows), §4 the focus model;
// foundations §2.7). Layer 2. The TABLE pure; the dispatch acts on the owners
// it names (the one layer-2 module that imports across the layer — S-7 (a)).
// State: none but the swallow's transient mark (through the line).
// No plane command rides a printable key (§2.7): every command is a CHORD
// (Mod = ⌘ on macOS, Ctrl elsewhere — D5 §0, RULED) or a navigation key with
// the platform's meaning; a printable key on the plane is SWALLOWED, never
// dispatched, the swallow line K-9 shown at the focus until the next act; no
// key is dispatched while an input method's composition is open (the IME
// guard); Esc closes the innermost thing in one order (§4 rule 7). Tab is
// the platform's, over the page's order: the line → the plane (the mirror's
// current item) → the focused document's corner, where Enter takes the
// corner's act and the walk's keys and the swallow do not run (K-57) → a
// standing overlay → the line (§4 rule 5); while the scene stands, its
// panes and its acts take the place of the plane's stop and the corner
// (SC), and no key reaches what it covers — the walk, the selection, the
// corner — wherever the focus is (`sceneKey`; D5 M-4: "the walk within the
// focused pane"). Shift with ← and → is never dispatched: it is the
// platform's own (D5 K-71, its text keys "Shift extending"), which extends a
// selection the platform holds where that selection holds the focus — after
// a drag, not from the mirror's item or an overlay (the gate's figures,
// Chrome on its machine) — and APP-INPUT reads what it does back into the
// page's selection (R11).
// The wireframe's bare keys (`/`, `t`, `k`, `0`–`9`, `+`, `-`, `h`, `?`, `w`,
// `n`, `p`) are a sketch and are RE-CUT here to D5's rows (the record §3.4
// (ix)): `/` → K-30 Mod+L / Mod+K; `0`/`g`/Home → K-13 Mod+0, K-14
// Mod+Shift+H; `t` → K-41 Mod+Y; `1`–`9` (a push) → K-40 Mod+1…9 (a cursor
// move); `+`/`-` → K-11 Mod+= / Mod+-; the arrows' pan and the `k` toggle →
// the walk, always live (K-1…K-7). K-91 (find) is NOT in this lane's cut —
// its box has no design form (reported). Every teleport a key makes, and
// every camera move a key makes that re-takes the focus, is told a key made
// it, so the ring stands at the focus it lands (D5 §4 rule 2).
// Rules: FP-1, FP-2, FP-9 (a key changes view state or asks for a read, and
// marks the frame dirty), FP-13.

import * as GO from './go.js';
import * as WALK from './walk.js';
import * as LEAP from './leap.js';
import * as HOST from '../overlays/host.js';
import * as SEL from '../overlays/selection.js';
import * as SCENE from '../scene/scene.js';
import * as LINE from '../line/line.js';
import * as TRAILLIST from '../overlays/trail-list.js';
import * as VERSIONS from '../overlays/versions.js';
import * as CAM from '../plane/camera.js';
import { t } from '../strings.js';

/** the platform's primary command modifier: ⌘ on macOS, Ctrl elsewhere (D5 §0 RULED) */
export const MAC = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform || '');

/**
 * @typedef {Object} Row — one row of D5's table the lane built
 * @property {string} id K-n
 * @property {string} chord the key as D5 writes it (`Mod+L`, `↓`, `Enter`)
 * @property {string} act the act's name
 * @property {'plane' | 'line' | 'box' | 'trail' | 'selection' | 'cards' | 'corner' | 'scene' | 'platform'} surface
 */

/** THE TABLE — every chord this lane binds, by D5's row (K-9's swallow, K-10's quasimode and K-12's pinch are the input module's) */
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
  { id: 'K-62', chord: 'Mod+R', act: 'scene.relevel', surface: 'scene' },
  { id: 'K-63', chord: 'Esc', act: 'esc', surface: 'scene' },
  { id: 'K-64', chord: 'Mod+=', act: 'scene.swallowZoomIn', surface: 'scene' },
  { id: 'K-92', chord: 'Mod+C', act: 'platform.copy', surface: 'platform' },
  { id: 'K-92', chord: 'Mod+P', act: 'platform.print', surface: 'platform' },
  { id: 'K-94', chord: 'Mod+R', act: 'nothing', surface: 'platform' },
]));

/** the selection's slot chords (K-47 … K-52): the TABLE's selection rows */
const SLOT_CHORDS = new Set(TABLE.filter((r) => r.surface === 'selection').map((r) => r.chord));

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

/** how a chord is drawn for this platform (D5 §0: the UI lane's) */
export const drawChord = (/** @type {string} */ chord) => (MAC ? chord.replace('Mod+', '⌘').replace('Shift+', '⇧').replace('Enter', '↩') : chord.replace('Mod', 'Ctrl'));

/**
 * @typedef {Object} Ctx — where the focus is
 * @property {'plane' | 'line' | 'box' | 'overlay' | 'corner' | 'scene' | 'scene-acts' | 'field'} where `scene` a reading scene's pane, `scene-acts` its bar's buttons
 */

/**
 * Dispatch a key: true where the page took it (the caller then prevents the
 * default). A branch that waits before it answers prevents the default
 * itself, before the wait — the platform runs the default as soon as the
 * listeners return, not when the answer arrives. Nothing is dispatched
 * during an IME composition.
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
  // Esc: the innermost thing, one order
  if (chord === 'Esc') { esc(); return true; }
  // the LEAP box
  if (chord === 'Mod+L' || chord === 'Mod+K') { LEAP.open(); return true; }
  // Back / Forward (K-20, K-21)
  if (chord === 'Mod+[') { GO.back(true); return true; }
  if (chord === 'Mod+]') { GO.forward(true); return true; }
  // the trail (K-40, K-41)
  if (/^Mod\+[1-9]$/.test(chord)) { GO.toTrailEntry(Number(chord.slice(4)), true); return true; }
  if (chord === 'Mod+Y') { TRAILLIST.open(); return true; }
  // WHOLE BOARD / HOME (K-13, K-14)
  if (chord === 'Mod+0') { GO.wholeBoard(true); return true; }
  if (chord === 'Mod+Shift+H') { GO.home(true); return true; }
  // the scene covers the plane: its keys alone, nothing under it takes one
  if (SCENE.isOpen()) return sceneKey(e, chord, ctx);
  // zoom (K-11)
  if (chord === 'Mod+=') { zoomAboutFocus(1.25); return true; }
  if (chord === 'Mod+-') { zoomAboutFocus(1 / 1.25); return true; }
  // the selection's slot chords (K-47 … K-52) and K-8's select-by-span — live from the plane and from a standing overlay alike (the acts' card takes focus on a key-made selection, and the next press extends it)
  if (chord === 'Mod+Shift+O') { SEL.act('wrote'); return true; }
  if (chord === 'Mod+Shift+R') { SEL.act('uses'); return true; }
  if (chord === 'Mod+Shift+L') { SEL.act('links'); return true; }
  if (chord === 'Mod+Enter') { SEL.act('follow', true); return true; }
  if (chord === 'Mod+Shift+Enter') { SEL.act('scene'); return true; }
  if (chord === 'Shift+↓') { SEL.selectFocused('down'); return true; }
  if (chord === 'Shift+↑') { SEL.selectFocused('up'); return true; }
  if (chord === 'Mod+Shift+P') { LINE.stripAct(); return true; }
  if (chord === 'Mod+R' || e.key === 'F5') { return true; } // K-94: the plane is live; nothing reloads
  // the corner (K-57): Enter takes its act; its other keys are the platform's
  if (ctx.where === 'corner') {
    const corner = /** @type {HTMLElement | null} */ (/** @type {HTMLElement} */ (e.target).closest('[data-corner]'));
    return chord === 'Enter' && !!corner && VERSIONS.fromCorner(corner, SEL.selected());
  }
  if (ctx.where === 'overlay' || ctx.where === 'line') return false; // the overlay's or the line's own keys
  // the walk (K-1 … K-8): each key waits on the camera's flight, and the platform runs a key's default — a scroll of
  // the scroller the focus stands in, the mirror — as soon as the listeners return; so the default is prevented first
  if (chord === '↓') { e.preventDefault(); await WALK.key('down'); return true; }
  if (chord === '↑') { e.preventDefault(); await WALK.key('up'); return true; }
  if (chord === '→') { e.preventDefault(); await WALK.key('in'); return true; }
  if (chord === '←') { e.preventDefault(); await WALK.key('out'); return true; }
  if (chord === 'Home') { e.preventDefault(); await WALK.key('first'); return true; }
  if (chord === 'End') { e.preventDefault(); await WALK.key('last'); return true; }
  if (chord === 'PageDown' || chord === 'PageUp') { const { VH } = CAM.viewport(); CAM.panBy(0, chord === 'PageDown' ? -VH * 0.9 : VH * 0.9); CAM.markDirty(); WALK.retakeFromView(true); return true; }
  if (chord === 'Enter') { await activateFocus(); return true; }
  // a printable key on the plane: swallowed, the K-9 line at the focus
  if (printable(e)) { swallow(e); return true; }
  return false;
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
 * other key is that control's own. Elsewhere ← ends the scene (K-63: "←
 * out of a pane's document"); a pane's own keys moved that pane before the
 * dispatch (SC's `key`, K-60), and → and Enter in a pane, and Shift with the
 * arrows, are the platform's; on the scene's acts every other key is the
 * button's own — Enter and Space press it; a printable key anywhere else is
 * swallowed, the K-9 line shown.
 * @param {KeyboardEvent} e
 * @param {string} chord
 * @param {Ctx} ctx
 * @returns {boolean} the page took the key
 */
function sceneKey(e, chord, ctx) {
  if (chord === 'Mod+R') { SCENE.relevel(); return true; }
  if (chord === 'Mod+=') return true; // swallowed: nothing is nearer than the scene's reading scale
  if (chord === 'Mod+-') { SCENE.close(); CAM.markDirty(); return true; }
  if (SLOT_CHORDS.has(chord) || e.key === 'F5') return true;
  if (chord === 'Mod+Shift+P') { LINE.stripAct(); return true; }
  if (ctx.where === 'overlay' || ctx.where === 'line') return false; // the overlay's or the line's own keys
  if (chord === '←') { SCENE.close(); CAM.markDirty(); return true; }
  if (ctx.where === 'scene-acts') return false; // the button's own keys
  if (printable(e)) { swallow(e); return true; }
  return false;
}

/** a printable key no field takes: swallowed, the K-9 line at the focus until the next act (foundations §2.7) */
function swallow(/** @type {KeyboardEvent} */ e) {
  LINE.transient(e.key === ' ' ? t('F.swallow.space', { 'paging key': 'PageDown' }) : t('F.swallow', { 'LEAP chord': drawChord('Mod+L') }));
}

/** Esc's one order (§4 rule 7): the most recent overlay; the selection; the scene; on the bare plane nothing */
export function esc() {
  if (LEAP.isOpen()) { LEAP.close(); return; }
  if (HOST.current()) { HOST.dismiss(); return; }
  if (SEL.selected()) { SEL.clear(); return; }
  if (SCENE.isOpen()) { SCENE.close(); CAM.markDirty(); return; }
}

/** Enter activates the focus (K-7): a place goes — the board, an account or a document, each a teleport pushed on the trail — a span is selected, a link's symbol opens its card */
async function activateFocus() {
  const f = WALK.current();
  if (!f) { await WALK.enter(); return; }
  if (f.kind === 'account') { await GO.toAccount(f.addr, true); return; }
  if (f.kind === 'board') { await GO.wholeBoard(true); return; }
  if (f.kind === 'document') { await GO.leapTo(f.addr, { how: 'key', byKey: true }); return; }
  if (f.kind === 'block' && f.pos != null) { SEL.select(f.addr, f.pos); return; }
  if (f.kind === 'link' && f.link) { const { open } = await import('../overlays/anatomy-card.js'); open(f.link, null); }
}

function zoomAboutFocus(/** @type {number} */ factor) {
  const { VW, VH } = CAM.viewport();
  CAM.zoomAt(factor, VW / 2, VH / 2);
  CAM.markDirty();
  WALK.retakeFromView(true);
}
