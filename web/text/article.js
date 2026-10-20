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
// The structural family (headings, emphasis) is the owner's formatting:
// rendered as formatting, never marked (rule (iii)) — here the corpus's own
// markdown headings are set as headings.
// Carries: the wireframe's §16 `articleHTML`, `withheldBlock`.
// Rules: FP-1, FP-2, FP-8, FP-10 (reads LK/selection/focus as values).

import { esc, fingerprintCue, sliceBytes, byteLength } from '../util.js';
import { t } from '../strings.js';
import { memberOf, documentOf } from '../model/address.js';
import { touches } from './span.js';

/** @typedef {import('../model/records.js').Doc} Doc */
/** @typedef {import('../model/records.js').Block} Block */
/** @typedef {import('../links/links.js').Shown} Shown */
/** @typedef {import('./span.js').Span} Span */

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
 */
export function recordHTML(b, d, v) {
  /** @type {{type?: string, keys?: Array<{label?: string, anchor?: boolean}>, position?: number, chain?: string} | null} */
  let rec = null;
  try { rec = JSON.parse(b.text); } catch { rec = null; }
  if (rec && rec.type === 'skep-enroll') {
    const yours = v.sessionAccount && d.account === v.sessionAccount;
    const words = yours ? t('F.home-record.yours') : t('F.home-record.other', { owner: d.account || '' });
    const keys = (rec.keys || []).map((k) => `${esc(k.label || '')} · ${k.anchor ? 'ANCHOR' : 'device'}`).join(' · ');
    return `<span class="rec" data-rec="skep-enroll"><span class="rec-words">${esc(words)}</span><span class="derived">${keys}</span></span>`;
  }
  if (rec && rec.type === 'skep-head') {
    return `<span class="rec" data-rec="skep-head"><span class="k">skep-head</span> position ${esc(rec.position ?? '')} · chain ${esc(String(rec.chain || '').slice(0, 12))}…</span>`;
  }
  return `<span class="rec not-rendered">${esc(t('F.not-rendered', { width: b.width }))}</span>`;
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
 * The marks on one block's text: the owner's and the person's links at their
 * spans (LK's set), the transcluded runs (the sameness boundary), each
 * segment a span with its classes; the text's own characters untouched.
 * @param {Block} b
 * @param {Doc} d
 * @param {ArticleView} v
 * @param {Set<string>} labelled the origins already labelled whole in this article
 */
function blockTextHTML(b, d, v, labelled) {
  // cut points in positions: the block's edges, every mark's edges, every origin's edges
  const cuts = new Set([b.pos, b.pos + b.width]);
  const marks = v.marks.filter((m) => m.pos < b.pos + b.width && b.pos < m.pos + m.width);
  for (const m of marks) { cuts.add(Math.max(b.pos, m.pos)); cuts.add(Math.min(b.pos + b.width, m.pos + m.width)); }
  const origins = d.origins.filter((o) => o.pos < b.pos + b.width && b.pos < o.pos + o.width);
  for (const o of origins) { cuts.add(Math.max(b.pos, o.pos)); cuts.add(Math.min(b.pos + b.width, o.pos + o.width)); }
  const points = [...cuts].sort((a, c) => a - c);
  const text = b.text;
  const total = byteLength(text);
  let html = '';
  for (let i = 0; i + 1 < points.length; i++) {
    const p0 = points[i], p1 = points[i + 1];
    const seg = sliceBytes(text, p0 - b.pos, Math.min(total, p1 - b.pos));
    if (!seg) continue;
    const here = marks.filter((m) => m.pos < p1 && p0 < m.pos + m.width);
    const org = origins.find((o) => o.pos < p1 && p0 < o.pos + o.width);
    const cls = ['seg'];
    const attrs = [];
    if (here.length) {
      cls.push('lip');
      const depth = Math.min(3, here.length);
      cls.push('depth' + depth);
      attrs.push(`style="--mark-hue:${here[0].mark.hue};--mark-value:${here[0].mark.value}"`, `data-links="${here.map((m) => m.link.addr).join(' ')}"`);
      if (here.every((m) => m.mark.value < 1)) cls.push('visited');
    }
    if (org) {
      cls.push('same');
      attrs.push(`data-origin="${esc(org.doc)}"`);
      const first = !labelled.has(org.doc);
      if (first) labelled.add(org.doc);
      const kind = v.originKinds.get(org.doc) || 'unknown';
      const mark = kind === 'draft' && (d.meta ? d.meta.published : d.kind === 'edition') ? `<span class="pubmark" data-mark="C-33">${esc(t('C-33'))}</span>` : '';
      html += `<span class="${cls.join(' ')}" ${attrs.join(' ')}><span class="hairline ${first ? 'whole' : 'compact'}" data-src="${esc(org.doc)}" title="${esc(org.doc)}">${first ? '≡ ' + esc(org.doc) : '≡'}</span>${mark}${esc(seg)}</span>`;
      continue;
    }
    html += cls.length > 1 ? `<span class="${cls.join(' ')}" ${attrs.join(' ')}>${esc(seg)}</span>` : esc(seg);
  }
  return html;
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
  const owner = ownerAccount || d.account || '';
  const cue = v.ownerFingerprint ? fingerprintCue(v.ownerFingerprint) : '⟨fingerprint⟩';
  const label = v.deviceLabel || '⟨device label⟩';
  let h = `<div class="hd"><span class="addr">${esc(d.addr)}</span>`;
  const published = d.meta ? d.meta.published : d.kind === 'edition';
  if (d.refused === 'withheld') h += `<span class="st">${esc(t('F.corner.withheld', { owner }))}</span>`;
  else if (d.refused === 'unregistered') h += `<span class="st">${esc(t('B1.doc_not_registered', { address: d.addr }))}</span>`;
  else h += `<span class="st">${esc(published ? t('B1.state-line') : t('F.label.draft'))}</span>`;
  h += `<span class="by">${esc(owner)} · ${esc(label)} · ${esc(cue)}</span>`;
  const touching = v.marks.length;
  const presence = touching ? (touching === 1 ? t('B1.presence.1') : t('B1.presence', { n: touching })) : '';
  if (presence) h += `<span class="pres"><span class="sym reveal" data-reveal="${esc(d.addr)}" role="button" tabindex="-1">⟡</span> ${esc(presence)}</span>`;
  h += `</div>`;
  if (d.refused) return h;
  /** @type {Set<string>} */
  const labelled = new Set();
  let run = '';
  for (const b of d.blocks) {
    const sel = v.selected && v.selected.addr === d.addr && touches(b, v.selected);
    const foc = v.focus && v.focus.addr === d.addr && v.focus.pos === b.pos;
    const cls = ['sp', 'blk-' + b.kind];
    if (sel) cls.push('sel');
    if (foc) cls.push('lit');
    const count = b.kind === 'para' ? v.countAt(b) : { n: 0, social: false };
    const countHTML = count.n > 0 ? `<span class="others" data-count="${count.n}">${esc(t('F.others-count', { n: count.n }))}</span>` : count.social ? `<span class="others social" data-count="0">◦</span>` : '';
    if (b.kind === 'withheld') { run += withheldBlockHTML(b, d, v, owner); continue; }
    if (b.kind === 'atom') { run += `<span class="${cls.join(' ')}" data-addr="${esc(d.addr)}" data-pos="${b.pos}" data-width="${b.width}">${recordHTML(b, d, v)}</span>`; continue; }
    if (b.kind === 'ref') { run += `<span class="${cls.join(' ')} ref" data-addr="${esc(d.addr)}" data-pos="${b.pos}" data-width="${b.width}">⟡</span>`; continue; }
    if (b.kind === 'hex') { run += `<span class="${cls.join(' ')}" data-addr="${esc(d.addr)}" data-pos="${b.pos}" data-width="${b.width}">${esc(t('F.not-rendered', { width: b.width }))}</span>`; continue; }
    const lvl = headingLevel(b.text);
    const tag = lvl ? 'h' + Math.min(6, lvl + 1) : 'p';
    const symbolsHere = v.symbols.filter((s) => s.pos < b.pos + b.width && b.pos < s.pos + s.width);
    const syms = symbolsHere.length
      ? symbolsHere.map((s) => `<span class="sym ${s.linker === 'others' ? 'other' : ''} ${s.mark.value < 1 ? 'visited' : ''}" data-link="${esc(s.link.addr)}" style="--mark-hue:${s.mark.hue};--mark-value:${s.mark.value}" role="button" tabindex="-1" title="${esc(s.link.type || '')}">⟡</span>`).join('')
      : '';
    run += `<${tag} class="${cls.join(' ')}" data-addr="${esc(d.addr)}" data-pos="${b.pos}" data-width="${b.width}">${blockTextHTML(b, d, v, labelled)}${syms}${countHTML}</${tag}>`;
  }
  if (!d.blocks.length && d.extent === 0) run += `<p class="sp empty" data-addr="${esc(d.addr)}" data-pos="1" data-width="0">${esc(t('B1.empty_subspace'))}</p>`;
  // the scene-offer at a document that windows another (UXQ-14)
  if (!v.scene) {
    const windows = [...new Set(d.origins.map((o) => documentOf(o.doc) || o.doc))].filter((w) => w !== documentOf(d.addr));
    for (const w of windows) run += `<span class="offer" data-scene="${esc(d.addr)}|${esc(w)}" role="button" tabindex="-1">${esc(t('B1.scene-offer', { D: w }))}</span>`;
  }
  return h + `<div class="run">${run}</div>`;
}
