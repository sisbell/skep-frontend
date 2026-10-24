// N-MATCH — the LEAP box's matching rules (the structure record §3.2;
// foundations §2.3). Layer 2, pure: no state, the index read as values
// (FP-6). Input that parses as an address is exact, one row whose target is
// its own address; a share form (`skep://⟨token⟩`,
// `https://skep.network/l/⟨token⟩`, `skep.link/⟨token⟩`; deployment §3) and
// a URL (B8) are each recognized as one row of their kind, its token not
// decoded and its target empty. Label matching takes only text that parses
// as none of these: the index's places whose address begins with the text or
// whose label holds it, the system account's left out, at most `limit` rows,
// ordered by where the text falls in the title and then by address. With
// nothing typed, the current address's levels — the whole board first, where
// a board is held (FP-35), HOME where it differs from the board, the
// account's region where it is not HOME, the whole document — then the
// landmarks and the trail's entries.
// Rules: FP-1, FP-2, FP-6, FP-35.

import { parseAddress, accountOf, documentOf, boardOf, cmpAddr } from '../model/address.js';

/** @typedef {import('../model/records.js').Place} Place */

/**
 * @typedef {Object} Row
 * @property {'address' | 'share' | 'url' | 'board' | 'home' | 'account' | 'document' | 'landmark' | 'trail' | 'label'} kind
 * @property {string} addr the target, or '' where none
 * @property {string} title
 * @property {string} sub
 * @property {boolean} exact
 */

/** a share form of the address (deployment §3) */
export const isShareForm = (/** @type {string} */ s) => /^(skep:\/\/|https?:\/\/skep\.network\/l\/|skep\.link\/)[A-Za-z0-9]+$/i.test(s.trim());
/** a URL — the intake's (B8) */
export const isUrl = (/** @type {string} */ s) => /^https?:\/\//i.test(s.trim()) && !isShareForm(s);

/**
 * The rows for the typed text.
 * @param {string} text
 * @param {{places: Place[], landmarks: Place[], trail: Array<{n: number, addr: string, label: string | null}>, current: string | null, board: string | null, home: string | null, levelWords: {board: string, home: string, account: string, document: string}}} ctx `board` the node of the board held; null where none is
 * @param {number} [limit]
 * @returns {Row[]}
 */
export function matches(text, ctx, limit = 24) {
  const q = text.trim();
  if (!q) return levels(ctx);
  const addr = parseAddress(q);
  if (addr) return [{ kind: 'address', addr, title: addr, sub: '', exact: true }];
  if (isShareForm(q)) return [{ kind: 'share', addr: '', title: q, sub: '', exact: true }];
  if (isUrl(q)) return [{ kind: 'url', addr: '', title: q, sub: '', exact: true }];
  const lq = q.toLowerCase();
  /** @type {Row[]} */
  const out = [];
  for (const p of ctx.places) {
    if (p.system) continue;
    const label = p.label || '';
    if (p.doc.startsWith(q) || label.toLowerCase().includes(lq)) out.push({ kind: 'label', addr: p.doc, title: label || p.doc, sub: p.doc + (p.kind === 'draft' ? ' · draft' : ''), exact: false });
    if (out.length >= limit) break;
  }
  out.sort((a, b) => (a.title.toLowerCase().indexOf(lq) - b.title.toLowerCase().indexOf(lq)) || cmpAddr(a.addr, b.addr));
  return out;
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
  for (const tr of ctx.trail) out.push({ kind: 'trail', addr: tr.addr, title: `${tr.n} · ${tr.addr}`, sub: tr.label || '', exact: false });
  void boardOf;
  return out;
}
