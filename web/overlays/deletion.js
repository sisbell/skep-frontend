// O-DELETION — the deletion face at a removal of kept text (B3-S4;
// foundations §3.1; D5 K-59; D6 BM-34, BM-51, BM-80). Layer 2. ENGINE-BOUND.
// State (FP-10): for each draft, the removal whose face stands whole
// (`open`), the newest removal seen of it (`seen`), and the removal whose
// whole face is owed its saying (`owed`); the state its element was last
// written from; where each mark and face was last set.
// Drawn from W-WRITE's record of the removals of kept text (`removalsOf`),
// which W-MACHINE sets as a burst's `delete` is composed and as an undo is
// pressed: a face is keyed to a `delete`, or to words a dial carried, and a
// character removed inside its own open burst has none. At each removal a
// compact mark stands in the margin, at the edge of the line holding the
// removal point (O-LAND's edge; FP-31), its name "removed here"; the face
// stands whole at a draft's first removal in the page's session, and at any
// removal its mark's act opens — one whole in a draft at a time, folded again
// by that act or as the draft's next removal is made. Whole, it is its parts
// in order (`partsOf`): C-49; the audience by the venue — at a draft read by
// the person alone its one clause, at a shared draft C-50 then the reach —
// and, where a published document holds the words removed, the line naming
// the edition of the draft. It never takes the focus and holds no key: its
// mark is a native button, in the page's order after a landing's labels, and
// moving the focus to it ends nothing. It moves no text: beside its line
// where the margin holds FACE_MIN_PX of room, else a layer over the lines
// beneath its site. A whole face is said once in the status region as it
// first stands (FP-36) — by the press that made it, where one asks first
// (`take`), else as the frame draws it. A change of the page's class forgets
// what was open (`classChanged`).
// Figures: MARK_PX 12, a face at most FACE_MAX_PX 280 and beside its line
// only with FACE_MIN_PX 140 of room (unmeasured).
// Rules: FP-1, FP-2, FP-9, FP-10, FP-11, FP-13, FP-20, FP-26, FP-31, FP-33,
// FP-36, FP-38.

import * as FOCUS from '../nav/focus.js';
import * as REC from '../model/records.js';
import * as WRITE from '../write/write.js';
import * as LAYER from '../text/layer.js';
import * as SCENE from '../scene/scene.js';
import * as LINE from '../line/line.js';
import { pageGeometry, leaveAt } from '../beams/beams.js';
import { visibleView, markDirty } from '../plane/camera.js';
import { documentOf } from '../model/address.js';
import { t, addressedHTML } from '../strings.js';
import { esc } from '../util.js';

/** @typedef {{x: number, y: number, w: number, h: number}} Rect */
/** @typedef {import('../write/write.js').Removal} Removal */

/**
 * @typedef {Object} Part — one line of the face whole (`partsOf`)
 * @property {string} id its string
 * @property {string} text
 */

/**
 * @typedef {Object} Drawn — a removal as it was last set (the gate reads it)
 * @property {string} addr the draft
 * @property {number} id the removal
 * @property {boolean} whole its face stands whole
 * @property {'beside' | 'beneath'} by the face beside its line, in the margin, or a layer over the lines beneath it
 * @property {Rect} mark where its mark stands
 * @property {Rect | null} face where its face stands; null where it is compact
 */

/** the mark's side, px */
const MARK_PX = 12;
/** the gap between a line's edge, the mark and the face, px */
const GAP = 4;
/** a face's width at the most, and the room the margin must hold for it to stand beside its line, px */
const FACE_MAX_PX = 280, FACE_MIN_PX = 140;
/** the room kept between a face and the view's edge, px */
const INSET = 6;

/** @type {HTMLElement | null} */
let el = null;
/** @type {Map<string, number | null>} the removal whose face stands whole in each draft; null where every one is compact */
const open = new Map();
/** @type {Map<string, number>} the newest removal seen of each draft */
const seen = new Map();
/** @type {Map<string, number>} the removal of each draft whose whole face has not been said */
const owed = new Map();
/** the state the element was last written from, as a key */
let written = '';
/** @type {Drawn[]} where each removal was last set */
let drawn = [];

/**
 * Attach the face's element: a press on a mark is its act (`act`).
 * @param {HTMLElement} e
 */
export function attach(e) {
  el = e;
  e.addEventListener('click', (ev) => {
    const b = /** @type {HTMLElement | null} */ ((/** @type {HTMLElement} */ (ev.target)).closest('button[data-removal]'));
    if (b) act(b.dataset.doc || '', Number(b.dataset.removal));
  });
}

/**
 * The face's parts whole, in order (see the head; B3-S4): C-49; then the
 * audience by the venue — at a draft the person alone reads, its one clause;
 * at a shared draft C-50, then the reach — and, where a published document
 * holds the words removed, the line naming the edition of the draft.
 * @param {{shared: boolean, edition: string | null}} of `shared` the draft has readers beside the person; `edition` the draft's label where a published document holds the words removed, else null
 * @returns {Part[]}
 */
export function partsOf(of) {
  const say = (/** @type {string} */ id, /** @type {Record<string, string>} */ v = {}) => ({ id, text: t(id, v) });
  return [say('C-49'), ...(of.shared ? [say('C-50'), say('B3.C-167')] : [say('B3.deletion.private')]), ...(of.edition ? [say('B3.deletion.edition', { label: of.edition })] : [])];
}

/** does a published document hold some of the bytes a removal took: a byte another document minted, one the page reads as published (T-LAYER's `isDraft`) */
function editionHolds(/** @type {string} */ addr, /** @type {Removal} */ r) {
  const own = documentOf(addr);
  return r.ids.some((x) => { const d = REC.isPage(x.prefix) ? null : documentOf(x.prefix); return !!d && d !== own && REC.has(d) && LAYER.isDraft(d) === false; });
}

/** a removal's face whole (`partsOf`): a draft is read by the person alone as its corner says (T-ARTICLE's chip), no draft's readers being read */
const faceOf = (/** @type {string} */ addr, /** @type {Removal} */ r) => partsOf({ shared: false, edition: editionHolds(addr, r) ? LAYER.boxName(addr).name : null });

/** the removals of each draft taken in (see the head): the first of a draft in the page's session stands whole, and a later one folds the face standing */
function takeIn() {
  for (const addr of WRITE.removalDocs()) {
    const list = WRITE.removalsOf(addr), newest = list[list.length - 1].id, was = seen.get(addr) ?? 0;
    if (newest > was) {
      seen.set(addr, newest);
      if (was === 0 && list.some((r) => r.id === 1)) { open.set(addr, 1); owed.set(addr, 1); } else open.set(addr, null);
    }
    const at = open.get(addr);
    if (at != null && !list.some((r) => r.id === at)) open.set(addr, null);
  }
}

/**
 * The words a whole face not yet said is said by (see the head), taken: what
 * the press that made the removal says after its own line; '' where no face
 * of the draft is owed its saying.
 * @param {string} addr
 * @returns {string}
 */
export function take(addr) {
  takeIn();
  const id = owed.get(addr), r = id == null ? undefined : WRITE.removalsOf(addr).find((x) => x.id === id);
  owed.delete(addr);
  return r && open.get(addr) === r.id ? faceOf(addr, r).map((p) => p.text).join(' ') : '';
}

/**
 * A mark's act (see the head; D5 K-59): its face opened whole, the face
 * standing whole in its draft folded; or folded again where it stood whole.
 * What then shows is said in the status region.
 * @param {string} addr
 * @param {number} id the removal
 */
export function act(addr, id) {
  const r = WRITE.removalsOf(addr).find((x) => x.id === id);
  if (!r) return;
  const whole = open.get(addr) !== id;
  open.set(addr, whole ? id : null);
  owed.delete(addr);
  FOCUS.say(whole ? faceOf(addr, r).map((p) => p.text).join(' ') : t('B3.removed-here'), false, true);
  markDirty();
}

/**
 * A draft's removals as the face holds them (see the head): each by its
 * number, and whether its face stands whole — the draft's first in the
 * page's session until its act folds it or the next is made, and any its
 * mark's act opened.
 * @param {string} addr
 * @returns {Array<{id: number, whole: boolean}>}
 */
export function standing(addr) {
  takeIn();
  return WRITE.removalsOf(addr).map((r) => ({ id: r.id, whole: open.get(addr) === r.id }));
}

/** a change of the page's class (FP-29): what stood open, what was seen and what was owed its saying, forgotten */
export function classChanged() { open.clear(); seen.clear(); owed.clear(); }

/** where a removal point stands in the text a draft shows: after the byte that stood before it, else before the one after it; null where that text places neither */
function pointOf(/** @type {string} */ addr, /** @type {Removal} */ r) {
  const b = r.before.length ? LAYER.placedShown(addr, r.before) : [], a = b.length ? [] : r.after.length ? LAYER.placedShown(addr, r.after) : [];
  if (b.length) return b[b.length - 1].pos + b[b.length - 1].width;
  if (a.length) return a[0].pos;
  const d = LAYER.shownOf(addr);
  return !r.before.length && !r.after.length && d.from >= 0 ? d.from : null;
}

/** the markup of one removal: its mark, named "removed here" and described by its face, and its face where it stands whole */
function markup(/** @type {string} */ addr, /** @type {Removal} */ r, /** @type {boolean} */ whole) {
  const key = `removal-${addr}-${r.id}`.replace(/[^\w-]/g, '_');
  const face = whole ? `<div class="face" id="${key}">${faceOf(addr, r).map((p) => `<div class="part" data-string="${esc(p.id)}">${addressedHTML(p.text)}</div>`).join('')}</div>` : '';
  return `<div class="removal${whole ? ' whole' : ''}" data-doc="${esc(addr)}" data-id="${r.id}">`
    + `<button type="button" class="mark" data-removal="${r.id}" data-doc="${esc(addr)}" data-string="B3.removed-here" title="${esc(t('B3.removed-here'))}" aria-label="${esc(t('B3.removed-here'))}" aria-expanded="${whole}"${whole ? ` aria-describedby="${key}"` : ''}></button>${face}</div>`;
}

/**
 * The faces redrawn from state (FP-13), on each dirty frame (see the head):
 * the removals of every draft standing as text at its reading scale, each
 * with a mark at the edge of the line holding its removal point and, where
 * it stands whole, its face — written again where what stands changed, the
 * focus kept on the mark it stood on — then placed; a whole face not yet
 * said, said. Nothing stands while the reading scene covers the plane.
 */
export function render() {
  if (!el) return;
  const host = el;
  takeIn();
  /** @type {Array<{addr: string, r: Removal, whole: boolean, pos: number}>} */
  const stands = [];
  if (!SCENE.isOpen()) {
    for (const addr of WRITE.removalDocs()) {
      if (!REC.has(addr) || !LAYER.isMounted(addr) || !LAYER.atReadingScale(addr)) continue;
      for (const r of WRITE.removalsOf(addr)) { const pos = pointOf(addr, r); if (pos != null) stands.push({ addr, r, whole: open.get(addr) === r.id, pos }); }
    }
  }
  const key = JSON.stringify(stands.map((s) => [s.addr, s.r.id, s.whole, s.whole ? faceOf(s.addr, s.r) : null]));
  if (key !== written) {
    FOCUS.keep(host, (x) => (x.getAttribute('data-removal') ? `${x.getAttribute('data-doc')}:${x.getAttribute('data-removal')}` : null), () => { host.innerHTML = stands.map((s) => markup(s.addr, s.r, s.whole)).join(''); });
    host.classList.toggle('on', stands.length > 0);
    written = key;
  }
  place(stands);
  for (const s of stands) if (s.whole && owed.get(s.addr) === s.r.id) { owed.delete(s.addr); FOCUS.say(faceOf(s.addr, s.r).map((p) => p.text).join(' ')); }
}

/**
 * Each removal placed (see the head): its mark at the edge of the line
 * holding its removal point, level with the line's middle; its face beside
 * the mark where the margin holds FACE_MIN_PX of room, else over the lines
 * beneath its site, held inside the visible view. A removal whose line is
 * not laid out is hidden.
 * @param {Array<{addr: string, r: Removal, whole: boolean, pos: number}>} stands
 */
function place(stands) {
  drawn = [];
  if (!el || !stands.length) return;
  const view = visibleView(LINE.bottom()), g = pageGeometry(view);
  for (const [i, s] of stands.entries()) {
    const box = /** @type {HTMLElement | undefined} */ (el.children[i]);
    if (!box) continue;
    const d = LAYER.shownOf(s.addr), at = leaveAt(g, s.addr, [{ pos: d.from >= 0 ? Math.max(d.from, Math.min(s.pos, d.to - 1)) : s.pos, width: 1 }]);
    box.style.display = at ? '' : 'none';
    if (!at) continue;
    const x = at.from.x + GAP, y = at.line.y + at.line.h / 2 - MARK_PX / 2;
    box.style.left = x + 'px'; box.style.top = y + 'px';
    const mark = { x, y, w: MARK_PX, h: MARK_PX };
    const face = /** @type {HTMLElement | null} */ (box.querySelector('.face'));
    if (!face) { drawn.push({ addr: s.addr, id: s.r.id, whole: false, by: 'beside', mark, face: null }); continue; }
    const room = view.x + view.w - INSET - (x + MARK_PX + GAP), beside = room >= FACE_MIN_PX;
    face.style.maxWidth = (beside ? Math.min(FACE_MAX_PX, room) : Math.min(FACE_MAX_PX, view.w - 2 * INSET)) + 'px';
    const q = face.getBoundingClientRect();
    const fx = beside ? x + MARK_PX + GAP : Math.max(view.x + INSET, Math.min(at.line.x, view.x + view.w - INSET - q.width));
    const fy = beside ? Math.max(view.y + INSET, Math.min(at.line.y, view.y + view.h - INSET - q.height)) : at.line.y + at.line.h + GAP;
    face.style.left = (fx - x) + 'px'; face.style.top = (fy - y) + 'px';
    drawn.push({ addr: s.addr, id: s.r.id, whole: true, by: beside ? 'beside' : 'beneath', mark, face: { x: fx, y: fy, w: q.width, h: q.height } });
  }
}

/** where each whole face stands (O-HINT's place reads them): a hint raised where one stands is set below it */
export const rects = () => drawn.flatMap((x) => (x.face ? [x.face] : []));

/** the removals as they were last set (the gate reads them), each with the strings its face shows where it stands whole */
export function shown() {
  return drawn.map((x) => {
    const r = WRITE.removalsOf(x.addr).find((q) => q.id === x.id);
    return { ...x, mark: { ...x.mark }, face: x.face ? { ...x.face } : null, words: r ? r.words : '', parts: x.whole && r ? faceOf(x.addr, r) : [] };
  });
}

/** what stood open, what was seen and what was written, forgotten (the tests' reset); the element kept */
export function _reset() { open.clear(); seen.clear(); owed.clear(); written = ''; drawn = []; }
