// O-LINKS — the links card (the structure record §3.2; B1-S4). Layer 2.
// ENGINE-BOUND. State (FP-10): the card's open state alone. The reveal
// chain's stage and the lenses live in LK (S-29 (b)): this card renders them
// and sets them through LK's setters, owning neither; it asks LK which links
// to list and draws nothing of its own choosing. Its caption names the
// document by its label and its address (O-ANATOMY's `linksOnHTML`), set as
// written. The rows: the chain's stage act in words — at the symbols, showing
// where the links lead; where that is drawn, hiding it — the overlay toggle —
// one switch whose words are B1-S4's, split at ⟨state⟩: the words before it
// name the switch and the count after it describes it, zero in words, the
// same in both states, and the state is the word set between them, "shown"
// or "hidden", and the switch's `aria-checked`, both the state LK holds
// (R60; WAI-ARIA's switch, whose label does not change with its state) — the
// lenses by owner, type and endorsement (R9; D-2 per document for the
// session), each chip named by its lens's label and its own words, "none" in
// the chips' place where a lens has none, the endorsement chip standing on
// its own words, and "Clear filters" while any is on; the links, each row
// drawn as every list of ends draws it (O-ANATOMY's `rowHTML`) — the way its
// link runs in words and its far end, as its tail and its mirror item draw
// it, its address in the identifier's face (an owner lens's too), then its
// type — named by the same (LK's `endRuns`), rendered for the ear (ST's
// `heard`; patterns K1), and opening its link's anatomy card at the link's
// own bytes; "Show more" (the windowed list, no page ever expires — A-287),
// and once the list is whole, its end said in words; the blind-spot clause
// (R4's cross-board disclosure, E3 (a)). The card's dismissal returns the
// chain to hidden; an act's card
// taking its place is a replacement (O-HOST), so the chain stands — the
// symbols stay at their spans, each opening its own card. The card takes the
// focus on its first act where a key asked for it and never otherwise (the
// focus record's rule 16); rebuilt by its own act, it keeps the focus on the
// control pressed (rule 11, O-HOST's); a row's card takes the focus as the
// row's act was made (rule 11). The card leaves and returns with its place
// (FP-36): it shows naming what it is about (O-HOST's `about`) — its
// document, the chain's stage and the pages it shows — and a return reopens
// it from that (`reopen`), the chain raised to its stage again, taking the
// focus on the control it was left holding it on. Figures: twelve rows a
// page.
// Rules: FP-1, FP-2, FP-10, FP-13, FP-20, FP-36.

import * as HOST from './host.js';
import * as ANATOMY from './anatomy-card.js';
import * as LK from '../links/links.js';
import * as LAYER from '../text/layer.js';
import { t, typeName, heard, counted } from '../strings.js';
import { esc } from '../util.js';
import { docBox } from '../plane/projection.js';
import { markDirty } from '../plane/camera.js';

const PAGE = 12;

/**
 * @typedef {Object} About — what the card is about (see the head)
 * @property {'links'} kind
 * @property {string} addr its document: the version its box showed
 * @property {1 | 2 | 3} stage the chain's stage there (LK's)
 * @property {number} page the pages of rows it showed
 */

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
 * split at ⟨state⟩, its count's entry the zero form where none touch the
 * document (ST's `counted`). The words before the state name the switch and
 * the count after it describes it, so a press changes neither and assistive
 * technology hears the state once, from `aria-checked`; the state's word,
 * "shown" or "hidden", stands between them, so the switch reads as B1-S4
 * writes it. The separators belong to neither.
 * @param {boolean} on whether others' links are shown at the document
 * @param {number} n the others' links that touch it
 * @returns {string}
 */
export function othersSwitch(on, n) {
  const { id, n: numbered } = counted(n, 'B1.others-toggle.1', 'B1.others-toggle', 'B1.others-toggle.0');
  const [before, after] = t(id, { n: numbered }).split('⟨state⟩');
  const name = before.replace(/[^\p{L}\p{N}]+$/u, ''), count = after.replace(/^[^\p{L}\p{N}]+/u, '');
  return `<button data-run="others" role="switch" aria-checked="${on}" aria-labelledby="links-others-name" aria-describedby="links-others-count" data-string="${id}">` +
    `<span id="links-others-name">${esc(name)}</span>${esc(before.slice(name.length))}${esc(t(on ? 'B1.others-toggle.shown' : 'B1.others-toggle.hidden'))}${esc(after.slice(0, after.length - count.length))}<span id="links-others-count">${esc(count)}</span></button>`;
}

/**
 * A lens's label and its chips (see the head): each chip a toggle named by
 * the label and its own words; "none" in the chips' place where the lens has
 * none.
 * @param {string} lens the lens, its label's id in the card
 * @param {string} label its label's string
 * @param {Array<{run: string, html: string, pressed: boolean, cls?: string}>} chips each chip's act, its words as markup, whether it is on, and its class
 * @returns {string}
 */
function lensHTML(lens, label, chips) {
  const at = `links-lens-${lens}`;
  return `<span class="lens-label" id="${at}">${esc(t(label))}</span>` + (chips.map((c, i) =>
    `<button${c.cls ? ` class="${c.cls}"` : ''} id="${at}-${i}" data-run="${esc(c.run)}" aria-pressed="${c.pressed}" aria-labelledby="${at} ${at}-${i}">${c.html}</button>`).join('') ||
    `<span data-string="F.card.none">${esc(t('F.card.none'))}</span>`);
}

/**
 * The card reopened on a return to its place (see the head; N-GO's): the
 * chain raised again to the stage it stood at — the symbols at least — at the
 * version its box shows now, the pages of rows it showed, the focus on the
 * control it was left holding it on, else none.
 * @param {{about: About, focus: string | null}} left
 * @param {string} addr the version its document's box shows now
 */
export function reopen(left, addr) {
  LK.reveal(addr, left.about.stage >= 3 ? 3 : 2);
  open = { addr, page: left.about.page };
  LAYER.bump(); markDirty();
  render(false, left.focus);
}

/**
 * Rebuild the card from LK's state (FP-13), naming what it is about.
 * @param {boolean} [byKey] a key asked for it: the focus goes to its first act
 * @param {string | null} [focus] a reopened card's control the focus was left on (O-HOST's `keyOf`): it takes the focus there
 */
export function render(byKey = false, focus = null) {
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
    `<span class="label cased">${ANATOMY.linksOnHTML(addr)}</span>` +
    `<div class="stage">${r.stage >= 3 ? `<button data-run="stage2">${esc(t('B1.links.hide-where'))}</button>` : `<button data-run="stage3">${esc(t('B1.links.show-where'))}</button>`}</div>` +
    `<div class="toggle">${othersSwitch(r.others, others.length)}</div>` +
    `<div class="lenses">` +
      lensHTML('owner', 'F.lens.owner', rows.owners.map((o) => ({ run: 'owner:' + o, html: esc(o), pressed: r.lens.owners ? r.lens.owners.has(o) : false, cls: 'id' }))) +
      lensHTML('type', 'F.lens.type', rows.types.map((ty) => ({ run: 'type:' + ty, html: esc(typeName(ty)), pressed: r.lens.types ? r.lens.types.has(ty) : false }))) +
      `<button data-run="endorsed" aria-pressed="${r.lens.endorsed}">${esc(t('F.lens.endorsed'))}</button>` +
      `${r.lens.owners || r.lens.types || r.lens.endorsed ? `<button data-run="clear">${esc(t('F.lens.clear'))}</button>` : ''}` +
    `</div>` +
    `<ul class="rows">${listed.map((s, i) => `<li><button data-run="row:${i}" style="--mark-hue:${s.mark.hue};--mark-value:${s.mark.value}" aria-label="${esc(heard(LK.endRuns(s)))}"><span class="sym-mark">⟡</span> ${ANATOMY.rowHTML(s)}</button></li>`).join('')}</ul>` +
    (more ? `<button data-run="more">${esc(t('B1.show-more'))}</button>` : shown.length ? `<span class="end" data-string="B1.links.end">${esc(t('B1.links.end'))}</span>` : '') +
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
    kind: 'card', id: 'links:' + addr, anchor: { world: { x: box.x + box.w, y: box.y } }, html, acts, takeFocus: byKey || focus != null, first: focus != null ? HOST.controlOf(focus) : undefined,
    about: { kind: 'links', addr, stage: r.stage, page: open.page },
    onDismiss: (replaced) => {
      if (!open || open.addr !== addr) return;
      open = null;
      if (!replaced) { LK.hide(addr); LAYER.bump(); markDirty(); }
    },
  });
}

/** close the card (a dismissal: the chain returns to hidden) */
export function close() { if (open) HOST.dismiss(); }
