// M-FRAMES — the wire frames the page composes and the answers it decodes
// (the structure record §3.2). Layer 1 (the model), pure: no state.
// The reads alone: `retrieve_v`, `retrieve_doc_v_span_set`,
// `doc_metadata`, `find_links_v`, `find_links_ftt`, `read_link`,
// `follow_link`, `image`, `project`, `compare`, `show_origin`,
// `find_docs_containing`, `effective_owner`, `principal_prefix`, `key_set`,
// the supersession lineage `in_claims` and `out_claims` (A-56, A-57), the
// orphan preview `delete_orphans` (A-55, A-81: which links a delete would
// orphan — a read of wire.md §Link discovery reads; nothing is written), and
// the `/op-at` form `{at, frame}` around any read — each spelled as
// `docs/wire.md` spells it. The edition claims on a withheld run's origin
// (PUB-5.124) are `find_links_ftt`'s active-view lookup (`editionClaimsAt`),
// and the edition-class links homed in a document its lookup by home
// (`editionLinksIn`); the audit view's `edition_claims` is not composed
// (PUB-8.46). The
// enrollment records naming an account (R22; FP-34) are `find_links_ftt`'s
// two-slot lookup too (`enrollmentsOf`; AUTH-2.113, AUTH-5.68). `count_v` is
// not composed (E17 (a)). No write is composed here; of the editor's writes,
// this module decodes the answers alone.
// The answers decoded: the delivery's items (`content`, `hex`, `atom`,
// `atom_hex`, `ref`, `withheld`, and an item of a kind this module does not
// know, kept at its own place — wire.md §Value encodings), a span set, an
// `addrs` list, a link value, a follow, the V→I runs, a compare report,
// `doc_metadata`, `effective_owner`'s pair, `maybe_addr`, `key_set`, the
// lineage's `claims` (A-82), the orphan preview's `orphans`, and a `rejected`
// document. A link value and
// `doc_metadata` each carry the age of the address asked (`Age`): the
// position of the commit that minted it and the board's testimony of when
// that commit was made, the testimony's time and its source taken together
// or not at all. `doc_metadata` carries beside them the draft base the board
// records for the address asked, the merge marker beside the base
// (`MergeMarker`) and the document the address was forked or staged from
// (`source`), each null where the board records none.
// The editor's answers and events decoded (the shell's shapes, `./shapes`):
// a write's `ack` and `ack_addr` (A-62, A-63), the `held` answer to a burst
// the shell holds (`decodeHeld`), the held lines `held(session)` lists
// (`decodeHeldRows`), the `held` event with the hands that moved a document
// (`decodeHeldEvent`), the shell's `held_lines` refusal of a whole-draft
// write — the draft holding the lines, an address, and their count, one or
// more (`decodeHeldLinesRefusal`) — `history.restore`'s `Restored`,
// `held.show`'s `{shown}`, the merge family's `MergeReport`, `MergeLanded`,
// `Undone` and `Withdrawn`, and the publication family's panel, its
// `{count, price}` and `confirm`'s three outcomes — the acknowledgment, the
// re-statement and the typed refusal — each narrowed to what the editor's
// screens read. Every decoder reads one answer and returns its typed value:
// an absent or null member null, and a malformed answer — a member not of
// the type the declarations give it — the decoder's typed failure, null, as
// the other decoders give it. None composes or sends anything.
// Rules: FP-1, FP-2, FP-6, FP-16 (this module's test pins every frame to the
// wire document's examples).

import { vSpan, unitSpan, parseVSpan, resolveSpan, isAddress } from './address.js';
import { byteLength } from '../util.js';

/** @typedef {import('./address.js').EndRef} EndRef */
/** @typedef {import('../bridge/shapes').Refusal} Refusal */
/** @typedef {import('../bridge/shapes').HeldAnswer} HeldAnswer */
/** @typedef {import('../bridge/shapes').HeldEvent} HeldEvent */
/** @typedef {import('../bridge/shapes').HandKey} HandKey */
/** @typedef {import('../bridge/shapes').BaseStanding} BaseStanding */
/** @typedef {import('../bridge/shapes').AckVia} AckVia */
/** @typedef {import('../bridge/shapes').Placement} Placement */
/** @typedef {import('../bridge/shapes').GapKind} GapKind */
/** @typedef {import('../bridge/shapes').GapPlacement} GapPlacement */
/** @typedef {import('../bridge/shapes').RowKind} RowKind */
/** @typedef {import('../bridge/shapes').Term} Term */

/** the read op names this module composes, no write among them: M-PUMP's test holds the frames the pump sends to this list, and the gate's wire case every frame the page sends the owner's provider from its boot through that case */
export const READ_OPS = Object.freeze([
  'retrieve_v', 'retrieve_doc_v_span_set', 'doc_metadata', 'find_links_v', 'find_links_ftt', 'read_link',
  'follow_link', 'image', 'project', 'compare', 'show_origin', 'find_docs_containing', 'effective_owner',
  'principal_prefix', 'key_set', 'in_claims', 'out_claims', 'delete_orphans',
]);

/**
 * The budget refusals a smaller read can meet (wire.md §Errors: M6's
 * `too_many_blocks`, a `compare` operand past its blocks, and
 * `too_many_pairs`, its report past its pairs; M8's `image_too_large`, an
 * `image` region or a `project` read past its runs; `too_many_items`, a
 * `retrieve_v` delivery past MAX_DELIVERY_ITEMS or its run-list walk priced
 * past its budget): each permanent for the request as sent, none for the same
 * question asked over less, so M-PUMP asks a `compare`, an `image` or a
 * `retrieve_v` so refused again in parts.
 */
export const SIZE_REFUSALS = Object.freeze(['too_many_blocks', 'too_many_pairs', 'image_too_large', 'too_many_items']);

/** the most items one `retrieve_v` delivery holds — one per delivered position, one per withheld run (wire.md §Content & provenance reads); a delivery past it is refused whole, so M-PUMP asks a text in parts of at most this many positions */
export const MAX_DELIVERY_ITEMS = 131072;

/**
 * @typedef {Object} Run — one delivered item, placed at its positions
 * @property {number} pos the first V-position (1-based)
 * @property {number} width positions
 * @property {'content' | 'hex' | 'atom' | 'atom_hex' | 'ref' | 'withheld' | 'unknown'} kind `unknown` an item of a kind this module does not know (`decodeDelivery`)
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
 * @typedef {Object} Age — when an address was minted, as a `read_link` or `doc_metadata` answer gives it (wire.md
 * §The response envelope, `link_value`): made by `ageIn` alone, so `time` and `from` are null together
 * @property {number | null} at the position of the commit that minted it; null where the board keeps none for it
 * @property {number | null} time that commit's unix milliseconds; null where neither testimony holds a reading
 * @property {'feed' | 'anchor' | null} from the testimony: `feed` the change feed's own row for `at`, exact; `anchor`
 * the newest hourly time record at or below `at`, the commit made within the hour after it; null with `time`
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
 * @property {string | null} source the document the address asked was forked or staged from, as the board records it
 * (wire.md §Namespace, `doc_metadata`): the member a `stage` copied, or a fork's source; null where it records none — a
 * trunk minted on its own
 * @property {string | null} base the draft base the board records for the address asked — the member, or the memberless
 * document, the draft's next publication lands after (wire.md §Namespace, `doc_metadata`); null where it records none
 * @property {number | null} baseCopied the content positions the draft's copy took of `base`; null where the board
 * records no base
 * @property {MergeMarker | null} merge the merge the draft carries, the marker beside its base; null where it carries none
 * @property {Age} age the age of the address asked — a version member its own mint, the trunk its creation (wire.md
 * §Namespace, `doc_metadata`)
 * @property {number} asOf
 */

/**
 * @typedef {Object} MergeMarker — the merge a draft carries, the marker beside its base (wire.md §Namespace,
 * `doc_metadata`'s `merge`): made by `markerOf` alone
 * @property {string[]} sides the sides merged, by address; empty where the draft itself was the side
 * @property {string} head the version the merge was composed on
 * @property {number | null} headCopied that version's content count as read at the compose; null where the board
 * serves none
 * @property {number | null} at the position of the commit that put the marker on the draft; null where the board
 * serves none
 */

/**
 * @typedef {Object} LinkValue
 * @property {string} addr
 * @property {EndRef[]} from slot 1
 * @property {EndRef[]} to slot 2
 * @property {string | null} type the type slot's first address
 * @property {Age} age when the link was made: the commit that minted it
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
 * The edition claims on an origin under the active view (PUB-5.124,
 * PUB-8.46): `find_links_ftt` constrained in two slots, the origin's unit
 * span in `to` and the edition class's in `ty`, `from` and `home` `"any"`,
 * as wire.md composes the lookup of a type's name — served from the coverage
 * index, no class scan, and naming no document, so no argument of it is
 * withheld. Never the audit view's `edition_claims`, whose `target` is a
 * document argument: at the origin of a withheld run, which the reader may
 * not read, it answers `withheld`.
 * @param {string} origin
 */
export const editionClaimsAt = (origin) => findLinksFtt({ from: 'any', home: 'any', to: [unitSpan(origin)], ty: [unitSpan(EDITION_CLASS)] });
/**
 * The links of the edition class homed in a document (R20): `find_links_ftt`
 * constrained in two slots, the document's unit span in `home` and the
 * edition class's in `ty`, `from` and `to` `"any"` — a `home` naming a
 * document or a version member reads that home's links alone and takes no
 * class-scan permit (wire.md §Link discovery reads). M-PUMP reads it at the
 * homes a link write names, to tell which origins' edition claims the write
 * changed.
 * @param {string} home a document or a version member, never an account
 */
export const editionLinksIn = (home) => findLinksFtt({ from: 'any', home: [unitSpan(home)], to: 'any', ty: [unitSpan(EDITION_CLASS)] });
/** the enrollment class (AUTH-5.4): the commons type every credential enrollment record's deposit is typed under (skep-client's `T_ENROLL`) */
export const ENROLL_CLASS = '1.1.0.1.0.1.0.3.1';
/**
 * The enrollment records naming an account (AUTH-2.113, AUTH-5.68):
 * `find_links_ftt` constrained in two slots, the account's unit span in `to`
 * and the enrollment class's in `ty`, `from` and `home` `"any"` —
 * skep-client's `links_of` — so no class scan. The query matches by span
 * overlap, so a record naming an account above the one asked, or beneath it,
 * answers too: a record is the account's only where its own `to` names it,
 * which M-PUMP's `readAccount` checks.
 * @param {string} account
 */
export const enrollmentsOf = (account) => findLinksFtt({ from: 'any', home: 'any', to: [unitSpan(account)], ty: [unitSpan(ENROLL_CLASS)] });
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
 * The orphan preview (A-55, A-81; wire.md §Link discovery reads): which links
 * would the delete of `positions` positions at `ordinal` in `d` orphan —
 * a read, nothing written, `p` the V-position in its `{ordinal, subspace}`
 * spelling and `width` a nat, each a decimal string as the wire spells them.
 * @param {string} d
 * @param {number} ordinal
 * @param {number} positions
 */
export const deleteOrphans = (d, ordinal, positions) => ({ op: 'delete_orphans', d, p: { ordinal: String(ordinal), subspace: '1' }, width: String(positions) });
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
 * position; a `withheld` item its stated width; every other item, a kind
 * this module does not know, an `unknown` run at its own place, never
 * dropped, of the width it carries (`unknownWidth`), so each item after it
 * stands at its own positions (wire.md §Value encodings).
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
    else { const w = unknownWidth(it); runs.push({ pos, width: w, kind: 'unknown', text: '', ref: null, origin: null }); pos += w; }
  }
  return runs;
}

/**
 * The positions an item of a kind this module does not know spans: the
 * `width` its one member's object carries, as a `withheld` item's does
 * (wire.md §Value encodings), where that is a whole number of positions
 * spelled as a nat or a number; else one, the least any item of the read
 * form spans.
 * @param {Record<string, unknown>} it
 * @returns {number}
 */
function unknownWidth(it) {
  const members = Object.values(it), one = members.length === 1 ? members[0] : null;
  const w = one && typeof one === 'object' ? /** @type {{width?: unknown}} */ (one).width : null;
  const n = typeof w === 'string' && /^[0-9]+$/.test(w) ? Number(w) : w;
  return typeof n === 'number' && Number.isSafeInteger(n) && n >= 1 ? n : 1;
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

/**
 * An answer's age members — `at`, `time`, `time_from` — as one `Age`: a
 * `time` stands only with a source the wire names, and a source only with a
 * time.
 * @param {Record<string, unknown>} a
 * @returns {Age}
 */
function ageIn(a) {
  const from = a.time_from === 'feed' || a.time_from === 'anchor' ? a.time_from : null;
  const time = from && typeof a.time === 'number' ? a.time : null;
  return { at: a.at == null ? null : Number(a.at), time, from: time == null ? null : from };
}

/** `link_value` → the link's slots resolved and its age; null where no link resides there */
export function decodeLinkValue(/** @type {string} */ addr, /** @type {unknown} */ answer) {
  const a = /** @type {{resp?: string, link?: {slots?: Array<Array<{start: string, width: string}>>} | null}} */ (answer || {});
  if (a.resp !== 'link_value' || !a.link || !Array.isArray(a.link.slots)) return null;
  const [from = [], to = [], ty = []] = a.link.slots;
  /** @type {LinkValue} */
  const v = { addr, from: from.map(resolveSpan), to: to.map(resolveSpan), type: ty.length ? ty[0].start : null, age: ageIn(/** @type {Record<string, unknown>} */ (a)) };
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

/** a nat or a position as the wire spells it, a decimal string or a number; null where the board serves none */
const num = (/** @type {unknown} */ v) => (v == null ? null : Number(v));

/** `doc_metadata` */
export function decodeDocMetadata(/** @type {unknown} */ answer) {
  const a = /** @type {Record<string, unknown>} */ (answer || {});
  if (a.resp !== 'doc_metadata') return null;
  /** @type {DocMeta} */
  const m = {
    doc: String(a.doc), published: !!a.published, owner: String(a.owner),
    birth: a.birth == null ? null : String(a.birth), birthExtent: num(a.birth_extent), placed: num(a.placed), baseExtent: num(a.base_extent),
    source: a.source == null ? null : String(a.source),
    base: a.base == null ? null : String(a.base), baseCopied: num(a.base_copied), merge: markerOf(a.merge),
    age: ageIn(a), asOf: Number(a.as_of),
  };
  return m;
}

/**
 * A `doc_metadata` answer's `merge` member as one `MergeMarker`: null where
 * the draft carries no marker — the member null or absent — and where the
 * member is no object naming its sides and its head, as the client's own
 * reading of the marker leaves it; a side that is no string is left out.
 * @param {unknown} v
 * @returns {MergeMarker | null}
 */
function markerOf(v) {
  if (!v || typeof v !== 'object' || Array.isArray(v)) return null;
  const m = /** @type {Record<string, unknown>} */ (v);
  if (!Array.isArray(m.sides) || typeof m.head !== 'string') return null;
  return { sides: m.sides.filter((s) => typeof s === 'string').map(String), head: m.head, headCopied: num(m.head_copied), at: num(m.at) };
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

/**
 * `orphans` → the links the proposed delete would orphan, by address, in the
 * order the answer gives them; null where the answer is no `orphans`
 * document or names a link that is no address.
 * @param {unknown} answer
 * @returns {string[] | null}
 */
export function decodeOrphans(answer) {
  return decode(answer, (a) => (a.resp === 'orphans' ? strings(a.orphaned) : fail()));
}

// ---- the editor's answers and events (see the head) -----------------------------

/** a member not of the type the declarations give it: the answer is malformed, and its decoder returns null */
class Malformed extends Error {}
/** @returns {never} */
const fail = () => { throw new Malformed('malformed'); };
/** @param {unknown} v @returns {string} */
const string = (v) => (typeof v === 'string' ? v : fail());
/** @param {unknown} v @returns {number} */
const number = (v) => (typeof v === 'number' && Number.isFinite(v) ? v : fail());
/** @param {unknown} v @returns {boolean} */
const boolean = (v) => (typeof v === 'boolean' ? v : fail());
/** @param {unknown} v @returns {Record<string, unknown>} */
const object = (v) => (v && typeof v === 'object' && !Array.isArray(v) ? /** @type {Record<string, unknown>} */ (v) : fail());
/** @param {unknown} v @returns {unknown[]} */
const array = (v) => (Array.isArray(v) ? v : fail());
/** @param {unknown} v @returns {string[]} */
const strings = (v) => array(v).map(string);
/**
 * an absent or null member → null; present, read as `f` reads it
 * @template T
 * @param {unknown} v
 * @param {(v: unknown) => T} f
 * @returns {T | null}
 */
const opt = (v, f) => (v == null ? null : f(v));
/**
 * one of a declared union's literals, else malformed
 * @template {string} T
 * @param {unknown} v
 * @param {Record<T, null>} set every literal of the union, as a key: each set is typed `Record<U, null>` for its declared
 * union `U`, so the checker refuses one that misses a literal of the declarations or holds one they lack (FP-16)
 * @returns {T}
 */
const oneOf = (v, set) => (typeof v === 'string' && Object.hasOwn(set, v) ? /** @type {T} */ (v) : fail());
/**
 * One answer read as `read` reads it: null where the answer is no object or
 * where any member it reads is not of the type the declarations give it.
 * @template T
 * @param {unknown} answer
 * @param {(a: Record<string, unknown>) => T} read
 * @returns {T | null}
 */
function decode(answer, read) {
  try { return read(object(answer)); } catch (e) { if (e instanceof Malformed) return null; throw e; }
}
/**
 * A refusal as the shell hands one up (§4.4's one shape): an object naming
 * its `kind` and its `name`; else malformed.
 * @param {unknown} v
 * @returns {Refusal}
 */
function refusalOf(v) {
  const r = object(v);
  string(r.kind); string(r.name);
  return /** @type {Refusal} */ (/** @type {unknown} */ (r));
}

/**
 * @typedef {Object} Ack — `ack`: a write committed at `at` (wire.md §The response envelope)
 * @property {number} at the commit's position
 * @property {string | null} headMoved a `set_arrangement`'s tell that the trunk's head has moved past the head it named:
 * the trunk's current head; null on every other ack, and where the head named is the trunk's
 */

/** `ack` → the commit's position and the head-moved tell; null for any other answer */
export function decodeAck(/** @type {unknown} */ answer) {
  return decode(answer, (a) => (a.resp === 'ack' ? /** @type {Ack} */ ({ at: number(a.at), headMoved: opt(a.head_moved, string) }) : fail()));
}

/**
 * @typedef {Object} AckAddr — `ack_addr`: a write that minted or found an address (wire.md §The response envelope)
 * @property {string} addr the address minted or found — an insert's start, a document, a member, a link
 * @property {number} at the commit's position
 */

/** `ack_addr` → the address and the commit's position; null for any other answer */
export function decodeAckAddr(/** @type {unknown} */ answer) {
  return decode(answer, (a) => (a.resp === 'ack_addr' ? /** @type {AckAddr} */ ({ addr: string(a.addr), at: number(a.at) }) : fail()));
}

/** @type {Record<NonNullable<HeldAnswer['unwritable_class']>, null>} the classes of a device's refusal to keep a held line (`HeldAnswer.unwritable_class`) */
const UNWRITABLE_CLASSES = { full: null, read_only: null, other: null };

/**
 * @typedef {Object} Held — the `op` answer where the burst's board is held (`HeldAnswer`): accepted, not acked
 * @property {number} held the line's ordinal in the held store
 * @property {string} cause the hold's token
 * @property {string | null} unwritable why the device refused the line, or the held file is out of reach; null where it took it
 * @property {NonNullable<HeldAnswer['unwritable_class']> | null} unwritableClass the class the page keys its act by, beside `unwritable`; null with it
 */

/** the `held` answer → the line's ordinal, the hold's cause and the device's refusal where one stands; null for any other answer */
export function decodeHeld(/** @type {unknown} */ answer) {
  return decode(answer, (a) => (a.resp === 'held'
    ? /** @type {Held} */ ({ held: number(a.held), cause: string(a.cause), unwritable: opt(a.unwritable, string), unwritableClass: opt(a.unwritable_class, (v) => oneOf(v, UNWRITABLE_CLASSES)) })
    : fail()));
}

/**
 * @typedef {Object} HeldAnchors — the identities a held burst is placed by (`Anchors`)
 * @property {string | null} before the I-address of the unit before the span the burst edits; null at the document's edge
 * @property {string | null} after the I-address of the unit after it; null at the document's edge
 * @property {Array<{start: string, width: string}> | null} span a delete's or a rearrange's I-runs between the two, in V order; null where the burst carries none
 */

/**
 * @typedef {Object} HeldLine — one row of `held(session)` (`HeldRow`): a held burst of the acting principal
 * @property {number} held the ordinal
 * @property {string} doc the draft
 * @property {number} base the resend's read start
 * @property {{op: string} & Record<string, unknown>} frame the wire frame as the page composed it, or as the shell last shifted it
 * @property {HeldAnchors | null} anchors the page's anchors, where the burst carried them
 * @property {string} cause the hold's token, or a refused run's
 * @property {boolean} sent whether a dial of the line was attempted since the last read, so it may have landed
 * @property {number} time
 * @property {Refusal | null} refusal the verdict for a refused run — the board's, the shell's `answers_lost`, `arrangement_moved` at a line held moved, `head_unreadable`, `session_died`; null while the line waits on no act
 */

/** @param {unknown} v @returns {HeldAnchors} */
function anchorsOf(v) {
  const a = object(v);
  return { before: opt(a.before, string), after: opt(a.after, string), span: opt(a.span, (s) => array(s).map((x) => { const r = object(x); return { start: string(r.start), width: string(r.width) }; })) };
}

/**
 * `held(session)` → the held lines in resend order; null where the answer is
 * no list, or a row lacks a member the declarations give it.
 * @param {unknown} answer
 * @returns {HeldLine[] | null}
 */
export function decodeHeldRows(answer) {
  try {
    return array(answer).map((row) => {
      const r = object(row), frame = object(r.frame);
      string(frame.op);
      /** @type {HeldLine} */
      const line = {
        held: number(r.held), doc: string(r.doc), base: number(r.base), frame: /** @type {{op: string} & Record<string, unknown>} */ (frame),
        anchors: opt(r.anchors, anchorsOf), cause: string(r.cause), sent: boolean(r.sent), time: number(r.time), refusal: opt(r.refusal, refusalOf),
      };
      return line;
    });
  } catch (e) { if (e instanceof Malformed) return null; throw e; }
}

/** @type {Record<HeldEvent['state'], null>} the states a document's held state moves through (`HeldEvent.state`) */
const HELD_STATES = { holding: null, sending: null, kept: null, refused: null, moved: null };
/** @type {Record<HandKey, null>} the hands a moved document's rows name (`HandKey`) */
const HAND_KEYS = { own: null, other: null, bare: null, lost: null, unread: null };

/**
 * @typedef {Object} HeldHand — one hand whose row moved a held document (`Hand`)
 * @property {HandKey} key `own` this store's key, `other` another's, `bare` an unsigned hand under local trust, `lost` a row
 * whose testimony the board lost, `unread` the hands not read yet (D6 BM-78)
 * @property {string | null} fingerprint the key's, for `own` and `other`; null for the rest
 * @property {string | null} label the label the shell's key store holds for the key; null where it holds none
 */

/**
 * @typedef {Object} HeldState — the `held` event (`HeldEvent`): a document's held state as it moves
 * @property {string} board
 * @property {string} session
 * @property {string} doc
 * @property {number} held the count of lines still held on the document
 * @property {HeldEvent['state']} state
 * @property {string | null} cause the hold's token while holding, the refusal's while refused; null where the event carries none
 * @property {HeldHand[]} hands with the `moved` state, each hand once; empty where the event carries none
 */

/** the `held` event → the document's state, its cause and the hands that moved it; null where a member is not as declared */
export function decodeHeldEvent(/** @type {unknown} */ data) {
  return decode(data, (a) => /** @type {HeldState} */ ({
    board: string(a.board), session: string(a.session), doc: string(a.doc), held: number(a.held), state: oneOf(a.state, HELD_STATES),
    cause: opt(a.cause, string),
    hands: opt(a.hands, (hs) => array(hs).map((h) => { const x = object(h); return { key: oneOf(x.key, HAND_KEYS), fingerprint: opt(x.fingerprint, string), label: opt(x.label, string) }; })) || [],
  }));
}

/**
 * @typedef {Object} HeldLinesRefusal — the shell's `held_lines` refusal (`HeldLinesRefusal`): a whole-draft write refused, nothing sent, while a draft it writes holds lines the board has not kept (D6 BM-62)
 * @property {string} doc the draft holding the lines
 * @property {number} held how many of the acting principal's lines it holds, one or more
 */

/**
 * The shell's `held_lines` refusal → the draft and how many lines it holds;
 * null for a refusal of any other kind or name, and for one whose `doc` is no
 * address or whose `held` is no whole count of one or more.
 * @param {unknown} refusal an outcome's `refused`, as the port hands it up
 * @returns {HeldLinesRefusal | null}
 */
export function decodeHeldLinesRefusal(refusal) {
  return decode(refusal, (r) => {
    if (r.kind !== 'shell' || r.name !== 'held_lines') fail();
    const doc = string(r.doc), held = number(r.held);
    if (!isAddress(doc) || !Number.isInteger(held) || held < 1) fail();
    return /** @type {HeldLinesRefusal} */ ({ doc, held });
  });
}

/**
 * @typedef {Object} Restored — `history.restore`'s answer: a past state made current (B3-S7)
 * @property {string} draft
 * @property {number} at the position restored
 * @property {number} position the write's commit
 * @property {number} asOf the position the draft stood at before the write — the way back, `history.restore` again at `at: asOf`
 * @property {MergeMarker | null} marker the draft's merge marker as it stands, which a restore never takes out; null where it carries none
 */

/** `history.restore` → the state restored and the way back; null where a member is not as declared */
export function decodeRestored(/** @type {unknown} */ answer) {
  return decode(answer, (a) => /** @type {Restored} */ ({ draft: string(a.draft), at: number(a.at), position: number(a.position), asOf: number(a.as_of), marker: markerOf(a.marker) }));
}

/** `held.show` → whether the held file was shown; null for any other answer */
export function decodeShown(/** @type {unknown} */ answer) {
  return decode(answer, (a) => boolean(a.shown));
}

/**
 * @typedef {Object} Undone — `merge.undo`'s answer: the landing taken back
 * @property {string} draft the draft the merge was taken back out of
 * @property {number} position the write's commit
 * @property {string | null} record the replacing record's link, homed in its private journal; null where no record of the
 * landing stood
 * @property {{base: string, extent: number} | null} restored the base restored, its address and extent; null where the draft records none
 */

/** `merge.undo` → the draft, the commit, the record and the base restored; null where a member is not as declared */
export function decodeUndone(/** @type {unknown} */ answer) {
  return decode(answer, (a) => /** @type {Undone} */ ({
    draft: string(a.draft), position: number(a.position), record: opt(a.record, string),
    restored: opt(a.restored, (r) => { const x = object(r); return { base: string(x.base), extent: number(x.extent) }; }),
  }));
}

/**
 * @typedef {Object} Withdrawn — `merge.withdraw`'s answer: the marker cleared, the words kept
 * @property {string} draft
 * @property {number} position the write's commit
 * @property {string | null} record the replacing record's link, homed in its private journal; null where no record of the
 * landing stood
 */

/** `merge.withdraw` → the draft, the commit and the record; null where a member is not as declared */
export function decodeWithdrawn(/** @type {unknown} */ answer) {
  return decode(answer, (a) => /** @type {Withdrawn} */ ({ draft: string(a.draft), position: number(a.position), record: opt(a.record, string) }));
}

/** @type {Record<AckVia, null>} the ways an acknowledgment was reached (`AckVia`) */
const ACK_VIAS = { answer: null, twin: null, records: null, walk: null, edition_claim: null };
/** @type {Record<BaseStanding, null>} the standings of a draft's base against its document's head (`BaseStanding`) */
const STANDINGS = { at_head: null, behind: null, first: null, superseded_first: null };
/** @type {Record<GapKind, null>} the kinds of a merge's gap (`GapKind`) */
const GAP_KINDS = { order: null, anchor: null, corner: null, cut: null, collision: null, moves: null };
/** @type {Record<Extract<GapPlacement, string>, null>} the placements of a gap but an order of its sides (`GapPlacement`) */
const GAP_PLACEMENTS = { after: null, before: null, omitted: null };
/** @type {Record<Term, null>} the terms of a publication's price (`Term`) */
const TERMS = { runs: null, places: null, links: null, retract: null, read_with: null, body: null, values: null, reads: null, bytes: null };
/** @type {Record<import('../bridge/shapes').MergeReport['outcome'], null>} the outcomes of a merge's composition (`MergeReport.outcome`) */
const MERGE_OUTCOMES = { landed: null, reopened: null, merged: null };
/** @type {Record<import('../bridge/shapes').MergeReport['form'], null>} the forms of a merge's side (`MergeReport.form`) */
const MERGE_FORMS = { daughter: null, draft: null };
/** @type {Record<import('../bridge/shapes').MergeSide['role'], null>} the roles of a merge record's side (`MergeSide.role`) */
const SIDE_ROLES = { head: null, alternative: null, draft: null, fork: null };
/** @type {Record<import('../bridge/shapes').MergeRun['family'], null>} the families of a run of M (`MergeRun.family`) */
const RUN_FAMILIES = { own: null, window: null, draft_native: null };

/**
 * @typedef {Object} MergeSide — one side of the merge record (`MergeSide`)
 * @property {string} at the member or the draft
 * @property {import('../bridge/shapes').MergeSide['role']} role
 * @property {number | null} position the board position a draft side was read at; null at a member
 */

/**
 * @typedef {Object} MergeRun — one run of M, the merged list, in V-order (`MergeRun`)
 * @property {string} origin
 * @property {number} iStart
 * @property {number} width
 * @property {number | null} side the side that placed it, 0 the head; null for the base's own
 * @property {import('../bridge/shapes').MergeRun['family']} family
 */

/**
 * @typedef {Object} MergeGap — one gap of the report (`MergeGap`)
 * @property {number} id the key `merge.land`'s `resolutions` take
 * @property {GapKind} kind
 * @property {string | null} after the surviving base anchor before it; null at an edge
 * @property {string | null} before the surviving base anchor after it; null at an edge
 * @property {Array<{side: number, iStart: string, width: number}>} runs the runs the gap places, with the side each came from
 * @property {GapPlacement} placed the placement as it stands
 * @property {boolean} settled whether the rules or the person settled it
 * @property {string | null} resolvedBy who settled it; null while it stands unsettled at its default
 */

/**
 * @typedef {Object} MergeReport — `merge.compose`'s answer (`MergeReport`): M landed, re-opened or already merged
 * @property {import('../bridge/shapes').MergeReport['outcome']} outcome
 * @property {string} doc the trunk
 * @property {string} head the trunk's head the merge was composed on
 * @property {string} base the member both sides descend from
 * @property {string} side the daughter or the draft composed
 * @property {import('../bridge/shapes').MergeReport['form']} form
 * @property {MergeSide[]} sides
 * @property {MergeRun[]} runs
 * @property {MergeGap[]} gaps the gap report
 * @property {{a: number, b: number, m: number}} counts the run counts, `m` against `cap`
 * @property {number} cap
 * @property {boolean} overCap
 * @property {unknown} record the merge record's body as it stands
 * @property {number} asOf the board position every read was made at
 * @property {string | null} into the draft M landed in; null where nothing landed
 * @property {number | null} position the write's commit, or the marker's at a re-open; null where nothing landed
 * @property {boolean} fresh a fresh draft was staged for the landing
 * @property {string | null} headMoved the trunk's newer head where one stands
 * @property {string | null} recordLink the merge record's link, homed in the person's private journal beside the record; null
 * where the record could not be written
 * @property {Refusal | null} unrecorded why the record could not be written
 * @property {string | null} member the member a claim of the person's names, at the `merged` outcome
 * @property {string[]} claims the claims standing at the daughter, at the `merged` outcome; empty elsewhere
 */

/** @param {unknown} v @returns {GapPlacement} */
function placementOf(v) {
  if (Array.isArray(v)) return v.map(number);
  return oneOf(v, GAP_PLACEMENTS);
}

/** `merge.compose` → the report, its sides, runs and gaps typed; null where a member is not as declared */
export function decodeMergeReport(/** @type {unknown} */ answer) {
  return decode(answer, (a) => {
    const counts = object(a.counts);
    /** @type {MergeReport} */
    const report = {
      outcome: oneOf(a.outcome, MERGE_OUTCOMES),
      doc: string(a.doc), head: string(a.head), base: string(a.base), side: string(a.side), form: oneOf(a.form, MERGE_FORMS),
      sides: array(a.sides).map((s) => { const x = object(s); return { at: string(x.at), role: oneOf(x.role, SIDE_ROLES), position: opt(x.position, number) }; }),
      runs: array(a.runs).map((r) => { const x = object(r); return { origin: string(x.origin), iStart: number(x.i_start), width: number(x.width), side: opt(x.side, number), family: oneOf(x.family, RUN_FAMILIES) }; }),
      gaps: array(a.gaps).map((g) => {
        const x = object(g);
        return {
          id: number(x.id), kind: oneOf(x.kind, GAP_KINDS), after: opt(x.after, string), before: opt(x.before, string),
          runs: array(x.runs).map((r) => { const y = object(r); return { side: number(y.side), iStart: string(y.i_start), width: number(y.width) }; }),
          placed: placementOf(x.placed), settled: boolean(x.settled), resolvedBy: opt(x.resolved_by, string),
        };
      }),
      counts: { a: number(counts.a), b: number(counts.b), m: number(counts.m) }, cap: number(a.cap), overCap: boolean(a.over_cap), record: a.record ?? null, asOf: number(a.as_of),
      into: opt(a.into, string), position: opt(a.position, number), fresh: opt(a.fresh, boolean) || false, headMoved: opt(a.head_moved, string), recordLink: opt(a.record_link, string),
      unrecorded: opt(a.unrecorded, refusalOf), member: opt(a.member, string), claims: opt(a.claims, strings) || [],
    };
    return report;
  });
}

/**
 * @typedef {Object} MergeLanded — `merge.land`'s landing (`MergeLanded`): the shot through the publication family's one send, then the merge record
 * @property {'landed'} outcome
 * @property {string} member the member minted
 * @property {number} at its commit
 * @property {AckVia} via how the acknowledgment was reached
 * @property {boolean} claim whether the edition claim rode in the write
 * @property {string[]} supersede the daughters the write claimed superseded
 * @property {boolean} daughter the head moved under a shot naming no daughter, and the member landed as one
 * @property {string | null} record the merge record's link, homed in the person's private journal; null where it could not be
 * written
 * @property {Refusal | null} unrecorded why the record could not be written
 * @property {string[]} claims the supersession claims standing at the daughters whose `new` is the member
 * @property {number} retries the record's
 */

/** `merge.land`'s landing → the member, its commit and the record; null for the re-statement, the refusal or a malformed answer */
export function decodeMergeLanded(/** @type {unknown} */ answer) {
  return decode(answer, (a) => (a.outcome === 'landed'
    ? /** @type {MergeLanded} */ ({
      outcome: 'landed', member: string(a.member), at: number(a.at), via: oneOf(a.via, ACK_VIAS), claim: boolean(a.claim), supersede: strings(a.supersede), daughter: boolean(a.daughter),
      record: opt(a.record, string), unrecorded: opt(a.unrecorded, refusalOf), claims: strings(a.claims), retries: number(a.retries),
    })
    : fail()));
}

/**
 * @typedef {Object} Count — `publication.count`'s four numbers and the claim (`Count`)
 * @property {number} l the links published with the version
 * @property {number} n the formatting marks that re-make nothing
 * @property {number} r the retractions no re-make covers
 * @property {number} e the re-makes
 * @property {boolean} claim whether the one write carries the edition claim
 * @property {string[]} readWith the read-with entries the switches need
 * @property {string[]} supersede the daughters the one write claims superseded
 */

/**
 * @typedef {Object} Price — the five terms against their caps (`Price`)
 * @property {number[]} lists the six lists' counts: runs, places, links, retract, read_with, originals
 * @property {number} body the signed body's bytes
 * @property {number} values the distinct draft-native positions
 * @property {number} reads the in-lock reads
 * @property {number} bytes the staged bytes
 * @property {Array<{term: Term, by: number}>} over each term past its cap, and by how much; empty where none is
 */

/** @param {unknown} v @returns {Count} */
function countOf(v) {
  const c = object(v);
  return { l: number(c.l), n: number(c.n), r: number(c.r), e: number(c.e), claim: boolean(c.claim), readWith: strings(c.read_with), supersede: strings(c.supersede) };
}

/** @param {unknown} v @returns {Price} */
function priceOf(v) {
  const p = object(v);
  return { lists: array(p.lists).map(number), body: number(p.body), values: number(p.values), reads: number(p.reads), bytes: number(p.bytes), over: array(p.over).map((o) => { const x = object(o); return { term: oneOf(x.term, TERMS), by: number(x.by) }; }) };
}

/** `publication.count` → the count and the price as the switches stand; null where a member is not as declared */
export function decodeCount(/** @type {unknown} */ answer) {
  return decode(answer, (a) => ({ count: countOf(a.count), price: priceOf(a.price) }));
}

/**
 * @typedef {Object} LinkSpans — a stored link's three slots as spans, and the position of the commit that minted it (`LinkValue`)
 * @property {Array<{start: string, width: string}>} from
 * @property {Array<{start: string, width: string}>} to
 * @property {Array<{start: string, width: string}>} ty
 * @property {number | null} at null where the board serves none
 */

/**
 * @typedef {Object} PublicationRow — one set of the panel (`PublicationRow`)
 * @property {string} home the set
 * @property {RowKind} kind own, notes, private, or public with whether the edition is read with it
 * @property {string} label the home's first line, rendered inert
 * @property {string[]} links the row's offered links by address
 * @property {Array<{ty: string, n: number, far: string[]}>} types the fold by type
 * @property {{p: number, d: number, c: number, t: number, u: number}} line the five counts P3's lines are drawn from
 * @property {number} readThrough the private move's share where the row stays off
 */

/**
 * @typedef {Object} Removal — one held removal on the panel's job list (`Removal`)
 * @property {string} record the `3.24` record in the draft
 * @property {string} mark the published mark it names
 * @property {LinkSpans} markValue the mark's value as stored
 * @property {boolean} onSelection whether the mark is on the selection's words
 * @property {boolean} spent whether a retraction of it already stands
 * @property {string | null} remake the formatting-line mark that re-makes it; null where none does
 */

/**
 * @typedef {Object} Window — one window of the selection P2 (i) asks its answers at (`Window`)
 * @property {number} run the run's index in the selection, the first half of the `⟨run⟩.⟨part⟩` key `answers` take
 * @property {string} origin
 * @property {string} owner the origin's account
 * @property {number} iStart where in the origin the passage was written
 * @property {number} width
 */

/**
 * @typedef {Object} PublicationPanel — `publication.open`'s answer (`PublicationPanel`): the composition's first steps, every member data
 * @property {PublicationRow[]} rows the sets in the ruled order
 * @property {{marks: string[], cut: number, removals: Removal[]}} formatting the formatting line
 * @property {Record<string, boolean>} readWith per published document of the person's, whether the edition is read with it now
 * @property {Count} count at the switches' default
 * @property {Price} price as the request would stand with every window part a record names taken by its counterpart and every
 * other kept private
 * @property {Window[]} windows
 * @property {Array<{draft: string, passages: number}>} inherited per draft `also` names, the statement's count
 * @property {BaseStanding | null} standing the base typed against the document's head; null at the mint form
 * @property {string[]} leftBehind the drafts of the family this publication leaves behind
 * @property {{since: number} | null} hold a held publication re-opened as it stands; null where none stood
 */

/** @param {unknown} v @returns {Array<{start: string, width: string}>} */
const spansOf = (v) => array(v).map((s) => { const x = object(s); return { start: string(x.start), width: string(x.width) }; });
/** @type {Record<Extract<RowKind, string>, null>} the kinds of a panel's set but public, which carries whether the edition is read with it (`RowKind`) */
const ROW_KINDS = { own: null, notes: null, private: null };
/** @param {unknown} v @returns {RowKind} */
function rowKindOf(v) {
  if (typeof v === 'string') return oneOf(v, ROW_KINDS);
  const pub = object(object(v).public);
  return { public: { read_with: boolean(pub.read_with) } };
}

/** `publication.open` → the panel, its rows, formatting, windows and standing typed; null where a member is not as declared */
export function decodePublicationPanel(/** @type {unknown} */ answer) {
  return decode(answer, (a) => {
    const formatting = object(a.formatting);
    /** @type {PublicationPanel} */
    const panel = {
      rows: array(a.rows).map((r) => {
        const x = object(r), line = object(x.line);
        return {
          home: string(x.home), kind: rowKindOf(x.kind), label: string(x.label), links: strings(x.links),
          types: array(x.types).map((t) => { const y = object(t); return { ty: string(y.ty), n: number(y.n), far: strings(y.far) }; }),
          line: { p: number(line.p), d: number(line.d), c: number(line.c), t: number(line.t), u: number(line.u) }, readThrough: number(x.read_through),
        };
      }),
      formatting: {
        marks: strings(formatting.marks), cut: number(formatting.cut),
        removals: array(formatting.removals).map((m) => {
          const x = object(m), v = object(x.mark_value);
          return { record: string(x.record), mark: string(x.mark), markValue: { from: spansOf(v.from), to: spansOf(v.to), ty: spansOf(v.ty), at: opt(v.at, number) }, onSelection: boolean(x.on_selection), spent: boolean(x.spent), remake: opt(x.remake, string) };
        }),
      },
      readWith: Object.fromEntries(Object.entries(object(a.read_with)).map(([k, v]) => [k, boolean(v)])),
      count: countOf(a.count), price: priceOf(a.price),
      windows: array(a.windows).map((w) => {
        const x = object(w);
        return { run: number(x.run), origin: string(x.origin), owner: string(x.owner), iStart: number(x.i_start), width: number(x.width) };
      }),
      inherited: array(a.inherited).map((i) => { const x = object(i); return { draft: string(x.draft), passages: number(x.passages) }; }),
      standing: opt(a.standing, (s) => oneOf(s, STANDINGS)), leftBehind: strings(a.left_behind),
      hold: opt(a.hold, (h) => ({ since: number(object(h).since) })),
    };
    return panel;
  });
}

/**
 * @typedef {Object} Acknowledged — `publication.confirm`'s acknowledgment (`Acknowledged`): the commit stands
 * @property {'acknowledged'} outcome
 * @property {string} member the member minted
 * @property {string | null} edition the edition minted at the mint form; null at the document form
 * @property {boolean} claim whether the edition claim rode in the write
 * @property {string[]} supersede the daughters the write claimed superseded
 * @property {number} at the commit's position
 * @property {AckVia} via how the acknowledgment was reached
 */

/**
 * @typedef {Object} Restated — `publication.confirm`'s re-statement (`Restated`): the re-read found the draft moved; nothing sent
 * @property {'restated'} outcome
 * @property {string[]} left links gone or retracted
 * @property {string[]} superseded links a claim of the person's superseded since
 * @property {string[]} came links arrived
 * @property {string[]} removalsUndone
 * @property {string[]} removalsCame
 * @property {Array<{run: number, placement: Placement}>} selection held runs whose placement changed, with where each stands now
 * @property {{at: number, key: string | null, signed: boolean} | null} race the feed's newest row under the draft the refusal named — whose write moved the words; null where the re-statement follows no `kept_place_moved`
 * @property {BaseStanding | null} standing the base's standing where it moved since the panel; null where it stands
 */

/**
 * @typedef {Object} PublicationRefused — `publication.confirm`'s typed refusal (`PublicationRefused`): nothing published
 * @property {'refused'} outcome
 * @property {string} arm the refusal's arm by name
 * @property {Record<string, unknown>} data the arm's own members beside it — the twin's `member` and `missing`, `kept_place_moved`'s `index`, `draft` and `race`, `over_cap`'s `over`, `older_board`'s `detail`, `claim_refused`'s `edition`, `base_superseded`'s `first`, and the rest as the arm carries them
 */

/** @param {unknown} v @returns {Placement} */
function placedOf(v) {
  if (v === 'absent') return 'absent';
  const p = object(v);
  if (p.whole != null) return { whole: { ordinal: number(object(p.whole).ordinal) } };
  return { split: array(p.split).map((t) => { const x = array(t); if (x.length !== 3) fail(); return /** @type {[number, number, number]} */ ([number(x[0]), number(x[1]), number(x[2])]); }) };
}

/** `publication.confirm`'s acknowledgment → the member and how it was reached; null for the re-statement, the refusal or a malformed answer */
export function decodeAcknowledged(/** @type {unknown} */ answer) {
  return decode(answer, (a) => (a.outcome === 'acknowledged'
    ? /** @type {Acknowledged} */ ({ outcome: 'acknowledged', member: string(a.member), edition: opt(a.edition, string), claim: boolean(a.claim), supersede: strings(a.supersede), at: number(a.at), via: oneOf(a.via, ACK_VIAS) })
    : fail()));
}

/** `publication.confirm`'s re-statement → what moved since the panel; null for the acknowledgment, the refusal or a malformed answer */
export function decodeRestated(/** @type {unknown} */ answer) {
  return decode(answer, (a) => (a.outcome === 'restated'
    ? /** @type {Restated} */ ({
      outcome: 'restated', left: strings(a.left), superseded: strings(a.superseded), came: strings(a.came), removalsUndone: strings(a.removals_undone), removalsCame: strings(a.removals_came),
      selection: array(a.selection).map((s) => { const x = object(s); return { run: number(x.run), placement: placedOf(x.placement) }; }),
      race: opt(a.race, (r) => { const x = object(r); return { at: number(x.at), key: opt(x.key, string), signed: boolean(x.signed) }; }),
      standing: opt(a.standing, (s) => oneOf(s, STANDINGS)),
    })
    : fail()));
}

/** `publication.confirm`'s refusal → its arm and the arm's own members; null for the acknowledgment, the re-statement or a malformed answer */
export function decodePublicationRefused(/** @type {unknown} */ answer) {
  return decode(answer, (a) => {
    if (a.outcome !== 'refused') fail();
    const { outcome, arm, ...data } = a;
    void outcome;
    return /** @type {PublicationRefused} */ ({ outcome: 'refused', arm: string(arm), data });
  });
}

/**
 * `publication.confirm`'s answer, whichever of its three outcomes it is:
 * the acknowledgment, the re-statement or the typed refusal; null where it is
 * none of them, or malformed.
 * @param {unknown} answer
 * @returns {Acknowledged | Restated | PublicationRefused | null}
 */
export function decodeConfirmed(answer) {
  return decodeAcknowledged(answer) || decodeRestated(answer) || decodePublicationRefused(answer);
}

/**
 * `merge.land`'s answer, whichever of its three outcomes it is: the landing,
 * the panel's re-statement or its typed refusal; null where it is none of
 * them, or malformed.
 * @param {unknown} answer
 * @returns {MergeLanded | Restated | PublicationRefused | null}
 */
export function decodeLanding(answer) {
  return decodeMergeLanded(answer) || decodeRestated(answer) || decodePublicationRefused(answer);
}
