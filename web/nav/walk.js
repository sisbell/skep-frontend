// N-WALK — the linearization, THE WALK'S POSITION and the ARIA mirror (the
// structure record §3.2 "N-WALK"; S-27 (a) the mirror inside it; D5 §4 the
// focus model; foundations §2.7). Layer 2. Mixed: the tree arithmetic pure,
// the mirror ENGINE-BOUND. State: VIEW — the walk's position (the element the
// walk stands on, its siblings and the levels above) and the position a
// landing named inside the focused span (the one line's position, W-01 step
// 3's "position honored", until the walk moves) and the count of its moves —
// THE ONE OWNER of the walk's position (FP-10). THE ORDER OF MOVES: every
// move — a walk key, a landing, a re-take — counts itself as it starts, and
// one whose reads a later move overtook sets nothing when they answer and
// flies the camera nowhere, so the walk stands where the latest move put it
// whatever order the reads answer in. THE FOCUS IS N-FOCUS's (FP-20): the
// page has one focus, the platform's, and every move of it this module asks
// for goes through the controller's `land` — a walk key, a landing, a
// key-made re-take each put the platform's focus on the walk's element
// wherever the key was pressed (rules 10, 12), the ring drawn where a key
// made the move and put out by a pointer's landing or a camera-made re-take
// (D5 §4 rule 2, the platform's focus-visible rule); a camera-made re-take
// carries the focus to the new element only where the mirror held it, and
// leaves a focus standing in the one line, a card or the scene where it is.
// Every move names a position or none, so a landing's position never
// outlives the span it was named in: a walk key names none, and the line
// reads the span's own first position. At launch the platform's focus rests
// on the walk's element with the ring out (rule 21). Enter at a focused span
// selects the block whole, as a click on plain text does, until the editor's
// caret exists (D8; K-7's "text takes the caret" waits on D6).
// The plane linearizes board › account › document › block | link in record
// order (S3 Q6); at reading scale the walk holds THE LINKS THE READING SCALE
// DRAWS (D5 §4 rule 2: the owner's and the person's own; others' only where a
// peek or a lens shows them), after the blocks. A block whose text is only
// white space is no span a person reads and no element of the walk (rule
// 20): the mirror lists none, and a landing inside one stands on the element
// before it; a position no block holds stands on the first span. A landing
// the index does not list — a withheld document, one
// unchanged since the index's floor, its account — lands on ITS OWN node,
// placed among the listed siblings in address order, so the mirror and the
// one line name the place landed on (rule 12). The camera follows the focus
// (a walk move flies to the element at its level's scale) and the focus
// follows the camera (any other move re-takes it at the element under the
// view's centre at the scale's grain). The ARIA mirror (`role=tree`,
// virtualised ±24, `aria-level`/`aria-posinset`/`aria-setsize`) is THE ONE
// ACCESSIBLE RENDERING at span grain (S1 Q7; R94 at span grain — RULED), the
// tree named as it attaches by ST's `L.mirror-label`, each level's group by
// `L.mirror-level`, and each item by ST's `L.mirror.*` entries — what a screen
// reader hears is the focus moving onto the item (rule 12); no live region
// repeats it (D4). A withheld run's item is made from the record the plane's
// placeholder is (T-ARTICLE's `placeholderOf`: the owner of its origin, the
// entitlement arm for this reader, C-67's clause where the origin's edition
// claims decide one, and nothing in its place where they do not — R56,
// B1-S7, PUB-5.124), and a
// document a read answered `withheld` is named by its withheld box's words
// (T-LAYER's `withheldBox`: existence and owner — B1-S2), and a link whose far end floats
// says "its passage is not in ⟨D⟩'s current text" as its symbol's title and
// its stub do (LK's `floats`; foundations §2.3), so at each a screen reader
// hears what the plane shows (R94). The mirror is rebuilt whole on every
// move, and its Tab
// stop with it: the plane is ONE stop between the one line and the focused
// document's corner (D5 §4 rule 5) — the current item, while the tree's
// container stands out of the order; the container is the stop only where
// the mirror holds no item. The panel is shown while the ring is drawn
// (`shown`): a keyboard user sees the list they stand in; a pointer user's
// landing shows none. While the reading scene stands over the plane the tree
// is inert (`cover`), out of the order and of the accessibility tree, the
// scene's stops in its place ("In the scene: pane, pane, the scene's acts"),
// until the scene's end puts it back.
// Carries: the wireframe's §13 whole; the bare `k` toggle DROPPED (M-7
// ELIMINATED: the walk is always live).
// Rules: FP-1, FP-2, FP-7, FP-9, FP-10, FP-13 (the mirror rebuilt from state), FP-20.

import * as REC from '../model/records.js';
import * as LK from '../links/links.js';
import * as PUMP from '../model/pump.js';
import * as CAM from '../plane/camera.js';
import * as LAYER from '../text/layer.js';
import * as FOCUS from './focus.js';
import { placeholderOf } from '../text/article.js';
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
/** the walk's moves, each counted as it starts: a move a later one has overtaken sets nothing */
let moves = 0;
/** @type {HTMLElement | null} */
let mirrorEl = null;
/** @type {Array<(n: Node | null) => void>} */
const watchers = [];

/** the board's node */
const BOARD = /** @type {Node} */ ({ kind: 'board', addr: '1', pos: null, link: null });

/**
 * Attach the mirror: the plane's stop registered with the focus's owner,
 * which tells the walk when the ring's rule changes, so the panel follows it
 * and the plane is redrawn.
 * @param {HTMLElement} mirror
 */
export function attach(mirror) {
  mirrorEl = mirror;
  mirror.setAttribute('aria-label', t('L.mirror-label'));
  FOCUS.attach({ plane: mirror, home: stopEl });
  FOCUS.onChange(() => { if (mirrorEl && mirrorEl.classList) mirrorEl.classList.toggle('shown', FOCUS.ringShown()); CAM.markDirty(); });
}
/** the plane's one stop now: the mirror's current item, or the tree itself where it holds no item */
function stopEl() {
  if (!mirrorEl || typeof mirrorEl.querySelector !== 'function') return mirrorEl;
  return /** @type {HTMLElement | null} */ (mirrorEl.querySelector(`#walk-${idx}`)) || mirrorEl;
}
/** does the mirror hold the platform's focus now? */
const mirrorHolds = () => !!mirrorEl && typeof document !== 'undefined' && mirrorEl.contains(document.activeElement);
/**
 * The plane covered and uncovered (D5 §4 rule 5): while chrome stands over
 * the plane — the reading scene — the tree is `inert`, so neither Tab nor
 * assistive technology reaches the walk's element under it. The mark stands
 * on the tree, never on an item, so the rebuild keeps it.
 * @param {boolean} on chrome covers the plane (true) or has left it (false)
 */
export function cover(on) { if (mirrorEl) FOCUS.cover(mirrorEl, on); }
export function onFocus(/** @type {(n: Node | null) => void} */ fn) { watchers.push(fn); }
/** the walk's element, read-only */
export const current = () => focus;
/** the position a landing named inside the focused span, read-only — the one line's position (null: the span's own first) */
export const landedAt = () => landed;
/** the focused span, for the article's `lit` mark */
export function focusedSpan() { return focus && focus.kind === 'block' && focus.pos != null ? { addr: focus.addr, pos: focus.pos } : null; }
/** is the ring drawn — the focus's owner's rule (rule 10): the plane holds the focus and a key moved it */
export const ringShown = () => FOCUS.ringShown();

/** is a block an element of the walk (rule 20): any but a paragraph of white space alone */
export const isElement = (/** @type {Block} */ b) => b.kind !== 'para' || b.text.trim() !== '';

/**
 * The children of a node, in record order.
 * @param {Node | null} node null = the plane's root
 * @returns {Promise<Node[]>}
 */
export async function childrenOf(node) {
  if (!node) return [BOARD];
  if (node.kind === 'board') return REC.accounts().filter((a) => !a.system).map((a) => ({ kind: /** @type {const} */ ('account'), addr: a.account, pos: null, link: null }));
  if (node.kind === 'account') return REC.placesOf(node.addr).map((p) => ({ kind: /** @type {const} */ ('document'), addr: p.doc, pos: null, link: null }));
  if (node.kind === 'document') {
    const d = await PUMP.loadWhole(node.addr); if (!d) return [];
    /** @type {Node[]} */
    const out = d.blocks.filter(isElement).map((b) => ({ kind: /** @type {const} */ ('block'), addr: node.addr, pos: b.pos, link: null }));
    for (const s of LK.shown(node.addr)) out.push({ kind: 'link', addr: node.addr, pos: s.pos, link: s });
    return out;
  }
  return [];
}

/** the accessible name of a node (what the mirror's item says), from ST's entries */
export function nameOf(/** @type {Node} */ n, /** @type {number} */ i, /** @type {number} */ total) {
  const pos = ' ' + t('L.mirror.item', { i: i + 1, n: total });
  if (n.kind === 'board') {
    const b = REC.board(); const accts = REC.accounts().filter((a) => !a.system).length;
    return (b ? t('L.mirror.board', { node: n.addr, origin: b.origin, n: accts }) : t('L.mirror.board.bare', { node: n.addr, n: accts })) + pos;
  }
  if (n.kind === 'account') {
    const c = REC.countOf(n.addr); const lk = LK.countAccount(n.addr);
    const documents = c.exact ? String(c.documents) : t('L.mirror.at-least', { n: c.documents });
    const links = lk.arriving ? t('L.mirror.at-least', { n: lk.n }) : String(lk.n);
    return t('L.mirror.account', { account: n.addr, documents, links, empty: c.documents ? '' : ' — ' + t('B1.empty_subspace') }) + pos;
  }
  if (n.kind === 'document') {
    const d = REC.doc(n.addr); const p = REC.place(n.addr);
    const state = d.refused === 'withheld' ? LAYER.withheldBox(d) : d.kind === 'draft' ? t('L.mirror.draft') : t('F.published');
    return t('L.mirror.document', { document: n.addr, label: p && p.label ? '"' + p.label + '"' : '', state, extent: d.extent != null ? t('L.mirror.positions', { n: d.extent }) : '' }) + pos;
  }
  if (n.kind === 'block') {
    const d = REC.doc(n.addr); const b = d.blocks.find((x) => x.pos === n.pos);
    if (!b) return t('L.mirror.span.bare', { p: n.pos ?? '', document: n.addr }) + pos;
    if (b.kind === 'withheld') {
      const w = placeholderOf(b, REC.reader(), LAYER.originOwner, LAYER.clauseOf);
      return t('L.mirror.withheld', { document: n.addr, width: b.width, owner: w.owner, origin: b.origin || '', arm: w.arm.text, clause: w.clause ? t('L.mirror.clause', { clause: w.clause.text }) : '' }) + pos;
    }
    const org = d.origins.find((o) => o.pos < b.pos + b.width && b.pos < o.pos + o.width);
    return t('L.mirror.span', { p: b.pos, extent: d.extent ?? '?', document: n.addr, same: org ? t('L.mirror.same', { origin: org.doc }) : '', text: b.text }) + pos;
  }
  if (n.kind === 'link' && n.link) {
    const l = n.link;
    return t('L.mirror.link', {
      link: l.link.addr, type: l.link.type || t('L.mirror.untyped'), direction: l.end === 'from' ? t('F.card.to') : t('F.card.from'), far: l.far,
      unregistered: REC.doc(l.far).refused === 'unregistered' ? t('L.mirror.unregistered') : '',
      floating: LK.floats(l) ? t('L.mirror.floating', { sentence: t('F.floating', { D: l.far }) }) : '',
    }) + pos;
  }
  return '';
}

const levelOf = (/** @type {Node} */ n) => (n.kind === 'board' ? 1 : n.kind === 'account' ? 2 : n.kind === 'document' ? 3 : 4);

/**
 * Move the walk to item `i` of `sibs` — the one way it moves. A landing
 * passes the position it named, kept only where the focused span holds it;
 * a walk key passes none.
 * @param {Node[]} sibs
 * @param {number} i
 * @param {number | null} [at] the position a landing named
 */
function setFocus(sibs, i, at = null) {
  siblings = sibs; idx = i; focus = sibs[i] ?? null;
  const held = at != null && focus && focus.kind === 'block' ? REC.blockAt(focus.addr, at) : null;
  landed = held && focus && held.pos === focus.pos ? at : null;
}

/**
 * A node among its listed siblings (rule 12): its own index where the index
 * lists it, else the siblings with the node placed among them in address
 * order, so a landing the index does not list stands on its own node and the
 * mirror and the one line name it.
 * @param {Node[]} sibs
 * @param {Node} node
 * @returns {{sibs: Node[], i: number}}
 */
export function among(sibs, node) {
  const i = sibs.findIndex((n) => n.addr === node.addr);
  if (i >= 0) return { sibs, i };
  let at = sibs.findIndex((n) => cmpAddr(n.addr, node.addr) > 0);
  if (at < 0) at = sibs.length;
  const out = sibs.slice(); out.splice(at, 0, node);
  return { sibs: out, i: at };
}

/**
 * Rebuild the mirror from state (FP-13), the plane's one Tab stop with it
 * (D5 §4 rule 5): the current item, the only item at tabindex 0, while the
 * tree's container stands out of the order — focusable still, by script and
 * by a click — and the container itself where the walk's level holds no item
 * (a landing where the index lists nothing at its level). Replacing the
 * items removes the one the platform's focus may stand on; the callers put
 * it on the new current item through the focus's owner (`FOCUS.land`), as
 * every rebuild here is a move of the walk.
 */
export function render() {
  if (!mirrorEl) return;
  const total = siblings.length, W = 24;
  const lo = Math.max(0, idx - W), hi = Math.min(total, idx + W);
  const lvl = total ? levelOf(siblings[0]) : 1;
  let html = `<ul role="group" aria-label="${esc(t('L.mirror-level', { n: lvl }))}">`;
  for (let i = lo; i < hi; i++) {
    const n = siblings[i];
    html += `<li role="treeitem" id="walk-${i}" tabindex="${i === idx ? 0 : -1}" aria-level="${lvl}" aria-posinset="${i + 1}" aria-setsize="${total}" aria-selected="${i === idx}" data-i="${i}" data-addr="${esc(n.addr)}"${n.pos != null ? ` data-pos="${n.pos}"` : ''}>${esc(nameOf(n, i, total))}</li>`;
  }
  html += '</ul>';
  mirrorEl.innerHTML = html;
  mirrorEl.tabIndex = idx >= lo && idx < hi ? -1 : 0;
}

/**
 * The walk's element takes the platform's focus through the focus's owner —
 * the mirror's current item, brought inside the panel's window, or the mirror
 * itself where it holds no item — with the ring's rule set where the move is
 * an act's (`byKey` given), or kept where it is a hand-off: the app's, where
 * a control that held the focus has gone (a corner leaving the plane), and
 * the controller's own return to the walk's element (D5 §4 rule 4).
 * @param {{byKey?: boolean}} [opts]
 */
export function focusItem(opts = {}) {
  const el = stopEl();
  FOCUS.land(el, opts);
  if (el && el !== mirrorEl) showInPanel(/** @type {HTMLElement} */ (el));
}

/**
 * Bring an item inside the panel's scroll window by the panel's own scroll
 * alone. The item's place is measured against the panel's padding box, so
 * the panel's position on the page and the viewport both stay where they
 * are; an item above the window lands at its top, one below at its bottom.
 * @param {HTMLElement} item
 */
function showInPanel(item) {
  if (!mirrorEl || typeof item.getBoundingClientRect !== 'function') return;
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

/** the walk moved: its watchers told, the plane redrawn */
function moved() {
  for (const w of watchers) w(focus);
  CAM.markDirty();
}

/**
 * The camera follows the focus: fly to the element at its level's scale —
 * nowhere where the document's extent is read first and a later move
 * overtook this one meanwhile.
 * @param {number} move the move's count
 */
async function flyToFocus(move) {
  if (!focus) return;
  if (focus.kind === 'board') await CAM.fly(CAM.viewForCell(boardCell(focus.addr), 0.92), 300);
  else if (focus.kind === 'account') await CAM.fly(CAM.viewForCell(accountCell(focus.addr), 0.85), 300);
  else if (focus.kind === 'document') {
    const d = REC.doc(focus.addr); if (d.extent == null) await PUMP.loadWhole(focus.addr);
    if (move !== moves) return;
    const box = docBox(focus.addr); await CAM.fly(CAM.viewForCell(box, 0.9), 300);
  } else {
    const d = REC.doc(focus.addr);
    const box = docBox(focus.addr);
    const frac = d.extent && focus.pos != null ? 0.12 + 0.8 * ((focus.pos - 1) / d.extent) : null;
    await CAM.fly(CAM.viewForDoc(box, LAYER.metricsOf(d).fs, 12.5, frac), 260);
  }
  CAM.markDirty();
}

/** a walk key's move: the mirror rebuilt, the platform's focus on the new item with the ring drawn (rules 10, 12), the watchers told */
function stepped() { render(); focusItem({ byKey: true }); moved(); }

/**
 * A walk key: ↓ ↑ siblings, → in, ← out, Home/End first/last, Enter acts;
 * Shift+↓ / Shift+↑ select by span (K-8, the selection's owner's, which
 * leaves the focus here — rule 15). → reads the children first, and enters
 * nothing where a later move overtook it meanwhile.
 * @param {'down' | 'up' | 'in' | 'out' | 'first' | 'last'} k
 * @returns {Promise<boolean>}
 */
export async function key(k) {
  if (!focus) { await enter(); return true; }
  if (k === 'down' || k === 'up' || k === 'first' || k === 'last') {
    const ni = k === 'down' ? Math.min(siblings.length - 1, idx + 1) : k === 'up' ? Math.max(0, idx - 1) : k === 'first' ? 0 : siblings.length - 1;
    if (ni !== idx) { const move = ++moves; setFocus(siblings, ni); stepped(); await flyToFocus(move); }
    return true;
  }
  if (k === 'in') {
    const move = ++moves;
    const kids = await childrenOf(focus);
    if (move !== moves) return true;
    if (kids.length) { stack.push({ siblings, idx }); setFocus(kids, 0); stepped(); await flyToFocus(move); }
    return true;
  }
  if (k === 'out') {
    const up = stack.pop();
    if (up && up.siblings.length) { const move = ++moves; setFocus(up.siblings, up.idx); stepped(); await flyToFocus(move); }
    return true;
  }
  return false;
}

/** the plane takes focus with nothing focused yet: the board */
export async function enter() {
  const move = ++moves;
  const kids = await childrenOf(null);
  if (move !== moves) return;
  stack = []; setFocus(kids, 0); stepped();
}

/**
 * The walk moves to a landing (a teleport, D5 §4 rule 8): the document, or
 * the span holding a position — the position kept as the one the landing
 * named (`landedAt`); a place the index does not list on its own node among
 * the listed siblings (rule 12). The platform's focus goes to the landing's
 * item wherever the act was made, the ring drawn where a key made it and put
 * out where anything else did (D5 §4 rule 2); a camera-made re-take (`take`
 * false) carries the focus to the new item only where the mirror held it,
 * the ring out, and leaves a focus standing elsewhere where it is. The
 * landing's levels are read first — a span's, its document's whole text — and
 * where a later move overtook it meanwhile it sets nothing.
 * @param {string} addr a document, an account or a board
 * @param {number | null} pos
 * @param {boolean} [byKey] a key made the act
 * @param {boolean} [take] the platform's focus goes to the landing's item wherever it stood (an act); false carries it only where the mirror held it (a camera's re-take)
 */
export async function focusTo(addr, pos, byKey = false, take = true) {
  const move = ++moves;
  const held = mirrorHolds();
  const doc = documentOf(addr), acct = accountOf(addr);
  if (doc) {
    const d = REC.doc(doc);
    // the levels above the landing, each holding ITS OWN place in its siblings (so ← walks out to this document, this account)
    const A = among(await childrenOf(BOARD), { kind: 'account', addr: acct || '', pos: null, link: null });
    const D = among(await childrenOf({ kind: 'account', addr: acct || '', pos: null, link: null }), { kind: 'document', addr: doc, pos: null, link: null });
    const kids = pos != null && d.blocks.length ? await childrenOf({ kind: 'document', addr: doc, pos: null, link: null }) : [];
    if (move !== moves) return;
    if (pos != null && kids.length) {
      const b = REC.blockAt(doc, pos);
      let i = b ? kids.findIndex((n) => n.kind === 'block' && n.pos === b.pos) : -1;
      // a position no block holds stands on the first span; one in a block that is no element of the walk — white space — on the element before it
      if (i < 0) { i = 0; if (b) kids.forEach((n, k) => { if (n.kind === 'block' && n.pos != null && n.pos <= pos) i = k; }); }
      stack = [{ siblings: [BOARD], idx: 0 }, { siblings: A.sibs, idx: A.i }, { siblings: D.sibs, idx: D.i }];
      setFocus(kids, i, pos);
    } else {
      stack = [{ siblings: [BOARD], idx: 0 }, { siblings: A.sibs, idx: A.i }];
      setFocus(D.sibs, D.i, null);
    }
  } else if (acct) {
    const A = among(await childrenOf(BOARD), { kind: 'account', addr: acct, pos: null, link: null });
    if (move !== moves) return;
    stack = [{ siblings: [BOARD], idx: 0 }];
    setFocus(A.sibs, A.i);
  } else {
    stack = []; setFocus([BOARD], 0);
  }
  render();
  if (take || held) focusItem({ byKey }); else FOCUS.land(null, { byKey });
  moved();
}

/**
 * The focus follows the camera (rule 3): after a camera move — the wheel,
 * the camera key's drag, a zoom chord, PageDown — re-take it at the element
 * under the view's centre at the scale's grain — far an account, mid a
 * document, reading a span. A key's move puts the platform's focus on the
 * element wherever the key was pressed, the ring drawn (rule 10); a
 * pointer's or the wheel's carries it only where the mirror held it, the
 * ring out, and says nothing until the next keyboard act (rule 12).
 * @param {boolean} [byKey] a key made the camera move
 */
export async function retakeFromView(byKey = false) {
  const lod = lodOf(CAM.cam.scale);
  const board = '1';
  if (lod.name === 'far' || lod.name === 'far~mid') {
    const acct = accountAt(CAM.cam.x, CAM.cam.y, board);
    if (acct && (!focus || focus.addr !== acct)) { await focusTo(acct, null, byKey, byKey); }
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
      if (!focus || focus.addr !== best || focus.pos !== b.pos) await focusTo(best, b.pos, byKey, byKey);
      return;
    }
  }
  if (!focus || focus.addr !== best || focus.kind !== 'document') await focusTo(best, null, byKey, byKey);
}

/** @returns {Node[]} the siblings in order (the gate's a11y case) */
export const siblingsNow = () => siblings.slice();
/** the sorted documents of an account (record order) */
export const documentsOf = (/** @type {string} */ acct) => REC.placesOf(acct).map((p) => p.doc).sort(cmpAddr);
