// O-ANATOMY — THE ANATOMY CARD (the structure record §3.2 "O-ANATOMY";
// B1-S5; foundations §3.1). Layer 2. ENGINE-BOUND. State: none.
// Conjured at a link's symbol (or at its marked span, the link's own bytes),
// following it as the camera moves, and at the link's own bytes once the text
// layer rebuilds or takes down the article the element it was conjured at
// stood in (O-HOST's anchor): led by each end's passage in words, the
// far end's first (so a click answers with what the link leads to) — the
// near end the document the link is drawn at (LK's `near`), whichever of its
// ends lies there, read where LK places it in that text now, and the far end
// the other, read where `project` answers its passage sits in its document's
// current text now (LK's `farRuns`, asked in the card's own opening where no
// projection is held), never at the position the link stores; a far end that
// floats reads "its passage is not in ⟨D⟩'s current text" (foundations §2.3),
// and one no passage's words place reads the words its tail and its mirror
// item carry (LK's `farWords`; issue #132): "nothing this board will say
// about this address", "withheld · ⟨owner⟩", the document's first line, so
// the reader knows what a follow will meet before making it
// — then its anatomy — type
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
// box opened, the next card asked or shown — nothing shows. A TAIL pressed
// (P-RENDER's, APP-INPUT's; issue #132's design decision: "Tails from one
// passage or box merge into one tail showing their count, which lists them
// when activated") opens on its reads too (`fromTail`): its documents read
// whole first — at mid scale the page holds none of their text — so each link
// stands at its own bytes as LK draws it there; one link's card opens as its
// symbol's would, and several are listed, each row naming its link by its
// type and its far end (LK's `farLabel`) and opening that link's card.
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
/** @typedef {[string | null, {runs: Array<{pos: number, width: number}> | null, words: string | null}, Lineage]} Read what the card is made from: the near end's words, where the far end's passage stands and its words, the link's lineage */

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
 * Where a drawn link's far passage stands in its far document's current
 * text: the projection LK carries (`farRuns`), or, where the model holds
 * none — no answer, nor a refusal — and the far document is not known
 * refused, `project` asked now; null where nothing places it.
 * @param {Shown} s
 * @returns {Promise<Array<{pos: number, width: number}> | null>}
 */
async function farPlace(s) {
  if (!s.farEnd || s.farWhole || REC.projection(s.link.addr, s.farSlot, s.far) !== undefined || REC.doc(s.far).refused) return s.farRuns;
  const p = await PUMP.projectEnd(s.link.addr, s.farSlot, s.far);
  return 'runs' in p ? p.runs : null;
}

/**
 * The far end's passage in words: a passage's first words where it stands
 * now, "its passage is not in ⟨D⟩'s current text" where it floats, the
 * document's first words where the link names it whole; null where nothing
 * places it.
 * @param {Shown} s
 * @param {Array<{pos: number, width: number}> | null} runs where its passage stands now (`farPlace`)
 */
async function farPassage(s, runs) {
  if (s.farWhole) return fragment(s.far, null, 80);
  if (!runs) return null;
  return runs.length ? fragment(s.far, runs[0].pos, runs[0].width) : t('F.floating', { D: s.far });
}

/**
 * The card's reads: the near end's words, where the far end's passage stands
 * now (`farPlace`) and its words, the link's lineage.
 * @param {Shown} s
 * @returns {Promise<Read>}
 */
function cardReads(s) {
  return Promise.all([
    fragment(s.near, s.pos, s.width),
    s.far ? farPlace(s).then(async (runs) => ({ runs, words: await farPassage(s, runs) })) : Promise.resolve({ runs: null, words: null }),
    PUMP.lineage(s.link.addr),
  ]);
}

/**
 * Open the card for a drawn link: its near end the document it is drawn at
 * (`s.near`), where LK places it there, its far end the other, where its
 * passage stands now (`farPlace`).
 * @param {Shown} s
 * @param {HTMLElement | null} anchorEl the element it stands at while that stands in the page, the link's own bytes in the near document beside it; null stands it at those bytes
 * @param {boolean} [byKey] a key opened it: the card takes the focus on its first act
 * @returns {Promise<void>} settled once the card shows, or nothing will
 */
export function open(s, anchorEl, byKey = false) {
  return HOST.opening(() => cardReads(s), (r) => showCard(s, r, anchorEl, byKey));
}

/**
 * The card made from its reads and shown (`open`): the far end's passage in
 * words where its passage's words are placed, else its far end's words as its
 * tail and its mirror item carry them (LK's `farWords`), else "…".
 * @param {Shown} s
 * @param {Read} read
 * @param {HTMLElement | null} anchorEl
 * @param {boolean} byKey
 */
function showCard(s, [nearText, farEnd, lineage], anchorEl, byKey) {
  const l = s.link;
  const near = s.near, nearPos = s.pos, nearWidth = s.width;
  const far = s.far;
  /** the link's own bytes in the near document: where the card stands without its element */
  const bytes = { addr: near, pos: nearPos, width: nearWidth };
  const farText = farEnd.words, farRuns = farEnd.runs;
  const mark = LK.markOf(l, near);
  const homePlace = REC.place(l.home);
  const homeDoc = REC.doc(l.home);
  const homePublished = homeDoc.meta ? homeDoc.meta.published : homePlace ? homePlace.kind === 'edition' : true;
  const dead = far && REC.doc(far).refused === 'unregistered';
  const farQuote = far ? farText ?? (LK.farWords(s) || '…') : t('B1.invalid');
  const nearQuote = nearText ?? '…';
  const fromDoc = l.from[0] ? l.from[0].doc || l.from[0].account || '' : '';
  const toDoc = l.to[0] ? l.to[0].doc || l.to[0].account || '' : '';
  const html =
    `<span class="label" style="--mark-hue:${mark.hue}"><span class="sym-mark">⟡</span> ${esc(l.addr)}</span>` +
    `<div class="ends"><div class="end far"><span class="k">${esc(s.end === 'from' ? t('F.card.to') : t('F.card.from'))}</span> <span class="code">${esc(far || '—')}</span><div class="quoted">${esc(farQuote)}</div></div>` +
    `<div class="end near"><span class="k">${esc(s.end === 'from' ? t('F.card.from') : t('F.card.to'))}</span> <span class="code">${esc(near)}</span>${nearPos != null ? ` <span class="dim">${esc(t('L.at-position', { p: nearPos }))}</span>` : ''}<div class="quoted">${esc(nearQuote)}</div></div></div>` +
    `<div class="kv"><b>${esc(t('F.card.type'))}</b> <span data-string="R5.undocumented">${esc(typeName(l.type))}</span></div>` +
    `<div class="kv"><b>${esc(t('F.card.from'))}</b> <span class="code">${esc(fromDoc)}</span></div>` +
    `<div class="kv"><b>${esc(t('F.card.to'))}</b> <span class="code">${esc(toDoc)}</span></div>` +
    `<div class="kv"><b>${esc(t('F.card.home'))}</b> <span class="code">${esc(l.home)}</span> — ${esc(homePublished ? t('F.card.public') : t('F.card.hidden'))}</div>` +
    `<div class="kv"><b>${esc(t('F.card.owner'))}</b> ${esc(l.owner || '—')}</div>` +
    supersessionRows(lineage) +
    `<div class="acts"><button data-run="follow">${esc(t('B1.follow'))} → ${esc(far || '')}</button><button data-run="beside" ${dead || !far ? 'class="inert"' : ''}>${esc(t('B1.side-by-side'))}</button></div>`;
  HOST.show({
    kind: 'card', id: 'anatomy:' + l.addr, anchor: anchorEl ? { el: anchorEl, span: bytes } : { span: bytes }, html, takeFocus: byKey,
    acts: {
      follow: (_el, byKey) => GO.follow(s, byKey),
      beside: () => { if (far && !dead) SCENE.open(near, far, { posA: nearPos, widthA: nearWidth, posB: farRuns && farRuns.length ? farRuns[0].pos : null }); },
    },
  });
}

/**
 * A tail pressed (see the head): its documents read whole, then the ends of
 * its links as LK draws them at those documents, each link once in the
 * tail's order; one shows its card, as its symbol's would, at its own bytes;
 * several, the list — each row its link's type and its far end named
 * (LK's `farLabel`), opening that link's card — at the tail. Nothing shows
 * where the documents hold none of its links' ends, or an act was made on the
 * chrome while it read.
 * @param {{docs: string[], links: string[], world: {x: number, y: number}}} tail P-RENDER's `DrawnTail`: the documents it leaves, its links, where it leaves in world units
 * @param {boolean} [byKey] a key pressed it: the card or the list takes the focus on its first act
 * @returns {Promise<void>} settled once the card or the list shows, or nothing will
 */
export function fromTail(tail, byKey = false) {
  /** @typedef {{one: Shown, read: Read} | {many: Shown[]}} Pressed its one link's end with the card's reads, or its several ends */
  return HOST.opening(/** @returns {Promise<Pressed | null>} */ async (stands) => {
    for (const d of tail.docs) { if (!stands()) return null; await PUMP.loadWhole(d); }
    /** @type {Map<string, Shown>} */
    const met = new Map();
    for (const d of tail.docs) for (const s of LK.shown(d)) if (tail.links.includes(s.link.addr) && !met.has(s.link.addr)) met.set(s.link.addr, s);
    /** @type {Shown[]} */
    const ends = [];
    for (const l of tail.links) { const s = met.get(l); if (s) ends.push(s); }
    if (!ends.length || !stands()) return null;
    return ends.length === 1 ? { one: ends[0], read: await cardReads(ends[0]) } : { many: ends };
  }, (r) => { if ('one' in r) showCard(r.one, r.read, null, byKey); else listTail(r.many, tail.world, byKey); });
}

/**
 * A tail's links listed (`fromTail`), at the tail: each row its link's type
 * and its far end named in the words its tail carries (LK's `farLabel`), in
 * its mark, opening that link's card as a links-card row does.
 * @param {Shown[]} ends
 * @param {{x: number, y: number}} world where the tail leaves, in world units
 * @param {boolean} byKey
 */
function listTail(ends, world, byKey) {
  const near = [...new Set(ends.map((s) => s.near))].join(', ');
  const html = `<span class="label">${esc(t('B1.see-links'))} · ${esc(near)}</span><ul class="rows">${ends.map((s, i) =>
    `<li><button data-run="t${i}" style="--mark-hue:${s.mark.hue};--mark-value:${s.mark.value}"><span class="sym-mark">⟡</span> ${esc(typeName(s.link.type))} · ${esc(s.end === 'from' ? '→' : '←')} ${esc(LK.farLabel(s))}</button></li>`).join('')}</ul>`;
  /** @type {Record<string, import('./host.js').Act>} */
  const acts = {};
  ends.forEach((s, i) => { acts['t' + i] = (_el, byKey) => open(s, null, byKey); });
  HOST.show({ kind: 'list', id: 'tail', anchor: { world }, html, acts, takeFocus: byKey });
}
