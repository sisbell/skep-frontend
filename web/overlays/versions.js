// O-VERSIONS — the members' list (the structure record §3.2 "O-VERSIONS";
// foundations §2.1's version row; F2.1-e). Layer 2. ENGINE-BOUND. State:
// none. On the corner's act — a click on its version statement, or Enter at
// the corner (D5 K-57), both through `fromCorner`: the chain's members `D.1 …
// D.n`, every one M-PUMP's probe of the chain read (`probeChain`, to the
// chain's end), each read act a VERSION MOVE that lands in place
// (N-GO's `toVersion`; issue #154's design decision: "A version move never
// flies"), carrying the passage held, re-projected into the member and kept
// on its screen line there — the held passage: the selection where it
// stands in the corner's document, else the first span in view, the first
// block whose box meets the visible view (§2.3: "the selection, else the
// first span in view"); asked by a position alone, the block holding it,
// whole; else the document's first block — always held in the version the
// list was opened for, the one its box shows, whether the plain address or a
// pinned version (`open`'s document): its blocks, its positions, `compare`d
// from it into each member over that member's own
// extent, one span read per member made for its row and kept nowhere (§2.1's
// version row; A-39), in parts where the board refuses it for its size, and
// marked by the one rule a landing reads (BM-HELD's, through N-GO's
// `heldIn`; issue #153's design decision: "the version list — say it there
// too"): whole, all of it in pieces, in part, not at all, or couldn't tell,
// by the refusal met — its landing naming the passage as the selection
// where it is one — and each
// offering "read side by side", the scene opened on the held passage, which
// SC sets level with what the member holds of it. Each member is one row: its
// acts and its mark in columns the rows share.
// THE OPEN END SAYS WHETHER THE BOARD ENDED THE CHAIN THERE (issue #184's
// design decision: "keep every member the probe read"). Where the board
// answered that no member follows the last read, the head's row carries the
// latest version's mark — a shape, named in words for assistive technology —
// and the caption counts the chain, "version ⟨k⟩ of ⟨n⟩". Where it did not,
// nothing the list draws claims to be the whole chain: no count in the
// caption — the version a pinned box shows named alone, the bare address
// read without a number, for its text is the head and the head is not known —
// and no mark; past the members read stand the members the page knows exist
// all the same, each "not read" where a row says what it holds of the
// passage, for a blank there would read as "no": every member up to the
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
// It stands at the act's site,
// which the act that opens it hands in (O-HOST's anchor; foundations §3.1):
// opened by the corner's act, beneath the version statement, and at the
// document's box, on the left where the corner stands, once T-LAYER rewrites
// the corner or takes it down; opened by a floating end's face (O-FACES'
// `floating`), where the face stood, at the head landed on, and following it
// as the camera moves. The list takes the focus where
// a key made the act — Enter at the corner — on its CURRENT member's read
// act, and never where a click on the statement did (D5 §4 rule 4; the focus
// record's rules 13 and 16); shown again by its own "try again", the focus
// stays on the control bearing the same act, else goes to its first (rule
// 11). It opens on its reads (O-HOST's `opening`):
// where an act was made on the chrome while they read — Back, Esc, the LEAP
// box opened, the next card asked or shown — nothing shows, and no member is
// asked about after it. New — no draft in the wireframe. Rules: FP-1, FP-2,
// FP-13, FP-20, FP-21, FP-22.

import * as HOST from './host.js';
import * as PUMP from '../model/pump.js';
import * as REC from '../model/records.js';
import * as GO from '../nav/go.js';
import * as SCENE from '../scene/scene.js';
import * as LAYER from '../text/layer.js';
import * as LINE from '../line/line.js';
import { whyOf, retries } from '../beams/held.js';
import { visibleView } from '../plane/camera.js';
import { docBox } from '../plane/projection.js';
import { versionAddress, memberOf, documentOf } from '../model/address.js';
import { t } from '../strings.js';
import { esc, timeOf } from '../util.js';

/** @typedef {import('./host.js').Anchor} Anchor */
/** @typedef {import('../model/pump.js').Chain} Chain */
/** @typedef {import('../bridge/shapes').Refusal} Refusal */

/**
 * @typedef {Object} Row — a member's row: what its text holds of the passage held
 * @property {number} k the member
 * @property {import('../beams/held.js').Holds | 'unknown' | 'unread' | null} holds all of it in one piece, in pieces, part, none; couldn't tell; not read — a member past the ones the probe read; null where no passage is held
 * @property {number} places the stretches of its text holding it
 * @property {string | null} why couldn't tell: the id of its reason's words (BM-HELD's `whyOf`)
 * @property {boolean} again couldn't tell by a refusal a retry may answer otherwise (BM-HELD's `retries`): read again at "try again"
 */

/**
 * @typedef {Object} Listing — what the list is made from (see the head)
 * @property {string} trunk the document whose chain it lists
 * @property {string} addr the version the passage is held in
 * @property {{pos: number, width: number} | null} held the passage held; null where that version holds no block
 * @property {Chain} chain the chain as its probe read it: its members, and whether the board ended it there
 * @property {Row[]} rows each member read, in order, then each one known past them, not read
 */

/** a row that could not tell, by the refusal met */
const unknownRow = (/** @type {number} */ k, /** @type {Refusal} */ r) => /** @type {Row} */ ({ k, holds: 'unknown', places: 0, why: whyOf(r), again: retries(r) });

/**
 * What a member's text holds of the passage held, for its row (see the
 * head): its own content extent read for the row and kept nowhere (M-PUMP's
 * `extentOf`), then the passage `compare`d into it by the one rule a landing
 * reads (N-GO's `heldIn`), in parts where the board refuses it for its size;
 * couldn't tell, by the refusal met, where no answer told; null, asking no
 * more, where the opening no longer stands.
 * @param {string} trunk
 * @param {string} at the version the passage is held in
 * @param {{pos: number, width: number}} held
 * @param {number} k
 * @param {() => boolean} stands
 * @returns {Promise<Row | null>}
 */
async function rowOf(trunk, at, held, k, stands) {
  const member = versionAddress(trunk, k);
  const e = await PUMP.extentOf(member);
  if (!stands()) return null;
  if (!('extent' in e)) return unknownRow(k, e.refused);
  const h = await GO.heldIn({ addr: at, pos: held.pos, width: held.width }, member, e.extent);
  if (!('held' in h)) return unknownRow(k, h.refused);
  return { k, holds: h.held.holds, places: h.held.places, why: null, again: false };
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

/** the two passages held the same: a row read for one tells of the other */
const sameHeld = (/** @type {{pos: number, width: number} | null} */ a, /** @type {{pos: number, width: number} | null} */ b) => (a && b ? a.pos === b.pos && a.width === b.width : a === b);

/**
 * The list's reads (see the head): the document read whole where the page
 * holds no extent of it, and the version named where it is another and the
 * page holds none of its text; the chain's end where the record holds it,
 * read at once (`heldChain`), so the rows' reads begin in the act, else the
 * chain probed (`probeChain`), past the members the listing before it read,
 * where one is handed in; the passage held in the version named; each
 * member's row — the row the listing before it told, for the same passage,
 * where it told one, else read; then, where the board did not end the chain
 * there, every member known past the ones read: up to the version being
 * read, and up to the highest a held feed row names, each not read. Null,
 * asking no more, where the opening no longer stands.
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
    const row = told.find((r) => r.k === k) || (held ? await rowOf(trunk, addr, held, k, stands) : { k, holds: null, places: 0, why: null, again: false });
    if (!row) return null;
    rows.push(row);
  }
  if (!chain.ended) {
    const known = Math.max(memberOf(addr) ?? 0, REC.feedMember(trunk) ?? 0);
    for (let k = chain.n + 1; k <= known; k++) rows.push({ k, holds: 'unread', places: 0, why: null, again: false });
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
  const asOf = named != null && named > c.n && when != null ? t('L.versions.as-of', { when: timeOf(when) }) : null;
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
 * document's id — so its own "try again" shows it again in its place: each
 * row its read act, the head's carrying the latest version's mark where the
 * board ended the chain there, its strip and its side-by-side act; the open
 * end's line beneath, where the chain was not ended.
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
  const html = `<span class="label">${esc(captionOf(l))}</span>` +
    `<ul class="rows versions">${rows.map((r) => `<li><button data-run="read${r.k}" aria-current="${cur === r.k}">${esc(t('F.versions.read', { k: r.k }))}${chain.ended && r.k === chain.n ? ' ' + latest : ''}</button> <span class="strip" data-holds="${r.holds === 'all' ? 'whole' : r.holds || ''}">${esc(stripOf(r))}</span> <button data-run="beside${r.k}">${esc(t('B1.side-by-side'))}</button></li>`).join('')}</ul>` +
    (end ? `<div class="open-end"><span data-string="${esc(end.id)}">${esc(end.text)}</span>${end.asOf ? ` · <span data-string="L.versions.as-of">${esc(end.asOf)}</span>` : ''}${end.again ? ` · <button data-run="again">${esc(t('B1.try-again'))}</button>` : ''}</div>` : '');
  /** @type {Record<string, import('./host.js').Act>} */
  const acts = {};
  /** where a member's version move is made, as data: the list's own place — its span, else its world point — where its reading face stands (N-GO) */
  const site = anchor && anchor.span ? { span: anchor.span } : anchor && anchor.world ? { world: anchor.world } : null;
  /** the passage held is the reader's selection — a width named — which the landing's line names so (issue #153), the move ending it with the text it stood in */
  const selected = pos != null && width != null && width > 0;
  for (const r of rows) {
    acts['read' + r.k] = (_el, byKey) => GO.toVersion(versionAddress(trunk, r.k), { carry: held ? { addr, pos: held.pos, width: held.width, selected } : null, byKey, site });
    acts['beside' + r.k] = () => SCENE.open(addr, versionAddress(trunk, r.k), { posA: held ? held.pos : null, widthA: held ? held.width : null, posB: null });
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
