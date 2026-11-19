// O-DELETION — the deletion face at a removal of kept text (B3-S4;
// foundations §3.1; D5 K-59; D6 BM-34, BM-51, BM-80), and a paste's face
// where the paste was made (B3-S5; the paste survey's P6): the faces a
// person's own act at the text raises in its margin by foundations' D3 (c).
// Layer 2. ENGINE-BOUND.
// State (FP-10): for each draft, the removal whose face stands whole
// (`open`), the newest removal seen of it (`seen`), and the removal whose
// whole face is owed its saying (`owed`); the paste's face standing, one at a
// time (`paste`); the state its element was last written from; where each
// mark and face was last set.
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
// mark is a native button, in the page's order after a landing's labels,
// described by the face's words rendered for the ear (ST's `heard`), the
// draft's name in them as written, and moving the focus to it ends nothing. It moves no text: beside its line
// where the margin holds FACE_MIN_PX of room, else a layer over the lines
// beneath its site. A whole face is said once in the status region as it
// first stands (FP-36) — by the press that made it, where one asks first
// (`take`), else as the frame draws it — the draft's name in it as written.
// A paste's face (`pasted`) is its words alone, no mark: what the page placed
// instead of the same words, or why it placed nothing (O-FACES'
// `pasteWords`), set at the edge of the line holding where the paste was made
// by the same rule, below a whole face it would meet; said as it is raised,
// again at every paste that raises it (FP-41); standing until the next paste's
// takes its place, or its place is left — never at typing there or at Esc
// (`left`). One raised while a reading scene stands is that scene's until no
// scene stands: it stands at the line of the editor pane holding its draft
// that the paste's site stands on (SC's `editorLine`), by the same rule inside
// the room the pane gives it — over the lines above its site where the room
// beneath leaves it none — its layer lifted over the scene and letting the
// pointer through to the pane, placed again as the pane scrolls and hidden
// while its line stands outside that room; its place is left once the
// platform's focus stands in a pane that is no editor of its draft, at the
// pane's text or its corner (SC's `paneHolding`, `siteOf`) — another
// document's, a past state's, the held version's — and never at the scene's
// own acts. Every other face is the plane's: a reading scene covers it,
// judging nothing, and with none standing its place is left once the walk
// stands on what is not its draft. A change of the page's class forgets what
// was open and takes a paste's face down (`classChanged`).
// Figures: MARK_PX 12, a face at most FACE_MAX_PX 280 and beside its line
// only with FACE_MIN_PX 140 of room (unmeasured).
// Rules: FP-1, FP-2, FP-9, FP-10, FP-11, FP-13, FP-20, FP-26, FP-31, FP-33,
// FP-36, FP-38.

import * as FOCUS from '../nav/focus.js';
import * as WALK from '../nav/walk.js';
import * as REC from '../model/records.js';
import * as WRITE from '../write/write.js';
import * as LAYER from '../text/layer.js';
import * as SCENE from '../scene/scene.js';
import * as LINE from '../line/line.js';
import { pageGeometry, leaveAt } from '../beams/beams.js';
import { visibleView, markDirty } from '../plane/camera.js';
import { documentOf } from '../model/address.js';
import { t, tRuns, runsText, joinRuns, heard, addressedHTML } from '../strings.js';
import { esc } from '../util.js';

/** @typedef {{x: number, y: number, w: number, h: number}} Rect */
/** @typedef {import('../write/write.js').Removal} Removal */
/** @typedef {import('../model/records.js').ISpan} ISpan */

/**
 * @typedef {Object} Pasted — a paste's face standing (`pasted`): where the paste was made and what its face says
 * @property {string} addr the draft
 * @property {ISpan[]} before the byte just before where it was made, by identity; none at the text's first position
 * @property {ISpan[]} after the byte just after it; none at the text's end
 * @property {string} id its words' string
 * @property {string} text its words
 * @property {number} n the paste it answers, by the count of faces raised: each raises its own
 * @property {boolean} scene it was raised while a reading scene stood, and no frame has drawn the page without one since: it stands in the editor pane holding its draft (see the head)
 */

/** @typedef {'beside' | 'beneath' | 'above'} By how a face stands at its line: beside it, in the margin; a layer over the lines beneath it; or, in an editor pane whose room beneath it is short, over the lines above it */

/**
 * @typedef {Object} Part — one line of the face whole (`partsOf`)
 * @property {string} id its string
 * @property {string} text
 * @property {import('../strings.js').Run[]} runs its words as stretches in their faces: what is spoken of it keeps the draft's name as written
 */

/**
 * @typedef {Object} Drawn — a removal as it was last set (the gate reads it)
 * @property {string} addr the draft
 * @property {number} id the removal
 * @property {boolean} whole its face stands whole
 * @property {By} by how its face stands at its line
 * @property {Rect} mark where its mark stands
 * @property {Rect | null} face where its face stands; null where it is compact
 */

/** the mark's side, px */
const MARK_PX = 12;
/** the gap between a line's edge, the mark and the face, px */
const GAP = 4;
/** a face's width at the most, and the room the margin must hold for it to stand beside its line, px */
const FACE_MAX_PX = 280, FACE_MIN_PX = 140;
/** the room kept between a face and the edge of what holds it — the visible view, or an editor pane's room — px */
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
/** @type {Pasted | null} the paste's face standing (`pasted`); null where none stands */
let paste = null;
/** how many paste's faces have been raised (`Pasted.n`) */
let raised = 0;
/** @type {{addr: string, id: string, text: string, by: By, face: Rect, side: 'a' | 'b' | null} | null} where the paste's face was last set (the gate reads it), `side` the reading scene's pane it stands in, null on the plane; null where it stands nowhere drawn */
let pasteDrawn = null;

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
 * @param {{shared: boolean, edition: string | import('../strings.js').Run[] | null}} of `shared` the draft has readers beside the person; `edition` the draft's label where a published document holds the words removed — its name as stretches in their faces, or its words — else null
 * @returns {Part[]}
 */
export function partsOf(of) {
  const say = (/** @type {string} */ id, /** @type {Record<string, string | import('../strings.js').Run[]>} */ v = {}) => {
    const runs = tRuns(id, v);
    return { id, text: runsText(runs), runs };
  };
  return [say('C-49'), ...(of.shared ? [say('C-50'), say('B3.C-167')] : [say('B3.deletion.private')]), ...(of.edition ? [say('B3.deletion.edition', { label: of.edition })] : [])];
}

/** a face's parts said in the status region: their stretches, a space between two */
const saidOf = (/** @type {Part[]} */ parts) => joinRuns(' ', parts.map((p) => p.runs));

/** does a published document hold some of the bytes a removal took: a byte another document minted, one the page reads as published (T-LAYER's `isDraft`) */
function editionHolds(/** @type {string} */ addr, /** @type {Removal} */ r) {
  const own = documentOf(addr);
  return r.ids.some((x) => { const d = REC.isPage(x.prefix) ? null : documentOf(x.prefix); return !!d && d !== own && REC.has(d) && LAYER.isDraft(d) === false; });
}

/** a removal's face whole (`partsOf`): a draft is read by the person alone as its corner says (T-ARTICLE's chip), no draft's readers being read */
const faceOf = (/** @type {string} */ addr, /** @type {Removal} */ r) => partsOf({ shared: false, edition: editionHolds(addr, r) ? LAYER.boxName(addr).runs : null });

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
 * the press that made the removal says after its own line, as stretches in
 * their faces; none where no face of the draft is owed its saying.
 * @param {string} addr
 * @returns {import('../strings.js').Run[]}
 */
export function take(addr) {
  takeIn();
  const id = owed.get(addr), r = id == null ? undefined : WRITE.removalsOf(addr).find((x) => x.id === id);
  owed.delete(addr);
  return r && open.get(addr) === r.id ? saidOf(faceOf(addr, r)) : [];
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
  FOCUS.say(whole ? saidOf(faceOf(addr, r)) : t('B3.removed-here'), false, true);
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

/** a change of the page's class (FP-29): what stood open, what was seen and what was owed its saying, forgotten, and the paste's face taken down */
export function classChanged() { open.clear(); seen.clear(); owed.clear(); paste = null; }

/**
 * A paste's face raised where the paste was made (see the head; B3-S5; the
 * paste survey's P6): its words — the new words the page placed instead of
 * the same ones, or why nothing was placed (O-FACES' `pasteWords`) — said in
 * the status region as it is raised, again where the region holds them
 * (FP-41), in the place of any paste's face standing; the reading scene's
 * where one stands as it is raised.
 * @param {string} addr the draft
 * @param {{before: ISpan[], after: ISpan[]}} site where the paste was made, by the byte either side
 * @param {{id: string, text: string}} words
 */
export function pasted(addr, site, words) {
  paste = { addr, before: site.before, after: site.after, id: words.id, text: words.text, n: ++raised, scene: SCENE.isOpen() };
  FOCUS.say(words.text, false, true);
  markDirty();
}

/** the paste's face standing (`pasted`), its words and its draft, as the person was told it — whether or not a frame has drawn it; null where none stands */
export const pasteFace = () => (paste ? { addr: paste.addr, id: paste.id, text: paste.text } : null);

/** the box an address stands in: its document's, which every version of it shares */
const boxOf = (/** @type {string} */ addr) => documentOf(addr) || addr;

/**
 * Has the paste's face's place been left (see the head): one the reading
 * scene holds, once the platform's focus stands in a pane — at its text or its
 * corner — that is no editor of its draft (SC's `paneHolding`, `siteOf`); one
 * the plane holds, never while a scene covers it, and else once the walk
 * stands on what is not its draft — another document, an account, the board.
 * @param {Pasted} p
 */
function left(p) {
  if (SCENE.isOpen()) {
    const side = p.scene ? SCENE.paneHolding(typeof document !== 'undefined' ? document.activeElement : null) : null, s = side ? SCENE.siteOf(side) : null;
    return !!s && !(s.kind === 'editor' && boxOf(s.names) === boxOf(p.addr));
  }
  const f = WALK.current();
  return !!f && boxOf(f.addr) !== boxOf(p.addr);
}

/** where a removal point — or where a paste was made — stands in the text a draft shows: after the byte that stood before it, else before the one after it; null where that text places neither */
function pointOf(/** @type {string} */ addr, /** @type {{before: ISpan[], after: ISpan[]}} */ r) {
  const b = r.before.length ? LAYER.placedShown(addr, r.before) : [], a = b.length ? [] : r.after.length ? LAYER.placedShown(addr, r.after) : [];
  if (b.length) return b[b.length - 1].pos + b[b.length - 1].width;
  if (a.length) return a[0].pos;
  const d = LAYER.shownOf(addr);
  return !r.before.length && !r.after.length && d.from >= 0 ? d.from : null;
}

/** the markup of a paste's face (`pasted`): its words alone, in the deletion face's form, no mark beside them — it opens on nothing and closes on nothing; the focus never stands in it */
const pasteMarkup = (/** @type {Pasted} */ p) => `<div class="removal whole pasted" data-doc="${esc(p.addr)}" data-paste="${p.n}"><div class="face"><div class="part" data-string="${esc(p.id)}">${addressedHTML(p.text)}</div></div></div>`;

/** the markup of one removal: its mark, named "removed here" and described by its face's words rendered for the ear (ST's `heard`), held in a hidden element of its own, and its face where it stands whole */
function markup(/** @type {string} */ addr, /** @type {Removal} */ r, /** @type {boolean} */ whole) {
  const key = `removal-${addr}-${r.id}`.replace(/[^\w-]/g, '_'), parts = whole ? faceOf(addr, r) : [];
  const face = whole ? `<div class="face" id="${key}">${parts.map((p) => `<div class="part" data-string="${esc(p.id)}">${addressedHTML(p.text)}</div>`).join('')}<span id="${key}-heard" hidden>${esc(heard(saidOf(parts)))}</span></div>` : '';
  return `<div class="removal${whole ? ' whole' : ''}" data-doc="${esc(addr)}" data-id="${r.id}">`
    + `<button type="button" class="mark" data-removal="${r.id}" data-doc="${esc(addr)}" data-string="B3.removed-here" title="${esc(t('B3.removed-here'))}" aria-label="${esc(heard(t('B3.removed-here')))}" aria-expanded="${whole}"${whole ? ` aria-describedby="${key}-heard"` : ''}></button>${face}</div>`;
}

/**
 * The faces redrawn from state (FP-13), on each dirty frame (see the head):
 * the removals of every draft standing as text at its reading scale, each
 * with a mark at the edge of the line holding its removal point and, where
 * it stands whole, its face — written again where what stands changed, the
 * focus kept on the mark it stood on — then placed; a whole face not yet
 * said, said. No removal stands while the reading scene covers the plane; a
 * paste's face the scene holds stands in it, its layer lifted over the scene
 * (the `scene` class).
 */
export function render() {
  if (!el) return;
  const host = el, inScene = SCENE.isOpen();
  takeIn();
  /** @type {Array<{addr: string, r: Removal, whole: boolean, pos: number}>} */
  const stands = [];
  if (!inScene) {
    for (const addr of WRITE.removalDocs()) {
      if (!REC.has(addr) || !LAYER.isMounted(addr) || !LAYER.atReadingScale(addr)) continue;
      for (const r of WRITE.removalsOf(addr)) { const pos = pointOf(addr, r); if (pos != null) stands.push({ addr, r, whole: open.get(addr) === r.id, pos }); }
    }
  }
  // the paste's face: the plane's once no scene stands; gone for good once its place is left; standing — the scene's in the editor
  // pane holding its draft, the plane's where its draft stands at its reading scale
  if (paste && paste.scene && !inScene) paste.scene = false;
  if (paste && left(paste)) paste = null;
  const p = !paste ? null : inScene ? (paste.scene ? paste : null) : REC.has(paste.addr) && LAYER.isMounted(paste.addr) && LAYER.atReadingScale(paste.addr) ? paste : null;
  const at = p && !inScene ? pointOf(p.addr, p) : null, face = p && (inScene || at != null) ? { p, pos: at } : null;
  const key = JSON.stringify([stands.map((s) => [s.addr, s.r.id, s.whole, s.whole ? faceOf(s.addr, s.r) : null]), face ? [face.p.n, inScene] : null]);
  if (key !== written) {
    FOCUS.keep(host, (x) => (x.getAttribute('data-removal') ? `${x.getAttribute('data-doc')}:${x.getAttribute('data-removal')}` : null), () => { host.innerHTML = stands.map((s) => markup(s.addr, s.r, s.whole)).join('') + (face ? pasteMarkup(face.p) : ''); });
    host.classList.toggle('on', stands.length > 0 || !!face);
    host.classList.toggle('scene', !!face && inScene);
    written = key;
  }
  place(stands, face);
  for (const s of stands) if (s.whole && owed.get(s.addr) === s.r.id) { owed.delete(s.addr); FOCUS.say(saidOf(faceOf(s.addr, s.r))); }
}

/**
 * Each removal placed (see the head): its mark at the edge of the line
 * holding its removal point, level with the line's middle; its face beside
 * the mark where the margin holds FACE_MIN_PX of room, else over the lines
 * beneath its site, held inside the visible view. A removal whose line is
 * not laid out is hidden. The paste's face after them by the same rule at
 * where the paste was made, below a face standing whole where it would meet
 * it — the scene's at the line of the editor pane holding its draft (SC's
 * `editorLine`), held inside the room the pane gives it, over the lines above
 * its site where the room beneath leaves it none, hidden where that line
 * stands outside the room.
 * @param {Array<{addr: string, r: Removal, whole: boolean, pos: number}>} stands
 * @param {{p: Pasted, pos: number | null} | null} pastedAt the paste's face standing, and the position of the text shown it stands at on the plane — null where the scene holds it
 */
function place(stands, pastedAt) {
  drawn = [];
  pasteDrawn = null;
  if (!el || (!stands.length && !pastedAt)) return;
  const host = el, view = visibleView(LINE.bottom()), g = pageGeometry(view);
  /** where a position of a draft's text shown is left on the plane (BM's `leaveAt`): the line holding it, the position held inside the text */
  const onPlane = (/** @type {string} */ addr, /** @type {number} */ pos) => { const d = LAYER.shownOf(addr); return leaveAt(g, addr, [{ pos: d.from >= 0 ? Math.max(d.from, Math.min(pos, d.to - 1)) : pos, width: 1 }]); };
  /**
   * One box placed at a line: the box at the line's edge, level with its middle, and its face beside it, else beneath — where
   * `held` asks and the room beneath it is short, above it — inside `room`; the box hidden where the line is not laid out
   * @param {HTMLElement} box
   * @param {{line: Rect, from: {x: number, y: number}} | null} at the line, and where a face beside it leaves it
   * @param {Rect} room what the face is held inside: the visible view, or the room an editor pane gives it
   * @param {boolean} held the face stands over the lines above its line where the room beneath it is short
   * @returns {{mark: Rect, face: Rect | null, by: By} | null}
   */
  const set = (box, at, room, held) => {
    box.style.display = at ? '' : 'none';
    if (!at) return null;
    const x = at.from.x + GAP, y = at.line.y + at.line.h / 2 - MARK_PX / 2;
    box.style.left = x + 'px'; box.style.top = y + 'px';
    const mark = { x, y, w: MARK_PX, h: MARK_PX };
    const face = /** @type {HTMLElement | null} */ (box.querySelector('.face'));
    if (!face) return { mark, face: null, by: /** @type {By} */ ('beside') };
    const space = room.x + room.w - INSET - (x + MARK_PX + GAP), beside = space >= FACE_MIN_PX;
    face.style.maxWidth = (beside ? Math.min(FACE_MAX_PX, space) : Math.min(FACE_MAX_PX, room.w - 2 * INSET)) + 'px';
    const q = face.getBoundingClientRect(), floor = room.y + room.h - INSET - q.height;
    const fx = beside ? x + MARK_PX + GAP : Math.max(room.x + INSET, Math.min(at.line.x, room.x + room.w - INSET - q.width));
    let fy = beside ? Math.max(room.y + INSET, Math.min(at.line.y, floor)) : at.line.y + at.line.h + GAP;
    for (const o of drawn) if (o.face && fx < o.face.x + o.face.w && o.face.x < fx + q.width && fy < o.face.y + o.face.h && o.face.y < fy + q.height) fy = o.face.y + o.face.h + GAP;
    const above = held && !beside && fy > floor;
    if (above) fy = Math.max(room.y + INSET, Math.min(at.line.y - GAP - q.height, floor));
    face.style.left = (fx - x) + 'px'; face.style.top = (fy - y) + 'px';
    return { mark, face: { x: fx, y: fy, w: q.width, h: q.height }, by: beside ? 'beside' : above ? 'above' : 'beneath' };
  };
  for (const [i, s] of stands.entries()) {
    const box = /** @type {HTMLElement | undefined} */ (host.children[i]), at = box ? set(box, onPlane(s.addr, s.pos), view, false) : null;
    if (at) drawn.push({ addr: s.addr, id: s.r.id, whole: !!at.face, by: at.by, mark: at.mark, face: at.face });
  }
  const box = pastedAt ? /** @type {HTMLElement | undefined} */ (host.children[stands.length]) : undefined;
  if (!pastedAt || !box) return;
  const p = pastedAt.p, line = pastedAt.pos == null ? SCENE.editorLine(p.addr, p) : null;
  const at = pastedAt.pos == null ? set(box, line, line ? line.room : view, true) : set(box, onPlane(p.addr, pastedAt.pos), view, false);
  if (at && at.face) pasteDrawn = { addr: p.addr, id: p.id, text: p.text, by: at.by, face: at.face, side: line ? line.side : null };
}

/** where each whole face stands, the paste's among them (O-HINT's place reads them): a hint raised where one stands is set below it */
export const rects = () => [...drawn.flatMap((x) => (x.face ? [x.face] : [])), ...(pasteDrawn ? [pasteDrawn.face] : [])];

/** the paste's face as it was last set (the gate reads it): its draft, its words and their string, how it stands at its line, its box, and the reading scene's pane it stands in — null on the plane; null where none stands drawn */
export const pasteShown = () => (pasteDrawn ? { ...pasteDrawn, face: { ...pasteDrawn.face } } : null);

/** the removals as they were last set (the gate reads them), each with the strings its face shows where it stands whole */
export function shown() {
  return drawn.map((x) => {
    const r = WRITE.removalsOf(x.addr).find((q) => q.id === x.id);
    return { ...x, mark: { ...x.mark }, face: x.face ? { ...x.face } : null, words: r ? r.words : '', parts: x.whole && r ? faceOf(x.addr, r).map((p) => ({ id: p.id, text: p.text })) : [] };
  });
}

/** what stood open, what was seen and what was written, forgotten, and the paste's face (the tests' reset); the element kept */
export function _reset() { open.clear(); seen.clear(); owed.clear(); written = ''; drawn = []; paste = null; raised = 0; pasteDrawn = null; }
