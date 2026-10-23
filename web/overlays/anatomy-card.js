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
// one whose text holds only part of its passage, all of it in pieces, or one
// the board would not tell of, says so beneath its words in BM-HELD's line
// (BM-HELD's `farHolds`; issue #153's design decision: "where a read knows the
// state before departure … say it there too"),
// and one no passage's words place reads the words its tail and its mirror
// item carry (LK's `farWords`; issue #132): "nothing this board will say
// about this address", "withheld · ⟨owner⟩", the document's first line, so
// the reader knows what a follow will meet before making it
// — then its anatomy — type
// (R5's form where the commons documents none: on this notebook no registry
// document is seeded, so every type reads "undocumented here"), from, to,
// home (published → the link is public; a draft → hidden with its home),
// owner (never a name alone), then its lineage (A-56, A-57, A-82), read
// under the audit view (M-PUMP's `lineage`), so a retracted claim stands,
// marked "retracted", wherever it falls. THE LINEAGE IS THE CLAIMS WITH
// AUTHORITY (issue #143's design decision; `hasAuthority`): a claim's
// claimant, the account of its home, owns the link it declares superseded,
// the account of `old`'s own address — `old`'s on both sides, for on a
// "supersedes" row this link is `new`, whose owner does not decide. A
// supersession claim homes wherever its author chose (wire.md §Links
// (writes): a deposit needs its home's owner alone), so a stranger can claim
// another's link superseded, and the reads answer every claim whose home the
// reader may read. "superseded by" names the `new` of each such claim whose
// `old` is this link, "supersedes" the `old` of each such claim whose `new`
// is it, and a claimant the owner row does not name follows its claim ("—
// by its owner, ⟨claimant⟩": another account marked its own link superseded
// by this one); a side that answered no such claim reads B1-S5's "none", and
// a side whose read was refused draws no row, for nothing was learned of it.
// Every other claim stands behind one line after the rows, no number in it,
// "other accounts' claims — show them", whose act opens them in its place,
// each an assertion naming its claimant — "you" for the reader — and, in
// words, what the claimant is to the links: this link's owner, an account
// above or under the superseded link's owner. Position and wording carry
// authority, never colour alone. Its acts follow either end and open the
// scene.
// B1-S5's age row is not drawn: the age (the commit's position and time,
// from the feed) is not held for a link older than this page's feed, which
// starts at the head — and a row standing with no value would read as
// B1-S5's "none". The link's mark comes from LK's `markOf`, so the card and
// the symbol agree. The card takes the focus on its first act — follow, the
// line standing before it — where a key opened it (Enter at the link's
// element, K-55; a links-card row's Enter) and never where a click did (D5
// §4 rule 4; the focus record's rule 16); the line's act rebuilds it, a
// focus held on the line going to its first control (rule 11). It opens on
// its reads, the ends' words and the lineage (O-HOST's `opening`), the opening
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
// Carries: the wireframe's §18 `anatomyCard`. Rules: FP-1, FP-2, FP-13, FP-20, FP-21.

import * as HOST from './host.js';
import * as PUMP from '../model/pump.js';
import * as REC from '../model/records.js';
import * as LK from '../links/links.js';
import * as GO from '../nav/go.js';
import * as SCENE from '../scene/scene.js';
import * as F from '../model/frames.js';
import { lineOf, farHolds } from '../beams/held.js';
import { t, typeName } from '../strings.js';
import { esc, fill } from '../util.js';
import { accountOf, isUnder } from '../model/address.js';

/** @typedef {import('../links/links.js').Shown} Shown */
/** @typedef {import('../model/pump.js').Lineage} Lineage */
/** @typedef {import('../model/frames.js').Claim} Claim */
/** @typedef {[string | null, {runs: Array<{pos: number, width: number}> | null, words: string | null}, Lineage]} Read what the card is made from: the near end's words, where the far end's passage stands and its words, the link's lineage */

/**
 * @typedef {Object} Who — the accounts the lineage's claims are named against (issue #143's design decision)
 * @property {string | null} owner this link's owner: the account the card's owner row names
 * @property {string | null} reader the reader's account, named "you" wherever it is a claimant; null for a guest
 */

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

/** the account that made a supersession claim: the account of its home, the document the claim resides in, whose owner alone may deposit it there (wire.md §Links (writes)) — the home as given where its address names no account */
const claimantOf = (/** @type {Claim} */ c) => accountOf(c.home) || c.home;

/**
 * Has a supersession claim authority (issue #143's design decision)? Its
 * claimant (`claimantOf`) owns the link it declares superseded: the account
 * of `old`'s own address. The test is `old`'s on both sides of the card —
 * on a "supersedes" row this link is `new`, and its owner does not decide.
 * @param {Claim} c
 * @returns {boolean}
 */
export function hasAuthority(c) { return claimantOf(c) === accountOf(c.old); }

/**
 * @typedef {Object} Side — one side of the lineage on the card
 * @property {string} row its row's label
 * @property {string} says the assertion each of its claims makes in the list; its `.you` form where the reader is the claimant
 * @property {(c: Claim) => string} named the address a claim names on this side: the link superseding this one, or the link this one supersedes
 * @property {Claim[] | null} claims the claims its read answered, in the answer's order; null where the read was refused
 */

/**
 * The lineage (B1-S5; A-56, A-57, A-82; issue #143's design decision). The
 * rows draw the claims with authority (`hasAuthority`): "superseded by" the
 * `new` of each claim whose `old` is the link, "supersedes" the `old` of each
 * claim whose `new` is it, in the answer's order, each followed by its
 * claimant where the owner row does not name it ("— by its owner,
 * ⟨claimant⟩") and by "retracted" where it was retracted; the claims of a row
 * part at ", ", or at "; " where a claimant is named among them, for the
 * naming holds a comma; a side that answered no claim with authority reads
 * "none", and a side whose read was refused draws no row. Neither row holds
 * a control. Every other claim of either side stands behind one line after
 * the rows (`othersLine`), or, the line's act made, in its place
 * (`othersList`).
 * @param {Lineage} lineage
 * @param {Who} who
 * @param {boolean} [others] the line's act made: the claims without authority listed in its place
 * @returns {string}
 */
export function supersessionRows(lineage, who, others = false) {
  /** @type {Side[]} */
  const sides = [
    { row: 'F.card.superseded-by', says: 'L.card.claims.superseded-by', named: (c) => c.new, claims: lineage.supersededBy },
    { row: 'F.card.supersedes', says: 'L.card.claims.supersedes', named: (c) => c.old, claims: lineage.supersedes },
  ];
  const stray = sides.flatMap((side) => (side.claims || []).filter((c) => !hasAuthority(c)).map((c) => ({ side, c })));
  return sides.map((side) => lineageRow(side, who)).join('') + (!stray.length ? '' : others ? othersList(stray, who) : othersLine());
}

/**
 * One side's row: each of its claims with authority, by the address it
 * names, its claimant after it where the owner row does not name it.
 * @param {Side} side
 * @param {Who} who
 */
function lineageRow(side, who) {
  if (!side.claims) return '';
  const held = side.claims.filter(hasAuthority);
  /** each claim's claimant, where the owner row does not name it; null where it does */
  const byWhom = held.map((c) => (claimantOf(c) === who.owner ? null : claimantOf(c)));
  const items = held.map((c, i) => {
    const by = byWhom[i];
    return `<span class="code">${esc(side.named(c))}</span>${by == null ? '' : ` <span data-string="L.card.by-owner">${words('L.card.by-owner', { claimant: claimantHTML(by, who) })}</span>`}${retracted(c)}`;
  });
  const value = items.length ? items.join(byWhom.some((by) => by != null) ? '; ' : ', ') : `<span data-string="F.card.none">${esc(t('F.card.none'))}</span>`;
  return `<div class="kv lineage"><b>${esc(t(side.row))}</b> ${value}</div>`;
}

/** the line the claims without authority stand behind: no number in it, its act opening them in its place */
const othersLine = () => `<div class="claims"><button data-run="claims" data-string="L.card.others">${esc(t('L.card.others'))}</button></div>`;

/**
 * The claims without authority, in the line's place: the superseded-by
 * side's first, each side's in the answer's order, each an assertion naming
 * its claimant — "you" for the reader, the verb agreeing — and, in words
 * after it, what the claimant is to the links, each that holds: this link's
 * owner; an account above or under the superseded link's owner (L10:
 * hierarchy is prefix), never that owner itself, whose claim has authority.
 * @param {Array<{side: Side, c: Claim}>} stray
 * @param {Who} who
 */
function othersList(stray, who) {
  return `<ul class="rows claims">${stray.map(({ side, c }) => {
    const by = claimantOf(c), owner = accountOf(c.old);
    /** @type {string[]} */
    const relations = [];
    if (by === who.owner) relations.push('L.card.this-owner');
    if (owner && isUnder(by, owner)) relations.push('L.card.above');
    else if (owner && isUnder(owner, by)) relations.push('L.card.under');
    const id = by === who.reader ? side.says + '.you' : side.says;
    return `<li data-string="${id}">${words(id, { claimant: claimantHTML(by, who, relations), link: `<span class="code">${esc(side.named(c))}</span>` })}${retracted(c)}</li>`;
  }).join('')}</ul>`;
}

/**
 * A claimant as the card names accounts — its account, or "you" for the
 * reader — and, where the list says them, what it is to the links, in words
 * after it.
 * @param {string} account
 * @param {Who} who
 * @param {string[]} [relations] the strings of what the claimant is to the links
 */
function claimantHTML(account, who, relations = []) {
  const name = account === who.reader ? esc(t('L.card.you')) : `<span class="code">${esc(account)}</span>`;
  return relations.length ? `${name} (${relations.map((id) => esc(t(id))).join(', ')})` : name;
}

/** a retracted claim's mark, after it: the audit view answers it, `active` false (A-82) */
const retracted = (/** @type {Claim} */ c) => (c.active ? '' : ` · <span data-string="F.card.retracted">${esc(t('F.card.retracted'))}</span>`);

/** a string's words, escaped, its ⟨tokens⟩ filled with the markup given */
const words = (/** @type {string} */ id, /** @type {Record<string, string>} */ html) => fill(esc(t(id)), html);

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
 * tail and its mirror item carry them (LK's `farWords`), else "…" — and
 * beneath them, where its text holds only part of its passage, all of it in
 * pieces, or no answer told, BM-HELD's line (`farHolds`); the
 * lineage's claims named against this link's owner and the reader
 * (`supersessionRows`), and the line's act made from the same reads, the
 * card shown again under its id with the claims behind the line in its place.
 * @param {Shown} s
 * @param {Read} read
 * @param {HTMLElement | null} anchorEl
 * @param {boolean} byKey
 * @param {boolean} [others] the line's act made: the claims behind it listed in its place
 */
function showCard(s, read, anchorEl, byKey, others = false) {
  const [nearText, farEnd, lineage] = read;
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
  const held = far ? farHolds(s) : null;
  const farHeld = held ? `<div class="note" data-string="L.held.${held.state}">${esc(lineOf(held))}</div>` : '';
  const nearQuote = nearText ?? '…';
  const fromDoc = l.from[0] ? l.from[0].doc || l.from[0].account || '' : '';
  const toDoc = l.to[0] ? l.to[0].doc || l.to[0].account || '' : '';
  /** @type {Who} */
  const who = { owner: l.owner, reader: REC.reader().account };
  const html =
    `<span class="label" style="--mark-hue:${mark.hue}"><span class="sym-mark">⟡</span> ${esc(l.addr)}</span>` +
    `<div class="ends"><div class="end far"><span class="k">${esc(s.end === 'from' ? t('F.card.to') : t('F.card.from'))}</span> <span class="code">${esc(far || '—')}</span><div class="quoted">${esc(farQuote)}</div>${farHeld}</div>` +
    `<div class="end near"><span class="k">${esc(s.end === 'from' ? t('F.card.from') : t('F.card.to'))}</span> <span class="code">${esc(near)}</span>${nearPos != null ? ` <span class="dim">${esc(t('L.at-position', { p: nearPos }))}</span>` : ''}<div class="quoted">${esc(nearQuote)}</div></div></div>` +
    `<div class="kv"><b>${esc(t('F.card.type'))}</b> <span data-string="R5.undocumented">${esc(typeName(l.type))}</span></div>` +
    `<div class="kv"><b>${esc(t('F.card.from'))}</b> <span class="code">${esc(fromDoc)}</span></div>` +
    `<div class="kv"><b>${esc(t('F.card.to'))}</b> <span class="code">${esc(toDoc)}</span></div>` +
    `<div class="kv"><b>${esc(t('F.card.home'))}</b> <span class="code">${esc(l.home)}</span> — ${esc(homePublished ? t('F.card.public') : t('F.card.hidden'))}</div>` +
    `<div class="kv"><b>${esc(t('F.card.owner'))}</b> ${esc(l.owner || '—')}</div>` +
    supersessionRows(lineage, who, others) +
    `<div class="acts"><button data-run="follow">${esc(t('B1.follow'))} → ${esc(far || '')}</button><button data-run="beside" ${dead || !far ? 'class="inert"' : ''}>${esc(t('B1.side-by-side'))}</button></div>`;
  HOST.show({
    kind: 'card', id: 'anatomy:' + l.addr, anchor: anchorEl ? { el: anchorEl, span: bytes } : { span: bytes }, html, takeFocus: byKey, first: '[data-run="follow"]',
    acts: {
      follow: (_el, byKey) => GO.follow(s, byKey),
      beside: () => { if (far && !dead) SCENE.open(near, far, { posA: nearPos, widthA: nearWidth, posB: farRuns && farRuns.length ? farRuns[0].pos : null }); },
      claims: () => showCard(s, read, anchorEl, false, true),
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
