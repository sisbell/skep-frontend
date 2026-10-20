// O-PROV — PROVENANCE (the structure record §3.2 "O-PROV"; B1-S10). Layer 2.
// ENGINE-BOUND. State: none.
// "who wrote this?" — `show_origin` over the selected span's own bytes
// answers byte-granular through transclusion chains: the origin
// document(s), the sameness mark's gesture to the source; "who uses this?"
// — `find_docs_containing` over the same bytes names the documents whose
// arrangement holds the passage, short by a stated copy and by any document
// the reader may not read, which the blind-spot line says (C-72, DRAFT).
// Each act takes the span exactly as selected (R11); asked by a position
// alone, it takes the block holding it, whole. The two marks' variants
// (C-33, C-34) are the article's where they fire. Faces:
// `too_much_coverage`. Carries: the wireframe's §18 `provenanceCard`.
// Rules: FP-1, FP-2, FP-13.

import * as HOST from './host.js';
import * as PUMP from '../model/pump.js';
import * as REC from '../model/records.js';
import * as F from '../model/frames.js';
import * as GO from '../nav/go.js';
import * as SCENE from '../scene/scene.js';
import * as FACES from './faces.js';
import { t } from '../strings.js';
import { esc } from '../util.js';
import { accountOf } from '../model/address.js';

/**
 * The span asked over: the bytes named; with no width, the block holding
 * the position, whole; a position in no delivered block, one position.
 * @param {string} addr
 * @param {number} pos
 * @param {number | null} width
 */
function spanOf(addr, pos, width) {
  if (width != null && width > 0) return { ordinal: pos, positions: width };
  const b = REC.blockAt(addr, pos);
  return b ? { ordinal: b.pos, positions: Math.max(1, b.width) } : { ordinal: pos, positions: 1 };
}

/**
 * who wrote this? (A-41, R29)
 * @param {string} addr
 * @param {number} pos the span's first position
 * @param {number | null} [width] the span's positions; null asks over the block holding `pos`
 */
export async function wrote(addr, pos, width = null) {
  const sp = spanOf(addr, pos, width);
  const anchor = { span: { addr, pos: sp.ordinal, width: sp.positions } };
  const out = await PUMP.read(F.showOrigin(addr, sp.ordinal, sp.positions));
  if ('refused' in out) { FACES.showRefusal(anchor, out.refused, addr); return; }
  const origins = F.decodeAddrs(out.answer);
  const rows = origins.map((o) => {
    const owner = REC.doc(o).meta ? REC.doc(o).meta?.owner : accountOf(o);
    const same = o !== addr;
    const text = same ? t('B1.wrote', { owner: owner || '', account: owner || '', origin: o }) : t('B1.wrote.here', { owner: owner || '', account: owner || '', origin: o });
    return { o, same, text };
  });
  const html = `<span class="label">${esc(t('B1.who-wrote'))} · ${esc(addr)} · ${esc(t('F.position', { p: sp.ordinal }))}</span>` +
    rows.map((r, i) => `<div class="answer" data-string="${r.same ? 'B1.wrote' : 'B1.wrote.here'}">${esc(r.text)}${r.same ? ` <button data-run="src${i}">${esc(r.o)}</button><button data-run="beside${i}">${esc(t('B1.side-by-side'))}</button>` : ''}</div>`).join('');
  /** @type {Record<string, import('./host.js').Act>} */
  const acts = {};
  rows.forEach((r, i) => { acts['src' + i] = (_el, byKey) => GO.leapTo(r.o, { how: 'leap', byKey }); acts['beside' + i] = () => SCENE.open(addr, r.o, { posA: sp.ordinal, widthA: sp.positions, posB: null }); });
  HOST.show({ kind: 'card', id: 'provenance:wrote', anchor, html, acts });
}

/**
 * who uses this? (A-44, R30) with its blind spots stated (C-72)
 * @param {string} addr
 * @param {number} pos the span's first position
 * @param {number | null} [width] the span's positions; null asks over the block holding `pos`
 */
export async function uses(addr, pos, width = null) {
  const sp = spanOf(addr, pos, width);
  const anchor = { span: { addr, pos: sp.ordinal, width: sp.positions } };
  const out = await PUMP.read(F.findDocsContaining([{ doc: addr, spans: [sp] }]));
  if ('refused' in out) { FACES.showRefusal(anchor, out.refused, addr); return; }
  const users = F.decodeAddrs(out.answer).filter((u) => u !== addr);
  const answer = users.length ? t('B1.uses', { documents: users.join(', ') }) : t('B1.uses.none');
  const html = `<span class="label">${esc(t('B1.who-uses'))} · ${esc(addr)} · ${esc(t('F.position', { p: sp.ordinal }))}</span>` +
    `<div class="answer" data-string="${users.length ? 'B1.uses' : 'B1.uses.none'}">${esc(answer)}</div>` +
    (users.length ? `<div class="acts">${users.map((u, i) => `<button data-run="u${i}">${esc(u)}</button>`).join('')}</div>` : '') +
    `<div class="clause" data-string="B1.C-72">${esc(t('B1.C-72'))}</div>`;
  /** @type {Record<string, import('./host.js').Act>} */
  const acts = {};
  users.forEach((u, i) => { acts['u' + i] = (_el, byKey) => GO.leapTo(u, { how: 'leap', byKey }); });
  HOST.show({ kind: 'card', id: 'provenance:uses', anchor, html, acts });
}
