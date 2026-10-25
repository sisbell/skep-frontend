// O-TRAIL-LIST — the trail's list (the structure record §3.2; foundations
// §2.2; B1-S12). Layer 2. ENGINE-BOUND. State: none. A transient overlay
// conjured beside Back and Forward and gone with its end like every other —
// never a toggle (K-41 Mod+Y); it stands beneath Back, which the host finds
// again by its id as the one line is rebuilt (O-HOST's anchor); every entry
// numbered newest-first, the same numbers as the pips and the chords Mod+1 …
// Mod+9; Enter or a click jumps (a cursor move, never a push), the ring drawn
// at the landing where a key made the jump. Opened by a key — Mod+Y, Enter on
// the line's act — it takes the focus on its newest row, the first (K-41; the
// focus record's rule 13); opened by a click on the line's act it takes none
// (rule 16). Each row's words are read from the model as the list is made
// (N-GO's `wordsHTML`; FP-29), never kept in an entry: its address in the
// identifier's face, a document's first line in the reading face; a reading
// scene's entry names both its documents, in its panes' order, as the
// scene's bar names them (N-GO's `scenePair`).
// Rules: FP-1, FP-2, FP-13, FP-20, FP-29.

import * as HOST from './host.js';
import * as TRAIL from '../nav/trail.js';
import * as GO from '../nav/go.js';
import { t } from '../strings.js';
import { esc } from '../util.js';

/**
 * Open the list; by a key, it takes the focus on its newest row.
 * @param {boolean} [byKey] a key made the act that opened it
 */
export function open(byKey = false) {
  const rows = TRAIL.numbered();
  /** where an entry stands: a reading scene's two documents, else its address and the position landed on */
  const where = (/** @type {import('../nav/trail.js').Entry} */ e) => {
    const pair = GO.scenePair(e);
    if (pair) return pair.map((a) => `<span class="id">${esc(a)}</span>`).join(' │ ');
    return `<span class="id">${esc(e.addr)}</span>${e.pos != null ? ` · ${esc(t('F.position', { p: e.pos }))}` : ''}`;
  };
  const html = `<span class="label">${esc(t('F.trail-list'))}</span>` +
    (rows.length
      ? `<ul class="rows">${rows.map((r) => `<li><button data-run="j${r.n}" aria-current="${r.current}"><span class="k">${r.n <= 9 ? r.n : '·'}</span> ${where(r.entry)} <span class="dim">${GO.wordsHTML(r.entry)}</span></button></li>`).join('')}</ul>`
      : `<div class="dim">—</div>`);
  /** @type {Record<string, import('./host.js').Act>} */
  const acts = {};
  for (const r of rows) acts['j' + r.n] = (_el, byKey) => { GO.toTrailEntry(r.n, byKey); };
  const anchorEl = document.getElementById('line-back');
  HOST.show({ kind: 'list', id: 'trail-list', anchor: anchorEl ? { el: anchorEl } : null, html, acts, takeFocus: byKey });
}
