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
// the "+⟨n⟩ others" count in its column's edge, level with the block's first
// line and never inside the text (A-254; issue #151's design decision:
// `edgeStyle`), and the symbols the reveal
// asked for, each AT ITS SPAN (foundations §2.1; B1-S4: "No margin column:
// the symbols are at the place"): right after the last word its span
// touches, in the last paragraph it touches (`standOf`) — every link marked,
// and its symbol set, at the stretches LK says its end stands in now, never
// at the position its slot stores, each mark and symbol carrying the ends it
// draws by their links and their keys (LK's `endKey`), so a click opens the
// card of the end clicked (APP-INPUT) — a symbol whose far end floats titled
// "its passage is not in ⟨D⟩'s current text" (foundations §2.3), and one
// whose far end's text holds only part of its passage, or all of it in
// pieces, or one the board would not tell of, titled with BM-HELD's line
// (BM-HELD's `farSays`; issue #153); the
// withheld run a GAP OCCUPYING its positions, as tall as its bars (F2.1-i),
// naming the owner of its run's origin, whoever owns the document windowing
// it (R56: the copy derives per origin; B1-S7) — its face in it where the gap
// holds it, else compact in its column's edge, "⟨owner⟩ with a mark that
// opens it whole" (foundations §2.1; `gapHolds`), so no face reflows the
// text — the face
// with the entitlement arm for that owner and this reader by PUB-5.121's
// order — a signed-in reader's owner-grant default, a guest's split on
// whether this device holds a key for the board (PUB-5.97) — and C-67's
// clause beneath, decided over the origin's whole admitted-claim set
// (`editionClause`; PUB-5.124, RES-164): the POINTER where an admitted claim's
// edition holds bytes the reader can reach, naming the one claim it follows
// by PUB-3.107's origin-keyed order (RES-152) — a control on the plane, whose
// act is a LEAP to that claim's home, the edition (B1-S7 → S6; APP-INPUT),
// and in a reading scene's pane a line, as every mark there is (SC) — the
// QUOTING sibling where every admitted claim quotes the draft, and nothing —
// the arm's own copy alone — where none is admitted or the claims are not yet
// read — the placeholder's one record (`placeholderOf`), which the ARIA
// mirror's item at the run and the run's face whole (O-FACES's `withheldRun`,
// D5 K-7) read too, so the run a sighted reader sees and the one a screen
// reader hears never part (R94); a record atom rendered
// as the record it is (the genesis
// record's words); an unknown item kind "not rendered" with its width; the
// scene-mode variant, a reading scene's pane's article, which nothing in the
// pane acts on (SC): no scene-offer, and its symbols and presence ⟡ marks
// alone, never the controls the plane's are (`control`). THE CORNER's items
// — an edition's state with "version ⟨k⟩ of ⟨n⟩" and R20's teaching, a
// draft's kept state and its chip (C-28, at the document's corner and never
// the HUD — ux-T2; the record §3.4 (viii)), the whole-document link count,
// and in a reading scene's pane its act reading another version there and the
// line saying the version it reads lacks the passage that act carried (issue
// #160) — are made here too, whole or compact (FP-26), and stand OUTSIDE the
// article: the article's box
// clips whatever stands past its measure, so the corner's element is its holder's,
// T-LAYER's beside the article on the plane and each pane's own in the scene
// (foundations §3.1).
// THE PLAN (`articlePlan`): the same article as P-LAY's rows — the head's
// lines, each block's text at its size with the inline pieces it carries
// (the hairline's label, C-33's mark, the symbols), a record's words and
// keys, the line a reference, an item not rendered or an empty document
// takes, a withheld run's width, the scene-offers, and none of the signs a
// column's edge holds, which set no line — each row
// carrying where a column may break at it and each piece whether its
// characters are the document's own, so P-LAY folds the lines into the
// columns of the document's room and names the position each line starts at
// (issue #15) — which P-LAY lays out as the bars the canvas draws below
// reading scale, so the handoff swaps bars for text and no line moves (law 8;
// S1 Q7). The HTML and
// the plan are made from one walk of the document (`walk`), so the two can
// never decide a block differently; every size and gap the plan carries is
// P-LAY's shared measurement, which the CSS reads too.
// The structural family (headings, emphasis) is the owner's formatting:
// rendered as formatting, never marked (rule (iii)) — here the corpus's own
// markdown headings are set as headings.
// THE ITEM RULE (`itemOf`; issue #161's design decision; FP-24): every block
// that holds no text is an item of one kind — a record the record rule
// renders, a reference, a withheld run, or an item this client cannot show
// (hex, an atom of any other value; a picture cell among them until the page
// reads picture cells) — named in the strings table's words (`itemWords`),
// the one entry the ARIA mirror announces at the item (N-WALK) and a copy's
// stand-in names it by. THE COPY'S PLAIN TEXT (`copyText`) is made here from
// what an article was made from: a span's items in the text's order, each
// stretch of text its own characters and each item a stand-in in square
// brackets in its place — a withheld run's owner and length, an unshown
// item's length, a record's own plain contents (`recordContents`: the key
// record's key labels and fingerprints), never what the plane renders for
// whoever is looking — so a paste never joins text across an item.
// Carries: the wireframe's §16 `articleHTML`, `withheldBlock`.
// Rules: FP-1, FP-2, FP-8, FP-10 (reads LK/selection/focus as values), FP-21,
// FP-22, FP-24, FP-26.

import { esc, fingerprintCue, sliceBytes, byteLength, keyFingerprint } from '../util.js';
import { t, plural } from '../strings.js';
import { textOf } from '../model/records.js';
import { memberOf, documentOf, homeOf, isUnder, cmpAddr, commonsType } from '../model/address.js';
import { touches, posOfChar, charOfPos } from './span.js';
import { MEASURE, BORDER, MEASURE_CPL, EDGE, EDGE_GAP, LINE_H, borderEm, headingSize, breakBetween, isSpace, gapOf, layoutOf, heightOf, wrap } from '../plane/layout.js';

/** @typedef {import('../model/records.js').Doc} Doc */
/** @typedef {import('../model/records.js').Block} Block */
/** @typedef {import('../model/records.js').Origin} Origin */
/** @typedef {import('../model/records.js').Reader} Reader */
/** @typedef {import('../links/links.js').Shown} Shown */
/** @typedef {import('../plane/register.js').Mark} Mark */
/** @typedef {import('./span.js').Span} Span */
/** @typedef {import('../plane/layout.js').Row} Row */
/** @typedef {import('../plane/layout.js').Piece} Piece */
/** @typedef {import('../plane/layout.js').Keep} Keep */

/**
 * @typedef {Object} ArticleView — the view state the article renders, handed in as values
 * @property {Span | null} selected the selected span (O-SELECTION's): the blocks it touches are marked
 * @property {{addr: string, pos: number} | null} focus the focused block (N-WALK's), by its first position
 * @property {Shown[]} marks the links to mark in place (LK.shown), each over every stretch its end stands in
 * @property {(marks: [Mark, ...Mark[]]) => Mark} mergedMark the one mark the links over one stretch merge into (LK.mergedMark)
 * @property {Shown[]} symbols the symbols at their spans (LK.symbols)
 * @property {(s: Shown) => string} says what a drawn link's far end's text holds of its passage, in words, before departure — the dead end's where it floats, BM-HELD's line where it holds part of it, all of it in pieces, or nothing told (BM-HELD's farSays); '' where nothing is said
 * @property {(block: Block) => {n: number, social: boolean}} countAt the others' count per block (LK.countAt)
 * @property {number} wholeLinks the links to this document as a whole
 * @property {Reader} reader who reads (M-REC's `reader`): the acting account, or a guest's null, and whether a key for this board is present
 * @property {boolean} localTrust the board's flag (the chip's form)
 * @property {boolean} notebook the venue
 * @property {boolean} scene the scene-mode variant: a reading scene's pane's article — no scene-offer, and no mark a control
 * @property {Map<string, 'edition' | 'draft' | 'unknown'>} originKinds the kind of each origin document (for C-33)
 * @property {(doc: string) => string} originOwner the owner account of an origin document, by the one rule the byline's owner is found by (T-LAYER's `ownerAccount`): the owner a withheld run's placeholder names (R56)
 * @property {(doc: string) => (Clause | null)} clauseOf C-67's clause beneath a withheld run of an origin document, decided over what the page holds of the origin's edition claims (T-LAYER's `clauseOf`, by `editionClause`); null where nothing renders in its place
 * @property {string | null} deviceLabel the owner's device label where known
 * @property {string | null} ownerFingerprint the owner's device key fingerprint where known
 * @property {number | null} [members] the chain's member count as its box's document holds it (M-PUMP's probe records it there, every version sharing the count): what the corner's version statement reads at a version, its own record holding none; absent, the document's own
 * @property {number | null} [read] a reading scene's pane's corner act, the one its Enter takes: the version it reads in the pane's place (SC; issue #160's design decision: "The corner's 'read version 4' replaces that pane's text inside the scene") — the newer one arrived, or the one the act left; absent or null, none
 * @property {number | null} [lacks] the version a pane's corner says holds none of the passage its act carried (SC; issue #160: "the pane says so if version 4 lacks it"); absent or null, none
 * @property {number} [cpl] the measure the article's column is set at, in characters of its face (P-CAM's measure in force on the plane, the full measure in a pane): what a withheld run's gap holds is read at it (`gapHolds`); absent, the full measure
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

/** a run's hairline label: its origin's address after the origin's mark where the label is whole, the bare mark after */
const labelOf = (/** @type {Origin} */ o, /** @type {Opening} */ at) => (at.whole ? t('L.origin-mark') + ' ' + o.doc : t('L.origin-mark'));

/**
 * A sign's place in its column's edge (P-LAY's EDGE; issue #151's design
 * decision: "each gutter widens into its column's edge and holds that
 * column's counts and withheld marks"): beside the first line of the block it
 * belongs to, EDGE_GAP past the text and as wide as the rest of the edge, its
 * first line as tall as the block's first line so it stands level with it —
 * never inside the text, so it sets no line (A-254: "so a link's arrival
 * breaks no line"). Its sizes are in its own em, the count's of the block's,
 * read from P-LAY's body em; the style sets it on the text's side the edge
 * stands on (the plane's right; a reading scene's pane's inner side).
 * @param {number} k the size of the block it stands beside, in the body's em
 * @returns {string} its inline style
 */
function edgeStyle(k) {
  const s = MEASURE.count * k;
  return `--edge-in:${EDGE_GAP / s}em;--edge-w:${(EDGE - EDGE_GAP) / s}em;line-height:${(k * LINE_H) / s}`;
}

/** the stretches of a drawn link's end that meet a block */
const runsIn = (/** @type {Shown} */ m, /** @type {{pos: number, width: number}} */ b) => m.runs.filter((r) => touches(b, r));
/** the last stretch a drawn link's end stands in, in the text's order: its symbol stands after the last word its span touches there */
const tail = (/** @type {Shown} */ s) => s.runs[s.runs.length - 1];

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
 * @typedef {Object} RecordValue — a record atom's value, where its type is one the record rule renders (D13)
 * @property {'skep-enroll' | 'skep-head'} type
 * @property {Array<{alg?: unknown, key?: unknown, label?: unknown, anchor?: unknown}>} keys a genesis record's keys, in the record's own order; none for the head record
 * @property {unknown} position the head record's position
 * @property {string} chain the head record's chain
 */

/**
 * The value a record atom holds, where its type is one the record rule
 * renders — the genesis record `skep-enroll`, the head record `skep-head` —
 * else null: the one reading of an atom the plane's record (`recordOf`), the
 * item rule (`itemOf`) and a copy's stand-in (`recordContents`) share.
 * @param {Block} b
 * @returns {RecordValue | null}
 */
function recordValue(b) {
  if (b.kind !== 'atom') return null;
  /** @type {any} */
  let rec = null;
  try { rec = JSON.parse(b.text); } catch { return null; }
  if (!rec || typeof rec !== 'object' || (rec.type !== 'skep-enroll' && rec.type !== 'skep-head')) return null;
  const keys = Array.isArray(rec.keys) ? rec.keys.filter((/** @type {unknown} */ k) => !!k && typeof k === 'object') : [];
  return { type: rec.type, keys, position: rec.position ?? '', chain: String(rec.chain || '') };
}

/**
 * The record rule: a record atom that names its type renders as the record
 * it is (D13) — the genesis record to its account's owner and to a reader;
 * the head record `skep-head`; any other atom "not rendered" with its width.
 * The plane draws it so, and the ARIA mirror's item at it says the same
 * (N-WALK; R94).
 * @param {Block} b
 * @param {Doc} d
 * @param {Reader} reader who reads (M-REC's `reader`): the genesis record is "yours" to its account's owner
 * @returns {Rec}
 */
export function recordOf(b, d, reader) {
  const rec = recordValue(b);
  if (rec && rec.type === 'skep-enroll') {
    const yours = reader.account && d.account === reader.account;
    const words = yours ? t('F.home-record.yours') : t('F.home-record.other', { owner: d.account || '' });
    const keys = rec.keys.map((k) => `${k.label || ''} · ${k.anchor ? 'ANCHOR' : 'device'}`).join(' · ');
    return { type: 'skep-enroll', words, keys, position: null, chain: '' };
  }
  if (rec && rec.type === 'skep-head') {
    const chain = rec.chain.slice(0, 12);
    return { type: 'skep-head', words: `skep-head position ${rec.position} · chain ${chain}…`, keys: '', position: rec.position, chain };
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
  const r = recordOf(b, d, v.reader);
  if (r.type === 'skep-enroll') return `<span class="rec" data-rec="skep-enroll"><span class="rec-words">${esc(r.words)}</span><span class="derived">${esc(r.keys)}</span></span>`;
  if (r.type === 'skep-head') return `<span class="rec" data-rec="skep-head"><span class="k">skep-head</span> position ${esc(r.position)} · chain ${esc(r.chain)}…</span>`;
  return `<span class="rec not-rendered">${esc(r.words)}</span>`;
}

/**
 * @typedef {'record' | 'reference' | 'withheld' | 'unshown'} ItemKind — the kind of a block that holds no text (THE ITEM
 * RULE, `itemOf`): a record the record rule renders, a link position's reference, a withheld run, or an item this client
 * cannot show
 */

/** each item kind's words in the strings table: the one entry the ARIA mirror announces at the item and a copy's stand-in names it by (issue #161) */
const ITEM_WORDS = /** @type {const} */ ({ record: 'L.item.record', reference: 'L.item.reference', withheld: 'L.item.withheld', unshown: 'L.item.unshown' });

/**
 * THE ITEM RULE (issue #161's design decision; FP-24): the kind of a block
 * that holds no text — a record, an atom whose value the record rule renders
 * as one (`recordOf`); a reference, a link position's item; a withheld run;
 * else an item this client cannot show, hex or an atom of any other value —
 * and null for a paragraph, whose text is the document's own. The ARIA
 * mirror's item at the block (N-WALK) and a copy's stand-in in its place
 * (`copyText`) both read it, so what is announced and what is pasted never
 * part; its record is the one the plane renders as a record (`recordValue`).
 * @param {Block} b
 * @returns {ItemKind | null}
 */
export function itemOf(b) {
  if (b.kind === 'para') return null;
  if (b.kind === 'withheld') return 'withheld';
  if (b.kind === 'ref') return 'reference';
  return recordValue(b) ? 'record' : 'unshown';
}

/** an item's kind in the strings table's words (`ITEM_WORDS`) */
export const itemWords = (/** @type {ItemKind} */ kind) => t(ITEM_WORDS[kind]);

/** an item's length: its positions, counted in the strings table's words */
export const itemLength = (/** @type {number} */ n) => plural(n, 'L.item.positions.1', 'L.item.positions');

/**
 * A record's own plain contents, as a copy's stand-in carries them after its
 * kind (issue #161's design decision: "A record type's renderer may add the
 * record's own plain contents. The key record adds its key labels and their
 * fingerprints"): each key of a genesis record `skep-enroll`, in the record's
 * own order — its label where it has one, then its fingerprint (AUTH-1.8,
 * util's `keyFingerprint`) where its alg and value derive one; nothing for any
 * other record, and never what the plane renders for whoever is looking ("your
 * home document…"), which is not on the board.
 * @param {Block} b
 * @returns {string[]}
 */
export function recordContents(b) {
  const rec = recordValue(b);
  if (!rec || rec.type !== 'skep-enroll') return [];
  return rec.keys.flatMap((k) => {
    const label = typeof k.label === 'string' ? k.label : '';
    const fingerprint = typeof k.alg === 'string' && typeof k.key === 'string' ? keyFingerprint(k.alg, k.key) : null;
    if (label && fingerprint) return [t('L.copy.key', { label, fingerprint })];
    if (fingerprint) return [fingerprint];
    return label ? [label] : [];
  });
}

/**
 * The entitlement arm beneath what a document withheld from the reader shows —
 * a run of it, or the document itself — by PUB-5.121's order over PUB-5.97's
 * key-split defaults: for a signed-in principal, the owner-grant default,
 * whatever key signed the session or none; for a guest whose device holds a
 * key bound at this board, C-36's key-present default — sign in, then ask;
 * for a guest with none, R56's key-absent default, naming the owner. The one
 * rule the run's placeholder, C-39's face at the run and the document-level
 * withheld face (O-FACES's `withheld`) read (B1-S5, B1-S7; A-170). The order's
 * first arms are never picked here: the universal arm is a guest's at a
 * universally granted origin, and the board answers a guest no universal
 * grant (wire.md §Grants); the revoked arm's record reaches the page only in
 * a raw link read, which no face may be made from (PUB-5.21) — the two wait
 * on a read the board does not serve (skep #577); the no-grant arm is a
 * build's without a grant primitive, which this board has.
 * @param {Reader} reader who reads (M-REC's `reader`)
 * @param {string} owner the owner account of the document withheld — a run's origin's
 * @returns {{id: string, text: string}} the arm's string id and its words
 */
export function entitlementArm(reader, owner) {
  if (reader.account) return { id: 'C-36.owner-grant.arm', text: t('C-36.owner-grant.arm') };
  if (reader.keyPresent) return { id: 'C-36.guest.key', text: t('C-36.guest.key') };
  return { id: 'R56.key-absent', text: t('R56.key-absent', { owner }) };
}

/**
 * @typedef {Object} Pointer — C-67's pointer: an admitted claim's edition holds bytes the reader can reach, and the pointer follows the one claim PUB-3.107's origin-keyed order picks (`editionClause`)
 * @property {'C-67.pointer'} id its string
 * @property {string} text its words
 * @property {string} claim the claim it follows — a link
 * @property {string} home the document that claim resides in: the edition its act LEAPs to (B1-S7 → S6)
 */

/**
 * @typedef {Object} Quoting — C-67's QUOTING sibling: every admitted claim quotes the draft, so nothing published carries its bytes and nothing is followed
 * @property {'C-67.quoting'} id its string
 * @property {string} text its words, naming the lowest-addressed claimant
 */

/** @typedef {Pointer | Quoting} Clause — C-67's clause as it renders: its string id and its words, and, where it is the pointer, the claim it follows */

/**
 * @typedef {Object} ClaimSeen — one edition claim the lookup on an origin listed, as the page holds its two reads of it (PUB-7.50)
 * @property {string} claim the claim's address — a link
 * @property {{type: string | null, from: EndRef[]} | null} link the link as `read_link` answered it — its type as the page reads every link's, the type slot's first address — or null where unread
 * @property {string} home the document the claim resides in, from its address (M-ADDR's `homeOf`)
 * @property {boolean | null} published whether the home is published (`doc_metadata`): false where a read of it was refused, null where none answered yet
 * @property {string} claimant the home's owner, by the one owner rule (T-LAYER's `ownerAccount`): who claims
 */

/** @typedef {import('../model/address.js').EndRef} EndRef */

/**
 * Is an edition claim admitted (PUB-5.99, the edition-claim read's own
 * admission)? Its type is of the edition class (R20: `…3.14`, or a subtype
 * beneath it by prefix, as the board's lookup tests), its home is published,
 * that home is not its claimant's own doc 1 (address arithmetic, the home's
 * chain its trunk's), and the claimant — the home's owner — is the origin's
 * owner or a delegate of it by address containment. False where a test
 * fails, null where one waits on a read the page has not made — the
 * claimant's two among them, until the home's metadata names its owner — and
 * true where every one holds.
 * @param {ClaimSeen} c
 * @param {string} owner the origin's owner
 * @returns {boolean | null}
 */
function admitted(c, owner) {
  const ty = c.link ? commonsType(c.link.type) : null;
  const known = c.published !== null;
  const tests = [
    c.link ? !!ty && ty.ordinal === 14 : null,
    c.published,
    known ? documentOf(c.home) !== c.claimant + '.0.1' : null,
    known ? isUnder(owner, c.claimant) : null,
  ];
  return tests.includes(false) ? false : tests.includes(null) ? null : true;
}

/**
 * C-67's clause beneath a withheld run of `origin` (PUB-5.124), its three
 * answers decided over the origin's WHOLE admitted-claim set, never per claim
 * (RES-164): the POINTER where any admitted claim passes the resolution test
 * — its FROM holds a span, and none of its spans lies in the origin (the
 * span's document, `homeOf`: the board's `document_of` arithmetic), so its
 * edition holds bytes the reader can reach — following the passing claim
 * PUB-3.107's origin-keyed order picks (RES-152): a passing claim whose home
 * the origin's owner owns first, the lowest-addressed among several (PUB-4.7's
 * pattern), else the lowest-addressed passing claim, a delegate's edition
 * being bytes this reader can reach as they stand; the QUOTING sibling where
 * every admitted claim quotes — a FROM holding a span of the origin, or none —
 * naming the lowest-addressed claimant; and the EMPTY place, null, where none
 * is admitted (RES-85), the arm's own copy then standing alone. Undecided —
 * the lookup unread or refused, or a listed claim's link or its home not read
 * — the clause is the empty place too, unless an admitted claim already known
 * passes, the pointer then following the pick among the claims known (the
 * article is made again as the rest are read): no reader is pointed at an
 * edition, or told nothing published carries the bytes, on reads the page has
 * not made. Addresses are ordered as tumblers (`cmpAddr`), never as strings.
 * @param {string} origin the withheld run's origin document
 * @param {string} owner the origin's owner (T-LAYER's `originOwner`)
 * @param {ClaimSeen[] | null} claims the claims the lookup listed; null where it is unread or refused
 * @returns {Clause | null}
 */
export function editionClause(origin, owner, claims) {
  if (!claims) return null;
  /** @type {ClaimSeen[]} the admitted claims whose edition holds bytes the reader can reach */
  const passing = [];
  /** @type {string[]} the claimants of the admitted claims that quote */
  const quoting = [];
  let undecided = false;
  for (const c of claims) {
    const a = admitted(c, owner);
    if (a === null) { undecided = true; continue; }
    if (!a || !c.link) continue;
    if (c.link.from.length && !c.link.from.some((e) => homeOf(e.start) === origin)) passing.push(c);
    else quoting.push(c.claimant);
  }
  const own = passing.filter((c) => c.claimant === owner);
  const [pick] = (own.length ? own : passing).sort((x, y) => cmpAddr(x.claim, y.claim));
  if (pick) return { id: 'C-67.pointer', text: t('C-67.pointer'), claim: pick.claim, home: pick.home };
  if (undecided || !quoting.length) return null;
  return { id: 'C-67.quoting', text: t('C-67.quoting', { claimant: quoting.sort(cmpAddr)[0] }) };
}

/**
 * @typedef {Object} Placeholder — what R56's placeholder at a withheld run shows a reader: existence and owner, never bytes (B1-S7)
 * @property {string} owner the owner of the run's origin, whoever owns the document windowing the run
 * @property {string} head B1-S7's head: that owner, the run's width and its origin
 * @property {{id: string, text: string}} arm the entitlement arm for that owner and this reader (`entitlementArm`)
 * @property {Clause | null} clause C-67's clause beneath the arm (`editionClause`), the pointer naming the claim it follows; null where nothing renders in its place
 */

/**
 * The R56 placeholder at a withheld run, as one record: existence and owner,
 * never bytes — the owner its origin's (`originOwner`), whoever owns the
 * document windowing the run, since R56's copy derives per origin and
 * B1-S7's ⟨owner⟩ is always derivable (A-289); the head naming that owner,
 * the entitlement arm (`entitlementArm`) the one for it, then C-67's clause
 * as the origin's edition claims decide it (`clauseOf`), or nothing in its
 * place (R56: the face is ARM × CLAUSE). The plane's and a pane's placeholder
 * (`withheldBlockHTML`), the ARIA mirror's item at the run (N-WALK) and the
 * run's face whole (O-FACES's `withheldRun`, D5 K-7) are all made from it:
 * R94's one record, never a second rendering that can drift.
 * @param {Block} b the withheld run
 * @param {Reader} reader who reads (M-REC's `reader`)
 * @param {(doc: string) => string} originOwner the owner account of an origin document, by the one owner rule (T-LAYER's `originOwner`)
 * @param {(doc: string) => (Clause | null)} clauseOf C-67's clause beneath a run of an origin document (T-LAYER's `clauseOf`)
 * @returns {Placeholder}
 */
export function placeholderOf(b, reader, originOwner, clauseOf) {
  const owner = b.origin ? originOwner(b.origin) : '';
  return {
    owner,
    head: t('B1.withheld-run', { owner, account: owner, width: b.width, origin: b.origin || '' }),
    arm: entitlementArm(reader, owner),
    clause: b.origin ? clauseOf(b.origin) : null,
  };
}

/**
 * @typedef {'face' | 'head' | 'owner' | 'mark'} GapHolds what a withheld run's gap holds (`gapHolds`): its face whole; its head; the owner of its origin; the origin's mark
 */

/**
 * What a withheld run's gap holds at a measure (foundations §2.1's withheld
 * run: "a gap of its true width carrying ⟨owner⟩ where the run holds it and
 * else a mark keyed to its origin", "a run wide enough to hold its face
 * carrying it in place, so the gap keeps encoding the width and no face
 * reflows the text"; FP-26): the run's face whole — its head at the body's
 * size, the arm and the clause beneath at the face's — where the gap's full
 * lines (P-LAY's `gapOf`) hold it as P-LAY wraps it; else its head where they
 * hold that; else its origin's owner, where a line of the gap holds the
 * address; else the origin's mark. Whatever it holds, the gap stands on the
 * run's bars, and where its face is not in it the face stands compact in the
 * column's edge (`withheldBlockHTML`).
 * @param {Placeholder} p
 * @param {number} width the run's positions
 * @param {number} cpl the measure
 * @returns {GapHolds}
 */
export function gapHolds(p, width, cpl) {
  const gap = gapOf(width, cpl), full = gap.filter((w) => w >= cpl).length;
  const F = MEASURE.face, before = MEASURE.faceGap * F;
  const face = [row('text', null, 1, [piece(p.head, 1)]), row('text', null, F, [piece(p.arm.text, F)], { before }), ...(p.clause ? [row('text', null, F, [piece(p.clause.text, F)], { before })] : [])];
  if (heightOf(layoutOf(face, cpl)) <= full * LINE_H + 1e-9) return 'face';
  if (wrap(face[0], cpl).length <= full) return 'head';
  if ([...p.owner].length <= (full ? cpl : gap[0])) return 'owner';
  return 'mark';
}

/**
 * The gap occupying a withheld run (`placeholderOf`; F2.1-i: "its bars take
 * its true width"): as tall as its bars, its ground drawn over the run's own
 * lines — the last its remainder (`--wh-last`) — holding what `gapHolds`
 * says it holds: its face whole, its head, arm and, where one renders, clause
 * (`clauseHTML`); else its head, its origin's owner or the origin's mark,
 * the face compact in the column's edge level with the run's first line —
 * "⟨owner⟩ with a mark that opens it whole" (foundations §2.1), its act the
 * run's face whole on the plane (APP-INPUT; O-FACES's `withheldRun`), a line
 * in a reading scene's pane, where nothing is acted on (SC). The owner it
 * names carried (`data-owner`) for C-39's face at the run, which names the
 * same.
 * @param {Block} b the withheld run
 * @param {Doc} d
 * @param {ArticleView} v
 */
export function withheldBlockHTML(b, d, v) {
  const p = placeholderOf(b, v.reader, v.originOwner, v.clauseOf);
  const cpl = v.cpl ?? MEASURE_CPL, gap = gapOf(b.width, cpl), holds = gapHolds(p, b.width, cpl);
  const inside = holds === 'face' ? `<span class="wh-head">${esc(p.head)}</span><span class="arm">${esc(p.arm.text)}</span>${clauseHTML(p.clause, v.scene)}`
    : holds === 'head' ? `<span class="wh-head">${esc(p.head)}</span>`
    : holds === 'owner' ? `<span class="wh-owner">${esc(p.owner)}</span>`
    : `<span class="wh-origin">${esc(t('L.origin-mark'))}</span>`;
  const mark = holds === 'face' ? '' : `<span class="wh-mark edge" data-mark="withheld"${control(v.scene)} style="${edgeStyle(1)}">${esc(t('L.withheld.mark', { owner: p.owner }))}</span>`;
  return `<span class="withheld" data-pos="${b.pos}" data-width="${b.width}" data-withheld="1" data-origin="${esc(b.origin || '')}" data-owner="${esc(p.owner)}" data-holds="${holds}" style="height:${gap.length * LINE_H}em;--wh-last:${gap[gap.length - 1]}">` +
    `${mark}${inside}</span>`;
}

/**
 * C-67's clause beneath a withheld run's arm, where one renders. On the plane
 * the pointer is a control (`control`) carrying the claim it follows and that
 * claim's home (`data-claim`, `data-home`): its act is the LEAP to the home,
 * the edition, that APP-INPUT makes (B1-S7 → S6). In a reading scene's pane,
 * where nothing acts on a mark (SC), it is a line; the QUOTING sibling is a
 * line everywhere, for it follows nothing.
 * @param {Clause | null} c
 * @param {boolean} scene the scene-mode variant
 */
function clauseHTML(c, scene) {
  if (!c) return '';
  const follows = c.id === 'C-67.pointer' && !scene ? ` data-claim="${esc(c.claim)}" data-home="${esc(c.home)}"${control(scene)}` : '';
  return `<span class="clause"${follows}>${esc(c.text)}</span>`;
}

/**
 * The corner's items in foundations' one order (§3.1): an edition's state
 * with "version ⟨k⟩ of ⟨n⟩" and R20's teaching, keyed by venue — at a pinned
 * version its own number of the count its box's document holds (`members`),
 * so the corner names the version its box shows and offers the versions list
 * there too (issue #154's design decision: "The address bar and the box's
 * corner both name it"); in a reading scene's pane, where the version its
 * pane reads lacks the passage its act carried, a line saying so (`lacks`),
 * and its act reading another version in the pane's place (`read`; issue
 * #160); a draft's chip (C-28); the whole-document link count (rule (i)).
 * COMPACT (FP-26: "a usual state becomes a glyph … and a number or an
 * exception keeps its words"; issue #151's design decision): an edition's
 * state its version marker — unlit at the bare address, lit at a pinned
 * version (foundations §3.1's ○) — and a draft's chip a glyph, each named by
 * its whole words, which assistive technology reads and its act opens whole;
 * "version ⟨k⟩ of ⟨n⟩", the whole-document count and a withheld document's
 * state keep their words. The holder makes the element they stand in
 * (`data-corner` naming the document), which is the corner's one stop: no
 * item takes a focus of its own (D5 K-57).
 * @param {Doc} d
 * @param {ArticleView} v
 * @param {boolean} [compact] the compact form
 */
export function cornerHTML(d, v, compact = false) {
  const parts = [];
  const published = d.meta ? d.meta.published : d.kind === 'edition';
  const k = memberOf(d.addr);
  /** a usual state: its words (a string's id and its values), or compact its glyph named by them */
  const usual = (/** @type {string} */ cls, /** @type {string} */ id, /** @type {Record<string, string | number>} */ vals, /** @type {string} */ glyph, extra = '') =>
    compact ? `<span class="${cls} glyph"${extra} role="img" aria-label="${esc(t(id, vals))}">${esc(t(glyph))}</span>` : `<span class="${cls}"${extra}>${esc(t(id, vals))}</span>`;
  if (d.refused === 'withheld') parts.push(`<span class="st">${esc(t('F.corner.withheld', { owner: d.account || '' }))}</span>`);
  else if (published) {
    const first = v.notebook ? t('F.published.notebook') : t('F.published');
    const n = v.members !== undefined ? v.members : d.members;
    if (d.meta && d.meta.birth === null && !k) parts.push(usual('st', 'F.corner.no-versions', { published: first }, 'L.corner.bare'));
    else if (k) parts.push(usual('st', 'F.corner.pinned', { published: first, k }, 'L.corner.pinned'));
    else parts.push(usual('st', 'F.corner.latest', { published: first }, 'L.corner.bare'));
    if (n != null && n >= 1 && (d.meta && d.meta.birth)) parts.push(`<span class="version" data-members="${n}">${esc(t('F.version-of', { k: k || n, n }))}</span>`);
    if (v.lacks != null) parts.push(`<span class="lacks">${esc(t('F.floating.member', { k: v.lacks }))}</span>`);
    if (v.read != null) parts.push(`<span class="read" data-read="${v.read}">${esc(t('F.versions.read', { k: v.read }))}</span>`);
  } else if (d.kind === 'draft') parts.push(usual('chip', v.localTrust ? 'C-28.flag-on' : 'C-28', {}, 'L.corner.draft', ' data-chip="1"'));
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
 * never longer than with them, and the size T-LAYER folds it at for LK's
 * `utmost` holds it in its room at every stage; set inside a word it would
 * let the word's halves part. A run's chrome stands in the line as P-LAY
 * sets it, its hairline's label joined to the word before it where no break
 * falls between them: a word that runs into a hairline so takes its symbol
 * after the run's chrome, never inside it. A span of spaces alone takes its
 * symbol where it ends.
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
 * The stretches of one block's text: cut at the edges of every stretch the
 * owner's and the person's links (LK's set) stand in, at the edges of the
 * transcluded runs, and where the symbols standing in the block stand
 * (`standOf`), each with the links marking it and the one mark they merge
 * into, and the symbols at it; each run's chrome — its boundary, its
 * hairline, C-33's mark — at its first stretch in the block alone, however
 * the run is cut, the hairline labelled whole at the first run of its origin
 * in the article.
 * @param {Block} b
 * @param {Doc} d
 * @param {ArticleView} v
 * @param {Set<string>} labelled the origins already labelled whole in this article
 * @param {Shown[]} standing the symbols standing in this block: the ones whose span's last paragraph it is
 * @returns {Seg[]}
 */
function segmentsOf(b, d, v, labelled, standing) {
  const marks = v.marks.filter((m) => runsIn(m, b).length > 0);
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
    const r = tail(s);
    const st = standOf(b.text, charOfPos(b, Math.max(b.pos, r.pos)), charOfPos(b, Math.min(b.pos + b.width, r.pos + r.width)), chromeAt);
    return { s, after: st.after, pos: posOfChar(b, st.at) };
  });
  // cut points in positions: the block's edges, the edges of every stretch a mark stands in, every origin's edges, every symbol's place
  const cuts = new Set([b.pos, b.pos + b.width]);
  for (const m of marks) for (const r of runsIn(m, b)) { cuts.add(Math.max(b.pos, r.pos)); cuts.add(Math.min(b.pos + b.width, r.pos + r.width)); }
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
    const over = marks.filter((m) => m.runs.some((r) => r.pos < p1 && p0 < r.pos + r.width));
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
 * paragraph its span touches — the paragraph its last stretch ends in —
 * once however many it crosses.
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
    const r = tail(s);
    let last = null;
    for (const b of d.blocks) if (b.kind === 'para' && touches(b, r)) last = b;
    if (last) standing.set(last.pos, [...(standing.get(last.pos) || []), s]);
  }
  const none = { n: 0, social: false };
  /** @type {Part[]} */
  const parts = d.blocks.map((b) => {
    /** @type {Part} */
    const p = { b, kind: 'para', level: 0, segs: [], count: none, rec: null };
    if (b.kind === 'withheld') p.kind = 'withheld';
    else if (b.kind === 'atom') { p.kind = 'record'; p.rec = recordOf(b, d, v.reader); }
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

/**
 * A link's symbol at its span: hue the linker's, dashed for another's,
 * lighter once followed; titled with its type, and with what its far end's
 * text holds of its passage where that is not all of it in one piece — "its
 * passage is not in ⟨D⟩'s current text" where it floats, BM-HELD's line where
 * it holds part of it, all of it in pieces, or the board would not tell —
 * said before anyone follows it (foundations §2.3; issue #153); carrying its
 * link and its end's key (LK's `endKey`): the end whose card a click on it
 * opens (APP-INPUT).
 * @param {Shown} s
 * @param {ArticleView} v
 */
function symHTML(s, v) {
  const says = v.says(s);
  const title = (s.link.type || '') + (says ? ' · ' + says : '');
  return `<span class="sym ${s.linker === 'others' ? 'other' : ''} ${s.mark.value < 1 ? 'visited' : ''}" data-link="${esc(s.link.addr)}" data-end="${esc(s.key)}" style="--mark-hue:${s.mark.hue};--mark-value:${s.mark.value}"${control(v.scene)} title="${esc(title)}">⟡</span>`;
}

/**
 * A stretch of a paragraph's text as HTML: its links marked by their depth
 * in the one mark they merge into — its hue, its value, `visited` where it is
 * drawn lighter — carrying the ends marking it, their links and their keys
 * (LK's `endKey`) in one order, the first the end whose card a click on it
 * opens (APP-INPUT); its run's ground and, where it opens its run, the run's
 * boundary, hairline and C-33's mark — the hairline naming the run's origin
 * and carrying the run's own positions in this document, the passage its
 * gesture to the source carries (foundations §2.1; §2.3's carry rule) — then
 * the symbols standing at it — the text's own characters untouched.
 * @param {Seg} s
 * @param {ArticleView} v the view: in its scene-mode variant the symbols no controls
 */
function segHTML(s, v) {
  const cls = ['seg'];
  const attrs = [];
  if (s.mark) {
    cls.push('lip', 'depth' + Math.min(3, s.marks.length));
    attrs.push(`style="--mark-hue:${s.mark.hue};--mark-value:${s.mark.value}"`, `data-links="${s.marks.map((m) => m.link.addr).join(' ')}"`, `data-ends="${s.marks.map((m) => esc(m.key)).join(' ')}"`);
    if (s.mark.value < 1) cls.push('visited');
  }
  const syms = s.syms.map((x) => symHTML(x, v)).join('');
  if (s.origin) {
    const o = s.origin.doc, at = s.opens;
    cls.push('same');
    if (at) cls.push('opens');
    attrs.push(`data-origin="${esc(o)}"`);
    const chrome = !at ? '' : `<span class="hairline ${at.whole ? 'whole' : 'compact'}" data-src="${esc(o)}" data-pos="${s.origin.pos}" data-width="${s.origin.width}" title="${esc(o)}">${esc(labelOf(s.origin, at))}</span>` +
      (at.c33 ? `<span class="pubmark" data-mark="C-33">${esc(t('C-33'))}</span>` : '');
    return `<span class="${cls.join(' ')}" ${attrs.join(' ')}>${chrome}${s.chromeSyms.map((x) => symHTML(x, v)).join('')}${esc(s.text)}</span>${syms}`;
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
    const tag = p.level ? 'h' + Math.min(6, p.level + 1) : 'p', edge = edgeStyle(headingSize(p.level));
    const count = p.count.n > 0 ? `<span class="others edge" data-count="${p.count.n}" style="${edge}">${esc(t('F.others-count', { n: p.count.n }))}</span>` : p.count.social ? `<span class="others edge social" data-count="0" style="${edge}">◦</span>` : '';
    run += `<${tag} class="${cls.join(' ')}" ${at}>${count}${p.segs.map((s) => segHTML(s, v)).join('')}</${tag}>`;
  }
  if (w.empty) run += `<p class="sp empty" data-addr="${esc(d.addr)}" data-pos="1" data-width="0">${esc(t('B1.empty_subspace'))}</p>`;
  for (const o of w.offers) run += `<span class="offer" data-scene="${esc(d.addr)}|${esc(o)}" role="button" tabindex="-1">${esc(t('B1.scene-offer', { D: o }))}</span>`;
  return h + `<div class="run">${run}</div>`;
}

/**
 * A stretch of text, sized in the body's em: the page's own words, never the
 * document's characters (`own`).
 * @param {string} chars
 * @param {number} size
 * @param {number} [lead] the room before it, in the body's em
 * @param {number} [trail] the room after it, in the body's em
 * @returns {Piece}
 */
const piece = (chars, size, lead = 0, trail = 0) => ({ text: chars, size, lead, trail, box: false, own: false });
/**
 * A stretch of the document's own characters, sized in the body's em: the
 * positions P-LAY reads each line's start from.
 * @param {string} chars
 * @param {number} size
 * @returns {Piece}
 */
const own = (chars, size) => ({ text: chars, size, lead: 0, trail: 0, box: false, own: true });
/**
 * A link's symbol: an inline-block at its size, its border and padding either side, the room before it.
 * @param {number} k the size of the line it stands in, in the body's em
 * @returns {Piece}
 */
const symbol = (k) => {
  const s = MEASURE.sym * k, edge = borderEm(BORDER.box) + MEASURE.symPad * s;
  return { text: '⟡', size: s, lead: MEASURE.symGap * s + edge, trail: edge, box: true, own: false };
};
/**
 * A row of the plan.
 * @param {Row['kind']} kind
 * @param {number | null} pos the block it opens
 * @param {number} size the size its box is set at, in the body's em
 * @param {Piece[]} pieces
 * @param {{after?: number, before?: number, width?: number, keep?: Keep}} [o] its margins in the body's em, a withheld run's width, where a column may break at it (P-LAY's `Keep`; none inside it where none is said)
 * @returns {Row}
 */
const row = (kind, pos, size, pieces, o = {}) => ({ kind, pos, size, pieces, before: o.before ?? 0, after: o.after ?? 0, width: o.width ?? 0, keep: o.keep ?? 'whole' });

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
      if (s.opens.c33) out.push({ text: t('C-33'), size: m, lead: edge, trail: edge + MEASURE.markGap * m, box: true, own: false });
    }
    out.push(...s.chromeSyms.map(() => symbol(k)), own(s.text, k), ...s.syms.map(() => symbol(k)));
  }
  return out;
}

/**
 * The article as P-LAY's plan: the head's lines, each block's rows at its
 * size with its margins — a heading's room above it and the smaller room
 * below, every other block's gap after it — the empty document's line, the
 * scene-offers — from the same walk the HTML is made from; each row's keep,
 * where a column may break at it (issue #15's keep rules): a paragraph
 * between its lines, a heading kept with the first two lines after it, the
 * head, a record, a withheld run, a reference, an item not rendered and the
 * chrome whole.
 * @param {Doc} d
 * @param {ArticleView} v
 * @param {string} ownerAccount the owner by `effective_owner`, or the document's account
 * @returns {Row[]}
 */
export function articlePlan(d, v, ownerAccount) {
  const w = walk(d, v, ownerAccount);
  const H = MEASURE.head, gap = MEASURE.gap;
  const joined = /** @type {const} */ ({ keep: 'joined' });
  /** @type {Row[]} */
  const rows = [row('head', null, 1, [piece(w.head.addr, 1)]), row('head', null, H, [piece(w.head.state, H)], joined), row('head', null, H, [piece(w.head.by, H)], joined)];
  if (w.head.presence) rows.push(row('head', null, H, [symbol(H), piece(' ' + w.head.presence, H)], joined));
  if (!w.parts) return rows;
  for (const p of w.parts) {
    const b = p.b;
    if (p.kind === 'withheld') rows.push(row('withheld', b.pos, 1, [], { after: gap, width: b.width }));
    else if (p.kind === 'record' && p.rec) {
      if (p.rec.keys) rows.push(row('text', b.pos, 1, [piece(p.rec.words, 1)]), row('text', null, MEASURE.derived, [piece(p.rec.keys, MEASURE.derived)], { after: gap, ...joined }));
      else rows.push(row('text', b.pos, 1, [piece(p.rec.words, 1)], { after: gap }));
    } else if (p.kind === 'ref') rows.push(row('text', b.pos, 1, [piece('⟡', 1)], { after: gap }));
    else if (p.kind === 'hex') rows.push(row('text', b.pos, 1, [piece(t('F.not-rendered', { width: b.width }), 1)], { after: gap }));
    else {
      const k = headingSize(p.level);
      const margins = p.level ? { before: MEASURE.headingBefore * k, after: MEASURE.headingAfter * k, keep: /** @type {const} */ ('heading') } : { after: gap * k, keep: /** @type {const} */ ('lines') };
      rows.push(row('text', b.pos, k, paraPieces(p, k), margins));
    }
  }
  if (w.empty) rows.push(row('text', 1, 1, [piece(t('B1.empty_subspace'), 1)], { after: gap }));
  const O = MEASURE.offer;
  for (const o of w.offers) rows.push(row('chrome', null, O, [piece(t('B1.scene-offer', { D: o }), O)], { before: MEASURE.offerGap * O, after: MEASURE.offerGap * O }));
  return rows;
}

// ---- the copy's plain text ------------------------------------------------------------------------------------------

/**
 * @typedef {Object} Copied — what a copy reads of an article: the document it is made as, and the runs, blocks and image it was made from (T-LAYER's `Made`)
 * @property {string} addr
 * @property {import('../model/frames.js').Run[]} runs
 * @property {Block[]} blocks
 * @property {import('../model/records.js').ImageRun[]} image
 */

/** @typedef {{kind: ItemKind, owner: string, width: number, contents: string[]}} Gap a stand-in being gathered: items one after another in the text, of one kind and one owner */

/**
 * The document whose permanent addresses the bytes at a position are, read
 * through an image that covers it — as M-REC's `takeImage` names a
 * transcluded run's origin; null where the image does not cover it.
 * @param {import('../model/records.js').ImageRun[]} image
 * @param {number} pos
 * @returns {string | null}
 */
function bytesHome(image, pos) {
  const r = image.find((x) => x.pos <= pos && pos < x.pos + x.width);
  return r ? documentOf(r.prefix) : null;
}

/** a gap's stand-in, in square brackets (issue #161): its kind, then a withheld run's owner and length, an unshown item's length, a record's own plain contents */
function standIn(/** @type {Gap} */ g) {
  const kind = itemWords(g.kind);
  if (g.kind === 'withheld') return t('L.copy.item.owned', { kind, owner: g.owner, length: itemLength(g.width) });
  if (g.kind === 'unshown') return t('L.copy.item.sized', { kind, length: itemLength(g.width) });
  return g.contents.length ? t('L.copy.item.contents', { kind, contents: g.contents.join(' · ') }) : t('L.copy.item', { kind });
}

/**
 * THE COPY'S PLAIN TEXT (issue #161's design decision; FP-24): a span's items
 * in the order its text holds them, read from what an article was made from —
 * each run of text its own characters over the span (M-REC's `textOf`), each
 * other item a stand-in in square brackets in its place naming its kind
 * (`itemOf`, `itemWords`), a withheld run's owner and length after it, an
 * item this client cannot show's length, a record's own plain contents
 * (`recordContents`), and never what the plane draws of it. Text is never
 * joined across an item, so a paste never makes separated passages look
 * adjacent; items one after another of one kind and owner share one
 * stand-in, their lengths summed and their contents in order. A withheld
 * run's owner is its origin's, as its placeholder names it (`placeholderOf`);
 * any other item's the owner of the document whose permanent addresses its
 * bytes are (`bytesHome`), else the article's own document's. An item the
 * span touches is taken whole, as the selection takes it.
 * @param {Copied} made what the article was made from
 * @param {Span} span the span copied
 * @param {(doc: string) => string} ownerOf the owner account of a document, by the one owner rule (T-LAYER's `originOwner`)
 * @returns {string}
 */
export function copyText(made, span, ownerOf) {
  const p0 = span.pos, p1 = span.pos + span.width;
  /** @type {string[]} */
  const out = [];
  /** @type {Gap | null} */
  let gap = null;
  const close = () => { if (gap) out.push(standIn(gap)); gap = null; };
  for (const r of made.runs) {
    if (r.pos >= p1 || r.pos + r.width <= p0) continue;
    if (r.kind === 'content') {
      const text = textOf([r], p0, p1);
      if (text) { close(); out.push(text); }
      continue;
    }
    const b = made.blocks.find((x) => x.pos === r.pos && x.kind !== 'para');
    const kind = b ? itemOf(b) : null;
    if (!b || !kind) continue;
    const owner = kind === 'withheld' ? (b.origin ? ownerOf(b.origin) : '') : ownerOf(bytesHome(made.image, b.pos) || made.addr);
    const contents = kind === 'record' ? recordContents(b) : [];
    if (gap && gap.kind === kind && gap.owner === owner) { gap.width += b.width; gap.contents.push(...contents); }
    else { close(); gap = { kind, owner, width: b.width, contents }; }
  }
  close();
  return out.join('');
}
