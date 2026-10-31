// O-LAND — a landing's line and its runs' labels (FP-21). Layer 2.
// ENGINE-BOUND. State (FP-10): the state its elements were last written
// from — the one owner of `#landing`'s DOM and of the labels' layer.
// Where a carried or followed passage lands and the text landed in holds
// only part of it, all of it in pieces, or no answer told, or holds it in
// several runs (N-GO's `landing`; BM-HELD's line and labels), one line stands
// at the text's edge beside the landing: past the right edge of the part of
// the block holding the line of the run the landing stands at, its top level
// with that line's (BM's `leaveAt`, the point a beam leaves the text by) —
// where that text is not laid out, beside its document's box — stacked
// beneath the standing overlay, and the notice below it, where they would
// meet, held inside the visible view's height, and never moved left onto
// the text: where the view
// leaves it less room than its widest, it narrows into the room there. Where
// the passage stands in several runs (FP-21), the line's words are the label
// of the run the landing stands at — and every other run's label stands at
// the text's edge beside its own first line, by the same rule, in the labels'
// layer (`#pieces`, hidden from assistive technology, the mirror carrying
// every label — N-WALK's): the labels that would stack, in one column's edge,
// merge into one (BM-HELD's `mergedLabel`; `stacks`), the line taking the
// label of its group; a label whose run's line stands out of the visible
// view, or whose room — to the next column's text, else its document's box's
// edge — is narrower than its floor, stands nowhere (FP-26). The line is no
// overlay: O-HOST holds one at a time, and a card opened at the landing would
// take its place while the outline stands. It is redrawn from state (FP-13):
// written again where what the landing says changes — its words, the run it
// stands at, its offers as their reads answer — and placed on each dirty
// frame; gone with the arrival (N-GO's), and hidden while the reading scene
// stands over the plane, out of the page's order (N-FOCUS's `cover`). Its
// acts are native buttons, in the Tab ring after the focused document's
// corner (D5 §4 rule 5): "next piece" and "previous piece", where the
// passage stands in several runs, each showing its chord (Mod+G,
// Mod+Shift+G: N-KEYS'), the step among them (N-GO's `step`; FP-21); "read
// side by side" with where the passage came from, where that text holds it
// whole; "read version ⟨k⟩, the last that holds it" at a published landing,
// once the latest member holding it whole is found; "try again", where a
// retry may tell — each N-GO's (`landingAct`), told whether a key pressed it
// by the controller's one reading. No edge marks; no refusing, no asking
// first. A rebuild keeps the focus on the act bearing the same key (N-FOCUS's
// `keep`), and a line gone while its act held the focus hands it to the
// walk's element (`handOff`, the app's).
// Figures: a label's face 10 px on 13 px lines, 6 px a character, standing
// in no room narrower than four characters; the line's face 16 px lines, 6.6
// px a character, its acts 26 px, its width at most 420 px.
// Rules: FP-1, FP-2, FP-9, FP-10, FP-13, FP-20, FP-21, FP-26.

import * as GO from '../nav/go.js';
import * as FOCUS from '../nav/focus.js';
import * as HOST from './host.js';
import * as SCENE from '../scene/scene.js';
import * as LINE from '../line/line.js';
import * as LAYER from '../text/layer.js';
import * as REC from '../model/records.js';
import { leaveAt, pageGeometry } from '../beams/beams.js';
import { mergedLabel } from '../beams/held.js';
import { drawChord } from '../nav/keys.js';
import { sx, sy, visibleView } from '../plane/camera.js';
import { docBox } from '../plane/projection.js';
import { t, addressedHTML } from '../strings.js';
import { esc } from '../util.js';

/** @typedef {import('../beams/held.js').Pieces} Pieces */
/** @typedef {import('../beams/beams.js').Geometry} Geometry */
/** @typedef {{x: number, y: number, w: number, h: number}} Rect */

/** @typedef {'beside' | 'version' | 'again' | 'next' | 'previous'} Act */

/**
 * @typedef {Object} LineState — what the line is written from
 * @property {string} id the string its words lead with: the line's state's, or the label's
 * @property {string} words
 * @property {Array<{act: Act, label: string, chord?: string}>} acts each with the chord drawn for this platform where it has one
 */

/**
 * @typedef {Object} Anchor — where a run's label stands at the text's edge (see the head), on screen
 * @property {number} run the run, an index into the landing's runs
 * @property {number} x its left edge: past the text's edge and the signs it holds, by GAP
 * @property {number} y its top: the run's first line's top
 * @property {number} room its width to the next column's text, else its document's box's edge
 * @property {number} h the height its label is held to take, by its words at the room (`heightOf`)
 */

/**
 * @typedef {Object} Label — a label the labels' layer sets, for runs other than the one the landing stands at's group (see the head)
 * @property {number[]} runs the runs it stands for, by index into the landing's runs
 * @property {string} words
 * @property {Rect} rect where it stands on screen, as laid out
 */

/** the room between the text's edge, or the overlay, and the line (px) */
const GAP = 8;
/** a label's face: its size, its line's height and its characters' width (the style's `#pieces .piece`), px */
const LABEL = Object.freeze({ px: 10, lh: 13, ch: 6 });
/** the narrowest room a label stands in (px): narrower, it stands nowhere (see the head) */
const ROOM_MIN = 4 * 6;
/** the line's own face and the height its acts take (the style's `#landing`), px */
const LINE_FACE = Object.freeze({ lh: 16, ch: 6.6, acts: 26, max: 420 });

/** @type {HTMLElement | null} */
let el = null;
/** @type {HTMLElement | null} the labels' layer */
let layer = null;
/** the state the element was last written from, as a key; '' where nothing stands */
let written = '';
/** the labels the layer was last written with, as a key */
let labelled = '';
/** @type {Label[]} the labels the last frame set */
let set = [];
/** the walk's element takes the focus where the line held it and is gone (the app's hand-off) */
let handOff = () => {};

/**
 * Attach the line's element and the labels' layer: a press on one of the
 * line's acts is N-GO's, a key's where the controller reads one (Enter and
 * Space press a native button).
 * @param {HTMLElement} e
 * @param {{handOff?: () => void, pieces?: HTMLElement | null}} [r] the app's hand-off of the focus to the walk's element; the labels' layer
 */
export function attach(e, r = {}) {
  el = e;
  layer = r.pieces ?? null;
  if (r.handOff) handOff = r.handOff;
  e.addEventListener('click', (ev) => {
    const b = /** @type {HTMLElement | null} */ (/** @type {HTMLElement} */ (ev.target).closest('[data-act]'));
    const which = b ? b.dataset.act : null;
    if (which === 'beside' || which === 'version' || which === 'again' || which === 'next' || which === 'previous') GO.landingAct(which, FOCUS.byKey(ev));
  });
}

/** the string a run's label leads with: its piece's, its repeat's, else its amount's */
function leadOf(/** @type {Pieces} */ p, /** @type {number[]} */ group, /** @type {number} */ current) {
  const runs = group.map((i) => p.runs[i]).filter(Boolean);
  const nums = new Set(runs.flatMap((r) => (r.piece != null ? [r.piece] : [])));
  if (nums.size > 1) return 'L.pieces';
  if (nums.size === 1) return 'L.piece';
  const r = runs.find((x) => x.repeat) || null;
  if (r) return r.repeat === 'again' ? 'L.piece.again' : 'L.piece.again-later';
  return group.includes(current) && p.whole ? 'L.piece.all' : 'L.piece.part';
}

/**
 * What the line holds now (see the head): the landing's line — where its
 * passage stands in several runs, the label of the group of runs the one it
 * stands at stacks with (`group`; that run's own where none stacks with it) —
 * and the acts it offers, the step's first; null where the landing says
 * nothing on a line.
 * @param {number[]} [group] the runs the line's label stands for, the one the landing stands at among them
 * @returns {LineState | null}
 */
export function stateNow(group) {
  const l = GO.landing(), line = GO.landingLine();
  if (!l || !line || (!l.said && !l.pieces)) return null;
  const offers = GO.landingOffers(), p = l.pieces;
  /** @type {LineState['acts']} */
  const acts = [];
  if (p && offers.steps) acts.push({ act: 'next', label: t('L.piece.next'), chord: drawChord('Mod+G') }, { act: 'previous', label: t('L.piece.previous'), chord: drawChord('Mod+Shift+G') });
  if (l.beside) acts.push({ act: 'beside', label: t('B1.side-by-side') });
  if (offers.version && l.version != null) acts.push({ act: 'version', label: t('F.floating.read', { k: l.version }) });
  if (offers.again) acts.push({ act: 'again', label: t('B1.try-again') });
  const members = p && group && group.includes(l.current) ? group : [l.current];
  if (p) return { id: leadOf(p, members, l.current), words: mergedLabel(p, members, l.current), acts };
  return { id: 'L.held.' + /** @type {NonNullable<typeof l.said>} */ (l.said).state, words: line, acts };
}

/** the line's markup: its words, each address in them in the identifier's face (ST's `addressedHTML`), then its acts, each showing its chord where it has one */
const markup = (/** @type {LineState} */ s) =>
  `<span class="words" data-string="${esc(s.id)}">${addressedHTML(s.words)}</span>` +
  (s.acts.length ? `<span class="acts">${s.acts.map((a) => `<button data-act="${a.act}">${esc(a.label)}${a.chord ? `<kbd>${esc(a.chord)}</kbd>` : ''}</button>`).join('')}</span>` : '');

/**
 * Where a run's label stands at the text's edge (see the head): past the
 * right edge of the part of the block holding its first line, and past the
 * signs that edge holds level with it, by GAP, its top that line's (BM's
 * `leaveAt`) — and its room, to the next column's text, else to its
 * document's box's right edge. Null where its line is not laid out.
 * @param {Geometry} g
 * @param {string} addr
 * @param {number} pos the run's first position
 * @returns {{x: number, y: number, room: number} | null}
 */
function edgeAt(g, addr, pos) {
  const at = leaveAt(g, addr, [{ pos, width: 1 }]);
  if (!at) return null;
  const box = docBox(addr), right = sx(box.x + box.w), x = at.from.x + GAP;
  // the nearest column's text to its right — the columns of every row share their left edges — else the box's edge
  const next = LAYER.foldOf(REC.doc(addr)).columns.map((c) => sx(box.x + c.x)).filter((cx) => cx > x).reduce((m, cx) => Math.min(m, cx), right);
  return { x, y: at.line.y, room: next - x - GAP / 2 };
}

/**
 * The height a label is held to take (see the head): its words wrapped at
 * its room by its face's characters, a line at least, its lines' height.
 * @param {string} words
 * @param {number} room
 * @param {{lh: number, ch: number}} [face]
 * @returns {number}
 */
export const heightOf = (words, room, face = LABEL) => Math.max(1, Math.ceil((words.length * face.ch) / Math.max(face.ch, room))) * face.lh;

/**
 * The runs whose labels would stack: in each column's edge — one left edge,
 * half a px either way — the runs in their tops' order, each joining the
 * group above it where its top stands inside the room that group's label
 * takes, a group's taking the most any of its runs' would. Pure: what the
 * line and the labels' layer read, and the gate's.
 * @param {Anchor[]} anchors
 * @returns {number[][]} the groups, each its runs in their tops' order, in the anchors' order of first runs
 */
export function stacks(anchors) {
  /** @type {Array<{x: number, top: number, bottom: number, runs: number[]}>} */
  const groups = [];
  for (const a of [...anchors].sort((p, q) => p.x - q.x || p.y - q.y)) {
    const g = groups.find((x) => Math.abs(x.x - a.x) <= 0.5 && a.y >= x.top - 0.5 && a.y < x.bottom);
    if (g) { g.runs.push(a.run); g.bottom = Math.max(g.bottom, g.top + a.h); }
    else groups.push({ x: a.x, top: a.y, bottom: a.y + a.h, runs: [a.run] });
  }
  return groups.map((g) => g.runs);
}

/**
 * The anchors of the landing's runs on screen now (see the head): each run's
 * label's place at the text's edge, and the height its label is held to
 * take — the line's own, its words and its acts at its widest, for the run
 * the landing stands at; none for a run that stands in no column laid out.
 * @param {Pieces} p
 * @param {string} addr
 * @param {number} current
 * @param {Rect} seen the visible view
 * @returns {Anchor[]}
 */
function anchorsOf(p, addr, current, seen) {
  const g = pageGeometry(seen);
  return p.runs.flatMap((r, i) => {
    const e = edgeAt(g, addr, r.pos);
    if (!e) return [];
    const words = mergedLabel(p, [i], current);
    const h = i === current ? heightOf(words, Math.min(LINE_FACE.max, e.room), LINE_FACE) + LINE_FACE.acts : heightOf(words, e.room);
    return [{ run: i, x: e.x, y: e.y, room: e.room, h }];
  });
}

/**
 * The line and the labels redrawn from state (FP-13), on each dirty frame
 * (see the head): the runs' groups read at the camera as it stands; the line
 * written again where what the landing says has changed — the focus kept on
 * the act bearing the same key, and handed to the walk's element where the
 * line held it and nothing in it takes it now — covered while the reading
 * scene stands, and placed (`place`); then the other groups' labels set.
 */
export function render() {
  if (!el) return;
  const host = el, l = GO.landing(), seen = visibleView(LINE.bottom());
  const anchors = l && l.pieces ? anchorsOf(l.pieces, l.addr, l.current, seen) : [];
  const groups = stacks(anchors);
  const mine = l ? groups.find((x) => x.includes(l.current)) : undefined;
  const s = stateNow(mine), key = s ? JSON.stringify(s) : '';
  if (key !== written) {
    const at = typeof document !== 'undefined' ? document.activeElement : null;
    const held = !!at && at !== host && host.contains(at);
    FOCUS.keep(host, (e) => /** @type {HTMLElement} */ (e).dataset.act || null, () => {
      host.innerHTML = s ? markup(s) : '';
      host.classList.toggle('on', !!s);
    });
    written = key;
    if (held && !host.contains(document.activeElement)) handOff();
  }
  const covered = SCENE.isOpen();
  if (host.inert !== covered) FOCUS.cover(host, covered);
  host.classList.toggle('covered', covered);
  if (s && !covered) place(anchors.find((a) => a.run === (l ? l.current : -1)) || null);
  setLabels(covered || !l || !l.pieces ? [] : groups.filter((x) => x !== mine), anchors, l && l.pieces, seen);
}

/**
 * The line placed at the text's edge beside the landing (see the head):
 * past the right edge of the part of the block holding the line of the run
 * it stands at, its top level with that line's — where that text is not laid
 * out, past its document's box's right edge at its top; moved below the
 * standing overlay, and the notice below it, where the two would meet
 * (O-HOST's `elements`); held inside the visible view's height, never moved
 * left of its place, its width the room the view leaves it there.
 * @param {Anchor | null} anchor the run the landing stands at, where its passage stands in several
 */
function place(anchor) {
  const l = GO.landing();
  if (!el || !l) return;
  const seen = visibleView(LINE.bottom());
  const at = anchor ? null : leaveAt(pageGeometry(seen), l.addr, [{ pos: l.pos, width: 1 }]);
  const b = docBox(l.addr);
  let x = anchor ? anchor.x : at ? at.from.x + GAP : sx(b.x + b.w) + GAP, y = anchor ? anchor.y : at ? at.line.y : sy(b.y);
  const vw = seen.x + seen.w;
  el.style.maxWidth = Math.max(10 * LINE_FACE.ch, Math.min(LINE_FACE.max, 0.4 * vw, vw - x - 6)) + 'px';
  const r = el.getBoundingClientRect();
  for (const o of HOST.elements()) {
    const or = o.getBoundingClientRect();
    if (x < or.right && or.left < x + r.width && y < or.bottom && or.top < y + r.height) y = or.bottom + GAP;
  }
  x = Math.max(seen.x + 6, x);
  y = Math.max(seen.y + 6, Math.min(seen.y + seen.h - r.height - 6, y));
  el.style.left = x + 'px'; el.style.top = y + 'px';
}

/**
 * The labels' layer set (see the head): one label for each group of runs the
 * line does not stand for, at its first run's place, its words BM-HELD's
 * merged label, its width its room; none where its place stands out of the
 * visible view, or its room is narrower than ROOM_MIN. Written again only
 * where what it holds changed.
 * @param {number[][]} groups
 * @param {Anchor[]} anchors
 * @param {Pieces | null} p
 * @param {Rect} seen the visible view
 */
function setLabels(groups, anchors, p, seen) {
  /** @type {Label[]} */
  const out = [];
  for (const g of p ? groups : []) {
    const a = anchors.find((x) => x.run === g[0]);
    if (!a || !p || a.room < ROOM_MIN) continue;
    const words = mergedLabel(p, g);
    const h = heightOf(words, a.room), w = Math.min(a.room, words.length * LABEL.ch);
    const rect = { x: a.x, y: a.y, w, h };
    if (rect.x < seen.x || rect.y < seen.y || rect.x + Math.min(rect.w, ROOM_MIN) > seen.x + seen.w || rect.y + rect.h > seen.y + seen.h) continue;
    out.push({ runs: g, words, rect });
  }
  set = out;
  if (!layer) return;
  const key = JSON.stringify(out);
  if (key === labelled) return;
  labelled = key;
  layer.innerHTML = out.map((x) => `<span class="piece" data-runs="${x.runs.join(' ')}" style="left:${x.rect.x}px;top:${x.rect.y}px;max-width:${x.rect.w}px">${addressedHTML(x.words)}</span>`).join('');
}

/** the line as it stands (the gate reads it): its words, its acts' keys, its rect on screen, whether the scene covers it, and the labels the layer set for the other runs — each its runs, its words and its rect; null where no line stands */
export function shown() {
  if (!el || !el.classList.contains('on')) return null;
  const r = el.getBoundingClientRect(), words = el.querySelector('.words');
  return {
    words: words ? words.textContent || '' : '', acts: [...el.querySelectorAll('[data-act]')].map((x) => /** @type {HTMLElement} */ (x).dataset.act || ''),
    rect: { x: r.left, y: r.top, w: r.width, h: r.height }, covered: el.classList.contains('covered'),
    labels: set.map((x) => ({ runs: x.runs.slice(), words: x.words, rect: { ...x.rect } })),
  };
}
