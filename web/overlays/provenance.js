// O-PROV — PROVENANCE (the structure record §3.2 "O-PROV"; B1-S10). Layer 2.
// ENGINE-BOUND. State: none.
// "who wrote this?" — `show_origin` over the selected block answers
// byte-granular through transclusion chains: the origin document(s), the
// sameness mark's gesture to the source; "who uses this?" —
// `find_docs_containing` names the documents whose arrangement holds the
// passage, short by a stated copy and by any document the reader may not
// read, which the blind-spot line says (C-72, DRAFT). The two marks' variants
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

/** the block's span */
function spanOf(/** @type {string} */ addr, /** @type {number} */ pos) {
  const d = REC.doc(addr);
  const b = d.blocks.find((x) => x.pos === pos);
  return b ? { ordinal: b.pos, positions: Math.max(1, b.width) } : { ordinal: pos, positions: 1 };
}

/** who wrote this? (A-41, R29) */
export async function wrote(/** @type {string} */ addr, /** @type {number} */ pos) {
  const sp = spanOf(addr, pos);
  const out = await PUMP.read(F.showOrigin(addr, sp.ordinal, sp.positions));
  if ('refused' in out) { FACES.showRefusal({ span: { addr, pos } }, out.refused, addr); return; }
  const origins = F.decodeAddrs(out.answer);
  const rows = origins.map((o) => {
    const owner = REC.doc(o).meta ? REC.doc(o).meta?.owner : accountOf(o);
    const same = o !== addr;
    const text = same ? t('B1.wrote', { owner: owner || '', account: owner || '', origin: o }) : t('B1.wrote.here', { owner: owner || '', account: owner || '', origin: o });
    return { o, same, text };
  });
  const html = `<span class="label">${esc(t('B1.who-wrote'))} · ${esc(addr)} · ${esc(t('F.position', { p: pos }))}</span>` +
    rows.map((r, i) => `<div class="answer draft" data-string="${r.same ? 'B1.wrote' : 'B1.wrote.here'}">${esc(r.text)}${r.same ? ` <button data-run="src${i}">${esc(r.o)}</button><button data-run="beside${i}">${esc(t('B1.side-by-side'))}</button>` : ''}</div>`).join('');
  /** @type {Record<string, (el: HTMLElement) => void>} */
  const acts = {};
  rows.forEach((r, i) => { acts['src' + i] = () => GO.leapTo(r.o, { how: 'leap' }); acts['beside' + i] = () => SCENE.open(addr, r.o, { posA: pos, posB: null }); });
  HOST.show({ kind: 'card', id: 'provenance:wrote', anchor: { span: { addr, pos } }, html, acts });
}

/** who uses this? (A-44, R30) with its blind spots stated (C-72) */
export async function uses(/** @type {string} */ addr, /** @type {number} */ pos) {
  const sp = spanOf(addr, pos);
  const out = await PUMP.read(F.findDocsContaining([{ doc: addr, spans: [sp] }]));
  if ('refused' in out) { FACES.showRefusal({ span: { addr, pos } }, out.refused, addr); return; }
  const users = F.decodeAddrs(out.answer).filter((u) => u !== addr);
  const answer = users.length ? t('B1.uses', { documents: users.join(', ') }) : t('B1.uses.none');
  const html = `<span class="label">${esc(t('B1.who-uses'))} · ${esc(addr)} · ${esc(t('F.position', { p: pos }))}</span>` +
    `<div class="answer draft" data-string="${users.length ? 'B1.uses' : 'B1.uses.none'}">${esc(answer)}</div>` +
    (users.length ? `<div class="acts">${users.map((u, i) => `<button data-run="u${i}">${esc(u)}</button>`).join('')}</div>` : '') +
    `<div class="clause draft" data-string="B1.C-72">${esc(t('B1.C-72'))}</div>`;
  /** @type {Record<string, (el: HTMLElement) => void>} */
  const acts = {};
  users.forEach((u, i) => { acts['u' + i] = () => GO.leapTo(u, { how: 'leap' }); });
  HOST.show({ kind: 'card', id: 'provenance:uses', anchor: { span: { addr, pos } }, html, acts });
}
