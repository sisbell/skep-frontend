// O-HINT — a one-line hint, the answer to a press the page refuses, standing
// beside the focus the press was made at (FP-26, FP-31, FP-20). Layer 2.
// ENGINE-BOUND. State (FP-10): the hint standing — its notice's string, the
// notice whole and in its compact form, whether it shows the notice whole,
// where the person was writing where its line ends with it, the focus the
// press was made at and whether that was on the plane — the
// notices shown whole in the page's session (`seen`), the presses it has
// answered and the last its element was drawn for, the state its element was
// last written from, and the place it was last set beside.
// A key swallowed away from the draft the person last wrote in ends its line
// with where they were writing (N-KEYS'; `Writing`): "you were last writing
// in ⟨label⟩" after the notice, whole or compact alike, its label the act
// back to that draft's kept caret, said with the notice in the status region.
// A line may end on a sentence of its own (`show`'s `ending`; B3-S3's constant
// sentence, the copy line's act, its key filled by the press): after the
// notice and where the person was writing, while the notice stands whole, and
// never beside its compact form.
// The line is sentences, each its capital and its end mark (ST's
// `hintSentences`, `sentence`, `sentences`; style S1, S2) — the notice whole
// or compact, where the person was writing, the ending — so a notice reads in
// one form however many of them stand; what the status region says is the
// same line.
// Raised (`show`) by the press it answers — N-KEYS' swallow, the caret's
// lines, an inert slot's reason, "select a passage first", the caret's
// follow line; N-FIND's chord off any document; the one line's inert act,
// through the act the app hands the line — its notice ST's (`hintSentences`): whole
// at its first press in the page's session, its compact form, its first
// clause, at every later press, and a notice marked whole whole at every
// press. Every press it answers draws it again with a brief fade-in of its
// opacity, never a motion, and says what it shows in the status region,
// again where the region holds those words (N-FOCUS's `say`); a held key's
// auto-repeat is the press it repeats, answered by nothing. It stands until
// the reader's next act (`act`), as the app tells it — every key but Tab,
// Shift, its button's own and an auto-repeat; a click on the plane, its text
// or a corner; a press of one of the one line's acts; the wheel — or a
// change of the page's class (`classChanged`), which forgets the notices
// shown whole too.
// Where it stands (`place`), on each dirty frame, beside the focus the press
// was made at, which it keeps while it stands: the walk's span at its reading
// scale — the line holding the caret standing in it, else the position a
// landing named in it, else its first, each read in the text the page shows
// of it — at the text's edge, past the signs
// that edge holds level with the line, its top that line's, its width the
// room to the next column's text, else its document's box's edge (O-LAND's
// `edgeAt`; FP-31); an element the press was made at — a corner, the one
// line's act, a reading scene's pane — beside it; else the walk's element's
// box as the ring circles it (P-RENDER's `focusBox`), beside it (FP-26).
// Beside a box means at its right, its tops level, else at its left, where
// the view holds its width there, else below it, else inside it at its foot —
// below it first where the box stands above the visible view, as the one
// line's acts do (`besideBox`). Then it moves below the standing overlay, the
// notice below it and a landing's line where it would meet them, and is held
// inside the visible view; it moves nothing, standing in no text, line or
// label; a deletion face standing whole where it would meet it sets it below
// that face too (O-DELETION's `rects`). Where the reading scene stands over
// the plane it was raised on, it is covered (N-FOCUS's `cover`).
// Its element (`#hint`; FP-13): the notice's native button, in the page's
// order after the notice below the overlay (D5 §4 rule 5), named by the words
// it shows and described by the whole notice, each rendered for the ear by
// S22's table (ST's `heard`), the notice's string on it, and where its line
// ends with where the person was writing, that ending after it on the same
// line, its label a native button of its own named by the draft's name as
// written; what the status region says of it keeps that name too; neither is a stop
// of the walk, takes the focus unasked or holds a key. The notice's act — a
// click, or Enter or Space once Tab reached it — opens the notice whole and
// folds it again where it has a compact form, saying what it shows; the
// label's takes the hint down and makes the act it was handed, a key's or
// the pointer's as made (`writingAct`); moving the focus to either ends
// nothing. A rebuild keeps the focus on the button it stood on (N-FOCUS's
// `keep`), and a hint gone while it held the focus hands it to the walk's
// element (`handOff`, the app's).
// Figures: a fade-in of FADE_MS (160 ms, unmeasured); GAP 8 px beside what
// it stands by; its width at most 360 px and, at the text's edge, at least
// 12 characters of 6.6 px.
// Rules: FP-1, FP-2, FP-9, FP-10, FP-13, FP-20, FP-26, FP-31, FP-36.

import * as FOCUS from '../nav/focus.js';
import * as WALK from '../nav/walk.js';
import * as HOST from './host.js';
import * as LANDING from './landing.js';
import * as DELETION from './deletion.js';
import * as SCENE from '../scene/scene.js';
import * as LINE from '../line/line.js';
import * as LAYER from '../text/layer.js';
import { focusBox } from '../plane/render.js';
import { pageGeometry } from '../beams/beams.js';
import { visibleView, markDirty } from '../plane/camera.js';
import { hintSentences, addressedHTML, opening, sentence, sentences, endedHTML, sentenceRuns, joinRuns, heard } from '../strings.js';
import { esc } from '../util.js';

/** @typedef {{x: number, y: number, w: number, h: number}} Rect */

/**
 * @typedef {Object} Writing — where the person was writing, which a swallowed key's line ends with (see the head): handed in by the press
 * @property {string} label the draft's name, as the status region names a box (T-LAYER's `boxName`)
 * @property {import('../strings.js').Run[]} [named] that name as stretches in their faces (T-LAYER's `boxName`), which what is spoken keeps as written; the label the client's words where none is handed in
 * @property {(byKey: boolean) => void} act the label's act: back to the draft's kept caret, a key's or the pointer's
 */

/** the ending a line takes where the person was writing elsewhere (`Writing`) */
const WRITING = 'B3.undo.last-writing';

/**
 * @typedef {Object} Ending — the sentence a line ends on while its notice stands whole (see the head): handed in by the press
 * @property {string} id its string
 * @property {Record<string, string | number>} [values] what its tokens are filled with: a key drawn for this platform (N-KEYS' `drawChord`)
 */

/**
 * @typedef {Object} Site — the focus a press was made at, which the hint stands beside while it stands
 * @property {{addr: string, pos: number, first: number} | null} text the walk's span at its reading scale: the position its line is read at, and the span's first, positions of the text the page shows of it
 * @property {Element | null} el the element the press was made at, where the walk's focus is not it
 */

/**
 * @typedef {Object} Hint — the hint standing (see the head)
 * @property {string} id its notice's string
 * @property {string} whole the notice whole, a sentence (ST's `hintSentences`)
 * @property {string} clause its compact form, a sentence: the notice whole where it has none
 * @property {boolean} open it shows the notice whole
 * @property {Writing | null} writing where the person was writing, which its line ends with; null where it ends with the notice
 * @property {{id: string, text: string} | null} ending the sentence its line ends on while its notice stands whole, by its string, its words a sentence, its tokens filled (ST's `sentence`); null where it ends on none
 * @property {Site} site
 * @property {boolean} plane the press was made on the plane: the reading scene covers it
 */

/**
 * @typedef {Object} Placed — where the hint was last set (the gate reads it)
 * @property {'edge' | 'beside'} by at the text's edge beside a line, or beside a box
 * @property {Rect} anchor what it stands beside: the line's place at the text's edge, its room as its width; else the box
 * @property {Rect} rect where it stands
 */

/** the gap between the hint and what it stands beside, px */
const GAP = 8;
/** its face: its characters' width, and its width at the most, px (the style's `#hint`) */
const FACE = Object.freeze({ ch: 6.6, max: 360 });
/** the fewest characters it narrows to at the text's edge */
const MIN_CH = 12;
/** its fade-in as a press draws it again, ms */
const FADE_MS = 160;
/** the room kept between it and the view's edge, px */
const INSET = 6;

/** @type {HTMLElement | null} */
let el = null;
/** @type {Hint | null} */
let hint = null;
/** @type {Set<string>} the notices shown whole in the page's session, by their strings */
const seen = new Set();
/** the presses answered */
let presses = 0;
/** the presses its element was last drawn for: a press past it draws it again with its fade-in */
let drawn = 0;
/** the state the element was last written from, as a key; '' where nothing stands */
let written = '';
/** @type {Placed | null} */
let placed = null;
/** the walk's element takes the focus where the hint held it and is gone (the app's hand-off) */
let handOff = () => {};

/**
 * Attach the hint's element: a press on its button is its act (`toggle`).
 * @param {HTMLElement} e
 * @param {{handOff?: () => void}} [r] the app's hand-off of the focus to the walk's element
 */
export function attach(e, r = {}) {
  el = e;
  if (r.handOff) handOff = r.handOff;
  e.addEventListener('click', (ev) => {
    const at = /** @type {HTMLElement} */ (ev.target);
    if (at.closest('button[data-hint]')) toggle();
    else if (at.closest('button[data-writing]')) writingAct(FOCUS.byKey(ev));
  });
}

/** the words the hint's notice shows */
const wordsOf = (/** @type {Hint} */ h) => (h.open ? h.whole : h.clause);
/** the words its line ends with where the person was writing elsewhere (`Writing`); '' where it ends with the notice */
const endOf = (/** @type {Hint} */ h) => (h.writing ? sentence(WRITING, { label: h.writing.label }) : '');
/** does its notice stand whole: opened, or with no compact form to fold to */
const wholeOf = (/** @type {Hint} */ h) => h.open || h.whole === h.clause;
/** the sentence its line ends on, while its notice stands whole; '' where it ends on none, and beside its compact form */
const lastOf = (/** @type {Hint} */ h) => (h.ending && wholeOf(h) ? h.ending.text : '');
/** the name where the person was writing, as stretches in their faces: what is spoken of the line's ending keeps it as written */
const namedOf = (/** @type {Writing} */ w) => w.named || w.label;
/** the words the status region says of it: the notice's, where the person was writing after them — its name as written — and the sentence the line ends on */
const saidOf = (/** @type {Hint} */ h) => joinRuns(' ', [wordsOf(h), h.writing ? sentenceRuns(WRITING, { label: namedOf(h.writing) }) : '', lastOf(h)]);

/**
 * The focus a press was made at (see the head): the element handed in; else
 * the walk's span at its reading scale, the line it is read at; else the walk's
 * element (no text, no element).
 * @param {Element | null} at
 * @returns {Site}
 */
function siteOf(at) {
  if (at && typeof at.getBoundingClientRect === 'function') return { text: null, el: at };
  const f = WALK.current();
  if (!f || f.kind !== 'block' || f.pos == null || !LAYER.atReadingScale(f.addr)) return { text: null, el: null };
  const c = LAYER.caret(), landed = WALK.landedAt();
  const pos = c && LAYER.caretInSpan(f.addr, f.pos) ? c.pos : landed != null && landed >= f.pos ? landed : f.pos;
  return { text: { addr: f.addr, pos, first: f.pos }, el: null };
}

/**
 * A refused press answered (see the head): the hint raised beside the focus
 * the press was made at — whole at its notice's first press in the page's
 * session, compact at every later one, its line ending with where the person
 * was writing where the press hands that in — said in the status region,
 * and drawn on the next dirty frame (FP-9). An auto-repeat answers nothing.
 * Throws for a string the table marks no hint (ST's `hintSentences`).
 * @param {string} id
 * @param {Record<string, string | number> | null} [values]
 * @param {{repeat?: boolean, at?: Element | null, writing?: Writing | null, ending?: Ending | null}} [o] `repeat` the key's auto-repeat; `at` the element the press was made at, where the walk's focus is not it; `writing` where the person was writing, which the line ends with; `ending` the sentence the line ends on while its notice stands whole
 */
export function show(id, values = null, o = {}) {
  if (o.repeat) return;
  const h = hintSentences(id, values ?? undefined), open = !seen.has(id);
  seen.add(id);
  hint = { id, whole: h.whole, clause: h.clause, open, writing: o.writing ?? null, ending: o.ending ? { id: o.ending.id, text: sentence(o.ending.id, o.ending.values) } : null, site: siteOf(o.at ?? null), plane: !SCENE.isOpen() };
  presses++;
  FOCUS.say(saidOf(hint), false, true);
  markDirty();
}

/**
 * The hint's act (see the head): the notice opened whole, or folded again to
 * its compact form, and what it shows said in the status region — again
 * where the region holds those words.
 */
export function toggle() {
  const h = hint;
  if (!h) return;
  if (h.whole !== h.clause) h.open = !h.open;
  FOCUS.say(saidOf(h), false, true);
  markDirty();
}

/**
 * The act of the label the line ends with (see the head; `Writing`): the
 * hint taken down, then the act the press handed in made — back to where the
 * person was writing. Nothing where no such ending stands.
 * @param {boolean} byKey a key made the act
 */
export function writingAct(byKey) {
  const w = hint && hint.writing;
  if (!w) return;
  act();
  w.act(byKey);
}

/** the reader's next act (see the head): the hint taken down, its focus handed on as the next frame writes it gone (`render`) */
export function act() {
  if (!hint) return;
  hint = null;
  markDirty();
}

/** a change of the page's class (FP-29): the hint taken down, and every notice shown whole again at its next press */
export function classChanged() {
  seen.clear();
  act();
}

/** the hint's markup: its button, named by the words it shows, described by the notice whole — open or folded where it has a compact form — after it the ending where the person was writing, its label a button of its own, and, while the notice stands whole, the sentence the line ends on */
function markup(/** @type {Hint} */ h) {
  const folds = h.whole !== h.clause ? ` aria-expanded="${h.open}"` : '', last = lastOf(h);
  return `<button type="button" data-hint="${esc(h.id)}" data-string="${esc(h.id)}" aria-label="${esc(heard(wordsOf(h)))}" aria-describedby="hint-whole"${folds}>${addressedHTML(wordsOf(h))}</button>`
    + (h.writing ? ` ${endingHTML(h.writing)}` : '')
    + (h.ending && last ? ` <span class="ending" data-string="${esc(h.ending.id)}">${addressedHTML(last)}</span>` : '')
    + `<span id="hint-whole" hidden>${esc(heard(sentences(h.whole, h.ending ? h.ending.text : '')))}</span>`;
}

/** the ending where the person was writing (`Writing`): its sentence's words, its label a button named by the draft's name as written, the end mark after the label */
function endingHTML(/** @type {Writing} */ w) {
  const [before, after = ''] = opening(WRITING).split('⟨label⟩');
  return `<span class="writing" data-string="${WRITING}">${esc(before)}<button type="button" data-writing="1" aria-label="${esc(heard(namedOf(w)))}">${addressedHTML(w.label)}</button>${endedHTML(opening(WRITING, { label: w.label }), esc(after))}</span>`;
}

/**
 * The hint redrawn from state (FP-13), on each dirty frame (see the head):
 * written again where what it shows changed — the focus kept on its button,
 * and handed to the walk's element where it held it and nothing stands — its
 * fade-in run where a press drew it again; covered while the reading scene
 * stands over the plane it was raised on, and placed (`place`).
 */
export function render() {
  if (!el) return;
  const host = el, h = hint, key = h ? JSON.stringify([h.id, h.whole, wordsOf(h), endOf(h), lastOf(h)]) : '';
  if (key !== written) {
    const at = typeof document !== 'undefined' ? document.activeElement : null;
    const held = !!at && at !== host && host.contains(at);
    FOCUS.keep(host, (x) => x.getAttribute('data-hint') ?? (x.getAttribute('data-writing') ? WRITING : null), () => {
      host.innerHTML = h ? markup(h) : '';
      host.classList.toggle('on', !!h);
      host.classList.toggle('writing', !!h && (!!h.writing || !!lastOf(h)));
    });
    written = key;
    if (held && !host.contains(document.activeElement)) handOff();
  }
  if (!h) { placed = null; return; }
  if (presses !== drawn) {
    drawn = presses;
    if (typeof host.animate === 'function') host.animate([{ opacity: 0.25 }, { opacity: 1 }], { duration: FADE_MS, easing: 'ease-out' });
  }
  const covered = h.plane && SCENE.isOpen();
  if (host.inert !== covered) FOCUS.cover(host, covered);
  host.classList.toggle('covered', covered);
  if (!covered) place(h);
}

/**
 * Where a box leaves the hint room beside it (see the head): at its right,
 * its tops level, else at its left — each where the view holds the hint's
 * width there — else below it, where the view holds its height there, else
 * inside it at its foot; below it first where the box stands above the
 * visible view. The place is held inside the view after (`place`).
 * @param {Rect} b the box
 * @param {{w: number, h: number}} size the hint's
 * @param {Rect} seen the visible view
 * @returns {{x: number, y: number}}
 */
export function besideBox(b, size, seen) {
  const across = (/** @type {number} */ x) => x >= seen.x + INSET && x + size.w <= seen.x + seen.w - INSET;
  const at = {
    right: { x: b.x + b.w + GAP, y: b.y, fits: across(b.x + b.w + GAP) },
    left: { x: b.x - GAP - size.w, y: b.y, fits: across(b.x - GAP - size.w) },
    below: { x: b.x, y: b.y + b.h + GAP, fits: b.y + b.h + GAP + size.h <= seen.y + seen.h - INSET },
  };
  /** @type {Array<keyof typeof at>} */
  const order = b.y + b.h <= seen.y ? ['below', 'right', 'left'] : ['right', 'left', 'below'];
  const p = order.map((k) => at[k]).find((q) => q.fits);
  return p ? { x: p.x, y: p.y } : { x: b.x + GAP, y: b.y + b.h - size.h - GAP };
}

/**
 * The hint placed beside the focus its press was made at (see the head),
 * then below the chrome standing where it would meet it, and inside the
 * visible view.
 * @param {Hint} h
 */
function place(h) {
  if (!el) return;
  const host = el, seen = visibleView(LINE.bottom());
  const e = h.site.text ? edgeOf(h.site.text, seen) : null;
  host.style.maxWidth = (e ? Math.max(MIN_CH * FACE.ch, Math.min(FACE.max, e.room, seen.x + seen.w - e.x - INSET)) : FACE.max) + 'px';
  const r = host.getBoundingClientRect(), size = { w: r.width, h: r.height };
  /** @type {Placed['by']} */
  let by = 'beside';
  /** @type {Rect | null} */
  let anchor = null;
  let x = 0, y = 0;
  if (e) { by = 'edge'; anchor = { x: e.x, y: e.y, w: e.room, h: 0 }; x = e.x; y = e.y; }
  else {
    anchor = boxOf(h.site, seen);
    if (!anchor) { placed = null; return; }
    ({ x, y } = besideBox(anchor, size, seen));
  }
  const chrome = [...HOST.elements().map((o) => o.getBoundingClientRect()).map((q) => ({ x: q.left, y: q.top, w: q.width, h: q.height })), ...[LANDING.shown()].flatMap((l) => (l && !l.covered ? [l.rect] : [])), ...DELETION.rects()];
  for (const o of chrome) if (x < o.x + o.w && o.x < x + size.w && y < o.y + o.h && o.y < y + size.h) y = o.y + o.h + GAP;
  if (by === 'beside') x = Math.min(seen.x + seen.w - size.w - INSET, x);
  x = Math.max(seen.x + INSET, x);
  y = Math.max(seen.y + INSET, Math.min(seen.y + seen.h - size.h - INSET, y));
  host.style.left = x + 'px'; host.style.top = y + 'px';
  placed = { by, anchor, rect: { x, y, w: size.w, h: size.h } };
}

/**
 * Where the hint stands at the text's edge beside the walk's span (see the
 * head): the line its position is read at, else the span's first; null where
 * neither is laid out.
 * @param {{addr: string, pos: number, first: number}} at
 * @param {Rect} seen
 */
function edgeOf(at, seen) {
  const g = pageGeometry(seen);
  return LANDING.edgeAt(g, at.addr, at.pos) || (at.first !== at.pos ? LANDING.edgeAt(g, at.addr, at.first) : null);
}

/** the box the hint stands beside where it stands at no text's edge: the element its press was made at while the page holds it, else the walk's element's (P-RENDER's `focusBox`); null where neither stands */
function boxOf(/** @type {Site} */ s, /** @type {Rect} */ seen) {
  if (s.el && s.el.isConnected) { const q = s.el.getBoundingClientRect(); return { x: q.left, y: q.top, w: q.width, h: q.height }; }
  return focusBox(seen);
}

/**
 * The hint standing, read-only (N-KEYS' tests read it): its notice's string,
 * the words it shows, the notice whole, whether it shows it whole, the
 * words its line ends with where the person was writing elsewhere, else
 * null, and, where its line ends on a sentence shown now, that sentence;
 * null where none stands.
 * @returns {{id: string, words: string, whole: string, open: boolean, writing: string | null, ending?: string} | null}
 */
export function standing() {
  const h = hint;
  return h ? { id: h.id, words: wordsOf(h), whole: h.whole, open: wholeOf(h), writing: h.writing ? endOf(h) : null, ...(lastOf(h) ? { ending: lastOf(h) } : {}) } : null;
}

/**
 * The hint as a person meets it (the gate reads it): its notice's string, the
 * words its button shows and the notice whole, whether it shows the notice
 * whole, the words its line's ending shows where it ends with where the
 * person was writing, the presses its element was drawn for, whether the
 * scene covers it, where it was set and what beside; null where none stands.
 */
export function shown() {
  const h = standing();
  if (!el || !h) return null;
  const b = el.querySelector('button[data-hint]'), w = el.querySelector('.writing');
  return {
    ...h, words: b ? b.textContent || '' : '', writing: w ? w.textContent || '' : null, presses: drawn,
    covered: el.classList.contains('covered'), placed: placed ? { by: placed.by, anchor: { ...placed.anchor }, rect: { ...placed.rect } } : null,
  };
}

/** the presses answered and the notices shown whole, forgotten (the tests' reset); the element kept */
export function _reset() { hint = null; seen.clear(); presses = 0; drawn = 0; written = ''; placed = null; }

