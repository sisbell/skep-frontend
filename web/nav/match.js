// N-MATCH — the LEAP box's matching rules (the structure record §3.2;
// foundations §2.3). Layer 2, pure: no state, the index read as values
// (FP-6). Input that parses as an address is exact, one row whose target is
// its own address — at a number the plane's map gives no cell (P-PROJ's
// `hasCell`) marked reserved, its words the words the caller hands in for it
// (B11-S9), at a well-known slot that bears a name its sub-line that name
// (FP-33); a share form (`skep://⟨token⟩`,
// `https://skep.network/l/⟨token⟩`, `skep.link/⟨token⟩`; deployment §3) and
// a URL (B8) are each recognized as one row of their kind, its token not
// decoded and its target empty. Label matching takes only text that parses
// as none of these. A well-known slot's name typed whole, case and white
// space aside, finds the acting account's own slot first, created or not, off
// the addresses the caller hands in with no lookup (B11-S9, B11-S7): one row
// naming its address, its account beside it, the slot's name and the first
// line the index lists for it, if any. Then the index's places whose address
// begins with the text or whose label holds it — a place at a well-known slot
// matched by its slot's name beside its first line, and naming it (B11-F10) —
// the system account's left out and the own slot's row not listed twice, at
// most `limit` rows in all, ordered by where the text falls in the words the
// row is matched by and then by address, each naming its document by its
// label and its address and carrying no kind. With
// nothing typed, the current address's levels — the whole board first, where
// a board is held (FP-35), HOME where it differs from the board, the
// account's region where it is not HOME, the whole document — then the
// landmarks and the trail's entries.
// Rules: FP-1, FP-2, FP-6, FP-33, FP-35.

import { parseAddress, accountOf, documentOf, boardOf, cmpAddr } from '../model/address.js';
import { hasCell } from '../plane/projection.js';

/** @typedef {import('../model/records.js').Place} Place */

/**
 * @typedef {Object} Named — a well-known slot's name as the reader is shown it (T-LAYER's `slotNamed`)
 * @property {string} id its string's id
 * @property {string} text its words
 */

/**
 * @typedef {Object} Row
 * @property {'address' | 'share' | 'url' | 'board' | 'home' | 'account' | 'document' | 'landmark' | 'trail' | 'label' | 'slot'} kind `slot` the acting account's own well-known slot a typed name finds
 * @property {string} addr the target, or '' where none
 * @property {string} title
 * @property {string} sub
 * @property {boolean} exact
 * @property {number} [n] a trail entry's row: the entry, numbered newest-first
 * @property {boolean} [reserved] a typed address at a number the plane's map gives no cell: an act there makes no flight (N-GO's), and the row says so before any press
 * @property {boolean} [jump] the jump the face at a reserved row offers on the row below it, to the account's region (N-LEAP's)
 * @property {Named} [slot] the name of the well-known slot its address stands at, which the row names: an own slot's row, an index place's, a typed address's
 * @property {string} [owner] an own slot's row: the account it is named beside, its address
 */

/**
 * @typedef {Object} Ctx — what the rows are computed over (`matches`)
 * @property {Place[]} places
 * @property {Place[]} landmarks
 * @property {Array<{n: number, addr: string, label: string | null}>} trail
 * @property {string | null} current
 * @property {string | null} board the node of the board held; null where none is
 * @property {string | null} home the account acting; null for a guest
 * @property {{board: string, home: string, account: string, document: string}} levelWords
 * @property {string} [reserved] the words a typed address at a reserved number says on its row
 * @property {Array<{addr: string, text: string}>} [slots] the acting account's well-known slots that bear a name, in slot order: each the address of the document it holds, created or not, and its name's words as a person types them; none for a guest
 * @property {(addr: string) => Named | null} [named] the name of the well-known slot an address stands at, as the reader is shown it; none where left out
 */

/** a share form of the address (deployment §3) */
export const isShareForm = (/** @type {string} */ s) => /^(skep:\/\/|https?:\/\/skep\.network\/l\/|skep\.link\/)[A-Za-z0-9]+$/i.test(s.trim());
/** a URL — the intake's (B8) */
export const isUrl = (/** @type {string} */ s) => /^https?:\/\//i.test(s.trim()) && !isShareForm(s);

/**
 * The rows for the typed text (see the head).
 * @param {string} text
 * @param {Ctx} ctx
 * @param {number} [limit]
 * @returns {Row[]}
 */
export function matches(text, ctx, limit = 24) {
  const q = text.trim();
  if (!q) return levels(ctx);
  const named = ctx.named ?? (() => null);
  const addr = parseAddress(q);
  if (addr) {
    if (!hasCell(addr)) return [{ kind: 'address', addr, title: addr, sub: ctx.reserved ?? '', exact: true, reserved: true }];
    const slot = named(addr);
    return [slot ? { kind: 'address', addr, title: addr, sub: slot.text, exact: true, slot } : { kind: 'address', addr, title: addr, sub: '', exact: true }];
  }
  if (isShareForm(q)) return [{ kind: 'share', addr: '', title: q, sub: '', exact: true }];
  if (isUrl(q)) return [{ kind: 'url', addr: '', title: q, sub: '', exact: true }];
  const lq = q.toLowerCase(), typed = lq.replace(/\s+/g, ' ');
  const own = (ctx.slots ?? []).find((s) => s.text.toLowerCase() === typed);
  /** @type {Row[]} */
  const out = [];
  for (const p of ctx.places) {
    if (p.system || (own && p.doc === own.addr)) continue;
    const label = p.label || '', slot = named(p.doc);
    if (p.doc.startsWith(q) || matchedBy(slot, label).toLowerCase().includes(lq)) out.push(slot ? { kind: 'label', addr: p.doc, title: label || p.doc, sub: p.doc, exact: false, slot } : { kind: 'label', addr: p.doc, title: label || p.doc, sub: p.doc, exact: false });
    if (out.length + (own ? 1 : 0) >= limit) break;
  }
  const at = (/** @type {Row} */ r) => (r.slot ? matchedBy(r.slot, r.title === r.addr ? '' : r.title) : r.title).toLowerCase().indexOf(lq);
  out.sort((a, b) => (at(a) - at(b)) || cmpAddr(a.addr, b.addr));
  if (own) out.unshift(ownRow(own.addr, ctx));
  return out;
}

/** the words an index place's row is matched by (see the head): its slot's name and its first line, a space apart, where it stands at a slot that bears a name; else its first line */
const matchedBy = (/** @type {Named | null} */ slot, /** @type {string} */ label) => (slot ? (label ? `${slot.text} ${label}` : slot.text) : label);

/**
 * The acting account's own slot a typed name finds (see the head): its
 * address, the account beside it, its name as the reader is shown it, and the
 * first line the index lists for it, none where it lists none.
 * @param {string} addr
 * @param {Ctx} ctx
 * @returns {Row}
 */
function ownRow(addr, ctx) {
  const listed = ctx.places.find((p) => p.doc === addr), slot = ctx.named ? ctx.named(addr) : null;
  const row = { kind: /** @type {const} */ ('slot'), addr, title: slot ? slot.text : '', sub: listed && listed.label ? listed.label : '', exact: true, owner: accountOf(addr) || '' };
  return slot ? { ...row, slot } : row;
}

/** the levels beneath the current address, the whole board first where a board is held */
export function levels(/** @type {Parameters<typeof matches>[1]} */ ctx) {
  /** @type {Row[]} */
  const out = [];
  const cur = ctx.current;
  if (ctx.board) out.push({ kind: 'board', addr: ctx.board, title: ctx.levelWords.board, sub: ctx.board, exact: false });
  if (ctx.home && ctx.home !== ctx.board) out.push({ kind: 'home', addr: ctx.home, title: ctx.levelWords.home, sub: ctx.home, exact: false });
  if (cur) {
    const acct = accountOf(cur), doc = documentOf(cur);
    if (acct && acct !== ctx.home) out.push({ kind: 'account', addr: acct, title: ctx.levelWords.account, sub: acct, exact: false });
    if (doc) out.push({ kind: 'document', addr: doc, title: ctx.levelWords.document, sub: doc, exact: false });
  }
  for (const l of ctx.landmarks) out.push({ kind: 'landmark', addr: l.doc, title: l.label || l.doc, sub: l.doc, exact: false });
  for (const tr of ctx.trail) out.push({ kind: 'trail', addr: tr.addr, title: `${tr.n} · ${tr.addr}`, sub: tr.label || '', exact: false, n: tr.n });
  void boardOf;
  return out;
}
