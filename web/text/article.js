// T-ARTICLE — a document's article as HTML from its record and the view
// state handed in (the structure record §3.2 "T-ARTICLE"). Layer 2. PURE: a
// function of values (FP-8); no DOM, no state.
// The head (the address, the state line, the byline — never a name alone,
// R44 — the presence indicator with its ⟡); the blocks with their marks —
// the selection (a byte span: every block it touches is marked, the
// platform's highlight showing the bytes themselves) and the focus (a
// block), each by `blockMarks`, the rule T-LAYER marks a standing article by,
// the owner's and the person's links in place (each stretch in the one mark
// its links merge into, LK's `mergedMark`: hue the linker's, neutral where
// theirs differ), each transcluded run's sameness
// boundary with the origin's label (the hairline, whole at the first run of
// that origin, compact after) and the entitled reader's mark C-33 on a
// draft-origin run in a published document — set ONCE per run in a block,
// at its first stretch, however marks and symbols cut it (foundations §2.1:
// "each change of origin between adjacent runs is marked by a hairline") —
// the "+⟨n⟩ others" count at the block's edge, and the symbols the reveal
// asked for, each AT ITS SPAN (foundations §2.1; B1-S4: "No margin column:
// the symbols are at the place"): right after the last word its span
// touches, in the last paragraph it touches (`standOf`); the withheld block
// OCCUPYING its positions and naming the owner of its run's origin, whoever
// owns the document windowing it (R56: the copy derives per origin; B1-S7),
// with R56's arm for that owner by PUB-5.121's order and C-67's
// clause beneath; a record atom rendered as the record it is (the genesis
// record's words); an unknown item kind "not rendered" with its width; the
// scene-mode variant, a reading scene's pane's article, which nothing in the
// pane acts on (SC): no scene-offer, and its symbols and presence ⟡ marks
// alone, never the controls the plane's are (`control`). THE CORNER's items
// — an edition's state with "version ⟨k⟩ of ⟨n⟩" and R20's teaching, a
// draft's kept state and its chip (C-28, at the document's corner and never
// the HUD — ux-T2; the record §3.4 (viii)), the whole-document link count —
// are made here too, and stand OUTSIDE the article: the article's box clips
// whatever stands past its measure, so the corner's element is its holder's,
// T-LAYER's beside the article on the plane and each pane's own in the scene
// (foundations §3.1).
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
import { touches, posOfChar, charOfPos } from './span.js';
import { MEASURE, BORDER, borderEm, headingSize, breakBetween, isSpace } from '../plane/layout.js';

/** @typedef {import('../model/records.js').Doc} Doc */
/** @typedef {import('../model/records.js').Block} Block */
/** @typedef {import('../model/records.js').Origin} Origin */
/** @typedef {import('../links/links.js').Shown} Shown */
/** @typedef {import('../plane/register.js').Mark} Mark */
/** @typedef {import('./span.js').Span} Span */
/** @typedef {import('../plane/layout.js').Row} Row */
/** @typedef {import('../plane/layout.js').Piece} Piece */

/**
 * @typedef {Object} ArticleView — the view state the article renders, handed in as values
 * @property {Span | null} selected the selected span (O-SELECTION's): the blocks it touches are marked
 * @property {{addr: string, pos: number} | null} focus the focused block (N-WALK's), by its first position
 * @property {Shown[]} marks the links to mark in place (LK.shown)
 * @property {(marks: [Mark, ...Mark[]]) => Mark} mergedMark the one mark the links over one stretch merge into (LK.mergedMark)
 * @property {Shown[]} symbols the symbols at their spans (LK.symbols)
 * @property {(block: Block) => {n: number, social: boolean}} countAt the others' count per block (LK.countAt)
 * @property {number} wholeLinks the links to this document as a whole
 * @property {string | null} sessionAccount the acting account, or null (a guest)
 * @property {boolean} localTrust the board's flag (the chip's form)
 * @property {boolean} notebook the venue
 * @property {boolean} scene the scene-mode variant: a reading scene's pane's article — no scene-offer, and no mark a control
 * @property {Map<string, 'edition' | 'draft' | 'unknown'>} originKinds the kind of each origin document (for C-33)
 * @property {(doc: string) => string} originOwner the owner account of an origin document, by the one rule the byline's owner is found by (T-LAYER's `ownerAccount`): the owner a withheld run's placeholder names (R56)
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
 * @typedef {Object} Opening — what a run's first stretch in a block carries for the run: its boundary and its hairline, and C-33's mark where the run has one
 * @property {boolean} whole the hairline labelled whole: the first run of its origin in the article
 * @property {boolean} c33 C-33's mark: a draft's run in a published document
 */

/**
 * @typedef {Object} Seg — a stretch of one block's text between two cuts, with what marks it and the symbols standing at it
 * @property {string} text the document's characters over it
 * @property {Shown[]} marks the links marked over it
 * @property {Mark | null} mark the one mark they merge into (the view's `mergedMark`); null where no link marks it
 * @property {Origin | null} origin the transcluded run it lies in
 * @property {Opening | null} opens the run's chrome, where it is the run's first stretch in the block; null at every other stretch
 * @property {Shown[]} chromeSyms the symbols standing after its run's chrome, before its text: their spans' last word runs into the hairline with no break between them (`standOf`)
 * @property {Shown[]} syms the symbols standing right after its text (`standOf`)
 */

/**
 * @typedef {Object} Chrome — a run's chrome at its first stretch in a block, as P-LAY sets it in the line
 * @property {string} label the hairline's label
 * @property {boolean} box C-33's mark follows it, an inline-block
 */

/** a run's hairline label: its origin's address where the label is whole, the bare ≡ after */
const labelOf = (/** @type {Origin} */ o, /** @type {Opening} */ at) => (at.whole ? '≡ ' + o.doc : '≡');

/**
 * The marks a block carries in its article: `sel` where the selection
 * touches it, `lit` where it is the walk's focused block. The one rule the
 * article is made with and T-LAYER marks a standing article's blocks by, so
 * a change of either is marked in place and rebuilds no article.
 * @param {string} addr the article's document
 * @param {{pos: number, width: number}} b the block
 * @param {Span | null} selected the selected span
 * @param {{addr: string, pos: number} | null} focus the focused block, by its first position
 * @returns {{sel: boolean, lit: boolean}}
 */
export function blockMarks(addr, b, selected, focus) {
  return { sel: !!selected && selected.addr === addr && touches(b, selected), lit: !!focus && focus.addr === addr && focus.pos === b.pos };
}

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
 * @property {Seg[]} segs a paragraph's stretches, the symbols standing in it among them
 * @property {{n: number, social: boolean}} count the others' count at a paragraph
 * @property {Rec | null} rec a record atom's record
 */

/**
 * @typedef {Object} Walk — the article as one walk of the document decided it: both renderings are made from this
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
 * The entitlement arm at a withheld run, by PUB-5.121's order: for the
 * acting person with a key present and no grant, the owner-grant default;
 * for a guest with no key, R56's key-absent default. The one rule the run's
 * placeholder and C-39's face at the run both read (B1-S5, B1-S7).
 * @param {string | null} reader the acting account, or null (a guest)
 * @param {string} owner the origin's owner account
 * @returns {{id: string, text: string}} the arm's string id and its words
 */
export function entitlementArm(reader, owner) {
  return reader ? { id: 'C-36.owner-grant.arm', text: t('C-36.owner-grant.arm') } : { id: 'R56.key-absent', text: t('R56.key-absent', { owner }) };
}

/**
 * The R56 placeholder occupying a withheld run: existence and owner, never
 * bytes — the owner its origin's (`originOwner`), whoever owns the document
 * windowing the run, since R56's copy derives per origin and B1-S7's
 * ⟨owner⟩ is always derivable (A-289). The head names that owner, the
 * entitlement arm (`entitlementArm`) is the one for it, and the placeholder
 * carries it (`data-owner`) for C-39's face at the run, which names the
 * same; then C-67's clause.
 * @param {Block} b the withheld run
 * @param {Doc} d
 * @param {ArticleView} v
 */
export function withheldBlockHTML(b, d, v) {
  const owner = b.origin ? v.originOwner(b.origin) : '';
  const head = t('B1.withheld-run', { owner, account: owner, width: b.width, origin: b.origin || '' });
  const arm = entitlementArm(v.sessionAccount, owner);
  return `<span class="withheld" data-pos="${b.pos}" data-width="${b.width}" data-withheld="1" data-origin="${esc(b.origin || '')}" data-owner="${esc(owner)}">` +
    `<span class="wh-head">${esc(head)}</span><span class="arm">${esc(arm.text)}</span><span class="clause">${esc(t('C-67.pointer'))}</span></span>`;
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

/** is a UTF-16 code unit the second half of a surrogate pair? */
const isLow = (/** @type {number} */ u) => u >= 0xdc00 && u <= 0xdfff;

/**
 * Where a link's symbol stands in a paragraph's text: right after the last
 * word its span touches — the first point at or after the span's last
 * character that is not a space where P-LAY may break the paragraph's line
 * with no symbol in it: before a space, between a pair `breakBetween` allows,
 * beside an inline-block, at the text's end. Set there, a symbol adds room
 * to a line and no place to break it, so the article without its symbols is
 * never longer than with them, and the face T-LAYER fits to LK's `utmost`
 * holds it at every stage; set inside a word it would let the word's halves
 * part. A run's chrome stands in the line as P-LAY sets it, its hairline's
 * label joined to the word before it where no break falls between them: a
 * word that runs into a hairline so takes its symbol after the run's chrome,
 * never inside it. A span of spaces alone takes its symbol where it ends.
 * @param {string} text the paragraph's text
 * @param {number} c0 the span's first character in it
 * @param {number} c1 one past the span's last character in it
 * @param {(i: number) => (Chrome | null)} chromeAt the chrome of the run whose first stretch in the paragraph starts at character `i`
 * @returns {{at: number, after: boolean}} the character the symbol stands before (the text's length at its end), and whether it stands after the chrome there
 */
export function standOf(text, c0, c1, chromeAt) {
  const cp = (/** @type {number} */ i) => /** @type {number} */ (text.codePointAt(i));
  const startOf = (/** @type {number} */ i) => (i > 0 && isLow(text.charCodeAt(i)) ? i - 1 : i);
  const step = (/** @type {number} */ i) => i + (cp(i) > 0xffff ? 2 : 1);
  let j = startOf(c1 - 1);
  while (j >= c0 && isSpace(cp(j))) j = startOf(j - 1);
  if (j < c0) return { at: c1, after: false };
  // the line as P-LAY sets it (`wrap`'s `prev` and `before`): the last item set and the one before it — a character,
  // 32 a space, -1 the row's start, -2 an inline-block
  let prev = -1, before = -1;
  const set = (/** @type {number} */ c) => { if (isSpace(c)) prev = before = 32; else { before = prev; prev = c; } };
  const setChrome = (/** @type {Chrome} */ ch) => { for (const c of ch.label) set(/** @type {number} */ (c.codePointAt(0))); if (ch.box) prev = before = -2; };
  /** may the line break before `c`, after what is set? */
  const breaks = (/** @type {number} */ c) => prev === -2 || isSpace(c) || breakBetween(prev, c, before < 0 || before === 32);
  // what stands before the span's last character: the chrome of a run whose first stretch starts there, else the character before it
  const here = chromeAt(j);
  if (here) setChrome(here); else if (j > 0) set(cp(startOf(j - 1)));
  set(cp(j));
  for (let k = step(j); k < text.length; k = step(k)) {
    const c = cp(k), ch = chromeAt(k);
    if (ch) {
      if (breaks(/** @type {number} */ (ch.label.codePointAt(0)))) return { at: k, after: false };
      setChrome(ch);
      if (breaks(c)) return { at: k, after: true };
    } else if (breaks(c)) return { at: k, after: false };
    set(c);
  }
  return { at: text.length, after: false };
}

/**
 * The stretches of one block's text: cut at the edges of the owner's and the
 * person's links (LK's set), at the edges of the transcluded runs, and where
 * the symbols standing in the block stand (`standOf`), each with the links
 * marking it and the one mark they merge into, and the symbols at it; each
 * run's chrome — its boundary, its hairline,
 * C-33's mark — at its first stretch in the block alone, however the run is
 * cut, the hairline labelled whole at the first run of its origin in the
 * article.
 * @param {Block} b
 * @param {Doc} d
 * @param {ArticleView} v
 * @param {Set<string>} labelled the origins already labelled whole in this article
 * @param {Shown[]} standing the symbols standing in this block: the ones whose span's last paragraph it is
 * @returns {Seg[]}
 */
function segmentsOf(b, d, v, labelled, standing) {
  const marks = v.marks.filter((m) => m.pos < b.pos + b.width && b.pos < m.pos + m.width);
  const origins = d.origins.filter((o) => o.pos < b.pos + b.width && b.pos < o.pos + o.width);
  const published = d.meta ? d.meta.published : d.kind === 'edition';
  // each run's first stretch in the block, by the character it starts at, with what it carries
  /** @type {Map<number, {o: Origin, opens: Opening}>} */
  const opening = new Map();
  for (const o of [...origins].sort((x, y) => x.pos - y.pos)) {
    const at = charOfPos(b, Math.max(b.pos, o.pos));
    if (at >= b.text.length) continue;
    opening.set(at, { o, opens: { whole: !labelled.has(o.doc), c33: (v.originKinds.get(o.doc) || 'unknown') === 'draft' && published } });
    labelled.add(o.doc);
  }
  /** the chrome standing before a character, as the line sets it */
  const chromeAt = (/** @type {number} */ i) => { const r = opening.get(i); return r ? { label: labelOf(r.o, r.opens), box: r.opens.c33 } : null; };
  const stands = standing.map((s) => {
    const st = standOf(b.text, charOfPos(b, Math.max(b.pos, s.pos)), charOfPos(b, Math.min(b.pos + b.width, s.pos + s.width)), chromeAt);
    return { s, after: st.after, pos: posOfChar(b, st.at) };
  });
  // cut points in positions: the block's edges, every mark's edges, every origin's edges, every symbol's place
  const cuts = new Set([b.pos, b.pos + b.width]);
  for (const m of marks) { cuts.add(Math.max(b.pos, m.pos)); cuts.add(Math.min(b.pos + b.width, m.pos + m.width)); }
  for (const o of origins) { cuts.add(Math.max(b.pos, o.pos)); cuts.add(Math.min(b.pos + b.width, o.pos + o.width)); }
  for (const st of stands) cuts.add(st.pos);
  const points = [...cuts].sort((a, c) => a - c);
  const total = byteLength(b.text);
  /** @type {Seg[]} */
  const out = [];
  /** @type {number[]} each stretch's first position */
  const starts = [];
  for (let i = 0; i + 1 < points.length; i++) {
    const p0 = points[i], p1 = points[i + 1];
    const text = sliceBytes(b.text, p0 - b.pos, Math.min(total, p1 - b.pos));
    if (!text) continue;
    const origin = origins.find((o) => o.pos < p1 && p0 < o.pos + o.width) || null;
    const open = origin ? opening.get(charOfPos(b, p0)) : undefined;
    const over = marks.filter((m) => m.pos < p1 && p0 < m.pos + m.width);
    const [first, ...rest] = over;
    out.push({ text, marks: over, mark: first ? v.mergedMark([first.mark, ...rest.map((m) => m.mark)]) : null, origin, opens: open && open.o === origin ? open.opens : null, chromeSyms: [], syms: [] });
    starts.push(p0);
  }
  // each symbol at its stretch: after the chrome of the run it stands in, else after the text of the stretch ending where it stands
  for (const st of stands) {
    const opened = st.after ? starts.indexOf(st.pos) : -1;
    if (opened >= 0) { out[opened].chromeSyms.push(st.s); continue; }
    let i = starts.length - 1;
    while (i > 0 && starts[i] >= st.pos) i--;
    if (out[i]) out[i].syms.push(st.s);
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
 * rendered, or a paragraph with its heading level, its stretches with the
 * symbols standing at them, and its others' count — then the empty
 * document's line and the scene-offers. A symbol stands in the last
 * paragraph its span touches, once however many it crosses.
 * @param {Doc} d
 * @param {ArticleView} v
 * @param {string} ownerAccount the owner by `effective_owner`, or the document's account
 * @returns {Walk}
 */
function walk(d, v, ownerAccount) {
  const owner = ownerAccount || d.account || '';
  const head = headOf(d, v, owner);
  if (d.refused) return { head, parts: null, empty: false, offers: [] };
  /** @type {Set<string>} */
  const labelled = new Set();
  // the symbols standing in each paragraph, by its first position: the last paragraph each one's span touches
  /** @type {Map<number, Shown[]>} */
  const standing = new Map();
  for (const s of v.symbols) {
    let last = null;
    for (const b of d.blocks) if (b.kind === 'para' && touches(b, s)) last = b;
    if (last) standing.set(last.pos, [...(standing.get(last.pos) || []), s]);
  }
  const none = { n: 0, social: false };
  /** @type {Part[]} */
  const parts = d.blocks.map((b) => {
    /** @type {Part} */
    const p = { b, kind: 'para', level: 0, segs: [], count: none, rec: null };
    if (b.kind === 'withheld') p.kind = 'withheld';
    else if (b.kind === 'atom') { p.kind = 'record'; p.rec = recordOf(b, d, v); }
    else if (b.kind === 'ref' || b.kind === 'hex') p.kind = b.kind;
    else {
      p.level = headingLevel(b.text);
      p.segs = segmentsOf(b, d, v, labelled, standing.get(b.pos) || []);
      p.count = v.countAt(b);
    }
    return p;
  });
  // the scene-offer at a document that windows another (UXQ-14)
  const offers = v.scene ? [] : [...new Set(d.origins.map((o) => documentOf(o.doc) || o.doc))].filter((w) => w !== documentOf(d.addr));
  return { head, parts, empty: !d.blocks.length && d.extent === 0, offers };
}

/**
 * The attributes of a mark a click acts on — a button, reached by the pointer
 * and the page's script, never by Tab — on the plane alone, whose clicks
 * APP-INPUT takes: in a reading scene's pane nothing acts on a mark, so it is
 * no control (SC).
 * @param {boolean} scene the scene-mode variant
 */
const control = (scene) => (scene ? '' : ' role="button" tabindex="-1"');

/** a link's symbol at its span: hue the linker's, dashed for another's, lighter once followed */
const symHTML = (/** @type {Shown} */ s, /** @type {boolean} */ scene) => `<span class="sym ${s.linker === 'others' ? 'other' : ''} ${s.mark.value < 1 ? 'visited' : ''}" data-link="${esc(s.link.addr)}" style="--mark-hue:${s.mark.hue};--mark-value:${s.mark.value}"${control(scene)} title="${esc(s.link.type || '')}">⟡</span>`;

/**
 * A stretch of a paragraph's text as HTML: its links marked by their depth
 * in the one mark they merge into — its hue, its value, `visited` where it is
 * drawn lighter — its run's ground and, where it opens its run, the run's
 * boundary, hairline and C-33's mark; then the symbols standing at it — the
 * text's own characters untouched.
 * @param {Seg} s
 * @param {boolean} scene the scene-mode variant: its symbols no controls
 */
function segHTML(s, scene) {
  const cls = ['seg'];
  const attrs = [];
  if (s.mark) {
    cls.push('lip', 'depth' + Math.min(3, s.marks.length));
    attrs.push(`style="--mark-hue:${s.mark.hue};--mark-value:${s.mark.value}"`, `data-links="${s.marks.map((m) => m.link.addr).join(' ')}"`);
    if (s.mark.value < 1) cls.push('visited');
  }
  const syms = s.syms.map((x) => symHTML(x, scene)).join('');
  if (s.origin) {
    const o = s.origin.doc, at = s.opens;
    cls.push('same');
    if (at) cls.push('opens');
    attrs.push(`data-origin="${esc(o)}"`);
    const chrome = !at ? '' : `<span class="hairline ${at.whole ? 'whole' : 'compact'}" data-src="${esc(o)}" title="${esc(o)}">${esc(labelOf(s.origin, at))}</span>` +
      (at.c33 ? `<span class="pubmark" data-mark="C-33">${esc(t('C-33'))}</span>` : '');
    return `<span class="${cls.join(' ')}" ${attrs.join(' ')}>${chrome}${s.chromeSyms.map((x) => symHTML(x, scene)).join('')}${esc(s.text)}</span>${syms}`;
  }
  return (cls.length > 1 ? `<span class="${cls.join(' ')}" ${attrs.join(' ')}>${esc(s.text)}</span>` : esc(s.text)) + syms;
}

/**
 * The article: the head and the blocks (each a span the walk and the mirror
 * key by its first position, and a click on the plane selects whole); its
 * corner stands beside it (`cornerHTML`).
 * @param {Doc} d
 * @param {ArticleView} v
 * @param {string} ownerAccount the owner by `effective_owner`, or the document's account
 * @returns {string}
 */
export function articleHTML(d, v, ownerAccount) {
  const w = walk(d, v, ownerAccount);
  const hd = w.head;
  let h = `<div class="hd"><span class="addr">${esc(hd.addr)}</span><span class="st">${esc(hd.state)}</span><span class="by">${esc(hd.by)}</span>`;
  if (hd.presence) h += `<span class="pres"><span class="sym reveal" data-reveal="${esc(d.addr)}"${control(v.scene)}>⟡</span> ${esc(hd.presence)}</span>`;
  h += `</div>`;
  if (!w.parts) return h;
  let run = '';
  for (const p of w.parts) {
    const b = p.b;
    if (p.kind === 'withheld') { run += withheldBlockHTML(b, d, v); continue; }
    const mark = blockMarks(d.addr, b, v.selected, v.focus);
    const cls = ['sp', 'blk-' + b.kind];
    if (mark.sel) cls.push('sel');
    if (mark.lit) cls.push('lit');
    const at = `data-addr="${esc(d.addr)}" data-pos="${b.pos}" data-width="${b.width}"`;
    if (p.kind === 'record') { run += `<span class="${cls.join(' ')}" ${at}>${recordHTML(b, d, v)}</span>`; continue; }
    if (p.kind === 'ref') { run += `<span class="${cls.join(' ')} ref" ${at}>⟡</span>`; continue; }
    if (p.kind === 'hex') { run += `<span class="${cls.join(' ')}" ${at}>${esc(t('F.not-rendered', { width: b.width }))}</span>`; continue; }
    const tag = p.level ? 'h' + Math.min(6, p.level + 1) : 'p';
    const count = p.count.n > 0 ? `<span class="others" data-count="${p.count.n}">${esc(t('F.others-count', { n: p.count.n }))}</span>` : p.count.social ? `<span class="others social" data-count="0">◦</span>` : '';
    run += `<${tag} class="${cls.join(' ')}" ${at}>${p.segs.map((s) => segHTML(s, v.scene)).join('')}${count}</${tag}>`;
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
 * @param {number} size the size its box is set at, in the body's em
 * @param {Piece[]} pieces
 * @param {{after?: number, before?: number, float?: Piece | null, width?: number}} [o] its margins in the body's em, its float, a withheld run's width
 * @returns {Row}
 */
const row = (kind, pos, size, pieces, o = {}) => ({ kind, pos, size, pieces, float: o.float ?? null, before: o.before ?? 0, after: o.after ?? 0, width: o.width ?? 0 });

/**
 * A paragraph's inline pieces at its size, as `segHTML` sets them: each
 * stretch of its text — the one that opens a run led by the run's sameness
 * boundary, its hairline's label and C-33's mark where it carries one, and
 * the symbols standing after them — then the symbols standing after it.
 * @param {Part} p
 * @param {number} k the paragraph's size, in the body's em
 * @returns {Piece[]}
 */
function paraPieces(p, k) {
  /** @type {Piece[]} */
  const out = [];
  for (const s of p.segs) {
    if (s.origin && s.opens) {
      const l = MEASURE.label * k, m = MEASURE.mark * k, edge = borderEm(BORDER.box) + MEASURE.markPad * m;
      out.push(piece(labelOf(s.origin, s.opens), l, borderEm(BORDER.same) + MEASURE.samePad * k, MEASURE.labelGap * l));
      if (s.opens.c33) out.push({ text: t('C-33'), size: m, lead: edge, trail: edge + MEASURE.markGap * m, box: true });
    }
    out.push(...s.chromeSyms.map(() => symbol(k)), piece(s.text, k), ...s.syms.map(() => symbol(k)));
  }
  return out;
}

/**
 * The article as P-LAY's plan: the head's lines, each block's rows at its
 * size with its margins — a heading's room above it and the smaller room
 * below, every other block's gap after it — the empty document's line, the
 * scene-offers — from the same walk the HTML is made from.
 * @param {Doc} d
 * @param {ArticleView} v
 * @param {string} ownerAccount the owner by `effective_owner`, or the document's account
 * @returns {Row[]}
 */
export function articlePlan(d, v, ownerAccount) {
  const w = walk(d, v, ownerAccount);
  const H = MEASURE.head, gap = MEASURE.gap;
  /** @type {Row[]} */
  const rows = [row('head', null, 1, [piece(w.head.addr, 1)]), row('head', null, H, [piece(w.head.state, H)]), row('head', null, H, [piece(w.head.by, H)])];
  if (w.head.presence) rows.push(row('head', null, H, [symbol(H), piece(' ' + w.head.presence, H)]));
  if (!w.parts) return rows;
  for (const p of w.parts) {
    const b = p.b;
    if (p.kind === 'withheld') rows.push(row('withheld', b.pos, 1, [], { after: gap, width: b.width }));
    else if (p.kind === 'record' && p.rec) {
      if (p.rec.keys) rows.push(row('text', b.pos, 1, [piece(p.rec.words, 1)]), row('text', null, MEASURE.derived, [piece(p.rec.keys, MEASURE.derived)], { after: gap }));
      else rows.push(row('text', b.pos, 1, [piece(p.rec.words, 1)], { after: gap }));
    } else if (p.kind === 'ref') rows.push(row('text', b.pos, 1, [piece('⟡', 1)], { after: gap }));
    else if (p.kind === 'hex') rows.push(row('text', b.pos, 1, [piece(t('F.not-rendered', { width: b.width }), 1)], { after: gap }));
    else {
      const k = headingSize(p.level), c = MEASURE.count * k;
      const float = p.count.n > 0 ? piece(t('F.others-count', { n: p.count.n }), c, MEASURE.countGap * c) : p.count.social ? piece('◦', c, MEASURE.countGap * c) : null;
      const margins = p.level ? { before: MEASURE.headingBefore * k, after: MEASURE.headingAfter * k } : { after: gap * k };
      rows.push(row('text', b.pos, k, paraPieces(p, k), { ...margins, float }));
    }
  }
  if (w.empty) rows.push(row('text', 1, 1, [piece(t('B1.empty_subspace'), 1)], { after: gap }));
  const O = MEASURE.offer;
  for (const o of w.offers) rows.push(row('chrome', null, O, [piece(t('B1.scene-offer', { D: o }), O)], { before: MEASURE.offerGap * O, after: MEASURE.offerGap * O }));
  return rows;
}
