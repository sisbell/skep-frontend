// N-FIND — the page's own find in the document being read (R9a; B2-S5; D5
// K-91). Layer 2, engine-bound. State (FP-10): the find standing — the
// document it searches, by its box and the version searched, or a reading
// scene's pane — the text typed, the matches in that version's text as the
// page shows it and the current one, whether the rest of the text is being
// read and the refusal a part met, the trail entry its moves share and the one
// the cursor stood on, a move waiting for a part, and the answer last said;
// the find a move away ended at each trail entry, by its box and its text
// typed (`left`); and its box's height where it stands at a corner's place. A
// control that rebuilds itself from its state (FP-13).
// Opened (`open`; N-KEYS's Mod+F, and its Mod+G and Mod+Shift+G where nothing
// else steps — the installed app's Find menu items raise no event the page
// reads) at the document the focus is in — the walk's document, a span or a
// link's end in it, the document a corner the focus stands on names, or,
// while the reading scene stands, the pane holding the focus (SC's
// `paneRead`) — its field taking the focus (N-FOCUS's `open`), any card still
// reading ended (O-HOST's opening) and the arrival standing ended (FP-21;
// N-GO's `endArrival`). Its box stands at the document's edge, at its
// corner's place, the corner's items stacking beneath it (`atop`; T-LAYER's
// `cornerPlace`), else at the top of the document's region, held below the
// one line and inside the viewport, and in a scene at its pane's top
// (`place`). Off any document — the board, an account, a mark — none opens:
// its hint beside the focus says where words are found (O-HINT's `show`).
// What it searches (FP-6, FP-24): the version's text as the page shows it
// (T-LAYER's `shownOf`; a pane's own record), every content run — quoted and
// transcluded text among them; the page's own signs are no part of it — the
// typed text matched anywhere in a run, case ignored, so no match joins text
// across an item (`matchesIn`). The rest of the text is read once as it opens
// (M-PUMP's `readRest`), each part searched as it lands, and read again only
// where a drop took what it read; never a read per keystroke. A pane holds
// its text whole and reads nothing.
// Its answers (B2-S5): each true of the whole version searched, or naming
// what it could not search — while a part is out, "≥ ⟨n⟩ so far" and the
// parts line; every part in, "⟨k⟩ of ⟨n⟩"; none, a miss naming the document
// and the version searched; withheld text in the version said unsearched; a
// part the board would not give said, searched only part of it and why
// (BM-HELD's `whyOf`); an empty document, B1-S13's words. Each answer is said
// in the status region once, as its words change (N-FOCUS's `say`).
// Its moves (FP-21, FP-25): the current match is the first at or after the
// view's first line in the document as it opens; typing takes the first match
// at or after the current one, else after that line, and next
// and previous (Enter and Shift+Enter in its field; Mod+G and Mod+Shift+G,
// and F3 and Shift+F3 elsewhere than macOS; its two buttons) the next and the
// previous, wrapping; a move past the matches in hand while a part is out
// waits for it (`waiting`). Each move takes the camera to the match at the
// reading size, the match alone outlined as the arrival, its lines mounting
// as any in view (N-GO's `toMatch`): the first pushes one trail entry, each
// after it re-uses that entry, so Back returns to where the find opened. A
// part's arrival moves nothing: the current match is kept by its place. Esc
// closes it (`close`; N-KEYS's order), the current match left selected — its
// span in the text as the board served it — the walk on its span, the camera
// still and the focus there (N-FOCUS's `close`, `toWalk`), else the focus
// returned as any region's close returns it.
// Its life (FP-36): it belongs to its document — its own moves, and any move
// that keeps the cursor on an entry in its box or whose view reads it, keep
// it, searching the version its box shows (FP-22); a move to another place
// ends it, its text typed kept for the entry it stood at, which a return to
// that entry reopens without the focus (`refresh`). A change of the
// page's class keeps the text typed and drops everything it measured, the
// text read again at the new class (`classChanged`; FP-29).
// Rules: FP-1, FP-2, FP-6, FP-9, FP-10, FP-13, FP-20, FP-21, FP-24, FP-25,
// FP-29, FP-36.

import * as REC from '../model/records.js';
import * as PUMP from '../model/pump.js';
import * as CAM from '../plane/camera.js';
import * as LAYER from '../text/layer.js';
import * as HELD from '../beams/held.js';
import * as HOST from '../overlays/host.js';
import * as SEL from '../overlays/selection.js';
import * as HINT from '../overlays/hint.js';
import * as SCENE from '../scene/scene.js';
import * as LINE from '../line/line.js';
import * as GO from './go.js';
import * as TRAIL from './trail.js';
import * as WALK from './walk.js';
import * as FOCUS from './focus.js';
import { MAC, drawChord } from './keys.js';
import { documentOf, memberOf } from '../model/address.js';
import { toBase } from '../model/derive.js';
import { t, addressedHTML } from '../strings.js';
import { byteLength } from '../util.js';

/** @typedef {import('../model/records.js').Doc} Doc */
/** @typedef {import('../model/frames.js').Run} Run */
/** @typedef {import('./trail.js').Entry} Entry */

/** @typedef {{pos: number, width: number}} Match a match in the text searched: its first position and its positions, in that text as the page shows it */

/**
 * @typedef {Object} Find — the find standing (see the head)
 * @property {string} box the document's box: its plain address, which every version shares
 * @property {string} addr the version searched: the one the box shows (N-GO's `shownIn`), or a pane's own (SC's `Pane.names`)
 * @property {'a' | 'b' | null} side the reading scene's pane it searches; null on the plane, and from its first move, which leaves the scene
 * @property {string} query the text typed
 * @property {Match[]} matches in the text's order
 * @property {number} current the current match, an index into `matches`; -1 where none is current
 * @property {boolean} marked a move outlined the current match as the arrival
 * @property {boolean} reading the rest of the text is being read (M-PUMP's `readRest`)
 * @property {number} readDrops the document's drops as its last read began (M-REC's `dropsOf`): it is read again only once a drop took what was read
 * @property {import('../beams/held.js').Met | null} refused the refusal a part of the text met, by its kind and its name: it searched only part of it
 * @property {Entry | null} own the trail entry its moves share; null before its first move
 * @property {Entry | null} at the trail entry the cursor stood on as it last read it: a cursor that leaves for another place ends the find
 * @property {Run[] | null} searched the runs its matches were found in: searched again where the text shown moved
 * @property {string} for the text typed its matches were found for
 * @property {1 | -1 | 0} waiting a move past the matches in hand made while a part is out, made as the read lands; 0 where none waits
 * @property {string} said the answer last said in the status region
 */

/** @type {{box: HTMLElement, input: HTMLInputElement, count: HTMLElement, prev: HTMLButtonElement, next: HTMLButtonElement, note: HTMLElement} | null} */
let els = null;
/** @type {Find | null} */
let state = null;
/** @type {WeakMap<Entry, {box: string, query: string}>} the find a move away ended at each entry, by its document's box and the text typed: a return to the entry reopens it */
let left = new WeakMap();
/** @type {Entry | null} the cursor's entry as the last refresh read it, with no find standing: a cursor reaching another reopens what `left` holds there */
let seen = null;
/** the box's height and the gap below it, in px, where it stands at a corner's place (`atop`) */
let height = 0;
/** the gap between the box and what it stands over or beside, px */
const GAP = 6;

/** the box a document address stands in: its plain address */
const boxOf = (/** @type {string} */ addr) => documentOf(addr) || addr;

/**
 * @param {{box: HTMLElement, input: HTMLInputElement, count: HTMLElement, prev: HTMLButtonElement, next: HTMLButtonElement, note: HTMLElement}} e
 */
export function attach(e) {
  els = e;
  e.box.setAttribute('aria-label', t('L.find-label'));
  e.input.setAttribute('aria-label', t('L.find-label'));
  e.prev.textContent = t('L.find.previous'); e.next.textContent = t('L.find.next');
  e.input.addEventListener('input', () => typed());
  e.box.addEventListener('keydown', (ev) => {
    if (ev.target === e.input && (ev.isComposing || ev.key === 'Process' || ev.keyCode === 229)) { ev.stopPropagation(); return; } // the IME's until it commits (D5 §0)
    const mod = MAC ? ev.metaKey : ev.ctrlKey, k = ev.key.length === 1 ? ev.key.toLowerCase() : ev.key;
    const dir = (mod && k === 'g') || (!MAC && k === 'F3') || (ev.target === e.input && k === 'Enter') ? (ev.shiftKey ? -1 : 1) : 0;
    if (dir) { ev.preventDefault(); ev.stopPropagation(); step(dir, true); return; }
    if (k === 'Escape') { ev.preventDefault(); ev.stopPropagation(); void close(true); return; }
    if (mod && k === 'f') { ev.preventDefault(); ev.stopPropagation(); FOCUS.land(e.input, { byKey: true }); e.input.select(); }
  });
  // a press on the box's buttons moves without taking the focus off the field
  e.box.addEventListener('mousedown', (ev) => { if (ev.target !== e.input) ev.preventDefault(); });
  e.prev.addEventListener('click', (ev) => step(-1, FOCUS.byKey(ev)));
  e.next.addEventListener('click', (ev) => step(1, FOCUS.byKey(ev)));
}

/** does a find stand? */
export const isOpen = () => state !== null;

/** the version an open find searches on the plane — the text M-PUMP keeps as the view keeps the documents it shows (its `finding`); null where none stands, or it searches a pane, whose text the scene keeps */
export const searched = () => (state && !state.side ? state.addr : null);

/**
 * The find as it stands, read-only (the gate and the tests read it): the
 * version it searches, the text typed, its matches and the current one,
 * whether a part is out and the refusal a part met, the trail entry its
 * moves share by its index on the trail (-1 before its first move), its
 * answer, and the answer last said.
 */
export function stands() {
  const s = state;
  if (!s) return null;
  const a = answerOf(s);
  return { box: s.box, addr: s.addr, scene: !!s.side, query: s.query, matches: s.matches.map((m) => ({ ...m })), current: s.current, reading: s.reading, refused: s.refused, entry: s.own ? TRAIL.all().indexOf(s.own) : -1, count: a.count, clauses: a.clauses, said: s.said };
}

/**
 * The document the focus is in (see the head): the pane holding the focus
 * while the scene stands; the document a corner names (`at`); the walk's
 * document, a span or a link's end in it. Null off any document.
 * @param {string | null} at the document a corner the focus stands on names
 * @returns {{box: string, addr: string, side: 'a' | 'b' | null} | null}
 */
function targetOf(at) {
  if (SCENE.isOpen()) {
    const p = SCENE.paneRead();
    return p ? { box: boxOf(p.names), addr: p.names, side: p.side } : null;
  }
  const f = WALK.current();
  const addr = at || (f && (f.kind === 'document' || f.kind === 'block' || f.kind === 'link') ? f.addr : null);
  if (!addr || !documentOf(addr)) return null;
  const box = boxOf(addr);
  return { box, addr: GO.shownIn(box), side: null };
}

/**
 * Open the find at the document the focus is in (see the head): its field
 * takes the focus, its text selected, the text typed before kept; a find
 * standing at another document is ended first, its text typed carried. Off
 * any document its hint says where words are found, and nothing opens.
 * @param {string | null} [at] the document a corner the focus stands on names
 * @param {boolean} [byKey] a key made the act
 * @param {{repeat?: boolean, at?: Element | null}} [key] what the hint is told of the key (O-HINT's `show`): its auto-repeat, and the element it was pressed at
 */
export function open(at = null, byKey = true, key = {}) {
  if (!els) return;
  const to = targetOf(at);
  if (!to) { HINT.show('L.find.off', { 'find chord': drawChord('Mod+F') }, key); return; }
  const s = state, query = s ? s.query : els.input.value;
  if (s && (s.box !== to.box || s.side !== to.side)) quit(false);
  HOST.endOpening();
  if (!state) { GO.endArrival(); begin(to, query); }
  FOCUS.open('find', { el: els.box, byKey, first: els.input });
  els.input.select();
  CAM.markDirty();
}

/**
 * A find stood up at a document with a text typed (see the head): its rest
 * read, its matches searched over what is in hand, the current one the first
 * at or after the view's first line in the document, its answer drawn; no
 * move is made.
 * @param {{box: string, addr: string, side: 'a' | 'b' | null}} to
 * @param {string} query
 */
function begin(to, query) {
  if (!els) return;
  state = { box: to.box, addr: to.addr, side: to.side, query, matches: [], current: -1, marked: false, reading: false, readDrops: -1, refused: null, own: null, at: TRAIL.current(), searched: null, for: '', waiting: 0, said: '' };
  els.input.value = query;
  els.box.classList.add('on');
  readRest(state);
  search(state);
  render();
}

/**
 * The text typed changed: the matches searched again, the current one the
 * first at or after the current match — else after the view's first line in
 * the document — and the camera taken there (`move`); none where nothing
 * matches, the match outlined before taken down.
 */
function typed() {
  const s = state;
  if (!s || !els) return;
  const from = anchorOf(s);
  s.query = els.input.value;
  search(s, from);
  if (s.current >= 0) move(s, true);
  else unmark(s);
  render();
}

/**
 * Where the first match is looked for from (see the head): the current
 * match's place; else the first position the view shows of the document — a
 * pane's first in its view — else its head.
 * @param {Find} s
 * @returns {number}
 */
function anchorOf(s) {
  const m = s.current >= 0 ? s.matches[s.current] : null;
  if (m) return m.pos;
  if (s.side) { const p = SCENE.paneRead(s.side); return p && p.first != null ? p.first : 1; }
  const w = LAYER.inView(s.addr) ? LAYER.windowIn(s.addr) : null;
  return w ? w.from : 1;
}

/** the record a find searches: its pane's own, else the version's text as the page shows it (T-LAYER's `shownOf`) */
function recordOf(/** @type {Find} */ s) {
  const p = s.side ? SCENE.paneRead(s.side) : null;
  return p ? p.d : LAYER.shownOf(s.addr);
}

/**
 * The matches searched over the text in hand (`matchesIn`), where it or the
 * text typed moved since they were found; the current one kept by its place
 * — the first match at or after `from`, else after the current match's place
 * or, none current, the view's first line in the document (`anchorOf`),
 * wrapping to the first.
 * @param {Find} s
 * @param {number | null} [from]
 */
function search(s, from = null) {
  const d = recordOf(s);
  if (s.searched === d.runs && s.for === s.query) return;
  const at = from ?? anchorOf(s);
  s.matches = matchesIn(d.runs, s.query);
  s.searched = d.runs; s.for = s.query;
  if (!s.matches.length) { s.current = -1; return; }
  const i = s.matches.findIndex((m) => m.pos >= at);
  s.current = i >= 0 ? i : 0;
}

/** a string with each character lower-cased where that keeps its length, so its positions stand where the text's do */
function fold(/** @type {string} */ s) {
  let out = '';
  for (const ch of s) { const l = ch.toLowerCase(); out += l.length === ch.length ? l : ch; }
  return out;
}

/** @type {WeakMap<Run, string>} each content run's text folded (`fold`), as its run was delivered */
const folded = new WeakMap();

/**
 * The matches of a text typed in delivered runs (see the head): each content
 * run's text searched for it anywhere, case ignored, the matches in a run
 * not overlapping, each placed by its UTF-8 bytes from its run's first
 * position; a run that is not content — a withheld run, a record, a reference,
 * an item this client does not show — holds none, and no match joins two
 * runs across one.
 * @param {Run[]} runs
 * @param {string} query
 * @returns {Match[]}
 */
export function matchesIn(runs, query) {
  const q = fold(query);
  /** @type {Match[]} */
  const out = [];
  if (!q) return out;
  for (const r of runs) {
    if (r.kind !== 'content') continue;
    let text = folded.get(r);
    if (text == null) { text = fold(r.text); folded.set(r, text); }
    let bytes = 0, at = 0;
    for (let i = text.indexOf(q); i >= 0; i = text.indexOf(q, i + q.length)) {
      bytes += byteLength(r.text.slice(at, i)); at = i;
      out.push({ pos: r.pos + bytes, width: byteLength(r.text.slice(i, i + q.length)) });
    }
  }
  return out;
}

/**
 * The rest of the version's text read for the find (M-PUMP's `readRest`),
 * where the record lacks any of it and no read of it is out; each part, as
 * it lands, searched by the frame that sets it (`refresh`). A pane reads
 * nothing: it holds its text whole.
 * @param {Find} s
 */
function readRest(s) {
  if (s.side || s.reading) return;
  s.readDrops = REC.dropsOf(s.addr);
  const d = REC.doc(s.addr);
  if (d.refused || (d.extent != null && !PUMP.textLacked(d).length)) return;
  s.reading = true; s.refused = null;
  const addr = s.addr;
  void PUMP.readRest(addr, () => CAM.markDirty()).then((out) => {
    if (state !== s || s.addr !== addr) return;
    s.reading = false; s.refused = out.refused;
    CAM.markDirty();
    refresh();
  });
}

/**
 * A move to the next match, or the previous one (see the head): from the
 * current match, wrapping — save past the matches in hand while a part is
 * out, where it waits for the read (`waiting`) — the current one itself the
 * next where no move has taken the camera to it; else, none current, the
 * first at or after the view's first line in the document, or the last
 * before it. Nothing where no match stands.
 * @param {1 | -1} dir
 * @param {boolean} [byKey] a key made the move
 * @returns {boolean} a move was made, or waits
 */
export function step(dir, byKey = false) {
  const s = state;
  if (!s || !s.matches.length) return false;
  // a current match no move has taken the camera to yet is the next one, and the one before it the previous
  let i = s.current + (s.marked || dir < 0 ? dir : 0);
  if (s.current < 0) {
    const from = anchorOf(s), k = s.matches.findIndex((m) => m.pos >= from);
    i = dir > 0 ? (k >= 0 ? k : 0) : (k > 0 ? k - 1 : s.matches.length - 1);
  } else if (i < 0 || i >= s.matches.length) {
    if (s.reading) { s.waiting = dir; return true; }
    i = (i + s.matches.length) % s.matches.length;
  }
  s.current = i;
  move(s, byKey);
  render();
  return true;
}

/**
 * The camera taken to the current match (N-GO's `toMatch`): outlined as the
 * arrival, the walk on its span, the first move pushing the entry every move
 * after it shares. A move made from a reading scene's pane leaves the scene,
 * as every jump does; the find stands on the plane from then.
 * @param {Find} s
 * @param {boolean} byKey
 */
function move(s, byKey) {
  const m = s.matches[s.current];
  if (!m) return;
  const own = GO.toMatch(s.addr, m, { own: s.own, byKey });
  if (!own) return;
  s.own = own; s.at = TRAIL.current(); s.marked = true; s.side = null;
}

/** the current match's outline taken down where the find made the arrival standing and holds no current match: only its match is marked */
function unmark(/** @type {Find} */ s) {
  if (!s.marked) return;
  s.marked = false;
  const a = GO.arrivalMark();
  if (a && boxOf(a.addr) === s.box && !a.link) GO.endArrival();
}

/**
 * Esc (see the head; FP-20): the find closes; its current match, where a
 * move took the camera to it, selected — its span carried into the text as
 * the board served it (M-DERIVE's `toBase`) — the walk on its span, the
 * camera still and the focus on the walk's element in the place of the
 * find's opener; where none stands, the focus returned as any region's close
 * returns it.
 * @param {boolean} [byKey] a key made the act
 */
export async function close(byKey = true) {
  const s = state;
  if (!s || !els) return;
  const m = s.marked && s.current >= 0 && !s.side ? s.matches[s.current] : null;
  hide();
  if (!m) { FOCUS.close('find'); return; }
  const edits = REC.edits(s.addr), pos = toBase(edits, m.pos), end = toBase(edits, m.pos + m.width);
  SEL.select(s.addr, pos, Math.max(1, end - pos));
  await WALK.focusTo(s.addr, pos, byKey, false, null, true);
  FOCUS.close('find', { toWalk: true });
}

/** the find taken down: its state, its box and the corner's room */
function hide() {
  state = null; height = 0;
  if (els) els.box.classList.remove('on');
  CAM.markDirty();
}

/**
 * The find ended by a move away (see the head): where `keep`, its box and
 * its text typed kept for the entry it stood at; the focus returned as any
 * region's close returns it.
 * @param {boolean} keep
 */
function quit(keep) {
  const s = state;
  if (!s) return;
  if (keep && s.at && s.query) left.set(s.at, { box: s.box, query: s.query });
  hide();
  FOCUS.close('find');
}

/**
 * The find read again on each dirty frame (APP; see the head): a cursor that
 * left for another place ends it — its text typed kept for the entry it stood
 * at — one on an entry in its box, or whose view reads its document, keeps it
 * there; with none standing, a cursor reaching an entry a find was left at
 * reopens it there without the focus. Standing, it follows the version its
 * box shows (FP-22), reads again what a drop took, searches again a text
 * shown that moved — a part landing, a draft typed in, a feed row's reads —
 * makes a move that waited for a part once the read has landed, and draws its
 * answer.
 */
export function refresh() {
  if (!els) return;
  const e = TRAIL.current();
  let s = state;
  if (s && e !== s.at) {
    if (e && (e === s.own || (!e.scene && (boxOf(e.addr) === s.box || (!!e.reading && boxOf(e.reading.addr) === s.box))))) s.at = e;
    else { quit(true); s = null; }
  }
  if (!s) {
    if (e !== seen) {
      seen = e;
      const was = e ? left.get(e) : undefined;
      if (e && was) { left.delete(e); begin({ box: was.box, addr: GO.shownIn(was.box), side: null }, was.query); FOCUS.open('find', { el: els.box, byKey: false, first: els.input }); }
    }
    return;
  }
  seen = null;
  // the box took another version — a version move, a newer version's arrival: the find searches the one it shows (FP-22)
  if (!s.side && GO.shownIn(s.box) !== s.addr) { s.addr = GO.shownIn(s.box); s.reading = false; s.refused = null; s.readDrops = -1; }
  if (!s.reading && !s.refused && REC.dropsOf(s.addr) !== s.readDrops) readRest(s);
  search(s);
  if (s.waiting && !s.reading) { const dir = s.waiting; s.waiting = 0; step(dir, false); }
  render();
}

/**
 * A change of the page's class (see the head; FP-29), told by the app as
 * M-PUMP tells it: the text typed kept, everything it measured dropped — its
 * matches, the current one, what was read and refused, the outline it made,
 * the text typed kept at the entries a move left — and the text read again
 * at the new class.
 */
export function classChanged() {
  left = new WeakMap();
  const s = state;
  if (!s) return;
  s.matches = []; s.current = -1; s.marked = false; s.refused = null; s.searched = null; s.waiting = 0; s.readDrops = -1;
  render();
}

/**
 * What the find says (see the head): its count — the matches in hand as a
 * bound while a part is out, else the current one of all — and its clauses:
 * the parts line, an empty document's words, the miss naming the document
 * and the version searched, the withheld text unsearched, and the part it
 * could not search and why.
 * @param {Find} s
 * @returns {{count: string, clauses: string[]}}
 */
function answerOf(s) {
  const p = s.side ? SCENE.paneRead(s.side) : null, d = p ? p.d : LAYER.shownOf(s.addr), n = s.matches.length;
  const lacks = !p && (d.extent == null || PUMP.textLacked(d).length > 0);
  const refused = s.refused || (d.refused === 'withheld' ? WITHHELD : null);
  /** @type {string[]} */
  const clauses = [];
  if (s.reading) clauses.push(t('B2.find.reading'));
  if (d.extent === 0) clauses.push(t('B1.empty_subspace'));
  if (!s.query) return { count: '', clauses };
  const out = s.reading || (lacks && !refused);
  const count = out ? t('B2.find.so-far', { n }) : n ? t('B2.find.count', { k: s.current >= 0 ? s.current + 1 : 0, n }) : '';
  if (!n && !out && d.extent !== 0) clauses.push(t('L.find.none', { where: whereOf(s) }));
  if (d.runs.some((r) => r.kind === 'withheld')) clauses.push(t('L.find.withheld'));
  if (refused) clauses.push(t('L.find.part', { reason: t(HELD.whyOf(refused)) }));
  return { count, clauses };
}

/** a whole document the board withholds from the reader, as a refusal: what its find says it searched only part of it by */
const WITHHELD = { kind: 'refused', name: 'withheld' };

/** the version a miss names (see the head): "version ⟨k⟩ of ⟨name⟩" at a member, else "⟨name⟩'s current text", the document named as the status region names it (T-LAYER's `placeName`) */
function whereOf(/** @type {Find} */ s) {
  const name = LAYER.placeName(REC.doc(s.addr), s.box), k = memberOf(s.addr);
  return k != null ? t('L.find.member', { k, name }) : t('L.held.current', { D: name });
}

/** rebuild the count and the note from the find's state, its answer said once in the status region as its words change (FP-13) */
function render() {
  const s = state;
  if (!els || !s) return;
  const a = answerOf(s);
  if (els.count.textContent !== a.count) els.count.textContent = a.count;
  const note = a.clauses.map((c) => addressedHTML(c)).join(' · ');
  if (els.note.innerHTML !== note) els.note.innerHTML = note;
  const words = [a.count, ...a.clauses].filter(Boolean).join(' · ');
  if (words && words !== s.said) { s.said = words; FOCUS.say(words); }
}

/**
 * The box placed for the frame (see the head; APP's loop, after T-LAYER's
 * frame): at its document's corner's place, its right edge on the corner's,
 * the corner's items beneath it; else at the top of the document's region;
 * in a scene at its pane's top — each held below the one line and inside the
 * viewport.
 */
export function place() {
  const s = state;
  if (!els || !s) return;
  const b = els.box, w = b.offsetWidth || 0, h = b.offsetHeight || 0, { VW, VH } = CAM.viewport(), top = LINE.bottom() + GAP;
  const p = s.side ? SCENE.paneRead(s.side) : null, c = s.side ? null : LAYER.cornerPlace(s.box);
  let x = 0, y = 0;
  if (p && p.rect) { x = p.rect.x + GAP; y = p.rect.y + GAP; }
  else if (c) { x = c.right - w; y = c.top; }
  else { const r = LAYER.regionOf(s.addr); x = CAM.sx(r.x); y = CAM.sy(r.y); }
  x = Math.round(Math.max(GAP, Math.min(VW - w - GAP, x))); y = Math.round(Math.max(top, Math.min(VH - h - GAP, y)));
  const at = `translate(${x}px, ${y}px)`;
  if (b.style.transform !== at) b.style.transform = at;
  const over = c ? h + GAP : 0;
  if (over !== height) { height = over; CAM.markDirty(); }
}

/** how far the box pushes a document's corner's items down, px (T-LAYER's reader `atop`): its height and a gap where it stands at that document's corner's place, else none */
export const atop = (/** @type {string} */ addr) => (state && !state.side && boxOf(addr) === state.box ? height : 0);
