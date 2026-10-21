// O-ANATOMY — THE ANATOMY CARD (the structure record §3.2 "O-ANATOMY";
// B1-S5; foundations §3.1). Layer 2. ENGINE-BOUND. State: none.
// Conjured at a link's symbol (or at its marked span, the link's own bytes),
// following it as the camera moves: led by each end's passage in words, the
// far end's first (so a click answers with what the link leads to) — the
// near end the document the link is drawn at (LK's `near`), whichever of its
// ends lies there, and the far end the other — then its anatomy — type
// (R5's form where the commons documents none: on this notebook no registry
// document is seeded, so every type reads "undocumented here"), from, to,
// home (published → the link is public; a draft → hidden with its home),
// owner (never a name alone), then its lineage (A-56, A-57, A-82):
// "superseded by" the `new` of each claim whose `old` is this link,
// "supersedes" the `old` of each claim whose `new` is it — read under the
// audit view (M-PUMP's `lineage`), so a retracted claim stands, marked
// "retracted"; a side that answered no claim reads B1-S5's "none", and a
// side whose read was refused draws no row, for nothing was learned of it.
// Its acts follow either end and open the scene. B1-S5's age row is not
// drawn: the age (the commit's position and time, from the feed) is not
// held for a link older than this page's feed, which starts at the head —
// and a row standing with no value would read as B1-S5's "none". The link's
// mark comes from LK's `markOf`, so the card and the symbol agree. The card
// takes the focus on its first act — follow — where a key opened it (Enter
// at the link's element, K-55; a links-card row's Enter) and never where a
// click did (D5 §4 rule 4; the focus record's rule 16). It opens on its
// reads, the ends' words and the lineage (O-HOST's `opening`), the opening
// begun in the act that asks for the card — each caller imports this module
// as the page loads, so no load stands between the act and the opening:
// where an act was made on the chrome while they read — Back, Esc, the LEAP
// box opened, the next card asked or shown — nothing shows.
// Later: the age row with the read that answers it; walking the lineage's
// links (A-56, A-57's act); B3-d's retract and edit (the editor's lane);
// link sets' SET line.
// Carries: the wireframe's §18 `anatomyCard`. Rules: FP-1, FP-2, FP-13, FP-20.

import * as HOST from './host.js';
import * as PUMP from '../model/pump.js';
import * as REC from '../model/records.js';
import * as LK from '../links/links.js';
import * as GO from '../nav/go.js';
import * as SCENE from '../scene/scene.js';
import * as F from '../model/frames.js';
import { t, typeName } from '../strings.js';
import { esc } from '../util.js';

/** @typedef {import('../links/links.js').Shown} Shown */
/** @typedef {import('../model/pump.js').Lineage} Lineage */
/** @typedef {import('../model/frames.js').Claim} Claim */

/** the first words of a passage: from the model where delivered, else one read */
async function fragment(/** @type {string} */ addr, /** @type {number | null} */ pos, /** @type {number} */ width) {
  if (REC.doc(addr).refused === 'unregistered') return null;
  if (pos == null) { const p = REC.place(addr); return p && p.label ? p.label : REC.textBetween(addr, 1, 80) || null; }
  const held = REC.textBetween(addr, pos, pos + Math.min(width, 120));
  if (held) return held;
  const out = await PUMP.read(F.retrieveV(addr, pos, Math.min(width, 120)));
  if ('refused' in out) return null;
  const runs = F.decodeDelivery(out.answer, pos);
  return runs.map((r) => (r.kind === 'content' ? r.text : r.kind === 'withheld' ? `[withheld · ${r.width}]` : '')).join('');
}

/**
 * The lineage's rows (B1-S5): "superseded by" names the `new` of each claim
 * whose `old` is the link, "supersedes" the `old` of each claim whose `new`
 * is it, in the answer's order, a retracted claim's address followed by
 * "retracted"; a side that answered no claim reads "none"; a side whose read
 * was refused draws no row. Neither row holds a control.
 * @param {Lineage} lineage
 * @returns {string}
 */
export function supersessionRows(lineage) {
  return lineageRow('F.card.superseded-by', lineage.supersededBy, (c) => c.new) + lineageRow('F.card.supersedes', lineage.supersedes, (c) => c.old);
}

/**
 * @param {string} label the row's string
 * @param {Claim[] | null} claims
 * @param {(c: Claim) => string} named the address a claim names on this side
 */
function lineageRow(label, claims, named) {
  if (!claims) return '';
  const value = claims.length
    ? claims.map((c) => `<span class="code">${esc(named(c))}</span>${c.active ? '' : ` · <span data-string="F.card.retracted">${esc(t('F.card.retracted'))}</span>`}`).join(', ')
    : `<span data-string="F.card.none">${esc(t('F.card.none'))}</span>`;
  return `<div class="kv lineage"><b>${esc(t(label))}</b> ${value}</div>`;
}

/**
 * Open the card for a drawn link: its near end the document it is drawn at
 * (`s.near`), its far end the other.
 * @param {Shown} s
 * @param {HTMLElement | null} anchorEl the element it stands at; null stands it at the link's own bytes in the near document
 * @param {boolean} [byKey] a key opened it: the card takes the focus on its first act
 * @returns {Promise<void>} settled once the card shows, or nothing will
 */
export function open(s, anchorEl, byKey = false) {
  const l = s.link;
  const near = s.near, nearPos = s.pos, nearWidth = s.width;
  const far = s.far, farEnd = s.farEnd;
  return HOST.opening(() => Promise.all([
    fragment(near, nearPos, nearWidth),
    far ? fragment(far, farEnd && !farEnd.whole ? farEnd.ordinal : null, farEnd && farEnd.positions ? farEnd.positions : 80) : Promise.resolve(null),
    PUMP.lineage(l.addr),
  ]), ([nearText, farText, lineage]) => {
    const mark = LK.markOf(l, near);
    const homePlace = REC.place(l.home);
    const homeDoc = REC.doc(l.home);
    const homePublished = homeDoc.meta ? homeDoc.meta.published : homePlace ? homePlace.kind === 'edition' : true;
    const dead = far && REC.doc(far).refused === 'unregistered';
    const farWords = far ? (dead ? t('B1.doc_not_registered', { address: far }) : farText ?? '…') : t('B1.invalid');
    const nearWords = nearText ?? '…';
    const fromDoc = l.from[0] ? l.from[0].doc || l.from[0].account || '' : '';
    const toDoc = l.to[0] ? l.to[0].doc || l.to[0].account || '' : '';
    const html =
      `<span class="label" style="--mark-hue:${mark.hue}"><span class="sym-mark">⟡</span> ${esc(l.addr)}</span>` +
      `<div class="ends"><div class="end far"><span class="k">${esc(s.end === 'from' ? t('F.card.to') : t('F.card.from'))}</span> <span class="code">${esc(far || '—')}</span><div class="quoted">${esc(farWords)}</div></div>` +
      `<div class="end near"><span class="k">${esc(s.end === 'from' ? t('F.card.from') : t('F.card.to'))}</span> <span class="code">${esc(near)}</span>${nearPos != null ? ` <span class="dim">${esc(t('L.at-position', { p: nearPos }))}</span>` : ''}<div class="quoted">${esc(nearWords)}</div></div></div>` +
      `<div class="kv"><b>${esc(t('F.card.type'))}</b> <span data-string="R5.undocumented">${esc(typeName(l.type))}</span></div>` +
      `<div class="kv"><b>${esc(t('F.card.from'))}</b> <span class="code">${esc(fromDoc)}</span></div>` +
      `<div class="kv"><b>${esc(t('F.card.to'))}</b> <span class="code">${esc(toDoc)}</span></div>` +
      `<div class="kv"><b>${esc(t('F.card.home'))}</b> <span class="code">${esc(l.home)}</span> — ${esc(homePublished ? t('F.card.public') : t('F.card.hidden'))}</div>` +
      `<div class="kv"><b>${esc(t('F.card.owner'))}</b> ${esc(l.owner || '—')}</div>` +
      supersessionRows(lineage) +
      `<div class="acts"><button data-run="follow">${esc(t('B1.follow'))} → ${esc(far || '')}</button><button data-run="beside" ${dead || !far ? 'class="inert"' : ''}>${esc(t('B1.side-by-side'))}</button></div>`;
    HOST.show({
      kind: 'card', id: 'anatomy:' + l.addr, anchor: anchorEl ? { el: anchorEl } : { span: { addr: near, pos: nearPos, width: nearWidth } }, html, takeFocus: byKey,
      acts: {
        follow: (el, byKey) => GO.follow(s, el, byKey),
        beside: () => { if (far && !dead) SCENE.open(near, far, { posA: nearPos, widthA: nearWidth, posB: farEnd && !farEnd.whole ? farEnd.ordinal : null }); },
      },
    });
  });
}
