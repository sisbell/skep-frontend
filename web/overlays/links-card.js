// O-LINKS — the links card (the structure record §3.2; B1-S4). Layer 2.
// ENGINE-BOUND. State (FP-10): the card's open state alone. The reveal
// chain's stage and the lenses live in LK (S-29 (b)): this card renders them
// and sets them through LK's setters, owning neither; it asks LK which links
// to list and draws nothing of its own choosing. The rows: the chain's stage
// (symbol → content), the overlay toggle — one switch whose words are
// B1-S4's, split at ⟨state⟩: the words before it name the switch and the
// count after it describes it, the same in both states, and the state is the
// word set between them and the switch's `aria-checked`, both the state LK
// holds (R60; WAI-ARIA's switch, whose label does not change with its state)
// — the lenses by owner, type and endorsement (R9; D-2 per document for the
// session), the links, each row naming its far end as its tail and its
// mirror item do (LK's `farLabel`) and opening its link's anatomy card at the
// link's own bytes, "show more" (the windowed list, the end marked, no page
// ever expires — A-287), the blind-spot clause (R4's cross-board disclosure,
// E3 (a)). The card's dismissal returns the chain to hidden; an act's card
// taking its place is a replacement (O-HOST), so the chain stands — the
// symbols stay at their spans, each opening its own card. The card takes the
// focus on its first act where a key asked for it and never otherwise (the
// focus record's rule 16); rebuilt by its own act, it keeps the focus on the
// control pressed (rule 11, O-HOST's); a row's card takes the focus as the
// row's act was made (rule 11). Figures: twelve rows a page.
// Rules: FP-1, FP-2, FP-10, FP-13, FP-20.

import * as HOST from './host.js';
import * as ANATOMY from './anatomy-card.js';
import * as LK from '../links/links.js';
import * as LAYER from '../text/layer.js';
import { t, typeName } from '../strings.js';
import { esc } from '../util.js';
import { docBox } from '../plane/projection.js';
import { markDirty } from '../plane/camera.js';

const PAGE = 12;

/** @type {{addr: string, page: number} | null} */
let open = null;

/** is the card open at a document? */
export const isOpen = (/** @type {string} */ addr) => !!open && open.addr === addr;

/**
 * Ask to see the links at a document: the card conjured at the document's
 * corner; the chain moves to stage 2 (the symbols at their spans).
 * @param {string} addr
 * @param {boolean} [byKey]
 */
export function show(addr, byKey = false) {
  const r = LK.state(addr);
  if (r.stage < 2) LK.reveal(addr, 2);
  open = { addr, page: 1 };
  LAYER.bump(); markDirty();
  render(byKey);
}

/**
 * The overlay toggle as the card sets it (B1-S4; R60): the toggle's words
 * split at ⟨state⟩. The words before the state name the switch and the count
 * after it describes it, so a press changes neither and assistive technology
 * hears the state once, from `aria-checked`; the state word stands between
 * them, so the switch reads as B1-S4 writes it. The separators belong to
 * neither.
 * @param {boolean} on whether others' links are shown at the document
 * @param {number} n the others' links that touch it
 * @returns {string}
 */
export function othersSwitch(on, n) {
  const id = n === 1 ? 'B1.others-toggle.1' : 'B1.others-toggle';
  const [before, after] = t(id, { n }).split('⟨state⟩');
  const name = before.replace(/[^\p{L}\p{N}]+$/u, ''), count = after.replace(/^[^\p{L}\p{N}]+/u, '');
  return `<button data-run="others" role="switch" aria-checked="${on}" aria-labelledby="links-others-name" aria-describedby="links-others-count" data-string="${id}">` +
    `<span id="links-others-name">${esc(name)}</span>${esc(before.slice(name.length))}${on ? 'on' : 'off'}${esc(after.slice(0, after.length - count.length))}<span id="links-others-count">${esc(count)}</span></button>`;
}

/** rebuild the card from LK's state (FP-13) */
export function render(byKey = false) {
  if (!open) return;
  const addr = open.addr;
  const r = LK.state(addr);
  const shown = LK.shown(addr);
  const others = LK.othersTouching(addr);
  const rows = LK.lensRows(addr);
  const box = docBox(addr);
  const listed = shown.slice(0, open.page * PAGE);
  const more = shown.length > listed.length;
  const html =
    `<span class="label">${esc(t('B1.see-links'))} · ${esc(addr)}</span>` +
    `<div class="stage">${r.stage >= 3 ? `<button data-run="stage2">◦ symbols</button>` : `<button data-run="stage3">— content</button>`}</div>` +
    `<div class="toggle">${othersSwitch(r.others, others.length)}</div>` +
    `<div class="lenses">` +
      `<span class="lens-label">${esc(t('F.lens.owner'))}</span>${rows.owners.map((o) => `<button data-run="owner:${esc(o)}" aria-pressed="${r.lens.owners ? r.lens.owners.has(o) : false}">${esc(o)}</button>`).join('') || '—'}` +
      `<span class="lens-label">${esc(t('F.lens.type'))}</span>${rows.types.map((ty) => `<button data-run="type:${esc(ty)}" aria-pressed="${r.lens.types ? r.lens.types.has(ty) : false}">${esc(typeName(ty))}</button>`).join('') || '—'}` +
      `<span class="lens-label">${esc(t('F.lens.endorsement'))}</span><button data-run="endorsed" aria-pressed="${r.lens.endorsed}">${esc(t('F.lens.endorsed'))}</button>` +
      `${r.lens.owners || r.lens.types || r.lens.endorsed ? `<button data-run="clear">×</button>` : ''}` +
    `</div>` +
    `<ul class="rows">${listed.map((s, i) => `<li><button data-run="row:${i}" style="--mark-hue:${s.mark.hue};--mark-value:${s.mark.value}"><span class="sym-mark">⟡</span> ${esc(typeName(s.link.type))} · ${esc(s.end === 'from' ? '→' : '←')} ${esc(LK.farLabel(s) || '—')}</button></li>`).join('')}</ul>` +
    (more ? `<button data-run="more">${esc(t('B1.show-more'))}</button>` : shown.length ? `<span class="end">·</span>` : '') +
    `<div class="clause" data-string="F.card-clause">${esc(t('F.card-clause'))}</div>`;
  /** @type {Record<string, import('./host.js').Act>} */
  const acts = {
    stage3: () => { LK.reveal(addr, 3); LAYER.bump(); markDirty(); render(); },
    stage2: () => { LK.reveal(addr, 2); LAYER.bump(); markDirty(); render(); },
    others: () => { LK.setOthers(addr, !LK.state(addr).others); LAYER.bump(); markDirty(); render(); },
    endorsed: () => { LK.lens(addr, { endorsed: !LK.state(addr).lens.endorsed }); LAYER.bump(); markDirty(); render(); },
    clear: () => { LK.clearLens(addr); LAYER.bump(); markDirty(); render(); },
    more: () => { if (open) open.page++; render(); },
  };
  for (const o of rows.owners) acts['owner:' + o] = () => { const cur = LK.state(addr).lens.owners; const set = new Set(cur || []); if (set.has(o)) set.delete(o); else set.add(o); LK.lens(addr, { owners: set.size ? set : null }); LAYER.bump(); markDirty(); render(); };
  for (const ty of rows.types) acts['type:' + ty] = () => { const cur = LK.state(addr).lens.types; const set = new Set(cur || []); if (set.has(ty)) set.delete(ty); else set.add(ty); LK.lens(addr, { types: set.size ? set : null }); LAYER.bump(); markDirty(); render(); };
  listed.forEach((s, i) => { acts['row:' + i] = (_el, byKey) => ANATOMY.open(s, null, byKey); });
  HOST.show({
    kind: 'card', id: 'links:' + addr, anchor: { world: { x: box.x + box.w, y: box.y } }, html, acts, takeFocus: byKey,
    onDismiss: (replaced) => {
      if (!open || open.addr !== addr) return;
      open = null;
      if (!replaced) { LK.hide(addr); LAYER.bump(); markDirty(); }
    },
  });
}

/** close the card (a dismissal: the chain returns to hidden) */
export function close() { if (open) HOST.dismiss(); }
