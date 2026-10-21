// O-VERSIONS — the members' list (the structure record §3.2 "O-VERSIONS";
// foundations §2.1's version row; F2.1-e). Layer 2. ENGINE-BOUND. State:
// none. On the corner's act — a click on its version statement, or Enter at
// the corner (D5 K-57), both through `fromCorner`: the chain's members `D.1 …
// D.n` (the pump probed n), each a LEAP that carries the passage held,
// re-projected into the member and marked at the landing (N-GO's carry;
// foundations §2.3; P43) — the held passage: the selection where it stands
// in the corner's document, else the first span in view, the first block
// whose box meets the visible view (§2.3: "the selection, else the first span
// in view"); asked by a position alone, the block holding it, whole; else the
// document's first block — `compare`d into each member over that member's own
// extent, one span read per member made for its row and kept nowhere (§2.1's
// version row; A-39), and marked whole / in part / not at all — and each
// offering "read side by side", the scene opened on the held passage, which
// SC sets level with what the member holds of it. Each member is one row: its
// acts and its mark in columns the rows share. The list takes the focus where
// a key made the act — Enter at the corner — on its CURRENT member's read
// act, and never where a click on the statement did (D5 §4 rule 4; the focus
// record's rules 13 and 16). New — no draft in the wireframe. Rules: FP-1,
// FP-2, FP-13, FP-20.

import * as HOST from './host.js';
import * as PUMP from '../model/pump.js';
import * as REC from '../model/records.js';
import * as F from '../model/frames.js';
import * as GO from '../nav/go.js';
import * as SCENE from '../scene/scene.js';
import * as LAYER from '../text/layer.js';
import * as LINE from '../line/line.js';
import { visibleView } from '../plane/camera.js';
import { versionAddress, memberOf, documentOf } from '../model/address.js';
import { t } from '../strings.js';
import { esc } from '../util.js';

/**
 * A member's own content extent, read for its row (§2.1's version row: one
 * span read per member, A-39) and kept nowhere: a member the model held would
 * be read and mounted over its document's box, which it shares. Null where
 * the board declines the read.
 * @param {string} member
 * @returns {Promise<number | null>}
 */
async function extentOf(member) {
  const out = await PUMP.read(F.retrieveDocVSpanSet(member));
  if ('refused' in out) return null;
  const c = F.decodeSpanSet(out.answer).find((s) => s.subspace === 1);
  return c ? c.positions : 0;
}

/**
 * Open the list for a document (a member address answers its document's).
 * @param {string} addr
 * @param {number | null} pos the held passage's first position, or null for the document's first block
 * @param {HTMLElement | null} anchor
 * @param {number | null} [width] the held passage's positions; null holds the block at `pos` whole
 * @param {boolean} [byKey] a key made the act: the list takes the focus on its current member
 */
export async function open(addr, pos, anchor, width = null, byKey = false) {
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
  /** the passage held: the span named; the block holding `pos`, whole; else the first block */
  const holding = pos != null ? d.blocks.find((b) => pos >= b.pos && pos < b.pos + b.width) : d.blocks[0];
  /** @type {{pos: number, width: number} | null} */
  const held = pos != null && width != null && width > 0 ? { pos, width } : holding ? { pos: holding.pos, width: Math.max(1, holding.width) } : null;
  /** @type {Array<{k: number, holds: 'whole' | 'part' | 'none' | null}>} */
  const rows = [];
  for (let k = 1; k <= n; k++) {
    /** @type {'whole' | 'part' | 'none' | null} */
    let holds = null;
    const member = versionAddress(trunk, k);
    const extent = held ? await extentOf(member) : null;
    if (held && extent === 0) holds = 'none';
    else if (held && extent != null) {
      const out = await PUMP.read(F.compare([{ doc: trunk, spans: [{ ordinal: held.pos, positions: held.width }] }], [{ doc: member, spans: [{ ordinal: 1, positions: extent }] }]));
      if (!('refused' in out)) { const pairs = F.decodeCompare(out.answer); const covered = pairs.reduce((a, p) => a + p.width, 0); holds = covered >= held.width ? 'whole' : covered > 0 ? 'part' : 'none'; }
    }
    rows.push({ k, holds });
  }
  const cur = memberOf(addr);
  const html = `<span class="label">${esc(trunk)} · ${esc(t('F.version-of', { k: cur || n, n }))}</span>` +
    `<ul class="rows versions">${rows.map((r) => `<li><button data-run="read${r.k}" aria-current="${cur === r.k}">${esc(t('F.versions.read', { k: r.k }))}</button> <span class="strip" data-holds="${r.holds || ''}">${esc(r.holds === 'whole' ? t('F.versions.whole') : r.holds === 'part' ? t('F.versions.part') : r.holds === 'none' ? t('F.versions.none') : '')}</span> <button data-run="beside${r.k}">${esc(t('B1.side-by-side'))}</button></li>`).join('')}</ul>`;
  /** @type {Record<string, import('./host.js').Act>} */
  const acts = {};
  for (const r of rows) {
    acts['read' + r.k] = (_el, byKey) => GO.leapTo(versionAddress(trunk, r.k), { carry: held ? { addr: trunk, pos: held.pos, width: held.width } : null, how: 'leap', byKey });
    acts['beside' + r.k] = () => SCENE.open(trunk, versionAddress(trunk, r.k), { posA: held ? held.pos : null, widthA: held ? held.width : null, posB: null });
  }
  HOST.show({ kind: 'list', id: 'versions:' + trunk, anchor: anchor ? { el: anchor } : null, html, acts, takeFocus: byKey, first: '[data-run][aria-current="true"]' });
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
 * Enter at the corner both take: the list for the corner's document, anchored
 * at the statement, holding the selection where it stands in that document,
 * else the first span in view, whole. A corner with no version statement — a
 * draft's, whose chip's list is a later lane's — has no act.
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
  void open(addr, held ? held.pos : inView ? inView.pos : null, statement, held ? held.width : null, byKey);
  return true;
}
