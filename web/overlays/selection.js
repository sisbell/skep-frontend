// O-SELECTION — THE SELECTION and its acts in fixed slots (the structure
// record §3.2 "O-SELECTION"; foundations §3.1; D5 §1.6). Layer 2.
// ENGINE-BOUND. State: VIEW — the selection — THE ONE OWNER; T-LAYER reads
// it through the reader handed in.
// THE SELECTION IS THE SPAN (R11, MUST; foundations §3.1): a byte range of
// one document, `{addr, pos, width}` in V-positions, made in one continuous
// gesture — a drag over the mounted text at reading scale (§2.4), read back
// from the platform's own selection through T-LAYER's mapping as the drag
// ends and as it changes — or by a key: a click on a block and Enter at the
// focused span select the block whole; K-8's Shift+↓ / Shift+↑ select the
// focused span and then extend it by a span each press. The platform's
// highlight is the selection's one mark (§2.1): T-LAYER places it over the
// span and keeps it through a remount. The acts take the span exactly: "who
// wrote this?" and "who uses this?" ask over its bytes; "follow" and "read
// side by side" count only the links DRAWN at the span (`LK.shownAt`), inert
// where none, asking which only at two or more and naming the far document
// at one. The slots, in this order and never moved: annotate · quote · who
// wrote this? · who uses this? · see the links · follow · read side by side ·
// link to… — each showing its chord (D5-F8); annotate, quote and "link to…"
// are INERT in this lane with their reason (B8's and the editor's lanes —
// seams). Dismissed with the selection; an act's card taking the acts'
// place is a replacement, not a dismissal, and the selection stands under
// it. The focus and the mirror stay at block grain (D5-F11, RULED: the
// assistive path is met at span grain).
// Carries: the wireframe's §16 `selectSpan`, §18 `selectionActs`.
// Rules: FP-1, FP-2, FP-7, FP-9, FP-10, FP-13.

import * as HOST from './host.js';
import * as REC from '../model/records.js';
import * as LAYER from '../text/layer.js';
import * as LK from '../links/links.js';
import * as GO from '../nav/go.js';
import * as SCENE from '../scene/scene.js';
import * as PROV from './provenance.js';
import * as LINKS from './links-card.js';
import * as WALK from '../nav/walk.js';
import { extended, sameSpan, spanOfBlock } from '../text/span.js';
import { t, typeName } from '../strings.js';
import { esc } from '../util.js';
import { markDirty } from '../plane/camera.js';
import { drawChord } from '../nav/keys.js';

/** @typedef {import('../text/span.js').Span} Span */

/** @type {Span | null} */
let sel = null;

/** the selection, read-only (T-LAYER's reader) */
export const selected = () => sel;

/** the block holding a position, whole; a position in no delivered block names one position */
function wholeBlock(/** @type {string} */ addr, /** @type {number} */ pos) {
  const b = REC.blockAt(addr, pos);
  return b ? spanOfBlock(addr, b) : { addr, pos, width: 1 };
}

/**
 * Select a span: the bytes named, or, with no width, the whole of the block
 * holding `pos` (a click, Enter at the focused span, the gate's door). The
 * platform's highlight is placed over it, the article re-marks the blocks
 * it touches, its acts appear at it.
 * @param {string} addr
 * @param {number} pos the span's first position
 * @param {number | null} [width] positions; null selects the block at `pos` whole
 * @param {boolean} [byKey]
 */
export function select(addr, pos, width = null, byKey = false) {
  const span = width != null && width > 0 ? { addr, pos, width } : wholeBlock(addr, pos);
  const same = sameSpan(span, sel);
  sel = span;
  LAYER.placeSelection(span);
  if (!same) LAYER.bump();
  markDirty();
  render(byKey);
}

/**
 * K-8 (Shift+↓ / Shift+↑): the first press selects the walk's focused span
 * whole; each further press extends the selection by a span in the
 * direction pressed.
 * @param {'down' | 'up'} [dir]
 */
export function selectFocused(dir = 'down') {
  const f = WALK.current();
  if (!f || f.kind !== 'block' || f.pos == null) return;
  if (!sel || sel.addr !== f.addr) { select(f.addr, f.pos, null, true); return; }
  const e = extended(REC.doc(sel.addr).blocks, sel, dir);
  select(e.addr, e.pos, e.width, true);
}

/** clear the selection: the platform's highlight, its acts and its marks with it */
export function clear() {
  if (!sel) return;
  sel = null;
  LAYER.placeSelection(null);
  if (HOST.currentIs('selection')) HOST.dismiss();
  LAYER.bump(); markDirty();
}

const SLOTS = /** @type {const} */ ([
  ['annotate', 'D5.annotate', 'Mod+Shift+A'],
  ['quote', 'D5.quote', 'Mod+Shift+C'],
  ['wrote', 'B1.who-wrote', 'Mod+Shift+O'],
  ['uses', 'B1.who-uses', 'Mod+Shift+R'],
  ['links', 'B1.see-links', 'Mod+Shift+L'],
  ['follow', 'B1.follow', 'Mod+Enter'],
  ['scene', 'B1.side-by-side', 'Mod+Shift+Enter'],
  ['linkto', 'D5.link-to', ''],
]);

/** rebuild the acts card at the selected span (FP-13) */
export function render(byKey = false) {
  if (!sel) return;
  const span = sel;
  const { addr, pos } = span;
  const drawn = LK.shownAt(addr, span);
  const n = drawn.length;
  const farLabel = n === 1 ? ` ${drawn[0].far}` : n > 1 ? ` ${n}` : '';
  const inertReason = { annotate: 'L.seam.annotate', quote: 'L.seam.quote', linkto: 'L.seam.link-to' };
  const buttons = SLOTS.map(([id, strId, chord]) => {
    const inert = id === 'annotate' || id === 'quote' || id === 'linkto' || ((id === 'follow' || id === 'scene') && n === 0);
    const label = t(strId) + ((id === 'follow' || id === 'scene') ? farLabel : '');
    const reason = inert && id in inertReason ? t(inertReason[/** @type {keyof typeof inertReason} */ (id)]) : '';
    return `<button data-run="${id}" class="${inert ? 'inert' : ''}" ${reason ? `title="${esc(reason)}"` : ''}>${esc(label)}${chord ? ` <kbd>${esc(drawChord(chord))}</kbd>` : ''}</button>`;
  }).join('');
  const html = `<span class="label">${esc(addr)} · ${esc(t('F.position', { p: pos }))}</span><div class="slots">${buttons}</div>`;
  HOST.show({
    kind: 'card', id: 'selection', anchor: { span }, html, takeFocus: byKey,
    acts: {
      annotate: (el) => { el.setAttribute('data-inert', '1'); },
      quote: (el) => { el.setAttribute('data-inert', '1'); },
      linkto: (el) => { el.setAttribute('data-inert', '1'); },
      wrote: () => act('wrote'), uses: () => act('uses'), links: () => act('links'), follow: () => act('follow'), scene: () => act('scene'),
    },
    onDismiss: (replaced) => { if (!replaced && sameSpan(sel, span)) { sel = null; LAYER.placeSelection(null); LAYER.bump(); markDirty(); } },
  });
}

/**
 * A slot's act (by chord or by its button); where no selection stands, the
 * walk's focused span is selected first, whole (D5 §1.6).
 * @param {'wrote' | 'uses' | 'links' | 'follow' | 'scene'} which
 */
export function act(which) {
  if (!sel) {
    const f = WALK.current();
    if (f && f.kind === 'block' && f.pos != null) { sel = wholeBlock(f.addr, f.pos); LAYER.placeSelection(sel); LAYER.bump(); markDirty(); }
    else { if (f && which === 'links') LINKS.show(f.addr, true); return; }
  }
  const span = sel;
  const { addr, pos, width } = span;
  if (which === 'wrote') { PROV.wrote(addr, pos, width); return; }
  if (which === 'uses') { PROV.uses(addr, pos, width); return; }
  if (which === 'links') { LINKS.show(addr, true); return; }
  const drawn = LK.shownAt(addr, span);
  if (which === 'follow') { if (drawn.length === 1) GO.follow(drawn[0], null); else if (drawn.length > 1) which_(drawn, 'follow'); return; }
  if (which === 'scene') { if (drawn.length === 1 && drawn[0].far) SCENE.open(addr, drawn[0].far, { posA: pos, posB: drawn[0].farEnd && !drawn[0].farEnd.whole ? drawn[0].farEnd.ordinal : null }); else if (drawn.length > 1) which_(drawn, 'scene'); }
}

/** the "which" list at two or more: each choice by its type, its linker and its far document (foundations §2.3) */
function which_(/** @type {import('../links/links.js').Shown[]} */ drawn, /** @type {'follow' | 'scene'} */ what) {
  const html = `<span class="label">${esc(t(what === 'follow' ? 'B1.follow' : 'B1.side-by-side'))}</span><ul class="rows">${drawn.map((s, i) => `<li><button data-run="w${i}" style="--mark-hue:${s.mark.hue}"><span class="sym-mark">⟡</span> ${esc(typeName(s.link.type))} · ${esc(s.link.owner || '')} · ${esc(s.far)}</button></li>`).join('')}</ul>`;
  /** @type {Record<string, (el: HTMLElement) => void>} */
  const acts = {};
  drawn.forEach((s, i) => { acts['w' + i] = (el) => { if (what === 'follow') GO.follow(s, el); else if (s.far && sel) SCENE.open(sel.addr, s.far, { posA: sel.pos, posB: s.farEnd && !s.farEnd.whole ? s.farEnd.ordinal : null }); }; });
  HOST.show({ kind: 'list', id: 'which', anchor: sel ? { span: sel } : null, html, acts, takeFocus: true });
}
