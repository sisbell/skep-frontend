// O-VERSIONS — the members' list (the structure record §3.2; foundations
// §2.1's version row; F2.1-e). Layer 2. ENGINE-BOUND. State: none. On the
// corner's act — a click on its version statement, or Enter at the corner
// (D5 K-57), both through `fromCorner`: the chain's members `D.1 … D.n`,
// every one M-PUMP's probe of the chain read (`probeChain`, to the chain's
// end), each read act a version move that lands in place (N-GO's
// `toVersion`; FP-22), carrying the passage held, re-projected into the
// member and kept on its screen line there — the held passage: the selection
// where it stands in the corner's document, else the first span in view, the
// first block whose box meets the visible view (foundations §2.3); asked by a
// position alone, the block holding it, whole; else the document's first
// block — always held in the version the list was opened for, the one its
// box shows, whether the plain address or a pinned version (`open`'s
// document): its blocks, its positions, `compare`d from it into each member
// over that member's own extent, one span read per member made for its row
// and kept nowhere (§2.1's version row; A-39), in parts where the board
// refuses it for its size, and marked by the one rule a landing reads
// (BM-HELD's, through N-GO's `heldIn`; FP-21): whole, all of it in pieces,
// in part, not at all, or couldn't tell, by the refusal met — its landing
// naming the passage as the selection where it is one — and each offering
// "read side by side", the scene opened on the held passage, which SC sets
// level with what the member holds of it — a step on the trail from that
// passage, at the list's place (N-GO's `toScene`). Each member is one row: its acts,
// its date and its mark in columns the rows share. A row's date is the day
// its member was published, the commit that minted it, from the age a
// `doc_metadata` of the member answered — held where a read of the member
// answered it, a probe of the chain among them (M-REC's `memberAge`), else
// asked in the list's own reads (M-PUMP's `ageOf`) — in the page's one form
// of a date (ST's `dated`): "not recorded" where the board
// holds no reading, "board unreachable" where the board did not answer that
// read, the row asking the member nothing more and that one cause said once
// across its date and its mark, and "not read" where the board refused it.
// "Published" is said once, over the dates, at the list's head.
// The open end says whether the board ended the chain there. Where the board
// answered that no member follows the last read, the head's row carries the
// latest version's mark — a shape, named in words for assistive technology —
// and the caption counts the chain, "version ⟨k⟩ of ⟨n⟩". Where it did not,
// nothing the list draws claims to be the whole chain: no count in the
// caption — the version a pinned box shows named alone, the bare address
// read without a number, for its text is the head and the head is not known —
// and no mark; past the members read stand the members the page knows exist
// all the same, each "not read" once across its date and what it holds of
// the passage, for a blank there would read as "no": every member up to the
// version being read, and up to the highest a held feed row names (M-REC's
// `feedMember`), for each `D.k+1` is minted against `D.k`; and one line
// stands at the open end, in the list's own type: how far the probe read and
// that the list is not known to be complete — "then the board stopped
// answering" where the board did not answer, the line never claiming more
// versions or none — dated "as last read ⟨when⟩" where it lists members the
// feed named (the newest held row's commit time, M-REC's `feedTime`), and
// offering "try again" where a retry may answer otherwise (BM-HELD's
// `retries`). "Try again" is an opening of its own (O-HOST's `opening`): it
// goes on from the members read, reads the rows the board did not answer or
// did not reach, keeps every row it told, and shows the list again in its
// place, the line gone once the end is proved. Nothing goes on by itself, and
// no refusal's face stands for a board that refused nothing.
// It stands at the act's site, which the act that opens it hands in (O-HOST's
// anchor; foundations §3.1): opened by the corner's act, beneath the version
// statement, and at the document's box, on the left where the corner stands,
// once T-LAYER rewrites the corner or takes it down; opened by a floating
// end's face (O-FACES' `floating`), where the face stood, at the head landed
// on, and following it as the camera moves. The list takes the focus where a
// key made the act — Enter at the corner — on its current member's read act,
// and never where a click on the statement did (D5 §4 rule 4; the focus
// record's rules 13 and 16); shown again by its own "try again", the focus
// stays on the control bearing the same act, else goes to its first (rule
// 11). It opens on its reads (O-HOST's `opening`): where an act was made on
// the chrome while they read, nothing shows, and no member is asked about
// after it.
// Rules: FP-1, FP-2, FP-13, FP-20, FP-21, FP-22, FP-34.

import * as HOST from './host.js';
import * as PUMP from '../model/pump.js';
import * as REC from '../model/records.js';
import * as GO from '../nav/go.js';
import * as LAYER from '../text/layer.js';
import * as LINE from '../line/line.js';
import { whyOf, retries } from '../beams/held.js';
import { visibleView } from '../plane/camera.js';
import { docBox } from '../plane/projection.js';
import { versionAddress, memberOf, documentOf } from '../model/address.js';
import { t, addressedHTML, dated } from '../strings.js';
import { esc, dayOf } from '../util.js';

/** @typedef {import('./host.js').Anchor} Anchor */
/** @typedef {import('../model/pump.js').Chain} Chain */
/** @typedef {import('../bridge/shapes').Refusal} Refusal */

/**
 * @typedef {Object} Row — a member's row: when it was published, and what its text holds of the passage held
 * @property {number} k the member
 * @property {{age: import('../model/frames.js').Age} | {refused: Refusal | null} | null} date its age as the board answered it (M-PUMP's `ageOf`), or the refusal its read met — null where the answer told none; null itself where it was not read, a member past the ones the probe read
 * @property {import('../beams/held.js').Holds | 'unknown' | 'unread' | null} holds all of it in one piece, in pieces, part, none; couldn't tell; not read — a member past the ones the probe read; null where no passage is held
 * @property {number} places the stretches of its text holding it
 * @property {string | null} why couldn't tell: the id of its reason's words (BM-HELD's `whyOf`)
 * @property {boolean} again a read of the row met a refusal a retry may answer otherwise (BM-HELD's `retries`): read again at "try again"
 */

/**
 * @typedef {Object} Listing — what the list is made from (see the head)
 * @property {string} trunk the document whose chain it lists
 * @property {string} addr the version the passage is held in
 * @property {{pos: number, width: number} | null} held the passage held; null where that version holds no block
 * @property {Chain} chain the chain as its probe read it: its members, and whether the board ended it there
 * @property {Row[]} rows each member read, in order, then each one known past them, not read
 */

/** a row that could not tell what its text holds, by the refusal met: read again at "try again" where that refusal, or its date's, may answer otherwise */
const unknownRow = (/** @type {Row} */ row, /** @type {Refusal} */ r) => /** @type {Row} */ ({ ...row, holds: 'unknown', places: 0, why: whyOf(r), again: row.again || retries(r) });

/** did the board not answer a row's date's read (see the head)? */
const dateUnanswered = (/** @type {Row['date']} */ date) => !!date && 'refused' in date && !!date.refused && date.refused.kind === 'unreachable';

/**
 * A member's row (see the head): its age, the one the model holds (M-REC's
 * `memberAge`) taken at once, so a row's reads begin in the act, else read
 * (M-PUMP's `ageOf`); then, where a passage is held, what its text holds of
 * it — its own content extent read for the row and kept nowhere (M-PUMP's
 * `extentOf`), then the passage `compare`d into it by the one rule a landing
 * reads (N-GO's `heldIn`), in parts where the board refuses it for its size —
 * couldn't tell, by the refusal met, where no answer told, and by the board
 * not answering, asking nothing, where it did not answer the age; null,
 * asking no more, where the opening no longer stands.
 * @param {string} trunk
 * @param {string} at the version the passage is held in
 * @param {{pos: number, width: number} | null} held
 * @param {number} k
 * @param {() => boolean} stands
 * @returns {Promise<Row | null>}
 */
async function rowOf(trunk, at, held, k, stands) {
  const member = versionAddress(trunk, k), known = REC.memberAge(member);
  const date = known ? { age: known } : await PUMP.ageOf(member);
  if (!stands()) return null;
  /** @type {Row} */
  const row = { k, date, holds: null, places: 0, why: null, again: 'refused' in date && retries(date.refused) };
  if (!held) return row;
  if ('refused' in date && dateUnanswered(date)) return unknownRow(row, /** @type {Refusal} */ (date.refused));
  const e = await PUMP.extentOf(member);
  if (!stands()) return null;
  if (!('extent' in e)) return unknownRow(row, e.refused);
  const h = await GO.heldIn({ addr: at, pos: held.pos, width: held.width }, member, e.extent);
  if (!('held' in h)) return unknownRow(row, h.refused);
  return { ...row, holds: h.held.holds, places: h.held.places };
}

/** a row's strip, in words: whole, all of it in pieces, in part, not at all, couldn't tell, not read; nothing where no passage is held */
function stripOf(/** @type {Row} */ r) {
  if (r.holds === 'all') return t('F.versions.whole');
  if (r.holds === 'pieces') return t('L.versions.pieces', { n: r.places });
  if (r.holds === 'part') return t('F.versions.part');
  if (r.holds === 'none') return t('F.versions.none');
  if (r.holds === 'unknown') return t('L.versions.unknown', { reason: t(r.why || 'L.held.why.other') });
  if (r.holds === 'unread') return t('L.versions.not-read');
  return '';
}

/** a row's date, in words (see the head): the day its member was published (ST's `dated`); "board unreachable" where the board did not answer its read, else "not read" */
function dateOf(/** @type {Row} */ r) {
  if (r.date && 'age' in r.date) return dated(r.date.age);
  return t(dateUnanswered(r.date) ? 'F.daemon.unreachable' : 'L.versions.not-read');
}

/**
 * A row's date and its mark of what it holds, as the list sets them (see the
 * head): one cell across both where one cause left both empty — a member past
 * the ones read, "not read"; the board not answering its date's read,
 * "board unreachable" — else each in its own column.
 * @param {Row} r
 * @returns {string}
 */
function cellsOf(r) {
  if (r.holds === 'unread') return `<span class="strip across" data-holds="unread">${esc(t('L.versions.not-read'))}</span>`;
  if (r.holds === 'unknown' && dateUnanswered(r.date)) return `<span class="strip across" data-holds="unknown">${esc(t('F.daemon.unreachable'))}</span>`;
  return `<span class="date">${esc(dateOf(r))}</span> <span class="strip" data-holds="${r.holds === 'all' ? 'whole' : r.holds || ''}">${esc(stripOf(r))}</span>`;
}

/** the two passages held the same: a row read for one tells of the other */
const sameHeld = (/** @type {{pos: number, width: number} | null} */ a, /** @type {{pos: number, width: number} | null} */ b) => (a && b ? a.pos === b.pos && a.width === b.width : a === b);

/**
 * The list's reads (see the head): the document read whole where the page
 * holds no extent of it, and the version named where it is another and the
 * page holds none of its text; the chain's end where the record holds it,
 * read at once (`heldChain`), so the rows' reads begin in the act, else the
 * chain probed (`probeChain`), past the members the listing before it read,
 * where one is handed in; the passage held in the version named; each
 * member's row, its date and what it holds — the row the listing before it
 * told, for the same passage, where it told one, else read (`rowOf`); then,
 * where the board did not end the chain there, every member known past the
 * ones read: up to the version being read, and up to the highest a held feed
 * row names, each not read. Null, asking no more, where the opening no
 * longer stands.
 * @param {string} addr the version the list holds the passage in
 * @param {number | null} pos the held passage's first position in it, or null for its first block
 * @param {number | null} width the held passage's positions; null holds the block at `pos` whole
 * @param {() => boolean} stands
 * @param {Listing | null} last the listing shown before, whose "try again" asks these reads
 * @returns {Promise<Listing | null>}
 */
async function listed(addr, pos, width, stands, last) {
  const trunk = documentOf(addr) || addr;
  const d = REC.doc(trunk), v = REC.doc(addr);
  if (d.extent == null) await PUMP.loadWhole(trunk);
  if (v !== d && (v.extent == null || v.from < 0)) await PUMP.loadWhole(addr);
  const chain = PUMP.heldChain(trunk) || await PUMP.probeChain(trunk, stands, last ? last.chain.n : 0);
  if (!chain) return null;
  /** the passage held, in the version named: the span named; the block holding `pos`, whole; else the first block */
  const holding = pos != null ? v.blocks.find((b) => pos >= b.pos && pos < b.pos + b.width) : v.blocks[0];
  /** @type {{pos: number, width: number} | null} */
  const held = pos != null && width != null && width > 0 ? { pos, width } : holding ? { pos: holding.pos, width: Math.max(1, holding.width) } : null;
  const told = last && sameHeld(last.held, held) ? last.rows.filter((r) => r.holds !== 'unread' && !r.again) : [];
  /** @type {Row[]} */
  const rows = [];
  for (let k = 1; k <= chain.n; k++) {
    if (!stands()) return null;
    const row = told.find((r) => r.k === k) || await rowOf(trunk, addr, held, k, stands);
    if (!row) return null;
    rows.push(row);
  }
  if (!chain.ended) {
    const known = Math.max(memberOf(addr) ?? 0, REC.feedMember(trunk) ?? 0);
    for (let k = chain.n + 1; k <= known; k++) rows.push({ k, date: null, holds: 'unread', places: 0, why: null, again: false });
  }
  return { trunk, addr, held, chain, rows };
}

/**
 * The line at the list's open end where the board did not end the chain
 * there (see the head): how far the probe read and that the list is not known
 * to be complete, "then the board stopped answering" where the board did not
 * answer; dated where the list names members the feed named past the ones
 * read; and whether it offers "try again" — where a retry may answer
 * otherwise. Null where the board ended the chain.
 * @param {Listing} l
 * @returns {{id: string, text: string, asOf: string | null, again: boolean} | null}
 */
function openEnd(l) {
  const c = l.chain;
  if (c.ended) return null;
  const silent = !!c.met && c.met.kind === 'unreachable';
  const id = silent ? (c.n ? 'L.versions.cut' : 'L.versions.cut.none') : c.n ? 'L.versions.open' : 'L.versions.open.none';
  const named = REC.feedMember(l.trunk), when = REC.feedTime();
  const asOf = named != null && named > c.n && when != null ? t('L.versions.as-of', { when: dayOf(when) }) : null;
  return { id, text: t(id, { k: c.n }), asOf, again: retries(c.met) };
}

/**
 * The list's caption (see the head): the document, then "version ⟨k⟩ of
 * ⟨n⟩" where the board ended the chain at a member; else the version a
 * pinned box shows, named alone; else nothing more.
 * @param {Listing} l
 */
function captionOf(l) {
  const cur = memberOf(l.addr);
  if (l.chain.ended && l.chain.n >= 1) return `${l.trunk} · ${t('F.version-of', { k: cur || l.chain.n, n: l.chain.n })}`;
  return cur != null ? `${l.trunk} · ${t('L.version', { k: cur })}` : l.trunk;
}

/**
 * The list shown from its reads (see the head), at its anchor, under its
 * document's id — so its own "try again" shows it again in its place: its
 * caption, the document's address in the identifier's face (ST's
 * `addressedHTML`); "published" over the dates; each row its read act, the
 * head's carrying the latest version's mark where the board ended the chain
 * there, its date and its strip (`cellsOf`) and its side-by-side act; the
 * open end's line beneath, where the chain was not ended.
 * @param {Listing} l
 * @param {Anchor | null} anchor
 * @param {number | null} pos
 * @param {number | null} width
 * @param {boolean} byKey
 */
function showList(l, anchor, pos, width, byKey) {
  const { trunk, addr, held, chain, rows } = l;
  const cur = memberOf(addr), end = openEnd(l);
  const latest = `<span class="latest" role="img" aria-label="${esc(t('L.versions.latest'))}" data-string="L.versions.latest-mark">${esc(t('L.versions.latest-mark'))}</span>`;
  /** "published" once, over the dates, at the list's head */
  const head = rows.length ? `<li class="head"><span data-string="F.published">${esc(t('F.published'))}</span></li>` : '';
  const html = `<span class="label">${addressedHTML(captionOf(l))}</span>` +
    `<ul class="rows versions">${head}${rows.map((r) => `<li><button data-run="read${r.k}" aria-current="${cur === r.k}">${esc(t('F.versions.read', { k: r.k }))}${chain.ended && r.k === chain.n ? ' ' + latest : ''}</button> ${cellsOf(r)} <button data-run="beside${r.k}">${esc(t('B1.side-by-side'))}</button></li>`).join('')}</ul>` +
    (end ? `<div class="open-end"><span data-string="${esc(end.id)}">${esc(end.text)}</span>${end.asOf ? ` · <span data-string="L.versions.as-of">${esc(end.asOf)}</span>` : ''}${end.again ? ` · <button data-run="again">${esc(t('B1.try-again'))}</button>` : ''}</div>` : '');
  /** @type {Record<string, import('./host.js').Act>} */
  const acts = {};
  /** where a member's version move is made, as data: the list's own place — its span, else its world point — where its reading face stands (N-GO) */
  const site = anchor && anchor.span ? { span: anchor.span } : anchor && anchor.world ? { world: anchor.world } : null;
  /** the passage held is the reader's selection — a width named — which the landing's line names so (FP-21), the move ending it with the text it stood in */
  const selected = pos != null && width != null && width > 0;
  for (const r of rows) {
    acts['read' + r.k] = (_el, byKey) => GO.toVersion(versionAddress(trunk, r.k), { carry: held ? { addr, pos: held.pos, width: held.width, selected } : null, byKey, site });
    acts['beside' + r.k] = () => GO.toScene(addr, versionAddress(trunk, r.k), { posA: held ? held.pos : null, widthA: held ? held.width : null, posB: null }, { from: held ? { passage: { addr, pos: held.pos, width: held.width } } : null, site });
  }
  if (end && end.again) acts.again = (_el, byKey) => { void HOST.opening((stands) => listed(addr, pos, width, stands, l), (next) => showList(next, anchor, pos, width, byKey)); };
  HOST.show({ kind: 'list', id: 'versions:' + trunk, anchor, html, acts, takeFocus: byKey, first: '[data-run][aria-current="true"]' });
}

/**
 * Open the list for a document — its chain its document's, a version's
 * address answering its document's members, the passage held in the version
 * named (see the head).
 * @param {string} addr the version the list holds the passage in: the plain address, or a pinned version's
 * @param {number | null} pos the held passage's first position in it, or null for its first block
 * @param {Anchor | null} anchor where the list stands, the act's site (O-HOST's anchor): the corner's version statement, the document's box beside it (`fromCorner`); a floating end's face's place, the head landed on (O-FACES' `floating`); null where the act was made at no place
 * @param {number | null} [width] the held passage's positions; null holds the block at `pos` whole
 * @param {boolean} [byKey] a key made the act: the list takes the focus on its current member
 * @returns {Promise<void>} settled once the list shows, or nothing will
 */
export function open(addr, pos, anchor, width = null, byKey = false) {
  return HOST.opening((stands) => listed(addr, pos, width, stands, null), (l) => showList(l, anchor, pos, width, byKey));
}

/**
 * The first span in view of a mounted document (foundations §2.3; §3.2's
 * anchor): the first of its blocks whose box, as its article lays it out,
 * meets the visible view — the viewport below the one line; null where none
 * does.
 * @param {string} addr
 * @returns {import('../model/records.js').Block | null}
 */
function firstInView(addr) {
  const seen = visibleView(LINE.bottom());
  const meets = (/** @type {{x: number, y: number, w: number, h: number}} */ r) => r.w > 0 && r.h > 0 && r.x < seen.x + seen.w && seen.x < r.x + r.w && r.y < seen.y + seen.h && seen.y < r.y + r.h;
  return REC.doc(addr).blocks.find((b) => (LAYER.spanRects(addr, b.pos) || []).some(meets)) || null;
}

/**
 * The corner's act (D5 K-57), the one a click on the version statement and
 * Enter at the corner both take: the list for the corner's document, standing
 * beneath the statement while it stands in the page, and at the document's
 * box — its top-left, the side the corner stands on — once T-LAYER rewrites
 * the corner or takes it down, holding the selection where it stands in that
 * document, else the first span in view, whole. A corner with no version
 * statement — a draft's, whose chip's list is a later lane's — has no act.
 * @param {HTMLElement} corner the corner's element (`data-corner` names its document)
 * @param {{addr: string, pos: number, width: number} | null} selection the selection, wherever it stands
 * @param {boolean} [byKey] a key made the act (Enter at the corner): the list takes the focus
 * @returns {boolean} whether the corner had the act
 */
export function fromCorner(corner, selection, byKey = false) {
  const addr = corner.dataset.corner || '';
  const statement = /** @type {HTMLElement | null} */ (corner.querySelector('.version'));
  if (!addr || !statement) return false;
  const held = selection && selection.addr === addr ? selection : null;
  const inView = held ? null : firstInView(addr);
  const box = docBox(documentOf(addr) || addr);
  void open(addr, held ? held.pos : inView ? inView.pos : null, { el: statement, world: { x: box.x, y: box.y } }, held ? held.width : null, byKey);
  return true;
}
