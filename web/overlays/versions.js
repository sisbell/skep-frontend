// O-VERSIONS — the members' list (the structure record §3.2 "O-VERSIONS";
// foundations §2.1's version row; F2.1-e). Layer 2. ENGINE-BOUND. State:
// none. On the corner's act: the chain's members `D.1 … D.n` (the pump probed
// n), each a LEAP that carries the passage held — the held passage (the
// selection's block, else the first in view) `compare`d into each member and
// marked whole / in part / not at all — and each offering "read side by
// side". New — no draft in the wireframe. Rules: FP-1, FP-2, FP-13.

import * as HOST from './host.js';
import * as PUMP from '../model/pump.js';
import * as REC from '../model/records.js';
import * as F from '../model/frames.js';
import * as GO from '../nav/go.js';
import * as SCENE from '../scene/scene.js';
import { versionAddress, memberOf, documentOf } from '../model/address.js';
import { t } from '../strings.js';
import { esc } from '../util.js';

/**
 * Open the list for a document (a member address answers its document's).
 * @param {string} addr
 * @param {number | null} pos the held passage's block
 * @param {HTMLElement | null} anchor
 */
export async function open(addr, pos, anchor) {
  const trunk = documentOf(addr) || addr;
  const d = REC.doc(trunk);
  if (d.extent == null) await PUMP.loadWhole(trunk);
  let n = d.members;
  if (n == null) {
    // probe here where the pump has not: D.1 is the birth; D.k until refused
    n = d.meta && d.meta.birth ? 1 : 0;
    for (let k = 2; k <= 8 && n >= 1; k++) { const out = await PUMP.read(F.docMetadata(versionAddress(trunk, k))); if ('refused' in out) break; n = k; }
    REC.takeMembers(trunk, n);
  }
  const block = pos != null ? d.blocks.find((b) => b.pos === pos) : d.blocks[0];
  /** @type {Array<{k: number, holds: 'whole' | 'part' | 'none' | null}>} */
  const rows = [];
  for (let k = 1; k <= n; k++) {
    /** @type {'whole' | 'part' | 'none' | null} */
    let holds = null;
    if (block) {
      const out = await PUMP.read(F.compare([{ doc: trunk, spans: [{ ordinal: block.pos, positions: Math.max(1, block.width) }] }], [{ doc: versionAddress(trunk, k), spans: [{ ordinal: 1, positions: Math.max(1, d.extent || 1) }] }]));
      if (!('refused' in out)) { const pairs = F.decodeCompare(out.answer); const covered = pairs.reduce((a, p) => a + p.width, 0); holds = covered >= block.width ? 'whole' : covered > 0 ? 'part' : 'none'; }
    }
    rows.push({ k, holds });
  }
  const cur = memberOf(addr);
  const html = `<span class="label">${esc(trunk)} · ${esc(t('F.version-of', { k: cur || n, n }))}</span>` +
    `<ul class="rows">${rows.map((r) => `<li><button data-run="read${r.k}" aria-current="${cur === r.k}">${esc(t('F.versions.read', { k: r.k }))}</button> <span class="strip" data-holds="${r.holds || ''}">${esc(r.holds === 'whole' ? t('F.versions.whole') : r.holds === 'part' ? t('F.versions.part') : r.holds === 'none' ? t('F.versions.none') : '')}</span> <button data-run="beside${r.k}">${esc(t('B1.side-by-side'))}</button></li>`).join('')}</ul>`;
  /** @type {Record<string, (el: HTMLElement) => void>} */
  const acts = {};
  for (const r of rows) {
    acts['read' + r.k] = () => GO.leapTo(versionAddress(trunk, r.k), { pos: block ? block.pos : null, how: 'leap' });
    acts['beside' + r.k] = () => SCENE.open(trunk, versionAddress(trunk, r.k), { posA: block ? block.pos : null, posB: null });
  }
  HOST.show({ kind: 'list', id: 'versions:' + trunk, anchor: anchor ? { el: anchor } : null, html, acts, takeFocus: true });
}
