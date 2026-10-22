// M-FRAMES — the wire frames the page composes and the answers it decodes
// (the structure record §3.2 "M-FRAMES"). Layer 1 (the model). PURE.
// THE READS ALONE (S-35 (a) RULED: this lane composes NO WRITE FRAME; the
// write composers arrive with the editor's lane): `retrieve_v`,
// `retrieve_doc_v_span_set`, `doc_metadata`, `find_links_v`,
// `find_links_ftt`, `read_link`, `follow_link`, `image`, `project`,
// `compare`, `show_origin`, `find_docs_containing`, `effective_owner`,
// `principal_prefix`, `key_set`, the supersession lineage `in_claims` and
// `out_claims` (A-56, A-57), and the `/op-at` form `{at, frame}` around
// any read — each spelled as `docs/wire.md` spells it at the pin
// (`db24cc1b`). The edition claims on a withheld run's origin, which C-67's
// clause is decided from (PUB-5.124), are `find_links_ftt`'s ACTIVE-view
// lookup (`editionClaimsAt`); the audit view's `edition_claims` is not
// composed (PUB-8.46). `count_v` is NOT composed (E17 (a): every count is LK's fold
// of `find_links_v`'s answer). The wireframe's simulated names
// (`list_docs`, `search_titles`, `list_landmarks`, `count_v`) have no wire
// twin and are gone: the index comes from `places` and the feed.
// The answers decoded: the delivery's items (`content`, `hex`, `atom`,
// `atom_hex`, `ref`, `withheld`), a span set, an `addrs` list, a link value,
// a follow, the V→I runs, a compare report, `doc_metadata`,
// `effective_owner`'s pair, `maybe_addr`, `key_set`, the lineage's `claims`
// (A-82), a `rejected` document.
// Carries: the wireframe's §4 `_serve` cases (re-cut to the wire's names),
// §8's `ask`. Rules: FP-1, FP-2, FP-6, FP-16 (the frames' shapes are the wire
// document's; pinned by this module's test against its examples).

import { vSpan, unitSpan, parseVSpan, resolveSpan } from './address.js';
import { byteLength } from '../util.js';

/** @typedef {import('./address.js').EndRef} EndRef */

/** the read op names this module composes — the static gate case greps `web/` for any other `"op"` */
export const READ_OPS = Object.freeze([
  'retrieve_v', 'retrieve_doc_v_span_set', 'doc_metadata', 'find_links_v', 'find_links_ftt', 'read_link',
  'follow_link', 'image', 'project', 'compare', 'show_origin', 'find_docs_containing', 'effective_owner',
  'principal_prefix', 'key_set', 'in_claims', 'out_claims',
]);

/**
 * @typedef {Object} Run — one delivered item, placed at its positions
 * @property {number} pos the first V-position (1-based)
 * @property {number} width positions
 * @property {'content' | 'hex' | 'atom' | 'atom_hex' | 'ref' | 'withheld'} kind
 * @property {string} text the content text, the atom's text, the hex, or ''
 * @property {string | null} ref a link position's address
 * @property {string | null} origin a withheld run's origin document
 */

/**
 * @typedef {Object} SpanSetEntry
 * @property {number} subspace
 * @property {number} ordinal
 * @property {number} positions
 */

/**
 * @typedef {Object} DocMeta
 * @property {string} doc
 * @property {boolean} published
 * @property {string} owner
 * @property {string | null} birth
 * @property {number | null} birthExtent
 * @property {number | null} placed
 * @property {number | null} baseExtent
 * @property {string | null} source
 * @property {number} asOf
 */

/**
 * @typedef {Object} LinkValue
 * @property {string} addr
 * @property {EndRef[]} from slot 1
 * @property {EndRef[]} to slot 2
 * @property {string | null} type the type slot's first address
 */

/**
 * @typedef {Object} ComparePair
 * @property {string} d1
 * @property {string} d2
 * @property {number} u1 ordinal in d1 (subspace 1)
 * @property {number} u2
 * @property {number} width
 */

/**
 * @typedef {'audit' | 'active' | 'default'} View — a lineage read's view
 * (wire.md §Views): `audit` everything ever created, a retracted claim
 * among it; `active` what is not retracted; `default` as `active`
 */

/**
 * @typedef {Object} Claim — one supersession lineage record (A-82): the
 * link `claim` homed in `home` asserts that `new` supersedes `old`
 * @property {string} claim the claim's own address — a link
 * @property {string} home the document the claim resides in
 * @property {string} old the superseded link's address, as recorded
 * @property {string} new the superseding link's address, as recorded
 * @property {boolean} active false where the claim was retracted (the audit view's alone)
 */

/**
 * @typedef {Object} Rejected
 * @property {string} code
 * @property {string} disposition
 * @property {string} op
 * @property {string | null} detail
 * @property {{addr?: string, index?: number, fault?: string} | null} site
 */

// ---- composers: the reads, as wire.md spells them ---------------------------

/** @param {string} doc @param {number} ordinal @param {number} positions */
export const retrieveV = (doc, ordinal, positions) => ({ op: 'retrieve_v', specs: [{ doc, span: vSpan(ordinal, positions) }] });
/** @param {Array<{doc: string, ordinal: number, positions: number}>} specs */
export const retrieveVMany = (specs) => ({ op: 'retrieve_v', specs: specs.map((s) => ({ doc: s.doc, span: vSpan(s.ordinal, s.positions) })) });
/** @param {string} doc */
export const retrieveDocVSpanSet = (doc) => ({ op: 'retrieve_doc_v_span_set', doc });
/** @param {string} doc */
export const docMetadata = (doc) => ({ op: 'doc_metadata', doc });
/** @param {string} d @param {number} ordinal @param {number} positions */
export const findLinksV = (d, ordinal, positions) => ({ op: 'find_links_v', d, region: [vSpan(ordinal, positions)] });
/** @param {{from: unknown, home: unknown, to: unknown, ty: unknown}} q */
export const findLinksFtt = (q) => ({ op: 'find_links_ftt', q });
/** the edition class (R20): the commons type every edition claim is typed under, its descriptive subtypes beneath it by prefix (wire.md §Link discovery reads, `edition_claims`) */
export const EDITION_CLASS = '1.1.0.1.0.1.0.3.14';
/**
 * The edition claims on an origin under the ACTIVE view — the read PUB-5.124's
 * pointer is decided from (PUB-8.46 keeps a read whose answer decides only
 * what a surface shows on the active view, served by the ops part 06 gives):
 * `find_links_ftt` constrained in two slots, the origin's unit span in `to`
 * and the edition class's in `ty`, `from` and `home` `"any"`, as wire.md
 * composes the lookup of a type's name — served from the coverage index, no
 * class scan, and naming no document, so no argument of it is withheld. Never
 * the audit view's `edition_claims`, whose `target` is a document argument:
 * at the origin of a withheld run, which the reader may not read, it answers
 * `withheld`.
 * @param {string} origin
 */
export const editionClaimsAt = (origin) => findLinksFtt({ from: 'any', home: 'any', to: [unitSpan(origin)], ty: [unitSpan(EDITION_CLASS)] });
/** @param {string} a */
export const readLink = (a) => ({ op: 'read_link', a });
/** @param {string} a @param {1 | 2 | 3} slot */
export const followLink = (a, slot) => ({ op: 'follow_link', a, slot });
/** @param {string} d @param {number} ordinal @param {number} positions */
export const image = (d, ordinal, positions) => ({ op: 'image', d, region: [vSpan(ordinal, positions)] });
/** @param {string} a @param {1 | 2 | 3} slot @param {string} d */
export const project = (a, slot, d) => ({ op: 'project', a, slot, d });
/**
 * @param {Array<{doc: string, spans: Array<{ordinal: number, positions: number}>}>} rho1
 * @param {Array<{doc: string, spans: Array<{ordinal: number, positions: number}>}>} rho2
 */
export const compare = (rho1, rho2) => ({
  op: 'compare',
  rho1: rho1.map((r) => ({ doc: r.doc, spans: r.spans.map((s) => vSpan(s.ordinal, s.positions)) })),
  rho2: rho2.map((r) => ({ doc: r.doc, spans: r.spans.map((s) => vSpan(s.ordinal, s.positions)) })),
});
/** @param {string} doc @param {number} ordinal @param {number} positions */
export const showOrigin = (doc, ordinal, positions) => ({ op: 'show_origin', doc, span: vSpan(ordinal, positions) });
/** @param {Array<{doc: string, spans: Array<{ordinal: number, positions: number}>}>} regions */
export const findDocsContaining = (regions) => ({ op: 'find_docs_containing', regions: regions.map((r) => ({ doc: r.doc, spans: r.spans.map((s) => vSpan(s.ordinal, s.positions)) })) });
/** @param {string} addr */
export const effectiveOwner = (addr) => ({ op: 'effective_owner', addr });
/** @param {number} principal */
export const principalPrefix = (principal) => ({ op: 'principal_prefix', principal });
/** @param {string} account */
export const keySet = (account) => ({ op: 'key_set', account });
/** the claims whose `old` is the link `y` — what supersedes it @param {string} y @param {View} view */
export const inClaims = (y, view) => ({ op: 'in_claims', view, y });
/** the claims whose `new` is the link `x` — what it supersedes @param {string} x @param {View} view */
export const outClaims = (x, view) => ({ op: 'out_claims', view, x });
/**
 * The history read: `/op-at`'s form, `{at, frame}` around any read (wire.md
 * §Reading history); the port's `op` carries it as the frame.
 * @param {number} at
 * @param {object} frame
 */
export const opAt = (at, frame) => ({ at, frame });

// ---- decoders -----------------------------------------------------------------

/**
 * Is the answer the wire's `rejected` document?
 * @param {unknown} answer
 * @returns {Rejected | null}
 */
export function rejected(answer) {
  if (!answer || typeof answer !== 'object') return null;
  const a = /** @type {Record<string, unknown>} */ (answer);
  if (a.resp !== 'rejected') return null;
  return {
    code: String(a.code), disposition: String(a.disposition), op: String(a.op),
    detail: typeof a.detail === 'string' ? a.detail : null,
    site: a.site && typeof a.site === 'object' ? /** @type {{addr?: string}} */ (a.site) : null,
  };
}

/** the `as_of` of a read's answer */
export const asOf = (/** @type {unknown} */ answer) => {
  const a = /** @type {{as_of?: unknown}} */ (answer || {});
  return typeof a.as_of === 'number' ? a.as_of : null;
};

/**
 * A delivery's items placed at their positions from the spec's first
 * ordinal: a `content` item is a run of as many positions as it has UTF-8
 * bytes; `hex` two characters per position; an `atom`/`atom_hex`/`ref` one
 * position; a `withheld` item its stated width.
 * @param {unknown} answer the `delivery` document
 * @param {number} startOrdinal the spec's first ordinal
 * @returns {Run[]}
 */
export function decodeDelivery(answer, startOrdinal) {
  const a = /** @type {{resp?: string, items?: unknown[]}} */ (answer || {});
  if (a.resp !== 'delivery' || !Array.isArray(a.items)) return [];
  /** @type {Run[]} */
  const runs = [];
  let pos = startOrdinal;
  for (const raw of a.items) {
    const it = /** @type {Record<string, unknown>} */ (raw);
    if (typeof it.content === 'string') { const w = byteLength(it.content); runs.push({ pos, width: w, kind: 'content', text: it.content, ref: null, origin: null }); pos += w; }
    else if (typeof it.hex === 'string') { const w = it.hex.length / 2; runs.push({ pos, width: w, kind: 'hex', text: it.hex, ref: null, origin: null }); pos += w; }
    else if (typeof it.atom === 'string') { runs.push({ pos, width: 1, kind: 'atom', text: it.atom, ref: null, origin: null }); pos += 1; }
    else if (typeof it.atom_hex === 'string') { runs.push({ pos, width: 1, kind: 'atom_hex', text: it.atom_hex, ref: null, origin: null }); pos += 1; }
    else if (typeof it.ref === 'string') { runs.push({ pos, width: 1, kind: 'ref', text: '', ref: it.ref, origin: null }); pos += 1; }
    else if (it.withheld && typeof it.withheld === 'object') {
      const wh = /** @type {{origin?: string, width?: string | number}} */ (it.withheld);
      const w = Number(wh.width || 0);
      runs.push({ pos, width: w, kind: 'withheld', text: '', ref: null, origin: wh.origin || null }); pos += w;
    }
  }
  return runs;
}

/**
 * `span_set`'s members on the document's own axis.
 * @param {unknown} answer
 * @returns {SpanSetEntry[]}
 */
export function decodeSpanSet(answer) {
  const a = /** @type {{resp?: string, set?: Array<{start: string, width: string}>}} */ (answer || {});
  if (a.resp !== 'span_set' || !Array.isArray(a.set)) return [];
  /** @type {SpanSetEntry[]} */
  const out = [];
  for (const s of a.set) { const p = parseVSpan(s); if (p) out.push(p); }
  return out;
}

/** `addrs` */
export function decodeAddrs(/** @type {unknown} */ answer) {
  const a = /** @type {{resp?: string, addrs?: unknown[]}} */ (answer || {});
  return a.resp === 'addrs' && Array.isArray(a.addrs) ? a.addrs.map(String) : [];
}

/** `link_value` → the link's slots resolved; null where no link resides there */
export function decodeLinkValue(/** @type {string} */ addr, /** @type {unknown} */ answer) {
  const a = /** @type {{resp?: string, link?: {slots?: Array<Array<{start: string, width: string}>>} | null}} */ (answer || {});
  if (a.resp !== 'link_value' || !a.link || !Array.isArray(a.link.slots)) return null;
  const [from = [], to = [], ty = []] = a.link.slots;
  /** @type {LinkValue} */
  const v = { addr, from: from.map(resolveSpan), to: to.map(resolveSpan), type: ty.length ? ty[0].start : null };
  return v;
}

/** `follow` → the spans, or 'invalid' */
export function decodeFollow(/** @type {unknown} */ answer) {
  const a = /** @type {{resp?: string, result?: {ok?: Array<{start: string, width: string}>, err?: string}}} */ (answer || {});
  if (a.resp !== 'follow' || !a.result) return null;
  if (a.result.err) return { invalid: true, spans: /** @type {EndRef[]} */ ([]) };
  return { invalid: false, spans: (a.result.ok || []).map(resolveSpan) };
}

/** `runs` (image): the V→I image, each run's I-start resolved */
export function decodeRuns(/** @type {unknown} */ answer) {
  const a = /** @type {{resp?: string, runs?: Array<{i_start: string, width: string}>}} */ (answer || {});
  if (a.resp !== 'runs' || !Array.isArray(a.runs)) return [];
  return a.runs.map((r) => ({ iStart: r.i_start, width: Number(r.width) }));
}

/** `compare` → the pairs */
export function decodeCompare(/** @type {unknown} */ answer) {
  const a = /** @type {{resp?: string, pairs?: Array<{d1: string, d2: string, u1: {ordinal: string, subspace: string}, u2: {ordinal: string, subspace: string}, width: string}>}} */ (answer || {});
  if (a.resp !== 'compare' || !Array.isArray(a.pairs)) return /** @type {ComparePair[]} */ ([]);
  return a.pairs.filter((p) => p.u1.subspace === '1' && p.u2.subspace === '1').map((p) => ({ d1: p.d1, d2: p.d2, u1: Number(p.u1.ordinal), u2: Number(p.u2.ordinal), width: Number(p.width) }));
}

/** `doc_metadata` */
export function decodeDocMetadata(/** @type {unknown} */ answer) {
  const a = /** @type {Record<string, unknown>} */ (answer || {});
  if (a.resp !== 'doc_metadata') return null;
  const num = (/** @type {unknown} */ v) => (v == null ? null : Number(v));
  /** @type {DocMeta} */
  const m = {
    doc: String(a.doc), published: !!a.published, owner: String(a.owner),
    birth: a.birth == null ? null : String(a.birth), birthExtent: num(a.birth_extent), placed: num(a.placed), baseExtent: num(a.base_extent),
    source: a.source == null ? null : String(a.source), asOf: Number(a.as_of),
  };
  return m;
}

/** `effective_owner` → {prefix, principal} or nulls together */
export function decodeEffectiveOwner(/** @type {unknown} */ answer) {
  const a = /** @type {{resp?: string, prefix?: string | null, principal?: number | null}} */ (answer || {});
  if (a.resp !== 'effective_owner') return null;
  return { prefix: a.prefix ?? null, principal: a.principal ?? null };
}

/** `maybe_addr` */
export function decodeMaybeAddr(/** @type {unknown} */ answer) {
  const a = /** @type {{resp?: string, addr?: string | null}} */ (answer || {});
  if (a.resp !== 'maybe_addr') return undefined;
  return a.addr ?? null;
}

/**
 * `claims` → the lineage records in the order the answer gives them; null
 * where the answer is no `claims` document, so a read that answered nothing
 * is never taken for one that answered no claim.
 * @param {unknown} answer
 * @returns {Claim[] | null}
 */
export function decodeClaims(answer) {
  const a = /** @type {{resp?: string, claims?: Array<Record<string, unknown>>}} */ (answer || {});
  if (a.resp !== 'claims' || !Array.isArray(a.claims)) return null;
  return a.claims.map((c) => ({ claim: String(c.claim), home: String(c.home), old: String(c.old), new: String(c.new), active: !!c.active }));
}

/** `key_set` → the enrolled and retired entries */
export function decodeKeySet(/** @type {unknown} */ answer) {
  const a = /** @type {{resp?: string, enrolled?: Array<{alg: string, anchor: boolean, fingerprint: string}>, retired?: Array<{anchor: boolean, fingerprint: string}>}} */ (answer || {});
  if (a.resp !== 'key_set') return null;
  return { enrolled: a.enrolled || [], retired: a.retired || [] };
}
