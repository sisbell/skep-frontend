// N-WALK — the linearization, THE FOCUS and the ARIA mirror (the structure
// record §3.2 "N-WALK"; S-27 (a) the mirror inside it; D5 §4 the focus
// model; foundations §2.7). Layer 2. Mixed: the tree arithmetic pure, the
// mirror ENGINE-BOUND. State: VIEW — the focus, the walk's position, and the
// position a landing named inside the focused span (the one line's position,
// W-01 step 3's "position honored", until the focus moves) — THE ONE OWNER
// of the focus (FP-10). Every focus move goes through one setter, so a
// landing's position never outlives the span it was named in: a walk key
// names none, and the line reads the span's own first position. The ring
// is drawn at the focus once a key has moved it (D5 §4 rule 2, the
// platform's focus-visible rule): a walk key, a teleport a key made, a
// camera move a key made that re-takes the focus — each caller says whether
// a key made it — and any other move puts it out.
// The plane linearizes board › account › document › block | link in record
// order (S3 Q6); at reading scale the walk holds THE LINKS THE READING
// SCALE DRAWS (D5 §4 rule 2: the owner's and the person's own; others' only
// where a peek or a lens shows them). The camera follows the focus (a walk
// move flies to the element at its level's scale) and the focus follows the
// camera (any other move re-takes it at the element under the view's centre
// at the scale's grain). The ARIA mirror (`role=tree`, virtualised ±24,
// `aria-level`/`aria-posinset`/`aria-setsize`) is THE ONE ACCESSIBLE
// RENDERING at span grain (S1 Q7; R94 at span grain — RULED); the live region
// announces the focus on a keyboard act. The mirror is rebuilt whole on every
// focus move, and its Tab stop with it: the plane is ONE stop between the one
// line and the focused document's corner (D5 §4 rule 5) — the current item,
// while the tree's container stands out of the order; the container is the
// stop only where the mirror holds no item. While the platform's focus
// stands in the mirror, the rebuild carries that focus to the current item
// and scrolls the panel to show it (D5 §4 rule 2: the tree item is the
// focus's accessible form; rule 4: the focus is never lost, never to the top;
// rule 8: a landing moves the focus to its element) — so the walk keys, a
// landing and a camera retake alike leave the focus on the item a person is
// at. While the focus stands in an overlay, the rebuild leaves it there, and
// the overlay's close hands it back through `returnFocus`: to the element the
// overlay was opened from, or to the current item where that no longer takes
// it — as an item the overlay was opened from no longer does once a rebuild
// has replaced it (rule 4).
// Carries: the wireframe's §13 whole; the bare `k` toggle DROPPED (M-7
// ELIMINATED: the walk is always live).
// Rules: FP-1, FP-2, FP-7, FP-9, FP-10, FP-13 (the mirror rebuilt from state).

import * as REC from '../model/records.js';
import * as LK from '../links/links.js';
import * as PUMP from '../model/pump.js';
import * as CAM from '../plane/camera.js';
import * as LAYER from '../text/layer.js';
import { docBox, accountCell, boardCell, accountAt } from '../plane/projection.js';
import { lodOf } from '../plane/lod.js';
import { cmpAddr, accountOf, documentOf } from '../model/address.js';
import { esc } from '../util.js';
import { t } from '../strings.js';

/** @typedef {import('../model/records.js').Block} Block */
/** @typedef {import('../links/links.js').Shown} Shown */

/**
 * @typedef {Object} Node — one element of the linearization
 * @property {'board' | 'account' | 'document' | 'block' | 'link'} kind
 * @property {string} addr the board, the account, the document
 * @property {number | null} pos a block's first position
 * @property {Shown | null} link a drawn link
 */

/** @type {Node | null} */
let focus = null;
/** the siblings the focus walks among, and its index */
/** @type {Node[]} */
let siblings = [];
let idx = 0;
/** @type {Array<{siblings: Node[], idx: number}>} the levels above */
let stack = [];
/** @type {number | null} the position a landing named inside the focused span; null where the focus moved by a walk key */
let landed = null;
let ringVisible = false;
/** @type {HTMLElement | null} */
let mirrorEl = null;
/** @type {HTMLElement | null} */
let liveEl = null;
/** @type {Array<(n: Node | null) => void>} */
const watchers = [];

/** @param {HTMLElement} mirror @param {HTMLElement} live */
export function attach(mirror, live) { mirrorEl = mirror; liveEl = live; }
export function onFocus(/** @type {(n: Node | null) => void} */ fn) { watchers.push(fn); }
/** the focus, read-only */
export const current = () => focus;
/** the position a landing named inside the focused span, read-only — the one line's position (null: the span's own first) */
export const landedAt = () => landed;
/** the focused span, for the article's `lit` mark */
export function focusedSpan() { return focus && focus.kind === 'block' && focus.pos != null ? { addr: focus.addr, pos: focus.pos } : null; }
/** is the ring drawn (a key has moved the focus — the platform's focus-visible rule) */
export const ringShown = () => ringVisible;

/**
 * The children of a node, in record order.
 * @param {Node | null} node null = the plane's root
 * @returns {Promise<Node[]>}
 */
export async function childrenOf(node) {
  if (!node) return [{ kind: 'board', addr: '1', pos: null, link: null }];
  if (node.kind === 'board') return REC.accounts().filter((a) => !a.system).map((a) => ({ kind: /** @type {const} */ ('account'), addr: a.account, pos: null, link: null }));
  if (node.kind === 'account') return REC.placesOf(node.addr).map((p) => ({ kind: /** @type {const} */ ('document'), addr: p.doc, pos: null, link: null }));
  if (node.kind === 'document') {
    const d = await PUMP.loadWhole(node.addr); if (!d) return [];
    /** @type {Node[]} */
    const out = d.blocks.map((b) => ({ kind: /** @type {const} */ ('block'), addr: node.addr, pos: b.pos, link: null }));
    for (const s of LK.shown(node.addr)) out.push({ kind: 'link', addr: node.addr, pos: s.pos, link: s });
    return out;
  }
  return [];
}

/** the accessible name of a node (what the mirror and the live region say) */
export function nameOf(/** @type {Node} */ n, /** @type {number} */ i, /** @type {number} */ total) {
  const pos = ` Item ${i + 1} of ${total}.`;
  if (n.kind === 'board') { const b = REC.board(); const accts = REC.accounts().filter((a) => !a.system).length; return `board ${n.addr}${b ? ', ' + b.origin : ''}: ${accts} accounts.` + pos; }
  if (n.kind === 'account') { const c = REC.countOf(n.addr); const lk = LK.countAccount(n.addr); return `account ${n.addr}: ${c.exact ? '' : 'at least '}${c.documents} documents, ${lk.arriving ? 'at least ' : ''}${lk.n} links${c.documents ? '' : ' — ' + t('B1.empty_subspace')}.` + pos; }
  if (n.kind === 'document') { const d = REC.doc(n.addr); const p = REC.place(n.addr); return `document ${n.addr}, ${p && p.label ? '"' + p.label + '"' : ''}, ${d.kind === 'draft' ? 'a draft' : 'published'}${d.extent != null ? ', ' + d.extent + ' positions' : ''}.` + pos; }
  if (n.kind === 'block') {
    const d = REC.doc(n.addr); const b = d.blocks.find((x) => x.pos === n.pos);
    if (!b) return `span at position ${n.pos} in ${n.addr}.` + pos;
    if (b.kind === 'withheld') return `withheld run in ${n.addr}: ${b.width} positions, origin ${b.origin}.` + pos;
    const org = d.origins.find((o) => o.pos < b.pos + b.width && b.pos < o.pos + o.width);
    const same = org ? ` (the same material as ${org.doc})` : '';
    return `span at position ${b.pos} of ${d.extent ?? '?'} in ${n.addr}${same}: "${b.text}".` + pos;
  }
  if (n.kind === 'link' && n.link) { const l = n.link; return `link ${l.link.addr}, type ${l.link.type || 'untyped'}, ${l.end === 'from' ? 'to' : 'from'} ${l.far}${REC.doc(l.far).refused === 'unregistered' ? ' — nothing this board will say about that address' : ''}.` + pos; }
  return '';
}

const levelOf = (/** @type {Node} */ n) => (n.kind === 'board' ? 1 : n.kind === 'account' ? 2 : n.kind === 'document' ? 3 : 4);

/**
 * Move the focus to item `i` of `sibs` — the one way it moves. A landing
 * passes the position it named, kept only where the focused span holds it;
 * a walk key passes none.
 * @param {Node[]} sibs
 * @param {number} i
 * @param {number | null} [at] the position a landing named
 * @param {Node | null} [node] the focus, where `sibs` holds no item `i`
 */
function setFocus(sibs, i, at = null, node = sibs[i] ?? null) {
  siblings = sibs; idx = i; focus = node;
  const held = at != null && node && node.kind === 'block' ? REC.blockAt(node.addr, at) : null;
  landed = held && node && held.pos === node.pos ? at : null;
}

/**
 * Rebuild the mirror from state (FP-13), the plane's one Tab stop with it
 * (D5 §4 rule 5): the current item, the only item at tabindex 0, while the
 * tree's container stands out of the order — focusable still, by script and
 * by a click — and the container itself where the walk's level holds no item
 * (a landing where the index lists nothing at its level). Replacing the
 * items removes the one the platform's focus may stand on, and the platform
 * then drops the focus to the body; so while the focus stands anywhere in
 * the mirror — on the container or on an item — the rebuild carries it to
 * the current item and brings that item inside the panel's window (D5 §4
 * rules 2, 4 and 8). With no item to carry it to, the container keeps it.
 */
export function render() {
  if (!mirrorEl) return;
  const held = mirrorEl.contains(document.activeElement);
  const total = siblings.length, W = 24;
  const lo = Math.max(0, idx - W), hi = Math.min(total, idx + W);
  const lvl = total ? levelOf(siblings[0]) : 1;
  let html = `<ul role="group" aria-label="level ${lvl}">`;
  for (let i = lo; i < hi; i++) {
    const n = siblings[i];
    html += `<li role="treeitem" id="walk-${i}" tabindex="${i === idx ? 0 : -1}" aria-level="${lvl}" aria-posinset="${i + 1}" aria-setsize="${total}" aria-selected="${i === idx}" data-i="${i}" data-addr="${esc(n.addr)}"${n.pos != null ? ` data-pos="${n.pos}"` : ''}>${esc(nameOf(n, i, total))}</li>`;
  }
  html += '</ul>';
  mirrorEl.innerHTML = html;
  mirrorEl.tabIndex = idx >= lo && idx < hi ? -1 : 0;
  if (held) focusItem();
}

/**
 * Put the platform's focus on the plane's Tab stop (`render`'s): the
 * mirror's current item, brought inside the panel's window, or the mirror
 * itself where it holds no item. The rebuild calls it while the focus stands
 * in the mirror, the app where a control that held the focus has gone (a
 * corner leaving the plane), and `returnFocus` where the element an overlay
 * was opened from no longer takes the focus: the focus returns to the walk's
 * element, never lost, never to the top (D5 §4 rule 4).
 */
export function focusItem() {
  if (!mirrorEl) return;
  const item = /** @type {HTMLElement | null} */ (mirrorEl.querySelector(`#walk-${idx}`));
  if (!item) { mirrorEl.focus({ preventScroll: true }); return; }
  item.focus({ preventScroll: true });
  showInPanel(item);
}

/**
 * The focus's return as an overlay closes (D5 §4 rule 4): to the element the
 * overlay was opened from, where that still takes the focus, else to the
 * walk's element (`focusItem`). An opener can stop taking the focus while the
 * overlay holds it — the mirror's rebuild replaces the item it was opened
 * from, the layer takes a corner the walk has left out of the order and keeps
 * it on the page — so what is tested is where the focus landed, never where
 * the opener stands. The return runs only where the focus stands on nothing,
 * as it does once the closing overlay has taken down the control that held
 * it: one the person has moved to an element outside the overlay stays there.
 * An overlay opened with the focus on nothing — by the pointer — returns it
 * to nothing, the body taking no focus.
 * @param {Element | null} to the element the closing overlay was opened from
 */
export function returnFocus(to) {
  const at = document.activeElement;
  if (!to || (at && at !== document.body)) return;
  /** @type {HTMLElement} */ (to).focus({ preventScroll: true });
  if (document.activeElement !== to) focusItem();
}

/**
 * Bring an item inside the panel's scroll window by the panel's own scroll
 * alone. The item's place is measured against the panel's padding box, so
 * the panel's position on the page and the viewport both stay where they
 * are; an item above the window lands at its top, one below at its bottom.
 * @param {HTMLElement} item
 */
function showInPanel(item) {
  if (!mirrorEl) return;
  const panel = mirrorEl.getBoundingClientRect(), r = item.getBoundingClientRect();
  const top = r.top - (panel.top + mirrorEl.clientTop), bottom = top + r.height;
  if (top < 0) mirrorEl.scrollTop += top;
  else if (bottom > mirrorEl.clientHeight) mirrorEl.scrollTop += bottom - mirrorEl.clientHeight;
}

/** the mirror's item i's name (the gate reads it) */
export function mirrorItem(/** @type {number} */ i) {
  const n = siblings[i]; return n ? nameOf(n, i, siblings.length) : null;
}
export const mirrorSize = () => siblings.length;
export const mirrorIndex = () => idx;

function announce() { if (liveEl && focus) liveEl.textContent = nameOf(focus, idx, siblings.length); }
function moved(/** @type {boolean} */ byKey) {
  if (byKey) { ringVisible = true; announce(); }
  for (const w of watchers) w(focus);
  CAM.markDirty();
}

/** the camera follows the focus: fly to the element at its level's scale */
async function flyToFocus() {
  if (!focus) return;
  if (focus.kind === 'board') await CAM.fly(CAM.viewForCell(boardCell(focus.addr), 0.92), 300);
  else if (focus.kind === 'account') await CAM.fly(CAM.viewForCell(accountCell(focus.addr), 0.85), 300);
  else if (focus.kind === 'document') {
    const d = REC.doc(focus.addr); if (d.extent == null) await PUMP.loadWhole(focus.addr);
    const box = docBox(focus.addr); await CAM.fly(CAM.viewForCell(box, 0.9), 300);
  } else {
    const d = REC.doc(focus.addr);
    const box = docBox(focus.addr);
    const frac = d.extent && focus.pos != null ? 0.12 + 0.8 * ((focus.pos - 1) / d.extent) : null;
    await CAM.fly(CAM.viewForDoc(box, LAYER.metricsOf(d).fs, 12.5, frac), 260);
  }
  CAM.markDirty();
}

/**
 * A walk key: ↓ ↑ siblings, → in, ← out, Home/End first/last, Enter acts;
 * Shift+↓ / Shift+↑ select by span (K-8, the selection's owner's).
 * @param {'down' | 'up' | 'in' | 'out' | 'first' | 'last'} k
 * @returns {Promise<boolean>}
 */
export async function key(k) {
  if (!focus) { await enter(); return true; }
  if (k === 'down' || k === 'up' || k === 'first' || k === 'last') {
    const ni = k === 'down' ? Math.min(siblings.length - 1, idx + 1) : k === 'up' ? Math.max(0, idx - 1) : k === 'first' ? 0 : siblings.length - 1;
    if (ni !== idx) { setFocus(siblings, ni); render(); moved(true); await flyToFocus(); }
    return true;
  }
  if (k === 'in') {
    const kids = await childrenOf(focus);
    if (kids.length) { stack.push({ siblings, idx }); setFocus(kids, 0); render(); moved(true); await flyToFocus(); }
    return true;
  }
  if (k === 'out') {
    const up = stack.pop();
    if (up && up.siblings.length) { setFocus(up.siblings, up.idx); render(); moved(true); await flyToFocus(); }
    return true;
  }
  return false;
}

/** the plane takes focus with nothing focused yet: the board */
export async function enter() {
  const kids = await childrenOf(null);
  stack = []; setFocus(kids, 0); render(); moved(true);
}

/**
 * The focus moves to a landing (a teleport, D5 §4 rule 8): the document, or
 * the span holding a position — the position kept as the one the landing
 * named (`landedAt`). The ring is drawn at the landing where a key made the
 * teleport, and put out where anything else did (D5 §4 rule 2).
 * @param {string} addr a document, an account or a board
 * @param {number | null} pos
 * @param {boolean} [byKey] a key made the teleport
 */
export async function focusTo(addr, pos, byKey = false) {
  const doc = documentOf(addr), acct = accountOf(addr);
  /** @type {Node} */
  const boardNode = { kind: 'board', addr: '1', pos: null, link: null };
  if (doc) {
    const d = REC.doc(doc);
    // the levels above the landing, each holding ITS OWN place in its siblings (so ← walks out to this document, this account)
    const accounts = await childrenOf(boardNode);
    const acctIdx = Math.max(0, accounts.findIndex((n) => n.addr === acct));
    const documents = await childrenOf({ kind: 'account', addr: acct || '', pos: null, link: null });
    const docIdx = Math.max(0, documents.findIndex((n) => n.addr === doc));
    if (pos != null && d.blocks.length) {
      const b = d.blocks.find((x) => pos >= x.pos && pos < x.pos + x.width) || d.blocks[0];
      const kids = await childrenOf({ kind: 'document', addr: doc, pos: null, link: null });
      const i = Math.max(0, kids.findIndex((n) => n.kind === 'block' && n.pos === b.pos));
      stack = [{ siblings: [boardNode], idx: 0 }, { siblings: accounts, idx: acctIdx }, { siblings: documents, idx: docIdx }];
      setFocus(kids, i, pos);
    } else {
      stack = [{ siblings: [boardNode], idx: 0 }, { siblings: accounts, idx: acctIdx }];
      setFocus(documents, docIdx, null, documents[docIdx] || { kind: 'document', addr: doc, pos: null, link: null });
    }
  } else if (acct) {
    const sibs = await childrenOf({ kind: 'board', addr: '1', pos: null, link: null });
    const i = Math.max(0, sibs.findIndex((n) => n.addr === acct));
    stack = [{ siblings: [{ kind: 'board', addr: '1', pos: null, link: null }], idx: 0 }];
    setFocus(sibs, i, null, sibs[i] || { kind: 'account', addr: acct, pos: null, link: null });
  } else {
    stack = []; setFocus([{ kind: 'board', addr: '1', pos: null, link: null }], 0);
  }
  ringVisible = byKey;
  render(); moved(false);
}

/**
 * The focus follows the camera (rule 3): after a camera move — the wheel,
 * the camera key's drag, a zoom chord, PageDown — re-take it at the element
 * under the view's centre at the scale's grain — far an account, mid a
 * document, reading a span — the ring drawn at it where a key made the move.
 * The announcement waits for the next keyboard act.
 * @param {boolean} [byKey] a key made the camera move
 */
export async function retakeFromView(byKey = false) {
  const lod = lodOf(CAM.cam.scale);
  const board = '1';
  if (lod.name === 'far' || lod.name === 'far~mid') {
    const acct = accountAt(CAM.cam.x, CAM.cam.y, board);
    if (acct && (!focus || focus.addr !== acct)) { await focusTo(acct, null, byKey); }
    return;
  }
  // the document under the centre
  let best = null, bd = Infinity;
  for (const p of REC.places()) {
    if (p.system) continue;
    const b = docBox(p.doc);
    if (CAM.cam.x >= b.x && CAM.cam.x <= b.x + b.w && CAM.cam.y >= b.y && CAM.cam.y <= b.y + b.h) { const dd = Math.hypot(b.x + b.w / 2 - CAM.cam.x, b.y + b.h / 2 - CAM.cam.y); if (dd < bd) { bd = dd; best = p.doc; } }
  }
  if (!best) return;
  if (lod.name === 'near' || lod.name === 'mid~near') {
    const d = REC.doc(best);
    if (d.blocks.length) {
      const frac = Math.max(0, Math.min(1, ((CAM.cam.y - docBox(best).y) / docBox(best).h - 0.12) / 0.8));
      const pos = 1 + Math.floor(frac * (d.extent || 1));
      const b = d.blocks.find((x) => pos >= x.pos && pos < x.pos + x.width) || d.blocks[0];
      if (!focus || focus.addr !== best || focus.pos !== b.pos) await focusTo(best, b.pos, byKey);
      return;
    }
  }
  if (!focus || focus.addr !== best || focus.kind !== 'document') await focusTo(best, null, byKey);
}

/** @returns {Node[]} the siblings in order (the gate's a11y case) */
export const siblingsNow = () => siblings.slice();
/** the sorted documents of an account (record order) */
export const documentsOf = (/** @type {string} */ acct) => REC.placesOf(acct).map((p) => p.doc).sort(cmpAddr);
