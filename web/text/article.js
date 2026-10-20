// T-ARTICLE — a document's article as HTML from its record and the view
// state handed in (the structure record §3.2 "T-ARTICLE"). Layer 2. PURE: a
// function of values (FP-8); no DOM, no state.
// The head (the address, the state line, the byline — never a name alone,
// R44 — the presence indicator with its ⟡); the blocks with their marks —
// the selection (a byte span: every block it touches is marked, the
// platform's highlight showing the bytes themselves), the focus (a block),
// the owner's and the person's links in place (the
// marks LK decided, hue the linker's), the transcluded runs' sameness
// boundary with the origin's label (the hairline, whole at the first run of
// that origin, compact after), the entitled reader's mark C-33 on a
// draft-origin run in a published document, the "+⟨n⟩ others" count at the
// block's edge, the symbols the reveal asked for; the withheld block
// OCCUPYING its positions with R56's arm by PUB-5.121's order and C-67's
// clause beneath; a record atom rendered as the record it is (the genesis
// record's words); an unknown item kind "not rendered" with its width; the
// scene-mode variant. THE CORNER's items — an edition's state with "version
// ⟨k⟩ of ⟨n⟩" and R20's teaching, a draft's kept state and its chip (C-28, at
// the document's corner and never the HUD — ux-T2; the record §3.4 (viii)),
// the whole-document link count — are made here too, and stand OUTSIDE the
// article: the article's box clips whatever stands past its measure, so the
// corner's element is its holder's, T-LAYER's beside the article on the
// plane and each pane's own in the scene (foundations §3.1).
// THE PLAN (`articlePlan`): the same article as P-LAY's rows — the head's
// lines, each block's text at its size with the inline pieces it carries
// (the hairline's label, C-33's mark, the symbols, the others' count), a
// record's words and keys, the line a reference, an item not rendered or an
// empty document takes, a withheld run's width, the scene-offers — which
// P-LAY lays out as the bars the canvas draws below reading scale, so the
// handoff swaps bars for text and no line moves (law 8; S1 Q7). The HTML and
// the plan are made from one walk of the document (`walk`), so the two can
// never decide a block differently; every size and gap the plan carries is
// P-LAY's shared measurement, which the CSS reads too.
// The structural family (headings, emphasis) is the owner's formatting:
// rendered as formatting, never marked (rule (iii)) — here the corpus's own
// markdown headings are set as headings.
// Carries: the wireframe's §16 `articleHTML`, `withheldBlock`.
// Rules: FP-1, FP-2, FP-8, FP-10 (reads LK/selection/focus as values).

import { esc, fingerprintCue, sliceBytes, byteLength } from '../util.js';
import { t } from '../strings.js';
import { memberOf, documentOf } from '../model/address.js';
import { touches } from './span.js';
import { MEASURE, BORDER, borderEm, headingSize } from '../plane/layout.js';

/** @typedef {import('../model/records.js').Doc} Doc */
/** @typedef {import('../model/records.js').Block} Block */
/** @typedef {import('../model/records.js').Origin} Origin */
/** @typedef {import('../links/links.js').Shown} Shown */
/** @typedef {import('./span.js').Span} Span */
/** @typedef {import('../plane/layout.js').Row} Row */
/** @typedef {import('../plane/layout.js').Piece} Piece */

/**
 * @typedef {Object} ArticleView — the view state the article renders, handed in as values
 * @property {Span | null} selected the selected span (O-SELECTION's): the blocks it touches are marked
 * @property {{addr: string, pos: number} | null} focus the focused block (N-WALK's), by its first position
 * @property {Shown[]} marks the links to mark in place (LK.shown)
 * @property {Shown[]} symbols the symbols at their spans (LK.symbols)
 * @property {(block: Block) => {n: number, social: boolean}} countAt the others' count per block (LK.countAt)
 * @property {number} wholeLinks the links to this document as a whole
 * @property {string | null} sessionAccount the acting account, or null (a guest)
 * @property {boolean} localTrust the board's flag (the chip's form)
 * @property {boolean} notebook the venue
 * @property {boolean} scene the scene-mode variant
 * @property {Map<string, 'edition' | 'draft' | 'unknown'>} originKinds the kind of each origin document (for C-33)
 * @property {string | null} deviceLabel the owner's device label where known
 * @property {string | null} ownerFingerprint the owner's device key fingerprint where known
 * @property {boolean} keyPresent is the owner's key on this device (the owner is the person)
 */

/**
 * @typedef {Object} Head — the head's lines
 * @property {string} addr
 * @property {string} state the state line
 * @property {string} by the byline
 * @property {string} presence the presence line, '' where no link touches
 */

/**
 * @typedef {Object} Seg — a stretch of one block's text between two cuts, with what marks it
 * @property {string} text the document's characters over it
 * @property {Shown[]} marks the links marked over it
 * @property {Origin | null} origin the transcluded run it lies in
 * @property {boolean} whole the first stretch of its origin in the article: its hairline labelled whole
 * @property {boolean} c33 it carries C-33's mark: a draft's run in a published document
 */

/**
 * @typedef {Object} Rec — a record atom as it renders (the record rule)
 * @property {'skep-enroll' | 'skep-head' | null} type null where it is not rendered
 * @property {string} words its words
 * @property {string} keys an enrolment's keys, '' where none
 * @property {unknown} position the head record's position
 * @property {string} chain the head record's chain, cut to its first twelve characters
 */

/**
 * @typedef {Object} Part — one block of the article as the walk decided it
 * @property {Block} b
 * @property {'withheld' | 'record' | 'ref' | 'hex' | 'para'} kind
 * @property {number} level a paragraph's heading level, 0 for a paragraph
 * @property {Seg[]} segs a paragraph's stretches
 * @property {Shown[]} syms the symbols at a paragraph
 * @property {{n: number, social: boolean}} count the others' count at a paragraph
 * @property {Rec | null} rec a record atom's record
 */

/**
 * @typedef {Object} Walk — the article as one walk of the document decided it: both renderings are made from this
 * @property {string} owner
 * @property {Head} head
 * @property {Part[] | null} parts the blocks; null where a read refused the document (the head alone stands)
 * @property {boolean} empty the document holds no position
 * @property {string[]} offers the documents this one windows (the scene-offers), none in the scene
 */

/**
 * A heading's level where a paragraph is a markdown heading, else 0 (the
 * structural family rendered as formatting, never marked).
 * @param {string} text
 */
export const headingLevel = (text) => { const m = /^(#{1,6})\s/.exec(text); return m ? m[1].length : 0; };

/**
 * The record rule: a record atom that names its type renders as the record
 * it is (D13) — the genesis record to its account's owner and to a reader;
 * the head record `skep-head`; any other atom "not rendered" with its width.
 * @param {Block} b
 * @param {Doc} d
 * @param {ArticleView} v
 * @returns {Rec}
 */
function recordOf(b, d, v) {
  /** @type {{type?: string, keys?: Array<{label?: string, anchor?: boolean}>, position?: number, chain?: string} | null} */
  let rec = null;
  try { rec = JSON.parse(b.text); } catch { rec = null; }
  if (rec && rec.type === 'skep-enroll') {
    const yours = v.sessionAccount && d.account === v.sessionAccount;
    const words = yours ? t('F.home-record.yours') : t('F.home-record.other', { owner: d.account || '' });
    const keys = (rec.keys || []).map((k) => `${k.label || ''} · ${k.anchor ? 'ANCHOR' : 'device'}`).join(' · ');
    return { type: 'skep-enroll', words, keys, position: null, chain: '' };
  }
  if (rec && rec.type === 'skep-head') {
    const chain = String(rec.chain || '').slice(0, 12);
    return { type: 'skep-head', words: `skep-head position ${rec.position ?? ''} · chain ${chain}…`, keys: '', position: rec.position ?? '', chain };
  }
  return { type: null, words: t('F.not-rendered', { width: b.width }), keys: '', position: null, chain: '' };
}

/**
 * The record rule's HTML (`recordOf`).
 * @param {Block} b
 * @param {Doc} d
 * @param {ArticleView} v
 */
export function recordHTML(b, d, v) {
  const r = recordOf(b, d, v);
  if (r.type === 'skep-enroll') return `<span class="rec" data-rec="skep-enroll"><span class="rec-words">${esc(r.words)}</span><span class="derived">${esc(r.keys)}</span></span>`;
  if (r.type === 'skep-head') return `<span class="rec" data-rec="skep-head"><span class="k">skep-head</span> position ${esc(r.position)} · chain ${esc(r.chain)}…</span>`;
  return `<span class="rec not-rendered">${esc(r.words)}</span>`;
}

/**
 * The R56 placeholder occupying a withheld run: existence and owner, never
 * bytes; the entitlement arm by PUB-5.121's order — for the acting person
 * with a key present and no grant, the owner-grant default; for a guest
 * with no key, the key-absent default — then C-67's clause.
 * @param {Block} b
 * @param {Doc} d
 * @param {ArticleView} v
 * @param {string} owner the origin's owner account
 */
export function withheldBlockHTML(b, d, v, owner) {
  const head = t('B1.withheld-run', { owner, account: owner, width: b.width, origin: b.origin || '' });
  const arm = v.sessionAccount ? t('C-36.owner-grant.arm') : t('R56.key-absent', { owner });
  return `<span class="withheld" data-pos="${b.pos}" data-width="${b.width}" data-withheld="1" data-origin="${esc(b.origin || '')}">` +
    `<span class="wh-head">${esc(head)}</span><span class="arm">${esc(arm)}</span><span class="clause">${esc(t('C-67.pointer'))}</span></span>`;
}

/**
 * The corner's items in foundations' one order (§3.1): an edition's state
 * with "version ⟨k⟩ of ⟨n⟩" and R20's teaching, keyed by venue; a draft's
 * chip (C-28); the whole-document link count (rule (i)). The holder makes
 * the element they stand in (`data-corner` naming the document), which is
 * the corner's one stop: no item takes a focus of its own (D5 K-57).
 * @param {Doc} d
 * @param {ArticleView} v
 */
export function cornerHTML(d, v) {
  const parts = [];
  const published = d.meta ? d.meta.published : d.kind === 'edition';
  const k = memberOf(d.addr);
  if (d.refused === 'withheld') parts.push(`<span class="st">${esc(t('F.corner.withheld', { owner: d.account || '' }))}</span>`);
  else if (published) {
    const first = v.notebook ? t('F.published.notebook') : t('F.published');
    const n = d.members;
    if (d.meta && d.meta.birth === null && !k) parts.push(`<span class="st">${esc(t('F.corner.no-versions', { published: first }))}</span>`);
    else if (k) parts.push(`<span class="st">${esc(t('F.corner.pinned', { published: first, k }))}</span>`);
    else parts.push(`<span class="st">${esc(t('F.corner.latest', { published: first }))}</span>`);
    if (n != null && n >= 1 && (d.meta && d.meta.birth)) parts.push(`<span class="version" data-members="${n}">${esc(t('F.version-of', { k: k || n, n }))}</span>`);
  } else if (d.kind === 'draft') {
    const chip = v.localTrust ? t('C-28.flag-on') : t('C-28');
    parts.push(`<span class="chip" data-chip="1">${esc(chip)}</span>`);
  }
  if (v.wholeLinks > 0) parts.push(`<span class="whole-links">${esc(v.wholeLinks === 1 ? t('F.whole-links.1') : t('F.whole-links', { n: v.wholeLinks }))}</span>`);
  return parts.join('');
}

/**
 * The stretches of one block's text: cut at the edges of the owner's and the
 * person's links (LK's set) and of the transcluded runs, each with what marks
 * it; the first stretch of each origin in the article labelled whole.
 * @param {Block} b
 * @param {Doc} d
 * @param {ArticleView} v
 * @param {Set<string>} labelled the origins already labelled whole in this article
 * @returns {Seg[]}
 */
function segmentsOf(b, d, v, labelled) {
  // cut points in positions: the block's edges, every mark's edges, every origin's edges
  const cuts = new Set([b.pos, b.pos + b.width]);
  const marks = v.marks.filter((m) => m.pos < b.pos + b.width && b.pos < m.pos + m.width);
  for (const m of marks) { cuts.add(Math.max(b.pos, m.pos)); cuts.add(Math.min(b.pos + b.width, m.pos + m.width)); }
  const origins = d.origins.filter((o) => o.pos < b.pos + b.width && b.pos < o.pos + o.width);
  for (const o of origins) { cuts.add(Math.max(b.pos, o.pos)); cuts.add(Math.min(b.pos + b.width, o.pos + o.width)); }
  const points = [...cuts].sort((a, c) => a - c);
  const total = byteLength(b.text);
  const published = d.meta ? d.meta.published : d.kind === 'edition';
  /** @type {Seg[]} */
  const out = [];
  for (let i = 0; i + 1 < points.length; i++) {
    const p0 = points[i], p1 = points[i + 1];
    const text = sliceBytes(b.text, p0 - b.pos, Math.min(total, p1 - b.pos));
    if (!text) continue;
    const origin = origins.find((o) => o.pos < p1 && p0 < o.pos + o.width) || null;
    const whole = !!origin && !labelled.has(origin.doc);
    if (origin && whole) labelled.add(origin.doc);
    const c33 = !!origin && (v.originKinds.get(origin.doc) || 'unknown') === 'draft' && published;
    out.push({ text, marks: marks.filter((m) => m.pos < p1 && p0 < m.pos + m.width), origin, whole, c33 });
  }
  return out;
}

/**
 * The head's lines: the address, the state line, the byline, and the
 * presence line where links touch.
 * @param {Doc} d
 * @param {ArticleView} v
 * @param {string} owner
 * @returns {Head}
 */
function headOf(d, v, owner) {
  const cue = v.ownerFingerprint ? fingerprintCue(v.ownerFingerprint) : '⟨fingerprint⟩';
  const label = v.deviceLabel || '⟨device label⟩';
  const published = d.meta ? d.meta.published : d.kind === 'edition';
  const state = d.refused === 'withheld' ? t('F.corner.withheld', { owner })
    : d.refused === 'unregistered' ? t('B1.doc_not_registered', { address: d.addr })
    : published ? t('B1.state-line') : t('F.label.draft');
  const touching = v.marks.length;
  const presence = touching ? (touching === 1 ? t('B1.presence.1') : t('B1.presence', { n: touching })) : '';
  return { addr: d.addr, state, by: `${owner} · ${label} · ${cue}`, presence };
}

/**
 * The one walk of a document both renderings are made from: the head, then
 * each block decided once — withheld, a record, a reference, an item not
 * rendered, or a paragraph with its heading level, its stretches, its
 * symbols and its others' count — then the empty document's line and the
 * scene-offers.
 * @param {Doc} d
 * @param {ArticleView} v
 * @param {string} ownerAccount the owner by `effective_owner`, or the document's account
 * @returns {Walk}
 */
function walk(d, v, ownerAccount) {
  const owner = ownerAccount || d.account || '';
  const head = headOf(d, v, owner);
  if (d.refused) return { owner, head, parts: null, empty: false, offers: [] };
  /** @type {Set<string>} */
  const labelled = new Set();
  const none = { n: 0, social: false };
  /** @type {Part[]} */
  const parts = d.blocks.map((b) => {
    /** @type {Part} */
    const p = { b, kind: 'para', level: 0, segs: [], syms: [], count: none, rec: null };
    if (b.kind === 'withheld') p.kind = 'withheld';
    else if (b.kind === 'atom') { p.kind = 'record'; p.rec = recordOf(b, d, v); }
    else if (b.kind === 'ref' || b.kind === 'hex') p.kind = b.kind;
    else {
      p.level = headingLevel(b.text);
      p.segs = segmentsOf(b, d, v, labelled);
      p.syms = v.symbols.filter((s) => s.pos < b.pos + b.width && b.pos < s.pos + s.width);
      p.count = v.countAt(b);
    }
    return p;
  });
  // the scene-offer at a document that windows another (UXQ-14)
  const offers = v.scene ? [] : [...new Set(d.origins.map((o) => documentOf(o.doc) || o.doc))].filter((w) => w !== documentOf(d.addr));
  return { owner, head, parts, empty: !d.blocks.length && d.extent === 0, offers };
}

/** a stretch of a paragraph's text as HTML: its marks and its sameness boundary, the text's own characters untouched */
function segHTML(/** @type {Seg} */ s) {
  const cls = ['seg'];
  const attrs = [];
  if (s.marks.length) {
    cls.push('lip', 'depth' + Math.min(3, s.marks.length));
    attrs.push(`style="--mark-hue:${s.marks[0].mark.hue};--mark-value:${s.marks[0].mark.value}"`, `data-links="${s.marks.map((m) => m.link.addr).join(' ')}"`);
    if (s.marks.every((m) => m.mark.value < 1)) cls.push('visited');
  }
  if (s.origin) {
    const o = s.origin.doc;
    cls.push('same');
    attrs.push(`data-origin="${esc(o)}"`);
    const mark = s.c33 ? `<span class="pubmark" data-mark="C-33">${esc(t('C-33'))}</span>` : '';
    return `<span class="${cls.join(' ')}" ${attrs.join(' ')}><span class="hairline ${s.whole ? 'whole' : 'compact'}" data-src="${esc(o)}" title="${esc(o)}">${s.whole ? '≡ ' + esc(o) : '≡'}</span>${mark}${esc(s.text)}</span>`;
  }
  return cls.length > 1 ? `<span class="${cls.join(' ')}" ${attrs.join(' ')}>${esc(s.text)}</span>` : esc(s.text);
}

/**
 * The article: the head and the blocks (each a span the walk and the mirror
 * key by its first position, and a click selects whole); its corner stands
 * beside it (`cornerHTML`).
 * @param {Doc} d
 * @param {ArticleView} v
 * @param {string} ownerAccount the owner by `effective_owner`, or the document's account
 * @returns {string}
 */
export function articleHTML(d, v, ownerAccount) {
  const w = walk(d, v, ownerAccount);
  const hd = w.head;
  let h = `<div class="hd"><span class="addr">${esc(hd.addr)}</span><span class="st">${esc(hd.state)}</span><span class="by">${esc(hd.by)}</span>`;
  if (hd.presence) h += `<span class="pres"><span class="sym reveal" data-reveal="${esc(d.addr)}" role="button" tabindex="-1">⟡</span> ${esc(hd.presence)}</span>`;
  h += `</div>`;
  if (!w.parts) return h;
  let run = '';
  for (const p of w.parts) {
    const b = p.b;
    if (p.kind === 'withheld') { run += withheldBlockHTML(b, d, v, w.owner); continue; }
    const sel = v.selected && v.selected.addr === d.addr && touches(b, v.selected);
    const foc = v.focus && v.focus.addr === d.addr && v.focus.pos === b.pos;
    const cls = ['sp', 'blk-' + b.kind];
    if (sel) cls.push('sel');
    if (foc) cls.push('lit');
    const at = `data-addr="${esc(d.addr)}" data-pos="${b.pos}" data-width="${b.width}"`;
    if (p.kind === 'record') { run += `<span class="${cls.join(' ')}" ${at}>${recordHTML(b, d, v)}</span>`; continue; }
    if (p.kind === 'ref') { run += `<span class="${cls.join(' ')} ref" ${at}>⟡</span>`; continue; }
    if (p.kind === 'hex') { run += `<span class="${cls.join(' ')}" ${at}>${esc(t('F.not-rendered', { width: b.width }))}</span>`; continue; }
    const tag = p.level ? 'h' + Math.min(6, p.level + 1) : 'p';
    const syms = p.syms.map((s) => `<span class="sym ${s.linker === 'others' ? 'other' : ''} ${s.mark.value < 1 ? 'visited' : ''}" data-link="${esc(s.link.addr)}" style="--mark-hue:${s.mark.hue};--mark-value:${s.mark.value}" role="button" tabindex="-1" title="${esc(s.link.type || '')}">⟡</span>`).join('');
    const count = p.count.n > 0 ? `<span class="others" data-count="${p.count.n}">${esc(t('F.others-count', { n: p.count.n }))}</span>` : p.count.social ? `<span class="others social" data-count="0">◦</span>` : '';
    run += `<${tag} class="${cls.join(' ')}" ${at}>${p.segs.map(segHTML).join('')}${syms}${count}</${tag}>`;
  }
  if (w.empty) run += `<p class="sp empty" data-addr="${esc(d.addr)}" data-pos="1" data-width="0">${esc(t('B1.empty_subspace'))}</p>`;
  for (const o of w.offers) run += `<span class="offer" data-scene="${esc(d.addr)}|${esc(o)}" role="button" tabindex="-1">${esc(t('B1.scene-offer', { D: o }))}</span>`;
  return h + `<div class="run">${run}</div>`;
}

/**
 * A stretch of text, sized in the body's em.
 * @param {string} chars
 * @param {number} size
 * @param {number} [lead] the room before it, in the body's em
 * @param {number} [trail] the room after it, in the body's em
 * @returns {Piece}
 */
const piece = (chars, size, lead = 0, trail = 0) => ({ text: chars, size, lead, trail, box: false });
/**
 * A link's symbol: an inline-block at its size, its border and padding either side, the room before it.
 * @param {number} k the size of the line it stands in, in the body's em
 * @returns {Piece}
 */
const symbol = (k) => {
  const s = MEASURE.sym * k, edge = borderEm(BORDER.box) + MEASURE.symPad * s;
  return { text: '⟡', size: s, lead: MEASURE.symGap * s + edge, trail: edge, box: true };
};
/**
 * A row of the plan.
 * @param {Row['kind']} kind
 * @param {number | null} pos the block it opens
 * @param {Piece[]} pieces
 * @param {{after?: number, before?: number, float?: Piece | null, width?: number}} [o] its margins in the body's em, its float, a withheld run's width
 * @returns {Row}
 */
const row = (kind, pos, pieces, o = {}) => ({ kind, pos, pieces, float: o.float ?? null, before: o.before ?? 0, after: o.after ?? 0, width: o.width ?? 0 });

/**
 * A paragraph's inline pieces at its size: each stretch of its text, a
 * transcluded stretch led by its sameness boundary, its hairline's label and
 * C-33's mark where it carries one; then its symbols.
 * @param {Part} p
 * @param {number} k the paragraph's size, in the body's em
 * @returns {Piece[]}
 */
function paraPieces(p, k) {
  /** @type {Piece[]} */
  const out = [];
  for (const s of p.segs) {
    if (s.origin) {
      const l = MEASURE.label * k, m = MEASURE.mark * k, edge = borderEm(BORDER.box) + MEASURE.markPad * m;
      out.push(piece(s.whole ? '≡ ' + s.origin.doc : '≡', l, borderEm(BORDER.same) + MEASURE.samePad * k, MEASURE.labelGap * l));
      if (s.c33) out.push({ text: t('C-33'), size: m, lead: edge, trail: edge + MEASURE.markGap * m, box: true });
    }
    out.push(piece(s.text, k));
  }
  out.push(...p.syms.map(() => symbol(k)));
  return out;
}

/**
 * The article as P-LAY's plan: the head's lines, each block's rows at its
 * size with the gap after it, the empty document's line, the scene-offers —
 * from the same walk the HTML is made from.
 * @param {Doc} d
 * @param {ArticleView} v
 * @param {string} ownerAccount the owner by `effective_owner`, or the document's account
 * @returns {Row[]}
 */
export function articlePlan(d, v, ownerAccount) {
  const w = walk(d, v, ownerAccount);
  const H = MEASURE.head, gap = MEASURE.gap;
  /** @type {Row[]} */
  const rows = [row('head', null, [piece(w.head.addr, 1)]), row('head', null, [piece(w.head.state, H)]), row('head', null, [piece(w.head.by, H)])];
  if (w.head.presence) rows.push(row('head', null, [symbol(H), piece(' ' + w.head.presence, H)]));
  if (!w.parts) return rows;
  for (const p of w.parts) {
    const b = p.b;
    if (p.kind === 'withheld') rows.push(row('withheld', b.pos, [], { after: gap, width: b.width }));
    else if (p.kind === 'record' && p.rec) {
      if (p.rec.keys) rows.push(row('text', b.pos, [piece(p.rec.words, 1)]), row('text', null, [piece(p.rec.keys, MEASURE.derived)], { after: gap }));
      else rows.push(row('text', b.pos, [piece(p.rec.words, 1)], { after: gap }));
    } else if (p.kind === 'ref') rows.push(row('text', b.pos, [piece('⟡', 1)], { after: gap }));
    else if (p.kind === 'hex') rows.push(row('text', b.pos, [piece(t('F.not-rendered', { width: b.width }), 1)], { after: gap }));
    else {
      const k = headingSize(p.level), c = MEASURE.count * k;
      const float = p.count.n > 0 ? piece(t('F.others-count', { n: p.count.n }), c, MEASURE.countGap * c) : p.count.social ? piece('◦', c, MEASURE.countGap * c) : null;
      rows.push(row('text', b.pos, paraPieces(p, k), { after: gap * k, float }));
    }
  }
  if (w.empty) rows.push(row('text', 1, [piece(t('B1.empty_subspace'), 1)], { after: gap }));
  const O = MEASURE.offer;
  for (const o of w.offers) rows.push(row('chrome', null, [piece(t('B1.scene-offer', { D: o }), O)], { before: MEASURE.offerGap * O, after: MEASURE.offerGap * O }));
  return rows;
}
